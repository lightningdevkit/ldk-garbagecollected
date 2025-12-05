
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::routing::gossip::NodeAnnouncementInfo or not
 */
export class Option_NodeAnnouncementInfoZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_NodeAnnouncementInfoZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_NodeAnnouncementInfoZ {
		const raw_ty: number = bindings.LDKCOption_NodeAnnouncementInfoZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_NodeAnnouncementInfoZ_Some(ptr);
			case 1: return new Option_NodeAnnouncementInfoZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_NodeAnnouncementInfoZ containing a crate::lightning::routing::gossip::NodeAnnouncementInfo
	 */
	public static constructor_some(o: NodeAnnouncementInfo): Option_NodeAnnouncementInfoZ {
		const ret: bigint = bindings.COption_NodeAnnouncementInfoZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_NodeAnnouncementInfoZ = Option_NodeAnnouncementInfoZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_NodeAnnouncementInfoZ containing nothing
	 */
	public static constructor_none(): Option_NodeAnnouncementInfoZ {
		const ret: bigint = bindings.COption_NodeAnnouncementInfoZ_none();
		const ret_hu_conv: Option_NodeAnnouncementInfoZ = Option_NodeAnnouncementInfoZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_NodeAnnouncementInfoZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_NodeAnnouncementInfoZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_NodeAnnouncementInfoZ {
		const ret: bigint = bindings.COption_NodeAnnouncementInfoZ_clone(this.ptr);
		const ret_hu_conv: Option_NodeAnnouncementInfoZ = Option_NodeAnnouncementInfoZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_NodeAnnouncementInfoZ of type Some */
export class Option_NodeAnnouncementInfoZ_Some extends Option_NodeAnnouncementInfoZ {
	public some: NodeAnnouncementInfo;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_NodeAnnouncementInfoZ_Some_get_some(ptr);
		const some_hu_conv: NodeAnnouncementInfo = NodeAnnouncementInfo.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_NodeAnnouncementInfoZ of type None */
export class Option_NodeAnnouncementInfoZ_None extends Option_NodeAnnouncementInfoZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
