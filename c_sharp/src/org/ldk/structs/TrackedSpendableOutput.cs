using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The state of a spendable output currently tracked by an [`OutputSweeper`].
 */
public class TrackedSpendableOutput : CommonBase {
	internal TrackedSpendableOutput(object _dummy, long ptr) : base(ptr) { }
	~TrackedSpendableOutput() {
		if (ptr != 0) { bindings.TrackedSpendableOutput_free(ptr); }
	}

	/**
	 * The tracked output descriptor.
	 */
	public org.ldk.structs.SpendableOutputDescriptor get_descriptor() {
		long ret = bindings.TrackedSpendableOutput_get_descriptor(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpendableOutputDescriptor ret_hu_conv = org.ldk.structs.SpendableOutputDescriptor.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The tracked output descriptor.
	 */
	public void set_descriptor(org.ldk.structs.SpendableOutputDescriptor val) {
		bindings.TrackedSpendableOutput_set_descriptor(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The channel this output belongs to.
	 * 
	 * Will be `None` if no `channel_id` was given to [`OutputSweeper::track_spendable_outputs`]
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.ChannelId get_channel_id() {
		long ret = bindings.TrackedSpendableOutput_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel this output belongs to.
	 * 
	 * Will be `None` if no `channel_id` was given to [`OutputSweeper::track_spendable_outputs`]
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.TrackedSpendableOutput_set_channel_id(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The current status of the output spend.
	 */
	public org.ldk.structs.OutputSpendStatus get_status() {
		long ret = bindings.TrackedSpendableOutput_get_status(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutputSpendStatus ret_hu_conv = org.ldk.structs.OutputSpendStatus.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The current status of the output spend.
	 */
	public void set_status(org.ldk.structs.OutputSpendStatus val) {
		bindings.TrackedSpendableOutput_set_status(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new TrackedSpendableOutput given each field
	 * 
	 * Note that channel_id_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static org.ldk.structs.TrackedSpendableOutput of(org.ldk.structs.SpendableOutputDescriptor descriptor_arg, org.ldk.structs.ChannelId channel_id_arg, org.ldk.structs.OutputSpendStatus status_arg) {
		long ret = bindings.TrackedSpendableOutput_new(descriptor_arg.ptr, channel_id_arg == null ? 0 : channel_id_arg.ptr, status_arg.ptr);
		GC.KeepAlive(descriptor_arg);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(status_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrackedSpendableOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrackedSpendableOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.TrackedSpendableOutput_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the TrackedSpendableOutput
	 */
	public org.ldk.structs.TrackedSpendableOutput clone() {
		long ret = bindings.TrackedSpendableOutput_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrackedSpendableOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrackedSpendableOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two TrackedSpendableOutputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.TrackedSpendableOutput b) {
		bool ret = bindings.TrackedSpendableOutput_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is TrackedSpendableOutput)) return false;
		return this.eq((TrackedSpendableOutput)o);
	}
	/**
	 * Returns whether the output is spent in the given transaction.
	 */
	public bool is_spent_in(byte[] tx) {
		bool ret = bindings.TrackedSpendableOutput_is_spent_in(this.ptr, InternalUtils.encodeUint8Array(tx));
		GC.KeepAlive(this);
		GC.KeepAlive(tx);
		return ret;
	}

	/**
	 * Serialize the TrackedSpendableOutput object into a byte array which can be read by TrackedSpendableOutput_read
	 */
	public byte[] write() {
		long ret = bindings.TrackedSpendableOutput_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TrackedSpendableOutput from a byte array, created by TrackedSpendableOutput_write
	 */
	public static org.ldk.structs.Result_TrackedSpendableOutputDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TrackedSpendableOutput_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TrackedSpendableOutputDecodeErrorZ ret_hu_conv = Result_TrackedSpendableOutputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
