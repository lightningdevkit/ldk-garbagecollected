
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The state of a spendable output currently tracked by an [`OutputSweeper`].
 */
export class TrackedSpendableOutput extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TrackedSpendableOutput_free);
	}

	/**
	 * The tracked output descriptor.
	 */
	public get_descriptor(): SpendableOutputDescriptor {
		const ret: bigint = bindings.TrackedSpendableOutput_get_descriptor(this.ptr);
		const ret_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The tracked output descriptor.
	 */
	public set_descriptor(val: SpendableOutputDescriptor): void {
		bindings.TrackedSpendableOutput_set_descriptor(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The channel this output belongs to.
	 * 
	 * Will be `None` if no `channel_id` was given to [`OutputSweeper::track_spendable_outputs`]
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.TrackedSpendableOutput_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel this output belongs to.
	 * 
	 * Will be `None` if no `channel_id` was given to [`OutputSweeper::track_spendable_outputs`]
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_channel_id(val: ChannelId|null): void {
		bindings.TrackedSpendableOutput_set_channel_id(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * The current status of the output spend.
	 */
	public get_status(): OutputSpendStatus {
		const ret: bigint = bindings.TrackedSpendableOutput_get_status(this.ptr);
		const ret_hu_conv: OutputSpendStatus = OutputSpendStatus.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The current status of the output spend.
	 */
	public set_status(val: OutputSpendStatus): void {
		bindings.TrackedSpendableOutput_set_status(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new TrackedSpendableOutput given each field
	 * 
	 * Note that channel_id_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(descriptor_arg: SpendableOutputDescriptor, channel_id_arg: ChannelId|null, status_arg: OutputSpendStatus): TrackedSpendableOutput {
		const ret: bigint = bindings.TrackedSpendableOutput_new(CommonBase.get_ptr_of(descriptor_arg), channel_id_arg == null ? 0n : CommonBase.get_ptr_of(channel_id_arg), CommonBase.get_ptr_of(status_arg));
		const ret_hu_conv: TrackedSpendableOutput = new TrackedSpendableOutput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TrackedSpendableOutput_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TrackedSpendableOutput
	 */
	public clone(): TrackedSpendableOutput {
		const ret: bigint = bindings.TrackedSpendableOutput_clone(this.ptr);
		const ret_hu_conv: TrackedSpendableOutput = new TrackedSpendableOutput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two TrackedSpendableOutputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TrackedSpendableOutput): boolean {
		const ret: boolean = bindings.TrackedSpendableOutput_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Returns whether the output is spent in the given transaction.
	 */
	public is_spent_in(tx: Uint8Array): boolean {
		const ret: boolean = bindings.TrackedSpendableOutput_is_spent_in(this.ptr, bindings.encodeUint8Array(tx));
		return ret;
	}

	/**
	 * Serialize the TrackedSpendableOutput object into a byte array which can be read by TrackedSpendableOutput_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TrackedSpendableOutput_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TrackedSpendableOutput from a byte array, created by TrackedSpendableOutput_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TrackedSpendableOutputDecodeErrorZ {
		const ret: bigint = bindings.TrackedSpendableOutput_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TrackedSpendableOutputDecodeErrorZ = Result_TrackedSpendableOutputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
