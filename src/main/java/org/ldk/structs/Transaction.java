package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Transaction extends CommonBase{
	Transaction(java.lang.Object _dummy, long ptr) { super(ptr); }
	public Transaction(byte[] data) { super(bindings.new_txpointer_copy_data(data)); }
	@Override public void finalize() throws Throwable { super.finalize(); bindings.txpointer_free(ptr); }
}