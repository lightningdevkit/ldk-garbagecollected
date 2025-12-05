

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of Router */
export interface RouterInterface {
	/**Finds a [`Route`] for a payment between the given `payer` and a payee.
	 * 
	 * The `payee` and the payment's value are given in [`RouteParameters::payment_params`]
	 * and [`RouteParameters::final_value_msat`], respectively.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	find_route(payer: Uint8Array, route_params: RouteParameters, first_hops: ChannelDetails[], inflight_htlcs: InFlightHtlcs): Result_RouteStrZ;
	/**Finds a [`Route`] for a payment between the given `payer` and a payee.
	 * 
	 * The `payee` and the payment's value are given in [`RouteParameters::payment_params`]
	 * and [`RouteParameters::final_value_msat`], respectively.
	 * 
	 * Includes a [`PaymentHash`] and a [`PaymentId`] to be able to correlate the request with a specific
	 * payment.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	find_route_with_id(payer: Uint8Array, route_params: RouteParameters, first_hops: ChannelDetails[], inflight_htlcs: InFlightHtlcs, _payment_hash: Uint8Array, _payment_id: Uint8Array): Result_RouteStrZ;
	/**Creates [`BlindedPaymentPath`]s for payment to the `recipient` node. The channels in `first_hops`
	 * are assumed to be with the `recipient`'s peers. The payment secret and any constraints are
	 * given in `tlvs`.
	 */
	create_blinded_payment_paths(recipient: Uint8Array, first_hops: ChannelDetails[], tlvs: ReceiveTlvs, amount_msats: Option_u64Z): Result_CVec_BlindedPaymentPathZNoneZ;
}

class LDKRouterHolder {
	held: Router|null = null;
}

/**
 * A trait defining behavior for routing a payment.
 */
export class Router extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKRouter|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Router_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of Router from a given implementation */
	public static new_impl(arg: RouterInterface): Router {
		const impl_holder: LDKRouterHolder = new LDKRouterHolder();
		let structImplementation = {
			find_route (payer: number, route_params: bigint, first_hops: number, inflight_htlcs: bigint): bigint {
				const payer_conv: Uint8Array = bindings.decodeUint8Array(payer);
				const route_params_hu_conv: RouteParameters = new RouteParameters(null, route_params);
				const first_hops_conv_16_len: number = bindings.getArrayLength(first_hops);
				const first_hops_conv_16_arr: ChannelDetails[] = new Array(first_hops_conv_16_len).fill(null);
				if (first_hops != 0) {
					for (var q = 0; q < first_hops_conv_16_len; q++) {
						const first_hops_conv_16: bigint = bindings.getU64ArrayElem(first_hops, q);
						const first_hops_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, first_hops_conv_16);
						CommonBase.add_ref_from(first_hops_conv_16_hu_conv, this);
						first_hops_conv_16_arr[q] = first_hops_conv_16_hu_conv;
					}
				}
				bindings.freeWasmMemory(first_hops)
				const inflight_htlcs_hu_conv: InFlightHtlcs = new InFlightHtlcs(null, inflight_htlcs);
				CommonBase.add_ref_from(inflight_htlcs_hu_conv, this);
				const ret: Result_RouteStrZ = arg.find_route(payer_conv, route_params_hu_conv, first_hops_conv_16_arr, inflight_htlcs_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			find_route_with_id (payer: number, route_params: bigint, first_hops: number, inflight_htlcs: bigint, _payment_hash: number, _payment_id: number): bigint {
				const payer_conv: Uint8Array = bindings.decodeUint8Array(payer);
				const route_params_hu_conv: RouteParameters = new RouteParameters(null, route_params);
				const first_hops_conv_16_len: number = bindings.getArrayLength(first_hops);
				const first_hops_conv_16_arr: ChannelDetails[] = new Array(first_hops_conv_16_len).fill(null);
				if (first_hops != 0) {
					for (var q = 0; q < first_hops_conv_16_len; q++) {
						const first_hops_conv_16: bigint = bindings.getU64ArrayElem(first_hops, q);
						const first_hops_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, first_hops_conv_16);
						CommonBase.add_ref_from(first_hops_conv_16_hu_conv, this);
						first_hops_conv_16_arr[q] = first_hops_conv_16_hu_conv;
					}
				}
				bindings.freeWasmMemory(first_hops)
				const inflight_htlcs_hu_conv: InFlightHtlcs = new InFlightHtlcs(null, inflight_htlcs);
				CommonBase.add_ref_from(inflight_htlcs_hu_conv, this);
				const _payment_hash_conv: Uint8Array = bindings.decodeUint8Array(_payment_hash);
				const _payment_id_conv: Uint8Array = bindings.decodeUint8Array(_payment_id);
				const ret: Result_RouteStrZ = arg.find_route_with_id(payer_conv, route_params_hu_conv, first_hops_conv_16_arr, inflight_htlcs_hu_conv, _payment_hash_conv, _payment_id_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			create_blinded_payment_paths (recipient: number, first_hops: number, tlvs: bigint, amount_msats: bigint): bigint {
				const recipient_conv: Uint8Array = bindings.decodeUint8Array(recipient);
				const first_hops_conv_16_len: number = bindings.getArrayLength(first_hops);
				const first_hops_conv_16_arr: ChannelDetails[] = new Array(first_hops_conv_16_len).fill(null);
				for (var q = 0; q < first_hops_conv_16_len; q++) {
					const first_hops_conv_16: bigint = bindings.getU64ArrayElem(first_hops, q);
					const first_hops_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, first_hops_conv_16);
					CommonBase.add_ref_from(first_hops_conv_16_hu_conv, this);
					first_hops_conv_16_arr[q] = first_hops_conv_16_hu_conv;
				}
				bindings.freeWasmMemory(first_hops)
				const tlvs_hu_conv: ReceiveTlvs = new ReceiveTlvs(null, tlvs);
				CommonBase.add_ref_from(tlvs_hu_conv, this);
				const amount_msats_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(amount_msats);
				CommonBase.add_ref_from(amount_msats_hu_conv, this);
				const ret: Result_CVec_BlindedPaymentPathZNoneZ = arg.create_blinded_payment_paths(recipient_conv, first_hops_conv_16_arr, tlvs_hu_conv, amount_msats_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKRouter;
		const ptr_idx: [bigint, number] = bindings.LDKRouter_new(structImplementation);

		impl_holder.held = new Router(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Finds a [`Route`] for a payment between the given `payer` and a payee.
	 * 
	 * The `payee` and the payment's value are given in [`RouteParameters::payment_params`]
	 * and [`RouteParameters::final_value_msat`], respectively.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public find_route(payer: Uint8Array, route_params: RouteParameters, first_hops: ChannelDetails[]|null, inflight_htlcs: InFlightHtlcs): Result_RouteStrZ {
		const ret: bigint = bindings.Router_find_route(this.ptr, bindings.encodeUint8Array(payer), CommonBase.get_ptr_of(route_params), bindings.encodeUint64Array(first_hops != null ? first_hops.map(first_hops_conv_16 => CommonBase.get_ptr_of(first_hops_conv_16)) : null), CommonBase.get_ptr_of(inflight_htlcs));
		const ret_hu_conv: Result_RouteStrZ = Result_RouteStrZ.constr_from_ptr(ret);
		if (first_hops != null) { first_hops.forEach((first_hops_conv_16: ChannelDetails) => { CommonBase.add_ref_from(this, first_hops_conv_16); }) };
		return ret_hu_conv;
	}

	/**
	 * Finds a [`Route`] for a payment between the given `payer` and a payee.
	 * 
	 * The `payee` and the payment's value are given in [`RouteParameters::payment_params`]
	 * and [`RouteParameters::final_value_msat`], respectively.
	 * 
	 * Includes a [`PaymentHash`] and a [`PaymentId`] to be able to correlate the request with a specific
	 * payment.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public find_route_with_id(payer: Uint8Array, route_params: RouteParameters, first_hops: ChannelDetails[]|null, inflight_htlcs: InFlightHtlcs, _payment_hash: Uint8Array, _payment_id: Uint8Array): Result_RouteStrZ {
		const ret: bigint = bindings.Router_find_route_with_id(this.ptr, bindings.encodeUint8Array(payer), CommonBase.get_ptr_of(route_params), bindings.encodeUint64Array(first_hops != null ? first_hops.map(first_hops_conv_16 => CommonBase.get_ptr_of(first_hops_conv_16)) : null), CommonBase.get_ptr_of(inflight_htlcs), bindings.encodeUint8Array(_payment_hash), bindings.encodeUint8Array(_payment_id));
		const ret_hu_conv: Result_RouteStrZ = Result_RouteStrZ.constr_from_ptr(ret);
		if (first_hops != null) { first_hops.forEach((first_hops_conv_16: ChannelDetails) => { CommonBase.add_ref_from(this, first_hops_conv_16); }) };
		return ret_hu_conv;
	}

	/**
	 * Creates [`BlindedPaymentPath`]s for payment to the `recipient` node. The channels in `first_hops`
	 * are assumed to be with the `recipient`'s peers. The payment secret and any constraints are
	 * given in `tlvs`.
	 */
	public create_blinded_payment_paths(recipient: Uint8Array, first_hops: ChannelDetails[], tlvs: ReceiveTlvs, amount_msats: Option_u64Z): Result_CVec_BlindedPaymentPathZNoneZ {
		const ret: bigint = bindings.Router_create_blinded_payment_paths(this.ptr, bindings.encodeUint8Array(recipient), bindings.encodeUint64Array(first_hops.map(first_hops_conv_16 => CommonBase.get_ptr_of(first_hops_conv_16))), CommonBase.get_ptr_of(tlvs), CommonBase.get_ptr_of(amount_msats));
		const ret_hu_conv: Result_CVec_BlindedPaymentPathZNoneZ = Result_CVec_BlindedPaymentPathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
