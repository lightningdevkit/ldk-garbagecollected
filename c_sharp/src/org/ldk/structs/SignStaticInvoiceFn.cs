
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of SignStaticInvoiceFn */
public interface SignStaticInvoiceFnInterface {
	/**Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	Result_SchnorrSignatureNoneZ sign_invoice(org.ldk.structs.UnsignedStaticInvoice message);
}

/**
 * A function for signing an [`UnsignedStaticInvoice`].
 */
public class SignStaticInvoiceFn : CommonBase {
	internal bindings.LDKSignStaticInvoiceFn bindings_instance;
	internal long instance_idx;

	internal SignStaticInvoiceFn(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~SignStaticInvoiceFn() {
		if (ptr != 0) { bindings.SignStaticInvoiceFn_free(ptr); }
	}

	private class LDKSignStaticInvoiceFnHolder { internal SignStaticInvoiceFn held; }
	private class LDKSignStaticInvoiceFnImpl : bindings.LDKSignStaticInvoiceFn {
		internal LDKSignStaticInvoiceFnImpl(SignStaticInvoiceFnInterface arg, LDKSignStaticInvoiceFnHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private SignStaticInvoiceFnInterface arg;
		private LDKSignStaticInvoiceFnHolder impl_holder;
		public long sign_invoice(long _message) {
			org.ldk.structs.UnsignedStaticInvoice _message_hu_conv = null; if (_message < 0 || _message > 4096) { _message_hu_conv = new org.ldk.structs.UnsignedStaticInvoice(null, _message); }
			Result_SchnorrSignatureNoneZ ret = arg.sign_invoice(_message_hu_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
	}

	/** Creates a new instance of SignStaticInvoiceFn from a given implementation */
	public static SignStaticInvoiceFn new_impl(SignStaticInvoiceFnInterface arg) {
		LDKSignStaticInvoiceFnHolder impl_holder = new LDKSignStaticInvoiceFnHolder();
		LDKSignStaticInvoiceFnImpl impl = new LDKSignStaticInvoiceFnImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKSignStaticInvoiceFn_new(impl);

		impl_holder.held = new SignStaticInvoiceFn(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	public org.ldk.structs.Result_SchnorrSignatureNoneZ sign_invoice(org.ldk.structs.UnsignedStaticInvoice message) {
		long ret = bindings.SignStaticInvoiceFn_sign_invoice(this.ptr, message.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(message); };
		return ret_hu_conv;
	}

}
} } }
