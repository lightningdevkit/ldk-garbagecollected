package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A read-only reference to a current ChannelMonitor.
 * 
 * Note that this holds a mutex in [`ChainMonitor`] and may block other events until it is
 * released.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class LockedChannelMonitor extends CommonBase implements AutoCloseable {
	LockedChannelMonitor(Object _dummy, long ptr) { super(ptr); }
	@Override public void close() {
		if (ptr != 0) { bindings.LockedChannelMonitor_free(ptr); }
	}

}
