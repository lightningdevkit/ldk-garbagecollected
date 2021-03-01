
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class KeysManager extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.KeysManager_free(this.ptr);
                    }
                }
	public static KeysManager constructor_new(Uint8Array seed, number starting_time_secs, number starting_time_nanos) {
		number ret = bindings.KeysManager_new(seed, starting_time_secs, starting_time_nanos);
		const ret_hu_conv: KeysManager = new KeysManager(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public InMemorySigner derive_channel_keys(number channel_value_satoshis, Uint8Array params) {
		number ret = bindings.KeysManager_derive_channel_keys(this.ptr, channel_value_satoshis, params);
		const ret_hu_conv: InMemorySigner = new InMemorySigner(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Result_TransactionNoneZ spend_spendable_outputs(SpendableOutputDescriptor[] descriptors, TxOut[] outputs, Uint8Array change_destination_script, number feerate_sat_per_1000_weight) {
		number ret = bindings.KeysManager_spend_spendable_outputs(this.ptr, Arrays.stream(descriptors).map(descriptors_conv_27 -> descriptors_conv_27.ptr).toArray(number[]::new), Arrays.stream(outputs).map(outputs_conv_7 -> outputs_conv_7.ptr).toArray(number[]::new), change_destination_script, feerate_sat_per_1000_weight);
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		/* TODO 2 SpendableOutputDescriptor  */;
		/* TODO 2 TxOut  */;
		return ret_hu_conv;
	}

	public KeysInterface as_KeysInterface() {
		number ret = bindings.KeysManager_as_KeysInterface(this.ptr);
		KeysInterface ret_hu_conv = new KeysInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
