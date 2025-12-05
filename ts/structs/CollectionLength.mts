
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The lightning protocol uses u16s for lengths in most cases. As our serialization framework
 * primarily targets that, we must as well. However, because we may serialize objects that have
 * more than 65K entries, we need to be able to store larger values. Thus, we define a variable
 * length integer here that is backwards-compatible for values < 0xffff. We treat 0xffff as
 * \"read eight more bytes\".
 * 
 * To ensure we only have one valid encoding per value, we add 0xffff to values written as eight
 * bytes. Thus, 0xfffe is serialized as 0xfffe, whereas 0xffff is serialized as
 * 0xffff0000000000000000 (i.e. read-eight-bytes then zero).
 */
export class CollectionLength extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CollectionLength_free);
	}

	public get_a(): bigint {
		const ret: bigint = bindings.CollectionLength_get_a(this.ptr);
		return ret;
	}

	public set_a(val: bigint): void {
		bindings.CollectionLength_set_a(this.ptr, val);
	}

	/**
	 * Constructs a new CollectionLength given each field
	 */
	public static constructor_new(a_arg: bigint): CollectionLength {
		const ret: bigint = bindings.CollectionLength_new(a_arg);
		const ret_hu_conv: CollectionLength = new CollectionLength(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the CollectionLength object into a byte array which can be read by CollectionLength_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.CollectionLength_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a CollectionLength from a byte array, created by CollectionLength_write
	 */
	public static constructor_read(ser: Uint8Array): Result_CollectionLengthDecodeErrorZ {
		const ret: bigint = bindings.CollectionLength_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_CollectionLengthDecodeErrorZ = Result_CollectionLengthDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
