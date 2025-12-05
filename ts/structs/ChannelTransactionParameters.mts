
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Per-channel data used to build transactions in conjunction with the per-commitment data (CommitmentTransaction).
 * The fields are organized by holder/counterparty.
 * 
 * Normally, this is converted to the broadcaster/countersignatory-organized DirectedChannelTransactionParameters
 * before use, via the as_holder_broadcastable and as_counterparty_broadcastable functions.
 */
export class ChannelTransactionParameters extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelTransactionParameters_free);
	}

	/**
	 * Holder public keys
	 */
	public get_holder_pubkeys(): ChannelPublicKeys {
		const ret: bigint = bindings.ChannelTransactionParameters_get_holder_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Holder public keys
	 */
	public set_holder_pubkeys(val: ChannelPublicKeys): void {
		bindings.ChannelTransactionParameters_set_holder_pubkeys(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The contest delay selected by the holder, which applies to counterparty-broadcast transactions
	 */
	public get_holder_selected_contest_delay(): number {
		const ret: number = bindings.ChannelTransactionParameters_get_holder_selected_contest_delay(this.ptr);
		return ret;
	}

	/**
	 * The contest delay selected by the holder, which applies to counterparty-broadcast transactions
	 */
	public set_holder_selected_contest_delay(val: number): void {
		bindings.ChannelTransactionParameters_set_holder_selected_contest_delay(this.ptr, val);
	}

	/**
	 * Whether the holder is the initiator of this channel.
	 * This is an input to the commitment number obscure factor computation.
	 */
	public get_is_outbound_from_holder(): boolean {
		const ret: boolean = bindings.ChannelTransactionParameters_get_is_outbound_from_holder(this.ptr);
		return ret;
	}

	/**
	 * Whether the holder is the initiator of this channel.
	 * This is an input to the commitment number obscure factor computation.
	 */
	public set_is_outbound_from_holder(val: boolean): void {
		bindings.ChannelTransactionParameters_set_is_outbound_from_holder(this.ptr, val);
	}

	/**
	 * The late-bound counterparty channel transaction parameters.
	 * These parameters are populated at the point in the protocol where the counterparty provides them.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_counterparty_parameters(): CounterpartyChannelTransactionParameters {
		const ret: bigint = bindings.ChannelTransactionParameters_get_counterparty_parameters(this.ptr);
		const ret_hu_conv: CounterpartyChannelTransactionParameters = new CounterpartyChannelTransactionParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The late-bound counterparty channel transaction parameters.
	 * These parameters are populated at the point in the protocol where the counterparty provides them.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_counterparty_parameters(val: CounterpartyChannelTransactionParameters|null): void {
		bindings.ChannelTransactionParameters_set_counterparty_parameters(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * The late-bound funding outpoint
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_funding_outpoint(): OutPoint {
		const ret: bigint = bindings.ChannelTransactionParameters_get_funding_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The late-bound funding outpoint
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_funding_outpoint(val: OutPoint|null): void {
		bindings.ChannelTransactionParameters_set_funding_outpoint(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * The parent funding txid for a channel that has been spliced.
	 * 
	 * If a channel was funded with transaction A, and later spliced with transaction B, this field
	 * tracks the txid of transaction A.
	 * 
	 * See [`compute_funding_key_tweak`] and [`ChannelSigner::new_funding_pubkey`] for more context
	 * on how this may be used.
	 * 
	 * [`compute_funding_key_tweak`]: crate::sign::compute_funding_key_tweak
	 * [`ChannelSigner::new_funding_pubkey`]: crate::sign::ChannelSigner::new_funding_pubkey
	 */
	public get_splice_parent_funding_txid(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.ChannelTransactionParameters_get_splice_parent_funding_txid(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The parent funding txid for a channel that has been spliced.
	 * 
	 * If a channel was funded with transaction A, and later spliced with transaction B, this field
	 * tracks the txid of transaction A.
	 * 
	 * See [`compute_funding_key_tweak`] and [`ChannelSigner::new_funding_pubkey`] for more context
	 * on how this may be used.
	 * 
	 * [`compute_funding_key_tweak`]: crate::sign::compute_funding_key_tweak
	 * [`ChannelSigner::new_funding_pubkey`]: crate::sign::ChannelSigner::new_funding_pubkey
	 */
	public set_splice_parent_funding_txid(val: Option_ThirtyTwoBytesZ): void {
		bindings.ChannelTransactionParameters_set_splice_parent_funding_txid(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * This channel's type, as negotiated during channel open. For old objects where this field
	 * wasn't serialized, it will default to static_remote_key at deserialization.
	 */
	public get_channel_type_features(): ChannelTypeFeatures {
		const ret: bigint = bindings.ChannelTransactionParameters_get_channel_type_features(this.ptr);
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * This channel's type, as negotiated during channel open. For old objects where this field
	 * wasn't serialized, it will default to static_remote_key at deserialization.
	 */
	public set_channel_type_features(val: ChannelTypeFeatures): void {
		bindings.ChannelTransactionParameters_set_channel_type_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The value locked in the channel, denominated in satoshis.
	 */
	public get_channel_value_satoshis(): bigint {
		const ret: bigint = bindings.ChannelTransactionParameters_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The value locked in the channel, denominated in satoshis.
	 */
	public set_channel_value_satoshis(val: bigint): void {
		bindings.ChannelTransactionParameters_set_channel_value_satoshis(this.ptr, val);
	}

	/**
	 * Constructs a new ChannelTransactionParameters given each field
	 * 
	 * Note that counterparty_parameters_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that funding_outpoint_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(holder_pubkeys_arg: ChannelPublicKeys, holder_selected_contest_delay_arg: number, is_outbound_from_holder_arg: boolean, counterparty_parameters_arg: CounterpartyChannelTransactionParameters|null, funding_outpoint_arg: OutPoint|null, splice_parent_funding_txid_arg: Option_ThirtyTwoBytesZ, channel_type_features_arg: ChannelTypeFeatures, channel_value_satoshis_arg: bigint): ChannelTransactionParameters {
		const ret: bigint = bindings.ChannelTransactionParameters_new(CommonBase.get_ptr_of(holder_pubkeys_arg), holder_selected_contest_delay_arg, is_outbound_from_holder_arg, counterparty_parameters_arg == null ? 0n : CommonBase.get_ptr_of(counterparty_parameters_arg), funding_outpoint_arg == null ? 0n : CommonBase.get_ptr_of(funding_outpoint_arg), CommonBase.get_ptr_of(splice_parent_funding_txid_arg), CommonBase.get_ptr_of(channel_type_features_arg), channel_value_satoshis_arg);
		const ret_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelTransactionParameters_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelTransactionParameters
	 */
	public clone(): ChannelTransactionParameters {
		const ret: bigint = bindings.ChannelTransactionParameters_clone(this.ptr);
		const ret_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelTransactionParameters.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ChannelTransactionParameters_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ChannelTransactionParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelTransactionParameters): boolean {
		const ret: boolean = bindings.ChannelTransactionParameters_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Whether the late bound parameters are populated.
	 */
	public is_populated(): boolean {
		const ret: boolean = bindings.ChannelTransactionParameters_is_populated(this.ptr);
		return ret;
	}

	/**
	 * Convert the holder/counterparty parameters to broadcaster/countersignatory-organized parameters,
	 * given that the holder is the broadcaster.
	 * 
	 * self.is_populated() must be true before calling this function.
	 */
	public as_holder_broadcastable(): DirectedChannelTransactionParameters {
		const ret: bigint = bindings.ChannelTransactionParameters_as_holder_broadcastable(this.ptr);
		const ret_hu_conv: DirectedChannelTransactionParameters = new DirectedChannelTransactionParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Convert the holder/counterparty parameters to broadcaster/countersignatory-organized parameters,
	 * given that the counterparty is the broadcaster.
	 * 
	 * self.is_populated() must be true before calling this function.
	 */
	public as_counterparty_broadcastable(): DirectedChannelTransactionParameters {
		const ret: bigint = bindings.ChannelTransactionParameters_as_counterparty_broadcastable(this.ptr);
		const ret_hu_conv: DirectedChannelTransactionParameters = new DirectedChannelTransactionParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the counterparty's pubkeys.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public counterparty_pubkeys(): ChannelPublicKeys {
		const ret: bigint = bindings.ChannelTransactionParameters_counterparty_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelTransactionParameters object into a byte array which can be read by ChannelTransactionParameters_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelTransactionParameters_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelTransactionParameters from a byte array, created by ChannelTransactionParameters_write
	 */
	public static constructor_read(ser: Uint8Array, arg: Option_u64Z): Result_ChannelTransactionParametersDecodeErrorZ {
		const ret: bigint = bindings.ChannelTransactionParameters_read(bindings.encodeUint8Array(ser), CommonBase.get_ptr_of(arg));
		const ret_hu_conv: Result_ChannelTransactionParametersDecodeErrorZ = Result_ChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
