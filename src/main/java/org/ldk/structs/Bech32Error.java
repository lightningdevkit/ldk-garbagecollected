package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Represents an error returned from the bech32 library during validation of some bech32 data
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Bech32Error extends CommonBase {
	private Bech32Error(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bech32Error_free(ptr); }
	}
	static Bech32Error constr_from_ptr(long ptr) {
		bindings.LDKBech32Error raw_val = bindings.LDKBech32Error_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKBech32Error.MissingSeparator.class) {
			return new MissingSeparator(ptr, (bindings.LDKBech32Error.MissingSeparator)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBech32Error.InvalidChecksum.class) {
			return new InvalidChecksum(ptr, (bindings.LDKBech32Error.InvalidChecksum)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBech32Error.InvalidLength.class) {
			return new InvalidLength(ptr, (bindings.LDKBech32Error.InvalidLength)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBech32Error.InvalidChar.class) {
			return new InvalidChar(ptr, (bindings.LDKBech32Error.InvalidChar)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBech32Error.InvalidData.class) {
			return new InvalidData(ptr, (bindings.LDKBech32Error.InvalidData)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBech32Error.InvalidPadding.class) {
			return new InvalidPadding(ptr, (bindings.LDKBech32Error.InvalidPadding)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBech32Error.MixedCase.class) {
			return new MixedCase(ptr, (bindings.LDKBech32Error.MixedCase)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * String does not contain the separator character
	 */
	public final static class MissingSeparator extends Bech32Error {
		private MissingSeparator(long ptr, bindings.LDKBech32Error.MissingSeparator obj) {
			super(null, ptr);
		}
	}
	/**
	 * The checksum does not match the rest of the data
	 */
	public final static class InvalidChecksum extends Bech32Error {
		private InvalidChecksum(long ptr, bindings.LDKBech32Error.InvalidChecksum obj) {
			super(null, ptr);
		}
	}
	/**
	 * The data or human-readable part is too long or too short
	 */
	public final static class InvalidLength extends Bech32Error {
		private InvalidLength(long ptr, bindings.LDKBech32Error.InvalidLength obj) {
			super(null, ptr);
		}
	}
	/**
	 * Some part of the string contains an invalid character
	 */
	public final static class InvalidChar extends Bech32Error {
		public final int invalid_char;
		private InvalidChar(long ptr, bindings.LDKBech32Error.InvalidChar obj) {
			super(null, ptr);
			this.invalid_char = obj.invalid_char;
		}
	}
	/**
	 * Some part of the data has an invalid value
	 */
	public final static class InvalidData extends Bech32Error {
		public final byte invalid_data;
		private InvalidData(long ptr, bindings.LDKBech32Error.InvalidData obj) {
			super(null, ptr);
			this.invalid_data = obj.invalid_data;
		}
	}
	/**
	 * The bit conversion failed due to a padding issue
	 */
	public final static class InvalidPadding extends Bech32Error {
		private InvalidPadding(long ptr, bindings.LDKBech32Error.InvalidPadding obj) {
			super(null, ptr);
		}
	}
	/**
	 * The whole string must be of one case
	 */
	public final static class MixedCase extends Bech32Error {
		private MixedCase(long ptr, bindings.LDKBech32Error.MixedCase obj) {
			super(null, ptr);
		}
	}
	long clone_ptr() {
		long ret = bindings.Bech32Error_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new Bech32Error which has the same data as `orig`
	 */
	public Bech32Error clone() {
		long ret = bindings.Bech32Error_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bech32Error ret_hu_conv = org.ldk.structs.Bech32Error.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
