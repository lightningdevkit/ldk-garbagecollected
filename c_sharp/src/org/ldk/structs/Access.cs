using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The `Access` trait defines behavior for accessing chain data and state, such as blocks and
 * UTXOs.
 */
public class Access : CommonBase {
	internal readonly bindings.LDKAccess bindings_instance;
	internal Access(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Access(bindings.LDKAccess arg) : base(bindings.LDKAccess_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~Access() {
		if (ptr != 0) { bindings.Access_free(ptr); }
	}

	public interface AccessInterface {
		/**
		 * Returns the transaction output of a funding transaction encoded by [`short_channel_id`].
		 * Returns an error if `genesis_hash` is for a different chain or if such a transaction output
		 * is unknown.
		 * 
		 * [`short_channel_id`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#definition-of-short_channel_id
		 */
		Result_TxOutAccessErrorZ get_utxo(byte[] _genesis_hash, long _short_channel_id);
	}
	private class LDKAccessHolder { internal Access held; }
	private class LDKAccessImpl : bindings.LDKAccess {
		internal LDKAccessImpl(AccessInterface arg, LDKAccessHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private AccessInterface arg;
		private LDKAccessHolder impl_holder;
		public long get_utxo(byte[] _genesis_hash, long _short_channel_id) {
			Result_TxOutAccessErrorZ ret = arg.get_utxo(_genesis_hash, _short_channel_id);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}
	public static Access new_impl(AccessInterface arg) {
		LDKAccessHolder impl_holder = new LDKAccessHolder();
		impl_holder.held = new Access(new LDKAccessImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Returns the transaction output of a funding transaction encoded by [`short_channel_id`].
	 * Returns an error if `genesis_hash` is for a different chain or if such a transaction output
	 * is unknown.
	 * 
	 * [`short_channel_id`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#definition-of-short_channel_id
	 */
	public Result_TxOutAccessErrorZ get_utxo(byte[] genesis_hash, long short_channel_id) {
		long ret = bindings.Access_get_utxo(this.ptr, InternalUtils.check_arr_len(genesis_hash, 32), short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(genesis_hash);
		GC.KeepAlive(short_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
