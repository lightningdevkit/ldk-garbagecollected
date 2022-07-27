package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Represents a hostname for serialization purposes.
 * Only the character set and length will be validated.
 * The character set consists of ASCII alphanumeric characters, hyphens, and periods.
 * Its length is guaranteed to be representable by a single byte.
 * This serialization is used by BOLT 7 hostnames.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Hostname extends CommonBase {
	Hostname(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Hostname_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.Hostname_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Hostname
	 */
	public Hostname clone() {
		long ret = bindings.Hostname_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Hostname ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Hostname(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Returns the length of the hostname.
	 */
	public byte len() {
		byte ret = bindings.Hostname_len(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
