package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A read-only view of [`NetworkGraph`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ReadOnlyNetworkGraph extends CommonBase {
	ReadOnlyNetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ReadOnlyNetworkGraph_free(ptr); }
	}

	/**
	 * Get network addresses by node id.
	 * Returns None if the requested node is completely unknown,
	 * or if node announcement for the node was never received.
	 */
	public Option_CVec_NetAddressZZ get_addresses(byte[] pubkey) {
		long ret = bindings.ReadOnlyNetworkGraph_get_addresses(this.ptr, InternalUtils.check_arr_len(pubkey, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_CVec_NetAddressZZ ret_hu_conv = Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
