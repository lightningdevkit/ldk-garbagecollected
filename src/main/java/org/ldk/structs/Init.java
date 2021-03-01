package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Init extends CommonBase {
	Init(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Init_free(ptr); }
	}

	public InitFeatures get_features() {
		long ret = bindings.Init_get_features(this.ptr);
		InitFeatures ret_hu_conv = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_features(InitFeatures val) {
		bindings.Init_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static Init constructor_new(InitFeatures features_arg) {
		long ret = bindings.Init_new(features_arg == null ? 0 : features_arg.ptr & ~1);
		Init ret_hu_conv = new Init(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(features_arg);
		return ret_hu_conv;
	}

	public Init clone() {
		long ret = bindings.Init_clone(this.ptr);
		Init ret_hu_conv = new Init(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.Init_write(this.ptr);
		return ret;
	}

	public static Result_InitDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.Init_read(ser);
		Result_InitDecodeErrorZ ret_hu_conv = Result_InitDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
