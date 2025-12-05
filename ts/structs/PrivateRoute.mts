
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Private routing information
 * 
 * # Invariants
 * The encoded route has to be <1024 5bit characters long (<=639 bytes or <=12 hops)
 */
export class PrivateRoute extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PrivateRoute_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PrivateRoute_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PrivateRoute
	 */
	public clone(): PrivateRoute {
		const ret: bigint = bindings.PrivateRoute_clone(this.ptr);
		const ret_hu_conv: PrivateRoute = new PrivateRoute(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PrivateRoute.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.PrivateRoute_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two PrivateRoutes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: PrivateRoute): boolean {
		const ret: boolean = bindings.PrivateRoute_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Creates a new (partial) route from a list of hops
	 */
	public static constructor_new(hops: RouteHint): Result_PrivateRouteCreationErrorZ {
		const ret: bigint = bindings.PrivateRoute_new(CommonBase.get_ptr_of(hops));
		const ret_hu_conv: Result_PrivateRouteCreationErrorZ = Result_PrivateRouteCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the underlying list of hops
	 */
	public into_inner(): RouteHint {
		const ret: bigint = bindings.PrivateRoute_into_inner(this.ptr);
		const ret_hu_conv: RouteHint = new RouteHint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
