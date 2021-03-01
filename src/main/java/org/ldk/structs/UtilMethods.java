package org.ldk.structs;
import org.ldk.impl.bindings;
import java.util.Arrays;

public class UtilMethods {
	public static Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ constructor_BlockHashChannelMonitorZ_read(byte[] ser, KeysInterface arg) {
		long ret = bindings.C2Tuple_BlockHashChannelMonitorZ_read(ser, arg == null ? 0 : arg.ptr);
		Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(arg);
		return ret_hu_conv;
	}

	public static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ constructor_BlockHashChannelManagerZ_read(byte[] ser, KeysInterface arg_keys_manager, FeeEstimator arg_fee_estimator, Watch arg_chain_monitor, BroadcasterInterface arg_tx_broadcaster, Logger arg_logger, UserConfig arg_default_config, ChannelMonitor[] arg_channel_monitors) {
		long ret = bindings.C2Tuple_BlockHashChannelManagerZ_read(ser, bindings.ChannelManagerReadArgs_new(arg_keys_manager == null ? 0 : arg_keys_manager.ptr, arg_fee_estimator == null ? 0 : arg_fee_estimator.ptr, arg_chain_monitor == null ? 0 : arg_chain_monitor.ptr, arg_tx_broadcaster == null ? 0 : arg_tx_broadcaster.ptr, arg_logger == null ? 0 : arg_logger.ptr, arg_default_config == null ? 0 : arg_default_config.ptr & ~1, Arrays.stream(arg_channel_monitors).mapToLong(arg_channel_monitors_conv_16 -> arg_channel_monitors_conv_16 == null ? 0 : arg_channel_monitors_conv_16.ptr & ~1).toArray()));
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

}