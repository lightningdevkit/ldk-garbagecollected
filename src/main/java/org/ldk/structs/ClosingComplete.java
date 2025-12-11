package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A [`closing_complete`] message to be sent to or received from a peer.
 * 
 * [`closing_complete`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#closing-negotiation-closing_complete-and-closing_sig
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ClosingComplete extends CommonBase {
	ClosingComplete(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ClosingComplete_free(ptr); }
	}

	/**
	 * The channel ID.
	 */
	public ChannelId get_channel_id() {
		long ret = bindings.ClosingComplete_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID.
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.ClosingComplete_set_channel_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The destination of the closer's funds on closing.
	 */
	public byte[] get_closer_scriptpubkey() {
		byte[] ret = bindings.ClosingComplete_get_closer_scriptpubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The destination of the closer's funds on closing.
	 */
	public void set_closer_scriptpubkey(byte[] val) {
		bindings.ClosingComplete_set_closer_scriptpubkey(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The destination of the closee's funds on closing.
	 */
	public byte[] get_closee_scriptpubkey() {
		byte[] ret = bindings.ClosingComplete_get_closee_scriptpubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The destination of the closee's funds on closing.
	 */
	public void set_closee_scriptpubkey(byte[] val) {
		bindings.ClosingComplete_set_closee_scriptpubkey(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The proposed total fee for the closing transaction.
	 */
	public long get_fee_satoshis() {
		long ret = bindings.ClosingComplete_get_fee_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The proposed total fee for the closing transaction.
	 */
	public void set_fee_satoshis(long val) {
		bindings.ClosingComplete_set_fee_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The locktime of the closing transaction.
	 */
	public int get_locktime() {
		int ret = bindings.ClosingComplete_get_locktime(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The locktime of the closing transaction.
	 */
	public void set_locktime(int val) {
		bindings.ClosingComplete_set_locktime(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A signature on the closing transaction omitting the `closee` output.
	 */
	public Option_ECDSASignatureZ get_closer_output_only() {
		long ret = bindings.ClosingComplete_get_closer_output_only(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ECDSASignatureZ ret_hu_conv = org.ldk.structs.Option_ECDSASignatureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A signature on the closing transaction omitting the `closee` output.
	 */
	public void set_closer_output_only(org.ldk.structs.Option_ECDSASignatureZ val) {
		bindings.ClosingComplete_set_closer_output_only(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A signature on the closing transaction omitting the `closer` output.
	 */
	public Option_ECDSASignatureZ get_closee_output_only() {
		long ret = bindings.ClosingComplete_get_closee_output_only(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ECDSASignatureZ ret_hu_conv = org.ldk.structs.Option_ECDSASignatureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A signature on the closing transaction omitting the `closer` output.
	 */
	public void set_closee_output_only(org.ldk.structs.Option_ECDSASignatureZ val) {
		bindings.ClosingComplete_set_closee_output_only(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A signature on the closing transaction covering both `closer` and `closee` outputs.
	 */
	public Option_ECDSASignatureZ get_closer_and_closee_outputs() {
		long ret = bindings.ClosingComplete_get_closer_and_closee_outputs(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ECDSASignatureZ ret_hu_conv = org.ldk.structs.Option_ECDSASignatureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A signature on the closing transaction covering both `closer` and `closee` outputs.
	 */
	public void set_closer_and_closee_outputs(org.ldk.structs.Option_ECDSASignatureZ val) {
		bindings.ClosingComplete_set_closer_and_closee_outputs(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ClosingComplete given each field
	 */
	public static ClosingComplete of(org.ldk.structs.ChannelId channel_id_arg, byte[] closer_scriptpubkey_arg, byte[] closee_scriptpubkey_arg, long fee_satoshis_arg, int locktime_arg, org.ldk.structs.Option_ECDSASignatureZ closer_output_only_arg, org.ldk.structs.Option_ECDSASignatureZ closee_output_only_arg, org.ldk.structs.Option_ECDSASignatureZ closer_and_closee_outputs_arg) {
		long ret = bindings.ClosingComplete_new(channel_id_arg.ptr, closer_scriptpubkey_arg, closee_scriptpubkey_arg, fee_satoshis_arg, locktime_arg, closer_output_only_arg.ptr, closee_output_only_arg.ptr, closer_and_closee_outputs_arg.ptr);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(closer_scriptpubkey_arg);
		Reference.reachabilityFence(closee_scriptpubkey_arg);
		Reference.reachabilityFence(fee_satoshis_arg);
		Reference.reachabilityFence(locktime_arg);
		Reference.reachabilityFence(closer_output_only_arg);
		Reference.reachabilityFence(closee_output_only_arg);
		Reference.reachabilityFence(closer_and_closee_outputs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosingComplete ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ClosingComplete(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ClosingComplete_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ClosingComplete
	 */
	public ClosingComplete clone() {
		long ret = bindings.ClosingComplete_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosingComplete ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ClosingComplete(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ClosingComplete.
	 */
	public long hash() {
		long ret = bindings.ClosingComplete_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ClosingCompletes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.ClosingComplete b) {
		boolean ret = bindings.ClosingComplete_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ClosingComplete)) return false;
		return this.eq((ClosingComplete)o);
	}
	/**
	 * Serialize the ClosingComplete object into a byte array which can be read by ClosingComplete_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ClosingComplete_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ClosingComplete from a byte array, created by ClosingComplete_write
	 */
	public static Result_ClosingCompleteDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ClosingComplete_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ClosingCompleteDecodeErrorZ ret_hu_conv = Result_ClosingCompleteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
