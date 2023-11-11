namespace org { namespace ldk { namespace enums {/**
 * An enum representing the status of a channel monitor update persistence.
 * 
 * These are generally used as the return value for an implementation of [`Persist`] which is used
 * as the storage layer for a [`ChainMonitor`]. See the docs on [`Persist`] for a high-level
 * explanation of how to handle different cases.
 * 
 * While `UnrecoverableError` is provided as a failure variant, it is not truly \"handled\" on the
 * calling side, and generally results in an immediate panic. For those who prefer to avoid
 * panics, `InProgress` can be used and you can retry the update operation in the background or
 * shut down cleanly.
 * 
 * Note that channels should generally *not* be force-closed after a persistence failure.
 * Force-closing with the latest [`ChannelMonitorUpdate`] applied may result in a transaction
 * being broadcast which can only be spent by the latest [`ChannelMonitor`]! Thus, if the
 * latest [`ChannelMonitor`] is not durably persisted anywhere and exists only in memory, naively
 * calling [`ChannelManager::force_close_broadcasting_latest_txn`] *may result in loss of funds*!
 * 
 * [`Persist`]: chainmonitor::Persist
 * [`ChainMonitor`]: chainmonitor::ChainMonitor
 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
 */
public enum ChannelMonitorUpdateStatus {
	/**
	 * The update has been durably persisted and all copies of the relevant [`ChannelMonitor`]
	 * have been updated.
	 * 
	 * This includes performing any `fsync()` calls required to ensure the update is guaranteed to
	 * be available on restart even if the application crashes.
	 */
	LDKChannelMonitorUpdateStatus_Completed,
	/**
	 * Indicates that the update will happen asynchronously in the background or that a transient
	 * failure occurred which is being retried in the background and will eventually complete.
	 * 
	 * This will \"freeze\" a channel, preventing us from revoking old states or submitting a new
	 * commitment transaction to the counterparty. Once the update(s) which are `InProgress` have
	 * been completed, a [`MonitorEvent::Completed`] can be used to restore the channel to an
	 * operational state.
	 * 
	 * Even when a channel has been \"frozen\", updates to the [`ChannelMonitor`] can continue to
	 * occur (e.g. if an inbound HTLC which we forwarded was claimed upstream, resulting in us
	 * attempting to claim it on this channel) and those updates must still be persisted.
	 * 
	 * No updates to the channel will be made which could invalidate other [`ChannelMonitor`]s
	 * until a [`MonitorEvent::Completed`] is provided, even if you return no error on a later
	 * monitor update for the same channel.
	 * 
	 * For deployments where a copy of [`ChannelMonitor`]s and other local state are backed up in
	 * a remote location (with local copies persisted immediately), it is anticipated that all
	 * updates will return [`InProgress`] until the remote copies could be updated.
	 * 
	 * Note that while fully asynchronous persistence of [`ChannelMonitor`] data is generally
	 * reliable, this feature is considered beta, and a handful of edge-cases remain. Until the
	 * remaining cases are fixed, in rare cases, *using this feature may lead to funds loss*.
	 * 
	 * [`InProgress`]: ChannelMonitorUpdateStatus::InProgress
	 */
	LDKChannelMonitorUpdateStatus_InProgress,
	/**
	 * Indicates that an update has failed and will not complete at any point in the future.
	 * 
	 * Currently returning this variant will cause LDK to immediately panic to encourage immediate
	 * shutdown. In the future this may be updated to disconnect peers and refuse to continue
	 * normal operation without a panic.
	 * 
	 * Applications which wish to perform an orderly shutdown after failure should consider
	 * returning [`InProgress`] instead and simply shut down without ever marking the update
	 * complete.
	 * 
	 * [`InProgress`]: ChannelMonitorUpdateStatus::InProgress
	 */
	LDKChannelMonitorUpdateStatus_UnrecoverableError,
}} } }
