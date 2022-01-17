import { TxOut } from '../structs/TxOut.mjs';
import { AccessError } from '../enums/AccessError.mjs';
import { COption_NoneZ } from '../enums/COption_NoneZ.mjs';
import { ChannelMonitorUpdateErr } from '../enums/ChannelMonitorUpdateErr.mjs';
import { ConfirmationTarget } from '../enums/ConfirmationTarget.mjs';
import { Level } from '../enums/Level.mjs';
import { Network } from '../enums/Network.mjs';
import { Secp256k1Error } from '../enums/Secp256k1Error.mjs';
import { ChannelConfig } from '../structs/ChannelConfig.mjs';
import { DecodeError } from '../structs/DecodeError.mjs';
import { Result_ChannelConfigDecodeErrorZ } from '../structs/Result_ChannelConfigDecodeErrorZ.mjs';
import { OutPoint } from '../structs/OutPoint.mjs';
import { Result_OutPointDecodeErrorZ } from '../structs/Result_OutPointDecodeErrorZ.mjs';
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
import { Type, TypeInterface } from '../structs/Type.mjs';
import { Option_TypeZ } from '../structs/Option_TypeZ.mjs';
import { Result_COption_TypeZDecodeErrorZ } from '../structs/Result_COption_TypeZDecodeErrorZ.mjs';
import { Result_StringErrorZ } from '../structs/Result_StringErrorZ.mjs';
import { ChannelMonitorUpdate } from '../structs/ChannelMonitorUpdate.mjs';
import { Result_ChannelMonitorUpdateDecodeErrorZ } from '../structs/Result_ChannelMonitorUpdateDecodeErrorZ.mjs';
import { HTLCUpdate } from '../structs/HTLCUpdate.mjs';
import { MonitorEvent } from '../structs/MonitorEvent.mjs';
import { Option_MonitorEventZ } from '../structs/Option_MonitorEventZ.mjs';
import { Result_COption_MonitorEventZDecodeErrorZ } from '../structs/Result_COption_MonitorEventZDecodeErrorZ.mjs';
import { Result_HTLCUpdateDecodeErrorZ } from '../structs/Result_HTLCUpdateDecodeErrorZ.mjs';
import { Result_NoneNoneZ } from '../structs/Result_NoneNoneZ.mjs';
import { TwoTuple_OutPointScriptZ } from '../structs/TwoTuple_OutPointScriptZ.mjs';
import { TwoTuple_u32ScriptZ } from '../structs/TwoTuple_u32ScriptZ.mjs';
import { TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ } from '../structs/TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ.mjs';
import { PaymentPurpose } from '../structs/PaymentPurpose.mjs';
import { Option_u64Z } from '../structs/Option_u64Z.mjs';
import { ChannelUpdate } from '../structs/ChannelUpdate.mjs';
import { NetworkUpdate } from '../structs/NetworkUpdate.mjs';
import { Option_NetworkUpdateZ } from '../structs/Option_NetworkUpdateZ.mjs';
import { RouteHop } from '../structs/RouteHop.mjs';
import { RouteParameters } from '../structs/RouteParameters.mjs';
import { DelayedPaymentOutputDescriptor } from '../structs/DelayedPaymentOutputDescriptor.mjs';
import { StaticPaymentOutputDescriptor } from '../structs/StaticPaymentOutputDescriptor.mjs';
import { SpendableOutputDescriptor } from '../structs/SpendableOutputDescriptor.mjs';
import { ClosureReason } from '../structs/ClosureReason.mjs';
import { TwoTuple_usizeTransactionZ } from '../structs/TwoTuple_usizeTransactionZ.mjs';
import { TwoTuple_u32TxOutZ } from '../structs/TwoTuple_u32TxOutZ.mjs';
import { TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ } from '../structs/TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ.mjs';
import { Balance } from '../structs/Balance.mjs';
import { TwoTuple_SignatureCVec_SignatureZZ } from '../structs/TwoTuple_SignatureCVec_SignatureZZ.mjs';
import { Result_C2Tuple_SignatureCVec_SignatureZZNoneZ } from '../structs/Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.mjs';
import { Result_SignatureNoneZ } from '../structs/Result_SignatureNoneZ.mjs';
import { ClosingTransaction } from '../structs/ClosingTransaction.mjs';
import { UnsignedChannelAnnouncement } from '../structs/UnsignedChannelAnnouncement.mjs';
import { BaseSign, BaseSignInterface } from '../structs/BaseSign.mjs';
import { Sign, SignInterface } from '../structs/Sign.mjs';
import { ChannelMonitor } from '../structs/ChannelMonitor.mjs';
import { TwoTuple_BlockHashChannelMonitorZ } from '../structs/TwoTuple_BlockHashChannelMonitorZ.mjs';
import { Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ } from '../structs/Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.mjs';
import { Result_RouteHopDecodeErrorZ } from '../structs/Result_RouteHopDecodeErrorZ.mjs';
import { Route } from '../structs/Route.mjs';
import { Result_RouteDecodeErrorZ } from '../structs/Result_RouteDecodeErrorZ.mjs';
import { Result_RouteParametersDecodeErrorZ } from '../structs/Result_RouteParametersDecodeErrorZ.mjs';
import { RouteHint } from '../structs/RouteHint.mjs';
import { Payee } from '../structs/Payee.mjs';
import { Result_PayeeDecodeErrorZ } from '../structs/Result_PayeeDecodeErrorZ.mjs';
import { RouteHintHop } from '../structs/RouteHintHop.mjs';
import { Result_RouteHintDecodeErrorZ } from '../structs/Result_RouteHintDecodeErrorZ.mjs';
import { Result_RouteHintHopDecodeErrorZ } from '../structs/Result_RouteHintHopDecodeErrorZ.mjs';
import { ChannelDetails } from '../structs/ChannelDetails.mjs';
import { LightningError } from '../structs/LightningError.mjs';
import { Result_RouteLightningErrorZ } from '../structs/Result_RouteLightningErrorZ.mjs';
import { Result_NoneLightningErrorZ } from '../structs/Result_NoneLightningErrorZ.mjs';
import { TwoTuple_PublicKeyTypeZ } from '../structs/TwoTuple_PublicKeyTypeZ.mjs';
import { AcceptChannel } from '../structs/AcceptChannel.mjs';
import { OpenChannel } from '../structs/OpenChannel.mjs';
import { FundingCreated } from '../structs/FundingCreated.mjs';
import { FundingSigned } from '../structs/FundingSigned.mjs';
import { FundingLocked } from '../structs/FundingLocked.mjs';
import { AnnouncementSignatures } from '../structs/AnnouncementSignatures.mjs';
import { CommitmentUpdate } from '../structs/CommitmentUpdate.mjs';
import { RevokeAndACK } from '../structs/RevokeAndACK.mjs';
import { ClosingSigned } from '../structs/ClosingSigned.mjs';
import { Shutdown } from '../structs/Shutdown.mjs';
import { ChannelReestablish } from '../structs/ChannelReestablish.mjs';
import { ChannelAnnouncement } from '../structs/ChannelAnnouncement.mjs';
import { NodeAnnouncement } from '../structs/NodeAnnouncement.mjs';
import { ErrorMessage } from '../structs/ErrorMessage.mjs';
import { ErrorAction } from '../structs/ErrorAction.mjs';
import { QueryChannelRange } from '../structs/QueryChannelRange.mjs';
import { QueryShortChannelIds } from '../structs/QueryShortChannelIds.mjs';
import { ReplyChannelRange } from '../structs/ReplyChannelRange.mjs';
import { MessageSendEvent } from '../structs/MessageSendEvent.mjs';
import { Result_boolLightningErrorZ } from '../structs/Result_boolLightningErrorZ.mjs';
import { ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ } from '../structs/ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ.mjs';
import { PeerHandleError } from '../structs/PeerHandleError.mjs';
import { Result_CVec_u8ZPeerHandleErrorZ } from '../structs/Result_CVec_u8ZPeerHandleErrorZ.mjs';
import { Result_NonePeerHandleErrorZ } from '../structs/Result_NonePeerHandleErrorZ.mjs';
import { Result_boolPeerHandleErrorZ } from '../structs/Result_boolPeerHandleErrorZ.mjs';
import { Result_TxOutAccessErrorZ } from '../structs/Result_TxOutAccessErrorZ.mjs';
import { Result_NoneChannelMonitorUpdateErrZ } from '../structs/Result_NoneChannelMonitorUpdateErrZ.mjs';
import { Option_C2Tuple_usizeTransactionZZ } from '../structs/Option_C2Tuple_usizeTransactionZZ.mjs';
import { Option_ClosureReasonZ } from '../structs/Option_ClosureReasonZ.mjs';
import { Result_COption_ClosureReasonZDecodeErrorZ } from '../structs/Result_COption_ClosureReasonZDecodeErrorZ.mjs';
import { Option_EventZ } from '../structs/Option_EventZ.mjs';
import { Result_COption_EventZDecodeErrorZ } from '../structs/Result_COption_EventZDecodeErrorZ.mjs';
import { NodeId } from '../structs/NodeId.mjs';
import { Result_NodeIdDecodeErrorZ } from '../structs/Result_NodeIdDecodeErrorZ.mjs';
import { Result_COption_NetworkUpdateZDecodeErrorZ } from '../structs/Result_COption_NetworkUpdateZDecodeErrorZ.mjs';
import { Access, AccessInterface } from '../structs/Access.mjs';
import { Option_AccessZ } from '../structs/Option_AccessZ.mjs';
import { DirectionalChannelInfo } from '../structs/DirectionalChannelInfo.mjs';
import { Result_DirectionalChannelInfoDecodeErrorZ } from '../structs/Result_DirectionalChannelInfoDecodeErrorZ.mjs';
import { ChannelInfo } from '../structs/ChannelInfo.mjs';
import { Result_ChannelInfoDecodeErrorZ } from '../structs/Result_ChannelInfoDecodeErrorZ.mjs';
import { RoutingFees } from '../structs/RoutingFees.mjs';
import { Result_RoutingFeesDecodeErrorZ } from '../structs/Result_RoutingFeesDecodeErrorZ.mjs';
import { NetAddress } from '../structs/NetAddress.mjs';
import { NodeAnnouncementInfo } from '../structs/NodeAnnouncementInfo.mjs';
import { Result_NodeAnnouncementInfoDecodeErrorZ } from '../structs/Result_NodeAnnouncementInfoDecodeErrorZ.mjs';
import { NodeInfo } from '../structs/NodeInfo.mjs';
import { Result_NodeInfoDecodeErrorZ } from '../structs/Result_NodeInfoDecodeErrorZ.mjs';
import { NetworkGraph } from '../structs/NetworkGraph.mjs';
import { Result_NetworkGraphDecodeErrorZ } from '../structs/Result_NetworkGraphDecodeErrorZ.mjs';
import { Option_CVec_NetAddressZZ } from '../structs/Option_CVec_NetAddressZZ.mjs';
import { ScoringParameters } from '../structs/ScoringParameters.mjs';
import { Result_ScoringParametersDecodeErrorZ } from '../structs/Result_ScoringParametersDecodeErrorZ.mjs';
import { InitFeatures } from '../structs/InitFeatures.mjs';
import { Result_InitFeaturesDecodeErrorZ } from '../structs/Result_InitFeaturesDecodeErrorZ.mjs';
import { ChannelFeatures } from '../structs/ChannelFeatures.mjs';
import { Result_ChannelFeaturesDecodeErrorZ } from '../structs/Result_ChannelFeaturesDecodeErrorZ.mjs';
import { NodeFeatures } from '../structs/NodeFeatures.mjs';
import { Result_NodeFeaturesDecodeErrorZ } from '../structs/Result_NodeFeaturesDecodeErrorZ.mjs';
import { InvoiceFeatures } from '../structs/InvoiceFeatures.mjs';
import { Result_InvoiceFeaturesDecodeErrorZ } from '../structs/Result_InvoiceFeaturesDecodeErrorZ.mjs';
import { ChannelTypeFeatures } from '../structs/ChannelTypeFeatures.mjs';
import { Result_ChannelTypeFeaturesDecodeErrorZ } from '../structs/Result_ChannelTypeFeaturesDecodeErrorZ.mjs';
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
import { Result_FundingLockedDecodeErrorZ } from '../structs/Result_FundingLockedDecodeErrorZ.mjs';
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
import { UnsignedNodeAnnouncement } from '../structs/UnsignedNodeAnnouncement.mjs';
import { Result_UnsignedNodeAnnouncementDecodeErrorZ } from '../structs/Result_UnsignedNodeAnnouncementDecodeErrorZ.mjs';
import { Result_NodeAnnouncementDecodeErrorZ } from '../structs/Result_NodeAnnouncementDecodeErrorZ.mjs';
import { Result_QueryShortChannelIdsDecodeErrorZ } from '../structs/Result_QueryShortChannelIdsDecodeErrorZ.mjs';
import { ReplyShortChannelIdsEnd } from '../structs/ReplyShortChannelIdsEnd.mjs';
import { Result_ReplyShortChannelIdsEndDecodeErrorZ } from '../structs/Result_ReplyShortChannelIdsEndDecodeErrorZ.mjs';
import { Result_QueryChannelRangeDecodeErrorZ } from '../structs/Result_QueryChannelRangeDecodeErrorZ.mjs';
import { Result_ReplyChannelRangeDecodeErrorZ } from '../structs/Result_ReplyChannelRangeDecodeErrorZ.mjs';
import { GossipTimestampFilter } from '../structs/GossipTimestampFilter.mjs';
import { Result_GossipTimestampFilterDecodeErrorZ } from '../structs/Result_GossipTimestampFilterDecodeErrorZ.mjs';
import { Result_DelayedPaymentOutputDescriptorDecodeErrorZ } from '../structs/Result_DelayedPaymentOutputDescriptorDecodeErrorZ.mjs';
import { Result_StaticPaymentOutputDescriptorDecodeErrorZ } from '../structs/Result_StaticPaymentOutputDescriptorDecodeErrorZ.mjs';
import { Result_SpendableOutputDescriptorDecodeErrorZ } from '../structs/Result_SpendableOutputDescriptorDecodeErrorZ.mjs';
import { Result_SignDecodeErrorZ } from '../structs/Result_SignDecodeErrorZ.mjs';
import { Result_RecoverableSignatureNoneZ } from '../structs/Result_RecoverableSignatureNoneZ.mjs';
import { Result_CVec_CVec_u8ZZNoneZ } from '../structs/Result_CVec_CVec_u8ZZNoneZ.mjs';
import { InMemorySigner } from '../structs/InMemorySigner.mjs';
import { Result_InMemorySignerDecodeErrorZ } from '../structs/Result_InMemorySignerDecodeErrorZ.mjs';
import { Result_TransactionNoneZ } from '../structs/Result_TransactionNoneZ.mjs';
import { WatchedOutput } from '../structs/WatchedOutput.mjs';
import { Filter, FilterInterface } from '../structs/Filter.mjs';
import { Option_FilterZ } from '../structs/Option_FilterZ.mjs';
import { LockedChannelMonitor } from '../structs/LockedChannelMonitor.mjs';
import { Result_LockedChannelMonitorNoneZ } from '../structs/Result_LockedChannelMonitorNoneZ.mjs';
import { APIError } from '../structs/APIError.mjs';
import { Result_NoneAPIErrorZ } from '../structs/Result_NoneAPIErrorZ.mjs';
import { Option_u16Z } from '../structs/Option_u16Z.mjs';
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
import { Watch, WatchInterface } from '../structs/Watch.mjs';
import { BroadcasterInterface, BroadcasterInterfaceInterface } from '../structs/BroadcasterInterface.mjs';
import { KeysInterface, KeysInterfaceInterface } from '../structs/KeysInterface.mjs';
import { FeeEstimator, FeeEstimatorInterface } from '../structs/FeeEstimator.mjs';
import { Record } from '../structs/Record.mjs';
import { Logger, LoggerInterface } from '../structs/Logger.mjs';
import { ChannelManager } from '../structs/ChannelManager.mjs';
import { TwoTuple_BlockHashChannelManagerZ } from '../structs/TwoTuple_BlockHashChannelManagerZ.mjs';
import { Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ } from '../structs/Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.mjs';
import { MessageSendEventsProvider, MessageSendEventsProviderInterface } from '../structs/MessageSendEventsProvider.mjs';
import { EventHandler, EventHandlerInterface } from '../structs/EventHandler.mjs';
import { EventsProvider, EventsProviderInterface } from '../structs/EventsProvider.mjs';
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
import { ChainParameters } from '../structs/ChainParameters.mjs';
import { CounterpartyForwardingInfo } from '../structs/CounterpartyForwardingInfo.mjs';
import { ChannelCounterparty } from '../structs/ChannelCounterparty.mjs';
import { ChannelMessageHandler, ChannelMessageHandlerInterface } from '../structs/ChannelMessageHandler.mjs';
import { ChannelManagerReadArgs } from '../structs/ChannelManagerReadArgs.mjs';
import { DataLossProtect } from '../structs/DataLossProtect.mjs';
import { RoutingMessageHandler, RoutingMessageHandlerInterface } from '../structs/RoutingMessageHandler.mjs';
import { CustomMessageReader, CustomMessageReaderInterface } from '../structs/CustomMessageReader.mjs';
import { CustomMessageHandler, CustomMessageHandlerInterface } from '../structs/CustomMessageHandler.mjs';
import { IgnoringMessageHandler } from '../structs/IgnoringMessageHandler.mjs';
import { ErroringMessageHandler } from '../structs/ErroringMessageHandler.mjs';
import { MessageHandler } from '../structs/MessageHandler.mjs';
import { SocketDescriptor, SocketDescriptorInterface } from '../structs/SocketDescriptor.mjs';
import { PeerManager } from '../structs/PeerManager.mjs';
import { DirectedChannelTransactionParameters } from '../structs/DirectedChannelTransactionParameters.mjs';
import { ReadOnlyNetworkGraph } from '../structs/ReadOnlyNetworkGraph.mjs';
import { NetGraphMsgHandler } from '../structs/NetGraphMsgHandler.mjs';
import { Score, ScoreInterface } from '../structs/Score.mjs';
import { LockableScore, LockableScoreInterface } from '../structs/LockableScore.mjs';
import { MultiThreadedLockableScore } from '../structs/MultiThreadedLockableScore.mjs';

import CommonBase from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An Event which you should probably take some action in response to.
 * 
 * Note that while Writeable and Readable are implemented for Event, you probably shouldn't use
 * them directly as they don't round-trip exactly (for example FundingGenerationReady is never
 * written as it makes no sense to respond to it after reconnecting to peers).
 */
export class Event extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr, bindings.Event_free); }
	/* @internal */
	public static constr_from_ptr(ptr: number): Event {
		const raw_ty: number = bindings.LDKEvent_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Event_FundingGenerationReady(ptr);
			case 1: return new Event_PaymentReceived(ptr);
			case 2: return new Event_PaymentSent(ptr);
			case 3: return new Event_PaymentPathFailed(ptr);
			case 4: return new Event_PaymentFailed(ptr);
			case 5: return new Event_PendingHTLCsForwardable(ptr);
			case 6: return new Event_SpendableOutputs(ptr);
			case 7: return new Event_PaymentForwarded(ptr);
			case 8: return new Event_ChannelClosed(ptr);
			case 9: return new Event_DiscardFunding(ptr);
			case 10: return new Event_PaymentPathSuccessful(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): number {
		const ret: number = bindings.Event_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Event
	 */
	public clone(): Event {
		const ret: number = bindings.Event_clone(this.ptr);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingGenerationReady-variant Event
	 */
	public static constructor_funding_generation_ready(temporary_channel_id: Uint8Array, channel_value_satoshis: bigint, output_script: Uint8Array, user_channel_id: bigint): Event {
		const ret: number = bindings.Event_funding_generation_ready(bindings.encodeUint8Array(bindings.check_arr_len(temporary_channel_id, 32)), channel_value_satoshis, bindings.encodeUint8Array(output_script), user_channel_id);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentReceived-variant Event
	 */
	public static constructor_payment_received(payment_hash: Uint8Array, amt: bigint, purpose: PaymentPurpose): Event {
		const ret: number = bindings.Event_payment_received(bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), amt, CommonBase.get_ptr_of(purpose));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentSent-variant Event
	 */
	public static constructor_payment_sent(payment_id: Uint8Array, payment_preimage: Uint8Array, payment_hash: Uint8Array, fee_paid_msat: Option_u64Z): Event {
		const ret: number = bindings.Event_payment_sent(bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(payment_preimage, 32)), bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), CommonBase.get_ptr_of(fee_paid_msat));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathFailed-variant Event
	 */
	public static constructor_payment_path_failed(payment_id: Uint8Array, payment_hash: Uint8Array, rejected_by_dest: boolean, network_update: Option_NetworkUpdateZ, all_paths_failed: boolean, path: RouteHop[], short_channel_id: Option_u64Z, retry: RouteParameters): Event {
		const ret: number = bindings.Event_payment_path_failed(bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), rejected_by_dest, CommonBase.get_ptr_of(network_update), all_paths_failed, bindings.encodeUint32Array(path != null ? path.map(path_conv_10 => path_conv_10 == null ? 0 : CommonBase.get_ptr_of(path_conv_10) & ~1) : null), CommonBase.get_ptr_of(short_channel_id), retry == null ? 0 : CommonBase.get_ptr_of(retry) & ~1);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentFailed-variant Event
	 */
	public static constructor_payment_failed(payment_id: Uint8Array, payment_hash: Uint8Array): Event {
		const ret: number = bindings.Event_payment_failed(bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PendingHTLCsForwardable-variant Event
	 */
	public static constructor_pending_htlcs_forwardable(time_forwardable: bigint): Event {
		const ret: number = bindings.Event_pending_htlcs_forwardable(time_forwardable);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpendableOutputs-variant Event
	 */
	public static constructor_spendable_outputs(outputs: SpendableOutputDescriptor[]): Event {
		const ret: number = bindings.Event_spendable_outputs(bindings.encodeUint32Array(outputs != null ? outputs.map(outputs_conv_27 => CommonBase.get_ptr_of(outputs_conv_27)) : null));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentForwarded-variant Event
	 */
	public static constructor_payment_forwarded(fee_earned_msat: Option_u64Z, claim_from_onchain_tx: boolean): Event {
		const ret: number = bindings.Event_payment_forwarded(CommonBase.get_ptr_of(fee_earned_msat), claim_from_onchain_tx);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant Event
	 */
	public static constructor_channel_closed(channel_id: Uint8Array, user_channel_id: bigint, reason: ClosureReason): Event {
		const ret: number = bindings.Event_channel_closed(bindings.encodeUint8Array(bindings.check_arr_len(channel_id, 32)), user_channel_id, CommonBase.get_ptr_of(reason));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DiscardFunding-variant Event
	 */
	public static constructor_discard_funding(channel_id: Uint8Array, transaction: Uint8Array): Event {
		const ret: number = bindings.Event_discard_funding(bindings.encodeUint8Array(bindings.check_arr_len(channel_id, 32)), bindings.encodeUint8Array(transaction));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathSuccessful-variant Event
	 */
	public static constructor_payment_path_successful(payment_id: Uint8Array, payment_hash: Uint8Array, path: RouteHop[]): Event {
		const ret: number = bindings.Event_payment_path_successful(bindings.encodeUint8Array(bindings.check_arr_len(payment_id, 32)), bindings.encodeUint8Array(bindings.check_arr_len(payment_hash, 32)), bindings.encodeUint32Array(path != null ? path.map(path_conv_10 => path_conv_10 == null ? 0 : CommonBase.get_ptr_of(path_conv_10) & ~1) : null));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
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
	 * ChannelManager::funding_transaction_generated.
	 */
	public temporary_channel_id: Uint8Array;
	/**
	 * The value, in satoshis, that the output should have.
	 */
	public channel_value_satoshis: bigint;
	/**
	 * The script which should be used in the transaction output.
	 */
	public output_script: Uint8Array;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`], or 0 for
	 * an inbound channel.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 */
	public user_channel_id: bigint;
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		const temporary_channel_id: number = bindings.LDKEvent_FundingGenerationReady_get_temporary_channel_id(ptr);
		const temporary_channel_id_conv: Uint8Array = bindings.decodeUint8Array(temporary_channel_id);
		this.temporary_channel_id = temporary_channel_id_conv;
		this.channel_value_satoshis = bindings.LDKEvent_FundingGenerationReady_get_channel_value_satoshis(ptr);
		const output_script: number = bindings.LDKEvent_FundingGenerationReady_get_output_script(ptr);
		const output_script_conv: Uint8Array = bindings.decodeUint8Array(output_script);
		this.output_script = output_script_conv;
		this.user_channel_id = bindings.LDKEvent_FundingGenerationReady_get_user_channel_id(ptr);
	}
}
/** A Event of type PaymentReceived */
export class Event_PaymentReceived extends Event {
	/**
	 * The hash for which the preimage should be handed to the ChannelManager. Note that LDK will
	 * not stop you from registering duplicate payment hashes for inbound payments.
	 */
	public payment_hash: Uint8Array;
	/**
	 * The value, in thousandths of a satoshi, that this payment is for.
	 */
	public amt: bigint;
	/**
	 * Information for claiming this received payment, based on whether the purpose of the
	 * payment is to pay an invoice or to send a spontaneous payment.
	 */
	public purpose: PaymentPurpose;
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		const payment_hash: number = bindings.LDKEvent_PaymentReceived_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		this.amt = bindings.LDKEvent_PaymentReceived_get_amt(ptr);
		const purpose: number = bindings.LDKEvent_PaymentReceived_get_purpose(ptr);
		const purpose_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(purpose);
			CommonBase.add_ref_from(purpose_hu_conv, this);
		this.purpose = purpose_hu_conv;
	}
}
/** A Event of type PaymentSent */
export class Event_PaymentSent extends Event {
	/**
	 * The id returned by [`ChannelManager::send_payment`] and used with
	 * [`ChannelManager::retry_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`ChannelManager::retry_payment`]: crate::ln::channelmanager::ChannelManager::retry_payment
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public payment_id: Uint8Array;
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
	 * The total fee which was spent at intermediate hops in this payment, across all paths.
	 * 
	 * Note that, like [`Route::get_total_fees`] this does *not* include any potential
	 * overpayment to the recipient node.
	 * 
	 * If the recipient or an intermediate node misbehaves and gives us free money, this may
	 * overstate the amount paid, though this is unlikely.
	 * 
	 * [`Route::get_total_fees`]: crate::routing::router::Route::get_total_fees
	 */
	public fee_paid_msat: Option_u64Z;
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_PaymentSent_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_preimage: number = bindings.LDKEvent_PaymentSent_get_payment_preimage(ptr);
		const payment_preimage_conv: Uint8Array = bindings.decodeUint8Array(payment_preimage);
		this.payment_preimage = payment_preimage_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentSent_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const fee_paid_msat: number = bindings.LDKEvent_PaymentSent_get_fee_paid_msat(ptr);
		const fee_paid_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(fee_paid_msat);
			CommonBase.add_ref_from(fee_paid_msat_hu_conv, this);
		this.fee_paid_msat = fee_paid_msat_hu_conv;
	}
}
/** A Event of type PaymentPathFailed */
export class Event_PaymentPathFailed extends Event {
	/**
	 * The id returned by [`ChannelManager::send_payment`] and used with
	 * [`ChannelManager::retry_payment`] and [`ChannelManager::abandon_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`ChannelManager::retry_payment`]: crate::ln::channelmanager::ChannelManager::retry_payment
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_hash: Uint8Array;
	/**
	 * Indicates the payment was rejected for some reason by the recipient. This implies that
	 * the payment has failed, not just the route in question. If this is not set, you may
	 * retry the payment via a different route.
	 */
	public rejected_by_dest: boolean;
	/**
	 * Any failure information conveyed via the Onion return packet by a node along the failed
	 * payment route.
	 * 
	 * Should be applied to the [`NetworkGraph`] so that routing decisions can take into
	 * account the update. [`NetGraphMsgHandler`] is capable of doing this.
	 * 
	 * [`NetworkGraph`]: crate::routing::network_graph::NetworkGraph
	 * [`NetGraphMsgHandler`]: crate::routing::network_graph::NetGraphMsgHandler
	 */
	public network_update: Option_NetworkUpdateZ;
	/**
	 * For both single-path and multi-path payments, this is set if all paths of the payment have
	 * failed. This will be set to false if (1) this is an MPP payment and (2) other parts of the
	 * larger MPP payment were still in flight when this event was generated.
	 * 
	 * Note that if you are retrying individual MPP parts, using this value to determine if a
	 * payment has fully failed is race-y. Because multiple failures can happen prior to events
	 * being processed, you may retry in response to a first failure, with a second failure
	 * (with `all_paths_failed` set) still pending. Then, when the second failure is processed
	 * you will see `all_paths_failed` set even though the retry of the first failure still
	 * has an associated in-flight HTLC. See (1) for an example of such a failure.
	 * 
	 * If you wish to retry individual MPP parts and learn when a payment has failed, you must
	 * call [`ChannelManager::abandon_payment`] and wait for a [`Event::PaymentFailed`] event.
	 * 
	 * (1) <https://github.com/lightningdevkit/rust-lightning/issues/1164>
	 * 
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public all_paths_failed: boolean;
	/**
	 * The payment path that failed.
	 */
	public path: RouteHop[];
	/**
	 * The channel responsible for the failed payment path.
	 * 
	 * If this is `Some`, then the corresponding channel should be avoided when the payment is
	 * retried. May be `None` for older [`Event`] serializations.
	 */
	public short_channel_id: Option_u64Z;
	/**
	 * Parameters needed to compute a new [`Route`] when retrying the failed payment path.
	 * 
	 * See [`find_route`] for details.
	 * 
	 * [`Route`]: crate::routing::router::Route
	 * [`find_route`]: crate::routing::router::find_route
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public retry: RouteParameters;
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_PaymentPathFailed_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentPathFailed_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		this.rejected_by_dest = bindings.LDKEvent_PaymentPathFailed_get_rejected_by_dest(ptr);
		const network_update: number = bindings.LDKEvent_PaymentPathFailed_get_network_update(ptr);
		const network_update_hu_conv: Option_NetworkUpdateZ = Option_NetworkUpdateZ.constr_from_ptr(network_update);
			CommonBase.add_ref_from(network_update_hu_conv, this);
		this.network_update = network_update_hu_conv;
		this.all_paths_failed = bindings.LDKEvent_PaymentPathFailed_get_all_paths_failed(ptr);
		const path: number = bindings.LDKEvent_PaymentPathFailed_get_path(ptr);
		const path_conv_10_len: number = bindings.getArrayLength(path);
			const path_conv_10_arr: RouteHop[] = new Array(path_conv_10_len).fill(null);
			for (var k = 0; k < path_conv_10_len; k++) {
				const path_conv_10: number = bindings.getU32ArrayElem(path, k);
				const path_conv_10_hu_conv: RouteHop = new RouteHop(null, path_conv_10);
				CommonBase.add_ref_from(path_conv_10_hu_conv, this);
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
			bindings.freeWasmMemory(path)
		this.path = path_conv_10_arr;
		const short_channel_id: number = bindings.LDKEvent_PaymentPathFailed_get_short_channel_id(ptr);
		const short_channel_id_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(short_channel_id);
			CommonBase.add_ref_from(short_channel_id_hu_conv, this);
		this.short_channel_id = short_channel_id_hu_conv;
		const retry: number = bindings.LDKEvent_PaymentPathFailed_get_retry(ptr);
		const retry_hu_conv: RouteParameters = new RouteParameters(null, retry);
			CommonBase.add_ref_from(retry_hu_conv, this);
		this.retry = retry_hu_conv;
	}
}
/** A Event of type PaymentFailed */
export class Event_PaymentFailed extends Event {
	/**
	 * The id returned by [`ChannelManager::send_payment`] and used with
	 * [`ChannelManager::retry_payment`] and [`ChannelManager::abandon_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`ChannelManager::retry_payment`]: crate::ln::channelmanager::ChannelManager::retry_payment
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_hash: Uint8Array;
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_PaymentFailed_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentFailed_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
	}
}
/** A Event of type PendingHTLCsForwardable */
export class Event_PendingHTLCsForwardable extends Event {
	/**
	 * The minimum amount of time that should be waited prior to calling
	 * process_pending_htlc_forwards. To increase the effort required to correlate payments,
	 * you should wait a random amount of time in roughly the range (now + time_forwardable,
	 * now + 5*time_forwardable).
	 */
	public time_forwardable: bigint;
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		this.time_forwardable = bindings.LDKEvent_PendingHTLCsForwardable_get_time_forwardable(ptr);
	}
}
/** A Event of type SpendableOutputs */
export class Event_SpendableOutputs extends Event {
	/**
	 * The outputs which you should store as spendable by you.
	 */
	public outputs: SpendableOutputDescriptor[];
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		const outputs: number = bindings.LDKEvent_SpendableOutputs_get_outputs(ptr);
		const outputs_conv_27_len: number = bindings.getArrayLength(outputs);
			const outputs_conv_27_arr: SpendableOutputDescriptor[] = new Array(outputs_conv_27_len).fill(null);
			for (var b = 0; b < outputs_conv_27_len; b++) {
				const outputs_conv_27: number = bindings.getU32ArrayElem(outputs, b);
				const outputs_conv_27_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(outputs_conv_27);
				CommonBase.add_ref_from(outputs_conv_27_hu_conv, this);
				outputs_conv_27_arr[b] = outputs_conv_27_hu_conv;
			}
			bindings.freeWasmMemory(outputs)
		this.outputs = outputs_conv_27_arr;
	}
}
/** A Event of type PaymentForwarded */
export class Event_PaymentForwarded extends Event {
	/**
	 * The fee, in milli-satoshis, which was earned as a result of the payment.
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
	 * `PaymentForwarded` events are generated for the same payment iff `fee_earned_msat` is
	 * `None`.
	 */
	public fee_earned_msat: Option_u64Z;
	/**
	 * If this is `true`, the forwarded HTLC was claimed by our counterparty via an on-chain
	 * transaction.
	 */
	public claim_from_onchain_tx: boolean;
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		const fee_earned_msat: number = bindings.LDKEvent_PaymentForwarded_get_fee_earned_msat(ptr);
		const fee_earned_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(fee_earned_msat);
			CommonBase.add_ref_from(fee_earned_msat_hu_conv, this);
		this.fee_earned_msat = fee_earned_msat_hu_conv;
		this.claim_from_onchain_tx = bindings.LDKEvent_PaymentForwarded_get_claim_from_onchain_tx(ptr);
	}
}
/** A Event of type ChannelClosed */
export class Event_ChannelClosed extends Event {
	/**
	 * The channel_id of the channel which has been closed. Note that on-chain transactions
	 * resolving the channel are likely still awaiting confirmation.
	 */
	public channel_id: Uint8Array;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`], or 0 for
	 * an inbound channel. This will always be zero for objects serialized with LDK versions
	 * prior to 0.0.102.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 */
	public user_channel_id: bigint;
	/**
	 * The reason the channel was closed.
	 */
	public reason: ClosureReason;
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		const channel_id: number = bindings.LDKEvent_ChannelClosed_get_channel_id(ptr);
		const channel_id_conv: Uint8Array = bindings.decodeUint8Array(channel_id);
		this.channel_id = channel_id_conv;
		this.user_channel_id = bindings.LDKEvent_ChannelClosed_get_user_channel_id(ptr);
		const reason: number = bindings.LDKEvent_ChannelClosed_get_reason(ptr);
		const reason_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(reason);
			CommonBase.add_ref_from(reason_hu_conv, this);
		this.reason = reason_hu_conv;
	}
}
/** A Event of type DiscardFunding */
export class Event_DiscardFunding extends Event {
	/**
	 * The channel_id of the channel which has been closed.
	 */
	public channel_id: Uint8Array;
	/**
	 * The full transaction received from the user
	 */
	public transaction: Uint8Array;
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		const channel_id: number = bindings.LDKEvent_DiscardFunding_get_channel_id(ptr);
		const channel_id_conv: Uint8Array = bindings.decodeUint8Array(channel_id);
		this.channel_id = channel_id_conv;
		const transaction: number = bindings.LDKEvent_DiscardFunding_get_transaction(ptr);
		const transaction_conv: Uint8Array = bindings.decodeUint8Array(transaction);
		this.transaction = transaction_conv;
	}
}
/** A Event of type PaymentPathSuccessful */
export class Event_PaymentPathSuccessful extends Event {
	/**
	 * The id returned by [`ChannelManager::send_payment`] and used with
	 * [`ChannelManager::retry_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`ChannelManager::retry_payment`]: crate::ln::channelmanager::ChannelManager::retry_payment
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public payment_hash: Uint8Array;
	/**
	 * The payment path that was successful.
	 * 
	 * May contain a closed channel if the HTLC sent along the path was fulfilled on chain.
	 */
	public path: RouteHop[];
	/* @internal */
	public constructor(ptr: number) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_PaymentPathSuccessful_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentPathSuccessful_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const path: number = bindings.LDKEvent_PaymentPathSuccessful_get_path(ptr);
		const path_conv_10_len: number = bindings.getArrayLength(path);
			const path_conv_10_arr: RouteHop[] = new Array(path_conv_10_len).fill(null);
			for (var k = 0; k < path_conv_10_len; k++) {
				const path_conv_10: number = bindings.getU32ArrayElem(path, k);
				const path_conv_10_hu_conv: RouteHop = new RouteHop(null, path_conv_10);
				CommonBase.add_ref_from(path_conv_10_hu_conv, this);
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
			bindings.freeWasmMemory(path)
		this.path = path_conv_10_arr;
	}
}
