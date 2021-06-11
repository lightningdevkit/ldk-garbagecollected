
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class ChannelManagerPersister extends CommonBase {

                bindings_instance?: bindings.LDKChannelManagerPersister;

                constructor(ptr?: number, arg?: bindings.LDKChannelManagerPersister) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKChannelManagerPersister_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.ChannelManagerPersister_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: ChannelManagerPersisterInterface): ChannelManagerPersister {
                    const impl_holder: LDKChannelManagerPersisterHolder = new LDKChannelManagerPersisterHolder();
                    let structImplementation = <bindings.LDKChannelManagerPersister>{
                        // todo: in-line interface filling
                        persist_manager (channel_manager: number): number {
							const channel_manager_hu_conv: ChannelManager = new ChannelManager(null, channel_manager);
							Result_NoneErrorZ ret = arg.persist_manager(channel_manager_hu_conv);
				result: number = ret != null ? ret.ptr : 0;
				return result;
						},

						
                    };
                    impl_holder.held = new ChannelManagerPersister (null, structImplementation);
                }
            }

            export interface ChannelManagerPersisterInterface {
                persist_manager(channel_manager: ChannelManager): Result_NoneErrorZ;
				
            }

            class LDKChannelManagerPersisterHolder {
                held: ChannelManagerPersister;
            }
	public Result_NoneErrorZ persist_manager(ChannelManager channel_manager) {
		number ret = bindings.ChannelManagerPersister_persist_manager(this.ptr, channel_manager == null ? 0 : channel_manager.ptr & ~1);
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(channel_manager);
		return ret_hu_conv;
	}

}
