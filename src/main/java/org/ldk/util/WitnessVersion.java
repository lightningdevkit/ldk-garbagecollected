package org.ldk.util;

/**
 * A 4-bit unsigned integer representing a Bitcoin SegWit version
 */
public class WitnessVersion {
    byte val;
    public WitnessVersion(byte val) {
        if (val > 16 || val < 0) {
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
