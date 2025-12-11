package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The state of a spendable output currently tracked by an [`OutputSweeper`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TrackedSpendableOutput extends CommonBase {
	TrackedSpendableOutput(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TrackedSpendableOutput_free(ptr); }
	}

	/**
	 * The tracked output descriptor.
	 */
	public SpendableOutputDescriptor get_descriptor() {
		long ret = bindings.TrackedSpendableOutput_get_descriptor(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpendableOutputDescriptor ret_hu_conv = org.ldk.structs.SpendableOutputDescriptor.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The tracked output descriptor.
	 */
	public void set_descriptor(org.ldk.structs.SpendableOutputDescriptor val) {
		bindings.TrackedSpendableOutput_set_descriptor(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel this output belongs to.
	 * 
	 * Will be `None` if no `channel_id` was given to [`OutputSweeper::track_spendable_outputs`]
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelId get_channel_id() {
		long ret = bindings.TrackedSpendableOutput_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel this output belongs to.
	 * 
	 * Will be `None` if no `channel_id` was given to [`OutputSweeper::track_spendable_outputs`]
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_channel_id(@Nullable org.ldk.structs.ChannelId val) {
		bindings.TrackedSpendableOutput_set_channel_id(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The current status of the output spend.
	 */
	public OutputSpendStatus get_status() {
		long ret = bindings.TrackedSpendableOutput_get_status(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutputSpendStatus ret_hu_conv = org.ldk.structs.OutputSpendStatus.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The current status of the output spend.
	 */
	public void set_status(org.ldk.structs.OutputSpendStatus val) {
		bindings.TrackedSpendableOutput_set_status(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new TrackedSpendableOutput given each field
	 * 
	 * Note that channel_id_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static TrackedSpendableOutput of(org.ldk.structs.SpendableOutputDescriptor descriptor_arg, @Nullable org.ldk.structs.ChannelId channel_id_arg, org.ldk.structs.OutputSpendStatus status_arg) {
		long ret = bindings.TrackedSpendableOutput_new(descriptor_arg.ptr, channel_id_arg == null ? 0 : channel_id_arg.ptr, status_arg.ptr);
		Reference.reachabilityFence(descriptor_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(status_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrackedSpendableOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrackedSpendableOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.TrackedSpendableOutput_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the TrackedSpendableOutput
	 */
	public TrackedSpendableOutput clone() {
		long ret = bindings.TrackedSpendableOutput_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrackedSpendableOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrackedSpendableOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two TrackedSpendableOutputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.TrackedSpendableOutput b) {
		boolean ret = bindings.TrackedSpendableOutput_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof TrackedSpendableOutput)) return false;
		return this.eq((TrackedSpendableOutput)o);
	}
	/**
	 * Returns whether the output is spent in the given transaction.
	 */
	public boolean is_spent_in(byte[] tx) {
		boolean ret = bindings.TrackedSpendableOutput_is_spent_in(this.ptr, tx);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(tx);
		return ret;
	}

	/**
	 * Serialize the TrackedSpendableOutput object into a byte array which can be read by TrackedSpendableOutput_read
	 */
	public byte[] write() {
		byte[] ret = bindings.TrackedSpendableOutput_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a TrackedSpendableOutput from a byte array, created by TrackedSpendableOutput_write
	 */
	public static Result_TrackedSpendableOutputDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TrackedSpendableOutput_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TrackedSpendableOutputDecodeErrorZ ret_hu_conv = Result_TrackedSpendableOutputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
