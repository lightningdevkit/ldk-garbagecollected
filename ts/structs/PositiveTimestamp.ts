
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class PositiveTimestamp extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.PositiveTimestamp_free(this.ptr);
                    }
                }
	public PositiveTimestamp clone() {
		number ret = bindings.PositiveTimestamp_clone(this.ptr);
		const ret_hu_conv: PositiveTimestamp = new PositiveTimestamp(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static Result_PositiveTimestampCreationErrorZ constructor_from_unix_timestamp(number unix_seconds) {
		number ret = bindings.PositiveTimestamp_from_unix_timestamp(unix_seconds);
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PositiveTimestampCreationErrorZ constructor_from_system_time(number time) {
		number ret = bindings.PositiveTimestamp_from_system_time(time);
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public number as_unix_timestamp() {
		number ret = bindings.PositiveTimestamp_as_unix_timestamp(this.ptr);
		return ret;
	}

	public number as_time() {
		number ret = bindings.PositiveTimestamp_as_time(this.ptr);
		return ret;
	}

}
