package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The contents of an onion message. In the context of offers, this would be the invoice, invoice
 * request, or invoice error.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OnionMessageContents extends CommonBase {
	private OnionMessageContents(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OnionMessageContents_free(ptr); }
	}
	static OnionMessageContents constr_from_ptr(long ptr) {
		bindings.LDKOnionMessageContents raw_val = bindings.LDKOnionMessageContents_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKOnionMessageContents.Custom.class) {
			return new Custom(ptr, (bindings.LDKOnionMessageContents.Custom)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * A custom onion message specified by the user.
	 */
	public final static class Custom extends OnionMessageContents {
		public final org.ldk.structs.CustomOnionMessageContents custom;
		private Custom(long ptr, bindings.LDKOnionMessageContents.Custom obj) {
			super(null, ptr);
			long custom = obj.custom;
			CustomOnionMessageContents ret_hu_conv = new CustomOnionMessageContents(null, custom);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
			this.custom = ret_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.OnionMessageContents_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the OnionMessageContents
	 */
	public OnionMessageContents clone() {
		long ret = bindings.OnionMessageContents_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessageContents ret_hu_conv = org.ldk.structs.OnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Custom-variant OnionMessageContents
	 */
	public static OnionMessageContents custom(org.ldk.structs.CustomOnionMessageContents a) {
		long ret = bindings.OnionMessageContents_custom(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessageContents ret_hu_conv = org.ldk.structs.OnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

}
