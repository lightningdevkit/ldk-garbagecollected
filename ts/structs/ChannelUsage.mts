
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Proposed use of a channel passed as a parameter to [`ScoreLookUp::channel_penalty_msat`].
 */
export class ChannelUsage extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelUsage_free);
	}

	/**
	 * The amount to send through the channel, denominated in millisatoshis.
	 */
	public get_amount_msat(): bigint {
		const ret: bigint = bindings.ChannelUsage_get_amount_msat(this.ptr);
		return ret;
	}

	/**
	 * The amount to send through the channel, denominated in millisatoshis.
	 */
	public set_amount_msat(val: bigint): void {
		bindings.ChannelUsage_set_amount_msat(this.ptr, val);
	}

	/**
	 * Total amount, denominated in millisatoshis, already allocated to send through the channel
	 * as part of a multi-path payment.
	 */
	public get_inflight_htlc_msat(): bigint {
		const ret: bigint = bindings.ChannelUsage_get_inflight_htlc_msat(this.ptr);
		return ret;
	}

	/**
	 * Total amount, denominated in millisatoshis, already allocated to send through the channel
	 * as part of a multi-path payment.
	 */
	public set_inflight_htlc_msat(val: bigint): void {
		bindings.ChannelUsage_set_inflight_htlc_msat(this.ptr, val);
	}

	/**
	 * The effective capacity of the channel.
	 */
	public get_effective_capacity(): EffectiveCapacity {
		const ret: bigint = bindings.ChannelUsage_get_effective_capacity(this.ptr);
		const ret_hu_conv: EffectiveCapacity = EffectiveCapacity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The effective capacity of the channel.
	 */
	public set_effective_capacity(val: EffectiveCapacity): void {
		bindings.ChannelUsage_set_effective_capacity(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelUsage given each field
	 */
	public static constructor_new(amount_msat_arg: bigint, inflight_htlc_msat_arg: bigint, effective_capacity_arg: EffectiveCapacity): ChannelUsage {
		const ret: bigint = bindings.ChannelUsage_new(amount_msat_arg, inflight_htlc_msat_arg, CommonBase.get_ptr_of(effective_capacity_arg));
		const ret_hu_conv: ChannelUsage = new ChannelUsage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelUsage_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelUsage
	 */
	public clone(): ChannelUsage {
		const ret: bigint = bindings.ChannelUsage_clone(this.ptr);
		const ret_hu_conv: ChannelUsage = new ChannelUsage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
