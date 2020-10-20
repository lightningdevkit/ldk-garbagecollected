package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NetAddress extends CommonBase {
	private NetAddress(Object _dummy, long ptr) { super(ptr); }
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
	static NetAddress constr_from_ptr(long ptr) {
		bindings.LDKNetAddress raw_val = bindings.LDKNetAddress_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKNetAddress.IPv4.class) {
			return new IPv4(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKNetAddress.IPv6.class) {
			return new IPv6(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKNetAddress.OnionV2.class) {
			return new OnionV2(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKNetAddress.OnionV3.class) {
			return new OnionV3(null, ptr);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class IPv4 extends NetAddress {
		public byte[] addr;
		public short port;
		private IPv4(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class IPv6 extends NetAddress {
		public byte[] addr;
		public short port;
		private IPv6(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class OnionV2 extends NetAddress {
		public byte[] addr;
		public short port;
		private OnionV2(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class OnionV3 extends NetAddress {
		public byte[] ed25519_pubkey;
		public short checksum;
		public byte version;
		public short port;
		private OnionV3(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}
