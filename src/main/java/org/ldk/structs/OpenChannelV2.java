package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An [`open_channel2`] message to be sent by or received from the channel initiator.
 * 
 * Used in V2 channel establishment
 * 
 * [`open_channel2`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-open_channel2-message
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OpenChannelV2 extends CommonBase {
	OpenChannelV2(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OpenChannelV2_free(ptr); }
	}

	/**
	 * Common fields of `open_channel(2)`-like messages
	 */
	public CommonOpenChannelFields get_common_fields() {
		long ret = bindings.OpenChannelV2_get_common_fields(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommonOpenChannelFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommonOpenChannelFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Common fields of `open_channel(2)`-like messages
	 */
	public void set_common_fields(org.ldk.structs.CommonOpenChannelFields val) {
		bindings.OpenChannelV2_set_common_fields(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The feerate for the funding transaction set by the channel initiator
	 */
	public int get_funding_feerate_sat_per_1000_weight() {
		int ret = bindings.OpenChannelV2_get_funding_feerate_sat_per_1000_weight(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The feerate for the funding transaction set by the channel initiator
	 */
	public void set_funding_feerate_sat_per_1000_weight(int val) {
		bindings.OpenChannelV2_set_funding_feerate_sat_per_1000_weight(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The locktime for the funding transaction
	 */
	public int get_locktime() {
		int ret = bindings.OpenChannelV2_get_locktime(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The locktime for the funding transaction
	 */
	public void set_locktime(int val) {
		bindings.OpenChannelV2_set_locktime(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The second to-be-broadcast-by-channel-initiator transaction's per commitment point
	 */
	public byte[] get_second_per_commitment_point() {
		byte[] ret = bindings.OpenChannelV2_get_second_per_commitment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The second to-be-broadcast-by-channel-initiator transaction's per commitment point
	 */
	public void set_second_per_commitment_point(byte[] val) {
		bindings.OpenChannelV2_set_second_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Optionally, a requirement that only confirmed inputs can be added
	 */
	public COption_NoneZ get_require_confirmed_inputs() {
		COption_NoneZ ret = bindings.OpenChannelV2_get_require_confirmed_inputs(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Optionally, a requirement that only confirmed inputs can be added
	 */
	public void set_require_confirmed_inputs(org.ldk.enums.COption_NoneZ val) {
		bindings.OpenChannelV2_set_require_confirmed_inputs(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new OpenChannelV2 given each field
	 */
	public static OpenChannelV2 of(org.ldk.structs.CommonOpenChannelFields common_fields_arg, int funding_feerate_sat_per_1000_weight_arg, int locktime_arg, byte[] second_per_commitment_point_arg, org.ldk.enums.COption_NoneZ require_confirmed_inputs_arg) {
		long ret = bindings.OpenChannelV2_new(common_fields_arg.ptr, funding_feerate_sat_per_1000_weight_arg, locktime_arg, InternalUtils.check_arr_len(second_per_commitment_point_arg, 33), require_confirmed_inputs_arg);
		Reference.reachabilityFence(common_fields_arg);
		Reference.reachabilityFence(funding_feerate_sat_per_1000_weight_arg);
		Reference.reachabilityFence(locktime_arg);
		Reference.reachabilityFence(second_per_commitment_point_arg);
		Reference.reachabilityFence(require_confirmed_inputs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OpenChannelV2 ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OpenChannelV2(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.OpenChannelV2_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the OpenChannelV2
	 */
	public OpenChannelV2 clone() {
		long ret = bindings.OpenChannelV2_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OpenChannelV2 ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OpenChannelV2(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OpenChannelV2.
	 */
	public long hash() {
		long ret = bindings.OpenChannelV2_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two OpenChannelV2s contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.OpenChannelV2 b) {
		boolean ret = bindings.OpenChannelV2_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof OpenChannelV2)) return false;
		return this.eq((OpenChannelV2)o);
	}
	/**
	 * Serialize the OpenChannelV2 object into a byte array which can be read by OpenChannelV2_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OpenChannelV2_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a OpenChannelV2 from a byte array, created by OpenChannelV2_write
	 */
	public static Result_OpenChannelV2DecodeErrorZ read(byte[] ser) {
		long ret = bindings.OpenChannelV2_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OpenChannelV2DecodeErrorZ ret_hu_conv = Result_OpenChannelV2DecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
