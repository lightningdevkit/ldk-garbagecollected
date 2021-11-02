
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Score extends CommonBase {

                bindings_instance?: bindings.LDKScore;

                constructor(ptr?: number, arg?: bindings.LDKScore) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKScore_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Score_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: ScoreInterface): Score {
                    const impl_holder: LDKScoreHolder = new LDKScoreHolder();
                    let structImplementation = <bindings.LDKScore>{
                        // todo: in-line interface filling
                        channel_penalty_msat (short_channel_id: number, source: number, target: number): number {
							const source_hu_conv: NodeId = new NodeId(null, source);
							const target_hu_conv: NodeId = new NodeId(null, target);
							number ret = arg.channel_penalty_msat(short_channel_id, source_hu_conv, target_hu_conv);
				return ret;
						},

						payment_path_failed (path: number[], short_channel_id: number): void {
							RouteHop[] path_conv_10_arr = new RouteHop[path.length];
				for (int k = 0; k < path.length; k++) {
					number path_conv_10 = path[k];
					const path_conv_10_hu_conv: RouteHop = new RouteHop(null, path_conv_10);
					path_conv_10_hu_conv.ptrs_to.add(this);
					path_conv_10_arr[k] = path_conv_10_hu_conv;
				}
							arg.payment_path_failed(path_conv_10_arr, short_channel_id);
						},

						
                    };
                    impl_holder.held = new Score (null, structImplementation);
                }
            }

            export interface ScoreInterface {
                channel_penalty_msat(short_channel_id: number, source: NodeId, target: NodeId): number;
				payment_path_failed(path: RouteHop[], short_channel_id: number): void;
				
            }

            class LDKScoreHolder {
                held: Score;
            }
	public number channel_penalty_msat(number short_channel_id, NodeId source, NodeId target) {
		number ret = bindings.Score_channel_penalty_msat(this.ptr, short_channel_id, source == null ? 0 : source.ptr & ~1, target == null ? 0 : target.ptr & ~1);
		this.ptrs_to.add(source);
		this.ptrs_to.add(target);
		return ret;
	}

	public void payment_path_failed(RouteHop[] path, number short_channel_id) {
		bindings.Score_payment_path_failed(this.ptr, path != null ? Arrays.stream(path).map(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr & ~1).toArray(number[]::new) : null, short_channel_id);
	}

}
