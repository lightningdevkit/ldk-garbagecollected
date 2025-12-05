
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`channel_reestablish`] message to be sent to or received from a peer.
 * 
 * [`channel_reestablish`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#message-retransmission
 */
export class ChannelReestablish extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelReestablish_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.ChannelReestablish_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.ChannelReestablish_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The next commitment number for the sender
	 */
	public get_next_local_commitment_number(): bigint {
		const ret: bigint = bindings.ChannelReestablish_get_next_local_commitment_number(this.ptr);
		return ret;
	}

	/**
	 * The next commitment number for the sender
	 */
	public set_next_local_commitment_number(val: bigint): void {
		bindings.ChannelReestablish_set_next_local_commitment_number(this.ptr, val);
	}

	/**
	 * The next commitment number for the recipient
	 */
	public get_next_remote_commitment_number(): bigint {
		const ret: bigint = bindings.ChannelReestablish_get_next_remote_commitment_number(this.ptr);
		return ret;
	}

	/**
	 * The next commitment number for the recipient
	 */
	public set_next_remote_commitment_number(val: bigint): void {
		bindings.ChannelReestablish_set_next_remote_commitment_number(this.ptr, val);
	}

	/**
	 * Proof that the sender knows the per-commitment secret of a specific commitment transaction
	 * belonging to the recipient
	 */
	public get_your_last_per_commitment_secret(): Uint8Array {
		const ret: number = bindings.ChannelReestablish_get_your_last_per_commitment_secret(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Proof that the sender knows the per-commitment secret of a specific commitment transaction
	 * belonging to the recipient
	 */
	public set_your_last_per_commitment_secret(val: Uint8Array): void {
		bindings.ChannelReestablish_set_your_last_per_commitment_secret(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The sender's per-commitment point for their current commitment transaction
	 */
	public get_my_current_per_commitment_point(): Uint8Array {
		const ret: number = bindings.ChannelReestablish_get_my_current_per_commitment_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The sender's per-commitment point for their current commitment transaction
	 */
	public set_my_current_per_commitment_point(val: Uint8Array): void {
		bindings.ChannelReestablish_set_my_current_per_commitment_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The next funding transaction ID
	 * 
	 * Allows peers to finalize the signing steps of an interactive transaction construction, or
	 * safely abort that transaction if it was not signed by one of the peers, who has thus already
	 * removed it from its state.
	 * 
	 * If we've sent `commtiment_signed` for an interactively constructed transaction
	 * during a signing session, but have not received `tx_signatures` we MUST set `next_funding`
	 * to the txid of that interactive transaction, else we MUST NOT set it.
	 * 
	 * See the spec for further details on this:
	 * `channel_reestablish`-sending node: https:///github.com/lightning/bolts/blob/247e83d/02-peer-protocol.md?plain=1#L2466-L2470
	 * `channel_reestablish`-receiving node: https:///github.com/lightning/bolts/blob/247e83d/02-peer-protocol.md?plain=1#L2520-L2531
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_next_funding(): NextFunding {
		const ret: bigint = bindings.ChannelReestablish_get_next_funding(this.ptr);
		const ret_hu_conv: NextFunding = new NextFunding(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The next funding transaction ID
	 * 
	 * Allows peers to finalize the signing steps of an interactive transaction construction, or
	 * safely abort that transaction if it was not signed by one of the peers, who has thus already
	 * removed it from its state.
	 * 
	 * If we've sent `commtiment_signed` for an interactively constructed transaction
	 * during a signing session, but have not received `tx_signatures` we MUST set `next_funding`
	 * to the txid of that interactive transaction, else we MUST NOT set it.
	 * 
	 * See the spec for further details on this:
	 * `channel_reestablish`-sending node: https:///github.com/lightning/bolts/blob/247e83d/02-peer-protocol.md?plain=1#L2466-L2470
	 * `channel_reestablish`-receiving node: https:///github.com/lightning/bolts/blob/247e83d/02-peer-protocol.md?plain=1#L2520-L2531
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_next_funding(val: NextFunding|null): void {
		bindings.ChannelReestablish_set_next_funding(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * The last funding txid sent by the sending node, which may be:
	 * - the txid of the last `splice_locked` it sent, otherwise
	 * - the txid of the funding transaction if it sent `channel_ready`, or else
	 * - `None` if it has never sent `channel_ready` or `splice_locked`
	 * 
	 * Also contains a bitfield indicating which messages should be retransmitted.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_my_current_funding_locked(): FundingLocked {
		const ret: bigint = bindings.ChannelReestablish_get_my_current_funding_locked(this.ptr);
		const ret_hu_conv: FundingLocked = new FundingLocked(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The last funding txid sent by the sending node, which may be:
	 * - the txid of the last `splice_locked` it sent, otherwise
	 * - the txid of the funding transaction if it sent `channel_ready`, or else
	 * - `None` if it has never sent `channel_ready` or `splice_locked`
	 * 
	 * Also contains a bitfield indicating which messages should be retransmitted.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_my_current_funding_locked(val: FundingLocked|null): void {
		bindings.ChannelReestablish_set_my_current_funding_locked(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelReestablish given each field
	 * 
	 * Note that next_funding_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that my_current_funding_locked_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(channel_id_arg: ChannelId, next_local_commitment_number_arg: bigint, next_remote_commitment_number_arg: bigint, your_last_per_commitment_secret_arg: Uint8Array, my_current_per_commitment_point_arg: Uint8Array, next_funding_arg: NextFunding|null, my_current_funding_locked_arg: FundingLocked|null): ChannelReestablish {
		const ret: bigint = bindings.ChannelReestablish_new(CommonBase.get_ptr_of(channel_id_arg), next_local_commitment_number_arg, next_remote_commitment_number_arg, bindings.encodeUint8Array(your_last_per_commitment_secret_arg), bindings.encodeUint8Array(my_current_per_commitment_point_arg), next_funding_arg == null ? 0n : CommonBase.get_ptr_of(next_funding_arg), my_current_funding_locked_arg == null ? 0n : CommonBase.get_ptr_of(my_current_funding_locked_arg));
		const ret_hu_conv: ChannelReestablish = new ChannelReestablish(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelReestablish_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelReestablish
	 */
	public clone(): ChannelReestablish {
		const ret: bigint = bindings.ChannelReestablish_clone(this.ptr);
		const ret_hu_conv: ChannelReestablish = new ChannelReestablish(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelReestablish.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ChannelReestablish_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ChannelReestablishs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelReestablish): boolean {
		const ret: boolean = bindings.ChannelReestablish_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ChannelReestablish object into a byte array which can be read by ChannelReestablish_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelReestablish_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelReestablish from a byte array, created by ChannelReestablish_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelReestablishDecodeErrorZ {
		const ret: bigint = bindings.ChannelReestablish_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelReestablishDecodeErrorZ = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
