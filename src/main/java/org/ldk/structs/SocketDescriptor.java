package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * Provides an object which can be used to send data to and which uniquely identifies a connection
 * to a remote host. You will need to be able to generate multiple of these which meet Eq and
 * implement Hash to meet the PeerManager API.
 * 
 * For efficiency, Clone should be relatively cheap for this type.
 * 
 * Two descriptors may compare equal (by [`cmp::Eq`] and [`hash::Hash`]) as long as the original
 * has been disconnected, the [`PeerManager`] has been informed of the disconnection (either by it
 * having triggered the disconnection or a call to [`PeerManager::socket_disconnected`]), and no
 * further calls to the [`PeerManager`] related to the original socket occur. This allows you to
 * use a file descriptor for your SocketDescriptor directly, however for simplicity you may wish
 * to simply use another value which is guaranteed to be globally unique instead.
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
		 * Note that in the disconnected case, [`PeerManager::socket_disconnected`] must still be
		 * called and further write attempts may occur until that time.
		 * 
		 * If the returned size is smaller than `data.len()`, a
		 * [`PeerManager::write_buffer_space_avail`] call must be made the next time more data can be
		 * written. Additionally, until a `send_data` event completes fully, no further
		 * [`PeerManager::read_event`] calls should be made for the same peer! Because this is to
		 * prevent denial-of-service issues, you should not read or buffer any data from the socket
		 * until then.
		 * 
		 * If a [`PeerManager::read_event`] call on this descriptor had previously returned true
		 * (indicating that read events should be paused to prevent DoS in the send buffer),
		 * `resume_read` may be set indicating that read events on this descriptor should resume. A
		 * `resume_read` of false carries no meaning, and should not cause any action.
		 */
		long send_data(byte[] data, boolean resume_read);
		/**
		 * Disconnect the socket pointed to by this SocketDescriptor.
		 * 
		 * You do *not* need to call [`PeerManager::socket_disconnected`] with this socket after this
		 * call (doing so is a noop).
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
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public void disconnect_socket() {
				arg.disconnect_socket();
				Reference.reachabilityFence(arg);
			}
			@Override public boolean eq(long other_arg) {
				SocketDescriptor ret_hu_conv = new SocketDescriptor(null, other_arg);
				ret_hu_conv.ptrs_to.add(this);
				boolean ret = arg.eq(ret_hu_conv);
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public long hash() {
				long ret = arg.hash();
				Reference.reachabilityFence(arg);
				return ret;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Attempts to send some data from the given slice to the peer.
	 * 
	 * Returns the amount of data which was sent, possibly 0 if the socket has since disconnected.
	 * Note that in the disconnected case, [`PeerManager::socket_disconnected`] must still be
	 * called and further write attempts may occur until that time.
	 * 
	 * If the returned size is smaller than `data.len()`, a
	 * [`PeerManager::write_buffer_space_avail`] call must be made the next time more data can be
	 * written. Additionally, until a `send_data` event completes fully, no further
	 * [`PeerManager::read_event`] calls should be made for the same peer! Because this is to
	 * prevent denial-of-service issues, you should not read or buffer any data from the socket
	 * until then.
	 * 
	 * If a [`PeerManager::read_event`] call on this descriptor had previously returned true
	 * (indicating that read events should be paused to prevent DoS in the send buffer),
	 * `resume_read` may be set indicating that read events on this descriptor should resume. A
	 * `resume_read` of false carries no meaning, and should not cause any action.
	 */
	public long send_data(byte[] data, boolean resume_read) {
		long ret = bindings.SocketDescriptor_send_data(this.ptr, data, resume_read);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(data);
		Reference.reachabilityFence(resume_read);
		return ret;
	}

	/**
	 * Disconnect the socket pointed to by this SocketDescriptor.
	 * 
	 * You do *not* need to call [`PeerManager::socket_disconnected`] with this socket after this
	 * call (doing so is a noop).
	 */
	public void disconnect_socket() {
		bindings.SocketDescriptor_disconnect_socket(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Calculate a succinct non-cryptographic hash for an object given its this_arg pointer.
	 * This is used, for example, for inclusion of this object in a hash map.
	 */
	public long hash() {
		long ret = bindings.SocketDescriptor_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	long clone_ptr() {
		long ret = bindings.SocketDescriptor_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of a SocketDescriptor
	 */
	public SocketDescriptor clone() {
		long ret = bindings.SocketDescriptor_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		SocketDescriptor ret_hu_conv = new SocketDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
