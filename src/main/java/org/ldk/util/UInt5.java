package org.ldk.util;

/**
 * A 5-bit unsigned integer
 */
public class UInt5 {
    byte val;
    public UInt5(byte val) {
        if (val > 32 || val < 0) {
            throw new IllegalArgumentException();
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
