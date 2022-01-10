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
import * as InternalUtils from '../InternalUtils.mjs'

export class Event extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr, bindings.Event_free); }
	/* @internal */
	public static constr_from_ptr(ptr: number): Event {
		const raw_val: bindings.LDKEvent = bindings.LDKEvent_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKEvent_FundingGenerationReady) {
			return new Event_FundingGenerationReady(ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent_PaymentReceived) {
			return new Event_PaymentReceived(ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent_PaymentSent) {
			return new Event_PaymentSent(ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent_PaymentPathFailed) {
			return new Event_PaymentPathFailed(ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent_PaymentFailed) {
			return new Event_PaymentFailed(ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent_PendingHTLCsForwardable) {
			return new Event_PendingHTLCsForwardable(ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent_SpendableOutputs) {
			return new Event_SpendableOutputs(ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent_PaymentForwarded) {
			return new Event_PaymentForwarded(ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent_ChannelClosed) {
			return new Event_ChannelClosed(ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent_DiscardFunding) {
			return new Event_DiscardFunding(ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent_PaymentPathSuccessful) {
			return new Event_PaymentPathSuccessful(ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

	public clone_ptr(): number {
		const ret: number = bindings.Event_clone_ptr(this.ptr);
		return ret;
	}

	public clone(): Event {
		const ret: number = bindings.Event_clone(this.ptr);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public static constructor_funding_generation_ready(temporary_channel_id: Uint8Array, channel_value_satoshis: number, output_script: Uint8Array, user_channel_id: number): Event {
		const ret: number = bindings.Event_funding_generation_ready(InternalUtils.check_arr_len(temporary_channel_id, 32), channel_value_satoshis, output_script, user_channel_id);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public static constructor_payment_received(payment_hash: Uint8Array, amt: number, purpose: PaymentPurpose): Event {
		const ret: number = bindings.Event_payment_received(InternalUtils.check_arr_len(payment_hash, 32), amt, CommonBase.get_ptr_of(purpose));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public static constructor_payment_sent(payment_id: Uint8Array, payment_preimage: Uint8Array, payment_hash: Uint8Array, fee_paid_msat: Option_u64Z): Event {
		const ret: number = bindings.Event_payment_sent(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_preimage, 32), InternalUtils.check_arr_len(payment_hash, 32), CommonBase.get_ptr_of(fee_paid_msat));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public static constructor_payment_path_failed(payment_id: Uint8Array, payment_hash: Uint8Array, rejected_by_dest: boolean, network_update: Option_NetworkUpdateZ, all_paths_failed: boolean, path: RouteHop[], short_channel_id: Option_u64Z, retry: RouteParameters): Event {
		const ret: number = bindings.Event_payment_path_failed(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), rejected_by_dest, CommonBase.get_ptr_of(network_update), all_paths_failed, path != null ? path.map(path_conv_10 => path_conv_10 == null ? 0 : CommonBase.get_ptr_of(path_conv_10) & ~1) : null, CommonBase.get_ptr_of(short_channel_id), retry == null ? 0 : CommonBase.get_ptr_of(retry) & ~1);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public static constructor_payment_failed(payment_id: Uint8Array, payment_hash: Uint8Array): Event {
		const ret: number = bindings.Event_payment_failed(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public static constructor_pending_htlcs_forwardable(time_forwardable: number): Event {
		const ret: number = bindings.Event_pending_htlcs_forwardable(time_forwardable);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public static constructor_spendable_outputs(outputs: SpendableOutputDescriptor[]): Event {
		const ret: number = bindings.Event_spendable_outputs(outputs != null ? outputs.map(outputs_conv_27 => CommonBase.get_ptr_of(outputs_conv_27)) : null);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public static constructor_payment_forwarded(fee_earned_msat: Option_u64Z, claim_from_onchain_tx: boolean): Event {
		const ret: number = bindings.Event_payment_forwarded(CommonBase.get_ptr_of(fee_earned_msat), claim_from_onchain_tx);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public static constructor_channel_closed(channel_id: Uint8Array, user_channel_id: number, reason: ClosureReason): Event {
		const ret: number = bindings.Event_channel_closed(InternalUtils.check_arr_len(channel_id, 32), user_channel_id, CommonBase.get_ptr_of(reason));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public static constructor_discard_funding(channel_id: Uint8Array, transaction: Uint8Array): Event {
		const ret: number = bindings.Event_discard_funding(InternalUtils.check_arr_len(channel_id, 32), transaction);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public static constructor_payment_path_successful(payment_id: Uint8Array, payment_hash: Uint8Array, path: RouteHop[]): Event {
		const ret: number = bindings.Event_payment_path_successful(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), path != null ? path.map(path_conv_10 => path_conv_10 == null ? 0 : CommonBase.get_ptr_of(path_conv_10) & ~1) : null);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public write(): Uint8Array {
		const ret: Uint8Array = bindings.Event_write(this.ptr);
		return ret;
	}

}
export class Event_FundingGenerationReady extends Event {
	public temporary_channel_id: Uint8Array;
	public channel_value_satoshis: number;
	public output_script: Uint8Array;
	public user_channel_id: number;
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_FundingGenerationReady) {
		super(null, ptr);
		this.temporary_channel_id = obj.temporary_channel_id;
		this.channel_value_satoshis = obj.channel_value_satoshis;
		this.output_script = obj.output_script;
		this.user_channel_id = obj.user_channel_id;
	}
}
export class Event_PaymentReceived extends Event {
	public payment_hash: Uint8Array;
	public amt: number;
	public purpose: PaymentPurpose;
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_PaymentReceived) {
		super(null, ptr);
		this.payment_hash = obj.payment_hash;
		this.amt = obj.amt;
		const purpose: number = obj.purpose;
		const purpose_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(purpose);
			CommonBase.add_ref_from(purpose_hu_conv, this);
		this.purpose = purpose_hu_conv;
	}
}
export class Event_PaymentSent extends Event {
	public payment_id: Uint8Array;
	public payment_preimage: Uint8Array;
	public payment_hash: Uint8Array;
	public fee_paid_msat: Option_u64Z;
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_PaymentSent) {
		super(null, ptr);
		this.payment_id = obj.payment_id;
		this.payment_preimage = obj.payment_preimage;
		this.payment_hash = obj.payment_hash;
		const fee_paid_msat: number = obj.fee_paid_msat;
		const fee_paid_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(fee_paid_msat);
			CommonBase.add_ref_from(fee_paid_msat_hu_conv, this);
		this.fee_paid_msat = fee_paid_msat_hu_conv;
	}
}
export class Event_PaymentPathFailed extends Event {
	public payment_id: Uint8Array;
	public payment_hash: Uint8Array;
	public rejected_by_dest: boolean;
	public network_update: Option_NetworkUpdateZ;
	public all_paths_failed: boolean;
	public path: RouteHop[];
	public short_channel_id: Option_u64Z;
	public retry: RouteParameters;
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_PaymentPathFailed) {
		super(null, ptr);
		this.payment_id = obj.payment_id;
		this.payment_hash = obj.payment_hash;
		this.rejected_by_dest = obj.rejected_by_dest;
		const network_update: number = obj.network_update;
		const network_update_hu_conv: Option_NetworkUpdateZ = Option_NetworkUpdateZ.constr_from_ptr(network_update);
			CommonBase.add_ref_from(network_update_hu_conv, this);
		this.network_update = network_update_hu_conv;
		this.all_paths_failed = obj.all_paths_failed;
		const path: number[] = obj.path;
		const path_conv_10_arr: RouteHop[] = new Array(path.length).fill(null);
			for (var k = 0; k < path.length; k++) {
				const path_conv_10: number = path[k];
				const path_conv_10_hu_conv: RouteHop = new RouteHop(null, path_conv_10);
				CommonBase.add_ref_from(path_conv_10_hu_conv, this);
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
		this.path = path_conv_10_arr;
		const short_channel_id: number = obj.short_channel_id;
		const short_channel_id_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(short_channel_id);
			CommonBase.add_ref_from(short_channel_id_hu_conv, this);
		this.short_channel_id = short_channel_id_hu_conv;
		const retry: number = obj.retry;
		const retry_hu_conv: RouteParameters = new RouteParameters(null, retry);
			CommonBase.add_ref_from(retry_hu_conv, this);
		this.retry = retry_hu_conv;
	}
}
export class Event_PaymentFailed extends Event {
	public payment_id: Uint8Array;
	public payment_hash: Uint8Array;
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_PaymentFailed) {
		super(null, ptr);
		this.payment_id = obj.payment_id;
		this.payment_hash = obj.payment_hash;
	}
}
export class Event_PendingHTLCsForwardable extends Event {
	public time_forwardable: number;
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_PendingHTLCsForwardable) {
		super(null, ptr);
		this.time_forwardable = obj.time_forwardable;
	}
}
export class Event_SpendableOutputs extends Event {
	public outputs: SpendableOutputDescriptor[];
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_SpendableOutputs) {
		super(null, ptr);
		const outputs: number[] = obj.outputs;
		const outputs_conv_27_arr: SpendableOutputDescriptor[] = new Array(outputs.length).fill(null);
			for (var b = 0; b < outputs.length; b++) {
				const outputs_conv_27: number = outputs[b];
				const outputs_conv_27_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(outputs_conv_27);
				CommonBase.add_ref_from(outputs_conv_27_hu_conv, this);
				outputs_conv_27_arr[b] = outputs_conv_27_hu_conv;
			}
		this.outputs = outputs_conv_27_arr;
	}
}
export class Event_PaymentForwarded extends Event {
	public fee_earned_msat: Option_u64Z;
	public claim_from_onchain_tx: boolean;
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_PaymentForwarded) {
		super(null, ptr);
		const fee_earned_msat: number = obj.fee_earned_msat;
		const fee_earned_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(fee_earned_msat);
			CommonBase.add_ref_from(fee_earned_msat_hu_conv, this);
		this.fee_earned_msat = fee_earned_msat_hu_conv;
		this.claim_from_onchain_tx = obj.claim_from_onchain_tx;
	}
}
export class Event_ChannelClosed extends Event {
	public channel_id: Uint8Array;
	public user_channel_id: number;
	public reason: ClosureReason;
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_ChannelClosed) {
		super(null, ptr);
		this.channel_id = obj.channel_id;
		this.user_channel_id = obj.user_channel_id;
		const reason: number = obj.reason;
		const reason_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(reason);
			CommonBase.add_ref_from(reason_hu_conv, this);
		this.reason = reason_hu_conv;
	}
}
export class Event_DiscardFunding extends Event {
	public channel_id: Uint8Array;
	public transaction: Uint8Array;
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_DiscardFunding) {
		super(null, ptr);
		this.channel_id = obj.channel_id;
		this.transaction = obj.transaction;
	}
}
export class Event_PaymentPathSuccessful extends Event {
	public payment_id: Uint8Array;
	public payment_hash: Uint8Array;
	public path: RouteHop[];
	/* @internal */
	public constructor(ptr: number, obj: bindings.LDKEvent_PaymentPathSuccessful) {
		super(null, ptr);
		this.payment_id = obj.payment_id;
		this.payment_hash = obj.payment_hash;
		const path: number[] = obj.path;
		const path_conv_10_arr: RouteHop[] = new Array(path.length).fill(null);
			for (var k = 0; k < path.length; k++) {
				const path_conv_10: number = path[k];
				const path_conv_10_hu_conv: RouteHop = new RouteHop(null, path_conv_10);
				CommonBase.add_ref_from(path_conv_10_hu_conv, this);
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
		this.path = path_conv_10_arr;
	}
}