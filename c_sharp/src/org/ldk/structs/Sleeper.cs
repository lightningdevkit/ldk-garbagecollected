using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A struct which can be used to select across many [`Future`]s at once without relying on a full
 * async context.
 */
public class Sleeper : CommonBase {
	internal Sleeper(object _dummy, long ptr) : base(ptr) { }
	~Sleeper() {
		if (ptr != 0) { bindings.Sleeper_free(ptr); }
	}

	/**
	 * Constructs a new sleeper from one future, allowing blocking on it.
	 */
	public static Sleeper from_single_future(org.ldk.structs.Future future) {
		long ret = bindings.Sleeper_from_single_future(future == null ? 0 : future.ptr);
		GC.KeepAlive(future);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sleeper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sleeper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(future); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new sleeper from two futures, allowing blocking on both at once.
	 */
	public static Sleeper from_two_futures(org.ldk.structs.Future fut_a, org.ldk.structs.Future fut_b) {
		long ret = bindings.Sleeper_from_two_futures(fut_a == null ? 0 : fut_a.ptr, fut_b == null ? 0 : fut_b.ptr);
		GC.KeepAlive(fut_a);
		GC.KeepAlive(fut_b);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sleeper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sleeper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fut_a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fut_b); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new sleeper on many futures, allowing blocking on all at once.
	 */
	public static Sleeper of(Future[] futures) {
		long ret = bindings.Sleeper_new(InternalUtils.encodeUint64Array(InternalUtils.mapArray(futures, futures_conv_8 => futures_conv_8 == null ? 0 : futures_conv_8.ptr)));
		GC.KeepAlive(futures);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sleeper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sleeper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		foreach (Future futures_conv_8 in futures) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(futures_conv_8); }; };
		return ret_hu_conv;
	}

	/**
	 * Wait until one of the [`Future`]s registered with this [`Sleeper`] has completed.
	 */
	public void wait() {
		bindings.Sleeper_wait(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Wait until one of the [`Future`]s registered with this [`Sleeper`] has completed or the
	 * given amount of time has elapsed. Returns true if a [`Future`] completed, false if the time
	 * elapsed.
	 */
	public bool wait_timeout(long max_wait) {
		bool ret = bindings.Sleeper_wait_timeout(this.ptr, max_wait);
		GC.KeepAlive(this);
		GC.KeepAlive(max_wait);
		return ret;
	}

}
} } }
