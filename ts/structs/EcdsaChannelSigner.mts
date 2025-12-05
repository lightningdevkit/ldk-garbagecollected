

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of EcdsaChannelSigner */
export interface EcdsaChannelSignerInterface {
}

class LDKEcdsaChannelSignerHolder {
	held: EcdsaChannelSigner|null = null;
}

/**
 * A trait to sign Lightning channel transactions as described in
 * [BOLT 3](https://github.com/lightning/bolts/blob/master/03-transactions.md).
 * 
 * Signing services could be implemented on a hardware wallet and should implement signing
 * policies in order to be secure. Please refer to the [VLS Policy
 * Controls](https://gitlab.com/lightning-signer/validating-lightning-signer/-/blob/main/docs/policy-controls.md)
 * for an example of such policies.
 * 
 * Like [`ChannelSigner`], many of the methods allow errors to be returned to support async
 * signing. In such cases, the signing operation can be replayed by calling
 * [`ChannelManager::signer_unblocked`] or [`ChainMonitor::signer_unblocked`] (see individual
 * method documentation for which method should be called) once the result is ready, at which
 * point the channel operation will resume.
 * 
 * [`ChannelManager::signer_unblocked`]: crate::ln::channelmanager::ChannelManager::signer_unblocked
 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
 */
export class EcdsaChannelSigner extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKEcdsaChannelSigner|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.EcdsaChannelSigner_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of EcdsaChannelSigner from a given implementation */
	public static new_impl(arg: EcdsaChannelSignerInterface, baseEcdsaChannelSigner_impl: BaseEcdsaChannelSignerInterface, channelSigner_impl: ChannelSignerInterface): EcdsaChannelSigner {
		const impl_holder: LDKEcdsaChannelSignerHolder = new LDKEcdsaChannelSignerHolder();
		let structImplementation = {
		} as bindings.LDKEcdsaChannelSigner;
		const baseEcdsaChannelSigner = BaseEcdsaChannelSigner.new_impl(baseEcdsaChannelSigner_impl, channelSigner_impl);
		const channelSigner = ChannelSigner.new_impl(channelSigner_impl);
		const ptr_idx: [bigint, number] = bindings.LDKEcdsaChannelSigner_new(structImplementation, baseEcdsaChannelSigner.instance_idx!, channelSigner.instance_idx!);

		impl_holder.held = new EcdsaChannelSigner(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		impl_holder.held.ptrs_to.push(baseEcdsaChannelSigner);
		impl_holder.held.ptrs_to.push(channelSigner);
		return impl_holder.held!;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.EcdsaChannelSigner_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of a EcdsaChannelSigner
	 */
	public clone(): EcdsaChannelSigner {
		const ret: bigint = bindings.EcdsaChannelSigner_clone(this.ptr);
		const ret_hu_conv: EcdsaChannelSigner = new EcdsaChannelSigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
