
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


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
export class PhantomKeysManager extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PhantomKeysManager_free);
	}

	/**
	 * Constructs a new EntropySource which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EntropySource must be freed before this_arg is
	 */
	public as_EntropySource(): EntropySource {
		const ret: bigint = bindings.PhantomKeysManager_as_EntropySource(this.ptr);
		const ret_hu_conv: EntropySource = new EntropySource(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new NodeSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned NodeSigner must be freed before this_arg is
	 */
	public as_NodeSigner(): NodeSigner {
		const ret: bigint = bindings.PhantomKeysManager_as_NodeSigner(this.ptr);
		const ret_hu_conv: NodeSigner = new NodeSigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OutputSpender which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OutputSpender must be freed before this_arg is
	 */
	public as_OutputSpender(): OutputSpender {
		const ret: bigint = bindings.PhantomKeysManager_as_OutputSpender(this.ptr);
		const ret_hu_conv: OutputSpender = new OutputSpender(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new SignerProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned SignerProvider must be freed before this_arg is
	 */
	public as_SignerProvider(): SignerProvider {
		const ret: bigint = bindings.PhantomKeysManager_as_SignerProvider(this.ptr);
		const ret_hu_conv: SignerProvider = new SignerProvider(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
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
	public static constructor_new(seed: Uint8Array, starting_time_secs: bigint, starting_time_nanos: number, cross_node_seed: Uint8Array, v2_remote_key_derivation: boolean): PhantomKeysManager {
		const ret: bigint = bindings.PhantomKeysManager_new(bindings.encodeUint8Array(seed), starting_time_secs, starting_time_nanos, bindings.encodeUint8Array(cross_node_seed), v2_remote_key_derivation);
		const ret_hu_conv: PhantomKeysManager = new PhantomKeysManager(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * See [`KeysManager::derive_channel_keys`] for documentation on this method.
	 */
	public derive_channel_keys(params: Uint8Array): InMemorySigner {
		const ret: bigint = bindings.PhantomKeysManager_derive_channel_keys(this.ptr, bindings.encodeUint8Array(params));
		const ret_hu_conv: InMemorySigner = new InMemorySigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Gets the \"node_id\" secret key used to sign gossip announcements, decode onion data, etc.
	 */
	public get_node_secret_key(): Uint8Array {
		const ret: number = bindings.PhantomKeysManager_get_node_secret_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the \"node_id\" secret key of the phantom node used to sign invoices, decode the
	 * last-hop onion data, etc.
	 */
	public get_phantom_node_secret_key(): Uint8Array {
		const ret: number = bindings.PhantomKeysManager_get_phantom_node_secret_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
