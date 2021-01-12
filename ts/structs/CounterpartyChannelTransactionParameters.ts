
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class CounterpartyChannelTransactionParameters extends CommonBase {
	CounterpartyChannelTransactionParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CounterpartyChannelTransactionParameters_free(ptr); }
	}

	public CounterpartyChannelTransactionParameters clone() {
		uint32_t ret = bindings.CounterpartyChannelTransactionParameters_clone(this.ptr);
		CounterpartyChannelTransactionParameters ret_hu_conv = new CounterpartyChannelTransactionParameters(null, ret);
		return ret_hu_conv;
	}

	public ChannelPublicKeys get_pubkeys() {
		uint32_t ret = bindings.CounterpartyChannelTransactionParameters_get_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

	public void set_pubkeys(ChannelPublicKeys val) {
		bindings.CounterpartyChannelTransactionParameters_set_pubkeys(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public short get_selected_contest_delay() {
		short ret = bindings.CounterpartyChannelTransactionParameters_get_selected_contest_delay(this.ptr);
		return ret;
	}

	public void set_selected_contest_delay(short val) {
		bindings.CounterpartyChannelTransactionParameters_set_selected_contest_delay(this.ptr, val);
	}

	public static CounterpartyChannelTransactionParameters constructor_new(ChannelPublicKeys pubkeys_arg, short selected_contest_delay_arg) {
		uint32_t ret = bindings.CounterpartyChannelTransactionParameters_new(pubkeys_arg == null ? 0 : pubkeys_arg.ptr & ~1, selected_contest_delay_arg);
		CounterpartyChannelTransactionParameters ret_hu_conv = new CounterpartyChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(pubkeys_arg);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.CounterpartyChannelTransactionParameters_write(this.ptr);
		return ret;
	}

	public static CounterpartyChannelTransactionParameters constructor_read(byte[] ser) {
		uint32_t ret = bindings.CounterpartyChannelTransactionParameters_read(ser);
		CounterpartyChannelTransactionParameters ret_hu_conv = new CounterpartyChannelTransactionParameters(null, ret);
		return ret_hu_conv;
	}

}
