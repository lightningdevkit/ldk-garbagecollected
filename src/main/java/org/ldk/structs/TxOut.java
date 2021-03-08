package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class TxOut extends CommonBase{
	TxOut(java.lang.Object _dummy, long ptr) { super(ptr); }
	long to_c_ptr() { return 0; }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxOut_free(ptr); }
	}
}