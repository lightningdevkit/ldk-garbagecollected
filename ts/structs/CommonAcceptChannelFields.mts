
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Contains fields that are both common to [`accept_channel`] and [`accept_channel2`] messages.
 * 
 * [`accept_channel`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-accept_channel-message
 * [`accept_channel2`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-accept_channel2-message
 */
export class CommonAcceptChannelFields extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CommonAcceptChannelFields_free);
	}

	/**
	 * The same `temporary_channel_id` received from the initiator's `open_channel2` or `open_channel` message.
	 */
	public get_temporary_channel_id(): ChannelId {
		const ret: bigint = bindings.CommonAcceptChannelFields_get_temporary_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The same `temporary_channel_id` received from the initiator's `open_channel2` or `open_channel` message.
	 */
	public set_temporary_channel_id(val: ChannelId): void {
		bindings.CommonAcceptChannelFields_set_temporary_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel acceptor will be
	 * omitted
	 */
	public get_dust_limit_satoshis(): bigint {
		const ret: bigint = bindings.CommonAcceptChannelFields_get_dust_limit_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel acceptor will be
	 * omitted
	 */
	public set_dust_limit_satoshis(val: bigint): void {
		bindings.CommonAcceptChannelFields_set_dust_limit_satoshis(this.ptr, val);
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public get_max_htlc_value_in_flight_msat(): bigint {
		const ret: bigint = bindings.CommonAcceptChannelFields_get_max_htlc_value_in_flight_msat(this.ptr);
		return ret;
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public set_max_htlc_value_in_flight_msat(val: bigint): void {
		bindings.CommonAcceptChannelFields_set_max_htlc_value_in_flight_msat(this.ptr, val);
	}

	/**
	 * The minimum HTLC size incoming to channel acceptor, in milli-satoshi
	 */
	public get_htlc_minimum_msat(): bigint {
		const ret: bigint = bindings.CommonAcceptChannelFields_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * The minimum HTLC size incoming to channel acceptor, in milli-satoshi
	 */
	public set_htlc_minimum_msat(val: bigint): void {
		bindings.CommonAcceptChannelFields_set_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * Minimum depth of the funding transaction before the channel is considered open
	 */
	public get_minimum_depth(): number {
		const ret: number = bindings.CommonAcceptChannelFields_get_minimum_depth(this.ptr);
		return ret;
	}

	/**
	 * Minimum depth of the funding transaction before the channel is considered open
	 */
	public set_minimum_depth(val: number): void {
		bindings.CommonAcceptChannelFields_set_minimum_depth(this.ptr, val);
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they
	 * broadcast a commitment transaction
	 */
	public get_to_self_delay(): number {
		const ret: number = bindings.CommonAcceptChannelFields_get_to_self_delay(this.ptr);
		return ret;
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they
	 * broadcast a commitment transaction
	 */
	public set_to_self_delay(val: number): void {
		bindings.CommonAcceptChannelFields_set_to_self_delay(this.ptr, val);
	}

	/**
	 * The maximum number of inbound HTLCs towards channel acceptor
	 */
	public get_max_accepted_htlcs(): number {
		const ret: number = bindings.CommonAcceptChannelFields_get_max_accepted_htlcs(this.ptr);
		return ret;
	}

	/**
	 * The maximum number of inbound HTLCs towards channel acceptor
	 */
	public set_max_accepted_htlcs(val: number): void {
		bindings.CommonAcceptChannelFields_set_max_accepted_htlcs(this.ptr, val);
	}

	/**
	 * The channel acceptor's key controlling the funding transaction
	 */
	public get_funding_pubkey(): Uint8Array {
		const ret: number = bindings.CommonAcceptChannelFields_get_funding_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The channel acceptor's key controlling the funding transaction
	 */
	public set_funding_pubkey(val: Uint8Array): void {
		bindings.CommonAcceptChannelFields_set_funding_pubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public get_revocation_basepoint(): Uint8Array {
		const ret: number = bindings.CommonAcceptChannelFields_get_revocation_basepoint(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public set_revocation_basepoint(val: Uint8Array): void {
		bindings.CommonAcceptChannelFields_set_revocation_basepoint(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * A payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public get_payment_basepoint(): Uint8Array {
		const ret: number = bindings.CommonAcceptChannelFields_get_payment_basepoint(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public set_payment_basepoint(val: Uint8Array): void {
		bindings.CommonAcceptChannelFields_set_payment_basepoint(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Used to derive a payment key to channel acceptor for transactions broadcast by channel
	 * acceptor
	 */
	public get_delayed_payment_basepoint(): Uint8Array {
		const ret: number = bindings.CommonAcceptChannelFields_get_delayed_payment_basepoint(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Used to derive a payment key to channel acceptor for transactions broadcast by channel
	 * acceptor
	 */
	public set_delayed_payment_basepoint(val: Uint8Array): void {
		bindings.CommonAcceptChannelFields_set_delayed_payment_basepoint(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Used to derive an HTLC payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public get_htlc_basepoint(): Uint8Array {
		const ret: number = bindings.CommonAcceptChannelFields_get_htlc_basepoint(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Used to derive an HTLC payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public set_htlc_basepoint(val: Uint8Array): void {
		bindings.CommonAcceptChannelFields_set_htlc_basepoint(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The first to-be-broadcast-by-channel-acceptor transaction's per commitment point
	 */
	public get_first_per_commitment_point(): Uint8Array {
		const ret: number = bindings.CommonAcceptChannelFields_get_first_per_commitment_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The first to-be-broadcast-by-channel-acceptor transaction's per commitment point
	 */
	public set_first_per_commitment_point(val: Uint8Array): void {
		bindings.CommonAcceptChannelFields_set_first_per_commitment_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Optionally, a request to pre-set the to-channel-acceptor output's scriptPubkey for when we
	 * collaboratively close
	 */
	public get_shutdown_scriptpubkey(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.CommonAcceptChannelFields_get_shutdown_scriptpubkey(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Optionally, a request to pre-set the to-channel-acceptor output's scriptPubkey for when we
	 * collaboratively close
	 */
	public set_shutdown_scriptpubkey(val: Option_CVec_u8ZZ): void {
		bindings.CommonAcceptChannelFields_set_shutdown_scriptpubkey(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The channel type that this channel will represent. As defined in the latest
	 * specification, this field is required. However, it is an `Option` for legacy reasons.
	 * 
	 * This is required to match the equivalent field in [`OpenChannel`] or [`OpenChannelV2`]'s
	 * [`CommonOpenChannelFields::channel_type`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_channel_type(): ChannelTypeFeatures {
		const ret: bigint = bindings.CommonAcceptChannelFields_get_channel_type(this.ptr);
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel type that this channel will represent. As defined in the latest
	 * specification, this field is required. However, it is an `Option` for legacy reasons.
	 * 
	 * This is required to match the equivalent field in [`OpenChannel`] or [`OpenChannelV2`]'s
	 * [`CommonOpenChannelFields::channel_type`].
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_channel_type(val: ChannelTypeFeatures|null): void {
		bindings.CommonAcceptChannelFields_set_channel_type(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new CommonAcceptChannelFields given each field
	 * 
	 * Note that channel_type_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(temporary_channel_id_arg: ChannelId, dust_limit_satoshis_arg: bigint, max_htlc_value_in_flight_msat_arg: bigint, htlc_minimum_msat_arg: bigint, minimum_depth_arg: number, to_self_delay_arg: number, max_accepted_htlcs_arg: number, funding_pubkey_arg: Uint8Array, revocation_basepoint_arg: Uint8Array, payment_basepoint_arg: Uint8Array, delayed_payment_basepoint_arg: Uint8Array, htlc_basepoint_arg: Uint8Array, first_per_commitment_point_arg: Uint8Array, shutdown_scriptpubkey_arg: Option_CVec_u8ZZ, channel_type_arg: ChannelTypeFeatures|null): CommonAcceptChannelFields {
		const ret: bigint = bindings.CommonAcceptChannelFields_new(CommonBase.get_ptr_of(temporary_channel_id_arg), dust_limit_satoshis_arg, max_htlc_value_in_flight_msat_arg, htlc_minimum_msat_arg, minimum_depth_arg, to_self_delay_arg, max_accepted_htlcs_arg, bindings.encodeUint8Array(funding_pubkey_arg), bindings.encodeUint8Array(revocation_basepoint_arg), bindings.encodeUint8Array(payment_basepoint_arg), bindings.encodeUint8Array(delayed_payment_basepoint_arg), bindings.encodeUint8Array(htlc_basepoint_arg), bindings.encodeUint8Array(first_per_commitment_point_arg), CommonBase.get_ptr_of(shutdown_scriptpubkey_arg), channel_type_arg == null ? 0n : CommonBase.get_ptr_of(channel_type_arg));
		const ret_hu_conv: CommonAcceptChannelFields = new CommonAcceptChannelFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CommonAcceptChannelFields_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CommonAcceptChannelFields
	 */
	public clone(): CommonAcceptChannelFields {
		const ret: bigint = bindings.CommonAcceptChannelFields_clone(this.ptr);
		const ret_hu_conv: CommonAcceptChannelFields = new CommonAcceptChannelFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the CommonAcceptChannelFields.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.CommonAcceptChannelFields_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two CommonAcceptChannelFieldss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: CommonAcceptChannelFields): boolean {
		const ret: boolean = bindings.CommonAcceptChannelFields_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
