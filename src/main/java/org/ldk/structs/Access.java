package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * The `Access` trait defines behavior for accessing chain data and state, such as blocks and
 * UTXOs.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Access extends CommonBase {
	final bindings.LDKAccess bindings_instance;
	Access(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Access(bindings.LDKAccess arg) {
		super(bindings.LDKAccess_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Access_free(ptr); } super.finalize();
	}

	public static interface AccessInterface {
		/**
		 * Returns the transaction output of a funding transaction encoded by [`short_channel_id`].
		 * Returns an error if `genesis_hash` is for a different chain or if such a transaction output
		 * is unknown.
		 * 
		 * [`short_channel_id`]: https://github.com/lightningnetwork/lightning-rfc/blob/master/07-routing-gossip.md#definition-of-short_channel_id
		 */
		Result_TxOutAccessErrorZ get_utxo(byte[] genesis_hash, long short_channel_id);
	}
	private static class LDKAccessHolder { Access held; }
	public static Access new_impl(AccessInterface arg) {
		final LDKAccessHolder impl_holder = new LDKAccessHolder();
		impl_holder.held = new Access(new bindings.LDKAccess() {
			@Override public long get_utxo(byte[] genesis_hash, long short_channel_id) {
				Result_TxOutAccessErrorZ ret = arg.get_utxo(genesis_hash, short_channel_id);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns the transaction output of a funding transaction encoded by [`short_channel_id`].
	 * Returns an error if `genesis_hash` is for a different chain or if such a transaction output
	 * is unknown.
	 * 
	 * [`short_channel_id`]: https://github.com/lightningnetwork/lightning-rfc/blob/master/07-routing-gossip.md#definition-of-short_channel_id
	 */
	public Result_TxOutAccessErrorZ get_utxo(byte[] genesis_hash, long short_channel_id) {
		long ret = bindings.Access_get_utxo(this.ptr, InternalUtils.check_arr_len(genesis_hash, 32), short_channel_id);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(genesis_hash);
		Reference.reachabilityFence(short_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
