package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A channel_ready message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelReady extends CommonBase {
	ChannelReady(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelReady_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.ChannelReady_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.ChannelReady_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The per-commitment point of the second commitment transaction
	 */
	public byte[] get_next_per_commitment_point() {
		byte[] ret = bindings.ChannelReady_get_next_per_commitment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The per-commitment point of the second commitment transaction
	 */
	public void set_next_per_commitment_point(byte[] val) {
		bindings.ChannelReady_set_next_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * If set, provides a short_channel_id alias for this channel. The sender will accept payments
	 * to be forwarded over this SCID and forward them to this messages' recipient.
	 */
	public Option_u64Z get_short_channel_id_alias() {
		long ret = bindings.ChannelReady_get_short_channel_id_alias(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * If set, provides a short_channel_id alias for this channel. The sender will accept payments
	 * to be forwarded over this SCID and forward them to this messages' recipient.
	 */
	public void set_short_channel_id_alias(Option_u64Z val) {
		bindings.ChannelReady_set_short_channel_id_alias(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ChannelReady given each field
	 */
	public static ChannelReady of(byte[] channel_id_arg, byte[] next_per_commitment_point_arg, Option_u64Z short_channel_id_alias_arg) {
		long ret = bindings.ChannelReady_new(InternalUtils.check_arr_len(channel_id_arg, 32), InternalUtils.check_arr_len(next_per_commitment_point_arg, 33), short_channel_id_alias_arg.ptr);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(next_per_commitment_point_arg);
		Reference.reachabilityFence(short_channel_id_alias_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelReady ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelReady(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelReady_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelReady
	 */
	public ChannelReady clone() {
		long ret = bindings.ChannelReady_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelReady ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelReady(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelReady object into a byte array which can be read by ChannelReady_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelReady_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ChannelReady from a byte array, created by ChannelReady_write
	 */
	public static Result_ChannelReadyDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelReady_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelReadyDecodeErrorZ ret_hu_conv = Result_ChannelReadyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
