package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * This enum is used to specify which error data to send to peers when failing back an HTLC
 * using [`ChannelManager::fail_htlc_backwards_with_reason`].
 * 
 * For more info on failure codes, see <https://github.com/lightning/bolts/blob/master/04-onion-routing.md#failure-messages>.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FailureCode extends CommonBase {
	private FailureCode(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FailureCode_free(ptr); }
	}
	static FailureCode constr_from_ptr(long ptr) {
		bindings.LDKFailureCode raw_val = bindings.LDKFailureCode_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKFailureCode.TemporaryNodeFailure.class) {
			return new TemporaryNodeFailure(ptr, (bindings.LDKFailureCode.TemporaryNodeFailure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKFailureCode.RequiredNodeFeatureMissing.class) {
			return new RequiredNodeFeatureMissing(ptr, (bindings.LDKFailureCode.RequiredNodeFeatureMissing)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKFailureCode.IncorrectOrUnknownPaymentDetails.class) {
			return new IncorrectOrUnknownPaymentDetails(ptr, (bindings.LDKFailureCode.IncorrectOrUnknownPaymentDetails)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKFailureCode.InvalidOnionPayload.class) {
			return new InvalidOnionPayload(ptr, (bindings.LDKFailureCode.InvalidOnionPayload)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * We had a temporary error processing the payment. Useful if no other error codes fit
	 * and you want to indicate that the payer may want to retry.
	 */
	public final static class TemporaryNodeFailure extends FailureCode {
		private TemporaryNodeFailure(long ptr, bindings.LDKFailureCode.TemporaryNodeFailure obj) {
			super(null, ptr);
		}
	}
	/**
	 * We have a required feature which was not in this onion. For example, you may require
	 * some additional metadata that was not provided with this payment.
	 */
	public final static class RequiredNodeFeatureMissing extends FailureCode {
		private RequiredNodeFeatureMissing(long ptr, bindings.LDKFailureCode.RequiredNodeFeatureMissing obj) {
			super(null, ptr);
		}
	}
	/**
	 * You may wish to use this when a `payment_preimage` is unknown, or the CLTV expiry of
	 * the HTLC is too close to the current block height for safe handling.
	 * Using this failure code in [`ChannelManager::fail_htlc_backwards_with_reason`] is
	 * equivalent to calling [`ChannelManager::fail_htlc_backwards`].
	 */
	public final static class IncorrectOrUnknownPaymentDetails extends FailureCode {
		private IncorrectOrUnknownPaymentDetails(long ptr, bindings.LDKFailureCode.IncorrectOrUnknownPaymentDetails obj) {
			super(null, ptr);
		}
	}
	/**
	 * We failed to process the payload after the onion was decrypted. You may wish to
	 * use this when receiving custom HTLC TLVs with even type numbers that you don't recognize.
	 * 
	 * If available, the tuple data may include the type number and byte offset in the
	 * decrypted byte stream where the failure occurred.
	 */
	public final static class InvalidOnionPayload extends FailureCode {
		public final org.ldk.structs.Option_C2Tuple_u64u16ZZ invalid_onion_payload;
		private InvalidOnionPayload(long ptr, bindings.LDKFailureCode.InvalidOnionPayload obj) {
			super(null, ptr);
			long invalid_onion_payload = obj.invalid_onion_payload;
			org.ldk.structs.Option_C2Tuple_u64u16ZZ invalid_onion_payload_hu_conv = org.ldk.structs.Option_C2Tuple_u64u16ZZ.constr_from_ptr(invalid_onion_payload);
			if (invalid_onion_payload_hu_conv != null) { invalid_onion_payload_hu_conv.ptrs_to.add(this); };
			this.invalid_onion_payload = invalid_onion_payload_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.FailureCode_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the FailureCode
	 */
	public FailureCode clone() {
		long ret = bindings.FailureCode_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FailureCode ret_hu_conv = org.ldk.structs.FailureCode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TemporaryNodeFailure-variant FailureCode
	 */
	public static FailureCode temporary_node_failure() {
		long ret = bindings.FailureCode_temporary_node_failure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FailureCode ret_hu_conv = org.ldk.structs.FailureCode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RequiredNodeFeatureMissing-variant FailureCode
	 */
	public static FailureCode required_node_feature_missing() {
		long ret = bindings.FailureCode_required_node_feature_missing();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FailureCode ret_hu_conv = org.ldk.structs.FailureCode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncorrectOrUnknownPaymentDetails-variant FailureCode
	 */
	public static FailureCode incorrect_or_unknown_payment_details() {
		long ret = bindings.FailureCode_incorrect_or_unknown_payment_details();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FailureCode ret_hu_conv = org.ldk.structs.FailureCode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionPayload-variant FailureCode
	 */
	public static FailureCode invalid_onion_payload(org.ldk.structs.Option_C2Tuple_u64u16ZZ a) {
		long ret = bindings.FailureCode_invalid_onion_payload(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FailureCode ret_hu_conv = org.ldk.structs.FailureCode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

}
