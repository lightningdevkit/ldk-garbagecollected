package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * Refers to a scorer that is accessible under lock and also writeable to disk
 * 
 * We need this trait to be able to pass in a scorer to `lightning-background-processor` that will enable us to
 * use the Persister to persist it.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class WriteableScore extends CommonBase {
	final bindings.LDKWriteableScore bindings_instance;
	WriteableScore(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private WriteableScore(bindings.LDKWriteableScore arg, bindings.LDKLockableScore LockableScore) {
		super(bindings.LDKWriteableScore_new(arg, LockableScore));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(LockableScore);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.WriteableScore_free(ptr); } super.finalize();
	}

	public static interface WriteableScoreInterface {
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private static class LDKWriteableScoreHolder { WriteableScore held; }
	public static WriteableScore new_impl(WriteableScoreInterface arg, LockableScore.LockableScoreInterface LockableScore_impl) {
		final LDKWriteableScoreHolder impl_holder = new LDKWriteableScoreHolder();
		impl_holder.held = new WriteableScore(new bindings.LDKWriteableScore() {
			@Override public byte[] write() {
				byte[] ret = arg.write();
				Reference.reachabilityFence(arg);
				return ret;
			}
		}, LockableScore.new_impl(LockableScore_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying LockableScore.
	 */
	public LockableScore get_lockable_score() {
		LockableScore res = new LockableScore(null, bindings.LDKWriteableScore_get_LockableScore(this.ptr));
		this.ptrs_to.add(res);
		return res;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.WriteableScore_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
