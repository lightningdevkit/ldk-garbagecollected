
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The context of a payment made for an invoice sent for a BOLT 12 [`Refund`].
 * 
 * [`Refund`]: crate::offers::refund::Refund
 */
export class Bolt12RefundContext extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Bolt12RefundContext_free);
	}

	/**
	 * Constructs a new Bolt12RefundContext given each field
	 */
	public static constructor_new(): Bolt12RefundContext {
		const ret: bigint = bindings.Bolt12RefundContext_new();
		const ret_hu_conv: Bolt12RefundContext = new Bolt12RefundContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt12RefundContext_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12RefundContext
	 */
	public clone(): Bolt12RefundContext {
		const ret: bigint = bindings.Bolt12RefundContext_clone(this.ptr);
		const ret_hu_conv: Bolt12RefundContext = new Bolt12RefundContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt12RefundContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Bolt12RefundContext): boolean {
		const ret: boolean = bindings.Bolt12RefundContext_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Bolt12RefundContext object into a byte array which can be read by Bolt12RefundContext_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Bolt12RefundContext_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Bolt12RefundContext from a byte array, created by Bolt12RefundContext_write
	 */
	public static constructor_read(ser: Uint8Array): Result_Bolt12RefundContextDecodeErrorZ {
		const ret: bigint = bindings.Bolt12RefundContext_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_Bolt12RefundContextDecodeErrorZ = Result_Bolt12RefundContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
