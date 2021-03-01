package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DelayedPaymentOutputDescriptor extends CommonBase {
	DelayedPaymentOutputDescriptor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DelayedPaymentOutputDescriptor_free(ptr); }
	}

	public OutPoint get_outpoint() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_outpoint(this.ptr);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_outpoint(OutPoint val) {
		bindings.DelayedPaymentOutputDescriptor_set_outpoint(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public byte[] get_per_commitment_point() {
		byte[] ret = bindings.DelayedPaymentOutputDescriptor_get_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_per_commitment_point(byte[] val) {
		bindings.DelayedPaymentOutputDescriptor_set_per_commitment_point(this.ptr, val);
	}

	public short get_to_self_delay() {
		short ret = bindings.DelayedPaymentOutputDescriptor_get_to_self_delay(this.ptr);
		return ret;
	}

	public void set_to_self_delay(short val) {
		bindings.DelayedPaymentOutputDescriptor_set_to_self_delay(this.ptr, val);
	}

	public void set_output(TxOut val) {
		bindings.DelayedPaymentOutputDescriptor_set_output(this.ptr, val.ptr);
	}

	public byte[] get_revocation_pubkey() {
		byte[] ret = bindings.DelayedPaymentOutputDescriptor_get_revocation_pubkey(this.ptr);
		return ret;
	}

	public void set_revocation_pubkey(byte[] val) {
		bindings.DelayedPaymentOutputDescriptor_set_revocation_pubkey(this.ptr, val);
	}

	public byte[] get_channel_keys_id() {
		byte[] ret = bindings.DelayedPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
		return ret;
	}

	public void set_channel_keys_id(byte[] val) {
		bindings.DelayedPaymentOutputDescriptor_set_channel_keys_id(this.ptr, val);
	}

	public long get_channel_value_satoshis() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	public void set_channel_value_satoshis(long val) {
		bindings.DelayedPaymentOutputDescriptor_set_channel_value_satoshis(this.ptr, val);
	}

	public static DelayedPaymentOutputDescriptor constructor_new(OutPoint outpoint_arg, byte[] per_commitment_point_arg, short to_self_delay_arg, TxOut output_arg, byte[] revocation_pubkey_arg, byte[] channel_keys_id_arg, long channel_value_satoshis_arg) {
		long ret = bindings.DelayedPaymentOutputDescriptor_new(outpoint_arg == null ? 0 : outpoint_arg.ptr & ~1, per_commitment_point_arg, to_self_delay_arg, output_arg.ptr, revocation_pubkey_arg, channel_keys_id_arg, channel_value_satoshis_arg);
		DelayedPaymentOutputDescriptor ret_hu_conv = new DelayedPaymentOutputDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(outpoint_arg);
		return ret_hu_conv;
	}

	public DelayedPaymentOutputDescriptor clone() {
		long ret = bindings.DelayedPaymentOutputDescriptor_clone(this.ptr);
		DelayedPaymentOutputDescriptor ret_hu_conv = new DelayedPaymentOutputDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
