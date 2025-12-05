
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information about an incoming HTLC, including the [`PendingHTLCRouting`] describing where it
 * should go next.
 */
export class PendingHTLCInfo extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PendingHTLCInfo_free);
	}

	/**
	 * Further routing details based on whether the HTLC is being forwarded or received.
	 */
	public get_routing(): PendingHTLCRouting {
		const ret: bigint = bindings.PendingHTLCInfo_get_routing(this.ptr);
		const ret_hu_conv: PendingHTLCRouting = PendingHTLCRouting.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Further routing details based on whether the HTLC is being forwarded or received.
	 */
	public set_routing(val: PendingHTLCRouting): void {
		bindings.PendingHTLCInfo_set_routing(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The onion shared secret we build with the sender used to decrypt the onion.
	 * 
	 * This is later used to encrypt failure packets in the event that the HTLC is failed.
	 */
	public get_incoming_shared_secret(): Uint8Array {
		const ret: number = bindings.PendingHTLCInfo_get_incoming_shared_secret(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The onion shared secret we build with the sender used to decrypt the onion.
	 * 
	 * This is later used to encrypt failure packets in the event that the HTLC is failed.
	 */
	public set_incoming_shared_secret(val: Uint8Array): void {
		bindings.PendingHTLCInfo_set_incoming_shared_secret(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Hash of the payment preimage, to lock the payment until the receiver releases the preimage.
	 */
	public get_payment_hash(): Uint8Array {
		const ret: number = bindings.PendingHTLCInfo_get_payment_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Hash of the payment preimage, to lock the payment until the receiver releases the preimage.
	 */
	public set_payment_hash(val: Uint8Array): void {
		bindings.PendingHTLCInfo_set_payment_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Amount received in the incoming HTLC.
	 * 
	 * This field was added in LDK 0.0.113 and will be `None` for objects written by prior
	 * versions.
	 */
	public get_incoming_amt_msat(): Option_u64Z {
		const ret: bigint = bindings.PendingHTLCInfo_get_incoming_amt_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Amount received in the incoming HTLC.
	 * 
	 * This field was added in LDK 0.0.113 and will be `None` for objects written by prior
	 * versions.
	 */
	public set_incoming_amt_msat(val: Option_u64Z): void {
		bindings.PendingHTLCInfo_set_incoming_amt_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The amount the sender indicated should be forwarded on to the next hop or amount the sender
	 * intended for us to receive for received payments.
	 * 
	 * If the received amount is less than this for received payments, an intermediary hop has
	 * attempted to steal some of our funds and we should fail the HTLC (the sender should retry
	 * it along another path).
	 * 
	 * Because nodes can take less than their required fees, and because senders may wish to
	 * improve their own privacy, this amount may be less than [`Self::incoming_amt_msat`] for
	 * received payments. In such cases, recipients must handle this HTLC as if it had received
	 * [`Self::outgoing_amt_msat`].
	 */
	public get_outgoing_amt_msat(): bigint {
		const ret: bigint = bindings.PendingHTLCInfo_get_outgoing_amt_msat(this.ptr);
		return ret;
	}

	/**
	 * The amount the sender indicated should be forwarded on to the next hop or amount the sender
	 * intended for us to receive for received payments.
	 * 
	 * If the received amount is less than this for received payments, an intermediary hop has
	 * attempted to steal some of our funds and we should fail the HTLC (the sender should retry
	 * it along another path).
	 * 
	 * Because nodes can take less than their required fees, and because senders may wish to
	 * improve their own privacy, this amount may be less than [`Self::incoming_amt_msat`] for
	 * received payments. In such cases, recipients must handle this HTLC as if it had received
	 * [`Self::outgoing_amt_msat`].
	 */
	public set_outgoing_amt_msat(val: bigint): void {
		bindings.PendingHTLCInfo_set_outgoing_amt_msat(this.ptr, val);
	}

	/**
	 * The CLTV the sender has indicated we should set on the forwarded HTLC (or has indicated
	 * should have been set on the received HTLC for received payments).
	 */
	public get_outgoing_cltv_value(): number {
		const ret: number = bindings.PendingHTLCInfo_get_outgoing_cltv_value(this.ptr);
		return ret;
	}

	/**
	 * The CLTV the sender has indicated we should set on the forwarded HTLC (or has indicated
	 * should have been set on the received HTLC for received payments).
	 */
	public set_outgoing_cltv_value(val: number): void {
		bindings.PendingHTLCInfo_set_outgoing_cltv_value(this.ptr, val);
	}

	/**
	 * The fee taken for this HTLC in addition to the standard protocol HTLC fees.
	 * 
	 * If this is a payment for forwarding, this is the fee we are taking before forwarding the
	 * HTLC.
	 * 
	 * If this is a received payment, this is the fee that our counterparty took.
	 * 
	 * This is used to allow LSPs to take fees as a part of payments, without the sender having to
	 * shoulder them.
	 */
	public get_skimmed_fee_msat(): Option_u64Z {
		const ret: bigint = bindings.PendingHTLCInfo_get_skimmed_fee_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The fee taken for this HTLC in addition to the standard protocol HTLC fees.
	 * 
	 * If this is a payment for forwarding, this is the fee we are taking before forwarding the
	 * HTLC.
	 * 
	 * If this is a received payment, this is the fee that our counterparty took.
	 * 
	 * This is used to allow LSPs to take fees as a part of payments, without the sender having to
	 * shoulder them.
	 */
	public set_skimmed_fee_msat(val: Option_u64Z): void {
		bindings.PendingHTLCInfo_set_skimmed_fee_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new PendingHTLCInfo given each field
	 */
	public static constructor_new(routing_arg: PendingHTLCRouting, incoming_shared_secret_arg: Uint8Array, payment_hash_arg: Uint8Array, incoming_amt_msat_arg: Option_u64Z, outgoing_amt_msat_arg: bigint, outgoing_cltv_value_arg: number, skimmed_fee_msat_arg: Option_u64Z): PendingHTLCInfo {
		const ret: bigint = bindings.PendingHTLCInfo_new(CommonBase.get_ptr_of(routing_arg), bindings.encodeUint8Array(incoming_shared_secret_arg), bindings.encodeUint8Array(payment_hash_arg), CommonBase.get_ptr_of(incoming_amt_msat_arg), outgoing_amt_msat_arg, outgoing_cltv_value_arg, CommonBase.get_ptr_of(skimmed_fee_msat_arg));
		const ret_hu_conv: PendingHTLCInfo = new PendingHTLCInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PendingHTLCInfo_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PendingHTLCInfo
	 */
	public clone(): PendingHTLCInfo {
		const ret: bigint = bindings.PendingHTLCInfo_clone(this.ptr);
		const ret_hu_conv: PendingHTLCInfo = new PendingHTLCInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the PendingHTLCInfo object into a byte array which can be read by PendingHTLCInfo_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PendingHTLCInfo_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PendingHTLCInfo from a byte array, created by PendingHTLCInfo_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PendingHTLCInfoDecodeErrorZ {
		const ret: bigint = bindings.PendingHTLCInfo_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PendingHTLCInfoDecodeErrorZ = Result_PendingHTLCInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
