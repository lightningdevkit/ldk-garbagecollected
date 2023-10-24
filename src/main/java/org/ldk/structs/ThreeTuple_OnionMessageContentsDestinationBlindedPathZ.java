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
public class ThreeTuple_OnionMessageContentsDestinationBlindedPathZ extends CommonBase {
	ThreeTuple_OnionMessageContentsDestinationBlindedPathZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_free(ptr); }
	}

	/**
	 * 
	 */
	public OnionMessageContents get_a() {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageContents ret_hu_conv = new OnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public Destination get_b() {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Destination ret_hu_conv = org.ldk.structs.Destination.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public BlindedPath get_c() {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_get_c(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedPath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedPath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_OnionMessageContentsDestinationBlindedPathZ clone() {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OnionMessageContentsDestinationBlindedPathZ ret_hu_conv = new ThreeTuple_OnionMessageContentsDestinationBlindedPathZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_OnionMessageContentsDestinationBlindedPathZ from the contained elements.
	 */
	public static ThreeTuple_OnionMessageContentsDestinationBlindedPathZ of(org.ldk.structs.OnionMessageContents a, org.ldk.structs.Destination b, org.ldk.structs.BlindedPath c) {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_new(a.ptr, b.ptr, c == null ? 0 : c.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OnionMessageContentsDestinationBlindedPathZ ret_hu_conv = new ThreeTuple_OnionMessageContentsDestinationBlindedPathZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(c); };
		return ret_hu_conv;
	}

}
