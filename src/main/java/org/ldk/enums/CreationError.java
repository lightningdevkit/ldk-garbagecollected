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
	 * The Unix timestamp of the supplied date is less than zero or greater than 35-bits
	 */
	LDKCreationError_TimestampOutOfBounds,
	/**
	 * The supplied millisatoshi amount was greater than the total bitcoin supply.
	 */
	LDKCreationError_InvalidAmount,
	/**
	 * Route hints were required for this invoice and were missing. Applies to
	 * [phantom invoices].
	 * 
	 * [phantom invoices]: crate::utils::create_phantom_invoice
	 */
	LDKCreationError_MissingRouteHints,
	; static native void init();
	static { init(); }
}