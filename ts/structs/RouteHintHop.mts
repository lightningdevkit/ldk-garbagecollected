
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A channel descriptor for a hop along a payment path.
 * 
 * While this generally comes from BOLT 11's `r` field, this struct includes more fields than are
 * available in BOLT 11. Thus, encoding and decoding this via `lightning-invoice` is lossy, as
 * fields not supported in BOLT 11 will be stripped.
 */
export class RouteHintHop extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RouteHintHop_free);
	}

	/**
	 * Serialize the RouteHintHop object into a byte array which can be read by RouteHintHop_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.RouteHintHop_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RouteHintHop from a byte array, created by RouteHintHop_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RouteHintHopDecodeErrorZ {
		const ret: bigint = bindings.RouteHintHop_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RouteHintHopDecodeErrorZ = Result_RouteHintHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * The node_id of the non-target end of the route
	 */
	public get_src_node_id(): Uint8Array {
		const ret: number = bindings.RouteHintHop_get_src_node_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node_id of the non-target end of the route
	 */
	public set_src_node_id(val: Uint8Array): void {
		bindings.RouteHintHop_set_src_node_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The short_channel_id of this channel
	 */
	public get_short_channel_id(): bigint {
		const ret: bigint = bindings.RouteHintHop_get_short_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The short_channel_id of this channel
	 */
	public set_short_channel_id(val: bigint): void {
		bindings.RouteHintHop_set_short_channel_id(this.ptr, val);
	}

	/**
	 * The fees which must be paid to use this channel
	 */
	public get_fees(): RoutingFees {
		const ret: bigint = bindings.RouteHintHop_get_fees(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The fees which must be paid to use this channel
	 */
	public set_fees(val: RoutingFees): void {
		bindings.RouteHintHop_set_fees(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The difference in CLTV values between this node and the next node.
	 */
	public get_cltv_expiry_delta(): number {
		const ret: number = bindings.RouteHintHop_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The difference in CLTV values between this node and the next node.
	 */
	public set_cltv_expiry_delta(val: number): void {
		bindings.RouteHintHop_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * The minimum value, in msat, which must be relayed to the next hop.
	 */
	public get_htlc_minimum_msat(): Option_u64Z {
		const ret: bigint = bindings.RouteHintHop_get_htlc_minimum_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The minimum value, in msat, which must be relayed to the next hop.
	 */
	public set_htlc_minimum_msat(val: Option_u64Z): void {
		bindings.RouteHintHop_set_htlc_minimum_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The maximum value in msat available for routing with a single HTLC.
	 */
	public get_htlc_maximum_msat(): Option_u64Z {
		const ret: bigint = bindings.RouteHintHop_get_htlc_maximum_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The maximum value in msat available for routing with a single HTLC.
	 */
	public set_htlc_maximum_msat(val: Option_u64Z): void {
		bindings.RouteHintHop_set_htlc_maximum_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new RouteHintHop given each field
	 */
	public static constructor_new(src_node_id_arg: Uint8Array, short_channel_id_arg: bigint, fees_arg: RoutingFees, cltv_expiry_delta_arg: number, htlc_minimum_msat_arg: Option_u64Z, htlc_maximum_msat_arg: Option_u64Z): RouteHintHop {
		const ret: bigint = bindings.RouteHintHop_new(bindings.encodeUint8Array(src_node_id_arg), short_channel_id_arg, CommonBase.get_ptr_of(fees_arg), cltv_expiry_delta_arg, CommonBase.get_ptr_of(htlc_minimum_msat_arg), CommonBase.get_ptr_of(htlc_maximum_msat_arg));
		const ret_hu_conv: RouteHintHop = new RouteHintHop(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RouteHintHop_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RouteHintHop
	 */
	public clone(): RouteHintHop {
		const ret: bigint = bindings.RouteHintHop_clone(this.ptr);
		const ret_hu_conv: RouteHintHop = new RouteHintHop(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RouteHintHop.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.RouteHintHop_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two RouteHintHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RouteHintHop): boolean {
		const ret: boolean = bindings.RouteHintHop_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
