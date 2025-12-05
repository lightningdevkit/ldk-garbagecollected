

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of WriteableScore */
export interface WriteableScoreInterface {
	/**Serialize the object into a byte array
	 */
	write(): Uint8Array;
}

class LDKWriteableScoreHolder {
	held: WriteableScore|null = null;
}

/**
 * Refers to a scorer that is accessible under lock and also writeable to disk
 * 
 * We need this trait to be able to pass in a scorer to `lightning-background-processor` that will enable us to
 * use the Persister to persist it.
 */
export class WriteableScore extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKWriteableScore|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.WriteableScore_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of WriteableScore from a given implementation */
	public static new_impl(arg: WriteableScoreInterface, lockableScore_impl: LockableScoreInterface): WriteableScore {
		const impl_holder: LDKWriteableScoreHolder = new LDKWriteableScoreHolder();
		let structImplementation = {
			write (): number {
				const ret: Uint8Array = arg.write();
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
		} as bindings.LDKWriteableScore;
		const lockableScore = LockableScore.new_impl(lockableScore_impl);
		const ptr_idx: [bigint, number] = bindings.LDKWriteableScore_new(structImplementation, lockableScore.instance_idx!);

		impl_holder.held = new WriteableScore(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		impl_holder.held.ptrs_to.push(lockableScore);
		return impl_holder.held!;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public write(): Uint8Array {
		const ret: number = bindings.WriteableScore_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
