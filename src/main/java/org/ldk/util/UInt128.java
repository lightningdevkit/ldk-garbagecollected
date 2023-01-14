package org.ldk.util;

import java.util.Arrays;

/**
 * A 5-bit unsigned integer
 */
public class UInt128 {
    private byte[] le_bytes;

    /**
     * Constructs a 128-bit integer from its little-endian representation
     */
    public UInt128(byte[] le_bytes) {
        if (le_bytes.length != 16) {
            throw new IllegalArgumentException();
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

    @Override public boolean equals(Object o) {
        if (o == null || !(o instanceof UInt128)) return false;
        return Arrays.equals(le_bytes, ((UInt128) o).le_bytes);
    }

    @Override public int hashCode() { return Arrays.hashCode(le_bytes); }
}
