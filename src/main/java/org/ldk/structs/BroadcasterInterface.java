package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BroadcasterInterface extends CommonBase {
	final bindings.LDKBroadcasterInterface bindings_instance;
	BroadcasterInterface(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private BroadcasterInterface(bindings.LDKBroadcasterInterface arg) {
		super(bindings.LDKBroadcasterInterface_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.BroadcasterInterface_free(ptr); } super.finalize();
	}

	public static interface BroadcasterInterfaceInterface {
		void broadcast_transaction(Transaction tx);
	}
	public BroadcasterInterface(BroadcasterInterfaceInterface arg) {
		this(new bindings.LDKBroadcasterInterface() {
			@Override public void broadcast_transaction(long tx) {
				Transaction tx_conv = new Transaction(null, tx);
				arg.broadcast_transaction(tx_conv);
			}
		});
	}
	// Skipped BroadcasterInterface_broadcast_transaction
}
