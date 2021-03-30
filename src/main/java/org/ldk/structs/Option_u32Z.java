package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * An enum which can either contain a u32 or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_u32Z extends CommonBase {
	private Option_u32Z(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_u32Z_free(ptr); }
	}
	static Option_u32Z constr_from_ptr(long ptr) {
		bindings.LDKCOption_u32Z raw_val = bindings.LDKCOption_u32Z_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_u32Z.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_u32Z.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_u32Z.None.class) {
			return new None(ptr, (bindings.LDKCOption_u32Z.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class Some extends Option_u32Z {
		public final int some;
		private Some(long ptr, bindings.LDKCOption_u32Z.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	public final static class None extends Option_u32Z {
		private None(long ptr, bindings.LDKCOption_u32Z.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_u32Z containing a u32
	 */
	public static Option_u32Z constructor_some(int o) {
		long ret = bindings.COption_u32Z_some(o);
		Option_u32Z ret_hu_conv = Option_u32Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_u32Z containing nothing
	 */
	public static Option_u32Z constructor_none() {
		long ret = bindings.COption_u32Z_none();
		Option_u32Z ret_hu_conv = Option_u32Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a new COption_u32Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_u32Z clone() {
		long ret = bindings.COption_u32Z_clone(this.ptr);
		Option_u32Z ret_hu_conv = Option_u32Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
