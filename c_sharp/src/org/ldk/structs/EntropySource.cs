
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of EntropySource */
public interface EntropySourceInterface {
	/**Gets a unique, cryptographically-secure, random 32-byte value. This method must return a
	 * different value each time it is called.
	 */
	byte[] get_secure_random_bytes();
}

/**
 * A trait that describes a source of entropy.
 */
public class EntropySource : CommonBase {
	internal bindings.LDKEntropySource bindings_instance;
	internal long instance_idx;

	internal EntropySource(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~EntropySource() {
		if (ptr != 0) { bindings.EntropySource_free(ptr); }
	}

	private class LDKEntropySourceHolder { internal EntropySource held; }
	private class LDKEntropySourceImpl : bindings.LDKEntropySource {
		internal LDKEntropySourceImpl(EntropySourceInterface arg, LDKEntropySourceHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private EntropySourceInterface arg;
		private LDKEntropySourceHolder impl_holder;
		public long get_secure_random_bytes() {
			byte[] ret = arg.get_secure_random_bytes();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(ret, 32));
			return result;
		}
	}

	/** Creates a new instance of EntropySource from a given implementation */
	public static EntropySource new_impl(EntropySourceInterface arg) {
		LDKEntropySourceHolder impl_holder = new LDKEntropySourceHolder();
		LDKEntropySourceImpl impl = new LDKEntropySourceImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKEntropySource_new(impl);

		impl_holder.held = new EntropySource(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Gets a unique, cryptographically-secure, random 32-byte value. This method must return a
	 * different value each time it is called.
	 */
	public byte[] get_secure_random_bytes() {
		long ret = bindings.EntropySource_get_secure_random_bytes(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
