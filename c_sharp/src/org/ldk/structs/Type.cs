
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of Type */
public interface TypeInterface {
	/**Returns the type identifying the message payload.
	 */
	short type_id();
	/**Return a human-readable "debug" string describing this object
	 */
	string debug_str();
	/**Serialize the object into a byte array
	 */
	byte[] write();
}

/**
 * Defines a type identifier for sending messages over the wire.
 * 
 * Messages implementing this trait specify a type and must be [`Writeable`].
 */
public class Type : CommonBase {
	internal bindings.LDKType bindings_instance;
	internal long instance_idx;

	internal Type(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~Type() {
		if (ptr != 0) { bindings.Type_free(ptr); }
	}

	private class LDKTypeHolder { internal Type held; }
	private class LDKTypeImpl : bindings.LDKType {
		internal LDKTypeImpl(TypeInterface arg, LDKTypeHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private TypeInterface arg;
		private LDKTypeHolder impl_holder;
		public short type_id() {
			short ret = arg.type_id();
				GC.KeepAlive(arg);
			return ret;
		}
		public long debug_str() {
			string ret = arg.debug_str();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeString(ret);
			return result;
		}
		public long write() {
			byte[] ret = arg.write();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint8Array(ret);
			return result;
		}
	}

	/** Creates a new instance of Type from a given implementation */
	public static Type new_impl(TypeInterface arg) {
		LDKTypeHolder impl_holder = new LDKTypeHolder();
		LDKTypeImpl impl = new LDKTypeImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKType_new(impl);

		impl_holder.held = new Type(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Returns the type identifying the message payload.
	 */
	public short type_id() {
		short ret = bindings.Type_type_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Return a human-readable "debug" string describing this object
	 */
	public string debug_str() {
		long ret = bindings.Type_debug_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		long ret = bindings.Type_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Type_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of a Type
	 */
	public Type clone() {
		long ret = bindings.Type_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Type ret_hu_conv = new Type(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
