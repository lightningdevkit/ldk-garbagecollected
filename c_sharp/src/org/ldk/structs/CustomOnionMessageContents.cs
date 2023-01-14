using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The contents of a custom onion message.
 */
public class CustomOnionMessageContents : CommonBase {
	internal readonly bindings.LDKCustomOnionMessageContents bindings_instance;
	internal CustomOnionMessageContents(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private CustomOnionMessageContents(bindings.LDKCustomOnionMessageContents arg) : base(bindings.LDKCustomOnionMessageContents_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~CustomOnionMessageContents() {
		if (ptr != 0) { bindings.CustomOnionMessageContents_free(ptr); }
	}

	public interface CustomOnionMessageContentsInterface {
		/**
		 * Returns the TLV type identifying the message contents. MUST be >= 64.
		 */
		long tlv_type();
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private class LDKCustomOnionMessageContentsHolder { internal CustomOnionMessageContents held; }
	private class LDKCustomOnionMessageContentsImpl : bindings.LDKCustomOnionMessageContents {
		internal LDKCustomOnionMessageContentsImpl(CustomOnionMessageContentsInterface arg, LDKCustomOnionMessageContentsHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private CustomOnionMessageContentsInterface arg;
		private LDKCustomOnionMessageContentsHolder impl_holder;
		public long tlv_type() {
			long ret = arg.tlv_type();
				GC.KeepAlive(arg);
			return ret;
		}
		public byte[] write() {
			byte[] ret = arg.write();
				GC.KeepAlive(arg);
			return ret;
		}
	}
	public static CustomOnionMessageContents new_impl(CustomOnionMessageContentsInterface arg) {
		LDKCustomOnionMessageContentsHolder impl_holder = new LDKCustomOnionMessageContentsHolder();
		impl_holder.held = new CustomOnionMessageContents(new LDKCustomOnionMessageContentsImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Returns the TLV type identifying the message contents. MUST be >= 64.
	 */
	public long tlv_type() {
		long ret = bindings.CustomOnionMessageContents_tlv_type(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.CustomOnionMessageContents_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CustomOnionMessageContents_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of a CustomOnionMessageContents
	 */
	public CustomOnionMessageContents clone() {
		long ret = bindings.CustomOnionMessageContents_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomOnionMessageContents ret_hu_conv = new CustomOnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
