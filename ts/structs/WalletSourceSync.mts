

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of WalletSourceSync */
export interface WalletSourceSyncInterface {
	/**Returns all UTXOs, with at least 1 confirmation each, that are available to spend.
	 */
	list_confirmed_utxos(): Result_CVec_UtxoZNoneZ;
	/**Returns a script to use for change above dust resulting from a successful coin selection
	 * attempt.
	 */
	get_change_script(): Result_CVec_u8ZNoneZ;
	/**Signs and provides the full [`TxIn::script_sig`] and [`TxIn::witness`] for all inputs within
	 * the transaction known to the wallet (i.e., any provided via
	 * [`WalletSource::list_confirmed_utxos`]).
	 * 
	 * If your wallet does not support signing PSBTs you can call `psbt.extract_tx()` to get the
	 * unsigned transaction and then sign it with your wallet.
	 * 
	 * [`TxIn::script_sig`]: bitcoin::TxIn::script_sig
	 * [`TxIn::witness`]: bitcoin::TxIn::witness
	 */
	sign_psbt(psbt: Uint8Array): Result_TransactionNoneZ;
}

class LDKWalletSourceSyncHolder {
	held: WalletSourceSync|null = null;
}

/**
 * An alternative to [`CoinSelectionSourceSync`] that can be implemented and used along
 * [`WalletSync`] to provide a default implementation to [`CoinSelectionSourceSync`].
 * 
 * For an asynchronous version of this trait, see [`WalletSource`].
 */
export class WalletSourceSync extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKWalletSourceSync|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.WalletSourceSync_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of WalletSourceSync from a given implementation */
	public static new_impl(arg: WalletSourceSyncInterface): WalletSourceSync {
		const impl_holder: LDKWalletSourceSyncHolder = new LDKWalletSourceSyncHolder();
		let structImplementation = {
			list_confirmed_utxos (): bigint {
				const ret: Result_CVec_UtxoZNoneZ = arg.list_confirmed_utxos();
				const result: bigint = ret.clone_ptr();
				return result;
			},
			get_change_script (): bigint {
				const ret: Result_CVec_u8ZNoneZ = arg.get_change_script();
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_psbt (psbt: number): bigint {
				const psbt_conv: Uint8Array = bindings.decodeUint8Array(psbt);
				const ret: Result_TransactionNoneZ = arg.sign_psbt(psbt_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKWalletSourceSync;
		const ptr_idx: [bigint, number] = bindings.LDKWalletSourceSync_new(structImplementation);

		impl_holder.held = new WalletSourceSync(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Returns all UTXOs, with at least 1 confirmation each, that are available to spend.
	 */
	public list_confirmed_utxos(): Result_CVec_UtxoZNoneZ {
		const ret: bigint = bindings.WalletSourceSync_list_confirmed_utxos(this.ptr);
		const ret_hu_conv: Result_CVec_UtxoZNoneZ = Result_CVec_UtxoZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns a script to use for change above dust resulting from a successful coin selection
	 * attempt.
	 */
	public get_change_script(): Result_CVec_u8ZNoneZ {
		const ret: bigint = bindings.WalletSourceSync_get_change_script(this.ptr);
		const ret_hu_conv: Result_CVec_u8ZNoneZ = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs and provides the full [`TxIn::script_sig`] and [`TxIn::witness`] for all inputs within
	 * the transaction known to the wallet (i.e., any provided via
	 * [`WalletSource::list_confirmed_utxos`]).
	 * 
	 * If your wallet does not support signing PSBTs you can call `psbt.extract_tx()` to get the
	 * unsigned transaction and then sign it with your wallet.
	 * 
	 * [`TxIn::script_sig`]: bitcoin::TxIn::script_sig
	 * [`TxIn::witness`]: bitcoin::TxIn::witness
	 */
	public sign_psbt(psbt: Uint8Array): Result_TransactionNoneZ {
		const ret: bigint = bindings.WalletSourceSync_sign_psbt(this.ptr, bindings.encodeUint8Array(psbt));
		const ret_hu_conv: Result_TransactionNoneZ = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
