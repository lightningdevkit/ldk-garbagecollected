
            
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
	public Uint8Array get_counterparty_sig() {
		Uint8Array ret = bindings.HolderCommitmentTransaction_get_counterparty_sig(this.ptr);
		return ret;
	}

	public void set_counterparty_sig(Uint8Array val) {
		bindings.HolderCommitmentTransaction_set_counterparty_sig(this.ptr, InternalUtils.check_arr_len(val, 64));
	}

	public void set_counterparty_htlc_sigs(Uint8Array[] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_htlc_sigs(this.ptr, val != null ? Arrays.stream(val).map(val_conv_12 -> InternalUtils.check_arr_len(val_conv_12, 64)).toArray(Uint8Array[]::new) : null);
	}

	public number clone_ptr() {
		number ret = bindings.HolderCommitmentTransaction_clone_ptr(this.ptr);
		return ret;
	}

	public HolderCommitmentTransaction clone() {
		number ret = bindings.HolderCommitmentTransaction_clone(this.ptr);
		const ret_hu_conv: HolderCommitmentTransaction = new HolderCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.HolderCommitmentTransaction_write(this.ptr);
		return ret;
	}

	public static Result_HolderCommitmentTransactionDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.HolderCommitmentTransaction_read(ser);
		Result_HolderCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_HolderCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static HolderCommitmentTransaction constructor_new(CommitmentTransaction commitment_tx, Uint8Array counterparty_sig, Uint8Array[] counterparty_htlc_sigs, Uint8Array holder_funding_key, Uint8Array counterparty_funding_key) {
		number ret = bindings.HolderCommitmentTransaction_new(commitment_tx == null ? 0 : commitment_tx.ptr & ~1, InternalUtils.check_arr_len(counterparty_sig, 64), counterparty_htlc_sigs != null ? Arrays.stream(counterparty_htlc_sigs).map(counterparty_htlc_sigs_conv_12 -> InternalUtils.check_arr_len(counterparty_htlc_sigs_conv_12, 64)).toArray(Uint8Array[]::new) : null, InternalUtils.check_arr_len(holder_funding_key, 33), InternalUtils.check_arr_len(counterparty_funding_key, 33));
		const ret_hu_conv: HolderCommitmentTransaction = new HolderCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
