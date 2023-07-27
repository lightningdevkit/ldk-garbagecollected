package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::SecretKey or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_KeyPairZ extends CommonBase {
	private Option_KeyPairZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_KeyPairZ_free(ptr); }
	}
	static Option_KeyPairZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_KeyPairZ raw_val = bindings.LDKCOption_KeyPairZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_KeyPairZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_KeyPairZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_KeyPairZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_KeyPairZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_KeyPairZ contains a crate::c_types::SecretKey
	 */
	public final static class Some extends Option_KeyPairZ {
		public final byte[] some;
		private Some(long ptr, bindings.LDKCOption_KeyPairZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_KeyPairZ contains nothing
	 */
	public final static class None extends Option_KeyPairZ {
		private None(long ptr, bindings.LDKCOption_KeyPairZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_KeyPairZ containing a crate::c_types::SecretKey
	 */
	public static Option_KeyPairZ some(byte[] o) {
		long ret = bindings.COption_KeyPairZ_some(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_KeyPairZ ret_hu_conv = org.ldk.structs.Option_KeyPairZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_KeyPairZ containing nothing
	 */
	public static Option_KeyPairZ none() {
		long ret = bindings.COption_KeyPairZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_KeyPairZ ret_hu_conv = org.ldk.structs.Option_KeyPairZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_KeyPairZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_KeyPairZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_KeyPairZ clone() {
		long ret = bindings.COption_KeyPairZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_KeyPairZ ret_hu_conv = org.ldk.structs.Option_KeyPairZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
