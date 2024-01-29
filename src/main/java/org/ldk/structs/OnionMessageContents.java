package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * The contents of an onion message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OnionMessageContents extends CommonBase {
	final bindings.LDKOnionMessageContents bindings_instance;
	OnionMessageContents(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private OnionMessageContents(bindings.LDKOnionMessageContents arg) {
		super(bindings.LDKOnionMessageContents_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.OnionMessageContents_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.OnionMessageContents_free(ptr); }
		ptr = 0;
	}
	public static interface OnionMessageContentsInterface {
		/**
		 * Returns the TLV type identifying the message contents. MUST be >= 64.
		 */
		long tlv_type();
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
		/**
		 * Return a human-readable "debug" string describing this object
		 */
		String debug_str();
	}
	private static class LDKOnionMessageContentsHolder { OnionMessageContents held; }
	public static OnionMessageContents new_impl(OnionMessageContentsInterface arg) {
		final LDKOnionMessageContentsHolder impl_holder = new LDKOnionMessageContentsHolder();
		impl_holder.held = new OnionMessageContents(new bindings.LDKOnionMessageContents() {
			@Override public long tlv_type() {
				long ret = arg.tlv_type();
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public byte[] write() {
				byte[] ret = arg.write();
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public String debug_str() {
				String ret = arg.debug_str();
				Reference.reachabilityFence(arg);
				return ret;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns the TLV type identifying the message contents. MUST be >= 64.
	 */
	public long tlv_type() {
		long ret = bindings.OnionMessageContents_tlv_type(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.OnionMessageContents_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Return a human-readable "debug" string describing this object
	 */
	public String debug_str() {
		String ret = bindings.OnionMessageContents_debug_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.OnionMessageContents_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of a OnionMessageContents
	 */
	public OnionMessageContents clone() {
		long ret = bindings.OnionMessageContents_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageContents ret_hu_conv = new OnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
