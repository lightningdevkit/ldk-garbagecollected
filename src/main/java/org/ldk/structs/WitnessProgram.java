package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class WitnessProgram extends CommonBase {
	/** The witness program bytes themselves */
	public final byte[] program;
	/** The witness version */
	public final WitnessVersion version;

	WitnessProgram(java.lang.Object _dummy, long ptr) {
		super(ptr);
		this.program = bindings.WitnessProgram_get_program(ptr);
		this.version = new WitnessVersion(bindings.WitnessProgram_get_version(ptr));
	}
	static byte check_args(byte[] program, WitnessVersion version) {
		if (program.length < 2 || program.length > 40) throw new IllegalArgumentException();
		if (version.getVal() == 0 && program.length != 20 && program.length != 32) throw new IllegalArgumentException();
		return version.getVal();
	}
	public WitnessProgram(byte[] program, WitnessVersion version) {
		super(bindings.WitnessProgram_new(check_args(program, version), program));
		this.program = bindings.WitnessProgram_get_program(ptr);
		this.version = new WitnessVersion(bindings.WitnessProgram_get_version(ptr));
	}

	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.WitnessProgram_free(ptr); }
	}
}