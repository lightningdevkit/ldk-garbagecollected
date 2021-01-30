
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class HolderCommitmentTransaction extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.HolderCommitmentTransaction_free(this.ptr);
                    }
                }
	public HolderCommitmentTransaction clone() {
		number ret = bindings.HolderCommitmentTransaction_clone(this.ptr);
		const ret_hu_conv: HolderCommitmentTransaction = new HolderCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_counterparty_sig() {
		Uint8Array ret = bindings.HolderCommitmentTransaction_get_counterparty_sig(this.ptr);
		return ret;
	}

	public void set_counterparty_sig(Uint8Array val) {
		bindings.HolderCommitmentTransaction_set_counterparty_sig(this.ptr, val);
	}

	public void set_counterparty_htlc_sigs(Uint8Array[] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_htlc_sigs(this.ptr, val);
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.HolderCommitmentTransaction_write(this.ptr);
		return ret;
	}

	public static HolderCommitmentTransaction constructor_read(Uint8Array ser) {
		number ret = bindings.HolderCommitmentTransaction_read(ser);
		const ret_hu_conv: HolderCommitmentTransaction = new HolderCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static HolderCommitmentTransaction constructor_new(CommitmentTransaction commitment_tx, Uint8Array counterparty_sig, Uint8Array[] counterparty_htlc_sigs, Uint8Array holder_funding_key, Uint8Array counterparty_funding_key) {
		number ret = bindings.HolderCommitmentTransaction_new(commitment_tx == null ? 0 : commitment_tx.ptr & ~1, counterparty_sig, counterparty_htlc_sigs, holder_funding_key, counterparty_funding_key);
		const ret_hu_conv: HolderCommitmentTransaction = new HolderCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(commitment_tx);
		return ret_hu_conv;
	}

}
