
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::ln::msgs::SocketAddress or not
 */
export class Option_SocketAddressZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_SocketAddressZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_SocketAddressZ {
		const raw_ty: number = bindings.LDKCOption_SocketAddressZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_SocketAddressZ_Some(ptr);
			case 1: return new Option_SocketAddressZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_SocketAddressZ containing a crate::lightning::ln::msgs::SocketAddress
	 */
	public static constructor_some(o: SocketAddress): Option_SocketAddressZ {
		const ret: bigint = bindings.COption_SocketAddressZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_SocketAddressZ = Option_SocketAddressZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_SocketAddressZ containing nothing
	 */
	public static constructor_none(): Option_SocketAddressZ {
		const ret: bigint = bindings.COption_SocketAddressZ_none();
		const ret_hu_conv: Option_SocketAddressZ = Option_SocketAddressZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_SocketAddressZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_SocketAddressZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_SocketAddressZ {
		const ret: bigint = bindings.COption_SocketAddressZ_clone(this.ptr);
		const ret_hu_conv: Option_SocketAddressZ = Option_SocketAddressZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_SocketAddressZ of type Some */
export class Option_SocketAddressZ_Some extends Option_SocketAddressZ {
	public some: SocketAddress;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_SocketAddressZ_Some_get_some(ptr);
		const some_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_SocketAddressZ of type None */
export class Option_SocketAddressZ_None extends Option_SocketAddressZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
