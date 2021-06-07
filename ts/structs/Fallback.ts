
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class Fallback extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.Fallback_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): Fallback {
		const raw_val: bindings.LDKFallback = bindings.LDKFallback_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKFallback.SegWitProgram) {
			return new SegWitProgram(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKFallback.PubKeyHash) {
			return new PubKeyHash(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKFallback.ScriptHash) {
			return new ScriptHash(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class SegWitProgram extends Fallback {
	public version: UInt5;
	public program: Uint8Array;
	private constructor(ptr: number, obj: bindings.LDKFallback.SegWitProgram) {
		super(null, ptr);
		const version: number = obj.version;
		UInt5 version_conv = new UInt5(version);
		this.version = version_conv;
		this.program = obj.program;
	}
}
export class PubKeyHash extends Fallback {
	public pub_key_hash: Uint8Array;
	private constructor(ptr: number, obj: bindings.LDKFallback.PubKeyHash) {
		super(null, ptr);
		this.pub_key_hash = obj.pub_key_hash;
	}
}
export class ScriptHash extends Fallback {
	public script_hash: Uint8Array;
	private constructor(ptr: number, obj: bindings.LDKFallback.ScriptHash) {
		super(null, ptr);
		this.script_hash = obj.script_hash;
	}
}
	public Fallback clone() {
		number ret = bindings.Fallback_clone(this.ptr);
		Fallback ret_hu_conv = Fallback.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public boolean eq(Fallback b) {
		boolean ret = bindings.Fallback_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

}
