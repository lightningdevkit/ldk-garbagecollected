
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class TrustedClosingTransaction extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.TrustedClosingTransaction_free(this.ptr);
                    }
                }
	public Uint8Array built_transaction() {
		Uint8Array ret = bindings.TrustedClosingTransaction_built_transaction(this.ptr);
		return ret;
	}

	public Uint8Array get_sighash_all(Uint8Array funding_redeemscript, number channel_value_satoshis) {
		Uint8Array ret = bindings.TrustedClosingTransaction_get_sighash_all(this.ptr, funding_redeemscript, channel_value_satoshis);
		return ret;
	}

	public Uint8Array sign(Uint8Array funding_key, Uint8Array funding_redeemscript, number channel_value_satoshis) {
		Uint8Array ret = bindings.TrustedClosingTransaction_sign(this.ptr, InternalUtils.check_arr_len(funding_key, 32), funding_redeemscript, channel_value_satoshis);
		return ret;
	}

}
