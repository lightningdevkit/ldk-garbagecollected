using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Similar to [`KeysManager`], but allows the node using this struct to receive phantom node
 * payments.
 * 
 * A phantom node payment is a payment made to a phantom invoice, which is an invoice that can be
 * paid to one of multiple nodes. This works because we encode the invoice route hints such that
 * LDK will recognize an incoming payment as destined for a phantom node, and collect the payment
 * itself without ever needing to forward to this fake node.
 * 
 * Phantom node payments are useful for load balancing between multiple LDK nodes. They also
 * provide some fault tolerance, because payers will automatically retry paying other provided
 * nodes in the case that one node goes down.
 * 
 * Note that multi-path payments are not supported in phantom invoices for security reasons.
 * Switching between this struct and [`KeysManager`] will invalidate any previously issued
 * invoices and attempts to pay previous invoices will fail.
 */
public class PhantomKeysManager : CommonBase {
	internal PhantomKeysManager(object _dummy, long ptr) : base(ptr) { }
	~PhantomKeysManager() {
		if (ptr != 0) { bindings.PhantomKeysManager_free(ptr); }
	}

	/**
	 * Constructs a new EntropySource which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EntropySource must be freed before this_arg is
	 */
	public EntropySource as_EntropySource() {
		long ret = bindings.PhantomKeysManager_as_EntropySource(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EntropySource ret_hu_conv = new EntropySource(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new NodeSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned NodeSigner must be freed before this_arg is
	 */
	public NodeSigner as_NodeSigner() {
		long ret = bindings.PhantomKeysManager_as_NodeSigner(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		NodeSigner ret_hu_conv = new NodeSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new SignerProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned SignerProvider must be freed before this_arg is
	 */
	public SignerProvider as_SignerProvider() {
		long ret = bindings.PhantomKeysManager_as_SignerProvider(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		SignerProvider ret_hu_conv = new SignerProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a [`PhantomKeysManager`] given a 32-byte seed and an additional `cross_node_seed`
	 * that is shared across all nodes that intend to participate in [phantom node payments]
	 * together.
	 * 
	 * See [`KeysManager::new`] for more information on `seed`, `starting_time_secs`, and
	 * `starting_time_nanos`.
	 * 
	 * `cross_node_seed` must be the same across all phantom payment-receiving nodes and also the
	 * same across restarts, or else inbound payments may fail.
	 * 
	 * [phantom node payments]: PhantomKeysManager
	 */
	public static PhantomKeysManager of(byte[] seed, long starting_time_secs, int starting_time_nanos, byte[] cross_node_seed) {
		long ret = bindings.PhantomKeysManager_new(InternalUtils.check_arr_len(seed, 32), starting_time_secs, starting_time_nanos, InternalUtils.check_arr_len(cross_node_seed, 32));
		GC.KeepAlive(seed);
		GC.KeepAlive(starting_time_secs);
		GC.KeepAlive(starting_time_nanos);
		GC.KeepAlive(cross_node_seed);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PhantomKeysManager ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PhantomKeysManager(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * See [`KeysManager::spend_spendable_outputs`] for documentation on this method.
	 */
	public Result_TransactionNoneZ spend_spendable_outputs(SpendableOutputDescriptor[] descriptors, TxOut[] outputs, byte[] change_destination_script, int feerate_sat_per_1000_weight, org.ldk.structs.Option_PackedLockTimeZ locktime) {
		long ret = bindings.PhantomKeysManager_spend_spendable_outputs(this.ptr, descriptors != null ? InternalUtils.mapArray(descriptors, descriptors_conv_27 => descriptors_conv_27.ptr) : null, outputs != null ? InternalUtils.mapArray(outputs, outputs_conv_7 => outputs_conv_7.ptr) : null, change_destination_script, feerate_sat_per_1000_weight, locktime.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(descriptors);
		GC.KeepAlive(outputs);
		GC.KeepAlive(change_destination_script);
		GC.KeepAlive(feerate_sat_per_1000_weight);
		GC.KeepAlive(locktime);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		foreach (SpendableOutputDescriptor descriptors_conv_27 in descriptors) { if (this != null) { this.ptrs_to.AddLast(descriptors_conv_27); }; };
		if (this != null) { this.ptrs_to.AddLast(locktime); };
		return ret_hu_conv;
	}

	/**
	 * See [`KeysManager::derive_channel_keys`] for documentation on this method.
	 */
	public InMemorySigner derive_channel_keys(long channel_value_satoshis, byte[] _params) {
		long ret = bindings.PhantomKeysManager_derive_channel_keys(this.ptr, channel_value_satoshis, InternalUtils.check_arr_len(_params, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(channel_value_satoshis);
		GC.KeepAlive(_params);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InMemorySigner ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InMemorySigner(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets the \"node_id\" secret key used to sign gossip announcements, decode onion data, etc.
	 */
	public byte[] get_node_secret_key() {
		byte[] ret = bindings.PhantomKeysManager_get_node_secret_key(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Gets the \"node_id\" secret key of the phantom node used to sign invoices, decode the
	 * last-hop onion data, etc.
	 */
	public byte[] get_phantom_node_secret_key() {
		byte[] ret = bindings.PhantomKeysManager_get_phantom_node_secret_key(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
