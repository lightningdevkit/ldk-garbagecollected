
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * BOLT 4 onion packet including hop data for the next peer.
 */
export class OnionPacket extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OnionPacket_free);
	}

	/**
	 * BOLT 4 version number.
	 */
	public get_version(): number {
		const ret: number = bindings.OnionPacket_get_version(this.ptr);
		return ret;
	}

	/**
	 * BOLT 4 version number.
	 */
	public set_version(val: number): void {
		bindings.OnionPacket_set_version(this.ptr, val);
	}

	/**
	 * In order to ensure we always return an error on onion decode in compliance with [BOLT
	 * #4](https://github.com/lightning/bolts/blob/master/04-onion-routing.md), we have to
	 * deserialize `OnionPacket`s contained in [`UpdateAddHTLC`] messages even if the ephemeral
	 * public key (here) is bogus, so we hold a [`Result`] instead of a [`PublicKey`] as we'd
	 * like.
	 * 
	 * Returns a copy of the field.
	 */
	public get_public_key(): Result_PublicKeySecp256k1ErrorZ {
		const ret: bigint = bindings.OnionPacket_get_public_key(this.ptr);
		const ret_hu_conv: Result_PublicKeySecp256k1ErrorZ = Result_PublicKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * In order to ensure we always return an error on onion decode in compliance with [BOLT
	 * #4](https://github.com/lightning/bolts/blob/master/04-onion-routing.md), we have to
	 * deserialize `OnionPacket`s contained in [`UpdateAddHTLC`] messages even if the ephemeral
	 * public key (here) is bogus, so we hold a [`Result`] instead of a [`PublicKey`] as we'd
	 * like.
	 */
	public set_public_key(val: Result_PublicKeySecp256k1ErrorZ): void {
		bindings.OnionPacket_set_public_key(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * HMAC to verify the integrity of hop_data.
	 */
	public get_hmac(): Uint8Array {
		const ret: number = bindings.OnionPacket_get_hmac(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * HMAC to verify the integrity of hop_data.
	 */
	public set_hmac(val: Uint8Array): void {
		bindings.OnionPacket_set_hmac(this.ptr, bindings.encodeUint8Array(val));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OnionPacket_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OnionPacket
	 */
	public clone(): OnionPacket {
		const ret: bigint = bindings.OnionPacket_clone(this.ptr);
		const ret_hu_conv: OnionPacket = new OnionPacket(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OnionPacket.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.OnionPacket_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two OnionPackets contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: OnionPacket): boolean {
		const ret: boolean = bindings.OnionPacket_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the OnionPacket object into a byte array which can be read by OnionPacket_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OnionPacket_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OnionPacket from a byte array, created by OnionPacket_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OnionPacketDecodeErrorZ {
		const ret: bigint = bindings.OnionPacket_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OnionPacketDecodeErrorZ = Result_OnionPacketDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
