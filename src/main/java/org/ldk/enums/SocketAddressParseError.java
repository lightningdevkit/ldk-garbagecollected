package org.ldk.enums;

/**
 * [`SocketAddress`] error variants
 */
public enum SocketAddressParseError {
	/**
	 * Socket address (IPv4/IPv6) parsing error
	 */
	LDKSocketAddressParseError_SocketAddrParse,
	/**
	 * Invalid input format
	 */
	LDKSocketAddressParseError_InvalidInput,
	/**
	 * Invalid port
	 */
	LDKSocketAddressParseError_InvalidPort,
	/**
	 * Invalid onion v3 address
	 */
	LDKSocketAddressParseError_InvalidOnionV3,
	; static native void init();
	static { init(); }
}