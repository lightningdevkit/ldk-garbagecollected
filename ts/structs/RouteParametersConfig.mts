
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A struct for configuring parameters for routing the payment.
 */
export class RouteParametersConfig extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RouteParametersConfig_free);
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
	public get_max_total_routing_fee_msat(): Option_u64Z {
		const ret: bigint = bindings.RouteParametersConfig_get_max_total_routing_fee_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
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
	public set_max_total_routing_fee_msat(val: Option_u64Z): void {
		bindings.RouteParametersConfig_set_max_total_routing_fee_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The maximum total CLTV delta we accept for the route.
	 * Defaults to [`DEFAULT_MAX_TOTAL_CLTV_EXPIRY_DELTA`].
	 */
	public get_max_total_cltv_expiry_delta(): number {
		const ret: number = bindings.RouteParametersConfig_get_max_total_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The maximum total CLTV delta we accept for the route.
	 * Defaults to [`DEFAULT_MAX_TOTAL_CLTV_EXPIRY_DELTA`].
	 */
	public set_max_total_cltv_expiry_delta(val: number): void {
		bindings.RouteParametersConfig_set_max_total_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * The maximum number of paths that may be used by (MPP) payments.
	 * Defaults to [`DEFAULT_MAX_PATH_COUNT`].
	 */
	public get_max_path_count(): number {
		const ret: number = bindings.RouteParametersConfig_get_max_path_count(this.ptr);
		return ret;
	}

	/**
	 * The maximum number of paths that may be used by (MPP) payments.
	 * Defaults to [`DEFAULT_MAX_PATH_COUNT`].
	 */
	public set_max_path_count(val: number): void {
		bindings.RouteParametersConfig_set_max_path_count(this.ptr, val);
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
	public get_max_channel_saturation_power_of_half(): number {
		const ret: number = bindings.RouteParametersConfig_get_max_channel_saturation_power_of_half(this.ptr);
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
	public set_max_channel_saturation_power_of_half(val: number): void {
		bindings.RouteParametersConfig_set_max_channel_saturation_power_of_half(this.ptr, val);
	}

	/**
	 * Constructs a new RouteParametersConfig given each field
	 */
	public static constructor_new(max_total_routing_fee_msat_arg: Option_u64Z, max_total_cltv_expiry_delta_arg: number, max_path_count_arg: number, max_channel_saturation_power_of_half_arg: number): RouteParametersConfig {
		const ret: bigint = bindings.RouteParametersConfig_new(CommonBase.get_ptr_of(max_total_routing_fee_msat_arg), max_total_cltv_expiry_delta_arg, max_path_count_arg, max_channel_saturation_power_of_half_arg);
		const ret_hu_conv: RouteParametersConfig = new RouteParametersConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RouteParametersConfig_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RouteParametersConfig
	 */
	public clone(): RouteParametersConfig {
		const ret: bigint = bindings.RouteParametersConfig_clone(this.ptr);
		const ret_hu_conv: RouteParametersConfig = new RouteParametersConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the RouteParametersConfig object into a byte array which can be read by RouteParametersConfig_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.RouteParametersConfig_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RouteParametersConfig from a byte array, created by RouteParametersConfig_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RouteParametersConfigDecodeErrorZ {
		const ret: bigint = bindings.RouteParametersConfig_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RouteParametersConfigDecodeErrorZ = Result_RouteParametersConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" RouteParametersConfig. See struct and individual field documentaiton for details on which values are used.
	 */
	public static constructor_default(): RouteParametersConfig {
		const ret: bigint = bindings.RouteParametersConfig_default();
		const ret_hu_conv: RouteParametersConfig = new RouteParametersConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
