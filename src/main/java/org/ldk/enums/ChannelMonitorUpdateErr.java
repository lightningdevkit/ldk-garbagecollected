package org.ldk.enums;

/**
 * An error enum representing a failure to persist a channel monitor update.
 */
public enum ChannelMonitorUpdateErr {
	/**
	 * Used to indicate a temporary failure (eg connection to a watchtower or remote backup of
	 * our state failed, but is expected to succeed at some point in the future).
	 * 
	 * Such a failure will \"freeze\" a channel, preventing us from revoking old states or
	 * submitting new commitment transactions to the counterparty. Once the update(s) that failed
	 * have been successfully applied, a [`MonitorEvent::UpdateCompleted`] event should be returned
	 * via [`Watch::release_pending_monitor_events`] which will then restore the channel to an
	 * operational state.
	 * 
	 * Note that a given ChannelManager will *never* re-generate a given ChannelMonitorUpdate. If
	 * you return a TemporaryFailure you must ensure that it is written to disk safely before
	 * writing out the latest ChannelManager state.
	 * 
	 * Even when a channel has been \"frozen\" updates to the ChannelMonitor can continue to occur
	 * (eg if an inbound HTLC which we forwarded was claimed upstream resulting in us attempting
	 * to claim it on this channel) and those updates must be applied wherever they can be. At
	 * least one such updated ChannelMonitor must be persisted otherwise PermanentFailure should
	 * be returned to get things on-chain ASAP using only the in-memory copy. Obviously updates to
	 * the channel which would invalidate previous ChannelMonitors are not made when a channel has
	 * been \"frozen\".
	 * 
	 * Note that even if updates made after TemporaryFailure succeed you must still provide a
	 * [`MonitorEvent::UpdateCompleted`] to ensure you have the latest monitor and re-enable
	 * normal channel operation. Note that this is normally generated through a call to
	 * [`ChainMonitor::channel_monitor_updated`].
	 * 
	 * Note that the update being processed here will not be replayed for you when you return a
	 * [`MonitorEvent::UpdateCompleted`] event via [`Watch::release_pending_monitor_events`], so
	 * you must store the update itself on your own local disk prior to returning a
	 * TemporaryFailure. You may, of course, employ a journaling approach, storing only the
	 * ChannelMonitorUpdate on disk without updating the monitor itself, replaying the journal at
	 * reload-time.
	 * 
	 * For deployments where a copy of ChannelMonitors and other local state are backed up in a
	 * remote location (with local copies persisted immediately), it is anticipated that all
	 * updates will return TemporaryFailure until the remote copies could be updated.
	 * 
	 * [`ChainMonitor::channel_monitor_updated`]: chainmonitor::ChainMonitor::channel_monitor_updated
	 */
	LDKChannelMonitorUpdateErr_TemporaryFailure,
	/**
	 * Used to indicate no further channel monitor updates will be allowed (eg we've moved on to a
	 * different watchtower and cannot update with all watchtowers that were previously informed
	 * of this channel).
	 * 
	 * At reception of this error, ChannelManager will force-close the channel and return at
	 * least a final ChannelMonitorUpdate::ChannelForceClosed which must be delivered to at
	 * least one ChannelMonitor copy. Revocation secret MUST NOT be released and offchain channel
	 * update must be rejected.
	 * 
	 * This failure may also signal a failure to update the local persisted copy of one of
	 * the channel monitor instance.
	 * 
	 * Note that even when you fail a holder commitment transaction update, you must store the
	 * update to ensure you can claim from it in case of a duplicate copy of this ChannelMonitor
	 * broadcasts it (e.g distributed channel-monitor deployment)
	 * 
	 * In case of distributed watchtowers deployment, the new version must be written to disk, as
	 * state may have been stored but rejected due to a block forcing a commitment broadcast. This
	 * storage is used to claim outputs of rejected state confirmed onchain by another watchtower,
	 * lagging behind on block processing.
	 */
	LDKChannelMonitorUpdateErr_PermanentFailure,
	; static native void init();
	static { init(); }
}