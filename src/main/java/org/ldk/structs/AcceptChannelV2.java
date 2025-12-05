package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An [`accept_channel2`] message to be sent by or received from the channel accepter.
 * 
 * Used in V2 channel establishment
 * 
 * [`accept_channel2`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-accept_channel2-message
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class AcceptChannelV2 extends CommonBase {
	AcceptChannelV2(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.AcceptChannelV2_free(ptr); }
	}

	/**
	 * Common fields of `accept_channel(2)`-like messages
	 */
	public CommonAcceptChannelFields get_common_fields() {
		long ret = bindings.AcceptChannelV2_get_common_fields(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommonAcceptChannelFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommonAcceptChannelFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Common fields of `accept_channel(2)`-like messages
	 */
	public void set_common_fields(org.ldk.structs.CommonAcceptChannelFields val) {
		bindings.AcceptChannelV2_set_common_fields(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Part of the channel value contributed by the channel acceptor
	 */
	public long get_funding_satoshis() {
		long ret = bindings.AcceptChannelV2_get_funding_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Part of the channel value contributed by the channel acceptor
	 */
	public void set_funding_satoshis(long val) {
		bindings.AcceptChannelV2_set_funding_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The second to-be-broadcast-by-channel-acceptor transaction's per commitment point
	 */
	public byte[] get_second_per_commitment_point() {
		byte[] ret = bindings.AcceptChannelV2_get_second_per_commitment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The second to-be-broadcast-by-channel-acceptor transaction's per commitment point
	 */
	public void set_second_per_commitment_point(byte[] val) {
		bindings.AcceptChannelV2_set_second_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Optionally, a requirement that only confirmed inputs can be added
	 */
	public COption_NoneZ get_require_confirmed_inputs() {
		COption_NoneZ ret = bindings.AcceptChannelV2_get_require_confirmed_inputs(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Optionally, a requirement that only confirmed inputs can be added
	 */
	public void set_require_confirmed_inputs(org.ldk.enums.COption_NoneZ val) {
		bindings.AcceptChannelV2_set_require_confirmed_inputs(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new AcceptChannelV2 given each field
	 */
	public static AcceptChannelV2 of(org.ldk.structs.CommonAcceptChannelFields common_fields_arg, long funding_satoshis_arg, byte[] second_per_commitment_point_arg, org.ldk.enums.COption_NoneZ require_confirmed_inputs_arg) {
		long ret = bindings.AcceptChannelV2_new(common_fields_arg.ptr, funding_satoshis_arg, InternalUtils.check_arr_len(second_per_commitment_point_arg, 33), require_confirmed_inputs_arg);
		Reference.reachabilityFence(common_fields_arg);
		Reference.reachabilityFence(funding_satoshis_arg);
		Reference.reachabilityFence(second_per_commitment_point_arg);
		Reference.reachabilityFence(require_confirmed_inputs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AcceptChannelV2 ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AcceptChannelV2(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.AcceptChannelV2_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the AcceptChannelV2
	 */
	public AcceptChannelV2 clone() {
		long ret = bindings.AcceptChannelV2_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AcceptChannelV2 ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AcceptChannelV2(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the AcceptChannelV2.
	 */
	public long hash() {
		long ret = bindings.AcceptChannelV2_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two AcceptChannelV2s contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.AcceptChannelV2 b) {
		boolean ret = bindings.AcceptChannelV2_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof AcceptChannelV2)) return false;
		return this.eq((AcceptChannelV2)o);
	}
	/**
	 * Serialize the AcceptChannelV2 object into a byte array which can be read by AcceptChannelV2_read
	 */
	public byte[] write() {
		byte[] ret = bindings.AcceptChannelV2_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a AcceptChannelV2 from a byte array, created by AcceptChannelV2_write
	 */
	public static Result_AcceptChannelV2DecodeErrorZ read(byte[] ser) {
		long ret = bindings.AcceptChannelV2_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AcceptChannelV2DecodeErrorZ ret_hu_conv = Result_AcceptChannelV2DecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
