
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class SocketDescriptor extends CommonBase {

                bindings_instance?: bindings.LDKSocketDescriptor;

                constructor(ptr?: number, arg?: bindings.LDKSocketDescriptor) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKSocketDescriptor_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.SocketDescriptor_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: SocketDescriptorInterface): SocketDescriptor {
                    const impl_holder: LDKSocketDescriptorHolder = new LDKSocketDescriptorHolder();
                    let structImplementation = <bindings.LDKSocketDescriptor>{
                        // todo: in-line interface filling
                        send_data (data: Uint8Array, resume_read: boolean): number {
							number ret = arg.send_data(data, resume_read);
				return ret;
						},

						disconnect_socket (): void {
							arg.disconnect_socket();
						},

						eq (other_arg: number): boolean {
							SocketDescriptor ret_hu_conv = new SocketDescriptor(null, other_arg);
				ret_hu_conv.ptrs_to.add(this);
							boolean ret = arg.eq(ret_hu_conv);
				return ret;
						},

						hash (): number {
							number ret = arg.hash();
				return ret;
						},

						
                    };
                    impl_holder.held = new SocketDescriptor (null, structImplementation);
                }
            }

            export interface SocketDescriptorInterface {
                send_data(data: Uint8Array, resume_read: boolean): number;
				disconnect_socket(): void;
				eq(other_arg: SocketDescriptor): boolean;
				hash(): number;
				
            }

            class LDKSocketDescriptorHolder {
                held: SocketDescriptor;
            }
	public number send_data(Uint8Array data, boolean resume_read) {
		number ret = bindings.SocketDescriptor_send_data(this.ptr, data, resume_read);
		return ret;
	}

	public void disconnect_socket() {
		bindings.SocketDescriptor_disconnect_socket(this.ptr);
	}

	public number hash() {
		number ret = bindings.SocketDescriptor_hash(this.ptr);
		return ret;
	}

	public SocketDescriptor clone() {
		number ret = bindings.SocketDescriptor_clone(this.ptr);
		SocketDescriptor ret_hu_conv = new SocketDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
