using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A set of keys that were HKDF-expanded from an initial call to
 * [`NodeSigner::get_inbound_payment_key_material`].
 * 
 * [`NodeSigner::get_inbound_payment_key_material`]: crate::sign::NodeSigner::get_inbound_payment_key_material
 */
public class ExpandedKey : CommonBase {
	internal ExpandedKey(object _dummy, long ptr) : base(ptr) { }
	~ExpandedKey() {
		if (ptr != 0) { bindings.ExpandedKey_free(ptr); }
	}

	/**
	 * Create a  new [`ExpandedKey`] for generating an inbound payment hash and secret.
	 * 
	 * It is recommended to cache this value and not regenerate it for each new inbound payment.
	 */
	public static ExpandedKey of(byte[] key_material) {
		long ret = bindings.ExpandedKey_new(InternalUtils.check_arr_len(key_material, 32));
		GC.KeepAlive(key_material);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpandedKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpandedKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
