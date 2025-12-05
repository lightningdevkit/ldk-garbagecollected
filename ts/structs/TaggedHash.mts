
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A hash for use in a specific context by tweaking with a context-dependent tag as per [BIP 340]
 * and computed over the merkle root of a TLV stream to sign as defined in [BOLT 12].
 * 
 * [BIP 340]: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
 * [BOLT 12]: https://github.com/rustyrussell/lightning-rfc/blob/guilt/offers/12-offer-encoding.md#signature-calculation
 */
export class TaggedHash extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TaggedHash_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TaggedHash_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TaggedHash
	 */
	public clone(): TaggedHash {
		const ret: bigint = bindings.TaggedHash_clone(this.ptr);
		const ret_hu_conv: TaggedHash = new TaggedHash(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the digest to sign.
	 */
	public as_digest(): Uint8Array {
		const ret: number = bindings.TaggedHash_as_digest(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the tag used in the tagged hash.
	 */
	public tag(): string {
		const ret: number = bindings.TaggedHash_tag(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Returns the merkle root used in the tagged hash.
	 */
	public merkle_root(): Uint8Array {
		const ret: number = bindings.TaggedHash_merkle_root(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
