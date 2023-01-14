package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::derived::C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ extends CommonBase {
	private Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(ptr); }
	}
	static Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ raw_val = bindings.LDKCOption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ contains a crate::c_types::derived::C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ
	 */
	public final static class Some extends Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ {
		public final org.ldk.structs.ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ some;
		private Some(long ptr, bindings.LDKCOption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ some_hu_conv = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ contains nothing
	 */
	public final static class None extends Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ {
		private None(long ptr, bindings.LDKCOption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ containing a crate::c_types::derived::C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ
	 */
	public static Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ some(org.ldk.structs.ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ o) {
		long ret = bindings.COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_some(o != null ? o.ptr : 0);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_hu_conv = org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ containing nothing
	 */
	public static Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ none() {
		long ret = bindings.COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_hu_conv = org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ clone() {
		long ret = bindings.COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_hu_conv = org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
