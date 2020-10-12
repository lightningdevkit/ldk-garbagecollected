package org.ldk.structs;

import org.ldk.impl.bindings;

public class KeysInterface extends CommonBase {
	KeysInterface(Object _dummy, long ptr) { super(ptr); }
	public KeysInterface(bindings.LDKKeysInterface arg) {
		super(bindings.LDKKeysInterface_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.KeysInterface_free(ptr); super.finalize();
	}

}
