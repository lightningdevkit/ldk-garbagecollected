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
import { HTLCClaim } from '../enums/HTLCClaim.mjs';
import { IOError } from '../enums/IOError.mjs';
import { InboundHTLCStateDetails } from '../enums/InboundHTLCStateDetails.mjs';
import { LSPS1OrderState } from '../enums/LSPS1OrderState.mjs';
import { LSPS1PaymentState } from '../enums/LSPS1PaymentState.mjs';
import { Level } from '../enums/Level.mjs';
import { Network } from '../enums/Network.mjs';
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
import { OffersContext, OffersContext_InvoiceRequest, OffersContext_OutboundPayment, OffersContext_InboundPayment } from '../structs/OffersContext.mjs';
import { AsyncPaymentsContext, AsyncPaymentsContext_OutboundPayment } from '../structs/AsyncPaymentsContext.mjs';
import { DNSResolverContext } from '../structs/DNSResolverContext.mjs';
import { MessageContext, MessageContext_Offers, MessageContext_AsyncPayments, MessageContext_DNSResolver, MessageContext_Custom } from '../structs/MessageContext.mjs';
import { MessageSendInstructions, MessageSendInstructions_WithSpecifiedReplyPath, MessageSendInstructions_WithReplyPath, MessageSendInstructions_WithoutReplyPath, MessageSendInstructions_ForReply } from '../structs/MessageSendInstructions.mjs';
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
import { Result_TransactionNoneZ } from '../structs/Result_TransactionNoneZ.mjs';
import { TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ } from '../structs/TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ.mjs';
import { Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ } from '../structs/Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ.mjs';
import { CommitmentTransaction } from '../structs/CommitmentTransaction.mjs';
import { HolderCommitmentTransaction } from '../structs/HolderCommitmentTransaction.mjs';
import { HTLCOutputInCommitment } from '../structs/HTLCOutputInCommitment.mjs';
import { ClosingTransaction } from '../structs/ClosingTransaction.mjs';
import { UnsignedChannelAnnouncement } from '../structs/UnsignedChannelAnnouncement.mjs';
import { ChannelPublicKeys } from '../structs/ChannelPublicKeys.mjs';
import { ChannelTransactionParameters } from '../structs/ChannelTransactionParameters.mjs';
import { ChannelSigner, ChannelSignerInterface } from '../structs/ChannelSigner.mjs';
import { EcdsaChannelSigner, EcdsaChannelSignerInterface } from '../structs/EcdsaChannelSigner.mjs';
import { Result_EcdsaChannelSignerDecodeErrorZ } from '../structs/Result_EcdsaChannelSignerDecodeErrorZ.mjs';
import { Result_CVec_u8ZNoneZ } from '../structs/Result_CVec_u8ZNoneZ.mjs';
import { ShutdownScript } from '../structs/ShutdownScript.mjs';
import { Result_ShutdownScriptNoneZ } from '../structs/Result_ShutdownScriptNoneZ.mjs';
import { Option_u16Z, Option_u16Z_Some, Option_u16Z_None } from '../structs/Option_u16Z.mjs';
import { Option_boolZ, Option_boolZ_Some, Option_boolZ_None } from '../structs/Option_boolZ.mjs';
import { Result_WitnessNoneZ } from '../structs/Result_WitnessNoneZ.mjs';
import { InMemorySigner } from '../structs/InMemorySigner.mjs';
import { Result_InMemorySignerDecodeErrorZ } from '../structs/Result_InMemorySignerDecodeErrorZ.mjs';
import { RouteParameters } from '../structs/RouteParameters.mjs';
import { ThreeTuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZ } from '../structs/ThreeTuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZ.mjs';
import { Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ } from '../structs/Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ.mjs';
import { ChannelDetails } from '../structs/ChannelDetails.mjs';
import { Route } from '../structs/Route.mjs';
import { LightningError } from '../structs/LightningError.mjs';
import { Result_RouteLightningErrorZ } from '../structs/Result_RouteLightningErrorZ.mjs';
import { Result_CVec_BlindedPaymentPathZNoneZ } from '../structs/Result_CVec_BlindedPaymentPathZNoneZ.mjs';
import { InFlightHtlcs } from '../structs/InFlightHtlcs.mjs';
import { Result_InFlightHtlcsDecodeErrorZ } from '../structs/Result_InFlightHtlcsDecodeErrorZ.mjs';
import { RouteHop } from '../structs/RouteHop.mjs';
import { Result_RouteHopDecodeErrorZ } from '../structs/Result_RouteHopDecodeErrorZ.mjs';
import { BlindedHop } from '../structs/BlindedHop.mjs';
import { BlindedTail } from '../structs/BlindedTail.mjs';
import { Result_BlindedTailDecodeErrorZ } from '../structs/Result_BlindedTailDecodeErrorZ.mjs';
import { Path } from '../structs/Path.mjs';
import { Result_RouteDecodeErrorZ } from '../structs/Result_RouteDecodeErrorZ.mjs';
import { Result_RouteParametersDecodeErrorZ } from '../structs/Result_RouteParametersDecodeErrorZ.mjs';
import { PaymentParameters } from '../structs/PaymentParameters.mjs';
import { Result_PaymentParametersDecodeErrorZ } from '../structs/Result_PaymentParametersDecodeErrorZ.mjs';
import { RouteHint } from '../structs/RouteHint.mjs';
import { Result_RouteHintDecodeErrorZ } from '../structs/Result_RouteHintDecodeErrorZ.mjs';
import { RouteHintHop } from '../structs/RouteHintHop.mjs';
import { Result_RouteHintHopDecodeErrorZ } from '../structs/Result_RouteHintHopDecodeErrorZ.mjs';
import { FixedPenaltyScorer } from '../structs/FixedPenaltyScorer.mjs';
import { Result_FixedPenaltyScorerDecodeErrorZ } from '../structs/Result_FixedPenaltyScorerDecodeErrorZ.mjs';
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
import { ClosureReason, ClosureReason_CounterpartyForceClosed, ClosureReason_HolderForceClosed, ClosureReason_LegacyCooperativeClosure, ClosureReason_CounterpartyInitiatedCooperativeClosure, ClosureReason_LocallyInitiatedCooperativeClosure, ClosureReason_CommitmentTxConfirmed, ClosureReason_FundingTimedOut, ClosureReason_ProcessingError, ClosureReason_DisconnectedPeer, ClosureReason_OutdatedChannelManager, ClosureReason_CounterpartyCoopClosedUnfundedChannel, ClosureReason_FundingBatchClosure, ClosureReason_HTLCsTimedOut, ClosureReason_PeerFeerateTooLow } from '../structs/ClosureReason.mjs';
import { ChannelId } from '../structs/ChannelId.mjs';
import { MonitorEvent, MonitorEvent_HTLCEvent, MonitorEvent_HolderForceClosedWithInfo, MonitorEvent_HolderForceClosed, MonitorEvent_Completed } from '../structs/MonitorEvent.mjs';
import { FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ } from '../structs/FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ.mjs';
import { Option_StrZ, Option_StrZ_Some, Option_StrZ_None } from '../structs/Option_StrZ.mjs';
import { LSPSRequestId } from '../structs/LSPSRequestId.mjs';
import { APIError, APIError_APIMisuseError, APIError_FeeRateTooHigh, APIError_InvalidRoute, APIError_ChannelUnavailable, APIError_MonitorUpdateInProgress, APIError_IncompatibleShutdownScript } from '../structs/APIError.mjs';
import { Result_LSPSRequestIdAPIErrorZ } from '../structs/Result_LSPSRequestIdAPIErrorZ.mjs';
import { LSPS2OpeningFeeParams } from '../structs/LSPS2OpeningFeeParams.mjs';
import { OfferId } from '../structs/OfferId.mjs';
import { Result_OfferIdDecodeErrorZ } from '../structs/Result_OfferIdDecodeErrorZ.mjs';
import { Result_NoneBolt12SemanticErrorZ } from '../structs/Result_NoneBolt12SemanticErrorZ.mjs';
import { Result_OfferBolt12SemanticErrorZ } from '../structs/Result_OfferBolt12SemanticErrorZ.mjs';
import { InvoiceRequestWithDerivedPayerSigningPubkeyBuilder } from '../structs/InvoiceRequestWithDerivedPayerSigningPubkeyBuilder.mjs';
import { Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ } from '../structs/Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ.mjs';
import { Result_OfferDecodeErrorZ } from '../structs/Result_OfferDecodeErrorZ.mjs';
import { Result_OfferBolt12ParseErrorZ } from '../structs/Result_OfferBolt12ParseErrorZ.mjs';
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
import { MessageSendEvent, MessageSendEvent_SendAcceptChannel, MessageSendEvent_SendAcceptChannelV2, MessageSendEvent_SendOpenChannel, MessageSendEvent_SendOpenChannelV2, MessageSendEvent_SendFundingCreated, MessageSendEvent_SendFundingSigned, MessageSendEvent_SendStfu, MessageSendEvent_SendSpliceInit, MessageSendEvent_SendSpliceAck, MessageSendEvent_SendSpliceLocked, MessageSendEvent_SendTxAddInput, MessageSendEvent_SendTxAddOutput, MessageSendEvent_SendTxRemoveInput, MessageSendEvent_SendTxRemoveOutput, MessageSendEvent_SendTxComplete, MessageSendEvent_SendTxSignatures, MessageSendEvent_SendTxInitRbf, MessageSendEvent_SendTxAckRbf, MessageSendEvent_SendTxAbort, MessageSendEvent_SendChannelReady, MessageSendEvent_SendAnnouncementSignatures, MessageSendEvent_UpdateHTLCs, MessageSendEvent_SendRevokeAndACK, MessageSendEvent_SendClosingSigned, MessageSendEvent_SendShutdown, MessageSendEvent_SendChannelReestablish, MessageSendEvent_SendChannelAnnouncement, MessageSendEvent_BroadcastChannelAnnouncement, MessageSendEvent_BroadcastChannelUpdate, MessageSendEvent_BroadcastNodeAnnouncement, MessageSendEvent_SendChannelUpdate, MessageSendEvent_HandleError, MessageSendEvent_SendChannelRangeQuery, MessageSendEvent_SendShortIdsQuery, MessageSendEvent_SendReplyChannelRange, MessageSendEvent_SendGossipTimestampFilter } from '../structs/MessageSendEvent.mjs';
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
import { Result_u64ShortChannelIdErrorZ } from '../structs/Result_u64ShortChannelIdErrorZ.mjs';
import { PendingHTLCInfo } from '../structs/PendingHTLCInfo.mjs';
import { InboundHTLCErr } from '../structs/InboundHTLCErr.mjs';
import { Result_PendingHTLCInfoInboundHTLCErrZ } from '../structs/Result_PendingHTLCInfoInboundHTLCErrZ.mjs';
import { Utxo } from '../structs/Utxo.mjs';
import { Option_TxOutZ, Option_TxOutZ_Some, Option_TxOutZ_None } from '../structs/Option_TxOutZ.mjs';
import { Input } from '../structs/Input.mjs';
import { CoinSelection } from '../structs/CoinSelection.mjs';
import { Result_CoinSelectionNoneZ } from '../structs/Result_CoinSelectionNoneZ.mjs';
import { Result_CVec_UtxoZNoneZ } from '../structs/Result_CVec_UtxoZNoneZ.mjs';
import { Bolt12OfferContext } from '../structs/Bolt12OfferContext.mjs';
import { Bolt12RefundContext } from '../structs/Bolt12RefundContext.mjs';
import { PaymentContext, PaymentContext_Bolt12Offer, PaymentContext_Bolt12Refund } from '../structs/PaymentContext.mjs';
import { Option_PaymentContextZ, Option_PaymentContextZ_Some, Option_PaymentContextZ_None } from '../structs/Option_PaymentContextZ.mjs';
import { TwoTuple_u64u16Z } from '../structs/TwoTuple_u64u16Z.mjs';
import { Option_C2Tuple_u64u16ZZ, Option_C2Tuple_u64u16ZZ_Some, Option_C2Tuple_u64u16ZZ_None } from '../structs/Option_C2Tuple_u64u16ZZ.mjs';
import { Result_ChannelIdAPIErrorZ } from '../structs/Result_ChannelIdAPIErrorZ.mjs';
import { RecentPaymentDetails, RecentPaymentDetails_AwaitingInvoice, RecentPaymentDetails_Pending, RecentPaymentDetails_Fulfilled, RecentPaymentDetails_Abandoned } from '../structs/RecentPaymentDetails.mjs';
import { Result_NoneAPIErrorZ } from '../structs/Result_NoneAPIErrorZ.mjs';
import { Result_NoneRetryableSendFailureZ } from '../structs/Result_NoneRetryableSendFailureZ.mjs';
import { Option_OffersContextZ, Option_OffersContextZ_Some, Option_OffersContextZ_None } from '../structs/Option_OffersContextZ.mjs';
import { Bolt12PaymentError, Bolt12PaymentError_UnexpectedInvoice, Bolt12PaymentError_DuplicateInvoice, Bolt12PaymentError_UnknownRequiredFeatures, Bolt12PaymentError_SendingFailed } from '../structs/Bolt12PaymentError.mjs';
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
import { OfferWithDerivedMetadataBuilder } from '../structs/OfferWithDerivedMetadataBuilder.mjs';
import { Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ } from '../structs/Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ.mjs';
import { Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ } from '../structs/Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ.mjs';
import { Result_ThirtyTwoBytesAPIErrorZ } from '../structs/Result_ThirtyTwoBytesAPIErrorZ.mjs';
import { InvoiceRequest } from '../structs/InvoiceRequest.mjs';
import { InvoiceError } from '../structs/InvoiceError.mjs';
import { OffersMessage, OffersMessage_InvoiceRequest, OffersMessage_Invoice, OffersMessage_InvoiceError } from '../structs/OffersMessage.mjs';
import { TwoTuple_OffersMessageResponseInstructionZ } from '../structs/TwoTuple_OffersMessageResponseInstructionZ.mjs';
import { Option_C2Tuple_OffersMessageResponseInstructionZZ, Option_C2Tuple_OffersMessageResponseInstructionZZ_Some, Option_C2Tuple_OffersMessageResponseInstructionZZ_None } from '../structs/Option_C2Tuple_OffersMessageResponseInstructionZZ.mjs';
import { TwoTuple_OffersMessageMessageSendInstructionsZ } from '../structs/TwoTuple_OffersMessageMessageSendInstructionsZ.mjs';
import { ReleaseHeldHtlc } from '../structs/ReleaseHeldHtlc.mjs';
import { TwoTuple_ReleaseHeldHtlcResponseInstructionZ } from '../structs/TwoTuple_ReleaseHeldHtlcResponseInstructionZ.mjs';
import { Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ, Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ_Some, Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ_None } from '../structs/Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ.mjs';
import { HeldHtlcAvailable } from '../structs/HeldHtlcAvailable.mjs';
import { AsyncPaymentsMessage, AsyncPaymentsMessage_HeldHtlcAvailable, AsyncPaymentsMessage_ReleaseHeldHtlc } from '../structs/AsyncPaymentsMessage.mjs';
import { TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ } from '../structs/TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ.mjs';
import { PhantomRouteHints } from '../structs/PhantomRouteHints.mjs';
import { Result_PhantomRouteHintsDecodeErrorZ } from '../structs/Result_PhantomRouteHintsDecodeErrorZ.mjs';
import { BlindedForward } from '../structs/BlindedForward.mjs';
import { Result_BlindedForwardDecodeErrorZ } from '../structs/Result_BlindedForwardDecodeErrorZ.mjs';
import { OnionPacket } from '../structs/OnionPacket.mjs';
import { FinalOnionHopData } from '../structs/FinalOnionHopData.mjs';
import { PendingHTLCRouting, PendingHTLCRouting_Forward, PendingHTLCRouting_Receive, PendingHTLCRouting_ReceiveKeysend } from '../structs/PendingHTLCRouting.mjs';
import { Result_PendingHTLCRoutingDecodeErrorZ } from '../structs/Result_PendingHTLCRoutingDecodeErrorZ.mjs';
import { Result_PendingHTLCInfoDecodeErrorZ } from '../structs/Result_PendingHTLCInfoDecodeErrorZ.mjs';
import { Result_BlindedFailureDecodeErrorZ } from '../structs/Result_BlindedFailureDecodeErrorZ.mjs';
import { ChannelMonitor } from '../structs/ChannelMonitor.mjs';
import { ChannelMonitorUpdate } from '../structs/ChannelMonitorUpdate.mjs';
import { Watch, WatchInterface } from '../structs/Watch.mjs';
import { BroadcasterInterface, BroadcasterInterfaceInterface } from '../structs/BroadcasterInterface.mjs';
import { EntropySource, EntropySourceInterface } from '../structs/EntropySource.mjs';
import { ExpandedKey } from '../structs/ExpandedKey.mjs';
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
import { Result_CVec_BlindedMessagePathZNoneZ } from '../structs/Result_CVec_BlindedMessagePathZNoneZ.mjs';
import { MessageForwardNode } from '../structs/MessageForwardNode.mjs';
import { MessageRouter, MessageRouterInterface } from '../structs/MessageRouter.mjs';
import { ChannelManager } from '../structs/ChannelManager.mjs';
import { TwoTuple_ThirtyTwoBytesChannelManagerZ } from '../structs/TwoTuple_ThirtyTwoBytesChannelManagerZ.mjs';
import { Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ } from '../structs/Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ.mjs';
import { MaxDustHTLCExposure, MaxDustHTLCExposure_FixedLimitMsat, MaxDustHTLCExposure_FeeRateMultiplier } from '../structs/MaxDustHTLCExposure.mjs';
import { Result_MaxDustHTLCExposureDecodeErrorZ } from '../structs/Result_MaxDustHTLCExposureDecodeErrorZ.mjs';
import { ChannelConfig } from '../structs/ChannelConfig.mjs';
import { Result_ChannelConfigDecodeErrorZ } from '../structs/Result_ChannelConfigDecodeErrorZ.mjs';
import { Option_MaxDustHTLCExposureZ, Option_MaxDustHTLCExposureZ_Some, Option_MaxDustHTLCExposureZ_None } from '../structs/Option_MaxDustHTLCExposureZ.mjs';
import { Option_APIErrorZ, Option_APIErrorZ_Some, Option_APIErrorZ_None } from '../structs/Option_APIErrorZ.mjs';
import { Result_COption_APIErrorZDecodeErrorZ } from '../structs/Result_COption_APIErrorZDecodeErrorZ.mjs';
import { LSPS2RawOpeningFeeParams } from '../structs/LSPS2RawOpeningFeeParams.mjs';
import { Result_ChannelMonitorUpdateDecodeErrorZ } from '../structs/Result_ChannelMonitorUpdateDecodeErrorZ.mjs';
import { Option_MonitorEventZ, Option_MonitorEventZ_Some, Option_MonitorEventZ_None } from '../structs/Option_MonitorEventZ.mjs';
import { Result_COption_MonitorEventZDecodeErrorZ } from '../structs/Result_COption_MonitorEventZDecodeErrorZ.mjs';
import { Result_HTLCUpdateDecodeErrorZ } from '../structs/Result_HTLCUpdateDecodeErrorZ.mjs';
import { TwoTuple_OutPointCVec_u8ZZ } from '../structs/TwoTuple_OutPointCVec_u8ZZ.mjs';
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
import { Result_boolPeerHandleErrorZ } from '../structs/Result_boolPeerHandleErrorZ.mjs';
import { GraphSyncError, GraphSyncError_DecodeError, GraphSyncError_LightningError } from '../structs/GraphSyncError.mjs';
import { Result_u32GraphSyncErrorZ } from '../structs/Result_u32GraphSyncErrorZ.mjs';
import { Result_CVec_u8ZIOErrorZ } from '../structs/Result_CVec_u8ZIOErrorZ.mjs';
import { Result_NoneIOErrorZ } from '../structs/Result_NoneIOErrorZ.mjs';
import { Result_CVec_StrZIOErrorZ } from '../structs/Result_CVec_StrZIOErrorZ.mjs';
import { ThreeTuple_StrStrStrZ } from '../structs/ThreeTuple_StrStrStrZ.mjs';
import { Result_CVec_C3Tuple_StrStrStrZZIOErrorZ } from '../structs/Result_CVec_C3Tuple_StrStrStrZZIOErrorZ.mjs';
import { Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ } from '../structs/Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.mjs';
import { Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ } from '../structs/Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ.mjs';
import { MonitorName } from '../structs/MonitorName.mjs';
import { Result_MonitorNameIOErrorZ } from '../structs/Result_MonitorNameIOErrorZ.mjs';
import { UpdateName } from '../structs/UpdateName.mjs';
import { Result_UpdateNameIOErrorZ } from '../structs/Result_UpdateNameIOErrorZ.mjs';
import { Result_InvoiceRequestBolt12SemanticErrorZ } from '../structs/Result_InvoiceRequestBolt12SemanticErrorZ.mjs';
import { InvoiceWithExplicitSigningPubkeyBuilder } from '../structs/InvoiceWithExplicitSigningPubkeyBuilder.mjs';
import { Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ } from '../structs/Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ.mjs';
import { VerifiedInvoiceRequest } from '../structs/VerifiedInvoiceRequest.mjs';
import { Result_VerifiedInvoiceRequestNoneZ } from '../structs/Result_VerifiedInvoiceRequestNoneZ.mjs';
import { InvoiceWithDerivedSigningPubkeyBuilder } from '../structs/InvoiceWithDerivedSigningPubkeyBuilder.mjs';
import { Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ } from '../structs/Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ.mjs';
import { Result_InvoiceRequestDecodeErrorZ } from '../structs/Result_InvoiceRequestDecodeErrorZ.mjs';
import { InvoiceRequestFields } from '../structs/InvoiceRequestFields.mjs';
import { Result_InvoiceRequestFieldsDecodeErrorZ } from '../structs/Result_InvoiceRequestFieldsDecodeErrorZ.mjs';
import { Option_ECDSASignatureZ, Option_ECDSASignatureZ_Some, Option_ECDSASignatureZ_None } from '../structs/Option_ECDSASignatureZ.mjs';
import { Option_i64Z, Option_i64Z_Some, Option_i64Z_None } from '../structs/Option_i64Z.mjs';
import { Result_SocketAddressDecodeErrorZ } from '../structs/Result_SocketAddressDecodeErrorZ.mjs';
import { Result_SocketAddressSocketAddressParseErrorZ } from '../structs/Result_SocketAddressSocketAddressParseErrorZ.mjs';
import { UpdateAddHTLC } from '../structs/UpdateAddHTLC.mjs';
import { UpdateFulfillHTLC } from '../structs/UpdateFulfillHTLC.mjs';
import { UpdateFailHTLC } from '../structs/UpdateFailHTLC.mjs';
import { UpdateFailMalformedHTLC } from '../structs/UpdateFailMalformedHTLC.mjs';
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
import { Result_ClosingSignedDecodeErrorZ } from '../structs/Result_ClosingSignedDecodeErrorZ.mjs';
import { ClosingSignedFeeRange } from '../structs/ClosingSignedFeeRange.mjs';
import { Result_ClosingSignedFeeRangeDecodeErrorZ } from '../structs/Result_ClosingSignedFeeRangeDecodeErrorZ.mjs';
import { CommitmentSignedBatch } from '../structs/CommitmentSignedBatch.mjs';
import { Result_CommitmentSignedBatchDecodeErrorZ } from '../structs/Result_CommitmentSignedBatchDecodeErrorZ.mjs';
import { CommitmentSigned } from '../structs/CommitmentSigned.mjs';
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
import { RawLSPSMessage } from '../structs/RawLSPSMessage.mjs';
import { Result_RawLSPSMessageDecodeErrorZ } from '../structs/Result_RawLSPSMessageDecodeErrorZ.mjs';
import { LSPSDateTime } from '../structs/LSPSDateTime.mjs';
import { Result_LSPSDateTimeNoneZ } from '../structs/Result_LSPSDateTimeNoneZ.mjs';
import { Result_HeldHtlcAvailableDecodeErrorZ } from '../structs/Result_HeldHtlcAvailableDecodeErrorZ.mjs';
import { Result_ReleaseHeldHtlcDecodeErrorZ } from '../structs/Result_ReleaseHeldHtlcDecodeErrorZ.mjs';
import { Result_AsyncPaymentsMessageDecodeErrorZ } from '../structs/Result_AsyncPaymentsMessageDecodeErrorZ.mjs';
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
import { Result_u64NoneZ } from '../structs/Result_u64NoneZ.mjs';
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
import { HTLCDestination, HTLCDestination_NextHopChannel, HTLCDestination_UnknownNextHop, HTLCDestination_InvalidForward, HTLCDestination_InvalidOnion, HTLCDestination_FailedPayment } from '../structs/HTLCDestination.mjs';
import { Option_HTLCDestinationZ, Option_HTLCDestinationZ_Some, Option_HTLCDestinationZ_None } from '../structs/Option_HTLCDestinationZ.mjs';
import { Result_COption_HTLCDestinationZDecodeErrorZ } from '../structs/Result_COption_HTLCDestinationZDecodeErrorZ.mjs';
import { Option_PaymentFailureReasonZ, Option_PaymentFailureReasonZ_Some, Option_PaymentFailureReasonZ_None } from '../structs/Option_PaymentFailureReasonZ.mjs';
import { Result_COption_PaymentFailureReasonZDecodeErrorZ } from '../structs/Result_COption_PaymentFailureReasonZDecodeErrorZ.mjs';
import { Option_U128Z, Option_U128Z_Some, Option_U128Z_None } from '../structs/Option_U128Z.mjs';
import { Responder } from '../structs/Responder.mjs';
import { ChannelTypeFeatures } from '../structs/ChannelTypeFeatures.mjs';
import { InboundChannelFunds, InboundChannelFunds_PushMsat, InboundChannelFunds_DualFunded } from '../structs/InboundChannelFunds.mjs';
import { ChannelParameters } from '../structs/ChannelParameters.mjs';
import { AnchorDescriptor } from '../structs/AnchorDescriptor.mjs';
import { BumpTransactionEvent, BumpTransactionEvent_ChannelClose, BumpTransactionEvent_HTLCResolution } from '../structs/BumpTransactionEvent.mjs';
import { Event, Event_FundingGenerationReady, Event_FundingTxBroadcastSafe, Event_PaymentClaimable, Event_PaymentClaimed, Event_ConnectionNeeded, Event_InvoiceReceived, Event_PaymentSent, Event_PaymentFailed, Event_PaymentPathSuccessful, Event_PaymentPathFailed, Event_ProbeSuccessful, Event_ProbeFailed, Event_PendingHTLCsForwardable, Event_HTLCIntercepted, Event_SpendableOutputs, Event_PaymentForwarded, Event_ChannelPending, Event_ChannelReady, Event_ChannelClosed, Event_DiscardFunding, Event_OpenChannelRequest, Event_HTLCHandlingFailed, Event_BumpTransaction, Event_OnionMessageIntercepted, Event_OnionMessagePeerConnected } from '../structs/Event.mjs';
import { Option_EventZ, Option_EventZ_Some, Option_EventZ_None } from '../structs/Option_EventZ.mjs';
import { Result_COption_EventZDecodeErrorZ } from '../structs/Result_COption_EventZDecodeErrorZ.mjs';
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
import { Result_UntrustedStringDecodeErrorZ } from '../structs/Result_UntrustedStringDecodeErrorZ.mjs';
import { Result_HostnameDecodeErrorZ } from '../structs/Result_HostnameDecodeErrorZ.mjs';
import { TransactionU16LenLimited } from '../structs/TransactionU16LenLimited.mjs';
import { Result_TransactionU16LenLimitedNoneZ } from '../structs/Result_TransactionU16LenLimitedNoneZ.mjs';
import { Result_TransactionU16LenLimitedDecodeErrorZ } from '../structs/Result_TransactionU16LenLimitedDecodeErrorZ.mjs';
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
import { Result_Bolt12RefundContextDecodeErrorZ } from '../structs/Result_Bolt12RefundContextDecodeErrorZ.mjs';
import { Result_ResponderDecodeErrorZ } from '../structs/Result_ResponderDecodeErrorZ.mjs';
import { Option_MessageContextZ, Option_MessageContextZ_Some, Option_MessageContextZ_None } from '../structs/Option_MessageContextZ.mjs';
import { ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ } from '../structs/ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ.mjs';
import { SendError, SendError_Secp256k1, SendError_TooBigPacket, SendError_TooFewBlindedHops, SendError_InvalidFirstHop, SendError_PathNotFound, SendError_InvalidMessage, SendError_BufferFull, SendError_GetNodeIdFailed, SendError_UnresolvedIntroductionNode, SendError_BlindedPathAdvanceFailed } from '../structs/SendError.mjs';
import { Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ } from '../structs/Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ.mjs';
import { NextMessageHop, NextMessageHop_NodeId, NextMessageHop_ShortChannelId } from '../structs/NextMessageHop.mjs';
import { ParsedOnionMessageContents, ParsedOnionMessageContents_Offers, ParsedOnionMessageContents_DNSResolver, ParsedOnionMessageContents_Custom } from '../structs/ParsedOnionMessageContents.mjs';
import { PeeledOnion, PeeledOnion_Forward, PeeledOnion_Receive } from '../structs/PeeledOnion.mjs';
import { Result_PeeledOnionNoneZ } from '../structs/Result_PeeledOnionNoneZ.mjs';
import { SendSuccess, SendSuccess_Buffered, SendSuccess_BufferedAwaitingConnection } from '../structs/SendSuccess.mjs';
import { Result_SendSuccessSendErrorZ } from '../structs/Result_SendSuccessSendErrorZ.mjs';
import { Result_NoneSendErrorZ } from '../structs/Result_NoneSendErrorZ.mjs';
import { Result_BlindedHopDecodeErrorZ } from '../structs/Result_BlindedHopDecodeErrorZ.mjs';
import { Result_InvoiceErrorDecodeErrorZ } from '../structs/Result_InvoiceErrorDecodeErrorZ.mjs';
import { TrackedSpendableOutput } from '../structs/TrackedSpendableOutput.mjs';
import { Result_TrackedSpendableOutputDecodeErrorZ } from '../structs/Result_TrackedSpendableOutputDecodeErrorZ.mjs';
import { OutputSpendStatus, OutputSpendStatus_PendingInitialBroadcast, OutputSpendStatus_PendingFirstConfirmation, OutputSpendStatus_PendingThresholdConfirmations } from '../structs/OutputSpendStatus.mjs';
import { Result_OutputSpendStatusDecodeErrorZ } from '../structs/Result_OutputSpendStatusDecodeErrorZ.mjs';
import { WatchedOutput } from '../structs/WatchedOutput.mjs';
import { Filter, FilterInterface } from '../structs/Filter.mjs';
import { Option_FilterZ, Option_FilterZ_Some, Option_FilterZ_None } from '../structs/Option_FilterZ.mjs';
import { ChangeDestinationSource, ChangeDestinationSourceInterface } from '../structs/ChangeDestinationSource.mjs';
import { KVStore, KVStoreInterface } from '../structs/KVStore.mjs';
import { OutputSpender, OutputSpenderInterface } from '../structs/OutputSpender.mjs';
import { OutputSweeper } from '../structs/OutputSweeper.mjs';
import { Result_OutputSweeperDecodeErrorZ } from '../structs/Result_OutputSweeperDecodeErrorZ.mjs';
import { TwoTuple_BestBlockOutputSweeperZ } from '../structs/TwoTuple_BestBlockOutputSweeperZ.mjs';
import { Result_C2Tuple_BestBlockOutputSweeperZDecodeErrorZ } from '../structs/Result_C2Tuple_BestBlockOutputSweeperZDecodeErrorZ.mjs';
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
import { TwoTuple_OutPointChannelIdZ } from '../structs/TwoTuple_OutPointChannelIdZ.mjs';
import { TwoTuple_OutPointCVec_u64ZZ } from '../structs/TwoTuple_OutPointCVec_u64ZZ.mjs';
import { Result_BlindedMessagePathDecodeErrorZ } from '../structs/Result_BlindedMessagePathDecodeErrorZ.mjs';
import { Result_BlindedMessagePathNoneZ } from '../structs/Result_BlindedMessagePathNoneZ.mjs';
import { Result_MessageContextDecodeErrorZ } from '../structs/Result_MessageContextDecodeErrorZ.mjs';
import { Result_OffersContextDecodeErrorZ } from '../structs/Result_OffersContextDecodeErrorZ.mjs';
import { Result_AsyncPaymentsContextDecodeErrorZ } from '../structs/Result_AsyncPaymentsContextDecodeErrorZ.mjs';
import { Result_DNSResolverContextDecodeErrorZ } from '../structs/Result_DNSResolverContextDecodeErrorZ.mjs';
import { MigratableKVStore, MigratableKVStoreInterface } from '../structs/MigratableKVStore.mjs';
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
import { WriteableScore, WriteableScoreInterface } from '../structs/WriteableScore.mjs';
import { Persister, PersisterInterface } from '../structs/Persister.mjs';
import { MonitorUpdatingPersister } from '../structs/MonitorUpdatingPersister.mjs';
import { Persist, PersistInterface } from '../structs/Persist.mjs';
import { Listen, ListenInterface } from '../structs/Listen.mjs';
import { Confirm, ConfirmInterface } from '../structs/Confirm.mjs';
import { SpendingDelay, SpendingDelay_Relative, SpendingDelay_Absolute } from '../structs/SpendingDelay.mjs';
import { FutureCallback, FutureCallbackInterface } from '../structs/FutureCallback.mjs';
import { Future } from '../structs/Future.mjs';
import { ChannelHandshakeConfig } from '../structs/ChannelHandshakeConfig.mjs';
import { ChannelHandshakeLimits } from '../structs/ChannelHandshakeLimits.mjs';
import { ChannelConfigUpdate } from '../structs/ChannelConfigUpdate.mjs';
import { UserConfig } from '../structs/UserConfig.mjs';
import { ChainMonitor } from '../structs/ChainMonitor.mjs';
import { EventHandler, EventHandlerInterface } from '../structs/EventHandler.mjs';
import { EventsProvider, EventsProviderInterface } from '../structs/EventsProvider.mjs';
import { Verification, VerificationInterface } from '../structs/Verification.mjs';
import { UnauthenticatedReceiveTlvs } from '../structs/UnauthenticatedReceiveTlvs.mjs';
import { FailureCode, FailureCode_TemporaryNodeFailure, FailureCode_RequiredNodeFeatureMissing, FailureCode_IncorrectOrUnknownPaymentDetails, FailureCode_InvalidOnionPayload } from '../structs/FailureCode.mjs';
import { ChainParameters } from '../structs/ChainParameters.mjs';
import { Bolt11InvoiceParameters } from '../structs/Bolt11InvoiceParameters.mjs';
import { Sha256 } from '../structs/Sha256.mjs';
import { Bolt11InvoiceDescription, Bolt11InvoiceDescription_Direct, Bolt11InvoiceDescription_Hash } from '../structs/Bolt11InvoiceDescription.mjs';
import { MessageSendEventsProvider, MessageSendEventsProviderInterface } from '../structs/MessageSendEventsProvider.mjs';
import { ChannelMessageHandler, ChannelMessageHandlerInterface } from '../structs/ChannelMessageHandler.mjs';
import { OffersMessageHandler, OffersMessageHandlerInterface } from '../structs/OffersMessageHandler.mjs';
import { AsyncPaymentsMessageHandler, AsyncPaymentsMessageHandlerInterface } from '../structs/AsyncPaymentsMessageHandler.mjs';
import { DNSResolverMessageHandler, DNSResolverMessageHandlerInterface } from '../structs/DNSResolverMessageHandler.mjs';
import { NodeIdLookUp, NodeIdLookUpInterface } from '../structs/NodeIdLookUp.mjs';
import { ChannelManagerReadArgs } from '../structs/ChannelManagerReadArgs.mjs';
import { CommonOpenChannelFields } from '../structs/CommonOpenChannelFields.mjs';
import { CommonAcceptChannelFields } from '../structs/CommonAcceptChannelFields.mjs';
import { Packet } from '../structs/Packet.mjs';
import { RoutingMessageHandler, RoutingMessageHandlerInterface } from '../structs/RoutingMessageHandler.mjs';
import { OnionMessageHandler, OnionMessageHandlerInterface } from '../structs/OnionMessageHandler.mjs';
import { TrampolineOnionPacket } from '../structs/TrampolineOnionPacket.mjs';
import { CustomMessageReader, CustomMessageReaderInterface } from '../structs/CustomMessageReader.mjs';
import { CustomMessageHandler, CustomMessageHandlerInterface } from '../structs/CustomMessageHandler.mjs';
import { IgnoringMessageHandler } from '../structs/IgnoringMessageHandler.mjs';
import { CustomOnionMessageHandler, CustomOnionMessageHandlerInterface } from '../structs/CustomOnionMessageHandler.mjs';
import { ErroringMessageHandler } from '../structs/ErroringMessageHandler.mjs';
import { MessageHandler } from '../structs/MessageHandler.mjs';
import { SocketDescriptor, SocketDescriptorInterface } from '../structs/SocketDescriptor.mjs';
import { DirectedChannelTransactionParameters } from '../structs/DirectedChannelTransactionParameters.mjs';
import { OfferWithExplicitMetadataBuilder } from '../structs/OfferWithExplicitMetadataBuilder.mjs';
import { PrintableString } from '../structs/PrintableString.mjs';
import { OfferFeatures } from '../structs/OfferFeatures.mjs';
import { SignBolt12InvoiceFn, SignBolt12InvoiceFnInterface } from '../structs/SignBolt12InvoiceFn.mjs';
import { TaggedHash } from '../structs/TaggedHash.mjs';
import { InvoiceRequestFeatures } from '../structs/InvoiceRequestFeatures.mjs';
import { ErroneousField } from '../structs/ErroneousField.mjs';
import { UnsignedInvoiceRequest } from '../structs/UnsignedInvoiceRequest.mjs';
import { SignInvoiceRequestFn, SignInvoiceRequestFnInterface } from '../structs/SignInvoiceRequestFn.mjs';
import { SignError, SignError_Signing, SignError_Verification } from '../structs/SignError.mjs';
import { P2PGossipSync } from '../structs/P2PGossipSync.mjs';
import { ReadOnlyNetworkGraph } from '../structs/ReadOnlyNetworkGraph.mjs';
import { DirectedChannelInfo } from '../structs/DirectedChannelInfo.mjs';
import { EffectiveCapacity, EffectiveCapacity_ExactLiquidity, EffectiveCapacity_AdvertisedMaxHTLC, EffectiveCapacity_Total, EffectiveCapacity_Infinite, EffectiveCapacity_HintMaxHTLC, EffectiveCapacity_Unknown } from '../structs/EffectiveCapacity.mjs';
import { DefaultRouter } from '../structs/DefaultRouter.mjs';
import { ScorerAccountingForInFlightHtlcs } from '../structs/ScorerAccountingForInFlightHtlcs.mjs';
import { Payee, Payee_Blinded, Payee_Clear } from '../structs/Payee.mjs';
import { Score, ScoreInterface } from '../structs/Score.mjs';
import { MultiThreadedLockableScore } from '../structs/MultiThreadedLockableScore.mjs';
import { MultiThreadedScoreLockRead } from '../structs/MultiThreadedScoreLockRead.mjs';
import { MultiThreadedScoreLockWrite } from '../structs/MultiThreadedScoreLockWrite.mjs';
import { ProbabilisticScoringDecayParameters } from '../structs/ProbabilisticScoringDecayParameters.mjs';
import { KeysManager } from '../structs/KeysManager.mjs';
import { PhantomKeysManager } from '../structs/PhantomKeysManager.mjs';
import { RandomBytes } from '../structs/RandomBytes.mjs';
import { OMNameResolver } from '../structs/OMNameResolver.mjs';
import { OnionMessenger } from '../structs/OnionMessenger.mjs';
import { DefaultMessageRouter } from '../structs/DefaultMessageRouter.mjs';
import { IntroductionNode, IntroductionNode_NodeId, IntroductionNode_DirectedShortChannelId } from '../structs/IntroductionNode.mjs';
import { EmptyNodeIdLookUp } from '../structs/EmptyNodeIdLookUp.mjs';
import { ForwardTlvs } from '../structs/ForwardTlvs.mjs';
import { CoinSelectionSource, CoinSelectionSourceInterface } from '../structs/CoinSelectionSource.mjs';
import { WalletSource, WalletSourceInterface } from '../structs/WalletSource.mjs';
import { Wallet } from '../structs/Wallet.mjs';
import { BumpTransactionEventHandler } from '../structs/BumpTransactionEventHandler.mjs';
import { RapidGossipSync } from '../structs/RapidGossipSync.mjs';
import { GossipSync, GossipSync_P2P, GossipSync_Rapid, GossipSync_None } from '../structs/GossipSync.mjs';
import { RawDataPart } from '../structs/RawDataPart.mjs';
import { ExpiryTime } from '../structs/ExpiryTime.mjs';
import { MinFinalCltvExpiryDelta } from '../structs/MinFinalCltvExpiryDelta.mjs';
import { Fallback, Fallback_SegWitProgram, Fallback_PubKeyHash, Fallback_ScriptHash } from '../structs/Fallback.mjs';
import { LSPS0ClientEvent, LSPS0ClientEvent_ListProtocolsResponse } from '../structs/LSPS0ClientEvent.mjs';
import { LSPS1Options } from '../structs/LSPS1Options.mjs';
import { LSPSResponseError } from '../structs/LSPSResponseError.mjs';
import { LSPS1OrderId } from '../structs/LSPS1OrderId.mjs';
import { LSPS1OrderParams } from '../structs/LSPS1OrderParams.mjs';
import { LSPS1PaymentInfo } from '../structs/LSPS1PaymentInfo.mjs';
import { LSPS1ChannelInfo } from '../structs/LSPS1ChannelInfo.mjs';
import { LSPS1ClientEvent, LSPS1ClientEvent_SupportedOptionsReady, LSPS1ClientEvent_SupportedOptionsRequestFailed, LSPS1ClientEvent_OrderCreated, LSPS1ClientEvent_OrderStatus, LSPS1ClientEvent_OrderRequestFailed } from '../structs/LSPS1ClientEvent.mjs';
import { LSPS2ClientEvent, LSPS2ClientEvent_OpeningParametersReady, LSPS2ClientEvent_InvoiceParametersReady } from '../structs/LSPS2ClientEvent.mjs';
import { LSPS2ServiceEvent, LSPS2ServiceEvent_GetInfo, LSPS2ServiceEvent_BuyRequest, LSPS2ServiceEvent_OpenChannel } from '../structs/LSPS2ServiceEvent.mjs';
import { LiquidityEvent, LiquidityEvent_LSPS0Client, LiquidityEvent_LSPS1Client, LiquidityEvent_LSPS2Client, LiquidityEvent_LSPS2Service } from '../structs/LiquidityEvent.mjs';
import { LSPS0ClientHandler } from '../structs/LSPS0ClientHandler.mjs';
import { LSPS0ListProtocolsRequest } from '../structs/LSPS0ListProtocolsRequest.mjs';
import { LSPS0ListProtocolsResponse } from '../structs/LSPS0ListProtocolsResponse.mjs';
import { LSPS0Request, LSPS0Request_ListProtocols } from '../structs/LSPS0Request.mjs';
import { LSPS0Response, LSPS0Response_ListProtocols, LSPS0Response_ListProtocolsError } from '../structs/LSPS0Response.mjs';
import { LSPS0Message, LSPS0Message_Request, LSPS0Message_Response } from '../structs/LSPS0Message.mjs';
import { LSPS1GetInfoRequest } from '../structs/LSPS1GetInfoRequest.mjs';
import { LSPS1CreateOrderRequest } from '../structs/LSPS1CreateOrderRequest.mjs';
import { LSPS1GetOrderRequest } from '../structs/LSPS1GetOrderRequest.mjs';
import { LSPS1Request, LSPS1Request_GetInfo, LSPS1Request_CreateOrder, LSPS1Request_GetOrder } from '../structs/LSPS1Request.mjs';
import { LSPS1GetInfoResponse } from '../structs/LSPS1GetInfoResponse.mjs';
import { LSPS1CreateOrderResponse } from '../structs/LSPS1CreateOrderResponse.mjs';
import { LSPS1Response, LSPS1Response_GetInfo, LSPS1Response_GetInfoError, LSPS1Response_CreateOrder, LSPS1Response_CreateOrderError, LSPS1Response_GetOrder, LSPS1Response_GetOrderError } from '../structs/LSPS1Response.mjs';
import { LSPS1Message, LSPS1Message_Request, LSPS1Message_Response } from '../structs/LSPS1Message.mjs';
import { LSPS2GetInfoRequest } from '../structs/LSPS2GetInfoRequest.mjs';
import { LSPS2BuyRequest } from '../structs/LSPS2BuyRequest.mjs';
import { LSPS2Request, LSPS2Request_GetInfo, LSPS2Request_Buy } from '../structs/LSPS2Request.mjs';
import { LSPS2GetInfoResponse } from '../structs/LSPS2GetInfoResponse.mjs';
import { LSPS2BuyResponse } from '../structs/LSPS2BuyResponse.mjs';
import { LSPS2Response, LSPS2Response_GetInfo, LSPS2Response_GetInfoError, LSPS2Response_Buy, LSPS2Response_BuyError } from '../structs/LSPS2Response.mjs';
import { LSPS2Message, LSPS2Message_Request, LSPS2Message_Response } from '../structs/LSPS2Message.mjs';
import { LSPSMessage, LSPSMessage_Invalid, LSPSMessage_LSPS0, LSPSMessage_LSPS1, LSPSMessage_LSPS2 } from '../structs/LSPSMessage.mjs';
import { LSPS0ServiceHandler } from '../structs/LSPS0ServiceHandler.mjs';
import { LSPS1ClientConfig } from '../structs/LSPS1ClientConfig.mjs';
import { LSPS1ClientHandler } from '../structs/LSPS1ClientHandler.mjs';
import { LSPS1Bolt11PaymentInfo } from '../structs/LSPS1Bolt11PaymentInfo.mjs';
import { LSPS1OnchainPaymentInfo } from '../structs/LSPS1OnchainPaymentInfo.mjs';
import { LSPS1OnchainPayment } from '../structs/LSPS1OnchainPayment.mjs';
import { LSPS2ClientConfig } from '../structs/LSPS2ClientConfig.mjs';
import { LSPS2ClientHandler } from '../structs/LSPS2ClientHandler.mjs';
import { LSPS2InterceptScid } from '../structs/LSPS2InterceptScid.mjs';
import { LSPS2ServiceConfig } from '../structs/LSPS2ServiceConfig.mjs';
import { LSPS2ServiceHandler } from '../structs/LSPS2ServiceHandler.mjs';
import { MessageQueue } from '../structs/MessageQueue.mjs';
import { ProcessMessagesCallback, ProcessMessagesCallbackInterface } from '../structs/ProcessMessagesCallback.mjs';

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A PeerManager manages a set of peers, described by their [`SocketDescriptor`] and marshalls
 * socket events into messages which it passes on to its [`MessageHandler`].
 * 
 * Locks are taken internally, so you must never assume that reentrancy from a
 * [`SocketDescriptor`] call back into [`PeerManager`] methods will not deadlock.
 * 
 * Calls to [`read_event`] will decode relevant messages and pass them to the
 * [`ChannelMessageHandler`], likely doing message processing in-line. Thus, the primary form of
 * parallelism in Rust-Lightning is in calls to [`read_event`]. Note, however, that calls to any
 * [`PeerManager`] functions related to the same connection must occur only in serial, making new
 * calls only after previous ones have returned.
 * 
 * Rather than using a plain [`PeerManager`], it is preferable to use either a [`SimpleArcPeerManager`]
 * a [`SimpleRefPeerManager`], for conciseness. See their documentation for more details, but
 * essentially you should default to using a [`SimpleRefPeerManager`], and use a
 * [`SimpleArcPeerManager`] when you require a `PeerManager` with a static lifetime, such as when
 * you're using lightning-net-tokio.
 * 
 * [`read_event`]: PeerManager::read_event
 */
export class PeerManager extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PeerManager_free);
	}

	/**
	 * Constructs a new `PeerManager` with the given message handlers.
	 * 
	 * `ephemeral_random_data` is used to derive per-connection ephemeral keys and must be
	 * cryptographically secure random bytes.
	 * 
	 * `current_time` is used as an always-increasing counter that survives across restarts and is
	 * incremented irregularly internally. In general it is best to simply use the current UNIX
	 * timestamp, however if it is not available a persistent counter that increases once per
	 * minute should suffice.
	 */
	public static constructor_new(message_handler_chan_handler_arg: ChannelMessageHandler, message_handler_route_handler_arg: RoutingMessageHandler, message_handler_onion_message_handler_arg: OnionMessageHandler, message_handler_custom_message_handler_arg: CustomMessageHandler, current_time: number, ephemeral_random_data: Uint8Array, logger: Logger, node_signer: NodeSigner): PeerManager {
		const ret: bigint = bindings.PeerManager_new(bindings.MessageHandler_new(CommonBase.get_ptr_of(message_handler_chan_handler_arg), CommonBase.get_ptr_of(message_handler_route_handler_arg), CommonBase.get_ptr_of(message_handler_onion_message_handler_arg), CommonBase.get_ptr_of(message_handler_custom_message_handler_arg)), current_time, bindings.encodeUint8Array(ephemeral_random_data), CommonBase.get_ptr_of(logger), CommonBase.get_ptr_of(node_signer));
		const ret_hu_conv: PeerManager = new PeerManager(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_chan_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_route_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_onion_message_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_custom_message_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		return ret_hu_conv;
	}

	/**
	 * Returns a list of [`PeerDetails`] for connected peers that have completed the initial
	 * handshake.
	 */
	public list_peers(): PeerDetails[] {
		const ret: number = bindings.PeerManager_list_peers(this.ptr);
		const ret_conv_13_len: number = bindings.getArrayLength(ret);
		const ret_conv_13_arr: PeerDetails[] = new Array(ret_conv_13_len).fill(null);
		for (var n = 0; n < ret_conv_13_len; n++) {
			const ret_conv_13: bigint = bindings.getU64ArrayElem(ret, n);
			const ret_conv_13_hu_conv: PeerDetails = new PeerDetails(null, ret_conv_13);
			CommonBase.add_ref_from(ret_conv_13_hu_conv, this);
			ret_conv_13_arr[n] = ret_conv_13_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_13_arr;
	}

	/**
	 * Returns the [`PeerDetails`] of a connected peer that has completed the initial handshake.
	 * 
	 * Will return `None` if the peer is unknown or it hasn't completed the initial handshake.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public peer_by_node_id(their_node_id: Uint8Array): PeerDetails {
		const ret: bigint = bindings.PeerManager_peer_by_node_id(this.ptr, bindings.encodeUint8Array(their_node_id));
		const ret_hu_conv: PeerDetails = new PeerDetails(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Indicates a new outbound connection has been established to a node with the given `node_id`
	 * and an optional remote network address.
	 * 
	 * The remote network address adds the option to report a remote IP address back to a connecting
	 * peer using the init message.
	 * The user should pass the remote network address of the host they are connected to.
	 * 
	 * If an `Err` is returned here you must disconnect the connection immediately.
	 * 
	 * Returns a small number of bytes to send to the remote node (currently always 50).
	 * 
	 * Panics if descriptor is duplicative with some other descriptor which has not yet been
	 * [`socket_disconnected`].
	 * 
	 * [`socket_disconnected`]: PeerManager::socket_disconnected
	 */
	public new_outbound_connection(their_node_id: Uint8Array, descriptor: SocketDescriptor, remote_network_address: Option_SocketAddressZ): Result_CVec_u8ZPeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_new_outbound_connection(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(descriptor), CommonBase.get_ptr_of(remote_network_address));
		const ret_hu_conv: Result_CVec_u8ZPeerHandleErrorZ = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, descriptor);
		return ret_hu_conv;
	}

	/**
	 * Indicates a new inbound connection has been established to a node with an optional remote
	 * network address.
	 * 
	 * The remote network address adds the option to report a remote IP address back to a connecting
	 * peer using the init message.
	 * The user should pass the remote network address of the host they are connected to.
	 * 
	 * May refuse the connection by returning an Err, but will never write bytes to the remote end
	 * (outbound connector always speaks first). If an `Err` is returned here you must disconnect
	 * the connection immediately.
	 * 
	 * Panics if descriptor is duplicative with some other descriptor which has not yet been
	 * [`socket_disconnected`].
	 * 
	 * [`socket_disconnected`]: PeerManager::socket_disconnected
	 */
	public new_inbound_connection(descriptor: SocketDescriptor, remote_network_address: Option_SocketAddressZ): Result_NonePeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_new_inbound_connection(this.ptr, CommonBase.get_ptr_of(descriptor), CommonBase.get_ptr_of(remote_network_address));
		const ret_hu_conv: Result_NonePeerHandleErrorZ = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, descriptor);
		return ret_hu_conv;
	}

	/**
	 * Indicates that there is room to write data to the given socket descriptor.
	 * 
	 * May return an Err to indicate that the connection should be closed.
	 * 
	 * May call [`send_data`] on the descriptor passed in (or an equal descriptor) before
	 * returning. Thus, be very careful with reentrancy issues! The invariants around calling
	 * [`write_buffer_space_avail`] in case a write did not fully complete must still hold - be
	 * ready to call [`write_buffer_space_avail`] again if a write call generated here isn't
	 * sufficient!
	 * 
	 * [`send_data`]: SocketDescriptor::send_data
	 * [`write_buffer_space_avail`]: PeerManager::write_buffer_space_avail
	 */
	public write_buffer_space_avail(descriptor: SocketDescriptor): Result_NonePeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_write_buffer_space_avail(this.ptr, CommonBase.get_ptr_of(descriptor));
		const ret_hu_conv: Result_NonePeerHandleErrorZ = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Indicates that data was read from the given socket descriptor.
	 * 
	 * May return an Err to indicate that the connection should be closed.
	 * 
	 * Will *not* call back into [`send_data`] on any descriptors to avoid reentrancy complexity.
	 * Thus, however, you should call [`process_events`] after any `read_event` to generate
	 * [`send_data`] calls to handle responses.
	 * 
	 * If `Ok(true)` is returned, further read_events should not be triggered until a
	 * [`send_data`] call on this descriptor has `resume_read` set (preventing DoS issues in the
	 * send buffer).
	 * 
	 * In order to avoid processing too many messages at once per peer, `data` should be on the
	 * order of 4KiB.
	 * 
	 * [`send_data`]: SocketDescriptor::send_data
	 * [`process_events`]: PeerManager::process_events
	 */
	public read_event(peer_descriptor: SocketDescriptor, data: Uint8Array): Result_boolPeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_read_event(this.ptr, CommonBase.get_ptr_of(peer_descriptor), bindings.encodeUint8Array(data));
		const ret_hu_conv: Result_boolPeerHandleErrorZ = Result_boolPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks for any events generated by our handlers and processes them. Includes sending most
	 * response messages as well as messages generated by calls to handler functions directly (eg
	 * functions like [`ChannelManager::process_pending_htlc_forwards`] or [`send_payment`]).
	 * 
	 * May call [`send_data`] on [`SocketDescriptor`]s. Thus, be very careful with reentrancy
	 * issues!
	 * 
	 * This should be called any time we may have messages to send. It is automatically called by
	 * [`lightning-net-tokio`] after processing incoming messages, and by
	 * [`lightning-background-processor`] when channel state has changed. Therefore, If you are not
	 * using both [`lightning-net-tokio`] and [`lightning-background-processor`], you may need to call
	 * this function manually to prevent messages from being delayed.
	 * 
	 * Note that if there are any other calls to this function waiting on lock(s) this may return
	 * without doing any work. All available events that need handling will be handled before the
	 * other calls return.
	 * 
	 * [`send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`ChannelManager::process_pending_htlc_forwards`]: crate::ln::channelmanager::ChannelManager::process_pending_htlc_forwards
	 * [`send_data`]: SocketDescriptor::send_data
	 * [`lightning-net-tokio`]: https://docs.rs/lightning-net-tokio/latest/lightning_net_tokio
	 * [`lightning-background-processor`]: https://docs.rs/lightning-background-processor/latest/lightning_background_processor
	 */
	public process_events(): void {
		bindings.PeerManager_process_events(this.ptr);
	}

	/**
	 * Indicates that the given socket descriptor's connection is now closed.
	 */
	public socket_disconnected(descriptor: SocketDescriptor): void {
		bindings.PeerManager_socket_disconnected(this.ptr, CommonBase.get_ptr_of(descriptor));
	}

	/**
	 * Disconnect a peer given its node id.
	 * 
	 * If a peer is connected, this will call [`disconnect_socket`] on the descriptor for the
	 * peer. Thus, be very careful about reentrancy issues.
	 * 
	 * [`disconnect_socket`]: SocketDescriptor::disconnect_socket
	 */
	public disconnect_by_node_id(node_id: Uint8Array): void {
		bindings.PeerManager_disconnect_by_node_id(this.ptr, bindings.encodeUint8Array(node_id));
	}

	/**
	 * Disconnects all currently-connected peers. This is useful on platforms where there may be
	 * an indication that TCP sockets have stalled even if we weren't around to time them out
	 * using regular ping/pongs.
	 */
	public disconnect_all_peers(): void {
		bindings.PeerManager_disconnect_all_peers(this.ptr);
	}

	/**
	 * Send pings to each peer and disconnect those which did not respond to the last round of
	 * pings.
	 * 
	 * This may be called on any timescale you want, however, roughly once every ten seconds is
	 * preferred. The call rate determines both how often we send a ping to our peers and how much
	 * time they have to respond before we disconnect them.
	 * 
	 * May call [`send_data`] on all [`SocketDescriptor`]s. Thus, be very careful with reentrancy
	 * issues!
	 * 
	 * [`send_data`]: SocketDescriptor::send_data
	 */
	public timer_tick_occurred(): void {
		bindings.PeerManager_timer_tick_occurred(this.ptr);
	}

	/**
	 * Generates a signed node_announcement from the given arguments, sending it to all connected
	 * peers. Note that peers will likely ignore this message unless we have at least one public
	 * channel which has at least six confirmations on-chain.
	 * 
	 * `rgb` is a node \"color\" and `alias` is a printable human-readable string to describe this
	 * node to humans. They carry no in-protocol meaning.
	 * 
	 * `addresses` represent the set (possibly empty) of socket addresses on which this node
	 * accepts incoming connections. These will be included in the node_announcement, publicly
	 * tying these addresses together and to this node. If you wish to preserve user privacy,
	 * addresses should likely contain only Tor Onion addresses.
	 * 
	 * Panics if `addresses` is absurdly large (more than 100).
	 * 
	 * [`get_and_clear_pending_msg_events`]: MessageSendEventsProvider::get_and_clear_pending_msg_events
	 */
	public broadcast_node_announcement(rgb: Uint8Array, alias: Uint8Array, addresses: SocketAddress[]): void {
		bindings.PeerManager_broadcast_node_announcement(this.ptr, bindings.encodeUint8Array(rgb), bindings.encodeUint8Array(alias), bindings.encodeUint64Array(addresses.map(addresses_conv_15 => CommonBase.get_ptr_of(addresses_conv_15))));
	}

}
