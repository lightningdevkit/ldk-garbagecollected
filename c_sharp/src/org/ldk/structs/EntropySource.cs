using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait that describes a source of entropy.
 */
public class EntropySource : CommonBase {
	internal readonly bindings.LDKEntropySource bindings_instance;
	internal EntropySource(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private EntropySource(bindings.LDKEntropySource arg) : base(bindings.LDKEntropySource_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~EntropySource() {
		if (ptr != 0) { bindings.EntropySource_free(ptr); }
	}

	public interface EntropySourceInterface {
		/**
		 * Gets a unique, cryptographically-secure, random 32-byte value. This method must return a
		 * different value each time it is called.
		 */
		byte[] get_secure_random_bytes();
	}
	private class LDKEntropySourceHolder { internal EntropySource held; }
	private class LDKEntropySourceImpl : bindings.LDKEntropySource {
		internal LDKEntropySourceImpl(EntropySourceInterface arg, LDKEntropySourceHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private EntropySourceInterface arg;
		private LDKEntropySourceHolder impl_holder;
		public byte[] get_secure_random_bytes() {
			byte[] ret = arg.get_secure_random_bytes();
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 32);
			return result;
		}
	}
	public static EntropySource new_impl(EntropySourceInterface arg) {
		LDKEntropySourceHolder impl_holder = new LDKEntropySourceHolder();
		impl_holder.held = new EntropySource(new LDKEntropySourceImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Gets a unique, cryptographically-secure, random 32-byte value. This method must return a
	 * different value each time it is called.
	 */
	public byte[] get_secure_random_bytes() {
		byte[] ret = bindings.EntropySource_get_secure_random_bytes(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
