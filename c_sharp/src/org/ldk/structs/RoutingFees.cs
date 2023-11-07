using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Fees for routing via a given channel or a node
 */
public class RoutingFees : CommonBase {
	internal RoutingFees(object _dummy, long ptr) : base(ptr) { }
	~RoutingFees() {
		if (ptr != 0) { bindings.RoutingFees_free(ptr); }
	}

	/**
	 * Flat routing fee in millisatoshis.
	 */
	public int get_base_msat() {
		int ret = bindings.RoutingFees_get_base_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Flat routing fee in millisatoshis.
	 */
	public void set_base_msat(int val) {
		bindings.RoutingFees_set_base_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Liquidity-based routing fee in millionths of a routed amount.
	 * In other words, 10000 is 1%.
	 */
	public int get_proportional_millionths() {
		int ret = bindings.RoutingFees_get_proportional_millionths(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Liquidity-based routing fee in millionths of a routed amount.
	 * In other words, 10000 is 1%.
	 */
	public void set_proportional_millionths(int val) {
		bindings.RoutingFees_set_proportional_millionths(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new RoutingFees given each field
	 */
	public static RoutingFees of(int base_msat_arg, int proportional_millionths_arg) {
		long ret = bindings.RoutingFees_new(base_msat_arg, proportional_millionths_arg);
		GC.KeepAlive(base_msat_arg);
		GC.KeepAlive(proportional_millionths_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RoutingFees ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RoutingFees(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two RoutingFeess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.RoutingFees b) {
		bool ret = bindings.RoutingFees_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is RoutingFees)) return false;
		return this.eq((RoutingFees)o);
	}
	internal long clone_ptr() {
		long ret = bindings.RoutingFees_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RoutingFees
	 */
	public RoutingFees clone() {
		long ret = bindings.RoutingFees_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RoutingFees ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RoutingFees(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RoutingFees.
	 */
	public long hash() {
		long ret = bindings.RoutingFees_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Serialize the RoutingFees object into a byte array which can be read by RoutingFees_read
	 */
	public byte[] write() {
		long ret = bindings.RoutingFees_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RoutingFees from a byte array, created by RoutingFees_write
	 */
	public static Result_RoutingFeesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RoutingFees_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
