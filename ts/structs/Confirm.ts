
            
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
							TwoTuple<Number, Uint8Array>[] txdata_conv_30_arr = new TwoTuple[txdata.length];
				for (int e = 0; e < txdata.length; e++) {
					number txdata_conv_30 = txdata[e];
					number txdata_conv_30_a = bindings.LDKC2Tuple_usizeTransactionZ_get_a(txdata_conv_30);
					Uint8Array txdata_conv_30_b = bindings.LDKC2Tuple_usizeTransactionZ_get_b(txdata_conv_30);
					TwoTuple<Number, Uint8Array> txdata_conv_30_conv = new TwoTuple<Number, Uint8Array>(txdata_conv_30_a, txdata_conv_30_b, () -> {
						bindings.C2Tuple_usizeTransactionZ_free(txdata_conv_30);
					});
					txdata_conv_30_arr[e] = txdata_conv_30_conv;
				}
							arg.transactions_confirmed(header, txdata_conv_30_arr, height);
						},

						transaction_unconfirmed (txid: Uint8Array): void {
							arg.transaction_unconfirmed(txid);
						},

						best_block_updated (header: Uint8Array, height: number): void {
							arg.best_block_updated(header, height);
						},

						get_relevant_txids (): Uint8Array[] {
							Uint8Array[] ret = arg.get_relevant_txids();
				return ret;
						},

						
                    };
                    impl_holder.held = new Confirm (null, structImplementation);
                }
            }

            export interface ConfirmInterface {
                transactions_confirmed(header: Uint8Array, txdata: TwoTuple<Number, Uint8Array>[], height: number): void;
				transaction_unconfirmed(txid: Uint8Array): void;
				best_block_updated(header: Uint8Array, height: number): void;
				get_relevant_txids(): Uint8Array[];
				
            }

            class LDKConfirmHolder {
                held: Confirm;
            }
	public void transactions_confirmed(Uint8Array header, TwoTuple<Number, Uint8Array>[] txdata, number height) {
		bindings.Confirm_transactions_confirmed(this.ptr, header, Arrays.stream(txdata).map(txdata_conv_30 -> bindings.C2Tuple_usizeTransactionZ_new(txdata_conv_30.a, txdata_conv_30.b)).toArray(number[]::new), height);
		/* TODO 2 TwoTuple<Number, Uint8Array>  */;
	}

	public void transaction_unconfirmed(Uint8Array txid) {
		bindings.Confirm_transaction_unconfirmed(this.ptr, txid);
	}

	public void best_block_updated(Uint8Array header, number height) {
		bindings.Confirm_best_block_updated(this.ptr, header, height);
	}

	public Uint8Array[] get_relevant_txids() {
		Uint8Array[] ret = bindings.Confirm_get_relevant_txids(this.ptr);
		return ret;
	}

}
