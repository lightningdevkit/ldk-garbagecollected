using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A dummy struct which implements `RoutingMessageHandler` without storing any routing information
 * or doing any processing. You can provide one of these as the route_handler in a MessageHandler.
 */
public class IgnoringMessageHandler : CommonBase {
	internal IgnoringMessageHandler(object _dummy, long ptr) : base(ptr) { }
	~IgnoringMessageHandler() {
		if (ptr != 0) { bindings.IgnoringMessageHandler_free(ptr); }
	}

	/**
	 * Constructs a new IgnoringMessageHandler given each field
	 */
	public static org.ldk.structs.IgnoringMessageHandler of() {
		long ret = bindings.IgnoringMessageHandler_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.IgnoringMessageHandler ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.IgnoringMessageHandler(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new BaseMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.BaseMessageHandler as_BaseMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_BaseMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		BaseMessageHandler ret_hu_conv = new BaseMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new RoutingMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned RoutingMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.RoutingMessageHandler as_RoutingMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_RoutingMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.OnionMessageHandler as_OnionMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_OnionMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageHandler ret_hu_conv = new OnionMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OffersMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OffersMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.OffersMessageHandler as_OffersMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_OffersMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OffersMessageHandler ret_hu_conv = new OffersMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new AsyncPaymentsMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned AsyncPaymentsMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.AsyncPaymentsMessageHandler as_AsyncPaymentsMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_AsyncPaymentsMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		AsyncPaymentsMessageHandler ret_hu_conv = new AsyncPaymentsMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new DNSResolverMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned DNSResolverMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.DNSResolverMessageHandler as_DNSResolverMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_DNSResolverMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		DNSResolverMessageHandler ret_hu_conv = new DNSResolverMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomOnionMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomOnionMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.CustomOnionMessageHandler as_CustomOnionMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_CustomOnionMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomOnionMessageHandler ret_hu_conv = new CustomOnionMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new SendOnlyMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned SendOnlyMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.SendOnlyMessageHandler as_SendOnlyMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_SendOnlyMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		SendOnlyMessageHandler ret_hu_conv = new SendOnlyMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomMessageReader which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomMessageReader must be freed before this_arg is
	 */
	public org.ldk.structs.CustomMessageReader as_CustomMessageReader() {
		long ret = bindings.IgnoringMessageHandler_as_CustomMessageReader(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomMessageReader ret_hu_conv = new CustomMessageReader(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.CustomMessageHandler as_CustomMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_CustomMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomMessageHandler ret_hu_conv = new CustomMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
