
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class OutPoint extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.OutPoint_free(this.ptr);
                    }
                }
	public Uint8Array get_txid() {
		Uint8Array ret = bindings.OutPoint_get_txid(this.ptr);
		return ret;
	}

	public void set_txid(Uint8Array val) {
		bindings.OutPoint_set_txid(this.ptr, val);
	}

	public number get_index() {
		number ret = bindings.OutPoint_get_index(this.ptr);
		return ret;
	}

	public void set_index(number val) {
		bindings.OutPoint_set_index(this.ptr, val);
	}

	public static OutPoint constructor_new(Uint8Array txid_arg, number index_arg) {
		number ret = bindings.OutPoint_new(txid_arg, index_arg);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public OutPoint clone() {
		number ret = bindings.OutPoint_clone(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public boolean eq(OutPoint b) {
		boolean ret = bindings.OutPoint_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public number hash() {
		number ret = bindings.OutPoint_hash(this.ptr);
		return ret;
	}

	public Uint8Array to_channel_id() {
		Uint8Array ret = bindings.OutPoint_to_channel_id(this.ptr);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.OutPoint_write(this.ptr);
		return ret;
	}

	public static Result_OutPointDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.OutPoint_read(ser);
		Result_OutPointDecodeErrorZ ret_hu_conv = Result_OutPointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
