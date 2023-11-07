using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A hash for use in a specific context by tweaking with a context-dependent tag as per [BIP 340]
 * and computed over the merkle root of a TLV stream to sign as defined in [BOLT 12].
 * 
 * [BIP 340]: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
 * [BOLT 12]: https://github.com/rustyrussell/lightning-rfc/blob/guilt/offers/12-offer-encoding.md#signature-calculation
 */
public class TaggedHash : CommonBase {
	internal TaggedHash(object _dummy, long ptr) : base(ptr) { }
	~TaggedHash() {
		if (ptr != 0) { bindings.TaggedHash_free(ptr); }
	}

}
} } }
