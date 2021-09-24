
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ClosingTransaction extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ClosingTransaction_free(this.ptr);
                    }
                }
	public static ClosingTransaction constructor_new(number to_holder_value_sat, number to_counterparty_value_sat, Uint8Array to_holder_script, Uint8Array to_counterparty_script, OutPoint funding_outpoint) {
		number ret = bindings.ClosingTransaction_new(to_holder_value_sat, to_counterparty_value_sat, to_holder_script, to_counterparty_script, funding_outpoint == null ? 0 : funding_outpoint.ptr & ~1);
		const ret_hu_conv: ClosingTransaction = new ClosingTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(funding_outpoint);
		return ret_hu_conv;
	}

	public TrustedClosingTransaction trust() {
		number ret = bindings.ClosingTransaction_trust(this.ptr);
		const ret_hu_conv: TrustedClosingTransaction = new TrustedClosingTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Result_TrustedClosingTransactionNoneZ verify(OutPoint funding_outpoint) {
		number ret = bindings.ClosingTransaction_verify(this.ptr, funding_outpoint == null ? 0 : funding_outpoint.ptr & ~1);
		Result_TrustedClosingTransactionNoneZ ret_hu_conv = Result_TrustedClosingTransactionNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(funding_outpoint);
		return ret_hu_conv;
	}

	public number to_holder_value_sat() {
		number ret = bindings.ClosingTransaction_to_holder_value_sat(this.ptr);
		return ret;
	}

	public number to_counterparty_value_sat() {
		number ret = bindings.ClosingTransaction_to_counterparty_value_sat(this.ptr);
		return ret;
	}

	public Uint8Array to_holder_script() {
		Uint8Array ret = bindings.ClosingTransaction_to_holder_script(this.ptr);
		return ret;
	}

	public Uint8Array to_counterparty_script() {
		Uint8Array ret = bindings.ClosingTransaction_to_counterparty_script(this.ptr);
		return ret;
	}

}
