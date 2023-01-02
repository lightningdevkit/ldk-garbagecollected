using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Per-channel data used to build transactions in conjunction with the per-commitment data (CommitmentTransaction).
 * The fields are organized by holder/counterparty.
 * 
 * Normally, this is converted to the broadcaster/countersignatory-organized DirectedChannelTransactionParameters
 * before use, via the as_holder_broadcastable and as_counterparty_broadcastable functions.
 */
public class ChannelTransactionParameters : CommonBase {
	internal ChannelTransactionParameters(object _dummy, long ptr) : base(ptr) { }
	~ChannelTransactionParameters() {
		if (ptr != 0) { bindings.ChannelTransactionParameters_free(ptr); }
	}

	/**
	 * Holder public keys
	 */
	public ChannelPublicKeys get_holder_pubkeys() {
		long ret = bindings.ChannelTransactionParameters_get_holder_pubkeys(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelPublicKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Holder public keys
	 */
	public void set_holder_pubkeys(org.ldk.structs.ChannelPublicKeys val) {
		bindings.ChannelTransactionParameters_set_holder_pubkeys(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The contest delay selected by the holder, which applies to counterparty-broadcast transactions
	 */
	public short get_holder_selected_contest_delay() {
		short ret = bindings.ChannelTransactionParameters_get_holder_selected_contest_delay(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The contest delay selected by the holder, which applies to counterparty-broadcast transactions
	 */
	public void set_holder_selected_contest_delay(short val) {
		bindings.ChannelTransactionParameters_set_holder_selected_contest_delay(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Whether the holder is the initiator of this channel.
	 * This is an input to the commitment number obscure factor computation.
	 */
	public bool get_is_outbound_from_holder() {
		bool ret = bindings.ChannelTransactionParameters_get_is_outbound_from_holder(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether the holder is the initiator of this channel.
	 * This is an input to the commitment number obscure factor computation.
	 */
	public void set_is_outbound_from_holder(bool val) {
		bindings.ChannelTransactionParameters_set_is_outbound_from_holder(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The late-bound counterparty channel transaction parameters.
	 * These parameters are populated at the point in the protocol where the counterparty provides them.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public CounterpartyChannelTransactionParameters get_counterparty_parameters() {
		long ret = bindings.ChannelTransactionParameters_get_counterparty_parameters(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CounterpartyChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CounterpartyChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The late-bound counterparty channel transaction parameters.
	 * These parameters are populated at the point in the protocol where the counterparty provides them.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_counterparty_parameters(org.ldk.structs.CounterpartyChannelTransactionParameters val) {
		bindings.ChannelTransactionParameters_set_counterparty_parameters(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The late-bound funding outpoint
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public OutPoint get_funding_outpoint() {
		long ret = bindings.ChannelTransactionParameters_get_funding_outpoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The late-bound funding outpoint
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_funding_outpoint(org.ldk.structs.OutPoint val) {
		bindings.ChannelTransactionParameters_set_funding_outpoint(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Are anchors (zero fee HTLC transaction variant) used for this channel. Boolean is
	 * serialization backwards-compatible.
	 */
	public COption_NoneZ get_opt_anchors() {
		COption_NoneZ ret = bindings.ChannelTransactionParameters_get_opt_anchors(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Are anchors (zero fee HTLC transaction variant) used for this channel. Boolean is
	 * serialization backwards-compatible.
	 */
	public void set_opt_anchors(COption_NoneZ val) {
		bindings.ChannelTransactionParameters_set_opt_anchors(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Are non-zero-fee anchors are enabled (used in conjuction with opt_anchors)
	 * It is intended merely for backwards compatibility with signers that need it.
	 * There is no support for this feature in LDK channel negotiation.
	 */
	public COption_NoneZ get_opt_non_zero_fee_anchors() {
		COption_NoneZ ret = bindings.ChannelTransactionParameters_get_opt_non_zero_fee_anchors(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Are non-zero-fee anchors are enabled (used in conjuction with opt_anchors)
	 * It is intended merely for backwards compatibility with signers that need it.
	 * There is no support for this feature in LDK channel negotiation.
	 */
	public void set_opt_non_zero_fee_anchors(COption_NoneZ val) {
		bindings.ChannelTransactionParameters_set_opt_non_zero_fee_anchors(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ChannelTransactionParameters given each field
	 */
	public static ChannelTransactionParameters of(org.ldk.structs.ChannelPublicKeys holder_pubkeys_arg, short holder_selected_contest_delay_arg, bool is_outbound_from_holder_arg, org.ldk.structs.CounterpartyChannelTransactionParameters counterparty_parameters_arg, org.ldk.structs.OutPoint funding_outpoint_arg, COption_NoneZ opt_anchors_arg, COption_NoneZ opt_non_zero_fee_anchors_arg) {
		long ret = bindings.ChannelTransactionParameters_new(holder_pubkeys_arg == null ? 0 : holder_pubkeys_arg.ptr, holder_selected_contest_delay_arg, is_outbound_from_holder_arg, counterparty_parameters_arg == null ? 0 : counterparty_parameters_arg.ptr, funding_outpoint_arg == null ? 0 : funding_outpoint_arg.ptr, opt_anchors_arg, opt_non_zero_fee_anchors_arg);
		GC.KeepAlive(holder_pubkeys_arg);
		GC.KeepAlive(holder_selected_contest_delay_arg);
		GC.KeepAlive(is_outbound_from_holder_arg);
		GC.KeepAlive(counterparty_parameters_arg);
		GC.KeepAlive(funding_outpoint_arg);
		GC.KeepAlive(opt_anchors_arg);
		GC.KeepAlive(opt_non_zero_fee_anchors_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(holder_pubkeys_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(counterparty_parameters_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(funding_outpoint_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelTransactionParameters_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelTransactionParameters
	 */
	public ChannelTransactionParameters clone() {
		long ret = bindings.ChannelTransactionParameters_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Whether the late bound parameters are populated.
	 */
	public bool is_populated() {
		bool ret = bindings.ChannelTransactionParameters_is_populated(this.ptr);
		GC.KeepAlive(this);
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
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DirectedChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DirectedChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DirectedChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DirectedChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelTransactionParameters object into a byte array which can be read by ChannelTransactionParameters_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelTransactionParameters_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a ChannelTransactionParameters from a byte array, created by ChannelTransactionParameters_write
	 */
	public static Result_ChannelTransactionParametersDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelTransactionParameters_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_ChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
