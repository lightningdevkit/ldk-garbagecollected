
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Route hints used in constructing invoices for [phantom node payents].
 * 
 * [phantom node payments]: crate::sign::PhantomKeysManager
 */
export class PhantomRouteHints extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PhantomRouteHints_free);
	}

	/**
	 * The list of channels to be included in the invoice route hints.
	 */
	public get_channels(): ChannelDetails[] {
		const ret: number = bindings.PhantomRouteHints_get_channels(this.ptr);
		const ret_conv_16_len: number = bindings.getArrayLength(ret);
		const ret_conv_16_arr: ChannelDetails[] = new Array(ret_conv_16_len).fill(null);
		for (var q = 0; q < ret_conv_16_len; q++) {
			const ret_conv_16: bigint = bindings.getU64ArrayElem(ret, q);
			const ret_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, ret_conv_16);
			CommonBase.add_ref_from(ret_conv_16_hu_conv, this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_16_arr;
	}

	/**
	 * The list of channels to be included in the invoice route hints.
	 */
	public set_channels(val: ChannelDetails[]): void {
		bindings.PhantomRouteHints_set_channels(this.ptr, bindings.encodeUint64Array(val.map(val_conv_16 => CommonBase.get_ptr_of(val_conv_16))));
	}

	/**
	 * A fake scid used for representing the phantom node's fake channel in generating the invoice
	 * route hints.
	 */
	public get_phantom_scid(): bigint {
		const ret: bigint = bindings.PhantomRouteHints_get_phantom_scid(this.ptr);
		return ret;
	}

	/**
	 * A fake scid used for representing the phantom node's fake channel in generating the invoice
	 * route hints.
	 */
	public set_phantom_scid(val: bigint): void {
		bindings.PhantomRouteHints_set_phantom_scid(this.ptr, val);
	}

	/**
	 * The pubkey of the real backing node that would ultimately receive the payment.
	 */
	public get_real_node_pubkey(): Uint8Array {
		const ret: number = bindings.PhantomRouteHints_get_real_node_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The pubkey of the real backing node that would ultimately receive the payment.
	 */
	public set_real_node_pubkey(val: Uint8Array): void {
		bindings.PhantomRouteHints_set_real_node_pubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new PhantomRouteHints given each field
	 */
	public static constructor_new(channels_arg: ChannelDetails[], phantom_scid_arg: bigint, real_node_pubkey_arg: Uint8Array): PhantomRouteHints {
		const ret: bigint = bindings.PhantomRouteHints_new(bindings.encodeUint64Array(channels_arg.map(channels_arg_conv_16 => CommonBase.get_ptr_of(channels_arg_conv_16))), phantom_scid_arg, bindings.encodeUint8Array(real_node_pubkey_arg));
		const ret_hu_conv: PhantomRouteHints = new PhantomRouteHints(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PhantomRouteHints_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PhantomRouteHints
	 */
	public clone(): PhantomRouteHints {
		const ret: bigint = bindings.PhantomRouteHints_clone(this.ptr);
		const ret_hu_conv: PhantomRouteHints = new PhantomRouteHints(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the PhantomRouteHints object into a byte array which can be read by PhantomRouteHints_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PhantomRouteHints_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PhantomRouteHints from a byte array, created by PhantomRouteHints_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PhantomRouteHintsDecodeErrorZ {
		const ret: bigint = bindings.PhantomRouteHints_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PhantomRouteHintsDecodeErrorZ = Result_PhantomRouteHintsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
