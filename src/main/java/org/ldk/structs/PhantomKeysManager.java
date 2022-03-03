package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PhantomKeysManager extends CommonBase {
	PhantomKeysManager(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PhantomKeysManager_free(ptr); }
	}

	/**
	 * Constructs a new KeysInterface which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned KeysInterface must be freed before this_arg is
	 */
	public KeysInterface as_KeysInterface() {
		long ret = bindings.PhantomKeysManager_as_KeysInterface(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		KeysInterface ret_hu_conv = new KeysInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a `PhantomKeysManager` given a 32-byte seed and an additional `cross_node_seed`
	 * that is shared across all nodes that intend to participate in [phantom node payments] together.
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
		Reference.reachabilityFence(seed);
		Reference.reachabilityFence(starting_time_secs);
		Reference.reachabilityFence(starting_time_nanos);
		Reference.reachabilityFence(cross_node_seed);
		if (ret >= 0 && ret <= 4096) { return null; }
		PhantomKeysManager ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PhantomKeysManager(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * See [`KeysManager::spend_spendable_outputs`] for documentation on this method.
	 */
	public Result_TransactionNoneZ spend_spendable_outputs(SpendableOutputDescriptor[] descriptors, TxOut[] outputs, byte[] change_destination_script, int feerate_sat_per_1000_weight) {
		long ret = bindings.PhantomKeysManager_spend_spendable_outputs(this.ptr, descriptors != null ? Arrays.stream(descriptors).mapToLong(descriptors_conv_27 -> descriptors_conv_27.ptr).toArray() : null, outputs != null ? Arrays.stream(outputs).mapToLong(outputs_conv_7 -> outputs_conv_7.ptr).toArray() : null, change_destination_script, feerate_sat_per_1000_weight);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(descriptors);
		Reference.reachabilityFence(outputs);
		Reference.reachabilityFence(change_destination_script);
		Reference.reachabilityFence(feerate_sat_per_1000_weight);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * See [`KeysManager::derive_channel_keys`] for documentation on this method.
	 */
	public InMemorySigner derive_channel_keys(long channel_value_satoshis, byte[] params) {
		long ret = bindings.PhantomKeysManager_derive_channel_keys(this.ptr, channel_value_satoshis, InternalUtils.check_arr_len(params, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_value_satoshis);
		Reference.reachabilityFence(params);
		if (ret >= 0 && ret <= 4096) { return null; }
		InMemorySigner ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new InMemorySigner(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
