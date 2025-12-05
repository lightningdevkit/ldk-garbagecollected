using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Config structure for overriding channel parameters.
 */
public class ChannelConfigOverrides : CommonBase {
	internal ChannelConfigOverrides(object _dummy, long ptr) : base(ptr) { }
	~ChannelConfigOverrides() {
		if (ptr != 0) { bindings.ChannelConfigOverrides_free(ptr); }
	}

	/**
	 * Overrides for channel handshake parameters.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.ChannelHandshakeConfigUpdate get_handshake_overrides() {
		long ret = bindings.ChannelConfigOverrides_get_handshake_overrides(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Overrides for channel handshake parameters.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_handshake_overrides(org.ldk.structs.ChannelHandshakeConfigUpdate val) {
		bindings.ChannelConfigOverrides_set_handshake_overrides(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Overrides for channel update parameters.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.ChannelConfigUpdate get_update_overrides() {
		long ret = bindings.ChannelConfigOverrides_get_update_overrides(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Overrides for channel update parameters.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_update_overrides(org.ldk.structs.ChannelConfigUpdate val) {
		bindings.ChannelConfigOverrides_set_update_overrides(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ChannelConfigOverrides given each field
	 * 
	 * Note that handshake_overrides_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that update_overrides_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static org.ldk.structs.ChannelConfigOverrides of(org.ldk.structs.ChannelHandshakeConfigUpdate handshake_overrides_arg, org.ldk.structs.ChannelConfigUpdate update_overrides_arg) {
		long ret = bindings.ChannelConfigOverrides_new(handshake_overrides_arg == null ? 0 : handshake_overrides_arg.ptr, update_overrides_arg == null ? 0 : update_overrides_arg.ptr);
		GC.KeepAlive(handshake_overrides_arg);
		GC.KeepAlive(update_overrides_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigOverrides ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigOverrides(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelConfigOverrides_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelConfigOverrides
	 */
	public org.ldk.structs.ChannelConfigOverrides clone() {
		long ret = bindings.ChannelConfigOverrides_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigOverrides ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigOverrides(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
