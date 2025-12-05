

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of SignerProvider */
export interface SignerProviderInterface {
	/**Generates a unique `channel_keys_id` that can be used to obtain a [`Self::EcdsaSigner`] through
	 * [`SignerProvider::derive_channel_signer`]. The `user_channel_id` is provided to allow
	 * implementations of [`SignerProvider`] to maintain a mapping between itself and the generated
	 * `channel_keys_id`.
	 * 
	 * This method must return a different value each time it is called.
	 */
	generate_channel_keys_id(inbound: boolean, user_channel_id: bigint): Uint8Array;
	/**Derives the private key material backing a `Signer`.
	 * 
	 * To derive a new `Signer`, a fresh `channel_keys_id` should be obtained through
	 * [`SignerProvider::generate_channel_keys_id`]. Otherwise, an existing `Signer` can be
	 * re-derived from its `channel_keys_id`, which can be obtained through its trait method
	 * [`ChannelSigner::channel_keys_id`].
	 */
	derive_channel_signer(channel_keys_id: Uint8Array): EcdsaChannelSigner;
	/**Get a script pubkey which we send funds to when claiming on-chain contestable outputs.
	 * 
	 * If this function returns an error, this will result in a channel failing to open.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user. `channel_keys_id` may be
	 * used to derive a unique value for each channel.
	 */
	get_destination_script(channel_keys_id: Uint8Array): Result_CVec_u8ZNoneZ;
	/**Get a script pubkey which we will send funds to when closing a channel.
	 * 
	 * If this function returns an error, this will result in a channel failing to open or close.
	 * In the event of a failure when the counterparty is initiating a close, this can result in a
	 * channel force close.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user.
	 */
	get_shutdown_scriptpubkey(): Result_ShutdownScriptNoneZ;
}

class LDKSignerProviderHolder {
	held: SignerProvider|null = null;
}

/**
 * A trait that can return signer instances for individual channels.
 */
export class SignerProvider extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKSignerProvider|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.SignerProvider_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of SignerProvider from a given implementation */
	public static new_impl(arg: SignerProviderInterface): SignerProvider {
		const impl_holder: LDKSignerProviderHolder = new LDKSignerProviderHolder();
		let structImplementation = {
			generate_channel_keys_id (inbound: boolean, user_channel_id: number): number {
				const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
				const ret: Uint8Array = arg.generate_channel_keys_id(inbound, user_channel_id_conv);
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
			derive_channel_signer (channel_keys_id: number): bigint {
				const channel_keys_id_conv: Uint8Array = bindings.decodeUint8Array(channel_keys_id);
				const ret: EcdsaChannelSigner = arg.derive_channel_signer(channel_keys_id_conv);
				const result: bigint = ret.clone_ptr();
				CommonBase.add_ref_from(impl_holder.held, ret);
				return result;
			},
			get_destination_script (channel_keys_id: number): bigint {
				const channel_keys_id_conv: Uint8Array = bindings.decodeUint8Array(channel_keys_id);
				const ret: Result_CVec_u8ZNoneZ = arg.get_destination_script(channel_keys_id_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			get_shutdown_scriptpubkey (): bigint {
				const ret: Result_ShutdownScriptNoneZ = arg.get_shutdown_scriptpubkey();
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKSignerProvider;
		const ptr_idx: [bigint, number] = bindings.LDKSignerProvider_new(structImplementation);

		impl_holder.held = new SignerProvider(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Generates a unique `channel_keys_id` that can be used to obtain a [`Self::EcdsaSigner`] through
	 * [`SignerProvider::derive_channel_signer`]. The `user_channel_id` is provided to allow
	 * implementations of [`SignerProvider`] to maintain a mapping between itself and the generated
	 * `channel_keys_id`.
	 * 
	 * This method must return a different value each time it is called.
	 */
	public generate_channel_keys_id(inbound: boolean, user_channel_id: bigint): Uint8Array {
		const ret: number = bindings.SignerProvider_generate_channel_keys_id(this.ptr, inbound, bindings.encodeUint128(user_channel_id));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Derives the private key material backing a `Signer`.
	 * 
	 * To derive a new `Signer`, a fresh `channel_keys_id` should be obtained through
	 * [`SignerProvider::generate_channel_keys_id`]. Otherwise, an existing `Signer` can be
	 * re-derived from its `channel_keys_id`, which can be obtained through its trait method
	 * [`ChannelSigner::channel_keys_id`].
	 */
	public derive_channel_signer(channel_keys_id: Uint8Array): EcdsaChannelSigner {
		const ret: bigint = bindings.SignerProvider_derive_channel_signer(this.ptr, bindings.encodeUint8Array(channel_keys_id));
		const ret_hu_conv: EcdsaChannelSigner = new EcdsaChannelSigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Get a script pubkey which we send funds to when claiming on-chain contestable outputs.
	 * 
	 * If this function returns an error, this will result in a channel failing to open.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user. `channel_keys_id` may be
	 * used to derive a unique value for each channel.
	 */
	public get_destination_script(channel_keys_id: Uint8Array): Result_CVec_u8ZNoneZ {
		const ret: bigint = bindings.SignerProvider_get_destination_script(this.ptr, bindings.encodeUint8Array(channel_keys_id));
		const ret_hu_conv: Result_CVec_u8ZNoneZ = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get a script pubkey which we will send funds to when closing a channel.
	 * 
	 * If this function returns an error, this will result in a channel failing to open or close.
	 * In the event of a failure when the counterparty is initiating a close, this can result in a
	 * channel force close.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user.
	 */
	public get_shutdown_scriptpubkey(): Result_ShutdownScriptNoneZ {
		const ret: bigint = bindings.SignerProvider_get_shutdown_scriptpubkey(this.ptr);
		const ret_hu_conv: Result_ShutdownScriptNoneZ = Result_ShutdownScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
