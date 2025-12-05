using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A struct representing a name for a channel monitor.
 * 
 * `MonitorName` is primarily used within the [`MonitorUpdatingPersister`]
 * in functions that store or retrieve [`ChannelMonitor`] snapshots.
 * It provides a consistent way to generate a unique key for channel
 * monitors based on the channel's funding [`OutPoint`] for v1 channels or
 * [`ChannelId`] for v2 channels. Use [`ChannelMonitor::persistence_key`] to
 * obtain the correct `MonitorName`.
 * 
 * While users of the Lightning Dev Kit library generally won't need
 * to interact with [`MonitorName`] directly, it can be useful for:
 * - Custom persistence implementations
 * - Debugging or logging channel monitor operations
 * - Extending the functionality of the `MonitorUpdatingPersister`
 * 
 * # Examples
 * 
 * ```
 * use std::str::FromStr;
 * 
 * use bitcoin::Txid;
 * use bitcoin::hashes::hex::FromHex;
 * 
 * use lightning::util::persist::MonitorName;
 * use lightning::chain::transaction::OutPoint;
 * use lightning::ln::types::ChannelId;
 * 
 * v1 channel
 * let outpoint = OutPoint {
 * \t txid: Txid::from_str(\"deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef\").unwrap(),
 * \t index: 1,
 * };
 * let monitor_name = MonitorName::V1Channel(outpoint);
 * assert_eq!(&monitor_name.to_string(), \"deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef_1\");
 * 
 * v2 channel
 * let channel_id = ChannelId(<[u8; 32]>::from_hex(\"deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef\").unwrap());
 * let monitor_name = MonitorName::V2Channel(channel_id);
 * assert_eq!(&monitor_name.to_string(), \"deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef\");
 * 
 * Using MonitorName to generate a storage key
 * let storage_key = format!(\"channel_monitors/{}\", monitor_name);
 * ```
 */
public class MonitorName : CommonBase {
	protected MonitorName(object _dummy, long ptr) : base(ptr) { }
	~MonitorName() {
		if (ptr != 0) { bindings.MonitorName_free(ptr); }
	}

	internal static MonitorName constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKMonitorName_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new MonitorName_V1Channel(ptr);
			case 1: return new MonitorName_V2Channel(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A MonitorName of type V1Channel */
	public class MonitorName_V1Channel : MonitorName {
		public org.ldk.structs.OutPoint v1_channel;
		internal MonitorName_V1Channel(long ptr) : base(null, ptr) {
			long v1_channel = bindings.LDKMonitorName_V1Channel_get_v1_channel(ptr);
			org.ldk.structs.OutPoint v1_channel_hu_conv = null; if (v1_channel < 0 || v1_channel > 4096) { v1_channel_hu_conv = new org.ldk.structs.OutPoint(null, v1_channel); }
			if (v1_channel_hu_conv != null) { v1_channel_hu_conv.ptrs_to.AddLast(this); };
			this.v1_channel = v1_channel_hu_conv;
		}
	}
	/** A MonitorName of type V2Channel */
	public class MonitorName_V2Channel : MonitorName {
		public org.ldk.structs.ChannelId v2_channel;
		internal MonitorName_V2Channel(long ptr) : base(null, ptr) {
			long v2_channel = bindings.LDKMonitorName_V2Channel_get_v2_channel(ptr);
			org.ldk.structs.ChannelId v2_channel_hu_conv = null; if (v2_channel < 0 || v2_channel > 4096) { v2_channel_hu_conv = new org.ldk.structs.ChannelId(null, v2_channel); }
			if (v2_channel_hu_conv != null) { v2_channel_hu_conv.ptrs_to.AddLast(this); };
			this.v2_channel = v2_channel_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.MonitorName_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the MonitorName
	 */
	public org.ldk.structs.MonitorName clone() {
		long ret = bindings.MonitorName_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorName ret_hu_conv = org.ldk.structs.MonitorName.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new V1Channel-variant MonitorName
	 */
	public static org.ldk.structs.MonitorName v1_channel(org.ldk.structs.OutPoint a) {
		long ret = bindings.MonitorName_v1_channel(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorName ret_hu_conv = org.ldk.structs.MonitorName.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new V2Channel-variant MonitorName
	 */
	public static org.ldk.structs.MonitorName v2_channel(org.ldk.structs.ChannelId a) {
		long ret = bindings.MonitorName_v2_channel(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorName ret_hu_conv = org.ldk.structs.MonitorName.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two MonitorNames contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.MonitorName b) {
		bool ret = bindings.MonitorName_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is MonitorName)) return false;
		return this.eq((MonitorName)o);
	}
	/**
	 * Generates a non-cryptographic 64-bit hash of the MonitorName.
	 */
	public long hash() {
		long ret = bindings.MonitorName_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Get the string representation of a MonitorName object
	 */
	public string to_str() {
		long ret = bindings.MonitorName_to_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

}
} } }
