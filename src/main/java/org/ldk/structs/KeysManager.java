package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class KeysManager extends CommonBase {
	KeysManager(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.KeysManager_free(ptr); super.finalize();
	}

	public KeysManager(byte[] seed, LDKNetwork network, long starting_time_secs, int starting_time_nanos) {
		super(bindings.KeysManager_new(seed, network, starting_time_secs, starting_time_nanos));
	}

	public InMemoryChannelKeys derive_channel_keys(long channel_value_satoshis, long params_1, long params_2) {
		InMemoryChannelKeys ret = new InMemoryChannelKeys(null, bindings.KeysManager_derive_channel_keys(this.ptr, channel_value_satoshis, params_1, params_2));
		return ret;
	}

	public KeysInterface as_KeysInterface() {
		KeysInterface ret = new KeysInterface(null, bindings.KeysManager_as_KeysInterface(this.ptr));
		ret.ptrs_to.add(this);
		return ret;
	}

}
