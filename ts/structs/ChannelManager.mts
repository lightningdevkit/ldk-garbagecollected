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
import { Event } from '../structs/Event.mjs';
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


export class ChannelManager extends CommonBase {
	/* @internal */
	public constructor(_dummy: object, ptr: number) {
		super(ptr, bindings.ChannelManager_free);
	}

	public static constructor_new(fee_est: FeeEstimator, chain_monitor: Watch, tx_broadcaster: BroadcasterInterface, logger: Logger, keys_manager: KeysInterface, config: UserConfig, params: ChainParameters): ChannelManager {
		const ret: number = bindings.ChannelManager_new(fee_est == null ? 0 : CommonBase.get_ptr_of(fee_est), chain_monitor == null ? 0 : CommonBase.get_ptr_of(chain_monitor), tx_broadcaster == null ? 0 : CommonBase.get_ptr_of(tx_broadcaster), logger == null ? 0 : CommonBase.get_ptr_of(logger), keys_manager == null ? 0 : CommonBase.get_ptr_of(keys_manager), config == null ? 0 : CommonBase.get_ptr_of(config) & ~1, params == null ? 0 : CommonBase.get_ptr_of(params) & ~1);
		const ret_hu_conv: ChannelManager = new ChannelManager(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, fee_est);
		CommonBase.add_ref_from(ret_hu_conv, chain_monitor);
		CommonBase.add_ref_from(ret_hu_conv, tx_broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, keys_manager);
		return ret_hu_conv;
	}

	public get_current_default_configuration(): UserConfig {
		const ret: number = bindings.ChannelManager_get_current_default_configuration(this.ptr);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public create_channel(their_network_key: Uint8Array, channel_value_satoshis: number, push_msat: number, user_channel_id: number, override_config: UserConfig): Result__u832APIErrorZ {
		const ret: number = bindings.ChannelManager_create_channel(this.ptr, InternalUtils.check_arr_len(their_network_key, 33), channel_value_satoshis, push_msat, user_channel_id, override_config == null ? 0 : CommonBase.get_ptr_of(override_config) & ~1);
		const ret_hu_conv: Result__u832APIErrorZ = Result__u832APIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public list_channels(): ChannelDetails[] {
		const ret: number[] = bindings.ChannelManager_list_channels(this.ptr);
		const ret_conv_16_arr: ChannelDetails[] = new Array(ret.length).fill(null);
		for (var q = 0; q < ret.length; q++) {
			const ret_conv_16: number = ret[q];
			const ret_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, ret_conv_16);
			CommonBase.add_ref_from(ret_conv_16_hu_conv, this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	public list_usable_channels(): ChannelDetails[] {
		const ret: number[] = bindings.ChannelManager_list_usable_channels(this.ptr);
		const ret_conv_16_arr: ChannelDetails[] = new Array(ret.length).fill(null);
		for (var q = 0; q < ret.length; q++) {
			const ret_conv_16: number = ret[q];
			const ret_conv_16_hu_conv: ChannelDetails = new ChannelDetails(null, ret_conv_16);
			CommonBase.add_ref_from(ret_conv_16_hu_conv, this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	public close_channel(channel_id: Uint8Array): Result_NoneAPIErrorZ {
		const ret: number = bindings.ChannelManager_close_channel(this.ptr, InternalUtils.check_arr_len(channel_id, 32));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public close_channel_with_target_feerate(channel_id: Uint8Array, target_feerate_sats_per_1000_weight: number): Result_NoneAPIErrorZ {
		const ret: number = bindings.ChannelManager_close_channel_with_target_feerate(this.ptr, InternalUtils.check_arr_len(channel_id, 32), target_feerate_sats_per_1000_weight);
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public force_close_channel(channel_id: Uint8Array): Result_NoneAPIErrorZ {
		const ret: number = bindings.ChannelManager_force_close_channel(this.ptr, InternalUtils.check_arr_len(channel_id, 32));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public force_close_all_channels(): void {
		bindings.ChannelManager_force_close_all_channels(this.ptr);
	}

	public send_payment(route: Route, payment_hash: Uint8Array, payment_secret: Uint8Array): Result_PaymentIdPaymentSendFailureZ {
		const ret: number = bindings.ChannelManager_send_payment(this.ptr, route == null ? 0 : CommonBase.get_ptr_of(route) & ~1, InternalUtils.check_arr_len(payment_hash, 32), InternalUtils.check_arr_len(payment_secret, 32));
		const ret_hu_conv: Result_PaymentIdPaymentSendFailureZ = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, route);
		return ret_hu_conv;
	}

	public retry_payment(route: Route, payment_id: Uint8Array): Result_NonePaymentSendFailureZ {
		const ret: number = bindings.ChannelManager_retry_payment(this.ptr, route == null ? 0 : CommonBase.get_ptr_of(route) & ~1, InternalUtils.check_arr_len(payment_id, 32));
		const ret_hu_conv: Result_NonePaymentSendFailureZ = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, route);
		return ret_hu_conv;
	}

	public abandon_payment(payment_id: Uint8Array): void {
		bindings.ChannelManager_abandon_payment(this.ptr, InternalUtils.check_arr_len(payment_id, 32));
	}

	public send_spontaneous_payment(route: Route, payment_preimage: Uint8Array): Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ {
		const ret: number = bindings.ChannelManager_send_spontaneous_payment(this.ptr, route == null ? 0 : CommonBase.get_ptr_of(route) & ~1, InternalUtils.check_arr_len(payment_preimage, 32));
		const ret_hu_conv: Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ = Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, route);
		return ret_hu_conv;
	}

	public funding_transaction_generated(temporary_channel_id: Uint8Array, funding_transaction: Uint8Array): Result_NoneAPIErrorZ {
		const ret: number = bindings.ChannelManager_funding_transaction_generated(this.ptr, InternalUtils.check_arr_len(temporary_channel_id, 32), funding_transaction);
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public broadcast_node_announcement(rgb: Uint8Array, alias: Uint8Array, addresses: NetAddress[]): void {
		bindings.ChannelManager_broadcast_node_announcement(this.ptr, InternalUtils.check_arr_len(rgb, 3), InternalUtils.check_arr_len(alias, 32), addresses != null ? addresses.map(addresses_conv_12 => CommonBase.get_ptr_of(addresses_conv_12)) : null);
	}

	public process_pending_htlc_forwards(): void {
		bindings.ChannelManager_process_pending_htlc_forwards(this.ptr);
	}

	public timer_tick_occurred(): void {
		bindings.ChannelManager_timer_tick_occurred(this.ptr);
	}

	public fail_htlc_backwards(payment_hash: Uint8Array): boolean {
		const ret: boolean = bindings.ChannelManager_fail_htlc_backwards(this.ptr, InternalUtils.check_arr_len(payment_hash, 32));
		return ret;
	}

	public claim_funds(payment_preimage: Uint8Array): boolean {
		const ret: boolean = bindings.ChannelManager_claim_funds(this.ptr, InternalUtils.check_arr_len(payment_preimage, 32));
		return ret;
	}

	public get_our_node_id(): Uint8Array {
		const ret: Uint8Array = bindings.ChannelManager_get_our_node_id(this.ptr);
		return ret;
	}

	public create_inbound_payment(min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number): Result_C2Tuple_PaymentHashPaymentSecretZNoneZ {
		const ret: number = bindings.ChannelManager_create_inbound_payment(this.ptr, CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs);
		const ret_hu_conv: Result_C2Tuple_PaymentHashPaymentSecretZNoneZ = Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public create_inbound_payment_legacy(min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number): Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ {
		const ret: number = bindings.ChannelManager_create_inbound_payment_legacy(this.ptr, CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs);
		const ret_hu_conv: Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public create_inbound_payment_for_hash(payment_hash: Uint8Array, min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number): Result_PaymentSecretNoneZ {
		const ret: number = bindings.ChannelManager_create_inbound_payment_for_hash(this.ptr, InternalUtils.check_arr_len(payment_hash, 32), CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs);
		const ret_hu_conv: Result_PaymentSecretNoneZ = Result_PaymentSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public create_inbound_payment_for_hash_legacy(payment_hash: Uint8Array, min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number): Result_PaymentSecretAPIErrorZ {
		const ret: number = bindings.ChannelManager_create_inbound_payment_for_hash_legacy(this.ptr, InternalUtils.check_arr_len(payment_hash, 32), CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs);
		const ret_hu_conv: Result_PaymentSecretAPIErrorZ = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public get_payment_preimage(payment_hash: Uint8Array, payment_secret: Uint8Array): Result_PaymentPreimageAPIErrorZ {
		const ret: number = bindings.ChannelManager_get_payment_preimage(this.ptr, InternalUtils.check_arr_len(payment_hash, 32), InternalUtils.check_arr_len(payment_secret, 32));
		const ret_hu_conv: Result_PaymentPreimageAPIErrorZ = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public as_MessageSendEventsProvider(): MessageSendEventsProvider {
		const ret: number = bindings.ChannelManager_as_MessageSendEventsProvider(this.ptr);
		const ret_hu_conv: MessageSendEventsProvider = new MessageSendEventsProvider(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public as_EventsProvider(): EventsProvider {
		const ret: number = bindings.ChannelManager_as_EventsProvider(this.ptr);
		const ret_hu_conv: EventsProvider = new EventsProvider(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public as_Listen(): Listen {
		const ret: number = bindings.ChannelManager_as_Listen(this.ptr);
		const ret_hu_conv: Listen = new Listen(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public as_Confirm(): Confirm {
		const ret: number = bindings.ChannelManager_as_Confirm(this.ptr);
		const ret_hu_conv: Confirm = new Confirm(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public await_persistable_update(): void {
		bindings.ChannelManager_await_persistable_update(this.ptr);
	}

	public current_best_block(): BestBlock {
		const ret: number = bindings.ChannelManager_current_best_block(this.ptr);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public as_ChannelMessageHandler(): ChannelMessageHandler {
		const ret: number = bindings.ChannelManager_as_ChannelMessageHandler(this.ptr);
		const ret_hu_conv: ChannelMessageHandler = new ChannelMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public write(): Uint8Array {
		const ret: Uint8Array = bindings.ChannelManager_write(this.ptr);
		return ret;
	}

}
