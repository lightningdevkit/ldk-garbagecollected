
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`Router`] implemented using [`find_route`].
 * 
 * # Privacy
 * 
 * Creating [`BlindedPaymentPath`]s may affect privacy since, if a suitable path cannot be found,
 * it will create a one-hop path using the recipient as the introduction node if it is an announced
 * node. Otherwise, there is no way to find a path to the introduction node in order to send a
 * payment, and thus an `Err` is returned.
 */
export class DefaultRouter extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DefaultRouter_free);
	}

	/**
	 * Creates a new router.
	 */
	public static constructor_new(network_graph: NetworkGraph, logger: Logger, entropy_source: EntropySource, scorer: LockableScore, score_params: ProbabilisticScoringFeeParameters): DefaultRouter {
		const ret: bigint = bindings.DefaultRouter_new(CommonBase.get_ptr_of(network_graph), CommonBase.get_ptr_of(logger), CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(scorer), CommonBase.get_ptr_of(score_params));
		const ret_hu_conv: DefaultRouter = new DefaultRouter(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, network_graph);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, scorer);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Router which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Router must be freed before this_arg is
	 */
	public as_Router(): Router {
		const ret: bigint = bindings.DefaultRouter_as_Router(this.ptr);
		const ret_hu_conv: Router = new Router(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
