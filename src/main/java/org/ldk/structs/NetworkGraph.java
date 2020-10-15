package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

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

	public NetworkGraph(byte[] ser) {
		super(bindings.NetworkGraph_read(ser));
	}

	public NetworkGraph() {
		super(bindings.NetworkGraph_new());
	}

	public void close_channel_from_update(long short_channel_id, boolean is_permanent) {
		bindings.NetworkGraph_close_channel_from_update(this.ptr, short_channel_id, is_permanent);
	}

}
