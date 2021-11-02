
import * as fs from 'fs';
const source = fs.readFileSync('./ldk.wasm');

const memory = new WebAssembly.Memory({initial: 256});
const wasmModule = new WebAssembly.Module(source);

const imports: any = {};
imports.env = {};

imports.env.memoryBase = 0;
imports.env.memory = memory;
imports.env.tableBase = 0;
imports.env.table = new WebAssembly.Table({initial: 4, element: 'anyfunc'});

imports.env["abort"] = function () {
    console.error("ABORT");
};

let wasm = null;
let isWasmInitialized: boolean = false;


// WASM CODEC

const nextMultipleOfFour = (value: number) => {
    return Math.ceil(value / 4) * 4;
}

const encodeUint8Array = (inputArray) => {
	const cArrayPointer = wasm.TS_malloc(inputArray.length + 4);
	const arrayLengthView = new Uint32Array(memory.buffer, cArrayPointer, 1);
    arrayLengthView[0] = inputArray.length;
	const arrayMemoryView = new Uint8Array(memory.buffer, cArrayPointer + 4, inputArray.length);
	arrayMemoryView.set(inputArray);
	return cArrayPointer;
}

const encodeUint32Array = (inputArray) => {
	const cArrayPointer = wasm.TS_malloc((inputArray.length + 1) * 4);
	const arrayMemoryView = new Uint32Array(memory.buffer, cArrayPointer, inputArray.length);
	arrayMemoryView.set(inputArray, 1);
    arrayMemoryView[0] = inputArray.length;
	return cArrayPointer;
}

const getArrayLength = (arrayPointer) => {
	const arraySizeViewer = new Uint32Array(
		memory.buffer, // value
		arrayPointer, // offset
		1 // one int
	);
	return arraySizeViewer[0];
}
const decodeUint8Array = (arrayPointer, free = true) => {
	const arraySize = getArrayLength(arrayPointer);
	const actualArrayViewer = new Uint8Array(
		memory.buffer, // value
		arrayPointer + 4, // offset (ignoring length bytes)
		arraySize // uint8 count
	);
	// Clone the contents, TODO: In the future we should wrap the Viewer in a class that
	// will free the underlying memory when it becomes unreachable instead of copying here.
	const actualArray = actualArrayViewer.slice(0, arraySize);
	if (free) {
		wasm.TS_free(arrayPointer);
	}
	return actualArray;
}
const decodeUint32Array = (arrayPointer, free = true) => {
	const arraySize = getArrayLength(arrayPointer);
	const actualArrayViewer = new Uint32Array(
		memory.buffer, // value
		arrayPointer + 4, // offset (ignoring length bytes)
		arraySize // uint32 count
	);
	// Clone the contents, TODO: In the future we should wrap the Viewer in a class that
	// will free the underlying memory when it becomes unreachable instead of copying here.
	const actualArray = actualArrayViewer.slice(0, arraySize);
	if (free) {
		wasm.TS_free(arrayPointer);
	}
	return actualArray;
}

const encodeString = (string) => {
    // make malloc count divisible by 4
    const memoryNeed = nextMultipleOfFour(string.length + 1);
    const stringPointer = wasm.TS_malloc(memoryNeed);
    const stringMemoryView = new Uint8Array(
        memory.buffer, // value
        stringPointer, // offset
        string.length + 1 // length
    );
    for (let i = 0; i < string.length; i++) {
        stringMemoryView[i] = string.charCodeAt(i);
    }
    stringMemoryView[string.length] = 0;
    return stringPointer;
}

const decodeString = (stringPointer, free = true) => {
    const memoryView = new Uint8Array(memory.buffer, stringPointer);
    let cursor = 0;
    let result = '';

    while (memoryView[cursor] !== 0) {
        result += String.fromCharCode(memoryView[cursor]);
        cursor++;
    }

    if (free) {
        wasm.wasm_free(stringPointer);
    }

    return result;
};

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
	// struct LDKCVec_u8Z TxOut_get_script_pubkey (struct LDKTxOut* thing)
	export function TxOut_get_script_pubkey(thing: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxOut_get_script_pubkey(thing);
		return decodeArray(nativeResponseValue);
	}
	// uint64_t TxOut_get_value (struct LDKTxOut* thing)
	export function TxOut_get_value(thing: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxOut_get_value(thing);
		return nativeResponseValue;
	}
	public static native boolean LDKCResult_SecretKeyErrorZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_SecretKeyErrorZ_get_ok(long arg);
	public static native Secp256k1Error LDKCResult_SecretKeyErrorZ_get_err(long arg);
	public static native boolean LDKCResult_PublicKeyErrorZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_PublicKeyErrorZ_get_ok(long arg);
	public static native Secp256k1Error LDKCResult_PublicKeyErrorZ_get_err(long arg);
	public static native boolean LDKCResult_TxCreationKeysDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_TxCreationKeysDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_TxCreationKeysDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChannelPublicKeysDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelPublicKeysDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelPublicKeysDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_TxCreationKeysErrorZ_result_ok(long arg);
	public static native number LDKCResult_TxCreationKeysErrorZ_get_ok(long arg);
	public static native Secp256k1Error LDKCResult_TxCreationKeysErrorZ_get_err(long arg);
	public static class LDKCOption_u32Z {
		private LDKCOption_u32Z() {}
		export class Some extends LDKCOption_u32Z {
			public number some;
			Some(number some) { this.some = some; }
		}
		export class None extends LDKCOption_u32Z {
			None() { }
		}
		static native void init();
	}
	static { LDKCOption_u32Z.init(); }
	public static native LDKCOption_u32Z LDKCOption_u32Z_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_HTLCOutputInCommitmentDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_HTLCOutputInCommitmentDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_HTLCOutputInCommitmentDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChannelTransactionParametersDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelTransactionParametersDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelTransactionParametersDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_HolderCommitmentTransactionDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_HolderCommitmentTransactionDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_HolderCommitmentTransactionDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_BuiltCommitmentTransactionDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_BuiltCommitmentTransactionDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_BuiltCommitmentTransactionDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_TrustedClosingTransactionNoneZ_result_ok(long arg);
	public static native number LDKCResult_TrustedClosingTransactionNoneZ_get_ok(long arg);
	public static native void LDKCResult_TrustedClosingTransactionNoneZ_get_err(long arg);
	public static native boolean LDKCResult_CommitmentTransactionDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_CommitmentTransactionDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_CommitmentTransactionDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_TrustedCommitmentTransactionNoneZ_result_ok(long arg);
	public static native number LDKCResult_TrustedCommitmentTransactionNoneZ_get_ok(long arg);
	public static native void LDKCResult_TrustedCommitmentTransactionNoneZ_get_err(long arg);
	public static native boolean LDKCResult_CVec_SignatureZNoneZ_result_ok(long arg);
	public static native Uint8Array[] LDKCResult_CVec_SignatureZNoneZ_get_ok(long arg);
	public static native void LDKCResult_CVec_SignatureZNoneZ_get_err(long arg);
	public static native boolean LDKCResult_ShutdownScriptDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ShutdownScriptDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ShutdownScriptDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ShutdownScriptInvalidShutdownScriptZ_result_ok(long arg);
	public static native number LDKCResult_ShutdownScriptInvalidShutdownScriptZ_get_ok(long arg);
	public static native number LDKCResult_ShutdownScriptInvalidShutdownScriptZ_get_err(long arg);
	public static native boolean LDKCResult_NoneErrorZ_result_ok(long arg);
	public static native void LDKCResult_NoneErrorZ_get_ok(long arg);
	public static native IOError LDKCResult_NoneErrorZ_get_err(long arg);
	public static native boolean LDKCResult_RouteHopDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_RouteHopDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_RouteHopDecodeErrorZ_get_err(long arg);
	public static native long LDKCVec_RouteHopZ_new(number[] elems);
	public static native boolean LDKCResult_RouteDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_RouteDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_RouteDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_RouteParametersDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_RouteParametersDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_RouteParametersDecodeErrorZ_get_err(long arg);
	public static native long LDKCVec_RouteHintZ_new(number[] elems);
	public static class LDKCOption_u64Z {
		private LDKCOption_u64Z() {}
		export class Some extends LDKCOption_u64Z {
			public number some;
			Some(number some) { this.some = some; }
		}
		export class None extends LDKCOption_u64Z {
			None() { }
		}
		static native void init();
	}
	static { LDKCOption_u64Z.init(); }
	public static native LDKCOption_u64Z LDKCOption_u64Z_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_PayeeDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_PayeeDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_PayeeDecodeErrorZ_get_err(long arg);
	public static native long LDKCVec_RouteHintHopZ_new(number[] elems);
	public static native boolean LDKCResult_RouteHintDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_RouteHintDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_RouteHintDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_RouteHintHopDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_RouteHintHopDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_RouteHintHopDecodeErrorZ_get_err(long arg);
	public static native long LDKCVec_ChannelDetailsZ_new(number[] elems);
	public static native boolean LDKCResult_RouteLightningErrorZ_result_ok(long arg);
	public static native number LDKCResult_RouteLightningErrorZ_get_ok(long arg);
	public static native number LDKCResult_RouteLightningErrorZ_get_err(long arg);
	public static native boolean LDKCResult_TxOutAccessErrorZ_result_ok(long arg);
	public static native number LDKCResult_TxOutAccessErrorZ_get_ok(long arg);
	public static native AccessError LDKCResult_TxOutAccessErrorZ_get_err(long arg);
	// uintptr_t C2Tuple_usizeTransactionZ_get_a(LDKC2Tuple_usizeTransactionZ *NONNULL_PTR tuple);
	export function C2Tuple_usizeTransactionZ_get_a(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_usizeTransactionZ_get_a(tuple);
		return nativeResponseValue;
	}
	// struct LDKTransaction C2Tuple_usizeTransactionZ_get_b(LDKC2Tuple_usizeTransactionZ *NONNULL_PTR tuple);
	export function C2Tuple_usizeTransactionZ_get_b(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_usizeTransactionZ_get_b(tuple);
		return decodeArray(nativeResponseValue);
	}
	public static native long LDKCVec_C2Tuple_usizeTransactionZZ_new(number[] elems);
	public static native boolean LDKCResult_NoneChannelMonitorUpdateErrZ_result_ok(long arg);
	public static native void LDKCResult_NoneChannelMonitorUpdateErrZ_get_ok(long arg);
	public static native ChannelMonitorUpdateErr LDKCResult_NoneChannelMonitorUpdateErrZ_get_err(long arg);
	public static class LDKMonitorEvent {
		private LDKMonitorEvent() {}
		export class HTLCEvent extends LDKMonitorEvent {
			public number htlc_event;
			HTLCEvent(number htlc_event) { this.htlc_event = htlc_event; }
		}
		export class CommitmentTxConfirmed extends LDKMonitorEvent {
			public number commitment_tx_confirmed;
			CommitmentTxConfirmed(number commitment_tx_confirmed) { this.commitment_tx_confirmed = commitment_tx_confirmed; }
		}
		export class UpdateCompleted extends LDKMonitorEvent {
			public number funding_txo;
			public number monitor_update_id;
			UpdateCompleted(number funding_txo, number monitor_update_id) { this.funding_txo = funding_txo; this.monitor_update_id = monitor_update_id; }
		}
		export class UpdateFailed extends LDKMonitorEvent {
			public number update_failed;
			UpdateFailed(number update_failed) { this.update_failed = update_failed; }
		}
		static native void init();
	}
	static { LDKMonitorEvent.init(); }
	public static native LDKMonitorEvent LDKMonitorEvent_ref_from_ptr(long ptr);
	public static native long LDKCVec_MonitorEventZ_new(number[] elems);
	public static class LDKCOption_C2Tuple_usizeTransactionZZ {
		private LDKCOption_C2Tuple_usizeTransactionZZ() {}
		export class Some extends LDKCOption_C2Tuple_usizeTransactionZZ {
			public number some;
			Some(number some) { this.some = some; }
		}
		export class None extends LDKCOption_C2Tuple_usizeTransactionZZ {
			None() { }
		}
		static native void init();
	}
	static { LDKCOption_C2Tuple_usizeTransactionZZ.init(); }
	public static native LDKCOption_C2Tuple_usizeTransactionZZ LDKCOption_C2Tuple_usizeTransactionZZ_ref_from_ptr(long ptr);
	public static class LDKNetworkUpdate {
		private LDKNetworkUpdate() {}
		export class ChannelUpdateMessage extends LDKNetworkUpdate {
			public number msg;
			ChannelUpdateMessage(number msg) { this.msg = msg; }
		}
		export class ChannelClosed extends LDKNetworkUpdate {
			public number short_channel_id;
			public boolean is_permanent;
			ChannelClosed(number short_channel_id, boolean is_permanent) { this.short_channel_id = short_channel_id; this.is_permanent = is_permanent; }
		}
		export class NodeFailure extends LDKNetworkUpdate {
			public Uint8Array node_id;
			public boolean is_permanent;
			NodeFailure(Uint8Array node_id, boolean is_permanent) { this.node_id = node_id; this.is_permanent = is_permanent; }
		}
		static native void init();
	}
	static { LDKNetworkUpdate.init(); }
	public static native LDKNetworkUpdate LDKNetworkUpdate_ref_from_ptr(long ptr);
	public static class LDKCOption_NetworkUpdateZ {
		private LDKCOption_NetworkUpdateZ() {}
		export class Some extends LDKCOption_NetworkUpdateZ {
			public number some;
			Some(number some) { this.some = some; }
		}
		export class None extends LDKCOption_NetworkUpdateZ {
			None() { }
		}
		static native void init();
	}
	static { LDKCOption_NetworkUpdateZ.init(); }
	public static native LDKCOption_NetworkUpdateZ LDKCOption_NetworkUpdateZ_ref_from_ptr(long ptr);
	public static class LDKSpendableOutputDescriptor {
		private LDKSpendableOutputDescriptor() {}
		export class StaticOutput extends LDKSpendableOutputDescriptor {
			public number outpoint;
			public number output;
			StaticOutput(number outpoint, number output) { this.outpoint = outpoint; this.output = output; }
		}
		export class DelayedPaymentOutput extends LDKSpendableOutputDescriptor {
			public number delayed_payment_output;
			DelayedPaymentOutput(number delayed_payment_output) { this.delayed_payment_output = delayed_payment_output; }
		}
		export class StaticPaymentOutput extends LDKSpendableOutputDescriptor {
			public number static_payment_output;
			StaticPaymentOutput(number static_payment_output) { this.static_payment_output = static_payment_output; }
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
		export class IgnoreAndLog extends LDKErrorAction {
			public Level ignore_and_log;
			IgnoreAndLog(Level ignore_and_log) { this.ignore_and_log = ignore_and_log; }
		}
		export class SendErrorMessage extends LDKErrorAction {
			public number msg;
			SendErrorMessage(number msg) { this.msg = msg; }
		}
		static native void init();
	}
	static { LDKErrorAction.init(); }
	public static native LDKErrorAction LDKErrorAction_ref_from_ptr(long ptr);
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
		export class SendChannelUpdate extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendChannelUpdate(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		export class HandleError extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number action;
			HandleError(Uint8Array node_id, number action) { this.node_id = node_id; this.action = action; }
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
		export class SendReplyChannelRange extends LDKMessageSendEvent {
			public Uint8Array node_id;
			public number msg;
			SendReplyChannelRange(Uint8Array node_id, number msg) { this.node_id = node_id; this.msg = msg; }
		}
		static native void init();
	}
	static { LDKMessageSendEvent.init(); }
	public static native LDKMessageSendEvent LDKMessageSendEvent_ref_from_ptr(long ptr);
	public static native long LDKCVec_MessageSendEventZ_new(number[] elems);
	public static native boolean LDKCResult_InitFeaturesDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_InitFeaturesDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_InitFeaturesDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NodeFeaturesDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_NodeFeaturesDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_NodeFeaturesDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChannelFeaturesDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelFeaturesDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelFeaturesDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_InvoiceFeaturesDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_InvoiceFeaturesDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_InvoiceFeaturesDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ScoringParametersDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ScoringParametersDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ScoringParametersDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ScorerDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ScorerDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ScorerDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_SpendableOutputDescriptorDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_SpendableOutputDescriptorDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_SpendableOutputDescriptorDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NoneNoneZ_result_ok(long arg);
	public static native void LDKCResult_NoneNoneZ_get_ok(long arg);
	public static native void LDKCResult_NoneNoneZ_get_err(long arg);
	// struct LDKSignature C2Tuple_SignatureCVec_SignatureZZ_get_a(LDKC2Tuple_SignatureCVec_SignatureZZ *NONNULL_PTR tuple);
	export function C2Tuple_SignatureCVec_SignatureZZ_get_a(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_SignatureCVec_SignatureZZ_get_a(tuple);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCVec_SignatureZ C2Tuple_SignatureCVec_SignatureZZ_get_b(LDKC2Tuple_SignatureCVec_SignatureZZ *NONNULL_PTR tuple);
	export function C2Tuple_SignatureCVec_SignatureZZ_get_b(tuple: number): Uint8Array[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_SignatureCVec_SignatureZZ_get_b(tuple);
		return nativeResponseValue;
	}
	public static native boolean LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_result_ok(long arg);
	public static native number LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_ok(long arg);
	public static native void LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_err(long arg);
	public static native boolean LDKCResult_SignatureNoneZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_SignatureNoneZ_get_ok(long arg);
	public static native void LDKCResult_SignatureNoneZ_get_err(long arg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKBaseSign {
			get_per_commitment_point (idx: number): Uint8Array;
			release_commitment_secret (idx: number): Uint8Array;
			validate_holder_commitment (holder_tx: number): number;
			channel_keys_id (): Uint8Array;
			sign_counterparty_commitment (commitment_tx: number): number;
			validate_counterparty_revocation (idx: number, secret: Uint8Array): number;
			sign_holder_commitment_and_htlcs (commitment_tx: number): number;
			sign_justice_revoked_output (justice_tx: Uint8Array, input: number, amount: number, per_commitment_key: Uint8Array): number;
			sign_justice_revoked_htlc (justice_tx: Uint8Array, input: number, amount: number, per_commitment_key: Uint8Array, htlc: number): number;
			sign_counterparty_htlc_transaction (htlc_tx: Uint8Array, input: number, amount: number, per_commitment_point: Uint8Array, htlc: number): number;
			sign_closing_transaction (closing_tx: number): number;
			sign_channel_announcement (msg: number): number;
			ready_channel (channel_parameters: number): void;
		}

		export function LDKBaseSign_new(impl: LDKBaseSign, pubkeys: number): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKPublicKey BaseSign_get_per_commitment_point LDKBaseSign *NONNULL_PTR this_arg, uint64_t idx
	export function BaseSign_get_per_commitment_point(this_arg: number, idx: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_get_per_commitment_point(this_arg, idx);
		return decodeArray(nativeResponseValue);
	}
	// LDKThirtyTwoBytes BaseSign_release_commitment_secret LDKBaseSign *NONNULL_PTR this_arg, uint64_t idx
	export function BaseSign_release_commitment_secret(this_arg: number, idx: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_release_commitment_secret(this_arg, idx);
		return decodeArray(nativeResponseValue);
	}
	// LDKCResult_NoneNoneZ BaseSign_validate_holder_commitment LDKBaseSign *NONNULL_PTR this_arg, const struct LDKHolderCommitmentTransaction *NONNULL_PTR holder_tx
	export function BaseSign_validate_holder_commitment(this_arg: number, holder_tx: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_validate_holder_commitment(this_arg, holder_tx);
		return nativeResponseValue;
	}
	// LDKThirtyTwoBytes BaseSign_channel_keys_id LDKBaseSign *NONNULL_PTR this_arg
	export function BaseSign_channel_keys_id(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_channel_keys_id(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ BaseSign_sign_counterparty_commitment LDKBaseSign *NONNULL_PTR this_arg, const struct LDKCommitmentTransaction *NONNULL_PTR commitment_tx
	export function BaseSign_sign_counterparty_commitment(this_arg: number, commitment_tx: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_sign_counterparty_commitment(this_arg, commitment_tx);
		return nativeResponseValue;
	}
	// LDKCResult_NoneNoneZ BaseSign_validate_counterparty_revocation LDKBaseSign *NONNULL_PTR this_arg, uint64_t idx, const uint8_t (*secret)[32]
	export function BaseSign_validate_counterparty_revocation(this_arg: number, idx: number, secret: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_validate_counterparty_revocation(this_arg, idx, encodeArray(secret));
		return nativeResponseValue;
	}
	// LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ BaseSign_sign_holder_commitment_and_htlcs LDKBaseSign *NONNULL_PTR this_arg, const struct LDKHolderCommitmentTransaction *NONNULL_PTR commitment_tx
	export function BaseSign_sign_holder_commitment_and_htlcs(this_arg: number, commitment_tx: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_sign_holder_commitment_and_htlcs(this_arg, commitment_tx);
		return nativeResponseValue;
	}
	// LDKCResult_SignatureNoneZ BaseSign_sign_justice_revoked_output LDKBaseSign *NONNULL_PTR this_arg, struct LDKTransaction justice_tx, uintptr_t input, uint64_t amount, const uint8_t (*per_commitment_key)[32]
	export function BaseSign_sign_justice_revoked_output(this_arg: number, justice_tx: Uint8Array, input: number, amount: number, per_commitment_key: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_sign_justice_revoked_output(this_arg, encodeArray(justice_tx), input, amount, encodeArray(per_commitment_key));
		return nativeResponseValue;
	}
	// LDKCResult_SignatureNoneZ BaseSign_sign_justice_revoked_htlc LDKBaseSign *NONNULL_PTR this_arg, struct LDKTransaction justice_tx, uintptr_t input, uint64_t amount, const uint8_t (*per_commitment_key)[32], const struct LDKHTLCOutputInCommitment *NONNULL_PTR htlc
	export function BaseSign_sign_justice_revoked_htlc(this_arg: number, justice_tx: Uint8Array, input: number, amount: number, per_commitment_key: Uint8Array, htlc: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_sign_justice_revoked_htlc(this_arg, encodeArray(justice_tx), input, amount, encodeArray(per_commitment_key), htlc);
		return nativeResponseValue;
	}
	// LDKCResult_SignatureNoneZ BaseSign_sign_counterparty_htlc_transaction LDKBaseSign *NONNULL_PTR this_arg, struct LDKTransaction htlc_tx, uintptr_t input, uint64_t amount, struct LDKPublicKey per_commitment_point, const struct LDKHTLCOutputInCommitment *NONNULL_PTR htlc
	export function BaseSign_sign_counterparty_htlc_transaction(this_arg: number, htlc_tx: Uint8Array, input: number, amount: number, per_commitment_point: Uint8Array, htlc: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_sign_counterparty_htlc_transaction(this_arg, encodeArray(htlc_tx), input, amount, encodeArray(per_commitment_point), htlc);
		return nativeResponseValue;
	}
	// LDKCResult_SignatureNoneZ BaseSign_sign_closing_transaction LDKBaseSign *NONNULL_PTR this_arg, const struct LDKClosingTransaction *NONNULL_PTR closing_tx
	export function BaseSign_sign_closing_transaction(this_arg: number, closing_tx: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_sign_closing_transaction(this_arg, closing_tx);
		return nativeResponseValue;
	}
	// LDKCResult_SignatureNoneZ BaseSign_sign_channel_announcement LDKBaseSign *NONNULL_PTR this_arg, const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR msg
	export function BaseSign_sign_channel_announcement(this_arg: number, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_sign_channel_announcement(this_arg, msg);
		return nativeResponseValue;
	}
	// void BaseSign_ready_channel LDKBaseSign *NONNULL_PTR this_arg, const struct LDKChannelTransactionParameters *NONNULL_PTR channel_parameters
	export function BaseSign_ready_channel(this_arg: number, channel_parameters: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_ready_channel(this_arg, channel_parameters);
		// debug statements here
	}
	// LDKChannelPublicKeys BaseSign_get_pubkeys LDKBaseSign *NONNULL_PTR this_arg
	export function BaseSign_get_pubkeys(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_get_pubkeys(this_arg);
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKSign {
			write (): Uint8Array;
		}

		export function LDKSign_new(impl: LDKSign, BaseSign: LDKBaseSign, pubkeys: number): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCVec_u8Z Sign_write LDKSign *NONNULL_PTR this_arg
	export function Sign_write(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Sign_write(this_arg);
		return decodeArray(nativeResponseValue);
	}
	public static native boolean LDKCResult_SignDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_SignDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_SignDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_RecoverableSignatureNoneZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_RecoverableSignatureNoneZ_get_ok(long arg);
	public static native void LDKCResult_RecoverableSignatureNoneZ_get_err(long arg);
	public static native boolean LDKCResult_CVec_CVec_u8ZZNoneZ_result_ok(long arg);
	public static native Uint8Array[] LDKCResult_CVec_CVec_u8ZZNoneZ_get_ok(long arg);
	public static native void LDKCResult_CVec_CVec_u8ZZNoneZ_get_err(long arg);
	public static native boolean LDKCResult_InMemorySignerDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_InMemorySignerDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_InMemorySignerDecodeErrorZ_get_err(long arg);
	public static native long LDKCVec_TxOutZ_new(number[] elems);
	public static native boolean LDKCResult_TransactionNoneZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_TransactionNoneZ_get_ok(long arg);
	public static native void LDKCResult_TransactionNoneZ_get_err(long arg);
	// struct LDKThirtyTwoBytes C2Tuple_BlockHashChannelMonitorZ_get_a(LDKC2Tuple_BlockHashChannelMonitorZ *NONNULL_PTR tuple);
	export function C2Tuple_BlockHashChannelMonitorZ_get_a(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelMonitorZ_get_a(tuple);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKChannelMonitor C2Tuple_BlockHashChannelMonitorZ_get_b(LDKC2Tuple_BlockHashChannelMonitorZ *NONNULL_PTR tuple);
	export function C2Tuple_BlockHashChannelMonitorZ_get_b(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelMonitorZ_get_b(tuple);
		return nativeResponseValue;
	}
	public static native long LDKCVec_C2Tuple_BlockHashChannelMonitorZZ_new(number[] elems);
	public static native boolean LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_result_ok(long arg);
	public static native number[] LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_get_ok(long arg);
	public static native IOError LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_get_err(long arg);
	public static class LDKCOption_u16Z {
		private LDKCOption_u16Z() {}
		export class Some extends LDKCOption_u16Z {
			public number some;
			Some(number some) { this.some = some; }
		}
		export class None extends LDKCOption_u16Z {
			None() { }
		}
		static native void init();
	}
	static { LDKCOption_u16Z.init(); }
	public static native LDKCOption_u16Z LDKCOption_u16Z_ref_from_ptr(long ptr);
	public static class LDKAPIError {
		private LDKAPIError() {}
		export class APIMisuseError extends LDKAPIError {
			public String err;
			APIMisuseError(String err) { this.err = err; }
		}
		export class FeeRateTooHigh extends LDKAPIError {
			public String err;
			public number feerate;
			FeeRateTooHigh(String err, number feerate) { this.err = err; this.feerate = feerate; }
		}
		export class RouteError extends LDKAPIError {
			public String err;
			RouteError(String err) { this.err = err; }
		}
		export class ChannelUnavailable extends LDKAPIError {
			public String err;
			ChannelUnavailable(String err) { this.err = err; }
		}
		export class MonitorUpdateFailed extends LDKAPIError {
			MonitorUpdateFailed() { }
		}
		export class IncompatibleShutdownScript extends LDKAPIError {
			public number script;
			IncompatibleShutdownScript(number script) { this.script = script; }
		}
		static native void init();
	}
	static { LDKAPIError.init(); }
	public static native LDKAPIError LDKAPIError_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_NoneAPIErrorZ_result_ok(long arg);
	public static native void LDKCResult_NoneAPIErrorZ_get_ok(long arg);
	public static native number LDKCResult_NoneAPIErrorZ_get_err(long arg);
	public static native long LDKCVec_CResult_NoneAPIErrorZZ_new(number[] elems);
	public static native long LDKCVec_APIErrorZ_new(number[] elems);
	public static native boolean LDKCResult__u832APIErrorZ_result_ok(long arg);
	public static native Uint8Array LDKCResult__u832APIErrorZ_get_ok(long arg);
	public static native number LDKCResult__u832APIErrorZ_get_err(long arg);
	public static class LDKPaymentSendFailure {
		private LDKPaymentSendFailure() {}
		export class ParameterError extends LDKPaymentSendFailure {
			public number parameter_error;
			ParameterError(number parameter_error) { this.parameter_error = parameter_error; }
		}
		export class PathParameterError extends LDKPaymentSendFailure {
			public number[] path_parameter_error;
			PathParameterError(number[] path_parameter_error) { this.path_parameter_error = path_parameter_error; }
		}
		export class AllFailedRetrySafe extends LDKPaymentSendFailure {
			public number[] all_failed_retry_safe;
			AllFailedRetrySafe(number[] all_failed_retry_safe) { this.all_failed_retry_safe = all_failed_retry_safe; }
		}
		export class PartialFailure extends LDKPaymentSendFailure {
			public number[] results;
			public number failed_paths_retry;
			public Uint8Array payment_id;
			PartialFailure(number[] results, number failed_paths_retry, Uint8Array payment_id) { this.results = results; this.failed_paths_retry = failed_paths_retry; this.payment_id = payment_id; }
		}
		static native void init();
	}
	static { LDKPaymentSendFailure.init(); }
	public static native LDKPaymentSendFailure LDKPaymentSendFailure_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_PaymentIdPaymentSendFailureZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_PaymentIdPaymentSendFailureZ_get_ok(long arg);
	public static native number LDKCResult_PaymentIdPaymentSendFailureZ_get_err(long arg);
	public static native boolean LDKCResult_NonePaymentSendFailureZ_result_ok(long arg);
	public static native void LDKCResult_NonePaymentSendFailureZ_get_ok(long arg);
	public static native number LDKCResult_NonePaymentSendFailureZ_get_err(long arg);
	// struct LDKThirtyTwoBytes C2Tuple_PaymentHashPaymentIdZ_get_a(LDKC2Tuple_PaymentHashPaymentIdZ *NONNULL_PTR tuple);
	export function C2Tuple_PaymentHashPaymentIdZ_get_a(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PaymentHashPaymentIdZ_get_a(tuple);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKThirtyTwoBytes C2Tuple_PaymentHashPaymentIdZ_get_b(LDKC2Tuple_PaymentHashPaymentIdZ *NONNULL_PTR tuple);
	export function C2Tuple_PaymentHashPaymentIdZ_get_b(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PaymentHashPaymentIdZ_get_b(tuple);
		return decodeArray(nativeResponseValue);
	}
	public static native boolean LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_result_ok(long arg);
	public static native number LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_get_ok(long arg);
	public static native number LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_get_err(long arg);
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
	// struct LDKThirtyTwoBytes C2Tuple_PaymentHashPaymentSecretZ_get_a(LDKC2Tuple_PaymentHashPaymentSecretZ *NONNULL_PTR tuple);
	export function C2Tuple_PaymentHashPaymentSecretZ_get_a(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PaymentHashPaymentSecretZ_get_a(tuple);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKThirtyTwoBytes C2Tuple_PaymentHashPaymentSecretZ_get_b(LDKC2Tuple_PaymentHashPaymentSecretZ *NONNULL_PTR tuple);
	export function C2Tuple_PaymentHashPaymentSecretZ_get_b(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PaymentHashPaymentSecretZ_get_b(tuple);
		return decodeArray(nativeResponseValue);
	}
	public static native boolean LDKCResult_PaymentSecretAPIErrorZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_PaymentSecretAPIErrorZ_get_ok(long arg);
	public static native number LDKCResult_PaymentSecretAPIErrorZ_get_err(long arg);
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


	// LDKCResult_NoneChannelMonitorUpdateErrZ Watch_watch_channel LDKWatch *NONNULL_PTR this_arg, struct LDKOutPoint funding_txo, struct LDKChannelMonitor monitor
	export function Watch_watch_channel(this_arg: number, funding_txo: number, monitor: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Watch_watch_channel(this_arg, funding_txo, monitor);
		return nativeResponseValue;
	}
	// LDKCResult_NoneChannelMonitorUpdateErrZ Watch_update_channel LDKWatch *NONNULL_PTR this_arg, struct LDKOutPoint funding_txo, struct LDKChannelMonitorUpdate update
	export function Watch_update_channel(this_arg: number, funding_txo: number, update: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Watch_update_channel(this_arg, funding_txo, update);
		return nativeResponseValue;
	}
	// LDKCVec_MonitorEventZ Watch_release_pending_monitor_events LDKWatch *NONNULL_PTR this_arg
	export function Watch_release_pending_monitor_events(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Watch_release_pending_monitor_events(this_arg);
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKBroadcasterInterface {
			broadcast_transaction (tx: Uint8Array): void;
		}

		export function LDKBroadcasterInterface_new(impl: LDKBroadcasterInterface): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// void BroadcasterInterface_broadcast_transaction LDKBroadcasterInterface *NONNULL_PTR this_arg, struct LDKTransaction tx
	export function BroadcasterInterface_broadcast_transaction(this_arg: number, tx: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BroadcasterInterface_broadcast_transaction(this_arg, encodeArray(tx));
		// debug statements here
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKKeysInterface {
			get_node_secret (): Uint8Array;
			get_destination_script (): Uint8Array;
			get_shutdown_scriptpubkey (): number;
			get_channel_signer (inbound: boolean, channel_value_satoshis: number): number;
			get_secure_random_bytes (): Uint8Array;
			read_chan_signer (reader: Uint8Array): number;
			sign_invoice (invoice_preimage: Uint8Array): number;
		}

		export function LDKKeysInterface_new(impl: LDKKeysInterface): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKSecretKey KeysInterface_get_node_secret LDKKeysInterface *NONNULL_PTR this_arg
	export function KeysInterface_get_node_secret(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysInterface_get_node_secret(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// LDKCVec_u8Z KeysInterface_get_destination_script LDKKeysInterface *NONNULL_PTR this_arg
	export function KeysInterface_get_destination_script(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysInterface_get_destination_script(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// LDKShutdownScript KeysInterface_get_shutdown_scriptpubkey LDKKeysInterface *NONNULL_PTR this_arg
	export function KeysInterface_get_shutdown_scriptpubkey(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysInterface_get_shutdown_scriptpubkey(this_arg);
		return nativeResponseValue;
	}
	// LDKSign KeysInterface_get_channel_signer LDKKeysInterface *NONNULL_PTR this_arg, bool inbound, uint64_t channel_value_satoshis
	export function KeysInterface_get_channel_signer(this_arg: number, inbound: boolean, channel_value_satoshis: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysInterface_get_channel_signer(this_arg, inbound, channel_value_satoshis);
		return nativeResponseValue;
	}
	// LDKThirtyTwoBytes KeysInterface_get_secure_random_bytes LDKKeysInterface *NONNULL_PTR this_arg
	export function KeysInterface_get_secure_random_bytes(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysInterface_get_secure_random_bytes(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// LDKCResult_SignDecodeErrorZ KeysInterface_read_chan_signer LDKKeysInterface *NONNULL_PTR this_arg, struct LDKu8slice reader
	export function KeysInterface_read_chan_signer(this_arg: number, reader: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysInterface_read_chan_signer(this_arg, encodeArray(reader));
		return nativeResponseValue;
	}
	// LDKCResult_RecoverableSignatureNoneZ KeysInterface_sign_invoice LDKKeysInterface *NONNULL_PTR this_arg, struct LDKCVec_u8Z invoice_preimage
	export function KeysInterface_sign_invoice(this_arg: number, invoice_preimage: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysInterface_sign_invoice(this_arg, encodeArray(invoice_preimage));
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKFeeEstimator {
			get_est_sat_per_1000_weight (confirmation_target: ConfirmationTarget): number;
		}

		export function LDKFeeEstimator_new(impl: LDKFeeEstimator): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// uint32_t FeeEstimator_get_est_sat_per_1000_weight LDKFeeEstimator *NONNULL_PTR this_arg, enum LDKConfirmationTarget confirmation_target
	export function FeeEstimator_get_est_sat_per_1000_weight(this_arg: number, confirmation_target: ConfirmationTarget): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FeeEstimator_get_est_sat_per_1000_weight(this_arg, confirmation_target);
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKLogger {
			log (record: String): void;
		}

		export function LDKLogger_new(impl: LDKLogger): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// struct LDKThirtyTwoBytes C2Tuple_BlockHashChannelManagerZ_get_a(LDKC2Tuple_BlockHashChannelManagerZ *NONNULL_PTR tuple);
	export function C2Tuple_BlockHashChannelManagerZ_get_a(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelManagerZ_get_a(tuple);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKChannelManager *C2Tuple_BlockHashChannelManagerZ_get_b(LDKC2Tuple_BlockHashChannelManagerZ *NONNULL_PTR tuple);
	export function C2Tuple_BlockHashChannelManagerZ_get_b(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelManagerZ_get_b(tuple);
		return nativeResponseValue;
	}
	public static native boolean LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChannelConfigDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelConfigDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelConfigDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_OutPointDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_OutPointDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_OutPointDecodeErrorZ_get_err(long arg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKType {
			type_id (): number;
			debug_str (): String;
			write (): Uint8Array;
		}

		export function LDKType_new(impl: LDKType): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// uint16_t Type_type_id LDKType *NONNULL_PTR this_arg
	export function Type_type_id(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Type_type_id(this_arg);
		return nativeResponseValue;
	}
	// LDKStr Type_debug_str LDKType *NONNULL_PTR this_arg
	export function Type_debug_str(this_arg: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Type_debug_str(this_arg);
		return nativeResponseValue;
	}
	// LDKCVec_u8Z Type_write LDKType *NONNULL_PTR this_arg
	export function Type_write(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Type_write(this_arg);
		return decodeArray(nativeResponseValue);
	}
	public static class LDKCOption_TypeZ {
		private LDKCOption_TypeZ() {}
		export class Some extends LDKCOption_TypeZ {
			public number some;
			Some(number some) { this.some = some; }
		}
		export class None extends LDKCOption_TypeZ {
			None() { }
		}
		static native void init();
	}
	static { LDKCOption_TypeZ.init(); }
	public static native LDKCOption_TypeZ LDKCOption_TypeZ_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_COption_TypeZDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_COption_TypeZDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_COption_TypeZDecodeErrorZ_get_err(long arg);
	public static class LDKPaymentError {
		private LDKPaymentError() {}
		export class Invoice extends LDKPaymentError {
			public String invoice;
			Invoice(String invoice) { this.invoice = invoice; }
		}
		export class Routing extends LDKPaymentError {
			public number routing;
			Routing(number routing) { this.routing = routing; }
		}
		export class Sending extends LDKPaymentError {
			public number sending;
			Sending(number sending) { this.sending = sending; }
		}
		static native void init();
	}
	static { LDKPaymentError.init(); }
	public static native LDKPaymentError LDKPaymentError_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_PaymentIdPaymentErrorZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_PaymentIdPaymentErrorZ_get_ok(long arg);
	public static native number LDKCResult_PaymentIdPaymentErrorZ_get_err(long arg);
	public static native boolean LDKCResult_SiPrefixNoneZ_result_ok(long arg);
	public static native SiPrefix LDKCResult_SiPrefixNoneZ_get_ok(long arg);
	public static native void LDKCResult_SiPrefixNoneZ_get_err(long arg);
	public static native boolean LDKCResult_InvoiceNoneZ_result_ok(long arg);
	public static native number LDKCResult_InvoiceNoneZ_get_ok(long arg);
	public static native void LDKCResult_InvoiceNoneZ_get_err(long arg);
	public static native boolean LDKCResult_SignedRawInvoiceNoneZ_result_ok(long arg);
	public static native number LDKCResult_SignedRawInvoiceNoneZ_get_ok(long arg);
	public static native void LDKCResult_SignedRawInvoiceNoneZ_get_err(long arg);
	// struct LDKRawInvoice C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_a(LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ *NONNULL_PTR tuple);
	export function C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_a(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_a(tuple);
		return nativeResponseValue;
	}
	// struct LDKThirtyTwoBytes C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_b(LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ *NONNULL_PTR tuple);
	export function C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_b(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_b(tuple);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKInvoiceSignature C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_c(LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ *NONNULL_PTR tuple);
	export function C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_c(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_c(tuple);
		return nativeResponseValue;
	}
	public static native boolean LDKCResult_PayeePubKeyErrorZ_result_ok(long arg);
	public static native number LDKCResult_PayeePubKeyErrorZ_get_ok(long arg);
	public static native Secp256k1Error LDKCResult_PayeePubKeyErrorZ_get_err(long arg);
	public static native long LDKCVec_PrivateRouteZ_new(number[] elems);
	public static native boolean LDKCResult_PositiveTimestampCreationErrorZ_result_ok(long arg);
	public static native number LDKCResult_PositiveTimestampCreationErrorZ_get_ok(long arg);
	public static native CreationError LDKCResult_PositiveTimestampCreationErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NoneSemanticErrorZ_result_ok(long arg);
	public static native void LDKCResult_NoneSemanticErrorZ_get_ok(long arg);
	public static native SemanticError LDKCResult_NoneSemanticErrorZ_get_err(long arg);
	public static native boolean LDKCResult_InvoiceSemanticErrorZ_result_ok(long arg);
	public static native number LDKCResult_InvoiceSemanticErrorZ_get_ok(long arg);
	public static native SemanticError LDKCResult_InvoiceSemanticErrorZ_get_err(long arg);
	public static native boolean LDKCResult_DescriptionCreationErrorZ_result_ok(long arg);
	public static native number LDKCResult_DescriptionCreationErrorZ_get_ok(long arg);
	public static native CreationError LDKCResult_DescriptionCreationErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ExpiryTimeCreationErrorZ_result_ok(long arg);
	public static native number LDKCResult_ExpiryTimeCreationErrorZ_get_ok(long arg);
	public static native CreationError LDKCResult_ExpiryTimeCreationErrorZ_get_err(long arg);
	public static native boolean LDKCResult_PrivateRouteCreationErrorZ_result_ok(long arg);
	public static native number LDKCResult_PrivateRouteCreationErrorZ_get_ok(long arg);
	public static native CreationError LDKCResult_PrivateRouteCreationErrorZ_get_err(long arg);
	public static native boolean LDKCResult_StringErrorZ_result_ok(long arg);
	public static native String LDKCResult_StringErrorZ_get_ok(long arg);
	public static native Secp256k1Error LDKCResult_StringErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChannelMonitorUpdateDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelMonitorUpdateDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelMonitorUpdateDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_HTLCUpdateDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_HTLCUpdateDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_HTLCUpdateDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NoneMonitorUpdateErrorZ_result_ok(long arg);
	public static native void LDKCResult_NoneMonitorUpdateErrorZ_get_ok(long arg);
	public static native number LDKCResult_NoneMonitorUpdateErrorZ_get_err(long arg);
	// struct LDKOutPoint C2Tuple_OutPointScriptZ_get_a(LDKC2Tuple_OutPointScriptZ *NONNULL_PTR tuple);
	export function C2Tuple_OutPointScriptZ_get_a(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_OutPointScriptZ_get_a(tuple);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z C2Tuple_OutPointScriptZ_get_b(LDKC2Tuple_OutPointScriptZ *NONNULL_PTR tuple);
	export function C2Tuple_OutPointScriptZ_get_b(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_OutPointScriptZ_get_b(tuple);
		return decodeArray(nativeResponseValue);
	}
	// uint32_t C2Tuple_u32ScriptZ_get_a(LDKC2Tuple_u32ScriptZ *NONNULL_PTR tuple);
	export function C2Tuple_u32ScriptZ_get_a(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_u32ScriptZ_get_a(tuple);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z C2Tuple_u32ScriptZ_get_b(LDKC2Tuple_u32ScriptZ *NONNULL_PTR tuple);
	export function C2Tuple_u32ScriptZ_get_b(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_u32ScriptZ_get_b(tuple);
		return decodeArray(nativeResponseValue);
	}
	public static native long LDKCVec_C2Tuple_u32ScriptZZ_new(number[] elems);
	// struct LDKThirtyTwoBytes C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_a(LDKC2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ *NONNULL_PTR tuple);
	export function C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_a(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_a(tuple);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCVec_C2Tuple_u32ScriptZZ C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_b(LDKC2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ *NONNULL_PTR tuple);
	export function C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_b(tuple: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_b(tuple);
		return nativeResponseValue;
	}
	public static native long LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZZ_new(number[] elems);
	public static class LDKPaymentPurpose {
		private LDKPaymentPurpose() {}
		export class InvoicePayment extends LDKPaymentPurpose {
			public Uint8Array payment_preimage;
			public Uint8Array payment_secret;
			public number user_payment_id;
			InvoicePayment(Uint8Array payment_preimage, Uint8Array payment_secret, number user_payment_id) { this.payment_preimage = payment_preimage; this.payment_secret = payment_secret; this.user_payment_id = user_payment_id; }
		}
		export class SpontaneousPayment extends LDKPaymentPurpose {
			public Uint8Array spontaneous_payment;
			SpontaneousPayment(Uint8Array spontaneous_payment) { this.spontaneous_payment = spontaneous_payment; }
		}
		static native void init();
	}
	static { LDKPaymentPurpose.init(); }
	public static native LDKPaymentPurpose LDKPaymentPurpose_ref_from_ptr(long ptr);
	public static class LDKClosureReason {
		private LDKClosureReason() {}
		export class CounterpartyForceClosed extends LDKClosureReason {
			public String peer_msg;
			CounterpartyForceClosed(String peer_msg) { this.peer_msg = peer_msg; }
		}
		export class HolderForceClosed extends LDKClosureReason {
			HolderForceClosed() { }
		}
		export class CooperativeClosure extends LDKClosureReason {
			CooperativeClosure() { }
		}
		export class CommitmentTxConfirmed extends LDKClosureReason {
			CommitmentTxConfirmed() { }
		}
		export class ProcessingError extends LDKClosureReason {
			public String err;
			ProcessingError(String err) { this.err = err; }
		}
		export class DisconnectedPeer extends LDKClosureReason {
			DisconnectedPeer() { }
		}
		export class OutdatedChannelManager extends LDKClosureReason {
			OutdatedChannelManager() { }
		}
		static native void init();
	}
	static { LDKClosureReason.init(); }
	public static native LDKClosureReason LDKClosureReason_ref_from_ptr(long ptr);
	public static class LDKEvent {
		private LDKEvent() {}
		export class FundingGenerationReady extends LDKEvent {
			public Uint8Array temporary_channel_id;
			public number channel_value_satoshis;
			public Uint8Array output_script;
			public number user_channel_id;
			FundingGenerationReady(Uint8Array temporary_channel_id, number channel_value_satoshis, Uint8Array output_script, number user_channel_id) { this.temporary_channel_id = temporary_channel_id; this.channel_value_satoshis = channel_value_satoshis; this.output_script = output_script; this.user_channel_id = user_channel_id; }
		}
		export class PaymentReceived extends LDKEvent {
			public Uint8Array payment_hash;
			public number amt;
			public number purpose;
			PaymentReceived(Uint8Array payment_hash, number amt, number purpose) { this.payment_hash = payment_hash; this.amt = amt; this.purpose = purpose; }
		}
		export class PaymentSent extends LDKEvent {
			public Uint8Array payment_id;
			public Uint8Array payment_preimage;
			public Uint8Array payment_hash;
			public number fee_paid_msat;
			PaymentSent(Uint8Array payment_id, Uint8Array payment_preimage, Uint8Array payment_hash, number fee_paid_msat) { this.payment_id = payment_id; this.payment_preimage = payment_preimage; this.payment_hash = payment_hash; this.fee_paid_msat = fee_paid_msat; }
		}
		export class PaymentPathFailed extends LDKEvent {
			public Uint8Array payment_id;
			public Uint8Array payment_hash;
			public boolean rejected_by_dest;
			public number network_update;
			public boolean all_paths_failed;
			public number[] path;
			public number short_channel_id;
			public number retry;
			PaymentPathFailed(Uint8Array payment_id, Uint8Array payment_hash, boolean rejected_by_dest, number network_update, boolean all_paths_failed, number[] path, number short_channel_id, number retry) { this.payment_id = payment_id; this.payment_hash = payment_hash; this.rejected_by_dest = rejected_by_dest; this.network_update = network_update; this.all_paths_failed = all_paths_failed; this.path = path; this.short_channel_id = short_channel_id; this.retry = retry; }
		}
		export class PendingHTLCsForwardable extends LDKEvent {
			public number time_forwardable;
			PendingHTLCsForwardable(number time_forwardable) { this.time_forwardable = time_forwardable; }
		}
		export class SpendableOutputs extends LDKEvent {
			public number[] outputs;
			SpendableOutputs(number[] outputs) { this.outputs = outputs; }
		}
		export class PaymentForwarded extends LDKEvent {
			public number fee_earned_msat;
			public boolean claim_from_onchain_tx;
			PaymentForwarded(number fee_earned_msat, boolean claim_from_onchain_tx) { this.fee_earned_msat = fee_earned_msat; this.claim_from_onchain_tx = claim_from_onchain_tx; }
		}
		export class ChannelClosed extends LDKEvent {
			public Uint8Array channel_id;
			public number user_channel_id;
			public number reason;
			ChannelClosed(Uint8Array channel_id, number user_channel_id, number reason) { this.channel_id = channel_id; this.user_channel_id = user_channel_id; this.reason = reason; }
		}
		export class DiscardFunding extends LDKEvent {
			public Uint8Array channel_id;
			public Uint8Array transaction;
			DiscardFunding(Uint8Array channel_id, Uint8Array transaction) { this.channel_id = channel_id; this.transaction = transaction; }
		}
		static native void init();
	}
	static { LDKEvent.init(); }
	public static native LDKEvent LDKEvent_ref_from_ptr(long ptr);
	public static native long LDKCVec_EventZ_new(number[] elems);
	// uint32_t C2Tuple_u32TxOutZ_get_a(LDKC2Tuple_u32TxOutZ *NONNULL_PTR tuple);
	export function C2Tuple_u32TxOutZ_get_a(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_u32TxOutZ_get_a(tuple);
		return nativeResponseValue;
	}
	// struct LDKTxOut C2Tuple_u32TxOutZ_get_b(LDKC2Tuple_u32TxOutZ *NONNULL_PTR tuple);
	export function C2Tuple_u32TxOutZ_get_b(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_u32TxOutZ_get_b(tuple);
		return nativeResponseValue;
	}
	public static native long LDKCVec_C2Tuple_u32TxOutZZ_new(number[] elems);
	// struct LDKThirtyTwoBytes C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ *NONNULL_PTR tuple);
	export function C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(tuple);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCVec_C2Tuple_u32TxOutZZ C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ *NONNULL_PTR tuple);
	export function C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(tuple: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(tuple);
		return nativeResponseValue;
	}
	public static native long LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_new(number[] elems);
	public static class LDKBalance {
		private LDKBalance() {}
		export class ClaimableOnChannelClose extends LDKBalance {
			public number claimable_amount_satoshis;
			ClaimableOnChannelClose(number claimable_amount_satoshis) { this.claimable_amount_satoshis = claimable_amount_satoshis; }
		}
		export class ClaimableAwaitingConfirmations extends LDKBalance {
			public number claimable_amount_satoshis;
			public number confirmation_height;
			ClaimableAwaitingConfirmations(number claimable_amount_satoshis, number confirmation_height) { this.claimable_amount_satoshis = claimable_amount_satoshis; this.confirmation_height = confirmation_height; }
		}
		export class ContentiousClaimable extends LDKBalance {
			public number claimable_amount_satoshis;
			public number timeout_height;
			ContentiousClaimable(number claimable_amount_satoshis, number timeout_height) { this.claimable_amount_satoshis = claimable_amount_satoshis; this.timeout_height = timeout_height; }
		}
		export class MaybeClaimableHTLCAwaitingTimeout extends LDKBalance {
			public number claimable_amount_satoshis;
			public number claimable_height;
			MaybeClaimableHTLCAwaitingTimeout(number claimable_amount_satoshis, number claimable_height) { this.claimable_amount_satoshis = claimable_amount_satoshis; this.claimable_height = claimable_height; }
		}
		static native void init();
	}
	static { LDKBalance.init(); }
	public static native LDKBalance LDKBalance_ref_from_ptr(long ptr);
	public static native long LDKCVec_BalanceZ_new(number[] elems);
	public static native boolean LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NoneLightningErrorZ_result_ok(long arg);
	public static native void LDKCResult_NoneLightningErrorZ_get_ok(long arg);
	public static native number LDKCResult_NoneLightningErrorZ_get_err(long arg);
	// struct LDKPublicKey C2Tuple_PublicKeyTypeZ_get_a(LDKC2Tuple_PublicKeyTypeZ *NONNULL_PTR tuple);
	export function C2Tuple_PublicKeyTypeZ_get_a(tuple: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PublicKeyTypeZ_get_a(tuple);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKType C2Tuple_PublicKeyTypeZ_get_b(LDKC2Tuple_PublicKeyTypeZ *NONNULL_PTR tuple);
	export function C2Tuple_PublicKeyTypeZ_get_b(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PublicKeyTypeZ_get_b(tuple);
		return nativeResponseValue;
	}
	public static native long LDKCVec_C2Tuple_PublicKeyTypeZZ_new(number[] elems);
	public static native boolean LDKCResult_boolLightningErrorZ_result_ok(long arg);
	public static native boolean LDKCResult_boolLightningErrorZ_get_ok(long arg);
	public static native number LDKCResult_boolLightningErrorZ_get_err(long arg);
	// struct LDKChannelAnnouncement C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *NONNULL_PTR tuple);
	export function C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(tuple);
		return nativeResponseValue;
	}
	// struct LDKChannelUpdate C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *NONNULL_PTR tuple);
	export function C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(tuple);
		return nativeResponseValue;
	}
	// struct LDKChannelUpdate C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *NONNULL_PTR tuple);
	export function C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(tuple: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(tuple);
		return nativeResponseValue;
	}
	public static native long LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_new(number[] elems);
	public static native long LDKCVec_NodeAnnouncementZ_new(number[] elems);
	public static native boolean LDKCResult_CVec_u8ZPeerHandleErrorZ_result_ok(long arg);
	public static native Uint8Array LDKCResult_CVec_u8ZPeerHandleErrorZ_get_ok(long arg);
	public static native number LDKCResult_CVec_u8ZPeerHandleErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NonePeerHandleErrorZ_result_ok(long arg);
	public static native void LDKCResult_NonePeerHandleErrorZ_get_ok(long arg);
	public static native number LDKCResult_NonePeerHandleErrorZ_get_err(long arg);
	public static native boolean LDKCResult_boolPeerHandleErrorZ_result_ok(long arg);
	public static native boolean LDKCResult_boolPeerHandleErrorZ_get_ok(long arg);
	public static native number LDKCResult_boolPeerHandleErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NodeIdDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_NodeIdDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_NodeIdDecodeErrorZ_get_err(long arg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKAccess {
			get_utxo (genesis_hash: Uint8Array, short_channel_id: number): number;
		}

		export function LDKAccess_new(impl: LDKAccess): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCResult_TxOutAccessErrorZ Access_get_utxo LDKAccess *NONNULL_PTR this_arg, const uint8_t (*genesis_hash)[32], uint64_t short_channel_id
	export function Access_get_utxo(this_arg: number, genesis_hash: Uint8Array, short_channel_id: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Access_get_utxo(this_arg, encodeArray(genesis_hash), short_channel_id);
		return nativeResponseValue;
	}
	public static class LDKCOption_AccessZ {
		private LDKCOption_AccessZ() {}
		export class Some extends LDKCOption_AccessZ {
			public number some;
			Some(number some) { this.some = some; }
		}
		export class None extends LDKCOption_AccessZ {
			None() { }
		}
		static native void init();
	}
	static { LDKCOption_AccessZ.init(); }
	public static native LDKCOption_AccessZ LDKCOption_AccessZ_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_DirectionalChannelInfoDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_DirectionalChannelInfoDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_DirectionalChannelInfoDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChannelInfoDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelInfoDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelInfoDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_RoutingFeesDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_RoutingFeesDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_RoutingFeesDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NodeAnnouncementInfoDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_NodeAnnouncementInfoDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_NodeAnnouncementInfoDecodeErrorZ_get_err(long arg);
	public static native long LDKCVec_u64Z_new(number[] elems);
	public static native boolean LDKCResult_NodeInfoDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_NodeInfoDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_NodeInfoDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NetworkGraphDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_NetworkGraphDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_NetworkGraphDecodeErrorZ_get_err(long arg);
	public static class LDKCOption_CVec_NetAddressZZ {
		private LDKCOption_CVec_NetAddressZZ() {}
		export class Some extends LDKCOption_CVec_NetAddressZZ {
			public number[] some;
			Some(number[] some) { this.some = some; }
		}
		export class None extends LDKCOption_CVec_NetAddressZZ {
			None() { }
		}
		static native void init();
	}
	static { LDKCOption_CVec_NetAddressZZ.init(); }
	public static native LDKCOption_CVec_NetAddressZZ LDKCOption_CVec_NetAddressZZ_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_NetAddressDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_NetAddressDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_NetAddressDecodeErrorZ_get_err(long arg);
	public static native long LDKCVec_UpdateAddHTLCZ_new(number[] elems);
	public static native long LDKCVec_UpdateFulfillHTLCZ_new(number[] elems);
	public static native long LDKCVec_UpdateFailHTLCZ_new(number[] elems);
	public static native long LDKCVec_UpdateFailMalformedHTLCZ_new(number[] elems);
	public static native boolean LDKCResult_AcceptChannelDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_AcceptChannelDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_AcceptChannelDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_AnnouncementSignaturesDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_AnnouncementSignaturesDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_AnnouncementSignaturesDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChannelReestablishDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelReestablishDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelReestablishDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ClosingSignedDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ClosingSignedDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ClosingSignedDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ClosingSignedFeeRangeDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ClosingSignedFeeRangeDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ClosingSignedFeeRangeDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_CommitmentSignedDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_CommitmentSignedDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_CommitmentSignedDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_FundingCreatedDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_FundingCreatedDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_FundingCreatedDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_FundingSignedDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_FundingSignedDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_FundingSignedDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_FundingLockedDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_FundingLockedDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_FundingLockedDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_InitDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_InitDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_InitDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_OpenChannelDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_OpenChannelDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_OpenChannelDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_RevokeAndACKDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_RevokeAndACKDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_RevokeAndACKDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ShutdownDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ShutdownDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ShutdownDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UpdateFailHTLCDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UpdateFailHTLCDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UpdateFailHTLCDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UpdateFailMalformedHTLCDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UpdateFailMalformedHTLCDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UpdateFailMalformedHTLCDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UpdateFeeDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UpdateFeeDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UpdateFeeDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UpdateFulfillHTLCDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UpdateFulfillHTLCDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UpdateFulfillHTLCDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UpdateAddHTLCDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UpdateAddHTLCDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UpdateAddHTLCDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_PingDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_PingDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_PingDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_PongDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_PongDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_PongDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChannelAnnouncementDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelAnnouncementDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelAnnouncementDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UnsignedChannelUpdateDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UnsignedChannelUpdateDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UnsignedChannelUpdateDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ChannelUpdateDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ChannelUpdateDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ChannelUpdateDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_ErrorMessageDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_ErrorMessageDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_ErrorMessageDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_get_err(long arg);
	public static native boolean LDKCResult_NodeAnnouncementDecodeErrorZ_result_ok(long arg);
	public static native number LDKCResult_NodeAnnouncementDecodeErrorZ_get_ok(long arg);
	public static native number LDKCResult_NodeAnnouncementDecodeErrorZ_get_err(long arg);
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
	public static class LDKSignOrCreationError {
		private LDKSignOrCreationError() {}
		export class SignError extends LDKSignOrCreationError {
			SignError() { }
		}
		export class CreationError extends LDKSignOrCreationError {
			public CreationError creation_error;
			CreationError(CreationError creation_error) { this.creation_error = creation_error; }
		}
		static native void init();
	}
	static { LDKSignOrCreationError.init(); }
	public static native LDKSignOrCreationError LDKSignOrCreationError_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_InvoiceSignOrCreationErrorZ_result_ok(long arg);
	public static native number LDKCResult_InvoiceSignOrCreationErrorZ_get_ok(long arg);
	public static native number LDKCResult_InvoiceSignOrCreationErrorZ_get_err(long arg);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKFilter {
			register_tx (txid: Uint8Array, script_pubkey: Uint8Array): void;
			register_output (output: number): number;
		}

		export function LDKFilter_new(impl: LDKFilter): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// void Filter_register_tx LDKFilter *NONNULL_PTR this_arg, const uint8_t (*txid)[32], struct LDKu8slice script_pubkey
	export function Filter_register_tx(this_arg: number, txid: Uint8Array, script_pubkey: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Filter_register_tx(this_arg, encodeArray(txid), encodeArray(script_pubkey));
		// debug statements here
	}
	// LDKCOption_C2Tuple_usizeTransactionZZ Filter_register_output LDKFilter *NONNULL_PTR this_arg, struct LDKWatchedOutput output
	export function Filter_register_output(this_arg: number, output: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Filter_register_output(this_arg, output);
		return nativeResponseValue;
	}
	public static class LDKCOption_FilterZ {
		private LDKCOption_FilterZ() {}
		export class Some extends LDKCOption_FilterZ {
			public number some;
			Some(number some) { this.some = some; }
		}
		export class None extends LDKCOption_FilterZ {
			None() { }
		}
		static native void init();
	}
	static { LDKCOption_FilterZ.init(); }
	public static native LDKCOption_FilterZ LDKCOption_FilterZ_ref_from_ptr(long ptr);
	public static native boolean LDKCResult_LockedChannelMonitorNoneZ_result_ok(long arg);
	public static native number LDKCResult_LockedChannelMonitorNoneZ_get_ok(long arg);
	public static native void LDKCResult_LockedChannelMonitorNoneZ_get_err(long arg);
	public static native long LDKCVec_OutPointZ_new(number[] elems);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKMessageSendEventsProvider {
			get_and_clear_pending_msg_events (): number[];
		}

		export function LDKMessageSendEventsProvider_new(impl: LDKMessageSendEventsProvider): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCVec_MessageSendEventZ MessageSendEventsProvider_get_and_clear_pending_msg_events LDKMessageSendEventsProvider *NONNULL_PTR this_arg
	export function MessageSendEventsProvider_get_and_clear_pending_msg_events(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEventsProvider_get_and_clear_pending_msg_events(this_arg);
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKEventHandler {
			handle_event (event: number): void;
		}

		export function LDKEventHandler_new(impl: LDKEventHandler): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// void EventHandler_handle_event LDKEventHandler *NONNULL_PTR this_arg, const struct LDKEvent *NONNULL_PTR event
	export function EventHandler_handle_event(this_arg: number, event: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.EventHandler_handle_event(this_arg, event);
		// debug statements here
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKEventsProvider {
			process_pending_events (handler: number): void;
		}

		export function LDKEventsProvider_new(impl: LDKEventsProvider): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// void EventsProvider_process_pending_events LDKEventsProvider *NONNULL_PTR this_arg, struct LDKEventHandler handler
	export function EventsProvider_process_pending_events(this_arg: number, handler: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.EventsProvider_process_pending_events(this_arg, handler);
		// debug statements here
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKListen {
			block_connected (block: Uint8Array, height: number): void;
			block_disconnected (header: Uint8Array, height: number): void;
		}

		export function LDKListen_new(impl: LDKListen): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// void Listen_block_connected LDKListen *NONNULL_PTR this_arg, struct LDKu8slice block, uint32_t height
	export function Listen_block_connected(this_arg: number, block: Uint8Array, height: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Listen_block_connected(this_arg, encodeArray(block), height);
		// debug statements here
	}
	// void Listen_block_disconnected LDKListen *NONNULL_PTR this_arg, const uint8_t (*header)[80], uint32_t height
	export function Listen_block_disconnected(this_arg: number, header: Uint8Array, height: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Listen_block_disconnected(this_arg, encodeArray(header), height);
		// debug statements here
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKConfirm {
			transactions_confirmed (header: Uint8Array, txdata: number[], height: number): void;
			transaction_unconfirmed (txid: Uint8Array): void;
			best_block_updated (header: Uint8Array, height: number): void;
			get_relevant_txids (): Uint8Array[];
		}

		export function LDKConfirm_new(impl: LDKConfirm): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// void Confirm_transactions_confirmed LDKConfirm *NONNULL_PTR this_arg, const uint8_t (*header)[80], struct LDKCVec_C2Tuple_usizeTransactionZZ txdata, uint32_t height
	export function Confirm_transactions_confirmed(this_arg: number, header: Uint8Array, txdata: number[], height: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Confirm_transactions_confirmed(this_arg, encodeArray(header), txdata, height);
		// debug statements here
	}
	// void Confirm_transaction_unconfirmed LDKConfirm *NONNULL_PTR this_arg, const uint8_t (*txid)[32]
	export function Confirm_transaction_unconfirmed(this_arg: number, txid: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Confirm_transaction_unconfirmed(this_arg, encodeArray(txid));
		// debug statements here
	}
	// void Confirm_best_block_updated LDKConfirm *NONNULL_PTR this_arg, const uint8_t (*header)[80], uint32_t height
	export function Confirm_best_block_updated(this_arg: number, header: Uint8Array, height: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Confirm_best_block_updated(this_arg, encodeArray(header), height);
		// debug statements here
	}
	// LDKCVec_TxidZ Confirm_get_relevant_txids LDKConfirm *NONNULL_PTR this_arg
	export function Confirm_get_relevant_txids(this_arg: number): Uint8Array[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Confirm_get_relevant_txids(this_arg);
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKPersist {
			persist_new_channel (channel_id: number, data: number, update_id: number): number;
			update_persisted_channel (channel_id: number, update: number, data: number, update_id: number): number;
		}

		export function LDKPersist_new(impl: LDKPersist): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCResult_NoneChannelMonitorUpdateErrZ Persist_persist_new_channel LDKPersist *NONNULL_PTR this_arg, struct LDKOutPoint channel_id, const struct LDKChannelMonitor *NONNULL_PTR data, struct LDKMonitorUpdateId update_id
	export function Persist_persist_new_channel(this_arg: number, channel_id: number, data: number, update_id: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Persist_persist_new_channel(this_arg, channel_id, data, update_id);
		return nativeResponseValue;
	}
	// LDKCResult_NoneChannelMonitorUpdateErrZ Persist_update_persisted_channel LDKPersist *NONNULL_PTR this_arg, struct LDKOutPoint channel_id, const struct LDKChannelMonitorUpdate *NONNULL_PTR update, const struct LDKChannelMonitor *NONNULL_PTR data, struct LDKMonitorUpdateId update_id
	export function Persist_update_persisted_channel(this_arg: number, channel_id: number, update: number, data: number, update_id: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Persist_update_persisted_channel(this_arg, channel_id, update, data, update_id);
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKChannelMessageHandler {
			handle_open_channel (their_node_id: Uint8Array, their_features: number, msg: number): void;
			handle_accept_channel (their_node_id: Uint8Array, their_features: number, msg: number): void;
			handle_funding_created (their_node_id: Uint8Array, msg: number): void;
			handle_funding_signed (their_node_id: Uint8Array, msg: number): void;
			handle_funding_locked (their_node_id: Uint8Array, msg: number): void;
			handle_shutdown (their_node_id: Uint8Array, their_features: number, msg: number): void;
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
			handle_channel_update (their_node_id: Uint8Array, msg: number): void;
			handle_error (their_node_id: Uint8Array, msg: number): void;
		}

		export function LDKChannelMessageHandler_new(impl: LDKChannelMessageHandler, MessageSendEventsProvider: LDKMessageSendEventsProvider): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// void ChannelMessageHandler_handle_open_channel LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, struct LDKInitFeatures their_features, const struct LDKOpenChannel *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_open_channel(this_arg: number, their_node_id: Uint8Array, their_features: number, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_open_channel(this_arg, encodeArray(their_node_id), their_features, msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_accept_channel LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, struct LDKInitFeatures their_features, const struct LDKAcceptChannel *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_accept_channel(this_arg: number, their_node_id: Uint8Array, their_features: number, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_accept_channel(this_arg, encodeArray(their_node_id), their_features, msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_funding_created LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKFundingCreated *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_funding_created(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_funding_created(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_funding_signed LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKFundingSigned *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_funding_signed(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_funding_signed(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_funding_locked LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKFundingLocked *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_funding_locked(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_funding_locked(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_shutdown LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKInitFeatures *NONNULL_PTR their_features, const struct LDKShutdown *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_shutdown(this_arg: number, their_node_id: Uint8Array, their_features: number, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_shutdown(this_arg, encodeArray(their_node_id), their_features, msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_closing_signed LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKClosingSigned *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_closing_signed(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_closing_signed(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_update_add_htlc LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKUpdateAddHTLC *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_update_add_htlc(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_update_add_htlc(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_update_fulfill_htlc LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKUpdateFulfillHTLC *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_update_fulfill_htlc(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_update_fulfill_htlc(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_update_fail_htlc LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKUpdateFailHTLC *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_update_fail_htlc(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_update_fail_htlc(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_update_fail_malformed_htlc LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_update_fail_malformed_htlc(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_update_fail_malformed_htlc(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_commitment_signed LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKCommitmentSigned *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_commitment_signed(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_commitment_signed(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_revoke_and_ack LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKRevokeAndACK *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_revoke_and_ack(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_revoke_and_ack(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_update_fee LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKUpdateFee *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_update_fee(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_update_fee(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_announcement_signatures LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKAnnouncementSignatures *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_announcement_signatures(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_announcement_signatures(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_peer_disconnected LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, bool no_connection_possible
	export function ChannelMessageHandler_peer_disconnected(this_arg: number, their_node_id: Uint8Array, no_connection_possible: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_peer_disconnected(this_arg, encodeArray(their_node_id), no_connection_possible);
		// debug statements here
	}
	// void ChannelMessageHandler_peer_connected LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKInit *NONNULL_PTR msg
	export function ChannelMessageHandler_peer_connected(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_peer_connected(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_channel_reestablish LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKChannelReestablish *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_channel_reestablish(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_channel_reestablish(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_channel_update LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKChannelUpdate *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_channel_update(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_channel_update(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}
	// void ChannelMessageHandler_handle_error LDKChannelMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKErrorMessage *NONNULL_PTR msg
	export function ChannelMessageHandler_handle_error(this_arg: number, their_node_id: Uint8Array, msg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_handle_error(this_arg, encodeArray(their_node_id), msg);
		// debug statements here
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKRoutingMessageHandler {
			handle_node_announcement (msg: number): number;
			handle_channel_announcement (msg: number): number;
			handle_channel_update (msg: number): number;
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


	// LDKCResult_boolLightningErrorZ RoutingMessageHandler_handle_node_announcement LDKRoutingMessageHandler *NONNULL_PTR this_arg, const struct LDKNodeAnnouncement *NONNULL_PTR msg
	export function RoutingMessageHandler_handle_node_announcement(this_arg: number, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_handle_node_announcement(this_arg, msg);
		return nativeResponseValue;
	}
	// LDKCResult_boolLightningErrorZ RoutingMessageHandler_handle_channel_announcement LDKRoutingMessageHandler *NONNULL_PTR this_arg, const struct LDKChannelAnnouncement *NONNULL_PTR msg
	export function RoutingMessageHandler_handle_channel_announcement(this_arg: number, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_handle_channel_announcement(this_arg, msg);
		return nativeResponseValue;
	}
	// LDKCResult_boolLightningErrorZ RoutingMessageHandler_handle_channel_update LDKRoutingMessageHandler *NONNULL_PTR this_arg, const struct LDKChannelUpdate *NONNULL_PTR msg
	export function RoutingMessageHandler_handle_channel_update(this_arg: number, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_handle_channel_update(this_arg, msg);
		return nativeResponseValue;
	}
	// LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ RoutingMessageHandler_get_next_channel_announcements LDKRoutingMessageHandler *NONNULL_PTR this_arg, uint64_t starting_point, uint8_t batch_amount
	export function RoutingMessageHandler_get_next_channel_announcements(this_arg: number, starting_point: number, batch_amount: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_get_next_channel_announcements(this_arg, starting_point, batch_amount);
		return nativeResponseValue;
	}
	// LDKCVec_NodeAnnouncementZ RoutingMessageHandler_get_next_node_announcements LDKRoutingMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey starting_point, uint8_t batch_amount
	export function RoutingMessageHandler_get_next_node_announcements(this_arg: number, starting_point: Uint8Array, batch_amount: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_get_next_node_announcements(this_arg, encodeArray(starting_point), batch_amount);
		return nativeResponseValue;
	}
	// void RoutingMessageHandler_sync_routing_table LDKRoutingMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, const struct LDKInit *NONNULL_PTR init
	export function RoutingMessageHandler_sync_routing_table(this_arg: number, their_node_id: Uint8Array, init: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_sync_routing_table(this_arg, encodeArray(their_node_id), init);
		// debug statements here
	}
	// LDKCResult_NoneLightningErrorZ RoutingMessageHandler_handle_reply_channel_range LDKRoutingMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, struct LDKReplyChannelRange msg
	export function RoutingMessageHandler_handle_reply_channel_range(this_arg: number, their_node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_handle_reply_channel_range(this_arg, encodeArray(their_node_id), msg);
		return nativeResponseValue;
	}
	// LDKCResult_NoneLightningErrorZ RoutingMessageHandler_handle_reply_short_channel_ids_end LDKRoutingMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, struct LDKReplyShortChannelIdsEnd msg
	export function RoutingMessageHandler_handle_reply_short_channel_ids_end(this_arg: number, their_node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_handle_reply_short_channel_ids_end(this_arg, encodeArray(their_node_id), msg);
		return nativeResponseValue;
	}
	// LDKCResult_NoneLightningErrorZ RoutingMessageHandler_handle_query_channel_range LDKRoutingMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, struct LDKQueryChannelRange msg
	export function RoutingMessageHandler_handle_query_channel_range(this_arg: number, their_node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_handle_query_channel_range(this_arg, encodeArray(their_node_id), msg);
		return nativeResponseValue;
	}
	// LDKCResult_NoneLightningErrorZ RoutingMessageHandler_handle_query_short_channel_ids LDKRoutingMessageHandler *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, struct LDKQueryShortChannelIds msg
	export function RoutingMessageHandler_handle_query_short_channel_ids(this_arg: number, their_node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_handle_query_short_channel_ids(this_arg, encodeArray(their_node_id), msg);
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKCustomMessageReader {
			read (message_type: number, buffer: Uint8Array): number;
		}

		export function LDKCustomMessageReader_new(impl: LDKCustomMessageReader): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCResult_COption_TypeZDecodeErrorZ CustomMessageReader_read LDKCustomMessageReader *NONNULL_PTR this_arg, uint16_t message_type, struct LDKu8slice buffer
	export function CustomMessageReader_read(this_arg: number, message_type: number, buffer: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CustomMessageReader_read(this_arg, message_type, encodeArray(buffer));
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKCustomMessageHandler {
			handle_custom_message (msg: number, sender_node_id: Uint8Array): number;
			get_and_clear_pending_msg (): number[];
		}

		export function LDKCustomMessageHandler_new(impl: LDKCustomMessageHandler, CustomMessageReader: LDKCustomMessageReader): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCResult_NoneLightningErrorZ CustomMessageHandler_handle_custom_message LDKCustomMessageHandler *NONNULL_PTR this_arg, struct LDKType msg, struct LDKPublicKey sender_node_id
	export function CustomMessageHandler_handle_custom_message(this_arg: number, msg: number, sender_node_id: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CustomMessageHandler_handle_custom_message(this_arg, msg, encodeArray(sender_node_id));
		return nativeResponseValue;
	}
	// LDKCVec_C2Tuple_PublicKeyTypeZZ CustomMessageHandler_get_and_clear_pending_msg LDKCustomMessageHandler *NONNULL_PTR this_arg
	export function CustomMessageHandler_get_and_clear_pending_msg(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CustomMessageHandler_get_and_clear_pending_msg(this_arg);
		return nativeResponseValue;
	}



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


	// uintptr_t SocketDescriptor_send_data LDKSocketDescriptor *NONNULL_PTR this_arg, struct LDKu8slice data, bool resume_read
	export function SocketDescriptor_send_data(this_arg: number, data: Uint8Array, resume_read: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SocketDescriptor_send_data(this_arg, encodeArray(data), resume_read);
		return nativeResponseValue;
	}
	// void SocketDescriptor_disconnect_socket LDKSocketDescriptor *NONNULL_PTR this_arg
	export function SocketDescriptor_disconnect_socket(this_arg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SocketDescriptor_disconnect_socket(this_arg);
		// debug statements here
	}
	// uint64_t SocketDescriptor_hash LDKSocketDescriptor *NONNULL_PTR this_arg
	export function SocketDescriptor_hash(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SocketDescriptor_hash(this_arg);
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKScore {
			channel_penalty_msat (short_channel_id: number, source: number, target: number): number;
			payment_path_failed (path: number[], short_channel_id: number): void;
			write (): Uint8Array;
		}

		export function LDKScore_new(impl: LDKScore): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// uint64_t Score_channel_penalty_msat LDKScore *NONNULL_PTR this_arg, uint64_t short_channel_id, const struct LDKNodeId *NONNULL_PTR source, const struct LDKNodeId *NONNULL_PTR target
	export function Score_channel_penalty_msat(this_arg: number, short_channel_id: number, source: number, target: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Score_channel_penalty_msat(this_arg, short_channel_id, source, target);
		return nativeResponseValue;
	}
	// void Score_payment_path_failed LDKScore *NONNULL_PTR this_arg, struct LDKCVec_RouteHopZ path, uint64_t short_channel_id
	export function Score_payment_path_failed(this_arg: number, path: number[], short_channel_id: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Score_payment_path_failed(this_arg, path, short_channel_id);
		// debug statements here
	}
	// LDKCVec_u8Z Score_write LDKScore *NONNULL_PTR this_arg
	export function Score_write(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Score_write(this_arg);
		return decodeArray(nativeResponseValue);
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKChannelManagerPersister {
			persist_manager (channel_manager: number): number;
		}

		export function LDKChannelManagerPersister_new(impl: LDKChannelManagerPersister): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCResult_NoneErrorZ ChannelManagerPersister_persist_manager LDKChannelManagerPersister *NONNULL_PTR this_arg, const struct LDKChannelManager *NONNULL_PTR channel_manager
	export function ChannelManagerPersister_persist_manager(this_arg: number, channel_manager: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerPersister_persist_manager(this_arg, channel_manager);
		return nativeResponseValue;
	}
	public static class LDKFallback {
		private LDKFallback() {}
		export class SegWitProgram extends LDKFallback {
			public number version;
			public Uint8Array program;
			SegWitProgram(number version, Uint8Array program) { this.version = version; this.program = program; }
		}
		export class PubKeyHash extends LDKFallback {
			public Uint8Array pub_key_hash;
			PubKeyHash(Uint8Array pub_key_hash) { this.pub_key_hash = pub_key_hash; }
		}
		export class ScriptHash extends LDKFallback {
			public Uint8Array script_hash;
			ScriptHash(Uint8Array script_hash) { this.script_hash = script_hash; }
		}
		static native void init();
	}
	static { LDKFallback.init(); }
	public static native LDKFallback LDKFallback_ref_from_ptr(long ptr);



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKPayer {
			node_id (): Uint8Array;
			first_hops (): number[];
			send_payment (route: number, payment_hash: Uint8Array, payment_secret: Uint8Array): number;
			retry_payment (route: number, payment_id: Uint8Array): number;
		}

		export function LDKPayer_new(impl: LDKPayer): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKPublicKey Payer_node_id LDKPayer *NONNULL_PTR this_arg
	export function Payer_node_id(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payer_node_id(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// LDKCVec_ChannelDetailsZ Payer_first_hops LDKPayer *NONNULL_PTR this_arg
	export function Payer_first_hops(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payer_first_hops(this_arg);
		return nativeResponseValue;
	}
	// LDKCResult_PaymentIdPaymentSendFailureZ Payer_send_payment LDKPayer *NONNULL_PTR this_arg, const struct LDKRoute *NONNULL_PTR route, struct LDKThirtyTwoBytes payment_hash, struct LDKThirtyTwoBytes payment_secret
	export function Payer_send_payment(this_arg: number, route: number, payment_hash: Uint8Array, payment_secret: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payer_send_payment(this_arg, route, encodeArray(payment_hash), encodeArray(payment_secret));
		return nativeResponseValue;
	}
	// LDKCResult_NonePaymentSendFailureZ Payer_retry_payment LDKPayer *NONNULL_PTR this_arg, const struct LDKRoute *NONNULL_PTR route, struct LDKThirtyTwoBytes payment_id
	export function Payer_retry_payment(this_arg: number, route: number, payment_id: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payer_retry_payment(this_arg, route, encodeArray(payment_id));
		return nativeResponseValue;
	}



// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START

		export interface LDKRouter {
			find_route (payer: Uint8Array, params: number, first_hops: number[], scorer: number): number;
		}

		export function LDKRouter_new(impl: LDKRouter): number {
            throw new Error('unimplemented'); // TODO: bind to WASM
        }

// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END


	// LDKCResult_RouteLightningErrorZ Router_find_route LDKRouter *NONNULL_PTR this_arg, struct LDKPublicKey payer, const struct LDKRouteParameters *NONNULL_PTR params, struct LDKCVec_ChannelDetailsZ *first_hops, const struct LDKScore *NONNULL_PTR scorer
	export function Router_find_route(this_arg: number, payer: Uint8Array, params: number, first_hops: number[], scorer: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Router_find_route(this_arg, encodeArray(payer), params, first_hops, scorer);
		return nativeResponseValue;
	}
	// struct LDKStr _ldk_get_compiled_version(void);
	export function _ldk_get_compiled_version(): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm._ldk_get_compiled_version();
		return nativeResponseValue;
	}
	// struct LDKStr _ldk_c_bindings_get_compiled_version(void);
	export function _ldk_c_bindings_get_compiled_version(): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm._ldk_c_bindings_get_compiled_version();
		return nativeResponseValue;
	}
	// void Transaction_free(struct LDKTransaction _res);
	export function Transaction_free(_res: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Transaction_free(encodeArray(_res));
		// debug statements here
	}
	// struct LDKTxOut TxOut_new(struct LDKCVec_u8Z script_pubkey, uint64_t value);
	export function TxOut_new(script_pubkey: Uint8Array, value: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxOut_new(encodeArray(script_pubkey), value);
		return nativeResponseValue;
	}
	// void TxOut_free(struct LDKTxOut _res);
	export function TxOut_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxOut_free(_res);
		// debug statements here
	}
	// struct LDKTxOut TxOut_clone(const struct LDKTxOut *NONNULL_PTR orig);
	export function TxOut_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxOut_clone(orig);
		return nativeResponseValue;
	}
	// void Str_free(struct LDKStr _res);
	export function Str_free(_res: String): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Str_free(_res);
		// debug statements here
	}
	// struct LDKCResult_SecretKeyErrorZ CResult_SecretKeyErrorZ_ok(struct LDKSecretKey o);
	export function CResult_SecretKeyErrorZ_ok(o: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SecretKeyErrorZ_ok(encodeArray(o));
		return nativeResponseValue;
	}
	// struct LDKCResult_SecretKeyErrorZ CResult_SecretKeyErrorZ_err(enum LDKSecp256k1Error e);
	export function CResult_SecretKeyErrorZ_err(e: Secp256k1Error): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SecretKeyErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_SecretKeyErrorZ_free(struct LDKCResult_SecretKeyErrorZ _res);
	export function CResult_SecretKeyErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SecretKeyErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PublicKeyErrorZ CResult_PublicKeyErrorZ_ok(struct LDKPublicKey o);
	export function CResult_PublicKeyErrorZ_ok(o: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PublicKeyErrorZ_ok(encodeArray(o));
		return nativeResponseValue;
	}
	// struct LDKCResult_PublicKeyErrorZ CResult_PublicKeyErrorZ_err(enum LDKSecp256k1Error e);
	export function CResult_PublicKeyErrorZ_err(e: Secp256k1Error): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PublicKeyErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_PublicKeyErrorZ_free(struct LDKCResult_PublicKeyErrorZ _res);
	export function CResult_PublicKeyErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PublicKeyErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PublicKeyErrorZ CResult_PublicKeyErrorZ_clone(const struct LDKCResult_PublicKeyErrorZ *NONNULL_PTR orig);
	export function CResult_PublicKeyErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PublicKeyErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_TxCreationKeysDecodeErrorZ CResult_TxCreationKeysDecodeErrorZ_ok(struct LDKTxCreationKeys o);
	export function CResult_TxCreationKeysDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxCreationKeysDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_TxCreationKeysDecodeErrorZ CResult_TxCreationKeysDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_TxCreationKeysDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxCreationKeysDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_TxCreationKeysDecodeErrorZ_free(struct LDKCResult_TxCreationKeysDecodeErrorZ _res);
	export function CResult_TxCreationKeysDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxCreationKeysDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_TxCreationKeysDecodeErrorZ CResult_TxCreationKeysDecodeErrorZ_clone(const struct LDKCResult_TxCreationKeysDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_TxCreationKeysDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxCreationKeysDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelPublicKeysDecodeErrorZ CResult_ChannelPublicKeysDecodeErrorZ_ok(struct LDKChannelPublicKeys o);
	export function CResult_ChannelPublicKeysDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelPublicKeysDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelPublicKeysDecodeErrorZ CResult_ChannelPublicKeysDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ChannelPublicKeysDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelPublicKeysDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ChannelPublicKeysDecodeErrorZ_free(struct LDKCResult_ChannelPublicKeysDecodeErrorZ _res);
	export function CResult_ChannelPublicKeysDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelPublicKeysDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelPublicKeysDecodeErrorZ CResult_ChannelPublicKeysDecodeErrorZ_clone(const struct LDKCResult_ChannelPublicKeysDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ChannelPublicKeysDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelPublicKeysDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_TxCreationKeysErrorZ CResult_TxCreationKeysErrorZ_ok(struct LDKTxCreationKeys o);
	export function CResult_TxCreationKeysErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxCreationKeysErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_TxCreationKeysErrorZ CResult_TxCreationKeysErrorZ_err(enum LDKSecp256k1Error e);
	export function CResult_TxCreationKeysErrorZ_err(e: Secp256k1Error): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxCreationKeysErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_TxCreationKeysErrorZ_free(struct LDKCResult_TxCreationKeysErrorZ _res);
	export function CResult_TxCreationKeysErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxCreationKeysErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_TxCreationKeysErrorZ CResult_TxCreationKeysErrorZ_clone(const struct LDKCResult_TxCreationKeysErrorZ *NONNULL_PTR orig);
	export function CResult_TxCreationKeysErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxCreationKeysErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCOption_u32Z COption_u32Z_some(uint32_t o);
	export function COption_u32Z_some(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u32Z_some(o);
		return nativeResponseValue;
	}
	// struct LDKCOption_u32Z COption_u32Z_none(void);
	export function COption_u32Z_none(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u32Z_none();
		return nativeResponseValue;
	}
	// void COption_u32Z_free(struct LDKCOption_u32Z _res);
	export function COption_u32Z_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u32Z_free(_res);
		// debug statements here
	}
	// struct LDKCOption_u32Z COption_u32Z_clone(const struct LDKCOption_u32Z *NONNULL_PTR orig);
	export function COption_u32Z_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u32Z_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_HTLCOutputInCommitmentDecodeErrorZ CResult_HTLCOutputInCommitmentDecodeErrorZ_ok(struct LDKHTLCOutputInCommitment o);
	export function CResult_HTLCOutputInCommitmentDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HTLCOutputInCommitmentDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_HTLCOutputInCommitmentDecodeErrorZ CResult_HTLCOutputInCommitmentDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_HTLCOutputInCommitmentDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HTLCOutputInCommitmentDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_HTLCOutputInCommitmentDecodeErrorZ_free(struct LDKCResult_HTLCOutputInCommitmentDecodeErrorZ _res);
	export function CResult_HTLCOutputInCommitmentDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HTLCOutputInCommitmentDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_HTLCOutputInCommitmentDecodeErrorZ CResult_HTLCOutputInCommitmentDecodeErrorZ_clone(const struct LDKCResult_HTLCOutputInCommitmentDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_HTLCOutputInCommitmentDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HTLCOutputInCommitmentDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_ok(struct LDKCounterpartyChannelTransactionParameters o);
	export function CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_free(struct LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ _res);
	export function CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_clone(const struct LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelTransactionParametersDecodeErrorZ CResult_ChannelTransactionParametersDecodeErrorZ_ok(struct LDKChannelTransactionParameters o);
	export function CResult_ChannelTransactionParametersDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelTransactionParametersDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelTransactionParametersDecodeErrorZ CResult_ChannelTransactionParametersDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ChannelTransactionParametersDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelTransactionParametersDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ChannelTransactionParametersDecodeErrorZ_free(struct LDKCResult_ChannelTransactionParametersDecodeErrorZ _res);
	export function CResult_ChannelTransactionParametersDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelTransactionParametersDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelTransactionParametersDecodeErrorZ CResult_ChannelTransactionParametersDecodeErrorZ_clone(const struct LDKCResult_ChannelTransactionParametersDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ChannelTransactionParametersDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelTransactionParametersDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_SignatureZ_free(struct LDKCVec_SignatureZ _res);
	export function CVec_SignatureZ_free(_res: Uint8Array[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_SignatureZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_HolderCommitmentTransactionDecodeErrorZ CResult_HolderCommitmentTransactionDecodeErrorZ_ok(struct LDKHolderCommitmentTransaction o);
	export function CResult_HolderCommitmentTransactionDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HolderCommitmentTransactionDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_HolderCommitmentTransactionDecodeErrorZ CResult_HolderCommitmentTransactionDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_HolderCommitmentTransactionDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HolderCommitmentTransactionDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_HolderCommitmentTransactionDecodeErrorZ_free(struct LDKCResult_HolderCommitmentTransactionDecodeErrorZ _res);
	export function CResult_HolderCommitmentTransactionDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HolderCommitmentTransactionDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_HolderCommitmentTransactionDecodeErrorZ CResult_HolderCommitmentTransactionDecodeErrorZ_clone(const struct LDKCResult_HolderCommitmentTransactionDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_HolderCommitmentTransactionDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HolderCommitmentTransactionDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_BuiltCommitmentTransactionDecodeErrorZ CResult_BuiltCommitmentTransactionDecodeErrorZ_ok(struct LDKBuiltCommitmentTransaction o);
	export function CResult_BuiltCommitmentTransactionDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_BuiltCommitmentTransactionDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_BuiltCommitmentTransactionDecodeErrorZ CResult_BuiltCommitmentTransactionDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_BuiltCommitmentTransactionDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_BuiltCommitmentTransactionDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_BuiltCommitmentTransactionDecodeErrorZ_free(struct LDKCResult_BuiltCommitmentTransactionDecodeErrorZ _res);
	export function CResult_BuiltCommitmentTransactionDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_BuiltCommitmentTransactionDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_BuiltCommitmentTransactionDecodeErrorZ CResult_BuiltCommitmentTransactionDecodeErrorZ_clone(const struct LDKCResult_BuiltCommitmentTransactionDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_BuiltCommitmentTransactionDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_BuiltCommitmentTransactionDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_TrustedClosingTransactionNoneZ CResult_TrustedClosingTransactionNoneZ_ok(struct LDKTrustedClosingTransaction o);
	export function CResult_TrustedClosingTransactionNoneZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TrustedClosingTransactionNoneZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_TrustedClosingTransactionNoneZ CResult_TrustedClosingTransactionNoneZ_err(void);
	export function CResult_TrustedClosingTransactionNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TrustedClosingTransactionNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_TrustedClosingTransactionNoneZ_free(struct LDKCResult_TrustedClosingTransactionNoneZ _res);
	export function CResult_TrustedClosingTransactionNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TrustedClosingTransactionNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CommitmentTransactionDecodeErrorZ CResult_CommitmentTransactionDecodeErrorZ_ok(struct LDKCommitmentTransaction o);
	export function CResult_CommitmentTransactionDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CommitmentTransactionDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_CommitmentTransactionDecodeErrorZ CResult_CommitmentTransactionDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_CommitmentTransactionDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CommitmentTransactionDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_CommitmentTransactionDecodeErrorZ_free(struct LDKCResult_CommitmentTransactionDecodeErrorZ _res);
	export function CResult_CommitmentTransactionDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CommitmentTransactionDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CommitmentTransactionDecodeErrorZ CResult_CommitmentTransactionDecodeErrorZ_clone(const struct LDKCResult_CommitmentTransactionDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_CommitmentTransactionDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CommitmentTransactionDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_TrustedCommitmentTransactionNoneZ CResult_TrustedCommitmentTransactionNoneZ_ok(struct LDKTrustedCommitmentTransaction o);
	export function CResult_TrustedCommitmentTransactionNoneZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TrustedCommitmentTransactionNoneZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_TrustedCommitmentTransactionNoneZ CResult_TrustedCommitmentTransactionNoneZ_err(void);
	export function CResult_TrustedCommitmentTransactionNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TrustedCommitmentTransactionNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_TrustedCommitmentTransactionNoneZ_free(struct LDKCResult_TrustedCommitmentTransactionNoneZ _res);
	export function CResult_TrustedCommitmentTransactionNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TrustedCommitmentTransactionNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CVec_SignatureZNoneZ CResult_CVec_SignatureZNoneZ_ok(struct LDKCVec_SignatureZ o);
	export function CResult_CVec_SignatureZNoneZ_ok(o: Uint8Array[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_SignatureZNoneZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_CVec_SignatureZNoneZ CResult_CVec_SignatureZNoneZ_err(void);
	export function CResult_CVec_SignatureZNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_SignatureZNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_CVec_SignatureZNoneZ_free(struct LDKCResult_CVec_SignatureZNoneZ _res);
	export function CResult_CVec_SignatureZNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_SignatureZNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CVec_SignatureZNoneZ CResult_CVec_SignatureZNoneZ_clone(const struct LDKCResult_CVec_SignatureZNoneZ *NONNULL_PTR orig);
	export function CResult_CVec_SignatureZNoneZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_SignatureZNoneZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ShutdownScriptDecodeErrorZ CResult_ShutdownScriptDecodeErrorZ_ok(struct LDKShutdownScript o);
	export function CResult_ShutdownScriptDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownScriptDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ShutdownScriptDecodeErrorZ CResult_ShutdownScriptDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ShutdownScriptDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownScriptDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ShutdownScriptDecodeErrorZ_free(struct LDKCResult_ShutdownScriptDecodeErrorZ _res);
	export function CResult_ShutdownScriptDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownScriptDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ShutdownScriptDecodeErrorZ CResult_ShutdownScriptDecodeErrorZ_clone(const struct LDKCResult_ShutdownScriptDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ShutdownScriptDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownScriptDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ShutdownScriptInvalidShutdownScriptZ CResult_ShutdownScriptInvalidShutdownScriptZ_ok(struct LDKShutdownScript o);
	export function CResult_ShutdownScriptInvalidShutdownScriptZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownScriptInvalidShutdownScriptZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ShutdownScriptInvalidShutdownScriptZ CResult_ShutdownScriptInvalidShutdownScriptZ_err(struct LDKInvalidShutdownScript e);
	export function CResult_ShutdownScriptInvalidShutdownScriptZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownScriptInvalidShutdownScriptZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ShutdownScriptInvalidShutdownScriptZ_free(struct LDKCResult_ShutdownScriptInvalidShutdownScriptZ _res);
	export function CResult_ShutdownScriptInvalidShutdownScriptZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownScriptInvalidShutdownScriptZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ShutdownScriptInvalidShutdownScriptZ CResult_ShutdownScriptInvalidShutdownScriptZ_clone(const struct LDKCResult_ShutdownScriptInvalidShutdownScriptZ *NONNULL_PTR orig);
	export function CResult_ShutdownScriptInvalidShutdownScriptZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownScriptInvalidShutdownScriptZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneErrorZ CResult_NoneErrorZ_ok(void);
	export function CResult_NoneErrorZ_ok(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneErrorZ_ok();
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneErrorZ CResult_NoneErrorZ_err(enum LDKIOError e);
	export function CResult_NoneErrorZ_err(e: IOError): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NoneErrorZ_free(struct LDKCResult_NoneErrorZ _res);
	export function CResult_NoneErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NoneErrorZ CResult_NoneErrorZ_clone(const struct LDKCResult_NoneErrorZ *NONNULL_PTR orig);
	export function CResult_NoneErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_RouteHopDecodeErrorZ CResult_RouteHopDecodeErrorZ_ok(struct LDKRouteHop o);
	export function CResult_RouteHopDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHopDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_RouteHopDecodeErrorZ CResult_RouteHopDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_RouteHopDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHopDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_RouteHopDecodeErrorZ_free(struct LDKCResult_RouteHopDecodeErrorZ _res);
	export function CResult_RouteHopDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHopDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RouteHopDecodeErrorZ CResult_RouteHopDecodeErrorZ_clone(const struct LDKCResult_RouteHopDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_RouteHopDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHopDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_RouteHopZ_free(struct LDKCVec_RouteHopZ _res);
	export function CVec_RouteHopZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_RouteHopZ_free(_res);
		// debug statements here
	}
	// void CVec_CVec_RouteHopZZ_free(struct LDKCVec_CVec_RouteHopZZ _res);
	export function CVec_CVec_RouteHopZZ_free(_res: number[][]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_CVec_RouteHopZZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RouteDecodeErrorZ CResult_RouteDecodeErrorZ_ok(struct LDKRoute o);
	export function CResult_RouteDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_RouteDecodeErrorZ CResult_RouteDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_RouteDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_RouteDecodeErrorZ_free(struct LDKCResult_RouteDecodeErrorZ _res);
	export function CResult_RouteDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RouteDecodeErrorZ CResult_RouteDecodeErrorZ_clone(const struct LDKCResult_RouteDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_RouteDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_RouteParametersDecodeErrorZ CResult_RouteParametersDecodeErrorZ_ok(struct LDKRouteParameters o);
	export function CResult_RouteParametersDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteParametersDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_RouteParametersDecodeErrorZ CResult_RouteParametersDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_RouteParametersDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteParametersDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_RouteParametersDecodeErrorZ_free(struct LDKCResult_RouteParametersDecodeErrorZ _res);
	export function CResult_RouteParametersDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteParametersDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RouteParametersDecodeErrorZ CResult_RouteParametersDecodeErrorZ_clone(const struct LDKCResult_RouteParametersDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_RouteParametersDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteParametersDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_RouteHintZ_free(struct LDKCVec_RouteHintZ _res);
	export function CVec_RouteHintZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_RouteHintZ_free(_res);
		// debug statements here
	}
	// struct LDKCOption_u64Z COption_u64Z_some(uint64_t o);
	export function COption_u64Z_some(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u64Z_some(o);
		return nativeResponseValue;
	}
	// struct LDKCOption_u64Z COption_u64Z_none(void);
	export function COption_u64Z_none(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u64Z_none();
		return nativeResponseValue;
	}
	// void COption_u64Z_free(struct LDKCOption_u64Z _res);
	export function COption_u64Z_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u64Z_free(_res);
		// debug statements here
	}
	// struct LDKCOption_u64Z COption_u64Z_clone(const struct LDKCOption_u64Z *NONNULL_PTR orig);
	export function COption_u64Z_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u64Z_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_PayeeDecodeErrorZ CResult_PayeeDecodeErrorZ_ok(struct LDKPayee o);
	export function CResult_PayeeDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PayeeDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_PayeeDecodeErrorZ CResult_PayeeDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_PayeeDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PayeeDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_PayeeDecodeErrorZ_free(struct LDKCResult_PayeeDecodeErrorZ _res);
	export function CResult_PayeeDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PayeeDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PayeeDecodeErrorZ CResult_PayeeDecodeErrorZ_clone(const struct LDKCResult_PayeeDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_PayeeDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PayeeDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_RouteHintHopZ_free(struct LDKCVec_RouteHintHopZ _res);
	export function CVec_RouteHintHopZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_RouteHintHopZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RouteHintDecodeErrorZ CResult_RouteHintDecodeErrorZ_ok(struct LDKRouteHint o);
	export function CResult_RouteHintDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHintDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_RouteHintDecodeErrorZ CResult_RouteHintDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_RouteHintDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHintDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_RouteHintDecodeErrorZ_free(struct LDKCResult_RouteHintDecodeErrorZ _res);
	export function CResult_RouteHintDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHintDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RouteHintDecodeErrorZ CResult_RouteHintDecodeErrorZ_clone(const struct LDKCResult_RouteHintDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_RouteHintDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHintDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_RouteHintHopDecodeErrorZ CResult_RouteHintHopDecodeErrorZ_ok(struct LDKRouteHintHop o);
	export function CResult_RouteHintHopDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHintHopDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_RouteHintHopDecodeErrorZ CResult_RouteHintHopDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_RouteHintHopDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHintHopDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_RouteHintHopDecodeErrorZ_free(struct LDKCResult_RouteHintHopDecodeErrorZ _res);
	export function CResult_RouteHintHopDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHintHopDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RouteHintHopDecodeErrorZ CResult_RouteHintHopDecodeErrorZ_clone(const struct LDKCResult_RouteHintHopDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_RouteHintHopDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteHintHopDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_ChannelDetailsZ_free(struct LDKCVec_ChannelDetailsZ _res);
	export function CVec_ChannelDetailsZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_ChannelDetailsZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RouteLightningErrorZ CResult_RouteLightningErrorZ_ok(struct LDKRoute o);
	export function CResult_RouteLightningErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteLightningErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_RouteLightningErrorZ CResult_RouteLightningErrorZ_err(struct LDKLightningError e);
	export function CResult_RouteLightningErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteLightningErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_RouteLightningErrorZ_free(struct LDKCResult_RouteLightningErrorZ _res);
	export function CResult_RouteLightningErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteLightningErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RouteLightningErrorZ CResult_RouteLightningErrorZ_clone(const struct LDKCResult_RouteLightningErrorZ *NONNULL_PTR orig);
	export function CResult_RouteLightningErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RouteLightningErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_TxOutAccessErrorZ CResult_TxOutAccessErrorZ_ok(struct LDKTxOut o);
	export function CResult_TxOutAccessErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxOutAccessErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_TxOutAccessErrorZ CResult_TxOutAccessErrorZ_err(enum LDKAccessError e);
	export function CResult_TxOutAccessErrorZ_err(e: AccessError): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxOutAccessErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_TxOutAccessErrorZ_free(struct LDKCResult_TxOutAccessErrorZ _res);
	export function CResult_TxOutAccessErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxOutAccessErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_TxOutAccessErrorZ CResult_TxOutAccessErrorZ_clone(const struct LDKCResult_TxOutAccessErrorZ *NONNULL_PTR orig);
	export function CResult_TxOutAccessErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TxOutAccessErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_usizeTransactionZ C2Tuple_usizeTransactionZ_clone(const struct LDKC2Tuple_usizeTransactionZ *NONNULL_PTR orig);
	export function C2Tuple_usizeTransactionZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_usizeTransactionZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_usizeTransactionZ C2Tuple_usizeTransactionZ_new(uintptr_t a, struct LDKTransaction b);
	export function C2Tuple_usizeTransactionZ_new(a: number, b: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_usizeTransactionZ_new(a, encodeArray(b));
		return nativeResponseValue;
	}
	// void C2Tuple_usizeTransactionZ_free(struct LDKC2Tuple_usizeTransactionZ _res);
	export function C2Tuple_usizeTransactionZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_usizeTransactionZ_free(_res);
		// debug statements here
	}
	// void CVec_C2Tuple_usizeTransactionZZ_free(struct LDKCVec_C2Tuple_usizeTransactionZZ _res);
	export function CVec_C2Tuple_usizeTransactionZZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_C2Tuple_usizeTransactionZZ_free(_res);
		// debug statements here
	}
	// void CVec_TxidZ_free(struct LDKCVec_TxidZ _res);
	export function CVec_TxidZ_free(_res: Uint8Array[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_TxidZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NoneChannelMonitorUpdateErrZ CResult_NoneChannelMonitorUpdateErrZ_ok(void);
	export function CResult_NoneChannelMonitorUpdateErrZ_ok(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneChannelMonitorUpdateErrZ_ok();
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneChannelMonitorUpdateErrZ CResult_NoneChannelMonitorUpdateErrZ_err(enum LDKChannelMonitorUpdateErr e);
	export function CResult_NoneChannelMonitorUpdateErrZ_err(e: ChannelMonitorUpdateErr): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneChannelMonitorUpdateErrZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NoneChannelMonitorUpdateErrZ_free(struct LDKCResult_NoneChannelMonitorUpdateErrZ _res);
	export function CResult_NoneChannelMonitorUpdateErrZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneChannelMonitorUpdateErrZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NoneChannelMonitorUpdateErrZ CResult_NoneChannelMonitorUpdateErrZ_clone(const struct LDKCResult_NoneChannelMonitorUpdateErrZ *NONNULL_PTR orig);
	export function CResult_NoneChannelMonitorUpdateErrZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneChannelMonitorUpdateErrZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_MonitorEventZ_free(struct LDKCVec_MonitorEventZ _res);
	export function CVec_MonitorEventZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_MonitorEventZ_free(_res);
		// debug statements here
	}
	// struct LDKCOption_C2Tuple_usizeTransactionZZ COption_C2Tuple_usizeTransactionZZ_some(struct LDKC2Tuple_usizeTransactionZ o);
	export function COption_C2Tuple_usizeTransactionZZ_some(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_C2Tuple_usizeTransactionZZ_some(o);
		return nativeResponseValue;
	}
	// struct LDKCOption_C2Tuple_usizeTransactionZZ COption_C2Tuple_usizeTransactionZZ_none(void);
	export function COption_C2Tuple_usizeTransactionZZ_none(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_C2Tuple_usizeTransactionZZ_none();
		return nativeResponseValue;
	}
	// void COption_C2Tuple_usizeTransactionZZ_free(struct LDKCOption_C2Tuple_usizeTransactionZZ _res);
	export function COption_C2Tuple_usizeTransactionZZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_C2Tuple_usizeTransactionZZ_free(_res);
		// debug statements here
	}
	// struct LDKCOption_C2Tuple_usizeTransactionZZ COption_C2Tuple_usizeTransactionZZ_clone(const struct LDKCOption_C2Tuple_usizeTransactionZZ *NONNULL_PTR orig);
	export function COption_C2Tuple_usizeTransactionZZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_C2Tuple_usizeTransactionZZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCOption_NetworkUpdateZ COption_NetworkUpdateZ_some(struct LDKNetworkUpdate o);
	export function COption_NetworkUpdateZ_some(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_NetworkUpdateZ_some(o);
		return nativeResponseValue;
	}
	// struct LDKCOption_NetworkUpdateZ COption_NetworkUpdateZ_none(void);
	export function COption_NetworkUpdateZ_none(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_NetworkUpdateZ_none();
		return nativeResponseValue;
	}
	// void COption_NetworkUpdateZ_free(struct LDKCOption_NetworkUpdateZ _res);
	export function COption_NetworkUpdateZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_NetworkUpdateZ_free(_res);
		// debug statements here
	}
	// struct LDKCOption_NetworkUpdateZ COption_NetworkUpdateZ_clone(const struct LDKCOption_NetworkUpdateZ *NONNULL_PTR orig);
	export function COption_NetworkUpdateZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_NetworkUpdateZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_SpendableOutputDescriptorZ_free(struct LDKCVec_SpendableOutputDescriptorZ _res);
	export function CVec_SpendableOutputDescriptorZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_SpendableOutputDescriptorZ_free(_res);
		// debug statements here
	}
	// void CVec_MessageSendEventZ_free(struct LDKCVec_MessageSendEventZ _res);
	export function CVec_MessageSendEventZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_MessageSendEventZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_InitFeaturesDecodeErrorZ CResult_InitFeaturesDecodeErrorZ_ok(struct LDKInitFeatures o);
	export function CResult_InitFeaturesDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InitFeaturesDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_InitFeaturesDecodeErrorZ CResult_InitFeaturesDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_InitFeaturesDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InitFeaturesDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_InitFeaturesDecodeErrorZ_free(struct LDKCResult_InitFeaturesDecodeErrorZ _res);
	export function CResult_InitFeaturesDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InitFeaturesDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NodeFeaturesDecodeErrorZ CResult_NodeFeaturesDecodeErrorZ_ok(struct LDKNodeFeatures o);
	export function CResult_NodeFeaturesDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeFeaturesDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_NodeFeaturesDecodeErrorZ CResult_NodeFeaturesDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_NodeFeaturesDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeFeaturesDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NodeFeaturesDecodeErrorZ_free(struct LDKCResult_NodeFeaturesDecodeErrorZ _res);
	export function CResult_NodeFeaturesDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeFeaturesDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelFeaturesDecodeErrorZ CResult_ChannelFeaturesDecodeErrorZ_ok(struct LDKChannelFeatures o);
	export function CResult_ChannelFeaturesDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelFeaturesDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelFeaturesDecodeErrorZ CResult_ChannelFeaturesDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ChannelFeaturesDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelFeaturesDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ChannelFeaturesDecodeErrorZ_free(struct LDKCResult_ChannelFeaturesDecodeErrorZ _res);
	export function CResult_ChannelFeaturesDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelFeaturesDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_InvoiceFeaturesDecodeErrorZ CResult_InvoiceFeaturesDecodeErrorZ_ok(struct LDKInvoiceFeatures o);
	export function CResult_InvoiceFeaturesDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceFeaturesDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_InvoiceFeaturesDecodeErrorZ CResult_InvoiceFeaturesDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_InvoiceFeaturesDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceFeaturesDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_InvoiceFeaturesDecodeErrorZ_free(struct LDKCResult_InvoiceFeaturesDecodeErrorZ _res);
	export function CResult_InvoiceFeaturesDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceFeaturesDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ScoringParametersDecodeErrorZ CResult_ScoringParametersDecodeErrorZ_ok(struct LDKScoringParameters o);
	export function CResult_ScoringParametersDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ScoringParametersDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ScoringParametersDecodeErrorZ CResult_ScoringParametersDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ScoringParametersDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ScoringParametersDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ScoringParametersDecodeErrorZ_free(struct LDKCResult_ScoringParametersDecodeErrorZ _res);
	export function CResult_ScoringParametersDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ScoringParametersDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ScorerDecodeErrorZ CResult_ScorerDecodeErrorZ_ok(struct LDKScorer o);
	export function CResult_ScorerDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ScorerDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ScorerDecodeErrorZ CResult_ScorerDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ScorerDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ScorerDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ScorerDecodeErrorZ_free(struct LDKCResult_ScorerDecodeErrorZ _res);
	export function CResult_ScorerDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ScorerDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_ok(struct LDKDelayedPaymentOutputDescriptor o);
	export function CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_free(struct LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ _res);
	export function CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_clone(const struct LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ CResult_StaticPaymentOutputDescriptorDecodeErrorZ_ok(struct LDKStaticPaymentOutputDescriptor o);
	export function CResult_StaticPaymentOutputDescriptorDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ CResult_StaticPaymentOutputDescriptorDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_StaticPaymentOutputDescriptorDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_StaticPaymentOutputDescriptorDecodeErrorZ_free(struct LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ _res);
	export function CResult_StaticPaymentOutputDescriptorDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ CResult_StaticPaymentOutputDescriptorDecodeErrorZ_clone(const struct LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_StaticPaymentOutputDescriptorDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_SpendableOutputDescriptorDecodeErrorZ CResult_SpendableOutputDescriptorDecodeErrorZ_ok(struct LDKSpendableOutputDescriptor o);
	export function CResult_SpendableOutputDescriptorDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SpendableOutputDescriptorDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_SpendableOutputDescriptorDecodeErrorZ CResult_SpendableOutputDescriptorDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_SpendableOutputDescriptorDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SpendableOutputDescriptorDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_SpendableOutputDescriptorDecodeErrorZ_free(struct LDKCResult_SpendableOutputDescriptorDecodeErrorZ _res);
	export function CResult_SpendableOutputDescriptorDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SpendableOutputDescriptorDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_SpendableOutputDescriptorDecodeErrorZ CResult_SpendableOutputDescriptorDecodeErrorZ_clone(const struct LDKCResult_SpendableOutputDescriptorDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_SpendableOutputDescriptorDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SpendableOutputDescriptorDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneNoneZ CResult_NoneNoneZ_ok(void);
	export function CResult_NoneNoneZ_ok(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneNoneZ_ok();
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneNoneZ CResult_NoneNoneZ_err(void);
	export function CResult_NoneNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_NoneNoneZ_free(struct LDKCResult_NoneNoneZ _res);
	export function CResult_NoneNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NoneNoneZ CResult_NoneNoneZ_clone(const struct LDKCResult_NoneNoneZ *NONNULL_PTR orig);
	export function CResult_NoneNoneZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneNoneZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_SignatureCVec_SignatureZZ C2Tuple_SignatureCVec_SignatureZZ_clone(const struct LDKC2Tuple_SignatureCVec_SignatureZZ *NONNULL_PTR orig);
	export function C2Tuple_SignatureCVec_SignatureZZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_SignatureCVec_SignatureZZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_SignatureCVec_SignatureZZ C2Tuple_SignatureCVec_SignatureZZ_new(struct LDKSignature a, struct LDKCVec_SignatureZ b);
	export function C2Tuple_SignatureCVec_SignatureZZ_new(a: Uint8Array, b: Uint8Array[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_SignatureCVec_SignatureZZ_new(encodeArray(a), b);
		return nativeResponseValue;
	}
	// void C2Tuple_SignatureCVec_SignatureZZ_free(struct LDKC2Tuple_SignatureCVec_SignatureZZ _res);
	export function C2Tuple_SignatureCVec_SignatureZZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_SignatureCVec_SignatureZZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(struct LDKC2Tuple_SignatureCVec_SignatureZZ o);
	export function CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err(void);
	export function CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(struct LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ _res);
	export function CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_clone(const struct LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ *NONNULL_PTR orig);
	export function CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_SignatureNoneZ CResult_SignatureNoneZ_ok(struct LDKSignature o);
	export function CResult_SignatureNoneZ_ok(o: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignatureNoneZ_ok(encodeArray(o));
		return nativeResponseValue;
	}
	// struct LDKCResult_SignatureNoneZ CResult_SignatureNoneZ_err(void);
	export function CResult_SignatureNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignatureNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_SignatureNoneZ_free(struct LDKCResult_SignatureNoneZ _res);
	export function CResult_SignatureNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignatureNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_SignatureNoneZ CResult_SignatureNoneZ_clone(const struct LDKCResult_SignatureNoneZ *NONNULL_PTR orig);
	export function CResult_SignatureNoneZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignatureNoneZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_SignDecodeErrorZ CResult_SignDecodeErrorZ_ok(struct LDKSign o);
	export function CResult_SignDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_SignDecodeErrorZ CResult_SignDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_SignDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_SignDecodeErrorZ_free(struct LDKCResult_SignDecodeErrorZ _res);
	export function CResult_SignDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_SignDecodeErrorZ CResult_SignDecodeErrorZ_clone(const struct LDKCResult_SignDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_SignDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_u8Z_free(struct LDKCVec_u8Z _res);
	export function CVec_u8Z_free(_res: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_u8Z_free(encodeArray(_res));
		// debug statements here
	}
	// struct LDKCResult_RecoverableSignatureNoneZ CResult_RecoverableSignatureNoneZ_ok(struct LDKRecoverableSignature o);
	export function CResult_RecoverableSignatureNoneZ_ok(arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RecoverableSignatureNoneZ_ok(encodeArray(arg));
		return nativeResponseValue;
	}
	// struct LDKCResult_RecoverableSignatureNoneZ CResult_RecoverableSignatureNoneZ_err(void);
	export function CResult_RecoverableSignatureNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RecoverableSignatureNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_RecoverableSignatureNoneZ_free(struct LDKCResult_RecoverableSignatureNoneZ _res);
	export function CResult_RecoverableSignatureNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RecoverableSignatureNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RecoverableSignatureNoneZ CResult_RecoverableSignatureNoneZ_clone(const struct LDKCResult_RecoverableSignatureNoneZ *NONNULL_PTR orig);
	export function CResult_RecoverableSignatureNoneZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RecoverableSignatureNoneZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_CVec_u8ZZ_free(struct LDKCVec_CVec_u8ZZ _res);
	export function CVec_CVec_u8ZZ_free(_res: Uint8Array[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_CVec_u8ZZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CVec_CVec_u8ZZNoneZ CResult_CVec_CVec_u8ZZNoneZ_ok(struct LDKCVec_CVec_u8ZZ o);
	export function CResult_CVec_CVec_u8ZZNoneZ_ok(o: Uint8Array[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_CVec_u8ZZNoneZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_CVec_CVec_u8ZZNoneZ CResult_CVec_CVec_u8ZZNoneZ_err(void);
	export function CResult_CVec_CVec_u8ZZNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_CVec_u8ZZNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_CVec_CVec_u8ZZNoneZ_free(struct LDKCResult_CVec_CVec_u8ZZNoneZ _res);
	export function CResult_CVec_CVec_u8ZZNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_CVec_u8ZZNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CVec_CVec_u8ZZNoneZ CResult_CVec_CVec_u8ZZNoneZ_clone(const struct LDKCResult_CVec_CVec_u8ZZNoneZ *NONNULL_PTR orig);
	export function CResult_CVec_CVec_u8ZZNoneZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_CVec_u8ZZNoneZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_InMemorySignerDecodeErrorZ CResult_InMemorySignerDecodeErrorZ_ok(struct LDKInMemorySigner o);
	export function CResult_InMemorySignerDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InMemorySignerDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_InMemorySignerDecodeErrorZ CResult_InMemorySignerDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_InMemorySignerDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InMemorySignerDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_InMemorySignerDecodeErrorZ_free(struct LDKCResult_InMemorySignerDecodeErrorZ _res);
	export function CResult_InMemorySignerDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InMemorySignerDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_InMemorySignerDecodeErrorZ CResult_InMemorySignerDecodeErrorZ_clone(const struct LDKCResult_InMemorySignerDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_InMemorySignerDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InMemorySignerDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_TxOutZ_free(struct LDKCVec_TxOutZ _res);
	export function CVec_TxOutZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_TxOutZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_TransactionNoneZ CResult_TransactionNoneZ_ok(struct LDKTransaction o);
	export function CResult_TransactionNoneZ_ok(o: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TransactionNoneZ_ok(encodeArray(o));
		return nativeResponseValue;
	}
	// struct LDKCResult_TransactionNoneZ CResult_TransactionNoneZ_err(void);
	export function CResult_TransactionNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TransactionNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_TransactionNoneZ_free(struct LDKCResult_TransactionNoneZ _res);
	export function CResult_TransactionNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TransactionNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_TransactionNoneZ CResult_TransactionNoneZ_clone(const struct LDKCResult_TransactionNoneZ *NONNULL_PTR orig);
	export function CResult_TransactionNoneZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_TransactionNoneZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_BlockHashChannelMonitorZ C2Tuple_BlockHashChannelMonitorZ_clone(const struct LDKC2Tuple_BlockHashChannelMonitorZ *NONNULL_PTR orig);
	export function C2Tuple_BlockHashChannelMonitorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelMonitorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_BlockHashChannelMonitorZ C2Tuple_BlockHashChannelMonitorZ_new(struct LDKThirtyTwoBytes a, struct LDKChannelMonitor b);
	export function C2Tuple_BlockHashChannelMonitorZ_new(a: Uint8Array, b: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelMonitorZ_new(encodeArray(a), b);
		return nativeResponseValue;
	}
	// void C2Tuple_BlockHashChannelMonitorZ_free(struct LDKC2Tuple_BlockHashChannelMonitorZ _res);
	export function C2Tuple_BlockHashChannelMonitorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelMonitorZ_free(_res);
		// debug statements here
	}
	// void CVec_C2Tuple_BlockHashChannelMonitorZZ_free(struct LDKCVec_C2Tuple_BlockHashChannelMonitorZZ _res);
	export function CVec_C2Tuple_BlockHashChannelMonitorZZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_C2Tuple_BlockHashChannelMonitorZZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_ok(struct LDKCVec_C2Tuple_BlockHashChannelMonitorZZ o);
	export function CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_ok(o: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_err(enum LDKIOError e);
	export function CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_err(e: IOError): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_free(struct LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ _res);
	export function CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_clone(const struct LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ *NONNULL_PTR orig);
	export function CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCOption_u16Z COption_u16Z_some(uint16_t o);
	export function COption_u16Z_some(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u16Z_some(o);
		return nativeResponseValue;
	}
	// struct LDKCOption_u16Z COption_u16Z_none(void);
	export function COption_u16Z_none(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u16Z_none();
		return nativeResponseValue;
	}
	// void COption_u16Z_free(struct LDKCOption_u16Z _res);
	export function COption_u16Z_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u16Z_free(_res);
		// debug statements here
	}
	// struct LDKCOption_u16Z COption_u16Z_clone(const struct LDKCOption_u16Z *NONNULL_PTR orig);
	export function COption_u16Z_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_u16Z_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneAPIErrorZ CResult_NoneAPIErrorZ_ok(void);
	export function CResult_NoneAPIErrorZ_ok(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneAPIErrorZ_ok();
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneAPIErrorZ CResult_NoneAPIErrorZ_err(struct LDKAPIError e);
	export function CResult_NoneAPIErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneAPIErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NoneAPIErrorZ_free(struct LDKCResult_NoneAPIErrorZ _res);
	export function CResult_NoneAPIErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneAPIErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NoneAPIErrorZ CResult_NoneAPIErrorZ_clone(const struct LDKCResult_NoneAPIErrorZ *NONNULL_PTR orig);
	export function CResult_NoneAPIErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneAPIErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_CResult_NoneAPIErrorZZ_free(struct LDKCVec_CResult_NoneAPIErrorZZ _res);
	export function CVec_CResult_NoneAPIErrorZZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_CResult_NoneAPIErrorZZ_free(_res);
		// debug statements here
	}
	// void CVec_APIErrorZ_free(struct LDKCVec_APIErrorZ _res);
	export function CVec_APIErrorZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_APIErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult__u832APIErrorZ CResult__u832APIErrorZ_ok(struct LDKThirtyTwoBytes o);
	export function CResult__u832APIErrorZ_ok(o: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult__u832APIErrorZ_ok(encodeArray(o));
		return nativeResponseValue;
	}
	// struct LDKCResult__u832APIErrorZ CResult__u832APIErrorZ_err(struct LDKAPIError e);
	export function CResult__u832APIErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult__u832APIErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult__u832APIErrorZ_free(struct LDKCResult__u832APIErrorZ _res);
	export function CResult__u832APIErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult__u832APIErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult__u832APIErrorZ CResult__u832APIErrorZ_clone(const struct LDKCResult__u832APIErrorZ *NONNULL_PTR orig);
	export function CResult__u832APIErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult__u832APIErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_PaymentIdPaymentSendFailureZ CResult_PaymentIdPaymentSendFailureZ_ok(struct LDKThirtyTwoBytes o);
	export function CResult_PaymentIdPaymentSendFailureZ_ok(o: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentIdPaymentSendFailureZ_ok(encodeArray(o));
		return nativeResponseValue;
	}
	// struct LDKCResult_PaymentIdPaymentSendFailureZ CResult_PaymentIdPaymentSendFailureZ_err(struct LDKPaymentSendFailure e);
	export function CResult_PaymentIdPaymentSendFailureZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentIdPaymentSendFailureZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_PaymentIdPaymentSendFailureZ_free(struct LDKCResult_PaymentIdPaymentSendFailureZ _res);
	export function CResult_PaymentIdPaymentSendFailureZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentIdPaymentSendFailureZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PaymentIdPaymentSendFailureZ CResult_PaymentIdPaymentSendFailureZ_clone(const struct LDKCResult_PaymentIdPaymentSendFailureZ *NONNULL_PTR orig);
	export function CResult_PaymentIdPaymentSendFailureZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentIdPaymentSendFailureZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NonePaymentSendFailureZ CResult_NonePaymentSendFailureZ_ok(void);
	export function CResult_NonePaymentSendFailureZ_ok(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NonePaymentSendFailureZ_ok();
		return nativeResponseValue;
	}
	// struct LDKCResult_NonePaymentSendFailureZ CResult_NonePaymentSendFailureZ_err(struct LDKPaymentSendFailure e);
	export function CResult_NonePaymentSendFailureZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NonePaymentSendFailureZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NonePaymentSendFailureZ_free(struct LDKCResult_NonePaymentSendFailureZ _res);
	export function CResult_NonePaymentSendFailureZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NonePaymentSendFailureZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NonePaymentSendFailureZ CResult_NonePaymentSendFailureZ_clone(const struct LDKCResult_NonePaymentSendFailureZ *NONNULL_PTR orig);
	export function CResult_NonePaymentSendFailureZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NonePaymentSendFailureZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_PaymentHashPaymentIdZ C2Tuple_PaymentHashPaymentIdZ_clone(const struct LDKC2Tuple_PaymentHashPaymentIdZ *NONNULL_PTR orig);
	export function C2Tuple_PaymentHashPaymentIdZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PaymentHashPaymentIdZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_PaymentHashPaymentIdZ C2Tuple_PaymentHashPaymentIdZ_new(struct LDKThirtyTwoBytes a, struct LDKThirtyTwoBytes b);
	export function C2Tuple_PaymentHashPaymentIdZ_new(a: Uint8Array, b: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PaymentHashPaymentIdZ_new(encodeArray(a), encodeArray(b));
		return nativeResponseValue;
	}
	// void C2Tuple_PaymentHashPaymentIdZ_free(struct LDKC2Tuple_PaymentHashPaymentIdZ _res);
	export function C2Tuple_PaymentHashPaymentIdZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PaymentHashPaymentIdZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_ok(struct LDKC2Tuple_PaymentHashPaymentIdZ o);
	export function CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_err(struct LDKPaymentSendFailure e);
	export function CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_free(struct LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ _res);
	export function CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_clone(const struct LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ *NONNULL_PTR orig);
	export function CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_NetAddressZ_free(struct LDKCVec_NetAddressZ _res);
	export function CVec_NetAddressZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_NetAddressZ_free(_res);
		// debug statements here
	}
	// struct LDKC2Tuple_PaymentHashPaymentSecretZ C2Tuple_PaymentHashPaymentSecretZ_clone(const struct LDKC2Tuple_PaymentHashPaymentSecretZ *NONNULL_PTR orig);
	export function C2Tuple_PaymentHashPaymentSecretZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PaymentHashPaymentSecretZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_PaymentHashPaymentSecretZ C2Tuple_PaymentHashPaymentSecretZ_new(struct LDKThirtyTwoBytes a, struct LDKThirtyTwoBytes b);
	export function C2Tuple_PaymentHashPaymentSecretZ_new(a: Uint8Array, b: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PaymentHashPaymentSecretZ_new(encodeArray(a), encodeArray(b));
		return nativeResponseValue;
	}
	// void C2Tuple_PaymentHashPaymentSecretZ_free(struct LDKC2Tuple_PaymentHashPaymentSecretZ _res);
	export function C2Tuple_PaymentHashPaymentSecretZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PaymentHashPaymentSecretZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PaymentSecretAPIErrorZ CResult_PaymentSecretAPIErrorZ_ok(struct LDKThirtyTwoBytes o);
	export function CResult_PaymentSecretAPIErrorZ_ok(o: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentSecretAPIErrorZ_ok(encodeArray(o));
		return nativeResponseValue;
	}
	// struct LDKCResult_PaymentSecretAPIErrorZ CResult_PaymentSecretAPIErrorZ_err(struct LDKAPIError e);
	export function CResult_PaymentSecretAPIErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentSecretAPIErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_PaymentSecretAPIErrorZ_free(struct LDKCResult_PaymentSecretAPIErrorZ _res);
	export function CResult_PaymentSecretAPIErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentSecretAPIErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PaymentSecretAPIErrorZ CResult_PaymentSecretAPIErrorZ_clone(const struct LDKCResult_PaymentSecretAPIErrorZ *NONNULL_PTR orig);
	export function CResult_PaymentSecretAPIErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentSecretAPIErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_ChannelMonitorZ_free(struct LDKCVec_ChannelMonitorZ _res);
	export function CVec_ChannelMonitorZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_ChannelMonitorZ_free(_res);
		// debug statements here
	}
	// struct LDKC2Tuple_BlockHashChannelManagerZ C2Tuple_BlockHashChannelManagerZ_new(struct LDKThirtyTwoBytes a, struct LDKChannelManager b);
	export function C2Tuple_BlockHashChannelManagerZ_new(a: Uint8Array, b: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelManagerZ_new(encodeArray(a), b);
		return nativeResponseValue;
	}
	// void C2Tuple_BlockHashChannelManagerZ_free(struct LDKC2Tuple_BlockHashChannelManagerZ _res);
	export function C2Tuple_BlockHashChannelManagerZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelManagerZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(struct LDKC2Tuple_BlockHashChannelManagerZ o);
	export function CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(struct LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ _res);
	export function CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelConfigDecodeErrorZ CResult_ChannelConfigDecodeErrorZ_ok(struct LDKChannelConfig o);
	export function CResult_ChannelConfigDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelConfigDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelConfigDecodeErrorZ CResult_ChannelConfigDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ChannelConfigDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelConfigDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ChannelConfigDecodeErrorZ_free(struct LDKCResult_ChannelConfigDecodeErrorZ _res);
	export function CResult_ChannelConfigDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelConfigDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelConfigDecodeErrorZ CResult_ChannelConfigDecodeErrorZ_clone(const struct LDKCResult_ChannelConfigDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ChannelConfigDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelConfigDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_OutPointDecodeErrorZ CResult_OutPointDecodeErrorZ_ok(struct LDKOutPoint o);
	export function CResult_OutPointDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_OutPointDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_OutPointDecodeErrorZ CResult_OutPointDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_OutPointDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_OutPointDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_OutPointDecodeErrorZ_free(struct LDKCResult_OutPointDecodeErrorZ _res);
	export function CResult_OutPointDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_OutPointDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_OutPointDecodeErrorZ CResult_OutPointDecodeErrorZ_clone(const struct LDKCResult_OutPointDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_OutPointDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_OutPointDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCOption_TypeZ COption_TypeZ_some(struct LDKType o);
	export function COption_TypeZ_some(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_TypeZ_some(o);
		return nativeResponseValue;
	}
	// struct LDKCOption_TypeZ COption_TypeZ_none(void);
	export function COption_TypeZ_none(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_TypeZ_none();
		return nativeResponseValue;
	}
	// void COption_TypeZ_free(struct LDKCOption_TypeZ _res);
	export function COption_TypeZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_TypeZ_free(_res);
		// debug statements here
	}
	// struct LDKCOption_TypeZ COption_TypeZ_clone(const struct LDKCOption_TypeZ *NONNULL_PTR orig);
	export function COption_TypeZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_TypeZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_COption_TypeZDecodeErrorZ CResult_COption_TypeZDecodeErrorZ_ok(struct LDKCOption_TypeZ o);
	export function CResult_COption_TypeZDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_COption_TypeZDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_COption_TypeZDecodeErrorZ CResult_COption_TypeZDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_COption_TypeZDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_COption_TypeZDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_COption_TypeZDecodeErrorZ_free(struct LDKCResult_COption_TypeZDecodeErrorZ _res);
	export function CResult_COption_TypeZDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_COption_TypeZDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_COption_TypeZDecodeErrorZ CResult_COption_TypeZDecodeErrorZ_clone(const struct LDKCResult_COption_TypeZDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_COption_TypeZDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_COption_TypeZDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_PaymentIdPaymentErrorZ CResult_PaymentIdPaymentErrorZ_ok(struct LDKThirtyTwoBytes o);
	export function CResult_PaymentIdPaymentErrorZ_ok(o: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentIdPaymentErrorZ_ok(encodeArray(o));
		return nativeResponseValue;
	}
	// struct LDKCResult_PaymentIdPaymentErrorZ CResult_PaymentIdPaymentErrorZ_err(struct LDKPaymentError e);
	export function CResult_PaymentIdPaymentErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentIdPaymentErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_PaymentIdPaymentErrorZ_free(struct LDKCResult_PaymentIdPaymentErrorZ _res);
	export function CResult_PaymentIdPaymentErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentIdPaymentErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PaymentIdPaymentErrorZ CResult_PaymentIdPaymentErrorZ_clone(const struct LDKCResult_PaymentIdPaymentErrorZ *NONNULL_PTR orig);
	export function CResult_PaymentIdPaymentErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PaymentIdPaymentErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_SiPrefixNoneZ CResult_SiPrefixNoneZ_ok(enum LDKSiPrefix o);
	export function CResult_SiPrefixNoneZ_ok(o: SiPrefix): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SiPrefixNoneZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_SiPrefixNoneZ CResult_SiPrefixNoneZ_err(void);
	export function CResult_SiPrefixNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SiPrefixNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_SiPrefixNoneZ_free(struct LDKCResult_SiPrefixNoneZ _res);
	export function CResult_SiPrefixNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SiPrefixNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_SiPrefixNoneZ CResult_SiPrefixNoneZ_clone(const struct LDKCResult_SiPrefixNoneZ *NONNULL_PTR orig);
	export function CResult_SiPrefixNoneZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SiPrefixNoneZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_InvoiceNoneZ CResult_InvoiceNoneZ_ok(struct LDKInvoice o);
	export function CResult_InvoiceNoneZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceNoneZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_InvoiceNoneZ CResult_InvoiceNoneZ_err(void);
	export function CResult_InvoiceNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_InvoiceNoneZ_free(struct LDKCResult_InvoiceNoneZ _res);
	export function CResult_InvoiceNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_InvoiceNoneZ CResult_InvoiceNoneZ_clone(const struct LDKCResult_InvoiceNoneZ *NONNULL_PTR orig);
	export function CResult_InvoiceNoneZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceNoneZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_SignedRawInvoiceNoneZ CResult_SignedRawInvoiceNoneZ_ok(struct LDKSignedRawInvoice o);
	export function CResult_SignedRawInvoiceNoneZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignedRawInvoiceNoneZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_SignedRawInvoiceNoneZ CResult_SignedRawInvoiceNoneZ_err(void);
	export function CResult_SignedRawInvoiceNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignedRawInvoiceNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_SignedRawInvoiceNoneZ_free(struct LDKCResult_SignedRawInvoiceNoneZ _res);
	export function CResult_SignedRawInvoiceNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignedRawInvoiceNoneZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_SignedRawInvoiceNoneZ CResult_SignedRawInvoiceNoneZ_clone(const struct LDKCResult_SignedRawInvoiceNoneZ *NONNULL_PTR orig);
	export function CResult_SignedRawInvoiceNoneZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_SignedRawInvoiceNoneZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ C3Tuple_RawInvoice_u832InvoiceSignatureZ_clone(const struct LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ *NONNULL_PTR orig);
	export function C3Tuple_RawInvoice_u832InvoiceSignatureZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_RawInvoice_u832InvoiceSignatureZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ C3Tuple_RawInvoice_u832InvoiceSignatureZ_new(struct LDKRawInvoice a, struct LDKThirtyTwoBytes b, struct LDKInvoiceSignature c);
	export function C3Tuple_RawInvoice_u832InvoiceSignatureZ_new(a: number, b: Uint8Array, c: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_RawInvoice_u832InvoiceSignatureZ_new(a, encodeArray(b), c);
		return nativeResponseValue;
	}
	// void C3Tuple_RawInvoice_u832InvoiceSignatureZ_free(struct LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ _res);
	export function C3Tuple_RawInvoice_u832InvoiceSignatureZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_RawInvoice_u832InvoiceSignatureZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PayeePubKeyErrorZ CResult_PayeePubKeyErrorZ_ok(struct LDKPayeePubKey o);
	export function CResult_PayeePubKeyErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PayeePubKeyErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_PayeePubKeyErrorZ CResult_PayeePubKeyErrorZ_err(enum LDKSecp256k1Error e);
	export function CResult_PayeePubKeyErrorZ_err(e: Secp256k1Error): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PayeePubKeyErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_PayeePubKeyErrorZ_free(struct LDKCResult_PayeePubKeyErrorZ _res);
	export function CResult_PayeePubKeyErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PayeePubKeyErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PayeePubKeyErrorZ CResult_PayeePubKeyErrorZ_clone(const struct LDKCResult_PayeePubKeyErrorZ *NONNULL_PTR orig);
	export function CResult_PayeePubKeyErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PayeePubKeyErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_PrivateRouteZ_free(struct LDKCVec_PrivateRouteZ _res);
	export function CVec_PrivateRouteZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_PrivateRouteZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PositiveTimestampCreationErrorZ CResult_PositiveTimestampCreationErrorZ_ok(struct LDKPositiveTimestamp o);
	export function CResult_PositiveTimestampCreationErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PositiveTimestampCreationErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_PositiveTimestampCreationErrorZ CResult_PositiveTimestampCreationErrorZ_err(enum LDKCreationError e);
	export function CResult_PositiveTimestampCreationErrorZ_err(e: CreationError): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PositiveTimestampCreationErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_PositiveTimestampCreationErrorZ_free(struct LDKCResult_PositiveTimestampCreationErrorZ _res);
	export function CResult_PositiveTimestampCreationErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PositiveTimestampCreationErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PositiveTimestampCreationErrorZ CResult_PositiveTimestampCreationErrorZ_clone(const struct LDKCResult_PositiveTimestampCreationErrorZ *NONNULL_PTR orig);
	export function CResult_PositiveTimestampCreationErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PositiveTimestampCreationErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneSemanticErrorZ CResult_NoneSemanticErrorZ_ok(void);
	export function CResult_NoneSemanticErrorZ_ok(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneSemanticErrorZ_ok();
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneSemanticErrorZ CResult_NoneSemanticErrorZ_err(enum LDKSemanticError e);
	export function CResult_NoneSemanticErrorZ_err(e: SemanticError): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneSemanticErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NoneSemanticErrorZ_free(struct LDKCResult_NoneSemanticErrorZ _res);
	export function CResult_NoneSemanticErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneSemanticErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NoneSemanticErrorZ CResult_NoneSemanticErrorZ_clone(const struct LDKCResult_NoneSemanticErrorZ *NONNULL_PTR orig);
	export function CResult_NoneSemanticErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneSemanticErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_InvoiceSemanticErrorZ CResult_InvoiceSemanticErrorZ_ok(struct LDKInvoice o);
	export function CResult_InvoiceSemanticErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceSemanticErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_InvoiceSemanticErrorZ CResult_InvoiceSemanticErrorZ_err(enum LDKSemanticError e);
	export function CResult_InvoiceSemanticErrorZ_err(e: SemanticError): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceSemanticErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_InvoiceSemanticErrorZ_free(struct LDKCResult_InvoiceSemanticErrorZ _res);
	export function CResult_InvoiceSemanticErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceSemanticErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_InvoiceSemanticErrorZ CResult_InvoiceSemanticErrorZ_clone(const struct LDKCResult_InvoiceSemanticErrorZ *NONNULL_PTR orig);
	export function CResult_InvoiceSemanticErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceSemanticErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_DescriptionCreationErrorZ CResult_DescriptionCreationErrorZ_ok(struct LDKDescription o);
	export function CResult_DescriptionCreationErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DescriptionCreationErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_DescriptionCreationErrorZ CResult_DescriptionCreationErrorZ_err(enum LDKCreationError e);
	export function CResult_DescriptionCreationErrorZ_err(e: CreationError): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DescriptionCreationErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_DescriptionCreationErrorZ_free(struct LDKCResult_DescriptionCreationErrorZ _res);
	export function CResult_DescriptionCreationErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DescriptionCreationErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_DescriptionCreationErrorZ CResult_DescriptionCreationErrorZ_clone(const struct LDKCResult_DescriptionCreationErrorZ *NONNULL_PTR orig);
	export function CResult_DescriptionCreationErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DescriptionCreationErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ExpiryTimeCreationErrorZ CResult_ExpiryTimeCreationErrorZ_ok(struct LDKExpiryTime o);
	export function CResult_ExpiryTimeCreationErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ExpiryTimeCreationErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ExpiryTimeCreationErrorZ CResult_ExpiryTimeCreationErrorZ_err(enum LDKCreationError e);
	export function CResult_ExpiryTimeCreationErrorZ_err(e: CreationError): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ExpiryTimeCreationErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ExpiryTimeCreationErrorZ_free(struct LDKCResult_ExpiryTimeCreationErrorZ _res);
	export function CResult_ExpiryTimeCreationErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ExpiryTimeCreationErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ExpiryTimeCreationErrorZ CResult_ExpiryTimeCreationErrorZ_clone(const struct LDKCResult_ExpiryTimeCreationErrorZ *NONNULL_PTR orig);
	export function CResult_ExpiryTimeCreationErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ExpiryTimeCreationErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_PrivateRouteCreationErrorZ CResult_PrivateRouteCreationErrorZ_ok(struct LDKPrivateRoute o);
	export function CResult_PrivateRouteCreationErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PrivateRouteCreationErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_PrivateRouteCreationErrorZ CResult_PrivateRouteCreationErrorZ_err(enum LDKCreationError e);
	export function CResult_PrivateRouteCreationErrorZ_err(e: CreationError): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PrivateRouteCreationErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_PrivateRouteCreationErrorZ_free(struct LDKCResult_PrivateRouteCreationErrorZ _res);
	export function CResult_PrivateRouteCreationErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PrivateRouteCreationErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PrivateRouteCreationErrorZ CResult_PrivateRouteCreationErrorZ_clone(const struct LDKCResult_PrivateRouteCreationErrorZ *NONNULL_PTR orig);
	export function CResult_PrivateRouteCreationErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PrivateRouteCreationErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_StringErrorZ CResult_StringErrorZ_ok(struct LDKStr o);
	export function CResult_StringErrorZ_ok(o: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_StringErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_StringErrorZ CResult_StringErrorZ_err(enum LDKSecp256k1Error e);
	export function CResult_StringErrorZ_err(e: Secp256k1Error): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_StringErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_StringErrorZ_free(struct LDKCResult_StringErrorZ _res);
	export function CResult_StringErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_StringErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelMonitorUpdateDecodeErrorZ CResult_ChannelMonitorUpdateDecodeErrorZ_ok(struct LDKChannelMonitorUpdate o);
	export function CResult_ChannelMonitorUpdateDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelMonitorUpdateDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelMonitorUpdateDecodeErrorZ CResult_ChannelMonitorUpdateDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ChannelMonitorUpdateDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelMonitorUpdateDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ChannelMonitorUpdateDecodeErrorZ_free(struct LDKCResult_ChannelMonitorUpdateDecodeErrorZ _res);
	export function CResult_ChannelMonitorUpdateDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelMonitorUpdateDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelMonitorUpdateDecodeErrorZ CResult_ChannelMonitorUpdateDecodeErrorZ_clone(const struct LDKCResult_ChannelMonitorUpdateDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ChannelMonitorUpdateDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelMonitorUpdateDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_HTLCUpdateDecodeErrorZ CResult_HTLCUpdateDecodeErrorZ_ok(struct LDKHTLCUpdate o);
	export function CResult_HTLCUpdateDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HTLCUpdateDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_HTLCUpdateDecodeErrorZ CResult_HTLCUpdateDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_HTLCUpdateDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HTLCUpdateDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_HTLCUpdateDecodeErrorZ_free(struct LDKCResult_HTLCUpdateDecodeErrorZ _res);
	export function CResult_HTLCUpdateDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HTLCUpdateDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_HTLCUpdateDecodeErrorZ CResult_HTLCUpdateDecodeErrorZ_clone(const struct LDKCResult_HTLCUpdateDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_HTLCUpdateDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_HTLCUpdateDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneMonitorUpdateErrorZ CResult_NoneMonitorUpdateErrorZ_ok(void);
	export function CResult_NoneMonitorUpdateErrorZ_ok(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneMonitorUpdateErrorZ_ok();
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneMonitorUpdateErrorZ CResult_NoneMonitorUpdateErrorZ_err(struct LDKMonitorUpdateError e);
	export function CResult_NoneMonitorUpdateErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneMonitorUpdateErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NoneMonitorUpdateErrorZ_free(struct LDKCResult_NoneMonitorUpdateErrorZ _res);
	export function CResult_NoneMonitorUpdateErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneMonitorUpdateErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NoneMonitorUpdateErrorZ CResult_NoneMonitorUpdateErrorZ_clone(const struct LDKCResult_NoneMonitorUpdateErrorZ *NONNULL_PTR orig);
	export function CResult_NoneMonitorUpdateErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneMonitorUpdateErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_OutPointScriptZ C2Tuple_OutPointScriptZ_clone(const struct LDKC2Tuple_OutPointScriptZ *NONNULL_PTR orig);
	export function C2Tuple_OutPointScriptZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_OutPointScriptZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_OutPointScriptZ C2Tuple_OutPointScriptZ_new(struct LDKOutPoint a, struct LDKCVec_u8Z b);
	export function C2Tuple_OutPointScriptZ_new(a: number, b: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_OutPointScriptZ_new(a, encodeArray(b));
		return nativeResponseValue;
	}
	// void C2Tuple_OutPointScriptZ_free(struct LDKC2Tuple_OutPointScriptZ _res);
	export function C2Tuple_OutPointScriptZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_OutPointScriptZ_free(_res);
		// debug statements here
	}
	// struct LDKC2Tuple_u32ScriptZ C2Tuple_u32ScriptZ_clone(const struct LDKC2Tuple_u32ScriptZ *NONNULL_PTR orig);
	export function C2Tuple_u32ScriptZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_u32ScriptZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_u32ScriptZ C2Tuple_u32ScriptZ_new(uint32_t a, struct LDKCVec_u8Z b);
	export function C2Tuple_u32ScriptZ_new(a: number, b: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_u32ScriptZ_new(a, encodeArray(b));
		return nativeResponseValue;
	}
	// void C2Tuple_u32ScriptZ_free(struct LDKC2Tuple_u32ScriptZ _res);
	export function C2Tuple_u32ScriptZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_u32ScriptZ_free(_res);
		// debug statements here
	}
	// void CVec_C2Tuple_u32ScriptZZ_free(struct LDKCVec_C2Tuple_u32ScriptZZ _res);
	export function CVec_C2Tuple_u32ScriptZZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_C2Tuple_u32ScriptZZ_free(_res);
		// debug statements here
	}
	// struct LDKC2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_clone(const struct LDKC2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ *NONNULL_PTR orig);
	export function C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_new(struct LDKThirtyTwoBytes a, struct LDKCVec_C2Tuple_u32ScriptZZ b);
	export function C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_new(a: Uint8Array, b: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_new(encodeArray(a), b);
		return nativeResponseValue;
	}
	// void C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_free(struct LDKC2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ _res);
	export function C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_free(_res);
		// debug statements here
	}
	// void CVec_C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZZ_free(struct LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZZ _res);
	export function CVec_C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZZ_free(_res);
		// debug statements here
	}
	// void CVec_EventZ_free(struct LDKCVec_EventZ _res);
	export function CVec_EventZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_EventZ_free(_res);
		// debug statements here
	}
	// void CVec_TransactionZ_free(struct LDKCVec_TransactionZ _res);
	export function CVec_TransactionZ_free(_res: Uint8Array[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_TransactionZ_free(_res);
		// debug statements here
	}
	// struct LDKC2Tuple_u32TxOutZ C2Tuple_u32TxOutZ_clone(const struct LDKC2Tuple_u32TxOutZ *NONNULL_PTR orig);
	export function C2Tuple_u32TxOutZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_u32TxOutZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_u32TxOutZ C2Tuple_u32TxOutZ_new(uint32_t a, struct LDKTxOut b);
	export function C2Tuple_u32TxOutZ_new(a: number, b: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_u32TxOutZ_new(a, b);
		return nativeResponseValue;
	}
	// void C2Tuple_u32TxOutZ_free(struct LDKC2Tuple_u32TxOutZ _res);
	export function C2Tuple_u32TxOutZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_u32TxOutZ_free(_res);
		// debug statements here
	}
	// void CVec_C2Tuple_u32TxOutZZ_free(struct LDKCVec_C2Tuple_u32TxOutZZ _res);
	export function CVec_C2Tuple_u32TxOutZZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_C2Tuple_u32TxOutZZ_free(_res);
		// debug statements here
	}
	// struct LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_clone(const struct LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ *NONNULL_PTR orig);
	export function C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(struct LDKThirtyTwoBytes a, struct LDKCVec_C2Tuple_u32TxOutZZ b);
	export function C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(a: Uint8Array, b: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(encodeArray(a), b);
		return nativeResponseValue;
	}
	// void C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(struct LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ _res);
	export function C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(_res);
		// debug statements here
	}
	// void CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free(struct LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ _res);
	export function CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free(_res);
		// debug statements here
	}
	// void CVec_BalanceZ_free(struct LDKCVec_BalanceZ _res);
	export function CVec_BalanceZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_BalanceZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(struct LDKC2Tuple_BlockHashChannelMonitorZ o);
	export function CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(struct LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ _res);
	export function CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_clone(const struct LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneLightningErrorZ CResult_NoneLightningErrorZ_ok(void);
	export function CResult_NoneLightningErrorZ_ok(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneLightningErrorZ_ok();
		return nativeResponseValue;
	}
	// struct LDKCResult_NoneLightningErrorZ CResult_NoneLightningErrorZ_err(struct LDKLightningError e);
	export function CResult_NoneLightningErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneLightningErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NoneLightningErrorZ_free(struct LDKCResult_NoneLightningErrorZ _res);
	export function CResult_NoneLightningErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneLightningErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NoneLightningErrorZ CResult_NoneLightningErrorZ_clone(const struct LDKCResult_NoneLightningErrorZ *NONNULL_PTR orig);
	export function CResult_NoneLightningErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NoneLightningErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_PublicKeyTypeZ C2Tuple_PublicKeyTypeZ_clone(const struct LDKC2Tuple_PublicKeyTypeZ *NONNULL_PTR orig);
	export function C2Tuple_PublicKeyTypeZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PublicKeyTypeZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC2Tuple_PublicKeyTypeZ C2Tuple_PublicKeyTypeZ_new(struct LDKPublicKey a, struct LDKType b);
	export function C2Tuple_PublicKeyTypeZ_new(a: Uint8Array, b: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PublicKeyTypeZ_new(encodeArray(a), b);
		return nativeResponseValue;
	}
	// void C2Tuple_PublicKeyTypeZ_free(struct LDKC2Tuple_PublicKeyTypeZ _res);
	export function C2Tuple_PublicKeyTypeZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_PublicKeyTypeZ_free(_res);
		// debug statements here
	}
	// void CVec_C2Tuple_PublicKeyTypeZZ_free(struct LDKCVec_C2Tuple_PublicKeyTypeZZ _res);
	export function CVec_C2Tuple_PublicKeyTypeZZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_C2Tuple_PublicKeyTypeZZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_boolLightningErrorZ CResult_boolLightningErrorZ_ok(bool o);
	export function CResult_boolLightningErrorZ_ok(o: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_boolLightningErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_boolLightningErrorZ CResult_boolLightningErrorZ_err(struct LDKLightningError e);
	export function CResult_boolLightningErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_boolLightningErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_boolLightningErrorZ_free(struct LDKCResult_boolLightningErrorZ _res);
	export function CResult_boolLightningErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_boolLightningErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_boolLightningErrorZ CResult_boolLightningErrorZ_clone(const struct LDKCResult_boolLightningErrorZ *NONNULL_PTR orig);
	export function CResult_boolLightningErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_boolLightningErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone(const struct LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *NONNULL_PTR orig);
	export function C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(struct LDKChannelAnnouncement a, struct LDKChannelUpdate b, struct LDKChannelUpdate c);
	export function C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a: number, b: number, c: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a, b, c);
		return nativeResponseValue;
	}
	// void C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(struct LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ _res);
	export function C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(_res);
		// debug statements here
	}
	// void CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(struct LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ _res);
	export function CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(_res);
		// debug statements here
	}
	// void CVec_NodeAnnouncementZ_free(struct LDKCVec_NodeAnnouncementZ _res);
	export function CVec_NodeAnnouncementZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_NodeAnnouncementZ_free(_res);
		// debug statements here
	}
	// void CVec_PublicKeyZ_free(struct LDKCVec_PublicKeyZ _res);
	export function CVec_PublicKeyZ_free(_res: Uint8Array[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_PublicKeyZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CVec_u8ZPeerHandleErrorZ CResult_CVec_u8ZPeerHandleErrorZ_ok(struct LDKCVec_u8Z o);
	export function CResult_CVec_u8ZPeerHandleErrorZ_ok(o: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_u8ZPeerHandleErrorZ_ok(encodeArray(o));
		return nativeResponseValue;
	}
	// struct LDKCResult_CVec_u8ZPeerHandleErrorZ CResult_CVec_u8ZPeerHandleErrorZ_err(struct LDKPeerHandleError e);
	export function CResult_CVec_u8ZPeerHandleErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_u8ZPeerHandleErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_CVec_u8ZPeerHandleErrorZ_free(struct LDKCResult_CVec_u8ZPeerHandleErrorZ _res);
	export function CResult_CVec_u8ZPeerHandleErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_u8ZPeerHandleErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CVec_u8ZPeerHandleErrorZ CResult_CVec_u8ZPeerHandleErrorZ_clone(const struct LDKCResult_CVec_u8ZPeerHandleErrorZ *NONNULL_PTR orig);
	export function CResult_CVec_u8ZPeerHandleErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CVec_u8ZPeerHandleErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NonePeerHandleErrorZ CResult_NonePeerHandleErrorZ_ok(void);
	export function CResult_NonePeerHandleErrorZ_ok(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NonePeerHandleErrorZ_ok();
		return nativeResponseValue;
	}
	// struct LDKCResult_NonePeerHandleErrorZ CResult_NonePeerHandleErrorZ_err(struct LDKPeerHandleError e);
	export function CResult_NonePeerHandleErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NonePeerHandleErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NonePeerHandleErrorZ_free(struct LDKCResult_NonePeerHandleErrorZ _res);
	export function CResult_NonePeerHandleErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NonePeerHandleErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NonePeerHandleErrorZ CResult_NonePeerHandleErrorZ_clone(const struct LDKCResult_NonePeerHandleErrorZ *NONNULL_PTR orig);
	export function CResult_NonePeerHandleErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NonePeerHandleErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_boolPeerHandleErrorZ CResult_boolPeerHandleErrorZ_ok(bool o);
	export function CResult_boolPeerHandleErrorZ_ok(o: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_boolPeerHandleErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_boolPeerHandleErrorZ CResult_boolPeerHandleErrorZ_err(struct LDKPeerHandleError e);
	export function CResult_boolPeerHandleErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_boolPeerHandleErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_boolPeerHandleErrorZ_free(struct LDKCResult_boolPeerHandleErrorZ _res);
	export function CResult_boolPeerHandleErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_boolPeerHandleErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_boolPeerHandleErrorZ CResult_boolPeerHandleErrorZ_clone(const struct LDKCResult_boolPeerHandleErrorZ *NONNULL_PTR orig);
	export function CResult_boolPeerHandleErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_boolPeerHandleErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NodeIdDecodeErrorZ CResult_NodeIdDecodeErrorZ_ok(struct LDKNodeId o);
	export function CResult_NodeIdDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeIdDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_NodeIdDecodeErrorZ CResult_NodeIdDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_NodeIdDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeIdDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NodeIdDecodeErrorZ_free(struct LDKCResult_NodeIdDecodeErrorZ _res);
	export function CResult_NodeIdDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeIdDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NodeIdDecodeErrorZ CResult_NodeIdDecodeErrorZ_clone(const struct LDKCResult_NodeIdDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_NodeIdDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeIdDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCOption_AccessZ COption_AccessZ_some(struct LDKAccess o);
	export function COption_AccessZ_some(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_AccessZ_some(o);
		return nativeResponseValue;
	}
	// struct LDKCOption_AccessZ COption_AccessZ_none(void);
	export function COption_AccessZ_none(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_AccessZ_none();
		return nativeResponseValue;
	}
	// void COption_AccessZ_free(struct LDKCOption_AccessZ _res);
	export function COption_AccessZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_AccessZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_DirectionalChannelInfoDecodeErrorZ CResult_DirectionalChannelInfoDecodeErrorZ_ok(struct LDKDirectionalChannelInfo o);
	export function CResult_DirectionalChannelInfoDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DirectionalChannelInfoDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_DirectionalChannelInfoDecodeErrorZ CResult_DirectionalChannelInfoDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_DirectionalChannelInfoDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DirectionalChannelInfoDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_DirectionalChannelInfoDecodeErrorZ_free(struct LDKCResult_DirectionalChannelInfoDecodeErrorZ _res);
	export function CResult_DirectionalChannelInfoDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DirectionalChannelInfoDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_DirectionalChannelInfoDecodeErrorZ CResult_DirectionalChannelInfoDecodeErrorZ_clone(const struct LDKCResult_DirectionalChannelInfoDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_DirectionalChannelInfoDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_DirectionalChannelInfoDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelInfoDecodeErrorZ CResult_ChannelInfoDecodeErrorZ_ok(struct LDKChannelInfo o);
	export function CResult_ChannelInfoDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelInfoDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelInfoDecodeErrorZ CResult_ChannelInfoDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ChannelInfoDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelInfoDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ChannelInfoDecodeErrorZ_free(struct LDKCResult_ChannelInfoDecodeErrorZ _res);
	export function CResult_ChannelInfoDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelInfoDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelInfoDecodeErrorZ CResult_ChannelInfoDecodeErrorZ_clone(const struct LDKCResult_ChannelInfoDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ChannelInfoDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelInfoDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_RoutingFeesDecodeErrorZ CResult_RoutingFeesDecodeErrorZ_ok(struct LDKRoutingFees o);
	export function CResult_RoutingFeesDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RoutingFeesDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_RoutingFeesDecodeErrorZ CResult_RoutingFeesDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_RoutingFeesDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RoutingFeesDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_RoutingFeesDecodeErrorZ_free(struct LDKCResult_RoutingFeesDecodeErrorZ _res);
	export function CResult_RoutingFeesDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RoutingFeesDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RoutingFeesDecodeErrorZ CResult_RoutingFeesDecodeErrorZ_clone(const struct LDKCResult_RoutingFeesDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_RoutingFeesDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RoutingFeesDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NodeAnnouncementInfoDecodeErrorZ CResult_NodeAnnouncementInfoDecodeErrorZ_ok(struct LDKNodeAnnouncementInfo o);
	export function CResult_NodeAnnouncementInfoDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeAnnouncementInfoDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_NodeAnnouncementInfoDecodeErrorZ CResult_NodeAnnouncementInfoDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_NodeAnnouncementInfoDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeAnnouncementInfoDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NodeAnnouncementInfoDecodeErrorZ_free(struct LDKCResult_NodeAnnouncementInfoDecodeErrorZ _res);
	export function CResult_NodeAnnouncementInfoDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeAnnouncementInfoDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NodeAnnouncementInfoDecodeErrorZ CResult_NodeAnnouncementInfoDecodeErrorZ_clone(const struct LDKCResult_NodeAnnouncementInfoDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_NodeAnnouncementInfoDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeAnnouncementInfoDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_u64Z_free(struct LDKCVec_u64Z _res);
	export function CVec_u64Z_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_u64Z_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NodeInfoDecodeErrorZ CResult_NodeInfoDecodeErrorZ_ok(struct LDKNodeInfo o);
	export function CResult_NodeInfoDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeInfoDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_NodeInfoDecodeErrorZ CResult_NodeInfoDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_NodeInfoDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeInfoDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NodeInfoDecodeErrorZ_free(struct LDKCResult_NodeInfoDecodeErrorZ _res);
	export function CResult_NodeInfoDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeInfoDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NodeInfoDecodeErrorZ CResult_NodeInfoDecodeErrorZ_clone(const struct LDKCResult_NodeInfoDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_NodeInfoDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeInfoDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NetworkGraphDecodeErrorZ CResult_NetworkGraphDecodeErrorZ_ok(struct LDKNetworkGraph o);
	export function CResult_NetworkGraphDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NetworkGraphDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_NetworkGraphDecodeErrorZ CResult_NetworkGraphDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_NetworkGraphDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NetworkGraphDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NetworkGraphDecodeErrorZ_free(struct LDKCResult_NetworkGraphDecodeErrorZ _res);
	export function CResult_NetworkGraphDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NetworkGraphDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NetworkGraphDecodeErrorZ CResult_NetworkGraphDecodeErrorZ_clone(const struct LDKCResult_NetworkGraphDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_NetworkGraphDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NetworkGraphDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCOption_CVec_NetAddressZZ COption_CVec_NetAddressZZ_some(struct LDKCVec_NetAddressZ o);
	export function COption_CVec_NetAddressZZ_some(o: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_CVec_NetAddressZZ_some(o);
		return nativeResponseValue;
	}
	// struct LDKCOption_CVec_NetAddressZZ COption_CVec_NetAddressZZ_none(void);
	export function COption_CVec_NetAddressZZ_none(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_CVec_NetAddressZZ_none();
		return nativeResponseValue;
	}
	// void COption_CVec_NetAddressZZ_free(struct LDKCOption_CVec_NetAddressZZ _res);
	export function COption_CVec_NetAddressZZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_CVec_NetAddressZZ_free(_res);
		// debug statements here
	}
	// struct LDKCOption_CVec_NetAddressZZ COption_CVec_NetAddressZZ_clone(const struct LDKCOption_CVec_NetAddressZZ *NONNULL_PTR orig);
	export function COption_CVec_NetAddressZZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_CVec_NetAddressZZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NetAddressDecodeErrorZ CResult_NetAddressDecodeErrorZ_ok(struct LDKNetAddress o);
	export function CResult_NetAddressDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NetAddressDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_NetAddressDecodeErrorZ CResult_NetAddressDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_NetAddressDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NetAddressDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NetAddressDecodeErrorZ_free(struct LDKCResult_NetAddressDecodeErrorZ _res);
	export function CResult_NetAddressDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NetAddressDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NetAddressDecodeErrorZ CResult_NetAddressDecodeErrorZ_clone(const struct LDKCResult_NetAddressDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_NetAddressDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NetAddressDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// void CVec_UpdateAddHTLCZ_free(struct LDKCVec_UpdateAddHTLCZ _res);
	export function CVec_UpdateAddHTLCZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_UpdateAddHTLCZ_free(_res);
		// debug statements here
	}
	// void CVec_UpdateFulfillHTLCZ_free(struct LDKCVec_UpdateFulfillHTLCZ _res);
	export function CVec_UpdateFulfillHTLCZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_UpdateFulfillHTLCZ_free(_res);
		// debug statements here
	}
	// void CVec_UpdateFailHTLCZ_free(struct LDKCVec_UpdateFailHTLCZ _res);
	export function CVec_UpdateFailHTLCZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_UpdateFailHTLCZ_free(_res);
		// debug statements here
	}
	// void CVec_UpdateFailMalformedHTLCZ_free(struct LDKCVec_UpdateFailMalformedHTLCZ _res);
	export function CVec_UpdateFailMalformedHTLCZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_UpdateFailMalformedHTLCZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_AcceptChannelDecodeErrorZ CResult_AcceptChannelDecodeErrorZ_ok(struct LDKAcceptChannel o);
	export function CResult_AcceptChannelDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_AcceptChannelDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_AcceptChannelDecodeErrorZ CResult_AcceptChannelDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_AcceptChannelDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_AcceptChannelDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_AcceptChannelDecodeErrorZ_free(struct LDKCResult_AcceptChannelDecodeErrorZ _res);
	export function CResult_AcceptChannelDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_AcceptChannelDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_AcceptChannelDecodeErrorZ CResult_AcceptChannelDecodeErrorZ_clone(const struct LDKCResult_AcceptChannelDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_AcceptChannelDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_AcceptChannelDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_AnnouncementSignaturesDecodeErrorZ CResult_AnnouncementSignaturesDecodeErrorZ_ok(struct LDKAnnouncementSignatures o);
	export function CResult_AnnouncementSignaturesDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_AnnouncementSignaturesDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_AnnouncementSignaturesDecodeErrorZ CResult_AnnouncementSignaturesDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_AnnouncementSignaturesDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_AnnouncementSignaturesDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_AnnouncementSignaturesDecodeErrorZ_free(struct LDKCResult_AnnouncementSignaturesDecodeErrorZ _res);
	export function CResult_AnnouncementSignaturesDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_AnnouncementSignaturesDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_AnnouncementSignaturesDecodeErrorZ CResult_AnnouncementSignaturesDecodeErrorZ_clone(const struct LDKCResult_AnnouncementSignaturesDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_AnnouncementSignaturesDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_AnnouncementSignaturesDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelReestablishDecodeErrorZ CResult_ChannelReestablishDecodeErrorZ_ok(struct LDKChannelReestablish o);
	export function CResult_ChannelReestablishDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelReestablishDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelReestablishDecodeErrorZ CResult_ChannelReestablishDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ChannelReestablishDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelReestablishDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ChannelReestablishDecodeErrorZ_free(struct LDKCResult_ChannelReestablishDecodeErrorZ _res);
	export function CResult_ChannelReestablishDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelReestablishDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelReestablishDecodeErrorZ CResult_ChannelReestablishDecodeErrorZ_clone(const struct LDKCResult_ChannelReestablishDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ChannelReestablishDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelReestablishDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ClosingSignedDecodeErrorZ CResult_ClosingSignedDecodeErrorZ_ok(struct LDKClosingSigned o);
	export function CResult_ClosingSignedDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ClosingSignedDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ClosingSignedDecodeErrorZ CResult_ClosingSignedDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ClosingSignedDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ClosingSignedDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ClosingSignedDecodeErrorZ_free(struct LDKCResult_ClosingSignedDecodeErrorZ _res);
	export function CResult_ClosingSignedDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ClosingSignedDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ClosingSignedDecodeErrorZ CResult_ClosingSignedDecodeErrorZ_clone(const struct LDKCResult_ClosingSignedDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ClosingSignedDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ClosingSignedDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ClosingSignedFeeRangeDecodeErrorZ CResult_ClosingSignedFeeRangeDecodeErrorZ_ok(struct LDKClosingSignedFeeRange o);
	export function CResult_ClosingSignedFeeRangeDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ClosingSignedFeeRangeDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ClosingSignedFeeRangeDecodeErrorZ CResult_ClosingSignedFeeRangeDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ClosingSignedFeeRangeDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ClosingSignedFeeRangeDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ClosingSignedFeeRangeDecodeErrorZ_free(struct LDKCResult_ClosingSignedFeeRangeDecodeErrorZ _res);
	export function CResult_ClosingSignedFeeRangeDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ClosingSignedFeeRangeDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ClosingSignedFeeRangeDecodeErrorZ CResult_ClosingSignedFeeRangeDecodeErrorZ_clone(const struct LDKCResult_ClosingSignedFeeRangeDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ClosingSignedFeeRangeDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ClosingSignedFeeRangeDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_CommitmentSignedDecodeErrorZ CResult_CommitmentSignedDecodeErrorZ_ok(struct LDKCommitmentSigned o);
	export function CResult_CommitmentSignedDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CommitmentSignedDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_CommitmentSignedDecodeErrorZ CResult_CommitmentSignedDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_CommitmentSignedDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CommitmentSignedDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_CommitmentSignedDecodeErrorZ_free(struct LDKCResult_CommitmentSignedDecodeErrorZ _res);
	export function CResult_CommitmentSignedDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CommitmentSignedDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_CommitmentSignedDecodeErrorZ CResult_CommitmentSignedDecodeErrorZ_clone(const struct LDKCResult_CommitmentSignedDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_CommitmentSignedDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_CommitmentSignedDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_FundingCreatedDecodeErrorZ CResult_FundingCreatedDecodeErrorZ_ok(struct LDKFundingCreated o);
	export function CResult_FundingCreatedDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingCreatedDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_FundingCreatedDecodeErrorZ CResult_FundingCreatedDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_FundingCreatedDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingCreatedDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_FundingCreatedDecodeErrorZ_free(struct LDKCResult_FundingCreatedDecodeErrorZ _res);
	export function CResult_FundingCreatedDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingCreatedDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_FundingCreatedDecodeErrorZ CResult_FundingCreatedDecodeErrorZ_clone(const struct LDKCResult_FundingCreatedDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_FundingCreatedDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingCreatedDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_FundingSignedDecodeErrorZ CResult_FundingSignedDecodeErrorZ_ok(struct LDKFundingSigned o);
	export function CResult_FundingSignedDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingSignedDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_FundingSignedDecodeErrorZ CResult_FundingSignedDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_FundingSignedDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingSignedDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_FundingSignedDecodeErrorZ_free(struct LDKCResult_FundingSignedDecodeErrorZ _res);
	export function CResult_FundingSignedDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingSignedDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_FundingSignedDecodeErrorZ CResult_FundingSignedDecodeErrorZ_clone(const struct LDKCResult_FundingSignedDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_FundingSignedDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingSignedDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_FundingLockedDecodeErrorZ CResult_FundingLockedDecodeErrorZ_ok(struct LDKFundingLocked o);
	export function CResult_FundingLockedDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingLockedDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_FundingLockedDecodeErrorZ CResult_FundingLockedDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_FundingLockedDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingLockedDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_FundingLockedDecodeErrorZ_free(struct LDKCResult_FundingLockedDecodeErrorZ _res);
	export function CResult_FundingLockedDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingLockedDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_FundingLockedDecodeErrorZ CResult_FundingLockedDecodeErrorZ_clone(const struct LDKCResult_FundingLockedDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_FundingLockedDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_FundingLockedDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_InitDecodeErrorZ CResult_InitDecodeErrorZ_ok(struct LDKInit o);
	export function CResult_InitDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InitDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_InitDecodeErrorZ CResult_InitDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_InitDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InitDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_InitDecodeErrorZ_free(struct LDKCResult_InitDecodeErrorZ _res);
	export function CResult_InitDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InitDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_InitDecodeErrorZ CResult_InitDecodeErrorZ_clone(const struct LDKCResult_InitDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_InitDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InitDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_OpenChannelDecodeErrorZ CResult_OpenChannelDecodeErrorZ_ok(struct LDKOpenChannel o);
	export function CResult_OpenChannelDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_OpenChannelDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_OpenChannelDecodeErrorZ CResult_OpenChannelDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_OpenChannelDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_OpenChannelDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_OpenChannelDecodeErrorZ_free(struct LDKCResult_OpenChannelDecodeErrorZ _res);
	export function CResult_OpenChannelDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_OpenChannelDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_OpenChannelDecodeErrorZ CResult_OpenChannelDecodeErrorZ_clone(const struct LDKCResult_OpenChannelDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_OpenChannelDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_OpenChannelDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_RevokeAndACKDecodeErrorZ CResult_RevokeAndACKDecodeErrorZ_ok(struct LDKRevokeAndACK o);
	export function CResult_RevokeAndACKDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RevokeAndACKDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_RevokeAndACKDecodeErrorZ CResult_RevokeAndACKDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_RevokeAndACKDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RevokeAndACKDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_RevokeAndACKDecodeErrorZ_free(struct LDKCResult_RevokeAndACKDecodeErrorZ _res);
	export function CResult_RevokeAndACKDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RevokeAndACKDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_RevokeAndACKDecodeErrorZ CResult_RevokeAndACKDecodeErrorZ_clone(const struct LDKCResult_RevokeAndACKDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_RevokeAndACKDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_RevokeAndACKDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ShutdownDecodeErrorZ CResult_ShutdownDecodeErrorZ_ok(struct LDKShutdown o);
	export function CResult_ShutdownDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ShutdownDecodeErrorZ CResult_ShutdownDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ShutdownDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ShutdownDecodeErrorZ_free(struct LDKCResult_ShutdownDecodeErrorZ _res);
	export function CResult_ShutdownDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ShutdownDecodeErrorZ CResult_ShutdownDecodeErrorZ_clone(const struct LDKCResult_ShutdownDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ShutdownDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ShutdownDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_UpdateFailHTLCDecodeErrorZ CResult_UpdateFailHTLCDecodeErrorZ_ok(struct LDKUpdateFailHTLC o);
	export function CResult_UpdateFailHTLCDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFailHTLCDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_UpdateFailHTLCDecodeErrorZ CResult_UpdateFailHTLCDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_UpdateFailHTLCDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFailHTLCDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_UpdateFailHTLCDecodeErrorZ_free(struct LDKCResult_UpdateFailHTLCDecodeErrorZ _res);
	export function CResult_UpdateFailHTLCDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFailHTLCDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_UpdateFailHTLCDecodeErrorZ CResult_UpdateFailHTLCDecodeErrorZ_clone(const struct LDKCResult_UpdateFailHTLCDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_UpdateFailHTLCDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFailHTLCDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_UpdateFailMalformedHTLCDecodeErrorZ CResult_UpdateFailMalformedHTLCDecodeErrorZ_ok(struct LDKUpdateFailMalformedHTLC o);
	export function CResult_UpdateFailMalformedHTLCDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFailMalformedHTLCDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_UpdateFailMalformedHTLCDecodeErrorZ CResult_UpdateFailMalformedHTLCDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_UpdateFailMalformedHTLCDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFailMalformedHTLCDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_UpdateFailMalformedHTLCDecodeErrorZ_free(struct LDKCResult_UpdateFailMalformedHTLCDecodeErrorZ _res);
	export function CResult_UpdateFailMalformedHTLCDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFailMalformedHTLCDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_UpdateFailMalformedHTLCDecodeErrorZ CResult_UpdateFailMalformedHTLCDecodeErrorZ_clone(const struct LDKCResult_UpdateFailMalformedHTLCDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_UpdateFailMalformedHTLCDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFailMalformedHTLCDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_UpdateFeeDecodeErrorZ CResult_UpdateFeeDecodeErrorZ_ok(struct LDKUpdateFee o);
	export function CResult_UpdateFeeDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFeeDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_UpdateFeeDecodeErrorZ CResult_UpdateFeeDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_UpdateFeeDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFeeDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_UpdateFeeDecodeErrorZ_free(struct LDKCResult_UpdateFeeDecodeErrorZ _res);
	export function CResult_UpdateFeeDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFeeDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_UpdateFeeDecodeErrorZ CResult_UpdateFeeDecodeErrorZ_clone(const struct LDKCResult_UpdateFeeDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_UpdateFeeDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFeeDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_UpdateFulfillHTLCDecodeErrorZ CResult_UpdateFulfillHTLCDecodeErrorZ_ok(struct LDKUpdateFulfillHTLC o);
	export function CResult_UpdateFulfillHTLCDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFulfillHTLCDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_UpdateFulfillHTLCDecodeErrorZ CResult_UpdateFulfillHTLCDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_UpdateFulfillHTLCDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFulfillHTLCDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_UpdateFulfillHTLCDecodeErrorZ_free(struct LDKCResult_UpdateFulfillHTLCDecodeErrorZ _res);
	export function CResult_UpdateFulfillHTLCDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFulfillHTLCDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_UpdateFulfillHTLCDecodeErrorZ CResult_UpdateFulfillHTLCDecodeErrorZ_clone(const struct LDKCResult_UpdateFulfillHTLCDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_UpdateFulfillHTLCDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateFulfillHTLCDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_UpdateAddHTLCDecodeErrorZ CResult_UpdateAddHTLCDecodeErrorZ_ok(struct LDKUpdateAddHTLC o);
	export function CResult_UpdateAddHTLCDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateAddHTLCDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_UpdateAddHTLCDecodeErrorZ CResult_UpdateAddHTLCDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_UpdateAddHTLCDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateAddHTLCDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_UpdateAddHTLCDecodeErrorZ_free(struct LDKCResult_UpdateAddHTLCDecodeErrorZ _res);
	export function CResult_UpdateAddHTLCDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateAddHTLCDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_UpdateAddHTLCDecodeErrorZ CResult_UpdateAddHTLCDecodeErrorZ_clone(const struct LDKCResult_UpdateAddHTLCDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_UpdateAddHTLCDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UpdateAddHTLCDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_PingDecodeErrorZ CResult_PingDecodeErrorZ_ok(struct LDKPing o);
	export function CResult_PingDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PingDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_PingDecodeErrorZ CResult_PingDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_PingDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PingDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_PingDecodeErrorZ_free(struct LDKCResult_PingDecodeErrorZ _res);
	export function CResult_PingDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PingDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PingDecodeErrorZ CResult_PingDecodeErrorZ_clone(const struct LDKCResult_PingDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_PingDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PingDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_PongDecodeErrorZ CResult_PongDecodeErrorZ_ok(struct LDKPong o);
	export function CResult_PongDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PongDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_PongDecodeErrorZ CResult_PongDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_PongDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PongDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_PongDecodeErrorZ_free(struct LDKCResult_PongDecodeErrorZ _res);
	export function CResult_PongDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PongDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_PongDecodeErrorZ CResult_PongDecodeErrorZ_clone(const struct LDKCResult_PongDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_PongDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_PongDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(struct LDKUnsignedChannelAnnouncement o);
	export function CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_UnsignedChannelAnnouncementDecodeErrorZ_free(struct LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ _res);
	export function CResult_UnsignedChannelAnnouncementDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedChannelAnnouncementDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ CResult_UnsignedChannelAnnouncementDecodeErrorZ_clone(const struct LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_UnsignedChannelAnnouncementDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedChannelAnnouncementDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelAnnouncementDecodeErrorZ CResult_ChannelAnnouncementDecodeErrorZ_ok(struct LDKChannelAnnouncement o);
	export function CResult_ChannelAnnouncementDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelAnnouncementDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelAnnouncementDecodeErrorZ CResult_ChannelAnnouncementDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ChannelAnnouncementDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelAnnouncementDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ChannelAnnouncementDecodeErrorZ_free(struct LDKCResult_ChannelAnnouncementDecodeErrorZ _res);
	export function CResult_ChannelAnnouncementDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelAnnouncementDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelAnnouncementDecodeErrorZ CResult_ChannelAnnouncementDecodeErrorZ_clone(const struct LDKCResult_ChannelAnnouncementDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ChannelAnnouncementDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelAnnouncementDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_UnsignedChannelUpdateDecodeErrorZ CResult_UnsignedChannelUpdateDecodeErrorZ_ok(struct LDKUnsignedChannelUpdate o);
	export function CResult_UnsignedChannelUpdateDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedChannelUpdateDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_UnsignedChannelUpdateDecodeErrorZ CResult_UnsignedChannelUpdateDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_UnsignedChannelUpdateDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedChannelUpdateDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_UnsignedChannelUpdateDecodeErrorZ_free(struct LDKCResult_UnsignedChannelUpdateDecodeErrorZ _res);
	export function CResult_UnsignedChannelUpdateDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedChannelUpdateDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_UnsignedChannelUpdateDecodeErrorZ CResult_UnsignedChannelUpdateDecodeErrorZ_clone(const struct LDKCResult_UnsignedChannelUpdateDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_UnsignedChannelUpdateDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedChannelUpdateDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelUpdateDecodeErrorZ CResult_ChannelUpdateDecodeErrorZ_ok(struct LDKChannelUpdate o);
	export function CResult_ChannelUpdateDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelUpdateDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelUpdateDecodeErrorZ CResult_ChannelUpdateDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ChannelUpdateDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelUpdateDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ChannelUpdateDecodeErrorZ_free(struct LDKCResult_ChannelUpdateDecodeErrorZ _res);
	export function CResult_ChannelUpdateDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelUpdateDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ChannelUpdateDecodeErrorZ CResult_ChannelUpdateDecodeErrorZ_clone(const struct LDKCResult_ChannelUpdateDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ChannelUpdateDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ChannelUpdateDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ErrorMessageDecodeErrorZ CResult_ErrorMessageDecodeErrorZ_ok(struct LDKErrorMessage o);
	export function CResult_ErrorMessageDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ErrorMessageDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ErrorMessageDecodeErrorZ CResult_ErrorMessageDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ErrorMessageDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ErrorMessageDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ErrorMessageDecodeErrorZ_free(struct LDKCResult_ErrorMessageDecodeErrorZ _res);
	export function CResult_ErrorMessageDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ErrorMessageDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ErrorMessageDecodeErrorZ CResult_ErrorMessageDecodeErrorZ_clone(const struct LDKCResult_ErrorMessageDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ErrorMessageDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ErrorMessageDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ CResult_UnsignedNodeAnnouncementDecodeErrorZ_ok(struct LDKUnsignedNodeAnnouncement o);
	export function CResult_UnsignedNodeAnnouncementDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedNodeAnnouncementDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ CResult_UnsignedNodeAnnouncementDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_UnsignedNodeAnnouncementDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedNodeAnnouncementDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_UnsignedNodeAnnouncementDecodeErrorZ_free(struct LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ _res);
	export function CResult_UnsignedNodeAnnouncementDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedNodeAnnouncementDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ CResult_UnsignedNodeAnnouncementDecodeErrorZ_clone(const struct LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_UnsignedNodeAnnouncementDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_UnsignedNodeAnnouncementDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_NodeAnnouncementDecodeErrorZ CResult_NodeAnnouncementDecodeErrorZ_ok(struct LDKNodeAnnouncement o);
	export function CResult_NodeAnnouncementDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeAnnouncementDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_NodeAnnouncementDecodeErrorZ CResult_NodeAnnouncementDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_NodeAnnouncementDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeAnnouncementDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_NodeAnnouncementDecodeErrorZ_free(struct LDKCResult_NodeAnnouncementDecodeErrorZ _res);
	export function CResult_NodeAnnouncementDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeAnnouncementDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_NodeAnnouncementDecodeErrorZ CResult_NodeAnnouncementDecodeErrorZ_clone(const struct LDKCResult_NodeAnnouncementDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_NodeAnnouncementDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_NodeAnnouncementDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_QueryShortChannelIdsDecodeErrorZ CResult_QueryShortChannelIdsDecodeErrorZ_ok(struct LDKQueryShortChannelIds o);
	export function CResult_QueryShortChannelIdsDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_QueryShortChannelIdsDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_QueryShortChannelIdsDecodeErrorZ CResult_QueryShortChannelIdsDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_QueryShortChannelIdsDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_QueryShortChannelIdsDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_QueryShortChannelIdsDecodeErrorZ_free(struct LDKCResult_QueryShortChannelIdsDecodeErrorZ _res);
	export function CResult_QueryShortChannelIdsDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_QueryShortChannelIdsDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_QueryShortChannelIdsDecodeErrorZ CResult_QueryShortChannelIdsDecodeErrorZ_clone(const struct LDKCResult_QueryShortChannelIdsDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_QueryShortChannelIdsDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_QueryShortChannelIdsDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(struct LDKReplyShortChannelIdsEnd o);
	export function CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(struct LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ _res);
	export function CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ CResult_ReplyShortChannelIdsEndDecodeErrorZ_clone(const struct LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ReplyShortChannelIdsEndDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ReplyShortChannelIdsEndDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_QueryChannelRangeDecodeErrorZ CResult_QueryChannelRangeDecodeErrorZ_ok(struct LDKQueryChannelRange o);
	export function CResult_QueryChannelRangeDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_QueryChannelRangeDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_QueryChannelRangeDecodeErrorZ CResult_QueryChannelRangeDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_QueryChannelRangeDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_QueryChannelRangeDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_QueryChannelRangeDecodeErrorZ_free(struct LDKCResult_QueryChannelRangeDecodeErrorZ _res);
	export function CResult_QueryChannelRangeDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_QueryChannelRangeDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_QueryChannelRangeDecodeErrorZ CResult_QueryChannelRangeDecodeErrorZ_clone(const struct LDKCResult_QueryChannelRangeDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_QueryChannelRangeDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_QueryChannelRangeDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_ReplyChannelRangeDecodeErrorZ CResult_ReplyChannelRangeDecodeErrorZ_ok(struct LDKReplyChannelRange o);
	export function CResult_ReplyChannelRangeDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ReplyChannelRangeDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_ReplyChannelRangeDecodeErrorZ CResult_ReplyChannelRangeDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_ReplyChannelRangeDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ReplyChannelRangeDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_ReplyChannelRangeDecodeErrorZ_free(struct LDKCResult_ReplyChannelRangeDecodeErrorZ _res);
	export function CResult_ReplyChannelRangeDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ReplyChannelRangeDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_ReplyChannelRangeDecodeErrorZ CResult_ReplyChannelRangeDecodeErrorZ_clone(const struct LDKCResult_ReplyChannelRangeDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_ReplyChannelRangeDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_ReplyChannelRangeDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_GossipTimestampFilterDecodeErrorZ CResult_GossipTimestampFilterDecodeErrorZ_ok(struct LDKGossipTimestampFilter o);
	export function CResult_GossipTimestampFilterDecodeErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_GossipTimestampFilterDecodeErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_GossipTimestampFilterDecodeErrorZ CResult_GossipTimestampFilterDecodeErrorZ_err(struct LDKDecodeError e);
	export function CResult_GossipTimestampFilterDecodeErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_GossipTimestampFilterDecodeErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_GossipTimestampFilterDecodeErrorZ_free(struct LDKCResult_GossipTimestampFilterDecodeErrorZ _res);
	export function CResult_GossipTimestampFilterDecodeErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_GossipTimestampFilterDecodeErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_GossipTimestampFilterDecodeErrorZ CResult_GossipTimestampFilterDecodeErrorZ_clone(const struct LDKCResult_GossipTimestampFilterDecodeErrorZ *NONNULL_PTR orig);
	export function CResult_GossipTimestampFilterDecodeErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_GossipTimestampFilterDecodeErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCResult_InvoiceSignOrCreationErrorZ CResult_InvoiceSignOrCreationErrorZ_ok(struct LDKInvoice o);
	export function CResult_InvoiceSignOrCreationErrorZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceSignOrCreationErrorZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_InvoiceSignOrCreationErrorZ CResult_InvoiceSignOrCreationErrorZ_err(struct LDKSignOrCreationError e);
	export function CResult_InvoiceSignOrCreationErrorZ_err(e: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceSignOrCreationErrorZ_err(e);
		return nativeResponseValue;
	}
	// void CResult_InvoiceSignOrCreationErrorZ_free(struct LDKCResult_InvoiceSignOrCreationErrorZ _res);
	export function CResult_InvoiceSignOrCreationErrorZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceSignOrCreationErrorZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_InvoiceSignOrCreationErrorZ CResult_InvoiceSignOrCreationErrorZ_clone(const struct LDKCResult_InvoiceSignOrCreationErrorZ *NONNULL_PTR orig);
	export function CResult_InvoiceSignOrCreationErrorZ_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_InvoiceSignOrCreationErrorZ_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCOption_FilterZ COption_FilterZ_some(struct LDKFilter o);
	export function COption_FilterZ_some(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_FilterZ_some(o);
		return nativeResponseValue;
	}
	// struct LDKCOption_FilterZ COption_FilterZ_none(void);
	export function COption_FilterZ_none(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_FilterZ_none();
		return nativeResponseValue;
	}
	// void COption_FilterZ_free(struct LDKCOption_FilterZ _res);
	export function COption_FilterZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.COption_FilterZ_free(_res);
		// debug statements here
	}
	// struct LDKCResult_LockedChannelMonitorNoneZ CResult_LockedChannelMonitorNoneZ_ok(struct LDKLockedChannelMonitor o);
	export function CResult_LockedChannelMonitorNoneZ_ok(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_LockedChannelMonitorNoneZ_ok(o);
		return nativeResponseValue;
	}
	// struct LDKCResult_LockedChannelMonitorNoneZ CResult_LockedChannelMonitorNoneZ_err(void);
	export function CResult_LockedChannelMonitorNoneZ_err(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_LockedChannelMonitorNoneZ_err();
		return nativeResponseValue;
	}
	// void CResult_LockedChannelMonitorNoneZ_free(struct LDKCResult_LockedChannelMonitorNoneZ _res);
	export function CResult_LockedChannelMonitorNoneZ_free(_res: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CResult_LockedChannelMonitorNoneZ_free(_res);
		// debug statements here
	}
	// void CVec_OutPointZ_free(struct LDKCVec_OutPointZ _res);
	export function CVec_OutPointZ_free(_res: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CVec_OutPointZ_free(_res);
		// debug statements here
	}
	// void PaymentPurpose_free(struct LDKPaymentPurpose this_ptr);
	export function PaymentPurpose_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentPurpose_free(this_ptr);
		// debug statements here
	}
	// struct LDKPaymentPurpose PaymentPurpose_clone(const struct LDKPaymentPurpose *NONNULL_PTR orig);
	export function PaymentPurpose_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentPurpose_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKPaymentPurpose PaymentPurpose_invoice_payment(struct LDKThirtyTwoBytes payment_preimage, struct LDKThirtyTwoBytes payment_secret, uint64_t user_payment_id);
	export function PaymentPurpose_invoice_payment(payment_preimage: Uint8Array, payment_secret: Uint8Array, user_payment_id: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentPurpose_invoice_payment(encodeArray(payment_preimage), encodeArray(payment_secret), user_payment_id);
		return nativeResponseValue;
	}
	// struct LDKPaymentPurpose PaymentPurpose_spontaneous_payment(struct LDKThirtyTwoBytes a);
	export function PaymentPurpose_spontaneous_payment(a: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentPurpose_spontaneous_payment(encodeArray(a));
		return nativeResponseValue;
	}
	// void ClosureReason_free(struct LDKClosureReason this_ptr);
	export function ClosureReason_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosureReason_free(this_ptr);
		// debug statements here
	}
	// struct LDKClosureReason ClosureReason_clone(const struct LDKClosureReason *NONNULL_PTR orig);
	export function ClosureReason_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosureReason_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKClosureReason ClosureReason_counterparty_force_closed(struct LDKStr peer_msg);
	export function ClosureReason_counterparty_force_closed(peer_msg: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosureReason_counterparty_force_closed(peer_msg);
		return nativeResponseValue;
	}
	// struct LDKClosureReason ClosureReason_holder_force_closed(void);
	export function ClosureReason_holder_force_closed(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosureReason_holder_force_closed();
		return nativeResponseValue;
	}
	// struct LDKClosureReason ClosureReason_cooperative_closure(void);
	export function ClosureReason_cooperative_closure(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosureReason_cooperative_closure();
		return nativeResponseValue;
	}
	// struct LDKClosureReason ClosureReason_commitment_tx_confirmed(void);
	export function ClosureReason_commitment_tx_confirmed(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosureReason_commitment_tx_confirmed();
		return nativeResponseValue;
	}
	// struct LDKClosureReason ClosureReason_processing_error(struct LDKStr err);
	export function ClosureReason_processing_error(err: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosureReason_processing_error(err);
		return nativeResponseValue;
	}
	// struct LDKClosureReason ClosureReason_disconnected_peer(void);
	export function ClosureReason_disconnected_peer(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosureReason_disconnected_peer();
		return nativeResponseValue;
	}
	// struct LDKClosureReason ClosureReason_outdated_channel_manager(void);
	export function ClosureReason_outdated_channel_manager(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosureReason_outdated_channel_manager();
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ClosureReason_write(const struct LDKClosureReason *NONNULL_PTR obj);
	export function ClosureReason_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosureReason_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// void Event_free(struct LDKEvent this_ptr);
	export function Event_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_free(this_ptr);
		// debug statements here
	}
	// struct LDKEvent Event_clone(const struct LDKEvent *NONNULL_PTR orig);
	export function Event_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKEvent Event_funding_generation_ready(struct LDKThirtyTwoBytes temporary_channel_id, uint64_t channel_value_satoshis, struct LDKCVec_u8Z output_script, uint64_t user_channel_id);
	export function Event_funding_generation_ready(temporary_channel_id: Uint8Array, channel_value_satoshis: number, output_script: Uint8Array, user_channel_id: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_funding_generation_ready(encodeArray(temporary_channel_id), channel_value_satoshis, encodeArray(output_script), user_channel_id);
		return nativeResponseValue;
	}
	// struct LDKEvent Event_payment_received(struct LDKThirtyTwoBytes payment_hash, uint64_t amt, struct LDKPaymentPurpose purpose);
	export function Event_payment_received(payment_hash: Uint8Array, amt: number, purpose: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_payment_received(encodeArray(payment_hash), amt, purpose);
		return nativeResponseValue;
	}
	// struct LDKEvent Event_payment_sent(struct LDKThirtyTwoBytes payment_id, struct LDKThirtyTwoBytes payment_preimage, struct LDKThirtyTwoBytes payment_hash, struct LDKCOption_u64Z fee_paid_msat);
	export function Event_payment_sent(payment_id: Uint8Array, payment_preimage: Uint8Array, payment_hash: Uint8Array, fee_paid_msat: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_payment_sent(encodeArray(payment_id), encodeArray(payment_preimage), encodeArray(payment_hash), fee_paid_msat);
		return nativeResponseValue;
	}
	// struct LDKEvent Event_payment_path_failed(struct LDKThirtyTwoBytes payment_id, struct LDKThirtyTwoBytes payment_hash, bool rejected_by_dest, struct LDKCOption_NetworkUpdateZ network_update, bool all_paths_failed, struct LDKCVec_RouteHopZ path, struct LDKCOption_u64Z short_channel_id, struct LDKRouteParameters retry);
	export function Event_payment_path_failed(payment_id: Uint8Array, payment_hash: Uint8Array, rejected_by_dest: boolean, network_update: number, all_paths_failed: boolean, path: number[], short_channel_id: number, retry: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_payment_path_failed(encodeArray(payment_id), encodeArray(payment_hash), rejected_by_dest, network_update, all_paths_failed, path, short_channel_id, retry);
		return nativeResponseValue;
	}
	// struct LDKEvent Event_pending_htlcs_forwardable(uint64_t time_forwardable);
	export function Event_pending_htlcs_forwardable(time_forwardable: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_pending_htlcs_forwardable(time_forwardable);
		return nativeResponseValue;
	}
	// struct LDKEvent Event_spendable_outputs(struct LDKCVec_SpendableOutputDescriptorZ outputs);
	export function Event_spendable_outputs(outputs: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_spendable_outputs(outputs);
		return nativeResponseValue;
	}
	// struct LDKEvent Event_payment_forwarded(struct LDKCOption_u64Z fee_earned_msat, bool claim_from_onchain_tx);
	export function Event_payment_forwarded(fee_earned_msat: number, claim_from_onchain_tx: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_payment_forwarded(fee_earned_msat, claim_from_onchain_tx);
		return nativeResponseValue;
	}
	// struct LDKEvent Event_channel_closed(struct LDKThirtyTwoBytes channel_id, uint64_t user_channel_id, struct LDKClosureReason reason);
	export function Event_channel_closed(channel_id: Uint8Array, user_channel_id: number, reason: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_channel_closed(encodeArray(channel_id), user_channel_id, reason);
		return nativeResponseValue;
	}
	// struct LDKEvent Event_discard_funding(struct LDKThirtyTwoBytes channel_id, struct LDKTransaction transaction);
	export function Event_discard_funding(channel_id: Uint8Array, transaction: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_discard_funding(encodeArray(channel_id), encodeArray(transaction));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z Event_write(const struct LDKEvent *NONNULL_PTR obj);
	export function Event_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Event_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// void MessageSendEvent_free(struct LDKMessageSendEvent this_ptr);
	export function MessageSendEvent_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_free(this_ptr);
		// debug statements here
	}
	// struct LDKMessageSendEvent MessageSendEvent_clone(const struct LDKMessageSendEvent *NONNULL_PTR orig);
	export function MessageSendEvent_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_accept_channel(struct LDKPublicKey node_id, struct LDKAcceptChannel msg);
	export function MessageSendEvent_send_accept_channel(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_accept_channel(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_open_channel(struct LDKPublicKey node_id, struct LDKOpenChannel msg);
	export function MessageSendEvent_send_open_channel(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_open_channel(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_funding_created(struct LDKPublicKey node_id, struct LDKFundingCreated msg);
	export function MessageSendEvent_send_funding_created(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_funding_created(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_funding_signed(struct LDKPublicKey node_id, struct LDKFundingSigned msg);
	export function MessageSendEvent_send_funding_signed(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_funding_signed(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_funding_locked(struct LDKPublicKey node_id, struct LDKFundingLocked msg);
	export function MessageSendEvent_send_funding_locked(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_funding_locked(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_announcement_signatures(struct LDKPublicKey node_id, struct LDKAnnouncementSignatures msg);
	export function MessageSendEvent_send_announcement_signatures(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_announcement_signatures(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_update_htlcs(struct LDKPublicKey node_id, struct LDKCommitmentUpdate updates);
	export function MessageSendEvent_update_htlcs(node_id: Uint8Array, updates: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_update_htlcs(encodeArray(node_id), updates);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_revoke_and_ack(struct LDKPublicKey node_id, struct LDKRevokeAndACK msg);
	export function MessageSendEvent_send_revoke_and_ack(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_revoke_and_ack(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_closing_signed(struct LDKPublicKey node_id, struct LDKClosingSigned msg);
	export function MessageSendEvent_send_closing_signed(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_closing_signed(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_shutdown(struct LDKPublicKey node_id, struct LDKShutdown msg);
	export function MessageSendEvent_send_shutdown(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_shutdown(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_channel_reestablish(struct LDKPublicKey node_id, struct LDKChannelReestablish msg);
	export function MessageSendEvent_send_channel_reestablish(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_channel_reestablish(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_broadcast_channel_announcement(struct LDKChannelAnnouncement msg, struct LDKChannelUpdate update_msg);
	export function MessageSendEvent_broadcast_channel_announcement(msg: number, update_msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_broadcast_channel_announcement(msg, update_msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_broadcast_node_announcement(struct LDKNodeAnnouncement msg);
	export function MessageSendEvent_broadcast_node_announcement(msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_broadcast_node_announcement(msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_broadcast_channel_update(struct LDKChannelUpdate msg);
	export function MessageSendEvent_broadcast_channel_update(msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_broadcast_channel_update(msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_channel_update(struct LDKPublicKey node_id, struct LDKChannelUpdate msg);
	export function MessageSendEvent_send_channel_update(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_channel_update(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_handle_error(struct LDKPublicKey node_id, struct LDKErrorAction action);
	export function MessageSendEvent_handle_error(node_id: Uint8Array, action: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_handle_error(encodeArray(node_id), action);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_channel_range_query(struct LDKPublicKey node_id, struct LDKQueryChannelRange msg);
	export function MessageSendEvent_send_channel_range_query(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_channel_range_query(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_short_ids_query(struct LDKPublicKey node_id, struct LDKQueryShortChannelIds msg);
	export function MessageSendEvent_send_short_ids_query(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_short_ids_query(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEvent MessageSendEvent_send_reply_channel_range(struct LDKPublicKey node_id, struct LDKReplyChannelRange msg);
	export function MessageSendEvent_send_reply_channel_range(node_id: Uint8Array, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEvent_send_reply_channel_range(encodeArray(node_id), msg);
		return nativeResponseValue;
	}
	// void MessageSendEventsProvider_free(struct LDKMessageSendEventsProvider this_ptr);
	export function MessageSendEventsProvider_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageSendEventsProvider_free(this_ptr);
		// debug statements here
	}
	// void EventsProvider_free(struct LDKEventsProvider this_ptr);
	export function EventsProvider_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.EventsProvider_free(this_ptr);
		// debug statements here
	}
	// void EventHandler_free(struct LDKEventHandler this_ptr);
	export function EventHandler_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.EventHandler_free(this_ptr);
		// debug statements here
	}
	// void APIError_free(struct LDKAPIError this_ptr);
	export function APIError_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.APIError_free(this_ptr);
		// debug statements here
	}
	// struct LDKAPIError APIError_clone(const struct LDKAPIError *NONNULL_PTR orig);
	export function APIError_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.APIError_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKAPIError APIError_apimisuse_error(struct LDKStr err);
	export function APIError_apimisuse_error(err: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.APIError_apimisuse_error(err);
		return nativeResponseValue;
	}
	// struct LDKAPIError APIError_fee_rate_too_high(struct LDKStr err, uint32_t feerate);
	export function APIError_fee_rate_too_high(err: String, feerate: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.APIError_fee_rate_too_high(err, feerate);
		return nativeResponseValue;
	}
	// struct LDKAPIError APIError_route_error(struct LDKStr err);
	export function APIError_route_error(err: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.APIError_route_error(err);
		return nativeResponseValue;
	}
	// struct LDKAPIError APIError_channel_unavailable(struct LDKStr err);
	export function APIError_channel_unavailable(err: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.APIError_channel_unavailable(err);
		return nativeResponseValue;
	}
	// struct LDKAPIError APIError_monitor_update_failed(void);
	export function APIError_monitor_update_failed(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.APIError_monitor_update_failed();
		return nativeResponseValue;
	}
	// struct LDKAPIError APIError_incompatible_shutdown_script(struct LDKShutdownScript script);
	export function APIError_incompatible_shutdown_script(script: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.APIError_incompatible_shutdown_script(script);
		return nativeResponseValue;
	}
	// struct LDKCResult_StringErrorZ sign(struct LDKu8slice msg, const uint8_t (*sk)[32]);
	export function sign(msg: Uint8Array, sk: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.sign(encodeArray(msg), encodeArray(sk));
		return nativeResponseValue;
	}
	// struct LDKCResult_PublicKeyErrorZ recover_pk(struct LDKu8slice msg, struct LDKStr sig);
	export function recover_pk(msg: Uint8Array, sig: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.recover_pk(encodeArray(msg), sig);
		return nativeResponseValue;
	}
	// bool verify(struct LDKu8slice msg, struct LDKStr sig, struct LDKPublicKey pk);
	export function verify(msg: Uint8Array, sig: String, pk: Uint8Array): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.verify(encodeArray(msg), sig, encodeArray(pk));
		return nativeResponseValue;
	}
	// enum LDKLevel Level_clone(const enum LDKLevel *NONNULL_PTR orig);
	export function Level_clone(orig: number): Level {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Level_clone(orig);
		return nativeResponseValue;
	}
	// enum LDKLevel Level_trace(void);
	export function Level_trace(): Level {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Level_trace();
		return nativeResponseValue;
	}
	// enum LDKLevel Level_debug(void);
	export function Level_debug(): Level {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Level_debug();
		return nativeResponseValue;
	}
	// enum LDKLevel Level_info(void);
	export function Level_info(): Level {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Level_info();
		return nativeResponseValue;
	}
	// enum LDKLevel Level_warn(void);
	export function Level_warn(): Level {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Level_warn();
		return nativeResponseValue;
	}
	// enum LDKLevel Level_error(void);
	export function Level_error(): Level {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Level_error();
		return nativeResponseValue;
	}
	// bool Level_eq(const enum LDKLevel *NONNULL_PTR a, const enum LDKLevel *NONNULL_PTR b);
	export function Level_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Level_eq(a, b);
		return nativeResponseValue;
	}
	// uint64_t Level_hash(const enum LDKLevel *NONNULL_PTR o);
	export function Level_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Level_hash(o);
		return nativeResponseValue;
	}
	// MUST_USE_RES enum LDKLevel Level_max(void);
	export function Level_max(): Level {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Level_max();
		return nativeResponseValue;
	}
	// void Logger_free(struct LDKLogger this_ptr);
	export function Logger_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Logger_free(this_ptr);
		// debug statements here
	}
	// void ChannelHandshakeConfig_free(struct LDKChannelHandshakeConfig this_obj);
	export function ChannelHandshakeConfig_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeConfig_free(this_obj);
		// debug statements here
	}
	// uint32_t ChannelHandshakeConfig_get_minimum_depth(const struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr);
	export function ChannelHandshakeConfig_get_minimum_depth(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeConfig_get_minimum_depth(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeConfig_set_minimum_depth(struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr, uint32_t val);
	export function ChannelHandshakeConfig_set_minimum_depth(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeConfig_set_minimum_depth(this_ptr, val);
		// debug statements here
	}
	// uint16_t ChannelHandshakeConfig_get_our_to_self_delay(const struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr);
	export function ChannelHandshakeConfig_get_our_to_self_delay(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeConfig_get_our_to_self_delay(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeConfig_set_our_to_self_delay(struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr, uint16_t val);
	export function ChannelHandshakeConfig_set_our_to_self_delay(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeConfig_set_our_to_self_delay(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelHandshakeConfig_get_our_htlc_minimum_msat(const struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr);
	export function ChannelHandshakeConfig_get_our_htlc_minimum_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeConfig_get_our_htlc_minimum_msat(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeConfig_set_our_htlc_minimum_msat(struct LDKChannelHandshakeConfig *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelHandshakeConfig_set_our_htlc_minimum_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeConfig_set_our_htlc_minimum_msat(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelHandshakeConfig ChannelHandshakeConfig_new(uint32_t minimum_depth_arg, uint16_t our_to_self_delay_arg, uint64_t our_htlc_minimum_msat_arg);
	export function ChannelHandshakeConfig_new(minimum_depth_arg: number, our_to_self_delay_arg: number, our_htlc_minimum_msat_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelHandshakeConfig ChannelHandshakeConfig_clone(const struct LDKChannelHandshakeConfig *NONNULL_PTR orig);
	export function ChannelHandshakeConfig_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeConfig_clone(orig);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKChannelHandshakeConfig ChannelHandshakeConfig_default(void);
	export function ChannelHandshakeConfig_default(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeConfig_default();
		return nativeResponseValue;
	}
	// void ChannelHandshakeLimits_free(struct LDKChannelHandshakeLimits this_obj);
	export function ChannelHandshakeLimits_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_free(this_obj);
		// debug statements here
	}
	// uint64_t ChannelHandshakeLimits_get_min_funding_satoshis(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	export function ChannelHandshakeLimits_get_min_funding_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_get_min_funding_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeLimits_set_min_funding_satoshis(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelHandshakeLimits_set_min_funding_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_set_min_funding_satoshis(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelHandshakeLimits_get_max_htlc_minimum_msat(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	export function ChannelHandshakeLimits_get_max_htlc_minimum_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_get_max_htlc_minimum_msat(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeLimits_set_max_htlc_minimum_msat(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelHandshakeLimits_set_max_htlc_minimum_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_set_max_htlc_minimum_msat(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	export function ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelHandshakeLimits_get_max_channel_reserve_satoshis(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	export function ChannelHandshakeLimits_get_max_channel_reserve_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_get_max_channel_reserve_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeLimits_set_max_channel_reserve_satoshis(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelHandshakeLimits_set_max_channel_reserve_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_set_max_channel_reserve_satoshis(this_ptr, val);
		// debug statements here
	}
	// uint16_t ChannelHandshakeLimits_get_min_max_accepted_htlcs(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	export function ChannelHandshakeLimits_get_min_max_accepted_htlcs(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_get_min_max_accepted_htlcs(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeLimits_set_min_max_accepted_htlcs(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint16_t val);
	export function ChannelHandshakeLimits_set_min_max_accepted_htlcs(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_set_min_max_accepted_htlcs(this_ptr, val);
		// debug statements here
	}
	// uint32_t ChannelHandshakeLimits_get_max_minimum_depth(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	export function ChannelHandshakeLimits_get_max_minimum_depth(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_get_max_minimum_depth(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeLimits_set_max_minimum_depth(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint32_t val);
	export function ChannelHandshakeLimits_set_max_minimum_depth(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_set_max_minimum_depth(this_ptr, val);
		// debug statements here
	}
	// bool ChannelHandshakeLimits_get_force_announced_channel_preference(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	export function ChannelHandshakeLimits_get_force_announced_channel_preference(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_get_force_announced_channel_preference(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeLimits_set_force_announced_channel_preference(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, bool val);
	export function ChannelHandshakeLimits_set_force_announced_channel_preference(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_set_force_announced_channel_preference(this_ptr, val);
		// debug statements here
	}
	// uint16_t ChannelHandshakeLimits_get_their_to_self_delay(const struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr);
	export function ChannelHandshakeLimits_get_their_to_self_delay(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_get_their_to_self_delay(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelHandshakeLimits_set_their_to_self_delay(struct LDKChannelHandshakeLimits *NONNULL_PTR this_ptr, uint16_t val);
	export function ChannelHandshakeLimits_set_their_to_self_delay(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_set_their_to_self_delay(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelHandshakeLimits ChannelHandshakeLimits_new(uint64_t min_funding_satoshis_arg, uint64_t max_htlc_minimum_msat_arg, uint64_t min_max_htlc_value_in_flight_msat_arg, uint64_t max_channel_reserve_satoshis_arg, uint16_t min_max_accepted_htlcs_arg, uint32_t max_minimum_depth_arg, bool force_announced_channel_preference_arg, uint16_t their_to_self_delay_arg);
	export function ChannelHandshakeLimits_new(min_funding_satoshis_arg: number, max_htlc_minimum_msat_arg: number, min_max_htlc_value_in_flight_msat_arg: number, max_channel_reserve_satoshis_arg: number, min_max_accepted_htlcs_arg: number, max_minimum_depth_arg: number, force_announced_channel_preference_arg: boolean, their_to_self_delay_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelHandshakeLimits ChannelHandshakeLimits_clone(const struct LDKChannelHandshakeLimits *NONNULL_PTR orig);
	export function ChannelHandshakeLimits_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_clone(orig);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKChannelHandshakeLimits ChannelHandshakeLimits_default(void);
	export function ChannelHandshakeLimits_default(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelHandshakeLimits_default();
		return nativeResponseValue;
	}
	// void ChannelConfig_free(struct LDKChannelConfig this_obj);
	export function ChannelConfig_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_free(this_obj);
		// debug statements here
	}
	// uint32_t ChannelConfig_get_forwarding_fee_proportional_millionths(const struct LDKChannelConfig *NONNULL_PTR this_ptr);
	export function ChannelConfig_get_forwarding_fee_proportional_millionths(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_get_forwarding_fee_proportional_millionths(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelConfig_set_forwarding_fee_proportional_millionths(struct LDKChannelConfig *NONNULL_PTR this_ptr, uint32_t val);
	export function ChannelConfig_set_forwarding_fee_proportional_millionths(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_set_forwarding_fee_proportional_millionths(this_ptr, val);
		// debug statements here
	}
	// uint32_t ChannelConfig_get_forwarding_fee_base_msat(const struct LDKChannelConfig *NONNULL_PTR this_ptr);
	export function ChannelConfig_get_forwarding_fee_base_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_get_forwarding_fee_base_msat(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelConfig_set_forwarding_fee_base_msat(struct LDKChannelConfig *NONNULL_PTR this_ptr, uint32_t val);
	export function ChannelConfig_set_forwarding_fee_base_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_set_forwarding_fee_base_msat(this_ptr, val);
		// debug statements here
	}
	// uint16_t ChannelConfig_get_cltv_expiry_delta(const struct LDKChannelConfig *NONNULL_PTR this_ptr);
	export function ChannelConfig_get_cltv_expiry_delta(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_get_cltv_expiry_delta(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelConfig_set_cltv_expiry_delta(struct LDKChannelConfig *NONNULL_PTR this_ptr, uint16_t val);
	export function ChannelConfig_set_cltv_expiry_delta(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_set_cltv_expiry_delta(this_ptr, val);
		// debug statements here
	}
	// bool ChannelConfig_get_announced_channel(const struct LDKChannelConfig *NONNULL_PTR this_ptr);
	export function ChannelConfig_get_announced_channel(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_get_announced_channel(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelConfig_set_announced_channel(struct LDKChannelConfig *NONNULL_PTR this_ptr, bool val);
	export function ChannelConfig_set_announced_channel(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_set_announced_channel(this_ptr, val);
		// debug statements here
	}
	// bool ChannelConfig_get_commit_upfront_shutdown_pubkey(const struct LDKChannelConfig *NONNULL_PTR this_ptr);
	export function ChannelConfig_get_commit_upfront_shutdown_pubkey(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_get_commit_upfront_shutdown_pubkey(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelConfig_set_commit_upfront_shutdown_pubkey(struct LDKChannelConfig *NONNULL_PTR this_ptr, bool val);
	export function ChannelConfig_set_commit_upfront_shutdown_pubkey(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_set_commit_upfront_shutdown_pubkey(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelConfig_get_max_dust_htlc_exposure_msat(const struct LDKChannelConfig *NONNULL_PTR this_ptr);
	export function ChannelConfig_get_max_dust_htlc_exposure_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_get_max_dust_htlc_exposure_msat(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelConfig_set_max_dust_htlc_exposure_msat(struct LDKChannelConfig *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelConfig_set_max_dust_htlc_exposure_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_set_max_dust_htlc_exposure_msat(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelConfig_get_force_close_avoidance_max_fee_satoshis(const struct LDKChannelConfig *NONNULL_PTR this_ptr);
	export function ChannelConfig_get_force_close_avoidance_max_fee_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_get_force_close_avoidance_max_fee_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelConfig_set_force_close_avoidance_max_fee_satoshis(struct LDKChannelConfig *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelConfig_set_force_close_avoidance_max_fee_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_set_force_close_avoidance_max_fee_satoshis(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelConfig ChannelConfig_new(uint32_t forwarding_fee_proportional_millionths_arg, uint32_t forwarding_fee_base_msat_arg, uint16_t cltv_expiry_delta_arg, bool announced_channel_arg, bool commit_upfront_shutdown_pubkey_arg, uint64_t max_dust_htlc_exposure_msat_arg, uint64_t force_close_avoidance_max_fee_satoshis_arg);
	export function ChannelConfig_new(forwarding_fee_proportional_millionths_arg: number, forwarding_fee_base_msat_arg: number, cltv_expiry_delta_arg: number, announced_channel_arg: boolean, commit_upfront_shutdown_pubkey_arg: boolean, max_dust_htlc_exposure_msat_arg: number, force_close_avoidance_max_fee_satoshis_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_new(forwarding_fee_proportional_millionths_arg, forwarding_fee_base_msat_arg, cltv_expiry_delta_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg, max_dust_htlc_exposure_msat_arg, force_close_avoidance_max_fee_satoshis_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelConfig ChannelConfig_clone(const struct LDKChannelConfig *NONNULL_PTR orig);
	export function ChannelConfig_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_clone(orig);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKChannelConfig ChannelConfig_default(void);
	export function ChannelConfig_default(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_default();
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ChannelConfig_write(const struct LDKChannelConfig *NONNULL_PTR obj);
	export function ChannelConfig_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ChannelConfigDecodeErrorZ ChannelConfig_read(struct LDKu8slice ser);
	export function ChannelConfig_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelConfig_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void UserConfig_free(struct LDKUserConfig this_obj);
	export function UserConfig_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_free(this_obj);
		// debug statements here
	}
	// struct LDKChannelHandshakeConfig UserConfig_get_own_channel_config(const struct LDKUserConfig *NONNULL_PTR this_ptr);
	export function UserConfig_get_own_channel_config(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_get_own_channel_config(this_ptr);
		return nativeResponseValue;
	}
	// void UserConfig_set_own_channel_config(struct LDKUserConfig *NONNULL_PTR this_ptr, struct LDKChannelHandshakeConfig val);
	export function UserConfig_set_own_channel_config(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_set_own_channel_config(this_ptr, val);
		// debug statements here
	}
	// struct LDKChannelHandshakeLimits UserConfig_get_peer_channel_config_limits(const struct LDKUserConfig *NONNULL_PTR this_ptr);
	export function UserConfig_get_peer_channel_config_limits(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_get_peer_channel_config_limits(this_ptr);
		return nativeResponseValue;
	}
	// void UserConfig_set_peer_channel_config_limits(struct LDKUserConfig *NONNULL_PTR this_ptr, struct LDKChannelHandshakeLimits val);
	export function UserConfig_set_peer_channel_config_limits(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_set_peer_channel_config_limits(this_ptr, val);
		// debug statements here
	}
	// struct LDKChannelConfig UserConfig_get_channel_options(const struct LDKUserConfig *NONNULL_PTR this_ptr);
	export function UserConfig_get_channel_options(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_get_channel_options(this_ptr);
		return nativeResponseValue;
	}
	// void UserConfig_set_channel_options(struct LDKUserConfig *NONNULL_PTR this_ptr, struct LDKChannelConfig val);
	export function UserConfig_set_channel_options(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_set_channel_options(this_ptr, val);
		// debug statements here
	}
	// bool UserConfig_get_accept_forwards_to_priv_channels(const struct LDKUserConfig *NONNULL_PTR this_ptr);
	export function UserConfig_get_accept_forwards_to_priv_channels(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_get_accept_forwards_to_priv_channels(this_ptr);
		return nativeResponseValue;
	}
	// void UserConfig_set_accept_forwards_to_priv_channels(struct LDKUserConfig *NONNULL_PTR this_ptr, bool val);
	export function UserConfig_set_accept_forwards_to_priv_channels(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_set_accept_forwards_to_priv_channels(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKUserConfig UserConfig_new(struct LDKChannelHandshakeConfig own_channel_config_arg, struct LDKChannelHandshakeLimits peer_channel_config_limits_arg, struct LDKChannelConfig channel_options_arg, bool accept_forwards_to_priv_channels_arg);
	export function UserConfig_new(own_channel_config_arg: number, peer_channel_config_limits_arg: number, channel_options_arg: number, accept_forwards_to_priv_channels_arg: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_new(own_channel_config_arg, peer_channel_config_limits_arg, channel_options_arg, accept_forwards_to_priv_channels_arg);
		return nativeResponseValue;
	}
	// struct LDKUserConfig UserConfig_clone(const struct LDKUserConfig *NONNULL_PTR orig);
	export function UserConfig_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_clone(orig);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKUserConfig UserConfig_default(void);
	export function UserConfig_default(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UserConfig_default();
		return nativeResponseValue;
	}
	// void BestBlock_free(struct LDKBestBlock this_obj);
	export function BestBlock_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BestBlock_free(this_obj);
		// debug statements here
	}
	// struct LDKBestBlock BestBlock_clone(const struct LDKBestBlock *NONNULL_PTR orig);
	export function BestBlock_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BestBlock_clone(orig);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKBestBlock BestBlock_from_genesis(enum LDKNetwork network);
	export function BestBlock_from_genesis(network: Network): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BestBlock_from_genesis(network);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKBestBlock BestBlock_new(struct LDKThirtyTwoBytes block_hash, uint32_t height);
	export function BestBlock_new(block_hash: Uint8Array, height: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BestBlock_new(encodeArray(block_hash), height);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKThirtyTwoBytes BestBlock_block_hash(const struct LDKBestBlock *NONNULL_PTR this_arg);
	export function BestBlock_block_hash(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BestBlock_block_hash(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES uint32_t BestBlock_height(const struct LDKBestBlock *NONNULL_PTR this_arg);
	export function BestBlock_height(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BestBlock_height(this_arg);
		return nativeResponseValue;
	}
	// enum LDKAccessError AccessError_clone(const enum LDKAccessError *NONNULL_PTR orig);
	export function AccessError_clone(orig: number): AccessError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AccessError_clone(orig);
		return nativeResponseValue;
	}
	// enum LDKAccessError AccessError_unknown_chain(void);
	export function AccessError_unknown_chain(): AccessError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AccessError_unknown_chain();
		return nativeResponseValue;
	}
	// enum LDKAccessError AccessError_unknown_tx(void);
	export function AccessError_unknown_tx(): AccessError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AccessError_unknown_tx();
		return nativeResponseValue;
	}
	// void Access_free(struct LDKAccess this_ptr);
	export function Access_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Access_free(this_ptr);
		// debug statements here
	}
	// void Listen_free(struct LDKListen this_ptr);
	export function Listen_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Listen_free(this_ptr);
		// debug statements here
	}
	// void Confirm_free(struct LDKConfirm this_ptr);
	export function Confirm_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Confirm_free(this_ptr);
		// debug statements here
	}
	// enum LDKChannelMonitorUpdateErr ChannelMonitorUpdateErr_clone(const enum LDKChannelMonitorUpdateErr *NONNULL_PTR orig);
	export function ChannelMonitorUpdateErr_clone(orig: number): ChannelMonitorUpdateErr {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitorUpdateErr_clone(orig);
		return nativeResponseValue;
	}
	// enum LDKChannelMonitorUpdateErr ChannelMonitorUpdateErr_temporary_failure(void);
	export function ChannelMonitorUpdateErr_temporary_failure(): ChannelMonitorUpdateErr {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitorUpdateErr_temporary_failure();
		return nativeResponseValue;
	}
	// enum LDKChannelMonitorUpdateErr ChannelMonitorUpdateErr_permanent_failure(void);
	export function ChannelMonitorUpdateErr_permanent_failure(): ChannelMonitorUpdateErr {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitorUpdateErr_permanent_failure();
		return nativeResponseValue;
	}
	// void Watch_free(struct LDKWatch this_ptr);
	export function Watch_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Watch_free(this_ptr);
		// debug statements here
	}
	// void Filter_free(struct LDKFilter this_ptr);
	export function Filter_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Filter_free(this_ptr);
		// debug statements here
	}
	// void WatchedOutput_free(struct LDKWatchedOutput this_obj);
	export function WatchedOutput_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.WatchedOutput_free(this_obj);
		// debug statements here
	}
	// struct LDKThirtyTwoBytes WatchedOutput_get_block_hash(const struct LDKWatchedOutput *NONNULL_PTR this_ptr);
	export function WatchedOutput_get_block_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.WatchedOutput_get_block_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void WatchedOutput_set_block_hash(struct LDKWatchedOutput *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function WatchedOutput_set_block_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.WatchedOutput_set_block_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKOutPoint WatchedOutput_get_outpoint(const struct LDKWatchedOutput *NONNULL_PTR this_ptr);
	export function WatchedOutput_get_outpoint(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.WatchedOutput_get_outpoint(this_ptr);
		return nativeResponseValue;
	}
	// void WatchedOutput_set_outpoint(struct LDKWatchedOutput *NONNULL_PTR this_ptr, struct LDKOutPoint val);
	export function WatchedOutput_set_outpoint(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.WatchedOutput_set_outpoint(this_ptr, val);
		// debug statements here
	}
	// struct LDKu8slice WatchedOutput_get_script_pubkey(const struct LDKWatchedOutput *NONNULL_PTR this_ptr);
	export function WatchedOutput_get_script_pubkey(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.WatchedOutput_get_script_pubkey(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void WatchedOutput_set_script_pubkey(struct LDKWatchedOutput *NONNULL_PTR this_ptr, struct LDKCVec_u8Z val);
	export function WatchedOutput_set_script_pubkey(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.WatchedOutput_set_script_pubkey(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKWatchedOutput WatchedOutput_new(struct LDKThirtyTwoBytes block_hash_arg, struct LDKOutPoint outpoint_arg, struct LDKCVec_u8Z script_pubkey_arg);
	export function WatchedOutput_new(block_hash_arg: Uint8Array, outpoint_arg: number, script_pubkey_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.WatchedOutput_new(encodeArray(block_hash_arg), outpoint_arg, encodeArray(script_pubkey_arg));
		return nativeResponseValue;
	}
	// struct LDKWatchedOutput WatchedOutput_clone(const struct LDKWatchedOutput *NONNULL_PTR orig);
	export function WatchedOutput_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.WatchedOutput_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t WatchedOutput_hash(const struct LDKWatchedOutput *NONNULL_PTR o);
	export function WatchedOutput_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.WatchedOutput_hash(o);
		return nativeResponseValue;
	}
	// void BroadcasterInterface_free(struct LDKBroadcasterInterface this_ptr);
	export function BroadcasterInterface_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BroadcasterInterface_free(this_ptr);
		// debug statements here
	}
	// enum LDKConfirmationTarget ConfirmationTarget_clone(const enum LDKConfirmationTarget *NONNULL_PTR orig);
	export function ConfirmationTarget_clone(orig: number): ConfirmationTarget {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ConfirmationTarget_clone(orig);
		return nativeResponseValue;
	}
	// enum LDKConfirmationTarget ConfirmationTarget_background(void);
	export function ConfirmationTarget_background(): ConfirmationTarget {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ConfirmationTarget_background();
		return nativeResponseValue;
	}
	// enum LDKConfirmationTarget ConfirmationTarget_normal(void);
	export function ConfirmationTarget_normal(): ConfirmationTarget {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ConfirmationTarget_normal();
		return nativeResponseValue;
	}
	// enum LDKConfirmationTarget ConfirmationTarget_high_priority(void);
	export function ConfirmationTarget_high_priority(): ConfirmationTarget {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ConfirmationTarget_high_priority();
		return nativeResponseValue;
	}
	// bool ConfirmationTarget_eq(const enum LDKConfirmationTarget *NONNULL_PTR a, const enum LDKConfirmationTarget *NONNULL_PTR b);
	export function ConfirmationTarget_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ConfirmationTarget_eq(a, b);
		return nativeResponseValue;
	}
	// void FeeEstimator_free(struct LDKFeeEstimator this_ptr);
	export function FeeEstimator_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FeeEstimator_free(this_ptr);
		// debug statements here
	}
	// void MonitorUpdateId_free(struct LDKMonitorUpdateId this_obj);
	export function MonitorUpdateId_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorUpdateId_free(this_obj);
		// debug statements here
	}
	// struct LDKMonitorUpdateId MonitorUpdateId_clone(const struct LDKMonitorUpdateId *NONNULL_PTR orig);
	export function MonitorUpdateId_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorUpdateId_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t MonitorUpdateId_hash(const struct LDKMonitorUpdateId *NONNULL_PTR o);
	export function MonitorUpdateId_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorUpdateId_hash(o);
		return nativeResponseValue;
	}
	// bool MonitorUpdateId_eq(const struct LDKMonitorUpdateId *NONNULL_PTR a, const struct LDKMonitorUpdateId *NONNULL_PTR b);
	export function MonitorUpdateId_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorUpdateId_eq(a, b);
		return nativeResponseValue;
	}
	// void Persist_free(struct LDKPersist this_ptr);
	export function Persist_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Persist_free(this_ptr);
		// debug statements here
	}
	// void LockedChannelMonitor_free(struct LDKLockedChannelMonitor this_obj);
	export function LockedChannelMonitor_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LockedChannelMonitor_free(this_obj);
		// debug statements here
	}
	// void ChainMonitor_free(struct LDKChainMonitor this_obj);
	export function ChainMonitor_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainMonitor_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChainMonitor ChainMonitor_new(struct LDKCOption_FilterZ chain_source, struct LDKBroadcasterInterface broadcaster, struct LDKLogger logger, struct LDKFeeEstimator feeest, struct LDKPersist persister);
	export function ChainMonitor_new(chain_source: number, broadcaster: number, logger: number, feeest: number, persister: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainMonitor_new(chain_source, broadcaster, logger, feeest, persister);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_BalanceZ ChainMonitor_get_claimable_balances(const struct LDKChainMonitor *NONNULL_PTR this_arg, struct LDKCVec_ChannelDetailsZ ignored_channels);
	export function ChainMonitor_get_claimable_balances(this_arg: number, ignored_channels: number[]): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainMonitor_get_claimable_balances(this_arg, ignored_channels);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_LockedChannelMonitorNoneZ ChainMonitor_get_monitor(const struct LDKChainMonitor *NONNULL_PTR this_arg, struct LDKOutPoint funding_txo);
	export function ChainMonitor_get_monitor(this_arg: number, funding_txo: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainMonitor_get_monitor(this_arg, funding_txo);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_OutPointZ ChainMonitor_list_monitors(const struct LDKChainMonitor *NONNULL_PTR this_arg);
	export function ChainMonitor_list_monitors(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainMonitor_list_monitors(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneAPIErrorZ ChainMonitor_channel_monitor_updated(const struct LDKChainMonitor *NONNULL_PTR this_arg, struct LDKOutPoint funding_txo, struct LDKMonitorUpdateId completed_update_id);
	export function ChainMonitor_channel_monitor_updated(this_arg: number, funding_txo: number, completed_update_id: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainMonitor_channel_monitor_updated(this_arg, funding_txo, completed_update_id);
		return nativeResponseValue;
	}
	// struct LDKListen ChainMonitor_as_Listen(const struct LDKChainMonitor *NONNULL_PTR this_arg);
	export function ChainMonitor_as_Listen(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainMonitor_as_Listen(this_arg);
		return nativeResponseValue;
	}
	// struct LDKConfirm ChainMonitor_as_Confirm(const struct LDKChainMonitor *NONNULL_PTR this_arg);
	export function ChainMonitor_as_Confirm(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainMonitor_as_Confirm(this_arg);
		return nativeResponseValue;
	}
	// struct LDKWatch ChainMonitor_as_Watch(const struct LDKChainMonitor *NONNULL_PTR this_arg);
	export function ChainMonitor_as_Watch(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainMonitor_as_Watch(this_arg);
		return nativeResponseValue;
	}
	// struct LDKEventsProvider ChainMonitor_as_EventsProvider(const struct LDKChainMonitor *NONNULL_PTR this_arg);
	export function ChainMonitor_as_EventsProvider(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainMonitor_as_EventsProvider(this_arg);
		return nativeResponseValue;
	}
	// void ChannelMonitorUpdate_free(struct LDKChannelMonitorUpdate this_obj);
	export function ChannelMonitorUpdate_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitorUpdate_free(this_obj);
		// debug statements here
	}
	// uint64_t ChannelMonitorUpdate_get_update_id(const struct LDKChannelMonitorUpdate *NONNULL_PTR this_ptr);
	export function ChannelMonitorUpdate_get_update_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitorUpdate_get_update_id(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelMonitorUpdate_set_update_id(struct LDKChannelMonitorUpdate *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelMonitorUpdate_set_update_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitorUpdate_set_update_id(this_ptr, val);
		// debug statements here
	}
	// struct LDKChannelMonitorUpdate ChannelMonitorUpdate_clone(const struct LDKChannelMonitorUpdate *NONNULL_PTR orig);
	export function ChannelMonitorUpdate_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitorUpdate_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ChannelMonitorUpdate_write(const struct LDKChannelMonitorUpdate *NONNULL_PTR obj);
	export function ChannelMonitorUpdate_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitorUpdate_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ChannelMonitorUpdateDecodeErrorZ ChannelMonitorUpdate_read(struct LDKu8slice ser);
	export function ChannelMonitorUpdate_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitorUpdate_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void MonitorUpdateError_free(struct LDKMonitorUpdateError this_obj);
	export function MonitorUpdateError_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorUpdateError_free(this_obj);
		// debug statements here
	}
	// struct LDKStr MonitorUpdateError_get_a(const struct LDKMonitorUpdateError *NONNULL_PTR this_ptr);
	export function MonitorUpdateError_get_a(this_ptr: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorUpdateError_get_a(this_ptr);
		return nativeResponseValue;
	}
	// void MonitorUpdateError_set_a(struct LDKMonitorUpdateError *NONNULL_PTR this_ptr, struct LDKStr val);
	export function MonitorUpdateError_set_a(this_ptr: number, val: String): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorUpdateError_set_a(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKMonitorUpdateError MonitorUpdateError_new(struct LDKStr a_arg);
	export function MonitorUpdateError_new(a_arg: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorUpdateError_new(a_arg);
		return nativeResponseValue;
	}
	// struct LDKMonitorUpdateError MonitorUpdateError_clone(const struct LDKMonitorUpdateError *NONNULL_PTR orig);
	export function MonitorUpdateError_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorUpdateError_clone(orig);
		return nativeResponseValue;
	}
	// void MonitorEvent_free(struct LDKMonitorEvent this_ptr);
	export function MonitorEvent_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorEvent_free(this_ptr);
		// debug statements here
	}
	// struct LDKMonitorEvent MonitorEvent_clone(const struct LDKMonitorEvent *NONNULL_PTR orig);
	export function MonitorEvent_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorEvent_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKMonitorEvent MonitorEvent_htlcevent(struct LDKHTLCUpdate a);
	export function MonitorEvent_htlcevent(a: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorEvent_htlcevent(a);
		return nativeResponseValue;
	}
	// struct LDKMonitorEvent MonitorEvent_commitment_tx_confirmed(struct LDKOutPoint a);
	export function MonitorEvent_commitment_tx_confirmed(a: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorEvent_commitment_tx_confirmed(a);
		return nativeResponseValue;
	}
	// struct LDKMonitorEvent MonitorEvent_update_completed(struct LDKOutPoint funding_txo, uint64_t monitor_update_id);
	export function MonitorEvent_update_completed(funding_txo: number, monitor_update_id: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorEvent_update_completed(funding_txo, monitor_update_id);
		return nativeResponseValue;
	}
	// struct LDKMonitorEvent MonitorEvent_update_failed(struct LDKOutPoint a);
	export function MonitorEvent_update_failed(a: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorEvent_update_failed(a);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z MonitorEvent_write(const struct LDKMonitorEvent *NONNULL_PTR obj);
	export function MonitorEvent_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MonitorEvent_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// void HTLCUpdate_free(struct LDKHTLCUpdate this_obj);
	export function HTLCUpdate_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCUpdate_free(this_obj);
		// debug statements here
	}
	// struct LDKHTLCUpdate HTLCUpdate_clone(const struct LDKHTLCUpdate *NONNULL_PTR orig);
	export function HTLCUpdate_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCUpdate_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z HTLCUpdate_write(const struct LDKHTLCUpdate *NONNULL_PTR obj);
	export function HTLCUpdate_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCUpdate_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_HTLCUpdateDecodeErrorZ HTLCUpdate_read(struct LDKu8slice ser);
	export function HTLCUpdate_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCUpdate_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void Balance_free(struct LDKBalance this_ptr);
	export function Balance_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Balance_free(this_ptr);
		// debug statements here
	}
	// struct LDKBalance Balance_clone(const struct LDKBalance *NONNULL_PTR orig);
	export function Balance_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Balance_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKBalance Balance_claimable_on_channel_close(uint64_t claimable_amount_satoshis);
	export function Balance_claimable_on_channel_close(claimable_amount_satoshis: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Balance_claimable_on_channel_close(claimable_amount_satoshis);
		return nativeResponseValue;
	}
	// struct LDKBalance Balance_claimable_awaiting_confirmations(uint64_t claimable_amount_satoshis, uint32_t confirmation_height);
	export function Balance_claimable_awaiting_confirmations(claimable_amount_satoshis: number, confirmation_height: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Balance_claimable_awaiting_confirmations(claimable_amount_satoshis, confirmation_height);
		return nativeResponseValue;
	}
	// struct LDKBalance Balance_contentious_claimable(uint64_t claimable_amount_satoshis, uint32_t timeout_height);
	export function Balance_contentious_claimable(claimable_amount_satoshis: number, timeout_height: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Balance_contentious_claimable(claimable_amount_satoshis, timeout_height);
		return nativeResponseValue;
	}
	// struct LDKBalance Balance_maybe_claimable_htlcawaiting_timeout(uint64_t claimable_amount_satoshis, uint32_t claimable_height);
	export function Balance_maybe_claimable_htlcawaiting_timeout(claimable_amount_satoshis: number, claimable_height: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Balance_maybe_claimable_htlcawaiting_timeout(claimable_amount_satoshis, claimable_height);
		return nativeResponseValue;
	}
	// bool Balance_eq(const struct LDKBalance *NONNULL_PTR a, const struct LDKBalance *NONNULL_PTR b);
	export function Balance_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Balance_eq(a, b);
		return nativeResponseValue;
	}
	// void ChannelMonitor_free(struct LDKChannelMonitor this_obj);
	export function ChannelMonitor_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_free(this_obj);
		// debug statements here
	}
	// struct LDKChannelMonitor ChannelMonitor_clone(const struct LDKChannelMonitor *NONNULL_PTR orig);
	export function ChannelMonitor_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ChannelMonitor_write(const struct LDKChannelMonitor *NONNULL_PTR obj);
	export function ChannelMonitor_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKCResult_NoneMonitorUpdateErrorZ ChannelMonitor_update_monitor(const struct LDKChannelMonitor *NONNULL_PTR this_arg, const struct LDKChannelMonitorUpdate *NONNULL_PTR updates, const struct LDKBroadcasterInterface *NONNULL_PTR broadcaster, const struct LDKFeeEstimator *NONNULL_PTR fee_estimator, const struct LDKLogger *NONNULL_PTR logger);
	export function ChannelMonitor_update_monitor(this_arg: number, updates: number, broadcaster: number, fee_estimator: number, logger: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_update_monitor(this_arg, updates, broadcaster, fee_estimator, logger);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t ChannelMonitor_get_latest_update_id(const struct LDKChannelMonitor *NONNULL_PTR this_arg);
	export function ChannelMonitor_get_latest_update_id(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_get_latest_update_id(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKC2Tuple_OutPointScriptZ ChannelMonitor_get_funding_txo(const struct LDKChannelMonitor *NONNULL_PTR this_arg);
	export function ChannelMonitor_get_funding_txo(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_get_funding_txo(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZZ ChannelMonitor_get_outputs_to_watch(const struct LDKChannelMonitor *NONNULL_PTR this_arg);
	export function ChannelMonitor_get_outputs_to_watch(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_get_outputs_to_watch(this_arg);
		return nativeResponseValue;
	}
	// void ChannelMonitor_load_outputs_to_watch(const struct LDKChannelMonitor *NONNULL_PTR this_arg, const struct LDKFilter *NONNULL_PTR filter);
	export function ChannelMonitor_load_outputs_to_watch(this_arg: number, filter: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_load_outputs_to_watch(this_arg, filter);
		// debug statements here
	}
	// MUST_USE_RES struct LDKCVec_MonitorEventZ ChannelMonitor_get_and_clear_pending_monitor_events(const struct LDKChannelMonitor *NONNULL_PTR this_arg);
	export function ChannelMonitor_get_and_clear_pending_monitor_events(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_get_and_clear_pending_monitor_events(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_EventZ ChannelMonitor_get_and_clear_pending_events(const struct LDKChannelMonitor *NONNULL_PTR this_arg);
	export function ChannelMonitor_get_and_clear_pending_events(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_get_and_clear_pending_events(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_TransactionZ ChannelMonitor_get_latest_holder_commitment_txn(const struct LDKChannelMonitor *NONNULL_PTR this_arg, const struct LDKLogger *NONNULL_PTR logger);
	export function ChannelMonitor_get_latest_holder_commitment_txn(this_arg: number, logger: number): Uint8Array[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_get_latest_holder_commitment_txn(this_arg, logger);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ ChannelMonitor_block_connected(const struct LDKChannelMonitor *NONNULL_PTR this_arg, const uint8_t (*header)[80], struct LDKCVec_C2Tuple_usizeTransactionZZ txdata, uint32_t height, struct LDKBroadcasterInterface broadcaster, struct LDKFeeEstimator fee_estimator, struct LDKLogger logger);
	export function ChannelMonitor_block_connected(this_arg: number, header: Uint8Array, txdata: number[], height: number, broadcaster: number, fee_estimator: number, logger: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_block_connected(this_arg, encodeArray(header), txdata, height, broadcaster, fee_estimator, logger);
		return nativeResponseValue;
	}
	// void ChannelMonitor_block_disconnected(const struct LDKChannelMonitor *NONNULL_PTR this_arg, const uint8_t (*header)[80], uint32_t height, struct LDKBroadcasterInterface broadcaster, struct LDKFeeEstimator fee_estimator, struct LDKLogger logger);
	export function ChannelMonitor_block_disconnected(this_arg: number, header: Uint8Array, height: number, broadcaster: number, fee_estimator: number, logger: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_block_disconnected(this_arg, encodeArray(header), height, broadcaster, fee_estimator, logger);
		// debug statements here
	}
	// MUST_USE_RES struct LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ ChannelMonitor_transactions_confirmed(const struct LDKChannelMonitor *NONNULL_PTR this_arg, const uint8_t (*header)[80], struct LDKCVec_C2Tuple_usizeTransactionZZ txdata, uint32_t height, struct LDKBroadcasterInterface broadcaster, struct LDKFeeEstimator fee_estimator, struct LDKLogger logger);
	export function ChannelMonitor_transactions_confirmed(this_arg: number, header: Uint8Array, txdata: number[], height: number, broadcaster: number, fee_estimator: number, logger: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_transactions_confirmed(this_arg, encodeArray(header), txdata, height, broadcaster, fee_estimator, logger);
		return nativeResponseValue;
	}
	// void ChannelMonitor_transaction_unconfirmed(const struct LDKChannelMonitor *NONNULL_PTR this_arg, const uint8_t (*txid)[32], struct LDKBroadcasterInterface broadcaster, struct LDKFeeEstimator fee_estimator, struct LDKLogger logger);
	export function ChannelMonitor_transaction_unconfirmed(this_arg: number, txid: Uint8Array, broadcaster: number, fee_estimator: number, logger: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_transaction_unconfirmed(this_arg, encodeArray(txid), broadcaster, fee_estimator, logger);
		// debug statements here
	}
	// MUST_USE_RES struct LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ ChannelMonitor_best_block_updated(const struct LDKChannelMonitor *NONNULL_PTR this_arg, const uint8_t (*header)[80], uint32_t height, struct LDKBroadcasterInterface broadcaster, struct LDKFeeEstimator fee_estimator, struct LDKLogger logger);
	export function ChannelMonitor_best_block_updated(this_arg: number, header: Uint8Array, height: number, broadcaster: number, fee_estimator: number, logger: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_best_block_updated(this_arg, encodeArray(header), height, broadcaster, fee_estimator, logger);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_TxidZ ChannelMonitor_get_relevant_txids(const struct LDKChannelMonitor *NONNULL_PTR this_arg);
	export function ChannelMonitor_get_relevant_txids(this_arg: number): Uint8Array[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_get_relevant_txids(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKBestBlock ChannelMonitor_current_best_block(const struct LDKChannelMonitor *NONNULL_PTR this_arg);
	export function ChannelMonitor_current_best_block(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_current_best_block(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_BalanceZ ChannelMonitor_get_claimable_balances(const struct LDKChannelMonitor *NONNULL_PTR this_arg);
	export function ChannelMonitor_get_claimable_balances(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMonitor_get_claimable_balances(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ C2Tuple_BlockHashChannelMonitorZ_read(struct LDKu8slice ser, const struct LDKKeysInterface *NONNULL_PTR arg);
	export function C2Tuple_BlockHashChannelMonitorZ_read(ser: Uint8Array, arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelMonitorZ_read(encodeArray(ser), arg);
		return nativeResponseValue;
	}
	// void OutPoint_free(struct LDKOutPoint this_obj);
	export function OutPoint_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*OutPoint_get_txid(const struct LDKOutPoint *NONNULL_PTR this_ptr))[32];
	export function OutPoint_get_txid(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_get_txid(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void OutPoint_set_txid(struct LDKOutPoint *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function OutPoint_set_txid(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_set_txid(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint16_t OutPoint_get_index(const struct LDKOutPoint *NONNULL_PTR this_ptr);
	export function OutPoint_get_index(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_get_index(this_ptr);
		return nativeResponseValue;
	}
	// void OutPoint_set_index(struct LDKOutPoint *NONNULL_PTR this_ptr, uint16_t val);
	export function OutPoint_set_index(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_set_index(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKOutPoint OutPoint_new(struct LDKThirtyTwoBytes txid_arg, uint16_t index_arg);
	export function OutPoint_new(txid_arg: Uint8Array, index_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_new(encodeArray(txid_arg), index_arg);
		return nativeResponseValue;
	}
	// struct LDKOutPoint OutPoint_clone(const struct LDKOutPoint *NONNULL_PTR orig);
	export function OutPoint_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_clone(orig);
		return nativeResponseValue;
	}
	// bool OutPoint_eq(const struct LDKOutPoint *NONNULL_PTR a, const struct LDKOutPoint *NONNULL_PTR b);
	export function OutPoint_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_eq(a, b);
		return nativeResponseValue;
	}
	// uint64_t OutPoint_hash(const struct LDKOutPoint *NONNULL_PTR o);
	export function OutPoint_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_hash(o);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKThirtyTwoBytes OutPoint_to_channel_id(const struct LDKOutPoint *NONNULL_PTR this_arg);
	export function OutPoint_to_channel_id(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_to_channel_id(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCVec_u8Z OutPoint_write(const struct LDKOutPoint *NONNULL_PTR obj);
	export function OutPoint_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_OutPointDecodeErrorZ OutPoint_read(struct LDKu8slice ser);
	export function OutPoint_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OutPoint_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void DelayedPaymentOutputDescriptor_free(struct LDKDelayedPaymentOutputDescriptor this_obj);
	export function DelayedPaymentOutputDescriptor_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_free(this_obj);
		// debug statements here
	}
	// struct LDKOutPoint DelayedPaymentOutputDescriptor_get_outpoint(const struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr);
	export function DelayedPaymentOutputDescriptor_get_outpoint(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_get_outpoint(this_ptr);
		return nativeResponseValue;
	}
	// void DelayedPaymentOutputDescriptor_set_outpoint(struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr, struct LDKOutPoint val);
	export function DelayedPaymentOutputDescriptor_set_outpoint(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_set_outpoint(this_ptr, val);
		// debug statements here
	}
	// struct LDKPublicKey DelayedPaymentOutputDescriptor_get_per_commitment_point(const struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr);
	export function DelayedPaymentOutputDescriptor_get_per_commitment_point(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_get_per_commitment_point(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void DelayedPaymentOutputDescriptor_set_per_commitment_point(struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function DelayedPaymentOutputDescriptor_set_per_commitment_point(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_set_per_commitment_point(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint16_t DelayedPaymentOutputDescriptor_get_to_self_delay(const struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr);
	export function DelayedPaymentOutputDescriptor_get_to_self_delay(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_get_to_self_delay(this_ptr);
		return nativeResponseValue;
	}
	// void DelayedPaymentOutputDescriptor_set_to_self_delay(struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr, uint16_t val);
	export function DelayedPaymentOutputDescriptor_set_to_self_delay(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_set_to_self_delay(this_ptr, val);
		// debug statements here
	}
	// void DelayedPaymentOutputDescriptor_set_output(struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr, struct LDKTxOut val);
	export function DelayedPaymentOutputDescriptor_set_output(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_set_output(this_ptr, val);
		// debug statements here
	}
	// struct LDKPublicKey DelayedPaymentOutputDescriptor_get_revocation_pubkey(const struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr);
	export function DelayedPaymentOutputDescriptor_get_revocation_pubkey(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_get_revocation_pubkey(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void DelayedPaymentOutputDescriptor_set_revocation_pubkey(struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function DelayedPaymentOutputDescriptor_set_revocation_pubkey(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_set_revocation_pubkey(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*DelayedPaymentOutputDescriptor_get_channel_keys_id(const struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr))[32];
	export function DelayedPaymentOutputDescriptor_get_channel_keys_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_get_channel_keys_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void DelayedPaymentOutputDescriptor_set_channel_keys_id(struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function DelayedPaymentOutputDescriptor_set_channel_keys_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_set_channel_keys_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t DelayedPaymentOutputDescriptor_get_channel_value_satoshis(const struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr);
	export function DelayedPaymentOutputDescriptor_get_channel_value_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_get_channel_value_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void DelayedPaymentOutputDescriptor_set_channel_value_satoshis(struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR this_ptr, uint64_t val);
	export function DelayedPaymentOutputDescriptor_set_channel_value_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_set_channel_value_satoshis(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKDelayedPaymentOutputDescriptor DelayedPaymentOutputDescriptor_new(struct LDKOutPoint outpoint_arg, struct LDKPublicKey per_commitment_point_arg, uint16_t to_self_delay_arg, struct LDKTxOut output_arg, struct LDKPublicKey revocation_pubkey_arg, struct LDKThirtyTwoBytes channel_keys_id_arg, uint64_t channel_value_satoshis_arg);
	export function DelayedPaymentOutputDescriptor_new(outpoint_arg: number, per_commitment_point_arg: Uint8Array, to_self_delay_arg: number, output_arg: number, revocation_pubkey_arg: Uint8Array, channel_keys_id_arg: Uint8Array, channel_value_satoshis_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_new(outpoint_arg, encodeArray(per_commitment_point_arg), to_self_delay_arg, output_arg, encodeArray(revocation_pubkey_arg), encodeArray(channel_keys_id_arg), channel_value_satoshis_arg);
		return nativeResponseValue;
	}
	// struct LDKDelayedPaymentOutputDescriptor DelayedPaymentOutputDescriptor_clone(const struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR orig);
	export function DelayedPaymentOutputDescriptor_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z DelayedPaymentOutputDescriptor_write(const struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR obj);
	export function DelayedPaymentOutputDescriptor_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ DelayedPaymentOutputDescriptor_read(struct LDKu8slice ser);
	export function DelayedPaymentOutputDescriptor_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DelayedPaymentOutputDescriptor_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void StaticPaymentOutputDescriptor_free(struct LDKStaticPaymentOutputDescriptor this_obj);
	export function StaticPaymentOutputDescriptor_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_free(this_obj);
		// debug statements here
	}
	// struct LDKOutPoint StaticPaymentOutputDescriptor_get_outpoint(const struct LDKStaticPaymentOutputDescriptor *NONNULL_PTR this_ptr);
	export function StaticPaymentOutputDescriptor_get_outpoint(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_get_outpoint(this_ptr);
		return nativeResponseValue;
	}
	// void StaticPaymentOutputDescriptor_set_outpoint(struct LDKStaticPaymentOutputDescriptor *NONNULL_PTR this_ptr, struct LDKOutPoint val);
	export function StaticPaymentOutputDescriptor_set_outpoint(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_set_outpoint(this_ptr, val);
		// debug statements here
	}
	// void StaticPaymentOutputDescriptor_set_output(struct LDKStaticPaymentOutputDescriptor *NONNULL_PTR this_ptr, struct LDKTxOut val);
	export function StaticPaymentOutputDescriptor_set_output(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_set_output(this_ptr, val);
		// debug statements here
	}
	// const uint8_t (*StaticPaymentOutputDescriptor_get_channel_keys_id(const struct LDKStaticPaymentOutputDescriptor *NONNULL_PTR this_ptr))[32];
	export function StaticPaymentOutputDescriptor_get_channel_keys_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_get_channel_keys_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void StaticPaymentOutputDescriptor_set_channel_keys_id(struct LDKStaticPaymentOutputDescriptor *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function StaticPaymentOutputDescriptor_set_channel_keys_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_set_channel_keys_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t StaticPaymentOutputDescriptor_get_channel_value_satoshis(const struct LDKStaticPaymentOutputDescriptor *NONNULL_PTR this_ptr);
	export function StaticPaymentOutputDescriptor_get_channel_value_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_get_channel_value_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void StaticPaymentOutputDescriptor_set_channel_value_satoshis(struct LDKStaticPaymentOutputDescriptor *NONNULL_PTR this_ptr, uint64_t val);
	export function StaticPaymentOutputDescriptor_set_channel_value_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_set_channel_value_satoshis(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKStaticPaymentOutputDescriptor StaticPaymentOutputDescriptor_new(struct LDKOutPoint outpoint_arg, struct LDKTxOut output_arg, struct LDKThirtyTwoBytes channel_keys_id_arg, uint64_t channel_value_satoshis_arg);
	export function StaticPaymentOutputDescriptor_new(outpoint_arg: number, output_arg: number, channel_keys_id_arg: Uint8Array, channel_value_satoshis_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_new(outpoint_arg, output_arg, encodeArray(channel_keys_id_arg), channel_value_satoshis_arg);
		return nativeResponseValue;
	}
	// struct LDKStaticPaymentOutputDescriptor StaticPaymentOutputDescriptor_clone(const struct LDKStaticPaymentOutputDescriptor *NONNULL_PTR orig);
	export function StaticPaymentOutputDescriptor_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z StaticPaymentOutputDescriptor_write(const struct LDKStaticPaymentOutputDescriptor *NONNULL_PTR obj);
	export function StaticPaymentOutputDescriptor_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ StaticPaymentOutputDescriptor_read(struct LDKu8slice ser);
	export function StaticPaymentOutputDescriptor_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.StaticPaymentOutputDescriptor_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void SpendableOutputDescriptor_free(struct LDKSpendableOutputDescriptor this_ptr);
	export function SpendableOutputDescriptor_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SpendableOutputDescriptor_free(this_ptr);
		// debug statements here
	}
	// struct LDKSpendableOutputDescriptor SpendableOutputDescriptor_clone(const struct LDKSpendableOutputDescriptor *NONNULL_PTR orig);
	export function SpendableOutputDescriptor_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SpendableOutputDescriptor_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKSpendableOutputDescriptor SpendableOutputDescriptor_static_output(struct LDKOutPoint outpoint, struct LDKTxOut output);
	export function SpendableOutputDescriptor_static_output(outpoint: number, output: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SpendableOutputDescriptor_static_output(outpoint, output);
		return nativeResponseValue;
	}
	// struct LDKSpendableOutputDescriptor SpendableOutputDescriptor_delayed_payment_output(struct LDKDelayedPaymentOutputDescriptor a);
	export function SpendableOutputDescriptor_delayed_payment_output(a: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SpendableOutputDescriptor_delayed_payment_output(a);
		return nativeResponseValue;
	}
	// struct LDKSpendableOutputDescriptor SpendableOutputDescriptor_static_payment_output(struct LDKStaticPaymentOutputDescriptor a);
	export function SpendableOutputDescriptor_static_payment_output(a: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SpendableOutputDescriptor_static_payment_output(a);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z SpendableOutputDescriptor_write(const struct LDKSpendableOutputDescriptor *NONNULL_PTR obj);
	export function SpendableOutputDescriptor_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SpendableOutputDescriptor_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_SpendableOutputDescriptorDecodeErrorZ SpendableOutputDescriptor_read(struct LDKu8slice ser);
	export function SpendableOutputDescriptor_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SpendableOutputDescriptor_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void BaseSign_free(struct LDKBaseSign this_ptr);
	export function BaseSign_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BaseSign_free(this_ptr);
		// debug statements here
	}
	// struct LDKSign Sign_clone(const struct LDKSign *NONNULL_PTR orig);
	export function Sign_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Sign_clone(orig);
		return nativeResponseValue;
	}
	// void Sign_free(struct LDKSign this_ptr);
	export function Sign_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Sign_free(this_ptr);
		// debug statements here
	}
	// void KeysInterface_free(struct LDKKeysInterface this_ptr);
	export function KeysInterface_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysInterface_free(this_ptr);
		// debug statements here
	}
	// void InMemorySigner_free(struct LDKInMemorySigner this_obj);
	export function InMemorySigner_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*InMemorySigner_get_funding_key(const struct LDKInMemorySigner *NONNULL_PTR this_ptr))[32];
	export function InMemorySigner_get_funding_key(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_get_funding_key(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void InMemorySigner_set_funding_key(struct LDKInMemorySigner *NONNULL_PTR this_ptr, struct LDKSecretKey val);
	export function InMemorySigner_set_funding_key(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_set_funding_key(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*InMemorySigner_get_revocation_base_key(const struct LDKInMemorySigner *NONNULL_PTR this_ptr))[32];
	export function InMemorySigner_get_revocation_base_key(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_get_revocation_base_key(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void InMemorySigner_set_revocation_base_key(struct LDKInMemorySigner *NONNULL_PTR this_ptr, struct LDKSecretKey val);
	export function InMemorySigner_set_revocation_base_key(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_set_revocation_base_key(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*InMemorySigner_get_payment_key(const struct LDKInMemorySigner *NONNULL_PTR this_ptr))[32];
	export function InMemorySigner_get_payment_key(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_get_payment_key(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void InMemorySigner_set_payment_key(struct LDKInMemorySigner *NONNULL_PTR this_ptr, struct LDKSecretKey val);
	export function InMemorySigner_set_payment_key(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_set_payment_key(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*InMemorySigner_get_delayed_payment_base_key(const struct LDKInMemorySigner *NONNULL_PTR this_ptr))[32];
	export function InMemorySigner_get_delayed_payment_base_key(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_get_delayed_payment_base_key(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void InMemorySigner_set_delayed_payment_base_key(struct LDKInMemorySigner *NONNULL_PTR this_ptr, struct LDKSecretKey val);
	export function InMemorySigner_set_delayed_payment_base_key(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_set_delayed_payment_base_key(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*InMemorySigner_get_htlc_base_key(const struct LDKInMemorySigner *NONNULL_PTR this_ptr))[32];
	export function InMemorySigner_get_htlc_base_key(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_get_htlc_base_key(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void InMemorySigner_set_htlc_base_key(struct LDKInMemorySigner *NONNULL_PTR this_ptr, struct LDKSecretKey val);
	export function InMemorySigner_set_htlc_base_key(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_set_htlc_base_key(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*InMemorySigner_get_commitment_seed(const struct LDKInMemorySigner *NONNULL_PTR this_ptr))[32];
	export function InMemorySigner_get_commitment_seed(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_get_commitment_seed(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void InMemorySigner_set_commitment_seed(struct LDKInMemorySigner *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function InMemorySigner_set_commitment_seed(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_set_commitment_seed(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKInMemorySigner InMemorySigner_clone(const struct LDKInMemorySigner *NONNULL_PTR orig);
	export function InMemorySigner_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_clone(orig);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKInMemorySigner InMemorySigner_new(struct LDKSecretKey funding_key, struct LDKSecretKey revocation_base_key, struct LDKSecretKey payment_key, struct LDKSecretKey delayed_payment_base_key, struct LDKSecretKey htlc_base_key, struct LDKThirtyTwoBytes commitment_seed, uint64_t channel_value_satoshis, struct LDKThirtyTwoBytes channel_keys_id);
	export function InMemorySigner_new(funding_key: Uint8Array, revocation_base_key: Uint8Array, payment_key: Uint8Array, delayed_payment_base_key: Uint8Array, htlc_base_key: Uint8Array, commitment_seed: Uint8Array, channel_value_satoshis: number, channel_keys_id: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_new(encodeArray(funding_key), encodeArray(revocation_base_key), encodeArray(payment_key), encodeArray(delayed_payment_base_key), encodeArray(htlc_base_key), encodeArray(commitment_seed), channel_value_satoshis, encodeArray(channel_keys_id));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKChannelPublicKeys InMemorySigner_counterparty_pubkeys(const struct LDKInMemorySigner *NONNULL_PTR this_arg);
	export function InMemorySigner_counterparty_pubkeys(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_counterparty_pubkeys(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint16_t InMemorySigner_counterparty_selected_contest_delay(const struct LDKInMemorySigner *NONNULL_PTR this_arg);
	export function InMemorySigner_counterparty_selected_contest_delay(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_counterparty_selected_contest_delay(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint16_t InMemorySigner_holder_selected_contest_delay(const struct LDKInMemorySigner *NONNULL_PTR this_arg);
	export function InMemorySigner_holder_selected_contest_delay(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_holder_selected_contest_delay(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES bool InMemorySigner_is_outbound(const struct LDKInMemorySigner *NONNULL_PTR this_arg);
	export function InMemorySigner_is_outbound(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_is_outbound(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKOutPoint InMemorySigner_funding_outpoint(const struct LDKInMemorySigner *NONNULL_PTR this_arg);
	export function InMemorySigner_funding_outpoint(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_funding_outpoint(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKChannelTransactionParameters InMemorySigner_get_channel_parameters(const struct LDKInMemorySigner *NONNULL_PTR this_arg);
	export function InMemorySigner_get_channel_parameters(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_get_channel_parameters(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_CVec_CVec_u8ZZNoneZ InMemorySigner_sign_counterparty_payment_input(const struct LDKInMemorySigner *NONNULL_PTR this_arg, struct LDKTransaction spend_tx, uintptr_t input_idx, const struct LDKStaticPaymentOutputDescriptor *NONNULL_PTR descriptor);
	export function InMemorySigner_sign_counterparty_payment_input(this_arg: number, spend_tx: Uint8Array, input_idx: number, descriptor: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_sign_counterparty_payment_input(this_arg, encodeArray(spend_tx), input_idx, descriptor);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_CVec_CVec_u8ZZNoneZ InMemorySigner_sign_dynamic_p2wsh_input(const struct LDKInMemorySigner *NONNULL_PTR this_arg, struct LDKTransaction spend_tx, uintptr_t input_idx, const struct LDKDelayedPaymentOutputDescriptor *NONNULL_PTR descriptor);
	export function InMemorySigner_sign_dynamic_p2wsh_input(this_arg: number, spend_tx: Uint8Array, input_idx: number, descriptor: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_sign_dynamic_p2wsh_input(this_arg, encodeArray(spend_tx), input_idx, descriptor);
		return nativeResponseValue;
	}
	// struct LDKBaseSign InMemorySigner_as_BaseSign(const struct LDKInMemorySigner *NONNULL_PTR this_arg);
	export function InMemorySigner_as_BaseSign(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_as_BaseSign(this_arg);
		return nativeResponseValue;
	}
	// struct LDKSign InMemorySigner_as_Sign(const struct LDKInMemorySigner *NONNULL_PTR this_arg);
	export function InMemorySigner_as_Sign(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_as_Sign(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z InMemorySigner_write(const struct LDKInMemorySigner *NONNULL_PTR obj);
	export function InMemorySigner_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_InMemorySignerDecodeErrorZ InMemorySigner_read(struct LDKu8slice ser);
	export function InMemorySigner_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InMemorySigner_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void KeysManager_free(struct LDKKeysManager this_obj);
	export function KeysManager_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysManager_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKKeysManager KeysManager_new(const uint8_t (*seed)[32], uint64_t starting_time_secs, uint32_t starting_time_nanos);
	export function KeysManager_new(seed: Uint8Array, starting_time_secs: number, starting_time_nanos: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysManager_new(encodeArray(seed), starting_time_secs, starting_time_nanos);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKInMemorySigner KeysManager_derive_channel_keys(const struct LDKKeysManager *NONNULL_PTR this_arg, uint64_t channel_value_satoshis, const uint8_t (*params)[32]);
	export function KeysManager_derive_channel_keys(this_arg: number, channel_value_satoshis: number, params: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysManager_derive_channel_keys(this_arg, channel_value_satoshis, encodeArray(params));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_TransactionNoneZ KeysManager_spend_spendable_outputs(const struct LDKKeysManager *NONNULL_PTR this_arg, struct LDKCVec_SpendableOutputDescriptorZ descriptors, struct LDKCVec_TxOutZ outputs, struct LDKCVec_u8Z change_destination_script, uint32_t feerate_sat_per_1000_weight);
	export function KeysManager_spend_spendable_outputs(this_arg: number, descriptors: number[], outputs: number[], change_destination_script: Uint8Array, feerate_sat_per_1000_weight: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysManager_spend_spendable_outputs(this_arg, descriptors, outputs, encodeArray(change_destination_script), feerate_sat_per_1000_weight);
		return nativeResponseValue;
	}
	// struct LDKKeysInterface KeysManager_as_KeysInterface(const struct LDKKeysManager *NONNULL_PTR this_arg);
	export function KeysManager_as_KeysInterface(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.KeysManager_as_KeysInterface(this_arg);
		return nativeResponseValue;
	}
	// void ChannelManager_free(struct LDKChannelManager this_obj);
	export function ChannelManager_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_free(this_obj);
		// debug statements here
	}
	// void ChainParameters_free(struct LDKChainParameters this_obj);
	export function ChainParameters_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainParameters_free(this_obj);
		// debug statements here
	}
	// enum LDKNetwork ChainParameters_get_network(const struct LDKChainParameters *NONNULL_PTR this_ptr);
	export function ChainParameters_get_network(this_ptr: number): Network {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainParameters_get_network(this_ptr);
		return nativeResponseValue;
	}
	// void ChainParameters_set_network(struct LDKChainParameters *NONNULL_PTR this_ptr, enum LDKNetwork val);
	export function ChainParameters_set_network(this_ptr: number, val: Network): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainParameters_set_network(this_ptr, val);
		// debug statements here
	}
	// struct LDKBestBlock ChainParameters_get_best_block(const struct LDKChainParameters *NONNULL_PTR this_ptr);
	export function ChainParameters_get_best_block(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainParameters_get_best_block(this_ptr);
		return nativeResponseValue;
	}
	// void ChainParameters_set_best_block(struct LDKChainParameters *NONNULL_PTR this_ptr, struct LDKBestBlock val);
	export function ChainParameters_set_best_block(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainParameters_set_best_block(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChainParameters ChainParameters_new(enum LDKNetwork network_arg, struct LDKBestBlock best_block_arg);
	export function ChainParameters_new(network_arg: Network, best_block_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainParameters_new(network_arg, best_block_arg);
		return nativeResponseValue;
	}
	// struct LDKChainParameters ChainParameters_clone(const struct LDKChainParameters *NONNULL_PTR orig);
	export function ChainParameters_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChainParameters_clone(orig);
		return nativeResponseValue;
	}
	// void CounterpartyForwardingInfo_free(struct LDKCounterpartyForwardingInfo this_obj);
	export function CounterpartyForwardingInfo_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyForwardingInfo_free(this_obj);
		// debug statements here
	}
	// uint32_t CounterpartyForwardingInfo_get_fee_base_msat(const struct LDKCounterpartyForwardingInfo *NONNULL_PTR this_ptr);
	export function CounterpartyForwardingInfo_get_fee_base_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyForwardingInfo_get_fee_base_msat(this_ptr);
		return nativeResponseValue;
	}
	// void CounterpartyForwardingInfo_set_fee_base_msat(struct LDKCounterpartyForwardingInfo *NONNULL_PTR this_ptr, uint32_t val);
	export function CounterpartyForwardingInfo_set_fee_base_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyForwardingInfo_set_fee_base_msat(this_ptr, val);
		// debug statements here
	}
	// uint32_t CounterpartyForwardingInfo_get_fee_proportional_millionths(const struct LDKCounterpartyForwardingInfo *NONNULL_PTR this_ptr);
	export function CounterpartyForwardingInfo_get_fee_proportional_millionths(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyForwardingInfo_get_fee_proportional_millionths(this_ptr);
		return nativeResponseValue;
	}
	// void CounterpartyForwardingInfo_set_fee_proportional_millionths(struct LDKCounterpartyForwardingInfo *NONNULL_PTR this_ptr, uint32_t val);
	export function CounterpartyForwardingInfo_set_fee_proportional_millionths(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyForwardingInfo_set_fee_proportional_millionths(this_ptr, val);
		// debug statements here
	}
	// uint16_t CounterpartyForwardingInfo_get_cltv_expiry_delta(const struct LDKCounterpartyForwardingInfo *NONNULL_PTR this_ptr);
	export function CounterpartyForwardingInfo_get_cltv_expiry_delta(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyForwardingInfo_get_cltv_expiry_delta(this_ptr);
		return nativeResponseValue;
	}
	// void CounterpartyForwardingInfo_set_cltv_expiry_delta(struct LDKCounterpartyForwardingInfo *NONNULL_PTR this_ptr, uint16_t val);
	export function CounterpartyForwardingInfo_set_cltv_expiry_delta(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyForwardingInfo_set_cltv_expiry_delta(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKCounterpartyForwardingInfo CounterpartyForwardingInfo_new(uint32_t fee_base_msat_arg, uint32_t fee_proportional_millionths_arg, uint16_t cltv_expiry_delta_arg);
	export function CounterpartyForwardingInfo_new(fee_base_msat_arg: number, fee_proportional_millionths_arg: number, cltv_expiry_delta_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyForwardingInfo_new(fee_base_msat_arg, fee_proportional_millionths_arg, cltv_expiry_delta_arg);
		return nativeResponseValue;
	}
	// struct LDKCounterpartyForwardingInfo CounterpartyForwardingInfo_clone(const struct LDKCounterpartyForwardingInfo *NONNULL_PTR orig);
	export function CounterpartyForwardingInfo_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyForwardingInfo_clone(orig);
		return nativeResponseValue;
	}
	// void ChannelCounterparty_free(struct LDKChannelCounterparty this_obj);
	export function ChannelCounterparty_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_free(this_obj);
		// debug statements here
	}
	// struct LDKPublicKey ChannelCounterparty_get_node_id(const struct LDKChannelCounterparty *NONNULL_PTR this_ptr);
	export function ChannelCounterparty_get_node_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_get_node_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelCounterparty_set_node_id(struct LDKChannelCounterparty *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function ChannelCounterparty_set_node_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_set_node_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKInitFeatures ChannelCounterparty_get_features(const struct LDKChannelCounterparty *NONNULL_PTR this_ptr);
	export function ChannelCounterparty_get_features(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_get_features(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelCounterparty_set_features(struct LDKChannelCounterparty *NONNULL_PTR this_ptr, struct LDKInitFeatures val);
	export function ChannelCounterparty_set_features(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_set_features(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelCounterparty_get_unspendable_punishment_reserve(const struct LDKChannelCounterparty *NONNULL_PTR this_ptr);
	export function ChannelCounterparty_get_unspendable_punishment_reserve(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_get_unspendable_punishment_reserve(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelCounterparty_set_unspendable_punishment_reserve(struct LDKChannelCounterparty *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelCounterparty_set_unspendable_punishment_reserve(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_set_unspendable_punishment_reserve(this_ptr, val);
		// debug statements here
	}
	// struct LDKCounterpartyForwardingInfo ChannelCounterparty_get_forwarding_info(const struct LDKChannelCounterparty *NONNULL_PTR this_ptr);
	export function ChannelCounterparty_get_forwarding_info(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_get_forwarding_info(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelCounterparty_set_forwarding_info(struct LDKChannelCounterparty *NONNULL_PTR this_ptr, struct LDKCounterpartyForwardingInfo val);
	export function ChannelCounterparty_set_forwarding_info(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_set_forwarding_info(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelCounterparty ChannelCounterparty_new(struct LDKPublicKey node_id_arg, struct LDKInitFeatures features_arg, uint64_t unspendable_punishment_reserve_arg, struct LDKCounterpartyForwardingInfo forwarding_info_arg);
	export function ChannelCounterparty_new(node_id_arg: Uint8Array, features_arg: number, unspendable_punishment_reserve_arg: number, forwarding_info_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_new(encodeArray(node_id_arg), features_arg, unspendable_punishment_reserve_arg, forwarding_info_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelCounterparty ChannelCounterparty_clone(const struct LDKChannelCounterparty *NONNULL_PTR orig);
	export function ChannelCounterparty_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelCounterparty_clone(orig);
		return nativeResponseValue;
	}
	// void ChannelDetails_free(struct LDKChannelDetails this_obj);
	export function ChannelDetails_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*ChannelDetails_get_channel_id(const struct LDKChannelDetails *NONNULL_PTR this_ptr))[32];
	export function ChannelDetails_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelDetails_set_channel_id(struct LDKChannelDetails *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function ChannelDetails_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKChannelCounterparty ChannelDetails_get_counterparty(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_counterparty(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_counterparty(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_counterparty(struct LDKChannelDetails *NONNULL_PTR this_ptr, struct LDKChannelCounterparty val);
	export function ChannelDetails_set_counterparty(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_counterparty(this_ptr, val);
		// debug statements here
	}
	// struct LDKOutPoint ChannelDetails_get_funding_txo(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_funding_txo(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_funding_txo(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_funding_txo(struct LDKChannelDetails *NONNULL_PTR this_ptr, struct LDKOutPoint val);
	export function ChannelDetails_set_funding_txo(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_funding_txo(this_ptr, val);
		// debug statements here
	}
	// struct LDKCOption_u64Z ChannelDetails_get_short_channel_id(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_short_channel_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_short_channel_id(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_short_channel_id(struct LDKChannelDetails *NONNULL_PTR this_ptr, struct LDKCOption_u64Z val);
	export function ChannelDetails_set_short_channel_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_short_channel_id(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelDetails_get_channel_value_satoshis(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_channel_value_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_channel_value_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_channel_value_satoshis(struct LDKChannelDetails *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelDetails_set_channel_value_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_channel_value_satoshis(this_ptr, val);
		// debug statements here
	}
	// struct LDKCOption_u64Z ChannelDetails_get_unspendable_punishment_reserve(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_unspendable_punishment_reserve(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_unspendable_punishment_reserve(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_unspendable_punishment_reserve(struct LDKChannelDetails *NONNULL_PTR this_ptr, struct LDKCOption_u64Z val);
	export function ChannelDetails_set_unspendable_punishment_reserve(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_unspendable_punishment_reserve(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelDetails_get_user_channel_id(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_user_channel_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_user_channel_id(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_user_channel_id(struct LDKChannelDetails *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelDetails_set_user_channel_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_user_channel_id(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelDetails_get_outbound_capacity_msat(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_outbound_capacity_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_outbound_capacity_msat(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_outbound_capacity_msat(struct LDKChannelDetails *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelDetails_set_outbound_capacity_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_outbound_capacity_msat(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelDetails_get_inbound_capacity_msat(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_inbound_capacity_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_inbound_capacity_msat(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_inbound_capacity_msat(struct LDKChannelDetails *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelDetails_set_inbound_capacity_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_inbound_capacity_msat(this_ptr, val);
		// debug statements here
	}
	// struct LDKCOption_u32Z ChannelDetails_get_confirmations_required(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_confirmations_required(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_confirmations_required(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_confirmations_required(struct LDKChannelDetails *NONNULL_PTR this_ptr, struct LDKCOption_u32Z val);
	export function ChannelDetails_set_confirmations_required(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_confirmations_required(this_ptr, val);
		// debug statements here
	}
	// struct LDKCOption_u16Z ChannelDetails_get_force_close_spend_delay(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_force_close_spend_delay(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_force_close_spend_delay(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_force_close_spend_delay(struct LDKChannelDetails *NONNULL_PTR this_ptr, struct LDKCOption_u16Z val);
	export function ChannelDetails_set_force_close_spend_delay(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_force_close_spend_delay(this_ptr, val);
		// debug statements here
	}
	// bool ChannelDetails_get_is_outbound(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_is_outbound(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_is_outbound(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_is_outbound(struct LDKChannelDetails *NONNULL_PTR this_ptr, bool val);
	export function ChannelDetails_set_is_outbound(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_is_outbound(this_ptr, val);
		// debug statements here
	}
	// bool ChannelDetails_get_is_funding_locked(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_is_funding_locked(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_is_funding_locked(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_is_funding_locked(struct LDKChannelDetails *NONNULL_PTR this_ptr, bool val);
	export function ChannelDetails_set_is_funding_locked(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_is_funding_locked(this_ptr, val);
		// debug statements here
	}
	// bool ChannelDetails_get_is_usable(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_is_usable(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_is_usable(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_is_usable(struct LDKChannelDetails *NONNULL_PTR this_ptr, bool val);
	export function ChannelDetails_set_is_usable(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_is_usable(this_ptr, val);
		// debug statements here
	}
	// bool ChannelDetails_get_is_public(const struct LDKChannelDetails *NONNULL_PTR this_ptr);
	export function ChannelDetails_get_is_public(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_get_is_public(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelDetails_set_is_public(struct LDKChannelDetails *NONNULL_PTR this_ptr, bool val);
	export function ChannelDetails_set_is_public(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_set_is_public(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelDetails ChannelDetails_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKChannelCounterparty counterparty_arg, struct LDKOutPoint funding_txo_arg, struct LDKCOption_u64Z short_channel_id_arg, uint64_t channel_value_satoshis_arg, struct LDKCOption_u64Z unspendable_punishment_reserve_arg, uint64_t user_channel_id_arg, uint64_t outbound_capacity_msat_arg, uint64_t inbound_capacity_msat_arg, struct LDKCOption_u32Z confirmations_required_arg, struct LDKCOption_u16Z force_close_spend_delay_arg, bool is_outbound_arg, bool is_funding_locked_arg, bool is_usable_arg, bool is_public_arg);
	export function ChannelDetails_new(channel_id_arg: Uint8Array, counterparty_arg: number, funding_txo_arg: number, short_channel_id_arg: number, channel_value_satoshis_arg: number, unspendable_punishment_reserve_arg: number, user_channel_id_arg: number, outbound_capacity_msat_arg: number, inbound_capacity_msat_arg: number, confirmations_required_arg: number, force_close_spend_delay_arg: number, is_outbound_arg: boolean, is_funding_locked_arg: boolean, is_usable_arg: boolean, is_public_arg: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_new(encodeArray(channel_id_arg), counterparty_arg, funding_txo_arg, short_channel_id_arg, channel_value_satoshis_arg, unspendable_punishment_reserve_arg, user_channel_id_arg, outbound_capacity_msat_arg, inbound_capacity_msat_arg, confirmations_required_arg, force_close_spend_delay_arg, is_outbound_arg, is_funding_locked_arg, is_usable_arg, is_public_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelDetails ChannelDetails_clone(const struct LDKChannelDetails *NONNULL_PTR orig);
	export function ChannelDetails_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelDetails_clone(orig);
		return nativeResponseValue;
	}
	// void PaymentSendFailure_free(struct LDKPaymentSendFailure this_ptr);
	export function PaymentSendFailure_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentSendFailure_free(this_ptr);
		// debug statements here
	}
	// struct LDKPaymentSendFailure PaymentSendFailure_clone(const struct LDKPaymentSendFailure *NONNULL_PTR orig);
	export function PaymentSendFailure_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentSendFailure_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKPaymentSendFailure PaymentSendFailure_parameter_error(struct LDKAPIError a);
	export function PaymentSendFailure_parameter_error(a: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentSendFailure_parameter_error(a);
		return nativeResponseValue;
	}
	// struct LDKPaymentSendFailure PaymentSendFailure_path_parameter_error(struct LDKCVec_CResult_NoneAPIErrorZZ a);
	export function PaymentSendFailure_path_parameter_error(a: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentSendFailure_path_parameter_error(a);
		return nativeResponseValue;
	}
	// struct LDKPaymentSendFailure PaymentSendFailure_all_failed_retry_safe(struct LDKCVec_APIErrorZ a);
	export function PaymentSendFailure_all_failed_retry_safe(a: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentSendFailure_all_failed_retry_safe(a);
		return nativeResponseValue;
	}
	// struct LDKPaymentSendFailure PaymentSendFailure_partial_failure(struct LDKCVec_CResult_NoneAPIErrorZZ results, struct LDKRouteParameters failed_paths_retry, struct LDKThirtyTwoBytes payment_id);
	export function PaymentSendFailure_partial_failure(results: number[], failed_paths_retry: number, payment_id: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentSendFailure_partial_failure(results, failed_paths_retry, encodeArray(payment_id));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKChannelManager ChannelManager_new(struct LDKFeeEstimator fee_est, struct LDKWatch chain_monitor, struct LDKBroadcasterInterface tx_broadcaster, struct LDKLogger logger, struct LDKKeysInterface keys_manager, struct LDKUserConfig config, struct LDKChainParameters params);
	export function ChannelManager_new(fee_est: number, chain_monitor: number, tx_broadcaster: number, logger: number, keys_manager: number, config: number, params: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_new(fee_est, chain_monitor, tx_broadcaster, logger, keys_manager, config, params);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKUserConfig ChannelManager_get_current_default_configuration(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_get_current_default_configuration(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_get_current_default_configuration(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult__u832APIErrorZ ChannelManager_create_channel(const struct LDKChannelManager *NONNULL_PTR this_arg, struct LDKPublicKey their_network_key, uint64_t channel_value_satoshis, uint64_t push_msat, uint64_t user_channel_id, struct LDKUserConfig override_config);
	export function ChannelManager_create_channel(this_arg: number, their_network_key: Uint8Array, channel_value_satoshis: number, push_msat: number, user_channel_id: number, override_config: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_create_channel(this_arg, encodeArray(their_network_key), channel_value_satoshis, push_msat, user_channel_id, override_config);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_ChannelDetailsZ ChannelManager_list_channels(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_list_channels(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_list_channels(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_ChannelDetailsZ ChannelManager_list_usable_channels(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_list_usable_channels(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_list_usable_channels(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneAPIErrorZ ChannelManager_close_channel(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*channel_id)[32]);
	export function ChannelManager_close_channel(this_arg: number, channel_id: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_close_channel(this_arg, encodeArray(channel_id));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneAPIErrorZ ChannelManager_close_channel_with_target_feerate(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*channel_id)[32], uint32_t target_feerate_sats_per_1000_weight);
	export function ChannelManager_close_channel_with_target_feerate(this_arg: number, channel_id: Uint8Array, target_feerate_sats_per_1000_weight: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_close_channel_with_target_feerate(this_arg, encodeArray(channel_id), target_feerate_sats_per_1000_weight);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneAPIErrorZ ChannelManager_force_close_channel(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*channel_id)[32]);
	export function ChannelManager_force_close_channel(this_arg: number, channel_id: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_force_close_channel(this_arg, encodeArray(channel_id));
		return nativeResponseValue;
	}
	// void ChannelManager_force_close_all_channels(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_force_close_all_channels(this_arg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_force_close_all_channels(this_arg);
		// debug statements here
	}
	// MUST_USE_RES struct LDKCResult_PaymentIdPaymentSendFailureZ ChannelManager_send_payment(const struct LDKChannelManager *NONNULL_PTR this_arg, const struct LDKRoute *NONNULL_PTR route, struct LDKThirtyTwoBytes payment_hash, struct LDKThirtyTwoBytes payment_secret);
	export function ChannelManager_send_payment(this_arg: number, route: number, payment_hash: Uint8Array, payment_secret: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_send_payment(this_arg, route, encodeArray(payment_hash), encodeArray(payment_secret));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NonePaymentSendFailureZ ChannelManager_retry_payment(const struct LDKChannelManager *NONNULL_PTR this_arg, const struct LDKRoute *NONNULL_PTR route, struct LDKThirtyTwoBytes payment_id);
	export function ChannelManager_retry_payment(this_arg: number, route: number, payment_id: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_retry_payment(this_arg, route, encodeArray(payment_id));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ ChannelManager_send_spontaneous_payment(const struct LDKChannelManager *NONNULL_PTR this_arg, const struct LDKRoute *NONNULL_PTR route, struct LDKThirtyTwoBytes payment_preimage);
	export function ChannelManager_send_spontaneous_payment(this_arg: number, route: number, payment_preimage: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_send_spontaneous_payment(this_arg, route, encodeArray(payment_preimage));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneAPIErrorZ ChannelManager_funding_transaction_generated(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*temporary_channel_id)[32], struct LDKTransaction funding_transaction);
	export function ChannelManager_funding_transaction_generated(this_arg: number, temporary_channel_id: Uint8Array, funding_transaction: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_funding_transaction_generated(this_arg, encodeArray(temporary_channel_id), encodeArray(funding_transaction));
		return nativeResponseValue;
	}
	// void ChannelManager_broadcast_node_announcement(const struct LDKChannelManager *NONNULL_PTR this_arg, struct LDKThreeBytes rgb, struct LDKThirtyTwoBytes alias, struct LDKCVec_NetAddressZ addresses);
	export function ChannelManager_broadcast_node_announcement(this_arg: number, rgb: Uint8Array, alias: Uint8Array, addresses: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_broadcast_node_announcement(this_arg, encodeArray(rgb), encodeArray(alias), addresses);
		// debug statements here
	}
	// void ChannelManager_process_pending_htlc_forwards(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_process_pending_htlc_forwards(this_arg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_process_pending_htlc_forwards(this_arg);
		// debug statements here
	}
	// void ChannelManager_timer_tick_occurred(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_timer_tick_occurred(this_arg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_timer_tick_occurred(this_arg);
		// debug statements here
	}
	// MUST_USE_RES bool ChannelManager_fail_htlc_backwards(const struct LDKChannelManager *NONNULL_PTR this_arg, const uint8_t (*payment_hash)[32]);
	export function ChannelManager_fail_htlc_backwards(this_arg: number, payment_hash: Uint8Array): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_fail_htlc_backwards(this_arg, encodeArray(payment_hash));
		return nativeResponseValue;
	}
	// MUST_USE_RES bool ChannelManager_claim_funds(const struct LDKChannelManager *NONNULL_PTR this_arg, struct LDKThirtyTwoBytes payment_preimage);
	export function ChannelManager_claim_funds(this_arg: number, payment_preimage: Uint8Array): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_claim_funds(this_arg, encodeArray(payment_preimage));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKPublicKey ChannelManager_get_our_node_id(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_get_our_node_id(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_get_our_node_id(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKC2Tuple_PaymentHashPaymentSecretZ ChannelManager_create_inbound_payment(const struct LDKChannelManager *NONNULL_PTR this_arg, struct LDKCOption_u64Z min_value_msat, uint32_t invoice_expiry_delta_secs, uint64_t user_payment_id);
	export function ChannelManager_create_inbound_payment(this_arg: number, min_value_msat: number, invoice_expiry_delta_secs: number, user_payment_id: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_create_inbound_payment(this_arg, min_value_msat, invoice_expiry_delta_secs, user_payment_id);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_PaymentSecretAPIErrorZ ChannelManager_create_inbound_payment_for_hash(const struct LDKChannelManager *NONNULL_PTR this_arg, struct LDKThirtyTwoBytes payment_hash, struct LDKCOption_u64Z min_value_msat, uint32_t invoice_expiry_delta_secs, uint64_t user_payment_id);
	export function ChannelManager_create_inbound_payment_for_hash(this_arg: number, payment_hash: Uint8Array, min_value_msat: number, invoice_expiry_delta_secs: number, user_payment_id: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_create_inbound_payment_for_hash(this_arg, encodeArray(payment_hash), min_value_msat, invoice_expiry_delta_secs, user_payment_id);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEventsProvider ChannelManager_as_MessageSendEventsProvider(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_as_MessageSendEventsProvider(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_as_MessageSendEventsProvider(this_arg);
		return nativeResponseValue;
	}
	// struct LDKEventsProvider ChannelManager_as_EventsProvider(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_as_EventsProvider(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_as_EventsProvider(this_arg);
		return nativeResponseValue;
	}
	// struct LDKListen ChannelManager_as_Listen(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_as_Listen(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_as_Listen(this_arg);
		return nativeResponseValue;
	}
	// struct LDKConfirm ChannelManager_as_Confirm(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_as_Confirm(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_as_Confirm(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES bool ChannelManager_await_persistable_update_timeout(const struct LDKChannelManager *NONNULL_PTR this_arg, uint64_t max_wait);
	export function ChannelManager_await_persistable_update_timeout(this_arg: number, max_wait: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_await_persistable_update_timeout(this_arg, max_wait);
		return nativeResponseValue;
	}
	// void ChannelManager_await_persistable_update(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_await_persistable_update(this_arg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_await_persistable_update(this_arg);
		// debug statements here
	}
	// MUST_USE_RES struct LDKBestBlock ChannelManager_current_best_block(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_current_best_block(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_current_best_block(this_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelMessageHandler ChannelManager_as_ChannelMessageHandler(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_as_ChannelMessageHandler(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_as_ChannelMessageHandler(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ChannelManager_write(const struct LDKChannelManager *NONNULL_PTR obj);
	export function ChannelManager_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelManagerReadArgs_free(struct LDKChannelManagerReadArgs this_obj);
	export function ChannelManagerReadArgs_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_free(this_obj);
		// debug statements here
	}
	// const struct LDKKeysInterface *ChannelManagerReadArgs_get_keys_manager(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	export function ChannelManagerReadArgs_get_keys_manager(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_get_keys_manager(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelManagerReadArgs_set_keys_manager(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKKeysInterface val);
	export function ChannelManagerReadArgs_set_keys_manager(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_set_keys_manager(this_ptr, val);
		// debug statements here
	}
	// const struct LDKFeeEstimator *ChannelManagerReadArgs_get_fee_estimator(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	export function ChannelManagerReadArgs_get_fee_estimator(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_get_fee_estimator(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelManagerReadArgs_set_fee_estimator(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKFeeEstimator val);
	export function ChannelManagerReadArgs_set_fee_estimator(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_set_fee_estimator(this_ptr, val);
		// debug statements here
	}
	// const struct LDKWatch *ChannelManagerReadArgs_get_chain_monitor(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	export function ChannelManagerReadArgs_get_chain_monitor(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_get_chain_monitor(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelManagerReadArgs_set_chain_monitor(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKWatch val);
	export function ChannelManagerReadArgs_set_chain_monitor(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_set_chain_monitor(this_ptr, val);
		// debug statements here
	}
	// const struct LDKBroadcasterInterface *ChannelManagerReadArgs_get_tx_broadcaster(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	export function ChannelManagerReadArgs_get_tx_broadcaster(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_get_tx_broadcaster(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelManagerReadArgs_set_tx_broadcaster(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKBroadcasterInterface val);
	export function ChannelManagerReadArgs_set_tx_broadcaster(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_set_tx_broadcaster(this_ptr, val);
		// debug statements here
	}
	// const struct LDKLogger *ChannelManagerReadArgs_get_logger(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	export function ChannelManagerReadArgs_get_logger(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_get_logger(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelManagerReadArgs_set_logger(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKLogger val);
	export function ChannelManagerReadArgs_set_logger(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_set_logger(this_ptr, val);
		// debug statements here
	}
	// struct LDKUserConfig ChannelManagerReadArgs_get_default_config(const struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr);
	export function ChannelManagerReadArgs_get_default_config(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_get_default_config(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelManagerReadArgs_set_default_config(struct LDKChannelManagerReadArgs *NONNULL_PTR this_ptr, struct LDKUserConfig val);
	export function ChannelManagerReadArgs_set_default_config(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_set_default_config(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelManagerReadArgs ChannelManagerReadArgs_new(struct LDKKeysInterface keys_manager, struct LDKFeeEstimator fee_estimator, struct LDKWatch chain_monitor, struct LDKBroadcasterInterface tx_broadcaster, struct LDKLogger logger, struct LDKUserConfig default_config, struct LDKCVec_ChannelMonitorZ channel_monitors);
	export function ChannelManagerReadArgs_new(keys_manager: number, fee_estimator: number, chain_monitor: number, tx_broadcaster: number, logger: number, default_config: number, channel_monitors: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerReadArgs_new(keys_manager, fee_estimator, chain_monitor, tx_broadcaster, logger, default_config, channel_monitors);
		return nativeResponseValue;
	}
	// struct LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ C2Tuple_BlockHashChannelManagerZ_read(struct LDKu8slice ser, struct LDKChannelManagerReadArgs arg);
	export function C2Tuple_BlockHashChannelManagerZ_read(ser: Uint8Array, arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.C2Tuple_BlockHashChannelManagerZ_read(encodeArray(ser), arg);
		return nativeResponseValue;
	}
	// void DecodeError_free(struct LDKDecodeError this_obj);
	export function DecodeError_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DecodeError_free(this_obj);
		// debug statements here
	}
	// struct LDKDecodeError DecodeError_clone(const struct LDKDecodeError *NONNULL_PTR orig);
	export function DecodeError_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DecodeError_clone(orig);
		return nativeResponseValue;
	}
	// void Init_free(struct LDKInit this_obj);
	export function Init_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Init_free(this_obj);
		// debug statements here
	}
	// struct LDKInitFeatures Init_get_features(const struct LDKInit *NONNULL_PTR this_ptr);
	export function Init_get_features(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Init_get_features(this_ptr);
		return nativeResponseValue;
	}
	// void Init_set_features(struct LDKInit *NONNULL_PTR this_ptr, struct LDKInitFeatures val);
	export function Init_set_features(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Init_set_features(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKInit Init_new(struct LDKInitFeatures features_arg);
	export function Init_new(features_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Init_new(features_arg);
		return nativeResponseValue;
	}
	// struct LDKInit Init_clone(const struct LDKInit *NONNULL_PTR orig);
	export function Init_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Init_clone(orig);
		return nativeResponseValue;
	}
	// void ErrorMessage_free(struct LDKErrorMessage this_obj);
	export function ErrorMessage_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorMessage_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*ErrorMessage_get_channel_id(const struct LDKErrorMessage *NONNULL_PTR this_ptr))[32];
	export function ErrorMessage_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorMessage_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ErrorMessage_set_channel_id(struct LDKErrorMessage *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function ErrorMessage_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorMessage_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKStr ErrorMessage_get_data(const struct LDKErrorMessage *NONNULL_PTR this_ptr);
	export function ErrorMessage_get_data(this_ptr: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorMessage_get_data(this_ptr);
		return nativeResponseValue;
	}
	// void ErrorMessage_set_data(struct LDKErrorMessage *NONNULL_PTR this_ptr, struct LDKStr val);
	export function ErrorMessage_set_data(this_ptr: number, val: String): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorMessage_set_data(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKErrorMessage ErrorMessage_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKStr data_arg);
	export function ErrorMessage_new(channel_id_arg: Uint8Array, data_arg: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorMessage_new(encodeArray(channel_id_arg), data_arg);
		return nativeResponseValue;
	}
	// struct LDKErrorMessage ErrorMessage_clone(const struct LDKErrorMessage *NONNULL_PTR orig);
	export function ErrorMessage_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorMessage_clone(orig);
		return nativeResponseValue;
	}
	// void Ping_free(struct LDKPing this_obj);
	export function Ping_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Ping_free(this_obj);
		// debug statements here
	}
	// uint16_t Ping_get_ponglen(const struct LDKPing *NONNULL_PTR this_ptr);
	export function Ping_get_ponglen(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Ping_get_ponglen(this_ptr);
		return nativeResponseValue;
	}
	// void Ping_set_ponglen(struct LDKPing *NONNULL_PTR this_ptr, uint16_t val);
	export function Ping_set_ponglen(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Ping_set_ponglen(this_ptr, val);
		// debug statements here
	}
	// uint16_t Ping_get_byteslen(const struct LDKPing *NONNULL_PTR this_ptr);
	export function Ping_get_byteslen(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Ping_get_byteslen(this_ptr);
		return nativeResponseValue;
	}
	// void Ping_set_byteslen(struct LDKPing *NONNULL_PTR this_ptr, uint16_t val);
	export function Ping_set_byteslen(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Ping_set_byteslen(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKPing Ping_new(uint16_t ponglen_arg, uint16_t byteslen_arg);
	export function Ping_new(ponglen_arg: number, byteslen_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Ping_new(ponglen_arg, byteslen_arg);
		return nativeResponseValue;
	}
	// struct LDKPing Ping_clone(const struct LDKPing *NONNULL_PTR orig);
	export function Ping_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Ping_clone(orig);
		return nativeResponseValue;
	}
	// void Pong_free(struct LDKPong this_obj);
	export function Pong_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Pong_free(this_obj);
		// debug statements here
	}
	// uint16_t Pong_get_byteslen(const struct LDKPong *NONNULL_PTR this_ptr);
	export function Pong_get_byteslen(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Pong_get_byteslen(this_ptr);
		return nativeResponseValue;
	}
	// void Pong_set_byteslen(struct LDKPong *NONNULL_PTR this_ptr, uint16_t val);
	export function Pong_set_byteslen(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Pong_set_byteslen(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKPong Pong_new(uint16_t byteslen_arg);
	export function Pong_new(byteslen_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Pong_new(byteslen_arg);
		return nativeResponseValue;
	}
	// struct LDKPong Pong_clone(const struct LDKPong *NONNULL_PTR orig);
	export function Pong_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Pong_clone(orig);
		return nativeResponseValue;
	}
	// void OpenChannel_free(struct LDKOpenChannel this_obj);
	export function OpenChannel_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*OpenChannel_get_chain_hash(const struct LDKOpenChannel *NONNULL_PTR this_ptr))[32];
	export function OpenChannel_get_chain_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_chain_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void OpenChannel_set_chain_hash(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function OpenChannel_set_chain_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_chain_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*OpenChannel_get_temporary_channel_id(const struct LDKOpenChannel *NONNULL_PTR this_ptr))[32];
	export function OpenChannel_get_temporary_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_temporary_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void OpenChannel_set_temporary_channel_id(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function OpenChannel_set_temporary_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_temporary_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t OpenChannel_get_funding_satoshis(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_funding_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_funding_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void OpenChannel_set_funding_satoshis(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	export function OpenChannel_set_funding_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_funding_satoshis(this_ptr, val);
		// debug statements here
	}
	// uint64_t OpenChannel_get_push_msat(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_push_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_push_msat(this_ptr);
		return nativeResponseValue;
	}
	// void OpenChannel_set_push_msat(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	export function OpenChannel_set_push_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_push_msat(this_ptr, val);
		// debug statements here
	}
	// uint64_t OpenChannel_get_dust_limit_satoshis(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_dust_limit_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_dust_limit_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void OpenChannel_set_dust_limit_satoshis(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	export function OpenChannel_set_dust_limit_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_dust_limit_satoshis(this_ptr, val);
		// debug statements here
	}
	// uint64_t OpenChannel_get_max_htlc_value_in_flight_msat(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_max_htlc_value_in_flight_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_max_htlc_value_in_flight_msat(this_ptr);
		return nativeResponseValue;
	}
	// void OpenChannel_set_max_htlc_value_in_flight_msat(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	export function OpenChannel_set_max_htlc_value_in_flight_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_max_htlc_value_in_flight_msat(this_ptr, val);
		// debug statements here
	}
	// uint64_t OpenChannel_get_channel_reserve_satoshis(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_channel_reserve_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_channel_reserve_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void OpenChannel_set_channel_reserve_satoshis(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	export function OpenChannel_set_channel_reserve_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_channel_reserve_satoshis(this_ptr, val);
		// debug statements here
	}
	// uint64_t OpenChannel_get_htlc_minimum_msat(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_htlc_minimum_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_htlc_minimum_msat(this_ptr);
		return nativeResponseValue;
	}
	// void OpenChannel_set_htlc_minimum_msat(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint64_t val);
	export function OpenChannel_set_htlc_minimum_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_htlc_minimum_msat(this_ptr, val);
		// debug statements here
	}
	// uint32_t OpenChannel_get_feerate_per_kw(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_feerate_per_kw(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_feerate_per_kw(this_ptr);
		return nativeResponseValue;
	}
	// void OpenChannel_set_feerate_per_kw(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint32_t val);
	export function OpenChannel_set_feerate_per_kw(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_feerate_per_kw(this_ptr, val);
		// debug statements here
	}
	// uint16_t OpenChannel_get_to_self_delay(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_to_self_delay(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_to_self_delay(this_ptr);
		return nativeResponseValue;
	}
	// void OpenChannel_set_to_self_delay(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint16_t val);
	export function OpenChannel_set_to_self_delay(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_to_self_delay(this_ptr, val);
		// debug statements here
	}
	// uint16_t OpenChannel_get_max_accepted_htlcs(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_max_accepted_htlcs(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_max_accepted_htlcs(this_ptr);
		return nativeResponseValue;
	}
	// void OpenChannel_set_max_accepted_htlcs(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint16_t val);
	export function OpenChannel_set_max_accepted_htlcs(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_max_accepted_htlcs(this_ptr, val);
		// debug statements here
	}
	// struct LDKPublicKey OpenChannel_get_funding_pubkey(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_funding_pubkey(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_funding_pubkey(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void OpenChannel_set_funding_pubkey(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function OpenChannel_set_funding_pubkey(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_funding_pubkey(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey OpenChannel_get_revocation_basepoint(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_revocation_basepoint(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_revocation_basepoint(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void OpenChannel_set_revocation_basepoint(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function OpenChannel_set_revocation_basepoint(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_revocation_basepoint(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey OpenChannel_get_payment_point(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_payment_point(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_payment_point(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void OpenChannel_set_payment_point(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function OpenChannel_set_payment_point(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_payment_point(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey OpenChannel_get_delayed_payment_basepoint(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_delayed_payment_basepoint(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_delayed_payment_basepoint(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void OpenChannel_set_delayed_payment_basepoint(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function OpenChannel_set_delayed_payment_basepoint(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_delayed_payment_basepoint(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey OpenChannel_get_htlc_basepoint(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_htlc_basepoint(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_htlc_basepoint(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void OpenChannel_set_htlc_basepoint(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function OpenChannel_set_htlc_basepoint(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_htlc_basepoint(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey OpenChannel_get_first_per_commitment_point(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_first_per_commitment_point(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_first_per_commitment_point(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void OpenChannel_set_first_per_commitment_point(struct LDKOpenChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function OpenChannel_set_first_per_commitment_point(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_first_per_commitment_point(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint8_t OpenChannel_get_channel_flags(const struct LDKOpenChannel *NONNULL_PTR this_ptr);
	export function OpenChannel_get_channel_flags(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_get_channel_flags(this_ptr);
		return nativeResponseValue;
	}
	// void OpenChannel_set_channel_flags(struct LDKOpenChannel *NONNULL_PTR this_ptr, uint8_t val);
	export function OpenChannel_set_channel_flags(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_set_channel_flags(this_ptr, val);
		// debug statements here
	}
	// struct LDKOpenChannel OpenChannel_clone(const struct LDKOpenChannel *NONNULL_PTR orig);
	export function OpenChannel_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_clone(orig);
		return nativeResponseValue;
	}
	// void AcceptChannel_free(struct LDKAcceptChannel this_obj);
	export function AcceptChannel_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*AcceptChannel_get_temporary_channel_id(const struct LDKAcceptChannel *NONNULL_PTR this_ptr))[32];
	export function AcceptChannel_get_temporary_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_temporary_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void AcceptChannel_set_temporary_channel_id(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function AcceptChannel_set_temporary_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_temporary_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t AcceptChannel_get_dust_limit_satoshis(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_dust_limit_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_dust_limit_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void AcceptChannel_set_dust_limit_satoshis(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint64_t val);
	export function AcceptChannel_set_dust_limit_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_dust_limit_satoshis(this_ptr, val);
		// debug statements here
	}
	// uint64_t AcceptChannel_get_max_htlc_value_in_flight_msat(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_max_htlc_value_in_flight_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_max_htlc_value_in_flight_msat(this_ptr);
		return nativeResponseValue;
	}
	// void AcceptChannel_set_max_htlc_value_in_flight_msat(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint64_t val);
	export function AcceptChannel_set_max_htlc_value_in_flight_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_max_htlc_value_in_flight_msat(this_ptr, val);
		// debug statements here
	}
	// uint64_t AcceptChannel_get_channel_reserve_satoshis(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_channel_reserve_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_channel_reserve_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void AcceptChannel_set_channel_reserve_satoshis(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint64_t val);
	export function AcceptChannel_set_channel_reserve_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_channel_reserve_satoshis(this_ptr, val);
		// debug statements here
	}
	// uint64_t AcceptChannel_get_htlc_minimum_msat(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_htlc_minimum_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_htlc_minimum_msat(this_ptr);
		return nativeResponseValue;
	}
	// void AcceptChannel_set_htlc_minimum_msat(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint64_t val);
	export function AcceptChannel_set_htlc_minimum_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_htlc_minimum_msat(this_ptr, val);
		// debug statements here
	}
	// uint32_t AcceptChannel_get_minimum_depth(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_minimum_depth(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_minimum_depth(this_ptr);
		return nativeResponseValue;
	}
	// void AcceptChannel_set_minimum_depth(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint32_t val);
	export function AcceptChannel_set_minimum_depth(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_minimum_depth(this_ptr, val);
		// debug statements here
	}
	// uint16_t AcceptChannel_get_to_self_delay(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_to_self_delay(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_to_self_delay(this_ptr);
		return nativeResponseValue;
	}
	// void AcceptChannel_set_to_self_delay(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint16_t val);
	export function AcceptChannel_set_to_self_delay(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_to_self_delay(this_ptr, val);
		// debug statements here
	}
	// uint16_t AcceptChannel_get_max_accepted_htlcs(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_max_accepted_htlcs(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_max_accepted_htlcs(this_ptr);
		return nativeResponseValue;
	}
	// void AcceptChannel_set_max_accepted_htlcs(struct LDKAcceptChannel *NONNULL_PTR this_ptr, uint16_t val);
	export function AcceptChannel_set_max_accepted_htlcs(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_max_accepted_htlcs(this_ptr, val);
		// debug statements here
	}
	// struct LDKPublicKey AcceptChannel_get_funding_pubkey(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_funding_pubkey(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_funding_pubkey(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void AcceptChannel_set_funding_pubkey(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function AcceptChannel_set_funding_pubkey(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_funding_pubkey(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey AcceptChannel_get_revocation_basepoint(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_revocation_basepoint(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_revocation_basepoint(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void AcceptChannel_set_revocation_basepoint(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function AcceptChannel_set_revocation_basepoint(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_revocation_basepoint(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey AcceptChannel_get_payment_point(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_payment_point(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_payment_point(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void AcceptChannel_set_payment_point(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function AcceptChannel_set_payment_point(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_payment_point(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey AcceptChannel_get_delayed_payment_basepoint(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_delayed_payment_basepoint(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_delayed_payment_basepoint(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void AcceptChannel_set_delayed_payment_basepoint(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function AcceptChannel_set_delayed_payment_basepoint(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_delayed_payment_basepoint(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey AcceptChannel_get_htlc_basepoint(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_htlc_basepoint(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_htlc_basepoint(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void AcceptChannel_set_htlc_basepoint(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function AcceptChannel_set_htlc_basepoint(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_htlc_basepoint(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey AcceptChannel_get_first_per_commitment_point(const struct LDKAcceptChannel *NONNULL_PTR this_ptr);
	export function AcceptChannel_get_first_per_commitment_point(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_get_first_per_commitment_point(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void AcceptChannel_set_first_per_commitment_point(struct LDKAcceptChannel *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function AcceptChannel_set_first_per_commitment_point(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_set_first_per_commitment_point(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKAcceptChannel AcceptChannel_clone(const struct LDKAcceptChannel *NONNULL_PTR orig);
	export function AcceptChannel_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_clone(orig);
		return nativeResponseValue;
	}
	// void FundingCreated_free(struct LDKFundingCreated this_obj);
	export function FundingCreated_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*FundingCreated_get_temporary_channel_id(const struct LDKFundingCreated *NONNULL_PTR this_ptr))[32];
	export function FundingCreated_get_temporary_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_get_temporary_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void FundingCreated_set_temporary_channel_id(struct LDKFundingCreated *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function FundingCreated_set_temporary_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_set_temporary_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*FundingCreated_get_funding_txid(const struct LDKFundingCreated *NONNULL_PTR this_ptr))[32];
	export function FundingCreated_get_funding_txid(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_get_funding_txid(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void FundingCreated_set_funding_txid(struct LDKFundingCreated *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function FundingCreated_set_funding_txid(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_set_funding_txid(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint16_t FundingCreated_get_funding_output_index(const struct LDKFundingCreated *NONNULL_PTR this_ptr);
	export function FundingCreated_get_funding_output_index(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_get_funding_output_index(this_ptr);
		return nativeResponseValue;
	}
	// void FundingCreated_set_funding_output_index(struct LDKFundingCreated *NONNULL_PTR this_ptr, uint16_t val);
	export function FundingCreated_set_funding_output_index(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_set_funding_output_index(this_ptr, val);
		// debug statements here
	}
	// struct LDKSignature FundingCreated_get_signature(const struct LDKFundingCreated *NONNULL_PTR this_ptr);
	export function FundingCreated_get_signature(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_get_signature(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void FundingCreated_set_signature(struct LDKFundingCreated *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function FundingCreated_set_signature(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_set_signature(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKFundingCreated FundingCreated_new(struct LDKThirtyTwoBytes temporary_channel_id_arg, struct LDKThirtyTwoBytes funding_txid_arg, uint16_t funding_output_index_arg, struct LDKSignature signature_arg);
	export function FundingCreated_new(temporary_channel_id_arg: Uint8Array, funding_txid_arg: Uint8Array, funding_output_index_arg: number, signature_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_new(encodeArray(temporary_channel_id_arg), encodeArray(funding_txid_arg), funding_output_index_arg, encodeArray(signature_arg));
		return nativeResponseValue;
	}
	// struct LDKFundingCreated FundingCreated_clone(const struct LDKFundingCreated *NONNULL_PTR orig);
	export function FundingCreated_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_clone(orig);
		return nativeResponseValue;
	}
	// void FundingSigned_free(struct LDKFundingSigned this_obj);
	export function FundingSigned_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingSigned_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*FundingSigned_get_channel_id(const struct LDKFundingSigned *NONNULL_PTR this_ptr))[32];
	export function FundingSigned_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingSigned_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void FundingSigned_set_channel_id(struct LDKFundingSigned *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function FundingSigned_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingSigned_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKSignature FundingSigned_get_signature(const struct LDKFundingSigned *NONNULL_PTR this_ptr);
	export function FundingSigned_get_signature(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingSigned_get_signature(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void FundingSigned_set_signature(struct LDKFundingSigned *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function FundingSigned_set_signature(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingSigned_set_signature(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKFundingSigned FundingSigned_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKSignature signature_arg);
	export function FundingSigned_new(channel_id_arg: Uint8Array, signature_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingSigned_new(encodeArray(channel_id_arg), encodeArray(signature_arg));
		return nativeResponseValue;
	}
	// struct LDKFundingSigned FundingSigned_clone(const struct LDKFundingSigned *NONNULL_PTR orig);
	export function FundingSigned_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingSigned_clone(orig);
		return nativeResponseValue;
	}
	// void FundingLocked_free(struct LDKFundingLocked this_obj);
	export function FundingLocked_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingLocked_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*FundingLocked_get_channel_id(const struct LDKFundingLocked *NONNULL_PTR this_ptr))[32];
	export function FundingLocked_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingLocked_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void FundingLocked_set_channel_id(struct LDKFundingLocked *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function FundingLocked_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingLocked_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey FundingLocked_get_next_per_commitment_point(const struct LDKFundingLocked *NONNULL_PTR this_ptr);
	export function FundingLocked_get_next_per_commitment_point(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingLocked_get_next_per_commitment_point(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void FundingLocked_set_next_per_commitment_point(struct LDKFundingLocked *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function FundingLocked_set_next_per_commitment_point(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingLocked_set_next_per_commitment_point(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKFundingLocked FundingLocked_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKPublicKey next_per_commitment_point_arg);
	export function FundingLocked_new(channel_id_arg: Uint8Array, next_per_commitment_point_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingLocked_new(encodeArray(channel_id_arg), encodeArray(next_per_commitment_point_arg));
		return nativeResponseValue;
	}
	// struct LDKFundingLocked FundingLocked_clone(const struct LDKFundingLocked *NONNULL_PTR orig);
	export function FundingLocked_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingLocked_clone(orig);
		return nativeResponseValue;
	}
	// void Shutdown_free(struct LDKShutdown this_obj);
	export function Shutdown_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Shutdown_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*Shutdown_get_channel_id(const struct LDKShutdown *NONNULL_PTR this_ptr))[32];
	export function Shutdown_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Shutdown_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void Shutdown_set_channel_id(struct LDKShutdown *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function Shutdown_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Shutdown_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKu8slice Shutdown_get_scriptpubkey(const struct LDKShutdown *NONNULL_PTR this_ptr);
	export function Shutdown_get_scriptpubkey(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Shutdown_get_scriptpubkey(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void Shutdown_set_scriptpubkey(struct LDKShutdown *NONNULL_PTR this_ptr, struct LDKCVec_u8Z val);
	export function Shutdown_set_scriptpubkey(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Shutdown_set_scriptpubkey(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKShutdown Shutdown_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKCVec_u8Z scriptpubkey_arg);
	export function Shutdown_new(channel_id_arg: Uint8Array, scriptpubkey_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Shutdown_new(encodeArray(channel_id_arg), encodeArray(scriptpubkey_arg));
		return nativeResponseValue;
	}
	// struct LDKShutdown Shutdown_clone(const struct LDKShutdown *NONNULL_PTR orig);
	export function Shutdown_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Shutdown_clone(orig);
		return nativeResponseValue;
	}
	// void ClosingSignedFeeRange_free(struct LDKClosingSignedFeeRange this_obj);
	export function ClosingSignedFeeRange_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSignedFeeRange_free(this_obj);
		// debug statements here
	}
	// uint64_t ClosingSignedFeeRange_get_min_fee_satoshis(const struct LDKClosingSignedFeeRange *NONNULL_PTR this_ptr);
	export function ClosingSignedFeeRange_get_min_fee_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSignedFeeRange_get_min_fee_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void ClosingSignedFeeRange_set_min_fee_satoshis(struct LDKClosingSignedFeeRange *NONNULL_PTR this_ptr, uint64_t val);
	export function ClosingSignedFeeRange_set_min_fee_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSignedFeeRange_set_min_fee_satoshis(this_ptr, val);
		// debug statements here
	}
	// uint64_t ClosingSignedFeeRange_get_max_fee_satoshis(const struct LDKClosingSignedFeeRange *NONNULL_PTR this_ptr);
	export function ClosingSignedFeeRange_get_max_fee_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSignedFeeRange_get_max_fee_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void ClosingSignedFeeRange_set_max_fee_satoshis(struct LDKClosingSignedFeeRange *NONNULL_PTR this_ptr, uint64_t val);
	export function ClosingSignedFeeRange_set_max_fee_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSignedFeeRange_set_max_fee_satoshis(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKClosingSignedFeeRange ClosingSignedFeeRange_new(uint64_t min_fee_satoshis_arg, uint64_t max_fee_satoshis_arg);
	export function ClosingSignedFeeRange_new(min_fee_satoshis_arg: number, max_fee_satoshis_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSignedFeeRange_new(min_fee_satoshis_arg, max_fee_satoshis_arg);
		return nativeResponseValue;
	}
	// struct LDKClosingSignedFeeRange ClosingSignedFeeRange_clone(const struct LDKClosingSignedFeeRange *NONNULL_PTR orig);
	export function ClosingSignedFeeRange_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSignedFeeRange_clone(orig);
		return nativeResponseValue;
	}
	// void ClosingSigned_free(struct LDKClosingSigned this_obj);
	export function ClosingSigned_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*ClosingSigned_get_channel_id(const struct LDKClosingSigned *NONNULL_PTR this_ptr))[32];
	export function ClosingSigned_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ClosingSigned_set_channel_id(struct LDKClosingSigned *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function ClosingSigned_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t ClosingSigned_get_fee_satoshis(const struct LDKClosingSigned *NONNULL_PTR this_ptr);
	export function ClosingSigned_get_fee_satoshis(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_get_fee_satoshis(this_ptr);
		return nativeResponseValue;
	}
	// void ClosingSigned_set_fee_satoshis(struct LDKClosingSigned *NONNULL_PTR this_ptr, uint64_t val);
	export function ClosingSigned_set_fee_satoshis(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_set_fee_satoshis(this_ptr, val);
		// debug statements here
	}
	// struct LDKSignature ClosingSigned_get_signature(const struct LDKClosingSigned *NONNULL_PTR this_ptr);
	export function ClosingSigned_get_signature(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_get_signature(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ClosingSigned_set_signature(struct LDKClosingSigned *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function ClosingSigned_set_signature(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_set_signature(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKClosingSignedFeeRange ClosingSigned_get_fee_range(const struct LDKClosingSigned *NONNULL_PTR this_ptr);
	export function ClosingSigned_get_fee_range(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_get_fee_range(this_ptr);
		return nativeResponseValue;
	}
	// void ClosingSigned_set_fee_range(struct LDKClosingSigned *NONNULL_PTR this_ptr, struct LDKClosingSignedFeeRange val);
	export function ClosingSigned_set_fee_range(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_set_fee_range(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKClosingSigned ClosingSigned_new(struct LDKThirtyTwoBytes channel_id_arg, uint64_t fee_satoshis_arg, struct LDKSignature signature_arg, struct LDKClosingSignedFeeRange fee_range_arg);
	export function ClosingSigned_new(channel_id_arg: Uint8Array, fee_satoshis_arg: number, signature_arg: Uint8Array, fee_range_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_new(encodeArray(channel_id_arg), fee_satoshis_arg, encodeArray(signature_arg), fee_range_arg);
		return nativeResponseValue;
	}
	// struct LDKClosingSigned ClosingSigned_clone(const struct LDKClosingSigned *NONNULL_PTR orig);
	export function ClosingSigned_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_clone(orig);
		return nativeResponseValue;
	}
	// void UpdateAddHTLC_free(struct LDKUpdateAddHTLC this_obj);
	export function UpdateAddHTLC_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*UpdateAddHTLC_get_channel_id(const struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr))[32];
	export function UpdateAddHTLC_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UpdateAddHTLC_set_channel_id(struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function UpdateAddHTLC_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t UpdateAddHTLC_get_htlc_id(const struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr);
	export function UpdateAddHTLC_get_htlc_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_get_htlc_id(this_ptr);
		return nativeResponseValue;
	}
	// void UpdateAddHTLC_set_htlc_id(struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr, uint64_t val);
	export function UpdateAddHTLC_set_htlc_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_set_htlc_id(this_ptr, val);
		// debug statements here
	}
	// uint64_t UpdateAddHTLC_get_amount_msat(const struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr);
	export function UpdateAddHTLC_get_amount_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_get_amount_msat(this_ptr);
		return nativeResponseValue;
	}
	// void UpdateAddHTLC_set_amount_msat(struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr, uint64_t val);
	export function UpdateAddHTLC_set_amount_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_set_amount_msat(this_ptr, val);
		// debug statements here
	}
	// const uint8_t (*UpdateAddHTLC_get_payment_hash(const struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr))[32];
	export function UpdateAddHTLC_get_payment_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_get_payment_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UpdateAddHTLC_set_payment_hash(struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function UpdateAddHTLC_set_payment_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_set_payment_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint32_t UpdateAddHTLC_get_cltv_expiry(const struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr);
	export function UpdateAddHTLC_get_cltv_expiry(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_get_cltv_expiry(this_ptr);
		return nativeResponseValue;
	}
	// void UpdateAddHTLC_set_cltv_expiry(struct LDKUpdateAddHTLC *NONNULL_PTR this_ptr, uint32_t val);
	export function UpdateAddHTLC_set_cltv_expiry(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_set_cltv_expiry(this_ptr, val);
		// debug statements here
	}
	// struct LDKUpdateAddHTLC UpdateAddHTLC_clone(const struct LDKUpdateAddHTLC *NONNULL_PTR orig);
	export function UpdateAddHTLC_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_clone(orig);
		return nativeResponseValue;
	}
	// void UpdateFulfillHTLC_free(struct LDKUpdateFulfillHTLC this_obj);
	export function UpdateFulfillHTLC_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*UpdateFulfillHTLC_get_channel_id(const struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr))[32];
	export function UpdateFulfillHTLC_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UpdateFulfillHTLC_set_channel_id(struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function UpdateFulfillHTLC_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t UpdateFulfillHTLC_get_htlc_id(const struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr);
	export function UpdateFulfillHTLC_get_htlc_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_get_htlc_id(this_ptr);
		return nativeResponseValue;
	}
	// void UpdateFulfillHTLC_set_htlc_id(struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr, uint64_t val);
	export function UpdateFulfillHTLC_set_htlc_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_set_htlc_id(this_ptr, val);
		// debug statements here
	}
	// const uint8_t (*UpdateFulfillHTLC_get_payment_preimage(const struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr))[32];
	export function UpdateFulfillHTLC_get_payment_preimage(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_get_payment_preimage(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UpdateFulfillHTLC_set_payment_preimage(struct LDKUpdateFulfillHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function UpdateFulfillHTLC_set_payment_preimage(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_set_payment_preimage(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKUpdateFulfillHTLC UpdateFulfillHTLC_new(struct LDKThirtyTwoBytes channel_id_arg, uint64_t htlc_id_arg, struct LDKThirtyTwoBytes payment_preimage_arg);
	export function UpdateFulfillHTLC_new(channel_id_arg: Uint8Array, htlc_id_arg: number, payment_preimage_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_new(encodeArray(channel_id_arg), htlc_id_arg, encodeArray(payment_preimage_arg));
		return nativeResponseValue;
	}
	// struct LDKUpdateFulfillHTLC UpdateFulfillHTLC_clone(const struct LDKUpdateFulfillHTLC *NONNULL_PTR orig);
	export function UpdateFulfillHTLC_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_clone(orig);
		return nativeResponseValue;
	}
	// void UpdateFailHTLC_free(struct LDKUpdateFailHTLC this_obj);
	export function UpdateFailHTLC_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailHTLC_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*UpdateFailHTLC_get_channel_id(const struct LDKUpdateFailHTLC *NONNULL_PTR this_ptr))[32];
	export function UpdateFailHTLC_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailHTLC_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UpdateFailHTLC_set_channel_id(struct LDKUpdateFailHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function UpdateFailHTLC_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailHTLC_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t UpdateFailHTLC_get_htlc_id(const struct LDKUpdateFailHTLC *NONNULL_PTR this_ptr);
	export function UpdateFailHTLC_get_htlc_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailHTLC_get_htlc_id(this_ptr);
		return nativeResponseValue;
	}
	// void UpdateFailHTLC_set_htlc_id(struct LDKUpdateFailHTLC *NONNULL_PTR this_ptr, uint64_t val);
	export function UpdateFailHTLC_set_htlc_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailHTLC_set_htlc_id(this_ptr, val);
		// debug statements here
	}
	// struct LDKUpdateFailHTLC UpdateFailHTLC_clone(const struct LDKUpdateFailHTLC *NONNULL_PTR orig);
	export function UpdateFailHTLC_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailHTLC_clone(orig);
		return nativeResponseValue;
	}
	// void UpdateFailMalformedHTLC_free(struct LDKUpdateFailMalformedHTLC this_obj);
	export function UpdateFailMalformedHTLC_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailMalformedHTLC_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*UpdateFailMalformedHTLC_get_channel_id(const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr))[32];
	export function UpdateFailMalformedHTLC_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailMalformedHTLC_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UpdateFailMalformedHTLC_set_channel_id(struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function UpdateFailMalformedHTLC_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailMalformedHTLC_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t UpdateFailMalformedHTLC_get_htlc_id(const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr);
	export function UpdateFailMalformedHTLC_get_htlc_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailMalformedHTLC_get_htlc_id(this_ptr);
		return nativeResponseValue;
	}
	// void UpdateFailMalformedHTLC_set_htlc_id(struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr, uint64_t val);
	export function UpdateFailMalformedHTLC_set_htlc_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailMalformedHTLC_set_htlc_id(this_ptr, val);
		// debug statements here
	}
	// uint16_t UpdateFailMalformedHTLC_get_failure_code(const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr);
	export function UpdateFailMalformedHTLC_get_failure_code(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailMalformedHTLC_get_failure_code(this_ptr);
		return nativeResponseValue;
	}
	// void UpdateFailMalformedHTLC_set_failure_code(struct LDKUpdateFailMalformedHTLC *NONNULL_PTR this_ptr, uint16_t val);
	export function UpdateFailMalformedHTLC_set_failure_code(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailMalformedHTLC_set_failure_code(this_ptr, val);
		// debug statements here
	}
	// struct LDKUpdateFailMalformedHTLC UpdateFailMalformedHTLC_clone(const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR orig);
	export function UpdateFailMalformedHTLC_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailMalformedHTLC_clone(orig);
		return nativeResponseValue;
	}
	// void CommitmentSigned_free(struct LDKCommitmentSigned this_obj);
	export function CommitmentSigned_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentSigned_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*CommitmentSigned_get_channel_id(const struct LDKCommitmentSigned *NONNULL_PTR this_ptr))[32];
	export function CommitmentSigned_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentSigned_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void CommitmentSigned_set_channel_id(struct LDKCommitmentSigned *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function CommitmentSigned_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentSigned_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKSignature CommitmentSigned_get_signature(const struct LDKCommitmentSigned *NONNULL_PTR this_ptr);
	export function CommitmentSigned_get_signature(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentSigned_get_signature(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void CommitmentSigned_set_signature(struct LDKCommitmentSigned *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function CommitmentSigned_set_signature(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentSigned_set_signature(this_ptr, encodeArray(val));
		// debug statements here
	}
	// void CommitmentSigned_set_htlc_signatures(struct LDKCommitmentSigned *NONNULL_PTR this_ptr, struct LDKCVec_SignatureZ val);
	export function CommitmentSigned_set_htlc_signatures(this_ptr: number, val: Uint8Array[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentSigned_set_htlc_signatures(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKCommitmentSigned CommitmentSigned_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKSignature signature_arg, struct LDKCVec_SignatureZ htlc_signatures_arg);
	export function CommitmentSigned_new(channel_id_arg: Uint8Array, signature_arg: Uint8Array, htlc_signatures_arg: Uint8Array[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentSigned_new(encodeArray(channel_id_arg), encodeArray(signature_arg), htlc_signatures_arg);
		return nativeResponseValue;
	}
	// struct LDKCommitmentSigned CommitmentSigned_clone(const struct LDKCommitmentSigned *NONNULL_PTR orig);
	export function CommitmentSigned_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentSigned_clone(orig);
		return nativeResponseValue;
	}
	// void RevokeAndACK_free(struct LDKRevokeAndACK this_obj);
	export function RevokeAndACK_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*RevokeAndACK_get_channel_id(const struct LDKRevokeAndACK *NONNULL_PTR this_ptr))[32];
	export function RevokeAndACK_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void RevokeAndACK_set_channel_id(struct LDKRevokeAndACK *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function RevokeAndACK_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*RevokeAndACK_get_per_commitment_secret(const struct LDKRevokeAndACK *NONNULL_PTR this_ptr))[32];
	export function RevokeAndACK_get_per_commitment_secret(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_get_per_commitment_secret(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void RevokeAndACK_set_per_commitment_secret(struct LDKRevokeAndACK *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function RevokeAndACK_set_per_commitment_secret(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_set_per_commitment_secret(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey RevokeAndACK_get_next_per_commitment_point(const struct LDKRevokeAndACK *NONNULL_PTR this_ptr);
	export function RevokeAndACK_get_next_per_commitment_point(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_get_next_per_commitment_point(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void RevokeAndACK_set_next_per_commitment_point(struct LDKRevokeAndACK *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function RevokeAndACK_set_next_per_commitment_point(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_set_next_per_commitment_point(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKRevokeAndACK RevokeAndACK_new(struct LDKThirtyTwoBytes channel_id_arg, struct LDKThirtyTwoBytes per_commitment_secret_arg, struct LDKPublicKey next_per_commitment_point_arg);
	export function RevokeAndACK_new(channel_id_arg: Uint8Array, per_commitment_secret_arg: Uint8Array, next_per_commitment_point_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_new(encodeArray(channel_id_arg), encodeArray(per_commitment_secret_arg), encodeArray(next_per_commitment_point_arg));
		return nativeResponseValue;
	}
	// struct LDKRevokeAndACK RevokeAndACK_clone(const struct LDKRevokeAndACK *NONNULL_PTR orig);
	export function RevokeAndACK_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_clone(orig);
		return nativeResponseValue;
	}
	// void UpdateFee_free(struct LDKUpdateFee this_obj);
	export function UpdateFee_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFee_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*UpdateFee_get_channel_id(const struct LDKUpdateFee *NONNULL_PTR this_ptr))[32];
	export function UpdateFee_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFee_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UpdateFee_set_channel_id(struct LDKUpdateFee *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function UpdateFee_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFee_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint32_t UpdateFee_get_feerate_per_kw(const struct LDKUpdateFee *NONNULL_PTR this_ptr);
	export function UpdateFee_get_feerate_per_kw(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFee_get_feerate_per_kw(this_ptr);
		return nativeResponseValue;
	}
	// void UpdateFee_set_feerate_per_kw(struct LDKUpdateFee *NONNULL_PTR this_ptr, uint32_t val);
	export function UpdateFee_set_feerate_per_kw(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFee_set_feerate_per_kw(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKUpdateFee UpdateFee_new(struct LDKThirtyTwoBytes channel_id_arg, uint32_t feerate_per_kw_arg);
	export function UpdateFee_new(channel_id_arg: Uint8Array, feerate_per_kw_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFee_new(encodeArray(channel_id_arg), feerate_per_kw_arg);
		return nativeResponseValue;
	}
	// struct LDKUpdateFee UpdateFee_clone(const struct LDKUpdateFee *NONNULL_PTR orig);
	export function UpdateFee_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFee_clone(orig);
		return nativeResponseValue;
	}
	// void DataLossProtect_free(struct LDKDataLossProtect this_obj);
	export function DataLossProtect_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DataLossProtect_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*DataLossProtect_get_your_last_per_commitment_secret(const struct LDKDataLossProtect *NONNULL_PTR this_ptr))[32];
	export function DataLossProtect_get_your_last_per_commitment_secret(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DataLossProtect_get_your_last_per_commitment_secret(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void DataLossProtect_set_your_last_per_commitment_secret(struct LDKDataLossProtect *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function DataLossProtect_set_your_last_per_commitment_secret(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DataLossProtect_set_your_last_per_commitment_secret(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey DataLossProtect_get_my_current_per_commitment_point(const struct LDKDataLossProtect *NONNULL_PTR this_ptr);
	export function DataLossProtect_get_my_current_per_commitment_point(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DataLossProtect_get_my_current_per_commitment_point(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void DataLossProtect_set_my_current_per_commitment_point(struct LDKDataLossProtect *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function DataLossProtect_set_my_current_per_commitment_point(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DataLossProtect_set_my_current_per_commitment_point(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKDataLossProtect DataLossProtect_new(struct LDKThirtyTwoBytes your_last_per_commitment_secret_arg, struct LDKPublicKey my_current_per_commitment_point_arg);
	export function DataLossProtect_new(your_last_per_commitment_secret_arg: Uint8Array, my_current_per_commitment_point_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DataLossProtect_new(encodeArray(your_last_per_commitment_secret_arg), encodeArray(my_current_per_commitment_point_arg));
		return nativeResponseValue;
	}
	// struct LDKDataLossProtect DataLossProtect_clone(const struct LDKDataLossProtect *NONNULL_PTR orig);
	export function DataLossProtect_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DataLossProtect_clone(orig);
		return nativeResponseValue;
	}
	// void ChannelReestablish_free(struct LDKChannelReestablish this_obj);
	export function ChannelReestablish_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelReestablish_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*ChannelReestablish_get_channel_id(const struct LDKChannelReestablish *NONNULL_PTR this_ptr))[32];
	export function ChannelReestablish_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelReestablish_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelReestablish_set_channel_id(struct LDKChannelReestablish *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function ChannelReestablish_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelReestablish_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t ChannelReestablish_get_next_local_commitment_number(const struct LDKChannelReestablish *NONNULL_PTR this_ptr);
	export function ChannelReestablish_get_next_local_commitment_number(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelReestablish_get_next_local_commitment_number(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelReestablish_set_next_local_commitment_number(struct LDKChannelReestablish *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelReestablish_set_next_local_commitment_number(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelReestablish_set_next_local_commitment_number(this_ptr, val);
		// debug statements here
	}
	// uint64_t ChannelReestablish_get_next_remote_commitment_number(const struct LDKChannelReestablish *NONNULL_PTR this_ptr);
	export function ChannelReestablish_get_next_remote_commitment_number(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelReestablish_get_next_remote_commitment_number(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelReestablish_set_next_remote_commitment_number(struct LDKChannelReestablish *NONNULL_PTR this_ptr, uint64_t val);
	export function ChannelReestablish_set_next_remote_commitment_number(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelReestablish_set_next_remote_commitment_number(this_ptr, val);
		// debug statements here
	}
	// struct LDKChannelReestablish ChannelReestablish_clone(const struct LDKChannelReestablish *NONNULL_PTR orig);
	export function ChannelReestablish_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelReestablish_clone(orig);
		return nativeResponseValue;
	}
	// void AnnouncementSignatures_free(struct LDKAnnouncementSignatures this_obj);
	export function AnnouncementSignatures_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*AnnouncementSignatures_get_channel_id(const struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr))[32];
	export function AnnouncementSignatures_get_channel_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_get_channel_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void AnnouncementSignatures_set_channel_id(struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function AnnouncementSignatures_set_channel_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_set_channel_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t AnnouncementSignatures_get_short_channel_id(const struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr);
	export function AnnouncementSignatures_get_short_channel_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_get_short_channel_id(this_ptr);
		return nativeResponseValue;
	}
	// void AnnouncementSignatures_set_short_channel_id(struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr, uint64_t val);
	export function AnnouncementSignatures_set_short_channel_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_set_short_channel_id(this_ptr, val);
		// debug statements here
	}
	// struct LDKSignature AnnouncementSignatures_get_node_signature(const struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr);
	export function AnnouncementSignatures_get_node_signature(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_get_node_signature(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void AnnouncementSignatures_set_node_signature(struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function AnnouncementSignatures_set_node_signature(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_set_node_signature(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKSignature AnnouncementSignatures_get_bitcoin_signature(const struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr);
	export function AnnouncementSignatures_get_bitcoin_signature(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_get_bitcoin_signature(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void AnnouncementSignatures_set_bitcoin_signature(struct LDKAnnouncementSignatures *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function AnnouncementSignatures_set_bitcoin_signature(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_set_bitcoin_signature(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKAnnouncementSignatures AnnouncementSignatures_new(struct LDKThirtyTwoBytes channel_id_arg, uint64_t short_channel_id_arg, struct LDKSignature node_signature_arg, struct LDKSignature bitcoin_signature_arg);
	export function AnnouncementSignatures_new(channel_id_arg: Uint8Array, short_channel_id_arg: number, node_signature_arg: Uint8Array, bitcoin_signature_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_new(encodeArray(channel_id_arg), short_channel_id_arg, encodeArray(node_signature_arg), encodeArray(bitcoin_signature_arg));
		return nativeResponseValue;
	}
	// struct LDKAnnouncementSignatures AnnouncementSignatures_clone(const struct LDKAnnouncementSignatures *NONNULL_PTR orig);
	export function AnnouncementSignatures_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_clone(orig);
		return nativeResponseValue;
	}
	// void NetAddress_free(struct LDKNetAddress this_ptr);
	export function NetAddress_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetAddress_free(this_ptr);
		// debug statements here
	}
	// struct LDKNetAddress NetAddress_clone(const struct LDKNetAddress *NONNULL_PTR orig);
	export function NetAddress_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetAddress_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKNetAddress NetAddress_ipv4(struct LDKFourBytes addr, uint16_t port);
	export function NetAddress_ipv4(addr: Uint8Array, port: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetAddress_ipv4(encodeArray(addr), port);
		return nativeResponseValue;
	}
	// struct LDKNetAddress NetAddress_ipv6(struct LDKSixteenBytes addr, uint16_t port);
	export function NetAddress_ipv6(addr: Uint8Array, port: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetAddress_ipv6(encodeArray(addr), port);
		return nativeResponseValue;
	}
	// struct LDKNetAddress NetAddress_onion_v2(struct LDKTenBytes addr, uint16_t port);
	export function NetAddress_onion_v2(addr: Uint8Array, port: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetAddress_onion_v2(encodeArray(addr), port);
		return nativeResponseValue;
	}
	// struct LDKNetAddress NetAddress_onion_v3(struct LDKThirtyTwoBytes ed25519_pubkey, uint16_t checksum, uint8_t version, uint16_t port);
	export function NetAddress_onion_v3(ed25519_pubkey: Uint8Array, checksum: number, version: number, port: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetAddress_onion_v3(encodeArray(ed25519_pubkey), checksum, version, port);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z NetAddress_write(const struct LDKNetAddress *NONNULL_PTR obj);
	export function NetAddress_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetAddress_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_NetAddressDecodeErrorZ NetAddress_read(struct LDKu8slice ser);
	export function NetAddress_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetAddress_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void UnsignedNodeAnnouncement_free(struct LDKUnsignedNodeAnnouncement this_obj);
	export function UnsignedNodeAnnouncement_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_free(this_obj);
		// debug statements here
	}
	// struct LDKNodeFeatures UnsignedNodeAnnouncement_get_features(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr);
	export function UnsignedNodeAnnouncement_get_features(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_get_features(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedNodeAnnouncement_set_features(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKNodeFeatures val);
	export function UnsignedNodeAnnouncement_set_features(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_set_features(this_ptr, val);
		// debug statements here
	}
	// uint32_t UnsignedNodeAnnouncement_get_timestamp(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr);
	export function UnsignedNodeAnnouncement_get_timestamp(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_get_timestamp(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedNodeAnnouncement_set_timestamp(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, uint32_t val);
	export function UnsignedNodeAnnouncement_set_timestamp(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_set_timestamp(this_ptr, val);
		// debug statements here
	}
	// struct LDKPublicKey UnsignedNodeAnnouncement_get_node_id(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr);
	export function UnsignedNodeAnnouncement_get_node_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_get_node_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UnsignedNodeAnnouncement_set_node_id(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function UnsignedNodeAnnouncement_set_node_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_set_node_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*UnsignedNodeAnnouncement_get_rgb(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr))[3];
	export function UnsignedNodeAnnouncement_get_rgb(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_get_rgb(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UnsignedNodeAnnouncement_set_rgb(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKThreeBytes val);
	export function UnsignedNodeAnnouncement_set_rgb(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_set_rgb(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*UnsignedNodeAnnouncement_get_alias(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr))[32];
	export function UnsignedNodeAnnouncement_get_alias(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_get_alias(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UnsignedNodeAnnouncement_set_alias(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function UnsignedNodeAnnouncement_set_alias(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_set_alias(this_ptr, encodeArray(val));
		// debug statements here
	}
	// void UnsignedNodeAnnouncement_set_addresses(struct LDKUnsignedNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKCVec_NetAddressZ val);
	export function UnsignedNodeAnnouncement_set_addresses(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_set_addresses(this_ptr, val);
		// debug statements here
	}
	// struct LDKUnsignedNodeAnnouncement UnsignedNodeAnnouncement_clone(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR orig);
	export function UnsignedNodeAnnouncement_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_clone(orig);
		return nativeResponseValue;
	}
	// void NodeAnnouncement_free(struct LDKNodeAnnouncement this_obj);
	export function NodeAnnouncement_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncement_free(this_obj);
		// debug statements here
	}
	// struct LDKSignature NodeAnnouncement_get_signature(const struct LDKNodeAnnouncement *NONNULL_PTR this_ptr);
	export function NodeAnnouncement_get_signature(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncement_get_signature(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void NodeAnnouncement_set_signature(struct LDKNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function NodeAnnouncement_set_signature(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncement_set_signature(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKUnsignedNodeAnnouncement NodeAnnouncement_get_contents(const struct LDKNodeAnnouncement *NONNULL_PTR this_ptr);
	export function NodeAnnouncement_get_contents(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncement_get_contents(this_ptr);
		return nativeResponseValue;
	}
	// void NodeAnnouncement_set_contents(struct LDKNodeAnnouncement *NONNULL_PTR this_ptr, struct LDKUnsignedNodeAnnouncement val);
	export function NodeAnnouncement_set_contents(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncement_set_contents(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKNodeAnnouncement NodeAnnouncement_new(struct LDKSignature signature_arg, struct LDKUnsignedNodeAnnouncement contents_arg);
	export function NodeAnnouncement_new(signature_arg: Uint8Array, contents_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncement_new(encodeArray(signature_arg), contents_arg);
		return nativeResponseValue;
	}
	// struct LDKNodeAnnouncement NodeAnnouncement_clone(const struct LDKNodeAnnouncement *NONNULL_PTR orig);
	export function NodeAnnouncement_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncement_clone(orig);
		return nativeResponseValue;
	}
	// void UnsignedChannelAnnouncement_free(struct LDKUnsignedChannelAnnouncement this_obj);
	export function UnsignedChannelAnnouncement_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_free(this_obj);
		// debug statements here
	}
	// struct LDKChannelFeatures UnsignedChannelAnnouncement_get_features(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	export function UnsignedChannelAnnouncement_get_features(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_get_features(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedChannelAnnouncement_set_features(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKChannelFeatures val);
	export function UnsignedChannelAnnouncement_set_features(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_set_features(this_ptr, val);
		// debug statements here
	}
	// const uint8_t (*UnsignedChannelAnnouncement_get_chain_hash(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr))[32];
	export function UnsignedChannelAnnouncement_get_chain_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_get_chain_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UnsignedChannelAnnouncement_set_chain_hash(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function UnsignedChannelAnnouncement_set_chain_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_set_chain_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t UnsignedChannelAnnouncement_get_short_channel_id(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	export function UnsignedChannelAnnouncement_get_short_channel_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_get_short_channel_id(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedChannelAnnouncement_set_short_channel_id(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, uint64_t val);
	export function UnsignedChannelAnnouncement_set_short_channel_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_set_short_channel_id(this_ptr, val);
		// debug statements here
	}
	// struct LDKPublicKey UnsignedChannelAnnouncement_get_node_id_1(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	export function UnsignedChannelAnnouncement_get_node_id_1(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_get_node_id_1(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UnsignedChannelAnnouncement_set_node_id_1(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function UnsignedChannelAnnouncement_set_node_id_1(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_set_node_id_1(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey UnsignedChannelAnnouncement_get_node_id_2(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	export function UnsignedChannelAnnouncement_get_node_id_2(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_get_node_id_2(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UnsignedChannelAnnouncement_set_node_id_2(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function UnsignedChannelAnnouncement_set_node_id_2(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_set_node_id_2(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey UnsignedChannelAnnouncement_get_bitcoin_key_1(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	export function UnsignedChannelAnnouncement_get_bitcoin_key_1(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_get_bitcoin_key_1(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UnsignedChannelAnnouncement_set_bitcoin_key_1(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function UnsignedChannelAnnouncement_set_bitcoin_key_1(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_set_bitcoin_key_1(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey UnsignedChannelAnnouncement_get_bitcoin_key_2(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr);
	export function UnsignedChannelAnnouncement_get_bitcoin_key_2(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_get_bitcoin_key_2(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UnsignedChannelAnnouncement_set_bitcoin_key_2(struct LDKUnsignedChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function UnsignedChannelAnnouncement_set_bitcoin_key_2(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_set_bitcoin_key_2(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKUnsignedChannelAnnouncement UnsignedChannelAnnouncement_clone(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR orig);
	export function UnsignedChannelAnnouncement_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_clone(orig);
		return nativeResponseValue;
	}
	// void ChannelAnnouncement_free(struct LDKChannelAnnouncement this_obj);
	export function ChannelAnnouncement_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_free(this_obj);
		// debug statements here
	}
	// struct LDKSignature ChannelAnnouncement_get_node_signature_1(const struct LDKChannelAnnouncement *NONNULL_PTR this_ptr);
	export function ChannelAnnouncement_get_node_signature_1(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_get_node_signature_1(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelAnnouncement_set_node_signature_1(struct LDKChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function ChannelAnnouncement_set_node_signature_1(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_set_node_signature_1(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKSignature ChannelAnnouncement_get_node_signature_2(const struct LDKChannelAnnouncement *NONNULL_PTR this_ptr);
	export function ChannelAnnouncement_get_node_signature_2(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_get_node_signature_2(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelAnnouncement_set_node_signature_2(struct LDKChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function ChannelAnnouncement_set_node_signature_2(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_set_node_signature_2(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKSignature ChannelAnnouncement_get_bitcoin_signature_1(const struct LDKChannelAnnouncement *NONNULL_PTR this_ptr);
	export function ChannelAnnouncement_get_bitcoin_signature_1(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_get_bitcoin_signature_1(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelAnnouncement_set_bitcoin_signature_1(struct LDKChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function ChannelAnnouncement_set_bitcoin_signature_1(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_set_bitcoin_signature_1(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKSignature ChannelAnnouncement_get_bitcoin_signature_2(const struct LDKChannelAnnouncement *NONNULL_PTR this_ptr);
	export function ChannelAnnouncement_get_bitcoin_signature_2(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_get_bitcoin_signature_2(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelAnnouncement_set_bitcoin_signature_2(struct LDKChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function ChannelAnnouncement_set_bitcoin_signature_2(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_set_bitcoin_signature_2(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKUnsignedChannelAnnouncement ChannelAnnouncement_get_contents(const struct LDKChannelAnnouncement *NONNULL_PTR this_ptr);
	export function ChannelAnnouncement_get_contents(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_get_contents(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelAnnouncement_set_contents(struct LDKChannelAnnouncement *NONNULL_PTR this_ptr, struct LDKUnsignedChannelAnnouncement val);
	export function ChannelAnnouncement_set_contents(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_set_contents(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelAnnouncement ChannelAnnouncement_new(struct LDKSignature node_signature_1_arg, struct LDKSignature node_signature_2_arg, struct LDKSignature bitcoin_signature_1_arg, struct LDKSignature bitcoin_signature_2_arg, struct LDKUnsignedChannelAnnouncement contents_arg);
	export function ChannelAnnouncement_new(node_signature_1_arg: Uint8Array, node_signature_2_arg: Uint8Array, bitcoin_signature_1_arg: Uint8Array, bitcoin_signature_2_arg: Uint8Array, contents_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_new(encodeArray(node_signature_1_arg), encodeArray(node_signature_2_arg), encodeArray(bitcoin_signature_1_arg), encodeArray(bitcoin_signature_2_arg), contents_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelAnnouncement ChannelAnnouncement_clone(const struct LDKChannelAnnouncement *NONNULL_PTR orig);
	export function ChannelAnnouncement_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_clone(orig);
		return nativeResponseValue;
	}
	// void UnsignedChannelUpdate_free(struct LDKUnsignedChannelUpdate this_obj);
	export function UnsignedChannelUpdate_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*UnsignedChannelUpdate_get_chain_hash(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr))[32];
	export function UnsignedChannelUpdate_get_chain_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_get_chain_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void UnsignedChannelUpdate_set_chain_hash(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function UnsignedChannelUpdate_set_chain_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_set_chain_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t UnsignedChannelUpdate_get_short_channel_id(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	export function UnsignedChannelUpdate_get_short_channel_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_get_short_channel_id(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedChannelUpdate_set_short_channel_id(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint64_t val);
	export function UnsignedChannelUpdate_set_short_channel_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_set_short_channel_id(this_ptr, val);
		// debug statements here
	}
	// uint32_t UnsignedChannelUpdate_get_timestamp(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	export function UnsignedChannelUpdate_get_timestamp(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_get_timestamp(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedChannelUpdate_set_timestamp(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint32_t val);
	export function UnsignedChannelUpdate_set_timestamp(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_set_timestamp(this_ptr, val);
		// debug statements here
	}
	// uint8_t UnsignedChannelUpdate_get_flags(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	export function UnsignedChannelUpdate_get_flags(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_get_flags(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedChannelUpdate_set_flags(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint8_t val);
	export function UnsignedChannelUpdate_set_flags(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_set_flags(this_ptr, val);
		// debug statements here
	}
	// uint16_t UnsignedChannelUpdate_get_cltv_expiry_delta(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	export function UnsignedChannelUpdate_get_cltv_expiry_delta(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_get_cltv_expiry_delta(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedChannelUpdate_set_cltv_expiry_delta(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint16_t val);
	export function UnsignedChannelUpdate_set_cltv_expiry_delta(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_set_cltv_expiry_delta(this_ptr, val);
		// debug statements here
	}
	// uint64_t UnsignedChannelUpdate_get_htlc_minimum_msat(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	export function UnsignedChannelUpdate_get_htlc_minimum_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_get_htlc_minimum_msat(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedChannelUpdate_set_htlc_minimum_msat(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint64_t val);
	export function UnsignedChannelUpdate_set_htlc_minimum_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_set_htlc_minimum_msat(this_ptr, val);
		// debug statements here
	}
	// uint32_t UnsignedChannelUpdate_get_fee_base_msat(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	export function UnsignedChannelUpdate_get_fee_base_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_get_fee_base_msat(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedChannelUpdate_set_fee_base_msat(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint32_t val);
	export function UnsignedChannelUpdate_set_fee_base_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_set_fee_base_msat(this_ptr, val);
		// debug statements here
	}
	// uint32_t UnsignedChannelUpdate_get_fee_proportional_millionths(const struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr);
	export function UnsignedChannelUpdate_get_fee_proportional_millionths(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_get_fee_proportional_millionths(this_ptr);
		return nativeResponseValue;
	}
	// void UnsignedChannelUpdate_set_fee_proportional_millionths(struct LDKUnsignedChannelUpdate *NONNULL_PTR this_ptr, uint32_t val);
	export function UnsignedChannelUpdate_set_fee_proportional_millionths(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_set_fee_proportional_millionths(this_ptr, val);
		// debug statements here
	}
	// struct LDKUnsignedChannelUpdate UnsignedChannelUpdate_clone(const struct LDKUnsignedChannelUpdate *NONNULL_PTR orig);
	export function UnsignedChannelUpdate_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_clone(orig);
		return nativeResponseValue;
	}
	// void ChannelUpdate_free(struct LDKChannelUpdate this_obj);
	export function ChannelUpdate_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelUpdate_free(this_obj);
		// debug statements here
	}
	// struct LDKSignature ChannelUpdate_get_signature(const struct LDKChannelUpdate *NONNULL_PTR this_ptr);
	export function ChannelUpdate_get_signature(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelUpdate_get_signature(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelUpdate_set_signature(struct LDKChannelUpdate *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function ChannelUpdate_set_signature(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelUpdate_set_signature(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKUnsignedChannelUpdate ChannelUpdate_get_contents(const struct LDKChannelUpdate *NONNULL_PTR this_ptr);
	export function ChannelUpdate_get_contents(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelUpdate_get_contents(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelUpdate_set_contents(struct LDKChannelUpdate *NONNULL_PTR this_ptr, struct LDKUnsignedChannelUpdate val);
	export function ChannelUpdate_set_contents(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelUpdate_set_contents(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelUpdate ChannelUpdate_new(struct LDKSignature signature_arg, struct LDKUnsignedChannelUpdate contents_arg);
	export function ChannelUpdate_new(signature_arg: Uint8Array, contents_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelUpdate_new(encodeArray(signature_arg), contents_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelUpdate ChannelUpdate_clone(const struct LDKChannelUpdate *NONNULL_PTR orig);
	export function ChannelUpdate_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelUpdate_clone(orig);
		return nativeResponseValue;
	}
	// void QueryChannelRange_free(struct LDKQueryChannelRange this_obj);
	export function QueryChannelRange_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*QueryChannelRange_get_chain_hash(const struct LDKQueryChannelRange *NONNULL_PTR this_ptr))[32];
	export function QueryChannelRange_get_chain_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_get_chain_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void QueryChannelRange_set_chain_hash(struct LDKQueryChannelRange *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function QueryChannelRange_set_chain_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_set_chain_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint32_t QueryChannelRange_get_first_blocknum(const struct LDKQueryChannelRange *NONNULL_PTR this_ptr);
	export function QueryChannelRange_get_first_blocknum(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_get_first_blocknum(this_ptr);
		return nativeResponseValue;
	}
	// void QueryChannelRange_set_first_blocknum(struct LDKQueryChannelRange *NONNULL_PTR this_ptr, uint32_t val);
	export function QueryChannelRange_set_first_blocknum(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_set_first_blocknum(this_ptr, val);
		// debug statements here
	}
	// uint32_t QueryChannelRange_get_number_of_blocks(const struct LDKQueryChannelRange *NONNULL_PTR this_ptr);
	export function QueryChannelRange_get_number_of_blocks(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_get_number_of_blocks(this_ptr);
		return nativeResponseValue;
	}
	// void QueryChannelRange_set_number_of_blocks(struct LDKQueryChannelRange *NONNULL_PTR this_ptr, uint32_t val);
	export function QueryChannelRange_set_number_of_blocks(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_set_number_of_blocks(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKQueryChannelRange QueryChannelRange_new(struct LDKThirtyTwoBytes chain_hash_arg, uint32_t first_blocknum_arg, uint32_t number_of_blocks_arg);
	export function QueryChannelRange_new(chain_hash_arg: Uint8Array, first_blocknum_arg: number, number_of_blocks_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_new(encodeArray(chain_hash_arg), first_blocknum_arg, number_of_blocks_arg);
		return nativeResponseValue;
	}
	// struct LDKQueryChannelRange QueryChannelRange_clone(const struct LDKQueryChannelRange *NONNULL_PTR orig);
	export function QueryChannelRange_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_clone(orig);
		return nativeResponseValue;
	}
	// void ReplyChannelRange_free(struct LDKReplyChannelRange this_obj);
	export function ReplyChannelRange_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*ReplyChannelRange_get_chain_hash(const struct LDKReplyChannelRange *NONNULL_PTR this_ptr))[32];
	export function ReplyChannelRange_get_chain_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_get_chain_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ReplyChannelRange_set_chain_hash(struct LDKReplyChannelRange *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function ReplyChannelRange_set_chain_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_set_chain_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint32_t ReplyChannelRange_get_first_blocknum(const struct LDKReplyChannelRange *NONNULL_PTR this_ptr);
	export function ReplyChannelRange_get_first_blocknum(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_get_first_blocknum(this_ptr);
		return nativeResponseValue;
	}
	// void ReplyChannelRange_set_first_blocknum(struct LDKReplyChannelRange *NONNULL_PTR this_ptr, uint32_t val);
	export function ReplyChannelRange_set_first_blocknum(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_set_first_blocknum(this_ptr, val);
		// debug statements here
	}
	// uint32_t ReplyChannelRange_get_number_of_blocks(const struct LDKReplyChannelRange *NONNULL_PTR this_ptr);
	export function ReplyChannelRange_get_number_of_blocks(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_get_number_of_blocks(this_ptr);
		return nativeResponseValue;
	}
	// void ReplyChannelRange_set_number_of_blocks(struct LDKReplyChannelRange *NONNULL_PTR this_ptr, uint32_t val);
	export function ReplyChannelRange_set_number_of_blocks(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_set_number_of_blocks(this_ptr, val);
		// debug statements here
	}
	// bool ReplyChannelRange_get_sync_complete(const struct LDKReplyChannelRange *NONNULL_PTR this_ptr);
	export function ReplyChannelRange_get_sync_complete(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_get_sync_complete(this_ptr);
		return nativeResponseValue;
	}
	// void ReplyChannelRange_set_sync_complete(struct LDKReplyChannelRange *NONNULL_PTR this_ptr, bool val);
	export function ReplyChannelRange_set_sync_complete(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_set_sync_complete(this_ptr, val);
		// debug statements here
	}
	// void ReplyChannelRange_set_short_channel_ids(struct LDKReplyChannelRange *NONNULL_PTR this_ptr, struct LDKCVec_u64Z val);
	export function ReplyChannelRange_set_short_channel_ids(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_set_short_channel_ids(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKReplyChannelRange ReplyChannelRange_new(struct LDKThirtyTwoBytes chain_hash_arg, uint32_t first_blocknum_arg, uint32_t number_of_blocks_arg, bool sync_complete_arg, struct LDKCVec_u64Z short_channel_ids_arg);
	export function ReplyChannelRange_new(chain_hash_arg: Uint8Array, first_blocknum_arg: number, number_of_blocks_arg: number, sync_complete_arg: boolean, short_channel_ids_arg: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_new(encodeArray(chain_hash_arg), first_blocknum_arg, number_of_blocks_arg, sync_complete_arg, short_channel_ids_arg);
		return nativeResponseValue;
	}
	// struct LDKReplyChannelRange ReplyChannelRange_clone(const struct LDKReplyChannelRange *NONNULL_PTR orig);
	export function ReplyChannelRange_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_clone(orig);
		return nativeResponseValue;
	}
	// void QueryShortChannelIds_free(struct LDKQueryShortChannelIds this_obj);
	export function QueryShortChannelIds_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryShortChannelIds_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*QueryShortChannelIds_get_chain_hash(const struct LDKQueryShortChannelIds *NONNULL_PTR this_ptr))[32];
	export function QueryShortChannelIds_get_chain_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryShortChannelIds_get_chain_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void QueryShortChannelIds_set_chain_hash(struct LDKQueryShortChannelIds *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function QueryShortChannelIds_set_chain_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryShortChannelIds_set_chain_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// void QueryShortChannelIds_set_short_channel_ids(struct LDKQueryShortChannelIds *NONNULL_PTR this_ptr, struct LDKCVec_u64Z val);
	export function QueryShortChannelIds_set_short_channel_ids(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryShortChannelIds_set_short_channel_ids(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKQueryShortChannelIds QueryShortChannelIds_new(struct LDKThirtyTwoBytes chain_hash_arg, struct LDKCVec_u64Z short_channel_ids_arg);
	export function QueryShortChannelIds_new(chain_hash_arg: Uint8Array, short_channel_ids_arg: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryShortChannelIds_new(encodeArray(chain_hash_arg), short_channel_ids_arg);
		return nativeResponseValue;
	}
	// struct LDKQueryShortChannelIds QueryShortChannelIds_clone(const struct LDKQueryShortChannelIds *NONNULL_PTR orig);
	export function QueryShortChannelIds_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryShortChannelIds_clone(orig);
		return nativeResponseValue;
	}
	// void ReplyShortChannelIdsEnd_free(struct LDKReplyShortChannelIdsEnd this_obj);
	export function ReplyShortChannelIdsEnd_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyShortChannelIdsEnd_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*ReplyShortChannelIdsEnd_get_chain_hash(const struct LDKReplyShortChannelIdsEnd *NONNULL_PTR this_ptr))[32];
	export function ReplyShortChannelIdsEnd_get_chain_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyShortChannelIdsEnd_get_chain_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ReplyShortChannelIdsEnd_set_chain_hash(struct LDKReplyShortChannelIdsEnd *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function ReplyShortChannelIdsEnd_set_chain_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyShortChannelIdsEnd_set_chain_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// bool ReplyShortChannelIdsEnd_get_full_information(const struct LDKReplyShortChannelIdsEnd *NONNULL_PTR this_ptr);
	export function ReplyShortChannelIdsEnd_get_full_information(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyShortChannelIdsEnd_get_full_information(this_ptr);
		return nativeResponseValue;
	}
	// void ReplyShortChannelIdsEnd_set_full_information(struct LDKReplyShortChannelIdsEnd *NONNULL_PTR this_ptr, bool val);
	export function ReplyShortChannelIdsEnd_set_full_information(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyShortChannelIdsEnd_set_full_information(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKReplyShortChannelIdsEnd ReplyShortChannelIdsEnd_new(struct LDKThirtyTwoBytes chain_hash_arg, bool full_information_arg);
	export function ReplyShortChannelIdsEnd_new(chain_hash_arg: Uint8Array, full_information_arg: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyShortChannelIdsEnd_new(encodeArray(chain_hash_arg), full_information_arg);
		return nativeResponseValue;
	}
	// struct LDKReplyShortChannelIdsEnd ReplyShortChannelIdsEnd_clone(const struct LDKReplyShortChannelIdsEnd *NONNULL_PTR orig);
	export function ReplyShortChannelIdsEnd_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyShortChannelIdsEnd_clone(orig);
		return nativeResponseValue;
	}
	// void GossipTimestampFilter_free(struct LDKGossipTimestampFilter this_obj);
	export function GossipTimestampFilter_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_free(this_obj);
		// debug statements here
	}
	// const uint8_t (*GossipTimestampFilter_get_chain_hash(const struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr))[32];
	export function GossipTimestampFilter_get_chain_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_get_chain_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void GossipTimestampFilter_set_chain_hash(struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function GossipTimestampFilter_set_chain_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_set_chain_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint32_t GossipTimestampFilter_get_first_timestamp(const struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr);
	export function GossipTimestampFilter_get_first_timestamp(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_get_first_timestamp(this_ptr);
		return nativeResponseValue;
	}
	// void GossipTimestampFilter_set_first_timestamp(struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr, uint32_t val);
	export function GossipTimestampFilter_set_first_timestamp(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_set_first_timestamp(this_ptr, val);
		// debug statements here
	}
	// uint32_t GossipTimestampFilter_get_timestamp_range(const struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr);
	export function GossipTimestampFilter_get_timestamp_range(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_get_timestamp_range(this_ptr);
		return nativeResponseValue;
	}
	// void GossipTimestampFilter_set_timestamp_range(struct LDKGossipTimestampFilter *NONNULL_PTR this_ptr, uint32_t val);
	export function GossipTimestampFilter_set_timestamp_range(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_set_timestamp_range(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKGossipTimestampFilter GossipTimestampFilter_new(struct LDKThirtyTwoBytes chain_hash_arg, uint32_t first_timestamp_arg, uint32_t timestamp_range_arg);
	export function GossipTimestampFilter_new(chain_hash_arg: Uint8Array, first_timestamp_arg: number, timestamp_range_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_new(encodeArray(chain_hash_arg), first_timestamp_arg, timestamp_range_arg);
		return nativeResponseValue;
	}
	// struct LDKGossipTimestampFilter GossipTimestampFilter_clone(const struct LDKGossipTimestampFilter *NONNULL_PTR orig);
	export function GossipTimestampFilter_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_clone(orig);
		return nativeResponseValue;
	}
	// void ErrorAction_free(struct LDKErrorAction this_ptr);
	export function ErrorAction_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorAction_free(this_ptr);
		// debug statements here
	}
	// struct LDKErrorAction ErrorAction_clone(const struct LDKErrorAction *NONNULL_PTR orig);
	export function ErrorAction_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorAction_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKErrorAction ErrorAction_disconnect_peer(struct LDKErrorMessage msg);
	export function ErrorAction_disconnect_peer(msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorAction_disconnect_peer(msg);
		return nativeResponseValue;
	}
	// struct LDKErrorAction ErrorAction_ignore_error(void);
	export function ErrorAction_ignore_error(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorAction_ignore_error();
		return nativeResponseValue;
	}
	// struct LDKErrorAction ErrorAction_ignore_and_log(enum LDKLevel a);
	export function ErrorAction_ignore_and_log(a: Level): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorAction_ignore_and_log(a);
		return nativeResponseValue;
	}
	// struct LDKErrorAction ErrorAction_send_error_message(struct LDKErrorMessage msg);
	export function ErrorAction_send_error_message(msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorAction_send_error_message(msg);
		return nativeResponseValue;
	}
	// void LightningError_free(struct LDKLightningError this_obj);
	export function LightningError_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LightningError_free(this_obj);
		// debug statements here
	}
	// struct LDKStr LightningError_get_err(const struct LDKLightningError *NONNULL_PTR this_ptr);
	export function LightningError_get_err(this_ptr: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LightningError_get_err(this_ptr);
		return nativeResponseValue;
	}
	// void LightningError_set_err(struct LDKLightningError *NONNULL_PTR this_ptr, struct LDKStr val);
	export function LightningError_set_err(this_ptr: number, val: String): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LightningError_set_err(this_ptr, val);
		// debug statements here
	}
	// struct LDKErrorAction LightningError_get_action(const struct LDKLightningError *NONNULL_PTR this_ptr);
	export function LightningError_get_action(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LightningError_get_action(this_ptr);
		return nativeResponseValue;
	}
	// void LightningError_set_action(struct LDKLightningError *NONNULL_PTR this_ptr, struct LDKErrorAction val);
	export function LightningError_set_action(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LightningError_set_action(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKLightningError LightningError_new(struct LDKStr err_arg, struct LDKErrorAction action_arg);
	export function LightningError_new(err_arg: String, action_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LightningError_new(err_arg, action_arg);
		return nativeResponseValue;
	}
	// struct LDKLightningError LightningError_clone(const struct LDKLightningError *NONNULL_PTR orig);
	export function LightningError_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LightningError_clone(orig);
		return nativeResponseValue;
	}
	// void CommitmentUpdate_free(struct LDKCommitmentUpdate this_obj);
	export function CommitmentUpdate_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_free(this_obj);
		// debug statements here
	}
	// struct LDKCVec_UpdateAddHTLCZ CommitmentUpdate_get_update_add_htlcs(const struct LDKCommitmentUpdate *NONNULL_PTR this_ptr);
	export function CommitmentUpdate_get_update_add_htlcs(this_ptr: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_get_update_add_htlcs(this_ptr);
		return nativeResponseValue;
	}
	// void CommitmentUpdate_set_update_add_htlcs(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKCVec_UpdateAddHTLCZ val);
	export function CommitmentUpdate_set_update_add_htlcs(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_set_update_add_htlcs(this_ptr, val);
		// debug statements here
	}
	// struct LDKCVec_UpdateFulfillHTLCZ CommitmentUpdate_get_update_fulfill_htlcs(const struct LDKCommitmentUpdate *NONNULL_PTR this_ptr);
	export function CommitmentUpdate_get_update_fulfill_htlcs(this_ptr: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_get_update_fulfill_htlcs(this_ptr);
		return nativeResponseValue;
	}
	// void CommitmentUpdate_set_update_fulfill_htlcs(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKCVec_UpdateFulfillHTLCZ val);
	export function CommitmentUpdate_set_update_fulfill_htlcs(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_set_update_fulfill_htlcs(this_ptr, val);
		// debug statements here
	}
	// struct LDKCVec_UpdateFailHTLCZ CommitmentUpdate_get_update_fail_htlcs(const struct LDKCommitmentUpdate *NONNULL_PTR this_ptr);
	export function CommitmentUpdate_get_update_fail_htlcs(this_ptr: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_get_update_fail_htlcs(this_ptr);
		return nativeResponseValue;
	}
	// void CommitmentUpdate_set_update_fail_htlcs(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKCVec_UpdateFailHTLCZ val);
	export function CommitmentUpdate_set_update_fail_htlcs(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_set_update_fail_htlcs(this_ptr, val);
		// debug statements here
	}
	// struct LDKCVec_UpdateFailMalformedHTLCZ CommitmentUpdate_get_update_fail_malformed_htlcs(const struct LDKCommitmentUpdate *NONNULL_PTR this_ptr);
	export function CommitmentUpdate_get_update_fail_malformed_htlcs(this_ptr: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_get_update_fail_malformed_htlcs(this_ptr);
		return nativeResponseValue;
	}
	// void CommitmentUpdate_set_update_fail_malformed_htlcs(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKCVec_UpdateFailMalformedHTLCZ val);
	export function CommitmentUpdate_set_update_fail_malformed_htlcs(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_set_update_fail_malformed_htlcs(this_ptr, val);
		// debug statements here
	}
	// struct LDKUpdateFee CommitmentUpdate_get_update_fee(const struct LDKCommitmentUpdate *NONNULL_PTR this_ptr);
	export function CommitmentUpdate_get_update_fee(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_get_update_fee(this_ptr);
		return nativeResponseValue;
	}
	// void CommitmentUpdate_set_update_fee(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKUpdateFee val);
	export function CommitmentUpdate_set_update_fee(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_set_update_fee(this_ptr, val);
		// debug statements here
	}
	// struct LDKCommitmentSigned CommitmentUpdate_get_commitment_signed(const struct LDKCommitmentUpdate *NONNULL_PTR this_ptr);
	export function CommitmentUpdate_get_commitment_signed(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_get_commitment_signed(this_ptr);
		return nativeResponseValue;
	}
	// void CommitmentUpdate_set_commitment_signed(struct LDKCommitmentUpdate *NONNULL_PTR this_ptr, struct LDKCommitmentSigned val);
	export function CommitmentUpdate_set_commitment_signed(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_set_commitment_signed(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKCommitmentUpdate CommitmentUpdate_new(struct LDKCVec_UpdateAddHTLCZ update_add_htlcs_arg, struct LDKCVec_UpdateFulfillHTLCZ update_fulfill_htlcs_arg, struct LDKCVec_UpdateFailHTLCZ update_fail_htlcs_arg, struct LDKCVec_UpdateFailMalformedHTLCZ update_fail_malformed_htlcs_arg, struct LDKUpdateFee update_fee_arg, struct LDKCommitmentSigned commitment_signed_arg);
	export function CommitmentUpdate_new(update_add_htlcs_arg: number[], update_fulfill_htlcs_arg: number[], update_fail_htlcs_arg: number[], update_fail_malformed_htlcs_arg: number[], update_fee_arg: number, commitment_signed_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_new(update_add_htlcs_arg, update_fulfill_htlcs_arg, update_fail_htlcs_arg, update_fail_malformed_htlcs_arg, update_fee_arg, commitment_signed_arg);
		return nativeResponseValue;
	}
	// struct LDKCommitmentUpdate CommitmentUpdate_clone(const struct LDKCommitmentUpdate *NONNULL_PTR orig);
	export function CommitmentUpdate_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentUpdate_clone(orig);
		return nativeResponseValue;
	}
	// void ChannelMessageHandler_free(struct LDKChannelMessageHandler this_ptr);
	export function ChannelMessageHandler_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelMessageHandler_free(this_ptr);
		// debug statements here
	}
	// void RoutingMessageHandler_free(struct LDKRoutingMessageHandler this_ptr);
	export function RoutingMessageHandler_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingMessageHandler_free(this_ptr);
		// debug statements here
	}
	// struct LDKCVec_u8Z AcceptChannel_write(const struct LDKAcceptChannel *NONNULL_PTR obj);
	export function AcceptChannel_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_AcceptChannelDecodeErrorZ AcceptChannel_read(struct LDKu8slice ser);
	export function AcceptChannel_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AcceptChannel_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z AnnouncementSignatures_write(const struct LDKAnnouncementSignatures *NONNULL_PTR obj);
	export function AnnouncementSignatures_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_AnnouncementSignaturesDecodeErrorZ AnnouncementSignatures_read(struct LDKu8slice ser);
	export function AnnouncementSignatures_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.AnnouncementSignatures_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ChannelReestablish_write(const struct LDKChannelReestablish *NONNULL_PTR obj);
	export function ChannelReestablish_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelReestablish_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ChannelReestablishDecodeErrorZ ChannelReestablish_read(struct LDKu8slice ser);
	export function ChannelReestablish_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelReestablish_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ClosingSigned_write(const struct LDKClosingSigned *NONNULL_PTR obj);
	export function ClosingSigned_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ClosingSignedDecodeErrorZ ClosingSigned_read(struct LDKu8slice ser);
	export function ClosingSigned_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSigned_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ClosingSignedFeeRange_write(const struct LDKClosingSignedFeeRange *NONNULL_PTR obj);
	export function ClosingSignedFeeRange_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSignedFeeRange_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ClosingSignedFeeRangeDecodeErrorZ ClosingSignedFeeRange_read(struct LDKu8slice ser);
	export function ClosingSignedFeeRange_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingSignedFeeRange_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z CommitmentSigned_write(const struct LDKCommitmentSigned *NONNULL_PTR obj);
	export function CommitmentSigned_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentSigned_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_CommitmentSignedDecodeErrorZ CommitmentSigned_read(struct LDKu8slice ser);
	export function CommitmentSigned_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentSigned_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z FundingCreated_write(const struct LDKFundingCreated *NONNULL_PTR obj);
	export function FundingCreated_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_FundingCreatedDecodeErrorZ FundingCreated_read(struct LDKu8slice ser);
	export function FundingCreated_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingCreated_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z FundingSigned_write(const struct LDKFundingSigned *NONNULL_PTR obj);
	export function FundingSigned_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingSigned_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_FundingSignedDecodeErrorZ FundingSigned_read(struct LDKu8slice ser);
	export function FundingSigned_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingSigned_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z FundingLocked_write(const struct LDKFundingLocked *NONNULL_PTR obj);
	export function FundingLocked_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingLocked_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_FundingLockedDecodeErrorZ FundingLocked_read(struct LDKu8slice ser);
	export function FundingLocked_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FundingLocked_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z Init_write(const struct LDKInit *NONNULL_PTR obj);
	export function Init_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Init_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_InitDecodeErrorZ Init_read(struct LDKu8slice ser);
	export function Init_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Init_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z OpenChannel_write(const struct LDKOpenChannel *NONNULL_PTR obj);
	export function OpenChannel_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_OpenChannelDecodeErrorZ OpenChannel_read(struct LDKu8slice ser);
	export function OpenChannel_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.OpenChannel_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z RevokeAndACK_write(const struct LDKRevokeAndACK *NONNULL_PTR obj);
	export function RevokeAndACK_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_RevokeAndACKDecodeErrorZ RevokeAndACK_read(struct LDKu8slice ser);
	export function RevokeAndACK_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RevokeAndACK_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z Shutdown_write(const struct LDKShutdown *NONNULL_PTR obj);
	export function Shutdown_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Shutdown_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ShutdownDecodeErrorZ Shutdown_read(struct LDKu8slice ser);
	export function Shutdown_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Shutdown_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z UpdateFailHTLC_write(const struct LDKUpdateFailHTLC *NONNULL_PTR obj);
	export function UpdateFailHTLC_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailHTLC_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_UpdateFailHTLCDecodeErrorZ UpdateFailHTLC_read(struct LDKu8slice ser);
	export function UpdateFailHTLC_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailHTLC_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z UpdateFailMalformedHTLC_write(const struct LDKUpdateFailMalformedHTLC *NONNULL_PTR obj);
	export function UpdateFailMalformedHTLC_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailMalformedHTLC_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_UpdateFailMalformedHTLCDecodeErrorZ UpdateFailMalformedHTLC_read(struct LDKu8slice ser);
	export function UpdateFailMalformedHTLC_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFailMalformedHTLC_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z UpdateFee_write(const struct LDKUpdateFee *NONNULL_PTR obj);
	export function UpdateFee_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFee_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_UpdateFeeDecodeErrorZ UpdateFee_read(struct LDKu8slice ser);
	export function UpdateFee_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFee_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z UpdateFulfillHTLC_write(const struct LDKUpdateFulfillHTLC *NONNULL_PTR obj);
	export function UpdateFulfillHTLC_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_UpdateFulfillHTLCDecodeErrorZ UpdateFulfillHTLC_read(struct LDKu8slice ser);
	export function UpdateFulfillHTLC_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateFulfillHTLC_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z UpdateAddHTLC_write(const struct LDKUpdateAddHTLC *NONNULL_PTR obj);
	export function UpdateAddHTLC_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_UpdateAddHTLCDecodeErrorZ UpdateAddHTLC_read(struct LDKu8slice ser);
	export function UpdateAddHTLC_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UpdateAddHTLC_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z Ping_write(const struct LDKPing *NONNULL_PTR obj);
	export function Ping_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Ping_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_PingDecodeErrorZ Ping_read(struct LDKu8slice ser);
	export function Ping_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Ping_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z Pong_write(const struct LDKPong *NONNULL_PTR obj);
	export function Pong_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Pong_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_PongDecodeErrorZ Pong_read(struct LDKu8slice ser);
	export function Pong_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Pong_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z UnsignedChannelAnnouncement_write(const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR obj);
	export function UnsignedChannelAnnouncement_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ UnsignedChannelAnnouncement_read(struct LDKu8slice ser);
	export function UnsignedChannelAnnouncement_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelAnnouncement_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ChannelAnnouncement_write(const struct LDKChannelAnnouncement *NONNULL_PTR obj);
	export function ChannelAnnouncement_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ChannelAnnouncementDecodeErrorZ ChannelAnnouncement_read(struct LDKu8slice ser);
	export function ChannelAnnouncement_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelAnnouncement_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z UnsignedChannelUpdate_write(const struct LDKUnsignedChannelUpdate *NONNULL_PTR obj);
	export function UnsignedChannelUpdate_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_UnsignedChannelUpdateDecodeErrorZ UnsignedChannelUpdate_read(struct LDKu8slice ser);
	export function UnsignedChannelUpdate_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedChannelUpdate_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ChannelUpdate_write(const struct LDKChannelUpdate *NONNULL_PTR obj);
	export function ChannelUpdate_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelUpdate_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ChannelUpdateDecodeErrorZ ChannelUpdate_read(struct LDKu8slice ser);
	export function ChannelUpdate_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelUpdate_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ErrorMessage_write(const struct LDKErrorMessage *NONNULL_PTR obj);
	export function ErrorMessage_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorMessage_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ErrorMessageDecodeErrorZ ErrorMessage_read(struct LDKu8slice ser);
	export function ErrorMessage_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErrorMessage_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z UnsignedNodeAnnouncement_write(const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR obj);
	export function UnsignedNodeAnnouncement_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ UnsignedNodeAnnouncement_read(struct LDKu8slice ser);
	export function UnsignedNodeAnnouncement_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.UnsignedNodeAnnouncement_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z NodeAnnouncement_write(const struct LDKNodeAnnouncement *NONNULL_PTR obj);
	export function NodeAnnouncement_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncement_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_NodeAnnouncementDecodeErrorZ NodeAnnouncement_read(struct LDKu8slice ser);
	export function NodeAnnouncement_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncement_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCResult_QueryShortChannelIdsDecodeErrorZ QueryShortChannelIds_read(struct LDKu8slice ser);
	export function QueryShortChannelIds_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryShortChannelIds_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z QueryShortChannelIds_write(const struct LDKQueryShortChannelIds *NONNULL_PTR obj);
	export function QueryShortChannelIds_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryShortChannelIds_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCVec_u8Z ReplyShortChannelIdsEnd_write(const struct LDKReplyShortChannelIdsEnd *NONNULL_PTR obj);
	export function ReplyShortChannelIdsEnd_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyShortChannelIdsEnd_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ ReplyShortChannelIdsEnd_read(struct LDKu8slice ser);
	export function ReplyShortChannelIdsEnd_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyShortChannelIdsEnd_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// MUST_USE_RES uint32_t QueryChannelRange_end_blocknum(const struct LDKQueryChannelRange *NONNULL_PTR this_arg);
	export function QueryChannelRange_end_blocknum(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_end_blocknum(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z QueryChannelRange_write(const struct LDKQueryChannelRange *NONNULL_PTR obj);
	export function QueryChannelRange_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_QueryChannelRangeDecodeErrorZ QueryChannelRange_read(struct LDKu8slice ser);
	export function QueryChannelRange_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.QueryChannelRange_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCResult_ReplyChannelRangeDecodeErrorZ ReplyChannelRange_read(struct LDKu8slice ser);
	export function ReplyChannelRange_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ReplyChannelRange_write(const struct LDKReplyChannelRange *NONNULL_PTR obj);
	export function ReplyChannelRange_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReplyChannelRange_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCVec_u8Z GossipTimestampFilter_write(const struct LDKGossipTimestampFilter *NONNULL_PTR obj);
	export function GossipTimestampFilter_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_GossipTimestampFilterDecodeErrorZ GossipTimestampFilter_read(struct LDKu8slice ser);
	export function GossipTimestampFilter_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.GossipTimestampFilter_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void CustomMessageHandler_free(struct LDKCustomMessageHandler this_ptr);
	export function CustomMessageHandler_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CustomMessageHandler_free(this_ptr);
		// debug statements here
	}
	// void IgnoringMessageHandler_free(struct LDKIgnoringMessageHandler this_obj);
	export function IgnoringMessageHandler_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.IgnoringMessageHandler_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKIgnoringMessageHandler IgnoringMessageHandler_new(void);
	export function IgnoringMessageHandler_new(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.IgnoringMessageHandler_new();
		return nativeResponseValue;
	}
	// struct LDKMessageSendEventsProvider IgnoringMessageHandler_as_MessageSendEventsProvider(const struct LDKIgnoringMessageHandler *NONNULL_PTR this_arg);
	export function IgnoringMessageHandler_as_MessageSendEventsProvider(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.IgnoringMessageHandler_as_MessageSendEventsProvider(this_arg);
		return nativeResponseValue;
	}
	// struct LDKRoutingMessageHandler IgnoringMessageHandler_as_RoutingMessageHandler(const struct LDKIgnoringMessageHandler *NONNULL_PTR this_arg);
	export function IgnoringMessageHandler_as_RoutingMessageHandler(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.IgnoringMessageHandler_as_RoutingMessageHandler(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCustomMessageReader IgnoringMessageHandler_as_CustomMessageReader(const struct LDKIgnoringMessageHandler *NONNULL_PTR this_arg);
	export function IgnoringMessageHandler_as_CustomMessageReader(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.IgnoringMessageHandler_as_CustomMessageReader(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCustomMessageHandler IgnoringMessageHandler_as_CustomMessageHandler(const struct LDKIgnoringMessageHandler *NONNULL_PTR this_arg);
	export function IgnoringMessageHandler_as_CustomMessageHandler(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.IgnoringMessageHandler_as_CustomMessageHandler(this_arg);
		return nativeResponseValue;
	}
	// void ErroringMessageHandler_free(struct LDKErroringMessageHandler this_obj);
	export function ErroringMessageHandler_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErroringMessageHandler_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKErroringMessageHandler ErroringMessageHandler_new(void);
	export function ErroringMessageHandler_new(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErroringMessageHandler_new();
		return nativeResponseValue;
	}
	// struct LDKMessageSendEventsProvider ErroringMessageHandler_as_MessageSendEventsProvider(const struct LDKErroringMessageHandler *NONNULL_PTR this_arg);
	export function ErroringMessageHandler_as_MessageSendEventsProvider(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErroringMessageHandler_as_MessageSendEventsProvider(this_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelMessageHandler ErroringMessageHandler_as_ChannelMessageHandler(const struct LDKErroringMessageHandler *NONNULL_PTR this_arg);
	export function ErroringMessageHandler_as_ChannelMessageHandler(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ErroringMessageHandler_as_ChannelMessageHandler(this_arg);
		return nativeResponseValue;
	}
	// void MessageHandler_free(struct LDKMessageHandler this_obj);
	export function MessageHandler_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageHandler_free(this_obj);
		// debug statements here
	}
	// const struct LDKChannelMessageHandler *MessageHandler_get_chan_handler(const struct LDKMessageHandler *NONNULL_PTR this_ptr);
	export function MessageHandler_get_chan_handler(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageHandler_get_chan_handler(this_ptr);
		return nativeResponseValue;
	}
	// void MessageHandler_set_chan_handler(struct LDKMessageHandler *NONNULL_PTR this_ptr, struct LDKChannelMessageHandler val);
	export function MessageHandler_set_chan_handler(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageHandler_set_chan_handler(this_ptr, val);
		// debug statements here
	}
	// const struct LDKRoutingMessageHandler *MessageHandler_get_route_handler(const struct LDKMessageHandler *NONNULL_PTR this_ptr);
	export function MessageHandler_get_route_handler(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageHandler_get_route_handler(this_ptr);
		return nativeResponseValue;
	}
	// void MessageHandler_set_route_handler(struct LDKMessageHandler *NONNULL_PTR this_ptr, struct LDKRoutingMessageHandler val);
	export function MessageHandler_set_route_handler(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageHandler_set_route_handler(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKMessageHandler MessageHandler_new(struct LDKChannelMessageHandler chan_handler_arg, struct LDKRoutingMessageHandler route_handler_arg);
	export function MessageHandler_new(chan_handler_arg: number, route_handler_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MessageHandler_new(chan_handler_arg, route_handler_arg);
		return nativeResponseValue;
	}
	// struct LDKSocketDescriptor SocketDescriptor_clone(const struct LDKSocketDescriptor *NONNULL_PTR orig);
	export function SocketDescriptor_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SocketDescriptor_clone(orig);
		return nativeResponseValue;
	}
	// void SocketDescriptor_free(struct LDKSocketDescriptor this_ptr);
	export function SocketDescriptor_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SocketDescriptor_free(this_ptr);
		// debug statements here
	}
	// void PeerHandleError_free(struct LDKPeerHandleError this_obj);
	export function PeerHandleError_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerHandleError_free(this_obj);
		// debug statements here
	}
	// bool PeerHandleError_get_no_connection_possible(const struct LDKPeerHandleError *NONNULL_PTR this_ptr);
	export function PeerHandleError_get_no_connection_possible(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerHandleError_get_no_connection_possible(this_ptr);
		return nativeResponseValue;
	}
	// void PeerHandleError_set_no_connection_possible(struct LDKPeerHandleError *NONNULL_PTR this_ptr, bool val);
	export function PeerHandleError_set_no_connection_possible(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerHandleError_set_no_connection_possible(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKPeerHandleError PeerHandleError_new(bool no_connection_possible_arg);
	export function PeerHandleError_new(no_connection_possible_arg: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerHandleError_new(no_connection_possible_arg);
		return nativeResponseValue;
	}
	// struct LDKPeerHandleError PeerHandleError_clone(const struct LDKPeerHandleError *NONNULL_PTR orig);
	export function PeerHandleError_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerHandleError_clone(orig);
		return nativeResponseValue;
	}
	// void PeerManager_free(struct LDKPeerManager this_obj);
	export function PeerManager_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKPeerManager PeerManager_new(struct LDKMessageHandler message_handler, struct LDKSecretKey our_node_secret, const uint8_t (*ephemeral_random_data)[32], struct LDKLogger logger, struct LDKCustomMessageHandler custom_message_handler);
	export function PeerManager_new(message_handler: number, our_node_secret: Uint8Array, ephemeral_random_data: Uint8Array, logger: number, custom_message_handler: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_new(message_handler, encodeArray(our_node_secret), encodeArray(ephemeral_random_data), logger, custom_message_handler);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_PublicKeyZ PeerManager_get_peer_node_ids(const struct LDKPeerManager *NONNULL_PTR this_arg);
	export function PeerManager_get_peer_node_ids(this_arg: number): Uint8Array[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_get_peer_node_ids(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_CVec_u8ZPeerHandleErrorZ PeerManager_new_outbound_connection(const struct LDKPeerManager *NONNULL_PTR this_arg, struct LDKPublicKey their_node_id, struct LDKSocketDescriptor descriptor);
	export function PeerManager_new_outbound_connection(this_arg: number, their_node_id: Uint8Array, descriptor: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_new_outbound_connection(this_arg, encodeArray(their_node_id), descriptor);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NonePeerHandleErrorZ PeerManager_new_inbound_connection(const struct LDKPeerManager *NONNULL_PTR this_arg, struct LDKSocketDescriptor descriptor);
	export function PeerManager_new_inbound_connection(this_arg: number, descriptor: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_new_inbound_connection(this_arg, descriptor);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NonePeerHandleErrorZ PeerManager_write_buffer_space_avail(const struct LDKPeerManager *NONNULL_PTR this_arg, struct LDKSocketDescriptor *NONNULL_PTR descriptor);
	export function PeerManager_write_buffer_space_avail(this_arg: number, descriptor: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_write_buffer_space_avail(this_arg, descriptor);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_boolPeerHandleErrorZ PeerManager_read_event(const struct LDKPeerManager *NONNULL_PTR this_arg, struct LDKSocketDescriptor *NONNULL_PTR peer_descriptor, struct LDKu8slice data);
	export function PeerManager_read_event(this_arg: number, peer_descriptor: number, data: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_read_event(this_arg, peer_descriptor, encodeArray(data));
		return nativeResponseValue;
	}
	// void PeerManager_process_events(const struct LDKPeerManager *NONNULL_PTR this_arg);
	export function PeerManager_process_events(this_arg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_process_events(this_arg);
		// debug statements here
	}
	// void PeerManager_socket_disconnected(const struct LDKPeerManager *NONNULL_PTR this_arg, const struct LDKSocketDescriptor *NONNULL_PTR descriptor);
	export function PeerManager_socket_disconnected(this_arg: number, descriptor: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_socket_disconnected(this_arg, descriptor);
		// debug statements here
	}
	// void PeerManager_disconnect_by_node_id(const struct LDKPeerManager *NONNULL_PTR this_arg, struct LDKPublicKey node_id, bool no_connection_possible);
	export function PeerManager_disconnect_by_node_id(this_arg: number, node_id: Uint8Array, no_connection_possible: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_disconnect_by_node_id(this_arg, encodeArray(node_id), no_connection_possible);
		// debug statements here
	}
	// void PeerManager_disconnect_all_peers(const struct LDKPeerManager *NONNULL_PTR this_arg);
	export function PeerManager_disconnect_all_peers(this_arg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_disconnect_all_peers(this_arg);
		// debug statements here
	}
	// void PeerManager_timer_tick_occurred(const struct LDKPeerManager *NONNULL_PTR this_arg);
	export function PeerManager_timer_tick_occurred(this_arg: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PeerManager_timer_tick_occurred(this_arg);
		// debug statements here
	}
	// struct LDKThirtyTwoBytes build_commitment_secret(const uint8_t (*commitment_seed)[32], uint64_t idx);
	export function build_commitment_secret(commitment_seed: Uint8Array, idx: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.build_commitment_secret(encodeArray(commitment_seed), idx);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKTransaction build_closing_transaction(uint64_t to_holder_value_sat, uint64_t to_counterparty_value_sat, struct LDKCVec_u8Z to_holder_script, struct LDKCVec_u8Z to_counterparty_script, struct LDKOutPoint funding_outpoint);
	export function build_closing_transaction(to_holder_value_sat: number, to_counterparty_value_sat: number, to_holder_script: Uint8Array, to_counterparty_script: Uint8Array, funding_outpoint: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.build_closing_transaction(to_holder_value_sat, to_counterparty_value_sat, encodeArray(to_holder_script), encodeArray(to_counterparty_script), funding_outpoint);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_SecretKeyErrorZ derive_private_key(struct LDKPublicKey per_commitment_point, const uint8_t (*base_secret)[32]);
	export function derive_private_key(per_commitment_point: Uint8Array, base_secret: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.derive_private_key(encodeArray(per_commitment_point), encodeArray(base_secret));
		return nativeResponseValue;
	}
	// struct LDKCResult_PublicKeyErrorZ derive_public_key(struct LDKPublicKey per_commitment_point, struct LDKPublicKey base_point);
	export function derive_public_key(per_commitment_point: Uint8Array, base_point: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.derive_public_key(encodeArray(per_commitment_point), encodeArray(base_point));
		return nativeResponseValue;
	}
	// struct LDKCResult_SecretKeyErrorZ derive_private_revocation_key(const uint8_t (*per_commitment_secret)[32], const uint8_t (*countersignatory_revocation_base_secret)[32]);
	export function derive_private_revocation_key(per_commitment_secret: Uint8Array, countersignatory_revocation_base_secret: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.derive_private_revocation_key(encodeArray(per_commitment_secret), encodeArray(countersignatory_revocation_base_secret));
		return nativeResponseValue;
	}
	// struct LDKCResult_PublicKeyErrorZ derive_public_revocation_key(struct LDKPublicKey per_commitment_point, struct LDKPublicKey countersignatory_revocation_base_point);
	export function derive_public_revocation_key(per_commitment_point: Uint8Array, countersignatory_revocation_base_point: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.derive_public_revocation_key(encodeArray(per_commitment_point), encodeArray(countersignatory_revocation_base_point));
		return nativeResponseValue;
	}
	// void TxCreationKeys_free(struct LDKTxCreationKeys this_obj);
	export function TxCreationKeys_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_free(this_obj);
		// debug statements here
	}
	// struct LDKPublicKey TxCreationKeys_get_per_commitment_point(const struct LDKTxCreationKeys *NONNULL_PTR this_ptr);
	export function TxCreationKeys_get_per_commitment_point(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_get_per_commitment_point(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void TxCreationKeys_set_per_commitment_point(struct LDKTxCreationKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function TxCreationKeys_set_per_commitment_point(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_set_per_commitment_point(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey TxCreationKeys_get_revocation_key(const struct LDKTxCreationKeys *NONNULL_PTR this_ptr);
	export function TxCreationKeys_get_revocation_key(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_get_revocation_key(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void TxCreationKeys_set_revocation_key(struct LDKTxCreationKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function TxCreationKeys_set_revocation_key(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_set_revocation_key(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey TxCreationKeys_get_broadcaster_htlc_key(const struct LDKTxCreationKeys *NONNULL_PTR this_ptr);
	export function TxCreationKeys_get_broadcaster_htlc_key(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_get_broadcaster_htlc_key(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void TxCreationKeys_set_broadcaster_htlc_key(struct LDKTxCreationKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function TxCreationKeys_set_broadcaster_htlc_key(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_set_broadcaster_htlc_key(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey TxCreationKeys_get_countersignatory_htlc_key(const struct LDKTxCreationKeys *NONNULL_PTR this_ptr);
	export function TxCreationKeys_get_countersignatory_htlc_key(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_get_countersignatory_htlc_key(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void TxCreationKeys_set_countersignatory_htlc_key(struct LDKTxCreationKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function TxCreationKeys_set_countersignatory_htlc_key(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_set_countersignatory_htlc_key(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey TxCreationKeys_get_broadcaster_delayed_payment_key(const struct LDKTxCreationKeys *NONNULL_PTR this_ptr);
	export function TxCreationKeys_get_broadcaster_delayed_payment_key(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_get_broadcaster_delayed_payment_key(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void TxCreationKeys_set_broadcaster_delayed_payment_key(struct LDKTxCreationKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function TxCreationKeys_set_broadcaster_delayed_payment_key(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_set_broadcaster_delayed_payment_key(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKTxCreationKeys TxCreationKeys_new(struct LDKPublicKey per_commitment_point_arg, struct LDKPublicKey revocation_key_arg, struct LDKPublicKey broadcaster_htlc_key_arg, struct LDKPublicKey countersignatory_htlc_key_arg, struct LDKPublicKey broadcaster_delayed_payment_key_arg);
	export function TxCreationKeys_new(per_commitment_point_arg: Uint8Array, revocation_key_arg: Uint8Array, broadcaster_htlc_key_arg: Uint8Array, countersignatory_htlc_key_arg: Uint8Array, broadcaster_delayed_payment_key_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_new(encodeArray(per_commitment_point_arg), encodeArray(revocation_key_arg), encodeArray(broadcaster_htlc_key_arg), encodeArray(countersignatory_htlc_key_arg), encodeArray(broadcaster_delayed_payment_key_arg));
		return nativeResponseValue;
	}
	// struct LDKTxCreationKeys TxCreationKeys_clone(const struct LDKTxCreationKeys *NONNULL_PTR orig);
	export function TxCreationKeys_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z TxCreationKeys_write(const struct LDKTxCreationKeys *NONNULL_PTR obj);
	export function TxCreationKeys_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_TxCreationKeysDecodeErrorZ TxCreationKeys_read(struct LDKu8slice ser);
	export function TxCreationKeys_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void ChannelPublicKeys_free(struct LDKChannelPublicKeys this_obj);
	export function ChannelPublicKeys_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_free(this_obj);
		// debug statements here
	}
	// struct LDKPublicKey ChannelPublicKeys_get_funding_pubkey(const struct LDKChannelPublicKeys *NONNULL_PTR this_ptr);
	export function ChannelPublicKeys_get_funding_pubkey(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_get_funding_pubkey(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelPublicKeys_set_funding_pubkey(struct LDKChannelPublicKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function ChannelPublicKeys_set_funding_pubkey(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_set_funding_pubkey(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey ChannelPublicKeys_get_revocation_basepoint(const struct LDKChannelPublicKeys *NONNULL_PTR this_ptr);
	export function ChannelPublicKeys_get_revocation_basepoint(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_get_revocation_basepoint(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelPublicKeys_set_revocation_basepoint(struct LDKChannelPublicKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function ChannelPublicKeys_set_revocation_basepoint(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_set_revocation_basepoint(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey ChannelPublicKeys_get_payment_point(const struct LDKChannelPublicKeys *NONNULL_PTR this_ptr);
	export function ChannelPublicKeys_get_payment_point(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_get_payment_point(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelPublicKeys_set_payment_point(struct LDKChannelPublicKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function ChannelPublicKeys_set_payment_point(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_set_payment_point(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey ChannelPublicKeys_get_delayed_payment_basepoint(const struct LDKChannelPublicKeys *NONNULL_PTR this_ptr);
	export function ChannelPublicKeys_get_delayed_payment_basepoint(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_get_delayed_payment_basepoint(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelPublicKeys_set_delayed_payment_basepoint(struct LDKChannelPublicKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function ChannelPublicKeys_set_delayed_payment_basepoint(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_set_delayed_payment_basepoint(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKPublicKey ChannelPublicKeys_get_htlc_basepoint(const struct LDKChannelPublicKeys *NONNULL_PTR this_ptr);
	export function ChannelPublicKeys_get_htlc_basepoint(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_get_htlc_basepoint(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void ChannelPublicKeys_set_htlc_basepoint(struct LDKChannelPublicKeys *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function ChannelPublicKeys_set_htlc_basepoint(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_set_htlc_basepoint(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelPublicKeys ChannelPublicKeys_new(struct LDKPublicKey funding_pubkey_arg, struct LDKPublicKey revocation_basepoint_arg, struct LDKPublicKey payment_point_arg, struct LDKPublicKey delayed_payment_basepoint_arg, struct LDKPublicKey htlc_basepoint_arg);
	export function ChannelPublicKeys_new(funding_pubkey_arg: Uint8Array, revocation_basepoint_arg: Uint8Array, payment_point_arg: Uint8Array, delayed_payment_basepoint_arg: Uint8Array, htlc_basepoint_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_new(encodeArray(funding_pubkey_arg), encodeArray(revocation_basepoint_arg), encodeArray(payment_point_arg), encodeArray(delayed_payment_basepoint_arg), encodeArray(htlc_basepoint_arg));
		return nativeResponseValue;
	}
	// struct LDKChannelPublicKeys ChannelPublicKeys_clone(const struct LDKChannelPublicKeys *NONNULL_PTR orig);
	export function ChannelPublicKeys_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ChannelPublicKeys_write(const struct LDKChannelPublicKeys *NONNULL_PTR obj);
	export function ChannelPublicKeys_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ChannelPublicKeysDecodeErrorZ ChannelPublicKeys_read(struct LDKu8slice ser);
	export function ChannelPublicKeys_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelPublicKeys_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_TxCreationKeysErrorZ TxCreationKeys_derive_new(struct LDKPublicKey per_commitment_point, struct LDKPublicKey broadcaster_delayed_payment_base, struct LDKPublicKey broadcaster_htlc_base, struct LDKPublicKey countersignatory_revocation_base, struct LDKPublicKey countersignatory_htlc_base);
	export function TxCreationKeys_derive_new(per_commitment_point: Uint8Array, broadcaster_delayed_payment_base: Uint8Array, broadcaster_htlc_base: Uint8Array, countersignatory_revocation_base: Uint8Array, countersignatory_htlc_base: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_derive_new(encodeArray(per_commitment_point), encodeArray(broadcaster_delayed_payment_base), encodeArray(broadcaster_htlc_base), encodeArray(countersignatory_revocation_base), encodeArray(countersignatory_htlc_base));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_TxCreationKeysErrorZ TxCreationKeys_from_channel_static_keys(struct LDKPublicKey per_commitment_point, const struct LDKChannelPublicKeys *NONNULL_PTR broadcaster_keys, const struct LDKChannelPublicKeys *NONNULL_PTR countersignatory_keys);
	export function TxCreationKeys_from_channel_static_keys(per_commitment_point: Uint8Array, broadcaster_keys: number, countersignatory_keys: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TxCreationKeys_from_channel_static_keys(encodeArray(per_commitment_point), broadcaster_keys, countersignatory_keys);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z get_revokeable_redeemscript(struct LDKPublicKey revocation_key, uint16_t contest_delay, struct LDKPublicKey broadcaster_delayed_payment_key);
	export function get_revokeable_redeemscript(revocation_key: Uint8Array, contest_delay: number, broadcaster_delayed_payment_key: Uint8Array): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.get_revokeable_redeemscript(encodeArray(revocation_key), contest_delay, encodeArray(broadcaster_delayed_payment_key));
		return decodeArray(nativeResponseValue);
	}
	// void HTLCOutputInCommitment_free(struct LDKHTLCOutputInCommitment this_obj);
	export function HTLCOutputInCommitment_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_free(this_obj);
		// debug statements here
	}
	// bool HTLCOutputInCommitment_get_offered(const struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr);
	export function HTLCOutputInCommitment_get_offered(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_get_offered(this_ptr);
		return nativeResponseValue;
	}
	// void HTLCOutputInCommitment_set_offered(struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr, bool val);
	export function HTLCOutputInCommitment_set_offered(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_set_offered(this_ptr, val);
		// debug statements here
	}
	// uint64_t HTLCOutputInCommitment_get_amount_msat(const struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr);
	export function HTLCOutputInCommitment_get_amount_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_get_amount_msat(this_ptr);
		return nativeResponseValue;
	}
	// void HTLCOutputInCommitment_set_amount_msat(struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr, uint64_t val);
	export function HTLCOutputInCommitment_set_amount_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_set_amount_msat(this_ptr, val);
		// debug statements here
	}
	// uint32_t HTLCOutputInCommitment_get_cltv_expiry(const struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr);
	export function HTLCOutputInCommitment_get_cltv_expiry(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_get_cltv_expiry(this_ptr);
		return nativeResponseValue;
	}
	// void HTLCOutputInCommitment_set_cltv_expiry(struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr, uint32_t val);
	export function HTLCOutputInCommitment_set_cltv_expiry(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_set_cltv_expiry(this_ptr, val);
		// debug statements here
	}
	// const uint8_t (*HTLCOutputInCommitment_get_payment_hash(const struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr))[32];
	export function HTLCOutputInCommitment_get_payment_hash(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_get_payment_hash(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void HTLCOutputInCommitment_set_payment_hash(struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function HTLCOutputInCommitment_set_payment_hash(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_set_payment_hash(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKCOption_u32Z HTLCOutputInCommitment_get_transaction_output_index(const struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr);
	export function HTLCOutputInCommitment_get_transaction_output_index(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_get_transaction_output_index(this_ptr);
		return nativeResponseValue;
	}
	// void HTLCOutputInCommitment_set_transaction_output_index(struct LDKHTLCOutputInCommitment *NONNULL_PTR this_ptr, struct LDKCOption_u32Z val);
	export function HTLCOutputInCommitment_set_transaction_output_index(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_set_transaction_output_index(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKHTLCOutputInCommitment HTLCOutputInCommitment_new(bool offered_arg, uint64_t amount_msat_arg, uint32_t cltv_expiry_arg, struct LDKThirtyTwoBytes payment_hash_arg, struct LDKCOption_u32Z transaction_output_index_arg);
	export function HTLCOutputInCommitment_new(offered_arg: boolean, amount_msat_arg: number, cltv_expiry_arg: number, payment_hash_arg: Uint8Array, transaction_output_index_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_new(offered_arg, amount_msat_arg, cltv_expiry_arg, encodeArray(payment_hash_arg), transaction_output_index_arg);
		return nativeResponseValue;
	}
	// struct LDKHTLCOutputInCommitment HTLCOutputInCommitment_clone(const struct LDKHTLCOutputInCommitment *NONNULL_PTR orig);
	export function HTLCOutputInCommitment_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z HTLCOutputInCommitment_write(const struct LDKHTLCOutputInCommitment *NONNULL_PTR obj);
	export function HTLCOutputInCommitment_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_HTLCOutputInCommitmentDecodeErrorZ HTLCOutputInCommitment_read(struct LDKu8slice ser);
	export function HTLCOutputInCommitment_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HTLCOutputInCommitment_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z get_htlc_redeemscript(const struct LDKHTLCOutputInCommitment *NONNULL_PTR htlc, const struct LDKTxCreationKeys *NONNULL_PTR keys);
	export function get_htlc_redeemscript(htlc: number, keys: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.get_htlc_redeemscript(htlc, keys);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCVec_u8Z make_funding_redeemscript(struct LDKPublicKey broadcaster, struct LDKPublicKey countersignatory);
	export function make_funding_redeemscript(broadcaster: Uint8Array, countersignatory: Uint8Array): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.make_funding_redeemscript(encodeArray(broadcaster), encodeArray(countersignatory));
		return decodeArray(nativeResponseValue);
	}
	// struct LDKTransaction build_htlc_transaction(const uint8_t (*commitment_txid)[32], uint32_t feerate_per_kw, uint16_t contest_delay, const struct LDKHTLCOutputInCommitment *NONNULL_PTR htlc, struct LDKPublicKey broadcaster_delayed_payment_key, struct LDKPublicKey revocation_key);
	export function build_htlc_transaction(commitment_txid: Uint8Array, feerate_per_kw: number, contest_delay: number, htlc: number, broadcaster_delayed_payment_key: Uint8Array, revocation_key: Uint8Array): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.build_htlc_transaction(encodeArray(commitment_txid), feerate_per_kw, contest_delay, htlc, encodeArray(broadcaster_delayed_payment_key), encodeArray(revocation_key));
		return decodeArray(nativeResponseValue);
	}
	// void ChannelTransactionParameters_free(struct LDKChannelTransactionParameters this_obj);
	export function ChannelTransactionParameters_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_free(this_obj);
		// debug statements here
	}
	// struct LDKChannelPublicKeys ChannelTransactionParameters_get_holder_pubkeys(const struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr);
	export function ChannelTransactionParameters_get_holder_pubkeys(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_get_holder_pubkeys(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelTransactionParameters_set_holder_pubkeys(struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr, struct LDKChannelPublicKeys val);
	export function ChannelTransactionParameters_set_holder_pubkeys(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_set_holder_pubkeys(this_ptr, val);
		// debug statements here
	}
	// uint16_t ChannelTransactionParameters_get_holder_selected_contest_delay(const struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr);
	export function ChannelTransactionParameters_get_holder_selected_contest_delay(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_get_holder_selected_contest_delay(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelTransactionParameters_set_holder_selected_contest_delay(struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr, uint16_t val);
	export function ChannelTransactionParameters_set_holder_selected_contest_delay(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_set_holder_selected_contest_delay(this_ptr, val);
		// debug statements here
	}
	// bool ChannelTransactionParameters_get_is_outbound_from_holder(const struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr);
	export function ChannelTransactionParameters_get_is_outbound_from_holder(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_get_is_outbound_from_holder(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelTransactionParameters_set_is_outbound_from_holder(struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr, bool val);
	export function ChannelTransactionParameters_set_is_outbound_from_holder(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_set_is_outbound_from_holder(this_ptr, val);
		// debug statements here
	}
	// struct LDKCounterpartyChannelTransactionParameters ChannelTransactionParameters_get_counterparty_parameters(const struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr);
	export function ChannelTransactionParameters_get_counterparty_parameters(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_get_counterparty_parameters(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelTransactionParameters_set_counterparty_parameters(struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr, struct LDKCounterpartyChannelTransactionParameters val);
	export function ChannelTransactionParameters_set_counterparty_parameters(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_set_counterparty_parameters(this_ptr, val);
		// debug statements here
	}
	// struct LDKOutPoint ChannelTransactionParameters_get_funding_outpoint(const struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr);
	export function ChannelTransactionParameters_get_funding_outpoint(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_get_funding_outpoint(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelTransactionParameters_set_funding_outpoint(struct LDKChannelTransactionParameters *NONNULL_PTR this_ptr, struct LDKOutPoint val);
	export function ChannelTransactionParameters_set_funding_outpoint(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_set_funding_outpoint(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelTransactionParameters ChannelTransactionParameters_new(struct LDKChannelPublicKeys holder_pubkeys_arg, uint16_t holder_selected_contest_delay_arg, bool is_outbound_from_holder_arg, struct LDKCounterpartyChannelTransactionParameters counterparty_parameters_arg, struct LDKOutPoint funding_outpoint_arg);
	export function ChannelTransactionParameters_new(holder_pubkeys_arg: number, holder_selected_contest_delay_arg: number, is_outbound_from_holder_arg: boolean, counterparty_parameters_arg: number, funding_outpoint_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_new(holder_pubkeys_arg, holder_selected_contest_delay_arg, is_outbound_from_holder_arg, counterparty_parameters_arg, funding_outpoint_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelTransactionParameters ChannelTransactionParameters_clone(const struct LDKChannelTransactionParameters *NONNULL_PTR orig);
	export function ChannelTransactionParameters_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_clone(orig);
		return nativeResponseValue;
	}
	// void CounterpartyChannelTransactionParameters_free(struct LDKCounterpartyChannelTransactionParameters this_obj);
	export function CounterpartyChannelTransactionParameters_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyChannelTransactionParameters_free(this_obj);
		// debug statements here
	}
	// struct LDKChannelPublicKeys CounterpartyChannelTransactionParameters_get_pubkeys(const struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR this_ptr);
	export function CounterpartyChannelTransactionParameters_get_pubkeys(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyChannelTransactionParameters_get_pubkeys(this_ptr);
		return nativeResponseValue;
	}
	// void CounterpartyChannelTransactionParameters_set_pubkeys(struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR this_ptr, struct LDKChannelPublicKeys val);
	export function CounterpartyChannelTransactionParameters_set_pubkeys(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyChannelTransactionParameters_set_pubkeys(this_ptr, val);
		// debug statements here
	}
	// uint16_t CounterpartyChannelTransactionParameters_get_selected_contest_delay(const struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR this_ptr);
	export function CounterpartyChannelTransactionParameters_get_selected_contest_delay(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyChannelTransactionParameters_get_selected_contest_delay(this_ptr);
		return nativeResponseValue;
	}
	// void CounterpartyChannelTransactionParameters_set_selected_contest_delay(struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR this_ptr, uint16_t val);
	export function CounterpartyChannelTransactionParameters_set_selected_contest_delay(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyChannelTransactionParameters_set_selected_contest_delay(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKCounterpartyChannelTransactionParameters CounterpartyChannelTransactionParameters_new(struct LDKChannelPublicKeys pubkeys_arg, uint16_t selected_contest_delay_arg);
	export function CounterpartyChannelTransactionParameters_new(pubkeys_arg: number, selected_contest_delay_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyChannelTransactionParameters_new(pubkeys_arg, selected_contest_delay_arg);
		return nativeResponseValue;
	}
	// struct LDKCounterpartyChannelTransactionParameters CounterpartyChannelTransactionParameters_clone(const struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR orig);
	export function CounterpartyChannelTransactionParameters_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyChannelTransactionParameters_clone(orig);
		return nativeResponseValue;
	}
	// MUST_USE_RES bool ChannelTransactionParameters_is_populated(const struct LDKChannelTransactionParameters *NONNULL_PTR this_arg);
	export function ChannelTransactionParameters_is_populated(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_is_populated(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKDirectedChannelTransactionParameters ChannelTransactionParameters_as_holder_broadcastable(const struct LDKChannelTransactionParameters *NONNULL_PTR this_arg);
	export function ChannelTransactionParameters_as_holder_broadcastable(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_as_holder_broadcastable(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKDirectedChannelTransactionParameters ChannelTransactionParameters_as_counterparty_broadcastable(const struct LDKChannelTransactionParameters *NONNULL_PTR this_arg);
	export function ChannelTransactionParameters_as_counterparty_broadcastable(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_as_counterparty_broadcastable(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z CounterpartyChannelTransactionParameters_write(const struct LDKCounterpartyChannelTransactionParameters *NONNULL_PTR obj);
	export function CounterpartyChannelTransactionParameters_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyChannelTransactionParameters_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ CounterpartyChannelTransactionParameters_read(struct LDKu8slice ser);
	export function CounterpartyChannelTransactionParameters_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CounterpartyChannelTransactionParameters_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ChannelTransactionParameters_write(const struct LDKChannelTransactionParameters *NONNULL_PTR obj);
	export function ChannelTransactionParameters_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ChannelTransactionParametersDecodeErrorZ ChannelTransactionParameters_read(struct LDKu8slice ser);
	export function ChannelTransactionParameters_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelTransactionParameters_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void DirectedChannelTransactionParameters_free(struct LDKDirectedChannelTransactionParameters this_obj);
	export function DirectedChannelTransactionParameters_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectedChannelTransactionParameters_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelPublicKeys DirectedChannelTransactionParameters_broadcaster_pubkeys(const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR this_arg);
	export function DirectedChannelTransactionParameters_broadcaster_pubkeys(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectedChannelTransactionParameters_broadcaster_pubkeys(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKChannelPublicKeys DirectedChannelTransactionParameters_countersignatory_pubkeys(const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR this_arg);
	export function DirectedChannelTransactionParameters_countersignatory_pubkeys(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectedChannelTransactionParameters_countersignatory_pubkeys(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint16_t DirectedChannelTransactionParameters_contest_delay(const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR this_arg);
	export function DirectedChannelTransactionParameters_contest_delay(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectedChannelTransactionParameters_contest_delay(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES bool DirectedChannelTransactionParameters_is_outbound(const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR this_arg);
	export function DirectedChannelTransactionParameters_is_outbound(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectedChannelTransactionParameters_is_outbound(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKOutPoint DirectedChannelTransactionParameters_funding_outpoint(const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR this_arg);
	export function DirectedChannelTransactionParameters_funding_outpoint(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectedChannelTransactionParameters_funding_outpoint(this_arg);
		return nativeResponseValue;
	}
	// void HolderCommitmentTransaction_free(struct LDKHolderCommitmentTransaction this_obj);
	export function HolderCommitmentTransaction_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HolderCommitmentTransaction_free(this_obj);
		// debug statements here
	}
	// struct LDKSignature HolderCommitmentTransaction_get_counterparty_sig(const struct LDKHolderCommitmentTransaction *NONNULL_PTR this_ptr);
	export function HolderCommitmentTransaction_get_counterparty_sig(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HolderCommitmentTransaction_get_counterparty_sig(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void HolderCommitmentTransaction_set_counterparty_sig(struct LDKHolderCommitmentTransaction *NONNULL_PTR this_ptr, struct LDKSignature val);
	export function HolderCommitmentTransaction_set_counterparty_sig(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HolderCommitmentTransaction_set_counterparty_sig(this_ptr, encodeArray(val));
		// debug statements here
	}
	// void HolderCommitmentTransaction_set_counterparty_htlc_sigs(struct LDKHolderCommitmentTransaction *NONNULL_PTR this_ptr, struct LDKCVec_SignatureZ val);
	export function HolderCommitmentTransaction_set_counterparty_htlc_sigs(this_ptr: number, val: Uint8Array[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HolderCommitmentTransaction_set_counterparty_htlc_sigs(this_ptr, val);
		// debug statements here
	}
	// struct LDKHolderCommitmentTransaction HolderCommitmentTransaction_clone(const struct LDKHolderCommitmentTransaction *NONNULL_PTR orig);
	export function HolderCommitmentTransaction_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HolderCommitmentTransaction_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z HolderCommitmentTransaction_write(const struct LDKHolderCommitmentTransaction *NONNULL_PTR obj);
	export function HolderCommitmentTransaction_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HolderCommitmentTransaction_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_HolderCommitmentTransactionDecodeErrorZ HolderCommitmentTransaction_read(struct LDKu8slice ser);
	export function HolderCommitmentTransaction_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HolderCommitmentTransaction_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKHolderCommitmentTransaction HolderCommitmentTransaction_new(struct LDKCommitmentTransaction commitment_tx, struct LDKSignature counterparty_sig, struct LDKCVec_SignatureZ counterparty_htlc_sigs, struct LDKPublicKey holder_funding_key, struct LDKPublicKey counterparty_funding_key);
	export function HolderCommitmentTransaction_new(commitment_tx: number, counterparty_sig: Uint8Array, counterparty_htlc_sigs: Uint8Array[], holder_funding_key: Uint8Array, counterparty_funding_key: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.HolderCommitmentTransaction_new(commitment_tx, encodeArray(counterparty_sig), counterparty_htlc_sigs, encodeArray(holder_funding_key), encodeArray(counterparty_funding_key));
		return nativeResponseValue;
	}
	// void BuiltCommitmentTransaction_free(struct LDKBuiltCommitmentTransaction this_obj);
	export function BuiltCommitmentTransaction_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_free(this_obj);
		// debug statements here
	}
	// struct LDKTransaction BuiltCommitmentTransaction_get_transaction(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_ptr);
	export function BuiltCommitmentTransaction_get_transaction(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_get_transaction(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void BuiltCommitmentTransaction_set_transaction(struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_ptr, struct LDKTransaction val);
	export function BuiltCommitmentTransaction_set_transaction(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_set_transaction(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*BuiltCommitmentTransaction_get_txid(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_ptr))[32];
	export function BuiltCommitmentTransaction_get_txid(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_get_txid(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void BuiltCommitmentTransaction_set_txid(struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function BuiltCommitmentTransaction_set_txid(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_set_txid(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKBuiltCommitmentTransaction BuiltCommitmentTransaction_new(struct LDKTransaction transaction_arg, struct LDKThirtyTwoBytes txid_arg);
	export function BuiltCommitmentTransaction_new(transaction_arg: Uint8Array, txid_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_new(encodeArray(transaction_arg), encodeArray(txid_arg));
		return nativeResponseValue;
	}
	// struct LDKBuiltCommitmentTransaction BuiltCommitmentTransaction_clone(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR orig);
	export function BuiltCommitmentTransaction_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z BuiltCommitmentTransaction_write(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR obj);
	export function BuiltCommitmentTransaction_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_BuiltCommitmentTransactionDecodeErrorZ BuiltCommitmentTransaction_read(struct LDKu8slice ser);
	export function BuiltCommitmentTransaction_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKThirtyTwoBytes BuiltCommitmentTransaction_get_sighash_all(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_arg, struct LDKu8slice funding_redeemscript, uint64_t channel_value_satoshis);
	export function BuiltCommitmentTransaction_get_sighash_all(this_arg: number, funding_redeemscript: Uint8Array, channel_value_satoshis: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_get_sighash_all(this_arg, encodeArray(funding_redeemscript), channel_value_satoshis);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKSignature BuiltCommitmentTransaction_sign(const struct LDKBuiltCommitmentTransaction *NONNULL_PTR this_arg, const uint8_t (*funding_key)[32], struct LDKu8slice funding_redeemscript, uint64_t channel_value_satoshis);
	export function BuiltCommitmentTransaction_sign(this_arg: number, funding_key: Uint8Array, funding_redeemscript: Uint8Array, channel_value_satoshis: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BuiltCommitmentTransaction_sign(this_arg, encodeArray(funding_key), encodeArray(funding_redeemscript), channel_value_satoshis);
		return decodeArray(nativeResponseValue);
	}
	// void ClosingTransaction_free(struct LDKClosingTransaction this_obj);
	export function ClosingTransaction_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingTransaction_free(this_obj);
		// debug statements here
	}
	// struct LDKClosingTransaction ClosingTransaction_clone(const struct LDKClosingTransaction *NONNULL_PTR orig);
	export function ClosingTransaction_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingTransaction_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t ClosingTransaction_hash(const struct LDKClosingTransaction *NONNULL_PTR o);
	export function ClosingTransaction_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingTransaction_hash(o);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKClosingTransaction ClosingTransaction_new(uint64_t to_holder_value_sat, uint64_t to_counterparty_value_sat, struct LDKCVec_u8Z to_holder_script, struct LDKCVec_u8Z to_counterparty_script, struct LDKOutPoint funding_outpoint);
	export function ClosingTransaction_new(to_holder_value_sat: number, to_counterparty_value_sat: number, to_holder_script: Uint8Array, to_counterparty_script: Uint8Array, funding_outpoint: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingTransaction_new(to_holder_value_sat, to_counterparty_value_sat, encodeArray(to_holder_script), encodeArray(to_counterparty_script), funding_outpoint);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKTrustedClosingTransaction ClosingTransaction_trust(const struct LDKClosingTransaction *NONNULL_PTR this_arg);
	export function ClosingTransaction_trust(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingTransaction_trust(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_TrustedClosingTransactionNoneZ ClosingTransaction_verify(const struct LDKClosingTransaction *NONNULL_PTR this_arg, struct LDKOutPoint funding_outpoint);
	export function ClosingTransaction_verify(this_arg: number, funding_outpoint: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingTransaction_verify(this_arg, funding_outpoint);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t ClosingTransaction_to_holder_value_sat(const struct LDKClosingTransaction *NONNULL_PTR this_arg);
	export function ClosingTransaction_to_holder_value_sat(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingTransaction_to_holder_value_sat(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t ClosingTransaction_to_counterparty_value_sat(const struct LDKClosingTransaction *NONNULL_PTR this_arg);
	export function ClosingTransaction_to_counterparty_value_sat(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingTransaction_to_counterparty_value_sat(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKu8slice ClosingTransaction_to_holder_script(const struct LDKClosingTransaction *NONNULL_PTR this_arg);
	export function ClosingTransaction_to_holder_script(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingTransaction_to_holder_script(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKu8slice ClosingTransaction_to_counterparty_script(const struct LDKClosingTransaction *NONNULL_PTR this_arg);
	export function ClosingTransaction_to_counterparty_script(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ClosingTransaction_to_counterparty_script(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// void TrustedClosingTransaction_free(struct LDKTrustedClosingTransaction this_obj);
	export function TrustedClosingTransaction_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TrustedClosingTransaction_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKTransaction TrustedClosingTransaction_built_transaction(const struct LDKTrustedClosingTransaction *NONNULL_PTR this_arg);
	export function TrustedClosingTransaction_built_transaction(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TrustedClosingTransaction_built_transaction(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKThirtyTwoBytes TrustedClosingTransaction_get_sighash_all(const struct LDKTrustedClosingTransaction *NONNULL_PTR this_arg, struct LDKu8slice funding_redeemscript, uint64_t channel_value_satoshis);
	export function TrustedClosingTransaction_get_sighash_all(this_arg: number, funding_redeemscript: Uint8Array, channel_value_satoshis: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TrustedClosingTransaction_get_sighash_all(this_arg, encodeArray(funding_redeemscript), channel_value_satoshis);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKSignature TrustedClosingTransaction_sign(const struct LDKTrustedClosingTransaction *NONNULL_PTR this_arg, const uint8_t (*funding_key)[32], struct LDKu8slice funding_redeemscript, uint64_t channel_value_satoshis);
	export function TrustedClosingTransaction_sign(this_arg: number, funding_key: Uint8Array, funding_redeemscript: Uint8Array, channel_value_satoshis: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TrustedClosingTransaction_sign(this_arg, encodeArray(funding_key), encodeArray(funding_redeemscript), channel_value_satoshis);
		return decodeArray(nativeResponseValue);
	}
	// void CommitmentTransaction_free(struct LDKCommitmentTransaction this_obj);
	export function CommitmentTransaction_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentTransaction_free(this_obj);
		// debug statements here
	}
	// struct LDKCommitmentTransaction CommitmentTransaction_clone(const struct LDKCommitmentTransaction *NONNULL_PTR orig);
	export function CommitmentTransaction_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentTransaction_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z CommitmentTransaction_write(const struct LDKCommitmentTransaction *NONNULL_PTR obj);
	export function CommitmentTransaction_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentTransaction_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_CommitmentTransactionDecodeErrorZ CommitmentTransaction_read(struct LDKu8slice ser);
	export function CommitmentTransaction_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentTransaction_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t CommitmentTransaction_commitment_number(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg);
	export function CommitmentTransaction_commitment_number(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentTransaction_commitment_number(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t CommitmentTransaction_to_broadcaster_value_sat(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg);
	export function CommitmentTransaction_to_broadcaster_value_sat(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentTransaction_to_broadcaster_value_sat(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t CommitmentTransaction_to_countersignatory_value_sat(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg);
	export function CommitmentTransaction_to_countersignatory_value_sat(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentTransaction_to_countersignatory_value_sat(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint32_t CommitmentTransaction_feerate_per_kw(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg);
	export function CommitmentTransaction_feerate_per_kw(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentTransaction_feerate_per_kw(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKTrustedCommitmentTransaction CommitmentTransaction_trust(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg);
	export function CommitmentTransaction_trust(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentTransaction_trust(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_TrustedCommitmentTransactionNoneZ CommitmentTransaction_verify(const struct LDKCommitmentTransaction *NONNULL_PTR this_arg, const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR channel_parameters, const struct LDKChannelPublicKeys *NONNULL_PTR broadcaster_keys, const struct LDKChannelPublicKeys *NONNULL_PTR countersignatory_keys);
	export function CommitmentTransaction_verify(this_arg: number, channel_parameters: number, broadcaster_keys: number, countersignatory_keys: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CommitmentTransaction_verify(this_arg, channel_parameters, broadcaster_keys, countersignatory_keys);
		return nativeResponseValue;
	}
	// void TrustedCommitmentTransaction_free(struct LDKTrustedCommitmentTransaction this_obj);
	export function TrustedCommitmentTransaction_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TrustedCommitmentTransaction_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKThirtyTwoBytes TrustedCommitmentTransaction_txid(const struct LDKTrustedCommitmentTransaction *NONNULL_PTR this_arg);
	export function TrustedCommitmentTransaction_txid(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TrustedCommitmentTransaction_txid(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKBuiltCommitmentTransaction TrustedCommitmentTransaction_built_transaction(const struct LDKTrustedCommitmentTransaction *NONNULL_PTR this_arg);
	export function TrustedCommitmentTransaction_built_transaction(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TrustedCommitmentTransaction_built_transaction(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKTxCreationKeys TrustedCommitmentTransaction_keys(const struct LDKTrustedCommitmentTransaction *NONNULL_PTR this_arg);
	export function TrustedCommitmentTransaction_keys(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TrustedCommitmentTransaction_keys(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_CVec_SignatureZNoneZ TrustedCommitmentTransaction_get_htlc_sigs(const struct LDKTrustedCommitmentTransaction *NONNULL_PTR this_arg, const uint8_t (*htlc_base_key)[32], const struct LDKDirectedChannelTransactionParameters *NONNULL_PTR channel_parameters);
	export function TrustedCommitmentTransaction_get_htlc_sigs(this_arg: number, htlc_base_key: Uint8Array, channel_parameters: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.TrustedCommitmentTransaction_get_htlc_sigs(this_arg, encodeArray(htlc_base_key), channel_parameters);
		return nativeResponseValue;
	}
	// uint64_t get_commitment_transaction_number_obscure_factor(struct LDKPublicKey broadcaster_payment_basepoint, struct LDKPublicKey countersignatory_payment_basepoint, bool outbound_from_broadcaster);
	export function get_commitment_transaction_number_obscure_factor(broadcaster_payment_basepoint: Uint8Array, countersignatory_payment_basepoint: Uint8Array, outbound_from_broadcaster: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.get_commitment_transaction_number_obscure_factor(encodeArray(broadcaster_payment_basepoint), encodeArray(countersignatory_payment_basepoint), outbound_from_broadcaster);
		return nativeResponseValue;
	}
	// bool InitFeatures_eq(const struct LDKInitFeatures *NONNULL_PTR a, const struct LDKInitFeatures *NONNULL_PTR b);
	export function InitFeatures_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InitFeatures_eq(a, b);
		return nativeResponseValue;
	}
	// bool NodeFeatures_eq(const struct LDKNodeFeatures *NONNULL_PTR a, const struct LDKNodeFeatures *NONNULL_PTR b);
	export function NodeFeatures_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeFeatures_eq(a, b);
		return nativeResponseValue;
	}
	// bool ChannelFeatures_eq(const struct LDKChannelFeatures *NONNULL_PTR a, const struct LDKChannelFeatures *NONNULL_PTR b);
	export function ChannelFeatures_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelFeatures_eq(a, b);
		return nativeResponseValue;
	}
	// bool InvoiceFeatures_eq(const struct LDKInvoiceFeatures *NONNULL_PTR a, const struct LDKInvoiceFeatures *NONNULL_PTR b);
	export function InvoiceFeatures_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceFeatures_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKInitFeatures InitFeatures_clone(const struct LDKInitFeatures *NONNULL_PTR orig);
	export function InitFeatures_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InitFeatures_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKNodeFeatures NodeFeatures_clone(const struct LDKNodeFeatures *NONNULL_PTR orig);
	export function NodeFeatures_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeFeatures_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKChannelFeatures ChannelFeatures_clone(const struct LDKChannelFeatures *NONNULL_PTR orig);
	export function ChannelFeatures_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelFeatures_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKInvoiceFeatures InvoiceFeatures_clone(const struct LDKInvoiceFeatures *NONNULL_PTR orig);
	export function InvoiceFeatures_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceFeatures_clone(orig);
		return nativeResponseValue;
	}
	// void InitFeatures_free(struct LDKInitFeatures this_obj);
	export function InitFeatures_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InitFeatures_free(this_obj);
		// debug statements here
	}
	// void NodeFeatures_free(struct LDKNodeFeatures this_obj);
	export function NodeFeatures_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeFeatures_free(this_obj);
		// debug statements here
	}
	// void ChannelFeatures_free(struct LDKChannelFeatures this_obj);
	export function ChannelFeatures_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelFeatures_free(this_obj);
		// debug statements here
	}
	// void InvoiceFeatures_free(struct LDKInvoiceFeatures this_obj);
	export function InvoiceFeatures_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceFeatures_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKInitFeatures InitFeatures_empty(void);
	export function InitFeatures_empty(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InitFeatures_empty();
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKInitFeatures InitFeatures_known(void);
	export function InitFeatures_known(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InitFeatures_known();
		return nativeResponseValue;
	}
	// MUST_USE_RES bool InitFeatures_requires_unknown_bits(const struct LDKInitFeatures *NONNULL_PTR this_arg);
	export function InitFeatures_requires_unknown_bits(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InitFeatures_requires_unknown_bits(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKNodeFeatures NodeFeatures_empty(void);
	export function NodeFeatures_empty(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeFeatures_empty();
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKNodeFeatures NodeFeatures_known(void);
	export function NodeFeatures_known(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeFeatures_known();
		return nativeResponseValue;
	}
	// MUST_USE_RES bool NodeFeatures_requires_unknown_bits(const struct LDKNodeFeatures *NONNULL_PTR this_arg);
	export function NodeFeatures_requires_unknown_bits(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeFeatures_requires_unknown_bits(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKChannelFeatures ChannelFeatures_empty(void);
	export function ChannelFeatures_empty(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelFeatures_empty();
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKChannelFeatures ChannelFeatures_known(void);
	export function ChannelFeatures_known(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelFeatures_known();
		return nativeResponseValue;
	}
	// MUST_USE_RES bool ChannelFeatures_requires_unknown_bits(const struct LDKChannelFeatures *NONNULL_PTR this_arg);
	export function ChannelFeatures_requires_unknown_bits(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelFeatures_requires_unknown_bits(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKInvoiceFeatures InvoiceFeatures_empty(void);
	export function InvoiceFeatures_empty(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceFeatures_empty();
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKInvoiceFeatures InvoiceFeatures_known(void);
	export function InvoiceFeatures_known(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceFeatures_known();
		return nativeResponseValue;
	}
	// MUST_USE_RES bool InvoiceFeatures_requires_unknown_bits(const struct LDKInvoiceFeatures *NONNULL_PTR this_arg);
	export function InvoiceFeatures_requires_unknown_bits(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceFeatures_requires_unknown_bits(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES bool InitFeatures_supports_payment_secret(const struct LDKInitFeatures *NONNULL_PTR this_arg);
	export function InitFeatures_supports_payment_secret(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InitFeatures_supports_payment_secret(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES bool NodeFeatures_supports_payment_secret(const struct LDKNodeFeatures *NONNULL_PTR this_arg);
	export function NodeFeatures_supports_payment_secret(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeFeatures_supports_payment_secret(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES bool InvoiceFeatures_supports_payment_secret(const struct LDKInvoiceFeatures *NONNULL_PTR this_arg);
	export function InvoiceFeatures_supports_payment_secret(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceFeatures_supports_payment_secret(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z InitFeatures_write(const struct LDKInitFeatures *NONNULL_PTR obj);
	export function InitFeatures_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InitFeatures_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCVec_u8Z NodeFeatures_write(const struct LDKNodeFeatures *NONNULL_PTR obj);
	export function NodeFeatures_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeFeatures_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCVec_u8Z ChannelFeatures_write(const struct LDKChannelFeatures *NONNULL_PTR obj);
	export function ChannelFeatures_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelFeatures_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCVec_u8Z InvoiceFeatures_write(const struct LDKInvoiceFeatures *NONNULL_PTR obj);
	export function InvoiceFeatures_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceFeatures_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_InitFeaturesDecodeErrorZ InitFeatures_read(struct LDKu8slice ser);
	export function InitFeatures_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InitFeatures_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCResult_NodeFeaturesDecodeErrorZ NodeFeatures_read(struct LDKu8slice ser);
	export function NodeFeatures_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeFeatures_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCResult_ChannelFeaturesDecodeErrorZ ChannelFeatures_read(struct LDKu8slice ser);
	export function ChannelFeatures_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelFeatures_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCResult_InvoiceFeaturesDecodeErrorZ InvoiceFeatures_read(struct LDKu8slice ser);
	export function InvoiceFeatures_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceFeatures_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void ShutdownScript_free(struct LDKShutdownScript this_obj);
	export function ShutdownScript_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ShutdownScript_free(this_obj);
		// debug statements here
	}
	// struct LDKShutdownScript ShutdownScript_clone(const struct LDKShutdownScript *NONNULL_PTR orig);
	export function ShutdownScript_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ShutdownScript_clone(orig);
		return nativeResponseValue;
	}
	// void InvalidShutdownScript_free(struct LDKInvalidShutdownScript this_obj);
	export function InvalidShutdownScript_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvalidShutdownScript_free(this_obj);
		// debug statements here
	}
	// struct LDKu8slice InvalidShutdownScript_get_script(const struct LDKInvalidShutdownScript *NONNULL_PTR this_ptr);
	export function InvalidShutdownScript_get_script(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvalidShutdownScript_get_script(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void InvalidShutdownScript_set_script(struct LDKInvalidShutdownScript *NONNULL_PTR this_ptr, struct LDKCVec_u8Z val);
	export function InvalidShutdownScript_set_script(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvalidShutdownScript_set_script(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKInvalidShutdownScript InvalidShutdownScript_new(struct LDKCVec_u8Z script_arg);
	export function InvalidShutdownScript_new(script_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvalidShutdownScript_new(encodeArray(script_arg));
		return nativeResponseValue;
	}
	// struct LDKInvalidShutdownScript InvalidShutdownScript_clone(const struct LDKInvalidShutdownScript *NONNULL_PTR orig);
	export function InvalidShutdownScript_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvalidShutdownScript_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ShutdownScript_write(const struct LDKShutdownScript *NONNULL_PTR obj);
	export function ShutdownScript_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ShutdownScript_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ShutdownScriptDecodeErrorZ ShutdownScript_read(struct LDKu8slice ser);
	export function ShutdownScript_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ShutdownScript_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKShutdownScript ShutdownScript_new_p2wpkh(const uint8_t (*pubkey_hash)[20]);
	export function ShutdownScript_new_p2wpkh(pubkey_hash: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ShutdownScript_new_p2wpkh(encodeArray(pubkey_hash));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKShutdownScript ShutdownScript_new_p2wsh(const uint8_t (*script_hash)[32]);
	export function ShutdownScript_new_p2wsh(script_hash: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ShutdownScript_new_p2wsh(encodeArray(script_hash));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_ShutdownScriptInvalidShutdownScriptZ ShutdownScript_new_witness_program(uint8_t version, struct LDKu8slice program);
	export function ShutdownScript_new_witness_program(version: number, program: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ShutdownScript_new_witness_program(version, encodeArray(program));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_u8Z ShutdownScript_into_inner(struct LDKShutdownScript this_arg);
	export function ShutdownScript_into_inner(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ShutdownScript_into_inner(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKPublicKey ShutdownScript_as_legacy_pubkey(const struct LDKShutdownScript *NONNULL_PTR this_arg);
	export function ShutdownScript_as_legacy_pubkey(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ShutdownScript_as_legacy_pubkey(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES bool ShutdownScript_is_compatible(const struct LDKShutdownScript *NONNULL_PTR this_arg, const struct LDKInitFeatures *NONNULL_PTR features);
	export function ShutdownScript_is_compatible(this_arg: number, features: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ShutdownScript_is_compatible(this_arg, features);
		return nativeResponseValue;
	}
	// void CustomMessageReader_free(struct LDKCustomMessageReader this_ptr);
	export function CustomMessageReader_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CustomMessageReader_free(this_ptr);
		// debug statements here
	}
	// struct LDKType Type_clone(const struct LDKType *NONNULL_PTR orig);
	export function Type_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Type_clone(orig);
		return nativeResponseValue;
	}
	// void Type_free(struct LDKType this_ptr);
	export function Type_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Type_free(this_ptr);
		// debug statements here
	}
	// void Score_free(struct LDKScore this_ptr);
	export function Score_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Score_free(this_ptr);
		// debug statements here
	}
	// void LockableScore_free(struct LDKLockableScore this_obj);
	export function LockableScore_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LockableScore_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKLockableScore LockableScore_new(struct LDKScore score);
	export function LockableScore_new(score: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LockableScore_new(score);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z LockableScore_write(const struct LDKLockableScore *NONNULL_PTR obj);
	export function LockableScore_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.LockableScore_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// void NodeId_free(struct LDKNodeId this_obj);
	export function NodeId_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeId_free(this_obj);
		// debug statements here
	}
	// struct LDKNodeId NodeId_clone(const struct LDKNodeId *NONNULL_PTR orig);
	export function NodeId_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeId_clone(orig);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKNodeId NodeId_from_pubkey(struct LDKPublicKey pubkey);
	export function NodeId_from_pubkey(pubkey: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeId_from_pubkey(encodeArray(pubkey));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKu8slice NodeId_as_slice(const struct LDKNodeId *NONNULL_PTR this_arg);
	export function NodeId_as_slice(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeId_as_slice(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// uint64_t NodeId_hash(const struct LDKNodeId *NONNULL_PTR o);
	export function NodeId_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeId_hash(o);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z NodeId_write(const struct LDKNodeId *NONNULL_PTR obj);
	export function NodeId_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeId_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_NodeIdDecodeErrorZ NodeId_read(struct LDKu8slice ser);
	export function NodeId_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeId_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void NetworkGraph_free(struct LDKNetworkGraph this_obj);
	export function NetworkGraph_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_free(this_obj);
		// debug statements here
	}
	// struct LDKNetworkGraph NetworkGraph_clone(const struct LDKNetworkGraph *NONNULL_PTR orig);
	export function NetworkGraph_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_clone(orig);
		return nativeResponseValue;
	}
	// void ReadOnlyNetworkGraph_free(struct LDKReadOnlyNetworkGraph this_obj);
	export function ReadOnlyNetworkGraph_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReadOnlyNetworkGraph_free(this_obj);
		// debug statements here
	}
	// void NetworkUpdate_free(struct LDKNetworkUpdate this_ptr);
	export function NetworkUpdate_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkUpdate_free(this_ptr);
		// debug statements here
	}
	// struct LDKNetworkUpdate NetworkUpdate_clone(const struct LDKNetworkUpdate *NONNULL_PTR orig);
	export function NetworkUpdate_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkUpdate_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKNetworkUpdate NetworkUpdate_channel_update_message(struct LDKChannelUpdate msg);
	export function NetworkUpdate_channel_update_message(msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkUpdate_channel_update_message(msg);
		return nativeResponseValue;
	}
	// struct LDKNetworkUpdate NetworkUpdate_channel_closed(uint64_t short_channel_id, bool is_permanent);
	export function NetworkUpdate_channel_closed(short_channel_id: number, is_permanent: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkUpdate_channel_closed(short_channel_id, is_permanent);
		return nativeResponseValue;
	}
	// struct LDKNetworkUpdate NetworkUpdate_node_failure(struct LDKPublicKey node_id, bool is_permanent);
	export function NetworkUpdate_node_failure(node_id: Uint8Array, is_permanent: boolean): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkUpdate_node_failure(encodeArray(node_id), is_permanent);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z NetworkUpdate_write(const struct LDKNetworkUpdate *NONNULL_PTR obj);
	export function NetworkUpdate_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkUpdate_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKEventHandler NetGraphMsgHandler_as_EventHandler(const struct LDKNetGraphMsgHandler *NONNULL_PTR this_arg);
	export function NetGraphMsgHandler_as_EventHandler(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetGraphMsgHandler_as_EventHandler(this_arg);
		return nativeResponseValue;
	}
	// void NetGraphMsgHandler_free(struct LDKNetGraphMsgHandler this_obj);
	export function NetGraphMsgHandler_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetGraphMsgHandler_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKNetGraphMsgHandler NetGraphMsgHandler_new(const struct LDKNetworkGraph *NONNULL_PTR network_graph, struct LDKCOption_AccessZ chain_access, struct LDKLogger logger);
	export function NetGraphMsgHandler_new(network_graph: number, chain_access: number, logger: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetGraphMsgHandler_new(network_graph, chain_access, logger);
		return nativeResponseValue;
	}
	// void NetGraphMsgHandler_add_chain_access(struct LDKNetGraphMsgHandler *NONNULL_PTR this_arg, struct LDKCOption_AccessZ chain_access);
	export function NetGraphMsgHandler_add_chain_access(this_arg: number, chain_access: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetGraphMsgHandler_add_chain_access(this_arg, chain_access);
		// debug statements here
	}
	// struct LDKRoutingMessageHandler NetGraphMsgHandler_as_RoutingMessageHandler(const struct LDKNetGraphMsgHandler *NONNULL_PTR this_arg);
	export function NetGraphMsgHandler_as_RoutingMessageHandler(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetGraphMsgHandler_as_RoutingMessageHandler(this_arg);
		return nativeResponseValue;
	}
	// struct LDKMessageSendEventsProvider NetGraphMsgHandler_as_MessageSendEventsProvider(const struct LDKNetGraphMsgHandler *NONNULL_PTR this_arg);
	export function NetGraphMsgHandler_as_MessageSendEventsProvider(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetGraphMsgHandler_as_MessageSendEventsProvider(this_arg);
		return nativeResponseValue;
	}
	// void DirectionalChannelInfo_free(struct LDKDirectionalChannelInfo this_obj);
	export function DirectionalChannelInfo_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_free(this_obj);
		// debug statements here
	}
	// uint32_t DirectionalChannelInfo_get_last_update(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	export function DirectionalChannelInfo_get_last_update(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_get_last_update(this_ptr);
		return nativeResponseValue;
	}
	// void DirectionalChannelInfo_set_last_update(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, uint32_t val);
	export function DirectionalChannelInfo_set_last_update(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_set_last_update(this_ptr, val);
		// debug statements here
	}
	// bool DirectionalChannelInfo_get_enabled(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	export function DirectionalChannelInfo_get_enabled(this_ptr: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_get_enabled(this_ptr);
		return nativeResponseValue;
	}
	// void DirectionalChannelInfo_set_enabled(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, bool val);
	export function DirectionalChannelInfo_set_enabled(this_ptr: number, val: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_set_enabled(this_ptr, val);
		// debug statements here
	}
	// uint16_t DirectionalChannelInfo_get_cltv_expiry_delta(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	export function DirectionalChannelInfo_get_cltv_expiry_delta(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_get_cltv_expiry_delta(this_ptr);
		return nativeResponseValue;
	}
	// void DirectionalChannelInfo_set_cltv_expiry_delta(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, uint16_t val);
	export function DirectionalChannelInfo_set_cltv_expiry_delta(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_set_cltv_expiry_delta(this_ptr, val);
		// debug statements here
	}
	// uint64_t DirectionalChannelInfo_get_htlc_minimum_msat(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	export function DirectionalChannelInfo_get_htlc_minimum_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_get_htlc_minimum_msat(this_ptr);
		return nativeResponseValue;
	}
	// void DirectionalChannelInfo_set_htlc_minimum_msat(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, uint64_t val);
	export function DirectionalChannelInfo_set_htlc_minimum_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_set_htlc_minimum_msat(this_ptr, val);
		// debug statements here
	}
	// struct LDKCOption_u64Z DirectionalChannelInfo_get_htlc_maximum_msat(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	export function DirectionalChannelInfo_get_htlc_maximum_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_get_htlc_maximum_msat(this_ptr);
		return nativeResponseValue;
	}
	// void DirectionalChannelInfo_set_htlc_maximum_msat(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, struct LDKCOption_u64Z val);
	export function DirectionalChannelInfo_set_htlc_maximum_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_set_htlc_maximum_msat(this_ptr, val);
		// debug statements here
	}
	// struct LDKRoutingFees DirectionalChannelInfo_get_fees(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	export function DirectionalChannelInfo_get_fees(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_get_fees(this_ptr);
		return nativeResponseValue;
	}
	// void DirectionalChannelInfo_set_fees(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, struct LDKRoutingFees val);
	export function DirectionalChannelInfo_set_fees(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_set_fees(this_ptr, val);
		// debug statements here
	}
	// struct LDKChannelUpdate DirectionalChannelInfo_get_last_update_message(const struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr);
	export function DirectionalChannelInfo_get_last_update_message(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_get_last_update_message(this_ptr);
		return nativeResponseValue;
	}
	// void DirectionalChannelInfo_set_last_update_message(struct LDKDirectionalChannelInfo *NONNULL_PTR this_ptr, struct LDKChannelUpdate val);
	export function DirectionalChannelInfo_set_last_update_message(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_set_last_update_message(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKDirectionalChannelInfo DirectionalChannelInfo_new(uint32_t last_update_arg, bool enabled_arg, uint16_t cltv_expiry_delta_arg, uint64_t htlc_minimum_msat_arg, struct LDKCOption_u64Z htlc_maximum_msat_arg, struct LDKRoutingFees fees_arg, struct LDKChannelUpdate last_update_message_arg);
	export function DirectionalChannelInfo_new(last_update_arg: number, enabled_arg: boolean, cltv_expiry_delta_arg: number, htlc_minimum_msat_arg: number, htlc_maximum_msat_arg: number, fees_arg: number, last_update_message_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_new(last_update_arg, enabled_arg, cltv_expiry_delta_arg, htlc_minimum_msat_arg, htlc_maximum_msat_arg, fees_arg, last_update_message_arg);
		return nativeResponseValue;
	}
	// struct LDKDirectionalChannelInfo DirectionalChannelInfo_clone(const struct LDKDirectionalChannelInfo *NONNULL_PTR orig);
	export function DirectionalChannelInfo_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z DirectionalChannelInfo_write(const struct LDKDirectionalChannelInfo *NONNULL_PTR obj);
	export function DirectionalChannelInfo_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_DirectionalChannelInfoDecodeErrorZ DirectionalChannelInfo_read(struct LDKu8slice ser);
	export function DirectionalChannelInfo_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DirectionalChannelInfo_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void ChannelInfo_free(struct LDKChannelInfo this_obj);
	export function ChannelInfo_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_free(this_obj);
		// debug statements here
	}
	// struct LDKChannelFeatures ChannelInfo_get_features(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	export function ChannelInfo_get_features(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_get_features(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelInfo_set_features(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKChannelFeatures val);
	export function ChannelInfo_set_features(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_set_features(this_ptr, val);
		// debug statements here
	}
	// struct LDKNodeId ChannelInfo_get_node_one(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	export function ChannelInfo_get_node_one(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_get_node_one(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelInfo_set_node_one(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKNodeId val);
	export function ChannelInfo_set_node_one(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_set_node_one(this_ptr, val);
		// debug statements here
	}
	// struct LDKDirectionalChannelInfo ChannelInfo_get_one_to_two(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	export function ChannelInfo_get_one_to_two(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_get_one_to_two(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelInfo_set_one_to_two(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKDirectionalChannelInfo val);
	export function ChannelInfo_set_one_to_two(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_set_one_to_two(this_ptr, val);
		// debug statements here
	}
	// struct LDKNodeId ChannelInfo_get_node_two(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	export function ChannelInfo_get_node_two(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_get_node_two(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelInfo_set_node_two(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKNodeId val);
	export function ChannelInfo_set_node_two(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_set_node_two(this_ptr, val);
		// debug statements here
	}
	// struct LDKDirectionalChannelInfo ChannelInfo_get_two_to_one(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	export function ChannelInfo_get_two_to_one(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_get_two_to_one(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelInfo_set_two_to_one(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKDirectionalChannelInfo val);
	export function ChannelInfo_set_two_to_one(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_set_two_to_one(this_ptr, val);
		// debug statements here
	}
	// struct LDKCOption_u64Z ChannelInfo_get_capacity_sats(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	export function ChannelInfo_get_capacity_sats(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_get_capacity_sats(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelInfo_set_capacity_sats(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKCOption_u64Z val);
	export function ChannelInfo_set_capacity_sats(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_set_capacity_sats(this_ptr, val);
		// debug statements here
	}
	// struct LDKChannelAnnouncement ChannelInfo_get_announcement_message(const struct LDKChannelInfo *NONNULL_PTR this_ptr);
	export function ChannelInfo_get_announcement_message(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_get_announcement_message(this_ptr);
		return nativeResponseValue;
	}
	// void ChannelInfo_set_announcement_message(struct LDKChannelInfo *NONNULL_PTR this_ptr, struct LDKChannelAnnouncement val);
	export function ChannelInfo_set_announcement_message(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_set_announcement_message(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKChannelInfo ChannelInfo_new(struct LDKChannelFeatures features_arg, struct LDKNodeId node_one_arg, struct LDKDirectionalChannelInfo one_to_two_arg, struct LDKNodeId node_two_arg, struct LDKDirectionalChannelInfo two_to_one_arg, struct LDKCOption_u64Z capacity_sats_arg, struct LDKChannelAnnouncement announcement_message_arg);
	export function ChannelInfo_new(features_arg: number, node_one_arg: number, one_to_two_arg: number, node_two_arg: number, two_to_one_arg: number, capacity_sats_arg: number, announcement_message_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_new(features_arg, node_one_arg, one_to_two_arg, node_two_arg, two_to_one_arg, capacity_sats_arg, announcement_message_arg);
		return nativeResponseValue;
	}
	// struct LDKChannelInfo ChannelInfo_clone(const struct LDKChannelInfo *NONNULL_PTR orig);
	export function ChannelInfo_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ChannelInfo_write(const struct LDKChannelInfo *NONNULL_PTR obj);
	export function ChannelInfo_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ChannelInfoDecodeErrorZ ChannelInfo_read(struct LDKu8slice ser);
	export function ChannelInfo_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelInfo_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void RoutingFees_free(struct LDKRoutingFees this_obj);
	export function RoutingFees_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_free(this_obj);
		// debug statements here
	}
	// uint32_t RoutingFees_get_base_msat(const struct LDKRoutingFees *NONNULL_PTR this_ptr);
	export function RoutingFees_get_base_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_get_base_msat(this_ptr);
		return nativeResponseValue;
	}
	// void RoutingFees_set_base_msat(struct LDKRoutingFees *NONNULL_PTR this_ptr, uint32_t val);
	export function RoutingFees_set_base_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_set_base_msat(this_ptr, val);
		// debug statements here
	}
	// uint32_t RoutingFees_get_proportional_millionths(const struct LDKRoutingFees *NONNULL_PTR this_ptr);
	export function RoutingFees_get_proportional_millionths(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_get_proportional_millionths(this_ptr);
		return nativeResponseValue;
	}
	// void RoutingFees_set_proportional_millionths(struct LDKRoutingFees *NONNULL_PTR this_ptr, uint32_t val);
	export function RoutingFees_set_proportional_millionths(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_set_proportional_millionths(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKRoutingFees RoutingFees_new(uint32_t base_msat_arg, uint32_t proportional_millionths_arg);
	export function RoutingFees_new(base_msat_arg: number, proportional_millionths_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_new(base_msat_arg, proportional_millionths_arg);
		return nativeResponseValue;
	}
	// bool RoutingFees_eq(const struct LDKRoutingFees *NONNULL_PTR a, const struct LDKRoutingFees *NONNULL_PTR b);
	export function RoutingFees_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKRoutingFees RoutingFees_clone(const struct LDKRoutingFees *NONNULL_PTR orig);
	export function RoutingFees_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t RoutingFees_hash(const struct LDKRoutingFees *NONNULL_PTR o);
	export function RoutingFees_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_hash(o);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z RoutingFees_write(const struct LDKRoutingFees *NONNULL_PTR obj);
	export function RoutingFees_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_RoutingFeesDecodeErrorZ RoutingFees_read(struct LDKu8slice ser);
	export function RoutingFees_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RoutingFees_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void NodeAnnouncementInfo_free(struct LDKNodeAnnouncementInfo this_obj);
	export function NodeAnnouncementInfo_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_free(this_obj);
		// debug statements here
	}
	// struct LDKNodeFeatures NodeAnnouncementInfo_get_features(const struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr);
	export function NodeAnnouncementInfo_get_features(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_get_features(this_ptr);
		return nativeResponseValue;
	}
	// void NodeAnnouncementInfo_set_features(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, struct LDKNodeFeatures val);
	export function NodeAnnouncementInfo_set_features(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_set_features(this_ptr, val);
		// debug statements here
	}
	// uint32_t NodeAnnouncementInfo_get_last_update(const struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr);
	export function NodeAnnouncementInfo_get_last_update(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_get_last_update(this_ptr);
		return nativeResponseValue;
	}
	// void NodeAnnouncementInfo_set_last_update(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, uint32_t val);
	export function NodeAnnouncementInfo_set_last_update(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_set_last_update(this_ptr, val);
		// debug statements here
	}
	// const uint8_t (*NodeAnnouncementInfo_get_rgb(const struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr))[3];
	export function NodeAnnouncementInfo_get_rgb(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_get_rgb(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void NodeAnnouncementInfo_set_rgb(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, struct LDKThreeBytes val);
	export function NodeAnnouncementInfo_set_rgb(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_set_rgb(this_ptr, encodeArray(val));
		// debug statements here
	}
	// const uint8_t (*NodeAnnouncementInfo_get_alias(const struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr))[32];
	export function NodeAnnouncementInfo_get_alias(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_get_alias(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void NodeAnnouncementInfo_set_alias(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, struct LDKThirtyTwoBytes val);
	export function NodeAnnouncementInfo_set_alias(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_set_alias(this_ptr, encodeArray(val));
		// debug statements here
	}
	// void NodeAnnouncementInfo_set_addresses(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, struct LDKCVec_NetAddressZ val);
	export function NodeAnnouncementInfo_set_addresses(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_set_addresses(this_ptr, val);
		// debug statements here
	}
	// struct LDKNodeAnnouncement NodeAnnouncementInfo_get_announcement_message(const struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr);
	export function NodeAnnouncementInfo_get_announcement_message(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_get_announcement_message(this_ptr);
		return nativeResponseValue;
	}
	// void NodeAnnouncementInfo_set_announcement_message(struct LDKNodeAnnouncementInfo *NONNULL_PTR this_ptr, struct LDKNodeAnnouncement val);
	export function NodeAnnouncementInfo_set_announcement_message(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_set_announcement_message(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKNodeAnnouncementInfo NodeAnnouncementInfo_new(struct LDKNodeFeatures features_arg, uint32_t last_update_arg, struct LDKThreeBytes rgb_arg, struct LDKThirtyTwoBytes alias_arg, struct LDKCVec_NetAddressZ addresses_arg, struct LDKNodeAnnouncement announcement_message_arg);
	export function NodeAnnouncementInfo_new(features_arg: number, last_update_arg: number, rgb_arg: Uint8Array, alias_arg: Uint8Array, addresses_arg: number[], announcement_message_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_new(features_arg, last_update_arg, encodeArray(rgb_arg), encodeArray(alias_arg), addresses_arg, announcement_message_arg);
		return nativeResponseValue;
	}
	// struct LDKNodeAnnouncementInfo NodeAnnouncementInfo_clone(const struct LDKNodeAnnouncementInfo *NONNULL_PTR orig);
	export function NodeAnnouncementInfo_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z NodeAnnouncementInfo_write(const struct LDKNodeAnnouncementInfo *NONNULL_PTR obj);
	export function NodeAnnouncementInfo_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_NodeAnnouncementInfoDecodeErrorZ NodeAnnouncementInfo_read(struct LDKu8slice ser);
	export function NodeAnnouncementInfo_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeAnnouncementInfo_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void NodeInfo_free(struct LDKNodeInfo this_obj);
	export function NodeInfo_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeInfo_free(this_obj);
		// debug statements here
	}
	// void NodeInfo_set_channels(struct LDKNodeInfo *NONNULL_PTR this_ptr, struct LDKCVec_u64Z val);
	export function NodeInfo_set_channels(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeInfo_set_channels(this_ptr, val);
		// debug statements here
	}
	// struct LDKRoutingFees NodeInfo_get_lowest_inbound_channel_fees(const struct LDKNodeInfo *NONNULL_PTR this_ptr);
	export function NodeInfo_get_lowest_inbound_channel_fees(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeInfo_get_lowest_inbound_channel_fees(this_ptr);
		return nativeResponseValue;
	}
	// void NodeInfo_set_lowest_inbound_channel_fees(struct LDKNodeInfo *NONNULL_PTR this_ptr, struct LDKRoutingFees val);
	export function NodeInfo_set_lowest_inbound_channel_fees(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeInfo_set_lowest_inbound_channel_fees(this_ptr, val);
		// debug statements here
	}
	// struct LDKNodeAnnouncementInfo NodeInfo_get_announcement_info(const struct LDKNodeInfo *NONNULL_PTR this_ptr);
	export function NodeInfo_get_announcement_info(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeInfo_get_announcement_info(this_ptr);
		return nativeResponseValue;
	}
	// void NodeInfo_set_announcement_info(struct LDKNodeInfo *NONNULL_PTR this_ptr, struct LDKNodeAnnouncementInfo val);
	export function NodeInfo_set_announcement_info(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeInfo_set_announcement_info(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKNodeInfo NodeInfo_new(struct LDKCVec_u64Z channels_arg, struct LDKRoutingFees lowest_inbound_channel_fees_arg, struct LDKNodeAnnouncementInfo announcement_info_arg);
	export function NodeInfo_new(channels_arg: number[], lowest_inbound_channel_fees_arg: number, announcement_info_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeInfo_new(channels_arg, lowest_inbound_channel_fees_arg, announcement_info_arg);
		return nativeResponseValue;
	}
	// struct LDKNodeInfo NodeInfo_clone(const struct LDKNodeInfo *NONNULL_PTR orig);
	export function NodeInfo_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeInfo_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z NodeInfo_write(const struct LDKNodeInfo *NONNULL_PTR obj);
	export function NodeInfo_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeInfo_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_NodeInfoDecodeErrorZ NodeInfo_read(struct LDKu8slice ser);
	export function NodeInfo_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NodeInfo_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z NetworkGraph_write(const struct LDKNetworkGraph *NONNULL_PTR obj);
	export function NetworkGraph_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_NetworkGraphDecodeErrorZ NetworkGraph_read(struct LDKu8slice ser);
	export function NetworkGraph_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKNetworkGraph NetworkGraph_new(struct LDKThirtyTwoBytes genesis_hash);
	export function NetworkGraph_new(genesis_hash: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_new(encodeArray(genesis_hash));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKReadOnlyNetworkGraph NetworkGraph_read_only(const struct LDKNetworkGraph *NONNULL_PTR this_arg);
	export function NetworkGraph_read_only(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_read_only(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_node_from_announcement(const struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKNodeAnnouncement *NONNULL_PTR msg);
	export function NetworkGraph_update_node_from_announcement(this_arg: number, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_update_node_from_announcement(this_arg, msg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_node_from_unsigned_announcement(const struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKUnsignedNodeAnnouncement *NONNULL_PTR msg);
	export function NetworkGraph_update_node_from_unsigned_announcement(this_arg: number, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_update_node_from_unsigned_announcement(this_arg, msg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_channel_from_announcement(const struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKChannelAnnouncement *NONNULL_PTR msg, struct LDKCOption_AccessZ chain_access);
	export function NetworkGraph_update_channel_from_announcement(this_arg: number, msg: number, chain_access: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_update_channel_from_announcement(this_arg, msg, chain_access);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_channel_from_unsigned_announcement(const struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKUnsignedChannelAnnouncement *NONNULL_PTR msg, struct LDKCOption_AccessZ chain_access);
	export function NetworkGraph_update_channel_from_unsigned_announcement(this_arg: number, msg: number, chain_access: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_update_channel_from_unsigned_announcement(this_arg, msg, chain_access);
		return nativeResponseValue;
	}
	// void NetworkGraph_close_channel_from_update(const struct LDKNetworkGraph *NONNULL_PTR this_arg, uint64_t short_channel_id, bool is_permanent);
	export function NetworkGraph_close_channel_from_update(this_arg: number, short_channel_id: number, is_permanent: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_close_channel_from_update(this_arg, short_channel_id, is_permanent);
		// debug statements here
	}
	// void NetworkGraph_fail_node(const struct LDKNetworkGraph *NONNULL_PTR this_arg, struct LDKPublicKey _node_id, bool is_permanent);
	export function NetworkGraph_fail_node(this_arg: number, _node_id: Uint8Array, is_permanent: boolean): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_fail_node(this_arg, encodeArray(_node_id), is_permanent);
		// debug statements here
	}
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_channel(const struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKChannelUpdate *NONNULL_PTR msg);
	export function NetworkGraph_update_channel(this_arg: number, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_update_channel(this_arg, msg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneLightningErrorZ NetworkGraph_update_channel_unsigned(const struct LDKNetworkGraph *NONNULL_PTR this_arg, const struct LDKUnsignedChannelUpdate *NONNULL_PTR msg);
	export function NetworkGraph_update_channel_unsigned(this_arg: number, msg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.NetworkGraph_update_channel_unsigned(this_arg, msg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCOption_CVec_NetAddressZZ ReadOnlyNetworkGraph_get_addresses(const struct LDKReadOnlyNetworkGraph *NONNULL_PTR this_arg, struct LDKPublicKey pubkey);
	export function ReadOnlyNetworkGraph_get_addresses(this_arg: number, pubkey: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ReadOnlyNetworkGraph_get_addresses(this_arg, encodeArray(pubkey));
		return nativeResponseValue;
	}
	// void RouteHop_free(struct LDKRouteHop this_obj);
	export function RouteHop_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_free(this_obj);
		// debug statements here
	}
	// struct LDKPublicKey RouteHop_get_pubkey(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	export function RouteHop_get_pubkey(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_get_pubkey(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void RouteHop_set_pubkey(struct LDKRouteHop *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function RouteHop_set_pubkey(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_set_pubkey(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKNodeFeatures RouteHop_get_node_features(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	export function RouteHop_get_node_features(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_get_node_features(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHop_set_node_features(struct LDKRouteHop *NONNULL_PTR this_ptr, struct LDKNodeFeatures val);
	export function RouteHop_set_node_features(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_set_node_features(this_ptr, val);
		// debug statements here
	}
	// uint64_t RouteHop_get_short_channel_id(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	export function RouteHop_get_short_channel_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_get_short_channel_id(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHop_set_short_channel_id(struct LDKRouteHop *NONNULL_PTR this_ptr, uint64_t val);
	export function RouteHop_set_short_channel_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_set_short_channel_id(this_ptr, val);
		// debug statements here
	}
	// struct LDKChannelFeatures RouteHop_get_channel_features(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	export function RouteHop_get_channel_features(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_get_channel_features(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHop_set_channel_features(struct LDKRouteHop *NONNULL_PTR this_ptr, struct LDKChannelFeatures val);
	export function RouteHop_set_channel_features(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_set_channel_features(this_ptr, val);
		// debug statements here
	}
	// uint64_t RouteHop_get_fee_msat(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	export function RouteHop_get_fee_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_get_fee_msat(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHop_set_fee_msat(struct LDKRouteHop *NONNULL_PTR this_ptr, uint64_t val);
	export function RouteHop_set_fee_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_set_fee_msat(this_ptr, val);
		// debug statements here
	}
	// uint32_t RouteHop_get_cltv_expiry_delta(const struct LDKRouteHop *NONNULL_PTR this_ptr);
	export function RouteHop_get_cltv_expiry_delta(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_get_cltv_expiry_delta(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHop_set_cltv_expiry_delta(struct LDKRouteHop *NONNULL_PTR this_ptr, uint32_t val);
	export function RouteHop_set_cltv_expiry_delta(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_set_cltv_expiry_delta(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKRouteHop RouteHop_new(struct LDKPublicKey pubkey_arg, struct LDKNodeFeatures node_features_arg, uint64_t short_channel_id_arg, struct LDKChannelFeatures channel_features_arg, uint64_t fee_msat_arg, uint32_t cltv_expiry_delta_arg);
	export function RouteHop_new(pubkey_arg: Uint8Array, node_features_arg: number, short_channel_id_arg: number, channel_features_arg: number, fee_msat_arg: number, cltv_expiry_delta_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_new(encodeArray(pubkey_arg), node_features_arg, short_channel_id_arg, channel_features_arg, fee_msat_arg, cltv_expiry_delta_arg);
		return nativeResponseValue;
	}
	// struct LDKRouteHop RouteHop_clone(const struct LDKRouteHop *NONNULL_PTR orig);
	export function RouteHop_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t RouteHop_hash(const struct LDKRouteHop *NONNULL_PTR o);
	export function RouteHop_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_hash(o);
		return nativeResponseValue;
	}
	// bool RouteHop_eq(const struct LDKRouteHop *NONNULL_PTR a, const struct LDKRouteHop *NONNULL_PTR b);
	export function RouteHop_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z RouteHop_write(const struct LDKRouteHop *NONNULL_PTR obj);
	export function RouteHop_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_RouteHopDecodeErrorZ RouteHop_read(struct LDKu8slice ser);
	export function RouteHop_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHop_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void Route_free(struct LDKRoute this_obj);
	export function Route_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_free(this_obj);
		// debug statements here
	}
	// struct LDKCVec_CVec_RouteHopZZ Route_get_paths(const struct LDKRoute *NONNULL_PTR this_ptr);
	export function Route_get_paths(this_ptr: number): number[][] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_get_paths(this_ptr);
		return nativeResponseValue;
	}
	// void Route_set_paths(struct LDKRoute *NONNULL_PTR this_ptr, struct LDKCVec_CVec_RouteHopZZ val);
	export function Route_set_paths(this_ptr: number, val: number[][]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_set_paths(this_ptr, val);
		// debug statements here
	}
	// struct LDKPayee Route_get_payee(const struct LDKRoute *NONNULL_PTR this_ptr);
	export function Route_get_payee(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_get_payee(this_ptr);
		return nativeResponseValue;
	}
	// void Route_set_payee(struct LDKRoute *NONNULL_PTR this_ptr, struct LDKPayee val);
	export function Route_set_payee(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_set_payee(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKRoute Route_new(struct LDKCVec_CVec_RouteHopZZ paths_arg, struct LDKPayee payee_arg);
	export function Route_new(paths_arg: number[][], payee_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_new(paths_arg, payee_arg);
		return nativeResponseValue;
	}
	// struct LDKRoute Route_clone(const struct LDKRoute *NONNULL_PTR orig);
	export function Route_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t Route_hash(const struct LDKRoute *NONNULL_PTR o);
	export function Route_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_hash(o);
		return nativeResponseValue;
	}
	// bool Route_eq(const struct LDKRoute *NONNULL_PTR a, const struct LDKRoute *NONNULL_PTR b);
	export function Route_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_eq(a, b);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t Route_get_total_fees(const struct LDKRoute *NONNULL_PTR this_arg);
	export function Route_get_total_fees(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_get_total_fees(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t Route_get_total_amount(const struct LDKRoute *NONNULL_PTR this_arg);
	export function Route_get_total_amount(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_get_total_amount(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z Route_write(const struct LDKRoute *NONNULL_PTR obj);
	export function Route_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_RouteDecodeErrorZ Route_read(struct LDKu8slice ser);
	export function Route_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Route_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void RouteParameters_free(struct LDKRouteParameters this_obj);
	export function RouteParameters_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_free(this_obj);
		// debug statements here
	}
	// struct LDKPayee RouteParameters_get_payee(const struct LDKRouteParameters *NONNULL_PTR this_ptr);
	export function RouteParameters_get_payee(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_get_payee(this_ptr);
		return nativeResponseValue;
	}
	// void RouteParameters_set_payee(struct LDKRouteParameters *NONNULL_PTR this_ptr, struct LDKPayee val);
	export function RouteParameters_set_payee(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_set_payee(this_ptr, val);
		// debug statements here
	}
	// uint64_t RouteParameters_get_final_value_msat(const struct LDKRouteParameters *NONNULL_PTR this_ptr);
	export function RouteParameters_get_final_value_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_get_final_value_msat(this_ptr);
		return nativeResponseValue;
	}
	// void RouteParameters_set_final_value_msat(struct LDKRouteParameters *NONNULL_PTR this_ptr, uint64_t val);
	export function RouteParameters_set_final_value_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_set_final_value_msat(this_ptr, val);
		// debug statements here
	}
	// uint32_t RouteParameters_get_final_cltv_expiry_delta(const struct LDKRouteParameters *NONNULL_PTR this_ptr);
	export function RouteParameters_get_final_cltv_expiry_delta(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_get_final_cltv_expiry_delta(this_ptr);
		return nativeResponseValue;
	}
	// void RouteParameters_set_final_cltv_expiry_delta(struct LDKRouteParameters *NONNULL_PTR this_ptr, uint32_t val);
	export function RouteParameters_set_final_cltv_expiry_delta(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_set_final_cltv_expiry_delta(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKRouteParameters RouteParameters_new(struct LDKPayee payee_arg, uint64_t final_value_msat_arg, uint32_t final_cltv_expiry_delta_arg);
	export function RouteParameters_new(payee_arg: number, final_value_msat_arg: number, final_cltv_expiry_delta_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_new(payee_arg, final_value_msat_arg, final_cltv_expiry_delta_arg);
		return nativeResponseValue;
	}
	// struct LDKRouteParameters RouteParameters_clone(const struct LDKRouteParameters *NONNULL_PTR orig);
	export function RouteParameters_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z RouteParameters_write(const struct LDKRouteParameters *NONNULL_PTR obj);
	export function RouteParameters_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_RouteParametersDecodeErrorZ RouteParameters_read(struct LDKu8slice ser);
	export function RouteParameters_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteParameters_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void Payee_free(struct LDKPayee this_obj);
	export function Payee_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_free(this_obj);
		// debug statements here
	}
	// struct LDKPublicKey Payee_get_pubkey(const struct LDKPayee *NONNULL_PTR this_ptr);
	export function Payee_get_pubkey(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_get_pubkey(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void Payee_set_pubkey(struct LDKPayee *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function Payee_set_pubkey(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_set_pubkey(this_ptr, encodeArray(val));
		// debug statements here
	}
	// struct LDKInvoiceFeatures Payee_get_features(const struct LDKPayee *NONNULL_PTR this_ptr);
	export function Payee_get_features(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_get_features(this_ptr);
		return nativeResponseValue;
	}
	// void Payee_set_features(struct LDKPayee *NONNULL_PTR this_ptr, struct LDKInvoiceFeatures val);
	export function Payee_set_features(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_set_features(this_ptr, val);
		// debug statements here
	}
	// struct LDKCVec_RouteHintZ Payee_get_route_hints(const struct LDKPayee *NONNULL_PTR this_ptr);
	export function Payee_get_route_hints(this_ptr: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_get_route_hints(this_ptr);
		return nativeResponseValue;
	}
	// void Payee_set_route_hints(struct LDKPayee *NONNULL_PTR this_ptr, struct LDKCVec_RouteHintZ val);
	export function Payee_set_route_hints(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_set_route_hints(this_ptr, val);
		// debug statements here
	}
	// struct LDKCOption_u64Z Payee_get_expiry_time(const struct LDKPayee *NONNULL_PTR this_ptr);
	export function Payee_get_expiry_time(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_get_expiry_time(this_ptr);
		return nativeResponseValue;
	}
	// void Payee_set_expiry_time(struct LDKPayee *NONNULL_PTR this_ptr, struct LDKCOption_u64Z val);
	export function Payee_set_expiry_time(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_set_expiry_time(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKPayee Payee_new(struct LDKPublicKey pubkey_arg, struct LDKInvoiceFeatures features_arg, struct LDKCVec_RouteHintZ route_hints_arg, struct LDKCOption_u64Z expiry_time_arg);
	export function Payee_new(pubkey_arg: Uint8Array, features_arg: number, route_hints_arg: number[], expiry_time_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_new(encodeArray(pubkey_arg), features_arg, route_hints_arg, expiry_time_arg);
		return nativeResponseValue;
	}
	// struct LDKPayee Payee_clone(const struct LDKPayee *NONNULL_PTR orig);
	export function Payee_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t Payee_hash(const struct LDKPayee *NONNULL_PTR o);
	export function Payee_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_hash(o);
		return nativeResponseValue;
	}
	// bool Payee_eq(const struct LDKPayee *NONNULL_PTR a, const struct LDKPayee *NONNULL_PTR b);
	export function Payee_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z Payee_write(const struct LDKPayee *NONNULL_PTR obj);
	export function Payee_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_PayeeDecodeErrorZ Payee_read(struct LDKu8slice ser);
	export function Payee_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKPayee Payee_from_node_id(struct LDKPublicKey pubkey);
	export function Payee_from_node_id(pubkey: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_from_node_id(encodeArray(pubkey));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKPayee Payee_for_keysend(struct LDKPublicKey pubkey);
	export function Payee_for_keysend(pubkey: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payee_for_keysend(encodeArray(pubkey));
		return nativeResponseValue;
	}
	// void RouteHint_free(struct LDKRouteHint this_obj);
	export function RouteHint_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHint_free(this_obj);
		// debug statements here
	}
	// struct LDKCVec_RouteHintHopZ RouteHint_get_a(const struct LDKRouteHint *NONNULL_PTR this_ptr);
	export function RouteHint_get_a(this_ptr: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHint_get_a(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHint_set_a(struct LDKRouteHint *NONNULL_PTR this_ptr, struct LDKCVec_RouteHintHopZ val);
	export function RouteHint_set_a(this_ptr: number, val: number[]): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHint_set_a(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKRouteHint RouteHint_new(struct LDKCVec_RouteHintHopZ a_arg);
	export function RouteHint_new(a_arg: number[]): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHint_new(a_arg);
		return nativeResponseValue;
	}
	// struct LDKRouteHint RouteHint_clone(const struct LDKRouteHint *NONNULL_PTR orig);
	export function RouteHint_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHint_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t RouteHint_hash(const struct LDKRouteHint *NONNULL_PTR o);
	export function RouteHint_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHint_hash(o);
		return nativeResponseValue;
	}
	// bool RouteHint_eq(const struct LDKRouteHint *NONNULL_PTR a, const struct LDKRouteHint *NONNULL_PTR b);
	export function RouteHint_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHint_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z RouteHint_write(const struct LDKRouteHint *NONNULL_PTR obj);
	export function RouteHint_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHint_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_RouteHintDecodeErrorZ RouteHint_read(struct LDKu8slice ser);
	export function RouteHint_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHint_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void RouteHintHop_free(struct LDKRouteHintHop this_obj);
	export function RouteHintHop_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_free(this_obj);
		// debug statements here
	}
	// struct LDKPublicKey RouteHintHop_get_src_node_id(const struct LDKRouteHintHop *NONNULL_PTR this_ptr);
	export function RouteHintHop_get_src_node_id(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_get_src_node_id(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void RouteHintHop_set_src_node_id(struct LDKRouteHintHop *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function RouteHintHop_set_src_node_id(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_set_src_node_id(this_ptr, encodeArray(val));
		// debug statements here
	}
	// uint64_t RouteHintHop_get_short_channel_id(const struct LDKRouteHintHop *NONNULL_PTR this_ptr);
	export function RouteHintHop_get_short_channel_id(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_get_short_channel_id(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHintHop_set_short_channel_id(struct LDKRouteHintHop *NONNULL_PTR this_ptr, uint64_t val);
	export function RouteHintHop_set_short_channel_id(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_set_short_channel_id(this_ptr, val);
		// debug statements here
	}
	// struct LDKRoutingFees RouteHintHop_get_fees(const struct LDKRouteHintHop *NONNULL_PTR this_ptr);
	export function RouteHintHop_get_fees(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_get_fees(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHintHop_set_fees(struct LDKRouteHintHop *NONNULL_PTR this_ptr, struct LDKRoutingFees val);
	export function RouteHintHop_set_fees(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_set_fees(this_ptr, val);
		// debug statements here
	}
	// uint16_t RouteHintHop_get_cltv_expiry_delta(const struct LDKRouteHintHop *NONNULL_PTR this_ptr);
	export function RouteHintHop_get_cltv_expiry_delta(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_get_cltv_expiry_delta(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHintHop_set_cltv_expiry_delta(struct LDKRouteHintHop *NONNULL_PTR this_ptr, uint16_t val);
	export function RouteHintHop_set_cltv_expiry_delta(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_set_cltv_expiry_delta(this_ptr, val);
		// debug statements here
	}
	// struct LDKCOption_u64Z RouteHintHop_get_htlc_minimum_msat(const struct LDKRouteHintHop *NONNULL_PTR this_ptr);
	export function RouteHintHop_get_htlc_minimum_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_get_htlc_minimum_msat(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHintHop_set_htlc_minimum_msat(struct LDKRouteHintHop *NONNULL_PTR this_ptr, struct LDKCOption_u64Z val);
	export function RouteHintHop_set_htlc_minimum_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_set_htlc_minimum_msat(this_ptr, val);
		// debug statements here
	}
	// struct LDKCOption_u64Z RouteHintHop_get_htlc_maximum_msat(const struct LDKRouteHintHop *NONNULL_PTR this_ptr);
	export function RouteHintHop_get_htlc_maximum_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_get_htlc_maximum_msat(this_ptr);
		return nativeResponseValue;
	}
	// void RouteHintHop_set_htlc_maximum_msat(struct LDKRouteHintHop *NONNULL_PTR this_ptr, struct LDKCOption_u64Z val);
	export function RouteHintHop_set_htlc_maximum_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_set_htlc_maximum_msat(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKRouteHintHop RouteHintHop_new(struct LDKPublicKey src_node_id_arg, uint64_t short_channel_id_arg, struct LDKRoutingFees fees_arg, uint16_t cltv_expiry_delta_arg, struct LDKCOption_u64Z htlc_minimum_msat_arg, struct LDKCOption_u64Z htlc_maximum_msat_arg);
	export function RouteHintHop_new(src_node_id_arg: Uint8Array, short_channel_id_arg: number, fees_arg: number, cltv_expiry_delta_arg: number, htlc_minimum_msat_arg: number, htlc_maximum_msat_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_new(encodeArray(src_node_id_arg), short_channel_id_arg, fees_arg, cltv_expiry_delta_arg, htlc_minimum_msat_arg, htlc_maximum_msat_arg);
		return nativeResponseValue;
	}
	// struct LDKRouteHintHop RouteHintHop_clone(const struct LDKRouteHintHop *NONNULL_PTR orig);
	export function RouteHintHop_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t RouteHintHop_hash(const struct LDKRouteHintHop *NONNULL_PTR o);
	export function RouteHintHop_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_hash(o);
		return nativeResponseValue;
	}
	// bool RouteHintHop_eq(const struct LDKRouteHintHop *NONNULL_PTR a, const struct LDKRouteHintHop *NONNULL_PTR b);
	export function RouteHintHop_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z RouteHintHop_write(const struct LDKRouteHintHop *NONNULL_PTR obj);
	export function RouteHintHop_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_RouteHintHopDecodeErrorZ RouteHintHop_read(struct LDKu8slice ser);
	export function RouteHintHop_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RouteHintHop_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// struct LDKCResult_RouteLightningErrorZ find_route(struct LDKPublicKey our_node_pubkey, const struct LDKRouteParameters *NONNULL_PTR params, const struct LDKNetworkGraph *NONNULL_PTR network, struct LDKCVec_ChannelDetailsZ *first_hops, struct LDKLogger logger, const struct LDKScore *NONNULL_PTR scorer);
	export function find_route(our_node_pubkey: Uint8Array, params: number, network: number, first_hops: number[], logger: number, scorer: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.find_route(encodeArray(our_node_pubkey), params, network, first_hops, logger, scorer);
		return nativeResponseValue;
	}
	// void Scorer_free(struct LDKScorer this_obj);
	export function Scorer_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Scorer_free(this_obj);
		// debug statements here
	}
	// void ScoringParameters_free(struct LDKScoringParameters this_obj);
	export function ScoringParameters_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_free(this_obj);
		// debug statements here
	}
	// uint64_t ScoringParameters_get_base_penalty_msat(const struct LDKScoringParameters *NONNULL_PTR this_ptr);
	export function ScoringParameters_get_base_penalty_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_get_base_penalty_msat(this_ptr);
		return nativeResponseValue;
	}
	// void ScoringParameters_set_base_penalty_msat(struct LDKScoringParameters *NONNULL_PTR this_ptr, uint64_t val);
	export function ScoringParameters_set_base_penalty_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_set_base_penalty_msat(this_ptr, val);
		// debug statements here
	}
	// uint64_t ScoringParameters_get_failure_penalty_msat(const struct LDKScoringParameters *NONNULL_PTR this_ptr);
	export function ScoringParameters_get_failure_penalty_msat(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_get_failure_penalty_msat(this_ptr);
		return nativeResponseValue;
	}
	// void ScoringParameters_set_failure_penalty_msat(struct LDKScoringParameters *NONNULL_PTR this_ptr, uint64_t val);
	export function ScoringParameters_set_failure_penalty_msat(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_set_failure_penalty_msat(this_ptr, val);
		// debug statements here
	}
	// uint64_t ScoringParameters_get_failure_penalty_half_life(const struct LDKScoringParameters *NONNULL_PTR this_ptr);
	export function ScoringParameters_get_failure_penalty_half_life(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_get_failure_penalty_half_life(this_ptr);
		return nativeResponseValue;
	}
	// void ScoringParameters_set_failure_penalty_half_life(struct LDKScoringParameters *NONNULL_PTR this_ptr, uint64_t val);
	export function ScoringParameters_set_failure_penalty_half_life(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_set_failure_penalty_half_life(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKScoringParameters ScoringParameters_new(uint64_t base_penalty_msat_arg, uint64_t failure_penalty_msat_arg, uint64_t failure_penalty_half_life_arg);
	export function ScoringParameters_new(base_penalty_msat_arg: number, failure_penalty_msat_arg: number, failure_penalty_half_life_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_new(base_penalty_msat_arg, failure_penalty_msat_arg, failure_penalty_half_life_arg);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z ScoringParameters_write(const struct LDKScoringParameters *NONNULL_PTR obj);
	export function ScoringParameters_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ScoringParametersDecodeErrorZ ScoringParameters_read(struct LDKu8slice ser);
	export function ScoringParameters_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKScorer Scorer_new(struct LDKScoringParameters params);
	export function Scorer_new(params: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Scorer_new(params);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKScorer Scorer_default(void);
	export function Scorer_default(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Scorer_default();
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKScoringParameters ScoringParameters_default(void);
	export function ScoringParameters_default(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ScoringParameters_default();
		return nativeResponseValue;
	}
	// struct LDKScore Scorer_as_Score(const struct LDKScorer *NONNULL_PTR this_arg);
	export function Scorer_as_Score(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Scorer_as_Score(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCVec_u8Z Scorer_write(const struct LDKScorer *NONNULL_PTR obj);
	export function Scorer_write(obj: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Scorer_write(obj);
		return decodeArray(nativeResponseValue);
	}
	// struct LDKCResult_ScorerDecodeErrorZ Scorer_read(struct LDKu8slice ser);
	export function Scorer_read(ser: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Scorer_read(encodeArray(ser));
		return nativeResponseValue;
	}
	// void FilesystemPersister_free(struct LDKFilesystemPersister this_obj);
	export function FilesystemPersister_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FilesystemPersister_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKFilesystemPersister FilesystemPersister_new(struct LDKStr path_to_channel_data);
	export function FilesystemPersister_new(path_to_channel_data: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FilesystemPersister_new(path_to_channel_data);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKStr FilesystemPersister_get_data_dir(const struct LDKFilesystemPersister *NONNULL_PTR this_arg);
	export function FilesystemPersister_get_data_dir(this_arg: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FilesystemPersister_get_data_dir(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneErrorZ FilesystemPersister_persist_manager(struct LDKStr data_dir, const struct LDKChannelManager *NONNULL_PTR manager);
	export function FilesystemPersister_persist_manager(data_dir: String, manager: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FilesystemPersister_persist_manager(data_dir, manager);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ FilesystemPersister_read_channelmonitors(const struct LDKFilesystemPersister *NONNULL_PTR this_arg, struct LDKKeysInterface keys_manager);
	export function FilesystemPersister_read_channelmonitors(this_arg: number, keys_manager: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FilesystemPersister_read_channelmonitors(this_arg, keys_manager);
		return nativeResponseValue;
	}
	// struct LDKPersist FilesystemPersister_as_Persist(const struct LDKFilesystemPersister *NONNULL_PTR this_arg);
	export function FilesystemPersister_as_Persist(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.FilesystemPersister_as_Persist(this_arg);
		return nativeResponseValue;
	}
	// void BackgroundProcessor_free(struct LDKBackgroundProcessor this_obj);
	export function BackgroundProcessor_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BackgroundProcessor_free(this_obj);
		// debug statements here
	}
	// void ChannelManagerPersister_free(struct LDKChannelManagerPersister this_ptr);
	export function ChannelManagerPersister_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManagerPersister_free(this_ptr);
		// debug statements here
	}
	// MUST_USE_RES struct LDKBackgroundProcessor BackgroundProcessor_start(struct LDKChannelManagerPersister persister, struct LDKEventHandler event_handler, const struct LDKChainMonitor *NONNULL_PTR chain_monitor, const struct LDKChannelManager *NONNULL_PTR channel_manager, struct LDKNetGraphMsgHandler net_graph_msg_handler, const struct LDKPeerManager *NONNULL_PTR peer_manager, struct LDKLogger logger);
	export function BackgroundProcessor_start(persister: number, event_handler: number, chain_monitor: number, channel_manager: number, net_graph_msg_handler: number, peer_manager: number, logger: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BackgroundProcessor_start(persister, event_handler, chain_monitor, channel_manager, net_graph_msg_handler, peer_manager, logger);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneErrorZ BackgroundProcessor_join(struct LDKBackgroundProcessor this_arg);
	export function BackgroundProcessor_join(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BackgroundProcessor_join(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneErrorZ BackgroundProcessor_stop(struct LDKBackgroundProcessor this_arg);
	export function BackgroundProcessor_stop(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.BackgroundProcessor_stop(this_arg);
		return nativeResponseValue;
	}
	// void check_platform(void);
	export function check_platform(): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.check_platform();
		// debug statements here
	}
	// void Invoice_free(struct LDKInvoice this_obj);
	export function Invoice_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_free(this_obj);
		// debug statements here
	}
	// bool Invoice_eq(const struct LDKInvoice *NONNULL_PTR a, const struct LDKInvoice *NONNULL_PTR b);
	export function Invoice_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKInvoice Invoice_clone(const struct LDKInvoice *NONNULL_PTR orig);
	export function Invoice_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_clone(orig);
		return nativeResponseValue;
	}
	// void SignedRawInvoice_free(struct LDKSignedRawInvoice this_obj);
	export function SignedRawInvoice_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_free(this_obj);
		// debug statements here
	}
	// bool SignedRawInvoice_eq(const struct LDKSignedRawInvoice *NONNULL_PTR a, const struct LDKSignedRawInvoice *NONNULL_PTR b);
	export function SignedRawInvoice_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKSignedRawInvoice SignedRawInvoice_clone(const struct LDKSignedRawInvoice *NONNULL_PTR orig);
	export function SignedRawInvoice_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_clone(orig);
		return nativeResponseValue;
	}
	// void RawInvoice_free(struct LDKRawInvoice this_obj);
	export function RawInvoice_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_free(this_obj);
		// debug statements here
	}
	// struct LDKRawDataPart RawInvoice_get_data(const struct LDKRawInvoice *NONNULL_PTR this_ptr);
	export function RawInvoice_get_data(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_get_data(this_ptr);
		return nativeResponseValue;
	}
	// void RawInvoice_set_data(struct LDKRawInvoice *NONNULL_PTR this_ptr, struct LDKRawDataPart val);
	export function RawInvoice_set_data(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_set_data(this_ptr, val);
		// debug statements here
	}
	// bool RawInvoice_eq(const struct LDKRawInvoice *NONNULL_PTR a, const struct LDKRawInvoice *NONNULL_PTR b);
	export function RawInvoice_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKRawInvoice RawInvoice_clone(const struct LDKRawInvoice *NONNULL_PTR orig);
	export function RawInvoice_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_clone(orig);
		return nativeResponseValue;
	}
	// void RawDataPart_free(struct LDKRawDataPart this_obj);
	export function RawDataPart_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawDataPart_free(this_obj);
		// debug statements here
	}
	// struct LDKPositiveTimestamp RawDataPart_get_timestamp(const struct LDKRawDataPart *NONNULL_PTR this_ptr);
	export function RawDataPart_get_timestamp(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawDataPart_get_timestamp(this_ptr);
		return nativeResponseValue;
	}
	// void RawDataPart_set_timestamp(struct LDKRawDataPart *NONNULL_PTR this_ptr, struct LDKPositiveTimestamp val);
	export function RawDataPart_set_timestamp(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawDataPart_set_timestamp(this_ptr, val);
		// debug statements here
	}
	// bool RawDataPart_eq(const struct LDKRawDataPart *NONNULL_PTR a, const struct LDKRawDataPart *NONNULL_PTR b);
	export function RawDataPart_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawDataPart_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKRawDataPart RawDataPart_clone(const struct LDKRawDataPart *NONNULL_PTR orig);
	export function RawDataPart_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawDataPart_clone(orig);
		return nativeResponseValue;
	}
	// void PositiveTimestamp_free(struct LDKPositiveTimestamp this_obj);
	export function PositiveTimestamp_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PositiveTimestamp_free(this_obj);
		// debug statements here
	}
	// bool PositiveTimestamp_eq(const struct LDKPositiveTimestamp *NONNULL_PTR a, const struct LDKPositiveTimestamp *NONNULL_PTR b);
	export function PositiveTimestamp_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PositiveTimestamp_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKPositiveTimestamp PositiveTimestamp_clone(const struct LDKPositiveTimestamp *NONNULL_PTR orig);
	export function PositiveTimestamp_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PositiveTimestamp_clone(orig);
		return nativeResponseValue;
	}
	// enum LDKSiPrefix SiPrefix_clone(const enum LDKSiPrefix *NONNULL_PTR orig);
	export function SiPrefix_clone(orig: number): SiPrefix {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SiPrefix_clone(orig);
		return nativeResponseValue;
	}
	// enum LDKSiPrefix SiPrefix_milli(void);
	export function SiPrefix_milli(): SiPrefix {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SiPrefix_milli();
		return nativeResponseValue;
	}
	// enum LDKSiPrefix SiPrefix_micro(void);
	export function SiPrefix_micro(): SiPrefix {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SiPrefix_micro();
		return nativeResponseValue;
	}
	// enum LDKSiPrefix SiPrefix_nano(void);
	export function SiPrefix_nano(): SiPrefix {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SiPrefix_nano();
		return nativeResponseValue;
	}
	// enum LDKSiPrefix SiPrefix_pico(void);
	export function SiPrefix_pico(): SiPrefix {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SiPrefix_pico();
		return nativeResponseValue;
	}
	// bool SiPrefix_eq(const enum LDKSiPrefix *NONNULL_PTR a, const enum LDKSiPrefix *NONNULL_PTR b);
	export function SiPrefix_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SiPrefix_eq(a, b);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t SiPrefix_multiplier(const enum LDKSiPrefix *NONNULL_PTR this_arg);
	export function SiPrefix_multiplier(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SiPrefix_multiplier(this_arg);
		return nativeResponseValue;
	}
	// enum LDKCurrency Currency_clone(const enum LDKCurrency *NONNULL_PTR orig);
	export function Currency_clone(orig: number): Currency {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Currency_clone(orig);
		return nativeResponseValue;
	}
	// enum LDKCurrency Currency_bitcoin(void);
	export function Currency_bitcoin(): Currency {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Currency_bitcoin();
		return nativeResponseValue;
	}
	// enum LDKCurrency Currency_bitcoin_testnet(void);
	export function Currency_bitcoin_testnet(): Currency {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Currency_bitcoin_testnet();
		return nativeResponseValue;
	}
	// enum LDKCurrency Currency_regtest(void);
	export function Currency_regtest(): Currency {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Currency_regtest();
		return nativeResponseValue;
	}
	// enum LDKCurrency Currency_simnet(void);
	export function Currency_simnet(): Currency {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Currency_simnet();
		return nativeResponseValue;
	}
	// enum LDKCurrency Currency_signet(void);
	export function Currency_signet(): Currency {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Currency_signet();
		return nativeResponseValue;
	}
	// uint64_t Currency_hash(const enum LDKCurrency *NONNULL_PTR o);
	export function Currency_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Currency_hash(o);
		return nativeResponseValue;
	}
	// bool Currency_eq(const enum LDKCurrency *NONNULL_PTR a, const enum LDKCurrency *NONNULL_PTR b);
	export function Currency_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Currency_eq(a, b);
		return nativeResponseValue;
	}
	// void Sha256_free(struct LDKSha256 this_obj);
	export function Sha256_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Sha256_free(this_obj);
		// debug statements here
	}
	// struct LDKSha256 Sha256_clone(const struct LDKSha256 *NONNULL_PTR orig);
	export function Sha256_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Sha256_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t Sha256_hash(const struct LDKSha256 *NONNULL_PTR o);
	export function Sha256_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Sha256_hash(o);
		return nativeResponseValue;
	}
	// bool Sha256_eq(const struct LDKSha256 *NONNULL_PTR a, const struct LDKSha256 *NONNULL_PTR b);
	export function Sha256_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Sha256_eq(a, b);
		return nativeResponseValue;
	}
	// void Description_free(struct LDKDescription this_obj);
	export function Description_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Description_free(this_obj);
		// debug statements here
	}
	// struct LDKDescription Description_clone(const struct LDKDescription *NONNULL_PTR orig);
	export function Description_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Description_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t Description_hash(const struct LDKDescription *NONNULL_PTR o);
	export function Description_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Description_hash(o);
		return nativeResponseValue;
	}
	// bool Description_eq(const struct LDKDescription *NONNULL_PTR a, const struct LDKDescription *NONNULL_PTR b);
	export function Description_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Description_eq(a, b);
		return nativeResponseValue;
	}
	// void PayeePubKey_free(struct LDKPayeePubKey this_obj);
	export function PayeePubKey_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PayeePubKey_free(this_obj);
		// debug statements here
	}
	// struct LDKPublicKey PayeePubKey_get_a(const struct LDKPayeePubKey *NONNULL_PTR this_ptr);
	export function PayeePubKey_get_a(this_ptr: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PayeePubKey_get_a(this_ptr);
		return decodeArray(nativeResponseValue);
	}
	// void PayeePubKey_set_a(struct LDKPayeePubKey *NONNULL_PTR this_ptr, struct LDKPublicKey val);
	export function PayeePubKey_set_a(this_ptr: number, val: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PayeePubKey_set_a(this_ptr, encodeArray(val));
		// debug statements here
	}
	// MUST_USE_RES struct LDKPayeePubKey PayeePubKey_new(struct LDKPublicKey a_arg);
	export function PayeePubKey_new(a_arg: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PayeePubKey_new(encodeArray(a_arg));
		return nativeResponseValue;
	}
	// struct LDKPayeePubKey PayeePubKey_clone(const struct LDKPayeePubKey *NONNULL_PTR orig);
	export function PayeePubKey_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PayeePubKey_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t PayeePubKey_hash(const struct LDKPayeePubKey *NONNULL_PTR o);
	export function PayeePubKey_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PayeePubKey_hash(o);
		return nativeResponseValue;
	}
	// bool PayeePubKey_eq(const struct LDKPayeePubKey *NONNULL_PTR a, const struct LDKPayeePubKey *NONNULL_PTR b);
	export function PayeePubKey_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PayeePubKey_eq(a, b);
		return nativeResponseValue;
	}
	// void ExpiryTime_free(struct LDKExpiryTime this_obj);
	export function ExpiryTime_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ExpiryTime_free(this_obj);
		// debug statements here
	}
	// struct LDKExpiryTime ExpiryTime_clone(const struct LDKExpiryTime *NONNULL_PTR orig);
	export function ExpiryTime_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ExpiryTime_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t ExpiryTime_hash(const struct LDKExpiryTime *NONNULL_PTR o);
	export function ExpiryTime_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ExpiryTime_hash(o);
		return nativeResponseValue;
	}
	// bool ExpiryTime_eq(const struct LDKExpiryTime *NONNULL_PTR a, const struct LDKExpiryTime *NONNULL_PTR b);
	export function ExpiryTime_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ExpiryTime_eq(a, b);
		return nativeResponseValue;
	}
	// void MinFinalCltvExpiry_free(struct LDKMinFinalCltvExpiry this_obj);
	export function MinFinalCltvExpiry_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MinFinalCltvExpiry_free(this_obj);
		// debug statements here
	}
	// uint64_t MinFinalCltvExpiry_get_a(const struct LDKMinFinalCltvExpiry *NONNULL_PTR this_ptr);
	export function MinFinalCltvExpiry_get_a(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MinFinalCltvExpiry_get_a(this_ptr);
		return nativeResponseValue;
	}
	// void MinFinalCltvExpiry_set_a(struct LDKMinFinalCltvExpiry *NONNULL_PTR this_ptr, uint64_t val);
	export function MinFinalCltvExpiry_set_a(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MinFinalCltvExpiry_set_a(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKMinFinalCltvExpiry MinFinalCltvExpiry_new(uint64_t a_arg);
	export function MinFinalCltvExpiry_new(a_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MinFinalCltvExpiry_new(a_arg);
		return nativeResponseValue;
	}
	// struct LDKMinFinalCltvExpiry MinFinalCltvExpiry_clone(const struct LDKMinFinalCltvExpiry *NONNULL_PTR orig);
	export function MinFinalCltvExpiry_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MinFinalCltvExpiry_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t MinFinalCltvExpiry_hash(const struct LDKMinFinalCltvExpiry *NONNULL_PTR o);
	export function MinFinalCltvExpiry_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MinFinalCltvExpiry_hash(o);
		return nativeResponseValue;
	}
	// bool MinFinalCltvExpiry_eq(const struct LDKMinFinalCltvExpiry *NONNULL_PTR a, const struct LDKMinFinalCltvExpiry *NONNULL_PTR b);
	export function MinFinalCltvExpiry_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.MinFinalCltvExpiry_eq(a, b);
		return nativeResponseValue;
	}
	// void Fallback_free(struct LDKFallback this_ptr);
	export function Fallback_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Fallback_free(this_ptr);
		// debug statements here
	}
	// struct LDKFallback Fallback_clone(const struct LDKFallback *NONNULL_PTR orig);
	export function Fallback_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Fallback_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKFallback Fallback_seg_wit_program(struct LDKu5 version, struct LDKCVec_u8Z program);
	export function Fallback_seg_wit_program(version: number, program: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Fallback_seg_wit_program(version, encodeArray(program));
		return nativeResponseValue;
	}
	// struct LDKFallback Fallback_pub_key_hash(struct LDKTwentyBytes a);
	export function Fallback_pub_key_hash(a: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Fallback_pub_key_hash(encodeArray(a));
		return nativeResponseValue;
	}
	// struct LDKFallback Fallback_script_hash(struct LDKTwentyBytes a);
	export function Fallback_script_hash(a: Uint8Array): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Fallback_script_hash(encodeArray(a));
		return nativeResponseValue;
	}
	// uint64_t Fallback_hash(const struct LDKFallback *NONNULL_PTR o);
	export function Fallback_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Fallback_hash(o);
		return nativeResponseValue;
	}
	// bool Fallback_eq(const struct LDKFallback *NONNULL_PTR a, const struct LDKFallback *NONNULL_PTR b);
	export function Fallback_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Fallback_eq(a, b);
		return nativeResponseValue;
	}
	// void InvoiceSignature_free(struct LDKInvoiceSignature this_obj);
	export function InvoiceSignature_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceSignature_free(this_obj);
		// debug statements here
	}
	// struct LDKInvoiceSignature InvoiceSignature_clone(const struct LDKInvoiceSignature *NONNULL_PTR orig);
	export function InvoiceSignature_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceSignature_clone(orig);
		return nativeResponseValue;
	}
	// bool InvoiceSignature_eq(const struct LDKInvoiceSignature *NONNULL_PTR a, const struct LDKInvoiceSignature *NONNULL_PTR b);
	export function InvoiceSignature_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoiceSignature_eq(a, b);
		return nativeResponseValue;
	}
	// void PrivateRoute_free(struct LDKPrivateRoute this_obj);
	export function PrivateRoute_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PrivateRoute_free(this_obj);
		// debug statements here
	}
	// struct LDKPrivateRoute PrivateRoute_clone(const struct LDKPrivateRoute *NONNULL_PTR orig);
	export function PrivateRoute_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PrivateRoute_clone(orig);
		return nativeResponseValue;
	}
	// uint64_t PrivateRoute_hash(const struct LDKPrivateRoute *NONNULL_PTR o);
	export function PrivateRoute_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PrivateRoute_hash(o);
		return nativeResponseValue;
	}
	// bool PrivateRoute_eq(const struct LDKPrivateRoute *NONNULL_PTR a, const struct LDKPrivateRoute *NONNULL_PTR b);
	export function PrivateRoute_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PrivateRoute_eq(a, b);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ SignedRawInvoice_into_parts(struct LDKSignedRawInvoice this_arg);
	export function SignedRawInvoice_into_parts(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_into_parts(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKRawInvoice SignedRawInvoice_raw_invoice(const struct LDKSignedRawInvoice *NONNULL_PTR this_arg);
	export function SignedRawInvoice_raw_invoice(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_raw_invoice(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES const uint8_t (*SignedRawInvoice_hash(const struct LDKSignedRawInvoice *NONNULL_PTR this_arg))[32];
	export function SignedRawInvoice_hash(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_hash(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKInvoiceSignature SignedRawInvoice_signature(const struct LDKSignedRawInvoice *NONNULL_PTR this_arg);
	export function SignedRawInvoice_signature(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_signature(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_PayeePubKeyErrorZ SignedRawInvoice_recover_payee_pub_key(const struct LDKSignedRawInvoice *NONNULL_PTR this_arg);
	export function SignedRawInvoice_recover_payee_pub_key(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_recover_payee_pub_key(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES bool SignedRawInvoice_check_signature(const struct LDKSignedRawInvoice *NONNULL_PTR this_arg);
	export function SignedRawInvoice_check_signature(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_check_signature(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKThirtyTwoBytes RawInvoice_hash(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_hash(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_hash(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKSha256 RawInvoice_payment_hash(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_payment_hash(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_payment_hash(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKDescription RawInvoice_description(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_description(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_description(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKPayeePubKey RawInvoice_payee_pub_key(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_payee_pub_key(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_payee_pub_key(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKSha256 RawInvoice_description_hash(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_description_hash(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_description_hash(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKExpiryTime RawInvoice_expiry_time(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_expiry_time(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_expiry_time(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKMinFinalCltvExpiry RawInvoice_min_final_cltv_expiry(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_min_final_cltv_expiry(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_min_final_cltv_expiry(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKThirtyTwoBytes RawInvoice_payment_secret(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_payment_secret(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_payment_secret(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKInvoiceFeatures RawInvoice_features(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_features(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_features(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_PrivateRouteZ RawInvoice_private_routes(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_private_routes(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_private_routes(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCOption_u64Z RawInvoice_amount_pico_btc(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_amount_pico_btc(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_amount_pico_btc(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES enum LDKCurrency RawInvoice_currency(const struct LDKRawInvoice *NONNULL_PTR this_arg);
	export function RawInvoice_currency(this_arg: number): Currency {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RawInvoice_currency(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_PositiveTimestampCreationErrorZ PositiveTimestamp_from_unix_timestamp(uint64_t unix_seconds);
	export function PositiveTimestamp_from_unix_timestamp(unix_seconds: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PositiveTimestamp_from_unix_timestamp(unix_seconds);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_PositiveTimestampCreationErrorZ PositiveTimestamp_from_system_time(uint64_t time);
	export function PositiveTimestamp_from_system_time(time: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PositiveTimestamp_from_system_time(time);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t PositiveTimestamp_as_unix_timestamp(const struct LDKPositiveTimestamp *NONNULL_PTR this_arg);
	export function PositiveTimestamp_as_unix_timestamp(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PositiveTimestamp_as_unix_timestamp(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t PositiveTimestamp_as_time(const struct LDKPositiveTimestamp *NONNULL_PTR this_arg);
	export function PositiveTimestamp_as_time(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PositiveTimestamp_as_time(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKSignedRawInvoice Invoice_into_signed_raw(struct LDKInvoice this_arg);
	export function Invoice_into_signed_raw(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_into_signed_raw(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_NoneSemanticErrorZ Invoice_check_signature(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_check_signature(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_check_signature(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_InvoiceSemanticErrorZ Invoice_from_signed(struct LDKSignedRawInvoice signed_invoice);
	export function Invoice_from_signed(signed_invoice: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_from_signed(signed_invoice);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t Invoice_timestamp(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_timestamp(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_timestamp(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES const uint8_t (*Invoice_payment_hash(const struct LDKInvoice *NONNULL_PTR this_arg))[32];
	export function Invoice_payment_hash(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_payment_hash(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKPublicKey Invoice_payee_pub_key(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_payee_pub_key(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_payee_pub_key(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES const uint8_t (*Invoice_payment_secret(const struct LDKInvoice *NONNULL_PTR this_arg))[32];
	export function Invoice_payment_secret(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_payment_secret(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES struct LDKInvoiceFeatures Invoice_features(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_features(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_features(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKPublicKey Invoice_recover_payee_pub_key(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_recover_payee_pub_key(this_arg: number): Uint8Array {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_recover_payee_pub_key(this_arg);
		return decodeArray(nativeResponseValue);
	}
	// MUST_USE_RES uint64_t Invoice_expiry_time(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_expiry_time(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_expiry_time(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES bool Invoice_is_expired(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_is_expired(this_arg: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_is_expired(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t Invoice_min_final_cltv_expiry(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_min_final_cltv_expiry(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_min_final_cltv_expiry(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_PrivateRouteZ Invoice_private_routes(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_private_routes(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_private_routes(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCVec_RouteHintZ Invoice_route_hints(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_route_hints(this_arg: number): number[] {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_route_hints(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES enum LDKCurrency Invoice_currency(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_currency(this_arg: number): Currency {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_currency(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCOption_u64Z Invoice_amount_milli_satoshis(const struct LDKInvoice *NONNULL_PTR this_arg);
	export function Invoice_amount_milli_satoshis(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_amount_milli_satoshis(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_DescriptionCreationErrorZ Description_new(struct LDKStr description);
	export function Description_new(description: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Description_new(description);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKStr Description_into_inner(struct LDKDescription this_arg);
	export function Description_into_inner(this_arg: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Description_into_inner(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_ExpiryTimeCreationErrorZ ExpiryTime_from_seconds(uint64_t seconds);
	export function ExpiryTime_from_seconds(seconds: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ExpiryTime_from_seconds(seconds);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_ExpiryTimeCreationErrorZ ExpiryTime_from_duration(uint64_t duration);
	export function ExpiryTime_from_duration(duration: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ExpiryTime_from_duration(duration);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t ExpiryTime_as_seconds(const struct LDKExpiryTime *NONNULL_PTR this_arg);
	export function ExpiryTime_as_seconds(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ExpiryTime_as_seconds(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES uint64_t ExpiryTime_as_duration(const struct LDKExpiryTime *NONNULL_PTR this_arg);
	export function ExpiryTime_as_duration(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ExpiryTime_as_duration(this_arg);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_PrivateRouteCreationErrorZ PrivateRoute_new(struct LDKRouteHint hops);
	export function PrivateRoute_new(hops: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PrivateRoute_new(hops);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKRouteHint PrivateRoute_into_inner(struct LDKPrivateRoute this_arg);
	export function PrivateRoute_into_inner(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PrivateRoute_into_inner(this_arg);
		return nativeResponseValue;
	}
	// enum LDKCreationError CreationError_clone(const enum LDKCreationError *NONNULL_PTR orig);
	export function CreationError_clone(orig: number): CreationError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CreationError_clone(orig);
		return nativeResponseValue;
	}
	// enum LDKCreationError CreationError_description_too_long(void);
	export function CreationError_description_too_long(): CreationError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CreationError_description_too_long();
		return nativeResponseValue;
	}
	// enum LDKCreationError CreationError_route_too_long(void);
	export function CreationError_route_too_long(): CreationError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CreationError_route_too_long();
		return nativeResponseValue;
	}
	// enum LDKCreationError CreationError_timestamp_out_of_bounds(void);
	export function CreationError_timestamp_out_of_bounds(): CreationError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CreationError_timestamp_out_of_bounds();
		return nativeResponseValue;
	}
	// enum LDKCreationError CreationError_expiry_time_out_of_bounds(void);
	export function CreationError_expiry_time_out_of_bounds(): CreationError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CreationError_expiry_time_out_of_bounds();
		return nativeResponseValue;
	}
	// bool CreationError_eq(const enum LDKCreationError *NONNULL_PTR a, const enum LDKCreationError *NONNULL_PTR b);
	export function CreationError_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CreationError_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKStr CreationError_to_str(const enum LDKCreationError *NONNULL_PTR o);
	export function CreationError_to_str(o: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.CreationError_to_str(o);
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_clone(const enum LDKSemanticError *NONNULL_PTR orig);
	export function SemanticError_clone(orig: number): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_clone(orig);
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_no_payment_hash(void);
	export function SemanticError_no_payment_hash(): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_no_payment_hash();
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_multiple_payment_hashes(void);
	export function SemanticError_multiple_payment_hashes(): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_multiple_payment_hashes();
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_no_description(void);
	export function SemanticError_no_description(): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_no_description();
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_multiple_descriptions(void);
	export function SemanticError_multiple_descriptions(): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_multiple_descriptions();
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_no_payment_secret(void);
	export function SemanticError_no_payment_secret(): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_no_payment_secret();
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_multiple_payment_secrets(void);
	export function SemanticError_multiple_payment_secrets(): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_multiple_payment_secrets();
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_invalid_features(void);
	export function SemanticError_invalid_features(): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_invalid_features();
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_invalid_recovery_id(void);
	export function SemanticError_invalid_recovery_id(): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_invalid_recovery_id();
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_invalid_signature(void);
	export function SemanticError_invalid_signature(): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_invalid_signature();
		return nativeResponseValue;
	}
	// enum LDKSemanticError SemanticError_imprecise_amount(void);
	export function SemanticError_imprecise_amount(): SemanticError {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_imprecise_amount();
		return nativeResponseValue;
	}
	// bool SemanticError_eq(const enum LDKSemanticError *NONNULL_PTR a, const enum LDKSemanticError *NONNULL_PTR b);
	export function SemanticError_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKStr SemanticError_to_str(const enum LDKSemanticError *NONNULL_PTR o);
	export function SemanticError_to_str(o: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SemanticError_to_str(o);
		return nativeResponseValue;
	}
	// void SignOrCreationError_free(struct LDKSignOrCreationError this_ptr);
	export function SignOrCreationError_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignOrCreationError_free(this_ptr);
		// debug statements here
	}
	// struct LDKSignOrCreationError SignOrCreationError_clone(const struct LDKSignOrCreationError *NONNULL_PTR orig);
	export function SignOrCreationError_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignOrCreationError_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKSignOrCreationError SignOrCreationError_sign_error(void);
	export function SignOrCreationError_sign_error(): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignOrCreationError_sign_error();
		return nativeResponseValue;
	}
	// struct LDKSignOrCreationError SignOrCreationError_creation_error(enum LDKCreationError a);
	export function SignOrCreationError_creation_error(a: CreationError): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignOrCreationError_creation_error(a);
		return nativeResponseValue;
	}
	// bool SignOrCreationError_eq(const struct LDKSignOrCreationError *NONNULL_PTR a, const struct LDKSignOrCreationError *NONNULL_PTR b);
	export function SignOrCreationError_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignOrCreationError_eq(a, b);
		return nativeResponseValue;
	}
	// struct LDKStr SignOrCreationError_to_str(const struct LDKSignOrCreationError *NONNULL_PTR o);
	export function SignOrCreationError_to_str(o: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignOrCreationError_to_str(o);
		return nativeResponseValue;
	}
	// void InvoicePayer_free(struct LDKInvoicePayer this_obj);
	export function InvoicePayer_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoicePayer_free(this_obj);
		// debug statements here
	}
	// void Payer_free(struct LDKPayer this_ptr);
	export function Payer_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Payer_free(this_ptr);
		// debug statements here
	}
	// void Router_free(struct LDKRouter this_ptr);
	export function Router_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Router_free(this_ptr);
		// debug statements here
	}
	// void RetryAttempts_free(struct LDKRetryAttempts this_obj);
	export function RetryAttempts_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RetryAttempts_free(this_obj);
		// debug statements here
	}
	// uintptr_t RetryAttempts_get_a(const struct LDKRetryAttempts *NONNULL_PTR this_ptr);
	export function RetryAttempts_get_a(this_ptr: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RetryAttempts_get_a(this_ptr);
		return nativeResponseValue;
	}
	// void RetryAttempts_set_a(struct LDKRetryAttempts *NONNULL_PTR this_ptr, uintptr_t val);
	export function RetryAttempts_set_a(this_ptr: number, val: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RetryAttempts_set_a(this_ptr, val);
		// debug statements here
	}
	// MUST_USE_RES struct LDKRetryAttempts RetryAttempts_new(uintptr_t a_arg);
	export function RetryAttempts_new(a_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RetryAttempts_new(a_arg);
		return nativeResponseValue;
	}
	// struct LDKRetryAttempts RetryAttempts_clone(const struct LDKRetryAttempts *NONNULL_PTR orig);
	export function RetryAttempts_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RetryAttempts_clone(orig);
		return nativeResponseValue;
	}
	// bool RetryAttempts_eq(const struct LDKRetryAttempts *NONNULL_PTR a, const struct LDKRetryAttempts *NONNULL_PTR b);
	export function RetryAttempts_eq(a: number, b: number): boolean {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RetryAttempts_eq(a, b);
		return nativeResponseValue;
	}
	// uint64_t RetryAttempts_hash(const struct LDKRetryAttempts *NONNULL_PTR o);
	export function RetryAttempts_hash(o: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.RetryAttempts_hash(o);
		return nativeResponseValue;
	}
	// void PaymentError_free(struct LDKPaymentError this_ptr);
	export function PaymentError_free(this_ptr: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentError_free(this_ptr);
		// debug statements here
	}
	// struct LDKPaymentError PaymentError_clone(const struct LDKPaymentError *NONNULL_PTR orig);
	export function PaymentError_clone(orig: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentError_clone(orig);
		return nativeResponseValue;
	}
	// struct LDKPaymentError PaymentError_invoice(struct LDKStr a);
	export function PaymentError_invoice(a: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentError_invoice(a);
		return nativeResponseValue;
	}
	// struct LDKPaymentError PaymentError_routing(struct LDKLightningError a);
	export function PaymentError_routing(a: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentError_routing(a);
		return nativeResponseValue;
	}
	// struct LDKPaymentError PaymentError_sending(struct LDKPaymentSendFailure a);
	export function PaymentError_sending(a: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.PaymentError_sending(a);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKInvoicePayer InvoicePayer_new(struct LDKPayer payer, struct LDKRouter router, const struct LDKLockableScore *NONNULL_PTR scorer, struct LDKLogger logger, struct LDKEventHandler event_handler, struct LDKRetryAttempts retry_attempts);
	export function InvoicePayer_new(payer: number, router: number, scorer: number, logger: number, event_handler: number, retry_attempts: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoicePayer_new(payer, router, scorer, logger, event_handler, retry_attempts);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_PaymentIdPaymentErrorZ InvoicePayer_pay_invoice(const struct LDKInvoicePayer *NONNULL_PTR this_arg, const struct LDKInvoice *NONNULL_PTR invoice);
	export function InvoicePayer_pay_invoice(this_arg: number, invoice: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoicePayer_pay_invoice(this_arg, invoice);
		return nativeResponseValue;
	}
	// MUST_USE_RES struct LDKCResult_PaymentIdPaymentErrorZ InvoicePayer_pay_zero_value_invoice(const struct LDKInvoicePayer *NONNULL_PTR this_arg, const struct LDKInvoice *NONNULL_PTR invoice, uint64_t amount_msats);
	export function InvoicePayer_pay_zero_value_invoice(this_arg: number, invoice: number, amount_msats: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoicePayer_pay_zero_value_invoice(this_arg, invoice, amount_msats);
		return nativeResponseValue;
	}
	// void InvoicePayer_remove_cached_payment(const struct LDKInvoicePayer *NONNULL_PTR this_arg, const uint8_t (*payment_hash)[32]);
	export function InvoicePayer_remove_cached_payment(this_arg: number, payment_hash: Uint8Array): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoicePayer_remove_cached_payment(this_arg, encodeArray(payment_hash));
		// debug statements here
	}
	// struct LDKEventHandler InvoicePayer_as_EventHandler(const struct LDKInvoicePayer *NONNULL_PTR this_arg);
	export function InvoicePayer_as_EventHandler(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.InvoicePayer_as_EventHandler(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCResult_InvoiceSignOrCreationErrorZ create_invoice_from_channelmanager(const struct LDKChannelManager *NONNULL_PTR channelmanager, struct LDKKeysInterface keys_manager, enum LDKCurrency network, struct LDKCOption_u64Z amt_msat, struct LDKStr description);
	export function create_invoice_from_channelmanager(channelmanager: number, keys_manager: number, network: Currency, amt_msat: number, description: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.create_invoice_from_channelmanager(channelmanager, keys_manager, network, amt_msat, description);
		return nativeResponseValue;
	}
	// void DefaultRouter_free(struct LDKDefaultRouter this_obj);
	export function DefaultRouter_free(this_obj: number): void {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DefaultRouter_free(this_obj);
		// debug statements here
	}
	// MUST_USE_RES struct LDKDefaultRouter DefaultRouter_new(const struct LDKNetworkGraph *NONNULL_PTR network_graph, struct LDKLogger logger);
	export function DefaultRouter_new(network_graph: number, logger: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DefaultRouter_new(network_graph, logger);
		return nativeResponseValue;
	}
	// struct LDKRouter DefaultRouter_as_Router(const struct LDKDefaultRouter *NONNULL_PTR this_arg);
	export function DefaultRouter_as_Router(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.DefaultRouter_as_Router(this_arg);
		return nativeResponseValue;
	}
	// struct LDKPayer ChannelManager_as_Payer(const struct LDKChannelManager *NONNULL_PTR this_arg);
	export function ChannelManager_as_Payer(this_arg: number): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.ChannelManager_as_Payer(this_arg);
		return nativeResponseValue;
	}
	// struct LDKCResult_SiPrefixNoneZ SiPrefix_from_str(struct LDKStr s);
	export function SiPrefix_from_str(s: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SiPrefix_from_str(s);
		return nativeResponseValue;
	}
	// struct LDKCResult_InvoiceNoneZ Invoice_from_str(struct LDKStr s);
	export function Invoice_from_str(s: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_from_str(s);
		return nativeResponseValue;
	}
	// struct LDKCResult_SignedRawInvoiceNoneZ SignedRawInvoice_from_str(struct LDKStr s);
	export function SignedRawInvoice_from_str(s: String): number {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_from_str(s);
		return nativeResponseValue;
	}
	// struct LDKStr Invoice_to_str(const struct LDKInvoice *NONNULL_PTR o);
	export function Invoice_to_str(o: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Invoice_to_str(o);
		return nativeResponseValue;
	}
	// struct LDKStr SignedRawInvoice_to_str(const struct LDKSignedRawInvoice *NONNULL_PTR o);
	export function SignedRawInvoice_to_str(o: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SignedRawInvoice_to_str(o);
		return nativeResponseValue;
	}
	// struct LDKStr Currency_to_str(const enum LDKCurrency *NONNULL_PTR o);
	export function Currency_to_str(o: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.Currency_to_str(o);
		return nativeResponseValue;
	}
	// struct LDKStr SiPrefix_to_str(const enum LDKSiPrefix *NONNULL_PTR o);
	export function SiPrefix_to_str(o: number): String {
		if(!isWasmInitialized) {
			throw new Error("initializeWasm() must be awaited first!");
		}
		const nativeResponseValue = wasm.SiPrefix_to_str(o);
		return nativeResponseValue;
	}

        export async function initializeWasm(allowDoubleInitialization: boolean = false): Promise<void> {
            if(isWasmInitialized && !allowDoubleInitialization) {
                return;
            }
            const wasmInstance = await WebAssembly.instantiate(wasmModule, imports)
            wasm = wasmInstance.exports;
            isWasmInitialized = true;
        }
        