package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A commitment_signed message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CommitmentSigned extends CommonBase {
	CommitmentSigned(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CommitmentSigned_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.CommitmentSigned_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.CommitmentSigned_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A signature on the commitment transaction
	 */
	public byte[] get_signature() {
		byte[] ret = bindings.CommitmentSigned_get_signature(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A signature on the commitment transaction
	 */
	public void set_signature(byte[] val) {
		bindings.CommitmentSigned_set_signature(this.ptr, InternalUtils.check_arr_len(val, 64));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Signatures on the HTLC transactions
	 */
	public void set_htlc_signatures(byte[][] val) {
		bindings.CommitmentSigned_set_htlc_signatures(this.ptr, val != null ? Arrays.stream(val).map(val_conv_8 -> InternalUtils.check_arr_len(val_conv_8, 64)).toArray(byte[][]::new) : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new CommitmentSigned given each field
	 */
	public static CommitmentSigned of(byte[] channel_id_arg, byte[] signature_arg, byte[][] htlc_signatures_arg) {
		long ret = bindings.CommitmentSigned_new(InternalUtils.check_arr_len(channel_id_arg, 32), InternalUtils.check_arr_len(signature_arg, 64), htlc_signatures_arg != null ? Arrays.stream(htlc_signatures_arg).map(htlc_signatures_arg_conv_8 -> InternalUtils.check_arr_len(htlc_signatures_arg_conv_8, 64)).toArray(byte[][]::new) : null);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(signature_arg);
		Reference.reachabilityFence(htlc_signatures_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		CommitmentSigned ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new CommitmentSigned(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.CommitmentSigned_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the CommitmentSigned
	 */
	public CommitmentSigned clone() {
		long ret = bindings.CommitmentSigned_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CommitmentSigned ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new CommitmentSigned(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the CommitmentSigned object into a byte array which can be read by CommitmentSigned_read
	 */
	public byte[] write() {
		byte[] ret = bindings.CommitmentSigned_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a CommitmentSigned from a byte array, created by CommitmentSigned_write
	 */
	public static Result_CommitmentSignedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.CommitmentSigned_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CommitmentSignedDecodeErrorZ ret_hu_conv = Result_CommitmentSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
