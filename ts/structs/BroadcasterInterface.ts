
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class BroadcasterInterface extends CommonBase {

                bindings_instance?: bindings.LDKBroadcasterInterface;

                constructor(ptr?: number, arg?: bindings.LDKBroadcasterInterface) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKBroadcasterInterface_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.BroadcasterInterface_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: BroadcasterInterfaceInterface): BroadcasterInterface {
                    const impl_holder: LDKBroadcasterInterfaceHolder = new LDKBroadcasterInterfaceHolder();
                    let structImplementation = <bindings.LDKBroadcasterInterface>{
                        // todo: in-line interface filling
                        broadcast_transaction (tx: Uint8Array): void {
							arg.broadcast_transaction(tx);
						},

						
                    };
                    impl_holder.held = new BroadcasterInterface (null, structImplementation);
                }
            }

            export interface BroadcasterInterfaceInterface {
                broadcast_transaction(tx: Uint8Array): void;
				
            }

            class LDKBroadcasterInterfaceHolder {
                held: BroadcasterInterface;
            }
	public void broadcast_transaction(Uint8Array tx) {
		bindings.BroadcasterInterface_broadcast_transaction(this.ptr, tx);
	}

}
