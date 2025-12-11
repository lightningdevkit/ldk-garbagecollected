package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A message which is sent in response to [`DNSSECQuery`] containing a DNSSEC proof.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DNSSECProof extends CommonBase {
	DNSSECProof(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DNSSECProof_free(ptr); }
	}

	/**
	 * An [RFC 9102 DNSSEC AuthenticationChain] providing a DNSSEC proof.
	 * 
	 * [RFC 9102 DNSSEC AuthenticationChain]: https://www.rfc-editor.org/rfc/rfc9102.html#name-dnssec-authentication-chain
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_proof() {
		byte[] ret = bindings.DNSSECProof_get_proof(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * An [RFC 9102 DNSSEC AuthenticationChain] providing a DNSSEC proof.
	 * 
	 * [RFC 9102 DNSSEC AuthenticationChain]: https://www.rfc-editor.org/rfc/rfc9102.html#name-dnssec-authentication-chain
	 */
	public void set_proof(byte[] val) {
		bindings.DNSSECProof_set_proof(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.DNSSECProof_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the DNSSECProof
	 */
	public DNSSECProof clone() {
		long ret = bindings.DNSSECProof_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DNSSECProof ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DNSSECProof(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DNSSECProof.
	 */
	public long hash() {
		long ret = bindings.DNSSECProof_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two DNSSECProofs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.DNSSECProof b) {
		boolean ret = bindings.DNSSECProof_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof DNSSECProof)) return false;
		return this.eq((DNSSECProof)o);
	}
}
