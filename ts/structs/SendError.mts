
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Errors that may occur when [sending an onion message].
 * 
 * [sending an onion message]: OnionMessenger::send_onion_message
 */
export class SendError extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.SendError_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): SendError {
		const raw_ty: number = bindings.LDKSendError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SendError_Secp256k1(ptr);
			case 1: return new SendError_TooBigPacket(ptr);
			case 2: return new SendError_TooFewBlindedHops(ptr);
			case 3: return new SendError_InvalidFirstHop(ptr);
			case 4: return new SendError_PathNotFound(ptr);
			case 5: return new SendError_InvalidMessage(ptr);
			case 6: return new SendError_BufferFull(ptr);
			case 7: return new SendError_GetNodeIdFailed(ptr);
			case 8: return new SendError_UnresolvedIntroductionNode(ptr);
			case 9: return new SendError_BlindedPathAdvanceFailed(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SendError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SendError
	 */
	public clone(): SendError {
		const ret: bigint = bindings.SendError_clone(this.ptr);
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Secp256k1-variant SendError
	 */
	public static constructor_secp256k1(a: Secp256k1Error): SendError {
		const ret: bigint = bindings.SendError_secp256k1(a);
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TooBigPacket-variant SendError
	 */
	public static constructor_too_big_packet(): SendError {
		const ret: bigint = bindings.SendError_too_big_packet();
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TooFewBlindedHops-variant SendError
	 */
	public static constructor_too_few_blinded_hops(): SendError {
		const ret: bigint = bindings.SendError_too_few_blinded_hops();
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidFirstHop-variant SendError
	 */
	public static constructor_invalid_first_hop(a: Uint8Array): SendError {
		const ret: bigint = bindings.SendError_invalid_first_hop(bindings.encodeUint8Array(a));
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PathNotFound-variant SendError
	 */
	public static constructor_path_not_found(): SendError {
		const ret: bigint = bindings.SendError_path_not_found();
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidMessage-variant SendError
	 */
	public static constructor_invalid_message(): SendError {
		const ret: bigint = bindings.SendError_invalid_message();
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BufferFull-variant SendError
	 */
	public static constructor_buffer_full(): SendError {
		const ret: bigint = bindings.SendError_buffer_full();
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new GetNodeIdFailed-variant SendError
	 */
	public static constructor_get_node_id_failed(): SendError {
		const ret: bigint = bindings.SendError_get_node_id_failed();
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnresolvedIntroductionNode-variant SendError
	 */
	public static constructor_unresolved_introduction_node(): SendError {
		const ret: bigint = bindings.SendError_unresolved_introduction_node();
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BlindedPathAdvanceFailed-variant SendError
	 */
	public static constructor_blinded_path_advance_failed(): SendError {
		const ret: bigint = bindings.SendError_blinded_path_advance_failed();
		const ret_hu_conv: SendError = SendError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the SendError.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.SendError_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two SendErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: SendError): boolean {
		const ret: boolean = bindings.SendError_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
/** A SendError of type Secp256k1 */
export class SendError_Secp256k1 extends SendError {
	public secp256k1: Secp256k1Error;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.secp256k1 = bindings.LDKSendError_Secp256k1_get_secp256k1(ptr);
	}
}
/** A SendError of type TooBigPacket */
export class SendError_TooBigPacket extends SendError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A SendError of type TooFewBlindedHops */
export class SendError_TooFewBlindedHops extends SendError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A SendError of type InvalidFirstHop */
export class SendError_InvalidFirstHop extends SendError {
	public invalid_first_hop: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const invalid_first_hop: number = bindings.LDKSendError_InvalidFirstHop_get_invalid_first_hop(ptr);
		const invalid_first_hop_conv: Uint8Array = bindings.decodeUint8Array(invalid_first_hop);
		this.invalid_first_hop = invalid_first_hop_conv;
	}
}
/** A SendError of type PathNotFound */
export class SendError_PathNotFound extends SendError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A SendError of type InvalidMessage */
export class SendError_InvalidMessage extends SendError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A SendError of type BufferFull */
export class SendError_BufferFull extends SendError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A SendError of type GetNodeIdFailed */
export class SendError_GetNodeIdFailed extends SendError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A SendError of type UnresolvedIntroductionNode */
export class SendError_UnresolvedIntroductionNode extends SendError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A SendError of type BlindedPathAdvanceFailed */
export class SendError_BlindedPathAdvanceFailed extends SendError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
