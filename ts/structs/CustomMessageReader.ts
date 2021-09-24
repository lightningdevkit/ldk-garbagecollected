
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class CustomMessageReader extends CommonBase {

                bindings_instance?: bindings.LDKCustomMessageReader;

                constructor(ptr?: number, arg?: bindings.LDKCustomMessageReader) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKCustomMessageReader_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.CustomMessageReader_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: CustomMessageReaderInterface): CustomMessageReader {
                    const impl_holder: LDKCustomMessageReaderHolder = new LDKCustomMessageReaderHolder();
                    let structImplementation = <bindings.LDKCustomMessageReader>{
                        // todo: in-line interface filling
                        read (message_type: number, buffer: Uint8Array): number {
							Result_COption_TypeZDecodeErrorZ ret = arg.read(message_type, buffer);
				result: number = ret != null ? ret.ptr : 0;
				return result;
						},

						
                    };
                    impl_holder.held = new CustomMessageReader (null, structImplementation);
                }
            }

            export interface CustomMessageReaderInterface {
                read(message_type: number, buffer: Uint8Array): Result_COption_TypeZDecodeErrorZ;
				
            }

            class LDKCustomMessageReaderHolder {
                held: CustomMessageReader;
            }
	public Result_COption_TypeZDecodeErrorZ read(number message_type, Uint8Array buffer) {
		number ret = bindings.CustomMessageReader_read(this.ptr, message_type, buffer);
		Result_COption_TypeZDecodeErrorZ ret_hu_conv = Result_COption_TypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
