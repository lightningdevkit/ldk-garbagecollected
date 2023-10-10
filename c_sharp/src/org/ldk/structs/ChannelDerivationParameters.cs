using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The parameters required to derive a channel signer via [`SignerProvider`].
 */
public class ChannelDerivationParameters : CommonBase {
	internal ChannelDerivationParameters(object _dummy, long ptr) : base(ptr) { }
	~ChannelDerivationParameters() {
		if (ptr != 0) { bindings.ChannelDerivationParameters_free(ptr); }
	}

	/**
	 * The value in satoshis of the channel we're attempting to spend the anchor output of.
	 */
	public long get_value_satoshis() {
		long ret = bindings.ChannelDerivationParameters_get_value_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The value in satoshis of the channel we're attempting to spend the anchor output of.
	 */
	public void set_value_satoshis(long val) {
		bindings.ChannelDerivationParameters_set_value_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The unique identifier to re-derive the signer for the associated channel.
	 */
	public byte[] get_keys_id() {
		byte[] ret = bindings.ChannelDerivationParameters_get_keys_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The unique identifier to re-derive the signer for the associated channel.
	 */
	public void set_keys_id(byte[] val) {
		bindings.ChannelDerivationParameters_set_keys_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The necessary channel parameters that need to be provided to the re-derived signer through
	 * [`ChannelSigner::provide_channel_parameters`].
	 * 
	 * [`ChannelSigner::provide_channel_parameters`]: crate::sign::ChannelSigner::provide_channel_parameters
	 */
	public ChannelTransactionParameters get_transaction_parameters() {
		long ret = bindings.ChannelDerivationParameters_get_transaction_parameters(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The necessary channel parameters that need to be provided to the re-derived signer through
	 * [`ChannelSigner::provide_channel_parameters`].
	 * 
	 * [`ChannelSigner::provide_channel_parameters`]: crate::sign::ChannelSigner::provide_channel_parameters
	 */
	public void set_transaction_parameters(org.ldk.structs.ChannelTransactionParameters val) {
		bindings.ChannelDerivationParameters_set_transaction_parameters(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new ChannelDerivationParameters given each field
	 */
	public static ChannelDerivationParameters of(long value_satoshis_arg, byte[] keys_id_arg, org.ldk.structs.ChannelTransactionParameters transaction_parameters_arg) {
		long ret = bindings.ChannelDerivationParameters_new(value_satoshis_arg, InternalUtils.check_arr_len(keys_id_arg, 32), transaction_parameters_arg == null ? 0 : transaction_parameters_arg.ptr);
		GC.KeepAlive(value_satoshis_arg);
		GC.KeepAlive(keys_id_arg);
		GC.KeepAlive(transaction_parameters_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelDerivationParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelDerivationParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(transaction_parameters_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelDerivationParameters_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelDerivationParameters
	 */
	public ChannelDerivationParameters clone() {
		long ret = bindings.ChannelDerivationParameters_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelDerivationParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelDerivationParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelDerivationParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ChannelDerivationParameters b) {
		bool ret = bindings.ChannelDerivationParameters_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ChannelDerivationParameters)) return false;
		return this.eq((ChannelDerivationParameters)o);
	}
}
} } }
