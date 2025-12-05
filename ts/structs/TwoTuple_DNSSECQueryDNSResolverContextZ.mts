
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_DNSSECQueryDNSResolverContextZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_DNSSECQueryDNSResolverContextZ_free);
	}

	/**
	 * 
	 */
	public get_a(): DNSSECQuery {
		const ret: bigint = bindings.C2Tuple_DNSSECQueryDNSResolverContextZ_get_a(this.ptr);
		const ret_hu_conv: DNSSECQuery = new DNSSECQuery(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): DNSResolverContext {
		const ret: bigint = bindings.C2Tuple_DNSSECQueryDNSResolverContextZ_get_b(this.ptr);
		const ret_hu_conv: DNSResolverContext = new DNSResolverContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_DNSSECQueryDNSResolverContextZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_DNSSECQueryDNSResolverContextZ {
		const ret: bigint = bindings.C2Tuple_DNSSECQueryDNSResolverContextZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_DNSSECQueryDNSResolverContextZ = new TwoTuple_DNSSECQueryDNSResolverContextZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_DNSSECQueryDNSResolverContextZ from the contained elements.
	 */
	public static constructor_new(a: DNSSECQuery, b: DNSResolverContext): TwoTuple_DNSSECQueryDNSResolverContextZ {
		const ret: bigint = bindings.C2Tuple_DNSSECQueryDNSResolverContextZ_new(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_DNSSECQueryDNSResolverContextZ = new TwoTuple_DNSSECQueryDNSResolverContextZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
