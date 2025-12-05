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
	public org.ldk.structs.EntropySource as_EntropySource() {
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
	public org.ldk.structs.NodeSigner as_NodeSigner() {
		long ret = bindings.PhantomKeysManager_as_NodeSigner(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		NodeSigner ret_hu_conv = new NodeSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OutputSpender which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OutputSpender must be freed before this_arg is
	 */
	public org.ldk.structs.OutputSpender as_OutputSpender() {
		long ret = bindings.PhantomKeysManager_as_OutputSpender(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OutputSpender ret_hu_conv = new OutputSpender(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new SignerProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned SignerProvider must be freed before this_arg is
	 */
	public org.ldk.structs.SignerProvider as_SignerProvider() {
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
	 * See [`KeysManager::new`] for more information on `seed`, `starting_time_secs`,
	 * `starting_time_nanos`, and `v2_remote_key_derivation`.
	 * 
	 * `cross_node_seed` must be the same across all phantom payment-receiving nodes and also the
	 * same across restarts, or else inbound payments may fail.
	 * 
	 * [phantom node payments]: PhantomKeysManager
	 */
	public static org.ldk.structs.PhantomKeysManager of(byte[] seed, long starting_time_secs, int starting_time_nanos, byte[] cross_node_seed, bool v2_remote_key_derivation) {
		long ret = bindings.PhantomKeysManager_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(seed, 32)), starting_time_secs, starting_time_nanos, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(cross_node_seed, 32)), v2_remote_key_derivation);
		GC.KeepAlive(seed);
		GC.KeepAlive(starting_time_secs);
		GC.KeepAlive(starting_time_nanos);
		GC.KeepAlive(cross_node_seed);
		GC.KeepAlive(v2_remote_key_derivation);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PhantomKeysManager ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PhantomKeysManager(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * See [`KeysManager::derive_channel_keys`] for documentation on this method.
	 */
	public org.ldk.structs.InMemorySigner derive_channel_keys(byte[] _params) {
		long ret = bindings.PhantomKeysManager_derive_channel_keys(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(_params, 32)));
		GC.KeepAlive(this);
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
		long ret = bindings.PhantomKeysManager_get_node_secret_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the \"node_id\" secret key of the phantom node used to sign invoices, decode the
	 * last-hop onion data, etc.
	 */
	public byte[] get_phantom_node_secret_key() {
		long ret = bindings.PhantomKeysManager_get_phantom_node_secret_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
