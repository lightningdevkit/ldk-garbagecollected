package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait that describes a source of entropy.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class EntropySource extends CommonBase {
	final bindings.LDKEntropySource bindings_instance;
	EntropySource(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private EntropySource(bindings.LDKEntropySource arg) {
		super(bindings.LDKEntropySource_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.EntropySource_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.EntropySource_free(ptr); }
		ptr = 0;
	}
	public static interface EntropySourceInterface {
		/**
		 * Gets a unique, cryptographically-secure, random 32-byte value. This method must return a
		 * different value each time it is called.
		 */
		byte[] get_secure_random_bytes();
	}
	private static class LDKEntropySourceHolder { EntropySource held; }
	public static EntropySource new_impl(EntropySourceInterface arg) {
		final LDKEntropySourceHolder impl_holder = new LDKEntropySourceHolder();
		impl_holder.held = new EntropySource(new bindings.LDKEntropySource() {
			@Override public byte[] get_secure_random_bytes() {
				byte[] ret = arg.get_secure_random_bytes();
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Gets a unique, cryptographically-secure, random 32-byte value. This method must return a
	 * different value each time it is called.
	 */
	public byte[] get_secure_random_bytes() {
		byte[] ret = bindings.EntropySource_get_secure_random_bytes(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
