
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Describes the necessary information to spend a spendable output.
 * 
 * When on-chain outputs are created by LDK (which our counterparty is not able to claim at any
 * point in the future) a [`SpendableOutputs`] event is generated which you must track and be able
 * to spend on-chain. The information needed to do this is provided in this enum, including the
 * outpoint describing which `txid` and output `index` is available, the full output which exists
 * at that `txid`/`index`, and any keys or other information required to sign.
 * 
 * [`SpendableOutputs`]: crate::events::Event::SpendableOutputs
 */
export class SpendableOutputDescriptor extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.SpendableOutputDescriptor_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): SpendableOutputDescriptor {
		const raw_ty: number = bindings.LDKSpendableOutputDescriptor_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SpendableOutputDescriptor_StaticOutput(ptr);
			case 1: return new SpendableOutputDescriptor_DelayedPaymentOutput(ptr);
			case 2: return new SpendableOutputDescriptor_StaticPaymentOutput(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SpendableOutputDescriptor_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SpendableOutputDescriptor
	 */
	public clone(): SpendableOutputDescriptor {
		const ret: bigint = bindings.SpendableOutputDescriptor_clone(this.ptr);
		const ret_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticOutput-variant SpendableOutputDescriptor
	 */
	public static constructor_static_output(outpoint: OutPoint, output: TxOut, channel_keys_id: Uint8Array): SpendableOutputDescriptor {
		const ret: bigint = bindings.SpendableOutputDescriptor_static_output(CommonBase.get_ptr_of(outpoint), CommonBase.get_ptr_of(output), bindings.encodeUint8Array(channel_keys_id));
		const ret_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DelayedPaymentOutput-variant SpendableOutputDescriptor
	 */
	public static constructor_delayed_payment_output(a: DelayedPaymentOutputDescriptor): SpendableOutputDescriptor {
		const ret: bigint = bindings.SpendableOutputDescriptor_delayed_payment_output(CommonBase.get_ptr_of(a));
		const ret_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticPaymentOutput-variant SpendableOutputDescriptor
	 */
	public static constructor_static_payment_output(a: StaticPaymentOutputDescriptor): SpendableOutputDescriptor {
		const ret: bigint = bindings.SpendableOutputDescriptor_static_payment_output(CommonBase.get_ptr_of(a));
		const ret_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the SpendableOutputDescriptor.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.SpendableOutputDescriptor_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two SpendableOutputDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: SpendableOutputDescriptor): boolean {
		const ret: boolean = bindings.SpendableOutputDescriptor_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the SpendableOutputDescriptor object into a byte array which can be read by SpendableOutputDescriptor_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.SpendableOutputDescriptor_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a SpendableOutputDescriptor from a byte array, created by SpendableOutputDescriptor_write
	 */
	public static constructor_read(ser: Uint8Array): Result_SpendableOutputDescriptorDecodeErrorZ {
		const ret: bigint = bindings.SpendableOutputDescriptor_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_SpendableOutputDescriptorDecodeErrorZ = Result_SpendableOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the outpoint of the spendable output.
	 */
	public spendable_outpoint(): OutPoint {
		const ret: bigint = bindings.SpendableOutputDescriptor_spendable_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A SpendableOutputDescriptor of type StaticOutput */
export class SpendableOutputDescriptor_StaticOutput extends SpendableOutputDescriptor {
	/**
	 * The outpoint which is spendable.
	 */
	public outpoint: OutPoint;
	/**
	 * The output which is referenced by the given outpoint.
	 */
	public output: TxOut;
	/**
	 * The `channel_keys_id` for the channel which this output came from.
	 * 
	 * For channels which were generated on LDK 0.0.119 or later, this is the value which was
	 * passed to the [`SignerProvider::get_destination_script`] call which provided this
	 * output script.
	 * 
	 * For channels which were generated prior to LDK 0.0.119, no such argument existed,
	 * however this field may still be filled in if such data is available.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public channel_keys_id: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const outpoint: bigint = bindings.LDKSpendableOutputDescriptor_StaticOutput_get_outpoint(ptr);
		const outpoint_hu_conv: OutPoint = new OutPoint(null, outpoint);
			CommonBase.add_ref_from(outpoint_hu_conv, this);
		this.outpoint = outpoint_hu_conv;
		const output: bigint = bindings.LDKSpendableOutputDescriptor_StaticOutput_get_output(ptr);
		const output_conv: TxOut = new TxOut(null, output);
		this.output = output_conv;
		const channel_keys_id: number = bindings.LDKSpendableOutputDescriptor_StaticOutput_get_channel_keys_id(ptr);
		const channel_keys_id_conv: Uint8Array = bindings.decodeUint8Array(channel_keys_id);
		this.channel_keys_id = channel_keys_id_conv;
	}
}
/** A SpendableOutputDescriptor of type DelayedPaymentOutput */
export class SpendableOutputDescriptor_DelayedPaymentOutput extends SpendableOutputDescriptor {
	public delayed_payment_output: DelayedPaymentOutputDescriptor;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const delayed_payment_output: bigint = bindings.LDKSpendableOutputDescriptor_DelayedPaymentOutput_get_delayed_payment_output(ptr);
		const delayed_payment_output_hu_conv: DelayedPaymentOutputDescriptor = new DelayedPaymentOutputDescriptor(null, delayed_payment_output);
			CommonBase.add_ref_from(delayed_payment_output_hu_conv, this);
		this.delayed_payment_output = delayed_payment_output_hu_conv;
	}
}
/** A SpendableOutputDescriptor of type StaticPaymentOutput */
export class SpendableOutputDescriptor_StaticPaymentOutput extends SpendableOutputDescriptor {
	public static_payment_output: StaticPaymentOutputDescriptor;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const static_payment_output: bigint = bindings.LDKSpendableOutputDescriptor_StaticPaymentOutput_get_static_payment_output(ptr);
		const static_payment_output_hu_conv: StaticPaymentOutputDescriptor = new StaticPaymentOutputDescriptor(null, static_payment_output);
			CommonBase.add_ref_from(static_payment_output_hu_conv, this);
		this.static_payment_output = static_payment_output_hu_conv;
	}
}
