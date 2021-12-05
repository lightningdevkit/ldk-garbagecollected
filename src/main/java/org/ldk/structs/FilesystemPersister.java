package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * FilesystemPersister persists channel data on disk, where each channel's
 * data is stored in a file named after its funding outpoint.
 * 
 * Warning: this module does the best it can with calls to persist data, but it
 * can only guarantee that the data is passed to the drive. It is up to the
 * drive manufacturers to do the actual persistence properly, which they often
 * don't (especially on consumer-grade hardware). Therefore, it is up to the
 * user to validate their entire storage stack, to ensure the writes are
 * persistent.
 * Corollary: especially when dealing with larger amounts of money, it is best
 * practice to have multiple channel data backups and not rely only on one
 * FilesystemPersister.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FilesystemPersister extends CommonBase {
	FilesystemPersister(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FilesystemPersister_free(ptr); }
	}

	/**
	 * Initialize a new FilesystemPersister and set the path to the individual channels'
	 * files.
	 */
	public static FilesystemPersister of(java.lang.String path_to_channel_data) {
		long ret = bindings.FilesystemPersister_new(path_to_channel_data);
		Reference.reachabilityFence(path_to_channel_data);
		if (ret >= 0 && ret <= 4096) { return null; }
		FilesystemPersister ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new FilesystemPersister(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Get the directory which was provided when this persister was initialized.
	 */
	public String get_data_dir() {
		String ret = bindings.FilesystemPersister_get_data_dir(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read `ChannelMonitor`s from disk.
	 */
	public Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ read_channelmonitors(KeysInterface keys_manager) {
		long ret = bindings.FilesystemPersister_read_channelmonitors(this.ptr, keys_manager == null ? 0 : keys_manager.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(keys_manager);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(keys_manager);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Persist which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Persist must be freed before this_arg is
	 */
	public Persist as_Persist() {
		long ret = bindings.FilesystemPersister_as_Persist(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Persist ret_hu_conv = new Persist(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
