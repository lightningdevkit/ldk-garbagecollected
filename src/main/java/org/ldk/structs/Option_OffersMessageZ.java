package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::onion_message::offers::OffersMessage or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_OffersMessageZ extends CommonBase {
	private Option_OffersMessageZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_OffersMessageZ_free(ptr); }
	}
	static Option_OffersMessageZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_OffersMessageZ raw_val = bindings.LDKCOption_OffersMessageZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_OffersMessageZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_OffersMessageZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_OffersMessageZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_OffersMessageZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_OffersMessageZ contains a crate::lightning::onion_message::offers::OffersMessage
	 */
	public final static class Some extends Option_OffersMessageZ {
		public final org.ldk.structs.OffersMessage some;
		private Some(long ptr, bindings.LDKCOption_OffersMessageZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.OffersMessage some_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_OffersMessageZ contains nothing
	 */
	public final static class None extends Option_OffersMessageZ {
		private None(long ptr, bindings.LDKCOption_OffersMessageZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_OffersMessageZ containing a crate::lightning::onion_message::offers::OffersMessage
	 */
	public static Option_OffersMessageZ some(org.ldk.structs.OffersMessage o) {
		long ret = bindings.COption_OffersMessageZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OffersMessageZ ret_hu_conv = org.ldk.structs.Option_OffersMessageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_OffersMessageZ containing nothing
	 */
	public static Option_OffersMessageZ none() {
		long ret = bindings.COption_OffersMessageZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OffersMessageZ ret_hu_conv = org.ldk.structs.Option_OffersMessageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_OffersMessageZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_OffersMessageZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_OffersMessageZ clone() {
		long ret = bindings.COption_OffersMessageZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OffersMessageZ ret_hu_conv = org.ldk.structs.Option_OffersMessageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
