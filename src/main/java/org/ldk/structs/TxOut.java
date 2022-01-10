package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class TxOut extends CommonBase {
	/** The script_pubkey in this output */
	public final byte[] script_pubkey;
	/** The value, in satoshis, of this output */
	public final long value;

	TxOut(java.lang.Object _dummy, long ptr) {
		super(ptr);
		this.script_pubkey = bindings.TxOut_get_script_pubkey(ptr);
		this.value = bindings.TxOut_get_value(ptr);
	}
	public TxOut(long value, byte[] script_pubkey) {
		super(bindings.TxOut_new(script_pubkey, value));
		this.script_pubkey = bindings.TxOut_get_script_pubkey(ptr);
		this.value = bindings.TxOut_get_value(ptr);
	}

	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxOut_free(ptr); }
	}
}