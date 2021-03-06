
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelTransactionParameters extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelTransactionParameters_free(this.ptr);
                    }
                }
	public ChannelPublicKeys get_holder_pubkeys() {
		number ret = bindings.ChannelTransactionParameters_get_holder_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_holder_pubkeys(ChannelPublicKeys val) {
		bindings.ChannelTransactionParameters_set_holder_pubkeys(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public number get_holder_selected_contest_delay() {
		number ret = bindings.ChannelTransactionParameters_get_holder_selected_contest_delay(this.ptr);
		return ret;
	}

	public void set_holder_selected_contest_delay(number val) {
		bindings.ChannelTransactionParameters_set_holder_selected_contest_delay(this.ptr, val);
	}

	public boolean get_is_outbound_from_holder() {
		boolean ret = bindings.ChannelTransactionParameters_get_is_outbound_from_holder(this.ptr);
		return ret;
	}

	public void set_is_outbound_from_holder(boolean val) {
		bindings.ChannelTransactionParameters_set_is_outbound_from_holder(this.ptr, val);
	}

	public CounterpartyChannelTransactionParameters get_counterparty_parameters() {
		number ret = bindings.ChannelTransactionParameters_get_counterparty_parameters(this.ptr);
		const ret_hu_conv: CounterpartyChannelTransactionParameters = new CounterpartyChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_counterparty_parameters(CounterpartyChannelTransactionParameters val) {
		bindings.ChannelTransactionParameters_set_counterparty_parameters(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public OutPoint get_funding_outpoint() {
		number ret = bindings.ChannelTransactionParameters_get_funding_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_funding_outpoint(OutPoint val) {
		bindings.ChannelTransactionParameters_set_funding_outpoint(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static ChannelTransactionParameters constructor_new(ChannelPublicKeys holder_pubkeys_arg, number holder_selected_contest_delay_arg, boolean is_outbound_from_holder_arg, CounterpartyChannelTransactionParameters counterparty_parameters_arg, OutPoint funding_outpoint_arg) {
		number ret = bindings.ChannelTransactionParameters_new(holder_pubkeys_arg == null ? 0 : holder_pubkeys_arg.ptr & ~1, holder_selected_contest_delay_arg, is_outbound_from_holder_arg, counterparty_parameters_arg == null ? 0 : counterparty_parameters_arg.ptr & ~1, funding_outpoint_arg == null ? 0 : funding_outpoint_arg.ptr & ~1);
		const ret_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(holder_pubkeys_arg);
		ret_hu_conv.ptrs_to.add(counterparty_parameters_arg);
		ret_hu_conv.ptrs_to.add(funding_outpoint_arg);
		return ret_hu_conv;
	}

	public ChannelTransactionParameters clone() {
		number ret = bindings.ChannelTransactionParameters_clone(this.ptr);
		const ret_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public boolean is_populated() {
		boolean ret = bindings.ChannelTransactionParameters_is_populated(this.ptr);
		return ret;
	}

	public DirectedChannelTransactionParameters as_holder_broadcastable() {
		number ret = bindings.ChannelTransactionParameters_as_holder_broadcastable(this.ptr);
		const ret_hu_conv: DirectedChannelTransactionParameters = new DirectedChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public DirectedChannelTransactionParameters as_counterparty_broadcastable() {
		number ret = bindings.ChannelTransactionParameters_as_counterparty_broadcastable(this.ptr);
		const ret_hu_conv: DirectedChannelTransactionParameters = new DirectedChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelTransactionParameters_write(this.ptr);
		return ret;
	}

	public static Result_ChannelTransactionParametersDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelTransactionParameters_read(ser);
		Result_ChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_ChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
