
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An error occurring when converting from [`ScriptBuf`] to [`ShutdownScript`].
 */
export class InvalidShutdownScript extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.InvalidShutdownScript_free);
	}

	/**
	 * The script that did not meet the requirements from [BOLT #2].
	 * 
	 * [BOLT #2]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md
	 */
	public get_script(): Uint8Array {
		const ret: number = bindings.InvalidShutdownScript_get_script(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The script that did not meet the requirements from [BOLT #2].
	 * 
	 * [BOLT #2]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md
	 */
	public set_script(val: Uint8Array): void {
		bindings.InvalidShutdownScript_set_script(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new InvalidShutdownScript given each field
	 */
	public static constructor_new(script_arg: Uint8Array): InvalidShutdownScript {
		const ret: bigint = bindings.InvalidShutdownScript_new(bindings.encodeUint8Array(script_arg));
		const ret_hu_conv: InvalidShutdownScript = new InvalidShutdownScript(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.InvalidShutdownScript_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the InvalidShutdownScript
	 */
	public clone(): InvalidShutdownScript {
		const ret: bigint = bindings.InvalidShutdownScript_clone(this.ptr);
		const ret_hu_conv: InvalidShutdownScript = new InvalidShutdownScript(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
