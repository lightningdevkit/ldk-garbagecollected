
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Access extends CommonBase {

                bindings_instance?: bindings.LDKAccess;

                constructor(ptr?: number, arg?: bindings.LDKAccess) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKAccess_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Access_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: AccessInterface): Access {
                    const impl_holder: LDKAccessHolder = new LDKAccessHolder();
                    let structImplementation = <bindings.LDKAccess>{
                        // todo: in-line interface filling
                        get_utxo (genesis_hash: Uint8Array, short_channel_id: number): number {
							Result_TxOutAccessErrorZ ret = arg.get_utxo(genesis_hash, short_channel_id);
				result: number = ret != null ? ret.ptr : 0;
				return result;
						},

						
                    };
                    impl_holder.held = new Access (null, structImplementation);
                }
            }

            export interface AccessInterface {
                get_utxo(genesis_hash: Uint8Array, short_channel_id: number): Result_TxOutAccessErrorZ;
				
            }

            class LDKAccessHolder {
                held: Access;
            }
	public Result_TxOutAccessErrorZ get_utxo(Uint8Array genesis_hash, number short_channel_id) {
		number ret = bindings.Access_get_utxo(this.ptr, genesis_hash, short_channel_id);
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
