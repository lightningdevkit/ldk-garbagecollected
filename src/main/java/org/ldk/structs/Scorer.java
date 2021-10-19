package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * [`routing::Score`] implementation that provides reasonable default behavior.
 * 
 * Used to apply a fixed penalty to each channel, thus avoiding long paths when shorter paths with
 * slightly higher fees are available.
 * 
 * See [module-level documentation] for usage.
 * 
 * [module-level documentation]: crate::routing::scorer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Scorer extends CommonBase {
	Scorer(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Scorer_free(ptr); }
	}

	/**
	 * Creates a new scorer using `base_penalty_msat` as the channel penalty.
	 */
	public static Scorer of(long base_penalty_msat) {
		long ret = bindings.Scorer_new(base_penalty_msat);
		if (ret >= 0 && ret < 1024) { return null; }
		Scorer ret_hu_conv = new Scorer(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" Scorer. See struct and individual field documentaiton for details on which values are used.
	 */
	public static Scorer with_default() {
		long ret = bindings.Scorer_default();
		if (ret >= 0 && ret < 1024) { return null; }
		Scorer ret_hu_conv = new Scorer(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Score which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Score must be freed before this_arg is
	 */
	public Score as_Score() {
		long ret = bindings.Scorer_as_Score(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
