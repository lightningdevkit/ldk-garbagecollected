	public static Result_COption_ClosureReasonZDecodeErrorZ constructor_ClosureReason_read(Uint8Array ser) {
		number ret = bindings.ClosureReason_read(ser);
		Result_COption_ClosureReasonZDecodeErrorZ ret_hu_conv = Result_COption_ClosureReasonZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_COption_EventZDecodeErrorZ constructor_Event_read(Uint8Array ser) {
		number ret = bindings.Event_read(ser);
		Result_COption_EventZDecodeErrorZ ret_hu_conv = Result_COption_EventZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_StringErrorZ constructor_sign(Uint8Array msg, Uint8Array sk) {
		number ret = bindings.sign(msg, InternalUtils.check_arr_len(sk, 32));
		Result_StringErrorZ ret_hu_conv = Result_StringErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PublicKeyErrorZ constructor_recover_pk(Uint8Array msg, String sig) {
		number ret = bindings.recover_pk(msg, sig);
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static boolean constructor_verify(Uint8Array msg, String sig, Uint8Array pk) {
		boolean ret = bindings.verify(msg, sig, InternalUtils.check_arr_len(pk, 33));
		return ret;
	}

	public static Result_COption_MonitorEventZDecodeErrorZ constructor_MonitorEvent_read(Uint8Array ser) {
		number ret = bindings.MonitorEvent_read(ser);
		Result_COption_MonitorEventZDecodeErrorZ ret_hu_conv = Result_COption_MonitorEventZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ constructor_C2Tuple_BlockHashChannelMonitorZ_read(Uint8Array ser, KeysInterface arg) {
		number ret = bindings.C2Tuple_BlockHashChannelMonitorZ_read(ser, arg == null ? 0 : arg.ptr);
		Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(arg);
		return ret_hu_conv;
	}

	public static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ constructor_C2Tuple_BlockHashChannelManagerZ_read(Uint8Array ser, KeysInterface arg_keys_manager, FeeEstimator arg_fee_estimator, Watch arg_chain_monitor, BroadcasterInterface arg_tx_broadcaster, Logger arg_logger, UserConfig arg_default_config, ChannelMonitor[] arg_channel_monitors) {
		number ret = bindings.C2Tuple_BlockHashChannelManagerZ_read(ser, bindings.ChannelManagerReadArgs_new(arg_keys_manager == null ? 0 : arg_keys_manager.ptr, arg_fee_estimator == null ? 0 : arg_fee_estimator.ptr, arg_chain_monitor == null ? 0 : arg_chain_monitor.ptr, arg_tx_broadcaster == null ? 0 : arg_tx_broadcaster.ptr, arg_logger == null ? 0 : arg_logger.ptr, arg_default_config == null ? 0 : arg_default_config.ptr & ~1, arg_channel_monitors != null ? Arrays.stream(arg_channel_monitors).map(arg_channel_monitors_conv_16 -> arg_channel_monitors_conv_16 == null ? 0 : arg_channel_monitors_conv_16.ptr & ~1).toArray(number[]::new) : null));
		Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(arg_keys_manager);
		ret_hu_conv.ptrs_to.add(arg_fee_estimator);
		ret_hu_conv.ptrs_to.add(arg_chain_monitor);
		ret_hu_conv.ptrs_to.add(arg_tx_broadcaster);
		ret_hu_conv.ptrs_to.add(arg_logger);
		;
		for (ChannelMonitor arg_channel_monitors_conv_16: arg_channel_monitors) { ret_hu_conv.ptrs_to.add(arg_channel_monitors_conv_16); };
		return ret_hu_conv;
	}

	public static Uint8Array constructor_build_commitment_secret(Uint8Array commitment_seed, number idx) {
		Uint8Array ret = bindings.build_commitment_secret(InternalUtils.check_arr_len(commitment_seed, 32), idx);
		return ret;
	}

	public static Uint8Array constructor_build_closing_transaction(number to_holder_value_sat, number to_counterparty_value_sat, Uint8Array to_holder_script, Uint8Array to_counterparty_script, OutPoint funding_outpoint) {
		Uint8Array ret = bindings.build_closing_transaction(to_holder_value_sat, to_counterparty_value_sat, to_holder_script, to_counterparty_script, funding_outpoint == null ? 0 : funding_outpoint.ptr & ~1);
		return ret;
	}

	public static Result_SecretKeyErrorZ constructor_derive_private_key(Uint8Array per_commitment_point, Uint8Array base_secret) {
		number ret = bindings.derive_private_key(InternalUtils.check_arr_len(per_commitment_point, 33), InternalUtils.check_arr_len(base_secret, 32));
		Result_SecretKeyErrorZ ret_hu_conv = Result_SecretKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PublicKeyErrorZ constructor_derive_public_key(Uint8Array per_commitment_point, Uint8Array base_point) {
		number ret = bindings.derive_public_key(InternalUtils.check_arr_len(per_commitment_point, 33), InternalUtils.check_arr_len(base_point, 33));
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_SecretKeyErrorZ constructor_derive_private_revocation_key(Uint8Array per_commitment_secret, Uint8Array countersignatory_revocation_base_secret) {
		number ret = bindings.derive_private_revocation_key(InternalUtils.check_arr_len(per_commitment_secret, 32), InternalUtils.check_arr_len(countersignatory_revocation_base_secret, 32));
		Result_SecretKeyErrorZ ret_hu_conv = Result_SecretKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PublicKeyErrorZ constructor_derive_public_revocation_key(Uint8Array per_commitment_point, Uint8Array countersignatory_revocation_base_point) {
		number ret = bindings.derive_public_revocation_key(InternalUtils.check_arr_len(per_commitment_point, 33), InternalUtils.check_arr_len(countersignatory_revocation_base_point, 33));
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Uint8Array constructor_get_revokeable_redeemscript(Uint8Array revocation_key, number contest_delay, Uint8Array broadcaster_delayed_payment_key) {
		Uint8Array ret = bindings.get_revokeable_redeemscript(InternalUtils.check_arr_len(revocation_key, 33), contest_delay, InternalUtils.check_arr_len(broadcaster_delayed_payment_key, 33));
		return ret;
	}

	public static Uint8Array constructor_get_htlc_redeemscript(HTLCOutputInCommitment htlc, TxCreationKeys keys) {
		Uint8Array ret = bindings.get_htlc_redeemscript(htlc == null ? 0 : htlc.ptr & ~1, keys == null ? 0 : keys.ptr & ~1);
		// this.ptrs_to.add(htlc);
		// this.ptrs_to.add(keys);
		return ret;
	}

	public static Uint8Array constructor_make_funding_redeemscript(Uint8Array broadcaster, Uint8Array countersignatory) {
		Uint8Array ret = bindings.make_funding_redeemscript(InternalUtils.check_arr_len(broadcaster, 33), InternalUtils.check_arr_len(countersignatory, 33));
		return ret;
	}

	public static Uint8Array constructor_build_htlc_transaction(Uint8Array commitment_txid, number feerate_per_kw, number contest_delay, HTLCOutputInCommitment htlc, Uint8Array broadcaster_delayed_payment_key, Uint8Array revocation_key) {
		Uint8Array ret = bindings.build_htlc_transaction(InternalUtils.check_arr_len(commitment_txid, 32), feerate_per_kw, contest_delay, htlc == null ? 0 : htlc.ptr & ~1, InternalUtils.check_arr_len(broadcaster_delayed_payment_key, 33), InternalUtils.check_arr_len(revocation_key, 33));
		// this.ptrs_to.add(htlc);
		return ret;
	}

	public static number constructor_get_commitment_transaction_number_obscure_factor(Uint8Array broadcaster_payment_basepoint, Uint8Array countersignatory_payment_basepoint, boolean outbound_from_broadcaster) {
		number ret = bindings.get_commitment_transaction_number_obscure_factor(InternalUtils.check_arr_len(broadcaster_payment_basepoint, 33), InternalUtils.check_arr_len(countersignatory_payment_basepoint, 33), outbound_from_broadcaster);
		return ret;
	}

	public static Result_COption_NetworkUpdateZDecodeErrorZ constructor_NetworkUpdate_read(Uint8Array ser) {
		number ret = bindings.NetworkUpdate_read(ser);
		Result_COption_NetworkUpdateZDecodeErrorZ ret_hu_conv = Result_COption_NetworkUpdateZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_RouteLightningErrorZ constructor_find_route(Uint8Array our_node_pubkey, RouteParameters params, NetworkGraph network, ChannelDetails[] first_hops, Logger logger, Score scorer) {
		number ret = bindings.find_route(InternalUtils.check_arr_len(our_node_pubkey, 33), params == null ? 0 : params.ptr & ~1, network == null ? 0 : network.ptr & ~1, first_hops != null ? Arrays.stream(first_hops).map(first_hops_conv_16 -> first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr & ~1).toArray(number[]::new) : null, logger == null ? 0 : logger.ptr, scorer == null ? 0 : scorer.ptr);
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(params);
		ret_hu_conv.ptrs_to.add(network);
		for (ChannelDetails first_hops_conv_16: first_hops) { ret_hu_conv.ptrs_to.add(first_hops_conv_16); };
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(scorer);
		return ret_hu_conv;
	}

	public static Result_NoneErrorZ constructor_FilesystemPersister_persist_manager(String data_dir, ChannelManager manager) {
		number ret = bindings.FilesystemPersister_persist_manager(data_dir, manager == null ? 0 : manager.ptr & ~1);
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(manager);
		return ret_hu_conv;
	}

	public static Result_InvoiceSignOrCreationErrorZ constructor_create_invoice_from_channelmanager(ChannelManager channelmanager, KeysInterface keys_manager, Currency network, Option_u64Z amt_msat, String description) {
		number ret = bindings.create_invoice_from_channelmanager(channelmanager == null ? 0 : channelmanager.ptr & ~1, keys_manager == null ? 0 : keys_manager.ptr, network, amt_msat.ptr, description);
		Result_InvoiceSignOrCreationErrorZ ret_hu_conv = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(channelmanager);
		ret_hu_conv.ptrs_to.add(keys_manager);
		return ret_hu_conv;
	}

