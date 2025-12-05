
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A hop in a route, and additional metadata about it. \"Hop\" is defined as a node and the channel
 * that leads to it.
 */
export class RouteHop extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RouteHop_free);
	}

	/**
	 * The node_id of the node at this hop.
	 */
	public get_pubkey(): Uint8Array {
		const ret: number = bindings.RouteHop_get_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node_id of the node at this hop.
	 */
	public set_pubkey(val: Uint8Array): void {
		bindings.RouteHop_set_pubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The node_announcement features of the node at this hop. For the last hop, these may be
	 * amended to match the features present in the invoice this node generated.
	 */
	public get_node_features(): NodeFeatures {
		const ret: bigint = bindings.RouteHop_get_node_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The node_announcement features of the node at this hop. For the last hop, these may be
	 * amended to match the features present in the invoice this node generated.
	 */
	public set_node_features(val: NodeFeatures): void {
		bindings.RouteHop_set_node_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The channel that should be used from the previous hop to reach this node.
	 */
	public get_short_channel_id(): bigint {
		const ret: bigint = bindings.RouteHop_get_short_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The channel that should be used from the previous hop to reach this node.
	 */
	public set_short_channel_id(val: bigint): void {
		bindings.RouteHop_set_short_channel_id(this.ptr, val);
	}

	/**
	 * The channel_announcement features of the channel that should be used from the previous hop
	 * to reach this node.
	 */
	public get_channel_features(): ChannelFeatures {
		const ret: bigint = bindings.RouteHop_get_channel_features(this.ptr);
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel_announcement features of the channel that should be used from the previous hop
	 * to reach this node.
	 */
	public set_channel_features(val: ChannelFeatures): void {
		bindings.RouteHop_set_channel_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The fee taken on this hop (for paying for the use of the *next* channel in the path).
	 * If this is the last hop in [`Path::hops`]:
	 * if we're sending to a [`BlindedPaymentPath`], this is the fee paid for use of the entire
	 * blinded path (including any Trampoline hops)
	 * otherwise, this is the full value of this [`Path`]'s part of the payment
	 */
	public get_fee_msat(): bigint {
		const ret: bigint = bindings.RouteHop_get_fee_msat(this.ptr);
		return ret;
	}

	/**
	 * The fee taken on this hop (for paying for the use of the *next* channel in the path).
	 * If this is the last hop in [`Path::hops`]:
	 * if we're sending to a [`BlindedPaymentPath`], this is the fee paid for use of the entire
	 * blinded path (including any Trampoline hops)
	 * otherwise, this is the full value of this [`Path`]'s part of the payment
	 */
	public set_fee_msat(val: bigint): void {
		bindings.RouteHop_set_fee_msat(this.ptr, val);
	}

	/**
	 * The CLTV delta added for this hop.
	 * If this is the last hop in [`Path::hops`]:
	 * if we're sending to a [`BlindedPaymentPath`], this is the CLTV delta for the entire blinded
	 * path (including any Trampoline hops)
	 * otherwise, this is the CLTV delta expected at the destination
	 */
	public get_cltv_expiry_delta(): number {
		const ret: number = bindings.RouteHop_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The CLTV delta added for this hop.
	 * If this is the last hop in [`Path::hops`]:
	 * if we're sending to a [`BlindedPaymentPath`], this is the CLTV delta for the entire blinded
	 * path (including any Trampoline hops)
	 * otherwise, this is the CLTV delta expected at the destination
	 */
	public set_cltv_expiry_delta(val: number): void {
		bindings.RouteHop_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * Indicates whether this hop is possibly announced in the public network graph.
	 * 
	 * Will be `true` if there is a possibility that the channel is publicly known, i.e., if we
	 * either know for sure it's announced in the public graph, or if any public channels exist
	 * for which the given `short_channel_id` could be an alias for. Will be `false` if we believe
	 * the channel to be unannounced.
	 * 
	 * Will be `true` for objects serialized with LDK version 0.0.116 and before.
	 */
	public get_maybe_announced_channel(): boolean {
		const ret: boolean = bindings.RouteHop_get_maybe_announced_channel(this.ptr);
		return ret;
	}

	/**
	 * Indicates whether this hop is possibly announced in the public network graph.
	 * 
	 * Will be `true` if there is a possibility that the channel is publicly known, i.e., if we
	 * either know for sure it's announced in the public graph, or if any public channels exist
	 * for which the given `short_channel_id` could be an alias for. Will be `false` if we believe
	 * the channel to be unannounced.
	 * 
	 * Will be `true` for objects serialized with LDK version 0.0.116 and before.
	 */
	public set_maybe_announced_channel(val: boolean): void {
		bindings.RouteHop_set_maybe_announced_channel(this.ptr, val);
	}

	/**
	 * Constructs a new RouteHop given each field
	 */
	public static constructor_new(pubkey_arg: Uint8Array, node_features_arg: NodeFeatures, short_channel_id_arg: bigint, channel_features_arg: ChannelFeatures, fee_msat_arg: bigint, cltv_expiry_delta_arg: number, maybe_announced_channel_arg: boolean): RouteHop {
		const ret: bigint = bindings.RouteHop_new(bindings.encodeUint8Array(pubkey_arg), CommonBase.get_ptr_of(node_features_arg), short_channel_id_arg, CommonBase.get_ptr_of(channel_features_arg), fee_msat_arg, cltv_expiry_delta_arg, maybe_announced_channel_arg);
		const ret_hu_conv: RouteHop = new RouteHop(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RouteHop_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RouteHop
	 */
	public clone(): RouteHop {
		const ret: bigint = bindings.RouteHop_clone(this.ptr);
		const ret_hu_conv: RouteHop = new RouteHop(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RouteHop.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.RouteHop_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two RouteHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RouteHop): boolean {
		const ret: boolean = bindings.RouteHop_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the RouteHop object into a byte array which can be read by RouteHop_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.RouteHop_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RouteHop from a byte array, created by RouteHop_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RouteHopDecodeErrorZ {
		const ret: bigint = bindings.RouteHop_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RouteHopDecodeErrorZ = Result_RouteHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
