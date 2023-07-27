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
public class Option_PaymentSecretZ extends CommonBase {
	private Option_PaymentSecretZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_PaymentSecretZ_free(ptr); }
	}
	static Option_PaymentSecretZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_PaymentSecretZ raw_val = bindings.LDKCOption_PaymentSecretZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_PaymentSecretZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_PaymentSecretZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_PaymentSecretZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_PaymentSecretZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_PaymentSecretZ contains a crate::c_types::ThirtyTwoBytes
	 */
	public final static class Some extends Option_PaymentSecretZ {
		public final byte[] some;
		private Some(long ptr, bindings.LDKCOption_PaymentSecretZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_PaymentSecretZ contains nothing
	 */
	public final static class None extends Option_PaymentSecretZ {
		private None(long ptr, bindings.LDKCOption_PaymentSecretZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_PaymentSecretZ containing a crate::c_types::ThirtyTwoBytes
	 */
	public static Option_PaymentSecretZ some(byte[] o) {
		long ret = bindings.COption_PaymentSecretZ_some(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentSecretZ ret_hu_conv = org.ldk.structs.Option_PaymentSecretZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PaymentSecretZ containing nothing
	 */
	public static Option_PaymentSecretZ none() {
		long ret = bindings.COption_PaymentSecretZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentSecretZ ret_hu_conv = org.ldk.structs.Option_PaymentSecretZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_PaymentSecretZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_PaymentSecretZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_PaymentSecretZ clone() {
		long ret = bindings.COption_PaymentSecretZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentSecretZ ret_hu_conv = org.ldk.structs.Option_PaymentSecretZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
