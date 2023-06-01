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
import { PaymentFailureReason } from '../enums/PaymentFailureReason.mjs';
import { Recipient } from '../enums/Recipient.mjs';
import { RetryableSendFailure } from '../enums/RetryableSendFailure.mjs';
import { Secp256k1Error } from '../enums/Secp256k1Error.mjs';
import { SemanticError } from '../enums/SemanticError.mjs';
import { SiPrefix } from '../enums/SiPrefix.mjs';
import { UtxoLookupError } from '../enums/UtxoLookupError.mjs';
import { Bech32Error } from '../structs/Bech32Error.mjs';
import { Option_DurationZ } from '../structs/Option_DurationZ.mjs';
import { BlindedPath } from '../structs/BlindedPath.mjs';
import { Option_u64Z } from '../structs/Option_u64Z.mjs';
import { ShutdownScript } from '../structs/ShutdownScript.mjs';
import { APIError } from '../structs/APIError.mjs';
import { Result_NoneAPIErrorZ } from '../structs/Result_NoneAPIErrorZ.mjs';
import { Option_CVec_u8ZZ } from '../structs/Option_CVec_u8ZZ.mjs';
import { RecipientOnionFields } from '../structs/RecipientOnionFields.mjs';
import { DecodeError } from '../structs/DecodeError.mjs';
import { Result_RecipientOnionFieldsDecodeErrorZ } from '../structs/Result_RecipientOnionFieldsDecodeErrorZ.mjs';
import { Option_HTLCClaimZ } from '../structs/Option_HTLCClaimZ.mjs';
import { Result_NoneNoneZ } from '../structs/Result_NoneNoneZ.mjs';
import { CounterpartyCommitmentSecrets } from '../structs/CounterpartyCommitmentSecrets.mjs';
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
import { BlindedPayInfo } from '../structs/BlindedPayInfo.mjs';
import { Result_BlindedPayInfoDecodeErrorZ } from '../structs/Result_BlindedPayInfoDecodeErrorZ.mjs';
import { ChannelDetails } from '../structs/ChannelDetails.mjs';
import { Route } from '../structs/Route.mjs';
import { LightningError } from '../structs/LightningError.mjs';
import { Result_RouteLightningErrorZ } from '../structs/Result_RouteLightningErrorZ.mjs';
import { InFlightHtlcs } from '../structs/InFlightHtlcs.mjs';
import { Result_InFlightHtlcsDecodeErrorZ } from '../structs/Result_InFlightHtlcsDecodeErrorZ.mjs';
import { RouteHop } from '../structs/RouteHop.mjs';
import { Result_RouteHopDecodeErrorZ } from '../structs/Result_RouteHopDecodeErrorZ.mjs';
import { BlindedHop } from '../structs/BlindedHop.mjs';
import { BlindedTail } from '../structs/BlindedTail.mjs';
import { Result_BlindedTailDecodeErrorZ } from '../structs/Result_BlindedTailDecodeErrorZ.mjs';
import { Path } from '../structs/Path.mjs';
import { Result_RouteDecodeErrorZ } from '../structs/Result_RouteDecodeErrorZ.mjs';
import { RouteParameters } from '../structs/RouteParameters.mjs';
import { Result_RouteParametersDecodeErrorZ } from '../structs/Result_RouteParametersDecodeErrorZ.mjs';
import { PaymentParameters } from '../structs/PaymentParameters.mjs';
import { Result_PaymentParametersDecodeErrorZ } from '../structs/Result_PaymentParametersDecodeErrorZ.mjs';
import { TwoTuple_BlindedPayInfoBlindedPathZ } from '../structs/TwoTuple_BlindedPayInfoBlindedPathZ.mjs';
import { RouteHint } from '../structs/RouteHint.mjs';
import { RouteHintHop } from '../structs/RouteHintHop.mjs';
import { Result_RouteHintDecodeErrorZ } from '../structs/Result_RouteHintDecodeErrorZ.mjs';
import { Result_RouteHintHopDecodeErrorZ } from '../structs/Result_RouteHintHopDecodeErrorZ.mjs';
import { TwoTuple_usizeTransactionZ } from '../structs/TwoTuple_usizeTransactionZ.mjs';
import { TwoTuple_TxidBlockHashZ } from '../structs/TwoTuple_TxidBlockHashZ.mjs';
import { HTLCUpdate } from '../structs/HTLCUpdate.mjs';
import { OutPoint } from '../structs/OutPoint.mjs';
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
import { ChannelTypeFeatures } from '../structs/ChannelTypeFeatures.mjs';
import { Result_ChannelTypeFeaturesDecodeErrorZ } from '../structs/Result_ChannelTypeFeaturesDecodeErrorZ.mjs';
import { PaymentPurpose } from '../structs/PaymentPurpose.mjs';
import { Result_PaymentPurposeDecodeErrorZ } from '../structs/Result_PaymentPurposeDecodeErrorZ.mjs';
import { ChannelUpdate } from '../structs/ChannelUpdate.mjs';
import { NetworkUpdate } from '../structs/NetworkUpdate.mjs';
import { Option_NetworkUpdateZ } from '../structs/Option_NetworkUpdateZ.mjs';
import { PathFailure } from '../structs/PathFailure.mjs';
import { Option_PathFailureZ } from '../structs/Option_PathFailureZ.mjs';
import { Result_COption_PathFailureZDecodeErrorZ } from '../structs/Result_COption_PathFailureZDecodeErrorZ.mjs';
import { UntrustedString } from '../structs/UntrustedString.mjs';
import { ClosureReason } from '../structs/ClosureReason.mjs';
import { Option_ClosureReasonZ } from '../structs/Option_ClosureReasonZ.mjs';
import { Result_COption_ClosureReasonZDecodeErrorZ } from '../structs/Result_COption_ClosureReasonZDecodeErrorZ.mjs';
import { HTLCDestination } from '../structs/HTLCDestination.mjs';
import { Option_HTLCDestinationZ } from '../structs/Option_HTLCDestinationZ.mjs';
import { Result_COption_HTLCDestinationZDecodeErrorZ } from '../structs/Result_COption_HTLCDestinationZDecodeErrorZ.mjs';
import { Result_PaymentFailureReasonDecodeErrorZ } from '../structs/Result_PaymentFailureReasonDecodeErrorZ.mjs';
import { Option_u128Z } from '../structs/Option_u128Z.mjs';
import { Option_PaymentFailureReasonZ } from '../structs/Option_PaymentFailureReasonZ.mjs';
import { DelayedPaymentOutputDescriptor } from '../structs/DelayedPaymentOutputDescriptor.mjs';
import { StaticPaymentOutputDescriptor } from '../structs/StaticPaymentOutputDescriptor.mjs';
import { SpendableOutputDescriptor } from '../structs/SpendableOutputDescriptor.mjs';
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
import { Result_PublicKeyErrorZ } from '../structs/Result_PublicKeyErrorZ.mjs';
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
import { Result_UntrustedStringDecodeErrorZ } from '../structs/Result_UntrustedStringDecodeErrorZ.mjs';
import { Result_OutPointDecodeErrorZ } from '../structs/Result_OutPointDecodeErrorZ.mjs';
import { Type, TypeInterface } from '../structs/Type.mjs';
import { Option_TypeZ } from '../structs/Option_TypeZ.mjs';
import { Result_COption_TypeZDecodeErrorZ } from '../structs/Result_COption_TypeZDecodeErrorZ.mjs';
import { PaymentError } from '../structs/PaymentError.mjs';
import { Result_PaymentIdPaymentErrorZ } from '../structs/Result_PaymentIdPaymentErrorZ.mjs';
import { Result_NonePaymentErrorZ } from '../structs/Result_NonePaymentErrorZ.mjs';
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
import { TwoTuple_PublicKeyCOption_NetAddressZZ } from '../structs/TwoTuple_PublicKeyCOption_NetAddressZZ.mjs';
import { PeerHandleError } from '../structs/PeerHandleError.mjs';
import { Result_CVec_u8ZPeerHandleErrorZ } from '../structs/Result_CVec_u8ZPeerHandleErrorZ.mjs';
import { Result_NonePeerHandleErrorZ } from '../structs/Result_NonePeerHandleErrorZ.mjs';
import { Result_boolPeerHandleErrorZ } from '../structs/Result_boolPeerHandleErrorZ.mjs';
import { SendError } from '../structs/SendError.mjs';
import { Result_NoneSendErrorZ } from '../structs/Result_NoneSendErrorZ.mjs';
import { Result_BlindedPathNoneZ } from '../structs/Result_BlindedPathNoneZ.mjs';
import { Result_BlindedPathDecodeErrorZ } from '../structs/Result_BlindedPathDecodeErrorZ.mjs';
import { Result_BlindedHopDecodeErrorZ } from '../structs/Result_BlindedHopDecodeErrorZ.mjs';
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
import { WatchedOutput } from '../structs/WatchedOutput.mjs';
import { Filter, FilterInterface } from '../structs/Filter.mjs';
import { Option_FilterZ } from '../structs/Option_FilterZ.mjs';
import { LockedChannelMonitor } from '../structs/LockedChannelMonitor.mjs';
import { Result_LockedChannelMonitorNoneZ } from '../structs/Result_LockedChannelMonitorNoneZ.mjs';
import { MonitorUpdateId } from '../structs/MonitorUpdateId.mjs';
import { TwoTuple_OutPointCVec_MonitorUpdateIdZZ } from '../structs/TwoTuple_OutPointCVec_MonitorUpdateIdZZ.mjs';
import { Invoice } from '../structs/Invoice.mjs';
import { SignOrCreationError } from '../structs/SignOrCreationError.mjs';
import { Result_InvoiceSignOrCreationErrorZ } from '../structs/Result_InvoiceSignOrCreationErrorZ.mjs';
import { ParseError } from '../structs/ParseError.mjs';
import { Result_SiPrefixParseErrorZ } from '../structs/Result_SiPrefixParseErrorZ.mjs';
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
import { EventHandler, EventHandlerInterface } from '../structs/EventHandler.mjs';
import { EventsProvider, EventsProviderInterface } from '../structs/EventsProvider.mjs';
import { KeysManager } from '../structs/KeysManager.mjs';
import { PhantomKeysManager } from '../structs/PhantomKeysManager.mjs';
import { ChainParameters } from '../structs/ChainParameters.mjs';
import { Retry } from '../structs/Retry.mjs';
import { MessageSendEventsProvider, MessageSendEventsProviderInterface } from '../structs/MessageSendEventsProvider.mjs';
import { ChannelMessageHandler, ChannelMessageHandlerInterface } from '../structs/ChannelMessageHandler.mjs';
import { ChannelManagerReadArgs } from '../structs/ChannelManagerReadArgs.mjs';
import { ExpandedKey } from '../structs/ExpandedKey.mjs';
import { DataLossProtect } from '../structs/DataLossProtect.mjs';
import { RoutingMessageHandler, RoutingMessageHandlerInterface } from '../structs/RoutingMessageHandler.mjs';
import { OnionMessageProvider, OnionMessageProviderInterface } from '../structs/OnionMessageProvider.mjs';
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
import { OfferFeatures } from '../structs/OfferFeatures.mjs';
import { InvoiceRequestFeatures } from '../structs/InvoiceRequestFeatures.mjs';
import { Bolt12InvoiceFeatures } from '../structs/Bolt12InvoiceFeatures.mjs';
import { UnsignedInvoice } from '../structs/UnsignedInvoice.mjs';
import { UnsignedInvoiceRequest } from '../structs/UnsignedInvoiceRequest.mjs';
import { InvoiceRequest } from '../structs/InvoiceRequest.mjs';
import { Offer } from '../structs/Offer.mjs';
import { Amount } from '../structs/Amount.mjs';
import { Quantity } from '../structs/Quantity.mjs';
import { Refund } from '../structs/Refund.mjs';
import { P2PGossipSync } from '../structs/P2PGossipSync.mjs';
import { ReadOnlyNetworkGraph } from '../structs/ReadOnlyNetworkGraph.mjs';
import { DirectedChannelInfo } from '../structs/DirectedChannelInfo.mjs';
import { EffectiveCapacity } from '../structs/EffectiveCapacity.mjs';
import { DefaultRouter } from '../structs/DefaultRouter.mjs';
import { ScorerAccountingForInFlightHtlcs } from '../structs/ScorerAccountingForInFlightHtlcs.mjs';
import { Hints } from '../structs/Hints.mjs';
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
		const ret: number = bindings.U128_new(bindings.encodeUint8Array(bindings.check_arr_len(le_bytes, 16)));
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
	public static constructor_sign(msg: Uint8Array, sk: Uint8Array): Result_StringErrorZ {
		const ret: bigint = bindings.sign(bindings.encodeUint8Array(msg), bindings.encodeUint8Array(bindings.check_arr_len(sk, 32)));
		const ret_hu_conv: Result_StringErrorZ = Result_StringErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Recovers the PublicKey of the signer of the message given the message and the signature.
	 */
	public static constructor_recover_pk(msg: Uint8Array, sig: string): Result_PublicKeyErrorZ {
		const ret: bigint = bindings.recover_pk(bindings.encodeUint8Array(msg), bindings.encodeString(sig));
		const ret_hu_conv: Result_PublicKeyErrorZ = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies a message was signed by a PrivateKey that derives to a given PublicKey, given a message, a signature,
	 * and the PublicKey.
	 */
	public static constructor_verify(msg: Uint8Array, sig: string, pk: Uint8Array): boolean {
		const ret: boolean = bindings.verify(bindings.encodeUint8Array(msg), bindings.encodeString(sig), bindings.encodeUint8Array(bindings.check_arr_len(pk, 33)));
		return ret;
	}

	/**
	 * Construct the invoice's HRP and signatureless data into a preimage to be hashed.
	 */
	public static constructor_construct_invoice_preimage(hrp_bytes: Uint8Array, data_without_signature: UInt5[]): Uint8Array {
		const ret: number = bindings.construct_invoice_preimage(bindings.encodeUint8Array(hrp_bytes), bindings.encodeUint8Array(data_without_signature != null ? bindings.uint5ArrToBytes(data_without_signature) : null));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
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
	 * Read a C2Tuple_BlockHashChannelMonitorZ from a byte array, created by C2Tuple_BlockHashChannelMonitorZ_write
	 */
	public static constructor_C2Tuple_BlockHashChannelMonitorZ_read(ser: Uint8Array, arg_a: EntropySource, arg_b: SignerProvider): Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ {
		const ret: bigint = bindings.C2Tuple_BlockHashChannelMonitorZ_read(bindings.encodeUint8Array(ser), CommonBase.get_ptr_of(arg_a), CommonBase.get_ptr_of(arg_b));
		const ret_hu_conv: Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ = Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, arg_a);
		CommonBase.add_ref_from(ret_hu_conv, arg_b);
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`InitFeatures`] flags which are provided by or required by
	 * [`ChannelManager`].
	 */
	public static constructor_provided_init_features(_config: UserConfig): InitFeatures {
		const ret: bigint = bindings.provided_init_features(_config == null ? 0n : CommonBase.get_ptr_of(_config));
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, _config);
		return ret_hu_conv;
	}

	/**
	 * Read a C2Tuple_BlockHashChannelManagerZ from a byte array, created by C2Tuple_BlockHashChannelManagerZ_write
	 */
	public static constructor_C2Tuple_BlockHashChannelManagerZ_read(ser: Uint8Array, arg_entropy_source: EntropySource, arg_node_signer: NodeSigner, arg_signer_provider: SignerProvider, arg_fee_estimator: FeeEstimator, arg_chain_monitor: Watch, arg_tx_broadcaster: BroadcasterInterface, arg_router: Router, arg_logger: Logger, arg_default_config: UserConfig, arg_channel_monitors: ChannelMonitor[]): Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ {
		const ret: bigint = bindings.C2Tuple_BlockHashChannelManagerZ_read(bindings.encodeUint8Array(ser), bindings.ChannelManagerReadArgs_new(CommonBase.get_ptr_of(arg_entropy_source), CommonBase.get_ptr_of(arg_node_signer), CommonBase.get_ptr_of(arg_signer_provider), CommonBase.get_ptr_of(arg_fee_estimator), CommonBase.get_ptr_of(arg_chain_monitor), CommonBase.get_ptr_of(arg_tx_broadcaster), CommonBase.get_ptr_of(arg_router), CommonBase.get_ptr_of(arg_logger), arg_default_config == null ? 0n : CommonBase.get_ptr_of(arg_default_config), bindings.encodeUint64Array(arg_channel_monitors != null ? arg_channel_monitors.map(arg_channel_monitors_conv_16 => arg_channel_monitors_conv_16 == null ? 0n : CommonBase.get_ptr_of(arg_channel_monitors_conv_16)) : null)));
		const ret_hu_conv: Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ = Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, arg_entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, arg_node_signer);
		CommonBase.add_ref_from(ret_hu_conv, arg_signer_provider);
		CommonBase.add_ref_from(ret_hu_conv, arg_fee_estimator);
		CommonBase.add_ref_from(ret_hu_conv, arg_chain_monitor);
		CommonBase.add_ref_from(ret_hu_conv, arg_tx_broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, arg_router);
		CommonBase.add_ref_from(ret_hu_conv, arg_logger);
		CommonBase.add_ref_from(ret_hu_conv, arg_default_config);
		arg_channel_monitors.forEach((arg_channel_monitors_conv_16: ChannelMonitor) => { CommonBase.add_ref_from(ret_hu_conv, arg_channel_monitors_conv_16); });
		return ret_hu_conv;
	}

	/**
	 * Equivalent to [`crate::ln::channelmanager::ChannelManager::create_inbound_payment`], but no
	 * `ChannelManager` is required. Useful for generating invoices for [phantom node payments] without
	 * a `ChannelManager`.
	 * 
	 * `keys` is generated by calling [`NodeSigner::get_inbound_payment_key_material`] and then
	 * calling [`ExpandedKey::new`] with its result. It is recommended to cache this value and not
	 * regenerate it for each new inbound payment.
	 * 
	 * `current_time` is a Unix timestamp representing the current time.
	 * 
	 * Note that if `min_final_cltv_expiry_delta` is set to some value, then the payment will not be receivable
	 * on versions of LDK prior to 0.0.114.
	 * 
	 * [phantom node payments]: crate::chain::keysinterface::PhantomKeysManager
	 * [`NodeSigner::get_inbound_payment_key_material`]: crate::chain::keysinterface::NodeSigner::get_inbound_payment_key_material
	 */
	public static constructor_create(keys: ExpandedKey, min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number, entropy_source: EntropySource, current_time: bigint, min_final_cltv_expiry_delta: Option_u16Z): Result_C2Tuple_PaymentHashPaymentSecretZNoneZ {
		const ret: bigint = bindings.create(keys == null ? 0n : CommonBase.get_ptr_of(keys), CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs, CommonBase.get_ptr_of(entropy_source), current_time, CommonBase.get_ptr_of(min_final_cltv_expiry_delta));
		const ret_hu_conv: Result_C2Tuple_PaymentHashPaymentSecretZNoneZ = Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, keys);
		CommonBase.add_ref_from(ret_hu_conv, min_value_msat);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, min_final_cltv_expiry_delta);
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
	 * [phantom node payments]: crate::chain::keysinterface::PhantomKeysManager
	 */
	public static constructor_create_from_hash(keys: ExpandedKey, min_value_msat: Option_u64Z, payment_hash: Uint8Array, invoice_expiry_delta_secs: number, current_time: bigint, min_final_cltv_expiry_delta: Option_u16Z): Result_PaymentSecretNoneZ {
		const ret: bigint = bindings.create_from_hash(keys == null ? 0n : CommonBase.get_ptr_of(keys), CommonBase.get_ptr_of(min_value_msat), bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), invoice_expiry_delta_secs, current_time, CommonBase.get_ptr_of(min_final_cltv_expiry_delta));
		const ret_hu_conv: Result_PaymentSecretNoneZ = Result_PaymentSecretNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, keys);
		CommonBase.add_ref_from(ret_hu_conv, min_value_msat);
		CommonBase.add_ref_from(ret_hu_conv, min_final_cltv_expiry_delta);
		return ret_hu_conv;
	}

	/**
	 * Gets the weight for an HTLC-Success transaction.
	 */
	public static constructor_htlc_success_tx_weight(opt_anchors: boolean): bigint {
		const ret: bigint = bindings.htlc_success_tx_weight(opt_anchors);
		return ret;
	}

	/**
	 * Gets the weight for an HTLC-Timeout transaction.
	 */
	public static constructor_htlc_timeout_tx_weight(opt_anchors: boolean): bigint {
		const ret: bigint = bindings.htlc_timeout_tx_weight(opt_anchors);
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
		const ret: number = bindings.build_commitment_secret(bindings.encodeUint8Array(bindings.check_arr_len(commitment_seed, 32)), idx);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Build a closing transaction
	 */
	public static constructor_build_closing_transaction(to_holder_value_sat: bigint, to_counterparty_value_sat: bigint, to_holder_script: Uint8Array, to_counterparty_script: Uint8Array, funding_outpoint: OutPoint): Uint8Array {
		const ret: number = bindings.build_closing_transaction(to_holder_value_sat, to_counterparty_value_sat, bindings.encodeUint8Array(to_holder_script), bindings.encodeUint8Array(to_counterparty_script), funding_outpoint == null ? 0n : CommonBase.get_ptr_of(funding_outpoint));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Derives a per-commitment-transaction private key (eg an htlc key or delayed_payment key)
	 * from the base secret and the per_commitment_point.
	 */
	public static constructor_derive_private_key(per_commitment_point: Uint8Array, base_secret: Uint8Array): Uint8Array {
		const ret: number = bindings.derive_private_key(bindings.encodeUint8Array(bindings.check_arr_len(per_commitment_point, 33)), bindings.encodeUint8Array(bindings.check_arr_len(base_secret, 32)));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Derives a per-commitment-transaction public key (eg an htlc key or a delayed_payment key)
	 * from the base point and the per_commitment_key. This is the public equivalent of
	 * derive_private_key - using only public keys to derive a public key instead of private keys.
	 */
	public static constructor_derive_public_key(per_commitment_point: Uint8Array, base_point: Uint8Array): Uint8Array {
		const ret: number = bindings.derive_public_key(bindings.encodeUint8Array(bindings.check_arr_len(per_commitment_point, 33)), bindings.encodeUint8Array(bindings.check_arr_len(base_point, 33)));
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
		const ret: number = bindings.derive_private_revocation_key(bindings.encodeUint8Array(bindings.check_arr_len(per_commitment_secret, 32)), bindings.encodeUint8Array(bindings.check_arr_len(countersignatory_revocation_base_secret, 32)));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Derives a per-commitment-transaction revocation public key from its constituent parts. This is
	 * the public equivalend of derive_private_revocation_key - using only public keys to derive a
	 * public key instead of private keys.
	 * 
	 * Only the cheating participant owns a valid witness to propagate a revoked
	 * commitment transaction, thus per_commitment_point always come from cheater
	 * and revocation_base_point always come from punisher, which is the broadcaster
	 * of the transaction spending with this key knowledge.
	 * 
	 * Note that this is infallible iff we trust that at least one of the two input keys are randomly
	 * generated (ie our own).
	 */
	public static constructor_derive_public_revocation_key(per_commitment_point: Uint8Array, countersignatory_revocation_base_point: Uint8Array): Uint8Array {
		const ret: number = bindings.derive_public_revocation_key(bindings.encodeUint8Array(bindings.check_arr_len(per_commitment_point, 33)), bindings.encodeUint8Array(bindings.check_arr_len(countersignatory_revocation_base_point, 33)));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A script either spendable by the revocation
	 * key or the broadcaster_delayed_payment_key and satisfying the relative-locktime OP_CSV constrain.
	 * Encumbering a `to_holder` output on a commitment transaction or 2nd-stage HTLC transactions.
	 */
	public static constructor_get_revokeable_redeemscript(revocation_key: Uint8Array, contest_delay: number, broadcaster_delayed_payment_key: Uint8Array): Uint8Array {
		const ret: number = bindings.get_revokeable_redeemscript(bindings.encodeUint8Array(bindings.check_arr_len(revocation_key, 33)), contest_delay, bindings.encodeUint8Array(bindings.check_arr_len(broadcaster_delayed_payment_key, 33)));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the witness redeemscript for an HTLC output in a commitment transaction. Note that htlc
	 * does not need to have its previous_output_index filled.
	 */
	public static constructor_get_htlc_redeemscript(htlc: HTLCOutputInCommitment, opt_anchors: boolean, keys: TxCreationKeys): Uint8Array {
		const ret: number = bindings.get_htlc_redeemscript(htlc == null ? 0n : CommonBase.get_ptr_of(htlc), opt_anchors, keys == null ? 0n : CommonBase.get_ptr_of(keys));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the redeemscript for a funding output from the two funding public keys.
	 * Note that the order of funding public keys does not matter.
	 */
	public static constructor_make_funding_redeemscript(broadcaster: Uint8Array, countersignatory: Uint8Array): Uint8Array {
		const ret: number = bindings.make_funding_redeemscript(bindings.encodeUint8Array(bindings.check_arr_len(broadcaster, 33)), bindings.encodeUint8Array(bindings.check_arr_len(countersignatory, 33)));
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
	public static constructor_build_htlc_transaction(commitment_txid: Uint8Array, feerate_per_kw: number, contest_delay: number, htlc: HTLCOutputInCommitment, opt_anchors: boolean, use_non_zero_fee_anchors: boolean, broadcaster_delayed_payment_key: Uint8Array, revocation_key: Uint8Array): Uint8Array {
		const ret: number = bindings.build_htlc_transaction(bindings.encodeUint8Array(bindings.check_arr_len(commitment_txid, 32)), feerate_per_kw, contest_delay, htlc == null ? 0n : CommonBase.get_ptr_of(htlc), opt_anchors, use_non_zero_fee_anchors, bindings.encodeUint8Array(bindings.check_arr_len(broadcaster_delayed_payment_key, 33)), bindings.encodeUint8Array(bindings.check_arr_len(revocation_key, 33)));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the witness required to satisfy and spend a HTLC input.
	 * 
	 * Note that preimage (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_build_htlc_input_witness(local_sig: Uint8Array, remote_sig: Uint8Array, preimage: Uint8Array|null, redeem_script: Uint8Array, opt_anchors: boolean): Uint8Array {
		const ret: number = bindings.build_htlc_input_witness(bindings.encodeUint8Array(bindings.check_arr_len(local_sig, 64)), bindings.encodeUint8Array(bindings.check_arr_len(remote_sig, 64)), bindings.encodeUint8Array(bindings.check_arr_len(preimage, 32)), bindings.encodeUint8Array(redeem_script), opt_anchors);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the witnessScript for the to_remote output when anchors are enabled.
	 */
	public static constructor_get_to_countersignatory_with_anchors_redeemscript(payment_point: Uint8Array): Uint8Array {
		const ret: number = bindings.get_to_countersignatory_with_anchors_redeemscript(bindings.encodeUint8Array(bindings.check_arr_len(payment_point, 33)));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the witnessScript for an anchor output from the funding public key.
	 * The witness in the spending input must be:
	 * <BIP 143 funding_signature>
	 * After 16 blocks of confirmation, an alternative satisfying witness could be:
	 * <>
	 * (empty vector required to satisfy compliance with MINIMALIF-standard rule)
	 */
	public static constructor_get_anchor_redeemscript(funding_pubkey: Uint8Array): Uint8Array {
		const ret: number = bindings.get_anchor_redeemscript(bindings.encodeUint8Array(bindings.check_arr_len(funding_pubkey, 33)));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the witness required to satisfy and spend an anchor input.
	 */
	public static constructor_build_anchor_input_witness(funding_key: Uint8Array, funding_sig: Uint8Array): Uint8Array {
		const ret: number = bindings.build_anchor_input_witness(bindings.encodeUint8Array(bindings.check_arr_len(funding_key, 33)), bindings.encodeUint8Array(bindings.check_arr_len(funding_sig, 64)));
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
		const ret: bigint = bindings.get_commitment_transaction_number_obscure_factor(bindings.encodeUint8Array(bindings.check_arr_len(broadcaster_payment_basepoint, 33)), bindings.encodeUint8Array(bindings.check_arr_len(countersignatory_payment_basepoint, 33)), outbound_from_broadcaster);
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
	 * Finds a route from us (payer) to the given target node (payee).
	 * 
	 * If the payee provided features in their invoice, they should be provided via `params.payee`.
	 * Without this, MPP will only be used if the payee's features are available in the network graph.
	 * 
	 * Private routing paths between a public node and the target may be included in `params.payee`.
	 * 
	 * If some channels aren't announced, it may be useful to fill in `first_hops` with the results
	 * from [`ChannelManager::list_usable_channels`]. If it is filled in, the view of these channels
	 * from `network_graph` will be ignored, and only those in `first_hops` will be used.
	 * 
	 * The fees on channels from us to the next hop are ignored as they are assumed to all be equal.
	 * However, the enabled/disabled bit on such channels as well as the `htlc_minimum_msat` /
	 * `htlc_maximum_msat` *are* checked as they may change based on the receiving node.
	 * 
	 * # Note
	 * 
	 * May be used to re-compute a [`Route`] when handling a [`Event::PaymentPathFailed`]. Any
	 * adjustments to the [`NetworkGraph`] and channel scores should be made prior to calling this
	 * function.
	 * 
	 * # Panics
	 * 
	 * Panics if first_hops contains channels without short_channel_ids;
	 * [`ChannelManager::list_usable_channels`] will never include such channels.
	 * 
	 * [`ChannelManager::list_usable_channels`]: crate::ln::channelmanager::ChannelManager::list_usable_channels
	 * [`Event::PaymentPathFailed`]: crate::events::Event::PaymentPathFailed
	 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_find_route(our_node_pubkey: Uint8Array, route_params: RouteParameters, network_graph: NetworkGraph, first_hops: ChannelDetails[]|null, logger: Logger, scorer: Score, random_seed_bytes: Uint8Array): Result_RouteLightningErrorZ {
		const ret: bigint = bindings.find_route(bindings.encodeUint8Array(bindings.check_arr_len(our_node_pubkey, 33)), route_params == null ? 0n : CommonBase.get_ptr_of(route_params), network_graph == null ? 0n : CommonBase.get_ptr_of(network_graph), bindings.encodeUint64Array(first_hops != null ? first_hops.map(first_hops_conv_16 => first_hops_conv_16 == null ? 0n : CommonBase.get_ptr_of(first_hops_conv_16)) : null), CommonBase.get_ptr_of(logger), CommonBase.get_ptr_of(scorer), bindings.encodeUint8Array(bindings.check_arr_len(random_seed_bytes, 32)));
		const ret_hu_conv: Result_RouteLightningErrorZ = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, route_params);
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
	public static constructor_build_route_from_hops(our_node_pubkey: Uint8Array, hops: Uint8Array[], route_params: RouteParameters, network_graph: NetworkGraph, logger: Logger, random_seed_bytes: Uint8Array): Result_RouteLightningErrorZ {
		const ret: bigint = bindings.build_route_from_hops(bindings.encodeUint8Array(bindings.check_arr_len(our_node_pubkey, 33)), bindings.encodeUint32Array(hops != null ? hops.map(hops_conv_12 => bindings.encodeUint8Array(bindings.check_arr_len(hops_conv_12, 33))) : null), route_params == null ? 0n : CommonBase.get_ptr_of(route_params), network_graph == null ? 0n : CommonBase.get_ptr_of(network_graph), CommonBase.get_ptr_of(logger), bindings.encodeUint8Array(bindings.check_arr_len(random_seed_bytes, 32)));
		const ret_hu_conv: Result_RouteLightningErrorZ = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, route_params);
		CommonBase.add_ref_from(ret_hu_conv, network_graph);
		CommonBase.add_ref_from(ret_hu_conv, logger);
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
	 * Read a HTLCDestination from a byte array, created by HTLCDestination_write
	 */
	public static constructor_HTLCDestination_read(ser: Uint8Array): Result_COption_HTLCDestinationZDecodeErrorZ {
		const ret: bigint = bindings.HTLCDestination_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_COption_HTLCDestinationZDecodeErrorZ = Result_COption_HTLCDestinationZDecodeErrorZ.constr_from_ptr(ret);
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
	 * Pays the given [`Invoice`], retrying if needed based on [`Retry`].
	 * 
	 * [`Invoice::payment_hash`] is used as the [`PaymentId`], which ensures idempotency as long
	 * as the payment is still pending. Once the payment completes or fails, you must ensure that
	 * a second payment with the same [`PaymentHash`] is never sent.
	 * 
	 * If you wish to use a different payment idempotency token, see [`pay_invoice_with_id`].
	 */
	public static constructor_pay_invoice(invoice: Invoice, retry_strategy: Retry, channelmanager: ChannelManager): Result_PaymentIdPaymentErrorZ {
		const ret: bigint = bindings.pay_invoice(invoice == null ? 0n : CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(retry_strategy), channelmanager == null ? 0n : CommonBase.get_ptr_of(channelmanager));
		const ret_hu_conv: Result_PaymentIdPaymentErrorZ = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, invoice);
		CommonBase.add_ref_from(ret_hu_conv, retry_strategy);
		CommonBase.add_ref_from(ret_hu_conv, channelmanager);
		return ret_hu_conv;
	}

	/**
	 * Pays the given [`Invoice`] with a custom idempotency key, retrying if needed based on [`Retry`].
	 * 
	 * Note that idempotency is only guaranteed as long as the payment is still pending. Once the
	 * payment completes or fails, no idempotency guarantees are made.
	 * 
	 * You should ensure that the [`Invoice::payment_hash`] is unique and the same [`PaymentHash`]
	 * has never been paid before.
	 * 
	 * See [`pay_invoice`] for a variant which uses the [`PaymentHash`] for the idempotency token.
	 */
	public static constructor_pay_invoice_with_id(invoice: Invoice, payment_id: Uint8Array, retry_strategy: Retry, channelmanager: ChannelManager): Result_NonePaymentErrorZ {
		const ret: bigint = bindings.pay_invoice_with_id(invoice == null ? 0n : CommonBase.get_ptr_of(invoice), bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)), CommonBase.get_ptr_of(retry_strategy), channelmanager == null ? 0n : CommonBase.get_ptr_of(channelmanager));
		const ret_hu_conv: Result_NonePaymentErrorZ = Result_NonePaymentErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, invoice);
		CommonBase.add_ref_from(ret_hu_conv, retry_strategy);
		CommonBase.add_ref_from(ret_hu_conv, channelmanager);
		return ret_hu_conv;
	}

	/**
	 * Pays the given zero-value [`Invoice`] using the given amount, retrying if needed based on
	 * [`Retry`].
	 * 
	 * [`Invoice::payment_hash`] is used as the [`PaymentId`], which ensures idempotency as long
	 * as the payment is still pending. Once the payment completes or fails, you must ensure that
	 * a second payment with the same [`PaymentHash`] is never sent.
	 * 
	 * If you wish to use a different payment idempotency token, see
	 * [`pay_zero_value_invoice_with_id`].
	 */
	public static constructor_pay_zero_value_invoice(invoice: Invoice, amount_msats: bigint, retry_strategy: Retry, channelmanager: ChannelManager): Result_PaymentIdPaymentErrorZ {
		const ret: bigint = bindings.pay_zero_value_invoice(invoice == null ? 0n : CommonBase.get_ptr_of(invoice), amount_msats, CommonBase.get_ptr_of(retry_strategy), channelmanager == null ? 0n : CommonBase.get_ptr_of(channelmanager));
		const ret_hu_conv: Result_PaymentIdPaymentErrorZ = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, invoice);
		CommonBase.add_ref_from(ret_hu_conv, retry_strategy);
		CommonBase.add_ref_from(ret_hu_conv, channelmanager);
		return ret_hu_conv;
	}

	/**
	 * Pays the given zero-value [`Invoice`] using the given amount and custom idempotency key,
	 * , retrying if needed based on [`Retry`].
	 * 
	 * Note that idempotency is only guaranteed as long as the payment is still pending. Once the
	 * payment completes or fails, no idempotency guarantees are made.
	 * 
	 * You should ensure that the [`Invoice::payment_hash`] is unique and the same [`PaymentHash`]
	 * has never been paid before.
	 * 
	 * See [`pay_zero_value_invoice`] for a variant which uses the [`PaymentHash`] for the
	 * idempotency token.
	 */
	public static constructor_pay_zero_value_invoice_with_id(invoice: Invoice, amount_msats: bigint, payment_id: Uint8Array, retry_strategy: Retry, channelmanager: ChannelManager): Result_NonePaymentErrorZ {
		const ret: bigint = bindings.pay_zero_value_invoice_with_id(invoice == null ? 0n : CommonBase.get_ptr_of(invoice), amount_msats, bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)), CommonBase.get_ptr_of(retry_strategy), channelmanager == null ? 0n : CommonBase.get_ptr_of(channelmanager));
		const ret_hu_conv: Result_NonePaymentErrorZ = Result_NonePaymentErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, invoice);
		CommonBase.add_ref_from(ret_hu_conv, retry_strategy);
		CommonBase.add_ref_from(ret_hu_conv, channelmanager);
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
	 * [`PhantomKeysManager`]: lightning::chain::keysinterface::PhantomKeysManager
	 * [`ChannelManager::get_phantom_route_hints`]: lightning::ln::channelmanager::ChannelManager::get_phantom_route_hints
	 * [`ChannelManager::create_inbound_payment`]: lightning::ln::channelmanager::ChannelManager::create_inbound_payment
	 * [`ChannelManager::create_inbound_payment_for_hash`]: lightning::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash
	 * [`PhantomRouteHints::channels`]: lightning::ln::channelmanager::PhantomRouteHints::channels
	 * [`MIN_FINAL_CLTV_EXPIRY_DETLA`]: lightning::ln::channelmanager::MIN_FINAL_CLTV_EXPIRY_DELTA
	 * 
	 * This can be used in a `no_std` environment, where [`std::time::SystemTime`] is not
	 * available and the current time is supplied by the caller.
	 * 
	 * Note that payment_hash (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_create_phantom_invoice(amt_msat: Option_u64Z, payment_hash: Uint8Array|null, description: string, invoice_expiry_delta_secs: number, phantom_route_hints: PhantomRouteHints[], entropy_source: EntropySource, node_signer: NodeSigner, logger: Logger, network: Currency, min_final_cltv_expiry_delta: Option_u16Z, duration_since_epoch: bigint): Result_InvoiceSignOrCreationErrorZ {
		const ret: bigint = bindings.create_phantom_invoice(CommonBase.get_ptr_of(amt_msat), bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), bindings.encodeString(description), invoice_expiry_delta_secs, bindings.encodeUint64Array(phantom_route_hints != null ? phantom_route_hints.map(phantom_route_hints_conv_19 => phantom_route_hints_conv_19 == null ? 0n : CommonBase.get_ptr_of(phantom_route_hints_conv_19)) : null), CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(logger), network, CommonBase.get_ptr_of(min_final_cltv_expiry_delta), duration_since_epoch);
		const ret_hu_conv: Result_InvoiceSignOrCreationErrorZ = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, amt_msat);
		phantom_route_hints.forEach((phantom_route_hints_conv_19: PhantomRouteHints) => { CommonBase.add_ref_from(ret_hu_conv, phantom_route_hints_conv_19); });
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, min_final_cltv_expiry_delta);
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
	 * [`PhantomKeysManager`]: lightning::chain::keysinterface::PhantomKeysManager
	 * [`ChannelManager::get_phantom_route_hints`]: lightning::ln::channelmanager::ChannelManager::get_phantom_route_hints
	 * [`ChannelManager::create_inbound_payment`]: lightning::ln::channelmanager::ChannelManager::create_inbound_payment
	 * [`ChannelManager::create_inbound_payment_for_hash`]: lightning::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash
	 * [`PhantomRouteHints::channels`]: lightning::ln::channelmanager::PhantomRouteHints::channels
	 * 
	 * This can be used in a `no_std` environment, where [`std::time::SystemTime`] is not
	 * available and the current time is supplied by the caller.
	 * 
	 * Note that payment_hash (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_create_phantom_invoice_with_description_hash(amt_msat: Option_u64Z, payment_hash: Uint8Array|null, invoice_expiry_delta_secs: number, description_hash: Sha256, phantom_route_hints: PhantomRouteHints[], entropy_source: EntropySource, node_signer: NodeSigner, logger: Logger, network: Currency, min_final_cltv_expiry_delta: Option_u16Z, duration_since_epoch: bigint): Result_InvoiceSignOrCreationErrorZ {
		const ret: bigint = bindings.create_phantom_invoice_with_description_hash(CommonBase.get_ptr_of(amt_msat), bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), invoice_expiry_delta_secs, description_hash == null ? 0n : CommonBase.get_ptr_of(description_hash), bindings.encodeUint64Array(phantom_route_hints != null ? phantom_route_hints.map(phantom_route_hints_conv_19 => phantom_route_hints_conv_19 == null ? 0n : CommonBase.get_ptr_of(phantom_route_hints_conv_19)) : null), CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(logger), network, CommonBase.get_ptr_of(min_final_cltv_expiry_delta), duration_since_epoch);
		const ret_hu_conv: Result_InvoiceSignOrCreationErrorZ = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, amt_msat);
		CommonBase.add_ref_from(ret_hu_conv, description_hash);
		phantom_route_hints.forEach((phantom_route_hints_conv_19: PhantomRouteHints) => { CommonBase.add_ref_from(ret_hu_conv, phantom_route_hints_conv_19); });
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, min_final_cltv_expiry_delta);
		return ret_hu_conv;
	}

	/**
	 * See [`create_invoice_from_channelmanager_with_description_hash`]
	 * This version can be used in a `no_std` environment, where [`std::time::SystemTime`] is not
	 * available and the current time is supplied by the caller.
	 */
	public static constructor_create_invoice_from_channelmanager_with_description_hash_and_duration_since_epoch(channelmanager: ChannelManager, node_signer: NodeSigner, logger: Logger, network: Currency, amt_msat: Option_u64Z, description_hash: Sha256, duration_since_epoch: bigint, invoice_expiry_delta_secs: number, min_final_cltv_expiry_delta: Option_u16Z): Result_InvoiceSignOrCreationErrorZ {
		const ret: bigint = bindings.create_invoice_from_channelmanager_with_description_hash_and_duration_since_epoch(channelmanager == null ? 0n : CommonBase.get_ptr_of(channelmanager), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(logger), network, CommonBase.get_ptr_of(amt_msat), description_hash == null ? 0n : CommonBase.get_ptr_of(description_hash), duration_since_epoch, invoice_expiry_delta_secs, CommonBase.get_ptr_of(min_final_cltv_expiry_delta));
		const ret_hu_conv: Result_InvoiceSignOrCreationErrorZ = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, channelmanager);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, amt_msat);
		CommonBase.add_ref_from(ret_hu_conv, description_hash);
		CommonBase.add_ref_from(ret_hu_conv, min_final_cltv_expiry_delta);
		return ret_hu_conv;
	}

	/**
	 * See [`create_invoice_from_channelmanager`]
	 * This version can be used in a `no_std` environment, where [`std::time::SystemTime`] is not
	 * available and the current time is supplied by the caller.
	 */
	public static constructor_create_invoice_from_channelmanager_and_duration_since_epoch(channelmanager: ChannelManager, node_signer: NodeSigner, logger: Logger, network: Currency, amt_msat: Option_u64Z, description: string, duration_since_epoch: bigint, invoice_expiry_delta_secs: number, min_final_cltv_expiry_delta: Option_u16Z): Result_InvoiceSignOrCreationErrorZ {
		const ret: bigint = bindings.create_invoice_from_channelmanager_and_duration_since_epoch(channelmanager == null ? 0n : CommonBase.get_ptr_of(channelmanager), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(logger), network, CommonBase.get_ptr_of(amt_msat), bindings.encodeString(description), duration_since_epoch, invoice_expiry_delta_secs, CommonBase.get_ptr_of(min_final_cltv_expiry_delta));
		const ret_hu_conv: Result_InvoiceSignOrCreationErrorZ = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, channelmanager);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, amt_msat);
		CommonBase.add_ref_from(ret_hu_conv, min_final_cltv_expiry_delta);
		return ret_hu_conv;
	}

	/**
	 * See [`create_invoice_from_channelmanager_and_duration_since_epoch`]
	 * This version allows for providing a custom [`PaymentHash`] for the invoice.
	 * This may be useful if you're building an on-chain swap or involving another protocol where
	 * the payment hash is also involved outside the scope of lightning.
	 */
	public static constructor_create_invoice_from_channelmanager_and_duration_since_epoch_with_payment_hash(channelmanager: ChannelManager, node_signer: NodeSigner, logger: Logger, network: Currency, amt_msat: Option_u64Z, description: string, duration_since_epoch: bigint, invoice_expiry_delta_secs: number, payment_hash: Uint8Array, min_final_cltv_expiry_delta: Option_u16Z): Result_InvoiceSignOrCreationErrorZ {
		const ret: bigint = bindings.create_invoice_from_channelmanager_and_duration_since_epoch_with_payment_hash(channelmanager == null ? 0n : CommonBase.get_ptr_of(channelmanager), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(logger), network, CommonBase.get_ptr_of(amt_msat), bindings.encodeString(description), duration_since_epoch, invoice_expiry_delta_secs, bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), CommonBase.get_ptr_of(min_final_cltv_expiry_delta));
		const ret_hu_conv: Result_InvoiceSignOrCreationErrorZ = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, channelmanager);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, amt_msat);
		CommonBase.add_ref_from(ret_hu_conv, min_final_cltv_expiry_delta);
		return ret_hu_conv;
	}

}