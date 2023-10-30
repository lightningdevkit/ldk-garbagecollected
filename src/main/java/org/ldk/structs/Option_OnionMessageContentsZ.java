package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::onion_message::packet::OnionMessageContents or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_OnionMessageContentsZ extends CommonBase {
	private Option_OnionMessageContentsZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_OnionMessageContentsZ_free(ptr); }
	}
	static Option_OnionMessageContentsZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_OnionMessageContentsZ raw_val = bindings.LDKCOption_OnionMessageContentsZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_OnionMessageContentsZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_OnionMessageContentsZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_OnionMessageContentsZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_OnionMessageContentsZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_OnionMessageContentsZ contains a crate::lightning::onion_message::packet::OnionMessageContents
	 */
	public final static class Some extends Option_OnionMessageContentsZ {
		public final org.ldk.structs.OnionMessageContents some;
		private Some(long ptr, bindings.LDKCOption_OnionMessageContentsZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			OnionMessageContents ret_hu_conv = new OnionMessageContents(null, some);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
			this.some = ret_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_OnionMessageContentsZ contains nothing
	 */
	public final static class None extends Option_OnionMessageContentsZ {
		private None(long ptr, bindings.LDKCOption_OnionMessageContentsZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_OnionMessageContentsZ containing a crate::lightning::onion_message::packet::OnionMessageContents
	 */
	public static Option_OnionMessageContentsZ some(org.ldk.structs.OnionMessageContents o) {
		long ret = bindings.COption_OnionMessageContentsZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_OnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_OnionMessageContentsZ containing nothing
	 */
	public static Option_OnionMessageContentsZ none() {
		long ret = bindings.COption_OnionMessageContentsZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_OnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_OnionMessageContentsZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_OnionMessageContentsZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_OnionMessageContentsZ clone() {
		long ret = bindings.COption_OnionMessageContentsZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_OnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
