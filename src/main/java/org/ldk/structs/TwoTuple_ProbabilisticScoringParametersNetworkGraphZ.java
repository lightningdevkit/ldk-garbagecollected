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
public class TwoTuple_ProbabilisticScoringParametersNetworkGraphZ extends CommonBase {
	TwoTuple_ProbabilisticScoringParametersNetworkGraphZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_ProbabilisticScoringParametersNetworkGraphZ_free(ptr); }
	}

	/**
	 * 
	 */
	public ProbabilisticScoringParameters get_a() {
		long ret = bindings.C2Tuple_ProbabilisticScoringParametersNetworkGraphZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ProbabilisticScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ProbabilisticScoringParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public NetworkGraph get_b() {
		long ret = bindings.C2Tuple_ProbabilisticScoringParametersNetworkGraphZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		NetworkGraph ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NetworkGraph(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_ProbabilisticScoringParametersNetworkGraphZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_ProbabilisticScoringParametersNetworkGraphZ clone() {
		long ret = bindings.C2Tuple_ProbabilisticScoringParametersNetworkGraphZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ProbabilisticScoringParametersNetworkGraphZ ret_hu_conv = new TwoTuple_ProbabilisticScoringParametersNetworkGraphZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ProbabilisticScoringParametersNetworkGraphZ from the contained elements.
	 */
	public static TwoTuple_ProbabilisticScoringParametersNetworkGraphZ of(ProbabilisticScoringParameters a, NetworkGraph b) {
		long ret = bindings.C2Tuple_ProbabilisticScoringParametersNetworkGraphZ_new(a == null ? 0 : a.ptr & ~1, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ProbabilisticScoringParametersNetworkGraphZ ret_hu_conv = new TwoTuple_ProbabilisticScoringParametersNetworkGraphZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(b);
		return ret_hu_conv;
	}

}
