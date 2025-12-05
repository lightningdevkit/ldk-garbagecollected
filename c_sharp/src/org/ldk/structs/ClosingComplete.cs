using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`closing_complete`] message to be sent to or received from a peer.
 * 
 * [`closing_complete`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#closing-negotiation-closing_complete-and-closing_sig
 */
public class ClosingComplete : CommonBase {
	internal ClosingComplete(object _dummy, long ptr) : base(ptr) { }
	~ClosingComplete() {
		if (ptr != 0) { bindings.ClosingComplete_free(ptr); }
	}

	/**
	 * The channel ID.
	 */
	public org.ldk.structs.ChannelId get_channel_id() {
		long ret = bindings.ClosingComplete_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID.
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.ClosingComplete_set_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The destination of the closer's funds on closing.
	 */
	public byte[] get_closer_scriptpubkey() {
		long ret = bindings.ClosingComplete_get_closer_scriptpubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The destination of the closer's funds on closing.
	 */
	public void set_closer_scriptpubkey(byte[] val) {
		bindings.ClosingComplete_set_closer_scriptpubkey(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The destination of the closee's funds on closing.
	 */
	public byte[] get_closee_scriptpubkey() {
		long ret = bindings.ClosingComplete_get_closee_scriptpubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The destination of the closee's funds on closing.
	 */
	public void set_closee_scriptpubkey(byte[] val) {
		bindings.ClosingComplete_set_closee_scriptpubkey(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The proposed total fee for the closing transaction.
	 */
	public long get_fee_satoshis() {
		long ret = bindings.ClosingComplete_get_fee_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The proposed total fee for the closing transaction.
	 */
	public void set_fee_satoshis(long val) {
		bindings.ClosingComplete_set_fee_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The locktime of the closing transaction.
	 */
	public int get_locktime() {
		int ret = bindings.ClosingComplete_get_locktime(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The locktime of the closing transaction.
	 */
	public void set_locktime(int val) {
		bindings.ClosingComplete_set_locktime(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A signature on the closing transaction omitting the `closee` output.
	 */
	public org.ldk.structs.Option_ECDSASignatureZ get_closer_output_only() {
		long ret = bindings.ClosingComplete_get_closer_output_only(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ECDSASignatureZ ret_hu_conv = org.ldk.structs.Option_ECDSASignatureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A signature on the closing transaction omitting the `closee` output.
	 */
	public void set_closer_output_only(org.ldk.structs.Option_ECDSASignatureZ val) {
		bindings.ClosingComplete_set_closer_output_only(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A signature on the closing transaction omitting the `closer` output.
	 */
	public org.ldk.structs.Option_ECDSASignatureZ get_closee_output_only() {
		long ret = bindings.ClosingComplete_get_closee_output_only(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ECDSASignatureZ ret_hu_conv = org.ldk.structs.Option_ECDSASignatureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A signature on the closing transaction omitting the `closer` output.
	 */
	public void set_closee_output_only(org.ldk.structs.Option_ECDSASignatureZ val) {
		bindings.ClosingComplete_set_closee_output_only(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A signature on the closing transaction covering both `closer` and `closee` outputs.
	 */
	public org.ldk.structs.Option_ECDSASignatureZ get_closer_and_closee_outputs() {
		long ret = bindings.ClosingComplete_get_closer_and_closee_outputs(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ECDSASignatureZ ret_hu_conv = org.ldk.structs.Option_ECDSASignatureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A signature on the closing transaction covering both `closer` and `closee` outputs.
	 */
	public void set_closer_and_closee_outputs(org.ldk.structs.Option_ECDSASignatureZ val) {
		bindings.ClosingComplete_set_closer_and_closee_outputs(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ClosingComplete given each field
	 */
	public static org.ldk.structs.ClosingComplete of(org.ldk.structs.ChannelId channel_id_arg, byte[] closer_scriptpubkey_arg, byte[] closee_scriptpubkey_arg, long fee_satoshis_arg, int locktime_arg, org.ldk.structs.Option_ECDSASignatureZ closer_output_only_arg, org.ldk.structs.Option_ECDSASignatureZ closee_output_only_arg, org.ldk.structs.Option_ECDSASignatureZ closer_and_closee_outputs_arg) {
		long ret = bindings.ClosingComplete_new(channel_id_arg.ptr, InternalUtils.encodeUint8Array(closer_scriptpubkey_arg), InternalUtils.encodeUint8Array(closee_scriptpubkey_arg), fee_satoshis_arg, locktime_arg, closer_output_only_arg.ptr, closee_output_only_arg.ptr, closer_and_closee_outputs_arg.ptr);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(closer_scriptpubkey_arg);
		GC.KeepAlive(closee_scriptpubkey_arg);
		GC.KeepAlive(fee_satoshis_arg);
		GC.KeepAlive(locktime_arg);
		GC.KeepAlive(closer_output_only_arg);
		GC.KeepAlive(closee_output_only_arg);
		GC.KeepAlive(closer_and_closee_outputs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosingComplete ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ClosingComplete(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ClosingComplete_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ClosingComplete
	 */
	public org.ldk.structs.ClosingComplete clone() {
		long ret = bindings.ClosingComplete_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosingComplete ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ClosingComplete(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ClosingComplete.
	 */
	public long hash() {
		long ret = bindings.ClosingComplete_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ClosingCompletes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ClosingComplete b) {
		bool ret = bindings.ClosingComplete_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ClosingComplete)) return false;
		return this.eq((ClosingComplete)o);
	}
	/**
	 * Serialize the ClosingComplete object into a byte array which can be read by ClosingComplete_read
	 */
	public byte[] write() {
		long ret = bindings.ClosingComplete_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ClosingComplete from a byte array, created by ClosingComplete_write
	 */
	public static org.ldk.structs.Result_ClosingCompleteDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ClosingComplete_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ClosingCompleteDecodeErrorZ ret_hu_conv = Result_ClosingCompleteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
