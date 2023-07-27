package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a u32 or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_PackedLockTimeZ extends CommonBase {
	private Option_PackedLockTimeZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_PackedLockTimeZ_free(ptr); }
	}
	static Option_PackedLockTimeZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_PackedLockTimeZ raw_val = bindings.LDKCOption_PackedLockTimeZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_PackedLockTimeZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_PackedLockTimeZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_PackedLockTimeZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_PackedLockTimeZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_PackedLockTimeZ contains a u32
	 */
	public final static class Some extends Option_PackedLockTimeZ {
		public final int some;
		private Some(long ptr, bindings.LDKCOption_PackedLockTimeZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_PackedLockTimeZ contains nothing
	 */
	public final static class None extends Option_PackedLockTimeZ {
		private None(long ptr, bindings.LDKCOption_PackedLockTimeZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_PackedLockTimeZ containing a u32
	 */
	public static Option_PackedLockTimeZ some(int o) {
		long ret = bindings.COption_PackedLockTimeZ_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PackedLockTimeZ ret_hu_conv = org.ldk.structs.Option_PackedLockTimeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PackedLockTimeZ containing nothing
	 */
	public static Option_PackedLockTimeZ none() {
		long ret = bindings.COption_PackedLockTimeZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PackedLockTimeZ ret_hu_conv = org.ldk.structs.Option_PackedLockTimeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_PackedLockTimeZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_PackedLockTimeZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_PackedLockTimeZ clone() {
		long ret = bindings.COption_PackedLockTimeZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PackedLockTimeZ ret_hu_conv = org.ldk.structs.Option_PackedLockTimeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
