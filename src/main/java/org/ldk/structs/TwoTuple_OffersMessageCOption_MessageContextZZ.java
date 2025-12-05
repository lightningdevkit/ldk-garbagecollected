package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A Tuple
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TwoTuple_OffersMessageCOption_MessageContextZZ extends CommonBase {
	TwoTuple_OffersMessageCOption_MessageContextZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_OffersMessageCOption_MessageContextZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public OffersMessage get_a() {
		long ret = bindings.C2Tuple_OffersMessageCOption_MessageContextZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OffersMessage ret_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public Option_MessageContextZ get_b() {
		long ret = bindings.C2Tuple_OffersMessageCOption_MessageContextZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MessageContextZ ret_hu_conv = org.ldk.structs.Option_MessageContextZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_OffersMessageCOption_MessageContextZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_OffersMessageCOption_MessageContextZZ clone() {
		long ret = bindings.C2Tuple_OffersMessageCOption_MessageContextZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OffersMessageCOption_MessageContextZZ ret_hu_conv = new TwoTuple_OffersMessageCOption_MessageContextZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_OffersMessageCOption_MessageContextZZ from the contained elements.
	 */
	public static TwoTuple_OffersMessageCOption_MessageContextZZ of(org.ldk.structs.OffersMessage a, org.ldk.structs.Option_MessageContextZ b) {
		long ret = bindings.C2Tuple_OffersMessageCOption_MessageContextZZ_new(a.ptr, b.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OffersMessageCOption_MessageContextZZ ret_hu_conv = new TwoTuple_OffersMessageCOption_MessageContextZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
