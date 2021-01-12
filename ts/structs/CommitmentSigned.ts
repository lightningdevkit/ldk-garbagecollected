
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class CommitmentSigned extends CommonBase {
	CommitmentSigned(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CommitmentSigned_free(ptr); }
	}

	public CommitmentSigned clone() {
		uint32_t ret = bindings.CommitmentSigned_clone(this.ptr);
		CommitmentSigned ret_hu_conv = new CommitmentSigned(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.CommitmentSigned_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.CommitmentSigned_set_channel_id(this.ptr, val);
	}

	public byte[] get_signature() {
		byte[] ret = bindings.CommitmentSigned_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(byte[] val) {
		bindings.CommitmentSigned_set_signature(this.ptr, val);
	}

	public void set_htlc_signatures(byte[][] val) {
		bindings.CommitmentSigned_set_htlc_signatures(this.ptr, val);
	}

	public static CommitmentSigned constructor_new(byte[] channel_id_arg, byte[] signature_arg, byte[][] htlc_signatures_arg) {
		uint32_t ret = bindings.CommitmentSigned_new(channel_id_arg, signature_arg, htlc_signatures_arg);
		CommitmentSigned ret_hu_conv = new CommitmentSigned(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.CommitmentSigned_write(this.ptr);
		return ret;
	}

	public static CommitmentSigned constructor_read(byte[] ser) {
		uint32_t ret = bindings.CommitmentSigned_read(ser);
		CommitmentSigned ret_hu_conv = new CommitmentSigned(null, ret);
		return ret_hu_conv;
	}

}
