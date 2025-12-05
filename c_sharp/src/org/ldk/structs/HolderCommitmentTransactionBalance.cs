using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The claimable balance of a holder commitment transaction that has yet to be broadcast.
 */
public class HolderCommitmentTransactionBalance : CommonBase {
	internal HolderCommitmentTransactionBalance(object _dummy, long ptr) : base(ptr) { }
	~HolderCommitmentTransactionBalance() {
		if (ptr != 0) { bindings.HolderCommitmentTransactionBalance_free(ptr); }
	}

	/**
	 * The amount available to claim, in satoshis, excluding the on-chain fees which will be
	 * required to do so.
	 */
	public long get_amount_satoshis() {
		long ret = bindings.HolderCommitmentTransactionBalance_get_amount_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The amount available to claim, in satoshis, excluding the on-chain fees which will be
	 * required to do so.
	 */
	public void set_amount_satoshis(long val) {
		bindings.HolderCommitmentTransactionBalance_set_amount_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The transaction fee we pay for the closing commitment transaction. This amount is not
	 * included in the [`HolderCommitmentTransactionBalance::amount_satoshis`] value.
	 * This amount includes the sum of dust HTLCs on the commitment transaction, any elided anchors,
	 * as well as the sum of msat amounts rounded down from non-dust HTLCs.
	 * 
	 * Note that if this channel is inbound (and thus our counterparty pays the commitment
	 * transaction fee) this value will be zero. For [`ChannelMonitor`]s created prior to LDK
	 * 0.0.124, the channel is always treated as outbound (and thus this value is never zero).
	 */
	public long get_transaction_fee_satoshis() {
		long ret = bindings.HolderCommitmentTransactionBalance_get_transaction_fee_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The transaction fee we pay for the closing commitment transaction. This amount is not
	 * included in the [`HolderCommitmentTransactionBalance::amount_satoshis`] value.
	 * This amount includes the sum of dust HTLCs on the commitment transaction, any elided anchors,
	 * as well as the sum of msat amounts rounded down from non-dust HTLCs.
	 * 
	 * Note that if this channel is inbound (and thus our counterparty pays the commitment
	 * transaction fee) this value will be zero. For [`ChannelMonitor`]s created prior to LDK
	 * 0.0.124, the channel is always treated as outbound (and thus this value is never zero).
	 */
	public void set_transaction_fee_satoshis(long val) {
		bindings.HolderCommitmentTransactionBalance_set_transaction_fee_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new HolderCommitmentTransactionBalance given each field
	 */
	public static org.ldk.structs.HolderCommitmentTransactionBalance of(long amount_satoshis_arg, long transaction_fee_satoshis_arg) {
		long ret = bindings.HolderCommitmentTransactionBalance_new(amount_satoshis_arg, transaction_fee_satoshis_arg);
		GC.KeepAlive(amount_satoshis_arg);
		GC.KeepAlive(transaction_fee_satoshis_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HolderCommitmentTransactionBalance ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HolderCommitmentTransactionBalance(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.HolderCommitmentTransactionBalance_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the HolderCommitmentTransactionBalance
	 */
	public org.ldk.structs.HolderCommitmentTransactionBalance clone() {
		long ret = bindings.HolderCommitmentTransactionBalance_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HolderCommitmentTransactionBalance ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HolderCommitmentTransactionBalance(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two HolderCommitmentTransactionBalances contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.HolderCommitmentTransactionBalance b) {
		bool ret = bindings.HolderCommitmentTransactionBalance_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is HolderCommitmentTransactionBalance)) return false;
		return this.eq((HolderCommitmentTransactionBalance)o);
	}
}
} } }
