package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A synchronous helper trait that describes an on-chain wallet capable of returning a (change) destination script.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChangeDestinationSourceSync extends CommonBase {
	final bindings.LDKChangeDestinationSourceSync bindings_instance;
	ChangeDestinationSourceSync(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private ChangeDestinationSourceSync(bindings.LDKChangeDestinationSourceSync arg) {
		super(bindings.LDKChangeDestinationSourceSync_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.ChangeDestinationSourceSync_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.ChangeDestinationSourceSync_free(ptr); }
		ptr = 0;
	}
	public static interface ChangeDestinationSourceSyncInterface {
		/**
		 * Returns a script pubkey which can be used as a change destination for
		 * [`OutputSpender::spend_spendable_outputs`].
		 * 
		 * This method should return a different value each time it is called, to avoid linking
		 * on-chain funds controlled to the same user.
		 */
		Result_CVec_u8ZNoneZ get_change_destination_script();
	}
	private static class LDKChangeDestinationSourceSyncHolder { ChangeDestinationSourceSync held; }
	public static ChangeDestinationSourceSync new_impl(ChangeDestinationSourceSyncInterface arg) {
		final LDKChangeDestinationSourceSyncHolder impl_holder = new LDKChangeDestinationSourceSyncHolder();
		impl_holder.held = new ChangeDestinationSourceSync(new bindings.LDKChangeDestinationSourceSync() {
			@Override public long get_change_destination_script() {
				Result_CVec_u8ZNoneZ ret = arg.get_change_destination_script();
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns a script pubkey which can be used as a change destination for
	 * [`OutputSpender::spend_spendable_outputs`].
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds controlled to the same user.
	 */
	public Result_CVec_u8ZNoneZ get_change_destination_script() {
		long ret = bindings.ChangeDestinationSourceSync_get_change_destination_script(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
