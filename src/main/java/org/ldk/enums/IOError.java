package org.ldk.enums;

/**
 * Represents an IO Error. Note that some information is lost in the conversion from Rust.
 */
public enum IOError {
	LDKIOError_NotFound,
	LDKIOError_PermissionDenied,
	LDKIOError_ConnectionRefused,
	LDKIOError_ConnectionReset,
	LDKIOError_ConnectionAborted,
	LDKIOError_NotConnected,
	LDKIOError_AddrInUse,
	LDKIOError_AddrNotAvailable,
	LDKIOError_BrokenPipe,
	LDKIOError_AlreadyExists,
	LDKIOError_WouldBlock,
	LDKIOError_InvalidInput,
	LDKIOError_InvalidData,
	LDKIOError_TimedOut,
	LDKIOError_WriteZero,
	LDKIOError_Interrupted,
	LDKIOError_Other,
	LDKIOError_UnexpectedEof,
	; static native void init();
	static { init(); }
}