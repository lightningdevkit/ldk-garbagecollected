package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class TxIn extends CommonBase {
	/** The witness in this input, in serialized form */
	public final byte[] witness;
	/** The script_sig in this input */
	public final byte[] script_sig;
	/** The transaction output's sequence number */
	public final int sequence;
	/** The txid this input is spending */
	public final byte[] previous_txid;
	/** The output index within the spent transaction of the output this input is spending */
	public final int previous_vout;

	TxIn(java.lang.Object _dummy, long ptr) {
		super(ptr);
		this.witness = bindings.TxIn_get_witness(ptr);
		this.script_sig = bindings.TxIn_get_script_sig(ptr);
		this.sequence = bindings.TxIn_get_sequence(ptr);
		this.previous_txid = bindings.TxIn_get_previous_txid(ptr);
		this.previous_vout = bindings.TxIn_get_previous_vout(ptr);
	}
	/** Constructs a new TxIn, note that previous_txid must be exactly 32 bytes */
	public TxIn(byte[] witness, byte[] script_sig, int sequence, byte[] previous_txid, int previous_vout) {
		this(null, bindings.TxIn_new(witness, script_sig, sequence, previous_txid, previous_vout));
	}

	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxIn_free(ptr); }
	}
}