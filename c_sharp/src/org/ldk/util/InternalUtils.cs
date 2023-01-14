using System;
using org.ldk.util;

internal class InternalUtils {
	public static byte[] check_arr_len(byte[] arr, int length) {
		if (arr != null && arr.Length != length) {
			throw new ArgumentException("Array must be of fixed size " + length + " but was of length " + arr.Length);
		}
		return arr;
	}

	public static byte[] convUInt5Array(UInt5[] u5s) {
		byte[] res = new byte[u5s.Length];
		for (int i = 0; i < u5s.Length; i++) {
			res[i] = u5s[i].getVal();
		}
		return res;
	}

	public static T[] mapArray<F, T>(F[] arr, Func<F, T> f) {
		T[] ret = new T[arr.Length];
		for (int i = 0; i < arr.Length; i++) ret[i] = f(arr[i]);
		return ret;
	}
}
