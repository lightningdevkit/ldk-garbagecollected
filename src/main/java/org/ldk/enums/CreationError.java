package org.ldk.enums;

/**
 * Errors that may occur when constructing a new `RawInvoice` or `Invoice`
 */
public enum CreationError {
	/**
	 * The supplied description string was longer than 639 __bytes__ (see [`Description::new(...)`](./struct.Description.html#method.new))
	 */
	LDKCreationError_DescriptionTooLong,
	/**
	 * The specified route has too many hops and can't be encoded
	 */
	LDKCreationError_RouteTooLong,
	/**
	 * The unix timestamp of the supplied date is <0 or can't be represented as `SystemTime`
	 */
	LDKCreationError_TimestampOutOfBounds,
	/**
	 * The supplied expiry time could cause an overflow if added to a `PositiveTimestamp`
	 */
	LDKCreationError_ExpiryTimeOutOfBounds,
	/**
	 * The supplied millisatoshi amount was greater than the total bitcoin supply.
	 */
	LDKCreationError_InvalidAmount,
	; static native void init();
	static { init(); }
}