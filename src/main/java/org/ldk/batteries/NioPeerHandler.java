package org.ldk.batteries;

import org.ldk.structs.*;

import java.io.IOException;
import java.net.SocketAddress;
import java.net.StandardSocketOptions;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;

public class NioPeerHandler {
    private static class Peer {
        SocketDescriptor descriptor;
        // When we are told by LDK to disconnect, we can't return to LDK until we are sure
        // won't call any more read/write PeerManager functions with the same connection.
        // This is set to true if we're in such a condition (with disconnect checked
        // before with the Peer monitor lock held) and false when we can return.
        boolean block_disconnect_socket = false;
        SelectionKey key;
    }

    private Peer setup_socket(SocketChannel chan) throws IOException {
        chan.configureBlocking(false);
        // Lightning tends to send a number of small messages back and forth between peers quickly, which Nagle is
        // particularly bad at handling, so we disable it here.
        chan.setOption(StandardSocketOptions.TCP_NODELAY, true);
        long our_id;
        synchronized (this) {
            this.socket_id = this.socket_id + 1;
            our_id = this.socket_id;
        }

        final Peer peer = new Peer();
        SocketDescriptor descriptor = SocketDescriptor.new_impl(new SocketDescriptor.SocketDescriptorInterface() {
            @Override
            public long send_data(byte[] data, boolean resume_read) {
                if (resume_read) {
                    peer.key.interestOps(peer.key.interestOps() | SelectionKey.OP_READ);
                }
                try {
                    long written = chan.write(ByteBuffer.wrap(data));
                    if (written != data.length) {
                        peer.key.interestOps(peer.key.interestOps() | SelectionKey.OP_WRITE);
                    }
                    return written;
                } catch (IOException e) {
                    // Most likely the socket is disconnected, let the background thread handle it.
                    return 0;
                }
            }

            @Override
            public void disconnect_socket() {
                try {
                    peer.key.cancel();
                    peer.key.channel().close();
                    selector.wakeup();
                } catch (IOException ignored) { }
                synchronized (peer) {
                    while (peer.block_disconnect_socket) {
                        try {
                            peer.wait();
                        } catch (InterruptedException ignored) { }
                    }
                }
            }
            @Override public boolean eq(SocketDescriptor other_arg) { return other_arg.hash() == our_id; }
            @Override public long hash() { return our_id; }
        });
        peer.descriptor = descriptor;
        return peer;
    }

    PeerManager peer_manager;
    Thread io_thread;
    Selector selector;
    long socket_id;
    volatile boolean shutdown = false;

    /**
     * Constructs a new peer handler, spawning a thread to monitor for socket events.
     * The background thread will call the PeerManager's timer_tick_occured() function for you on an appropriate schedule.
     *
     * @param manager The LDK PeerManager which connection data will be provided to.
     * @throws IOException If an internal java.nio error occurs.
     */
    public NioPeerHandler(PeerManager manager) throws IOException {
long id = manager._test_only_get_ptr();
        this.peer_manager = manager;
        this.selector = Selector.open();
        io_thread = new Thread(() -> {
            ByteBuffer buf = ByteBuffer.allocate(8192);
            long lastTimerTick = System.currentTimeMillis();
            while (true) {
                try {
                    this.selector.select(1000);
                } catch (IOException ignored) {
                    System.err.println("java.nio threw an unexpected IOException. Stopping PeerHandler thread!");
                    return;
                }
                if (shutdown) return;
                if (Thread.interrupted()) return;
                for (SelectionKey key : this.selector.selectedKeys()) {
                    if ((key.interestOps() & SelectionKey.OP_ACCEPT) != 0) {
                        if (key.isAcceptable()) {
                            SocketChannel chan;
                            try {
                                chan = ((ServerSocketChannel) key.channel()).accept();
                            } catch (IOException ignored) {
                                key.cancel();
                                continue;
                            }
                            if (chan == null) continue;
                            try {
                                Peer peer = setup_socket(chan);
                                Result_NonePeerHandleErrorZ res = this.peer_manager.new_inbound_connection(peer.descriptor);
                                if (res instanceof  Result_NonePeerHandleErrorZ.Result_NonePeerHandleErrorZ_OK) {
                                    peer.key = chan.register(this.selector, SelectionKey.OP_READ, peer);
                                }
                            } catch (IOException ignored) { }
                        }
                        continue; // There is no attachment so the rest of the loop is useless
                    }
                    Peer peer = (Peer) key.attachment();
                    synchronized (peer) {
                        peer.block_disconnect_socket = true;
                    }
                    try {
                        if (key.isValid() && (key.interestOps() & SelectionKey.OP_WRITE) != 0 && key.isWritable()) {
                            Result_NonePeerHandleErrorZ res = this.peer_manager.write_buffer_space_avail(peer.descriptor);
                            if (res instanceof Result_NonePeerHandleErrorZ.Result_NonePeerHandleErrorZ_Err) {
                                key.channel().close();
                                key.cancel();
                            }
                        }
                        if (key.isValid() && (key.interestOps() & SelectionKey.OP_READ) != 0 && key.isReadable()) {
                            buf.clear();
                            int read = ((SocketChannel) key.channel()).read(buf);
                            if (read == -1) {
                                this.peer_manager.socket_disconnected(peer.descriptor);
                                key.cancel();
                            } else if (read > 0) {
                                buf.flip();
                                byte[] read_bytes = new byte[read];
                                buf.get(read_bytes, 0, read);
                                Result_boolPeerHandleErrorZ res = this.peer_manager.read_event(peer.descriptor, read_bytes);
                                if (res instanceof Result_boolPeerHandleErrorZ.Result_boolPeerHandleErrorZ_OK) {
                                    if (((Result_boolPeerHandleErrorZ.Result_boolPeerHandleErrorZ_OK) res).res) {
                                        key.interestOps(key.interestOps() & (~SelectionKey.OP_READ));
                                    }
                                } else {
                                    key.channel().close();
                                    key.cancel();
                                }
                            }
                        }
                    } catch (IOException ignored) {
                        try { key.channel().close(); } catch (IOException ignored2) { }
                        key.cancel();
                        peer_manager.socket_disconnected(peer.descriptor);
                    }
                    synchronized (peer) {
                        peer.block_disconnect_socket = false;
                        peer.notifyAll();
                    }
                }
                if (lastTimerTick < System.currentTimeMillis() - 30 * 1000) {
                    peer_manager.timer_tick_occured();
                    lastTimerTick = System.currentTimeMillis();
                }
                peer_manager.process_events();
            }
        }, "NioPeerHandler NIO Thread");
        io_thread.start();
    }

    /**
     * Connect to a peer given their node id and socket address. Blocks until a connection is established (or returns
     * IOException) and then the connection handling runs in the background.
     *
     * @param their_node_id A valid 33-byte public key representing the peer's Lightning Node ID. If this is invalid,
     *                      undefined behavior (read: Segfault, etc) may occur.
     * @param remote The socket address to connect to.
     * @throws IOException If connecting to the remote endpoint fails or internal java.nio errors occur.
     */
    public void connect(byte[] their_node_id, SocketAddress remote) throws IOException {
        SocketChannel chan = SocketChannel.open(remote);
        Peer peer = setup_socket(chan);
        Result_CVec_u8ZPeerHandleErrorZ res = this.peer_manager.new_outbound_connection(their_node_id, peer.descriptor);
        if (res instanceof  Result_CVec_u8ZPeerHandleErrorZ.Result_CVec_u8ZPeerHandleErrorZ_OK) {
            byte[] initial_bytes = ((Result_CVec_u8ZPeerHandleErrorZ.Result_CVec_u8ZPeerHandleErrorZ_OK) res).res;
            if (chan.write(ByteBuffer.wrap(initial_bytes)) != initial_bytes.length) {
                throw new IOException("We assume TCP socket buffer is at least a single packet in length");
            }
            peer.key = chan.register(this.selector, SelectionKey.OP_READ, peer);
            this.selector.wakeup();
        } else {
            throw new IOException("LDK rejected outbound connection. This likely shouldn't ever happen.");
        }
    }

    /**
     * Binds a listening socket to the given address, accepting incoming connections and handling them on the background
     * thread.
     *
     * @param socket_address The address to bind the listening socket to.
     * @throws IOException if binding the listening socket fail.
     */
    public void bind_listener(SocketAddress socket_address) throws IOException {
        ServerSocketChannel listen_channel = ServerSocketChannel.open();
        listen_channel.bind(socket_address);
        listen_channel.configureBlocking(false);
        listen_channel.register(this.selector, SelectionKey.OP_ACCEPT);
        this.selector.wakeup();
    }

    /**
     * Interrupt the background thread, stopping all peer handling. Disconnection events to the PeerHandler are not made,
     * potentially leaving the PeerHandler in an inconsistent state.
     */
    public void interrupt() {
        shutdown = true;
        selector.wakeup();
        try {
            io_thread.join();
        } catch (InterruptedException ignored) { }
    }

    /**
     * Calls process_events on the PeerManager immediately. Normally process_events is polled regularly to check for new
     * messages which need to be sent, but you can interrupt the poll and check immediately by calling this function.
     */
    public void check_events() {
        selector.wakeup();
    }
}