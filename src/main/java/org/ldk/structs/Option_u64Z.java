package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * An enum which can either contain a u64 or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_u64Z extends CommonBase {
	private Option_u64Z(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_u64Z_free(ptr); }
	}
	static Option_u64Z constr_from_ptr(long ptr) {
		bindings.LDKCOption_u64Z raw_val = bindings.LDKCOption_u64Z_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_u64Z.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_u64Z.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_u64Z.None.class) {
			return new None(ptr, (bindings.LDKCOption_u64Z.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class Some extends Option_u64Z {
		public final long some;
		private Some(long ptr, bindings.LDKCOption_u64Z.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	public final static class None extends Option_u64Z {
		private None(long ptr, bindings.LDKCOption_u64Z.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_u64Z containing a u64
	 */
	public static Option_u64Z constructor_some(long o) {
		long ret = bindings.COption_u64Z_some(o);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_u64Z containing nothing
	 */
	public static Option_u64Z constructor_none() {
		long ret = bindings.COption_u64Z_none();
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a new COption_u64Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_u64Z clone() {
		long ret = bindings.COption_u64Z_clone(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}