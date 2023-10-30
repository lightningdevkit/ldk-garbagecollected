package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The contents of an [`OnionMessage`] as read from the wire.
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ParsedOnionMessageContents extends CommonBase {
	private ParsedOnionMessageContents(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ParsedOnionMessageContents_free(ptr); }
	}
	static ParsedOnionMessageContents constr_from_ptr(long ptr) {
		bindings.LDKParsedOnionMessageContents raw_val = bindings.LDKParsedOnionMessageContents_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKParsedOnionMessageContents.Offers.class) {
			return new Offers(ptr, (bindings.LDKParsedOnionMessageContents.Offers)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParsedOnionMessageContents.Custom.class) {
			return new Custom(ptr, (bindings.LDKParsedOnionMessageContents.Custom)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * A message related to BOLT 12 Offers.
	 */
	public final static class Offers extends ParsedOnionMessageContents {
		public final org.ldk.structs.OffersMessage offers;
		private Offers(long ptr, bindings.LDKParsedOnionMessageContents.Offers obj) {
			super(null, ptr);
			long offers = obj.offers;
			org.ldk.structs.OffersMessage offers_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(offers);
			if (offers_hu_conv != null) { offers_hu_conv.ptrs_to.add(this); };
			this.offers = offers_hu_conv;
		}
	}
	/**
	 * A custom onion message specified by the user.
	 */
	public final static class Custom extends ParsedOnionMessageContents {
		public final org.ldk.structs.OnionMessageContents custom;
		private Custom(long ptr, bindings.LDKParsedOnionMessageContents.Custom obj) {
			super(null, ptr);
			long custom = obj.custom;
			OnionMessageContents ret_hu_conv = new OnionMessageContents(null, custom);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
			this.custom = ret_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.ParsedOnionMessageContents_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ParsedOnionMessageContents
	 */
	public ParsedOnionMessageContents clone() {
		long ret = bindings.ParsedOnionMessageContents_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParsedOnionMessageContents ret_hu_conv = org.ldk.structs.ParsedOnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Offers-variant ParsedOnionMessageContents
	 */
	public static ParsedOnionMessageContents offers(org.ldk.structs.OffersMessage a) {
		long ret = bindings.ParsedOnionMessageContents_offers(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParsedOnionMessageContents ret_hu_conv = org.ldk.structs.ParsedOnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Custom-variant ParsedOnionMessageContents
	 */
	public static ParsedOnionMessageContents custom(org.ldk.structs.OnionMessageContents a) {
		long ret = bindings.ParsedOnionMessageContents_custom(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParsedOnionMessageContents ret_hu_conv = org.ldk.structs.ParsedOnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public OnionMessageContents as_OnionMessageContents() {
		long ret = bindings.ParsedOnionMessageContents_as_OnionMessageContents(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageContents ret_hu_conv = new OnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ParsedOnionMessageContents object into a byte array which can be read by ParsedOnionMessageContents_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ParsedOnionMessageContents_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
