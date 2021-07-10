package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * An enum which can either contain a u16 or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_u16Z extends CommonBase {
	private Option_u16Z(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_u16Z_free(ptr); }
	}
	static Option_u16Z constr_from_ptr(long ptr) {
		bindings.LDKCOption_u16Z raw_val = bindings.LDKCOption_u16Z_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_u16Z.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_u16Z.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_u16Z.None.class) {
			return new None(ptr, (bindings.LDKCOption_u16Z.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class Some extends Option_u16Z {
		public final short some;
		private Some(long ptr, bindings.LDKCOption_u16Z.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	public final static class None extends Option_u16Z {
		private None(long ptr, bindings.LDKCOption_u16Z.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_u16Z containing a u16
	 */
	public static Option_u16Z some(short o) {
		long ret = bindings.COption_u16Z_some(o);
		Option_u16Z ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_u16Z containing nothing
	 */
	public static Option_u16Z none() {
		long ret = bindings.COption_u16Z_none();
		Option_u16Z ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a new COption_u16Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_u16Z clone() {
		long ret = bindings.COption_u16Z_clone(this.ptr);
		Option_u16Z ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
