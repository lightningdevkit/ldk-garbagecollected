
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A string that displays only printable characters, replacing control characters with
 * [`core::char::REPLACEMENT_CHARACTER`].
 */
export class PrintableString extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PrintableString_free);
	}

	public get_a(): string {
		const ret: number = bindings.PrintableString_get_a(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	public set_a(val: string): void {
		bindings.PrintableString_set_a(this.ptr, bindings.encodeString(val));
	}

	/**
	 * Constructs a new PrintableString given each field
	 */
	public static constructor_new(a_arg: string): PrintableString {
		const ret: bigint = bindings.PrintableString_new(bindings.encodeString(a_arg));
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a PrintableString object
	 */
	public to_str(): string {
		const ret: number = bindings.PrintableString_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
