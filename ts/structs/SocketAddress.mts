
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An address which can be used to connect to a remote peer.
 */
export class SocketAddress extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.SocketAddress_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): SocketAddress {
		const raw_ty: number = bindings.LDKSocketAddress_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SocketAddress_TcpIpV4(ptr);
			case 1: return new SocketAddress_TcpIpV6(ptr);
			case 2: return new SocketAddress_OnionV2(ptr);
			case 3: return new SocketAddress_OnionV3(ptr);
			case 4: return new SocketAddress_Hostname(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SocketAddress_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SocketAddress
	 */
	public clone(): SocketAddress {
		const ret: bigint = bindings.SocketAddress_clone(this.ptr);
		const ret_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TcpIpV4-variant SocketAddress
	 */
	public static constructor_tcp_ip_v4(addr: Uint8Array, port: number): SocketAddress {
		const ret: bigint = bindings.SocketAddress_tcp_ip_v4(bindings.encodeUint8Array(addr), port);
		const ret_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TcpIpV6-variant SocketAddress
	 */
	public static constructor_tcp_ip_v6(addr: Uint8Array, port: number): SocketAddress {
		const ret: bigint = bindings.SocketAddress_tcp_ip_v6(bindings.encodeUint8Array(addr), port);
		const ret_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionV2-variant SocketAddress
	 */
	public static constructor_onion_v2(a: Uint8Array): SocketAddress {
		const ret: bigint = bindings.SocketAddress_onion_v2(bindings.encodeUint8Array(a));
		const ret_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionV3-variant SocketAddress
	 */
	public static constructor_onion_v3(ed25519_pubkey: Uint8Array, checksum: number, version: number, port: number): SocketAddress {
		const ret: bigint = bindings.SocketAddress_onion_v3(bindings.encodeUint8Array(ed25519_pubkey), checksum, version, port);
		const ret_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Hostname-variant SocketAddress
	 */
	public static constructor_hostname(hostname: Hostname, port: number): SocketAddress {
		const ret: bigint = bindings.SocketAddress_hostname(CommonBase.get_ptr_of(hostname), port);
		const ret_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the SocketAddress.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.SocketAddress_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two SocketAddresss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: SocketAddress): boolean {
		const ret: boolean = bindings.SocketAddress_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the SocketAddress object into a byte array which can be read by SocketAddress_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.SocketAddress_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a SocketAddress from a byte array, created by SocketAddress_write
	 */
	public static constructor_read(ser: Uint8Array): Result_SocketAddressDecodeErrorZ {
		const ret: bigint = bindings.SocketAddress_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_SocketAddressDecodeErrorZ = Result_SocketAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a SocketAddress object
	 */
	public to_str(): string {
		const ret: number = bindings.SocketAddress_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
/** A SocketAddress of type TcpIpV4 */
export class SocketAddress_TcpIpV4 extends SocketAddress {
	/**
	 * The 4-byte IPv4 address
	 */
	public addr: Uint8Array;
	/**
	 * The port on which the node is listening
	 */
	public port: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const addr: number = bindings.LDKSocketAddress_TcpIpV4_get_addr(ptr);
		const addr_conv: Uint8Array = bindings.decodeUint8Array(addr);
		this.addr = addr_conv;
		this.port = bindings.LDKSocketAddress_TcpIpV4_get_port(ptr);
	}
}
/** A SocketAddress of type TcpIpV6 */
export class SocketAddress_TcpIpV6 extends SocketAddress {
	/**
	 * The 16-byte IPv6 address
	 */
	public addr: Uint8Array;
	/**
	 * The port on which the node is listening
	 */
	public port: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const addr: number = bindings.LDKSocketAddress_TcpIpV6_get_addr(ptr);
		const addr_conv: Uint8Array = bindings.decodeUint8Array(addr);
		this.addr = addr_conv;
		this.port = bindings.LDKSocketAddress_TcpIpV6_get_port(ptr);
	}
}
/** A SocketAddress of type OnionV2 */
export class SocketAddress_OnionV2 extends SocketAddress {
	public onion_v2: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const onion_v2: number = bindings.LDKSocketAddress_OnionV2_get_onion_v2(ptr);
		const onion_v2_conv: Uint8Array = bindings.decodeUint8Array(onion_v2);
		this.onion_v2 = onion_v2_conv;
	}
}
/** A SocketAddress of type OnionV3 */
export class SocketAddress_OnionV3 extends SocketAddress {
	/**
	 * The ed25519 long-term public key of the peer
	 */
	public ed25519_pubkey: Uint8Array;
	/**
	 * The checksum of the pubkey and version, as included in the onion address
	 */
	public checksum: number;
	/**
	 * The version byte, as defined by the Tor Onion v3 spec.
	 */
	public version: number;
	/**
	 * The port on which the node is listening
	 */
	public port: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const ed25519_pubkey: number = bindings.LDKSocketAddress_OnionV3_get_ed25519_pubkey(ptr);
		const ed25519_pubkey_conv: Uint8Array = bindings.decodeUint8Array(ed25519_pubkey);
		this.ed25519_pubkey = ed25519_pubkey_conv;
		this.checksum = bindings.LDKSocketAddress_OnionV3_get_checksum(ptr);
		this.version = bindings.LDKSocketAddress_OnionV3_get_version(ptr);
		this.port = bindings.LDKSocketAddress_OnionV3_get_port(ptr);
	}
}
/** A SocketAddress of type Hostname */
export class SocketAddress_Hostname extends SocketAddress {
	/**
	 * The hostname on which the node is listening.
	 */
	public hostname: Hostname;
	/**
	 * The port on which the node is listening.
	 */
	public port: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const hostname: bigint = bindings.LDKSocketAddress_Hostname_get_hostname(ptr);
		const hostname_hu_conv: Hostname = new Hostname(null, hostname);
			CommonBase.add_ref_from(hostname_hu_conv, this);
		this.hostname = hostname_hu_conv;
		this.port = bindings.LDKSocketAddress_Hostname_get_port(ptr);
	}
}
