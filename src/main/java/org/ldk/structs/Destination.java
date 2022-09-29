package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The destination of an onion message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Destination extends CommonBase {
	private Destination(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Destination_free(ptr); }
	}
	static Destination constr_from_ptr(long ptr) {
		bindings.LDKDestination raw_val = bindings.LDKDestination_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKDestination.Node.class) {
			return new Node(ptr, (bindings.LDKDestination.Node)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKDestination.BlindedRoute.class) {
			return new BlindedRoute(ptr, (bindings.LDKDestination.BlindedRoute)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * We're sending this onion message to a node.
	 */
	public final static class Node extends Destination {
		public final byte[] node;
		private Node(long ptr, bindings.LDKDestination.Node obj) {
			super(null, ptr);
			this.node = obj.node;
		}
	}
	/**
	 * We're sending this onion message to a blinded route.
	 */
	public final static class BlindedRoute extends Destination {
		public final org.ldk.structs.BlindedRoute blinded_route;
		private BlindedRoute(long ptr, bindings.LDKDestination.BlindedRoute obj) {
			super(null, ptr);
			long blinded_route = obj.blinded_route;
			org.ldk.structs.BlindedRoute blinded_route_hu_conv = null; if (blinded_route < 0 || blinded_route > 4096) { blinded_route_hu_conv = new org.ldk.structs.BlindedRoute(null, blinded_route); }
			if (blinded_route_hu_conv != null) { blinded_route_hu_conv.ptrs_to.add(this); };
			this.blinded_route = blinded_route_hu_conv;
		}
	}
	/**
	 * Utility method to constructs a new Node-variant Destination
	 */
	public static Destination node(byte[] a) {
		long ret = bindings.Destination_node(InternalUtils.check_arr_len(a, 33));
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Destination ret_hu_conv = org.ldk.structs.Destination.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BlindedRoute-variant Destination
	 */
	public static Destination blinded_route(BlindedRoute a) {
		long ret = bindings.Destination_blinded_route(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Destination ret_hu_conv = org.ldk.structs.Destination.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after ret_hu_conv call, a is reset to null and is now a dummy object.
		a.ptr = 0;;
		return ret_hu_conv;
	}

}
