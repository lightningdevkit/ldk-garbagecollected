package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::ThirtyTwoBytes or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_PaymentPreimageZ extends CommonBase {
	private Option_PaymentPreimageZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_PaymentPreimageZ_free(ptr); }
	}
	static Option_PaymentPreimageZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_PaymentPreimageZ raw_val = bindings.LDKCOption_PaymentPreimageZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_PaymentPreimageZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_PaymentPreimageZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_PaymentPreimageZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_PaymentPreimageZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_PaymentPreimageZ contains a crate::c_types::ThirtyTwoBytes
	 */
	public final static class Some extends Option_PaymentPreimageZ {
		public final byte[] some;
		private Some(long ptr, bindings.LDKCOption_PaymentPreimageZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_PaymentPreimageZ contains nothing
	 */
	public final static class None extends Option_PaymentPreimageZ {
		private None(long ptr, bindings.LDKCOption_PaymentPreimageZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_PaymentPreimageZ containing a crate::c_types::ThirtyTwoBytes
	 */
	public static Option_PaymentPreimageZ some(byte[] o) {
		long ret = bindings.COption_PaymentPreimageZ_some(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentPreimageZ ret_hu_conv = org.ldk.structs.Option_PaymentPreimageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PaymentPreimageZ containing nothing
	 */
	public static Option_PaymentPreimageZ none() {
		long ret = bindings.COption_PaymentPreimageZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentPreimageZ ret_hu_conv = org.ldk.structs.Option_PaymentPreimageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_PaymentPreimageZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_PaymentPreimageZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_PaymentPreimageZ clone() {
		long ret = bindings.COption_PaymentPreimageZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentPreimageZ ret_hu_conv = org.ldk.structs.Option_PaymentPreimageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
