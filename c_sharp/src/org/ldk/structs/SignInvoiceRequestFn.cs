
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of SignInvoiceRequestFn */
public interface SignInvoiceRequestFnInterface {
	/**Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	Result_SchnorrSignatureNoneZ sign_invoice_request(org.ldk.structs.UnsignedInvoiceRequest message);
}

/**
 * A function for signing an [`UnsignedInvoiceRequest`].
 */
public class SignInvoiceRequestFn : CommonBase {
	internal bindings.LDKSignInvoiceRequestFn bindings_instance;
	internal long instance_idx;

	internal SignInvoiceRequestFn(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~SignInvoiceRequestFn() {
		if (ptr != 0) { bindings.SignInvoiceRequestFn_free(ptr); }
	}

	private class LDKSignInvoiceRequestFnHolder { internal SignInvoiceRequestFn held; }
	private class LDKSignInvoiceRequestFnImpl : bindings.LDKSignInvoiceRequestFn {
		internal LDKSignInvoiceRequestFnImpl(SignInvoiceRequestFnInterface arg, LDKSignInvoiceRequestFnHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private SignInvoiceRequestFnInterface arg;
		private LDKSignInvoiceRequestFnHolder impl_holder;
		public long sign_invoice_request(long _message) {
			org.ldk.structs.UnsignedInvoiceRequest _message_hu_conv = null; if (_message < 0 || _message > 4096) { _message_hu_conv = new org.ldk.structs.UnsignedInvoiceRequest(null, _message); }
			Result_SchnorrSignatureNoneZ ret = arg.sign_invoice_request(_message_hu_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
	}

	/** Creates a new instance of SignInvoiceRequestFn from a given implementation */
	public static SignInvoiceRequestFn new_impl(SignInvoiceRequestFnInterface arg) {
		LDKSignInvoiceRequestFnHolder impl_holder = new LDKSignInvoiceRequestFnHolder();
		LDKSignInvoiceRequestFnImpl impl = new LDKSignInvoiceRequestFnImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKSignInvoiceRequestFn_new(impl);

		impl_holder.held = new SignInvoiceRequestFn(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	public org.ldk.structs.Result_SchnorrSignatureNoneZ sign_invoice_request(org.ldk.structs.UnsignedInvoiceRequest message) {
		long ret = bindings.SignInvoiceRequestFn_sign_invoice_request(this.ptr, message.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
