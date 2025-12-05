

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of Type */
export interface TypeInterface {
	/**Returns the type identifying the message payload.
	 */
	type_id(): number;
	/**Return a human-readable "debug" string describing this object
	 */
	debug_str(): string;
	/**Serialize the object into a byte array
	 */
	write(): Uint8Array;
}

class LDKTypeHolder {
	held: Type|null = null;
}

/**
 * Defines a type identifier for sending messages over the wire.
 * 
 * Messages implementing this trait specify a type and must be [`Writeable`].
 */
export class Type extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKType|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Type_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of Type from a given implementation */
	public static new_impl(arg: TypeInterface): Type {
		const impl_holder: LDKTypeHolder = new LDKTypeHolder();
		let structImplementation = {
			type_id (): number {
				const ret: number = arg.type_id();
				return ret;
			},
			debug_str (): number {
				const ret: string = arg.debug_str();
				const result: number = bindings.encodeString(ret);
				return result;
			},
			write (): number {
				const ret: Uint8Array = arg.write();
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
		} as bindings.LDKType;
		const ptr_idx: [bigint, number] = bindings.LDKType_new(structImplementation);

		impl_holder.held = new Type(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Returns the type identifying the message payload.
	 */
	public type_id(): number {
		const ret: number = bindings.Type_type_id(this.ptr);
		return ret;
	}

	/**
	 * Return a human-readable "debug" string describing this object
	 */
	public debug_str(): string {
		const ret: number = bindings.Type_debug_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Type_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Type_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of a Type
	 */
	public clone(): Type {
		const ret: bigint = bindings.Type_clone(this.ptr);
		const ret_hu_conv: Type = new Type(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
