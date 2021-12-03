
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class RoutingMessageHandler extends CommonBase {

                bindings_instance?: bindings.LDKRoutingMessageHandler;

                constructor(ptr?: number, arg?: bindings.LDKRoutingMessageHandler, messageSendEventsProvider?: bindings.LDKMessageSendEventsProvider) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKRoutingMessageHandler_new(arg, messageSendEventsProvider));
				        this.ptrs_to.push(arg);
				        this.ptrs_to.push(messageSendEventsProvider);

				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.RoutingMessageHandler_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: RoutingMessageHandlerInterface, messageSendEventsProvider_impl: MessageSendEventsProvider.MessageSendEventsProviderInterface): RoutingMessageHandler {
                    const impl_holder: LDKRoutingMessageHandlerHolder = new LDKRoutingMessageHandlerHolder();
                    let structImplementation = <bindings.LDKRoutingMessageHandler>{
                        // todo: in-line interface filling
                        handle_node_announcement (msg: number): number {
							const msg_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, msg);
							Result_boolLightningErrorZ ret = arg.handle_node_announcement(msg_hu_conv);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						handle_channel_announcement (msg: number): number {
							const msg_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, msg);
							Result_boolLightningErrorZ ret = arg.handle_channel_announcement(msg_hu_conv);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						handle_channel_update (msg: number): number {
							const msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, msg);
							Result_boolLightningErrorZ ret = arg.handle_channel_update(msg_hu_conv);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						get_next_channel_announcements (starting_point: number, batch_amount: number): number[] {
							ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[] ret = arg.get_next_channel_announcements(starting_point, batch_amount);
				result: number[] = ret != null ? Arrays.stream(ret).map(ret_conv_59 -> ret_conv_59 == null ? 0 : ret_conv_59.clone_ptr()).toArray(number[]::new) : null;
				return result;
						},

						get_next_node_announcements (starting_point: Uint8Array, batch_amount: number): number[] {
							NodeAnnouncement[] ret = arg.get_next_node_announcements(starting_point, batch_amount);
				result: number[] = ret != null ? Arrays.stream(ret).map(ret_conv_18 -> ret_conv_18 == null ? 0 : ret_conv_18.clone_ptr()).toArray(number[]::new) : null;
				return result;
						},

						sync_routing_table (their_node_id: Uint8Array, init: number): void {
							const init_hu_conv: Init = new Init(null, init);
							arg.sync_routing_table(their_node_id, init_hu_conv);
						},

						handle_reply_channel_range (their_node_id: Uint8Array, msg: number): number {
							const msg_hu_conv: ReplyChannelRange = new ReplyChannelRange(null, msg);
				msg_hu_conv.ptrs_to.add(this);
							Result_NoneLightningErrorZ ret = arg.handle_reply_channel_range(their_node_id, msg_hu_conv);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						handle_reply_short_channel_ids_end (their_node_id: Uint8Array, msg: number): number {
							const msg_hu_conv: ReplyShortChannelIdsEnd = new ReplyShortChannelIdsEnd(null, msg);
				msg_hu_conv.ptrs_to.add(this);
							Result_NoneLightningErrorZ ret = arg.handle_reply_short_channel_ids_end(their_node_id, msg_hu_conv);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						handle_query_channel_range (their_node_id: Uint8Array, msg: number): number {
							const msg_hu_conv: QueryChannelRange = new QueryChannelRange(null, msg);
				msg_hu_conv.ptrs_to.add(this);
							Result_NoneLightningErrorZ ret = arg.handle_query_channel_range(their_node_id, msg_hu_conv);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						handle_query_short_channel_ids (their_node_id: Uint8Array, msg: number): number {
							const msg_hu_conv: QueryShortChannelIds = new QueryShortChannelIds(null, msg);
				msg_hu_conv.ptrs_to.add(this);
							Result_NoneLightningErrorZ ret = arg.handle_query_short_channel_ids(their_node_id, msg_hu_conv);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						
                    };
                    impl_holder.held = new RoutingMessageHandler (null, structImplementation, MessageSendEventsProvider.new_impl(MessageSendEventsProvider_impl).bindings_instance);
                }
            }

            export interface RoutingMessageHandlerInterface {
                handle_node_announcement(msg: NodeAnnouncement): Result_boolLightningErrorZ;
				handle_channel_announcement(msg: ChannelAnnouncement): Result_boolLightningErrorZ;
				handle_channel_update(msg: ChannelUpdate): Result_boolLightningErrorZ;
				get_next_channel_announcements(starting_point: number, batch_amount: number): ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[];
				get_next_node_announcements(starting_point: Uint8Array, batch_amount: number): NodeAnnouncement[];
				sync_routing_table(their_node_id: Uint8Array, init: Init): void;
				handle_reply_channel_range(their_node_id: Uint8Array, msg: ReplyChannelRange): Result_NoneLightningErrorZ;
				handle_reply_short_channel_ids_end(their_node_id: Uint8Array, msg: ReplyShortChannelIdsEnd): Result_NoneLightningErrorZ;
				handle_query_channel_range(their_node_id: Uint8Array, msg: QueryChannelRange): Result_NoneLightningErrorZ;
				handle_query_short_channel_ids(their_node_id: Uint8Array, msg: QueryShortChannelIds): Result_NoneLightningErrorZ;
				
            }

            class LDKRoutingMessageHandlerHolder {
                held: RoutingMessageHandler;
            }
	public Result_boolLightningErrorZ handle_node_announcement(NodeAnnouncement msg) {
		number ret = bindings.RoutingMessageHandler_handle_node_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_boolLightningErrorZ handle_channel_announcement(ChannelAnnouncement msg) {
		number ret = bindings.RoutingMessageHandler_handle_channel_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_boolLightningErrorZ handle_channel_update(ChannelUpdate msg) {
		number ret = bindings.RoutingMessageHandler_handle_channel_update(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[] get_next_channel_announcements(number starting_point, number batch_amount) {
		number[] ret = bindings.RoutingMessageHandler_get_next_channel_announcements(this.ptr, starting_point, batch_amount);
		ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[] ret_conv_59_arr = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[ret.length];
		for (int h = 0; h < ret.length; h++) {
			number ret_conv_59 = ret[h];
			ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ ret_conv_59_hu_conv = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, ret_conv_59);
			ret_conv_59_hu_conv.ptrs_to.add(this);
			ret_conv_59_arr[h] = ret_conv_59_hu_conv;
		}
		return ret_conv_59_arr;
	}

	public NodeAnnouncement[] get_next_node_announcements(Uint8Array starting_point, number batch_amount) {
		number[] ret = bindings.RoutingMessageHandler_get_next_node_announcements(this.ptr, InternalUtils.check_arr_len(starting_point, 33), batch_amount);
		NodeAnnouncement[] ret_conv_18_arr = new NodeAnnouncement[ret.length];
		for (int s = 0; s < ret.length; s++) {
			number ret_conv_18 = ret[s];
			const ret_conv_18_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, ret_conv_18);
			ret_conv_18_hu_conv.ptrs_to.add(this);
			ret_conv_18_arr[s] = ret_conv_18_hu_conv;
		}
		return ret_conv_18_arr;
	}

	public void sync_routing_table(Uint8Array their_node_id, Init init) {
		bindings.RoutingMessageHandler_sync_routing_table(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), init == null ? 0 : init.ptr & ~1);
		this.ptrs_to.add(init);
	}

	public Result_NoneLightningErrorZ handle_reply_channel_range(Uint8Array their_node_id, ReplyChannelRange msg) {
		number ret = bindings.RoutingMessageHandler_handle_reply_channel_range(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ handle_reply_short_channel_ids_end(Uint8Array their_node_id, ReplyShortChannelIdsEnd msg) {
		number ret = bindings.RoutingMessageHandler_handle_reply_short_channel_ids_end(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ handle_query_channel_range(Uint8Array their_node_id, QueryChannelRange msg) {
		number ret = bindings.RoutingMessageHandler_handle_query_channel_range(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ handle_query_short_channel_ids(Uint8Array their_node_id, QueryShortChannelIds msg) {
		number ret = bindings.RoutingMessageHandler_handle_query_short_channel_ids(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
