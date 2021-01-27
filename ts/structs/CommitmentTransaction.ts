
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class CommitmentTransaction extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.CommitmentTransaction_free(this.ptr);
                    }
                }
	public CommitmentTransaction clone() {
		number ret = bindings.CommitmentTransaction_clone(this.ptr);
		const ret_hu_conv: CommitmentTransaction = new CommitmentTransaction(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.CommitmentTransaction_write(this.ptr);
		return ret;
	}

	public static CommitmentTransaction constructor_read(Uint8Array ser) {
		number ret = bindings.CommitmentTransaction_read(ser);
		const ret_hu_conv: CommitmentTransaction = new CommitmentTransaction(null, ret);
		return ret_hu_conv;
	}

	public number commitment_number() {
		number ret = bindings.CommitmentTransaction_commitment_number(this.ptr);
		return ret;
	}

	public number to_broadcaster_value_sat() {
		number ret = bindings.CommitmentTransaction_to_broadcaster_value_sat(this.ptr);
		return ret;
	}

	public number to_countersignatory_value_sat() {
		number ret = bindings.CommitmentTransaction_to_countersignatory_value_sat(this.ptr);
		return ret;
	}

	public number feerate_per_kw() {
		number ret = bindings.CommitmentTransaction_feerate_per_kw(this.ptr);
		return ret;
	}

	public TrustedCommitmentTransaction trust() {
		number ret = bindings.CommitmentTransaction_trust(this.ptr);
		const ret_hu_conv: TrustedCommitmentTransaction = new TrustedCommitmentTransaction(null, ret);
		return ret_hu_conv;
	}

	public Result_TrustedCommitmentTransactionNoneZ verify(DirectedChannelTransactionParameters channel_parameters, ChannelPublicKeys broadcaster_keys, ChannelPublicKeys countersignatory_keys) {
		number ret = bindings.CommitmentTransaction_verify(this.ptr, channel_parameters == null ? 0 : channel_parameters.ptr & ~1, broadcaster_keys == null ? 0 : broadcaster_keys.ptr & ~1, countersignatory_keys == null ? 0 : countersignatory_keys.ptr & ~1);
		Result_TrustedCommitmentTransactionNoneZ ret_hu_conv = Result_TrustedCommitmentTransactionNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(channel_parameters);
		this.ptrs_to.add(broadcaster_keys);
		this.ptrs_to.add(countersignatory_keys);
		return ret_hu_conv;
	}

}
