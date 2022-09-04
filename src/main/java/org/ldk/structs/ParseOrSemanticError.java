package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Indicates that something went wrong while parsing or validating the invoice. Parsing errors
 * should be mostly seen as opaque and are only there for debugging reasons. Semantic errors
 * like wrong signatures, missing fields etc. could mean that someone tampered with the invoice.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ParseOrSemanticError extends CommonBase {
	private ParseOrSemanticError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ParseOrSemanticError_free(ptr); }
	}
	static ParseOrSemanticError constr_from_ptr(long ptr) {
		bindings.LDKParseOrSemanticError raw_val = bindings.LDKParseOrSemanticError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKParseOrSemanticError.ParseError.class) {
			return new ParseError(ptr, (bindings.LDKParseOrSemanticError.ParseError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKParseOrSemanticError.SemanticError.class) {
			return new SemanticError(ptr, (bindings.LDKParseOrSemanticError.SemanticError)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The invoice couldn't be decoded
	 */
	public final static class ParseError extends ParseOrSemanticError {
		public final org.ldk.structs.ParseError parse_error;
		private ParseError(long ptr, bindings.LDKParseOrSemanticError.ParseError obj) {
			super(null, ptr);
			long parse_error = obj.parse_error;
			org.ldk.structs.ParseError parse_error_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(parse_error);
			if (parse_error_hu_conv != null) { parse_error_hu_conv.ptrs_to.add(this); };
			this.parse_error = parse_error_hu_conv;
		}
	}
	/**
	 * The invoice could be decoded but violates the BOLT11 standard
	 */
	public final static class SemanticError extends ParseOrSemanticError {
		public final org.ldk.enums.SemanticError semantic_error;
		private SemanticError(long ptr, bindings.LDKParseOrSemanticError.SemanticError obj) {
			super(null, ptr);
			this.semantic_error = obj.semantic_error;
		}
	}
	long clone_ptr() {
		long ret = bindings.ParseOrSemanticError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ParseOrSemanticError
	 */
	public ParseOrSemanticError clone() {
		long ret = bindings.ParseOrSemanticError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseOrSemanticError ret_hu_conv = org.ldk.structs.ParseOrSemanticError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParseError-variant ParseOrSemanticError
	 */
	public static ParseOrSemanticError parse_error(ParseError a) {
		long ret = bindings.ParseOrSemanticError_parse_error(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseOrSemanticError ret_hu_conv = org.ldk.structs.ParseOrSemanticError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SemanticError-variant ParseOrSemanticError
	 */
	public static ParseOrSemanticError semantic_error(org.ldk.enums.SemanticError a) {
		long ret = bindings.ParseOrSemanticError_semantic_error(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParseOrSemanticError ret_hu_conv = org.ldk.structs.ParseOrSemanticError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a ParseOrSemanticError object
	 */
	public String to_str() {
		String ret = bindings.ParseOrSemanticError_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
