using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An unspent transaction output that is available to spend resulting from a successful
 * [`CoinSelection`] attempt.
 */
public class Utxo : CommonBase {
	internal Utxo(object _dummy, long ptr) : base(ptr) { }
	~Utxo() {
		if (ptr != 0) { bindings.Utxo_free(ptr); }
	}

	/**
	 * The unique identifier of the output.
	 */
	public org.ldk.structs.OutPoint get_outpoint() {
		long ret = bindings.Utxo_get_outpoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The unique identifier of the output.
	 */
	public void set_outpoint(org.ldk.structs.OutPoint val) {
		bindings.Utxo_set_outpoint(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The output to spend.
	 */
	public org.ldk.structs.TxOut get_output() {
		long ret = bindings.Utxo_get_output(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The output to spend.
	 */
	public void set_output(org.ldk.structs.TxOut val) {
		bindings.Utxo_set_output(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and [`TxIn::witness`], each
	 * with their lengths included, required to satisfy the output's script. The weight consumed by
	 * the input's `script_sig` must account for [`WITNESS_SCALE_FACTOR`].
	 */
	public long get_satisfaction_weight() {
		long ret = bindings.Utxo_get_satisfaction_weight(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and [`TxIn::witness`], each
	 * with their lengths included, required to satisfy the output's script. The weight consumed by
	 * the input's `script_sig` must account for [`WITNESS_SCALE_FACTOR`].
	 */
	public void set_satisfaction_weight(long val) {
		bindings.Utxo_set_satisfaction_weight(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new Utxo given each field
	 */
	public static org.ldk.structs.Utxo of(org.ldk.structs.OutPoint outpoint_arg, org.ldk.structs.TxOut output_arg, long satisfaction_weight_arg) {
		long ret = bindings.Utxo_new(outpoint_arg.ptr, output_arg.ptr, satisfaction_weight_arg);
		GC.KeepAlive(outpoint_arg);
		GC.KeepAlive(output_arg);
		GC.KeepAlive(satisfaction_weight_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Utxo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Utxo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Utxo_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Utxo
	 */
	public org.ldk.structs.Utxo clone() {
		long ret = bindings.Utxo_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Utxo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Utxo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Utxo.
	 */
	public long hash() {
		long ret = bindings.Utxo_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Utxos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Utxo b) {
		bool ret = bindings.Utxo_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Utxo)) return false;
		return this.eq((Utxo)o);
	}
	/**
	 * Serialize the Utxo object into a byte array which can be read by Utxo_read
	 */
	public byte[] write() {
		long ret = bindings.Utxo_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Utxo from a byte array, created by Utxo_write
	 */
	public static org.ldk.structs.Result_UtxoDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Utxo_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UtxoDecodeErrorZ ret_hu_conv = Result_UtxoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns a `Utxo` with the `satisfaction_weight` estimate for a legacy P2PKH output.
	 */
	public static org.ldk.structs.Utxo new_p2pkh(org.ldk.structs.OutPoint outpoint, long value, byte[] pubkey_hash) {
		long ret = bindings.Utxo_new_p2pkh(outpoint.ptr, value, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(pubkey_hash, 20)));
		GC.KeepAlive(outpoint);
		GC.KeepAlive(value);
		GC.KeepAlive(pubkey_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Utxo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Utxo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
