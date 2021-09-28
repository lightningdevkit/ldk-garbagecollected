
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Sign extends CommonBase {

                bindings_instance?: bindings.LDKSign;

                constructor(ptr?: number, arg?: bindings.LDKSign, baseSign?: bindings.LDKBaseSign, pubkeys?: ChannelPublicKeys) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKSign_new(arg, baseSign, pubkeys == null ? 0 : pubkeys.ptr & ~1));
				        this.ptrs_to.push(arg);
				        this.ptrs_to.push(baseSign);

				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Sign_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: SignInterface, baseSign_impl: BaseSign.BaseSignInterface, pubkeys: ChannelPublicKeys): Sign {
                    const impl_holder: LDKSignHolder = new LDKSignHolder();
                    let structImplementation = <bindings.LDKSign>{
                        // todo: in-line interface filling
                        write (): Uint8Array {
							Uint8Array ret = arg.write();
				return ret;
						},

						
                    };
                    impl_holder.held = new Sign (null, structImplementation, BaseSign.new_impl(BaseSign_impl, pubkeys).bindings_instance, pubkeys);
                }
            }

            export interface SignInterface {
                write(): Uint8Array;
				
            }

            class LDKSignHolder {
                held: Sign;
            }
	public Uint8Array write() {
		Uint8Array ret = bindings.Sign_write(this.ptr);
		return ret;
	}

	public Sign clone() {
		number ret = bindings.Sign_clone(this.ptr);
		Sign ret_hu_conv = new Sign(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
