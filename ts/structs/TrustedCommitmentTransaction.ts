
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class TrustedCommitmentTransaction extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.TrustedCommitmentTransaction_free(this.ptr);
                    }
                }
	public Uint8Array txid() {
		Uint8Array ret = bindings.TrustedCommitmentTransaction_txid(this.ptr);
		return ret;
	}

	public BuiltCommitmentTransaction built_transaction() {
		number ret = bindings.TrustedCommitmentTransaction_built_transaction(this.ptr);
		const ret_hu_conv: BuiltCommitmentTransaction = new BuiltCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public TxCreationKeys keys() {
		number ret = bindings.TrustedCommitmentTransaction_keys(this.ptr);
		const ret_hu_conv: TxCreationKeys = new TxCreationKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Result_CVec_SignatureZNoneZ get_htlc_sigs(Uint8Array htlc_base_key, DirectedChannelTransactionParameters channel_parameters) {
		number ret = bindings.TrustedCommitmentTransaction_get_htlc_sigs(this.ptr, htlc_base_key, channel_parameters == null ? 0 : channel_parameters.ptr & ~1);
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(channel_parameters);
		return ret_hu_conv;
	}

}
