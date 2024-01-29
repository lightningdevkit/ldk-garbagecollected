using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An address which can be used to connect to a remote peer.
 */
public class SocketAddress : CommonBase {
	protected SocketAddress(object _dummy, long ptr) : base(ptr) { }
	~SocketAddress() {
		if (ptr != 0) { bindings.SocketAddress_free(ptr); }
	}

	internal static SocketAddress constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKSocketAddress_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SocketAddress_TcpIpV4(ptr);
			case 1: return new SocketAddress_TcpIpV6(ptr);
			case 2: return new SocketAddress_OnionV2(ptr);
			case 3: return new SocketAddress_OnionV3(ptr);
			case 4: return new SocketAddress_Hostname(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A SocketAddress of type TcpIpV4 */
	public class SocketAddress_TcpIpV4 : SocketAddress {
		/**
		 * The 4-byte IPv4 address
		 */
		public byte[] addr;
		/**
		 * The port on which the node is listening
		 */
		public short port;
		internal SocketAddress_TcpIpV4(long ptr) : base(null, ptr) {
			long addr = bindings.LDKSocketAddress_TcpIpV4_get_addr(ptr);
			byte[] addr_conv = InternalUtils.decodeUint8Array(addr);
			this.addr = addr_conv;
			this.port = bindings.LDKSocketAddress_TcpIpV4_get_port(ptr);
		}
	}
	/** A SocketAddress of type TcpIpV6 */
	public class SocketAddress_TcpIpV6 : SocketAddress {
		/**
		 * The 16-byte IPv6 address
		 */
		public byte[] addr;
		/**
		 * The port on which the node is listening
		 */
		public short port;
		internal SocketAddress_TcpIpV6(long ptr) : base(null, ptr) {
			long addr = bindings.LDKSocketAddress_TcpIpV6_get_addr(ptr);
			byte[] addr_conv = InternalUtils.decodeUint8Array(addr);
			this.addr = addr_conv;
			this.port = bindings.LDKSocketAddress_TcpIpV6_get_port(ptr);
		}
	}
	/** A SocketAddress of type OnionV2 */
	public class SocketAddress_OnionV2 : SocketAddress {
		public byte[] onion_v2;
		internal SocketAddress_OnionV2(long ptr) : base(null, ptr) {
			long onion_v2 = bindings.LDKSocketAddress_OnionV2_get_onion_v2(ptr);
			byte[] onion_v2_conv = InternalUtils.decodeUint8Array(onion_v2);
			this.onion_v2 = onion_v2_conv;
		}
	}
	/** A SocketAddress of type OnionV3 */
	public class SocketAddress_OnionV3 : SocketAddress {
		/**
		 * The ed25519 long-term public key of the peer
		 */
		public byte[] ed25519_pubkey;
		/**
		 * The checksum of the pubkey and version, as included in the onion address
		 */
		public short checksum;
		/**
		 * The version byte, as defined by the Tor Onion v3 spec.
		 */
		public byte version;
		/**
		 * The port on which the node is listening
		 */
		public short port;
		internal SocketAddress_OnionV3(long ptr) : base(null, ptr) {
			long ed25519_pubkey = bindings.LDKSocketAddress_OnionV3_get_ed25519_pubkey(ptr);
			byte[] ed25519_pubkey_conv = InternalUtils.decodeUint8Array(ed25519_pubkey);
			this.ed25519_pubkey = ed25519_pubkey_conv;
			this.checksum = bindings.LDKSocketAddress_OnionV3_get_checksum(ptr);
			this.version = bindings.LDKSocketAddress_OnionV3_get_version(ptr);
			this.port = bindings.LDKSocketAddress_OnionV3_get_port(ptr);
		}
	}
	/** A SocketAddress of type Hostname */
	public class SocketAddress_Hostname : SocketAddress {
		/**
		 * The hostname on which the node is listening.
		 */
		public Hostname hostname;
		/**
		 * The port on which the node is listening.
		 */
		public short port;
		internal SocketAddress_Hostname(long ptr) : base(null, ptr) {
			long hostname = bindings.LDKSocketAddress_Hostname_get_hostname(ptr);
			org.ldk.structs.Hostname hostname_hu_conv = null; if (hostname < 0 || hostname > 4096) { hostname_hu_conv = new org.ldk.structs.Hostname(null, hostname); }
			if (hostname_hu_conv != null) { hostname_hu_conv.ptrs_to.AddLast(this); };
			this.hostname = hostname_hu_conv;
			this.port = bindings.LDKSocketAddress_Hostname_get_port(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.SocketAddress_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the SocketAddress
	 */
	public SocketAddress clone() {
		long ret = bindings.SocketAddress_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TcpIpV4-variant SocketAddress
	 */
	public static SocketAddress tcp_ip_v4(byte[] addr, short port) {
		long ret = bindings.SocketAddress_tcp_ip_v4(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(addr, 4)), port);
		GC.KeepAlive(addr);
		GC.KeepAlive(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TcpIpV6-variant SocketAddress
	 */
	public static SocketAddress tcp_ip_v6(byte[] addr, short port) {
		long ret = bindings.SocketAddress_tcp_ip_v6(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(addr, 16)), port);
		GC.KeepAlive(addr);
		GC.KeepAlive(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionV2-variant SocketAddress
	 */
	public static SocketAddress onion_v2(byte[] a) {
		long ret = bindings.SocketAddress_onion_v2(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 12)));
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionV3-variant SocketAddress
	 */
	public static SocketAddress onion_v3(byte[] ed25519_pubkey, short checksum, byte version, short port) {
		long ret = bindings.SocketAddress_onion_v3(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(ed25519_pubkey, 32)), checksum, version, port);
		GC.KeepAlive(ed25519_pubkey);
		GC.KeepAlive(checksum);
		GC.KeepAlive(version);
		GC.KeepAlive(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Hostname-variant SocketAddress
	 */
	public static SocketAddress hostname(org.ldk.structs.Hostname hostname, short port) {
		long ret = bindings.SocketAddress_hostname(hostname == null ? 0 : hostname.ptr, port);
		GC.KeepAlive(hostname);
		GC.KeepAlive(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SocketAddress ret_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(hostname); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the SocketAddress.
	 */
	public long hash() {
		long ret = bindings.SocketAddress_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two SocketAddresss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.SocketAddress b) {
		bool ret = bindings.SocketAddress_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is SocketAddress)) return false;
		return this.eq((SocketAddress)o);
	}
	/**
	 * Serialize the SocketAddress object into a byte array which can be read by SocketAddress_read
	 */
	public byte[] write() {
		long ret = bindings.SocketAddress_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a SocketAddress from a byte array, created by SocketAddress_write
	 */
	public static Result_SocketAddressDecodeErrorZ read(byte[] ser) {
		long ret = bindings.SocketAddress_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressDecodeErrorZ ret_hu_conv = Result_SocketAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a SocketAddress object
	 */
	public string to_str() {
		long ret = bindings.SocketAddress_to_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Read a SocketAddress object from a string
	 */
	public static Result_SocketAddressSocketAddressParseErrorZ from_str(string s) {
		long ret = bindings.SocketAddress_from_str(InternalUtils.encodeString(s));
		GC.KeepAlive(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressSocketAddressParseErrorZ ret_hu_conv = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
