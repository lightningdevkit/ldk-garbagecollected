using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::Transaction or not
 */
public class Option_TransactionZ : CommonBase {
	protected Option_TransactionZ(object _dummy, long ptr) : base(ptr) { }
	~Option_TransactionZ() {
		if (ptr != 0) { bindings.COption_TransactionZ_free(ptr); }
	}

	internal static Option_TransactionZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_TransactionZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_TransactionZ_Some(ptr);
			case 1: return new Option_TransactionZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_TransactionZ of type Some */
	public class Option_TransactionZ_Some : Option_TransactionZ {
		public byte[] some;
		internal Option_TransactionZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_TransactionZ_Some_get_some(ptr);
			byte[] some_conv = InternalUtils.decodeUint8Array(some);
			this.some = some_conv;
		}
	}
	/** A Option_TransactionZ of type None */
	public class Option_TransactionZ_None : Option_TransactionZ {
		internal Option_TransactionZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_TransactionZ containing a crate::c_types::Transaction
	 */
	public static org.ldk.structs.Option_TransactionZ some(byte[] o) {
		long ret = bindings.COption_TransactionZ_some(InternalUtils.encodeUint8Array(o));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_TransactionZ ret_hu_conv = org.ldk.structs.Option_TransactionZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_TransactionZ containing nothing
	 */
	public static org.ldk.structs.Option_TransactionZ none() {
		long ret = bindings.COption_TransactionZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_TransactionZ ret_hu_conv = org.ldk.structs.Option_TransactionZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_TransactionZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_TransactionZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Option_TransactionZ clone() {
		long ret = bindings.COption_TransactionZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_TransactionZ ret_hu_conv = org.ldk.structs.Option_TransactionZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
