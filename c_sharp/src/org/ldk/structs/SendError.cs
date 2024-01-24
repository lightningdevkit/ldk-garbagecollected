using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Errors that may occur when [sending an onion message].
 * 
 * [sending an onion message]: OnionMessenger::send_onion_message
 */
public class SendError : CommonBase {
	protected SendError(object _dummy, long ptr) : base(ptr) { }
	~SendError() {
		if (ptr != 0) { bindings.SendError_free(ptr); }
	}

	internal static SendError constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKSendError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SendError_Secp256k1(ptr);
			case 1: return new SendError_TooBigPacket(ptr);
			case 2: return new SendError_TooFewBlindedHops(ptr);
			case 3: return new SendError_InvalidFirstHop(ptr);
			case 4: return new SendError_PathNotFound(ptr);
			case 5: return new SendError_InvalidMessage(ptr);
			case 6: return new SendError_BufferFull(ptr);
			case 7: return new SendError_GetNodeIdFailed(ptr);
			case 8: return new SendError_BlindedPathAdvanceFailed(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A SendError of type Secp256k1 */
	public class SendError_Secp256k1 : SendError {
		public Secp256k1Error secp256k1;
		internal SendError_Secp256k1(long ptr) : base(null, ptr) {
			this.secp256k1 = bindings.LDKSendError_Secp256k1_get_secp256k1(ptr);
		}
	}
	/** A SendError of type TooBigPacket */
	public class SendError_TooBigPacket : SendError {
		internal SendError_TooBigPacket(long ptr) : base(null, ptr) {
		}
	}
	/** A SendError of type TooFewBlindedHops */
	public class SendError_TooFewBlindedHops : SendError {
		internal SendError_TooFewBlindedHops(long ptr) : base(null, ptr) {
		}
	}
	/** A SendError of type InvalidFirstHop */
	public class SendError_InvalidFirstHop : SendError {
		public byte[] invalid_first_hop;
		internal SendError_InvalidFirstHop(long ptr) : base(null, ptr) {
			long invalid_first_hop = bindings.LDKSendError_InvalidFirstHop_get_invalid_first_hop(ptr);
			byte[] invalid_first_hop_conv = InternalUtils.decodeUint8Array(invalid_first_hop);
			this.invalid_first_hop = invalid_first_hop_conv;
		}
	}
	/** A SendError of type PathNotFound */
	public class SendError_PathNotFound : SendError {
		internal SendError_PathNotFound(long ptr) : base(null, ptr) {
		}
	}
	/** A SendError of type InvalidMessage */
	public class SendError_InvalidMessage : SendError {
		internal SendError_InvalidMessage(long ptr) : base(null, ptr) {
		}
	}
	/** A SendError of type BufferFull */
	public class SendError_BufferFull : SendError {
		internal SendError_BufferFull(long ptr) : base(null, ptr) {
		}
	}
	/** A SendError of type GetNodeIdFailed */
	public class SendError_GetNodeIdFailed : SendError {
		internal SendError_GetNodeIdFailed(long ptr) : base(null, ptr) {
		}
	}
	/** A SendError of type BlindedPathAdvanceFailed */
	public class SendError_BlindedPathAdvanceFailed : SendError {
		internal SendError_BlindedPathAdvanceFailed(long ptr) : base(null, ptr) {
		}
	}
	internal long clone_ptr() {
		long ret = bindings.SendError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the SendError
	 */
	public SendError clone() {
		long ret = bindings.SendError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendError ret_hu_conv = org.ldk.structs.SendError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Secp256k1-variant SendError
	 */
	public static SendError secp256k1(Secp256k1Error a) {
		long ret = bindings.SendError_secp256k1(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendError ret_hu_conv = org.ldk.structs.SendError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TooBigPacket-variant SendError
	 */
	public static SendError too_big_packet() {
		long ret = bindings.SendError_too_big_packet();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendError ret_hu_conv = org.ldk.structs.SendError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TooFewBlindedHops-variant SendError
	 */
	public static SendError too_few_blinded_hops() {
		long ret = bindings.SendError_too_few_blinded_hops();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendError ret_hu_conv = org.ldk.structs.SendError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidFirstHop-variant SendError
	 */
	public static SendError invalid_first_hop(byte[] a) {
		long ret = bindings.SendError_invalid_first_hop(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 33)));
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendError ret_hu_conv = org.ldk.structs.SendError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PathNotFound-variant SendError
	 */
	public static SendError path_not_found() {
		long ret = bindings.SendError_path_not_found();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendError ret_hu_conv = org.ldk.structs.SendError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidMessage-variant SendError
	 */
	public static SendError invalid_message() {
		long ret = bindings.SendError_invalid_message();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendError ret_hu_conv = org.ldk.structs.SendError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BufferFull-variant SendError
	 */
	public static SendError buffer_full() {
		long ret = bindings.SendError_buffer_full();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendError ret_hu_conv = org.ldk.structs.SendError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new GetNodeIdFailed-variant SendError
	 */
	public static SendError get_node_id_failed() {
		long ret = bindings.SendError_get_node_id_failed();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendError ret_hu_conv = org.ldk.structs.SendError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BlindedPathAdvanceFailed-variant SendError
	 */
	public static SendError blinded_path_advance_failed() {
		long ret = bindings.SendError_blinded_path_advance_failed();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendError ret_hu_conv = org.ldk.structs.SendError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SendErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.SendError b) {
		bool ret = bindings.SendError_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is SendError)) return false;
		return this.eq((SendError)o);
	}
}
} } }
