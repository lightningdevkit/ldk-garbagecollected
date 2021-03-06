package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FundingCreated extends CommonBase {
	FundingCreated(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FundingCreated_free(ptr); }
	}

	public byte[] get_temporary_channel_id() {
		byte[] ret = bindings.FundingCreated_get_temporary_channel_id(this.ptr);
		return ret;
	}

	public void set_temporary_channel_id(byte[] val) {
		bindings.FundingCreated_set_temporary_channel_id(this.ptr, val);
	}

	public byte[] get_funding_txid() {
		byte[] ret = bindings.FundingCreated_get_funding_txid(this.ptr);
		return ret;
	}

	public void set_funding_txid(byte[] val) {
		bindings.FundingCreated_set_funding_txid(this.ptr, val);
	}

	public short get_funding_output_index() {
		short ret = bindings.FundingCreated_get_funding_output_index(this.ptr);
		return ret;
	}

	public void set_funding_output_index(short val) {
		bindings.FundingCreated_set_funding_output_index(this.ptr, val);
	}

	public byte[] get_signature() {
		byte[] ret = bindings.FundingCreated_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(byte[] val) {
		bindings.FundingCreated_set_signature(this.ptr, val);
	}

	public static FundingCreated constructor_new(byte[] temporary_channel_id_arg, byte[] funding_txid_arg, short funding_output_index_arg, byte[] signature_arg) {
		long ret = bindings.FundingCreated_new(temporary_channel_id_arg, funding_txid_arg, funding_output_index_arg, signature_arg);
		FundingCreated ret_hu_conv = new FundingCreated(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public FundingCreated clone() {
		long ret = bindings.FundingCreated_clone(this.ptr);
		FundingCreated ret_hu_conv = new FundingCreated(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.FundingCreated_write(this.ptr);
		return ret;
	}

	public static Result_FundingCreatedDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.FundingCreated_read(ser);
		Result_FundingCreatedDecodeErrorZ ret_hu_conv = Result_FundingCreatedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
