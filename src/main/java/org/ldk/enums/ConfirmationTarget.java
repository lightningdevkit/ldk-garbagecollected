package org.ldk.enums;

/**
 * An enum that represents the priority at which we want a transaction to confirm used for feerate
 * estimation.
 */
public enum ConfirmationTarget {
	/**
	 * We have some funds available on chain which we need to spend prior to some expiry time at
	 * which point our counterparty may be able to steal them. Generally we have in the high tens
	 * to low hundreds of blocks to get our transaction on-chain, but we shouldn't risk too low a
	 * fee - this should be a relatively high priority feerate.
	 */
	LDKConfirmationTarget_OnChainSweep,
	/**
	 * This is the lowest feerate we will allow our channel counterparty to have in an anchor
	 * channel in order to close the channel if a channel party goes away.
	 * 
	 * This needs to be sufficient to get into the mempool when the channel needs to
	 * be force-closed. Setting too high may result in force-closures if our counterparty attempts
	 * to use a lower feerate. Because this is for anchor channels, we can always bump the feerate
	 * later; the feerate here only needs to be sufficient to enter the mempool.
	 * 
	 * A good estimate is the expected mempool minimum at the time of force-closure. Obviously this
	 * is not an estimate which is very easy to calculate because we do not know the future. Using
	 * a simple long-term fee estimate or tracking of the mempool minimum is a good approach to
	 * ensure you can always close the channel. A future change to Bitcoin's P2P network
	 * (package relay) may obviate the need for this entirely.
	 */
	LDKConfirmationTarget_MinAllowedAnchorChannelRemoteFee,
	/**
	 * The lowest feerate we will allow our channel counterparty to have in a non-anchor channel.
	 * 
	 * This is the feerate on the transaction which we (or our counterparty) will broadcast in
	 * order to close the channel if a channel party goes away. Setting this value too high will
	 * cause immediate force-closures in order to avoid having an unbroadcastable state.
	 * 
	 * This feerate represents the fee we pick now, which must be sufficient to enter a block at an
	 * arbitrary time in the future. Obviously this is not an estimate which is very easy to
	 * calculate. This can leave channels subject to being unable to close if feerates rise, and in
	 * general you should prefer anchor channels to ensure you can increase the feerate when the
	 * transactions need broadcasting.
	 * 
	 * Do note some fee estimators round up to the next full sat/vbyte (ie 250 sats per kw),
	 * causing occasional issues with feerate disagreements between an initiator that wants a
	 * feerate of 1.1 sat/vbyte and a receiver that wants 1.1 rounded up to 2. If your fee
	 * estimator rounds subtracting 250 to your desired feerate here can help avoid this issue.
	 * 
	 * [`ChannelConfig::max_dust_htlc_exposure`]: crate::util::config::ChannelConfig::max_dust_htlc_exposure
	 */
	LDKConfirmationTarget_MinAllowedNonAnchorChannelRemoteFee,
	/**
	 * This is the feerate on the transaction which we (or our counterparty) will broadcast in
	 * order to close the channel if a channel party goes away.
	 * 
	 * This needs to be sufficient to get into the mempool when the channel needs to
	 * be force-closed. Setting too low may result in force-closures. Because this is for anchor
	 * channels, it can be a low value as we can always bump the feerate later.
	 * 
	 * A good estimate is the expected mempool minimum at the time of force-closure. Obviously this
	 * is not an estimate which is very easy to calculate because we do not know the future. Using
	 * a simple long-term fee estimate or tracking of the mempool minimum is a good approach to
	 * ensure you can always close the channel. A future change to Bitcoin's P2P network
	 * (package relay) may obviate the need for this entirely.
	 */
	LDKConfirmationTarget_AnchorChannelFee,
	/**
	 * Lightning is built around the ability to broadcast a transaction in the future to close our
	 * channel and claim all pending funds. In order to do so, non-anchor channels are built with
	 * transactions which we need to be able to broadcast at some point in the future.
	 * 
	 * This feerate represents the fee we pick now, which must be sufficient to enter a block at an
	 * arbitrary time in the future. Obviously this is not an estimate which is very easy to
	 * calculate, so most lightning nodes use some relatively high-priority feerate using the
	 * current mempool. This leaves channels subject to being unable to close if feerates rise, and
	 * in general you should prefer anchor channels to ensure you can increase the feerate when the
	 * transactions need broadcasting.
	 * 
	 * Since this should represent the feerate of a channel close that does not need fee
	 * bumping, this is also used as an upper bound for our attempted feerate when doing cooperative
	 * closure of any channel.
	 */
	LDKConfirmationTarget_NonAnchorChannelFee,
	/**
	 * When cooperatively closing a channel, this is the minimum feerate we will accept.
	 * Recommended at least within a day or so worth of blocks.
	 * 
	 * This will also be used when initiating a cooperative close of a channel. When closing a
	 * channel you can override this fee by using
	 * [`ChannelManager::close_channel_with_feerate_and_script`].
	 * 
	 * [`ChannelManager::close_channel_with_feerate_and_script`]: crate::ln::channelmanager::ChannelManager::close_channel_with_feerate_and_script
	 */
	LDKConfirmationTarget_ChannelCloseMinimum,
	; static native void init();
	static { init(); }
}