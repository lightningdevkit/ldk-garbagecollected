using System;
using System.Text;
using org.ldk.util;
using org.ldk.impl;

internal class InternalUtils {
	public static T[] check_arr_len<T>(T[] arr, int length) {
		if (arr != null && arr.Length != length) {
			throw new ArgumentException("Array must be of fixed size " + length + " but was of length " + arr.Length);
		}
		return arr;
	}

	public static byte[] convUInt5Array(UInt5[] u5s) {
		if (u5s == null) return null;
		byte[] res = new byte[u5s.Length];
		for (int i = 0; i < u5s.Length; i++) {
			res[i] = u5s[i].getVal();
		}
		return res;
	}

	public static T[] mapArray<F, T>(F[] arr, Func<F, T> f) {
		if (arr == null) return null;
		T[] ret = new T[arr.Length];
		for (int i = 0; i < arr.Length; i++) ret[i] = f(arr[i]);
		return ret;
	}

	public static string decodeString(long strptr) {
		byte[] bytes = decodeUint8Array(strptr);
		return Encoding.UTF8.GetString(bytes);
	}

	public static long encodeString(string s) {
		byte[] bytes = Encoding.UTF8.GetBytes(s);
		return encodeUint8Array(bytes);
	}


	public static int getArrayLength(long arrptr) {
		long len;
		unsafe {
			long* arrlen = (long*) arrptr;
			len = *arrlen;
		}
		if (len > 0xffffffffL) {
			throw new ArgumentException("Array length was out of bounds");
		}
		return (int)len;
	}


	public static long getU64ArrayElem(long arrptr, int idx) {
		unsafe {
			long* arr = (long*) (arrptr + 8);
			return arr[idx];
		}
	}
	public static int getU32ArrayElem(long arrptr, int idx) {
		unsafe {
			int* arr = (int*) (arrptr + 8);
			return arr[idx];
		}
	}
	public static short getU16ArrayElem(long arrptr, int idx) {
		unsafe {
			short* arr = (short*) (arrptr + 8);
			return arr[idx];
		}
	}
	public static byte getU8ArrayElem(long arrptr, int idx) {
		unsafe {
			byte* arr = (byte*) (arrptr + 8);
			return arr[idx];
		}
	}


	public static long encodeUint8Array(byte[] arr) {
		long buf = bindings.allocate_buffer(arr.Length + 8);
		unsafe { *((long*)buf) = (long)arr.Length; }
		for (int i = 0; i < arr.Length; i++) {
			unsafe {
				((byte*)(buf + 8))[i] = arr[i];
			}
		}
		return buf;
	}
	public static long encodeUint16Array(short[] arr) {
		long buf = bindings.allocate_buffer(arr.Length * 2 + 8);
		unsafe { *((long*)buf) = (long)arr.Length; }
		for (int i = 0; i < arr.Length; i++) {
			unsafe {
				((short*)(buf + 8))[i] = arr[i];
			}
		}
		return buf;
	}
	public static long encodeUint32Array(int[] arr) {
		long buf = bindings.allocate_buffer(arr.Length * 4 + 8);
		unsafe { *((long*)buf) = (long)arr.Length; }
		for (int i = 0; i < arr.Length; i++) {
			unsafe {
				((int*)(buf + 8))[i] = arr[i];
			}
		}
		return buf;
	}
	public static long encodeUint64Array(long[] arr) {
		long buf = bindings.allocate_buffer(arr.Length * 8 + 8);
		unsafe { *((long*)buf) = (long)arr.Length; }
		for (int i = 0; i < arr.Length; i++) {
			unsafe {
				((long*)(buf + 8))[i] = arr[i];
			}
		}
		return buf;
	}


	public static byte[] decodeUint8Array(long arrptr) {
		int len = getArrayLength(arrptr);
		byte[] res = new byte[len];
		for (int i = 0; i < len; i++)
			res[i] = getU8ArrayElem(arrptr, i);
		return res;
	}
	public static short[] decodeUint16Array(long arrptr) {
		int len = getArrayLength(arrptr);
		short[] res = new short[len];
		for (int i = 0; i < len; i++)
			res[i] = getU16ArrayElem(arrptr, i);
		return res;
	}
	public static long[] decodeUint64Array(long arrptr) {
		int len = getArrayLength(arrptr);
		long[] res = new long[len];
		for (int i = 0; i < len; i++)
			res[i] = getU64ArrayElem(arrptr, i);
		return res;
	}
}
