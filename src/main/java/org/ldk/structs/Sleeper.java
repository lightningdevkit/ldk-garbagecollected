package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A struct which can be used to select across many [`Future`]s at once without relying on a full
 * async context.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Sleeper extends CommonBase {
	Sleeper(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Sleeper_free(ptr); }
	}

	/**
	 * Constructs a new sleeper from one future, allowing blocking on it.
	 */
	public static Sleeper from_single_future(org.ldk.structs.Future future) {
		long ret = bindings.Sleeper_from_single_future(future == null ? 0 : future.ptr);
		Reference.reachabilityFence(future);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sleeper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sleeper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(future); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new sleeper from two futures, allowing blocking on both at once.
	 */
	public static Sleeper from_two_futures(org.ldk.structs.Future fut_a, org.ldk.structs.Future fut_b) {
		long ret = bindings.Sleeper_from_two_futures(fut_a == null ? 0 : fut_a.ptr, fut_b == null ? 0 : fut_b.ptr);
		Reference.reachabilityFence(fut_a);
		Reference.reachabilityFence(fut_b);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sleeper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sleeper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(fut_a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(fut_b); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new sleeper on many futures, allowing blocking on all at once.
	 */
	public static Sleeper of(Future[] futures) {
		long ret = bindings.Sleeper_new(futures != null ? Arrays.stream(futures).mapToLong(futures_conv_8 -> futures_conv_8 == null ? 0 : futures_conv_8.ptr).toArray() : null);
		Reference.reachabilityFence(futures);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sleeper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sleeper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (Future futures_conv_8: futures) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(futures_conv_8); }; };
		return ret_hu_conv;
	}

	/**
	 * Wait until one of the [`Future`]s registered with this [`Sleeper`] has completed.
	 */
	public void wait_indefinite() {
		bindings.Sleeper_wait(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Wait until one of the [`Future`]s registered with this [`Sleeper`] has completed or the
	 * given amount of time has elapsed. Returns true if a [`Future`] completed, false if the time
	 * elapsed.
	 */
	public boolean wait_timeout(long max_wait) {
		boolean ret = bindings.Sleeper_wait_timeout(this.ptr, max_wait);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(max_wait);
		return ret;
	}

}
