package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * This class tracks the per-transaction information needed to build a closing transaction and will
 * actually build it and sign.
 * 
 * This class can be used inside a signer implementation to generate a signature given the relevant
 * secret key.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ClosingTransaction extends CommonBase {
	ClosingTransaction(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ClosingTransaction_free(ptr); }
	}

	/**
	 * Construct an object of the class
	 */
	public static ClosingTransaction of(long to_holder_value_sat, long to_counterparty_value_sat, byte[] to_holder_script, byte[] to_counterparty_script, OutPoint funding_outpoint) {
		long ret = bindings.ClosingTransaction_new(to_holder_value_sat, to_counterparty_value_sat, to_holder_script, to_counterparty_script, funding_outpoint == null ? 0 : funding_outpoint.ptr & ~1);
		if (ret < 1024) { return null; }
		ClosingTransaction ret_hu_conv = new ClosingTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(funding_outpoint);
		return ret_hu_conv;
	}

	/**
	 * Trust our pre-built transaction.
	 * 
	 * Applies a wrapper which allows access to the transaction.
	 * 
	 * This should only be used if you fully trust the builder of this object. It should not
	 * be used by an external signer - instead use the verify function.
	 */
	public TrustedClosingTransaction trust() {
		long ret = bindings.ClosingTransaction_trust(this.ptr);
		if (ret < 1024) { return null; }
		TrustedClosingTransaction ret_hu_conv = new TrustedClosingTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Verify our pre-built transaction.
	 * 
	 * Applies a wrapper which allows access to the transaction.
	 * 
	 * An external validating signer must call this method before signing
	 * or using the built transaction.
	 */
	public Result_TrustedClosingTransactionNoneZ verify(OutPoint funding_outpoint) {
		long ret = bindings.ClosingTransaction_verify(this.ptr, funding_outpoint == null ? 0 : funding_outpoint.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_TrustedClosingTransactionNoneZ ret_hu_conv = Result_TrustedClosingTransactionNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(funding_outpoint);
		return ret_hu_conv;
	}

	/**
	 * The value to be sent to the holder, or zero if the output will be omitted
	 */
	public long to_holder_value_sat() {
		long ret = bindings.ClosingTransaction_to_holder_value_sat(this.ptr);
		return ret;
	}

	/**
	 * The value to be sent to the counterparty, or zero if the output will be omitted
	 */
	public long to_counterparty_value_sat() {
		long ret = bindings.ClosingTransaction_to_counterparty_value_sat(this.ptr);
		return ret;
	}

	/**
	 * The destination of the holder's output
	 */
	public byte[] to_holder_script() {
		byte[] ret = bindings.ClosingTransaction_to_holder_script(this.ptr);
		return ret;
	}

	/**
	 * The destination of the counterparty's output
	 */
	public byte[] to_counterparty_script() {
		byte[] ret = bindings.ClosingTransaction_to_counterparty_script(this.ptr);
		return ret;
	}

}
