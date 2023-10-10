using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * When the payment path failure took place and extra details about it. [`PathFailure::OnPath`] may
 * contain a [`NetworkUpdate`] that needs to be applied to the [`NetworkGraph`].
 * 
 * [`NetworkUpdate`]: crate::routing::gossip::NetworkUpdate
 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
 */
public class PathFailure : CommonBase {
	protected PathFailure(object _dummy, long ptr) : base(ptr) { }
	~PathFailure() {
		if (ptr != 0) { bindings.PathFailure_free(ptr); }
	}

	internal static PathFailure constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKPathFailure_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PathFailure_InitialSend(ptr);
			case 1: return new PathFailure_OnPath(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A PathFailure of type InitialSend */
	public class PathFailure_InitialSend : PathFailure {
		/**
		 * The error surfaced from initial send.
		 */
		public APIError err;
		internal PathFailure_InitialSend(long ptr) : base(null, ptr) {
			long err = bindings.LDKPathFailure_InitialSend_get_err(ptr);
			org.ldk.structs.APIError err_hu_conv = org.ldk.structs.APIError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}
	/** A PathFailure of type OnPath */
	public class PathFailure_OnPath : PathFailure {
		/**
		 * If present, this [`NetworkUpdate`] should be applied to the [`NetworkGraph`] so that routing
		 * decisions can take into account the update.
		 * 
		 * [`NetworkUpdate`]: crate::routing::gossip::NetworkUpdate
		 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
		 */
		public Option_NetworkUpdateZ network_update;
		internal PathFailure_OnPath(long ptr) : base(null, ptr) {
			long network_update = bindings.LDKPathFailure_OnPath_get_network_update(ptr);
			org.ldk.structs.Option_NetworkUpdateZ network_update_hu_conv = org.ldk.structs.Option_NetworkUpdateZ.constr_from_ptr(network_update);
			if (network_update_hu_conv != null) { network_update_hu_conv.ptrs_to.AddLast(this); };
			this.network_update = network_update_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.PathFailure_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PathFailure
	 */
	public PathFailure clone() {
		long ret = bindings.PathFailure_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PathFailure ret_hu_conv = org.ldk.structs.PathFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InitialSend-variant PathFailure
	 */
	public static PathFailure initial_send(org.ldk.structs.APIError err) {
		long ret = bindings.PathFailure_initial_send(err.ptr);
		GC.KeepAlive(err);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PathFailure ret_hu_conv = org.ldk.structs.PathFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(err); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnPath-variant PathFailure
	 */
	public static PathFailure on_path(org.ldk.structs.Option_NetworkUpdateZ network_update) {
		long ret = bindings.PathFailure_on_path(network_update.ptr);
		GC.KeepAlive(network_update);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PathFailure ret_hu_conv = org.ldk.structs.PathFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(network_update); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PathFailures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.PathFailure b) {
		bool ret = bindings.PathFailure_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is PathFailure)) return false;
		return this.eq((PathFailure)o);
	}
	/**
	 * Serialize the PathFailure object into a byte array which can be read by PathFailure_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PathFailure_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
