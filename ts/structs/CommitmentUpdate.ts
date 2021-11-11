
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class CommitmentUpdate extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.CommitmentUpdate_free(this.ptr);
                    }
                }
	public UpdateAddHTLC[] get_update_add_htlcs() {
		number[] ret = bindings.CommitmentUpdate_get_update_add_htlcs(this.ptr);
		UpdateAddHTLC[] ret_conv_15_arr = new UpdateAddHTLC[ret.length];
		for (int p = 0; p < ret.length; p++) {
			number ret_conv_15 = ret[p];
			const ret_conv_15_hu_conv: UpdateAddHTLC = new UpdateAddHTLC(null, ret_conv_15);
			ret_conv_15_hu_conv.ptrs_to.add(this);
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		return ret_conv_15_arr;
	}

	public void set_update_add_htlcs(UpdateAddHTLC[] val) {
		bindings.CommitmentUpdate_set_update_add_htlcs(this.ptr, val != null ? Arrays.stream(val).map(val_conv_15 -> val_conv_15 == null ? 0 : val_conv_15.ptr & ~1).toArray(number[]::new) : null);
	}

	public UpdateFulfillHTLC[] get_update_fulfill_htlcs() {
		number[] ret = bindings.CommitmentUpdate_get_update_fulfill_htlcs(this.ptr);
		UpdateFulfillHTLC[] ret_conv_19_arr = new UpdateFulfillHTLC[ret.length];
		for (int t = 0; t < ret.length; t++) {
			number ret_conv_19 = ret[t];
			const ret_conv_19_hu_conv: UpdateFulfillHTLC = new UpdateFulfillHTLC(null, ret_conv_19);
			ret_conv_19_hu_conv.ptrs_to.add(this);
			ret_conv_19_arr[t] = ret_conv_19_hu_conv;
		}
		return ret_conv_19_arr;
	}

	public void set_update_fulfill_htlcs(UpdateFulfillHTLC[] val) {
		bindings.CommitmentUpdate_set_update_fulfill_htlcs(this.ptr, val != null ? Arrays.stream(val).map(val_conv_19 -> val_conv_19 == null ? 0 : val_conv_19.ptr & ~1).toArray(number[]::new) : null);
	}

	public UpdateFailHTLC[] get_update_fail_htlcs() {
		number[] ret = bindings.CommitmentUpdate_get_update_fail_htlcs(this.ptr);
		UpdateFailHTLC[] ret_conv_16_arr = new UpdateFailHTLC[ret.length];
		for (int q = 0; q < ret.length; q++) {
			number ret_conv_16 = ret[q];
			const ret_conv_16_hu_conv: UpdateFailHTLC = new UpdateFailHTLC(null, ret_conv_16);
			ret_conv_16_hu_conv.ptrs_to.add(this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	public void set_update_fail_htlcs(UpdateFailHTLC[] val) {
		bindings.CommitmentUpdate_set_update_fail_htlcs(this.ptr, val != null ? Arrays.stream(val).map(val_conv_16 -> val_conv_16 == null ? 0 : val_conv_16.ptr & ~1).toArray(number[]::new) : null);
	}

	public UpdateFailMalformedHTLC[] get_update_fail_malformed_htlcs() {
		number[] ret = bindings.CommitmentUpdate_get_update_fail_malformed_htlcs(this.ptr);
		UpdateFailMalformedHTLC[] ret_conv_25_arr = new UpdateFailMalformedHTLC[ret.length];
		for (int z = 0; z < ret.length; z++) {
			number ret_conv_25 = ret[z];
			const ret_conv_25_hu_conv: UpdateFailMalformedHTLC = new UpdateFailMalformedHTLC(null, ret_conv_25);
			ret_conv_25_hu_conv.ptrs_to.add(this);
			ret_conv_25_arr[z] = ret_conv_25_hu_conv;
		}
		return ret_conv_25_arr;
	}

	public void set_update_fail_malformed_htlcs(UpdateFailMalformedHTLC[] val) {
		bindings.CommitmentUpdate_set_update_fail_malformed_htlcs(this.ptr, val != null ? Arrays.stream(val).map(val_conv_25 -> val_conv_25 == null ? 0 : val_conv_25.ptr & ~1).toArray(number[]::new) : null);
	}

	public UpdateFee get_update_fee() {
		number ret = bindings.CommitmentUpdate_get_update_fee(this.ptr);
		const ret_hu_conv: UpdateFee = new UpdateFee(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_update_fee(UpdateFee val) {
		bindings.CommitmentUpdate_set_update_fee(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public CommitmentSigned get_commitment_signed() {
		number ret = bindings.CommitmentUpdate_get_commitment_signed(this.ptr);
		const ret_hu_conv: CommitmentSigned = new CommitmentSigned(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_commitment_signed(CommitmentSigned val) {
		bindings.CommitmentUpdate_set_commitment_signed(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public static CommitmentUpdate constructor_new(UpdateAddHTLC[] update_add_htlcs_arg, UpdateFulfillHTLC[] update_fulfill_htlcs_arg, UpdateFailHTLC[] update_fail_htlcs_arg, UpdateFailMalformedHTLC[] update_fail_malformed_htlcs_arg, UpdateFee update_fee_arg, CommitmentSigned commitment_signed_arg) {
		number ret = bindings.CommitmentUpdate_new(update_add_htlcs_arg != null ? Arrays.stream(update_add_htlcs_arg).map(update_add_htlcs_arg_conv_15 -> update_add_htlcs_arg_conv_15 == null ? 0 : update_add_htlcs_arg_conv_15.ptr & ~1).toArray(number[]::new) : null, update_fulfill_htlcs_arg != null ? Arrays.stream(update_fulfill_htlcs_arg).map(update_fulfill_htlcs_arg_conv_19 -> update_fulfill_htlcs_arg_conv_19 == null ? 0 : update_fulfill_htlcs_arg_conv_19.ptr & ~1).toArray(number[]::new) : null, update_fail_htlcs_arg != null ? Arrays.stream(update_fail_htlcs_arg).map(update_fail_htlcs_arg_conv_16 -> update_fail_htlcs_arg_conv_16 == null ? 0 : update_fail_htlcs_arg_conv_16.ptr & ~1).toArray(number[]::new) : null, update_fail_malformed_htlcs_arg != null ? Arrays.stream(update_fail_malformed_htlcs_arg).map(update_fail_malformed_htlcs_arg_conv_25 -> update_fail_malformed_htlcs_arg_conv_25 == null ? 0 : update_fail_malformed_htlcs_arg_conv_25.ptr & ~1).toArray(number[]::new) : null, update_fee_arg == null ? 0 : update_fee_arg.ptr & ~1, commitment_signed_arg == null ? 0 : commitment_signed_arg.ptr & ~1);
		const ret_hu_conv: CommitmentUpdate = new CommitmentUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.CommitmentUpdate_clone_ptr(this.ptr);
		return ret;
	}

	public CommitmentUpdate clone() {
		number ret = bindings.CommitmentUpdate_clone(this.ptr);
		const ret_hu_conv: CommitmentUpdate = new CommitmentUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
