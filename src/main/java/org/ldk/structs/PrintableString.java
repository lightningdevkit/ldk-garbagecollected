package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A string that displays only printable characters, replacing control characters with
 * [`core::char::REPLACEMENT_CHARACTER`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PrintableString extends CommonBase {
	PrintableString(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PrintableString_free(ptr); }
	}

	public String get_a() {
		String ret = bindings.PrintableString_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(java.lang.String val) {
		bindings.PrintableString_set_a(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new PrintableString given each field
	 */
	public static PrintableString of(java.lang.String a_arg) {
		long ret = bindings.PrintableString_new(a_arg);
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
