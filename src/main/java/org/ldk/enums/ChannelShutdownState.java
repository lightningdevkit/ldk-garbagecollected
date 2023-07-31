package org.ldk.enums;

/**
 * Further information on the details of the channel shutdown.
 * Upon channels being forced closed (i.e. commitment transaction confirmation detected
 * by `ChainMonitor`), ChannelShutdownState will be set to `ShutdownComplete` or
 * the channel will be removed shortly.
 * Also note, that in normal operation, peers could disconnect at any of these states
 * and require peer re-connection before making progress onto other states
 */
public enum ChannelShutdownState {
	/**
	 * Channel has not sent or received a shutdown message.
	 */
	LDKChannelShutdownState_NotShuttingDown,
	/**
	 * Local node has sent a shutdown message for this channel.
	 */
	LDKChannelShutdownState_ShutdownInitiated,
	/**
	 * Shutdown message exchanges have concluded and the channels are in the midst of
	 * resolving all existing open HTLCs before closing can continue.
	 */
	LDKChannelShutdownState_ResolvingHTLCs,
	/**
	 * All HTLCs have been resolved, nodes are currently negotiating channel close onchain fee rates.
	 */
	LDKChannelShutdownState_NegotiatingClosingFee,
	/**
	 * We've successfully negotiated a closing_signed dance. At this point `ChannelManager` is about
	 * to drop the channel.
	 */
	LDKChannelShutdownState_ShutdownComplete,
	; static native void init();
	static { init(); }
}