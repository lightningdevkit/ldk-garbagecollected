
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A lightning node's channel state machine and payment management logic, which facilitates
 * sending, forwarding, and receiving payments through lightning channels.
 * 
 * [`ChannelManager`] is parameterized by a number of components to achieve this.
 * - [`chain::Watch`] (typically [`ChainMonitor`]) for on-chain monitoring and enforcement of each
 * channel
 * - [`BroadcasterInterface`] for broadcasting transactions related to opening, funding, and
 * closing channels
 * - [`EntropySource`] for providing random data needed for cryptographic operations
 * - [`NodeSigner`] for cryptographic operations scoped to the node
 * - [`SignerProvider`] for providing signers whose operations are scoped to individual channels
 * - [`FeeEstimator`] to determine transaction fee rates needed to have a transaction mined in a
 * timely manner
 * - [`Router`] for finding payment paths when initiating and retrying payments
 * - [`MessageRouter`] for finding message paths when initiating and retrying onion messages
 * - [`Logger`] for logging operational information of varying degrees
 * 
 * Additionally, it implements the following traits:
 * - [`ChannelMessageHandler`] to handle off-chain channel activity from peers
 * - [`BaseMessageHandler`] to handle peer dis/connection and send messages to peers
 * - [`OffersMessageHandler`] for BOLT 12 message handling and sending
 * - [`EventsProvider`] to generate user-actionable [`Event`]s
 * - [`chain::Listen`] and [`chain::Confirm`] for notification of on-chain activity
 * 
 * Thus, [`ChannelManager`] is typically used to parameterize a [`MessageHandler`] and an
 * [`OnionMessenger`]. The latter is required to support BOLT 12 functionality.
 * 
 * # `ChannelManager` vs `ChannelMonitor`
 * 
 * It's important to distinguish between the *off-chain* management and *on-chain* enforcement of
 * lightning channels. [`ChannelManager`] exchanges messages with peers to manage the off-chain
 * state of each channel. During this process, it generates a [`ChannelMonitor`] for each channel
 * and a [`ChannelMonitorUpdate`] for each relevant change, notifying its parameterized
 * [`chain::Watch`] of them.
 * 
 * An implementation of [`chain::Watch`], such as [`ChainMonitor`], is responsible for aggregating
 * these [`ChannelMonitor`]s and applying any [`ChannelMonitorUpdate`]s to them. It then monitors
 * for any pertinent on-chain activity, enforcing claims as needed.
 * 
 * This division of off-chain management and on-chain enforcement allows for interesting node
 * setups. For instance, on-chain enforcement could be moved to a separate host or have added
 * redundancy, possibly as a watchtower. See [`chain::Watch`] for the relevant interface.
 * 
 * # Initialization
 * 
 * Use [`ChannelManager::new`] with the most recent [`BlockHash`] when creating a fresh instance.
 * Otherwise, if restarting, construct [`ChannelManagerReadArgs`] with the necessary parameters and
 * references to any deserialized [`ChannelMonitor`]s that were previously persisted. Use this to
 * deserialize the [`ChannelManager`] and feed it any new chain data since it was last online, as
 * detailed in the [`ChannelManagerReadArgs`] documentation.
 * 
 * ```
 * use bitcoin::BlockHash;
 * use bitcoin::network::Network;
 * use lightning::chain::BestBlock;
 * # use lightning::chain::channelmonitor::ChannelMonitor;
 * use lightning::ln::channelmanager::{ChainParameters, ChannelManager, ChannelManagerReadArgs};
 * # use lightning::routing::gossip::NetworkGraph;
 * use lightning::util::config::UserConfig;
 * use lightning::util::ser::ReadableArgs;
 * 
 * # fn read_channel_monitors() -> Vec<ChannelMonitor<lightning::sign::InMemorySigner>> { vec![] }
 * # fn example<
 * #     'a,
 * #     L: lightning::util::logger::Logger,
 * #     ES: lightning::sign::EntropySource,
 * #     S: for <'b> lightning::routing::scoring::LockableScore<'b, ScoreLookUp = SL>,
 * #     SL: lightning::routing::scoring::ScoreLookUp<ScoreParams = SP>,
 * #     SP: Sized,
 * #     R: lightning::io::Read,
 * # >(
 * #     fee_estimator: &dyn lightning::chain::chaininterface::FeeEstimator,
 * #     chain_monitor: &dyn lightning::chain::Watch<lightning::sign::InMemorySigner>,
 * #     tx_broadcaster: &dyn lightning::chain::chaininterface::BroadcasterInterface,
 * #     router: &lightning::routing::router::DefaultRouter<&NetworkGraph<&'a L>, &'a L, &ES, &S>,
 * #     message_router: &lightning::onion_message::messenger::DefaultMessageRouter<&NetworkGraph<&'a L>, &'a L, &ES>,
 * #     logger: &L,
 * #     entropy_source: &ES,
 * #     node_signer: &dyn lightning::sign::NodeSigner,
 * #     signer_provider: &lightning::sign::DynSignerProvider,
 * #     best_block: lightning::chain::BestBlock,
 * #     current_timestamp: u32,
 * #     mut reader: R,
 * # ) -> Result<(), lightning::ln::msgs::DecodeError> {
 * Fresh start with no channels
 * let params = ChainParameters {
 * network: Network::Bitcoin,
 * best_block,
 * };
 * let config = UserConfig::default();
 * let channel_manager = ChannelManager::new(
 * fee_estimator, chain_monitor, tx_broadcaster, router, message_router, logger,
 * entropy_source, node_signer, signer_provider, config.clone(), params, current_timestamp,
 * );
 * 
 * Restart from deserialized data
 * let mut channel_monitors = read_channel_monitors();
 * let args = ChannelManagerReadArgs::new(
 * entropy_source, node_signer, signer_provider, fee_estimator, chain_monitor, tx_broadcaster,
 * router, message_router, logger, config, channel_monitors.iter().collect(),
 * );
 * let (block_hash, channel_manager) =
 * <(BlockHash, ChannelManager<_, _, _, _, _, _, _, _, _>)>::read(&mut reader, args)?;
 * 
 * Update the ChannelManager and ChannelMonitors with the latest chain data
 * ...
 * 
 * Move the monitors to the ChannelManager's chain::Watch parameter
 * for monitor in channel_monitors {
 * chain_monitor.watch_channel(monitor.channel_id(), monitor);
 * }
 * # Ok(())
 * # }
 * ```
 * 
 * # Operation
 * 
 * The following is required for [`ChannelManager`] to function properly:
 * - Handle messages from peers using its [`ChannelMessageHandler`] implementation (typically
 * called by [`PeerManager::read_event`] when processing network I/O)
 * - Process peer connections and send messages to peers obtained via its [`BaseMessageHandler`]
 * implementation (typically initiated when [`PeerManager::process_events`] is called)
 * - Feed on-chain activity using either its [`chain::Listen`] or [`chain::Confirm`] implementation
 * as documented by those traits
 * - Perform any periodic channel and payment checks by calling [`timer_tick_occurred`] roughly
 * every minute
 * - Persist to disk whenever [`get_and_clear_needs_persistence`] returns `true` using a
 * [`KVStoreSync`] implementation
 * - Handle [`Event`]s obtained via its [`EventsProvider`] implementation
 * 
 * The [`Future`] returned by [`get_event_or_persistence_needed_future`] is useful in determining
 * when the last two requirements need to be checked.
 * 
 * The [`lightning-block-sync`] and [`lightning-transaction-sync`] crates provide utilities that
 * simplify feeding in on-chain activity using the [`chain::Listen`] and [`chain::Confirm`] traits,
 * respectively. The remaining requirements can be met using the [`lightning-background-processor`]
 * crate. For languages other than Rust, the availability of similar utilities may vary.
 * 
 * # Channels
 * 
 * [`ChannelManager`]'s primary function involves managing a channel state. Without channels,
 * payments can't be sent. Use [`list_channels`] or [`list_usable_channels`] for a snapshot of the
 * currently open channels.
 * 
 * ```
 * # use lightning::ln::channelmanager::AChannelManager;
 * #
 * # fn example<T: AChannelManager>(channel_manager: T) {
 * # let channel_manager = channel_manager.get_cm();
 * let channels = channel_manager.list_usable_channels();
 * for details in channels {
 * println!(\"{:?}\", details);
 * }
 * # }
 * ```
 * 
 * Each channel is identified using a [`ChannelId`], which will change throughout the channel's
 * life cycle. Additionally, channels are assigned a `user_channel_id`, which is given in
 * [`Event`]s associated with the channel and serves as a fixed identifier but is otherwise unused
 * by [`ChannelManager`].
 * 
 * ## Opening Channels
 * 
 * To an open a channel with a peer, call [`create_channel`]. This will initiate the process of
 * opening an outbound channel, which requires self-funding when handling
 * [`Event::FundingGenerationReady`].
 * 
 * ```
 * # use bitcoin::{ScriptBuf, Transaction};
 * # use bitcoin::secp256k1::PublicKey;
 * # use lightning::ln::channelmanager::AChannelManager;
 * # use lightning::events::{Event, EventsProvider};
 * #
 * # trait Wallet {
 * #     fn create_funding_transaction(
 * #         &self, _amount_sats: u64, _output_script: ScriptBuf
 * #     ) -> Transaction;
 * # }
 * #
 * # fn example<T: AChannelManager, W: Wallet>(channel_manager: T, wallet: W, peer_id: PublicKey) {
 * # let channel_manager = channel_manager.get_cm();
 * let value_sats = 1_000_000;
 * let push_msats = 10_000_000;
 * match channel_manager.create_channel(peer_id, value_sats, push_msats, 42, None, None) {
 * Ok(channel_id) => println!(\"Opening channel {}\", channel_id),
 * Err(e) => println!(\"Error opening channel: {:?}\", e),
 * }
 * 
 * On the event processing thread once the peer has responded
 * channel_manager.process_pending_events(&|event| {
 * match event {
 * Event::FundingGenerationReady {
 * temporary_channel_id, counterparty_node_id, channel_value_satoshis, output_script,
 * user_channel_id, ..
 * } => {
 * assert_eq!(user_channel_id, 42);
 * let funding_transaction = wallet.create_funding_transaction(
 * channel_value_satoshis, output_script
 * );
 * match channel_manager.funding_transaction_generated(
 * temporary_channel_id, counterparty_node_id, funding_transaction
 * ) {
 * Ok(()) => println!(\"Funding channel {}\", temporary_channel_id),
 * Err(e) => println!(\"Error funding channel {}: {:?}\", temporary_channel_id, e),
 * }
 * },
 * Event::ChannelPending { channel_id, user_channel_id, former_temporary_channel_id, .. } => {
 * assert_eq!(user_channel_id, 42);
 * println!(
 * \"Channel {} now {} pending (funding transaction has been broadcasted)\", channel_id,
 * former_temporary_channel_id.unwrap()
 * );
 * },
 * Event::ChannelReady { channel_id, user_channel_id, .. } => {
 * assert_eq!(user_channel_id, 42);
 * println!(\"Channel {} ready\", channel_id);
 * },
 * ...
 * #     _ => {},
 * }
 * Ok(())
 * });
 * # }
 * ```
 * 
 * ## Accepting Channels
 * 
 * Inbound channels are initiated by peers and are automatically accepted unless [`ChannelManager`]
 * has [`UserConfig::manually_accept_inbound_channels`] set. In that case, the channel may be
 * either accepted or rejected when handling [`Event::OpenChannelRequest`].
 * 
 * ```
 * # use bitcoin::secp256k1::PublicKey;
 * # use lightning::ln::channelmanager::AChannelManager;
 * # use lightning::events::{Event, EventsProvider};
 * #
 * # fn is_trusted(counterparty_node_id: PublicKey) -> bool {
 * #     // ...
 * #     unimplemented!()
 * # }
 * #
 * # fn example<T: AChannelManager>(channel_manager: T) {
 * # let channel_manager = channel_manager.get_cm();
 * # let error_message = \"Channel force-closed\";
 * channel_manager.process_pending_events(&|event| {
 * match event {
 * Event::OpenChannelRequest { temporary_channel_id, counterparty_node_id, ..  } => {
 * if !is_trusted(counterparty_node_id) {
 * match channel_manager.force_close_broadcasting_latest_txn(
 * &temporary_channel_id, &counterparty_node_id, error_message.to_string()
 * ) {
 * Ok(()) => println!(\"Rejecting channel {}\", temporary_channel_id),
 * Err(e) => println!(\"Error rejecting channel {}: {:?}\", temporary_channel_id, e),
 * }
 * return Ok(());
 * }
 * 
 * let user_channel_id = 43;
 * match channel_manager.accept_inbound_channel(
 * &temporary_channel_id, &counterparty_node_id, user_channel_id, None
 * ) {
 * Ok(()) => println!(\"Accepting channel {}\", temporary_channel_id),
 * Err(e) => println!(\"Error accepting channel {}: {:?}\", temporary_channel_id, e),
 * }
 * },
 * ...
 * #     _ => {},
 * }
 * Ok(())
 * });
 * # }
 * ```
 * 
 * ## Closing Channels
 * 
 * There are two ways to close a channel: either cooperatively using [`close_channel`] or
 * unilaterally using [`force_close_broadcasting_latest_txn`]. The former is ideal as it makes for
 * lower fees and immediate access to funds. However, the latter may be necessary if the
 * counterparty isn't behaving properly or has gone offline. [`Event::ChannelClosed`] is generated
 * once the channel has been closed successfully.
 * 
 * ```
 * # use bitcoin::secp256k1::PublicKey;
 * # use lightning::ln::types::ChannelId;
 * # use lightning::ln::channelmanager::AChannelManager;
 * # use lightning::events::{Event, EventsProvider};
 * #
 * # fn example<T: AChannelManager>(
 * #     channel_manager: T, channel_id: ChannelId, counterparty_node_id: PublicKey
 * # ) {
 * # let channel_manager = channel_manager.get_cm();
 * match channel_manager.close_channel(&channel_id, &counterparty_node_id) {
 * Ok(()) => println!(\"Closing channel {}\", channel_id),
 * Err(e) => println!(\"Error closing channel {}: {:?}\", channel_id, e),
 * }
 * 
 * On the event processing thread
 * channel_manager.process_pending_events(&|event| {
 * match event {
 * Event::ChannelClosed { channel_id, user_channel_id, ..  } => {
 * assert_eq!(user_channel_id, 42);
 * println!(\"Channel {} closed\", channel_id);
 * },
 * ...
 * #     _ => {},
 * }
 * Ok(())
 * });
 * # }
 * ```
 * 
 * # Payments
 * 
 * [`ChannelManager`] is responsible for sending, forwarding, and receiving payments through its
 * channels. A payment is typically initiated from a [BOLT 11] invoice or a [BOLT 12] offer, though
 * spontaneous (i.e., keysend) payments are also possible. Incoming payments don't require
 * maintaining any additional state as [`ChannelManager`] can reconstruct the [`PaymentPreimage`]
 * from the [`PaymentSecret`]. Sending payments, however, require tracking in order to retry failed
 * HTLCs.
 * 
 * After a payment is initiated, it will appear in [`list_recent_payments`] until a short time
 * after either an [`Event::PaymentSent`] or [`Event::PaymentFailed`] is handled. Failed HTLCs
 * for a payment will be retried according to the payment's [`Retry`] strategy or until
 * [`abandon_payment`] is called.
 * 
 * ## BOLT 11 Invoices
 * 
 * The [`lightning-invoice`] crate is useful for creating BOLT 11 invoices. However, in order to
 * construct a [`Bolt11Invoice`] that is compatible with [`ChannelManager`], use
 * [`create_bolt11_invoice`]. This method serves as a convenience for building invoices with the
 * [`PaymentHash`] and [`PaymentSecret`] returned from [`create_inbound_payment`]. To provide your
 * own [`PaymentHash`], override the appropriate [`Bolt11InvoiceParameters`], which is equivalent
 * to using [`create_inbound_payment_for_hash`].
 * 
 * [`ChannelManager`] generates an [`Event::PaymentClaimable`] once the full payment has been
 * received. Call [`claim_funds`] to release the [`PaymentPreimage`], which in turn will result in
 * an [`Event::PaymentClaimed`].
 * 
 * ```
 * # use lightning::events::{Event, EventsProvider, PaymentPurpose};
 * # use lightning::ln::channelmanager::{AChannelManager, Bolt11InvoiceParameters};
 * #
 * # fn example<T: AChannelManager>(channel_manager: T) {
 * # let channel_manager = channel_manager.get_cm();
 * let params = Bolt11InvoiceParameters {
 * amount_msats: Some(10_000_000),
 * invoice_expiry_delta_secs: Some(3600),
 * ..Default::default()
 * };
 * let invoice = match channel_manager.create_bolt11_invoice(params) {
 * Ok(invoice) => {
 * println!(\"Creating invoice with payment hash {}\", invoice.payment_hash());
 * invoice
 * },
 * Err(e) => panic!(\"Error creating invoice: {}\", e),
 * };
 * 
 * On the event processing thread
 * channel_manager.process_pending_events(&|event| {
 * match event {
 * Event::PaymentClaimable { payment_hash, purpose, .. } => match purpose {
 * PaymentPurpose::Bolt11InvoicePayment { payment_preimage: Some(payment_preimage), .. } => {
 * assert_eq!(payment_hash.0, invoice.payment_hash().as_ref());
 * println!(\"Claiming payment {}\", payment_hash);
 * channel_manager.claim_funds(payment_preimage);
 * },
 * PaymentPurpose::Bolt11InvoicePayment { payment_preimage: None, .. } => {
 * println!(\"Unknown payment hash: {}\", payment_hash);
 * },
 * PaymentPurpose::SpontaneousPayment(payment_preimage) => {
 * assert_ne!(payment_hash.0, invoice.payment_hash().as_ref());
 * println!(\"Claiming spontaneous payment {}\", payment_hash);
 * channel_manager.claim_funds(payment_preimage);
 * },
 * ...
 * #           _ => {},
 * },
 * Event::PaymentClaimed { payment_hash, amount_msat, .. } => {
 * assert_eq!(payment_hash.0, invoice.payment_hash().as_ref());
 * println!(\"Claimed {} msats\", amount_msat);
 * },
 * ...
 * #       _ => {},
 * }
 * Ok(())
 * });
 * # }
 * ```
 * 
 * ```
 * # use bitcoin::hashes::Hash;
 * # use lightning::events::{Event, EventsProvider};
 * # use lightning::types::payment::PaymentHash;
 * # use lightning::ln::channelmanager::{AChannelManager, PaymentId, RecentPaymentDetails};
 * # use lightning::ln::outbound_payment::Retry;
 * # use lightning::routing::router::RouteParametersConfig;
 * # use lightning_invoice::Bolt11Invoice;
 * #
 * # fn example<T: AChannelManager>(
 * #     channel_manager: T, invoice: &Bolt11Invoice, route_params_config: RouteParametersConfig,
 * #     retry: Retry
 * # ) {
 * # let channel_manager = channel_manager.get_cm();
 * # let payment_id = PaymentId([42; 32]);
 * # let payment_hash = PaymentHash((*invoice.payment_hash()).to_byte_array());
 * match channel_manager.pay_for_bolt11_invoice(
 * invoice, payment_id, None, route_params_config, retry
 * ) {
 * Ok(()) => println!(\"Sending payment with hash {}\", payment_hash),
 * Err(e) => println!(\"Failed sending payment with hash {}: {:?}\", payment_hash, e),
 * }
 * 
 * let expected_payment_id = payment_id;
 * let expected_payment_hash = payment_hash;
 * assert!(
 * channel_manager.list_recent_payments().iter().find(|details| matches!(
 * details,
 * RecentPaymentDetails::Pending {
 * payment_id: expected_payment_id,
 * payment_hash: expected_payment_hash,
 * ..
 * }
 * )).is_some()
 * );
 * 
 * On the event processing thread
 * channel_manager.process_pending_events(&|event| {
 * match event {
 * Event::PaymentSent { payment_hash, .. } => println!(\"Paid {}\", payment_hash),
 * Event::PaymentFailed { payment_hash: Some(payment_hash), .. } =>
 * println!(\"Failed paying {}\", payment_hash),
 * ...
 * #     _ => {},
 * }
 * Ok(())
 * });
 * # }
 * ```
 * 
 * ## BOLT 12 Offers
 * 
 * The [`offers`] module is useful for creating BOLT 12 offers. An [`Offer`] is a precursor to a
 * [`Bolt12Invoice`], which must first be requested by the payer. The interchange of these messages
 * as defined in the specification is handled by [`ChannelManager`] and its implementation of
 * [`OffersMessageHandler`]. However, this only works with an [`Offer`] created using a builder
 * returned by [`create_offer_builder`]. With this approach, BOLT 12 offers and invoices are
 * stateless just as BOLT 11 invoices are.
 * 
 * ```
 * # use lightning::events::{Event, EventsProvider, PaymentPurpose};
 * # use lightning::ln::channelmanager::AChannelManager;
 * # use lightning::offers::parse::Bolt12SemanticError;
 * # use lightning::routing::router::RouteParametersConfig;
 * #
 * # fn example<T: AChannelManager>(channel_manager: T) -> Result<(), Bolt12SemanticError> {
 * # let channel_manager = channel_manager.get_cm();
 * let offer = channel_manager
 * .create_offer_builder()?
 * # ;
 * # // Needed for compiling for c_bindings
 * # let builder: lightning::offers::offer::OfferBuilder<_, _> = offer.into();
 * # let offer = builder
 * .description(\"coffee\".to_string())
 * .amount_msats(10_000_000)
 * .build()?;
 * let bech32_offer = offer.to_string();
 * 
 * On the event processing thread
 * channel_manager.process_pending_events(&|event| {
 * match event {
 * Event::PaymentClaimable { payment_hash, purpose, .. } => match purpose {
 * PaymentPurpose::Bolt12OfferPayment { payment_preimage: Some(payment_preimage), .. } => {
 * println!(\"Claiming payment {}\", payment_hash);
 * channel_manager.claim_funds(payment_preimage);
 * },
 * PaymentPurpose::Bolt12OfferPayment { payment_preimage: None, .. } => {
 * println!(\"Unknown payment hash: {}\", payment_hash);
 * }
 * #           _ => {},
 * },
 * Event::PaymentClaimed { payment_hash, amount_msat, .. } => {
 * println!(\"Claimed {} msats\", amount_msat);
 * },
 * ...
 * #     _ => {},
 * }
 * Ok(())
 * });
 * # Ok(())
 * # }
 * ```
 * 
 * Use [`pay_for_offer`] to initiated payment, which sends an [`InvoiceRequest`] for an [`Offer`]
 * and pays the [`Bolt12Invoice`] response.
 * 
 * ```
 * # use lightning::events::{Event, EventsProvider};
 * # use lightning::ln::channelmanager::{AChannelManager, PaymentId, RecentPaymentDetails};
 * # use lightning::offers::offer::Offer;
 * #
 * # fn example<T: AChannelManager>(
 * #     channel_manager: T, offer: &Offer, amount_msats: Option<u64>,
 * # ) {
 * # let channel_manager = channel_manager.get_cm();
 * let payment_id = PaymentId([42; 32]);
 * match channel_manager.pay_for_offer(
 * offer, amount_msats, payment_id, Default::default(),
 * ) {
 * Ok(()) => println!(\"Requesting invoice for offer\"),
 * Err(e) => println!(\"Unable to request invoice for offer: {:?}\", e),
 * }
 * 
 * First the payment will be waiting on an invoice
 * let expected_payment_id = payment_id;
 * assert!(
 * channel_manager.list_recent_payments().iter().find(|details| matches!(
 * details,
 * RecentPaymentDetails::AwaitingInvoice { payment_id: expected_payment_id }
 * )).is_some()
 * );
 * 
 * Once the invoice is received, a payment will be sent
 * assert!(
 * channel_manager.list_recent_payments().iter().find(|details| matches!(
 * details,
 * RecentPaymentDetails::Pending { payment_id: expected_payment_id, ..  }
 * )).is_some()
 * );
 * 
 * On the event processing thread
 * channel_manager.process_pending_events(&|event| {
 * match event {
 * Event::PaymentSent { payment_id: Some(payment_id), .. } => println!(\"Paid {}\", payment_id),
 * Event::PaymentFailed { payment_id, .. } => println!(\"Failed paying {}\", payment_id),
 * ...
 * #     _ => {},
 * }
 * Ok(())
 * });
 * # }
 * ```
 * 
 * ## BOLT 12 Refunds
 * 
 * A [`Refund`] is a request for an invoice to be paid. Like *paying* for an [`Offer`], *creating*
 * a [`Refund`] involves maintaining state since it represents a future outbound payment.
 * Therefore, use [`create_refund_builder`] when creating one, otherwise [`ChannelManager`] will
 * refuse to pay any corresponding [`Bolt12Invoice`] that it receives.
 * 
 * ```
 * # use core::time::Duration;
 * # use lightning::events::{Event, EventsProvider};
 * # use lightning::ln::channelmanager::{AChannelManager, PaymentId, RecentPaymentDetails};
 * # use lightning::ln::outbound_payment::Retry;
 * # use lightning::offers::parse::Bolt12SemanticError;
 * # use lightning::routing::router::RouteParametersConfig;
 * #
 * # fn example<T: AChannelManager>(
 * #     channel_manager: T, amount_msats: u64, absolute_expiry: Duration, retry: Retry,
 * #     route_params_config: RouteParametersConfig
 * # ) -> Result<(), Bolt12SemanticError> {
 * # let channel_manager = channel_manager.get_cm();
 * let payment_id = PaymentId([42; 32]);
 * let refund = channel_manager
 * .create_refund_builder(
 * amount_msats, absolute_expiry, payment_id, retry, route_params_config
 * )?
 * # ;
 * # // Needed for compiling for c_bindings
 * # let builder: lightning::offers::refund::RefundBuilder<_> = refund.into();
 * # let refund = builder
 * .description(\"coffee\".to_string())
 * .payer_note(\"refund for order 1234\".to_string())
 * .build()?;
 * let bech32_refund = refund.to_string();
 * 
 * First the payment will be waiting on an invoice
 * let expected_payment_id = payment_id;
 * assert!(
 * channel_manager.list_recent_payments().iter().find(|details| matches!(
 * details,
 * RecentPaymentDetails::AwaitingInvoice { payment_id: expected_payment_id }
 * )).is_some()
 * );
 * 
 * Once the invoice is received, a payment will be sent
 * assert!(
 * channel_manager.list_recent_payments().iter().find(|details| matches!(
 * details,
 * RecentPaymentDetails::Pending { payment_id: expected_payment_id, ..  }
 * )).is_some()
 * );
 * 
 * On the event processing thread
 * channel_manager.process_pending_events(&|event| {
 * match event {
 * Event::PaymentSent { payment_id: Some(payment_id), .. } => println!(\"Paid {}\", payment_id),
 * Event::PaymentFailed { payment_id, .. } => println!(\"Failed paying {}\", payment_id),
 * ...
 * #     _ => {},
 * }
 * Ok(())
 * });
 * # Ok(())
 * # }
 * ```
 * 
 * Use [`request_refund_payment`] to send a [`Bolt12Invoice`] for receiving the refund. Similar to
 * creating* an [`Offer`], this is stateless as it represents an inbound payment.
 * 
 * ```
 * # use lightning::events::{Event, EventsProvider, PaymentPurpose};
 * # use lightning::ln::channelmanager::AChannelManager;
 * # use lightning::offers::refund::Refund;
 * #
 * # fn example<T: AChannelManager>(channel_manager: T, refund: &Refund) {
 * # let channel_manager = channel_manager.get_cm();
 * let known_payment_hash = match channel_manager.request_refund_payment(refund) {
 * Ok(invoice) => {
 * let payment_hash = invoice.payment_hash();
 * println!(\"Requesting refund payment {}\", payment_hash);
 * payment_hash
 * },
 * Err(e) => panic!(\"Unable to request payment for refund: {:?}\", e),
 * };
 * 
 * On the event processing thread
 * channel_manager.process_pending_events(&|event| {
 * match event {
 * Event::PaymentClaimable { payment_hash, purpose, .. } => match purpose {
 * PaymentPurpose::Bolt12RefundPayment { payment_preimage: Some(payment_preimage), .. } => {
 * assert_eq!(payment_hash, known_payment_hash);
 * println!(\"Claiming payment {}\", payment_hash);
 * channel_manager.claim_funds(payment_preimage);
 * },
 * PaymentPurpose::Bolt12RefundPayment { payment_preimage: None, .. } => {
 * println!(\"Unknown payment hash: {}\", payment_hash);
 * },
 * ...
 * #           _ => {},
 * },
 * Event::PaymentClaimed { payment_hash, amount_msat, .. } => {
 * assert_eq!(payment_hash, known_payment_hash);
 * println!(\"Claimed {} msats\", amount_msat);
 * },
 * ...
 * #     _ => {},
 * }
 * Ok(())
 * });
 * # }
 * ```
 * 
 * # Persistence
 * 
 * Implements [`Writeable`] to write out all channel state to disk. Implies [`peer_disconnected`] for
 * all peers during write/read (though does not modify this instance, only the instance being
 * serialized). This will result in any channels which have not yet exchanged [`funding_created`] (i.e.,
 * called [`funding_transaction_generated`] for outbound channels) being closed.
 * 
 * Note that you can be a bit lazier about writing out `ChannelManager` than you can be with
 * [`ChannelMonitor`]. With [`ChannelMonitor`] you MUST durably write each
 * [`ChannelMonitorUpdate`] before returning from
 * [`chain::Watch::watch_channel`]/[`update_channel`] or before completing async writes. With
 * `ChannelManager`s, writing updates happens out-of-band (and will prevent any other
 * `ChannelManager` operations from occurring during the serialization process). If the
 * deserialized version is out-of-date compared to the [`ChannelMonitor`] passed by reference to
 * [`read`], those channels will be force-closed based on the `ChannelMonitor` state and no funds
 * will be lost (modulo on-chain transaction fees).
 * 
 * Note that the deserializer is only implemented for `(`[`BlockHash`]`, `[`ChannelManager`]`)`, which
 * tells you the last block hash which was connected. You should get the best block tip before using the manager.
 * See [`chain::Listen`] and [`chain::Confirm`] for more details.
 * 
 * # `ChannelUpdate` Messages
 * 
 * Note that `ChannelManager` is responsible for tracking liveness of its channels and generating
 * [`ChannelUpdate`] messages informing peers that the channel is temporarily disabled. To avoid
 * spam due to quick disconnection/reconnection, updates are not sent until the channel has been
 * offline for a full minute. In order to track this, you must call
 * [`timer_tick_occurred`] roughly once per minute, though it doesn't have to be perfect.
 * 
 * # DoS Mitigation
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
 * # Type Aliases
 * 
 * Rather than using a plain `ChannelManager`, it is preferable to use either a [`SimpleArcChannelManager`]
 * a [`SimpleRefChannelManager`], for conciseness. See their documentation for more details, but
 * essentially you should default to using a [`SimpleRefChannelManager`], and use a
 * [`SimpleArcChannelManager`] when you require a `ChannelManager` with a static lifetime, such as when
 * you're using lightning-net-tokio.
 * 
 * [`ChainMonitor`]: crate::chain::chainmonitor::ChainMonitor
 * [`MessageHandler`]: crate::ln::peer_handler::MessageHandler
 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
 * [`PeerManager::read_event`]: crate::ln::peer_handler::PeerManager::read_event
 * [`PeerManager::process_events`]: crate::ln::peer_handler::PeerManager::process_events
 * [`timer_tick_occurred`]: Self::timer_tick_occurred
 * [`get_and_clear_needs_persistence`]: Self::get_and_clear_needs_persistence
 * [`KVStoreSync`]: crate::util::persist::KVStoreSync
 * [`get_event_or_persistence_needed_future`]: Self::get_event_or_persistence_needed_future
 * [`lightning-block-sync`]: https://docs.rs/lightning_block_sync/latest/lightning_block_sync
 * [`lightning-transaction-sync`]: https://docs.rs/lightning_transaction_sync/latest/lightning_transaction_sync
 * [`lightning-background-processor`]: https://docs.rs/lightning-background-processor/latest/lightning_background_processor
 * [`list_channels`]: Self::list_channels
 * [`list_usable_channels`]: Self::list_usable_channels
 * [`create_channel`]: Self::create_channel
 * [`close_channel`]: Self::force_close_broadcasting_latest_txn
 * [`force_close_broadcasting_latest_txn`]: Self::force_close_broadcasting_latest_txn
 * [BOLT 11]: https://github.com/lightning/bolts/blob/master/11-payment-encoding.md
 * [BOLT 12]: https://github.com/rustyrussell/lightning-rfc/blob/guilt/offers/12-offer-encoding.md
 * [`list_recent_payments`]: Self::list_recent_payments
 * [`abandon_payment`]: Self::abandon_payment
 * [`lightning-invoice`]: https://docs.rs/lightning_invoice/latest/lightning_invoice
 * [`create_bolt11_invoice`]: Self::create_bolt11_invoice
 * [`create_inbound_payment`]: Self::create_inbound_payment
 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
 * [`claim_funds`]: Self::claim_funds
 * [`send_payment`]: Self::send_payment
 * [`offers`]: crate::offers
 * [`create_offer_builder`]: Self::create_offer_builder
 * [`pay_for_offer`]: Self::pay_for_offer
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`create_refund_builder`]: Self::create_refund_builder
 * [`request_refund_payment`]: Self::request_refund_payment
 * [`peer_disconnected`]: msgs::BaseMessageHandler::peer_disconnected
 * [`funding_created`]: msgs::FundingCreated
 * [`funding_transaction_generated`]: Self::funding_transaction_generated
 * [`BlockHash`]: bitcoin::hash_types::BlockHash
 * [`update_channel`]: chain::Watch::update_channel
 * [`ChannelUpdate`]: msgs::ChannelUpdate
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
	 * The current time or latest block header time can be provided as the `current_timestamp`.
	 * 
	 * This is the main \"logic hub\" for all channel-related actions, and implements
	 * [`ChannelMessageHandler`].
	 * 
	 * Non-proportional fees are fixed according to our risk using the provided fee estimator.
	 * 
	 * Users need to notify the new `ChannelManager` when a new block is connected or
	 * disconnected using its [`block_connected`] and [`blocks_disconnected`] methods, starting
	 * from after [`params.best_block.block_hash`]. See [`chain::Listen`] and [`chain::Confirm`] for
	 * more details.
	 * 
	 * [`block_connected`]: chain::Listen::block_connected
	 * [`blocks_disconnected`]: chain::Listen::blocks_disconnected
	 * [`params.best_block.block_hash`]: chain::BestBlock::block_hash
	 */
	public static constructor_new(fee_est: FeeEstimator, chain_monitor: Watch, tx_broadcaster: BroadcasterInterface, router: Router, message_router: MessageRouter, logger: Logger, entropy_source: EntropySource, node_signer: NodeSigner, signer_provider: SignerProvider, config: UserConfig, params: ChainParameters, current_timestamp: number): ChannelManager {
		const ret: bigint = bindings.ChannelManager_new(CommonBase.get_ptr_of(fee_est), CommonBase.get_ptr_of(chain_monitor), CommonBase.get_ptr_of(tx_broadcaster), CommonBase.get_ptr_of(router), CommonBase.get_ptr_of(message_router), CommonBase.get_ptr_of(logger), CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(signer_provider), CommonBase.get_ptr_of(config), CommonBase.get_ptr_of(params), current_timestamp);
		const ret_hu_conv: ChannelManager = new ChannelManager(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, fee_est);
		CommonBase.add_ref_from(ret_hu_conv, chain_monitor);
		CommonBase.add_ref_from(ret_hu_conv, tx_broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, router);
		CommonBase.add_ref_from(ret_hu_conv, message_router);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, signer_provider);
		return ret_hu_conv;
	}

	/**
	 * Gets the current [`UserConfig`] which controls some global behavior and includes the
	 * default configuration applied to all new channels.
	 */
	public get_current_config(): UserConfig {
		const ret: bigint = bindings.ChannelManager_get_current_config(this.ptr);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Updates the current [`UserConfig`] which controls some global behavior and includes the
	 * default configuration applied to all new channels.
	 */
	public set_current_config(new_config: UserConfig): void {
		bindings.ChannelManager_set_current_config(this.ptr, CommonBase.get_ptr_of(new_config));
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
	 * Raises [`APIError::ChannelUnavailable`] if the channel cannot be opened due to failing to
	 * generate a shutdown scriptpubkey or destination script set by
	 * [`SignerProvider::get_shutdown_scriptpubkey`] or [`SignerProvider::get_destination_script`].
	 * 
	 * Note that we do not check if you are currently connected to the given peer. If no
	 * connection is available, the outbound `open_channel` message may fail to send, resulting in
	 * the channel eventually being silently forgotten (dropped on reload).
	 * 
	 * If `temporary_channel_id` is specified, it will be used as the temporary channel ID of the
	 * channel. Otherwise, a random one will be generated for you.
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
	 * Note that temporary_channel_id (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that override_config (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public create_channel(their_network_key: Uint8Array, channel_value_satoshis: bigint, push_msat: bigint, user_channel_id: bigint, temporary_channel_id: ChannelId|null, override_config: UserConfig|null): Result_ChannelIdAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_create_channel(this.ptr, bindings.encodeUint8Array(their_network_key), channel_value_satoshis, push_msat, bindings.encodeUint128(user_channel_id), temporary_channel_id == null ? 0n : CommonBase.get_ptr_of(temporary_channel_id), override_config == null ? 0n : CommonBase.get_ptr_of(override_config));
		const ret_hu_conv: Result_ChannelIdAPIErrorZ = Result_ChannelIdAPIErrorZ.constr_from_ptr(ret);
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
		const ret: number = bindings.ChannelManager_list_channels_with_counterparty(this.ptr, bindings.encodeUint8Array(counterparty_node_id));
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
	 * If we are the channel initiator, we will pay between our [`ChannelCloseMinimum`] and
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`] plus our [`NonAnchorChannelFee`]
	 * fee estimate.
	 * If our counterparty is the channel initiator, we will require a channel closing
	 * transaction feerate of at least our [`ChannelCloseMinimum`] feerate or the feerate which
	 * would appear on a force-closure transaction, whichever is lower. We will allow our
	 * counterparty to pay as much fee as they'd like, however.
	 * 
	 * May generate a [`SendShutdown`] message event on success, which should be relayed.
	 * 
	 * Raises [`APIError::ChannelUnavailable`] if the channel cannot be closed due to failing to
	 * generate a shutdown scriptpubkey or destination script set by
	 * [`SignerProvider::get_shutdown_scriptpubkey`]. A force-closure may be needed to close the
	 * channel.
	 * 
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`]: crate::util::config::ChannelConfig::force_close_avoidance_max_fee_satoshis
	 * [`ChannelCloseMinimum`]: crate::chain::chaininterface::ConfirmationTarget::ChannelCloseMinimum
	 * [`NonAnchorChannelFee`]: crate::chain::chaininterface::ConfirmationTarget::NonAnchorChannelFee
	 * [`SendShutdown`]: MessageSendEvent::SendShutdown
	 */
	public close_channel(channel_id: ChannelId, counterparty_node_id: Uint8Array): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_close_channel(this.ptr, CommonBase.get_ptr_of(channel_id), bindings.encodeUint8Array(counterparty_node_id));
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
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`] plus our [`NonAnchorChannelFee`]
	 * fee estimate (or `target_feerate_sat_per_1000_weight`, if it is greater).
	 * If our counterparty is the channel initiator, we will refuse to accept a channel closure
	 * transaction feerate below `target_feerate_sat_per_1000_weight` (or the feerate which
	 * will appear on a force-closure transaction, whichever is lower).
	 * 
	 * The `shutdown_script` provided  will be used as the `scriptPubKey` for the closing transaction.
	 * Will fail if a shutdown script has already been set for this channel by
	 * [`ChannelHandshakeConfig::commit_upfront_shutdown_pubkey`]. The given shutdown script must
	 * also be compatible with our and the counterparty's features.
	 * 
	 * May generate a [`SendShutdown`] message event on success, which should be relayed.
	 * 
	 * Raises [`APIError::ChannelUnavailable`] if the channel cannot be closed due to failing to
	 * generate a shutdown scriptpubkey or destination script set by
	 * [`SignerProvider::get_shutdown_scriptpubkey`]. A force-closure may be needed to close the
	 * channel.
	 * 
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`]: crate::util::config::ChannelConfig::force_close_avoidance_max_fee_satoshis
	 * [`NonAnchorChannelFee`]: crate::chain::chaininterface::ConfirmationTarget::NonAnchorChannelFee
	 * [`ChannelHandshakeConfig::commit_upfront_shutdown_pubkey`]: crate::util::config::ChannelHandshakeConfig::commit_upfront_shutdown_pubkey
	 * [`SendShutdown`]: MessageSendEvent::SendShutdown
	 * 
	 * Note that shutdown_script (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public close_channel_with_feerate_and_script(channel_id: ChannelId, counterparty_node_id: Uint8Array, target_feerate_sats_per_1000_weight: Option_u32Z, shutdown_script: ShutdownScript|null): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_close_channel_with_feerate_and_script(this.ptr, CommonBase.get_ptr_of(channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(target_feerate_sats_per_1000_weight), shutdown_script == null ? 0n : CommonBase.get_ptr_of(shutdown_script));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Force closes a channel, immediately broadcasting the latest local transaction(s),
	 * rejecting new HTLCs.
	 * 
	 * The provided `error_message` is sent to connected peers for closing
	 * channels and should be a human-readable description of what went wrong.
	 * 
	 * Fails if `channel_id` is unknown to the manager, or if the `counterparty_node_id`
	 * isn't the counterparty of the corresponding channel.
	 */
	public force_close_broadcasting_latest_txn(channel_id: ChannelId, counterparty_node_id: Uint8Array, error_message: string): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_force_close_broadcasting_latest_txn(this.ptr, CommonBase.get_ptr_of(channel_id), bindings.encodeUint8Array(counterparty_node_id), bindings.encodeString(error_message));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Force close all channels, immediately broadcasting the latest local commitment transaction
	 * for each to the chain and rejecting new HTLCs on each.
	 * 
	 * The provided `error_message` is sent to connected peers for closing channels and should
	 * be a human-readable description of what went wrong.
	 */
	public force_close_all_channels_broadcasting_latest_txn(error_message: string): void {
		bindings.ChannelManager_force_close_all_channels_broadcasting_latest_txn(this.ptr, bindings.encodeString(error_message));
	}

	/**
	 * Initiate a splice in order to add value to (splice-in) or remove value from (splice-out)
	 * the channel. This will spend the channel's funding transaction output, effectively replacing
	 * it with a new one.
	 * 
	 * # Arguments
	 * 
	 * Provide a `contribution` to determine if value is spliced in or out. The splice initiator is
	 * responsible for paying fees for common fields, shared inputs, and shared outputs along with
	 * any contributed inputs and outputs. Fees are determined using `funding_feerate_per_kw` and
	 * must be covered by the supplied inputs for splice-in or the channel balance for splice-out.
	 * 
	 * An optional `locktime` for the funding transaction may be specified. If not given, the
	 * current best block height is used.
	 * 
	 * # Events
	 * 
	 * Once the funding transaction has been constructed, an [`Event::SplicePending`] will be
	 * emitted. At this point, any inputs contributed to the splice can only be re-spent if an
	 * [`Event::DiscardFunding`] is seen.
	 * 
	 * After initial signatures have been exchanged, [`Event::FundingTransactionReadyForSigning`]
	 * will be generated and [`ChannelManager::funding_transaction_signed`] should be called.
	 * 
	 * If any failures occur while negotiating the funding transaction, an [`Event::SpliceFailed`]
	 * will be emitted. Any contributed inputs no longer used will be included here and thus can
	 * be re-spent.
	 * 
	 * Once the splice has been locked by both counterparties, an [`Event::ChannelReady`] will be
	 * emitted with the new funding output. At this point, a new splice can be negotiated by
	 * calling `splice_channel` again on this channel.
	 */
	public splice_channel(channel_id: ChannelId, counterparty_node_id: Uint8Array, contribution: SpliceContribution, funding_feerate_per_kw: number, locktime: Option_u32Z): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_splice_channel(this.ptr, CommonBase.get_ptr_of(channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(contribution), funding_feerate_per_kw, CommonBase.get_ptr_of(locktime));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sends a payment along a given route. See [`Self::send_payment`] for more info.
	 * 
	 * LDK will not automatically retry this payment, though it may be manually re-sent after an
	 * [`Event::PaymentFailed`] is generated.
	 */
	public send_payment_with_route(route: Route, payment_hash: Uint8Array, recipient_onion: RecipientOnionFields, payment_id: Uint8Array): Result_NoneRetryableSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_payment_with_route(this.ptr, CommonBase.get_ptr_of(route), bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(recipient_onion), bindings.encodeUint8Array(payment_id));
		const ret_hu_conv: Result_NoneRetryableSendFailureZ = Result_NoneRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sends a payment to the route found using the provided [`RouteParameters`], retrying failed
	 * payment paths based on the provided `Retry`.
	 * 
	 * You should likely prefer [`Self::pay_for_bolt11_invoice`] or [`Self::pay_for_offer`] in
	 * general, however this method may allow for slightly more customization.
	 * 
	 * May generate [`UpdateHTLCs`] message(s) event on success, which should be relayed (e.g. via
	 * [`PeerManager::process_events`]).
	 * 
	 * # Avoiding Duplicate Payments
	 * 
	 * If a pending payment is currently in-flight with the same [`PaymentId`] provided, this
	 * method will error with [`RetryableSendFailure::DuplicatePayment`]. Note, however, that once a
	 * payment is no longer pending (either via [`ChannelManager::abandon_payment`], or handling of
	 * an [`Event::PaymentSent`] or [`Event::PaymentFailed`]) LDK will not stop you from sending a
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
	 * Routes are automatically found using the [`Router] provided on startup. To fix a route for a
	 * particular payment, use [`Self::send_payment_with_route`] or match the [`PaymentId`] passed to
	 * [`Router::find_route_with_id`].
	 * 
	 * [`Event::PaymentSent`]: events::Event::PaymentSent
	 * [`Event::PaymentFailed`]: events::Event::PaymentFailed
	 * [`UpdateHTLCs`]: MessageSendEvent::UpdateHTLCs
	 * [`PeerManager::process_events`]: crate::ln::peer_handler::PeerManager::process_events
	 * [`ChannelMonitorUpdateStatus::InProgress`]: crate::chain::ChannelMonitorUpdateStatus::InProgress
	 */
	public send_payment(payment_hash: Uint8Array, recipient_onion: RecipientOnionFields, payment_id: Uint8Array, route_params: RouteParameters, retry_strategy: Retry): Result_NoneRetryableSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_payment(this.ptr, bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(recipient_onion), bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(route_params), CommonBase.get_ptr_of(retry_strategy));
		const ret_hu_conv: Result_NoneRetryableSendFailureZ = Result_NoneRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Pays a [`Bolt11Invoice`] associated with the `payment_id`. See [`Self::send_payment`] for more info.
	 * 
	 * # Payment Id
	 * The invoice's `payment_hash().0` serves as a reliable choice for the `payment_id`.
	 * 
	 * # Handling Invoice Amounts
	 * Some invoices include a specific amount, while others require you to specify one.
	 * - If the invoice **includes** an amount, user may provide an amount greater or equal to it
	 * to allow for overpayments.
	 * - If the invoice **doesn't include** an amount, you'll need to specify `amount_msats`.
	 * 
	 * If these conditions aren’t met, the function will return [`Bolt11PaymentError::InvalidAmount`].
	 * 
	 * # Custom Routing Parameters
	 * Users can customize routing parameters via [`RouteParametersConfig`].
	 * To use default settings, call the function with [`RouteParametersConfig::default`].
	 */
	public pay_for_bolt11_invoice(invoice: Bolt11Invoice, payment_id: Uint8Array, amount_msats: Option_u64Z, route_params_config: RouteParametersConfig, retry_strategy: Retry): Result_NoneBolt11PaymentErrorZ {
		const ret: bigint = bindings.ChannelManager_pay_for_bolt11_invoice(this.ptr, CommonBase.get_ptr_of(invoice), bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(amount_msats), CommonBase.get_ptr_of(route_params_config), CommonBase.get_ptr_of(retry_strategy));
		const ret_hu_conv: Result_NoneBolt11PaymentErrorZ = Result_NoneBolt11PaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Pays the [`Bolt12Invoice`] associated with the `payment_id` encoded in its `payer_metadata`.
	 * 
	 * The invoice's `payer_metadata` is used to authenticate that the invoice was indeed requested
	 * before attempting a payment. [`Bolt12PaymentError::UnexpectedInvoice`] is returned if this
	 * fails or if the encoded `payment_id` is not recognized. The latter may happen once the
	 * payment is no longer tracked because the payment was attempted after:
	 * - an invoice for the `payment_id` was already paid,
	 * - one full [timer tick] has elapsed since initially requesting the invoice when paying an
	 * offer, or
	 * - the refund corresponding to the invoice has already expired.
	 * 
	 * To retry the payment, request another invoice using a new `payment_id`.
	 * 
	 * Attempting to pay the same invoice twice while the first payment is still pending will
	 * result in a [`Bolt12PaymentError::DuplicateInvoice`].
	 * 
	 * Otherwise, either [`Event::PaymentSent`] or [`Event::PaymentFailed`] are used to indicate
	 * whether or not the payment was successful.
	 * 
	 * [timer tick]: Self::timer_tick_occurred
	 */
	public send_payment_for_bolt12_invoice(invoice: Bolt12Invoice, context: Option_OffersContextZ): Result_NoneBolt12PaymentErrorZ {
		const ret: bigint = bindings.ChannelManager_send_payment_for_bolt12_invoice(this.ptr, CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(context));
		const ret_hu_conv: Result_NoneBolt12PaymentErrorZ = Result_NoneBolt12PaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Should be called after handling an [`Event::PersistStaticInvoice`], where the `Responder`
	 * comes from [`Event::PersistStaticInvoice::invoice_persisted_path`].
	 */
	public static_invoice_persisted(invoice_persisted_path: Responder): void {
		bindings.ChannelManager_static_invoice_persisted(this.ptr, CommonBase.get_ptr_of(invoice_persisted_path));
	}

	/**
	 * Forwards a [`StaticInvoice`] to a payer in response to an
	 * [`Event::StaticInvoiceRequested`]. Also forwards the payer's [`InvoiceRequest`] to the
	 * async recipient, in case the recipient is online to provide the payer with a fresh
	 * [`Bolt12Invoice`].
	 */
	public respond_to_static_invoice_request(invoice: StaticInvoice, responder: Responder, invoice_request: InvoiceRequest, invoice_request_path: BlindedMessagePath): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.ChannelManager_respond_to_static_invoice_request(this.ptr, CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(responder), CommonBase.get_ptr_of(invoice_request), CommonBase.get_ptr_of(invoice_request_path));
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signals that no further attempts for the given payment should occur. Useful if you have a
	 * pending outbound payment with retries remaining, but wish to stop retrying the payment before
	 * retries are exhausted.
	 * 
	 * # Event Generation
	 * 
	 * If no [`Event::PaymentFailed`] event had been generated before, one will be generated as soon
	 * as there are no remaining pending HTLCs for this payment.
	 * 
	 * Note that calling this method does *not* prevent a payment from succeeding. You must still
	 * wait until you receive either a [`Event::PaymentFailed`] or [`Event::PaymentSent`] event to
	 * determine the ultimate status of a payment.
	 * 
	 * # Requested Invoices
	 * 
	 * In the case of paying a [`Bolt12Invoice`] via [`ChannelManager::pay_for_offer`], abandoning
	 * the payment prior to receiving the invoice will result in an [`Event::PaymentFailed`] and
	 * prevent any attempts at paying it once received.
	 * 
	 * # Restart Behavior
	 * 
	 * If an [`Event::PaymentFailed`] is generated and we restart without first persisting the
	 * [`ChannelManager`], another [`Event::PaymentFailed`] may be generated.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public abandon_payment(payment_id: Uint8Array): void {
		bindings.ChannelManager_abandon_payment(this.ptr, bindings.encodeUint8Array(payment_id));
	}

	/**
	 * Send a spontaneous payment, which is a payment that does not require the recipient to have
	 * generated an invoice. Optionally, you may specify the preimage. If you do choose to specify
	 * the preimage, it must be a cryptographically secure random value that no intermediate node
	 * would be able to guess -- otherwise, an intermediate node may claim the payment and it will
	 * never reach the recipient.
	 * 
	 * Similar to regular payments, you MUST NOT reuse a `payment_preimage` value. See
	 * [`send_payment`] for more information about the risks of duplicate preimage usage.
	 * 
	 * See [`send_payment`] documentation for more details on the idempotency guarantees provided by
	 * the [`PaymentId`] key.
	 * 
	 * See [`PaymentParameters::for_keysend`] for help in constructing `route_params` for spontaneous
	 * payments.
	 * 
	 * [`send_payment`]: Self::send_payment
	 * [`PaymentParameters::for_keysend`]: crate::routing::router::PaymentParameters::for_keysend
	 */
	public send_spontaneous_payment(payment_preimage: Option_ThirtyTwoBytesZ, recipient_onion: RecipientOnionFields, payment_id: Uint8Array, route_params: RouteParameters, retry_strategy: Retry): Result_ThirtyTwoBytesRetryableSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_spontaneous_payment(this.ptr, CommonBase.get_ptr_of(payment_preimage), CommonBase.get_ptr_of(recipient_onion), bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(route_params), CommonBase.get_ptr_of(retry_strategy));
		const ret_hu_conv: Result_ThirtyTwoBytesRetryableSendFailureZ = Result_ThirtyTwoBytesRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Send a payment that is probing the given route for liquidity. We calculate the
	 * [`PaymentHash`] of probes based on a static secret and a random [`PaymentId`], which allows
	 * us to easily discern them from real payments.
	 */
	public send_probe(path: Path): Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_probe(this.ptr, CommonBase.get_ptr_of(path));
		const ret_hu_conv: Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sends payment probes over all paths of a route that would be used to pay the given
	 * amount to the given `node_id`.
	 * 
	 * See [`ChannelManager::send_preflight_probes`] for more information.
	 */
	public send_spontaneous_preflight_probes(node_id: Uint8Array, amount_msat: bigint, final_cltv_expiry_delta: number, liquidity_limit_multiplier: Option_u64Z): Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_spontaneous_preflight_probes(this.ptr, bindings.encodeUint8Array(node_id), amount_msat, final_cltv_expiry_delta, CommonBase.get_ptr_of(liquidity_limit_multiplier));
		const ret_hu_conv: Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sends payment probes over all paths of a route that would be used to pay a route found
	 * according to the given [`RouteParameters`].
	 * 
	 * This may be used to send \"pre-flight\" probes, i.e., to train our scorer before conducting
	 * the actual payment. Note this is only useful if there likely is sufficient time for the
	 * probe to settle before sending out the actual payment, e.g., when waiting for user
	 * confirmation in a wallet UI.
	 * 
	 * Otherwise, there is a chance the probe could take up some liquidity needed to complete the
	 * actual payment. Users should therefore be cautious and might avoid sending probes if
	 * liquidity is scarce and/or they don't expect the probe to return before they send the
	 * payment. To mitigate this issue, channels with available liquidity less than the required
	 * amount times the given `liquidity_limit_multiplier` won't be used to send pre-flight
	 * probes. If `None` is given as `liquidity_limit_multiplier`, it defaults to `3`.
	 */
	public send_preflight_probes(route_params: RouteParameters, liquidity_limit_multiplier: Option_u64Z): Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ {
		const ret: bigint = bindings.ChannelManager_send_preflight_probes(this.ptr, CommonBase.get_ptr_of(route_params), CommonBase.get_ptr_of(liquidity_limit_multiplier));
		const ret_hu_conv: Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ.constr_from_ptr(ret);
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
	public funding_transaction_generated(temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, funding_transaction: Uint8Array): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_funding_transaction_generated(this.ptr, CommonBase.get_ptr_of(temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint8Array(funding_transaction));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Unsafe**: This method does not validate the spent output. It is the caller's
	 * responsibility to ensure the spent outputs are SegWit, as well as making sure the funding
	 * transaction has a final absolute locktime, i.e., its locktime is lower than the next block height.
	 * 
	 * For a safer method, please refer to [`ChannelManager::funding_transaction_generated`].
	 * 
	 * Call this in response to a [`Event::FundingGenerationReady`] event.
	 * 
	 * Note that if this method is called successfully, the funding transaction won't be
	 * broadcasted and you are expected to broadcast it manually when receiving the
	 * [`Event::FundingTxBroadcastSafe`] event.
	 * 
	 * Returns [`APIError::ChannelUnavailable`] if a funding transaction has already been provided
	 * for the channel or if the channel has been closed as indicated by [`Event::ChannelClosed`].
	 * 
	 * May panic if the funding output is duplicative with some other channel (note that this
	 * should be trivially prevented by using unique funding transaction keys per-channel).
	 * 
	 * Note to keep the miner incentives aligned in moving the blockchain forward, we recommend
	 * the wallet software generating the funding transaction to apply anti-fee sniping as
	 * implemented by Bitcoin Core wallet. See <https://bitcoinops.org/en/topics/fee-sniping/> for
	 * more details.
	 * 
	 * [`Event::FundingGenerationReady`]: crate::events::Event::FundingGenerationReady
	 * [`Event::FundingTxBroadcastSafe`]: crate::events::Event::FundingTxBroadcastSafe
	 * [`Event::ChannelClosed`]: crate::events::Event::ChannelClosed
	 * [`ChannelManager::funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::funding_transaction_generated
	 */
	public unsafe_manual_funding_transaction_generated(temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, funding: OutPoint): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_unsafe_manual_funding_transaction_generated(this.ptr, CommonBase.get_ptr_of(temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(funding));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Call this upon creation of a funding transaction for the given channel.
	 * 
	 * This method executes the same checks as [`ChannelManager::funding_transaction_generated`],
	 * but it does not automatically broadcast the funding transaction.
	 * 
	 * Call this in response to a [`Event::FundingGenerationReady`] event, only in a context where you want to manually
	 * control the broadcast of the funding transaction.
	 * 
	 * The associated [`ChannelMonitor`] likewise avoids broadcasting holder commitment or CPFP
	 * transactions until the funding has been observed on chain. This
	 * prevents attempting to broadcast unconfirmable commitment transactions before the channel's
	 * funding exists in a block.
	 * 
	 * If HTLCs would otherwise approach timeout while the funding transaction has not yet appeared
	 * on chain, the monitor avoids broadcasting force-close transactions in manual-broadcast
	 * mode until the funding is seen. It may still close the channel off-chain (emitting a
	 * `ChannelClosed` event) to avoid accepting further updates. Ensure your application either
	 * broadcasts the funding transaction in a timely manner or avoids forwarding HTLCs that could
	 * approach timeout during this interim state.
	 * 
	 * See also [`ChannelMonitor::broadcast_latest_holder_commitment_txn`]. For channels using
	 * manual-broadcast, calling that method has no effect until the funding has been observed
	 * on-chain.
	 * 
	 * [`ChannelManager::funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::funding_transaction_generated
	 * [`Event::FundingGenerationReady`]: crate::events::Event::FundingGenerationReady
	 */
	public funding_transaction_generated_manual_broadcast(temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, funding_transaction: Uint8Array): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_funding_transaction_generated_manual_broadcast(this.ptr, CommonBase.get_ptr_of(temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint8Array(funding_transaction));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Call this upon creation of a batch funding transaction for the given channels.
	 * 
	 * Return values are identical to [`Self::funding_transaction_generated`], respective to
	 * each individual channel and transaction output.
	 * 
	 * Do NOT broadcast the funding transaction yourself. This batch funding transaction
	 * will only be broadcast when we have safely received and persisted the counterparty's
	 * signature for each channel.
	 * 
	 * If there is an error, all channels in the batch are to be considered closed.
	 */
	public batch_funding_transaction_generated(temporary_channels: TwoTuple_ChannelIdPublicKeyZ[], funding_transaction: Uint8Array): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_batch_funding_transaction_generated(this.ptr, bindings.encodeUint64Array(temporary_channels.map(temporary_channels_conv_30 => CommonBase.get_ptr_of(temporary_channels_conv_30))), bindings.encodeUint8Array(funding_transaction));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Handles a signed funding transaction generated by interactive transaction construction and
	 * provided by the client. Should only be called in response to a [`FundingTransactionReadyForSigning`]
	 * event.
	 * 
	 * Do NOT broadcast the funding transaction yourself. When we have safely received our
	 * counterparty's signature(s) the funding transaction will automatically be broadcast via the
	 * [`BroadcasterInterface`] provided when this `ChannelManager` was constructed.
	 * 
	 * `SIGHASH_ALL` MUST be used for all signatures when providing signatures, otherwise your
	 * funds can be held hostage!
	 * 
	 * LDK checks the following:
	 * Each input spends an output that is one of P2WPKH, P2WSH, or P2TR.
	 * These were already checked by LDK when the inputs to be contributed were provided.
	 * All signatures use the `SIGHASH_ALL` sighash type.
	 * P2WPKH and P2TR key path spends are valid (verifies signatures)
	 * 
	 * NOTE:
	 * When checking P2WSH spends, LDK tries to decode 70-72 byte witness elements as ECDSA
	 * signatures with a sighash flag. If the internal DER-decoding fails, then LDK just
	 * assumes it wasn't a signature and carries with checks. If the element can be decoded
	 * as an ECDSA signature, the the sighash flag must be `SIGHASH_ALL`.
	 * When checking P2TR script-path spends, LDK assumes all elements of exactly 65 bytes
	 * with the last byte matching any valid sighash flag byte are schnorr signatures and checks
	 * that the sighash type is `SIGHASH_ALL`. If the last byte is not any valid sighash flag, the
	 * element is assumed not to be a signature and is ignored. Elements of 64 bytes are not
	 * checked because if they were schnorr signatures then they would implicitly be `SIGHASH_DEFAULT`
	 * which is an alias of `SIGHASH_ALL`.
	 * 
	 * Returns [`ChannelUnavailable`] when a channel is not found or an incorrect
	 * `counterparty_node_id` is provided.
	 * 
	 * Returns [`APIMisuseError`] when a channel is not in a state where it is expecting funding
	 * signatures or if any of the checks described above fail.
	 * 
	 * [`FundingTransactionReadyForSigning`]: events::Event::FundingTransactionReadyForSigning
	 * [`ChannelUnavailable`]: APIError::ChannelUnavailable
	 * [`APIMisuseError`]: APIError::APIMisuseError
	 */
	public funding_transaction_signed(channel_id: ChannelId, counterparty_node_id: Uint8Array, transaction: Uint8Array): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_funding_transaction_signed(this.ptr, CommonBase.get_ptr_of(channel_id), bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint8Array(transaction));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Atomically applies partial updates to the [`ChannelConfig`] of the given channels.
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
	 * [`BroadcastChannelUpdate`]: MessageSendEvent::BroadcastChannelUpdate
	 * [`ChannelUpdate`]: msgs::ChannelUpdate
	 * [`ChannelUnavailable`]: APIError::ChannelUnavailable
	 * [`APIMisuseError`]: APIError::APIMisuseError
	 */
	public update_partial_channel_config(counterparty_node_id: Uint8Array, channel_ids: ChannelId[], config_update: ChannelConfigUpdate): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_update_partial_channel_config(this.ptr, bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint64Array(channel_ids.map(channel_ids_conv_11 => CommonBase.get_ptr_of(channel_ids_conv_11))), CommonBase.get_ptr_of(config_update));
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
	 * [`BroadcastChannelUpdate`]: MessageSendEvent::BroadcastChannelUpdate
	 * [`ChannelUpdate`]: msgs::ChannelUpdate
	 * [`ChannelUnavailable`]: APIError::ChannelUnavailable
	 * [`APIMisuseError`]: APIError::APIMisuseError
	 */
	public update_channel_config(counterparty_node_id: Uint8Array, channel_ids: ChannelId[], config: ChannelConfig): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_update_channel_config(this.ptr, bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint64Array(channel_ids.map(channel_ids_conv_11 => CommonBase.get_ptr_of(channel_ids_conv_11))), CommonBase.get_ptr_of(config));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
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
	 * you from forwarding more than you received. See
	 * [`HTLCIntercepted::expected_outbound_amount_msat`] for more on forwarding a different amount
	 * than expected.
	 * 
	 * Errors if the event was not handled in time, in which case the HTLC was automatically failed
	 * backwards.
	 * 
	 * [`UserConfig::accept_intercept_htlcs`]: crate::util::config::UserConfig::accept_intercept_htlcs
	 * [`HTLCIntercepted`]: events::Event::HTLCIntercepted
	 * [`HTLCIntercepted::expected_outbound_amount_msat`]: events::Event::HTLCIntercepted::expected_outbound_amount_msat
	 */
	public forward_intercepted_htlc(intercept_id: Uint8Array, next_hop_channel_id: ChannelId, next_node_id: Uint8Array, amt_to_forward_msat: bigint): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_forward_intercepted_htlc(this.ptr, bindings.encodeUint8Array(intercept_id), CommonBase.get_ptr_of(next_hop_channel_id), bindings.encodeUint8Array(next_node_id), amt_to_forward_msat);
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
		const ret: bigint = bindings.ChannelManager_fail_intercepted_htlc(this.ptr, bindings.encodeUint8Array(intercept_id));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns whether we have pending HTLC forwards that need to be processed via
	 * [`Self::process_pending_htlc_forwards`].
	 */
	public needs_pending_htlc_processing(): boolean {
		const ret: boolean = bindings.ChannelManager_needs_pending_htlc_processing(this.ptr);
		return ret;
	}

	/**
	 * Processes HTLCs which are pending waiting on random forward delay.
	 * 
	 * Will be regularly called by LDK's background processor.
	 * 
	 * Users implementing their own background processing logic should call this in irregular,
	 * randomly-distributed intervals.
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
	 * Force-closing and removing channels which have not completed establishment in a timely manner.
	 * Forgetting about stale outbound payments, either those that have already been fulfilled
	 * or those awaiting an invoice that hasn't been delivered in the necessary amount of time.
	 * The latter is determined using the system clock in `std` and the highest seen block time
	 * minus two hours in non-`std`.
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
		bindings.ChannelManager_fail_htlc_backwards(this.ptr, bindings.encodeUint8Array(payment_hash));
	}

	/**
	 * This is a variant of [`ChannelManager::fail_htlc_backwards`] that allows you to specify the
	 * reason for the failure.
	 * 
	 * See [`FailureCode`] for valid failure codes.
	 */
	public fail_htlc_backwards_with_reason(payment_hash: Uint8Array, failure_code: FailureCode): void {
		bindings.ChannelManager_fail_htlc_backwards_with_reason(this.ptr, bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(failure_code));
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
	 * This function will fail the payment if it has custom TLVs with even type numbers, as we
	 * will assume they are unknown. If you intend to accept even custom TLVs, you should use
	 * [`claim_funds_with_known_custom_tlvs`].
	 * 
	 * [`Event::PaymentClaimable`]: crate::events::Event::PaymentClaimable
	 * [`Event::PaymentClaimable::claim_deadline`]: crate::events::Event::PaymentClaimable::claim_deadline
	 * [`Event::PaymentClaimed`]: crate::events::Event::PaymentClaimed
	 * [`process_pending_events`]: EventsProvider::process_pending_events
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 * [`claim_funds_with_known_custom_tlvs`]: Self::claim_funds_with_known_custom_tlvs
	 */
	public claim_funds(payment_preimage: Uint8Array): void {
		bindings.ChannelManager_claim_funds(this.ptr, bindings.encodeUint8Array(payment_preimage));
	}

	/**
	 * This is a variant of [`claim_funds`] that allows accepting a payment with custom TLVs with
	 * even type numbers.
	 * 
	 * # Note
	 * 
	 * You MUST check you've understood all even TLVs before using this to
	 * claim, otherwise you may unintentionally agree to some protocol you do not understand.
	 * 
	 * [`claim_funds`]: Self::claim_funds
	 */
	public claim_funds_with_known_custom_tlvs(payment_preimage: Uint8Array): void {
		bindings.ChannelManager_claim_funds_with_known_custom_tlvs(this.ptr, bindings.encodeUint8Array(payment_preimage));
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
	 * NOTE: LDK makes no attempt to prevent the counterparty from using non-standard inputs which
	 * will prevent the funding transaction from being relayed on the bitcoin network and hence being
	 * confirmed.
	 * 
	 * [`Event::OpenChannelRequest`]: events::Event::OpenChannelRequest
	 * [`Event::ChannelClosed::user_channel_id`]: events::Event::ChannelClosed::user_channel_id
	 * 
	 * Note that config_overrides (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public accept_inbound_channel(temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, user_channel_id: bigint, config_overrides: ChannelConfigOverrides|null): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_accept_inbound_channel(this.ptr, CommonBase.get_ptr_of(temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint128(user_channel_id), config_overrides == null ? 0n : CommonBase.get_ptr_of(config_overrides));
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
	 * 
	 * Note that config_overrides (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public accept_inbound_channel_from_trusted_peer_0conf(temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, user_channel_id: bigint, config_overrides: ChannelConfigOverrides|null): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_accept_inbound_channel_from_trusted_peer_0conf(this.ptr, CommonBase.get_ptr_of(temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint128(user_channel_id), config_overrides == null ? 0n : CommonBase.get_ptr_of(config_overrides));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * When a call to a [`ChannelSigner`] method returns an error, this indicates that the signer
	 * is (temporarily) unavailable, and the operation should be retried later.
	 * 
	 * This method allows for that retry - either checking for any signer-pending messages to be
	 * attempted in every channel, or in the specifically provided channel.
	 * 
	 * [`ChannelSigner`]: crate::sign::ChannelSigner
	 */
	public signer_unblocked(channel_opt: Option_C2Tuple_PublicKeyChannelIdZZ): void {
		bindings.ChannelManager_signer_unblocked(this.ptr, CommonBase.get_ptr_of(channel_opt));
	}

	/**
	 * Utility for creating a BOLT11 invoice that can be verified by [`ChannelManager`] without
	 * storing any additional state. It achieves this by including a [`PaymentSecret`] in the
	 * invoice which it uses to verify that the invoice has not expired and the payment amount is
	 * sufficient, reproducing the [`PaymentPreimage`] if applicable.
	 */
	public create_bolt11_invoice(params_amount_msats_arg: Option_u64Z, params_description_arg: Bolt11InvoiceDescription, params_invoice_expiry_delta_secs_arg: Option_u32Z, params_min_final_cltv_expiry_delta_arg: Option_u16Z, params_payment_hash_arg: Option_ThirtyTwoBytesZ): Result_Bolt11InvoiceSignOrCreationErrorZ {
		const ret: bigint = bindings.ChannelManager_create_bolt11_invoice(this.ptr, bindings.Bolt11InvoiceParameters_new(CommonBase.get_ptr_of(params_amount_msats_arg), CommonBase.get_ptr_of(params_description_arg), CommonBase.get_ptr_of(params_invoice_expiry_delta_secs_arg), CommonBase.get_ptr_of(params_min_final_cltv_expiry_delta_arg), CommonBase.get_ptr_of(params_payment_hash_arg)));
		const ret_hu_conv: Result_Bolt11InvoiceSignOrCreationErrorZ = Result_Bolt11InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		;
		;
		;
		;
		;
		return ret_hu_conv;
	}

	/**
	 * Creates an [`OfferBuilder`] such that the [`Offer`] it builds is recognized by the
	 * [`ChannelManager`] when handling [`InvoiceRequest`] messages for the offer. The offer's
	 * expiration will be `absolute_expiry` if `Some`, otherwise it will not expire.
	 * 
	 * # Privacy
	 * 
	 * Uses [`MessageRouter`] provided at construction to construct a [`BlindedMessagePath`] for
	 * the offer. See the documentation of the selected [`MessageRouter`] for details on how it
	 * selects blinded paths including privacy implications and reliability tradeoffs.
	 * 
	 * Also, uses a derived signing pubkey in the offer for recipient privacy.
	 * 
	 * # Limitations
	 * 
	 * See [`OffersMessageFlow::create_offer_builder`] for limitations on the offer builder.
	 * 
	 * # Errors
	 * 
	 * Errors if the parameterized [`MessageRouter`] is unable to create a blinded path for the offer.
	 * 
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public create_offer_builder(): Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ {
		const ret: bigint = bindings.ChannelManager_create_offer_builder(this.ptr);
		const ret_hu_conv: Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ = Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Same as [`Self::create_offer_builder`], but allows specifying a custom [`MessageRouter`]
	 * instead of using the [`MessageRouter`] provided to the [`ChannelManager`] at construction.
	 * 
	 * This gives users full control over how the [`BlindedMessagePath`] is constructed,
	 * including the option to omit it entirely.
	 * 
	 * See [`Self::create_offer_builder`] for more details on usage.
	 * 
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public create_offer_builder_using_router(router: MessageRouter): Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ {
		const ret: bigint = bindings.ChannelManager_create_offer_builder_using_router(this.ptr, CommonBase.get_ptr_of(router));
		const ret_hu_conv: Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ = Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, router);
		return ret_hu_conv;
	}

	/**
	 * Creates a [`RefundBuilder`] such that the [`Refund`] it builds is recognized by the
	 * [`ChannelManager`] when handling [`Bolt12Invoice`] messages for the refund.
	 * 
	 * # Payment
	 * 
	 * The provided `payment_id` is used to ensure that only one invoice is paid for the refund.
	 * See [Avoiding Duplicate Payments] for other requirements once the payment has been sent.
	 * 
	 * The builder will have the provided expiration set. Any changes to the expiration on the
	 * returned builder will not be honored by [`ChannelManager`]. For non-`std`, the highest seen
	 * block time minus two hours is used for the current time when determining if the refund has
	 * expired.
	 * 
	 * To revoke the refund, use [`ChannelManager::abandon_payment`] prior to receiving the
	 * invoice. If abandoned, or an invoice isn't received before expiration, the payment will fail
	 * with an [`Event::PaymentFailed`].
	 * 
	 * If `max_total_routing_fee_msat` is not specified, The default from
	 * [`RouteParameters::from_payment_params_and_value`] is applied.
	 * 
	 * # Privacy
	 * 
	 * Uses [`MessageRouter`] provided at construction to construct a [`BlindedMessagePath`] for
	 * the refund. See the documentation of the selected [`MessageRouter`] for details on how it
	 * selects blinded paths including privacy implications and reliability tradeoffs.
	 * 
	 * Also, uses a derived payer id in the refund for payer privacy.
	 * 
	 * # Errors
	 * 
	 * Errors if:
	 * - a duplicate `payment_id` is provided given the caveats in the aforementioned link,
	 * - `amount_msats` is invalid, or
	 * - the parameterized [`Router`] is unable to create a blinded path for the refund.
	 * 
	 * [`Refund`]: crate::offers::refund::Refund
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * [`Bolt12Invoice::payment_paths`]: crate::offers::invoice::Bolt12Invoice::payment_paths
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 * [Avoiding Duplicate Payments]: #avoiding-duplicate-payments
	 */
	public create_refund_builder(amount_msats: bigint, absolute_expiry: bigint, payment_id: Uint8Array, retry_strategy: Retry, route_params_config: RouteParametersConfig): Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ {
		const ret: bigint = bindings.ChannelManager_create_refund_builder(this.ptr, amount_msats, absolute_expiry, bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(retry_strategy), CommonBase.get_ptr_of(route_params_config));
		const ret_hu_conv: Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ = Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Same as [`Self::create_refund_builder`], but allows specifying a custom [`MessageRouter`]
	 * instead of using the one provided during [`ChannelManager`] construction for
	 * [`BlindedMessagePath`] creation.
	 * 
	 * This gives users full control over how the [`BlindedMessagePath`] is constructed for the
	 * refund, including the option to omit it entirely. This is useful for testing or when
	 * alternative privacy strategies are needed.
	 * 
	 * See [`Self::create_refund_builder`] for more details on usage.
	 * 
	 * # Errors
	 * 
	 * In addition to the errors in [`Self::create_refund_builder`], this returns an error if
	 * the provided [`MessageRouter`] fails to construct a valid [`BlindedMessagePath`] for the refund.
	 * 
	 * [`Refund`]: crate::offers::refund::Refund
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public create_refund_builder_using_router(router: MessageRouter, amount_msats: bigint, absolute_expiry: bigint, payment_id: Uint8Array, retry_strategy: Retry, route_params_config: RouteParametersConfig): Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ {
		const ret: bigint = bindings.ChannelManager_create_refund_builder_using_router(this.ptr, CommonBase.get_ptr_of(router), amount_msats, absolute_expiry, bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(retry_strategy), CommonBase.get_ptr_of(route_params_config));
		const ret_hu_conv: Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ = Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, router);
		return ret_hu_conv;
	}

	/**
	 * Retrieve an [`Offer`] for receiving async payments as an often-offline recipient. Will only
	 * return an offer if [`Self::set_paths_to_static_invoice_server`] was called and we succeeded in
	 * interactively building a [`StaticInvoice`] with the static invoice server.
	 * 
	 * Useful for posting offers to receive payments later, such as posting an offer on a website.
	 */
	public get_async_receive_offer(): Result_OfferNoneZ {
		const ret: bigint = bindings.ChannelManager_get_async_receive_offer(this.ptr);
		const ret_hu_conv: Result_OfferNoneZ = Result_OfferNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets the [`BlindedMessagePath`]s that we will use as an async recipient to interactively build
	 * [`Offer`]s with a static invoice server, so the server can serve [`StaticInvoice`]s to payers
	 * on our behalf when we're offline.
	 * 
	 * This method only needs to be called once when the server first takes on the recipient as a
	 * client, or when the paths change, e.g. if the paths are set to expire at a particular time.
	 */
	public set_paths_to_static_invoice_server(paths_to_static_invoice_server: BlindedMessagePath[]): Result_NoneNoneZ {
		const ret: bigint = bindings.ChannelManager_set_paths_to_static_invoice_server(this.ptr, bindings.encodeUint64Array(paths_to_static_invoice_server.map(paths_to_static_invoice_server_conv_20 => CommonBase.get_ptr_of(paths_to_static_invoice_server_conv_20))));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Pays for an [`Offer`] using the given parameters by creating an [`InvoiceRequest`] and
	 * enqueuing it to be sent via an onion message. [`ChannelManager`] will pay the actual
	 * [`Bolt12Invoice`] once it is received.
	 * 
	 * Uses [`InvoiceRequestBuilder`] such that the [`InvoiceRequest`] it builds is recognized by
	 * the [`ChannelManager`] when handling a [`Bolt12Invoice`] message in response to the request.
	 * 
	 * `amount_msats` allows you to overpay what is required to satisfy the offer, or may be
	 * required if the offer does not require a specific amount.
	 * 
	 * If the [`Offer`] was built from a human readable name resolved using BIP 353, you *must*
	 * instead call [`Self::pay_for_offer_from_hrn`].
	 * 
	 * # Payment
	 * 
	 * The provided `payment_id` is used to ensure that only one invoice is paid for the request
	 * when received. See [Avoiding Duplicate Payments] for other requirements once the payment has
	 * been sent.
	 * 
	 * To revoke the request, use [`ChannelManager::abandon_payment`] prior to receiving the
	 * invoice. If abandoned, or an invoice isn't received in a reasonable amount of time, the
	 * payment will fail with an [`Event::PaymentFailed`].
	 * 
	 * # Privacy
	 * 
	 * For payer privacy, uses a derived payer id and uses [`MessageRouter::create_blinded_paths`]
	 * to construct a [`BlindedMessagePath`] for the reply path.
	 * 
	 * # Note
	 * 
	 * If the offer resolves to an async payment, and the HTLC is neither claimed nor failed by
	 * our next-hop peer, we will not force-close the channel to resolve the payment for 4
	 * weeks. This avoids an issue for often-offline nodes where channels are force-closed on
	 * startup during chain sync prior to connecting to peers. If you want to resolve such a
	 * timed-out payment more urgently, you can manually force-close the channel which will,
	 * after some transaction confirmation(s), result in an [`Event::PaymentFailed`].
	 * 
	 * # Errors
	 * 
	 * Errors if:
	 * - a duplicate `payment_id` is provided given the caveats in the aforementioned link,
	 * - the provided parameters are invalid for the offer,
	 * - the offer is for an unsupported chain, or
	 * - the parameterized [`Router`] is unable to create a blinded reply path for the invoice
	 * request.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`InvoiceRequestBuilder`]: crate::offers::invoice_request::InvoiceRequestBuilder
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 * [`Bolt12Invoice::payment_paths`]: crate::offers::invoice::Bolt12Invoice::payment_paths
	 * [Avoiding Duplicate Payments]: #avoiding-duplicate-payments
	 */
	public pay_for_offer(offer: Offer, amount_msats: Option_u64Z, payment_id: Uint8Array, optional_params_payer_note_arg: Option_StrZ, optional_params_route_params_config_arg: RouteParametersConfig, optional_params_retry_strategy_arg: Retry): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.ChannelManager_pay_for_offer(this.ptr, CommonBase.get_ptr_of(offer), CommonBase.get_ptr_of(amount_msats), bindings.encodeUint8Array(payment_id), bindings.OptionalOfferPaymentParams_new(CommonBase.get_ptr_of(optional_params_payer_note_arg), CommonBase.get_ptr_of(optional_params_route_params_config_arg), CommonBase.get_ptr_of(optional_params_retry_strategy_arg)));
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		;
		;
		;
		return ret_hu_conv;
	}

	/**
	 * Pays for an [`Offer`] which was built by resolving a human readable name. It is otherwise
	 * identical to [`Self::pay_for_offer`].
	 */
	public pay_for_offer_from_hrn(offer: OfferFromHrn, amount_msats: bigint, payment_id: Uint8Array, optional_params_payer_note_arg: Option_StrZ, optional_params_route_params_config_arg: RouteParametersConfig, optional_params_retry_strategy_arg: Retry): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.ChannelManager_pay_for_offer_from_hrn(this.ptr, CommonBase.get_ptr_of(offer), amount_msats, bindings.encodeUint8Array(payment_id), bindings.OptionalOfferPaymentParams_new(CommonBase.get_ptr_of(optional_params_payer_note_arg), CommonBase.get_ptr_of(optional_params_route_params_config_arg), CommonBase.get_ptr_of(optional_params_retry_strategy_arg)));
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, offer);
		;
		;
		;
		return ret_hu_conv;
	}

	/**
	 * Pays for an [`Offer`] using the given parameters, including a `quantity`, by creating an
	 * [`InvoiceRequest`] and enqueuing it to be sent via an onion message. [`ChannelManager`] will
	 * pay the actual [`Bolt12Invoice`] once it is received.
	 * 
	 * This method is identical to [`Self::pay_for_offer`] with the one exception that it allows
	 * you to specify the [`InvoiceRequest::quantity`]. We expect this to be rather seldomly used,
	 * as the \"quantity\" feature of offers doesn't line up with common payment flows today.
	 * 
	 * This method is otherwise identical to [`Self::pay_for_offer`] but will additionally fail if
	 * the provided `quantity` does not meet the requirements described by
	 * [`Offer::supported_quantity`].
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * [`InvoiceRequest::quantity`]: crate::offers::invoice_request::InvoiceRequest::quantity
	 */
	public pay_for_offer_with_quantity(offer: Offer, amount_msats: Option_u64Z, payment_id: Uint8Array, optional_params_payer_note_arg: Option_StrZ, optional_params_route_params_config_arg: RouteParametersConfig, optional_params_retry_strategy_arg: Retry, quantity: bigint): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.ChannelManager_pay_for_offer_with_quantity(this.ptr, CommonBase.get_ptr_of(offer), CommonBase.get_ptr_of(amount_msats), bindings.encodeUint8Array(payment_id), bindings.OptionalOfferPaymentParams_new(CommonBase.get_ptr_of(optional_params_payer_note_arg), CommonBase.get_ptr_of(optional_params_route_params_config_arg), CommonBase.get_ptr_of(optional_params_retry_strategy_arg)), quantity);
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		;
		;
		;
		return ret_hu_conv;
	}

	/**
	 * Creates a [`Bolt12Invoice`] for a [`Refund`] and enqueues it to be sent via an onion
	 * message.
	 * 
	 * The resulting invoice uses a [`PaymentHash`] recognized by the [`ChannelManager`] and a
	 * [`BlindedPaymentPath`] containing the [`PaymentSecret`] needed to reconstruct the
	 * corresponding [`PaymentPreimage`]. It is returned purely for informational purposes.
	 * 
	 * # Limitations
	 * 
	 * Requires a direct connection to an introduction node in [`Refund::paths`] or to
	 * [`Refund::payer_signing_pubkey`], if empty. This request is best effort; an invoice will be
	 * sent to each node meeting the aforementioned criteria, but there's no guarantee that they
	 * will be received and no retries will be made.
	 * 
	 * # Errors
	 * 
	 * Errors if:
	 * - the refund is for an unsupported chain, or
	 * - the parameterized [`Router`] is unable to create a blinded payment path or reply path for
	 * the invoice.
	 * 
	 * [`BlindedPaymentPath`]: crate::blinded_path::payment::BlindedPaymentPath
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public request_refund_payment(refund: Refund): Result_Bolt12InvoiceBolt12SemanticErrorZ {
		const ret: bigint = bindings.ChannelManager_request_refund_payment(this.ptr, CommonBase.get_ptr_of(refund));
		const ret_hu_conv: Result_Bolt12InvoiceBolt12SemanticErrorZ = Result_Bolt12InvoiceBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Pays for an [`Offer`] looked up using [BIP 353] Human Readable Names resolved by the DNS
	 * resolver(s) at `dns_resolvers` which resolve names according to [bLIP 32].
	 * 
	 * Because most wallets support on-chain or other payment schemes beyond only offers, this is
	 * deprecated in favor of the [`bitcoin-payment-instructions`] crate, which can be used to
	 * build an [`OfferFromHrn`] and call [`Self::pay_for_offer_from_hrn`]. Thus, this method is
	 * deprecated.
	 * 
	 * # Payment
	 * 
	 * The provided `payment_id` is used to ensure that only one invoice is paid for the request
	 * when received. See [Avoiding Duplicate Payments] for other requirements once the payment has
	 * been sent.
	 * 
	 * To revoke the request, use [`ChannelManager::abandon_payment`] prior to receiving the
	 * invoice. If abandoned, or an invoice isn't received in a reasonable amount of time, the
	 * payment will fail with an [`PaymentFailureReason::UserAbandoned`] or
	 * [`PaymentFailureReason::InvoiceRequestExpired`], respectively.
	 * 
	 * # Privacy
	 * 
	 * For payer privacy, uses a derived payer id and uses [`MessageRouter::create_blinded_paths`]
	 * to construct a [`BlindedMessagePath`] for the reply path.
	 * 
	 * # Errors
	 * 
	 * Errors if a duplicate `payment_id` is provided given the caveats in the aforementioned link.
	 * 
	 * [BIP 353]: https://github.com/bitcoin/bips/blob/master/bip-0353.mediawiki
	 * [bLIP 32]: https://github.com/lightning/blips/blob/master/blip-0032.md
	 * [`OMNameResolver::resolve_name`]: crate::onion_message::dns_resolution::OMNameResolver::resolve_name
	 * [`OMNameResolver::handle_dnssec_proof_for_uri`]: crate::onion_message::dns_resolution::OMNameResolver::handle_dnssec_proof_for_uri
	 * [`bitcoin-payment-instructions`]: https://docs.rs/bitcoin-payment-instructions/
	 * [Avoiding Duplicate Payments]: #avoiding-duplicate-payments
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 * [`PaymentFailureReason::UserAbandoned`]: crate::events::PaymentFailureReason::UserAbandoned
	 * [`PaymentFailureReason::InvoiceRequestRejected`]: crate::events::PaymentFailureReason::InvoiceRequestRejected
	 */
	public pay_for_offer_from_human_readable_name(name: HumanReadableName, amount_msats: bigint, payment_id: Uint8Array, optional_params_payer_note_arg: Option_StrZ, optional_params_route_params_config_arg: RouteParametersConfig, optional_params_retry_strategy_arg: Retry, dns_resolvers: Destination[]): Result_NoneNoneZ {
		const ret: bigint = bindings.ChannelManager_pay_for_offer_from_human_readable_name(this.ptr, CommonBase.get_ptr_of(name), amount_msats, bindings.encodeUint8Array(payment_id), bindings.OptionalOfferPaymentParams_new(CommonBase.get_ptr_of(optional_params_payer_note_arg), CommonBase.get_ptr_of(optional_params_route_params_config_arg), CommonBase.get_ptr_of(optional_params_retry_strategy_arg)), bindings.encodeUint64Array(dns_resolvers.map(dns_resolvers_conv_13 => CommonBase.get_ptr_of(dns_resolvers_conv_13))));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		;
		;
		;
		return ret_hu_conv;
	}

	/**
	 * Gets a payment secret and payment hash for use in an invoice given to a third party wishing
	 * to pay us.
	 * 
	 * This differs from [`create_inbound_payment_for_hash`] only in that it generates the
	 * [`PaymentHash`] and [`PaymentPreimage`] for you.
	 * 
	 * The [`PaymentPreimage`] will ultimately be returned to you in the [`PaymentClaimable`] event, which
	 * will have the [`PaymentClaimable::purpose`] return `Some` for [`PaymentPurpose::preimage`]. That
	 * should then be passed directly to [`claim_funds`].
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
	 * [`PaymentPurpose::preimage`]: events::PaymentPurpose::preimage
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 */
	public create_inbound_payment(min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number, min_final_cltv_expiry_delta: Option_u16Z): Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ {
		const ret: bigint = bindings.ChannelManager_create_inbound_payment(this.ptr, CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs, CommonBase.get_ptr_of(min_final_cltv_expiry_delta));
		const ret_hu_conv: Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ.constr_from_ptr(ret);
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
	public create_inbound_payment_for_hash(payment_hash: Uint8Array, min_value_msat: Option_u64Z, invoice_expiry_delta_secs: number, min_final_cltv_expiry: Option_u16Z): Result_ThirtyTwoBytesNoneZ {
		const ret: bigint = bindings.ChannelManager_create_inbound_payment_for_hash(this.ptr, bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(min_value_msat), invoice_expiry_delta_secs, CommonBase.get_ptr_of(min_final_cltv_expiry));
		const ret_hu_conv: Result_ThirtyTwoBytesNoneZ = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets an LDK-generated payment preimage from a payment hash and payment secret that were
	 * previously returned from [`create_inbound_payment`].
	 * 
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 */
	public get_payment_preimage(payment_hash: Uint8Array, payment_secret: Uint8Array): Result_ThirtyTwoBytesAPIErrorZ {
		const ret: bigint = bindings.ChannelManager_get_payment_preimage(this.ptr, bindings.encodeUint8Array(payment_hash), bindings.encodeUint8Array(payment_secret));
		const ret_hu_conv: Result_ThirtyTwoBytesAPIErrorZ = Result_ThirtyTwoBytesAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * [`BlindedMessagePath`]s for an async recipient to communicate with this node and interactively
	 * build [`Offer`]s and [`StaticInvoice`]s for receiving async payments.
	 * 
	 * ## Usage
	 * 1. Static invoice server calls [`Self::blinded_paths_for_async_recipient`]
	 * 2. Static invoice server communicates the resulting paths out-of-band to the async recipient,
	 * who calls [`Self::set_paths_to_static_invoice_server`] to configure themselves with these
	 * paths
	 * 3. Async recipient automatically sends [`OfferPathsRequest`]s over the configured paths, and
	 * uses the resulting paths from the server's [`OfferPaths`] response to build their async
	 * receive offer
	 * 
	 * If `relative_expiry` is unset, the [`BlindedMessagePath`]s will never expire.
	 * 
	 * Returns the paths that the recipient should be configured with via
	 * [`Self::set_paths_to_static_invoice_server`].
	 * 
	 * The provided `recipient_id` must uniquely identify the recipient, and will be surfaced later
	 * when the recipient provides us with a static invoice to persist and serve to payers on their
	 * behalf.
	 */
	public blinded_paths_for_async_recipient(recipient_id: Uint8Array, relative_expiry: Option_u64Z): Result_CVec_BlindedMessagePathZNoneZ {
		const ret: bigint = bindings.ChannelManager_blinded_paths_for_async_recipient(this.ptr, bindings.encodeUint8Array(recipient_id), CommonBase.get_ptr_of(relative_expiry));
		const ret_hu_conv: Result_CVec_BlindedMessagePathZNoneZ = Result_CVec_BlindedMessagePathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets a fake short channel id for use in receiving [phantom node payments]. These fake scids
	 * are used when constructing the phantom invoice's route hints.
	 * 
	 * [phantom node payments]: crate::sign::PhantomKeysManager
	 */
	public get_phantom_scid(): bigint {
		const ret: bigint = bindings.ChannelManager_get_phantom_scid(this.ptr);
		return ret;
	}

	/**
	 * Gets route hints for use in receiving [phantom node payments].
	 * 
	 * [phantom node payments]: crate::sign::PhantomKeysManager
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
	 * Constructs a new BaseMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseMessageHandler must be freed before this_arg is
	 */
	public as_BaseMessageHandler(): BaseMessageHandler {
		const ret: bigint = bindings.ChannelManager_as_BaseMessageHandler(this.ptr);
		const ret_hu_conv: BaseMessageHandler = new BaseMessageHandler(null, ret);
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
	 * Gets a [`Future`] that completes when this [`ChannelManager`] may need to be persisted or
	 * may have events that need processing.
	 * 
	 * In order to check if this [`ChannelManager`] needs persisting, call
	 * [`Self::get_and_clear_needs_persistence`].
	 * 
	 * Note that callbacks registered on the [`Future`] MUST NOT call back into this
	 * [`ChannelManager`] and should instead register actions to be taken later.
	 */
	public get_event_or_persistence_needed_future(): Future {
		const ret: bigint = bindings.ChannelManager_get_event_or_persistence_needed_future(this.ptr);
		const ret_hu_conv: Future = new Future(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns true if this [`ChannelManager`] needs to be persisted.
	 * 
	 * See [`Self::get_event_or_persistence_needed_future`] for retrieving a [`Future`] that
	 * indicates this should be checked.
	 */
	public get_and_clear_needs_persistence(): boolean {
		const ret: boolean = bindings.ChannelManager_get_and_clear_needs_persistence(this.ptr);
		return ret;
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
	 * Fetches the set of [`NodeFeatures`] flags that are provided by or required by
	 * [`ChannelManager`].
	 */
	public node_features(): NodeFeatures {
		const ret: bigint = bindings.ChannelManager_node_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`ChannelFeatures`] flags that are provided by or required by
	 * [`ChannelManager`].
	 */
	public channel_features(): ChannelFeatures {
		const ret: bigint = bindings.ChannelManager_channel_features(this.ptr);
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`ChannelTypeFeatures`] flags that are provided by or required by
	 * [`ChannelManager`].
	 */
	public channel_type_features(): ChannelTypeFeatures {
		const ret: bigint = bindings.ChannelManager_channel_type_features(this.ptr);
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`InitFeatures`] flags that are provided by or required by
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
	 * Constructs a new OffersMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OffersMessageHandler must be freed before this_arg is
	 */
	public as_OffersMessageHandler(): OffersMessageHandler {
		const ret: bigint = bindings.ChannelManager_as_OffersMessageHandler(this.ptr);
		const ret_hu_conv: OffersMessageHandler = new OffersMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new AsyncPaymentsMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned AsyncPaymentsMessageHandler must be freed before this_arg is
	 */
	public as_AsyncPaymentsMessageHandler(): AsyncPaymentsMessageHandler {
		const ret: bigint = bindings.ChannelManager_as_AsyncPaymentsMessageHandler(this.ptr);
		const ret_hu_conv: AsyncPaymentsMessageHandler = new AsyncPaymentsMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new DNSResolverMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned DNSResolverMessageHandler must be freed before this_arg is
	 */
	public as_DNSResolverMessageHandler(): DNSResolverMessageHandler {
		const ret: bigint = bindings.ChannelManager_as_DNSResolverMessageHandler(this.ptr);
		const ret_hu_conv: DNSResolverMessageHandler = new DNSResolverMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new NodeIdLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned NodeIdLookUp must be freed before this_arg is
	 */
	public as_NodeIdLookUp(): NodeIdLookUp {
		const ret: bigint = bindings.ChannelManager_as_NodeIdLookUp(this.ptr);
		const ret_hu_conv: NodeIdLookUp = new NodeIdLookUp(null, ret);
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
