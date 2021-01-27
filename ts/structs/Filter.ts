
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Filter extends CommonBase {

                bindings_instance?: bindings.LDKFilter;

                constructor(ptr?: number, arg?: bindings.LDKFilter) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKFilter_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Filter_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: FilterInterface): Filter {
                    const impl_holder: LDKFilterHolder = new LDKFilterHolder();
                    let structImplementation = <bindings.LDKFilter>{
                        // todo: in-line interface filling
                        register_tx (txid: Uint8Array, script_pubkey: Uint8Array): void {
							arg.register_tx(txid, script_pubkey);
						},

						register_output (outpoint: number, script_pubkey: Uint8Array): void {
							const outpoint_hu_conv: OutPoint = new OutPoint(null, outpoint);
							arg.register_output(outpoint_hu_conv, script_pubkey);
						},

						
                    };
                    impl_holder.held = new Filter (null, structImplementation);
                }
            }

            export interface FilterInterface {
                register_tx(txid: Uint8Array, script_pubkey: Uint8Array): void;
				register_output(outpoint: OutPoint, script_pubkey: Uint8Array): void;
				
            }

            class LDKFilterHolder {
                held: Filter;
            }
	public void register_tx(Uint8Array txid, Uint8Array script_pubkey) {
		bindings.Filter_register_tx(this.ptr, txid, script_pubkey);
	}

	public void register_output(OutPoint outpoint, Uint8Array script_pubkey) {
		bindings.Filter_register_output(this.ptr, outpoint == null ? 0 : outpoint.ptr & ~1, script_pubkey);
		this.ptrs_to.add(outpoint);
	}

}
