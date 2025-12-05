
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A blinded path to be used for sending or receiving a payment, hiding the identity of the
 * recipient.
 */
export class BlindedPaymentPath extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BlindedPaymentPath_free);
	}

	/**
	 * The [`BlindedPayInfo`] used to pay this blinded path.
	 */
	public get_payinfo(): BlindedPayInfo {
		const ret: bigint = bindings.BlindedPaymentPath_get_payinfo(this.ptr);
		const ret_hu_conv: BlindedPayInfo = new BlindedPayInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The [`BlindedPayInfo`] used to pay this blinded path.
	 */
	public set_payinfo(val: BlindedPayInfo): void {
		bindings.BlindedPaymentPath_set_payinfo(this.ptr, CommonBase.get_ptr_of(val));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BlindedPaymentPath_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedPaymentPath
	 */
	public clone(): BlindedPaymentPath {
		const ret: bigint = bindings.BlindedPaymentPath_clone(this.ptr);
		const ret_hu_conv: BlindedPaymentPath = new BlindedPaymentPath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedPaymentPath.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.BlindedPaymentPath_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two BlindedPaymentPaths contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: BlindedPaymentPath): boolean {
		const ret: boolean = bindings.BlindedPaymentPath_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Create a one-hop blinded path for a payment.
	 */
	public static constructor_one_hop(payee_node_id: Uint8Array, payee_tlvs: ReceiveTlvs, min_final_cltv_expiry_delta: number, entropy_source: EntropySource): Result_BlindedPaymentPathNoneZ {
		const ret: bigint = bindings.BlindedPaymentPath_one_hop(bindings.encodeUint8Array(payee_node_id), CommonBase.get_ptr_of(payee_tlvs), min_final_cltv_expiry_delta, CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: Result_BlindedPaymentPathNoneZ = Result_BlindedPaymentPathNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Create a blinded path for a payment, to be forwarded along `intermediate_nodes`.
	 * 
	 * Errors if:
	 * [`BlindedPayInfo`] calculation results in an integer overflow
	 * any unknown features are required in the provided [`ForwardTlvs`]
	 */
	public static constructor_new(intermediate_nodes: PaymentForwardNode[], payee_node_id: Uint8Array, payee_tlvs: ReceiveTlvs, htlc_maximum_msat: bigint, min_final_cltv_expiry_delta: number, entropy_source: EntropySource): Result_BlindedPaymentPathNoneZ {
		const ret: bigint = bindings.BlindedPaymentPath_new(bindings.encodeUint64Array(intermediate_nodes.map(intermediate_nodes_conv_20 => CommonBase.get_ptr_of(intermediate_nodes_conv_20))), bindings.encodeUint8Array(payee_node_id), CommonBase.get_ptr_of(payee_tlvs), htlc_maximum_msat, min_final_cltv_expiry_delta, CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: Result_BlindedPaymentPathNoneZ = Result_BlindedPaymentPathNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Returns the introduction [`NodeId`] of the blinded path, if it is publicly reachable (i.e.,
	 * it is found in the network graph).
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public public_introduction_node_id(network_graph: ReadOnlyNetworkGraph): NodeId {
		const ret: bigint = bindings.BlindedPaymentPath_public_introduction_node_id(this.ptr, CommonBase.get_ptr_of(network_graph));
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		CommonBase.add_ref_from(this, network_graph);
		return ret_hu_conv;
	}

	/**
	 * The [`IntroductionNode`] of the blinded path.
	 */
	public introduction_node(): IntroductionNode {
		const ret: bigint = bindings.BlindedPaymentPath_introduction_node(this.ptr);
		const ret_hu_conv: IntroductionNode = IntroductionNode.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Used by the [`IntroductionNode`] to decrypt its [`encrypted_payload`] to forward the payment.
	 * 
	 * [`encrypted_payload`]: BlindedHop::encrypted_payload
	 */
	public blinding_point(): Uint8Array {
		const ret: number = bindings.BlindedPaymentPath_blinding_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The [`BlindedHop`]s within the blinded path.
	 */
	public blinded_hops(): BlindedHop[] {
		const ret: number = bindings.BlindedPaymentPath_blinded_hops(this.ptr);
		const ret_conv_12_len: number = bindings.getArrayLength(ret);
		const ret_conv_12_arr: BlindedHop[] = new Array(ret_conv_12_len).fill(null);
		for (var m = 0; m < ret_conv_12_len; m++) {
			const ret_conv_12: bigint = bindings.getU64ArrayElem(ret, m);
			const ret_conv_12_hu_conv: BlindedHop = new BlindedHop(null, ret_conv_12);
			CommonBase.add_ref_from(ret_conv_12_hu_conv, this);
			ret_conv_12_arr[m] = ret_conv_12_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_12_arr;
	}

	/**
	 * Advance the blinded onion payment path by one hop, making the second hop into the new
	 * introduction node.
	 * 
	 * Will only modify `self` when returning `Ok`.
	 */
	public advance_path_by_one(node_signer: NodeSigner, node_id_lookup: NodeIdLookUp): Result_NoneNoneZ {
		const ret: bigint = bindings.BlindedPaymentPath_advance_path_by_one(this.ptr, CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(node_id_lookup));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, node_signer);
		CommonBase.add_ref_from(this, node_id_lookup);
		return ret_hu_conv;
	}

	/**
	 * Builds a new [`BlindedPaymentPath`] from its constituent parts.
	 * 
	 * Useful when reconstructing a blinded path from previously serialized components.
	 * 
	 * Parameters:
	 * `introduction_node_id`: The public key of the introduction node in the path.
	 * `blinding_point`: The public key used for blinding the path.
	 * `blinded_hops`: The encrypted routing information for each hop in the path.
	 * `payinfo`: The [`BlindedPayInfo`] for the blinded path.
	 */
	public static constructor_from_blinded_path_and_payinfo(introduction_node_id: Uint8Array, blinding_point: Uint8Array, blinded_hops: BlindedHop[], payinfo: BlindedPayInfo): BlindedPaymentPath {
		const ret: bigint = bindings.BlindedPaymentPath_from_blinded_path_and_payinfo(bindings.encodeUint8Array(introduction_node_id), bindings.encodeUint8Array(blinding_point), bindings.encodeUint64Array(blinded_hops.map(blinded_hops_conv_12 => CommonBase.get_ptr_of(blinded_hops_conv_12))), CommonBase.get_ptr_of(payinfo));
		const ret_hu_conv: BlindedPaymentPath = new BlindedPaymentPath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
