
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of SignBolt12InvoiceFn */
public interface SignBolt12InvoiceFnInterface {
	/**Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	Result_SchnorrSignatureNoneZ sign_invoice(org.ldk.structs.UnsignedBolt12Invoice message);
}

/**
 * A function for signing an [`UnsignedBolt12Invoice`].
 */
public class SignBolt12InvoiceFn : CommonBase {
	internal bindings.LDKSignBolt12InvoiceFn bindings_instance;
	internal long instance_idx;

	internal SignBolt12InvoiceFn(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~SignBolt12InvoiceFn() {
		if (ptr != 0) { bindings.SignBolt12InvoiceFn_free(ptr); }
	}

	private class LDKSignBolt12InvoiceFnHolder { internal SignBolt12InvoiceFn held; }
	private class LDKSignBolt12InvoiceFnImpl : bindings.LDKSignBolt12InvoiceFn {
		internal LDKSignBolt12InvoiceFnImpl(SignBolt12InvoiceFnInterface arg, LDKSignBolt12InvoiceFnHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private SignBolt12InvoiceFnInterface arg;
		private LDKSignBolt12InvoiceFnHolder impl_holder;
		public long sign_invoice(long _message) {
			org.ldk.structs.UnsignedBolt12Invoice _message_hu_conv = null; if (_message < 0 || _message > 4096) { _message_hu_conv = new org.ldk.structs.UnsignedBolt12Invoice(null, _message); }
			Result_SchnorrSignatureNoneZ ret = arg.sign_invoice(_message_hu_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
	}

	/** Creates a new instance of SignBolt12InvoiceFn from a given implementation */
	public static SignBolt12InvoiceFn new_impl(SignBolt12InvoiceFnInterface arg) {
		LDKSignBolt12InvoiceFnHolder impl_holder = new LDKSignBolt12InvoiceFnHolder();
		LDKSignBolt12InvoiceFnImpl impl = new LDKSignBolt12InvoiceFnImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKSignBolt12InvoiceFn_new(impl);

		impl_holder.held = new SignBolt12InvoiceFn(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	public org.ldk.structs.Result_SchnorrSignatureNoneZ sign_invoice(org.ldk.structs.UnsignedBolt12Invoice message) {
		long ret = bindings.SignBolt12InvoiceFn_sign_invoice(this.ptr, message.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
