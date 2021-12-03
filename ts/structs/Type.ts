
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Type extends CommonBase {

                bindings_instance?: bindings.LDKType;

                constructor(ptr?: number, arg?: bindings.LDKType) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKType_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Type_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: TypeInterface): Type {
                    const impl_holder: LDKTypeHolder = new LDKTypeHolder();
                    let structImplementation = <bindings.LDKType>{
                        // todo: in-line interface filling
                        type_id (): number {
							number ret = arg.type_id();
				return ret;
						},

						debug_str (): String {
							String ret = arg.debug_str();
				return ret;
						},

						write (): Uint8Array {
							Uint8Array ret = arg.write();
				return ret;
						},

						
                    };
                    impl_holder.held = new Type (null, structImplementation);
                }
            }

            export interface TypeInterface {
                type_id(): number;
				debug_str(): String;
				write(): Uint8Array;
				
            }

            class LDKTypeHolder {
                held: Type;
            }
	public number type_id() {
		number ret = bindings.Type_type_id(this.ptr);
		return ret;
	}

	public String debug_str() {
		String ret = bindings.Type_debug_str(this.ptr);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.Type_write(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.Type_clone_ptr(this.ptr);
		return ret;
	}

	public Type clone() {
		number ret = bindings.Type_clone(this.ptr);
		Type ret_hu_conv = new Type(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
