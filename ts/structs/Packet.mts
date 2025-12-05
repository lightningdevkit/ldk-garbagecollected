
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Packet of hop data for next peer
 */
export class Packet extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Packet_free);
	}

	/**
	 * Bolt 04 version number
	 */
	public get_version(): number {
		const ret: number = bindings.Packet_get_version(this.ptr);
		return ret;
	}

	/**
	 * Bolt 04 version number
	 */
	public set_version(val: number): void {
		bindings.Packet_set_version(this.ptr, val);
	}

	/**
	 * A random sepc256k1 point, used to build the ECDH shared secret to decrypt hop_data
	 */
	public get_public_key(): Uint8Array {
		const ret: number = bindings.Packet_get_public_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A random sepc256k1 point, used to build the ECDH shared secret to decrypt hop_data
	 */
	public set_public_key(val: Uint8Array): void {
		bindings.Packet_set_public_key(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Encrypted payload for the next hop
	 * 
	 * Returns a copy of the field.
	 */
	public get_hop_data(): Uint8Array {
		const ret: number = bindings.Packet_get_hop_data(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Encrypted payload for the next hop
	 */
	public set_hop_data(val: Uint8Array): void {
		bindings.Packet_set_hop_data(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * HMAC to verify the integrity of hop_data
	 */
	public get_hmac(): Uint8Array {
		const ret: number = bindings.Packet_get_hmac(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * HMAC to verify the integrity of hop_data
	 */
	public set_hmac(val: Uint8Array): void {
		bindings.Packet_set_hmac(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new Packet given each field
	 */
	public static constructor_new(version_arg: number, public_key_arg: Uint8Array, hop_data_arg: Uint8Array, hmac_arg: Uint8Array): Packet {
		const ret: bigint = bindings.Packet_new(version_arg, bindings.encodeUint8Array(public_key_arg), bindings.encodeUint8Array(hop_data_arg), bindings.encodeUint8Array(hmac_arg));
		const ret_hu_conv: Packet = new Packet(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Packet_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Packet
	 */
	public clone(): Packet {
		const ret: bigint = bindings.Packet_clone(this.ptr);
		const ret_hu_conv: Packet = new Packet(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Packet.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Packet_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Packets contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Packet): boolean {
		const ret: boolean = bindings.Packet_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Packet object into a byte array which can be read by Packet_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Packet_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Packet from a byte array, created by Packet_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PacketDecodeErrorZ {
		const ret: bigint = bindings.Packet_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PacketDecodeErrorZ = Result_PacketDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
