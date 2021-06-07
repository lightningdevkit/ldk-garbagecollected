
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class FeeEstimator extends CommonBase {

                bindings_instance?: bindings.LDKFeeEstimator;

                constructor(ptr?: number, arg?: bindings.LDKFeeEstimator) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKFeeEstimator_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.FeeEstimator_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: FeeEstimatorInterface): FeeEstimator {
                    const impl_holder: LDKFeeEstimatorHolder = new LDKFeeEstimatorHolder();
                    let structImplementation = <bindings.LDKFeeEstimator>{
                        // todo: in-line interface filling
                        get_est_sat_per_1000_weight (confirmation_target: ConfirmationTarget): number {
							number ret = arg.get_est_sat_per_1000_weight(confirmation_target);
				return ret;
						},

						
                    };
                    impl_holder.held = new FeeEstimator (null, structImplementation);
                }
            }

            export interface FeeEstimatorInterface {
                get_est_sat_per_1000_weight(confirmation_target: ConfirmationTarget): number;
				
            }

            class LDKFeeEstimatorHolder {
                held: FeeEstimator;
            }
	public number get_est_sat_per_1000_weight(ConfirmationTarget confirmation_target) {
		number ret = bindings.FeeEstimator_get_est_sat_per_1000_weight(this.ptr, confirmation_target);
		return ret;
	}

}
