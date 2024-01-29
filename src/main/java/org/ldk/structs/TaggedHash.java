package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A hash for use in a specific context by tweaking with a context-dependent tag as per [BIP 340]
 * and computed over the merkle root of a TLV stream to sign as defined in [BOLT 12].
 * 
 * [BIP 340]: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
 * [BOLT 12]: https://github.com/rustyrussell/lightning-rfc/blob/guilt/offers/12-offer-encoding.md#signature-calculation
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TaggedHash extends CommonBase {
	TaggedHash(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TaggedHash_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.TaggedHash_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the TaggedHash
	 */
	public TaggedHash clone() {
		long ret = bindings.TaggedHash_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TaggedHash ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TaggedHash(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the digest to sign.
	 */
	public byte[] as_digest() {
		byte[] ret = bindings.TaggedHash_as_digest(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the tag used in the tagged hash.
	 */
	public String tag() {
		String ret = bindings.TaggedHash_tag(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the merkle root used in the tagged hash.
	 */
	public byte[] merkle_root() {
		byte[] ret = bindings.TaggedHash_merkle_root(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
