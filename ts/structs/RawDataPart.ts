
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class RawDataPart extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.RawDataPart_free(this.ptr);
                    }
                }
	public PositiveTimestamp get_timestamp() {
		number ret = bindings.RawDataPart_get_timestamp(this.ptr);
		const ret_hu_conv: PositiveTimestamp = new PositiveTimestamp(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_timestamp(PositiveTimestamp val) {
		bindings.RawDataPart_set_timestamp(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public RawDataPart clone() {
		number ret = bindings.RawDataPart_clone(this.ptr);
		const ret_hu_conv: RawDataPart = new RawDataPart(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
