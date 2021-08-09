package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * BackgroundProcessor takes care of tasks that (1) need to happen periodically to keep
 * Rust-Lightning running properly, and (2) either can or should be run in the background. Its
 * responsibilities are:
 * Monitoring whether the ChannelManager needs to be re-persisted to disk, and if so,
 * writing it to disk/backups by invoking the callback given to it at startup.
 * ChannelManager persistence should be done in the background.
 * Calling `ChannelManager::timer_tick_occurred()` and
 * `PeerManager::timer_tick_occurred()` every minute (can be done in the
 * background).
 * 
 * Note that if ChannelManager persistence fails and the persisted manager becomes out-of-date,
 * then there is a risk of channels force-closing on startup when the manager realizes it's
 * outdated. However, as long as `ChannelMonitor` backups are sound, no funds besides those used
 * for unilateral chain closure fees are at risk.
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
	 * Start a background thread that takes care of responsibilities enumerated in the top-level
	 * documentation.
	 * 
	 * If `persist_manager` returns an error, then this thread will return said error (and
	 * `start()` will need to be called again to restart the `BackgroundProcessor`). Users should
	 * wait on [`thread_handle`]'s `join()` method to be able to tell if and when an error is
	 * returned, or implement `persist_manager` such that an error is never returned to the
	 * `BackgroundProcessor`
	 * 
	 * `persist_manager` is responsible for writing out the [`ChannelManager`] to disk, and/or
	 * uploading to one or more backup services. See [`ChannelManager::write`] for writing out a
	 * [`ChannelManager`]. See [`FilesystemPersister::persist_manager`] for Rust-Lightning's
	 * provided implementation.
	 * 
	 * [`thread_handle`]: BackgroundProcessor::thread_handle
	 * [`ChannelManager`]: lightning::ln::channelmanager::ChannelManager
	 * [`ChannelManager::write`]: lightning::ln::channelmanager::ChannelManager#impl-Writeable
	 * [`FilesystemPersister::persist_manager`]: lightning_persister::FilesystemPersister::persist_manager
	 */
	public static BackgroundProcessor start(ChannelManagerPersister persister, EventHandler event_handler, ChainMonitor chain_monitor, ChannelManager channel_manager, PeerManager peer_manager, Logger logger) {
		long ret = bindings.BackgroundProcessor_start(persister == null ? 0 : persister.ptr, event_handler == null ? 0 : event_handler.ptr, chain_monitor == null ? 0 : chain_monitor.ptr & ~1, channel_manager == null ? 0 : channel_manager.ptr & ~1, peer_manager == null ? 0 : peer_manager.ptr & ~1, logger == null ? 0 : logger.ptr);
		if (ret < 1024) { return null; }
		BackgroundProcessor ret_hu_conv = new BackgroundProcessor(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(persister);
		ret_hu_conv.ptrs_to.add(event_handler);
		ret_hu_conv.ptrs_to.add(chain_monitor);
		ret_hu_conv.ptrs_to.add(channel_manager);
		ret_hu_conv.ptrs_to.add(peer_manager);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	/**
	 * Stop `BackgroundProcessor`'s thread.
	 */
	public Result_NoneErrorZ stop() {
		long ret = bindings.BackgroundProcessor_stop(this.ptr);
		if (ret < 1024) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(this);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, this is reset to null and is now a dummy object.
		this.ptr = 0;
		return ret_hu_conv;
	}

}
