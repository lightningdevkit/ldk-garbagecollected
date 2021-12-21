package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The minimum and maximum fees which the sender is willing to place on the closing transaction.
 * This is provided in [`ClosingSigned`] by both sides to indicate the fee range they are willing
 * to use.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ClosingSignedFeeRange extends CommonBase {
	ClosingSignedFeeRange(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ClosingSignedFeeRange_free(ptr); }
	}

	/**
	 * The minimum absolute fee, in satoshis, which the sender is willing to place on the closing
	 * transaction.
	 */
	public long get_min_fee_satoshis() {
		long ret = bindings.ClosingSignedFeeRange_get_min_fee_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum absolute fee, in satoshis, which the sender is willing to place on the closing
	 * transaction.
	 */
	public void set_min_fee_satoshis(long val) {
		bindings.ClosingSignedFeeRange_set_min_fee_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum absolute fee, in satoshis, which the sender is willing to place on the closing
	 * transaction.
	 */
	public long get_max_fee_satoshis() {
		long ret = bindings.ClosingSignedFeeRange_get_max_fee_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum absolute fee, in satoshis, which the sender is willing to place on the closing
	 * transaction.
	 */
	public void set_max_fee_satoshis(long val) {
		bindings.ClosingSignedFeeRange_set_max_fee_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ClosingSignedFeeRange given each field
	 */
	public static ClosingSignedFeeRange of(long min_fee_satoshis_arg, long max_fee_satoshis_arg) {
		long ret = bindings.ClosingSignedFeeRange_new(min_fee_satoshis_arg, max_fee_satoshis_arg);
		Reference.reachabilityFence(min_fee_satoshis_arg);
		Reference.reachabilityFence(max_fee_satoshis_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ClosingSignedFeeRange ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ClosingSignedFeeRange(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ClosingSignedFeeRange_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ClosingSignedFeeRange
	 */
	public ClosingSignedFeeRange clone() {
		long ret = bindings.ClosingSignedFeeRange_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ClosingSignedFeeRange ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ClosingSignedFeeRange(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ClosingSignedFeeRange object into a byte array which can be read by ClosingSignedFeeRange_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ClosingSignedFeeRange_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ClosingSignedFeeRange from a byte array, created by ClosingSignedFeeRange_write
	 */
	public static Result_ClosingSignedFeeRangeDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ClosingSignedFeeRange_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ClosingSignedFeeRangeDecodeErrorZ ret_hu_conv = Result_ClosingSignedFeeRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
