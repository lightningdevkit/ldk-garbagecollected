package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelTransactionParameters extends CommonBase {
	ChannelTransactionParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelTransactionParameters_free(ptr); }
	}

	public ChannelTransactionParameters clone() {
		long ret = bindings.ChannelTransactionParameters_clone(this.ptr);
		ChannelTransactionParameters ret_hu_conv = new ChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ChannelPublicKeys get_holder_pubkeys() {
		long ret = bindings.ChannelTransactionParameters_get_holder_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_holder_pubkeys(ChannelPublicKeys val) {
		bindings.ChannelTransactionParameters_set_holder_pubkeys(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public short get_holder_selected_contest_delay() {
		short ret = bindings.ChannelTransactionParameters_get_holder_selected_contest_delay(this.ptr);
		return ret;
	}

	public void set_holder_selected_contest_delay(short val) {
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
		long ret = bindings.ChannelTransactionParameters_get_counterparty_parameters(this.ptr);
		CounterpartyChannelTransactionParameters ret_hu_conv = new CounterpartyChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_counterparty_parameters(CounterpartyChannelTransactionParameters val) {
		bindings.ChannelTransactionParameters_set_counterparty_parameters(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public OutPoint get_funding_outpoint() {
		long ret = bindings.ChannelTransactionParameters_get_funding_outpoint(this.ptr);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_funding_outpoint(OutPoint val) {
		bindings.ChannelTransactionParameters_set_funding_outpoint(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static ChannelTransactionParameters constructor_new(ChannelPublicKeys holder_pubkeys_arg, short holder_selected_contest_delay_arg, boolean is_outbound_from_holder_arg, CounterpartyChannelTransactionParameters counterparty_parameters_arg, OutPoint funding_outpoint_arg) {
		long ret = bindings.ChannelTransactionParameters_new(holder_pubkeys_arg == null ? 0 : holder_pubkeys_arg.ptr & ~1, holder_selected_contest_delay_arg, is_outbound_from_holder_arg, counterparty_parameters_arg == null ? 0 : counterparty_parameters_arg.ptr & ~1, funding_outpoint_arg == null ? 0 : funding_outpoint_arg.ptr & ~1);
		ChannelTransactionParameters ret_hu_conv = new ChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(holder_pubkeys_arg);
		ret_hu_conv.ptrs_to.add(counterparty_parameters_arg);
		ret_hu_conv.ptrs_to.add(funding_outpoint_arg);
		return ret_hu_conv;
	}

	public boolean is_populated() {
		boolean ret = bindings.ChannelTransactionParameters_is_populated(this.ptr);
		return ret;
	}

	public DirectedChannelTransactionParameters as_holder_broadcastable() {
		long ret = bindings.ChannelTransactionParameters_as_holder_broadcastable(this.ptr);
		DirectedChannelTransactionParameters ret_hu_conv = new DirectedChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public DirectedChannelTransactionParameters as_counterparty_broadcastable() {
		long ret = bindings.ChannelTransactionParameters_as_counterparty_broadcastable(this.ptr);
		DirectedChannelTransactionParameters ret_hu_conv = new DirectedChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.ChannelTransactionParameters_write(this.ptr);
		return ret;
	}

	public static ChannelTransactionParameters constructor_read(byte[] ser) {
		long ret = bindings.ChannelTransactionParameters_read(ser);
		ChannelTransactionParameters ret_hu_conv = new ChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
