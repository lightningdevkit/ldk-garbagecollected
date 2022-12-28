package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::onion_message::packet::CustomOnionMessageContents or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_CustomOnionMessageContentsZ extends CommonBase {
	private Option_CustomOnionMessageContentsZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_CustomOnionMessageContentsZ_free(ptr); }
	}
	static Option_CustomOnionMessageContentsZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_CustomOnionMessageContentsZ raw_val = bindings.LDKCOption_CustomOnionMessageContentsZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_CustomOnionMessageContentsZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_CustomOnionMessageContentsZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_CustomOnionMessageContentsZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_CustomOnionMessageContentsZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_CustomOnionMessageContentsZ contains a crate::lightning::onion_message::packet::CustomOnionMessageContents
	 */
	public final static class Some extends Option_CustomOnionMessageContentsZ {
		public final org.ldk.structs.CustomOnionMessageContents some;
		private Some(long ptr, bindings.LDKCOption_CustomOnionMessageContentsZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			CustomOnionMessageContents ret_hu_conv = new CustomOnionMessageContents(null, some);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
			this.some = ret_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_CustomOnionMessageContentsZ contains nothing
	 */
	public final static class None extends Option_CustomOnionMessageContentsZ {
		private None(long ptr, bindings.LDKCOption_CustomOnionMessageContentsZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_CustomOnionMessageContentsZ containing a crate::lightning::onion_message::packet::CustomOnionMessageContents
	 */
	public static Option_CustomOnionMessageContentsZ some(org.ldk.structs.CustomOnionMessageContents o) {
		long ret = bindings.COption_CustomOnionMessageContentsZ_some(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CustomOnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_CustomOnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CustomOnionMessageContentsZ containing nothing
	 */
	public static Option_CustomOnionMessageContentsZ none() {
		long ret = bindings.COption_CustomOnionMessageContentsZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CustomOnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_CustomOnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_CustomOnionMessageContentsZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_CustomOnionMessageContentsZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CustomOnionMessageContentsZ clone() {
		long ret = bindings.COption_CustomOnionMessageContentsZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CustomOnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_CustomOnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
