
            
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
                        channel_penalty_msat (short_channel_id: number): number {
							number ret = arg.channel_penalty_msat(short_channel_id);
				return ret;
						},

						
                    };
                    impl_holder.held = new Score (null, structImplementation);
                }
            }

            export interface ScoreInterface {
                channel_penalty_msat(short_channel_id: number): number;
				
            }

            class LDKScoreHolder {
                held: Score;
            }
	public number channel_penalty_msat(number short_channel_id) {
		number ret = bindings.Score_channel_penalty_msat(this.ptr, short_channel_id);
		return ret;
	}

}
