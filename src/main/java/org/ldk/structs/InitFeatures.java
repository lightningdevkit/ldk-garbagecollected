package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class InitFeatures extends CommonBase {
	InitFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.InitFeatures_free(ptr); super.finalize();
	}

}
