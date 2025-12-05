
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::Address or not
 */
export class Option_AddressZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_AddressZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_AddressZ {
		const raw_ty: number = bindings.LDKCOption_AddressZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_AddressZ_Some(ptr);
			case 1: return new Option_AddressZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_AddressZ containing a crate::c_types::Address
	 */
	public static constructor_some(o: Address): Option_AddressZ {
		const ret: bigint = bindings.COption_AddressZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_AddressZ = Option_AddressZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_AddressZ containing nothing
	 */
	public static constructor_none(): Option_AddressZ {
		const ret: bigint = bindings.COption_AddressZ_none();
		const ret_hu_conv: Option_AddressZ = Option_AddressZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A Option_AddressZ of type Some */
export class Option_AddressZ_Some extends Option_AddressZ {
	public some: Address;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_AddressZ_Some_get_some(ptr);
		const some_conv: Address = new Address(null, some);
		this.some = some_conv;
	}
}
/** A Option_AddressZ of type None */
export class Option_AddressZ_None extends Option_AddressZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
