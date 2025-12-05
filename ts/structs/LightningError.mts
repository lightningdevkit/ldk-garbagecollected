
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An Err type for failure to process messages.
 */
export class LightningError extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.LightningError_free);
	}

	/**
	 * A human-readable message describing the error
	 */
	public get_err(): string {
		const ret: number = bindings.LightningError_get_err(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * A human-readable message describing the error
	 */
	public set_err(val: string): void {
		bindings.LightningError_set_err(this.ptr, bindings.encodeString(val));
	}

	/**
	 * The action which should be taken against the offending peer.
	 */
	public get_action(): ErrorAction {
		const ret: bigint = bindings.LightningError_get_action(this.ptr);
		const ret_hu_conv: ErrorAction = ErrorAction.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The action which should be taken against the offending peer.
	 */
	public set_action(val: ErrorAction): void {
		bindings.LightningError_set_action(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new LightningError given each field
	 */
	public static constructor_new(err_arg: string, action_arg: ErrorAction): LightningError {
		const ret: bigint = bindings.LightningError_new(bindings.encodeString(err_arg), CommonBase.get_ptr_of(action_arg));
		const ret_hu_conv: LightningError = new LightningError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.LightningError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the LightningError
	 */
	public clone(): LightningError {
		const ret: bigint = bindings.LightningError_clone(this.ptr);
		const ret_hu_conv: LightningError = new LightningError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
