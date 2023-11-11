
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of Persister */
public interface PersisterInterface {
	/**Persist the given ['ChannelManager'] to disk, returning an error if persistence failed.
	 */
	Result_NoneIOErrorZ persist_manager(ChannelManager channel_manager);
	/**Persist the given [`NetworkGraph`] to disk, returning an error if persistence failed.
	 */
	Result_NoneIOErrorZ persist_graph(NetworkGraph network_graph);
	/**Persist the given [`WriteableScore`] to disk, returning an error if persistence failed.
	 */
	Result_NoneIOErrorZ persist_scorer(WriteableScore scorer);
}

/**
 * Trait that handles persisting a [`ChannelManager`], [`NetworkGraph`], and [`WriteableScore`] to disk.
 */
public class Persister : CommonBase {
	internal bindings.LDKPersister bindings_instance;
	internal long instance_idx;

	internal Persister(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~Persister() {
		if (ptr != 0) { bindings.Persister_free(ptr); }
	}

	private class LDKPersisterHolder { internal Persister held; }
	private class LDKPersisterImpl : bindings.LDKPersister {
		internal LDKPersisterImpl(PersisterInterface arg, LDKPersisterHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private PersisterInterface arg;
		private LDKPersisterHolder impl_holder;
		public long persist_manager(long _channel_manager) {
			org.ldk.structs.ChannelManager _channel_manager_hu_conv = null; if (_channel_manager < 0 || _channel_manager > 4096) { _channel_manager_hu_conv = new org.ldk.structs.ChannelManager(null, _channel_manager); }
			Result_NoneIOErrorZ ret = arg.persist_manager(_channel_manager_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long persist_graph(long _network_graph) {
			org.ldk.structs.NetworkGraph _network_graph_hu_conv = null; if (_network_graph < 0 || _network_graph > 4096) { _network_graph_hu_conv = new org.ldk.structs.NetworkGraph(null, _network_graph); }
			Result_NoneIOErrorZ ret = arg.persist_graph(_network_graph_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long persist_scorer(long _scorer) {
			WriteableScore ret_hu_conv = new WriteableScore(null, _scorer);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			Result_NoneIOErrorZ ret = arg.persist_scorer(ret_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}

	/** Creates a new instance of Persister from a given implementation */
	public static Persister new_impl(PersisterInterface arg) {
		LDKPersisterHolder impl_holder = new LDKPersisterHolder();
		LDKPersisterImpl impl = new LDKPersisterImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKPersister_new(impl);

		impl_holder.held = new Persister(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Persist the given ['ChannelManager'] to disk, returning an error if persistence failed.
	 */
	public Result_NoneIOErrorZ persist_manager(org.ldk.structs.ChannelManager channel_manager) {
		long ret = bindings.Persister_persist_manager(this.ptr, channel_manager == null ? 0 : channel_manager.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_manager);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(channel_manager); };
		return ret_hu_conv;
	}

	/**
	 * Persist the given [`NetworkGraph`] to disk, returning an error if persistence failed.
	 */
	public Result_NoneIOErrorZ persist_graph(org.ldk.structs.NetworkGraph network_graph) {
		long ret = bindings.Persister_persist_graph(this.ptr, network_graph == null ? 0 : network_graph.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(network_graph);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(network_graph); };
		return ret_hu_conv;
	}

	/**
	 * Persist the given [`WriteableScore`] to disk, returning an error if persistence failed.
	 */
	public Result_NoneIOErrorZ persist_scorer(org.ldk.structs.WriteableScore scorer) {
		long ret = bindings.Persister_persist_scorer(this.ptr, scorer.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(scorer);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(scorer); };
		return ret_hu_conv;
	}

}
} } }
