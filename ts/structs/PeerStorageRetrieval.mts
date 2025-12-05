
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`peer_storage_retrieval`] message that can be sent to or received from a peer.
 * 
 * This message is sent to peers for whom we store backup data.
 * If we receive this message, it indicates that the peer had stored our backup data.
 * This data can be used for fund recovery in case of data loss.
 * 
 * [`peer_storage_retrieval`] is used to send the most recent backup of the peer.
 * 
 * [`peer_storage_retrieval`]: https://github.com/lightning/bolts/pull/1110
 */
export class PeerStorageRetrieval extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PeerStorageRetrieval_free);
	}

	/**
	 * Most recent peer's data included in the msg.
	 * 
	 * Returns a copy of the field.
	 */
	public get_data(): Uint8Array {
		const ret: number = bindings.PeerStorageRetrieval_get_data(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Most recent peer's data included in the msg.
	 */
	public set_data(val: Uint8Array): void {
		bindings.PeerStorageRetrieval_set_data(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new PeerStorageRetrieval given each field
	 */
	public static constructor_new(data_arg: Uint8Array): PeerStorageRetrieval {
		const ret: bigint = bindings.PeerStorageRetrieval_new(bindings.encodeUint8Array(data_arg));
		const ret_hu_conv: PeerStorageRetrieval = new PeerStorageRetrieval(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PeerStorageRetrieval_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PeerStorageRetrieval
	 */
	public clone(): PeerStorageRetrieval {
		const ret: bigint = bindings.PeerStorageRetrieval_clone(this.ptr);
		const ret_hu_conv: PeerStorageRetrieval = new PeerStorageRetrieval(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PeerStorageRetrieval.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.PeerStorageRetrieval_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two PeerStorageRetrievals contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: PeerStorageRetrieval): boolean {
		const ret: boolean = bindings.PeerStorageRetrieval_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the PeerStorageRetrieval object into a byte array which can be read by PeerStorageRetrieval_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PeerStorageRetrieval_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PeerStorageRetrieval from a byte array, created by PeerStorageRetrieval_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PeerStorageRetrievalDecodeErrorZ {
		const ret: bigint = bindings.PeerStorageRetrieval_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PeerStorageRetrievalDecodeErrorZ = Result_PeerStorageRetrievalDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
