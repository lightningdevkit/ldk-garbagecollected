package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelUpdate extends CommonBase {
	ChannelUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.ChannelUpdate_free(ptr);
	}

	public static ChannelUpdate constructor_clone(ChannelUpdate orig) {
		long ret = bindings.ChannelUpdate_clone(orig == null ? 0 : orig.ptr & ~1);
		ChannelUpdate ret_hu_conv = new ChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_signature() {
		byte[] ret = bindings.ChannelUpdate_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(byte[] val) {
		bindings.ChannelUpdate_set_signature(this.ptr, val);
	}

	public UnsignedChannelUpdate get_contents() {
		long ret = bindings.ChannelUpdate_get_contents(this.ptr);
		UnsignedChannelUpdate ret_hu_conv = new UnsignedChannelUpdate(null, ret);
		return ret_hu_conv;
	}

	public void set_contents(UnsignedChannelUpdate val) {
		bindings.ChannelUpdate_set_contents(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static ChannelUpdate constructor_new(byte[] signature_arg, UnsignedChannelUpdate contents_arg) {
		long ret = bindings.ChannelUpdate_new(signature_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1);
		ChannelUpdate ret_hu_conv = new ChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(contents_arg);
		return ret_hu_conv;
	}

	public byte[] write(ChannelUpdate obj) {
		byte[] ret = bindings.ChannelUpdate_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static ChannelUpdate constructor_read(byte[] ser) {
		long ret = bindings.ChannelUpdate_read(ser);
		ChannelUpdate ret_hu_conv = new ChannelUpdate(null, ret);
		return ret_hu_conv;
	}

}
