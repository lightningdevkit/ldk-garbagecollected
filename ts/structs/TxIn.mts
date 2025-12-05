
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

export class TxIn extends CommonBase {
	/** The witness in this input, in serialized form */
	public witness: Uint8Array;
	/** The script_sig in this input */
	public script_sig: Uint8Array;
	/** The transaction output's sequence number */
	public sequence: number;
	/** The txid this input is spending */
	public previous_txid: Uint8Array;
	/** The output index within the spent transaction of the output this input is spending */
	public previous_vout: number;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxIn_free);
		this.witness = bindings.decodeUint8Array(bindings.TxIn_get_witness(ptr));
		this.script_sig = bindings.decodeUint8Array(bindings.TxIn_get_script_sig(ptr));
		this.sequence = bindings.TxIn_get_sequence(ptr);
		this.previous_txid = bindings.decodeUint8Array(bindings.TxIn_get_previous_txid(ptr));
		this.previous_vout = bindings.TxIn_get_previous_vout(ptr);
	}
    public static constructor_new(witness: Uint8Array, script_sig: Uint8Array, sequence: number, previous_txid: Uint8Array, previous_vout: number): TxIn {
		return new TxIn(null, bindings.TxIn_new(bindings.encodeUint8Array(witness), bindings.encodeUint8Array(script_sig), sequence, bindings.encodeUint8Array(previous_txid), previous_vout));
	}
}