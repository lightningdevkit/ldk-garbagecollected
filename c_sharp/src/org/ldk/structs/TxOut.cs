using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class TxOut : CommonBase {
	/** The script_pubkey in this output */
	public readonly byte[] script_pubkey;
	/** The value, in satoshis, of this output */
	public readonly long value;

    internal TxOut(object _dummy, long ptr) : base(ptr) {
		this.script_pubkey = bindings.TxOut_get_script_pubkey(ptr);
		this.value = bindings.TxOut_get_value(ptr);
	}
    public TxOut(long value, byte[] script_pubkey) : this(null, bindings.TxOut_new(script_pubkey, value)) {}

	~TxOut() {
		if (ptr != 0) { bindings.TxOut_free(ptr); }
	}
}} } }
