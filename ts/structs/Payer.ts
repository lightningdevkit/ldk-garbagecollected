
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Payer extends CommonBase {

                bindings_instance?: bindings.LDKPayer;

                constructor(ptr?: number, arg?: bindings.LDKPayer) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKPayer_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Payer_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: PayerInterface): Payer {
                    const impl_holder: LDKPayerHolder = new LDKPayerHolder();
                    let structImplementation = <bindings.LDKPayer>{
                        // todo: in-line interface filling
                        node_id (): Uint8Array {
							Uint8Array ret = arg.node_id();
				result: Uint8Array = InternalUtils.check_arr_len(ret, 33);
				return result;
						},

						first_hops (): number[] {
							ChannelDetails[] ret = arg.first_hops();
				result: number[] = ret != null ? Arrays.stream(ret).map(ret_conv_16 -> ret_conv_16 == null ? 0 : ret_conv_16.clone_ptr()).toArray(number[]::new) : null;
				return result;
						},

						send_payment (route: number, payment_hash: Uint8Array, payment_secret: Uint8Array): number {
							const route_hu_conv: Route = new Route(null, route);
							Result_PaymentIdPaymentSendFailureZ ret = arg.send_payment(route_hu_conv, payment_hash, payment_secret);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						send_spontaneous_payment (route: number, payment_preimage: Uint8Array): number {
							const route_hu_conv: Route = new Route(null, route);
							Result_PaymentIdPaymentSendFailureZ ret = arg.send_spontaneous_payment(route_hu_conv, payment_preimage);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						retry_payment (route: number, payment_id: Uint8Array): number {
							const route_hu_conv: Route = new Route(null, route);
							Result_NonePaymentSendFailureZ ret = arg.retry_payment(route_hu_conv, payment_id);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						abandon_payment (payment_id: Uint8Array): void {
							arg.abandon_payment(payment_id);
						},

						
                    };
                    impl_holder.held = new Payer (null, structImplementation);
                }
            }

            export interface PayerInterface {
                node_id(): Uint8Array;
				first_hops(): ChannelDetails[];
				send_payment(route: Route, payment_hash: Uint8Array, payment_secret: Uint8Array): Result_PaymentIdPaymentSendFailureZ;
				send_spontaneous_payment(route: Route, payment_preimage: Uint8Array): Result_PaymentIdPaymentSendFailureZ;
				retry_payment(route: Route, payment_id: Uint8Array): Result_NonePaymentSendFailureZ;
				abandon_payment(payment_id: Uint8Array): void;
				
            }

            class LDKPayerHolder {
                held: Payer;
            }
	public Uint8Array node_id() {
		Uint8Array ret = bindings.Payer_node_id(this.ptr);
		return ret;
	}

	public ChannelDetails[] first_hops() {
		number[] ret = bindings.Payer_first_hops(this.ptr);
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret.length];
		for (int q = 0; q < ret.length; q++) {
			number ret_conv_16 = ret[q];
			const ret_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, ret_conv_16);
			ret_conv_16_hu_conv.ptrs_to.add(this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	public Result_PaymentIdPaymentSendFailureZ send_payment(Route route, Uint8Array payment_hash, Uint8Array payment_secret) {
		number ret = bindings.Payer_send_payment(this.ptr, route == null ? 0 : route.ptr & ~1, InternalUtils.check_arr_len(payment_hash, 32), InternalUtils.check_arr_len(payment_secret, 32));
		Result_PaymentIdPaymentSendFailureZ ret_hu_conv = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		this.ptrs_to.add(route);
		return ret_hu_conv;
	}

	public Result_PaymentIdPaymentSendFailureZ send_spontaneous_payment(Route route, Uint8Array payment_preimage) {
		number ret = bindings.Payer_send_spontaneous_payment(this.ptr, route == null ? 0 : route.ptr & ~1, InternalUtils.check_arr_len(payment_preimage, 32));
		Result_PaymentIdPaymentSendFailureZ ret_hu_conv = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		this.ptrs_to.add(route);
		return ret_hu_conv;
	}

	public Result_NonePaymentSendFailureZ retry_payment(Route route, Uint8Array payment_id) {
		number ret = bindings.Payer_retry_payment(this.ptr, route == null ? 0 : route.ptr & ~1, InternalUtils.check_arr_len(payment_id, 32));
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		this.ptrs_to.add(route);
		return ret_hu_conv;
	}

	public void abandon_payment(Uint8Array payment_id) {
		bindings.Payer_abandon_payment(this.ptr, InternalUtils.check_arr_len(payment_id, 32));
	}

}
