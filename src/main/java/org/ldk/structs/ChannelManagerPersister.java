package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * Trait which handles persisting a [`ChannelManager`] to disk.
 * 
 * [`ChannelManager`]: lightning::ln::channelmanager::ChannelManager
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelManagerPersister extends CommonBase {
	final bindings.LDKChannelManagerPersister bindings_instance;
	ChannelManagerPersister(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private ChannelManagerPersister(bindings.LDKChannelManagerPersister arg) {
		super(bindings.LDKChannelManagerPersister_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.ChannelManagerPersister_free(ptr); } super.finalize();
	}

	public static interface ChannelManagerPersisterInterface {
		/**
		 * Persist the given [`ChannelManager`] to disk, returning an error if persistence failed
		 * (which will cause the [`BackgroundProcessor`] which called this method to exit.
		 * 
		 * [`ChannelManager`]: lightning::ln::channelmanager::ChannelManager
		 */
		Result_NoneErrorZ persist_manager(ChannelManager channel_manager);
	}
	private static class LDKChannelManagerPersisterHolder { ChannelManagerPersister held; }
	public static ChannelManagerPersister new_impl(ChannelManagerPersisterInterface arg) {
		final LDKChannelManagerPersisterHolder impl_holder = new LDKChannelManagerPersisterHolder();
		impl_holder.held = new ChannelManagerPersister(new bindings.LDKChannelManagerPersister() {
			@Override public long persist_manager(long channel_manager) {
				ChannelManager channel_manager_hu_conv = null; if (channel_manager < 0 || channel_manager > 4096) { channel_manager_hu_conv = new ChannelManager(null, channel_manager); }
				Result_NoneErrorZ ret = arg.persist_manager(channel_manager_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Persist the given [`ChannelManager`] to disk, returning an error if persistence failed
	 * (which will cause the [`BackgroundProcessor`] which called this method to exit.
	 * 
	 * [`ChannelManager`]: lightning::ln::channelmanager::ChannelManager
	 */
	public Result_NoneErrorZ persist_manager(ChannelManager channel_manager) {
		long ret = bindings.ChannelManagerPersister_persist_manager(this.ptr, channel_manager == null ? 0 : channel_manager.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_manager);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(channel_manager);
		return ret_hu_conv;
	}

}
