package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple_usizeTransactionZ or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_C2Tuple_usizeTransactionZZ extends CommonBase {
	private Option_C2Tuple_usizeTransactionZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_C2Tuple_usizeTransactionZZ_free(ptr); }
	}
	static Option_C2Tuple_usizeTransactionZZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_C2Tuple_usizeTransactionZZ raw_val = bindings.LDKCOption_C2Tuple_usizeTransactionZZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_C2Tuple_usizeTransactionZZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_C2Tuple_usizeTransactionZZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_C2Tuple_usizeTransactionZZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_C2Tuple_usizeTransactionZZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class Some extends Option_C2Tuple_usizeTransactionZZ {
		public final TwoTuple<Long, byte[]> some;
		private Some(long ptr, bindings.LDKCOption_C2Tuple_usizeTransactionZZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			long some_a = bindings.LDKC2Tuple_usizeTransactionZ_get_a(some);
			byte[] some_b = bindings.LDKC2Tuple_usizeTransactionZ_get_b(some);
			TwoTuple<Long, byte[]> some_conv = new TwoTuple<Long, byte[]>(some_a, some_b, () -> {
				bindings.C2Tuple_usizeTransactionZ_free(some);
			});
			this.some = some_conv;
		}
	}
	public final static class None extends Option_C2Tuple_usizeTransactionZZ {
		private None(long ptr, bindings.LDKCOption_C2Tuple_usizeTransactionZZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_C2Tuple_usizeTransactionZZ containing a crate::c_types::derived::C2Tuple_usizeTransactionZ
	 */
	public static Option_C2Tuple_usizeTransactionZZ constructor_some(TwoTuple<Long, byte[]> o) {
		long ret = bindings.COption_C2Tuple_usizeTransactionZZ_some(bindings.C2Tuple_usizeTransactionZ_new(o.a, o.b));
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_usizeTransactionZZ containing nothing
	 */
	public static Option_C2Tuple_usizeTransactionZZ constructor_none() {
		long ret = bindings.COption_C2Tuple_usizeTransactionZZ_none();
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
