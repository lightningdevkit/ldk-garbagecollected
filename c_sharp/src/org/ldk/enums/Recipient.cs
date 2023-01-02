namespace org { namespace ldk { namespace enums {/**
 * Specifies the recipient of an invoice.
 * 
 * This indicates to [`KeysInterface::sign_invoice`] what node secret key should be used to sign
 * the invoice.
 */
public enum Recipient {
	/**
	 * The invoice should be signed with the local node secret key.
	 */
	LDKRecipient_Node,
	/**
	 * The invoice should be signed with the phantom node secret key. This secret key must be the
	 * same for all nodes participating in the [phantom node payment].
	 * 
	 * [phantom node payment]: PhantomKeysManager
	 */
	LDKRecipient_PhantomNode,
}} } }
