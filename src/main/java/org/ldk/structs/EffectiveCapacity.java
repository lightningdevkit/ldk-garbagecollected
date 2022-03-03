package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The effective capacity of a channel for routing purposes.
 * 
 * While this may be smaller than the actual channel capacity, amounts greater than
 * [`Self::as_msat`] should not be routed through the channel.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class EffectiveCapacity extends CommonBase {
	private EffectiveCapacity(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.EffectiveCapacity_free(ptr); }
	}
	static EffectiveCapacity constr_from_ptr(long ptr) {
		bindings.LDKEffectiveCapacity raw_val = bindings.LDKEffectiveCapacity_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKEffectiveCapacity.ExactLiquidity.class) {
			return new ExactLiquidity(ptr, (bindings.LDKEffectiveCapacity.ExactLiquidity)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEffectiveCapacity.MaximumHTLC.class) {
			return new MaximumHTLC(ptr, (bindings.LDKEffectiveCapacity.MaximumHTLC)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEffectiveCapacity.Total.class) {
			return new Total(ptr, (bindings.LDKEffectiveCapacity.Total)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEffectiveCapacity.Infinite.class) {
			return new Infinite(ptr, (bindings.LDKEffectiveCapacity.Infinite)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEffectiveCapacity.Unknown.class) {
			return new Unknown(ptr, (bindings.LDKEffectiveCapacity.Unknown)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The available liquidity in the channel known from being a channel counterparty, and thus a
	 * direct hop.
	 */
	public final static class ExactLiquidity extends EffectiveCapacity {
		/**
		 * Either the inbound or outbound liquidity depending on the direction, denominated in
		 * millisatoshi.
		*/
		public final long liquidity_msat;
		private ExactLiquidity(long ptr, bindings.LDKEffectiveCapacity.ExactLiquidity obj) {
			super(null, ptr);
			this.liquidity_msat = obj.liquidity_msat;
		}
	}
	/**
	 * The maximum HTLC amount in one direction as advertised on the gossip network.
	 */
	public final static class MaximumHTLC extends EffectiveCapacity {
		/**
		 * The maximum HTLC amount denominated in millisatoshi.
		*/
		public final long amount_msat;
		private MaximumHTLC(long ptr, bindings.LDKEffectiveCapacity.MaximumHTLC obj) {
			super(null, ptr);
			this.amount_msat = obj.amount_msat;
		}
	}
	/**
	 * The total capacity of the channel as determined by the funding transaction.
	 */
	public final static class Total extends EffectiveCapacity {
		/**
		 * The funding amount denominated in millisatoshi.
		*/
		public final long capacity_msat;
		private Total(long ptr, bindings.LDKEffectiveCapacity.Total obj) {
			super(null, ptr);
			this.capacity_msat = obj.capacity_msat;
		}
	}
	/**
	 * A capacity sufficient to route any payment, typically used for private channels provided by
	 * an invoice.
	 */
	public final static class Infinite extends EffectiveCapacity {
		private Infinite(long ptr, bindings.LDKEffectiveCapacity.Infinite obj) {
			super(null, ptr);
		}
	}
	/**
	 * A capacity that is unknown possibly because either the chain state is unavailable to know
	 * the total capacity or the `htlc_maximum_msat` was not advertised on the gossip network.
	 */
	public final static class Unknown extends EffectiveCapacity {
		private Unknown(long ptr, bindings.LDKEffectiveCapacity.Unknown obj) {
			super(null, ptr);
		}
	}
	long clone_ptr() {
		long ret = bindings.EffectiveCapacity_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the EffectiveCapacity
	 */
	public EffectiveCapacity clone() {
		long ret = bindings.EffectiveCapacity_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EffectiveCapacity ret_hu_conv = EffectiveCapacity.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ExactLiquidity-variant EffectiveCapacity
	 */
	public static EffectiveCapacity exact_liquidity(long liquidity_msat) {
		long ret = bindings.EffectiveCapacity_exact_liquidity(liquidity_msat);
		Reference.reachabilityFence(liquidity_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		EffectiveCapacity ret_hu_conv = EffectiveCapacity.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MaximumHTLC-variant EffectiveCapacity
	 */
	public static EffectiveCapacity maximum_htlc(long amount_msat) {
		long ret = bindings.EffectiveCapacity_maximum_htlc(amount_msat);
		Reference.reachabilityFence(amount_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		EffectiveCapacity ret_hu_conv = EffectiveCapacity.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Total-variant EffectiveCapacity
	 */
	public static EffectiveCapacity total(long capacity_msat) {
		long ret = bindings.EffectiveCapacity_total(capacity_msat);
		Reference.reachabilityFence(capacity_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		EffectiveCapacity ret_hu_conv = EffectiveCapacity.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Infinite-variant EffectiveCapacity
	 */
	public static EffectiveCapacity infinite() {
		long ret = bindings.EffectiveCapacity_infinite();
		if (ret >= 0 && ret <= 4096) { return null; }
		EffectiveCapacity ret_hu_conv = EffectiveCapacity.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Unknown-variant EffectiveCapacity
	 */
	public static EffectiveCapacity unknown() {
		long ret = bindings.EffectiveCapacity_unknown();
		if (ret >= 0 && ret <= 4096) { return null; }
		EffectiveCapacity ret_hu_conv = EffectiveCapacity.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the effective capacity denominated in millisatoshi.
	 */
	public long as_msat() {
		long ret = bindings.EffectiveCapacity_as_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
