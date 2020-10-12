package org.ldk.structs;

import org.ldk.impl.bindings;

public class SocketDescriptor extends CommonBase {
	SocketDescriptor(Object _dummy, long ptr) { super(ptr); }
	public SocketDescriptor(bindings.LDKSocketDescriptor arg) {
		super(bindings.LDKSocketDescriptor_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.SocketDescriptor_free(ptr); super.finalize();
	}

}
