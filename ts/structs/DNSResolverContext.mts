
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Contains a simple nonce for use in a blinded path's context.
 * 
 * Such a context is required when receiving a [`DNSSECProof`] message.
 * 
 * [`DNSSECProof`]: crate::onion_message::dns_resolution::DNSSECProof
 */
export class DNSResolverContext extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DNSResolverContext_free);
	}

	/**
	 * A nonce which uniquely describes a DNS resolution, useful for looking up metadata about the
	 * request.
	 */
	public get_nonce(): Uint8Array {
		const ret: number = bindings.DNSResolverContext_get_nonce(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A nonce which uniquely describes a DNS resolution, useful for looking up metadata about the
	 * request.
	 */
	public set_nonce(val: Uint8Array): void {
		bindings.DNSResolverContext_set_nonce(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new DNSResolverContext given each field
	 */
	public static constructor_new(nonce_arg: Uint8Array): DNSResolverContext {
		const ret: bigint = bindings.DNSResolverContext_new(bindings.encodeUint8Array(nonce_arg));
		const ret_hu_conv: DNSResolverContext = new DNSResolverContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.DNSResolverContext_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the DNSResolverContext
	 */
	public clone(): DNSResolverContext {
		const ret: bigint = bindings.DNSResolverContext_clone(this.ptr);
		const ret_hu_conv: DNSResolverContext = new DNSResolverContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DNSResolverContext.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.DNSResolverContext_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two DNSResolverContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: DNSResolverContext): boolean {
		const ret: boolean = bindings.DNSResolverContext_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the DNSResolverContext object into a byte array which can be read by DNSResolverContext_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.DNSResolverContext_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a DNSResolverContext from a byte array, created by DNSResolverContext_write
	 */
	public static constructor_read(ser: Uint8Array): Result_DNSResolverContextDecodeErrorZ {
		const ret: bigint = bindings.DNSResolverContext_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_DNSResolverContextDecodeErrorZ = Result_DNSResolverContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
