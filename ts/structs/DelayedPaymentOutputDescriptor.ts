
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class DelayedPaymentOutputDescriptor extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.DelayedPaymentOutputDescriptor_free(this.ptr);
                    }
                }
	public OutPoint get_outpoint() {
		number ret = bindings.DelayedPaymentOutputDescriptor_get_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_outpoint(OutPoint val) {
		bindings.DelayedPaymentOutputDescriptor_set_outpoint(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public Uint8Array get_per_commitment_point() {
		Uint8Array ret = bindings.DelayedPaymentOutputDescriptor_get_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_per_commitment_point(Uint8Array val) {
		bindings.DelayedPaymentOutputDescriptor_set_per_commitment_point(this.ptr, val);
	}

	public number get_to_self_delay() {
		number ret = bindings.DelayedPaymentOutputDescriptor_get_to_self_delay(this.ptr);
		return ret;
	}

	public void set_to_self_delay(number val) {
		bindings.DelayedPaymentOutputDescriptor_set_to_self_delay(this.ptr, val);
	}

	public void set_output(TxOut val) {
		bindings.DelayedPaymentOutputDescriptor_set_output(this.ptr, val.ptr);
	}

	public Uint8Array get_revocation_pubkey() {
		Uint8Array ret = bindings.DelayedPaymentOutputDescriptor_get_revocation_pubkey(this.ptr);
		return ret;
	}

	public void set_revocation_pubkey(Uint8Array val) {
		bindings.DelayedPaymentOutputDescriptor_set_revocation_pubkey(this.ptr, val);
	}

	public Uint8Array get_channel_keys_id() {
		Uint8Array ret = bindings.DelayedPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
		return ret;
	}

	public void set_channel_keys_id(Uint8Array val) {
		bindings.DelayedPaymentOutputDescriptor_set_channel_keys_id(this.ptr, val);
	}

	public number get_channel_value_satoshis() {
		number ret = bindings.DelayedPaymentOutputDescriptor_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	public void set_channel_value_satoshis(number val) {
		bindings.DelayedPaymentOutputDescriptor_set_channel_value_satoshis(this.ptr, val);
	}

	public static DelayedPaymentOutputDescriptor constructor_new(OutPoint outpoint_arg, Uint8Array per_commitment_point_arg, number to_self_delay_arg, TxOut output_arg, Uint8Array revocation_pubkey_arg, Uint8Array channel_keys_id_arg, number channel_value_satoshis_arg) {
		number ret = bindings.DelayedPaymentOutputDescriptor_new(outpoint_arg == null ? 0 : outpoint_arg.ptr & ~1, per_commitment_point_arg, to_self_delay_arg, output_arg.ptr, revocation_pubkey_arg, channel_keys_id_arg, channel_value_satoshis_arg);
		const ret_hu_conv: DelayedPaymentOutputDescriptor = new DelayedPaymentOutputDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(outpoint_arg);
		return ret_hu_conv;
	}

	public DelayedPaymentOutputDescriptor clone() {
		number ret = bindings.DelayedPaymentOutputDescriptor_clone(this.ptr);
		const ret_hu_conv: DelayedPaymentOutputDescriptor = new DelayedPaymentOutputDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.DelayedPaymentOutputDescriptor_write(this.ptr);
		return ret;
	}

	public static Result_DelayedPaymentOutputDescriptorDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.DelayedPaymentOutputDescriptor_read(ser);
		Result_DelayedPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_DelayedPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
