
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Fallback address in case no LN payment is possible
 */
export class Fallback extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Fallback_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Fallback {
		const raw_ty: number = bindings.LDKFallback_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Fallback_SegWitProgram(ptr);
			case 1: return new Fallback_PubKeyHash(ptr);
			case 2: return new Fallback_ScriptHash(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Fallback_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Fallback
	 */
	public clone(): Fallback {
		const ret: bigint = bindings.Fallback_clone(this.ptr);
		const ret_hu_conv: Fallback = Fallback.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SegWitProgram-variant Fallback
	 */
	public static constructor_seg_wit_program(version: WitnessVersion, program: Uint8Array): Fallback {
		const ret: bigint = bindings.Fallback_seg_wit_program(version.getVal(), bindings.encodeUint8Array(program));
		const ret_hu_conv: Fallback = Fallback.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PubKeyHash-variant Fallback
	 */
	public static constructor_pub_key_hash(a: Uint8Array): Fallback {
		const ret: bigint = bindings.Fallback_pub_key_hash(bindings.encodeUint8Array(a));
		const ret_hu_conv: Fallback = Fallback.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ScriptHash-variant Fallback
	 */
	public static constructor_script_hash(a: Uint8Array): Fallback {
		const ret: bigint = bindings.Fallback_script_hash(bindings.encodeUint8Array(a));
		const ret_hu_conv: Fallback = Fallback.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Fallback.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Fallback_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Fallbacks contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: Fallback): boolean {
		const ret: boolean = bindings.Fallback_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
/** A Fallback of type SegWitProgram */
export class Fallback_SegWitProgram extends Fallback {
	public version: WitnessVersion;
	public program: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const version: number = bindings.LDKFallback_SegWitProgram_get_version(ptr);
		const version_conv: WitnessVersion = new WitnessVersion(version);
		this.version = version_conv;
		const program: number = bindings.LDKFallback_SegWitProgram_get_program(ptr);
		const program_conv: Uint8Array = bindings.decodeUint8Array(program);
		this.program = program_conv;
	}
}
/** A Fallback of type PubKeyHash */
export class Fallback_PubKeyHash extends Fallback {
	public pub_key_hash: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const pub_key_hash: number = bindings.LDKFallback_PubKeyHash_get_pub_key_hash(ptr);
		const pub_key_hash_conv: Uint8Array = bindings.decodeUint8Array(pub_key_hash);
		this.pub_key_hash = pub_key_hash_conv;
	}
}
/** A Fallback of type ScriptHash */
export class Fallback_ScriptHash extends Fallback {
	public script_hash: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const script_hash: number = bindings.LDKFallback_ScriptHash_get_script_hash(ptr);
		const script_hash_conv: Uint8Array = bindings.decodeUint8Array(script_hash);
		this.script_hash = script_hash_conv;
	}
}
