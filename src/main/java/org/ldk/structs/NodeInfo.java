package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class NodeInfo extends CommonBase {
	NodeInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.NodeInfo_free(ptr); super.finalize();
	}

	// Skipped NodeInfo_set_channels
	public RoutingFees get_lowest_inbound_channel_fees(NodeInfo this_ptr) {
		RoutingFees ret = new RoutingFees(null, bindings.NodeInfo_get_lowest_inbound_channel_fees(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_lowest_inbound_channel_fees(NodeInfo this_ptr, RoutingFees val) {
		bindings.NodeInfo_set_lowest_inbound_channel_fees(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public NodeAnnouncementInfo get_announcement_info(NodeInfo this_ptr) {
		NodeAnnouncementInfo ret = new NodeAnnouncementInfo(null, bindings.NodeInfo_get_announcement_info(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_announcement_info(NodeInfo this_ptr, NodeAnnouncementInfo val) {
		bindings.NodeInfo_set_announcement_info(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	// Skipped NodeInfo_new
	// Skipped NodeInfo_write
	// Skipped NodeInfo_read
}
