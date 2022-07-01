import { TxOut } from '../structs/TxOut.mjs';
import { AccessError } from '../enums/AccessError.mjs';
import { COption_NoneZ } from '../enums/COption_NoneZ.mjs';
import { ChannelMonitorUpdateErr } from '../enums/ChannelMonitorUpdateErr.mjs';
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
import { Result_NoneNoneZ } from '../structs/Result_NoneNoneZ.mjs';
import { CounterpartyCommitmentSecrets } from '../structs/CounterpartyCommitmentSecrets.mjs';
import { DecodeError } from '../structs/DecodeError.mjs';
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
import { NodeAnnouncement } from '../structs/NodeAnnouncement.mjs';
import { ErrorMessage } from '../structs/ErrorMessage.mjs';
import { WarningMessage } from '../structs/WarningMessage.mjs';
import { ErrorAction } from '../structs/ErrorAction.mjs';
import { QueryChannelRange } from '../structs/QueryChannelRange.mjs';
import { QueryShortChannelIds } from '../structs/QueryShortChannelIds.mjs';
import { ReplyChannelRange } from '../structs/ReplyChannelRange.mjs';
import { GossipTimestampFilter } from '../structs/GossipTimestampFilter.mjs';
import { MessageSendEvent } from '../structs/MessageSendEvent.mjs';
import { Result_TxOutAccessErrorZ } from '../structs/Result_TxOutAccessErrorZ.mjs';
import { TwoTuple_usizeTransactionZ } from '../structs/TwoTuple_usizeTransactionZ.mjs';
import { Result_NoneChannelMonitorUpdateErrZ } from '../structs/Result_NoneChannelMonitorUpdateErrZ.mjs';
import { HTLCUpdate } from '../structs/HTLCUpdate.mjs';
import { MonitorEvent } from '../structs/MonitorEvent.mjs';
import { TwoTuple_OutPointCVec_MonitorEventZZ } from '../structs/TwoTuple_OutPointCVec_MonitorEventZZ.mjs';
import { Option_C2Tuple_usizeTransactionZZ } from '../structs/Option_C2Tuple_usizeTransactionZZ.mjs';
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
import { Result_NoneLightningErrorZ } from '../structs/Result_NoneLightningErrorZ.mjs';
import { ChannelUpdateInfo } from '../structs/ChannelUpdateInfo.mjs';
import { Result_ChannelUpdateInfoDecodeErrorZ } from '../structs/Result_ChannelUpdateInfoDecodeErrorZ.mjs';
import { ChannelInfo } from '../structs/ChannelInfo.mjs';
import { Result_ChannelInfoDecodeErrorZ } from '../structs/Result_ChannelInfoDecodeErrorZ.mjs';
import { RoutingFees } from '../structs/RoutingFees.mjs';
import { Result_RoutingFeesDecodeErrorZ } from '../structs/Result_RoutingFeesDecodeErrorZ.mjs';
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
import { Option_NetAddressZ } from '../structs/Option_NetAddressZ.mjs';
import { PeerHandleError } from '../structs/PeerHandleError.mjs';
import { Result_CVec_u8ZPeerHandleErrorZ } from '../structs/Result_CVec_u8ZPeerHandleErrorZ.mjs';
import { Result_NonePeerHandleErrorZ } from '../structs/Result_NonePeerHandleErrorZ.mjs';
import { Result_boolPeerHandleErrorZ } from '../structs/Result_boolPeerHandleErrorZ.mjs';
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
import { EventHandler, EventHandlerInterface } from '../structs/EventHandler.mjs';
import { EventsProvider, EventsProviderInterface } from '../structs/EventsProvider.mjs';
import { BigSize } from '../structs/BigSize.mjs';
import { ChannelUsage } from '../structs/ChannelUsage.mjs';
import { Score, ScoreInterface } from '../structs/Score.mjs';
import { MultiThreadedLockableScore } from '../structs/MultiThreadedLockableScore.mjs';
import { Persister, PersisterInterface } from '../structs/Persister.mjs';
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
import { CustomMessageReader, CustomMessageReaderInterface } from '../structs/CustomMessageReader.mjs';
import { CustomMessageHandler, CustomMessageHandlerInterface } from '../structs/CustomMessageHandler.mjs';
import { IgnoringMessageHandler } from '../structs/IgnoringMessageHandler.mjs';
import { ErroringMessageHandler } from '../structs/ErroringMessageHandler.mjs';
import { MessageHandler } from '../structs/MessageHandler.mjs';
import { SocketDescriptor, SocketDescriptorInterface } from '../structs/SocketDescriptor.mjs';
import { PeerManager } from '../structs/PeerManager.mjs';
import { DirectedChannelTransactionParameters } from '../structs/DirectedChannelTransactionParameters.mjs';
import { ReadOnlyNetworkGraph } from '../structs/ReadOnlyNetworkGraph.mjs';
import { P2PGossipSync } from '../structs/P2PGossipSync.mjs';
import { DirectedChannelInfo } from '../structs/DirectedChannelInfo.mjs';
import { EffectiveCapacity } from '../structs/EffectiveCapacity.mjs';
import { LockableScore, LockableScoreInterface } from '../structs/LockableScore.mjs';
import { ProbabilisticScoringParameters } from '../structs/ProbabilisticScoringParameters.mjs';
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



/** An implementation of RoutingMessageHandler */
export interface RoutingMessageHandlerInterface {
	/**Handle an incoming node_announcement message, returning true if it should be forwarded on,
	 * false or returning an Err otherwise.
	 */
	handle_node_announcement(msg: NodeAnnouncement): Result_boolLightningErrorZ;
	/**Handle a channel_announcement message, returning true if it should be forwarded on, false
	 * or returning an Err otherwise.
	 */
	handle_channel_announcement(msg: ChannelAnnouncement): Result_boolLightningErrorZ;
	/**Handle an incoming channel_update message, returning true if it should be forwarded on,
	 * false or returning an Err otherwise.
	 */
	handle_channel_update(msg: ChannelUpdate): Result_boolLightningErrorZ;
	/**Gets a subset of the channel announcements and updates required to dump our routing table
	 * to a remote node, starting at the short_channel_id indicated by starting_point and
	 * including the batch_amount entries immediately higher in numerical value than starting_point.
	 */
	get_next_channel_announcements(starting_point: bigint, batch_amount: number): ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[];
	/**Gets a subset of the node announcements required to dump our routing table to a remote node,
	 * starting at the node *after* the provided publickey and including batch_amount entries
	 * immediately higher (as defined by <PublicKey as Ord>::cmp) than starting_point.
	 * If None is provided for starting_point, we start at the first node.
	 * 
	 * Note that starting_point (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	get_next_node_announcements(starting_point: Uint8Array, batch_amount: number): NodeAnnouncement[];
	/**Called when a connection is established with a peer. This can be used to
	 * perform routing table synchronization using a strategy defined by the
	 * implementor.
	 */
	peer_connected(their_node_id: Uint8Array, init: Init): void;
	/**Handles the reply of a query we initiated to learn about channels
	 * for a given range of blocks. We can expect to receive one or more
	 * replies to a single query.
	 */
	handle_reply_channel_range(their_node_id: Uint8Array, msg: ReplyChannelRange): Result_NoneLightningErrorZ;
	/**Handles the reply of a query we initiated asking for routing gossip
	 * messages for a list of channels. We should receive this message when
	 * a node has completed its best effort to send us the pertaining routing
	 * gossip messages.
	 */
	handle_reply_short_channel_ids_end(their_node_id: Uint8Array, msg: ReplyShortChannelIdsEnd): Result_NoneLightningErrorZ;
	/**Handles when a peer asks us to send a list of short_channel_ids
	 * for the requested range of blocks.
	 */
	handle_query_channel_range(their_node_id: Uint8Array, msg: QueryChannelRange): Result_NoneLightningErrorZ;
	/**Handles when a peer asks us to send routing gossip messages for a
	 * list of short_channel_ids.
	 */
	handle_query_short_channel_ids(their_node_id: Uint8Array, msg: QueryShortChannelIds): Result_NoneLightningErrorZ;
}

class LDKRoutingMessageHandlerHolder {
	held: RoutingMessageHandler;
}

/**
 * A trait to describe an object which can receive routing messages.
 * 
 * # Implementor DoS Warnings
 * 
 * For `gossip_queries` messages there are potential DoS vectors when handling
 * inbound queries. Implementors using an on-disk network graph should be aware of
 * repeated disk I/O for queries accessing different parts of the network graph.
 */
export class RoutingMessageHandler extends CommonBase {
	/* @internal */
	public bindings_instance?: bindings.LDKRoutingMessageHandler;

	/* @internal */
	constructor(_dummy: object, ptr: number) {
		super(ptr, bindings.RoutingMessageHandler_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of RoutingMessageHandler from a given implementation */
	public static new_impl(arg: RoutingMessageHandlerInterface, messageSendEventsProvider_impl: MessageSendEventsProviderInterface): RoutingMessageHandler {
		const impl_holder: LDKRoutingMessageHandlerHolder = new LDKRoutingMessageHandlerHolder();
		let structImplementation = {
			handle_node_announcement (msg: number): number {
				const msg_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, msg);
				const ret: Result_boolLightningErrorZ = arg.handle_node_announcement(msg_hu_conv);
				const result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
			},
			handle_channel_announcement (msg: number): number {
				const msg_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, msg);
				const ret: Result_boolLightningErrorZ = arg.handle_channel_announcement(msg_hu_conv);
				const result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
			},
			handle_channel_update (msg: number): number {
				const msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, msg);
				const ret: Result_boolLightningErrorZ = arg.handle_channel_update(msg_hu_conv);
				const result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
			},
			get_next_channel_announcements (starting_point: bigint, batch_amount: number): number {
				const ret: ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[] = arg.get_next_channel_announcements(starting_point, batch_amount);
				const result: number = bindings.encodeUint32Array(ret != null ? ret.map(ret_conv_59 => ret_conv_59 == null ? 0 : ret_conv_59.clone_ptr()) : null);
				return result;
			},
			get_next_node_announcements (starting_point: number, batch_amount: number): number {
				const starting_point_conv: Uint8Array = bindings.decodeUint8Array(starting_point);
				const ret: NodeAnnouncement[] = arg.get_next_node_announcements(starting_point_conv, batch_amount);
				const result: number = bindings.encodeUint32Array(ret != null ? ret.map(ret_conv_18 => ret_conv_18 == null ? 0 : ret_conv_18.clone_ptr()) : null);
				return result;
			},
			peer_connected (their_node_id: number, init: number): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const init_hu_conv: Init = new Init(null, init);
				arg.peer_connected(their_node_id_conv, init_hu_conv);
			},
			handle_reply_channel_range (their_node_id: number, msg: number): number {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: ReplyChannelRange = new ReplyChannelRange(null, msg);
				CommonBase.add_ref_from(msg_hu_conv, this);
				const ret: Result_NoneLightningErrorZ = arg.handle_reply_channel_range(their_node_id_conv, msg_hu_conv);
				const result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
			},
			handle_reply_short_channel_ids_end (their_node_id: number, msg: number): number {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: ReplyShortChannelIdsEnd = new ReplyShortChannelIdsEnd(null, msg);
				CommonBase.add_ref_from(msg_hu_conv, this);
				const ret: Result_NoneLightningErrorZ = arg.handle_reply_short_channel_ids_end(their_node_id_conv, msg_hu_conv);
				const result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
			},
			handle_query_channel_range (their_node_id: number, msg: number): number {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: QueryChannelRange = new QueryChannelRange(null, msg);
				CommonBase.add_ref_from(msg_hu_conv, this);
				const ret: Result_NoneLightningErrorZ = arg.handle_query_channel_range(their_node_id_conv, msg_hu_conv);
				const result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
			},
			handle_query_short_channel_ids (their_node_id: number, msg: number): number {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: QueryShortChannelIds = new QueryShortChannelIds(null, msg);
				CommonBase.add_ref_from(msg_hu_conv, this);
				const ret: Result_NoneLightningErrorZ = arg.handle_query_short_channel_ids(their_node_id_conv, msg_hu_conv);
				const result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
			},
		} as bindings.LDKRoutingMessageHandler;
		const messageSendEventsProvider = MessageSendEventsProvider.new_impl(messageSendEventsProvider_impl, );
		const ptr: number = bindings.LDKRoutingMessageHandler_new(structImplementation, messageSendEventsProvider.bindings_instance);

		impl_holder.held = new RoutingMessageHandler(null, ptr);
		impl_holder.held.bindings_instance = structImplementation;
		impl_holder.held.ptrs_to.push(messageSendEventsProvider);
		return impl_holder.held;
	}

	/**
	 * Handle an incoming node_announcement message, returning true if it should be forwarded on,
	 * false or returning an Err otherwise.
	 */
	public handle_node_announcement(msg: NodeAnnouncement): Result_boolLightningErrorZ {
		const ret: number = bindings.RoutingMessageHandler_handle_node_announcement(this.ptr, msg == null ? 0 : CommonBase.get_ptr_of(msg) & ~1);
		const ret_hu_conv: Result_boolLightningErrorZ = Result_boolLightningErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, msg);
		return ret_hu_conv;
	}

	/**
	 * Handle a channel_announcement message, returning true if it should be forwarded on, false
	 * or returning an Err otherwise.
	 */
	public handle_channel_announcement(msg: ChannelAnnouncement): Result_boolLightningErrorZ {
		const ret: number = bindings.RoutingMessageHandler_handle_channel_announcement(this.ptr, msg == null ? 0 : CommonBase.get_ptr_of(msg) & ~1);
		const ret_hu_conv: Result_boolLightningErrorZ = Result_boolLightningErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, msg);
		return ret_hu_conv;
	}

	/**
	 * Handle an incoming channel_update message, returning true if it should be forwarded on,
	 * false or returning an Err otherwise.
	 */
	public handle_channel_update(msg: ChannelUpdate): Result_boolLightningErrorZ {
		const ret: number = bindings.RoutingMessageHandler_handle_channel_update(this.ptr, msg == null ? 0 : CommonBase.get_ptr_of(msg) & ~1);
		const ret_hu_conv: Result_boolLightningErrorZ = Result_boolLightningErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, msg);
		return ret_hu_conv;
	}

	/**
	 * Gets a subset of the channel announcements and updates required to dump our routing table
	 * to a remote node, starting at the short_channel_id indicated by starting_point and
	 * including the batch_amount entries immediately higher in numerical value than starting_point.
	 */
	public get_next_channel_announcements(starting_point: bigint, batch_amount: number): ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[] {
		const ret: number = bindings.RoutingMessageHandler_get_next_channel_announcements(this.ptr, starting_point, batch_amount);
		const ret_conv_59_len: number = bindings.getArrayLength(ret);
		const ret_conv_59_arr: ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[] = new Array(ret_conv_59_len).fill(null);
		for (var h = 0; h < ret_conv_59_len; h++) {
			const ret_conv_59: number = bindings.getU32ArrayElem(ret, h);
			const ret_conv_59_hu_conv: ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, ret_conv_59);
			CommonBase.add_ref_from(ret_conv_59_hu_conv, this);
			ret_conv_59_arr[h] = ret_conv_59_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_59_arr;
	}

	/**
	 * Gets a subset of the node announcements required to dump our routing table to a remote node,
	 * starting at the node *after* the provided publickey and including batch_amount entries
	 * immediately higher (as defined by <PublicKey as Ord>::cmp) than starting_point.
	 * If None is provided for starting_point, we start at the first node.
	 * 
	 * Note that starting_point (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_next_node_announcements(starting_point: Uint8Array, batch_amount: number): NodeAnnouncement[] {
		const ret: number = bindings.RoutingMessageHandler_get_next_node_announcements(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(starting_point, 33)), batch_amount);
		const ret_conv_18_len: number = bindings.getArrayLength(ret);
		const ret_conv_18_arr: NodeAnnouncement[] = new Array(ret_conv_18_len).fill(null);
		for (var s = 0; s < ret_conv_18_len; s++) {
			const ret_conv_18: number = bindings.getU32ArrayElem(ret, s);
			const ret_conv_18_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, ret_conv_18);
			CommonBase.add_ref_from(ret_conv_18_hu_conv, this);
			ret_conv_18_arr[s] = ret_conv_18_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_18_arr;
	}

	/**
	 * Called when a connection is established with a peer. This can be used to
	 * perform routing table synchronization using a strategy defined by the
	 * implementor.
	 */
	public peer_connected(their_node_id: Uint8Array, init: Init): void {
		bindings.RoutingMessageHandler_peer_connected(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(their_node_id, 33)), init == null ? 0 : CommonBase.get_ptr_of(init) & ~1);
		CommonBase.add_ref_from(this, init);
	}

	/**
	 * Handles the reply of a query we initiated to learn about channels
	 * for a given range of blocks. We can expect to receive one or more
	 * replies to a single query.
	 */
	public handle_reply_channel_range(their_node_id: Uint8Array, msg: ReplyChannelRange): Result_NoneLightningErrorZ {
		const ret: number = bindings.RoutingMessageHandler_handle_reply_channel_range(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(their_node_id, 33)), msg == null ? 0 : CommonBase.get_ptr_of(msg) & ~1);
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Handles the reply of a query we initiated asking for routing gossip
	 * messages for a list of channels. We should receive this message when
	 * a node has completed its best effort to send us the pertaining routing
	 * gossip messages.
	 */
	public handle_reply_short_channel_ids_end(their_node_id: Uint8Array, msg: ReplyShortChannelIdsEnd): Result_NoneLightningErrorZ {
		const ret: number = bindings.RoutingMessageHandler_handle_reply_short_channel_ids_end(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(their_node_id, 33)), msg == null ? 0 : CommonBase.get_ptr_of(msg) & ~1);
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Handles when a peer asks us to send a list of short_channel_ids
	 * for the requested range of blocks.
	 */
	public handle_query_channel_range(their_node_id: Uint8Array, msg: QueryChannelRange): Result_NoneLightningErrorZ {
		const ret: number = bindings.RoutingMessageHandler_handle_query_channel_range(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(their_node_id, 33)), msg == null ? 0 : CommonBase.get_ptr_of(msg) & ~1);
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Handles when a peer asks us to send routing gossip messages for a
	 * list of short_channel_ids.
	 */
	public handle_query_short_channel_ids(their_node_id: Uint8Array, msg: QueryShortChannelIds): Result_NoneLightningErrorZ {
		const ret: number = bindings.RoutingMessageHandler_handle_query_short_channel_ids(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(their_node_id, 33)), msg == null ? 0 : CommonBase.get_ptr_of(msg) & ~1);
		const ret_hu_conv: Result_NoneLightningErrorZ = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
