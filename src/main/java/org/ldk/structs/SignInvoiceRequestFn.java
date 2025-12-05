package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A function for signing an [`UnsignedInvoiceRequest`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SignInvoiceRequestFn extends CommonBase {
	final bindings.LDKSignInvoiceRequestFn bindings_instance;
	SignInvoiceRequestFn(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private SignInvoiceRequestFn(bindings.LDKSignInvoiceRequestFn arg) {
		super(bindings.LDKSignInvoiceRequestFn_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.SignInvoiceRequestFn_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.SignInvoiceRequestFn_free(ptr); }
		ptr = 0;
	}
	public static interface SignInvoiceRequestFnInterface {
		/**
		 * Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
		 */
		Result_SchnorrSignatureNoneZ sign_invoice_request(UnsignedInvoiceRequest message);
	}
	private static class LDKSignInvoiceRequestFnHolder { SignInvoiceRequestFn held; }
	public static SignInvoiceRequestFn new_impl(SignInvoiceRequestFnInterface arg) {
		final LDKSignInvoiceRequestFnHolder impl_holder = new LDKSignInvoiceRequestFnHolder();
		impl_holder.held = new SignInvoiceRequestFn(new bindings.LDKSignInvoiceRequestFn() {
			@Override public long sign_invoice_request(long message) {
				org.ldk.structs.UnsignedInvoiceRequest message_hu_conv = null; if (message < 0 || message > 4096) { message_hu_conv = new org.ldk.structs.UnsignedInvoiceRequest(null, message); }
				Result_SchnorrSignatureNoneZ ret = arg.sign_invoice_request(message_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	public Result_SchnorrSignatureNoneZ sign_invoice_request(org.ldk.structs.UnsignedInvoiceRequest message) {
		long ret = bindings.SignInvoiceRequestFn_sign_invoice_request(this.ptr, message.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
