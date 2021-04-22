package org.ldk.enums;

/**
 * Errors that may occur when constructing a new `RawInvoice` or `Invoice`
 */
public enum LDKCreationError {
	LDKCreationError_DescriptionTooLong,
	LDKCreationError_RouteTooLong,
	LDKCreationError_TimestampOutOfBounds,
	LDKCreationError_ExpiryTimeOutOfBounds,
	; static native void init();
	static { init(); }
}