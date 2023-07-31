package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A semantically valid [`Bolt12Invoice`] that hasn't been signed.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UnsignedBolt12Invoice extends CommonBase {
	UnsignedBolt12Invoice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnsignedBolt12Invoice_free(ptr); }
	}

	/**
	 * The public key corresponding to the key needed to sign the invoice.
	 */
	public byte[] signing_pubkey() {
		byte[] ret = bindings.UnsignedBolt12Invoice_signing_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
