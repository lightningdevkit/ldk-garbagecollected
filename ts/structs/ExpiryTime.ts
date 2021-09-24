
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ExpiryTime extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ExpiryTime_free(this.ptr);
                    }
                }
	public ExpiryTime clone() {
		number ret = bindings.ExpiryTime_clone(this.ptr);
		const ret_hu_conv: ExpiryTime = new ExpiryTime(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.ExpiryTime_hash(this.ptr);
		return ret;
	}

	public boolean eq(ExpiryTime b) {
		boolean ret = bindings.ExpiryTime_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public static Result_ExpiryTimeCreationErrorZ constructor_from_seconds(number seconds) {
		number ret = bindings.ExpiryTime_from_seconds(seconds);
		Result_ExpiryTimeCreationErrorZ ret_hu_conv = Result_ExpiryTimeCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ExpiryTimeCreationErrorZ constructor_from_duration(number duration) {
		number ret = bindings.ExpiryTime_from_duration(duration);
		Result_ExpiryTimeCreationErrorZ ret_hu_conv = Result_ExpiryTimeCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public number as_seconds() {
		number ret = bindings.ExpiryTime_as_seconds(this.ptr);
		return ret;
	}

	public number as_duration() {
		number ret = bindings.ExpiryTime_as_duration(this.ptr);
		return ret;
	}

}
