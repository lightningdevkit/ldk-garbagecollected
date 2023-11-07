using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Options for how to set the max dust HTLC exposure allowed on a channel. See
 * [`ChannelConfig::max_dust_htlc_exposure`] for details.
 */
public class MaxDustHTLCExposure : CommonBase {
	protected MaxDustHTLCExposure(object _dummy, long ptr) : base(ptr) { }
	~MaxDustHTLCExposure() {
		if (ptr != 0) { bindings.MaxDustHTLCExposure_free(ptr); }
	}

	internal static MaxDustHTLCExposure constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKMaxDustHTLCExposure_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new MaxDustHTLCExposure_FixedLimitMsat(ptr);
			case 1: return new MaxDustHTLCExposure_FeeRateMultiplier(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A MaxDustHTLCExposure of type FixedLimitMsat */
	public class MaxDustHTLCExposure_FixedLimitMsat : MaxDustHTLCExposure {
		public long fixed_limit_msat;
		internal MaxDustHTLCExposure_FixedLimitMsat(long ptr) : base(null, ptr) {
			this.fixed_limit_msat = bindings.LDKMaxDustHTLCExposure_FixedLimitMsat_get_fixed_limit_msat(ptr);
		}
	}
	/** A MaxDustHTLCExposure of type FeeRateMultiplier */
	public class MaxDustHTLCExposure_FeeRateMultiplier : MaxDustHTLCExposure {
		public long fee_rate_multiplier;
		internal MaxDustHTLCExposure_FeeRateMultiplier(long ptr) : base(null, ptr) {
			this.fee_rate_multiplier = bindings.LDKMaxDustHTLCExposure_FeeRateMultiplier_get_fee_rate_multiplier(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.MaxDustHTLCExposure_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the MaxDustHTLCExposure
	 */
	public MaxDustHTLCExposure clone() {
		long ret = bindings.MaxDustHTLCExposure_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MaxDustHTLCExposure ret_hu_conv = org.ldk.structs.MaxDustHTLCExposure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FixedLimitMsat-variant MaxDustHTLCExposure
	 */
	public static MaxDustHTLCExposure fixed_limit_msat(long a) {
		long ret = bindings.MaxDustHTLCExposure_fixed_limit_msat(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MaxDustHTLCExposure ret_hu_conv = org.ldk.structs.MaxDustHTLCExposure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeRateMultiplier-variant MaxDustHTLCExposure
	 */
	public static MaxDustHTLCExposure fee_rate_multiplier(long a) {
		long ret = bindings.MaxDustHTLCExposure_fee_rate_multiplier(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MaxDustHTLCExposure ret_hu_conv = org.ldk.structs.MaxDustHTLCExposure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two MaxDustHTLCExposures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.MaxDustHTLCExposure b) {
		bool ret = bindings.MaxDustHTLCExposure_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is MaxDustHTLCExposure)) return false;
		return this.eq((MaxDustHTLCExposure)o);
	}
	/**
	 * Serialize the MaxDustHTLCExposure object into a byte array which can be read by MaxDustHTLCExposure_read
	 */
	public byte[] write() {
		long ret = bindings.MaxDustHTLCExposure_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a MaxDustHTLCExposure from a byte array, created by MaxDustHTLCExposure_write
	 */
	public static Result_MaxDustHTLCExposureDecodeErrorZ read(byte[] ser) {
		long ret = bindings.MaxDustHTLCExposure_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_MaxDustHTLCExposureDecodeErrorZ ret_hu_conv = Result_MaxDustHTLCExposureDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
