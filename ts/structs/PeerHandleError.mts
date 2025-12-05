
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Error for PeerManager errors. If you get one of these, you must disconnect the socket and
 * generate no further read_event/write_buffer_space_avail/socket_disconnected calls for the
 * descriptor.
 */
export class PeerHandleError extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PeerHandleError_free);
	}

	/**
	 * Constructs a new PeerHandleError given each field
	 */
	public static constructor_new(): PeerHandleError {
		const ret: bigint = bindings.PeerHandleError_new();
		const ret_hu_conv: PeerHandleError = new PeerHandleError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PeerHandleError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PeerHandleError
	 */
	public clone(): PeerHandleError {
		const ret: bigint = bindings.PeerHandleError_clone(this.ptr);
		const ret_hu_conv: PeerHandleError = new PeerHandleError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a PeerHandleError object
	 */
	public to_str(): string {
		const ret: number = bindings.PeerHandleError_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
