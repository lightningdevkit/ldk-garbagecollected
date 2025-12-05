
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A user-defined name for a node, which may be used when displaying the node in a graph.
 * 
 * Since node aliases are provided by third parties, they are a potential avenue for injection
 * attacks. Care must be taken when processing.
 */
export class NodeAlias extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NodeAlias_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.NodeAlias_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.NodeAlias_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new NodeAlias given each field
	 */
	public static constructor_new(a_arg: Uint8Array): NodeAlias {
		const ret: bigint = bindings.NodeAlias_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: NodeAlias = new NodeAlias(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.NodeAlias_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the NodeAlias
	 */
	public clone(): NodeAlias {
		const ret: bigint = bindings.NodeAlias_clone(this.ptr);
		const ret_hu_conv: NodeAlias = new NodeAlias(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NodeAlias.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.NodeAlias_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two NodeAliass contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: NodeAlias): boolean {
		const ret: boolean = bindings.NodeAlias_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Get the string representation of a NodeAlias object
	 */
	public to_str(): string {
		const ret: number = bindings.NodeAlias_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the NodeAlias object into a byte array which can be read by NodeAlias_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.NodeAlias_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a NodeAlias from a byte array, created by NodeAlias_write
	 */
	public static constructor_read(ser: Uint8Array): Result_NodeAliasDecodeErrorZ {
		const ret: bigint = bindings.NodeAlias_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_NodeAliasDecodeErrorZ = Result_NodeAliasDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
