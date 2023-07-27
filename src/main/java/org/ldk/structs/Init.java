package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An [`init`] message to be sent to or received from a peer.
 * 
 * [`init`]: https://github.com/lightning/bolts/blob/master/01-messaging.md#the-init-message
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Init extends CommonBase {
	Init(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Init_free(ptr); }
	}

	/**
	 * The relevant features which the sender supports.
	 */
	public InitFeatures get_features() {
		long ret = bindings.Init_get_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The relevant features which the sender supports.
	 */
	public void set_features(org.ldk.structs.InitFeatures val) {
		bindings.Init_set_features(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Indicates chains the sender is interested in.
	 * 
	 * If there are no common chains, the connection will be closed.
	 * 
	 * Returns a copy of the field.
	 */
	public Option_CVec_ChainHashZZ get_networks() {
		long ret = bindings.Init_get_networks(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ChainHashZZ ret_hu_conv = org.ldk.structs.Option_CVec_ChainHashZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Indicates chains the sender is interested in.
	 * 
	 * If there are no common chains, the connection will be closed.
	 */
	public void set_networks(org.ldk.structs.Option_CVec_ChainHashZZ val) {
		bindings.Init_set_networks(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The receipient's network address.
	 * 
	 * This adds the option to report a remote IP address back to a connecting peer using the init
	 * message. A node can decide to use that information to discover a potential update to its
	 * public IPv4 address (NAT) and use that for a [`NodeAnnouncement`] update message containing
	 * the new address.
	 */
	public Option_NetAddressZ get_remote_network_address() {
		long ret = bindings.Init_get_remote_network_address(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetAddressZ ret_hu_conv = org.ldk.structs.Option_NetAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public void set_remote_network_address(org.ldk.structs.Option_NetAddressZ val) {
		bindings.Init_set_remote_network_address(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new Init given each field
	 */
	public static Init of(org.ldk.structs.InitFeatures features_arg, org.ldk.structs.Option_CVec_ChainHashZZ networks_arg, org.ldk.structs.Option_NetAddressZ remote_network_address_arg) {
		long ret = bindings.Init_new(features_arg == null ? 0 : features_arg.ptr, networks_arg.ptr, remote_network_address_arg.ptr);
		Reference.reachabilityFence(features_arg);
		Reference.reachabilityFence(networks_arg);
		Reference.reachabilityFence(remote_network_address_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Init ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Init(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(features_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(networks_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(remote_network_address_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Init_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Init
	 */
	public Init clone() {
		long ret = bindings.Init_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Init ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Init(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Inits contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Init b) {
		boolean ret = bindings.Init_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Init)) return false;
		return this.eq((Init)o);
	}
	/**
	 * Serialize the Init object into a byte array which can be read by Init_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Init_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Init from a byte array, created by Init_write
	 */
	public static Result_InitDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Init_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InitDecodeErrorZ ret_hu_conv = Result_InitDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
