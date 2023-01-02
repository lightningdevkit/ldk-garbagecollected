using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Proof that the sender knows the per-commitment secret of the previous commitment transaction.
 * This is used to convince the recipient that the channel is at a certain commitment
 * number even if they lost that data due to a local failure.  Of course, the peer may lie
 * and even later commitments may have been revoked.
 */
public class DataLossProtect : CommonBase {
	internal DataLossProtect(object _dummy, long ptr) : base(ptr) { }
	~DataLossProtect() {
		if (ptr != 0) { bindings.DataLossProtect_free(ptr); }
	}

	/**
	 * Proof that the sender knows the per-commitment secret of a specific commitment transaction
	 * belonging to the recipient
	 */
	public byte[] get_your_last_per_commitment_secret() {
		byte[] ret = bindings.DataLossProtect_get_your_last_per_commitment_secret(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Proof that the sender knows the per-commitment secret of a specific commitment transaction
	 * belonging to the recipient
	 */
	public void set_your_last_per_commitment_secret(byte[] val) {
		bindings.DataLossProtect_set_your_last_per_commitment_secret(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The sender's per-commitment point for their current commitment transaction
	 */
	public byte[] get_my_current_per_commitment_point() {
		byte[] ret = bindings.DataLossProtect_get_my_current_per_commitment_point(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The sender's per-commitment point for their current commitment transaction
	 */
	public void set_my_current_per_commitment_point(byte[] val) {
		bindings.DataLossProtect_set_my_current_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new DataLossProtect given each field
	 */
	public static DataLossProtect of(byte[] your_last_per_commitment_secret_arg, byte[] my_current_per_commitment_point_arg) {
		long ret = bindings.DataLossProtect_new(InternalUtils.check_arr_len(your_last_per_commitment_secret_arg, 32), InternalUtils.check_arr_len(my_current_per_commitment_point_arg, 33));
		GC.KeepAlive(your_last_per_commitment_secret_arg);
		GC.KeepAlive(my_current_per_commitment_point_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DataLossProtect ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DataLossProtect(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.DataLossProtect_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the DataLossProtect
	 */
	public DataLossProtect clone() {
		long ret = bindings.DataLossProtect_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DataLossProtect ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DataLossProtect(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two DataLossProtects contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.DataLossProtect b) {
		bool ret = bindings.DataLossProtect_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is DataLossProtect)) return false;
		return this.eq((DataLossProtect)o);
	}
}
} } }
