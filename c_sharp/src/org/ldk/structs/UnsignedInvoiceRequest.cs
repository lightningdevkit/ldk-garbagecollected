using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A semantically valid [`InvoiceRequest`] that hasn't been signed.
 */
public class UnsignedInvoiceRequest : CommonBase {
	internal UnsignedInvoiceRequest(object _dummy, long ptr) : base(ptr) { }
	~UnsignedInvoiceRequest() {
		if (ptr != 0) { bindings.UnsignedInvoiceRequest_free(ptr); }
	}

}
} } }
