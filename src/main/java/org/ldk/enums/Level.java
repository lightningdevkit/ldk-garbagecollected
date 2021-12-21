package org.ldk.enums;

/**
 * An enum representing the available verbosity levels of the logger.
 */
public enum Level {
	/**
	 * Designates extremely verbose information, including gossip-induced messages
	 */
	LDKLevel_Gossip,
	/**
	 * Designates very low priority, often extremely verbose, information
	 */
	LDKLevel_Trace,
	/**
	 * Designates lower priority information
	 */
	LDKLevel_Debug,
	/**
	 * Designates useful information
	 */
	LDKLevel_Info,
	/**
	 * Designates hazardous situations
	 */
	LDKLevel_Warn,
	/**
	 * Designates very serious errors
	 */
	LDKLevel_Error,
	; static native void init();
	static { init(); }
}