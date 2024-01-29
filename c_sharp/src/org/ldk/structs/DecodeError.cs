using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An error in decoding a message or struct.
 */
public class DecodeError : CommonBase {
	protected DecodeError(object _dummy, long ptr) : base(ptr) { }
	~DecodeError() {
		if (ptr != 0) { bindings.DecodeError_free(ptr); }
	}

	internal static DecodeError constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKDecodeError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new DecodeError_UnknownVersion(ptr);
			case 1: return new DecodeError_UnknownRequiredFeature(ptr);
			case 2: return new DecodeError_InvalidValue(ptr);
			case 3: return new DecodeError_ShortRead(ptr);
			case 4: return new DecodeError_BadLengthDescriptor(ptr);
			case 5: return new DecodeError_Io(ptr);
			case 6: return new DecodeError_UnsupportedCompression(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A DecodeError of type UnknownVersion */
	public class DecodeError_UnknownVersion : DecodeError {
		internal DecodeError_UnknownVersion(long ptr) : base(null, ptr) {
		}
	}
	/** A DecodeError of type UnknownRequiredFeature */
	public class DecodeError_UnknownRequiredFeature : DecodeError {
		internal DecodeError_UnknownRequiredFeature(long ptr) : base(null, ptr) {
		}
	}
	/** A DecodeError of type InvalidValue */
	public class DecodeError_InvalidValue : DecodeError {
		internal DecodeError_InvalidValue(long ptr) : base(null, ptr) {
		}
	}
	/** A DecodeError of type ShortRead */
	public class DecodeError_ShortRead : DecodeError {
		internal DecodeError_ShortRead(long ptr) : base(null, ptr) {
		}
	}
	/** A DecodeError of type BadLengthDescriptor */
	public class DecodeError_BadLengthDescriptor : DecodeError {
		internal DecodeError_BadLengthDescriptor(long ptr) : base(null, ptr) {
		}
	}
	/** A DecodeError of type Io */
	public class DecodeError_Io : DecodeError {
		public IOError io;
		internal DecodeError_Io(long ptr) : base(null, ptr) {
			this.io = bindings.LDKDecodeError_Io_get_io(ptr);
		}
	}
	/** A DecodeError of type UnsupportedCompression */
	public class DecodeError_UnsupportedCompression : DecodeError {
		internal DecodeError_UnsupportedCompression(long ptr) : base(null, ptr) {
		}
	}
	internal long clone_ptr() {
		long ret = bindings.DecodeError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the DecodeError
	 */
	public DecodeError clone() {
		long ret = bindings.DecodeError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownVersion-variant DecodeError
	 */
	public static DecodeError unknown_version() {
		long ret = bindings.DecodeError_unknown_version();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownRequiredFeature-variant DecodeError
	 */
	public static DecodeError unknown_required_feature() {
		long ret = bindings.DecodeError_unknown_required_feature();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidValue-variant DecodeError
	 */
	public static DecodeError invalid_value() {
		long ret = bindings.DecodeError_invalid_value();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ShortRead-variant DecodeError
	 */
	public static DecodeError short_read() {
		long ret = bindings.DecodeError_short_read();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BadLengthDescriptor-variant DecodeError
	 */
	public static DecodeError bad_length_descriptor() {
		long ret = bindings.DecodeError_bad_length_descriptor();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Io-variant DecodeError
	 */
	public static DecodeError io(IOError a) {
		long ret = bindings.DecodeError_io(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnsupportedCompression-variant DecodeError
	 */
	public static DecodeError unsupported_compression() {
		long ret = bindings.DecodeError_unsupported_compression();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DecodeError.
	 */
	public long hash() {
		long ret = bindings.DecodeError_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two DecodeErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.DecodeError b) {
		bool ret = bindings.DecodeError_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is DecodeError)) return false;
		return this.eq((DecodeError)o);
	}
}
} } }
