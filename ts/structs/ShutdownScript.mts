
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A script pubkey for shutting down a channel as defined by [BOLT #2].
 * 
 * [BOLT #2]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md
 */
export class ShutdownScript extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ShutdownScript_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ShutdownScript_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ShutdownScript
	 */
	public clone(): ShutdownScript {
		const ret: bigint = bindings.ShutdownScript_clone(this.ptr);
		const ret_hu_conv: ShutdownScript = new ShutdownScript(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ShutdownScripts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ShutdownScript): boolean {
		const ret: boolean = bindings.ShutdownScript_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ShutdownScript object into a byte array which can be read by ShutdownScript_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ShutdownScript_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ShutdownScript from a byte array, created by ShutdownScript_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ShutdownScriptDecodeErrorZ {
		const ret: bigint = bindings.ShutdownScript_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ShutdownScriptDecodeErrorZ = Result_ShutdownScriptDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Generates a P2WPKH script pubkey from the given [`WPubkeyHash`].
	 */
	public static constructor_new_p2wpkh(pubkey_hash: Uint8Array): ShutdownScript {
		const ret: bigint = bindings.ShutdownScript_new_p2wpkh(bindings.encodeUint8Array(pubkey_hash));
		const ret_hu_conv: ShutdownScript = new ShutdownScript(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a P2WSH script pubkey from the given [`WScriptHash`].
	 */
	public static constructor_new_p2wsh(script_hash: Uint8Array): ShutdownScript {
		const ret: bigint = bindings.ShutdownScript_new_p2wsh(bindings.encodeUint8Array(script_hash));
		const ret_hu_conv: ShutdownScript = new ShutdownScript(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a witness script pubkey from the given segwit version and program.
	 * 
	 * Note for version-zero witness scripts you must use [`ShutdownScript::new_p2wpkh`] or
	 * [`ShutdownScript::new_p2wsh`] instead.
	 * 
	 * # Errors
	 * 
	 * This function may return an error if `program` is invalid for the segwit `version`.
	 */
	public static constructor_new_witness_program(witness_program: WitnessProgram): Result_ShutdownScriptInvalidShutdownScriptZ {
		const ret: bigint = bindings.ShutdownScript_new_witness_program(CommonBase.get_ptr_of(witness_program));
		const ret_hu_conv: Result_ShutdownScriptInvalidShutdownScriptZ = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Converts the shutdown script into the underlying [`ScriptBuf`].
	 */
	public into_inner(): Uint8Array {
		const ret: number = bindings.ShutdownScript_into_inner(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the [`PublicKey`] used for a P2WPKH shutdown script if constructed directly from it.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public as_legacy_pubkey(): Uint8Array {
		const ret: number = bindings.ShutdownScript_as_legacy_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns whether the shutdown script is compatible with the features as defined by BOLT #2.
	 * 
	 * Specifically, checks for compliance with feature `option_shutdown_anysegwit` and/or
	 * `option_simple_close`.
	 */
	public is_compatible(features: InitFeatures): boolean {
		const ret: boolean = bindings.ShutdownScript_is_compatible(this.ptr, CommonBase.get_ptr_of(features));
		return ret;
	}

	/**
	 * Get the string representation of a ShutdownScript object
	 */
	public to_str(): string {
		const ret: number = bindings.ShutdownScript_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
