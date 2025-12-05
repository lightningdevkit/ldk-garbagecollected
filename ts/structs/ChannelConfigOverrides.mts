
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Config structure for overriding channel parameters.
 */
export class ChannelConfigOverrides extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelConfigOverrides_free);
	}

	/**
	 * Overrides for channel handshake parameters.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_handshake_overrides(): ChannelHandshakeConfigUpdate {
		const ret: bigint = bindings.ChannelConfigOverrides_get_handshake_overrides(this.ptr);
		const ret_hu_conv: ChannelHandshakeConfigUpdate = new ChannelHandshakeConfigUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Overrides for channel handshake parameters.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_handshake_overrides(val: ChannelHandshakeConfigUpdate|null): void {
		bindings.ChannelConfigOverrides_set_handshake_overrides(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Overrides for channel update parameters.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_update_overrides(): ChannelConfigUpdate {
		const ret: bigint = bindings.ChannelConfigOverrides_get_update_overrides(this.ptr);
		const ret_hu_conv: ChannelConfigUpdate = new ChannelConfigUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Overrides for channel update parameters.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_update_overrides(val: ChannelConfigUpdate|null): void {
		bindings.ChannelConfigOverrides_set_update_overrides(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelConfigOverrides given each field
	 * 
	 * Note that handshake_overrides_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that update_overrides_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(handshake_overrides_arg: ChannelHandshakeConfigUpdate|null, update_overrides_arg: ChannelConfigUpdate|null): ChannelConfigOverrides {
		const ret: bigint = bindings.ChannelConfigOverrides_new(handshake_overrides_arg == null ? 0n : CommonBase.get_ptr_of(handshake_overrides_arg), update_overrides_arg == null ? 0n : CommonBase.get_ptr_of(update_overrides_arg));
		const ret_hu_conv: ChannelConfigOverrides = new ChannelConfigOverrides(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelConfigOverrides_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelConfigOverrides
	 */
	public clone(): ChannelConfigOverrides {
		const ret: bigint = bindings.ChannelConfigOverrides_clone(this.ptr);
		const ret_hu_conv: ChannelConfigOverrides = new ChannelConfigOverrides(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
