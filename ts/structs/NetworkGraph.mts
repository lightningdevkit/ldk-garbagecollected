
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Represents the network as nodes and channels between them
 */
export class NetworkGraph extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NetworkGraph_free);
	}

	/**
	 * Handles any network updates originating from [`Event`]s.
	 * 
	 * [`Event`]: crate::events::Event
	 */
	public handle_network_update(network_update: NetworkUpdate): void {
		bindings.NetworkGraph_handle_network_update(this.ptr, CommonBase.get_ptr_of(network_update));
	}

	/**
	 * Gets the chain hash for this network graph.
	 */
	public get_chain_hash(): Uint8Array {
		const ret: number = bindings.NetworkGraph_get_chain_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Serialize the NetworkGraph object into a byte array which can be read by NetworkGraph_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.NetworkGraph_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a NetworkGraph from a byte array, created by NetworkGraph_write
	 */
	public static constructor_read(ser: Uint8Array, arg: Logger): Result_NetworkGraphDecodeErrorZ {
		const ret: bigint = bindings.NetworkGraph_read(bindings.encodeUint8Array(ser), CommonBase.get_ptr_of(arg));
		const ret_hu_conv: Result_NetworkGraphDecodeErrorZ = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, arg);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a NetworkGraph object
	 */
	public to_str(): string {
		const ret: number = bindings.NetworkGraph_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Creates a new, empty, network graph.
	 */
	public static constructor_new(network: Network, logger: Logger): NetworkGraph {
		const ret: bigint = bindings.NetworkGraph_new(network, CommonBase.get_ptr_of(logger));
		const ret_hu_conv: NetworkGraph = new NetworkGraph(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * Returns a read-only view of the network graph.
	 */
	public read_only(): ReadOnlyNetworkGraph {
		const ret: bigint = bindings.NetworkGraph_read_only(this.ptr);
		const ret_hu_conv: ReadOnlyNetworkGraph = new ReadOnlyNetworkGraph(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The unix timestamp provided by the most recent rapid gossip sync.
	 * It will be set by the rapid sync process after every sync completion.
	 */
	public get_last_rapid_gossip_sync_timestamp(): Option_u32Z {
		const ret: bigint = bindings.NetworkGraph_get_last_rapid_gossip_sync_timestamp(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Update the unix timestamp provided by the most recent rapid gossip sync.
	 * This should be done automatically by the rapid sync process after every sync completion.
	 */
	public set_last_rapid_gossip_sync_timestamp(last_rapid_gossip_sync_timestamp: number): void {
		bindings.NetworkGraph_set_last_rapid_gossip_sync_timestamp(this.ptr, last_rapid_gossip_sync_timestamp);
	}

	/**
	 * For an already known node (from channel announcements), update its stored properties from a
	 * given node announcement.
	 * 
	 * You probably don't want to call this directly, instead relying on a P2PGossipSync's
	 * RoutingMessageHandler implementation to call it indirectly. This may be useful to accept
	 * routing messages from a source using a protocol other than the lightning P2P protocol.
	 */
	public update_node_from_announcement(msg: NodeAnnouncement): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.NetworkGraph_update_node_from_announcement(this.ptr, CommonBase.get_ptr_of(msg));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * For an already known node (from channel announcements), update its stored properties from a
	 * given node announcement without verifying the associated signatures. Because we aren't
	 * given the associated signatures here we cannot relay the node announcement to any of our
	 * peers.
	 */
	public update_node_from_unsigned_announcement(msg: UnsignedNodeAnnouncement): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.NetworkGraph_update_node_from_unsigned_announcement(this.ptr, CommonBase.get_ptr_of(msg));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Store or update channel info from a channel announcement.
	 * 
	 * You probably don't want to call this directly, instead relying on a [`P2PGossipSync`]'s
	 * [`RoutingMessageHandler`] implementation to call it indirectly. This may be useful to accept
	 * routing messages from a source using a protocol other than the lightning P2P protocol.
	 * 
	 * If a [`UtxoLookup`] object is provided via `utxo_lookup`, it will be called to verify
	 * the corresponding UTXO exists on chain and is correctly-formatted.
	 */
	public update_channel_from_announcement(msg: ChannelAnnouncement, utxo_lookup: Option_UtxoLookupZ): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.NetworkGraph_update_channel_from_announcement(this.ptr, CommonBase.get_ptr_of(msg), CommonBase.get_ptr_of(utxo_lookup));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, utxo_lookup);
		return ret_hu_conv;
	}

	/**
	 * Store or update channel info from a channel announcement.
	 * 
	 * You probably don't want to call this directly, instead relying on a [`P2PGossipSync`]'s
	 * [`RoutingMessageHandler`] implementation to call it indirectly. This may be useful to accept
	 * routing messages from a source using a protocol other than the lightning P2P protocol.
	 * 
	 * This will skip verification of if the channel is actually on-chain.
	 */
	public update_channel_from_announcement_no_lookup(msg: ChannelAnnouncement): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.NetworkGraph_update_channel_from_announcement_no_lookup(this.ptr, CommonBase.get_ptr_of(msg));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Store or update channel info from a channel announcement without verifying the associated
	 * signatures. Because we aren't given the associated signatures here we cannot relay the
	 * channel announcement to any of our peers.
	 * 
	 * If a [`UtxoLookup`] object is provided via `utxo_lookup`, it will be called to verify
	 * the corresponding UTXO exists on chain and is correctly-formatted.
	 */
	public update_channel_from_unsigned_announcement(msg: UnsignedChannelAnnouncement, utxo_lookup: Option_UtxoLookupZ): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.NetworkGraph_update_channel_from_unsigned_announcement(this.ptr, CommonBase.get_ptr_of(msg), CommonBase.get_ptr_of(utxo_lookup));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, utxo_lookup);
		return ret_hu_conv;
	}

	/**
	 * Update channel from partial announcement data received via rapid gossip sync
	 * 
	 * `timestamp: u64`: Timestamp emulating the backdated original announcement receipt (by the
	 * rapid gossip sync server)
	 * 
	 * All other parameters as used in [`msgs::UnsignedChannelAnnouncement`] fields.
	 */
	public add_channel_from_partial_announcement(short_channel_id: bigint, capacity_sats: Option_u64Z, timestamp: bigint, features: ChannelFeatures, node_id_1: NodeId, node_id_2: NodeId): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.NetworkGraph_add_channel_from_partial_announcement(this.ptr, short_channel_id, CommonBase.get_ptr_of(capacity_sats), timestamp, CommonBase.get_ptr_of(features), CommonBase.get_ptr_of(node_id_1), CommonBase.get_ptr_of(node_id_2));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Marks a channel in the graph as failed permanently.
	 * 
	 * The channel and any node for which this was their last channel are removed from the graph.
	 */
	public channel_failed_permanent(short_channel_id: bigint): void {
		bindings.NetworkGraph_channel_failed_permanent(this.ptr, short_channel_id);
	}

	/**
	 * Marks a node in the graph as permanently failed, effectively removing it and its channels
	 * from local storage.
	 */
	public node_failed_permanent(node_id: Uint8Array): void {
		bindings.NetworkGraph_node_failed_permanent(this.ptr, bindings.encodeUint8Array(node_id));
	}

	/**
	 * Removes information about channels that we haven't heard any updates about in some time.
	 * This can be used regularly to prune the network graph of channels that likely no longer
	 * exist.
	 * 
	 * While there is no formal requirement that nodes regularly re-broadcast their channel
	 * updates every two weeks, the non-normative section of BOLT 7 currently suggests that
	 * pruning occur for updates which are at least two weeks old, which we implement here.
	 * 
	 * This method will also cause us to stop tracking removed nodes and channels if they have been
	 * in the map for a while so that these can be resynced from gossip in the future.
	 */
	public remove_stale_channels_and_tracking_with_time(current_time_unix: bigint): void {
		bindings.NetworkGraph_remove_stale_channels_and_tracking_with_time(this.ptr, current_time_unix);
	}

	/**
	 * For an already known (from announcement) channel, update info about one of the directions
	 * of the channel.
	 * 
	 * You probably don't want to call this directly, instead relying on a [`P2PGossipSync`]'s
	 * [`RoutingMessageHandler`] implementation to call it indirectly. This may be useful to accept
	 * routing messages from a source using a protocol other than the lightning P2P protocol.
	 * 
	 * If not built with `std`, any updates with a timestamp more than two weeks in the past or
	 * materially in the future will be rejected.
	 */
	public update_channel(msg: ChannelUpdate): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.NetworkGraph_update_channel(this.ptr, CommonBase.get_ptr_of(msg));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * For an already known (from announcement) channel, update info about one of the directions
	 * of the channel without verifying the associated signatures. Because we aren't given the
	 * associated signatures here we cannot relay the channel update to any of our peers.
	 * 
	 * If not built with `std`, any updates with a timestamp more than two weeks in the past or
	 * materially in the future will be rejected.
	 */
	public update_channel_unsigned(msg: UnsignedChannelUpdate): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.NetworkGraph_update_channel_unsigned(this.ptr, CommonBase.get_ptr_of(msg));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * For an already known (from announcement) channel, verify the given [`ChannelUpdate`].
	 * 
	 * This checks whether the update currently is applicable by [`Self::update_channel`].
	 * 
	 * If not built with `std`, any updates with a timestamp more than two weeks in the past or
	 * materially in the future will be rejected.
	 */
	public verify_channel_update(msg: ChannelUpdate): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.NetworkGraph_verify_channel_update(this.ptr, CommonBase.get_ptr_of(msg));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
