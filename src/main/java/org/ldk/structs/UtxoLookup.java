package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * The `UtxoLookup` trait defines behavior for accessing on-chain UTXOs.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UtxoLookup extends CommonBase {
	final bindings.LDKUtxoLookup bindings_instance;
	UtxoLookup(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private UtxoLookup(bindings.LDKUtxoLookup arg) {
		super(bindings.LDKUtxoLookup_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.UtxoLookup_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.UtxoLookup_free(ptr); }
		ptr = 0;
	}
	public static interface UtxoLookupInterface {
		/**
		 * Returns the transaction output of a funding transaction encoded by [`short_channel_id`].
		 * Returns an error if `chain_hash` is for a different chain or if such a transaction output is
		 * unknown.
		 * 
		 * [`short_channel_id`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#definition-of-short_channel_id
		 */
		UtxoResult get_utxo(byte[] chain_hash, long short_channel_id);
	}
	private static class LDKUtxoLookupHolder { UtxoLookup held; }
	public static UtxoLookup new_impl(UtxoLookupInterface arg) {
		final LDKUtxoLookupHolder impl_holder = new LDKUtxoLookupHolder();
		impl_holder.held = new UtxoLookup(new bindings.LDKUtxoLookup() {
			@Override public long get_utxo(byte[] chain_hash, long short_channel_id) {
				UtxoResult ret = arg.get_utxo(chain_hash, short_channel_id);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				if (impl_holder.held != null) { impl_holder.held.ptrs_to.add(ret); };
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns the transaction output of a funding transaction encoded by [`short_channel_id`].
	 * Returns an error if `chain_hash` is for a different chain or if such a transaction output is
	 * unknown.
	 * 
	 * [`short_channel_id`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#definition-of-short_channel_id
	 */
	public UtxoResult get_utxo(byte[] chain_hash, long short_channel_id) {
		long ret = bindings.UtxoLookup_get_utxo(this.ptr, InternalUtils.check_arr_len(chain_hash, 32), short_channel_id);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(chain_hash);
		Reference.reachabilityFence(short_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UtxoResult ret_hu_conv = org.ldk.structs.UtxoResult.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
