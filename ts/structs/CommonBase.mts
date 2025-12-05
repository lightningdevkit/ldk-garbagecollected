
function freer(f: () => void) { f() }
const finalizer = new FinalizationRegistry(freer);
function get_freeer(ptr: bigint, free_fn: (ptr: bigint) => void) {
	return () => {
		free_fn(ptr);
	}
}

export class CommonBase {
	protected ptr: bigint;
	protected ptrs_to: object[] = [];
	protected constructor(ptr: bigint, free_fn: (ptr: bigint) => void) {
		this.ptr = ptr;
		if (ptr != 0n){
			finalizer.register(this, get_freeer(ptr, free_fn), this);
		}
	}
	// In Java, protected means "any subclass can access fields on any other subclass'"
	// In TypeScript, protected means "any subclass can access parent fields on instances of itself"
	// To work around this, we add accessors for other instances' protected fields here.
	protected static add_ref_from(holder: CommonBase|null, referent: object|null) {
		if (holder !== null && referent !== null) { holder.ptrs_to.push(referent); }
	}
	protected static get_ptr_of(o: CommonBase) {
		return o.ptr;
	}
	protected static set_null_skip_free(o: CommonBase) {
		o.ptr = 0n;
		// @ts-ignore TypeScript is wrong about the returnvalue of unregister here!
		const did_unregister: boolean = finalizer.unregister(o);
		if (!did_unregister)
			throw new Error("FinalizationRegistry unregister should always unregister unless you double-free'd");
	}
}

export class UInt5 {
	public constructor(private val: number) {
		if (val > 32 || val < 0) throw new Error("UInt5 value is out of range");
	}
	public getVal(): number {
		return this.val;
	}
}

export class WitnessVersion {
	public constructor(private val: number) {
		if (val > 16 || val < 0) throw new Error("WitnessVersion value is out of range");
	}
	public getVal(): number {
		return this.val;
	}
}

export class UnqualifiedError {
	public constructor(_val: number) {}
}
