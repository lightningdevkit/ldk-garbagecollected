package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Data of the `RawInvoice` that is encoded in the data part
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RawDataPart extends CommonBase {
	RawDataPart(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RawDataPart_free(ptr); }
	}

	/**
	 * generation time of the invoice
	 */
	public PositiveTimestamp get_timestamp() {
		long ret = bindings.RawDataPart_get_timestamp(this.ptr);
		if (ret < 1024) { return null; }
		PositiveTimestamp ret_hu_conv = new PositiveTimestamp(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * generation time of the invoice
	 */
	public void set_timestamp(PositiveTimestamp val) {
		bindings.RawDataPart_set_timestamp(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * Checks if two RawDataParts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(RawDataPart b) {
		boolean ret = bindings.RawDataPart_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Creates a copy of the RawDataPart
	 */
	public RawDataPart clone() {
		long ret = bindings.RawDataPart_clone(this.ptr);
		if (ret < 1024) { return null; }
		RawDataPart ret_hu_conv = new RawDataPart(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
