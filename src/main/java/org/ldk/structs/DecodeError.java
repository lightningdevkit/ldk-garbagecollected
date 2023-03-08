package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An error in decoding a message or struct.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DecodeError extends CommonBase {
	private DecodeError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DecodeError_free(ptr); }
	}
	static DecodeError constr_from_ptr(long ptr) {
		bindings.LDKDecodeError raw_val = bindings.LDKDecodeError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKDecodeError.UnknownVersion.class) {
			return new UnknownVersion(ptr, (bindings.LDKDecodeError.UnknownVersion)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKDecodeError.UnknownRequiredFeature.class) {
			return new UnknownRequiredFeature(ptr, (bindings.LDKDecodeError.UnknownRequiredFeature)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKDecodeError.InvalidValue.class) {
			return new InvalidValue(ptr, (bindings.LDKDecodeError.InvalidValue)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKDecodeError.ShortRead.class) {
			return new ShortRead(ptr, (bindings.LDKDecodeError.ShortRead)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKDecodeError.BadLengthDescriptor.class) {
			return new BadLengthDescriptor(ptr, (bindings.LDKDecodeError.BadLengthDescriptor)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKDecodeError.Io.class) {
			return new Io(ptr, (bindings.LDKDecodeError.Io)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKDecodeError.UnsupportedCompression.class) {
			return new UnsupportedCompression(ptr, (bindings.LDKDecodeError.UnsupportedCompression)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * A version byte specified something we don't know how to handle.
	 * 
	 * Includes unknown realm byte in an onion hop data packet.
	 */
	public final static class UnknownVersion extends DecodeError {
		private UnknownVersion(long ptr, bindings.LDKDecodeError.UnknownVersion obj) {
			super(null, ptr);
		}
	}
	/**
	 * Unknown feature mandating we fail to parse message (e.g., TLV with an even, unknown type)
	 */
	public final static class UnknownRequiredFeature extends DecodeError {
		private UnknownRequiredFeature(long ptr, bindings.LDKDecodeError.UnknownRequiredFeature obj) {
			super(null, ptr);
		}
	}
	/**
	 * Value was invalid.
	 * 
	 * For example, a byte which was supposed to be a bool was something other than a 0
	 * or 1, a public key/private key/signature was invalid, text wasn't UTF-8, TLV was
	 * syntactically incorrect, etc.
	 */
	public final static class InvalidValue extends DecodeError {
		private InvalidValue(long ptr, bindings.LDKDecodeError.InvalidValue obj) {
			super(null, ptr);
		}
	}
	/**
	 * The buffer to be read was too short.
	 */
	public final static class ShortRead extends DecodeError {
		private ShortRead(long ptr, bindings.LDKDecodeError.ShortRead obj) {
			super(null, ptr);
		}
	}
	/**
	 * A length descriptor in the packet didn't describe the later data correctly.
	 */
	public final static class BadLengthDescriptor extends DecodeError {
		private BadLengthDescriptor(long ptr, bindings.LDKDecodeError.BadLengthDescriptor obj) {
			super(null, ptr);
		}
	}
	/**
	 * Error from [`std::io`].
	 */
	public final static class Io extends DecodeError {
		public final org.ldk.enums.IOError io;
		private Io(long ptr, bindings.LDKDecodeError.Io obj) {
			super(null, ptr);
			this.io = obj.io;
		}
	}
	/**
	 * The message included zlib-compressed values, which we don't support.
	 */
	public final static class UnsupportedCompression extends DecodeError {
		private UnsupportedCompression(long ptr, bindings.LDKDecodeError.UnsupportedCompression obj) {
			super(null, ptr);
		}
	}
	long clone_ptr() {
		long ret = bindings.DecodeError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the DecodeError
	 */
	public DecodeError clone() {
		long ret = bindings.DecodeError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownVersion-variant DecodeError
	 */
	public static DecodeError unknown_version() {
		long ret = bindings.DecodeError_unknown_version();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownRequiredFeature-variant DecodeError
	 */
	public static DecodeError unknown_required_feature() {
		long ret = bindings.DecodeError_unknown_required_feature();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidValue-variant DecodeError
	 */
	public static DecodeError invalid_value() {
		long ret = bindings.DecodeError_invalid_value();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ShortRead-variant DecodeError
	 */
	public static DecodeError short_read() {
		long ret = bindings.DecodeError_short_read();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BadLengthDescriptor-variant DecodeError
	 */
	public static DecodeError bad_length_descriptor() {
		long ret = bindings.DecodeError_bad_length_descriptor();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Io-variant DecodeError
	 */
	public static DecodeError io(org.ldk.enums.IOError a) {
		long ret = bindings.DecodeError_io(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnsupportedCompression-variant DecodeError
	 */
	public static DecodeError unsupported_compression() {
		long ret = bindings.DecodeError_unsupported_compression();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecodeError ret_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two DecodeErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.DecodeError b) {
		boolean ret = bindings.DecodeError_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof DecodeError)) return false;
		return this.eq((DecodeError)o);
	}
}
