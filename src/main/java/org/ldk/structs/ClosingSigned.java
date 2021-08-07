package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A closing_signed message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ClosingSigned extends CommonBase {
	ClosingSigned(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ClosingSigned_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.ClosingSigned_get_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.ClosingSigned_set_channel_id(this.ptr, val);
	}

	/**
	 * The proposed total fee for the closing transaction
	 */
	public long get_fee_satoshis() {
		long ret = bindings.ClosingSigned_get_fee_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The proposed total fee for the closing transaction
	 */
	public void set_fee_satoshis(long val) {
		bindings.ClosingSigned_set_fee_satoshis(this.ptr, val);
	}

	/**
	 * A signature on the closing transaction
	 */
	public byte[] get_signature() {
		byte[] ret = bindings.ClosingSigned_get_signature(this.ptr);
		return ret;
	}

	/**
	 * A signature on the closing transaction
	 */
	public void set_signature(byte[] val) {
		bindings.ClosingSigned_set_signature(this.ptr, val);
	}

	/**
	 * Constructs a new ClosingSigned given each field
	 */
	public static ClosingSigned of(byte[] channel_id_arg, long fee_satoshis_arg, byte[] signature_arg) {
		long ret = bindings.ClosingSigned_new(channel_id_arg, fee_satoshis_arg, signature_arg);
		if (ret < 1024) { return null; }
		ClosingSigned ret_hu_conv = new ClosingSigned(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the ClosingSigned
	 */
	public ClosingSigned clone() {
		long ret = bindings.ClosingSigned_clone(this.ptr);
		if (ret < 1024) { return null; }
		ClosingSigned ret_hu_conv = new ClosingSigned(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ClosingSigned object into a byte array which can be read by ClosingSigned_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ClosingSigned_write(this.ptr);
		return ret;
	}

	/**
	 * Read a ClosingSigned from a byte array, created by ClosingSigned_write
	 */
	public static Result_ClosingSignedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ClosingSigned_read(ser);
		if (ret < 1024) { return null; }
		Result_ClosingSignedDecodeErrorZ ret_hu_conv = Result_ClosingSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
