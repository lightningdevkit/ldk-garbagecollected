using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A struct for configuring parameters for routing the payment.
 */
public class RouteParametersConfig : CommonBase {
	internal RouteParametersConfig(object _dummy, long ptr) : base(ptr) { }
	~RouteParametersConfig() {
		if (ptr != 0) { bindings.RouteParametersConfig_free(ptr); }
	}

	/**
	 * The maximum total fees, in millisatoshi, that may accrue during route finding.
	 * 
	 * This limit also applies to the total fees that may arise while retrying failed payment
	 * paths.
	 * 
	 * Note that values below a few sats may result in some paths being spuriously ignored.
	 * 
	 * Defaults to 1% of the payment amount + 50 sats
	 */
	public org.ldk.structs.Option_u64Z get_max_total_routing_fee_msat() {
		long ret = bindings.RouteParametersConfig_get_max_total_routing_fee_msat(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The maximum total fees, in millisatoshi, that may accrue during route finding.
	 * 
	 * This limit also applies to the total fees that may arise while retrying failed payment
	 * paths.
	 * 
	 * Note that values below a few sats may result in some paths being spuriously ignored.
	 * 
	 * Defaults to 1% of the payment amount + 50 sats
	 */
	public void set_max_total_routing_fee_msat(org.ldk.structs.Option_u64Z val) {
		bindings.RouteParametersConfig_set_max_total_routing_fee_msat(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The maximum total CLTV delta we accept for the route.
	 * Defaults to [`DEFAULT_MAX_TOTAL_CLTV_EXPIRY_DELTA`].
	 */
	public int get_max_total_cltv_expiry_delta() {
		int ret = bindings.RouteParametersConfig_get_max_total_cltv_expiry_delta(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The maximum total CLTV delta we accept for the route.
	 * Defaults to [`DEFAULT_MAX_TOTAL_CLTV_EXPIRY_DELTA`].
	 */
	public void set_max_total_cltv_expiry_delta(int val) {
		bindings.RouteParametersConfig_set_max_total_cltv_expiry_delta(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The maximum number of paths that may be used by (MPP) payments.
	 * Defaults to [`DEFAULT_MAX_PATH_COUNT`].
	 */
	public byte get_max_path_count() {
		byte ret = bindings.RouteParametersConfig_get_max_path_count(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The maximum number of paths that may be used by (MPP) payments.
	 * Defaults to [`DEFAULT_MAX_PATH_COUNT`].
	 */
	public void set_max_path_count(byte val) {
		bindings.RouteParametersConfig_set_max_path_count(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Selects the maximum share of a channel's total capacity which will be sent over a channel,
	 * as a power of 1/2. A higher value prefers to send the payment using more MPP parts whereas
	 * a lower value prefers to send larger MPP parts, potentially saturating channels and
	 * increasing failure probability for those paths.
	 * 
	 * Note that this restriction will be relaxed during pathfinding after paths which meet this
	 * restriction have been found. While paths which meet this criteria will be searched for, it
	 * is ultimately up to the scorer to select them over other paths.
	 * 
	 * A value of 0 will allow payments up to and including a channel's total announced usable
	 * capacity, a value of one will only use up to half its capacity, two 1/4, etc.
	 * 
	 * Default value: 2
	 */
	public byte get_max_channel_saturation_power_of_half() {
		byte ret = bindings.RouteParametersConfig_get_max_channel_saturation_power_of_half(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Selects the maximum share of a channel's total capacity which will be sent over a channel,
	 * as a power of 1/2. A higher value prefers to send the payment using more MPP parts whereas
	 * a lower value prefers to send larger MPP parts, potentially saturating channels and
	 * increasing failure probability for those paths.
	 * 
	 * Note that this restriction will be relaxed during pathfinding after paths which meet this
	 * restriction have been found. While paths which meet this criteria will be searched for, it
	 * is ultimately up to the scorer to select them over other paths.
	 * 
	 * A value of 0 will allow payments up to and including a channel's total announced usable
	 * capacity, a value of one will only use up to half its capacity, two 1/4, etc.
	 * 
	 * Default value: 2
	 */
	public void set_max_channel_saturation_power_of_half(byte val) {
		bindings.RouteParametersConfig_set_max_channel_saturation_power_of_half(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new RouteParametersConfig given each field
	 */
	public static org.ldk.structs.RouteParametersConfig of(org.ldk.structs.Option_u64Z max_total_routing_fee_msat_arg, int max_total_cltv_expiry_delta_arg, byte max_path_count_arg, byte max_channel_saturation_power_of_half_arg) {
		long ret = bindings.RouteParametersConfig_new(max_total_routing_fee_msat_arg.ptr, max_total_cltv_expiry_delta_arg, max_path_count_arg, max_channel_saturation_power_of_half_arg);
		GC.KeepAlive(max_total_routing_fee_msat_arg);
		GC.KeepAlive(max_total_cltv_expiry_delta_arg);
		GC.KeepAlive(max_path_count_arg);
		GC.KeepAlive(max_channel_saturation_power_of_half_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParametersConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParametersConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.RouteParametersConfig_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RouteParametersConfig
	 */
	public org.ldk.structs.RouteParametersConfig clone() {
		long ret = bindings.RouteParametersConfig_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParametersConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParametersConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the RouteParametersConfig object into a byte array which can be read by RouteParametersConfig_read
	 */
	public byte[] write() {
		long ret = bindings.RouteParametersConfig_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RouteParametersConfig from a byte array, created by RouteParametersConfig_write
	 */
	public static org.ldk.structs.Result_RouteParametersConfigDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RouteParametersConfig_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteParametersConfigDecodeErrorZ ret_hu_conv = Result_RouteParametersConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" RouteParametersConfig. See struct and individual field documentaiton for details on which values are used.
	 */
	public static org.ldk.structs.RouteParametersConfig with_default() {
		long ret = bindings.RouteParametersConfig_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParametersConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParametersConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
