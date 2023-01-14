using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_SignatureCVec_SignatureZZ : CommonBase {
	internal TwoTuple_SignatureCVec_SignatureZZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_SignatureCVec_SignatureZZ() {
		if (ptr != 0) { bindings.C2Tuple_SignatureCVec_SignatureZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_SignatureCVec_SignatureZZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public byte[][] get_b() {
		byte[][] ret = bindings.C2Tuple_SignatureCVec_SignatureZZ_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_SignatureCVec_SignatureZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_SignatureCVec_SignatureZZ clone() {
		long ret = bindings.C2Tuple_SignatureCVec_SignatureZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_SignatureCVec_SignatureZZ ret_hu_conv = new TwoTuple_SignatureCVec_SignatureZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_SignatureCVec_SignatureZZ from the contained elements.
	 */
	public static TwoTuple_SignatureCVec_SignatureZZ of(byte[] a, byte[][] b) {
		long ret = bindings.C2Tuple_SignatureCVec_SignatureZZ_new(InternalUtils.check_arr_len(a, 64), b != null ? InternalUtils.mapArray(b, b_conv_8 => InternalUtils.check_arr_len(b_conv_8, 64)) : null);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_SignatureCVec_SignatureZZ ret_hu_conv = new TwoTuple_SignatureCVec_SignatureZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
