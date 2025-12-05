
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Confirmation from a static invoice server  that a [`StaticInvoice`] was persisted and the
 * corresponding [`Offer`] is ready to be used to receive async payments. Sent to an async
 * recipient in response to a [`ServeStaticInvoice`] message.
 * 
 * [`Offer`]: crate::offers::offer::Offer
 */
export class StaticInvoicePersisted extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.StaticInvoicePersisted_free);
	}

	/**
	 * Constructs a new StaticInvoicePersisted given each field
	 */
	public static constructor_new(): StaticInvoicePersisted {
		const ret: bigint = bindings.StaticInvoicePersisted_new();
		const ret_hu_conv: StaticInvoicePersisted = new StaticInvoicePersisted(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.StaticInvoicePersisted_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the StaticInvoicePersisted
	 */
	public clone(): StaticInvoicePersisted {
		const ret: bigint = bindings.StaticInvoicePersisted_clone(this.ptr);
		const ret_hu_conv: StaticInvoicePersisted = new StaticInvoicePersisted(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the StaticInvoicePersisted object into a byte array which can be read by StaticInvoicePersisted_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.StaticInvoicePersisted_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a StaticInvoicePersisted from a byte array, created by StaticInvoicePersisted_write
	 */
	public static constructor_read(ser: Uint8Array): Result_StaticInvoicePersistedDecodeErrorZ {
		const ret: bigint = bindings.StaticInvoicePersisted_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_StaticInvoicePersistedDecodeErrorZ = Result_StaticInvoicePersistedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
