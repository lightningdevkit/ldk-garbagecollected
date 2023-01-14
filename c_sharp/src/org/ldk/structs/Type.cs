using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Defines a type identifier for sending messages over the wire.
 * 
 * Messages implementing this trait specify a type and must be [`Writeable`].
 */
public class Type : CommonBase {
	internal readonly bindings.LDKType bindings_instance;
	internal Type(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Type(bindings.LDKType arg) : base(bindings.LDKType_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~Type() {
		if (ptr != 0) { bindings.Type_free(ptr); }
	}

	public interface TypeInterface {
		/**
		 * Returns the type identifying the message payload.
		 */
		short type_id();
		/**
		 * Return a human-readable "debug" string describing this object
		 */
		string debug_str();
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
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
		public string debug_str() {
			string ret = arg.debug_str();
				GC.KeepAlive(arg);
			return ret;
		}
		public byte[] write() {
			byte[] ret = arg.write();
				GC.KeepAlive(arg);
			return ret;
		}
	}
	public static Type new_impl(TypeInterface arg) {
		LDKTypeHolder impl_holder = new LDKTypeHolder();
		impl_holder.held = new Type(new LDKTypeImpl(arg, impl_holder));
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
		string ret = bindings.Type_debug_str(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.Type_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
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
