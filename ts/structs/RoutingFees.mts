
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Fees for routing via a given channel or a node
 */
export class RoutingFees extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RoutingFees_free);
	}

	/**
	 * Serialize the RoutingFees object into a byte array which can be read by RoutingFees_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.RoutingFees_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RoutingFees from a byte array, created by RoutingFees_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RoutingFeesDecodeErrorZ {
		const ret: bigint = bindings.RoutingFees_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RoutingFeesDecodeErrorZ = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Flat routing fee in millisatoshis.
	 */
	public get_base_msat(): number {
		const ret: number = bindings.RoutingFees_get_base_msat(this.ptr);
		return ret;
	}

	/**
	 * Flat routing fee in millisatoshis.
	 */
	public set_base_msat(val: number): void {
		bindings.RoutingFees_set_base_msat(this.ptr, val);
	}

	/**
	 * Liquidity-based routing fee in millionths of a routed amount.
	 * In other words, 10000 is 1%.
	 */
	public get_proportional_millionths(): number {
		const ret: number = bindings.RoutingFees_get_proportional_millionths(this.ptr);
		return ret;
	}

	/**
	 * Liquidity-based routing fee in millionths of a routed amount.
	 * In other words, 10000 is 1%.
	 */
	public set_proportional_millionths(val: number): void {
		bindings.RoutingFees_set_proportional_millionths(this.ptr, val);
	}

	/**
	 * Constructs a new RoutingFees given each field
	 */
	public static constructor_new(base_msat_arg: number, proportional_millionths_arg: number): RoutingFees {
		const ret: bigint = bindings.RoutingFees_new(base_msat_arg, proportional_millionths_arg);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two RoutingFeess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RoutingFees): boolean {
		const ret: boolean = bindings.RoutingFees_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RoutingFees_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RoutingFees
	 */
	public clone(): RoutingFees {
		const ret: bigint = bindings.RoutingFees_clone(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RoutingFees.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.RoutingFees_hash(this.ptr);
		return ret;
	}

}
