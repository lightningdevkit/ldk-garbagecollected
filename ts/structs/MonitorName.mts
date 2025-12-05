
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * A struct representing a name for a channel monitor.
 * 
 * `MonitorName` is primarily used within the [`MonitorUpdatingPersister`]
 * in functions that store or retrieve [`ChannelMonitor`] snapshots.
 * It provides a consistent way to generate a unique key for channel
 * monitors based on the channel's funding [`OutPoint`] for v1 channels or
 * [`ChannelId`] for v2 channels. Use [`ChannelMonitor::persistence_key`] to
 * obtain the correct `MonitorName`.
 * 
 * While users of the Lightning Dev Kit library generally won't need
 * to interact with [`MonitorName`] directly, it can be useful for:
 * - Custom persistence implementations
 * - Debugging or logging channel monitor operations
 * - Extending the functionality of the `MonitorUpdatingPersister`
 * 
 * # Examples
 * 
 * ```
 * use std::str::FromStr;
 * 
 * use bitcoin::Txid;
 * use bitcoin::hashes::hex::FromHex;
 * 
 * use lightning::util::persist::MonitorName;
 * use lightning::chain::transaction::OutPoint;
 * use lightning::ln::types::ChannelId;
 * 
 * v1 channel
 * let outpoint = OutPoint {
 * \t txid: Txid::from_str(\"deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef\").unwrap(),
 * \t index: 1,
 * };
 * let monitor_name = MonitorName::V1Channel(outpoint);
 * assert_eq!(&monitor_name.to_string(), \"deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef_1\");
 * 
 * v2 channel
 * let channel_id = ChannelId(<[u8; 32]>::from_hex(\"deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef\").unwrap());
 * let monitor_name = MonitorName::V2Channel(channel_id);
 * assert_eq!(&monitor_name.to_string(), \"deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef\");
 * 
 * Using MonitorName to generate a storage key
 * let storage_key = format!(\"channel_monitors/{}\", monitor_name);
 * ```
 */
export class MonitorName extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.MonitorName_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): MonitorName {
		const raw_ty: number = bindings.LDKMonitorName_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new MonitorName_V1Channel(ptr);
			case 1: return new MonitorName_V2Channel(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.MonitorName_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the MonitorName
	 */
	public clone(): MonitorName {
		const ret: bigint = bindings.MonitorName_clone(this.ptr);
		const ret_hu_conv: MonitorName = MonitorName.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new V1Channel-variant MonitorName
	 */
	public static constructor_v1_channel(a: OutPoint): MonitorName {
		const ret: bigint = bindings.MonitorName_v1_channel(CommonBase.get_ptr_of(a));
		const ret_hu_conv: MonitorName = MonitorName.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new V2Channel-variant MonitorName
	 */
	public static constructor_v2_channel(a: ChannelId): MonitorName {
		const ret: bigint = bindings.MonitorName_v2_channel(CommonBase.get_ptr_of(a));
		const ret_hu_conv: MonitorName = MonitorName.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two MonitorNames contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: MonitorName): boolean {
		const ret: boolean = bindings.MonitorName_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the MonitorName.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.MonitorName_hash(this.ptr);
		return ret;
	}

	/**
	 * Get the string representation of a MonitorName object
	 */
	public to_str(): string {
		const ret: number = bindings.MonitorName_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
/** A MonitorName of type V1Channel */
export class MonitorName_V1Channel extends MonitorName {
	public v1_channel: OutPoint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const v1_channel: bigint = bindings.LDKMonitorName_V1Channel_get_v1_channel(ptr);
		const v1_channel_hu_conv: OutPoint = new OutPoint(null, v1_channel);
			CommonBase.add_ref_from(v1_channel_hu_conv, this);
		this.v1_channel = v1_channel_hu_conv;
	}
}
/** A MonitorName of type V2Channel */
export class MonitorName_V2Channel extends MonitorName {
	public v2_channel: ChannelId;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const v2_channel: bigint = bindings.LDKMonitorName_V2Channel_get_v2_channel(ptr);
		const v2_channel_hu_conv: ChannelId = new ChannelId(null, v2_channel);
			CommonBase.add_ref_from(v2_channel_hu_conv, this);
		this.v2_channel = v2_channel_hu_conv;
	}
}
