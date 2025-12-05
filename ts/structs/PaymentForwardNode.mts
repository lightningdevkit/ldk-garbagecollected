
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An intermediate node, its outbound channel, and relay parameters.
 */
export class PaymentForwardNode extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PaymentForwardNode_free);
	}

	/**
	 * The TLVs for this node's [`BlindedHop`], where the fee parameters contained within are also
	 * used for [`BlindedPayInfo`] construction.
	 */
	public get_tlvs(): ForwardTlvs {
		const ret: bigint = bindings.PaymentForwardNode_get_tlvs(this.ptr);
		const ret_hu_conv: ForwardTlvs = new ForwardTlvs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The TLVs for this node's [`BlindedHop`], where the fee parameters contained within are also
	 * used for [`BlindedPayInfo`] construction.
	 */
	public set_tlvs(val: ForwardTlvs): void {
		bindings.PaymentForwardNode_set_tlvs(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * This node's pubkey.
	 */
	public get_node_id(): Uint8Array {
		const ret: number = bindings.PaymentForwardNode_get_node_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * This node's pubkey.
	 */
	public set_node_id(val: Uint8Array): void {
		bindings.PaymentForwardNode_set_node_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The maximum value, in msat, that may be accepted by this node.
	 */
	public get_htlc_maximum_msat(): bigint {
		const ret: bigint = bindings.PaymentForwardNode_get_htlc_maximum_msat(this.ptr);
		return ret;
	}

	/**
	 * The maximum value, in msat, that may be accepted by this node.
	 */
	public set_htlc_maximum_msat(val: bigint): void {
		bindings.PaymentForwardNode_set_htlc_maximum_msat(this.ptr, val);
	}

	/**
	 * Constructs a new PaymentForwardNode given each field
	 */
	public static constructor_new(tlvs_arg: ForwardTlvs, node_id_arg: Uint8Array, htlc_maximum_msat_arg: bigint): PaymentForwardNode {
		const ret: bigint = bindings.PaymentForwardNode_new(CommonBase.get_ptr_of(tlvs_arg), bindings.encodeUint8Array(node_id_arg), htlc_maximum_msat_arg);
		const ret_hu_conv: PaymentForwardNode = new PaymentForwardNode(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PaymentForwardNode_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentForwardNode
	 */
	public clone(): PaymentForwardNode {
		const ret: bigint = bindings.PaymentForwardNode_clone(this.ptr);
		const ret_hu_conv: PaymentForwardNode = new PaymentForwardNode(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
