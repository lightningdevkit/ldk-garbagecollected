
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_ThirtyTwoBytesChannelManagerZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_ThirtyTwoBytesChannelManagerZ_free);
	}

	/**
	 * 
	 */
	public get_a(): Uint8Array {
		const ret: number = bindings.C2Tuple_ThirtyTwoBytesChannelManagerZ_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_b(): ChannelManager {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesChannelManagerZ_get_b(this.ptr);
		const ret_hu_conv: ChannelManager = new ChannelManager(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ThirtyTwoBytesChannelManagerZ from the contained elements.
	 */
	public static constructor_new(a: Uint8Array, b_fee_est: FeeEstimator, b_chain_monitor: Watch, b_tx_broadcaster: BroadcasterInterface, b_router: Router, b_message_router: MessageRouter, b_logger: Logger, b_entropy_source: EntropySource, b_node_signer: NodeSigner, b_signer_provider: SignerProvider, b_config: UserConfig, b_params: ChainParameters, b_current_timestamp: number): TwoTuple_ThirtyTwoBytesChannelManagerZ {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesChannelManagerZ_new(bindings.encodeUint8Array(a), bindings.ChannelManager_new(CommonBase.get_ptr_of(b_fee_est), CommonBase.get_ptr_of(b_chain_monitor), CommonBase.get_ptr_of(b_tx_broadcaster), CommonBase.get_ptr_of(b_router), CommonBase.get_ptr_of(b_message_router), CommonBase.get_ptr_of(b_logger), CommonBase.get_ptr_of(b_entropy_source), CommonBase.get_ptr_of(b_node_signer), CommonBase.get_ptr_of(b_signer_provider), CommonBase.get_ptr_of(b_config), CommonBase.get_ptr_of(b_params), b_current_timestamp));
		const ret_hu_conv: TwoTuple_ThirtyTwoBytesChannelManagerZ = new TwoTuple_ThirtyTwoBytesChannelManagerZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, b_fee_est);
		CommonBase.add_ref_from(ret_hu_conv, b_chain_monitor);
		CommonBase.add_ref_from(ret_hu_conv, b_tx_broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, b_router);
		CommonBase.add_ref_from(ret_hu_conv, b_message_router);
		CommonBase.add_ref_from(ret_hu_conv, b_logger);
		CommonBase.add_ref_from(ret_hu_conv, b_entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, b_node_signer);
		CommonBase.add_ref_from(ret_hu_conv, b_signer_provider);
		;
		;
		return ret_hu_conv;
	}

}
