
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class COption_CVec_NetAddressZZ extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.COption_CVec_NetAddressZZ_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): COption_CVec_NetAddressZZ {
		const raw_val: bindings.LDKCOption_CVec_NetAddressZZ = bindings.LDKCOption_CVec_NetAddressZZ_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKCOption_CVec_NetAddressZZ.Some) {
			return new Some(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKCOption_CVec_NetAddressZZ.None) {
			return new None(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Some extends COption_CVec_NetAddressZZ {
	public some: NetAddress[];
	private constructor(ptr: number, obj: bindings.LDKCOption_CVec_NetAddressZZ.Some) {
		super(null, ptr);
		const some: number[] = obj.some;
		NetAddress[] some_conv_12_arr = new NetAddress[some.length];
			for (int m = 0; m < some.length; m++) {
				number some_conv_12 = some[m];
				NetAddress some_conv_12_hu_conv = NetAddress.constr_from_ptr(some_conv_12);
				some_conv_12_hu_conv.ptrs_to.add(this);
				some_conv_12_arr[m] = some_conv_12_hu_conv;
			}
		this.some = some_conv_12_arr;
	}
}
export class None extends COption_CVec_NetAddressZZ {
	private constructor(ptr: number, obj: bindings.LDKCOption_CVec_NetAddressZZ.None) {
		super(null, ptr);
	}
}
	public static Option_CVec_NetAddressZZ constructor_some(NetAddress[] o) {
		number ret = bindings.COption_CVec_NetAddressZZ_some(o != null ? Arrays.stream(o).map(o_conv_12 -> o_conv_12.ptr).toArray(number[]::new) : null);
		Option_CVec_NetAddressZZ ret_hu_conv = Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Option_CVec_NetAddressZZ constructor_none() {
		number ret = bindings.COption_CVec_NetAddressZZ_none();
		Option_CVec_NetAddressZZ ret_hu_conv = Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.COption_CVec_NetAddressZZ_clone_ptr(this.ptr);
		return ret;
	}

	public Option_CVec_NetAddressZZ clone() {
		number ret = bindings.COption_CVec_NetAddressZZ_clone(this.ptr);
		Option_CVec_NetAddressZZ ret_hu_conv = Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
