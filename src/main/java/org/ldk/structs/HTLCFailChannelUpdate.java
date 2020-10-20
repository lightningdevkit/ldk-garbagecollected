package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HTLCFailChannelUpdate extends CommonBase {
	private HTLCFailChannelUpdate(Object _dummy, long ptr) { super(ptr); }
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
	static HTLCFailChannelUpdate constr_from_ptr(long ptr) {
		bindings.LDKHTLCFailChannelUpdate raw_val = bindings.LDKHTLCFailChannelUpdate_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKHTLCFailChannelUpdate.ChannelUpdateMessage.class) {
			return new ChannelUpdateMessage(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKHTLCFailChannelUpdate.ChannelClosed.class) {
			return new ChannelClosed(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKHTLCFailChannelUpdate.NodeFailure.class) {
			return new NodeFailure(null, ptr);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class ChannelUpdateMessage extends HTLCFailChannelUpdate {
		public ChannelUpdate msg;
		private ChannelUpdateMessage(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class ChannelClosed extends HTLCFailChannelUpdate {
		public long short_channel_id;
		public boolean is_permanent;
		private ChannelClosed(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class NodeFailure extends HTLCFailChannelUpdate {
		public byte[] node_id;
		public boolean is_permanent;
		private NodeFailure(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}
