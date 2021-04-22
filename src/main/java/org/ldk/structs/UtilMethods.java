package org.ldk.structs;
import org.ldk.impl.bindings;
import java.util.Arrays;
import org.ldk.enums.*;

public class UtilMethods {
	/**
	 * Read a C2Tuple_BlockHashChannelMonitorZ from a byte array, created by C2Tuple_BlockHashChannelMonitorZ_write
	 */
	public static Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ constructor_BlockHashChannelMonitorZ_read(byte[] ser, KeysInterface arg) {
		long ret = bindings.C2Tuple_BlockHashChannelMonitorZ_read(ser, arg == null ? 0 : arg.ptr);
		Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(arg);
		return ret_hu_conv;
	}

	/**
	 * Read a C2Tuple_BlockHashChannelManagerZ from a byte array, created by C2Tuple_BlockHashChannelManagerZ_write
	 */
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

	/**
	 * Utility to construct an invoice. Generally, unless you want to do something like a custom
	 * cltv_expiry, this is what you should be using to create an invoice. The reason being, this
	 * method stores the invoice's payment secret and preimage in `ChannelManager`, so (a) the user
	 * doesn't have to store preimage/payment secret information and (b) `ChannelManager` can verify
	 * that the payment secret is valid when the invoice is paid.
	 */
	public static Result_InvoiceSignOrCreationErrorZ constructor_invoice_from_channelmanager(ChannelManager channelmanager, KeysInterface keys_manager, LDKCurrency network, Option_u64Z amt_msat, String description) {
		long ret = bindings.create_invoice_from_channelmanager(channelmanager == null ? 0 : channelmanager.ptr & ~1, keys_manager == null ? 0 : keys_manager.ptr, network, amt_msat.ptr, description);
		Result_InvoiceSignOrCreationErrorZ ret_hu_conv = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(channelmanager);
		ret_hu_conv.ptrs_to.add(keys_manager);
		return ret_hu_conv;
	}

	/**
	 * Read a SiPrefix object from a string
	 */
	public static Result_SiPrefixNoneZ constructor_from_str(String s) {
		long ret = bindings.SiPrefix_from_str(s);
		Result_SiPrefixNoneZ ret_hu_conv = Result_SiPrefixNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}