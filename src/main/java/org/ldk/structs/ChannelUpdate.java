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
		super(bindings.ChannelUpdate_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	// Skipped ChannelUpdate_get_signature
	// Skipped ChannelUpdate_set_signature
	public UnsignedChannelUpdate get_contents(ChannelUpdate this_ptr) {
		UnsignedChannelUpdate ret = new UnsignedChannelUpdate(null, bindings.ChannelUpdate_get_contents(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_contents(ChannelUpdate this_ptr, UnsignedChannelUpdate val) {
		bindings.ChannelUpdate_set_contents(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	// Skipped ChannelUpdate_new
	// Skipped ChannelUpdate_write
	// Skipped ChannelUpdate_read
}
