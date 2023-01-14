using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Trait to be implemented by custom message (unrelated to the channel/gossip LN layers)
 * decoders.
 */
public class CustomMessageReader : CommonBase {
	internal readonly bindings.LDKCustomMessageReader bindings_instance;
	internal CustomMessageReader(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private CustomMessageReader(bindings.LDKCustomMessageReader arg) : base(bindings.LDKCustomMessageReader_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~CustomMessageReader() {
		if (ptr != 0) { bindings.CustomMessageReader_free(ptr); }
	}

	public interface CustomMessageReaderInterface {
		/**
		 * Decodes a custom message to `CustomMessageType`. If the given message type is known to the
		 * implementation and the message could be decoded, must return `Ok(Some(message))`. If the
		 * message type is unknown to the implementation, must return `Ok(None)`. If a decoding error
		 * occur, must return `Err(DecodeError::X)` where `X` details the encountered error.
		 */
		Result_COption_TypeZDecodeErrorZ read(short _message_type, byte[] _buffer);
	}
	private class LDKCustomMessageReaderHolder { internal CustomMessageReader held; }
	private class LDKCustomMessageReaderImpl : bindings.LDKCustomMessageReader {
		internal LDKCustomMessageReaderImpl(CustomMessageReaderInterface arg, LDKCustomMessageReaderHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private CustomMessageReaderInterface arg;
		private LDKCustomMessageReaderHolder impl_holder;
		public long read(short _message_type, byte[] _buffer) {
			Result_COption_TypeZDecodeErrorZ ret = arg.read(_message_type, _buffer);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}
	public static CustomMessageReader new_impl(CustomMessageReaderInterface arg) {
		LDKCustomMessageReaderHolder impl_holder = new LDKCustomMessageReaderHolder();
		impl_holder.held = new CustomMessageReader(new LDKCustomMessageReaderImpl(arg, impl_holder));
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
		GC.KeepAlive(this);
		GC.KeepAlive(message_type);
		GC.KeepAlive(buffer);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_TypeZDecodeErrorZ ret_hu_conv = Result_COption_TypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
