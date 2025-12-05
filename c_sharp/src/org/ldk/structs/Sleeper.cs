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
	public static org.ldk.structs.Sleeper from_single_future(org.ldk.structs.Future future) {
		long ret = bindings.Sleeper_from_single_future(future.ptr);
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
	public static org.ldk.structs.Sleeper from_two_futures(org.ldk.structs.Future fut_a, org.ldk.structs.Future fut_b) {
		long ret = bindings.Sleeper_from_two_futures(fut_a.ptr, fut_b.ptr);
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
	 * Constructs a new sleeper from three futures, allowing blocking on all three at once.
	 */
	public static org.ldk.structs.Sleeper from_three_futures(org.ldk.structs.Future fut_a, org.ldk.structs.Future fut_b, org.ldk.structs.Future fut_c) {
		long ret = bindings.Sleeper_from_three_futures(fut_a.ptr, fut_b.ptr, fut_c.ptr);
		GC.KeepAlive(fut_a);
		GC.KeepAlive(fut_b);
		GC.KeepAlive(fut_c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sleeper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sleeper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fut_a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fut_b); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fut_c); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new sleeper from four futures, allowing blocking on all four at once.
	 */
	public static org.ldk.structs.Sleeper from_four_futures(org.ldk.structs.Future fut_a, org.ldk.structs.Future fut_b, org.ldk.structs.Future fut_c, org.ldk.structs.Future fut_d) {
		long ret = bindings.Sleeper_from_four_futures(fut_a.ptr, fut_b.ptr, fut_c.ptr, fut_d.ptr);
		GC.KeepAlive(fut_a);
		GC.KeepAlive(fut_b);
		GC.KeepAlive(fut_c);
		GC.KeepAlive(fut_d);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sleeper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sleeper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fut_a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fut_b); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fut_c); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fut_d); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new sleeper on many futures, allowing blocking on all at once.
	 */
	public static org.ldk.structs.Sleeper of(Future[] futures) {
		long ret = bindings.Sleeper_new(InternalUtils.encodeUint64Array(InternalUtils.mapArray(futures, futures_conv_8 => futures_conv_8.ptr)));
		GC.KeepAlive(futures);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sleeper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sleeper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		foreach (Future futures_conv_8 in futures) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(futures_conv_8); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after ret_hu_conv call, futures_conv_8 is reset to null and is now a dummy object.
		futures_conv_8.ptr = 0;; };
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
