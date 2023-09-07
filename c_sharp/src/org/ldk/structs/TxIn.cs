using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class TxIn : CommonBase {
	/** The witness in this input, in serialized form */
	public readonly byte[] witness;
	/** The script_sig in this input */
	public readonly byte[] script_sig;
	/** The transaction output's sequence number */
	public readonly int sequence;
	/** The txid this input is spending */
	public readonly byte[] previous_txid;
	/** The output index within the spent transaction of the output this input is spending */
	public readonly int previous_vout;

	internal TxIn(object _dummy, long ptr) : base(ptr) {
		this.witness = bindings.TxIn_get_witness(ptr);
		this.script_sig = bindings.TxIn_get_script_sig(ptr);
		this.sequence = bindings.TxIn_get_sequence(ptr);
		this.previous_txid = bindings.TxIn_get_previous_txid(ptr);
		this.previous_vout = bindings.TxIn_get_previous_vout(ptr);
	}
	public TxIn(byte[] witness, byte[] script_sig, int sequence, byte[] previous_txid, int previous_vout)
	: this(null, bindings.TxIn_new(witness, script_sig, sequence, previous_txid, previous_vout)) {}

	~TxIn() {
		if (ptr != 0) { bindings.TxIn_free(ptr); }
	}
}} } }
