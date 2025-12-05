package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A handler for an [`OnionMessage`] containing a DNS(SEC) query or a DNSSEC proof
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DNSResolverMessageHandler extends CommonBase {
	final bindings.LDKDNSResolverMessageHandler bindings_instance;
	DNSResolverMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private DNSResolverMessageHandler(bindings.LDKDNSResolverMessageHandler arg) {
		super(bindings.LDKDNSResolverMessageHandler_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.DNSResolverMessageHandler_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.DNSResolverMessageHandler_free(ptr); }
		ptr = 0;
	}
	public static interface DNSResolverMessageHandlerInterface {
		/**
		 * Handle a [`DNSSECQuery`] message.
		 * 
		 * If we provide DNS resolution services to third parties, we should respond with a
		 * [`DNSSECProof`] message.
		 * 
		 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		Option_C2Tuple_DNSResolverMessageResponseInstructionZZ handle_dnssec_query(DNSSECQuery message, Responder responder);
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
		void handle_dnssec_proof(DNSSECProof message, DNSResolverContext context);
		/**
		 * Gets the node feature flags which this handler itself supports. Useful for setting the
		 * `dns_resolver` flag if this handler supports returning [`DNSSECProof`] messages in response
		 * to [`DNSSECQuery`] messages.
		 */
		NodeFeatures provided_node_features();
		/**
		 * Release any [`DNSResolverMessage`]s that need to be sent.
		 */
		TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] release_pending_messages();
	}
	private static class LDKDNSResolverMessageHandlerHolder { DNSResolverMessageHandler held; }
	public static DNSResolverMessageHandler new_impl(DNSResolverMessageHandlerInterface arg) {
		final LDKDNSResolverMessageHandlerHolder impl_holder = new LDKDNSResolverMessageHandlerHolder();
		impl_holder.held = new DNSResolverMessageHandler(new bindings.LDKDNSResolverMessageHandler() {
			@Override public long handle_dnssec_query(long message, long responder) {
				org.ldk.structs.DNSSECQuery message_hu_conv = null; if (message < 0 || message > 4096) { message_hu_conv = new org.ldk.structs.DNSSECQuery(null, message); }
				if (message_hu_conv != null) { message_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.Responder responder_hu_conv = null; if (responder < 0 || responder > 4096) { responder_hu_conv = new org.ldk.structs.Responder(null, responder); }
				if (responder_hu_conv != null) { responder_hu_conv.ptrs_to.add(this); };
				Option_C2Tuple_DNSResolverMessageResponseInstructionZZ ret = arg.handle_dnssec_query(message_hu_conv, responder_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public void handle_dnssec_proof(long message, long context) {
				org.ldk.structs.DNSSECProof message_hu_conv = null; if (message < 0 || message > 4096) { message_hu_conv = new org.ldk.structs.DNSSECProof(null, message); }
				if (message_hu_conv != null) { message_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.DNSResolverContext context_hu_conv = null; if (context < 0 || context > 4096) { context_hu_conv = new org.ldk.structs.DNSResolverContext(null, context); }
				if (context_hu_conv != null) { context_hu_conv.ptrs_to.add(this); };
				arg.handle_dnssec_proof(message_hu_conv, context_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public long provided_node_features() {
				NodeFeatures ret = arg.provided_node_features();
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long[] release_pending_messages() {
				TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] ret = arg.release_pending_messages();
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_53 -> ret_conv_53.clone_ptr()).toArray() : null;
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Handle a [`DNSSECQuery`] message.
	 * 
	 * If we provide DNS resolution services to third parties, we should respond with a
	 * [`DNSSECProof`] message.
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Option_C2Tuple_DNSResolverMessageResponseInstructionZZ handle_dnssec_query(org.ldk.structs.DNSSECQuery message, @Nullable org.ldk.structs.Responder responder) {
		long ret = bindings.DNSResolverMessageHandler_handle_dnssec_query(this.ptr, message.ptr, responder == null ? 0 : responder.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		Reference.reachabilityFence(responder);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_DNSResolverMessageResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_DNSResolverMessageResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public void handle_dnssec_proof(org.ldk.structs.DNSSECProof message, org.ldk.structs.DNSResolverContext context) {
		bindings.DNSResolverMessageHandler_handle_dnssec_proof(this.ptr, message.ptr, context.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		Reference.reachabilityFence(context);
	}

	/**
	 * Gets the node feature flags which this handler itself supports. Useful for setting the
	 * `dns_resolver` flag if this handler supports returning [`DNSSECProof`] messages in response
	 * to [`DNSSECQuery`] messages.
	 */
	public NodeFeatures provided_node_features() {
		long ret = bindings.DNSResolverMessageHandler_provided_node_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Release any [`DNSResolverMessage`]s that need to be sent.
	 */
	public TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] release_pending_messages() {
		long[] ret = bindings.DNSResolverMessageHandler_release_pending_messages(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_53_len = ret.length;
		TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] ret_conv_53_arr = new TwoTuple_DNSResolverMessageMessageSendInstructionsZ[ret_conv_53_len];
		for (int b = 0; b < ret_conv_53_len; b++) {
			long ret_conv_53 = ret[b];
			TwoTuple_DNSResolverMessageMessageSendInstructionsZ ret_conv_53_hu_conv = new TwoTuple_DNSResolverMessageMessageSendInstructionsZ(null, ret_conv_53);
			if (ret_conv_53_hu_conv != null) { ret_conv_53_hu_conv.ptrs_to.add(this); };
			ret_conv_53_arr[b] = ret_conv_53_hu_conv;
		}
		return ret_conv_53_arr;
	}

}
