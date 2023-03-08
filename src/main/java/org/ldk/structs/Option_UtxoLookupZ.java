package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::routing::utxo::UtxoLookup or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_UtxoLookupZ extends CommonBase {
	private Option_UtxoLookupZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_UtxoLookupZ_free(ptr); }
	}
	static Option_UtxoLookupZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_UtxoLookupZ raw_val = bindings.LDKCOption_UtxoLookupZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_UtxoLookupZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_UtxoLookupZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_UtxoLookupZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_UtxoLookupZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_UtxoLookupZ contains a crate::lightning::routing::utxo::UtxoLookup
	 */
	public final static class Some extends Option_UtxoLookupZ {
		public final org.ldk.structs.UtxoLookup some;
		private Some(long ptr, bindings.LDKCOption_UtxoLookupZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			UtxoLookup ret_hu_conv = new UtxoLookup(null, some);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
			this.some = ret_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_UtxoLookupZ contains nothing
	 */
	public final static class None extends Option_UtxoLookupZ {
		private None(long ptr, bindings.LDKCOption_UtxoLookupZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_UtxoLookupZ containing a crate::lightning::routing::utxo::UtxoLookup
	 */
	public static Option_UtxoLookupZ some(org.ldk.structs.UtxoLookup o) {
		long ret = bindings.COption_UtxoLookupZ_some(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_UtxoLookupZ ret_hu_conv = org.ldk.structs.Option_UtxoLookupZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_UtxoLookupZ containing nothing
	 */
	public static Option_UtxoLookupZ none() {
		long ret = bindings.COption_UtxoLookupZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_UtxoLookupZ ret_hu_conv = org.ldk.structs.Option_UtxoLookupZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
