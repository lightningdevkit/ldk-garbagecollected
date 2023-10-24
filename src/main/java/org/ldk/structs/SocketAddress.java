package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An address which can be used to connect to a remote peer.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SocketAddress extends CommonBase {
	private SocketAddress(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.SocketAddress_free(ptr); }
	}
	static SocketAddress constr_from_ptr(long ptr) {
		bindings.LDKSocketAddress raw_val = bindings.LDKSocketAddress_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKSocketAddress.TcpIpV4.class) {
			return new TcpIpV4(ptr, (bindings.LDKSocketAddress.TcpIpV4)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSocketAddress.TcpIpV6.class) {
			return new TcpIpV6(ptr, (bindings.LDKSocketAddress.TcpIpV6)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSocketAddress.OnionV2.class) {
			return new OnionV2(ptr, (bindings.LDKSocketAddress.OnionV2)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSocketAddress.OnionV3.class) {
			return new OnionV3(ptr, (bindings.LDKSocketAddress.OnionV3)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSocketAddress.Hostname.class) {
			return new Hostname(ptr, (bindings.LDKSocketAddress.Hostname)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * An IPv4 address and port on which the peer is listening.
	 */
	public final static class TcpIpV4 extends SocketAddress {
		/**
		 * The 4-byte IPv4 address
		*/
		public final byte[] addr;
		/**
		 * The port on which the node is listening
		*/
		public final short port;
		private TcpIpV4(long ptr, bindings.LDKSocketAddress.TcpIpV4 obj) {
			super(null, ptr);
			this.addr = obj.addr;
			this.port = obj.port;
		}
	}
	/**
	 * An IPv6 address and port on which the peer is listening.
	 */
	public final static class TcpIpV6 extends SocketAddress {
		/**
		 * The 16-byte IPv6 address
		*/
		public final byte[] addr;
		/**
		 * The port on which the node is listening
		*/
		public final short port;
		private TcpIpV6(long ptr, bindings.LDKSocketAddress.TcpIpV6 obj) {
			super(null, ptr);
			this.addr = obj.addr;
			this.port = obj.port;
		}
	}
	/**
	 * An old-style Tor onion address/port on which the peer is listening.
	 * 
	 * This field is deprecated and the Tor network generally no longer supports V2 Onion
	 * addresses. Thus, the details are not parsed here.
	 */
	public final static class OnionV2 extends SocketAddress {
		public final byte[] onion_v2;
		private OnionV2(long ptr, bindings.LDKSocketAddress.OnionV2 obj) {
			super(null, ptr);
			this.onion_v2 = obj.onion_v2;
		}
	}
	/**
	 * A new-style Tor onion address/port on which the peer is listening.
	 * 
	 * To create the human-readable \"hostname\", concatenate the ED25519 pubkey, checksum, and version,
	 * wrap as base32 and append \".onion\".
	 */
	public final static class OnionV3 extends SocketAddress {
		/**
		 * The ed25519 long-term public key of the peer
		*/
		public final byte[] ed25519_pubkey;
		/**
		 * The checksum of the pubkey and version, as included in the onion address
		*/
		public final short checksum;
		/**
		 * The version byte, as defined by the Tor Onion v3 spec.
		*/
		public final byte version;
		/**
		 * The port on which the node is listening
		*/
		public final short port;
		private OnionV3(long ptr, bindings.LDKSocketAddress.OnionV3 obj) {
			super(null, ptr);
			this.ed25519_pubkey = obj.ed25519_pubkey;
			this.checksum = obj.checksum;
			this.version = obj.version;
			this.port = obj.port;
		}
	}
	/**
	 * A hostname/port on which the peer is listening.
	 */
	public final static class Hostname extends SocketAddress {
		/**
		 * The hostname on which the node is listening.
		*/
		public final org.ldk.structs.Hostname hostname;
		/**
		 * The port on which the node is listening.
		*/
		public final short port;
		private Hostname(long ptr, bindings.LDKSocketAddress.Hostname obj) {
			super(null, ptr);
			long hostname = obj.hostname;
			org.ldk.structs.Hostname hostname_hu_conv = null; if (hostname < 0 || hostname > 4096) { hostname_hu_conv = new org.ldk.structs.Hostname(null, hostname); }
			if (hostname_hu_conv != null) { hostname_hu_conv.ptrs_to.add(this); };
			this.hostname = hostname_hu_conv;
			this.port = obj.port;
		}
	}
	long clone_ptr() {
		long ret = bindings.SocketAddress_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the SocketAddress
	 */
	public SocketAddress clone() {
		long ret = bindings.SocketAddress_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TcpIpV4-variant SocketAddress
	 */
	public static SocketAddress tcp_ip_v4(byte[] addr, short port) {
		long ret = bindings.SocketAddress_tcp_ip_v4(InternalUtils.check_arr_len(addr, 4), port);
		Reference.reachabilityFence(addr);
		Reference.reachabilityFence(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TcpIpV6-variant SocketAddress
	 */
	public static SocketAddress tcp_ip_v6(byte[] addr, short port) {
		long ret = bindings.SocketAddress_tcp_ip_v6(InternalUtils.check_arr_len(addr, 16), port);
		Reference.reachabilityFence(addr);
		Reference.reachabilityFence(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionV2-variant SocketAddress
	 */
	public static SocketAddress onion_v2(byte[] a) {
		long ret = bindings.SocketAddress_onion_v2(InternalUtils.check_arr_len(a, 12));
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionV3-variant SocketAddress
	 */
	public static SocketAddress onion_v3(byte[] ed25519_pubkey, short checksum, byte version, short port) {
		long ret = bindings.SocketAddress_onion_v3(InternalUtils.check_arr_len(ed25519_pubkey, 32), checksum, version, port);
		Reference.reachabilityFence(ed25519_pubkey);
		Reference.reachabilityFence(checksum);
		Reference.reachabilityFence(version);
		Reference.reachabilityFence(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Hostname-variant SocketAddress
	 */
	public static SocketAddress hostname(org.ldk.structs.Hostname hostname, short port) {
		long ret = bindings.SocketAddress_hostname(hostname == null ? 0 : hostname.ptr, port);
		Reference.reachabilityFence(hostname);
		Reference.reachabilityFence(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(hostname); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SocketAddresss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.SocketAddress b) {
		boolean ret = bindings.SocketAddress_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof SocketAddress)) return false;
		return this.eq((SocketAddress)o);
	}
	/**
	 * Serialize the SocketAddress object into a byte array which can be read by SocketAddress_read
	 */
	public byte[] write() {
		byte[] ret = bindings.SocketAddress_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a SocketAddress from a byte array, created by SocketAddress_write
	 */
	public static Result_SocketAddressDecodeErrorZ read(byte[] ser) {
		long ret = bindings.SocketAddress_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressDecodeErrorZ ret_hu_conv = Result_SocketAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a SocketAddress object
	 */
	public String to_str() {
		String ret = bindings.SocketAddress_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a SocketAddress object from a string
	 */
	public static Result_SocketAddressSocketAddressParseErrorZ from_str(java.lang.String s) {
		long ret = bindings.SocketAddress_from_str(s);
		Reference.reachabilityFence(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressSocketAddressParseErrorZ ret_hu_conv = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
