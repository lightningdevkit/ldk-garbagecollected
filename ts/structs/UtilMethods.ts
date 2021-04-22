	public static Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ constructor_BlockHashChannelMonitorZ_read(Uint8Array ser, KeysInterface arg) {
		number ret = bindings.C2Tuple_BlockHashChannelMonitorZ_read(ser, arg == null ? 0 : arg.ptr);
		Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(arg);
		return ret_hu_conv;
	}

	public static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ constructor_BlockHashChannelManagerZ_read(Uint8Array ser, KeysInterface arg_keys_manager, FeeEstimator arg_fee_estimator, Watch arg_chain_monitor, BroadcasterInterface arg_tx_broadcaster, Logger arg_logger, UserConfig arg_default_config, ChannelMonitor[] arg_channel_monitors) {
		number ret = bindings.C2Tuple_BlockHashChannelManagerZ_read(ser, bindings.ChannelManagerReadArgs_new(arg_keys_manager == null ? 0 : arg_keys_manager.ptr, arg_fee_estimator == null ? 0 : arg_fee_estimator.ptr, arg_chain_monitor == null ? 0 : arg_chain_monitor.ptr, arg_tx_broadcaster == null ? 0 : arg_tx_broadcaster.ptr, arg_logger == null ? 0 : arg_logger.ptr, arg_default_config == null ? 0 : arg_default_config.ptr & ~1, Arrays.stream(arg_channel_monitors).map(arg_channel_monitors_conv_16 -> arg_channel_monitors_conv_16 == null ? 0 : arg_channel_monitors_conv_16.ptr & ~1).toArray(number[]::new)));
		Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(arg_keys_manager);
		ret_hu_conv.ptrs_to.add(arg_fee_estimator);
		ret_hu_conv.ptrs_to.add(arg_chain_monitor);
		ret_hu_conv.ptrs_to.add(arg_tx_broadcaster);
		ret_hu_conv.ptrs_to.add(arg_logger);
		ret_hu_conv.ptrs_to.add(arg_default_config);
		/* TODO 2 ChannelMonitor  */;
		return ret_hu_conv;
	}

	public static Result_InvoiceSignOrCreationErrorZ constructor_invoice_from_channelmanager(ChannelManager channelmanager, KeysInterface keys_manager, LDKCurrency network, Option_u64Z amt_msat, String description) {
		number ret = bindings.create_invoice_from_channelmanager(channelmanager == null ? 0 : channelmanager.ptr & ~1, keys_manager == null ? 0 : keys_manager.ptr, network, amt_msat.ptr, description);
		Result_InvoiceSignOrCreationErrorZ ret_hu_conv = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(channelmanager);
		ret_hu_conv.ptrs_to.add(keys_manager);
		return ret_hu_conv;
	}

	public static Result_SiPrefixNoneZ constructor_from_str(String s) {
		number ret = bindings.SiPrefix_from_str(s);
		Result_SiPrefixNoneZ ret_hu_conv = Result_SiPrefixNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

