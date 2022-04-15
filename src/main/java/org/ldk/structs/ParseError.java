package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Errors that indicate what is wrong with the invoice. They have some granularity for debug
 * reasons, but should generally result in an \"invalid BOLT11 invoice\" message for the user.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ParseError extends CommonBase {
	private ParseError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ParseError_free(ptr); }
	}
	static ParseError constr_from_ptr(long ptr) {
		bindings.LDKParseError raw_val = bindings.LDKParseError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKParseError.Bech32Error.class) {
			return new Bech32Error(ptr, (bindings.LDKParseError.Bech32Error)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.ParseAmountError.class) {
			return new ParseAmountError(ptr, (bindings.LDKParseError.ParseAmountError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.MalformedSignature.class) {
			return new MalformedSignature(ptr, (bindings.LDKParseError.MalformedSignature)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.BadPrefix.class) {
			return new BadPrefix(ptr, (bindings.LDKParseError.BadPrefix)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.UnknownCurrency.class) {
			return new UnknownCurrency(ptr, (bindings.LDKParseError.UnknownCurrency)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.UnknownSiPrefix.class) {
			return new UnknownSiPrefix(ptr, (bindings.LDKParseError.UnknownSiPrefix)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.MalformedHRP.class) {
			return new MalformedHRP(ptr, (bindings.LDKParseError.MalformedHRP)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.TooShortDataPart.class) {
			return new TooShortDataPart(ptr, (bindings.LDKParseError.TooShortDataPart)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.UnexpectedEndOfTaggedFields.class) {
			return new UnexpectedEndOfTaggedFields(ptr, (bindings.LDKParseError.UnexpectedEndOfTaggedFields)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.DescriptionDecodeError.class) {
			return new DescriptionDecodeError(ptr, (bindings.LDKParseError.DescriptionDecodeError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.PaddingError.class) {
			return new PaddingError(ptr, (bindings.LDKParseError.PaddingError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.IntegerOverflowError.class) {
			return new IntegerOverflowError(ptr, (bindings.LDKParseError.IntegerOverflowError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.InvalidSegWitProgramLength.class) {
			return new InvalidSegWitProgramLength(ptr, (bindings.LDKParseError.InvalidSegWitProgramLength)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.InvalidPubKeyHashLength.class) {
			return new InvalidPubKeyHashLength(ptr, (bindings.LDKParseError.InvalidPubKeyHashLength)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.InvalidScriptHashLength.class) {
			return new InvalidScriptHashLength(ptr, (bindings.LDKParseError.InvalidScriptHashLength)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.InvalidRecoveryId.class) {
			return new InvalidRecoveryId(ptr, (bindings.LDKParseError.InvalidRecoveryId)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.InvalidSliceLength.class) {
			return new InvalidSliceLength(ptr, (bindings.LDKParseError.InvalidSliceLength)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseError.Skip.class) {
			return new Skip(ptr, (bindings.LDKParseError.Skip)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class Bech32Error extends ParseError {
		public final org.ldk.structs.Bech32Error bech32_error;
		private Bech32Error(long ptr, bindings.LDKParseError.Bech32Error obj) {
			super(null, ptr);
			long bech32_error = obj.bech32_error;
			org.ldk.structs.Bech32Error bech32_error_hu_conv = org.ldk.structs.Bech32Error.constr_from_ptr(bech32_error);
			bech32_error_hu_conv.ptrs_to.add(this);
			this.bech32_error = bech32_error_hu_conv;
		}
	}
	public final static class ParseAmountError extends ParseError {
		public final org.ldk.util.UnqualifiedError parse_amount_error;
		private ParseAmountError(long ptr, bindings.LDKParseError.ParseAmountError obj) {
			super(null, ptr);
			int parse_amount_error = obj.parse_amount_error;
			UnqualifiedError parse_amount_error_conv = new UnqualifiedError(parse_amount_error);
			this.parse_amount_error = parse_amount_error_conv;
		}
	}
	public final static class MalformedSignature extends ParseError {
		public final org.ldk.enums.Secp256k1Error malformed_signature;
		private MalformedSignature(long ptr, bindings.LDKParseError.MalformedSignature obj) {
			super(null, ptr);
			this.malformed_signature = obj.malformed_signature;
		}
	}
	public final static class BadPrefix extends ParseError {
		private BadPrefix(long ptr, bindings.LDKParseError.BadPrefix obj) {
			super(null, ptr);
		}
	}
	public final static class UnknownCurrency extends ParseError {
		private UnknownCurrency(long ptr, bindings.LDKParseError.UnknownCurrency obj) {
			super(null, ptr);
		}
	}
	public final static class UnknownSiPrefix extends ParseError {
		private UnknownSiPrefix(long ptr, bindings.LDKParseError.UnknownSiPrefix obj) {
			super(null, ptr);
		}
	}
	public final static class MalformedHRP extends ParseError {
		private MalformedHRP(long ptr, bindings.LDKParseError.MalformedHRP obj) {
			super(null, ptr);
		}
	}
	public final static class TooShortDataPart extends ParseError {
		private TooShortDataPart(long ptr, bindings.LDKParseError.TooShortDataPart obj) {
			super(null, ptr);
		}
	}
	public final static class UnexpectedEndOfTaggedFields extends ParseError {
		private UnexpectedEndOfTaggedFields(long ptr, bindings.LDKParseError.UnexpectedEndOfTaggedFields obj) {
			super(null, ptr);
		}
	}
	public final static class DescriptionDecodeError extends ParseError {
		public final org.ldk.util.UnqualifiedError description_decode_error;
		private DescriptionDecodeError(long ptr, bindings.LDKParseError.DescriptionDecodeError obj) {
			super(null, ptr);
			int description_decode_error = obj.description_decode_error;
			UnqualifiedError description_decode_error_conv = new UnqualifiedError(description_decode_error);
			this.description_decode_error = description_decode_error_conv;
		}
	}
	public final static class PaddingError extends ParseError {
		private PaddingError(long ptr, bindings.LDKParseError.PaddingError obj) {
			super(null, ptr);
		}
	}
	public final static class IntegerOverflowError extends ParseError {
		private IntegerOverflowError(long ptr, bindings.LDKParseError.IntegerOverflowError obj) {
			super(null, ptr);
		}
	}
	public final static class InvalidSegWitProgramLength extends ParseError {
		private InvalidSegWitProgramLength(long ptr, bindings.LDKParseError.InvalidSegWitProgramLength obj) {
			super(null, ptr);
		}
	}
	public final static class InvalidPubKeyHashLength extends ParseError {
		private InvalidPubKeyHashLength(long ptr, bindings.LDKParseError.InvalidPubKeyHashLength obj) {
			super(null, ptr);
		}
	}
	public final static class InvalidScriptHashLength extends ParseError {
		private InvalidScriptHashLength(long ptr, bindings.LDKParseError.InvalidScriptHashLength obj) {
			super(null, ptr);
		}
	}
	public final static class InvalidRecoveryId extends ParseError {
		private InvalidRecoveryId(long ptr, bindings.LDKParseError.InvalidRecoveryId obj) {
			super(null, ptr);
		}
	}
	public final static class InvalidSliceLength extends ParseError {
		public final java.lang.String invalid_slice_length;
		private InvalidSliceLength(long ptr, bindings.LDKParseError.InvalidSliceLength obj) {
			super(null, ptr);
			this.invalid_slice_length = obj.invalid_slice_length;
		}
	}
	/**
	 * Not an error, but used internally to signal that a part of the invoice should be ignored
	 * according to BOLT11
	 */
	public final static class Skip extends ParseError {
		private Skip(long ptr, bindings.LDKParseError.Skip obj) {
			super(null, ptr);
		}
	}
	long clone_ptr() {
		long ret = bindings.ParseError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ParseError
	 */
	public ParseError clone() {
		long ret = bindings.ParseError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bech32Error-variant ParseError
	 */
	public static ParseError bech32_error(Bech32Error a) {
		long ret = bindings.ParseError_bech32_error(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParseAmountError-variant ParseError
	 */
	public static ParseError parse_amount_error(UnqualifiedError a) {
		long ret = bindings.ParseError_parse_amount_error(0);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MalformedSignature-variant ParseError
	 */
	public static ParseError malformed_signature(org.ldk.enums.Secp256k1Error a) {
		long ret = bindings.ParseError_malformed_signature(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BadPrefix-variant ParseError
	 */
	public static ParseError bad_prefix() {
		long ret = bindings.ParseError_bad_prefix();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownCurrency-variant ParseError
	 */
	public static ParseError unknown_currency() {
		long ret = bindings.ParseError_unknown_currency();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownSiPrefix-variant ParseError
	 */
	public static ParseError unknown_si_prefix() {
		long ret = bindings.ParseError_unknown_si_prefix();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MalformedHRP-variant ParseError
	 */
	public static ParseError malformed_hrp() {
		long ret = bindings.ParseError_malformed_hrp();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TooShortDataPart-variant ParseError
	 */
	public static ParseError too_short_data_part() {
		long ret = bindings.ParseError_too_short_data_part();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnexpectedEndOfTaggedFields-variant ParseError
	 */
	public static ParseError unexpected_end_of_tagged_fields() {
		long ret = bindings.ParseError_unexpected_end_of_tagged_fields();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DescriptionDecodeError-variant ParseError
	 */
	public static ParseError description_decode_error(UnqualifiedError a) {
		long ret = bindings.ParseError_description_decode_error(0);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaddingError-variant ParseError
	 */
	public static ParseError padding_error() {
		long ret = bindings.ParseError_padding_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IntegerOverflowError-variant ParseError
	 */
	public static ParseError integer_overflow_error() {
		long ret = bindings.ParseError_integer_overflow_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidSegWitProgramLength-variant ParseError
	 */
	public static ParseError invalid_seg_wit_program_length() {
		long ret = bindings.ParseError_invalid_seg_wit_program_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidPubKeyHashLength-variant ParseError
	 */
	public static ParseError invalid_pub_key_hash_length() {
		long ret = bindings.ParseError_invalid_pub_key_hash_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidScriptHashLength-variant ParseError
	 */
	public static ParseError invalid_script_hash_length() {
		long ret = bindings.ParseError_invalid_script_hash_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidRecoveryId-variant ParseError
	 */
	public static ParseError invalid_recovery_id() {
		long ret = bindings.ParseError_invalid_recovery_id();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidSliceLength-variant ParseError
	 */
	public static ParseError invalid_slice_length(java.lang.String a) {
		long ret = bindings.ParseError_invalid_slice_length(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Skip-variant ParseError
	 */
	public static ParseError skip() {
		long ret = bindings.ParseError_skip();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseError ret_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a ParseError object
	 */
	public String to_str() {
		String ret = bindings.ParseError_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
