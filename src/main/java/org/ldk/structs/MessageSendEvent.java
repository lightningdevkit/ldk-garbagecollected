package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MessageSendEvent extends CommonBase {
	private MessageSendEvent(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MessageSendEvent_free(ptr); }
	}
	static MessageSendEvent constr_from_ptr(long ptr) {
		bindings.LDKMessageSendEvent raw_val = bindings.LDKMessageSendEvent_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendAcceptChannel.class) {
			return new SendAcceptChannel(ptr, (bindings.LDKMessageSendEvent.SendAcceptChannel)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendOpenChannel.class) {
			return new SendOpenChannel(ptr, (bindings.LDKMessageSendEvent.SendOpenChannel)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendFundingCreated.class) {
			return new SendFundingCreated(ptr, (bindings.LDKMessageSendEvent.SendFundingCreated)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendFundingSigned.class) {
			return new SendFundingSigned(ptr, (bindings.LDKMessageSendEvent.SendFundingSigned)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendFundingLocked.class) {
			return new SendFundingLocked(ptr, (bindings.LDKMessageSendEvent.SendFundingLocked)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendAnnouncementSignatures.class) {
			return new SendAnnouncementSignatures(ptr, (bindings.LDKMessageSendEvent.SendAnnouncementSignatures)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.UpdateHTLCs.class) {
			return new UpdateHTLCs(ptr, (bindings.LDKMessageSendEvent.UpdateHTLCs)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendRevokeAndACK.class) {
			return new SendRevokeAndACK(ptr, (bindings.LDKMessageSendEvent.SendRevokeAndACK)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendClosingSigned.class) {
			return new SendClosingSigned(ptr, (bindings.LDKMessageSendEvent.SendClosingSigned)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendShutdown.class) {
			return new SendShutdown(ptr, (bindings.LDKMessageSendEvent.SendShutdown)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendChannelReestablish.class) {
			return new SendChannelReestablish(ptr, (bindings.LDKMessageSendEvent.SendChannelReestablish)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.BroadcastChannelAnnouncement.class) {
			return new BroadcastChannelAnnouncement(ptr, (bindings.LDKMessageSendEvent.BroadcastChannelAnnouncement)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.BroadcastNodeAnnouncement.class) {
			return new BroadcastNodeAnnouncement(ptr, (bindings.LDKMessageSendEvent.BroadcastNodeAnnouncement)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.BroadcastChannelUpdate.class) {
			return new BroadcastChannelUpdate(ptr, (bindings.LDKMessageSendEvent.BroadcastChannelUpdate)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.HandleError.class) {
			return new HandleError(ptr, (bindings.LDKMessageSendEvent.HandleError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.PaymentFailureNetworkUpdate.class) {
			return new PaymentFailureNetworkUpdate(ptr, (bindings.LDKMessageSendEvent.PaymentFailureNetworkUpdate)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendChannelRangeQuery.class) {
			return new SendChannelRangeQuery(ptr, (bindings.LDKMessageSendEvent.SendChannelRangeQuery)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMessageSendEvent.SendShortIdsQuery.class) {
			return new SendShortIdsQuery(ptr, (bindings.LDKMessageSendEvent.SendShortIdsQuery)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class SendAcceptChannel extends MessageSendEvent {
		public final byte[] node_id;
		public final AcceptChannel msg;
		private SendAcceptChannel(long ptr, bindings.LDKMessageSendEvent.SendAcceptChannel obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			AcceptChannel msg_hu_conv = new AcceptChannel(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class SendOpenChannel extends MessageSendEvent {
		public final byte[] node_id;
		public final OpenChannel msg;
		private SendOpenChannel(long ptr, bindings.LDKMessageSendEvent.SendOpenChannel obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			OpenChannel msg_hu_conv = new OpenChannel(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class SendFundingCreated extends MessageSendEvent {
		public final byte[] node_id;
		public final FundingCreated msg;
		private SendFundingCreated(long ptr, bindings.LDKMessageSendEvent.SendFundingCreated obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			FundingCreated msg_hu_conv = new FundingCreated(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class SendFundingSigned extends MessageSendEvent {
		public final byte[] node_id;
		public final FundingSigned msg;
		private SendFundingSigned(long ptr, bindings.LDKMessageSendEvent.SendFundingSigned obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			FundingSigned msg_hu_conv = new FundingSigned(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class SendFundingLocked extends MessageSendEvent {
		public final byte[] node_id;
		public final FundingLocked msg;
		private SendFundingLocked(long ptr, bindings.LDKMessageSendEvent.SendFundingLocked obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			FundingLocked msg_hu_conv = new FundingLocked(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class SendAnnouncementSignatures extends MessageSendEvent {
		public final byte[] node_id;
		public final AnnouncementSignatures msg;
		private SendAnnouncementSignatures(long ptr, bindings.LDKMessageSendEvent.SendAnnouncementSignatures obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			AnnouncementSignatures msg_hu_conv = new AnnouncementSignatures(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class UpdateHTLCs extends MessageSendEvent {
		public final byte[] node_id;
		public final CommitmentUpdate updates;
		private UpdateHTLCs(long ptr, bindings.LDKMessageSendEvent.UpdateHTLCs obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long updates = obj.updates;
			CommitmentUpdate updates_hu_conv = new CommitmentUpdate(null, updates);
			updates_hu_conv.ptrs_to.add(this);
			this.updates = updates_hu_conv;
		}
	}
	public final static class SendRevokeAndACK extends MessageSendEvent {
		public final byte[] node_id;
		public final RevokeAndACK msg;
		private SendRevokeAndACK(long ptr, bindings.LDKMessageSendEvent.SendRevokeAndACK obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			RevokeAndACK msg_hu_conv = new RevokeAndACK(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class SendClosingSigned extends MessageSendEvent {
		public final byte[] node_id;
		public final ClosingSigned msg;
		private SendClosingSigned(long ptr, bindings.LDKMessageSendEvent.SendClosingSigned obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			ClosingSigned msg_hu_conv = new ClosingSigned(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class SendShutdown extends MessageSendEvent {
		public final byte[] node_id;
		public final Shutdown msg;
		private SendShutdown(long ptr, bindings.LDKMessageSendEvent.SendShutdown obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			Shutdown msg_hu_conv = new Shutdown(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class SendChannelReestablish extends MessageSendEvent {
		public final byte[] node_id;
		public final ChannelReestablish msg;
		private SendChannelReestablish(long ptr, bindings.LDKMessageSendEvent.SendChannelReestablish obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			ChannelReestablish msg_hu_conv = new ChannelReestablish(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class BroadcastChannelAnnouncement extends MessageSendEvent {
		public final ChannelAnnouncement msg;
		public final ChannelUpdate update_msg;
		private BroadcastChannelAnnouncement(long ptr, bindings.LDKMessageSendEvent.BroadcastChannelAnnouncement obj) {
			super(null, ptr);
			long msg = obj.msg;
			ChannelAnnouncement msg_hu_conv = new ChannelAnnouncement(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
			long update_msg = obj.update_msg;
			ChannelUpdate update_msg_hu_conv = new ChannelUpdate(null, update_msg);
			update_msg_hu_conv.ptrs_to.add(this);
			this.update_msg = update_msg_hu_conv;
		}
	}
	public final static class BroadcastNodeAnnouncement extends MessageSendEvent {
		public final NodeAnnouncement msg;
		private BroadcastNodeAnnouncement(long ptr, bindings.LDKMessageSendEvent.BroadcastNodeAnnouncement obj) {
			super(null, ptr);
			long msg = obj.msg;
			NodeAnnouncement msg_hu_conv = new NodeAnnouncement(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class BroadcastChannelUpdate extends MessageSendEvent {
		public final ChannelUpdate msg;
		private BroadcastChannelUpdate(long ptr, bindings.LDKMessageSendEvent.BroadcastChannelUpdate obj) {
			super(null, ptr);
			long msg = obj.msg;
			ChannelUpdate msg_hu_conv = new ChannelUpdate(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class HandleError extends MessageSendEvent {
		public final byte[] node_id;
		public final ErrorAction action;
		private HandleError(long ptr, bindings.LDKMessageSendEvent.HandleError obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long action = obj.action;
			ErrorAction action_hu_conv = ErrorAction.constr_from_ptr(action);
			action_hu_conv.ptrs_to.add(this);
			this.action = action_hu_conv;
		}
	}
	public final static class PaymentFailureNetworkUpdate extends MessageSendEvent {
		public final HTLCFailChannelUpdate update;
		private PaymentFailureNetworkUpdate(long ptr, bindings.LDKMessageSendEvent.PaymentFailureNetworkUpdate obj) {
			super(null, ptr);
			long update = obj.update;
			HTLCFailChannelUpdate update_hu_conv = HTLCFailChannelUpdate.constr_from_ptr(update);
			update_hu_conv.ptrs_to.add(this);
			this.update = update_hu_conv;
		}
	}
	public final static class SendChannelRangeQuery extends MessageSendEvent {
		public final byte[] node_id;
		public final QueryChannelRange msg;
		private SendChannelRangeQuery(long ptr, bindings.LDKMessageSendEvent.SendChannelRangeQuery obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			QueryChannelRange msg_hu_conv = new QueryChannelRange(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class SendShortIdsQuery extends MessageSendEvent {
		public final byte[] node_id;
		public final QueryShortChannelIds msg;
		private SendShortIdsQuery(long ptr, bindings.LDKMessageSendEvent.SendShortIdsQuery obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long msg = obj.msg;
			QueryShortChannelIds msg_hu_conv = new QueryShortChannelIds(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
}
