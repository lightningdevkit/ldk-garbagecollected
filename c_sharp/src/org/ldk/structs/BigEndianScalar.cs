using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class BigEndianScalar : CommonBase {
	/** The bytes of the scalar value, in big endian */
	public readonly byte[] scalar_bytes;

    internal BigEndianScalar(object _dummy, long ptr) : base(ptr) {
		this.scalar_bytes = bindings.BigEndianScalar_get_bytes(ptr);
	}
    public BigEndianScalar(byte[] scalar_bytes) : base(bindings.BigEndianScalar_new(scalar_bytes)) {
		this.scalar_bytes = bindings.BigEndianScalar_get_bytes(ptr);
	}

	~BigEndianScalar() {
		if (ptr != 0) { bindings.BigEndianScalar_free(ptr); }
	}
}} } }
