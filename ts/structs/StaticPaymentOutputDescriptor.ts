
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class StaticPaymentOutputDescriptor extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.StaticPaymentOutputDescriptor_free(this.ptr);
                    }
                }
	public OutPoint get_outpoint() {
		number ret = bindings.StaticPaymentOutputDescriptor_get_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_outpoint(OutPoint val) {
		bindings.StaticPaymentOutputDescriptor_set_outpoint(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public void set_output(TxOut val) {
		bindings.StaticPaymentOutputDescriptor_set_output(this.ptr, val.ptr);
	}

	public Uint8Array get_channel_keys_id() {
		Uint8Array ret = bindings.StaticPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
		return ret;
	}

	public void set_channel_keys_id(Uint8Array val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_keys_id(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	public number get_channel_value_satoshis() {
		number ret = bindings.StaticPaymentOutputDescriptor_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	public void set_channel_value_satoshis(number val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_value_satoshis(this.ptr, val);
	}

	public static StaticPaymentOutputDescriptor constructor_new(OutPoint outpoint_arg, TxOut output_arg, Uint8Array channel_keys_id_arg, number channel_value_satoshis_arg) {
		number ret = bindings.StaticPaymentOutputDescriptor_new(outpoint_arg == null ? 0 : outpoint_arg.ptr & ~1, output_arg.ptr, InternalUtils.check_arr_len(channel_keys_id_arg, 32), channel_value_satoshis_arg);
		const ret_hu_conv: StaticPaymentOutputDescriptor = new StaticPaymentOutputDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.StaticPaymentOutputDescriptor_clone_ptr(this.ptr);
		return ret;
	}

	public StaticPaymentOutputDescriptor clone() {
		number ret = bindings.StaticPaymentOutputDescriptor_clone(this.ptr);
		const ret_hu_conv: StaticPaymentOutputDescriptor = new StaticPaymentOutputDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.StaticPaymentOutputDescriptor_write(this.ptr);
		return ret;
	}

	public static Result_StaticPaymentOutputDescriptorDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.StaticPaymentOutputDescriptor_read(ser);
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
