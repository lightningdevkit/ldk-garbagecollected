
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NetAddressu8Z extends CommonBase {
	private Result_NetAddressu8Z(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NetAddressu8Z_free(ptr); } super.finalize();
	}

	static Result_NetAddressu8Z constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NetAddressu8Z_result_ok(ptr)) {
			return new Result_NetAddressu8Z_OK(null, ptr);
		} else {
			return new Result_NetAddressu8Z_Err(null, ptr);
		}
	}
	public static final class Result_NetAddressu8Z_OK extends Result_NetAddressu8Z {
		public final NetAddress res;
		private Result_NetAddressu8Z_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			uint32_t res = bindings.LDKCResult_NetAddressu8Z_get_ok(ptr);
			NetAddress res_hu_conv = NetAddress.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_NetAddressu8Z_OK(NetAddress res) {
			this(null, bindings.CResult_NetAddressu8Z_ok(res.ptr));
		}
	}

	public static final class Result_NetAddressu8Z_Err extends Result_NetAddressu8Z {
		public final byte err;
		private Result_NetAddressu8Z_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_NetAddressu8Z_get_err(ptr);
		}
		public Result_NetAddressu8Z_Err(byte err) {
			this(null, bindings.CResult_NetAddressu8Z_err(err));
		}
	}
}
