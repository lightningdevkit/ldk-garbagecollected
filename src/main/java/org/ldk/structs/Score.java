package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait which can both lookup and update routing channel penalty scores.
 * 
 * This is used in places where both bounds are required and implemented for all types which
 * implement [`ScoreLookUp`] and [`ScoreUpdate`].
 * 
 * Bindings users may need to manually implement this for their custom scoring implementations.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Score extends CommonBase {
	final bindings.LDKScore bindings_instance;
	Score(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Score(bindings.LDKScore arg, bindings.LDKScoreLookUp ScoreLookUp, bindings.LDKScoreUpdate ScoreUpdate) {
		super(bindings.LDKScore_new(arg, ScoreLookUp, ScoreUpdate));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(ScoreLookUp);
		this.ptrs_to.add(ScoreUpdate);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Score_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.Score_free(ptr); }
		ptr = 0;
	}
	public static interface ScoreInterface {
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private static class LDKScoreHolder { Score held; }
	public static Score new_impl(ScoreInterface arg, ScoreLookUp.ScoreLookUpInterface ScoreLookUp_impl, ScoreUpdate.ScoreUpdateInterface ScoreUpdate_impl) {
		final LDKScoreHolder impl_holder = new LDKScoreHolder();
		impl_holder.held = new Score(new bindings.LDKScore() {
			@Override public byte[] write() {
				byte[] ret = arg.write();
				Reference.reachabilityFence(arg);
				return ret;
			}
		}, ScoreLookUp.new_impl(ScoreLookUp_impl).bindings_instance, ScoreUpdate.new_impl(ScoreUpdate_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying ScoreLookUp.
	 */
	public ScoreLookUp get_score_look_up() {
		ScoreLookUp res = new ScoreLookUp(null, bindings.LDKScore_get_ScoreLookUp(this.ptr));
		res.ptrs_to.add(this);
		return res;
	}


	/**
	 * Gets the underlying ScoreUpdate.
	 */
	public ScoreUpdate get_score_update() {
		ScoreUpdate res = new ScoreUpdate(null, bindings.LDKScore_get_ScoreUpdate(this.ptr));
		res.ptrs_to.add(this);
		return res;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.Score_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
