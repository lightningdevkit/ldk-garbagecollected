package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A closing_signed message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ClosingSigned extends CommonBase {
	ClosingSigned(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ClosingSigned_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.ClosingSigned_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.ClosingSigned_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The proposed total fee for the closing transaction
	 */
	public long get_fee_satoshis() {
		long ret = bindings.ClosingSigned_get_fee_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The proposed total fee for the closing transaction
	 */
	public void set_fee_satoshis(long val) {
		bindings.ClosingSigned_set_fee_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A signature on the closing transaction
	 */
	public byte[] get_signature() {
		byte[] ret = bindings.ClosingSigned_get_signature(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A signature on the closing transaction
	 */
	public void set_signature(byte[] val) {
		bindings.ClosingSigned_set_signature(this.ptr, InternalUtils.check_arr_len(val, 64));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum and maximum fees which the sender is willing to accept, provided only by new
	 * nodes.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ClosingSignedFeeRange get_fee_range() {
		long ret = bindings.ClosingSigned_get_fee_range(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ClosingSignedFeeRange ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ClosingSignedFeeRange(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The minimum and maximum fees which the sender is willing to accept, provided only by new
	 * nodes.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_fee_range(@Nullable ClosingSignedFeeRange val) {
		bindings.ClosingSigned_set_fee_range(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ClosingSigned given each field
	 */
	public static ClosingSigned of(byte[] channel_id_arg, long fee_satoshis_arg, byte[] signature_arg, ClosingSignedFeeRange fee_range_arg) {
		long ret = bindings.ClosingSigned_new(InternalUtils.check_arr_len(channel_id_arg, 32), fee_satoshis_arg, InternalUtils.check_arr_len(signature_arg, 64), fee_range_arg == null ? 0 : fee_range_arg.ptr & ~1);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(fee_satoshis_arg);
		Reference.reachabilityFence(signature_arg);
		Reference.reachabilityFence(fee_range_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ClosingSigned ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ClosingSigned(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ClosingSigned_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ClosingSigned
	 */
	public ClosingSigned clone() {
		long ret = bindings.ClosingSigned_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ClosingSigned ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ClosingSigned(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ClosingSigned object into a byte array which can be read by ClosingSigned_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ClosingSigned_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ClosingSigned from a byte array, created by ClosingSigned_write
	 */
	public static Result_ClosingSignedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ClosingSigned_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ClosingSignedDecodeErrorZ ret_hu_conv = Result_ClosingSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
