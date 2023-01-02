using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait encapsulating the operations required of a logger
 */
public class Logger : CommonBase {
	internal readonly bindings.LDKLogger bindings_instance;
	internal Logger(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Logger(bindings.LDKLogger arg) : base(bindings.LDKLogger_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~Logger() {
		if (ptr != 0) { bindings.Logger_free(ptr); }
	}

	public interface LoggerInterface {
		/**
		 * Logs the `Record`
		 */
		void log(Record _record);
	}
	private class LDKLoggerHolder { internal Logger held; }
	private class LDKLoggerImpl : bindings.LDKLogger {
		internal LDKLoggerImpl(LoggerInterface arg, LDKLoggerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private LoggerInterface arg;
		private LDKLoggerHolder impl_holder;
		public void log(long _record) {
			org.ldk.structs.Record _record_hu_conv = null; if (_record < 0 || _record > 4096) { _record_hu_conv = new org.ldk.structs.Record(null, _record); }
			arg.log(_record_hu_conv);
				GC.KeepAlive(arg);
		}
	}
	public static Logger new_impl(LoggerInterface arg) {
		LDKLoggerHolder impl_holder = new LDKLoggerHolder();
		impl_holder.held = new Logger(new LDKLoggerImpl(arg, impl_holder));
		return impl_holder.held;
	}
}
} } }
