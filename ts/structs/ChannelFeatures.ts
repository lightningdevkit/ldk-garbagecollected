
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelFeatures extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelFeatures_free(this.ptr);
                    }
                }
	public boolean eq(ChannelFeatures b) {
		boolean ret = bindings.ChannelFeatures_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.ChannelFeatures_clone_ptr(this.ptr);
		return ret;
	}

	public ChannelFeatures clone() {
		number ret = bindings.ChannelFeatures_clone(this.ptr);
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static ChannelFeatures constructor_empty() {
		number ret = bindings.ChannelFeatures_empty();
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ChannelFeatures constructor_known() {
		number ret = bindings.ChannelFeatures_known();
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public boolean requires_unknown_bits() {
		boolean ret = bindings.ChannelFeatures_requires_unknown_bits(this.ptr);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelFeatures_write(this.ptr);
		return ret;
	}

	public static Result_ChannelFeaturesDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelFeatures_read(ser);
		Result_ChannelFeaturesDecodeErrorZ ret_hu_conv = Result_ChannelFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
