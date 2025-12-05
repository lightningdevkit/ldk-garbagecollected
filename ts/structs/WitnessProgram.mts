
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

export class WitnessProgram extends CommonBase {
	/** The witness program bytes themselves */
	public program: Uint8Array;
	/** The witness program version */
	public version: WitnessVersion;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.WitnessProgram_free);
		this.program = bindings.decodeUint8Array(bindings.WitnessProgram_get_program(ptr));
		this.version = new WitnessVersion(bindings.WitnessProgram_get_version(ptr));
	}
	public static constructor_new(program: Uint8Array, version: WitnessVersion): WitnessProgram {
		if (program.length < 2 || program.length > 40)
			throw new Error("WitnessProgram must be between 2 and 40 bytes long");
		if (version.getVal() == 0 && program.length != 20 && program.length != 32)
			throw new Error("WitnessProgram for version 0 must be between either 20 or 30 bytes");
		return new WitnessProgram(null, bindings.WitnessProgram_new(version.getVal(), bindings.encodeUint8Array(program)));
	}
}