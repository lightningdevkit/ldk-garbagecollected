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

	public static KeysManager constructor_new(byte[] seed, long starting_time_secs, int starting_time_nanos) {
		long ret = bindings.KeysManager_new(seed, starting_time_secs, starting_time_nanos);
		KeysManager ret_hu_conv = new KeysManager(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public InMemorySigner derive_channel_keys(long channel_value_satoshis, byte[] params) {
		long ret = bindings.KeysManager_derive_channel_keys(this.ptr, channel_value_satoshis, params);
		InMemorySigner ret_hu_conv = new InMemorySigner(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Result_TransactionNoneZ spend_spendable_outputs(SpendableOutputDescriptor[] descriptors, TxOut[] outputs, byte[] change_destination_script, int feerate_sat_per_1000_weight) {
		long ret = bindings.KeysManager_spend_spendable_outputs(this.ptr, Arrays.stream(descriptors).mapToLong(descriptors_conv_27 -> descriptors_conv_27.ptr).toArray(), Arrays.stream(outputs).mapToLong(outputs_conv_7 -> outputs_conv_7.ptr).toArray(), change_destination_script, feerate_sat_per_1000_weight);
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		/* TODO 2 SpendableOutputDescriptor  */;
		/* TODO 2 TxOut  */;
		return ret_hu_conv;
	}

	public KeysInterface as_KeysInterface() {
		long ret = bindings.KeysManager_as_KeysInterface(this.ptr);
		KeysInterface ret_hu_conv = new KeysInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
