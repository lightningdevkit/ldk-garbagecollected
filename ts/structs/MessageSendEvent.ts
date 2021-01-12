
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class MessageSendEvent extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.MessageSendEvent_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): MessageSendEvent {
		const raw_val: bindings.LDKMessageSendEvent = bindings.LDKMessageSendEvent_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendAcceptChannel) {
			return new SendAcceptChannel(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendOpenChannel) {
			return new SendOpenChannel(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendFundingCreated) {
			return new SendFundingCreated(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendFundingSigned) {
			return new SendFundingSigned(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendFundingLocked) {
			return new SendFundingLocked(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendAnnouncementSignatures) {
			return new SendAnnouncementSignatures(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.UpdateHTLCs) {
			return new UpdateHTLCs(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendRevokeAndACK) {
			return new SendRevokeAndACK(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendClosingSigned) {
			return new SendClosingSigned(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendShutdown) {
			return new SendShutdown(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendChannelReestablish) {
			return new SendChannelReestablish(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.BroadcastChannelAnnouncement) {
			return new BroadcastChannelAnnouncement(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.BroadcastNodeAnnouncement) {
			return new BroadcastNodeAnnouncement(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.BroadcastChannelUpdate) {
			return new BroadcastChannelUpdate(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.HandleError) {
			return new HandleError(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.PaymentFailureNetworkUpdate) {
			return new PaymentFailureNetworkUpdate(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendChannelRangeQuery) {
			return new SendChannelRangeQuery(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendShortIdsQuery) {
			return new SendShortIdsQuery(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class SendAcceptChannel extends MessageSendEvent {
	public node_id: byte[];
	public msg: AcceptChannel;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendAcceptChannel) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		AcceptChannel msg_hu_conv = new AcceptChannel(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class SendOpenChannel extends MessageSendEvent {
	public node_id: byte[];
	public msg: OpenChannel;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendOpenChannel) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		OpenChannel msg_hu_conv = new OpenChannel(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class SendFundingCreated extends MessageSendEvent {
	public node_id: byte[];
	public msg: FundingCreated;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendFundingCreated) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		FundingCreated msg_hu_conv = new FundingCreated(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class SendFundingSigned extends MessageSendEvent {
	public node_id: byte[];
	public msg: FundingSigned;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendFundingSigned) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		FundingSigned msg_hu_conv = new FundingSigned(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class SendFundingLocked extends MessageSendEvent {
	public node_id: byte[];
	public msg: FundingLocked;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendFundingLocked) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		FundingLocked msg_hu_conv = new FundingLocked(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class SendAnnouncementSignatures extends MessageSendEvent {
	public node_id: byte[];
	public msg: AnnouncementSignatures;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendAnnouncementSignatures) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		AnnouncementSignatures msg_hu_conv = new AnnouncementSignatures(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class UpdateHTLCs extends MessageSendEvent {
	public node_id: byte[];
	public updates: CommitmentUpdate;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.UpdateHTLCs) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const updates: uint32_t = obj.updates;
		CommitmentUpdate updates_hu_conv = new CommitmentUpdate(null, updates);
		this.updates = updates_hu_conv;
	}
}
export class SendRevokeAndACK extends MessageSendEvent {
	public node_id: byte[];
	public msg: RevokeAndACK;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendRevokeAndACK) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		RevokeAndACK msg_hu_conv = new RevokeAndACK(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class SendClosingSigned extends MessageSendEvent {
	public node_id: byte[];
	public msg: ClosingSigned;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendClosingSigned) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		ClosingSigned msg_hu_conv = new ClosingSigned(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class SendShutdown extends MessageSendEvent {
	public node_id: byte[];
	public msg: Shutdown;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendShutdown) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		Shutdown msg_hu_conv = new Shutdown(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class SendChannelReestablish extends MessageSendEvent {
	public node_id: byte[];
	public msg: ChannelReestablish;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendChannelReestablish) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		ChannelReestablish msg_hu_conv = new ChannelReestablish(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class BroadcastChannelAnnouncement extends MessageSendEvent {
	public msg: ChannelAnnouncement;
	public update_msg: ChannelUpdate;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.BroadcastChannelAnnouncement) {
		super(null, ptr);
		const msg: uint32_t = obj.msg;
		ChannelAnnouncement msg_hu_conv = new ChannelAnnouncement(null, msg);
		this.msg = msg_hu_conv;
		const update_msg: uint32_t = obj.update_msg;
		ChannelUpdate update_msg_hu_conv = new ChannelUpdate(null, update_msg);
		this.update_msg = update_msg_hu_conv;
	}
}
export class BroadcastNodeAnnouncement extends MessageSendEvent {
	public msg: NodeAnnouncement;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.BroadcastNodeAnnouncement) {
		super(null, ptr);
		const msg: uint32_t = obj.msg;
		NodeAnnouncement msg_hu_conv = new NodeAnnouncement(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class BroadcastChannelUpdate extends MessageSendEvent {
	public msg: ChannelUpdate;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.BroadcastChannelUpdate) {
		super(null, ptr);
		const msg: uint32_t = obj.msg;
		ChannelUpdate msg_hu_conv = new ChannelUpdate(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class HandleError extends MessageSendEvent {
	public node_id: byte[];
	public action: ErrorAction;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.HandleError) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const action: uint32_t = obj.action;
		ErrorAction action_hu_conv = ErrorAction.constr_from_ptr(action);
			action_hu_conv.ptrs_to.add(this);
		this.action = action_hu_conv;
	}
}
export class PaymentFailureNetworkUpdate extends MessageSendEvent {
	public update: HTLCFailChannelUpdate;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.PaymentFailureNetworkUpdate) {
		super(null, ptr);
		const update: uint32_t = obj.update;
		HTLCFailChannelUpdate update_hu_conv = HTLCFailChannelUpdate.constr_from_ptr(update);
			update_hu_conv.ptrs_to.add(this);
		this.update = update_hu_conv;
	}
}
export class SendChannelRangeQuery extends MessageSendEvent {
	public node_id: byte[];
	public msg: QueryChannelRange;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendChannelRangeQuery) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		QueryChannelRange msg_hu_conv = new QueryChannelRange(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class SendShortIdsQuery extends MessageSendEvent {
	public node_id: byte[];
	public msg: QueryShortChannelIds;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendShortIdsQuery) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: uint32_t = obj.msg;
		QueryShortChannelIds msg_hu_conv = new QueryShortChannelIds(null, msg);
		this.msg = msg_hu_conv;
	}
}
