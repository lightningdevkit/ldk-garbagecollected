package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a u64 or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_u64Z extends CommonBase {
	private Option_u64Z(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_u64Z_free(ptr); }
	}
	static Option_u64Z constr_from_ptr(long ptr) {
		bindings.LDKCOption_u64Z raw_val = bindings.LDKCOption_u64Z_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_u64Z.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_u64Z.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_u64Z.None.class) {
			return new None(ptr, (bindings.LDKCOption_u64Z.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_u64Z contains a u64
	 */
	public final static class Some extends Option_u64Z {
		public final long some;
		private Some(long ptr, bindings.LDKCOption_u64Z.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_u64Z contains nothing
	 */
	public final static class None extends Option_u64Z {
		private None(long ptr, bindings.LDKCOption_u64Z.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_u64Z containing a u64
	 */
	public static Option_u64Z some(long o) {
		long ret = bindings.COption_u64Z_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_u64Z containing nothing
	 */
	public static Option_u64Z none() {
		long ret = bindings.COption_u64Z_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_u64Z_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_u64Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_u64Z clone() {
		long ret = bindings.COption_u64Z_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
