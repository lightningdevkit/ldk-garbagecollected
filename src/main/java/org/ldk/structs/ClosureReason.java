package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * The reason the channel was closed. See individual variants more details.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ClosureReason extends CommonBase {
	private ClosureReason(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ClosureReason_free(ptr); }
	}
	static ClosureReason constr_from_ptr(long ptr) {
		bindings.LDKClosureReason raw_val = bindings.LDKClosureReason_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKClosureReason.CounterpartyForceClosed.class) {
			return new CounterpartyForceClosed(ptr, (bindings.LDKClosureReason.CounterpartyForceClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.HolderForceClosed.class) {
			return new HolderForceClosed(ptr, (bindings.LDKClosureReason.HolderForceClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.CooperativeClosure.class) {
			return new CooperativeClosure(ptr, (bindings.LDKClosureReason.CooperativeClosure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.CommitmentTxConfirmed.class) {
			return new CommitmentTxConfirmed(ptr, (bindings.LDKClosureReason.CommitmentTxConfirmed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.ProcessingError.class) {
			return new ProcessingError(ptr, (bindings.LDKClosureReason.ProcessingError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.DisconnectedPeer.class) {
			return new DisconnectedPeer(ptr, (bindings.LDKClosureReason.DisconnectedPeer)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.OutdatedChannelManager.class) {
			return new OutdatedChannelManager(ptr, (bindings.LDKClosureReason.OutdatedChannelManager)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class CounterpartyForceClosed extends ClosureReason {
		/**
		 * The error which the peer sent us.
		 * 
		 * The string should be sanitized before it is used (e.g emitted to logs
		 * or printed to stdout). Otherwise, a well crafted error message may exploit
		 * a security vulnerability in the terminal emulator or the logging subsystem.
		*/
		public final String peer_msg;
		private CounterpartyForceClosed(long ptr, bindings.LDKClosureReason.CounterpartyForceClosed obj) {
			super(null, ptr);
			this.peer_msg = obj.peer_msg;
		}
	}
	public final static class HolderForceClosed extends ClosureReason {
		private HolderForceClosed(long ptr, bindings.LDKClosureReason.HolderForceClosed obj) {
			super(null, ptr);
		}
	}
	public final static class CooperativeClosure extends ClosureReason {
		private CooperativeClosure(long ptr, bindings.LDKClosureReason.CooperativeClosure obj) {
			super(null, ptr);
		}
	}
	public final static class CommitmentTxConfirmed extends ClosureReason {
		private CommitmentTxConfirmed(long ptr, bindings.LDKClosureReason.CommitmentTxConfirmed obj) {
			super(null, ptr);
		}
	}
	public final static class ProcessingError extends ClosureReason {
		/**
		 * A developer-readable error message which we generated.
		*/
		public final String err;
		private ProcessingError(long ptr, bindings.LDKClosureReason.ProcessingError obj) {
			super(null, ptr);
			this.err = obj.err;
		}
	}
	public final static class DisconnectedPeer extends ClosureReason {
		private DisconnectedPeer(long ptr, bindings.LDKClosureReason.DisconnectedPeer obj) {
			super(null, ptr);
		}
	}
	public final static class OutdatedChannelManager extends ClosureReason {
		private OutdatedChannelManager(long ptr, bindings.LDKClosureReason.OutdatedChannelManager obj) {
			super(null, ptr);
		}
	}
	/**
	 * Creates a copy of the ClosureReason
	 */
	public ClosureReason clone() {
		long ret = bindings.ClosureReason_clone(this.ptr);
		if (ret < 1024) { return null; }
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyForceClosed-variant ClosureReason
	 */
	public static ClosureReason counterparty_force_closed(java.lang.String peer_msg) {
		long ret = bindings.ClosureReason_counterparty_force_closed(peer_msg);
		if (ret < 1024) { return null; }
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HolderForceClosed-variant ClosureReason
	 */
	public static ClosureReason holder_force_closed() {
		long ret = bindings.ClosureReason_holder_force_closed();
		if (ret < 1024) { return null; }
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CooperativeClosure-variant ClosureReason
	 */
	public static ClosureReason cooperative_closure() {
		long ret = bindings.ClosureReason_cooperative_closure();
		if (ret < 1024) { return null; }
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CommitmentTxConfirmed-variant ClosureReason
	 */
	public static ClosureReason commitment_tx_confirmed() {
		long ret = bindings.ClosureReason_commitment_tx_confirmed();
		if (ret < 1024) { return null; }
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProcessingError-variant ClosureReason
	 */
	public static ClosureReason processing_error(java.lang.String err) {
		long ret = bindings.ClosureReason_processing_error(err);
		if (ret < 1024) { return null; }
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DisconnectedPeer-variant ClosureReason
	 */
	public static ClosureReason disconnected_peer() {
		long ret = bindings.ClosureReason_disconnected_peer();
		if (ret < 1024) { return null; }
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutdatedChannelManager-variant ClosureReason
	 */
	public static ClosureReason outdated_channel_manager() {
		long ret = bindings.ClosureReason_outdated_channel_manager();
		if (ret < 1024) { return null; }
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ClosureReason object into a byte array which can be read by ClosureReason_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ClosureReason_write(this.ptr);
		return ret;
	}

}
