
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The recipient of a payment, differing based on whether they've hidden their identity with route
 * blinding.
 */
export class Payee extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Payee_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Payee {
		const raw_ty: number = bindings.LDKPayee_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Payee_Blinded(ptr);
			case 1: return new Payee_Clear(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Payee_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Payee
	 */
	public clone(): Payee {
		const ret: bigint = bindings.Payee_clone(this.ptr);
		const ret_hu_conv: Payee = Payee.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Blinded-variant Payee
	 */
	public static constructor_blinded(route_hints: BlindedPaymentPath[], features: Bolt12InvoiceFeatures): Payee {
		const ret: bigint = bindings.Payee_blinded(bindings.encodeUint64Array(route_hints.map(route_hints_conv_20 => CommonBase.get_ptr_of(route_hints_conv_20))), CommonBase.get_ptr_of(features));
		const ret_hu_conv: Payee = Payee.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Clear-variant Payee
	 */
	public static constructor_clear(node_id: Uint8Array, route_hints: RouteHint[], features: Bolt11InvoiceFeatures, final_cltv_expiry_delta: number): Payee {
		const ret: bigint = bindings.Payee_clear(bindings.encodeUint8Array(node_id), bindings.encodeUint64Array(route_hints.map(route_hints_conv_11 => CommonBase.get_ptr_of(route_hints_conv_11))), CommonBase.get_ptr_of(features), final_cltv_expiry_delta);
		const ret_hu_conv: Payee = Payee.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Payee.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Payee_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Payees contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: Payee): boolean {
		const ret: boolean = bindings.Payee_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
/** A Payee of type Blinded */
export class Payee_Blinded extends Payee {
	/**
	 * Aggregated routing info and blinded paths, for routing to the payee without knowing their
	 * node id.
	 */
	public route_hints: BlindedPaymentPath[];
	/**
	 * Features supported by the payee.
	 * 
	 * May be set from the payee's invoice. May be `None` if the invoice does not contain any
	 * features.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public features: Bolt12InvoiceFeatures;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const route_hints: number = bindings.LDKPayee_Blinded_get_route_hints(ptr);
		const route_hints_conv_20_len: number = bindings.getArrayLength(route_hints);
			const route_hints_conv_20_arr: BlindedPaymentPath[] = new Array(route_hints_conv_20_len).fill(null);
			for (var u = 0; u < route_hints_conv_20_len; u++) {
				const route_hints_conv_20: bigint = bindings.getU64ArrayElem(route_hints, u);
				const route_hints_conv_20_hu_conv: BlindedPaymentPath = new BlindedPaymentPath(null, route_hints_conv_20);
				CommonBase.add_ref_from(route_hints_conv_20_hu_conv, this);
				route_hints_conv_20_arr[u] = route_hints_conv_20_hu_conv;
			}
			bindings.freeWasmMemory(route_hints)
		this.route_hints = route_hints_conv_20_arr;
		const features: bigint = bindings.LDKPayee_Blinded_get_features(ptr);
		const features_hu_conv: Bolt12InvoiceFeatures = new Bolt12InvoiceFeatures(null, features);
			CommonBase.add_ref_from(features_hu_conv, this);
		this.features = features_hu_conv;
	}
}
/** A Payee of type Clear */
export class Payee_Clear extends Payee {
	/**
	 * The node id of the payee.
	 */
	public node_id: Uint8Array;
	/**
	 * Hints for routing to the payee, containing channels connecting the payee to public nodes.
	 */
	public route_hints: RouteHint[];
	/**
	 * Features supported by the payee.
	 * 
	 * May be set from the payee's invoice or via [`for_keysend`]. May be `None` if the invoice
	 * does not contain any features.
	 * 
	 * [`for_keysend`]: PaymentParameters::for_keysend
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public features: Bolt11InvoiceFeatures;
	/**
	 * The minimum CLTV delta at the end of the route. This value must not be zero.
	 */
	public final_cltv_expiry_delta: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKPayee_Clear_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const route_hints: number = bindings.LDKPayee_Clear_get_route_hints(ptr);
		const route_hints_conv_11_len: number = bindings.getArrayLength(route_hints);
			const route_hints_conv_11_arr: RouteHint[] = new Array(route_hints_conv_11_len).fill(null);
			for (var l = 0; l < route_hints_conv_11_len; l++) {
				const route_hints_conv_11: bigint = bindings.getU64ArrayElem(route_hints, l);
				const route_hints_conv_11_hu_conv: RouteHint = new RouteHint(null, route_hints_conv_11);
				CommonBase.add_ref_from(route_hints_conv_11_hu_conv, this);
				route_hints_conv_11_arr[l] = route_hints_conv_11_hu_conv;
			}
			bindings.freeWasmMemory(route_hints)
		this.route_hints = route_hints_conv_11_arr;
		const features: bigint = bindings.LDKPayee_Clear_get_features(ptr);
		const features_hu_conv: Bolt11InvoiceFeatures = new Bolt11InvoiceFeatures(null, features);
			CommonBase.add_ref_from(features_hu_conv, this);
		this.features = features_hu_conv;
		this.final_cltv_expiry_delta = bindings.LDKPayee_Clear_get_final_cltv_expiry_delta(ptr);
	}
}
