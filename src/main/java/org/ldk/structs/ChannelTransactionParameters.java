package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Per-channel data used to build transactions in conjunction with the per-commitment data (CommitmentTransaction).
 * The fields are organized by holder/counterparty.
 * 
 * Normally, this is converted to the broadcaster/countersignatory-organized DirectedChannelTransactionParameters
 * before use, via the as_holder_broadcastable and as_counterparty_broadcastable functions.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelTransactionParameters extends CommonBase {
	ChannelTransactionParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelTransactionParameters_free(ptr); }
	}

	/**
	 * Holder public keys
	 */
	public ChannelPublicKeys get_holder_pubkeys() {
		long ret = bindings.ChannelTransactionParameters_get_holder_pubkeys(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelPublicKeys(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Holder public keys
	 */
	public void set_holder_pubkeys(ChannelPublicKeys val) {
		bindings.ChannelTransactionParameters_set_holder_pubkeys(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	/**
	 * The contest delay selected by the holder, which applies to counterparty-broadcast transactions
	 */
	public short get_holder_selected_contest_delay() {
		short ret = bindings.ChannelTransactionParameters_get_holder_selected_contest_delay(this.ptr);
		return ret;
	}

	/**
	 * The contest delay selected by the holder, which applies to counterparty-broadcast transactions
	 */
	public void set_holder_selected_contest_delay(short val) {
		bindings.ChannelTransactionParameters_set_holder_selected_contest_delay(this.ptr, val);
	}

	/**
	 * Whether the holder is the initiator of this channel.
	 * This is an input to the commitment number obscure factor computation.
	 */
	public boolean get_is_outbound_from_holder() {
		boolean ret = bindings.ChannelTransactionParameters_get_is_outbound_from_holder(this.ptr);
		return ret;
	}

	/**
	 * Whether the holder is the initiator of this channel.
	 * This is an input to the commitment number obscure factor computation.
	 */
	public void set_is_outbound_from_holder(boolean val) {
		bindings.ChannelTransactionParameters_set_is_outbound_from_holder(this.ptr, val);
	}

	/**
	 * The late-bound counterparty channel transaction parameters.
	 * These parameters are populated at the point in the protocol where the counterparty provides them.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public CounterpartyChannelTransactionParameters get_counterparty_parameters() {
		long ret = bindings.ChannelTransactionParameters_get_counterparty_parameters(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		CounterpartyChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new CounterpartyChannelTransactionParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The late-bound counterparty channel transaction parameters.
	 * These parameters are populated at the point in the protocol where the counterparty provides them.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_counterparty_parameters(@Nullable CounterpartyChannelTransactionParameters val) {
		bindings.ChannelTransactionParameters_set_counterparty_parameters(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	/**
	 * The late-bound funding outpoint
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public OutPoint get_funding_outpoint() {
		long ret = bindings.ChannelTransactionParameters_get_funding_outpoint(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new OutPoint(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The late-bound funding outpoint
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_funding_outpoint(@Nullable OutPoint val) {
		bindings.ChannelTransactionParameters_set_funding_outpoint(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	/**
	 * Constructs a new ChannelTransactionParameters given each field
	 */
	public static ChannelTransactionParameters of(ChannelPublicKeys holder_pubkeys_arg, short holder_selected_contest_delay_arg, boolean is_outbound_from_holder_arg, CounterpartyChannelTransactionParameters counterparty_parameters_arg, OutPoint funding_outpoint_arg) {
		long ret = bindings.ChannelTransactionParameters_new(holder_pubkeys_arg == null ? 0 : holder_pubkeys_arg.ptr & ~1, holder_selected_contest_delay_arg, is_outbound_from_holder_arg, counterparty_parameters_arg == null ? 0 : counterparty_parameters_arg.ptr & ~1, funding_outpoint_arg == null ? 0 : funding_outpoint_arg.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelTransactionParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the ChannelTransactionParameters
	 */
	public ChannelTransactionParameters clone() {
		long ret = bindings.ChannelTransactionParameters_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelTransactionParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Whether the late bound parameters are populated.
	 */
	public boolean is_populated() {
		boolean ret = bindings.ChannelTransactionParameters_is_populated(this.ptr);
		return ret;
	}

	/**
	 * Convert the holder/counterparty parameters to broadcaster/countersignatory-organized parameters,
	 * given that the holder is the broadcaster.
	 * 
	 * self.is_populated() must be true before calling this function.
	 */
	public DirectedChannelTransactionParameters as_holder_broadcastable() {
		long ret = bindings.ChannelTransactionParameters_as_holder_broadcastable(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		DirectedChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new DirectedChannelTransactionParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Convert the holder/counterparty parameters to broadcaster/countersignatory-organized parameters,
	 * given that the counterparty is the broadcaster.
	 * 
	 * self.is_populated() must be true before calling this function.
	 */
	public DirectedChannelTransactionParameters as_counterparty_broadcastable() {
		long ret = bindings.ChannelTransactionParameters_as_counterparty_broadcastable(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		DirectedChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new DirectedChannelTransactionParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelTransactionParameters object into a byte array which can be read by ChannelTransactionParameters_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelTransactionParameters_write(this.ptr);
		return ret;
	}

	/**
	 * Read a ChannelTransactionParameters from a byte array, created by ChannelTransactionParameters_write
	 */
	public static Result_ChannelTransactionParametersDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelTransactionParameters_read(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_ChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
