
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Used to indicate the kind of funding for this channel by the channel acceptor (us).
 * 
 * Allows the differentiation between a request for a dual-funded and non-dual-funded channel.
 */
export class InboundChannelFunds extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.InboundChannelFunds_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): InboundChannelFunds {
		const raw_ty: number = bindings.LDKInboundChannelFunds_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new InboundChannelFunds_PushMsat(ptr);
			case 1: return new InboundChannelFunds_DualFunded(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.InboundChannelFunds_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the InboundChannelFunds
	 */
	public clone(): InboundChannelFunds {
		const ret: bigint = bindings.InboundChannelFunds_clone(this.ptr);
		const ret_hu_conv: InboundChannelFunds = InboundChannelFunds.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PushMsat-variant InboundChannelFunds
	 */
	public static constructor_push_msat(a: bigint): InboundChannelFunds {
		const ret: bigint = bindings.InboundChannelFunds_push_msat(a);
		const ret_hu_conv: InboundChannelFunds = InboundChannelFunds.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DualFunded-variant InboundChannelFunds
	 */
	public static constructor_dual_funded(): InboundChannelFunds {
		const ret: bigint = bindings.InboundChannelFunds_dual_funded();
		const ret_hu_conv: InboundChannelFunds = InboundChannelFunds.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two InboundChannelFundss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: InboundChannelFunds): boolean {
		const ret: boolean = bindings.InboundChannelFunds_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
/** A InboundChannelFunds of type PushMsat */
export class InboundChannelFunds_PushMsat extends InboundChannelFunds {
	public push_msat: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.push_msat = bindings.LDKInboundChannelFunds_PushMsat_get_push_msat(ptr);
	}
}
/** A InboundChannelFunds of type DualFunded */
export class InboundChannelFunds_DualFunded extends InboundChannelFunds {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
