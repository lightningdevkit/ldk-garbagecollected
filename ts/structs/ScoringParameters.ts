
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ScoringParameters extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ScoringParameters_free(this.ptr);
                    }
                }
	public number get_base_penalty_msat() {
		number ret = bindings.ScoringParameters_get_base_penalty_msat(this.ptr);
		return ret;
	}

	public void set_base_penalty_msat(number val) {
		bindings.ScoringParameters_set_base_penalty_msat(this.ptr, val);
	}

	public number get_failure_penalty_msat() {
		number ret = bindings.ScoringParameters_get_failure_penalty_msat(this.ptr);
		return ret;
	}

	public void set_failure_penalty_msat(number val) {
		bindings.ScoringParameters_set_failure_penalty_msat(this.ptr, val);
	}

	public number get_failure_penalty_half_life() {
		number ret = bindings.ScoringParameters_get_failure_penalty_half_life(this.ptr);
		return ret;
	}

	public void set_failure_penalty_half_life(number val) {
		bindings.ScoringParameters_set_failure_penalty_half_life(this.ptr, val);
	}

	public static ScoringParameters constructor_new(number base_penalty_msat_arg, number failure_penalty_msat_arg, number failure_penalty_half_life_arg) {
		number ret = bindings.ScoringParameters_new(base_penalty_msat_arg, failure_penalty_msat_arg, failure_penalty_half_life_arg);
		const ret_hu_conv: ScoringParameters = new ScoringParameters(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ScoringParameters constructor_default() {
		number ret = bindings.ScoringParameters_default();
		const ret_hu_conv: ScoringParameters = new ScoringParameters(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
