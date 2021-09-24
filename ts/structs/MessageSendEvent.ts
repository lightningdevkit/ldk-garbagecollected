
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
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendChannelUpdate) {
			return new SendChannelUpdate(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.HandleError) {
			return new HandleError(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendChannelRangeQuery) {
			return new SendChannelRangeQuery(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendShortIdsQuery) {
			return new SendShortIdsQuery(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMessageSendEvent.SendReplyChannelRange) {
			return new SendReplyChannelRange(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class SendAcceptChannel extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: AcceptChannel;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendAcceptChannel) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: AcceptChannel = new AcceptChannel(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendOpenChannel extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: OpenChannel;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendOpenChannel) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: OpenChannel = new OpenChannel(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendFundingCreated extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: FundingCreated;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendFundingCreated) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: FundingCreated = new FundingCreated(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendFundingSigned extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: FundingSigned;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendFundingSigned) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: FundingSigned = new FundingSigned(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendFundingLocked extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: FundingLocked;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendFundingLocked) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: FundingLocked = new FundingLocked(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendAnnouncementSignatures extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: AnnouncementSignatures;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendAnnouncementSignatures) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class UpdateHTLCs extends MessageSendEvent {
	public node_id: Uint8Array;
	public updates: CommitmentUpdate;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.UpdateHTLCs) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const updates: number = obj.updates;
		const updates_hu_conv: CommitmentUpdate = new CommitmentUpdate(null, updates);
			updates_hu_conv.ptrs_to.add(this);
		this.updates = updates_hu_conv;
	}
}
export class SendRevokeAndACK extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: RevokeAndACK;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendRevokeAndACK) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: RevokeAndACK = new RevokeAndACK(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendClosingSigned extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: ClosingSigned;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendClosingSigned) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: ClosingSigned = new ClosingSigned(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendShutdown extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: Shutdown;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendShutdown) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: Shutdown = new Shutdown(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendChannelReestablish extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: ChannelReestablish;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendChannelReestablish) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: ChannelReestablish = new ChannelReestablish(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class BroadcastChannelAnnouncement extends MessageSendEvent {
	public msg: ChannelAnnouncement;
	public update_msg: ChannelUpdate;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.BroadcastChannelAnnouncement) {
		super(null, ptr);
		const msg: number = obj.msg;
		const msg_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
		const update_msg: number = obj.update_msg;
		const update_msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, update_msg);
			update_msg_hu_conv.ptrs_to.add(this);
		this.update_msg = update_msg_hu_conv;
	}
}
export class BroadcastNodeAnnouncement extends MessageSendEvent {
	public msg: NodeAnnouncement;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.BroadcastNodeAnnouncement) {
		super(null, ptr);
		const msg: number = obj.msg;
		const msg_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class BroadcastChannelUpdate extends MessageSendEvent {
	public msg: ChannelUpdate;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.BroadcastChannelUpdate) {
		super(null, ptr);
		const msg: number = obj.msg;
		const msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendChannelUpdate extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: ChannelUpdate;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendChannelUpdate) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class HandleError extends MessageSendEvent {
	public node_id: Uint8Array;
	public action: ErrorAction;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.HandleError) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const action: number = obj.action;
		ErrorAction action_hu_conv = ErrorAction.constr_from_ptr(action);
			action_hu_conv.ptrs_to.add(this);
		this.action = action_hu_conv;
	}
}
export class SendChannelRangeQuery extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: QueryChannelRange;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendChannelRangeQuery) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: QueryChannelRange = new QueryChannelRange(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendShortIdsQuery extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: QueryShortChannelIds;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendShortIdsQuery) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: QueryShortChannelIds = new QueryShortChannelIds(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class SendReplyChannelRange extends MessageSendEvent {
	public node_id: Uint8Array;
	public msg: ReplyChannelRange;
	private constructor(ptr: number, obj: bindings.LDKMessageSendEvent.SendReplyChannelRange) {
		super(null, ptr);
		this.node_id = obj.node_id;
		const msg: number = obj.msg;
		const msg_hu_conv: ReplyChannelRange = new ReplyChannelRange(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
	public MessageSendEvent clone() {
		number ret = bindings.MessageSendEvent_clone(this.ptr);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_accept_channel(Uint8Array node_id, AcceptChannel msg) {
		number ret = bindings.MessageSendEvent_send_accept_channel(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_open_channel(Uint8Array node_id, OpenChannel msg) {
		number ret = bindings.MessageSendEvent_send_open_channel(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_funding_created(Uint8Array node_id, FundingCreated msg) {
		number ret = bindings.MessageSendEvent_send_funding_created(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_funding_signed(Uint8Array node_id, FundingSigned msg) {
		number ret = bindings.MessageSendEvent_send_funding_signed(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_funding_locked(Uint8Array node_id, FundingLocked msg) {
		number ret = bindings.MessageSendEvent_send_funding_locked(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_announcement_signatures(Uint8Array node_id, AnnouncementSignatures msg) {
		number ret = bindings.MessageSendEvent_send_announcement_signatures(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_update_htlcs(Uint8Array node_id, CommitmentUpdate updates) {
		number ret = bindings.MessageSendEvent_update_htlcs(node_id, updates == null ? 0 : updates.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(updates);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_revoke_and_ack(Uint8Array node_id, RevokeAndACK msg) {
		number ret = bindings.MessageSendEvent_send_revoke_and_ack(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_closing_signed(Uint8Array node_id, ClosingSigned msg) {
		number ret = bindings.MessageSendEvent_send_closing_signed(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_shutdown(Uint8Array node_id, Shutdown msg) {
		number ret = bindings.MessageSendEvent_send_shutdown(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_channel_reestablish(Uint8Array node_id, ChannelReestablish msg) {
		number ret = bindings.MessageSendEvent_send_channel_reestablish(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_broadcast_channel_announcement(ChannelAnnouncement msg, ChannelUpdate update_msg) {
		number ret = bindings.MessageSendEvent_broadcast_channel_announcement(msg == null ? 0 : msg.ptr & ~1, update_msg == null ? 0 : update_msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		ret_hu_conv.ptrs_to.add(update_msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_broadcast_node_announcement(NodeAnnouncement msg) {
		number ret = bindings.MessageSendEvent_broadcast_node_announcement(msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_broadcast_channel_update(ChannelUpdate msg) {
		number ret = bindings.MessageSendEvent_broadcast_channel_update(msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_channel_update(Uint8Array node_id, ChannelUpdate msg) {
		number ret = bindings.MessageSendEvent_send_channel_update(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_handle_error(Uint8Array node_id, ErrorAction action) {
		number ret = bindings.MessageSendEvent_handle_error(node_id, action.ptr);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_channel_range_query(Uint8Array node_id, QueryChannelRange msg) {
		number ret = bindings.MessageSendEvent_send_channel_range_query(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_short_ids_query(Uint8Array node_id, QueryShortChannelIds msg) {
		number ret = bindings.MessageSendEvent_send_short_ids_query(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static MessageSendEvent constructor_send_reply_channel_range(Uint8Array node_id, ReplyChannelRange msg) {
		number ret = bindings.MessageSendEvent_send_reply_channel_range(node_id, msg == null ? 0 : msg.ptr & ~1);
		MessageSendEvent ret_hu_conv = MessageSendEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

}
