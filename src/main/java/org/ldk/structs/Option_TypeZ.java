package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::ln::wire::Type or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_TypeZ extends CommonBase {
	private Option_TypeZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_TypeZ_free(ptr); }
	}
	static Option_TypeZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_TypeZ raw_val = bindings.LDKCOption_TypeZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_TypeZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_TypeZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_TypeZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_TypeZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_TypeZ contains a crate::lightning::ln::wire::Type
	 */
	public final static class Some extends Option_TypeZ {
		public final Type some;
		private Some(long ptr, bindings.LDKCOption_TypeZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			Type ret_hu_conv = new Type(null, some);
			ret_hu_conv.ptrs_to.add(this);
			this.some = ret_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_TypeZ contains nothing
	 */
	public final static class None extends Option_TypeZ {
		private None(long ptr, bindings.LDKCOption_TypeZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_TypeZ containing a crate::lightning::ln::wire::Type
	 */
	public static Option_TypeZ some(Type o) {
		long ret = bindings.COption_TypeZ_some(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_TypeZ ret_hu_conv = Option_TypeZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_TypeZ containing nothing
	 */
	public static Option_TypeZ none() {
		long ret = bindings.COption_TypeZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_TypeZ ret_hu_conv = Option_TypeZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_TypeZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_TypeZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_TypeZ clone() {
		long ret = bindings.COption_TypeZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_TypeZ ret_hu_conv = Option_TypeZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
