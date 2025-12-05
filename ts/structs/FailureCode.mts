
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * This enum is used to specify which error data to send to peers when failing back an HTLC
 * using [`ChannelManager::fail_htlc_backwards_with_reason`].
 * 
 * For more info on failure codes, see <https://github.com/lightning/bolts/blob/master/04-onion-routing.md#failure-messages>.
 */
export class FailureCode extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.FailureCode_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): FailureCode {
		const raw_ty: number = bindings.LDKFailureCode_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new FailureCode_TemporaryNodeFailure(ptr);
			case 1: return new FailureCode_RequiredNodeFeatureMissing(ptr);
			case 2: return new FailureCode_IncorrectOrUnknownPaymentDetails(ptr);
			case 3: return new FailureCode_InvalidOnionPayload(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.FailureCode_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the FailureCode
	 */
	public clone(): FailureCode {
		const ret: bigint = bindings.FailureCode_clone(this.ptr);
		const ret_hu_conv: FailureCode = FailureCode.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TemporaryNodeFailure-variant FailureCode
	 */
	public static constructor_temporary_node_failure(): FailureCode {
		const ret: bigint = bindings.FailureCode_temporary_node_failure();
		const ret_hu_conv: FailureCode = FailureCode.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RequiredNodeFeatureMissing-variant FailureCode
	 */
	public static constructor_required_node_feature_missing(): FailureCode {
		const ret: bigint = bindings.FailureCode_required_node_feature_missing();
		const ret_hu_conv: FailureCode = FailureCode.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncorrectOrUnknownPaymentDetails-variant FailureCode
	 */
	public static constructor_incorrect_or_unknown_payment_details(): FailureCode {
		const ret: bigint = bindings.FailureCode_incorrect_or_unknown_payment_details();
		const ret_hu_conv: FailureCode = FailureCode.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionPayload-variant FailureCode
	 */
	public static constructor_invalid_onion_payload(a: Option_C2Tuple_u64u16ZZ): FailureCode {
		const ret: bigint = bindings.FailureCode_invalid_onion_payload(CommonBase.get_ptr_of(a));
		const ret_hu_conv: FailureCode = FailureCode.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A FailureCode of type TemporaryNodeFailure */
export class FailureCode_TemporaryNodeFailure extends FailureCode {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A FailureCode of type RequiredNodeFeatureMissing */
export class FailureCode_RequiredNodeFeatureMissing extends FailureCode {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A FailureCode of type IncorrectOrUnknownPaymentDetails */
export class FailureCode_IncorrectOrUnknownPaymentDetails extends FailureCode {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A FailureCode of type InvalidOnionPayload */
export class FailureCode_InvalidOnionPayload extends FailureCode {
	public invalid_onion_payload: Option_C2Tuple_u64u16ZZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const invalid_onion_payload: bigint = bindings.LDKFailureCode_InvalidOnionPayload_get_invalid_onion_payload(ptr);
		const invalid_onion_payload_hu_conv: Option_C2Tuple_u64u16ZZ = Option_C2Tuple_u64u16ZZ.constr_from_ptr(invalid_onion_payload);
			CommonBase.add_ref_from(invalid_onion_payload_hu_conv, this);
		this.invalid_onion_payload = invalid_onion_payload_hu_conv;
	}
}
