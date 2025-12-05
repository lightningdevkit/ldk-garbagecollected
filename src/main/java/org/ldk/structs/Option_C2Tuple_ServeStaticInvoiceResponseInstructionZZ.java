package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple_ServeStaticInvoiceResponseInstructionZ or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ extends CommonBase {
	private Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_free(ptr); }
	}
	static Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ raw_val = bindings.LDKCOption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ contains a crate::c_types::derived::C2Tuple_ServeStaticInvoiceResponseInstructionZ
	 */
	public final static class Some extends Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ {
		public final org.ldk.structs.TwoTuple_ServeStaticInvoiceResponseInstructionZ some;
		private Some(long ptr, bindings.LDKCOption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			TwoTuple_ServeStaticInvoiceResponseInstructionZ some_hu_conv = new TwoTuple_ServeStaticInvoiceResponseInstructionZ(null, some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ contains nothing
	 */
	public final static class None extends Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ {
		private None(long ptr, bindings.LDKCOption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ containing a crate::c_types::derived::C2Tuple_ServeStaticInvoiceResponseInstructionZ
	 */
	public static Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ some(org.ldk.structs.TwoTuple_ServeStaticInvoiceResponseInstructionZ o) {
		long ret = bindings.COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ containing nothing
	 */
	public static Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ none() {
		long ret = bindings.COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ clone() {
		long ret = bindings.COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
