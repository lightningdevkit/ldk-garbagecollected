using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An [`init`] message to be sent to or received from a peer.
 * 
 * [`init`]: https://github.com/lightning/bolts/blob/master/01-messaging.md#the-init-message
 */
public class Init : CommonBase {
	internal Init(object _dummy, long ptr) : base(ptr) { }
	~Init() {
		if (ptr != 0) { bindings.Init_free(ptr); }
	}

	/**
	 * The relevant features which the sender supports.
	 */
	public InitFeatures get_features() {
		long ret = bindings.Init_get_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The relevant features which the sender supports.
	 */
	public void set_features(org.ldk.structs.InitFeatures val) {
		bindings.Init_set_features(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Indicates chains the sender is interested in.
	 * 
	 * If there are no common chains, the connection will be closed.
	 * 
	 * Returns a copy of the field.
	 */
	public Option_CVec_ThirtyTwoBytesZZ get_networks() {
		long ret = bindings.Init_get_networks(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ ret_hu_conv = org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Indicates chains the sender is interested in.
	 * 
	 * If there are no common chains, the connection will be closed.
	 */
	public void set_networks(org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ val) {
		bindings.Init_set_networks(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The receipient's network address.
	 * 
	 * This adds the option to report a remote IP address back to a connecting peer using the init
	 * message. A node can decide to use that information to discover a potential update to its
	 * public IPv4 address (NAT) and use that for a [`NodeAnnouncement`] update message containing
	 * the new address.
	 */
	public Option_SocketAddressZ get_remote_network_address() {
		long ret = bindings.Init_get_remote_network_address(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_SocketAddressZ ret_hu_conv = org.ldk.structs.Option_SocketAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The receipient's network address.
	 * 
	 * This adds the option to report a remote IP address back to a connecting peer using the init
	 * message. A node can decide to use that information to discover a potential update to its
	 * public IPv4 address (NAT) and use that for a [`NodeAnnouncement`] update message containing
	 * the new address.
	 */
	public void set_remote_network_address(org.ldk.structs.Option_SocketAddressZ val) {
		bindings.Init_set_remote_network_address(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new Init given each field
	 */
	public static Init of(org.ldk.structs.InitFeatures features_arg, org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ networks_arg, org.ldk.structs.Option_SocketAddressZ remote_network_address_arg) {
		long ret = bindings.Init_new(features_arg == null ? 0 : features_arg.ptr, networks_arg.ptr, remote_network_address_arg.ptr);
		GC.KeepAlive(features_arg);
		GC.KeepAlive(networks_arg);
		GC.KeepAlive(remote_network_address_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Init ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Init(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(features_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(networks_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(remote_network_address_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Init_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Init
	 */
	public Init clone() {
		long ret = bindings.Init_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Init ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Init(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Inits contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Init b) {
		bool ret = bindings.Init_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Init)) return false;
		return this.eq((Init)o);
	}
	/**
	 * Serialize the Init object into a byte array which can be read by Init_read
	 */
	public byte[] write() {
		long ret = bindings.Init_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Init from a byte array, created by Init_write
	 */
	public static Result_InitDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Init_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InitDecodeErrorZ ret_hu_conv = Result_InitDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
