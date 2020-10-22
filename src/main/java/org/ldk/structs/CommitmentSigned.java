package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CommitmentSigned extends CommonBase {
	CommitmentSigned(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CommitmentSigned_free(ptr); }
	}

	public static CommitmentSigned constructor_clone(CommitmentSigned orig) {
		long ret = bindings.CommitmentSigned_clone(orig == null ? 0 : orig.ptr & ~1);
		CommitmentSigned ret_hu_conv = new CommitmentSigned(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.CommitmentSigned_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.CommitmentSigned_set_channel_id(this.ptr, val);
	}

	public byte[] get_signature() {
		byte[] ret = bindings.CommitmentSigned_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(byte[] val) {
		bindings.CommitmentSigned_set_signature(this.ptr, val);
	}

	public void set_htlc_signatures(byte[][] val) {
		bindings.CommitmentSigned_set_htlc_signatures(this.ptr, val);
	}

	public static CommitmentSigned constructor_new(byte[] channel_id_arg, byte[] signature_arg, byte[][] htlc_signatures_arg) {
		long ret = bindings.CommitmentSigned_new(channel_id_arg, signature_arg, htlc_signatures_arg);
		CommitmentSigned ret_hu_conv = new CommitmentSigned(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(CommitmentSigned obj) {
		byte[] ret = bindings.CommitmentSigned_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static CommitmentSigned constructor_read(byte[] ser) {
		long ret = bindings.CommitmentSigned_read(ser);
		CommitmentSigned ret_hu_conv = new CommitmentSigned(null, ret);
		return ret_hu_conv;
	}

}
