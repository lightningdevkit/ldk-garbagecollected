package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A function for signing an [`UnsignedBolt12Invoice`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SignBolt12InvoiceFn extends CommonBase {
	final bindings.LDKSignBolt12InvoiceFn bindings_instance;
	SignBolt12InvoiceFn(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private SignBolt12InvoiceFn(bindings.LDKSignBolt12InvoiceFn arg) {
		super(bindings.LDKSignBolt12InvoiceFn_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.SignBolt12InvoiceFn_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.SignBolt12InvoiceFn_free(ptr); }
		ptr = 0;
	}
	public static interface SignBolt12InvoiceFnInterface {
		/**
		 * Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
		 */
		Result_SchnorrSignatureNoneZ sign_invoice(UnsignedBolt12Invoice message);
	}
	private static class LDKSignBolt12InvoiceFnHolder { SignBolt12InvoiceFn held; }
	public static SignBolt12InvoiceFn new_impl(SignBolt12InvoiceFnInterface arg) {
		final LDKSignBolt12InvoiceFnHolder impl_holder = new LDKSignBolt12InvoiceFnHolder();
		impl_holder.held = new SignBolt12InvoiceFn(new bindings.LDKSignBolt12InvoiceFn() {
			@Override public long sign_invoice(long message) {
				org.ldk.structs.UnsignedBolt12Invoice message_hu_conv = null; if (message < 0 || message > 4096) { message_hu_conv = new org.ldk.structs.UnsignedBolt12Invoice(null, message); }
				Result_SchnorrSignatureNoneZ ret = arg.sign_invoice(message_hu_conv);
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
	public Result_SchnorrSignatureNoneZ sign_invoice(org.ldk.structs.UnsignedBolt12Invoice message) {
		long ret = bindings.SignBolt12InvoiceFn_sign_invoice(this.ptr, message.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
