using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A string that displays only printable characters, replacing control characters with
 * [`core::char::REPLACEMENT_CHARACTER`].
 */
public class PrintableString : CommonBase {
	internal PrintableString(object _dummy, long ptr) : base(ptr) { }
	~PrintableString() {
		if (ptr != 0) { bindings.PrintableString_free(ptr); }
	}

	public string get_a() {
		string ret = bindings.PrintableString_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public void set_a(string val) {
		bindings.PrintableString_set_a(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new PrintableString given each field
	 */
	public static PrintableString of(string a_arg) {
		long ret = bindings.PrintableString_new(a_arg);
		GC.KeepAlive(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
