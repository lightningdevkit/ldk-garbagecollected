using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Errors that indicate what is wrong with the invoice. They have some granularity for debug
 * reasons, but should generally result in an \"invalid BOLT11 invoice\" message for the user.
 */
public class ParseError : CommonBase {
	protected ParseError(object _dummy, long ptr) : base(ptr) { }
	~ParseError() {
		if (ptr != 0) { bindings.ParseError_free(ptr); }
	}

	internal static ParseError constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKParseError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new ParseError_Bech32Error(ptr);
			case 1: return new ParseError_ParseAmountError(ptr);
			case 2: return new ParseError_MalformedSignature(ptr);
			case 3: return new ParseError_BadPrefix(ptr);
			case 4: return new ParseError_UnknownCurrency(ptr);
			case 5: return new ParseError_UnknownSiPrefix(ptr);
			case 6: return new ParseError_MalformedHRP(ptr);
			case 7: return new ParseError_TooShortDataPart(ptr);
			case 8: return new ParseError_UnexpectedEndOfTaggedFields(ptr);
			case 9: return new ParseError_DescriptionDecodeError(ptr);
			case 10: return new ParseError_PaddingError(ptr);
			case 11: return new ParseError_IntegerOverflowError(ptr);
			case 12: return new ParseError_InvalidSegWitProgramLength(ptr);
			case 13: return new ParseError_InvalidPubKeyHashLength(ptr);
			case 14: return new ParseError_InvalidScriptHashLength(ptr);
			case 15: return new ParseError_InvalidRecoveryId(ptr);
			case 16: return new ParseError_InvalidSliceLength(ptr);
			case 17: return new ParseError_Skip(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A ParseError of type Bech32Error */
	public class ParseError_Bech32Error : ParseError {
		public Bech32Error bech32_error;
		internal ParseError_Bech32Error(long ptr) : base(null, ptr) {
			long bech32_error = bindings.LDKParseError_Bech32Error_get_bech32_error(ptr);
			org.ldk.structs.Bech32Error bech32_error_hu_conv = org.ldk.structs.Bech32Error.constr_from_ptr(bech32_error);
			if (bech32_error_hu_conv != null) { bech32_error_hu_conv.ptrs_to.AddLast(this); };
			this.bech32_error = bech32_error_hu_conv;
		}
	}
	/** A ParseError of type ParseAmountError */
	public class ParseError_ParseAmountError : ParseError {
		public UnqualifiedError parse_amount_error;
		internal ParseError_ParseAmountError(long ptr) : base(null, ptr) {
			int parse_amount_error = bindings.LDKParseError_ParseAmountError_get_parse_amount_error(ptr);
			UnqualifiedError parse_amount_error_conv = new UnqualifiedError(parse_amount_error);
			this.parse_amount_error = parse_amount_error_conv;
		}
	}
	/** A ParseError of type MalformedSignature */
	public class ParseError_MalformedSignature : ParseError {
		public Secp256k1Error malformed_signature;
		internal ParseError_MalformedSignature(long ptr) : base(null, ptr) {
			this.malformed_signature = bindings.LDKParseError_MalformedSignature_get_malformed_signature(ptr);
		}
	}
	/** A ParseError of type BadPrefix */
	public class ParseError_BadPrefix : ParseError {
		internal ParseError_BadPrefix(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type UnknownCurrency */
	public class ParseError_UnknownCurrency : ParseError {
		internal ParseError_UnknownCurrency(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type UnknownSiPrefix */
	public class ParseError_UnknownSiPrefix : ParseError {
		internal ParseError_UnknownSiPrefix(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type MalformedHRP */
	public class ParseError_MalformedHRP : ParseError {
		internal ParseError_MalformedHRP(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type TooShortDataPart */
	public class ParseError_TooShortDataPart : ParseError {
		internal ParseError_TooShortDataPart(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type UnexpectedEndOfTaggedFields */
	public class ParseError_UnexpectedEndOfTaggedFields : ParseError {
		internal ParseError_UnexpectedEndOfTaggedFields(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type DescriptionDecodeError */
	public class ParseError_DescriptionDecodeError : ParseError {
		public UnqualifiedError description_decode_error;
		internal ParseError_DescriptionDecodeError(long ptr) : base(null, ptr) {
			int description_decode_error = bindings.LDKParseError_DescriptionDecodeError_get_description_decode_error(ptr);
			UnqualifiedError description_decode_error_conv = new UnqualifiedError(description_decode_error);
			this.description_decode_error = description_decode_error_conv;
		}
	}
	/** A ParseError of type PaddingError */
	public class ParseError_PaddingError : ParseError {
		internal ParseError_PaddingError(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type IntegerOverflowError */
	public class ParseError_IntegerOverflowError : ParseError {
		internal ParseError_IntegerOverflowError(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type InvalidSegWitProgramLength */
	public class ParseError_InvalidSegWitProgramLength : ParseError {
		internal ParseError_InvalidSegWitProgramLength(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type InvalidPubKeyHashLength */
	public class ParseError_InvalidPubKeyHashLength : ParseError {
		internal ParseError_InvalidPubKeyHashLength(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type InvalidScriptHashLength */
	public class ParseError_InvalidScriptHashLength : ParseError {
		internal ParseError_InvalidScriptHashLength(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type InvalidRecoveryId */
	public class ParseError_InvalidRecoveryId : ParseError {
		internal ParseError_InvalidRecoveryId(long ptr) : base(null, ptr) {
		}
	}
	/** A ParseError of type InvalidSliceLength */
	public class ParseError_InvalidSliceLength : ParseError {
		public string invalid_slice_length;
		internal ParseError_InvalidSliceLength(long ptr) : base(null, ptr) {
			this.invalid_slice_length = bindings.LDKParseError_InvalidSliceLength_get_invalid_slice_length(ptr);
		}
	}
	/** A ParseError of type Skip */
	public class ParseError_Skip : ParseError {
		internal ParseError_Skip(long ptr) : base(null, ptr) {
		}
	}
	internal long clone_ptr() {
		long ret = bindings.ParseError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ParseError
	 */
	public ParseError clone() {
		long ret = bindings.ParseError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bech32Error-variant ParseError
	 */
	public static ParseError bech32_error(org.ldk.structs.Bech32Error a) {
		long ret = bindings.ParseError_bech32_error(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParseAmountError-variant ParseError
	 */
	public static ParseError parse_amount_error(org.ldk.util.UnqualifiedError a) {
		long ret = bindings.ParseError_parse_amount_error(0);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MalformedSignature-variant ParseError
	 */
	public static ParseError malformed_signature(Secp256k1Error a) {
		long ret = bindings.ParseError_malformed_signature(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BadPrefix-variant ParseError
	 */
	public static ParseError bad_prefix() {
		long ret = bindings.ParseError_bad_prefix();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownCurrency-variant ParseError
	 */
	public static ParseError unknown_currency() {
		long ret = bindings.ParseError_unknown_currency();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownSiPrefix-variant ParseError
	 */
	public static ParseError unknown_si_prefix() {
		long ret = bindings.ParseError_unknown_si_prefix();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MalformedHRP-variant ParseError
	 */
	public static ParseError malformed_hrp() {
		long ret = bindings.ParseError_malformed_hrp();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TooShortDataPart-variant ParseError
	 */
	public static ParseError too_short_data_part() {
		long ret = bindings.ParseError_too_short_data_part();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnexpectedEndOfTaggedFields-variant ParseError
	 */
	public static ParseError unexpected_end_of_tagged_fields() {
		long ret = bindings.ParseError_unexpected_end_of_tagged_fields();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DescriptionDecodeError-variant ParseError
	 */
	public static ParseError description_decode_error(org.ldk.util.UnqualifiedError a) {
		long ret = bindings.ParseError_description_decode_error(0);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaddingError-variant ParseError
	 */
	public static ParseError padding_error() {
		long ret = bindings.ParseError_padding_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IntegerOverflowError-variant ParseError
	 */
	public static ParseError integer_overflow_error() {
		long ret = bindings.ParseError_integer_overflow_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidSegWitProgramLength-variant ParseError
	 */
	public static ParseError invalid_seg_wit_program_length() {
		long ret = bindings.ParseError_invalid_seg_wit_program_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidPubKeyHashLength-variant ParseError
	 */
	public static ParseError invalid_pub_key_hash_length() {
		long ret = bindings.ParseError_invalid_pub_key_hash_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidScriptHashLength-variant ParseError
	 */
	public static ParseError invalid_script_hash_length() {
		long ret = bindings.ParseError_invalid_script_hash_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidRecoveryId-variant ParseError
	 */
	public static ParseError invalid_recovery_id() {
		long ret = bindings.ParseError_invalid_recovery_id();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidSliceLength-variant ParseError
	 */
	public static ParseError invalid_slice_length(string a) {
		long ret = bindings.ParseError_invalid_slice_length(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Skip-variant ParseError
	 */
	public static ParseError skip() {
		long ret = bindings.ParseError_skip();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ParseErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.ParseError b) {
		bool ret = bindings.ParseError_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ParseError)) return false;
		return this.eq((ParseError)o);
	}
	/**
	 * Get the string representation of a ParseError object
	 */
	public string to_str() {
		string ret = bindings.ParseError_to_str(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
