package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The parameters required to derive a channel signer via [`SignerProvider`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelDerivationParameters extends CommonBase {
	ChannelDerivationParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelDerivationParameters_free(ptr); }
	}

	/**
	 * The value in satoshis of the channel we're attempting to spend the anchor output of.
	 */
	public long get_value_satoshis() {
		long ret = bindings.ChannelDerivationParameters_get_value_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The value in satoshis of the channel we're attempting to spend the anchor output of.
	 */
	public void set_value_satoshis(long val) {
		bindings.ChannelDerivationParameters_set_value_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The unique identifier to re-derive the signer for the associated channel.
	 */
	public byte[] get_keys_id() {
		byte[] ret = bindings.ChannelDerivationParameters_get_keys_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The unique identifier to re-derive the signer for the associated channel.
	 */
	public void set_keys_id(byte[] val) {
		bindings.ChannelDerivationParameters_set_keys_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The necessary channel parameters that need to be provided to the re-derived signer through
	 * [`ChannelSigner::provide_channel_parameters`].
	 */
	public ChannelTransactionParameters get_transaction_parameters() {
		long ret = bindings.ChannelDerivationParameters_get_transaction_parameters(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The necessary channel parameters that need to be provided to the re-derived signer through
	 * [`ChannelSigner::provide_channel_parameters`].
	 */
	public void set_transaction_parameters(org.ldk.structs.ChannelTransactionParameters val) {
		bindings.ChannelDerivationParameters_set_transaction_parameters(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new ChannelDerivationParameters given each field
	 */
	public static ChannelDerivationParameters of(long value_satoshis_arg, byte[] keys_id_arg, org.ldk.structs.ChannelTransactionParameters transaction_parameters_arg) {
		long ret = bindings.ChannelDerivationParameters_new(value_satoshis_arg, InternalUtils.check_arr_len(keys_id_arg, 32), transaction_parameters_arg == null ? 0 : transaction_parameters_arg.ptr);
		Reference.reachabilityFence(value_satoshis_arg);
		Reference.reachabilityFence(keys_id_arg);
		Reference.reachabilityFence(transaction_parameters_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelDerivationParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelDerivationParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(transaction_parameters_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelDerivationParameters_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelDerivationParameters
	 */
	public ChannelDerivationParameters clone() {
		long ret = bindings.ChannelDerivationParameters_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelDerivationParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelDerivationParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelDerivationParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.ChannelDerivationParameters b) {
		boolean ret = bindings.ChannelDerivationParameters_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ChannelDerivationParameters)) return false;
		return this.eq((ChannelDerivationParameters)o);
	}
	/**
	 * Serialize the ChannelDerivationParameters object into a byte array which can be read by ChannelDerivationParameters_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelDerivationParameters_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ChannelDerivationParameters from a byte array, created by ChannelDerivationParameters_write
	 */
	public static Result_ChannelDerivationParametersDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelDerivationParameters_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelDerivationParametersDecodeErrorZ ret_hu_conv = Result_ChannelDerivationParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
