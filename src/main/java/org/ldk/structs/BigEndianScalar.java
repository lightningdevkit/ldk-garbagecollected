package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class BigEndianScalar extends CommonBase {
	/** The bytes of the scalar value, in big endian */
	public final byte[] scalar_bytes;

	BigEndianScalar(java.lang.Object _dummy, long ptr) {
		super(ptr);
		this.scalar_bytes = bindings.BigEndianScalar_get_bytes(ptr);
	}
	public BigEndianScalar(byte[] scalar_bytes) {
		super(bindings.BigEndianScalar_new(scalar_bytes));
		this.scalar_bytes = bindings.BigEndianScalar_get_bytes(ptr);
	}

	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BigEndianScalar_free(ptr); }
	}
}