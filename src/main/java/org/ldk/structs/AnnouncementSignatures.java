package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * An announcement_signatures message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class AnnouncementSignatures extends CommonBase {
	AnnouncementSignatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.AnnouncementSignatures_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.AnnouncementSignatures_get_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.AnnouncementSignatures_set_channel_id(this.ptr, val);
	}

	/**
	 * The short channel ID
	 */
	public long get_short_channel_id() {
		long ret = bindings.AnnouncementSignatures_get_short_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The short channel ID
	 */
	public void set_short_channel_id(long val) {
		bindings.AnnouncementSignatures_set_short_channel_id(this.ptr, val);
	}

	/**
	 * A signature by the node key
	 */
	public byte[] get_node_signature() {
		byte[] ret = bindings.AnnouncementSignatures_get_node_signature(this.ptr);
		return ret;
	}

	/**
	 * A signature by the node key
	 */
	public void set_node_signature(byte[] val) {
		bindings.AnnouncementSignatures_set_node_signature(this.ptr, val);
	}

	/**
	 * A signature by the funding key
	 */
	public byte[] get_bitcoin_signature() {
		byte[] ret = bindings.AnnouncementSignatures_get_bitcoin_signature(this.ptr);
		return ret;
	}

	/**
	 * A signature by the funding key
	 */
	public void set_bitcoin_signature(byte[] val) {
		bindings.AnnouncementSignatures_set_bitcoin_signature(this.ptr, val);
	}

	/**
	 * Constructs a new AnnouncementSignatures given each field
	 */
	public static AnnouncementSignatures of(byte[] channel_id_arg, long short_channel_id_arg, byte[] node_signature_arg, byte[] bitcoin_signature_arg) {
		long ret = bindings.AnnouncementSignatures_new(channel_id_arg, short_channel_id_arg, node_signature_arg, bitcoin_signature_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		AnnouncementSignatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new AnnouncementSignatures(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the AnnouncementSignatures
	 */
	public AnnouncementSignatures clone() {
		long ret = bindings.AnnouncementSignatures_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		AnnouncementSignatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new AnnouncementSignatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the AnnouncementSignatures object into a byte array which can be read by AnnouncementSignatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.AnnouncementSignatures_write(this.ptr);
		return ret;
	}

	/**
	 * Read a AnnouncementSignatures from a byte array, created by AnnouncementSignatures_write
	 */
	public static Result_AnnouncementSignaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.AnnouncementSignatures_read(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AnnouncementSignaturesDecodeErrorZ ret_hu_conv = Result_AnnouncementSignaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
