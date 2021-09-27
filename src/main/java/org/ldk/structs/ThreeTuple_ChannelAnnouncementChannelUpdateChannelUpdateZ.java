package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A Tuple
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ extends CommonBase {
	ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(ptr); }
	}

}
