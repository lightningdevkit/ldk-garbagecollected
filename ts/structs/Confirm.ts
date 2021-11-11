
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Confirm extends CommonBase {

                bindings_instance?: bindings.LDKConfirm;

                constructor(ptr?: number, arg?: bindings.LDKConfirm) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKConfirm_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Confirm_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: ConfirmInterface): Confirm {
                    const impl_holder: LDKConfirmHolder = new LDKConfirmHolder();
                    let structImplementation = <bindings.LDKConfirm>{
                        // todo: in-line interface filling
                        transactions_confirmed (header: Uint8Array, txdata: number[], height: number): void {
							TwoTuple_usizeTransactionZ[] txdata_conv_28_arr = new TwoTuple_usizeTransactionZ[txdata.length];
				for (int c = 0; c < txdata.length; c++) {
					number txdata_conv_28 = txdata[c];
					TwoTuple_usizeTransactionZ txdata_conv_28_hu_conv = new TwoTuple_usizeTransactionZ(null, txdata_conv_28);
					txdata_conv_28_hu_conv.ptrs_to.add(this);
					txdata_conv_28_arr[c] = txdata_conv_28_hu_conv;
				}
							arg.transactions_confirmed(header, txdata_conv_28_arr, height);
						},

						transaction_unconfirmed (txid: Uint8Array): void {
							arg.transaction_unconfirmed(txid);
						},

						best_block_updated (header: Uint8Array, height: number): void {
							arg.best_block_updated(header, height);
						},

						get_relevant_txids (): Uint8Array[] {
							Uint8Array[] ret = arg.get_relevant_txids();
				result: Uint8Array[] = ret != null ? Arrays.stream(ret).map(ret_conv_12 -> InternalUtils.check_arr_len(ret_conv_12, 32)).toArray(Uint8Array[]::new) : null;
				return result;
						},

						
                    };
                    impl_holder.held = new Confirm (null, structImplementation);
                }
            }

            export interface ConfirmInterface {
                transactions_confirmed(header: Uint8Array, txdata: TwoTuple_usizeTransactionZ[], height: number): void;
				transaction_unconfirmed(txid: Uint8Array): void;
				best_block_updated(header: Uint8Array, height: number): void;
				get_relevant_txids(): Uint8Array[];
				
            }

            class LDKConfirmHolder {
                held: Confirm;
            }
	public void transactions_confirmed(Uint8Array header, TwoTuple_usizeTransactionZ[] txdata, number height) {
		bindings.Confirm_transactions_confirmed(this.ptr, InternalUtils.check_arr_len(header, 80), txdata != null ? Arrays.stream(txdata).map(txdata_conv_28 -> txdata_conv_28 != null ? txdata_conv_28.ptr : 0).toArray(number[]::new) : null, height);
	}

	public void transaction_unconfirmed(Uint8Array txid) {
		bindings.Confirm_transaction_unconfirmed(this.ptr, InternalUtils.check_arr_len(txid, 32));
	}

	public void best_block_updated(Uint8Array header, number height) {
		bindings.Confirm_best_block_updated(this.ptr, InternalUtils.check_arr_len(header, 80), height);
	}

	public Uint8Array[] get_relevant_txids() {
		Uint8Array[] ret = bindings.Confirm_get_relevant_txids(this.ptr);
		return ret;
	}

}
