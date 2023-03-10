package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The result of a [`UtxoLookup::get_utxo`] call. A call may resolve either synchronously,
 * returning the `Sync` variant, or asynchronously, returning an [`UtxoFuture`] in the `Async`
 * variant.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UtxoResult extends CommonBase {
	private UtxoResult(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UtxoResult_free(ptr); }
	}
	static UtxoResult constr_from_ptr(long ptr) {
		bindings.LDKUtxoResult raw_val = bindings.LDKUtxoResult_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKUtxoResult.Sync.class) {
			return new Sync(ptr, (bindings.LDKUtxoResult.Sync)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKUtxoResult.Async.class) {
			return new Async(ptr, (bindings.LDKUtxoResult.Async)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * A result which was resolved synchronously. It either includes a [`TxOut`] for the output
	 * requested or a [`UtxoLookupError`].
	 */
	public final static class Sync extends UtxoResult {
		public final org.ldk.structs.Result_TxOutUtxoLookupErrorZ sync;
		private Sync(long ptr, bindings.LDKUtxoResult.Sync obj) {
			super(null, ptr);
			long sync = obj.sync;
			Result_TxOutUtxoLookupErrorZ sync_hu_conv = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(sync);
			this.sync = sync_hu_conv;
		}
	}
	/**
	 * A result which will be resolved asynchronously. It includes a [`UtxoFuture`], a `clone` of
	 * which you must keep locally and call [`UtxoFuture::resolve`] on once the lookup completes.
	 * 
	 * Note that in order to avoid runaway memory usage, the number of parallel checks is limited,
	 * but only fairly loosely. Because a pending checks block all message processing, leaving
	 * checks pending for an extended time may cause DoS of other functions. It is recommended you
	 * keep a tight timeout on lookups, on the order of a few seconds.
	 */
	public final static class Async extends UtxoResult {
		public final org.ldk.structs.UtxoFuture async;
		private Async(long ptr, bindings.LDKUtxoResult.Async obj) {
			super(null, ptr);
			long async = obj.async;
			org.ldk.structs.UtxoFuture async_hu_conv = null; if (async < 0 || async > 4096) { async_hu_conv = new org.ldk.structs.UtxoFuture(null, async); }
			if (async_hu_conv != null) { async_hu_conv.ptrs_to.add(this); };
			this.async = async_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.UtxoResult_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the UtxoResult
	 */
	public UtxoResult clone() {
		long ret = bindings.UtxoResult_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UtxoResult ret_hu_conv = org.ldk.structs.UtxoResult.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Sync-variant UtxoResult
	 */
	public static UtxoResult sync(org.ldk.structs.Result_TxOutUtxoLookupErrorZ a) {
		long ret = bindings.UtxoResult_sync(a != null ? a.ptr : 0);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UtxoResult ret_hu_conv = org.ldk.structs.UtxoResult.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Async-variant UtxoResult
	 */
	public static UtxoResult async(org.ldk.structs.UtxoFuture a) {
		long ret = bindings.UtxoResult_async(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UtxoResult ret_hu_conv = org.ldk.structs.UtxoResult.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

}
