package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChainMonitor extends CommonBase {
	ChainMonitor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChainMonitor_free(ptr); super.finalize();
	}

	// Skipped ChainMonitor_block_connected
	public void block_disconnected(byte[] header, int disconnected_height) {
		bindings.ChainMonitor_block_disconnected(this.ptr, header, disconnected_height);
	}

	public ChainMonitor(Filter chain_source, BroadcasterInterface broadcaster, Logger logger, FeeEstimator feeest) {
		super(bindings.ChainMonitor_new(chain_source == null ? 0 : chain_source.ptr, broadcaster == null ? 0 : broadcaster.ptr, logger == null ? 0 : logger.ptr, feeest == null ? 0 : feeest.ptr));
		this.ptrs_to.add(chain_source);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(logger);
		this.ptrs_to.add(feeest);
	}

	public Watch as_Watch() {
		Watch ret = new Watch(null, bindings.ChainMonitor_as_Watch(this.ptr));
		ret.ptrs_to.add(this);
		return ret;
	}

	public EventsProvider as_EventsProvider() {
		EventsProvider ret = new EventsProvider(null, bindings.ChainMonitor_as_EventsProvider(this.ptr));
		ret.ptrs_to.add(this);
		return ret;
	}

}
