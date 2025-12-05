

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of CoinSelectionSourceSync */
export interface CoinSelectionSourceSyncInterface {
	/**Performs coin selection of a set of UTXOs, with at least 1 confirmation each, that are
	 * available to spend. Implementations are free to pick their coin selection algorithm of
	 * choice, as long as the following requirements are met:
	 * 
	 * 1. `must_spend` contains a set of [`Input`]s that must be included in the transaction
	 * throughout coin selection, but must not be returned as part of the result.
	 * 2. `must_pay_to` contains a set of [`TxOut`]s that must be included in the transaction
	 * throughout coin selection. In some cases, like when funding an anchor transaction, this
	 * set is empty. Implementations should ensure they handle this correctly on their end,
	 * e.g., Bitcoin Core's `fundrawtransaction` RPC requires at least one output to be
	 * provided, in which case a zero-value empty OP_RETURN output can be used instead.
	 * 3. Enough inputs must be selected/contributed for the resulting transaction (including the
	 * inputs and outputs noted above) to meet `target_feerate_sat_per_1000_weight`.
	 * 4. The final transaction must have a weight smaller than `max_tx_weight`; if this
	 * constraint can't be met, return an `Err`. In the case of counterparty-signed HTLC
	 * transactions, we will remove a chunk of HTLCs and try your algorithm again. As for
	 * anchor transactions, we will try your coin selection again with the same input-output
	 * set when you call [`ChannelMonitor::rebroadcast_pending_claims`], as anchor transactions
	 * cannot be downsized.
	 * 
	 * Implementations must take note that [`Input::satisfaction_weight`] only tracks the weight of
	 * the input's `script_sig` and `witness`. Some wallets, like Bitcoin Core's, may require
	 * providing the full input weight. Failing to do so may lead to underestimating fee bumps and
	 * delaying block inclusion.
	 * 
	 * The `claim_id` must map to the set of external UTXOs assigned to the claim, such that they
	 * can be re-used within new fee-bumped iterations of the original claiming transaction,
	 * ensuring that claims don't double spend each other. If a specific `claim_id` has never had a
	 * transaction associated with it, and all of the available UTXOs have already been assigned to
	 * other claims, implementations must be willing to double spend their UTXOs. The choice of
	 * which UTXOs to double spend is left to the implementation, but it must strive to keep the
	 * set of other claims being double spent to a minimum.
	 * 
	 * [`ChannelMonitor::rebroadcast_pending_claims`]: crate::chain::channelmonitor::ChannelMonitor::rebroadcast_pending_claims
	 */
	select_confirmed_utxos(claim_id: Uint8Array, must_spend: Input[], must_pay_to: TxOut[], target_feerate_sat_per_1000_weight: number, max_tx_weight: bigint): Result_CoinSelectionNoneZ;
	/**Signs and provides the full witness for all inputs within the transaction known to the
	 * trait (i.e., any provided via [`CoinSelectionSourceSync::select_confirmed_utxos`]).
	 * 
	 * If your wallet does not support signing PSBTs you can call `psbt.extract_tx()` to get the
	 * unsigned transaction and then sign it with your wallet.
	 */
	sign_psbt(psbt: Uint8Array): Result_TransactionNoneZ;
}

class LDKCoinSelectionSourceSyncHolder {
	held: CoinSelectionSourceSync|null = null;
}

/**
 * An abstraction over a bitcoin wallet that can perform coin selection over a set of UTXOs and can
 * sign for them. The coin selection method aims to mimic Bitcoin Core's `fundrawtransaction` RPC,
 * which most wallets should be able to satisfy. Otherwise, consider implementing
 * [`WalletSourceSync`], which can provide a default implementation of this trait when used with
 * [`WalletSync`].
 * 
 * For an asynchronous version of this trait, see [`CoinSelectionSource`].
 */
export class CoinSelectionSourceSync extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKCoinSelectionSourceSync|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CoinSelectionSourceSync_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of CoinSelectionSourceSync from a given implementation */
	public static new_impl(arg: CoinSelectionSourceSyncInterface): CoinSelectionSourceSync {
		const impl_holder: LDKCoinSelectionSourceSyncHolder = new LDKCoinSelectionSourceSyncHolder();
		let structImplementation = {
			select_confirmed_utxos (claim_id: number, must_spend: number, must_pay_to: number, target_feerate_sat_per_1000_weight: number, max_tx_weight: bigint): bigint {
				const claim_id_conv: Uint8Array = bindings.decodeUint8Array(claim_id);
				const must_spend_conv_7_len: number = bindings.getArrayLength(must_spend);
				const must_spend_conv_7_arr: Input[] = new Array(must_spend_conv_7_len).fill(null);
				for (var h = 0; h < must_spend_conv_7_len; h++) {
					const must_spend_conv_7: bigint = bindings.getU64ArrayElem(must_spend, h);
					const must_spend_conv_7_hu_conv: Input = new Input(null, must_spend_conv_7);
					CommonBase.add_ref_from(must_spend_conv_7_hu_conv, this);
					must_spend_conv_7_arr[h] = must_spend_conv_7_hu_conv;
				}
				bindings.freeWasmMemory(must_spend)
				const must_pay_to_conv_7_len: number = bindings.getArrayLength(must_pay_to);
				const must_pay_to_conv_7_arr: TxOut[] = new Array(must_pay_to_conv_7_len).fill(null);
				for (var h = 0; h < must_pay_to_conv_7_len; h++) {
					const must_pay_to_conv_7: bigint = bindings.getU64ArrayElem(must_pay_to, h);
					const must_pay_to_conv_7_conv: TxOut = new TxOut(null, must_pay_to_conv_7);
					must_pay_to_conv_7_arr[h] = must_pay_to_conv_7_conv;
				}
				bindings.freeWasmMemory(must_pay_to)
				const ret: Result_CoinSelectionNoneZ = arg.select_confirmed_utxos(claim_id_conv, must_spend_conv_7_arr, must_pay_to_conv_7_arr, target_feerate_sat_per_1000_weight, max_tx_weight);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_psbt (psbt: number): bigint {
				const psbt_conv: Uint8Array = bindings.decodeUint8Array(psbt);
				const ret: Result_TransactionNoneZ = arg.sign_psbt(psbt_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKCoinSelectionSourceSync;
		const ptr_idx: [bigint, number] = bindings.LDKCoinSelectionSourceSync_new(structImplementation);

		impl_holder.held = new CoinSelectionSourceSync(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Performs coin selection of a set of UTXOs, with at least 1 confirmation each, that are
	 * available to spend. Implementations are free to pick their coin selection algorithm of
	 * choice, as long as the following requirements are met:
	 * 
	 * 1. `must_spend` contains a set of [`Input`]s that must be included in the transaction
	 * throughout coin selection, but must not be returned as part of the result.
	 * 2. `must_pay_to` contains a set of [`TxOut`]s that must be included in the transaction
	 * throughout coin selection. In some cases, like when funding an anchor transaction, this
	 * set is empty. Implementations should ensure they handle this correctly on their end,
	 * e.g., Bitcoin Core's `fundrawtransaction` RPC requires at least one output to be
	 * provided, in which case a zero-value empty OP_RETURN output can be used instead.
	 * 3. Enough inputs must be selected/contributed for the resulting transaction (including the
	 * inputs and outputs noted above) to meet `target_feerate_sat_per_1000_weight`.
	 * 4. The final transaction must have a weight smaller than `max_tx_weight`; if this
	 * constraint can't be met, return an `Err`. In the case of counterparty-signed HTLC
	 * transactions, we will remove a chunk of HTLCs and try your algorithm again. As for
	 * anchor transactions, we will try your coin selection again with the same input-output
	 * set when you call [`ChannelMonitor::rebroadcast_pending_claims`], as anchor transactions
	 * cannot be downsized.
	 * 
	 * Implementations must take note that [`Input::satisfaction_weight`] only tracks the weight of
	 * the input's `script_sig` and `witness`. Some wallets, like Bitcoin Core's, may require
	 * providing the full input weight. Failing to do so may lead to underestimating fee bumps and
	 * delaying block inclusion.
	 * 
	 * The `claim_id` must map to the set of external UTXOs assigned to the claim, such that they
	 * can be re-used within new fee-bumped iterations of the original claiming transaction,
	 * ensuring that claims don't double spend each other. If a specific `claim_id` has never had a
	 * transaction associated with it, and all of the available UTXOs have already been assigned to
	 * other claims, implementations must be willing to double spend their UTXOs. The choice of
	 * which UTXOs to double spend is left to the implementation, but it must strive to keep the
	 * set of other claims being double spent to a minimum.
	 * 
	 * [`ChannelMonitor::rebroadcast_pending_claims`]: crate::chain::channelmonitor::ChannelMonitor::rebroadcast_pending_claims
	 */
	public select_confirmed_utxos(claim_id: Uint8Array, must_spend: Input[], must_pay_to: TxOut[], target_feerate_sat_per_1000_weight: number, max_tx_weight: bigint): Result_CoinSelectionNoneZ {
		const ret: bigint = bindings.CoinSelectionSourceSync_select_confirmed_utxos(this.ptr, bindings.encodeUint8Array(claim_id), bindings.encodeUint64Array(must_spend.map(must_spend_conv_7 => CommonBase.get_ptr_of(must_spend_conv_7))), bindings.encodeUint64Array(must_pay_to.map(must_pay_to_conv_7 => CommonBase.get_ptr_of(must_pay_to_conv_7))), target_feerate_sat_per_1000_weight, max_tx_weight);
		const ret_hu_conv: Result_CoinSelectionNoneZ = Result_CoinSelectionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs and provides the full witness for all inputs within the transaction known to the
	 * trait (i.e., any provided via [`CoinSelectionSourceSync::select_confirmed_utxos`]).
	 * 
	 * If your wallet does not support signing PSBTs you can call `psbt.extract_tx()` to get the
	 * unsigned transaction and then sign it with your wallet.
	 */
	public sign_psbt(psbt: Uint8Array): Result_TransactionNoneZ {
		const ret: bigint = bindings.CoinSelectionSourceSync_sign_psbt(this.ptr, bindings.encodeUint8Array(psbt));
		const ret_hu_conv: Result_TransactionNoneZ = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
