
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of Logger */
public interface LoggerInterface {
	/**Logs the [`Record`].
	 */
	void log(Record record);
}

/**
 * A trait encapsulating the operations required of a logger.
 */
public class Logger : CommonBase {
	internal bindings.LDKLogger bindings_instance;
	internal long instance_idx;

	internal Logger(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~Logger() {
		if (ptr != 0) { bindings.Logger_free(ptr); }
	}

	private class LDKLoggerHolder { internal Logger held; }
	private class LDKLoggerImpl : bindings.LDKLogger {
		internal LDKLoggerImpl(LoggerInterface arg, LDKLoggerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private LoggerInterface arg;
		private LDKLoggerHolder impl_holder;
		public void log(long _record) {
			org.ldk.structs.Record _record_hu_conv = null; if (_record < 0 || _record > 4096) { _record_hu_conv = new org.ldk.structs.Record(null, _record); }
			if (_record_hu_conv != null) { _record_hu_conv.ptrs_to.AddLast(this); };
			arg.log(_record_hu_conv);
				GC.KeepAlive(arg);
		}
	}

	/** Creates a new instance of Logger from a given implementation */
	public static Logger new_impl(LoggerInterface arg) {
		LDKLoggerHolder impl_holder = new LDKLoggerHolder();
		LDKLoggerImpl impl = new LDKLoggerImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKLogger_new(impl);

		impl_holder.held = new Logger(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

}
} } }
