package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Logger extends CommonBase {
	final bindings.LDKLogger bindings_instance;
	Logger(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Logger(bindings.LDKLogger arg) {
		super(bindings.LDKLogger_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Logger_free(ptr); } super.finalize();
	}

	public static interface LoggerInterface {
		void log(String record);
	}
	public Logger(LoggerInterface arg) {
		this(new bindings.LDKLogger() {
			@Override public void log(String record) {
				arg.log(record);
			}
		});
	}
}
