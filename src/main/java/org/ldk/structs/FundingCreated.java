package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class FundingCreated extends CommonBase {
	FundingCreated(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.FundingCreated_free(ptr);
	}

	public FundingCreated(FundingCreated orig) {
		super(bindings.FundingCreated_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_temporary_channel_id(FundingCreated this_ptr) {
		byte[] ret = bindings.FundingCreated_get_temporary_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_temporary_channel_id(FundingCreated this_ptr, byte[] val) {
		bindings.FundingCreated_set_temporary_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_funding_txid(FundingCreated this_ptr) {
		byte[] ret = bindings.FundingCreated_get_funding_txid(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_funding_txid(FundingCreated this_ptr, byte[] val) {
		bindings.FundingCreated_set_funding_txid(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_funding_output_index(FundingCreated this_ptr) {
		short ret = bindings.FundingCreated_get_funding_output_index(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_funding_output_index(FundingCreated this_ptr, short val) {
		bindings.FundingCreated_set_funding_output_index(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_signature(FundingCreated this_ptr) {
		byte[] ret = bindings.FundingCreated_get_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_signature(FundingCreated this_ptr, byte[] val) {
		bindings.FundingCreated_set_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public FundingCreated(byte[] temporary_channel_id_arg, byte[] funding_txid_arg, short funding_output_index_arg, byte[] signature_arg) {
		super(bindings.FundingCreated_new(temporary_channel_id_arg, funding_txid_arg, funding_output_index_arg, signature_arg));
	}

	public byte[] write(FundingCreated obj) {
		byte[] ret = bindings.FundingCreated_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public FundingCreated(byte[] ser) {
		super(bindings.FundingCreated_read(ser));
	}

}
