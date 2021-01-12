
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class RoutingFees extends CommonBase {
	RoutingFees(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RoutingFees_free(ptr); }
	}

	public RoutingFees clone() {
		uint32_t ret = bindings.RoutingFees_clone(this.ptr);
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		return ret_hu_conv;
	}

	public int get_base_msat() {
		int ret = bindings.RoutingFees_get_base_msat(this.ptr);
		return ret;
	}

	public void set_base_msat(int val) {
		bindings.RoutingFees_set_base_msat(this.ptr, val);
	}

	public int get_proportional_millionths() {
		int ret = bindings.RoutingFees_get_proportional_millionths(this.ptr);
		return ret;
	}

	public void set_proportional_millionths(int val) {
		bindings.RoutingFees_set_proportional_millionths(this.ptr, val);
	}

	public static RoutingFees constructor_new(int base_msat_arg, int proportional_millionths_arg) {
		uint32_t ret = bindings.RoutingFees_new(base_msat_arg, proportional_millionths_arg);
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		return ret_hu_conv;
	}

	public static Result_RoutingFeesDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.RoutingFees_read(ser);
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.RoutingFees_write(this.ptr);
		return ret;
	}

}
