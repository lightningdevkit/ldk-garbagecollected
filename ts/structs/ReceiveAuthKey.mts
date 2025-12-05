
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A secret key used to authenticate message contexts in received [`BlindedMessagePath`]s.
 * 
 * This key ensures that a node only accepts incoming messages delivered through
 * blinded paths that it constructed itself.
 * 
 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
 */
export class ReceiveAuthKey extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ReceiveAuthKey_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.ReceiveAuthKey_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.ReceiveAuthKey_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new ReceiveAuthKey given each field
	 */
	public static constructor_new(a_arg: Uint8Array): ReceiveAuthKey {
		const ret: bigint = bindings.ReceiveAuthKey_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: ReceiveAuthKey = new ReceiveAuthKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ReceiveAuthKey_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ReceiveAuthKey
	 */
	public clone(): ReceiveAuthKey {
		const ret: bigint = bindings.ReceiveAuthKey_clone(this.ptr);
		const ret_hu_conv: ReceiveAuthKey = new ReceiveAuthKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ReceiveAuthKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ReceiveAuthKey): boolean {
		const ret: boolean = bindings.ReceiveAuthKey_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
