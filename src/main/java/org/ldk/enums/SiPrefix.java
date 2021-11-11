package org.ldk.enums;

/**
 * SI prefixes for the human readable part
 */
public enum SiPrefix {
	/**
	 * 10^-3
	 */
	LDKSiPrefix_Milli,
	/**
	 * 10^-6
	 */
	LDKSiPrefix_Micro,
	/**
	 * 10^-9
	 */
	LDKSiPrefix_Nano,
	/**
	 * 10^-12
	 */
	LDKSiPrefix_Pico,
	; static native void init();
	static { init(); }
}