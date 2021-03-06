
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class KeysInterface extends CommonBase {

                bindings_instance?: bindings.LDKKeysInterface;

                constructor(ptr?: number, arg?: bindings.LDKKeysInterface) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKKeysInterface_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.KeysInterface_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: KeysInterfaceInterface): KeysInterface {
                    const impl_holder: LDKKeysInterfaceHolder = new LDKKeysInterfaceHolder();
                    let structImplementation = <bindings.LDKKeysInterface>{
                        // todo: in-line interface filling
                        get_node_secret (): Uint8Array {
							Uint8Array ret = arg.get_node_secret();
				return ret;
						},

						get_destination_script (): Uint8Array {
							Uint8Array ret = arg.get_destination_script();
				return ret;
						},

						get_shutdown_pubkey (): Uint8Array {
							Uint8Array ret = arg.get_shutdown_pubkey();
				return ret;
						},

						get_channel_signer (inbound: boolean, channel_value_satoshis: number): number {
							Sign ret = arg.get_channel_signer(inbound, channel_value_satoshis);
				result: number = ret == null ? 0 : ret.ptr;
				impl_holder.held.ptrs_to.add(ret);
				return result;
						},

						get_secure_random_bytes (): Uint8Array {
							Uint8Array ret = arg.get_secure_random_bytes();
				return ret;
						},

						read_chan_signer (reader: Uint8Array): number {
							Result_SignDecodeErrorZ ret = arg.read_chan_signer(reader);
				result: number = ret != null ? ret.ptr : 0;
				return result;
						},

						
                    };
                    impl_holder.held = new KeysInterface (null, structImplementation);
                }
            }

            export interface KeysInterfaceInterface {
                get_node_secret(): Uint8Array;
				get_destination_script(): Uint8Array;
				get_shutdown_pubkey(): Uint8Array;
				get_channel_signer(inbound: boolean, channel_value_satoshis: number): Sign;
				get_secure_random_bytes(): Uint8Array;
				read_chan_signer(reader: Uint8Array): Result_SignDecodeErrorZ;
				
            }

            class LDKKeysInterfaceHolder {
                held: KeysInterface;
            }
	public Uint8Array get_node_secret() {
		Uint8Array ret = bindings.KeysInterface_get_node_secret(this.ptr);
		return ret;
	}

	public Uint8Array get_destination_script() {
		Uint8Array ret = bindings.KeysInterface_get_destination_script(this.ptr);
		return ret;
	}

	public Uint8Array get_shutdown_pubkey() {
		Uint8Array ret = bindings.KeysInterface_get_shutdown_pubkey(this.ptr);
		return ret;
	}

	public Sign get_channel_signer(boolean inbound, number channel_value_satoshis) {
		number ret = bindings.KeysInterface_get_channel_signer(this.ptr, inbound, channel_value_satoshis);
		Sign ret_hu_conv = new Sign(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_secure_random_bytes() {
		Uint8Array ret = bindings.KeysInterface_get_secure_random_bytes(this.ptr);
		return ret;
	}

	public Result_SignDecodeErrorZ read_chan_signer(Uint8Array reader) {
		number ret = bindings.KeysInterface_read_chan_signer(this.ptr, reader);
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
