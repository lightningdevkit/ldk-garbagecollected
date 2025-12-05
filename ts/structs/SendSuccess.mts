
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Result of successfully [sending an onion message].
 * 
 * [sending an onion message]: OnionMessenger::send_onion_message
 */
export class SendSuccess extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.SendSuccess_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): SendSuccess {
		const raw_ty: number = bindings.LDKSendSuccess_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SendSuccess_Buffered(ptr);
			case 1: return new SendSuccess_BufferedAwaitingConnection(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SendSuccess_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SendSuccess
	 */
	public clone(): SendSuccess {
		const ret: bigint = bindings.SendSuccess_clone(this.ptr);
		const ret_hu_conv: SendSuccess = SendSuccess.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Buffered-variant SendSuccess
	 */
	public static constructor_buffered(): SendSuccess {
		const ret: bigint = bindings.SendSuccess_buffered();
		const ret_hu_conv: SendSuccess = SendSuccess.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BufferedAwaitingConnection-variant SendSuccess
	 */
	public static constructor_buffered_awaiting_connection(a: Uint8Array): SendSuccess {
		const ret: bigint = bindings.SendSuccess_buffered_awaiting_connection(bindings.encodeUint8Array(a));
		const ret_hu_conv: SendSuccess = SendSuccess.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the SendSuccess.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.SendSuccess_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two SendSuccesss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: SendSuccess): boolean {
		const ret: boolean = bindings.SendSuccess_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
/** A SendSuccess of type Buffered */
export class SendSuccess_Buffered extends SendSuccess {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A SendSuccess of type BufferedAwaitingConnection */
export class SendSuccess_BufferedAwaitingConnection extends SendSuccess {
	public buffered_awaiting_connection: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const buffered_awaiting_connection: number = bindings.LDKSendSuccess_BufferedAwaitingConnection_get_buffered_awaiting_connection(ptr);
		const buffered_awaiting_connection_conv: Uint8Array = bindings.decodeUint8Array(buffered_awaiting_connection);
		this.buffered_awaiting_connection = buffered_awaiting_connection_conv;
	}
}
