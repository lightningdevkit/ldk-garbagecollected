package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class KeysManager extends CommonBase {
	KeysManager(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.KeysManager_free(ptr); }
	}

	public static KeysManager constructor_new(byte[] seed, LDKNetwork network, long starting_time_secs, int starting_time_nanos) {
		long ret = bindings.KeysManager_new(seed, network, starting_time_secs, starting_time_nanos);
		KeysManager ret_hu_conv = new KeysManager(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public InMemoryChannelKeys derive_channel_keys(long channel_value_satoshis, long params_1, long params_2) {
		long ret = bindings.KeysManager_derive_channel_keys(this.ptr, channel_value_satoshis, params_1, params_2);
		InMemoryChannelKeys ret_hu_conv = new InMemoryChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public KeysInterface as_KeysInterface() {
		long ret = bindings.KeysManager_as_KeysInterface(this.ptr);
		KeysInterface ret_hu_conv = new KeysInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
