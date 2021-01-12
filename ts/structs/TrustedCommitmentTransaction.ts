
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class TrustedCommitmentTransaction extends CommonBase {
	TrustedCommitmentTransaction(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TrustedCommitmentTransaction_free(ptr); }
	}

	public byte[] txid() {
		byte[] ret = bindings.TrustedCommitmentTransaction_txid(this.ptr);
		return ret;
	}

	public BuiltCommitmentTransaction built_transaction() {
		uint32_t ret = bindings.TrustedCommitmentTransaction_built_transaction(this.ptr);
		BuiltCommitmentTransaction ret_hu_conv = new BuiltCommitmentTransaction(null, ret);
		return ret_hu_conv;
	}

	public TxCreationKeys keys() {
		uint32_t ret = bindings.TrustedCommitmentTransaction_keys(this.ptr);
		TxCreationKeys ret_hu_conv = new TxCreationKeys(null, ret);
		return ret_hu_conv;
	}

	public Result_CVec_SignatureZNoneZ get_htlc_sigs(byte[] htlc_base_key, DirectedChannelTransactionParameters channel_parameters) {
		uint32_t ret = bindings.TrustedCommitmentTransaction_get_htlc_sigs(this.ptr, htlc_base_key, channel_parameters == null ? 0 : channel_parameters.ptr & ~1);
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(channel_parameters);
		return ret_hu_conv;
	}

}
