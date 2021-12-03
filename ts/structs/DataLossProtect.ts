
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class DataLossProtect extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.DataLossProtect_free(this.ptr);
                    }
                }
	public Uint8Array get_your_last_per_commitment_secret() {
		Uint8Array ret = bindings.DataLossProtect_get_your_last_per_commitment_secret(this.ptr);
		return ret;
	}

	public void set_your_last_per_commitment_secret(Uint8Array val) {
		bindings.DataLossProtect_set_your_last_per_commitment_secret(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	public Uint8Array get_my_current_per_commitment_point() {
		Uint8Array ret = bindings.DataLossProtect_get_my_current_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_my_current_per_commitment_point(Uint8Array val) {
		bindings.DataLossProtect_set_my_current_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
	}

	public static DataLossProtect constructor_new(Uint8Array your_last_per_commitment_secret_arg, Uint8Array my_current_per_commitment_point_arg) {
		number ret = bindings.DataLossProtect_new(InternalUtils.check_arr_len(your_last_per_commitment_secret_arg, 32), InternalUtils.check_arr_len(my_current_per_commitment_point_arg, 33));
		const ret_hu_conv: DataLossProtect = new DataLossProtect(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.DataLossProtect_clone_ptr(this.ptr);
		return ret;
	}

	public DataLossProtect clone() {
		number ret = bindings.DataLossProtect_clone(this.ptr);
		const ret_hu_conv: DataLossProtect = new DataLossProtect(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
