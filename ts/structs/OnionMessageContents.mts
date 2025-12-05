

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of OnionMessageContents */
export interface OnionMessageContentsInterface {
	/**Returns the TLV type identifying the message contents. MUST be >= 64.
	 */
	tlv_type(): bigint;
	/**Returns the message type
	 */
	msg_type(): string;
	/**Serialize the object into a byte array
	 */
	write(): Uint8Array;
	/**Return a human-readable "debug" string describing this object
	 */
	debug_str(): string;
}

class LDKOnionMessageContentsHolder {
	held: OnionMessageContents|null = null;
}

/**
 * The contents of an onion message.
 */
export class OnionMessageContents extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKOnionMessageContents|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OnionMessageContents_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of OnionMessageContents from a given implementation */
	public static new_impl(arg: OnionMessageContentsInterface): OnionMessageContents {
		const impl_holder: LDKOnionMessageContentsHolder = new LDKOnionMessageContentsHolder();
		let structImplementation = {
			tlv_type (): bigint {
				const ret: bigint = arg.tlv_type();
				return ret;
			},
			msg_type (): number {
				const ret: string = arg.msg_type();
				const result: number = bindings.encodeString(ret);
				return result;
			},
			write (): number {
				const ret: Uint8Array = arg.write();
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
			debug_str (): number {
				const ret: string = arg.debug_str();
				const result: number = bindings.encodeString(ret);
				return result;
			},
		} as bindings.LDKOnionMessageContents;
		const ptr_idx: [bigint, number] = bindings.LDKOnionMessageContents_new(structImplementation);

		impl_holder.held = new OnionMessageContents(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Returns the TLV type identifying the message contents. MUST be >= 64.
	 */
	public tlv_type(): bigint {
		const ret: bigint = bindings.OnionMessageContents_tlv_type(this.ptr);
		return ret;
	}

	/**
	 * Returns the message type
	 */
	public msg_type(): string {
		const ret: number = bindings.OnionMessageContents_msg_type(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OnionMessageContents_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Return a human-readable "debug" string describing this object
	 */
	public debug_str(): string {
		const ret: number = bindings.OnionMessageContents_debug_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OnionMessageContents_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of a OnionMessageContents
	 */
	public clone(): OnionMessageContents {
		const ret: bigint = bindings.OnionMessageContents_clone(this.ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
