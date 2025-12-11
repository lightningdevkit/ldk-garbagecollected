using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Contains a simple nonce for use in a blinded path's context.
 * 
 * Such a context is required when receiving a [`DNSSECProof`] message.
 * 
 * [`DNSSECProof`]: crate::onion_message::dns_resolution::DNSSECProof
 */
public class DNSResolverContext : CommonBase {
	internal DNSResolverContext(object _dummy, long ptr) : base(ptr) { }
	~DNSResolverContext() {
		if (ptr != 0) { bindings.DNSResolverContext_free(ptr); }
	}

	/**
	 * A nonce which uniquely describes a DNS resolution, useful for looking up metadata about the
	 * request.
	 */
	public byte[] get_nonce() {
		long ret = bindings.DNSResolverContext_get_nonce(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A nonce which uniquely describes a DNS resolution, useful for looking up metadata about the
	 * request.
	 */
	public void set_nonce(byte[] val) {
		bindings.DNSResolverContext_set_nonce(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 16)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new DNSResolverContext given each field
	 */
	public static org.ldk.structs.DNSResolverContext of(byte[] nonce_arg) {
		long ret = bindings.DNSResolverContext_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(nonce_arg, 16)));
		GC.KeepAlive(nonce_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DNSResolverContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DNSResolverContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.DNSResolverContext_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the DNSResolverContext
	 */
	public org.ldk.structs.DNSResolverContext clone() {
		long ret = bindings.DNSResolverContext_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DNSResolverContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DNSResolverContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DNSResolverContext.
	 */
	public long hash() {
		long ret = bindings.DNSResolverContext_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two DNSResolverContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.DNSResolverContext b) {
		bool ret = bindings.DNSResolverContext_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is DNSResolverContext)) return false;
		return this.eq((DNSResolverContext)o);
	}
	/**
	 * Serialize the DNSResolverContext object into a byte array which can be read by DNSResolverContext_read
	 */
	public byte[] write() {
		long ret = bindings.DNSResolverContext_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a DNSResolverContext from a byte array, created by DNSResolverContext_write
	 */
	public static org.ldk.structs.Result_DNSResolverContextDecodeErrorZ read(byte[] ser) {
		long ret = bindings.DNSResolverContext_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DNSResolverContextDecodeErrorZ ret_hu_conv = Result_DNSResolverContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
