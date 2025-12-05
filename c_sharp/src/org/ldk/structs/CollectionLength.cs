using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The lightning protocol uses u16s for lengths in most cases. As our serialization framework
 * primarily targets that, we must as well. However, because we may serialize objects that have
 * more than 65K entries, we need to be able to store larger values. Thus, we define a variable
 * length integer here that is backwards-compatible for values < 0xffff. We treat 0xffff as
 * \"read eight more bytes\".
 * 
 * To ensure we only have one valid encoding per value, we add 0xffff to values written as eight
 * bytes. Thus, 0xfffe is serialized as 0xfffe, whereas 0xffff is serialized as
 * 0xffff0000000000000000 (i.e. read-eight-bytes then zero).
 */
public class CollectionLength : CommonBase {
	internal CollectionLength(object _dummy, long ptr) : base(ptr) { }
	~CollectionLength() {
		if (ptr != 0) { bindings.CollectionLength_free(ptr); }
	}

	public long get_a() {
		long ret = bindings.CollectionLength_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public void set_a(long val) {
		bindings.CollectionLength_set_a(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new CollectionLength given each field
	 */
	public static org.ldk.structs.CollectionLength of(long a_arg) {
		long ret = bindings.CollectionLength_new(a_arg);
		GC.KeepAlive(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CollectionLength ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CollectionLength(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the CollectionLength object into a byte array which can be read by CollectionLength_read
	 */
	public byte[] write() {
		long ret = bindings.CollectionLength_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a CollectionLength from a byte array, created by CollectionLength_write
	 */
	public static org.ldk.structs.Result_CollectionLengthDecodeErrorZ read(byte[] ser) {
		long ret = bindings.CollectionLength_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CollectionLengthDecodeErrorZ ret_hu_conv = Result_CollectionLengthDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
