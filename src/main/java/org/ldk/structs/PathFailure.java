package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * When the payment path failure took place and extra details about it. [`PathFailure::OnPath`] may
 * contain a [`NetworkUpdate`] that needs to be applied to the [`NetworkGraph`].
 * 
 * [`NetworkUpdate`]: crate::routing::gossip::NetworkUpdate
 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PathFailure extends CommonBase {
	private PathFailure(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PathFailure_free(ptr); }
	}
	static PathFailure constr_from_ptr(long ptr) {
		bindings.LDKPathFailure raw_val = bindings.LDKPathFailure_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKPathFailure.InitialSend.class) {
			return new InitialSend(ptr, (bindings.LDKPathFailure.InitialSend)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPathFailure.OnPath.class) {
			return new OnPath(ptr, (bindings.LDKPathFailure.OnPath)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * We failed to initially send the payment and no HTLC was committed to. Contains the relevant
	 * error.
	 */
	public final static class InitialSend extends PathFailure {
		/**
		 * The error surfaced from initial send.
		*/
		public final org.ldk.structs.APIError err;
		private InitialSend(long ptr, bindings.LDKPathFailure.InitialSend obj) {
			super(null, ptr);
			long err = obj.err;
			org.ldk.structs.APIError err_hu_conv = org.ldk.structs.APIError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}
	/**
	 * A hop on the path failed to forward our payment.
	 */
	public final static class OnPath extends PathFailure {
		/**
		 * If present, this [`NetworkUpdate`] should be applied to the [`NetworkGraph`] so that routing
		 * decisions can take into account the update.
		 * 
		 * [`NetworkUpdate`]: crate::routing::gossip::NetworkUpdate
		 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
		*/
		public final org.ldk.structs.Option_NetworkUpdateZ network_update;
		private OnPath(long ptr, bindings.LDKPathFailure.OnPath obj) {
			super(null, ptr);
			long network_update = obj.network_update;
			org.ldk.structs.Option_NetworkUpdateZ network_update_hu_conv = org.ldk.structs.Option_NetworkUpdateZ.constr_from_ptr(network_update);
			if (network_update_hu_conv != null) { network_update_hu_conv.ptrs_to.add(this); };
			this.network_update = network_update_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.PathFailure_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PathFailure
	 */
	public PathFailure clone() {
		long ret = bindings.PathFailure_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PathFailure ret_hu_conv = org.ldk.structs.PathFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InitialSend-variant PathFailure
	 */
	public static PathFailure initial_send(org.ldk.structs.APIError err) {
		long ret = bindings.PathFailure_initial_send(err.ptr);
		Reference.reachabilityFence(err);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PathFailure ret_hu_conv = org.ldk.structs.PathFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(err); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnPath-variant PathFailure
	 */
	public static PathFailure on_path(org.ldk.structs.Option_NetworkUpdateZ network_update) {
		long ret = bindings.PathFailure_on_path(network_update.ptr);
		Reference.reachabilityFence(network_update);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PathFailure ret_hu_conv = org.ldk.structs.PathFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(network_update); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PathFailures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.PathFailure b) {
		boolean ret = bindings.PathFailure_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof PathFailure)) return false;
		return this.eq((PathFailure)o);
	}
	/**
	 * Serialize the PathFailure object into a byte array which can be read by PathFailure_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PathFailure_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
