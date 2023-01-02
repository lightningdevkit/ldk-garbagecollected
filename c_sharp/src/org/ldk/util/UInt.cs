using System;
using System.Linq;

namespace org { namespace ldk { namespace util {

/**
 * A 5-bit unsigned integer
 */
public class UInt5 {
	byte val;
	public UInt5(byte val) {
		if (val > 32 || val < 0) {
			throw new ArgumentException();
		}
		this.val = val;
	}

	/**
	 * @return the value represented
	 */
	public byte getVal() {
		return val;
	}
}

/**
 * A 5-bit unsigned integer
 */
public class UInt128 {
	private byte[] le_bytes;

	/**
	 * Constructs a 128-bit integer from its little-endian representation
	 */
	public UInt128(byte[] le_bytes) {
		if (le_bytes.Length != 16) {
			throw new ArgumentException();
		}
		this.le_bytes = le_bytes;
	}

	/**
	 * Constructs a 128-bit integer from a long, ignoring the sign bit
	 */
	public UInt128(long val) {
		byte[] le_bytes = new byte[16];
		for (int i = 0; i < 8; i++)
			le_bytes[i] = (byte) ((val >> i*8) & 0xff);
		this.le_bytes = le_bytes;
	}

	/**
	 * @return The value as 16 little endian bytes
	 */
	public byte[] getLEBytes() { return le_bytes; }

	public override bool Equals(object o) {
		if (o == null || !(o is UInt128)) return false;
		byte[] o_le_bytes = ((UInt128) o).le_bytes;
		return le_bytes.SequenceEqual(o_le_bytes);
	}

	public override int GetHashCode() { return le_bytes.GetHashCode(); }
}

} } }
