package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class KeysInterface extends CommonBase {
	final bindings.LDKKeysInterface bindings_instance;
	KeysInterface(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private KeysInterface(bindings.LDKKeysInterface arg) {
		super(bindings.LDKKeysInterface_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.KeysInterface_free(ptr); } super.finalize();
	}

	public static interface KeysInterfaceInterface {
		byte[] get_node_secret();
		byte[] get_destination_script();
		byte[] get_shutdown_pubkey();
		ChannelKeys get_channel_keys(boolean inbound, long channel_value_satoshis);
		byte[] get_secure_random_bytes();
		Result_ChanKeySignerDecodeErrorZ read_chan_signer(byte[] reader);
	}
	private static class LDKKeysInterfaceHolder { KeysInterface held; }
	public static KeysInterface new_impl(KeysInterfaceInterface arg) {
		final LDKKeysInterfaceHolder impl_holder = new LDKKeysInterfaceHolder();
		impl_holder.held = new KeysInterface(new bindings.LDKKeysInterface() {
			@Override public byte[] get_node_secret() {
				byte[] ret = arg.get_node_secret();
				return ret;
			}
			@Override public byte[] get_destination_script() {
				byte[] ret = arg.get_destination_script();
				return ret;
			}
			@Override public byte[] get_shutdown_pubkey() {
				byte[] ret = arg.get_shutdown_pubkey();
				return ret;
			}
			@Override public long get_channel_keys(boolean inbound, long channel_value_satoshis) {
				ChannelKeys ret = arg.get_channel_keys(inbound, channel_value_satoshis);
				long result = ret == null ? 0 : ret.ptr;
				impl_holder.held.ptrs_to.add(ret);
				return result;
			}
			@Override public byte[] get_secure_random_bytes() {
				byte[] ret = arg.get_secure_random_bytes();
				return ret;
			}
			@Override public long read_chan_signer(byte[] reader) {
				Result_ChanKeySignerDecodeErrorZ ret = arg.read_chan_signer(reader);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
		});
		return impl_holder.held;
	}
	public byte[] get_node_secret() {
		byte[] ret = bindings.KeysInterface_get_node_secret(this.ptr);
		return ret;
	}

	public byte[] get_destination_script() {
		byte[] ret = bindings.KeysInterface_get_destination_script(this.ptr);
		return ret;
	}

	public byte[] get_shutdown_pubkey() {
		byte[] ret = bindings.KeysInterface_get_shutdown_pubkey(this.ptr);
		return ret;
	}

	public ChannelKeys get_channel_keys(boolean inbound, long channel_value_satoshis) {
		long ret = bindings.KeysInterface_get_channel_keys(this.ptr, inbound, channel_value_satoshis);
		ChannelKeys ret_hu_conv = new ChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] get_secure_random_bytes() {
		byte[] ret = bindings.KeysInterface_get_secure_random_bytes(this.ptr);
		return ret;
	}

	public Result_ChanKeySignerDecodeErrorZ read_chan_signer(byte[] reader) {
		long ret = bindings.KeysInterface_read_chan_signer(this.ptr, reader);
		Result_ChanKeySignerDecodeErrorZ ret_hu_conv = Result_ChanKeySignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
