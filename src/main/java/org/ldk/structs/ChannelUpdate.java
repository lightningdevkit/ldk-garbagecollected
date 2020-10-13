package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelUpdate extends CommonBase {
	ChannelUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelUpdate_free(ptr); super.finalize();
	}

	public ChannelUpdate(ChannelUpdate orig) {
		super(bindings.ChannelUpdate_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_signature(ChannelUpdate this_ptr) {
		byte[] ret = bindings.ChannelUpdate_get_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_signature(ChannelUpdate this_ptr, byte[] val) {
		bindings.ChannelUpdate_set_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public UnsignedChannelUpdate get_contents(ChannelUpdate this_ptr) {
		UnsignedChannelUpdate ret = new UnsignedChannelUpdate(null, bindings.ChannelUpdate_get_contents(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_contents(ChannelUpdate this_ptr, UnsignedChannelUpdate val) {
		bindings.ChannelUpdate_set_contents(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public ChannelUpdate(byte[] signature_arg, UnsignedChannelUpdate contents_arg) {
		super(bindings.ChannelUpdate_new(signature_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1));
		this.ptrs_to.add(contents_arg);
	}

	// Skipped ChannelUpdate_write
	public ChannelUpdate(byte[] ser) {
		super(bindings.ChannelUpdate_read(ser));
	}

}
