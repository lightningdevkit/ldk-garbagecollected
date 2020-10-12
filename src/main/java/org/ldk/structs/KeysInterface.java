package org.ldk.structs;

import org.ldk.impl.bindings;

import org.ldk.enums.*;

public class KeysInterface extends CommonBase {
	KeysInterface(Object _dummy, long ptr) { super(ptr); }
	public KeysInterface(bindings.LDKKeysInterface arg) {
		super(bindings.LDKKeysInterface_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.KeysInterface_free(ptr); super.finalize();
	}

	public byte[] call_get_node_secret() {
		byte[] ret = bindings.KeysInterface_call_get_node_secret(this.ptr);
		return ret;
	}

	// Skipped KeysInterface_call_get_destination_script
	public byte[] call_get_shutdown_pubkey() {
		byte[] ret = bindings.KeysInterface_call_get_shutdown_pubkey(this.ptr);
		return ret;
	}

	public ChannelKeys call_get_channel_keys(boolean inbound, long channel_value_satoshis) {
		ChannelKeys ret = new ChannelKeys(null, bindings.KeysInterface_call_get_channel_keys(this.ptr, inbound, channel_value_satoshis));
		ret.ptrs_to.add(this);
		return ret;
	}

	public byte[] call_get_secure_random_bytes() {
		byte[] ret = bindings.KeysInterface_call_get_secure_random_bytes(this.ptr);
		return ret;
	}

}
