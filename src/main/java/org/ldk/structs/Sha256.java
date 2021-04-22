package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * SHA-256 hash
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Sha256 extends CommonBase {
	Sha256(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Sha256_free(ptr); }
	}

	/**
	 * Creates a copy of the Sha256
	 */
	public Sha256 clone() {
		long ret = bindings.Sha256_clone(this.ptr);
		Sha256 ret_hu_conv = new Sha256(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
