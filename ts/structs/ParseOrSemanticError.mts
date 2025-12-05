
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Indicates that something went wrong while parsing or validating the invoice. Parsing errors
 * should be mostly seen as opaque and are only there for debugging reasons. Semantic errors
 * like wrong signatures, missing fields etc. could mean that someone tampered with the invoice.
 */
export class ParseOrSemanticError extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.ParseOrSemanticError_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): ParseOrSemanticError {
		const raw_ty: number = bindings.LDKParseOrSemanticError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new ParseOrSemanticError_ParseError(ptr);
			case 1: return new ParseOrSemanticError_SemanticError(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ParseOrSemanticError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ParseOrSemanticError
	 */
	public clone(): ParseOrSemanticError {
		const ret: bigint = bindings.ParseOrSemanticError_clone(this.ptr);
		const ret_hu_conv: ParseOrSemanticError = ParseOrSemanticError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParseError-variant ParseOrSemanticError
	 */
	public static constructor_parse_error(a: Bolt11ParseError): ParseOrSemanticError {
		const ret: bigint = bindings.ParseOrSemanticError_parse_error(CommonBase.get_ptr_of(a));
		const ret_hu_conv: ParseOrSemanticError = ParseOrSemanticError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SemanticError-variant ParseOrSemanticError
	 */
	public static constructor_semantic_error(a: Bolt11SemanticError): ParseOrSemanticError {
		const ret: bigint = bindings.ParseOrSemanticError_semantic_error(a);
		const ret_hu_conv: ParseOrSemanticError = ParseOrSemanticError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ParseOrSemanticErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: ParseOrSemanticError): boolean {
		const ret: boolean = bindings.ParseOrSemanticError_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Get the string representation of a ParseOrSemanticError object
	 */
	public to_str(): string {
		const ret: number = bindings.ParseOrSemanticError_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Build a ParseOrSemanticError from a Bolt11ParseError
	 */
	public static constructor_from_Bolt11ParseError(f: Bolt11ParseError): ParseOrSemanticError {
		const ret: bigint = bindings.ParseOrSemanticError_from_Bolt11ParseError(CommonBase.get_ptr_of(f));
		const ret_hu_conv: ParseOrSemanticError = ParseOrSemanticError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a ParseOrSemanticError from a Bolt11SemanticError
	 */
	public static constructor_from_Bolt11SemanticError(f: Bolt11SemanticError): ParseOrSemanticError {
		const ret: bigint = bindings.ParseOrSemanticError_from_Bolt11SemanticError(f);
		const ret_hu_conv: ParseOrSemanticError = ParseOrSemanticError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A ParseOrSemanticError of type ParseError */
export class ParseOrSemanticError_ParseError extends ParseOrSemanticError {
	public parse_error: Bolt11ParseError;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const parse_error: bigint = bindings.LDKParseOrSemanticError_ParseError_get_parse_error(ptr);
		const parse_error_hu_conv: Bolt11ParseError = new Bolt11ParseError(null, parse_error);
			CommonBase.add_ref_from(parse_error_hu_conv, this);
		this.parse_error = parse_error_hu_conv;
	}
}
/** A ParseOrSemanticError of type SemanticError */
export class ParseOrSemanticError_SemanticError extends ParseOrSemanticError {
	public semantic_error: Bolt11SemanticError;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.semantic_error = bindings.LDKParseOrSemanticError_SemanticError_get_semantic_error(ptr);
	}
}
