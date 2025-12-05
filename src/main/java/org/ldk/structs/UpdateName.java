package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A struct representing a name for a channel monitor update.
 * 
 * [`UpdateName`] is primarily used within the [`MonitorUpdatingPersister`] in
 * functions that store or retrieve partial updates to channel monitors. It
 * provides a consistent way to generate and parse unique identifiers for
 * monitor updates based on their sequence number.
 * 
 * The name is derived from the update's sequence ID, which is a monotonically
 * increasing u64 value. This format allows for easy ordering of updates and
 * efficient storage and retrieval in key-value stores.
 * 
 * # Usage
 * 
 * While users of the Lightning Dev Kit library generally won't need to
 * interact with `UpdateName` directly, it still can be useful for custom
 * persistence implementations. The u64 value is the update_id that can be
 * compared with [ChannelMonitor::get_latest_update_id] to check if this update
 * has been applied to the channel monitor or not, which is useful for pruning
 * stale channel monitor updates off persistence.
 * 
 * # Examples
 * 
 * ```
 * use lightning::util::persist::UpdateName;
 * 
 * let update_id: u64 = 42;
 * let update_name = UpdateName::from(update_id);
 * assert_eq!(update_name.as_str(), \"42\");
 * 
 * Using UpdateName to generate a storage key
 * let monitor_name = \"some_monitor_name\";
 * let storage_key = format!(\"channel_monitor_updates/{}/{}\", monitor_name, update_name.as_str());
 * ```
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UpdateName extends CommonBase {
	UpdateName(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UpdateName_free(ptr); }
	}

	public long get_a() {
		long ret = bindings.UpdateName_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(long val) {
		bindings.UpdateName_set_a(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs an [`UpdateName`], after verifying that an update sequence ID
	 * can be derived from the given `name`.
	 */
	public static Result_UpdateNameIOErrorZ of(java.lang.String name) {
		long ret = bindings.UpdateName_new(name);
		Reference.reachabilityFence(name);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UpdateNameIOErrorZ ret_hu_conv = Result_UpdateNameIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Convert this update name to a string slice.
	 * 
	 * This method is particularly useful when you need to use the update name
	 * as part of a key in a key-value store or when logging.
	 * 
	 * # Examples
	 * 
	 * ```
	 * use lightning::util::persist::UpdateName;
	 * 
	 * let update_name = UpdateName::from(42);
	 * assert_eq!(update_name.as_str(), \"42\");
	 * ```
	 */
	public String as_str() {
		String ret = bindings.UpdateName_as_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Build a UpdateName from a u64
	 */
	public static UpdateName from_u64(long f) {
		long ret = bindings.UpdateName_from_u64(f);
		Reference.reachabilityFence(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UpdateName ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UpdateName(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
