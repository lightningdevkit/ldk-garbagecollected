
            
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

						register_output (output: number): number {
							const output_hu_conv: WatchedOutput = new WatchedOutput(null, output);
				output_hu_conv.ptrs_to.add(this);
							Option_C2Tuple_usizeTransactionZZ ret = arg.register_output(output_hu_conv);
				result: number = ret.ptr;
				return result;
						},

						
                    };
                    impl_holder.held = new Filter (null, structImplementation);
                }
            }

            export interface FilterInterface {
                register_tx(txid: Uint8Array, script_pubkey: Uint8Array): void;
				register_output(output: WatchedOutput): Option_C2Tuple_usizeTransactionZZ;
				
            }

            class LDKFilterHolder {
                held: Filter;
            }
	public void register_tx(Uint8Array txid, Uint8Array script_pubkey) {
		bindings.Filter_register_tx(this.ptr, txid, script_pubkey);
	}

	public Option_C2Tuple_usizeTransactionZZ register_output(Uint8Array output_block_hash_arg, OutPoint output_outpoint_arg, Uint8Array output_script_pubkey_arg) {
		number ret = bindings.Filter_register_output(this.ptr, bindings.WatchedOutput_new(output_block_hash_arg, output_outpoint_arg == null ? 0 : output_outpoint_arg.ptr & ~1, output_script_pubkey_arg));
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		ret_hu_conv.ptrs_to.add(output_outpoint_arg);
		return ret_hu_conv;
	}

}
