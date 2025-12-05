package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait defining behavior for creating and verifing the HMAC for authenticating a given data.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Verification extends CommonBase {
	final bindings.LDKVerification bindings_instance;
	Verification(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Verification(bindings.LDKVerification arg) {
		super(bindings.LDKVerification_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Verification_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.Verification_free(ptr); }
		ptr = 0;
	}
	public static interface VerificationInterface {
		/**
		 * Constructs an HMAC to include in [`OffersContext`] for the data along with the given
		 * [`Nonce`].
		 */
		byte[] hmac_for_offer_payment(Nonce nonce, ExpandedKey expanded_key);
		/**
		 * Authenticates the data using an HMAC and a [`Nonce`] taken from an [`OffersContext`].
		 */
		Result_NoneNoneZ verify_for_offer_payment(byte[] hmac, Nonce nonce, ExpandedKey expanded_key);
	}
	private static class LDKVerificationHolder { Verification held; }
	public static Verification new_impl(VerificationInterface arg) {
		final LDKVerificationHolder impl_holder = new LDKVerificationHolder();
		impl_holder.held = new Verification(new bindings.LDKVerification() {
			@Override public byte[] hmac_for_offer_payment(long nonce, long expanded_key) {
				org.ldk.structs.Nonce nonce_hu_conv = null; if (nonce < 0 || nonce > 4096) { nonce_hu_conv = new org.ldk.structs.Nonce(null, nonce); }
				if (nonce_hu_conv != null) { nonce_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ExpandedKey expanded_key_hu_conv = null; if (expanded_key < 0 || expanded_key > 4096) { expanded_key_hu_conv = new org.ldk.structs.ExpandedKey(null, expanded_key); }
				byte[] ret = arg.hmac_for_offer_payment(nonce_hu_conv, expanded_key_hu_conv);
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
			@Override public long verify_for_offer_payment(byte[] hmac, long nonce, long expanded_key) {
				org.ldk.structs.Nonce nonce_hu_conv = null; if (nonce < 0 || nonce > 4096) { nonce_hu_conv = new org.ldk.structs.Nonce(null, nonce); }
				if (nonce_hu_conv != null) { nonce_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ExpandedKey expanded_key_hu_conv = null; if (expanded_key < 0 || expanded_key > 4096) { expanded_key_hu_conv = new org.ldk.structs.ExpandedKey(null, expanded_key); }
				Result_NoneNoneZ ret = arg.verify_for_offer_payment(hmac, nonce_hu_conv, expanded_key_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Constructs an HMAC to include in [`OffersContext`] for the data along with the given
	 * [`Nonce`].
	 */
	public byte[] hmac_for_offer_payment(org.ldk.structs.Nonce nonce, org.ldk.structs.ExpandedKey expanded_key) {
		byte[] ret = bindings.Verification_hmac_for_offer_payment(this.ptr, nonce.ptr, expanded_key.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(nonce);
		Reference.reachabilityFence(expanded_key);
		return ret;
	}

	/**
	 * Authenticates the data using an HMAC and a [`Nonce`] taken from an [`OffersContext`].
	 */
	public Result_NoneNoneZ verify_for_offer_payment(byte[] hmac, org.ldk.structs.Nonce nonce, org.ldk.structs.ExpandedKey expanded_key) {
		long ret = bindings.Verification_verify_for_offer_payment(this.ptr, InternalUtils.check_arr_len(hmac, 32), nonce.ptr, expanded_key.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(hmac);
		Reference.reachabilityFence(nonce);
		Reference.reachabilityFence(expanded_key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
