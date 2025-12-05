
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`peer_storage`] message that can be sent to or received from a peer.
 * 
 * This message is used to distribute backup data to peers.
 * If data is lost or corrupted, users can retrieve it through [`PeerStorageRetrieval`]
 * to recover critical information, such as channel states, for fund recovery.
 * 
 * [`peer_storage`] is used to send our own encrypted backup data to a peer.
 * 
 * [`peer_storage`]: https://github.com/lightning/bolts/pull/1110
 */
export class PeerStorage extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PeerStorage_free);
	}

	/**
	 * Our encrypted backup data included in the msg.
	 * 
	 * Returns a copy of the field.
	 */
	public get_data(): Uint8Array {
		const ret: number = bindings.PeerStorage_get_data(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Our encrypted backup data included in the msg.
	 */
	public set_data(val: Uint8Array): void {
		bindings.PeerStorage_set_data(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new PeerStorage given each field
	 */
	public static constructor_new(data_arg: Uint8Array): PeerStorage {
		const ret: bigint = bindings.PeerStorage_new(bindings.encodeUint8Array(data_arg));
		const ret_hu_conv: PeerStorage = new PeerStorage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PeerStorage_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PeerStorage
	 */
	public clone(): PeerStorage {
		const ret: bigint = bindings.PeerStorage_clone(this.ptr);
		const ret_hu_conv: PeerStorage = new PeerStorage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PeerStorage.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.PeerStorage_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two PeerStorages contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: PeerStorage): boolean {
		const ret: boolean = bindings.PeerStorage_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the PeerStorage object into a byte array which can be read by PeerStorage_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PeerStorage_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PeerStorage from a byte array, created by PeerStorage_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PeerStorageDecodeErrorZ {
		const ret: bigint = bindings.PeerStorage_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PeerStorageDecodeErrorZ = Result_PeerStorageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
