package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * Trait that handles persisting a [`ChannelManager`], [`NetworkGraph`], and [`WriteableScore`] to disk.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Persister extends CommonBase {
	final bindings.LDKPersister bindings_instance;
	Persister(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Persister(bindings.LDKPersister arg) {
		super(bindings.LDKPersister_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Persister_free(ptr); } super.finalize();
	}

	public static interface PersisterInterface {
		/**
		 * Persist the given ['ChannelManager'] to disk, returning an error if persistence failed.
		 */
		Result_NoneErrorZ persist_manager(ChannelManager channel_manager);
		/**
		 * Persist the given [`NetworkGraph`] to disk, returning an error if persistence failed.
		 */
		Result_NoneErrorZ persist_graph(NetworkGraph network_graph);
		/**
		 * Persist the given [`WriteableScore`] to disk, returning an error if persistence failed.
		 */
		Result_NoneErrorZ persist_scorer(WriteableScore scorer);
	}
	private static class LDKPersisterHolder { Persister held; }
	public static Persister new_impl(PersisterInterface arg) {
		final LDKPersisterHolder impl_holder = new LDKPersisterHolder();
		impl_holder.held = new Persister(new bindings.LDKPersister() {
			@Override public long persist_manager(long channel_manager) {
				org.ldk.structs.ChannelManager channel_manager_hu_conv = null; if (channel_manager < 0 || channel_manager > 4096) { channel_manager_hu_conv = new org.ldk.structs.ChannelManager(null, channel_manager); }
				Result_NoneErrorZ ret = arg.persist_manager(channel_manager_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long persist_graph(long network_graph) {
				org.ldk.structs.NetworkGraph network_graph_hu_conv = null; if (network_graph < 0 || network_graph > 4096) { network_graph_hu_conv = new org.ldk.structs.NetworkGraph(null, network_graph); }
				Result_NoneErrorZ ret = arg.persist_graph(network_graph_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long persist_scorer(long scorer) {
				WriteableScore ret_hu_conv = new WriteableScore(null, scorer);
				if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
				Result_NoneErrorZ ret = arg.persist_scorer(ret_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Persist the given ['ChannelManager'] to disk, returning an error if persistence failed.
	 */
	public Result_NoneErrorZ persist_manager(ChannelManager channel_manager) {
		long ret = bindings.Persister_persist_manager(this.ptr, channel_manager == null ? 0 : channel_manager.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_manager);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(channel_manager); };
		return ret_hu_conv;
	}

	/**
	 * Persist the given [`NetworkGraph`] to disk, returning an error if persistence failed.
	 */
	public Result_NoneErrorZ persist_graph(NetworkGraph network_graph) {
		long ret = bindings.Persister_persist_graph(this.ptr, network_graph == null ? 0 : network_graph.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(network_graph);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(network_graph); };
		return ret_hu_conv;
	}

	/**
	 * Persist the given [`WriteableScore`] to disk, returning an error if persistence failed.
	 */
	public Result_NoneErrorZ persist_scorer(WriteableScore scorer) {
		long ret = bindings.Persister_persist_scorer(this.ptr, scorer == null ? 0 : scorer.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(scorer);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(scorer); };
		return ret_hu_conv;
	}

}
