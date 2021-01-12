
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Filter extends CommonBase {
	final bindings.LDKFilter bindings_instance;
	Filter(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Filter(bindings.LDKFilter arg) {
		super(bindings.LDKFilter_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Filter_free(ptr); } super.finalize();
	}

	public static interface FilterInterface {
		void register_tx(byte[] txid, byte[] script_pubkey);
		void register_output(OutPoint outpoint, byte[] script_pubkey);
	}
	private static class LDKFilterHolder { Filter held; }
	public static Filter new_impl(FilterInterface arg) {
		final LDKFilterHolder impl_holder = new LDKFilterHolder();
		impl_holder.held = new Filter(new bindings.LDKFilter() {
			@Override public void register_tx(byte[] txid, byte[] script_pubkey) {
				arg.register_tx(txid, script_pubkey);
			}
			@Override public void register_output(uint32_t outpoint, byte[] script_pubkey) {
				OutPoint outpoint_hu_conv = new OutPoint(null, outpoint);
				arg.register_output(outpoint_hu_conv, script_pubkey);
			}
		});
		return impl_holder.held;
	}
	public void register_tx(byte[] txid, byte[] script_pubkey) {
		bindings.Filter_register_tx(this.ptr, txid, script_pubkey);
	}

	public void register_output(OutPoint outpoint, byte[] script_pubkey) {
		bindings.Filter_register_output(this.ptr, outpoint == null ? 0 : outpoint.ptr & ~1, script_pubkey);
		this.ptrs_to.add(outpoint);
	}

}
