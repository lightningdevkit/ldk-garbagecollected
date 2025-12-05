
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A data structure for tracking in-flight HTLCs. May be used during pathfinding to account for
 * in-use channel liquidity.
 */
export class InFlightHtlcs extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.InFlightHtlcs_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.InFlightHtlcs_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the InFlightHtlcs
	 */
	public clone(): InFlightHtlcs {
		const ret: bigint = bindings.InFlightHtlcs_clone(this.ptr);
		const ret_hu_conv: InFlightHtlcs = new InFlightHtlcs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs an empty `InFlightHtlcs`.
	 */
	public static constructor_new(): InFlightHtlcs {
		const ret: bigint = bindings.InFlightHtlcs_new();
		const ret_hu_conv: InFlightHtlcs = new InFlightHtlcs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Takes in a path with payer's node id and adds the path's details to `InFlightHtlcs`.
	 */
	public process_path(path: Path, payer_node_id: Uint8Array): void {
		bindings.InFlightHtlcs_process_path(this.ptr, CommonBase.get_ptr_of(path), bindings.encodeUint8Array(payer_node_id));
	}

	/**
	 * Adds a known HTLC given the public key of the HTLC source, target, and short channel
	 * id.
	 */
	public add_inflight_htlc(source: NodeId, target: NodeId, channel_scid: bigint, used_msat: bigint): void {
		bindings.InFlightHtlcs_add_inflight_htlc(this.ptr, CommonBase.get_ptr_of(source), CommonBase.get_ptr_of(target), channel_scid, used_msat);
	}

	/**
	 * Returns liquidity in msat given the public key of the HTLC source, target, and short channel
	 * id.
	 */
	public used_liquidity_msat(source: NodeId, target: NodeId, channel_scid: bigint): Option_u64Z {
		const ret: bigint = bindings.InFlightHtlcs_used_liquidity_msat(this.ptr, CommonBase.get_ptr_of(source), CommonBase.get_ptr_of(target), channel_scid);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the InFlightHtlcs object into a byte array which can be read by InFlightHtlcs_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.InFlightHtlcs_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a InFlightHtlcs from a byte array, created by InFlightHtlcs_write
	 */
	public static constructor_read(ser: Uint8Array): Result_InFlightHtlcsDecodeErrorZ {
		const ret: bigint = bindings.InFlightHtlcs_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_InFlightHtlcsDecodeErrorZ = Result_InFlightHtlcsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
