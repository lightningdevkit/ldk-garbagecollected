
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A descriptor used to sign for a commitment transaction's anchor output.
 */
export class AnchorDescriptor extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.AnchorDescriptor_free);
	}

	/**
	 * The parameters required to derive the signer for the anchor input.
	 */
	public get_channel_derivation_parameters(): ChannelDerivationParameters {
		const ret: bigint = bindings.AnchorDescriptor_get_channel_derivation_parameters(this.ptr);
		const ret_hu_conv: ChannelDerivationParameters = new ChannelDerivationParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The parameters required to derive the signer for the anchor input.
	 */
	public set_channel_derivation_parameters(val: ChannelDerivationParameters): void {
		bindings.AnchorDescriptor_set_channel_derivation_parameters(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The transaction input's outpoint corresponding to the commitment transaction's anchor
	 * output.
	 */
	public get_outpoint(): OutPoint {
		const ret: bigint = bindings.AnchorDescriptor_get_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The transaction input's outpoint corresponding to the commitment transaction's anchor
	 * output.
	 */
	public set_outpoint(val: OutPoint): void {
		bindings.AnchorDescriptor_set_outpoint(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Zero-fee-commitment anchors have variable value, which is tracked here.
	 */
	public get_value(): bigint {
		const ret: bigint = bindings.AnchorDescriptor_get_value(this.ptr);
		return ret;
	}

	/**
	 * Zero-fee-commitment anchors have variable value, which is tracked here.
	 */
	public set_value(val: bigint): void {
		bindings.AnchorDescriptor_set_value(this.ptr, val);
	}

	/**
	 * Constructs a new AnchorDescriptor given each field
	 */
	public static constructor_new(channel_derivation_parameters_arg: ChannelDerivationParameters, outpoint_arg: OutPoint, value_arg: bigint): AnchorDescriptor {
		const ret: bigint = bindings.AnchorDescriptor_new(CommonBase.get_ptr_of(channel_derivation_parameters_arg), CommonBase.get_ptr_of(outpoint_arg), value_arg);
		const ret_hu_conv: AnchorDescriptor = new AnchorDescriptor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.AnchorDescriptor_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the AnchorDescriptor
	 */
	public clone(): AnchorDescriptor {
		const ret: bigint = bindings.AnchorDescriptor_clone(this.ptr);
		const ret_hu_conv: AnchorDescriptor = new AnchorDescriptor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two AnchorDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: AnchorDescriptor): boolean {
		const ret: boolean = bindings.AnchorDescriptor_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Returns the UTXO to be spent by the anchor input, which can be obtained via
	 * [`Self::unsigned_tx_input`].
	 */
	public previous_utxo(): TxOut {
		const ret: bigint = bindings.AnchorDescriptor_previous_utxo(this.ptr);
		const ret_conv: TxOut = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the unsigned transaction input spending the anchor output in the commitment
	 * transaction.
	 */
	public unsigned_tx_input(): TxIn {
		const ret: bigint = bindings.AnchorDescriptor_unsigned_tx_input(this.ptr);
		const ret_conv: TxIn = new TxIn(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the fully signed witness required to spend the anchor output in the commitment
	 * transaction.
	 */
	public tx_input_witness(signature: Uint8Array): Uint8Array {
		const ret: number = bindings.AnchorDescriptor_tx_input_witness(this.ptr, bindings.encodeUint8Array(signature));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
