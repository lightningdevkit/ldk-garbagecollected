
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`CandidateRouteHop::PublicHop`] entry.
 */
export class PublicHopCandidate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PublicHopCandidate_free);
	}

	/**
	 * The short channel ID of the channel, i.e. the identifier by which we refer to this
	 * channel.
	 */
	public get_short_channel_id(): bigint {
		const ret: bigint = bindings.PublicHopCandidate_get_short_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The short channel ID of the channel, i.e. the identifier by which we refer to this
	 * channel.
	 */
	public set_short_channel_id(val: bigint): void {
		bindings.PublicHopCandidate_set_short_channel_id(this.ptr, val);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PublicHopCandidate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PublicHopCandidate
	 */
	public clone(): PublicHopCandidate {
		const ret: bigint = bindings.PublicHopCandidate_clone(this.ptr);
		const ret_hu_conv: PublicHopCandidate = new PublicHopCandidate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
