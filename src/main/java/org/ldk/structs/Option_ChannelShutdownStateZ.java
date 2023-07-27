package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::ln::channelmanager::ChannelShutdownState or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_ChannelShutdownStateZ extends CommonBase {
	private Option_ChannelShutdownStateZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_ChannelShutdownStateZ_free(ptr); }
	}
	static Option_ChannelShutdownStateZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_ChannelShutdownStateZ raw_val = bindings.LDKCOption_ChannelShutdownStateZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_ChannelShutdownStateZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_ChannelShutdownStateZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_ChannelShutdownStateZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_ChannelShutdownStateZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_ChannelShutdownStateZ contains a crate::lightning::ln::channelmanager::ChannelShutdownState
	 */
	public final static class Some extends Option_ChannelShutdownStateZ {
		public final org.ldk.enums.ChannelShutdownState some;
		private Some(long ptr, bindings.LDKCOption_ChannelShutdownStateZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_ChannelShutdownStateZ contains nothing
	 */
	public final static class None extends Option_ChannelShutdownStateZ {
		private None(long ptr, bindings.LDKCOption_ChannelShutdownStateZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_ChannelShutdownStateZ containing a crate::lightning::ln::channelmanager::ChannelShutdownState
	 */
	public static Option_ChannelShutdownStateZ some(org.ldk.enums.ChannelShutdownState o) {
		long ret = bindings.COption_ChannelShutdownStateZ_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ChannelShutdownStateZ ret_hu_conv = org.ldk.structs.Option_ChannelShutdownStateZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ChannelShutdownStateZ containing nothing
	 */
	public static Option_ChannelShutdownStateZ none() {
		long ret = bindings.COption_ChannelShutdownStateZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ChannelShutdownStateZ ret_hu_conv = org.ldk.structs.Option_ChannelShutdownStateZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_ChannelShutdownStateZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_ChannelShutdownStateZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_ChannelShutdownStateZ clone() {
		long ret = bindings.COption_ChannelShutdownStateZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ChannelShutdownStateZ ret_hu_conv = org.ldk.structs.Option_ChannelShutdownStateZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
