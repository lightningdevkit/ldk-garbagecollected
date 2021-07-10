package org.ldk.enums;

/**
 * An enum representing the available verbosity levels of the logger.
 */
public enum Level {
	LDKLevel_Trace,
	LDKLevel_Debug,
	LDKLevel_Info,
	LDKLevel_Warn,
	LDKLevel_Error,
	; static native void init();
	static { init(); }
}