package org.ldk.structs;
import java.util.LinkedList;
class CommonBase {
	final long ptr;
	LinkedList<Object> ptrs_to = new LinkedList();
	protected CommonBase(long ptr) { this.ptr = ptr; }
	public long _test_only_get_ptr() { return this.ptr; }
}
