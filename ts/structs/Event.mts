import { TxOut } from '../structs/TxOut.mjs';
import { Address } from '../structs/Address.mjs';
import { TxIn } from '../structs/TxIn.mjs';
import { BigEndianScalar } from '../structs/BigEndianScalar.mjs';
import { WitnessProgram } from '../structs/WitnessProgram.mjs';
import { BalanceSource } from '../enums/BalanceSource.mjs';
import { BlindedFailure } from '../enums/BlindedFailure.mjs';
import { Bolt11SemanticError } from '../enums/Bolt11SemanticError.mjs';
import { Bolt12SemanticError } from '../enums/Bolt12SemanticError.mjs';
import { COption_NoneZ } from '../enums/COption_NoneZ.mjs';
import { ChannelMonitorUpdateStatus } from '../enums/ChannelMonitorUpdateStatus.mjs';
import { ChannelShutdownState } from '../enums/ChannelShutdownState.mjs';
import { ConfirmationTarget } from '../enums/ConfirmationTarget.mjs';
import { CreationError } from '../enums/CreationError.mjs';
import { Currency } from '../enums/Currency.mjs';
import { Direction } from '../enums/Direction.mjs';
import { FundingLockedFlags } from '../enums/FundingLockedFlags.mjs';
import { HTLCClaim } from '../enums/HTLCClaim.mjs';
import { IOError } from '../enums/IOError.mjs';
import { InboundHTLCStateDetails } from '../enums/InboundHTLCStateDetails.mjs';
import { Level } from '../enums/Level.mjs';
import { Network } from '../enums/Network.mjs';
import { NextFundingFlag } from '../enums/NextFundingFlag.mjs';
import { OutboundHTLCStateDetails } from '../enums/OutboundHTLCStateDetails.mjs';
import { PaymentFailureReason } from '../enums/PaymentFailureReason.mjs';
import { Recipient } from '../enums/Recipient.mjs';
import { RetryableSendFailure } from '../enums/RetryableSendFailure.mjs';
import { Secp256k1Error } from '../enums/Secp256k1Error.mjs';
import { ShortChannelIdError } from '../enums/ShortChannelIdError.mjs';
import { SiPrefix } from '../enums/SiPrefix.mjs';
import { SocketAddressParseError } from '../enums/SocketAddressParseError.mjs';
import { UtxoLookupError } from '../enums/UtxoLookupError.mjs';
import { Option_AddressZ, Option_AddressZ_Some, Option_AddressZ_None } from '../structs/Option_AddressZ.mjs';
import { Bech32Error, Bech32Error_MissingSeparator, Bech32Error_InvalidChecksum, Bech32Error_InvalidLength, Bech32Error_InvalidChar, Bech32Error_InvalidData, Bech32Error_InvalidPadding, Bech32Error_MixedCase } from '../structs/Bech32Error.mjs';
import { RefundMaybeWithDerivedMetadataBuilder } from '../structs/RefundMaybeWithDerivedMetadataBuilder.mjs';
import { Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ } from '../structs/Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ.mjs';
import { Refund } from '../structs/Refund.mjs';
import { Result_RefundBolt12SemanticErrorZ } from '../structs/Result_RefundBolt12SemanticErrorZ.mjs';
import { Option_u64Z, Option_u64Z_Some, Option_u64Z_None } from '../structs/Option_u64Z.mjs';
import { BlindedMessagePath } from '../structs/BlindedMessagePath.mjs';
import { DecodeError, DecodeError_UnknownVersion, DecodeError_UnknownRequiredFeature, DecodeError_InvalidValue, DecodeError_ShortRead, DecodeError_BadLengthDescriptor, DecodeError_Io, DecodeError_UnsupportedCompression, DecodeError_DangerousValue } from '../structs/DecodeError.mjs';
import { Result_RefundDecodeErrorZ } from '../structs/Result_RefundDecodeErrorZ.mjs';
import { Bolt12ParseError } from '../structs/Bolt12ParseError.mjs';
import { Result_RefundBolt12ParseErrorZ } from '../structs/Result_RefundBolt12ParseErrorZ.mjs';
import { Retry, Retry_Attempts } from '../structs/Retry.mjs';
import { Result_RetryDecodeErrorZ } from '../structs/Result_RetryDecodeErrorZ.mjs';
import { Option_ThirtyTwoBytesZ, Option_ThirtyTwoBytesZ_Some, Option_ThirtyTwoBytesZ_None } from '../structs/Option_ThirtyTwoBytesZ.mjs';
import { Option_CVec_u8ZZ, Option_CVec_u8ZZ_Some, Option_CVec_u8ZZ_None } from '../structs/Option_CVec_u8ZZ.mjs';
import { RecipientOnionFields } from '../structs/RecipientOnionFields.mjs';
import { Result_RecipientOnionFieldsDecodeErrorZ } from '../structs/Result_RecipientOnionFieldsDecodeErrorZ.mjs';
import { TwoTuple_u64CVec_u8ZZ } from '../structs/TwoTuple_u64CVec_u8ZZ.mjs';
import { Result_RecipientOnionFieldsNoneZ } from '../structs/Result_RecipientOnionFieldsNoneZ.mjs';
import { DNSSECQuery } from '../structs/DNSSECQuery.mjs';
import { DNSSECProof } from '../structs/DNSSECProof.mjs';
import { DNSResolverMessage, DNSResolverMessage_DNSSECQuery, DNSResolverMessage_DNSSECProof } from '../structs/DNSResolverMessage.mjs';
import { ResponseInstruction } from '../structs/ResponseInstruction.mjs';
import { TwoTuple_DNSResolverMessageResponseInstructionZ } from '../structs/TwoTuple_DNSResolverMessageResponseInstructionZ.mjs';
import { Option_C2Tuple_DNSResolverMessageResponseInstructionZZ, Option_C2Tuple_DNSResolverMessageResponseInstructionZZ_Some, Option_C2Tuple_DNSResolverMessageResponseInstructionZZ_None } from '../structs/Option_C2Tuple_DNSResolverMessageResponseInstructionZZ.mjs';
import { Destination, Destination_Node, Destination_BlindedPath } from '../structs/Destination.mjs';
import { Nonce } from '../structs/Nonce.mjs';
import { OffersContext, OffersContext_InvoiceRequest, OffersContext_StaticInvoiceRequested, OffersContext_OutboundPayment, OffersContext_InboundPayment } from '../structs/OffersContext.mjs';
import { OfferId } from '../structs/OfferId.mjs';
import { AsyncPaymentsContext, AsyncPaymentsContext_OfferPathsRequest, AsyncPaymentsContext_OfferPaths, AsyncPaymentsContext_ServeStaticInvoice, AsyncPaymentsContext_StaticInvoicePersisted, AsyncPaymentsContext_OutboundPayment, AsyncPaymentsContext_InboundPayment, AsyncPaymentsContext_ReleaseHeldHtlc } from '../structs/AsyncPaymentsContext.mjs';
import { DNSResolverContext } from '../structs/DNSResolverContext.mjs';
import { MessageContext, MessageContext_Offers, MessageContext_AsyncPayments, MessageContext_DNSResolver, MessageContext_Custom } from '../structs/MessageContext.mjs';
import { MessageSendInstructions, MessageSendInstructions_WithSpecifiedReplyPath, MessageSendInstructions_WithReplyPath, MessageSendInstructions_WithoutReplyPath, MessageSendInstructions_ForReply, MessageSendInstructions_ForwardedMessage } from '../structs/MessageSendInstructions.mjs';
import { TwoTuple_DNSResolverMessageMessageSendInstructionsZ } from '../structs/TwoTuple_DNSResolverMessageMessageSendInstructionsZ.mjs';
import { Result_DNSResolverMessageDecodeErrorZ } from '../structs/Result_DNSResolverMessageDecodeErrorZ.mjs';
import { HumanReadableName } from '../structs/HumanReadableName.mjs';
import { Result_HumanReadableNameNoneZ } from '../structs/Result_HumanReadableNameNoneZ.mjs';
import { Result_HumanReadableNameDecodeErrorZ } from '../structs/Result_HumanReadableNameDecodeErrorZ.mjs';
import { TwoTuple_DNSSECQueryDNSResolverContextZ } from '../structs/TwoTuple_DNSSECQueryDNSResolverContextZ.mjs';
import { Result_C2Tuple_DNSSECQueryDNSResolverContextZNoneZ } from '../structs/Result_C2Tuple_DNSSECQueryDNSResolverContextZNoneZ.mjs';
import { TwoTuple_HumanReadableNameThirtyTwoBytesZ } from '../structs/TwoTuple_HumanReadableNameThirtyTwoBytesZ.mjs';
import { Offer } from '../structs/Offer.mjs';
import { TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ } from '../structs/TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ.mjs';
import { Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ, Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_Some, Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_None } from '../structs/Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ.mjs';
import { TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZ } from '../structs/TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZ.mjs';
import { Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZZ, Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZZ_Some, Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZZ_None } from '../structs/Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZZ.mjs';
import { UnsignedBolt12Invoice } from '../structs/UnsignedBolt12Invoice.mjs';
import { Result_UnsignedBolt12InvoiceBolt12SemanticErrorZ } from '../structs/Result_UnsignedBolt12InvoiceBolt12SemanticErrorZ.mjs';
import { Bolt12Invoice } from '../structs/Bolt12Invoice.mjs';
import { Result_Bolt12InvoiceBolt12SemanticErrorZ } from '../structs/Result_Bolt12InvoiceBolt12SemanticErrorZ.mjs';
import { Result_SchnorrSignatureNoneZ } from '../structs/Result_SchnorrSignatureNoneZ.mjs';
import { BlindedPaymentPath } from '../structs/BlindedPaymentPath.mjs';
import { Option_CVec_ThirtyTwoBytesZZ, Option_CVec_ThirtyTwoBytesZZ_Some, Option_CVec_ThirtyTwoBytesZZ_None } from '../structs/Option_CVec_ThirtyTwoBytesZZ.mjs';
import { CurrencyCode } from '../structs/CurrencyCode.mjs';
import { Amount, Amount_Bitcoin, Amount_Currency } from '../structs/Amount.mjs';
import { Option_AmountZ, Option_AmountZ_Some, Option_AmountZ_None } from '../structs/Option_AmountZ.mjs';
import { Quantity, Quantity_Bounded, Quantity_Unbounded, Quantity_One } from '../structs/Quantity.mjs';
import { Option_QuantityZ, Option_QuantityZ_Some, Option_QuantityZ_None } from '../structs/Option_QuantityZ.mjs';
import { Result_ThirtyTwoBytesNoneZ } from '../structs/Result_ThirtyTwoBytesNoneZ.mjs';
import { Result_Bolt12InvoiceDecodeErrorZ } from '../structs/Result_Bolt12InvoiceDecodeErrorZ.mjs';
import { DelayedPaymentOutputDescriptor } from '../structs/DelayedPaymentOutputDescriptor.mjs';
import { Result_DelayedPaymentOutputDescriptorDecodeErrorZ } from '../structs/Result_DelayedPaymentOutputDescriptorDecodeErrorZ.mjs';
import { StaticPaymentOutputDescriptor } from '../structs/StaticPaymentOutputDescriptor.mjs';
import { Result_StaticPaymentOutputDescriptorDecodeErrorZ } from '../structs/Result_StaticPaymentOutputDescriptorDecodeErrorZ.mjs';
import { OutPoint } from '../structs/OutPoint.mjs';
import { SpendableOutputDescriptor, SpendableOutputDescriptor_StaticOutput, SpendableOutputDescriptor_DelayedPaymentOutput, SpendableOutputDescriptor_StaticPaymentOutput } from '../structs/SpendableOutputDescriptor.mjs';
import { Result_SpendableOutputDescriptorDecodeErrorZ } from '../structs/Result_SpendableOutputDescriptorDecodeErrorZ.mjs';
import { Option_u32Z, Option_u32Z_Some, Option_u32Z_None } from '../structs/Option_u32Z.mjs';
import { TwoTuple_CVec_u8Zu64Z } from '../structs/TwoTuple_CVec_u8Zu64Z.mjs';
import { Result_C2Tuple_CVec_u8Zu64ZNoneZ } from '../structs/Result_C2Tuple_CVec_u8Zu64ZNoneZ.mjs';
import { ChannelDerivationParameters } from '../structs/ChannelDerivationParameters.mjs';
import { Result_ChannelDerivationParametersDecodeErrorZ } from '../structs/Result_ChannelDerivationParametersDecodeErrorZ.mjs';
import { HTLCDescriptor } from '../structs/HTLCDescriptor.mjs';
import { Result_HTLCDescriptorDecodeErrorZ } from '../structs/Result_HTLCDescriptorDecodeErrorZ.mjs';
import { Result_PublicKeyNoneZ } from '../structs/Result_PublicKeyNoneZ.mjs';
import { Result__u832NoneZ } from '../structs/Result__u832NoneZ.mjs';
import { Result_NoneNoneZ } from '../structs/Result_NoneNoneZ.mjs';
import { Option_BigEndianScalarZ, Option_BigEndianScalarZ_Some, Option_BigEndianScalarZ_None } from '../structs/Option_BigEndianScalarZ.mjs';
import { Result_RecoverableSignatureNoneZ } from '../structs/Result_RecoverableSignatureNoneZ.mjs';
import { Result_ECDSASignatureNoneZ } from '../structs/Result_ECDSASignatureNoneZ.mjs';
import { Result_StrNoneZ } from '../structs/Result_StrNoneZ.mjs';
import { Result_TransactionNoneZ } from '../structs/Result_TransactionNoneZ.mjs';
import { Result_CVec_u8ZNoneZ } from '../structs/Result_CVec_u8ZNoneZ.mjs';
import { ShutdownScript } from '../structs/ShutdownScript.mjs';
import { Result_ShutdownScriptNoneZ } from '../structs/Result_ShutdownScriptNoneZ.mjs';
import { Result_WitnessNoneZ } from '../structs/Result_WitnessNoneZ.mjs';
import { TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ } from '../structs/TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ.mjs';
import { Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ } from '../structs/Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ.mjs';
import { ChannelDetails } from '../structs/ChannelDetails.mjs';
import { Route } from '../structs/Route.mjs';
import { Result_RouteStrZ } from '../structs/Result_RouteStrZ.mjs';
import { Result_CVec_BlindedPaymentPathZNoneZ } from '../structs/Result_CVec_BlindedPaymentPathZNoneZ.mjs';
import { InFlightHtlcs } from '../structs/InFlightHtlcs.mjs';
import { Result_InFlightHtlcsDecodeErrorZ } from '../structs/Result_InFlightHtlcsDecodeErrorZ.mjs';
import { RouteHop } from '../structs/RouteHop.mjs';
import { Result_RouteHopDecodeErrorZ } from '../structs/Result_RouteHopDecodeErrorZ.mjs';
import { TrampolineHop } from '../structs/TrampolineHop.mjs';
import { Result_TrampolineHopDecodeErrorZ } from '../structs/Result_TrampolineHopDecodeErrorZ.mjs';
import { BlindedHop } from '../structs/BlindedHop.mjs';
import { BlindedTail } from '../structs/BlindedTail.mjs';
import { Result_BlindedTailDecodeErrorZ } from '../structs/Result_BlindedTailDecodeErrorZ.mjs';
import { Path } from '../structs/Path.mjs';
import { Result_RouteDecodeErrorZ } from '../structs/Result_RouteDecodeErrorZ.mjs';
import { RouteParameters } from '../structs/RouteParameters.mjs';
import { Result_RouteParametersDecodeErrorZ } from '../structs/Result_RouteParametersDecodeErrorZ.mjs';
import { PaymentParameters } from '../structs/PaymentParameters.mjs';
import { Result_PaymentParametersDecodeErrorZ } from '../structs/Result_PaymentParametersDecodeErrorZ.mjs';
import { RouteParametersConfig } from '../structs/RouteParametersConfig.mjs';
import { Result_RouteParametersConfigDecodeErrorZ } from '../structs/Result_RouteParametersConfigDecodeErrorZ.mjs';
import { RouteHint } from '../structs/RouteHint.mjs';
import { Result_RouteHintDecodeErrorZ } from '../structs/Result_RouteHintDecodeErrorZ.mjs';
import { RouteHintHop } from '../structs/RouteHintHop.mjs';
import { Result_RouteHintHopDecodeErrorZ } from '../structs/Result_RouteHintHopDecodeErrorZ.mjs';
import { FixedPenaltyScorer } from '../structs/FixedPenaltyScorer.mjs';
import { Result_FixedPenaltyScorerDecodeErrorZ } from '../structs/Result_FixedPenaltyScorerDecodeErrorZ.mjs';
import { ChannelLiquidities } from '../structs/ChannelLiquidities.mjs';
import { Result_ChannelLiquiditiesDecodeErrorZ } from '../structs/Result_ChannelLiquiditiesDecodeErrorZ.mjs';
import { NodeId } from '../structs/NodeId.mjs';
import { TwoTuple_u64u64Z } from '../structs/TwoTuple_u64u64Z.mjs';
import { Option_C2Tuple_u64u64ZZ, Option_C2Tuple_u64u64ZZ_Some, Option_C2Tuple_u64u64ZZ_None } from '../structs/Option_C2Tuple_u64u64ZZ.mjs';
import { TwoTuple_Z } from '../structs/TwoTuple_Z.mjs';
import { TwoTuple__u1632_u1632Z } from '../structs/TwoTuple__u1632_u1632Z.mjs';
import { Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ, Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_Some, Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_None } from '../structs/Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.mjs';
import { Option_f64Z, Option_f64Z_Some, Option_f64Z_None } from '../structs/Option_f64Z.mjs';
import { Record } from '../structs/Record.mjs';
import { Logger, LoggerInterface } from '../structs/Logger.mjs';
import { NetworkGraph } from '../structs/NetworkGraph.mjs';
import { ProbabilisticScorer } from '../structs/ProbabilisticScorer.mjs';
import { Result_ProbabilisticScorerDecodeErrorZ } from '../structs/Result_ProbabilisticScorerDecodeErrorZ.mjs';
import { BestBlock } from '../structs/BestBlock.mjs';
import { Result_BestBlockDecodeErrorZ } from '../structs/Result_BestBlockDecodeErrorZ.mjs';
import { TwoTuple_usizeTransactionZ } from '../structs/TwoTuple_usizeTransactionZ.mjs';
import { ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ } from '../structs/ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ.mjs';
import { Result_ChannelMonitorUpdateStatusNoneZ } from '../structs/Result_ChannelMonitorUpdateStatusNoneZ.mjs';
import { HTLCUpdate } from '../structs/HTLCUpdate.mjs';
import { UntrustedString } from '../structs/UntrustedString.mjs';
import { Option_boolZ, Option_boolZ_Some, Option_boolZ_None } from '../structs/Option_boolZ.mjs';
import { ClosureReason, ClosureReason_CounterpartyForceClosed, ClosureReason_HolderForceClosed, ClosureReason_LegacyCooperativeClosure, ClosureReason_CounterpartyInitiatedCooperativeClosure, ClosureReason_LocallyInitiatedCooperativeClosure, ClosureReason_CommitmentTxConfirmed, ClosureReason_FundingTimedOut, ClosureReason_ProcessingError, ClosureReason_DisconnectedPeer, ClosureReason_OutdatedChannelManager, ClosureReason_CounterpartyCoopClosedUnfundedChannel, ClosureReason_LocallyCoopClosedUnfundedChannel, ClosureReason_FundingBatchClosure, ClosureReason_HTLCsTimedOut, ClosureReason_PeerFeerateTooLow } from '../structs/ClosureReason.mjs';
import { ChannelId } from '../structs/ChannelId.mjs';
import { MonitorEvent, MonitorEvent_HTLCEvent, MonitorEvent_HolderForceClosedWithInfo, MonitorEvent_HolderForceClosed, MonitorEvent_CommitmentTxConfirmed, MonitorEvent_Completed } from '../structs/MonitorEvent.mjs';
import { FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ } from '../structs/FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ.mjs';
import { Result_OfferIdDecodeErrorZ } from '../structs/Result_OfferIdDecodeErrorZ.mjs';
import { Result_NoneBolt12SemanticErrorZ } from '../structs/Result_NoneBolt12SemanticErrorZ.mjs';
import { Result_OfferBolt12SemanticErrorZ } from '../structs/Result_OfferBolt12SemanticErrorZ.mjs';
import { InvoiceRequestWithDerivedPayerSigningPubkeyBuilder } from '../structs/InvoiceRequestWithDerivedPayerSigningPubkeyBuilder.mjs';
import { Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ } from '../structs/Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ.mjs';
import { Result_OfferDecodeErrorZ } from '../structs/Result_OfferDecodeErrorZ.mjs';
import { CurrencyCodeError } from '../structs/CurrencyCodeError.mjs';
import { Result_CurrencyCodeCurrencyCodeErrorZ } from '../structs/Result_CurrencyCodeCurrencyCodeErrorZ.mjs';
import { Result_OfferBolt12ParseErrorZ } from '../structs/Result_OfferBolt12ParseErrorZ.mjs';
import { HTLCOutputInCommitment } from '../structs/HTLCOutputInCommitment.mjs';
import { Utxo } from '../structs/Utxo.mjs';
import { Result_UtxoDecodeErrorZ } from '../structs/Result_UtxoDecodeErrorZ.mjs';
import { Option_TxOutZ, Option_TxOutZ_Some, Option_TxOutZ_None } from '../structs/Option_TxOutZ.mjs';
import { Result_u64ShortChannelIdErrorZ } from '../structs/Result_u64ShortChannelIdErrorZ.mjs';
import { PendingHTLCInfo } from '../structs/PendingHTLCInfo.mjs';
import { InboundHTLCErr } from '../structs/InboundHTLCErr.mjs';
import { Result_PendingHTLCInfoInboundHTLCErrZ } from '../structs/Result_PendingHTLCInfoInboundHTLCErrZ.mjs';
import { Result_CVec_UtxoZNoneZ } from '../structs/Result_CVec_UtxoZNoneZ.mjs';
import { Input } from '../structs/Input.mjs';
import { CoinSelection } from '../structs/CoinSelection.mjs';
import { Result_CoinSelectionNoneZ } from '../structs/Result_CoinSelectionNoneZ.mjs';
import { Result_NodeIdDecodeErrorZ } from '../structs/Result_NodeIdDecodeErrorZ.mjs';
import { Result_PublicKeySecp256k1ErrorZ } from '../structs/Result_PublicKeySecp256k1ErrorZ.mjs';
import { NetworkUpdate, NetworkUpdate_ChannelFailure, NetworkUpdate_NodeFailure } from '../structs/NetworkUpdate.mjs';
import { Option_NetworkUpdateZ, Option_NetworkUpdateZ_Some, Option_NetworkUpdateZ_None } from '../structs/Option_NetworkUpdateZ.mjs';
import { Result_COption_NetworkUpdateZDecodeErrorZ } from '../structs/Result_COption_NetworkUpdateZDecodeErrorZ.mjs';
import { Result_TxOutUtxoLookupErrorZ } from '../structs/Result_TxOutUtxoLookupErrorZ.mjs';
import { UtxoFuture } from '../structs/UtxoFuture.mjs';
import { UtxoResult, UtxoResult_Sync, UtxoResult_Async } from '../structs/UtxoResult.mjs';
import { UtxoLookup, UtxoLookupInterface } from '../structs/UtxoLookup.mjs';
import { Option_UtxoLookupZ, Option_UtxoLookupZ_Some, Option_UtxoLookupZ_None } from '../structs/Option_UtxoLookupZ.mjs';
import { LightningError } from '../structs/LightningError.mjs';
import { Result_NoneLightningErrorZ } from '../structs/Result_NoneLightningErrorZ.mjs';
import { Result_boolLightningErrorZ } from '../structs/Result_boolLightningErrorZ.mjs';
import { ChannelAnnouncement } from '../structs/ChannelAnnouncement.mjs';
import { ChannelUpdate } from '../structs/ChannelUpdate.mjs';
import { ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ } from '../structs/ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ.mjs';
import { Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ, Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_Some, Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_None } from '../structs/Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.mjs';
import { AcceptChannel } from '../structs/AcceptChannel.mjs';
import { AcceptChannelV2 } from '../structs/AcceptChannelV2.mjs';
import { OpenChannel } from '../structs/OpenChannel.mjs';
import { OpenChannelV2 } from '../structs/OpenChannelV2.mjs';
import { FundingCreated } from '../structs/FundingCreated.mjs';
import { FundingSigned } from '../structs/FundingSigned.mjs';
import { Stfu } from '../structs/Stfu.mjs';
import { SpliceInit } from '../structs/SpliceInit.mjs';
import { SpliceAck } from '../structs/SpliceAck.mjs';
import { SpliceLocked } from '../structs/SpliceLocked.mjs';
import { TxAddInput } from '../structs/TxAddInput.mjs';
import { TxAddOutput } from '../structs/TxAddOutput.mjs';
import { TxRemoveInput } from '../structs/TxRemoveInput.mjs';
import { TxRemoveOutput } from '../structs/TxRemoveOutput.mjs';
import { TxComplete } from '../structs/TxComplete.mjs';
import { TxSignatures } from '../structs/TxSignatures.mjs';
import { TxInitRbf } from '../structs/TxInitRbf.mjs';
import { TxAckRbf } from '../structs/TxAckRbf.mjs';
import { TxAbort } from '../structs/TxAbort.mjs';
import { ChannelReady } from '../structs/ChannelReady.mjs';
import { AnnouncementSignatures } from '../structs/AnnouncementSignatures.mjs';
import { CommitmentUpdate } from '../structs/CommitmentUpdate.mjs';
import { RevokeAndACK } from '../structs/RevokeAndACK.mjs';
import { ClosingSigned } from '../structs/ClosingSigned.mjs';
import { ClosingComplete } from '../structs/ClosingComplete.mjs';
import { ClosingSig } from '../structs/ClosingSig.mjs';
import { Shutdown } from '../structs/Shutdown.mjs';
import { ChannelReestablish } from '../structs/ChannelReestablish.mjs';
import { NodeAnnouncement } from '../structs/NodeAnnouncement.mjs';
import { ErrorMessage } from '../structs/ErrorMessage.mjs';
import { WarningMessage } from '../structs/WarningMessage.mjs';
import { ErrorAction, ErrorAction_DisconnectPeer, ErrorAction_DisconnectPeerWithWarning, ErrorAction_IgnoreError, ErrorAction_IgnoreAndLog, ErrorAction_IgnoreDuplicateGossip, ErrorAction_SendErrorMessage, ErrorAction_SendWarningMessage } from '../structs/ErrorAction.mjs';
import { QueryChannelRange } from '../structs/QueryChannelRange.mjs';
import { QueryShortChannelIds } from '../structs/QueryShortChannelIds.mjs';
import { ReplyChannelRange } from '../structs/ReplyChannelRange.mjs';
import { GossipTimestampFilter } from '../structs/GossipTimestampFilter.mjs';
import { PeerStorage } from '../structs/PeerStorage.mjs';
import { PeerStorageRetrieval } from '../structs/PeerStorageRetrieval.mjs';
import { MessageSendEvent, MessageSendEvent_SendAcceptChannel, MessageSendEvent_SendAcceptChannelV2, MessageSendEvent_SendOpenChannel, MessageSendEvent_SendOpenChannelV2, MessageSendEvent_SendFundingCreated, MessageSendEvent_SendFundingSigned, MessageSendEvent_SendStfu, MessageSendEvent_SendSpliceInit, MessageSendEvent_SendSpliceAck, MessageSendEvent_SendSpliceLocked, MessageSendEvent_SendTxAddInput, MessageSendEvent_SendTxAddOutput, MessageSendEvent_SendTxRemoveInput, MessageSendEvent_SendTxRemoveOutput, MessageSendEvent_SendTxComplete, MessageSendEvent_SendTxSignatures, MessageSendEvent_SendTxInitRbf, MessageSendEvent_SendTxAckRbf, MessageSendEvent_SendTxAbort, MessageSendEvent_SendChannelReady, MessageSendEvent_SendAnnouncementSignatures, MessageSendEvent_UpdateHTLCs, MessageSendEvent_SendRevokeAndACK, MessageSendEvent_SendClosingSigned, MessageSendEvent_SendClosingComplete, MessageSendEvent_SendClosingSig, MessageSendEvent_SendShutdown, MessageSendEvent_SendChannelReestablish, MessageSendEvent_SendChannelAnnouncement, MessageSendEvent_BroadcastChannelAnnouncement, MessageSendEvent_BroadcastChannelUpdate, MessageSendEvent_BroadcastNodeAnnouncement, MessageSendEvent_SendChannelUpdate, MessageSendEvent_HandleError, MessageSendEvent_SendChannelRangeQuery, MessageSendEvent_SendShortIdsQuery, MessageSendEvent_SendReplyChannelRange, MessageSendEvent_SendGossipTimestampFilter, MessageSendEvent_SendPeerStorage, MessageSendEvent_SendPeerStorageRetrieval } from '../structs/MessageSendEvent.mjs';
import { ChannelUpdateInfo } from '../structs/ChannelUpdateInfo.mjs';
import { Result_ChannelUpdateInfoDecodeErrorZ } from '../structs/Result_ChannelUpdateInfoDecodeErrorZ.mjs';
import { ChannelInfo } from '../structs/ChannelInfo.mjs';
import { Result_ChannelInfoDecodeErrorZ } from '../structs/Result_ChannelInfoDecodeErrorZ.mjs';
import { RoutingFees } from '../structs/RoutingFees.mjs';
import { Result_RoutingFeesDecodeErrorZ } from '../structs/Result_RoutingFeesDecodeErrorZ.mjs';
import { Hostname } from '../structs/Hostname.mjs';
import { SocketAddress, SocketAddress_TcpIpV4, SocketAddress_TcpIpV6, SocketAddress_OnionV2, SocketAddress_OnionV3, SocketAddress_Hostname } from '../structs/SocketAddress.mjs';
import { NodeAnnouncementDetails } from '../structs/NodeAnnouncementDetails.mjs';
import { NodeAnnouncementInfo, NodeAnnouncementInfo_Relayed, NodeAnnouncementInfo_Local } from '../structs/NodeAnnouncementInfo.mjs';
import { Result_NodeAnnouncementInfoDecodeErrorZ } from '../structs/Result_NodeAnnouncementInfoDecodeErrorZ.mjs';
import { NodeAlias } from '../structs/NodeAlias.mjs';
import { Result_NodeAliasDecodeErrorZ } from '../structs/Result_NodeAliasDecodeErrorZ.mjs';
import { Option_NodeAnnouncementInfoZ, Option_NodeAnnouncementInfoZ_Some, Option_NodeAnnouncementInfoZ_None } from '../structs/Option_NodeAnnouncementInfoZ.mjs';
import { NodeInfo } from '../structs/NodeInfo.mjs';
import { Result_NodeInfoDecodeErrorZ } from '../structs/Result_NodeInfoDecodeErrorZ.mjs';
import { Result_NetworkGraphDecodeErrorZ } from '../structs/Result_NetworkGraphDecodeErrorZ.mjs';
import { Option_CVec_SocketAddressZZ, Option_CVec_SocketAddressZZ_Some, Option_CVec_SocketAddressZZ_None } from '../structs/Option_CVec_SocketAddressZZ.mjs';
import { Bolt12OfferContext } from '../structs/Bolt12OfferContext.mjs';
import { AsyncBolt12OfferContext } from '../structs/AsyncBolt12OfferContext.mjs';
import { Bolt12RefundContext } from '../structs/Bolt12RefundContext.mjs';
import { PaymentContext, PaymentContext_Bolt12Offer, PaymentContext_AsyncBolt12Offer, PaymentContext_Bolt12Refund } from '../structs/PaymentContext.mjs';
import { Option_PaymentContextZ, Option_PaymentContextZ_Some, Option_PaymentContextZ_None } from '../structs/Option_PaymentContextZ.mjs';
import { Option_StrZ, Option_StrZ_Some, Option_StrZ_None } from '../structs/Option_StrZ.mjs';
import { TwoTuple_u64u16Z } from '../structs/TwoTuple_u64u16Z.mjs';
import { Option_C2Tuple_u64u16ZZ, Option_C2Tuple_u64u16ZZ_Some, Option_C2Tuple_u64u16ZZ_None } from '../structs/Option_C2Tuple_u64u16ZZ.mjs';
import { APIError, APIError_APIMisuseError, APIError_FeeRateTooHigh, APIError_InvalidRoute, APIError_ChannelUnavailable, APIError_MonitorUpdateInProgress, APIError_IncompatibleShutdownScript } from '../structs/APIError.mjs';
import { Result_ChannelIdAPIErrorZ } from '../structs/Result_ChannelIdAPIErrorZ.mjs';
import { RecentPaymentDetails, RecentPaymentDetails_AwaitingInvoice, RecentPaymentDetails_Pending, RecentPaymentDetails_Fulfilled, RecentPaymentDetails_Abandoned } from '../structs/RecentPaymentDetails.mjs';
import { Result_NoneAPIErrorZ } from '../structs/Result_NoneAPIErrorZ.mjs';
import { Result_NoneRetryableSendFailureZ } from '../structs/Result_NoneRetryableSendFailureZ.mjs';
import { Bolt11PaymentError, Bolt11PaymentError_InvalidAmount, Bolt11PaymentError_SendingFailed } from '../structs/Bolt11PaymentError.mjs';
import { Result_NoneBolt11PaymentErrorZ } from '../structs/Result_NoneBolt11PaymentErrorZ.mjs';
import { Option_OffersContextZ, Option_OffersContextZ_Some, Option_OffersContextZ_None } from '../structs/Option_OffersContextZ.mjs';
import { Bolt12PaymentError, Bolt12PaymentError_UnexpectedInvoice, Bolt12PaymentError_DuplicateInvoice, Bolt12PaymentError_UnknownRequiredFeatures, Bolt12PaymentError_SendingFailed, Bolt12PaymentError_BlindedPathCreationFailed } from '../structs/Bolt12PaymentError.mjs';
import { Result_NoneBolt12PaymentErrorZ } from '../structs/Result_NoneBolt12PaymentErrorZ.mjs';
import { Result_ThirtyTwoBytesRetryableSendFailureZ } from '../structs/Result_ThirtyTwoBytesRetryableSendFailureZ.mjs';
import { TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ } from '../structs/TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ.mjs';
import { ProbeSendFailure, ProbeSendFailure_RouteNotFound, ProbeSendFailure_ParameterError, ProbeSendFailure_DuplicateProbe } from '../structs/ProbeSendFailure.mjs';
import { Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ } from '../structs/Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ.mjs';
import { Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ } from '../structs/Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ.mjs';
import { TwoTuple_ChannelIdPublicKeyZ } from '../structs/TwoTuple_ChannelIdPublicKeyZ.mjs';
import { TwoTuple_PublicKeyChannelIdZ } from '../structs/TwoTuple_PublicKeyChannelIdZ.mjs';
import { Option_C2Tuple_PublicKeyChannelIdZZ, Option_C2Tuple_PublicKeyChannelIdZZ_Some, Option_C2Tuple_PublicKeyChannelIdZZ_None } from '../structs/Option_C2Tuple_PublicKeyChannelIdZZ.mjs';
import { Bolt11Invoice } from '../structs/Bolt11Invoice.mjs';
import { SignOrCreationError, SignOrCreationError_SignError, SignOrCreationError_CreationError } from '../structs/SignOrCreationError.mjs';
import { Result_Bolt11InvoiceSignOrCreationErrorZ } from '../structs/Result_Bolt11InvoiceSignOrCreationErrorZ.mjs';
import { Option_u16Z, Option_u16Z_Some, Option_u16Z_None } from '../structs/Option_u16Z.mjs';
import { OfferWithDerivedMetadataBuilder } from '../structs/OfferWithDerivedMetadataBuilder.mjs';
import { Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ } from '../structs/Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ.mjs';
import { Result_OfferNoneZ } from '../structs/Result_OfferNoneZ.mjs';
import { Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ } from '../structs/Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ.mjs';
import { Result_ThirtyTwoBytesAPIErrorZ } from '../structs/Result_ThirtyTwoBytesAPIErrorZ.mjs';
import { Result_CVec_BlindedMessagePathZNoneZ } from '../structs/Result_CVec_BlindedMessagePathZNoneZ.mjs';
import { CommitmentSigned } from '../structs/CommitmentSigned.mjs';
import { InvoiceRequest } from '../structs/InvoiceRequest.mjs';
import { StaticInvoice } from '../structs/StaticInvoice.mjs';
import { InvoiceError } from '../structs/InvoiceError.mjs';
import { OffersMessage, OffersMessage_InvoiceRequest, OffersMessage_Invoice, OffersMessage_StaticInvoice, OffersMessage_InvoiceError } from '../structs/OffersMessage.mjs';
import { TwoTuple_OffersMessageResponseInstructionZ } from '../structs/TwoTuple_OffersMessageResponseInstructionZ.mjs';
import { Option_C2Tuple_OffersMessageResponseInstructionZZ, Option_C2Tuple_OffersMessageResponseInstructionZZ_Some, Option_C2Tuple_OffersMessageResponseInstructionZZ_None } from '../structs/Option_C2Tuple_OffersMessageResponseInstructionZZ.mjs';
import { TwoTuple_OffersMessageMessageSendInstructionsZ } from '../structs/TwoTuple_OffersMessageMessageSendInstructionsZ.mjs';
import { OfferPaths } from '../structs/OfferPaths.mjs';
import { TwoTuple_OfferPathsResponseInstructionZ } from '../structs/TwoTuple_OfferPathsResponseInstructionZ.mjs';
import { Option_C2Tuple_OfferPathsResponseInstructionZZ, Option_C2Tuple_OfferPathsResponseInstructionZZ_Some, Option_C2Tuple_OfferPathsResponseInstructionZZ_None } from '../structs/Option_C2Tuple_OfferPathsResponseInstructionZZ.mjs';
import { ServeStaticInvoice } from '../structs/ServeStaticInvoice.mjs';
import { TwoTuple_ServeStaticInvoiceResponseInstructionZ } from '../structs/TwoTuple_ServeStaticInvoiceResponseInstructionZ.mjs';
import { Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ, Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_Some, Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_None } from '../structs/Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.mjs';
import { ReleaseHeldHtlc } from '../structs/ReleaseHeldHtlc.mjs';
import { TwoTuple_ReleaseHeldHtlcResponseInstructionZ } from '../structs/TwoTuple_ReleaseHeldHtlcResponseInstructionZ.mjs';
import { Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ, Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ_Some, Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ_None } from '../structs/Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ.mjs';
import { OfferPathsRequest } from '../structs/OfferPathsRequest.mjs';
import { StaticInvoicePersisted } from '../structs/StaticInvoicePersisted.mjs';
import { HeldHtlcAvailable } from '../structs/HeldHtlcAvailable.mjs';
import { AsyncPaymentsMessage, AsyncPaymentsMessage_OfferPathsRequest, AsyncPaymentsMessage_OfferPaths, AsyncPaymentsMessage_ServeStaticInvoice, AsyncPaymentsMessage_StaticInvoicePersisted, AsyncPaymentsMessage_HeldHtlcAvailable, AsyncPaymentsMessage_ReleaseHeldHtlc } from '../structs/AsyncPaymentsMessage.mjs';
import { TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ } from '../structs/TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ.mjs';
import { PhantomRouteHints } from '../structs/PhantomRouteHints.mjs';
import { Result_PhantomRouteHintsDecodeErrorZ } from '../structs/Result_PhantomRouteHintsDecodeErrorZ.mjs';
import { BlindedForward } from '../structs/BlindedForward.mjs';
import { Result_BlindedForwardDecodeErrorZ } from '../structs/Result_BlindedForwardDecodeErrorZ.mjs';
import { OnionPacket } from '../structs/OnionPacket.mjs';
import { TrampolineOnionPacket } from '../structs/TrampolineOnionPacket.mjs';
import { FinalOnionHopData } from '../structs/FinalOnionHopData.mjs';
import { PendingHTLCRouting, PendingHTLCRouting_Forward, PendingHTLCRouting_TrampolineForward, PendingHTLCRouting_Receive, PendingHTLCRouting_ReceiveKeysend } from '../structs/PendingHTLCRouting.mjs';
import { Result_PendingHTLCRoutingDecodeErrorZ } from '../structs/Result_PendingHTLCRoutingDecodeErrorZ.mjs';
import { Result_PendingHTLCInfoDecodeErrorZ } from '../structs/Result_PendingHTLCInfoDecodeErrorZ.mjs';
import { Result_BlindedFailureDecodeErrorZ } from '../structs/Result_BlindedFailureDecodeErrorZ.mjs';
import { ChannelTransactionParameters } from '../structs/ChannelTransactionParameters.mjs';
import { CommitmentTransaction } from '../structs/CommitmentTransaction.mjs';
import { HolderCommitmentTransaction } from '../structs/HolderCommitmentTransaction.mjs';
import { ClosingTransaction } from '../structs/ClosingTransaction.mjs';
import { UnsignedChannelAnnouncement } from '../structs/UnsignedChannelAnnouncement.mjs';
import { ChannelPublicKeys } from '../structs/ChannelPublicKeys.mjs';
import { ChannelSigner, ChannelSignerInterface } from '../structs/ChannelSigner.mjs';
import { BaseEcdsaChannelSigner, BaseEcdsaChannelSignerInterface } from '../structs/BaseEcdsaChannelSigner.mjs';
import { EcdsaChannelSigner, EcdsaChannelSignerInterface } from '../structs/EcdsaChannelSigner.mjs';
import { ChannelMonitor } from '../structs/ChannelMonitor.mjs';
import { ChannelMonitorUpdate } from '../structs/ChannelMonitorUpdate.mjs';
import { Watch, WatchInterface } from '../structs/Watch.mjs';
import { BroadcasterInterface, BroadcasterInterfaceInterface } from '../structs/BroadcasterInterface.mjs';
import { EntropySource, EntropySourceInterface } from '../structs/EntropySource.mjs';
import { ExpandedKey } from '../structs/ExpandedKey.mjs';
import { PeerStorageKey } from '../structs/PeerStorageKey.mjs';
import { ReceiveAuthKey } from '../structs/ReceiveAuthKey.mjs';
import { RawBolt11Invoice } from '../structs/RawBolt11Invoice.mjs';
import { UnsignedChannelUpdate } from '../structs/UnsignedChannelUpdate.mjs';
import { UnsignedNodeAnnouncement } from '../structs/UnsignedNodeAnnouncement.mjs';
import { UnsignedGossipMessage, UnsignedGossipMessage_ChannelAnnouncement, UnsignedGossipMessage_ChannelUpdate, UnsignedGossipMessage_NodeAnnouncement } from '../structs/UnsignedGossipMessage.mjs';
import { NodeSigner, NodeSignerInterface } from '../structs/NodeSigner.mjs';
import { SignerProvider, SignerProviderInterface } from '../structs/SignerProvider.mjs';
import { FeeEstimator, FeeEstimatorInterface } from '../structs/FeeEstimator.mjs';
import { ReceiveTlvs } from '../structs/ReceiveTlvs.mjs';
import { Router, RouterInterface } from '../structs/Router.mjs';
import { OnionMessagePath } from '../structs/OnionMessagePath.mjs';
import { Result_OnionMessagePathNoneZ } from '../structs/Result_OnionMessagePathNoneZ.mjs';
import { MessageForwardNode } from '../structs/MessageForwardNode.mjs';
import { MessageRouter, MessageRouterInterface } from '../structs/MessageRouter.mjs';
import { ChannelManager } from '../structs/ChannelManager.mjs';
import { TwoTuple_ThirtyTwoBytesChannelManagerZ } from '../structs/TwoTuple_ThirtyTwoBytesChannelManagerZ.mjs';
import { Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ } from '../structs/Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ.mjs';
import { Result_NoneSecp256k1ErrorZ } from '../structs/Result_NoneSecp256k1ErrorZ.mjs';
import { MaxDustHTLCExposure, MaxDustHTLCExposure_FixedLimitMsat, MaxDustHTLCExposure_FeeRateMultiplier } from '../structs/MaxDustHTLCExposure.mjs';
import { Result_MaxDustHTLCExposureDecodeErrorZ } from '../structs/Result_MaxDustHTLCExposureDecodeErrorZ.mjs';
import { ChannelConfig } from '../structs/ChannelConfig.mjs';
import { Result_ChannelConfigDecodeErrorZ } from '../structs/Result_ChannelConfigDecodeErrorZ.mjs';
import { Option_MaxDustHTLCExposureZ, Option_MaxDustHTLCExposureZ_Some, Option_MaxDustHTLCExposureZ_None } from '../structs/Option_MaxDustHTLCExposureZ.mjs';
import { Option_u8Z, Option_u8Z_Some, Option_u8Z_None } from '../structs/Option_u8Z.mjs';
import { Option_APIErrorZ, Option_APIErrorZ_Some, Option_APIErrorZ_None } from '../structs/Option_APIErrorZ.mjs';
import { Result_COption_APIErrorZDecodeErrorZ } from '../structs/Result_COption_APIErrorZDecodeErrorZ.mjs';
import { EncryptedOurPeerStorage } from '../structs/EncryptedOurPeerStorage.mjs';
import { Result_EncryptedOurPeerStorageNoneZ } from '../structs/Result_EncryptedOurPeerStorageNoneZ.mjs';
import { DecryptedOurPeerStorage } from '../structs/DecryptedOurPeerStorage.mjs';
import { Result_DecryptedOurPeerStorageNoneZ } from '../structs/Result_DecryptedOurPeerStorageNoneZ.mjs';
import { VerifiedInvoiceRequest } from '../structs/VerifiedInvoiceRequest.mjs';
import { InvreqResponseInstructions, InvreqResponseInstructions_SendInvoice, InvreqResponseInstructions_SendStaticInvoice } from '../structs/InvreqResponseInstructions.mjs';
import { Result_InvreqResponseInstructionsNoneZ } from '../structs/Result_InvreqResponseInstructionsNoneZ.mjs';
import { Option_MessageContextZ, Option_MessageContextZ_Some, Option_MessageContextZ_None } from '../structs/Option_MessageContextZ.mjs';
import { TwoTuple_OffersMessageCOption_MessageContextZZ } from '../structs/TwoTuple_OffersMessageCOption_MessageContextZZ.mjs';
import { TwoTuple_OfferboolZ } from '../structs/TwoTuple_OfferboolZ.mjs';
import { Result_C2Tuple_OfferboolZNoneZ } from '../structs/Result_C2Tuple_OfferboolZNoneZ.mjs';
import { TwoTuple_OfferPathsMessageContextZ } from '../structs/TwoTuple_OfferPathsMessageContextZ.mjs';
import { Option_C2Tuple_OfferPathsMessageContextZZ, Option_C2Tuple_OfferPathsMessageContextZZ_Some, Option_C2Tuple_OfferPathsMessageContextZZ_None } from '../structs/Option_C2Tuple_OfferPathsMessageContextZZ.mjs';
import { TwoTuple_ServeStaticInvoiceMessageContextZ } from '../structs/TwoTuple_ServeStaticInvoiceMessageContextZ.mjs';
import { Option_C2Tuple_ServeStaticInvoiceMessageContextZZ, Option_C2Tuple_ServeStaticInvoiceMessageContextZZ_Some, Option_C2Tuple_ServeStaticInvoiceMessageContextZZ_None } from '../structs/Option_C2Tuple_ServeStaticInvoiceMessageContextZZ.mjs';
import { TwoTuple_CVec_u8Zu16Z } from '../structs/TwoTuple_CVec_u8Zu16Z.mjs';
import { Result_C2Tuple_CVec_u8Zu16ZNoneZ } from '../structs/Result_C2Tuple_CVec_u8Zu16ZNoneZ.mjs';
import { TwoTuple_OutPointCVec_u8ZZ } from '../structs/TwoTuple_OutPointCVec_u8ZZ.mjs';
import { Result_ChannelMonitorUpdateDecodeErrorZ } from '../structs/Result_ChannelMonitorUpdateDecodeErrorZ.mjs';
import { Option_MonitorEventZ, Option_MonitorEventZ_Some, Option_MonitorEventZ_None } from '../structs/Option_MonitorEventZ.mjs';
import { Result_COption_MonitorEventZDecodeErrorZ } from '../structs/Result_COption_MonitorEventZDecodeErrorZ.mjs';
import { Result_HTLCUpdateDecodeErrorZ } from '../structs/Result_HTLCUpdateDecodeErrorZ.mjs';
import { HolderCommitmentTransactionBalance } from '../structs/HolderCommitmentTransactionBalance.mjs';
import { TwoTuple_u32CVec_u8ZZ } from '../structs/TwoTuple_u32CVec_u8ZZ.mjs';
import { TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ } from '../structs/TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ.mjs';
import { ReplayEvent } from '../structs/ReplayEvent.mjs';
import { Result_NoneReplayEventZ } from '../structs/Result_NoneReplayEventZ.mjs';
import { TwoTuple_u32TxOutZ } from '../structs/TwoTuple_u32TxOutZ.mjs';
import { TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ } from '../structs/TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ.mjs';
import { TwoTuple_boolboolZ } from '../structs/TwoTuple_boolboolZ.mjs';
import { Balance, Balance_ClaimableOnChannelClose, Balance_ClaimableAwaitingConfirmations, Balance_ContentiousClaimable, Balance_MaybeTimeoutClaimableHTLC, Balance_MaybePreimageClaimableHTLC, Balance_CounterpartyRevokedOutputClaimable } from '../structs/Balance.mjs';
import { TwoTuple_ThirtyTwoBytesChannelMonitorZ } from '../structs/TwoTuple_ThirtyTwoBytesChannelMonitorZ.mjs';
import { Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ } from '../structs/Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.mjs';
import { Type, TypeInterface } from '../structs/Type.mjs';
import { TwoTuple_PublicKeyTypeZ } from '../structs/TwoTuple_PublicKeyTypeZ.mjs';
import { OnionMessageContents, OnionMessageContentsInterface } from '../structs/OnionMessageContents.mjs';
import { TwoTuple_OnionMessageContentsResponseInstructionZ } from '../structs/TwoTuple_OnionMessageContentsResponseInstructionZ.mjs';
import { Option_C2Tuple_OnionMessageContentsResponseInstructionZZ, Option_C2Tuple_OnionMessageContentsResponseInstructionZZ_Some, Option_C2Tuple_OnionMessageContentsResponseInstructionZZ_None } from '../structs/Option_C2Tuple_OnionMessageContentsResponseInstructionZZ.mjs';
import { Option_OnionMessageContentsZ, Option_OnionMessageContentsZ_Some, Option_OnionMessageContentsZ_None } from '../structs/Option_OnionMessageContentsZ.mjs';
import { Result_COption_OnionMessageContentsZDecodeErrorZ } from '../structs/Result_COption_OnionMessageContentsZDecodeErrorZ.mjs';
import { TwoTuple_OnionMessageContentsMessageSendInstructionsZ } from '../structs/TwoTuple_OnionMessageContentsMessageSendInstructionsZ.mjs';
import { Option_TypeZ, Option_TypeZ_Some, Option_TypeZ_None } from '../structs/Option_TypeZ.mjs';
import { Result_COption_TypeZDecodeErrorZ } from '../structs/Result_COption_TypeZDecodeErrorZ.mjs';
import { Option_SocketAddressZ, Option_SocketAddressZ_Some, Option_SocketAddressZ_None } from '../structs/Option_SocketAddressZ.mjs';
import { PeerDetails } from '../structs/PeerDetails.mjs';
import { PeerHandleError } from '../structs/PeerHandleError.mjs';
import { Result_CVec_u8ZPeerHandleErrorZ } from '../structs/Result_CVec_u8ZPeerHandleErrorZ.mjs';
import { Result_NonePeerHandleErrorZ } from '../structs/Result_NonePeerHandleErrorZ.mjs';
import { GraphSyncError, GraphSyncError_DecodeError, GraphSyncError_LightningError } from '../structs/GraphSyncError.mjs';
import { Result_u32GraphSyncErrorZ } from '../structs/Result_u32GraphSyncErrorZ.mjs';
import { AsyncReceiveOfferCache } from '../structs/AsyncReceiveOfferCache.mjs';
import { Result_AsyncReceiveOfferCacheDecodeErrorZ } from '../structs/Result_AsyncReceiveOfferCacheDecodeErrorZ.mjs';
import { Result_InvoiceRequestBolt12SemanticErrorZ } from '../structs/Result_InvoiceRequestBolt12SemanticErrorZ.mjs';
import { InvoiceWithExplicitSigningPubkeyBuilder } from '../structs/InvoiceWithExplicitSigningPubkeyBuilder.mjs';
import { Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ } from '../structs/Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ.mjs';
import { Result_VerifiedInvoiceRequestNoneZ } from '../structs/Result_VerifiedInvoiceRequestNoneZ.mjs';
import { InvoiceWithDerivedSigningPubkeyBuilder } from '../structs/InvoiceWithDerivedSigningPubkeyBuilder.mjs';
import { Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ } from '../structs/Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ.mjs';
import { Result_InvoiceRequestDecodeErrorZ } from '../structs/Result_InvoiceRequestDecodeErrorZ.mjs';
import { InvoiceRequestFields } from '../structs/InvoiceRequestFields.mjs';
import { Result_InvoiceRequestFieldsDecodeErrorZ } from '../structs/Result_InvoiceRequestFieldsDecodeErrorZ.mjs';
import { Result_CVec_u8ZIOErrorZ } from '../structs/Result_CVec_u8ZIOErrorZ.mjs';
import { Result_NoneIOErrorZ } from '../structs/Result_NoneIOErrorZ.mjs';
import { Result_CVec_StrZIOErrorZ } from '../structs/Result_CVec_StrZIOErrorZ.mjs';
import { ThreeTuple_StrStrStrZ } from '../structs/ThreeTuple_StrStrStrZ.mjs';
import { Result_CVec_C3Tuple_StrStrStrZZIOErrorZ } from '../structs/Result_CVec_C3Tuple_StrStrStrZZIOErrorZ.mjs';
import { Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ } from '../structs/Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.mjs';
import { Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ } from '../structs/Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ.mjs';
import { TwoTuple_ChannelIdu64Z } from '../structs/TwoTuple_ChannelIdu64Z.mjs';
import { UpdateName } from '../structs/UpdateName.mjs';
import { Result_UpdateNameIOErrorZ } from '../structs/Result_UpdateNameIOErrorZ.mjs';
import { Option_TransactionZ, Option_TransactionZ_Some, Option_TransactionZ_None } from '../structs/Option_TransactionZ.mjs';
import { Option_ECDSASignatureZ, Option_ECDSASignatureZ_Some, Option_ECDSASignatureZ_None } from '../structs/Option_ECDSASignatureZ.mjs';
import { Option_i64Z, Option_i64Z_Some, Option_i64Z_None } from '../structs/Option_i64Z.mjs';
import { TwoTuple_u64BlindedMessagePathZ } from '../structs/TwoTuple_u64BlindedMessagePathZ.mjs';
import { Result_SocketAddressDecodeErrorZ } from '../structs/Result_SocketAddressDecodeErrorZ.mjs';
import { Result_SocketAddressSocketAddressParseErrorZ } from '../structs/Result_SocketAddressSocketAddressParseErrorZ.mjs';
import { UpdateAddHTLC } from '../structs/UpdateAddHTLC.mjs';
import { UpdateFulfillHTLC } from '../structs/UpdateFulfillHTLC.mjs';
import { UpdateFailHTLC } from '../structs/UpdateFailHTLC.mjs';
import { UpdateFailMalformedHTLC } from '../structs/UpdateFailMalformedHTLC.mjs';
import { Result_TrampolineOnionPacketDecodeErrorZ } from '../structs/Result_TrampolineOnionPacketDecodeErrorZ.mjs';
import { Result_AcceptChannelDecodeErrorZ } from '../structs/Result_AcceptChannelDecodeErrorZ.mjs';
import { Result_AcceptChannelV2DecodeErrorZ } from '../structs/Result_AcceptChannelV2DecodeErrorZ.mjs';
import { Result_StfuDecodeErrorZ } from '../structs/Result_StfuDecodeErrorZ.mjs';
import { Result_SpliceInitDecodeErrorZ } from '../structs/Result_SpliceInitDecodeErrorZ.mjs';
import { Result_SpliceAckDecodeErrorZ } from '../structs/Result_SpliceAckDecodeErrorZ.mjs';
import { Result_SpliceLockedDecodeErrorZ } from '../structs/Result_SpliceLockedDecodeErrorZ.mjs';
import { Result_TxAddInputDecodeErrorZ } from '../structs/Result_TxAddInputDecodeErrorZ.mjs';
import { Result_TxAddOutputDecodeErrorZ } from '../structs/Result_TxAddOutputDecodeErrorZ.mjs';
import { Result_TxRemoveInputDecodeErrorZ } from '../structs/Result_TxRemoveInputDecodeErrorZ.mjs';
import { Result_TxRemoveOutputDecodeErrorZ } from '../structs/Result_TxRemoveOutputDecodeErrorZ.mjs';
import { Result_TxCompleteDecodeErrorZ } from '../structs/Result_TxCompleteDecodeErrorZ.mjs';
import { Result_TxSignaturesDecodeErrorZ } from '../structs/Result_TxSignaturesDecodeErrorZ.mjs';
import { Result_TxInitRbfDecodeErrorZ } from '../structs/Result_TxInitRbfDecodeErrorZ.mjs';
import { Result_TxAckRbfDecodeErrorZ } from '../structs/Result_TxAckRbfDecodeErrorZ.mjs';
import { Result_TxAbortDecodeErrorZ } from '../structs/Result_TxAbortDecodeErrorZ.mjs';
import { Result_AnnouncementSignaturesDecodeErrorZ } from '../structs/Result_AnnouncementSignaturesDecodeErrorZ.mjs';
import { Result_ChannelReestablishDecodeErrorZ } from '../structs/Result_ChannelReestablishDecodeErrorZ.mjs';
import { NextFunding } from '../structs/NextFunding.mjs';
import { Result_NextFundingDecodeErrorZ } from '../structs/Result_NextFundingDecodeErrorZ.mjs';
import { FundingLocked } from '../structs/FundingLocked.mjs';
import { Result_FundingLockedDecodeErrorZ } from '../structs/Result_FundingLockedDecodeErrorZ.mjs';
import { Result_ClosingSignedDecodeErrorZ } from '../structs/Result_ClosingSignedDecodeErrorZ.mjs';
import { Result_ClosingCompleteDecodeErrorZ } from '../structs/Result_ClosingCompleteDecodeErrorZ.mjs';
import { Result_ClosingSigDecodeErrorZ } from '../structs/Result_ClosingSigDecodeErrorZ.mjs';
import { ClosingSignedFeeRange } from '../structs/ClosingSignedFeeRange.mjs';
import { Result_ClosingSignedFeeRangeDecodeErrorZ } from '../structs/Result_ClosingSignedFeeRangeDecodeErrorZ.mjs';
import { Result_CommitmentSignedDecodeErrorZ } from '../structs/Result_CommitmentSignedDecodeErrorZ.mjs';
import { Result_FundingCreatedDecodeErrorZ } from '../structs/Result_FundingCreatedDecodeErrorZ.mjs';
import { Result_FundingSignedDecodeErrorZ } from '../structs/Result_FundingSignedDecodeErrorZ.mjs';
import { Result_ChannelReadyDecodeErrorZ } from '../structs/Result_ChannelReadyDecodeErrorZ.mjs';
import { Init } from '../structs/Init.mjs';
import { Result_InitDecodeErrorZ } from '../structs/Result_InitDecodeErrorZ.mjs';
import { Result_OpenChannelDecodeErrorZ } from '../structs/Result_OpenChannelDecodeErrorZ.mjs';
import { Result_OpenChannelV2DecodeErrorZ } from '../structs/Result_OpenChannelV2DecodeErrorZ.mjs';
import { Result_RevokeAndACKDecodeErrorZ } from '../structs/Result_RevokeAndACKDecodeErrorZ.mjs';
import { Result_ShutdownDecodeErrorZ } from '../structs/Result_ShutdownDecodeErrorZ.mjs';
import { Result_UpdateFailHTLCDecodeErrorZ } from '../structs/Result_UpdateFailHTLCDecodeErrorZ.mjs';
import { Result_UpdateFailMalformedHTLCDecodeErrorZ } from '../structs/Result_UpdateFailMalformedHTLCDecodeErrorZ.mjs';
import { UpdateFee } from '../structs/UpdateFee.mjs';
import { Result_UpdateFeeDecodeErrorZ } from '../structs/Result_UpdateFeeDecodeErrorZ.mjs';
import { Result_UpdateFulfillHTLCDecodeErrorZ } from '../structs/Result_UpdateFulfillHTLCDecodeErrorZ.mjs';
import { Result_PeerStorageDecodeErrorZ } from '../structs/Result_PeerStorageDecodeErrorZ.mjs';
import { Result_PeerStorageRetrievalDecodeErrorZ } from '../structs/Result_PeerStorageRetrievalDecodeErrorZ.mjs';
import { StartBatch } from '../structs/StartBatch.mjs';
import { Result_StartBatchDecodeErrorZ } from '../structs/Result_StartBatchDecodeErrorZ.mjs';
import { Result_OnionPacketDecodeErrorZ } from '../structs/Result_OnionPacketDecodeErrorZ.mjs';
import { Result_UpdateAddHTLCDecodeErrorZ } from '../structs/Result_UpdateAddHTLCDecodeErrorZ.mjs';
import { OnionMessage } from '../structs/OnionMessage.mjs';
import { Result_OnionMessageDecodeErrorZ } from '../structs/Result_OnionMessageDecodeErrorZ.mjs';
import { Result_FinalOnionHopDataDecodeErrorZ } from '../structs/Result_FinalOnionHopDataDecodeErrorZ.mjs';
import { Ping } from '../structs/Ping.mjs';
import { Result_PingDecodeErrorZ } from '../structs/Result_PingDecodeErrorZ.mjs';
import { Pong } from '../structs/Pong.mjs';
import { Result_PongDecodeErrorZ } from '../structs/Result_PongDecodeErrorZ.mjs';
import { Result_UnsignedChannelAnnouncementDecodeErrorZ } from '../structs/Result_UnsignedChannelAnnouncementDecodeErrorZ.mjs';
import { Result_ChannelAnnouncementDecodeErrorZ } from '../structs/Result_ChannelAnnouncementDecodeErrorZ.mjs';
import { Result_UnsignedChannelUpdateDecodeErrorZ } from '../structs/Result_UnsignedChannelUpdateDecodeErrorZ.mjs';
import { Result_ChannelUpdateDecodeErrorZ } from '../structs/Result_ChannelUpdateDecodeErrorZ.mjs';
import { Result_ErrorMessageDecodeErrorZ } from '../structs/Result_ErrorMessageDecodeErrorZ.mjs';
import { Result_WarningMessageDecodeErrorZ } from '../structs/Result_WarningMessageDecodeErrorZ.mjs';
import { Result_UnsignedNodeAnnouncementDecodeErrorZ } from '../structs/Result_UnsignedNodeAnnouncementDecodeErrorZ.mjs';
import { Result_NodeAnnouncementDecodeErrorZ } from '../structs/Result_NodeAnnouncementDecodeErrorZ.mjs';
import { Result_QueryShortChannelIdsDecodeErrorZ } from '../structs/Result_QueryShortChannelIdsDecodeErrorZ.mjs';
import { ReplyShortChannelIdsEnd } from '../structs/ReplyShortChannelIdsEnd.mjs';
import { Result_ReplyShortChannelIdsEndDecodeErrorZ } from '../structs/Result_ReplyShortChannelIdsEndDecodeErrorZ.mjs';
import { Result_QueryChannelRangeDecodeErrorZ } from '../structs/Result_QueryChannelRangeDecodeErrorZ.mjs';
import { Result_ReplyChannelRangeDecodeErrorZ } from '../structs/Result_ReplyChannelRangeDecodeErrorZ.mjs';
import { Result_GossipTimestampFilterDecodeErrorZ } from '../structs/Result_GossipTimestampFilterDecodeErrorZ.mjs';
import { Option_InboundHTLCStateDetailsZ, Option_InboundHTLCStateDetailsZ_Some, Option_InboundHTLCStateDetailsZ_None } from '../structs/Option_InboundHTLCStateDetailsZ.mjs';
import { Result_COption_InboundHTLCStateDetailsZDecodeErrorZ } from '../structs/Result_COption_InboundHTLCStateDetailsZDecodeErrorZ.mjs';
import { InboundHTLCDetails } from '../structs/InboundHTLCDetails.mjs';
import { Result_InboundHTLCDetailsDecodeErrorZ } from '../structs/Result_InboundHTLCDetailsDecodeErrorZ.mjs';
import { Option_OutboundHTLCStateDetailsZ, Option_OutboundHTLCStateDetailsZ_Some, Option_OutboundHTLCStateDetailsZ_None } from '../structs/Option_OutboundHTLCStateDetailsZ.mjs';
import { Result_COption_OutboundHTLCStateDetailsZDecodeErrorZ } from '../structs/Result_COption_OutboundHTLCStateDetailsZDecodeErrorZ.mjs';
import { OutboundHTLCDetails } from '../structs/OutboundHTLCDetails.mjs';
import { Result_OutboundHTLCDetailsDecodeErrorZ } from '../structs/Result_OutboundHTLCDetailsDecodeErrorZ.mjs';
import { CounterpartyForwardingInfo } from '../structs/CounterpartyForwardingInfo.mjs';
import { Result_CounterpartyForwardingInfoDecodeErrorZ } from '../structs/Result_CounterpartyForwardingInfoDecodeErrorZ.mjs';
import { ChannelCounterparty } from '../structs/ChannelCounterparty.mjs';
import { Result_ChannelCounterpartyDecodeErrorZ } from '../structs/Result_ChannelCounterpartyDecodeErrorZ.mjs';
import { Option_ChannelShutdownStateZ, Option_ChannelShutdownStateZ_Some, Option_ChannelShutdownStateZ_None } from '../structs/Option_ChannelShutdownStateZ.mjs';
import { Result_ChannelDetailsDecodeErrorZ } from '../structs/Result_ChannelDetailsDecodeErrorZ.mjs';
import { Result_ChannelShutdownStateDecodeErrorZ } from '../structs/Result_ChannelShutdownStateDecodeErrorZ.mjs';
import { Result_OfferPathsRequestDecodeErrorZ } from '../structs/Result_OfferPathsRequestDecodeErrorZ.mjs';
import { Result_OfferPathsDecodeErrorZ } from '../structs/Result_OfferPathsDecodeErrorZ.mjs';
import { Result_ServeStaticInvoiceDecodeErrorZ } from '../structs/Result_ServeStaticInvoiceDecodeErrorZ.mjs';
import { Result_StaticInvoicePersistedDecodeErrorZ } from '../structs/Result_StaticInvoicePersistedDecodeErrorZ.mjs';
import { Result_HeldHtlcAvailableDecodeErrorZ } from '../structs/Result_HeldHtlcAvailableDecodeErrorZ.mjs';
import { Result_ReleaseHeldHtlcDecodeErrorZ } from '../structs/Result_ReleaseHeldHtlcDecodeErrorZ.mjs';
import { Result_AsyncPaymentsMessageDecodeErrorZ } from '../structs/Result_AsyncPaymentsMessageDecodeErrorZ.mjs';
import { SignError, SignError_Signing, SignError_Verification } from '../structs/SignError.mjs';
import { Result_StaticInvoiceSignErrorZ } from '../structs/Result_StaticInvoiceSignErrorZ.mjs';
import { Result_StaticInvoiceDecodeErrorZ } from '../structs/Result_StaticInvoiceDecodeErrorZ.mjs';
import { Result_OffersMessageDecodeErrorZ } from '../structs/Result_OffersMessageDecodeErrorZ.mjs';
import { Option_HTLCClaimZ, Option_HTLCClaimZ_Some, Option_HTLCClaimZ_None } from '../structs/Option_HTLCClaimZ.mjs';
import { CounterpartyCommitmentSecrets } from '../structs/CounterpartyCommitmentSecrets.mjs';
import { Result_CounterpartyCommitmentSecretsDecodeErrorZ } from '../structs/Result_CounterpartyCommitmentSecretsDecodeErrorZ.mjs';
import { TxCreationKeys } from '../structs/TxCreationKeys.mjs';
import { Result_TxCreationKeysDecodeErrorZ } from '../structs/Result_TxCreationKeysDecodeErrorZ.mjs';
import { Result_ChannelPublicKeysDecodeErrorZ } from '../structs/Result_ChannelPublicKeysDecodeErrorZ.mjs';
import { Result_HTLCOutputInCommitmentDecodeErrorZ } from '../structs/Result_HTLCOutputInCommitmentDecodeErrorZ.mjs';
import { CounterpartyChannelTransactionParameters } from '../structs/CounterpartyChannelTransactionParameters.mjs';
import { Result_CounterpartyChannelTransactionParametersDecodeErrorZ } from '../structs/Result_CounterpartyChannelTransactionParametersDecodeErrorZ.mjs';
import { Result_ChannelTransactionParametersDecodeErrorZ } from '../structs/Result_ChannelTransactionParametersDecodeErrorZ.mjs';
import { Result_HolderCommitmentTransactionDecodeErrorZ } from '../structs/Result_HolderCommitmentTransactionDecodeErrorZ.mjs';
import { BuiltCommitmentTransaction } from '../structs/BuiltCommitmentTransaction.mjs';
import { Result_BuiltCommitmentTransactionDecodeErrorZ } from '../structs/Result_BuiltCommitmentTransactionDecodeErrorZ.mjs';
import { TrustedClosingTransaction } from '../structs/TrustedClosingTransaction.mjs';
import { Result_TrustedClosingTransactionNoneZ } from '../structs/Result_TrustedClosingTransactionNoneZ.mjs';
import { Result_CommitmentTransactionDecodeErrorZ } from '../structs/Result_CommitmentTransactionDecodeErrorZ.mjs';
import { TrustedCommitmentTransaction } from '../structs/TrustedCommitmentTransaction.mjs';
import { Result_TrustedCommitmentTransactionNoneZ } from '../structs/Result_TrustedCommitmentTransactionNoneZ.mjs';
import { Result_CVec_ECDSASignatureZNoneZ } from '../structs/Result_CVec_ECDSASignatureZNoneZ.mjs';
import { Option_usizeZ, Option_usizeZ_Some, Option_usizeZ_None } from '../structs/Option_usizeZ.mjs';
import { Result_ShutdownScriptDecodeErrorZ } from '../structs/Result_ShutdownScriptDecodeErrorZ.mjs';
import { InvalidShutdownScript } from '../structs/InvalidShutdownScript.mjs';
import { Result_ShutdownScriptInvalidShutdownScriptZ } from '../structs/Result_ShutdownScriptInvalidShutdownScriptZ.mjs';
import { FundingInfo, FundingInfo_Tx, FundingInfo_OutPoint } from '../structs/FundingInfo.mjs';
import { Result_FundingInfoDecodeErrorZ } from '../structs/Result_FundingInfoDecodeErrorZ.mjs';
import { PaymentPurpose, PaymentPurpose_Bolt11InvoicePayment, PaymentPurpose_Bolt12OfferPayment, PaymentPurpose_Bolt12RefundPayment, PaymentPurpose_SpontaneousPayment } from '../structs/PaymentPurpose.mjs';
import { Result_PaymentPurposeDecodeErrorZ } from '../structs/Result_PaymentPurposeDecodeErrorZ.mjs';
import { ClaimedHTLC } from '../structs/ClaimedHTLC.mjs';
import { Result_ClaimedHTLCDecodeErrorZ } from '../structs/Result_ClaimedHTLCDecodeErrorZ.mjs';
import { PathFailure, PathFailure_InitialSend, PathFailure_OnPath } from '../structs/PathFailure.mjs';
import { Option_PathFailureZ, Option_PathFailureZ_Some, Option_PathFailureZ_None } from '../structs/Option_PathFailureZ.mjs';
import { Result_COption_PathFailureZDecodeErrorZ } from '../structs/Result_COption_PathFailureZDecodeErrorZ.mjs';
import { Option_ClosureReasonZ, Option_ClosureReasonZ_Some, Option_ClosureReasonZ_None } from '../structs/Option_ClosureReasonZ.mjs';
import { Result_COption_ClosureReasonZDecodeErrorZ } from '../structs/Result_COption_ClosureReasonZDecodeErrorZ.mjs';
import { HTLCHandlingFailureType, HTLCHandlingFailureType_Forward, HTLCHandlingFailureType_UnknownNextHop, HTLCHandlingFailureType_InvalidForward, HTLCHandlingFailureType_InvalidOnion, HTLCHandlingFailureType_Receive } from '../structs/HTLCHandlingFailureType.mjs';
import { Option_HTLCHandlingFailureTypeZ, Option_HTLCHandlingFailureTypeZ_Some, Option_HTLCHandlingFailureTypeZ_None } from '../structs/Option_HTLCHandlingFailureTypeZ.mjs';
import { Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ } from '../structs/Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ.mjs';
import { LocalHTLCFailureReason, LocalHTLCFailureReason_TemporaryNodeFailure, LocalHTLCFailureReason_PermanentNodeFailure, LocalHTLCFailureReason_RequiredNodeFeature, LocalHTLCFailureReason_InvalidOnionVersion, LocalHTLCFailureReason_InvalidOnionHMAC, LocalHTLCFailureReason_InvalidOnionKey, LocalHTLCFailureReason_TemporaryChannelFailure, LocalHTLCFailureReason_PermanentChannelFailure, LocalHTLCFailureReason_RequiredChannelFeature, LocalHTLCFailureReason_UnknownNextPeer, LocalHTLCFailureReason_AmountBelowMinimum, LocalHTLCFailureReason_FeeInsufficient, LocalHTLCFailureReason_IncorrectCLTVExpiry, LocalHTLCFailureReason_CLTVExpiryTooSoon, LocalHTLCFailureReason_IncorrectPaymentDetails, LocalHTLCFailureReason_FinalIncorrectCLTVExpiry, LocalHTLCFailureReason_FinalIncorrectHTLCAmount, LocalHTLCFailureReason_ChannelDisabled, LocalHTLCFailureReason_CLTVExpiryTooFar, LocalHTLCFailureReason_InvalidOnionPayload, LocalHTLCFailureReason_MPPTimeout, LocalHTLCFailureReason_InvalidOnionBlinding, LocalHTLCFailureReason_UnknownFailureCode, LocalHTLCFailureReason_ForwardExpiryBuffer, LocalHTLCFailureReason_InvalidTrampolineForward, LocalHTLCFailureReason_PaymentClaimBuffer, LocalHTLCFailureReason_DustLimitHolder, LocalHTLCFailureReason_DustLimitCounterparty, LocalHTLCFailureReason_FeeSpikeBuffer, LocalHTLCFailureReason_PrivateChannelForward, LocalHTLCFailureReason_RealSCIDForward, LocalHTLCFailureReason_ChannelNotReady, LocalHTLCFailureReason_InvalidKeysendPreimage, LocalHTLCFailureReason_InvalidTrampolinePayload, LocalHTLCFailureReason_PaymentSecretRequired, LocalHTLCFailureReason_OutgoingCLTVTooSoon, LocalHTLCFailureReason_ChannelClosed, LocalHTLCFailureReason_OnChainTimeout, LocalHTLCFailureReason_ZeroAmount, LocalHTLCFailureReason_HTLCMinimum, LocalHTLCFailureReason_HTLCMaximum, LocalHTLCFailureReason_PeerOffline, LocalHTLCFailureReason_ChannelBalanceOverdrawn } from '../structs/LocalHTLCFailureReason.mjs';
import { HTLCHandlingFailureReason, HTLCHandlingFailureReason_Downstream, HTLCHandlingFailureReason_Local } from '../structs/HTLCHandlingFailureReason.mjs';
import { Result_HTLCHandlingFailureReasonDecodeErrorZ } from '../structs/Result_HTLCHandlingFailureReasonDecodeErrorZ.mjs';
import { Option_PaymentFailureReasonZ, Option_PaymentFailureReasonZ_Some, Option_PaymentFailureReasonZ_None } from '../structs/Option_PaymentFailureReasonZ.mjs';
import { Result_COption_PaymentFailureReasonZDecodeErrorZ } from '../structs/Result_COption_PaymentFailureReasonZDecodeErrorZ.mjs';
import { Option_U128Z, Option_U128Z_Some, Option_U128Z_None } from '../structs/Option_U128Z.mjs';
import { TwoTuple_ChannelIdCOption_U128ZZ } from '../structs/TwoTuple_ChannelIdCOption_U128ZZ.mjs';
import { PaidBolt12Invoice, PaidBolt12Invoice_Bolt12Invoice, PaidBolt12Invoice_StaticInvoice } from '../structs/PaidBolt12Invoice.mjs';
import { Option_PaidBolt12InvoiceZ, Option_PaidBolt12InvoiceZ_Some, Option_PaidBolt12InvoiceZ_None } from '../structs/Option_PaidBolt12InvoiceZ.mjs';
import { Option_OutPointZ, Option_OutPointZ_Some, Option_OutPointZ_None } from '../structs/Option_OutPointZ.mjs';
import { Option_HTLCHandlingFailureReasonZ, Option_HTLCHandlingFailureReasonZ_Some, Option_HTLCHandlingFailureReasonZ_None } from '../structs/Option_HTLCHandlingFailureReasonZ.mjs';
import { Responder } from '../structs/Responder.mjs';
import { ChannelTypeFeatures } from '../structs/ChannelTypeFeatures.mjs';
import { InboundChannelFunds, InboundChannelFunds_PushMsat, InboundChannelFunds_DualFunded } from '../structs/InboundChannelFunds.mjs';
import { ChannelParameters } from '../structs/ChannelParameters.mjs';
import { AnchorDescriptor } from '../structs/AnchorDescriptor.mjs';
import { BumpTransactionEvent, BumpTransactionEvent_ChannelClose, BumpTransactionEvent_HTLCResolution } from '../structs/BumpTransactionEvent.mjs';
import { Option_EventZ, Option_EventZ_Some, Option_EventZ_None } from '../structs/Option_EventZ.mjs';
import { Result_COption_EventZDecodeErrorZ } from '../structs/Result_COption_EventZDecodeErrorZ.mjs';
import { Result_PaidBolt12InvoiceDecodeErrorZ } from '../structs/Result_PaidBolt12InvoiceDecodeErrorZ.mjs';
import { Packet } from '../structs/Packet.mjs';
import { Result_PacketDecodeErrorZ } from '../structs/Result_PacketDecodeErrorZ.mjs';
import { Result_NonceDecodeErrorZ } from '../structs/Result_NonceDecodeErrorZ.mjs';
import { Bolt11ParseError } from '../structs/Bolt11ParseError.mjs';
import { Result_SiPrefixBolt11ParseErrorZ } from '../structs/Result_SiPrefixBolt11ParseErrorZ.mjs';
import { ParseOrSemanticError, ParseOrSemanticError_ParseError, ParseOrSemanticError_SemanticError } from '../structs/ParseOrSemanticError.mjs';
import { Result_Bolt11InvoiceParseOrSemanticErrorZ } from '../structs/Result_Bolt11InvoiceParseOrSemanticErrorZ.mjs';
import { SignedRawBolt11Invoice } from '../structs/SignedRawBolt11Invoice.mjs';
import { Result_SignedRawBolt11InvoiceBolt11ParseErrorZ } from '../structs/Result_SignedRawBolt11InvoiceBolt11ParseErrorZ.mjs';
import { Bolt11InvoiceSignature } from '../structs/Bolt11InvoiceSignature.mjs';
import { ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ } from '../structs/ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ.mjs';
import { PayeePubKey } from '../structs/PayeePubKey.mjs';
import { Result_PayeePubKeySecp256k1ErrorZ } from '../structs/Result_PayeePubKeySecp256k1ErrorZ.mjs';
import { PrivateRoute } from '../structs/PrivateRoute.mjs';
import { PositiveTimestamp } from '../structs/PositiveTimestamp.mjs';
import { Result_PositiveTimestampCreationErrorZ } from '../structs/Result_PositiveTimestampCreationErrorZ.mjs';
import { Result_NoneBolt11SemanticErrorZ } from '../structs/Result_NoneBolt11SemanticErrorZ.mjs';
import { Result_Bolt11InvoiceBolt11SemanticErrorZ } from '../structs/Result_Bolt11InvoiceBolt11SemanticErrorZ.mjs';
import { Description } from '../structs/Description.mjs';
import { Result_DescriptionCreationErrorZ } from '../structs/Result_DescriptionCreationErrorZ.mjs';
import { Result_PrivateRouteCreationErrorZ } from '../structs/Result_PrivateRouteCreationErrorZ.mjs';
import { Result_OutPointDecodeErrorZ } from '../structs/Result_OutPointDecodeErrorZ.mjs';
import { BigSize } from '../structs/BigSize.mjs';
import { Result_BigSizeDecodeErrorZ } from '../structs/Result_BigSizeDecodeErrorZ.mjs';
import { CollectionLength } from '../structs/CollectionLength.mjs';
import { Result_CollectionLengthDecodeErrorZ } from '../structs/Result_CollectionLengthDecodeErrorZ.mjs';
import { Result_UntrustedStringDecodeErrorZ } from '../structs/Result_UntrustedStringDecodeErrorZ.mjs';
import { Result_HostnameDecodeErrorZ } from '../structs/Result_HostnameDecodeErrorZ.mjs';
import { BlindedPayInfo } from '../structs/BlindedPayInfo.mjs';
import { Result_BlindedPayInfoDecodeErrorZ } from '../structs/Result_BlindedPayInfoDecodeErrorZ.mjs';
import { Result_BlindedPaymentPathNoneZ } from '../structs/Result_BlindedPaymentPathNoneZ.mjs';
import { PaymentForwardNode } from '../structs/PaymentForwardNode.mjs';
import { PaymentRelay } from '../structs/PaymentRelay.mjs';
import { Result_PaymentRelayDecodeErrorZ } from '../structs/Result_PaymentRelayDecodeErrorZ.mjs';
import { PaymentConstraints } from '../structs/PaymentConstraints.mjs';
import { Result_PaymentConstraintsDecodeErrorZ } from '../structs/Result_PaymentConstraintsDecodeErrorZ.mjs';
import { Result_PaymentContextDecodeErrorZ } from '../structs/Result_PaymentContextDecodeErrorZ.mjs';
import { Result_Bolt12OfferContextDecodeErrorZ } from '../structs/Result_Bolt12OfferContextDecodeErrorZ.mjs';
import { Result_AsyncBolt12OfferContextDecodeErrorZ } from '../structs/Result_AsyncBolt12OfferContextDecodeErrorZ.mjs';
import { Result_Bolt12RefundContextDecodeErrorZ } from '../structs/Result_Bolt12RefundContextDecodeErrorZ.mjs';
import { Result_ChannelIdDecodeErrorZ } from '../structs/Result_ChannelIdDecodeErrorZ.mjs';
import { InitFeatures } from '../structs/InitFeatures.mjs';
import { Result_InitFeaturesDecodeErrorZ } from '../structs/Result_InitFeaturesDecodeErrorZ.mjs';
import { ChannelFeatures } from '../structs/ChannelFeatures.mjs';
import { Result_ChannelFeaturesDecodeErrorZ } from '../structs/Result_ChannelFeaturesDecodeErrorZ.mjs';
import { NodeFeatures } from '../structs/NodeFeatures.mjs';
import { Result_NodeFeaturesDecodeErrorZ } from '../structs/Result_NodeFeaturesDecodeErrorZ.mjs';
import { Bolt11InvoiceFeatures } from '../structs/Bolt11InvoiceFeatures.mjs';
import { Result_Bolt11InvoiceFeaturesDecodeErrorZ } from '../structs/Result_Bolt11InvoiceFeaturesDecodeErrorZ.mjs';
import { Bolt12InvoiceFeatures } from '../structs/Bolt12InvoiceFeatures.mjs';
import { Result_Bolt12InvoiceFeaturesDecodeErrorZ } from '../structs/Result_Bolt12InvoiceFeaturesDecodeErrorZ.mjs';
import { BlindedHopFeatures } from '../structs/BlindedHopFeatures.mjs';
import { Result_BlindedHopFeaturesDecodeErrorZ } from '../structs/Result_BlindedHopFeaturesDecodeErrorZ.mjs';
import { Result_ChannelTypeFeaturesDecodeErrorZ } from '../structs/Result_ChannelTypeFeaturesDecodeErrorZ.mjs';
import { TwoTuple__u832u16Z } from '../structs/TwoTuple__u832u16Z.mjs';
import { Result_ResponderDecodeErrorZ } from '../structs/Result_ResponderDecodeErrorZ.mjs';
import { ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ } from '../structs/ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ.mjs';
import { SendError, SendError_Secp256k1, SendError_TooBigPacket, SendError_TooFewBlindedHops, SendError_InvalidFirstHop, SendError_PathNotFound, SendError_InvalidMessage, SendError_BufferFull, SendError_GetNodeIdFailed, SendError_UnresolvedIntroductionNode, SendError_BlindedPathAdvanceFailed } from '../structs/SendError.mjs';
import { Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ } from '../structs/Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.mjs';
import { NextMessageHop, NextMessageHop_NodeId, NextMessageHop_ShortChannelId } from '../structs/NextMessageHop.mjs';
import { PeeledOnion, PeeledOnion_Forward, PeeledOnion_Offers, PeeledOnion_AsyncPayments, PeeledOnion_DNSResolver, PeeledOnion_Custom } from '../structs/PeeledOnion.mjs';
import { Result_PeeledOnionNoneZ } from '../structs/Result_PeeledOnionNoneZ.mjs';
import { SendSuccess, SendSuccess_Buffered, SendSuccess_BufferedAwaitingConnection } from '../structs/SendSuccess.mjs';
import { Result_SendSuccessSendErrorZ } from '../structs/Result_SendSuccessSendErrorZ.mjs';
import { Result_NoneSendErrorZ } from '../structs/Result_NoneSendErrorZ.mjs';
import { Result_BlindedHopDecodeErrorZ } from '../structs/Result_BlindedHopDecodeErrorZ.mjs';
import { FundingTxInput } from '../structs/FundingTxInput.mjs';
import { Result_FundingTxInputDecodeErrorZ } from '../structs/Result_FundingTxInputDecodeErrorZ.mjs';
import { Result_FundingTxInputNoneZ } from '../structs/Result_FundingTxInputNoneZ.mjs';
import { Result_LocalHTLCFailureReasonDecodeErrorZ } from '../structs/Result_LocalHTLCFailureReasonDecodeErrorZ.mjs';
import { ThreeTuple_OnionPacketu64u32Z } from '../structs/ThreeTuple_OnionPacketu64u32Z.mjs';
import { Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ } from '../structs/Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ.mjs';
import { AttributionData } from '../structs/AttributionData.mjs';
import { Result_AttributionDataDecodeErrorZ } from '../structs/Result_AttributionDataDecodeErrorZ.mjs';
import { Result_InvoiceErrorDecodeErrorZ } from '../structs/Result_InvoiceErrorDecodeErrorZ.mjs';
import { TrackedSpendableOutput } from '../structs/TrackedSpendableOutput.mjs';
import { Result_TrackedSpendableOutputDecodeErrorZ } from '../structs/Result_TrackedSpendableOutputDecodeErrorZ.mjs';
import { OutputSpendStatus, OutputSpendStatus_PendingInitialBroadcast, OutputSpendStatus_PendingFirstConfirmation, OutputSpendStatus_PendingThresholdConfirmations } from '../structs/OutputSpendStatus.mjs';
import { Result_OutputSpendStatusDecodeErrorZ } from '../structs/Result_OutputSpendStatusDecodeErrorZ.mjs';
import { WatchedOutput } from '../structs/WatchedOutput.mjs';
import { Filter, FilterInterface } from '../structs/Filter.mjs';
import { Option_FilterZ, Option_FilterZ_Some, Option_FilterZ_None } from '../structs/Option_FilterZ.mjs';
import { ChangeDestinationSourceSync, ChangeDestinationSourceSyncInterface } from '../structs/ChangeDestinationSourceSync.mjs';
import { KVStoreSync, KVStoreSyncInterface } from '../structs/KVStoreSync.mjs';
import { OutputSpender, OutputSpenderInterface } from '../structs/OutputSpender.mjs';
import { OutputSweeperSync } from '../structs/OutputSweeperSync.mjs';
import { TwoTuple_BestBlockOutputSweeperSyncZ } from '../structs/TwoTuple_BestBlockOutputSweeperSyncZ.mjs';
import { Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ } from '../structs/Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ.mjs';
import { DelayedPaymentBasepoint } from '../structs/DelayedPaymentBasepoint.mjs';
import { Result_DelayedPaymentBasepointDecodeErrorZ } from '../structs/Result_DelayedPaymentBasepointDecodeErrorZ.mjs';
import { DelayedPaymentKey } from '../structs/DelayedPaymentKey.mjs';
import { Result_DelayedPaymentKeyDecodeErrorZ } from '../structs/Result_DelayedPaymentKeyDecodeErrorZ.mjs';
import { HtlcBasepoint } from '../structs/HtlcBasepoint.mjs';
import { Result_HtlcBasepointDecodeErrorZ } from '../structs/Result_HtlcBasepointDecodeErrorZ.mjs';
import { HtlcKey } from '../structs/HtlcKey.mjs';
import { Result_HtlcKeyDecodeErrorZ } from '../structs/Result_HtlcKeyDecodeErrorZ.mjs';
import { RevocationBasepoint } from '../structs/RevocationBasepoint.mjs';
import { Result_RevocationBasepointDecodeErrorZ } from '../structs/Result_RevocationBasepointDecodeErrorZ.mjs';
import { RevocationKey } from '../structs/RevocationKey.mjs';
import { Result_RevocationKeyDecodeErrorZ } from '../structs/Result_RevocationKeyDecodeErrorZ.mjs';
import { LockedChannelMonitor } from '../structs/LockedChannelMonitor.mjs';
import { Result_LockedChannelMonitorNoneZ } from '../structs/Result_LockedChannelMonitorNoneZ.mjs';
import { TwoTuple_ChannelIdCVec_u64ZZ } from '../structs/TwoTuple_ChannelIdCVec_u64ZZ.mjs';
import { Result_BlindedMessagePathDecodeErrorZ } from '../structs/Result_BlindedMessagePathDecodeErrorZ.mjs';
import { Result_MessageContextDecodeErrorZ } from '../structs/Result_MessageContextDecodeErrorZ.mjs';
import { Result_OffersContextDecodeErrorZ } from '../structs/Result_OffersContextDecodeErrorZ.mjs';
import { Result_AsyncPaymentsContextDecodeErrorZ } from '../structs/Result_AsyncPaymentsContextDecodeErrorZ.mjs';
import { Result_DNSResolverContextDecodeErrorZ } from '../structs/Result_DNSResolverContextDecodeErrorZ.mjs';
import { AnchorChannelReserveContext } from '../structs/AnchorChannelReserveContext.mjs';
import { MonitorName, MonitorName_V1Channel, MonitorName_V2Channel } from '../structs/MonitorName.mjs';
import { Persist, PersistInterface } from '../structs/Persist.mjs';
import { ChainMonitor } from '../structs/ChainMonitor.mjs';
import { KVStoreSyncWrapper } from '../structs/KVStoreSyncWrapper.mjs';
import { MigratableKVStore, MigratableKVStoreInterface } from '../structs/MigratableKVStore.mjs';
import { MonitorUpdatingPersister } from '../structs/MonitorUpdatingPersister.mjs';
import { SpendingDelay, SpendingDelay_Relative, SpendingDelay_Absolute } from '../structs/SpendingDelay.mjs';
import { Listen, ListenInterface } from '../structs/Listen.mjs';
import { Confirm, ConfirmInterface } from '../structs/Confirm.mjs';
import { Notifier } from '../structs/Notifier.mjs';
import { Future } from '../structs/Future.mjs';
import { FutureCallback, FutureCallbackInterface } from '../structs/FutureCallback.mjs';
import { ChannelHandshakeConfig } from '../structs/ChannelHandshakeConfig.mjs';
import { ChannelHandshakeLimits } from '../structs/ChannelHandshakeLimits.mjs';
import { ChannelConfigUpdate } from '../structs/ChannelConfigUpdate.mjs';
import { UserConfig } from '../structs/UserConfig.mjs';
import { ChannelConfigOverrides } from '../structs/ChannelConfigOverrides.mjs';
import { ChannelHandshakeConfigUpdate } from '../structs/ChannelHandshakeConfigUpdate.mjs';
import { IntroductionNode, IntroductionNode_NodeId, IntroductionNode_DirectedShortChannelId } from '../structs/IntroductionNode.mjs';
import { NodeIdLookUp, NodeIdLookUpInterface } from '../structs/NodeIdLookUp.mjs';
import { EmptyNodeIdLookUp } from '../structs/EmptyNodeIdLookUp.mjs';
import { ReadOnlyNetworkGraph } from '../structs/ReadOnlyNetworkGraph.mjs';
import { ForwardTlvs } from '../structs/ForwardTlvs.mjs';
import { TrampolineForwardTlvs } from '../structs/TrampolineForwardTlvs.mjs';
import { UnauthenticatedReceiveTlvs } from '../structs/UnauthenticatedReceiveTlvs.mjs';
import { BaseMessageHandler, BaseMessageHandlerInterface } from '../structs/BaseMessageHandler.mjs';
import { SendOnlyMessageHandler, SendOnlyMessageHandlerInterface } from '../structs/SendOnlyMessageHandler.mjs';
import { EventHandler, EventHandlerInterface } from '../structs/EventHandler.mjs';
import { EventsProvider, EventsProviderInterface } from '../structs/EventsProvider.mjs';
import { WalletSourceSync, WalletSourceSyncInterface } from '../structs/WalletSourceSync.mjs';
import { WalletSync } from '../structs/WalletSync.mjs';
import { CoinSelectionSourceSync, CoinSelectionSourceSyncInterface } from '../structs/CoinSelectionSourceSync.mjs';
import { BumpTransactionEventHandlerSync } from '../structs/BumpTransactionEventHandlerSync.mjs';
import { DirectedChannelTransactionParameters } from '../structs/DirectedChannelTransactionParameters.mjs';
import { Verification, VerificationInterface } from '../structs/Verification.mjs';
import { OptionalOfferPaymentParams } from '../structs/OptionalOfferPaymentParams.mjs';
import { FailureCode, FailureCode_TemporaryNodeFailure, FailureCode_RequiredNodeFeatureMissing, FailureCode_IncorrectOrUnknownPaymentDetails, FailureCode_InvalidOnionPayload } from '../structs/FailureCode.mjs';
import { ChainParameters } from '../structs/ChainParameters.mjs';
import { SpliceContribution, SpliceContribution_SpliceIn, SpliceContribution_SpliceOut } from '../structs/SpliceContribution.mjs';
import { Bolt11InvoiceParameters } from '../structs/Bolt11InvoiceParameters.mjs';
import { Sha256 } from '../structs/Sha256.mjs';
import { Bolt11InvoiceDescription, Bolt11InvoiceDescription_Direct, Bolt11InvoiceDescription_Hash } from '../structs/Bolt11InvoiceDescription.mjs';
import { OfferFromHrn } from '../structs/OfferFromHrn.mjs';
import { ChannelMessageHandler, ChannelMessageHandlerInterface } from '../structs/ChannelMessageHandler.mjs';
import { OffersMessageHandler, OffersMessageHandlerInterface } from '../structs/OffersMessageHandler.mjs';
import { AsyncPaymentsMessageHandler, AsyncPaymentsMessageHandlerInterface } from '../structs/AsyncPaymentsMessageHandler.mjs';
import { DNSResolverMessageHandler, DNSResolverMessageHandlerInterface } from '../structs/DNSResolverMessageHandler.mjs';
import { ChannelManagerReadArgs } from '../structs/ChannelManagerReadArgs.mjs';
import { CommonOpenChannelFields } from '../structs/CommonOpenChannelFields.mjs';
import { CommonAcceptChannelFields } from '../structs/CommonAcceptChannelFields.mjs';
import { RoutingMessageHandler, RoutingMessageHandlerInterface } from '../structs/RoutingMessageHandler.mjs';
import { OnionMessageHandler, OnionMessageHandlerInterface } from '../structs/OnionMessageHandler.mjs';
import { CustomMessageReader, CustomMessageReaderInterface } from '../structs/CustomMessageReader.mjs';
import { CustomMessageHandler, CustomMessageHandlerInterface } from '../structs/CustomMessageHandler.mjs';
import { IgnoringMessageHandler } from '../structs/IgnoringMessageHandler.mjs';
import { CustomOnionMessageHandler, CustomOnionMessageHandlerInterface } from '../structs/CustomOnionMessageHandler.mjs';
import { ErroringMessageHandler } from '../structs/ErroringMessageHandler.mjs';
import { MessageHandler } from '../structs/MessageHandler.mjs';
import { SocketDescriptor, SocketDescriptorInterface } from '../structs/SocketDescriptor.mjs';
import { PeerManager } from '../structs/PeerManager.mjs';
import { OfferWithExplicitMetadataBuilder } from '../structs/OfferWithExplicitMetadataBuilder.mjs';
import { PrintableString } from '../structs/PrintableString.mjs';
import { OfferFeatures } from '../structs/OfferFeatures.mjs';
import { OffersMessageFlow } from '../structs/OffersMessageFlow.mjs';
import { HeldHtlcReplyPath, HeldHtlcReplyPath_ToUs, HeldHtlcReplyPath_ToCounterparty } from '../structs/HeldHtlcReplyPath.mjs';
import { SignBolt12InvoiceFn, SignBolt12InvoiceFnInterface } from '../structs/SignBolt12InvoiceFn.mjs';
import { TaggedHash } from '../structs/TaggedHash.mjs';
import { InvoiceRequestFeatures } from '../structs/InvoiceRequestFeatures.mjs';
import { ErroneousField } from '../structs/ErroneousField.mjs';
import { UnsignedInvoiceRequest } from '../structs/UnsignedInvoiceRequest.mjs';
import { SignInvoiceRequestFn, SignInvoiceRequestFnInterface } from '../structs/SignInvoiceRequestFn.mjs';
import { UnsignedStaticInvoice } from '../structs/UnsignedStaticInvoice.mjs';
import { SignStaticInvoiceFn, SignStaticInvoiceFnInterface } from '../structs/SignStaticInvoiceFn.mjs';
import { OMNameResolver } from '../structs/OMNameResolver.mjs';
import { OnionMessenger } from '../structs/OnionMessenger.mjs';
import { DefaultMessageRouter } from '../structs/DefaultMessageRouter.mjs';
import { NodeIdMessageRouter } from '../structs/NodeIdMessageRouter.mjs';
import { NullMessageRouter } from '../structs/NullMessageRouter.mjs';
import { ParsedOnionMessageContents, ParsedOnionMessageContents_Offers, ParsedOnionMessageContents_AsyncPayments, ParsedOnionMessageContents_DNSResolver, ParsedOnionMessageContents_Custom } from '../structs/ParsedOnionMessageContents.mjs';
import { P2PGossipSync } from '../structs/P2PGossipSync.mjs';
import { DirectedChannelInfo } from '../structs/DirectedChannelInfo.mjs';
import { EffectiveCapacity, EffectiveCapacity_ExactLiquidity, EffectiveCapacity_AdvertisedMaxHTLC, EffectiveCapacity_Total, EffectiveCapacity_Infinite, EffectiveCapacity_HintMaxHTLC, EffectiveCapacity_Unknown } from '../structs/EffectiveCapacity.mjs';
import { FirstHopCandidate } from '../structs/FirstHopCandidate.mjs';
import { PublicHopCandidate } from '../structs/PublicHopCandidate.mjs';
import { PrivateHopCandidate } from '../structs/PrivateHopCandidate.mjs';
import { BlindedPathCandidate } from '../structs/BlindedPathCandidate.mjs';
import { OneHopBlindedPathCandidate } from '../structs/OneHopBlindedPathCandidate.mjs';
import { CandidateRouteHop, CandidateRouteHop_FirstHop, CandidateRouteHop_PublicHop, CandidateRouteHop_PrivateHop, CandidateRouteHop_Blinded, CandidateRouteHop_OneHopBlinded } from '../structs/CandidateRouteHop.mjs';
import { ChannelUsage } from '../structs/ChannelUsage.mjs';
import { ProbabilisticScoringFeeParameters } from '../structs/ProbabilisticScoringFeeParameters.mjs';
import { ScoreLookUp, ScoreLookUpInterface } from '../structs/ScoreLookUp.mjs';
import { ScoreUpdate, ScoreUpdateInterface } from '../structs/ScoreUpdate.mjs';
import { LockableScore, LockableScoreInterface } from '../structs/LockableScore.mjs';
import { DefaultRouter } from '../structs/DefaultRouter.mjs';
import { ScorerAccountingForInFlightHtlcs } from '../structs/ScorerAccountingForInFlightHtlcs.mjs';
import { Payee, Payee_Blinded, Payee_Clear } from '../structs/Payee.mjs';
import { Score, ScoreInterface } from '../structs/Score.mjs';
import { WriteableScore, WriteableScoreInterface } from '../structs/WriteableScore.mjs';
import { MultiThreadedLockableScore } from '../structs/MultiThreadedLockableScore.mjs';
import { MultiThreadedScoreLockRead } from '../structs/MultiThreadedScoreLockRead.mjs';
import { MultiThreadedScoreLockWrite } from '../structs/MultiThreadedScoreLockWrite.mjs';
import { ProbabilisticScoringDecayParameters } from '../structs/ProbabilisticScoringDecayParameters.mjs';
import { CombinedScorer } from '../structs/CombinedScorer.mjs';
import { ChangeDestinationSourceSyncWrapper } from '../structs/ChangeDestinationSourceSyncWrapper.mjs';
import { InMemorySigner } from '../structs/InMemorySigner.mjs';
import { KeysManager } from '../structs/KeysManager.mjs';
import { PhantomKeysManager } from '../structs/PhantomKeysManager.mjs';
import { RandomBytes } from '../structs/RandomBytes.mjs';
import { RapidGossipSync } from '../structs/RapidGossipSync.mjs';
import { GossipSync, GossipSync_P2P, GossipSync_Rapid, GossipSync_None } from '../structs/GossipSync.mjs';
import { RawDataPart } from '../structs/RawDataPart.mjs';
import { ExpiryTime } from '../structs/ExpiryTime.mjs';
import { MinFinalCltvExpiryDelta } from '../structs/MinFinalCltvExpiryDelta.mjs';
import { Fallback, Fallback_SegWitProgram, Fallback_PubKeyHash, Fallback_ScriptHash } from '../structs/Fallback.mjs';

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An Event which you should probably take some action in response to.
 * 
 * Note that while Writeable and Readable are implemented for Event, you probably shouldn't use
 * them directly as they don't round-trip exactly (for example FundingGenerationReady is never
 * written as it makes no sense to respond to it after reconnecting to peers).
 */
export class Event extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Event_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Event {
		const raw_ty: number = bindings.LDKEvent_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Event_FundingGenerationReady(ptr);
			case 1: return new Event_FundingTxBroadcastSafe(ptr);
			case 2: return new Event_PaymentClaimable(ptr);
			case 3: return new Event_PaymentClaimed(ptr);
			case 4: return new Event_ConnectionNeeded(ptr);
			case 5: return new Event_InvoiceReceived(ptr);
			case 6: return new Event_PaymentSent(ptr);
			case 7: return new Event_PaymentFailed(ptr);
			case 8: return new Event_PaymentPathSuccessful(ptr);
			case 9: return new Event_PaymentPathFailed(ptr);
			case 10: return new Event_ProbeSuccessful(ptr);
			case 11: return new Event_ProbeFailed(ptr);
			case 12: return new Event_HTLCIntercepted(ptr);
			case 13: return new Event_SpendableOutputs(ptr);
			case 14: return new Event_PaymentForwarded(ptr);
			case 15: return new Event_ChannelPending(ptr);
			case 16: return new Event_ChannelReady(ptr);
			case 17: return new Event_ChannelClosed(ptr);
			case 18: return new Event_SplicePending(ptr);
			case 19: return new Event_SpliceFailed(ptr);
			case 20: return new Event_DiscardFunding(ptr);
			case 21: return new Event_OpenChannelRequest(ptr);
			case 22: return new Event_HTLCHandlingFailed(ptr);
			case 23: return new Event_BumpTransaction(ptr);
			case 24: return new Event_OnionMessageIntercepted(ptr);
			case 25: return new Event_OnionMessagePeerConnected(ptr);
			case 26: return new Event_PersistStaticInvoice(ptr);
			case 27: return new Event_StaticInvoiceRequested(ptr);
			case 28: return new Event_FundingTransactionReadyForSigning(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Event_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Event
	 */
	public clone(): Event {
		const ret: bigint = bindings.Event_clone(this.ptr);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingGenerationReady-variant Event
	 */
	public static constructor_funding_generation_ready(temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, channel_value_satoshis: bigint, output_script: Uint8Array, user_channel_id: bigint): Event {
		const ret: bigint = bindings.Event_funding_generation_ready(CommonBase.get_ptr_of(temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), channel_value_satoshis, bindings.encodeUint8Array(output_script), bindings.encodeUint128(user_channel_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingTxBroadcastSafe-variant Event
	 */
	public static constructor_funding_tx_broadcast_safe(channel_id: ChannelId, user_channel_id: bigint, funding_txo: OutPoint, counterparty_node_id: Uint8Array, former_temporary_channel_id: ChannelId): Event {
		const ret: bigint = bindings.Event_funding_tx_broadcast_safe(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), CommonBase.get_ptr_of(funding_txo), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(former_temporary_channel_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimable-variant Event
	 */
	public static constructor_payment_claimable(receiver_node_id: Uint8Array, payment_hash: Uint8Array, onion_fields: RecipientOnionFields, amount_msat: bigint, counterparty_skimmed_fee_msat: bigint, purpose: PaymentPurpose, receiving_channel_ids: TwoTuple_ChannelIdCOption_U128ZZ[], claim_deadline: Option_u32Z, payment_id: Option_ThirtyTwoBytesZ): Event {
		const ret: bigint = bindings.Event_payment_claimable(bindings.encodeUint8Array(receiver_node_id), bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(onion_fields), amount_msat, counterparty_skimmed_fee_msat, CommonBase.get_ptr_of(purpose), bindings.encodeUint64Array(receiving_channel_ids.map(receiving_channel_ids_conv_34 => CommonBase.get_ptr_of(receiving_channel_ids_conv_34))), CommonBase.get_ptr_of(claim_deadline), CommonBase.get_ptr_of(payment_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimed-variant Event
	 */
	public static constructor_payment_claimed(receiver_node_id: Uint8Array, payment_hash: Uint8Array, amount_msat: bigint, purpose: PaymentPurpose, htlcs: ClaimedHTLC[], sender_intended_total_msat: Option_u64Z, onion_fields: RecipientOnionFields, payment_id: Option_ThirtyTwoBytesZ): Event {
		const ret: bigint = bindings.Event_payment_claimed(bindings.encodeUint8Array(receiver_node_id), bindings.encodeUint8Array(payment_hash), amount_msat, CommonBase.get_ptr_of(purpose), bindings.encodeUint64Array(htlcs.map(htlcs_conv_13 => CommonBase.get_ptr_of(htlcs_conv_13))), CommonBase.get_ptr_of(sender_intended_total_msat), CommonBase.get_ptr_of(onion_fields), CommonBase.get_ptr_of(payment_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ConnectionNeeded-variant Event
	 */
	public static constructor_connection_needed(node_id: Uint8Array, addresses: SocketAddress[]): Event {
		const ret: bigint = bindings.Event_connection_needed(bindings.encodeUint8Array(node_id), bindings.encodeUint64Array(addresses.map(addresses_conv_15 => CommonBase.get_ptr_of(addresses_conv_15))));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvoiceReceived-variant Event
	 */
	public static constructor_invoice_received(payment_id: Uint8Array, invoice: Bolt12Invoice, context: Option_OffersContextZ, responder: Responder): Event {
		const ret: bigint = bindings.Event_invoice_received(bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(context), CommonBase.get_ptr_of(responder));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentSent-variant Event
	 */
	public static constructor_payment_sent(payment_id: Option_ThirtyTwoBytesZ, payment_preimage: Uint8Array, payment_hash: Uint8Array, amount_msat: Option_u64Z, fee_paid_msat: Option_u64Z, bolt12_invoice: Option_PaidBolt12InvoiceZ): Event {
		const ret: bigint = bindings.Event_payment_sent(CommonBase.get_ptr_of(payment_id), bindings.encodeUint8Array(payment_preimage), bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(amount_msat), CommonBase.get_ptr_of(fee_paid_msat), CommonBase.get_ptr_of(bolt12_invoice));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentFailed-variant Event
	 */
	public static constructor_payment_failed(payment_id: Uint8Array, payment_hash: Option_ThirtyTwoBytesZ, reason: Option_PaymentFailureReasonZ): Event {
		const ret: bigint = bindings.Event_payment_failed(bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(payment_hash), CommonBase.get_ptr_of(reason));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathSuccessful-variant Event
	 */
	public static constructor_payment_path_successful(payment_id: Uint8Array, payment_hash: Option_ThirtyTwoBytesZ, path: Path, hold_times: Uint32Array): Event {
		const ret: bigint = bindings.Event_payment_path_successful(bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(payment_hash), CommonBase.get_ptr_of(path), bindings.encodeUint32Array(hold_times));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathFailed-variant Event
	 */
	public static constructor_payment_path_failed(payment_id: Option_ThirtyTwoBytesZ, payment_hash: Uint8Array, payment_failed_permanently: boolean, failure: PathFailure, path: Path, short_channel_id: Option_u64Z, hold_times: Uint32Array): Event {
		const ret: bigint = bindings.Event_payment_path_failed(CommonBase.get_ptr_of(payment_id), bindings.encodeUint8Array(payment_hash), payment_failed_permanently, CommonBase.get_ptr_of(failure), CommonBase.get_ptr_of(path), CommonBase.get_ptr_of(short_channel_id), bindings.encodeUint32Array(hold_times));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProbeSuccessful-variant Event
	 */
	public static constructor_probe_successful(payment_id: Uint8Array, payment_hash: Uint8Array, path: Path): Event {
		const ret: bigint = bindings.Event_probe_successful(bindings.encodeUint8Array(payment_id), bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(path));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProbeFailed-variant Event
	 */
	public static constructor_probe_failed(payment_id: Uint8Array, payment_hash: Uint8Array, path: Path, short_channel_id: Option_u64Z): Event {
		const ret: bigint = bindings.Event_probe_failed(bindings.encodeUint8Array(payment_id), bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(path), CommonBase.get_ptr_of(short_channel_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCIntercepted-variant Event
	 */
	public static constructor_htlcintercepted(intercept_id: Uint8Array, requested_next_hop_scid: bigint, payment_hash: Uint8Array, inbound_amount_msat: bigint, expected_outbound_amount_msat: bigint): Event {
		const ret: bigint = bindings.Event_htlcintercepted(bindings.encodeUint8Array(intercept_id), requested_next_hop_scid, bindings.encodeUint8Array(payment_hash), inbound_amount_msat, expected_outbound_amount_msat);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpendableOutputs-variant Event
	 */
	public static constructor_spendable_outputs(outputs: SpendableOutputDescriptor[], channel_id: ChannelId): Event {
		const ret: bigint = bindings.Event_spendable_outputs(bindings.encodeUint64Array(outputs.map(outputs_conv_27 => CommonBase.get_ptr_of(outputs_conv_27))), CommonBase.get_ptr_of(channel_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentForwarded-variant Event
	 */
	public static constructor_payment_forwarded(prev_channel_id: ChannelId, next_channel_id: ChannelId, prev_user_channel_id: Option_U128Z, next_user_channel_id: Option_U128Z, prev_node_id: Uint8Array, next_node_id: Uint8Array, total_fee_earned_msat: Option_u64Z, skimmed_fee_msat: Option_u64Z, claim_from_onchain_tx: boolean, outbound_amount_forwarded_msat: Option_u64Z): Event {
		const ret: bigint = bindings.Event_payment_forwarded(CommonBase.get_ptr_of(prev_channel_id), CommonBase.get_ptr_of(next_channel_id), CommonBase.get_ptr_of(prev_user_channel_id), CommonBase.get_ptr_of(next_user_channel_id), bindings.encodeUint8Array(prev_node_id), bindings.encodeUint8Array(next_node_id), CommonBase.get_ptr_of(total_fee_earned_msat), CommonBase.get_ptr_of(skimmed_fee_msat), claim_from_onchain_tx, CommonBase.get_ptr_of(outbound_amount_forwarded_msat));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelPending-variant Event
	 */
	public static constructor_channel_pending(channel_id: ChannelId, user_channel_id: bigint, former_temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, funding_txo: OutPoint, channel_type: ChannelTypeFeatures, funding_redeem_script: Option_CVec_u8ZZ): Event {
		const ret: bigint = bindings.Event_channel_pending(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), CommonBase.get_ptr_of(former_temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(funding_txo), CommonBase.get_ptr_of(channel_type), CommonBase.get_ptr_of(funding_redeem_script));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelReady-variant Event
	 */
	public static constructor_channel_ready(channel_id: ChannelId, user_channel_id: bigint, counterparty_node_id: Uint8Array, funding_txo: Option_OutPointZ, channel_type: ChannelTypeFeatures): Event {
		const ret: bigint = bindings.Event_channel_ready(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(funding_txo), CommonBase.get_ptr_of(channel_type));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant Event
	 */
	public static constructor_channel_closed(channel_id: ChannelId, user_channel_id: bigint, reason: ClosureReason, counterparty_node_id: Uint8Array, channel_capacity_sats: Option_u64Z, channel_funding_txo: OutPoint, last_local_balance_msat: Option_u64Z): Event {
		const ret: bigint = bindings.Event_channel_closed(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), CommonBase.get_ptr_of(reason), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(channel_capacity_sats), CommonBase.get_ptr_of(channel_funding_txo), CommonBase.get_ptr_of(last_local_balance_msat));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SplicePending-variant Event
	 */
	public static constructor_splice_pending(channel_id: ChannelId, user_channel_id: bigint, counterparty_node_id: Uint8Array, new_funding_txo: OutPoint, channel_type: ChannelTypeFeatures, new_funding_redeem_script: Uint8Array): Event {
		const ret: bigint = bindings.Event_splice_pending(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(new_funding_txo), CommonBase.get_ptr_of(channel_type), bindings.encodeUint8Array(new_funding_redeem_script));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpliceFailed-variant Event
	 */
	public static constructor_splice_failed(channel_id: ChannelId, user_channel_id: bigint, counterparty_node_id: Uint8Array, abandoned_funding_txo: Option_OutPointZ, channel_type: ChannelTypeFeatures, contributed_inputs: OutPoint[], contributed_outputs: TxOut[]): Event {
		const ret: bigint = bindings.Event_splice_failed(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(abandoned_funding_txo), CommonBase.get_ptr_of(channel_type), bindings.encodeUint64Array(contributed_inputs.map(contributed_inputs_conv_10 => CommonBase.get_ptr_of(contributed_inputs_conv_10))), bindings.encodeUint64Array(contributed_outputs.map(contributed_outputs_conv_7 => CommonBase.get_ptr_of(contributed_outputs_conv_7))));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DiscardFunding-variant Event
	 */
	public static constructor_discard_funding(channel_id: ChannelId, funding_info: FundingInfo): Event {
		const ret: bigint = bindings.Event_discard_funding(CommonBase.get_ptr_of(channel_id), CommonBase.get_ptr_of(funding_info));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OpenChannelRequest-variant Event
	 */
	public static constructor_open_channel_request(temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, funding_satoshis: bigint, channel_negotiation_type: InboundChannelFunds, channel_type: ChannelTypeFeatures, is_announced: boolean, params: ChannelParameters): Event {
		const ret: bigint = bindings.Event_open_channel_request(CommonBase.get_ptr_of(temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), funding_satoshis, CommonBase.get_ptr_of(channel_negotiation_type), CommonBase.get_ptr_of(channel_type), is_announced, CommonBase.get_ptr_of(params));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCHandlingFailed-variant Event
	 */
	public static constructor_htlchandling_failed(prev_channel_id: ChannelId, failure_type: HTLCHandlingFailureType, failure_reason: Option_HTLCHandlingFailureReasonZ): Event {
		const ret: bigint = bindings.Event_htlchandling_failed(CommonBase.get_ptr_of(prev_channel_id), CommonBase.get_ptr_of(failure_type), CommonBase.get_ptr_of(failure_reason));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BumpTransaction-variant Event
	 */
	public static constructor_bump_transaction(a: BumpTransactionEvent): Event {
		const ret: bigint = bindings.Event_bump_transaction(CommonBase.get_ptr_of(a));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionMessageIntercepted-variant Event
	 */
	public static constructor_onion_message_intercepted(peer_node_id: Uint8Array, message: OnionMessage): Event {
		const ret: bigint = bindings.Event_onion_message_intercepted(bindings.encodeUint8Array(peer_node_id), CommonBase.get_ptr_of(message));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionMessagePeerConnected-variant Event
	 */
	public static constructor_onion_message_peer_connected(peer_node_id: Uint8Array): Event {
		const ret: bigint = bindings.Event_onion_message_peer_connected(bindings.encodeUint8Array(peer_node_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PersistStaticInvoice-variant Event
	 */
	public static constructor_persist_static_invoice(invoice: StaticInvoice, invoice_request_path: BlindedMessagePath, invoice_slot: number, recipient_id: Uint8Array, invoice_persisted_path: Responder): Event {
		const ret: bigint = bindings.Event_persist_static_invoice(CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(invoice_request_path), invoice_slot, bindings.encodeUint8Array(recipient_id), CommonBase.get_ptr_of(invoice_persisted_path));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoiceRequested-variant Event
	 */
	public static constructor_static_invoice_requested(recipient_id: Uint8Array, invoice_slot: number, reply_path: Responder, invoice_request: InvoiceRequest): Event {
		const ret: bigint = bindings.Event_static_invoice_requested(bindings.encodeUint8Array(recipient_id), invoice_slot, CommonBase.get_ptr_of(reply_path), CommonBase.get_ptr_of(invoice_request));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingTransactionReadyForSigning-variant Event
	 */
	public static constructor_funding_transaction_ready_for_signing(channel_id: ChannelId, counterparty_node_id: Uint8Array, user_channel_id: bigint, unsigned_transaction: Uint8Array): Event {
		const ret: bigint = bindings.Event_funding_transaction_ready_for_signing(CommonBase.get_ptr_of(channel_id), bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint128(user_channel_id), bindings.encodeUint8Array(unsigned_transaction));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Events contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: Event): boolean {
		const ret: boolean = bindings.Event_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Event object into a byte array which can be read by Event_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Event_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A Event of type FundingGenerationReady */
export class Event_FundingGenerationReady extends Event {
	/**
	 * The random channel_id we picked which you'll need to pass into
	 * [`ChannelManager::funding_transaction_generated`].
	 * 
	 * [`ChannelManager::funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::funding_transaction_generated
	 */
	public temporary_channel_id: ChannelId;
	/**
	 * The counterparty's node_id, which you'll need to pass back into
	 * [`ChannelManager::funding_transaction_generated`].
	 * 
	 * [`ChannelManager::funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::funding_transaction_generated
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The value, in satoshis, that the output should have.
	 */
	public channel_value_satoshis: bigint;
	/**
	 * The script which should be used in the transaction output.
	 */
	public output_script: Uint8Array;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.  This may be zero for objects
	 * serialized with LDK versions prior to 0.0.113.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const temporary_channel_id: bigint = bindings.LDKEvent_FundingGenerationReady_get_temporary_channel_id(ptr);
		const temporary_channel_id_hu_conv: ChannelId = new ChannelId(null, temporary_channel_id);
			CommonBase.add_ref_from(temporary_channel_id_hu_conv, this);
		this.temporary_channel_id = temporary_channel_id_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_FundingGenerationReady_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		this.channel_value_satoshis = bindings.LDKEvent_FundingGenerationReady_get_channel_value_satoshis(ptr);
		const output_script: number = bindings.LDKEvent_FundingGenerationReady_get_output_script(ptr);
		const output_script_conv: Uint8Array = bindings.decodeUint8Array(output_script);
		this.output_script = output_script_conv;
		const user_channel_id: number = bindings.LDKEvent_FundingGenerationReady_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
	}
}
/** A Event of type FundingTxBroadcastSafe */
export class Event_FundingTxBroadcastSafe extends Event {
	/**
	 * The `channel_id` indicating which channel has reached this stage.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`].
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 */
	public user_channel_id: bigint;
	/**
	 * The outpoint of the channel's funding transaction.
	 */
	public funding_txo: OutPoint;
	/**
	 * The `node_id` of the channel counterparty.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The `temporary_channel_id` this channel used to be known by during channel establishment.
	 */
	public former_temporary_channel_id: ChannelId;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_FundingTxBroadcastSafe_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_FundingTxBroadcastSafe_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const funding_txo: bigint = bindings.LDKEvent_FundingTxBroadcastSafe_get_funding_txo(ptr);
		const funding_txo_hu_conv: OutPoint = new OutPoint(null, funding_txo);
			CommonBase.add_ref_from(funding_txo_hu_conv, this);
		this.funding_txo = funding_txo_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_FundingTxBroadcastSafe_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const former_temporary_channel_id: bigint = bindings.LDKEvent_FundingTxBroadcastSafe_get_former_temporary_channel_id(ptr);
		const former_temporary_channel_id_hu_conv: ChannelId = new ChannelId(null, former_temporary_channel_id);
			CommonBase.add_ref_from(former_temporary_channel_id_hu_conv, this);
		this.former_temporary_channel_id = former_temporary_channel_id_hu_conv;
	}
}
/** A Event of type PaymentClaimable */
export class Event_PaymentClaimable extends Event {
	/**
	 * The node that will receive the payment after it has been claimed.
	 * This is useful to identify payments received via [phantom nodes].
	 * This field will always be filled in when the event was generated by LDK versions
	 * 0.0.113 and above.
	 * 
	 * [phantom nodes]: crate::sign::PhantomKeysManager
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public receiver_node_id: Uint8Array;
	/**
	 * The hash for which the preimage should be handed to the ChannelManager. Note that LDK will
	 * not stop you from registering duplicate payment hashes for inbound payments.
	 */
	public payment_hash: Uint8Array;
	/**
	 * The fields in the onion which were received with each HTLC. Only fields which were
	 * identical in each HTLC involved in the payment will be included here.
	 * 
	 * Payments received on LDK versions prior to 0.0.115 will have this field unset.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public onion_fields: RecipientOnionFields;
	/**
	 * The value, in thousandths of a satoshi, that this payment is claimable for. May be greater
	 * than the invoice amount.
	 * 
	 * May be less than the invoice amount if [`ChannelConfig::accept_underpaying_htlcs`] is set
	 * and the previous hop took an extra fee.
	 * 
	 * # Note
	 * If [`ChannelConfig::accept_underpaying_htlcs`] is set and you claim without verifying this
	 * field, you may lose money!
	 * 
	 * [`ChannelConfig::accept_underpaying_htlcs`]: crate::util::config::ChannelConfig::accept_underpaying_htlcs
	 */
	public amount_msat: bigint;
	/**
	 * The value, in thousands of a satoshi, that was skimmed off of this payment as an extra fee
	 * taken by our channel counterparty.
	 * 
	 * Will always be 0 unless [`ChannelConfig::accept_underpaying_htlcs`] is set.
	 * 
	 * [`ChannelConfig::accept_underpaying_htlcs`]: crate::util::config::ChannelConfig::accept_underpaying_htlcs
	 */
	public counterparty_skimmed_fee_msat: bigint;
	/**
	 * Information for claiming this received payment, based on whether the purpose of the
	 * payment is to pay an invoice or to send a spontaneous payment.
	 */
	public purpose: PaymentPurpose;
	/**
	 * The `(channel_id, user_channel_id)` pairs over which the payment was received.
	 * 
	 * This will be an incomplete vector for MPP payment events created/serialized using LDK version 0.1.0 and prior.
	 */
	public receiving_channel_ids: TwoTuple_ChannelIdCOption_U128ZZ[];
	/**
	 * The block height at which this payment will be failed back and will no longer be
	 * eligible for claiming.
	 * 
	 * Prior to this height, a call to [`ChannelManager::claim_funds`] is guaranteed to
	 * succeed, however you should wait for [`Event::PaymentClaimed`] to be sure.
	 * 
	 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
	 */
	public claim_deadline: Option_u32Z;
	/**
	 * A unique ID describing this payment (derived from the list of HTLCs in the payment).
	 * 
	 * Payers may pay for the same [`PaymentHash`] multiple times (though this is unsafe and
	 * an intermediary node may steal the funds). Thus, in order to accurately track when
	 * payments are received and claimed, you should use this identifier.
	 * 
	 * Only filled in for payments received on LDK versions 0.1 and higher.
	 */
	public payment_id: Option_ThirtyTwoBytesZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const receiver_node_id: number = bindings.LDKEvent_PaymentClaimable_get_receiver_node_id(ptr);
		const receiver_node_id_conv: Uint8Array = bindings.decodeUint8Array(receiver_node_id);
		this.receiver_node_id = receiver_node_id_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentClaimable_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const onion_fields: bigint = bindings.LDKEvent_PaymentClaimable_get_onion_fields(ptr);
		const onion_fields_hu_conv: RecipientOnionFields = new RecipientOnionFields(null, onion_fields);
			CommonBase.add_ref_from(onion_fields_hu_conv, this);
		this.onion_fields = onion_fields_hu_conv;
		this.amount_msat = bindings.LDKEvent_PaymentClaimable_get_amount_msat(ptr);
		this.counterparty_skimmed_fee_msat = bindings.LDKEvent_PaymentClaimable_get_counterparty_skimmed_fee_msat(ptr);
		const purpose: bigint = bindings.LDKEvent_PaymentClaimable_get_purpose(ptr);
		const purpose_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(purpose);
			CommonBase.add_ref_from(purpose_hu_conv, this);
		this.purpose = purpose_hu_conv;
		const receiving_channel_ids: number = bindings.LDKEvent_PaymentClaimable_get_receiving_channel_ids(ptr);
		const receiving_channel_ids_conv_34_len: number = bindings.getArrayLength(receiving_channel_ids);
			const receiving_channel_ids_conv_34_arr: TwoTuple_ChannelIdCOption_U128ZZ[] = new Array(receiving_channel_ids_conv_34_len).fill(null);
			for (var i = 0; i < receiving_channel_ids_conv_34_len; i++) {
				const receiving_channel_ids_conv_34: bigint = bindings.getU64ArrayElem(receiving_channel_ids, i);
				const receiving_channel_ids_conv_34_hu_conv: TwoTuple_ChannelIdCOption_U128ZZ = new TwoTuple_ChannelIdCOption_U128ZZ(null, receiving_channel_ids_conv_34);
				CommonBase.add_ref_from(receiving_channel_ids_conv_34_hu_conv, this);
				receiving_channel_ids_conv_34_arr[i] = receiving_channel_ids_conv_34_hu_conv;
			}
			bindings.freeWasmMemory(receiving_channel_ids)
		this.receiving_channel_ids = receiving_channel_ids_conv_34_arr;
		const claim_deadline: bigint = bindings.LDKEvent_PaymentClaimable_get_claim_deadline(ptr);
		const claim_deadline_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(claim_deadline);
			CommonBase.add_ref_from(claim_deadline_hu_conv, this);
		this.claim_deadline = claim_deadline_hu_conv;
		const payment_id: bigint = bindings.LDKEvent_PaymentClaimable_get_payment_id(ptr);
		const payment_id_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			CommonBase.add_ref_from(payment_id_hu_conv, this);
		this.payment_id = payment_id_hu_conv;
	}
}
/** A Event of type PaymentClaimed */
export class Event_PaymentClaimed extends Event {
	/**
	 * The node that received the payment.
	 * This is useful to identify payments which were received via [phantom nodes].
	 * This field will always be filled in when the event was generated by LDK versions
	 * 0.0.113 and above.
	 * 
	 * [phantom nodes]: crate::sign::PhantomKeysManager
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public receiver_node_id: Uint8Array;
	/**
	 * The payment hash of the claimed payment. Note that LDK will not stop you from
	 * registering duplicate payment hashes for inbound payments.
	 */
	public payment_hash: Uint8Array;
	/**
	 * The value, in thousandths of a satoshi, that this payment is for. May be greater than the
	 * invoice amount.
	 */
	public amount_msat: bigint;
	/**
	 * The purpose of the claimed payment, i.e. whether the payment was for an invoice or a
	 * spontaneous payment.
	 */
	public purpose: PaymentPurpose;
	/**
	 * The HTLCs that comprise the claimed payment. This will be empty for events serialized prior
	 * to LDK version 0.0.117.
	 */
	public htlcs: ClaimedHTLC[];
	/**
	 * The sender-intended sum total of all the MPP parts. This will be `None` for events
	 * serialized prior to LDK version 0.0.117.
	 */
	public sender_intended_total_msat: Option_u64Z;
	/**
	 * The fields in the onion which were received with each HTLC. Only fields which were
	 * identical in each HTLC involved in the payment will be included here.
	 * 
	 * Payments received on LDK versions prior to 0.0.124 will have this field unset.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public onion_fields: RecipientOnionFields;
	/**
	 * A unique ID describing this payment (derived from the list of HTLCs in the payment).
	 * 
	 * Payers may pay for the same [`PaymentHash`] multiple times (though this is unsafe and
	 * an intermediary node may steal the funds). Thus, in order to accurately track when
	 * payments are received and claimed, you should use this identifier.
	 * 
	 * Only filled in for payments received on LDK versions 0.1 and higher.
	 */
	public payment_id: Option_ThirtyTwoBytesZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const receiver_node_id: number = bindings.LDKEvent_PaymentClaimed_get_receiver_node_id(ptr);
		const receiver_node_id_conv: Uint8Array = bindings.decodeUint8Array(receiver_node_id);
		this.receiver_node_id = receiver_node_id_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentClaimed_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		this.amount_msat = bindings.LDKEvent_PaymentClaimed_get_amount_msat(ptr);
		const purpose: bigint = bindings.LDKEvent_PaymentClaimed_get_purpose(ptr);
		const purpose_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(purpose);
			CommonBase.add_ref_from(purpose_hu_conv, this);
		this.purpose = purpose_hu_conv;
		const htlcs: number = bindings.LDKEvent_PaymentClaimed_get_htlcs(ptr);
		const htlcs_conv_13_len: number = bindings.getArrayLength(htlcs);
			const htlcs_conv_13_arr: ClaimedHTLC[] = new Array(htlcs_conv_13_len).fill(null);
			for (var n = 0; n < htlcs_conv_13_len; n++) {
				const htlcs_conv_13: bigint = bindings.getU64ArrayElem(htlcs, n);
				const htlcs_conv_13_hu_conv: ClaimedHTLC = new ClaimedHTLC(null, htlcs_conv_13);
				CommonBase.add_ref_from(htlcs_conv_13_hu_conv, this);
				htlcs_conv_13_arr[n] = htlcs_conv_13_hu_conv;
			}
			bindings.freeWasmMemory(htlcs)
		this.htlcs = htlcs_conv_13_arr;
		const sender_intended_total_msat: bigint = bindings.LDKEvent_PaymentClaimed_get_sender_intended_total_msat(ptr);
		const sender_intended_total_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(sender_intended_total_msat);
			CommonBase.add_ref_from(sender_intended_total_msat_hu_conv, this);
		this.sender_intended_total_msat = sender_intended_total_msat_hu_conv;
		const onion_fields: bigint = bindings.LDKEvent_PaymentClaimed_get_onion_fields(ptr);
		const onion_fields_hu_conv: RecipientOnionFields = new RecipientOnionFields(null, onion_fields);
			CommonBase.add_ref_from(onion_fields_hu_conv, this);
		this.onion_fields = onion_fields_hu_conv;
		const payment_id: bigint = bindings.LDKEvent_PaymentClaimed_get_payment_id(ptr);
		const payment_id_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			CommonBase.add_ref_from(payment_id_hu_conv, this);
		this.payment_id = payment_id_hu_conv;
	}
}
/** A Event of type ConnectionNeeded */
export class Event_ConnectionNeeded extends Event {
	/**
	 * The node id for the node needing a connection.
	 */
	public node_id: Uint8Array;
	/**
	 * Sockets for connecting to the node, if available. We don't require these addresses to be
	 * present in case the node id corresponds to a known peer that is offline and can be awoken,
	 * such as via the LSPS5 protocol.
	 */
	public addresses: SocketAddress[];
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKEvent_ConnectionNeeded_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const addresses: number = bindings.LDKEvent_ConnectionNeeded_get_addresses(ptr);
		const addresses_conv_15_len: number = bindings.getArrayLength(addresses);
			const addresses_conv_15_arr: SocketAddress[] = new Array(addresses_conv_15_len).fill(null);
			for (var p = 0; p < addresses_conv_15_len; p++) {
				const addresses_conv_15: bigint = bindings.getU64ArrayElem(addresses, p);
				const addresses_conv_15_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(addresses_conv_15);
				CommonBase.add_ref_from(addresses_conv_15_hu_conv, this);
				addresses_conv_15_arr[p] = addresses_conv_15_hu_conv;
			}
			bindings.freeWasmMemory(addresses)
		this.addresses = addresses_conv_15_arr;
	}
}
/** A Event of type InvoiceReceived */
export class Event_InvoiceReceived extends Event {
	/**
	 * The `payment_id` associated with payment for the invoice.
	 */
	public payment_id: Uint8Array;
	/**
	 * The invoice to pay.
	 */
	public invoice: Bolt12Invoice;
	/**
	 * The context of the [`BlindedMessagePath`] used to send the invoice.
	 * 
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 */
	public context: Option_OffersContextZ;
	/**
	 * A responder for replying with an [`InvoiceError`] if needed.
	 * 
	 * `None` if the invoice wasn't sent with a reply path.
	 * 
	 * [`InvoiceError`]: crate::offers::invoice_error::InvoiceError
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public responder: Responder;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_InvoiceReceived_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const invoice: bigint = bindings.LDKEvent_InvoiceReceived_get_invoice(ptr);
		const invoice_hu_conv: Bolt12Invoice = new Bolt12Invoice(null, invoice);
			CommonBase.add_ref_from(invoice_hu_conv, this);
		this.invoice = invoice_hu_conv;
		const context: bigint = bindings.LDKEvent_InvoiceReceived_get_context(ptr);
		const context_hu_conv: Option_OffersContextZ = Option_OffersContextZ.constr_from_ptr(context);
			CommonBase.add_ref_from(context_hu_conv, this);
		this.context = context_hu_conv;
		const responder: bigint = bindings.LDKEvent_InvoiceReceived_get_responder(ptr);
		const responder_hu_conv: Responder = new Responder(null, responder);
			CommonBase.add_ref_from(responder_hu_conv, this);
		this.responder = responder_hu_conv;
	}
}
/** A Event of type PaymentSent */
export class Event_PaymentSent extends Event {
	/**
	 * The `payment_id` passed to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_id: Option_ThirtyTwoBytesZ;
	/**
	 * The preimage to the hash given to ChannelManager::send_payment.
	 * Note that this serves as a payment receipt, if you wish to have such a thing, you must
	 * store it somehow!
	 */
	public payment_preimage: Uint8Array;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_hash: Uint8Array;
	/**
	 * The total amount that was paid, across all paths.
	 * 
	 * Note that, like [`Route::get_total_amount`], this does *not* include the paid fees.
	 * 
	 * This is only `None` for payments initiated on LDK versions prior to 0.2.
	 * 
	 * [`Route::get_total_amount`]: crate::routing::router::Route::get_total_amount
	 */
	public amount_msat: Option_u64Z;
	/**
	 * The total fee which was spent at intermediate hops in this payment, across all paths.
	 * 
	 * Note that, like [`Route::get_total_fees`], this does *not* include any potential
	 * overpayment to the recipient node.
	 * 
	 * If the recipient or an intermediate node misbehaves and gives us free money, this may
	 * overstate the amount paid, though this is unlikely.
	 * 
	 * This is only `None` for payments initiated on LDK versions prior to 0.0.103.
	 * 
	 * [`Route::get_total_fees`]: crate::routing::router::Route::get_total_fees
	 */
	public fee_paid_msat: Option_u64Z;
	/**
	 * The BOLT 12 invoice that was paid. `None` if the payment was a non BOLT 12 payment.
	 * 
	 * The BOLT 12 invoice is useful for proof of payment because it contains the
	 * payment hash. A third party can verify that the payment was made by
	 * showing the invoice and confirming that the payment hash matches
	 * the hash of the payment preimage.
	 * 
	 * However, the [`PaidBolt12Invoice`] can also be of type [`StaticInvoice`], which
	 * is a special [`Bolt12Invoice`] where proof of payment is not possible.
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 */
	public bolt12_invoice: Option_PaidBolt12InvoiceZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: bigint = bindings.LDKEvent_PaymentSent_get_payment_id(ptr);
		const payment_id_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			CommonBase.add_ref_from(payment_id_hu_conv, this);
		this.payment_id = payment_id_hu_conv;
		const payment_preimage: number = bindings.LDKEvent_PaymentSent_get_payment_preimage(ptr);
		const payment_preimage_conv: Uint8Array = bindings.decodeUint8Array(payment_preimage);
		this.payment_preimage = payment_preimage_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentSent_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const amount_msat: bigint = bindings.LDKEvent_PaymentSent_get_amount_msat(ptr);
		const amount_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(amount_msat);
			CommonBase.add_ref_from(amount_msat_hu_conv, this);
		this.amount_msat = amount_msat_hu_conv;
		const fee_paid_msat: bigint = bindings.LDKEvent_PaymentSent_get_fee_paid_msat(ptr);
		const fee_paid_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(fee_paid_msat);
			CommonBase.add_ref_from(fee_paid_msat_hu_conv, this);
		this.fee_paid_msat = fee_paid_msat_hu_conv;
		const bolt12_invoice: bigint = bindings.LDKEvent_PaymentSent_get_bolt12_invoice(ptr);
		const bolt12_invoice_hu_conv: Option_PaidBolt12InvoiceZ = Option_PaidBolt12InvoiceZ.constr_from_ptr(bolt12_invoice);
			CommonBase.add_ref_from(bolt12_invoice_hu_conv, this);
		this.bolt12_invoice = bolt12_invoice_hu_conv;
	}
}
/** A Event of type PaymentFailed */
export class Event_PaymentFailed extends Event {
	/**
	 * The `payment_id` passed to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`]. `None` if the payment failed
	 * before receiving an invoice when paying a BOLT12 [`Offer`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public payment_hash: Option_ThirtyTwoBytesZ;
	/**
	 * The reason the payment failed. This is only `None` for events generated or serialized
	 * by versions prior to 0.0.115, or when downgrading to a version with a reason that was
	 * added after.
	 */
	public reason: Option_PaymentFailureReasonZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_PaymentFailed_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: bigint = bindings.LDKEvent_PaymentFailed_get_payment_hash(ptr);
		const payment_hash_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			CommonBase.add_ref_from(payment_hash_hu_conv, this);
		this.payment_hash = payment_hash_hu_conv;
		const reason: bigint = bindings.LDKEvent_PaymentFailed_get_reason(ptr);
		const reason_hu_conv: Option_PaymentFailureReasonZ = Option_PaymentFailureReasonZ.constr_from_ptr(reason);
			CommonBase.add_ref_from(reason_hu_conv, this);
		this.reason = reason_hu_conv;
	}
}
/** A Event of type PaymentPathSuccessful */
export class Event_PaymentPathSuccessful extends Event {
	/**
	 * The `payment_id` passed to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`].
	 * 
	 * This will be `Some` for all payments which completed on LDK 0.0.104 or later.
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_hash: Option_ThirtyTwoBytesZ;
	/**
	 * The payment path that was successful.
	 * 
	 * May contain a closed channel if the HTLC sent along the path was fulfilled on chain.
	 */
	public path: Path;
	/**
	 * The time that each hop indicated it held the HTLC.
	 * 
	 * The unit in which the hold times are expressed are 100's of milliseconds. So a hop
	 * reporting 2 is a hold time that corresponds to between 200 and 299 milliseconds.
	 * 
	 * We expect that at each hop the actual hold time will be strictly greater than the hold
	 * time of the following hops, as a node along the path shouldn't have completed the HTLC
	 * until the next node has completed it. Note that because hold times are in 100's of ms,
	 * hold times as reported are likely to often be equal across hops.
	 * 
	 * If our peer didn't provide attribution data or the HTLC resolved on chain, the list
	 * will be empty.
	 * 
	 * Each entry will correspond with one entry in [`Path::hops`], or, thereafter, the
	 * [`BlindedTail::trampoline_hops`] in [`Path::blinded_tail`]. Because not all nodes
	 * support hold times, the list may be shorter than the number of hops in the path.
	 */
	public hold_times: Uint32Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_PaymentPathSuccessful_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: bigint = bindings.LDKEvent_PaymentPathSuccessful_get_payment_hash(ptr);
		const payment_hash_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			CommonBase.add_ref_from(payment_hash_hu_conv, this);
		this.payment_hash = payment_hash_hu_conv;
		const path: bigint = bindings.LDKEvent_PaymentPathSuccessful_get_path(ptr);
		const path_hu_conv: Path = new Path(null, path);
			CommonBase.add_ref_from(path_hu_conv, this);
		this.path = path_hu_conv;
		const hold_times: number = bindings.LDKEvent_PaymentPathSuccessful_get_hold_times(ptr);
		const hold_times_conv: Uint32Array = bindings.decodeUint32Array(hold_times);
		this.hold_times = hold_times_conv;
	}
}
/** A Event of type PaymentPathFailed */
export class Event_PaymentPathFailed extends Event {
	/**
	 * The `payment_id` passed to [`ChannelManager::send_payment`].
	 * 
	 * This will be `Some` for all payment paths which failed on LDK 0.0.103 or later.
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public payment_id: Option_ThirtyTwoBytesZ;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_hash: Uint8Array;
	/**
	 * Indicates the payment was rejected for some reason by the recipient. This implies that
	 * the payment has failed, not just the route in question. If this is not set, the payment may
	 * be retried via a different route.
	 */
	public payment_failed_permanently: boolean;
	/**
	 * Extra error details based on the failure type. May contain an update that needs to be
	 * applied to the [`NetworkGraph`].
	 * 
	 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
	 */
	public failure: PathFailure;
	/**
	 * The payment path that failed.
	 */
	public path: Path;
	/**
	 * The channel responsible for the failed payment path.
	 * 
	 * Note that for route hints or for the first hop in a path this may be an SCID alias and
	 * may not refer to a channel in the public network graph. These aliases may also collide
	 * with channels in the public network graph.
	 * 
	 * If this is `Some`, then the corresponding channel should be avoided when the payment is
	 * retried. May be `None` for older [`Event`] serializations.
	 */
	public short_channel_id: Option_u64Z;
	/**
	 * The time that each hop indicated it held the HTLC.
	 * 
	 * The unit in which the hold times are expressed are 100's of milliseconds. So a hop
	 * reporting 2 is a hold time that corresponds to between 200 and 299 milliseconds.
	 * 
	 * We expect that at each hop the actual hold time will be strictly greater than the hold
	 * time of the following hops, as a node along the path shouldn't have completed the HTLC
	 * until the next node has completed it. Note that because hold times are in 100's of ms,
	 * hold times as reported are likely to often be equal across hops.
	 * 
	 * If our peer didn't provide attribution data or the HTLC resolved on chain, the list
	 * will be empty.
	 * 
	 * Each entry will correspond with one entry in [`Path::hops`], or, thereafter, the
	 * [`BlindedTail::trampoline_hops`] in [`Path::blinded_tail`]. Because not all nodes
	 * support hold times, the list may be shorter than the number of hops in the path.
	 */
	public hold_times: Uint32Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: bigint = bindings.LDKEvent_PaymentPathFailed_get_payment_id(ptr);
		const payment_id_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			CommonBase.add_ref_from(payment_id_hu_conv, this);
		this.payment_id = payment_id_hu_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentPathFailed_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		this.payment_failed_permanently = bindings.LDKEvent_PaymentPathFailed_get_payment_failed_permanently(ptr);
		const failure: bigint = bindings.LDKEvent_PaymentPathFailed_get_failure(ptr);
		const failure_hu_conv: PathFailure = PathFailure.constr_from_ptr(failure);
			CommonBase.add_ref_from(failure_hu_conv, this);
		this.failure = failure_hu_conv;
		const path: bigint = bindings.LDKEvent_PaymentPathFailed_get_path(ptr);
		const path_hu_conv: Path = new Path(null, path);
			CommonBase.add_ref_from(path_hu_conv, this);
		this.path = path_hu_conv;
		const short_channel_id: bigint = bindings.LDKEvent_PaymentPathFailed_get_short_channel_id(ptr);
		const short_channel_id_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(short_channel_id);
			CommonBase.add_ref_from(short_channel_id_hu_conv, this);
		this.short_channel_id = short_channel_id_hu_conv;
		const hold_times: number = bindings.LDKEvent_PaymentPathFailed_get_hold_times(ptr);
		const hold_times_conv: Uint32Array = bindings.decodeUint32Array(hold_times);
		this.hold_times = hold_times_conv;
	}
}
/** A Event of type ProbeSuccessful */
export class Event_ProbeSuccessful extends Event {
	/**
	 * The id returned by [`ChannelManager::send_probe`].
	 * 
	 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash generated by [`ChannelManager::send_probe`].
	 * 
	 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
	 */
	public payment_hash: Uint8Array;
	/**
	 * The payment path that was successful.
	 */
	public path: Path;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_ProbeSuccessful_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: number = bindings.LDKEvent_ProbeSuccessful_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const path: bigint = bindings.LDKEvent_ProbeSuccessful_get_path(ptr);
		const path_hu_conv: Path = new Path(null, path);
			CommonBase.add_ref_from(path_hu_conv, this);
		this.path = path_hu_conv;
	}
}
/** A Event of type ProbeFailed */
export class Event_ProbeFailed extends Event {
	/**
	 * The id returned by [`ChannelManager::send_probe`].
	 * 
	 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash generated by [`ChannelManager::send_probe`].
	 * 
	 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
	 */
	public payment_hash: Uint8Array;
	/**
	 * The payment path that failed.
	 */
	public path: Path;
	/**
	 * The channel responsible for the failed probe.
	 * 
	 * Note that for route hints or for the first hop in a path this may be an SCID alias and
	 * may not refer to a channel in the public network graph. These aliases may also collide
	 * with channels in the public network graph.
	 */
	public short_channel_id: Option_u64Z;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_ProbeFailed_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: number = bindings.LDKEvent_ProbeFailed_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const path: bigint = bindings.LDKEvent_ProbeFailed_get_path(ptr);
		const path_hu_conv: Path = new Path(null, path);
			CommonBase.add_ref_from(path_hu_conv, this);
		this.path = path_hu_conv;
		const short_channel_id: bigint = bindings.LDKEvent_ProbeFailed_get_short_channel_id(ptr);
		const short_channel_id_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(short_channel_id);
			CommonBase.add_ref_from(short_channel_id_hu_conv, this);
		this.short_channel_id = short_channel_id_hu_conv;
	}
}
/** A Event of type HTLCIntercepted */
export class Event_HTLCIntercepted extends Event {
	/**
	 * An id to help LDK identify which HTLC is being forwarded or failed.
	 */
	public intercept_id: Uint8Array;
	/**
	 * The fake scid that was programmed as the next hop's scid, generated using
	 * [`ChannelManager::get_intercept_scid`].
	 * 
	 * [`ChannelManager::get_intercept_scid`]: crate::ln::channelmanager::ChannelManager::get_intercept_scid
	 */
	public requested_next_hop_scid: bigint;
	/**
	 * The payment hash used for this HTLC.
	 */
	public payment_hash: Uint8Array;
	/**
	 * How many msats were received on the inbound edge of this HTLC.
	 */
	public inbound_amount_msat: bigint;
	/**
	 * How many msats the payer intended to route to the next node. Depending on the reason you are
	 * intercepting this payment, you might take a fee by forwarding less than this amount.
	 * Forwarding less than this amount may break compatibility with LDK versions prior to 0.0.116.
	 * 
	 * Note that LDK will NOT check that expected fees were factored into this value. You MUST
	 * check that whatever fee you want has been included here or subtract it as required. Further,
	 * LDK will not stop you from forwarding more than you received.
	 */
	public expected_outbound_amount_msat: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const intercept_id: number = bindings.LDKEvent_HTLCIntercepted_get_intercept_id(ptr);
		const intercept_id_conv: Uint8Array = bindings.decodeUint8Array(intercept_id);
		this.intercept_id = intercept_id_conv;
		this.requested_next_hop_scid = bindings.LDKEvent_HTLCIntercepted_get_requested_next_hop_scid(ptr);
		const payment_hash: number = bindings.LDKEvent_HTLCIntercepted_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		this.inbound_amount_msat = bindings.LDKEvent_HTLCIntercepted_get_inbound_amount_msat(ptr);
		this.expected_outbound_amount_msat = bindings.LDKEvent_HTLCIntercepted_get_expected_outbound_amount_msat(ptr);
	}
}
/** A Event of type SpendableOutputs */
export class Event_SpendableOutputs extends Event {
	/**
	 * The outputs which you should store as spendable by you.
	 */
	public outputs: SpendableOutputDescriptor[];
	/**
	 * The `channel_id` indicating which channel the spendable outputs belong to.
	 * 
	 * This will always be `Some` for events generated by LDK versions 0.0.117 and above.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public channel_id: ChannelId;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const outputs: number = bindings.LDKEvent_SpendableOutputs_get_outputs(ptr);
		const outputs_conv_27_len: number = bindings.getArrayLength(outputs);
			const outputs_conv_27_arr: SpendableOutputDescriptor[] = new Array(outputs_conv_27_len).fill(null);
			for (var b = 0; b < outputs_conv_27_len; b++) {
				const outputs_conv_27: bigint = bindings.getU64ArrayElem(outputs, b);
				const outputs_conv_27_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(outputs_conv_27);
				CommonBase.add_ref_from(outputs_conv_27_hu_conv, this);
				outputs_conv_27_arr[b] = outputs_conv_27_hu_conv;
			}
			bindings.freeWasmMemory(outputs)
		this.outputs = outputs_conv_27_arr;
		const channel_id: bigint = bindings.LDKEvent_SpendableOutputs_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
	}
}
/** A Event of type PaymentForwarded */
export class Event_PaymentForwarded extends Event {
	/**
	 * The channel id of the incoming channel between the previous node and us.
	 * 
	 * This is only `None` for events generated or serialized by versions prior to 0.0.107.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public prev_channel_id: ChannelId;
	/**
	 * The channel id of the outgoing channel between the next node and us.
	 * 
	 * This is only `None` for events generated or serialized by versions prior to 0.0.107.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public next_channel_id: ChannelId;
	/**
	 * The `user_channel_id` of the incoming channel between the previous node and us.
	 * 
	 * This is only `None` for events generated or serialized by versions prior to 0.0.122.
	 */
	public prev_user_channel_id: Option_U128Z;
	/**
	 * The `user_channel_id` of the outgoing channel between the next node and us.
	 * 
	 * This will be `None` if the payment was settled via an on-chain transaction. See the
	 * caveat described for the `total_fee_earned_msat` field. Moreover it will be `None` for
	 * events generated or serialized by versions prior to 0.0.122.
	 */
	public next_user_channel_id: Option_U128Z;
	/**
	 * The node id of the previous node.
	 * 
	 * This is only `None` for HTLCs received prior to 0.1 or for events serialized by
	 * versions prior to 0.1
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public prev_node_id: Uint8Array;
	/**
	 * The node id of the next node.
	 * 
	 * This is only `None` for HTLCs received prior to 0.1 or for events serialized by
	 * versions prior to 0.1
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public next_node_id: Uint8Array;
	/**
	 * The total fee, in milli-satoshis, which was earned as a result of the payment.
	 * 
	 * Note that if we force-closed the channel over which we forwarded an HTLC while the HTLC
	 * was pending, the amount the next hop claimed will have been rounded down to the nearest
	 * whole satoshi. Thus, the fee calculated here may be higher than expected as we still
	 * claimed the full value in millisatoshis from the source. In this case,
	 * `claim_from_onchain_tx` will be set.
	 * 
	 * If the channel which sent us the payment has been force-closed, we will claim the funds
	 * via an on-chain transaction. In that case we do not yet know the on-chain transaction
	 * fees which we will spend and will instead set this to `None`. It is possible duplicate
	 * `PaymentForwarded` events are generated for the same payment iff `total_fee_earned_msat` is
	 * `None`.
	 */
	public total_fee_earned_msat: Option_u64Z;
	/**
	 * The share of the total fee, in milli-satoshis, which was withheld in addition to the
	 * forwarding fee.
	 * 
	 * This will only be `Some` if we forwarded an intercepted HTLC with less than the
	 * expected amount. This means our counterparty accepted to receive less than the invoice
	 * amount, e.g., by claiming the payment featuring a corresponding
	 * [`PaymentClaimable::counterparty_skimmed_fee_msat`].
	 * 
	 * Will also always be `None` for events serialized with LDK prior to version 0.0.122.
	 * 
	 * The caveat described above the `total_fee_earned_msat` field applies here as well.
	 * 
	 * [`PaymentClaimable::counterparty_skimmed_fee_msat`]: Self::PaymentClaimable::counterparty_skimmed_fee_msat
	 */
	public skimmed_fee_msat: Option_u64Z;
	/**
	 * If this is `true`, the forwarded HTLC was claimed by our counterparty via an on-chain
	 * transaction.
	 */
	public claim_from_onchain_tx: boolean;
	/**
	 * The final amount forwarded, in milli-satoshis, after the fee is deducted.
	 * 
	 * The caveat described above the `total_fee_earned_msat` field applies here as well.
	 */
	public outbound_amount_forwarded_msat: Option_u64Z;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const prev_channel_id: bigint = bindings.LDKEvent_PaymentForwarded_get_prev_channel_id(ptr);
		const prev_channel_id_hu_conv: ChannelId = new ChannelId(null, prev_channel_id);
			CommonBase.add_ref_from(prev_channel_id_hu_conv, this);
		this.prev_channel_id = prev_channel_id_hu_conv;
		const next_channel_id: bigint = bindings.LDKEvent_PaymentForwarded_get_next_channel_id(ptr);
		const next_channel_id_hu_conv: ChannelId = new ChannelId(null, next_channel_id);
			CommonBase.add_ref_from(next_channel_id_hu_conv, this);
		this.next_channel_id = next_channel_id_hu_conv;
		const prev_user_channel_id: bigint = bindings.LDKEvent_PaymentForwarded_get_prev_user_channel_id(ptr);
		const prev_user_channel_id_hu_conv: Option_U128Z = Option_U128Z.constr_from_ptr(prev_user_channel_id);
			CommonBase.add_ref_from(prev_user_channel_id_hu_conv, this);
		this.prev_user_channel_id = prev_user_channel_id_hu_conv;
		const next_user_channel_id: bigint = bindings.LDKEvent_PaymentForwarded_get_next_user_channel_id(ptr);
		const next_user_channel_id_hu_conv: Option_U128Z = Option_U128Z.constr_from_ptr(next_user_channel_id);
			CommonBase.add_ref_from(next_user_channel_id_hu_conv, this);
		this.next_user_channel_id = next_user_channel_id_hu_conv;
		const prev_node_id: number = bindings.LDKEvent_PaymentForwarded_get_prev_node_id(ptr);
		const prev_node_id_conv: Uint8Array = bindings.decodeUint8Array(prev_node_id);
		this.prev_node_id = prev_node_id_conv;
		const next_node_id: number = bindings.LDKEvent_PaymentForwarded_get_next_node_id(ptr);
		const next_node_id_conv: Uint8Array = bindings.decodeUint8Array(next_node_id);
		this.next_node_id = next_node_id_conv;
		const total_fee_earned_msat: bigint = bindings.LDKEvent_PaymentForwarded_get_total_fee_earned_msat(ptr);
		const total_fee_earned_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(total_fee_earned_msat);
			CommonBase.add_ref_from(total_fee_earned_msat_hu_conv, this);
		this.total_fee_earned_msat = total_fee_earned_msat_hu_conv;
		const skimmed_fee_msat: bigint = bindings.LDKEvent_PaymentForwarded_get_skimmed_fee_msat(ptr);
		const skimmed_fee_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(skimmed_fee_msat);
			CommonBase.add_ref_from(skimmed_fee_msat_hu_conv, this);
		this.skimmed_fee_msat = skimmed_fee_msat_hu_conv;
		this.claim_from_onchain_tx = bindings.LDKEvent_PaymentForwarded_get_claim_from_onchain_tx(ptr);
		const outbound_amount_forwarded_msat: bigint = bindings.LDKEvent_PaymentForwarded_get_outbound_amount_forwarded_msat(ptr);
		const outbound_amount_forwarded_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(outbound_amount_forwarded_msat);
			CommonBase.add_ref_from(outbound_amount_forwarded_msat_hu_conv, this);
		this.outbound_amount_forwarded_msat = outbound_amount_forwarded_msat_hu_conv;
	}
}
/** A Event of type ChannelPending */
export class Event_ChannelPending extends Event {
	/**
	 * The `channel_id` of the channel that is pending confirmation.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The `temporary_channel_id` this channel used to be known by during channel establishment.
	 * 
	 * Will be `None` for channels created prior to LDK version 0.0.115.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public former_temporary_channel_id: ChannelId;
	/**
	 * The `node_id` of the channel counterparty.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The outpoint of the channel's funding transaction.
	 */
	public funding_txo: OutPoint;
	/**
	 * The features that this channel will operate with.
	 * 
	 * Will be `None` for channels created prior to LDK version 0.0.122.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public channel_type: ChannelTypeFeatures;
	/**
	 * The witness script that is used to lock the channel's funding output to commitment transactions.
	 * 
	 * This field will be `None` for objects serialized with LDK versions prior to 0.2.0.
	 */
	public funding_redeem_script: Option_CVec_u8ZZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_ChannelPending_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_ChannelPending_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const former_temporary_channel_id: bigint = bindings.LDKEvent_ChannelPending_get_former_temporary_channel_id(ptr);
		const former_temporary_channel_id_hu_conv: ChannelId = new ChannelId(null, former_temporary_channel_id);
			CommonBase.add_ref_from(former_temporary_channel_id_hu_conv, this);
		this.former_temporary_channel_id = former_temporary_channel_id_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_ChannelPending_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const funding_txo: bigint = bindings.LDKEvent_ChannelPending_get_funding_txo(ptr);
		const funding_txo_hu_conv: OutPoint = new OutPoint(null, funding_txo);
			CommonBase.add_ref_from(funding_txo_hu_conv, this);
		this.funding_txo = funding_txo_hu_conv;
		const channel_type: bigint = bindings.LDKEvent_ChannelPending_get_channel_type(ptr);
		const channel_type_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, channel_type);
			CommonBase.add_ref_from(channel_type_hu_conv, this);
		this.channel_type = channel_type_hu_conv;
		const funding_redeem_script: bigint = bindings.LDKEvent_ChannelPending_get_funding_redeem_script(ptr);
		const funding_redeem_script_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(funding_redeem_script);
			CommonBase.add_ref_from(funding_redeem_script_hu_conv, this);
		this.funding_redeem_script = funding_redeem_script_hu_conv;
	}
}
/** A Event of type ChannelReady */
export class Event_ChannelReady extends Event {
	/**
	 * The `channel_id` of the channel that is ready.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The `node_id` of the channel counterparty.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The outpoint of the channel's funding transaction.
	 * 
	 * Will be `None` if the channel's funding transaction reached an acceptable depth prior to
	 * version 0.2.
	 */
	public funding_txo: Option_OutPointZ;
	/**
	 * The features that this channel will operate with.
	 */
	public channel_type: ChannelTypeFeatures;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_ChannelReady_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_ChannelReady_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const counterparty_node_id: number = bindings.LDKEvent_ChannelReady_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const funding_txo: bigint = bindings.LDKEvent_ChannelReady_get_funding_txo(ptr);
		const funding_txo_hu_conv: Option_OutPointZ = Option_OutPointZ.constr_from_ptr(funding_txo);
			CommonBase.add_ref_from(funding_txo_hu_conv, this);
		this.funding_txo = funding_txo_hu_conv;
		const channel_type: bigint = bindings.LDKEvent_ChannelReady_get_channel_type(ptr);
		const channel_type_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, channel_type);
			CommonBase.add_ref_from(channel_type_hu_conv, this);
		this.channel_type = channel_type_hu_conv;
	}
}
/** A Event of type ChannelClosed */
export class Event_ChannelClosed extends Event {
	/**
	 * The `channel_id` of the channel which has been closed. Note that on-chain transactions
	 * resolving the channel are likely still awaiting confirmation.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for inbound channels.
	 * This may be zero for inbound channels serialized prior to 0.0.113 and will always be
	 * zero for objects serialized with LDK versions prior to 0.0.102.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The reason the channel was closed.
	 */
	public reason: ClosureReason;
	/**
	 * Counterparty in the closed channel.
	 * 
	 * This field will be `None` for objects serialized prior to LDK 0.0.117.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * Channel capacity of the closing channel (sats).
	 * 
	 * This field will be `None` for objects serialized prior to LDK 0.0.117.
	 */
	public channel_capacity_sats: Option_u64Z;
	/**
	 * The original channel funding TXO; this helps checking for the existence and confirmation
	 * status of the closing tx.
	 * Note that for instances serialized in v0.0.119 or prior this will be missing (None).
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public channel_funding_txo: OutPoint;
	/**
	 * An upper bound on the our last local balance in msats before the channel was closed.
	 * 
	 * Will overstate our balance as it ignores pending outbound HTLCs and transaction fees.
	 * 
	 * For more accurate balances including fee information see
	 * [`ChainMonitor::get_claimable_balances`].
	 * 
	 * This field will be `None` only for objects serialized prior to LDK 0.1.
	 * 
	 * [`ChainMonitor::get_claimable_balances`]: crate::chain::chainmonitor::ChainMonitor::get_claimable_balances
	 */
	public last_local_balance_msat: Option_u64Z;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_ChannelClosed_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_ChannelClosed_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const reason: bigint = bindings.LDKEvent_ChannelClosed_get_reason(ptr);
		const reason_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(reason);
			CommonBase.add_ref_from(reason_hu_conv, this);
		this.reason = reason_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_ChannelClosed_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const channel_capacity_sats: bigint = bindings.LDKEvent_ChannelClosed_get_channel_capacity_sats(ptr);
		const channel_capacity_sats_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(channel_capacity_sats);
			CommonBase.add_ref_from(channel_capacity_sats_hu_conv, this);
		this.channel_capacity_sats = channel_capacity_sats_hu_conv;
		const channel_funding_txo: bigint = bindings.LDKEvent_ChannelClosed_get_channel_funding_txo(ptr);
		const channel_funding_txo_hu_conv: OutPoint = new OutPoint(null, channel_funding_txo);
			CommonBase.add_ref_from(channel_funding_txo_hu_conv, this);
		this.channel_funding_txo = channel_funding_txo_hu_conv;
		const last_local_balance_msat: bigint = bindings.LDKEvent_ChannelClosed_get_last_local_balance_msat(ptr);
		const last_local_balance_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(last_local_balance_msat);
			CommonBase.add_ref_from(last_local_balance_msat_hu_conv, this);
		this.last_local_balance_msat = last_local_balance_msat_hu_conv;
	}
}
/** A Event of type SplicePending */
export class Event_SplicePending extends Event {
	/**
	 * The `channel_id` of the channel that has a pending splice funding transaction.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The `node_id` of the channel counterparty.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The outpoint of the channel's splice funding transaction.
	 */
	public new_funding_txo: OutPoint;
	/**
	 * The features that this channel will operate with. Currently, these will be the same
	 * features that the channel was opened with, but in the future splices may change them.
	 */
	public channel_type: ChannelTypeFeatures;
	/**
	 * The witness script that is used to lock the channel's funding output to commitment transactions.
	 */
	public new_funding_redeem_script: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_SplicePending_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_SplicePending_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const counterparty_node_id: number = bindings.LDKEvent_SplicePending_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const new_funding_txo: bigint = bindings.LDKEvent_SplicePending_get_new_funding_txo(ptr);
		const new_funding_txo_hu_conv: OutPoint = new OutPoint(null, new_funding_txo);
			CommonBase.add_ref_from(new_funding_txo_hu_conv, this);
		this.new_funding_txo = new_funding_txo_hu_conv;
		const channel_type: bigint = bindings.LDKEvent_SplicePending_get_channel_type(ptr);
		const channel_type_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, channel_type);
			CommonBase.add_ref_from(channel_type_hu_conv, this);
		this.channel_type = channel_type_hu_conv;
		const new_funding_redeem_script: number = bindings.LDKEvent_SplicePending_get_new_funding_redeem_script(ptr);
		const new_funding_redeem_script_conv: Uint8Array = bindings.decodeUint8Array(new_funding_redeem_script);
		this.new_funding_redeem_script = new_funding_redeem_script_conv;
	}
}
/** A Event of type SpliceFailed */
export class Event_SpliceFailed extends Event {
	/**
	 * The `channel_id` of the channel for which the splice failed.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The `node_id` of the channel counterparty.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The outpoint of the channel's splice funding transaction, if one was created.
	 */
	public abandoned_funding_txo: Option_OutPointZ;
	/**
	 * The features that this channel will operate with, if available.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public channel_type: ChannelTypeFeatures;
	/**
	 * UTXOs spent as inputs contributed to the splice transaction.
	 */
	public contributed_inputs: OutPoint[];
	/**
	 * Outputs contributed to the splice transaction.
	 */
	public contributed_outputs: TxOut[];
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_SpliceFailed_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_SpliceFailed_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const counterparty_node_id: number = bindings.LDKEvent_SpliceFailed_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const abandoned_funding_txo: bigint = bindings.LDKEvent_SpliceFailed_get_abandoned_funding_txo(ptr);
		const abandoned_funding_txo_hu_conv: Option_OutPointZ = Option_OutPointZ.constr_from_ptr(abandoned_funding_txo);
			CommonBase.add_ref_from(abandoned_funding_txo_hu_conv, this);
		this.abandoned_funding_txo = abandoned_funding_txo_hu_conv;
		const channel_type: bigint = bindings.LDKEvent_SpliceFailed_get_channel_type(ptr);
		const channel_type_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, channel_type);
			CommonBase.add_ref_from(channel_type_hu_conv, this);
		this.channel_type = channel_type_hu_conv;
		const contributed_inputs: number = bindings.LDKEvent_SpliceFailed_get_contributed_inputs(ptr);
		const contributed_inputs_conv_10_len: number = bindings.getArrayLength(contributed_inputs);
			const contributed_inputs_conv_10_arr: OutPoint[] = new Array(contributed_inputs_conv_10_len).fill(null);
			for (var k = 0; k < contributed_inputs_conv_10_len; k++) {
				const contributed_inputs_conv_10: bigint = bindings.getU64ArrayElem(contributed_inputs, k);
				const contributed_inputs_conv_10_hu_conv: OutPoint = new OutPoint(null, contributed_inputs_conv_10);
				CommonBase.add_ref_from(contributed_inputs_conv_10_hu_conv, this);
				contributed_inputs_conv_10_arr[k] = contributed_inputs_conv_10_hu_conv;
			}
			bindings.freeWasmMemory(contributed_inputs)
		this.contributed_inputs = contributed_inputs_conv_10_arr;
		const contributed_outputs: number = bindings.LDKEvent_SpliceFailed_get_contributed_outputs(ptr);
		const contributed_outputs_conv_7_len: number = bindings.getArrayLength(contributed_outputs);
			const contributed_outputs_conv_7_arr: TxOut[] = new Array(contributed_outputs_conv_7_len).fill(null);
			for (var h = 0; h < contributed_outputs_conv_7_len; h++) {
				const contributed_outputs_conv_7: bigint = bindings.getU64ArrayElem(contributed_outputs, h);
				const contributed_outputs_conv_7_conv: TxOut = new TxOut(null, contributed_outputs_conv_7);
				contributed_outputs_conv_7_arr[h] = contributed_outputs_conv_7_conv;
			}
			bindings.freeWasmMemory(contributed_outputs)
		this.contributed_outputs = contributed_outputs_conv_7_arr;
	}
}
/** A Event of type DiscardFunding */
export class Event_DiscardFunding extends Event {
	/**
	 * The channel_id of the channel which has been closed.
	 */
	public channel_id: ChannelId;
	/**
	 * The full transaction received from the user
	 */
	public funding_info: FundingInfo;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_DiscardFunding_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const funding_info: bigint = bindings.LDKEvent_DiscardFunding_get_funding_info(ptr);
		const funding_info_hu_conv: FundingInfo = FundingInfo.constr_from_ptr(funding_info);
			CommonBase.add_ref_from(funding_info_hu_conv, this);
		this.funding_info = funding_info_hu_conv;
	}
}
/** A Event of type OpenChannelRequest */
export class Event_OpenChannelRequest extends Event {
	/**
	 * The temporary channel ID of the channel requested to be opened.
	 * 
	 * When responding to the request, the `temporary_channel_id` should be passed
	 * back to the ChannelManager through [`ChannelManager::accept_inbound_channel`] to accept,
	 * or through [`ChannelManager::force_close_broadcasting_latest_txn`] to reject.
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
	 */
	public temporary_channel_id: ChannelId;
	/**
	 * The node_id of the counterparty requesting to open the channel.
	 * 
	 * When responding to the request, the `counterparty_node_id` should be passed
	 * back to the `ChannelManager` through [`ChannelManager::accept_inbound_channel`] to
	 * accept the request, or through [`ChannelManager::force_close_broadcasting_latest_txn`]
	 * to reject the request.
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The channel value of the requested channel.
	 */
	public funding_satoshis: bigint;
	/**
	 * If `channel_negotiation_type` is `InboundChannelFunds::DualFunded`, this indicates that the peer wishes to
	 * open a dual-funded channel. Otherwise, this field will be `InboundChannelFunds::PushMsats`,
	 * indicating the `push_msats` value our peer is pushing to us for a non-dual-funded channel.
	 */
	public channel_negotiation_type: InboundChannelFunds;
	/**
	 * The features that this channel will operate with. If you reject the channel, a
	 * well-behaved counterparty may automatically re-attempt the channel with a new set of
	 * feature flags.
	 * 
	 * Note that if [`ChannelTypeFeatures::supports_scid_privacy`] returns true on this type,
	 * the resulting [`ChannelManager`] will not be readable by versions of LDK prior to
	 * 0.0.106.
	 * 
	 * Furthermore, note that if [`ChannelTypeFeatures::supports_zero_conf`] returns true on this type,
	 * the resulting [`ChannelManager`] will not be readable by versions of LDK prior to
	 * 0.0.107. Channels setting this type also need to get manually accepted via
	 * [`crate::ln::channelmanager::ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`],
	 * or will be rejected otherwise.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 */
	public channel_type: ChannelTypeFeatures;
	/**
	 * True if this channel is (or will be) publicly-announced.
	 */
	public is_announced: boolean;
	/**
	 * Channel parameters given by the counterparty.
	 */
	public params: ChannelParameters;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const temporary_channel_id: bigint = bindings.LDKEvent_OpenChannelRequest_get_temporary_channel_id(ptr);
		const temporary_channel_id_hu_conv: ChannelId = new ChannelId(null, temporary_channel_id);
			CommonBase.add_ref_from(temporary_channel_id_hu_conv, this);
		this.temporary_channel_id = temporary_channel_id_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_OpenChannelRequest_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		this.funding_satoshis = bindings.LDKEvent_OpenChannelRequest_get_funding_satoshis(ptr);
		const channel_negotiation_type: bigint = bindings.LDKEvent_OpenChannelRequest_get_channel_negotiation_type(ptr);
		const channel_negotiation_type_hu_conv: InboundChannelFunds = InboundChannelFunds.constr_from_ptr(channel_negotiation_type);
			CommonBase.add_ref_from(channel_negotiation_type_hu_conv, this);
		this.channel_negotiation_type = channel_negotiation_type_hu_conv;
		const channel_type: bigint = bindings.LDKEvent_OpenChannelRequest_get_channel_type(ptr);
		const channel_type_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, channel_type);
			CommonBase.add_ref_from(channel_type_hu_conv, this);
		this.channel_type = channel_type_hu_conv;
		this.is_announced = bindings.LDKEvent_OpenChannelRequest_get_is_announced(ptr);
		const params: bigint = bindings.LDKEvent_OpenChannelRequest_get_params(ptr);
		const params_hu_conv: ChannelParameters = new ChannelParameters(null, params);
			CommonBase.add_ref_from(params_hu_conv, this);
		this.params = params_hu_conv;
	}
}
/** A Event of type HTLCHandlingFailed */
export class Event_HTLCHandlingFailed extends Event {
	/**
	 * The channel over which the HTLC was received.
	 */
	public prev_channel_id: ChannelId;
	/**
	 * The type of HTLC handling that failed.
	 */
	public failure_type: HTLCHandlingFailureType;
	/**
	 * The reason that the HTLC failed.
	 * 
	 * This field will be `None` only for objects serialized prior to LDK 0.2.0.
	 */
	public failure_reason: Option_HTLCHandlingFailureReasonZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const prev_channel_id: bigint = bindings.LDKEvent_HTLCHandlingFailed_get_prev_channel_id(ptr);
		const prev_channel_id_hu_conv: ChannelId = new ChannelId(null, prev_channel_id);
			CommonBase.add_ref_from(prev_channel_id_hu_conv, this);
		this.prev_channel_id = prev_channel_id_hu_conv;
		const failure_type: bigint = bindings.LDKEvent_HTLCHandlingFailed_get_failure_type(ptr);
		const failure_type_hu_conv: HTLCHandlingFailureType = HTLCHandlingFailureType.constr_from_ptr(failure_type);
			CommonBase.add_ref_from(failure_type_hu_conv, this);
		this.failure_type = failure_type_hu_conv;
		const failure_reason: bigint = bindings.LDKEvent_HTLCHandlingFailed_get_failure_reason(ptr);
		const failure_reason_hu_conv: Option_HTLCHandlingFailureReasonZ = Option_HTLCHandlingFailureReasonZ.constr_from_ptr(failure_reason);
			CommonBase.add_ref_from(failure_reason_hu_conv, this);
		this.failure_reason = failure_reason_hu_conv;
	}
}
/** A Event of type BumpTransaction */
export class Event_BumpTransaction extends Event {
	public bump_transaction: BumpTransactionEvent;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const bump_transaction: bigint = bindings.LDKEvent_BumpTransaction_get_bump_transaction(ptr);
		const bump_transaction_hu_conv: BumpTransactionEvent = BumpTransactionEvent.constr_from_ptr(bump_transaction);
			CommonBase.add_ref_from(bump_transaction_hu_conv, this);
		this.bump_transaction = bump_transaction_hu_conv;
	}
}
/** A Event of type OnionMessageIntercepted */
export class Event_OnionMessageIntercepted extends Event {
	/**
	 * The node id of the offline peer.
	 */
	public peer_node_id: Uint8Array;
	/**
	 * The onion message intended to be forwarded to `peer_node_id`.
	 */
	public message: OnionMessage;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const peer_node_id: number = bindings.LDKEvent_OnionMessageIntercepted_get_peer_node_id(ptr);
		const peer_node_id_conv: Uint8Array = bindings.decodeUint8Array(peer_node_id);
		this.peer_node_id = peer_node_id_conv;
		const message: bigint = bindings.LDKEvent_OnionMessageIntercepted_get_message(ptr);
		const message_hu_conv: OnionMessage = new OnionMessage(null, message);
			CommonBase.add_ref_from(message_hu_conv, this);
		this.message = message_hu_conv;
	}
}
/** A Event of type OnionMessagePeerConnected */
export class Event_OnionMessagePeerConnected extends Event {
	/**
	 * The node id of the peer we just connected to, who advertises support for
	 * onion messages.
	 */
	public peer_node_id: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const peer_node_id: number = bindings.LDKEvent_OnionMessagePeerConnected_get_peer_node_id(ptr);
		const peer_node_id_conv: Uint8Array = bindings.decodeUint8Array(peer_node_id);
		this.peer_node_id = peer_node_id_conv;
	}
}
/** A Event of type PersistStaticInvoice */
export class Event_PersistStaticInvoice extends Event {
	/**
	 * The invoice that should be persisted and later provided to payers when handling a future
	 * [`Event::StaticInvoiceRequested`].
	 */
	public invoice: StaticInvoice;
	/**
	 * The path to where invoice requests will be forwarded. If we receive an invoice
	 * request, we'll forward it to the async recipient over this path in case the
	 * recipient is online to provide a new invoice. This path should be persisted and
	 * later provided to [`ChannelManager::respond_to_static_invoice_request`].
	 * 
	 * This path's [`BlindedMessagePath::introduction_node`] MUST be set to our node or one of our
	 * peers. This is because, for DoS protection, invoice requests forwarded over this path are
	 * treated by our node like any other onion message forward and will not generate
	 * [`Event::ConnectionNeeded`] if the first hop in the path is not our peer.
	 * 
	 * If the next-hop peer in the path is offline, if configured to do so we will generate an
	 * [`Event::OnionMessageIntercepted`] for the invoice request.
	 * 
	 * [`ChannelManager::respond_to_static_invoice_request`]: crate::ln::channelmanager::ChannelManager::respond_to_static_invoice_request
	 */
	public invoice_request_path: BlindedMessagePath;
	/**
	 * Useful for the recipient to replace a specific invoice stored by us as the static invoice
	 * server.
	 * 
	 * When this invoice and its metadata are persisted, this slot number should be included so if
	 * we receive another [`Event::PersistStaticInvoice`] containing the same slot number we can
	 * swap the existing invoice out for the new one.
	 */
	public invoice_slot: number;
	/**
	 * An identifier for the recipient, originally provided to
	 * [`ChannelManager::blinded_paths_for_async_recipient`].
	 * 
	 * When an [`Event::StaticInvoiceRequested`] comes in for the invoice, this id will be surfaced
	 * and can be used alongside the `invoice_slot` to retrieve the invoice from the database.
	 * 
	 * [`ChannelManager::blinded_paths_for_async_recipient`]: crate::ln::channelmanager::ChannelManager::blinded_paths_for_async_recipient
	 */
	public recipient_id: Uint8Array;
	/**
	 * Once the [`StaticInvoice`] and `invoice_slot` are persisted,
	 * [`ChannelManager::static_invoice_persisted`] should be called with this responder to confirm
	 * to the recipient that their [`Offer`] is ready to be used for async payments.
	 * 
	 * [`ChannelManager::static_invoice_persisted`]: crate::ln::channelmanager::ChannelManager::static_invoice_persisted
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public invoice_persisted_path: Responder;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const invoice: bigint = bindings.LDKEvent_PersistStaticInvoice_get_invoice(ptr);
		const invoice_hu_conv: StaticInvoice = new StaticInvoice(null, invoice);
			CommonBase.add_ref_from(invoice_hu_conv, this);
		this.invoice = invoice_hu_conv;
		const invoice_request_path: bigint = bindings.LDKEvent_PersistStaticInvoice_get_invoice_request_path(ptr);
		const invoice_request_path_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, invoice_request_path);
			CommonBase.add_ref_from(invoice_request_path_hu_conv, this);
		this.invoice_request_path = invoice_request_path_hu_conv;
		this.invoice_slot = bindings.LDKEvent_PersistStaticInvoice_get_invoice_slot(ptr);
		const recipient_id: number = bindings.LDKEvent_PersistStaticInvoice_get_recipient_id(ptr);
		const recipient_id_conv: Uint8Array = bindings.decodeUint8Array(recipient_id);
		this.recipient_id = recipient_id_conv;
		const invoice_persisted_path: bigint = bindings.LDKEvent_PersistStaticInvoice_get_invoice_persisted_path(ptr);
		const invoice_persisted_path_hu_conv: Responder = new Responder(null, invoice_persisted_path);
			CommonBase.add_ref_from(invoice_persisted_path_hu_conv, this);
		this.invoice_persisted_path = invoice_persisted_path_hu_conv;
	}
}
/** A Event of type StaticInvoiceRequested */
export class Event_StaticInvoiceRequested extends Event {
	/**
	 * An identifier for the recipient previously surfaced in
	 * [`Event::PersistStaticInvoice::recipient_id`]. Useful when paired with the `invoice_slot` to
	 * retrieve the [`StaticInvoice`] requested by the payer.
	 */
	public recipient_id: Uint8Array;
	/**
	 * The slot number for the invoice being requested, previously surfaced in
	 * [`Event::PersistStaticInvoice::invoice_slot`]. Useful when paired with the `recipient_id` to
	 * retrieve the [`StaticInvoice`] requested by the payer.
	 */
	public invoice_slot: number;
	/**
	 * The path over which the [`StaticInvoice`] will be sent to the payer, which should be
	 * provided to [`ChannelManager::respond_to_static_invoice_request`] along with the invoice.
	 * 
	 * [`ChannelManager::respond_to_static_invoice_request`]: crate::ln::channelmanager::ChannelManager::respond_to_static_invoice_request
	 */
	public reply_path: Responder;
	/**
	 * The invoice request that will be forwarded to the async recipient to give the
	 * recipient a chance to provide an invoice in case it is online. It should be
	 * provided to [`ChannelManager::respond_to_static_invoice_request`].
	 * 
	 * [`ChannelManager::respond_to_static_invoice_request`]: crate::ln::channelmanager::ChannelManager::respond_to_static_invoice_request
	 */
	public invoice_request: InvoiceRequest;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const recipient_id: number = bindings.LDKEvent_StaticInvoiceRequested_get_recipient_id(ptr);
		const recipient_id_conv: Uint8Array = bindings.decodeUint8Array(recipient_id);
		this.recipient_id = recipient_id_conv;
		this.invoice_slot = bindings.LDKEvent_StaticInvoiceRequested_get_invoice_slot(ptr);
		const reply_path: bigint = bindings.LDKEvent_StaticInvoiceRequested_get_reply_path(ptr);
		const reply_path_hu_conv: Responder = new Responder(null, reply_path);
			CommonBase.add_ref_from(reply_path_hu_conv, this);
		this.reply_path = reply_path_hu_conv;
		const invoice_request: bigint = bindings.LDKEvent_StaticInvoiceRequested_get_invoice_request(ptr);
		const invoice_request_hu_conv: InvoiceRequest = new InvoiceRequest(null, invoice_request);
			CommonBase.add_ref_from(invoice_request_hu_conv, this);
		this.invoice_request = invoice_request_hu_conv;
	}
}
/** A Event of type FundingTransactionReadyForSigning */
export class Event_FundingTransactionReadyForSigning extends Event {
	/**
	 * The `channel_id` of the channel which you'll need to pass back into
	 * [`ChannelManager::funding_transaction_signed`].
	 * 
	 * [`ChannelManager::funding_transaction_signed`]: crate::ln::channelmanager::ChannelManager::funding_transaction_signed
	 */
	public channel_id: ChannelId;
	/**
	 * The counterparty's `node_id`, which you'll need to pass back into
	 * [`ChannelManager::funding_transaction_signed`].
	 * 
	 * [`ChannelManager::funding_transaction_signed`]: crate::ln::channelmanager::ChannelManager::funding_transaction_signed
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The `user_channel_id` value passed in for outbound channels, or for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for inbound channels.
	 * 
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The unsigned transaction to be signed and passed back to
	 * [`ChannelManager::funding_transaction_signed`].
	 * 
	 * [`ChannelManager::funding_transaction_signed`]: crate::ln::channelmanager::ChannelManager::funding_transaction_signed
	 */
	public unsigned_transaction: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_FundingTransactionReadyForSigning_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_FundingTransactionReadyForSigning_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const user_channel_id: number = bindings.LDKEvent_FundingTransactionReadyForSigning_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const unsigned_transaction: number = bindings.LDKEvent_FundingTransactionReadyForSigning_get_unsigned_transaction(ptr);
		const unsigned_transaction_conv: Uint8Array = bindings.decodeUint8Array(unsigned_transaction);
		this.unsigned_transaction = unsigned_transaction_conv;
	}
}
