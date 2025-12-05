
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`update_add_htlc`] message to be sent to or received from a peer.
 * 
 * [`update_add_htlc`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#adding-an-htlc-update_add_htlc
 */
export class UpdateAddHTLC extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UpdateAddHTLC_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.UpdateAddHTLC_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.UpdateAddHTLC_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The HTLC ID
	 */
	public get_htlc_id(): bigint {
		const ret: bigint = bindings.UpdateAddHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	/**
	 * The HTLC ID
	 */
	public set_htlc_id(val: bigint): void {
		bindings.UpdateAddHTLC_set_htlc_id(this.ptr, val);
	}

	/**
	 * The HTLC value in milli-satoshi
	 */
	public get_amount_msat(): bigint {
		const ret: bigint = bindings.UpdateAddHTLC_get_amount_msat(this.ptr);
		return ret;
	}

	/**
	 * The HTLC value in milli-satoshi
	 */
	public set_amount_msat(val: bigint): void {
		bindings.UpdateAddHTLC_set_amount_msat(this.ptr, val);
	}

	/**
	 * The payment hash, the pre-image of which controls HTLC redemption
	 */
	public get_payment_hash(): Uint8Array {
		const ret: number = bindings.UpdateAddHTLC_get_payment_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The payment hash, the pre-image of which controls HTLC redemption
	 */
	public set_payment_hash(val: Uint8Array): void {
		bindings.UpdateAddHTLC_set_payment_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The expiry height of the HTLC
	 */
	public get_cltv_expiry(): number {
		const ret: number = bindings.UpdateAddHTLC_get_cltv_expiry(this.ptr);
		return ret;
	}

	/**
	 * The expiry height of the HTLC
	 */
	public set_cltv_expiry(val: number): void {
		bindings.UpdateAddHTLC_set_cltv_expiry(this.ptr, val);
	}

	/**
	 * The extra fee skimmed by the sender of this message. See
	 * [`ChannelConfig::accept_underpaying_htlcs`].
	 * 
	 * [`ChannelConfig::accept_underpaying_htlcs`]: crate::util::config::ChannelConfig::accept_underpaying_htlcs
	 */
	public get_skimmed_fee_msat(): Option_u64Z {
		const ret: bigint = bindings.UpdateAddHTLC_get_skimmed_fee_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The extra fee skimmed by the sender of this message. See
	 * [`ChannelConfig::accept_underpaying_htlcs`].
	 * 
	 * [`ChannelConfig::accept_underpaying_htlcs`]: crate::util::config::ChannelConfig::accept_underpaying_htlcs
	 */
	public set_skimmed_fee_msat(val: Option_u64Z): void {
		bindings.UpdateAddHTLC_set_skimmed_fee_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The onion routing packet with encrypted data for the next hop.
	 */
	public get_onion_routing_packet(): OnionPacket {
		const ret: bigint = bindings.UpdateAddHTLC_get_onion_routing_packet(this.ptr);
		const ret_hu_conv: OnionPacket = new OnionPacket(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The onion routing packet with encrypted data for the next hop.
	 */
	public set_onion_routing_packet(val: OnionPacket): void {
		bindings.UpdateAddHTLC_set_onion_routing_packet(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Provided if we are relaying or receiving a payment within a blinded path, to decrypt the onion
	 * routing packet and the recipient-provided encrypted payload within.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_blinding_point(): Uint8Array {
		const ret: number = bindings.UpdateAddHTLC_get_blinding_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Provided if we are relaying or receiving a payment within a blinded path, to decrypt the onion
	 * routing packet and the recipient-provided encrypted payload within.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_blinding_point(val: Uint8Array|null): void {
		bindings.UpdateAddHTLC_set_blinding_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Set to `Some` if the sender wants the receiver of this message to hold onto this HTLC until
	 * receipt of a [`ReleaseHeldHtlc`] onion message from the payment recipient.
	 * 
	 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
	 */
	public get_hold_htlc(): COption_NoneZ {
		const ret: COption_NoneZ = bindings.UpdateAddHTLC_get_hold_htlc(this.ptr);
		return ret;
	}

	/**
	 * Set to `Some` if the sender wants the receiver of this message to hold onto this HTLC until
	 * receipt of a [`ReleaseHeldHtlc`] onion message from the payment recipient.
	 * 
	 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
	 */
	public set_hold_htlc(val: COption_NoneZ): void {
		bindings.UpdateAddHTLC_set_hold_htlc(this.ptr, val);
	}

	/**
	 * Constructs a new UpdateAddHTLC given each field
	 * 
	 * Note that blinding_point_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(channel_id_arg: ChannelId, htlc_id_arg: bigint, amount_msat_arg: bigint, payment_hash_arg: Uint8Array, cltv_expiry_arg: number, skimmed_fee_msat_arg: Option_u64Z, onion_routing_packet_arg: OnionPacket, blinding_point_arg: Uint8Array|null, hold_htlc_arg: COption_NoneZ): UpdateAddHTLC {
		const ret: bigint = bindings.UpdateAddHTLC_new(CommonBase.get_ptr_of(channel_id_arg), htlc_id_arg, amount_msat_arg, bindings.encodeUint8Array(payment_hash_arg), cltv_expiry_arg, CommonBase.get_ptr_of(skimmed_fee_msat_arg), CommonBase.get_ptr_of(onion_routing_packet_arg), bindings.encodeUint8Array(blinding_point_arg), hold_htlc_arg);
		const ret_hu_conv: UpdateAddHTLC = new UpdateAddHTLC(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UpdateAddHTLC_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UpdateAddHTLC
	 */
	public clone(): UpdateAddHTLC {
		const ret: bigint = bindings.UpdateAddHTLC_clone(this.ptr);
		const ret_hu_conv: UpdateAddHTLC = new UpdateAddHTLC(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UpdateAddHTLC.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.UpdateAddHTLC_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two UpdateAddHTLCs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: UpdateAddHTLC): boolean {
		const ret: boolean = bindings.UpdateAddHTLC_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the UpdateAddHTLC object into a byte array which can be read by UpdateAddHTLC_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UpdateAddHTLC_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UpdateAddHTLC from a byte array, created by UpdateAddHTLC_write
	 */
	public static constructor_read(ser: Uint8Array): Result_UpdateAddHTLCDecodeErrorZ {
		const ret: bigint = bindings.UpdateAddHTLC_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_UpdateAddHTLCDecodeErrorZ = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
