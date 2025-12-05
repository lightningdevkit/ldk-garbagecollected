using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple_OfferPathsResponseInstructionZ or not
 */
public class Option_C2Tuple_OfferPathsResponseInstructionZZ : CommonBase {
	protected Option_C2Tuple_OfferPathsResponseInstructionZZ(object _dummy, long ptr) : base(ptr) { }
	~Option_C2Tuple_OfferPathsResponseInstructionZZ() {
		if (ptr != 0) { bindings.COption_C2Tuple_OfferPathsResponseInstructionZZ_free(ptr); }
	}

	internal static Option_C2Tuple_OfferPathsResponseInstructionZZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_C2Tuple_OfferPathsResponseInstructionZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_C2Tuple_OfferPathsResponseInstructionZZ_Some(ptr);
			case 1: return new Option_C2Tuple_OfferPathsResponseInstructionZZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_C2Tuple_OfferPathsResponseInstructionZZ of type Some */
	public class Option_C2Tuple_OfferPathsResponseInstructionZZ_Some : Option_C2Tuple_OfferPathsResponseInstructionZZ {
		public org.ldk.structs.TwoTuple_OfferPathsResponseInstructionZ some;
		internal Option_C2Tuple_OfferPathsResponseInstructionZZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_C2Tuple_OfferPathsResponseInstructionZZ_Some_get_some(ptr);
			TwoTuple_OfferPathsResponseInstructionZ some_hu_conv = new TwoTuple_OfferPathsResponseInstructionZ(null, some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_C2Tuple_OfferPathsResponseInstructionZZ of type None */
	public class Option_C2Tuple_OfferPathsResponseInstructionZZ_None : Option_C2Tuple_OfferPathsResponseInstructionZZ {
		internal Option_C2Tuple_OfferPathsResponseInstructionZZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_C2Tuple_OfferPathsResponseInstructionZZ containing a crate::c_types::derived::C2Tuple_OfferPathsResponseInstructionZ
	 */
	public static org.ldk.structs.Option_C2Tuple_OfferPathsResponseInstructionZZ some(org.ldk.structs.TwoTuple_OfferPathsResponseInstructionZ o) {
		long ret = bindings.COption_C2Tuple_OfferPathsResponseInstructionZZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_OfferPathsResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_OfferPathsResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_OfferPathsResponseInstructionZZ containing nothing
	 */
	public static org.ldk.structs.Option_C2Tuple_OfferPathsResponseInstructionZZ none() {
		long ret = bindings.COption_C2Tuple_OfferPathsResponseInstructionZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_OfferPathsResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_OfferPathsResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_C2Tuple_OfferPathsResponseInstructionZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_C2Tuple_OfferPathsResponseInstructionZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Option_C2Tuple_OfferPathsResponseInstructionZZ clone() {
		long ret = bindings.COption_C2Tuple_OfferPathsResponseInstructionZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_OfferPathsResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_OfferPathsResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
