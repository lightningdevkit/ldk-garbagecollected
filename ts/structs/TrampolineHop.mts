
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Trampoline hop in a route, and additional metadata about it. \"Hop\" is defined as a node.
 */
export class TrampolineHop extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TrampolineHop_free);
	}

	/**
	 * The node_id of the node at this hop.
	 */
	public get_pubkey(): Uint8Array {
		const ret: number = bindings.TrampolineHop_get_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node_id of the node at this hop.
	 */
	public set_pubkey(val: Uint8Array): void {
		bindings.TrampolineHop_set_pubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The node_announcement features of the node at this hop.
	 */
	public get_node_features(): NodeFeatures {
		const ret: bigint = bindings.TrampolineHop_get_node_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The node_announcement features of the node at this hop.
	 */
	public set_node_features(val: NodeFeatures): void {
		bindings.TrampolineHop_set_node_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The fee this hop should use to pay for routing towards the next Trampoline hop, or to the
	 * recipient if this is the last Trampoline hop.
	 * If this is the last Trampoline hop within [`BlindedTail`], this is the fee paid for the use of
	 * the entire blinded path.
	 */
	public get_fee_msat(): bigint {
		const ret: bigint = bindings.TrampolineHop_get_fee_msat(this.ptr);
		return ret;
	}

	/**
	 * The fee this hop should use to pay for routing towards the next Trampoline hop, or to the
	 * recipient if this is the last Trampoline hop.
	 * If this is the last Trampoline hop within [`BlindedTail`], this is the fee paid for the use of
	 * the entire blinded path.
	 */
	public set_fee_msat(val: bigint): void {
		bindings.TrampolineHop_set_fee_msat(this.ptr, val);
	}

	/**
	 * The CLTV delta added for this hop.
	 * If this is the last Trampoline hop within [`BlindedTail`], this is the CLTV delta for the entire
	 * blinded path.
	 */
	public get_cltv_expiry_delta(): number {
		const ret: number = bindings.TrampolineHop_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The CLTV delta added for this hop.
	 * If this is the last Trampoline hop within [`BlindedTail`], this is the CLTV delta for the entire
	 * blinded path.
	 */
	public set_cltv_expiry_delta(val: number): void {
		bindings.TrampolineHop_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * Constructs a new TrampolineHop given each field
	 */
	public static constructor_new(pubkey_arg: Uint8Array, node_features_arg: NodeFeatures, fee_msat_arg: bigint, cltv_expiry_delta_arg: number): TrampolineHop {
		const ret: bigint = bindings.TrampolineHop_new(bindings.encodeUint8Array(pubkey_arg), CommonBase.get_ptr_of(node_features_arg), fee_msat_arg, cltv_expiry_delta_arg);
		const ret_hu_conv: TrampolineHop = new TrampolineHop(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TrampolineHop_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TrampolineHop
	 */
	public clone(): TrampolineHop {
		const ret: bigint = bindings.TrampolineHop_clone(this.ptr);
		const ret_hu_conv: TrampolineHop = new TrampolineHop(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TrampolineHop.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.TrampolineHop_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two TrampolineHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TrampolineHop): boolean {
		const ret: boolean = bindings.TrampolineHop_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the TrampolineHop object into a byte array which can be read by TrampolineHop_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TrampolineHop_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TrampolineHop from a byte array, created by TrampolineHop_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TrampolineHopDecodeErrorZ {
		const ret: bigint = bindings.TrampolineHop_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TrampolineHopDecodeErrorZ = Result_TrampolineHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
