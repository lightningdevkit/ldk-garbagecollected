
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A reference to a transaction output.
 * 
 * Differs from bitcoin::transaction::OutPoint as the index is a u16 instead of u32
 * due to LN's restrictions on index values. Should reduce (possibly) unsafe conversions this way.
 */
export class OutPoint extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OutPoint_free);
	}

	/**
	 * The referenced transaction's txid.
	 */
	public get_txid(): Uint8Array {
		const ret: number = bindings.OutPoint_get_txid(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The referenced transaction's txid.
	 */
	public set_txid(val: Uint8Array): void {
		bindings.OutPoint_set_txid(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The index of the referenced output in its transaction's vout.
	 */
	public get_index(): number {
		const ret: number = bindings.OutPoint_get_index(this.ptr);
		return ret;
	}

	/**
	 * The index of the referenced output in its transaction's vout.
	 */
	public set_index(val: number): void {
		bindings.OutPoint_set_index(this.ptr, val);
	}

	/**
	 * Constructs a new OutPoint given each field
	 */
	public static constructor_new(txid_arg: Uint8Array, index_arg: number): OutPoint {
		const ret: bigint = bindings.OutPoint_new(bindings.encodeUint8Array(txid_arg), index_arg);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OutPoint_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OutPoint
	 */
	public clone(): OutPoint {
		const ret: bigint = bindings.OutPoint_clone(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two OutPoints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: OutPoint): boolean {
		const ret: boolean = bindings.OutPoint_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OutPoint.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.OutPoint_hash(this.ptr);
		return ret;
	}

	/**
	 * Get the string representation of a OutPoint object
	 */
	public to_str(): string {
		const ret: number = bindings.OutPoint_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the OutPoint object into a byte array which can be read by OutPoint_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OutPoint_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OutPoint from a byte array, created by OutPoint_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OutPointDecodeErrorZ {
		const ret: bigint = bindings.OutPoint_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OutPointDecodeErrorZ = Result_OutPointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
