
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Parameters defining the context around the anchor channel reserve requirement calculation.
 */
export class AnchorChannelReserveContext extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.AnchorChannelReserveContext_free);
	}

	/**
	 * The expected number of accepted in-flight HTLCs per channel.
	 * 
	 * Note that malicious counterparties can saturate the number of accepted in-flight HTLCs up to
	 * the maximum prior to forcing a unilateral closure. This estimate can include that case as a
	 * weighted average, assuming some percentage of channels are controlled by malicious peers and
	 * have the maximum number of accepted in-flight HTLCs.
	 * 
	 * See [ChannelHandshakeConfig::our_max_accepted_htlcs] to configure the maximum number of
	 * accepted in-flight HTLCs.
	 * 
	 * [ChannelHandshakeConfig::our_max_accepted_htlcs]: crate::util::config::ChannelHandshakeConfig::our_max_accepted_htlcs
	 */
	public get_expected_accepted_htlcs(): number {
		const ret: number = bindings.AnchorChannelReserveContext_get_expected_accepted_htlcs(this.ptr);
		return ret;
	}

	/**
	 * The expected number of accepted in-flight HTLCs per channel.
	 * 
	 * Note that malicious counterparties can saturate the number of accepted in-flight HTLCs up to
	 * the maximum prior to forcing a unilateral closure. This estimate can include that case as a
	 * weighted average, assuming some percentage of channels are controlled by malicious peers and
	 * have the maximum number of accepted in-flight HTLCs.
	 * 
	 * See [ChannelHandshakeConfig::our_max_accepted_htlcs] to configure the maximum number of
	 * accepted in-flight HTLCs.
	 * 
	 * [ChannelHandshakeConfig::our_max_accepted_htlcs]: crate::util::config::ChannelHandshakeConfig::our_max_accepted_htlcs
	 */
	public set_expected_accepted_htlcs(val: number): void {
		bindings.AnchorChannelReserveContext_set_expected_accepted_htlcs(this.ptr, val);
	}

	/**
	 * Whether the wallet handling anchor channel reserves creates Taproot P2TR outputs for any new
	 * outputs, or Segwit P2WPKH outputs otherwise.
	 */
	public get_taproot_wallet(): boolean {
		const ret: boolean = bindings.AnchorChannelReserveContext_get_taproot_wallet(this.ptr);
		return ret;
	}

	/**
	 * Whether the wallet handling anchor channel reserves creates Taproot P2TR outputs for any new
	 * outputs, or Segwit P2WPKH outputs otherwise.
	 */
	public set_taproot_wallet(val: boolean): void {
		bindings.AnchorChannelReserveContext_set_taproot_wallet(this.ptr, val);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.AnchorChannelReserveContext_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the AnchorChannelReserveContext
	 */
	public clone(): AnchorChannelReserveContext {
		const ret: bigint = bindings.AnchorChannelReserveContext_clone(this.ptr);
		const ret_hu_conv: AnchorChannelReserveContext = new AnchorChannelReserveContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two AnchorChannelReserveContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: AnchorChannelReserveContext): boolean {
		const ret: boolean = bindings.AnchorChannelReserveContext_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Creates a "default" AnchorChannelReserveContext. See struct and individual field documentaiton for details on which values are used.
	 */
	public static constructor_default(): AnchorChannelReserveContext {
		const ret: bigint = bindings.AnchorChannelReserveContext_default();
		const ret_hu_conv: AnchorChannelReserveContext = new AnchorChannelReserveContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
