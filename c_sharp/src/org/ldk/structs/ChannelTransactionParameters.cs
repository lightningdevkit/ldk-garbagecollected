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
	public org.ldk.structs.ChannelPublicKeys get_holder_pubkeys() {
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
		bindings.ChannelTransactionParameters_set_holder_pubkeys(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	public org.ldk.structs.CounterpartyChannelTransactionParameters get_counterparty_parameters() {
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
	}

	/**
	 * The late-bound funding outpoint
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.OutPoint get_funding_outpoint() {
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
	}

	/**
	 * The parent funding txid for a channel that has been spliced.
	 * 
	 * If a channel was funded with transaction A, and later spliced with transaction B, this field
	 * tracks the txid of transaction A.
	 * 
	 * See [`compute_funding_key_tweak`] and [`ChannelSigner::new_funding_pubkey`] for more context
	 * on how this may be used.
	 * 
	 * [`compute_funding_key_tweak`]: crate::sign::compute_funding_key_tweak
	 * [`ChannelSigner::new_funding_pubkey`]: crate::sign::ChannelSigner::new_funding_pubkey
	 */
	public org.ldk.structs.Option_ThirtyTwoBytesZ get_splice_parent_funding_txid() {
		long ret = bindings.ChannelTransactionParameters_get_splice_parent_funding_txid(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The parent funding txid for a channel that has been spliced.
	 * 
	 * If a channel was funded with transaction A, and later spliced with transaction B, this field
	 * tracks the txid of transaction A.
	 * 
	 * See [`compute_funding_key_tweak`] and [`ChannelSigner::new_funding_pubkey`] for more context
	 * on how this may be used.
	 * 
	 * [`compute_funding_key_tweak`]: crate::sign::compute_funding_key_tweak
	 * [`ChannelSigner::new_funding_pubkey`]: crate::sign::ChannelSigner::new_funding_pubkey
	 */
	public void set_splice_parent_funding_txid(org.ldk.structs.Option_ThirtyTwoBytesZ val) {
		bindings.ChannelTransactionParameters_set_splice_parent_funding_txid(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * This channel's type, as negotiated during channel open. For old objects where this field
	 * wasn't serialized, it will default to static_remote_key at deserialization.
	 */
	public org.ldk.structs.ChannelTypeFeatures get_channel_type_features() {
		long ret = bindings.ChannelTransactionParameters_get_channel_type_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * This channel's type, as negotiated during channel open. For old objects where this field
	 * wasn't serialized, it will default to static_remote_key at deserialization.
	 */
	public void set_channel_type_features(org.ldk.structs.ChannelTypeFeatures val) {
		bindings.ChannelTransactionParameters_set_channel_type_features(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The value locked in the channel, denominated in satoshis.
	 */
	public long get_channel_value_satoshis() {
		long ret = bindings.ChannelTransactionParameters_get_channel_value_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The value locked in the channel, denominated in satoshis.
	 */
	public void set_channel_value_satoshis(long val) {
		bindings.ChannelTransactionParameters_set_channel_value_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ChannelTransactionParameters given each field
	 * 
	 * Note that counterparty_parameters_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that funding_outpoint_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static org.ldk.structs.ChannelTransactionParameters of(org.ldk.structs.ChannelPublicKeys holder_pubkeys_arg, short holder_selected_contest_delay_arg, bool is_outbound_from_holder_arg, org.ldk.structs.CounterpartyChannelTransactionParameters counterparty_parameters_arg, org.ldk.structs.OutPoint funding_outpoint_arg, org.ldk.structs.Option_ThirtyTwoBytesZ splice_parent_funding_txid_arg, org.ldk.structs.ChannelTypeFeatures channel_type_features_arg, long channel_value_satoshis_arg) {
		long ret = bindings.ChannelTransactionParameters_new(holder_pubkeys_arg.ptr, holder_selected_contest_delay_arg, is_outbound_from_holder_arg, counterparty_parameters_arg == null ? 0 : counterparty_parameters_arg.ptr, funding_outpoint_arg == null ? 0 : funding_outpoint_arg.ptr, splice_parent_funding_txid_arg.ptr, channel_type_features_arg.ptr, channel_value_satoshis_arg);
		GC.KeepAlive(holder_pubkeys_arg);
		GC.KeepAlive(holder_selected_contest_delay_arg);
		GC.KeepAlive(is_outbound_from_holder_arg);
		GC.KeepAlive(counterparty_parameters_arg);
		GC.KeepAlive(funding_outpoint_arg);
		GC.KeepAlive(splice_parent_funding_txid_arg);
		GC.KeepAlive(channel_type_features_arg);
		GC.KeepAlive(channel_value_satoshis_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
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
	public org.ldk.structs.ChannelTransactionParameters clone() {
		long ret = bindings.ChannelTransactionParameters_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelTransactionParameters.
	 */
	public long hash() {
		long ret = bindings.ChannelTransactionParameters_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ChannelTransactionParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ChannelTransactionParameters b) {
		bool ret = bindings.ChannelTransactionParameters_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ChannelTransactionParameters)) return false;
		return this.eq((ChannelTransactionParameters)o);
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
	public org.ldk.structs.DirectedChannelTransactionParameters as_holder_broadcastable() {
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
	public org.ldk.structs.DirectedChannelTransactionParameters as_counterparty_broadcastable() {
		long ret = bindings.ChannelTransactionParameters_as_counterparty_broadcastable(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DirectedChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DirectedChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the counterparty's pubkeys.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.ChannelPublicKeys counterparty_pubkeys() {
		long ret = bindings.ChannelTransactionParameters_counterparty_pubkeys(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelPublicKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelTransactionParameters object into a byte array which can be read by ChannelTransactionParameters_read
	 */
	public byte[] write() {
		long ret = bindings.ChannelTransactionParameters_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelTransactionParameters from a byte array, created by ChannelTransactionParameters_write
	 */
	public static org.ldk.structs.Result_ChannelTransactionParametersDecodeErrorZ read(byte[] ser, org.ldk.structs.Option_u64Z arg) {
		long ret = bindings.ChannelTransactionParameters_read(InternalUtils.encodeUint8Array(ser), arg.ptr);
		GC.KeepAlive(ser);
		GC.KeepAlive(arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_ChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
