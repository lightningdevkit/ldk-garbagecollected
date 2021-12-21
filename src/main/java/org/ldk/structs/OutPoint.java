package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The referenced transaction's txid.
	 */
	public void set_txid(byte[] val) {
		bindings.OutPoint_set_txid(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The index of the referenced output in its transaction's vout.
	 */
	public short get_index() {
		short ret = bindings.OutPoint_get_index(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The index of the referenced output in its transaction's vout.
	 */
	public void set_index(short val) {
		bindings.OutPoint_set_index(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new OutPoint given each field
	 */
	public static OutPoint of(byte[] txid_arg, short index_arg) {
		long ret = bindings.OutPoint_new(InternalUtils.check_arr_len(txid_arg, 32), index_arg);
		Reference.reachabilityFence(txid_arg);
		Reference.reachabilityFence(index_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new OutPoint(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.OutPoint_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the OutPoint
	 */
	public OutPoint clone() {
		long ret = bindings.OutPoint_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new OutPoint(null, ret); }
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof OutPoint)) return false;
		return this.eq((OutPoint)o);
	}
	/**
	 * Checks if two OutPoints contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.OutPoint_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Convert an `OutPoint` to a lightning channel id.
	 */
	public byte[] to_channel_id() {
		byte[] ret = bindings.OutPoint_to_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the OutPoint object into a byte array which can be read by OutPoint_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OutPoint_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a OutPoint from a byte array, created by OutPoint_write
	 */
	public static Result_OutPointDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OutPoint_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OutPointDecodeErrorZ ret_hu_conv = Result_OutPointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
