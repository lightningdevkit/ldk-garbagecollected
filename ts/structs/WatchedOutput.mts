
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A transaction output watched by a [`ChannelMonitor`] for spends on-chain.
 * 
 * Used to convey to a [`Filter`] such an output with a given spending condition. Any transaction
 * spending the output must be given to [`ChannelMonitor::block_connected`] either directly or via
 * [`Confirm::transactions_confirmed`].
 * 
 * If `block_hash` is `Some`, this indicates the output was created in the corresponding block and
 * may have been spent there. See [`Filter::register_output`] for details.
 * 
 * Depending on your block source, you may need one or both of either [`Self::outpoint`] or
 * [`Self::script_pubkey`].
 * 
 * [`ChannelMonitor`]: channelmonitor::ChannelMonitor
 * [`ChannelMonitor::block_connected`]: channelmonitor::ChannelMonitor::block_connected
 */
export class WatchedOutput extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.WatchedOutput_free);
	}

	/**
	 * First block where the transaction output may have been spent.
	 */
	public get_block_hash(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.WatchedOutput_get_block_hash(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * First block where the transaction output may have been spent.
	 */
	public set_block_hash(val: Option_ThirtyTwoBytesZ): void {
		bindings.WatchedOutput_set_block_hash(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Outpoint identifying the transaction output.
	 */
	public get_outpoint(): OutPoint {
		const ret: bigint = bindings.WatchedOutput_get_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Outpoint identifying the transaction output.
	 */
	public set_outpoint(val: OutPoint): void {
		bindings.WatchedOutput_set_outpoint(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Spending condition of the transaction output.
	 */
	public get_script_pubkey(): Uint8Array {
		const ret: number = bindings.WatchedOutput_get_script_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Spending condition of the transaction output.
	 */
	public set_script_pubkey(val: Uint8Array): void {
		bindings.WatchedOutput_set_script_pubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new WatchedOutput given each field
	 */
	public static constructor_new(block_hash_arg: Option_ThirtyTwoBytesZ, outpoint_arg: OutPoint, script_pubkey_arg: Uint8Array): WatchedOutput {
		const ret: bigint = bindings.WatchedOutput_new(CommonBase.get_ptr_of(block_hash_arg), CommonBase.get_ptr_of(outpoint_arg), bindings.encodeUint8Array(script_pubkey_arg));
		const ret_hu_conv: WatchedOutput = new WatchedOutput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.WatchedOutput_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the WatchedOutput
	 */
	public clone(): WatchedOutput {
		const ret: bigint = bindings.WatchedOutput_clone(this.ptr);
		const ret_hu_conv: WatchedOutput = new WatchedOutput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two WatchedOutputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: WatchedOutput): boolean {
		const ret: boolean = bindings.WatchedOutput_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the WatchedOutput.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.WatchedOutput_hash(this.ptr);
		return ret;
	}

}
