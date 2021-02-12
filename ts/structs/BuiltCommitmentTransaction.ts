
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class BuiltCommitmentTransaction extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.BuiltCommitmentTransaction_free(this.ptr);
                    }
                }
	public Uint8Array get_transaction() {
		Uint8Array ret = bindings.BuiltCommitmentTransaction_get_transaction(this.ptr);
		return ret;
	}

	public void set_transaction(Uint8Array val) {
		bindings.BuiltCommitmentTransaction_set_transaction(this.ptr, val);
	}

	public Uint8Array get_txid() {
		Uint8Array ret = bindings.BuiltCommitmentTransaction_get_txid(this.ptr);
		return ret;
	}

	public void set_txid(Uint8Array val) {
		bindings.BuiltCommitmentTransaction_set_txid(this.ptr, val);
	}

	public static BuiltCommitmentTransaction constructor_new(Uint8Array transaction_arg, Uint8Array txid_arg) {
		number ret = bindings.BuiltCommitmentTransaction_new(transaction_arg, txid_arg);
		const ret_hu_conv: BuiltCommitmentTransaction = new BuiltCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public BuiltCommitmentTransaction clone() {
		number ret = bindings.BuiltCommitmentTransaction_clone(this.ptr);
		const ret_hu_conv: BuiltCommitmentTransaction = new BuiltCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.BuiltCommitmentTransaction_write(this.ptr);
		return ret;
	}

	public static Result_BuiltCommitmentTransactionDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.BuiltCommitmentTransaction_read(ser);
		Result_BuiltCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_BuiltCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Uint8Array get_sighash_all(Uint8Array funding_redeemscript, number channel_value_satoshis) {
		Uint8Array ret = bindings.BuiltCommitmentTransaction_get_sighash_all(this.ptr, funding_redeemscript, channel_value_satoshis);
		return ret;
	}

	public Uint8Array sign(Uint8Array funding_key, Uint8Array funding_redeemscript, number channel_value_satoshis) {
		Uint8Array ret = bindings.BuiltCommitmentTransaction_sign(this.ptr, funding_key, funding_redeemscript, channel_value_satoshis);
		return ret;
	}

}
