package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::derived::CVec_u8Z or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_ScriptZ extends CommonBase {
	private Option_ScriptZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_ScriptZ_free(ptr); }
	}
	static Option_ScriptZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_ScriptZ raw_val = bindings.LDKCOption_ScriptZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_ScriptZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_ScriptZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_ScriptZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_ScriptZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_ScriptZ contains a crate::c_types::derived::CVec_u8Z
	 */
	public final static class Some extends Option_ScriptZ {
		public final byte[] some;
		private Some(long ptr, bindings.LDKCOption_ScriptZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_ScriptZ contains nothing
	 */
	public final static class None extends Option_ScriptZ {
		private None(long ptr, bindings.LDKCOption_ScriptZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_ScriptZ containing a crate::c_types::derived::CVec_u8Z
	 */
	public static Option_ScriptZ some(byte[] o) {
		long ret = bindings.COption_ScriptZ_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScriptZ ret_hu_conv = org.ldk.structs.Option_ScriptZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ScriptZ containing nothing
	 */
	public static Option_ScriptZ none() {
		long ret = bindings.COption_ScriptZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScriptZ ret_hu_conv = org.ldk.structs.Option_ScriptZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_ScriptZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_ScriptZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_ScriptZ clone() {
		long ret = bindings.COption_ScriptZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScriptZ ret_hu_conv = org.ldk.structs.Option_ScriptZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
