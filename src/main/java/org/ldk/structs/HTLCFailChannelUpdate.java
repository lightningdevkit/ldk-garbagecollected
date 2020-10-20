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
		bindings.HTLCFailChannelUpdate_free(ptr);
	}
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
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
		public ChannelUpdate msg;
		private ChannelUpdateMessage(long ptr, bindings.LDKHTLCFailChannelUpdate.ChannelUpdateMessage obj) {
			super(null, ptr);
			long msg = obj.msg;
			ChannelUpdate msg_hu_conv = new ChannelUpdate(null, msg);
			this.msg = msg_hu_conv;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class ChannelClosed extends HTLCFailChannelUpdate {
		public long short_channel_id;
		public boolean is_permanent;
		private ChannelClosed(long ptr, bindings.LDKHTLCFailChannelUpdate.ChannelClosed obj) {
			super(null, ptr);
			this.short_channel_id = obj.short_channel_id;
			this.is_permanent = obj.is_permanent;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class NodeFailure extends HTLCFailChannelUpdate {
		public byte[] node_id;
		public boolean is_permanent;
		private NodeFailure(long ptr, bindings.LDKHTLCFailChannelUpdate.NodeFailure obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			this.is_permanent = obj.is_permanent;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}
