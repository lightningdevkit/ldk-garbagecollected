package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A funding_created message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FundingCreated extends CommonBase {
	FundingCreated(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FundingCreated_free(ptr); }
	}

	/**
	 * A temporary channel ID, until the funding is established
	 */
	public byte[] get_temporary_channel_id() {
		byte[] ret = bindings.FundingCreated_get_temporary_channel_id(this.ptr);
		return ret;
	}

	/**
	 * A temporary channel ID, until the funding is established
	 */
	public void set_temporary_channel_id(byte[] val) {
		bindings.FundingCreated_set_temporary_channel_id(this.ptr, val);
	}

	/**
	 * The funding transaction ID
	 */
	public byte[] get_funding_txid() {
		byte[] ret = bindings.FundingCreated_get_funding_txid(this.ptr);
		return ret;
	}

	/**
	 * The funding transaction ID
	 */
	public void set_funding_txid(byte[] val) {
		bindings.FundingCreated_set_funding_txid(this.ptr, val);
	}

	/**
	 * The specific output index funding this channel
	 */
	public short get_funding_output_index() {
		short ret = bindings.FundingCreated_get_funding_output_index(this.ptr);
		return ret;
	}

	/**
	 * The specific output index funding this channel
	 */
	public void set_funding_output_index(short val) {
		bindings.FundingCreated_set_funding_output_index(this.ptr, val);
	}

	/**
	 * The signature of the channel initiator (funder) on the initial commitment transaction
	 */
	public byte[] get_signature() {
		byte[] ret = bindings.FundingCreated_get_signature(this.ptr);
		return ret;
	}

	/**
	 * The signature of the channel initiator (funder) on the initial commitment transaction
	 */
	public void set_signature(byte[] val) {
		bindings.FundingCreated_set_signature(this.ptr, val);
	}

	/**
	 * Constructs a new FundingCreated given each field
	 */
	public static FundingCreated of(byte[] temporary_channel_id_arg, byte[] funding_txid_arg, short funding_output_index_arg, byte[] signature_arg) {
		long ret = bindings.FundingCreated_new(temporary_channel_id_arg, funding_txid_arg, funding_output_index_arg, signature_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		FundingCreated ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new FundingCreated(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the FundingCreated
	 */
	public FundingCreated clone() {
		long ret = bindings.FundingCreated_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		FundingCreated ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new FundingCreated(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the FundingCreated object into a byte array which can be read by FundingCreated_read
	 */
	public byte[] write() {
		byte[] ret = bindings.FundingCreated_write(this.ptr);
		return ret;
	}

	/**
	 * Read a FundingCreated from a byte array, created by FundingCreated_write
	 */
	public static Result_FundingCreatedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.FundingCreated_read(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingCreatedDecodeErrorZ ret_hu_conv = Result_FundingCreatedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
