using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A message which is sent in response to [`DNSSECQuery`] containing a DNSSEC proof.
 */
public class DNSSECProof : CommonBase {
	internal DNSSECProof(object _dummy, long ptr) : base(ptr) { }
	~DNSSECProof() {
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
		long ret = bindings.DNSSECProof_get_proof(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * An [RFC 9102 DNSSEC AuthenticationChain] providing a DNSSEC proof.
	 * 
	 * [RFC 9102 DNSSEC AuthenticationChain]: https://www.rfc-editor.org/rfc/rfc9102.html#name-dnssec-authentication-chain
	 */
	public void set_proof(byte[] val) {
		bindings.DNSSECProof_set_proof(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.DNSSECProof_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the DNSSECProof
	 */
	public org.ldk.structs.DNSSECProof clone() {
		long ret = bindings.DNSSECProof_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DNSSECProof ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DNSSECProof(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DNSSECProof.
	 */
	public long hash() {
		long ret = bindings.DNSSECProof_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two DNSSECProofs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.DNSSECProof b) {
		bool ret = bindings.DNSSECProof_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is DNSSECProof)) return false;
		return this.eq((DNSSECProof)o);
	}
}
} } }
