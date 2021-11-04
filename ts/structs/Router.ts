
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Router extends CommonBase {

                bindings_instance?: bindings.LDKRouter;

                constructor(ptr?: number, arg?: bindings.LDKRouter) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKRouter_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Router_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: RouterInterface): Router {
                    const impl_holder: LDKRouterHolder = new LDKRouterHolder();
                    let structImplementation = <bindings.LDKRouter>{
                        // todo: in-line interface filling
                        find_route (payer: Uint8Array, params: number, first_hops: number[], scorer: number): number {
							const params_hu_conv: RouteParameters = new RouteParameters(null, params);
							ChannelDetails[] first_hops_conv_16_arr = new ChannelDetails[first_hops.length];
				for (int q = 0; q < first_hops.length; q++) {
					number first_hops_conv_16 = first_hops[q];
					const first_hops_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, first_hops_conv_16);
					first_hops_conv_16_hu_conv.ptrs_to.add(this);
					first_hops_conv_16_arr[q] = first_hops_conv_16_hu_conv;
				}
							Score ret_hu_conv = new Score(null, scorer);
				ret_hu_conv.ptrs_to.add(this);
							Result_RouteLightningErrorZ ret = arg.find_route(payer, params_hu_conv, first_hops_conv_16_arr, ret_hu_conv);
				result: number = ret != null ? ret.ptr : 0;
				return result;
						},

						
                    };
                    impl_holder.held = new Router (null, structImplementation);
                }
            }

            export interface RouterInterface {
                find_route(payer: Uint8Array, params: RouteParameters, first_hops: ChannelDetails[], scorer: Score): Result_RouteLightningErrorZ;
				
            }

            class LDKRouterHolder {
                held: Router;
            }
	public Result_RouteLightningErrorZ find_route(Uint8Array payer, RouteParameters params, ChannelDetails[] first_hops, Score scorer) {
		number ret = bindings.Router_find_route(this.ptr, payer, params == null ? 0 : params.ptr & ~1, first_hops != null ? Arrays.stream(first_hops).map(first_hops_conv_16 -> first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr & ~1).toArray(number[]::new) : null, scorer == null ? 0 : scorer.ptr);
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(params);
		for (ChannelDetails first_hops_conv_16: first_hops) { this.ptrs_to.add(first_hops_conv_16); };
		this.ptrs_to.add(scorer);
		return ret_hu_conv;
	}

}
