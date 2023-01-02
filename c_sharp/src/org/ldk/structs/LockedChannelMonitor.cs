using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A read-only reference to a current ChannelMonitor.
 * 
 * Note that this holds a mutex in [`ChainMonitor`] and may block other events until it is
 * released.
 */
public class LockedChannelMonitor : CommonBase, IDisposable {
	internal LockedChannelMonitor(object _dummy, long ptr) : base(ptr) { }
	public void Dispose() {
		if (ptr != 0) { bindings.LockedChannelMonitor_free(ptr); }
	}

}
} } }
