using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Positive duration that defines when (relatively to the timestamp) in the future the invoice
 * expires
 */
public class ExpiryTime : CommonBase {
	internal ExpiryTime(object _dummy, long ptr) : base(ptr) { }
	~ExpiryTime() {
		if (ptr != 0) { bindings.ExpiryTime_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.ExpiryTime_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ExpiryTime
	 */
	public ExpiryTime clone() {
		long ret = bindings.ExpiryTime_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpiryTime ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpiryTime(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ExpiryTime.
	 */
	public long hash() {
		long ret = bindings.ExpiryTime_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ExpiryTimes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ExpiryTime b) {
		bool ret = bindings.ExpiryTime_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ExpiryTime)) return false;
		return this.eq((ExpiryTime)o);
	}
	/**
	 * Construct an `ExpiryTime` from seconds.
	 */
	public static ExpiryTime from_seconds(long seconds) {
		long ret = bindings.ExpiryTime_from_seconds(seconds);
		GC.KeepAlive(seconds);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpiryTime ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpiryTime(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Construct an `ExpiryTime` from a [`Duration`], dropping the sub-second part.
	 */
	public static ExpiryTime from_duration(long duration) {
		long ret = bindings.ExpiryTime_from_duration(duration);
		GC.KeepAlive(duration);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpiryTime ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpiryTime(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the expiry time in seconds
	 */
	public long as_seconds() {
		long ret = bindings.ExpiryTime_as_seconds(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns a reference to the underlying [`Duration`] (=expiry time)
	 */
	public long as_duration() {
		long ret = bindings.ExpiryTime_as_duration(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
