
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class DataLossProtect extends CommonBase {
	DataLossProtect(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DataLossProtect_free(ptr); }
	}

	public DataLossProtect clone() {
		uint32_t ret = bindings.DataLossProtect_clone(this.ptr);
		DataLossProtect ret_hu_conv = new DataLossProtect(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_your_last_per_commitment_secret() {
		byte[] ret = bindings.DataLossProtect_get_your_last_per_commitment_secret(this.ptr);
		return ret;
	}

	public void set_your_last_per_commitment_secret(byte[] val) {
		bindings.DataLossProtect_set_your_last_per_commitment_secret(this.ptr, val);
	}

	public byte[] get_my_current_per_commitment_point() {
		byte[] ret = bindings.DataLossProtect_get_my_current_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_my_current_per_commitment_point(byte[] val) {
		bindings.DataLossProtect_set_my_current_per_commitment_point(this.ptr, val);
	}

	public static DataLossProtect constructor_new(byte[] your_last_per_commitment_secret_arg, byte[] my_current_per_commitment_point_arg) {
		uint32_t ret = bindings.DataLossProtect_new(your_last_per_commitment_secret_arg, my_current_per_commitment_point_arg);
		DataLossProtect ret_hu_conv = new DataLossProtect(null, ret);
		return ret_hu_conv;
	}

}
