package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeInfo extends CommonBase {
	NodeInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.NodeInfo_free(ptr);
	}

	public void set_channels(long[] val) {
		bindings.NodeInfo_set_channels(this.ptr, val);
	}

	public RoutingFees get_lowest_inbound_channel_fees() {
		long ret = bindings.NodeInfo_get_lowest_inbound_channel_fees(this.ptr);
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		return ret_hu_conv;
	}

	public void set_lowest_inbound_channel_fees(RoutingFees val) {
		bindings.NodeInfo_set_lowest_inbound_channel_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public NodeAnnouncementInfo get_announcement_info() {
		long ret = bindings.NodeInfo_get_announcement_info(this.ptr);
		NodeAnnouncementInfo ret_hu_conv = new NodeAnnouncementInfo(null, ret);
		return ret_hu_conv;
	}

	// Skipped NodeInfo_set_announcement_info
	// Skipped NodeInfo_new
	public byte[] write(NodeInfo obj) {
		byte[] ret = bindings.NodeInfo_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static NodeInfo constructor_read(byte[] ser) {
		long ret = bindings.NodeInfo_read(ser);
		NodeInfo ret_hu_conv = new NodeInfo(null, ret);
		return ret_hu_conv;
	}

}
