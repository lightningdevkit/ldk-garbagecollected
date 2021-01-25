
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class HTLCFailChannelUpdate extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.HTLCFailChannelUpdate_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): HTLCFailChannelUpdate {
		const raw_val: bindings.LDKHTLCFailChannelUpdate = bindings.LDKHTLCFailChannelUpdate_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKHTLCFailChannelUpdate.ChannelUpdateMessage) {
			return new ChannelUpdateMessage(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKHTLCFailChannelUpdate.ChannelClosed) {
			return new ChannelClosed(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKHTLCFailChannelUpdate.NodeFailure) {
			return new NodeFailure(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class ChannelUpdateMessage extends HTLCFailChannelUpdate {
	public msg: ChannelUpdate;
	private constructor(ptr: number, obj: bindings.LDKHTLCFailChannelUpdate.ChannelUpdateMessage) {
		super(null, ptr);
		const msg: number = obj.msg;
		const msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, msg);
		this.msg = msg_hu_conv;
	}
}
export class ChannelClosed extends HTLCFailChannelUpdate {
	public short_channel_id: number;
	public is_permanent: boolean;
	private constructor(ptr: number, obj: bindings.LDKHTLCFailChannelUpdate.ChannelClosed) {
		super(null, ptr);
		this.short_channel_id = obj.short_channel_id;
		this.is_permanent = obj.is_permanent;
	}
}
export class NodeFailure extends HTLCFailChannelUpdate {
	public node_id: Uint8Array;
	public is_permanent: boolean;
	private constructor(ptr: number, obj: bindings.LDKHTLCFailChannelUpdate.NodeFailure) {
		super(null, ptr);
		this.node_id = obj.node_id;
		this.is_permanent = obj.is_permanent;
	}
}
