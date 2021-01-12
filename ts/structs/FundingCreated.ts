
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class FundingCreated extends CommonBase {
	FundingCreated(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FundingCreated_free(ptr); }
	}

	public FundingCreated clone() {
		uint32_t ret = bindings.FundingCreated_clone(this.ptr);
		FundingCreated ret_hu_conv = new FundingCreated(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_temporary_channel_id() {
		byte[] ret = bindings.FundingCreated_get_temporary_channel_id(this.ptr);
		return ret;
	}

	public void set_temporary_channel_id(byte[] val) {
		bindings.FundingCreated_set_temporary_channel_id(this.ptr, val);
	}

	public byte[] get_funding_txid() {
		byte[] ret = bindings.FundingCreated_get_funding_txid(this.ptr);
		return ret;
	}

	public void set_funding_txid(byte[] val) {
		bindings.FundingCreated_set_funding_txid(this.ptr, val);
	}

	public short get_funding_output_index() {
		short ret = bindings.FundingCreated_get_funding_output_index(this.ptr);
		return ret;
	}

	public void set_funding_output_index(short val) {
		bindings.FundingCreated_set_funding_output_index(this.ptr, val);
	}

	public byte[] get_signature() {
		byte[] ret = bindings.FundingCreated_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(byte[] val) {
		bindings.FundingCreated_set_signature(this.ptr, val);
	}

	public static FundingCreated constructor_new(byte[] temporary_channel_id_arg, byte[] funding_txid_arg, short funding_output_index_arg, byte[] signature_arg) {
		uint32_t ret = bindings.FundingCreated_new(temporary_channel_id_arg, funding_txid_arg, funding_output_index_arg, signature_arg);
		FundingCreated ret_hu_conv = new FundingCreated(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.FundingCreated_write(this.ptr);
		return ret;
	}

	public static FundingCreated constructor_read(byte[] ser) {
		uint32_t ret = bindings.FundingCreated_read(ser);
		FundingCreated ret_hu_conv = new FundingCreated(null, ret);
		return ret_hu_conv;
	}

}
