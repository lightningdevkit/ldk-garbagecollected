
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of UtxoLookup */
public interface UtxoLookupInterface {
	/**Returns the transaction output of a funding transaction encoded by [`short_channel_id`].
	 * Returns an error if `chain_hash` is for a different chain or if such a transaction output is
	 * unknown.
	 * 
	 * [`short_channel_id`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#definition-of-short_channel_id
	 */
	UtxoResult get_utxo(byte[] chain_hash, long short_channel_id);
}

/**
 * The `UtxoLookup` trait defines behavior for accessing on-chain UTXOs.
 */
public class UtxoLookup : CommonBase {
	internal bindings.LDKUtxoLookup bindings_instance;
	internal long instance_idx;

	internal UtxoLookup(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~UtxoLookup() {
		if (ptr != 0) { bindings.UtxoLookup_free(ptr); }
	}

	private class LDKUtxoLookupHolder { internal UtxoLookup held; }
	private class LDKUtxoLookupImpl : bindings.LDKUtxoLookup {
		internal LDKUtxoLookupImpl(UtxoLookupInterface arg, LDKUtxoLookupHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private UtxoLookupInterface arg;
		private LDKUtxoLookupHolder impl_holder;
		public long get_utxo(long _chain_hash, long _short_channel_id) {
			byte[] _chain_hash_conv = InternalUtils.decodeUint8Array(_chain_hash);
			UtxoResult ret = arg.get_utxo(_chain_hash_conv, _short_channel_id);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			if (impl_holder.held != null) { impl_holder.held.ptrs_to.AddLast(ret); };
			return result;
		}
	}

	/** Creates a new instance of UtxoLookup from a given implementation */
	public static UtxoLookup new_impl(UtxoLookupInterface arg) {
		LDKUtxoLookupHolder impl_holder = new LDKUtxoLookupHolder();
		LDKUtxoLookupImpl impl = new LDKUtxoLookupImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKUtxoLookup_new(impl);

		impl_holder.held = new UtxoLookup(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
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
		long ret = bindings.UtxoLookup_get_utxo(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(chain_hash, 32)), short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(chain_hash);
		GC.KeepAlive(short_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UtxoResult ret_hu_conv = org.ldk.structs.UtxoResult.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
