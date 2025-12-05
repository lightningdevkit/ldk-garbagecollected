package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Contains a simple nonce for use in a blinded path's context.
 * 
 * Such a context is required when receiving a [`DNSSECProof`] message.
 * 
 * [`DNSSECProof`]: crate::onion_message::dns_resolution::DNSSECProof
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DNSResolverContext extends CommonBase {
	DNSResolverContext(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DNSResolverContext_free(ptr); }
	}

	/**
	 * A nonce which uniquely describes a DNS resolution, useful for looking up metadata about the
	 * request.
	 */
	public byte[] get_nonce() {
		byte[] ret = bindings.DNSResolverContext_get_nonce(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A nonce which uniquely describes a DNS resolution, useful for looking up metadata about the
	 * request.
	 */
	public void set_nonce(byte[] val) {
		bindings.DNSResolverContext_set_nonce(this.ptr, InternalUtils.check_arr_len(val, 16));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new DNSResolverContext given each field
	 */
	public static DNSResolverContext of(byte[] nonce_arg) {
		long ret = bindings.DNSResolverContext_new(InternalUtils.check_arr_len(nonce_arg, 16));
		Reference.reachabilityFence(nonce_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DNSResolverContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DNSResolverContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.DNSResolverContext_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the DNSResolverContext
	 */
	public DNSResolverContext clone() {
		long ret = bindings.DNSResolverContext_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DNSResolverContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DNSResolverContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DNSResolverContext.
	 */
	public long hash() {
		long ret = bindings.DNSResolverContext_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two DNSResolverContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.DNSResolverContext b) {
		boolean ret = bindings.DNSResolverContext_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof DNSResolverContext)) return false;
		return this.eq((DNSResolverContext)o);
	}
	/**
	 * Serialize the DNSResolverContext object into a byte array which can be read by DNSResolverContext_read
	 */
	public byte[] write() {
		byte[] ret = bindings.DNSResolverContext_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a DNSResolverContext from a byte array, created by DNSResolverContext_write
	 */
	public static Result_DNSResolverContextDecodeErrorZ read(byte[] ser) {
		long ret = bindings.DNSResolverContext_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DNSResolverContextDecodeErrorZ ret_hu_conv = Result_DNSResolverContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
