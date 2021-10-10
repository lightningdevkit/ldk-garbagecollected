package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Fees for routing via a given channel or a node
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RoutingFees extends CommonBase {
	RoutingFees(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RoutingFees_free(ptr); }
	}

	/**
	 * Flat routing fee in satoshis
	 */
	public int get_base_msat() {
		int ret = bindings.RoutingFees_get_base_msat(this.ptr);
		return ret;
	}

	/**
	 * Flat routing fee in satoshis
	 */
	public void set_base_msat(int val) {
		bindings.RoutingFees_set_base_msat(this.ptr, val);
	}

	/**
	 * Liquidity-based routing fee in millionths of a routed amount.
	 * In other words, 10000 is 1%.
	 */
	public int get_proportional_millionths() {
		int ret = bindings.RoutingFees_get_proportional_millionths(this.ptr);
		return ret;
	}

	/**
	 * Liquidity-based routing fee in millionths of a routed amount.
	 * In other words, 10000 is 1%.
	 */
	public void set_proportional_millionths(int val) {
		bindings.RoutingFees_set_proportional_millionths(this.ptr, val);
	}

	/**
	 * Constructs a new RoutingFees given each field
	 */
	public static RoutingFees of(int base_msat_arg, int proportional_millionths_arg) {
		long ret = bindings.RoutingFees_new(base_msat_arg, proportional_millionths_arg);
		if (ret >= 0 && ret < 1024) { return null; }
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two RoutingFeess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(RoutingFees b) {
		boolean ret = bindings.RoutingFees_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Creates a copy of the RoutingFees
	 */
	public RoutingFees clone() {
		long ret = bindings.RoutingFees_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two RoutingFeess contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.RoutingFees_hash(this.ptr);
		return ret;
	}

	/**
	 * Serialize the RoutingFees object into a byte array which can be read by RoutingFees_read
	 */
	public byte[] write() {
		byte[] ret = bindings.RoutingFees_write(this.ptr);
		return ret;
	}

	/**
	 * Read a RoutingFees from a byte array, created by RoutingFees_write
	 */
	public static Result_RoutingFeesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RoutingFees_read(ser);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
