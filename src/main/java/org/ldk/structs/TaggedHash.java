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

}
