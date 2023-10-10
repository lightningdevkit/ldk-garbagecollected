using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A semantically valid [`Bolt12Invoice`] that hasn't been signed.
 */
public class UnsignedBolt12Invoice : CommonBase {
	internal UnsignedBolt12Invoice(object _dummy, long ptr) : base(ptr) { }
	~UnsignedBolt12Invoice() {
		if (ptr != 0) { bindings.UnsignedBolt12Invoice_free(ptr); }
	}

	/**
	 * The public key corresponding to the key needed to sign the invoice.
	 */
	public byte[] signing_pubkey() {
		byte[] ret = bindings.UnsignedBolt12Invoice_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
