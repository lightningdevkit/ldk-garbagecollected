
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_BlockHashChannelMonitorZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_BlockHashChannelMonitorZ_free(this.ptr);
                    }
                }
	public Uint8Array get_a() {
		Uint8Array ret = bindings.C2Tuple_BlockHashChannelMonitorZ_get_a(this.ptr);
		return ret;
	}

	public ChannelMonitor get_b() {
		number ret = bindings.C2Tuple_BlockHashChannelMonitorZ_get_b(this.ptr);
		const ret_hu_conv: ChannelMonitor = new ChannelMonitor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public TwoTuple_BlockHashChannelMonitorZ clone() {
		number ret = bindings.C2Tuple_BlockHashChannelMonitorZ_clone(this.ptr);
		TwoTuple_BlockHashChannelMonitorZ ret_hu_conv = new TwoTuple_BlockHashChannelMonitorZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_BlockHashChannelMonitorZ constructor_new(Uint8Array a, ChannelMonitor b) {
		number ret = bindings.C2Tuple_BlockHashChannelMonitorZ_new(a, b == null ? 0 : b.ptr & ~1);
		TwoTuple_BlockHashChannelMonitorZ ret_hu_conv = new TwoTuple_BlockHashChannelMonitorZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(b);
		return ret_hu_conv;
	}

}
