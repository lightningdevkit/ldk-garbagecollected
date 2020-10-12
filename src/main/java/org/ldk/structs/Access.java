package org.ldk.structs;

import org.ldk.impl.bindings;

public class Access extends CommonBase {
	Access(Object _dummy, long ptr) { super(ptr); }
	public Access(bindings.LDKAccess arg) {
		super(bindings.LDKAccess_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.Access_free(ptr); super.finalize();
	}

}
