package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * Defines a type identifier for sending messages over the wire.
 * 
 * Messages implementing this trait specify a type and must be [`Writeable`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Type extends CommonBase {
	final bindings.LDKType bindings_instance;
	Type(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Type(bindings.LDKType arg) {
		super(bindings.LDKType_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Type_free(ptr); } super.finalize();
	}

	public static interface TypeInterface {
		/**
		 * Returns the type identifying the message payload.
		 */
		short type_id();
		/**
		 * Return a human-readable "debug" string describing this object
		 */
		String debug_str();
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private static class LDKTypeHolder { Type held; }
	public static Type new_impl(TypeInterface arg) {
		final LDKTypeHolder impl_holder = new LDKTypeHolder();
		impl_holder.held = new Type(new bindings.LDKType() {
			@Override public short type_id() {
				short ret = arg.type_id();
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public String debug_str() {
				String ret = arg.debug_str();
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public byte[] write() {
				byte[] ret = arg.write();
				Reference.reachabilityFence(arg);
				return ret;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns the type identifying the message payload.
	 */
	public short type_id() {
		short ret = bindings.Type_type_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Return a human-readable "debug" string describing this object
	 */
	public String debug_str() {
		String ret = bindings.Type_debug_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.Type_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.Type_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of a Type
	 */
	public Type clone() {
		long ret = bindings.Type_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Type ret_hu_conv = new Type(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
