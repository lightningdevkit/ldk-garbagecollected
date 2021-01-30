package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HTLCFailChannelUpdate extends CommonBase {
	private HTLCFailChannelUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HTLCFailChannelUpdate_free(ptr); }
	}
	static HTLCFailChannelUpdate constr_from_ptr(long ptr) {
		bindings.LDKHTLCFailChannelUpdate raw_val = bindings.LDKHTLCFailChannelUpdate_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKHTLCFailChannelUpdate.ChannelUpdateMessage.class) {
			return new ChannelUpdateMessage(ptr, (bindings.LDKHTLCFailChannelUpdate.ChannelUpdateMessage)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHTLCFailChannelUpdate.ChannelClosed.class) {
			return new ChannelClosed(ptr, (bindings.LDKHTLCFailChannelUpdate.ChannelClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHTLCFailChannelUpdate.NodeFailure.class) {
			return new NodeFailure(ptr, (bindings.LDKHTLCFailChannelUpdate.NodeFailure)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class ChannelUpdateMessage extends HTLCFailChannelUpdate {
		public final ChannelUpdate msg;
		private ChannelUpdateMessage(long ptr, bindings.LDKHTLCFailChannelUpdate.ChannelUpdateMessage obj) {
			super(null, ptr);
			long msg = obj.msg;
			ChannelUpdate msg_hu_conv = new ChannelUpdate(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class ChannelClosed extends HTLCFailChannelUpdate {
		public final long short_channel_id;
		public final boolean is_permanent;
		private ChannelClosed(long ptr, bindings.LDKHTLCFailChannelUpdate.ChannelClosed obj) {
			super(null, ptr);
			this.short_channel_id = obj.short_channel_id;
			this.is_permanent = obj.is_permanent;
		}
	}
	public final static class NodeFailure extends HTLCFailChannelUpdate {
		public final byte[] node_id;
		public final boolean is_permanent;
		private NodeFailure(long ptr, bindings.LDKHTLCFailChannelUpdate.NodeFailure obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			this.is_permanent = obj.is_permanent;
		}
	}
}
