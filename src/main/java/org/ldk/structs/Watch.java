package org.ldk.structs;

import org.ldk.impl.bindings;

public class Watch extends CommonBase {
	Watch(Object _dummy, long ptr) { super(ptr); }
	public Watch(bindings.LDKWatch arg) {
		super(bindings.LDKWatch_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.Watch_free(ptr); super.finalize();
	}

}
