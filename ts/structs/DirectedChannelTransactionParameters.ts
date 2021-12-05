
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class DirectedChannelTransactionParameters extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.DirectedChannelTransactionParameters_free(this.ptr);
                    }
                }
	public ChannelPublicKeys broadcaster_pubkeys() {
		number ret = bindings.DirectedChannelTransactionParameters_broadcaster_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ChannelPublicKeys countersignatory_pubkeys() {
		number ret = bindings.DirectedChannelTransactionParameters_countersignatory_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number contest_delay() {
		number ret = bindings.DirectedChannelTransactionParameters_contest_delay(this.ptr);
		return ret;
	}

	public boolean is_outbound() {
		boolean ret = bindings.DirectedChannelTransactionParameters_is_outbound(this.ptr);
		return ret;
	}

	public OutPoint funding_outpoint() {
		number ret = bindings.DirectedChannelTransactionParameters_funding_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public boolean opt_anchors() {
		boolean ret = bindings.DirectedChannelTransactionParameters_opt_anchors(this.ptr);
		return ret;
	}

}
