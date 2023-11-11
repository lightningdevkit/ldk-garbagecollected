
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of ScoreUpdate */
public interface ScoreUpdateInterface {
	/**Handles updating channel penalties after failing to route through a channel.
	 */
	void payment_path_failed(Path path, long short_channel_id);
	/**Handles updating channel penalties after successfully routing along a path.
	 */
	void payment_path_successful(Path path);
	/**Handles updating channel penalties after a probe over the given path failed.
	 */
	void probe_failed(Path path, long short_channel_id);
	/**Handles updating channel penalties after a probe over the given path succeeded.
	 */
	void probe_successful(Path path);
}

/**
 * `ScoreUpdate` is used to update the scorer's internal state after a payment attempt.
 */
public class ScoreUpdate : CommonBase {
	internal bindings.LDKScoreUpdate bindings_instance;
	internal long instance_idx;

	internal ScoreUpdate(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~ScoreUpdate() {
		if (ptr != 0) { bindings.ScoreUpdate_free(ptr); }
	}

	private class LDKScoreUpdateHolder { internal ScoreUpdate held; }
	private class LDKScoreUpdateImpl : bindings.LDKScoreUpdate {
		internal LDKScoreUpdateImpl(ScoreUpdateInterface arg, LDKScoreUpdateHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private ScoreUpdateInterface arg;
		private LDKScoreUpdateHolder impl_holder;
		public void payment_path_failed(long _path, long _short_channel_id) {
			org.ldk.structs.Path _path_hu_conv = null; if (_path < 0 || _path > 4096) { _path_hu_conv = new org.ldk.structs.Path(null, _path); }
			arg.payment_path_failed(_path_hu_conv, _short_channel_id);
				GC.KeepAlive(arg);
		}
		public void payment_path_successful(long _path) {
			org.ldk.structs.Path _path_hu_conv = null; if (_path < 0 || _path > 4096) { _path_hu_conv = new org.ldk.structs.Path(null, _path); }
			arg.payment_path_successful(_path_hu_conv);
				GC.KeepAlive(arg);
		}
		public void probe_failed(long _path, long _short_channel_id) {
			org.ldk.structs.Path _path_hu_conv = null; if (_path < 0 || _path > 4096) { _path_hu_conv = new org.ldk.structs.Path(null, _path); }
			arg.probe_failed(_path_hu_conv, _short_channel_id);
				GC.KeepAlive(arg);
		}
		public void probe_successful(long _path) {
			org.ldk.structs.Path _path_hu_conv = null; if (_path < 0 || _path > 4096) { _path_hu_conv = new org.ldk.structs.Path(null, _path); }
			arg.probe_successful(_path_hu_conv);
				GC.KeepAlive(arg);
		}
	}

	/** Creates a new instance of ScoreUpdate from a given implementation */
	public static ScoreUpdate new_impl(ScoreUpdateInterface arg) {
		LDKScoreUpdateHolder impl_holder = new LDKScoreUpdateHolder();
		LDKScoreUpdateImpl impl = new LDKScoreUpdateImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKScoreUpdate_new(impl);

		impl_holder.held = new ScoreUpdate(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Handles updating channel penalties after failing to route through a channel.
	 */
	public void payment_path_failed(org.ldk.structs.Path path, long short_channel_id) {
		bindings.ScoreUpdate_payment_path_failed(this.ptr, path == null ? 0 : path.ptr, short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		GC.KeepAlive(short_channel_id);
		if (this != null) { this.ptrs_to.AddLast(path); };
	}

	/**
	 * Handles updating channel penalties after successfully routing along a path.
	 */
	public void payment_path_successful(org.ldk.structs.Path path) {
		bindings.ScoreUpdate_payment_path_successful(this.ptr, path == null ? 0 : path.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		if (this != null) { this.ptrs_to.AddLast(path); };
	}

	/**
	 * Handles updating channel penalties after a probe over the given path failed.
	 */
	public void probe_failed(org.ldk.structs.Path path, long short_channel_id) {
		bindings.ScoreUpdate_probe_failed(this.ptr, path == null ? 0 : path.ptr, short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		GC.KeepAlive(short_channel_id);
		if (this != null) { this.ptrs_to.AddLast(path); };
	}

	/**
	 * Handles updating channel penalties after a probe over the given path succeeded.
	 */
	public void probe_successful(org.ldk.structs.Path path) {
		bindings.ScoreUpdate_probe_successful(this.ptr, path == null ? 0 : path.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		if (this != null) { this.ptrs_to.AddLast(path); };
	}

}
} } }
