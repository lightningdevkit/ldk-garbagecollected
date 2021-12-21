package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::chain::channelmonitor::MonitorEvent or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_MonitorEventZ extends CommonBase {
	private Option_MonitorEventZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_MonitorEventZ_free(ptr); }
	}
	static Option_MonitorEventZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_MonitorEventZ raw_val = bindings.LDKCOption_MonitorEventZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_MonitorEventZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_MonitorEventZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_MonitorEventZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_MonitorEventZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_MonitorEventZ contains a crate::lightning::chain::channelmonitor::MonitorEvent
	 */
	public final static class Some extends Option_MonitorEventZ {
		public final MonitorEvent some;
		private Some(long ptr, bindings.LDKCOption_MonitorEventZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			MonitorEvent some_hu_conv = MonitorEvent.constr_from_ptr(some);
			some_hu_conv.ptrs_to.add(this);
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_MonitorEventZ contains nothing
	 */
	public final static class None extends Option_MonitorEventZ {
		private None(long ptr, bindings.LDKCOption_MonitorEventZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_MonitorEventZ containing a crate::lightning::chain::channelmonitor::MonitorEvent
	 */
	public static Option_MonitorEventZ some(MonitorEvent o) {
		long ret = bindings.COption_MonitorEventZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_MonitorEventZ ret_hu_conv = Option_MonitorEventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_MonitorEventZ containing nothing
	 */
	public static Option_MonitorEventZ none() {
		long ret = bindings.COption_MonitorEventZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_MonitorEventZ ret_hu_conv = Option_MonitorEventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_MonitorEventZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_MonitorEventZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_MonitorEventZ clone() {
		long ret = bindings.COption_MonitorEventZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_MonitorEventZ ret_hu_conv = Option_MonitorEventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
