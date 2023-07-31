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
public class Bolt11ParseError extends CommonBase {
	private Bolt11ParseError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bolt11ParseError_free(ptr); }
	}
	static Bolt11ParseError constr_from_ptr(long ptr) {
		bindings.LDKBolt11ParseError raw_val = bindings.LDKBolt11ParseError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.Bech32Error.class) {
			return new Bech32Error(ptr, (bindings.LDKBolt11ParseError.Bech32Error)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.ParseAmountError.class) {
			return new ParseAmountError(ptr, (bindings.LDKBolt11ParseError.ParseAmountError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.MalformedSignature.class) {
			return new MalformedSignature(ptr, (bindings.LDKBolt11ParseError.MalformedSignature)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.BadPrefix.class) {
			return new BadPrefix(ptr, (bindings.LDKBolt11ParseError.BadPrefix)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.UnknownCurrency.class) {
			return new UnknownCurrency(ptr, (bindings.LDKBolt11ParseError.UnknownCurrency)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.UnknownSiPrefix.class) {
			return new UnknownSiPrefix(ptr, (bindings.LDKBolt11ParseError.UnknownSiPrefix)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.MalformedHRP.class) {
			return new MalformedHRP(ptr, (bindings.LDKBolt11ParseError.MalformedHRP)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.TooShortDataPart.class) {
			return new TooShortDataPart(ptr, (bindings.LDKBolt11ParseError.TooShortDataPart)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.UnexpectedEndOfTaggedFields.class) {
			return new UnexpectedEndOfTaggedFields(ptr, (bindings.LDKBolt11ParseError.UnexpectedEndOfTaggedFields)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.DescriptionDecodeError.class) {
			return new DescriptionDecodeError(ptr, (bindings.LDKBolt11ParseError.DescriptionDecodeError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.PaddingError.class) {
			return new PaddingError(ptr, (bindings.LDKBolt11ParseError.PaddingError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.IntegerOverflowError.class) {
			return new IntegerOverflowError(ptr, (bindings.LDKBolt11ParseError.IntegerOverflowError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.InvalidSegWitProgramLength.class) {
			return new InvalidSegWitProgramLength(ptr, (bindings.LDKBolt11ParseError.InvalidSegWitProgramLength)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.InvalidPubKeyHashLength.class) {
			return new InvalidPubKeyHashLength(ptr, (bindings.LDKBolt11ParseError.InvalidPubKeyHashLength)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.InvalidScriptHashLength.class) {
			return new InvalidScriptHashLength(ptr, (bindings.LDKBolt11ParseError.InvalidScriptHashLength)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.InvalidRecoveryId.class) {
			return new InvalidRecoveryId(ptr, (bindings.LDKBolt11ParseError.InvalidRecoveryId)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.InvalidSliceLength.class) {
			return new InvalidSliceLength(ptr, (bindings.LDKBolt11ParseError.InvalidSliceLength)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11ParseError.Skip.class) {
			return new Skip(ptr, (bindings.LDKBolt11ParseError.Skip)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class Bech32Error extends Bolt11ParseError {
		public final org.ldk.structs.Bech32Error bech32_error;
		private Bech32Error(long ptr, bindings.LDKBolt11ParseError.Bech32Error obj) {
			super(null, ptr);
			long bech32_error = obj.bech32_error;
			org.ldk.structs.Bech32Error bech32_error_hu_conv = org.ldk.structs.Bech32Error.constr_from_ptr(bech32_error);
			if (bech32_error_hu_conv != null) { bech32_error_hu_conv.ptrs_to.add(this); };
			this.bech32_error = bech32_error_hu_conv;
		}
	}
	public final static class ParseAmountError extends Bolt11ParseError {
		public final org.ldk.util.UnqualifiedError parse_amount_error;
		private ParseAmountError(long ptr, bindings.LDKBolt11ParseError.ParseAmountError obj) {
			super(null, ptr);
			int parse_amount_error = obj.parse_amount_error;
			UnqualifiedError parse_amount_error_conv = new UnqualifiedError(parse_amount_error);
			this.parse_amount_error = parse_amount_error_conv;
		}
	}
	public final static class MalformedSignature extends Bolt11ParseError {
		public final org.ldk.enums.Secp256k1Error malformed_signature;
		private MalformedSignature(long ptr, bindings.LDKBolt11ParseError.MalformedSignature obj) {
			super(null, ptr);
			this.malformed_signature = obj.malformed_signature;
		}
	}
	public final static class BadPrefix extends Bolt11ParseError {
		private BadPrefix(long ptr, bindings.LDKBolt11ParseError.BadPrefix obj) {
			super(null, ptr);
		}
	}
	public final static class UnknownCurrency extends Bolt11ParseError {
		private UnknownCurrency(long ptr, bindings.LDKBolt11ParseError.UnknownCurrency obj) {
			super(null, ptr);
		}
	}
	public final static class UnknownSiPrefix extends Bolt11ParseError {
		private UnknownSiPrefix(long ptr, bindings.LDKBolt11ParseError.UnknownSiPrefix obj) {
			super(null, ptr);
		}
	}
	public final static class MalformedHRP extends Bolt11ParseError {
		private MalformedHRP(long ptr, bindings.LDKBolt11ParseError.MalformedHRP obj) {
			super(null, ptr);
		}
	}
	public final static class TooShortDataPart extends Bolt11ParseError {
		private TooShortDataPart(long ptr, bindings.LDKBolt11ParseError.TooShortDataPart obj) {
			super(null, ptr);
		}
	}
	public final static class UnexpectedEndOfTaggedFields extends Bolt11ParseError {
		private UnexpectedEndOfTaggedFields(long ptr, bindings.LDKBolt11ParseError.UnexpectedEndOfTaggedFields obj) {
			super(null, ptr);
		}
	}
	public final static class DescriptionDecodeError extends Bolt11ParseError {
		public final org.ldk.util.UnqualifiedError description_decode_error;
		private DescriptionDecodeError(long ptr, bindings.LDKBolt11ParseError.DescriptionDecodeError obj) {
			super(null, ptr);
			int description_decode_error = obj.description_decode_error;
			UnqualifiedError description_decode_error_conv = new UnqualifiedError(description_decode_error);
			this.description_decode_error = description_decode_error_conv;
		}
	}
	public final static class PaddingError extends Bolt11ParseError {
		private PaddingError(long ptr, bindings.LDKBolt11ParseError.PaddingError obj) {
			super(null, ptr);
		}
	}
	public final static class IntegerOverflowError extends Bolt11ParseError {
		private IntegerOverflowError(long ptr, bindings.LDKBolt11ParseError.IntegerOverflowError obj) {
			super(null, ptr);
		}
	}
	public final static class InvalidSegWitProgramLength extends Bolt11ParseError {
		private InvalidSegWitProgramLength(long ptr, bindings.LDKBolt11ParseError.InvalidSegWitProgramLength obj) {
			super(null, ptr);
		}
	}
	public final static class InvalidPubKeyHashLength extends Bolt11ParseError {
		private InvalidPubKeyHashLength(long ptr, bindings.LDKBolt11ParseError.InvalidPubKeyHashLength obj) {
			super(null, ptr);
		}
	}
	public final static class InvalidScriptHashLength extends Bolt11ParseError {
		private InvalidScriptHashLength(long ptr, bindings.LDKBolt11ParseError.InvalidScriptHashLength obj) {
			super(null, ptr);
		}
	}
	public final static class InvalidRecoveryId extends Bolt11ParseError {
		private InvalidRecoveryId(long ptr, bindings.LDKBolt11ParseError.InvalidRecoveryId obj) {
			super(null, ptr);
		}
	}
	public final static class InvalidSliceLength extends Bolt11ParseError {
		public final java.lang.String invalid_slice_length;
		private InvalidSliceLength(long ptr, bindings.LDKBolt11ParseError.InvalidSliceLength obj) {
			super(null, ptr);
			this.invalid_slice_length = obj.invalid_slice_length;
		}
	}
	/**
	 * Not an error, but used internally to signal that a part of the invoice should be ignored
	 * according to BOLT11
	 */
	public final static class Skip extends Bolt11ParseError {
		private Skip(long ptr, bindings.LDKBolt11ParseError.Skip obj) {
			super(null, ptr);
		}
	}
	long clone_ptr() {
		long ret = bindings.Bolt11ParseError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11ParseError
	 */
	public Bolt11ParseError clone() {
		long ret = bindings.Bolt11ParseError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bech32Error-variant Bolt11ParseError
	 */
	public static Bolt11ParseError bech32_error(org.ldk.structs.Bech32Error a) {
		long ret = bindings.Bolt11ParseError_bech32_error(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParseAmountError-variant Bolt11ParseError
	 */
	public static Bolt11ParseError parse_amount_error(org.ldk.util.UnqualifiedError a) {
		long ret = bindings.Bolt11ParseError_parse_amount_error(0);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MalformedSignature-variant Bolt11ParseError
	 */
	public static Bolt11ParseError malformed_signature(org.ldk.enums.Secp256k1Error a) {
		long ret = bindings.Bolt11ParseError_malformed_signature(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BadPrefix-variant Bolt11ParseError
	 */
	public static Bolt11ParseError bad_prefix() {
		long ret = bindings.Bolt11ParseError_bad_prefix();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownCurrency-variant Bolt11ParseError
	 */
	public static Bolt11ParseError unknown_currency() {
		long ret = bindings.Bolt11ParseError_unknown_currency();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownSiPrefix-variant Bolt11ParseError
	 */
	public static Bolt11ParseError unknown_si_prefix() {
		long ret = bindings.Bolt11ParseError_unknown_si_prefix();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MalformedHRP-variant Bolt11ParseError
	 */
	public static Bolt11ParseError malformed_hrp() {
		long ret = bindings.Bolt11ParseError_malformed_hrp();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TooShortDataPart-variant Bolt11ParseError
	 */
	public static Bolt11ParseError too_short_data_part() {
		long ret = bindings.Bolt11ParseError_too_short_data_part();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnexpectedEndOfTaggedFields-variant Bolt11ParseError
	 */
	public static Bolt11ParseError unexpected_end_of_tagged_fields() {
		long ret = bindings.Bolt11ParseError_unexpected_end_of_tagged_fields();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DescriptionDecodeError-variant Bolt11ParseError
	 */
	public static Bolt11ParseError description_decode_error(org.ldk.util.UnqualifiedError a) {
		long ret = bindings.Bolt11ParseError_description_decode_error(0);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaddingError-variant Bolt11ParseError
	 */
	public static Bolt11ParseError padding_error() {
		long ret = bindings.Bolt11ParseError_padding_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IntegerOverflowError-variant Bolt11ParseError
	 */
	public static Bolt11ParseError integer_overflow_error() {
		long ret = bindings.Bolt11ParseError_integer_overflow_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidSegWitProgramLength-variant Bolt11ParseError
	 */
	public static Bolt11ParseError invalid_seg_wit_program_length() {
		long ret = bindings.Bolt11ParseError_invalid_seg_wit_program_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidPubKeyHashLength-variant Bolt11ParseError
	 */
	public static Bolt11ParseError invalid_pub_key_hash_length() {
		long ret = bindings.Bolt11ParseError_invalid_pub_key_hash_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidScriptHashLength-variant Bolt11ParseError
	 */
	public static Bolt11ParseError invalid_script_hash_length() {
		long ret = bindings.Bolt11ParseError_invalid_script_hash_length();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidRecoveryId-variant Bolt11ParseError
	 */
	public static Bolt11ParseError invalid_recovery_id() {
		long ret = bindings.Bolt11ParseError_invalid_recovery_id();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidSliceLength-variant Bolt11ParseError
	 */
	public static Bolt11ParseError invalid_slice_length(java.lang.String a) {
		long ret = bindings.Bolt11ParseError_invalid_slice_length(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Skip-variant Bolt11ParseError
	 */
	public static Bolt11ParseError skip() {
		long ret = bindings.Bolt11ParseError_skip();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt11ParseErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.Bolt11ParseError b) {
		boolean ret = bindings.Bolt11ParseError_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Bolt11ParseError)) return false;
		return this.eq((Bolt11ParseError)o);
	}
	/**
	 * Get the string representation of a Bolt11ParseError object
	 */
	public String to_str() {
		String ret = bindings.Bolt11ParseError_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
