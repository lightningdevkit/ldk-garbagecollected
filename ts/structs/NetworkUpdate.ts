
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class NetworkUpdate extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.NetworkUpdate_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): NetworkUpdate {
		const raw_val: bindings.LDKNetworkUpdate = bindings.LDKNetworkUpdate_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKNetworkUpdate.ChannelUpdateMessage) {
			return new ChannelUpdateMessage(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKNetworkUpdate.ChannelClosed) {
			return new ChannelClosed(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKNetworkUpdate.NodeFailure) {
			return new NodeFailure(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class ChannelUpdateMessage extends NetworkUpdate {
	public msg: ChannelUpdate;
	private constructor(ptr: number, obj: bindings.LDKNetworkUpdate.ChannelUpdateMessage) {
		super(null, ptr);
		const msg: number = obj.msg;
		const msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class ChannelClosed extends NetworkUpdate {
	public short_channel_id: number;
	public is_permanent: boolean;
	private constructor(ptr: number, obj: bindings.LDKNetworkUpdate.ChannelClosed) {
		super(null, ptr);
		this.short_channel_id = obj.short_channel_id;
		this.is_permanent = obj.is_permanent;
	}
}
export class NodeFailure extends NetworkUpdate {
	public node_id: Uint8Array;
	public is_permanent: boolean;
	private constructor(ptr: number, obj: bindings.LDKNetworkUpdate.NodeFailure) {
		super(null, ptr);
		this.node_id = obj.node_id;
		this.is_permanent = obj.is_permanent;
	}
}
	public NetworkUpdate clone() {
		number ret = bindings.NetworkUpdate_clone(this.ptr);
		NetworkUpdate ret_hu_conv = NetworkUpdate.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static NetworkUpdate constructor_channel_update_message(ChannelUpdate msg) {
		number ret = bindings.NetworkUpdate_channel_update_message(msg == null ? 0 : msg.ptr & ~1);
		NetworkUpdate ret_hu_conv = NetworkUpdate.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public static NetworkUpdate constructor_channel_closed(number short_channel_id, boolean is_permanent) {
		number ret = bindings.NetworkUpdate_channel_closed(short_channel_id, is_permanent);
		NetworkUpdate ret_hu_conv = NetworkUpdate.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static NetworkUpdate constructor_node_failure(Uint8Array node_id, boolean is_permanent) {
		number ret = bindings.NetworkUpdate_node_failure(node_id, is_permanent);
		NetworkUpdate ret_hu_conv = NetworkUpdate.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.NetworkUpdate_write(this.ptr);
		return ret;
	}

}
