
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of DNSResolverMessageHandler */
public interface DNSResolverMessageHandlerInterface {
	/**Handle a [`DNSSECQuery`] message.
	 * 
	 * If we provide DNS resolution services to third parties, we should respond with a
	 * [`DNSSECProof`] message.
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	Option_C2Tuple_DNSResolverMessageResponseInstructionZZ handle_dnssec_query(org.ldk.structs.DNSSECQuery message, org.ldk.structs.Responder responder);
	/**Handle a [`DNSSECProof`] message (in response to a [`DNSSECQuery`] we presumably sent).
	 * 
	 * The provided [`DNSResolverContext`] was authenticated by the [`OnionMessenger`] as coming from
	 * a blinded path that we created.
	 * 
	 * With this, we should be able to validate the DNS record we requested.
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 */
	void handle_dnssec_proof(org.ldk.structs.DNSSECProof message, org.ldk.structs.DNSResolverContext context);
	/**Gets the node feature flags which this handler itself supports. Useful for setting the
	 * `dns_resolver` flag if this handler supports returning [`DNSSECProof`] messages in response
	 * to [`DNSSECQuery`] messages.
	 */
	NodeFeatures provided_node_features();
	/**Release any [`DNSResolverMessage`]s that need to be sent.
	 */
	TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] release_pending_messages();
}

/**
 * A handler for an [`OnionMessage`] containing a DNS(SEC) query or a DNSSEC proof
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
public class DNSResolverMessageHandler : CommonBase {
	internal bindings.LDKDNSResolverMessageHandler bindings_instance;
	internal long instance_idx;

	internal DNSResolverMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~DNSResolverMessageHandler() {
		if (ptr != 0) { bindings.DNSResolverMessageHandler_free(ptr); }
	}

	private class LDKDNSResolverMessageHandlerHolder { internal DNSResolverMessageHandler held; }
	private class LDKDNSResolverMessageHandlerImpl : bindings.LDKDNSResolverMessageHandler {
		internal LDKDNSResolverMessageHandlerImpl(DNSResolverMessageHandlerInterface arg, LDKDNSResolverMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private DNSResolverMessageHandlerInterface arg;
		private LDKDNSResolverMessageHandlerHolder impl_holder;
		public long handle_dnssec_query(long _message, long _responder) {
			org.ldk.structs.DNSSECQuery _message_hu_conv = null; if (_message < 0 || _message > 4096) { _message_hu_conv = new org.ldk.structs.DNSSECQuery(null, _message); }
			if (_message_hu_conv != null) { _message_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.Responder _responder_hu_conv = null; if (_responder < 0 || _responder > 4096) { _responder_hu_conv = new org.ldk.structs.Responder(null, _responder); }
			if (_responder_hu_conv != null) { _responder_hu_conv.ptrs_to.AddLast(this); };
			Option_C2Tuple_DNSResolverMessageResponseInstructionZZ ret = arg.handle_dnssec_query(_message_hu_conv, _responder_hu_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public void handle_dnssec_proof(long _message, long _context) {
			org.ldk.structs.DNSSECProof _message_hu_conv = null; if (_message < 0 || _message > 4096) { _message_hu_conv = new org.ldk.structs.DNSSECProof(null, _message); }
			if (_message_hu_conv != null) { _message_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.DNSResolverContext _context_hu_conv = null; if (_context < 0 || _context > 4096) { _context_hu_conv = new org.ldk.structs.DNSResolverContext(null, _context); }
			if (_context_hu_conv != null) { _context_hu_conv.ptrs_to.AddLast(this); };
			arg.handle_dnssec_proof(_message_hu_conv, _context_hu_conv);
				GC.KeepAlive(arg);
		}
		public long provided_node_features() {
			NodeFeatures ret = arg.provided_node_features();
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long release_pending_messages() {
			TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] ret = arg.release_pending_messages();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint64Array(InternalUtils.mapArray(ret, ret_conv_53 => ret_conv_53.clone_ptr()));
			return result;
		}
	}

	/** Creates a new instance of DNSResolverMessageHandler from a given implementation */
	public static DNSResolverMessageHandler new_impl(DNSResolverMessageHandlerInterface arg) {
		LDKDNSResolverMessageHandlerHolder impl_holder = new LDKDNSResolverMessageHandlerHolder();
		LDKDNSResolverMessageHandlerImpl impl = new LDKDNSResolverMessageHandlerImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKDNSResolverMessageHandler_new(impl);

		impl_holder.held = new DNSResolverMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
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
	public org.ldk.structs.Option_C2Tuple_DNSResolverMessageResponseInstructionZZ handle_dnssec_query(org.ldk.structs.DNSSECQuery message, org.ldk.structs.Responder responder) {
		long ret = bindings.DNSResolverMessageHandler_handle_dnssec_query(this.ptr, message.ptr, responder == null ? 0 : responder.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(message);
		GC.KeepAlive(responder);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_DNSResolverMessageResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_DNSResolverMessageResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
		GC.KeepAlive(this);
		GC.KeepAlive(message);
		GC.KeepAlive(context);
	}

	/**
	 * Gets the node feature flags which this handler itself supports. Useful for setting the
	 * `dns_resolver` flag if this handler supports returning [`DNSSECProof`] messages in response
	 * to [`DNSSECQuery`] messages.
	 */
	public org.ldk.structs.NodeFeatures provided_node_features() {
		long ret = bindings.DNSResolverMessageHandler_provided_node_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Release any [`DNSResolverMessage`]s that need to be sent.
	 */
	public TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] release_pending_messages() {
		long ret = bindings.DNSResolverMessageHandler_release_pending_messages(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_53_len = InternalUtils.getArrayLength(ret);
		TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] ret_conv_53_arr = new TwoTuple_DNSResolverMessageMessageSendInstructionsZ[ret_conv_53_len];
		for (int b = 0; b < ret_conv_53_len; b++) {
			long ret_conv_53 = InternalUtils.getU64ArrayElem(ret, b);
			TwoTuple_DNSResolverMessageMessageSendInstructionsZ ret_conv_53_hu_conv = new TwoTuple_DNSResolverMessageMessageSendInstructionsZ(null, ret_conv_53);
			if (ret_conv_53_hu_conv != null) { ret_conv_53_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_53_arr[b] = ret_conv_53_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_53_arr;
	}

}
} } }
