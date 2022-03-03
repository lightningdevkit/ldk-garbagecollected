package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * Trait to be implemented by custom message (unrelated to the channel/gossip LN layers)
 * decoders.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CustomMessageReader extends CommonBase {
	final bindings.LDKCustomMessageReader bindings_instance;
	CustomMessageReader(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private CustomMessageReader(bindings.LDKCustomMessageReader arg) {
		super(bindings.LDKCustomMessageReader_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CustomMessageReader_free(ptr); } super.finalize();
	}

	public static interface CustomMessageReaderInterface {
		/**
		 * Decodes a custom message to `CustomMessageType`. If the given message type is known to the
		 * implementation and the message could be decoded, must return `Ok(Some(message))`. If the
		 * message type is unknown to the implementation, must return `Ok(None)`. If a decoding error
		 * occur, must return `Err(DecodeError::X)` where `X` details the encountered error.
		 */
		Result_COption_TypeZDecodeErrorZ read(short message_type, byte[] buffer);
	}
	private static class LDKCustomMessageReaderHolder { CustomMessageReader held; }
	public static CustomMessageReader new_impl(CustomMessageReaderInterface arg) {
		final LDKCustomMessageReaderHolder impl_holder = new LDKCustomMessageReaderHolder();
		impl_holder.held = new CustomMessageReader(new bindings.LDKCustomMessageReader() {
			@Override public long read(short message_type, byte[] buffer) {
				Result_COption_TypeZDecodeErrorZ ret = arg.read(message_type, buffer);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Decodes a custom message to `CustomMessageType`. If the given message type is known to the
	 * implementation and the message could be decoded, must return `Ok(Some(message))`. If the
	 * message type is unknown to the implementation, must return `Ok(None)`. If a decoding error
	 * occur, must return `Err(DecodeError::X)` where `X` details the encountered error.
	 */
	public Result_COption_TypeZDecodeErrorZ read(short message_type, byte[] buffer) {
		long ret = bindings.CustomMessageReader_read(this.ptr, message_type, buffer);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message_type);
		Reference.reachabilityFence(buffer);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_TypeZDecodeErrorZ ret_hu_conv = Result_COption_TypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
