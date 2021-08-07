package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * An error in decoding a message or struct.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DecodeError extends CommonBase {
	DecodeError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DecodeError_free(ptr); }
	}

	/**
	 * Creates a copy of the DecodeError
	 */
	public DecodeError clone() {
		long ret = bindings.DecodeError_clone(this.ptr);
		if (ret < 1024) { return null; }
		DecodeError ret_hu_conv = new DecodeError(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
