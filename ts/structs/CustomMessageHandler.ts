
            
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
							TwoTuple_PublicKeyTypeZ[] ret = arg.get_and_clear_pending_msg();
				result: number[] = ret != null ? Arrays.stream(ret).map(ret_conv_25 -> ret_conv_25 != null ? ret_conv_25.ptr : 0).toArray(number[]::new) : null;
				return result;
						},

						
                    };
                    impl_holder.held = new CustomMessageHandler (null, structImplementation, CustomMessageReader.new_impl(CustomMessageReader_impl).bindings_instance);
                }
            }

            export interface CustomMessageHandlerInterface {
                handle_custom_message(msg: Type, sender_node_id: Uint8Array): Result_NoneLightningErrorZ;
				get_and_clear_pending_msg(): TwoTuple_PublicKeyTypeZ[];
				
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

	public TwoTuple_PublicKeyTypeZ[] get_and_clear_pending_msg() {
		number[] ret = bindings.CustomMessageHandler_get_and_clear_pending_msg(this.ptr);
		TwoTuple_PublicKeyTypeZ[] ret_conv_25_arr = new TwoTuple_PublicKeyTypeZ[ret.length];
		for (int z = 0; z < ret.length; z++) {
			number ret_conv_25 = ret[z];
			TwoTuple_PublicKeyTypeZ ret_conv_25_hu_conv = new TwoTuple_PublicKeyTypeZ(null, ret_conv_25);
			ret_conv_25_hu_conv.ptrs_to.add(this);
			ret_conv_25_arr[z] = ret_conv_25_hu_conv;
		}
		return ret_conv_25_arr;
	}

}
