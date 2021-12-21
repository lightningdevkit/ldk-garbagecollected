
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class MultiThreadedLockableScore extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.MultiThreadedLockableScore_free(this.ptr);
                    }
                }
	public static MultiThreadedLockableScore constructor_new(Score score) {
		number ret = bindings.MultiThreadedLockableScore_new(score == null ? 0 : score.ptr);
		const ret_hu_conv: MultiThreadedLockableScore = new MultiThreadedLockableScore(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(score);
		return ret_hu_conv;
	}

}
