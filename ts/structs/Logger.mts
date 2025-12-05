

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of Logger */
export interface LoggerInterface {
	/**Logs the [`Record`].
	 */
	log(record: Record): void;
}

class LDKLoggerHolder {
	held: Logger|null = null;
}

/**
 * A trait encapsulating the operations required of a logger.
 */
export class Logger extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKLogger|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Logger_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of Logger from a given implementation */
	public static new_impl(arg: LoggerInterface): Logger {
		const impl_holder: LDKLoggerHolder = new LDKLoggerHolder();
		let structImplementation = {
			log (record: bigint): void {
				const record_hu_conv: Record = new Record(null, record);
				CommonBase.add_ref_from(record_hu_conv, this);
				arg.log(record_hu_conv);
			},
		} as bindings.LDKLogger;
		const ptr_idx: [bigint, number] = bindings.LDKLogger_new(structImplementation);

		impl_holder.held = new Logger(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Logger_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of a Logger
	 */
	public clone(): Logger {
		const ret: bigint = bindings.Logger_clone(this.ptr);
		const ret_hu_conv: Logger = new Logger(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
