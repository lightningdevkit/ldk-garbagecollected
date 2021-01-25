
const path = require('path').join(__dirname, 'bindings.wasm');
const bytes = require('fs').readFileSync(path);
let imports = {};
// add all exports to dictionary and move down?
// use `module.exports`?
// imports['./bindings.js'] = require('./bindings.js');

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
// module.exports = wasmInstance.exports;
const wasm = wasmInstance.exports;

export class VecOrSliceDef {
    public dataptr: number;
    public datalen: number;
    public stride: number;
    public constructor(dataptr: number, datalen: number, stride: number) {
        this.dataptr = dataptr;
        this.datalen = datalen;
        this.stride = stride;
    }
}

/*
TODO: load WASM file
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
*/

	public static native long LDKCVec_u8Z_new(number[] elems);
	public static native long LDKC2Tuple_u64u64Z_new(number a, number b);
	public static native number LDKC2Tuple_u64u64Z_get_a(long ptr);
	public static native number LDKC2Tuple_u64u64Z_get_b(long ptr);
	public static class LDKSpendableOutputDescriptor {
		private LDKSpendableOutputDescriptor() {}
		export class StaticOutput extends LDKSpendableOutputDescriptor {
			public number outpoint;
			public number output;
			StaticOutput(number outpoint, number output) { this.outpoint = outpoint; this.output = output; }
		}
		export class DynamicOutputP2WSH extends LDKSpendableOutputDescriptor {
			public number outpoint;
			public Uint8Array per_commitment_point;
			public number to_self_delay;
			public number output;
			public number key_derivation_params;
			public Uint8Array revocation_pubkey;
			DynamicOutputP2WSH(number outpoint, Uint8Array per_commitment_point, number to_self_delay, number output, number key_derivation_params, Uint8Array revocation_pubkey) { this.outpoint = outpoint; this.per_commitment_point = per_commitment_point; this.to_self_delay = to_self_delay; this.output = output; this.key_derivation_params = key_derivation_params; this.revocation_pubkey = revocation_pubkey; }
		}
		export class StaticOutputCounterpartyPayment extends LDKSpendableOutputDescriptor {
			public number outpoint;
			public number output;
			public number key_derivation_params;
			StaticOutputCounterpartyPayment(number outpoint, number output, number key_derivation_params) { this.outpoint = outpoint; this.output = output; this.key_derivation_params = key_derivation_params; }
		}
		static native void init();
	}
	static { LDKSpendableOutputDescriptor.init(); }
	public static native LDKSpendableOutputDescriptor LDKSpendableOutputDescriptor_ref_from_ptr(long ptr);
	public static native long LDKCVec_SpendableOutputDescriptorZ_new(number[] elems);
	public static class LDKErrorAction {
		private LDKErrorAction() {}
		export class DisconnectPeer extends LDKErrorAction {
			public number msg;
			DisconnectPeer(number msg) { this.msg = msg; }
		}
		export class IgnoreError extends LDKErrorAction {
			IgnoreError() { }
		}
		export class SendErrorMessage extends LDKErrorAction {
			public number msg;
			SendErrorMessage(number msg) { this.msg = msg; }
		}
		static native void init();
	}
	static { LDKErrorAction.init(); }
	public static native LDKErrorAction LDKErrorAction_ref_from_ptr(long ptr);
	public static class LDKHTLCFailChannelUpdate {
		private LDKHTLCFailChannelUpdate() {}
		export class ChannelUpdateMessage extends LDKHTLCFailChannelUpdate {
			public number msg;
			ChannelUpdateMessage(number msg) { this.msg = msg; }
		}
		export class ChannelClosed extends LDKHTLCFailChannelUpdate {
			public number short_channel_id;
			public boolean is_permanent;
			ChannelClosed(number short_channel_id, boolean is_permanent) { this.short_channel_id = short_channel_id; this.is_permanent = is_permanent; }
		}
		export class NodeFailure extends LDKHTLCFailChannelUpdate {
			public Uint8Array node_id;
			public boolean is_permanent;
			NodeFailure(Uint8Array node_id, boolean is_permanent) { this.node_id = node_id; this.is_permanent = is_permanent; }
		}
		static native void init();
	}
	static { LDKHTLCFailChannelUpdate.init(); }
	public static native LDKHTLCFailChannelUpdate LDKHTLCFailChannelUpdate_ref_from_ptr(long ptr);
	public static class LDKMessageSendEvent {
		private LDKMessageSendEvent() {}
		export class SendAcceptChannel extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendAcceptChannel(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class SendOpenChannel extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendOpenChannel(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class SendFundingCreated extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendFundingCreated(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class SendFundingSigned extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendFundingSigned(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class SendFundingLocked extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendFundingLocked(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class SendAnnouncementSignatures extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendAnnouncementSignatures(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class UpdateHTLCs extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number updates;
			UpdateHTLCs(Uint8Array node_id, number updates) { this.node_id = node_id; this.updates = updates; }
		}
		export class SendRevokeAndACK extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendRevokeAndACK(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class SendClosingSigned extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendClosingSigned(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class SendShutdown extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendShutdown(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class SendChannelReestablish extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendChannelReestablish(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class BroadcastChannelAnnouncement extends LDKMessageSendEvent {
			public number msg;
			public number update_msg;
			BroadcastChannelAnnouncement(number msg, number update_msg) { this.msg = msg; this.update_msg = update_msg; }
		}
		export class BroadcastNodeAnnouncement extends LDKMessageSendEvent {
			public number msg;
			BroadcastNodeAnnouncement(number msg) { this.msg = msg; }
		}
		export class BroadcastChannelUpdate extends LDKMessageSendEvent {
			public number msg;
			BroadcastChannelUpdate(number msg) { this.msg = msg; }
		}
		export class HandleError extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number action;
			HandleError(Uint8Array node_id, number action) { this.node_id = node_id; this.action = action; }
		}
		export class PaymentFailureNetworkUpdate extends LDKMessageSendEvent {
			public number update;
			PaymentFailureNetworkUpdate(number update) { this.update = update; }
		}
		export class SendChannelRangeQuery extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendChannelRangeQuery(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class SendShortIdsQuery extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendShortIdsQuery(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		static native void init();
	}
	static { LDKMessageSendEvent.init(); }
	public static native LDKMessageSendEvent LDKMessageSendEvent_ref_from_ptr(long ptr);
	public static native long LDKCVec_MessageSendEventZ_new(number[] elems);
	public static class LDKEvent {
		private LDKEvent() {}
		export class FundingGenerationReady extends LDKEvent {
			public Uint8Array temporary_channel_id;
			public number channel_value_satoshis;
			public Uint8Array output_script;
			public number user_channel_id;
			FundingGenerationReady(Uint8Array temporary_channel_id, number channel_value_satoshis, Uint8Array output_script, number user_channel_id) { this.temporary_channel_id = temporary_channel_id; this.channel_value_satoshis = channel_value_satoshis; this.output_script = output_script; this.user_channel_id = user_channel_id; }
		}
		export class FundingBroadcastSafe extends LDKEvent {
			public number funding_txo;
			public number user_channel_id;
			FundingBroadcastSafe(number funding_txo, number user_channel_id) { this.funding_txo = funding_txo; this.user_channel_id = user_channel_id; }
		}
		export class PaymentReceived extends LDKEvent {
			public Uint8Array payment_hash;
			public Uint8Array payment_secret;
			public number amt;
			PaymentReceived(Uint8Array payment_hash, Uint8Array payment_secret, number amt) { this.payment_hash = payment_hash; this.payment_secret = payment_secret; this.amt = amt; }
		}
		export class PaymentSent extends LDKEvent {
			public Uint8Array payment_preimage;
			PaymentSent(Uint8Array payment_preimage) { this.payment_preimage = payment_preimage; }
		}
		export class PaymentFailed extends LDKEvent {
			public Uint8Array payment_hash;
			public boolean rejected_by_dest;
			PaymentFailed(Uint8Array payment_hash, boolean rejected_by_dest) { this.payment_hash = payment_hash; this.rejected_by_dest = rejected_by_dest; }
		}
		export class PendingHTLCsForwardable extends LDKEvent {
			public number time_forwardable;
			PendingHTLCsForwardable(number time_forwardable) { this.time_forwardable = time_forwardable; }
		}
		export class SpendableOutputs extends LDKEvent {
			public number[] outputs;
			SpendableOutputs(number[] outputs) { this.outputs = outputs; }
		}
		static native void init();
	}
	static { LDKEvent.init(); }
	public static native LDKEvent LDKEvent_ref_from_ptr(long ptr);
	public static native long LDKCVec_EventZ_new(number[] elems);
	public static native long LDKC2Tuple_usizeTransactionZ_new(number a, Uint8Array b);
	public static native number LDKC2Tuple_usizeTransactionZ_get_a(long ptr);
	public static native Uint8Array LDKC2Tuple_usizeTransactionZ_get_b(long ptr);
	public static native long LDKCVec_C2Tuple_usizeTransactionZZ_new(number[] elems);
	public static native boolean LDKCResult_NoneChannelMonitorUpdateErrZ_result_ok(long arg);
	public static native void LDKCResult_NoneChannelMonitorUpdateErrZ_get_ok(long arg);
	public static native LDKChannelMonitorUpdateErr LDKCResult_NoneChannelMonitorUpdateErrZ_get_err(long arg);
	public static native long LDKCVec_MonitorEventZ_new(number[] elems);
	public static native boolean LDKCResult_ChannelMonitorUpdateDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelMonitorUpdateDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelMonitorUpdateDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NoneMonitorUpdateErrorZ_result_ok(long arg);
	public static native void LDKCResult_NoneMonitorUpdateErrorZ_get_ok(long arg);
	public static native number LDKCResult_NoneMonitorUpdateErrorZ_get_err(long arg);
	public static native long LDKC2Tuple_OutPointScriptZ_new(number a, Uint8Array b);
	public static native number LDKC2Tuple_OutPointScriptZ_get_a(long ptr);
	public static native Uint8Array LDKC2Tuple_OutPointScriptZ_get_b(long ptr);
	public static native long LDKC2Tuple_u32TxOutZ_new(number a, number b);
	public static native number LDKC2Tuple_u32TxOutZ_get_a(long ptr);
	public static native number LDKC2Tuple_u32TxOutZ_get_b(long ptr);
	public static native long LDKCVec_C2Tuple_u32TxOutZZ_new(number[] elems);
	public static native long LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(Uint8Array a, number[] b);
	public static native Uint8Array LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(long ptr);
	public static native number[] LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(long ptr);
	public static native long LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_new(number[] elems);
	public static native long LDKC2Tuple_SignatureCVec_SignatureZZ_new(Uint8Array a, Uint8Array[] b);
	public static native Uint8Array LDKC2Tuple_SignatureCVec_SignatureZZ_get_a(long ptr);
	public static native Uint8Array[] LDKC2Tuple_SignatureCVec_SignatureZZ_get_b(long ptr);
	public static native boolean LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_result_ok(long arg);
	public static native number LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_ok(long arg);
	public static native void LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_err(long arg);
	public static native boolean LDKCResult_SignatureNoneZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_SignatureNoneZ_get_ok(long arg);
	public static native void LDKCResult_SignatureNoneZ_get_err(long arg);
	public static native boolean LDKCResult_CVec_SignatureZNoneZ_result_ok(long arg);
	public static native Uint8Array[] LDKCResult_CVec_SignatureZNoneZ_get_ok(long arg);
	public static native void LDKCResult_CVec_SignatureZNoneZ_get_err(long arg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKChannelKeys {
			get_per_commitment_point (idx: number): Uint8Array;
			release_commitment_secret (idx: number): Uint8Array;
			key_derivation_params (): number;
			sign_counterparty_commitment (commitment_tx: number): number;
			sign_holder_commitment (commitment_tx: number): number;
			sign_holder_commitment_htlc_transactions (commitment_tx: number): number;
			sign_justice_transaction (justice_tx: Uint8Array, input: number, amount: number, per_commitment_key: Uint8Array, htlc: number): number;
			sign_counterparty_htlc_transaction (htlc_tx: Uint8Array, input: number, amount: number, per_commitment_point: Uint8Array, htlc: number): number;
			sign_closing_transaction (closing_tx: Uint8Array): number;
			sign_channel_announcement (msg: number): number;
			ready_channel (channel_parameters: number): void;
			write (): Uint8Array;
		}

		export function LDKChannelKeys_new(impl: LDKChannelKeys, pubkeys: number): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKPublicKey ChannelKeys_get_per_commitment_point LDKChannelKeys* this_arg, uint64_t idx
	public static native Uint8Array ChannelKeys_get_per_commitment_point(number this_arg, number idx);
	// LDKThirtyTwoBytes ChannelKeys_release_commitment_secret LDKChannelKeys* this_arg, uint64_t idx
	public static native Uint8Array ChannelKeys_release_commitment_secret(number this_arg, number idx);
	// LDKC2Tuple_u64u64Z ChannelKeys_key_derivation_params LDKChannelKeys* this_arg
	public static native number ChannelKeys_key_derivation_params(number this_arg);
	// LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ ChannelKeys_sign_counterparty_commitment LDKChannelKeys* this_arg, const struct LDKCommitmentTransaction *NONNULL_PTR commitment_tx
	public static native number ChannelKeys_sign_counterparty_commitment(number this_arg, number commitment_tx);
	// LDKCResult_SignatureNoneZ ChannelKeys_sign_holder_commitment LDKChannelKeys* this_arg, const struct LDKHolderCommitmentTransaction *NONNULL_PTR commitment_tx
	public static native number ChannelKeys_sign_holder_commitment(number this_arg, number commitment_tx);
	// LDKCResult_CVec_SignatureZNoneZ ChannelKeys_sign_holder_commitment_htlc_transactions LDKChannelKeys* this_arg, const struct LDKHolderCommitmentTransaction *NONNULL_PTR commitment_tx
	public static native number ChannelKeys_sign_holder_commitment_htlc_transactions(number this_arg, number commitment_tx);
	// LDKCResult_SignatureNoneZ ChannelKeys_sign_justice_transaction LDKChannelKeys* this_arg, struct LDKTransaction justice_tx, uintptr_t input, uint64_t amount, const uint8_t (*per_commitment_key)[32], const struct LDKHTLCOutputInCommitment *NONNULL_PTR htlc
	public static native number ChannelKeys_sign_justice_transaction(number this_arg, Uint8Array justice_tx, number input, number amount, Uint8Array per_commitment_key, number htlc);
	// LDKCResult_SignatureNoneZ ChannelKeys_sign_counterparty_htlc_transaction LDKChannelKeys* this_arg, struct LDKTransaction htlc_tx, uintptr_t input, uint64_t amount, struct LDKPublicKey per_commitment_point, const struct LDKHTLCOutputInCommitment *NONNULL_PTR htlc
	public static native number ChannelKeys_sign_counterparty_htlc_transaction(number this_arg, Uint8Array htlc_tx, number input, number amount, Uint8Array per_commitment_point, number htlc);
	// LDKCResult_SignatureNoneZ ChannelKeys_sign_closing_transaction LDKChannelKeys* this_arg, struct LDKTransaction closing_tx
	public static native number ChannelKeys_sign_closing_transaction(number this_arg, Uint8Array closing_tx);
	// LDKCResult_SignatureNoneZ ChannelKeys_sign_channel_announcement LDKChannelKeys* this_arg, const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR msg
	public static native number ChannelKeys_sign_channel_announcement(number this_arg, number msg);
	// void ChannelKeys_ready_channel LDKChannelKeys* this_arg, const struct LDKChannelTransactionParameters *NONNULL_PTR channel_parameters
	public static native void ChannelKeys_ready_channel(number this_arg, number channel_parameters);
	// LDKCVec_u8Z ChannelKeys_write LDKChannelKeys* this_arg
	public static native Uint8Array ChannelKeys_write(number this_arg);
	// LDKChannelPublicKeys ChannelKeys_get_pubkeys LDKChannelKeys* this_arg
	public static native number ChannelKeys_get_pubkeys(number this_arg);
	public static native long LDKC2Tuple_BlockHashChannelMonitorZ_new(Uint8Array a, number b);
	public static native Uint8Array LDKC2Tuple_BlockHashChannelMonitorZ_get_a(long ptr);
	public static native number LDKC2Tuple_BlockHashChannelMonitorZ_get_b(long ptr);
	public static native boolean LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_SpendableOutputDescriptorDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_SpendableOutputDescriptorDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_SpendableOutputDescriptorDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChanKeySignerDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChanKeySignerDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChanKeySignerDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_InMemoryChannelKeysDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_InMemoryChannelKeysDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_InMemoryChannelKeysDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_TxOutAccessErrorZ_result_ok(long arg);
	public static native number LDKCResult_TxOutAccessErrorZ_get_ok(long arg);
	public static native LDKAccessError LDKCResult_TxOutAccessErrorZ_get_err(long arg);
	public static class LDKAPIError {
		private LDKAPIError() {}
		export class APIMisuseError extends LDKAPIError {
			public Uint8Array err;
			APIMisuseError(Uint8Array err) { this.err = err; }
		}
		export class FeeRateTooHigh extends LDKAPIError {
			public Uint8Array err;
			public number feerate;
			FeeRateTooHigh(Uint8Array err, number feerate) { this.err = err; this.feerate = feerate; }
		}
		export class RouteError extends LDKAPIError {
			public String err;
			RouteError(String err) { this.err = err; }
		}
		export class ChannelUnavailable extends LDKAPIError {
			public Uint8Array err;
			ChannelUnavailable(Uint8Array err) { this.err = err; }
		}
		export class MonitorUpdateFailed extends LDKAPIError {
			MonitorUpdateFailed() { }
		}
		static native void init();
	}
	static { LDKAPIError.init(); }
	public static native LDKAPIError LDKAPIError_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_NoneAPIErrorZ_result_ok(long arg);
	public static native void LDKCResult_NoneAPIErrorZ_get_ok(long arg);
	public static native number LDKCResult_NoneAPIErrorZ_get_err(long arg);
	public static native long LDKCVec_ChannelDetailsZ_new(number[] elems);
	public static native boolean LDKCResult_NonePaymentSendFailureZ_result_ok(long arg);
	public static native void LDKCResult_NonePaymentSendFailureZ_get_ok(long arg);
	public static native number LDKCResult_NonePaymentSendFailureZ_get_err(long arg);
	public static class LDKNetAddress {
		private LDKNetAddress() {}
		export class IPv4 extends LDKNetAddress {
			public Uint8Array addr;
			public number port;
			IPv4(Uint8Array addr, number port) { this.addr = addr; this.port = port; }
		}
		export class IPv6 extends LDKNetAddress {
			public Uint8Array addr;
			public number port;
			IPv6(Uint8Array addr, number port) { this.addr = addr; this.port = port; }
		}
		export class OnionV2 extends LDKNetAddress {
			public Uint8Array addr;
			public number port;
			OnionV2(Uint8Array addr, number port) { this.addr = addr; this.port = port; }
		}
		export class OnionV3 extends LDKNetAddress {
			public Uint8Array ed25519_pubkey;
			public number checksum;
			public number version;
			public number port;
			OnionV3(Uint8Array ed25519_pubkey, number checksum, number version, number port) { this.ed25519_pubkey = ed25519_pubkey; this.checksum = checksum; this.version = version; this.port = port; }
		}
		static native void init();
	}
	static { LDKNetAddress.init(); }
	public static native LDKNetAddress LDKNetAddress_ref_from_ptr(long ptr);
	public static native long LDKCVec_NetAddressZ_new(number[] elems);
	public static native long LDKCVec_ChannelMonitorZ_new(number[] elems);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKWatch {
			watch_channel (funding_txo: number, monitor: number): number;
			update_channel (funding_txo: number, update: number): number;
			release_pending_monitor_events (): number[];
		}

		export function LDKWatch_new(impl: LDKWatch): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCResult_NoneChannelMonitorUpdateErrZ Watch_watch_channel LDKWatch* this_arg, struct LDKOutPoint funding_txo, struct LDKChannelMonitor monitor
	public static native number Watch_watch_channel(number this_arg, number funding_txo, number monitor);
	// LDKCResult_NoneChannelMonitorUpdateErrZ Watch_update_channel LDKWatch* this_arg, struct LDKOutPoint funding_txo, struct LDKChannelMonitorUpdate update
	public static native number Watch_update_channel(number this_arg, number funding_txo, number update);
	// LDKCVec_MonitorEventZ Watch_release_pending_monitor_events LDKWatch* this_arg
	public static native number[] Watch_release_pending_monitor_events(number this_arg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKBroadcasterInterface {
			broadcast_transaction (tx: Uint8Array): void;
		}

		export function LDKBroadcasterInterface_new(impl: LDKBroadcasterInterface): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// void BroadcasterInterface_broadcast_transaction LDKBroadcasterInterface* this_arg, struct LDKTransaction tx
	public static native void BroadcasterInterface_broadcast_transaction(number this_arg, Uint8Array tx);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKKeysInterface {
			get_node_secret (): Uint8Array;
			get_destination_script (): Uint8Array;
			get_shutdown_pubkey (): Uint8Array;
			get_channel_keys (inbound: boolean, channel_value_satoshis: number): number;
			get_secure_random_bytes (): Uint8Array;
			read_chan_signer (reader: Uint8Array): number;
		}

		export function LDKKeysInterface_new(impl: LDKKeysInterface): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKSecretKey KeysInterface_get_node_secret LDKKeysInterface* this_arg
	public static native Uint8Array KeysInterface_get_node_secret(number this_arg);
	// LDKCVec_u8Z KeysInterface_get_destination_script LDKKeysInterface* this_arg
	public static native Uint8Array KeysInterface_get_destination_script(number this_arg);
	// LDKPublicKey KeysInterface_get_shutdown_pubkey LDKKeysInterface* this_arg
	public static native Uint8Array KeysInterface_get_shutdown_pubkey(number this_arg);
	// LDKChannelKeys KeysInterface_get_channel_keys LDKKeysInterface* this_arg, bool inbound, uint64_t channel_value_satoshis
	public static native number KeysInterface_get_channel_keys(number this_arg, boolean inbound, number channel_value_satoshis);
	// LDKThirtyTwoBytes KeysInterface_get_secure_random_bytes LDKKeysInterface* this_arg
	public static native Uint8Array KeysInterface_get_secure_random_bytes(number this_arg);
	// LDKCResult_ChanKeySignerDecodeErrorZ KeysInterface_read_chan_signer LDKKeysInterface* this_arg, struct LDKu8slice reader
	public static native number KeysInterface_read_chan_signer(number this_arg, Uint8Array reader);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKFeeEstimator {
			get_est_sat_per_1000_weight (confirmation_target: LDKConfirmationTarget): number;
		}

		export function LDKFeeEstimator_new(impl: LDKFeeEstimator): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// uint32_t FeeEstimator_get_est_sat_per_1000_weight LDKFeeEstimator* this_arg, enum LDKConfirmationTarget confirmation_target
	public static native number FeeEstimator_get_est_sat_per_1000_weight(number this_arg, LDKConfirmationTarget confirmation_target);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKLogger {
			log (record: String): void;
		}

		export function LDKLogger_new(impl: LDKLogger): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	public static native long LDKC2Tuple_BlockHashChannelManagerZ_new(Uint8Array a, number b);
	public static native Uint8Array LDKC2Tuple_BlockHashChannelManagerZ_get_a(long ptr);
	public static native number LDKC2Tuple_BlockHashChannelManagerZ_get_b(long ptr);
	public static native boolean LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NetAddressu8Z_result_ok(long arg);
	public static native number LDKCResult_NetAddressu8Z_get_ok(long arg);
	public static native number LDKCResult_NetAddressu8Z_get_err(long arg);
	public static native boolean LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_get_err(long arg);
	public static native long LDKCVec_u64Z_new(number[] elems);
	public static native long LDKCVec_UpdateAddHTLCZ_new(number[] elems);
	public static native long LDKCVec_UpdateFulfillHTLCZ_new(number[] elems);
	public static native long LDKCVec_UpdateFailHTLCZ_new(number[] elems);
	public static native long LDKCVec_UpdateFailMalformedHTLCZ_new(number[] elems);
	public static native boolean LDKCResult_boolLightningErrorZ_result_ok(long arg);
	public static native boolean LDKCResult_boolLightningErrorZ_get_ok(long arg);
	public static native number LDKCResult_boolLightningErrorZ_get_err(long arg);
	public static native long LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(number a, number b, number c);
	public static native number LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(long ptr);
	public static native number LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(long ptr);
	public static native number LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(long ptr);
	public static native long LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_new(number[] elems);
	public static native long LDKCVec_NodeAnnouncementZ_new(number[] elems);
	public static native boolean LDKCResult_NoneLightningErrorZ_result_ok(long arg);
	public static native void LDKCResult_NoneLightningErrorZ_get_ok(long arg);
	public static native number LDKCResult_NoneLightningErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChannelReestablishDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelReestablishDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelReestablishDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_InitDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_InitDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_InitDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_PingDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_PingDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_PingDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_PongDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_PongDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_PongDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UnsignedChannelUpdateDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UnsignedChannelUpdateDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UnsignedChannelUpdateDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ErrorMessageDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ErrorMessageDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ErrorMessageDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_QueryShortChannelIdsDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_QueryShortChannelIdsDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_QueryShortChannelIdsDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_QueryChannelRangeDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_QueryChannelRangeDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_QueryChannelRangeDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ReplyChannelRangeDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ReplyChannelRangeDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ReplyChannelRangeDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_GossipTimestampFilterDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_GossipTimestampFilterDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_GossipTimestampFilterDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_CVec_u8ZPeerHandleErrorZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_CVec_u8ZPeerHandleErrorZ_get_ok(long arg);
	public static native number LDKCResult_CVec_u8ZPeerHandleErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NonePeerHandleErrorZ_result_ok(long arg);
	public static native void LDKCResult_NonePeerHandleErrorZ_get_ok(long arg);
	public static native number LDKCResult_NonePeerHandleErrorZ_get_err(long arg);
	public static native boolean LDKCResult_boolPeerHandleErrorZ_result_ok(long arg);
	public static native boolean LDKCResult_boolPeerHandleErrorZ_get_ok(long arg);
	public static native number LDKCResult_boolPeerHandleErrorZ_get_err(long arg);
	public static native boolean LDKCResult_SecretKeySecpErrorZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_SecretKeySecpErrorZ_get_ok(long arg);
	public static native LDKSecp256k1Error LDKCResult_SecretKeySecpErrorZ_get_err(long arg);
	public static native boolean LDKCResult_PublicKeySecpErrorZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_PublicKeySecpErrorZ_get_ok(long arg);
	public static native LDKSecp256k1Error LDKCResult_PublicKeySecpErrorZ_get_err(long arg);
	public static native boolean LDKCResult_TxCreationKeysSecpErrorZ_result_ok(long arg);
	public static native number LDKCResult_TxCreationKeysSecpErrorZ_get_ok(long arg);
	public static native LDKSecp256k1Error LDKCResult_TxCreationKeysSecpErrorZ_get_err(long arg);
	public static native boolean LDKCResult_TrustedCommitmentTransactionNoneZ_result_ok(long arg);
	public static native number LDKCResult_TrustedCommitmentTransactionNoneZ_get_ok(long arg);
	public static native void LDKCResult_TrustedCommitmentTransactionNoneZ_get_err(long arg);
	public static native long LDKCVec_RouteHopZ_new(number[] elems);
	public static native boolean LDKCResult_RouteDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_RouteDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_RouteDecodeErrorZ_get_err(long arg);
	public static native long LDKCVec_RouteHintZ_new(number[] elems);
	public static native boolean LDKCResult_RouteLightningErrorZ_result_ok(long arg);
	public static native number LDKCResult_RouteLightningErrorZ_get_ok(long arg);
	public static native number LDKCResult_RouteLightningErrorZ_get_err(long arg);
	public static native boolean LDKCResult_RoutingFeesDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_RoutingFeesDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_RoutingFeesDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NodeAnnouncementInfoDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_NodeAnnouncementInfoDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_NodeAnnouncementInfoDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NodeInfoDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_NodeInfoDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_NodeInfoDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NetworkGraphDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_NetworkGraphDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_NetworkGraphDecodeErrorZ_get_err(long arg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKMessageSendEventsProvider {
			get_and_clear_pending_msg_events (): number[];
		}

		export function LDKMessageSendEventsProvider_new(impl: LDKMessageSendEventsProvider): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCVec_MessageSendEventZ MessageSendEventsProvider_get_and_clear_pending_msg_events LDKMessageSendEventsProvider* this_arg
	public static native number[] MessageSendEventsProvider_get_and_clear_pending_msg_events(number this_arg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKEventsProvider {
			get_and_clear_pending_events (): number[];
		}

		export function LDKEventsProvider_new(impl: LDKEventsProvider): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCVec_EventZ EventsProvider_get_and_clear_pending_events LDKEventsProvider* this_arg
	public static native number[] EventsProvider_get_and_clear_pending_events(number this_arg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKAccess {
			get_utxo (genesis_hash: Uint8Array, short_channel_id: number): number;
		}

		export function LDKAccess_new(impl: LDKAccess): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCResult_TxOutAccessErrorZ Access_get_utxo LDKAccess* this_arg, const uint8_t (*genesis_hash)[32], uint64_t short_channel_id
	public static native number Access_get_utxo(number this_arg, Uint8Array genesis_hash, number short_channel_id);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKFilter {
			register_tx (txid: Uint8Array, script_pubkey: Uint8Array): void;
			register_output (outpoint: number, script_pubkey: Uint8Array): void;
		}

		export function LDKFilter_new(impl: LDKFilter): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// void Filter_register_tx LDKFilter* this_arg, const uint8_t (*txid)[32], struct LDKu8slice script_pubkey
	public static native void Filter_register_tx(number this_arg, Uint8Array txid, Uint8Array script_pubkey);
	// void Filter_register_output LDKFilter* this_arg, const struct LDKOutPoint *NONNULL_PTR outpoint, struct LDKu8slice script_pubkey
	public static native void Filter_register_output(number this_arg, number outpoint, Uint8Array script_pubkey);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKPersist {
			persist_new_channel (id: number, data: number): number;
			update_persisted_channel (id: number, update: number, data: number): number;
		}

		export function LDKPersist_new(impl: LDKPersist): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCResult_NoneChannelMonitorUpdateErrZ Persist_persist_new_channel LDKPersist* this_arg, struct LDKOutPoint id, const struct LDKChannelMonitor *NONNULL_PTR data
	public static native number Persist_persist_new_channel(number this_arg, number id, number data);
	// LDKCResult_NoneChannelMonitorUpdateErrZ Persist_update_persisted_channel LDKPersist* this_arg, struct LDKOutPoint id, const struct LDKChannelMonitorUpdate *NONNULL_PTR update, const struct LDKChannelMonitor *NONNULL_PTR data
	public static native number Persist_update_persisted_channel(number this_arg, number id, number update, number data);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKChannelMessageHandler {
			handle_open_channel (their_node_id: Uint8Array, their_features: number, msg: number): void;
			handle_accept_channel (their_node_id: Uint8Array, their_features: number, msg: number): void;
			handle_funding_created (their_node_id: Uint8Array, msg: number): void;
			handle_funding_signed (their_node_id: Uint8Array, msg: number): void;
			handle_funding_locked (their_node_id: Uint8Array, msg: number): void;
			handle_shutdown (their_node_id: Uint8Array, msg: number): void;
			handle_closing_signed (their_node_id: Uint8Array, msg: number): void;
			handle_update_add_htlc (their_node_id: Uint8Array, msg: number): void;
			handle_update_fulfill_htlc (their_node_id: Uint8Array, msg: number): void;
			handle_update_fail_htlc (their_node_id: Uint8Array, msg: number): void;
			handle_update_fail_malformed_htlc (their_node_id: Uint8Array, msg: number): void;
			handle_commitment_signed (their_node_id: Uint8Array, msg: number): void;
			handle_revoke_and_ack (their_node_id: Uint8Array, msg: number): void;
			handle_update_fee (their_node_id: Uint8Array, msg: number): void;
			handle_announcement_signatures (their_node_id: Uint8Array, msg: number): void;
			peer_disconnected (their_node_id: Uint8Array, no_connection_possible: boolean): void;
			peer_connected (their_node_id: Uint8Array, msg: number): void;
			handle_channel_reestablish (their_node_id: Uint8Array, msg: number): void;
			handle_error (their_node_id: Uint8Array, msg: number): void;
		}

		export function LDKChannelMessageHandler_new(impl: LDKChannelMessageHandler, MessageSendEventsProvider: LDKMessageSendEventsProvider): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// void ChannelMessageHandler_handle_open_channel LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, struct LDKInitFeatures their_features, const struct LDKOpenChannel *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_open_channel(number this_arg, Uint8Array their_node_id, number their_features, number msg);
	// void ChannelMessageHandler_handle_accept_channel LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, struct LDKInitFeatures their_features, const struct LDKAcceptChannel *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_accept_channel(number this_arg, Uint8Array their_node_id, number their_features, number msg);
	// void ChannelMessageHandler_handle_funding_created LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKFundingCreated *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_funding_created(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_funding_signed LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKFundingSigned *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_funding_signed(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_funding_locked LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKFundingLocked *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_funding_locked(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_shutdown LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKShutdown *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_shutdown(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_closing_signed LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKClosingSigned *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_closing_signed(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_update_add_htlc LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKUpdateAddHTLC *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_update_add_htlc(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_update_fulfill_htlc LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKUpdateFulfillHTLC *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_update_fulfill_htlc(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_update_fail_htlc LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKUpdateFailHTLC *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_update_fail_htlc(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_update_fail_malformed_htlc LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_update_fail_malformed_htlc(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_commitment_signed LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKCommitmentSigned *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_commitment_signed(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_revoke_and_ack LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKRevokeAndACK *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_revoke_and_ack(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_update_fee LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKUpdateFee *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_update_fee(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_announcement_signatures LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKAnnouncementSignatures *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_announcement_signatures(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_peer_disconnected LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, bool no_connection_possible
	public static native void ChannelMessageHandler_peer_disconnected(number this_arg, Uint8Array their_node_id, boolean no_connection_possible);
	// void ChannelMessageHandler_peer_connected LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKInit *NONNULL_PTR msg
	public static native void ChannelMessageHandler_peer_connected(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_channel_reestablish LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKChannelReestablish *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_channel_reestablish(number this_arg, Uint8Array their_node_id, number msg);
	// void ChannelMessageHandler_handle_error LDKChannelMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKErrorMessage *NONNULL_PTR msg
	public static native void ChannelMessageHandler_handle_error(number this_arg, Uint8Array their_node_id, number msg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKRoutingMessageHandler {
			handle_node_announcement (msg: number): number;
			handle_channel_announcement (msg: number): number;
			handle_channel_update (msg: number): number;
			handle_htlc_fail_channel_update (update: number): void;
			get_next_channel_announcements (starting_point: number, batch_amount: number): number[];
			get_next_node_announcements (starting_point: Uint8Array, batch_amount: number): number[];
			sync_routing_table (their_node_id: Uint8Array, init: number): void;
			handle_reply_channel_range (their_node_id: Uint8Array, msg: number): number;
			handle_reply_short_channel_ids_end (their_node_id: Uint8Array, msg: number): number;
			handle_query_channel_range (their_node_id: Uint8Array, msg: number): number;
			handle_query_short_channel_ids (their_node_id: Uint8Array, msg: number): number;
		}

		export function LDKRoutingMessageHandler_new(impl: LDKRoutingMessageHandler, MessageSendEventsProvider: LDKMessageSendEventsProvider): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCResult_boolLightningErrorZ RoutingMessageHandler_handle_node_announcement LDKRoutingMessageHandler* this_arg, const struct LDKNodeAnnouncement *NONNULL_PTR msg
	public static native number RoutingMessageHandler_handle_node_announcement(number this_arg, number msg);
	// LDKCResult_boolLightningErrorZ RoutingMessageHandler_handle_channel_announcement LDKRoutingMessageHandler* this_arg, const struct LDKChannelAnnouncement *NONNULL_PTR msg
	public static native number RoutingMessageHandler_handle_channel_announcement(number this_arg, number msg);
	// LDKCResult_boolLightningErrorZ RoutingMessageHandler_handle_channel_update LDKRoutingMessageHandler* this_arg, const struct LDKChannelUpdate *NONNULL_PTR msg
	public static native number RoutingMessageHandler_handle_channel_update(number this_arg, number msg);
	// void RoutingMessageHandler_handle_htlc_fail_channel_update LDKRoutingMessageHandler* this_arg, const struct LDKHTLCFailChannelUpdate *NONNULL_PTR update
	public static native void RoutingMessageHandler_handle_htlc_fail_channel_update(number this_arg, number update);
	// LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ RoutingMessageHandler_get_next_channel_announcements LDKRoutingMessageHandler* this_arg, uint64_t starting_point, uint8_t batch_amount
	public static native number[] RoutingMessageHandler_get_next_channel_announcements(number this_arg, number starting_point, number batch_amount);
	// LDKCVec_NodeAnnouncementZ RoutingMessageHandler_get_next_node_announcements LDKRoutingMessageHandler* this_arg, struct LDKPublicKey starting_point, uint8_t batch_amount
	public static native number[] RoutingMessageHandler_get_next_node_announcements(number this_arg, Uint8Array starting_point, number batch_amount);
	// void RoutingMessageHandler_sync_routing_table LDKRoutingMessageHandler* this_arg, struct LDKPublicKey their_node_id, const struct LDKInit *NONNULL_PTR init
	public static native void RoutingMessageHandler_sync_routing_table(number this_arg, Uint8Array their_node_id, number init);
	// LDKCResult_NoneLightningErrorZ RoutingMessageHandler_handle_reply_channel_range LDKRoutingMessageHandler* this_arg, struct LDKPublicKey their_node_id, struct LDKReplyChannelRange msg
	public static native number RoutingMessageHandler_handle_reply_channel_range(number this_arg, Uint8Array their_node_id, number msg);
	// LDKCResult_NoneLightningErrorZ RoutingMessageHandler_handle_reply_short_channel_ids_end LDKRoutingMessageHandler* this_arg, struct LDKPublicKey their_node_id, struct LDKReplyShortChannelIdsEnd msg
	public static native number RoutingMessageHandler_handle_reply_short_channel_ids_end(number this_arg, Uint8Array their_node_id, number msg);
	// LDKCResult_NoneLightningErrorZ RoutingMessageHandler_handle_query_channel_range LDKRoutingMessageHandler* this_arg, struct LDKPublicKey their_node_id, struct LDKQueryChannelRange msg
	public static native number RoutingMessageHandler_handle_query_channel_range(number this_arg, Uint8Array their_node_id, number msg);
	// LDKCResult_NoneLightningErrorZ RoutingMessageHandler_handle_query_short_channel_ids LDKRoutingMessageHandler* this_arg, struct LDKPublicKey their_node_id, struct LDKQueryShortChannelIds msg
	public static native number RoutingMessageHandler_handle_query_short_channel_ids(number this_arg, Uint8Array their_node_id, number msg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKSocketDescriptor {
			send_data (data: Uint8Array, resume_read: boolean): number;
			disconnect_socket (): void;
			eq (other_arg: number): boolean;
			hash (): number;
		}

		export function LDKSocketDescriptor_new(impl: LDKSocketDescriptor): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// uintptr_t SocketDescriptor_send_data LDKSocketDescriptor* this_arg, struct LDKu8slice data, bool resume_read
	public static native number SocketDescriptor_send_data(number this_arg, Uint8Array data, boolean resume_read);
	// void SocketDescriptor_disconnect_socket LDKSocketDescriptor* this_arg
	public static native void SocketDescriptor_disconnect_socket(number this_arg);
	// uint64_t SocketDescriptor_hash LDKSocketDescriptor* this_arg
	public static native number SocketDescriptor_hash(number this_arg);
	// void Transaction_free(struct LDKTransaction _res);
	public static native void Transaction_free(Uint8Array _res);
	// void TxOut_free(struct LDKTxOut _res);
	public static native void TxOut_free(number _res);
	// void CVec_SpendableOutputDescriptorZ_free(struct LDKCVec_SpendableOutputDescriptorZ _res);
	public static native void CVec_SpendableOutputDescriptorZ_free(number[] _res);
	// void CVec_MessageSendEventZ_free(struct LDKCVec_MessageSendEventZ _res);
	public static native void CVec_MessageSendEventZ_free(number[] _res);
	// void CVec_EventZ_free(struct LDKCVec_EventZ _res);
	public static native void CVec_EventZ_free(number[] _res);
	// void C2Tuple_usizeTransactionZ_free(struct LDKC2Tuple_usizeTransactionZ _res);
	public static native void C2Tuple_usizeTransactionZ_free(number _res);
	// struct LDKC2Tuple_usizeTransactionZ C2Tuple_usizeTransactionZ_new(uintptr_t a, struct LDKTransaction b);
	public static native number C2Tuple_usizeTransactionZ_new(number a, Uint8Array b);
	// void CVec_C2Tuple_usizeTransactionZZ_free(struct LDKCVec_C2Tuple_usizeTransactionZZ _res);
	public static native void CVec_C2Tuple_usizeTransactionZZ_free(number[] _res);
	// struct LDKCResult_NoneChannelMonitorUpdateErrZ CResult_NoneChannelMonitorUpdateErrZ_ok(void);
	public static native number CResult_NoneChannelMonitorUpdateErrZ_ok();
	// struct LDKCResult_NoneChannelMonitorUpdateErrZ CResult_NoneChannelMonitorUpdateErrZ_err(enum LDKChannelMonitorUpdateErr e);
	public static native number CResult_NoneChannelMonitorUpdateErrZ_err(LDKChannelMonitorUpdateErr e);
	// void CResult_NoneChannelMonitorUpdateErrZ_free(struct LDKCResult_NoneChannelMonitorUpdateErrZ _res);
	public static native void CResult_NoneChannelMonitorUpdateErrZ_free(number _res);
	// void CVec_MonitorEventZ_free(struct LDKCVec_MonitorEventZ _res);
	public static native void CVec_MonitorEventZ_free(number[] _res);
	// struct LDKCResult_ChannelMonitorUpdateDecodeErrorZ CResult_ChannelMonitorUpdateDecodeErrorZ_ok(struct LDKChannelMonitorUpdate o);
	public static native number CResult_ChannelMonitorUpdateDecodeErrorZ_ok(number o);
	// struct LDKCResult_ChannelMonitorUpdateDecodeErrorZ CResult_ChannelMonitorUpdateDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_ChannelMonitorUpdateDecodeErrorZ_err(number e);
	// void CResult_ChannelMonitorUpdateDecodeErrorZ_free(struct LDKCResult_ChannelMonitorUpdateDecodeErrorZ _res);
	public static native void CResult_ChannelMonitorUpdateDecodeErrorZ_free(number _res);
	// struct LDKCResult_NoneMonitorUpdateErrorZ CResult_NoneMonitorUpdateErrorZ_ok(void);
	public static native number CResult_NoneMonitorUpdateErrorZ_ok();
	// struct LDKCResult_NoneMonitorUpdateErrorZ CResult_NoneMonitorUpdateErrorZ_err(struct LDKMonitorUpdateError e);
	public static native number CResult_NoneMonitorUpdateErrorZ_err(number e);
	// void CResult_NoneMonitorUpdateErrorZ_free(struct LDKCResult_NoneMonitorUpdateErrorZ _res);
	public static native void CResult_NoneMonitorUpdateErrorZ_free(number _res);
	// void C2Tuple_OutPointScriptZ_free(struct LDKC2Tuple_OutPointScriptZ _res);
	public static native void C2Tuple_OutPointScriptZ_free(number _res);
	// struct LDKC2Tuple_OutPointScriptZ C2Tuple_OutPointScriptZ_new(struct LDKOutPoint a, struct LDKCVec_u8Z b);
	public static native number C2Tuple_OutPointScriptZ_new(number a, Uint8Array b);
	// void CVec_TransactionZ_free(struct LDKCVec_TransactionZ _res);
	public static native void CVec_TransactionZ_free(Uint8Array[] _res);
	// void C2Tuple_u32TxOutZ_free(struct LDKC2Tuple_u32TxOutZ _res);
	public static native void C2Tuple_u32TxOutZ_free(number _res);
	// struct LDKC2Tuple_u32TxOutZ C2Tuple_u32TxOutZ_new(uint32_t a, struct LDKTxOut b);
	public static native number C2Tuple_u32TxOutZ_new(number a, number b);
	// void CVec_C2Tuple_u32TxOutZZ_free(struct LDKCVec_C2Tuple_u32TxOutZZ _res);
	public static native void CVec_C2Tuple_u32TxOutZZ_free(number[] _res);
	// void C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(struct LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ _res);
	public static native void C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(number _res);
	// struct LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(struct LDKThirtyTwoBytes a, struct LDKCVec_C2Tuple_u32TxOutZZ b);
	public static native number C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(Uint8Array a, number[] b);
	// void CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free(struct LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ _res);
	public static native void CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free(number[] _res);
	// void C2Tuple_BlockHashChannelMonitorZ_free(struct LDKC2Tuple_BlockHashChannelMonitorZ _res);
	public static native void C2Tuple_BlockHashChannelMonitorZ_free(number _res);
	// struct LDKC2Tuple_BlockHashChannelMonitorZ C2Tuple_BlockHashChannelMonitorZ_new(struct LDKThirtyTwoBytes a, struct LDKChannelMonitor b);
	public static native number C2Tuple_BlockHashChannelMonitorZ_new(Uint8Array a, number b);
	// struct LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(struct LDKC2Tuple_BlockHashChannelMonitorZ o);
	public static native number CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(number o);
	// struct LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(number e);
	// void CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(struct LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ _res);
	public static native void CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(number _res);
	// void C2Tuple_u64u64Z_free(struct LDKC2Tuple_u64u64Z _res);
	public static native void C2Tuple_u64u64Z_free(number _res);
	// struct LDKC2Tuple_u64u64Z C2Tuple_u64u64Z_new(uint64_t a, uint64_t b);
	public static native number C2Tuple_u64u64Z_new(number a, number b);
	// struct LDKCResult_SpendableOutputDescriptorDecodeErrorZ CResult_SpendableOutputDescriptorDecodeErrorZ_ok(struct LDKSpendableOutputDescriptor o);
	public static native number CResult_SpendableOutputDescriptorDecodeErrorZ_ok(number o);
	// struct LDKCResult_SpendableOutputDescriptorDecodeErrorZ CResult_SpendableOutputDescriptorDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_SpendableOutputDescriptorDecodeErrorZ_err(number e);
	// void CResult_SpendableOutputDescriptorDecodeErrorZ_free(struct LDKCResult_SpendableOutputDescriptorDecodeErrorZ _res);
	public static native void CResult_SpendableOutputDescriptorDecodeErrorZ_free(number _res);
	// void CVec_SignatureZ_free(struct LDKCVec_SignatureZ _res);
	public static native void CVec_SignatureZ_free(Uint8Array[] _res);
	// void C2Tuple_SignatureCVec_SignatureZZ_free(struct LDKC2Tuple_SignatureCVec_SignatureZZ _res);
	public static native void C2Tuple_SignatureCVec_SignatureZZ_free(number _res);
	// struct LDKC2Tuple_SignatureCVec_SignatureZZ C2Tuple_SignatureCVec_SignatureZZ_new(struct LDKSignature a, struct LDKCVec_SignatureZ b);
	public static native number C2Tuple_SignatureCVec_SignatureZZ_new(Uint8Array a, Uint8Array[] b);
	// struct LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(struct LDKC2Tuple_SignatureCVec_SignatureZZ o);
	public static native number CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(number o);
	// struct LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err(void);
	public static native number CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
	// void CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(struct LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ _res);
	public static native void CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(number _res);
	// struct LDKCResult_SignatureNoneZ CResult_SignatureNoneZ_ok(struct LDKSignature o);
	public static native number CResult_SignatureNoneZ_ok(Uint8Array o);
	// struct LDKCResult_SignatureNoneZ CResult_SignatureNoneZ_err(void);
	public static native number CResult_SignatureNoneZ_err();
	// void CResult_SignatureNoneZ_free(struct LDKCResult_SignatureNoneZ _res);
	public static native void CResult_SignatureNoneZ_free(number _res);
	// struct LDKCResult_CVec_SignatureZNoneZ CResult_CVec_SignatureZNoneZ_ok(struct LDKCVec_SignatureZ o);
	public static native number CResult_CVec_SignatureZNoneZ_ok(Uint8Array[] o);
	// struct LDKCResult_CVec_SignatureZNoneZ CResult_CVec_SignatureZNoneZ_err(void);
	public static native number CResult_CVec_SignatureZNoneZ_err();
	// void CResult_CVec_SignatureZNoneZ_free(struct LDKCResult_CVec_SignatureZNoneZ _res);
	public static native void CResult_CVec_SignatureZNoneZ_free(number _res);
	// struct LDKCResult_ChanKeySignerDecodeErrorZ CResult_ChanKeySignerDecodeErrorZ_ok(struct LDKChannelKeys o);
	public static native number CResult_ChanKeySignerDecodeErrorZ_ok(number o);
	// struct LDKCResult_ChanKeySignerDecodeErrorZ CResult_ChanKeySignerDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_ChanKeySignerDecodeErrorZ_err(number e);
	// void CResult_ChanKeySignerDecodeErrorZ_free(struct LDKCResult_ChanKeySignerDecodeErrorZ _res);
	public static native void CResult_ChanKeySignerDecodeErrorZ_free(number _res);
	// struct LDKCResult_InMemoryChannelKeysDecodeErrorZ CResult_InMemoryChannelKeysDecodeErrorZ_ok(struct LDKInMemoryChannelKeys o);
	public static native number CResult_InMemoryChannelKeysDecodeErrorZ_ok(number o);
	// struct LDKCResult_InMemoryChannelKeysDecodeErrorZ CResult_InMemoryChannelKeysDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_InMemoryChannelKeysDecodeErrorZ_err(number e);
	// void CResult_InMemoryChannelKeysDecodeErrorZ_free(struct LDKCResult_InMemoryChannelKeysDecodeErrorZ _res);
	public static native void CResult_InMemoryChannelKeysDecodeErrorZ_free(number _res);
	// struct LDKCResult_TxOutAccessErrorZ CResult_TxOutAccessErrorZ_ok(struct LDKTxOut o);
	public static native number CResult_TxOutAccessErrorZ_ok(number o);
	// struct LDKCResult_TxOutAccessErrorZ CResult_TxOutAccessErrorZ_err(enum LDKAccessError e);
	public static native number CResult_TxOutAccessErrorZ_err(LDKAccessError e);
	// void CResult_TxOutAccessErrorZ_free(struct LDKCResult_TxOutAccessErrorZ _res);
	public static native void CResult_TxOutAccessErrorZ_free(number _res);
	// struct LDKCResult_NoneAPIErrorZ CResult_NoneAPIErrorZ_ok(void);
	public static native number CResult_NoneAPIErrorZ_ok();
	// struct LDKCResult_NoneAPIErrorZ CResult_NoneAPIErrorZ_err(struct LDKAPIError e);
	public static native number CResult_NoneAPIErrorZ_err(number e);
	// void CResult_NoneAPIErrorZ_free(struct LDKCResult_NoneAPIErrorZ _res);
	public static native void CResult_NoneAPIErrorZ_free(number _res);
	// void CVec_ChannelDetailsZ_free(struct LDKCVec_ChannelDetailsZ _res);
	public static native void CVec_ChannelDetailsZ_free(number[] _res);
	// struct LDKCResult_NonePaymentSendFailureZ CResult_NonePaymentSendFailureZ_ok(void);
	public static native number CResult_NonePaymentSendFailureZ_ok();
	// struct LDKCResult_NonePaymentSendFailureZ CResult_NonePaymentSendFailureZ_err(struct LDKPaymentSendFailure e);
	public static native number CResult_NonePaymentSendFailureZ_err(number e);
	// void CResult_NonePaymentSendFailureZ_free(struct LDKCResult_NonePaymentSendFailureZ _res);
	public static native void CResult_NonePaymentSendFailureZ_free(number _res);
	// void CVec_NetAddressZ_free(struct LDKCVec_NetAddressZ _res);
	public static native void CVec_NetAddressZ_free(number[] _res);
	// void CVec_ChannelMonitorZ_free(struct LDKCVec_ChannelMonitorZ _res);
	public static native void CVec_ChannelMonitorZ_free(number[] _res);
	// void C2Tuple_BlockHashChannelManagerZ_free(struct LDKC2Tuple_BlockHashChannelManagerZ _res);
	public static native void C2Tuple_BlockHashChannelManagerZ_free(number _res);
	// struct LDKC2Tuple_BlockHashChannelManagerZ C2Tuple_BlockHashChannelManagerZ_new(struct LDKThirtyTwoBytes a, struct LDKChannelManager b);
	public static native number C2Tuple_BlockHashChannelManagerZ_new(Uint8Array a, number b);
	// struct LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(struct LDKC2Tuple_BlockHashChannelManagerZ o);
	public static native number CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(number o);
	// struct LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(number e);
	// void CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(struct LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ _res);
	public static native void CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(number _res);
	// struct LDKCResult_NetAddressu8Z CResult_NetAddressu8Z_ok(struct LDKNetAddress o);
	public static native number CResult_NetAddressu8Z_ok(number o);
	// struct LDKCResult_NetAddressu8Z CResult_NetAddressu8Z_err(uint8_t e);
	public static native number CResult_NetAddressu8Z_err(number e);
	// void CResult_NetAddressu8Z_free(struct LDKCResult_NetAddressu8Z _res);
	public static native void CResult_NetAddressu8Z_free(number _res);
	// struct LDKCResult_CResult_NetAddressu8ZDecodeErrorZ CResult_CResult_NetAddressu8ZDecodeErrorZ_ok(struct LDKCResult_NetAddressu8Z o);
	public static native number CResult_CResult_NetAddressu8ZDecodeErrorZ_ok(number o);
	// struct LDKCResult_CResult_NetAddressu8ZDecodeErrorZ CResult_CResult_NetAddressu8ZDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_CResult_NetAddressu8ZDecodeErrorZ_err(number e);
	// void CResult_CResult_NetAddressu8ZDecodeErrorZ_free(struct LDKCResult_CResult_NetAddressu8ZDecodeErrorZ _res);
	public static native void CResult_CResult_NetAddressu8ZDecodeErrorZ_free(number _res);
	// void CVec_u64Z_free(struct LDKCVec_u64Z _res);
	public static native void CVec_u64Z_free(number[] _res);
	// void CVec_UpdateAddHTLCZ_free(struct LDKCVec_UpdateAddHTLCZ _res);
	public static native void CVec_UpdateAddHTLCZ_free(number[] _res);
	// void CVec_UpdateFulfillHTLCZ_free(struct LDKCVec_UpdateFulfillHTLCZ _res);
	public static native void CVec_UpdateFulfillHTLCZ_free(number[] _res);
	// void CVec_UpdateFailHTLCZ_free(struct LDKCVec_UpdateFailHTLCZ _res);
	public static native void CVec_UpdateFailHTLCZ_free(number[] _res);
	// void CVec_UpdateFailMalformedHTLCZ_free(struct LDKCVec_UpdateFailMalformedHTLCZ _res);
	public static native void CVec_UpdateFailMalformedHTLCZ_free(number[] _res);
	// struct LDKCResult_boolLightningErrorZ CResult_boolLightningErrorZ_ok(bool o);
	public static native number CResult_boolLightningErrorZ_ok(boolean o);
	// struct LDKCResult_boolLightningErrorZ CResult_boolLightningErrorZ_err(struct LDKLightningError e);
	public static native number CResult_boolLightningErrorZ_err(number e);
	// void CResult_boolLightningErrorZ_free(struct LDKCResult_boolLightningErrorZ _res);
	public static native void CResult_boolLightningErrorZ_free(number _res);
	// void C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(struct LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ _res);
	public static native void C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(number _res);
	// struct LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(struct LDKChannelAnnouncement a, struct LDKChannelUpdate b, struct LDKChannelUpdate c);
	public static native number C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(number a, number b, number c);
	// void CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(struct LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ _res);
	public static native void CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(number[] _res);
	// void CVec_NodeAnnouncementZ_free(struct LDKCVec_NodeAnnouncementZ _res);
	public static native void CVec_NodeAnnouncementZ_free(number[] _res);
	// struct LDKCResult_NoneLightningErrorZ CResult_NoneLightningErrorZ_ok(void);
	public static native number CResult_NoneLightningErrorZ_ok();
	// struct LDKCResult_NoneLightningErrorZ CResult_NoneLightningErrorZ_err(struct LDKLightningError e);
	public static native number CResult_NoneLightningErrorZ_err(number e);
	// void CResult_NoneLightningErrorZ_free(struct LDKCResult_NoneLightningErrorZ _res);
	public static native void CResult_NoneLightningErrorZ_free(number _res);
	// struct LDKCResult_ChannelReestablishDecodeErrorZ CResult_ChannelReestablishDecodeErrorZ_ok(struct LDKChannelReestablish o);
	public static native number CResult_ChannelReestablishDecodeErrorZ_ok(number o);
	// struct LDKCResult_ChannelReestablishDecodeErrorZ CResult_ChannelReestablishDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_ChannelReestablishDecodeErrorZ_err(number e);
	// void CResult_ChannelReestablishDecodeErrorZ_free(struct LDKCResult_ChannelReestablishDecodeErrorZ _res);
	public static native void CResult_ChannelReestablishDecodeErrorZ_free(number _res);
	// struct LDKCResult_InitDecodeErrorZ CResult_InitDecodeErrorZ_ok(struct LDKInit o);
	public static native number CResult_InitDecodeErrorZ_ok(number o);
	// struct LDKCResult_InitDecodeErrorZ CResult_InitDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_InitDecodeErrorZ_err(number e);
	// void CResult_InitDecodeErrorZ_free(struct LDKCResult_InitDecodeErrorZ _res);
	public static native void CResult_InitDecodeErrorZ_free(number _res);
	// struct LDKCResult_PingDecodeErrorZ CResult_PingDecodeErrorZ_ok(struct LDKPing o);
	public static native number CResult_PingDecodeErrorZ_ok(number o);
	// struct LDKCResult_PingDecodeErrorZ CResult_PingDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_PingDecodeErrorZ_err(number e);
	// void CResult_PingDecodeErrorZ_free(struct LDKCResult_PingDecodeErrorZ _res);
	public static native void CResult_PingDecodeErrorZ_free(number _res);
	// struct LDKCResult_PongDecodeErrorZ CResult_PongDecodeErrorZ_ok(struct LDKPong o);
	public static native number CResult_PongDecodeErrorZ_ok(number o);
	// struct LDKCResult_PongDecodeErrorZ CResult_PongDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_PongDecodeErrorZ_err(number e);
	// void CResult_PongDecodeErrorZ_free(struct LDKCResult_PongDecodeErrorZ _res);
	public static native void CResult_PongDecodeErrorZ_free(number _res);
	// struct LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(struct LDKUnsignedChannelAnnouncement o);
	public static native number CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(number o);
	// struct LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(number e);
	// void CResult_UnsignedChannelAnnouncementDecodeErrorZ_free(struct LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ _res);
	public static native void CResult_UnsignedChannelAnnouncementDecodeErrorZ_free(number _res);
	// struct LDKCResult_UnsignedChannelUpdateDecodeErrorZ CResult_UnsignedChannelUpdateDecodeErrorZ_ok(struct LDKUnsignedChannelUpdate o);
	public static native number CResult_UnsignedChannelUpdateDecodeErrorZ_ok(number o);
	// struct LDKCResult_UnsignedChannelUpdateDecodeErrorZ CResult_UnsignedChannelUpdateDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_UnsignedChannelUpdateDecodeErrorZ_err(number e);
	// void CResult_UnsignedChannelUpdateDecodeErrorZ_free(struct LDKCResult_UnsignedChannelUpdateDecodeErrorZ _res);
	public static native void CResult_UnsignedChannelUpdateDecodeErrorZ_free(number _res);
	// struct LDKCResult_ErrorMessageDecodeErrorZ CResult_ErrorMessageDecodeErrorZ_ok(struct LDKErrorMessage o);
	public static native number CResult_ErrorMessageDecodeErrorZ_ok(number o);
	// struct LDKCResult_ErrorMessageDecodeErrorZ CResult_ErrorMessageDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_ErrorMessageDecodeErrorZ_err(number e);
	// void CResult_ErrorMessageDecodeErrorZ_free(struct LDKCResult_ErrorMessageDecodeErrorZ _res);
	public static native void CResult_ErrorMessageDecodeErrorZ_free(number _res);
	// struct LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ CResult_UnsignedNodeAnnouncementDecodeErrorZ_ok(struct LDKUnsignedNodeAnnouncement o);
	public static native number CResult_UnsignedNodeAnnouncementDecodeErrorZ_ok(number o);
	// struct LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ CResult_UnsignedNodeAnnouncementDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_UnsignedNodeAnnouncementDecodeErrorZ_err(number e);
	// void CResult_UnsignedNodeAnnouncementDecodeErrorZ_free(struct LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ _res);
	public static native void CResult_UnsignedNodeAnnouncementDecodeErrorZ_free(number _res);
	// struct LDKCResult_QueryShortChannelIdsDecodeErrorZ CResult_QueryShortChannelIdsDecodeErrorZ_ok(struct LDKQueryShortChannelIds o);
	public static native number CResult_QueryShortChannelIdsDecodeErrorZ_ok(number o);
	// struct LDKCResult_QueryShortChannelIdsDecodeErrorZ CResult_QueryShortChannelIdsDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_QueryShortChannelIdsDecodeErrorZ_err(number e);
	// void CResult_QueryShortChannelIdsDecodeErrorZ_free(struct LDKCResult_QueryShortChannelIdsDecodeErrorZ _res);
	public static native void CResult_QueryShortChannelIdsDecodeErrorZ_free(number _res);
	// struct LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(struct LDKReplyShortChannelIdsEnd o);
	public static native number CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(number o);
	// struct LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(number e);
	// void CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(struct LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ _res);
	public static native void CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(number _res);
	// struct LDKCResult_QueryChannelRangeDecodeErrorZ CResult_QueryChannelRangeDecodeErrorZ_ok(struct LDKQueryChannelRange o);
	public static native number CResult_QueryChannelRangeDecodeErrorZ_ok(number o);
	// struct LDKCResult_QueryChannelRangeDecodeErrorZ CResult_QueryChannelRangeDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_QueryChannelRangeDecodeErrorZ_err(number e);
	// void CResult_QueryChannelRangeDecodeErrorZ_free(struct LDKCResult_QueryChannelRangeDecodeErrorZ _res);
	public static native void CResult_QueryChannelRangeDecodeErrorZ_free(number _res);
	// struct LDKCResult_ReplyChannelRangeDecodeErrorZ CResult_ReplyChannelRangeDecodeErrorZ_ok(struct LDKReplyChannelRange o);
	public static native number CResult_ReplyChannelRangeDecodeErrorZ_ok(number o);
	// struct LDKCResult_ReplyChannelRangeDecodeErrorZ CResult_ReplyChannelRangeDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_ReplyChannelRangeDecodeErrorZ_err(number e);
	// void CResult_ReplyChannelRangeDecodeErrorZ_free(struct LDKCResult_ReplyChannelRangeDecodeErrorZ _res);
	public static native void CResult_ReplyChannelRangeDecodeErrorZ_free(number _res);
	// struct LDKCResult_GossipTimestampFilterDecodeErrorZ CResult_GossipTimestampFilterDecodeErrorZ_ok(struct LDKGossipTimestampFilter o);
	public static native number CResult_GossipTimestampFilterDecodeErrorZ_ok(number o);
	// struct LDKCResult_GossipTimestampFilterDecodeErrorZ CResult_GossipTimestampFilterDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_GossipTimestampFilterDecodeErrorZ_err(number e);
	// void CResult_GossipTimestampFilterDecodeErrorZ_free(struct LDKCResult_GossipTimestampFilterDecodeErrorZ _res);
	public static native void CResult_GossipTimestampFilterDecodeErrorZ_free(number _res);
	// void CVec_PublicKeyZ_free(struct LDKCVec_PublicKeyZ _res);
	public static native void CVec_PublicKeyZ_free(Uint8Array[] _res);
	// void CVec_u8Z_free(struct LDKCVec_u8Z _res);
	public static native void CVec_u8Z_free(Uint8Array _res);
	// struct LDKCResult_CVec_u8ZPeerHandleErrorZ CResult_CVec_u8ZPeerHandleErrorZ_ok(struct LDKCVec_u8Z o);
	public static native number CResult_CVec_u8ZPeerHandleErrorZ_ok(Uint8Array o);
	// struct LDKCResult_CVec_u8ZPeerHandleErrorZ CResult_CVec_u8ZPeerHandleErrorZ_err(struct LDKPeerHandleError e);
	public static native number CResult_CVec_u8ZPeerHandleErrorZ_err(number e);
	// void CResult_CVec_u8ZPeerHandleErrorZ_free(struct LDKCResult_CVec_u8ZPeerHandleErrorZ _res);
	public static native void CResult_CVec_u8ZPeerHandleErrorZ_free(number _res);
	// struct LDKCResult_NonePeerHandleErrorZ CResult_NonePeerHandleErrorZ_ok(void);
	public static native number CResult_NonePeerHandleErrorZ_ok();
	// struct LDKCResult_NonePeerHandleErrorZ CResult_NonePeerHandleErrorZ_err(struct LDKPeerHandleError e);
	public static native number CResult_NonePeerHandleErrorZ_err(number e);
	// void CResult_NonePeerHandleErrorZ_free(struct LDKCResult_NonePeerHandleErrorZ _res);
	public static native void CResult_NonePeerHandleErrorZ_free(number _res);
	// struct LDKCResult_boolPeerHandleErrorZ CResult_boolPeerHandleErrorZ_ok(bool o);
	public static native number CResult_boolPeerHandleErrorZ_ok(boolean o);
	// struct LDKCResult_boolPeerHandleErrorZ CResult_boolPeerHandleErrorZ_err(struct LDKPeerHandleError e);
	public static native number CResult_boolPeerHandleErrorZ_err(number e);
	// void CResult_boolPeerHandleErrorZ_free(struct LDKCResult_boolPeerHandleErrorZ _res);
	public static native void CResult_boolPeerHandleErrorZ_free(number _res);
	// struct LDKCResult_SecretKeySecpErrorZ CResult_SecretKeySecpErrorZ_ok(struct LDKSecretKey o);
	public static native number CResult_SecretKeySecpErrorZ_ok(Uint8Array o);
	// struct LDKCResult_SecretKeySecpErrorZ CResult_SecretKeySecpErrorZ_err(enum LDKSecp256k1Error e);
	public static native number CResult_SecretKeySecpErrorZ_err(LDKSecp256k1Error e);
	// void CResult_SecretKeySecpErrorZ_free(struct LDKCResult_SecretKeySecpErrorZ _res);
	public static native void CResult_SecretKeySecpErrorZ_free(number _res);
	// struct LDKCResult_PublicKeySecpErrorZ CResult_PublicKeySecpErrorZ_ok(struct LDKPublicKey o);
	public static native number CResult_PublicKeySecpErrorZ_ok(Uint8Array o);
	// struct LDKCResult_PublicKeySecpErrorZ CResult_PublicKeySecpErrorZ_err(enum LDKSecp256k1Error e);
	public static native number CResult_PublicKeySecpErrorZ_err(LDKSecp256k1Error e);
	// void CResult_PublicKeySecpErrorZ_free(struct LDKCResult_PublicKeySecpErrorZ _res);
	public static native void CResult_PublicKeySecpErrorZ_free(number _res);
	// struct LDKCResult_TxCreationKeysSecpErrorZ CResult_TxCreationKeysSecpErrorZ_ok(struct LDKTxCreationKeys o);
	public static native number CResult_TxCreationKeysSecpErrorZ_ok(number o);
	// struct LDKCResult_TxCreationKeysSecpErrorZ CResult_TxCreationKeysSecpErrorZ_err(enum LDKSecp256k1Error e);
	public static native number CResult_TxCreationKeysSecpErrorZ_err(LDKSecp256k1Error e);
	// void CResult_TxCreationKeysSecpErrorZ_free(struct LDKCResult_TxCreationKeysSecpErrorZ _res);
	public static native void CResult_TxCreationKeysSecpErrorZ_free(number _res);
	// struct LDKCResult_TrustedCommitmentTransactionNoneZ CResult_TrustedCommitmentTransactionNoneZ_ok(struct LDKTrustedCommitmentTransaction o);
	public static native number CResult_TrustedCommitmentTransactionNoneZ_ok(number o);
	// struct LDKCResult_TrustedCommitmentTransactionNoneZ CResult_TrustedCommitmentTransactionNoneZ_err(void);
	public static native number CResult_TrustedCommitmentTransactionNoneZ_err();
	// void CResult_TrustedCommitmentTransactionNoneZ_free(struct LDKCResult_TrustedCommitmentTransactionNoneZ _res);
	public static native void CResult_TrustedCommitmentTransactionNoneZ_free(number _res);
	// void CVec_RouteHopZ_free(struct LDKCVec_RouteHopZ _res);
	public static native void CVec_RouteHopZ_free(number[] _res);
	// void CVec_CVec_RouteHopZZ_free(struct LDKCVec_CVec_RouteHopZZ _res);
	public static native void CVec_CVec_RouteHopZZ_free(number[][] _res);
	// struct LDKCResult_RouteDecodeErrorZ CResult_RouteDecodeErrorZ_ok(struct LDKRoute o);
	public static native number CResult_RouteDecodeErrorZ_ok(number o);
	// struct LDKCResult_RouteDecodeErrorZ CResult_RouteDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_RouteDecodeErrorZ_err(number e);
	// void CResult_RouteDecodeErrorZ_free(struct LDKCResult_RouteDecodeErrorZ _res);
	public static native void CResult_RouteDecodeErrorZ_free(number _res);
	// void CVec_RouteHintZ_free(struct LDKCVec_RouteHintZ _res);
	public static native void CVec_RouteHintZ_free(number[] _res);
	// struct LDKCResult_RouteLightningErrorZ CResult_RouteLightningErrorZ_ok(struct LDKRoute o);
	public static native number CResult_RouteLightningErrorZ_ok(number o);
	// struct LDKCResult_RouteLightningErrorZ CResult_RouteLightningErrorZ_err(struct LDKLightningError e);
	public static native number CResult_RouteLightningErrorZ_err(number e);
	// void CResult_RouteLightningErrorZ_free(struct LDKCResult_RouteLightningErrorZ _res);
	public static native void CResult_RouteLightningErrorZ_free(number _res);
	// struct LDKCResult_RoutingFeesDecodeErrorZ CResult_RoutingFeesDecodeErrorZ_ok(struct LDKRoutingFees o);
	public static native number CResult_RoutingFeesDecodeErrorZ_ok(number o);
	// struct LDKCResult_RoutingFeesDecodeErrorZ CResult_RoutingFeesDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_RoutingFeesDecodeErrorZ_err(number e);
	// void CResult_RoutingFeesDecodeErrorZ_free(struct LDKCResult_RoutingFeesDecodeErrorZ _res);
	public static native void CResult_RoutingFeesDecodeErrorZ_free(number _res);
	// struct LDKCResult_NodeAnnouncementInfoDecodeErrorZ CResult_NodeAnnouncementInfoDecodeErrorZ_ok(struct LDKNodeAnnouncementInfo o);
	public static native number CResult_NodeAnnouncementInfoDecodeErrorZ_ok(number o);
	// struct LDKCResult_NodeAnnouncementInfoDecodeErrorZ CResult_NodeAnnouncementInfoDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_NodeAnnouncementInfoDecodeErrorZ_err(number e);
	// void CResult_NodeAnnouncementInfoDecodeErrorZ_free(struct LDKCResult_NodeAnnouncementInfoDecodeErrorZ _res);
	public static native void CResult_NodeAnnouncementInfoDecodeErrorZ_free(number _res);
	// struct LDKCResult_NodeInfoDecodeErrorZ CResult_NodeInfoDecodeErrorZ_ok(struct LDKNodeInfo o);
	public static native number CResult_NodeInfoDecodeErrorZ_ok(number o);
	// struct LDKCResult_NodeInfoDecodeErrorZ CResult_NodeInfoDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_NodeInfoDecodeErrorZ_err(number e);
	// void CResult_NodeInfoDecodeErrorZ_free(struct LDKCResult_NodeInfoDecodeErrorZ _res);
	public static native void CResult_NodeInfoDecodeErrorZ_free(number _res);
	// struct LDKCResult_NetworkGraphDecodeErrorZ CResult_NetworkGraphDecodeErrorZ_ok(struct LDKNetworkGraph o);
	public static native number CResult_NetworkGraphDecodeErrorZ_ok(number o);
	// struct LDKCResult_NetworkGraphDecodeErrorZ CResult_NetworkGraphDecodeErrorZ_err(struct LDKDecodeError e);
	public static native number CResult_NetworkGraphDecodeErrorZ_err(number e);
	// void CResult_NetworkGraphDecodeErrorZ_free(struct LDKCResult_NetworkGraphDecodeErrorZ _res);
	public static native void CResult_NetworkGraphDecodeErrorZ_free(number _res);
	// void Event_free(struct LDKEvent this_ptr);
	public static native void Event_free(number this_ptr);
	// struct LDKEvent Event_clone(const struct LDKEvent *NONNULL_PTR orig);
	public static native number Event_clone(number orig);
	// struct LDKCVec_u8Z Event_write(const struct LDKEvent *NONNULL_PTR obj);
	public static native Uint8Array Event_write(number obj);
	// void MessageSendEvent_free(struct LDKMessageSendEvent this_ptr);
	public static native void MessageSendEvent_free(number this_ptr);
	// struct LDKMessageSendEvent MessageSendEvent_clone(const struct LDKMessageSendEvent *NONNULL_PTR orig);
	public static native number MessageSendEvent_clone(number orig);
	// void MessageSendEventsProvider_free(struct LDKMessageSendEventsProvider this_ptr);
	public static native void MessageSendEventsProvider_free(number this_ptr);
	// void EventsProvider_free(struct LDKEventsProvider this_ptr);
	public static native void EventsProvider_free(number this_ptr);
	// void APIError_free(struct LDKAPIError this_ptr);
	public static native void APIError_free(number this_ptr);
	// struct LDKAPIError APIError_clone(const struct LDKAPIError *NONNULL_PTR orig);
	public static native number APIError_clone(number orig);
	// enum LDKLevel Level_clone(const enum LDKLevel *NONNULL_PTR orig);
	public static native LDKLevel Level_clone(number orig);
	// MUST_USE_RES enum LDKLevel Level_max(void);
	public static native LDKLevel Level_max();
	// void Logger_free(struct LDKLogger this_ptr);
	public static native void Logger_free(number this_ptr);
	// void ChannelHandshakeConfig_free(struct LDKChannelHandshakeConfig this_ptr);
	public static native void ChannelHandshakeConfig_free(number this_ptr);
	// struct LDKChannelHandshakeConfig ChannelHandshakeConfig_clone(const struct LDKChannelHandshakeConfig *NONNULL_PTR orig);
	public static native number ChannelHandshakeConfig_clone(number orig);
	// uint32_t ChannelHandshakeConfig_get_minimum_depth(const struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeConfig_get_minimum_depth(number this_ptr);
	// void ChannelHandshakeConfig_set_minimum_depth(struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr, uint32_t val);
	public static native void ChannelHandshakeConfig_set_minimum_depth(number this_ptr, number val);
	// uint16_t ChannelHandshakeConfig_get_our_to_self_delay(const struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeConfig_get_our_to_self_delay(number this_ptr);
	// void ChannelHandshakeConfig_set_our_to_self_delay(struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr, uint16_t val);
	public static native void ChannelHandshakeConfig_set_our_to_self_delay(number this_ptr, number val);
	// uint64_t ChannelHandshakeConfig_get_our_htlc_minimum_msat(const struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeConfig_get_our_htlc_minimum_msat(number this_ptr);
	// void ChannelHandshakeConfig_set_our_htlc_minimum_msat(struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelHandshakeConfig_set_our_htlc_minimum_msat(number this_ptr, number val);
	// MUST_USE_RES struct LDKChannelHandshakeConfig ChannelHandshakeConfig_new(uint32_t minimum_depth_arg, uint16_t our_to_self_delay_arg, uint64_t our_htlc_minimum_msat_arg);
	public static native number ChannelHandshakeConfig_new(number minimum_depth_arg, number our_to_self_delay_arg, number our_htlc_minimum_msat_arg);
	// MUST_USE_RES struct LDKChannelHandshakeConfig ChannelHandshakeConfig_default(void);
	public static native number ChannelHandshakeConfig_default();
	// void ChannelHandshakeLimits_free(struct LDKChannelHandshakeLimits this_ptr);
	public static native void ChannelHandshakeLimits_free(number this_ptr);
	// struct LDKChannelHandshakeLimits ChannelHandshakeLimits_clone(const struct LDKChannelHandshakeLimits *NONNULL_PTR orig);
	public static native number ChannelHandshakeLimits_clone(number orig);
	// uint64_t ChannelHandshakeLimits_get_min_funding_satoshis(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeLimits_get_min_funding_satoshis(number this_ptr);
	// void ChannelHandshakeLimits_set_min_funding_satoshis(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_min_funding_satoshis(number this_ptr, number val);
	// uint64_t ChannelHandshakeLimits_get_max_htlc_minimum_msat(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeLimits_get_max_htlc_minimum_msat(number this_ptr);
	// void ChannelHandshakeLimits_set_max_htlc_minimum_msat(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_max_htlc_minimum_msat(number this_ptr, number val);
	// uint64_t ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(number this_ptr);
	// void ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(number this_ptr, number val);
	// uint64_t ChannelHandshakeLimits_get_max_channel_reserve_satoshis(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeLimits_get_max_channel_reserve_satoshis(number this_ptr);
	// void ChannelHandshakeLimits_set_max_channel_reserve_satoshis(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_max_channel_reserve_satoshis(number this_ptr, number val);
	// uint16_t ChannelHandshakeLimits_get_min_max_accepted_htlcs(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeLimits_get_min_max_accepted_htlcs(number this_ptr);
	// void ChannelHandshakeLimits_set_min_max_accepted_htlcs(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint16_t val);
	public static native void ChannelHandshakeLimits_set_min_max_accepted_htlcs(number this_ptr, number val);
	// uint64_t ChannelHandshakeLimits_get_min_dust_limit_satoshis(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeLimits_get_min_dust_limit_satoshis(number this_ptr);
	// void ChannelHandshakeLimits_set_min_dust_limit_satoshis(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_min_dust_limit_satoshis(number this_ptr, number val);
	// uint64_t ChannelHandshakeLimits_get_max_dust_limit_satoshis(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeLimits_get_max_dust_limit_satoshis(number this_ptr);
	// void ChannelHandshakeLimits_set_max_dust_limit_satoshis(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelHandshakeLimits_set_max_dust_limit_satoshis(number this_ptr, number val);
	// uint32_t ChannelHandshakeLimits_get_max_minimum_depth(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeLimits_get_max_minimum_depth(number this_ptr);
	// void ChannelHandshakeLimits_set_max_minimum_depth(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint32_t val);
	public static native void ChannelHandshakeLimits_set_max_minimum_depth(number this_ptr, number val);
	// bool ChannelHandshakeLimits_get_force_announced_channel_preference(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	public static native boolean ChannelHandshakeLimits_get_force_announced_channel_preference(number this_ptr);
	// void ChannelHandshakeLimits_set_force_announced_channel_preference(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, bool val);
	public static native void ChannelHandshakeLimits_set_force_announced_channel_preference(number this_ptr, boolean val);
	// uint16_t ChannelHandshakeLimits_get_their_to_self_delay(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	public static native number ChannelHandshakeLimits_get_their_to_self_delay(number this_ptr);
	// void ChannelHandshakeLimits_set_their_to_self_delay(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint16_t val);
	public static native void ChannelHandshakeLimits_set_their_to_self_delay(number this_ptr, number val);
	// MUST_USE_RES struct LDKChannelHandshakeLimits ChannelHandshakeLimits_new(uint64_t min_funding_satoshis_arg, uint64_t max_htlc_minimum_msat_arg, uint64_t min_max_htlc_value_in_flight_msat_arg, uint64_t max_channel_reserve_satoshis_arg, uint16_t min_max_accepted_htlcs_arg, uint64_t min_dust_limit_satoshis_arg, uint64_t max_dust_limit_satoshis_arg, uint32_t max_minimum_depth_arg, bool force_announced_channel_preference_arg, uint16_t their_to_self_delay_arg);
	public static native number ChannelHandshakeLimits_new(number min_funding_satoshis_arg, number max_htlc_minimum_msat_arg, number min_max_htlc_value_in_flight_msat_arg, number max_channel_reserve_satoshis_arg, number min_max_accepted_htlcs_arg, number min_dust_limit_satoshis_arg, number max_dust_limit_satoshis_arg, number max_minimum_depth_arg, boolean force_announced_channel_preference_arg, number their_to_self_delay_arg);
	// MUST_USE_RES struct LDKChannelHandshakeLimits ChannelHandshakeLimits_default(void);
	public static native number ChannelHandshakeLimits_default();
	// void ChannelConfig_free(struct LDKChannelConfig this_ptr);
	public static native void ChannelConfig_free(number this_ptr);
	// struct LDKChannelConfig ChannelConfig_clone(const struct LDKChannelConfig *NONNULL_PTR orig);
	public static native number ChannelConfig_clone(number orig);
	// uint32_t ChannelConfig_get_fee_proportional_millionths(const struct LDKChannelConfig *NONNULL_PTR this_ptr);
	public static native number ChannelConfig_get_fee_proportional_millionths(number this_ptr);
	// void ChannelConfig_set_fee_proportional_millionths(struct LDKChannelConfig *NONNULL_PTR this_ptr, uint32_t val);
	public static native void ChannelConfig_set_fee_proportional_millionths(number this_ptr, number val);
	// bool ChannelConfig_get_announced_channel(const struct LDKChannelConfig *NONNULL_PTR this_ptr);
	public static native boolean ChannelConfig_get_announced_channel(number this_ptr);
	// void ChannelConfig_set_announced_channel(struct LDKChannelConfig *NONNULL_PTR this_ptr, bool val);
	public static native void ChannelConfig_set_announced_channel(number this_ptr, boolean val);
	// bool ChannelConfig_get_commit_upfront_shutdown_pubkey(const struct LDKChannelConfig *NONNULL_PTR this_ptr);
	public static native boolean ChannelConfig_get_commit_upfront_shutdown_pubkey(number this_ptr);
	// void ChannelConfig_set_commit_upfront_shutdown_pubkey(struct LDKChannelConfig *NONNULL_PTR this_ptr, bool val);
	public static native void ChannelConfig_set_commit_upfront_shutdown_pubkey(number this_ptr, boolean val);
	// MUST_USE_RES struct LDKChannelConfig ChannelConfig_new(uint32_t fee_proportional_millionths_arg, bool announced_channel_arg, bool commit_upfront_shutdown_pubkey_arg);
	public static native number ChannelConfig_new(number fee_proportional_millionths_arg, boolean announced_channel_arg, boolean commit_upfront_shutdown_pubkey_arg);
	// MUST_USE_RES struct LDKChannelConfig ChannelConfig_default(void);
	public static native number ChannelConfig_default();
	// struct LDKCVec_u8Z ChannelConfig_write(const struct LDKChannelConfig *NONNULL_PTR obj);
	public static native Uint8Array ChannelConfig_write(number obj);
	// struct LDKChannelConfig ChannelConfig_read(struct LDKu8slice ser);
	public static native number ChannelConfig_read(Uint8Array ser);
	// void UserConfig_free(struct LDKUserConfig this_ptr);
	public static native void UserConfig_free(number this_ptr);
	// struct LDKUserConfig UserConfig_clone(const struct LDKUserConfig *NONNULL_PTR orig);
	public static native number UserConfig_clone(number orig);
	// struct LDKChannelHandshakeConfig UserConfig_get_own_channel_config(const struct LDKUserConfig *NONNULL_PTR this_ptr);
	public static native number UserConfig_get_own_channel_config(number this_ptr);
	// void UserConfig_set_own_channel_config(struct LDKUserConfig *NONNULL_PTR this_ptr, struct LDKChannelHandshakeConfig val);
	public static native void UserConfig_set_own_channel_config(number this_ptr, number val);
	// struct LDKChannelHandshakeLimits UserConfig_get_peer_channel_config_limits(const struct LDKUserConfig *NONNULL_PTR this_ptr);
	public static native number UserConfig_get_peer_channel_config_limits(number this_ptr);
	// void UserConfig_set_peer_channel_config_limits(struct LDKUserConfig *NONNULL_PTR this_ptr, struct LDKChannelHandshakeLimits val);
	public static native void UserConfig_set_peer_channel_config_limits(number this_ptr, number val);
	// struct LDKChannelConfig UserConfig_get_channel_options(const struct LDKUserConfig *NONNULL_PTR this_ptr);
	public static native number UserConfig_get_channel_options(number this_ptr);
	// void UserConfig_set_channel_options(struct LDKUserConfig *NONNULL_PTR this_ptr, struct LDKChannelConfig val);
	public static native void UserConfig_set_channel_options(number this_ptr, number val);
	// MUST_USE_RES struct LDKUserConfig UserConfig_new(struct LDKChannelHandshakeConfig own_channel_config_arg, struct LDKChannelHandshakeLimits peer_channel_config_limits_arg, struct LDKChannelConfig channel_options_arg);
	public static native number UserConfig_new(number own_channel_config_arg, number peer_channel_config_limits_arg, number channel_options_arg);
	// MUST_USE_RES struct LDKUserConfig UserConfig_default(void);
	public static native number UserConfig_default();
	// enum LDKAccessError AccessError_clone(const enum LDKAccessError *NONNULL_PTR orig);
	public static native LDKAccessError AccessError_clone(number orig);
	// void Access_free(struct LDKAccess this_ptr);
	public static native void Access_free(number this_ptr);
	// void Watch_free(struct LDKWatch this_ptr);
	public static native void Watch_free(number this_ptr);
	// void Filter_free(struct LDKFilter this_ptr);
	public static native void Filter_free(number this_ptr);
	// void BroadcasterInterface_free(struct LDKBroadcasterInterface this_ptr);
	public static native void BroadcasterInterface_free(number this_ptr);
	// enum LDKConfirmationTarget ConfirmationTarget_clone(const enum LDKConfirmationTarget *NONNULL_PTR orig);
	public static native LDKConfirmationTarget ConfirmationTarget_clone(number orig);
	// void FeeEstimator_free(struct LDKFeeEstimator this_ptr);
	public static native void FeeEstimator_free(number this_ptr);
	// void ChainMonitor_free(struct LDKChainMonitor this_ptr);
	public static native void ChainMonitor_free(number this_ptr);
	// void ChainMonitor_block_connected(const struct LDKChainMonitor *NONNULL_PTR this_arg, const uint8_t (*header)[80], struct LDKCVec_C2Tuple_usizeTransactionZZ txdata, uint32_t height);
	public static native void ChainMonitor_block_connected(number this_arg, Uint8Array header, number[] txdata, number height);
	// void ChainMonitor_block_disconnected(const struct LDKChainMonitor *NONNULL_PTR this_arg, const uint8_t (*header)[80], uint32_t disconnected_height);
	public static native void ChainMonitor_block_disconnected(number this_arg, Uint8Array header, number disconnected_height);
	// MUST_USE_RES struct LDKChainMonitor ChainMonitor_new(struct LDKFilter *chain_source, struct LDKBroadcasterInterface broadcaster, struct LDKLogger logger, struct LDKFeeEstimator feeest, struct LDKPersist persister);
	public static native number ChainMonitor_new(number chain_source, number broadcaster, number logger, number feeest, number persister);
	// struct LDKWatch ChainMonitor_as_Watch(const struct LDKChainMonitor *NONNULL_PTR this_arg);
	public static native number ChainMonitor_as_Watch(number this_arg);
	// struct LDKEventsProvider ChainMonitor_as_EventsProvider(const struct LDKChainMonitor *NONNULL_PTR this_arg);
	public static native number ChainMonitor_as_EventsProvider(number this_arg);
	// void ChannelMonitorUpdate_free(struct LDKChannelMonitorUpdate this_ptr);
	public static native void ChannelMonitorUpdate_free(number this_ptr);
	// struct LDKChannelMonitorUpdate ChannelMonitorUpdate_clone(const struct LDKChannelMonitorUpdate *NONNULL_PTR orig);
	public static native number ChannelMonitorUpdate_clone(number orig);
	// uint64_t ChannelMonitorUpdate_get_update_id(const struct LDKChannelMonitorUpdate *NONNULL_PTR this_ptr);
	public static native number ChannelMonitorUpdate_get_update_id(number this_ptr);
	// void ChannelMonitorUpdate_set_update_id(struct LDKChannelMonitorUpdate *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelMonitorUpdate_set_update_id(number this_ptr, number val);
	// struct LDKCVec_u8Z ChannelMonitorUpdate_write(const struct LDKChannelMonitorUpdate *NONNULL_PTR obj);
	public static native Uint8Array ChannelMonitorUpdate_write(number obj);
	// struct LDKCResult_ChannelMonitorUpdateDecodeErrorZ ChannelMonitorUpdate_read(struct LDKu8slice ser);
	public static native number ChannelMonitorUpdate_read(Uint8Array ser);
	// enum LDKChannelMonitorUpdateErr ChannelMonitorUpdateErr_clone(const enum LDKChannelMonitorUpdateErr *NONNULL_PTR orig);
	public static native LDKChannelMonitorUpdateErr ChannelMonitorUpdateErr_clone(number orig);
	// void MonitorUpdateError_free(struct LDKMonitorUpdateError this_ptr);
	public static native void MonitorUpdateError_free(number this_ptr);
	// void MonitorEvent_free(struct LDKMonitorEvent this_ptr);
	public static native void MonitorEvent_free(number this_ptr);
	// struct LDKMonitorEvent MonitorEvent_clone(const struct LDKMonitorEvent *NONNULL_PTR orig);
	public static native number MonitorEvent_clone(number orig);
	// void HTLCUpdate_free(struct LDKHTLCUpdate this_ptr);
	public static native void HTLCUpdate_free(number this_ptr);
	// struct LDKHTLCUpdate HTLCUpdate_clone(const struct LDKHTLCUpdate *NONNULL_PTR orig);
	public static native number HTLCUpdate_clone(number orig);
	// struct LDKCVec_u8Z HTLCUpdate_write(const struct LDKHTLCUpdate *NONNULL_PTR obj);
	public static native Uint8Array HTLCUpdate_write(number obj);
	// struct LDKHTLCUpdate HTLCUpdate_read(struct LDKu8slice ser);
	public static native number HTLCUpdate_read(Uint8Array ser);
	// void ChannelMonitor_free(struct LDKChannelMonitor this_ptr);
	public static native void ChannelMonitor_free(number this_ptr);
	// struct LDKCVec_u8Z ChannelMonitor_write(const struct LDKChannelMonitor *NONNULL_PTR obj);
	public static native Uint8Array ChannelMonitor_write(number obj);
	// MUST_USE_RES struct LDKCResult_NoneMonitorUpdateErrorZ ChannelMonitor_update_monitor(struct LDKChannelMonitor *NONNULL_PTR this_arg, const struct LDKChannelMonitorUpdate *NONNULL_PTR updates, const struct LDKBroadcasterInterface *NONNULL_PTR broadcaster, const struct LDKFeeEstimator *NONNULL_PTR fee_estimator, const struct LDKLogger *NONNULL_PTR logger);
	public static native number ChannelMonitor_update_monitor(number this_arg, number updates, number broadcaster, number fee_estimator, number logger);
	// MUST_USE_RES uint64_t ChannelMonitor_get_latest_update_id(const struct LDKChannelMonitor *NONNULL_PTR this_arg);
	public static native number ChannelMonitor_get_latest_update_id(number this_arg);
	// MUST_USE_RES struct LDKC2Tuple_OutPointScriptZ ChannelMonitor_get_funding_txo(const struct LDKChannelMonitor *NONNULL_PTR this_arg);
	public static native number ChannelMonitor_get_funding_txo(number this_arg);
	// MUST_USE_RES struct LDKCVec_MonitorEventZ ChannelMonitor_get_and_clear_pending_monitor_events(struct LDKChannelMonitor *NONNULL_PTR this_arg);
	public static native number[] ChannelMonitor_get_and_clear_pending_monitor_events(number this_arg);
	// MUST_USE_RES struct LDKCVec_EventZ ChannelMonitor_get_and_clear_pending_events(struct LDKChannelMonitor *NONNULL_PTR this_arg);
	public static native number[] ChannelMonitor_get_and_clear_pending_events(number this_arg);
	// MUST_USE_RES struct LDKCVec_TransactionZ ChannelMonitor_get_latest_holder_commitment_txn(struct LDKChannelMonitor *NONNULL_PTR this_arg, const struct LDKLogger *NONNULL_PTR logger);
	public static native Uint8Array[] ChannelMonitor_get_latest_holder_commitment_txn(number this_arg, number logger);
	// MUST_USE_RES struct LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ ChannelMonitor_block_connected(struct LDKChannelMonitor *NONNULL_PTR this_arg, const uint8_t (*header)[80], struct LDKCVec_C2Tuple_usizeTransactionZZ txdata, uint32_t height, struct LDKBroadcasterInterface broadcaster, struct LDKFeeEstimator fee_estimator, struct LDKLogger logger);
	public static native number[] ChannelMonitor_block_connected(number this_arg, Uint8Array header, number[] txdata, number height, number broadcaster, number fee_estimator, number logger);
	// void ChannelMonitor_block_disconnected(struct LDKChannelMonitor *NONNULL_PTR this_arg, const uint8_t (*header)[80], uint32_t height, struct LDKBroadcasterInterface broadcaster, struct LDKFeeEstimator fee_estimator, struct LDKLogger logger);
	public static native void ChannelMonitor_block_disconnected(number this_arg, Uint8Array header, number height, number broadcaster, number fee_estimator, number logger);
	// void Persist_free(struct LDKPersist this_ptr);
	public static native void Persist_free(number this_ptr);
	// struct LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ C2Tuple_BlockHashChannelMonitorZ_read(struct LDKu8slice ser, const struct LDKKeysInterface *NONNULL_PTR arg);
	public static native number C2Tuple_BlockHashChannelMonitorZ_read(Uint8Array ser, number arg);
	// void OutPoint_free(struct LDKOutPoint this_ptr);
	public static native void OutPoint_free(number this_ptr);
	// struct LDKOutPoint OutPoint_clone(const struct LDKOutPoint *NONNULL_PTR orig);
	public static native number OutPoint_clone(number orig);
	// const uint8_t (*OutPoint_get_txid(const struct LDKOutPoint *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array OutPoint_get_txid(number this_ptr);
	// void OutPoint_set_txid(struct LDKOutPoint *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void OutPoint_set_txid(number this_ptr, Uint8Array val);
	// uint16_t OutPoint_get_index(const struct LDKOutPoint *NONNULL_PTR this_ptr);
	public static native number OutPoint_get_index(number this_ptr);
	// void OutPoint_set_index(struct LDKOutPoint *NONNULL_PTR this_ptr, uint16_t val);
	public static native void OutPoint_set_index(number this_ptr, number val);
	// MUST_USE_RES struct LDKOutPoint OutPoint_new(struct LDKThirtyTwoBytes txid_arg, uint16_t index_arg);
	public static native number OutPoint_new(Uint8Array txid_arg, number index_arg);
	// MUST_USE_RES struct LDKThirtyTwoBytes OutPoint_to_channel_id(const struct LDKOutPoint *NONNULL_PTR this_arg);
	public static native Uint8Array OutPoint_to_channel_id(number this_arg);
	// struct LDKCVec_u8Z OutPoint_write(const struct LDKOutPoint *NONNULL_PTR obj);
	public static native Uint8Array OutPoint_write(number obj);
	// struct LDKOutPoint OutPoint_read(struct LDKu8slice ser);
	public static native number OutPoint_read(Uint8Array ser);
	// void SpendableOutputDescriptor_free(struct LDKSpendableOutputDescriptor this_ptr);
	public static native void SpendableOutputDescriptor_free(number this_ptr);
	// struct LDKSpendableOutputDescriptor SpendableOutputDescriptor_clone(const struct LDKSpendableOutputDescriptor *NONNULL_PTR orig);
	public static native number SpendableOutputDescriptor_clone(number orig);
	// struct LDKCVec_u8Z SpendableOutputDescriptor_write(const struct LDKSpendableOutputDescriptor *NONNULL_PTR obj);
	public static native Uint8Array SpendableOutputDescriptor_write(number obj);
	// struct LDKCResult_SpendableOutputDescriptorDecodeErrorZ SpendableOutputDescriptor_read(struct LDKu8slice ser);
	public static native number SpendableOutputDescriptor_read(Uint8Array ser);
	// struct LDKChannelKeys ChannelKeys_clone(const struct LDKChannelKeys *NONNULL_PTR orig);
	public static native number ChannelKeys_clone(number orig);
	// void ChannelKeys_free(struct LDKChannelKeys this_ptr);
	public static native void ChannelKeys_free(number this_ptr);
	// void KeysInterface_free(struct LDKKeysInterface this_ptr);
	public static native void KeysInterface_free(number this_ptr);
	// void InMemoryChannelKeys_free(struct LDKInMemoryChannelKeys this_ptr);
	public static native void InMemoryChannelKeys_free(number this_ptr);
	// struct LDKInMemoryChannelKeys InMemoryChannelKeys_clone(const struct LDKInMemoryChannelKeys *NONNULL_PTR orig);
	public static native number InMemoryChannelKeys_clone(number orig);
	// const uint8_t (*InMemoryChannelKeys_get_funding_key(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array InMemoryChannelKeys_get_funding_key(number this_ptr);
	// void InMemoryChannelKeys_set_funding_key(struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr, struct LDKSecretKey val);
	public static native void InMemoryChannelKeys_set_funding_key(number this_ptr, Uint8Array val);
	// const uint8_t (*InMemoryChannelKeys_get_revocation_base_key(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array InMemoryChannelKeys_get_revocation_base_key(number this_ptr);
	// void InMemoryChannelKeys_set_revocation_base_key(struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr, struct LDKSecretKey val);
	public static native void InMemoryChannelKeys_set_revocation_base_key(number this_ptr, Uint8Array val);
	// const uint8_t (*InMemoryChannelKeys_get_payment_key(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array InMemoryChannelKeys_get_payment_key(number this_ptr);
	// void InMemoryChannelKeys_set_payment_key(struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr, struct LDKSecretKey val);
	public static native void InMemoryChannelKeys_set_payment_key(number this_ptr, Uint8Array val);
	// const uint8_t (*InMemoryChannelKeys_get_delayed_payment_base_key(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array InMemoryChannelKeys_get_delayed_payment_base_key(number this_ptr);
	// void InMemoryChannelKeys_set_delayed_payment_base_key(struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr, struct LDKSecretKey val);
	public static native void InMemoryChannelKeys_set_delayed_payment_base_key(number this_ptr, Uint8Array val);
	// const uint8_t (*InMemoryChannelKeys_get_htlc_base_key(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array InMemoryChannelKeys_get_htlc_base_key(number this_ptr);
	// void InMemoryChannelKeys_set_htlc_base_key(struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr, struct LDKSecretKey val);
	public static native void InMemoryChannelKeys_set_htlc_base_key(number this_ptr, Uint8Array val);
	// const uint8_t (*InMemoryChannelKeys_get_commitment_seed(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array InMemoryChannelKeys_get_commitment_seed(number this_ptr);
	// void InMemoryChannelKeys_set_commitment_seed(struct LDKInMemoryChannelKeys *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void InMemoryChannelKeys_set_commitment_seed(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKInMemoryChannelKeys InMemoryChannelKeys_new(struct LDKSecretKey funding_key, struct LDKSecretKey revocation_base_key, struct LDKSecretKey payment_key, struct LDKSecretKey delayed_payment_base_key, struct LDKSecretKey htlc_base_key, struct LDKThirtyTwoBytes commitment_seed, uint64_t channel_value_satoshis, struct LDKC2Tuple_u64u64Z key_derivation_params);
	public static native number InMemoryChannelKeys_new(Uint8Array funding_key, Uint8Array revocation_base_key, Uint8Array payment_key, Uint8Array delayed_payment_base_key, Uint8Array htlc_base_key, Uint8Array commitment_seed, number channel_value_satoshis, number key_derivation_params);
	// MUST_USE_RES struct LDKChannelPublicKeys InMemoryChannelKeys_counterparty_pubkeys(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_arg);
	public static native number InMemoryChannelKeys_counterparty_pubkeys(number this_arg);
	// MUST_USE_RES uint16_t InMemoryChannelKeys_counterparty_selected_contest_delay(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_arg);
	public static native number InMemoryChannelKeys_counterparty_selected_contest_delay(number this_arg);
	// MUST_USE_RES uint16_t InMemoryChannelKeys_holder_selected_contest_delay(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_arg);
	public static native number InMemoryChannelKeys_holder_selected_contest_delay(number this_arg);
	// MUST_USE_RES bool InMemoryChannelKeys_is_outbound(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_arg);
	public static native boolean InMemoryChannelKeys_is_outbound(number this_arg);
	// MUST_USE_RES struct LDKOutPoint InMemoryChannelKeys_funding_outpoint(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_arg);
	public static native number InMemoryChannelKeys_funding_outpoint(number this_arg);
	// MUST_USE_RES struct LDKChannelTransactionParameters InMemoryChannelKeys_get_channel_parameters(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_arg);
	public static native number InMemoryChannelKeys_get_channel_parameters(number this_arg);
	// struct LDKChannelKeys InMemoryChannelKeys_as_ChannelKeys(const struct LDKInMemoryChannelKeys *NONNULL_PTR this_arg);
	public static native number InMemoryChannelKeys_as_ChannelKeys(number this_arg);
	// struct LDKCVec_u8Z InMemoryChannelKeys_write(const struct LDKInMemoryChannelKeys *NONNULL_PTR obj);
	public static native Uint8Array InMemoryChannelKeys_write(number obj);
	// struct LDKCResult_InMemoryChannelKeysDecodeErrorZ InMemoryChannelKeys_read(struct LDKu8slice ser);
	public static native number InMemoryChannelKeys_read(Uint8Array ser);
	// void KeysManager_free(struct LDKKeysManager this_ptr);
	public static native void KeysManager_free(number this_ptr);
	// MUST_USE_RES struct LDKKeysManager KeysManager_new(const uint8_t (*seed)[32], enum LDKNetwork network, uint64_t starting_time_secs, uint32_t starting_time_nanos);
	public static native number KeysManager_new(Uint8Array seed, LDKNetwork network, number starting_time_secs, number starting_time_nanos);
	// MUST_USE_RES struct LDKInMemoryChannelKeys KeysManager_derive_channel_keys(const struct LDKKeysManager *NONNULL_PTR this_arg, uint64_t channel_value_satoshis, uint64_t params_1, uint64_t params_2);
	public static native number KeysManager_derive_channel_keys(number this_arg, number channel_value_satoshis, number params_1, number params_2);
	// struct LDKKeysInterface KeysManager_as_KeysInterface(const struct LDKKeysManager *NONNULL_PTR this_arg);
	public static native number KeysManager_as_KeysInterface(number this_arg);
	// void ChannelManager_free(struct LDKChannelManager this_ptr);
	public static native void ChannelManager_free(number this_ptr);
	// void ChannelDetails_free(struct LDKChannelDetails this_ptr);
	public static native void ChannelDetails_free(number this_ptr);
	// struct LDKChannelDetails ChannelDetails_clone(const struct LDKChannelDetails *NONNULL_PTR orig);
	public static native number ChannelDetails_clone(number orig);
	// const uint8_t (*ChannelDetails_get_channel_id(const struct LDKChannelDetails *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array ChannelDetails_get_channel_id(number this_ptr);
	// void ChannelDetails_set_channel_id(struct LDKChannelDetails *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void ChannelDetails_set_channel_id(number this_ptr, Uint8Array val);
	// struct LDKPublicKey ChannelDetails_get_remote_network_id(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelDetails_get_remote_network_id(number this_ptr);
	// void ChannelDetails_set_remote_network_id(struct LDKChannelDetails *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void ChannelDetails_set_remote_network_id(number this_ptr, Uint8Array val);
	// struct LDKInitFeatures ChannelDetails_get_counterparty_features(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	public static native number ChannelDetails_get_counterparty_features(number this_ptr);
	// void ChannelDetails_set_counterparty_features(struct LDKChannelDetails *NONNULL_PTR this_ptr, struct LDKInitFeatures val);
	public static native void ChannelDetails_set_counterparty_features(number this_ptr, number val);
	// uint64_t ChannelDetails_get_channel_value_satoshis(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	public static native number ChannelDetails_get_channel_value_satoshis(number this_ptr);
	// void ChannelDetails_set_channel_value_satoshis(struct LDKChannelDetails *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelDetails_set_channel_value_satoshis(number this_ptr, number val);
	// uint64_t ChannelDetails_get_user_id(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	public static native number ChannelDetails_get_user_id(number this_ptr);
	// void ChannelDetails_set_user_id(struct LDKChannelDetails *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelDetails_set_user_id(number this_ptr, number val);
	// uint64_t ChannelDetails_get_outbound_capacity_msat(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	public static native number ChannelDetails_get_outbound_capacity_msat(number this_ptr);
	// void ChannelDetails_set_outbound_capacity_msat(struct LDKChannelDetails *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelDetails_set_outbound_capacity_msat(number this_ptr, number val);
	// uint64_t ChannelDetails_get_inbound_capacity_msat(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	public static native number ChannelDetails_get_inbound_capacity_msat(number this_ptr);
	// void ChannelDetails_set_inbound_capacity_msat(struct LDKChannelDetails *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelDetails_set_inbound_capacity_msat(number this_ptr, number val);
	// bool ChannelDetails_get_is_live(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	public static native boolean ChannelDetails_get_is_live(number this_ptr);
	// void ChannelDetails_set_is_live(struct LDKChannelDetails *NONNULL_PTR this_ptr, bool val);
	public static native void ChannelDetails_set_is_live(number this_ptr, boolean val);
	// void PaymentSendFailure_free(struct LDKPaymentSendFailure this_ptr);
	public static native void PaymentSendFailure_free(number this_ptr);
	// MUST_USE_RES struct LDKChannelManager ChannelManager_new(enum LDKNetwork network, struct LDKFeeEstimator fee_est, struct LDKWatch chain_monitor, struct LDKBroadcasterInterface tx_broadcaster, struct LDKLogger logger, struct LDKKeysInterface keys_manager, struct LDKUserConfig config, uintptr_t current_blockchain_height);
	public static native number ChannelManager_new(LDKNetwork network, number fee_est, number chain_monitor, number tx_broadcaster, number logger, number keys_manager, number config, number current_blockchain_height);
	// MUST_USE_RES struct LDKCResult_NoneAPIErrorZ ChannelManager_create_channel(const struct LDKChannelManager *NONNULL_PTR this_arg, struct LDKPublicKey their_network_key, uint64_t channel_value_satoshis, uint64_t push_msat, uint64_t user_id, struct LDKUserConfig override_config);
	public static native number ChannelManager_create_channel(number this_arg, Uint8Array their_network_key, number channel_value_satoshis, number push_msat, number user_id, number override_config);
	// MUST_USE_RES struct LDKCVec_ChannelDetailsZ ChannelManager_list_channels(const struct LDKChannelManager *NONNULL_PTR this_arg);
	public static native number[] ChannelManager_list_channels(number this_arg);
	// MUST_USE_RES struct LDKCVec_ChannelDetailsZ ChannelManager_list_usable_channels(const struct LDKChannelManager *NONNULL_PTR this_arg);
	public static native number[] ChannelManager_list_usable_channels(number this_arg);
	// MUST_USE_RES struct LDKCResult_NoneAPIErrorZ ChannelManager_close_channel(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*channel_id)[32]);
	public static native number ChannelManager_close_channel(number this_arg, Uint8Array channel_id);
	// void ChannelManager_force_close_channel(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*channel_id)[32]);
	public static native void ChannelManager_force_close_channel(number this_arg, Uint8Array channel_id);
	// void ChannelManager_force_close_all_channels(const struct LDKChannelManager *NONNULL_PTR this_arg);
	public static native void ChannelManager_force_close_all_channels(number this_arg);
	// MUST_USE_RES struct LDKCResult_NonePaymentSendFailureZ ChannelManager_send_payment(const struct LDKChannelManager *NONNULL_PTR this_arg, const struct LDKRoute *NONNULL_PTR route, struct LDKThirtyTwoBytes payment_hash, struct LDKThirtyTwoBytes payment_secret);
	public static native number ChannelManager_send_payment(number this_arg, number route, Uint8Array payment_hash, Uint8Array payment_secret);
	// void ChannelManager_funding_transaction_generated(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*temporary_channel_id)[32], struct LDKOutPoint funding_txo);
	public static native void ChannelManager_funding_transaction_generated(number this_arg, Uint8Array temporary_channel_id, number funding_txo);
	// void ChannelManager_broadcast_node_announcement(const struct LDKChannelManager *NONNULL_PTR this_arg, struct LDKThreeBytes rgb, struct LDKThirtyTwoBytes alias, struct LDKCVec_NetAddressZ addresses);
	public static native void ChannelManager_broadcast_node_announcement(number this_arg, Uint8Array rgb, Uint8Array alias, number[] addresses);
	// void ChannelManager_process_pending_htlc_forwards(const struct LDKChannelManager *NONNULL_PTR this_arg);
	public static native void ChannelManager_process_pending_htlc_forwards(number this_arg);
	// void ChannelManager_timer_chan_freshness_every_min(const struct LDKChannelManager *NONNULL_PTR this_arg);
	public static native void ChannelManager_timer_chan_freshness_every_min(number this_arg);
	// MUST_USE_RES bool ChannelManager_fail_htlc_backwards(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*payment_hash)[32], struct LDKThirtyTwoBytes payment_secret);
	public static native boolean ChannelManager_fail_htlc_backwards(number this_arg, Uint8Array payment_hash, Uint8Array payment_secret);
	// MUST_USE_RES bool ChannelManager_claim_funds(const struct LDKChannelManager *NONNULL_PTR this_arg, struct LDKThirtyTwoBytes payment_preimage, struct LDKThirtyTwoBytes payment_secret, uint64_t expected_amount);
	public static native boolean ChannelManager_claim_funds(number this_arg, Uint8Array payment_preimage, Uint8Array payment_secret, number expected_amount);
	// MUST_USE_RES struct LDKPublicKey ChannelManager_get_our_node_id(const struct LDKChannelManager *NONNULL_PTR this_arg);
	public static native Uint8Array ChannelManager_get_our_node_id(number this_arg);
	// void ChannelManager_channel_monitor_updated(const struct LDKChannelManager *NONNULL_PTR this_arg, const struct LDKOutPoint *NONNULL_PTR funding_txo, uint64_t highest_applied_update_id);
	public static native void ChannelManager_channel_monitor_updated(number this_arg, number funding_txo, number highest_applied_update_id);
	// struct LDKMessageSendEventsProvider ChannelManager_as_MessageSendEventsProvider(const struct LDKChannelManager *NONNULL_PTR this_arg);
	public static native number ChannelManager_as_MessageSendEventsProvider(number this_arg);
	// struct LDKEventsProvider ChannelManager_as_EventsProvider(const struct LDKChannelManager *NONNULL_PTR this_arg);
	public static native number ChannelManager_as_EventsProvider(number this_arg);
	// void ChannelManager_block_connected(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*header)[80], struct LDKCVec_C2Tuple_usizeTransactionZZ txdata, uint32_t height);
	public static native void ChannelManager_block_connected(number this_arg, Uint8Array header, number[] txdata, number height);
	// void ChannelManager_block_disconnected(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*header)[80]);
	public static native void ChannelManager_block_disconnected(number this_arg, Uint8Array header);
	// struct LDKChannelMessageHandler ChannelManager_as_ChannelMessageHandler(const struct LDKChannelManager *NONNULL_PTR this_arg);
	public static native number ChannelManager_as_ChannelMessageHandler(number this_arg);
	// struct LDKCVec_u8Z ChannelManager_write(const struct LDKChannelManager *NONNULL_PTR obj);
	public static native Uint8Array ChannelManager_write(number obj);
	// void ChannelManagerReadArgs_free(struct LDKChannelManagerReadArgs this_ptr);
	public static native void ChannelManagerReadArgs_free(number this_ptr);
	// const struct LDKKeysInterface *ChannelManagerReadArgs_get_keys_manager(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	public static native number ChannelManagerReadArgs_get_keys_manager(number this_ptr);
	// void ChannelManagerReadArgs_set_keys_manager(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKKeysInterface val);
	public static native void ChannelManagerReadArgs_set_keys_manager(number this_ptr, number val);
	// const struct LDKFeeEstimator *ChannelManagerReadArgs_get_fee_estimator(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	public static native number ChannelManagerReadArgs_get_fee_estimator(number this_ptr);
	// void ChannelManagerReadArgs_set_fee_estimator(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKFeeEstimator val);
	public static native void ChannelManagerReadArgs_set_fee_estimator(number this_ptr, number val);
	// const struct LDKWatch *ChannelManagerReadArgs_get_chain_monitor(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	public static native number ChannelManagerReadArgs_get_chain_monitor(number this_ptr);
	// void ChannelManagerReadArgs_set_chain_monitor(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKWatch val);
	public static native void ChannelManagerReadArgs_set_chain_monitor(number this_ptr, number val);
	// const struct LDKBroadcasterInterface *ChannelManagerReadArgs_get_tx_broadcaster(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	public static native number ChannelManagerReadArgs_get_tx_broadcaster(number this_ptr);
	// void ChannelManagerReadArgs_set_tx_broadcaster(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKBroadcasterInterface val);
	public static native void ChannelManagerReadArgs_set_tx_broadcaster(number this_ptr, number val);
	// const struct LDKLogger *ChannelManagerReadArgs_get_logger(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	public static native number ChannelManagerReadArgs_get_logger(number this_ptr);
	// void ChannelManagerReadArgs_set_logger(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKLogger val);
	public static native void ChannelManagerReadArgs_set_logger(number this_ptr, number val);
	// struct LDKUserConfig ChannelManagerReadArgs_get_default_config(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	public static native number ChannelManagerReadArgs_get_default_config(number this_ptr);
	// void ChannelManagerReadArgs_set_default_config(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKUserConfig val);
	public static native void ChannelManagerReadArgs_set_default_config(number this_ptr, number val);
	// MUST_USE_RES struct LDKChannelManagerReadArgs ChannelManagerReadArgs_new(struct LDKKeysInterface keys_manager, struct LDKFeeEstimator fee_estimator, struct LDKWatch chain_monitor, struct LDKBroadcasterInterface tx_broadcaster, struct LDKLogger logger, struct LDKUserConfig default_config, struct LDKCVec_ChannelMonitorZ channel_monitors);
	public static native number ChannelManagerReadArgs_new(number keys_manager, number fee_estimator, number chain_monitor, number tx_broadcaster, number logger, number default_config, number[] channel_monitors);
	// struct LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ C2Tuple_BlockHashChannelManagerZ_read(struct LDKu8slice ser, struct LDKChannelManagerReadArgs arg);
	public static native number C2Tuple_BlockHashChannelManagerZ_read(Uint8Array ser, number arg);
	// void DecodeError_free(struct LDKDecodeError this_ptr);
	public static native void DecodeError_free(number this_ptr);
	// void Init_free(struct LDKInit this_ptr);
	public static native void Init_free(number this_ptr);
	// struct LDKInit Init_clone(const struct LDKInit *NONNULL_PTR orig);
	public static native number Init_clone(number orig);
	// void ErrorMessage_free(struct LDKErrorMessage this_ptr);
	public static native void ErrorMessage_free(number this_ptr);
	// struct LDKErrorMessage ErrorMessage_clone(const struct LDKErrorMessage *NONNULL_PTR orig);
	public static native number ErrorMessage_clone(number orig);
	// const uint8_t (*ErrorMessage_get_channel_id(const struct LDKErrorMessage *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array ErrorMessage_get_channel_id(number this_ptr);
	// void ErrorMessage_set_channel_id(struct LDKErrorMessage *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void ErrorMessage_set_channel_id(number this_ptr, Uint8Array val);
	// struct LDKStr ErrorMessage_get_data(const struct LDKErrorMessage *NONNULL_PTR this_ptr);
	public static native String ErrorMessage_get_data(number this_ptr);
	// void ErrorMessage_set_data(struct LDKErrorMessage *NONNULL_PTR this_ptr, struct LDKCVec_u8Z val);
	public static native void ErrorMessage_set_data(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKErrorMessage ErrorMessage_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKCVec_u8Z data_arg);
	public static native number ErrorMessage_new(Uint8Array channel_id_arg, Uint8Array data_arg);
	// void Ping_free(struct LDKPing this_ptr);
	public static native void Ping_free(number this_ptr);
	// struct LDKPing Ping_clone(const struct LDKPing *NONNULL_PTR orig);
	public static native number Ping_clone(number orig);
	// uint16_t Ping_get_ponglen(const struct LDKPing *NONNULL_PTR this_ptr);
	public static native number Ping_get_ponglen(number this_ptr);
	// void Ping_set_ponglen(struct LDKPing *NONNULL_PTR this_ptr, uint16_t val);
	public static native void Ping_set_ponglen(number this_ptr, number val);
	// uint16_t Ping_get_byteslen(const struct LDKPing *NONNULL_PTR this_ptr);
	public static native number Ping_get_byteslen(number this_ptr);
	// void Ping_set_byteslen(struct LDKPing *NONNULL_PTR this_ptr, uint16_t val);
	public static native void Ping_set_byteslen(number this_ptr, number val);
	// MUST_USE_RES struct LDKPing Ping_new(uint16_t ponglen_arg, uint16_t byteslen_arg);
	public static native number Ping_new(number ponglen_arg, number byteslen_arg);
	// void Pong_free(struct LDKPong this_ptr);
	public static native void Pong_free(number this_ptr);
	// struct LDKPong Pong_clone(const struct LDKPong *NONNULL_PTR orig);
	public static native number Pong_clone(number orig);
	// uint16_t Pong_get_byteslen(const struct LDKPong *NONNULL_PTR this_ptr);
	public static native number Pong_get_byteslen(number this_ptr);
	// void Pong_set_byteslen(struct LDKPong *NONNULL_PTR this_ptr, uint16_t val);
	public static native void Pong_set_byteslen(number this_ptr, number val);
	// MUST_USE_RES struct LDKPong Pong_new(uint16_t byteslen_arg);
	public static native number Pong_new(number byteslen_arg);
	// void OpenChannel_free(struct LDKOpenChannel this_ptr);
	public static native void OpenChannel_free(number this_ptr);
	// struct LDKOpenChannel OpenChannel_clone(const struct LDKOpenChannel *NONNULL_PTR orig);
	public static native number OpenChannel_clone(number orig);
	// const uint8_t (*OpenChannel_get_chain_hash(const struct LDKOpenChannel *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array OpenChannel_get_chain_hash(number this_ptr);
	// void OpenChannel_set_chain_hash(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void OpenChannel_set_chain_hash(number this_ptr, Uint8Array val);
	// const uint8_t (*OpenChannel_get_temporary_channel_id(const struct LDKOpenChannel *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array OpenChannel_get_temporary_channel_id(number this_ptr);
	// void OpenChannel_set_temporary_channel_id(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void OpenChannel_set_temporary_channel_id(number this_ptr, Uint8Array val);
	// uint64_t OpenChannel_get_funding_satoshis(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native number OpenChannel_get_funding_satoshis(number this_ptr);
	// void OpenChannel_set_funding_satoshis(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	public static native void OpenChannel_set_funding_satoshis(number this_ptr, number val);
	// uint64_t OpenChannel_get_push_msat(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native number OpenChannel_get_push_msat(number this_ptr);
	// void OpenChannel_set_push_msat(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	public static native void OpenChannel_set_push_msat(number this_ptr, number val);
	// uint64_t OpenChannel_get_dust_limit_satoshis(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native number OpenChannel_get_dust_limit_satoshis(number this_ptr);
	// void OpenChannel_set_dust_limit_satoshis(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	public static native void OpenChannel_set_dust_limit_satoshis(number this_ptr, number val);
	// uint64_t OpenChannel_get_max_htlc_value_in_flight_msat(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native number OpenChannel_get_max_htlc_value_in_flight_msat(number this_ptr);
	// void OpenChannel_set_max_htlc_value_in_flight_msat(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	public static native void OpenChannel_set_max_htlc_value_in_flight_msat(number this_ptr, number val);
	// uint64_t OpenChannel_get_channel_reserve_satoshis(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native number OpenChannel_get_channel_reserve_satoshis(number this_ptr);
	// void OpenChannel_set_channel_reserve_satoshis(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	public static native void OpenChannel_set_channel_reserve_satoshis(number this_ptr, number val);
	// uint64_t OpenChannel_get_htlc_minimum_msat(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native number OpenChannel_get_htlc_minimum_msat(number this_ptr);
	// void OpenChannel_set_htlc_minimum_msat(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	public static native void OpenChannel_set_htlc_minimum_msat(number this_ptr, number val);
	// uint32_t OpenChannel_get_feerate_per_kw(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native number OpenChannel_get_feerate_per_kw(number this_ptr);
	// void OpenChannel_set_feerate_per_kw(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint32_t val);
	public static native void OpenChannel_set_feerate_per_kw(number this_ptr, number val);
	// uint16_t OpenChannel_get_to_self_delay(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native number OpenChannel_get_to_self_delay(number this_ptr);
	// void OpenChannel_set_to_self_delay(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint16_t val);
	public static native void OpenChannel_set_to_self_delay(number this_ptr, number val);
	// uint16_t OpenChannel_get_max_accepted_htlcs(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native number OpenChannel_get_max_accepted_htlcs(number this_ptr);
	// void OpenChannel_set_max_accepted_htlcs(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint16_t val);
	public static native void OpenChannel_set_max_accepted_htlcs(number this_ptr, number val);
	// struct LDKPublicKey OpenChannel_get_funding_pubkey(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array OpenChannel_get_funding_pubkey(number this_ptr);
	// void OpenChannel_set_funding_pubkey(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void OpenChannel_set_funding_pubkey(number this_ptr, Uint8Array val);
	// struct LDKPublicKey OpenChannel_get_revocation_basepoint(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array OpenChannel_get_revocation_basepoint(number this_ptr);
	// void OpenChannel_set_revocation_basepoint(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void OpenChannel_set_revocation_basepoint(number this_ptr, Uint8Array val);
	// struct LDKPublicKey OpenChannel_get_payment_point(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array OpenChannel_get_payment_point(number this_ptr);
	// void OpenChannel_set_payment_point(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void OpenChannel_set_payment_point(number this_ptr, Uint8Array val);
	// struct LDKPublicKey OpenChannel_get_delayed_payment_basepoint(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array OpenChannel_get_delayed_payment_basepoint(number this_ptr);
	// void OpenChannel_set_delayed_payment_basepoint(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void OpenChannel_set_delayed_payment_basepoint(number this_ptr, Uint8Array val);
	// struct LDKPublicKey OpenChannel_get_htlc_basepoint(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array OpenChannel_get_htlc_basepoint(number this_ptr);
	// void OpenChannel_set_htlc_basepoint(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void OpenChannel_set_htlc_basepoint(number this_ptr, Uint8Array val);
	// struct LDKPublicKey OpenChannel_get_first_per_commitment_point(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array OpenChannel_get_first_per_commitment_point(number this_ptr);
	// void OpenChannel_set_first_per_commitment_point(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void OpenChannel_set_first_per_commitment_point(number this_ptr, Uint8Array val);
	// uint8_t OpenChannel_get_channel_flags(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	public static native number OpenChannel_get_channel_flags(number this_ptr);
	// void OpenChannel_set_channel_flags(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint8_t val);
	public static native void OpenChannel_set_channel_flags(number this_ptr, number val);
	// void AcceptChannel_free(struct LDKAcceptChannel this_ptr);
	public static native void AcceptChannel_free(number this_ptr);
	// struct LDKAcceptChannel AcceptChannel_clone(const struct LDKAcceptChannel *NONNULL_PTR orig);
	public static native number AcceptChannel_clone(number orig);
	// const uint8_t (*AcceptChannel_get_temporary_channel_id(const struct LDKAcceptChannel *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array AcceptChannel_get_temporary_channel_id(number this_ptr);
	// void AcceptChannel_set_temporary_channel_id(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void AcceptChannel_set_temporary_channel_id(number this_ptr, Uint8Array val);
	// uint64_t AcceptChannel_get_dust_limit_satoshis(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native number AcceptChannel_get_dust_limit_satoshis(number this_ptr);
	// void AcceptChannel_set_dust_limit_satoshis(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint64_t val);
	public static native void AcceptChannel_set_dust_limit_satoshis(number this_ptr, number val);
	// uint64_t AcceptChannel_get_max_htlc_value_in_flight_msat(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native number AcceptChannel_get_max_htlc_value_in_flight_msat(number this_ptr);
	// void AcceptChannel_set_max_htlc_value_in_flight_msat(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint64_t val);
	public static native void AcceptChannel_set_max_htlc_value_in_flight_msat(number this_ptr, number val);
	// uint64_t AcceptChannel_get_channel_reserve_satoshis(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native number AcceptChannel_get_channel_reserve_satoshis(number this_ptr);
	// void AcceptChannel_set_channel_reserve_satoshis(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint64_t val);
	public static native void AcceptChannel_set_channel_reserve_satoshis(number this_ptr, number val);
	// uint64_t AcceptChannel_get_htlc_minimum_msat(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native number AcceptChannel_get_htlc_minimum_msat(number this_ptr);
	// void AcceptChannel_set_htlc_minimum_msat(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint64_t val);
	public static native void AcceptChannel_set_htlc_minimum_msat(number this_ptr, number val);
	// uint32_t AcceptChannel_get_minimum_depth(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native number AcceptChannel_get_minimum_depth(number this_ptr);
	// void AcceptChannel_set_minimum_depth(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint32_t val);
	public static native void AcceptChannel_set_minimum_depth(number this_ptr, number val);
	// uint16_t AcceptChannel_get_to_self_delay(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native number AcceptChannel_get_to_self_delay(number this_ptr);
	// void AcceptChannel_set_to_self_delay(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint16_t val);
	public static native void AcceptChannel_set_to_self_delay(number this_ptr, number val);
	// uint16_t AcceptChannel_get_max_accepted_htlcs(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native number AcceptChannel_get_max_accepted_htlcs(number this_ptr);
	// void AcceptChannel_set_max_accepted_htlcs(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint16_t val);
	public static native void AcceptChannel_set_max_accepted_htlcs(number this_ptr, number val);
	// struct LDKPublicKey AcceptChannel_get_funding_pubkey(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array AcceptChannel_get_funding_pubkey(number this_ptr);
	// void AcceptChannel_set_funding_pubkey(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void AcceptChannel_set_funding_pubkey(number this_ptr, Uint8Array val);
	// struct LDKPublicKey AcceptChannel_get_revocation_basepoint(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array AcceptChannel_get_revocation_basepoint(number this_ptr);
	// void AcceptChannel_set_revocation_basepoint(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void AcceptChannel_set_revocation_basepoint(number this_ptr, Uint8Array val);
	// struct LDKPublicKey AcceptChannel_get_payment_point(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array AcceptChannel_get_payment_point(number this_ptr);
	// void AcceptChannel_set_payment_point(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void AcceptChannel_set_payment_point(number this_ptr, Uint8Array val);
	// struct LDKPublicKey AcceptChannel_get_delayed_payment_basepoint(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array AcceptChannel_get_delayed_payment_basepoint(number this_ptr);
	// void AcceptChannel_set_delayed_payment_basepoint(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void AcceptChannel_set_delayed_payment_basepoint(number this_ptr, Uint8Array val);
	// struct LDKPublicKey AcceptChannel_get_htlc_basepoint(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array AcceptChannel_get_htlc_basepoint(number this_ptr);
	// void AcceptChannel_set_htlc_basepoint(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void AcceptChannel_set_htlc_basepoint(number this_ptr, Uint8Array val);
	// struct LDKPublicKey AcceptChannel_get_first_per_commitment_point(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	public static native Uint8Array AcceptChannel_get_first_per_commitment_point(number this_ptr);
	// void AcceptChannel_set_first_per_commitment_point(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void AcceptChannel_set_first_per_commitment_point(number this_ptr, Uint8Array val);
	// void FundingCreated_free(struct LDKFundingCreated this_ptr);
	public static native void FundingCreated_free(number this_ptr);
	// struct LDKFundingCreated FundingCreated_clone(const struct LDKFundingCreated *NONNULL_PTR orig);
	public static native number FundingCreated_clone(number orig);
	// const uint8_t (*FundingCreated_get_temporary_channel_id(const struct LDKFundingCreated *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array FundingCreated_get_temporary_channel_id(number this_ptr);
	// void FundingCreated_set_temporary_channel_id(struct LDKFundingCreated *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void FundingCreated_set_temporary_channel_id(number this_ptr, Uint8Array val);
	// const uint8_t (*FundingCreated_get_funding_txid(const struct LDKFundingCreated *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array FundingCreated_get_funding_txid(number this_ptr);
	// void FundingCreated_set_funding_txid(struct LDKFundingCreated *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void FundingCreated_set_funding_txid(number this_ptr, Uint8Array val);
	// uint16_t FundingCreated_get_funding_output_index(const struct LDKFundingCreated *NONNULL_PTR this_ptr);
	public static native number FundingCreated_get_funding_output_index(number this_ptr);
	// void FundingCreated_set_funding_output_index(struct LDKFundingCreated *NONNULL_PTR this_ptr, uint16_t val);
	public static native void FundingCreated_set_funding_output_index(number this_ptr, number val);
	// struct LDKSignature FundingCreated_get_signature(const struct LDKFundingCreated *NONNULL_PTR this_ptr);
	public static native Uint8Array FundingCreated_get_signature(number this_ptr);
	// void FundingCreated_set_signature(struct LDKFundingCreated *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void FundingCreated_set_signature(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKFundingCreated FundingCreated_new(struct LDKThirtyTwoBytes temporary_channel_id_arg, struct LDKThirtyTwoBytes funding_txid_arg, uint16_t funding_output_index_arg, struct LDKSignature signature_arg);
	public static native number FundingCreated_new(Uint8Array temporary_channel_id_arg, Uint8Array funding_txid_arg, number funding_output_index_arg, Uint8Array signature_arg);
	// void FundingSigned_free(struct LDKFundingSigned this_ptr);
	public static native void FundingSigned_free(number this_ptr);
	// struct LDKFundingSigned FundingSigned_clone(const struct LDKFundingSigned *NONNULL_PTR orig);
	public static native number FundingSigned_clone(number orig);
	// const uint8_t (*FundingSigned_get_channel_id(const struct LDKFundingSigned *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array FundingSigned_get_channel_id(number this_ptr);
	// void FundingSigned_set_channel_id(struct LDKFundingSigned *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void FundingSigned_set_channel_id(number this_ptr, Uint8Array val);
	// struct LDKSignature FundingSigned_get_signature(const struct LDKFundingSigned *NONNULL_PTR this_ptr);
	public static native Uint8Array FundingSigned_get_signature(number this_ptr);
	// void FundingSigned_set_signature(struct LDKFundingSigned *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void FundingSigned_set_signature(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKFundingSigned FundingSigned_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKSignature signature_arg);
	public static native number FundingSigned_new(Uint8Array channel_id_arg, Uint8Array signature_arg);
	// void FundingLocked_free(struct LDKFundingLocked this_ptr);
	public static native void FundingLocked_free(number this_ptr);
	// struct LDKFundingLocked FundingLocked_clone(const struct LDKFundingLocked *NONNULL_PTR orig);
	public static native number FundingLocked_clone(number orig);
	// const uint8_t (*FundingLocked_get_channel_id(const struct LDKFundingLocked *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array FundingLocked_get_channel_id(number this_ptr);
	// void FundingLocked_set_channel_id(struct LDKFundingLocked *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void FundingLocked_set_channel_id(number this_ptr, Uint8Array val);
	// struct LDKPublicKey FundingLocked_get_next_per_commitment_point(const struct LDKFundingLocked *NONNULL_PTR this_ptr);
	public static native Uint8Array FundingLocked_get_next_per_commitment_point(number this_ptr);
	// void FundingLocked_set_next_per_commitment_point(struct LDKFundingLocked *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void FundingLocked_set_next_per_commitment_point(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKFundingLocked FundingLocked_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKPublicKey next_per_commitment_point_arg);
	public static native number FundingLocked_new(Uint8Array channel_id_arg, Uint8Array next_per_commitment_point_arg);
	// void Shutdown_free(struct LDKShutdown this_ptr);
	public static native void Shutdown_free(number this_ptr);
	// struct LDKShutdown Shutdown_clone(const struct LDKShutdown *NONNULL_PTR orig);
	public static native number Shutdown_clone(number orig);
	// const uint8_t (*Shutdown_get_channel_id(const struct LDKShutdown *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array Shutdown_get_channel_id(number this_ptr);
	// void Shutdown_set_channel_id(struct LDKShutdown *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void Shutdown_set_channel_id(number this_ptr, Uint8Array val);
	// struct LDKu8slice Shutdown_get_scriptpubkey(const struct LDKShutdown *NONNULL_PTR this_ptr);
	public static native Uint8Array Shutdown_get_scriptpubkey(number this_ptr);
	// void Shutdown_set_scriptpubkey(struct LDKShutdown *NONNULL_PTR this_ptr, struct LDKCVec_u8Z val);
	public static native void Shutdown_set_scriptpubkey(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKShutdown Shutdown_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKCVec_u8Z scriptpubkey_arg);
	public static native number Shutdown_new(Uint8Array channel_id_arg, Uint8Array scriptpubkey_arg);
	// void ClosingSigned_free(struct LDKClosingSigned this_ptr);
	public static native void ClosingSigned_free(number this_ptr);
	// struct LDKClosingSigned ClosingSigned_clone(const struct LDKClosingSigned *NONNULL_PTR orig);
	public static native number ClosingSigned_clone(number orig);
	// const uint8_t (*ClosingSigned_get_channel_id(const struct LDKClosingSigned *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array ClosingSigned_get_channel_id(number this_ptr);
	// void ClosingSigned_set_channel_id(struct LDKClosingSigned *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void ClosingSigned_set_channel_id(number this_ptr, Uint8Array val);
	// uint64_t ClosingSigned_get_fee_satoshis(const struct LDKClosingSigned *NONNULL_PTR this_ptr);
	public static native number ClosingSigned_get_fee_satoshis(number this_ptr);
	// void ClosingSigned_set_fee_satoshis(struct LDKClosingSigned *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ClosingSigned_set_fee_satoshis(number this_ptr, number val);
	// struct LDKSignature ClosingSigned_get_signature(const struct LDKClosingSigned *NONNULL_PTR this_ptr);
	public static native Uint8Array ClosingSigned_get_signature(number this_ptr);
	// void ClosingSigned_set_signature(struct LDKClosingSigned *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void ClosingSigned_set_signature(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKClosingSigned ClosingSigned_new(struct LDKThirtyTwoBytes channel_id_arg, uint64_t fee_satoshis_arg, struct LDKSignature signature_arg);
	public static native number ClosingSigned_new(Uint8Array channel_id_arg, number fee_satoshis_arg, Uint8Array signature_arg);
	// void UpdateAddHTLC_free(struct LDKUpdateAddHTLC this_ptr);
	public static native void UpdateAddHTLC_free(number this_ptr);
	// struct LDKUpdateAddHTLC UpdateAddHTLC_clone(const struct LDKUpdateAddHTLC *NONNULL_PTR orig);
	public static native number UpdateAddHTLC_clone(number orig);
	// const uint8_t (*UpdateAddHTLC_get_channel_id(const struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array UpdateAddHTLC_get_channel_id(number this_ptr);
	// void UpdateAddHTLC_set_channel_id(struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void UpdateAddHTLC_set_channel_id(number this_ptr, Uint8Array val);
	// uint64_t UpdateAddHTLC_get_htlc_id(const struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr);
	public static native number UpdateAddHTLC_get_htlc_id(number this_ptr);
	// void UpdateAddHTLC_set_htlc_id(struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr, uint64_t val);
	public static native void UpdateAddHTLC_set_htlc_id(number this_ptr, number val);
	// uint64_t UpdateAddHTLC_get_amount_msat(const struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr);
	public static native number UpdateAddHTLC_get_amount_msat(number this_ptr);
	// void UpdateAddHTLC_set_amount_msat(struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr, uint64_t val);
	public static native void UpdateAddHTLC_set_amount_msat(number this_ptr, number val);
	// const uint8_t (*UpdateAddHTLC_get_payment_hash(const struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array UpdateAddHTLC_get_payment_hash(number this_ptr);
	// void UpdateAddHTLC_set_payment_hash(struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void UpdateAddHTLC_set_payment_hash(number this_ptr, Uint8Array val);
	// uint32_t UpdateAddHTLC_get_cltv_expiry(const struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr);
	public static native number UpdateAddHTLC_get_cltv_expiry(number this_ptr);
	// void UpdateAddHTLC_set_cltv_expiry(struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr, uint32_t val);
	public static native void UpdateAddHTLC_set_cltv_expiry(number this_ptr, number val);
	// void UpdateFulfillHTLC_free(struct LDKUpdateFulfillHTLC this_ptr);
	public static native void UpdateFulfillHTLC_free(number this_ptr);
	// struct LDKUpdateFulfillHTLC UpdateFulfillHTLC_clone(const struct LDKUpdateFulfillHTLC *NONNULL_PTR orig);
	public static native number UpdateFulfillHTLC_clone(number orig);
	// const uint8_t (*UpdateFulfillHTLC_get_channel_id(const struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array UpdateFulfillHTLC_get_channel_id(number this_ptr);
	// void UpdateFulfillHTLC_set_channel_id(struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void UpdateFulfillHTLC_set_channel_id(number this_ptr, Uint8Array val);
	// uint64_t UpdateFulfillHTLC_get_htlc_id(const struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr);
	public static native number UpdateFulfillHTLC_get_htlc_id(number this_ptr);
	// void UpdateFulfillHTLC_set_htlc_id(struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr, uint64_t val);
	public static native void UpdateFulfillHTLC_set_htlc_id(number this_ptr, number val);
	// const uint8_t (*UpdateFulfillHTLC_get_payment_preimage(const struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array UpdateFulfillHTLC_get_payment_preimage(number this_ptr);
	// void UpdateFulfillHTLC_set_payment_preimage(struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void UpdateFulfillHTLC_set_payment_preimage(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKUpdateFulfillHTLC UpdateFulfillHTLC_new(struct LDKThirtyTwoBytes channel_id_arg, uint64_t htlc_id_arg, struct LDKThirtyTwoBytes payment_preimage_arg);
	public static native number UpdateFulfillHTLC_new(Uint8Array channel_id_arg, number htlc_id_arg, Uint8Array payment_preimage_arg);
	// void UpdateFailHTLC_free(struct LDKUpdateFailHTLC this_ptr);
	public static native void UpdateFailHTLC_free(number this_ptr);
	// struct LDKUpdateFailHTLC UpdateFailHTLC_clone(const struct LDKUpdateFailHTLC *NONNULL_PTR orig);
	public static native number UpdateFailHTLC_clone(number orig);
	// const uint8_t (*UpdateFailHTLC_get_channel_id(const struct LDKUpdateFailHTLC *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array UpdateFailHTLC_get_channel_id(number this_ptr);
	// void UpdateFailHTLC_set_channel_id(struct LDKUpdateFailHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void UpdateFailHTLC_set_channel_id(number this_ptr, Uint8Array val);
	// uint64_t UpdateFailHTLC_get_htlc_id(const struct LDKUpdateFailHTLC *NONNULL_PTR this_ptr);
	public static native number UpdateFailHTLC_get_htlc_id(number this_ptr);
	// void UpdateFailHTLC_set_htlc_id(struct LDKUpdateFailHTLC *NONNULL_PTR this_ptr, uint64_t val);
	public static native void UpdateFailHTLC_set_htlc_id(number this_ptr, number val);
	// void UpdateFailMalformedHTLC_free(struct LDKUpdateFailMalformedHTLC this_ptr);
	public static native void UpdateFailMalformedHTLC_free(number this_ptr);
	// struct LDKUpdateFailMalformedHTLC UpdateFailMalformedHTLC_clone(const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR orig);
	public static native number UpdateFailMalformedHTLC_clone(number orig);
	// const uint8_t (*UpdateFailMalformedHTLC_get_channel_id(const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array UpdateFailMalformedHTLC_get_channel_id(number this_ptr);
	// void UpdateFailMalformedHTLC_set_channel_id(struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void UpdateFailMalformedHTLC_set_channel_id(number this_ptr, Uint8Array val);
	// uint64_t UpdateFailMalformedHTLC_get_htlc_id(const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr);
	public static native number UpdateFailMalformedHTLC_get_htlc_id(number this_ptr);
	// void UpdateFailMalformedHTLC_set_htlc_id(struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr, uint64_t val);
	public static native void UpdateFailMalformedHTLC_set_htlc_id(number this_ptr, number val);
	// uint16_t UpdateFailMalformedHTLC_get_failure_code(const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr);
	public static native number UpdateFailMalformedHTLC_get_failure_code(number this_ptr);
	// void UpdateFailMalformedHTLC_set_failure_code(struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr, uint16_t val);
	public static native void UpdateFailMalformedHTLC_set_failure_code(number this_ptr, number val);
	// void CommitmentSigned_free(struct LDKCommitmentSigned this_ptr);
	public static native void CommitmentSigned_free(number this_ptr);
	// struct LDKCommitmentSigned CommitmentSigned_clone(const struct LDKCommitmentSigned *NONNULL_PTR orig);
	public static native number CommitmentSigned_clone(number orig);
	// const uint8_t (*CommitmentSigned_get_channel_id(const struct LDKCommitmentSigned *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array CommitmentSigned_get_channel_id(number this_ptr);
	// void CommitmentSigned_set_channel_id(struct LDKCommitmentSigned *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void CommitmentSigned_set_channel_id(number this_ptr, Uint8Array val);
	// struct LDKSignature CommitmentSigned_get_signature(const struct LDKCommitmentSigned *NONNULL_PTR this_ptr);
	public static native Uint8Array CommitmentSigned_get_signature(number this_ptr);
	// void CommitmentSigned_set_signature(struct LDKCommitmentSigned *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void CommitmentSigned_set_signature(number this_ptr, Uint8Array val);
	// void CommitmentSigned_set_htlc_signatures(struct LDKCommitmentSigned *NONNULL_PTR this_ptr, struct LDKCVec_SignatureZ val);
	public static native void CommitmentSigned_set_htlc_signatures(number this_ptr, Uint8Array[] val);
	// MUST_USE_RES struct LDKCommitmentSigned CommitmentSigned_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKSignature signature_arg, struct LDKCVec_SignatureZ htlc_signatures_arg);
	public static native number CommitmentSigned_new(Uint8Array channel_id_arg, Uint8Array signature_arg, Uint8Array[] htlc_signatures_arg);
	// void RevokeAndACK_free(struct LDKRevokeAndACK this_ptr);
	public static native void RevokeAndACK_free(number this_ptr);
	// struct LDKRevokeAndACK RevokeAndACK_clone(const struct LDKRevokeAndACK *NONNULL_PTR orig);
	public static native number RevokeAndACK_clone(number orig);
	// const uint8_t (*RevokeAndACK_get_channel_id(const struct LDKRevokeAndACK *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array RevokeAndACK_get_channel_id(number this_ptr);
	// void RevokeAndACK_set_channel_id(struct LDKRevokeAndACK *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void RevokeAndACK_set_channel_id(number this_ptr, Uint8Array val);
	// const uint8_t (*RevokeAndACK_get_per_commitment_secret(const struct LDKRevokeAndACK *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array RevokeAndACK_get_per_commitment_secret(number this_ptr);
	// void RevokeAndACK_set_per_commitment_secret(struct LDKRevokeAndACK *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void RevokeAndACK_set_per_commitment_secret(number this_ptr, Uint8Array val);
	// struct LDKPublicKey RevokeAndACK_get_next_per_commitment_point(const struct LDKRevokeAndACK *NONNULL_PTR this_ptr);
	public static native Uint8Array RevokeAndACK_get_next_per_commitment_point(number this_ptr);
	// void RevokeAndACK_set_next_per_commitment_point(struct LDKRevokeAndACK *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void RevokeAndACK_set_next_per_commitment_point(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKRevokeAndACK RevokeAndACK_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKThirtyTwoBytes per_commitment_secret_arg, struct LDKPublicKey next_per_commitment_point_arg);
	public static native number RevokeAndACK_new(Uint8Array channel_id_arg, Uint8Array per_commitment_secret_arg, Uint8Array next_per_commitment_point_arg);
	// void UpdateFee_free(struct LDKUpdateFee this_ptr);
	public static native void UpdateFee_free(number this_ptr);
	// struct LDKUpdateFee UpdateFee_clone(const struct LDKUpdateFee *NONNULL_PTR orig);
	public static native number UpdateFee_clone(number orig);
	// const uint8_t (*UpdateFee_get_channel_id(const struct LDKUpdateFee *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array UpdateFee_get_channel_id(number this_ptr);
	// void UpdateFee_set_channel_id(struct LDKUpdateFee *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void UpdateFee_set_channel_id(number this_ptr, Uint8Array val);
	// uint32_t UpdateFee_get_feerate_per_kw(const struct LDKUpdateFee *NONNULL_PTR this_ptr);
	public static native number UpdateFee_get_feerate_per_kw(number this_ptr);
	// void UpdateFee_set_feerate_per_kw(struct LDKUpdateFee *NONNULL_PTR this_ptr, uint32_t val);
	public static native void UpdateFee_set_feerate_per_kw(number this_ptr, number val);
	// MUST_USE_RES struct LDKUpdateFee UpdateFee_new(struct LDKThirtyTwoBytes channel_id_arg, uint32_t feerate_per_kw_arg);
	public static native number UpdateFee_new(Uint8Array channel_id_arg, number feerate_per_kw_arg);
	// void DataLossProtect_free(struct LDKDataLossProtect this_ptr);
	public static native void DataLossProtect_free(number this_ptr);
	// struct LDKDataLossProtect DataLossProtect_clone(const struct LDKDataLossProtect *NONNULL_PTR orig);
	public static native number DataLossProtect_clone(number orig);
	// const uint8_t (*DataLossProtect_get_your_last_per_commitment_secret(const struct LDKDataLossProtect *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array DataLossProtect_get_your_last_per_commitment_secret(number this_ptr);
	// void DataLossProtect_set_your_last_per_commitment_secret(struct LDKDataLossProtect *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void DataLossProtect_set_your_last_per_commitment_secret(number this_ptr, Uint8Array val);
	// struct LDKPublicKey DataLossProtect_get_my_current_per_commitment_point(const struct LDKDataLossProtect *NONNULL_PTR this_ptr);
	public static native Uint8Array DataLossProtect_get_my_current_per_commitment_point(number this_ptr);
	// void DataLossProtect_set_my_current_per_commitment_point(struct LDKDataLossProtect *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void DataLossProtect_set_my_current_per_commitment_point(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKDataLossProtect DataLossProtect_new(struct LDKThirtyTwoBytes your_last_per_commitment_secret_arg, struct LDKPublicKey my_current_per_commitment_point_arg);
	public static native number DataLossProtect_new(Uint8Array your_last_per_commitment_secret_arg, Uint8Array my_current_per_commitment_point_arg);
	// void ChannelReestablish_free(struct LDKChannelReestablish this_ptr);
	public static native void ChannelReestablish_free(number this_ptr);
	// struct LDKChannelReestablish ChannelReestablish_clone(const struct LDKChannelReestablish *NONNULL_PTR orig);
	public static native number ChannelReestablish_clone(number orig);
	// const uint8_t (*ChannelReestablish_get_channel_id(const struct LDKChannelReestablish *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array ChannelReestablish_get_channel_id(number this_ptr);
	// void ChannelReestablish_set_channel_id(struct LDKChannelReestablish *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void ChannelReestablish_set_channel_id(number this_ptr, Uint8Array val);
	// uint64_t ChannelReestablish_get_next_local_commitment_number(const struct LDKChannelReestablish *NONNULL_PTR this_ptr);
	public static native number ChannelReestablish_get_next_local_commitment_number(number this_ptr);
	// void ChannelReestablish_set_next_local_commitment_number(struct LDKChannelReestablish *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelReestablish_set_next_local_commitment_number(number this_ptr, number val);
	// uint64_t ChannelReestablish_get_next_remote_commitment_number(const struct LDKChannelReestablish *NONNULL_PTR this_ptr);
	public static native number ChannelReestablish_get_next_remote_commitment_number(number this_ptr);
	// void ChannelReestablish_set_next_remote_commitment_number(struct LDKChannelReestablish *NONNULL_PTR this_ptr, uint64_t val);
	public static native void ChannelReestablish_set_next_remote_commitment_number(number this_ptr, number val);
	// void AnnouncementSignatures_free(struct LDKAnnouncementSignatures this_ptr);
	public static native void AnnouncementSignatures_free(number this_ptr);
	// struct LDKAnnouncementSignatures AnnouncementSignatures_clone(const struct LDKAnnouncementSignatures *NONNULL_PTR orig);
	public static native number AnnouncementSignatures_clone(number orig);
	// const uint8_t (*AnnouncementSignatures_get_channel_id(const struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array AnnouncementSignatures_get_channel_id(number this_ptr);
	// void AnnouncementSignatures_set_channel_id(struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void AnnouncementSignatures_set_channel_id(number this_ptr, Uint8Array val);
	// uint64_t AnnouncementSignatures_get_short_channel_id(const struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr);
	public static native number AnnouncementSignatures_get_short_channel_id(number this_ptr);
	// void AnnouncementSignatures_set_short_channel_id(struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr, uint64_t val);
	public static native void AnnouncementSignatures_set_short_channel_id(number this_ptr, number val);
	// struct LDKSignature AnnouncementSignatures_get_node_signature(const struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr);
	public static native Uint8Array AnnouncementSignatures_get_node_signature(number this_ptr);
	// void AnnouncementSignatures_set_node_signature(struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void AnnouncementSignatures_set_node_signature(number this_ptr, Uint8Array val);
	// struct LDKSignature AnnouncementSignatures_get_bitcoin_signature(const struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr);
	public static native Uint8Array AnnouncementSignatures_get_bitcoin_signature(number this_ptr);
	// void AnnouncementSignatures_set_bitcoin_signature(struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void AnnouncementSignatures_set_bitcoin_signature(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKAnnouncementSignatures AnnouncementSignatures_new(struct LDKThirtyTwoBytes channel_id_arg, uint64_t short_channel_id_arg, struct LDKSignature node_signature_arg, struct LDKSignature bitcoin_signature_arg);
	public static native number AnnouncementSignatures_new(Uint8Array channel_id_arg, number short_channel_id_arg, Uint8Array node_signature_arg, Uint8Array bitcoin_signature_arg);
	// void NetAddress_free(struct LDKNetAddress this_ptr);
	public static native void NetAddress_free(number this_ptr);
	// struct LDKNetAddress NetAddress_clone(const struct LDKNetAddress *NONNULL_PTR orig);
	public static native number NetAddress_clone(number orig);
	// struct LDKCVec_u8Z NetAddress_write(const struct LDKNetAddress *NONNULL_PTR obj);
	public static native Uint8Array NetAddress_write(number obj);
	// struct LDKCResult_CResult_NetAddressu8ZDecodeErrorZ Result_read(struct LDKu8slice ser);
	public static native number Result_read(Uint8Array ser);
	// void UnsignedNodeAnnouncement_free(struct LDKUnsignedNodeAnnouncement this_ptr);
	public static native void UnsignedNodeAnnouncement_free(number this_ptr);
	// struct LDKUnsignedNodeAnnouncement UnsignedNodeAnnouncement_clone(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR orig);
	public static native number UnsignedNodeAnnouncement_clone(number orig);
	// struct LDKNodeFeatures UnsignedNodeAnnouncement_get_features(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr);
	public static native number UnsignedNodeAnnouncement_get_features(number this_ptr);
	// void UnsignedNodeAnnouncement_set_features(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKNodeFeatures val);
	public static native void UnsignedNodeAnnouncement_set_features(number this_ptr, number val);
	// uint32_t UnsignedNodeAnnouncement_get_timestamp(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr);
	public static native number UnsignedNodeAnnouncement_get_timestamp(number this_ptr);
	// void UnsignedNodeAnnouncement_set_timestamp(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, uint32_t val);
	public static native void UnsignedNodeAnnouncement_set_timestamp(number this_ptr, number val);
	// struct LDKPublicKey UnsignedNodeAnnouncement_get_node_id(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr);
	public static native Uint8Array UnsignedNodeAnnouncement_get_node_id(number this_ptr);
	// void UnsignedNodeAnnouncement_set_node_id(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void UnsignedNodeAnnouncement_set_node_id(number this_ptr, Uint8Array val);
	// const uint8_t (*UnsignedNodeAnnouncement_get_rgb(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr))[3];
	public static native Uint8Array UnsignedNodeAnnouncement_get_rgb(number this_ptr);
	// void UnsignedNodeAnnouncement_set_rgb(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKThreeBytes val);
	public static native void UnsignedNodeAnnouncement_set_rgb(number this_ptr, Uint8Array val);
	// const uint8_t (*UnsignedNodeAnnouncement_get_alias(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array UnsignedNodeAnnouncement_get_alias(number this_ptr);
	// void UnsignedNodeAnnouncement_set_alias(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void UnsignedNodeAnnouncement_set_alias(number this_ptr, Uint8Array val);
	// void UnsignedNodeAnnouncement_set_addresses(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKCVec_NetAddressZ val);
	public static native void UnsignedNodeAnnouncement_set_addresses(number this_ptr, number[] val);
	// void NodeAnnouncement_free(struct LDKNodeAnnouncement this_ptr);
	public static native void NodeAnnouncement_free(number this_ptr);
	// struct LDKNodeAnnouncement NodeAnnouncement_clone(const struct LDKNodeAnnouncement *NONNULL_PTR orig);
	public static native number NodeAnnouncement_clone(number orig);
	// struct LDKSignature NodeAnnouncement_get_signature(const struct LDKNodeAnnouncement *NONNULL_PTR this_ptr);
	public static native Uint8Array NodeAnnouncement_get_signature(number this_ptr);
	// void NodeAnnouncement_set_signature(struct LDKNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void NodeAnnouncement_set_signature(number this_ptr, Uint8Array val);
	// struct LDKUnsignedNodeAnnouncement NodeAnnouncement_get_contents(const struct LDKNodeAnnouncement *NONNULL_PTR this_ptr);
	public static native number NodeAnnouncement_get_contents(number this_ptr);
	// void NodeAnnouncement_set_contents(struct LDKNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKUnsignedNodeAnnouncement val);
	public static native void NodeAnnouncement_set_contents(number this_ptr, number val);
	// MUST_USE_RES struct LDKNodeAnnouncement NodeAnnouncement_new(struct LDKSignature signature_arg, struct LDKUnsignedNodeAnnouncement contents_arg);
	public static native number NodeAnnouncement_new(Uint8Array signature_arg, number contents_arg);
	// void UnsignedChannelAnnouncement_free(struct LDKUnsignedChannelAnnouncement this_ptr);
	public static native void UnsignedChannelAnnouncement_free(number this_ptr);
	// struct LDKUnsignedChannelAnnouncement UnsignedChannelAnnouncement_clone(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR orig);
	public static native number UnsignedChannelAnnouncement_clone(number orig);
	// struct LDKChannelFeatures UnsignedChannelAnnouncement_get_features(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native number UnsignedChannelAnnouncement_get_features(number this_ptr);
	// void UnsignedChannelAnnouncement_set_features(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKChannelFeatures val);
	public static native void UnsignedChannelAnnouncement_set_features(number this_ptr, number val);
	// const uint8_t (*UnsignedChannelAnnouncement_get_chain_hash(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array UnsignedChannelAnnouncement_get_chain_hash(number this_ptr);
	// void UnsignedChannelAnnouncement_set_chain_hash(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void UnsignedChannelAnnouncement_set_chain_hash(number this_ptr, Uint8Array val);
	// uint64_t UnsignedChannelAnnouncement_get_short_channel_id(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native number UnsignedChannelAnnouncement_get_short_channel_id(number this_ptr);
	// void UnsignedChannelAnnouncement_set_short_channel_id(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, uint64_t val);
	public static native void UnsignedChannelAnnouncement_set_short_channel_id(number this_ptr, number val);
	// struct LDKPublicKey UnsignedChannelAnnouncement_get_node_id_1(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native Uint8Array UnsignedChannelAnnouncement_get_node_id_1(number this_ptr);
	// void UnsignedChannelAnnouncement_set_node_id_1(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void UnsignedChannelAnnouncement_set_node_id_1(number this_ptr, Uint8Array val);
	// struct LDKPublicKey UnsignedChannelAnnouncement_get_node_id_2(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native Uint8Array UnsignedChannelAnnouncement_get_node_id_2(number this_ptr);
	// void UnsignedChannelAnnouncement_set_node_id_2(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void UnsignedChannelAnnouncement_set_node_id_2(number this_ptr, Uint8Array val);
	// struct LDKPublicKey UnsignedChannelAnnouncement_get_bitcoin_key_1(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native Uint8Array UnsignedChannelAnnouncement_get_bitcoin_key_1(number this_ptr);
	// void UnsignedChannelAnnouncement_set_bitcoin_key_1(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void UnsignedChannelAnnouncement_set_bitcoin_key_1(number this_ptr, Uint8Array val);
	// struct LDKPublicKey UnsignedChannelAnnouncement_get_bitcoin_key_2(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native Uint8Array UnsignedChannelAnnouncement_get_bitcoin_key_2(number this_ptr);
	// void UnsignedChannelAnnouncement_set_bitcoin_key_2(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void UnsignedChannelAnnouncement_set_bitcoin_key_2(number this_ptr, Uint8Array val);
	// void ChannelAnnouncement_free(struct LDKChannelAnnouncement this_ptr);
	public static native void ChannelAnnouncement_free(number this_ptr);
	// struct LDKChannelAnnouncement ChannelAnnouncement_clone(const struct LDKChannelAnnouncement *NONNULL_PTR orig);
	public static native number ChannelAnnouncement_clone(number orig);
	// struct LDKSignature ChannelAnnouncement_get_node_signature_1(const struct LDKChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelAnnouncement_get_node_signature_1(number this_ptr);
	// void ChannelAnnouncement_set_node_signature_1(struct LDKChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void ChannelAnnouncement_set_node_signature_1(number this_ptr, Uint8Array val);
	// struct LDKSignature ChannelAnnouncement_get_node_signature_2(const struct LDKChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelAnnouncement_get_node_signature_2(number this_ptr);
	// void ChannelAnnouncement_set_node_signature_2(struct LDKChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void ChannelAnnouncement_set_node_signature_2(number this_ptr, Uint8Array val);
	// struct LDKSignature ChannelAnnouncement_get_bitcoin_signature_1(const struct LDKChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelAnnouncement_get_bitcoin_signature_1(number this_ptr);
	// void ChannelAnnouncement_set_bitcoin_signature_1(struct LDKChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void ChannelAnnouncement_set_bitcoin_signature_1(number this_ptr, Uint8Array val);
	// struct LDKSignature ChannelAnnouncement_get_bitcoin_signature_2(const struct LDKChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelAnnouncement_get_bitcoin_signature_2(number this_ptr);
	// void ChannelAnnouncement_set_bitcoin_signature_2(struct LDKChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void ChannelAnnouncement_set_bitcoin_signature_2(number this_ptr, Uint8Array val);
	// struct LDKUnsignedChannelAnnouncement ChannelAnnouncement_get_contents(const struct LDKChannelAnnouncement *NONNULL_PTR this_ptr);
	public static native number ChannelAnnouncement_get_contents(number this_ptr);
	// void ChannelAnnouncement_set_contents(struct LDKChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKUnsignedChannelAnnouncement val);
	public static native void ChannelAnnouncement_set_contents(number this_ptr, number val);
	// MUST_USE_RES struct LDKChannelAnnouncement ChannelAnnouncement_new(struct LDKSignature node_signature_1_arg, struct LDKSignature node_signature_2_arg, struct LDKSignature bitcoin_signature_1_arg, struct LDKSignature bitcoin_signature_2_arg, struct LDKUnsignedChannelAnnouncement contents_arg);
	public static native number ChannelAnnouncement_new(Uint8Array node_signature_1_arg, Uint8Array node_signature_2_arg, Uint8Array bitcoin_signature_1_arg, Uint8Array bitcoin_signature_2_arg, number contents_arg);
	// void UnsignedChannelUpdate_free(struct LDKUnsignedChannelUpdate this_ptr);
	public static native void UnsignedChannelUpdate_free(number this_ptr);
	// struct LDKUnsignedChannelUpdate UnsignedChannelUpdate_clone(const struct LDKUnsignedChannelUpdate *NONNULL_PTR orig);
	public static native number UnsignedChannelUpdate_clone(number orig);
	// const uint8_t (*UnsignedChannelUpdate_get_chain_hash(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array UnsignedChannelUpdate_get_chain_hash(number this_ptr);
	// void UnsignedChannelUpdate_set_chain_hash(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void UnsignedChannelUpdate_set_chain_hash(number this_ptr, Uint8Array val);
	// uint64_t UnsignedChannelUpdate_get_short_channel_id(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	public static native number UnsignedChannelUpdate_get_short_channel_id(number this_ptr);
	// void UnsignedChannelUpdate_set_short_channel_id(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint64_t val);
	public static native void UnsignedChannelUpdate_set_short_channel_id(number this_ptr, number val);
	// uint32_t UnsignedChannelUpdate_get_timestamp(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	public static native number UnsignedChannelUpdate_get_timestamp(number this_ptr);
	// void UnsignedChannelUpdate_set_timestamp(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint32_t val);
	public static native void UnsignedChannelUpdate_set_timestamp(number this_ptr, number val);
	// uint8_t UnsignedChannelUpdate_get_flags(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	public static native number UnsignedChannelUpdate_get_flags(number this_ptr);
	// void UnsignedChannelUpdate_set_flags(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint8_t val);
	public static native void UnsignedChannelUpdate_set_flags(number this_ptr, number val);
	// uint16_t UnsignedChannelUpdate_get_cltv_expiry_delta(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	public static native number UnsignedChannelUpdate_get_cltv_expiry_delta(number this_ptr);
	// void UnsignedChannelUpdate_set_cltv_expiry_delta(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint16_t val);
	public static native void UnsignedChannelUpdate_set_cltv_expiry_delta(number this_ptr, number val);
	// uint64_t UnsignedChannelUpdate_get_htlc_minimum_msat(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	public static native number UnsignedChannelUpdate_get_htlc_minimum_msat(number this_ptr);
	// void UnsignedChannelUpdate_set_htlc_minimum_msat(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint64_t val);
	public static native void UnsignedChannelUpdate_set_htlc_minimum_msat(number this_ptr, number val);
	// uint32_t UnsignedChannelUpdate_get_fee_base_msat(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	public static native number UnsignedChannelUpdate_get_fee_base_msat(number this_ptr);
	// void UnsignedChannelUpdate_set_fee_base_msat(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint32_t val);
	public static native void UnsignedChannelUpdate_set_fee_base_msat(number this_ptr, number val);
	// uint32_t UnsignedChannelUpdate_get_fee_proportional_millionths(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	public static native number UnsignedChannelUpdate_get_fee_proportional_millionths(number this_ptr);
	// void UnsignedChannelUpdate_set_fee_proportional_millionths(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint32_t val);
	public static native void UnsignedChannelUpdate_set_fee_proportional_millionths(number this_ptr, number val);
	// void ChannelUpdate_free(struct LDKChannelUpdate this_ptr);
	public static native void ChannelUpdate_free(number this_ptr);
	// struct LDKChannelUpdate ChannelUpdate_clone(const struct LDKChannelUpdate *NONNULL_PTR orig);
	public static native number ChannelUpdate_clone(number orig);
	// struct LDKSignature ChannelUpdate_get_signature(const struct LDKChannelUpdate *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelUpdate_get_signature(number this_ptr);
	// void ChannelUpdate_set_signature(struct LDKChannelUpdate *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void ChannelUpdate_set_signature(number this_ptr, Uint8Array val);
	// struct LDKUnsignedChannelUpdate ChannelUpdate_get_contents(const struct LDKChannelUpdate *NONNULL_PTR this_ptr);
	public static native number ChannelUpdate_get_contents(number this_ptr);
	// void ChannelUpdate_set_contents(struct LDKChannelUpdate *NONNULL_PTR this_ptr, struct LDKUnsignedChannelUpdate val);
	public static native void ChannelUpdate_set_contents(number this_ptr, number val);
	// MUST_USE_RES struct LDKChannelUpdate ChannelUpdate_new(struct LDKSignature signature_arg, struct LDKUnsignedChannelUpdate contents_arg);
	public static native number ChannelUpdate_new(Uint8Array signature_arg, number contents_arg);
	// void QueryChannelRange_free(struct LDKQueryChannelRange this_ptr);
	public static native void QueryChannelRange_free(number this_ptr);
	// struct LDKQueryChannelRange QueryChannelRange_clone(const struct LDKQueryChannelRange *NONNULL_PTR orig);
	public static native number QueryChannelRange_clone(number orig);
	// const uint8_t (*QueryChannelRange_get_chain_hash(const struct LDKQueryChannelRange *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array QueryChannelRange_get_chain_hash(number this_ptr);
	// void QueryChannelRange_set_chain_hash(struct LDKQueryChannelRange *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void QueryChannelRange_set_chain_hash(number this_ptr, Uint8Array val);
	// uint32_t QueryChannelRange_get_first_blocknum(const struct LDKQueryChannelRange *NONNULL_PTR this_ptr);
	public static native number QueryChannelRange_get_first_blocknum(number this_ptr);
	// void QueryChannelRange_set_first_blocknum(struct LDKQueryChannelRange *NONNULL_PTR this_ptr, uint32_t val);
	public static native void QueryChannelRange_set_first_blocknum(number this_ptr, number val);
	// uint32_t QueryChannelRange_get_number_of_blocks(const struct LDKQueryChannelRange *NONNULL_PTR this_ptr);
	public static native number QueryChannelRange_get_number_of_blocks(number this_ptr);
	// void QueryChannelRange_set_number_of_blocks(struct LDKQueryChannelRange *NONNULL_PTR this_ptr, uint32_t val);
	public static native void QueryChannelRange_set_number_of_blocks(number this_ptr, number val);
	// MUST_USE_RES struct LDKQueryChannelRange QueryChannelRange_new(struct LDKThirtyTwoBytes chain_hash_arg, uint32_t first_blocknum_arg, uint32_t number_of_blocks_arg);
	public static native number QueryChannelRange_new(Uint8Array chain_hash_arg, number first_blocknum_arg, number number_of_blocks_arg);
	// void ReplyChannelRange_free(struct LDKReplyChannelRange this_ptr);
	public static native void ReplyChannelRange_free(number this_ptr);
	// struct LDKReplyChannelRange ReplyChannelRange_clone(const struct LDKReplyChannelRange *NONNULL_PTR orig);
	public static native number ReplyChannelRange_clone(number orig);
	// const uint8_t (*ReplyChannelRange_get_chain_hash(const struct LDKReplyChannelRange *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array ReplyChannelRange_get_chain_hash(number this_ptr);
	// void ReplyChannelRange_set_chain_hash(struct LDKReplyChannelRange *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void ReplyChannelRange_set_chain_hash(number this_ptr, Uint8Array val);
	// uint32_t ReplyChannelRange_get_first_blocknum(const struct LDKReplyChannelRange *NONNULL_PTR this_ptr);
	public static native number ReplyChannelRange_get_first_blocknum(number this_ptr);
	// void ReplyChannelRange_set_first_blocknum(struct LDKReplyChannelRange *NONNULL_PTR this_ptr, uint32_t val);
	public static native void ReplyChannelRange_set_first_blocknum(number this_ptr, number val);
	// uint32_t ReplyChannelRange_get_number_of_blocks(const struct LDKReplyChannelRange *NONNULL_PTR this_ptr);
	public static native number ReplyChannelRange_get_number_of_blocks(number this_ptr);
	// void ReplyChannelRange_set_number_of_blocks(struct LDKReplyChannelRange *NONNULL_PTR this_ptr, uint32_t val);
	public static native void ReplyChannelRange_set_number_of_blocks(number this_ptr, number val);
	// bool ReplyChannelRange_get_full_information(const struct LDKReplyChannelRange *NONNULL_PTR this_ptr);
	public static native boolean ReplyChannelRange_get_full_information(number this_ptr);
	// void ReplyChannelRange_set_full_information(struct LDKReplyChannelRange *NONNULL_PTR this_ptr, bool val);
	public static native void ReplyChannelRange_set_full_information(number this_ptr, boolean val);
	// void ReplyChannelRange_set_short_channel_ids(struct LDKReplyChannelRange *NONNULL_PTR this_ptr, struct LDKCVec_u64Z val);
	public static native void ReplyChannelRange_set_short_channel_ids(number this_ptr, number[] val);
	// MUST_USE_RES struct LDKReplyChannelRange ReplyChannelRange_new(struct LDKThirtyTwoBytes chain_hash_arg, uint32_t first_blocknum_arg, uint32_t number_of_blocks_arg, bool full_information_arg, struct LDKCVec_u64Z short_channel_ids_arg);
	public static native number ReplyChannelRange_new(Uint8Array chain_hash_arg, number first_blocknum_arg, number number_of_blocks_arg, boolean full_information_arg, number[] short_channel_ids_arg);
	// void QueryShortChannelIds_free(struct LDKQueryShortChannelIds this_ptr);
	public static native void QueryShortChannelIds_free(number this_ptr);
	// struct LDKQueryShortChannelIds QueryShortChannelIds_clone(const struct LDKQueryShortChannelIds *NONNULL_PTR orig);
	public static native number QueryShortChannelIds_clone(number orig);
	// const uint8_t (*QueryShortChannelIds_get_chain_hash(const struct LDKQueryShortChannelIds *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array QueryShortChannelIds_get_chain_hash(number this_ptr);
	// void QueryShortChannelIds_set_chain_hash(struct LDKQueryShortChannelIds *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void QueryShortChannelIds_set_chain_hash(number this_ptr, Uint8Array val);
	// void QueryShortChannelIds_set_short_channel_ids(struct LDKQueryShortChannelIds *NONNULL_PTR this_ptr, struct LDKCVec_u64Z val);
	public static native void QueryShortChannelIds_set_short_channel_ids(number this_ptr, number[] val);
	// MUST_USE_RES struct LDKQueryShortChannelIds QueryShortChannelIds_new(struct LDKThirtyTwoBytes chain_hash_arg, struct LDKCVec_u64Z short_channel_ids_arg);
	public static native number QueryShortChannelIds_new(Uint8Array chain_hash_arg, number[] short_channel_ids_arg);
	// void ReplyShortChannelIdsEnd_free(struct LDKReplyShortChannelIdsEnd this_ptr);
	public static native void ReplyShortChannelIdsEnd_free(number this_ptr);
	// struct LDKReplyShortChannelIdsEnd ReplyShortChannelIdsEnd_clone(const struct LDKReplyShortChannelIdsEnd *NONNULL_PTR orig);
	public static native number ReplyShortChannelIdsEnd_clone(number orig);
	// const uint8_t (*ReplyShortChannelIdsEnd_get_chain_hash(const struct LDKReplyShortChannelIdsEnd *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array ReplyShortChannelIdsEnd_get_chain_hash(number this_ptr);
	// void ReplyShortChannelIdsEnd_set_chain_hash(struct LDKReplyShortChannelIdsEnd *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void ReplyShortChannelIdsEnd_set_chain_hash(number this_ptr, Uint8Array val);
	// bool ReplyShortChannelIdsEnd_get_full_information(const struct LDKReplyShortChannelIdsEnd *NONNULL_PTR this_ptr);
	public static native boolean ReplyShortChannelIdsEnd_get_full_information(number this_ptr);
	// void ReplyShortChannelIdsEnd_set_full_information(struct LDKReplyShortChannelIdsEnd *NONNULL_PTR this_ptr, bool val);
	public static native void ReplyShortChannelIdsEnd_set_full_information(number this_ptr, boolean val);
	// MUST_USE_RES struct LDKReplyShortChannelIdsEnd ReplyShortChannelIdsEnd_new(struct LDKThirtyTwoBytes chain_hash_arg, bool full_information_arg);
	public static native number ReplyShortChannelIdsEnd_new(Uint8Array chain_hash_arg, boolean full_information_arg);
	// void GossipTimestampFilter_free(struct LDKGossipTimestampFilter this_ptr);
	public static native void GossipTimestampFilter_free(number this_ptr);
	// struct LDKGossipTimestampFilter GossipTimestampFilter_clone(const struct LDKGossipTimestampFilter *NONNULL_PTR orig);
	public static native number GossipTimestampFilter_clone(number orig);
	// const uint8_t (*GossipTimestampFilter_get_chain_hash(const struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array GossipTimestampFilter_get_chain_hash(number this_ptr);
	// void GossipTimestampFilter_set_chain_hash(struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void GossipTimestampFilter_set_chain_hash(number this_ptr, Uint8Array val);
	// uint32_t GossipTimestampFilter_get_first_timestamp(const struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr);
	public static native number GossipTimestampFilter_get_first_timestamp(number this_ptr);
	// void GossipTimestampFilter_set_first_timestamp(struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr, uint32_t val);
	public static native void GossipTimestampFilter_set_first_timestamp(number this_ptr, number val);
	// uint32_t GossipTimestampFilter_get_timestamp_range(const struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr);
	public static native number GossipTimestampFilter_get_timestamp_range(number this_ptr);
	// void GossipTimestampFilter_set_timestamp_range(struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr, uint32_t val);
	public static native void GossipTimestampFilter_set_timestamp_range(number this_ptr, number val);
	// MUST_USE_RES struct LDKGossipTimestampFilter GossipTimestampFilter_new(struct LDKThirtyTwoBytes chain_hash_arg, uint32_t first_timestamp_arg, uint32_t timestamp_range_arg);
	public static native number GossipTimestampFilter_new(Uint8Array chain_hash_arg, number first_timestamp_arg, number timestamp_range_arg);
	// void ErrorAction_free(struct LDKErrorAction this_ptr);
	public static native void ErrorAction_free(number this_ptr);
	// struct LDKErrorAction ErrorAction_clone(const struct LDKErrorAction *NONNULL_PTR orig);
	public static native number ErrorAction_clone(number orig);
	// void LightningError_free(struct LDKLightningError this_ptr);
	public static native void LightningError_free(number this_ptr);
	// struct LDKStr LightningError_get_err(const struct LDKLightningError *NONNULL_PTR this_ptr);
	public static native String LightningError_get_err(number this_ptr);
	// void LightningError_set_err(struct LDKLightningError *NONNULL_PTR this_ptr, struct LDKCVec_u8Z val);
	public static native void LightningError_set_err(number this_ptr, Uint8Array val);
	// struct LDKErrorAction LightningError_get_action(const struct LDKLightningError *NONNULL_PTR this_ptr);
	public static native number LightningError_get_action(number this_ptr);
	// void LightningError_set_action(struct LDKLightningError *NONNULL_PTR this_ptr, struct LDKErrorAction val);
	public static native void LightningError_set_action(number this_ptr, number val);
	// MUST_USE_RES struct LDKLightningError LightningError_new(struct LDKCVec_u8Z err_arg, struct LDKErrorAction action_arg);
	public static native number LightningError_new(Uint8Array err_arg, number action_arg);
	// void CommitmentUpdate_free(struct LDKCommitmentUpdate this_ptr);
	public static native void CommitmentUpdate_free(number this_ptr);
	// struct LDKCommitmentUpdate CommitmentUpdate_clone(const struct LDKCommitmentUpdate *NONNULL_PTR orig);
	public static native number CommitmentUpdate_clone(number orig);
	// void CommitmentUpdate_set_update_add_htlcs(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKCVec_UpdateAddHTLCZ val);
	public static native void CommitmentUpdate_set_update_add_htlcs(number this_ptr, number[] val);
	// void CommitmentUpdate_set_update_fulfill_htlcs(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKCVec_UpdateFulfillHTLCZ val);
	public static native void CommitmentUpdate_set_update_fulfill_htlcs(number this_ptr, number[] val);
	// void CommitmentUpdate_set_update_fail_htlcs(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKCVec_UpdateFailHTLCZ val);
	public static native void CommitmentUpdate_set_update_fail_htlcs(number this_ptr, number[] val);
	// void CommitmentUpdate_set_update_fail_malformed_htlcs(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKCVec_UpdateFailMalformedHTLCZ val);
	public static native void CommitmentUpdate_set_update_fail_malformed_htlcs(number this_ptr, number[] val);
	// struct LDKUpdateFee CommitmentUpdate_get_update_fee(const struct LDKCommitmentUpdate *NONNULL_PTR this_ptr);
	public static native number CommitmentUpdate_get_update_fee(number this_ptr);
	// void CommitmentUpdate_set_update_fee(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKUpdateFee val);
	public static native void CommitmentUpdate_set_update_fee(number this_ptr, number val);
	// struct LDKCommitmentSigned CommitmentUpdate_get_commitment_signed(const struct LDKCommitmentUpdate *NONNULL_PTR this_ptr);
	public static native number CommitmentUpdate_get_commitment_signed(number this_ptr);
	// void CommitmentUpdate_set_commitment_signed(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKCommitmentSigned val);
	public static native void CommitmentUpdate_set_commitment_signed(number this_ptr, number val);
	// MUST_USE_RES struct LDKCommitmentUpdate CommitmentUpdate_new(struct LDKCVec_UpdateAddHTLCZ update_add_htlcs_arg, struct LDKCVec_UpdateFulfillHTLCZ update_fulfill_htlcs_arg, struct LDKCVec_UpdateFailHTLCZ update_fail_htlcs_arg, struct LDKCVec_UpdateFailMalformedHTLCZ update_fail_malformed_htlcs_arg, struct LDKUpdateFee update_fee_arg, struct LDKCommitmentSigned commitment_signed_arg);
	public static native number CommitmentUpdate_new(number[] update_add_htlcs_arg, number[] update_fulfill_htlcs_arg, number[] update_fail_htlcs_arg, number[] update_fail_malformed_htlcs_arg, number update_fee_arg, number commitment_signed_arg);
	// void HTLCFailChannelUpdate_free(struct LDKHTLCFailChannelUpdate this_ptr);
	public static native void HTLCFailChannelUpdate_free(number this_ptr);
	// struct LDKHTLCFailChannelUpdate HTLCFailChannelUpdate_clone(const struct LDKHTLCFailChannelUpdate *NONNULL_PTR orig);
	public static native number HTLCFailChannelUpdate_clone(number orig);
	// void ChannelMessageHandler_free(struct LDKChannelMessageHandler this_ptr);
	public static native void ChannelMessageHandler_free(number this_ptr);
	// void RoutingMessageHandler_free(struct LDKRoutingMessageHandler this_ptr);
	public static native void RoutingMessageHandler_free(number this_ptr);
	// struct LDKCVec_u8Z AcceptChannel_write(const struct LDKAcceptChannel *NONNULL_PTR obj);
	public static native Uint8Array AcceptChannel_write(number obj);
	// struct LDKAcceptChannel AcceptChannel_read(struct LDKu8slice ser);
	public static native number AcceptChannel_read(Uint8Array ser);
	// struct LDKCVec_u8Z AnnouncementSignatures_write(const struct LDKAnnouncementSignatures *NONNULL_PTR obj);
	public static native Uint8Array AnnouncementSignatures_write(number obj);
	// struct LDKAnnouncementSignatures AnnouncementSignatures_read(struct LDKu8slice ser);
	public static native number AnnouncementSignatures_read(Uint8Array ser);
	// struct LDKCVec_u8Z ChannelReestablish_write(const struct LDKChannelReestablish *NONNULL_PTR obj);
	public static native Uint8Array ChannelReestablish_write(number obj);
	// struct LDKCResult_ChannelReestablishDecodeErrorZ ChannelReestablish_read(struct LDKu8slice ser);
	public static native number ChannelReestablish_read(Uint8Array ser);
	// struct LDKCVec_u8Z ClosingSigned_write(const struct LDKClosingSigned *NONNULL_PTR obj);
	public static native Uint8Array ClosingSigned_write(number obj);
	// struct LDKClosingSigned ClosingSigned_read(struct LDKu8slice ser);
	public static native number ClosingSigned_read(Uint8Array ser);
	// struct LDKCVec_u8Z CommitmentSigned_write(const struct LDKCommitmentSigned *NONNULL_PTR obj);
	public static native Uint8Array CommitmentSigned_write(number obj);
	// struct LDKCommitmentSigned CommitmentSigned_read(struct LDKu8slice ser);
	public static native number CommitmentSigned_read(Uint8Array ser);
	// struct LDKCVec_u8Z FundingCreated_write(const struct LDKFundingCreated *NONNULL_PTR obj);
	public static native Uint8Array FundingCreated_write(number obj);
	// struct LDKFundingCreated FundingCreated_read(struct LDKu8slice ser);
	public static native number FundingCreated_read(Uint8Array ser);
	// struct LDKCVec_u8Z FundingSigned_write(const struct LDKFundingSigned *NONNULL_PTR obj);
	public static native Uint8Array FundingSigned_write(number obj);
	// struct LDKFundingSigned FundingSigned_read(struct LDKu8slice ser);
	public static native number FundingSigned_read(Uint8Array ser);
	// struct LDKCVec_u8Z FundingLocked_write(const struct LDKFundingLocked *NONNULL_PTR obj);
	public static native Uint8Array FundingLocked_write(number obj);
	// struct LDKFundingLocked FundingLocked_read(struct LDKu8slice ser);
	public static native number FundingLocked_read(Uint8Array ser);
	// struct LDKCVec_u8Z Init_write(const struct LDKInit *NONNULL_PTR obj);
	public static native Uint8Array Init_write(number obj);
	// struct LDKCResult_InitDecodeErrorZ Init_read(struct LDKu8slice ser);
	public static native number Init_read(Uint8Array ser);
	// struct LDKCVec_u8Z OpenChannel_write(const struct LDKOpenChannel *NONNULL_PTR obj);
	public static native Uint8Array OpenChannel_write(number obj);
	// struct LDKOpenChannel OpenChannel_read(struct LDKu8slice ser);
	public static native number OpenChannel_read(Uint8Array ser);
	// struct LDKCVec_u8Z RevokeAndACK_write(const struct LDKRevokeAndACK *NONNULL_PTR obj);
	public static native Uint8Array RevokeAndACK_write(number obj);
	// struct LDKRevokeAndACK RevokeAndACK_read(struct LDKu8slice ser);
	public static native number RevokeAndACK_read(Uint8Array ser);
	// struct LDKCVec_u8Z Shutdown_write(const struct LDKShutdown *NONNULL_PTR obj);
	public static native Uint8Array Shutdown_write(number obj);
	// struct LDKShutdown Shutdown_read(struct LDKu8slice ser);
	public static native number Shutdown_read(Uint8Array ser);
	// struct LDKCVec_u8Z UpdateFailHTLC_write(const struct LDKUpdateFailHTLC *NONNULL_PTR obj);
	public static native Uint8Array UpdateFailHTLC_write(number obj);
	// struct LDKUpdateFailHTLC UpdateFailHTLC_read(struct LDKu8slice ser);
	public static native number UpdateFailHTLC_read(Uint8Array ser);
	// struct LDKCVec_u8Z UpdateFailMalformedHTLC_write(const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR obj);
	public static native Uint8Array UpdateFailMalformedHTLC_write(number obj);
	// struct LDKUpdateFailMalformedHTLC UpdateFailMalformedHTLC_read(struct LDKu8slice ser);
	public static native number UpdateFailMalformedHTLC_read(Uint8Array ser);
	// struct LDKCVec_u8Z UpdateFee_write(const struct LDKUpdateFee *NONNULL_PTR obj);
	public static native Uint8Array UpdateFee_write(number obj);
	// struct LDKUpdateFee UpdateFee_read(struct LDKu8slice ser);
	public static native number UpdateFee_read(Uint8Array ser);
	// struct LDKCVec_u8Z UpdateFulfillHTLC_write(const struct LDKUpdateFulfillHTLC *NONNULL_PTR obj);
	public static native Uint8Array UpdateFulfillHTLC_write(number obj);
	// struct LDKUpdateFulfillHTLC UpdateFulfillHTLC_read(struct LDKu8slice ser);
	public static native number UpdateFulfillHTLC_read(Uint8Array ser);
	// struct LDKCVec_u8Z UpdateAddHTLC_write(const struct LDKUpdateAddHTLC *NONNULL_PTR obj);
	public static native Uint8Array UpdateAddHTLC_write(number obj);
	// struct LDKUpdateAddHTLC UpdateAddHTLC_read(struct LDKu8slice ser);
	public static native number UpdateAddHTLC_read(Uint8Array ser);
	// struct LDKCVec_u8Z Ping_write(const struct LDKPing *NONNULL_PTR obj);
	public static native Uint8Array Ping_write(number obj);
	// struct LDKCResult_PingDecodeErrorZ Ping_read(struct LDKu8slice ser);
	public static native number Ping_read(Uint8Array ser);
	// struct LDKCVec_u8Z Pong_write(const struct LDKPong *NONNULL_PTR obj);
	public static native Uint8Array Pong_write(number obj);
	// struct LDKCResult_PongDecodeErrorZ Pong_read(struct LDKu8slice ser);
	public static native number Pong_read(Uint8Array ser);
	// struct LDKCVec_u8Z UnsignedChannelAnnouncement_write(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR obj);
	public static native Uint8Array UnsignedChannelAnnouncement_write(number obj);
	// struct LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ UnsignedChannelAnnouncement_read(struct LDKu8slice ser);
	public static native number UnsignedChannelAnnouncement_read(Uint8Array ser);
	// struct LDKCVec_u8Z ChannelAnnouncement_write(const struct LDKChannelAnnouncement *NONNULL_PTR obj);
	public static native Uint8Array ChannelAnnouncement_write(number obj);
	// struct LDKChannelAnnouncement ChannelAnnouncement_read(struct LDKu8slice ser);
	public static native number ChannelAnnouncement_read(Uint8Array ser);
	// struct LDKCVec_u8Z UnsignedChannelUpdate_write(const struct LDKUnsignedChannelUpdate *NONNULL_PTR obj);
	public static native Uint8Array UnsignedChannelUpdate_write(number obj);
	// struct LDKCResult_UnsignedChannelUpdateDecodeErrorZ UnsignedChannelUpdate_read(struct LDKu8slice ser);
	public static native number UnsignedChannelUpdate_read(Uint8Array ser);
	// struct LDKCVec_u8Z ChannelUpdate_write(const struct LDKChannelUpdate *NONNULL_PTR obj);
	public static native Uint8Array ChannelUpdate_write(number obj);
	// struct LDKChannelUpdate ChannelUpdate_read(struct LDKu8slice ser);
	public static native number ChannelUpdate_read(Uint8Array ser);
	// struct LDKCVec_u8Z ErrorMessage_write(const struct LDKErrorMessage *NONNULL_PTR obj);
	public static native Uint8Array ErrorMessage_write(number obj);
	// struct LDKCResult_ErrorMessageDecodeErrorZ ErrorMessage_read(struct LDKu8slice ser);
	public static native number ErrorMessage_read(Uint8Array ser);
	// struct LDKCVec_u8Z UnsignedNodeAnnouncement_write(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR obj);
	public static native Uint8Array UnsignedNodeAnnouncement_write(number obj);
	// struct LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ UnsignedNodeAnnouncement_read(struct LDKu8slice ser);
	public static native number UnsignedNodeAnnouncement_read(Uint8Array ser);
	// struct LDKCVec_u8Z NodeAnnouncement_write(const struct LDKNodeAnnouncement *NONNULL_PTR obj);
	public static native Uint8Array NodeAnnouncement_write(number obj);
	// struct LDKNodeAnnouncement NodeAnnouncement_read(struct LDKu8slice ser);
	public static native number NodeAnnouncement_read(Uint8Array ser);
	// struct LDKCResult_QueryShortChannelIdsDecodeErrorZ QueryShortChannelIds_read(struct LDKu8slice ser);
	public static native number QueryShortChannelIds_read(Uint8Array ser);
	// struct LDKCVec_u8Z QueryShortChannelIds_write(const struct LDKQueryShortChannelIds *NONNULL_PTR obj);
	public static native Uint8Array QueryShortChannelIds_write(number obj);
	// struct LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ ReplyShortChannelIdsEnd_read(struct LDKu8slice ser);
	public static native number ReplyShortChannelIdsEnd_read(Uint8Array ser);
	// struct LDKCVec_u8Z ReplyShortChannelIdsEnd_write(const struct LDKReplyShortChannelIdsEnd *NONNULL_PTR obj);
	public static native Uint8Array ReplyShortChannelIdsEnd_write(number obj);
	// struct LDKCResult_QueryChannelRangeDecodeErrorZ QueryChannelRange_read(struct LDKu8slice ser);
	public static native number QueryChannelRange_read(Uint8Array ser);
	// struct LDKCVec_u8Z QueryChannelRange_write(const struct LDKQueryChannelRange *NONNULL_PTR obj);
	public static native Uint8Array QueryChannelRange_write(number obj);
	// struct LDKCResult_ReplyChannelRangeDecodeErrorZ ReplyChannelRange_read(struct LDKu8slice ser);
	public static native number ReplyChannelRange_read(Uint8Array ser);
	// struct LDKCVec_u8Z ReplyChannelRange_write(const struct LDKReplyChannelRange *NONNULL_PTR obj);
	public static native Uint8Array ReplyChannelRange_write(number obj);
	// struct LDKCResult_GossipTimestampFilterDecodeErrorZ GossipTimestampFilter_read(struct LDKu8slice ser);
	public static native number GossipTimestampFilter_read(Uint8Array ser);
	// struct LDKCVec_u8Z GossipTimestampFilter_write(const struct LDKGossipTimestampFilter *NONNULL_PTR obj);
	public static native Uint8Array GossipTimestampFilter_write(number obj);
	// void MessageHandler_free(struct LDKMessageHandler this_ptr);
	public static native void MessageHandler_free(number this_ptr);
	// const struct LDKChannelMessageHandler *MessageHandler_get_chan_handler(const struct LDKMessageHandler *NONNULL_PTR this_ptr);
	public static native number MessageHandler_get_chan_handler(number this_ptr);
	// void MessageHandler_set_chan_handler(struct LDKMessageHandler *NONNULL_PTR this_ptr, struct LDKChannelMessageHandler val);
	public static native void MessageHandler_set_chan_handler(number this_ptr, number val);
	// const struct LDKRoutingMessageHandler *MessageHandler_get_route_handler(const struct LDKMessageHandler *NONNULL_PTR this_ptr);
	public static native number MessageHandler_get_route_handler(number this_ptr);
	// void MessageHandler_set_route_handler(struct LDKMessageHandler *NONNULL_PTR this_ptr, struct LDKRoutingMessageHandler val);
	public static native void MessageHandler_set_route_handler(number this_ptr, number val);
	// MUST_USE_RES struct LDKMessageHandler MessageHandler_new(struct LDKChannelMessageHandler chan_handler_arg, struct LDKRoutingMessageHandler route_handler_arg);
	public static native number MessageHandler_new(number chan_handler_arg, number route_handler_arg);
	// struct LDKSocketDescriptor SocketDescriptor_clone(const struct LDKSocketDescriptor *NONNULL_PTR orig);
	public static native number SocketDescriptor_clone(number orig);
	// void SocketDescriptor_free(struct LDKSocketDescriptor this_ptr);
	public static native void SocketDescriptor_free(number this_ptr);
	// void PeerHandleError_free(struct LDKPeerHandleError this_ptr);
	public static native void PeerHandleError_free(number this_ptr);
	// bool PeerHandleError_get_no_connection_possible(const struct LDKPeerHandleError *NONNULL_PTR this_ptr);
	public static native boolean PeerHandleError_get_no_connection_possible(number this_ptr);
	// void PeerHandleError_set_no_connection_possible(struct LDKPeerHandleError *NONNULL_PTR this_ptr, bool val);
	public static native void PeerHandleError_set_no_connection_possible(number this_ptr, boolean val);
	// MUST_USE_RES struct LDKPeerHandleError PeerHandleError_new(bool no_connection_possible_arg);
	public static native number PeerHandleError_new(boolean no_connection_possible_arg);
	// void PeerManager_free(struct LDKPeerManager this_ptr);
	public static native void PeerManager_free(number this_ptr);
	// MUST_USE_RES struct LDKPeerManager PeerManager_new(struct LDKMessageHandler message_handler, struct LDKSecretKey our_node_secret, const uint8_t (*ephemeral_random_data)[32], struct LDKLogger logger);
	public static native number PeerManager_new(number message_handler, Uint8Array our_node_secret, Uint8Array ephemeral_random_data, number logger);
	// MUST_USE_RES struct LDKCVec_PublicKeyZ PeerManager_get_peer_node_ids(const struct LDKPeerManager *NONNULL_PTR this_arg);
	public static native Uint8Array[] PeerManager_get_peer_node_ids(number this_arg);
	// MUST_USE_RES struct LDKCResult_CVec_u8ZPeerHandleErrorZ PeerManager_new_outbound_connection(const struct LDKPeerManager *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, struct LDKSocketDescriptor descriptor);
	public static native number PeerManager_new_outbound_connection(number this_arg, Uint8Array their_node_id, number descriptor);
	// MUST_USE_RES struct LDKCResult_NonePeerHandleErrorZ PeerManager_new_inbound_connection(const struct LDKPeerManager *NONNULL_PTR this_arg, struct LDKSocketDescriptor descriptor);
	public static native number PeerManager_new_inbound_connection(number this_arg, number descriptor);
	// MUST_USE_RES struct LDKCResult_NonePeerHandleErrorZ PeerManager_write_buffer_space_avail(const struct LDKPeerManager *NONNULL_PTR this_arg, struct LDKSocketDescriptor *NONNULL_PTR descriptor);
	public static native number PeerManager_write_buffer_space_avail(number this_arg, number descriptor);
	// MUST_USE_RES struct LDKCResult_boolPeerHandleErrorZ PeerManager_read_event(const struct LDKPeerManager *NONNULL_PTR this_arg, struct LDKSocketDescriptor *NONNULL_PTR peer_descriptor, struct LDKu8slice data);
	public static native number PeerManager_read_event(number this_arg, number peer_descriptor, Uint8Array data);
	// void PeerManager_process_events(const struct LDKPeerManager *NONNULL_PTR this_arg);
	public static native void PeerManager_process_events(number this_arg);
	// void PeerManager_socket_disconnected(const struct LDKPeerManager *NONNULL_PTR this_arg, const struct LDKSocketDescriptor *NONNULL_PTR descriptor);
	public static native void PeerManager_socket_disconnected(number this_arg, number descriptor);
	// void PeerManager_timer_tick_occured(const struct LDKPeerManager *NONNULL_PTR this_arg);
	public static native void PeerManager_timer_tick_occured(number this_arg);
	// struct LDKThirtyTwoBytes build_commitment_secret(const uint8_t (*commitment_seed)[32], uint64_t idx);
	public static native Uint8Array build_commitment_secret(Uint8Array commitment_seed, number idx);
	// struct LDKCResult_SecretKeySecpErrorZ derive_private_key(struct LDKPublicKey per_commitment_point, const uint8_t (*base_secret)[32]);
	public static native number derive_private_key(Uint8Array per_commitment_point, Uint8Array base_secret);
	// struct LDKCResult_PublicKeySecpErrorZ derive_public_key(struct LDKPublicKey per_commitment_point, struct LDKPublicKey base_point);
	public static native number derive_public_key(Uint8Array per_commitment_point, Uint8Array base_point);
	// struct LDKCResult_SecretKeySecpErrorZ derive_private_revocation_key(const uint8_t (*per_commitment_secret)[32], const uint8_t (*countersignatory_revocation_base_secret)[32]);
	public static native number derive_private_revocation_key(Uint8Array per_commitment_secret, Uint8Array countersignatory_revocation_base_secret);
	// struct LDKCResult_PublicKeySecpErrorZ derive_public_revocation_key(struct LDKPublicKey per_commitment_point, struct LDKPublicKey countersignatory_revocation_base_point);
	public static native number derive_public_revocation_key(Uint8Array per_commitment_point, Uint8Array countersignatory_revocation_base_point);
	// void TxCreationKeys_free(struct LDKTxCreationKeys this_ptr);
	public static native void TxCreationKeys_free(number this_ptr);
	// struct LDKTxCreationKeys TxCreationKeys_clone(const struct LDKTxCreationKeys *NONNULL_PTR orig);
	public static native number TxCreationKeys_clone(number orig);
	// struct LDKPublicKey TxCreationKeys_get_per_commitment_point(const struct LDKTxCreationKeys *NONNULL_PTR this_ptr);
	public static native Uint8Array TxCreationKeys_get_per_commitment_point(number this_ptr);
	// void TxCreationKeys_set_per_commitment_point(struct LDKTxCreationKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void TxCreationKeys_set_per_commitment_point(number this_ptr, Uint8Array val);
	// struct LDKPublicKey TxCreationKeys_get_revocation_key(const struct LDKTxCreationKeys *NONNULL_PTR this_ptr);
	public static native Uint8Array TxCreationKeys_get_revocation_key(number this_ptr);
	// void TxCreationKeys_set_revocation_key(struct LDKTxCreationKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void TxCreationKeys_set_revocation_key(number this_ptr, Uint8Array val);
	// struct LDKPublicKey TxCreationKeys_get_broadcaster_htlc_key(const struct LDKTxCreationKeys *NONNULL_PTR this_ptr);
	public static native Uint8Array TxCreationKeys_get_broadcaster_htlc_key(number this_ptr);
	// void TxCreationKeys_set_broadcaster_htlc_key(struct LDKTxCreationKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void TxCreationKeys_set_broadcaster_htlc_key(number this_ptr, Uint8Array val);
	// struct LDKPublicKey TxCreationKeys_get_countersignatory_htlc_key(const struct LDKTxCreationKeys *NONNULL_PTR this_ptr);
	public static native Uint8Array TxCreationKeys_get_countersignatory_htlc_key(number this_ptr);
	// void TxCreationKeys_set_countersignatory_htlc_key(struct LDKTxCreationKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void TxCreationKeys_set_countersignatory_htlc_key(number this_ptr, Uint8Array val);
	// struct LDKPublicKey TxCreationKeys_get_broadcaster_delayed_payment_key(const struct LDKTxCreationKeys *NONNULL_PTR this_ptr);
	public static native Uint8Array TxCreationKeys_get_broadcaster_delayed_payment_key(number this_ptr);
	// void TxCreationKeys_set_broadcaster_delayed_payment_key(struct LDKTxCreationKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void TxCreationKeys_set_broadcaster_delayed_payment_key(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKTxCreationKeys TxCreationKeys_new(struct LDKPublicKey per_commitment_point_arg, struct LDKPublicKey revocation_key_arg, struct LDKPublicKey broadcaster_htlc_key_arg, struct LDKPublicKey countersignatory_htlc_key_arg, struct LDKPublicKey broadcaster_delayed_payment_key_arg);
	public static native number TxCreationKeys_new(Uint8Array per_commitment_point_arg, Uint8Array revocation_key_arg, Uint8Array broadcaster_htlc_key_arg, Uint8Array countersignatory_htlc_key_arg, Uint8Array broadcaster_delayed_payment_key_arg);
	// struct LDKCVec_u8Z TxCreationKeys_write(const struct LDKTxCreationKeys *NONNULL_PTR obj);
	public static native Uint8Array TxCreationKeys_write(number obj);
	// struct LDKTxCreationKeys TxCreationKeys_read(struct LDKu8slice ser);
	public static native number TxCreationKeys_read(Uint8Array ser);
	// void ChannelPublicKeys_free(struct LDKChannelPublicKeys this_ptr);
	public static native void ChannelPublicKeys_free(number this_ptr);
	// struct LDKChannelPublicKeys ChannelPublicKeys_clone(const struct LDKChannelPublicKeys *NONNULL_PTR orig);
	public static native number ChannelPublicKeys_clone(number orig);
	// struct LDKPublicKey ChannelPublicKeys_get_funding_pubkey(const struct LDKChannelPublicKeys *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelPublicKeys_get_funding_pubkey(number this_ptr);
	// void ChannelPublicKeys_set_funding_pubkey(struct LDKChannelPublicKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void ChannelPublicKeys_set_funding_pubkey(number this_ptr, Uint8Array val);
	// struct LDKPublicKey ChannelPublicKeys_get_revocation_basepoint(const struct LDKChannelPublicKeys *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelPublicKeys_get_revocation_basepoint(number this_ptr);
	// void ChannelPublicKeys_set_revocation_basepoint(struct LDKChannelPublicKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void ChannelPublicKeys_set_revocation_basepoint(number this_ptr, Uint8Array val);
	// struct LDKPublicKey ChannelPublicKeys_get_payment_point(const struct LDKChannelPublicKeys *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelPublicKeys_get_payment_point(number this_ptr);
	// void ChannelPublicKeys_set_payment_point(struct LDKChannelPublicKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void ChannelPublicKeys_set_payment_point(number this_ptr, Uint8Array val);
	// struct LDKPublicKey ChannelPublicKeys_get_delayed_payment_basepoint(const struct LDKChannelPublicKeys *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelPublicKeys_get_delayed_payment_basepoint(number this_ptr);
	// void ChannelPublicKeys_set_delayed_payment_basepoint(struct LDKChannelPublicKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void ChannelPublicKeys_set_delayed_payment_basepoint(number this_ptr, Uint8Array val);
	// struct LDKPublicKey ChannelPublicKeys_get_htlc_basepoint(const struct LDKChannelPublicKeys *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelPublicKeys_get_htlc_basepoint(number this_ptr);
	// void ChannelPublicKeys_set_htlc_basepoint(struct LDKChannelPublicKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void ChannelPublicKeys_set_htlc_basepoint(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKChannelPublicKeys ChannelPublicKeys_new(struct LDKPublicKey funding_pubkey_arg, struct LDKPublicKey revocation_basepoint_arg, struct LDKPublicKey payment_point_arg, struct LDKPublicKey delayed_payment_basepoint_arg, struct LDKPublicKey htlc_basepoint_arg);
	public static native number ChannelPublicKeys_new(Uint8Array funding_pubkey_arg, Uint8Array revocation_basepoint_arg, Uint8Array payment_point_arg, Uint8Array delayed_payment_basepoint_arg, Uint8Array htlc_basepoint_arg);
	// struct LDKCVec_u8Z ChannelPublicKeys_write(const struct LDKChannelPublicKeys *NONNULL_PTR obj);
	public static native Uint8Array ChannelPublicKeys_write(number obj);
	// struct LDKChannelPublicKeys ChannelPublicKeys_read(struct LDKu8slice ser);
	public static native number ChannelPublicKeys_read(Uint8Array ser);
	// MUST_USE_RES struct LDKCResult_TxCreationKeysSecpErrorZ TxCreationKeys_derive_new(struct LDKPublicKey per_commitment_point, struct LDKPublicKey broadcaster_delayed_payment_base, struct LDKPublicKey broadcaster_htlc_base, struct LDKPublicKey countersignatory_revocation_base, struct LDKPublicKey countersignatory_htlc_base);
	public static native number TxCreationKeys_derive_new(Uint8Array per_commitment_point, Uint8Array broadcaster_delayed_payment_base, Uint8Array broadcaster_htlc_base, Uint8Array countersignatory_revocation_base, Uint8Array countersignatory_htlc_base);
	// MUST_USE_RES struct LDKCResult_TxCreationKeysSecpErrorZ TxCreationKeys_from_channel_static_keys(struct LDKPublicKey per_commitment_point, const struct LDKChannelPublicKeys *NONNULL_PTR broadcaster_keys, const struct LDKChannelPublicKeys *NONNULL_PTR countersignatory_keys);
	public static native number TxCreationKeys_from_channel_static_keys(Uint8Array per_commitment_point, number broadcaster_keys, number countersignatory_keys);
	// struct LDKCVec_u8Z get_revokeable_redeemscript(struct LDKPublicKey revocation_key, uint16_t contest_delay, struct LDKPublicKey broadcaster_delayed_payment_key);
	public static native Uint8Array get_revokeable_redeemscript(Uint8Array revocation_key, number contest_delay, Uint8Array broadcaster_delayed_payment_key);
	// void HTLCOutputInCommitment_free(struct LDKHTLCOutputInCommitment this_ptr);
	public static native void HTLCOutputInCommitment_free(number this_ptr);
	// struct LDKHTLCOutputInCommitment HTLCOutputInCommitment_clone(const struct LDKHTLCOutputInCommitment *NONNULL_PTR orig);
	public static native number HTLCOutputInCommitment_clone(number orig);
	// bool HTLCOutputInCommitment_get_offered(const struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr);
	public static native boolean HTLCOutputInCommitment_get_offered(number this_ptr);
	// void HTLCOutputInCommitment_set_offered(struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr, bool val);
	public static native void HTLCOutputInCommitment_set_offered(number this_ptr, boolean val);
	// uint64_t HTLCOutputInCommitment_get_amount_msat(const struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr);
	public static native number HTLCOutputInCommitment_get_amount_msat(number this_ptr);
	// void HTLCOutputInCommitment_set_amount_msat(struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr, uint64_t val);
	public static native void HTLCOutputInCommitment_set_amount_msat(number this_ptr, number val);
	// uint32_t HTLCOutputInCommitment_get_cltv_expiry(const struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr);
	public static native number HTLCOutputInCommitment_get_cltv_expiry(number this_ptr);
	// void HTLCOutputInCommitment_set_cltv_expiry(struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr, uint32_t val);
	public static native void HTLCOutputInCommitment_set_cltv_expiry(number this_ptr, number val);
	// const uint8_t (*HTLCOutputInCommitment_get_payment_hash(const struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array HTLCOutputInCommitment_get_payment_hash(number this_ptr);
	// void HTLCOutputInCommitment_set_payment_hash(struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void HTLCOutputInCommitment_set_payment_hash(number this_ptr, Uint8Array val);
	// struct LDKCVec_u8Z HTLCOutputInCommitment_write(const struct LDKHTLCOutputInCommitment *NONNULL_PTR obj);
	public static native Uint8Array HTLCOutputInCommitment_write(number obj);
	// struct LDKHTLCOutputInCommitment HTLCOutputInCommitment_read(struct LDKu8slice ser);
	public static native number HTLCOutputInCommitment_read(Uint8Array ser);
	// struct LDKCVec_u8Z get_htlc_redeemscript(const struct LDKHTLCOutputInCommitment *NONNULL_PTR htlc, const struct LDKTxCreationKeys *NONNULL_PTR keys);
	public static native Uint8Array get_htlc_redeemscript(number htlc, number keys);
	// struct LDKCVec_u8Z make_funding_redeemscript(struct LDKPublicKey broadcaster, struct LDKPublicKey countersignatory);
	public static native Uint8Array make_funding_redeemscript(Uint8Array broadcaster, Uint8Array countersignatory);
	// struct LDKTransaction build_htlc_transaction(const uint8_t (*prev_hash)[32], uint32_t feerate_per_kw, uint16_t contest_delay, const struct LDKHTLCOutputInCommitment *NONNULL_PTR htlc, struct LDKPublicKey broadcaster_delayed_payment_key, struct LDKPublicKey revocation_key);
	public static native Uint8Array build_htlc_transaction(Uint8Array prev_hash, number feerate_per_kw, number contest_delay, number htlc, Uint8Array broadcaster_delayed_payment_key, Uint8Array revocation_key);
	// void ChannelTransactionParameters_free(struct LDKChannelTransactionParameters this_ptr);
	public static native void ChannelTransactionParameters_free(number this_ptr);
	// struct LDKChannelTransactionParameters ChannelTransactionParameters_clone(const struct LDKChannelTransactionParameters *NONNULL_PTR orig);
	public static native number ChannelTransactionParameters_clone(number orig);
	// struct LDKChannelPublicKeys ChannelTransactionParameters_get_holder_pubkeys(const struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr);
	public static native number ChannelTransactionParameters_get_holder_pubkeys(number this_ptr);
	// void ChannelTransactionParameters_set_holder_pubkeys(struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr, struct LDKChannelPublicKeys val);
	public static native void ChannelTransactionParameters_set_holder_pubkeys(number this_ptr, number val);
	// uint16_t ChannelTransactionParameters_get_holder_selected_contest_delay(const struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr);
	public static native number ChannelTransactionParameters_get_holder_selected_contest_delay(number this_ptr);
	// void ChannelTransactionParameters_set_holder_selected_contest_delay(struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr, uint16_t val);
	public static native void ChannelTransactionParameters_set_holder_selected_contest_delay(number this_ptr, number val);
	// bool ChannelTransactionParameters_get_is_outbound_from_holder(const struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr);
	public static native boolean ChannelTransactionParameters_get_is_outbound_from_holder(number this_ptr);
	// void ChannelTransactionParameters_set_is_outbound_from_holder(struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr, bool val);
	public static native void ChannelTransactionParameters_set_is_outbound_from_holder(number this_ptr, boolean val);
	// struct LDKCounterpartyChannelTransactionParameters ChannelTransactionParameters_get_counterparty_parameters(const struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr);
	public static native number ChannelTransactionParameters_get_counterparty_parameters(number this_ptr);
	// void ChannelTransactionParameters_set_counterparty_parameters(struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr, struct LDKCounterpartyChannelTransactionParameters val);
	public static native void ChannelTransactionParameters_set_counterparty_parameters(number this_ptr, number val);
	// struct LDKOutPoint ChannelTransactionParameters_get_funding_outpoint(const struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr);
	public static native number ChannelTransactionParameters_get_funding_outpoint(number this_ptr);
	// void ChannelTransactionParameters_set_funding_outpoint(struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr, struct LDKOutPoint val);
	public static native void ChannelTransactionParameters_set_funding_outpoint(number this_ptr, number val);
	// MUST_USE_RES struct LDKChannelTransactionParameters ChannelTransactionParameters_new(struct LDKChannelPublicKeys holder_pubkeys_arg, uint16_t holder_selected_contest_delay_arg, bool is_outbound_from_holder_arg, struct LDKCounterpartyChannelTransactionParameters counterparty_parameters_arg, struct LDKOutPoint funding_outpoint_arg);
	public static native number ChannelTransactionParameters_new(number holder_pubkeys_arg, number holder_selected_contest_delay_arg, boolean is_outbound_from_holder_arg, number counterparty_parameters_arg, number funding_outpoint_arg);
	// void CounterpartyChannelTransactionParameters_free(struct LDKCounterpartyChannelTransactionParameters this_ptr);
	public static native void CounterpartyChannelTransactionParameters_free(number this_ptr);
	// struct LDKCounterpartyChannelTransactionParameters CounterpartyChannelTransactionParameters_clone(const struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR orig);
	public static native number CounterpartyChannelTransactionParameters_clone(number orig);
	// struct LDKChannelPublicKeys CounterpartyChannelTransactionParameters_get_pubkeys(const struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR this_ptr);
	public static native number CounterpartyChannelTransactionParameters_get_pubkeys(number this_ptr);
	// void CounterpartyChannelTransactionParameters_set_pubkeys(struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR this_ptr, struct LDKChannelPublicKeys val);
	public static native void CounterpartyChannelTransactionParameters_set_pubkeys(number this_ptr, number val);
	// uint16_t CounterpartyChannelTransactionParameters_get_selected_contest_delay(const struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR this_ptr);
	public static native number CounterpartyChannelTransactionParameters_get_selected_contest_delay(number this_ptr);
	// void CounterpartyChannelTransactionParameters_set_selected_contest_delay(struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR this_ptr, uint16_t val);
	public static native void CounterpartyChannelTransactionParameters_set_selected_contest_delay(number this_ptr, number val);
	// MUST_USE_RES struct LDKCounterpartyChannelTransactionParameters CounterpartyChannelTransactionParameters_new(struct LDKChannelPublicKeys pubkeys_arg, uint16_t selected_contest_delay_arg);
	public static native number CounterpartyChannelTransactionParameters_new(number pubkeys_arg, number selected_contest_delay_arg);
	// MUST_USE_RES bool ChannelTransactionParameters_is_populated(const struct LDKChannelTransactionParameters *NONNULL_PTR this_arg);
	public static native boolean ChannelTransactionParameters_is_populated(number this_arg);
	// MUST_USE_RES struct LDKDirectedChannelTransactionParameters ChannelTransactionParameters_as_holder_broadcastable(const struct LDKChannelTransactionParameters *NONNULL_PTR this_arg);
	public static native number ChannelTransactionParameters_as_holder_broadcastable(number this_arg);
	// MUST_USE_RES struct LDKDirectedChannelTransactionParameters ChannelTransactionParameters_as_counterparty_broadcastable(const struct LDKChannelTransactionParameters *NONNULL_PTR this_arg);
	public static native number ChannelTransactionParameters_as_counterparty_broadcastable(number this_arg);
	// struct LDKCVec_u8Z CounterpartyChannelTransactionParameters_write(const struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR obj);
	public static native Uint8Array CounterpartyChannelTransactionParameters_write(number obj);
	// struct LDKCounterpartyChannelTransactionParameters CounterpartyChannelTransactionParameters_read(struct LDKu8slice ser);
	public static native number CounterpartyChannelTransactionParameters_read(Uint8Array ser);
	// struct LDKCVec_u8Z ChannelTransactionParameters_write(const struct LDKChannelTransactionParameters *NONNULL_PTR obj);
	public static native Uint8Array ChannelTransactionParameters_write(number obj);
	// struct LDKChannelTransactionParameters ChannelTransactionParameters_read(struct LDKu8slice ser);
	public static native number ChannelTransactionParameters_read(Uint8Array ser);
	// void DirectedChannelTransactionParameters_free(struct LDKDirectedChannelTransactionParameters this_ptr);
	public static native void DirectedChannelTransactionParameters_free(number this_ptr);
	// MUST_USE_RES struct LDKChannelPublicKeys DirectedChannelTransactionParameters_broadcaster_pubkeys(const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR this_arg);
	public static native number DirectedChannelTransactionParameters_broadcaster_pubkeys(number this_arg);
	// MUST_USE_RES struct LDKChannelPublicKeys DirectedChannelTransactionParameters_countersignatory_pubkeys(const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR this_arg);
	public static native number DirectedChannelTransactionParameters_countersignatory_pubkeys(number this_arg);
	// MUST_USE_RES uint16_t DirectedChannelTransactionParameters_contest_delay(const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR this_arg);
	public static native number DirectedChannelTransactionParameters_contest_delay(number this_arg);
	// MUST_USE_RES bool DirectedChannelTransactionParameters_is_outbound(const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR this_arg);
	public static native boolean DirectedChannelTransactionParameters_is_outbound(number this_arg);
	// MUST_USE_RES struct LDKOutPoint DirectedChannelTransactionParameters_funding_outpoint(const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR this_arg);
	public static native number DirectedChannelTransactionParameters_funding_outpoint(number this_arg);
	// void HolderCommitmentTransaction_free(struct LDKHolderCommitmentTransaction this_ptr);
	public static native void HolderCommitmentTransaction_free(number this_ptr);
	// struct LDKHolderCommitmentTransaction HolderCommitmentTransaction_clone(const struct LDKHolderCommitmentTransaction *NONNULL_PTR orig);
	public static native number HolderCommitmentTransaction_clone(number orig);
	// struct LDKSignature HolderCommitmentTransaction_get_counterparty_sig(const struct LDKHolderCommitmentTransaction *NONNULL_PTR this_ptr);
	public static native Uint8Array HolderCommitmentTransaction_get_counterparty_sig(number this_ptr);
	// void HolderCommitmentTransaction_set_counterparty_sig(struct LDKHolderCommitmentTransaction *NONNULL_PTR this_ptr, struct LDKSignature val);
	public static native void HolderCommitmentTransaction_set_counterparty_sig(number this_ptr, Uint8Array val);
	// void HolderCommitmentTransaction_set_counterparty_htlc_sigs(struct LDKHolderCommitmentTransaction *NONNULL_PTR this_ptr, struct LDKCVec_SignatureZ val);
	public static native void HolderCommitmentTransaction_set_counterparty_htlc_sigs(number this_ptr, Uint8Array[] val);
	// struct LDKCVec_u8Z HolderCommitmentTransaction_write(const struct LDKHolderCommitmentTransaction *NONNULL_PTR obj);
	public static native Uint8Array HolderCommitmentTransaction_write(number obj);
	// struct LDKHolderCommitmentTransaction HolderCommitmentTransaction_read(struct LDKu8slice ser);
	public static native number HolderCommitmentTransaction_read(Uint8Array ser);
	// MUST_USE_RES struct LDKHolderCommitmentTransaction HolderCommitmentTransaction_new(struct LDKCommitmentTransaction commitment_tx, struct LDKSignature counterparty_sig, struct LDKCVec_SignatureZ counterparty_htlc_sigs, struct LDKPublicKey holder_funding_key, struct LDKPublicKey counterparty_funding_key);
	public static native number HolderCommitmentTransaction_new(number commitment_tx, Uint8Array counterparty_sig, Uint8Array[] counterparty_htlc_sigs, Uint8Array holder_funding_key, Uint8Array counterparty_funding_key);
	// void BuiltCommitmentTransaction_free(struct LDKBuiltCommitmentTransaction this_ptr);
	public static native void BuiltCommitmentTransaction_free(number this_ptr);
	// struct LDKBuiltCommitmentTransaction BuiltCommitmentTransaction_clone(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR orig);
	public static native number BuiltCommitmentTransaction_clone(number orig);
	// struct LDKTransaction BuiltCommitmentTransaction_get_transaction(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_ptr);
	public static native Uint8Array BuiltCommitmentTransaction_get_transaction(number this_ptr);
	// void BuiltCommitmentTransaction_set_transaction(struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_ptr, struct LDKTransaction val);
	public static native void BuiltCommitmentTransaction_set_transaction(number this_ptr, Uint8Array val);
	// const uint8_t (*BuiltCommitmentTransaction_get_txid(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array BuiltCommitmentTransaction_get_txid(number this_ptr);
	// void BuiltCommitmentTransaction_set_txid(struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void BuiltCommitmentTransaction_set_txid(number this_ptr, Uint8Array val);
	// MUST_USE_RES struct LDKBuiltCommitmentTransaction BuiltCommitmentTransaction_new(struct LDKTransaction transaction_arg, struct LDKThirtyTwoBytes txid_arg);
	public static native number BuiltCommitmentTransaction_new(Uint8Array transaction_arg, Uint8Array txid_arg);
	// struct LDKCVec_u8Z BuiltCommitmentTransaction_write(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR obj);
	public static native Uint8Array BuiltCommitmentTransaction_write(number obj);
	// struct LDKBuiltCommitmentTransaction BuiltCommitmentTransaction_read(struct LDKu8slice ser);
	public static native number BuiltCommitmentTransaction_read(Uint8Array ser);
	// MUST_USE_RES struct LDKThirtyTwoBytes BuiltCommitmentTransaction_get_sighash_all(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_arg, struct LDKu8slice funding_redeemscript, uint64_t channel_value_satoshis);
	public static native Uint8Array BuiltCommitmentTransaction_get_sighash_all(number this_arg, Uint8Array funding_redeemscript, number channel_value_satoshis);
	// MUST_USE_RES struct LDKSignature BuiltCommitmentTransaction_sign(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_arg, const uint8_t (*funding_key)[32], struct LDKu8slice funding_redeemscript, uint64_t channel_value_satoshis);
	public static native Uint8Array BuiltCommitmentTransaction_sign(number this_arg, Uint8Array funding_key, Uint8Array funding_redeemscript, number channel_value_satoshis);
	// void CommitmentTransaction_free(struct LDKCommitmentTransaction this_ptr);
	public static native void CommitmentTransaction_free(number this_ptr);
	// struct LDKCommitmentTransaction CommitmentTransaction_clone(const struct LDKCommitmentTransaction *NONNULL_PTR orig);
	public static native number CommitmentTransaction_clone(number orig);
	// struct LDKCVec_u8Z CommitmentTransaction_write(const struct LDKCommitmentTransaction *NONNULL_PTR obj);
	public static native Uint8Array CommitmentTransaction_write(number obj);
	// struct LDKCommitmentTransaction CommitmentTransaction_read(struct LDKu8slice ser);
	public static native number CommitmentTransaction_read(Uint8Array ser);
	// MUST_USE_RES uint64_t CommitmentTransaction_commitment_number(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg);
	public static native number CommitmentTransaction_commitment_number(number this_arg);
	// MUST_USE_RES uint64_t CommitmentTransaction_to_broadcaster_value_sat(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg);
	public static native number CommitmentTransaction_to_broadcaster_value_sat(number this_arg);
	// MUST_USE_RES uint64_t CommitmentTransaction_to_countersignatory_value_sat(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg);
	public static native number CommitmentTransaction_to_countersignatory_value_sat(number this_arg);
	// MUST_USE_RES uint32_t CommitmentTransaction_feerate_per_kw(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg);
	public static native number CommitmentTransaction_feerate_per_kw(number this_arg);
	// MUST_USE_RES struct LDKTrustedCommitmentTransaction CommitmentTransaction_trust(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg);
	public static native number CommitmentTransaction_trust(number this_arg);
	// MUST_USE_RES struct LDKCResult_TrustedCommitmentTransactionNoneZ CommitmentTransaction_verify(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg, const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR channel_parameters, const struct LDKChannelPublicKeys *NONNULL_PTR broadcaster_keys, const struct LDKChannelPublicKeys *NONNULL_PTR countersignatory_keys);
	public static native number CommitmentTransaction_verify(number this_arg, number channel_parameters, number broadcaster_keys, number countersignatory_keys);
	// void TrustedCommitmentTransaction_free(struct LDKTrustedCommitmentTransaction this_ptr);
	public static native void TrustedCommitmentTransaction_free(number this_ptr);
	// MUST_USE_RES struct LDKThirtyTwoBytes TrustedCommitmentTransaction_txid(const struct LDKTrustedCommitmentTransaction *NONNULL_PTR this_arg);
	public static native Uint8Array TrustedCommitmentTransaction_txid(number this_arg);
	// MUST_USE_RES struct LDKBuiltCommitmentTransaction TrustedCommitmentTransaction_built_transaction(const struct LDKTrustedCommitmentTransaction *NONNULL_PTR this_arg);
	public static native number TrustedCommitmentTransaction_built_transaction(number this_arg);
	// MUST_USE_RES struct LDKTxCreationKeys TrustedCommitmentTransaction_keys(const struct LDKTrustedCommitmentTransaction *NONNULL_PTR this_arg);
	public static native number TrustedCommitmentTransaction_keys(number this_arg);
	// MUST_USE_RES struct LDKCResult_CVec_SignatureZNoneZ TrustedCommitmentTransaction_get_htlc_sigs(const struct LDKTrustedCommitmentTransaction *NONNULL_PTR this_arg, const uint8_t (*htlc_base_key)[32], const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR channel_parameters);
	public static native number TrustedCommitmentTransaction_get_htlc_sigs(number this_arg, Uint8Array htlc_base_key, number channel_parameters);
	// uint64_t get_commitment_transaction_number_obscure_factor(struct LDKPublicKey broadcaster_payment_basepoint, struct LDKPublicKey countersignatory_payment_basepoint, bool outbound_from_broadcaster);
	public static native number get_commitment_transaction_number_obscure_factor(Uint8Array broadcaster_payment_basepoint, Uint8Array countersignatory_payment_basepoint, boolean outbound_from_broadcaster);
	// void InitFeatures_free(struct LDKInitFeatures this_ptr);
	public static native void InitFeatures_free(number this_ptr);
	// void NodeFeatures_free(struct LDKNodeFeatures this_ptr);
	public static native void NodeFeatures_free(number this_ptr);
	// void ChannelFeatures_free(struct LDKChannelFeatures this_ptr);
	public static native void ChannelFeatures_free(number this_ptr);
	// void RouteHop_free(struct LDKRouteHop this_ptr);
	public static native void RouteHop_free(number this_ptr);
	// struct LDKRouteHop RouteHop_clone(const struct LDKRouteHop *NONNULL_PTR orig);
	public static native number RouteHop_clone(number orig);
	// struct LDKPublicKey RouteHop_get_pubkey(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	public static native Uint8Array RouteHop_get_pubkey(number this_ptr);
	// void RouteHop_set_pubkey(struct LDKRouteHop *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void RouteHop_set_pubkey(number this_ptr, Uint8Array val);
	// struct LDKNodeFeatures RouteHop_get_node_features(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	public static native number RouteHop_get_node_features(number this_ptr);
	// void RouteHop_set_node_features(struct LDKRouteHop *NONNULL_PTR this_ptr, struct LDKNodeFeatures val);
	public static native void RouteHop_set_node_features(number this_ptr, number val);
	// uint64_t RouteHop_get_short_channel_id(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	public static native number RouteHop_get_short_channel_id(number this_ptr);
	// void RouteHop_set_short_channel_id(struct LDKRouteHop *NONNULL_PTR this_ptr, uint64_t val);
	public static native void RouteHop_set_short_channel_id(number this_ptr, number val);
	// struct LDKChannelFeatures RouteHop_get_channel_features(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	public static native number RouteHop_get_channel_features(number this_ptr);
	// void RouteHop_set_channel_features(struct LDKRouteHop *NONNULL_PTR this_ptr, struct LDKChannelFeatures val);
	public static native void RouteHop_set_channel_features(number this_ptr, number val);
	// uint64_t RouteHop_get_fee_msat(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	public static native number RouteHop_get_fee_msat(number this_ptr);
	// void RouteHop_set_fee_msat(struct LDKRouteHop *NONNULL_PTR this_ptr, uint64_t val);
	public static native void RouteHop_set_fee_msat(number this_ptr, number val);
	// uint32_t RouteHop_get_cltv_expiry_delta(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	public static native number RouteHop_get_cltv_expiry_delta(number this_ptr);
	// void RouteHop_set_cltv_expiry_delta(struct LDKRouteHop *NONNULL_PTR this_ptr, uint32_t val);
	public static native void RouteHop_set_cltv_expiry_delta(number this_ptr, number val);
	// MUST_USE_RES struct LDKRouteHop RouteHop_new(struct LDKPublicKey pubkey_arg, struct LDKNodeFeatures node_features_arg, uint64_t short_channel_id_arg, struct LDKChannelFeatures channel_features_arg, uint64_t fee_msat_arg, uint32_t cltv_expiry_delta_arg);
	public static native number RouteHop_new(Uint8Array pubkey_arg, number node_features_arg, number short_channel_id_arg, number channel_features_arg, number fee_msat_arg, number cltv_expiry_delta_arg);
	// void Route_free(struct LDKRoute this_ptr);
	public static native void Route_free(number this_ptr);
	// struct LDKRoute Route_clone(const struct LDKRoute *NONNULL_PTR orig);
	public static native number Route_clone(number orig);
	// void Route_set_paths(struct LDKRoute *NONNULL_PTR this_ptr, struct LDKCVec_CVec_RouteHopZZ val);
	public static native void Route_set_paths(number this_ptr, number[][] val);
	// MUST_USE_RES struct LDKRoute Route_new(struct LDKCVec_CVec_RouteHopZZ paths_arg);
	public static native number Route_new(number[][] paths_arg);
	// struct LDKCVec_u8Z Route_write(const struct LDKRoute *NONNULL_PTR obj);
	public static native Uint8Array Route_write(number obj);
	// struct LDKCResult_RouteDecodeErrorZ Route_read(struct LDKu8slice ser);
	public static native number Route_read(Uint8Array ser);
	// void RouteHint_free(struct LDKRouteHint this_ptr);
	public static native void RouteHint_free(number this_ptr);
	// struct LDKRouteHint RouteHint_clone(const struct LDKRouteHint *NONNULL_PTR orig);
	public static native number RouteHint_clone(number orig);
	// struct LDKPublicKey RouteHint_get_src_node_id(const struct LDKRouteHint *NONNULL_PTR this_ptr);
	public static native Uint8Array RouteHint_get_src_node_id(number this_ptr);
	// void RouteHint_set_src_node_id(struct LDKRouteHint *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void RouteHint_set_src_node_id(number this_ptr, Uint8Array val);
	// uint64_t RouteHint_get_short_channel_id(const struct LDKRouteHint *NONNULL_PTR this_ptr);
	public static native number RouteHint_get_short_channel_id(number this_ptr);
	// void RouteHint_set_short_channel_id(struct LDKRouteHint *NONNULL_PTR this_ptr, uint64_t val);
	public static native void RouteHint_set_short_channel_id(number this_ptr, number val);
	// struct LDKRoutingFees RouteHint_get_fees(const struct LDKRouteHint *NONNULL_PTR this_ptr);
	public static native number RouteHint_get_fees(number this_ptr);
	// void RouteHint_set_fees(struct LDKRouteHint *NONNULL_PTR this_ptr, struct LDKRoutingFees val);
	public static native void RouteHint_set_fees(number this_ptr, number val);
	// uint16_t RouteHint_get_cltv_expiry_delta(const struct LDKRouteHint *NONNULL_PTR this_ptr);
	public static native number RouteHint_get_cltv_expiry_delta(number this_ptr);
	// void RouteHint_set_cltv_expiry_delta(struct LDKRouteHint *NONNULL_PTR this_ptr, uint16_t val);
	public static native void RouteHint_set_cltv_expiry_delta(number this_ptr, number val);
	// uint64_t RouteHint_get_htlc_minimum_msat(const struct LDKRouteHint *NONNULL_PTR this_ptr);
	public static native number RouteHint_get_htlc_minimum_msat(number this_ptr);
	// void RouteHint_set_htlc_minimum_msat(struct LDKRouteHint *NONNULL_PTR this_ptr, uint64_t val);
	public static native void RouteHint_set_htlc_minimum_msat(number this_ptr, number val);
	// MUST_USE_RES struct LDKRouteHint RouteHint_new(struct LDKPublicKey src_node_id_arg, uint64_t short_channel_id_arg, struct LDKRoutingFees fees_arg, uint16_t cltv_expiry_delta_arg, uint64_t htlc_minimum_msat_arg);
	public static native number RouteHint_new(Uint8Array src_node_id_arg, number short_channel_id_arg, number fees_arg, number cltv_expiry_delta_arg, number htlc_minimum_msat_arg);
	// struct LDKCResult_RouteLightningErrorZ get_route(struct LDKPublicKey our_node_id, const struct LDKNetworkGraph *NONNULL_PTR network, struct LDKPublicKey target, struct LDKCVec_ChannelDetailsZ *first_hops, struct LDKCVec_RouteHintZ last_hops, uint64_t final_value_msat, uint32_t final_cltv, struct LDKLogger logger);
	public static native number get_route(Uint8Array our_node_id, number network, Uint8Array target, number[] first_hops, number[] last_hops, number final_value_msat, number final_cltv, number logger);
	// void NetworkGraph_free(struct LDKNetworkGraph this_ptr);
	public static native void NetworkGraph_free(number this_ptr);
	// void LockedNetworkGraph_free(struct LDKLockedNetworkGraph this_ptr);
	public static native void LockedNetworkGraph_free(number this_ptr);
	// void NetGraphMsgHandler_free(struct LDKNetGraphMsgHandler this_ptr);
	public static native void NetGraphMsgHandler_free(number this_ptr);
	// MUST_USE_RES struct LDKNetGraphMsgHandler NetGraphMsgHandler_new(struct LDKThirtyTwoBytes genesis_hash, struct LDKAccess *chain_access, struct LDKLogger logger);
	public static native number NetGraphMsgHandler_new(Uint8Array genesis_hash, number chain_access, number logger);
	// MUST_USE_RES struct LDKNetGraphMsgHandler NetGraphMsgHandler_from_net_graph(struct LDKAccess *chain_access, struct LDKLogger logger, struct LDKNetworkGraph network_graph);
	public static native number NetGraphMsgHandler_from_net_graph(number chain_access, number logger, number network_graph);
	// MUST_USE_RES struct LDKLockedNetworkGraph NetGraphMsgHandler_read_locked_graph(const struct LDKNetGraphMsgHandler *NONNULL_PTR this_arg);
	public static native number NetGraphMsgHandler_read_locked_graph(number this_arg);
	// MUST_USE_RES struct LDKNetworkGraph LockedNetworkGraph_graph(const struct LDKLockedNetworkGraph *NONNULL_PTR this_arg);
	public static native number LockedNetworkGraph_graph(number this_arg);
	// struct LDKRoutingMessageHandler NetGraphMsgHandler_as_RoutingMessageHandler(const struct LDKNetGraphMsgHandler *NONNULL_PTR this_arg);
	public static native number NetGraphMsgHandler_as_RoutingMessageHandler(number this_arg);
	// struct LDKMessageSendEventsProvider NetGraphMsgHandler_as_MessageSendEventsProvider(const struct LDKNetGraphMsgHandler *NONNULL_PTR this_arg);
	public static native number NetGraphMsgHandler_as_MessageSendEventsProvider(number this_arg);
	// void DirectionalChannelInfo_free(struct LDKDirectionalChannelInfo this_ptr);
	public static native void DirectionalChannelInfo_free(number this_ptr);
	// uint32_t DirectionalChannelInfo_get_last_update(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	public static native number DirectionalChannelInfo_get_last_update(number this_ptr);
	// void DirectionalChannelInfo_set_last_update(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, uint32_t val);
	public static native void DirectionalChannelInfo_set_last_update(number this_ptr, number val);
	// bool DirectionalChannelInfo_get_enabled(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	public static native boolean DirectionalChannelInfo_get_enabled(number this_ptr);
	// void DirectionalChannelInfo_set_enabled(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, bool val);
	public static native void DirectionalChannelInfo_set_enabled(number this_ptr, boolean val);
	// uint16_t DirectionalChannelInfo_get_cltv_expiry_delta(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	public static native number DirectionalChannelInfo_get_cltv_expiry_delta(number this_ptr);
	// void DirectionalChannelInfo_set_cltv_expiry_delta(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, uint16_t val);
	public static native void DirectionalChannelInfo_set_cltv_expiry_delta(number this_ptr, number val);
	// uint64_t DirectionalChannelInfo_get_htlc_minimum_msat(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	public static native number DirectionalChannelInfo_get_htlc_minimum_msat(number this_ptr);
	// void DirectionalChannelInfo_set_htlc_minimum_msat(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, uint64_t val);
	public static native void DirectionalChannelInfo_set_htlc_minimum_msat(number this_ptr, number val);
	// struct LDKRoutingFees DirectionalChannelInfo_get_fees(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	public static native number DirectionalChannelInfo_get_fees(number this_ptr);
	// void DirectionalChannelInfo_set_fees(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, struct LDKRoutingFees val);
	public static native void DirectionalChannelInfo_set_fees(number this_ptr, number val);
	// struct LDKChannelUpdate DirectionalChannelInfo_get_last_update_message(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	public static native number DirectionalChannelInfo_get_last_update_message(number this_ptr);
	// void DirectionalChannelInfo_set_last_update_message(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, struct LDKChannelUpdate val);
	public static native void DirectionalChannelInfo_set_last_update_message(number this_ptr, number val);
	// struct LDKCVec_u8Z DirectionalChannelInfo_write(const struct LDKDirectionalChannelInfo *NONNULL_PTR obj);
	public static native Uint8Array DirectionalChannelInfo_write(number obj);
	// struct LDKDirectionalChannelInfo DirectionalChannelInfo_read(struct LDKu8slice ser);
	public static native number DirectionalChannelInfo_read(Uint8Array ser);
	// void ChannelInfo_free(struct LDKChannelInfo this_ptr);
	public static native void ChannelInfo_free(number this_ptr);
	// struct LDKChannelFeatures ChannelInfo_get_features(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	public static native number ChannelInfo_get_features(number this_ptr);
	// void ChannelInfo_set_features(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKChannelFeatures val);
	public static native void ChannelInfo_set_features(number this_ptr, number val);
	// struct LDKPublicKey ChannelInfo_get_node_one(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelInfo_get_node_one(number this_ptr);
	// void ChannelInfo_set_node_one(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void ChannelInfo_set_node_one(number this_ptr, Uint8Array val);
	// struct LDKDirectionalChannelInfo ChannelInfo_get_one_to_two(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	public static native number ChannelInfo_get_one_to_two(number this_ptr);
	// void ChannelInfo_set_one_to_two(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKDirectionalChannelInfo val);
	public static native void ChannelInfo_set_one_to_two(number this_ptr, number val);
	// struct LDKPublicKey ChannelInfo_get_node_two(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	public static native Uint8Array ChannelInfo_get_node_two(number this_ptr);
	// void ChannelInfo_set_node_two(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	public static native void ChannelInfo_set_node_two(number this_ptr, Uint8Array val);
	// struct LDKDirectionalChannelInfo ChannelInfo_get_two_to_one(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	public static native number ChannelInfo_get_two_to_one(number this_ptr);
	// void ChannelInfo_set_two_to_one(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKDirectionalChannelInfo val);
	public static native void ChannelInfo_set_two_to_one(number this_ptr, number val);
	// struct LDKChannelAnnouncement ChannelInfo_get_announcement_message(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	public static native number ChannelInfo_get_announcement_message(number this_ptr);
	// void ChannelInfo_set_announcement_message(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKChannelAnnouncement val);
	public static native void ChannelInfo_set_announcement_message(number this_ptr, number val);
	// struct LDKCVec_u8Z ChannelInfo_write(const struct LDKChannelInfo *NONNULL_PTR obj);
	public static native Uint8Array ChannelInfo_write(number obj);
	// struct LDKChannelInfo ChannelInfo_read(struct LDKu8slice ser);
	public static native number ChannelInfo_read(Uint8Array ser);
	// void RoutingFees_free(struct LDKRoutingFees this_ptr);
	public static native void RoutingFees_free(number this_ptr);
	// struct LDKRoutingFees RoutingFees_clone(const struct LDKRoutingFees *NONNULL_PTR orig);
	public static native number RoutingFees_clone(number orig);
	// uint32_t RoutingFees_get_base_msat(const struct LDKRoutingFees *NONNULL_PTR this_ptr);
	public static native number RoutingFees_get_base_msat(number this_ptr);
	// void RoutingFees_set_base_msat(struct LDKRoutingFees *NONNULL_PTR this_ptr, uint32_t val);
	public static native void RoutingFees_set_base_msat(number this_ptr, number val);
	// uint32_t RoutingFees_get_proportional_millionths(const struct LDKRoutingFees *NONNULL_PTR this_ptr);
	public static native number RoutingFees_get_proportional_millionths(number this_ptr);
	// void RoutingFees_set_proportional_millionths(struct LDKRoutingFees *NONNULL_PTR this_ptr, uint32_t val);
	public static native void RoutingFees_set_proportional_millionths(number this_ptr, number val);
	// MUST_USE_RES struct LDKRoutingFees RoutingFees_new(uint32_t base_msat_arg, uint32_t proportional_millionths_arg);
	public static native number RoutingFees_new(number base_msat_arg, number proportional_millionths_arg);
	// struct LDKCResult_RoutingFeesDecodeErrorZ RoutingFees_read(struct LDKu8slice ser);
	public static native number RoutingFees_read(Uint8Array ser);
	// struct LDKCVec_u8Z RoutingFees_write(const struct LDKRoutingFees *NONNULL_PTR obj);
	public static native Uint8Array RoutingFees_write(number obj);
	// void NodeAnnouncementInfo_free(struct LDKNodeAnnouncementInfo this_ptr);
	public static native void NodeAnnouncementInfo_free(number this_ptr);
	// struct LDKNodeFeatures NodeAnnouncementInfo_get_features(const struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr);
	public static native number NodeAnnouncementInfo_get_features(number this_ptr);
	// void NodeAnnouncementInfo_set_features(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, struct LDKNodeFeatures val);
	public static native void NodeAnnouncementInfo_set_features(number this_ptr, number val);
	// uint32_t NodeAnnouncementInfo_get_last_update(const struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr);
	public static native number NodeAnnouncementInfo_get_last_update(number this_ptr);
	// void NodeAnnouncementInfo_set_last_update(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, uint32_t val);
	public static native void NodeAnnouncementInfo_set_last_update(number this_ptr, number val);
	// const uint8_t (*NodeAnnouncementInfo_get_rgb(const struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr))[3];
	public static native Uint8Array NodeAnnouncementInfo_get_rgb(number this_ptr);
	// void NodeAnnouncementInfo_set_rgb(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, struct LDKThreeBytes val);
	public static native void NodeAnnouncementInfo_set_rgb(number this_ptr, Uint8Array val);
	// const uint8_t (*NodeAnnouncementInfo_get_alias(const struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr))[32];
	public static native Uint8Array NodeAnnouncementInfo_get_alias(number this_ptr);
	// void NodeAnnouncementInfo_set_alias(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	public static native void NodeAnnouncementInfo_set_alias(number this_ptr, Uint8Array val);
	// void NodeAnnouncementInfo_set_addresses(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, struct LDKCVec_NetAddressZ val);
	public static native void NodeAnnouncementInfo_set_addresses(number this_ptr, number[] val);
	// struct LDKNodeAnnouncement NodeAnnouncementInfo_get_announcement_message(const struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr);
	public static native number NodeAnnouncementInfo_get_announcement_message(number this_ptr);
	// void NodeAnnouncementInfo_set_announcement_message(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, struct LDKNodeAnnouncement val);
	public static native void NodeAnnouncementInfo_set_announcement_message(number this_ptr, number val);
	// MUST_USE_RES struct LDKNodeAnnouncementInfo NodeAnnouncementInfo_new(struct LDKNodeFeatures features_arg, uint32_t last_update_arg, struct LDKThreeBytes rgb_arg, struct LDKThirtyTwoBytes alias_arg, struct LDKCVec_NetAddressZ addresses_arg, struct LDKNodeAnnouncement announcement_message_arg);
	public static native number NodeAnnouncementInfo_new(number features_arg, number last_update_arg, Uint8Array rgb_arg, Uint8Array alias_arg, number[] addresses_arg, number announcement_message_arg);
	// struct LDKCVec_u8Z NodeAnnouncementInfo_write(const struct LDKNodeAnnouncementInfo *NONNULL_PTR obj);
	public static native Uint8Array NodeAnnouncementInfo_write(number obj);
	// struct LDKCResult_NodeAnnouncementInfoDecodeErrorZ NodeAnnouncementInfo_read(struct LDKu8slice ser);
	public static native number NodeAnnouncementInfo_read(Uint8Array ser);
	// void NodeInfo_free(struct LDKNodeInfo this_ptr);
	public static native void NodeInfo_free(number this_ptr);
	// void NodeInfo_set_channels(struct LDKNodeInfo *NONNULL_PTR this_ptr, struct LDKCVec_u64Z val);
	public static native void NodeInfo_set_channels(number this_ptr, number[] val);
	// struct LDKRoutingFees NodeInfo_get_lowest_inbound_channel_fees(const struct LDKNodeInfo *NONNULL_PTR this_ptr);
	public static native number NodeInfo_get_lowest_inbound_channel_fees(number this_ptr);
	// void NodeInfo_set_lowest_inbound_channel_fees(struct LDKNodeInfo *NONNULL_PTR this_ptr, struct LDKRoutingFees val);
	public static native void NodeInfo_set_lowest_inbound_channel_fees(number this_ptr, number val);
	// struct LDKNodeAnnouncementInfo NodeInfo_get_announcement_info(const struct LDKNodeInfo *NONNULL_PTR this_ptr);
	public static native number NodeInfo_get_announcement_info(number this_ptr);
	// void NodeInfo_set_announcement_info(struct LDKNodeInfo *NONNULL_PTR this_ptr, struct LDKNodeAnnouncementInfo val);
	public static native void NodeInfo_set_announcement_info(number this_ptr, number val);
	// MUST_USE_RES struct LDKNodeInfo NodeInfo_new(struct LDKCVec_u64Z channels_arg, struct LDKRoutingFees lowest_inbound_channel_fees_arg, struct LDKNodeAnnouncementInfo announcement_info_arg);
	public static native number NodeInfo_new(number[] channels_arg, number lowest_inbound_channel_fees_arg, number announcement_info_arg);
	// struct LDKCVec_u8Z NodeInfo_write(const struct LDKNodeInfo *NONNULL_PTR obj);
	public static native Uint8Array NodeInfo_write(number obj);
	// struct LDKCResult_NodeInfoDecodeErrorZ NodeInfo_read(struct LDKu8slice ser);
	public static native number NodeInfo_read(Uint8Array ser);
	// struct LDKCVec_u8Z NetworkGraph_write(const struct LDKNetworkGraph *NONNULL_PTR obj);
	public static native Uint8Array NetworkGraph_write(number obj);
	// struct LDKCResult_NetworkGraphDecodeErrorZ NetworkGraph_read(struct LDKu8slice ser);
	public static native number NetworkGraph_read(Uint8Array ser);
	// MUST_USE_RES struct LDKNetworkGraph NetworkGraph_new(struct LDKThirtyTwoBytes genesis_hash);
	public static native number NetworkGraph_new(Uint8Array genesis_hash);
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_node_from_announcement(struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKNodeAnnouncement *NONNULL_PTR msg);
	public static native number NetworkGraph_update_node_from_announcement(number this_arg, number msg);
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_node_from_unsigned_announcement(struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR msg);
	public static native number NetworkGraph_update_node_from_unsigned_announcement(number this_arg, number msg);
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_channel_from_announcement(struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKChannelAnnouncement *NONNULL_PTR msg, struct LDKAccess *chain_access);
	public static native number NetworkGraph_update_channel_from_announcement(number this_arg, number msg, number chain_access);
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_channel_from_unsigned_announcement(struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR msg, struct LDKAccess *chain_access);
	public static native number NetworkGraph_update_channel_from_unsigned_announcement(number this_arg, number msg, number chain_access);
	// void NetworkGraph_close_channel_from_update(struct LDKNetworkGraph *NONNULL_PTR this_arg, uint64_t short_channel_id, bool is_permanent);
	public static native void NetworkGraph_close_channel_from_update(number this_arg, number short_channel_id, boolean is_permanent);
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_channel(struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKChannelUpdate *NONNULL_PTR msg);
	public static native number NetworkGraph_update_channel(number this_arg, number msg);
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_channel_unsigned(struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKUnsignedChannelUpdate *NONNULL_PTR msg);
	public static native number NetworkGraph_update_channel_unsigned(number this_arg, number msg);
}
