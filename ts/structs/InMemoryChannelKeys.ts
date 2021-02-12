
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class InMemoryChannelKeys extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.InMemoryChannelKeys_free(this.ptr);
                    }
                }
	public Uint8Array get_funding_key() {
		Uint8Array ret = bindings.InMemoryChannelKeys_get_funding_key(this.ptr);
		return ret;
	}

	public void set_funding_key(Uint8Array val) {
		bindings.InMemoryChannelKeys_set_funding_key(this.ptr, val);
	}

	public Uint8Array get_revocation_base_key() {
		Uint8Array ret = bindings.InMemoryChannelKeys_get_revocation_base_key(this.ptr);
		return ret;
	}

	public void set_revocation_base_key(Uint8Array val) {
		bindings.InMemoryChannelKeys_set_revocation_base_key(this.ptr, val);
	}

	public Uint8Array get_payment_key() {
		Uint8Array ret = bindings.InMemoryChannelKeys_get_payment_key(this.ptr);
		return ret;
	}

	public void set_payment_key(Uint8Array val) {
		bindings.InMemoryChannelKeys_set_payment_key(this.ptr, val);
	}

	public Uint8Array get_delayed_payment_base_key() {
		Uint8Array ret = bindings.InMemoryChannelKeys_get_delayed_payment_base_key(this.ptr);
		return ret;
	}

	public void set_delayed_payment_base_key(Uint8Array val) {
		bindings.InMemoryChannelKeys_set_delayed_payment_base_key(this.ptr, val);
	}

	public Uint8Array get_htlc_base_key() {
		Uint8Array ret = bindings.InMemoryChannelKeys_get_htlc_base_key(this.ptr);
		return ret;
	}

	public void set_htlc_base_key(Uint8Array val) {
		bindings.InMemoryChannelKeys_set_htlc_base_key(this.ptr, val);
	}

	public Uint8Array get_commitment_seed() {
		Uint8Array ret = bindings.InMemoryChannelKeys_get_commitment_seed(this.ptr);
		return ret;
	}

	public void set_commitment_seed(Uint8Array val) {
		bindings.InMemoryChannelKeys_set_commitment_seed(this.ptr, val);
	}

	public InMemoryChannelKeys clone() {
		number ret = bindings.InMemoryChannelKeys_clone(this.ptr);
		const ret_hu_conv: InMemoryChannelKeys = new InMemoryChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static InMemoryChannelKeys constructor_new(Uint8Array funding_key, Uint8Array revocation_base_key, Uint8Array payment_key, Uint8Array delayed_payment_base_key, Uint8Array htlc_base_key, Uint8Array commitment_seed, number channel_value_satoshis, TwoTuple<Number, Number> key_derivation_params) {
		number ret = bindings.InMemoryChannelKeys_new(funding_key, revocation_base_key, payment_key, delayed_payment_base_key, htlc_base_key, commitment_seed, channel_value_satoshis, bindings.C2Tuple_u64u64Z_new(key_derivation_params.a, key_derivation_params.b));
		const ret_hu_conv: InMemoryChannelKeys = new InMemoryChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public ChannelPublicKeys counterparty_pubkeys() {
		number ret = bindings.InMemoryChannelKeys_counterparty_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number counterparty_selected_contest_delay() {
		number ret = bindings.InMemoryChannelKeys_counterparty_selected_contest_delay(this.ptr);
		return ret;
	}

	public number holder_selected_contest_delay() {
		number ret = bindings.InMemoryChannelKeys_holder_selected_contest_delay(this.ptr);
		return ret;
	}

	public boolean is_outbound() {
		boolean ret = bindings.InMemoryChannelKeys_is_outbound(this.ptr);
		return ret;
	}

	public OutPoint funding_outpoint() {
		number ret = bindings.InMemoryChannelKeys_funding_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ChannelTransactionParameters get_channel_parameters() {
		number ret = bindings.InMemoryChannelKeys_get_channel_parameters(this.ptr);
		const ret_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ChannelKeys as_ChannelKeys() {
		number ret = bindings.InMemoryChannelKeys_as_ChannelKeys(this.ptr);
		ChannelKeys ret_hu_conv = new ChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.InMemoryChannelKeys_write(this.ptr);
		return ret;
	}

	public static Result_InMemoryChannelKeysDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.InMemoryChannelKeys_read(ser);
		Result_InMemoryChannelKeysDecodeErrorZ ret_hu_conv = Result_InMemoryChannelKeysDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
