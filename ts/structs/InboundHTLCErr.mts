
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Invalid inbound onion payment.
 */
export class InboundHTLCErr extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.InboundHTLCErr_free);
	}

	/**
	 * BOLT 4 error code.
	 */
	public get_reason(): LocalHTLCFailureReason {
		const ret: bigint = bindings.InboundHTLCErr_get_reason(this.ptr);
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * BOLT 4 error code.
	 */
	public set_reason(val: LocalHTLCFailureReason): void {
		bindings.InboundHTLCErr_set_reason(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Data attached to this error.
	 * 
	 * Returns a copy of the field.
	 */
	public get_err_data(): Uint8Array {
		const ret: number = bindings.InboundHTLCErr_get_err_data(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Data attached to this error.
	 */
	public set_err_data(val: Uint8Array): void {
		bindings.InboundHTLCErr_set_err_data(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Error message text.
	 */
	public get_msg(): string {
		const ret: number = bindings.InboundHTLCErr_get_msg(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Error message text.
	 */
	public set_msg(val: string): void {
		bindings.InboundHTLCErr_set_msg(this.ptr, bindings.encodeString(val));
	}

	/**
	 * Constructs a new InboundHTLCErr given each field
	 */
	public static constructor_new(reason_arg: LocalHTLCFailureReason, err_data_arg: Uint8Array, msg_arg: string): InboundHTLCErr {
		const ret: bigint = bindings.InboundHTLCErr_new(CommonBase.get_ptr_of(reason_arg), bindings.encodeUint8Array(err_data_arg), bindings.encodeString(msg_arg));
		const ret_hu_conv: InboundHTLCErr = new InboundHTLCErr(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.InboundHTLCErr_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the InboundHTLCErr
	 */
	public clone(): InboundHTLCErr {
		const ret: bigint = bindings.InboundHTLCErr_clone(this.ptr);
		const ret_hu_conv: InboundHTLCErr = new InboundHTLCErr(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the InboundHTLCErr.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.InboundHTLCErr_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two InboundHTLCErrs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: InboundHTLCErr): boolean {
		const ret: boolean = bindings.InboundHTLCErr_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
