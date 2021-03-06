
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class InMemorySigner extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.InMemorySigner_free(this.ptr);
                    }
                }
	public Uint8Array get_funding_key() {
		Uint8Array ret = bindings.InMemorySigner_get_funding_key(this.ptr);
		return ret;
	}

	public void set_funding_key(Uint8Array val) {
		bindings.InMemorySigner_set_funding_key(this.ptr, val);
	}

	public Uint8Array get_revocation_base_key() {
		Uint8Array ret = bindings.InMemorySigner_get_revocation_base_key(this.ptr);
		return ret;
	}

	public void set_revocation_base_key(Uint8Array val) {
		bindings.InMemorySigner_set_revocation_base_key(this.ptr, val);
	}

	public Uint8Array get_payment_key() {
		Uint8Array ret = bindings.InMemorySigner_get_payment_key(this.ptr);
		return ret;
	}

	public void set_payment_key(Uint8Array val) {
		bindings.InMemorySigner_set_payment_key(this.ptr, val);
	}

	public Uint8Array get_delayed_payment_base_key() {
		Uint8Array ret = bindings.InMemorySigner_get_delayed_payment_base_key(this.ptr);
		return ret;
	}

	public void set_delayed_payment_base_key(Uint8Array val) {
		bindings.InMemorySigner_set_delayed_payment_base_key(this.ptr, val);
	}

	public Uint8Array get_htlc_base_key() {
		Uint8Array ret = bindings.InMemorySigner_get_htlc_base_key(this.ptr);
		return ret;
	}

	public void set_htlc_base_key(Uint8Array val) {
		bindings.InMemorySigner_set_htlc_base_key(this.ptr, val);
	}

	public Uint8Array get_commitment_seed() {
		Uint8Array ret = bindings.InMemorySigner_get_commitment_seed(this.ptr);
		return ret;
	}

	public void set_commitment_seed(Uint8Array val) {
		bindings.InMemorySigner_set_commitment_seed(this.ptr, val);
	}

	public InMemorySigner clone() {
		number ret = bindings.InMemorySigner_clone(this.ptr);
		const ret_hu_conv: InMemorySigner = new InMemorySigner(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static InMemorySigner constructor_new(Uint8Array funding_key, Uint8Array revocation_base_key, Uint8Array payment_key, Uint8Array delayed_payment_base_key, Uint8Array htlc_base_key, Uint8Array commitment_seed, number channel_value_satoshis, Uint8Array channel_keys_id) {
		number ret = bindings.InMemorySigner_new(funding_key, revocation_base_key, payment_key, delayed_payment_base_key, htlc_base_key, commitment_seed, channel_value_satoshis, channel_keys_id);
		const ret_hu_conv: InMemorySigner = new InMemorySigner(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public ChannelPublicKeys counterparty_pubkeys() {
		number ret = bindings.InMemorySigner_counterparty_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number counterparty_selected_contest_delay() {
		number ret = bindings.InMemorySigner_counterparty_selected_contest_delay(this.ptr);
		return ret;
	}

	public number holder_selected_contest_delay() {
		number ret = bindings.InMemorySigner_holder_selected_contest_delay(this.ptr);
		return ret;
	}

	public boolean is_outbound() {
		boolean ret = bindings.InMemorySigner_is_outbound(this.ptr);
		return ret;
	}

	public OutPoint funding_outpoint() {
		number ret = bindings.InMemorySigner_funding_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ChannelTransactionParameters get_channel_parameters() {
		number ret = bindings.InMemorySigner_get_channel_parameters(this.ptr);
		const ret_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Result_CVec_CVec_u8ZZNoneZ sign_counterparty_payment_input(Uint8Array spend_tx, number input_idx, StaticPaymentOutputDescriptor descriptor) {
		number ret = bindings.InMemorySigner_sign_counterparty_payment_input(this.ptr, spend_tx, input_idx, descriptor == null ? 0 : descriptor.ptr & ~1);
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	public Result_CVec_CVec_u8ZZNoneZ sign_dynamic_p2wsh_input(Uint8Array spend_tx, number input_idx, DelayedPaymentOutputDescriptor descriptor) {
		number ret = bindings.InMemorySigner_sign_dynamic_p2wsh_input(this.ptr, spend_tx, input_idx, descriptor == null ? 0 : descriptor.ptr & ~1);
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	public Sign as_Sign() {
		number ret = bindings.InMemorySigner_as_Sign(this.ptr);
		Sign ret_hu_conv = new Sign(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.InMemorySigner_write(this.ptr);
		return ret;
	}

	public static Result_InMemorySignerDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.InMemorySigner_read(ser);
		Result_InMemorySignerDecodeErrorZ ret_hu_conv = Result_InMemorySignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
