package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CommitmentUpdate extends CommonBase {
	CommitmentUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CommitmentUpdate_free(ptr); }
	}

	public static CommitmentUpdate constructor_clone(CommitmentUpdate orig) {
		long ret = bindings.CommitmentUpdate_clone(orig == null ? 0 : orig.ptr & ~1);
		CommitmentUpdate ret_hu_conv = new CommitmentUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public void set_update_add_htlcs(UpdateAddHTLC[] val) {
		bindings.CommitmentUpdate_set_update_add_htlcs(this.ptr, Arrays.stream(val).mapToLong(arr_conv_15 -> arr_conv_15 == null ? 0 : arr_conv_15.ptr & ~1).toArray());
		/* TODO 2 UpdateAddHTLC  */;
	}

	public void set_update_fulfill_htlcs(UpdateFulfillHTLC[] val) {
		bindings.CommitmentUpdate_set_update_fulfill_htlcs(this.ptr, Arrays.stream(val).mapToLong(arr_conv_19 -> arr_conv_19 == null ? 0 : arr_conv_19.ptr & ~1).toArray());
		/* TODO 2 UpdateFulfillHTLC  */;
	}

	public void set_update_fail_htlcs(UpdateFailHTLC[] val) {
		bindings.CommitmentUpdate_set_update_fail_htlcs(this.ptr, Arrays.stream(val).mapToLong(arr_conv_16 -> arr_conv_16 == null ? 0 : arr_conv_16.ptr & ~1).toArray());
		/* TODO 2 UpdateFailHTLC  */;
	}

	public void set_update_fail_malformed_htlcs(UpdateFailMalformedHTLC[] val) {
		bindings.CommitmentUpdate_set_update_fail_malformed_htlcs(this.ptr, Arrays.stream(val).mapToLong(arr_conv_25 -> arr_conv_25 == null ? 0 : arr_conv_25.ptr & ~1).toArray());
		/* TODO 2 UpdateFailMalformedHTLC  */;
	}

	public UpdateFee get_update_fee() {
		long ret = bindings.CommitmentUpdate_get_update_fee(this.ptr);
		UpdateFee ret_hu_conv = new UpdateFee(null, ret);
		return ret_hu_conv;
	}

	public void set_update_fee(UpdateFee val) {
		bindings.CommitmentUpdate_set_update_fee(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public CommitmentSigned get_commitment_signed() {
		long ret = bindings.CommitmentUpdate_get_commitment_signed(this.ptr);
		CommitmentSigned ret_hu_conv = new CommitmentSigned(null, ret);
		return ret_hu_conv;
	}

	public void set_commitment_signed(CommitmentSigned val) {
		bindings.CommitmentUpdate_set_commitment_signed(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static CommitmentUpdate constructor_new(UpdateAddHTLC[] update_add_htlcs_arg, UpdateFulfillHTLC[] update_fulfill_htlcs_arg, UpdateFailHTLC[] update_fail_htlcs_arg, UpdateFailMalformedHTLC[] update_fail_malformed_htlcs_arg, UpdateFee update_fee_arg, CommitmentSigned commitment_signed_arg) {
		long ret = bindings.CommitmentUpdate_new(Arrays.stream(update_add_htlcs_arg).mapToLong(arr_conv_15 -> arr_conv_15 == null ? 0 : arr_conv_15.ptr & ~1).toArray(), Arrays.stream(update_fulfill_htlcs_arg).mapToLong(arr_conv_19 -> arr_conv_19 == null ? 0 : arr_conv_19.ptr & ~1).toArray(), Arrays.stream(update_fail_htlcs_arg).mapToLong(arr_conv_16 -> arr_conv_16 == null ? 0 : arr_conv_16.ptr & ~1).toArray(), Arrays.stream(update_fail_malformed_htlcs_arg).mapToLong(arr_conv_25 -> arr_conv_25 == null ? 0 : arr_conv_25.ptr & ~1).toArray(), update_fee_arg == null ? 0 : update_fee_arg.ptr & ~1, commitment_signed_arg == null ? 0 : commitment_signed_arg.ptr & ~1);
		CommitmentUpdate ret_hu_conv = new CommitmentUpdate(null, ret);
		/* TODO 2 UpdateAddHTLC  */;
		/* TODO 2 UpdateFulfillHTLC  */;
		/* TODO 2 UpdateFailHTLC  */;
		/* TODO 2 UpdateFailMalformedHTLC  */;
		ret_hu_conv.ptrs_to.add(update_fee_arg);
		ret_hu_conv.ptrs_to.add(commitment_signed_arg);
		return ret_hu_conv;
	}

}
