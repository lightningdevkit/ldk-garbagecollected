package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class PreCalculatedTxCreationKeys extends CommonBase {
	PreCalculatedTxCreationKeys(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.PreCalculatedTxCreationKeys_free(ptr); super.finalize();
	}

	public PreCalculatedTxCreationKeys(TxCreationKeys keys) {
		super(bindings.PreCalculatedTxCreationKeys_new(keys == null ? 0 : keys.ptr & ~1));
		this.ptrs_to.add(keys);
	}

	public TxCreationKeys trust_key_derivation() {
		TxCreationKeys ret = new TxCreationKeys(null, bindings.PreCalculatedTxCreationKeys_trust_key_derivation(this.ptr));
		return ret;
	}

	public byte[] per_commitment_point() {
		byte[] ret = bindings.PreCalculatedTxCreationKeys_per_commitment_point(this.ptr);
		return ret;
	}

}
