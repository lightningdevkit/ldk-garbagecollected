
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The set of public keys which are used in the creation of one commitment transaction.
 * These are derived from the channel base keys and per-commitment data.
 * 
 * A broadcaster key is provided from potential broadcaster of the computed transaction.
 * A countersignatory key is coming from a protocol participant unable to broadcast the
 * transaction.
 * 
 * These keys are assumed to be good, either because the code derived them from
 * channel basepoints via the new function, or they were obtained via
 * CommitmentTransaction.trust().keys() because we trusted the source of the
 * pre-calculated keys.
 */
export class TxCreationKeys extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxCreationKeys_free);
	}

	/**
	 * The broadcaster's per-commitment public key which was used to derive the other keys.
	 */
	public get_per_commitment_point(): Uint8Array {
		const ret: number = bindings.TxCreationKeys_get_per_commitment_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The broadcaster's per-commitment public key which was used to derive the other keys.
	 */
	public set_per_commitment_point(val: Uint8Array): void {
		bindings.TxCreationKeys_set_per_commitment_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The revocation key which is used to allow the broadcaster of the commitment
	 * transaction to provide their counterparty the ability to punish them if they broadcast
	 * an old state.
	 */
	public get_revocation_key(): RevocationKey {
		const ret: bigint = bindings.TxCreationKeys_get_revocation_key(this.ptr);
		const ret_hu_conv: RevocationKey = new RevocationKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The revocation key which is used to allow the broadcaster of the commitment
	 * transaction to provide their counterparty the ability to punish them if they broadcast
	 * an old state.
	 */
	public set_revocation_key(val: RevocationKey): void {
		bindings.TxCreationKeys_set_revocation_key(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Broadcaster's HTLC Key
	 */
	public get_broadcaster_htlc_key(): HtlcKey {
		const ret: bigint = bindings.TxCreationKeys_get_broadcaster_htlc_key(this.ptr);
		const ret_hu_conv: HtlcKey = new HtlcKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Broadcaster's HTLC Key
	 */
	public set_broadcaster_htlc_key(val: HtlcKey): void {
		bindings.TxCreationKeys_set_broadcaster_htlc_key(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Countersignatory's HTLC Key
	 */
	public get_countersignatory_htlc_key(): HtlcKey {
		const ret: bigint = bindings.TxCreationKeys_get_countersignatory_htlc_key(this.ptr);
		const ret_hu_conv: HtlcKey = new HtlcKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Countersignatory's HTLC Key
	 */
	public set_countersignatory_htlc_key(val: HtlcKey): void {
		bindings.TxCreationKeys_set_countersignatory_htlc_key(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Broadcaster's Payment Key (which isn't allowed to be spent from for some delay)
	 */
	public get_broadcaster_delayed_payment_key(): DelayedPaymentKey {
		const ret: bigint = bindings.TxCreationKeys_get_broadcaster_delayed_payment_key(this.ptr);
		const ret_hu_conv: DelayedPaymentKey = new DelayedPaymentKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Broadcaster's Payment Key (which isn't allowed to be spent from for some delay)
	 */
	public set_broadcaster_delayed_payment_key(val: DelayedPaymentKey): void {
		bindings.TxCreationKeys_set_broadcaster_delayed_payment_key(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new TxCreationKeys given each field
	 */
	public static constructor_new(per_commitment_point_arg: Uint8Array, revocation_key_arg: RevocationKey, broadcaster_htlc_key_arg: HtlcKey, countersignatory_htlc_key_arg: HtlcKey, broadcaster_delayed_payment_key_arg: DelayedPaymentKey): TxCreationKeys {
		const ret: bigint = bindings.TxCreationKeys_new(bindings.encodeUint8Array(per_commitment_point_arg), CommonBase.get_ptr_of(revocation_key_arg), CommonBase.get_ptr_of(broadcaster_htlc_key_arg), CommonBase.get_ptr_of(countersignatory_htlc_key_arg), CommonBase.get_ptr_of(broadcaster_delayed_payment_key_arg));
		const ret_hu_conv: TxCreationKeys = new TxCreationKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two TxCreationKeyss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TxCreationKeys): boolean {
		const ret: boolean = bindings.TxCreationKeys_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TxCreationKeys_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TxCreationKeys
	 */
	public clone(): TxCreationKeys {
		const ret: bigint = bindings.TxCreationKeys_clone(this.ptr);
		const ret_hu_conv: TxCreationKeys = new TxCreationKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the TxCreationKeys object into a byte array which can be read by TxCreationKeys_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TxCreationKeys_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxCreationKeys from a byte array, created by TxCreationKeys_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TxCreationKeysDecodeErrorZ {
		const ret: bigint = bindings.TxCreationKeys_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TxCreationKeysDecodeErrorZ = Result_TxCreationKeysDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create per-state keys from channel base points and the per-commitment point.
	 * Key set is asymmetric and can't be used as part of counter-signatory set of transactions.
	 */
	public static constructor_derive_new(per_commitment_point: Uint8Array, broadcaster_delayed_payment_base: DelayedPaymentBasepoint, broadcaster_htlc_base: HtlcBasepoint, countersignatory_revocation_base: RevocationBasepoint, countersignatory_htlc_base: HtlcBasepoint): TxCreationKeys {
		const ret: bigint = bindings.TxCreationKeys_derive_new(bindings.encodeUint8Array(per_commitment_point), CommonBase.get_ptr_of(broadcaster_delayed_payment_base), CommonBase.get_ptr_of(broadcaster_htlc_base), CommonBase.get_ptr_of(countersignatory_revocation_base), CommonBase.get_ptr_of(countersignatory_htlc_base));
		const ret_hu_conv: TxCreationKeys = new TxCreationKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generate per-state keys from channel static keys.
	 * Key set is asymmetric and can't be used as part of counter-signatory set of transactions.
	 */
	public static constructor_from_channel_static_keys(per_commitment_point: Uint8Array, broadcaster_keys: ChannelPublicKeys, countersignatory_keys: ChannelPublicKeys): TxCreationKeys {
		const ret: bigint = bindings.TxCreationKeys_from_channel_static_keys(bindings.encodeUint8Array(per_commitment_point), CommonBase.get_ptr_of(broadcaster_keys), CommonBase.get_ptr_of(countersignatory_keys));
		const ret_hu_conv: TxCreationKeys = new TxCreationKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
