using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class FilesystemPersister : CommonBase {
	internal FilesystemPersister(object _dummy, long ptr) : base(ptr) { }
	~FilesystemPersister() {
		if (ptr != 0) { bindings.FilesystemPersister_free(ptr); }
	}

	/**
	 * Initialize a new FilesystemPersister and set the path to the individual channels'
	 * files.
	 */
	public static FilesystemPersister of(string path_to_channel_data) {
		long ret = bindings.FilesystemPersister_new(path_to_channel_data);
		GC.KeepAlive(path_to_channel_data);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FilesystemPersister ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FilesystemPersister(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Get the directory which was provided when this persister was initialized.
	 */
	public string get_data_dir() {
		string ret = bindings.FilesystemPersister_get_data_dir(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read `ChannelMonitor`s from disk.
	 */
	public Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ read_channelmonitors(org.ldk.structs.KeysInterface keys_manager) {
		long ret = bindings.FilesystemPersister_read_channelmonitors(this.ptr, keys_manager == null ? 0 : keys_manager.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(keys_manager);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(keys_manager); };
		return ret_hu_conv;
	}

}
} } }
