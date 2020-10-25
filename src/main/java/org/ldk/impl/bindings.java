package org.ldk.impl;
import org.ldk.enums.*;

public class bindings {
	public static class VecOrSliceDef {
		public long dataptr;
		public long datalen;
		public long stride;
		public VecOrSliceDef(long dataptr, long datalen, long stride) {
			this.dataptr = dataptr; this.datalen = datalen; this.stride = stride;
		}
	}
	static {
		System.loadLibrary("lightningjni");
		init(java.lang.Enum.class, VecOrSliceDef.class);
		init_class_cache();
	}
	static native void init(java.lang.Class c, java.lang.Class slicedef);
	static native void init_class_cache();

	public static native boolean deref_bool(long ptr);
	public static native long deref_long(long ptr);
	public static native void free_heap_ptr(long ptr);
	public static native byte[] read_bytes(long ptr, long len);
	public static native byte[] get_u8_slice_bytes(long slice_ptr);
	public static native long bytes_to_u8_vec(byte[] bytes);
	public static native long new_txpointer_copy_data(byte[] txdata);
	public static native void txpointer_free(long ptr);
	public static native byte[] txpointer_get_buffer(long ptr);
	public static native long vec_slice_len(long vec);
	public static native long new_empty_slice_vec();

	static { LDKAccessError.values(); /* Force enum statics to run */ }
	static { LDKChannelMonitorUpdateErr.values(); /* Force enum statics to run */ }
	static { LDKConfirmationTarget.values(); /* Force enum statics to run */ }
	static { LDKLevel.values(); /* Force enum statics to run */ }
	static { LDKNetwork.values(); /* Force enum statics to run */ }
	static { LDKSecp256k1Error.values(); /* Force enum statics to run */ }
	public static native VecOrSliceDef LDKCVecTempl_u8_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_u8_new(byte[] elems);
	public static native long LDKC2TupleTempl_usize__Transaction_new(long a, byte[] b);
	public static native long LDKC2Tuple_usizeTransactionZ_get_a(long ptr);
	public static native byte[] LDKC2Tuple_usizeTransactionZ_get_b(long ptr);
	public static native boolean LDKCResult_NoneChannelMonitorUpdateErrZ_result_ok(long arg);
	public static native byte LDKCResult_NoneChannelMonitorUpdateErrZ_get_ok(long arg);
	public static native LDKChannelMonitorUpdateErr LDKCResult_NoneChannelMonitorUpdateErrZ_get_err(long arg);
	public static native boolean LDKCResult_NoneMonitorUpdateErrorZ_result_ok(long arg);
	public static native byte LDKCResult_NoneMonitorUpdateErrorZ_get_ok(long arg);
	public static native long LDKCResult_NoneMonitorUpdateErrorZ_get_err(long arg);
	public static native long LDKC2TupleTempl_OutPoint__CVec_u8Z_new(long a, byte[] b);
	public static native long LDKC2Tuple_OutPointScriptZ_get_a(long ptr);
	public static native byte[] LDKC2Tuple_OutPointScriptZ_get_b(long ptr);
	public static native VecOrSliceDef LDKCVecTempl_TxOut_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_TxOut_new(long[] elems);
	public static native long LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut_new(byte[] a, long[] b);
	public static native byte[] LDKC2Tuple_TxidCVec_TxOutZZ_get_a(long ptr);
	public static native long[] LDKC2Tuple_TxidCVec_TxOutZZ_get_b(long ptr);
	public static native long LDKC2TupleTempl_u64__u64_new(long a, long b);
	public static native long LDKC2Tuple_u64u64Z_get_a(long ptr);
	public static native long LDKC2Tuple_u64u64Z_get_b(long ptr);
	public static native VecOrSliceDef LDKCVecTempl_Signature_arr_info(long vec_ptr);
	public static native long LDKC2TupleTempl_Signature__CVecTempl_Signature_new(byte[] a, byte[][] b);
	public static native byte[] LDKC2Tuple_SignatureCVec_SignatureZZ_get_a(long ptr);
	public static native byte[][] LDKC2Tuple_SignatureCVec_SignatureZZ_get_b(long ptr);
	public static native boolean LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_result_ok(long arg);
	public static native long LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_ok(long arg);
	public static native byte LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_err(long arg);
	public static native boolean LDKCResult_SignatureNoneZ_result_ok(long arg);
	public static native byte[] LDKCResult_SignatureNoneZ_get_ok(long arg);
	public static native byte LDKCResult_SignatureNoneZ_get_err(long arg);
	public static native boolean LDKCResult_CVec_SignatureZNoneZ_result_ok(long arg);
	public static native byte[][] LDKCResult_CVec_SignatureZNoneZ_get_ok(long arg);
	public static native byte LDKCResult_CVec_SignatureZNoneZ_get_err(long arg);
	public static class LDKAPIError {
		private LDKAPIError() {}
		public final static class APIMisuseError extends LDKAPIError {
			public byte[] err;
			APIMisuseError(byte[] err) { this.err = err; }
		}
		public final static class FeeRateTooHigh extends LDKAPIError {
			public byte[] err;
			public int feerate;
			FeeRateTooHigh(byte[] err, int feerate) { this.err = err; this.feerate = feerate; }
		}
		public final static class RouteError extends LDKAPIError {
			public String err;
			RouteError(String err) { this.err = err; }
		}
		public final static class ChannelUnavailable extends LDKAPIError {
			public byte[] err;
			ChannelUnavailable(byte[] err) { this.err = err; }
		}
		public final static class MonitorUpdateFailed extends LDKAPIError {
		}
		static native void init();
	}
	static { LDKAPIError.init(); }
	public static native LDKAPIError LDKAPIError_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_NoneAPIErrorZ_result_ok(long arg);
	public static native byte LDKCResult_NoneAPIErrorZ_get_ok(long arg);
	public static native long LDKCResult_NoneAPIErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NonePaymentSendFailureZ_result_ok(long arg);
	public static native byte LDKCResult_NonePaymentSendFailureZ_get_ok(long arg);
	public static native long LDKCResult_NonePaymentSendFailureZ_get_err(long arg);
	public static native long LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate_new(long a, long b, long c);
	public static native long LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(long ptr);
	public static native long LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(long ptr);
	public static native long LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(long ptr);
	public static native boolean LDKCResult_NonePeerHandleErrorZ_result_ok(long arg);
	public static native byte LDKCResult_NonePeerHandleErrorZ_get_ok(long arg);
	public static native long LDKCResult_NonePeerHandleErrorZ_get_err(long arg);
	public static native long LDKC2TupleTempl_HTLCOutputInCommitment__Signature_new(long a, byte[] b);
	public static native long LDKC2Tuple_HTLCOutputInCommitmentSignatureZ_get_a(long ptr);
	public static native byte[] LDKC2Tuple_HTLCOutputInCommitmentSignatureZ_get_b(long ptr);
	public static class LDKSpendableOutputDescriptor {
		private LDKSpendableOutputDescriptor() {}
		public final static class StaticOutput extends LDKSpendableOutputDescriptor {
			public long outpoint;
			public long output;
			StaticOutput(long outpoint, long output) { this.outpoint = outpoint; this.output = output; }
		}
		public final static class DynamicOutputP2WSH extends LDKSpendableOutputDescriptor {
			public long outpoint;
			public byte[] per_commitment_point;
			public short to_self_delay;
			public long output;
			public long key_derivation_params;
			public byte[] revocation_pubkey;
			DynamicOutputP2WSH(long outpoint, byte[] per_commitment_point, short to_self_delay, long output, long key_derivation_params, byte[] revocation_pubkey) { this.outpoint = outpoint; this.per_commitment_point = per_commitment_point; this.to_self_delay = to_self_delay; this.output = output; this.key_derivation_params = key_derivation_params; this.revocation_pubkey = revocation_pubkey; }
		}
		public final static class StaticOutputCounterpartyPayment extends LDKSpendableOutputDescriptor {
			public long outpoint;
			public long output;
			public long key_derivation_params;
			StaticOutputCounterpartyPayment(long outpoint, long output, long key_derivation_params) { this.outpoint = outpoint; this.output = output; this.key_derivation_params = key_derivation_params; }
		}
		static native void init();
	}
	static { LDKSpendableOutputDescriptor.init(); }
	public static native LDKSpendableOutputDescriptor LDKSpendableOutputDescriptor_ref_from_ptr(long ptr);
	public static native VecOrSliceDef LDKCVecTempl_SpendableOutputDescriptor_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_SpendableOutputDescriptor_new(long[] elems);
	public static class LDKEvent {
		private LDKEvent() {}
		public final static class FundingGenerationReady extends LDKEvent {
			public byte[] temporary_channel_id;
			public long channel_value_satoshis;
			public byte[] output_script;
			public long user_channel_id;
			FundingGenerationReady(byte[] temporary_channel_id, long channel_value_satoshis, byte[] output_script, long user_channel_id) { this.temporary_channel_id = temporary_channel_id; this.channel_value_satoshis = channel_value_satoshis; this.output_script = output_script; this.user_channel_id = user_channel_id; }
		}
		public final static class FundingBroadcastSafe extends LDKEvent {
			public long funding_txo;
			public long user_channel_id;
			FundingBroadcastSafe(long funding_txo, long user_channel_id) { this.funding_txo = funding_txo; this.user_channel_id = user_channel_id; }
		}
		public final static class PaymentReceived extends LDKEvent {
			public byte[] payment_hash;
			public byte[] payment_secret;
			public long amt;
			PaymentReceived(byte[] payment_hash, byte[] payment_secret, long amt) { this.payment_hash = payment_hash; this.payment_secret = payment_secret; this.amt = amt; }
		}
		public final static class PaymentSent extends LDKEvent {
			public byte[] payment_preimage;
			PaymentSent(byte[] payment_preimage) { this.payment_preimage = payment_preimage; }
		}
		public final static class PaymentFailed extends LDKEvent {
			public byte[] payment_hash;
			public boolean rejected_by_dest;
			PaymentFailed(byte[] payment_hash, boolean rejected_by_dest) { this.payment_hash = payment_hash; this.rejected_by_dest = rejected_by_dest; }
		}
		public final static class PendingHTLCsForwardable extends LDKEvent {
			public long time_forwardable;
			PendingHTLCsForwardable(long time_forwardable) { this.time_forwardable = time_forwardable; }
		}
		public final static class SpendableOutputs extends LDKEvent {
			public long[] outputs;
			SpendableOutputs(long[] outputs) { this.outputs = outputs; }
		}
		static native void init();
	}
	static { LDKEvent.init(); }
	public static native LDKEvent LDKEvent_ref_from_ptr(long ptr);
	public static class LDKErrorAction {
		private LDKErrorAction() {}
		public final static class DisconnectPeer extends LDKErrorAction {
			public long msg;
			DisconnectPeer(long msg) { this.msg = msg; }
		}
		public final static class IgnoreError extends LDKErrorAction {
		}
		public final static class SendErrorMessage extends LDKErrorAction {
			public long msg;
			SendErrorMessage(long msg) { this.msg = msg; }
		}
		static native void init();
	}
	static { LDKErrorAction.init(); }
	public static native LDKErrorAction LDKErrorAction_ref_from_ptr(long ptr);
	public static class LDKHTLCFailChannelUpdate {
		private LDKHTLCFailChannelUpdate() {}
		public final static class ChannelUpdateMessage extends LDKHTLCFailChannelUpdate {
			public long msg;
			ChannelUpdateMessage(long msg) { this.msg = msg; }
		}
		public final static class ChannelClosed extends LDKHTLCFailChannelUpdate {
			public long short_channel_id;
			public boolean is_permanent;
			ChannelClosed(long short_channel_id, boolean is_permanent) { this.short_channel_id = short_channel_id; this.is_permanent = is_permanent; }
		}
		public final static class NodeFailure extends LDKHTLCFailChannelUpdate {
			public byte[] node_id;
			public boolean is_permanent;
			NodeFailure(byte[] node_id, boolean is_permanent) { this.node_id = node_id; this.is_permanent = is_permanent; }
		}
		static native void init();
	}
	static { LDKHTLCFailChannelUpdate.init(); }
	public static native LDKHTLCFailChannelUpdate LDKHTLCFailChannelUpdate_ref_from_ptr(long ptr);
	public static class LDKMessageSendEvent {
		private LDKMessageSendEvent() {}
		public final static class SendAcceptChannel extends LDKMessageSendEvent {
			public byte[] node_id;
			public long msg;
			SendAcceptChannel(byte[] node_id, long msg) { this.node_id = node_id; this.msg = msg; }
		}
		public final static class SendOpenChannel extends LDKMessageSendEvent {
			public byte[] node_id;
			public long msg;
			SendOpenChannel(byte[] node_id, long msg) { this.node_id = node_id; this.msg = msg; }
		}
		public final static class SendFundingCreated extends LDKMessageSendEvent {
			public byte[] node_id;
			public long msg;
			SendFundingCreated(byte[] node_id, long msg) { this.node_id = node_id; this.msg = msg; }
		}
		public final static class SendFundingSigned extends LDKMessageSendEvent {
			public byte[] node_id;
			public long msg;
			SendFundingSigned(byte[] node_id, long msg) { this.node_id = node_id; this.msg = msg; }
		}
		public final static class SendFundingLocked extends LDKMessageSendEvent {
			public byte[] node_id;
			public long msg;
			SendFundingLocked(byte[] node_id, long msg) { this.node_id = node_id; this.msg = msg; }
		}
		public final static class SendAnnouncementSignatures extends LDKMessageSendEvent {
			public byte[] node_id;
			public long msg;
			SendAnnouncementSignatures(byte[] node_id, long msg) { this.node_id = node_id; this.msg = msg; }
		}
		public final static class UpdateHTLCs extends LDKMessageSendEvent {
			public byte[] node_id;
			public long updates;
			UpdateHTLCs(byte[] node_id, long updates) { this.node_id = node_id; this.updates = updates; }
		}
		public final static class SendRevokeAndACK extends LDKMessageSendEvent {
			public byte[] node_id;
			public long msg;
			SendRevokeAndACK(byte[] node_id, long msg) { this.node_id = node_id; this.msg = msg; }
		}
		public final static class SendClosingSigned extends LDKMessageSendEvent {
			public byte[] node_id;
			public long msg;
			SendClosingSigned(byte[] node_id, long msg) { this.node_id = node_id; this.msg = msg; }
		}
		public final static class SendShutdown extends LDKMessageSendEvent {
			public byte[] node_id;
			public long msg;
			SendShutdown(byte[] node_id, long msg) { this.node_id = node_id; this.msg = msg; }
		}
		public final static class SendChannelReestablish extends LDKMessageSendEvent {
			public byte[] node_id;
			public long msg;
			SendChannelReestablish(byte[] node_id, long msg) { this.node_id = node_id; this.msg = msg; }
		}
		public final static class BroadcastChannelAnnouncement extends LDKMessageSendEvent {
			public long msg;
			public long update_msg;
			BroadcastChannelAnnouncement(long msg, long update_msg) { this.msg = msg; this.update_msg = update_msg; }
		}
		public final static class BroadcastNodeAnnouncement extends LDKMessageSendEvent {
			public long msg;
			BroadcastNodeAnnouncement(long msg) { this.msg = msg; }
		}
		public final static class BroadcastChannelUpdate extends LDKMessageSendEvent {
			public long msg;
			BroadcastChannelUpdate(long msg) { this.msg = msg; }
		}
		public final static class HandleError extends LDKMessageSendEvent {
			public byte[] node_id;
			public long action;
			HandleError(byte[] node_id, long action) { this.node_id = node_id; this.action = action; }
		}
		public final static class PaymentFailureNetworkUpdate extends LDKMessageSendEvent {
			public long update;
			PaymentFailureNetworkUpdate(long update) { this.update = update; }
		}
		static native void init();
	}
	static { LDKMessageSendEvent.init(); }
	public static native LDKMessageSendEvent LDKMessageSendEvent_ref_from_ptr(long ptr);
	public static native VecOrSliceDef LDKCVecTempl_MessageSendEvent_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_MessageSendEvent_new(long[] elems);
	public interface LDKMessageSendEventsProvider {
		 long[] get_and_clear_pending_msg_events();
	}
	public static native long LDKMessageSendEventsProvider_new(LDKMessageSendEventsProvider impl);
	public static native LDKMessageSendEventsProvider LDKMessageSendEventsProvider_get_obj_from_jcalls(long val);
	// LDKCVec_MessageSendEventZ MessageSendEventsProvider_get_and_clear_pending_msg_events LDKMessageSendEventsProvider* this_arg
	public static native long[] MessageSendEventsProvider_get_and_clear_pending_msg_events(long this_arg);
	public static native VecOrSliceDef LDKCVecTempl_Event_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_Event_new(long[] elems);
	public interface LDKEventsProvider {
		 long[] get_and_clear_pending_events();
	}
	public static native long LDKEventsProvider_new(LDKEventsProvider impl);
	public static native LDKEventsProvider LDKEventsProvider_get_obj_from_jcalls(long val);
	// LDKCVec_EventZ EventsProvider_get_and_clear_pending_events LDKEventsProvider* this_arg
	public static native long[] EventsProvider_get_and_clear_pending_events(long this_arg);
	public interface LDKLogger {
		 void log(String record);
	}
	public static native long LDKLogger_new(LDKLogger impl);
	public static native LDKLogger LDKLogger_get_obj_from_jcalls(long val);
	public static native boolean LDKCResult_TxOutAccessErrorZ_result_ok(long arg);
	public static native long LDKCResult_TxOutAccessErrorZ_get_ok(long arg);
	public static native LDKAccessError LDKCResult_TxOutAccessErrorZ_get_err(long arg);
	public interface LDKAccess {
		 long get_utxo(byte[] genesis_hash, long short_channel_id);
	}
	public static native long LDKAccess_new(LDKAccess impl);
	public static native LDKAccess LDKAccess_get_obj_from_jcalls(long val);
	// LDKCResult_TxOutAccessErrorZ Access_get_utxo LDKAccess* this_arg, const uint8_t (*genesis_hash)[32], uint64_t short_channel_id
	public static native long Access_get_utxo(long this_arg, byte[] genesis_hash, long short_channel_id);
	public static native long[] LDKCVecTempl_HTLCOutputInCommitment_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_HTLCOutputInCommitment_new(long[] elems);
	public interface LDKChannelKeys {
		 byte[] get_per_commitment_point(long idx);
		 byte[] release_commitment_secret(long idx);
		 long key_derivation_params();
		 long sign_counterparty_commitment(int feerate_per_kw, byte[] commitment_tx, long keys, long[] htlcs);
		 long sign_holder_commitment(long holder_commitment_tx);
		 long sign_holder_commitment_htlc_transactions(long holder_commitment_tx);
		 long sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, long htlc);
		 long sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, long htlc);
		 long sign_closing_transaction(byte[] closing_tx);
		 long sign_channel_announcement(long msg);
		 void on_accept(long channel_points, short counterparty_selected_contest_delay, short holder_selected_contest_delay);
	}
	public static native long LDKChannelKeys_new(LDKChannelKeys impl, long pubkeys);
	public static native LDKChannelKeys LDKChannelKeys_get_obj_from_jcalls(long val);
	// LDKPublicKey ChannelKeys_get_per_commitment_point LDKChannelKeys* this_arg, uint64_t idx
	public static native byte[] ChannelKeys_get_per_commitment_point(long this_arg, long idx);
	// LDKThirtyTwoBytes ChannelKeys_release_commitment_secret LDKChannelKeys* this_arg, uint64_t idx
	public static native byte[] ChannelKeys_release_commitment_secret(long this_arg, long idx);
	// LDKC2Tuple_u64u64Z ChannelKeys_key_derivation_params LDKChannelKeys* this_arg
	public static native long ChannelKeys_key_derivation_params(long this_arg);
	// LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ ChannelKeys_sign_counterparty_commitment LDKChannelKeys* this_arg, uint32_t feerate_per_kw, LDKTransaction commitment_tx, const LDKPreCalculatedTxCreationKeys *keys, LDKCVec_HTLCOutputInCommitmentZ htlcs
	public static native long ChannelKeys_sign_counterparty_commitment(long this_arg, int feerate_per_kw, byte[] commitment_tx, long keys, long[] htlcs);
	// LDKCResult_SignatureNoneZ ChannelKeys_sign_holder_commitment LDKChannelKeys* this_arg, const LDKHolderCommitmentTransaction *holder_commitment_tx
	public static native long ChannelKeys_sign_holder_commitment(long this_arg, long holder_commitment_tx);
	// LDKCResult_CVec_SignatureZNoneZ ChannelKeys_sign_holder_commitment_htlc_transactions LDKChannelKeys* this_arg, const LDKHolderCommitmentTransaction *holder_commitment_tx
	public static native long ChannelKeys_sign_holder_commitment_htlc_transactions(long this_arg, long holder_commitment_tx);
	// LDKCResult_SignatureNoneZ ChannelKeys_sign_justice_transaction LDKChannelKeys* this_arg, LDKTransaction justice_tx, uintptr_t input, uint64_t amount, const uint8_t (*per_commitment_key)[32], const LDKHTLCOutputInCommitment *htlc
	public static native long ChannelKeys_sign_justice_transaction(long this_arg, byte[] justice_tx, long input, long amount, byte[] per_commitment_key, long htlc);
	// LDKCResult_SignatureNoneZ ChannelKeys_sign_counterparty_htlc_transaction LDKChannelKeys* this_arg, LDKTransaction htlc_tx, uintptr_t input, uint64_t amount, LDKPublicKey per_commitment_point, const LDKHTLCOutputInCommitment *htlc
	public static native long ChannelKeys_sign_counterparty_htlc_transaction(long this_arg, byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, long htlc);
	// LDKCResult_SignatureNoneZ ChannelKeys_sign_closing_transaction LDKChannelKeys* this_arg, LDKTransaction closing_tx
	public static native long ChannelKeys_sign_closing_transaction(long this_arg, byte[] closing_tx);
	// LDKCResult_SignatureNoneZ ChannelKeys_sign_channel_announcement LDKChannelKeys* this_arg, const LDKUnsignedChannelAnnouncement *msg
	public static native long ChannelKeys_sign_channel_announcement(long this_arg, long msg);
	// void ChannelKeys_on_accept LDKChannelKeys* this_arg, const LDKChannelPublicKeys *channel_points, uint16_t counterparty_selected_contest_delay, uint16_t holder_selected_contest_delay
	public static native void ChannelKeys_on_accept(long this_arg, long channel_points, short counterparty_selected_contest_delay, short holder_selected_contest_delay);
	// LDKChannelPublicKeys ChannelKeys_get_pubkeys LDKChannelKeys* this_arg
	public static native long ChannelKeys_get_pubkeys(long this_arg);
	public static native long[] LDKCVecTempl_MonitorEvent_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_MonitorEvent_new(long[] elems);
	public interface LDKWatch {
		 long watch_channel(long funding_txo, long monitor);
		 long update_channel(long funding_txo, long update);
		 long[] release_pending_monitor_events();
	}
	public static native long LDKWatch_new(LDKWatch impl);
	public static native LDKWatch LDKWatch_get_obj_from_jcalls(long val);
	// LDKCResult_NoneChannelMonitorUpdateErrZ Watch_watch_channel LDKWatch* this_arg, LDKOutPoint funding_txo, LDKChannelMonitor monitor
	public static native long Watch_watch_channel(long this_arg, long funding_txo, long monitor);
	// LDKCResult_NoneChannelMonitorUpdateErrZ Watch_update_channel LDKWatch* this_arg, LDKOutPoint funding_txo, LDKChannelMonitorUpdate update
	public static native long Watch_update_channel(long this_arg, long funding_txo, long update);
	// LDKCVec_MonitorEventZ Watch_release_pending_monitor_events LDKWatch* this_arg
	public static native long[] Watch_release_pending_monitor_events(long this_arg);
	public interface LDKFilter {
		 void register_tx(byte[] txid, byte[] script_pubkey);
		 void register_output(long outpoint, byte[] script_pubkey);
	}
	public static native long LDKFilter_new(LDKFilter impl);
	public static native LDKFilter LDKFilter_get_obj_from_jcalls(long val);
	// void Filter_register_tx LDKFilter* this_arg, const uint8_t (*txid)[32], LDKu8slice script_pubkey
	public static native void Filter_register_tx(long this_arg, byte[] txid, byte[] script_pubkey);
	// void Filter_register_output LDKFilter* this_arg, const LDKOutPoint *outpoint, LDKu8slice script_pubkey
	public static native void Filter_register_output(long this_arg, long outpoint, byte[] script_pubkey);
	public interface LDKBroadcasterInterface {
		 void broadcast_transaction(byte[] tx);
	}
	public static native long LDKBroadcasterInterface_new(LDKBroadcasterInterface impl);
	public static native LDKBroadcasterInterface LDKBroadcasterInterface_get_obj_from_jcalls(long val);
	// void BroadcasterInterface_broadcast_transaction LDKBroadcasterInterface* this_arg, LDKTransaction tx
	public static native void BroadcasterInterface_broadcast_transaction(long this_arg, byte[] tx);
	public interface LDKFeeEstimator {
		 int get_est_sat_per_1000_weight(LDKConfirmationTarget confirmation_target);
	}
	public static native long LDKFeeEstimator_new(LDKFeeEstimator impl);
	public static native LDKFeeEstimator LDKFeeEstimator_get_obj_from_jcalls(long val);
	// uint32_t FeeEstimator_get_est_sat_per_1000_weight LDKFeeEstimator* this_arg, LDKConfirmationTarget confirmation_target
	public static native int FeeEstimator_get_est_sat_per_1000_weight(long this_arg, LDKConfirmationTarget confirmation_target);
	public static native VecOrSliceDef LDKCVecTempl_C2TupleTempl_usize__Transaction_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_C2TupleTempl_usize__Transaction_new(long[] elems);
	public static native VecOrSliceDef LDKCVecTempl_Transaction_arr_info(long vec_ptr);
	public static native VecOrSliceDef LDKCVecTempl_C2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_C2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut_new(long[] elems);
	public interface LDKKeysInterface {
		 byte[] get_node_secret();
		 byte[] get_destination_script();
		 byte[] get_shutdown_pubkey();
		 long get_channel_keys(boolean inbound, long channel_value_satoshis);
		 byte[] get_secure_random_bytes();
	}
	public static native long LDKKeysInterface_new(LDKKeysInterface impl);
	public static native LDKKeysInterface LDKKeysInterface_get_obj_from_jcalls(long val);
	// LDKSecretKey KeysInterface_get_node_secret LDKKeysInterface* this_arg
	public static native byte[] KeysInterface_get_node_secret(long this_arg);
	// LDKCVec_u8Z KeysInterface_get_destination_script LDKKeysInterface* this_arg
	public static native byte[] KeysInterface_get_destination_script(long this_arg);
	// LDKPublicKey KeysInterface_get_shutdown_pubkey LDKKeysInterface* this_arg
	public static native byte[] KeysInterface_get_shutdown_pubkey(long this_arg);
	// LDKChannelKeys KeysInterface_get_channel_keys LDKKeysInterface* this_arg, bool inbound, uint64_t channel_value_satoshis
	public static native long KeysInterface_get_channel_keys(long this_arg, boolean inbound, long channel_value_satoshis);
	// LDKThirtyTwoBytes KeysInterface_get_secure_random_bytes LDKKeysInterface* this_arg
	public static native byte[] KeysInterface_get_secure_random_bytes(long this_arg);
	public static native long[] LDKCVecTempl_ChannelDetails_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_ChannelDetails_new(long[] elems);
	public static class LDKNetAddress {
		private LDKNetAddress() {}
		public final static class IPv4 extends LDKNetAddress {
			public byte[] addr;
			public short port;
			IPv4(byte[] addr, short port) { this.addr = addr; this.port = port; }
		}
		public final static class IPv6 extends LDKNetAddress {
			public byte[] addr;
			public short port;
			IPv6(byte[] addr, short port) { this.addr = addr; this.port = port; }
		}
		public final static class OnionV2 extends LDKNetAddress {
			public byte[] addr;
			public short port;
			OnionV2(byte[] addr, short port) { this.addr = addr; this.port = port; }
		}
		public final static class OnionV3 extends LDKNetAddress {
			public byte[] ed25519_pubkey;
			public short checksum;
			public byte version;
			public short port;
			OnionV3(byte[] ed25519_pubkey, short checksum, byte version, short port) { this.ed25519_pubkey = ed25519_pubkey; this.checksum = checksum; this.version = version; this.port = port; }
		}
		static native void init();
	}
	static { LDKNetAddress.init(); }
	public static native LDKNetAddress LDKNetAddress_ref_from_ptr(long ptr);
	public static native VecOrSliceDef LDKCVecTempl_NetAddress_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_NetAddress_new(long[] elems);
	public interface LDKChannelMessageHandler {
		 void handle_open_channel(byte[] their_node_id, long their_features, long msg);
		 void handle_accept_channel(byte[] their_node_id, long their_features, long msg);
		 void handle_funding_created(byte[] their_node_id, long msg);
		 void handle_funding_signed(byte[] their_node_id, long msg);
		 void handle_funding_locked(byte[] their_node_id, long msg);
		 void handle_shutdown(byte[] their_node_id, long msg);
		 void handle_closing_signed(byte[] their_node_id, long msg);
		 void handle_update_add_htlc(byte[] their_node_id, long msg);
		 void handle_update_fulfill_htlc(byte[] their_node_id, long msg);
		 void handle_update_fail_htlc(byte[] their_node_id, long msg);
		 void handle_update_fail_malformed_htlc(byte[] their_node_id, long msg);
		 void handle_commitment_signed(byte[] their_node_id, long msg);
		 void handle_revoke_and_ack(byte[] their_node_id, long msg);
		 void handle_update_fee(byte[] their_node_id, long msg);
		 void handle_announcement_signatures(byte[] their_node_id, long msg);
		 void peer_disconnected(byte[] their_node_id, boolean no_connection_possible);
		 void peer_connected(byte[] their_node_id, long msg);
		 void handle_channel_reestablish(byte[] their_node_id, long msg);
		 void handle_error(byte[] their_node_id, long msg);
	}
	public static native long LDKChannelMessageHandler_new(LDKChannelMessageHandler impl, LDKMessageSendEventsProvider MessageSendEventsProvider);
	public static native LDKChannelMessageHandler LDKChannelMessageHandler_get_obj_from_jcalls(long val);
	// void ChannelMessageHandler_handle_open_channel LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKOpenChannel *msg
	public static native void ChannelMessageHandler_handle_open_channel(long this_arg, byte[] their_node_id, long their_features, long msg);
	// void ChannelMessageHandler_handle_accept_channel LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKAcceptChannel *msg
	public static native void ChannelMessageHandler_handle_accept_channel(long this_arg, byte[] their_node_id, long their_features, long msg);
	// void ChannelMessageHandler_handle_funding_created LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKFundingCreated *msg
	public static native void ChannelMessageHandler_handle_funding_created(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_funding_signed LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKFundingSigned *msg
	public static native void ChannelMessageHandler_handle_funding_signed(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_funding_locked LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKFundingLocked *msg
	public static native void ChannelMessageHandler_handle_funding_locked(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_shutdown LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKShutdown *msg
	public static native void ChannelMessageHandler_handle_shutdown(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_closing_signed LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKClosingSigned *msg
	public static native void ChannelMessageHandler_handle_closing_signed(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_update_add_htlc LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKUpdateAddHTLC *msg
	public static native void ChannelMessageHandler_handle_update_add_htlc(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_update_fulfill_htlc LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKUpdateFulfillHTLC *msg
	public static native void ChannelMessageHandler_handle_update_fulfill_htlc(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_update_fail_htlc LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailHTLC *msg
	public static native void ChannelMessageHandler_handle_update_fail_htlc(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_update_fail_malformed_htlc LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailMalformedHTLC *msg
	public static native void ChannelMessageHandler_handle_update_fail_malformed_htlc(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_commitment_signed LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKCommitmentSigned *msg
	public static native void ChannelMessageHandler_handle_commitment_signed(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_revoke_and_ack LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKRevokeAndACK *msg
	public static native void ChannelMessageHandler_handle_revoke_and_ack(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_update_fee LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKUpdateFee *msg
	public static native void ChannelMessageHandler_handle_update_fee(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_announcement_signatures LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKAnnouncementSignatures *msg
	public static native void ChannelMessageHandler_handle_announcement_signatures(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_peer_disconnected LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, bool no_connection_possible
	public static native void ChannelMessageHandler_peer_disconnected(long this_arg, byte[] their_node_id, boolean no_connection_possible);
	// void ChannelMessageHandler_peer_connected LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKInit *msg
	public static native void ChannelMessageHandler_peer_connected(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_channel_reestablish LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKChannelReestablish *msg
	public static native void ChannelMessageHandler_handle_channel_reestablish(long this_arg, byte[] their_node_id, long msg);
	// void ChannelMessageHandler_handle_error LDKChannelMessageHandler* this_arg, LDKPublicKey their_node_id, const LDKErrorMessage *msg
	public static native void ChannelMessageHandler_handle_error(long this_arg, byte[] their_node_id, long msg);
	public static native long[] LDKCVecTempl_ChannelMonitor_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_ChannelMonitor_new(long[] elems);
	public static native VecOrSliceDef LDKCVecTempl_u64_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_u64_new(long[] elems);
	public static native long[] LDKCVecTempl_UpdateAddHTLC_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_UpdateAddHTLC_new(long[] elems);
	public static native long[] LDKCVecTempl_UpdateFulfillHTLC_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_UpdateFulfillHTLC_new(long[] elems);
	public static native long[] LDKCVecTempl_UpdateFailHTLC_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_UpdateFailHTLC_new(long[] elems);
	public static native long[] LDKCVecTempl_UpdateFailMalformedHTLC_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_UpdateFailMalformedHTLC_new(long[] elems);
	public static native boolean LDKCResult_boolLightningErrorZ_result_ok(long arg);
	public static native boolean LDKCResult_boolLightningErrorZ_get_ok(long arg);
	public static native long LDKCResult_boolLightningErrorZ_get_err(long arg);
	public static native VecOrSliceDef LDKCVecTempl_C3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_C3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate_new(long[] elems);
	public static native long[] LDKCVecTempl_NodeAnnouncement_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_NodeAnnouncement_new(long[] elems);
	public interface LDKRoutingMessageHandler {
		 long handle_node_announcement(long msg);
		 long handle_channel_announcement(long msg);
		 long handle_channel_update(long msg);
		 void handle_htlc_fail_channel_update(long update);
		 long[] get_next_channel_announcements(long starting_point, byte batch_amount);
		 long[] get_next_node_announcements(byte[] starting_point, byte batch_amount);
		 boolean should_request_full_sync(byte[] node_id);
	}
	public static native long LDKRoutingMessageHandler_new(LDKRoutingMessageHandler impl);
	public static native LDKRoutingMessageHandler LDKRoutingMessageHandler_get_obj_from_jcalls(long val);
	// LDKCResult_boolLightningErrorZ RoutingMessageHandler_handle_node_announcement LDKRoutingMessageHandler* this_arg, const LDKNodeAnnouncement *msg
	public static native long RoutingMessageHandler_handle_node_announcement(long this_arg, long msg);
	// LDKCResult_boolLightningErrorZ RoutingMessageHandler_handle_channel_announcement LDKRoutingMessageHandler* this_arg, const LDKChannelAnnouncement *msg
	public static native long RoutingMessageHandler_handle_channel_announcement(long this_arg, long msg);
	// LDKCResult_boolLightningErrorZ RoutingMessageHandler_handle_channel_update LDKRoutingMessageHandler* this_arg, const LDKChannelUpdate *msg
	public static native long RoutingMessageHandler_handle_channel_update(long this_arg, long msg);
	// void RoutingMessageHandler_handle_htlc_fail_channel_update LDKRoutingMessageHandler* this_arg, const LDKHTLCFailChannelUpdate *update
	public static native void RoutingMessageHandler_handle_htlc_fail_channel_update(long this_arg, long update);
	// LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ RoutingMessageHandler_get_next_channel_announcements LDKRoutingMessageHandler* this_arg, uint64_t starting_point, uint8_t batch_amount
	public static native long[] RoutingMessageHandler_get_next_channel_announcements(long this_arg, long starting_point, byte batch_amount);
	// LDKCVec_NodeAnnouncementZ RoutingMessageHandler_get_next_node_announcements LDKRoutingMessageHandler* this_arg, LDKPublicKey starting_point, uint8_t batch_amount
	public static native long[] RoutingMessageHandler_get_next_node_announcements(long this_arg, byte[] starting_point, byte batch_amount);
	// bool RoutingMessageHandler_should_request_full_sync LDKRoutingMessageHandler* this_arg, LDKPublicKey node_id
	public static native boolean RoutingMessageHandler_should_request_full_sync(long this_arg, byte[] node_id);
	public interface LDKSocketDescriptor {
		 long send_data(byte[] data, boolean resume_read);
		 void disconnect_socket();
		 boolean eq(long other_arg);
		 long hash();
	}
	public static native long LDKSocketDescriptor_new(LDKSocketDescriptor impl);
	public static native LDKSocketDescriptor LDKSocketDescriptor_get_obj_from_jcalls(long val);
	// uintptr_t SocketDescriptor_send_data LDKSocketDescriptor* this_arg, LDKu8slice data, bool resume_read
	public static native long SocketDescriptor_send_data(long this_arg, byte[] data, boolean resume_read);
	// void SocketDescriptor_disconnect_socket LDKSocketDescriptor* this_arg
	public static native void SocketDescriptor_disconnect_socket(long this_arg);
	// uint64_t SocketDescriptor_hash LDKSocketDescriptor* this_arg
	public static native long SocketDescriptor_hash(long this_arg);
	public static native VecOrSliceDef LDKCVecTempl_PublicKey_arr_info(long vec_ptr);
	public static native boolean LDKCResult_CVec_u8ZPeerHandleErrorZ_result_ok(long arg);
	public static native byte[] LDKCResult_CVec_u8ZPeerHandleErrorZ_get_ok(long arg);
	public static native long LDKCResult_CVec_u8ZPeerHandleErrorZ_get_err(long arg);
	public static native boolean LDKCResult_boolPeerHandleErrorZ_result_ok(long arg);
	public static native boolean LDKCResult_boolPeerHandleErrorZ_get_ok(long arg);
	public static native long LDKCResult_boolPeerHandleErrorZ_get_err(long arg);
	public static native boolean LDKCResult_SecretKeySecpErrorZ_result_ok(long arg);
	public static native byte[] LDKCResult_SecretKeySecpErrorZ_get_ok(long arg);
	public static native LDKSecp256k1Error LDKCResult_SecretKeySecpErrorZ_get_err(long arg);
	public static native boolean LDKCResult_PublicKeySecpErrorZ_result_ok(long arg);
	public static native byte[] LDKCResult_PublicKeySecpErrorZ_get_ok(long arg);
	public static native LDKSecp256k1Error LDKCResult_PublicKeySecpErrorZ_get_err(long arg);
	public static native boolean LDKCResult_TxCreationKeysSecpErrorZ_result_ok(long arg);
	public static native long LDKCResult_TxCreationKeysSecpErrorZ_get_ok(long arg);
	public static native LDKSecp256k1Error LDKCResult_TxCreationKeysSecpErrorZ_get_err(long arg);
	public static native VecOrSliceDef LDKCVecTempl_C2TupleTempl_HTLCOutputInCommitment__Signature_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_C2TupleTempl_HTLCOutputInCommitment__Signature_new(long[] elems);
	public static native long[] LDKCVecTempl_RouteHop_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_RouteHop_new(long[] elems);
	public static native VecOrSliceDef LDKCVecTempl_CVecTempl_RouteHop_arr_info(long vec_ptr);
	public static native boolean LDKCResult_RouteLightningErrorZ_result_ok(long arg);
	public static native long LDKCResult_RouteLightningErrorZ_get_ok(long arg);
	public static native long LDKCResult_RouteLightningErrorZ_get_err(long arg);
	public static native long[] LDKCVecTempl_RouteHint_arr_info(long vec_ptr);
	public static native long LDKCVecTempl_RouteHint_new(long[] elems);
	// extern const void (*C2Tuple_HTLCOutputInCommitmentSignatureZ_free)(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ);
	public static native void C2Tuple_HTLCOutputInCommitmentSignatureZ_free(long arg);
	// extern const void (*C2Tuple_OutPointScriptZ_free)(LDKC2Tuple_OutPointScriptZ);
	public static native void C2Tuple_OutPointScriptZ_free(long arg);
	// extern const void (*C2Tuple_SignatureCVec_SignatureZZ_free)(LDKC2Tuple_SignatureCVec_SignatureZZ);
	public static native void C2Tuple_SignatureCVec_SignatureZZ_free(long arg);
	// extern const void (*C2Tuple_TxidCVec_TxOutZZ_free)(LDKC2Tuple_TxidCVec_TxOutZZ);
	public static native void C2Tuple_TxidCVec_TxOutZZ_free(long arg);
	// extern const void (*C2Tuple_u64u64Z_free)(LDKC2Tuple_u64u64Z);
	public static native void C2Tuple_u64u64Z_free(long arg);
	// extern const void (*C2Tuple_usizeTransactionZ_free)(LDKC2Tuple_usizeTransactionZ);
	public static native void C2Tuple_usizeTransactionZ_free(long arg);
	// extern const void (*C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free)(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ);
	public static native void C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(long arg);
	// extern const void (*CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free)(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ);
	public static native void CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(long arg);
	// extern const LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ (*CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok)(LDKC2Tuple_SignatureCVec_SignatureZZ);
	public static native long CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(long arg);
	// extern const void (*CResult_CVec_SignatureZNoneZ_free)(LDKCResult_CVec_SignatureZNoneZ);
	public static native void CResult_CVec_SignatureZNoneZ_free(long arg);
	// extern const LDKCResult_CVec_SignatureZNoneZ (*CResult_CVec_SignatureZNoneZ_ok)(LDKCVec_SignatureZ);
	public static native long CResult_CVec_SignatureZNoneZ_ok(byte[][] arg);
	// extern const LDKCResult_CVec_u8ZPeerHandleErrorZ (*CResult_CVec_u8ZPeerHandleErrorZ_err)(LDKPeerHandleError);
	public static native long CResult_CVec_u8ZPeerHandleErrorZ_err(long arg);
	// extern const void (*CResult_CVec_u8ZPeerHandleErrorZ_free)(LDKCResult_CVec_u8ZPeerHandleErrorZ);
	public static native void CResult_CVec_u8ZPeerHandleErrorZ_free(long arg);
	// extern const LDKCResult_CVec_u8ZPeerHandleErrorZ (*CResult_CVec_u8ZPeerHandleErrorZ_ok)(LDKCVec_u8Z);
	public static native long CResult_CVec_u8ZPeerHandleErrorZ_ok(byte[] arg);
	// extern const LDKCResult_NoneAPIErrorZ (*CResult_NoneAPIErrorZ_err)(LDKAPIError);
	public static native long CResult_NoneAPIErrorZ_err(long arg);
	// extern const void (*CResult_NoneAPIErrorZ_free)(LDKCResult_NoneAPIErrorZ);
	public static native void CResult_NoneAPIErrorZ_free(long arg);
	// extern const LDKCResult_NoneChannelMonitorUpdateErrZ (*CResult_NoneChannelMonitorUpdateErrZ_err)(LDKChannelMonitorUpdateErr);
	public static native long CResult_NoneChannelMonitorUpdateErrZ_err(LDKChannelMonitorUpdateErr arg);
	// extern const void (*CResult_NoneChannelMonitorUpdateErrZ_free)(LDKCResult_NoneChannelMonitorUpdateErrZ);
	public static native void CResult_NoneChannelMonitorUpdateErrZ_free(long arg);
	// extern const LDKCResult_NoneMonitorUpdateErrorZ (*CResult_NoneMonitorUpdateErrorZ_err)(LDKMonitorUpdateError);
	public static native long CResult_NoneMonitorUpdateErrorZ_err(long arg);
	// extern const void (*CResult_NoneMonitorUpdateErrorZ_free)(LDKCResult_NoneMonitorUpdateErrorZ);
	public static native void CResult_NoneMonitorUpdateErrorZ_free(long arg);
	// extern const LDKCResult_NonePaymentSendFailureZ (*CResult_NonePaymentSendFailureZ_err)(LDKPaymentSendFailure);
	public static native long CResult_NonePaymentSendFailureZ_err(long arg);
	// extern const void (*CResult_NonePaymentSendFailureZ_free)(LDKCResult_NonePaymentSendFailureZ);
	public static native void CResult_NonePaymentSendFailureZ_free(long arg);
	// extern const LDKCResult_NonePeerHandleErrorZ (*CResult_NonePeerHandleErrorZ_err)(LDKPeerHandleError);
	public static native long CResult_NonePeerHandleErrorZ_err(long arg);
	// extern const void (*CResult_NonePeerHandleErrorZ_free)(LDKCResult_NonePeerHandleErrorZ);
	public static native void CResult_NonePeerHandleErrorZ_free(long arg);
	// extern const LDKCResult_PublicKeySecpErrorZ (*CResult_PublicKeySecpErrorZ_err)(LDKSecp256k1Error);
	public static native long CResult_PublicKeySecpErrorZ_err(LDKSecp256k1Error arg);
	// extern const void (*CResult_PublicKeySecpErrorZ_free)(LDKCResult_PublicKeySecpErrorZ);
	public static native void CResult_PublicKeySecpErrorZ_free(long arg);
	// extern const LDKCResult_PublicKeySecpErrorZ (*CResult_PublicKeySecpErrorZ_ok)(LDKPublicKey);
	public static native long CResult_PublicKeySecpErrorZ_ok(byte[] arg);
	// extern const LDKCResult_RouteLightningErrorZ (*CResult_RouteLightningErrorZ_err)(LDKLightningError);
	public static native long CResult_RouteLightningErrorZ_err(long arg);
	// extern const void (*CResult_RouteLightningErrorZ_free)(LDKCResult_RouteLightningErrorZ);
	public static native void CResult_RouteLightningErrorZ_free(long arg);
	// extern const LDKCResult_RouteLightningErrorZ (*CResult_RouteLightningErrorZ_ok)(LDKRoute);
	public static native long CResult_RouteLightningErrorZ_ok(long arg);
	// extern const LDKCResult_SecretKeySecpErrorZ (*CResult_SecretKeySecpErrorZ_err)(LDKSecp256k1Error);
	public static native long CResult_SecretKeySecpErrorZ_err(LDKSecp256k1Error arg);
	// extern const void (*CResult_SecretKeySecpErrorZ_free)(LDKCResult_SecretKeySecpErrorZ);
	public static native void CResult_SecretKeySecpErrorZ_free(long arg);
	// extern const LDKCResult_SecretKeySecpErrorZ (*CResult_SecretKeySecpErrorZ_ok)(LDKSecretKey);
	public static native long CResult_SecretKeySecpErrorZ_ok(byte[] arg);
	// extern const void (*CResult_SignatureNoneZ_free)(LDKCResult_SignatureNoneZ);
	public static native void CResult_SignatureNoneZ_free(long arg);
	// extern const LDKCResult_SignatureNoneZ (*CResult_SignatureNoneZ_ok)(LDKSignature);
	public static native long CResult_SignatureNoneZ_ok(byte[] arg);
	// extern const LDKCResult_TxCreationKeysSecpErrorZ (*CResult_TxCreationKeysSecpErrorZ_err)(LDKSecp256k1Error);
	public static native long CResult_TxCreationKeysSecpErrorZ_err(LDKSecp256k1Error arg);
	// extern const void (*CResult_TxCreationKeysSecpErrorZ_free)(LDKCResult_TxCreationKeysSecpErrorZ);
	public static native void CResult_TxCreationKeysSecpErrorZ_free(long arg);
	// extern const LDKCResult_TxCreationKeysSecpErrorZ (*CResult_TxCreationKeysSecpErrorZ_ok)(LDKTxCreationKeys);
	public static native long CResult_TxCreationKeysSecpErrorZ_ok(long arg);
	// extern const LDKCResult_TxOutAccessErrorZ (*CResult_TxOutAccessErrorZ_err)(LDKAccessError);
	public static native long CResult_TxOutAccessErrorZ_err(LDKAccessError arg);
	// extern const void (*CResult_TxOutAccessErrorZ_free)(LDKCResult_TxOutAccessErrorZ);
	public static native void CResult_TxOutAccessErrorZ_free(long arg);
	// extern const LDKCResult_TxOutAccessErrorZ (*CResult_TxOutAccessErrorZ_ok)(LDKTxOut);
	public static native long CResult_TxOutAccessErrorZ_ok(long arg);
	// extern const LDKCResult_boolLightningErrorZ (*CResult_boolLightningErrorZ_err)(LDKLightningError);
	public static native long CResult_boolLightningErrorZ_err(long arg);
	// extern const void (*CResult_boolLightningErrorZ_free)(LDKCResult_boolLightningErrorZ);
	public static native void CResult_boolLightningErrorZ_free(long arg);
	// extern const LDKCResult_boolLightningErrorZ (*CResult_boolLightningErrorZ_ok)(bool);
	public static native long CResult_boolLightningErrorZ_ok(boolean arg);
	// extern const LDKCResult_boolPeerHandleErrorZ (*CResult_boolPeerHandleErrorZ_err)(LDKPeerHandleError);
	public static native long CResult_boolPeerHandleErrorZ_err(long arg);
	// extern const void (*CResult_boolPeerHandleErrorZ_free)(LDKCResult_boolPeerHandleErrorZ);
	public static native void CResult_boolPeerHandleErrorZ_free(long arg);
	// extern const LDKCResult_boolPeerHandleErrorZ (*CResult_boolPeerHandleErrorZ_ok)(bool);
	public static native long CResult_boolPeerHandleErrorZ_ok(boolean arg);
	// extern const void (*CVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ_free)(LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ);
	public static native void CVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ_free(long[] arg);
	// extern const void (*CVec_C2Tuple_TxidCVec_TxOutZZZ_free)(LDKCVec_C2Tuple_TxidCVec_TxOutZZZ);
	public static native void CVec_C2Tuple_TxidCVec_TxOutZZZ_free(long[] arg);
	// extern const void (*CVec_C2Tuple_usizeTransactionZZ_free)(LDKCVec_C2Tuple_usizeTransactionZZ);
	public static native void CVec_C2Tuple_usizeTransactionZZ_free(long[] arg);
	// extern const void (*CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free)(LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ);
	public static native void CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(long[] arg);
	// extern const void (*CVec_CVec_RouteHopZZ_free)(LDKCVec_CVec_RouteHopZZ);
	public static native void CVec_CVec_RouteHopZZ_free(long[][] arg);
	// extern const void (*CVec_ChannelDetailsZ_free)(LDKCVec_ChannelDetailsZ);
	public static native void CVec_ChannelDetailsZ_free(long[] arg);
	// extern const void (*CVec_ChannelMonitorZ_free)(LDKCVec_ChannelMonitorZ);
	public static native void CVec_ChannelMonitorZ_free(long[] arg);
	// extern const void (*CVec_EventZ_free)(LDKCVec_EventZ);
	public static native void CVec_EventZ_free(long[] arg);
	// extern const void (*CVec_HTLCOutputInCommitmentZ_free)(LDKCVec_HTLCOutputInCommitmentZ);
	public static native void CVec_HTLCOutputInCommitmentZ_free(long[] arg);
	// extern const void (*CVec_MessageSendEventZ_free)(LDKCVec_MessageSendEventZ);
	public static native void CVec_MessageSendEventZ_free(long[] arg);
	// extern const void (*CVec_MonitorEventZ_free)(LDKCVec_MonitorEventZ);
	public static native void CVec_MonitorEventZ_free(long[] arg);
	// extern const void (*CVec_NetAddressZ_free)(LDKCVec_NetAddressZ);
	public static native void CVec_NetAddressZ_free(long[] arg);
	// extern const void (*CVec_NodeAnnouncementZ_free)(LDKCVec_NodeAnnouncementZ);
	public static native void CVec_NodeAnnouncementZ_free(long[] arg);
	// extern const void (*CVec_PublicKeyZ_free)(LDKCVec_PublicKeyZ);
	public static native void CVec_PublicKeyZ_free(byte[][] arg);
	// extern const void (*CVec_RouteHintZ_free)(LDKCVec_RouteHintZ);
	public static native void CVec_RouteHintZ_free(long[] arg);
	// extern const void (*CVec_RouteHopZ_free)(LDKCVec_RouteHopZ);
	public static native void CVec_RouteHopZ_free(long[] arg);
	// extern const void (*CVec_SignatureZ_free)(LDKCVec_SignatureZ);
	public static native void CVec_SignatureZ_free(byte[][] arg);
	// extern const void (*CVec_SpendableOutputDescriptorZ_free)(LDKCVec_SpendableOutputDescriptorZ);
	public static native void CVec_SpendableOutputDescriptorZ_free(long[] arg);
	// extern const void (*CVec_TransactionZ_free)(LDKCVec_TransactionZ);
	public static native void CVec_TransactionZ_free(byte[][] arg);
	// extern const void (*CVec_TxOutZ_free)(LDKCVec_TxOutZ);
	public static native void CVec_TxOutZ_free(long[] arg);
	// extern const void (*CVec_UpdateAddHTLCZ_free)(LDKCVec_UpdateAddHTLCZ);
	public static native void CVec_UpdateAddHTLCZ_free(long[] arg);
	// extern const void (*CVec_UpdateFailHTLCZ_free)(LDKCVec_UpdateFailHTLCZ);
	public static native void CVec_UpdateFailHTLCZ_free(long[] arg);
	// extern const void (*CVec_UpdateFailMalformedHTLCZ_free)(LDKCVec_UpdateFailMalformedHTLCZ);
	public static native void CVec_UpdateFailMalformedHTLCZ_free(long[] arg);
	// extern const void (*CVec_UpdateFulfillHTLCZ_free)(LDKCVec_UpdateFulfillHTLCZ);
	public static native void CVec_UpdateFulfillHTLCZ_free(long[] arg);
	// extern const void (*CVec_u64Z_free)(LDKCVec_u64Z);
	public static native void CVec_u64Z_free(long[] arg);
	// extern const void (*CVec_u8Z_free)(LDKCVec_u8Z);
	public static native void CVec_u8Z_free(byte[] arg);
	// void Transaction_free(LDKTransaction _res);
	public static native void Transaction_free(byte[] _res);
	// void TxOut_free(LDKTxOut _res);
	public static native void TxOut_free(long _res);
	// LDKC2Tuple_usizeTransactionZ C2Tuple_usizeTransactionZ_new(uintptr_t a, LDKTransaction b);
	public static native long C2Tuple_usizeTransactionZ_new(long a, byte[] b);
	// LDKCResult_NoneChannelMonitorUpdateErrZ CResult_NoneChannelMonitorUpdateErrZ_ok(void);
	public static native long CResult_NoneChannelMonitorUpdateErrZ_ok();
	// LDKCResult_NoneMonitorUpdateErrorZ CResult_NoneMonitorUpdateErrorZ_ok(void);
	public static native long CResult_NoneMonitorUpdateErrorZ_ok();
	// LDKC2Tuple_OutPointScriptZ C2Tuple_OutPointScriptZ_new(LDKOutPoint a, LDKCVec_u8Z b);
	public static native long C2Tuple_OutPointScriptZ_new(long a, byte[] b);
	// LDKC2Tuple_TxidCVec_TxOutZZ C2Tuple_TxidCVec_TxOutZZ_new(LDKThirtyTwoBytes a, LDKCVec_TxOutZ b);
	public static native long C2Tuple_TxidCVec_TxOutZZ_new(byte[] a, long[] b);
	// LDKC2Tuple_u64u64Z C2Tuple_u64u64Z_new(uint64_t a, uint64_t b);
	public static native long C2Tuple_u64u64Z_new(long a, long b);
	// LDKC2Tuple_SignatureCVec_SignatureZZ C2Tuple_SignatureCVec_SignatureZZ_new(LDKSignature a, LDKCVec_SignatureZ b);
	public static native long C2Tuple_SignatureCVec_SignatureZZ_new(byte[] a, byte[][] b);
	// LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err(void);
	public static native long CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
	// LDKCResult_SignatureNoneZ CResult_SignatureNoneZ_err(void);
	public static native long CResult_SignatureNoneZ_err();
	// LDKCResult_CVec_SignatureZNoneZ CResult_CVec_SignatureZNoneZ_err(void);
	public static native long CResult_CVec_SignatureZNoneZ_err();
	// LDKCResult_NoneAPIErrorZ CResult_NoneAPIErrorZ_ok(void);
	public static native long CResult_NoneAPIErrorZ_ok();
	// LDKCResult_NonePaymentSendFailureZ CResult_NonePaymentSendFailureZ_ok(void);
	public static native long CResult_NonePaymentSendFailureZ_ok();
	// LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(LDKChannelAnnouncement a, LDKChannelUpdate b, LDKChannelUpdate c);
	public static native long C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(long a, long b, long c);
	// LDKCResult_NonePeerHandleErrorZ CResult_NonePeerHandleErrorZ_ok(void);
	public static native long CResult_NonePeerHandleErrorZ_ok();
	// LDKC2Tuple_HTLCOutputInCommitmentSignatureZ C2Tuple_HTLCOutputInCommitmentSignatureZ_new(LDKHTLCOutputInCommitment a, LDKSignature b);
	public static native long C2Tuple_HTLCOutputInCommitmentSignatureZ_new(long a, byte[] b);
	// void Event_free(LDKEvent this_ptr);
	public static native void Event_free(long this_ptr);
	// LDKEvent Event_clone(const LDKEvent *orig);
	public static native long Event_clone(long orig);
	// void MessageSendEvent_free(LDKMessageSendEvent this_ptr);
	public static native void MessageSendEvent_free(long this_ptr);
	// LDKMessageSendEvent MessageSendEvent_clone(const LDKMessageSendEvent *orig);
	public static native long MessageSendEvent_clone(long orig);
	// void MessageSendEventsProvider_free(LDKMessageSendEventsProvider this_ptr);
	public static native void MessageSendEventsProvider_free(long this_ptr);
	// void EventsProvider_free(LDKEventsProvider this_ptr);
	public static native void EventsProvider_free(long this_ptr);
	// void APIError_free(LDKAPIError this_ptr);
	public static native void APIError_free(long this_ptr);
	// LDKAPIError APIError_clone(const LDKAPIError *orig);
	public static native long APIError_clone(long orig);
	// LDKLevel Level_clone(const LDKLevel *orig);
	public static native LDKLevel Level_clone(long orig);
	// MUST_USE_RES LDKLevel Level_max(void);
	public static native LDKLevel Level_max();
	// void Logger_free(LDKLogger this_ptr);
	public static native void Logger_free(long this_ptr);
	// void ChannelHandshakeConfig_free(LDKChannelHandshakeConfig this_ptr);
	public static native void ChannelHandshakeConfig_free(long this_ptr);
	// LDKChannelHandshakeConfig ChannelHandshakeConfig_clone(const LDKChannelHandshakeConfig *orig);
	public static native long ChannelHandshakeConfig_clone(long orig);
	// uint32_t ChannelHandshakeConfig_get_minimum_depth(const LDKChannelHandshakeConfig *this_ptr);
	public static native int ChannelHandshakeConfig_get_minimum_depth(long this_ptr);
	// void ChannelHandshakeConfig_set_minimum_depth(LDKChannelHandshakeConfig *this_ptr, uint32_t val);
	public static native void ChannelHandshakeConfig_set_minimum_depth(long this_ptr, int val);
	// uint16_t ChannelHandshakeConfig_get_our_to_self_delay(const LDKChannelHandshakeConfig *this_ptr);
	public static native short ChannelHandshakeConfig_get_our_to_self_delay(long this_ptr);
	// void ChannelHandshakeConfig_set_our_to_self_delay(LDKChannelHandshakeConfig *this_ptr, uint16_t val);
	public static native void ChannelHandshakeConfig_set_our_to_self_delay(long this_ptr, short val);
	// uint64_t ChannelHandshakeConfig_get_our_htlc_minimum_msat(const LDKChannelHandshakeConfig *this_ptr);
	public static native long ChannelHandshakeConfig_get_our_htlc_minimum_msat(long this_ptr);
	// void ChannelHandshakeConfig_set_our_htlc_minimum_msat(LDKChannelHandshakeConfig *this_ptr, uint64_t val);
	public static native void ChannelHandshakeConfig_set_our_htlc_minimum_msat(long this_ptr, long val);
	// MUST_USE_RES LDKChannelHandshakeConfig ChannelHandshakeConfig_new(uint32_t minimum_depth_arg, uint16_t our_to_self_delay_arg, uint64_t our_htlc_minimum_msat_arg);
	public static native long ChannelHandshakeConfig_new(int minimum_depth_arg, short our_to_self_delay_arg, long our_htlc_minimum_msat_arg);
	// MUST_USE_RES LDKChannelHandshakeConfig ChannelHandshakeConfig_default(void);
	public static native long ChannelHandshakeConfig_default();
	// void ChannelHandshakeLimits_free(LDKChannelHandshakeLimits this_ptr);
	public static native void ChannelHandshakeLimits_free(long this_ptr);
	// LDKChannelHandshakeLimits ChannelHandshakeLimits_clone(const LDKChannelHandshakeLimits *orig);
	public static native long ChannelHandshakeLimits_clone(long orig);
	// uint64_t ChannelHandshakeLimits_get_min_funding_satoshis(const LDKChannelHandshakeLimits *this_ptr);
	public static native long ChannelHandshakeLimits_get_min_funding_satoshis(long this_ptr);
	// void ChannelHandshakeLimits_set_min_funding_satoshis(LDKChannelHandshakeLimits *this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_min_funding_satoshis(long this_ptr, long val);
	// uint64_t ChannelHandshakeLimits_get_max_htlc_minimum_msat(const LDKChannelHandshakeLimits *this_ptr);
	public static native long ChannelHandshakeLimits_get_max_htlc_minimum_msat(long this_ptr);
	// void ChannelHandshakeLimits_set_max_htlc_minimum_msat(LDKChannelHandshakeLimits *this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_max_htlc_minimum_msat(long this_ptr, long val);
	// uint64_t ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(const LDKChannelHandshakeLimits *this_ptr);
	public static native long ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(long this_ptr);
	// void ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(LDKChannelHandshakeLimits *this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(long this_ptr, long val);
	// uint64_t ChannelHandshakeLimits_get_max_channel_reserve_satoshis(const LDKChannelHandshakeLimits *this_ptr);
	public static native long ChannelHandshakeLimits_get_max_channel_reserve_satoshis(long this_ptr);
	// void ChannelHandshakeLimits_set_max_channel_reserve_satoshis(LDKChannelHandshakeLimits *this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_max_channel_reserve_satoshis(long this_ptr, long val);
	// uint16_t ChannelHandshakeLimits_get_min_max_accepted_htlcs(const LDKChannelHandshakeLimits *this_ptr);
	public static native short ChannelHandshakeLimits_get_min_max_accepted_htlcs(long this_ptr);
	// void ChannelHandshakeLimits_set_min_max_accepted_htlcs(LDKChannelHandshakeLimits *this_ptr, uint16_t val);
	public static native void ChannelHandshakeLimits_set_min_max_accepted_htlcs(long this_ptr, short val);
	// uint64_t ChannelHandshakeLimits_get_min_dust_limit_satoshis(const LDKChannelHandshakeLimits *this_ptr);
	public static native long ChannelHandshakeLimits_get_min_dust_limit_satoshis(long this_ptr);
	// void ChannelHandshakeLimits_set_min_dust_limit_satoshis(LDKChannelHandshakeLimits *this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_min_dust_limit_satoshis(long this_ptr, long val);
	// uint64_t ChannelHandshakeLimits_get_max_dust_limit_satoshis(const LDKChannelHandshakeLimits *this_ptr);
	public static native long ChannelHandshakeLimits_get_max_dust_limit_satoshis(long this_ptr);
	// void ChannelHandshakeLimits_set_max_dust_limit_satoshis(LDKChannelHandshakeLimits *this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_max_dust_limit_satoshis(long this_ptr, long val);
	// uint32_t ChannelHandshakeLimits_get_max_minimum_depth(const LDKChannelHandshakeLimits *this_ptr);
	public static native int ChannelHandshakeLimits_get_max_minimum_depth(long this_ptr);
	// void ChannelHandshakeLimits_set_max_minimum_depth(LDKChannelHandshakeLimits *this_ptr, uint32_t val);
	public static native void ChannelHandshakeLimits_set_max_minimum_depth(long this_ptr, int val);
	// bool ChannelHandshakeLimits_get_force_announced_channel_preference(const LDKChannelHandshakeLimits *this_ptr);
	public static native boolean ChannelHandshakeLimits_get_force_announced_channel_preference(long this_ptr);
	// void ChannelHandshakeLimits_set_force_announced_channel_preference(LDKChannelHandshakeLimits *this_ptr, bool val);
	public static native void ChannelHandshakeLimits_set_force_announced_channel_preference(long this_ptr, boolean val);
	// uint16_t ChannelHandshakeLimits_get_their_to_self_delay(const LDKChannelHandshakeLimits *this_ptr);
	public static native short ChannelHandshakeLimits_get_their_to_self_delay(long this_ptr);
	// void ChannelHandshakeLimits_set_their_to_self_delay(LDKChannelHandshakeLimits *this_ptr, uint16_t val);
	public static native void ChannelHandshakeLimits_set_their_to_self_delay(long this_ptr, short val);
	// MUST_USE_RES LDKChannelHandshakeLimits ChannelHandshakeLimits_new(uint64_t min_funding_satoshis_arg, uint64_t max_htlc_minimum_msat_arg, uint64_t min_max_htlc_value_in_flight_msat_arg, uint64_t max_channel_reserve_satoshis_arg, uint16_t min_max_accepted_htlcs_arg, uint64_t min_dust_limit_satoshis_arg, uint64_t max_dust_limit_satoshis_arg, uint32_t max_minimum_depth_arg, bool force_announced_channel_preference_arg, uint16_t their_to_self_delay_arg);
	public static native long ChannelHandshakeLimits_new(long min_funding_satoshis_arg, long max_htlc_minimum_msat_arg, long min_max_htlc_value_in_flight_msat_arg, long max_channel_reserve_satoshis_arg, short min_max_accepted_htlcs_arg, long min_dust_limit_satoshis_arg, long max_dust_limit_satoshis_arg, int max_minimum_depth_arg, boolean force_announced_channel_preference_arg, short their_to_self_delay_arg);
	// MUST_USE_RES LDKChannelHandshakeLimits ChannelHandshakeLimits_default(void);
	public static native long ChannelHandshakeLimits_default();
	// void ChannelConfig_free(LDKChannelConfig this_ptr);
	public static native void ChannelConfig_free(long this_ptr);
	// LDKChannelConfig ChannelConfig_clone(const LDKChannelConfig *orig);
	public static native long ChannelConfig_clone(long orig);
	// uint32_t ChannelConfig_get_fee_proportional_millionths(const LDKChannelConfig *this_ptr);
	public static native int ChannelConfig_get_fee_proportional_millionths(long this_ptr);
	// void ChannelConfig_set_fee_proportional_millionths(LDKChannelConfig *this_ptr, uint32_t val);
	public static native void ChannelConfig_set_fee_proportional_millionths(long this_ptr, int val);
	// bool ChannelConfig_get_announced_channel(const LDKChannelConfig *this_ptr);
	public static native boolean ChannelConfig_get_announced_channel(long this_ptr);
	// void ChannelConfig_set_announced_channel(LDKChannelConfig *this_ptr, bool val);
	public static native void ChannelConfig_set_announced_channel(long this_ptr, boolean val);
	// bool ChannelConfig_get_commit_upfront_shutdown_pubkey(const LDKChannelConfig *this_ptr);
	public static native boolean ChannelConfig_get_commit_upfront_shutdown_pubkey(long this_ptr);
	// void ChannelConfig_set_commit_upfront_shutdown_pubkey(LDKChannelConfig *this_ptr, bool val);
	public static native void ChannelConfig_set_commit_upfront_shutdown_pubkey(long this_ptr, boolean val);
	// MUST_USE_RES LDKChannelConfig ChannelConfig_new(uint32_t fee_proportional_millionths_arg, bool announced_channel_arg, bool commit_upfront_shutdown_pubkey_arg);
	public static native long ChannelConfig_new(int fee_proportional_millionths_arg, boolean announced_channel_arg, boolean commit_upfront_shutdown_pubkey_arg);
	// MUST_USE_RES LDKChannelConfig ChannelConfig_default(void);
	public static native long ChannelConfig_default();
	// LDKCVec_u8Z ChannelConfig_write(const LDKChannelConfig *obj);
	public static native byte[] ChannelConfig_write(long obj);
	// LDKChannelConfig ChannelConfig_read(LDKu8slice ser);
	public static native long ChannelConfig_read(byte[] ser);
	// void UserConfig_free(LDKUserConfig this_ptr);
	public static native void UserConfig_free(long this_ptr);
	// LDKUserConfig UserConfig_clone(const LDKUserConfig *orig);
	public static native long UserConfig_clone(long orig);
	// LDKChannelHandshakeConfig UserConfig_get_own_channel_config(const LDKUserConfig *this_ptr);
	public static native long UserConfig_get_own_channel_config(long this_ptr);
	// void UserConfig_set_own_channel_config(LDKUserConfig *this_ptr, LDKChannelHandshakeConfig val);
	public static native void UserConfig_set_own_channel_config(long this_ptr, long val);
	// LDKChannelHandshakeLimits UserConfig_get_peer_channel_config_limits(const LDKUserConfig *this_ptr);
	public static native long UserConfig_get_peer_channel_config_limits(long this_ptr);
	// void UserConfig_set_peer_channel_config_limits(LDKUserConfig *this_ptr, LDKChannelHandshakeLimits val);
	public static native void UserConfig_set_peer_channel_config_limits(long this_ptr, long val);
	// LDKChannelConfig UserConfig_get_channel_options(const LDKUserConfig *this_ptr);
	public static native long UserConfig_get_channel_options(long this_ptr);
	// void UserConfig_set_channel_options(LDKUserConfig *this_ptr, LDKChannelConfig val);
	public static native void UserConfig_set_channel_options(long this_ptr, long val);
	// MUST_USE_RES LDKUserConfig UserConfig_new(LDKChannelHandshakeConfig own_channel_config_arg, LDKChannelHandshakeLimits peer_channel_config_limits_arg, LDKChannelConfig channel_options_arg);
	public static native long UserConfig_new(long own_channel_config_arg, long peer_channel_config_limits_arg, long channel_options_arg);
	// MUST_USE_RES LDKUserConfig UserConfig_default(void);
	public static native long UserConfig_default();
	// LDKAccessError AccessError_clone(const LDKAccessError *orig);
	public static native LDKAccessError AccessError_clone(long orig);
	// void Access_free(LDKAccess this_ptr);
	public static native void Access_free(long this_ptr);
	// void Watch_free(LDKWatch this_ptr);
	public static native void Watch_free(long this_ptr);
	// void Filter_free(LDKFilter this_ptr);
	public static native void Filter_free(long this_ptr);
	// void BroadcasterInterface_free(LDKBroadcasterInterface this_ptr);
	public static native void BroadcasterInterface_free(long this_ptr);
	// LDKConfirmationTarget ConfirmationTarget_clone(const LDKConfirmationTarget *orig);
	public static native LDKConfirmationTarget ConfirmationTarget_clone(long orig);
	// void FeeEstimator_free(LDKFeeEstimator this_ptr);
	public static native void FeeEstimator_free(long this_ptr);
	// void ChainMonitor_free(LDKChainMonitor this_ptr);
	public static native void ChainMonitor_free(long this_ptr);
	// void ChainMonitor_block_connected(const LDKChainMonitor *this_arg, const uint8_t (*header)[80], LDKCVec_C2Tuple_usizeTransactionZZ txdata, uint32_t height);
	public static native void ChainMonitor_block_connected(long this_arg, byte[] header, long[] txdata, int height);
	// void ChainMonitor_block_disconnected(const LDKChainMonitor *this_arg, const uint8_t (*header)[80], uint32_t disconnected_height);
	public static native void ChainMonitor_block_disconnected(long this_arg, byte[] header, int disconnected_height);
	// MUST_USE_RES LDKChainMonitor ChainMonitor_new(LDKFilter *chain_source, LDKBroadcasterInterface broadcaster, LDKLogger logger, LDKFeeEstimator feeest);
	public static native long ChainMonitor_new(long chain_source, long broadcaster, long logger, long feeest);
	// LDKWatch ChainMonitor_as_Watch(const LDKChainMonitor *this_arg);
	public static native long ChainMonitor_as_Watch(long this_arg);
	// LDKEventsProvider ChainMonitor_as_EventsProvider(const LDKChainMonitor *this_arg);
	public static native long ChainMonitor_as_EventsProvider(long this_arg);
	// void ChannelMonitorUpdate_free(LDKChannelMonitorUpdate this_ptr);
	public static native void ChannelMonitorUpdate_free(long this_ptr);
	// LDKChannelMonitorUpdate ChannelMonitorUpdate_clone(const LDKChannelMonitorUpdate *orig);
	public static native long ChannelMonitorUpdate_clone(long orig);
	// uint64_t ChannelMonitorUpdate_get_update_id(const LDKChannelMonitorUpdate *this_ptr);
	public static native long ChannelMonitorUpdate_get_update_id(long this_ptr);
	// void ChannelMonitorUpdate_set_update_id(LDKChannelMonitorUpdate *this_ptr, uint64_t val);
	public static native void ChannelMonitorUpdate_set_update_id(long this_ptr, long val);
	// LDKCVec_u8Z ChannelMonitorUpdate_write(const LDKChannelMonitorUpdate *obj);
	public static native byte[] ChannelMonitorUpdate_write(long obj);
	// LDKChannelMonitorUpdate ChannelMonitorUpdate_read(LDKu8slice ser);
	public static native long ChannelMonitorUpdate_read(byte[] ser);
	// LDKChannelMonitorUpdateErr ChannelMonitorUpdateErr_clone(const LDKChannelMonitorUpdateErr *orig);
	public static native LDKChannelMonitorUpdateErr ChannelMonitorUpdateErr_clone(long orig);
	// void MonitorUpdateError_free(LDKMonitorUpdateError this_ptr);
	public static native void MonitorUpdateError_free(long this_ptr);
	// void MonitorEvent_free(LDKMonitorEvent this_ptr);
	public static native void MonitorEvent_free(long this_ptr);
	// LDKMonitorEvent MonitorEvent_clone(const LDKMonitorEvent *orig);
	public static native long MonitorEvent_clone(long orig);
	// void HTLCUpdate_free(LDKHTLCUpdate this_ptr);
	public static native void HTLCUpdate_free(long this_ptr);
	// LDKHTLCUpdate HTLCUpdate_clone(const LDKHTLCUpdate *orig);
	public static native long HTLCUpdate_clone(long orig);
	// LDKCVec_u8Z HTLCUpdate_write(const LDKHTLCUpdate *obj);
	public static native byte[] HTLCUpdate_write(long obj);
	// LDKHTLCUpdate HTLCUpdate_read(LDKu8slice ser);
	public static native long HTLCUpdate_read(byte[] ser);
	// void ChannelMonitor_free(LDKChannelMonitor this_ptr);
	public static native void ChannelMonitor_free(long this_ptr);
	// MUST_USE_RES LDKCResult_NoneMonitorUpdateErrorZ ChannelMonitor_update_monitor(LDKChannelMonitor *this_arg, LDKChannelMonitorUpdate updates, const LDKBroadcasterInterface *broadcaster, const LDKLogger *logger);
	public static native long ChannelMonitor_update_monitor(long this_arg, long updates, long broadcaster, long logger);
	// MUST_USE_RES uint64_t ChannelMonitor_get_latest_update_id(const LDKChannelMonitor *this_arg);
	public static native long ChannelMonitor_get_latest_update_id(long this_arg);
	// MUST_USE_RES LDKC2Tuple_OutPointScriptZ ChannelMonitor_get_funding_txo(const LDKChannelMonitor *this_arg);
	public static native long ChannelMonitor_get_funding_txo(long this_arg);
	// MUST_USE_RES LDKCVec_MonitorEventZ ChannelMonitor_get_and_clear_pending_monitor_events(LDKChannelMonitor *this_arg);
	public static native long[] ChannelMonitor_get_and_clear_pending_monitor_events(long this_arg);
	// MUST_USE_RES LDKCVec_EventZ ChannelMonitor_get_and_clear_pending_events(LDKChannelMonitor *this_arg);
	public static native long[] ChannelMonitor_get_and_clear_pending_events(long this_arg);
	// MUST_USE_RES LDKCVec_TransactionZ ChannelMonitor_get_latest_holder_commitment_txn(LDKChannelMonitor *this_arg, const LDKLogger *logger);
	public static native byte[][] ChannelMonitor_get_latest_holder_commitment_txn(long this_arg, long logger);
	// MUST_USE_RES LDKCVec_C2Tuple_TxidCVec_TxOutZZZ ChannelMonitor_block_connected(LDKChannelMonitor *this_arg, const uint8_t (*header)[80], LDKCVec_C2Tuple_usizeTransactionZZ txdata, uint32_t height, LDKBroadcasterInterface broadcaster, LDKFeeEstimator fee_estimator, LDKLogger logger);
	public static native long[] ChannelMonitor_block_connected(long this_arg, byte[] header, long[] txdata, int height, long broadcaster, long fee_estimator, long logger);
	// void ChannelMonitor_block_disconnected(LDKChannelMonitor *this_arg, const uint8_t (*header)[80], uint32_t height, LDKBroadcasterInterface broadcaster, LDKFeeEstimator fee_estimator, LDKLogger logger);
	public static native void ChannelMonitor_block_disconnected(long this_arg, byte[] header, int height, long broadcaster, long fee_estimator, long logger);
	// void OutPoint_free(LDKOutPoint this_ptr);
	public static native void OutPoint_free(long this_ptr);
	// LDKOutPoint OutPoint_clone(const LDKOutPoint *orig);
	public static native long OutPoint_clone(long orig);
	// const uint8_t (*OutPoint_get_txid(const LDKOutPoint *this_ptr))[32];
	public static native byte[] OutPoint_get_txid(long this_ptr);
	// void OutPoint_set_txid(LDKOutPoint *this_ptr, LDKThirtyTwoBytes val);
	public static native void OutPoint_set_txid(long this_ptr, byte[] val);
	// uint16_t OutPoint_get_index(const LDKOutPoint *this_ptr);
	public static native short OutPoint_get_index(long this_ptr);
	// void OutPoint_set_index(LDKOutPoint *this_ptr, uint16_t val);
	public static native void OutPoint_set_index(long this_ptr, short val);
	// MUST_USE_RES LDKOutPoint OutPoint_new(LDKThirtyTwoBytes txid_arg, uint16_t index_arg);
	public static native long OutPoint_new(byte[] txid_arg, short index_arg);
	// MUST_USE_RES LDKThirtyTwoBytes OutPoint_to_channel_id(const LDKOutPoint *this_arg);
	public static native byte[] OutPoint_to_channel_id(long this_arg);
	// LDKCVec_u8Z OutPoint_write(const LDKOutPoint *obj);
	public static native byte[] OutPoint_write(long obj);
	// LDKOutPoint OutPoint_read(LDKu8slice ser);
	public static native long OutPoint_read(byte[] ser);
	// void SpendableOutputDescriptor_free(LDKSpendableOutputDescriptor this_ptr);
	public static native void SpendableOutputDescriptor_free(long this_ptr);
	// LDKSpendableOutputDescriptor SpendableOutputDescriptor_clone(const LDKSpendableOutputDescriptor *orig);
	public static native long SpendableOutputDescriptor_clone(long orig);
	// void ChannelKeys_free(LDKChannelKeys this_ptr);
	public static native void ChannelKeys_free(long this_ptr);
	// void KeysInterface_free(LDKKeysInterface this_ptr);
	public static native void KeysInterface_free(long this_ptr);
	// void InMemoryChannelKeys_free(LDKInMemoryChannelKeys this_ptr);
	public static native void InMemoryChannelKeys_free(long this_ptr);
	// LDKInMemoryChannelKeys InMemoryChannelKeys_clone(const LDKInMemoryChannelKeys *orig);
	public static native long InMemoryChannelKeys_clone(long orig);
	// const uint8_t (*InMemoryChannelKeys_get_funding_key(const LDKInMemoryChannelKeys *this_ptr))[32];
	public static native byte[] InMemoryChannelKeys_get_funding_key(long this_ptr);
	// void InMemoryChannelKeys_set_funding_key(LDKInMemoryChannelKeys *this_ptr, LDKSecretKey val);
	public static native void InMemoryChannelKeys_set_funding_key(long this_ptr, byte[] val);
	// const uint8_t (*InMemoryChannelKeys_get_revocation_base_key(const LDKInMemoryChannelKeys *this_ptr))[32];
	public static native byte[] InMemoryChannelKeys_get_revocation_base_key(long this_ptr);
	// void InMemoryChannelKeys_set_revocation_base_key(LDKInMemoryChannelKeys *this_ptr, LDKSecretKey val);
	public static native void InMemoryChannelKeys_set_revocation_base_key(long this_ptr, byte[] val);
	// const uint8_t (*InMemoryChannelKeys_get_payment_key(const LDKInMemoryChannelKeys *this_ptr))[32];
	public static native byte[] InMemoryChannelKeys_get_payment_key(long this_ptr);
	// void InMemoryChannelKeys_set_payment_key(LDKInMemoryChannelKeys *this_ptr, LDKSecretKey val);
	public static native void InMemoryChannelKeys_set_payment_key(long this_ptr, byte[] val);
	// const uint8_t (*InMemoryChannelKeys_get_delayed_payment_base_key(const LDKInMemoryChannelKeys *this_ptr))[32];
	public static native byte[] InMemoryChannelKeys_get_delayed_payment_base_key(long this_ptr);
	// void InMemoryChannelKeys_set_delayed_payment_base_key(LDKInMemoryChannelKeys *this_ptr, LDKSecretKey val);
	public static native void InMemoryChannelKeys_set_delayed_payment_base_key(long this_ptr, byte[] val);
	// const uint8_t (*InMemoryChannelKeys_get_htlc_base_key(const LDKInMemoryChannelKeys *this_ptr))[32];
	public static native byte[] InMemoryChannelKeys_get_htlc_base_key(long this_ptr);
	// void InMemoryChannelKeys_set_htlc_base_key(LDKInMemoryChannelKeys *this_ptr, LDKSecretKey val);
	public static native void InMemoryChannelKeys_set_htlc_base_key(long this_ptr, byte[] val);
	// const uint8_t (*InMemoryChannelKeys_get_commitment_seed(const LDKInMemoryChannelKeys *this_ptr))[32];
	public static native byte[] InMemoryChannelKeys_get_commitment_seed(long this_ptr);
	// void InMemoryChannelKeys_set_commitment_seed(LDKInMemoryChannelKeys *this_ptr, LDKThirtyTwoBytes val);
	public static native void InMemoryChannelKeys_set_commitment_seed(long this_ptr, byte[] val);
	// MUST_USE_RES LDKInMemoryChannelKeys InMemoryChannelKeys_new(LDKSecretKey funding_key, LDKSecretKey revocation_base_key, LDKSecretKey payment_key, LDKSecretKey delayed_payment_base_key, LDKSecretKey htlc_base_key, LDKThirtyTwoBytes commitment_seed, uint64_t channel_value_satoshis, LDKC2Tuple_u64u64Z key_derivation_params);
	public static native long InMemoryChannelKeys_new(byte[] funding_key, byte[] revocation_base_key, byte[] payment_key, byte[] delayed_payment_base_key, byte[] htlc_base_key, byte[] commitment_seed, long channel_value_satoshis, long key_derivation_params);
	// MUST_USE_RES LDKChannelPublicKeys InMemoryChannelKeys_counterparty_pubkeys(const LDKInMemoryChannelKeys *this_arg);
	public static native long InMemoryChannelKeys_counterparty_pubkeys(long this_arg);
	// MUST_USE_RES uint16_t InMemoryChannelKeys_counterparty_selected_contest_delay(const LDKInMemoryChannelKeys *this_arg);
	public static native short InMemoryChannelKeys_counterparty_selected_contest_delay(long this_arg);
	// MUST_USE_RES uint16_t InMemoryChannelKeys_holder_selected_contest_delay(const LDKInMemoryChannelKeys *this_arg);
	public static native short InMemoryChannelKeys_holder_selected_contest_delay(long this_arg);
	// LDKChannelKeys InMemoryChannelKeys_as_ChannelKeys(const LDKInMemoryChannelKeys *this_arg);
	public static native long InMemoryChannelKeys_as_ChannelKeys(long this_arg);
	// LDKCVec_u8Z InMemoryChannelKeys_write(const LDKInMemoryChannelKeys *obj);
	public static native byte[] InMemoryChannelKeys_write(long obj);
	// LDKInMemoryChannelKeys InMemoryChannelKeys_read(LDKu8slice ser);
	public static native long InMemoryChannelKeys_read(byte[] ser);
	// void KeysManager_free(LDKKeysManager this_ptr);
	public static native void KeysManager_free(long this_ptr);
	// MUST_USE_RES LDKKeysManager KeysManager_new(const uint8_t (*seed)[32], LDKNetwork network, uint64_t starting_time_secs, uint32_t starting_time_nanos);
	public static native long KeysManager_new(byte[] seed, LDKNetwork network, long starting_time_secs, int starting_time_nanos);
	// MUST_USE_RES LDKInMemoryChannelKeys KeysManager_derive_channel_keys(const LDKKeysManager *this_arg, uint64_t channel_value_satoshis, uint64_t params_1, uint64_t params_2);
	public static native long KeysManager_derive_channel_keys(long this_arg, long channel_value_satoshis, long params_1, long params_2);
	// LDKKeysInterface KeysManager_as_KeysInterface(const LDKKeysManager *this_arg);
	public static native long KeysManager_as_KeysInterface(long this_arg);
	// void ChannelManager_free(LDKChannelManager this_ptr);
	public static native void ChannelManager_free(long this_ptr);
	// void ChannelDetails_free(LDKChannelDetails this_ptr);
	public static native void ChannelDetails_free(long this_ptr);
	// LDKChannelDetails ChannelDetails_clone(const LDKChannelDetails *orig);
	public static native long ChannelDetails_clone(long orig);
	// const uint8_t (*ChannelDetails_get_channel_id(const LDKChannelDetails *this_ptr))[32];
	public static native byte[] ChannelDetails_get_channel_id(long this_ptr);
	// void ChannelDetails_set_channel_id(LDKChannelDetails *this_ptr, LDKThirtyTwoBytes val);
	public static native void ChannelDetails_set_channel_id(long this_ptr, byte[] val);
	// LDKPublicKey ChannelDetails_get_remote_network_id(const LDKChannelDetails *this_ptr);
	public static native byte[] ChannelDetails_get_remote_network_id(long this_ptr);
	// void ChannelDetails_set_remote_network_id(LDKChannelDetails *this_ptr, LDKPublicKey val);
	public static native void ChannelDetails_set_remote_network_id(long this_ptr, byte[] val);
	// LDKInitFeatures ChannelDetails_get_counterparty_features(const LDKChannelDetails *this_ptr);
	public static native long ChannelDetails_get_counterparty_features(long this_ptr);
	// void ChannelDetails_set_counterparty_features(LDKChannelDetails *this_ptr, LDKInitFeatures val);
	public static native void ChannelDetails_set_counterparty_features(long this_ptr, long val);
	// uint64_t ChannelDetails_get_channel_value_satoshis(const LDKChannelDetails *this_ptr);
	public static native long ChannelDetails_get_channel_value_satoshis(long this_ptr);
	// void ChannelDetails_set_channel_value_satoshis(LDKChannelDetails *this_ptr, uint64_t val);
	public static native void ChannelDetails_set_channel_value_satoshis(long this_ptr, long val);
	// uint64_t ChannelDetails_get_user_id(const LDKChannelDetails *this_ptr);
	public static native long ChannelDetails_get_user_id(long this_ptr);
	// void ChannelDetails_set_user_id(LDKChannelDetails *this_ptr, uint64_t val);
	public static native void ChannelDetails_set_user_id(long this_ptr, long val);
	// uint64_t ChannelDetails_get_outbound_capacity_msat(const LDKChannelDetails *this_ptr);
	public static native long ChannelDetails_get_outbound_capacity_msat(long this_ptr);
	// void ChannelDetails_set_outbound_capacity_msat(LDKChannelDetails *this_ptr, uint64_t val);
	public static native void ChannelDetails_set_outbound_capacity_msat(long this_ptr, long val);
	// uint64_t ChannelDetails_get_inbound_capacity_msat(const LDKChannelDetails *this_ptr);
	public static native long ChannelDetails_get_inbound_capacity_msat(long this_ptr);
	// void ChannelDetails_set_inbound_capacity_msat(LDKChannelDetails *this_ptr, uint64_t val);
	public static native void ChannelDetails_set_inbound_capacity_msat(long this_ptr, long val);
	// bool ChannelDetails_get_is_live(const LDKChannelDetails *this_ptr);
	public static native boolean ChannelDetails_get_is_live(long this_ptr);
	// void ChannelDetails_set_is_live(LDKChannelDetails *this_ptr, bool val);
	public static native void ChannelDetails_set_is_live(long this_ptr, boolean val);
	// void PaymentSendFailure_free(LDKPaymentSendFailure this_ptr);
	public static native void PaymentSendFailure_free(long this_ptr);
	// MUST_USE_RES LDKChannelManager ChannelManager_new(LDKNetwork network, LDKFeeEstimator fee_est, LDKWatch chain_monitor, LDKBroadcasterInterface tx_broadcaster, LDKLogger logger, LDKKeysInterface keys_manager, LDKUserConfig config, uintptr_t current_blockchain_height);
	public static native long ChannelManager_new(LDKNetwork network, long fee_est, long chain_monitor, long tx_broadcaster, long logger, long keys_manager, long config, long current_blockchain_height);
	// MUST_USE_RES LDKCResult_NoneAPIErrorZ ChannelManager_create_channel(const LDKChannelManager *this_arg, LDKPublicKey their_network_key, uint64_t channel_value_satoshis, uint64_t push_msat, uint64_t user_id, LDKUserConfig override_config);
	public static native long ChannelManager_create_channel(long this_arg, byte[] their_network_key, long channel_value_satoshis, long push_msat, long user_id, long override_config);
	// MUST_USE_RES LDKCVec_ChannelDetailsZ ChannelManager_list_channels(const LDKChannelManager *this_arg);
	public static native long[] ChannelManager_list_channels(long this_arg);
	// MUST_USE_RES LDKCVec_ChannelDetailsZ ChannelManager_list_usable_channels(const LDKChannelManager *this_arg);
	public static native long[] ChannelManager_list_usable_channels(long this_arg);
	// MUST_USE_RES LDKCResult_NoneAPIErrorZ ChannelManager_close_channel(const LDKChannelManager *this_arg, const uint8_t (*channel_id)[32]);
	public static native long ChannelManager_close_channel(long this_arg, byte[] channel_id);
	// void ChannelManager_force_close_channel(const LDKChannelManager *this_arg, const uint8_t (*channel_id)[32]);
	public static native void ChannelManager_force_close_channel(long this_arg, byte[] channel_id);
	// void ChannelManager_force_close_all_channels(const LDKChannelManager *this_arg);
	public static native void ChannelManager_force_close_all_channels(long this_arg);
	// MUST_USE_RES LDKCResult_NonePaymentSendFailureZ ChannelManager_send_payment(const LDKChannelManager *this_arg, const LDKRoute *route, LDKThirtyTwoBytes payment_hash, LDKThirtyTwoBytes payment_secret);
	public static native long ChannelManager_send_payment(long this_arg, long route, byte[] payment_hash, byte[] payment_secret);
	// void ChannelManager_funding_transaction_generated(const LDKChannelManager *this_arg, const uint8_t (*temporary_channel_id)[32], LDKOutPoint funding_txo);
	public static native void ChannelManager_funding_transaction_generated(long this_arg, byte[] temporary_channel_id, long funding_txo);
	// void ChannelManager_broadcast_node_announcement(const LDKChannelManager *this_arg, LDKThreeBytes rgb, LDKThirtyTwoBytes alias, LDKCVec_NetAddressZ addresses);
	public static native void ChannelManager_broadcast_node_announcement(long this_arg, byte[] rgb, byte[] alias, long[] addresses);
	// void ChannelManager_process_pending_htlc_forwards(const LDKChannelManager *this_arg);
	public static native void ChannelManager_process_pending_htlc_forwards(long this_arg);
	// void ChannelManager_timer_chan_freshness_every_min(const LDKChannelManager *this_arg);
	public static native void ChannelManager_timer_chan_freshness_every_min(long this_arg);
	// MUST_USE_RES bool ChannelManager_fail_htlc_backwards(const LDKChannelManager *this_arg, const uint8_t (*payment_hash)[32], LDKThirtyTwoBytes payment_secret);
	public static native boolean ChannelManager_fail_htlc_backwards(long this_arg, byte[] payment_hash, byte[] payment_secret);
	// MUST_USE_RES bool ChannelManager_claim_funds(const LDKChannelManager *this_arg, LDKThirtyTwoBytes payment_preimage, LDKThirtyTwoBytes payment_secret, uint64_t expected_amount);
	public static native boolean ChannelManager_claim_funds(long this_arg, byte[] payment_preimage, byte[] payment_secret, long expected_amount);
	// MUST_USE_RES LDKPublicKey ChannelManager_get_our_node_id(const LDKChannelManager *this_arg);
	public static native byte[] ChannelManager_get_our_node_id(long this_arg);
	// void ChannelManager_channel_monitor_updated(const LDKChannelManager *this_arg, const LDKOutPoint *funding_txo, uint64_t highest_applied_update_id);
	public static native void ChannelManager_channel_monitor_updated(long this_arg, long funding_txo, long highest_applied_update_id);
	// LDKMessageSendEventsProvider ChannelManager_as_MessageSendEventsProvider(const LDKChannelManager *this_arg);
	public static native long ChannelManager_as_MessageSendEventsProvider(long this_arg);
	// LDKEventsProvider ChannelManager_as_EventsProvider(const LDKChannelManager *this_arg);
	public static native long ChannelManager_as_EventsProvider(long this_arg);
	// void ChannelManager_block_connected(const LDKChannelManager *this_arg, const uint8_t (*header)[80], LDKCVec_C2Tuple_usizeTransactionZZ txdata, uint32_t height);
	public static native void ChannelManager_block_connected(long this_arg, byte[] header, long[] txdata, int height);
	// void ChannelManager_block_disconnected(const LDKChannelManager *this_arg, const uint8_t (*header)[80]);
	public static native void ChannelManager_block_disconnected(long this_arg, byte[] header);
	// LDKChannelMessageHandler ChannelManager_as_ChannelMessageHandler(const LDKChannelManager *this_arg);
	public static native long ChannelManager_as_ChannelMessageHandler(long this_arg);
	// void ChannelManagerReadArgs_free(LDKChannelManagerReadArgs this_ptr);
	public static native void ChannelManagerReadArgs_free(long this_ptr);
	// const LDKKeysInterface *ChannelManagerReadArgs_get_keys_manager(const LDKChannelManagerReadArgs *this_ptr);
	public static native long ChannelManagerReadArgs_get_keys_manager(long this_ptr);
	// void ChannelManagerReadArgs_set_keys_manager(LDKChannelManagerReadArgs *this_ptr, LDKKeysInterface val);
	public static native void ChannelManagerReadArgs_set_keys_manager(long this_ptr, long val);
	// const LDKFeeEstimator *ChannelManagerReadArgs_get_fee_estimator(const LDKChannelManagerReadArgs *this_ptr);
	public static native long ChannelManagerReadArgs_get_fee_estimator(long this_ptr);
	// void ChannelManagerReadArgs_set_fee_estimator(LDKChannelManagerReadArgs *this_ptr, LDKFeeEstimator val);
	public static native void ChannelManagerReadArgs_set_fee_estimator(long this_ptr, long val);
	// const LDKWatch *ChannelManagerReadArgs_get_chain_monitor(const LDKChannelManagerReadArgs *this_ptr);
	public static native long ChannelManagerReadArgs_get_chain_monitor(long this_ptr);
	// void ChannelManagerReadArgs_set_chain_monitor(LDKChannelManagerReadArgs *this_ptr, LDKWatch val);
	public static native void ChannelManagerReadArgs_set_chain_monitor(long this_ptr, long val);
	// const LDKBroadcasterInterface *ChannelManagerReadArgs_get_tx_broadcaster(const LDKChannelManagerReadArgs *this_ptr);
	public static native long ChannelManagerReadArgs_get_tx_broadcaster(long this_ptr);
	// void ChannelManagerReadArgs_set_tx_broadcaster(LDKChannelManagerReadArgs *this_ptr, LDKBroadcasterInterface val);
	public static native void ChannelManagerReadArgs_set_tx_broadcaster(long this_ptr, long val);
	// const LDKLogger *ChannelManagerReadArgs_get_logger(const LDKChannelManagerReadArgs *this_ptr);
	public static native long ChannelManagerReadArgs_get_logger(long this_ptr);
	// void ChannelManagerReadArgs_set_logger(LDKChannelManagerReadArgs *this_ptr, LDKLogger val);
	public static native void ChannelManagerReadArgs_set_logger(long this_ptr, long val);
	// LDKUserConfig ChannelManagerReadArgs_get_default_config(const LDKChannelManagerReadArgs *this_ptr);
	public static native long ChannelManagerReadArgs_get_default_config(long this_ptr);
	// void ChannelManagerReadArgs_set_default_config(LDKChannelManagerReadArgs *this_ptr, LDKUserConfig val);
	public static native void ChannelManagerReadArgs_set_default_config(long this_ptr, long val);
	// MUST_USE_RES LDKChannelManagerReadArgs ChannelManagerReadArgs_new(LDKKeysInterface keys_manager, LDKFeeEstimator fee_estimator, LDKWatch chain_monitor, LDKBroadcasterInterface tx_broadcaster, LDKLogger logger, LDKUserConfig default_config, LDKCVec_ChannelMonitorZ channel_monitors);
	public static native long ChannelManagerReadArgs_new(long keys_manager, long fee_estimator, long chain_monitor, long tx_broadcaster, long logger, long default_config, long[] channel_monitors);
	// void DecodeError_free(LDKDecodeError this_ptr);
	public static native void DecodeError_free(long this_ptr);
	// void Init_free(LDKInit this_ptr);
	public static native void Init_free(long this_ptr);
	// LDKInit Init_clone(const LDKInit *orig);
	public static native long Init_clone(long orig);
	// void ErrorMessage_free(LDKErrorMessage this_ptr);
	public static native void ErrorMessage_free(long this_ptr);
	// LDKErrorMessage ErrorMessage_clone(const LDKErrorMessage *orig);
	public static native long ErrorMessage_clone(long orig);
	// const uint8_t (*ErrorMessage_get_channel_id(const LDKErrorMessage *this_ptr))[32];
	public static native byte[] ErrorMessage_get_channel_id(long this_ptr);
	// void ErrorMessage_set_channel_id(LDKErrorMessage *this_ptr, LDKThirtyTwoBytes val);
	public static native void ErrorMessage_set_channel_id(long this_ptr, byte[] val);
	// LDKStr ErrorMessage_get_data(const LDKErrorMessage *this_ptr);
	public static native String ErrorMessage_get_data(long this_ptr);
	// void ErrorMessage_set_data(LDKErrorMessage *this_ptr, LDKCVec_u8Z val);
	public static native void ErrorMessage_set_data(long this_ptr, byte[] val);
	// MUST_USE_RES LDKErrorMessage ErrorMessage_new(LDKThirtyTwoBytes channel_id_arg, LDKCVec_u8Z data_arg);
	public static native long ErrorMessage_new(byte[] channel_id_arg, byte[] data_arg);
	// void Ping_free(LDKPing this_ptr);
	public static native void Ping_free(long this_ptr);
	// LDKPing Ping_clone(const LDKPing *orig);
	public static native long Ping_clone(long orig);
	// uint16_t Ping_get_ponglen(const LDKPing *this_ptr);
	public static native short Ping_get_ponglen(long this_ptr);
	// void Ping_set_ponglen(LDKPing *this_ptr, uint16_t val);
	public static native void Ping_set_ponglen(long this_ptr, short val);
	// uint16_t Ping_get_byteslen(const LDKPing *this_ptr);
	public static native short Ping_get_byteslen(long this_ptr);
	// void Ping_set_byteslen(LDKPing *this_ptr, uint16_t val);
	public static native void Ping_set_byteslen(long this_ptr, short val);
	// MUST_USE_RES LDKPing Ping_new(uint16_t ponglen_arg, uint16_t byteslen_arg);
	public static native long Ping_new(short ponglen_arg, short byteslen_arg);
	// void Pong_free(LDKPong this_ptr);
	public static native void Pong_free(long this_ptr);
	// LDKPong Pong_clone(const LDKPong *orig);
	public static native long Pong_clone(long orig);
	// uint16_t Pong_get_byteslen(const LDKPong *this_ptr);
	public static native short Pong_get_byteslen(long this_ptr);
	// void Pong_set_byteslen(LDKPong *this_ptr, uint16_t val);
	public static native void Pong_set_byteslen(long this_ptr, short val);
	// MUST_USE_RES LDKPong Pong_new(uint16_t byteslen_arg);
	public static native long Pong_new(short byteslen_arg);
	// void OpenChannel_free(LDKOpenChannel this_ptr);
	public static native void OpenChannel_free(long this_ptr);
	// LDKOpenChannel OpenChannel_clone(const LDKOpenChannel *orig);
	public static native long OpenChannel_clone(long orig);
	// const uint8_t (*OpenChannel_get_chain_hash(const LDKOpenChannel *this_ptr))[32];
	public static native byte[] OpenChannel_get_chain_hash(long this_ptr);
	// void OpenChannel_set_chain_hash(LDKOpenChannel *this_ptr, LDKThirtyTwoBytes val);
	public static native void OpenChannel_set_chain_hash(long this_ptr, byte[] val);
	// const uint8_t (*OpenChannel_get_temporary_channel_id(const LDKOpenChannel *this_ptr))[32];
	public static native byte[] OpenChannel_get_temporary_channel_id(long this_ptr);
	// void OpenChannel_set_temporary_channel_id(LDKOpenChannel *this_ptr, LDKThirtyTwoBytes val);
	public static native void OpenChannel_set_temporary_channel_id(long this_ptr, byte[] val);
	// uint64_t OpenChannel_get_funding_satoshis(const LDKOpenChannel *this_ptr);
	public static native long OpenChannel_get_funding_satoshis(long this_ptr);
	// void OpenChannel_set_funding_satoshis(LDKOpenChannel *this_ptr, uint64_t val);
	public static native void OpenChannel_set_funding_satoshis(long this_ptr, long val);
	// uint64_t OpenChannel_get_push_msat(const LDKOpenChannel *this_ptr);
	public static native long OpenChannel_get_push_msat(long this_ptr);
	// void OpenChannel_set_push_msat(LDKOpenChannel *this_ptr, uint64_t val);
	public static native void OpenChannel_set_push_msat(long this_ptr, long val);
	// uint64_t OpenChannel_get_dust_limit_satoshis(const LDKOpenChannel *this_ptr);
	public static native long OpenChannel_get_dust_limit_satoshis(long this_ptr);
	// void OpenChannel_set_dust_limit_satoshis(LDKOpenChannel *this_ptr, uint64_t val);
	public static native void OpenChannel_set_dust_limit_satoshis(long this_ptr, long val);
	// uint64_t OpenChannel_get_max_htlc_value_in_flight_msat(const LDKOpenChannel *this_ptr);
	public static native long OpenChannel_get_max_htlc_value_in_flight_msat(long this_ptr);
	// void OpenChannel_set_max_htlc_value_in_flight_msat(LDKOpenChannel *this_ptr, uint64_t val);
	public static native void OpenChannel_set_max_htlc_value_in_flight_msat(long this_ptr, long val);
	// uint64_t OpenChannel_get_channel_reserve_satoshis(const LDKOpenChannel *this_ptr);
	public static native long OpenChannel_get_channel_reserve_satoshis(long this_ptr);
	// void OpenChannel_set_channel_reserve_satoshis(LDKOpenChannel *this_ptr, uint64_t val);
	public static native void OpenChannel_set_channel_reserve_satoshis(long this_ptr, long val);
	// uint64_t OpenChannel_get_htlc_minimum_msat(const LDKOpenChannel *this_ptr);
	public static native long OpenChannel_get_htlc_minimum_msat(long this_ptr);
	// void OpenChannel_set_htlc_minimum_msat(LDKOpenChannel *this_ptr, uint64_t val);
	public static native void OpenChannel_set_htlc_minimum_msat(long this_ptr, long val);
	// uint32_t OpenChannel_get_feerate_per_kw(const LDKOpenChannel *this_ptr);
	public static native int OpenChannel_get_feerate_per_kw(long this_ptr);
	// void OpenChannel_set_feerate_per_kw(LDKOpenChannel *this_ptr, uint32_t val);
	public static native void OpenChannel_set_feerate_per_kw(long this_ptr, int val);
	// uint16_t OpenChannel_get_to_self_delay(const LDKOpenChannel *this_ptr);
	public static native short OpenChannel_get_to_self_delay(long this_ptr);
	// void OpenChannel_set_to_self_delay(LDKOpenChannel *this_ptr, uint16_t val);
	public static native void OpenChannel_set_to_self_delay(long this_ptr, short val);
	// uint16_t OpenChannel_get_max_accepted_htlcs(const LDKOpenChannel *this_ptr);
	public static native short OpenChannel_get_max_accepted_htlcs(long this_ptr);
	// void OpenChannel_set_max_accepted_htlcs(LDKOpenChannel *this_ptr, uint16_t val);
	public static native void OpenChannel_set_max_accepted_htlcs(long this_ptr, short val);
	// LDKPublicKey OpenChannel_get_funding_pubkey(const LDKOpenChannel *this_ptr);
	public static native byte[] OpenChannel_get_funding_pubkey(long this_ptr);
	// void OpenChannel_set_funding_pubkey(LDKOpenChannel *this_ptr, LDKPublicKey val);
	public static native void OpenChannel_set_funding_pubkey(long this_ptr, byte[] val);
	// LDKPublicKey OpenChannel_get_revocation_basepoint(const LDKOpenChannel *this_ptr);
	public static native byte[] OpenChannel_get_revocation_basepoint(long this_ptr);
	// void OpenChannel_set_revocation_basepoint(LDKOpenChannel *this_ptr, LDKPublicKey val);
	public static native void OpenChannel_set_revocation_basepoint(long this_ptr, byte[] val);
	// LDKPublicKey OpenChannel_get_payment_point(const LDKOpenChannel *this_ptr);
	public static native byte[] OpenChannel_get_payment_point(long this_ptr);
	// void OpenChannel_set_payment_point(LDKOpenChannel *this_ptr, LDKPublicKey val);
	public static native void OpenChannel_set_payment_point(long this_ptr, byte[] val);
	// LDKPublicKey OpenChannel_get_delayed_payment_basepoint(const LDKOpenChannel *this_ptr);
	public static native byte[] OpenChannel_get_delayed_payment_basepoint(long this_ptr);
	// void OpenChannel_set_delayed_payment_basepoint(LDKOpenChannel *this_ptr, LDKPublicKey val);
	public static native void OpenChannel_set_delayed_payment_basepoint(long this_ptr, byte[] val);
	// LDKPublicKey OpenChannel_get_htlc_basepoint(const LDKOpenChannel *this_ptr);
	public static native byte[] OpenChannel_get_htlc_basepoint(long this_ptr);
	// void OpenChannel_set_htlc_basepoint(LDKOpenChannel *this_ptr, LDKPublicKey val);
	public static native void OpenChannel_set_htlc_basepoint(long this_ptr, byte[] val);
	// LDKPublicKey OpenChannel_get_first_per_commitment_point(const LDKOpenChannel *this_ptr);
	public static native byte[] OpenChannel_get_first_per_commitment_point(long this_ptr);
	// void OpenChannel_set_first_per_commitment_point(LDKOpenChannel *this_ptr, LDKPublicKey val);
	public static native void OpenChannel_set_first_per_commitment_point(long this_ptr, byte[] val);
	// uint8_t OpenChannel_get_channel_flags(const LDKOpenChannel *this_ptr);
	public static native byte OpenChannel_get_channel_flags(long this_ptr);
	// void OpenChannel_set_channel_flags(LDKOpenChannel *this_ptr, uint8_t val);
	public static native void OpenChannel_set_channel_flags(long this_ptr, byte val);
	// void AcceptChannel_free(LDKAcceptChannel this_ptr);
	public static native void AcceptChannel_free(long this_ptr);
	// LDKAcceptChannel AcceptChannel_clone(const LDKAcceptChannel *orig);
	public static native long AcceptChannel_clone(long orig);
	// const uint8_t (*AcceptChannel_get_temporary_channel_id(const LDKAcceptChannel *this_ptr))[32];
	public static native byte[] AcceptChannel_get_temporary_channel_id(long this_ptr);
	// void AcceptChannel_set_temporary_channel_id(LDKAcceptChannel *this_ptr, LDKThirtyTwoBytes val);
	public static native void AcceptChannel_set_temporary_channel_id(long this_ptr, byte[] val);
	// uint64_t AcceptChannel_get_dust_limit_satoshis(const LDKAcceptChannel *this_ptr);
	public static native long AcceptChannel_get_dust_limit_satoshis(long this_ptr);
	// void AcceptChannel_set_dust_limit_satoshis(LDKAcceptChannel *this_ptr, uint64_t val);
	public static native void AcceptChannel_set_dust_limit_satoshis(long this_ptr, long val);
	// uint64_t AcceptChannel_get_max_htlc_value_in_flight_msat(const LDKAcceptChannel *this_ptr);
	public static native long AcceptChannel_get_max_htlc_value_in_flight_msat(long this_ptr);
	// void AcceptChannel_set_max_htlc_value_in_flight_msat(LDKAcceptChannel *this_ptr, uint64_t val);
	public static native void AcceptChannel_set_max_htlc_value_in_flight_msat(long this_ptr, long val);
	// uint64_t AcceptChannel_get_channel_reserve_satoshis(const LDKAcceptChannel *this_ptr);
	public static native long AcceptChannel_get_channel_reserve_satoshis(long this_ptr);
	// void AcceptChannel_set_channel_reserve_satoshis(LDKAcceptChannel *this_ptr, uint64_t val);
	public static native void AcceptChannel_set_channel_reserve_satoshis(long this_ptr, long val);
	// uint64_t AcceptChannel_get_htlc_minimum_msat(const LDKAcceptChannel *this_ptr);
	public static native long AcceptChannel_get_htlc_minimum_msat(long this_ptr);
	// void AcceptChannel_set_htlc_minimum_msat(LDKAcceptChannel *this_ptr, uint64_t val);
	public static native void AcceptChannel_set_htlc_minimum_msat(long this_ptr, long val);
	// uint32_t AcceptChannel_get_minimum_depth(const LDKAcceptChannel *this_ptr);
	public static native int AcceptChannel_get_minimum_depth(long this_ptr);
	// void AcceptChannel_set_minimum_depth(LDKAcceptChannel *this_ptr, uint32_t val);
	public static native void AcceptChannel_set_minimum_depth(long this_ptr, int val);
	// uint16_t AcceptChannel_get_to_self_delay(const LDKAcceptChannel *this_ptr);
	public static native short AcceptChannel_get_to_self_delay(long this_ptr);
	// void AcceptChannel_set_to_self_delay(LDKAcceptChannel *this_ptr, uint16_t val);
	public static native void AcceptChannel_set_to_self_delay(long this_ptr, short val);
	// uint16_t AcceptChannel_get_max_accepted_htlcs(const LDKAcceptChannel *this_ptr);
	public static native short AcceptChannel_get_max_accepted_htlcs(long this_ptr);
	// void AcceptChannel_set_max_accepted_htlcs(LDKAcceptChannel *this_ptr, uint16_t val);
	public static native void AcceptChannel_set_max_accepted_htlcs(long this_ptr, short val);
	// LDKPublicKey AcceptChannel_get_funding_pubkey(const LDKAcceptChannel *this_ptr);
	public static native byte[] AcceptChannel_get_funding_pubkey(long this_ptr);
	// void AcceptChannel_set_funding_pubkey(LDKAcceptChannel *this_ptr, LDKPublicKey val);
	public static native void AcceptChannel_set_funding_pubkey(long this_ptr, byte[] val);
	// LDKPublicKey AcceptChannel_get_revocation_basepoint(const LDKAcceptChannel *this_ptr);
	public static native byte[] AcceptChannel_get_revocation_basepoint(long this_ptr);
	// void AcceptChannel_set_revocation_basepoint(LDKAcceptChannel *this_ptr, LDKPublicKey val);
	public static native void AcceptChannel_set_revocation_basepoint(long this_ptr, byte[] val);
	// LDKPublicKey AcceptChannel_get_payment_point(const LDKAcceptChannel *this_ptr);
	public static native byte[] AcceptChannel_get_payment_point(long this_ptr);
	// void AcceptChannel_set_payment_point(LDKAcceptChannel *this_ptr, LDKPublicKey val);
	public static native void AcceptChannel_set_payment_point(long this_ptr, byte[] val);
	// LDKPublicKey AcceptChannel_get_delayed_payment_basepoint(const LDKAcceptChannel *this_ptr);
	public static native byte[] AcceptChannel_get_delayed_payment_basepoint(long this_ptr);
	// void AcceptChannel_set_delayed_payment_basepoint(LDKAcceptChannel *this_ptr, LDKPublicKey val);
	public static native void AcceptChannel_set_delayed_payment_basepoint(long this_ptr, byte[] val);
	// LDKPublicKey AcceptChannel_get_htlc_basepoint(const LDKAcceptChannel *this_ptr);
	public static native byte[] AcceptChannel_get_htlc_basepoint(long this_ptr);
	// void AcceptChannel_set_htlc_basepoint(LDKAcceptChannel *this_ptr, LDKPublicKey val);
	public static native void AcceptChannel_set_htlc_basepoint(long this_ptr, byte[] val);
	// LDKPublicKey AcceptChannel_get_first_per_commitment_point(const LDKAcceptChannel *this_ptr);
	public static native byte[] AcceptChannel_get_first_per_commitment_point(long this_ptr);
	// void AcceptChannel_set_first_per_commitment_point(LDKAcceptChannel *this_ptr, LDKPublicKey val);
	public static native void AcceptChannel_set_first_per_commitment_point(long this_ptr, byte[] val);
	// void FundingCreated_free(LDKFundingCreated this_ptr);
	public static native void FundingCreated_free(long this_ptr);
	// LDKFundingCreated FundingCreated_clone(const LDKFundingCreated *orig);
	public static native long FundingCreated_clone(long orig);
	// const uint8_t (*FundingCreated_get_temporary_channel_id(const LDKFundingCreated *this_ptr))[32];
	public static native byte[] FundingCreated_get_temporary_channel_id(long this_ptr);
	// void FundingCreated_set_temporary_channel_id(LDKFundingCreated *this_ptr, LDKThirtyTwoBytes val);
	public static native void FundingCreated_set_temporary_channel_id(long this_ptr, byte[] val);
	// const uint8_t (*FundingCreated_get_funding_txid(const LDKFundingCreated *this_ptr))[32];
	public static native byte[] FundingCreated_get_funding_txid(long this_ptr);
	// void FundingCreated_set_funding_txid(LDKFundingCreated *this_ptr, LDKThirtyTwoBytes val);
	public static native void FundingCreated_set_funding_txid(long this_ptr, byte[] val);
	// uint16_t FundingCreated_get_funding_output_index(const LDKFundingCreated *this_ptr);
	public static native short FundingCreated_get_funding_output_index(long this_ptr);
	// void FundingCreated_set_funding_output_index(LDKFundingCreated *this_ptr, uint16_t val);
	public static native void FundingCreated_set_funding_output_index(long this_ptr, short val);
	// LDKSignature FundingCreated_get_signature(const LDKFundingCreated *this_ptr);
	public static native byte[] FundingCreated_get_signature(long this_ptr);
	// void FundingCreated_set_signature(LDKFundingCreated *this_ptr, LDKSignature val);
	public static native void FundingCreated_set_signature(long this_ptr, byte[] val);
	// MUST_USE_RES LDKFundingCreated FundingCreated_new(LDKThirtyTwoBytes temporary_channel_id_arg, LDKThirtyTwoBytes funding_txid_arg, uint16_t funding_output_index_arg, LDKSignature signature_arg);
	public static native long FundingCreated_new(byte[] temporary_channel_id_arg, byte[] funding_txid_arg, short funding_output_index_arg, byte[] signature_arg);
	// void FundingSigned_free(LDKFundingSigned this_ptr);
	public static native void FundingSigned_free(long this_ptr);
	// LDKFundingSigned FundingSigned_clone(const LDKFundingSigned *orig);
	public static native long FundingSigned_clone(long orig);
	// const uint8_t (*FundingSigned_get_channel_id(const LDKFundingSigned *this_ptr))[32];
	public static native byte[] FundingSigned_get_channel_id(long this_ptr);
	// void FundingSigned_set_channel_id(LDKFundingSigned *this_ptr, LDKThirtyTwoBytes val);
	public static native void FundingSigned_set_channel_id(long this_ptr, byte[] val);
	// LDKSignature FundingSigned_get_signature(const LDKFundingSigned *this_ptr);
	public static native byte[] FundingSigned_get_signature(long this_ptr);
	// void FundingSigned_set_signature(LDKFundingSigned *this_ptr, LDKSignature val);
	public static native void FundingSigned_set_signature(long this_ptr, byte[] val);
	// MUST_USE_RES LDKFundingSigned FundingSigned_new(LDKThirtyTwoBytes channel_id_arg, LDKSignature signature_arg);
	public static native long FundingSigned_new(byte[] channel_id_arg, byte[] signature_arg);
	// void FundingLocked_free(LDKFundingLocked this_ptr);
	public static native void FundingLocked_free(long this_ptr);
	// LDKFundingLocked FundingLocked_clone(const LDKFundingLocked *orig);
	public static native long FundingLocked_clone(long orig);
	// const uint8_t (*FundingLocked_get_channel_id(const LDKFundingLocked *this_ptr))[32];
	public static native byte[] FundingLocked_get_channel_id(long this_ptr);
	// void FundingLocked_set_channel_id(LDKFundingLocked *this_ptr, LDKThirtyTwoBytes val);
	public static native void FundingLocked_set_channel_id(long this_ptr, byte[] val);
	// LDKPublicKey FundingLocked_get_next_per_commitment_point(const LDKFundingLocked *this_ptr);
	public static native byte[] FundingLocked_get_next_per_commitment_point(long this_ptr);
	// void FundingLocked_set_next_per_commitment_point(LDKFundingLocked *this_ptr, LDKPublicKey val);
	public static native void FundingLocked_set_next_per_commitment_point(long this_ptr, byte[] val);
	// MUST_USE_RES LDKFundingLocked FundingLocked_new(LDKThirtyTwoBytes channel_id_arg, LDKPublicKey next_per_commitment_point_arg);
	public static native long FundingLocked_new(byte[] channel_id_arg, byte[] next_per_commitment_point_arg);
	// void Shutdown_free(LDKShutdown this_ptr);
	public static native void Shutdown_free(long this_ptr);
	// LDKShutdown Shutdown_clone(const LDKShutdown *orig);
	public static native long Shutdown_clone(long orig);
	// const uint8_t (*Shutdown_get_channel_id(const LDKShutdown *this_ptr))[32];
	public static native byte[] Shutdown_get_channel_id(long this_ptr);
	// void Shutdown_set_channel_id(LDKShutdown *this_ptr, LDKThirtyTwoBytes val);
	public static native void Shutdown_set_channel_id(long this_ptr, byte[] val);
	// LDKu8slice Shutdown_get_scriptpubkey(const LDKShutdown *this_ptr);
	public static native byte[] Shutdown_get_scriptpubkey(long this_ptr);
	// void Shutdown_set_scriptpubkey(LDKShutdown *this_ptr, LDKCVec_u8Z val);
	public static native void Shutdown_set_scriptpubkey(long this_ptr, byte[] val);
	// MUST_USE_RES LDKShutdown Shutdown_new(LDKThirtyTwoBytes channel_id_arg, LDKCVec_u8Z scriptpubkey_arg);
	public static native long Shutdown_new(byte[] channel_id_arg, byte[] scriptpubkey_arg);
	// void ClosingSigned_free(LDKClosingSigned this_ptr);
	public static native void ClosingSigned_free(long this_ptr);
	// LDKClosingSigned ClosingSigned_clone(const LDKClosingSigned *orig);
	public static native long ClosingSigned_clone(long orig);
	// const uint8_t (*ClosingSigned_get_channel_id(const LDKClosingSigned *this_ptr))[32];
	public static native byte[] ClosingSigned_get_channel_id(long this_ptr);
	// void ClosingSigned_set_channel_id(LDKClosingSigned *this_ptr, LDKThirtyTwoBytes val);
	public static native void ClosingSigned_set_channel_id(long this_ptr, byte[] val);
	// uint64_t ClosingSigned_get_fee_satoshis(const LDKClosingSigned *this_ptr);
	public static native long ClosingSigned_get_fee_satoshis(long this_ptr);
	// void ClosingSigned_set_fee_satoshis(LDKClosingSigned *this_ptr, uint64_t val);
	public static native void ClosingSigned_set_fee_satoshis(long this_ptr, long val);
	// LDKSignature ClosingSigned_get_signature(const LDKClosingSigned *this_ptr);
	public static native byte[] ClosingSigned_get_signature(long this_ptr);
	// void ClosingSigned_set_signature(LDKClosingSigned *this_ptr, LDKSignature val);
	public static native void ClosingSigned_set_signature(long this_ptr, byte[] val);
	// MUST_USE_RES LDKClosingSigned ClosingSigned_new(LDKThirtyTwoBytes channel_id_arg, uint64_t fee_satoshis_arg, LDKSignature signature_arg);
	public static native long ClosingSigned_new(byte[] channel_id_arg, long fee_satoshis_arg, byte[] signature_arg);
	// void UpdateAddHTLC_free(LDKUpdateAddHTLC this_ptr);
	public static native void UpdateAddHTLC_free(long this_ptr);
	// LDKUpdateAddHTLC UpdateAddHTLC_clone(const LDKUpdateAddHTLC *orig);
	public static native long UpdateAddHTLC_clone(long orig);
	// const uint8_t (*UpdateAddHTLC_get_channel_id(const LDKUpdateAddHTLC *this_ptr))[32];
	public static native byte[] UpdateAddHTLC_get_channel_id(long this_ptr);
	// void UpdateAddHTLC_set_channel_id(LDKUpdateAddHTLC *this_ptr, LDKThirtyTwoBytes val);
	public static native void UpdateAddHTLC_set_channel_id(long this_ptr, byte[] val);
	// uint64_t UpdateAddHTLC_get_htlc_id(const LDKUpdateAddHTLC *this_ptr);
	public static native long UpdateAddHTLC_get_htlc_id(long this_ptr);
	// void UpdateAddHTLC_set_htlc_id(LDKUpdateAddHTLC *this_ptr, uint64_t val);
	public static native void UpdateAddHTLC_set_htlc_id(long this_ptr, long val);
	// uint64_t UpdateAddHTLC_get_amount_msat(const LDKUpdateAddHTLC *this_ptr);
	public static native long UpdateAddHTLC_get_amount_msat(long this_ptr);
	// void UpdateAddHTLC_set_amount_msat(LDKUpdateAddHTLC *this_ptr, uint64_t val);
	public static native void UpdateAddHTLC_set_amount_msat(long this_ptr, long val);
	// const uint8_t (*UpdateAddHTLC_get_payment_hash(const LDKUpdateAddHTLC *this_ptr))[32];
	public static native byte[] UpdateAddHTLC_get_payment_hash(long this_ptr);
	// void UpdateAddHTLC_set_payment_hash(LDKUpdateAddHTLC *this_ptr, LDKThirtyTwoBytes val);
	public static native void UpdateAddHTLC_set_payment_hash(long this_ptr, byte[] val);
	// uint32_t UpdateAddHTLC_get_cltv_expiry(const LDKUpdateAddHTLC *this_ptr);
	public static native int UpdateAddHTLC_get_cltv_expiry(long this_ptr);
	// void UpdateAddHTLC_set_cltv_expiry(LDKUpdateAddHTLC *this_ptr, uint32_t val);
	public static native void UpdateAddHTLC_set_cltv_expiry(long this_ptr, int val);
	// void UpdateFulfillHTLC_free(LDKUpdateFulfillHTLC this_ptr);
	public static native void UpdateFulfillHTLC_free(long this_ptr);
	// LDKUpdateFulfillHTLC UpdateFulfillHTLC_clone(const LDKUpdateFulfillHTLC *orig);
	public static native long UpdateFulfillHTLC_clone(long orig);
	// const uint8_t (*UpdateFulfillHTLC_get_channel_id(const LDKUpdateFulfillHTLC *this_ptr))[32];
	public static native byte[] UpdateFulfillHTLC_get_channel_id(long this_ptr);
	// void UpdateFulfillHTLC_set_channel_id(LDKUpdateFulfillHTLC *this_ptr, LDKThirtyTwoBytes val);
	public static native void UpdateFulfillHTLC_set_channel_id(long this_ptr, byte[] val);
	// uint64_t UpdateFulfillHTLC_get_htlc_id(const LDKUpdateFulfillHTLC *this_ptr);
	public static native long UpdateFulfillHTLC_get_htlc_id(long this_ptr);
	// void UpdateFulfillHTLC_set_htlc_id(LDKUpdateFulfillHTLC *this_ptr, uint64_t val);
	public static native void UpdateFulfillHTLC_set_htlc_id(long this_ptr, long val);
	// const uint8_t (*UpdateFulfillHTLC_get_payment_preimage(const LDKUpdateFulfillHTLC *this_ptr))[32];
	public static native byte[] UpdateFulfillHTLC_get_payment_preimage(long this_ptr);
	// void UpdateFulfillHTLC_set_payment_preimage(LDKUpdateFulfillHTLC *this_ptr, LDKThirtyTwoBytes val);
	public static native void UpdateFulfillHTLC_set_payment_preimage(long this_ptr, byte[] val);
	// MUST_USE_RES LDKUpdateFulfillHTLC UpdateFulfillHTLC_new(LDKThirtyTwoBytes channel_id_arg, uint64_t htlc_id_arg, LDKThirtyTwoBytes payment_preimage_arg);
	public static native long UpdateFulfillHTLC_new(byte[] channel_id_arg, long htlc_id_arg, byte[] payment_preimage_arg);
	// void UpdateFailHTLC_free(LDKUpdateFailHTLC this_ptr);
	public static native void UpdateFailHTLC_free(long this_ptr);
	// LDKUpdateFailHTLC UpdateFailHTLC_clone(const LDKUpdateFailHTLC *orig);
	public static native long UpdateFailHTLC_clone(long orig);
	// const uint8_t (*UpdateFailHTLC_get_channel_id(const LDKUpdateFailHTLC *this_ptr))[32];
	public static native byte[] UpdateFailHTLC_get_channel_id(long this_ptr);
	// void UpdateFailHTLC_set_channel_id(LDKUpdateFailHTLC *this_ptr, LDKThirtyTwoBytes val);
	public static native void UpdateFailHTLC_set_channel_id(long this_ptr, byte[] val);
	// uint64_t UpdateFailHTLC_get_htlc_id(const LDKUpdateFailHTLC *this_ptr);
	public static native long UpdateFailHTLC_get_htlc_id(long this_ptr);
	// void UpdateFailHTLC_set_htlc_id(LDKUpdateFailHTLC *this_ptr, uint64_t val);
	public static native void UpdateFailHTLC_set_htlc_id(long this_ptr, long val);
	// void UpdateFailMalformedHTLC_free(LDKUpdateFailMalformedHTLC this_ptr);
	public static native void UpdateFailMalformedHTLC_free(long this_ptr);
	// LDKUpdateFailMalformedHTLC UpdateFailMalformedHTLC_clone(const LDKUpdateFailMalformedHTLC *orig);
	public static native long UpdateFailMalformedHTLC_clone(long orig);
	// const uint8_t (*UpdateFailMalformedHTLC_get_channel_id(const LDKUpdateFailMalformedHTLC *this_ptr))[32];
	public static native byte[] UpdateFailMalformedHTLC_get_channel_id(long this_ptr);
	// void UpdateFailMalformedHTLC_set_channel_id(LDKUpdateFailMalformedHTLC *this_ptr, LDKThirtyTwoBytes val);
	public static native void UpdateFailMalformedHTLC_set_channel_id(long this_ptr, byte[] val);
	// uint64_t UpdateFailMalformedHTLC_get_htlc_id(const LDKUpdateFailMalformedHTLC *this_ptr);
	public static native long UpdateFailMalformedHTLC_get_htlc_id(long this_ptr);
	// void UpdateFailMalformedHTLC_set_htlc_id(LDKUpdateFailMalformedHTLC *this_ptr, uint64_t val);
	public static native void UpdateFailMalformedHTLC_set_htlc_id(long this_ptr, long val);
	// uint16_t UpdateFailMalformedHTLC_get_failure_code(const LDKUpdateFailMalformedHTLC *this_ptr);
	public static native short UpdateFailMalformedHTLC_get_failure_code(long this_ptr);
	// void UpdateFailMalformedHTLC_set_failure_code(LDKUpdateFailMalformedHTLC *this_ptr, uint16_t val);
	public static native void UpdateFailMalformedHTLC_set_failure_code(long this_ptr, short val);
	// void CommitmentSigned_free(LDKCommitmentSigned this_ptr);
	public static native void CommitmentSigned_free(long this_ptr);
	// LDKCommitmentSigned CommitmentSigned_clone(const LDKCommitmentSigned *orig);
	public static native long CommitmentSigned_clone(long orig);
	// const uint8_t (*CommitmentSigned_get_channel_id(const LDKCommitmentSigned *this_ptr))[32];
	public static native byte[] CommitmentSigned_get_channel_id(long this_ptr);
	// void CommitmentSigned_set_channel_id(LDKCommitmentSigned *this_ptr, LDKThirtyTwoBytes val);
	public static native void CommitmentSigned_set_channel_id(long this_ptr, byte[] val);
	// LDKSignature CommitmentSigned_get_signature(const LDKCommitmentSigned *this_ptr);
	public static native byte[] CommitmentSigned_get_signature(long this_ptr);
	// void CommitmentSigned_set_signature(LDKCommitmentSigned *this_ptr, LDKSignature val);
	public static native void CommitmentSigned_set_signature(long this_ptr, byte[] val);
	// void CommitmentSigned_set_htlc_signatures(LDKCommitmentSigned *this_ptr, LDKCVec_SignatureZ val);
	public static native void CommitmentSigned_set_htlc_signatures(long this_ptr, byte[][] val);
	// MUST_USE_RES LDKCommitmentSigned CommitmentSigned_new(LDKThirtyTwoBytes channel_id_arg, LDKSignature signature_arg, LDKCVec_SignatureZ htlc_signatures_arg);
	public static native long CommitmentSigned_new(byte[] channel_id_arg, byte[] signature_arg, byte[][] htlc_signatures_arg);
	// void RevokeAndACK_free(LDKRevokeAndACK this_ptr);
	public static native void RevokeAndACK_free(long this_ptr);
	// LDKRevokeAndACK RevokeAndACK_clone(const LDKRevokeAndACK *orig);
	public static native long RevokeAndACK_clone(long orig);
	// const uint8_t (*RevokeAndACK_get_channel_id(const LDKRevokeAndACK *this_ptr))[32];
	public static native byte[] RevokeAndACK_get_channel_id(long this_ptr);
	// void RevokeAndACK_set_channel_id(LDKRevokeAndACK *this_ptr, LDKThirtyTwoBytes val);
	public static native void RevokeAndACK_set_channel_id(long this_ptr, byte[] val);
	// const uint8_t (*RevokeAndACK_get_per_commitment_secret(const LDKRevokeAndACK *this_ptr))[32];
	public static native byte[] RevokeAndACK_get_per_commitment_secret(long this_ptr);
	// void RevokeAndACK_set_per_commitment_secret(LDKRevokeAndACK *this_ptr, LDKThirtyTwoBytes val);
	public static native void RevokeAndACK_set_per_commitment_secret(long this_ptr, byte[] val);
	// LDKPublicKey RevokeAndACK_get_next_per_commitment_point(const LDKRevokeAndACK *this_ptr);
	public static native byte[] RevokeAndACK_get_next_per_commitment_point(long this_ptr);
	// void RevokeAndACK_set_next_per_commitment_point(LDKRevokeAndACK *this_ptr, LDKPublicKey val);
	public static native void RevokeAndACK_set_next_per_commitment_point(long this_ptr, byte[] val);
	// MUST_USE_RES LDKRevokeAndACK RevokeAndACK_new(LDKThirtyTwoBytes channel_id_arg, LDKThirtyTwoBytes per_commitment_secret_arg, LDKPublicKey next_per_commitment_point_arg);
	public static native long RevokeAndACK_new(byte[] channel_id_arg, byte[] per_commitment_secret_arg, byte[] next_per_commitment_point_arg);
	// void UpdateFee_free(LDKUpdateFee this_ptr);
	public static native void UpdateFee_free(long this_ptr);
	// LDKUpdateFee UpdateFee_clone(const LDKUpdateFee *orig);
	public static native long UpdateFee_clone(long orig);
	// const uint8_t (*UpdateFee_get_channel_id(const LDKUpdateFee *this_ptr))[32];
	public static native byte[] UpdateFee_get_channel_id(long this_ptr);
	// void UpdateFee_set_channel_id(LDKUpdateFee *this_ptr, LDKThirtyTwoBytes val);
	public static native void UpdateFee_set_channel_id(long this_ptr, byte[] val);
	// uint32_t UpdateFee_get_feerate_per_kw(const LDKUpdateFee *this_ptr);
	public static native int UpdateFee_get_feerate_per_kw(long this_ptr);
	// void UpdateFee_set_feerate_per_kw(LDKUpdateFee *this_ptr, uint32_t val);
	public static native void UpdateFee_set_feerate_per_kw(long this_ptr, int val);
	// MUST_USE_RES LDKUpdateFee UpdateFee_new(LDKThirtyTwoBytes channel_id_arg, uint32_t feerate_per_kw_arg);
	public static native long UpdateFee_new(byte[] channel_id_arg, int feerate_per_kw_arg);
	// void DataLossProtect_free(LDKDataLossProtect this_ptr);
	public static native void DataLossProtect_free(long this_ptr);
	// LDKDataLossProtect DataLossProtect_clone(const LDKDataLossProtect *orig);
	public static native long DataLossProtect_clone(long orig);
	// const uint8_t (*DataLossProtect_get_your_last_per_commitment_secret(const LDKDataLossProtect *this_ptr))[32];
	public static native byte[] DataLossProtect_get_your_last_per_commitment_secret(long this_ptr);
	// void DataLossProtect_set_your_last_per_commitment_secret(LDKDataLossProtect *this_ptr, LDKThirtyTwoBytes val);
	public static native void DataLossProtect_set_your_last_per_commitment_secret(long this_ptr, byte[] val);
	// LDKPublicKey DataLossProtect_get_my_current_per_commitment_point(const LDKDataLossProtect *this_ptr);
	public static native byte[] DataLossProtect_get_my_current_per_commitment_point(long this_ptr);
	// void DataLossProtect_set_my_current_per_commitment_point(LDKDataLossProtect *this_ptr, LDKPublicKey val);
	public static native void DataLossProtect_set_my_current_per_commitment_point(long this_ptr, byte[] val);
	// MUST_USE_RES LDKDataLossProtect DataLossProtect_new(LDKThirtyTwoBytes your_last_per_commitment_secret_arg, LDKPublicKey my_current_per_commitment_point_arg);
	public static native long DataLossProtect_new(byte[] your_last_per_commitment_secret_arg, byte[] my_current_per_commitment_point_arg);
	// void ChannelReestablish_free(LDKChannelReestablish this_ptr);
	public static native void ChannelReestablish_free(long this_ptr);
	// LDKChannelReestablish ChannelReestablish_clone(const LDKChannelReestablish *orig);
	public static native long ChannelReestablish_clone(long orig);
	// const uint8_t (*ChannelReestablish_get_channel_id(const LDKChannelReestablish *this_ptr))[32];
	public static native byte[] ChannelReestablish_get_channel_id(long this_ptr);
	// void ChannelReestablish_set_channel_id(LDKChannelReestablish *this_ptr, LDKThirtyTwoBytes val);
	public static native void ChannelReestablish_set_channel_id(long this_ptr, byte[] val);
	// uint64_t ChannelReestablish_get_next_local_commitment_number(const LDKChannelReestablish *this_ptr);
	public static native long ChannelReestablish_get_next_local_commitment_number(long this_ptr);
	// void ChannelReestablish_set_next_local_commitment_number(LDKChannelReestablish *this_ptr, uint64_t val);
	public static native void ChannelReestablish_set_next_local_commitment_number(long this_ptr, long val);
	// uint64_t ChannelReestablish_get_next_remote_commitment_number(const LDKChannelReestablish *this_ptr);
	public static native long ChannelReestablish_get_next_remote_commitment_number(long this_ptr);
	// void ChannelReestablish_set_next_remote_commitment_number(LDKChannelReestablish *this_ptr, uint64_t val);
	public static native void ChannelReestablish_set_next_remote_commitment_number(long this_ptr, long val);
	// void AnnouncementSignatures_free(LDKAnnouncementSignatures this_ptr);
	public static native void AnnouncementSignatures_free(long this_ptr);
	// LDKAnnouncementSignatures AnnouncementSignatures_clone(const LDKAnnouncementSignatures *orig);
	public static native long AnnouncementSignatures_clone(long orig);
	// const uint8_t (*AnnouncementSignatures_get_channel_id(const LDKAnnouncementSignatures *this_ptr))[32];
	public static native byte[] AnnouncementSignatures_get_channel_id(long this_ptr);
	// void AnnouncementSignatures_set_channel_id(LDKAnnouncementSignatures *this_ptr, LDKThirtyTwoBytes val);
	public static native void AnnouncementSignatures_set_channel_id(long this_ptr, byte[] val);
	// uint64_t AnnouncementSignatures_get_short_channel_id(const LDKAnnouncementSignatures *this_ptr);
	public static native long AnnouncementSignatures_get_short_channel_id(long this_ptr);
	// void AnnouncementSignatures_set_short_channel_id(LDKAnnouncementSignatures *this_ptr, uint64_t val);
	public static native void AnnouncementSignatures_set_short_channel_id(long this_ptr, long val);
	// LDKSignature AnnouncementSignatures_get_node_signature(const LDKAnnouncementSignatures *this_ptr);
	public static native byte[] AnnouncementSignatures_get_node_signature(long this_ptr);
	// void AnnouncementSignatures_set_node_signature(LDKAnnouncementSignatures *this_ptr, LDKSignature val);
	public static native void AnnouncementSignatures_set_node_signature(long this_ptr, byte[] val);
	// LDKSignature AnnouncementSignatures_get_bitcoin_signature(const LDKAnnouncementSignatures *this_ptr);
	public static native byte[] AnnouncementSignatures_get_bitcoin_signature(long this_ptr);
	// void AnnouncementSignatures_set_bitcoin_signature(LDKAnnouncementSignatures *this_ptr, LDKSignature val);
	public static native void AnnouncementSignatures_set_bitcoin_signature(long this_ptr, byte[] val);
	// MUST_USE_RES LDKAnnouncementSignatures AnnouncementSignatures_new(LDKThirtyTwoBytes channel_id_arg, uint64_t short_channel_id_arg, LDKSignature node_signature_arg, LDKSignature bitcoin_signature_arg);
	public static native long AnnouncementSignatures_new(byte[] channel_id_arg, long short_channel_id_arg, byte[] node_signature_arg, byte[] bitcoin_signature_arg);
	// void NetAddress_free(LDKNetAddress this_ptr);
	public static native void NetAddress_free(long this_ptr);
	// LDKNetAddress NetAddress_clone(const LDKNetAddress *orig);
	public static native long NetAddress_clone(long orig);
	// void UnsignedNodeAnnouncement_free(LDKUnsignedNodeAnnouncement this_ptr);
	public static native void UnsignedNodeAnnouncement_free(long this_ptr);
	// LDKUnsignedNodeAnnouncement UnsignedNodeAnnouncement_clone(const LDKUnsignedNodeAnnouncement *orig);
	public static native long UnsignedNodeAnnouncement_clone(long orig);
	// LDKNodeFeatures UnsignedNodeAnnouncement_get_features(const LDKUnsignedNodeAnnouncement *this_ptr);
	public static native long UnsignedNodeAnnouncement_get_features(long this_ptr);
	// void UnsignedNodeAnnouncement_set_features(LDKUnsignedNodeAnnouncement *this_ptr, LDKNodeFeatures val);
	public static native void UnsignedNodeAnnouncement_set_features(long this_ptr, long val);
	// uint32_t UnsignedNodeAnnouncement_get_timestamp(const LDKUnsignedNodeAnnouncement *this_ptr);
	public static native int UnsignedNodeAnnouncement_get_timestamp(long this_ptr);
	// void UnsignedNodeAnnouncement_set_timestamp(LDKUnsignedNodeAnnouncement *this_ptr, uint32_t val);
	public static native void UnsignedNodeAnnouncement_set_timestamp(long this_ptr, int val);
	// LDKPublicKey UnsignedNodeAnnouncement_get_node_id(const LDKUnsignedNodeAnnouncement *this_ptr);
	public static native byte[] UnsignedNodeAnnouncement_get_node_id(long this_ptr);
	// void UnsignedNodeAnnouncement_set_node_id(LDKUnsignedNodeAnnouncement *this_ptr, LDKPublicKey val);
	public static native void UnsignedNodeAnnouncement_set_node_id(long this_ptr, byte[] val);
	// const uint8_t (*UnsignedNodeAnnouncement_get_rgb(const LDKUnsignedNodeAnnouncement *this_ptr))[3];
	public static native byte[] UnsignedNodeAnnouncement_get_rgb(long this_ptr);
	// void UnsignedNodeAnnouncement_set_rgb(LDKUnsignedNodeAnnouncement *this_ptr, LDKThreeBytes val);
	public static native void UnsignedNodeAnnouncement_set_rgb(long this_ptr, byte[] val);
	// const uint8_t (*UnsignedNodeAnnouncement_get_alias(const LDKUnsignedNodeAnnouncement *this_ptr))[32];
	public static native byte[] UnsignedNodeAnnouncement_get_alias(long this_ptr);
	// void UnsignedNodeAnnouncement_set_alias(LDKUnsignedNodeAnnouncement *this_ptr, LDKThirtyTwoBytes val);
	public static native void UnsignedNodeAnnouncement_set_alias(long this_ptr, byte[] val);
	// void UnsignedNodeAnnouncement_set_addresses(LDKUnsignedNodeAnnouncement *this_ptr, LDKCVec_NetAddressZ val);
	public static native void UnsignedNodeAnnouncement_set_addresses(long this_ptr, long[] val);
	// void NodeAnnouncement_free(LDKNodeAnnouncement this_ptr);
	public static native void NodeAnnouncement_free(long this_ptr);
	// LDKNodeAnnouncement NodeAnnouncement_clone(const LDKNodeAnnouncement *orig);
	public static native long NodeAnnouncement_clone(long orig);
	// LDKSignature NodeAnnouncement_get_signature(const LDKNodeAnnouncement *this_ptr);
	public static native byte[] NodeAnnouncement_get_signature(long this_ptr);
	// void NodeAnnouncement_set_signature(LDKNodeAnnouncement *this_ptr, LDKSignature val);
	public static native void NodeAnnouncement_set_signature(long this_ptr, byte[] val);
	// LDKUnsignedNodeAnnouncement NodeAnnouncement_get_contents(const LDKNodeAnnouncement *this_ptr);
	public static native long NodeAnnouncement_get_contents(long this_ptr);
	// void NodeAnnouncement_set_contents(LDKNodeAnnouncement *this_ptr, LDKUnsignedNodeAnnouncement val);
	public static native void NodeAnnouncement_set_contents(long this_ptr, long val);
	// MUST_USE_RES LDKNodeAnnouncement NodeAnnouncement_new(LDKSignature signature_arg, LDKUnsignedNodeAnnouncement contents_arg);
	public static native long NodeAnnouncement_new(byte[] signature_arg, long contents_arg);
	// void UnsignedChannelAnnouncement_free(LDKUnsignedChannelAnnouncement this_ptr);
	public static native void UnsignedChannelAnnouncement_free(long this_ptr);
	// LDKUnsignedChannelAnnouncement UnsignedChannelAnnouncement_clone(const LDKUnsignedChannelAnnouncement *orig);
	public static native long UnsignedChannelAnnouncement_clone(long orig);
	// LDKChannelFeatures UnsignedChannelAnnouncement_get_features(const LDKUnsignedChannelAnnouncement *this_ptr);
	public static native long UnsignedChannelAnnouncement_get_features(long this_ptr);
	// void UnsignedChannelAnnouncement_set_features(LDKUnsignedChannelAnnouncement *this_ptr, LDKChannelFeatures val);
	public static native void UnsignedChannelAnnouncement_set_features(long this_ptr, long val);
	// const uint8_t (*UnsignedChannelAnnouncement_get_chain_hash(const LDKUnsignedChannelAnnouncement *this_ptr))[32];
	public static native byte[] UnsignedChannelAnnouncement_get_chain_hash(long this_ptr);
	// void UnsignedChannelAnnouncement_set_chain_hash(LDKUnsignedChannelAnnouncement *this_ptr, LDKThirtyTwoBytes val);
	public static native void UnsignedChannelAnnouncement_set_chain_hash(long this_ptr, byte[] val);
	// uint64_t UnsignedChannelAnnouncement_get_short_channel_id(const LDKUnsignedChannelAnnouncement *this_ptr);
	public static native long UnsignedChannelAnnouncement_get_short_channel_id(long this_ptr);
	// void UnsignedChannelAnnouncement_set_short_channel_id(LDKUnsignedChannelAnnouncement *this_ptr, uint64_t val);
	public static native void UnsignedChannelAnnouncement_set_short_channel_id(long this_ptr, long val);
	// LDKPublicKey UnsignedChannelAnnouncement_get_node_id_1(const LDKUnsignedChannelAnnouncement *this_ptr);
	public static native byte[] UnsignedChannelAnnouncement_get_node_id_1(long this_ptr);
	// void UnsignedChannelAnnouncement_set_node_id_1(LDKUnsignedChannelAnnouncement *this_ptr, LDKPublicKey val);
	public static native void UnsignedChannelAnnouncement_set_node_id_1(long this_ptr, byte[] val);
	// LDKPublicKey UnsignedChannelAnnouncement_get_node_id_2(const LDKUnsignedChannelAnnouncement *this_ptr);
	public static native byte[] UnsignedChannelAnnouncement_get_node_id_2(long this_ptr);
	// void UnsignedChannelAnnouncement_set_node_id_2(LDKUnsignedChannelAnnouncement *this_ptr, LDKPublicKey val);
	public static native void UnsignedChannelAnnouncement_set_node_id_2(long this_ptr, byte[] val);
	// LDKPublicKey UnsignedChannelAnnouncement_get_bitcoin_key_1(const LDKUnsignedChannelAnnouncement *this_ptr);
	public static native byte[] UnsignedChannelAnnouncement_get_bitcoin_key_1(long this_ptr);
	// void UnsignedChannelAnnouncement_set_bitcoin_key_1(LDKUnsignedChannelAnnouncement *this_ptr, LDKPublicKey val);
	public static native void UnsignedChannelAnnouncement_set_bitcoin_key_1(long this_ptr, byte[] val);
	// LDKPublicKey UnsignedChannelAnnouncement_get_bitcoin_key_2(const LDKUnsignedChannelAnnouncement *this_ptr);
	public static native byte[] UnsignedChannelAnnouncement_get_bitcoin_key_2(long this_ptr);
	// void UnsignedChannelAnnouncement_set_bitcoin_key_2(LDKUnsignedChannelAnnouncement *this_ptr, LDKPublicKey val);
	public static native void UnsignedChannelAnnouncement_set_bitcoin_key_2(long this_ptr, byte[] val);
	// void ChannelAnnouncement_free(LDKChannelAnnouncement this_ptr);
	public static native void ChannelAnnouncement_free(long this_ptr);
	// LDKChannelAnnouncement ChannelAnnouncement_clone(const LDKChannelAnnouncement *orig);
	public static native long ChannelAnnouncement_clone(long orig);
	// LDKSignature ChannelAnnouncement_get_node_signature_1(const LDKChannelAnnouncement *this_ptr);
	public static native byte[] ChannelAnnouncement_get_node_signature_1(long this_ptr);
	// void ChannelAnnouncement_set_node_signature_1(LDKChannelAnnouncement *this_ptr, LDKSignature val);
	public static native void ChannelAnnouncement_set_node_signature_1(long this_ptr, byte[] val);
	// LDKSignature ChannelAnnouncement_get_node_signature_2(const LDKChannelAnnouncement *this_ptr);
	public static native byte[] ChannelAnnouncement_get_node_signature_2(long this_ptr);
	// void ChannelAnnouncement_set_node_signature_2(LDKChannelAnnouncement *this_ptr, LDKSignature val);
	public static native void ChannelAnnouncement_set_node_signature_2(long this_ptr, byte[] val);
	// LDKSignature ChannelAnnouncement_get_bitcoin_signature_1(const LDKChannelAnnouncement *this_ptr);
	public static native byte[] ChannelAnnouncement_get_bitcoin_signature_1(long this_ptr);
	// void ChannelAnnouncement_set_bitcoin_signature_1(LDKChannelAnnouncement *this_ptr, LDKSignature val);
	public static native void ChannelAnnouncement_set_bitcoin_signature_1(long this_ptr, byte[] val);
	// LDKSignature ChannelAnnouncement_get_bitcoin_signature_2(const LDKChannelAnnouncement *this_ptr);
	public static native byte[] ChannelAnnouncement_get_bitcoin_signature_2(long this_ptr);
	// void ChannelAnnouncement_set_bitcoin_signature_2(LDKChannelAnnouncement *this_ptr, LDKSignature val);
	public static native void ChannelAnnouncement_set_bitcoin_signature_2(long this_ptr, byte[] val);
	// LDKUnsignedChannelAnnouncement ChannelAnnouncement_get_contents(const LDKChannelAnnouncement *this_ptr);
	public static native long ChannelAnnouncement_get_contents(long this_ptr);
	// void ChannelAnnouncement_set_contents(LDKChannelAnnouncement *this_ptr, LDKUnsignedChannelAnnouncement val);
	public static native void ChannelAnnouncement_set_contents(long this_ptr, long val);
	// MUST_USE_RES LDKChannelAnnouncement ChannelAnnouncement_new(LDKSignature node_signature_1_arg, LDKSignature node_signature_2_arg, LDKSignature bitcoin_signature_1_arg, LDKSignature bitcoin_signature_2_arg, LDKUnsignedChannelAnnouncement contents_arg);
	public static native long ChannelAnnouncement_new(byte[] node_signature_1_arg, byte[] node_signature_2_arg, byte[] bitcoin_signature_1_arg, byte[] bitcoin_signature_2_arg, long contents_arg);
	// void UnsignedChannelUpdate_free(LDKUnsignedChannelUpdate this_ptr);
	public static native void UnsignedChannelUpdate_free(long this_ptr);
	// LDKUnsignedChannelUpdate UnsignedChannelUpdate_clone(const LDKUnsignedChannelUpdate *orig);
	public static native long UnsignedChannelUpdate_clone(long orig);
	// const uint8_t (*UnsignedChannelUpdate_get_chain_hash(const LDKUnsignedChannelUpdate *this_ptr))[32];
	public static native byte[] UnsignedChannelUpdate_get_chain_hash(long this_ptr);
	// void UnsignedChannelUpdate_set_chain_hash(LDKUnsignedChannelUpdate *this_ptr, LDKThirtyTwoBytes val);
	public static native void UnsignedChannelUpdate_set_chain_hash(long this_ptr, byte[] val);
	// uint64_t UnsignedChannelUpdate_get_short_channel_id(const LDKUnsignedChannelUpdate *this_ptr);
	public static native long UnsignedChannelUpdate_get_short_channel_id(long this_ptr);
	// void UnsignedChannelUpdate_set_short_channel_id(LDKUnsignedChannelUpdate *this_ptr, uint64_t val);
	public static native void UnsignedChannelUpdate_set_short_channel_id(long this_ptr, long val);
	// uint32_t UnsignedChannelUpdate_get_timestamp(const LDKUnsignedChannelUpdate *this_ptr);
	public static native int UnsignedChannelUpdate_get_timestamp(long this_ptr);
	// void UnsignedChannelUpdate_set_timestamp(LDKUnsignedChannelUpdate *this_ptr, uint32_t val);
	public static native void UnsignedChannelUpdate_set_timestamp(long this_ptr, int val);
	// uint8_t UnsignedChannelUpdate_get_flags(const LDKUnsignedChannelUpdate *this_ptr);
	public static native byte UnsignedChannelUpdate_get_flags(long this_ptr);
	// void UnsignedChannelUpdate_set_flags(LDKUnsignedChannelUpdate *this_ptr, uint8_t val);
	public static native void UnsignedChannelUpdate_set_flags(long this_ptr, byte val);
	// uint16_t UnsignedChannelUpdate_get_cltv_expiry_delta(const LDKUnsignedChannelUpdate *this_ptr);
	public static native short UnsignedChannelUpdate_get_cltv_expiry_delta(long this_ptr);
	// void UnsignedChannelUpdate_set_cltv_expiry_delta(LDKUnsignedChannelUpdate *this_ptr, uint16_t val);
	public static native void UnsignedChannelUpdate_set_cltv_expiry_delta(long this_ptr, short val);
	// uint64_t UnsignedChannelUpdate_get_htlc_minimum_msat(const LDKUnsignedChannelUpdate *this_ptr);
	public static native long UnsignedChannelUpdate_get_htlc_minimum_msat(long this_ptr);
	// void UnsignedChannelUpdate_set_htlc_minimum_msat(LDKUnsignedChannelUpdate *this_ptr, uint64_t val);
	public static native void UnsignedChannelUpdate_set_htlc_minimum_msat(long this_ptr, long val);
	// uint32_t UnsignedChannelUpdate_get_fee_base_msat(const LDKUnsignedChannelUpdate *this_ptr);
	public static native int UnsignedChannelUpdate_get_fee_base_msat(long this_ptr);
	// void UnsignedChannelUpdate_set_fee_base_msat(LDKUnsignedChannelUpdate *this_ptr, uint32_t val);
	public static native void UnsignedChannelUpdate_set_fee_base_msat(long this_ptr, int val);
	// uint32_t UnsignedChannelUpdate_get_fee_proportional_millionths(const LDKUnsignedChannelUpdate *this_ptr);
	public static native int UnsignedChannelUpdate_get_fee_proportional_millionths(long this_ptr);
	// void UnsignedChannelUpdate_set_fee_proportional_millionths(LDKUnsignedChannelUpdate *this_ptr, uint32_t val);
	public static native void UnsignedChannelUpdate_set_fee_proportional_millionths(long this_ptr, int val);
	// void ChannelUpdate_free(LDKChannelUpdate this_ptr);
	public static native void ChannelUpdate_free(long this_ptr);
	// LDKChannelUpdate ChannelUpdate_clone(const LDKChannelUpdate *orig);
	public static native long ChannelUpdate_clone(long orig);
	// LDKSignature ChannelUpdate_get_signature(const LDKChannelUpdate *this_ptr);
	public static native byte[] ChannelUpdate_get_signature(long this_ptr);
	// void ChannelUpdate_set_signature(LDKChannelUpdate *this_ptr, LDKSignature val);
	public static native void ChannelUpdate_set_signature(long this_ptr, byte[] val);
	// LDKUnsignedChannelUpdate ChannelUpdate_get_contents(const LDKChannelUpdate *this_ptr);
	public static native long ChannelUpdate_get_contents(long this_ptr);
	// void ChannelUpdate_set_contents(LDKChannelUpdate *this_ptr, LDKUnsignedChannelUpdate val);
	public static native void ChannelUpdate_set_contents(long this_ptr, long val);
	// MUST_USE_RES LDKChannelUpdate ChannelUpdate_new(LDKSignature signature_arg, LDKUnsignedChannelUpdate contents_arg);
	public static native long ChannelUpdate_new(byte[] signature_arg, long contents_arg);
	// void QueryChannelRange_free(LDKQueryChannelRange this_ptr);
	public static native void QueryChannelRange_free(long this_ptr);
	// LDKQueryChannelRange QueryChannelRange_clone(const LDKQueryChannelRange *orig);
	public static native long QueryChannelRange_clone(long orig);
	// const uint8_t (*QueryChannelRange_get_chain_hash(const LDKQueryChannelRange *this_ptr))[32];
	public static native byte[] QueryChannelRange_get_chain_hash(long this_ptr);
	// void QueryChannelRange_set_chain_hash(LDKQueryChannelRange *this_ptr, LDKThirtyTwoBytes val);
	public static native void QueryChannelRange_set_chain_hash(long this_ptr, byte[] val);
	// uint32_t QueryChannelRange_get_first_blocknum(const LDKQueryChannelRange *this_ptr);
	public static native int QueryChannelRange_get_first_blocknum(long this_ptr);
	// void QueryChannelRange_set_first_blocknum(LDKQueryChannelRange *this_ptr, uint32_t val);
	public static native void QueryChannelRange_set_first_blocknum(long this_ptr, int val);
	// uint32_t QueryChannelRange_get_number_of_blocks(const LDKQueryChannelRange *this_ptr);
	public static native int QueryChannelRange_get_number_of_blocks(long this_ptr);
	// void QueryChannelRange_set_number_of_blocks(LDKQueryChannelRange *this_ptr, uint32_t val);
	public static native void QueryChannelRange_set_number_of_blocks(long this_ptr, int val);
	// MUST_USE_RES LDKQueryChannelRange QueryChannelRange_new(LDKThirtyTwoBytes chain_hash_arg, uint32_t first_blocknum_arg, uint32_t number_of_blocks_arg);
	public static native long QueryChannelRange_new(byte[] chain_hash_arg, int first_blocknum_arg, int number_of_blocks_arg);
	// void ReplyChannelRange_free(LDKReplyChannelRange this_ptr);
	public static native void ReplyChannelRange_free(long this_ptr);
	// LDKReplyChannelRange ReplyChannelRange_clone(const LDKReplyChannelRange *orig);
	public static native long ReplyChannelRange_clone(long orig);
	// const uint8_t (*ReplyChannelRange_get_chain_hash(const LDKReplyChannelRange *this_ptr))[32];
	public static native byte[] ReplyChannelRange_get_chain_hash(long this_ptr);
	// void ReplyChannelRange_set_chain_hash(LDKReplyChannelRange *this_ptr, LDKThirtyTwoBytes val);
	public static native void ReplyChannelRange_set_chain_hash(long this_ptr, byte[] val);
	// uint32_t ReplyChannelRange_get_first_blocknum(const LDKReplyChannelRange *this_ptr);
	public static native int ReplyChannelRange_get_first_blocknum(long this_ptr);
	// void ReplyChannelRange_set_first_blocknum(LDKReplyChannelRange *this_ptr, uint32_t val);
	public static native void ReplyChannelRange_set_first_blocknum(long this_ptr, int val);
	// uint32_t ReplyChannelRange_get_number_of_blocks(const LDKReplyChannelRange *this_ptr);
	public static native int ReplyChannelRange_get_number_of_blocks(long this_ptr);
	// void ReplyChannelRange_set_number_of_blocks(LDKReplyChannelRange *this_ptr, uint32_t val);
	public static native void ReplyChannelRange_set_number_of_blocks(long this_ptr, int val);
	// bool ReplyChannelRange_get_full_information(const LDKReplyChannelRange *this_ptr);
	public static native boolean ReplyChannelRange_get_full_information(long this_ptr);
	// void ReplyChannelRange_set_full_information(LDKReplyChannelRange *this_ptr, bool val);
	public static native void ReplyChannelRange_set_full_information(long this_ptr, boolean val);
	// void ReplyChannelRange_set_short_channel_ids(LDKReplyChannelRange *this_ptr, LDKCVec_u64Z val);
	public static native void ReplyChannelRange_set_short_channel_ids(long this_ptr, long[] val);
	// MUST_USE_RES LDKReplyChannelRange ReplyChannelRange_new(LDKThirtyTwoBytes chain_hash_arg, uint32_t first_blocknum_arg, uint32_t number_of_blocks_arg, bool full_information_arg, LDKCVec_u64Z short_channel_ids_arg);
	public static native long ReplyChannelRange_new(byte[] chain_hash_arg, int first_blocknum_arg, int number_of_blocks_arg, boolean full_information_arg, long[] short_channel_ids_arg);
	// void QueryShortChannelIds_free(LDKQueryShortChannelIds this_ptr);
	public static native void QueryShortChannelIds_free(long this_ptr);
	// LDKQueryShortChannelIds QueryShortChannelIds_clone(const LDKQueryShortChannelIds *orig);
	public static native long QueryShortChannelIds_clone(long orig);
	// const uint8_t (*QueryShortChannelIds_get_chain_hash(const LDKQueryShortChannelIds *this_ptr))[32];
	public static native byte[] QueryShortChannelIds_get_chain_hash(long this_ptr);
	// void QueryShortChannelIds_set_chain_hash(LDKQueryShortChannelIds *this_ptr, LDKThirtyTwoBytes val);
	public static native void QueryShortChannelIds_set_chain_hash(long this_ptr, byte[] val);
	// void QueryShortChannelIds_set_short_channel_ids(LDKQueryShortChannelIds *this_ptr, LDKCVec_u64Z val);
	public static native void QueryShortChannelIds_set_short_channel_ids(long this_ptr, long[] val);
	// MUST_USE_RES LDKQueryShortChannelIds QueryShortChannelIds_new(LDKThirtyTwoBytes chain_hash_arg, LDKCVec_u64Z short_channel_ids_arg);
	public static native long QueryShortChannelIds_new(byte[] chain_hash_arg, long[] short_channel_ids_arg);
	// void ReplyShortChannelIdsEnd_free(LDKReplyShortChannelIdsEnd this_ptr);
	public static native void ReplyShortChannelIdsEnd_free(long this_ptr);
	// LDKReplyShortChannelIdsEnd ReplyShortChannelIdsEnd_clone(const LDKReplyShortChannelIdsEnd *orig);
	public static native long ReplyShortChannelIdsEnd_clone(long orig);
	// const uint8_t (*ReplyShortChannelIdsEnd_get_chain_hash(const LDKReplyShortChannelIdsEnd *this_ptr))[32];
	public static native byte[] ReplyShortChannelIdsEnd_get_chain_hash(long this_ptr);
	// void ReplyShortChannelIdsEnd_set_chain_hash(LDKReplyShortChannelIdsEnd *this_ptr, LDKThirtyTwoBytes val);
	public static native void ReplyShortChannelIdsEnd_set_chain_hash(long this_ptr, byte[] val);
	// bool ReplyShortChannelIdsEnd_get_full_information(const LDKReplyShortChannelIdsEnd *this_ptr);
	public static native boolean ReplyShortChannelIdsEnd_get_full_information(long this_ptr);
	// void ReplyShortChannelIdsEnd_set_full_information(LDKReplyShortChannelIdsEnd *this_ptr, bool val);
	public static native void ReplyShortChannelIdsEnd_set_full_information(long this_ptr, boolean val);
	// MUST_USE_RES LDKReplyShortChannelIdsEnd ReplyShortChannelIdsEnd_new(LDKThirtyTwoBytes chain_hash_arg, bool full_information_arg);
	public static native long ReplyShortChannelIdsEnd_new(byte[] chain_hash_arg, boolean full_information_arg);
	// void GossipTimestampFilter_free(LDKGossipTimestampFilter this_ptr);
	public static native void GossipTimestampFilter_free(long this_ptr);
	// LDKGossipTimestampFilter GossipTimestampFilter_clone(const LDKGossipTimestampFilter *orig);
	public static native long GossipTimestampFilter_clone(long orig);
	// const uint8_t (*GossipTimestampFilter_get_chain_hash(const LDKGossipTimestampFilter *this_ptr))[32];
	public static native byte[] GossipTimestampFilter_get_chain_hash(long this_ptr);
	// void GossipTimestampFilter_set_chain_hash(LDKGossipTimestampFilter *this_ptr, LDKThirtyTwoBytes val);
	public static native void GossipTimestampFilter_set_chain_hash(long this_ptr, byte[] val);
	// uint32_t GossipTimestampFilter_get_first_timestamp(const LDKGossipTimestampFilter *this_ptr);
	public static native int GossipTimestampFilter_get_first_timestamp(long this_ptr);
	// void GossipTimestampFilter_set_first_timestamp(LDKGossipTimestampFilter *this_ptr, uint32_t val);
	public static native void GossipTimestampFilter_set_first_timestamp(long this_ptr, int val);
	// uint32_t GossipTimestampFilter_get_timestamp_range(const LDKGossipTimestampFilter *this_ptr);
	public static native int GossipTimestampFilter_get_timestamp_range(long this_ptr);
	// void GossipTimestampFilter_set_timestamp_range(LDKGossipTimestampFilter *this_ptr, uint32_t val);
	public static native void GossipTimestampFilter_set_timestamp_range(long this_ptr, int val);
	// MUST_USE_RES LDKGossipTimestampFilter GossipTimestampFilter_new(LDKThirtyTwoBytes chain_hash_arg, uint32_t first_timestamp_arg, uint32_t timestamp_range_arg);
	public static native long GossipTimestampFilter_new(byte[] chain_hash_arg, int first_timestamp_arg, int timestamp_range_arg);
	// void ErrorAction_free(LDKErrorAction this_ptr);
	public static native void ErrorAction_free(long this_ptr);
	// LDKErrorAction ErrorAction_clone(const LDKErrorAction *orig);
	public static native long ErrorAction_clone(long orig);
	// void LightningError_free(LDKLightningError this_ptr);
	public static native void LightningError_free(long this_ptr);
	// LDKStr LightningError_get_err(const LDKLightningError *this_ptr);
	public static native String LightningError_get_err(long this_ptr);
	// void LightningError_set_err(LDKLightningError *this_ptr, LDKCVec_u8Z val);
	public static native void LightningError_set_err(long this_ptr, byte[] val);
	// LDKErrorAction LightningError_get_action(const LDKLightningError *this_ptr);
	public static native long LightningError_get_action(long this_ptr);
	// void LightningError_set_action(LDKLightningError *this_ptr, LDKErrorAction val);
	public static native void LightningError_set_action(long this_ptr, long val);
	// MUST_USE_RES LDKLightningError LightningError_new(LDKCVec_u8Z err_arg, LDKErrorAction action_arg);
	public static native long LightningError_new(byte[] err_arg, long action_arg);
	// void CommitmentUpdate_free(LDKCommitmentUpdate this_ptr);
	public static native void CommitmentUpdate_free(long this_ptr);
	// LDKCommitmentUpdate CommitmentUpdate_clone(const LDKCommitmentUpdate *orig);
	public static native long CommitmentUpdate_clone(long orig);
	// void CommitmentUpdate_set_update_add_htlcs(LDKCommitmentUpdate *this_ptr, LDKCVec_UpdateAddHTLCZ val);
	public static native void CommitmentUpdate_set_update_add_htlcs(long this_ptr, long[] val);
	// void CommitmentUpdate_set_update_fulfill_htlcs(LDKCommitmentUpdate *this_ptr, LDKCVec_UpdateFulfillHTLCZ val);
	public static native void CommitmentUpdate_set_update_fulfill_htlcs(long this_ptr, long[] val);
	// void CommitmentUpdate_set_update_fail_htlcs(LDKCommitmentUpdate *this_ptr, LDKCVec_UpdateFailHTLCZ val);
	public static native void CommitmentUpdate_set_update_fail_htlcs(long this_ptr, long[] val);
	// void CommitmentUpdate_set_update_fail_malformed_htlcs(LDKCommitmentUpdate *this_ptr, LDKCVec_UpdateFailMalformedHTLCZ val);
	public static native void CommitmentUpdate_set_update_fail_malformed_htlcs(long this_ptr, long[] val);
	// LDKUpdateFee CommitmentUpdate_get_update_fee(const LDKCommitmentUpdate *this_ptr);
	public static native long CommitmentUpdate_get_update_fee(long this_ptr);
	// void CommitmentUpdate_set_update_fee(LDKCommitmentUpdate *this_ptr, LDKUpdateFee val);
	public static native void CommitmentUpdate_set_update_fee(long this_ptr, long val);
	// LDKCommitmentSigned CommitmentUpdate_get_commitment_signed(const LDKCommitmentUpdate *this_ptr);
	public static native long CommitmentUpdate_get_commitment_signed(long this_ptr);
	// void CommitmentUpdate_set_commitment_signed(LDKCommitmentUpdate *this_ptr, LDKCommitmentSigned val);
	public static native void CommitmentUpdate_set_commitment_signed(long this_ptr, long val);
	// MUST_USE_RES LDKCommitmentUpdate CommitmentUpdate_new(LDKCVec_UpdateAddHTLCZ update_add_htlcs_arg, LDKCVec_UpdateFulfillHTLCZ update_fulfill_htlcs_arg, LDKCVec_UpdateFailHTLCZ update_fail_htlcs_arg, LDKCVec_UpdateFailMalformedHTLCZ update_fail_malformed_htlcs_arg, LDKUpdateFee update_fee_arg, LDKCommitmentSigned commitment_signed_arg);
	public static native long CommitmentUpdate_new(long[] update_add_htlcs_arg, long[] update_fulfill_htlcs_arg, long[] update_fail_htlcs_arg, long[] update_fail_malformed_htlcs_arg, long update_fee_arg, long commitment_signed_arg);
	// void HTLCFailChannelUpdate_free(LDKHTLCFailChannelUpdate this_ptr);
	public static native void HTLCFailChannelUpdate_free(long this_ptr);
	// LDKHTLCFailChannelUpdate HTLCFailChannelUpdate_clone(const LDKHTLCFailChannelUpdate *orig);
	public static native long HTLCFailChannelUpdate_clone(long orig);
	// void ChannelMessageHandler_free(LDKChannelMessageHandler this_ptr);
	public static native void ChannelMessageHandler_free(long this_ptr);
	// void RoutingMessageHandler_free(LDKRoutingMessageHandler this_ptr);
	public static native void RoutingMessageHandler_free(long this_ptr);
	// LDKCVec_u8Z AcceptChannel_write(const LDKAcceptChannel *obj);
	public static native byte[] AcceptChannel_write(long obj);
	// LDKAcceptChannel AcceptChannel_read(LDKu8slice ser);
	public static native long AcceptChannel_read(byte[] ser);
	// LDKCVec_u8Z AnnouncementSignatures_write(const LDKAnnouncementSignatures *obj);
	public static native byte[] AnnouncementSignatures_write(long obj);
	// LDKAnnouncementSignatures AnnouncementSignatures_read(LDKu8slice ser);
	public static native long AnnouncementSignatures_read(byte[] ser);
	// LDKCVec_u8Z ChannelReestablish_write(const LDKChannelReestablish *obj);
	public static native byte[] ChannelReestablish_write(long obj);
	// LDKChannelReestablish ChannelReestablish_read(LDKu8slice ser);
	public static native long ChannelReestablish_read(byte[] ser);
	// LDKCVec_u8Z ClosingSigned_write(const LDKClosingSigned *obj);
	public static native byte[] ClosingSigned_write(long obj);
	// LDKClosingSigned ClosingSigned_read(LDKu8slice ser);
	public static native long ClosingSigned_read(byte[] ser);
	// LDKCVec_u8Z CommitmentSigned_write(const LDKCommitmentSigned *obj);
	public static native byte[] CommitmentSigned_write(long obj);
	// LDKCommitmentSigned CommitmentSigned_read(LDKu8slice ser);
	public static native long CommitmentSigned_read(byte[] ser);
	// LDKCVec_u8Z FundingCreated_write(const LDKFundingCreated *obj);
	public static native byte[] FundingCreated_write(long obj);
	// LDKFundingCreated FundingCreated_read(LDKu8slice ser);
	public static native long FundingCreated_read(byte[] ser);
	// LDKCVec_u8Z FundingSigned_write(const LDKFundingSigned *obj);
	public static native byte[] FundingSigned_write(long obj);
	// LDKFundingSigned FundingSigned_read(LDKu8slice ser);
	public static native long FundingSigned_read(byte[] ser);
	// LDKCVec_u8Z FundingLocked_write(const LDKFundingLocked *obj);
	public static native byte[] FundingLocked_write(long obj);
	// LDKFundingLocked FundingLocked_read(LDKu8slice ser);
	public static native long FundingLocked_read(byte[] ser);
	// LDKCVec_u8Z Init_write(const LDKInit *obj);
	public static native byte[] Init_write(long obj);
	// LDKInit Init_read(LDKu8slice ser);
	public static native long Init_read(byte[] ser);
	// LDKCVec_u8Z OpenChannel_write(const LDKOpenChannel *obj);
	public static native byte[] OpenChannel_write(long obj);
	// LDKOpenChannel OpenChannel_read(LDKu8slice ser);
	public static native long OpenChannel_read(byte[] ser);
	// LDKCVec_u8Z RevokeAndACK_write(const LDKRevokeAndACK *obj);
	public static native byte[] RevokeAndACK_write(long obj);
	// LDKRevokeAndACK RevokeAndACK_read(LDKu8slice ser);
	public static native long RevokeAndACK_read(byte[] ser);
	// LDKCVec_u8Z Shutdown_write(const LDKShutdown *obj);
	public static native byte[] Shutdown_write(long obj);
	// LDKShutdown Shutdown_read(LDKu8slice ser);
	public static native long Shutdown_read(byte[] ser);
	// LDKCVec_u8Z UpdateFailHTLC_write(const LDKUpdateFailHTLC *obj);
	public static native byte[] UpdateFailHTLC_write(long obj);
	// LDKUpdateFailHTLC UpdateFailHTLC_read(LDKu8slice ser);
	public static native long UpdateFailHTLC_read(byte[] ser);
	// LDKCVec_u8Z UpdateFailMalformedHTLC_write(const LDKUpdateFailMalformedHTLC *obj);
	public static native byte[] UpdateFailMalformedHTLC_write(long obj);
	// LDKUpdateFailMalformedHTLC UpdateFailMalformedHTLC_read(LDKu8slice ser);
	public static native long UpdateFailMalformedHTLC_read(byte[] ser);
	// LDKCVec_u8Z UpdateFee_write(const LDKUpdateFee *obj);
	public static native byte[] UpdateFee_write(long obj);
	// LDKUpdateFee UpdateFee_read(LDKu8slice ser);
	public static native long UpdateFee_read(byte[] ser);
	// LDKCVec_u8Z UpdateFulfillHTLC_write(const LDKUpdateFulfillHTLC *obj);
	public static native byte[] UpdateFulfillHTLC_write(long obj);
	// LDKUpdateFulfillHTLC UpdateFulfillHTLC_read(LDKu8slice ser);
	public static native long UpdateFulfillHTLC_read(byte[] ser);
	// LDKCVec_u8Z UpdateAddHTLC_write(const LDKUpdateAddHTLC *obj);
	public static native byte[] UpdateAddHTLC_write(long obj);
	// LDKUpdateAddHTLC UpdateAddHTLC_read(LDKu8slice ser);
	public static native long UpdateAddHTLC_read(byte[] ser);
	// LDKCVec_u8Z Ping_write(const LDKPing *obj);
	public static native byte[] Ping_write(long obj);
	// LDKPing Ping_read(LDKu8slice ser);
	public static native long Ping_read(byte[] ser);
	// LDKCVec_u8Z Pong_write(const LDKPong *obj);
	public static native byte[] Pong_write(long obj);
	// LDKPong Pong_read(LDKu8slice ser);
	public static native long Pong_read(byte[] ser);
	// LDKCVec_u8Z UnsignedChannelAnnouncement_write(const LDKUnsignedChannelAnnouncement *obj);
	public static native byte[] UnsignedChannelAnnouncement_write(long obj);
	// LDKUnsignedChannelAnnouncement UnsignedChannelAnnouncement_read(LDKu8slice ser);
	public static native long UnsignedChannelAnnouncement_read(byte[] ser);
	// LDKCVec_u8Z ChannelAnnouncement_write(const LDKChannelAnnouncement *obj);
	public static native byte[] ChannelAnnouncement_write(long obj);
	// LDKChannelAnnouncement ChannelAnnouncement_read(LDKu8slice ser);
	public static native long ChannelAnnouncement_read(byte[] ser);
	// LDKCVec_u8Z UnsignedChannelUpdate_write(const LDKUnsignedChannelUpdate *obj);
	public static native byte[] UnsignedChannelUpdate_write(long obj);
	// LDKUnsignedChannelUpdate UnsignedChannelUpdate_read(LDKu8slice ser);
	public static native long UnsignedChannelUpdate_read(byte[] ser);
	// LDKCVec_u8Z ChannelUpdate_write(const LDKChannelUpdate *obj);
	public static native byte[] ChannelUpdate_write(long obj);
	// LDKChannelUpdate ChannelUpdate_read(LDKu8slice ser);
	public static native long ChannelUpdate_read(byte[] ser);
	// LDKCVec_u8Z ErrorMessage_write(const LDKErrorMessage *obj);
	public static native byte[] ErrorMessage_write(long obj);
	// LDKErrorMessage ErrorMessage_read(LDKu8slice ser);
	public static native long ErrorMessage_read(byte[] ser);
	// LDKCVec_u8Z UnsignedNodeAnnouncement_write(const LDKUnsignedNodeAnnouncement *obj);
	public static native byte[] UnsignedNodeAnnouncement_write(long obj);
	// LDKUnsignedNodeAnnouncement UnsignedNodeAnnouncement_read(LDKu8slice ser);
	public static native long UnsignedNodeAnnouncement_read(byte[] ser);
	// LDKCVec_u8Z NodeAnnouncement_write(const LDKNodeAnnouncement *obj);
	public static native byte[] NodeAnnouncement_write(long obj);
	// LDKNodeAnnouncement NodeAnnouncement_read(LDKu8slice ser);
	public static native long NodeAnnouncement_read(byte[] ser);
	// LDKQueryShortChannelIds QueryShortChannelIds_read(LDKu8slice ser);
	public static native long QueryShortChannelIds_read(byte[] ser);
	// LDKCVec_u8Z QueryShortChannelIds_write(const LDKQueryShortChannelIds *obj);
	public static native byte[] QueryShortChannelIds_write(long obj);
	// LDKReplyShortChannelIdsEnd ReplyShortChannelIdsEnd_read(LDKu8slice ser);
	public static native long ReplyShortChannelIdsEnd_read(byte[] ser);
	// LDKCVec_u8Z ReplyShortChannelIdsEnd_write(const LDKReplyShortChannelIdsEnd *obj);
	public static native byte[] ReplyShortChannelIdsEnd_write(long obj);
	// LDKQueryChannelRange QueryChannelRange_read(LDKu8slice ser);
	public static native long QueryChannelRange_read(byte[] ser);
	// LDKCVec_u8Z QueryChannelRange_write(const LDKQueryChannelRange *obj);
	public static native byte[] QueryChannelRange_write(long obj);
	// LDKReplyChannelRange ReplyChannelRange_read(LDKu8slice ser);
	public static native long ReplyChannelRange_read(byte[] ser);
	// LDKCVec_u8Z ReplyChannelRange_write(const LDKReplyChannelRange *obj);
	public static native byte[] ReplyChannelRange_write(long obj);
	// LDKGossipTimestampFilter GossipTimestampFilter_read(LDKu8slice ser);
	public static native long GossipTimestampFilter_read(byte[] ser);
	// LDKCVec_u8Z GossipTimestampFilter_write(const LDKGossipTimestampFilter *obj);
	public static native byte[] GossipTimestampFilter_write(long obj);
	// void MessageHandler_free(LDKMessageHandler this_ptr);
	public static native void MessageHandler_free(long this_ptr);
	// const LDKChannelMessageHandler *MessageHandler_get_chan_handler(const LDKMessageHandler *this_ptr);
	public static native long MessageHandler_get_chan_handler(long this_ptr);
	// void MessageHandler_set_chan_handler(LDKMessageHandler *this_ptr, LDKChannelMessageHandler val);
	public static native void MessageHandler_set_chan_handler(long this_ptr, long val);
	// const LDKRoutingMessageHandler *MessageHandler_get_route_handler(const LDKMessageHandler *this_ptr);
	public static native long MessageHandler_get_route_handler(long this_ptr);
	// void MessageHandler_set_route_handler(LDKMessageHandler *this_ptr, LDKRoutingMessageHandler val);
	public static native void MessageHandler_set_route_handler(long this_ptr, long val);
	// MUST_USE_RES LDKMessageHandler MessageHandler_new(LDKChannelMessageHandler chan_handler_arg, LDKRoutingMessageHandler route_handler_arg);
	public static native long MessageHandler_new(long chan_handler_arg, long route_handler_arg);
	// void SocketDescriptor_free(LDKSocketDescriptor this_ptr);
	public static native void SocketDescriptor_free(long this_ptr);
	// void PeerHandleError_free(LDKPeerHandleError this_ptr);
	public static native void PeerHandleError_free(long this_ptr);
	// bool PeerHandleError_get_no_connection_possible(const LDKPeerHandleError *this_ptr);
	public static native boolean PeerHandleError_get_no_connection_possible(long this_ptr);
	// void PeerHandleError_set_no_connection_possible(LDKPeerHandleError *this_ptr, bool val);
	public static native void PeerHandleError_set_no_connection_possible(long this_ptr, boolean val);
	// MUST_USE_RES LDKPeerHandleError PeerHandleError_new(bool no_connection_possible_arg);
	public static native long PeerHandleError_new(boolean no_connection_possible_arg);
	// void PeerManager_free(LDKPeerManager this_ptr);
	public static native void PeerManager_free(long this_ptr);
	// MUST_USE_RES LDKPeerManager PeerManager_new(LDKMessageHandler message_handler, LDKSecretKey our_node_secret, const uint8_t (*ephemeral_random_data)[32], LDKLogger logger);
	public static native long PeerManager_new(long message_handler, byte[] our_node_secret, byte[] ephemeral_random_data, long logger);
	// MUST_USE_RES LDKCVec_PublicKeyZ PeerManager_get_peer_node_ids(const LDKPeerManager *this_arg);
	public static native byte[][] PeerManager_get_peer_node_ids(long this_arg);
	// MUST_USE_RES LDKCResult_CVec_u8ZPeerHandleErrorZ PeerManager_new_outbound_connection(const LDKPeerManager *this_arg, LDKPublicKey their_node_id, LDKSocketDescriptor descriptor);
	public static native long PeerManager_new_outbound_connection(long this_arg, byte[] their_node_id, long descriptor);
	// MUST_USE_RES LDKCResult_NonePeerHandleErrorZ PeerManager_new_inbound_connection(const LDKPeerManager *this_arg, LDKSocketDescriptor descriptor);
	public static native long PeerManager_new_inbound_connection(long this_arg, long descriptor);
	// MUST_USE_RES LDKCResult_NonePeerHandleErrorZ PeerManager_write_buffer_space_avail(const LDKPeerManager *this_arg, LDKSocketDescriptor *descriptor);
	public static native long PeerManager_write_buffer_space_avail(long this_arg, long descriptor);
	// MUST_USE_RES LDKCResult_boolPeerHandleErrorZ PeerManager_read_event(const LDKPeerManager *this_arg, LDKSocketDescriptor *peer_descriptor, LDKu8slice data);
	public static native long PeerManager_read_event(long this_arg, long peer_descriptor, byte[] data);
	// void PeerManager_process_events(const LDKPeerManager *this_arg);
	public static native void PeerManager_process_events(long this_arg);
	// void PeerManager_socket_disconnected(const LDKPeerManager *this_arg, const LDKSocketDescriptor *descriptor);
	public static native void PeerManager_socket_disconnected(long this_arg, long descriptor);
	// void PeerManager_timer_tick_occured(const LDKPeerManager *this_arg);
	public static native void PeerManager_timer_tick_occured(long this_arg);
	// LDKThirtyTwoBytes build_commitment_secret(const uint8_t (*commitment_seed)[32], uint64_t idx);
	public static native byte[] build_commitment_secret(byte[] commitment_seed, long idx);
	// LDKCResult_SecretKeySecpErrorZ derive_private_key(LDKPublicKey per_commitment_point, const uint8_t (*base_secret)[32]);
	public static native long derive_private_key(byte[] per_commitment_point, byte[] base_secret);
	// LDKCResult_PublicKeySecpErrorZ derive_public_key(LDKPublicKey per_commitment_point, LDKPublicKey base_point);
	public static native long derive_public_key(byte[] per_commitment_point, byte[] base_point);
	// LDKCResult_SecretKeySecpErrorZ derive_private_revocation_key(const uint8_t (*per_commitment_secret)[32], const uint8_t (*countersignatory_revocation_base_secret)[32]);
	public static native long derive_private_revocation_key(byte[] per_commitment_secret, byte[] countersignatory_revocation_base_secret);
	// LDKCResult_PublicKeySecpErrorZ derive_public_revocation_key(LDKPublicKey per_commitment_point, LDKPublicKey countersignatory_revocation_base_point);
	public static native long derive_public_revocation_key(byte[] per_commitment_point, byte[] countersignatory_revocation_base_point);
	// void TxCreationKeys_free(LDKTxCreationKeys this_ptr);
	public static native void TxCreationKeys_free(long this_ptr);
	// LDKTxCreationKeys TxCreationKeys_clone(const LDKTxCreationKeys *orig);
	public static native long TxCreationKeys_clone(long orig);
	// LDKPublicKey TxCreationKeys_get_per_commitment_point(const LDKTxCreationKeys *this_ptr);
	public static native byte[] TxCreationKeys_get_per_commitment_point(long this_ptr);
	// void TxCreationKeys_set_per_commitment_point(LDKTxCreationKeys *this_ptr, LDKPublicKey val);
	public static native void TxCreationKeys_set_per_commitment_point(long this_ptr, byte[] val);
	// LDKPublicKey TxCreationKeys_get_revocation_key(const LDKTxCreationKeys *this_ptr);
	public static native byte[] TxCreationKeys_get_revocation_key(long this_ptr);
	// void TxCreationKeys_set_revocation_key(LDKTxCreationKeys *this_ptr, LDKPublicKey val);
	public static native void TxCreationKeys_set_revocation_key(long this_ptr, byte[] val);
	// LDKPublicKey TxCreationKeys_get_broadcaster_htlc_key(const LDKTxCreationKeys *this_ptr);
	public static native byte[] TxCreationKeys_get_broadcaster_htlc_key(long this_ptr);
	// void TxCreationKeys_set_broadcaster_htlc_key(LDKTxCreationKeys *this_ptr, LDKPublicKey val);
	public static native void TxCreationKeys_set_broadcaster_htlc_key(long this_ptr, byte[] val);
	// LDKPublicKey TxCreationKeys_get_countersignatory_htlc_key(const LDKTxCreationKeys *this_ptr);
	public static native byte[] TxCreationKeys_get_countersignatory_htlc_key(long this_ptr);
	// void TxCreationKeys_set_countersignatory_htlc_key(LDKTxCreationKeys *this_ptr, LDKPublicKey val);
	public static native void TxCreationKeys_set_countersignatory_htlc_key(long this_ptr, byte[] val);
	// LDKPublicKey TxCreationKeys_get_broadcaster_delayed_payment_key(const LDKTxCreationKeys *this_ptr);
	public static native byte[] TxCreationKeys_get_broadcaster_delayed_payment_key(long this_ptr);
	// void TxCreationKeys_set_broadcaster_delayed_payment_key(LDKTxCreationKeys *this_ptr, LDKPublicKey val);
	public static native void TxCreationKeys_set_broadcaster_delayed_payment_key(long this_ptr, byte[] val);
	// MUST_USE_RES LDKTxCreationKeys TxCreationKeys_new(LDKPublicKey per_commitment_point_arg, LDKPublicKey revocation_key_arg, LDKPublicKey broadcaster_htlc_key_arg, LDKPublicKey countersignatory_htlc_key_arg, LDKPublicKey broadcaster_delayed_payment_key_arg);
	public static native long TxCreationKeys_new(byte[] per_commitment_point_arg, byte[] revocation_key_arg, byte[] broadcaster_htlc_key_arg, byte[] countersignatory_htlc_key_arg, byte[] broadcaster_delayed_payment_key_arg);
	// LDKCVec_u8Z TxCreationKeys_write(const LDKTxCreationKeys *obj);
	public static native byte[] TxCreationKeys_write(long obj);
	// LDKTxCreationKeys TxCreationKeys_read(LDKu8slice ser);
	public static native long TxCreationKeys_read(byte[] ser);
	// void PreCalculatedTxCreationKeys_free(LDKPreCalculatedTxCreationKeys this_ptr);
	public static native void PreCalculatedTxCreationKeys_free(long this_ptr);
	// LDKPreCalculatedTxCreationKeys PreCalculatedTxCreationKeys_clone(const LDKPreCalculatedTxCreationKeys *orig);
	public static native long PreCalculatedTxCreationKeys_clone(long orig);
	// MUST_USE_RES LDKPreCalculatedTxCreationKeys PreCalculatedTxCreationKeys_new(LDKTxCreationKeys keys);
	public static native long PreCalculatedTxCreationKeys_new(long keys);
	// MUST_USE_RES LDKTxCreationKeys PreCalculatedTxCreationKeys_trust_key_derivation(const LDKPreCalculatedTxCreationKeys *this_arg);
	public static native long PreCalculatedTxCreationKeys_trust_key_derivation(long this_arg);
	// MUST_USE_RES LDKPublicKey PreCalculatedTxCreationKeys_per_commitment_point(const LDKPreCalculatedTxCreationKeys *this_arg);
	public static native byte[] PreCalculatedTxCreationKeys_per_commitment_point(long this_arg);
	// void ChannelPublicKeys_free(LDKChannelPublicKeys this_ptr);
	public static native void ChannelPublicKeys_free(long this_ptr);
	// LDKChannelPublicKeys ChannelPublicKeys_clone(const LDKChannelPublicKeys *orig);
	public static native long ChannelPublicKeys_clone(long orig);
	// LDKPublicKey ChannelPublicKeys_get_funding_pubkey(const LDKChannelPublicKeys *this_ptr);
	public static native byte[] ChannelPublicKeys_get_funding_pubkey(long this_ptr);
	// void ChannelPublicKeys_set_funding_pubkey(LDKChannelPublicKeys *this_ptr, LDKPublicKey val);
	public static native void ChannelPublicKeys_set_funding_pubkey(long this_ptr, byte[] val);
	// LDKPublicKey ChannelPublicKeys_get_revocation_basepoint(const LDKChannelPublicKeys *this_ptr);
	public static native byte[] ChannelPublicKeys_get_revocation_basepoint(long this_ptr);
	// void ChannelPublicKeys_set_revocation_basepoint(LDKChannelPublicKeys *this_ptr, LDKPublicKey val);
	public static native void ChannelPublicKeys_set_revocation_basepoint(long this_ptr, byte[] val);
	// LDKPublicKey ChannelPublicKeys_get_payment_point(const LDKChannelPublicKeys *this_ptr);
	public static native byte[] ChannelPublicKeys_get_payment_point(long this_ptr);
	// void ChannelPublicKeys_set_payment_point(LDKChannelPublicKeys *this_ptr, LDKPublicKey val);
	public static native void ChannelPublicKeys_set_payment_point(long this_ptr, byte[] val);
	// LDKPublicKey ChannelPublicKeys_get_delayed_payment_basepoint(const LDKChannelPublicKeys *this_ptr);
	public static native byte[] ChannelPublicKeys_get_delayed_payment_basepoint(long this_ptr);
	// void ChannelPublicKeys_set_delayed_payment_basepoint(LDKChannelPublicKeys *this_ptr, LDKPublicKey val);
	public static native void ChannelPublicKeys_set_delayed_payment_basepoint(long this_ptr, byte[] val);
	// LDKPublicKey ChannelPublicKeys_get_htlc_basepoint(const LDKChannelPublicKeys *this_ptr);
	public static native byte[] ChannelPublicKeys_get_htlc_basepoint(long this_ptr);
	// void ChannelPublicKeys_set_htlc_basepoint(LDKChannelPublicKeys *this_ptr, LDKPublicKey val);
	public static native void ChannelPublicKeys_set_htlc_basepoint(long this_ptr, byte[] val);
	// MUST_USE_RES LDKChannelPublicKeys ChannelPublicKeys_new(LDKPublicKey funding_pubkey_arg, LDKPublicKey revocation_basepoint_arg, LDKPublicKey payment_point_arg, LDKPublicKey delayed_payment_basepoint_arg, LDKPublicKey htlc_basepoint_arg);
	public static native long ChannelPublicKeys_new(byte[] funding_pubkey_arg, byte[] revocation_basepoint_arg, byte[] payment_point_arg, byte[] delayed_payment_basepoint_arg, byte[] htlc_basepoint_arg);
	// LDKCVec_u8Z ChannelPublicKeys_write(const LDKChannelPublicKeys *obj);
	public static native byte[] ChannelPublicKeys_write(long obj);
	// LDKChannelPublicKeys ChannelPublicKeys_read(LDKu8slice ser);
	public static native long ChannelPublicKeys_read(byte[] ser);
	// MUST_USE_RES LDKCResult_TxCreationKeysSecpErrorZ TxCreationKeys_derive_new(LDKPublicKey per_commitment_point, LDKPublicKey broadcaster_delayed_payment_base, LDKPublicKey broadcaster_htlc_base, LDKPublicKey countersignatory_revocation_base, LDKPublicKey countersignatory_htlc_base);
	public static native long TxCreationKeys_derive_new(byte[] per_commitment_point, byte[] broadcaster_delayed_payment_base, byte[] broadcaster_htlc_base, byte[] countersignatory_revocation_base, byte[] countersignatory_htlc_base);
	// LDKCVec_u8Z get_revokeable_redeemscript(LDKPublicKey revocation_key, uint16_t contest_delay, LDKPublicKey broadcaster_delayed_payment_key);
	public static native byte[] get_revokeable_redeemscript(byte[] revocation_key, short contest_delay, byte[] broadcaster_delayed_payment_key);
	// void HTLCOutputInCommitment_free(LDKHTLCOutputInCommitment this_ptr);
	public static native void HTLCOutputInCommitment_free(long this_ptr);
	// LDKHTLCOutputInCommitment HTLCOutputInCommitment_clone(const LDKHTLCOutputInCommitment *orig);
	public static native long HTLCOutputInCommitment_clone(long orig);
	// bool HTLCOutputInCommitment_get_offered(const LDKHTLCOutputInCommitment *this_ptr);
	public static native boolean HTLCOutputInCommitment_get_offered(long this_ptr);
	// void HTLCOutputInCommitment_set_offered(LDKHTLCOutputInCommitment *this_ptr, bool val);
	public static native void HTLCOutputInCommitment_set_offered(long this_ptr, boolean val);
	// uint64_t HTLCOutputInCommitment_get_amount_msat(const LDKHTLCOutputInCommitment *this_ptr);
	public static native long HTLCOutputInCommitment_get_amount_msat(long this_ptr);
	// void HTLCOutputInCommitment_set_amount_msat(LDKHTLCOutputInCommitment *this_ptr, uint64_t val);
	public static native void HTLCOutputInCommitment_set_amount_msat(long this_ptr, long val);
	// uint32_t HTLCOutputInCommitment_get_cltv_expiry(const LDKHTLCOutputInCommitment *this_ptr);
	public static native int HTLCOutputInCommitment_get_cltv_expiry(long this_ptr);
	// void HTLCOutputInCommitment_set_cltv_expiry(LDKHTLCOutputInCommitment *this_ptr, uint32_t val);
	public static native void HTLCOutputInCommitment_set_cltv_expiry(long this_ptr, int val);
	// const uint8_t (*HTLCOutputInCommitment_get_payment_hash(const LDKHTLCOutputInCommitment *this_ptr))[32];
	public static native byte[] HTLCOutputInCommitment_get_payment_hash(long this_ptr);
	// void HTLCOutputInCommitment_set_payment_hash(LDKHTLCOutputInCommitment *this_ptr, LDKThirtyTwoBytes val);
	public static native void HTLCOutputInCommitment_set_payment_hash(long this_ptr, byte[] val);
	// LDKCVec_u8Z HTLCOutputInCommitment_write(const LDKHTLCOutputInCommitment *obj);
	public static native byte[] HTLCOutputInCommitment_write(long obj);
	// LDKHTLCOutputInCommitment HTLCOutputInCommitment_read(LDKu8slice ser);
	public static native long HTLCOutputInCommitment_read(byte[] ser);
	// LDKCVec_u8Z get_htlc_redeemscript(const LDKHTLCOutputInCommitment *htlc, const LDKTxCreationKeys *keys);
	public static native byte[] get_htlc_redeemscript(long htlc, long keys);
	// LDKCVec_u8Z make_funding_redeemscript(LDKPublicKey broadcaster, LDKPublicKey countersignatory);
	public static native byte[] make_funding_redeemscript(byte[] broadcaster, byte[] countersignatory);
	// LDKTransaction build_htlc_transaction(const uint8_t (*prev_hash)[32], uint32_t feerate_per_kw, uint16_t contest_delay, const LDKHTLCOutputInCommitment *htlc, LDKPublicKey broadcaster_delayed_payment_key, LDKPublicKey revocation_key);
	public static native byte[] build_htlc_transaction(byte[] prev_hash, int feerate_per_kw, short contest_delay, long htlc, byte[] broadcaster_delayed_payment_key, byte[] revocation_key);
	// void HolderCommitmentTransaction_free(LDKHolderCommitmentTransaction this_ptr);
	public static native void HolderCommitmentTransaction_free(long this_ptr);
	// LDKHolderCommitmentTransaction HolderCommitmentTransaction_clone(const LDKHolderCommitmentTransaction *orig);
	public static native long HolderCommitmentTransaction_clone(long orig);
	// LDKTransaction HolderCommitmentTransaction_get_unsigned_tx(const LDKHolderCommitmentTransaction *this_ptr);
	public static native byte[] HolderCommitmentTransaction_get_unsigned_tx(long this_ptr);
	// void HolderCommitmentTransaction_set_unsigned_tx(LDKHolderCommitmentTransaction *this_ptr, LDKTransaction val);
	public static native void HolderCommitmentTransaction_set_unsigned_tx(long this_ptr, byte[] val);
	// LDKSignature HolderCommitmentTransaction_get_counterparty_sig(const LDKHolderCommitmentTransaction *this_ptr);
	public static native byte[] HolderCommitmentTransaction_get_counterparty_sig(long this_ptr);
	// void HolderCommitmentTransaction_set_counterparty_sig(LDKHolderCommitmentTransaction *this_ptr, LDKSignature val);
	public static native void HolderCommitmentTransaction_set_counterparty_sig(long this_ptr, byte[] val);
	// uint32_t HolderCommitmentTransaction_get_feerate_per_kw(const LDKHolderCommitmentTransaction *this_ptr);
	public static native int HolderCommitmentTransaction_get_feerate_per_kw(long this_ptr);
	// void HolderCommitmentTransaction_set_feerate_per_kw(LDKHolderCommitmentTransaction *this_ptr, uint32_t val);
	public static native void HolderCommitmentTransaction_set_feerate_per_kw(long this_ptr, int val);
	// void HolderCommitmentTransaction_set_per_htlc(LDKHolderCommitmentTransaction *this_ptr, LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ val);
	public static native void HolderCommitmentTransaction_set_per_htlc(long this_ptr, long[] val);
	// MUST_USE_RES LDKHolderCommitmentTransaction HolderCommitmentTransaction_new_missing_holder_sig(LDKTransaction unsigned_tx, LDKSignature counterparty_sig, LDKPublicKey holder_funding_key, LDKPublicKey counterparty_funding_key, LDKTxCreationKeys keys, uint32_t feerate_per_kw, LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ htlc_data);
	public static native long HolderCommitmentTransaction_new_missing_holder_sig(byte[] unsigned_tx, byte[] counterparty_sig, byte[] holder_funding_key, byte[] counterparty_funding_key, long keys, int feerate_per_kw, long[] htlc_data);
	// MUST_USE_RES LDKTxCreationKeys HolderCommitmentTransaction_trust_key_derivation(const LDKHolderCommitmentTransaction *this_arg);
	public static native long HolderCommitmentTransaction_trust_key_derivation(long this_arg);
	// MUST_USE_RES LDKThirtyTwoBytes HolderCommitmentTransaction_txid(const LDKHolderCommitmentTransaction *this_arg);
	public static native byte[] HolderCommitmentTransaction_txid(long this_arg);
	// MUST_USE_RES LDKSignature HolderCommitmentTransaction_get_holder_sig(const LDKHolderCommitmentTransaction *this_arg, const uint8_t (*funding_key)[32], LDKu8slice funding_redeemscript, uint64_t channel_value_satoshis);
	public static native byte[] HolderCommitmentTransaction_get_holder_sig(long this_arg, byte[] funding_key, byte[] funding_redeemscript, long channel_value_satoshis);
	// MUST_USE_RES LDKCResult_CVec_SignatureZNoneZ HolderCommitmentTransaction_get_htlc_sigs(const LDKHolderCommitmentTransaction *this_arg, const uint8_t (*htlc_base_key)[32], uint16_t counterparty_selected_contest_delay);
	public static native long HolderCommitmentTransaction_get_htlc_sigs(long this_arg, byte[] htlc_base_key, short counterparty_selected_contest_delay);
	// LDKCVec_u8Z HolderCommitmentTransaction_write(const LDKHolderCommitmentTransaction *obj);
	public static native byte[] HolderCommitmentTransaction_write(long obj);
	// LDKHolderCommitmentTransaction HolderCommitmentTransaction_read(LDKu8slice ser);
	public static native long HolderCommitmentTransaction_read(byte[] ser);
	// void InitFeatures_free(LDKInitFeatures this_ptr);
	public static native void InitFeatures_free(long this_ptr);
	// void NodeFeatures_free(LDKNodeFeatures this_ptr);
	public static native void NodeFeatures_free(long this_ptr);
	// void ChannelFeatures_free(LDKChannelFeatures this_ptr);
	public static native void ChannelFeatures_free(long this_ptr);
	// void RouteHop_free(LDKRouteHop this_ptr);
	public static native void RouteHop_free(long this_ptr);
	// LDKRouteHop RouteHop_clone(const LDKRouteHop *orig);
	public static native long RouteHop_clone(long orig);
	// LDKPublicKey RouteHop_get_pubkey(const LDKRouteHop *this_ptr);
	public static native byte[] RouteHop_get_pubkey(long this_ptr);
	// void RouteHop_set_pubkey(LDKRouteHop *this_ptr, LDKPublicKey val);
	public static native void RouteHop_set_pubkey(long this_ptr, byte[] val);
	// LDKNodeFeatures RouteHop_get_node_features(const LDKRouteHop *this_ptr);
	public static native long RouteHop_get_node_features(long this_ptr);
	// void RouteHop_set_node_features(LDKRouteHop *this_ptr, LDKNodeFeatures val);
	public static native void RouteHop_set_node_features(long this_ptr, long val);
	// uint64_t RouteHop_get_short_channel_id(const LDKRouteHop *this_ptr);
	public static native long RouteHop_get_short_channel_id(long this_ptr);
	// void RouteHop_set_short_channel_id(LDKRouteHop *this_ptr, uint64_t val);
	public static native void RouteHop_set_short_channel_id(long this_ptr, long val);
	// LDKChannelFeatures RouteHop_get_channel_features(const LDKRouteHop *this_ptr);
	public static native long RouteHop_get_channel_features(long this_ptr);
	// void RouteHop_set_channel_features(LDKRouteHop *this_ptr, LDKChannelFeatures val);
	public static native void RouteHop_set_channel_features(long this_ptr, long val);
	// uint64_t RouteHop_get_fee_msat(const LDKRouteHop *this_ptr);
	public static native long RouteHop_get_fee_msat(long this_ptr);
	// void RouteHop_set_fee_msat(LDKRouteHop *this_ptr, uint64_t val);
	public static native void RouteHop_set_fee_msat(long this_ptr, long val);
	// uint32_t RouteHop_get_cltv_expiry_delta(const LDKRouteHop *this_ptr);
	public static native int RouteHop_get_cltv_expiry_delta(long this_ptr);
	// void RouteHop_set_cltv_expiry_delta(LDKRouteHop *this_ptr, uint32_t val);
	public static native void RouteHop_set_cltv_expiry_delta(long this_ptr, int val);
	// MUST_USE_RES LDKRouteHop RouteHop_new(LDKPublicKey pubkey_arg, LDKNodeFeatures node_features_arg, uint64_t short_channel_id_arg, LDKChannelFeatures channel_features_arg, uint64_t fee_msat_arg, uint32_t cltv_expiry_delta_arg);
	public static native long RouteHop_new(byte[] pubkey_arg, long node_features_arg, long short_channel_id_arg, long channel_features_arg, long fee_msat_arg, int cltv_expiry_delta_arg);
	// void Route_free(LDKRoute this_ptr);
	public static native void Route_free(long this_ptr);
	// LDKRoute Route_clone(const LDKRoute *orig);
	public static native long Route_clone(long orig);
	// void Route_set_paths(LDKRoute *this_ptr, LDKCVec_CVec_RouteHopZZ val);
	public static native void Route_set_paths(long this_ptr, long[][] val);
	// MUST_USE_RES LDKRoute Route_new(LDKCVec_CVec_RouteHopZZ paths_arg);
	public static native long Route_new(long[][] paths_arg);
	// LDKCVec_u8Z Route_write(const LDKRoute *obj);
	public static native byte[] Route_write(long obj);
	// LDKRoute Route_read(LDKu8slice ser);
	public static native long Route_read(byte[] ser);
	// void RouteHint_free(LDKRouteHint this_ptr);
	public static native void RouteHint_free(long this_ptr);
	// LDKRouteHint RouteHint_clone(const LDKRouteHint *orig);
	public static native long RouteHint_clone(long orig);
	// LDKPublicKey RouteHint_get_src_node_id(const LDKRouteHint *this_ptr);
	public static native byte[] RouteHint_get_src_node_id(long this_ptr);
	// void RouteHint_set_src_node_id(LDKRouteHint *this_ptr, LDKPublicKey val);
	public static native void RouteHint_set_src_node_id(long this_ptr, byte[] val);
	// uint64_t RouteHint_get_short_channel_id(const LDKRouteHint *this_ptr);
	public static native long RouteHint_get_short_channel_id(long this_ptr);
	// void RouteHint_set_short_channel_id(LDKRouteHint *this_ptr, uint64_t val);
	public static native void RouteHint_set_short_channel_id(long this_ptr, long val);
	// LDKRoutingFees RouteHint_get_fees(const LDKRouteHint *this_ptr);
	public static native long RouteHint_get_fees(long this_ptr);
	// void RouteHint_set_fees(LDKRouteHint *this_ptr, LDKRoutingFees val);
	public static native void RouteHint_set_fees(long this_ptr, long val);
	// uint16_t RouteHint_get_cltv_expiry_delta(const LDKRouteHint *this_ptr);
	public static native short RouteHint_get_cltv_expiry_delta(long this_ptr);
	// void RouteHint_set_cltv_expiry_delta(LDKRouteHint *this_ptr, uint16_t val);
	public static native void RouteHint_set_cltv_expiry_delta(long this_ptr, short val);
	// uint64_t RouteHint_get_htlc_minimum_msat(const LDKRouteHint *this_ptr);
	public static native long RouteHint_get_htlc_minimum_msat(long this_ptr);
	// void RouteHint_set_htlc_minimum_msat(LDKRouteHint *this_ptr, uint64_t val);
	public static native void RouteHint_set_htlc_minimum_msat(long this_ptr, long val);
	// MUST_USE_RES LDKRouteHint RouteHint_new(LDKPublicKey src_node_id_arg, uint64_t short_channel_id_arg, LDKRoutingFees fees_arg, uint16_t cltv_expiry_delta_arg, uint64_t htlc_minimum_msat_arg);
	public static native long RouteHint_new(byte[] src_node_id_arg, long short_channel_id_arg, long fees_arg, short cltv_expiry_delta_arg, long htlc_minimum_msat_arg);
	// LDKCResult_RouteLightningErrorZ get_route(LDKPublicKey our_node_id, const LDKNetworkGraph *network, LDKPublicKey target, LDKCVec_ChannelDetailsZ *first_hops, LDKCVec_RouteHintZ last_hops, uint64_t final_value_msat, uint32_t final_cltv, LDKLogger logger);
	public static native long get_route(byte[] our_node_id, long network, byte[] target, long[] first_hops, long[] last_hops, long final_value_msat, int final_cltv, long logger);
	// void NetworkGraph_free(LDKNetworkGraph this_ptr);
	public static native void NetworkGraph_free(long this_ptr);
	// void LockedNetworkGraph_free(LDKLockedNetworkGraph this_ptr);
	public static native void LockedNetworkGraph_free(long this_ptr);
	// void NetGraphMsgHandler_free(LDKNetGraphMsgHandler this_ptr);
	public static native void NetGraphMsgHandler_free(long this_ptr);
	// MUST_USE_RES LDKNetGraphMsgHandler NetGraphMsgHandler_new(LDKAccess *chain_access, LDKLogger logger);
	public static native long NetGraphMsgHandler_new(long chain_access, long logger);
	// MUST_USE_RES LDKNetGraphMsgHandler NetGraphMsgHandler_from_net_graph(LDKAccess *chain_access, LDKLogger logger, LDKNetworkGraph network_graph);
	public static native long NetGraphMsgHandler_from_net_graph(long chain_access, long logger, long network_graph);
	// MUST_USE_RES LDKLockedNetworkGraph NetGraphMsgHandler_read_locked_graph(const LDKNetGraphMsgHandler *this_arg);
	public static native long NetGraphMsgHandler_read_locked_graph(long this_arg);
	// MUST_USE_RES LDKNetworkGraph LockedNetworkGraph_graph(const LDKLockedNetworkGraph *this_arg);
	public static native long LockedNetworkGraph_graph(long this_arg);
	// LDKRoutingMessageHandler NetGraphMsgHandler_as_RoutingMessageHandler(const LDKNetGraphMsgHandler *this_arg);
	public static native long NetGraphMsgHandler_as_RoutingMessageHandler(long this_arg);
	// void DirectionalChannelInfo_free(LDKDirectionalChannelInfo this_ptr);
	public static native void DirectionalChannelInfo_free(long this_ptr);
	// uint32_t DirectionalChannelInfo_get_last_update(const LDKDirectionalChannelInfo *this_ptr);
	public static native int DirectionalChannelInfo_get_last_update(long this_ptr);
	// void DirectionalChannelInfo_set_last_update(LDKDirectionalChannelInfo *this_ptr, uint32_t val);
	public static native void DirectionalChannelInfo_set_last_update(long this_ptr, int val);
	// bool DirectionalChannelInfo_get_enabled(const LDKDirectionalChannelInfo *this_ptr);
	public static native boolean DirectionalChannelInfo_get_enabled(long this_ptr);
	// void DirectionalChannelInfo_set_enabled(LDKDirectionalChannelInfo *this_ptr, bool val);
	public static native void DirectionalChannelInfo_set_enabled(long this_ptr, boolean val);
	// uint16_t DirectionalChannelInfo_get_cltv_expiry_delta(const LDKDirectionalChannelInfo *this_ptr);
	public static native short DirectionalChannelInfo_get_cltv_expiry_delta(long this_ptr);
	// void DirectionalChannelInfo_set_cltv_expiry_delta(LDKDirectionalChannelInfo *this_ptr, uint16_t val);
	public static native void DirectionalChannelInfo_set_cltv_expiry_delta(long this_ptr, short val);
	// uint64_t DirectionalChannelInfo_get_htlc_minimum_msat(const LDKDirectionalChannelInfo *this_ptr);
	public static native long DirectionalChannelInfo_get_htlc_minimum_msat(long this_ptr);
	// void DirectionalChannelInfo_set_htlc_minimum_msat(LDKDirectionalChannelInfo *this_ptr, uint64_t val);
	public static native void DirectionalChannelInfo_set_htlc_minimum_msat(long this_ptr, long val);
	// LDKChannelUpdate DirectionalChannelInfo_get_last_update_message(const LDKDirectionalChannelInfo *this_ptr);
	public static native long DirectionalChannelInfo_get_last_update_message(long this_ptr);
	// void DirectionalChannelInfo_set_last_update_message(LDKDirectionalChannelInfo *this_ptr, LDKChannelUpdate val);
	public static native void DirectionalChannelInfo_set_last_update_message(long this_ptr, long val);
	// LDKCVec_u8Z DirectionalChannelInfo_write(const LDKDirectionalChannelInfo *obj);
	public static native byte[] DirectionalChannelInfo_write(long obj);
	// LDKDirectionalChannelInfo DirectionalChannelInfo_read(LDKu8slice ser);
	public static native long DirectionalChannelInfo_read(byte[] ser);
	// void ChannelInfo_free(LDKChannelInfo this_ptr);
	public static native void ChannelInfo_free(long this_ptr);
	// LDKChannelFeatures ChannelInfo_get_features(const LDKChannelInfo *this_ptr);
	public static native long ChannelInfo_get_features(long this_ptr);
	// void ChannelInfo_set_features(LDKChannelInfo *this_ptr, LDKChannelFeatures val);
	public static native void ChannelInfo_set_features(long this_ptr, long val);
	// LDKPublicKey ChannelInfo_get_node_one(const LDKChannelInfo *this_ptr);
	public static native byte[] ChannelInfo_get_node_one(long this_ptr);
	// void ChannelInfo_set_node_one(LDKChannelInfo *this_ptr, LDKPublicKey val);
	public static native void ChannelInfo_set_node_one(long this_ptr, byte[] val);
	// LDKDirectionalChannelInfo ChannelInfo_get_one_to_two(const LDKChannelInfo *this_ptr);
	public static native long ChannelInfo_get_one_to_two(long this_ptr);
	// void ChannelInfo_set_one_to_two(LDKChannelInfo *this_ptr, LDKDirectionalChannelInfo val);
	public static native void ChannelInfo_set_one_to_two(long this_ptr, long val);
	// LDKPublicKey ChannelInfo_get_node_two(const LDKChannelInfo *this_ptr);
	public static native byte[] ChannelInfo_get_node_two(long this_ptr);
	// void ChannelInfo_set_node_two(LDKChannelInfo *this_ptr, LDKPublicKey val);
	public static native void ChannelInfo_set_node_two(long this_ptr, byte[] val);
	// LDKDirectionalChannelInfo ChannelInfo_get_two_to_one(const LDKChannelInfo *this_ptr);
	public static native long ChannelInfo_get_two_to_one(long this_ptr);
	// void ChannelInfo_set_two_to_one(LDKChannelInfo *this_ptr, LDKDirectionalChannelInfo val);
	public static native void ChannelInfo_set_two_to_one(long this_ptr, long val);
	// LDKChannelAnnouncement ChannelInfo_get_announcement_message(const LDKChannelInfo *this_ptr);
	public static native long ChannelInfo_get_announcement_message(long this_ptr);
	// void ChannelInfo_set_announcement_message(LDKChannelInfo *this_ptr, LDKChannelAnnouncement val);
	public static native void ChannelInfo_set_announcement_message(long this_ptr, long val);
	// LDKCVec_u8Z ChannelInfo_write(const LDKChannelInfo *obj);
	public static native byte[] ChannelInfo_write(long obj);
	// LDKChannelInfo ChannelInfo_read(LDKu8slice ser);
	public static native long ChannelInfo_read(byte[] ser);
	// void RoutingFees_free(LDKRoutingFees this_ptr);
	public static native void RoutingFees_free(long this_ptr);
	// LDKRoutingFees RoutingFees_clone(const LDKRoutingFees *orig);
	public static native long RoutingFees_clone(long orig);
	// uint32_t RoutingFees_get_base_msat(const LDKRoutingFees *this_ptr);
	public static native int RoutingFees_get_base_msat(long this_ptr);
	// void RoutingFees_set_base_msat(LDKRoutingFees *this_ptr, uint32_t val);
	public static native void RoutingFees_set_base_msat(long this_ptr, int val);
	// uint32_t RoutingFees_get_proportional_millionths(const LDKRoutingFees *this_ptr);
	public static native int RoutingFees_get_proportional_millionths(long this_ptr);
	// void RoutingFees_set_proportional_millionths(LDKRoutingFees *this_ptr, uint32_t val);
	public static native void RoutingFees_set_proportional_millionths(long this_ptr, int val);
	// MUST_USE_RES LDKRoutingFees RoutingFees_new(uint32_t base_msat_arg, uint32_t proportional_millionths_arg);
	public static native long RoutingFees_new(int base_msat_arg, int proportional_millionths_arg);
	// LDKRoutingFees RoutingFees_read(LDKu8slice ser);
	public static native long RoutingFees_read(byte[] ser);
	// LDKCVec_u8Z RoutingFees_write(const LDKRoutingFees *obj);
	public static native byte[] RoutingFees_write(long obj);
	// void NodeAnnouncementInfo_free(LDKNodeAnnouncementInfo this_ptr);
	public static native void NodeAnnouncementInfo_free(long this_ptr);
	// LDKNodeFeatures NodeAnnouncementInfo_get_features(const LDKNodeAnnouncementInfo *this_ptr);
	public static native long NodeAnnouncementInfo_get_features(long this_ptr);
	// void NodeAnnouncementInfo_set_features(LDKNodeAnnouncementInfo *this_ptr, LDKNodeFeatures val);
	public static native void NodeAnnouncementInfo_set_features(long this_ptr, long val);
	// uint32_t NodeAnnouncementInfo_get_last_update(const LDKNodeAnnouncementInfo *this_ptr);
	public static native int NodeAnnouncementInfo_get_last_update(long this_ptr);
	// void NodeAnnouncementInfo_set_last_update(LDKNodeAnnouncementInfo *this_ptr, uint32_t val);
	public static native void NodeAnnouncementInfo_set_last_update(long this_ptr, int val);
	// const uint8_t (*NodeAnnouncementInfo_get_rgb(const LDKNodeAnnouncementInfo *this_ptr))[3];
	public static native byte[] NodeAnnouncementInfo_get_rgb(long this_ptr);
	// void NodeAnnouncementInfo_set_rgb(LDKNodeAnnouncementInfo *this_ptr, LDKThreeBytes val);
	public static native void NodeAnnouncementInfo_set_rgb(long this_ptr, byte[] val);
	// const uint8_t (*NodeAnnouncementInfo_get_alias(const LDKNodeAnnouncementInfo *this_ptr))[32];
	public static native byte[] NodeAnnouncementInfo_get_alias(long this_ptr);
	// void NodeAnnouncementInfo_set_alias(LDKNodeAnnouncementInfo *this_ptr, LDKThirtyTwoBytes val);
	public static native void NodeAnnouncementInfo_set_alias(long this_ptr, byte[] val);
	// void NodeAnnouncementInfo_set_addresses(LDKNodeAnnouncementInfo *this_ptr, LDKCVec_NetAddressZ val);
	public static native void NodeAnnouncementInfo_set_addresses(long this_ptr, long[] val);
	// LDKNodeAnnouncement NodeAnnouncementInfo_get_announcement_message(const LDKNodeAnnouncementInfo *this_ptr);
	public static native long NodeAnnouncementInfo_get_announcement_message(long this_ptr);
	// void NodeAnnouncementInfo_set_announcement_message(LDKNodeAnnouncementInfo *this_ptr, LDKNodeAnnouncement val);
	public static native void NodeAnnouncementInfo_set_announcement_message(long this_ptr, long val);
	// MUST_USE_RES LDKNodeAnnouncementInfo NodeAnnouncementInfo_new(LDKNodeFeatures features_arg, uint32_t last_update_arg, LDKThreeBytes rgb_arg, LDKThirtyTwoBytes alias_arg, LDKCVec_NetAddressZ addresses_arg, LDKNodeAnnouncement announcement_message_arg);
	public static native long NodeAnnouncementInfo_new(long features_arg, int last_update_arg, byte[] rgb_arg, byte[] alias_arg, long[] addresses_arg, long announcement_message_arg);
	// LDKCVec_u8Z NodeAnnouncementInfo_write(const LDKNodeAnnouncementInfo *obj);
	public static native byte[] NodeAnnouncementInfo_write(long obj);
	// LDKNodeAnnouncementInfo NodeAnnouncementInfo_read(LDKu8slice ser);
	public static native long NodeAnnouncementInfo_read(byte[] ser);
	// void NodeInfo_free(LDKNodeInfo this_ptr);
	public static native void NodeInfo_free(long this_ptr);
	// void NodeInfo_set_channels(LDKNodeInfo *this_ptr, LDKCVec_u64Z val);
	public static native void NodeInfo_set_channels(long this_ptr, long[] val);
	// LDKRoutingFees NodeInfo_get_lowest_inbound_channel_fees(const LDKNodeInfo *this_ptr);
	public static native long NodeInfo_get_lowest_inbound_channel_fees(long this_ptr);
	// void NodeInfo_set_lowest_inbound_channel_fees(LDKNodeInfo *this_ptr, LDKRoutingFees val);
	public static native void NodeInfo_set_lowest_inbound_channel_fees(long this_ptr, long val);
	// LDKNodeAnnouncementInfo NodeInfo_get_announcement_info(const LDKNodeInfo *this_ptr);
	public static native long NodeInfo_get_announcement_info(long this_ptr);
	// void NodeInfo_set_announcement_info(LDKNodeInfo *this_ptr, LDKNodeAnnouncementInfo val);
	public static native void NodeInfo_set_announcement_info(long this_ptr, long val);
	// MUST_USE_RES LDKNodeInfo NodeInfo_new(LDKCVec_u64Z channels_arg, LDKRoutingFees lowest_inbound_channel_fees_arg, LDKNodeAnnouncementInfo announcement_info_arg);
	public static native long NodeInfo_new(long[] channels_arg, long lowest_inbound_channel_fees_arg, long announcement_info_arg);
	// LDKCVec_u8Z NodeInfo_write(const LDKNodeInfo *obj);
	public static native byte[] NodeInfo_write(long obj);
	// LDKNodeInfo NodeInfo_read(LDKu8slice ser);
	public static native long NodeInfo_read(byte[] ser);
	// LDKCVec_u8Z NetworkGraph_write(const LDKNetworkGraph *obj);
	public static native byte[] NetworkGraph_write(long obj);
	// LDKNetworkGraph NetworkGraph_read(LDKu8slice ser);
	public static native long NetworkGraph_read(byte[] ser);
	// MUST_USE_RES LDKNetworkGraph NetworkGraph_new(void);
	public static native long NetworkGraph_new();
	// void NetworkGraph_close_channel_from_update(LDKNetworkGraph *this_arg, uint64_t short_channel_id, bool is_permanent);
	public static native void NetworkGraph_close_channel_from_update(long this_arg, long short_channel_id, boolean is_permanent);
}
