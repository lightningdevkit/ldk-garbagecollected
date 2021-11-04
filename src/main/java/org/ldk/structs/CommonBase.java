package org.ldk.structs;
import java.util.LinkedList;
class CommonBase {
	long ptr;
	LinkedList<Object> ptrs_to = new LinkedList();
	protected CommonBase(long ptr) { assert ptr < 0 || ptr > 4096; this.ptr = ptr; }
}
