
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelTypeFeatures extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelTypeFeatures_free(this.ptr);
                    }
                }
	public boolean eq(ChannelTypeFeatures b) {
		boolean ret = bindings.ChannelTypeFeatures_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.ChannelTypeFeatures_clone_ptr(this.ptr);
		return ret;
	}

	public ChannelTypeFeatures clone() {
		number ret = bindings.ChannelTypeFeatures_clone(this.ptr);
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static ChannelTypeFeatures constructor_empty() {
		number ret = bindings.ChannelTypeFeatures_empty();
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ChannelTypeFeatures constructor_known() {
		number ret = bindings.ChannelTypeFeatures_known();
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public boolean requires_unknown_bits() {
		boolean ret = bindings.ChannelTypeFeatures_requires_unknown_bits(this.ptr);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelTypeFeatures_write(this.ptr);
		return ret;
	}

	public static Result_ChannelTypeFeaturesDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelTypeFeatures_read(ser);
		Result_ChannelTypeFeaturesDecodeErrorZ ret_hu_conv = Result_ChannelTypeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
