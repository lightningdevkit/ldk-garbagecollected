
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A compressed pubkey which a node uses to sign announcements and decode HTLCs routed through it.
 * 
 * This type stores a simple byte array which is not checked for validity (i.e. that it describes
 * a point which lies on the secp256k1 curve), unlike [`PublicKey`], as validity checking would
 * otherwise represent a large portion of [`NetworkGraph`] deserialization time (and RGS
 * application).
 */
export class NodeId extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NodeId_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.NodeId_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the NodeId
	 */
	public clone(): NodeId {
		const ret: bigint = bindings.NodeId_clone(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two NodeIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: NodeId): boolean {
		const ret: boolean = bindings.NodeId_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Create a new NodeId from a public key
	 */
	public static constructor_from_pubkey(pubkey: Uint8Array): NodeId {
		const ret: bigint = bindings.NodeId_from_pubkey(bindings.encodeUint8Array(pubkey));
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Create a new NodeId from a slice of bytes
	 */
	public static constructor_from_slice(bytes: Uint8Array): Result_NodeIdDecodeErrorZ {
		const ret: bigint = bindings.NodeId_from_slice(bindings.encodeUint8Array(bytes));
		const ret_hu_conv: Result_NodeIdDecodeErrorZ = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the public key slice from this NodeId
	 */
	public as_slice(): Uint8Array {
		const ret: number = bindings.NodeId_as_slice(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Get the public key as an array from this NodeId
	 */
	public as_array(): Uint8Array {
		const ret: number = bindings.NodeId_as_array(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Get the public key from this NodeId
	 */
	public as_pubkey(): Result_PublicKeySecp256k1ErrorZ {
		const ret: bigint = bindings.NodeId_as_pubkey(this.ptr);
		const ret_hu_conv: Result_PublicKeySecp256k1ErrorZ = Result_PublicKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a NodeId object
	 */
	public to_str(): string {
		const ret: number = bindings.NodeId_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NodeId.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.NodeId_hash(this.ptr);
		return ret;
	}

	/**
	 * Serialize the NodeId object into a byte array which can be read by NodeId_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.NodeId_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a NodeId from a byte array, created by NodeId_write
	 */
	public static constructor_read(ser: Uint8Array): Result_NodeIdDecodeErrorZ {
		const ret: bigint = bindings.NodeId_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_NodeIdDecodeErrorZ = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Build a NodeId from a PublicKey
	 */
	public static constructor_from_PublicKey(f: Uint8Array): NodeId {
		const ret: bigint = bindings.NodeId_from_PublicKey(bindings.encodeUint8Array(f));
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
