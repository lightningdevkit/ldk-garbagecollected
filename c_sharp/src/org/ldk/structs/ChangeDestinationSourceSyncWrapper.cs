using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A wrapper around [`ChangeDestinationSource`] to allow for async calls.
 * 
 * You should likely never use this directly but rather allow LDK to build this when required to
 * build higher-level sync wrappers.
 */
public class ChangeDestinationSourceSyncWrapper : CommonBase {
	internal ChangeDestinationSourceSyncWrapper(object _dummy, long ptr) : base(ptr) { }
	~ChangeDestinationSourceSyncWrapper() {
		if (ptr != 0) { bindings.ChangeDestinationSourceSyncWrapper_free(ptr); }
	}

	/**
	 * Creates a new [`ChangeDestinationSourceSyncWrapper`].
	 */
	public static org.ldk.structs.ChangeDestinationSourceSyncWrapper of(org.ldk.structs.ChangeDestinationSourceSync source) {
		long ret = bindings.ChangeDestinationSourceSyncWrapper_new(source.ptr);
		GC.KeepAlive(source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChangeDestinationSourceSyncWrapper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChangeDestinationSourceSyncWrapper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(source); };
		return ret_hu_conv;
	}

}
} } }
