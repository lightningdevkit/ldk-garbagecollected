
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Container for live and historical liquidity bounds for each channel.
 */
export class ChannelLiquidities extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelLiquidities_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelLiquidities_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelLiquidities
	 */
	public clone(): ChannelLiquidities {
		const ret: bigint = bindings.ChannelLiquidities_clone(this.ptr);
		const ret_hu_conv: ChannelLiquidities = new ChannelLiquidities(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Read a ChannelLiquidities from a byte array, created by ChannelLiquidities_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelLiquiditiesDecodeErrorZ {
		const ret: bigint = bindings.ChannelLiquidities_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelLiquiditiesDecodeErrorZ = Result_ChannelLiquiditiesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelLiquidities object into a byte array which can be read by ChannelLiquidities_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelLiquidities_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
