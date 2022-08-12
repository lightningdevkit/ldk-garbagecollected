package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Struct used to return values from revoke_and_ack messages, containing a bunch of commitment
 * transaction updates if they were pending.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CommitmentUpdate extends CommonBase {
	CommitmentUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CommitmentUpdate_free(ptr); }
	}

	/**
	 * update_add_htlc messages which should be sent
	 */
	public UpdateAddHTLC[] get_update_add_htlcs() {
		long[] ret = bindings.CommitmentUpdate_get_update_add_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_15_len = ret.length;
		UpdateAddHTLC[] ret_conv_15_arr = new UpdateAddHTLC[ret_conv_15_len];
		for (int p = 0; p < ret_conv_15_len; p++) {
			long ret_conv_15 = ret[p];
			org.ldk.structs.UpdateAddHTLC ret_conv_15_hu_conv = null; if (ret_conv_15 < 0 || ret_conv_15 > 4096) { ret_conv_15_hu_conv = new org.ldk.structs.UpdateAddHTLC(null, ret_conv_15); }
			ret_conv_15_hu_conv.ptrs_to.add(this);
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		return ret_conv_15_arr;
	}

	/**
	 * update_add_htlc messages which should be sent
	 */
	public void set_update_add_htlcs(UpdateAddHTLC[] val) {
		bindings.CommitmentUpdate_set_update_add_htlcs(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_15 -> val_conv_15 == null ? 0 : val_conv_15.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		for (UpdateAddHTLC val_conv_15: val) { this.ptrs_to.add(val_conv_15); };
	}

	/**
	 * update_fulfill_htlc messages which should be sent
	 */
	public UpdateFulfillHTLC[] get_update_fulfill_htlcs() {
		long[] ret = bindings.CommitmentUpdate_get_update_fulfill_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_19_len = ret.length;
		UpdateFulfillHTLC[] ret_conv_19_arr = new UpdateFulfillHTLC[ret_conv_19_len];
		for (int t = 0; t < ret_conv_19_len; t++) {
			long ret_conv_19 = ret[t];
			org.ldk.structs.UpdateFulfillHTLC ret_conv_19_hu_conv = null; if (ret_conv_19 < 0 || ret_conv_19 > 4096) { ret_conv_19_hu_conv = new org.ldk.structs.UpdateFulfillHTLC(null, ret_conv_19); }
			ret_conv_19_hu_conv.ptrs_to.add(this);
			ret_conv_19_arr[t] = ret_conv_19_hu_conv;
		}
		return ret_conv_19_arr;
	}

	/**
	 * update_fulfill_htlc messages which should be sent
	 */
	public void set_update_fulfill_htlcs(UpdateFulfillHTLC[] val) {
		bindings.CommitmentUpdate_set_update_fulfill_htlcs(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_19 -> val_conv_19 == null ? 0 : val_conv_19.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		for (UpdateFulfillHTLC val_conv_19: val) { this.ptrs_to.add(val_conv_19); };
	}

	/**
	 * update_fail_htlc messages which should be sent
	 */
	public UpdateFailHTLC[] get_update_fail_htlcs() {
		long[] ret = bindings.CommitmentUpdate_get_update_fail_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_16_len = ret.length;
		UpdateFailHTLC[] ret_conv_16_arr = new UpdateFailHTLC[ret_conv_16_len];
		for (int q = 0; q < ret_conv_16_len; q++) {
			long ret_conv_16 = ret[q];
			org.ldk.structs.UpdateFailHTLC ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new org.ldk.structs.UpdateFailHTLC(null, ret_conv_16); }
			ret_conv_16_hu_conv.ptrs_to.add(this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	/**
	 * update_fail_htlc messages which should be sent
	 */
	public void set_update_fail_htlcs(UpdateFailHTLC[] val) {
		bindings.CommitmentUpdate_set_update_fail_htlcs(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_16 -> val_conv_16 == null ? 0 : val_conv_16.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		for (UpdateFailHTLC val_conv_16: val) { this.ptrs_to.add(val_conv_16); };
	}

	/**
	 * update_fail_malformed_htlc messages which should be sent
	 */
	public UpdateFailMalformedHTLC[] get_update_fail_malformed_htlcs() {
		long[] ret = bindings.CommitmentUpdate_get_update_fail_malformed_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_25_len = ret.length;
		UpdateFailMalformedHTLC[] ret_conv_25_arr = new UpdateFailMalformedHTLC[ret_conv_25_len];
		for (int z = 0; z < ret_conv_25_len; z++) {
			long ret_conv_25 = ret[z];
			org.ldk.structs.UpdateFailMalformedHTLC ret_conv_25_hu_conv = null; if (ret_conv_25 < 0 || ret_conv_25 > 4096) { ret_conv_25_hu_conv = new org.ldk.structs.UpdateFailMalformedHTLC(null, ret_conv_25); }
			ret_conv_25_hu_conv.ptrs_to.add(this);
			ret_conv_25_arr[z] = ret_conv_25_hu_conv;
		}
		return ret_conv_25_arr;
	}

	/**
	 * update_fail_malformed_htlc messages which should be sent
	 */
	public void set_update_fail_malformed_htlcs(UpdateFailMalformedHTLC[] val) {
		bindings.CommitmentUpdate_set_update_fail_malformed_htlcs(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_25 -> val_conv_25 == null ? 0 : val_conv_25.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		for (UpdateFailMalformedHTLC val_conv_25: val) { this.ptrs_to.add(val_conv_25); };
	}

	/**
	 * An update_fee message which should be sent
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public UpdateFee get_update_fee() {
		long ret = bindings.CommitmentUpdate_get_update_fee(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UpdateFee ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UpdateFee(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * An update_fee message which should be sent
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_update_fee(@Nullable UpdateFee val) {
		bindings.CommitmentUpdate_set_update_fee(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		this.ptrs_to.add(val);
	}

	/**
	 * Finally, the commitment_signed message which should be sent
	 */
	public CommitmentSigned get_commitment_signed() {
		long ret = bindings.CommitmentUpdate_get_commitment_signed(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommitmentSigned ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommitmentSigned(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Finally, the commitment_signed message which should be sent
	 */
	public void set_commitment_signed(CommitmentSigned val) {
		bindings.CommitmentUpdate_set_commitment_signed(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		this.ptrs_to.add(val);
	}

	/**
	 * Constructs a new CommitmentUpdate given each field
	 */
	public static CommitmentUpdate of(UpdateAddHTLC[] update_add_htlcs_arg, UpdateFulfillHTLC[] update_fulfill_htlcs_arg, UpdateFailHTLC[] update_fail_htlcs_arg, UpdateFailMalformedHTLC[] update_fail_malformed_htlcs_arg, UpdateFee update_fee_arg, CommitmentSigned commitment_signed_arg) {
		long ret = bindings.CommitmentUpdate_new(update_add_htlcs_arg != null ? Arrays.stream(update_add_htlcs_arg).mapToLong(update_add_htlcs_arg_conv_15 -> update_add_htlcs_arg_conv_15 == null ? 0 : update_add_htlcs_arg_conv_15.ptr).toArray() : null, update_fulfill_htlcs_arg != null ? Arrays.stream(update_fulfill_htlcs_arg).mapToLong(update_fulfill_htlcs_arg_conv_19 -> update_fulfill_htlcs_arg_conv_19 == null ? 0 : update_fulfill_htlcs_arg_conv_19.ptr).toArray() : null, update_fail_htlcs_arg != null ? Arrays.stream(update_fail_htlcs_arg).mapToLong(update_fail_htlcs_arg_conv_16 -> update_fail_htlcs_arg_conv_16 == null ? 0 : update_fail_htlcs_arg_conv_16.ptr).toArray() : null, update_fail_malformed_htlcs_arg != null ? Arrays.stream(update_fail_malformed_htlcs_arg).mapToLong(update_fail_malformed_htlcs_arg_conv_25 -> update_fail_malformed_htlcs_arg_conv_25 == null ? 0 : update_fail_malformed_htlcs_arg_conv_25.ptr).toArray() : null, update_fee_arg == null ? 0 : update_fee_arg.ptr, commitment_signed_arg == null ? 0 : commitment_signed_arg.ptr);
		Reference.reachabilityFence(update_add_htlcs_arg);
		Reference.reachabilityFence(update_fulfill_htlcs_arg);
		Reference.reachabilityFence(update_fail_htlcs_arg);
		Reference.reachabilityFence(update_fail_malformed_htlcs_arg);
		Reference.reachabilityFence(update_fee_arg);
		Reference.reachabilityFence(commitment_signed_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommitmentUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommitmentUpdate(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		for (UpdateAddHTLC update_add_htlcs_arg_conv_15: update_add_htlcs_arg) { ret_hu_conv.ptrs_to.add(update_add_htlcs_arg_conv_15); };
		for (UpdateFulfillHTLC update_fulfill_htlcs_arg_conv_19: update_fulfill_htlcs_arg) { ret_hu_conv.ptrs_to.add(update_fulfill_htlcs_arg_conv_19); };
		for (UpdateFailHTLC update_fail_htlcs_arg_conv_16: update_fail_htlcs_arg) { ret_hu_conv.ptrs_to.add(update_fail_htlcs_arg_conv_16); };
		for (UpdateFailMalformedHTLC update_fail_malformed_htlcs_arg_conv_25: update_fail_malformed_htlcs_arg) { ret_hu_conv.ptrs_to.add(update_fail_malformed_htlcs_arg_conv_25); };
		ret_hu_conv.ptrs_to.add(update_fee_arg);
		ret_hu_conv.ptrs_to.add(commitment_signed_arg);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.CommitmentUpdate_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the CommitmentUpdate
	 */
	public CommitmentUpdate clone() {
		long ret = bindings.CommitmentUpdate_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommitmentUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommitmentUpdate(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
