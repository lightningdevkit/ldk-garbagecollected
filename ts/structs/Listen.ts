
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Listen extends CommonBase {

                bindings_instance?: bindings.LDKListen;

                constructor(ptr?: number, arg?: bindings.LDKListen) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKListen_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Listen_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: ListenInterface): Listen {
                    const impl_holder: LDKListenHolder = new LDKListenHolder();
                    let structImplementation = <bindings.LDKListen>{
                        // todo: in-line interface filling
                        block_connected (block: Uint8Array, height: number): void {
							arg.block_connected(block, height);
						},

						block_disconnected (header: Uint8Array, height: number): void {
							arg.block_disconnected(header, height);
						},

						
                    };
                    impl_holder.held = new Listen (null, structImplementation);
                }
            }

            export interface ListenInterface {
                block_connected(block: Uint8Array, height: number): void;
				block_disconnected(header: Uint8Array, height: number): void;
				
            }

            class LDKListenHolder {
                held: Listen;
            }
	public void block_connected(Uint8Array block, number height) {
		bindings.Listen_block_connected(this.ptr, block, height);
	}

	public void block_disconnected(Uint8Array header, number height) {
		bindings.Listen_block_disconnected(this.ptr, InternalUtils.check_arr_len(header, 80), height);
	}

}
