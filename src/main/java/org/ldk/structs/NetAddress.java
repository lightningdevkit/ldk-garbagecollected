package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * An address which can be used to connect to a remote peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NetAddress extends CommonBase {
	private NetAddress(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NetAddress_free(ptr); }
	}
	static NetAddress constr_from_ptr(long ptr) {
		bindings.LDKNetAddress raw_val = bindings.LDKNetAddress_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKNetAddress.IPv4.class) {
			return new IPv4(ptr, (bindings.LDKNetAddress.IPv4)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKNetAddress.IPv6.class) {
			return new IPv6(ptr, (bindings.LDKNetAddress.IPv6)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKNetAddress.OnionV2.class) {
			return new OnionV2(ptr, (bindings.LDKNetAddress.OnionV2)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKNetAddress.OnionV3.class) {
			return new OnionV3(ptr, (bindings.LDKNetAddress.OnionV3)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class IPv4 extends NetAddress {
		public final byte[] addr;
		public final short port;
		private IPv4(long ptr, bindings.LDKNetAddress.IPv4 obj) {
			super(null, ptr);
			this.addr = obj.addr;
			this.port = obj.port;
		}
	}
	public final static class IPv6 extends NetAddress {
		public final byte[] addr;
		public final short port;
		private IPv6(long ptr, bindings.LDKNetAddress.IPv6 obj) {
			super(null, ptr);
			this.addr = obj.addr;
			this.port = obj.port;
		}
	}
	public final static class OnionV2 extends NetAddress {
		public final byte[] addr;
		public final short port;
		private OnionV2(long ptr, bindings.LDKNetAddress.OnionV2 obj) {
			super(null, ptr);
			this.addr = obj.addr;
			this.port = obj.port;
		}
	}
	public final static class OnionV3 extends NetAddress {
		public final byte[] ed25519_pubkey;
		public final short checksum;
		public final byte version;
		public final short port;
		private OnionV3(long ptr, bindings.LDKNetAddress.OnionV3 obj) {
			super(null, ptr);
			this.ed25519_pubkey = obj.ed25519_pubkey;
			this.checksum = obj.checksum;
			this.version = obj.version;
			this.port = obj.port;
		}
	}
	/**
	 * Creates a copy of the NetAddress
	 */
	public NetAddress clone() {
		long ret = bindings.NetAddress_clone(this.ptr);
		NetAddress ret_hu_conv = NetAddress.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the NetAddress object into a byte array which can be read by NetAddress_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NetAddress_write(this.ptr);
		return ret;
	}

}
