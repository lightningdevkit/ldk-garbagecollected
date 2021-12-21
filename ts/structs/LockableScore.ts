
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class LockableScore extends CommonBase {

                bindings_instance?: bindings.LDKLockableScore;

                constructor(ptr?: number, arg?: bindings.LDKLockableScore) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKLockableScore_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.LockableScore_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: LockableScoreInterface): LockableScore {
                    const impl_holder: LDKLockableScoreHolder = new LDKLockableScoreHolder();
                    let structImplementation = <bindings.LDKLockableScore>{
                        // todo: in-line interface filling
                        lock (): number {
							Score ret = arg.lock();
				result: number = ret == null ? 0 : ret.ptr;
				impl_holder.held.ptrs_to.add(ret);
				return result;
						},

						
                    };
                    impl_holder.held = new LockableScore (null, structImplementation);
                }
            }

            export interface LockableScoreInterface {
                lock(): Score;
				
            }

            class LDKLockableScoreHolder {
                held: LockableScore;
            }
	public Score lock() {
		number ret = bindings.LockableScore_lock(this.ptr);
		Score ret_hu_conv = new Score(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
