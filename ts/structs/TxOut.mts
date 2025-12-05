
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

export class TxOut extends CommonBase {
	/** The script_pubkey in this output */
	public script_pubkey: Uint8Array;
	/** The value, in satoshis, of this output */
	public value: bigint;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxOut_free);
		this.script_pubkey = bindings.decodeUint8Array(bindings.TxOut_get_script_pubkey(ptr));
		this.value = bindings.TxOut_get_value(ptr);
	}
	public static constructor_new(value: bigint, script_pubkey: Uint8Array): TxOut {
		return new TxOut(null, bindings.TxOut_new(bindings.encodeUint8Array(script_pubkey), value));
	}
}