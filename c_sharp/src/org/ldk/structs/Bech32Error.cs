using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Represents an error returned from the bech32 library during validation of some bech32 data
 */
public class Bech32Error : CommonBase {
	protected Bech32Error(object _dummy, long ptr) : base(ptr) { }
	~Bech32Error() {
		if (ptr != 0) { bindings.Bech32Error_free(ptr); }
	}

	internal static Bech32Error constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKBech32Error_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Bech32Error_MissingSeparator(ptr);
			case 1: return new Bech32Error_InvalidChecksum(ptr);
			case 2: return new Bech32Error_InvalidLength(ptr);
			case 3: return new Bech32Error_InvalidChar(ptr);
			case 4: return new Bech32Error_InvalidData(ptr);
			case 5: return new Bech32Error_InvalidPadding(ptr);
			case 6: return new Bech32Error_MixedCase(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Bech32Error of type MissingSeparator */
	public class Bech32Error_MissingSeparator : Bech32Error {
		internal Bech32Error_MissingSeparator(long ptr) : base(null, ptr) {
		}
	}
	/** A Bech32Error of type InvalidChecksum */
	public class Bech32Error_InvalidChecksum : Bech32Error {
		internal Bech32Error_InvalidChecksum(long ptr) : base(null, ptr) {
		}
	}
	/** A Bech32Error of type InvalidLength */
	public class Bech32Error_InvalidLength : Bech32Error {
		internal Bech32Error_InvalidLength(long ptr) : base(null, ptr) {
		}
	}
	/** A Bech32Error of type InvalidChar */
	public class Bech32Error_InvalidChar : Bech32Error {
		public int invalid_char;
		internal Bech32Error_InvalidChar(long ptr) : base(null, ptr) {
			this.invalid_char = bindings.LDKBech32Error_InvalidChar_get_invalid_char(ptr);
		}
	}
	/** A Bech32Error of type InvalidData */
	public class Bech32Error_InvalidData : Bech32Error {
		public byte invalid_data;
		internal Bech32Error_InvalidData(long ptr) : base(null, ptr) {
			this.invalid_data = bindings.LDKBech32Error_InvalidData_get_invalid_data(ptr);
		}
	}
	/** A Bech32Error of type InvalidPadding */
	public class Bech32Error_InvalidPadding : Bech32Error {
		internal Bech32Error_InvalidPadding(long ptr) : base(null, ptr) {
		}
	}
	/** A Bech32Error of type MixedCase */
	public class Bech32Error_MixedCase : Bech32Error {
		internal Bech32Error_MixedCase(long ptr) : base(null, ptr) {
		}
	}
	internal long clone_ptr() {
		long ret = bindings.Bech32Error_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new Bech32Error which has the same data as `orig`
	 */
	public Bech32Error clone() {
		long ret = bindings.Bech32Error_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bech32Error ret_hu_conv = org.ldk.structs.Bech32Error.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
