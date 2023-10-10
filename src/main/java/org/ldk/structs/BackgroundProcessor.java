package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * `BackgroundProcessor` takes care of tasks that (1) need to happen periodically to keep
 * Rust-Lightning running properly, and (2) either can or should be run in the background. Its
 * responsibilities are:
 * Processing [`Event`]s with a user-provided [`EventHandler`].
 * Monitoring whether the [`ChannelManager`] needs to be re-persisted to disk, and if so,
 * writing it to disk/backups by invoking the callback given to it at startup.
 * [`ChannelManager`] persistence should be done in the background.
 * Calling [`ChannelManager::timer_tick_occurred`], [`ChainMonitor::rebroadcast_pending_claims`]
 * and [`PeerManager::timer_tick_occurred`] at the appropriate intervals.
 * Calling [`NetworkGraph::remove_stale_channels_and_tracking`] (if a [`GossipSync`] with a
 * [`NetworkGraph`] is provided to [`BackgroundProcessor::start`]).
 * 
 * It will also call [`PeerManager::process_events`] periodically though this shouldn't be relied
 * upon as doing so may result in high latency.
 * 
 * # Note
 * 
 * If [`ChannelManager`] persistence fails and the persisted manager becomes out-of-date, then
 * there is a risk of channels force-closing on startup when the manager realizes it's outdated.
 * However, as long as [`ChannelMonitor`] backups are sound, no funds besides those used for
 * unilateral chain closure fees are at risk.
 * 
 * [`ChannelMonitor`]: lightning::chain::channelmonitor::ChannelMonitor
 * [`Event`]: lightning::events::Event
 * [`PeerManager::timer_tick_occurred`]: lightning::ln::peer_handler::PeerManager::timer_tick_occurred
 * [`PeerManager::process_events`]: lightning::ln::peer_handler::PeerManager::process_events
 * BackgroundProcessor will immediately stop on drop. It should be stored until shutdown.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BackgroundProcessor extends CommonBase {
	BackgroundProcessor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BackgroundProcessor_free(ptr); }
	}

	/**
	 * Start a background thread that takes care of responsibilities enumerated in the [top-level
	 * documentation].
	 * 
	 * The thread runs indefinitely unless the object is dropped, [`stop`] is called, or
	 * [`Persister::persist_manager`] returns an error. In case of an error, the error is retrieved by calling
	 * either [`join`] or [`stop`].
	 * 
	 * # Data Persistence
	 * 
	 * [`Persister::persist_manager`] is responsible for writing out the [`ChannelManager`] to disk, and/or
	 * uploading to one or more backup services. See [`ChannelManager::write`] for writing out a
	 * [`ChannelManager`]. See the `lightning-persister` crate for LDK's
	 * provided implementation.
	 * 
	 * [`Persister::persist_graph`] is responsible for writing out the [`NetworkGraph`] to disk, if
	 * [`GossipSync`] is supplied. See [`NetworkGraph::write`] for writing out a [`NetworkGraph`].
	 * See the `lightning-persister` crate for LDK's provided implementation.
	 * 
	 * Typically, users should either implement [`Persister::persist_manager`] to never return an
	 * error or call [`join`] and handle any error that may arise. For the latter case,
	 * `BackgroundProcessor` must be restarted by calling `start` again after handling the error.
	 * 
	 * # Event Handling
	 * 
	 * `event_handler` is responsible for handling events that users should be notified of (e.g.,
	 * payment failed). [`BackgroundProcessor`] may decorate the given [`EventHandler`] with common
	 * functionality implemented by other handlers.
	 * [`P2PGossipSync`] if given will update the [`NetworkGraph`] based on payment failures.
	 * 
	 * # Rapid Gossip Sync
	 * 
	 * If rapid gossip sync is meant to run at startup, pass [`RapidGossipSync`] via `gossip_sync`
	 * to indicate that the [`BackgroundProcessor`] should not prune the [`NetworkGraph`] instance
	 * until the [`RapidGossipSync`] instance completes its first sync.
	 * 
	 * [top-level documentation]: BackgroundProcessor
	 * [`join`]: Self::join
	 * [`stop`]: Self::stop
	 * [`ChannelManager`]: lightning::ln::channelmanager::ChannelManager
	 * [`ChannelManager::write`]: lightning::ln::channelmanager::ChannelManager#impl-Writeable
	 * [`Persister::persist_manager`]: lightning::util::persist::Persister::persist_manager
	 * [`Persister::persist_graph`]: lightning::util::persist::Persister::persist_graph
	 * [`NetworkGraph`]: lightning::routing::gossip::NetworkGraph
	 * [`NetworkGraph::write`]: lightning::routing::gossip::NetworkGraph#impl-Writeable
	 */
	public static BackgroundProcessor start(org.ldk.structs.Persister persister, org.ldk.structs.EventHandler event_handler, org.ldk.structs.ChainMonitor chain_monitor, org.ldk.structs.ChannelManager channel_manager, org.ldk.structs.GossipSync gossip_sync, org.ldk.structs.PeerManager peer_manager, org.ldk.structs.Logger logger, org.ldk.structs.Option_WriteableScoreZ scorer) {
		long ret = bindings.BackgroundProcessor_start(persister.ptr, event_handler.ptr, chain_monitor == null ? 0 : chain_monitor.ptr, channel_manager == null ? 0 : channel_manager.ptr, gossip_sync.ptr, peer_manager == null ? 0 : peer_manager.ptr, logger.ptr, scorer.ptr);
		Reference.reachabilityFence(persister);
		Reference.reachabilityFence(event_handler);
		Reference.reachabilityFence(chain_monitor);
		Reference.reachabilityFence(channel_manager);
		Reference.reachabilityFence(gossip_sync);
		Reference.reachabilityFence(peer_manager);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(scorer);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BackgroundProcessor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BackgroundProcessor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(persister); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(event_handler); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(chain_monitor); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(channel_manager); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(gossip_sync); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(peer_manager); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(scorer); };
		return ret_hu_conv;
	}

	/**
	 * Join `BackgroundProcessor`'s thread, returning any error that occurred while persisting
	 * [`ChannelManager`].
	 * 
	 * # Panics
	 * 
	 * This function panics if the background thread has panicked such as while persisting or
	 * handling events.
	 * 
	 * [`ChannelManager`]: lightning::ln::channelmanager::ChannelManager
	 */
	public Result_NoneIOErrorZ join() {
		long ret = bindings.BackgroundProcessor_join(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(this); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, this is reset to null and is now a dummy object.
		this.ptr = 0;;
		return ret_hu_conv;
	}

	/**
	 * Stop `BackgroundProcessor`'s thread, returning any error that occurred while persisting
	 * [`ChannelManager`].
	 * 
	 * # Panics
	 * 
	 * This function panics if the background thread has panicked such as while persisting or
	 * handling events.
	 * 
	 * [`ChannelManager`]: lightning::ln::channelmanager::ChannelManager
	 */
	public Result_NoneIOErrorZ stop() {
		long ret = bindings.BackgroundProcessor_stop(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(this); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, this is reset to null and is now a dummy object.
		this.ptr = 0;;
		return ret_hu_conv;
	}

}
