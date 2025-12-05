
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Simple implementation of [`EntropySource`], [`NodeSigner`], and [`SignerProvider`] that takes a
 * 32-byte seed for use as a BIP 32 extended key and derives keys from that.
 * 
 * Your `node_id` is seed/0'.
 * Unilateral closes may use seed/1'.
 * Cooperative closes may use seed/2'.
 * The two close keys may be needed to claim on-chain funds!
 * 
 * This struct cannot be used for nodes that wish to support receiving phantom payments;
 * [`PhantomKeysManager`] must be used instead.
 * 
 * Note that switching between this struct and [`PhantomKeysManager`] will invalidate any
 * previously issued invoices and attempts to pay previous invoices will fail.
 */
export class KeysManager extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.KeysManager_free);
	}

	/**
	 * Constructs a [`KeysManager`] from a 32-byte seed. If the seed is in some way biased (e.g.,
	 * your CSRNG is busted) this may panic (but more importantly, you will possibly lose funds).
	 * `starting_time` isn't strictly required to actually be a time, but it must absolutely,
	 * without a doubt, be unique to this instance. ie if you start multiple times with the same
	 * `seed`, `starting_time` must be unique to each run. Thus, the easiest way to achieve this
	 * is to simply use the current time (with very high precision).
	 * 
	 * The `seed` MUST be backed up safely prior to use so that the keys can be re-created, however,
	 * obviously, `starting_time` should be unique every time you reload the library - it is only
	 * used to generate new ephemeral key data (which will be stored by the individual channel if
	 * necessary).
	 * 
	 * Note that the seed is required to recover certain on-chain funds independent of
	 * [`ChannelMonitor`] data, though a current copy of [`ChannelMonitor`] data is also required
	 * for any channel, and some on-chain during-closing funds.
	 * 
	 * If `v2_remote_key_derivation` is set, the `script_pubkey`s which receive funds on-chain when
	 * our counterparty force-closes will be one of a static set of [`STATIC_PAYMENT_KEY_COUNT`]*2
	 * possible `script_pubkey`s. This only applies to new or spliced channels, however if this is
	 * set you *MUST NOT* downgrade to a version of LDK prior to 0.2.
	 * 
	 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
	 */
	public static constructor_new(seed: Uint8Array, starting_time_secs: bigint, starting_time_nanos: number, v2_remote_key_derivation: boolean): KeysManager {
		const ret: bigint = bindings.KeysManager_new(bindings.encodeUint8Array(seed), starting_time_secs, starting_time_nanos, v2_remote_key_derivation);
		const ret_hu_conv: KeysManager = new KeysManager(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Gets the \"node_id\" secret key used to sign gossip announcements, decode onion data, etc.
	 */
	public get_node_secret_key(): Uint8Array {
		const ret: number = bindings.KeysManager_get_node_secret_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the set of possible `script_pubkey`s which can appear on chain for our
	 * non-HTLC-encumbered balance if our counterparty force-closes a channel.
	 * 
	 * If you've lost all data except your seed, asking your peers nicely to force-close the
	 * chanels they had with you (and hoping they don't broadcast a stale state and that there are
	 * no pending HTLCs in the latest state) and scanning the chain for these `script_pubkey`s can
	 * allow you to recover (some of) your funds.
	 * 
	 * Only channels opened when using a [`KeysManager`] with the `v2_remote_key_derivation`
	 * argument to [`KeysManager::new`] set, or any spliced channels will close to such scripts,
	 * other channels will close to a randomly-generated `script_pubkey`.
	 */
	public possible_v2_counterparty_closed_balance_spks(): Uint8Array[] {
		const ret: number = bindings.KeysManager_possible_v2_counterparty_closed_balance_spks(this.ptr);
		const ret_conv_12_len: number = bindings.getArrayLength(ret);
		const ret_conv_12_arr: Uint8Array[] = new Array(ret_conv_12_len).fill(null);
		for (var m = 0; m < ret_conv_12_len; m++) {
			const ret_conv_12: number = bindings.getU32ArrayElem(ret, m);
			const ret_conv_12_conv: Uint8Array = bindings.decodeUint8Array(ret_conv_12);
			ret_conv_12_arr[m] = ret_conv_12_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_12_arr;
	}

	/**
	 * Derive an old [`EcdsaChannelSigner`] containing per-channel secrets based on a key derivation parameters.
	 */
	public derive_channel_keys(params: Uint8Array): InMemorySigner {
		const ret: bigint = bindings.KeysManager_derive_channel_keys(this.ptr, bindings.encodeUint8Array(params));
		const ret_hu_conv: InMemorySigner = new InMemorySigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Signs the given [`Psbt`] which spends the given [`SpendableOutputDescriptor`]s.
	 * The resulting inputs will be finalized and the PSBT will be ready for broadcast if there
	 * are no other inputs that need signing.
	 * 
	 * Returns `Err(())` if the PSBT is missing a descriptor or if we fail to sign.
	 * 
	 * May panic if the [`SpendableOutputDescriptor`]s were not generated by channels which used
	 * this [`KeysManager`] or one of the [`InMemorySigner`] created by this [`KeysManager`].
	 */
	public sign_spendable_outputs_psbt(descriptors: SpendableOutputDescriptor[], psbt: Uint8Array): Result_CVec_u8ZNoneZ {
		const ret: bigint = bindings.KeysManager_sign_spendable_outputs_psbt(this.ptr, bindings.encodeUint64Array(descriptors.map(descriptors_conv_27 => CommonBase.get_ptr_of(descriptors_conv_27))), bindings.encodeUint8Array(psbt));
		const ret_hu_conv: Result_CVec_u8ZNoneZ = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EntropySource which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EntropySource must be freed before this_arg is
	 */
	public as_EntropySource(): EntropySource {
		const ret: bigint = bindings.KeysManager_as_EntropySource(this.ptr);
		const ret_hu_conv: EntropySource = new EntropySource(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new NodeSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned NodeSigner must be freed before this_arg is
	 */
	public as_NodeSigner(): NodeSigner {
		const ret: bigint = bindings.KeysManager_as_NodeSigner(this.ptr);
		const ret_hu_conv: NodeSigner = new NodeSigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OutputSpender which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OutputSpender must be freed before this_arg is
	 */
	public as_OutputSpender(): OutputSpender {
		const ret: bigint = bindings.KeysManager_as_OutputSpender(this.ptr);
		const ret_hu_conv: OutputSpender = new OutputSpender(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new SignerProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned SignerProvider must be freed before this_arg is
	 */
	public as_SignerProvider(): SignerProvider {
		const ret: bigint = bindings.KeysManager_as_SignerProvider(this.ptr);
		const ret_hu_conv: SignerProvider = new SignerProvider(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
