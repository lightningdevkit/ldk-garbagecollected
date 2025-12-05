
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The `Responder` struct creates an appropriate [`ResponseInstruction`] for responding to a
 * message.
 */
export class Responder extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Responder_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Responder_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Responder
	 */
	public clone(): Responder {
		const ret: bigint = bindings.Responder_clone(this.ptr);
		const ret_hu_conv: Responder = new Responder(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Responders contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Responder): boolean {
		const ret: boolean = bindings.Responder_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Responder object into a byte array which can be read by Responder_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Responder_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Responder from a byte array, created by Responder_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ResponderDecodeErrorZ {
		const ret: bigint = bindings.Responder_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ResponderDecodeErrorZ = Result_ResponderDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a [`ResponseInstruction`] for responding without including a reply path.
	 * 
	 * Use when the recipient doesn't need to send back a reply to us.
	 */
	public respond(): ResponseInstruction {
		const ret: bigint = bindings.Responder_respond(this.ptr);
		const ret_hu_conv: ResponseInstruction = new ResponseInstruction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a [`ResponseInstruction`] for responding including a reply path.
	 * 
	 * Use when the recipient needs to send back a reply to us.
	 */
	public respond_with_reply_path(context: MessageContext): ResponseInstruction {
		const ret: bigint = bindings.Responder_respond_with_reply_path(this.ptr, CommonBase.get_ptr_of(context));
		const ret_hu_conv: ResponseInstruction = new ResponseInstruction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
