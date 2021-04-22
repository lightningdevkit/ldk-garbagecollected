package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * An implementation of [`chain::Watch`] for monitoring channels.
 * 
 * Connected and disconnected blocks must be provided to `ChainMonitor` as documented by
 * [`chain::Watch`]. May be used in conjunction with [`ChannelManager`] to monitor channels locally
 * or used independently to monitor channels remotely. See the [module-level documentation] for
 * details.
 * 
 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
 * [module-level documentation]: crate::chain::chainmonitor
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChainMonitor extends CommonBase {
	ChainMonitor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChainMonitor_free(ptr); }
	}

	/**
	 * Dispatches to per-channel monitors, which are responsible for updating their on-chain view
	 * of a channel and reacting accordingly based on transactions in the connected block. See
	 * [`ChannelMonitor::block_connected`] for details. Any HTLCs that were resolved on chain will
	 * be returned by [`chain::Watch::release_pending_monitor_events`].
	 * 
	 * Calls back to [`chain::Filter`] if any monitor indicated new outputs to watch. Subsequent
	 * calls must not exclude any transactions matching the new outputs nor any in-block
	 * descendants of such transactions. It is not necessary to re-fetch the block to obtain
	 * updated `txdata`.
	 */
	public void block_connected(byte[] header, TwoTuple<Long, byte[]>[] txdata, int height) {
		bindings.ChainMonitor_block_connected(this.ptr, header, Arrays.stream(txdata).mapToLong(txdata_conv_24 -> bindings.C2Tuple_usizeTransactionZ_new(txdata_conv_24.a, txdata_conv_24.b)).toArray(), height);
		/* TODO 2 TwoTuple<Long, byte[]>  */;
	}

	/**
	 * Dispatches to per-channel monitors, which are responsible for updating their on-chain view
	 * of a channel and reacting accordingly to newly confirmed transactions. For details, see
	 * [`ChannelMonitor::transactions_confirmed`].
	 * 
	 * Used instead of [`block_connected`] by clients that are notified of transactions rather than
	 * blocks. May be called before or after [`update_best_block`] for transactions in the
	 * corresponding block. See [`update_best_block`] for further calling expectations.
	 * 
	 * [`block_connected`]: Self::block_connected
	 * [`update_best_block`]: Self::update_best_block
	 */
	public void transactions_confirmed(byte[] header, TwoTuple<Long, byte[]>[] txdata, int height) {
		bindings.ChainMonitor_transactions_confirmed(this.ptr, header, Arrays.stream(txdata).mapToLong(txdata_conv_24 -> bindings.C2Tuple_usizeTransactionZ_new(txdata_conv_24.a, txdata_conv_24.b)).toArray(), height);
		/* TODO 2 TwoTuple<Long, byte[]>  */;
	}

	/**
	 * Dispatches to per-channel monitors, which are responsible for updating their on-chain view
	 * of a channel and reacting accordingly based on the new chain tip. For details, see
	 * [`ChannelMonitor::update_best_block`].
	 * 
	 * Used instead of [`block_connected`] by clients that are notified of transactions rather than
	 * blocks. May be called before or after [`transactions_confirmed`] for the corresponding
	 * block.
	 * 
	 * Must be called after new blocks become available for the most recent block. Intermediary
	 * blocks, however, may be safely skipped. In the event of a chain re-organization, this only
	 * needs to be called for the most recent block assuming `transaction_unconfirmed` is called
	 * for any affected transactions.
	 * 
	 * [`block_connected`]: Self::block_connected
	 * [`transactions_confirmed`]: Self::transactions_confirmed
	 * [`transaction_unconfirmed`]: Self::transaction_unconfirmed
	 */
	public void update_best_block(byte[] header, int height) {
		bindings.ChainMonitor_update_best_block(this.ptr, header, height);
	}

	/**
	 * Dispatches to per-channel monitors, which are responsible for updating their on-chain view
	 * of a channel based on the disconnected block. See [`ChannelMonitor::block_disconnected`] for
	 * details.
	 */
	public void block_disconnected(byte[] header, int disconnected_height) {
		bindings.ChainMonitor_block_disconnected(this.ptr, header, disconnected_height);
	}

	/**
	 * Dispatches to per-channel monitors, which are responsible for updating their on-chain view
	 * of a channel based on transactions unconfirmed as a result of a chain reorganization. See
	 * [`ChannelMonitor::transaction_unconfirmed`] for details.
	 * 
	 * Used instead of [`block_disconnected`] by clients that are notified of transactions rather
	 * than blocks. May be called before or after [`update_best_block`] for transactions in the
	 * corresponding block. See [`update_best_block`] for further calling expectations.
	 * 
	 * [`block_disconnected`]: Self::block_disconnected
	 * [`update_best_block`]: Self::update_best_block
	 */
	public void transaction_unconfirmed(byte[] txid) {
		bindings.ChainMonitor_transaction_unconfirmed(this.ptr, txid);
	}

	/**
	 * Returns the set of txids that should be monitored for re-organization out of the chain.
	 */
	public byte[][] get_relevant_txids() {
		byte[][] ret = bindings.ChainMonitor_get_relevant_txids(this.ptr);
		return ret;
	}

	/**
	 * Creates a new `ChainMonitor` used to watch on-chain activity pertaining to channels.
	 * 
	 * When an optional chain source implementing [`chain::Filter`] is provided, the chain monitor
	 * will call back to it indicating transactions and outputs of interest. This allows clients to
	 * pre-filter blocks or only fetch blocks matching a compact filter. Otherwise, clients may
	 * always need to fetch full blocks absent another means for determining which blocks contain
	 * transactions relevant to the watched channels.
	 */
	public static ChainMonitor constructor_new(Filter chain_source, BroadcasterInterface broadcaster, Logger logger, FeeEstimator feeest, Persist persister) {
		long ret = bindings.ChainMonitor_new(chain_source == null ? 0 : chain_source.ptr, broadcaster == null ? 0 : broadcaster.ptr, logger == null ? 0 : logger.ptr, feeest == null ? 0 : feeest.ptr, persister == null ? 0 : persister.ptr);
		ChainMonitor ret_hu_conv = new ChainMonitor(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(chain_source);
		ret_hu_conv.ptrs_to.add(broadcaster);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(feeest);
		ret_hu_conv.ptrs_to.add(persister);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Watch which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Watch must be freed before this_arg is
	 */
	public Watch as_Watch() {
		long ret = bindings.ChainMonitor_as_Watch(this.ptr);
		Watch ret_hu_conv = new Watch(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventsProvider must be freed before this_arg is
	 */
	public EventsProvider as_EventsProvider() {
		long ret = bindings.ChainMonitor_as_EventsProvider(this.ptr);
		EventsProvider ret_hu_conv = new EventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
