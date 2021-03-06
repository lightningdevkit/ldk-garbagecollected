
            
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
		bindings.DataLossProtect_set_your_last_per_commitment_secret(this.ptr, val);
	}

	public Uint8Array get_my_current_per_commitment_point() {
		Uint8Array ret = bindings.DataLossProtect_get_my_current_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_my_current_per_commitment_point(Uint8Array val) {
		bindings.DataLossProtect_set_my_current_per_commitment_point(this.ptr, val);
	}

	public static DataLossProtect constructor_new(Uint8Array your_last_per_commitment_secret_arg, Uint8Array my_current_per_commitment_point_arg) {
		number ret = bindings.DataLossProtect_new(your_last_per_commitment_secret_arg, my_current_per_commitment_point_arg);
		const ret_hu_conv: DataLossProtect = new DataLossProtect(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public DataLossProtect clone() {
		number ret = bindings.DataLossProtect_clone(this.ptr);
		const ret_hu_conv: DataLossProtect = new DataLossProtect(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
