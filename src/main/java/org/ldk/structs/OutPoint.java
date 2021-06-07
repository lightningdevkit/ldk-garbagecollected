package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * A reference to a transaction output.
 * 
 * Differs from bitcoin::blockdata::transaction::OutPoint as the index is a u16 instead of u32
 * due to LN's restrictions on index values. Should reduce (possibly) unsafe conversions this way.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OutPoint extends CommonBase {
	OutPoint(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OutPoint_free(ptr); }
	}

	/**
	 * The referenced transaction's txid.
	 */
	public byte[] get_txid() {
		byte[] ret = bindings.OutPoint_get_txid(this.ptr);
		return ret;
	}

	/**
	 * The referenced transaction's txid.
	 */
	public void set_txid(byte[] val) {
		bindings.OutPoint_set_txid(this.ptr, val);
	}

	/**
	 * The index of the referenced output in its transaction's vout.
	 */
	public short get_index() {
		short ret = bindings.OutPoint_get_index(this.ptr);
		return ret;
	}

	/**
	 * The index of the referenced output in its transaction's vout.
	 */
	public void set_index(short val) {
		bindings.OutPoint_set_index(this.ptr, val);
	}

	/**
	 * Constructs a new OutPoint given each field
	 */
	public static OutPoint of(byte[] txid_arg, short index_arg) {
		long ret = bindings.OutPoint_new(txid_arg, index_arg);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the OutPoint
	 */
	public OutPoint clone() {
		long ret = bindings.OutPoint_clone(this.ptr);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two OutPoints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(OutPoint b) {
		boolean ret = bindings.OutPoint_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Checks if two OutPoints contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.OutPoint_hash(this.ptr);
		return ret;
	}

	/**
	 * Convert an `OutPoint` to a lightning channel id.
	 */
	public byte[] to_channel_id() {
		byte[] ret = bindings.OutPoint_to_channel_id(this.ptr);
		return ret;
	}

	/**
	 * Serialize the OutPoint object into a byte array which can be read by OutPoint_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OutPoint_write(this.ptr);
		return ret;
	}

	/**
	 * Read a OutPoint from a byte array, created by OutPoint_write
	 */
	public static Result_OutPointDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OutPoint_read(ser);
		Result_OutPointDecodeErrorZ ret_hu_conv = Result_OutPointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
