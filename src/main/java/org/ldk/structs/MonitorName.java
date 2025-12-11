package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MonitorName extends CommonBase {
	private MonitorName(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MonitorName_free(ptr); }
	}
	static MonitorName constr_from_ptr(long ptr) {
		bindings.LDKMonitorName raw_val = bindings.LDKMonitorName_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKMonitorName.V1Channel.class) {
			return new V1Channel(ptr, (bindings.LDKMonitorName.V1Channel)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMonitorName.V2Channel.class) {
			return new V2Channel(ptr, (bindings.LDKMonitorName.V2Channel)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The outpoint of the channel's funding transaction.
	 */
	public final static class V1Channel extends MonitorName {
		public final org.ldk.structs.OutPoint v1_channel;
		private V1Channel(long ptr, bindings.LDKMonitorName.V1Channel obj) {
			super(null, ptr);
			long v1_channel = obj.v1_channel;
			org.ldk.structs.OutPoint v1_channel_hu_conv = null; if (v1_channel < 0 || v1_channel > 4096) { v1_channel_hu_conv = new org.ldk.structs.OutPoint(null, v1_channel); }
			if (v1_channel_hu_conv != null) { v1_channel_hu_conv.ptrs_to.add(this); };
			this.v1_channel = v1_channel_hu_conv;
		}
	}
	/**
	 * The id of the channel produced by [`ChannelId::v2_from_revocation_basepoints`].
	 */
	public final static class V2Channel extends MonitorName {
		public final org.ldk.structs.ChannelId v2_channel;
		private V2Channel(long ptr, bindings.LDKMonitorName.V2Channel obj) {
			super(null, ptr);
			long v2_channel = obj.v2_channel;
			org.ldk.structs.ChannelId v2_channel_hu_conv = null; if (v2_channel < 0 || v2_channel > 4096) { v2_channel_hu_conv = new org.ldk.structs.ChannelId(null, v2_channel); }
			if (v2_channel_hu_conv != null) { v2_channel_hu_conv.ptrs_to.add(this); };
			this.v2_channel = v2_channel_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.MonitorName_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the MonitorName
	 */
	public MonitorName clone() {
		long ret = bindings.MonitorName_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorName ret_hu_conv = org.ldk.structs.MonitorName.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new V1Channel-variant MonitorName
	 */
	public static MonitorName v1_channel(org.ldk.structs.OutPoint a) {
		long ret = bindings.MonitorName_v1_channel(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorName ret_hu_conv = org.ldk.structs.MonitorName.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new V2Channel-variant MonitorName
	 */
	public static MonitorName v2_channel(org.ldk.structs.ChannelId a) {
		long ret = bindings.MonitorName_v2_channel(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorName ret_hu_conv = org.ldk.structs.MonitorName.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two MonitorNames contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.MonitorName b) {
		boolean ret = bindings.MonitorName_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof MonitorName)) return false;
		return this.eq((MonitorName)o);
	}
	/**
	 * Generates a non-cryptographic 64-bit hash of the MonitorName.
	 */
	public long hash() {
		long ret = bindings.MonitorName_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Get the string representation of a MonitorName object
	 */
	public String to_str() {
		String ret = bindings.MonitorName_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
