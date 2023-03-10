package org.ldk.util;

public class InternalUtils {
    public static byte[] check_arr_len(byte[] arr, int length) throws IllegalArgumentException {
        if (arr != null && arr.length != length) {
            throw new IllegalArgumentException("Array must be of fixed size " + length + " but was of length " + arr.length);
        }
        return arr;
    }

    public static short[] check_arr_16_len(short[] arr, int length) throws IllegalArgumentException {
        if (arr != null && arr.length != length) {
            throw new IllegalArgumentException("Array must be of fixed size " + length + " but was of length " + arr.length);
        }
        return arr;
    }

    public static byte[] convUInt5Array(UInt5[] u5s) {
        byte[] res = new byte[u5s.length];
        for (int i = 0; i < u5s.length; i++) {
            res[i] = u5s[i].getVal();
        }
        return res;
    }
}
