export function check_arr_len(arr: Uint8Array, len: number): Uint8Array {
	if (arr.length != len) { throw new Error("Expected array of length " + len + "got " + arr.length); }
	return arr;
}