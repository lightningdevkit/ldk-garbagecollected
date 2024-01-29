package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait encapsulating the operations required of a logger.
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
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.Logger_free(ptr); }
		ptr = 0;
	}
	public static interface LoggerInterface {
		/**
		 * Logs the [`Record`].
		 */
		void log(Record record);
	}
	private static class LDKLoggerHolder { Logger held; }
	public static Logger new_impl(LoggerInterface arg) {
		final LDKLoggerHolder impl_holder = new LDKLoggerHolder();
		impl_holder.held = new Logger(new bindings.LDKLogger() {
			@Override public void log(long record) {
				org.ldk.structs.Record record_hu_conv = null; if (record < 0 || record > 4096) { record_hu_conv = new org.ldk.structs.Record(null, record); }
				if (record_hu_conv != null) { record_hu_conv.ptrs_to.add(this); };
				arg.log(record_hu_conv);
				Reference.reachabilityFence(arg);
			}
		});
		return impl_holder.held;
	}
}
