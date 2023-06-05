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


/**
 * Manager which keeps track of a number of channels and sends messages to the appropriate
 * channel, also tracking HTLC preimages and forwarding onion packets appropriately.
 * 
 * Implements [`ChannelMessageHandler`], handling the multi-channel parts and passing things through
 * to individual Channels.
 * 
 * Implements [`Writeable`] to write out all channel state to disk. Implies [`peer_disconnected`] for
 * all peers during write/read (though does not modify this instance, only the instance being
 * serialized). This will result in any channels which have not yet exchanged [`funding_created`] (i.e.,
 * called [`funding_transaction_generated`] for outbound channels) being closed.
 * 
 * Note that you can be a bit lazier about writing out `ChannelManager` than you can be with
 * [`ChannelMonitor`]. With [`ChannelMonitor`] you MUST write each monitor update out to disk before
 * returning from [`chain::Watch::watch_channel`]/[`update_channel`], with ChannelManagers, writing updates
 * happens out-of-band (and will prevent any other `ChannelManager` operations from occurring during
 * the serialization process). If the deserialized version is out-of-date compared to the
 * [`ChannelMonitor`] passed by reference to [`read`], those channels will be force-closed based on the
 * `ChannelMonitor` state and no funds will be lost (mod on-chain transaction fees).
 * 
 * Note that the deserializer is only implemented for `(`[`BlockHash`]`, `[`ChannelManager`]`)`, which
 * tells you the last block hash which was connected. You should get the best block tip before using the manager.
 * See [`chain::Listen`] and [`chain::Confirm`] for more details.
 * 
 * Note that `ChannelManager` is responsible for tracking liveness of its channels and generating
 * [`ChannelUpdate`] messages informing peers that the channel is temporarily disabled. To avoid
 * spam due to quick disconnection/reconnection, updates are not sent until the channel has been
 * offline for a full minute. In order to track this, you must call
 * [`timer_tick_occurred`] roughly once per minute, though it doesn't have to be perfect.
 * 
 * To avoid trivial DoS issues, `ChannelManager` limits the number of inbound connections and
 * inbound channels without confirmed funding transactions. This may result in nodes which we do
 * not have a channel with being unable to connect to us or open new channels with us if we have
 * many peers with unfunded channels.
 * 
 * Because it is an indication of trust, inbound channels which we've accepted as 0conf are
 * exempted from the count of unfunded channels. Similarly, outbound channels and connections are
 * never limited. Please ensure you limit the count of such channels yourself.
 * 
 * Rather than using a plain `ChannelManager`, it is preferable to use either a [`SimpleArcChannelManager`]
 * a [`SimpleRefChannelManager`], for conciseness. See their documentation for more details, but
 * essentially you should default to using a [`SimpleRefChannelManager`], and use a
 * [`SimpleArcChannelManager`] when you require a `ChannelManager` with a static lifetime, such as when
 * you're using lightning-net-tokio.
 * 
 * [`peer_disconnected`]: msgs::ChannelMessageHandler::peer_disconnected
 * [`funding_created`]: msgs::FundingCreated
 * [`funding_transaction_generated`]: Self::funding_transaction_generated
 * [`BlockHash`]: bitcoin::hash_types::BlockHash
 * [`update_channel`]: chain::Watch::update_channel
 * [`ChannelUpdate`]: msgs::ChannelUpdate
 * [`timer_tick_occurred`]: Self::timer_tick_occurred
 * [`read`]: ReadableArgs::read
 */
export class ChannelManager extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelManager_free);
	}

	/**
	 * Constructs a new `ChannelManager` to hold several channels and route between them.
	 * 
	 * This is the main \"logic hub\" for all channel-related actions, and implements
	 * [`ChannelMessageHandler`].
	 * 
	 * Non-proportional fees are fixed according to our risk using the provided fee estimator.
	 * 
	 * Users need to notify the new `ChannelManager` when a new block is connected or
	 * disconnected using its [`block_connected`] and [`block_disconnected`] methods, starting
	 * from after [`params.best_block.block_hash`]. See [`chain::Listen`] and [`chain::Confirm`] for
	 * more details.
	 * 
	 * [`block_connected`]: chain::Listen::block_connected
	 * [`block_disconnected`]: chain::Listen::block_disconnected
	 * [`params.best_block.block_hash`]: chain::BestBlock::block_hash
	 */
	public static constructor_new(fee_est: FeeEstimator, chain_monitor: Watch, tx_broadcaster: BroadcasterInterface, router: Router, logger: Logger, entropy_source: EntropySource, node_signer: NodeSigner, signer_provider: SignerProvider, config: UserConfig, params: ChainParameters): ChannelManager {
		const ret: bigint = bindings.ChannelManager_new(CommonBase.get_ptr_of(fee_est), CommonBase.get_ptr_of(chain_monitor), CommonBase.get_ptr_of(tx_broadcaster), CommonBase.get_ptr_of(router), CommonBase.get_ptr_of(logger), CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(signer_provider), config == null ? 0n : CommonBase.get_ptr_of(config), params == null ? 0n : CommonBase.get_ptr_of(params));
		const ret_hu_conv: ChannelManager = new ChannelManager(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, fee_est);
		CommonBase.add_ref_from(ret_hu_conv, chain_monitor);
		CommonBase.add_ref_from(ret_hu_conv, tx_broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, router);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, signer_provider);
		CommonBase.add_ref_from(ret_hu_conv, config);
		CommonBase.add_ref_from(ret_hu_conv, params);
		return ret_hu_conv;
	}

	/**
	 * Gets the current configuration applied to all new channels.
	 */
	public get_current_default_configuration(): UserConfig {
		const ret: bigint = bindings.ChannelManager_get_current_default_configuration(this.ptr);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new outbound channel to the given remote node and with the given value.
	 * 
	 * `user_channel_id` will be provided back as in
	 * [`Event::FundingGenerationReady::user_channel_id`] to allow tracking of which events
	 * correspond with which `create_channel` call. Note that the `user_channel_id` defaults to a
	 * randomized value for inbound channels. `user_channel_id` has no meaning inside of LDK, it
	 * is simply copied to events and otherwise ignored.
	 * 
	 * Raises [`APIError::APIMisuseError`] when `channel_value_satoshis` > 2**24 or `push_msat` is
	 * greater than `channel_value_satoshis * 1k` or `channel_value_satoshis < 1000`.
	 * 
	 * Note that we do not check if you are currently connected to the given peer. If no
	 * connection is available, the outbound `open_channel` message may fail to send, resulting in
	 * the channel eventually being silently forgotten (dropped on reload).
	 * 
	 * Returns the new Channel's temporary `channel_id`. This ID will appear as
	 * [`Event::FundingGenerationReady::temporary_channel_id`] and in
	 * [`ChannelDetails::channel_id`] until after
	 * [`ChannelManager::funding_transaction_generated`] is called, swapping the Channel's ID for
	 * one derived from the funding transaction's TXID. If the counterparty rejects the channel
	 * immediately, this temporary ID will appear in [`Event::ChannelClosed::channel_id`].
	 * 
	 * [`Event::FundingGenerationReady::user_channel_id`]: events::Event::FundingGenerationReady::user_channel_id
	 * [`Event::FundingGenerationReady::temporary_channel_id`]: events::Event::FundingGenerationReady::temporary_channel_id
	 * [`Event::ChannelClosed::channel_id`]: events::Event::ChannelClosed::channel_id
	 * 
	 * Note that override_config (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public create_channel(their_network_key: Uint8Array, channel_value_satoshis: bigint, push_msat: bigint, user_channel_id: bigint, override_config: UserConfig|null): Result__u832APIErrorZ {
		const ret: bigint = bindings.ChannelManager_create_channel(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(their_network_key, 33)), channel_value_satoshis, push_msat, bindings.encodeUint128(user_channel_id), override_config == null ? 0n : CommonBase.get_ptr_of(override_config));
		const ret_hu_conv: Result__u832APIErrorZ = Result__u832APIErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, override_config);
		return ret_hu_conv;
	}

	/**
	 * Gets the list of open channels, in random order. See [`ChannelDetails`] field documentation for
	 * more information.
	 */
	public list_channels(): ChannelDetails[] {
		const ret: number = bindings.ChannelManager_list_channels(this.ptr);
		const ret_conv_16_len: number = bindings.getArrayLength(ret);
		const ret_conv_16_arr: ChannelDetails[] = new Array(ret_conv_16_len).fill(null);
		for (var q = 0; q < ret_conv_16_len; q++) {
			const ret_conv_16: bigint = bindings.getU64ArrayElem(ret, q);
			const ret_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, ret_conv_16);
			CommonBase.add_ref_from(ret_conv_16_hu_conv, this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_16_arr;
	}

	/**
	 * Gets the list of usable channels, in random order. Useful as an argument to
	 * [`Router::find_route`] to ensure non-announced channels are used.
	 * 
	 * These are guaranteed to have their [`ChannelDetails::is_usable`] value set to true, see the
	 * documentation for [`ChannelDetails::is_usable`] for more info on exactly what the criteria
	 * are.
	 */
	public list_usable_channels(): ChannelDetails[] {
		const ret: number = bindings.ChannelManager_list_usable_channels(this.ptr);
		const ret_conv_16_len: number = bindings.getArrayLength(ret);
		const ret_conv_16_arr: ChannelDetails[] = new Array(ret_conv_16_len).fill(null);
		for (var q = 0; q < ret_conv_16_len; q++) {
			const ret_conv_16: bigint = bindings.getU64ArrayElem(ret, q);
			const ret_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, ret_conv_16);
			CommonBase.add_ref_from(ret_conv_16_hu_conv, this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_16_arr;
	}

	/**
	 * Gets the list of channels we have with a given counterparty, in random order.
	 */
	public list_channels_with_counterparty(counterparty_node_id: Uint8Array): ChannelDetails[] {
		const ret: number = bindings.ChannelManager_list_channels_with_counterparty(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(counterparty_node_id, 33)));
		const ret_conv_16_len: number = bindings.getArrayLength(ret);
		const ret_conv_16_arr: ChannelDetails[] = new Array(ret_conv_16_len).fill(null);
		for (var q = 0; q < ret_conv_16_len; q++) {
			const ret_conv_16: bigint = bindings.getU64ArrayElem(ret, q);
			const ret_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, ret_conv_16);
			CommonBase.add_ref_from(ret_conv_16_hu_conv, this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_16_arr;
	}

	/**
	 * Returns in an undefined order recent payments that -- if not fulfilled -- have yet to find a
	 * successful path, or have unresolved HTLCs.
	 * 
	 * This can be useful for payments that may have been prepared, but ultimately not sent, as a
	 * result of a crash. If such a payment exists, is not listed here, and an
	 * [`Event::PaymentSent`] has not been received, you may consider resending the payment.
	 * 
	 * [`Event::PaymentSent`]: events::Event::PaymentSent
	 */
	public list_recent_payments(): RecentPaymentDetails[] {
		const ret: number = bindings.ChannelManager_list_recent_payments(this.ptr);
		const ret_conv_22_len: number = bindings.getArrayLength(ret);
		const ret_conv_22_arr: RecentPaymentDetails[] = new Array(ret_conv_22_len).fill(null);
		for (var w = 0; w < ret_conv_22_len; w++) {
			const ret_conv_22: bigint = bindings.getU64ArrayElem(ret, w);
			const ret_conv_22_hu_conv: RecentPaymentDetails = RecentPaymentDetails.constr_from_ptr(ret_conv_22);
			CommonBase.add_ref_from(ret_conv_22_hu_conv, this);
			ret_conv_22_arr[w] = ret_conv_22_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_22_arr;
	}

	/**
	 * Begins the process of closing a channel. After this call (plus some timeout), no new HTLCs
	 * will be accepted on the given channel, and after additional timeout/the closing of all
	 * pending HTLCs, the channel will be closed on chain.
	 * 
	 * If we are the channel initiator, we will pay between our [`Background`] and
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`] plus our [`Normal`] fee
	 * estimate.
	 * If our counterparty is the channel initiator, we will require a channel closing
	 * transaction feerate of at least our [`Background`] feerate or the feerate which
	 * would appear on a force-closure transaction, whichever is lower. We will allow our
	 * counterparty to pay as much fee as they'd like, however.
	 * 
	 * May generate a [`SendShutdown`] message event on success, which should be relayed.
	 * 
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`]: crate::util::config::ChannelConfig::force_close_avoidance_max_fee_satoshis
	 * [`Background`]: crate::chain::chaininterface::ConfirmationTarget::Background
	 * [`Normal`]: crate::chain::chaininterface::ConfirmationTarget::Normal
	 * [`SendShutdown`]: crate::events::MessageSendEvent::SendShutdown
	 */
	public close_channel(channel_id: Uint8Array, counterparty_node_id: Uint8Array): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_close_channel(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(channel_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(counterparty_node_id, 33)));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Begins the process of closing a channel. After this call (plus some timeout), no new HTLCs
	 * will be accepted on the given channel, and after additional timeout/the closing of all
	 * pending HTLCs, the channel will be closed on chain.
	 * 
	 * `target_feerate_sat_per_1000_weight` has different meanings depending on if we initiated
	 * the channel being closed or not:
	 * If we are the channel initiator, we will pay at least this feerate on the closing
	 * transaction. The upper-bound is set by
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`] plus our [`Normal`] fee
	 * estimate (or `target_feerate_sat_per_1000_weight`, if it is greater).
	 * If our counterparty is the channel initiator, we will refuse to accept a channel closure
	 * transaction feerate below `target_feerate_sat_per_1000_weight` (or the feerate which
	 * will appear on a force-closure transaction, whichever is lower).
	 * 
	 * May generate a [`SendShutdown`] message event on success, which should be relayed.
	 * 
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`]: crate::util::config::ChannelConfig::force_close_avoidance_max_fee_satoshis
	 * [`Background`]: crate::chain::chaininterface::ConfirmationTarget::Background
	 * [`Normal`]: crate::chain::chaininterface::ConfirmationTarget::Normal
	 * [`SendShutdown`]: crate::events::MessageSendEvent::SendShutdown
	 */
	public close_channel_with_target_feerate(channel_id: Uint8Array, counterparty_node_id: Uint8Array, target_feerate_sats_per_1000_weight: number): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_close_channel_with_target_feerate(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(channel_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(counterparty_node_id, 33)), target_feerate_sats_per_1000_weight);
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Force closes a channel, immediately broadcasting the latest local transaction(s) and
	 * rejecting new HTLCs on the given channel. Fails if `channel_id` is unknown to
	 * the manager, or if the `counterparty_node_id` isn't the counterparty of the corresponding
	 * channel.
	 */
	public force_close_broadcasting_latest_txn(channel_id: Uint8Array, counterparty_node_id: Uint8Array): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_force_close_broadcasting_latest_txn(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(channel_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(counterparty_node_id, 33)));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Force closes a channel, rejecting new HTLCs on the given channel but skips broadcasting
	 * the latest local transaction(s). Fails if `channel_id` is unknown to the manager, or if the
	 * `counterparty_node_id` isn't the counterparty of the corresponding channel.
	 * 
	 * You can always get the latest local transaction(s) to broadcast from
	 * [`ChannelMonitor::get_latest_holder_commitment_txn`].
	 */
	public force_close_without_broadcasting_txn(channel_id: Uint8Array, counterparty_node_id: Uint8Array): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_force_close_without_broadcasting_txn(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(channel_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(counterparty_node_id, 33)));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Force close all channels, immediately broadcasting the latest local commitment transaction
	 * for each to the chain and rejecting new HTLCs on each.
	 */
	public force_close_all_channels_broadcasting_latest_txn(): void {
		bindings.ChannelManager_force_close_all_channels_broadcasting_latest_txn(this.ptr);
	}

	/**
	 * Force close all channels rejecting new HTLCs on each but without broadcasting the latest
	 * local transaction(s).
	 */
	public force_close_all_channels_without_broadcasting_txn(): void {
		bindings.ChannelManager_force_close_all_channels_without_broadcasting_txn(this.ptr);
	}

	/**
	 * Sends a payment along a given route.
	 * 
	 * Value parameters are provided via the last hop in route, see documentation for [`RouteHop`]
	 * fields for more info.
	 * 
	 * May generate [`UpdateHTLCs`] message(s) event on success, which should be relayed (e.g. via
	 * [`PeerManager::process_events`]).
	 * 
	 * # Avoiding Duplicate Payments
	 * 
	 * If a pending payment is currently in-flight with the same [`PaymentId`] provided, this
	 * method will error with an [`APIError::InvalidRoute`]. Note, however, that once a payment
	 * is no longer pending (either via [`ChannelManager::abandon_payment`], or handling of an
	 * [`Event::PaymentSent`] or [`Event::PaymentFailed`]) LDK will not stop you from sending a
	 * second payment with the same [`PaymentId`].
	 * 
	 * Thus, in order to ensure duplicate payments are not sent, you should implement your own
	 * tracking of payments, including state to indicate once a payment has completed. Because you
	 * should also ensure that [`PaymentHash`]es are not re-used, for simplicity, you should
	 * consider using the [`PaymentHash`] as the key for tracking payments. In that case, the
	 * [`PaymentId`] should be a copy of the [`PaymentHash`] bytes.
	 * 
	 * Additionally, in the scenario where we begin the process of sending a payment, but crash
	 * before `send_payment` returns (or prior to [`ChannelMonitorUpdate`] persistence if you're
	 * using [`ChannelMonitorUpdateStatus::InProgress`]), the payment may be lost on restart. See
	 * [`ChannelManager::list_recent_payments`] for more information.
	 * 
	 * # Possible Error States on [`PaymentSendFailure`]
	 * 
	 * Each path may have a different return value, and [`PaymentSendFailure`] may return a `Vec` with
	 * each entry matching the corresponding-index entry in the route paths, see
	 * [`PaymentSendFailure`] for more info.
	 * 
	 * In general, a path may raise:
	 * [`APIError::InvalidRoute`] when an invalid route or forwarding parameter (cltv_delta, fee,
	 * node public key) is specified.
	 * [`APIError::ChannelUnavailable`] if the next-hop channel is not available for updates
	 * (including due to previous monitor update failure or new permanent monitor update
	 * failure).
	 * [`APIError::MonitorUpdateInProgress`] if a new monitor update failure prevented sending the
	 * relevant updates.
	 * 
	 * Note that depending on the type of the [`PaymentSendFailure`] the HTLC may have been
	 * irrevocably committed to on our end. In such a case, do NOT retry the payment with a
	 * different route unless you intend to pay twice!
	 * 
	 * [`Event::PaymentSent`]: events::Event::PaymentSent
	 * [`Event::PaymentFailed`]: events::Event::PaymentFailed
	 * [`UpdateHTLCs`]: events::MessageSendEvent::UpdateHTLCs
	 * [`PeerManager::process_events`]: crate::ln::peer_handler::PeerManager::process_events
	 * [`ChannelMonitorUpdateStatus::InProgress`]: crate::chain::ChannelMonitorUpdateStatus::InProgress
	 */
	public send_payment_with_route(route: Route, payment_hash: Uint8Array, recipient_onion: RecipientOnionFields, payment_id: Uint8Array): Result_NonePaymentSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_payment_with_route(this.ptr, route == null ? 0n : CommonBase.get_ptr_of(route), bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), recipient_onion == null ? 0n : CommonBase.get_ptr_of(recipient_onion), bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)));
		const ret_hu_conv: Result_NonePaymentSendFailureZ = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, route);
		CommonBase.add_ref_from(this, recipient_onion);
		return ret_hu_conv;
	}

	/**
	 * Similar to [`ChannelManager::send_payment`], but will automatically find a route based on
	 * `route_params` and retry failed payment paths based on `retry_strategy`.
	 */
	public send_payment(payment_hash: Uint8Array, recipient_onion: RecipientOnionFields, payment_id: Uint8Array, route_params: RouteParameters, retry_strategy: Retry): Result_NoneRetryableSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_payment(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), recipient_onion == null ? 0n : CommonBase.get_ptr_of(recipient_onion), bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)), route_params == null ? 0n : CommonBase.get_ptr_of(route_params), CommonBase.get_ptr_of(retry_strategy));
		const ret_hu_conv: Result_NoneRetryableSendFailureZ = Result_NoneRetryableSendFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, recipient_onion);
		CommonBase.add_ref_from(this, route_params);
		CommonBase.add_ref_from(this, retry_strategy);
		return ret_hu_conv;
	}

	/**
	 * Signals that no further retries for the given payment should occur. Useful if you have a
	 * pending outbound payment with retries remaining, but wish to stop retrying the payment before
	 * retries are exhausted.
	 * 
	 * If no [`Event::PaymentFailed`] event had been generated before, one will be generated as soon
	 * as there are no remaining pending HTLCs for this payment.
	 * 
	 * Note that calling this method does *not* prevent a payment from succeeding. You must still
	 * wait until you receive either a [`Event::PaymentFailed`] or [`Event::PaymentSent`] event to
	 * determine the ultimate status of a payment.
	 * 
	 * If an [`Event::PaymentFailed`] event is generated and we restart without this
	 * [`ChannelManager`] having been persisted, another [`Event::PaymentFailed`] may be generated.
	 * 
	 * [`Event::PaymentFailed`]: events::Event::PaymentFailed
	 * [`Event::PaymentSent`]: events::Event::PaymentSent
	 */
	public abandon_payment(payment_id: Uint8Array): void {
		bindings.ChannelManager_abandon_payment(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)));
	}

	/**
	 * Send a spontaneous payment, which is a payment that does not require the recipient to have
	 * generated an invoice. Optionally, you may specify the preimage. If you do choose to specify
	 * the preimage, it must be a cryptographically secure random value that no intermediate node
	 * would be able to guess -- otherwise, an intermediate node may claim the payment and it will
	 * never reach the recipient.
	 * 
	 * See [`send_payment`] documentation for more details on the return value of this function
	 * and idempotency guarantees provided by the [`PaymentId`] key.
	 * 
	 * Similar to regular payments, you MUST NOT reuse a `payment_preimage` value. See
	 * [`send_payment`] for more information about the risks of duplicate preimage usage.
	 * 
	 * Note that `route` must have exactly one path.
	 * 
	 * [`send_payment`]: Self::send_payment
	 * 
	 * Note that payment_preimage (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public send_spontaneous_payment(route: Route, payment_preimage: Uint8Array|null, recipient_onion: RecipientOnionFields, payment_id: Uint8Array): Result_PaymentHashPaymentSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_spontaneous_payment(this.ptr, route == null ? 0n : CommonBase.get_ptr_of(route), bindings.encodeUint8Array(bindings.check_arr_len(payment_preimage, 32)), recipient_onion == null ? 0n : CommonBase.get_ptr_of(recipient_onion), bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)));
		const ret_hu_conv: Result_PaymentHashPaymentSendFailureZ = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, route);
		CommonBase.add_ref_from(this, recipient_onion);
		return ret_hu_conv;
	}

	/**
	 * Similar to [`ChannelManager::send_spontaneous_payment`], but will automatically find a route
	 * based on `route_params` and retry failed payment paths based on `retry_strategy`.
	 * 
	 * See [`PaymentParameters::for_keysend`] for help in constructing `route_params` for spontaneous
	 * payments.
	 * 
	 * [`PaymentParameters::for_keysend`]: crate::routing::router::PaymentParameters::for_keysend
	 * 
	 * Note that payment_preimage (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public send_spontaneous_payment_with_retry(payment_preimage: Uint8Array|null, recipient_onion: RecipientOnionFields, payment_id: Uint8Array, route_params: RouteParameters, retry_strategy: Retry): Result_PaymentHashRetryableSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_spontaneous_payment_with_retry(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(payment_preimage, 32)), recipient_onion == null ? 0n : CommonBase.get_ptr_of(recipient_onion), bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)), route_params == null ? 0n : CommonBase.get_ptr_of(route_params), CommonBase.get_ptr_of(retry_strategy));
		const ret_hu_conv: Result_PaymentHashRetryableSendFailureZ = Result_PaymentHashRetryableSendFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, recipient_onion);
		CommonBase.add_ref_from(this, route_params);
		CommonBase.add_ref_from(this, retry_strategy);
		return ret_hu_conv;
	}

	/**
	 * Send a payment that is probing the given route for liquidity. We calculate the
	 * [`PaymentHash`] of probes based on a static secret and a random [`PaymentId`], which allows
	 * us to easily discern them from real payments.
	 */
	public send_probe(path: Path): Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_probe(this.ptr, path == null ? 0n : CommonBase.get_ptr_of(path));
		const ret_hu_conv: Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ = Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, path);
		return ret_hu_conv;
	}

	/**
	 * Call this upon creation of a funding transaction for the given channel.
	 * 
	 * Returns an [`APIError::APIMisuseError`] if the funding_transaction spent non-SegWit outputs
	 * or if no output was found which matches the parameters in [`Event::FundingGenerationReady`].
	 * 
	 * Returns [`APIError::APIMisuseError`] if the funding transaction is not final for propagation
	 * across the p2p network.
	 * 
	 * Returns [`APIError::ChannelUnavailable`] if a funding transaction has already been provided
	 * for the channel or if the channel has been closed as indicated by [`Event::ChannelClosed`].
	 * 
	 * May panic if the output found in the funding transaction is duplicative with some other
	 * channel (note that this should be trivially prevented by using unique funding transaction
	 * keys per-channel).
	 * 
	 * Do NOT broadcast the funding transaction yourself. When we have safely received our
	 * counterparty's signature the funding transaction will automatically be broadcast via the
	 * [`BroadcasterInterface`] provided when this `ChannelManager` was constructed.
	 * 
	 * Note that this includes RBF or similar transaction replacement strategies - lightning does
	 * not currently support replacing a funding transaction on an existing channel. Instead,
	 * create a new channel with a conflicting funding transaction.
	 * 
	 * Note to keep the miner incentives aligned in moving the blockchain forward, we recommend
	 * the wallet software generating the funding transaction to apply anti-fee sniping as
	 * implemented by Bitcoin Core wallet. See <https://bitcoinops.org/en/topics/fee-sniping/>
	 * for more details.
	 * 
	 * [`Event::FundingGenerationReady`]: crate::events::Event::FundingGenerationReady
	 * [`Event::ChannelClosed`]: crate::events::Event::ChannelClosed
	 */
	public funding_transaction_generated(temporary_channel_id: Uint8Array, counterparty_node_id: Uint8Array, funding_transaction: Uint8Array): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_funding_transaction_generated(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(temporary_channel_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(counterparty_node_id, 33)), bindings.encodeUint8Array(funding_transaction));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Atomically updates the [`ChannelConfig`] for the given channels.
	 * 
	 * Once the updates are applied, each eligible channel (advertised with a known short channel
	 * ID and a change in [`forwarding_fee_proportional_millionths`], [`forwarding_fee_base_msat`],
	 * or [`cltv_expiry_delta`]) has a [`BroadcastChannelUpdate`] event message generated
	 * containing the new [`ChannelUpdate`] message which should be broadcast to the network.
	 * 
	 * Returns [`ChannelUnavailable`] when a channel is not found or an incorrect
	 * `counterparty_node_id` is provided.
	 * 
	 * Returns [`APIMisuseError`] when a [`cltv_expiry_delta`] update is to be applied with a value
	 * below [`MIN_CLTV_EXPIRY_DELTA`].
	 * 
	 * If an error is returned, none of the updates should be considered applied.
	 * 
	 * [`forwarding_fee_proportional_millionths`]: ChannelConfig::forwarding_fee_proportional_millionths
	 * [`forwarding_fee_base_msat`]: ChannelConfig::forwarding_fee_base_msat
	 * [`cltv_expiry_delta`]: ChannelConfig::cltv_expiry_delta
	 * [`BroadcastChannelUpdate`]: events::MessageSendEvent::BroadcastChannelUpdate
	 * [`ChannelUpdate`]: msgs::ChannelUpdate
	 * [`ChannelUnavailable`]: APIError::ChannelUnavailable
	 * [`APIMisuseError`]: APIError::APIMisuseError
	 */
	public update_channel_config(counterparty_node_id: Uint8Array, channel_ids: Uint8Array[], config: ChannelConfig): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_update_channel_config(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(counterparty_node_id, 33)), bindings.encodeUint32Array(channel_ids != null ? channel_ids.map(channel_ids_conv_12 => bindings.encodeUint8Array(bindings.check_arr_len(channel_ids_conv_12, 32))) : null), config == null ? 0n : CommonBase.get_ptr_of(config));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, config);
		return ret_hu_conv;
	}

	/**
	 * Attempts to forward an intercepted HTLC over the provided channel id and with the provided
	 * amount to forward. Should only be called in response to an [`HTLCIntercepted`] event.
	 * 
	 * Intercepted HTLCs can be useful for Lightning Service Providers (LSPs) to open a just-in-time
	 * channel to a receiving node if the node lacks sufficient inbound liquidity.
	 * 
	 * To make use of intercepted HTLCs, set [`UserConfig::accept_intercept_htlcs`] and use
	 * [`ChannelManager::get_intercept_scid`] to generate short channel id(s) to put in the
	 * receiver's invoice route hints. These route hints will signal to LDK to generate an
	 * [`HTLCIntercepted`] event when it receives the forwarded HTLC, and this method or
	 * [`ChannelManager::fail_intercepted_htlc`] MUST be called in response to the event.
	 * 
	 * Note that LDK does not enforce fee requirements in `amt_to_forward_msat`, and will not stop
	 * you from forwarding more than you received.
	 * 
	 * Errors if the event was not handled in time, in which case the HTLC was automatically failed
	 * backwards.
	 * 
	 * [`UserConfig::accept_intercept_htlcs`]: crate::util::config::UserConfig::accept_intercept_htlcs
	 * [`HTLCIntercepted`]: events::Event::HTLCIntercepted
	 */
	public forward_intercepted_htlc(intercept_id: Uint8Array, next_hop_channel_id: Uint8Array, next_node_id: Uint8Array, amt_to_forward_msat: bigint): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_forward_intercepted_htlc(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(intercept_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(next_hop_channel_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(next_node_id, 33)), amt_to_forward_msat);
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Fails the intercepted HTLC indicated by intercept_id. Should only be called in response to
	 * an [`HTLCIntercepted`] event. See [`ChannelManager::forward_intercepted_htlc`].
	 * 
	 * Errors if the event was not handled in time, in which case the HTLC was automatically failed
	 * backwards.
	 * 
	 * [`HTLCIntercepted`]: events::Event::HTLCIntercepted
	 */
	public fail_intercepted_htlc(intercept_id: Uint8Array): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_fail_intercepted_htlc(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(intercept_id, 32)));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Processes HTLCs which are pending waiting on random forward delay.
	 * 
	 * Should only really ever be called in response to a PendingHTLCsForwardable event.
	 * Will likely generate further events.
	 */
	public process_pending_htlc_forwards(): void {
		bindings.ChannelManager_process_pending_htlc_forwards(this.ptr);
	}

	/**
	 * Performs actions which should happen on startup and roughly once per minute thereafter.
	 * 
	 * This currently includes:
	 * Increasing or decreasing the on-chain feerate estimates for our outbound channels,
	 * Broadcasting [`ChannelUpdate`] messages if we've been disconnected from our peer for more
	 * than a minute, informing the network that they should no longer attempt to route over
	 * the channel.
	 * Expiring a channel's previous [`ChannelConfig`] if necessary to only allow forwarding HTLCs
	 * with the current [`ChannelConfig`].
	 * Removing peers which have disconnected but and no longer have any channels.
	 * 
	 * Note that this may cause reentrancy through [`chain::Watch::update_channel`] calls or feerate
	 * estimate fetches.
	 * 
	 * [`ChannelUpdate`]: msgs::ChannelUpdate
	 * [`ChannelConfig`]: crate::util::config::ChannelConfig
	 */
	public timer_tick_occurred(): void {
		bindings.ChannelManager_timer_tick_occurred(this.ptr);
	}

	/**
	 * Indicates that the preimage for payment_hash is unknown or the received amount is incorrect
	 * after a PaymentClaimable event, failing the HTLC back to its origin and freeing resources
	 * along the path (including in our own channel on which we received it).
	 * 
	 * Note that in some cases around unclean shutdown, it is possible the payment may have
	 * already been claimed by you via [`ChannelManager::claim_funds`] prior to you seeing (a
	 * second copy of) the [`events::Event::PaymentClaimable`] event. Alternatively, the payment
	 * may have already been failed automatically by LDK if it was nearing its expiration time.
	 * 
	 * While LDK will never claim a payment automatically on your behalf (i.e. without you calling
	 * [`ChannelManager::claim_funds`]), you should still monitor for
	 * [`events::Event::PaymentClaimed`] events even for payments you intend to fail, especially on
	 * startup during which time claims that were in-progress at shutdown may be replayed.
	 */
	public fail_htlc_backwards(payment_hash: Uint8Array): void {
		bindings.ChannelManager_fail_htlc_backwards(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)));
	}

	/**
	 * This is a variant of [`ChannelManager::fail_htlc_backwards`] that allows you to specify the
	 * reason for the failure.
	 * 
	 * See [`FailureCode`] for valid failure codes.
	 */
	public fail_htlc_backwards_with_reason(payment_hash: Uint8Array, failure_code: FailureCode): void {
		bindings.ChannelManager_fail_htlc_backwards_with_reason(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), failure_code);
	}

	/**
	 * Provides a payment preimage in response to [`Event::PaymentClaimable`], generating any
	 * [`MessageSendEvent`]s needed to claim the payment.
	 * 
	 * This method is guaranteed to ensure the payment has been claimed but only if the current
	 * height is strictly below [`Event::PaymentClaimable::claim_deadline`]. To avoid race
	 * conditions, you should wait for an [`Event::PaymentClaimed`] before considering the payment
	 * successful. It will generally be available in the next [`process_pending_events`] call.
	 * 
	 * Note that if you did not set an `amount_msat` when calling [`create_inbound_payment`] or
	 * [`create_inbound_payment_for_hash`] you must check that the amount in the `PaymentClaimable`
	 * event matches your expectation. If you fail to do so and call this method, you may provide
	 * the sender \"proof-of-payment\" when they did not fulfill the full expected payment.
	 * 
	 * [`Event::PaymentClaimable`]: crate::events::Event::PaymentClaimable
	 * [`Event::PaymentClaimable::claim_deadline`]: crate::events::Event::PaymentClaimable::claim_deadline
	 * [`Event::PaymentClaimed`]: crate::events::Event::PaymentClaimed
	 * [`process_pending_events`]: EventsProvider::process_pending_events
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 */
	public claim_funds(payment_preimage: Uint8Array): void {
		bindings.ChannelManager_claim_funds(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(payment_preimage, 32)));
	}

	/**
	 * Gets the node_id held by this ChannelManager
	 */
	public get_our_node_id(): Uint8Array {
		const ret: number = bindings.ChannelManager_get_our_node_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Accepts a request to open a channel after a [`Event::OpenChannelRequest`].
	 * 
	 * The `temporary_channel_id` parameter indicates which inbound channel should be accepted,
	 * and the `counterparty_node_id` parameter is the id of the peer which has requested to open
	 * the channel.
	 * 
	 * The `user_channel_id` parameter will be provided back in
	 * [`Event::ChannelClosed::user_channel_id`] to allow tracking of which events correspond
	 * with which `accept_inbound_channel`/`accept_inbound_channel_from_trusted_peer_0conf` call.
	 * 
	 * Note that this method will return an error and reject the channel, if it requires support
	 * for zero confirmations. Instead, `accept_inbound_channel_from_trusted_peer_0conf` must be
	 * used to accept such channels.
	 * 
	 * [`Event::OpenChannelRequest`]: events::Event::OpenChannelRequest
	 * [`Event::ChannelClosed::user_channel_id`]: events::Event::ChannelClosed::user_channel_id
	 */
	public accept_inbound_channel(temporary_channel_id: Uint8Array, counterparty_node_id: Uint8Array, user_channel_id: bigint): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_accept_inbound_channel(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(temporary_channel_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(counterparty_node_id, 33)), bindings.encodeUint128(user_channel_id));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Accepts a request to open a channel after a [`events::Event::OpenChannelRequest`], treating
	 * it as confirmed immediately.
	 * 
	 * The `user_channel_id` parameter will be provided back in
	 * [`Event::ChannelClosed::user_channel_id`] to allow tracking of which events correspond
	 * with which `accept_inbound_channel`/`accept_inbound_channel_from_trusted_peer_0conf` call.
	 * 
	 * Unlike [`ChannelManager::accept_inbound_channel`], this method accepts the incoming channel
	 * and (if the counterparty agrees), enables forwarding of payments immediately.
	 * 
	 * This fully trusts that the counterparty has honestly and correctly constructed the funding
	 * transaction and blindly assumes that it will eventually confirm.
	 * 
	 * If it does not confirm before we decide to close the channel, or if the funding transaction
	 * does not pay to the correct script the correct amount, *you will lose funds*.
	 * 
	 * [`Event::OpenChannelRequest`]: events::Event::OpenChannelRequest
	 * [`Event::ChannelClosed::user_channel_id`]: events::Event::ChannelClosed::user_channel_id
	 */
	public accept_inbound_channel_from_trusted_peer_0conf(temporary_channel_id: Uint8Array, counterparty_node_id: Uint8Array, user_channel_id: bigint): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_accept_inbound_channel_from_trusted_peer_0conf(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(temporary_channel_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(counterparty_node_id, 33)), bindings.encodeUint128(user_channel_id));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets a payment secret and payment hash for use in an invoice given to a third party wishing
	 * to pay us.
	 * 
	 * This differs from [`create_inbound_payment_for_hash`] only in that it generates the
	 * [`PaymentHash`] and [`PaymentPreimage`] for you.
	 * 
	 * The [`PaymentPreimage`] will ultimately be returned to you in the [`PaymentClaimable`], which
	 * will have the [`PaymentClaimable::purpose`] be [`PaymentPurpose::InvoicePayment`] with
	 * its [`PaymentPurpose::InvoicePayment::payment_preimage`] field filled in. That should then be
	 * passed directly to [`claim_funds`].
	 * 
	 * See [`create_inbound_payment_for_hash`] for detailed documentation on behavior and requirements.
	 * 
	 * Note that a malicious eavesdropper can intuit whether an inbound payment was created by
	 * `create_inbound_payment` or `create_inbound_payment_for_hash` based on runtime.
	 * 
	 * # Note
	 * 
	 * If you register an inbound payment with this method, then serialize the `ChannelManager`, then
	 * deserialize it with a node running 0.0.103 and earlier, the payment will fail to be received.
	 * 
	 * Errors if `min_value_msat` is greater than total bitcoin supply.
	 * 
	 * If `min_final_cltv_expiry_delta` is set to some value, then the payment will not be receivable
	 * on versions of LDK prior to 0.0.114.
	 * 
	 * [`claim_funds`]: Self::claim_funds
	 * [`PaymentClaimable`]: events::Event::PaymentClaimable
	 * [`PaymentClaimable::purpose`]: events::Event::PaymentClaimable::purpose
	 * [`PaymentPurpose::InvoicePayment`]: events::PaymentPurpose::InvoicePayment
	 * [`PaymentPurpose::InvoicePayment::payment_preimage`]: events::PaymentPurpose::InvoicePayment::payment_preimage
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 */
	public create_inbound_payment(min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number, min_final_cltv_expiry_delta: Option_u16Z): Result_C2Tuple_PaymentHashPaymentSecretZNoneZ {
		const ret: bigint = bindings.ChannelManager_create_inbound_payment(this.ptr, CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs, CommonBase.get_ptr_of(min_final_cltv_expiry_delta));
		const ret_hu_conv: Result_C2Tuple_PaymentHashPaymentSecretZNoneZ = Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, min_value_msat);
		CommonBase.add_ref_from(this, min_final_cltv_expiry_delta);
		return ret_hu_conv;
	}

	/**
	 * Legacy version of [`create_inbound_payment`]. Use this method if you wish to share
	 * serialized state with LDK node(s) running 0.0.103 and earlier.
	 * 
	 * May panic if `invoice_expiry_delta_secs` is greater than one year.
	 * 
	 * # Note
	 * This method is deprecated and will be removed soon.
	 * 
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 */
	public create_inbound_payment_legacy(min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number): Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_create_inbound_payment_legacy(this.ptr, CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs);
		const ret_hu_conv: Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, min_value_msat);
		return ret_hu_conv;
	}

	/**
	 * Gets a [`PaymentSecret`] for a given [`PaymentHash`], for which the payment preimage is
	 * stored external to LDK.
	 * 
	 * A [`PaymentClaimable`] event will only be generated if the [`PaymentSecret`] matches a
	 * payment secret fetched via this method or [`create_inbound_payment`], and which is at least
	 * the `min_value_msat` provided here, if one is provided.
	 * 
	 * The [`PaymentHash`] (and corresponding [`PaymentPreimage`]) should be globally unique, though
	 * note that LDK will not stop you from registering duplicate payment hashes for inbound
	 * payments.
	 * 
	 * `min_value_msat` should be set if the invoice being generated contains a value. Any payment
	 * received for the returned [`PaymentHash`] will be required to be at least `min_value_msat`
	 * before a [`PaymentClaimable`] event will be generated, ensuring that we do not provide the
	 * sender \"proof-of-payment\" unless they have paid the required amount.
	 * 
	 * `invoice_expiry_delta_secs` describes the number of seconds that the invoice is valid for
	 * in excess of the current time. This should roughly match the expiry time set in the invoice.
	 * After this many seconds, we will remove the inbound payment, resulting in any attempts to
	 * pay the invoice failing. The BOLT spec suggests 3,600 secs as a default validity time for
	 * invoices when no timeout is set.
	 * 
	 * Note that we use block header time to time-out pending inbound payments (with some margin
	 * to compensate for the inaccuracy of block header timestamps). Thus, in practice we will
	 * accept a payment and generate a [`PaymentClaimable`] event for some time after the expiry.
	 * If you need exact expiry semantics, you should enforce them upon receipt of
	 * [`PaymentClaimable`].
	 * 
	 * Note that invoices generated for inbound payments should have their `min_final_cltv_expiry_delta`
	 * set to at least [`MIN_FINAL_CLTV_EXPIRY_DELTA`].
	 * 
	 * Note that a malicious eavesdropper can intuit whether an inbound payment was created by
	 * `create_inbound_payment` or `create_inbound_payment_for_hash` based on runtime.
	 * 
	 * # Note
	 * 
	 * If you register an inbound payment with this method, then serialize the `ChannelManager`, then
	 * deserialize it with a node running 0.0.103 and earlier, the payment will fail to be received.
	 * 
	 * Errors if `min_value_msat` is greater than total bitcoin supply.
	 * 
	 * If `min_final_cltv_expiry_delta` is set to some value, then the payment will not be receivable
	 * on versions of LDK prior to 0.0.114.
	 * 
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 * [`PaymentClaimable`]: events::Event::PaymentClaimable
	 */
	public create_inbound_payment_for_hash(payment_hash: Uint8Array, min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number, min_final_cltv_expiry: Option_u16Z): Result_PaymentSecretNoneZ {
		const ret: bigint = bindings.ChannelManager_create_inbound_payment_for_hash(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs, CommonBase.get_ptr_of(min_final_cltv_expiry));
		const ret_hu_conv: Result_PaymentSecretNoneZ = Result_PaymentSecretNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, min_value_msat);
		CommonBase.add_ref_from(this, min_final_cltv_expiry);
		return ret_hu_conv;
	}

	/**
	 * Legacy version of [`create_inbound_payment_for_hash`]. Use this method if you wish to share
	 * serialized state with LDK node(s) running 0.0.103 and earlier.
	 * 
	 * May panic if `invoice_expiry_delta_secs` is greater than one year.
	 * 
	 * # Note
	 * This method is deprecated and will be removed soon.
	 * 
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 */
	public create_inbound_payment_for_hash_legacy(payment_hash: Uint8Array, min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number): Result_PaymentSecretAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_create_inbound_payment_for_hash_legacy(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs);
		const ret_hu_conv: Result_PaymentSecretAPIErrorZ = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, min_value_msat);
		return ret_hu_conv;
	}

	/**
	 * Gets an LDK-generated payment preimage from a payment hash and payment secret that were
	 * previously returned from [`create_inbound_payment`].
	 * 
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 */
	public get_payment_preimage(payment_hash: Uint8Array, payment_secret: Uint8Array): Result_PaymentPreimageAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_get_payment_preimage(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), bindings.encodeUint8Array(bindings.check_arr_len(payment_secret, 32)));
		const ret_hu_conv: Result_PaymentPreimageAPIErrorZ = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets a fake short channel id for use in receiving [phantom node payments]. These fake scids
	 * are used when constructing the phantom invoice's route hints.
	 * 
	 * [phantom node payments]: crate::chain::keysinterface::PhantomKeysManager
	 */
	public get_phantom_scid(): bigint {
		const ret: bigint = bindings.ChannelManager_get_phantom_scid(this.ptr);
		return ret;
	}

	/**
	 * Gets route hints for use in receiving [phantom node payments].
	 * 
	 * [phantom node payments]: crate::chain::keysinterface::PhantomKeysManager
	 */
	public get_phantom_route_hints(): PhantomRouteHints {
		const ret: bigint = bindings.ChannelManager_get_phantom_route_hints(this.ptr);
		const ret_hu_conv: PhantomRouteHints = new PhantomRouteHints(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Gets a fake short channel id for use in receiving intercepted payments. These fake scids are
	 * used when constructing the route hints for HTLCs intended to be intercepted. See
	 * [`ChannelManager::forward_intercepted_htlc`].
	 * 
	 * Note that this method is not guaranteed to return unique values, you may need to call it a few
	 * times to get a unique scid.
	 */
	public get_intercept_scid(): bigint {
		const ret: bigint = bindings.ChannelManager_get_intercept_scid(this.ptr);
		return ret;
	}

	/**
	 * Gets inflight HTLC information by processing pending outbound payments that are in
	 * our channels. May be used during pathfinding to account for in-use channel liquidity.
	 */
	public compute_inflight_htlcs(): InFlightHtlcs {
		const ret: bigint = bindings.ChannelManager_compute_inflight_htlcs(this.ptr);
		const ret_hu_conv: InFlightHtlcs = new InFlightHtlcs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageSendEventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageSendEventsProvider must be freed before this_arg is
	 */
	public as_MessageSendEventsProvider(): MessageSendEventsProvider {
		const ret: bigint = bindings.ChannelManager_as_MessageSendEventsProvider(this.ptr);
		const ret_hu_conv: MessageSendEventsProvider = new MessageSendEventsProvider(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventsProvider must be freed before this_arg is
	 */
	public as_EventsProvider(): EventsProvider {
		const ret: bigint = bindings.ChannelManager_as_EventsProvider(this.ptr);
		const ret_hu_conv: EventsProvider = new EventsProvider(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Listen which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Listen must be freed before this_arg is
	 */
	public as_Listen(): Listen {
		const ret: bigint = bindings.ChannelManager_as_Listen(this.ptr);
		const ret_hu_conv: Listen = new Listen(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Confirm which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Confirm must be freed before this_arg is
	 */
	public as_Confirm(): Confirm {
		const ret: bigint = bindings.ChannelManager_as_Confirm(this.ptr);
		const ret_hu_conv: Confirm = new Confirm(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Gets a [`Future`] that completes when this [`ChannelManager`] needs to be persisted.
	 * 
	 * Note that callbacks registered on the [`Future`] MUST NOT call back into this
	 * [`ChannelManager`] and should instead register actions to be taken later.
	 */
	public get_persistable_update_future(): Future {
		const ret: bigint = bindings.ChannelManager_get_persistable_update_future(this.ptr);
		const ret_hu_conv: Future = new Future(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Gets the latest best block which was connected either via the [`chain::Listen`] or
	 * [`chain::Confirm`] interfaces.
	 */
	public current_best_block(): BestBlock {
		const ret: bigint = bindings.ChannelManager_current_best_block(this.ptr);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`NodeFeatures`] flags which are provided by or required by
	 * [`ChannelManager`].
	 */
	public node_features(): NodeFeatures {
		const ret: bigint = bindings.ChannelManager_node_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`ChannelFeatures`] flags which are provided by or required by
	 * [`ChannelManager`].
	 */
	public channel_features(): ChannelFeatures {
		const ret: bigint = bindings.ChannelManager_channel_features(this.ptr);
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`ChannelTypeFeatures`] flags which are provided by or required by
	 * [`ChannelManager`].
	 */
	public channel_type_features(): ChannelTypeFeatures {
		const ret: bigint = bindings.ChannelManager_channel_type_features(this.ptr);
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`InitFeatures`] flags which are provided by or required by
	 * [`ChannelManager`].
	 */
	public init_features(): InitFeatures {
		const ret: bigint = bindings.ChannelManager_init_features(this.ptr);
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ChannelMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ChannelMessageHandler must be freed before this_arg is
	 */
	public as_ChannelMessageHandler(): ChannelMessageHandler {
		const ret: bigint = bindings.ChannelManager_as_ChannelMessageHandler(this.ptr);
		const ret_hu_conv: ChannelMessageHandler = new ChannelMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelManager object into a byte array which can be read by ChannelManager_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelManager_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
