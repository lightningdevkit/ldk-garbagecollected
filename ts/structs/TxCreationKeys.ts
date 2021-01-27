
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class TxCreationKeys extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.TxCreationKeys_free(this.ptr);
                    }
                }
	public TxCreationKeys clone() {
		number ret = bindings.TxCreationKeys_clone(this.ptr);
		const ret_hu_conv: TxCreationKeys = new TxCreationKeys(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_per_commitment_point() {
		Uint8Array ret = bindings.TxCreationKeys_get_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_per_commitment_point(Uint8Array val) {
		bindings.TxCreationKeys_set_per_commitment_point(this.ptr, val);
	}

	public Uint8Array get_revocation_key() {
		Uint8Array ret = bindings.TxCreationKeys_get_revocation_key(this.ptr);
		return ret;
	}

	public void set_revocation_key(Uint8Array val) {
		bindings.TxCreationKeys_set_revocation_key(this.ptr, val);
	}

	public Uint8Array get_broadcaster_htlc_key() {
		Uint8Array ret = bindings.TxCreationKeys_get_broadcaster_htlc_key(this.ptr);
		return ret;
	}

	public void set_broadcaster_htlc_key(Uint8Array val) {
		bindings.TxCreationKeys_set_broadcaster_htlc_key(this.ptr, val);
	}

	public Uint8Array get_countersignatory_htlc_key() {
		Uint8Array ret = bindings.TxCreationKeys_get_countersignatory_htlc_key(this.ptr);
		return ret;
	}

	public void set_countersignatory_htlc_key(Uint8Array val) {
		bindings.TxCreationKeys_set_countersignatory_htlc_key(this.ptr, val);
	}

	public Uint8Array get_broadcaster_delayed_payment_key() {
		Uint8Array ret = bindings.TxCreationKeys_get_broadcaster_delayed_payment_key(this.ptr);
		return ret;
	}

	public void set_broadcaster_delayed_payment_key(Uint8Array val) {
		bindings.TxCreationKeys_set_broadcaster_delayed_payment_key(this.ptr, val);
	}

	public static TxCreationKeys constructor_new(Uint8Array per_commitment_point_arg, Uint8Array revocation_key_arg, Uint8Array broadcaster_htlc_key_arg, Uint8Array countersignatory_htlc_key_arg, Uint8Array broadcaster_delayed_payment_key_arg) {
		number ret = bindings.TxCreationKeys_new(per_commitment_point_arg, revocation_key_arg, broadcaster_htlc_key_arg, countersignatory_htlc_key_arg, broadcaster_delayed_payment_key_arg);
		const ret_hu_conv: TxCreationKeys = new TxCreationKeys(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.TxCreationKeys_write(this.ptr);
		return ret;
	}

	public static TxCreationKeys constructor_read(Uint8Array ser) {
		number ret = bindings.TxCreationKeys_read(ser);
		const ret_hu_conv: TxCreationKeys = new TxCreationKeys(null, ret);
		return ret_hu_conv;
	}

	public static Result_TxCreationKeysSecpErrorZ constructor_derive_new(Uint8Array per_commitment_point, Uint8Array broadcaster_delayed_payment_base, Uint8Array broadcaster_htlc_base, Uint8Array countersignatory_revocation_base, Uint8Array countersignatory_htlc_base) {
		number ret = bindings.TxCreationKeys_derive_new(per_commitment_point, broadcaster_delayed_payment_base, broadcaster_htlc_base, countersignatory_revocation_base, countersignatory_htlc_base);
		Result_TxCreationKeysSecpErrorZ ret_hu_conv = Result_TxCreationKeysSecpErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_TxCreationKeysSecpErrorZ constructor_from_channel_static_keys(Uint8Array per_commitment_point, ChannelPublicKeys broadcaster_keys, ChannelPublicKeys countersignatory_keys) {
		number ret = bindings.TxCreationKeys_from_channel_static_keys(per_commitment_point, broadcaster_keys == null ? 0 : broadcaster_keys.ptr & ~1, countersignatory_keys == null ? 0 : countersignatory_keys.ptr & ~1);
		Result_TxCreationKeysSecpErrorZ ret_hu_conv = Result_TxCreationKeysSecpErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(broadcaster_keys);
		ret_hu_conv.ptrs_to.add(countersignatory_keys);
		return ret_hu_conv;
	}

}
