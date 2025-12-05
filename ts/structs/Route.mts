
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A route directs a payment from the sender (us) to the recipient. If the recipient supports MPP,
 * it can take multiple paths. Each path is composed of one or more hops through the network.
 */
export class Route extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Route_free);
	}

	/**
	 * The list of [`Path`]s taken for a single (potentially-)multi-part payment. If no
	 * [`BlindedTail`]s are present, then the pubkey of the last [`RouteHop`] in each path must be
	 * the same.
	 */
	public get_paths(): Path[] {
		const ret: number = bindings.Route_get_paths(this.ptr);
		const ret_conv_6_len: number = bindings.getArrayLength(ret);
		const ret_conv_6_arr: Path[] = new Array(ret_conv_6_len).fill(null);
		for (var g = 0; g < ret_conv_6_len; g++) {
			const ret_conv_6: bigint = bindings.getU64ArrayElem(ret, g);
			const ret_conv_6_hu_conv: Path = new Path(null, ret_conv_6);
			CommonBase.add_ref_from(ret_conv_6_hu_conv, this);
			ret_conv_6_arr[g] = ret_conv_6_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_6_arr;
	}

	/**
	 * The list of [`Path`]s taken for a single (potentially-)multi-part payment. If no
	 * [`BlindedTail`]s are present, then the pubkey of the last [`RouteHop`] in each path must be
	 * the same.
	 */
	public set_paths(val: Path[]): void {
		bindings.Route_set_paths(this.ptr, bindings.encodeUint64Array(val.map(val_conv_6 => CommonBase.get_ptr_of(val_conv_6))));
	}

	/**
	 * The `route_params` parameter passed to [`find_route`].
	 * 
	 * This is used by `ChannelManager` to track information which may be required for retries.
	 * 
	 * Will be `None` for objects serialized with LDK versions prior to 0.0.117.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_route_params(): RouteParameters {
		const ret: bigint = bindings.Route_get_route_params(this.ptr);
		const ret_hu_conv: RouteParameters = new RouteParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The `route_params` parameter passed to [`find_route`].
	 * 
	 * This is used by `ChannelManager` to track information which may be required for retries.
	 * 
	 * Will be `None` for objects serialized with LDK versions prior to 0.0.117.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_route_params(val: RouteParameters|null): void {
		bindings.Route_set_route_params(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new Route given each field
	 * 
	 * Note that route_params_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(paths_arg: Path[], route_params_arg: RouteParameters|null): Route {
		const ret: bigint = bindings.Route_new(bindings.encodeUint64Array(paths_arg.map(paths_arg_conv_6 => CommonBase.get_ptr_of(paths_arg_conv_6))), route_params_arg == null ? 0n : CommonBase.get_ptr_of(route_params_arg));
		const ret_hu_conv: Route = new Route(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Route_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Route
	 */
	public clone(): Route {
		const ret: bigint = bindings.Route_clone(this.ptr);
		const ret_hu_conv: Route = new Route(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Route.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Route_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Routes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Route): boolean {
		const ret: boolean = bindings.Route_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Returns the total amount of fees paid on this [`Route`].
	 * 
	 * For objects serialized with LDK 0.0.117 and after, this includes any extra payment made to
	 * the recipient, which can happen in excess of the amount passed to [`find_route`] via
	 * [`RouteParameters::final_value_msat`], if we had to reach the [`htlc_minimum_msat`] limits.
	 * 
	 * [`htlc_minimum_msat`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_update-message
	 */
	public get_total_fees(): bigint {
		const ret: bigint = bindings.Route_get_total_fees(this.ptr);
		return ret;
	}

	/**
	 * Returns the total amount paid on this [`Route`], excluding the fees.
	 * 
	 * Might be more than requested as part of the given [`RouteParameters::final_value_msat`] if
	 * we had to reach the [`htlc_minimum_msat`] limits.
	 * 
	 * [`htlc_minimum_msat`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_update-message
	 */
	public get_total_amount(): bigint {
		const ret: bigint = bindings.Route_get_total_amount(this.ptr);
		return ret;
	}

	/**
	 * Get the string representation of a Route object
	 */
	public to_str(): string {
		const ret: number = bindings.Route_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the Route object into a byte array which can be read by Route_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Route_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Route from a byte array, created by Route_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RouteDecodeErrorZ {
		const ret: bigint = bindings.Route_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RouteDecodeErrorZ = Result_RouteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
