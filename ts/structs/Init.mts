
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`init`] message to be sent to or received from a peer.
 * 
 * [`init`]: https://github.com/lightning/bolts/blob/master/01-messaging.md#the-init-message
 */
export class Init extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Init_free);
	}

	/**
	 * The relevant features which the sender supports.
	 */
	public get_features(): InitFeatures {
		const ret: bigint = bindings.Init_get_features(this.ptr);
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The relevant features which the sender supports.
	 */
	public set_features(val: InitFeatures): void {
		bindings.Init_set_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Indicates chains the sender is interested in.
	 * 
	 * If there are no common chains, the connection will be closed.
	 * 
	 * Returns a copy of the field.
	 */
	public get_networks(): Option_CVec_ThirtyTwoBytesZZ {
		const ret: bigint = bindings.Init_get_networks(this.ptr);
		const ret_hu_conv: Option_CVec_ThirtyTwoBytesZZ = Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Indicates chains the sender is interested in.
	 * 
	 * If there are no common chains, the connection will be closed.
	 */
	public set_networks(val: Option_CVec_ThirtyTwoBytesZZ): void {
		bindings.Init_set_networks(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The receipient's network address.
	 * 
	 * This adds the option to report a remote IP address back to a connecting peer using the init
	 * message. A node can decide to use that information to discover a potential update to its
	 * public IPv4 address (NAT) and use that for a [`NodeAnnouncement`] update message containing
	 * the new address.
	 */
	public get_remote_network_address(): Option_SocketAddressZ {
		const ret: bigint = bindings.Init_get_remote_network_address(this.ptr);
		const ret_hu_conv: Option_SocketAddressZ = Option_SocketAddressZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The receipient's network address.
	 * 
	 * This adds the option to report a remote IP address back to a connecting peer using the init
	 * message. A node can decide to use that information to discover a potential update to its
	 * public IPv4 address (NAT) and use that for a [`NodeAnnouncement`] update message containing
	 * the new address.
	 */
	public set_remote_network_address(val: Option_SocketAddressZ): void {
		bindings.Init_set_remote_network_address(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new Init given each field
	 */
	public static constructor_new(features_arg: InitFeatures, networks_arg: Option_CVec_ThirtyTwoBytesZZ, remote_network_address_arg: Option_SocketAddressZ): Init {
		const ret: bigint = bindings.Init_new(CommonBase.get_ptr_of(features_arg), CommonBase.get_ptr_of(networks_arg), CommonBase.get_ptr_of(remote_network_address_arg));
		const ret_hu_conv: Init = new Init(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Init_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Init
	 */
	public clone(): Init {
		const ret: bigint = bindings.Init_clone(this.ptr);
		const ret_hu_conv: Init = new Init(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Init.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Init_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Inits contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Init): boolean {
		const ret: boolean = bindings.Init_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Init object into a byte array which can be read by Init_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Init_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Init from a byte array, created by Init_write
	 */
	public static constructor_read(ser: Uint8Array): Result_InitDecodeErrorZ {
		const ret: bigint = bindings.Init_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_InitDecodeErrorZ = Result_InitDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
