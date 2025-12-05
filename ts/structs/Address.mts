
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

export class Address extends CommonBase {
	/** The address in string form */
	public address: string;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Address_free);
		this.address = bindings.decodeString(bindings.Address_to_string(ptr));
	}
	public static constructor_new(address: string): Address|null {
		var strbuf = bindings.encodeString(address);
		var ptr = bindings.Address_new(strbuf);
		bindings.freeWasmMemory(strbuf);
		var res = Option_AddressZ.constr_from_ptr(ptr);
		if (res instanceof Option_AddressZ_Some) {
			return new Address(null, bindings.Address_clone(res.some.ptr));
		} else {
			return null;
		}
	}
}