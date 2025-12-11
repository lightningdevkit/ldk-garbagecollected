package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Config structure for overriding channel parameters.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelConfigOverrides extends CommonBase {
	ChannelConfigOverrides(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelConfigOverrides_free(ptr); }
	}

	/**
	 * Overrides for channel handshake parameters.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelHandshakeConfigUpdate get_handshake_overrides() {
		long ret = bindings.ChannelConfigOverrides_get_handshake_overrides(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Overrides for channel handshake parameters.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_handshake_overrides(@Nullable org.ldk.structs.ChannelHandshakeConfigUpdate val) {
		bindings.ChannelConfigOverrides_set_handshake_overrides(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Overrides for channel update parameters.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelConfigUpdate get_update_overrides() {
		long ret = bindings.ChannelConfigOverrides_get_update_overrides(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Overrides for channel update parameters.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_update_overrides(@Nullable org.ldk.structs.ChannelConfigUpdate val) {
		bindings.ChannelConfigOverrides_set_update_overrides(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ChannelConfigOverrides given each field
	 * 
	 * Note that handshake_overrides_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that update_overrides_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static ChannelConfigOverrides of(@Nullable org.ldk.structs.ChannelHandshakeConfigUpdate handshake_overrides_arg, @Nullable org.ldk.structs.ChannelConfigUpdate update_overrides_arg) {
		long ret = bindings.ChannelConfigOverrides_new(handshake_overrides_arg == null ? 0 : handshake_overrides_arg.ptr, update_overrides_arg == null ? 0 : update_overrides_arg.ptr);
		Reference.reachabilityFence(handshake_overrides_arg);
		Reference.reachabilityFence(update_overrides_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigOverrides ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigOverrides(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelConfigOverrides_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelConfigOverrides
	 */
	public ChannelConfigOverrides clone() {
		long ret = bindings.ChannelConfigOverrides_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigOverrides ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigOverrides(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
