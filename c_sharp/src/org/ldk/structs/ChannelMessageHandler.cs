
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of ChannelMessageHandler */
public interface ChannelMessageHandlerInterface {
	/**Handle an incoming `open_channel` message from the given peer.
	 */
	void handle_open_channel(byte[] their_node_id, org.ldk.structs.OpenChannel msg);
	/**Handle an incoming `open_channel2` message from the given peer.
	 */
	void handle_open_channel_v2(byte[] their_node_id, org.ldk.structs.OpenChannelV2 msg);
	/**Handle an incoming `accept_channel` message from the given peer.
	 */
	void handle_accept_channel(byte[] their_node_id, org.ldk.structs.AcceptChannel msg);
	/**Handle an incoming `accept_channel2` message from the given peer.
	 */
	void handle_accept_channel_v2(byte[] their_node_id, org.ldk.structs.AcceptChannelV2 msg);
	/**Handle an incoming `funding_created` message from the given peer.
	 */
	void handle_funding_created(byte[] their_node_id, org.ldk.structs.FundingCreated msg);
	/**Handle an incoming `funding_signed` message from the given peer.
	 */
	void handle_funding_signed(byte[] their_node_id, org.ldk.structs.FundingSigned msg);
	/**Handle an incoming `channel_ready` message from the given peer.
	 */
	void handle_channel_ready(byte[] their_node_id, org.ldk.structs.ChannelReady msg);
	/**Handle an incoming `peer_storage` message from the given peer.
	 */
	void handle_peer_storage(byte[] their_node_id, org.ldk.structs.PeerStorage msg);
	/**Handle an incoming `peer_storage_retrieval` message from the given peer.
	 */
	void handle_peer_storage_retrieval(byte[] their_node_id, org.ldk.structs.PeerStorageRetrieval msg);
	/**Handle an incoming `shutdown` message from the given peer.
	 */
	void handle_shutdown(byte[] their_node_id, org.ldk.structs.Shutdown msg);
	/**Handle an incoming `closing_signed` message from the given peer.
	 */
	void handle_closing_signed(byte[] their_node_id, org.ldk.structs.ClosingSigned msg);
	/**Handle an incoming `stfu` message from the given peer.
	 */
	void handle_stfu(byte[] their_node_id, org.ldk.structs.Stfu msg);
	/**Handle an incoming `splice_init` message from the given peer.
	 */
	void handle_splice_init(byte[] their_node_id, org.ldk.structs.SpliceInit msg);
	/**Handle an incoming `splice_ack` message from the given peer.
	 */
	void handle_splice_ack(byte[] their_node_id, org.ldk.structs.SpliceAck msg);
	/**Handle an incoming `splice_locked` message from the given peer.
	 */
	void handle_splice_locked(byte[] their_node_id, org.ldk.structs.SpliceLocked msg);
	/**Handle an incoming `tx_add_input message` from the given peer.
	 */
	void handle_tx_add_input(byte[] their_node_id, org.ldk.structs.TxAddInput msg);
	/**Handle an incoming `tx_add_output` message from the given peer.
	 */
	void handle_tx_add_output(byte[] their_node_id, org.ldk.structs.TxAddOutput msg);
	/**Handle an incoming `tx_remove_input` message from the given peer.
	 */
	void handle_tx_remove_input(byte[] their_node_id, org.ldk.structs.TxRemoveInput msg);
	/**Handle an incoming `tx_remove_output` message from the given peer.
	 */
	void handle_tx_remove_output(byte[] their_node_id, org.ldk.structs.TxRemoveOutput msg);
	/**Handle an incoming `tx_complete message` from the given peer.
	 */
	void handle_tx_complete(byte[] their_node_id, org.ldk.structs.TxComplete msg);
	/**Handle an incoming `tx_signatures` message from the given peer.
	 */
	void handle_tx_signatures(byte[] their_node_id, org.ldk.structs.TxSignatures msg);
	/**Handle an incoming `tx_init_rbf` message from the given peer.
	 */
	void handle_tx_init_rbf(byte[] their_node_id, org.ldk.structs.TxInitRbf msg);
	/**Handle an incoming `tx_ack_rbf` message from the given peer.
	 */
	void handle_tx_ack_rbf(byte[] their_node_id, org.ldk.structs.TxAckRbf msg);
	/**Handle an incoming `tx_abort message` from the given peer.
	 */
	void handle_tx_abort(byte[] their_node_id, org.ldk.structs.TxAbort msg);
	/**Handle an incoming `update_add_htlc` message from the given peer.
	 */
	void handle_update_add_htlc(byte[] their_node_id, org.ldk.structs.UpdateAddHTLC msg);
	/**Handle an incoming `update_fulfill_htlc` message from the given peer.
	 */
	void handle_update_fulfill_htlc(byte[] their_node_id, org.ldk.structs.UpdateFulfillHTLC msg);
	/**Handle an incoming `update_fail_htlc` message from the given peer.
	 */
	void handle_update_fail_htlc(byte[] their_node_id, org.ldk.structs.UpdateFailHTLC msg);
	/**Handle an incoming `update_fail_malformed_htlc` message from the given peer.
	 */
	void handle_update_fail_malformed_htlc(byte[] their_node_id, org.ldk.structs.UpdateFailMalformedHTLC msg);
	/**Handle an incoming `commitment_signed` message from the given peer.
	 */
	void handle_commitment_signed(byte[] their_node_id, org.ldk.structs.CommitmentSigned msg);
	/**Handle a batch of incoming `commitment_signed` message from the given peer.
	 */
	void handle_commitment_signed_batch(byte[] their_node_id, org.ldk.structs.ChannelId channel_id, CommitmentSigned[] batch);
	/**Handle an incoming `revoke_and_ack` message from the given peer.
	 */
	void handle_revoke_and_ack(byte[] their_node_id, org.ldk.structs.RevokeAndACK msg);
	/**Handle an incoming `update_fee` message from the given peer.
	 */
	void handle_update_fee(byte[] their_node_id, org.ldk.structs.UpdateFee msg);
	/**Handle an incoming `announcement_signatures` message from the given peer.
	 */
	void handle_announcement_signatures(byte[] their_node_id, org.ldk.structs.AnnouncementSignatures msg);
	/**Handle an incoming `channel_reestablish` message from the given peer.
	 */
	void handle_channel_reestablish(byte[] their_node_id, org.ldk.structs.ChannelReestablish msg);
	/**Handle an incoming `channel_update` message from the given peer.
	 */
	void handle_channel_update(byte[] their_node_id, org.ldk.structs.ChannelUpdate msg);
	/**Handle an incoming `error` message from the given peer.
	 */
	void handle_error(byte[] their_node_id, org.ldk.structs.ErrorMessage msg);
	/**Gets the chain hashes for this `ChannelMessageHandler` indicating which chains it supports.
	 * 
	 * If it's `None`, then no particular network chain hash compatibility will be enforced when
	 * connecting to peers.
	 */
	Option_CVec_ThirtyTwoBytesZZ get_chain_hashes();
	/**Indicates that a message was received from any peer for any handler.
	 * Called before the message is passed to the appropriate handler.
	 * Useful for indicating that a network connection is active.
	 * 
	 * Note: Since this function is called frequently, it should be as
	 * efficient as possible for its intended purpose.
	 */
	void message_received();
}

/**
 * A trait to describe an object which can receive channel messages.
 * 
 * Messages MAY be called in parallel when they originate from different `their_node_ids`, however
 * they MUST NOT be called in parallel when the two calls have the same `their_node_id`.
 */
public class ChannelMessageHandler : CommonBase {
	internal bindings.LDKChannelMessageHandler bindings_instance;
	internal long instance_idx;

	internal ChannelMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~ChannelMessageHandler() {
		if (ptr != 0) { bindings.ChannelMessageHandler_free(ptr); }
	}

	private class LDKChannelMessageHandlerHolder { internal ChannelMessageHandler held; }
	private class LDKChannelMessageHandlerImpl : bindings.LDKChannelMessageHandler {
		internal LDKChannelMessageHandlerImpl(ChannelMessageHandlerInterface arg, LDKChannelMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private ChannelMessageHandlerInterface arg;
		private LDKChannelMessageHandlerHolder impl_holder;
		public void handle_open_channel(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.OpenChannel _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.OpenChannel(null, _msg); }
			arg.handle_open_channel(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_open_channel_v2(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.OpenChannelV2 _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.OpenChannelV2(null, _msg); }
			arg.handle_open_channel_v2(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_accept_channel(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.AcceptChannel _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.AcceptChannel(null, _msg); }
			arg.handle_accept_channel(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_accept_channel_v2(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.AcceptChannelV2 _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.AcceptChannelV2(null, _msg); }
			arg.handle_accept_channel_v2(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_funding_created(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.FundingCreated _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.FundingCreated(null, _msg); }
			arg.handle_funding_created(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_funding_signed(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.FundingSigned _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.FundingSigned(null, _msg); }
			arg.handle_funding_signed(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_channel_ready(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.ChannelReady _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.ChannelReady(null, _msg); }
			arg.handle_channel_ready(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_peer_storage(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.PeerStorage _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.PeerStorage(null, _msg); }
			if (_msg_hu_conv != null) { _msg_hu_conv.ptrs_to.AddLast(this); };
			arg.handle_peer_storage(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_peer_storage_retrieval(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.PeerStorageRetrieval _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.PeerStorageRetrieval(null, _msg); }
			if (_msg_hu_conv != null) { _msg_hu_conv.ptrs_to.AddLast(this); };
			arg.handle_peer_storage_retrieval(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_shutdown(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.Shutdown _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.Shutdown(null, _msg); }
			arg.handle_shutdown(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_closing_signed(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.ClosingSigned _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.ClosingSigned(null, _msg); }
			arg.handle_closing_signed(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_stfu(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.Stfu _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.Stfu(null, _msg); }
			arg.handle_stfu(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_splice_init(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.SpliceInit _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.SpliceInit(null, _msg); }
			arg.handle_splice_init(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_splice_ack(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.SpliceAck _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.SpliceAck(null, _msg); }
			arg.handle_splice_ack(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_splice_locked(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.SpliceLocked _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.SpliceLocked(null, _msg); }
			arg.handle_splice_locked(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_tx_add_input(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.TxAddInput _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.TxAddInput(null, _msg); }
			arg.handle_tx_add_input(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_tx_add_output(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.TxAddOutput _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.TxAddOutput(null, _msg); }
			arg.handle_tx_add_output(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_tx_remove_input(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.TxRemoveInput _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.TxRemoveInput(null, _msg); }
			arg.handle_tx_remove_input(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_tx_remove_output(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.TxRemoveOutput _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.TxRemoveOutput(null, _msg); }
			arg.handle_tx_remove_output(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_tx_complete(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.TxComplete _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.TxComplete(null, _msg); }
			arg.handle_tx_complete(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_tx_signatures(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.TxSignatures _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.TxSignatures(null, _msg); }
			arg.handle_tx_signatures(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_tx_init_rbf(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.TxInitRbf _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.TxInitRbf(null, _msg); }
			arg.handle_tx_init_rbf(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_tx_ack_rbf(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.TxAckRbf _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.TxAckRbf(null, _msg); }
			arg.handle_tx_ack_rbf(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_tx_abort(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.TxAbort _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.TxAbort(null, _msg); }
			arg.handle_tx_abort(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_update_add_htlc(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.UpdateAddHTLC _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UpdateAddHTLC(null, _msg); }
			arg.handle_update_add_htlc(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_update_fulfill_htlc(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.UpdateFulfillHTLC _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UpdateFulfillHTLC(null, _msg); }
			if (_msg_hu_conv != null) { _msg_hu_conv.ptrs_to.AddLast(this); };
			arg.handle_update_fulfill_htlc(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_update_fail_htlc(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.UpdateFailHTLC _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UpdateFailHTLC(null, _msg); }
			arg.handle_update_fail_htlc(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_update_fail_malformed_htlc(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.UpdateFailMalformedHTLC _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UpdateFailMalformedHTLC(null, _msg); }
			arg.handle_update_fail_malformed_htlc(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_commitment_signed(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.CommitmentSigned _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.CommitmentSigned(null, _msg); }
			arg.handle_commitment_signed(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_commitment_signed_batch(long _their_node_id, long _channel_id, long _batch) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.ChannelId _channel_id_hu_conv = null; if (_channel_id < 0 || _channel_id > 4096) { _channel_id_hu_conv = new org.ldk.structs.ChannelId(null, _channel_id); }
			if (_channel_id_hu_conv != null) { _channel_id_hu_conv.ptrs_to.AddLast(this); };
			int _batch_conv_18_len = InternalUtils.getArrayLength(_batch);
			CommitmentSigned[] _batch_conv_18_arr = new CommitmentSigned[_batch_conv_18_len];
			for (int s = 0; s < _batch_conv_18_len; s++) {
				long _batch_conv_18 = InternalUtils.getU64ArrayElem(_batch, s);
				org.ldk.structs.CommitmentSigned _batch_conv_18_hu_conv = null; if (_batch_conv_18 < 0 || _batch_conv_18 > 4096) { _batch_conv_18_hu_conv = new org.ldk.structs.CommitmentSigned(null, _batch_conv_18); }
				if (_batch_conv_18_hu_conv != null) { _batch_conv_18_hu_conv.ptrs_to.AddLast(this); };
				_batch_conv_18_arr[s] = _batch_conv_18_hu_conv;
			}
			bindings.free_buffer(_batch);
			arg.handle_commitment_signed_batch(_their_node_id_conv, _channel_id_hu_conv, _batch_conv_18_arr);
				GC.KeepAlive(arg);
		}
		public void handle_revoke_and_ack(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.RevokeAndACK _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.RevokeAndACK(null, _msg); }
			arg.handle_revoke_and_ack(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_update_fee(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.UpdateFee _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UpdateFee(null, _msg); }
			arg.handle_update_fee(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_announcement_signatures(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.AnnouncementSignatures _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.AnnouncementSignatures(null, _msg); }
			arg.handle_announcement_signatures(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_channel_reestablish(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.ChannelReestablish _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.ChannelReestablish(null, _msg); }
			arg.handle_channel_reestablish(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_channel_update(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.ChannelUpdate _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.ChannelUpdate(null, _msg); }
			arg.handle_channel_update(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_error(long _their_node_id, long _msg) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.ErrorMessage _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.ErrorMessage(null, _msg); }
			arg.handle_error(_their_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public long get_chain_hashes() {
			Option_CVec_ThirtyTwoBytesZZ ret = arg.get_chain_hashes();
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public void message_received() {
			arg.message_received();
				GC.KeepAlive(arg);
		}
	}

	/** Creates a new instance of ChannelMessageHandler from a given implementation */
	public static ChannelMessageHandler new_impl(ChannelMessageHandlerInterface arg, BaseMessageHandlerInterface baseMessageHandler_impl) {
		LDKChannelMessageHandlerHolder impl_holder = new LDKChannelMessageHandlerHolder();
		LDKChannelMessageHandlerImpl impl = new LDKChannelMessageHandlerImpl(arg, impl_holder);
		BaseMessageHandler baseMessageHandler = BaseMessageHandler.new_impl(baseMessageHandler_impl);
		long[] ptr_idx = bindings.LDKChannelMessageHandler_new(impl, baseMessageHandler.instance_idx);

		impl_holder.held = new ChannelMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		impl_holder.held.ptrs_to.AddLast(baseMessageHandler);
		return impl_holder.held;
	}

	/**
	 * Handle an incoming `open_channel` message from the given peer.
	 */
	public void handle_open_channel(byte[] their_node_id, org.ldk.structs.OpenChannel msg) {
		bindings.ChannelMessageHandler_handle_open_channel(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `open_channel2` message from the given peer.
	 */
	public void handle_open_channel_v2(byte[] their_node_id, org.ldk.structs.OpenChannelV2 msg) {
		bindings.ChannelMessageHandler_handle_open_channel_v2(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `accept_channel` message from the given peer.
	 */
	public void handle_accept_channel(byte[] their_node_id, org.ldk.structs.AcceptChannel msg) {
		bindings.ChannelMessageHandler_handle_accept_channel(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `accept_channel2` message from the given peer.
	 */
	public void handle_accept_channel_v2(byte[] their_node_id, org.ldk.structs.AcceptChannelV2 msg) {
		bindings.ChannelMessageHandler_handle_accept_channel_v2(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `funding_created` message from the given peer.
	 */
	public void handle_funding_created(byte[] their_node_id, org.ldk.structs.FundingCreated msg) {
		bindings.ChannelMessageHandler_handle_funding_created(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `funding_signed` message from the given peer.
	 */
	public void handle_funding_signed(byte[] their_node_id, org.ldk.structs.FundingSigned msg) {
		bindings.ChannelMessageHandler_handle_funding_signed(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `channel_ready` message from the given peer.
	 */
	public void handle_channel_ready(byte[] their_node_id, org.ldk.structs.ChannelReady msg) {
		bindings.ChannelMessageHandler_handle_channel_ready(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `peer_storage` message from the given peer.
	 */
	public void handle_peer_storage(byte[] their_node_id, org.ldk.structs.PeerStorage msg) {
		bindings.ChannelMessageHandler_handle_peer_storage(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `peer_storage_retrieval` message from the given peer.
	 */
	public void handle_peer_storage_retrieval(byte[] their_node_id, org.ldk.structs.PeerStorageRetrieval msg) {
		bindings.ChannelMessageHandler_handle_peer_storage_retrieval(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `shutdown` message from the given peer.
	 */
	public void handle_shutdown(byte[] their_node_id, org.ldk.structs.Shutdown msg) {
		bindings.ChannelMessageHandler_handle_shutdown(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `closing_signed` message from the given peer.
	 */
	public void handle_closing_signed(byte[] their_node_id, org.ldk.structs.ClosingSigned msg) {
		bindings.ChannelMessageHandler_handle_closing_signed(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `stfu` message from the given peer.
	 */
	public void handle_stfu(byte[] their_node_id, org.ldk.structs.Stfu msg) {
		bindings.ChannelMessageHandler_handle_stfu(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `splice_init` message from the given peer.
	 */
	public void handle_splice_init(byte[] their_node_id, org.ldk.structs.SpliceInit msg) {
		bindings.ChannelMessageHandler_handle_splice_init(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `splice_ack` message from the given peer.
	 */
	public void handle_splice_ack(byte[] their_node_id, org.ldk.structs.SpliceAck msg) {
		bindings.ChannelMessageHandler_handle_splice_ack(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `splice_locked` message from the given peer.
	 */
	public void handle_splice_locked(byte[] their_node_id, org.ldk.structs.SpliceLocked msg) {
		bindings.ChannelMessageHandler_handle_splice_locked(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `tx_add_input message` from the given peer.
	 */
	public void handle_tx_add_input(byte[] their_node_id, org.ldk.structs.TxAddInput msg) {
		bindings.ChannelMessageHandler_handle_tx_add_input(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `tx_add_output` message from the given peer.
	 */
	public void handle_tx_add_output(byte[] their_node_id, org.ldk.structs.TxAddOutput msg) {
		bindings.ChannelMessageHandler_handle_tx_add_output(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `tx_remove_input` message from the given peer.
	 */
	public void handle_tx_remove_input(byte[] their_node_id, org.ldk.structs.TxRemoveInput msg) {
		bindings.ChannelMessageHandler_handle_tx_remove_input(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `tx_remove_output` message from the given peer.
	 */
	public void handle_tx_remove_output(byte[] their_node_id, org.ldk.structs.TxRemoveOutput msg) {
		bindings.ChannelMessageHandler_handle_tx_remove_output(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `tx_complete message` from the given peer.
	 */
	public void handle_tx_complete(byte[] their_node_id, org.ldk.structs.TxComplete msg) {
		bindings.ChannelMessageHandler_handle_tx_complete(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `tx_signatures` message from the given peer.
	 */
	public void handle_tx_signatures(byte[] their_node_id, org.ldk.structs.TxSignatures msg) {
		bindings.ChannelMessageHandler_handle_tx_signatures(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `tx_init_rbf` message from the given peer.
	 */
	public void handle_tx_init_rbf(byte[] their_node_id, org.ldk.structs.TxInitRbf msg) {
		bindings.ChannelMessageHandler_handle_tx_init_rbf(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `tx_ack_rbf` message from the given peer.
	 */
	public void handle_tx_ack_rbf(byte[] their_node_id, org.ldk.structs.TxAckRbf msg) {
		bindings.ChannelMessageHandler_handle_tx_ack_rbf(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `tx_abort message` from the given peer.
	 */
	public void handle_tx_abort(byte[] their_node_id, org.ldk.structs.TxAbort msg) {
		bindings.ChannelMessageHandler_handle_tx_abort(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `update_add_htlc` message from the given peer.
	 */
	public void handle_update_add_htlc(byte[] their_node_id, org.ldk.structs.UpdateAddHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_add_htlc(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `update_fulfill_htlc` message from the given peer.
	 */
	public void handle_update_fulfill_htlc(byte[] their_node_id, org.ldk.structs.UpdateFulfillHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fulfill_htlc(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `update_fail_htlc` message from the given peer.
	 */
	public void handle_update_fail_htlc(byte[] their_node_id, org.ldk.structs.UpdateFailHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_htlc(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `update_fail_malformed_htlc` message from the given peer.
	 */
	public void handle_update_fail_malformed_htlc(byte[] their_node_id, org.ldk.structs.UpdateFailMalformedHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_malformed_htlc(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `commitment_signed` message from the given peer.
	 */
	public void handle_commitment_signed(byte[] their_node_id, org.ldk.structs.CommitmentSigned msg) {
		bindings.ChannelMessageHandler_handle_commitment_signed(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle a batch of incoming `commitment_signed` message from the given peer.
	 */
	public void handle_commitment_signed_batch(byte[] their_node_id, org.ldk.structs.ChannelId channel_id, CommitmentSigned[] batch) {
		bindings.ChannelMessageHandler_handle_commitment_signed_batch(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), channel_id.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(batch, batch_conv_18 => batch_conv_18.ptr)));
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(batch);
	}

	/**
	 * Handle an incoming `revoke_and_ack` message from the given peer.
	 */
	public void handle_revoke_and_ack(byte[] their_node_id, org.ldk.structs.RevokeAndACK msg) {
		bindings.ChannelMessageHandler_handle_revoke_and_ack(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `update_fee` message from the given peer.
	 */
	public void handle_update_fee(byte[] their_node_id, org.ldk.structs.UpdateFee msg) {
		bindings.ChannelMessageHandler_handle_update_fee(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `announcement_signatures` message from the given peer.
	 */
	public void handle_announcement_signatures(byte[] their_node_id, org.ldk.structs.AnnouncementSignatures msg) {
		bindings.ChannelMessageHandler_handle_announcement_signatures(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `channel_reestablish` message from the given peer.
	 */
	public void handle_channel_reestablish(byte[] their_node_id, org.ldk.structs.ChannelReestablish msg) {
		bindings.ChannelMessageHandler_handle_channel_reestablish(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `channel_update` message from the given peer.
	 */
	public void handle_channel_update(byte[] their_node_id, org.ldk.structs.ChannelUpdate msg) {
		bindings.ChannelMessageHandler_handle_channel_update(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Handle an incoming `error` message from the given peer.
	 */
	public void handle_error(byte[] their_node_id, org.ldk.structs.ErrorMessage msg) {
		bindings.ChannelMessageHandler_handle_error(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Gets the chain hashes for this `ChannelMessageHandler` indicating which chains it supports.
	 * 
	 * If it's `None`, then no particular network chain hash compatibility will be enforced when
	 * connecting to peers.
	 */
	public org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ get_chain_hashes() {
		long ret = bindings.ChannelMessageHandler_get_chain_hashes(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ ret_hu_conv = org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Indicates that a message was received from any peer for any handler.
	 * Called before the message is passed to the appropriate handler.
	 * Useful for indicating that a network connection is active.
	 * 
	 * Note: Since this function is called frequently, it should be as
	 * efficient as possible for its intended purpose.
	 */
	public void message_received() {
		bindings.ChannelMessageHandler_message_received(this.ptr);
		GC.KeepAlive(this);
	}

}
} } }
