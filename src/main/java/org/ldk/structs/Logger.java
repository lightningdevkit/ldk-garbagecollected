package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait encapsulating the operations required of a logger
 */
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
		/**
		 * Logs the `Record`
		 */
		void log(Record record);
	}
	private static class LDKLoggerHolder { Logger held; }
	public static Logger new_impl(LoggerInterface arg) {
		final LDKLoggerHolder impl_holder = new LDKLoggerHolder();
		impl_holder.held = new Logger(new bindings.LDKLogger() {
			@Override public void log(long record) {
				Record record_hu_conv = null; if (record < 0 || record > 4096) { record_hu_conv = new Record(null, record); }
				arg.log(record_hu_conv);
				Reference.reachabilityFence(arg);
			}
		});
		return impl_holder.held;
	}
}
