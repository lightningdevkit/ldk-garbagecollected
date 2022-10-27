package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * The contents of a custom onion message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CustomOnionMessageContents extends CommonBase {
	final bindings.LDKCustomOnionMessageContents bindings_instance;
	CustomOnionMessageContents(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private CustomOnionMessageContents(bindings.LDKCustomOnionMessageContents arg) {
		super(bindings.LDKCustomOnionMessageContents_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CustomOnionMessageContents_free(ptr); } super.finalize();
	}

	public static interface CustomOnionMessageContentsInterface {
		/**
		 * Returns the TLV type identifying the message contents. MUST be >= 64.
		 */
		long tlv_type();
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private static class LDKCustomOnionMessageContentsHolder { CustomOnionMessageContents held; }
	public static CustomOnionMessageContents new_impl(CustomOnionMessageContentsInterface arg) {
		final LDKCustomOnionMessageContentsHolder impl_holder = new LDKCustomOnionMessageContentsHolder();
		impl_holder.held = new CustomOnionMessageContents(new bindings.LDKCustomOnionMessageContents() {
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
		});
		return impl_holder.held;
	}
	/**
	 * Returns the TLV type identifying the message contents. MUST be >= 64.
	 */
	public long tlv_type() {
		long ret = bindings.CustomOnionMessageContents_tlv_type(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.CustomOnionMessageContents_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CustomOnionMessageContents_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of a CustomOnionMessageContents
	 */
	public CustomOnionMessageContents clone() {
		long ret = bindings.CustomOnionMessageContents_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomOnionMessageContents ret_hu_conv = new CustomOnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
