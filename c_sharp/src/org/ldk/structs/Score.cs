
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of Score */
public interface ScoreInterface {
	/**Serialize the object into a byte array
	 */
	byte[] write();
}

/**
 * A trait which can both lookup and update routing channel penalty scores.
 * 
 * This is used in places where both bounds are required and implemented for all types which
 * implement [`ScoreLookUp`] and [`ScoreUpdate`].
 * 
 * Bindings users may need to manually implement this for their custom scoring implementations.
 */
public class Score : CommonBase {
	internal bindings.LDKScore bindings_instance;
	internal long instance_idx;

	internal Score(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~Score() {
		if (ptr != 0) { bindings.Score_free(ptr); }
	}

	private class LDKScoreHolder { internal Score held; }
	private class LDKScoreImpl : bindings.LDKScore {
		internal LDKScoreImpl(ScoreInterface arg, LDKScoreHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private ScoreInterface arg;
		private LDKScoreHolder impl_holder;
		public long write() {
			byte[] ret = arg.write();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint8Array(ret);
			return result;
		}
	}

	/** Creates a new instance of Score from a given implementation */
	public static Score new_impl(ScoreInterface arg, ScoreLookUpInterface scoreLookUp_impl, ScoreUpdateInterface scoreUpdate_impl) {
		LDKScoreHolder impl_holder = new LDKScoreHolder();
		LDKScoreImpl impl = new LDKScoreImpl(arg, impl_holder);
		ScoreLookUp scoreLookUp = ScoreLookUp.new_impl(scoreLookUp_impl);
		ScoreUpdate scoreUpdate = ScoreUpdate.new_impl(scoreUpdate_impl);
		long[] ptr_idx = bindings.LDKScore_new(impl, scoreLookUp.instance_idx, scoreUpdate.instance_idx);

		impl_holder.held = new Score(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		impl_holder.held.ptrs_to.AddLast(scoreLookUp);
		impl_holder.held.ptrs_to.AddLast(scoreUpdate);
		return impl_holder.held;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		long ret = bindings.Score_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
