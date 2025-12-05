
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of Verification */
public interface VerificationInterface {
	/**Constructs an HMAC to include in [`OffersContext`] for the data along with the given
	 * [`Nonce`].
	 */
	byte[] hmac_for_offer_payment(org.ldk.structs.Nonce nonce, org.ldk.structs.ExpandedKey expanded_key);
	/**Authenticates the data using an HMAC and a [`Nonce`] taken from an [`OffersContext`].
	 */
	Result_NoneNoneZ verify_for_offer_payment(byte[] hmac, org.ldk.structs.Nonce nonce, org.ldk.structs.ExpandedKey expanded_key);
}

/**
 * A trait defining behavior for creating and verifing the HMAC for authenticating a given data.
 */
public class Verification : CommonBase {
	internal bindings.LDKVerification bindings_instance;
	internal long instance_idx;

	internal Verification(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~Verification() {
		if (ptr != 0) { bindings.Verification_free(ptr); }
	}

	private class LDKVerificationHolder { internal Verification held; }
	private class LDKVerificationImpl : bindings.LDKVerification {
		internal LDKVerificationImpl(VerificationInterface arg, LDKVerificationHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private VerificationInterface arg;
		private LDKVerificationHolder impl_holder;
		public long hmac_for_offer_payment(long _nonce, long _expanded_key) {
			org.ldk.structs.Nonce _nonce_hu_conv = null; if (_nonce < 0 || _nonce > 4096) { _nonce_hu_conv = new org.ldk.structs.Nonce(null, _nonce); }
			if (_nonce_hu_conv != null) { _nonce_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ExpandedKey _expanded_key_hu_conv = null; if (_expanded_key < 0 || _expanded_key > 4096) { _expanded_key_hu_conv = new org.ldk.structs.ExpandedKey(null, _expanded_key); }
			byte[] ret = arg.hmac_for_offer_payment(_nonce_hu_conv, _expanded_key_hu_conv);
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(ret, 32));
			return result;
		}
		public long verify_for_offer_payment(long _hmac, long _nonce, long _expanded_key) {
			byte[] _hmac_conv = InternalUtils.decodeUint8Array(_hmac);
			org.ldk.structs.Nonce _nonce_hu_conv = null; if (_nonce < 0 || _nonce > 4096) { _nonce_hu_conv = new org.ldk.structs.Nonce(null, _nonce); }
			if (_nonce_hu_conv != null) { _nonce_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ExpandedKey _expanded_key_hu_conv = null; if (_expanded_key < 0 || _expanded_key > 4096) { _expanded_key_hu_conv = new org.ldk.structs.ExpandedKey(null, _expanded_key); }
			Result_NoneNoneZ ret = arg.verify_for_offer_payment(_hmac_conv, _nonce_hu_conv, _expanded_key_hu_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
	}

	/** Creates a new instance of Verification from a given implementation */
	public static Verification new_impl(VerificationInterface arg) {
		LDKVerificationHolder impl_holder = new LDKVerificationHolder();
		LDKVerificationImpl impl = new LDKVerificationImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKVerification_new(impl);

		impl_holder.held = new Verification(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Constructs an HMAC to include in [`OffersContext`] for the data along with the given
	 * [`Nonce`].
	 */
	public byte[] hmac_for_offer_payment(org.ldk.structs.Nonce nonce, org.ldk.structs.ExpandedKey expanded_key) {
		long ret = bindings.Verification_hmac_for_offer_payment(this.ptr, nonce.ptr, expanded_key.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(nonce);
		GC.KeepAlive(expanded_key);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Authenticates the data using an HMAC and a [`Nonce`] taken from an [`OffersContext`].
	 */
	public org.ldk.structs.Result_NoneNoneZ verify_for_offer_payment(byte[] hmac, org.ldk.structs.Nonce nonce, org.ldk.structs.ExpandedKey expanded_key) {
		long ret = bindings.Verification_verify_for_offer_payment(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(hmac, 32)), nonce.ptr, expanded_key.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(hmac);
		GC.KeepAlive(nonce);
		GC.KeepAlive(expanded_key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
