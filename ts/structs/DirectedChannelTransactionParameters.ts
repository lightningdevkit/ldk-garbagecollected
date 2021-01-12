
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class DirectedChannelTransactionParameters extends CommonBase {
	DirectedChannelTransactionParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DirectedChannelTransactionParameters_free(ptr); }
	}

	public ChannelPublicKeys broadcaster_pubkeys() {
		uint32_t ret = bindings.DirectedChannelTransactionParameters_broadcaster_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

	public ChannelPublicKeys countersignatory_pubkeys() {
		uint32_t ret = bindings.DirectedChannelTransactionParameters_countersignatory_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

	public short contest_delay() {
		short ret = bindings.DirectedChannelTransactionParameters_contest_delay(this.ptr);
		return ret;
	}

	public boolean is_outbound() {
		boolean ret = bindings.DirectedChannelTransactionParameters_is_outbound(this.ptr);
		return ret;
	}

	public OutPoint funding_outpoint() {
		uint32_t ret = bindings.DirectedChannelTransactionParameters_funding_outpoint(this.ptr);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		return ret_hu_conv;
	}

}
