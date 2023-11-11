
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of SocketDescriptor */
public interface SocketDescriptorInterface {
	/**Attempts to send some data from the given slice to the peer.
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
	long send_data(byte[] data, bool resume_read);
	/**Disconnect the socket pointed to by this SocketDescriptor.
	 * 
	 * You do *not* need to call [`PeerManager::socket_disconnected`] with this socket after this
	 * call (doing so is a noop).
	 */
	void disconnect_socket();
	/**Checks if two objects are equal given this object's this_arg pointer and another object.
	 */
	bool eq(SocketDescriptor other_arg);
	/**Calculate a succinct non-cryptographic hash for an object given its this_arg pointer.
	 * This is used, for example, for inclusion of this object in a hash map.
	 */
	long hash();
}

/**
 * Provides an object which can be used to send data to and which uniquely identifies a connection
 * to a remote host. You will need to be able to generate multiple of these which meet Eq and
 * implement Hash to meet the PeerManager API.
 * 
 * For efficiency, [`Clone`] should be relatively cheap for this type.
 * 
 * Two descriptors may compare equal (by [`cmp::Eq`] and [`hash::Hash`]) as long as the original
 * has been disconnected, the [`PeerManager`] has been informed of the disconnection (either by it
 * having triggered the disconnection or a call to [`PeerManager::socket_disconnected`]), and no
 * further calls to the [`PeerManager`] related to the original socket occur. This allows you to
 * use a file descriptor for your SocketDescriptor directly, however for simplicity you may wish
 * to simply use another value which is guaranteed to be globally unique instead.
 */
public class SocketDescriptor : CommonBase {
	internal bindings.LDKSocketDescriptor bindings_instance;
	internal long instance_idx;

	internal SocketDescriptor(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~SocketDescriptor() {
		if (ptr != 0) { bindings.SocketDescriptor_free(ptr); }
	}

	private class LDKSocketDescriptorHolder { internal SocketDescriptor held; }
	private class LDKSocketDescriptorImpl : bindings.LDKSocketDescriptor {
		internal LDKSocketDescriptorImpl(SocketDescriptorInterface arg, LDKSocketDescriptorHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private SocketDescriptorInterface arg;
		private LDKSocketDescriptorHolder impl_holder;
		public long send_data(long _data, bool _resume_read) {
			byte[] _data_conv = InternalUtils.decodeUint8Array(_data);
			long ret = arg.send_data(_data_conv, _resume_read);
				GC.KeepAlive(arg);
			return ret;
		}
		public void disconnect_socket() {
			arg.disconnect_socket();
				GC.KeepAlive(arg);
		}
		public bool eq(long _other_arg) {
			SocketDescriptor ret_hu_conv = new SocketDescriptor(null, _other_arg);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			bool ret = arg.eq(ret_hu_conv);
				GC.KeepAlive(arg);
			return ret;
		}
		public long hash() {
			long ret = arg.hash();
				GC.KeepAlive(arg);
			return ret;
		}
	}

	/** Creates a new instance of SocketDescriptor from a given implementation */
	public static SocketDescriptor new_impl(SocketDescriptorInterface arg) {
		LDKSocketDescriptorHolder impl_holder = new LDKSocketDescriptorHolder();
		LDKSocketDescriptorImpl impl = new LDKSocketDescriptorImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKSocketDescriptor_new(impl);

		impl_holder.held = new SocketDescriptor(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
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
	public long send_data(byte[] data, bool resume_read) {
		long ret = bindings.SocketDescriptor_send_data(this.ptr, InternalUtils.encodeUint8Array(data), resume_read);
		GC.KeepAlive(this);
		GC.KeepAlive(data);
		GC.KeepAlive(resume_read);
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
		GC.KeepAlive(this);
	}

	/**
	 * Calculate a succinct non-cryptographic hash for an object given its this_arg pointer.
	 * This is used, for example, for inclusion of this object in a hash map.
	 */
	public long hash() {
		long ret = bindings.SocketDescriptor_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	internal long clone_ptr() {
		long ret = bindings.SocketDescriptor_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of a SocketDescriptor
	 */
	public SocketDescriptor clone() {
		long ret = bindings.SocketDescriptor_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		SocketDescriptor ret_hu_conv = new SocketDescriptor(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
