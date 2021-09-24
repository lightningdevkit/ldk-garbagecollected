package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Details about the balance(s) available for spending once the channel appears on chain.
 * 
 * See [`ChannelMonitor::get_claimable_balances`] for more details on when these will or will not
 * be provided.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Balance extends CommonBase {
	private Balance(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Balance_free(ptr); }
	}
	static Balance constr_from_ptr(long ptr) {
		bindings.LDKBalance raw_val = bindings.LDKBalance_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKBalance.ClaimableOnChannelClose.class) {
			return new ClaimableOnChannelClose(ptr, (bindings.LDKBalance.ClaimableOnChannelClose)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBalance.ClaimableAwaitingConfirmations.class) {
			return new ClaimableAwaitingConfirmations(ptr, (bindings.LDKBalance.ClaimableAwaitingConfirmations)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBalance.ContentiousClaimable.class) {
			return new ContentiousClaimable(ptr, (bindings.LDKBalance.ContentiousClaimable)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBalance.MaybeClaimableHTLCAwaitingTimeout.class) {
			return new MaybeClaimableHTLCAwaitingTimeout(ptr, (bindings.LDKBalance.MaybeClaimableHTLCAwaitingTimeout)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class ClaimableOnChannelClose extends Balance {
		/**
		 * The amount available to claim, in satoshis, excluding the on-chain fees which will be
		 * required to do so.
		*/
		public final long claimable_amount_satoshis;
		private ClaimableOnChannelClose(long ptr, bindings.LDKBalance.ClaimableOnChannelClose obj) {
			super(null, ptr);
			this.claimable_amount_satoshis = obj.claimable_amount_satoshis;
		}
	}
	public final static class ClaimableAwaitingConfirmations extends Balance {
		/**
		 * The amount available to claim, in satoshis, possibly excluding the on-chain fees which
		 * were spent in broadcasting the transaction.
		*/
		public final long claimable_amount_satoshis;
		/**
		 * The height at which an [`Event::SpendableOutputs`] event will be generated for this
		 * amount.
		*/
		public final int confirmation_height;
		private ClaimableAwaitingConfirmations(long ptr, bindings.LDKBalance.ClaimableAwaitingConfirmations obj) {
			super(null, ptr);
			this.claimable_amount_satoshis = obj.claimable_amount_satoshis;
			this.confirmation_height = obj.confirmation_height;
		}
	}
	public final static class ContentiousClaimable extends Balance {
		/**
		 * The amount available to claim, in satoshis, excluding the on-chain fees which will be
		 * required to do so.
		*/
		public final long claimable_amount_satoshis;
		/**
		 * The height at which the counterparty may be able to claim the balance if we have not
		 * done so.
		*/
		public final int timeout_height;
		private ContentiousClaimable(long ptr, bindings.LDKBalance.ContentiousClaimable obj) {
			super(null, ptr);
			this.claimable_amount_satoshis = obj.claimable_amount_satoshis;
			this.timeout_height = obj.timeout_height;
		}
	}
	public final static class MaybeClaimableHTLCAwaitingTimeout extends Balance {
		/**
		 * The amount available to claim, in satoshis, excluding the on-chain fees which will be
		 * required to do so.
		*/
		public final long claimable_amount_satoshis;
		/**
		 * The height at which we will be able to claim the balance if our counterparty has not
		 * done so.
		*/
		public final int claimable_height;
		private MaybeClaimableHTLCAwaitingTimeout(long ptr, bindings.LDKBalance.MaybeClaimableHTLCAwaitingTimeout obj) {
			super(null, ptr);
			this.claimable_amount_satoshis = obj.claimable_amount_satoshis;
			this.claimable_height = obj.claimable_height;
		}
	}
	/**
	 * Creates a copy of the Balance
	 */
	public Balance clone() {
		long ret = bindings.Balance_clone(this.ptr);
		if (ret < 1024) { return null; }
		Balance ret_hu_conv = Balance.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ClaimableOnChannelClose-variant Balance
	 */
	public static Balance claimable_on_channel_close(long claimable_amount_satoshis) {
		long ret = bindings.Balance_claimable_on_channel_close(claimable_amount_satoshis);
		if (ret < 1024) { return null; }
		Balance ret_hu_conv = Balance.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ClaimableAwaitingConfirmations-variant Balance
	 */
	public static Balance claimable_awaiting_confirmations(long claimable_amount_satoshis, int confirmation_height) {
		long ret = bindings.Balance_claimable_awaiting_confirmations(claimable_amount_satoshis, confirmation_height);
		if (ret < 1024) { return null; }
		Balance ret_hu_conv = Balance.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ContentiousClaimable-variant Balance
	 */
	public static Balance contentious_claimable(long claimable_amount_satoshis, int timeout_height) {
		long ret = bindings.Balance_contentious_claimable(claimable_amount_satoshis, timeout_height);
		if (ret < 1024) { return null; }
		Balance ret_hu_conv = Balance.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MaybeClaimableHTLCAwaitingTimeout-variant Balance
	 */
	public static Balance maybe_claimable_htlcawaiting_timeout(long claimable_amount_satoshis, int claimable_height) {
		long ret = bindings.Balance_maybe_claimable_htlcawaiting_timeout(claimable_amount_satoshis, claimable_height);
		if (ret < 1024) { return null; }
		Balance ret_hu_conv = Balance.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Balances contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(Balance b) {
		boolean ret = bindings.Balance_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

}
