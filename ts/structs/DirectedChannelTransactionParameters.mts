
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Static channel fields used to build transactions given per-commitment fields, organized by
 * broadcaster/countersignatory.
 * 
 * This is derived from the holder/counterparty-organized ChannelTransactionParameters via the
 * as_holder_broadcastable and as_counterparty_broadcastable functions.
 */
export class DirectedChannelTransactionParameters extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DirectedChannelTransactionParameters_free);
	}

	/**
	 * Get the channel pubkeys for the broadcaster
	 */
	public broadcaster_pubkeys(): ChannelPublicKeys {
		const ret: bigint = bindings.DirectedChannelTransactionParameters_broadcaster_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Get the channel pubkeys for the countersignatory
	 */
	public countersignatory_pubkeys(): ChannelPublicKeys {
		const ret: bigint = bindings.DirectedChannelTransactionParameters_countersignatory_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Get the contest delay applicable to the transactions.
	 * Note that the contest delay was selected by the countersignatory.
	 */
	public contest_delay(): number {
		const ret: number = bindings.DirectedChannelTransactionParameters_contest_delay(this.ptr);
		return ret;
	}

	/**
	 * Whether the channel is outbound from the broadcaster.
	 * 
	 * The boolean representing the side that initiated the channel is
	 * an input to the commitment number obscure factor computation.
	 */
	public is_outbound(): boolean {
		const ret: boolean = bindings.DirectedChannelTransactionParameters_is_outbound(this.ptr);
		return ret;
	}

	/**
	 * The funding outpoint
	 */
	public funding_outpoint(): OutPoint {
		const ret: bigint = bindings.DirectedChannelTransactionParameters_funding_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The type of channel these parameters are for
	 */
	public channel_type_features(): ChannelTypeFeatures {
		const ret: bigint = bindings.DirectedChannelTransactionParameters_channel_type_features(this.ptr);
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The value locked in the channel, denominated in satoshis.
	 */
	public channel_value_satoshis(): bigint {
		const ret: bigint = bindings.DirectedChannelTransactionParameters_channel_value_satoshis(this.ptr);
		return ret;
	}

}
