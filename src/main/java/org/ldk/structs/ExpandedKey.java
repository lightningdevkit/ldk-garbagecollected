package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A set of keys that were HKDF-expanded from an initial call to
 * [`NodeSigner::get_inbound_payment_key_material`].
 * 
 * [`NodeSigner::get_inbound_payment_key_material`]: crate::sign::NodeSigner::get_inbound_payment_key_material
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ExpandedKey extends CommonBase {
	ExpandedKey(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ExpandedKey_free(ptr); }
	}

	/**
	 * Create a  new [`ExpandedKey`] for generating an inbound payment hash and secret.
	 * 
	 * It is recommended to cache this value and not regenerate it for each new inbound payment.
	 */
	public static ExpandedKey of(byte[] key_material) {
		long ret = bindings.ExpandedKey_new(InternalUtils.check_arr_len(key_material, 32));
		Reference.reachabilityFence(key_material);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpandedKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpandedKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
