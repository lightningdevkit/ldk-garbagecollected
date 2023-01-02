using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Lightning TLV uses a custom variable-length integer called BigSize. It is similar to Bitcoin's
 * variable-length integers except that it is serialized in big-endian instead of little-endian.
 * 
 * Like Bitcoin's variable-length integer, it exhibits ambiguity in that certain values can be
 * encoded in several different ways, which we must check for at deserialization-time. Thus, if
 * you're looking for an example of a variable-length integer to use for your own project, move
 * along, this is a rather poor design.
 */
public class BigSize : CommonBase {
	internal BigSize(object _dummy, long ptr) : base(ptr) { }
	~BigSize() {
		if (ptr != 0) { bindings.BigSize_free(ptr); }
	}

	public long get_a() {
		long ret = bindings.BigSize_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public void set_a(long val) {
		bindings.BigSize_set_a(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new BigSize given each field
	 */
	public static BigSize of(long a_arg) {
		long ret = bindings.BigSize_new(a_arg);
		GC.KeepAlive(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BigSize ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BigSize(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
