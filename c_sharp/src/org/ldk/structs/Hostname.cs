using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Represents a hostname for serialization purposes.
 * Only the character set and length will be validated.
 * The character set consists of ASCII alphanumeric characters, hyphens, and periods.
 * Its length is guaranteed to be representable by a single byte.
 * This serialization is used by [`BOLT 7`] hostnames.
 * 
 * [`BOLT 7`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md
 */
public class Hostname : CommonBase {
	internal Hostname(object _dummy, long ptr) : base(ptr) { }
	~Hostname() {
		if (ptr != 0) { bindings.Hostname_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.Hostname_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Hostname
	 */
	public Hostname clone() {
		long ret = bindings.Hostname_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Hostname ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Hostname(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Hostnames contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Hostname b) {
		bool ret = bindings.Hostname_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Hostname)) return false;
		return this.eq((Hostname)o);
	}
	/**
	 * Returns the length of the hostname.
	 */
	public byte len() {
		byte ret = bindings.Hostname_len(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Serialize the Hostname object into a byte array which can be read by Hostname_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Hostname_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a Hostname from a byte array, created by Hostname_write
	 */
	public static Result_HostnameDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Hostname_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HostnameDecodeErrorZ ret_hu_conv = Result_HostnameDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
