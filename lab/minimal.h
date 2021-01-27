typedef struct LDKPublicKey {
   uint8_t compressed_form[33];
} LDKPublicKey;

typedef struct LDKMessageSendEvent_LDKSendAcceptChannel_Body {
   struct LDKPublicKey node_id;
} LDKMessageSendEvent_LDKSendAcceptChannel_Body;

typedef struct LDKChannelKeys {
   void *this_arg;
   /**
    * Gets the per-commitment point for a specific commitment number
    *
    * Note that the commitment number starts at (1 << 48) - 1 and counts backwards.
    */
   struct LDKPublicKey (*get_per_commitment_point)(const void *this_arg, uint64_t idx);
   void (*free)(void *this_arg);
} LDKChannelKeys;

void ChannelDetails_set_remote_network_id(struct LDKPublicKey remote_public_key);
