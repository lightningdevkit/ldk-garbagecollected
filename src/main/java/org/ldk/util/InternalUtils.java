package org.ldk.util;

public class InternalUtils {
    public static byte[] check_arr_len(byte[] arr, int length) throws IllegalArgumentException {
        if (arr.length != length) {
            throw new IllegalArgumentException("Array must be of fixed size " + length + " but was of length " + arr.length);
        }
        return arr;
    }
}
