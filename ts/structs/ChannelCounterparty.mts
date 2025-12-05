
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Channel parameters which apply to our counterparty. These are split out from [`ChannelDetails`]
 * to better separate parameters.
 */
export class ChannelCounterparty extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelCounterparty_free);
	}

	/**
	 * The node_id of our counterparty
	 */
	public get_node_id(): Uint8Array {
		const ret: number = bindings.ChannelCounterparty_get_node_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node_id of our counterparty
	 */
	public set_node_id(val: Uint8Array): void {
		bindings.ChannelCounterparty_set_node_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The Features the channel counterparty provided upon last connection.
	 * Useful for routing as it is the most up-to-date copy of the counterparty's features and
	 * many routing-relevant features are present in the init context.
	 */
	public get_features(): InitFeatures {
		const ret: bigint = bindings.ChannelCounterparty_get_features(this.ptr);
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The Features the channel counterparty provided upon last connection.
	 * Useful for routing as it is the most up-to-date copy of the counterparty's features and
	 * many routing-relevant features are present in the init context.
	 */
	public set_features(val: InitFeatures): void {
		bindings.ChannelCounterparty_set_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The value, in satoshis, that must always be held in the channel for our counterparty. This
	 * value ensures that if our counterparty broadcasts a revoked state, we can punish them by
	 * claiming at least this value on chain.
	 * 
	 * This value is not included in [`inbound_capacity_msat`] as it can never be spent.
	 * 
	 * [`inbound_capacity_msat`]: ChannelDetails::inbound_capacity_msat
	 */
	public get_unspendable_punishment_reserve(): bigint {
		const ret: bigint = bindings.ChannelCounterparty_get_unspendable_punishment_reserve(this.ptr);
		return ret;
	}

	/**
	 * The value, in satoshis, that must always be held in the channel for our counterparty. This
	 * value ensures that if our counterparty broadcasts a revoked state, we can punish them by
	 * claiming at least this value on chain.
	 * 
	 * This value is not included in [`inbound_capacity_msat`] as it can never be spent.
	 * 
	 * [`inbound_capacity_msat`]: ChannelDetails::inbound_capacity_msat
	 */
	public set_unspendable_punishment_reserve(val: bigint): void {
		bindings.ChannelCounterparty_set_unspendable_punishment_reserve(this.ptr, val);
	}

	/**
	 * Information on the fees and requirements that the counterparty requires when forwarding
	 * payments to us through this channel.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_forwarding_info(): CounterpartyForwardingInfo {
		const ret: bigint = bindings.ChannelCounterparty_get_forwarding_info(this.ptr);
		const ret_hu_conv: CounterpartyForwardingInfo = new CounterpartyForwardingInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Information on the fees and requirements that the counterparty requires when forwarding
	 * payments to us through this channel.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_forwarding_info(val: CounterpartyForwardingInfo|null): void {
		bindings.ChannelCounterparty_set_forwarding_info(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * The smallest value HTLC (in msat) the remote peer will accept, for this channel. This field
	 * is only `None` before we have received either the `OpenChannel` or `AcceptChannel` message
	 * from the remote peer, or for `ChannelCounterparty` objects serialized prior to LDK 0.0.107.
	 */
	public get_outbound_htlc_minimum_msat(): Option_u64Z {
		const ret: bigint = bindings.ChannelCounterparty_get_outbound_htlc_minimum_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The smallest value HTLC (in msat) the remote peer will accept, for this channel. This field
	 * is only `None` before we have received either the `OpenChannel` or `AcceptChannel` message
	 * from the remote peer, or for `ChannelCounterparty` objects serialized prior to LDK 0.0.107.
	 */
	public set_outbound_htlc_minimum_msat(val: Option_u64Z): void {
		bindings.ChannelCounterparty_set_outbound_htlc_minimum_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The largest value HTLC (in msat) the remote peer currently will accept, for this channel.
	 */
	public get_outbound_htlc_maximum_msat(): Option_u64Z {
		const ret: bigint = bindings.ChannelCounterparty_get_outbound_htlc_maximum_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The largest value HTLC (in msat) the remote peer currently will accept, for this channel.
	 */
	public set_outbound_htlc_maximum_msat(val: Option_u64Z): void {
		bindings.ChannelCounterparty_set_outbound_htlc_maximum_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelCounterparty given each field
	 * 
	 * Note that forwarding_info_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(node_id_arg: Uint8Array, features_arg: InitFeatures, unspendable_punishment_reserve_arg: bigint, forwarding_info_arg: CounterpartyForwardingInfo|null, outbound_htlc_minimum_msat_arg: Option_u64Z, outbound_htlc_maximum_msat_arg: Option_u64Z): ChannelCounterparty {
		const ret: bigint = bindings.ChannelCounterparty_new(bindings.encodeUint8Array(node_id_arg), CommonBase.get_ptr_of(features_arg), unspendable_punishment_reserve_arg, forwarding_info_arg == null ? 0n : CommonBase.get_ptr_of(forwarding_info_arg), CommonBase.get_ptr_of(outbound_htlc_minimum_msat_arg), CommonBase.get_ptr_of(outbound_htlc_maximum_msat_arg));
		const ret_hu_conv: ChannelCounterparty = new ChannelCounterparty(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelCounterparty_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelCounterparty
	 */
	public clone(): ChannelCounterparty {
		const ret: bigint = bindings.ChannelCounterparty_clone(this.ptr);
		const ret_hu_conv: ChannelCounterparty = new ChannelCounterparty(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelCounterparty object into a byte array which can be read by ChannelCounterparty_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelCounterparty_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelCounterparty from a byte array, created by ChannelCounterparty_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelCounterpartyDecodeErrorZ {
		const ret: bigint = bindings.ChannelCounterparty_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelCounterpartyDecodeErrorZ = Result_ChannelCounterpartyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
