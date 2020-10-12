package org.ldk.structs;

import org.ldk.impl.bindings;

public class ChannelKeys extends CommonBase {
	ChannelKeys(Object _dummy, long ptr) { super(ptr); }
	public ChannelKeys(bindings.LDKChannelKeys arg) {
		super(bindings.LDKChannelKeys_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelKeys_free(ptr); super.finalize();
	}

}
