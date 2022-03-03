package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Route hints used in constructing invoices for [phantom node payents].
 * 
 * [phantom node payments]: crate::chain::keysinterface::PhantomKeysManager
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PhantomRouteHints extends CommonBase {
	PhantomRouteHints(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PhantomRouteHints_free(ptr); }
	}

	/**
	 * The list of channels to be included in the invoice route hints.
	 */
	public ChannelDetails[] get_channels() {
		long[] ret = bindings.PhantomRouteHints_get_channels(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_16_len = ret.length;
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret_conv_16_len];
		for (int q = 0; q < ret_conv_16_len; q++) {
			long ret_conv_16 = ret[q];
			ChannelDetails ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new ChannelDetails(null, ret_conv_16); }
			ret_conv_16_hu_conv.ptrs_to.add(this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	/**
	 * The list of channels to be included in the invoice route hints.
	 */
	public void set_channels(ChannelDetails[] val) {
		bindings.PhantomRouteHints_set_channels(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_16 -> val_conv_16 == null ? 0 : val_conv_16.ptr & ~1).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A fake scid used for representing the phantom node's fake channel in generating the invoice
	 * route hints.
	 */
	public long get_phantom_scid() {
		long ret = bindings.PhantomRouteHints_get_phantom_scid(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A fake scid used for representing the phantom node's fake channel in generating the invoice
	 * route hints.
	 */
	public void set_phantom_scid(long val) {
		bindings.PhantomRouteHints_set_phantom_scid(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The pubkey of the real backing node that would ultimately receive the payment.
	 */
	public byte[] get_real_node_pubkey() {
		byte[] ret = bindings.PhantomRouteHints_get_real_node_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The pubkey of the real backing node that would ultimately receive the payment.
	 */
	public void set_real_node_pubkey(byte[] val) {
		bindings.PhantomRouteHints_set_real_node_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new PhantomRouteHints given each field
	 */
	public static PhantomRouteHints of(ChannelDetails[] channels_arg, long phantom_scid_arg, byte[] real_node_pubkey_arg) {
		long ret = bindings.PhantomRouteHints_new(channels_arg != null ? Arrays.stream(channels_arg).mapToLong(channels_arg_conv_16 -> channels_arg_conv_16 == null ? 0 : channels_arg_conv_16.ptr & ~1).toArray() : null, phantom_scid_arg, InternalUtils.check_arr_len(real_node_pubkey_arg, 33));
		Reference.reachabilityFence(channels_arg);
		Reference.reachabilityFence(phantom_scid_arg);
		Reference.reachabilityFence(real_node_pubkey_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		PhantomRouteHints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PhantomRouteHints(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.PhantomRouteHints_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PhantomRouteHints
	 */
	public PhantomRouteHints clone() {
		long ret = bindings.PhantomRouteHints_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		PhantomRouteHints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PhantomRouteHints(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the PhantomRouteHints object into a byte array which can be read by PhantomRouteHints_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PhantomRouteHints_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a PhantomRouteHints from a byte array, created by PhantomRouteHints_write
	 */
	public static Result_PhantomRouteHintsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PhantomRouteHints_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PhantomRouteHintsDecodeErrorZ ret_hu_conv = Result_PhantomRouteHintsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
