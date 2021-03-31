
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelManager extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelManager_free(this.ptr);
                    }
                }
	public static ChannelManager constructor_new(FeeEstimator fee_est, Watch chain_monitor, BroadcasterInterface tx_broadcaster, Logger logger, KeysInterface keys_manager, UserConfig config, LDKNetwork params_network_arg, Uint8Array params_latest_hash_arg, number params_latest_height_arg) {
		number ret = bindings.ChannelManager_new(fee_est == null ? 0 : fee_est.ptr, chain_monitor == null ? 0 : chain_monitor.ptr, tx_broadcaster == null ? 0 : tx_broadcaster.ptr, logger == null ? 0 : logger.ptr, keys_manager == null ? 0 : keys_manager.ptr, config == null ? 0 : config.ptr & ~1, bindings.ChainParameters_new(params_network_arg, params_latest_hash_arg, params_latest_height_arg));
		const ret_hu_conv: ChannelManager = new ChannelManager(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(fee_est);
		ret_hu_conv.ptrs_to.add(chain_monitor);
		ret_hu_conv.ptrs_to.add(tx_broadcaster);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(keys_manager);
		ret_hu_conv.ptrs_to.add(config);
		return ret_hu_conv;
	}

	public UserConfig get_current_default_configuration() {
		number ret = bindings.ChannelManager_get_current_default_configuration(this.ptr);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Result_NoneAPIErrorZ create_channel(Uint8Array their_network_key, number channel_value_satoshis, number push_msat, number user_id, UserConfig override_config) {
		number ret = bindings.ChannelManager_create_channel(this.ptr, their_network_key, channel_value_satoshis, push_msat, user_id, override_config == null ? 0 : override_config.ptr & ~1);
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(override_config);
		return ret_hu_conv;
	}

	public ChannelDetails[] list_channels() {
		number[] ret = bindings.ChannelManager_list_channels(this.ptr);
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret.length];
		for (int q = 0; q < ret.length; q++) {
			number ret_conv_16 = ret[q];
			const ret_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, ret_conv_16);
			ret_conv_16_hu_conv.ptrs_to.add(this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	public ChannelDetails[] list_usable_channels() {
		number[] ret = bindings.ChannelManager_list_usable_channels(this.ptr);
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret.length];
		for (int q = 0; q < ret.length; q++) {
			number ret_conv_16 = ret[q];
			const ret_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, ret_conv_16);
			ret_conv_16_hu_conv.ptrs_to.add(this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	public Result_NoneAPIErrorZ close_channel(Uint8Array channel_id) {
		number ret = bindings.ChannelManager_close_channel(this.ptr, channel_id);
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_NoneAPIErrorZ force_close_channel(Uint8Array channel_id) {
		number ret = bindings.ChannelManager_force_close_channel(this.ptr, channel_id);
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public void force_close_all_channels() {
		bindings.ChannelManager_force_close_all_channels(this.ptr);
	}

	public Result_NonePaymentSendFailureZ send_payment(Route route, Uint8Array payment_hash, Uint8Array payment_secret) {
		number ret = bindings.ChannelManager_send_payment(this.ptr, route == null ? 0 : route.ptr & ~1, payment_hash, payment_secret);
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		this.ptrs_to.add(route);
		return ret_hu_conv;
	}

	public Result_NoneAPIErrorZ funding_transaction_generated(Uint8Array temporary_channel_id, Uint8Array funding_transaction, number output_index) {
		number ret = bindings.ChannelManager_funding_transaction_generated(this.ptr, temporary_channel_id, funding_transaction, output_index);
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public void broadcast_node_announcement(Uint8Array rgb, Uint8Array alias, NetAddress[] addresses) {
		bindings.ChannelManager_broadcast_node_announcement(this.ptr, rgb, alias, Arrays.stream(addresses).map(addresses_conv_12 -> addresses_conv_12.ptr).toArray(number[]::new));
		/* TODO 2 NetAddress  */;
	}

	public void process_pending_htlc_forwards() {
		bindings.ChannelManager_process_pending_htlc_forwards(this.ptr);
	}

	public void timer_chan_freshness_every_min() {
		bindings.ChannelManager_timer_chan_freshness_every_min(this.ptr);
	}

	public boolean fail_htlc_backwards(Uint8Array payment_hash, Uint8Array payment_secret) {
		boolean ret = bindings.ChannelManager_fail_htlc_backwards(this.ptr, payment_hash, payment_secret);
		return ret;
	}

	public boolean claim_funds(Uint8Array payment_preimage, Uint8Array payment_secret, number expected_amount) {
		boolean ret = bindings.ChannelManager_claim_funds(this.ptr, payment_preimage, payment_secret, expected_amount);
		return ret;
	}

	public Uint8Array get_our_node_id() {
		Uint8Array ret = bindings.ChannelManager_get_our_node_id(this.ptr);
		return ret;
	}

	public void channel_monitor_updated(OutPoint funding_txo, number highest_applied_update_id) {
		bindings.ChannelManager_channel_monitor_updated(this.ptr, funding_txo == null ? 0 : funding_txo.ptr & ~1, highest_applied_update_id);
		this.ptrs_to.add(funding_txo);
	}

	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		number ret = bindings.ChannelManager_as_MessageSendEventsProvider(this.ptr);
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public EventsProvider as_EventsProvider() {
		number ret = bindings.ChannelManager_as_EventsProvider(this.ptr);
		EventsProvider ret_hu_conv = new EventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Listen as_Listen() {
		number ret = bindings.ChannelManager_as_Listen(this.ptr);
		Listen ret_hu_conv = new Listen(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void transactions_confirmed(Uint8Array header, number height, TwoTuple<Number, Uint8Array>[] txdata) {
		bindings.ChannelManager_transactions_confirmed(this.ptr, header, height, Arrays.stream(txdata).map(txdata_conv_30 -> bindings.C2Tuple_usizeTransactionZ_new(txdata_conv_30.a, txdata_conv_30.b)).toArray(number[]::new));
		/* TODO 2 TwoTuple<Number, Uint8Array>  */;
	}

	public void update_best_block(Uint8Array header, number height) {
		bindings.ChannelManager_update_best_block(this.ptr, header, height);
	}

	public Uint8Array[] get_relevant_txids() {
		Uint8Array[] ret = bindings.ChannelManager_get_relevant_txids(this.ptr);
		return ret;
	}

	public void transaction_unconfirmed(Uint8Array txid) {
		bindings.ChannelManager_transaction_unconfirmed(this.ptr, txid);
	}

	public boolean await_persistable_update_timeout(number max_wait) {
		boolean ret = bindings.ChannelManager_await_persistable_update_timeout(this.ptr, max_wait);
		return ret;
	}

	public void await_persistable_update() {
		bindings.ChannelManager_await_persistable_update(this.ptr);
	}

	public ChannelMessageHandler as_ChannelMessageHandler() {
		number ret = bindings.ChannelManager_as_ChannelMessageHandler(this.ptr);
		ChannelMessageHandler ret_hu_conv = new ChannelMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelManager_write(this.ptr);
		return ret;
	}

}
