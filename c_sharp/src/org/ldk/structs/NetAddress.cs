using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An address which can be used to connect to a remote peer
 */
public class NetAddress : CommonBase {
	protected NetAddress(object _dummy, long ptr) : base(ptr) { }
	~NetAddress() {
		if (ptr != 0) { bindings.NetAddress_free(ptr); }
	}

	internal static NetAddress constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKNetAddress_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new NetAddress_IPv4(ptr);
			case 1: return new NetAddress_IPv6(ptr);
			case 2: return new NetAddress_OnionV2(ptr);
			case 3: return new NetAddress_OnionV3(ptr);
			case 4: return new NetAddress_Hostname(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A NetAddress of type IPv4 */
	public class NetAddress_IPv4 : NetAddress {
		/**
		 * The 4-byte IPv4 address
		 */
		public byte[] addr;
		/**
		 * The port on which the node is listening
		 */
		public short port;
		internal NetAddress_IPv4(long ptr) : base(null, ptr) {
			this.addr = bindings.LDKNetAddress_IPv4_get_addr(ptr);
			this.port = bindings.LDKNetAddress_IPv4_get_port(ptr);
		}
	}
	/** A NetAddress of type IPv6 */
	public class NetAddress_IPv6 : NetAddress {
		/**
		 * The 16-byte IPv6 address
		 */
		public byte[] addr;
		/**
		 * The port on which the node is listening
		 */
		public short port;
		internal NetAddress_IPv6(long ptr) : base(null, ptr) {
			this.addr = bindings.LDKNetAddress_IPv6_get_addr(ptr);
			this.port = bindings.LDKNetAddress_IPv6_get_port(ptr);
		}
	}
	/** A NetAddress of type OnionV2 */
	public class NetAddress_OnionV2 : NetAddress {
		public byte[] onion_v2;
		internal NetAddress_OnionV2(long ptr) : base(null, ptr) {
			this.onion_v2 = bindings.LDKNetAddress_OnionV2_get_onion_v2(ptr);
		}
	}
	/** A NetAddress of type OnionV3 */
	public class NetAddress_OnionV3 : NetAddress {
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
		internal NetAddress_OnionV3(long ptr) : base(null, ptr) {
			this.ed25519_pubkey = bindings.LDKNetAddress_OnionV3_get_ed25519_pubkey(ptr);
			this.checksum = bindings.LDKNetAddress_OnionV3_get_checksum(ptr);
			this.version = bindings.LDKNetAddress_OnionV3_get_version(ptr);
			this.port = bindings.LDKNetAddress_OnionV3_get_port(ptr);
		}
	}
	/** A NetAddress of type Hostname */
	public class NetAddress_Hostname : NetAddress {
		/**
		 * The hostname on which the node is listening.
		 */
		public Hostname hostname;
		/**
		 * The port on which the node is listening.
		 */
		public short port;
		internal NetAddress_Hostname(long ptr) : base(null, ptr) {
			long hostname = bindings.LDKNetAddress_Hostname_get_hostname(ptr);
			org.ldk.structs.Hostname hostname_hu_conv = null; if (hostname < 0 || hostname > 4096) { hostname_hu_conv = new org.ldk.structs.Hostname(null, hostname); }
			if (hostname_hu_conv != null) { hostname_hu_conv.ptrs_to.AddLast(this); };
			this.hostname = hostname_hu_conv;
			this.port = bindings.LDKNetAddress_Hostname_get_port(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.NetAddress_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the NetAddress
	 */
	public NetAddress clone() {
		long ret = bindings.NetAddress_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetAddress ret_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IPv4-variant NetAddress
	 */
	public static NetAddress ipv4(byte[] addr, short port) {
		long ret = bindings.NetAddress_ipv4(InternalUtils.check_arr_len(addr, 4), port);
		GC.KeepAlive(addr);
		GC.KeepAlive(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetAddress ret_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IPv6-variant NetAddress
	 */
	public static NetAddress ipv6(byte[] addr, short port) {
		long ret = bindings.NetAddress_ipv6(InternalUtils.check_arr_len(addr, 16), port);
		GC.KeepAlive(addr);
		GC.KeepAlive(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetAddress ret_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionV2-variant NetAddress
	 */
	public static NetAddress onion_v2(byte[] a) {
		long ret = bindings.NetAddress_onion_v2(InternalUtils.check_arr_len(a, 12));
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetAddress ret_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionV3-variant NetAddress
	 */
	public static NetAddress onion_v3(byte[] ed25519_pubkey, short checksum, byte version, short port) {
		long ret = bindings.NetAddress_onion_v3(InternalUtils.check_arr_len(ed25519_pubkey, 32), checksum, version, port);
		GC.KeepAlive(ed25519_pubkey);
		GC.KeepAlive(checksum);
		GC.KeepAlive(version);
		GC.KeepAlive(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetAddress ret_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Hostname-variant NetAddress
	 */
	public static NetAddress hostname(org.ldk.structs.Hostname hostname, short port) {
		long ret = bindings.NetAddress_hostname(hostname == null ? 0 : hostname.ptr, port);
		GC.KeepAlive(hostname);
		GC.KeepAlive(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetAddress ret_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(hostname); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two NetAddresss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.NetAddress b) {
		bool ret = bindings.NetAddress_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is NetAddress)) return false;
		return this.eq((NetAddress)o);
	}
	/**
	 * Serialize the NetAddress object into a byte array which can be read by NetAddress_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NetAddress_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a NetAddress from a byte array, created by NetAddress_write
	 */
	public static Result_NetAddressDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NetAddress_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
