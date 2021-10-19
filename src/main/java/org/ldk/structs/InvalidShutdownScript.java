package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * An error occurring when converting from [`Script`] to [`ShutdownScript`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InvalidShutdownScript extends CommonBase {
	InvalidShutdownScript(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InvalidShutdownScript_free(ptr); }
	}

	/**
	 * The script that did not meet the requirements from [BOLT #2].
	 * 
	 * [BOLT #2]: https://github.com/lightningnetwork/lightning-rfc/blob/master/02-peer-protocol.md
	 */
	public byte[] get_script() {
		byte[] ret = bindings.InvalidShutdownScript_get_script(this.ptr);
		return ret;
	}

	/**
	 * The script that did not meet the requirements from [BOLT #2].
	 * 
	 * [BOLT #2]: https://github.com/lightningnetwork/lightning-rfc/blob/master/02-peer-protocol.md
	 */
	public void set_script(byte[] val) {
		bindings.InvalidShutdownScript_set_script(this.ptr, val);
	}

	/**
	 * Constructs a new InvalidShutdownScript given each field
	 */
	public static InvalidShutdownScript of(byte[] script_arg) {
		long ret = bindings.InvalidShutdownScript_new(script_arg);
		if (ret >= 0 && ret < 1024) { return null; }
		InvalidShutdownScript ret_hu_conv = new InvalidShutdownScript(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the InvalidShutdownScript
	 */
	public InvalidShutdownScript clone() {
		long ret = bindings.InvalidShutdownScript_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		InvalidShutdownScript ret_hu_conv = new InvalidShutdownScript(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
