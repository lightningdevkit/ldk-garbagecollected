
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free);
	}

	/**
	 * 
	 */
	public get_a(): ChannelAnnouncement {
		const ret: bigint = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(this.ptr);
		const ret_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): ChannelUpdate {
		const ret: bigint = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(this.ptr);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_c(): ChannelUpdate {
		const ret: bigint = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(this.ptr);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ {
		const ret: bigint = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone(this.ptr);
		const ret_hu_conv: ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ from the contained elements.
	 */
	public static constructor_new(a: ChannelAnnouncement, b: ChannelUpdate, c: ChannelUpdate): ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ {
		const ret: bigint = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b), CommonBase.get_ptr_of(c));
		const ret_hu_conv: ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
