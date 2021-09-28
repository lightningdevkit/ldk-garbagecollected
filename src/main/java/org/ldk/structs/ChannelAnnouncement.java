package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A channel_announcement message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelAnnouncement extends CommonBase {
	ChannelAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelAnnouncement_free(ptr); }
	}

	/**
	 * Authentication of the announcement by the first public node
	 */
	public byte[] get_node_signature_1() {
		byte[] ret = bindings.ChannelAnnouncement_get_node_signature_1(this.ptr);
		return ret;
	}

	/**
	 * Authentication of the announcement by the first public node
	 */
	public void set_node_signature_1(byte[] val) {
		bindings.ChannelAnnouncement_set_node_signature_1(this.ptr, val);
	}

	/**
	 * Authentication of the announcement by the second public node
	 */
	public byte[] get_node_signature_2() {
		byte[] ret = bindings.ChannelAnnouncement_get_node_signature_2(this.ptr);
		return ret;
	}

	/**
	 * Authentication of the announcement by the second public node
	 */
	public void set_node_signature_2(byte[] val) {
		bindings.ChannelAnnouncement_set_node_signature_2(this.ptr, val);
	}

	/**
	 * Proof of funding UTXO ownership by the first public node
	 */
	public byte[] get_bitcoin_signature_1() {
		byte[] ret = bindings.ChannelAnnouncement_get_bitcoin_signature_1(this.ptr);
		return ret;
	}

	/**
	 * Proof of funding UTXO ownership by the first public node
	 */
	public void set_bitcoin_signature_1(byte[] val) {
		bindings.ChannelAnnouncement_set_bitcoin_signature_1(this.ptr, val);
	}

	/**
	 * Proof of funding UTXO ownership by the second public node
	 */
	public byte[] get_bitcoin_signature_2() {
		byte[] ret = bindings.ChannelAnnouncement_get_bitcoin_signature_2(this.ptr);
		return ret;
	}

	/**
	 * Proof of funding UTXO ownership by the second public node
	 */
	public void set_bitcoin_signature_2(byte[] val) {
		bindings.ChannelAnnouncement_set_bitcoin_signature_2(this.ptr, val);
	}

	/**
	 * The actual announcement
	 */
	public UnsignedChannelAnnouncement get_contents() {
		long ret = bindings.ChannelAnnouncement_get_contents(this.ptr);
		if (ret < 1024) { return null; }
		UnsignedChannelAnnouncement ret_hu_conv = new UnsignedChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The actual announcement
	 */
	public void set_contents(UnsignedChannelAnnouncement val) {
		bindings.ChannelAnnouncement_set_contents(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	/**
	 * Constructs a new ChannelAnnouncement given each field
	 */
	public static ChannelAnnouncement of(byte[] node_signature_1_arg, byte[] node_signature_2_arg, byte[] bitcoin_signature_1_arg, byte[] bitcoin_signature_2_arg, UnsignedChannelAnnouncement contents_arg) {
		long ret = bindings.ChannelAnnouncement_new(node_signature_1_arg, node_signature_2_arg, bitcoin_signature_1_arg, bitcoin_signature_2_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1);
		if (ret < 1024) { return null; }
		ChannelAnnouncement ret_hu_conv = new ChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the ChannelAnnouncement
	 */
	public ChannelAnnouncement clone() {
		long ret = bindings.ChannelAnnouncement_clone(this.ptr);
		if (ret < 1024) { return null; }
		ChannelAnnouncement ret_hu_conv = new ChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelAnnouncement object into a byte array which can be read by ChannelAnnouncement_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelAnnouncement_write(this.ptr);
		return ret;
	}

	/**
	 * Read a ChannelAnnouncement from a byte array, created by ChannelAnnouncement_write
	 */
	public static Result_ChannelAnnouncementDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelAnnouncement_read(ser);
		if (ret < 1024) { return null; }
		Result_ChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_ChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
