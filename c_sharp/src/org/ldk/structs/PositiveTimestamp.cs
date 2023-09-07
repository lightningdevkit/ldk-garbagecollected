using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A timestamp that refers to a date after 1 January 1970.
 * 
 * # Invariants
 * 
 * The Unix timestamp representing the stored time has to be positive and no greater than
 * [`MAX_TIMESTAMP`].
 */
public class PositiveTimestamp : CommonBase {
	internal PositiveTimestamp(object _dummy, long ptr) : base(ptr) { }
	~PositiveTimestamp() {
		if (ptr != 0) { bindings.PositiveTimestamp_free(ptr); }
	}

	/**
	 * Checks if two PositiveTimestamps contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.PositiveTimestamp b) {
		bool ret = bindings.PositiveTimestamp_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is PositiveTimestamp)) return false;
		return this.eq((PositiveTimestamp)o);
	}
	internal long clone_ptr() {
		long ret = bindings.PositiveTimestamp_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PositiveTimestamp
	 */
	public PositiveTimestamp clone() {
		long ret = bindings.PositiveTimestamp_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PositiveTimestamp ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PositiveTimestamp(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PositiveTimestamp.
	 */
	public long hash() {
		long ret = bindings.PositiveTimestamp_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Creates a `PositiveTimestamp` from a Unix timestamp in the range `0..=MAX_TIMESTAMP`.
	 * 
	 * Otherwise, returns a [`CreationError::TimestampOutOfBounds`].
	 */
	public static Result_PositiveTimestampCreationErrorZ from_unix_timestamp(long unix_seconds) {
		long ret = bindings.PositiveTimestamp_from_unix_timestamp(unix_seconds);
		GC.KeepAlive(unix_seconds);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a `PositiveTimestamp` from a [`SystemTime`] with a corresponding Unix timestamp in
	 * the range `0..=MAX_TIMESTAMP`.
	 * 
	 * Note that the subsecond part is dropped as it is not representable in BOLT 11 invoices.
	 * 
	 * Otherwise, returns a [`CreationError::TimestampOutOfBounds`].
	 */
	public static Result_PositiveTimestampCreationErrorZ from_system_time(long time) {
		long ret = bindings.PositiveTimestamp_from_system_time(time);
		GC.KeepAlive(time);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a `PositiveTimestamp` from a [`Duration`] since the Unix epoch in the range
	 * `0..=MAX_TIMESTAMP`.
	 * 
	 * Note that the subsecond part is dropped as it is not representable in BOLT 11 invoices.
	 * 
	 * Otherwise, returns a [`CreationError::TimestampOutOfBounds`].
	 */
	public static Result_PositiveTimestampCreationErrorZ from_duration_since_epoch(long duration) {
		long ret = bindings.PositiveTimestamp_from_duration_since_epoch(duration);
		GC.KeepAlive(duration);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the Unix timestamp representing the stored time
	 */
	public long as_unix_timestamp() {
		long ret = bindings.PositiveTimestamp_as_unix_timestamp(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns the duration of the stored time since the Unix epoch
	 */
	public long as_duration_since_epoch() {
		long ret = bindings.PositiveTimestamp_as_duration_since_epoch(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns the [`SystemTime`] representing the stored time
	 */
	public long as_time() {
		long ret = bindings.PositiveTimestamp_as_time(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
