package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

/**
 * Provides an object which can be used to send data to and which uniquely identifies a connection
 * to a remote host. You will need to be able to generate multiple of these which meet Eq and
 * implement Hash to meet the PeerManager API.
 * 
 * For efficiency, Clone should be relatively cheap for this type.
 * 
 * You probably want to just extend an int and put a file descriptor in a struct and implement
 * send_data. Note that if you are using a higher-level net library that may call close() itself,
 * be careful to ensure you don't have races whereby you might register a new connection with an
 * fd which is the same as a previous one which has yet to be removed via
 * PeerManager::socket_disconnected().
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SocketDescriptor extends CommonBase {
	final bindings.LDKSocketDescriptor bindings_instance;
	SocketDescriptor(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private SocketDescriptor(bindings.LDKSocketDescriptor arg) {
		super(bindings.LDKSocketDescriptor_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.SocketDescriptor_free(ptr); } super.finalize();
	}

	public static interface SocketDescriptorInterface {
		/**
		 * Attempts to send some data from the given slice to the peer.
		 * 
		 * Returns the amount of data which was sent, possibly 0 if the socket has since disconnected.
		 * Note that in the disconnected case, socket_disconnected must still fire and further write
		 * attempts may occur until that time.
		 * 
		 * If the returned size is smaller than data.len(), a write_available event must
		 * trigger the next time more data can be written. Additionally, until the a send_data event
		 * completes fully, no further read_events should trigger on the same peer!
		 * 
		 * If a read_event on this descriptor had previously returned true (indicating that read
		 * events should be paused to prevent DoS in the send buffer), resume_read may be set
		 * indicating that read events on this descriptor should resume. A resume_read of false does
		 * not* imply that further read events should be paused.
		 */
		long send_data(byte[] data, boolean resume_read);
		/**
		 * Disconnect the socket pointed to by this SocketDescriptor. Once this function returns, no
		 * more calls to write_buffer_space_avail, read_event or socket_disconnected may be made with
		 * this descriptor. No socket_disconnected call should be generated as a result of this call,
		 * though races may occur whereby disconnect_socket is called after a call to
		 * socket_disconnected but prior to socket_disconnected returning.
		 */
		void disconnect_socket();
		/**
		 * Checks if two objects are equal given this object's this_arg pointer and another object.
		 */
		boolean eq(SocketDescriptor other_arg);
		/**
		 * Calculate a succinct non-cryptographic hash for an object given its this_arg pointer.
		 * This is used, for example, for inclusion of this object in a hash map.
		 */
		long hash();
	}
	private static class LDKSocketDescriptorHolder { SocketDescriptor held; }
	public static SocketDescriptor new_impl(SocketDescriptorInterface arg) {
		final LDKSocketDescriptorHolder impl_holder = new LDKSocketDescriptorHolder();
		impl_holder.held = new SocketDescriptor(new bindings.LDKSocketDescriptor() {
			@Override public long send_data(byte[] data, boolean resume_read) {
				long ret = arg.send_data(data, resume_read);
				return ret;
			}
			@Override public void disconnect_socket() {
				arg.disconnect_socket();
			}
			@Override public boolean eq(long other_arg) {
				SocketDescriptor ret_hu_conv = new SocketDescriptor(null, other_arg);
				ret_hu_conv.ptrs_to.add(this);
				boolean ret = arg.eq(ret_hu_conv);
				return ret;
			}
			@Override public long hash() {
				long ret = arg.hash();
				return ret;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Attempts to send some data from the given slice to the peer.
	 * 
	 * Returns the amount of data which was sent, possibly 0 if the socket has since disconnected.
	 * Note that in the disconnected case, socket_disconnected must still fire and further write
	 * attempts may occur until that time.
	 * 
	 * If the returned size is smaller than data.len(), a write_available event must
	 * trigger the next time more data can be written. Additionally, until the a send_data event
	 * completes fully, no further read_events should trigger on the same peer!
	 * 
	 * If a read_event on this descriptor had previously returned true (indicating that read
	 * events should be paused to prevent DoS in the send buffer), resume_read may be set
	 * indicating that read events on this descriptor should resume. A resume_read of false does
	 * not* imply that further read events should be paused.
	 */
	public long send_data(byte[] data, boolean resume_read) {
		long ret = bindings.SocketDescriptor_send_data(this.ptr, data, resume_read);
		return ret;
	}

	/**
	 * Disconnect the socket pointed to by this SocketDescriptor. Once this function returns, no
	 * more calls to write_buffer_space_avail, read_event or socket_disconnected may be made with
	 * this descriptor. No socket_disconnected call should be generated as a result of this call,
	 * though races may occur whereby disconnect_socket is called after a call to
	 * socket_disconnected but prior to socket_disconnected returning.
	 */
	public void disconnect_socket() {
		bindings.SocketDescriptor_disconnect_socket(this.ptr);
	}

	/**
	 * Calculate a succinct non-cryptographic hash for an object given its this_arg pointer.
	 * This is used, for example, for inclusion of this object in a hash map.
	 */
	public long hash() {
		long ret = bindings.SocketDescriptor_hash(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of a SocketDescriptor
	 */
	public SocketDescriptor clone() {
		long ret = bindings.SocketDescriptor_clone(this.ptr);
		SocketDescriptor ret_hu_conv = new SocketDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
