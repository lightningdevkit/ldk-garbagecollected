
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::ln::channel_state::ChannelShutdownState or not
 */
export class Option_ChannelShutdownStateZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_ChannelShutdownStateZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_ChannelShutdownStateZ {
		const raw_ty: number = bindings.LDKCOption_ChannelShutdownStateZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_ChannelShutdownStateZ_Some(ptr);
			case 1: return new Option_ChannelShutdownStateZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_ChannelShutdownStateZ containing a crate::lightning::ln::channel_state::ChannelShutdownState
	 */
	public static constructor_some(o: ChannelShutdownState): Option_ChannelShutdownStateZ {
		const ret: bigint = bindings.COption_ChannelShutdownStateZ_some(o);
		const ret_hu_conv: Option_ChannelShutdownStateZ = Option_ChannelShutdownStateZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ChannelShutdownStateZ containing nothing
	 */
	public static constructor_none(): Option_ChannelShutdownStateZ {
		const ret: bigint = bindings.COption_ChannelShutdownStateZ_none();
		const ret_hu_conv: Option_ChannelShutdownStateZ = Option_ChannelShutdownStateZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_ChannelShutdownStateZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_ChannelShutdownStateZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_ChannelShutdownStateZ {
		const ret: bigint = bindings.COption_ChannelShutdownStateZ_clone(this.ptr);
		const ret_hu_conv: Option_ChannelShutdownStateZ = Option_ChannelShutdownStateZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_ChannelShutdownStateZ of type Some */
export class Option_ChannelShutdownStateZ_Some extends Option_ChannelShutdownStateZ {
	public some: ChannelShutdownState;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.some = bindings.LDKCOption_ChannelShutdownStateZ_Some_get_some(ptr);
	}
}
/** A Option_ChannelShutdownStateZ of type None */
export class Option_ChannelShutdownStateZ_None extends Option_ChannelShutdownStateZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
