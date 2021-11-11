
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(this.ptr);
                    }
                }
	public ChannelAnnouncement get_a() {
		number ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(this.ptr);
		const ret_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ChannelUpdate get_b() {
		number ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(this.ptr);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ChannelUpdate get_c() {
		number ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(this.ptr);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone_ptr(this.ptr);
		return ret;
	}

	public ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ clone() {
		number ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone(this.ptr);
		ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ ret_hu_conv = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ constructor_new(ChannelAnnouncement a, ChannelUpdate b, ChannelUpdate c) {
		number ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a == null ? 0 : a.ptr & ~1, b == null ? 0 : b.ptr & ~1, c == null ? 0 : c.ptr & ~1);
		ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ ret_hu_conv = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
