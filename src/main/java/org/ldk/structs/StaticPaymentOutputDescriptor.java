package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Information about a spendable output to our \"payment key\". See
 * SpendableOutputDescriptor::StaticPaymentOutput for more details on how to spend this.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class StaticPaymentOutputDescriptor extends CommonBase {
	StaticPaymentOutputDescriptor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.StaticPaymentOutputDescriptor_free(ptr); }
	}

	/**
	 * The outpoint which is spendable
	 */
	public OutPoint get_outpoint() {
		long ret = bindings.StaticPaymentOutputDescriptor_get_outpoint(this.ptr);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The outpoint which is spendable
	 */
	public void set_outpoint(OutPoint val) {
		bindings.StaticPaymentOutputDescriptor_set_outpoint(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * The output which is referenced by the given outpoint
	 */
	public void set_output(TxOut val) {
		bindings.StaticPaymentOutputDescriptor_set_output(this.ptr, val.ptr);
	}

	/**
	 * Arbitrary identification information returned by a call to
	 * `Sign::channel_keys_id()`. This may be useful in re-deriving keys used in
	 * the channel to spend the output.
	 */
	public byte[] get_channel_keys_id() {
		byte[] ret = bindings.StaticPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
		return ret;
	}

	/**
	 * Arbitrary identification information returned by a call to
	 * `Sign::channel_keys_id()`. This may be useful in re-deriving keys used in
	 * the channel to spend the output.
	 */
	public void set_channel_keys_id(byte[] val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_keys_id(this.ptr, val);
	}

	/**
	 * The value of the channel which this transactions spends.
	 */
	public long get_channel_value_satoshis() {
		long ret = bindings.StaticPaymentOutputDescriptor_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The value of the channel which this transactions spends.
	 */
	public void set_channel_value_satoshis(long val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_value_satoshis(this.ptr, val);
	}

	/**
	 * Constructs a new StaticPaymentOutputDescriptor given each field
	 */
	public static StaticPaymentOutputDescriptor of(OutPoint outpoint_arg, TxOut output_arg, byte[] channel_keys_id_arg, long channel_value_satoshis_arg) {
		long ret = bindings.StaticPaymentOutputDescriptor_new(outpoint_arg == null ? 0 : outpoint_arg.ptr & ~1, output_arg.ptr, channel_keys_id_arg, channel_value_satoshis_arg);
		StaticPaymentOutputDescriptor ret_hu_conv = new StaticPaymentOutputDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(outpoint_arg);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the StaticPaymentOutputDescriptor
	 */
	public StaticPaymentOutputDescriptor clone() {
		long ret = bindings.StaticPaymentOutputDescriptor_clone(this.ptr);
		StaticPaymentOutputDescriptor ret_hu_conv = new StaticPaymentOutputDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the StaticPaymentOutputDescriptor object into a byte array which can be read by StaticPaymentOutputDescriptor_read
	 */
	public byte[] write() {
		byte[] ret = bindings.StaticPaymentOutputDescriptor_write(this.ptr);
		return ret;
	}

	/**
	 * Read a StaticPaymentOutputDescriptor from a byte array, created by StaticPaymentOutputDescriptor_write
	 */
	public static Result_StaticPaymentOutputDescriptorDecodeErrorZ read(byte[] ser) {
		long ret = bindings.StaticPaymentOutputDescriptor_read(ser);
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
