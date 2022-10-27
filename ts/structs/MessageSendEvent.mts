import { TxOut } from '../structs/TxOut.mjs';
import { BigEndianScalar } from '../structs/BigEndianScalar.mjs';
import { AccessError } from '../enums/AccessError.mjs';
import { COption_NoneZ } from '../enums/COption_NoneZ.mjs';
import { ChannelMonitorUpdateStatus } from '../enums/ChannelMonitorUpdateStatus.mjs';
import { ConfirmationTarget } from '../enums/ConfirmationTarget.mjs';
import { CreationError } from '../enums/CreationError.mjs';
import { Currency } from '../enums/Currency.mjs';
import { IOError } from '../enums/IOError.mjs';
import { Level } from '../enums/Level.mjs';
import { Network } from '../enums/Network.mjs';
import { Recipient } from '../enums/Recipient.mjs';
import { Secp256k1Error } from '../enums/Secp256k1Error.mjs';
import { SemanticError } from '../enums/SemanticError.mjs';
import { SiPrefix } from '../enums/SiPrefix.mjs';
import { Bech32Error } from '../structs/Bech32Error.mjs';
import { BlindedRoute } from '../structs/BlindedRoute.mjs';
import { Result_BlindedRouteNoneZ } from '../structs/Result_BlindedRouteNoneZ.mjs';
import { DecodeError } from '../structs/DecodeError.mjs';
import { Result_BlindedRouteDecodeErrorZ } from '../structs/Result_BlindedRouteDecodeErrorZ.mjs';
import { BlindedHop } from '../structs/BlindedHop.mjs';
import { Result_BlindedHopDecodeErrorZ } from '../structs/Result_BlindedHopDecodeErrorZ.mjs';
import { Result_NoneNoneZ } from '../structs/Result_NoneNoneZ.mjs';
import { CounterpartyCommitmentSecrets } from '../structs/CounterpartyCommitmentSecrets.mjs';
import { Result_CounterpartyCommitmentSecretsDecodeErrorZ } from '../structs/Result_CounterpartyCommitmentSecretsDecodeErrorZ.mjs';
import { Result_SecretKeyErrorZ } from '../structs/Result_SecretKeyErrorZ.mjs';
import { Result_PublicKeyErrorZ } from '../structs/Result_PublicKeyErrorZ.mjs';
import { TxCreationKeys } from '../structs/TxCreationKeys.mjs';
import { Result_TxCreationKeysDecodeErrorZ } from '../structs/Result_TxCreationKeysDecodeErrorZ.mjs';
import { ChannelPublicKeys } from '../structs/ChannelPublicKeys.mjs';
import { Result_ChannelPublicKeysDecodeErrorZ } from '../structs/Result_ChannelPublicKeysDecodeErrorZ.mjs';
import { Result_TxCreationKeysErrorZ } from '../structs/Result_TxCreationKeysErrorZ.mjs';
import { Option_u32Z } from '../structs/Option_u32Z.mjs';
import { HTLCOutputInCommitment } from '../structs/HTLCOutputInCommitment.mjs';
import { Result_HTLCOutputInCommitmentDecodeErrorZ } from '../structs/Result_HTLCOutputInCommitmentDecodeErrorZ.mjs';
import { CounterpartyChannelTransactionParameters } from '../structs/CounterpartyChannelTransactionParameters.mjs';
import { Result_CounterpartyChannelTransactionParametersDecodeErrorZ } from '../structs/Result_CounterpartyChannelTransactionParametersDecodeErrorZ.mjs';
import { ChannelTransactionParameters } from '../structs/ChannelTransactionParameters.mjs';
import { Result_ChannelTransactionParametersDecodeErrorZ } from '../structs/Result_ChannelTransactionParametersDecodeErrorZ.mjs';
import { HolderCommitmentTransaction } from '../structs/HolderCommitmentTransaction.mjs';
import { Result_HolderCommitmentTransactionDecodeErrorZ } from '../structs/Result_HolderCommitmentTransactionDecodeErrorZ.mjs';
import { BuiltCommitmentTransaction } from '../structs/BuiltCommitmentTransaction.mjs';
import { Result_BuiltCommitmentTransactionDecodeErrorZ } from '../structs/Result_BuiltCommitmentTransactionDecodeErrorZ.mjs';
import { TrustedClosingTransaction } from '../structs/TrustedClosingTransaction.mjs';
import { Result_TrustedClosingTransactionNoneZ } from '../structs/Result_TrustedClosingTransactionNoneZ.mjs';
import { CommitmentTransaction } from '../structs/CommitmentTransaction.mjs';
import { Result_CommitmentTransactionDecodeErrorZ } from '../structs/Result_CommitmentTransactionDecodeErrorZ.mjs';
import { TrustedCommitmentTransaction } from '../structs/TrustedCommitmentTransaction.mjs';
import { Result_TrustedCommitmentTransactionNoneZ } from '../structs/Result_TrustedCommitmentTransactionNoneZ.mjs';
import { Result_CVec_SignatureZNoneZ } from '../structs/Result_CVec_SignatureZNoneZ.mjs';
import { ShutdownScript } from '../structs/ShutdownScript.mjs';
import { Result_ShutdownScriptDecodeErrorZ } from '../structs/Result_ShutdownScriptDecodeErrorZ.mjs';
import { InvalidShutdownScript } from '../structs/InvalidShutdownScript.mjs';
import { Result_ShutdownScriptInvalidShutdownScriptZ } from '../structs/Result_ShutdownScriptInvalidShutdownScriptZ.mjs';
import { RouteHop } from '../structs/RouteHop.mjs';
import { Result_RouteHopDecodeErrorZ } from '../structs/Result_RouteHopDecodeErrorZ.mjs';
import { Route } from '../structs/Route.mjs';
import { Result_RouteDecodeErrorZ } from '../structs/Result_RouteDecodeErrorZ.mjs';
import { RouteParameters } from '../structs/RouteParameters.mjs';
import { Result_RouteParametersDecodeErrorZ } from '../structs/Result_RouteParametersDecodeErrorZ.mjs';
import { RouteHint } from '../structs/RouteHint.mjs';
import { Option_u64Z } from '../structs/Option_u64Z.mjs';
import { PaymentParameters } from '../structs/PaymentParameters.mjs';
import { Result_PaymentParametersDecodeErrorZ } from '../structs/Result_PaymentParametersDecodeErrorZ.mjs';
import { RouteHintHop } from '../structs/RouteHintHop.mjs';
import { Result_RouteHintDecodeErrorZ } from '../structs/Result_RouteHintDecodeErrorZ.mjs';
import { Result_RouteHintHopDecodeErrorZ } from '../structs/Result_RouteHintHopDecodeErrorZ.mjs';
import { ChannelDetails } from '../structs/ChannelDetails.mjs';
import { LightningError } from '../structs/LightningError.mjs';
import { Result_RouteLightningErrorZ } from '../structs/Result_RouteLightningErrorZ.mjs';
import { PaymentPurpose } from '../structs/PaymentPurpose.mjs';
import { Result_PaymentPurposeDecodeErrorZ } from '../structs/Result_PaymentPurposeDecodeErrorZ.mjs';
import { ClosureReason } from '../structs/ClosureReason.mjs';
import { Option_ClosureReasonZ } from '../structs/Option_ClosureReasonZ.mjs';
import { Result_COption_ClosureReasonZDecodeErrorZ } from '../structs/Result_COption_ClosureReasonZDecodeErrorZ.mjs';
import { HTLCDestination } from '../structs/HTLCDestination.mjs';
import { Option_HTLCDestinationZ } from '../structs/Option_HTLCDestinationZ.mjs';
import { Result_COption_HTLCDestinationZDecodeErrorZ } from '../structs/Result_COption_HTLCDestinationZDecodeErrorZ.mjs';
import { ChannelUpdate } from '../structs/ChannelUpdate.mjs';
import { NetworkUpdate } from '../structs/NetworkUpdate.mjs';
import { Option_NetworkUpdateZ } from '../structs/Option_NetworkUpdateZ.mjs';
import { OutPoint } from '../structs/OutPoint.mjs';
import { DelayedPaymentOutputDescriptor } from '../structs/DelayedPaymentOutputDescriptor.mjs';
import { StaticPaymentOutputDescriptor } from '../structs/StaticPaymentOutputDescriptor.mjs';
import { SpendableOutputDescriptor } from '../structs/SpendableOutputDescriptor.mjs';
import { ChannelTypeFeatures } from '../structs/ChannelTypeFeatures.mjs';
import { Event } from '../structs/Event.mjs';
import { Option_EventZ } from '../structs/Option_EventZ.mjs';
import { Result_COption_EventZDecodeErrorZ } from '../structs/Result_COption_EventZDecodeErrorZ.mjs';
import { AcceptChannel } from '../structs/AcceptChannel.mjs';
import { OpenChannel } from '../structs/OpenChannel.mjs';
import { FundingCreated } from '../structs/FundingCreated.mjs';
import { FundingSigned } from '../structs/FundingSigned.mjs';
import { ChannelReady } from '../structs/ChannelReady.mjs';
import { AnnouncementSignatures } from '../structs/AnnouncementSignatures.mjs';
import { CommitmentUpdate } from '../structs/CommitmentUpdate.mjs';
import { RevokeAndACK } from '../structs/RevokeAndACK.mjs';
import { ClosingSigned } from '../structs/ClosingSigned.mjs';
import { Shutdown } from '../structs/Shutdown.mjs';
import { ChannelReestablish } from '../structs/ChannelReestablish.mjs';
import { ChannelAnnouncement } from '../structs/ChannelAnnouncement.mjs';
import { ErrorMessage } from '../structs/ErrorMessage.mjs';
import { WarningMessage } from '../structs/WarningMessage.mjs';
import { ErrorAction } from '../structs/ErrorAction.mjs';
import { QueryChannelRange } from '../structs/QueryChannelRange.mjs';
import { QueryShortChannelIds } from '../structs/QueryShortChannelIds.mjs';
import { ReplyChannelRange } from '../structs/ReplyChannelRange.mjs';
import { GossipTimestampFilter } from '../structs/GossipTimestampFilter.mjs';
import { Result_TxOutAccessErrorZ } from '../structs/Result_TxOutAccessErrorZ.mjs';
import { TwoTuple_usizeTransactionZ } from '../structs/TwoTuple_usizeTransactionZ.mjs';
import { HTLCUpdate } from '../structs/HTLCUpdate.mjs';
import { MonitorEvent } from '../structs/MonitorEvent.mjs';
import { ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ } from '../structs/ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ.mjs';
import { FixedPenaltyScorer } from '../structs/FixedPenaltyScorer.mjs';
import { Result_FixedPenaltyScorerDecodeErrorZ } from '../structs/Result_FixedPenaltyScorerDecodeErrorZ.mjs';
import { TwoTuple_u64u64Z } from '../structs/TwoTuple_u64u64Z.mjs';
import { Option_C2Tuple_u64u64ZZ } from '../structs/Option_C2Tuple_u64u64ZZ.mjs';
import { NodeId } from '../structs/NodeId.mjs';
import { Record } from '../structs/Record.mjs';
import { Logger, LoggerInterface } from '../structs/Logger.mjs';
import { NetworkGraph } from '../structs/NetworkGraph.mjs';
import { ProbabilisticScorer } from '../structs/ProbabilisticScorer.mjs';
import { Result_ProbabilisticScorerDecodeErrorZ } from '../structs/Result_ProbabilisticScorerDecodeErrorZ.mjs';
import { InitFeatures } from '../structs/InitFeatures.mjs';
import { Result_InitFeaturesDecodeErrorZ } from '../structs/Result_InitFeaturesDecodeErrorZ.mjs';
import { ChannelFeatures } from '../structs/ChannelFeatures.mjs';
import { Result_ChannelFeaturesDecodeErrorZ } from '../structs/Result_ChannelFeaturesDecodeErrorZ.mjs';
import { NodeFeatures } from '../structs/NodeFeatures.mjs';
import { Result_NodeFeaturesDecodeErrorZ } from '../structs/Result_NodeFeaturesDecodeErrorZ.mjs';
import { InvoiceFeatures } from '../structs/InvoiceFeatures.mjs';
import { Result_InvoiceFeaturesDecodeErrorZ } from '../structs/Result_InvoiceFeaturesDecodeErrorZ.mjs';
import { Result_ChannelTypeFeaturesDecodeErrorZ } from '../structs/Result_ChannelTypeFeaturesDecodeErrorZ.mjs';
import { Result_NodeIdDecodeErrorZ } from '../structs/Result_NodeIdDecodeErrorZ.mjs';
import { Result_COption_NetworkUpdateZDecodeErrorZ } from '../structs/Result_COption_NetworkUpdateZDecodeErrorZ.mjs';
import { Access, AccessInterface } from '../structs/Access.mjs';
import { Option_AccessZ } from '../structs/Option_AccessZ.mjs';
import { Result_boolLightningErrorZ } from '../structs/Result_boolLightningErrorZ.mjs';
import { ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ } from '../structs/ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ.mjs';
import { Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ } from '../structs/Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.mjs';
import { Result_NoneLightningErrorZ } from '../structs/Result_NoneLightningErrorZ.mjs';
import { ChannelUpdateInfo } from '../structs/ChannelUpdateInfo.mjs';
import { Result_ChannelUpdateInfoDecodeErrorZ } from '../structs/Result_ChannelUpdateInfoDecodeErrorZ.mjs';
import { ChannelInfo } from '../structs/ChannelInfo.mjs';
import { Result_ChannelInfoDecodeErrorZ } from '../structs/Result_ChannelInfoDecodeErrorZ.mjs';
import { RoutingFees } from '../structs/RoutingFees.mjs';
import { Result_RoutingFeesDecodeErrorZ } from '../structs/Result_RoutingFeesDecodeErrorZ.mjs';
import { Hostname } from '../structs/Hostname.mjs';
import { NetAddress } from '../structs/NetAddress.mjs';
import { NodeAnnouncementInfo } from '../structs/NodeAnnouncementInfo.mjs';
import { Result_NodeAnnouncementInfoDecodeErrorZ } from '../structs/Result_NodeAnnouncementInfoDecodeErrorZ.mjs';
import { NodeAlias } from '../structs/NodeAlias.mjs';
import { Result_NodeAliasDecodeErrorZ } from '../structs/Result_NodeAliasDecodeErrorZ.mjs';
import { NodeInfo } from '../structs/NodeInfo.mjs';
import { Result_NodeInfoDecodeErrorZ } from '../structs/Result_NodeInfoDecodeErrorZ.mjs';
import { Result_NetworkGraphDecodeErrorZ } from '../structs/Result_NetworkGraphDecodeErrorZ.mjs';
import { Option_CVec_NetAddressZZ } from '../structs/Option_CVec_NetAddressZZ.mjs';
import { Result_DelayedPaymentOutputDescriptorDecodeErrorZ } from '../structs/Result_DelayedPaymentOutputDescriptorDecodeErrorZ.mjs';
import { Result_StaticPaymentOutputDescriptorDecodeErrorZ } from '../structs/Result_StaticPaymentOutputDescriptorDecodeErrorZ.mjs';
import { Result_SpendableOutputDescriptorDecodeErrorZ } from '../structs/Result_SpendableOutputDescriptorDecodeErrorZ.mjs';
import { TwoTuple_SignatureCVec_SignatureZZ } from '../structs/TwoTuple_SignatureCVec_SignatureZZ.mjs';
import { Result_C2Tuple_SignatureCVec_SignatureZZNoneZ } from '../structs/Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.mjs';
import { Result_SignatureNoneZ } from '../structs/Result_SignatureNoneZ.mjs';
import { TwoTuple_SignatureSignatureZ } from '../structs/TwoTuple_SignatureSignatureZ.mjs';
import { Result_C2Tuple_SignatureSignatureZNoneZ } from '../structs/Result_C2Tuple_SignatureSignatureZNoneZ.mjs';
import { Result_SecretKeyNoneZ } from '../structs/Result_SecretKeyNoneZ.mjs';
import { Result_PublicKeyNoneZ } from '../structs/Result_PublicKeyNoneZ.mjs';
import { Option_ScalarZ } from '../structs/Option_ScalarZ.mjs';
import { Result_SharedSecretNoneZ } from '../structs/Result_SharedSecretNoneZ.mjs';
import { ClosingTransaction } from '../structs/ClosingTransaction.mjs';
import { UnsignedChannelAnnouncement } from '../structs/UnsignedChannelAnnouncement.mjs';
import { BaseSign, BaseSignInterface } from '../structs/BaseSign.mjs';
import { Sign, SignInterface } from '../structs/Sign.mjs';
import { Result_SignDecodeErrorZ } from '../structs/Result_SignDecodeErrorZ.mjs';
import { Result_RecoverableSignatureNoneZ } from '../structs/Result_RecoverableSignatureNoneZ.mjs';
import { Result_CVec_CVec_u8ZZNoneZ } from '../structs/Result_CVec_CVec_u8ZZNoneZ.mjs';
import { InMemorySigner } from '../structs/InMemorySigner.mjs';
import { Result_InMemorySignerDecodeErrorZ } from '../structs/Result_InMemorySignerDecodeErrorZ.mjs';
import { Result_TransactionNoneZ } from '../structs/Result_TransactionNoneZ.mjs';
import { Option_u16Z } from '../structs/Option_u16Z.mjs';
import { APIError } from '../structs/APIError.mjs';
import { Result_NoneAPIErrorZ } from '../structs/Result_NoneAPIErrorZ.mjs';
import { Result__u832APIErrorZ } from '../structs/Result__u832APIErrorZ.mjs';
import { PaymentSendFailure } from '../structs/PaymentSendFailure.mjs';
import { Result_PaymentIdPaymentSendFailureZ } from '../structs/Result_PaymentIdPaymentSendFailureZ.mjs';
import { Result_NonePaymentSendFailureZ } from '../structs/Result_NonePaymentSendFailureZ.mjs';
import { TwoTuple_PaymentHashPaymentIdZ } from '../structs/TwoTuple_PaymentHashPaymentIdZ.mjs';
import { Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ } from '../structs/Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.mjs';
import { TwoTuple_PaymentHashPaymentSecretZ } from '../structs/TwoTuple_PaymentHashPaymentSecretZ.mjs';
import { Result_C2Tuple_PaymentHashPaymentSecretZNoneZ } from '../structs/Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.mjs';
import { Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ } from '../structs/Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.mjs';
import { Result_PaymentSecretNoneZ } from '../structs/Result_PaymentSecretNoneZ.mjs';
import { Result_PaymentSecretAPIErrorZ } from '../structs/Result_PaymentSecretAPIErrorZ.mjs';
import { Result_PaymentPreimageAPIErrorZ } from '../structs/Result_PaymentPreimageAPIErrorZ.mjs';
import { CounterpartyForwardingInfo } from '../structs/CounterpartyForwardingInfo.mjs';
import { Result_CounterpartyForwardingInfoDecodeErrorZ } from '../structs/Result_CounterpartyForwardingInfoDecodeErrorZ.mjs';
import { ChannelCounterparty } from '../structs/ChannelCounterparty.mjs';
import { Result_ChannelCounterpartyDecodeErrorZ } from '../structs/Result_ChannelCounterpartyDecodeErrorZ.mjs';
import { Result_ChannelDetailsDecodeErrorZ } from '../structs/Result_ChannelDetailsDecodeErrorZ.mjs';
import { PhantomRouteHints } from '../structs/PhantomRouteHints.mjs';
import { Result_PhantomRouteHintsDecodeErrorZ } from '../structs/Result_PhantomRouteHintsDecodeErrorZ.mjs';
import { ChannelMonitor } from '../structs/ChannelMonitor.mjs';
import { ChannelMonitorUpdate } from '../structs/ChannelMonitorUpdate.mjs';
import { Watch, WatchInterface } from '../structs/Watch.mjs';
import { BroadcasterInterface, BroadcasterInterfaceInterface } from '../structs/BroadcasterInterface.mjs';
import { KeysInterface, KeysInterfaceInterface } from '../structs/KeysInterface.mjs';
import { FeeEstimator, FeeEstimatorInterface } from '../structs/FeeEstimator.mjs';
import { ChannelManager } from '../structs/ChannelManager.mjs';
import { TwoTuple_BlockHashChannelManagerZ } from '../structs/TwoTuple_BlockHashChannelManagerZ.mjs';
import { Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ } from '../structs/Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.mjs';
import { ChannelConfig } from '../structs/ChannelConfig.mjs';
import { Result_ChannelConfigDecodeErrorZ } from '../structs/Result_ChannelConfigDecodeErrorZ.mjs';
import { Result_OutPointDecodeErrorZ } from '../structs/Result_OutPointDecodeErrorZ.mjs';
import { Type, TypeInterface } from '../structs/Type.mjs';
import { Option_TypeZ } from '../structs/Option_TypeZ.mjs';
import { Result_COption_TypeZDecodeErrorZ } from '../structs/Result_COption_TypeZDecodeErrorZ.mjs';
import { PaymentError } from '../structs/PaymentError.mjs';
import { Result_PaymentIdPaymentErrorZ } from '../structs/Result_PaymentIdPaymentErrorZ.mjs';
import { InFlightHtlcs } from '../structs/InFlightHtlcs.mjs';
import { Result_InFlightHtlcsDecodeErrorZ } from '../structs/Result_InFlightHtlcsDecodeErrorZ.mjs';
import { ParseError } from '../structs/ParseError.mjs';
import { Result_SiPrefixParseErrorZ } from '../structs/Result_SiPrefixParseErrorZ.mjs';
import { Invoice } from '../structs/Invoice.mjs';
import { ParseOrSemanticError } from '../structs/ParseOrSemanticError.mjs';
import { Result_InvoiceParseOrSemanticErrorZ } from '../structs/Result_InvoiceParseOrSemanticErrorZ.mjs';
import { SignedRawInvoice } from '../structs/SignedRawInvoice.mjs';
import { Result_SignedRawInvoiceParseErrorZ } from '../structs/Result_SignedRawInvoiceParseErrorZ.mjs';
import { RawInvoice } from '../structs/RawInvoice.mjs';
import { InvoiceSignature } from '../structs/InvoiceSignature.mjs';
import { ThreeTuple_RawInvoice_u832InvoiceSignatureZ } from '../structs/ThreeTuple_RawInvoice_u832InvoiceSignatureZ.mjs';
import { PayeePubKey } from '../structs/PayeePubKey.mjs';
import { Result_PayeePubKeyErrorZ } from '../structs/Result_PayeePubKeyErrorZ.mjs';
import { PrivateRoute } from '../structs/PrivateRoute.mjs';
import { PositiveTimestamp } from '../structs/PositiveTimestamp.mjs';
import { Result_PositiveTimestampCreationErrorZ } from '../structs/Result_PositiveTimestampCreationErrorZ.mjs';
import { Result_NoneSemanticErrorZ } from '../structs/Result_NoneSemanticErrorZ.mjs';
import { Result_InvoiceSemanticErrorZ } from '../structs/Result_InvoiceSemanticErrorZ.mjs';
import { Description } from '../structs/Description.mjs';
import { Result_DescriptionCreationErrorZ } from '../structs/Result_DescriptionCreationErrorZ.mjs';
import { Result_PrivateRouteCreationErrorZ } from '../structs/Result_PrivateRouteCreationErrorZ.mjs';
import { Result_StringErrorZ } from '../structs/Result_StringErrorZ.mjs';
import { Result_ChannelMonitorUpdateDecodeErrorZ } from '../structs/Result_ChannelMonitorUpdateDecodeErrorZ.mjs';
import { Option_MonitorEventZ } from '../structs/Option_MonitorEventZ.mjs';
import { Result_COption_MonitorEventZDecodeErrorZ } from '../structs/Result_COption_MonitorEventZDecodeErrorZ.mjs';
import { Result_HTLCUpdateDecodeErrorZ } from '../structs/Result_HTLCUpdateDecodeErrorZ.mjs';
import { TwoTuple_OutPointScriptZ } from '../structs/TwoTuple_OutPointScriptZ.mjs';
import { TwoTuple_u32ScriptZ } from '../structs/TwoTuple_u32ScriptZ.mjs';
import { TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ } from '../structs/TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ.mjs';
import { TwoTuple_u32TxOutZ } from '../structs/TwoTuple_u32TxOutZ.mjs';
import { TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ } from '../structs/TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ.mjs';
import { Balance } from '../structs/Balance.mjs';
import { TwoTuple_BlockHashChannelMonitorZ } from '../structs/TwoTuple_BlockHashChannelMonitorZ.mjs';
import { Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ } from '../structs/Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.mjs';
import { TwoTuple_PublicKeyTypeZ } from '../structs/TwoTuple_PublicKeyTypeZ.mjs';
import { CustomOnionMessageContents, CustomOnionMessageContentsInterface } from '../structs/CustomOnionMessageContents.mjs';
import { Option_CustomOnionMessageContentsZ } from '../structs/Option_CustomOnionMessageContentsZ.mjs';
import { Result_COption_CustomOnionMessageContentsZDecodeErrorZ } from '../structs/Result_COption_CustomOnionMessageContentsZDecodeErrorZ.mjs';
import { Option_NetAddressZ } from '../structs/Option_NetAddressZ.mjs';
import { PeerHandleError } from '../structs/PeerHandleError.mjs';
import { Result_CVec_u8ZPeerHandleErrorZ } from '../structs/Result_CVec_u8ZPeerHandleErrorZ.mjs';
import { Result_NonePeerHandleErrorZ } from '../structs/Result_NonePeerHandleErrorZ.mjs';
import { Result_boolPeerHandleErrorZ } from '../structs/Result_boolPeerHandleErrorZ.mjs';
import { SendError } from '../structs/SendError.mjs';
import { Result_NoneSendErrorZ } from '../structs/Result_NoneSendErrorZ.mjs';
import { GraphSyncError } from '../structs/GraphSyncError.mjs';
import { Result_u32GraphSyncErrorZ } from '../structs/Result_u32GraphSyncErrorZ.mjs';
import { Result_NoneErrorZ } from '../structs/Result_NoneErrorZ.mjs';
import { Result_NetAddressDecodeErrorZ } from '../structs/Result_NetAddressDecodeErrorZ.mjs';
import { UpdateAddHTLC } from '../structs/UpdateAddHTLC.mjs';
import { UpdateFulfillHTLC } from '../structs/UpdateFulfillHTLC.mjs';
import { UpdateFailHTLC } from '../structs/UpdateFailHTLC.mjs';
import { UpdateFailMalformedHTLC } from '../structs/UpdateFailMalformedHTLC.mjs';
import { Result_AcceptChannelDecodeErrorZ } from '../structs/Result_AcceptChannelDecodeErrorZ.mjs';
import { Result_AnnouncementSignaturesDecodeErrorZ } from '../structs/Result_AnnouncementSignaturesDecodeErrorZ.mjs';
import { Result_ChannelReestablishDecodeErrorZ } from '../structs/Result_ChannelReestablishDecodeErrorZ.mjs';
import { Result_ClosingSignedDecodeErrorZ } from '../structs/Result_ClosingSignedDecodeErrorZ.mjs';
import { ClosingSignedFeeRange } from '../structs/ClosingSignedFeeRange.mjs';
import { Result_ClosingSignedFeeRangeDecodeErrorZ } from '../structs/Result_ClosingSignedFeeRangeDecodeErrorZ.mjs';
import { CommitmentSigned } from '../structs/CommitmentSigned.mjs';
import { Result_CommitmentSignedDecodeErrorZ } from '../structs/Result_CommitmentSignedDecodeErrorZ.mjs';
import { Result_FundingCreatedDecodeErrorZ } from '../structs/Result_FundingCreatedDecodeErrorZ.mjs';
import { Result_FundingSignedDecodeErrorZ } from '../structs/Result_FundingSignedDecodeErrorZ.mjs';
import { Result_ChannelReadyDecodeErrorZ } from '../structs/Result_ChannelReadyDecodeErrorZ.mjs';
import { Init } from '../structs/Init.mjs';
import { Result_InitDecodeErrorZ } from '../structs/Result_InitDecodeErrorZ.mjs';
import { Result_OpenChannelDecodeErrorZ } from '../structs/Result_OpenChannelDecodeErrorZ.mjs';
import { Result_RevokeAndACKDecodeErrorZ } from '../structs/Result_RevokeAndACKDecodeErrorZ.mjs';
import { Result_ShutdownDecodeErrorZ } from '../structs/Result_ShutdownDecodeErrorZ.mjs';
import { Result_UpdateFailHTLCDecodeErrorZ } from '../structs/Result_UpdateFailHTLCDecodeErrorZ.mjs';
import { Result_UpdateFailMalformedHTLCDecodeErrorZ } from '../structs/Result_UpdateFailMalformedHTLCDecodeErrorZ.mjs';
import { UpdateFee } from '../structs/UpdateFee.mjs';
import { Result_UpdateFeeDecodeErrorZ } from '../structs/Result_UpdateFeeDecodeErrorZ.mjs';
import { Result_UpdateFulfillHTLCDecodeErrorZ } from '../structs/Result_UpdateFulfillHTLCDecodeErrorZ.mjs';
import { Result_UpdateAddHTLCDecodeErrorZ } from '../structs/Result_UpdateAddHTLCDecodeErrorZ.mjs';
import { OnionMessage } from '../structs/OnionMessage.mjs';
import { Result_OnionMessageDecodeErrorZ } from '../structs/Result_OnionMessageDecodeErrorZ.mjs';
import { Ping } from '../structs/Ping.mjs';
import { Result_PingDecodeErrorZ } from '../structs/Result_PingDecodeErrorZ.mjs';
import { Pong } from '../structs/Pong.mjs';
import { Result_PongDecodeErrorZ } from '../structs/Result_PongDecodeErrorZ.mjs';
import { Result_UnsignedChannelAnnouncementDecodeErrorZ } from '../structs/Result_UnsignedChannelAnnouncementDecodeErrorZ.mjs';
import { Result_ChannelAnnouncementDecodeErrorZ } from '../structs/Result_ChannelAnnouncementDecodeErrorZ.mjs';
import { UnsignedChannelUpdate } from '../structs/UnsignedChannelUpdate.mjs';
import { Result_UnsignedChannelUpdateDecodeErrorZ } from '../structs/Result_UnsignedChannelUpdateDecodeErrorZ.mjs';
import { Result_ChannelUpdateDecodeErrorZ } from '../structs/Result_ChannelUpdateDecodeErrorZ.mjs';
import { Result_ErrorMessageDecodeErrorZ } from '../structs/Result_ErrorMessageDecodeErrorZ.mjs';
import { Result_WarningMessageDecodeErrorZ } from '../structs/Result_WarningMessageDecodeErrorZ.mjs';
import { UnsignedNodeAnnouncement } from '../structs/UnsignedNodeAnnouncement.mjs';
import { Result_UnsignedNodeAnnouncementDecodeErrorZ } from '../structs/Result_UnsignedNodeAnnouncementDecodeErrorZ.mjs';
import { NodeAnnouncement } from '../structs/NodeAnnouncement.mjs';
import { Result_NodeAnnouncementDecodeErrorZ } from '../structs/Result_NodeAnnouncementDecodeErrorZ.mjs';
import { Result_QueryShortChannelIdsDecodeErrorZ } from '../structs/Result_QueryShortChannelIdsDecodeErrorZ.mjs';
import { ReplyShortChannelIdsEnd } from '../structs/ReplyShortChannelIdsEnd.mjs';
import { Result_ReplyShortChannelIdsEndDecodeErrorZ } from '../structs/Result_ReplyShortChannelIdsEndDecodeErrorZ.mjs';
import { Result_QueryChannelRangeDecodeErrorZ } from '../structs/Result_QueryChannelRangeDecodeErrorZ.mjs';
import { Result_ReplyChannelRangeDecodeErrorZ } from '../structs/Result_ReplyChannelRangeDecodeErrorZ.mjs';
import { Result_GossipTimestampFilterDecodeErrorZ } from '../structs/Result_GossipTimestampFilterDecodeErrorZ.mjs';
import { SignOrCreationError } from '../structs/SignOrCreationError.mjs';
import { Result_InvoiceSignOrCreationErrorZ } from '../structs/Result_InvoiceSignOrCreationErrorZ.mjs';
import { WatchedOutput } from '../structs/WatchedOutput.mjs';
import { Filter, FilterInterface } from '../structs/Filter.mjs';
import { Option_FilterZ } from '../structs/Option_FilterZ.mjs';
import { LockedChannelMonitor } from '../structs/LockedChannelMonitor.mjs';
import { Result_LockedChannelMonitorNoneZ } from '../structs/Result_LockedChannelMonitorNoneZ.mjs';
import { MessageSendEventsProvider, MessageSendEventsProviderInterface } from '../structs/MessageSendEventsProvider.mjs';
import { OnionMessageProvider, OnionMessageProviderInterface } from '../structs/OnionMessageProvider.mjs';
import { EventHandler, EventHandlerInterface } from '../structs/EventHandler.mjs';
import { EventsProvider, EventsProviderInterface } from '../structs/EventsProvider.mjs';
import { BigSize } from '../structs/BigSize.mjs';
import { ChannelUsage } from '../structs/ChannelUsage.mjs';
import { Score, ScoreInterface } from '../structs/Score.mjs';
import { LockableScore, LockableScoreInterface } from '../structs/LockableScore.mjs';
import { WriteableScore, WriteableScoreInterface } from '../structs/WriteableScore.mjs';
import { Persister, PersisterInterface } from '../structs/Persister.mjs';
import { FutureCallback, FutureCallbackInterface } from '../structs/FutureCallback.mjs';
import { Future } from '../structs/Future.mjs';
import { ChannelHandshakeConfig } from '../structs/ChannelHandshakeConfig.mjs';
import { ChannelHandshakeLimits } from '../structs/ChannelHandshakeLimits.mjs';
import { UserConfig } from '../structs/UserConfig.mjs';
import { BestBlock } from '../structs/BestBlock.mjs';
import { Listen, ListenInterface } from '../structs/Listen.mjs';
import { Confirm, ConfirmInterface } from '../structs/Confirm.mjs';
import { MonitorUpdateId } from '../structs/MonitorUpdateId.mjs';
import { Persist, PersistInterface } from '../structs/Persist.mjs';
import { ChainMonitor } from '../structs/ChainMonitor.mjs';
import { KeysManager } from '../structs/KeysManager.mjs';
import { PhantomKeysManager } from '../structs/PhantomKeysManager.mjs';
import { ChainParameters } from '../structs/ChainParameters.mjs';
import { ChannelMessageHandler, ChannelMessageHandlerInterface } from '../structs/ChannelMessageHandler.mjs';
import { ChannelManagerReadArgs } from '../structs/ChannelManagerReadArgs.mjs';
import { ExpandedKey } from '../structs/ExpandedKey.mjs';
import { DataLossProtect } from '../structs/DataLossProtect.mjs';
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
import { DirectedChannelTransactionParameters } from '../structs/DirectedChannelTransactionParameters.mjs';
import { ReadOnlyNetworkGraph } from '../structs/ReadOnlyNetworkGraph.mjs';
import { P2PGossipSync } from '../structs/P2PGossipSync.mjs';
import { DirectedChannelInfo } from '../structs/DirectedChannelInfo.mjs';
import { EffectiveCapacity } from '../structs/EffectiveCapacity.mjs';
import { MultiThreadedLockableScore } from '../structs/MultiThreadedLockableScore.mjs';
import { MultiThreadedScoreLock } from '../structs/MultiThreadedScoreLock.mjs';
import { ProbabilisticScoringParameters } from '../structs/ProbabilisticScoringParameters.mjs';
import { OnionMessenger } from '../structs/OnionMessenger.mjs';
import { Destination } from '../structs/Destination.mjs';
import { RapidGossipSync } from '../structs/RapidGossipSync.mjs';
import { RawDataPart } from '../structs/RawDataPart.mjs';
import { Sha256 } from '../structs/Sha256.mjs';
import { ExpiryTime } from '../structs/ExpiryTime.mjs';
import { MinFinalCltvExpiry } from '../structs/MinFinalCltvExpiry.mjs';
import { Fallback } from '../structs/Fallback.mjs';
import { Payer, PayerInterface } from '../structs/Payer.mjs';
import { Router, RouterInterface } from '../structs/Router.mjs';
import { InvoicePayer } from '../structs/InvoicePayer.mjs';
import { Retry } from '../structs/Retry.mjs';
import { DefaultRouter } from '../structs/DefaultRouter.mjs';

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An event generated by ChannelManager which indicates a message should be sent to a peer (or
 * broadcast to most peers).
 * These events are handled by PeerManager::process_events if you are using a PeerManager.
 */
export class MessageSendEvent extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.MessageSendEvent_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): MessageSendEvent {
		const raw_ty: number = bindings.LDKMessageSendEvent_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new MessageSendEvent_SendAcceptChannel(ptr);
			case 1: return new MessageSendEvent_SendOpenChannel(ptr);
			case 2: return new MessageSendEvent_SendFundingCreated(ptr);
			case 3: return new MessageSendEvent_SendFundingSigned(ptr);
			case 4: return new MessageSendEvent_SendChannelReady(ptr);
			case 5: return new MessageSendEvent_SendAnnouncementSignatures(ptr);
			case 6: return new MessageSendEvent_UpdateHTLCs(ptr);
			case 7: return new MessageSendEvent_SendRevokeAndACK(ptr);
			case 8: return new MessageSendEvent_SendClosingSigned(ptr);
			case 9: return new MessageSendEvent_SendShutdown(ptr);
			case 10: return new MessageSendEvent_SendChannelReestablish(ptr);
			case 11: return new MessageSendEvent_SendChannelAnnouncement(ptr);
			case 12: return new MessageSendEvent_BroadcastChannelAnnouncement(ptr);
			case 13: return new MessageSendEvent_BroadcastChannelUpdate(ptr);
			case 14: return new MessageSendEvent_SendChannelUpdate(ptr);
			case 15: return new MessageSendEvent_HandleError(ptr);
			case 16: return new MessageSendEvent_SendChannelRangeQuery(ptr);
			case 17: return new MessageSendEvent_SendShortIdsQuery(ptr);
			case 18: return new MessageSendEvent_SendReplyChannelRange(ptr);
			case 19: return new MessageSendEvent_SendGossipTimestampFilter(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.MessageSendEvent_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the MessageSendEvent
	 */
	public clone(): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_clone(this.ptr);
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendAcceptChannel-variant MessageSendEvent
	 */
	public static constructor_send_accept_channel(node_id: Uint8Array, msg: AcceptChannel): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_accept_channel(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendOpenChannel-variant MessageSendEvent
	 */
	public static constructor_send_open_channel(node_id: Uint8Array, msg: OpenChannel): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_open_channel(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendFundingCreated-variant MessageSendEvent
	 */
	public static constructor_send_funding_created(node_id: Uint8Array, msg: FundingCreated): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_funding_created(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendFundingSigned-variant MessageSendEvent
	 */
	public static constructor_send_funding_signed(node_id: Uint8Array, msg: FundingSigned): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_funding_signed(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendChannelReady-variant MessageSendEvent
	 */
	public static constructor_send_channel_ready(node_id: Uint8Array, msg: ChannelReady): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_channel_ready(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendAnnouncementSignatures-variant MessageSendEvent
	 */
	public static constructor_send_announcement_signatures(node_id: Uint8Array, msg: AnnouncementSignatures): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_announcement_signatures(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UpdateHTLCs-variant MessageSendEvent
	 */
	public static constructor_update_htlcs(node_id: Uint8Array, updates: CommitmentUpdate): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_update_htlcs(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), updates == null ? 0n : CommonBase.get_ptr_of(updates));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, updates);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendRevokeAndACK-variant MessageSendEvent
	 */
	public static constructor_send_revoke_and_ack(node_id: Uint8Array, msg: RevokeAndACK): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_revoke_and_ack(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendClosingSigned-variant MessageSendEvent
	 */
	public static constructor_send_closing_signed(node_id: Uint8Array, msg: ClosingSigned): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_closing_signed(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendShutdown-variant MessageSendEvent
	 */
	public static constructor_send_shutdown(node_id: Uint8Array, msg: Shutdown): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_shutdown(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendChannelReestablish-variant MessageSendEvent
	 */
	public static constructor_send_channel_reestablish(node_id: Uint8Array, msg: ChannelReestablish): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_channel_reestablish(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendChannelAnnouncement-variant MessageSendEvent
	 */
	public static constructor_send_channel_announcement(node_id: Uint8Array, msg: ChannelAnnouncement, update_msg: ChannelUpdate): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_channel_announcement(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg), update_msg == null ? 0n : CommonBase.get_ptr_of(update_msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		CommonBase.add_ref_from(ret_hu_conv, update_msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BroadcastChannelAnnouncement-variant MessageSendEvent
	 */
	public static constructor_broadcast_channel_announcement(msg: ChannelAnnouncement, update_msg: ChannelUpdate): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_broadcast_channel_announcement(msg == null ? 0n : CommonBase.get_ptr_of(msg), update_msg == null ? 0n : CommonBase.get_ptr_of(update_msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		CommonBase.add_ref_from(ret_hu_conv, update_msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BroadcastChannelUpdate-variant MessageSendEvent
	 */
	public static constructor_broadcast_channel_update(msg: ChannelUpdate): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_broadcast_channel_update(msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendChannelUpdate-variant MessageSendEvent
	 */
	public static constructor_send_channel_update(node_id: Uint8Array, msg: ChannelUpdate): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_channel_update(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HandleError-variant MessageSendEvent
	 */
	public static constructor_handle_error(node_id: Uint8Array, action: ErrorAction): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_handle_error(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), CommonBase.get_ptr_of(action));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendChannelRangeQuery-variant MessageSendEvent
	 */
	public static constructor_send_channel_range_query(node_id: Uint8Array, msg: QueryChannelRange): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_channel_range_query(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendShortIdsQuery-variant MessageSendEvent
	 */
	public static constructor_send_short_ids_query(node_id: Uint8Array, msg: QueryShortChannelIds): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_short_ids_query(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendReplyChannelRange-variant MessageSendEvent
	 */
	public static constructor_send_reply_channel_range(node_id: Uint8Array, msg: ReplyChannelRange): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_reply_channel_range(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendGossipTimestampFilter-variant MessageSendEvent
	 */
	public static constructor_send_gossip_timestamp_filter(node_id: Uint8Array, msg: GossipTimestampFilter): MessageSendEvent {
		const ret: bigint = bindings.MessageSendEvent_send_gossip_timestamp_filter(bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)), msg == null ? 0n : CommonBase.get_ptr_of(msg));
		const ret_hu_conv: MessageSendEvent = MessageSendEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, msg);
		return ret_hu_conv;
	}

}
/** A MessageSendEvent of type SendAcceptChannel */
export class MessageSendEvent_SendAcceptChannel extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The message which should be sent.
	 */
	public msg: AcceptChannel;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendAcceptChannel_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendAcceptChannel_get_msg(ptr);
		const msg_hu_conv: AcceptChannel = new AcceptChannel(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendOpenChannel */
export class MessageSendEvent_SendOpenChannel extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The message which should be sent.
	 */
	public msg: OpenChannel;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendOpenChannel_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendOpenChannel_get_msg(ptr);
		const msg_hu_conv: OpenChannel = new OpenChannel(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendFundingCreated */
export class MessageSendEvent_SendFundingCreated extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The message which should be sent.
	 */
	public msg: FundingCreated;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendFundingCreated_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendFundingCreated_get_msg(ptr);
		const msg_hu_conv: FundingCreated = new FundingCreated(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendFundingSigned */
export class MessageSendEvent_SendFundingSigned extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The message which should be sent.
	 */
	public msg: FundingSigned;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendFundingSigned_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendFundingSigned_get_msg(ptr);
		const msg_hu_conv: FundingSigned = new FundingSigned(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendChannelReady */
export class MessageSendEvent_SendChannelReady extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive these message(s)
	 */
	public node_id: Uint8Array;
	/**
	 * The channel_ready message which should be sent.
	 */
	public msg: ChannelReady;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendChannelReady_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendChannelReady_get_msg(ptr);
		const msg_hu_conv: ChannelReady = new ChannelReady(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendAnnouncementSignatures */
export class MessageSendEvent_SendAnnouncementSignatures extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive these message(s)
	 */
	public node_id: Uint8Array;
	/**
	 * The announcement_signatures message which should be sent.
	 */
	public msg: AnnouncementSignatures;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendAnnouncementSignatures_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendAnnouncementSignatures_get_msg(ptr);
		const msg_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type UpdateHTLCs */
export class MessageSendEvent_UpdateHTLCs extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive these message(s)
	 */
	public node_id: Uint8Array;
	/**
	 * The update messages which should be sent. ALL messages in the struct should be sent!
	 */
	public updates: CommitmentUpdate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_UpdateHTLCs_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const updates: bigint = bindings.LDKMessageSendEvent_UpdateHTLCs_get_updates(ptr);
		const updates_hu_conv: CommitmentUpdate = new CommitmentUpdate(null, updates);
			CommonBase.add_ref_from(updates_hu_conv, this);
		this.updates = updates_hu_conv;
	}
}
/** A MessageSendEvent of type SendRevokeAndACK */
export class MessageSendEvent_SendRevokeAndACK extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The message which should be sent.
	 */
	public msg: RevokeAndACK;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendRevokeAndACK_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendRevokeAndACK_get_msg(ptr);
		const msg_hu_conv: RevokeAndACK = new RevokeAndACK(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendClosingSigned */
export class MessageSendEvent_SendClosingSigned extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The message which should be sent.
	 */
	public msg: ClosingSigned;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendClosingSigned_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendClosingSigned_get_msg(ptr);
		const msg_hu_conv: ClosingSigned = new ClosingSigned(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendShutdown */
export class MessageSendEvent_SendShutdown extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The message which should be sent.
	 */
	public msg: Shutdown;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendShutdown_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendShutdown_get_msg(ptr);
		const msg_hu_conv: Shutdown = new Shutdown(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendChannelReestablish */
export class MessageSendEvent_SendChannelReestablish extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The message which should be sent.
	 */
	public msg: ChannelReestablish;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendChannelReestablish_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendChannelReestablish_get_msg(ptr);
		const msg_hu_conv: ChannelReestablish = new ChannelReestablish(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendChannelAnnouncement */
export class MessageSendEvent_SendChannelAnnouncement extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The channel_announcement which should be sent.
	 */
	public msg: ChannelAnnouncement;
	/**
	 * The followup channel_update which should be sent.
	 */
	public update_msg: ChannelUpdate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendChannelAnnouncement_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendChannelAnnouncement_get_msg(ptr);
		const msg_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
		const update_msg: bigint = bindings.LDKMessageSendEvent_SendChannelAnnouncement_get_update_msg(ptr);
		const update_msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, update_msg);
			CommonBase.add_ref_from(update_msg_hu_conv, this);
		this.update_msg = update_msg_hu_conv;
	}
}
/** A MessageSendEvent of type BroadcastChannelAnnouncement */
export class MessageSendEvent_BroadcastChannelAnnouncement extends MessageSendEvent {
	/**
	 * The channel_announcement which should be sent.
	 */
	public msg: ChannelAnnouncement;
	/**
	 * The followup channel_update which should be sent.
	 */
	public update_msg: ChannelUpdate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const msg: bigint = bindings.LDKMessageSendEvent_BroadcastChannelAnnouncement_get_msg(ptr);
		const msg_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
		const update_msg: bigint = bindings.LDKMessageSendEvent_BroadcastChannelAnnouncement_get_update_msg(ptr);
		const update_msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, update_msg);
			CommonBase.add_ref_from(update_msg_hu_conv, this);
		this.update_msg = update_msg_hu_conv;
	}
}
/** A MessageSendEvent of type BroadcastChannelUpdate */
export class MessageSendEvent_BroadcastChannelUpdate extends MessageSendEvent {
	/**
	 * The channel_update which should be sent.
	 */
	public msg: ChannelUpdate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const msg: bigint = bindings.LDKMessageSendEvent_BroadcastChannelUpdate_get_msg(ptr);
		const msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendChannelUpdate */
export class MessageSendEvent_SendChannelUpdate extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The channel_update which should be sent.
	 */
	public msg: ChannelUpdate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendChannelUpdate_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendChannelUpdate_get_msg(ptr);
		const msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type HandleError */
export class MessageSendEvent_HandleError extends MessageSendEvent {
	/**
	 * The node_id of the node which should receive this message
	 */
	public node_id: Uint8Array;
	/**
	 * The action which should be taken.
	 */
	public action: ErrorAction;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_HandleError_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const action: bigint = bindings.LDKMessageSendEvent_HandleError_get_action(ptr);
		const action_hu_conv: ErrorAction = ErrorAction.constr_from_ptr(action);
			CommonBase.add_ref_from(action_hu_conv, this);
		this.action = action_hu_conv;
	}
}
/** A MessageSendEvent of type SendChannelRangeQuery */
export class MessageSendEvent_SendChannelRangeQuery extends MessageSendEvent {
	/**
	 * The node_id of this message recipient
	 */
	public node_id: Uint8Array;
	/**
	 * The query_channel_range which should be sent.
	 */
	public msg: QueryChannelRange;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendChannelRangeQuery_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendChannelRangeQuery_get_msg(ptr);
		const msg_hu_conv: QueryChannelRange = new QueryChannelRange(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendShortIdsQuery */
export class MessageSendEvent_SendShortIdsQuery extends MessageSendEvent {
	/**
	 * The node_id of this message recipient
	 */
	public node_id: Uint8Array;
	/**
	 * The query_short_channel_ids which should be sent.
	 */
	public msg: QueryShortChannelIds;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendShortIdsQuery_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendShortIdsQuery_get_msg(ptr);
		const msg_hu_conv: QueryShortChannelIds = new QueryShortChannelIds(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendReplyChannelRange */
export class MessageSendEvent_SendReplyChannelRange extends MessageSendEvent {
	/**
	 * The node_id of this message recipient
	 */
	public node_id: Uint8Array;
	/**
	 * The reply_channel_range which should be sent.
	 */
	public msg: ReplyChannelRange;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendReplyChannelRange_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendReplyChannelRange_get_msg(ptr);
		const msg_hu_conv: ReplyChannelRange = new ReplyChannelRange(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A MessageSendEvent of type SendGossipTimestampFilter */
export class MessageSendEvent_SendGossipTimestampFilter extends MessageSendEvent {
	/**
	 * The node_id of this message recipient
	 */
	public node_id: Uint8Array;
	/**
	 * The gossip_timestamp_filter which should be sent.
	 */
	public msg: GossipTimestampFilter;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKMessageSendEvent_SendGossipTimestampFilter_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const msg: bigint = bindings.LDKMessageSendEvent_SendGossipTimestampFilter_get_msg(ptr);
		const msg_hu_conv: GossipTimestampFilter = new GossipTimestampFilter(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
