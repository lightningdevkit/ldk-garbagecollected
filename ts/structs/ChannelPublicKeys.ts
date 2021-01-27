
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelPublicKeys extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelPublicKeys_free(this.ptr);
                    }
                }
	public ChannelPublicKeys clone() {
		number ret = bindings.ChannelPublicKeys_clone(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_funding_pubkey() {
		Uint8Array ret = bindings.ChannelPublicKeys_get_funding_pubkey(this.ptr);
		return ret;
	}

	public void set_funding_pubkey(Uint8Array val) {
		bindings.ChannelPublicKeys_set_funding_pubkey(this.ptr, val);
	}

	public Uint8Array get_revocation_basepoint() {
		Uint8Array ret = bindings.ChannelPublicKeys_get_revocation_basepoint(this.ptr);
		return ret;
	}

	public void set_revocation_basepoint(Uint8Array val) {
		bindings.ChannelPublicKeys_set_revocation_basepoint(this.ptr, val);
	}

	public Uint8Array get_payment_point() {
		Uint8Array ret = bindings.ChannelPublicKeys_get_payment_point(this.ptr);
		return ret;
	}

	public void set_payment_point(Uint8Array val) {
		bindings.ChannelPublicKeys_set_payment_point(this.ptr, val);
	}

	public Uint8Array get_delayed_payment_basepoint() {
		Uint8Array ret = bindings.ChannelPublicKeys_get_delayed_payment_basepoint(this.ptr);
		return ret;
	}

	public void set_delayed_payment_basepoint(Uint8Array val) {
		bindings.ChannelPublicKeys_set_delayed_payment_basepoint(this.ptr, val);
	}

	public Uint8Array get_htlc_basepoint() {
		Uint8Array ret = bindings.ChannelPublicKeys_get_htlc_basepoint(this.ptr);
		return ret;
	}

	public void set_htlc_basepoint(Uint8Array val) {
		bindings.ChannelPublicKeys_set_htlc_basepoint(this.ptr, val);
	}

	public static ChannelPublicKeys constructor_new(Uint8Array funding_pubkey_arg, Uint8Array revocation_basepoint_arg, Uint8Array payment_point_arg, Uint8Array delayed_payment_basepoint_arg, Uint8Array htlc_basepoint_arg) {
		number ret = bindings.ChannelPublicKeys_new(funding_pubkey_arg, revocation_basepoint_arg, payment_point_arg, delayed_payment_basepoint_arg, htlc_basepoint_arg);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelPublicKeys_write(this.ptr);
		return ret;
	}

	public static ChannelPublicKeys constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelPublicKeys_read(ser);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

}
