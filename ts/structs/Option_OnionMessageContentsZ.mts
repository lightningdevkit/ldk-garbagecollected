
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::onion_message::packet::OnionMessageContents or not
 */
export class Option_OnionMessageContentsZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_OnionMessageContentsZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_OnionMessageContentsZ {
		const raw_ty: number = bindings.LDKCOption_OnionMessageContentsZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_OnionMessageContentsZ_Some(ptr);
			case 1: return new Option_OnionMessageContentsZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_OnionMessageContentsZ containing a crate::lightning::onion_message::packet::OnionMessageContents
	 */
	public static constructor_some(o: OnionMessageContents): Option_OnionMessageContentsZ {
		const ret: bigint = bindings.COption_OnionMessageContentsZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_OnionMessageContentsZ = Option_OnionMessageContentsZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, o);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_OnionMessageContentsZ containing nothing
	 */
	public static constructor_none(): Option_OnionMessageContentsZ {
		const ret: bigint = bindings.COption_OnionMessageContentsZ_none();
		const ret_hu_conv: Option_OnionMessageContentsZ = Option_OnionMessageContentsZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_OnionMessageContentsZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_OnionMessageContentsZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_OnionMessageContentsZ {
		const ret: bigint = bindings.COption_OnionMessageContentsZ_clone(this.ptr);
		const ret_hu_conv: Option_OnionMessageContentsZ = Option_OnionMessageContentsZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_OnionMessageContentsZ of type Some */
export class Option_OnionMessageContentsZ_Some extends Option_OnionMessageContentsZ {
	public some: OnionMessageContents;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_OnionMessageContentsZ_Some_get_some(ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, some);
			CommonBase.add_ref_from(ret_hu_conv, this);
		this.some = ret_hu_conv;
	}
}
/** A Option_OnionMessageContentsZ of type None */
export class Option_OnionMessageContentsZ_None extends Option_OnionMessageContentsZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
