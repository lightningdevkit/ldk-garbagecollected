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
	 * `persist_manager` returns an error. In case of an error, the error is retrieved by calling
	 * either [`join`] or [`stop`].
	 * 
	 * Typically, users should either implement [`ChannelManagerPersister`] to never return an
	 * error or call [`join`] and handle any error that may arise. For the latter case, the
	 * `BackgroundProcessor` must be restarted by calling `start` again after handling the error.
	 * 
	 * `persist_manager` is responsible for writing out the [`ChannelManager`] to disk, and/or
	 * uploading to one or more backup services. See [`ChannelManager::write`] for writing out a
	 * [`ChannelManager`]. See [`FilesystemPersister::persist_manager`] for Rust-Lightning's
	 * provided implementation.
	 * 
	 * [top-level documentation]: Self
	 * [`join`]: Self::join
	 * [`stop`]: Self::stop
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
	public Result_NoneErrorZ join() {
		long ret = bindings.BackgroundProcessor_join(this.ptr);
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
