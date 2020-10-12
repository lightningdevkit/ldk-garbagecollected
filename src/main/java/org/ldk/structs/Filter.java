package org.ldk.structs;

import org.ldk.impl.bindings;

public class Filter extends CommonBase {
	Filter(Object _dummy, long ptr) { super(ptr); }
	public Filter(bindings.LDKFilter arg) {
		super(bindings.LDKFilter_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.Filter_free(ptr); super.finalize();
	}

}
