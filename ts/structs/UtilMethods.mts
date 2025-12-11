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
import { Event, Event_FundingGenerationReady, Event_FundingTxBroadcastSafe, Event_PaymentClaimable, Event_PaymentClaimed, Event_ConnectionNeeded, Event_InvoiceReceived, Event_PaymentSent, Event_PaymentFailed, Event_PaymentPathSuccessful, Event_PaymentPathFailed, Event_ProbeSuccessful, Event_ProbeFailed, Event_HTLCIntercepted, Event_SpendableOutputs, Event_PaymentForwarded, Event_ChannelPending, Event_ChannelReady, Event_ChannelClosed, Event_SplicePending, Event_SpliceFailed, Event_DiscardFunding, Event_OpenChannelRequest, Event_HTLCHandlingFailed, Event_BumpTransaction, Event_OnionMessageIntercepted, Event_OnionMessagePeerConnected, Event_PersistStaticInvoice, Event_StaticInvoiceRequested, Event_FundingTransactionReadyForSigning } from '../structs/Event.mjs';
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


export class UtilMethods extends CommonBase {
	/**
	 * Gets the 128-bit integer, as 16 little-endian bytes
	 */
	public static constructor_U128_le_bytes(val: bigint): Uint8Array {
		const ret: number = bindings.U128_le_bytes(bindings.encodeUint128(val));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Constructs a new U128 from 16 little-endian bytes
	 */
	public static constructor_U128_new(le_bytes: Uint8Array): bigint {
		const ret: number = bindings.U128_new(bindings.encodeUint8Array(le_bytes));
		const ret_conv: bigint = bindings.decodeUint128(ret);
		return ret_conv;
	}

	/**
	 * Constructs a new COption_NoneZ containing a
	 */
	public static constructor_COption_NoneZ_some(): COption_NoneZ {
		const ret: COption_NoneZ = bindings.COption_NoneZ_some();
		return ret;
	}

	/**
	 * Constructs a new COption_NoneZ containing nothing
	 */
	public static constructor_COption_NoneZ_none(): COption_NoneZ {
		const ret: COption_NoneZ = bindings.COption_NoneZ_none();
		return ret;
	}

	/**
	 * Returns the amount that needs to be maintained as a reserve per anchor channel.
	 * 
	 * This reserve currently needs to be allocated as a disjoint set of at least 1 UTXO per channel,
	 * as claims are not yet aggregated across channels.
	 * 
	 * To only require 1 UTXO per channel, it is assumed that, on average, transactions are able to
	 * get confirmed within 1 block with [ConfirmationTarget::UrgentOnChainSweep], or that only a
	 * portion of channels will go through unilateral closure at the same time, allowing UTXOs to be
	 * shared. Otherwise, multiple UTXOs would be needed per channel:
	 * - HTLC time-out transactions with different expiries cannot be aggregated. This could result in
	 * many individual transactions that need to be confirmed starting from different, but potentially
	 * sequential block heights.
	 * - If each transaction takes N blocks to confirm, at least N UTXOs per channel are needed to
	 * provide the necessary concurrency.
	 * 
	 * The returned amount includes the fee to spend a single UTXO of the type indicated by
	 * [AnchorChannelReserveContext::taproot_wallet]. Larger sets of UTXOs with more complex witnesses
	 * will need to include the corresponding fee required to spend them.
	 * 
	 * [ConfirmationTarget::UrgentOnChainSweep]: crate::chain::chaininterface::ConfirmationTarget::UrgentOnChainSweep
	 */
	public static constructor_get_reserve_per_channel(context: AnchorChannelReserveContext): bigint {
		const ret: bigint = bindings.get_reserve_per_channel(CommonBase.get_ptr_of(context));
		return ret;
	}

	/**
	 * Calculates the number of anchor channels that can be supported by the reserve provided
	 * by `utxos`.
	 */
	public static constructor_get_supportable_anchor_channels(context: AnchorChannelReserveContext, utxos: Utxo[]): bigint {
		const ret: bigint = bindings.get_supportable_anchor_channels(CommonBase.get_ptr_of(context), bindings.encodeUint64Array(utxos.map(utxos_conv_6 => CommonBase.get_ptr_of(utxos_conv_6))));
		return ret;
	}

	/**
	 * Verifies whether the anchor channel reserve provided by `utxos` is sufficient to support
	 * an additional anchor channel.
	 * 
	 * This should be verified:
	 * - Before opening a new outbound anchor channel with [ChannelManager::create_channel].
	 * - Before accepting a new inbound anchor channel while handling [Event::OpenChannelRequest].
	 * 
	 * [ChannelManager::create_channel]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [Event::OpenChannelRequest]: crate::events::Event::OpenChannelRequest
	 */
	public static constructor_can_support_additional_anchor_channel(context: AnchorChannelReserveContext, utxos: Utxo[], a_channel_manager: ChannelManager, chain_monitor: ChainMonitor): boolean {
		const ret: boolean = bindings.can_support_additional_anchor_channel(CommonBase.get_ptr_of(context), bindings.encodeUint64Array(utxos.map(utxos_conv_6 => CommonBase.get_ptr_of(utxos_conv_6))), CommonBase.get_ptr_of(a_channel_manager), CommonBase.get_ptr_of(chain_monitor));
		return ret;
	}

	/**
	 * Read a APIError from a byte array, created by APIError_write
	 */
	public static constructor_APIError_read(ser: Uint8Array): Result_COption_APIErrorZDecodeErrorZ {
		const ret: bigint = bindings.APIError_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_APIErrorZDecodeErrorZ = Result_COption_APIErrorZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a digital signature of a message given a SecretKey, like the node's secret.
	 * A receiver knowing the PublicKey (e.g. the node's id) and the message can be sure that the signature was generated by the caller.
	 * Signatures are EC recoverable, meaning that given the message and the signature the PublicKey of the signer can be extracted.
	 */
	public static constructor_sign(msg: Uint8Array, sk: Uint8Array): string {
		const ret: number = bindings.sign(bindings.encodeUint8Array(msg), bindings.encodeUint8Array(sk));
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Recovers the PublicKey of the signer of the message given the message and the signature.
	 */
	public static constructor_recover_pk(msg: Uint8Array, sig: string): Result_PublicKeySecp256k1ErrorZ {
		const ret: bigint = bindings.recover_pk(bindings.encodeUint8Array(msg), bindings.encodeString(sig));
		const ret_hu_conv: Result_PublicKeySecp256k1ErrorZ = Result_PublicKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies a message was signed by a PrivateKey that derives to a given PublicKey, given a message, a signature,
	 * and the PublicKey.
	 */
	public static constructor_verify(msg: Uint8Array, sig: string, pk: Uint8Array): boolean {
		const ret: boolean = bindings.verify(bindings.encodeUint8Array(msg), bindings.encodeString(sig), bindings.encodeUint8Array(pk));
		return ret;
	}

	/**
	 * Migrates all data from one store to another.
	 * 
	 * This operation assumes that `target_store` is empty, i.e., any data present under copied keys
	 * might get overriden. User must ensure `source_store` is not modified during operation,
	 * otherwise no consistency guarantees can be given.
	 * 
	 * Will abort and return an error if any IO operation fails. Note that in this case the
	 * `target_store` might get left in an intermediate state.
	 */
	public static constructor_migrate_kv_store_data(source_store: MigratableKVStore, target_store: MigratableKVStore): Result_NoneIOErrorZ {
		const ret: bigint = bindings.migrate_kv_store_data(CommonBase.get_ptr_of(source_store), CommonBase.get_ptr_of(target_store));
		const ret_hu_conv: Result_NoneIOErrorZ = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read previously persisted [`ChannelMonitor`]s from the store.
	 */
	public static constructor_read_channel_monitors(kv_store: KVStoreSync, entropy_source: EntropySource, signer_provider: SignerProvider): Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ {
		const ret: bigint = bindings.read_channel_monitors(CommonBase.get_ptr_of(kv_store), CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(signer_provider));
		const ret_hu_conv: Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ = Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, kv_store);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, signer_provider);
		return ret_hu_conv;
	}

	/**
	 * Extracts the block height (most significant 3-bytes) from the `short_channel_id`
	 */
	public static constructor_block_from_scid(short_channel_id: bigint): number {
		const ret: number = bindings.block_from_scid(short_channel_id);
		return ret;
	}

	/**
	 * Extracts the tx index (bytes [2..4]) from the `short_channel_id`
	 */
	public static constructor_tx_index_from_scid(short_channel_id: bigint): number {
		const ret: number = bindings.tx_index_from_scid(short_channel_id);
		return ret;
	}

	/**
	 * Extracts the vout (bytes [0..2]) from the `short_channel_id`
	 */
	public static constructor_vout_from_scid(short_channel_id: bigint): number {
		const ret: number = bindings.vout_from_scid(short_channel_id);
		return ret;
	}

	/**
	 * Constructs a `short_channel_id` using the components pieces. Results in an error
	 * if the block height, tx index, or vout index overflow the maximum sizes.
	 */
	public static constructor_scid_from_parts(block: bigint, tx_index: bigint, vout_index: bigint): Result_u64ShortChannelIdErrorZ {
		const ret: bigint = bindings.scid_from_parts(block, tx_index, vout_index);
		const ret_hu_conv: Result_u64ShortChannelIdErrorZ = Result_u64ShortChannelIdErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a C2Tuple_BestBlockOutputSweeperSyncZ from a byte array, created by C2Tuple_BestBlockOutputSweeperSyncZ_write
	 */
	public static constructor_C2Tuple_BestBlockOutputSweeperSyncZ_read(ser: Uint8Array, arg_a: BroadcasterInterface, arg_b: FeeEstimator, arg_c: Option_FilterZ, arg_d: OutputSpender, arg_e: ChangeDestinationSourceSync, arg_f: KVStoreSync, arg_g: Logger): Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ {
		const ret: bigint = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_read(bindings.encodeUint8Array(ser), CommonBase.get_ptr_of(arg_a), CommonBase.get_ptr_of(arg_b), CommonBase.get_ptr_of(arg_c), CommonBase.get_ptr_of(arg_d), CommonBase.get_ptr_of(arg_e), CommonBase.get_ptr_of(arg_f), CommonBase.get_ptr_of(arg_g));
		const ret_hu_conv: Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ = Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, arg_a);
		CommonBase.add_ref_from(ret_hu_conv, arg_b);
		CommonBase.add_ref_from(ret_hu_conv, arg_c);
		CommonBase.add_ref_from(ret_hu_conv, arg_d);
		CommonBase.add_ref_from(ret_hu_conv, arg_e);
		CommonBase.add_ref_from(ret_hu_conv, arg_f);
		CommonBase.add_ref_from(ret_hu_conv, arg_g);
		return ret_hu_conv;
	}

	/**
	 * Read a MonitorEvent from a byte array, created by MonitorEvent_write
	 */
	public static constructor_MonitorEvent_read(ser: Uint8Array): Result_COption_MonitorEventZDecodeErrorZ {
		const ret: bigint = bindings.MonitorEvent_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_MonitorEventZDecodeErrorZ = Result_COption_MonitorEventZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a C2Tuple_ThirtyTwoBytesChannelMonitorZ from a byte array, created by C2Tuple_ThirtyTwoBytesChannelMonitorZ_write
	 */
	public static constructor_C2Tuple_ThirtyTwoBytesChannelMonitorZ_read(ser: Uint8Array, arg_a: EntropySource, arg_b: SignerProvider): Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesChannelMonitorZ_read(bindings.encodeUint8Array(ser), CommonBase.get_ptr_of(arg_a), CommonBase.get_ptr_of(arg_b));
		const ret_hu_conv: Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ = Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, arg_a);
		CommonBase.add_ref_from(ret_hu_conv, arg_b);
		return ret_hu_conv;
	}

	/**
	 * Read a PathFailure from a byte array, created by PathFailure_write
	 */
	public static constructor_PathFailure_read(ser: Uint8Array): Result_COption_PathFailureZDecodeErrorZ {
		const ret: bigint = bindings.PathFailure_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_PathFailureZDecodeErrorZ = Result_COption_PathFailureZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a ClosureReason from a byte array, created by ClosureReason_write
	 */
	public static constructor_ClosureReason_read(ser: Uint8Array): Result_COption_ClosureReasonZDecodeErrorZ {
		const ret: bigint = bindings.ClosureReason_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_ClosureReasonZDecodeErrorZ = Result_COption_ClosureReasonZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a HTLCHandlingFailureType from a byte array, created by HTLCHandlingFailureType_write
	 */
	public static constructor_HTLCHandlingFailureType_read(ser: Uint8Array): Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ {
		const ret: bigint = bindings.HTLCHandlingFailureType_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ = Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a PaymentFailureReason from a byte array, created by PaymentFailureReason_write
	 */
	public static constructor_PaymentFailureReason_read(ser: Uint8Array): Result_COption_PaymentFailureReasonZDecodeErrorZ {
		const ret: bigint = bindings.PaymentFailureReason_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_PaymentFailureReasonZDecodeErrorZ = Result_COption_PaymentFailureReasonZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a Event from a byte array, created by Event_write
	 */
	public static constructor_Event_read(ser: Uint8Array): Result_COption_EventZDecodeErrorZ {
		const ret: bigint = bindings.Event_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_EventZDecodeErrorZ = Result_COption_EventZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Maximum number of in-flight HTLCs in each direction allowed by the lightning protocol.
	 * 
	 * 483 for non-zero-fee-commitment channels and 114 for zero-fee-commitment channels.
	 * 
	 * Actual maximums can be set equal to or below this value by each channel participant.
	 */
	public static constructor_max_htlcs(channel_type: ChannelTypeFeatures): number {
		const ret: number = bindings.max_htlcs(CommonBase.get_ptr_of(channel_type));
		return ret;
	}

	/**
	 * Gets the weight for an HTLC-Success transaction.
	 */
	public static constructor_htlc_success_tx_weight(channel_type_features: ChannelTypeFeatures): bigint {
		const ret: bigint = bindings.htlc_success_tx_weight(CommonBase.get_ptr_of(channel_type_features));
		return ret;
	}

	/**
	 * Gets the weight of a single input-output pair in externally funded HTLC-success transactions
	 */
	public static constructor_aggregated_htlc_success_input_output_pair_weight(channel_type_features: ChannelTypeFeatures): bigint {
		const ret: bigint = bindings.aggregated_htlc_success_input_output_pair_weight(CommonBase.get_ptr_of(channel_type_features));
		return ret;
	}

	/**
	 * Gets the weight for an HTLC-Timeout transaction.
	 */
	public static constructor_htlc_timeout_tx_weight(channel_type_features: ChannelTypeFeatures): bigint {
		const ret: bigint = bindings.htlc_timeout_tx_weight(CommonBase.get_ptr_of(channel_type_features));
		return ret;
	}

	/**
	 * Gets the weight of a single input-output pair in externally funded HTLC-timeout transactions
	 */
	public static constructor_aggregated_htlc_timeout_input_output_pair_weight(channel_type_features: ChannelTypeFeatures): bigint {
		const ret: bigint = bindings.aggregated_htlc_timeout_input_output_pair_weight(CommonBase.get_ptr_of(channel_type_features));
		return ret;
	}

	/**
	 * Check if a given input witness attempts to claim a HTLC.
	 */
	public static constructor_HTLCClaim_from_witness(witness: Uint8Array): Option_HTLCClaimZ {
		const ret: bigint = bindings.HTLCClaim_from_witness(bindings.encodeUint8Array(witness));
		const ret_hu_conv: Option_HTLCClaimZ = Option_HTLCClaimZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build the commitment secret from the seed and the commitment number
	 */
	public static constructor_build_commitment_secret(commitment_seed: Uint8Array, idx: bigint): Uint8Array {
		const ret: number = bindings.build_commitment_secret(bindings.encodeUint8Array(commitment_seed), idx);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Build a closing transaction
	 */
	public static constructor_build_closing_transaction(to_holder_value_sat: bigint, to_counterparty_value_sat: bigint, to_holder_script: Uint8Array, to_counterparty_script: Uint8Array, funding_outpoint: OutPoint): Uint8Array {
		const ret: number = bindings.build_closing_transaction(to_holder_value_sat, to_counterparty_value_sat, bindings.encodeUint8Array(to_holder_script), bindings.encodeUint8Array(to_counterparty_script), CommonBase.get_ptr_of(funding_outpoint));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Derives a per-commitment-transaction private key (eg an htlc key or delayed_payment key)
	 * from the base secret and the per_commitment_point.
	 */
	public static constructor_derive_private_key(per_commitment_point: Uint8Array, base_secret: Uint8Array): Uint8Array {
		const ret: number = bindings.derive_private_key(bindings.encodeUint8Array(per_commitment_point), bindings.encodeUint8Array(base_secret));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Derives a per-commitment-transaction revocation key from its constituent parts.
	 * 
	 * Only the cheating participant owns a valid witness to propagate a revoked
	 * commitment transaction, thus per_commitment_secret always come from cheater
	 * and revocation_base_secret always come from punisher, which is the broadcaster
	 * of the transaction spending with this key knowledge.
	 */
	public static constructor_derive_private_revocation_key(per_commitment_secret: Uint8Array, countersignatory_revocation_base_secret: Uint8Array): Uint8Array {
		const ret: number = bindings.derive_private_revocation_key(bindings.encodeUint8Array(per_commitment_secret), bindings.encodeUint8Array(countersignatory_revocation_base_secret));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A script either spendable by the revocation
	 * key or the broadcaster_delayed_payment_key and satisfying the relative-locktime OP_CSV constrain.
	 * Encumbering a `to_holder` output on a commitment transaction or 2nd-stage HTLC transactions.
	 */
	public static constructor_get_revokeable_redeemscript(revocation_key: RevocationKey, contest_delay: number, broadcaster_delayed_payment_key: DelayedPaymentKey): Uint8Array {
		const ret: number = bindings.get_revokeable_redeemscript(CommonBase.get_ptr_of(revocation_key), contest_delay, CommonBase.get_ptr_of(broadcaster_delayed_payment_key));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the script for the countersigner's (i.e. non-broadcaster's) output on a commitment
	 * transaction based on the channel type.
	 */
	public static constructor_get_countersigner_payment_script(channel_type_features: ChannelTypeFeatures, payment_key: Uint8Array): Uint8Array {
		const ret: number = bindings.get_countersigner_payment_script(CommonBase.get_ptr_of(channel_type_features), bindings.encodeUint8Array(payment_key));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the witness redeemscript for an HTLC output in a commitment transaction. Note that htlc
	 * does not need to have its previous_output_index filled.
	 */
	public static constructor_get_htlc_redeemscript(htlc: HTLCOutputInCommitment, channel_type_features: ChannelTypeFeatures, keys: TxCreationKeys): Uint8Array {
		const ret: number = bindings.get_htlc_redeemscript(CommonBase.get_ptr_of(htlc), CommonBase.get_ptr_of(channel_type_features), CommonBase.get_ptr_of(keys));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the redeemscript for a funding output from the two funding public keys.
	 * Note that the order of funding public keys does not matter.
	 */
	public static constructor_make_funding_redeemscript(broadcaster: Uint8Array, countersignatory: Uint8Array): Uint8Array {
		const ret: number = bindings.make_funding_redeemscript(bindings.encodeUint8Array(broadcaster), bindings.encodeUint8Array(countersignatory));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Builds an unsigned HTLC-Success or HTLC-Timeout transaction from the given channel and HTLC
	 * parameters. This is used by [`TrustedCommitmentTransaction::get_htlc_sigs`] to fetch the
	 * transaction which needs signing, and can be used to construct an HTLC transaction which is
	 * broadcastable given a counterparty HTLC signature.
	 * 
	 * Panics if htlc.transaction_output_index.is_none() (as such HTLCs do not appear in the
	 * commitment transaction).
	 */
	public static constructor_build_htlc_transaction(commitment_txid: Uint8Array, feerate_per_kw: number, contest_delay: number, htlc: HTLCOutputInCommitment, channel_type_features: ChannelTypeFeatures, broadcaster_delayed_payment_key: DelayedPaymentKey, revocation_key: RevocationKey): Uint8Array {
		const ret: number = bindings.build_htlc_transaction(bindings.encodeUint8Array(commitment_txid), feerate_per_kw, contest_delay, CommonBase.get_ptr_of(htlc), CommonBase.get_ptr_of(channel_type_features), CommonBase.get_ptr_of(broadcaster_delayed_payment_key), CommonBase.get_ptr_of(revocation_key));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the witness required to satisfy and spend a HTLC input.
	 */
	public static constructor_build_htlc_input_witness(local_sig: Uint8Array, remote_sig: Uint8Array, preimage: Option_ThirtyTwoBytesZ, redeem_script: Uint8Array, channel_type_features: ChannelTypeFeatures): Uint8Array {
		const ret: number = bindings.build_htlc_input_witness(bindings.encodeUint8Array(local_sig), bindings.encodeUint8Array(remote_sig), CommonBase.get_ptr_of(preimage), bindings.encodeUint8Array(redeem_script), CommonBase.get_ptr_of(channel_type_features));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the witnessScript for the to_remote output when anchors are enabled.
	 */
	public static constructor_get_to_countersigner_keyed_anchor_redeemscript(payment_point: Uint8Array): Uint8Array {
		const ret: number = bindings.get_to_countersigner_keyed_anchor_redeemscript(bindings.encodeUint8Array(payment_point));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the script_pubkey for a shared anchor
	 */
	public static constructor_shared_anchor_script_pubkey(): Uint8Array {
		const ret: number = bindings.shared_anchor_script_pubkey();
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the witnessScript for a keyed anchor (non-zero-fee-commitments) output from the funding
	 * public key.
	 * 
	 * The witness in the spending input must be:
	 * <BIP 143 funding_signature>
	 * After 16 blocks of confirmation, an alternative satisfying witness could be:
	 * <>
	 * (empty vector required to satisfy compliance with MINIMALIF-standard rule)
	 */
	public static constructor_get_keyed_anchor_redeemscript(funding_pubkey: Uint8Array): Uint8Array {
		const ret: number = bindings.get_keyed_anchor_redeemscript(bindings.encodeUint8Array(funding_pubkey));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the witness required to satisfy and spend a keyed anchor (non-zero-fee-commitments)
	 * input.
	 */
	public static constructor_build_keyed_anchor_input_witness(funding_key: Uint8Array, funding_sig: Uint8Array): Uint8Array {
		const ret: number = bindings.build_keyed_anchor_input_witness(bindings.encodeUint8Array(funding_key), bindings.encodeUint8Array(funding_sig));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Commitment transaction numbers which appear in the transactions themselves are XOR'd with a
	 * shared secret first. This prevents on-chain observers from discovering how many commitment
	 * transactions occurred in a channel before it was closed.
	 * 
	 * This function gets the shared secret from relevant channel public keys and can be used to
	 * \"decrypt\" the commitment transaction number given a commitment transaction on-chain.
	 */
	public static constructor_get_commitment_transaction_number_obscure_factor(broadcaster_payment_basepoint: Uint8Array, countersignatory_payment_basepoint: Uint8Array, outbound_from_broadcaster: boolean): bigint {
		const ret: bigint = bindings.get_commitment_transaction_number_obscure_factor(bindings.encodeUint8Array(broadcaster_payment_basepoint), bindings.encodeUint8Array(countersignatory_payment_basepoint), outbound_from_broadcaster);
		return ret;
	}

	/**
	 * Adds a tweak to a public key to derive a new public key.
	 * 
	 * May panic if `tweak` is not the output of a SHA-256 hash.
	 */
	public static constructor_add_public_key_tweak(base_point: Uint8Array, tweak: Uint8Array): Uint8Array {
		const ret: number = bindings.add_public_key_tweak(bindings.encodeUint8Array(base_point), bindings.encodeUint8Array(tweak));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a InboundHTLCStateDetails from a byte array, created by InboundHTLCStateDetails_write
	 */
	public static constructor_InboundHTLCStateDetails_read(ser: Uint8Array): Result_COption_InboundHTLCStateDetailsZDecodeErrorZ {
		const ret: bigint = bindings.InboundHTLCStateDetails_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_InboundHTLCStateDetailsZDecodeErrorZ = Result_COption_InboundHTLCStateDetailsZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a OutboundHTLCStateDetails from a byte array, created by OutboundHTLCStateDetails_write
	 */
	public static constructor_OutboundHTLCStateDetails_read(ser: Uint8Array): Result_COption_OutboundHTLCStateDetailsZDecodeErrorZ {
		const ret: bigint = bindings.OutboundHTLCStateDetails_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_OutboundHTLCStateDetailsZDecodeErrorZ = Result_COption_OutboundHTLCStateDetailsZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`InitFeatures`] flags that are provided by or required by
	 * [`ChannelManager`].
	 */
	public static constructor_provided_init_features(config: UserConfig): InitFeatures {
		const ret: bigint = bindings.provided_init_features(CommonBase.get_ptr_of(config));
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Read a C2Tuple_ThirtyTwoBytesChannelManagerZ from a byte array, created by C2Tuple_ThirtyTwoBytesChannelManagerZ_write
	 */
	public static constructor_C2Tuple_ThirtyTwoBytesChannelManagerZ_read(ser: Uint8Array, arg_entropy_source: EntropySource, arg_node_signer: NodeSigner, arg_signer_provider: SignerProvider, arg_fee_estimator: FeeEstimator, arg_chain_monitor: Watch, arg_tx_broadcaster: BroadcasterInterface, arg_router: Router, arg_message_router: MessageRouter, arg_logger: Logger, arg_config: UserConfig, arg_channel_monitors: ChannelMonitor[]): Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesChannelManagerZ_read(bindings.encodeUint8Array(ser), bindings.ChannelManagerReadArgs_new(CommonBase.get_ptr_of(arg_entropy_source), CommonBase.get_ptr_of(arg_node_signer), CommonBase.get_ptr_of(arg_signer_provider), CommonBase.get_ptr_of(arg_fee_estimator), CommonBase.get_ptr_of(arg_chain_monitor), CommonBase.get_ptr_of(arg_tx_broadcaster), CommonBase.get_ptr_of(arg_router), CommonBase.get_ptr_of(arg_message_router), CommonBase.get_ptr_of(arg_logger), CommonBase.get_ptr_of(arg_config), bindings.encodeUint64Array(arg_channel_monitors.map(arg_channel_monitors_conv_16 => CommonBase.get_ptr_of(arg_channel_monitors_conv_16)))));
		const ret_hu_conv: Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ = Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, arg_entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, arg_node_signer);
		CommonBase.add_ref_from(ret_hu_conv, arg_signer_provider);
		CommonBase.add_ref_from(ret_hu_conv, arg_fee_estimator);
		CommonBase.add_ref_from(ret_hu_conv, arg_chain_monitor);
		CommonBase.add_ref_from(ret_hu_conv, arg_tx_broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, arg_router);
		CommonBase.add_ref_from(ret_hu_conv, arg_message_router);
		CommonBase.add_ref_from(ret_hu_conv, arg_logger);
		;
		arg_channel_monitors.forEach((arg_channel_monitors_conv_16: ChannelMonitor) => { CommonBase.add_ref_from(ret_hu_conv, arg_channel_monitors_conv_16); });
		return ret_hu_conv;
	}

	/**
	 * Equivalent to [`crate::ln::channelmanager::ChannelManager::create_inbound_payment`], but no
	 * `ChannelManager` is required. Useful for generating invoices for [phantom node payments] without
	 * a `ChannelManager`.
	 * 
	 * `keys` is generated by calling [`NodeSigner::get_expanded_key`]. It is recommended to
	 * cache this value and not regenerate it for each new inbound payment.
	 * 
	 * `current_time` is a Unix timestamp representing the current time.
	 * 
	 * Note that if `min_final_cltv_expiry_delta` is set to some value, then the payment will not be receivable
	 * on versions of LDK prior to 0.0.114.
	 * 
	 * [phantom node payments]: crate::sign::PhantomKeysManager
	 * [`NodeSigner::get_expanded_key`]: crate::sign::NodeSigner::get_expanded_key
	 */
	public static constructor_create(keys: ExpandedKey, min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number, entropy_source: EntropySource, current_time: bigint, min_final_cltv_expiry_delta: Option_u16Z): Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ {
		const ret: bigint = bindings.create(CommonBase.get_ptr_of(keys), CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs, CommonBase.get_ptr_of(entropy_source), current_time, CommonBase.get_ptr_of(min_final_cltv_expiry_delta));
		const ret_hu_conv: Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Equivalent to [`crate::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash`],
	 * but no `ChannelManager` is required. Useful for generating invoices for [phantom node payments]
	 * without a `ChannelManager`.
	 * 
	 * See [`create`] for information on the `keys` and `current_time` parameters.
	 * 
	 * Note that if `min_final_cltv_expiry_delta` is set to some value, then the payment will not be receivable
	 * on versions of LDK prior to 0.0.114.
	 * 
	 * [phantom node payments]: crate::sign::PhantomKeysManager
	 */
	public static constructor_create_from_hash(keys: ExpandedKey, min_value_msat: Option_u64Z, payment_hash: Uint8Array, invoice_expiry_delta_secs: number, current_time: bigint, min_final_cltv_expiry_delta: Option_u16Z): Result_ThirtyTwoBytesNoneZ {
		const ret: bigint = bindings.create_from_hash(CommonBase.get_ptr_of(keys), CommonBase.get_ptr_of(min_value_msat), bindings.encodeUint8Array(payment_hash), invoice_expiry_delta_secs, current_time, CommonBase.get_ptr_of(min_final_cltv_expiry_delta));
		const ret_hu_conv: Result_ThirtyTwoBytesNoneZ = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Parses an OnionV3 host and port into a [`SocketAddress::OnionV3`].
	 * 
	 * The host part must end with \".onion\".
	 */
	public static constructor_parse_onion_address(host: string, port: number): Result_SocketAddressSocketAddressParseErrorZ {
		const ret: bigint = bindings.parse_onion_address(bindings.encodeString(host), port);
		const ret_hu_conv: Result_SocketAddressSocketAddressParseErrorZ = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Peel one layer off an incoming onion, returning a [`PendingHTLCInfo`] that contains information
	 * about the intended next-hop for the HTLC.
	 * 
	 * This does all the relevant context-free checks that LDK requires for payment relay or
	 * acceptance. If the payment is to be received, and the amount matches the expected amount for
	 * a given invoice, this indicates the [`msgs::UpdateAddHTLC`], once fully committed in the
	 * channel, will generate an [`Event::PaymentClaimable`].
	 * 
	 * [`Event::PaymentClaimable`]: crate::events::Event::PaymentClaimable
	 */
	public static constructor_peel_payment_onion(msg: UpdateAddHTLC, node_signer: NodeSigner, logger: Logger, cur_height: number, allow_skimmed_fees: boolean): Result_PendingHTLCInfoInboundHTLCErrZ {
		const ret: bigint = bindings.peel_payment_onion(CommonBase.get_ptr_of(msg), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(logger), cur_height, allow_skimmed_fees);
		const ret_hu_conv: Result_PendingHTLCInfoInboundHTLCErrZ = Result_PendingHTLCInfoInboundHTLCErrZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * Utility to create an invoice that can be paid to one of multiple nodes, or a \"phantom invoice.\"
	 * See [`PhantomKeysManager`] for more information on phantom node payments.
	 * 
	 * `phantom_route_hints` parameter:
	 * Contains channel info for all nodes participating in the phantom invoice
	 * Entries are retrieved from a call to [`ChannelManager::get_phantom_route_hints`] on each
	 * participating node
	 * It is fine to cache `phantom_route_hints` and reuse it across invoices, as long as the data is
	 * updated when a channel becomes disabled or closes
	 * Note that if too many channels are included in [`PhantomRouteHints::channels`], the invoice
	 * may be too long for QR code scanning. To fix this, `PhantomRouteHints::channels` may be pared
	 * down
	 * 
	 * `payment_hash` can be specified if you have a specific need for a custom payment hash (see the difference
	 * between [`ChannelManager::create_inbound_payment`] and [`ChannelManager::create_inbound_payment_for_hash`]).
	 * If `None` is provided for `payment_hash`, then one will be created.
	 * 
	 * `invoice_expiry_delta_secs` describes the number of seconds that the invoice is valid for
	 * in excess of the current time.
	 * 
	 * `duration_since_epoch` is the current time since epoch in seconds.
	 * 
	 * You can specify a custom `min_final_cltv_expiry_delta`, or let LDK default it to
	 * [`MIN_FINAL_CLTV_EXPIRY_DELTA`]. The provided expiry must be at least [`MIN_FINAL_CLTV_EXPIRY_DELTA`] - 3.
	 * Note that LDK will add a buffer of 3 blocks to the delta to allow for up to a few new block
	 * confirmations during routing.
	 * 
	 * Note that the provided `keys_manager`'s `NodeSigner` implementation must support phantom
	 * invoices in its `sign_invoice` implementation ([`PhantomKeysManager`] satisfies this
	 * requirement).
	 * 
	 * [`PhantomKeysManager`]: crate::sign::PhantomKeysManager
	 * [`ChannelManager::get_phantom_route_hints`]: crate::ln::channelmanager::ChannelManager::get_phantom_route_hints
	 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
	 * [`ChannelManager::create_inbound_payment_for_hash`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash
	 * [`PhantomRouteHints::channels`]: crate::ln::channelmanager::PhantomRouteHints::channels
	 * [`MIN_FINAL_CLTV_EXPIRY_DETLA`]: crate::ln::channelmanager::MIN_FINAL_CLTV_EXPIRY_DELTA
	 */
	public static constructor_create_phantom_invoice(amt_msat: Option_u64Z, payment_hash: Option_ThirtyTwoBytesZ, description: string, invoice_expiry_delta_secs: number, phantom_route_hints: PhantomRouteHints[], entropy_source: EntropySource, node_signer: NodeSigner, logger: Logger, network: Currency, min_final_cltv_expiry_delta: Option_u16Z, duration_since_epoch: bigint): Result_Bolt11InvoiceSignOrCreationErrorZ {
		const ret: bigint = bindings.create_phantom_invoice(CommonBase.get_ptr_of(amt_msat), CommonBase.get_ptr_of(payment_hash), bindings.encodeString(description), invoice_expiry_delta_secs, bindings.encodeUint64Array(phantom_route_hints.map(phantom_route_hints_conv_19 => CommonBase.get_ptr_of(phantom_route_hints_conv_19))), CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(logger), network, CommonBase.get_ptr_of(min_final_cltv_expiry_delta), duration_since_epoch);
		const ret_hu_conv: Result_Bolt11InvoiceSignOrCreationErrorZ = Result_Bolt11InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * Utility to create an invoice that can be paid to one of multiple nodes, or a \"phantom invoice.\"
	 * See [`PhantomKeysManager`] for more information on phantom node payments.
	 * 
	 * `phantom_route_hints` parameter:
	 * Contains channel info for all nodes participating in the phantom invoice
	 * Entries are retrieved from a call to [`ChannelManager::get_phantom_route_hints`] on each
	 * participating node
	 * It is fine to cache `phantom_route_hints` and reuse it across invoices, as long as the data is
	 * updated when a channel becomes disabled or closes
	 * Note that the route hints generated from `phantom_route_hints` will be limited to a maximum
	 * of 3 hints to ensure that the invoice can be scanned in a QR code. These hints are selected
	 * in the order that the nodes in `PhantomRouteHints` are specified, selecting one hint per node
	 * until the maximum is hit. Callers may provide as many `PhantomRouteHints::channels` as
	 * desired, but note that some nodes will be trimmed if more than 3 nodes are provided.
	 * 
	 * `description_hash` is a SHA-256 hash of the description text
	 * 
	 * `payment_hash` can be specified if you have a specific need for a custom payment hash (see the difference
	 * between [`ChannelManager::create_inbound_payment`] and [`ChannelManager::create_inbound_payment_for_hash`]).
	 * If `None` is provided for `payment_hash`, then one will be created.
	 * 
	 * `invoice_expiry_delta_secs` describes the number of seconds that the invoice is valid for
	 * in excess of the current time.
	 * 
	 * `duration_since_epoch` is the current time since epoch in seconds.
	 * 
	 * Note that the provided `keys_manager`'s `NodeSigner` implementation must support phantom
	 * invoices in its `sign_invoice` implementation ([`PhantomKeysManager`] satisfies this
	 * requirement).
	 * 
	 * [`PhantomKeysManager`]: crate::sign::PhantomKeysManager
	 * [`ChannelManager::get_phantom_route_hints`]: crate::ln::channelmanager::ChannelManager::get_phantom_route_hints
	 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
	 * [`ChannelManager::create_inbound_payment_for_hash`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash
	 * [`PhantomRouteHints::channels`]: crate::ln::channelmanager::PhantomRouteHints::channels
	 */
	public static constructor_create_phantom_invoice_with_description_hash(amt_msat: Option_u64Z, payment_hash: Option_ThirtyTwoBytesZ, invoice_expiry_delta_secs: number, description_hash: Sha256, phantom_route_hints: PhantomRouteHints[], entropy_source: EntropySource, node_signer: NodeSigner, logger: Logger, network: Currency, min_final_cltv_expiry_delta: Option_u16Z, duration_since_epoch: bigint): Result_Bolt11InvoiceSignOrCreationErrorZ {
		const ret: bigint = bindings.create_phantom_invoice_with_description_hash(CommonBase.get_ptr_of(amt_msat), CommonBase.get_ptr_of(payment_hash), invoice_expiry_delta_secs, CommonBase.get_ptr_of(description_hash), bindings.encodeUint64Array(phantom_route_hints.map(phantom_route_hints_conv_19 => CommonBase.get_ptr_of(phantom_route_hints_conv_19))), CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(logger), network, CommonBase.get_ptr_of(min_final_cltv_expiry_delta), duration_since_epoch);
		const ret_hu_conv: Result_Bolt11InvoiceSignOrCreationErrorZ = Result_Bolt11InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * Build a payment onion, returning the first hop msat and cltv values as well.
	 * 
	 * `cur_block_height` should be set to the best known block height + 1.
	 * 
	 * Note that invoice_request (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_create_payment_onion(path: Path, session_priv: Uint8Array, total_msat: bigint, recipient_onion: RecipientOnionFields, cur_block_height: number, payment_hash: Uint8Array, keysend_preimage: Option_ThirtyTwoBytesZ, invoice_request: InvoiceRequest|null, prng_seed: Uint8Array): Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ {
		const ret: bigint = bindings.create_payment_onion(CommonBase.get_ptr_of(path), bindings.encodeUint8Array(session_priv), total_msat, CommonBase.get_ptr_of(recipient_onion), cur_block_height, bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(keysend_preimage), invoice_request == null ? 0n : CommonBase.get_ptr_of(invoice_request), bindings.encodeUint8Array(prng_seed));
		const ret_hu_conv: Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ = Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies the signature with a pubkey over the given message using a tagged hash as the message
	 * digest.
	 */
	public static constructor_verify_signature(signature: Uint8Array, message: TaggedHash, pubkey: Uint8Array): Result_NoneSecp256k1ErrorZ {
		const ret: bigint = bindings.verify_signature(bindings.encodeUint8Array(signature), CommonBase.get_ptr_of(message), bindings.encodeUint8Array(pubkey));
		const ret_hu_conv: Result_NoneSecp256k1ErrorZ = Result_NoneSecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns whether `tlv_type` corresponds to a TLV record for async payment messages.
	 */
	public static constructor_AsyncPaymentsMessage_is_known_type(tlv_type: bigint): boolean {
		const ret: boolean = bindings.AsyncPaymentsMessage_is_known_type(tlv_type);
		return ret;
	}

	/**
	 * Returns whether `tlv_type` corresponds to a TLV record for DNS Resolvers.
	 */
	public static constructor_DNSResolverMessage_is_known_type(tlv_type: bigint): boolean {
		const ret: boolean = bindings.DNSResolverMessage_is_known_type(tlv_type);
		return ret;
	}

	/**
	 * Creates an [`OnionMessage`] with the given `contents` for sending to the destination of
	 * `path`, first calling [`Destination::resolve`] on `path.destination` with the given
	 * [`ReadOnlyNetworkGraph`].
	 * 
	 * Returns the node id of the peer to send the message to, the message itself, and any addresses
	 * needed to connect to the first node.
	 * 
	 * Note that reply_path (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_create_onion_message_resolving_destination(entropy_source: EntropySource, node_signer: NodeSigner, node_id_lookup: NodeIdLookUp, network_graph: ReadOnlyNetworkGraph, path: OnionMessagePath, contents: OnionMessageContents, reply_path: BlindedMessagePath|null): Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
		const ret: bigint = bindings.create_onion_message_resolving_destination(CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(node_id_lookup), CommonBase.get_ptr_of(network_graph), CommonBase.get_ptr_of(path), CommonBase.get_ptr_of(contents), reply_path == null ? 0n : CommonBase.get_ptr_of(reply_path));
		const ret_hu_conv: Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, node_id_lookup);
		CommonBase.add_ref_from(ret_hu_conv, network_graph);
		CommonBase.add_ref_from(ret_hu_conv, contents);
		return ret_hu_conv;
	}

	/**
	 * Creates an [`OnionMessage`] with the given `contents` for sending to the destination of
	 * `path`.
	 * 
	 * Returns the node id of the peer to send the message to, the message itself, and any addresses
	 * needed to connect to the first node.
	 * 
	 * Returns [`SendError::UnresolvedIntroductionNode`] if:
	 * - `destination` contains a blinded path with an [`IntroductionNode::DirectedShortChannelId`],
	 * - unless it can be resolved by [`NodeIdLookUp::next_node_id`].
	 * Use [`create_onion_message_resolving_destination`] instead to resolve the introduction node
	 * first with a [`ReadOnlyNetworkGraph`].
	 * 
	 * Note that reply_path (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_create_onion_message(entropy_source: EntropySource, node_signer: NodeSigner, node_id_lookup: NodeIdLookUp, path: OnionMessagePath, contents: OnionMessageContents, reply_path: BlindedMessagePath|null): Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
		const ret: bigint = bindings.create_onion_message(CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(node_id_lookup), CommonBase.get_ptr_of(path), CommonBase.get_ptr_of(contents), reply_path == null ? 0n : CommonBase.get_ptr_of(reply_path));
		const ret_hu_conv: Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, node_id_lookup);
		CommonBase.add_ref_from(ret_hu_conv, contents);
		return ret_hu_conv;
	}

	/**
	 * Decode one layer of an incoming [`OnionMessage`].
	 * 
	 * Returns either the next layer of the onion for forwarding or the decrypted content for the
	 * receiver.
	 */
	public static constructor_peel_onion_message(msg: OnionMessage, node_signer: NodeSigner, logger: Logger, custom_handler: CustomOnionMessageHandler): Result_PeeledOnionNoneZ {
		const ret: bigint = bindings.peel_onion_message(CommonBase.get_ptr_of(msg), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(logger), CommonBase.get_ptr_of(custom_handler));
		const ret_hu_conv: Result_PeeledOnionNoneZ = Result_PeeledOnionNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, custom_handler);
		return ret_hu_conv;
	}

	/**
	 * Returns whether `tlv_type` corresponds to a TLV record for Offers.
	 */
	public static constructor_OffersMessage_is_known_type(tlv_type: bigint): boolean {
		const ret: boolean = bindings.OffersMessage_is_known_type(tlv_type);
		return ret;
	}

	/**
	 * Read a NetworkUpdate from a byte array, created by NetworkUpdate_write
	 */
	public static constructor_NetworkUpdate_read(ser: Uint8Array): Result_COption_NetworkUpdateZDecodeErrorZ {
		const ret: bigint = bindings.NetworkUpdate_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_NetworkUpdateZDecodeErrorZ = Result_COption_NetworkUpdateZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies the signature of a [`NodeAnnouncement`].
	 * 
	 * Returns an error if it is invalid.
	 */
	public static constructor_verify_node_announcement(msg: NodeAnnouncement): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.verify_node_announcement(CommonBase.get_ptr_of(msg));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies all signatures included in a [`ChannelAnnouncement`].
	 * 
	 * Returns an error if one of the signatures is invalid.
	 */
	public static constructor_verify_channel_announcement(msg: ChannelAnnouncement): Result_NoneLightningErrorZ {
		const ret: bigint = bindings.verify_channel_announcement(CommonBase.get_ptr_of(msg));
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Finds a route from us (payer) to the given target node (payee).
	 * 
	 * If the payee provided features in their invoice, they should be provided via the `payee` field
	 * in the given [`RouteParameters::payment_params`].
	 * Without this, MPP will only be used if the payee's features are available in the network graph.
	 * 
	 * Private routing paths between a public node and the target may be included in the `payee` field
	 * of [`RouteParameters::payment_params`].
	 * 
	 * If some channels aren't announced, it may be useful to fill in `first_hops` with the results
	 * from [`ChannelManager::list_usable_channels`]. If it is filled in, the view of these channels
	 * from `network_graph` will be ignored, and only those in `first_hops` will be used.
	 * 
	 * The fees on channels from us to the next hop are ignored as they are assumed to all be equal.
	 * However, the enabled/disabled bit on such channels as well as the `htlc_minimum_msat` /
	 * `htlc_maximum_msat` *are* checked as they may change based on the receiving node.
	 * 
	 * # Panics
	 * 
	 * Panics if first_hops contains channels without `short_channel_id`s;
	 * [`ChannelManager::list_usable_channels`] will never include such channels.
	 * 
	 * [`ChannelManager::list_usable_channels`]: crate::ln::channelmanager::ChannelManager::list_usable_channels
	 * [`Event::PaymentPathFailed`]: crate::events::Event::PaymentPathFailed
	 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_find_route(our_node_pubkey: Uint8Array, route_params: RouteParameters, network_graph: NetworkGraph, first_hops: ChannelDetails[]|null, logger: Logger, scorer: ScoreLookUp, score_params: ProbabilisticScoringFeeParameters, random_seed_bytes: Uint8Array): Result_RouteStrZ {
		const ret: bigint = bindings.find_route(bindings.encodeUint8Array(our_node_pubkey), CommonBase.get_ptr_of(route_params), CommonBase.get_ptr_of(network_graph), bindings.encodeUint64Array(first_hops != null ? first_hops.map(first_hops_conv_16 => CommonBase.get_ptr_of(first_hops_conv_16)) : null), CommonBase.get_ptr_of(logger), CommonBase.get_ptr_of(scorer), CommonBase.get_ptr_of(score_params), bindings.encodeUint8Array(random_seed_bytes));
		const ret_hu_conv: Result_RouteStrZ = Result_RouteStrZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, network_graph);
		if (first_hops != null) { first_hops.forEach((first_hops_conv_16: ChannelDetails) => { CommonBase.add_ref_from(ret_hu_conv, first_hops_conv_16); }) };
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, scorer);
		return ret_hu_conv;
	}

	/**
	 * Construct a route from us (payer) to the target node (payee) via the given hops (which should
	 * exclude the payer, but include the payee). This may be useful, e.g., for probing the chosen path.
	 * 
	 * Re-uses logic from `find_route`, so the restrictions described there also apply here.
	 */
	public static constructor_build_route_from_hops(our_node_pubkey: Uint8Array, hops: Uint8Array[], route_params: RouteParameters, network_graph: NetworkGraph, logger: Logger, random_seed_bytes: Uint8Array): Result_RouteStrZ {
		const ret: bigint = bindings.build_route_from_hops(bindings.encodeUint8Array(our_node_pubkey), bindings.encodeUint32Array(hops.map(hops_conv_12 => bindings.encodeUint8Array(hops_conv_12))), CommonBase.get_ptr_of(route_params), CommonBase.get_ptr_of(network_graph), CommonBase.get_ptr_of(logger), bindings.encodeUint8Array(random_seed_bytes));
		const ret_hu_conv: Result_RouteStrZ = Result_RouteStrZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, network_graph);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * Creates an unsigned [`Psbt`] which spends the given descriptors to
	 * the given outputs, plus an output to the given change destination (if sufficient
	 * change value remains). The PSBT will have a feerate, at least, of the given value.
	 * 
	 * The `locktime` argument is used to set the transaction's locktime. If `None`, the
	 * transaction will have a locktime of 0. It it recommended to set this to the current block
	 * height to avoid fee sniping, unless you have some specific reason to use a different
	 * locktime.
	 * 
	 * Returns the PSBT and expected max transaction weight.
	 * 
	 * Returns `Err(())` if the output value is greater than the input value minus required fee,
	 * if a descriptor was duplicated, or if an output descriptor `script_pubkey`
	 * does not match the one we can spend.
	 * 
	 * We do not enforce that outputs meet the dust limit or that any output scripts are standard.
	 */
	public static constructor_SpendableOutputDescriptor_create_spendable_outputs_psbt(descriptors: SpendableOutputDescriptor[], outputs: TxOut[], change_destination_script: Uint8Array, feerate_sat_per_1000_weight: number, locktime: Option_u32Z): Result_C2Tuple_CVec_u8Zu64ZNoneZ {
		const ret: bigint = bindings.SpendableOutputDescriptor_create_spendable_outputs_psbt(bindings.encodeUint64Array(descriptors.map(descriptors_conv_27 => CommonBase.get_ptr_of(descriptors_conv_27))), bindings.encodeUint64Array(outputs.map(outputs_conv_7 => CommonBase.get_ptr_of(outputs_conv_7))), bindings.encodeUint8Array(change_destination_script), feerate_sat_per_1000_weight, CommonBase.get_ptr_of(locktime));
		const ret_hu_conv: Result_C2Tuple_CVec_u8Zu64ZNoneZ = Result_C2Tuple_CVec_u8Zu64ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Computes the tweak to apply to the base funding key of a channel.
	 * 
	 * The tweak is computed similar to existing tweaks used in
	 * [BOLT-3](https://github.com/lightning/bolts/blob/master/03-transactions.md#key-derivation):
	 * 
	 * 1. We use the txid of the funding transaction the splice transaction is spending instead of the
	 * `per_commitment_point` to guarantee uniqueness.
	 * 2. We include the private key instead of the public key to guarantee only those with knowledge
	 * of it can re-derive the new funding key.
	 * 
	 * tweak = SHA256(splice_parent_funding_txid || base_funding_secret_key)
	 * tweaked_funding_key = base_funding_key + tweak
	 * 
	 * While the use of this tweak is not required (signers may choose to compute a tweak of their
	 * choice), signers must ensure their tweak guarantees the two properties mentioned above:
	 * uniqueness and derivable only by one or both of the channel participants.
	 */
	public static constructor_compute_funding_key_tweak(base_funding_secret_key: Uint8Array, splice_parent_funding_txid: Uint8Array): BigEndianScalar {
		const ret: bigint = bindings.compute_funding_key_tweak(bindings.encodeUint8Array(base_funding_secret_key), bindings.encodeUint8Array(splice_parent_funding_txid));
		const ret_conv: BigEndianScalar = new BigEndianScalar(null, ret);
		return ret_conv;
	}

}