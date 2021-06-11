
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class NetAddress extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.NetAddress_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): NetAddress {
		const raw_val: bindings.LDKNetAddress = bindings.LDKNetAddress_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKNetAddress.IPv4) {
			return new IPv4(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKNetAddress.IPv6) {
			return new IPv6(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKNetAddress.OnionV2) {
			return new OnionV2(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKNetAddress.OnionV3) {
			return new OnionV3(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class IPv4 extends NetAddress {
	public addr: Uint8Array;
	public port: number;
	private constructor(ptr: number, obj: bindings.LDKNetAddress.IPv4) {
		super(null, ptr);
		this.addr = obj.addr;
		this.port = obj.port;
	}
}
export class IPv6 extends NetAddress {
	public addr: Uint8Array;
	public port: number;
	private constructor(ptr: number, obj: bindings.LDKNetAddress.IPv6) {
		super(null, ptr);
		this.addr = obj.addr;
		this.port = obj.port;
	}
}
export class OnionV2 extends NetAddress {
	public addr: Uint8Array;
	public port: number;
	private constructor(ptr: number, obj: bindings.LDKNetAddress.OnionV2) {
		super(null, ptr);
		this.addr = obj.addr;
		this.port = obj.port;
	}
}
export class OnionV3 extends NetAddress {
	public ed25519_pubkey: Uint8Array;
	public checksum: number;
	public version: number;
	public port: number;
	private constructor(ptr: number, obj: bindings.LDKNetAddress.OnionV3) {
		super(null, ptr);
		this.ed25519_pubkey = obj.ed25519_pubkey;
		this.checksum = obj.checksum;
		this.version = obj.version;
		this.port = obj.port;
	}
}
	public NetAddress clone() {
		number ret = bindings.NetAddress_clone(this.ptr);
		NetAddress ret_hu_conv = NetAddress.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.NetAddress_write(this.ptr);
		return ret;
	}

	public static Result_NetAddressDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.NetAddress_read(ser);
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
