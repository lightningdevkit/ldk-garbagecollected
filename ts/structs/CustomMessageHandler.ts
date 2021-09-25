
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class CustomMessageHandler extends CommonBase {

                bindings_instance?: bindings.LDKCustomMessageHandler;

                constructor(ptr?: number, arg?: bindings.LDKCustomMessageHandler, customMessageReader?: bindings.LDKCustomMessageReader) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKCustomMessageHandler_new(arg, customMessageReader));
				        this.ptrs_to.push(arg);
				        this.ptrs_to.push(customMessageReader);

				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.CustomMessageHandler_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: CustomMessageHandlerInterface, customMessageReader_impl: CustomMessageReader.CustomMessageReaderInterface): CustomMessageHandler {
                    const impl_holder: LDKCustomMessageHandlerHolder = new LDKCustomMessageHandlerHolder();
                    let structImplementation = <bindings.LDKCustomMessageHandler>{
                        // todo: in-line interface filling
                        handle_custom_message (msg: number, sender_node_id: Uint8Array): number {
							Type ret_hu_conv = new Type(null, msg);
				ret_hu_conv.ptrs_to.add(this);
							Result_NoneLightningErrorZ ret = arg.handle_custom_message(ret_hu_conv, sender_node_id);
				result: number = ret != null ? ret.ptr : 0;
				return result;
						},

						get_and_clear_pending_msg (): number[] {
							TwoTuple<Uint8Array, Type>[] ret = arg.get_and_clear_pending_msg();
				result: number[] = ret != null ? Arrays.stream(ret).map(ret_conv_28 -> bindings.C2Tuple_PublicKeyTypeZ_new(ret_conv_28.a, ret_conv_28.b == null ? 0 : ret_conv_28.b.ptr)).toArray(number[]::new) : null;
				for (TwoTuple<Uint8Array, Type> ret_conv_28: ret) { impl_holder.held.ptrs_to.add(ret_conv_28.b); };
				return result;
						},

						
                    };
                    impl_holder.held = new CustomMessageHandler (null, structImplementation, CustomMessageReader.new_impl(CustomMessageReader_impl).bindings_instance);
                }
            }

            export interface CustomMessageHandlerInterface {
                handle_custom_message(msg: Type, sender_node_id: Uint8Array): Result_NoneLightningErrorZ;
				get_and_clear_pending_msg(): TwoTuple<Uint8Array, Type>[];
				
            }

            class LDKCustomMessageHandlerHolder {
                held: CustomMessageHandler;
            }
	public Result_NoneLightningErrorZ handle_custom_message(Type msg, Uint8Array sender_node_id) {
		number ret = bindings.CustomMessageHandler_handle_custom_message(this.ptr, msg == null ? 0 : msg.ptr, sender_node_id);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public TwoTuple<Uint8Array, Type>[] get_and_clear_pending_msg() {
		number[] ret = bindings.CustomMessageHandler_get_and_clear_pending_msg(this.ptr);
		TwoTuple<Uint8Array, Type>[] ret_conv_28_arr = new TwoTuple[ret.length];
		for (int c = 0; c < ret.length; c++) {
			number ret_conv_28 = ret[c];
			Uint8Array ret_conv_28_a = bindings.LDKC2Tuple_PublicKeyTypeZ_get_a(ret_conv_28);
			number ret_conv_28_b = bindings.LDKC2Tuple_PublicKeyTypeZ_get_b(ret_conv_28);
			Type ret_hu_conv = new Type(null, ret_conv_28_b);
			ret_hu_conv.ptrs_to.add(this);;
			TwoTuple<Uint8Array, Type> ret_conv_28_conv = new TwoTuple<Uint8Array, Type>(ret_conv_28_a, ret_hu_conv, () -> {
				bindings.C2Tuple_PublicKeyTypeZ_free(ret_conv_28);
			});
			ret_hu_conv.ptrs_to.add(ret_conv_28_conv);
			ret_conv_28_arr[c] = ret_conv_28_conv;
		}
		return ret_conv_28_arr;
	}

}
