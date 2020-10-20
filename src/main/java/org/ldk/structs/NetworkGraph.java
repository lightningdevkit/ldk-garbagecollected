package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NetworkGraph extends CommonBase {
	NetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.NetworkGraph_free(ptr);
	}

	public byte[] write(NetworkGraph obj) {
		byte[] ret = bindings.NetworkGraph_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static NetworkGraph constructor_read(byte[] ser) {
		long ret = bindings.NetworkGraph_read(ser);
		NetworkGraph ret_hu_conv = new NetworkGraph(null, ret);
		return ret_hu_conv;
	}

	public static NetworkGraph constructor_new() {
		long ret = bindings.NetworkGraph_new();
		NetworkGraph ret_hu_conv = new NetworkGraph(null, ret);
		return ret_hu_conv;
	}

	public void close_channel_from_update(long short_channel_id, boolean is_permanent) {
		bindings.NetworkGraph_close_channel_from_update(this.ptr, short_channel_id, is_permanent);
	}

}
