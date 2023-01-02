using System.Collections.Generic;
using System.Diagnostics;

public class CommonBase {
	protected internal long ptr;
	protected internal LinkedList<object> ptrs_to = new LinkedList<object>();
	protected CommonBase(long ptr) { Trace.Assert(ptr < 0 || ptr > 4096); this.ptr = ptr; }
}
