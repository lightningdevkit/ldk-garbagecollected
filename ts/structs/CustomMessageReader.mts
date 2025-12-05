

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of CustomMessageReader */
export interface CustomMessageReaderInterface {
	/**Decodes a custom message to `CustomMessageType`. If the given message type is known to the
	 * implementation and the message could be decoded, must return `Ok(Some(message))`. If the
	 * message type is unknown to the implementation, must return `Ok(None)`. If a decoding error
	 * occur, must return `Err(DecodeError::X)` where `X` details the encountered error.
	 */
	read(message_type: number, buffer: Uint8Array): Result_COption_TypeZDecodeErrorZ;
}

class LDKCustomMessageReaderHolder {
	held: CustomMessageReader|null = null;
}

/**
 * Trait to be implemented by custom message (unrelated to the channel/gossip LN layers)
 * decoders.
 */
export class CustomMessageReader extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKCustomMessageReader|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CustomMessageReader_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of CustomMessageReader from a given implementation */
	public static new_impl(arg: CustomMessageReaderInterface): CustomMessageReader {
		const impl_holder: LDKCustomMessageReaderHolder = new LDKCustomMessageReaderHolder();
		let structImplementation = {
			read (message_type: number, buffer: number): bigint {
				const buffer_conv: Uint8Array = bindings.decodeUint8Array(buffer);
				const ret: Result_COption_TypeZDecodeErrorZ = arg.read(message_type, buffer_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKCustomMessageReader;
		const ptr_idx: [bigint, number] = bindings.LDKCustomMessageReader_new(structImplementation);

		impl_holder.held = new CustomMessageReader(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Decodes a custom message to `CustomMessageType`. If the given message type is known to the
	 * implementation and the message could be decoded, must return `Ok(Some(message))`. If the
	 * message type is unknown to the implementation, must return `Ok(None)`. If a decoding error
	 * occur, must return `Err(DecodeError::X)` where `X` details the encountered error.
	 */
	public read(message_type: number, buffer: Uint8Array): Result_COption_TypeZDecodeErrorZ {
		const ret: bigint = bindings.CustomMessageReader_read(this.ptr, message_type, bindings.encodeUint8Array(buffer));
		const ret_hu_conv: Result_COption_TypeZDecodeErrorZ = Result_COption_TypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
