package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RoutingFees extends CommonBase {
	RoutingFees(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.RoutingFees_free(ptr);
	}

	public static RoutingFees constructor_clone(RoutingFees orig) {
		long ret = bindings.RoutingFees_clone(orig == null ? 0 : orig.ptr & ~1);
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public int get_base_msat() {
		int ret = bindings.RoutingFees_get_base_msat(this.ptr);
		return ret;
	}

	public void set_base_msat(int val) {
		bindings.RoutingFees_set_base_msat(this.ptr, val);
	}

	public int get_proportional_millionths() {
		int ret = bindings.RoutingFees_get_proportional_millionths(this.ptr);
		return ret;
	}

	public void set_proportional_millionths(int val) {
		bindings.RoutingFees_set_proportional_millionths(this.ptr, val);
	}

	public static RoutingFees constructor_new(int base_msat_arg, int proportional_millionths_arg) {
		long ret = bindings.RoutingFees_new(base_msat_arg, proportional_millionths_arg);
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		return ret_hu_conv;
	}

	public static RoutingFees constructor_read(byte[] ser) {
		long ret = bindings.RoutingFees_read(ser);
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(RoutingFees obj) {
		byte[] ret = bindings.RoutingFees_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

}
