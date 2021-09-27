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
public class TwoTuple_BlockHashChannelMonitorZ extends CommonBase {
	TwoTuple_BlockHashChannelMonitorZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_BlockHashChannelMonitorZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_BlockHashChannelMonitorZ_get_a(this.ptr);
		return ret;
	}

	/**
	 * 
	 */
	public ChannelMonitor get_b() {
		long ret = bindings.C2Tuple_BlockHashChannelMonitorZ_get_b(this.ptr);
		if (ret < 1024) { return null; }
		ChannelMonitor ret_hu_conv = new ChannelMonitor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_BlockHashChannelMonitorZ clone() {
		long ret = bindings.C2Tuple_BlockHashChannelMonitorZ_clone(this.ptr);
		if (ret < 1024) { return null; }
		TwoTuple_BlockHashChannelMonitorZ ret_hu_conv = new TwoTuple_BlockHashChannelMonitorZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_BlockHashChannelMonitorZ from the contained elements.
	 */
	public static TwoTuple_BlockHashChannelMonitorZ of(byte[] a, ChannelMonitor b) {
		long ret = bindings.C2Tuple_BlockHashChannelMonitorZ_new(a, b == null ? 0 : b.ptr & ~1);
		if (ret < 1024) { return null; }
		TwoTuple_BlockHashChannelMonitorZ ret_hu_conv = new TwoTuple_BlockHashChannelMonitorZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(b);
		return ret_hu_conv;
	}

}
