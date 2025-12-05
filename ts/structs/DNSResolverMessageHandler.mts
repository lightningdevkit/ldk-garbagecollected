

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of DNSResolverMessageHandler */
export interface DNSResolverMessageHandlerInterface {
	/**Handle a [`DNSSECQuery`] message.
	 * 
	 * If we provide DNS resolution services to third parties, we should respond with a
	 * [`DNSSECProof`] message.
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	handle_dnssec_query(message: DNSSECQuery, responder: Responder): Option_C2Tuple_DNSResolverMessageResponseInstructionZZ;
	/**Handle a [`DNSSECProof`] message (in response to a [`DNSSECQuery`] we presumably sent).
	 * 
	 * The provided [`DNSResolverContext`] was authenticated by the [`OnionMessenger`] as coming from
	 * a blinded path that we created.
	 * 
	 * With this, we should be able to validate the DNS record we requested.
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 */
	handle_dnssec_proof(message: DNSSECProof, context: DNSResolverContext): void;
	/**Gets the node feature flags which this handler itself supports. Useful for setting the
	 * `dns_resolver` flag if this handler supports returning [`DNSSECProof`] messages in response
	 * to [`DNSSECQuery`] messages.
	 */
	provided_node_features(): NodeFeatures;
	/**Release any [`DNSResolverMessage`]s that need to be sent.
	 */
	release_pending_messages(): TwoTuple_DNSResolverMessageMessageSendInstructionsZ[];
}

class LDKDNSResolverMessageHandlerHolder {
	held: DNSResolverMessageHandler|null = null;
}

/**
 * A handler for an [`OnionMessage`] containing a DNS(SEC) query or a DNSSEC proof
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
export class DNSResolverMessageHandler extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKDNSResolverMessageHandler|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DNSResolverMessageHandler_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of DNSResolverMessageHandler from a given implementation */
	public static new_impl(arg: DNSResolverMessageHandlerInterface): DNSResolverMessageHandler {
		const impl_holder: LDKDNSResolverMessageHandlerHolder = new LDKDNSResolverMessageHandlerHolder();
		let structImplementation = {
			handle_dnssec_query (message: bigint, responder: bigint): bigint {
				const message_hu_conv: DNSSECQuery = new DNSSECQuery(null, message);
				CommonBase.add_ref_from(message_hu_conv, this);
				const responder_hu_conv: Responder = new Responder(null, responder);
				CommonBase.add_ref_from(responder_hu_conv, this);
				const ret: Option_C2Tuple_DNSResolverMessageResponseInstructionZZ = arg.handle_dnssec_query(message_hu_conv, responder_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			handle_dnssec_proof (message: bigint, context: bigint): void {
				const message_hu_conv: DNSSECProof = new DNSSECProof(null, message);
				CommonBase.add_ref_from(message_hu_conv, this);
				const context_hu_conv: DNSResolverContext = new DNSResolverContext(null, context);
				CommonBase.add_ref_from(context_hu_conv, this);
				arg.handle_dnssec_proof(message_hu_conv, context_hu_conv);
			},
			provided_node_features (): bigint {
				const ret: NodeFeatures = arg.provided_node_features();
				const result: bigint = ret.clone_ptr();
				return result;
			},
			release_pending_messages (): number {
				const ret: TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] = arg.release_pending_messages();
				const result: number = bindings.encodeUint64Array(ret.map(ret_conv_53 => ret_conv_53.clone_ptr()));
				return result;
			},
		} as bindings.LDKDNSResolverMessageHandler;
		const ptr_idx: [bigint, number] = bindings.LDKDNSResolverMessageHandler_new(structImplementation);

		impl_holder.held = new DNSResolverMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Handle a [`DNSSECQuery`] message.
	 * 
	 * If we provide DNS resolution services to third parties, we should respond with a
	 * [`DNSSECProof`] message.
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public handle_dnssec_query(message: DNSSECQuery, responder: Responder|null): Option_C2Tuple_DNSResolverMessageResponseInstructionZZ {
		const ret: bigint = bindings.DNSResolverMessageHandler_handle_dnssec_query(this.ptr, CommonBase.get_ptr_of(message), responder == null ? 0n : CommonBase.get_ptr_of(responder));
		const ret_hu_conv: Option_C2Tuple_DNSResolverMessageResponseInstructionZZ = Option_C2Tuple_DNSResolverMessageResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Handle a [`DNSSECProof`] message (in response to a [`DNSSECQuery`] we presumably sent).
	 * 
	 * The provided [`DNSResolverContext`] was authenticated by the [`OnionMessenger`] as coming from
	 * a blinded path that we created.
	 * 
	 * With this, we should be able to validate the DNS record we requested.
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 */
	public handle_dnssec_proof(message: DNSSECProof, context: DNSResolverContext): void {
		bindings.DNSResolverMessageHandler_handle_dnssec_proof(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context));
	}

	/**
	 * Gets the node feature flags which this handler itself supports. Useful for setting the
	 * `dns_resolver` flag if this handler supports returning [`DNSSECProof`] messages in response
	 * to [`DNSSECQuery`] messages.
	 */
	public provided_node_features(): NodeFeatures {
		const ret: bigint = bindings.DNSResolverMessageHandler_provided_node_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Release any [`DNSResolverMessage`]s that need to be sent.
	 */
	public release_pending_messages(): TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] {
		const ret: number = bindings.DNSResolverMessageHandler_release_pending_messages(this.ptr);
		const ret_conv_53_len: number = bindings.getArrayLength(ret);
		const ret_conv_53_arr: TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] = new Array(ret_conv_53_len).fill(null);
		for (var b = 0; b < ret_conv_53_len; b++) {
			const ret_conv_53: bigint = bindings.getU64ArrayElem(ret, b);
			const ret_conv_53_hu_conv: TwoTuple_DNSResolverMessageMessageSendInstructionsZ = new TwoTuple_DNSResolverMessageMessageSendInstructionsZ(null, ret_conv_53);
			CommonBase.add_ref_from(ret_conv_53_hu_conv, this);
			ret_conv_53_arr[b] = ret_conv_53_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_53_arr;
	}

}
