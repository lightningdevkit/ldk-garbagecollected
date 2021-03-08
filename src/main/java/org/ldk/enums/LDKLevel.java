package org.ldk.enums;

/**
 * An enum representing the available verbosity levels of the logger.
 */
public enum LDKLevel {
	LDKLevel_Off,
	LDKLevel_Error,
	LDKLevel_Warn,
	LDKLevel_Info,
	LDKLevel_Debug,
	LDKLevel_Trace,
	; static native void init();
	static { init(); }
}