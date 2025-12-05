
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A handler for [`Event::BumpTransaction`] events that sources confirmed UTXOs from a
 * [`CoinSelectionSourceSync`] to fee bump transactions via Child-Pays-For-Parent (CPFP) or
 * Replace-By-Fee (RBF).
 * 
 * For an asynchronous version of this handler, see [`BumpTransactionEventHandler`].
 * 
 * [`Event::BumpTransaction`]: crate::events::Event::BumpTransaction
 */
export class BumpTransactionEventHandlerSync extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BumpTransactionEventHandlerSync_free);
	}

	/**
	 * Constructs a new instance of [`BumpTransactionEventHandlerSync`].
	 */
	public static constructor_new(broadcaster: BroadcasterInterface, utxo_source: CoinSelectionSourceSync, signer_provider: SignerProvider, logger: Logger): BumpTransactionEventHandlerSync {
		const ret: bigint = bindings.BumpTransactionEventHandlerSync_new(CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(utxo_source), CommonBase.get_ptr_of(signer_provider), CommonBase.get_ptr_of(logger));
		const ret_hu_conv: BumpTransactionEventHandlerSync = new BumpTransactionEventHandlerSync(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, utxo_source);
		CommonBase.add_ref_from(ret_hu_conv, signer_provider);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * Handles all variants of [`BumpTransactionEvent`].
	 */
	public handle_event(event: BumpTransactionEvent): void {
		bindings.BumpTransactionEventHandlerSync_handle_event(this.ptr, CommonBase.get_ptr_of(event));
	}

}
