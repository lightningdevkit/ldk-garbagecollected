
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A descriptor used to sign for a commitment transaction's HTLC output.
 */
export class HTLCDescriptor extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.HTLCDescriptor_free);
	}

	/**
	 * The parameters required to derive the signer for the HTLC input.
	 */
	public get_channel_derivation_parameters(): ChannelDerivationParameters {
		const ret: bigint = bindings.HTLCDescriptor_get_channel_derivation_parameters(this.ptr);
		const ret_hu_conv: ChannelDerivationParameters = new ChannelDerivationParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The parameters required to derive the signer for the HTLC input.
	 */
	public set_channel_derivation_parameters(val: ChannelDerivationParameters): void {
		bindings.HTLCDescriptor_set_channel_derivation_parameters(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The txid of the commitment transaction in which the HTLC output lives.
	 */
	public get_commitment_txid(): Uint8Array {
		const ret: number = bindings.HTLCDescriptor_get_commitment_txid(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The txid of the commitment transaction in which the HTLC output lives.
	 */
	public set_commitment_txid(val: Uint8Array): void {
		bindings.HTLCDescriptor_set_commitment_txid(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The number of the commitment transaction in which the HTLC output lives.
	 */
	public get_per_commitment_number(): bigint {
		const ret: bigint = bindings.HTLCDescriptor_get_per_commitment_number(this.ptr);
		return ret;
	}

	/**
	 * The number of the commitment transaction in which the HTLC output lives.
	 */
	public set_per_commitment_number(val: bigint): void {
		bindings.HTLCDescriptor_set_per_commitment_number(this.ptr, val);
	}

	/**
	 * The key tweak corresponding to the number of the commitment transaction in which the HTLC
	 * output lives. This tweak is applied to all the basepoints for both parties in the channel to
	 * arrive at unique keys per commitment.
	 * 
	 * See <https://github.com/lightning/bolts/blob/master/03-transactions.md#keys> for more info.
	 */
	public get_per_commitment_point(): Uint8Array {
		const ret: number = bindings.HTLCDescriptor_get_per_commitment_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The key tweak corresponding to the number of the commitment transaction in which the HTLC
	 * output lives. This tweak is applied to all the basepoints for both parties in the channel to
	 * arrive at unique keys per commitment.
	 * 
	 * See <https://github.com/lightning/bolts/blob/master/03-transactions.md#keys> for more info.
	 */
	public set_per_commitment_point(val: Uint8Array): void {
		bindings.HTLCDescriptor_set_per_commitment_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The feerate to use on the HTLC claiming transaction. This is always `0` for HTLCs
	 * originating from a channel supporting anchor outputs, otherwise it is the channel's
	 * negotiated feerate at the time the commitment transaction was built.
	 */
	public get_feerate_per_kw(): number {
		const ret: number = bindings.HTLCDescriptor_get_feerate_per_kw(this.ptr);
		return ret;
	}

	/**
	 * The feerate to use on the HTLC claiming transaction. This is always `0` for HTLCs
	 * originating from a channel supporting anchor outputs, otherwise it is the channel's
	 * negotiated feerate at the time the commitment transaction was built.
	 */
	public set_feerate_per_kw(val: number): void {
		bindings.HTLCDescriptor_set_feerate_per_kw(this.ptr, val);
	}

	/**
	 * The details of the HTLC as it appears in the commitment transaction.
	 */
	public get_htlc(): HTLCOutputInCommitment {
		const ret: bigint = bindings.HTLCDescriptor_get_htlc(this.ptr);
		const ret_hu_conv: HTLCOutputInCommitment = new HTLCOutputInCommitment(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The details of the HTLC as it appears in the commitment transaction.
	 */
	public set_htlc(val: HTLCOutputInCommitment): void {
		bindings.HTLCDescriptor_set_htlc(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The preimage, if `Some`, to claim the HTLC output with. If `None`, the timeout path must be
	 * taken.
	 */
	public get_preimage(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.HTLCDescriptor_get_preimage(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The preimage, if `Some`, to claim the HTLC output with. If `None`, the timeout path must be
	 * taken.
	 */
	public set_preimage(val: Option_ThirtyTwoBytesZ): void {
		bindings.HTLCDescriptor_set_preimage(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The counterparty's signature required to spend the HTLC output.
	 */
	public get_counterparty_sig(): Uint8Array {
		const ret: number = bindings.HTLCDescriptor_get_counterparty_sig(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The counterparty's signature required to spend the HTLC output.
	 */
	public set_counterparty_sig(val: Uint8Array): void {
		bindings.HTLCDescriptor_set_counterparty_sig(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new HTLCDescriptor given each field
	 */
	public static constructor_new(channel_derivation_parameters_arg: ChannelDerivationParameters, commitment_txid_arg: Uint8Array, per_commitment_number_arg: bigint, per_commitment_point_arg: Uint8Array, feerate_per_kw_arg: number, htlc_arg: HTLCOutputInCommitment, preimage_arg: Option_ThirtyTwoBytesZ, counterparty_sig_arg: Uint8Array): HTLCDescriptor {
		const ret: bigint = bindings.HTLCDescriptor_new(CommonBase.get_ptr_of(channel_derivation_parameters_arg), bindings.encodeUint8Array(commitment_txid_arg), per_commitment_number_arg, bindings.encodeUint8Array(per_commitment_point_arg), feerate_per_kw_arg, CommonBase.get_ptr_of(htlc_arg), CommonBase.get_ptr_of(preimage_arg), bindings.encodeUint8Array(counterparty_sig_arg));
		const ret_hu_conv: HTLCDescriptor = new HTLCDescriptor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HTLCDescriptor_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCDescriptor
	 */
	public clone(): HTLCDescriptor {
		const ret: bigint = bindings.HTLCDescriptor_clone(this.ptr);
		const ret_hu_conv: HTLCDescriptor = new HTLCDescriptor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: HTLCDescriptor): boolean {
		const ret: boolean = bindings.HTLCDescriptor_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the HTLCDescriptor object into a byte array which can be read by HTLCDescriptor_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.HTLCDescriptor_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HTLCDescriptor from a byte array, created by HTLCDescriptor_write
	 */
	public static constructor_read(ser: Uint8Array): Result_HTLCDescriptorDecodeErrorZ {
		const ret: bigint = bindings.HTLCDescriptor_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_HTLCDescriptorDecodeErrorZ = Result_HTLCDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the outpoint of the HTLC output in the commitment transaction. This is the outpoint
	 * being spent by the HTLC input in the HTLC transaction.
	 */
	public outpoint(): OutPoint {
		const ret: bigint = bindings.HTLCDescriptor_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the UTXO to be spent by the HTLC input, which can be obtained via
	 * [`Self::unsigned_tx_input`].
	 */
	public previous_utxo(): TxOut {
		const ret: bigint = bindings.HTLCDescriptor_previous_utxo(this.ptr);
		const ret_conv: TxOut = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the unsigned transaction input spending the HTLC output in the commitment
	 * transaction.
	 */
	public unsigned_tx_input(): TxIn {
		const ret: bigint = bindings.HTLCDescriptor_unsigned_tx_input(this.ptr);
		const ret_conv: TxIn = new TxIn(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the delayed output created as a result of spending the HTLC output in the commitment
	 * transaction.
	 */
	public tx_output(): TxOut {
		const ret: bigint = bindings.HTLCDescriptor_tx_output(this.ptr);
		const ret_conv: TxOut = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the witness script of the HTLC output in the commitment transaction.
	 */
	public witness_script(): Uint8Array {
		const ret: number = bindings.HTLCDescriptor_witness_script(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the fully signed witness required to spend the HTLC output in the commitment
	 * transaction.
	 */
	public tx_input_witness(signature: Uint8Array, witness_script: Uint8Array): Uint8Array {
		const ret: number = bindings.HTLCDescriptor_tx_input_witness(this.ptr, bindings.encodeUint8Array(signature), bindings.encodeUint8Array(witness_script));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
