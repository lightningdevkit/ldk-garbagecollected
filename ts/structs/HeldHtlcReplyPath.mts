
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Parameters for the reply path to a [`HeldHtlcAvailable`] onion message.
 */
export class HeldHtlcReplyPath extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.HeldHtlcReplyPath_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): HeldHtlcReplyPath {
		const raw_ty: number = bindings.LDKHeldHtlcReplyPath_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new HeldHtlcReplyPath_ToUs(ptr);
			case 1: return new HeldHtlcReplyPath_ToCounterparty(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HeldHtlcReplyPath_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HeldHtlcReplyPath
	 */
	public clone(): HeldHtlcReplyPath {
		const ret: bigint = bindings.HeldHtlcReplyPath_clone(this.ptr);
		const ret_hu_conv: HeldHtlcReplyPath = HeldHtlcReplyPath.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ToUs-variant HeldHtlcReplyPath
	 */
	public static constructor_to_us(payment_id: Uint8Array, peers: MessageForwardNode[]): HeldHtlcReplyPath {
		const ret: bigint = bindings.HeldHtlcReplyPath_to_us(bindings.encodeUint8Array(payment_id), bindings.encodeUint64Array(peers.map(peers_conv_20 => CommonBase.get_ptr_of(peers_conv_20))));
		const ret_hu_conv: HeldHtlcReplyPath = HeldHtlcReplyPath.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ToCounterparty-variant HeldHtlcReplyPath
	 */
	public static constructor_to_counterparty(path: BlindedMessagePath): HeldHtlcReplyPath {
		const ret: bigint = bindings.HeldHtlcReplyPath_to_counterparty(CommonBase.get_ptr_of(path));
		const ret_hu_conv: HeldHtlcReplyPath = HeldHtlcReplyPath.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A HeldHtlcReplyPath of type ToUs */
export class HeldHtlcReplyPath_ToUs extends HeldHtlcReplyPath {
	/**
	 * The id of the payment.
	 */
	public payment_id: Uint8Array;
	/**
	 * The peers to use when creating this reply path.
	 */
	public peers: MessageForwardNode[];
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKHeldHtlcReplyPath_ToUs_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const peers: number = bindings.LDKHeldHtlcReplyPath_ToUs_get_peers(ptr);
		const peers_conv_20_len: number = bindings.getArrayLength(peers);
			const peers_conv_20_arr: MessageForwardNode[] = new Array(peers_conv_20_len).fill(null);
			for (var u = 0; u < peers_conv_20_len; u++) {
				const peers_conv_20: bigint = bindings.getU64ArrayElem(peers, u);
				const peers_conv_20_hu_conv: MessageForwardNode = new MessageForwardNode(null, peers_conv_20);
				CommonBase.add_ref_from(peers_conv_20_hu_conv, this);
				peers_conv_20_arr[u] = peers_conv_20_hu_conv;
			}
			bindings.freeWasmMemory(peers)
		this.peers = peers_conv_20_arr;
	}
}
/** A HeldHtlcReplyPath of type ToCounterparty */
export class HeldHtlcReplyPath_ToCounterparty extends HeldHtlcReplyPath {
	/**
	 * The blinded path provided to us by our counterparty.
	 */
	public path: BlindedMessagePath;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const path: bigint = bindings.LDKHeldHtlcReplyPath_ToCounterparty_get_path(ptr);
		const path_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, path);
			CommonBase.add_ref_from(path_hu_conv, this);
		this.path = path_hu_conv;
	}
}
