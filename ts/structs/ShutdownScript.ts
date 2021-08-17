
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ShutdownScript extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ShutdownScript_free(this.ptr);
                    }
                }
	public ShutdownScript clone() {
		number ret = bindings.ShutdownScript_clone(this.ptr);
		const ret_hu_conv: ShutdownScript = new ShutdownScript(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ShutdownScript_write(this.ptr);
		return ret;
	}

	public static Result_ShutdownScriptDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ShutdownScript_read(ser);
		Result_ShutdownScriptDecodeErrorZ ret_hu_conv = Result_ShutdownScriptDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static ShutdownScript constructor_new_p2pkh(Uint8Array pubkey_hash) {
		number ret = bindings.ShutdownScript_new_p2pkh(pubkey_hash);
		const ret_hu_conv: ShutdownScript = new ShutdownScript(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ShutdownScript constructor_new_p2sh(Uint8Array script_hash) {
		number ret = bindings.ShutdownScript_new_p2sh(script_hash);
		const ret_hu_conv: ShutdownScript = new ShutdownScript(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ShutdownScript constructor_new_p2wpkh(Uint8Array pubkey_hash) {
		number ret = bindings.ShutdownScript_new_p2wpkh(pubkey_hash);
		const ret_hu_conv: ShutdownScript = new ShutdownScript(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ShutdownScript constructor_new_p2wsh(Uint8Array script_hash) {
		number ret = bindings.ShutdownScript_new_p2wsh(script_hash);
		const ret_hu_conv: ShutdownScript = new ShutdownScript(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Result_ShutdownScriptInvalidShutdownScriptZ constructor_new_witness_program(number version, Uint8Array program) {
		number ret = bindings.ShutdownScript_new_witness_program(version, program);
		Result_ShutdownScriptInvalidShutdownScriptZ ret_hu_conv = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Uint8Array into_inner() {
		Uint8Array ret = bindings.ShutdownScript_into_inner(this.ptr);
		return ret;
	}

	public Uint8Array as_legacy_pubkey() {
		Uint8Array ret = bindings.ShutdownScript_as_legacy_pubkey(this.ptr);
		return ret;
	}

	public boolean is_compatible(InitFeatures features) {
		boolean ret = bindings.ShutdownScript_is_compatible(this.ptr, features == null ? 0 : features.ptr & ~1);
		this.ptrs_to.add(features);
		return ret;
	}

}
