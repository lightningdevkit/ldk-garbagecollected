using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Refers to a scorer that is accessible under lock and also writeable to disk
 * 
 * We need this trait to be able to pass in a scorer to `lightning-background-processor` that will enable us to
 * use the Persister to persist it.
 */
public class WriteableScore : CommonBase {
	internal readonly bindings.LDKWriteableScore bindings_instance;
	internal WriteableScore(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private WriteableScore(bindings.LDKWriteableScore arg, bindings.LDKLockableScore LockableScore) : base(bindings.LDKWriteableScore_new(arg, LockableScore)) {
		this.ptrs_to.AddLast(arg);
		this.ptrs_to.AddLast(LockableScore);
		this.bindings_instance = arg;
	}
	~WriteableScore() {
		if (ptr != 0) { bindings.WriteableScore_free(ptr); }
	}

	public interface WriteableScoreInterface {
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private class LDKWriteableScoreHolder { internal WriteableScore held; }
	private class LDKWriteableScoreImpl : bindings.LDKWriteableScore {
		internal LDKWriteableScoreImpl(WriteableScoreInterface arg, LDKWriteableScoreHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private WriteableScoreInterface arg;
		private LDKWriteableScoreHolder impl_holder;
		public byte[] write() {
			byte[] ret = arg.write();
				GC.KeepAlive(arg);
			return ret;
		}
	}
	public static WriteableScore new_impl(WriteableScoreInterface arg, LockableScore.LockableScoreInterface LockableScore_impl) {
		LDKWriteableScoreHolder impl_holder = new LDKWriteableScoreHolder();
		impl_holder.held = new WriteableScore(new LDKWriteableScoreImpl(arg, impl_holder), LockableScore.new_impl(LockableScore_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying LockableScore.
	 */
	public LockableScore get_lockable_score() {
		LockableScore res = new LockableScore(null, bindings.LDKWriteableScore_get_LockableScore(this.ptr));
		this.ptrs_to.AddLast(res);
		return res;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.WriteableScore_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
