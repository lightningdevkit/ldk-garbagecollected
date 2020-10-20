package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MessageSendEvent extends CommonBase {
	private MessageSendEvent(Object _dummy, long ptr) { super(ptr); }
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
	static MessageSendEvent constr_from_ptr(long ptr) {
		bindings.LDKMessageSendEvent raw_val = bindings.LDKMessageSendEvent_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendAcceptChannel.class) {
			return new SendAcceptChannel(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendOpenChannel.class) {
			return new SendOpenChannel(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendFundingCreated.class) {
			return new SendFundingCreated(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendFundingSigned.class) {
			return new SendFundingSigned(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendFundingLocked.class) {
			return new SendFundingLocked(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendAnnouncementSignatures.class) {
			return new SendAnnouncementSignatures(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.UpdateHTLCs.class) {
			return new UpdateHTLCs(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendRevokeAndACK.class) {
			return new SendRevokeAndACK(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendClosingSigned.class) {
			return new SendClosingSigned(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendShutdown.class) {
			return new SendShutdown(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendChannelReestablish.class) {
			return new SendChannelReestablish(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.BroadcastChannelAnnouncement.class) {
			return new BroadcastChannelAnnouncement(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.BroadcastNodeAnnouncement.class) {
			return new BroadcastNodeAnnouncement(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.BroadcastChannelUpdate.class) {
			return new BroadcastChannelUpdate(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.HandleError.class) {
			return new HandleError(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.PaymentFailureNetworkUpdate.class) {
			return new PaymentFailureNetworkUpdate(null, ptr);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class SendAcceptChannel extends MessageSendEvent {
		public byte[] node_id;
		public AcceptChannel msg;
		private SendAcceptChannel(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SendOpenChannel extends MessageSendEvent {
		public byte[] node_id;
		public OpenChannel msg;
		private SendOpenChannel(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SendFundingCreated extends MessageSendEvent {
		public byte[] node_id;
		public FundingCreated msg;
		private SendFundingCreated(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SendFundingSigned extends MessageSendEvent {
		public byte[] node_id;
		public FundingSigned msg;
		private SendFundingSigned(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SendFundingLocked extends MessageSendEvent {
		public byte[] node_id;
		public FundingLocked msg;
		private SendFundingLocked(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SendAnnouncementSignatures extends MessageSendEvent {
		public byte[] node_id;
		public AnnouncementSignatures msg;
		private SendAnnouncementSignatures(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class UpdateHTLCs extends MessageSendEvent {
		public byte[] node_id;
		public CommitmentUpdate updates;
		private UpdateHTLCs(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SendRevokeAndACK extends MessageSendEvent {
		public byte[] node_id;
		public RevokeAndACK msg;
		private SendRevokeAndACK(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SendClosingSigned extends MessageSendEvent {
		public byte[] node_id;
		public ClosingSigned msg;
		private SendClosingSigned(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SendShutdown extends MessageSendEvent {
		public byte[] node_id;
		public Shutdown msg;
		private SendShutdown(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SendChannelReestablish extends MessageSendEvent {
		public byte[] node_id;
		public ChannelReestablish msg;
		private SendChannelReestablish(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class BroadcastChannelAnnouncement extends MessageSendEvent {
		public ChannelAnnouncement msg;
		public ChannelUpdate update_msg;
		private BroadcastChannelAnnouncement(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class BroadcastNodeAnnouncement extends MessageSendEvent {
		public NodeAnnouncement msg;
		private BroadcastNodeAnnouncement(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class BroadcastChannelUpdate extends MessageSendEvent {
		public ChannelUpdate msg;
		private BroadcastChannelUpdate(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class HandleError extends MessageSendEvent {
		public byte[] node_id;
		public ErrorAction action;
		private HandleError(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class PaymentFailureNetworkUpdate extends MessageSendEvent {
		public HTLCFailChannelUpdate update;
		private PaymentFailureNetworkUpdate(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}
