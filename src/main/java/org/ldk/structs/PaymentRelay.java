package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Parameters for relaying over a given [`BlindedHop`].
 * 
 * [`BlindedHop`]: crate::blinded_path::BlindedHop
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PaymentRelay extends CommonBase {
	PaymentRelay(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PaymentRelay_free(ptr); }
	}

	/**
	 * Number of blocks subtracted from an incoming HTLC's `cltv_expiry` for this [`BlindedHop`].
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.PaymentRelay_get_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Number of blocks subtracted from an incoming HTLC's `cltv_expiry` for this [`BlindedHop`].
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.PaymentRelay_set_cltv_expiry_delta(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Liquidity fee charged (in millionths of the amount transferred) for relaying a payment over
	 * this [`BlindedHop`], (i.e., 10,000 is 1%).
	 */
	public int get_fee_proportional_millionths() {
		int ret = bindings.PaymentRelay_get_fee_proportional_millionths(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Liquidity fee charged (in millionths of the amount transferred) for relaying a payment over
	 * this [`BlindedHop`], (i.e., 10,000 is 1%).
	 */
	public void set_fee_proportional_millionths(int val) {
		bindings.PaymentRelay_set_fee_proportional_millionths(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Base fee charged (in millisatoshi) for relaying a payment over this [`BlindedHop`].
	 */
	public int get_fee_base_msat() {
		int ret = bindings.PaymentRelay_get_fee_base_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Base fee charged (in millisatoshi) for relaying a payment over this [`BlindedHop`].
	 */
	public void set_fee_base_msat(int val) {
		bindings.PaymentRelay_set_fee_base_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new PaymentRelay given each field
	 */
	public static PaymentRelay of(short cltv_expiry_delta_arg, int fee_proportional_millionths_arg, int fee_base_msat_arg) {
		long ret = bindings.PaymentRelay_new(cltv_expiry_delta_arg, fee_proportional_millionths_arg, fee_base_msat_arg);
		Reference.reachabilityFence(cltv_expiry_delta_arg);
		Reference.reachabilityFence(fee_proportional_millionths_arg);
		Reference.reachabilityFence(fee_base_msat_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentRelay ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentRelay(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.PaymentRelay_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentRelay
	 */
	public PaymentRelay clone() {
		long ret = bindings.PaymentRelay_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentRelay ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentRelay(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the PaymentRelay object into a byte array which can be read by PaymentRelay_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PaymentRelay_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a PaymentRelay from a byte array, created by PaymentRelay_write
	 */
	public static Result_PaymentRelayDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PaymentRelay_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentRelayDecodeErrorZ ret_hu_conv = Result_PaymentRelayDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
