
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class CounterpartyChannelTransactionParameters extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.CounterpartyChannelTransactionParameters_free(this.ptr);
                    }
                }
	public CounterpartyChannelTransactionParameters clone() {
		number ret = bindings.CounterpartyChannelTransactionParameters_clone(this.ptr);
		const ret_hu_conv: CounterpartyChannelTransactionParameters = new CounterpartyChannelTransactionParameters(null, ret);
		return ret_hu_conv;
	}

	public ChannelPublicKeys get_pubkeys() {
		number ret = bindings.CounterpartyChannelTransactionParameters_get_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

	public void set_pubkeys(ChannelPublicKeys val) {
		bindings.CounterpartyChannelTransactionParameters_set_pubkeys(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public number get_selected_contest_delay() {
		number ret = bindings.CounterpartyChannelTransactionParameters_get_selected_contest_delay(this.ptr);
		return ret;
	}

	public void set_selected_contest_delay(number val) {
		bindings.CounterpartyChannelTransactionParameters_set_selected_contest_delay(this.ptr, val);
	}

	public static CounterpartyChannelTransactionParameters constructor_new(ChannelPublicKeys pubkeys_arg, number selected_contest_delay_arg) {
		number ret = bindings.CounterpartyChannelTransactionParameters_new(pubkeys_arg == null ? 0 : pubkeys_arg.ptr & ~1, selected_contest_delay_arg);
		const ret_hu_conv: CounterpartyChannelTransactionParameters = new CounterpartyChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(pubkeys_arg);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.CounterpartyChannelTransactionParameters_write(this.ptr);
		return ret;
	}

	public static CounterpartyChannelTransactionParameters constructor_read(Uint8Array ser) {
		number ret = bindings.CounterpartyChannelTransactionParameters_read(ser);
		const ret_hu_conv: CounterpartyChannelTransactionParameters = new CounterpartyChannelTransactionParameters(null, ret);
		return ret_hu_conv;
	}

}
