import { TxOut } from '../structs/TxOut.mjs';
import { BigEndianScalar } from '../structs/BigEndianScalar.mjs';
import { COption_NoneZ } from '../enums/COption_NoneZ.mjs';
import { ChannelMonitorUpdateStatus } from '../enums/ChannelMonitorUpdateStatus.mjs';
import { ConfirmationTarget } from '../enums/ConfirmationTarget.mjs';
import { CreationError } from '../enums/CreationError.mjs';
import { Currency } from '../enums/Currency.mjs';
import { FailureCode } from '../enums/FailureCode.mjs';
import { HTLCClaim } from '../enums/HTLCClaim.mjs';
import { IOError } from '../enums/IOError.mjs';
import { Level } from '../enums/Level.mjs';
import { Network } from '../enums/Network.mjs';
import { Recipient } from '../enums/Recipient.mjs';
import { RetryableSendFailure } from '../enums/RetryableSendFailure.mjs';
import { Secp256k1Error } from '../enums/Secp256k1Error.mjs';
import { SemanticError } from '../enums/SemanticError.mjs';
import { SiPrefix } from '../enums/SiPrefix.mjs';
import { UtxoLookupError } from '../enums/UtxoLookupError.mjs';
import { Bech32Error } from '../structs/Bech32Error.mjs';
import { ShutdownScript } from '../structs/ShutdownScript.mjs';
import { APIError } from '../structs/APIError.mjs';
import { Result_NoneAPIErrorZ } from '../structs/Result_NoneAPIErrorZ.mjs';
import { Option_HTLCClaimZ } from '../structs/Option_HTLCClaimZ.mjs';
import { Result_NoneNoneZ } from '../structs/Result_NoneNoneZ.mjs';
import { CounterpartyCommitmentSecrets } from '../structs/CounterpartyCommitmentSecrets.mjs';
import { DecodeError } from '../structs/DecodeError.mjs';
import { Result_CounterpartyCommitmentSecretsDecodeErrorZ } from '../structs/Result_CounterpartyCommitmentSecretsDecodeErrorZ.mjs';
import { TxCreationKeys } from '../structs/TxCreationKeys.mjs';
import { Result_TxCreationKeysDecodeErrorZ } from '../structs/Result_TxCreationKeysDecodeErrorZ.mjs';
import { ChannelPublicKeys } from '../structs/ChannelPublicKeys.mjs';
import { Result_ChannelPublicKeysDecodeErrorZ } from '../structs/Result_ChannelPublicKeysDecodeErrorZ.mjs';
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
import { Result_ShutdownScriptDecodeErrorZ } from '../structs/Result_ShutdownScriptDecodeErrorZ.mjs';
import { InvalidShutdownScript } from '../structs/InvalidShutdownScript.mjs';
import { Result_ShutdownScriptInvalidShutdownScriptZ } from '../structs/Result_ShutdownScriptInvalidShutdownScriptZ.mjs';
import { BlindedPath } from '../structs/BlindedPath.mjs';
import { Result_BlindedPathNoneZ } from '../structs/Result_BlindedPathNoneZ.mjs';
import { Result_BlindedPathDecodeErrorZ } from '../structs/Result_BlindedPathDecodeErrorZ.mjs';
import { BlindedHop } from '../structs/BlindedHop.mjs';
import { Result_BlindedHopDecodeErrorZ } from '../structs/Result_BlindedHopDecodeErrorZ.mjs';
import { ChannelDetails } from '../structs/ChannelDetails.mjs';
import { Route } from '../structs/Route.mjs';
import { LightningError } from '../structs/LightningError.mjs';
import { Result_RouteLightningErrorZ } from '../structs/Result_RouteLightningErrorZ.mjs';
import { RouteHop } from '../structs/RouteHop.mjs';
import { Option_u64Z } from '../structs/Option_u64Z.mjs';
import { InFlightHtlcs } from '../structs/InFlightHtlcs.mjs';
import { Result_InFlightHtlcsDecodeErrorZ } from '../structs/Result_InFlightHtlcsDecodeErrorZ.mjs';
import { Result_RouteHopDecodeErrorZ } from '../structs/Result_RouteHopDecodeErrorZ.mjs';
import { Result_RouteDecodeErrorZ } from '../structs/Result_RouteDecodeErrorZ.mjs';
import { RouteParameters } from '../structs/RouteParameters.mjs';
import { Result_RouteParametersDecodeErrorZ } from '../structs/Result_RouteParametersDecodeErrorZ.mjs';
import { RouteHint } from '../structs/RouteHint.mjs';
import { PaymentParameters } from '../structs/PaymentParameters.mjs';
import { Result_PaymentParametersDecodeErrorZ } from '../structs/Result_PaymentParametersDecodeErrorZ.mjs';
import { RouteHintHop } from '../structs/RouteHintHop.mjs';
import { Result_RouteHintDecodeErrorZ } from '../structs/Result_RouteHintDecodeErrorZ.mjs';
import { Result_RouteHintHopDecodeErrorZ } from '../structs/Result_RouteHintHopDecodeErrorZ.mjs';
import { PaymentPurpose } from '../structs/PaymentPurpose.mjs';
import { Result_PaymentPurposeDecodeErrorZ } from '../structs/Result_PaymentPurposeDecodeErrorZ.mjs';
import { ChannelUpdate } from '../structs/ChannelUpdate.mjs';
import { NetworkUpdate } from '../structs/NetworkUpdate.mjs';
import { Option_NetworkUpdateZ } from '../structs/Option_NetworkUpdateZ.mjs';
import { PathFailure } from '../structs/PathFailure.mjs';
import { Option_PathFailureZ } from '../structs/Option_PathFailureZ.mjs';
import { Result_COption_PathFailureZDecodeErrorZ } from '../structs/Result_COption_PathFailureZDecodeErrorZ.mjs';
import { ClosureReason } from '../structs/ClosureReason.mjs';
import { Option_ClosureReasonZ } from '../structs/Option_ClosureReasonZ.mjs';
import { Result_COption_ClosureReasonZDecodeErrorZ } from '../structs/Result_COption_ClosureReasonZDecodeErrorZ.mjs';
import { HTLCDestination } from '../structs/HTLCDestination.mjs';
import { Option_HTLCDestinationZ } from '../structs/Option_HTLCDestinationZ.mjs';
import { Result_COption_HTLCDestinationZDecodeErrorZ } from '../structs/Result_COption_HTLCDestinationZDecodeErrorZ.mjs';
import { Option_u128Z } from '../structs/Option_u128Z.mjs';
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
import { TwoTuple_usizeTransactionZ } from '../structs/TwoTuple_usizeTransactionZ.mjs';
import { TwoTuple_TxidBlockHashZ } from '../structs/TwoTuple_TxidBlockHashZ.mjs';
import { HTLCUpdate } from '../structs/HTLCUpdate.mjs';
import { MonitorEvent } from '../structs/MonitorEvent.mjs';
import { ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ } from '../structs/ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ.mjs';
import { FixedPenaltyScorer } from '../structs/FixedPenaltyScorer.mjs';
import { Result_FixedPenaltyScorerDecodeErrorZ } from '../structs/Result_FixedPenaltyScorerDecodeErrorZ.mjs';
import { TwoTuple_u64u64Z } from '../structs/TwoTuple_u64u64Z.mjs';
import { Option_C2Tuple_u64u64ZZ } from '../structs/Option_C2Tuple_u64u64ZZ.mjs';
import { TwoTuple_Z } from '../structs/TwoTuple_Z.mjs';
import { TwoTuple__u168_u168Z } from '../structs/TwoTuple__u168_u168Z.mjs';
import { Option_C2Tuple_EightU16sEightU16sZZ } from '../structs/Option_C2Tuple_EightU16sEightU16sZZ.mjs';
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
import { BlindedHopFeatures } from '../structs/BlindedHopFeatures.mjs';
import { Result_BlindedHopFeaturesDecodeErrorZ } from '../structs/Result_BlindedHopFeaturesDecodeErrorZ.mjs';
import { Result_ChannelTypeFeaturesDecodeErrorZ } from '../structs/Result_ChannelTypeFeaturesDecodeErrorZ.mjs';
import { Result_NodeIdDecodeErrorZ } from '../structs/Result_NodeIdDecodeErrorZ.mjs';
import { Result_COption_NetworkUpdateZDecodeErrorZ } from '../structs/Result_COption_NetworkUpdateZDecodeErrorZ.mjs';
import { Result_TxOutUtxoLookupErrorZ } from '../structs/Result_TxOutUtxoLookupErrorZ.mjs';
import { UtxoFuture } from '../structs/UtxoFuture.mjs';
import { UtxoResult } from '../structs/UtxoResult.mjs';
import { UtxoLookup, UtxoLookupInterface } from '../structs/UtxoLookup.mjs';
import { Option_UtxoLookupZ } from '../structs/Option_UtxoLookupZ.mjs';
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
import { Result_PublicKeyNoneZ } from '../structs/Result_PublicKeyNoneZ.mjs';
import { Option_ScalarZ } from '../structs/Option_ScalarZ.mjs';
import { Result_SharedSecretNoneZ } from '../structs/Result_SharedSecretNoneZ.mjs';
import { Result_RecoverableSignatureNoneZ } from '../structs/Result_RecoverableSignatureNoneZ.mjs';
import { ClosingTransaction } from '../structs/ClosingTransaction.mjs';
import { UnsignedChannelAnnouncement } from '../structs/UnsignedChannelAnnouncement.mjs';
import { ChannelSigner, ChannelSignerInterface } from '../structs/ChannelSigner.mjs';
import { EcdsaChannelSigner, EcdsaChannelSignerInterface } from '../structs/EcdsaChannelSigner.mjs';
import { WriteableEcdsaChannelSigner, WriteableEcdsaChannelSignerInterface } from '../structs/WriteableEcdsaChannelSigner.mjs';
import { Result_WriteableEcdsaChannelSignerDecodeErrorZ } from '../structs/Result_WriteableEcdsaChannelSignerDecodeErrorZ.mjs';
import { Result_CVec_CVec_u8ZZNoneZ } from '../structs/Result_CVec_CVec_u8ZZNoneZ.mjs';
import { InMemorySigner } from '../structs/InMemorySigner.mjs';
import { Result_InMemorySignerDecodeErrorZ } from '../structs/Result_InMemorySignerDecodeErrorZ.mjs';
import { Result_TransactionNoneZ } from '../structs/Result_TransactionNoneZ.mjs';
import { Option_u16Z } from '../structs/Option_u16Z.mjs';
import { Result__u832APIErrorZ } from '../structs/Result__u832APIErrorZ.mjs';
import { RecentPaymentDetails } from '../structs/RecentPaymentDetails.mjs';
import { PaymentSendFailure } from '../structs/PaymentSendFailure.mjs';
import { Result_NonePaymentSendFailureZ } from '../structs/Result_NonePaymentSendFailureZ.mjs';
import { Result_NoneRetryableSendFailureZ } from '../structs/Result_NoneRetryableSendFailureZ.mjs';
import { Result_PaymentHashPaymentSendFailureZ } from '../structs/Result_PaymentHashPaymentSendFailureZ.mjs';
import { Result_PaymentHashRetryableSendFailureZ } from '../structs/Result_PaymentHashRetryableSendFailureZ.mjs';
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
import { EntropySource, EntropySourceInterface } from '../structs/EntropySource.mjs';
import { UnsignedChannelUpdate } from '../structs/UnsignedChannelUpdate.mjs';
import { UnsignedNodeAnnouncement } from '../structs/UnsignedNodeAnnouncement.mjs';
import { UnsignedGossipMessage } from '../structs/UnsignedGossipMessage.mjs';
import { NodeSigner, NodeSignerInterface } from '../structs/NodeSigner.mjs';
import { SignerProvider, SignerProviderInterface } from '../structs/SignerProvider.mjs';
import { FeeEstimator, FeeEstimatorInterface } from '../structs/FeeEstimator.mjs';
import { Router, RouterInterface } from '../structs/Router.mjs';
import { ChannelManager } from '../structs/ChannelManager.mjs';
import { TwoTuple_BlockHashChannelManagerZ } from '../structs/TwoTuple_BlockHashChannelManagerZ.mjs';
import { Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ } from '../structs/Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.mjs';
import { ChannelConfig } from '../structs/ChannelConfig.mjs';
import { Result_ChannelConfigDecodeErrorZ } from '../structs/Result_ChannelConfigDecodeErrorZ.mjs';
import { Option_APIErrorZ } from '../structs/Option_APIErrorZ.mjs';
import { Result_COption_APIErrorZDecodeErrorZ } from '../structs/Result_COption_APIErrorZDecodeErrorZ.mjs';
import { Result_OutPointDecodeErrorZ } from '../structs/Result_OutPointDecodeErrorZ.mjs';
import { Type, TypeInterface } from '../structs/Type.mjs';
import { Option_TypeZ } from '../structs/Option_TypeZ.mjs';
import { Result_COption_TypeZDecodeErrorZ } from '../structs/Result_COption_TypeZDecodeErrorZ.mjs';
import { PaymentError } from '../structs/PaymentError.mjs';
import { Result_PaymentIdPaymentErrorZ } from '../structs/Result_PaymentIdPaymentErrorZ.mjs';
import { Result_NonePaymentErrorZ } from '../structs/Result_NonePaymentErrorZ.mjs';
import { Result_StringErrorZ } from '../structs/Result_StringErrorZ.mjs';
import { Result_PublicKeyErrorZ } from '../structs/Result_PublicKeyErrorZ.mjs';
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
import { TwoTuple_PublicKeyCOption_NetAddressZZ } from '../structs/TwoTuple_PublicKeyCOption_NetAddressZZ.mjs';
import { PeerHandleError } from '../structs/PeerHandleError.mjs';
import { Result_CVec_u8ZPeerHandleErrorZ } from '../structs/Result_CVec_u8ZPeerHandleErrorZ.mjs';
import { Result_NonePeerHandleErrorZ } from '../structs/Result_NonePeerHandleErrorZ.mjs';
import { Result_boolPeerHandleErrorZ } from '../structs/Result_boolPeerHandleErrorZ.mjs';
import { SendError } from '../structs/SendError.mjs';
import { Result_NoneSendErrorZ } from '../structs/Result_NoneSendErrorZ.mjs';
import { GraphSyncError } from '../structs/GraphSyncError.mjs';
import { Result_u32GraphSyncErrorZ } from '../structs/Result_u32GraphSyncErrorZ.mjs';
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
import { SignOrCreationError } from '../structs/SignOrCreationError.mjs';
import { Result_InvoiceSignOrCreationErrorZ } from '../structs/Result_InvoiceSignOrCreationErrorZ.mjs';
import { WatchedOutput } from '../structs/WatchedOutput.mjs';
import { Filter, FilterInterface } from '../structs/Filter.mjs';
import { Option_FilterZ } from '../structs/Option_FilterZ.mjs';
import { LockedChannelMonitor } from '../structs/LockedChannelMonitor.mjs';
import { Result_LockedChannelMonitorNoneZ } from '../structs/Result_LockedChannelMonitorNoneZ.mjs';
import { MonitorUpdateId } from '../structs/MonitorUpdateId.mjs';
import { TwoTuple_OutPointCVec_MonitorUpdateIdZZ } from '../structs/TwoTuple_OutPointCVec_MonitorUpdateIdZZ.mjs';
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
import { PrintableString } from '../structs/PrintableString.mjs';
import { FutureCallback, FutureCallbackInterface } from '../structs/FutureCallback.mjs';
import { Future } from '../structs/Future.mjs';
import { ChannelHandshakeConfig } from '../structs/ChannelHandshakeConfig.mjs';
import { ChannelHandshakeLimits } from '../structs/ChannelHandshakeLimits.mjs';
import { UserConfig } from '../structs/UserConfig.mjs';
import { BestBlock } from '../structs/BestBlock.mjs';
import { Listen, ListenInterface } from '../structs/Listen.mjs';
import { Confirm, ConfirmInterface } from '../structs/Confirm.mjs';
import { Persist, PersistInterface } from '../structs/Persist.mjs';
import { ChainMonitor } from '../structs/ChainMonitor.mjs';
import { KeysManager } from '../structs/KeysManager.mjs';
import { PhantomKeysManager } from '../structs/PhantomKeysManager.mjs';
import { ChainParameters } from '../structs/ChainParameters.mjs';
import { Retry } from '../structs/Retry.mjs';
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
import { DirectedChannelTransactionParameters } from '../structs/DirectedChannelTransactionParameters.mjs';
import { OfferFeatures } from '../structs/OfferFeatures.mjs';
import { InvoiceRequestFeatures } from '../structs/InvoiceRequestFeatures.mjs';
import { Bolt12InvoiceFeatures } from '../structs/Bolt12InvoiceFeatures.mjs';
import { P2PGossipSync } from '../structs/P2PGossipSync.mjs';
import { ReadOnlyNetworkGraph } from '../structs/ReadOnlyNetworkGraph.mjs';
import { DirectedChannelInfo } from '../structs/DirectedChannelInfo.mjs';
import { EffectiveCapacity } from '../structs/EffectiveCapacity.mjs';
import { DefaultRouter } from '../structs/DefaultRouter.mjs';
import { ScorerAccountingForInFlightHtlcs } from '../structs/ScorerAccountingForInFlightHtlcs.mjs';
import { MultiThreadedLockableScore } from '../structs/MultiThreadedLockableScore.mjs';
import { MultiThreadedScoreLock } from '../structs/MultiThreadedScoreLock.mjs';
import { ProbabilisticScoringParameters } from '../structs/ProbabilisticScoringParameters.mjs';
import { OnionMessenger } from '../structs/OnionMessenger.mjs';
import { Destination } from '../structs/Destination.mjs';
import { OnionMessageContents } from '../structs/OnionMessageContents.mjs';
import { RapidGossipSync } from '../structs/RapidGossipSync.mjs';
import { GossipSync } from '../structs/GossipSync.mjs';
import { RawDataPart } from '../structs/RawDataPart.mjs';
import { Sha256 } from '../structs/Sha256.mjs';
import { ExpiryTime } from '../structs/ExpiryTime.mjs';
import { MinFinalCltvExpiryDelta } from '../structs/MinFinalCltvExpiryDelta.mjs';
import { Fallback } from '../structs/Fallback.mjs';

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
 * Rather than using a plain PeerManager, it is preferable to use either a SimpleArcPeerManager
 * a SimpleRefPeerManager, for conciseness. See their documentation for more details, but
 * essentially you should default to using a SimpleRefPeerManager, and use a
 * SimpleArcPeerManager when you require a PeerManager with a static lifetime, such as when
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
	 * Constructs a new PeerManager with the given message handlers and node_id secret key
	 * ephemeral_random_data is used to derive per-connection ephemeral keys and must be
	 * cryptographically secure random bytes.
	 * 
	 * `current_time` is used as an always-increasing counter that survives across restarts and is
	 * incremented irregularly internally. In general it is best to simply use the current UNIX
	 * timestamp, however if it is not available a persistent counter that increases once per
	 * minute should suffice.
	 */
	public static constructor_new(message_handler_chan_handler_arg: ChannelMessageHandler, message_handler_route_handler_arg: RoutingMessageHandler, message_handler_onion_message_handler_arg: OnionMessageHandler, current_time: number, ephemeral_random_data: Uint8Array, logger: Logger, custom_message_handler: CustomMessageHandler, node_signer: NodeSigner): PeerManager {
		const ret: bigint = bindings.PeerManager_new(bindings.MessageHandler_new(message_handler_chan_handler_arg == null ? 0n : CommonBase.get_ptr_of(message_handler_chan_handler_arg), message_handler_route_handler_arg == null ? 0n : CommonBase.get_ptr_of(message_handler_route_handler_arg), message_handler_onion_message_handler_arg == null ? 0n : CommonBase.get_ptr_of(message_handler_onion_message_handler_arg)), current_time, bindings.encodeUint8Array(bindings.check_arr_len(ephemeral_random_data, 32)), logger == null ? 0n : CommonBase.get_ptr_of(logger), custom_message_handler == null ? 0n : CommonBase.get_ptr_of(custom_message_handler), node_signer == null ? 0n : CommonBase.get_ptr_of(node_signer));
		const ret_hu_conv: PeerManager = new PeerManager(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_chan_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_route_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_onion_message_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, custom_message_handler);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		return ret_hu_conv;
	}

	/**
	 * Get a list of tuples mapping from node id to network addresses for peers which have
	 * completed the initial handshake.
	 * 
	 * For outbound connections, the [`PublicKey`] will be the same as the `their_node_id` parameter
	 * passed in to [`Self::new_outbound_connection`], however entries will only appear once the initial
	 * handshake has completed and we are sure the remote peer has the private key for the given
	 * [`PublicKey`].
	 * 
	 * The returned `Option`s will only be `Some` if an address had been previously given via
	 * [`Self::new_outbound_connection`] or [`Self::new_inbound_connection`].
	 */
	public get_peer_node_ids(): TwoTuple_PublicKeyCOption_NetAddressZZ[] {
		const ret: number = bindings.PeerManager_get_peer_node_ids(this.ptr);
		const ret_conv_40_len: number = bindings.getArrayLength(ret);
		const ret_conv_40_arr: TwoTuple_PublicKeyCOption_NetAddressZZ[] = new Array(ret_conv_40_len).fill(null);
		for (var o = 0; o < ret_conv_40_len; o++) {
			const ret_conv_40: bigint = bindings.getU64ArrayElem(ret, o);
			const ret_conv_40_hu_conv: TwoTuple_PublicKeyCOption_NetAddressZZ = new TwoTuple_PublicKeyCOption_NetAddressZZ(null, ret_conv_40);
			CommonBase.add_ref_from(ret_conv_40_hu_conv, this);
			ret_conv_40_arr[o] = ret_conv_40_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_40_arr;
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
	 * [`socket_disconnected()`].
	 * 
	 * [`socket_disconnected()`]: PeerManager::socket_disconnected
	 */
	public new_outbound_connection(their_node_id: Uint8Array, descriptor: SocketDescriptor, remote_network_address: Option_NetAddressZ): Result_CVec_u8ZPeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_new_outbound_connection(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(their_node_id, 33)), descriptor == null ? 0n : CommonBase.get_ptr_of(descriptor), CommonBase.get_ptr_of(remote_network_address));
		const ret_hu_conv: Result_CVec_u8ZPeerHandleErrorZ = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, descriptor);
		CommonBase.add_ref_from(this, remote_network_address);
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
	 * [`socket_disconnected()`].
	 * 
	 * [`socket_disconnected()`]: PeerManager::socket_disconnected
	 */
	public new_inbound_connection(descriptor: SocketDescriptor, remote_network_address: Option_NetAddressZ): Result_NonePeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_new_inbound_connection(this.ptr, descriptor == null ? 0n : CommonBase.get_ptr_of(descriptor), CommonBase.get_ptr_of(remote_network_address));
		const ret_hu_conv: Result_NonePeerHandleErrorZ = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, descriptor);
		CommonBase.add_ref_from(this, remote_network_address);
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
	 * ready to call `[write_buffer_space_avail`] again if a write call generated here isn't
	 * sufficient!
	 * 
	 * [`send_data`]: SocketDescriptor::send_data
	 * [`write_buffer_space_avail`]: PeerManager::write_buffer_space_avail
	 */
	public write_buffer_space_avail(descriptor: SocketDescriptor): Result_NonePeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_write_buffer_space_avail(this.ptr, descriptor == null ? 0n : CommonBase.get_ptr_of(descriptor));
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
		const ret: bigint = bindings.PeerManager_read_event(this.ptr, peer_descriptor == null ? 0n : CommonBase.get_ptr_of(peer_descriptor), bindings.encodeUint8Array(data));
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
	 * You don't have to call this function explicitly if you are using [`lightning-net-tokio`]
	 * or one of the other clients provided in our language bindings.
	 * 
	 * Note that if there are any other calls to this function waiting on lock(s) this may return
	 * without doing any work. All available events that need handling will be handled before the
	 * other calls return.
	 * 
	 * [`send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`ChannelManager::process_pending_htlc_forwards`]: crate::ln::channelmanager::ChannelManager::process_pending_htlc_forwards
	 * [`send_data`]: SocketDescriptor::send_data
	 */
	public process_events(): void {
		bindings.PeerManager_process_events(this.ptr);
	}

	/**
	 * Indicates that the given socket descriptor's connection is now closed.
	 */
	public socket_disconnected(descriptor: SocketDescriptor): void {
		bindings.PeerManager_socket_disconnected(this.ptr, descriptor == null ? 0n : CommonBase.get_ptr_of(descriptor));
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
		bindings.PeerManager_disconnect_by_node_id(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(node_id, 33)));
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
	public broadcast_node_announcement(rgb: Uint8Array, alias: Uint8Array, addresses: NetAddress[]): void {
		bindings.PeerManager_broadcast_node_announcement(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(rgb, 3)), bindings.encodeUint8Array(bindings.check_arr_len(alias, 32)), bindings.encodeUint64Array(addresses != null ? addresses.map(addresses_conv_12 => CommonBase.get_ptr_of(addresses_conv_12)) : null));
		addresses.forEach((addresses_conv_12: NetAddress) => { CommonBase.add_ref_from(this, addresses_conv_12); });
	}

}
