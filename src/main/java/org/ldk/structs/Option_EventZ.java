package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::util::events::Event or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_EventZ extends CommonBase {
	private Option_EventZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_EventZ_free(ptr); }
	}
	static Option_EventZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_EventZ raw_val = bindings.LDKCOption_EventZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_EventZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_EventZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_EventZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_EventZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_EventZ contains a crate::lightning::util::events::Event
	 */
	public final static class Some extends Option_EventZ {
		public final Event some;
		private Some(long ptr, bindings.LDKCOption_EventZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			Event some_hu_conv = Event.constr_from_ptr(some);
			some_hu_conv.ptrs_to.add(this);
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_EventZ contains nothing
	 */
	public final static class None extends Option_EventZ {
		private None(long ptr, bindings.LDKCOption_EventZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_EventZ containing a crate::lightning::util::events::Event
	 */
	public static Option_EventZ some(Event o) {
		long ret = bindings.COption_EventZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_EventZ ret_hu_conv = Option_EventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_EventZ containing nothing
	 */
	public static Option_EventZ none() {
		long ret = bindings.COption_EventZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_EventZ ret_hu_conv = Option_EventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_EventZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_EventZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_EventZ clone() {
		long ret = bindings.COption_EventZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_EventZ ret_hu_conv = Option_EventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
