using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * This enum is used to specify which error data to send to peers when failing back an HTLC
 * using [`ChannelManager::fail_htlc_backwards_with_reason`].
 * 
 * For more info on failure codes, see <https://github.com/lightning/bolts/blob/master/04-onion-routing.md#failure-messages>.
 */
public class FailureCode : CommonBase {
	protected FailureCode(object _dummy, long ptr) : base(ptr) { }
	~FailureCode() {
		if (ptr != 0) { bindings.FailureCode_free(ptr); }
	}

	internal static FailureCode constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKFailureCode_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new FailureCode_TemporaryNodeFailure(ptr);
			case 1: return new FailureCode_RequiredNodeFeatureMissing(ptr);
			case 2: return new FailureCode_IncorrectOrUnknownPaymentDetails(ptr);
			case 3: return new FailureCode_InvalidOnionPayload(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A FailureCode of type TemporaryNodeFailure */
	public class FailureCode_TemporaryNodeFailure : FailureCode {
		internal FailureCode_TemporaryNodeFailure(long ptr) : base(null, ptr) {
		}
	}
	/** A FailureCode of type RequiredNodeFeatureMissing */
	public class FailureCode_RequiredNodeFeatureMissing : FailureCode {
		internal FailureCode_RequiredNodeFeatureMissing(long ptr) : base(null, ptr) {
		}
	}
	/** A FailureCode of type IncorrectOrUnknownPaymentDetails */
	public class FailureCode_IncorrectOrUnknownPaymentDetails : FailureCode {
		internal FailureCode_IncorrectOrUnknownPaymentDetails(long ptr) : base(null, ptr) {
		}
	}
	/** A FailureCode of type InvalidOnionPayload */
	public class FailureCode_InvalidOnionPayload : FailureCode {
		public Option_C2Tuple_u64u16ZZ invalid_onion_payload;
		internal FailureCode_InvalidOnionPayload(long ptr) : base(null, ptr) {
			long invalid_onion_payload = bindings.LDKFailureCode_InvalidOnionPayload_get_invalid_onion_payload(ptr);
			org.ldk.structs.Option_C2Tuple_u64u16ZZ invalid_onion_payload_hu_conv = org.ldk.structs.Option_C2Tuple_u64u16ZZ.constr_from_ptr(invalid_onion_payload);
			if (invalid_onion_payload_hu_conv != null) { invalid_onion_payload_hu_conv.ptrs_to.AddLast(this); };
			this.invalid_onion_payload = invalid_onion_payload_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.FailureCode_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the FailureCode
	 */
	public FailureCode clone() {
		long ret = bindings.FailureCode_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FailureCode ret_hu_conv = org.ldk.structs.FailureCode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TemporaryNodeFailure-variant FailureCode
	 */
	public static FailureCode temporary_node_failure() {
		long ret = bindings.FailureCode_temporary_node_failure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FailureCode ret_hu_conv = org.ldk.structs.FailureCode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RequiredNodeFeatureMissing-variant FailureCode
	 */
	public static FailureCode required_node_feature_missing() {
		long ret = bindings.FailureCode_required_node_feature_missing();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FailureCode ret_hu_conv = org.ldk.structs.FailureCode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncorrectOrUnknownPaymentDetails-variant FailureCode
	 */
	public static FailureCode incorrect_or_unknown_payment_details() {
		long ret = bindings.FailureCode_incorrect_or_unknown_payment_details();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FailureCode ret_hu_conv = org.ldk.structs.FailureCode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionPayload-variant FailureCode
	 */
	public static FailureCode invalid_onion_payload(org.ldk.structs.Option_C2Tuple_u64u16ZZ a) {
		long ret = bindings.FailureCode_invalid_onion_payload(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FailureCode ret_hu_conv = org.ldk.structs.FailureCode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

}
} } }
