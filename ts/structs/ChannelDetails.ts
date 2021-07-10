
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelDetails extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelDetails_free(this.ptr);
                    }
                }
	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.ChannelDetails_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.ChannelDetails_set_channel_id(this.ptr, val);
	}

	public ChannelCounterparty get_counterparty() {
		number ret = bindings.ChannelDetails_get_counterparty(this.ptr);
		const ret_hu_conv: ChannelCounterparty = new ChannelCounterparty(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_counterparty(ChannelCounterparty val) {
		bindings.ChannelDetails_set_counterparty(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public OutPoint get_funding_txo() {
		number ret = bindings.ChannelDetails_get_funding_txo(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_funding_txo(OutPoint val) {
		bindings.ChannelDetails_set_funding_txo(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public Option_u64Z get_short_channel_id() {
		number ret = bindings.ChannelDetails_get_short_channel_id(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_short_channel_id(Option_u64Z val) {
		bindings.ChannelDetails_set_short_channel_id(this.ptr, val.ptr);
	}

	public number get_channel_value_satoshis() {
		number ret = bindings.ChannelDetails_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	public void set_channel_value_satoshis(number val) {
		bindings.ChannelDetails_set_channel_value_satoshis(this.ptr, val);
	}

	public Option_u64Z get_unspendable_punishment_reserve() {
		number ret = bindings.ChannelDetails_get_unspendable_punishment_reserve(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_unspendable_punishment_reserve(Option_u64Z val) {
		bindings.ChannelDetails_set_unspendable_punishment_reserve(this.ptr, val.ptr);
	}

	public number get_user_id() {
		number ret = bindings.ChannelDetails_get_user_id(this.ptr);
		return ret;
	}

	public void set_user_id(number val) {
		bindings.ChannelDetails_set_user_id(this.ptr, val);
	}

	public number get_outbound_capacity_msat() {
		number ret = bindings.ChannelDetails_get_outbound_capacity_msat(this.ptr);
		return ret;
	}

	public void set_outbound_capacity_msat(number val) {
		bindings.ChannelDetails_set_outbound_capacity_msat(this.ptr, val);
	}

	public number get_inbound_capacity_msat() {
		number ret = bindings.ChannelDetails_get_inbound_capacity_msat(this.ptr);
		return ret;
	}

	public void set_inbound_capacity_msat(number val) {
		bindings.ChannelDetails_set_inbound_capacity_msat(this.ptr, val);
	}

	public Option_u32Z get_confirmations_required() {
		number ret = bindings.ChannelDetails_get_confirmations_required(this.ptr);
		Option_u32Z ret_hu_conv = Option_u32Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_confirmations_required(Option_u32Z val) {
		bindings.ChannelDetails_set_confirmations_required(this.ptr, val.ptr);
	}

	public Option_u16Z get_force_close_spend_delay() {
		number ret = bindings.ChannelDetails_get_force_close_spend_delay(this.ptr);
		Option_u16Z ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_force_close_spend_delay(Option_u16Z val) {
		bindings.ChannelDetails_set_force_close_spend_delay(this.ptr, val.ptr);
	}

	public boolean get_is_outbound() {
		boolean ret = bindings.ChannelDetails_get_is_outbound(this.ptr);
		return ret;
	}

	public void set_is_outbound(boolean val) {
		bindings.ChannelDetails_set_is_outbound(this.ptr, val);
	}

	public boolean get_is_funding_locked() {
		boolean ret = bindings.ChannelDetails_get_is_funding_locked(this.ptr);
		return ret;
	}

	public void set_is_funding_locked(boolean val) {
		bindings.ChannelDetails_set_is_funding_locked(this.ptr, val);
	}

	public boolean get_is_usable() {
		boolean ret = bindings.ChannelDetails_get_is_usable(this.ptr);
		return ret;
	}

	public void set_is_usable(boolean val) {
		bindings.ChannelDetails_set_is_usable(this.ptr, val);
	}

	public boolean get_is_public() {
		boolean ret = bindings.ChannelDetails_get_is_public(this.ptr);
		return ret;
	}

	public void set_is_public(boolean val) {
		bindings.ChannelDetails_set_is_public(this.ptr, val);
	}

	public static ChannelDetails constructor_new(Uint8Array channel_id_arg, ChannelCounterparty counterparty_arg, OutPoint funding_txo_arg, Option_u64Z short_channel_id_arg, number channel_value_satoshis_arg, Option_u64Z unspendable_punishment_reserve_arg, number user_id_arg, number outbound_capacity_msat_arg, number inbound_capacity_msat_arg, Option_u32Z confirmations_required_arg, Option_u16Z force_close_spend_delay_arg, boolean is_outbound_arg, boolean is_funding_locked_arg, boolean is_usable_arg, boolean is_public_arg) {
		number ret = bindings.ChannelDetails_new(channel_id_arg, counterparty_arg == null ? 0 : counterparty_arg.ptr & ~1, funding_txo_arg == null ? 0 : funding_txo_arg.ptr & ~1, short_channel_id_arg.ptr, channel_value_satoshis_arg, unspendable_punishment_reserve_arg.ptr, user_id_arg, outbound_capacity_msat_arg, inbound_capacity_msat_arg, confirmations_required_arg.ptr, force_close_spend_delay_arg.ptr, is_outbound_arg, is_funding_locked_arg, is_usable_arg, is_public_arg);
		const ret_hu_conv: ChannelDetails = new ChannelDetails(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(counterparty_arg);
		ret_hu_conv.ptrs_to.add(funding_txo_arg);
		return ret_hu_conv;
	}

	public ChannelDetails clone() {
		number ret = bindings.ChannelDetails_clone(this.ptr);
		const ret_hu_conv: ChannelDetails = new ChannelDetails(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
