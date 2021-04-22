package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Fallback address in case no LN payment is possible
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Fallback extends CommonBase {
	private Fallback(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Fallback_free(ptr); }
	}
	static Fallback constr_from_ptr(long ptr) {
		bindings.LDKFallback raw_val = bindings.LDKFallback_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKFallback.SegWitProgram.class) {
			return new SegWitProgram(ptr, (bindings.LDKFallback.SegWitProgram)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKFallback.PubKeyHash.class) {
			return new PubKeyHash(ptr, (bindings.LDKFallback.PubKeyHash)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKFallback.ScriptHash.class) {
			return new ScriptHash(ptr, (bindings.LDKFallback.ScriptHash)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class SegWitProgram extends Fallback {
		public final UInt5 version;
		public final byte[] program;
		private SegWitProgram(long ptr, bindings.LDKFallback.SegWitProgram obj) {
			super(null, ptr);
			byte version = obj.version;
			UInt5 version_conv = new UInt5(version);
			this.version = version_conv;
			this.program = obj.program;
		}
	}
	public final static class PubKeyHash extends Fallback {
		public final byte[] pub_key_hash;
		private PubKeyHash(long ptr, bindings.LDKFallback.PubKeyHash obj) {
			super(null, ptr);
			this.pub_key_hash = obj.pub_key_hash;
		}
	}
	public final static class ScriptHash extends Fallback {
		public final byte[] script_hash;
		private ScriptHash(long ptr, bindings.LDKFallback.ScriptHash obj) {
			super(null, ptr);
			this.script_hash = obj.script_hash;
		}
	}
	/**
	 * Creates a copy of the Fallback
	 */
	public Fallback clone() {
		long ret = bindings.Fallback_clone(this.ptr);
		Fallback ret_hu_conv = Fallback.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
