
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`revoke_and_ack`] message to be sent to or received from a peer.
 * 
 * [`revoke_and_ack`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#completing-the-transition-to-the-updated-state-revoke_and_ack
 */
export class RevokeAndACK extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RevokeAndACK_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.RevokeAndACK_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.RevokeAndACK_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The secret corresponding to the per-commitment point
	 */
	public get_per_commitment_secret(): Uint8Array {
		const ret: number = bindings.RevokeAndACK_get_per_commitment_secret(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The secret corresponding to the per-commitment point
	 */
	public set_per_commitment_secret(val: Uint8Array): void {
		bindings.RevokeAndACK_set_per_commitment_secret(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The next sender-broadcast commitment transaction's per-commitment point
	 */
	public get_next_per_commitment_point(): Uint8Array {
		const ret: number = bindings.RevokeAndACK_get_next_per_commitment_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The next sender-broadcast commitment transaction's per-commitment point
	 */
	public set_next_per_commitment_point(val: Uint8Array): void {
		bindings.RevokeAndACK_set_next_per_commitment_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * A list of `(htlc_id, blinded_path)`. The receiver of this message will use the blinded paths
	 * as reply paths to [`HeldHtlcAvailable`] onion messages that they send to the often-offline
	 * receiver of this HTLC. The `htlc_id` is used by the receiver of this message to identify which
	 * held HTLC a given blinded path corresponds to.
	 * 
	 * [`HeldHtlcAvailable`]: crate::onion_message::async_payments::HeldHtlcAvailable
	 * 
	 * Returns a copy of the field.
	 */
	public get_release_htlc_message_paths(): TwoTuple_u64BlindedMessagePathZ[] {
		const ret: number = bindings.RevokeAndACK_get_release_htlc_message_paths(this.ptr);
		const ret_conv_33_len: number = bindings.getArrayLength(ret);
		const ret_conv_33_arr: TwoTuple_u64BlindedMessagePathZ[] = new Array(ret_conv_33_len).fill(null);
		for (var h = 0; h < ret_conv_33_len; h++) {
			const ret_conv_33: bigint = bindings.getU64ArrayElem(ret, h);
			const ret_conv_33_hu_conv: TwoTuple_u64BlindedMessagePathZ = new TwoTuple_u64BlindedMessagePathZ(null, ret_conv_33);
			CommonBase.add_ref_from(ret_conv_33_hu_conv, this);
			ret_conv_33_arr[h] = ret_conv_33_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_33_arr;
	}

	/**
	 * A list of `(htlc_id, blinded_path)`. The receiver of this message will use the blinded paths
	 * as reply paths to [`HeldHtlcAvailable`] onion messages that they send to the often-offline
	 * receiver of this HTLC. The `htlc_id` is used by the receiver of this message to identify which
	 * held HTLC a given blinded path corresponds to.
	 * 
	 * [`HeldHtlcAvailable`]: crate::onion_message::async_payments::HeldHtlcAvailable
	 */
	public set_release_htlc_message_paths(val: TwoTuple_u64BlindedMessagePathZ[]): void {
		bindings.RevokeAndACK_set_release_htlc_message_paths(this.ptr, bindings.encodeUint64Array(val.map(val_conv_33 => CommonBase.get_ptr_of(val_conv_33))));
	}

	/**
	 * Constructs a new RevokeAndACK given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, per_commitment_secret_arg: Uint8Array, next_per_commitment_point_arg: Uint8Array, release_htlc_message_paths_arg: TwoTuple_u64BlindedMessagePathZ[]): RevokeAndACK {
		const ret: bigint = bindings.RevokeAndACK_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeUint8Array(per_commitment_secret_arg), bindings.encodeUint8Array(next_per_commitment_point_arg), bindings.encodeUint64Array(release_htlc_message_paths_arg.map(release_htlc_message_paths_arg_conv_33 => CommonBase.get_ptr_of(release_htlc_message_paths_arg_conv_33))));
		const ret_hu_conv: RevokeAndACK = new RevokeAndACK(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RevokeAndACK_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RevokeAndACK
	 */
	public clone(): RevokeAndACK {
		const ret: bigint = bindings.RevokeAndACK_clone(this.ptr);
		const ret_hu_conv: RevokeAndACK = new RevokeAndACK(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RevokeAndACK.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.RevokeAndACK_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two RevokeAndACKs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RevokeAndACK): boolean {
		const ret: boolean = bindings.RevokeAndACK_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the RevokeAndACK object into a byte array which can be read by RevokeAndACK_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.RevokeAndACK_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RevokeAndACK from a byte array, created by RevokeAndACK_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RevokeAndACKDecodeErrorZ {
		const ret: bigint = bindings.RevokeAndACK_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RevokeAndACKDecodeErrorZ = Result_RevokeAndACKDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
