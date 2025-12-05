
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A wrapper over [`WalletSourceSync`] that implements [`CoinSelectionSourceSync`] by preferring
 * UTXOs that would avoid conflicting double spends. If not enough UTXOs are available to do so,
 * conflicting double spends may happen.
 * 
 * For an asynchronous version of this wrapper, see [`Wallet`].
 */
export class WalletSync extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.WalletSync_free);
	}

	/**
	 * Constructs a new [`WalletSync`] instance.
	 */
	public static constructor_new(source: WalletSourceSync, logger: Logger): WalletSync {
		const ret: bigint = bindings.WalletSync_new(CommonBase.get_ptr_of(source), CommonBase.get_ptr_of(logger));
		const ret_hu_conv: WalletSync = new WalletSync(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, source);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CoinSelectionSourceSync which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CoinSelectionSourceSync must be freed before this_arg is
	 */
	public as_CoinSelectionSourceSync(): CoinSelectionSourceSync {
		const ret: bigint = bindings.WalletSync_as_CoinSelectionSourceSync(this.ptr);
		const ret_hu_conv: CoinSelectionSourceSync = new CoinSelectionSourceSync(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
