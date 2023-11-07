using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Errors that indicate what is wrong with the invoice. They have some granularity for debug
 * reasons, but should generally result in an \"invalid BOLT11 invoice\" message for the user.
 */
public class Bolt11ParseError : CommonBase {
	protected Bolt11ParseError(object _dummy, long ptr) : base(ptr) { }
	~Bolt11ParseError() {
		if (ptr != 0) { bindings.Bolt11ParseError_free(ptr); }
	}

	internal static Bolt11ParseError constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKBolt11ParseError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Bolt11ParseError_Bech32Error(ptr);
			case 1: return new Bolt11ParseError_ParseAmountError(ptr);
			case 2: return new Bolt11ParseError_MalformedSignature(ptr);
			case 3: return new Bolt11ParseError_BadPrefix(ptr);
			case 4: return new Bolt11ParseError_UnknownCurrency(ptr);
			case 5: return new Bolt11ParseError_UnknownSiPrefix(ptr);
			case 6: return new Bolt11ParseError_MalformedHRP(ptr);
			case 7: return new Bolt11ParseError_TooShortDataPart(ptr);
			case 8: return new Bolt11ParseError_UnexpectedEndOfTaggedFields(ptr);
			case 9: return new Bolt11ParseError_DescriptionDecodeError(ptr);
			case 10: return new Bolt11ParseError_PaddingError(ptr);
			case 11: return new Bolt11ParseError_IntegerOverflowError(ptr);
			case 12: return new Bolt11ParseError_InvalidSegWitProgramLength(ptr);
			case 13: return new Bolt11ParseError_InvalidPubKeyHashLength(ptr);
			case 14: return new Bolt11ParseError_InvalidScriptHashLength(ptr);
			case 15: return new Bolt11ParseError_InvalidRecoveryId(ptr);
			case 16: return new Bolt11ParseError_InvalidSliceLength(ptr);
			case 17: return new Bolt11ParseError_Skip(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Bolt11ParseError of type Bech32Error */
	public class Bolt11ParseError_Bech32Error : Bolt11ParseError {
		public Bech32Error bech32_error;
		internal Bolt11ParseError_Bech32Error(long ptr) : base(null, ptr) {
			long bech32_error = bindings.LDKBolt11ParseError_Bech32Error_get_bech32_error(ptr);
			org.ldk.structs.Bech32Error bech32_error_hu_conv = org.ldk.structs.Bech32Error.constr_from_ptr(bech32_error);
			if (bech32_error_hu_conv != null) { bech32_error_hu_conv.ptrs_to.AddLast(this); };
			this.bech32_error = bech32_error_hu_conv;
		}
	}
	/** A Bolt11ParseError of type ParseAmountError */
	public class Bolt11ParseError_ParseAmountError : Bolt11ParseError {
		public UnqualifiedError parse_amount_error;
		internal Bolt11ParseError_ParseAmountError(long ptr) : base(null, ptr) {
			int parse_amount_error = bindings.LDKBolt11ParseError_ParseAmountError_get_parse_amount_error(ptr);
			UnqualifiedError parse_amount_error_conv = new UnqualifiedError(parse_amount_error);
			this.parse_amount_error = parse_amount_error_conv;
		}
	}
	/** A Bolt11ParseError of type MalformedSignature */
	public class Bolt11ParseError_MalformedSignature : Bolt11ParseError {
		public Secp256k1Error malformed_signature;
		internal Bolt11ParseError_MalformedSignature(long ptr) : base(null, ptr) {
			this.malformed_signature = bindings.LDKBolt11ParseError_MalformedSignature_get_malformed_signature(ptr);
		}
	}
	/** A Bolt11ParseError of type BadPrefix */
	public class Bolt11ParseError_BadPrefix : Bolt11ParseError {
		internal Bolt11ParseError_BadPrefix(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type UnknownCurrency */
	public class Bolt11ParseError_UnknownCurrency : Bolt11ParseError {
		internal Bolt11ParseError_UnknownCurrency(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type UnknownSiPrefix */
	public class Bolt11ParseError_UnknownSiPrefix : Bolt11ParseError {
		internal Bolt11ParseError_UnknownSiPrefix(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type MalformedHRP */
	public class Bolt11ParseError_MalformedHRP : Bolt11ParseError {
		internal Bolt11ParseError_MalformedHRP(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type TooShortDataPart */
	public class Bolt11ParseError_TooShortDataPart : Bolt11ParseError {
		internal Bolt11ParseError_TooShortDataPart(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type UnexpectedEndOfTaggedFields */
	public class Bolt11ParseError_UnexpectedEndOfTaggedFields : Bolt11ParseError {
		internal Bolt11ParseError_UnexpectedEndOfTaggedFields(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type DescriptionDecodeError */
	public class Bolt11ParseError_DescriptionDecodeError : Bolt11ParseError {
		public UnqualifiedError description_decode_error;
		internal Bolt11ParseError_DescriptionDecodeError(long ptr) : base(null, ptr) {
			int description_decode_error = bindings.LDKBolt11ParseError_DescriptionDecodeError_get_description_decode_error(ptr);
			UnqualifiedError description_decode_error_conv = new UnqualifiedError(description_decode_error);
			this.description_decode_error = description_decode_error_conv;
		}
	}
	/** A Bolt11ParseError of type PaddingError */
	public class Bolt11ParseError_PaddingError : Bolt11ParseError {
		internal Bolt11ParseError_PaddingError(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type IntegerOverflowError */
	public class Bolt11ParseError_IntegerOverflowError : Bolt11ParseError {
		internal Bolt11ParseError_IntegerOverflowError(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type InvalidSegWitProgramLength */
	public class Bolt11ParseError_InvalidSegWitProgramLength : Bolt11ParseError {
		internal Bolt11ParseError_InvalidSegWitProgramLength(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type InvalidPubKeyHashLength */
	public class Bolt11ParseError_InvalidPubKeyHashLength : Bolt11ParseError {
		internal Bolt11ParseError_InvalidPubKeyHashLength(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type InvalidScriptHashLength */
	public class Bolt11ParseError_InvalidScriptHashLength : Bolt11ParseError {
		internal Bolt11ParseError_InvalidScriptHashLength(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type InvalidRecoveryId */
	public class Bolt11ParseError_InvalidRecoveryId : Bolt11ParseError {
		internal Bolt11ParseError_InvalidRecoveryId(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11ParseError of type InvalidSliceLength */
	public class Bolt11ParseError_InvalidSliceLength : Bolt11ParseError {
		public string invalid_slice_length;
		internal Bolt11ParseError_InvalidSliceLength(long ptr) : base(null, ptr) {
			long invalid_slice_length = bindings.LDKBolt11ParseError_InvalidSliceLength_get_invalid_slice_length(ptr);
			string invalid_slice_length_conv = InternalUtils.decodeString(invalid_slice_length);
			this.invalid_slice_length = invalid_slice_length_conv;
		}
	}
	/** A Bolt11ParseError of type Skip */
	public class Bolt11ParseError_Skip : Bolt11ParseError {
		internal Bolt11ParseError_Skip(long ptr) : base(null, ptr) {
		}
	}
	internal long clone_ptr() {
		long ret = bindings.Bolt11ParseError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11ParseError
	 */
	public Bolt11ParseError clone() {
		long ret = bindings.Bolt11ParseError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bech32Error-variant Bolt11ParseError
	 */
	public static Bolt11ParseError bech32_error(org.ldk.structs.Bech32Error a) {
		long ret = bindings.Bolt11ParseError_bech32_error(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParseAmountError-variant Bolt11ParseError
	 */
	public static Bolt11ParseError parse_amount_error(org.ldk.util.UnqualifiedError a) {
		long ret = bindings.Bolt11ParseError_parse_amount_error(0);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MalformedSignature-variant Bolt11ParseError
	 */
	public static Bolt11ParseError malformed_signature(Secp256k1Error a) {
		long ret = bindings.Bolt11ParseError_malformed_signature(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BadPrefix-variant Bolt11ParseError
	 */
	public static Bolt11ParseError bad_prefix() {
		long ret = bindings.Bolt11ParseError_bad_prefix();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownCurrency-variant Bolt11ParseError
	 */
	public static Bolt11ParseError unknown_currency() {
		long ret = bindings.Bolt11ParseError_unknown_currency();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownSiPrefix-variant Bolt11ParseError
	 */
	public static Bolt11ParseError unknown_si_prefix() {
		long ret = bindings.Bolt11ParseError_unknown_si_prefix();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MalformedHRP-variant Bolt11ParseError
	 */
	public static Bolt11ParseError malformed_hrp() {
		long ret = bindings.Bolt11ParseError_malformed_hrp();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TooShortDataPart-variant Bolt11ParseError
	 */
	public static Bolt11ParseError too_short_data_part() {
		long ret = bindings.Bolt11ParseError_too_short_data_part();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnexpectedEndOfTaggedFields-variant Bolt11ParseError
	 */
	public static Bolt11ParseError unexpected_end_of_tagged_fields() {
		long ret = bindings.Bolt11ParseError_unexpected_end_of_tagged_fields();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DescriptionDecodeError-variant Bolt11ParseError
	 */
	public static Bolt11ParseError description_decode_error(org.ldk.util.UnqualifiedError a) {
		long ret = bindings.Bolt11ParseError_description_decode_error(0);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaddingError-variant Bolt11ParseError
	 */
	public static Bolt11ParseError padding_error() {
		long ret = bindings.Bolt11ParseError_padding_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IntegerOverflowError-variant Bolt11ParseError
	 */
	public static Bolt11ParseError integer_overflow_error() {
		long ret = bindings.Bolt11ParseError_integer_overflow_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidSegWitProgramLength-variant Bolt11ParseError
	 */
	public static Bolt11ParseError invalid_seg_wit_program_length() {
		long ret = bindings.Bolt11ParseError_invalid_seg_wit_program_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidPubKeyHashLength-variant Bolt11ParseError
	 */
	public static Bolt11ParseError invalid_pub_key_hash_length() {
		long ret = bindings.Bolt11ParseError_invalid_pub_key_hash_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidScriptHashLength-variant Bolt11ParseError
	 */
	public static Bolt11ParseError invalid_script_hash_length() {
		long ret = bindings.Bolt11ParseError_invalid_script_hash_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidRecoveryId-variant Bolt11ParseError
	 */
	public static Bolt11ParseError invalid_recovery_id() {
		long ret = bindings.Bolt11ParseError_invalid_recovery_id();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidSliceLength-variant Bolt11ParseError
	 */
	public static Bolt11ParseError invalid_slice_length(string a) {
		long ret = bindings.Bolt11ParseError_invalid_slice_length(InternalUtils.encodeString(a));
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Skip-variant Bolt11ParseError
	 */
	public static Bolt11ParseError skip() {
		long ret = bindings.Bolt11ParseError_skip();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt11ParseErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.Bolt11ParseError b) {
		bool ret = bindings.Bolt11ParseError_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Bolt11ParseError)) return false;
		return this.eq((Bolt11ParseError)o);
	}
	/**
	 * Get the string representation of a Bolt11ParseError object
	 */
	public string to_str() {
		long ret = bindings.Bolt11ParseError_to_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

}
} } }
