
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class RevokeAndACK extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.RevokeAndACK_free(this.ptr);
                    }
                }
	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.RevokeAndACK_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.RevokeAndACK_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	public Uint8Array get_per_commitment_secret() {
		Uint8Array ret = bindings.RevokeAndACK_get_per_commitment_secret(this.ptr);
		return ret;
	}

	public void set_per_commitment_secret(Uint8Array val) {
		bindings.RevokeAndACK_set_per_commitment_secret(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	public Uint8Array get_next_per_commitment_point() {
		Uint8Array ret = bindings.RevokeAndACK_get_next_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_next_per_commitment_point(Uint8Array val) {
		bindings.RevokeAndACK_set_next_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
	}

	public static RevokeAndACK constructor_new(Uint8Array channel_id_arg, Uint8Array per_commitment_secret_arg, Uint8Array next_per_commitment_point_arg) {
		number ret = bindings.RevokeAndACK_new(InternalUtils.check_arr_len(channel_id_arg, 32), InternalUtils.check_arr_len(per_commitment_secret_arg, 32), InternalUtils.check_arr_len(next_per_commitment_point_arg, 33));
		const ret_hu_conv: RevokeAndACK = new RevokeAndACK(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.RevokeAndACK_clone_ptr(this.ptr);
		return ret;
	}

	public RevokeAndACK clone() {
		number ret = bindings.RevokeAndACK_clone(this.ptr);
		const ret_hu_conv: RevokeAndACK = new RevokeAndACK(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.RevokeAndACK_write(this.ptr);
		return ret;
	}

	public static Result_RevokeAndACKDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.RevokeAndACK_read(ser);
		Result_RevokeAndACKDecodeErrorZ ret_hu_conv = Result_RevokeAndACKDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
