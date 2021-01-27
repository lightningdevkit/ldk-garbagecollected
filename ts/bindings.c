#include <rust_types.h>
#include "js-wasm.h"
#include <stdatomic.h>
#include <lightning.h>

// These should be provided...somehow...
void *memset(void *s, int c, size_t n);
void *memcpy(void *dest, const void *src, size_t n);
int memcmp(const void *s1, const void *s2, size_t n);

void __attribute__((noreturn)) abort(void);
void assert(bool expression);

// Always run a, then assert it is true:
#define DO_ASSERT(a) do { bool _assert_val = (a); assert(_assert_val); } while(0)
// Assert a is true or do nothing
#define CHECK(a) DO_ASSERT(a)

// Running a leak check across all the allocations and frees of the JDK is a mess,
// so instead we implement our own naive leak checker here, relying on the -wrap
// linker option to wrap malloc/calloc/realloc/free, tracking everyhing allocated
// and free'd in Rust or C across the generated bindings shared library.

#define BT_MAX 128
typedef struct allocation {
	struct allocation* next;
	void* ptr;
	const char* struct_name;
} allocation;
static allocation* allocation_ll = NULL;

void* __real_malloc(size_t len);
void* __real_calloc(size_t nmemb, size_t len);
static void new_allocation(void* res, const char* struct_name) {
	allocation* new_alloc = __real_malloc(sizeof(allocation));
	new_alloc->ptr = res;
	new_alloc->struct_name = struct_name;
	new_alloc->next = allocation_ll;
	allocation_ll = new_alloc;
}
static void* MALLOC(size_t len, const char* struct_name) {
	void* res = __real_malloc(len);
	new_allocation(res, struct_name);
	return res;
}
void __real_free(void* ptr);
static void alloc_freed(void* ptr) {
	allocation* p = NULL;
	allocation* it = allocation_ll;
	while (it->ptr != ptr) {
		p = it; it = it->next;
		if (it == NULL) {
			//XXX: fprintf(stderr, "Tried to free unknown pointer %p\n", ptr);
			return; // addrsan should catch malloc-unknown and print more info than we have
		}
	}
	if (p) { p->next = it->next; } else { allocation_ll = it->next; }
	DO_ASSERT(it->ptr == ptr);
	__real_free(it);
}
static void FREE(void* ptr) {
	if ((long)ptr < 1024) return; // Rust loves to create pointers to the NULL page for dummys
	alloc_freed(ptr);
	__real_free(ptr);
}

void* __wrap_malloc(size_t len) {
	void* res = __real_malloc(len);
	new_allocation(res, "malloc call");
	return res;
}
void* __wrap_calloc(size_t nmemb, size_t len) {
	void* res = __real_calloc(nmemb, len);
	new_allocation(res, "calloc call");
	return res;
}
void __wrap_free(void* ptr) {
	if (ptr == NULL) return;
	alloc_freed(ptr);
	__real_free(ptr);
}

void* __real_realloc(void* ptr, size_t newlen);
void* __wrap_realloc(void* ptr, size_t len) {
	if (ptr != NULL) alloc_freed(ptr);
	void* res = __real_realloc(ptr, len);
	new_allocation(res, "realloc call");
	return res;
}
void __wrap_reallocarray(void* ptr, size_t new_sz) {
	// Rust doesn't seem to use reallocarray currently
	DO_ASSERT(false);
}

void __attribute__((destructor)) check_leaks() {
	for (allocation* a = allocation_ll; a != NULL; a = a->next) {
		//XXX: fprintf(stderr, "%s %p remains\n", a->struct_name, a->ptr);
	}
	DO_ASSERT(allocation_ll == NULL);
}

// We assume that CVec_u8Z and u8slice are the same size and layout (and thus pointers to the two can be mixed)
_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKu8slice), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, data) == offsetof(LDKu8slice, data), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKu8slice, datalen), "Vec<u8> and [u8] need to have been mapped identically");

_Static_assert(sizeof(void*) == 4, "Pointers mut be 32 bits");

typedef struct int64_tArray { uint32_t *len; /* len + 1 is data */ } int64_tArray;
typedef struct uint32_tArray { uint32_t *len; /* len + 1 is data */ } uint32_tArray;
typedef struct ptrArray { uint32_t *len; /* len + 1 is data */ } ptrArray;
typedef struct int8_tArray { uint32_t *len; /* len + 1 is data */ } int8_tArray;
typedef struct jstring {} jstring;

jstring conv_owned_string(const char* _src) { jstring a; return a; }

typedef bool jboolean;

static inline struct LDKThirtyTwoBytes ThirtyTwoBytes_clone(const struct LDKThirtyTwoBytes *orig) { struct LDKThirtyTwoBytes ret; memcpy(ret.data, orig->data, 32); return ret; }
static inline LDKAccessError LDKAccessError_from_js(int32_t ord) {
	switch (ord) {
		case 0: return LDKAccessError_UnknownChain;
		case 1: return LDKAccessError_UnknownTx;
	}
	abort();
}
static inline int32_t LDKAccessError_to_js(LDKAccessError val) {
	switch (val) {
		case LDKAccessError_UnknownChain: return 0;
		case LDKAccessError_UnknownTx: return 1;
		default: abort();
	}
}
static inline LDKChannelMonitorUpdateErr LDKChannelMonitorUpdateErr_from_js(int32_t ord) {
	switch (ord) {
		case 0: return LDKChannelMonitorUpdateErr_TemporaryFailure;
		case 1: return LDKChannelMonitorUpdateErr_PermanentFailure;
	}
	abort();
}
static inline int32_t LDKChannelMonitorUpdateErr_to_js(LDKChannelMonitorUpdateErr val) {
	switch (val) {
		case LDKChannelMonitorUpdateErr_TemporaryFailure: return 0;
		case LDKChannelMonitorUpdateErr_PermanentFailure: return 1;
		default: abort();
	}
}
static inline LDKConfirmationTarget LDKConfirmationTarget_from_js(int32_t ord) {
	switch (ord) {
		case 0: return LDKConfirmationTarget_Background;
		case 1: return LDKConfirmationTarget_Normal;
		case 2: return LDKConfirmationTarget_HighPriority;
	}
	abort();
}
static inline int32_t LDKConfirmationTarget_to_js(LDKConfirmationTarget val) {
	switch (val) {
		case LDKConfirmationTarget_Background: return 0;
		case LDKConfirmationTarget_Normal: return 1;
		case LDKConfirmationTarget_HighPriority: return 2;
		default: abort();
	}
}
static inline LDKLevel LDKLevel_from_js(int32_t ord) {
	switch (ord) {
		case 0: return LDKLevel_Off;
		case 1: return LDKLevel_Error;
		case 2: return LDKLevel_Warn;
		case 3: return LDKLevel_Info;
		case 4: return LDKLevel_Debug;
		case 5: return LDKLevel_Trace;
	}
	abort();
}
static inline int32_t LDKLevel_to_js(LDKLevel val) {
	switch (val) {
		case LDKLevel_Off: return 0;
		case LDKLevel_Error: return 1;
		case LDKLevel_Warn: return 2;
		case LDKLevel_Info: return 3;
		case LDKLevel_Debug: return 4;
		case LDKLevel_Trace: return 5;
		default: abort();
	}
}
static inline LDKNetwork LDKNetwork_from_js(int32_t ord) {
	switch (ord) {
		case 0: return LDKNetwork_Bitcoin;
		case 1: return LDKNetwork_Testnet;
		case 2: return LDKNetwork_Regtest;
	}
	abort();
}
static inline int32_t LDKNetwork_to_js(LDKNetwork val) {
	switch (val) {
		case LDKNetwork_Bitcoin: return 0;
		case LDKNetwork_Testnet: return 1;
		case LDKNetwork_Regtest: return 2;
		default: abort();
	}
}
static inline LDKSecp256k1Error LDKSecp256k1Error_from_js(int32_t ord) {
	switch (ord) {
		case 0: return LDKSecp256k1Error_IncorrectSignature;
		case 1: return LDKSecp256k1Error_InvalidMessage;
		case 2: return LDKSecp256k1Error_InvalidPublicKey;
		case 3: return LDKSecp256k1Error_InvalidSignature;
		case 4: return LDKSecp256k1Error_InvalidSecretKey;
		case 5: return LDKSecp256k1Error_InvalidRecoveryId;
		case 6: return LDKSecp256k1Error_InvalidTweak;
		case 7: return LDKSecp256k1Error_NotEnoughMemory;
		case 8: return LDKSecp256k1Error_CallbackPanicked;
	}
	abort();
}
static inline int32_t LDKSecp256k1Error_to_js(LDKSecp256k1Error val) {
	switch (val) {
		case LDKSecp256k1Error_IncorrectSignature: return 0;
		case LDKSecp256k1Error_InvalidMessage: return 1;
		case LDKSecp256k1Error_InvalidPublicKey: return 2;
		case LDKSecp256k1Error_InvalidSignature: return 3;
		case LDKSecp256k1Error_InvalidSecretKey: return 4;
		case LDKSecp256k1Error_InvalidRecoveryId: return 5;
		case LDKSecp256k1Error_InvalidTweak: return 6;
		case LDKSecp256k1Error_NotEnoughMemory: return 7;
		case LDKSecp256k1Error_CallbackPanicked: return 8;
		default: abort();
	}
}
uint32_t LDKCVec_1u8Z_1new(void* ctx_TODO, int8_tArray elems) {
	LDKCVec_u8Z *ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(uint8_t) * ret->datalen, "LDKCVec_u8Z Data");
		int8_t *java_elems = (int8_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			ret->data[i] = java_elems[i];
		}
	}
	return (long)ret;
}
static inline LDKCVec_u8Z CVec_u8Z_clone(const LDKCVec_u8Z *orig) {
	LDKCVec_u8Z ret = { .data = MALLOC(sizeof(int8_t) * orig->datalen, "LDKCVec_u8Z clone bytes"), .datalen = orig->datalen };
	memcpy(ret.data, orig->data, sizeof(int8_t) * ret.datalen);
	return ret;
}
uint32_t LDKC2Tuple_1u64u64Z_1new(void* ctx_TODO, int64_t a, int64_t b) {
	LDKC2Tuple_u64u64Z* ret = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	ret->a = a;
	ret->b = b;
	return (long)ret;
}
static inline LDKC2Tuple_u64u64Z C2Tuple_u64u64Z_clone(const LDKC2Tuple_u64u64Z *orig) {
	LDKC2Tuple_u64u64Z ret = {
		.a = orig->a,
		.b = orig->b,
	};
	return ret;
}
int64_t LDKC2Tuple_1u64u64Z_1get_1a(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_u64u64Z *tuple = (LDKC2Tuple_u64u64Z*)ptr;
	return tuple->a;
}
int64_t LDKC2Tuple_1u64u64Z_1get_1b(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_u64u64Z *tuple = (LDKC2Tuple_u64u64Z*)ptr;
	return tuple->b;
}
uint32_t LDKSpendableOutputDescriptor_1ref_1from_1ptr (void* ctx_TODO, uint32_t ptr) {
	LDKSpendableOutputDescriptor *obj = (LDKSpendableOutputDescriptor*)ptr;
	switch(obj->tag) {
		case LDKSpendableOutputDescriptor_StaticOutput: {
			LDKOutPoint outpoint_var = obj->static_output.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			long output_ref = (long)&obj->static_output.output;
			return 0 /* LDKSpendableOutputDescriptor - StaticOutput */; (void) outpoint_ref; (void) (long)output_ref;
		}
		case LDKSpendableOutputDescriptor_DynamicOutputP2WSH: {
			LDKOutPoint outpoint_var = obj->dynamic_output_p2wsh.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			int8_tArray per_commitment_point_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(per_commitment_point_arr.len + 1, obj->dynamic_output_p2wsh.per_commitment_point.compressed_form, 33);
			long output_ref = (long)&obj->dynamic_output_p2wsh.output;
			long key_derivation_params_ref = (long)&obj->dynamic_output_p2wsh.key_derivation_params;
			int8_tArray revocation_pubkey_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(revocation_pubkey_arr.len + 1, obj->dynamic_output_p2wsh.revocation_pubkey.compressed_form, 33);
			return 0 /* LDKSpendableOutputDescriptor - DynamicOutputP2WSH */; (void) outpoint_ref; (void) per_commitment_point_arr; (void) obj->dynamic_output_p2wsh.to_self_delay; (void) (long)output_ref; (void) key_derivation_params_ref; (void) revocation_pubkey_arr;
		}
		case LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment: {
			LDKOutPoint outpoint_var = obj->static_output_counterparty_payment.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			long output_ref = (long)&obj->static_output_counterparty_payment.output;
			long key_derivation_params_ref = (long)&obj->static_output_counterparty_payment.key_derivation_params;
			return 0 /* LDKSpendableOutputDescriptor - StaticOutputCounterpartyPayment */; (void) outpoint_ref; (void) (long)output_ref; (void) key_derivation_params_ref;
		}
		default: abort();
	}
}
uint32_t LDKCVec_1SpendableOutputDescriptorZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_SpendableOutputDescriptorZ *ret = MALLOC(sizeof(LDKCVec_SpendableOutputDescriptorZ), "LDKCVec_SpendableOutputDescriptorZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKSpendableOutputDescriptor) * ret->datalen, "LDKCVec_SpendableOutputDescriptorZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKSpendableOutputDescriptor arr_elem_conv = *(LDKSpendableOutputDescriptor*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_SpendableOutputDescriptorZ CVec_SpendableOutputDescriptorZ_clone(const LDKCVec_SpendableOutputDescriptorZ *orig) {
	LDKCVec_SpendableOutputDescriptorZ ret = { .data = MALLOC(sizeof(LDKSpendableOutputDescriptor) * orig->datalen, "LDKCVec_SpendableOutputDescriptorZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = SpendableOutputDescriptor_clone(&orig->data[i]);
	}
	return ret;
}
uint32_t LDKErrorAction_1ref_1from_1ptr (void* ctx_TODO, uint32_t ptr) {
	LDKErrorAction *obj = (LDKErrorAction*)ptr;
	switch(obj->tag) {
		case LDKErrorAction_DisconnectPeer: {
			LDKErrorMessage msg_var = obj->disconnect_peer.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKErrorAction - DisconnectPeer */; (void) msg_ref;
		}
		case LDKErrorAction_IgnoreError: {
			return 0 /* LDKErrorAction - IgnoreError */;
		}
		case LDKErrorAction_SendErrorMessage: {
			LDKErrorMessage msg_var = obj->send_error_message.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKErrorAction - SendErrorMessage */; (void) msg_ref;
		}
		default: abort();
	}
}
uint32_t LDKHTLCFailChannelUpdate_1ref_1from_1ptr (void* ctx_TODO, uint32_t ptr) {
	LDKHTLCFailChannelUpdate *obj = (LDKHTLCFailChannelUpdate*)ptr;
	switch(obj->tag) {
		case LDKHTLCFailChannelUpdate_ChannelUpdateMessage: {
			LDKChannelUpdate msg_var = obj->channel_update_message.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKHTLCFailChannelUpdate - ChannelUpdateMessage */; (void) msg_ref;
		}
		case LDKHTLCFailChannelUpdate_ChannelClosed: {
			return 0 /* LDKHTLCFailChannelUpdate - ChannelClosed */; (void) obj->channel_closed.short_channel_id; (void) obj->channel_closed.is_permanent;
		}
		case LDKHTLCFailChannelUpdate_NodeFailure: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->node_failure.node_id.compressed_form, 33);
			return 0 /* LDKHTLCFailChannelUpdate - NodeFailure */; (void) node_id_arr; (void) obj->node_failure.is_permanent;
		}
		default: abort();
	}
}
uint32_t LDKMessageSendEvent_1ref_1from_1ptr (void* ctx_TODO, uint32_t ptr) {
	LDKMessageSendEvent *obj = (LDKMessageSendEvent*)ptr;
	switch(obj->tag) {
		case LDKMessageSendEvent_SendAcceptChannel: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_accept_channel.node_id.compressed_form, 33);
			LDKAcceptChannel msg_var = obj->send_accept_channel.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendAcceptChannel */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendOpenChannel: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_open_channel.node_id.compressed_form, 33);
			LDKOpenChannel msg_var = obj->send_open_channel.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendOpenChannel */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendFundingCreated: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_funding_created.node_id.compressed_form, 33);
			LDKFundingCreated msg_var = obj->send_funding_created.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendFundingCreated */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendFundingSigned: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_funding_signed.node_id.compressed_form, 33);
			LDKFundingSigned msg_var = obj->send_funding_signed.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendFundingSigned */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendFundingLocked: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_funding_locked.node_id.compressed_form, 33);
			LDKFundingLocked msg_var = obj->send_funding_locked.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendFundingLocked */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendAnnouncementSignatures: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_announcement_signatures.node_id.compressed_form, 33);
			LDKAnnouncementSignatures msg_var = obj->send_announcement_signatures.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendAnnouncementSignatures */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_UpdateHTLCs: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->update_htl_cs.node_id.compressed_form, 33);
			LDKCommitmentUpdate updates_var = obj->update_htl_cs.updates;
			CHECK((((long)updates_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&updates_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long updates_ref = (long)updates_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - UpdateHTLCs */; (void) node_id_arr; (void) updates_ref;
		}
		case LDKMessageSendEvent_SendRevokeAndACK: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_revoke_and_ack.node_id.compressed_form, 33);
			LDKRevokeAndACK msg_var = obj->send_revoke_and_ack.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendRevokeAndACK */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendClosingSigned: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_closing_signed.node_id.compressed_form, 33);
			LDKClosingSigned msg_var = obj->send_closing_signed.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendClosingSigned */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendShutdown: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_shutdown.node_id.compressed_form, 33);
			LDKShutdown msg_var = obj->send_shutdown.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendShutdown */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendChannelReestablish: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_channel_reestablish.node_id.compressed_form, 33);
			LDKChannelReestablish msg_var = obj->send_channel_reestablish.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendChannelReestablish */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_BroadcastChannelAnnouncement: {
			LDKChannelAnnouncement msg_var = obj->broadcast_channel_announcement.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			LDKChannelUpdate update_msg_var = obj->broadcast_channel_announcement.update_msg;
			CHECK((((long)update_msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&update_msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long update_msg_ref = (long)update_msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - BroadcastChannelAnnouncement */; (void) msg_ref; (void) update_msg_ref;
		}
		case LDKMessageSendEvent_BroadcastNodeAnnouncement: {
			LDKNodeAnnouncement msg_var = obj->broadcast_node_announcement.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - BroadcastNodeAnnouncement */; (void) msg_ref;
		}
		case LDKMessageSendEvent_BroadcastChannelUpdate: {
			LDKChannelUpdate msg_var = obj->broadcast_channel_update.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - BroadcastChannelUpdate */; (void) msg_ref;
		}
		case LDKMessageSendEvent_HandleError: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->handle_error.node_id.compressed_form, 33);
			long action_ref = (long)&obj->handle_error.action;
			return 0 /* LDKMessageSendEvent - HandleError */; (void) node_id_arr; (void) action_ref;
		}
		case LDKMessageSendEvent_PaymentFailureNetworkUpdate: {
			long update_ref = (long)&obj->payment_failure_network_update.update;
			return 0 /* LDKMessageSendEvent - PaymentFailureNetworkUpdate */; (void) update_ref;
		}
		case LDKMessageSendEvent_SendChannelRangeQuery: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_channel_range_query.node_id.compressed_form, 33);
			LDKQueryChannelRange msg_var = obj->send_channel_range_query.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendChannelRangeQuery */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendShortIdsQuery: {
			int8_tArray node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(node_id_arr.len + 1, obj->send_short_ids_query.node_id.compressed_form, 33);
			LDKQueryShortChannelIds msg_var = obj->send_short_ids_query.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendShortIdsQuery */; (void) node_id_arr; (void) msg_ref;
		}
		default: abort();
	}
}
uint32_t LDKCVec_1MessageSendEventZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_MessageSendEventZ *ret = MALLOC(sizeof(LDKCVec_MessageSendEventZ), "LDKCVec_MessageSendEventZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKMessageSendEvent) * ret->datalen, "LDKCVec_MessageSendEventZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKMessageSendEvent arr_elem_conv = *(LDKMessageSendEvent*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_MessageSendEventZ CVec_MessageSendEventZ_clone(const LDKCVec_MessageSendEventZ *orig) {
	LDKCVec_MessageSendEventZ ret = { .data = MALLOC(sizeof(LDKMessageSendEvent) * orig->datalen, "LDKCVec_MessageSendEventZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = MessageSendEvent_clone(&orig->data[i]);
	}
	return ret;
}
uint32_t LDKEvent_1ref_1from_1ptr (void* ctx_TODO, uint32_t ptr) {
	LDKEvent *obj = (LDKEvent*)ptr;
	switch(obj->tag) {
		case LDKEvent_FundingGenerationReady: {
			int8_tArray temporary_channel_id_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(temporary_channel_id_arr.len + 1, obj->funding_generation_ready.temporary_channel_id.data, 32);
			LDKCVec_u8Z output_script_var = obj->funding_generation_ready.output_script;
			int8_tArray output_script_arr = { .len = MALLOC(output_script_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(output_script_arr.len + 1, output_script_var.data, output_script_var.datalen);
			return 0 /* LDKEvent - FundingGenerationReady */; (void) temporary_channel_id_arr; (void) obj->funding_generation_ready.channel_value_satoshis; (void) output_script_arr; (void) obj->funding_generation_ready.user_channel_id;
		}
		case LDKEvent_FundingBroadcastSafe: {
			LDKOutPoint funding_txo_var = obj->funding_broadcast_safe.funding_txo;
			CHECK((((long)funding_txo_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&funding_txo_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long funding_txo_ref = (long)funding_txo_var.inner & ~1;
			return 0 /* LDKEvent - FundingBroadcastSafe */; (void) funding_txo_ref; (void) obj->funding_broadcast_safe.user_channel_id;
		}
		case LDKEvent_PaymentReceived: {
			int8_tArray payment_hash_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(payment_hash_arr.len + 1, obj->payment_received.payment_hash.data, 32);
			int8_tArray payment_secret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(payment_secret_arr.len + 1, obj->payment_received.payment_secret.data, 32);
			return 0 /* LDKEvent - PaymentReceived */; (void) payment_hash_arr; (void) payment_secret_arr; (void) obj->payment_received.amt;
		}
		case LDKEvent_PaymentSent: {
			int8_tArray payment_preimage_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(payment_preimage_arr.len + 1, obj->payment_sent.payment_preimage.data, 32);
			return 0 /* LDKEvent - PaymentSent */; (void) payment_preimage_arr;
		}
		case LDKEvent_PaymentFailed: {
			int8_tArray payment_hash_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(payment_hash_arr.len + 1, obj->payment_failed.payment_hash.data, 32);
			return 0 /* LDKEvent - PaymentFailed */; (void) payment_hash_arr; (void) obj->payment_failed.rejected_by_dest;
		}
		case LDKEvent_PendingHTLCsForwardable: {
			return 0 /* LDKEvent - PendingHTLCsForwardable */; (void) obj->pending_htl_cs_forwardable.time_forwardable;
		}
		case LDKEvent_SpendableOutputs: {
			LDKCVec_SpendableOutputDescriptorZ outputs_var = obj->spendable_outputs.outputs;
			uint32_tArray outputs_arr = { .len = MALLOC(outputs_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
			uint32_t *outputs_arr_ptr = (uint32_t*)(outputs_arr.len + 1);
			for (size_t b = 0; b < outputs_var.datalen; b++) {
				long arr_conv_27_ref = (long)&outputs_var.data[b];
				outputs_arr_ptr[b] = arr_conv_27_ref;
			}
			return 0 /* LDKEvent - SpendableOutputs */; (void) outputs_arr;
		}
		default: abort();
	}
}
uint32_t LDKCVec_1EventZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_EventZ *ret = MALLOC(sizeof(LDKCVec_EventZ), "LDKCVec_EventZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKEvent) * ret->datalen, "LDKCVec_EventZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKEvent arr_elem_conv = *(LDKEvent*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_EventZ CVec_EventZ_clone(const LDKCVec_EventZ *orig) {
	LDKCVec_EventZ ret = { .data = MALLOC(sizeof(LDKEvent) * orig->datalen, "LDKCVec_EventZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = Event_clone(&orig->data[i]);
	}
	return ret;
}
uint32_t LDKC2Tuple_1usizeTransactionZ_1new(void* ctx_TODO, intptr_t a, int8_tArray b) {
	LDKC2Tuple_usizeTransactionZ* ret = MALLOC(sizeof(LDKC2Tuple_usizeTransactionZ), "LDKC2Tuple_usizeTransactionZ");
	ret->a = a;
	LDKTransaction b_ref;
	b_ref.datalen = *b.len;
	b_ref.data = MALLOC(b_ref.datalen, "LDKTransaction Bytes");
	memcpy(b_ref.data, b.len + 1, b_ref.datalen);
	b_ref.data_is_owned = false;
	ret->b = b_ref;
	return (long)ret;
}
intptr_t LDKC2Tuple_1usizeTransactionZ_1get_1a(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_usizeTransactionZ *tuple = (LDKC2Tuple_usizeTransactionZ*)ptr;
	return tuple->a;
}
int8_tArray LDKC2Tuple_1usizeTransactionZ_1get_1b(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_usizeTransactionZ *tuple = (LDKC2Tuple_usizeTransactionZ*)ptr;
	LDKTransaction b_var = tuple->b;
	int8_tArray b_arr = { .len = MALLOC(b_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(b_arr.len + 1, b_var.data, b_var.datalen);
	return b_arr;
}
uint32_t LDKCVec_1C2Tuple_1usizeTransactionZZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_C2Tuple_usizeTransactionZZ *ret = MALLOC(sizeof(LDKCVec_C2Tuple_usizeTransactionZZ), "LDKCVec_C2Tuple_usizeTransactionZZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2Tuple_usizeTransactionZ) * ret->datalen, "LDKCVec_C2Tuple_usizeTransactionZZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKC2Tuple_usizeTransactionZ arr_elem_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
jboolean LDKCResult_1NoneChannelMonitorUpdateErrZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_NoneChannelMonitorUpdateErrZ*)arg)->result_ok;
}
void LDKCResult_1NoneChannelMonitorUpdateErrZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ *val = (LDKCResult_NoneChannelMonitorUpdateErrZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t LDKCResult_1NoneChannelMonitorUpdateErrZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ *val = (LDKCResult_NoneChannelMonitorUpdateErrZ*)arg;
	CHECK(!val->result_ok);
	uint32_t err_conv = LDKChannelMonitorUpdateErr_to_js((*val->contents.err));
	return err_conv;
}
static inline LDKCResult_NoneChannelMonitorUpdateErrZ CResult_NoneChannelMonitorUpdateErrZ_clone(const LDKCResult_NoneChannelMonitorUpdateErrZ *orig) {
	LDKCResult_NoneChannelMonitorUpdateErrZ res = { .result_ok = orig->result_ok };
	if (orig->result_ok) {
		res.contents.result = NULL;
	} else {
		LDKChannelMonitorUpdateErr* contents = MALLOC(sizeof(LDKChannelMonitorUpdateErr), "LDKChannelMonitorUpdateErr result Err clone");
		*contents = ChannelMonitorUpdateErr_clone(orig->contents.err);
		res.contents.err = contents;
	}
	return res;
}
uint32_t LDKCVec_1MonitorEventZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_MonitorEventZ *ret = MALLOC(sizeof(LDKCVec_MonitorEventZ), "LDKCVec_MonitorEventZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKMonitorEvent) * ret->datalen, "LDKCVec_MonitorEventZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKMonitorEvent arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = MonitorEvent_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_MonitorEventZ CVec_MonitorEventZ_clone(const LDKCVec_MonitorEventZ *orig) {
	LDKCVec_MonitorEventZ ret = { .data = MALLOC(sizeof(LDKMonitorEvent) * orig->datalen, "LDKCVec_MonitorEventZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = MonitorEvent_clone(&orig->data[i]);
	}
	return ret;
}
jboolean LDKCResult_1ChannelMonitorUpdateDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1ChannelMonitorUpdateDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ *val = (LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKChannelMonitorUpdate res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1ChannelMonitorUpdateDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ *val = (LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1NoneMonitorUpdateErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_NoneMonitorUpdateErrorZ*)arg)->result_ok;
}
void LDKCResult_1NoneMonitorUpdateErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NoneMonitorUpdateErrorZ *val = (LDKCResult_NoneMonitorUpdateErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t LDKCResult_1NoneMonitorUpdateErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NoneMonitorUpdateErrorZ *val = (LDKCResult_NoneMonitorUpdateErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKMonitorUpdateError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
uint32_t LDKC2Tuple_1OutPointScriptZ_1new(void* ctx_TODO, uint32_t a, int8_tArray b) {
	LDKC2Tuple_OutPointScriptZ* ret = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	LDKOutPoint a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = OutPoint_clone(&a_conv);
	ret->a = a_conv;
	LDKCVec_u8Z b_ref;
	b_ref.datalen = *b.len;
	b_ref.data = MALLOC(b_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(b_ref.data, b.len + 1, b_ref.datalen);
	ret->b = b_ref;
	return (long)ret;
}
static inline LDKC2Tuple_OutPointScriptZ C2Tuple_OutPointScriptZ_clone(const LDKC2Tuple_OutPointScriptZ *orig) {
	LDKC2Tuple_OutPointScriptZ ret = {
		.a = OutPoint_clone(&orig->a),
		.b = CVec_u8Z_clone(&orig->b),
	};
	return ret;
}
uint32_t LDKC2Tuple_1OutPointScriptZ_1get_1a(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_OutPointScriptZ *tuple = (LDKC2Tuple_OutPointScriptZ*)ptr;
	LDKOutPoint a_var = tuple->a;
	CHECK((((long)a_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&a_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long a_ref = (long)a_var.inner & ~1;
	return a_ref;
}
int8_tArray LDKC2Tuple_1OutPointScriptZ_1get_1b(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_OutPointScriptZ *tuple = (LDKC2Tuple_OutPointScriptZ*)ptr;
	LDKCVec_u8Z b_var = tuple->b;
	int8_tArray b_arr = { .len = MALLOC(b_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(b_arr.len + 1, b_var.data, b_var.datalen);
	return b_arr;
}
uint32_t LDKC2Tuple_1u32TxOutZ_1new(void* ctx_TODO, int32_t a, uint32_t b) {
	LDKC2Tuple_u32TxOutZ* ret = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ), "LDKC2Tuple_u32TxOutZ");
	ret->a = a;
	LDKTxOut b_conv = *(LDKTxOut*)b;
	FREE((void*)b);
	ret->b = b_conv;
	return (long)ret;
}
int32_t LDKC2Tuple_1u32TxOutZ_1get_1a(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_u32TxOutZ *tuple = (LDKC2Tuple_u32TxOutZ*)ptr;
	return tuple->a;
}
uint32_t LDKC2Tuple_1u32TxOutZ_1get_1b(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_u32TxOutZ *tuple = (LDKC2Tuple_u32TxOutZ*)ptr;
	long b_ref = (long)&tuple->b;
	return (long)b_ref;
}
uint32_t LDKCVec_1C2Tuple_1u32TxOutZZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_C2Tuple_u32TxOutZZ *ret = MALLOC(sizeof(LDKCVec_C2Tuple_u32TxOutZZ), "LDKCVec_C2Tuple_u32TxOutZZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ) * ret->datalen, "LDKCVec_C2Tuple_u32TxOutZZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKC2Tuple_u32TxOutZ arr_elem_conv = *(LDKC2Tuple_u32TxOutZ*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
uint32_t LDKC2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZ_1new(void* ctx_TODO, int8_tArray a, uint32_tArray b) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ* ret = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ");
	LDKThirtyTwoBytes a_ref;
	CHECK(*a.len == 32);
	memcpy(a_ref.data, a.len + 1, 32);
	ret->a = a_ref;
	LDKCVec_C2Tuple_u32TxOutZZ b_constr;
	b_constr.datalen = *b.len;
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKC2Tuple_u32TxOutZ), "LDKCVec_C2Tuple_u32TxOutZZ Elements");
	else
		b_constr.data = NULL;
	uint32_t* b_vals = (uint32_t*)(b.len + 1);
	for (size_t z = 0; z < b_constr.datalen; z++) {
		uint32_t arr_conv_25 = b_vals[z];
		LDKC2Tuple_u32TxOutZ arr_conv_25_conv = *(LDKC2Tuple_u32TxOutZ*)arr_conv_25;
		FREE((void*)arr_conv_25);
		b_constr.data[z] = arr_conv_25_conv;
	}
	ret->b = b_constr;
	return (long)ret;
}
int8_tArray LDKC2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZ_1get_1a(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ *tuple = (LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)ptr;
	int8_tArray a_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(a_arr.len + 1, tuple->a.data, 32);
	return a_arr;
}
uint32_tArray LDKC2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZ_1get_1b(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ *tuple = (LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)ptr;
	LDKCVec_C2Tuple_u32TxOutZZ b_var = tuple->b;
	uint32_tArray b_arr = { .len = MALLOC(b_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *b_arr_ptr = (uint32_t*)(b_arr.len + 1);
	for (size_t z = 0; z < b_var.datalen; z++) {
		long arr_conv_25_ref = (long)&b_var.data[z];
		b_arr_ptr[z] = arr_conv_25_ref;
	}
	return b_arr;
}
uint32_t LDKCVec_1C2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ *ret = MALLOC(sizeof(LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ), "LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ) * ret->datalen, "LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ arr_elem_conv = *(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
uint32_t LDKC2Tuple_1SignatureCVec_1SignatureZZ_1new(void* ctx_TODO, int8_tArray a, ptrArray b) {
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret = MALLOC(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ), "LDKC2Tuple_SignatureCVec_SignatureZZ");
	LDKSignature a_ref;
	CHECK(*a.len == 64);
	memcpy(a_ref.compact_form, a.len + 1, 64);
	ret->a = a_ref;
	LDKCVec_SignatureZ b_constr;
	b_constr.datalen = *b.len;
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		b_constr.data = NULL;
	int8_tArray* b_vals = (int8_tArray*)(b.len + 1);
	for (size_t m = 0; m < b_constr.datalen; m++) {
		int8_tArray arr_conv_12 = b_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*arr_conv_12.len == 64);
		memcpy(arr_conv_12_ref.compact_form, arr_conv_12.len + 1, 64);
		b_constr.data[m] = arr_conv_12_ref;
	}
	ret->b = b_constr;
	return (long)ret;
}
int8_tArray LDKC2Tuple_1SignatureCVec_1SignatureZZ_1get_1a(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_SignatureCVec_SignatureZZ *tuple = (LDKC2Tuple_SignatureCVec_SignatureZZ*)ptr;
	int8_tArray a_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(a_arr.len + 1, tuple->a.compact_form, 64);
	return a_arr;
}
ptrArray LDKC2Tuple_1SignatureCVec_1SignatureZZ_1get_1b(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_SignatureCVec_SignatureZZ *tuple = (LDKC2Tuple_SignatureCVec_SignatureZZ*)ptr;
	LDKCVec_SignatureZ b_var = tuple->b;
	ptrArray b_arr = { .len = MALLOC(b_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native Object Bytes") };
	int8_tArray *b_arr_ptr = (int8_tArray*)(b_arr.len + 1);
	for (size_t m = 0; m < b_var.datalen; m++) {
		int8_tArray arr_conv_12_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
		memcpy(arr_conv_12_arr.len + 1, b_var.data[m].compact_form, 64);
		b_arr_ptr[m] = arr_conv_12_arr;
	}
	return b_arr;
}
jboolean LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg)->result_ok;
}
uint32_t LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ *val = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
void LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ *val = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
jboolean LDKCResult_1SignatureNoneZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_SignatureNoneZ*)arg)->result_ok;
}
int8_tArray LDKCResult_1SignatureNoneZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_SignatureNoneZ *val = (LDKCResult_SignatureNoneZ*)arg;
	CHECK(val->result_ok);
	int8_tArray res_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(res_arr.len + 1, (*val->contents.result).compact_form, 64);
	return res_arr;
}
void LDKCResult_1SignatureNoneZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_SignatureNoneZ *val = (LDKCResult_SignatureNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
jboolean LDKCResult_1CVec_1SignatureZNoneZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_CVec_SignatureZNoneZ*)arg)->result_ok;
}
ptrArray LDKCResult_1CVec_1SignatureZNoneZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_CVec_SignatureZNoneZ *val = (LDKCResult_CVec_SignatureZNoneZ*)arg;
	CHECK(val->result_ok);
	LDKCVec_SignatureZ res_var = (*val->contents.result);
	ptrArray res_arr = { .len = MALLOC(res_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native Object Bytes") };
	int8_tArray *res_arr_ptr = (int8_tArray*)(res_arr.len + 1);
	for (size_t m = 0; m < res_var.datalen; m++) {
		int8_tArray arr_conv_12_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
		memcpy(arr_conv_12_arr.len + 1, res_var.data[m].compact_form, 64);
		res_arr_ptr[m] = arr_conv_12_arr;
	}
	return res_arr;
}
void LDKCResult_1CVec_1SignatureZNoneZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_CVec_SignatureZNoneZ *val = (LDKCResult_CVec_SignatureZNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
typedef struct LDKChannelKeys_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer get_per_commitment_point_meth;
	// TODO: Some kind of method pointer release_commitment_secret_meth;
	// TODO: Some kind of method pointer key_derivation_params_meth;
	// TODO: Some kind of method pointer sign_counterparty_commitment_meth;
	// TODO: Some kind of method pointer sign_holder_commitment_meth;
	// TODO: Some kind of method pointer sign_holder_commitment_htlc_transactions_meth;
	// TODO: Some kind of method pointer sign_justice_transaction_meth;
	// TODO: Some kind of method pointer sign_counterparty_htlc_transaction_meth;
	// TODO: Some kind of method pointer sign_closing_transaction_meth;
	// TODO: Some kind of method pointer sign_channel_announcement_meth;
	// TODO: Some kind of method pointer ready_channel_meth;
	// TODO: Some kind of method pointer write_meth;
} LDKChannelKeys_JCalls;
static void LDKChannelKeys_JCalls_free(void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
LDKPublicKey get_per_commitment_point_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	int8_tArray arg; // TODO: Call get_per_commitment_point on j_calls with instance obj, returning an object, idx);
	LDKPublicKey arg_ref;
	CHECK(*arg.len == 33);
	memcpy(arg_ref.compressed_form, arg.len + 1, 33);
	return arg_ref;
}
LDKThirtyTwoBytes release_commitment_secret_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	int8_tArray arg; // TODO: Call release_commitment_secret on j_calls with instance obj, returning an object, idx);
	LDKThirtyTwoBytes arg_ref;
	CHECK(*arg.len == 32);
	memcpy(arg_ref.data, arg.len + 1, 32);
	return arg_ref;
}
LDKC2Tuple_u64u64Z key_derivation_params_jcall(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKC2Tuple_u64u64Z* ret; // TODO: Call key_derivation_params on j_calls with instance obj, returning a pointer);
	LDKC2Tuple_u64u64Z ret_conv = *(LDKC2Tuple_u64u64Z*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment_jcall(const void* this_arg, const LDKCommitmentTransaction * commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKCommitmentTransaction commitment_tx_var = *commitment_tx;
	if (commitment_tx->inner != NULL)
		commitment_tx_var = CommitmentTransaction_clone(commitment_tx);
	CHECK((((long)commitment_tx_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&commitment_tx_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long commitment_tx_ref = (long)commitment_tx_var.inner;
	if (commitment_tx_var.is_owned) {
		commitment_tx_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret; // TODO: Call sign_counterparty_commitment on j_calls with instance obj, returning a pointer, commitment_tx_ref);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_holder_commitment_jcall(const void* this_arg, const LDKHolderCommitmentTransaction * commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKHolderCommitmentTransaction commitment_tx_var = *commitment_tx;
	if (commitment_tx->inner != NULL)
		commitment_tx_var = HolderCommitmentTransaction_clone(commitment_tx);
	CHECK((((long)commitment_tx_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&commitment_tx_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long commitment_tx_ref = (long)commitment_tx_var.inner;
	if (commitment_tx_var.is_owned) {
		commitment_tx_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_SignatureNoneZ* ret; // TODO: Call sign_holder_commitment on j_calls with instance obj, returning a pointer, commitment_tx_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_CVec_SignatureZNoneZ sign_holder_commitment_htlc_transactions_jcall(const void* this_arg, const LDKHolderCommitmentTransaction * commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKHolderCommitmentTransaction commitment_tx_var = *commitment_tx;
	if (commitment_tx->inner != NULL)
		commitment_tx_var = HolderCommitmentTransaction_clone(commitment_tx);
	CHECK((((long)commitment_tx_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&commitment_tx_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long commitment_tx_ref = (long)commitment_tx_var.inner;
	if (commitment_tx_var.is_owned) {
		commitment_tx_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_CVec_SignatureZNoneZ* ret; // TODO: Call sign_holder_commitment_htlc_transactions on j_calls with instance obj, returning a pointer, commitment_tx_ref);
	LDKCResult_CVec_SignatureZNoneZ ret_conv = *(LDKCResult_CVec_SignatureZNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_justice_transaction_jcall(const void* this_arg, LDKTransaction justice_tx, uintptr_t input, uint64_t amount, const uint8_t (* per_commitment_key)[32], const LDKHTLCOutputInCommitment * htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKTransaction justice_tx_var = justice_tx;
	int8_tArray justice_tx_arr = { .len = MALLOC(justice_tx_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(justice_tx_arr.len + 1, justice_tx_var.data, justice_tx_var.datalen);
	Transaction_free(justice_tx_var);
	int8_tArray per_commitment_key_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(per_commitment_key_arr.len + 1, *per_commitment_key, 32);
	LDKHTLCOutputInCommitment htlc_var = *htlc;
	if (htlc->inner != NULL)
		htlc_var = HTLCOutputInCommitment_clone(htlc);
	CHECK((((long)htlc_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&htlc_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long htlc_ref = (long)htlc_var.inner;
	if (htlc_var.is_owned) {
		htlc_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_SignatureNoneZ* ret; // TODO: Call sign_justice_transaction on j_calls with instance obj, returning a pointer, justice_tx_arr, input, amount, per_commitment_key_arr, htlc_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_counterparty_htlc_transaction_jcall(const void* this_arg, LDKTransaction htlc_tx, uintptr_t input, uint64_t amount, LDKPublicKey per_commitment_point, const LDKHTLCOutputInCommitment * htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKTransaction htlc_tx_var = htlc_tx;
	int8_tArray htlc_tx_arr = { .len = MALLOC(htlc_tx_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(htlc_tx_arr.len + 1, htlc_tx_var.data, htlc_tx_var.datalen);
	Transaction_free(htlc_tx_var);
	int8_tArray per_commitment_point_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(per_commitment_point_arr.len + 1, per_commitment_point.compressed_form, 33);
	LDKHTLCOutputInCommitment htlc_var = *htlc;
	if (htlc->inner != NULL)
		htlc_var = HTLCOutputInCommitment_clone(htlc);
	CHECK((((long)htlc_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&htlc_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long htlc_ref = (long)htlc_var.inner;
	if (htlc_var.is_owned) {
		htlc_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_SignatureNoneZ* ret; // TODO: Call sign_counterparty_htlc_transaction on j_calls with instance obj, returning a pointer, htlc_tx_arr, input, amount, per_commitment_point_arr, htlc_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_closing_transaction_jcall(const void* this_arg, LDKTransaction closing_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKTransaction closing_tx_var = closing_tx;
	int8_tArray closing_tx_arr = { .len = MALLOC(closing_tx_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(closing_tx_arr.len + 1, closing_tx_var.data, closing_tx_var.datalen);
	Transaction_free(closing_tx_var);
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_SignatureNoneZ* ret; // TODO: Call sign_closing_transaction on j_calls with instance obj, returning a pointer, closing_tx_arr);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_channel_announcement_jcall(const void* this_arg, const LDKUnsignedChannelAnnouncement * msg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKUnsignedChannelAnnouncement msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UnsignedChannelAnnouncement_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_SignatureNoneZ* ret; // TODO: Call sign_channel_announcement on j_calls with instance obj, returning a pointer, msg_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
void ready_channel_jcall(void* this_arg, const LDKChannelTransactionParameters * channel_parameters) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKChannelTransactionParameters channel_parameters_var = *channel_parameters;
	if (channel_parameters->inner != NULL)
		channel_parameters_var = ChannelTransactionParameters_clone(channel_parameters);
	CHECK((((long)channel_parameters_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&channel_parameters_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long channel_parameters_ref = (long)channel_parameters_var.inner;
	if (channel_parameters_var.is_owned) {
		channel_parameters_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call ready_channel on j_calls with instance obj, channel_parameters_ref);
}
LDKCVec_u8Z write_jcall(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	int8_tArray arg; // TODO: Call write on j_calls with instance obj, returning an object);
	LDKCVec_u8Z arg_ref;
	arg_ref.datalen = *arg.len;
	arg_ref.data = MALLOC(arg_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(arg_ref.data, arg.len + 1, arg_ref.datalen);
	return arg_ref;
}
static void* LDKChannelKeys_JCalls_clone(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKChannelKeys LDKChannelKeys_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o, uint32_t pubkeys) {
	LDKChannelKeys_JCalls *calls = MALLOC(sizeof(LDKChannelKeys_JCalls), "LDKChannelKeys_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKChannelPublicKeys pubkeys_conv;
	pubkeys_conv.inner = (void*)(pubkeys & (~1));
	pubkeys_conv.is_owned = (pubkeys & 1) || (pubkeys == 0);
	if (pubkeys_conv.inner != NULL)
		pubkeys_conv = ChannelPublicKeys_clone(&pubkeys_conv);

	LDKChannelKeys ret = {
		.this_arg = (void*) calls,
		.get_per_commitment_point = get_per_commitment_point_jcall,
		.release_commitment_secret = release_commitment_secret_jcall,
		.key_derivation_params = key_derivation_params_jcall,
		.sign_counterparty_commitment = sign_counterparty_commitment_jcall,
		.sign_holder_commitment = sign_holder_commitment_jcall,
		.sign_holder_commitment_htlc_transactions = sign_holder_commitment_htlc_transactions_jcall,
		.sign_justice_transaction = sign_justice_transaction_jcall,
		.sign_counterparty_htlc_transaction = sign_counterparty_htlc_transaction_jcall,
		.sign_closing_transaction = sign_closing_transaction_jcall,
		.sign_channel_announcement = sign_channel_announcement_jcall,
		.ready_channel = ready_channel_jcall,
		.clone = LDKChannelKeys_JCalls_clone,
		.write = write_jcall,
		.free = LDKChannelKeys_JCalls_free,
		.pubkeys = pubkeys_conv,
		.set_pubkeys = NULL,
	};
	return ret;
}
long LDKChannelKeys_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o, uint32_t pubkeys) {
	LDKChannelKeys *res_ptr = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*res_ptr = LDKChannelKeys_init(NULL, o, pubkeys);
	return (long)res_ptr;
}
int8_tArray ChannelKeys_1get_1per_1commitment_1point(void* ctx_TODO, uint32_t this_arg, int64_t idx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, (this_arg_conv->get_per_commitment_point)(this_arg_conv->this_arg, idx).compressed_form, 33);
	return arg_arr;
}

int8_tArray ChannelKeys_1release_1commitment_1secret(void* ctx_TODO, uint32_t this_arg, int64_t idx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	int8_tArray arg_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, (this_arg_conv->release_commitment_secret)(this_arg_conv->this_arg, idx).data, 32);
	return arg_arr;
}

uint32_t ChannelKeys_1key_1derivation_1params(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKC2Tuple_u64u64Z* ret_ref = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret_ref = (this_arg_conv->key_derivation_params)(this_arg_conv->this_arg);
	return (long)ret_ref;
}

uint32_t ChannelKeys_1sign_1counterparty_1commitment(void* ctx_TODO, uint32_t this_arg, uint32_t commitment_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = false;
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = (this_arg_conv->sign_counterparty_commitment)(this_arg_conv->this_arg, &commitment_tx_conv);
	return (long)ret_conv;
}

uint32_t ChannelKeys_1sign_1holder_1commitment(void* ctx_TODO, uint32_t this_arg, uint32_t commitment_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKHolderCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_holder_commitment)(this_arg_conv->this_arg, &commitment_tx_conv);
	return (long)ret_conv;
}

uint32_t ChannelKeys_1sign_1holder_1commitment_1htlc_1transactions(void* ctx_TODO, uint32_t this_arg, uint32_t commitment_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKHolderCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = false;
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = (this_arg_conv->sign_holder_commitment_htlc_transactions)(this_arg_conv->this_arg, &commitment_tx_conv);
	return (long)ret_conv;
}

uint32_t ChannelKeys_1sign_1justice_1transaction(void* ctx_TODO, uint32_t this_arg, int8_tArray justice_tx, intptr_t input, int64_t amount, int8_tArray per_commitment_key, uint32_t htlc) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction justice_tx_ref;
	justice_tx_ref.datalen = *justice_tx.len;
	justice_tx_ref.data = MALLOC(justice_tx_ref.datalen, "LDKTransaction Bytes");
	memcpy(justice_tx_ref.data, justice_tx.len + 1, justice_tx_ref.datalen);
	justice_tx_ref.data_is_owned = true;
	unsigned char per_commitment_key_arr[32];
	CHECK(*per_commitment_key.len == 32);
	memcpy(per_commitment_key_arr, per_commitment_key.len + 1, 32);
	unsigned char (*per_commitment_key_ref)[32] = &per_commitment_key_arr;
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_justice_transaction)(this_arg_conv->this_arg, justice_tx_ref, input, amount, per_commitment_key_ref, &htlc_conv);
	return (long)ret_conv;
}

uint32_t ChannelKeys_1sign_1counterparty_1htlc_1transaction(void* ctx_TODO, uint32_t this_arg, int8_tArray htlc_tx, intptr_t input, int64_t amount, int8_tArray per_commitment_point, uint32_t htlc) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction htlc_tx_ref;
	htlc_tx_ref.datalen = *htlc_tx.len;
	htlc_tx_ref.data = MALLOC(htlc_tx_ref.datalen, "LDKTransaction Bytes");
	memcpy(htlc_tx_ref.data, htlc_tx.len + 1, htlc_tx_ref.datalen);
	htlc_tx_ref.data_is_owned = true;
	LDKPublicKey per_commitment_point_ref;
	CHECK(*per_commitment_point.len == 33);
	memcpy(per_commitment_point_ref.compressed_form, per_commitment_point.len + 1, 33);
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_counterparty_htlc_transaction)(this_arg_conv->this_arg, htlc_tx_ref, input, amount, per_commitment_point_ref, &htlc_conv);
	return (long)ret_conv;
}

uint32_t ChannelKeys_1sign_1closing_1transaction(void* ctx_TODO, uint32_t this_arg, int8_tArray closing_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction closing_tx_ref;
	closing_tx_ref.datalen = *closing_tx.len;
	closing_tx_ref.data = MALLOC(closing_tx_ref.datalen, "LDKTransaction Bytes");
	memcpy(closing_tx_ref.data, closing_tx.len + 1, closing_tx_ref.datalen);
	closing_tx_ref.data_is_owned = true;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_closing_transaction)(this_arg_conv->this_arg, closing_tx_ref);
	return (long)ret_conv;
}

uint32_t ChannelKeys_1sign_1channel_1announcement(void* ctx_TODO, uint32_t this_arg, uint32_t msg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKUnsignedChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_channel_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

void ChannelKeys_1ready_1channel(void* ctx_TODO, uint32_t this_arg, uint32_t channel_parameters) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKChannelTransactionParameters channel_parameters_conv;
	channel_parameters_conv.inner = (void*)(channel_parameters & (~1));
	channel_parameters_conv.is_owned = false;
	(this_arg_conv->ready_channel)(this_arg_conv->this_arg, &channel_parameters_conv);
}

int8_tArray ChannelKeys_1write(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKCVec_u8Z arg_var = (this_arg_conv->write)(this_arg_conv->this_arg);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

LDKChannelPublicKeys LDKChannelKeys_set_get_pubkeys(LDKChannelKeys* this_arg) {
	if (this_arg->set_pubkeys != NULL)
		this_arg->set_pubkeys(this_arg);
	return this_arg->pubkeys;
}
uint32_t ChannelKeys_1get_1pubkeys(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKChannelPublicKeys ret_var = LDKChannelKeys_set_get_pubkeys(this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t LDKC2Tuple_1BlockHashChannelMonitorZ_1new(void* ctx_TODO, int8_tArray a, uint32_t b) {
	LDKC2Tuple_BlockHashChannelMonitorZ* ret = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelMonitorZ), "LDKC2Tuple_BlockHashChannelMonitorZ");
	LDKThirtyTwoBytes a_ref;
	CHECK(*a.len == 32);
	memcpy(a_ref.data, a.len + 1, 32);
	ret->a = a_ref;
	LDKChannelMonitor b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	// Warning: we may need a move here but can't clone!
	ret->b = b_conv;
	return (long)ret;
}
int8_tArray LDKC2Tuple_1BlockHashChannelMonitorZ_1get_1a(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_BlockHashChannelMonitorZ *tuple = (LDKC2Tuple_BlockHashChannelMonitorZ*)ptr;
	int8_tArray a_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(a_arr.len + 1, tuple->a.data, 32);
	return a_arr;
}
uint32_t LDKC2Tuple_1BlockHashChannelMonitorZ_1get_1b(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_BlockHashChannelMonitorZ *tuple = (LDKC2Tuple_BlockHashChannelMonitorZ*)ptr;
	LDKChannelMonitor b_var = tuple->b;
	CHECK((((long)b_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&b_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long b_ref = (long)b_var.inner & ~1;
	return b_ref;
}
jboolean LDKCResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
uint32_t LDKCResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1SpendableOutputDescriptorDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1SpendableOutputDescriptorDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ *val = (LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
uint32_t LDKCResult_1SpendableOutputDescriptorDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ *val = (LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1ChanKeySignerDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_ChanKeySignerDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1ChanKeySignerDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ChanKeySignerDecodeErrorZ *val = (LDKCResult_ChanKeySignerDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = (*val->contents.result);
	return (long)ret;
}
uint32_t LDKCResult_1ChanKeySignerDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ChanKeySignerDecodeErrorZ *val = (LDKCResult_ChanKeySignerDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1InMemoryChannelKeysDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_InMemoryChannelKeysDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1InMemoryChannelKeysDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_InMemoryChannelKeysDecodeErrorZ *val = (LDKCResult_InMemoryChannelKeysDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKInMemoryChannelKeys res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1InMemoryChannelKeysDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_InMemoryChannelKeysDecodeErrorZ *val = (LDKCResult_InMemoryChannelKeysDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1TxOutAccessErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_TxOutAccessErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1TxOutAccessErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_TxOutAccessErrorZ *val = (LDKCResult_TxOutAccessErrorZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return (long)res_ref;
}
uint32_t LDKCResult_1TxOutAccessErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_TxOutAccessErrorZ *val = (LDKCResult_TxOutAccessErrorZ*)arg;
	CHECK(!val->result_ok);
	uint32_t err_conv = LDKAccessError_to_js((*val->contents.err));
	return err_conv;
}
uint32_t LDKAPIError_1ref_1from_1ptr (void* ctx_TODO, uint32_t ptr) {
	LDKAPIError *obj = (LDKAPIError*)ptr;
	switch(obj->tag) {
		case LDKAPIError_APIMisuseError: {
			LDKCVec_u8Z err_var = obj->api_misuse_error.err;
			int8_tArray err_arr = { .len = MALLOC(err_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(err_arr.len + 1, err_var.data, err_var.datalen);
			return 0 /* LDKAPIError - APIMisuseError */; (void) err_arr;
		}
		case LDKAPIError_FeeRateTooHigh: {
			LDKCVec_u8Z err_var = obj->fee_rate_too_high.err;
			int8_tArray err_arr = { .len = MALLOC(err_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(err_arr.len + 1, err_var.data, err_var.datalen);
			return 0 /* LDKAPIError - FeeRateTooHigh */; (void) err_arr; (void) obj->fee_rate_too_high.feerate;
		}
		case LDKAPIError_RouteError: {
			LDKStr err_str = obj->route_error.err;
			char* err_buf = MALLOC(err_str.len + 1, "str conv buf");
			memcpy(err_buf, err_str.chars, err_str.len);
			err_buf[err_str.len] = 0;
			jstring err_conv = conv_owned_string(err_str.chars);
			FREE(err_buf);
			return 0 /* LDKAPIError - RouteError */; (void) err_conv;
		}
		case LDKAPIError_ChannelUnavailable: {
			LDKCVec_u8Z err_var = obj->channel_unavailable.err;
			int8_tArray err_arr = { .len = MALLOC(err_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(err_arr.len + 1, err_var.data, err_var.datalen);
			return 0 /* LDKAPIError - ChannelUnavailable */; (void) err_arr;
		}
		case LDKAPIError_MonitorUpdateFailed: {
			return 0 /* LDKAPIError - MonitorUpdateFailed */;
		}
		default: abort();
	}
}
jboolean LDKCResult_1NoneAPIErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_NoneAPIErrorZ*)arg)->result_ok;
}
void LDKCResult_1NoneAPIErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NoneAPIErrorZ *val = (LDKCResult_NoneAPIErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t LDKCResult_1NoneAPIErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NoneAPIErrorZ *val = (LDKCResult_NoneAPIErrorZ*)arg;
	CHECK(!val->result_ok);
	long err_ref = (long)&(*val->contents.err);
	return err_ref;
}
static inline LDKCResult_NoneAPIErrorZ CResult_NoneAPIErrorZ_clone(const LDKCResult_NoneAPIErrorZ *orig) {
	LDKCResult_NoneAPIErrorZ res = { .result_ok = orig->result_ok };
	if (orig->result_ok) {
		res.contents.result = NULL;
	} else {
		LDKAPIError* contents = MALLOC(sizeof(LDKAPIError), "LDKAPIError result Err clone");
		*contents = APIError_clone(orig->contents.err);
		res.contents.err = contents;
	}
	return res;
}
uint32_t LDKCVec_1ChannelDetailsZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_ChannelDetailsZ *ret = MALLOC(sizeof(LDKCVec_ChannelDetailsZ), "LDKCVec_ChannelDetailsZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKChannelDetails) * ret->datalen, "LDKCVec_ChannelDetailsZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKChannelDetails arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = ChannelDetails_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_ChannelDetailsZ CVec_ChannelDetailsZ_clone(const LDKCVec_ChannelDetailsZ *orig) {
	LDKCVec_ChannelDetailsZ ret = { .data = MALLOC(sizeof(LDKChannelDetails) * orig->datalen, "LDKCVec_ChannelDetailsZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = ChannelDetails_clone(&orig->data[i]);
	}
	return ret;
}
jboolean LDKCResult_1NonePaymentSendFailureZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_NonePaymentSendFailureZ*)arg)->result_ok;
}
void LDKCResult_1NonePaymentSendFailureZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NonePaymentSendFailureZ *val = (LDKCResult_NonePaymentSendFailureZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t LDKCResult_1NonePaymentSendFailureZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NonePaymentSendFailureZ *val = (LDKCResult_NonePaymentSendFailureZ*)arg;
	CHECK(!val->result_ok);
	LDKPaymentSendFailure err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
uint32_t LDKNetAddress_1ref_1from_1ptr (void* ctx_TODO, uint32_t ptr) {
	LDKNetAddress *obj = (LDKNetAddress*)ptr;
	switch(obj->tag) {
		case LDKNetAddress_IPv4: {
			int8_tArray addr_arr = { .len = MALLOC(4 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(addr_arr.len + 1, obj->i_pv4.addr.data, 4);
			return 0 /* LDKNetAddress - IPv4 */; (void) addr_arr; (void) obj->i_pv4.port;
		}
		case LDKNetAddress_IPv6: {
			int8_tArray addr_arr = { .len = MALLOC(16 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(addr_arr.len + 1, obj->i_pv6.addr.data, 16);
			return 0 /* LDKNetAddress - IPv6 */; (void) addr_arr; (void) obj->i_pv6.port;
		}
		case LDKNetAddress_OnionV2: {
			int8_tArray addr_arr = { .len = MALLOC(10 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(addr_arr.len + 1, obj->onion_v2.addr.data, 10);
			return 0 /* LDKNetAddress - OnionV2 */; (void) addr_arr; (void) obj->onion_v2.port;
		}
		case LDKNetAddress_OnionV3: {
			int8_tArray ed25519_pubkey_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
			memcpy(ed25519_pubkey_arr.len + 1, obj->onion_v3.ed25519_pubkey.data, 32);
			return 0 /* LDKNetAddress - OnionV3 */; (void) ed25519_pubkey_arr; (void) obj->onion_v3.checksum; (void) obj->onion_v3.version; (void) obj->onion_v3.port;
		}
		default: abort();
	}
}
uint32_t LDKCVec_1NetAddressZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_NetAddressZ *ret = MALLOC(sizeof(LDKCVec_NetAddressZ), "LDKCVec_NetAddressZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKNetAddress) * ret->datalen, "LDKCVec_NetAddressZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKNetAddress arr_elem_conv = *(LDKNetAddress*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_NetAddressZ CVec_NetAddressZ_clone(const LDKCVec_NetAddressZ *orig) {
	LDKCVec_NetAddressZ ret = { .data = MALLOC(sizeof(LDKNetAddress) * orig->datalen, "LDKCVec_NetAddressZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = NetAddress_clone(&orig->data[i]);
	}
	return ret;
}
uint32_t LDKCVec_1ChannelMonitorZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_ChannelMonitorZ *ret = MALLOC(sizeof(LDKCVec_ChannelMonitorZ), "LDKCVec_ChannelMonitorZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKChannelMonitor) * ret->datalen, "LDKCVec_ChannelMonitorZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKChannelMonitor arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			// Warning: we may need a move here but can't clone!
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
typedef struct LDKWatch_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer watch_channel_meth;
	// TODO: Some kind of method pointer update_channel_meth;
	// TODO: Some kind of method pointer release_pending_monitor_events_meth;
} LDKWatch_JCalls;
static void LDKWatch_JCalls_free(void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
LDKCResult_NoneChannelMonitorUpdateErrZ watch_channel_jcall(const void* this_arg, LDKOutPoint funding_txo, LDKChannelMonitor monitor) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	LDKOutPoint funding_txo_var = funding_txo;
	CHECK((((long)funding_txo_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&funding_txo_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long funding_txo_ref = (long)funding_txo_var.inner;
	if (funding_txo_var.is_owned) {
		funding_txo_ref |= 1;
	}
	LDKChannelMonitor monitor_var = monitor;
	CHECK((((long)monitor_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&monitor_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long monitor_ref = (long)monitor_var.inner;
	if (monitor_var.is_owned) {
		monitor_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret; // TODO: Call watch_channel on j_calls with instance obj, returning a pointer, funding_txo_ref, monitor_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_NoneChannelMonitorUpdateErrZ update_channel_jcall(const void* this_arg, LDKOutPoint funding_txo, LDKChannelMonitorUpdate update) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	LDKOutPoint funding_txo_var = funding_txo;
	CHECK((((long)funding_txo_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&funding_txo_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long funding_txo_ref = (long)funding_txo_var.inner;
	if (funding_txo_var.is_owned) {
		funding_txo_ref |= 1;
	}
	LDKChannelMonitorUpdate update_var = update;
	CHECK((((long)update_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&update_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long update_ref = (long)update_var.inner;
	if (update_var.is_owned) {
		update_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret; // TODO: Call update_channel on j_calls with instance obj, returning a pointer, funding_txo_ref, update_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCVec_MonitorEventZ release_pending_monitor_events_jcall(const void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	uint32_tArray arg; // TODO: Call release_pending_monitor_events on j_calls with instance obj, returning an object);
	LDKCVec_MonitorEventZ arg_constr;
	arg_constr.datalen = *arg.len;
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKMonitorEvent), "LDKCVec_MonitorEventZ Elements");
	else
		arg_constr.data = NULL;
	uint32_t* arg_vals = (uint32_t*)(arg.len + 1);
	for (size_t o = 0; o < arg_constr.datalen; o++) {
		uint32_t arr_conv_14 = arg_vals[o];
		LDKMonitorEvent arr_conv_14_conv;
		arr_conv_14_conv.inner = (void*)(arr_conv_14 & (~1));
		arr_conv_14_conv.is_owned = (arr_conv_14 & 1) || (arr_conv_14 == 0);
		if (arr_conv_14_conv.inner != NULL)
			arr_conv_14_conv = MonitorEvent_clone(&arr_conv_14_conv);
		arg_constr.data[o] = arr_conv_14_conv;
	}
	return arg_constr;
}
static void* LDKWatch_JCalls_clone(const void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKWatch LDKWatch_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKWatch_JCalls *calls = MALLOC(sizeof(LDKWatch_JCalls), "LDKWatch_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKWatch ret = {
		.this_arg = (void*) calls,
		.watch_channel = watch_channel_jcall,
		.update_channel = update_channel_jcall,
		.release_pending_monitor_events = release_pending_monitor_events_jcall,
		.free = LDKWatch_JCalls_free,
	};
	return ret;
}
long LDKWatch_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKWatch *res_ptr = MALLOC(sizeof(LDKWatch), "LDKWatch");
	*res_ptr = LDKWatch_init(NULL, o);
	return (long)res_ptr;
}
uint32_t Watch_1watch_1channel(void* ctx_TODO, uint32_t this_arg, uint32_t funding_txo, uint32_t monitor) {
	LDKWatch* this_arg_conv = (LDKWatch*)this_arg;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	if (funding_txo_conv.inner != NULL)
		funding_txo_conv = OutPoint_clone(&funding_txo_conv);
	LDKChannelMonitor monitor_conv;
	monitor_conv.inner = (void*)(monitor & (~1));
	monitor_conv.is_owned = (monitor & 1) || (monitor == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->watch_channel)(this_arg_conv->this_arg, funding_txo_conv, monitor_conv);
	return (long)ret_conv;
}

uint32_t Watch_1update_1channel(void* ctx_TODO, uint32_t this_arg, uint32_t funding_txo, uint32_t update) {
	LDKWatch* this_arg_conv = (LDKWatch*)this_arg;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	if (funding_txo_conv.inner != NULL)
		funding_txo_conv = OutPoint_clone(&funding_txo_conv);
	LDKChannelMonitorUpdate update_conv;
	update_conv.inner = (void*)(update & (~1));
	update_conv.is_owned = (update & 1) || (update == 0);
	if (update_conv.inner != NULL)
		update_conv = ChannelMonitorUpdate_clone(&update_conv);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->update_channel)(this_arg_conv->this_arg, funding_txo_conv, update_conv);
	return (long)ret_conv;
}

uint32_tArray Watch_1release_1pending_1monitor_1events(void* ctx_TODO, uint32_t this_arg) {
	LDKWatch* this_arg_conv = (LDKWatch*)this_arg;
	LDKCVec_MonitorEventZ ret_var = (this_arg_conv->release_pending_monitor_events)(this_arg_conv->this_arg);
	uint32_tArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr.len + 1);
	for (size_t o = 0; o < ret_var.datalen; o++) {
		LDKMonitorEvent arr_conv_14_var = ret_var.data[o];
		CHECK((((long)arr_conv_14_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_14_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_14_ref = (long)arr_conv_14_var.inner;
		if (arr_conv_14_var.is_owned) {
			arr_conv_14_ref |= 1;
		}
		ret_arr_ptr[o] = arr_conv_14_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

typedef struct LDKBroadcasterInterface_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer broadcast_transaction_meth;
} LDKBroadcasterInterface_JCalls;
static void LDKBroadcasterInterface_JCalls_free(void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
void broadcast_transaction_jcall(const void* this_arg, LDKTransaction tx) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	LDKTransaction tx_var = tx;
	int8_tArray tx_arr = { .len = MALLOC(tx_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(tx_arr.len + 1, tx_var.data, tx_var.datalen);
	Transaction_free(tx_var);
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call broadcast_transaction on j_calls with instance obj, tx_arr);
}
static void* LDKBroadcasterInterface_JCalls_clone(const void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKBroadcasterInterface LDKBroadcasterInterface_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKBroadcasterInterface_JCalls *calls = MALLOC(sizeof(LDKBroadcasterInterface_JCalls), "LDKBroadcasterInterface_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKBroadcasterInterface ret = {
		.this_arg = (void*) calls,
		.broadcast_transaction = broadcast_transaction_jcall,
		.free = LDKBroadcasterInterface_JCalls_free,
	};
	return ret;
}
long LDKBroadcasterInterface_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKBroadcasterInterface *res_ptr = MALLOC(sizeof(LDKBroadcasterInterface), "LDKBroadcasterInterface");
	*res_ptr = LDKBroadcasterInterface_init(NULL, o);
	return (long)res_ptr;
}
void BroadcasterInterface_1broadcast_1transaction(void* ctx_TODO, uint32_t this_arg, int8_tArray tx) {
	LDKBroadcasterInterface* this_arg_conv = (LDKBroadcasterInterface*)this_arg;
	LDKTransaction tx_ref;
	tx_ref.datalen = *tx.len;
	tx_ref.data = MALLOC(tx_ref.datalen, "LDKTransaction Bytes");
	memcpy(tx_ref.data, tx.len + 1, tx_ref.datalen);
	tx_ref.data_is_owned = true;
	(this_arg_conv->broadcast_transaction)(this_arg_conv->this_arg, tx_ref);
}

typedef struct LDKKeysInterface_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer get_node_secret_meth;
	// TODO: Some kind of method pointer get_destination_script_meth;
	// TODO: Some kind of method pointer get_shutdown_pubkey_meth;
	// TODO: Some kind of method pointer get_channel_keys_meth;
	// TODO: Some kind of method pointer get_secure_random_bytes_meth;
	// TODO: Some kind of method pointer read_chan_signer_meth;
} LDKKeysInterface_JCalls;
static void LDKKeysInterface_JCalls_free(void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
LDKSecretKey get_node_secret_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	int8_tArray arg; // TODO: Call get_node_secret on j_calls with instance obj, returning an object);
	LDKSecretKey arg_ref;
	CHECK(*arg.len == 32);
	memcpy(arg_ref.bytes, arg.len + 1, 32);
	return arg_ref;
}
LDKCVec_u8Z get_destination_script_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	int8_tArray arg; // TODO: Call get_destination_script on j_calls with instance obj, returning an object);
	LDKCVec_u8Z arg_ref;
	arg_ref.datalen = *arg.len;
	arg_ref.data = MALLOC(arg_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(arg_ref.data, arg.len + 1, arg_ref.datalen);
	return arg_ref;
}
LDKPublicKey get_shutdown_pubkey_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	int8_tArray arg; // TODO: Call get_shutdown_pubkey on j_calls with instance obj, returning an object);
	LDKPublicKey arg_ref;
	CHECK(*arg.len == 33);
	memcpy(arg_ref.compressed_form, arg.len + 1, 33);
	return arg_ref;
}
LDKChannelKeys get_channel_keys_jcall(const void* this_arg, bool inbound, uint64_t channel_value_satoshis) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKChannelKeys* ret; // TODO: Call get_channel_keys on j_calls with instance obj, returning a pointer, inbound, channel_value_satoshis);
	LDKChannelKeys ret_conv = *(LDKChannelKeys*)ret;
	ret_conv = ChannelKeys_clone(ret);
	return ret_conv;
}
LDKThirtyTwoBytes get_secure_random_bytes_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	int8_tArray arg; // TODO: Call get_secure_random_bytes on j_calls with instance obj, returning an object);
	LDKThirtyTwoBytes arg_ref;
	CHECK(*arg.len == 32);
	memcpy(arg_ref.data, arg.len + 1, 32);
	return arg_ref;
}
LDKCResult_ChanKeySignerDecodeErrorZ read_chan_signer_jcall(const void* this_arg, LDKu8slice reader) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	LDKu8slice reader_var = reader;
	int8_tArray reader_arr = { .len = MALLOC(reader_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(reader_arr.len + 1, reader_var.data, reader_var.datalen);
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_ChanKeySignerDecodeErrorZ* ret; // TODO: Call read_chan_signer on j_calls with instance obj, returning a pointer, reader_arr);
	LDKCResult_ChanKeySignerDecodeErrorZ ret_conv = *(LDKCResult_ChanKeySignerDecodeErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
static void* LDKKeysInterface_JCalls_clone(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKKeysInterface LDKKeysInterface_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKKeysInterface_JCalls *calls = MALLOC(sizeof(LDKKeysInterface_JCalls), "LDKKeysInterface_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKKeysInterface ret = {
		.this_arg = (void*) calls,
		.get_node_secret = get_node_secret_jcall,
		.get_destination_script = get_destination_script_jcall,
		.get_shutdown_pubkey = get_shutdown_pubkey_jcall,
		.get_channel_keys = get_channel_keys_jcall,
		.get_secure_random_bytes = get_secure_random_bytes_jcall,
		.read_chan_signer = read_chan_signer_jcall,
		.free = LDKKeysInterface_JCalls_free,
	};
	return ret;
}
long LDKKeysInterface_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKKeysInterface *res_ptr = MALLOC(sizeof(LDKKeysInterface), "LDKKeysInterface");
	*res_ptr = LDKKeysInterface_init(NULL, o);
	return (long)res_ptr;
}
int8_tArray KeysInterface_1get_1node_1secret(void* ctx_TODO, uint32_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	int8_tArray arg_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, (this_arg_conv->get_node_secret)(this_arg_conv->this_arg).bytes, 32);
	return arg_arr;
}

int8_tArray KeysInterface_1get_1destination_1script(void* ctx_TODO, uint32_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKCVec_u8Z arg_var = (this_arg_conv->get_destination_script)(this_arg_conv->this_arg);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

int8_tArray KeysInterface_1get_1shutdown_1pubkey(void* ctx_TODO, uint32_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, (this_arg_conv->get_shutdown_pubkey)(this_arg_conv->this_arg).compressed_form, 33);
	return arg_arr;
}

uint32_t KeysInterface_1get_1channel_1keys(void* ctx_TODO, uint32_t this_arg, jboolean inbound, int64_t channel_value_satoshis) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = (this_arg_conv->get_channel_keys)(this_arg_conv->this_arg, inbound, channel_value_satoshis);
	return (long)ret;
}

int8_tArray KeysInterface_1get_1secure_1random_1bytes(void* ctx_TODO, uint32_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	int8_tArray arg_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, (this_arg_conv->get_secure_random_bytes)(this_arg_conv->this_arg).data, 32);
	return arg_arr;
}

uint32_t KeysInterface_1read_1chan_1signer(void* ctx_TODO, uint32_t this_arg, int8_tArray reader) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKu8slice reader_ref;
	reader_ref.datalen = *reader.len;
	reader_ref.data = (int8_t*)(reader.len + 1);
	LDKCResult_ChanKeySignerDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChanKeySignerDecodeErrorZ), "LDKCResult_ChanKeySignerDecodeErrorZ");
	*ret_conv = (this_arg_conv->read_chan_signer)(this_arg_conv->this_arg, reader_ref);
	return (long)ret_conv;
}

typedef struct LDKFeeEstimator_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer get_est_sat_per_1000_weight_meth;
} LDKFeeEstimator_JCalls;
static void LDKFeeEstimator_JCalls_free(void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
uint32_t get_est_sat_per_1000_weight_jcall(const void* this_arg, LDKConfirmationTarget confirmation_target) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	uint32_t confirmation_target_conv = LDKConfirmationTarget_to_js(confirmation_target);
	//TODO: jobject obj = get object we can call against on j_calls->o
	return 0; //TODO: Call get_est_sat_per_1000_weight on j_calls with instance obj, returning number, confirmation_target_conv);
}
static void* LDKFeeEstimator_JCalls_clone(const void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKFeeEstimator LDKFeeEstimator_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKFeeEstimator_JCalls *calls = MALLOC(sizeof(LDKFeeEstimator_JCalls), "LDKFeeEstimator_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKFeeEstimator ret = {
		.this_arg = (void*) calls,
		.get_est_sat_per_1000_weight = get_est_sat_per_1000_weight_jcall,
		.free = LDKFeeEstimator_JCalls_free,
	};
	return ret;
}
long LDKFeeEstimator_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKFeeEstimator *res_ptr = MALLOC(sizeof(LDKFeeEstimator), "LDKFeeEstimator");
	*res_ptr = LDKFeeEstimator_init(NULL, o);
	return (long)res_ptr;
}
int32_t FeeEstimator_1get_1est_1sat_1per_11000_1weight(void* ctx_TODO, uint32_t this_arg, uint32_t confirmation_target) {
	LDKFeeEstimator* this_arg_conv = (LDKFeeEstimator*)this_arg;
	LDKConfirmationTarget confirmation_target_conv = LDKConfirmationTarget_from_js(confirmation_target);
	int32_t ret_val = (this_arg_conv->get_est_sat_per_1000_weight)(this_arg_conv->this_arg, confirmation_target_conv);
	return ret_val;
}

typedef struct LDKLogger_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer log_meth;
} LDKLogger_JCalls;
static void LDKLogger_JCalls_free(void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
void log_jcall(const void* this_arg, const char* record) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	jstring record_conv = conv_owned_string(record);
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call log on j_calls with instance obj, record_conv);
}
static void* LDKLogger_JCalls_clone(const void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKLogger LDKLogger_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKLogger_JCalls *calls = MALLOC(sizeof(LDKLogger_JCalls), "LDKLogger_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKLogger ret = {
		.this_arg = (void*) calls,
		.log = log_jcall,
		.free = LDKLogger_JCalls_free,
	};
	return ret;
}
long LDKLogger_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKLogger *res_ptr = MALLOC(sizeof(LDKLogger), "LDKLogger");
	*res_ptr = LDKLogger_init(NULL, o);
	return (long)res_ptr;
}
uint32_t LDKC2Tuple_1BlockHashChannelManagerZ_1new(void* ctx_TODO, int8_tArray a, uint32_t b) {
	LDKC2Tuple_BlockHashChannelManagerZ* ret = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelManagerZ), "LDKC2Tuple_BlockHashChannelManagerZ");
	LDKThirtyTwoBytes a_ref;
	CHECK(*a.len == 32);
	memcpy(a_ref.data, a.len + 1, 32);
	ret->a = a_ref;
	LDKChannelManager b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	// Warning: we may need a move here but can't clone!
	ret->b = b_conv;
	return (long)ret;
}
int8_tArray LDKC2Tuple_1BlockHashChannelManagerZ_1get_1a(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_BlockHashChannelManagerZ *tuple = (LDKC2Tuple_BlockHashChannelManagerZ*)ptr;
	int8_tArray a_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(a_arr.len + 1, tuple->a.data, 32);
	return a_arr;
}
uint32_t LDKC2Tuple_1BlockHashChannelManagerZ_1get_1b(void* ctx_TODO, uint32_t ptr) {
	LDKC2Tuple_BlockHashChannelManagerZ *tuple = (LDKC2Tuple_BlockHashChannelManagerZ*)ptr;
	LDKChannelManager b_var = tuple->b;
	CHECK((((long)b_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&b_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long b_ref = (long)b_var.inner & ~1;
	return b_ref;
}
jboolean LDKCResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
uint32_t LDKCResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1NetAddressu8Z_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_NetAddressu8Z*)arg)->result_ok;
}
uint32_t LDKCResult_1NetAddressu8Z_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NetAddressu8Z *val = (LDKCResult_NetAddressu8Z*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
int8_t LDKCResult_1NetAddressu8Z_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NetAddressu8Z *val = (LDKCResult_NetAddressu8Z*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
static inline LDKCResult_NetAddressu8Z CResult_NetAddressu8Z_clone(const LDKCResult_NetAddressu8Z *orig) {
	LDKCResult_NetAddressu8Z res = { .result_ok = orig->result_ok };
	if (orig->result_ok) {
		LDKNetAddress* contents = MALLOC(sizeof(LDKNetAddress), "LDKNetAddress result OK clone");
		*contents = NetAddress_clone(orig->contents.result);
		res.contents.result = contents;
	} else {
		int8_t* contents = MALLOC(sizeof(int8_t), "int8_t result Err clone");
		*contents = *orig->contents.err;
		res.contents.err = contents;
	}
	return res;
}
jboolean LDKCResult_1CResult_1NetAddressu8ZDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1CResult_1NetAddressu8ZDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ *val = (LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKCResult_NetAddressu8Z* res_conv = MALLOC(sizeof(LDKCResult_NetAddressu8Z), "LDKCResult_NetAddressu8Z");
	*res_conv = (*val->contents.result);
	*res_conv = CResult_NetAddressu8Z_clone(res_conv);
	return (long)res_conv;
}
uint32_t LDKCResult_1CResult_1NetAddressu8ZDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ *val = (LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
uint32_t LDKCVec_1u64Z_1new(void* ctx_TODO, int64_tArray elems) {
	LDKCVec_u64Z *ret = MALLOC(sizeof(LDKCVec_u64Z), "LDKCVec_u64Z");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(uint64_t) * ret->datalen, "LDKCVec_u64Z Data");
		int64_t *java_elems = (int64_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			ret->data[i] = java_elems[i];
		}
	}
	return (long)ret;
}
static inline LDKCVec_u64Z CVec_u64Z_clone(const LDKCVec_u64Z *orig) {
	LDKCVec_u64Z ret = { .data = MALLOC(sizeof(int64_t) * orig->datalen, "LDKCVec_u64Z clone bytes"), .datalen = orig->datalen };
	memcpy(ret.data, orig->data, sizeof(int64_t) * ret.datalen);
	return ret;
}
uint32_t LDKCVec_1UpdateAddHTLCZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_UpdateAddHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateAddHTLCZ), "LDKCVec_UpdateAddHTLCZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateAddHTLC) * ret->datalen, "LDKCVec_UpdateAddHTLCZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKUpdateAddHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = UpdateAddHTLC_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_UpdateAddHTLCZ CVec_UpdateAddHTLCZ_clone(const LDKCVec_UpdateAddHTLCZ *orig) {
	LDKCVec_UpdateAddHTLCZ ret = { .data = MALLOC(sizeof(LDKUpdateAddHTLC) * orig->datalen, "LDKCVec_UpdateAddHTLCZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = UpdateAddHTLC_clone(&orig->data[i]);
	}
	return ret;
}
uint32_t LDKCVec_1UpdateFulfillHTLCZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_UpdateFulfillHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateFulfillHTLCZ), "LDKCVec_UpdateFulfillHTLCZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFulfillHTLC) * ret->datalen, "LDKCVec_UpdateFulfillHTLCZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKUpdateFulfillHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = UpdateFulfillHTLC_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_UpdateFulfillHTLCZ CVec_UpdateFulfillHTLCZ_clone(const LDKCVec_UpdateFulfillHTLCZ *orig) {
	LDKCVec_UpdateFulfillHTLCZ ret = { .data = MALLOC(sizeof(LDKUpdateFulfillHTLC) * orig->datalen, "LDKCVec_UpdateFulfillHTLCZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = UpdateFulfillHTLC_clone(&orig->data[i]);
	}
	return ret;
}
uint32_t LDKCVec_1UpdateFailHTLCZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_UpdateFailHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateFailHTLCZ), "LDKCVec_UpdateFailHTLCZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFailHTLC) * ret->datalen, "LDKCVec_UpdateFailHTLCZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKUpdateFailHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = UpdateFailHTLC_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_UpdateFailHTLCZ CVec_UpdateFailHTLCZ_clone(const LDKCVec_UpdateFailHTLCZ *orig) {
	LDKCVec_UpdateFailHTLCZ ret = { .data = MALLOC(sizeof(LDKUpdateFailHTLC) * orig->datalen, "LDKCVec_UpdateFailHTLCZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = UpdateFailHTLC_clone(&orig->data[i]);
	}
	return ret;
}
uint32_t LDKCVec_1UpdateFailMalformedHTLCZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_UpdateFailMalformedHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateFailMalformedHTLCZ), "LDKCVec_UpdateFailMalformedHTLCZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFailMalformedHTLC) * ret->datalen, "LDKCVec_UpdateFailMalformedHTLCZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKUpdateFailMalformedHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = UpdateFailMalformedHTLC_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_UpdateFailMalformedHTLCZ CVec_UpdateFailMalformedHTLCZ_clone(const LDKCVec_UpdateFailMalformedHTLCZ *orig) {
	LDKCVec_UpdateFailMalformedHTLCZ ret = { .data = MALLOC(sizeof(LDKUpdateFailMalformedHTLC) * orig->datalen, "LDKCVec_UpdateFailMalformedHTLCZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = UpdateFailMalformedHTLC_clone(&orig->data[i]);
	}
	return ret;
}
jboolean LDKCResult_1boolLightningErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_boolLightningErrorZ*)arg)->result_ok;
}
jboolean LDKCResult_1boolLightningErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_boolLightningErrorZ *val = (LDKCResult_boolLightningErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t LDKCResult_1boolLightningErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_boolLightningErrorZ *val = (LDKCResult_boolLightningErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
uint32_t LDKC3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1new(void* ctx_TODO, uint32_t a, uint32_t b, uint32_t c) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* ret = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
	LDKChannelAnnouncement a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = ChannelAnnouncement_clone(&a_conv);
	ret->a = a_conv;
	LDKChannelUpdate b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	if (b_conv.inner != NULL)
		b_conv = ChannelUpdate_clone(&b_conv);
	ret->b = b_conv;
	LDKChannelUpdate c_conv;
	c_conv.inner = (void*)(c & (~1));
	c_conv.is_owned = (c & 1) || (c == 0);
	if (c_conv.inner != NULL)
		c_conv = ChannelUpdate_clone(&c_conv);
	ret->c = c_conv;
	return (long)ret;
}
static inline LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone(const LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *orig) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ ret = {
		.a = ChannelAnnouncement_clone(&orig->a),
		.b = ChannelUpdate_clone(&orig->b),
		.c = ChannelUpdate_clone(&orig->c),
	};
	return ret;
}
uint32_t LDKC3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1get_1a(void* ctx_TODO, uint32_t ptr) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *tuple = (LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)ptr;
	LDKChannelAnnouncement a_var = tuple->a;
	CHECK((((long)a_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&a_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long a_ref = (long)a_var.inner & ~1;
	return a_ref;
}
uint32_t LDKC3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1get_1b(void* ctx_TODO, uint32_t ptr) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *tuple = (LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)ptr;
	LDKChannelUpdate b_var = tuple->b;
	CHECK((((long)b_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&b_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long b_ref = (long)b_var.inner & ~1;
	return b_ref;
}
uint32_t LDKC3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1get_1c(void* ctx_TODO, uint32_t ptr) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *tuple = (LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)ptr;
	LDKChannelUpdate c_var = tuple->c;
	CHECK((((long)c_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&c_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long c_ref = (long)c_var.inner & ~1;
	return c_ref;
}
uint32_t LDKCVec_1C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ *ret = MALLOC(sizeof(LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ) * ret->datalen, "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_elem_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_clone(const LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ *orig) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret = { .data = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ) * orig->datalen, "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone(&orig->data[i]);
	}
	return ret;
}
uint32_t LDKCVec_1NodeAnnouncementZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_NodeAnnouncementZ *ret = MALLOC(sizeof(LDKCVec_NodeAnnouncementZ), "LDKCVec_NodeAnnouncementZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKNodeAnnouncement) * ret->datalen, "LDKCVec_NodeAnnouncementZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKNodeAnnouncement arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = NodeAnnouncement_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_NodeAnnouncementZ CVec_NodeAnnouncementZ_clone(const LDKCVec_NodeAnnouncementZ *orig) {
	LDKCVec_NodeAnnouncementZ ret = { .data = MALLOC(sizeof(LDKNodeAnnouncement) * orig->datalen, "LDKCVec_NodeAnnouncementZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = NodeAnnouncement_clone(&orig->data[i]);
	}
	return ret;
}
jboolean LDKCResult_1NoneLightningErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_NoneLightningErrorZ*)arg)->result_ok;
}
void LDKCResult_1NoneLightningErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NoneLightningErrorZ *val = (LDKCResult_NoneLightningErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t LDKCResult_1NoneLightningErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NoneLightningErrorZ *val = (LDKCResult_NoneLightningErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1ChannelReestablishDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_ChannelReestablishDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1ChannelReestablishDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ChannelReestablishDecodeErrorZ *val = (LDKCResult_ChannelReestablishDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKChannelReestablish res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1ChannelReestablishDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ChannelReestablishDecodeErrorZ *val = (LDKCResult_ChannelReestablishDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1InitDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_InitDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1InitDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_InitDecodeErrorZ *val = (LDKCResult_InitDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKInit res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1InitDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_InitDecodeErrorZ *val = (LDKCResult_InitDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1PingDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_PingDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1PingDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_PingDecodeErrorZ *val = (LDKCResult_PingDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKPing res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1PingDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_PingDecodeErrorZ *val = (LDKCResult_PingDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1PongDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_PongDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1PongDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_PongDecodeErrorZ *val = (LDKCResult_PongDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKPong res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1PongDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_PongDecodeErrorZ *val = (LDKCResult_PongDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1UnsignedChannelAnnouncementDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1UnsignedChannelAnnouncementDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKUnsignedChannelAnnouncement res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1UnsignedChannelAnnouncementDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1UnsignedChannelUpdateDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1UnsignedChannelUpdateDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ *val = (LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKUnsignedChannelUpdate res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1UnsignedChannelUpdateDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ *val = (LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1ErrorMessageDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_ErrorMessageDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1ErrorMessageDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ErrorMessageDecodeErrorZ *val = (LDKCResult_ErrorMessageDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKErrorMessage res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1ErrorMessageDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ErrorMessageDecodeErrorZ *val = (LDKCResult_ErrorMessageDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1UnsignedNodeAnnouncementDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1UnsignedNodeAnnouncementDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKUnsignedNodeAnnouncement res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1UnsignedNodeAnnouncementDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1QueryShortChannelIdsDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_QueryShortChannelIdsDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1QueryShortChannelIdsDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_QueryShortChannelIdsDecodeErrorZ *val = (LDKCResult_QueryShortChannelIdsDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKQueryShortChannelIds res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1QueryShortChannelIdsDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_QueryShortChannelIdsDecodeErrorZ *val = (LDKCResult_QueryShortChannelIdsDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1ReplyShortChannelIdsEndDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1ReplyShortChannelIdsEndDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ *val = (LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKReplyShortChannelIdsEnd res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1ReplyShortChannelIdsEndDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ *val = (LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1QueryChannelRangeDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_QueryChannelRangeDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1QueryChannelRangeDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_QueryChannelRangeDecodeErrorZ *val = (LDKCResult_QueryChannelRangeDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKQueryChannelRange res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1QueryChannelRangeDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_QueryChannelRangeDecodeErrorZ *val = (LDKCResult_QueryChannelRangeDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1ReplyChannelRangeDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_ReplyChannelRangeDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1ReplyChannelRangeDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ReplyChannelRangeDecodeErrorZ *val = (LDKCResult_ReplyChannelRangeDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKReplyChannelRange res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1ReplyChannelRangeDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_ReplyChannelRangeDecodeErrorZ *val = (LDKCResult_ReplyChannelRangeDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1GossipTimestampFilterDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_GossipTimestampFilterDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1GossipTimestampFilterDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_GossipTimestampFilterDecodeErrorZ *val = (LDKCResult_GossipTimestampFilterDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKGossipTimestampFilter res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1GossipTimestampFilterDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_GossipTimestampFilterDecodeErrorZ *val = (LDKCResult_GossipTimestampFilterDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg)->result_ok;
}
int8_tArray LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ *val = (LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg;
	CHECK(val->result_ok);
	LDKCVec_u8Z res_var = (*val->contents.result);
	int8_tArray res_arr = { .len = MALLOC(res_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(res_arr.len + 1, res_var.data, res_var.datalen);
	return res_arr;
}
uint32_t LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ *val = (LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1NonePeerHandleErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_NonePeerHandleErrorZ*)arg)->result_ok;
}
void LDKCResult_1NonePeerHandleErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NonePeerHandleErrorZ *val = (LDKCResult_NonePeerHandleErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t LDKCResult_1NonePeerHandleErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NonePeerHandleErrorZ *val = (LDKCResult_NonePeerHandleErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1boolPeerHandleErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_boolPeerHandleErrorZ*)arg)->result_ok;
}
jboolean LDKCResult_1boolPeerHandleErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_boolPeerHandleErrorZ *val = (LDKCResult_boolPeerHandleErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t LDKCResult_1boolPeerHandleErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_boolPeerHandleErrorZ *val = (LDKCResult_boolPeerHandleErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1SecretKeySecpErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_SecretKeySecpErrorZ*)arg)->result_ok;
}
int8_tArray LDKCResult_1SecretKeySecpErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_SecretKeySecpErrorZ *val = (LDKCResult_SecretKeySecpErrorZ*)arg;
	CHECK(val->result_ok);
	int8_tArray res_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(res_arr.len + 1, (*val->contents.result).bytes, 32);
	return res_arr;
}
uint32_t LDKCResult_1SecretKeySecpErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_SecretKeySecpErrorZ *val = (LDKCResult_SecretKeySecpErrorZ*)arg;
	CHECK(!val->result_ok);
	uint32_t err_conv = LDKSecp256k1Error_to_js((*val->contents.err));
	return err_conv;
}
jboolean LDKCResult_1PublicKeySecpErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_PublicKeySecpErrorZ*)arg)->result_ok;
}
int8_tArray LDKCResult_1PublicKeySecpErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_PublicKeySecpErrorZ *val = (LDKCResult_PublicKeySecpErrorZ*)arg;
	CHECK(val->result_ok);
	int8_tArray res_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(res_arr.len + 1, (*val->contents.result).compressed_form, 33);
	return res_arr;
}
uint32_t LDKCResult_1PublicKeySecpErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_PublicKeySecpErrorZ *val = (LDKCResult_PublicKeySecpErrorZ*)arg;
	CHECK(!val->result_ok);
	uint32_t err_conv = LDKSecp256k1Error_to_js((*val->contents.err));
	return err_conv;
}
jboolean LDKCResult_1TxCreationKeysSecpErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_TxCreationKeysSecpErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1TxCreationKeysSecpErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_TxCreationKeysSecpErrorZ *val = (LDKCResult_TxCreationKeysSecpErrorZ*)arg;
	CHECK(val->result_ok);
	LDKTxCreationKeys res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1TxCreationKeysSecpErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_TxCreationKeysSecpErrorZ *val = (LDKCResult_TxCreationKeysSecpErrorZ*)arg;
	CHECK(!val->result_ok);
	uint32_t err_conv = LDKSecp256k1Error_to_js((*val->contents.err));
	return err_conv;
}
jboolean LDKCResult_1TrustedCommitmentTransactionNoneZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_TrustedCommitmentTransactionNoneZ*)arg)->result_ok;
}
uint32_t LDKCResult_1TrustedCommitmentTransactionNoneZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_TrustedCommitmentTransactionNoneZ *val = (LDKCResult_TrustedCommitmentTransactionNoneZ*)arg;
	CHECK(val->result_ok);
	LDKTrustedCommitmentTransaction res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
void LDKCResult_1TrustedCommitmentTransactionNoneZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_TrustedCommitmentTransactionNoneZ *val = (LDKCResult_TrustedCommitmentTransactionNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
uint32_t LDKCVec_1RouteHopZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_RouteHopZ *ret = MALLOC(sizeof(LDKCVec_RouteHopZ), "LDKCVec_RouteHopZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKRouteHop) * ret->datalen, "LDKCVec_RouteHopZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKRouteHop arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = RouteHop_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_RouteHopZ CVec_RouteHopZ_clone(const LDKCVec_RouteHopZ *orig) {
	LDKCVec_RouteHopZ ret = { .data = MALLOC(sizeof(LDKRouteHop) * orig->datalen, "LDKCVec_RouteHopZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = RouteHop_clone(&orig->data[i]);
	}
	return ret;
}
static inline LDKCVec_CVec_RouteHopZZ CVec_CVec_RouteHopZZ_clone(const LDKCVec_CVec_RouteHopZZ *orig) {
	LDKCVec_CVec_RouteHopZZ ret = { .data = MALLOC(sizeof(LDKCVec_RouteHopZ) * orig->datalen, "LDKCVec_CVec_RouteHopZZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = CVec_RouteHopZ_clone(&orig->data[i]);
	}
	return ret;
}
jboolean LDKCResult_1RouteDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_RouteDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1RouteDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_RouteDecodeErrorZ *val = (LDKCResult_RouteDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKRoute res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1RouteDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_RouteDecodeErrorZ *val = (LDKCResult_RouteDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
uint32_t LDKCVec_1RouteHintZ_1new(void* ctx_TODO, uint32_tArray elems) {
	LDKCVec_RouteHintZ *ret = MALLOC(sizeof(LDKCVec_RouteHintZ), "LDKCVec_RouteHintZ");
	ret->datalen = *elems.len;
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKRouteHint) * ret->datalen, "LDKCVec_RouteHintZ Data");
		uint32_t *java_elems = (uint32_t*)(elems.len + 1);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKRouteHint arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = RouteHint_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_RouteHintZ CVec_RouteHintZ_clone(const LDKCVec_RouteHintZ *orig) {
	LDKCVec_RouteHintZ ret = { .data = MALLOC(sizeof(LDKRouteHint) * orig->datalen, "LDKCVec_RouteHintZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = RouteHint_clone(&orig->data[i]);
	}
	return ret;
}
jboolean LDKCResult_1RouteLightningErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_RouteLightningErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1RouteLightningErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_RouteLightningErrorZ *val = (LDKCResult_RouteLightningErrorZ*)arg;
	CHECK(val->result_ok);
	LDKRoute res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1RouteLightningErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_RouteLightningErrorZ *val = (LDKCResult_RouteLightningErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1RoutingFeesDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_RoutingFeesDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1RoutingFeesDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_RoutingFeesDecodeErrorZ *val = (LDKCResult_RoutingFeesDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKRoutingFees res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1RoutingFeesDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_RoutingFeesDecodeErrorZ *val = (LDKCResult_RoutingFeesDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1NodeAnnouncementInfoDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1NodeAnnouncementInfoDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ *val = (LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKNodeAnnouncementInfo res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1NodeAnnouncementInfoDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ *val = (LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1NodeInfoDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_NodeInfoDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1NodeInfoDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NodeInfoDecodeErrorZ *val = (LDKCResult_NodeInfoDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKNodeInfo res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1NodeInfoDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NodeInfoDecodeErrorZ *val = (LDKCResult_NodeInfoDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean LDKCResult_1NetworkGraphDecodeErrorZ_1result_1ok (void* ctx_TODO, uint32_t arg) {
	return ((LDKCResult_NetworkGraphDecodeErrorZ*)arg)->result_ok;
}
uint32_t LDKCResult_1NetworkGraphDecodeErrorZ_1get_1ok (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NetworkGraphDecodeErrorZ *val = (LDKCResult_NetworkGraphDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKNetworkGraph res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t LDKCResult_1NetworkGraphDecodeErrorZ_1get_1err (void* ctx_TODO, uint32_t arg) {
	LDKCResult_NetworkGraphDecodeErrorZ *val = (LDKCResult_NetworkGraphDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
typedef struct LDKMessageSendEventsProvider_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer get_and_clear_pending_msg_events_meth;
} LDKMessageSendEventsProvider_JCalls;
static void LDKMessageSendEventsProvider_JCalls_free(void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
LDKCVec_MessageSendEventZ get_and_clear_pending_msg_events_jcall(const void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	uint32_tArray arg; // TODO: Call get_and_clear_pending_msg_events on j_calls with instance obj, returning an object);
	LDKCVec_MessageSendEventZ arg_constr;
	arg_constr.datalen = *arg.len;
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKMessageSendEvent), "LDKCVec_MessageSendEventZ Elements");
	else
		arg_constr.data = NULL;
	uint32_t* arg_vals = (uint32_t*)(arg.len + 1);
	for (size_t s = 0; s < arg_constr.datalen; s++) {
		uint32_t arr_conv_18 = arg_vals[s];
		LDKMessageSendEvent arr_conv_18_conv = *(LDKMessageSendEvent*)arr_conv_18;
		FREE((void*)arr_conv_18);
		arg_constr.data[s] = arr_conv_18_conv;
	}
	return arg_constr;
}
static void* LDKMessageSendEventsProvider_JCalls_clone(const void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKMessageSendEventsProvider LDKMessageSendEventsProvider_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKMessageSendEventsProvider_JCalls *calls = MALLOC(sizeof(LDKMessageSendEventsProvider_JCalls), "LDKMessageSendEventsProvider_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKMessageSendEventsProvider ret = {
		.this_arg = (void*) calls,
		.get_and_clear_pending_msg_events = get_and_clear_pending_msg_events_jcall,
		.free = LDKMessageSendEventsProvider_JCalls_free,
	};
	return ret;
}
long LDKMessageSendEventsProvider_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKMessageSendEventsProvider *res_ptr = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*res_ptr = LDKMessageSendEventsProvider_init(NULL, o);
	return (long)res_ptr;
}
uint32_tArray MessageSendEventsProvider_1get_1and_1clear_1pending_1msg_1events(void* ctx_TODO, uint32_t this_arg) {
	LDKMessageSendEventsProvider* this_arg_conv = (LDKMessageSendEventsProvider*)this_arg;
	LDKCVec_MessageSendEventZ ret_var = (this_arg_conv->get_and_clear_pending_msg_events)(this_arg_conv->this_arg);
	uint32_tArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr.len + 1);
	for (size_t s = 0; s < ret_var.datalen; s++) {
		LDKMessageSendEvent *arr_conv_18_copy = MALLOC(sizeof(LDKMessageSendEvent), "LDKMessageSendEvent");
		*arr_conv_18_copy = MessageSendEvent_clone(&ret_var.data[s]);
		long arr_conv_18_ref = (long)arr_conv_18_copy;
		ret_arr_ptr[s] = arr_conv_18_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

typedef struct LDKEventsProvider_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer get_and_clear_pending_events_meth;
} LDKEventsProvider_JCalls;
static void LDKEventsProvider_JCalls_free(void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
LDKCVec_EventZ get_and_clear_pending_events_jcall(const void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	uint32_tArray arg; // TODO: Call get_and_clear_pending_events on j_calls with instance obj, returning an object);
	LDKCVec_EventZ arg_constr;
	arg_constr.datalen = *arg.len;
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKEvent), "LDKCVec_EventZ Elements");
	else
		arg_constr.data = NULL;
	uint32_t* arg_vals = (uint32_t*)(arg.len + 1);
	for (size_t h = 0; h < arg_constr.datalen; h++) {
		uint32_t arr_conv_7 = arg_vals[h];
		LDKEvent arr_conv_7_conv = *(LDKEvent*)arr_conv_7;
		FREE((void*)arr_conv_7);
		arg_constr.data[h] = arr_conv_7_conv;
	}
	return arg_constr;
}
static void* LDKEventsProvider_JCalls_clone(const void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKEventsProvider LDKEventsProvider_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKEventsProvider_JCalls *calls = MALLOC(sizeof(LDKEventsProvider_JCalls), "LDKEventsProvider_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKEventsProvider ret = {
		.this_arg = (void*) calls,
		.get_and_clear_pending_events = get_and_clear_pending_events_jcall,
		.free = LDKEventsProvider_JCalls_free,
	};
	return ret;
}
long LDKEventsProvider_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKEventsProvider *res_ptr = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*res_ptr = LDKEventsProvider_init(NULL, o);
	return (long)res_ptr;
}
uint32_tArray EventsProvider_1get_1and_1clear_1pending_1events(void* ctx_TODO, uint32_t this_arg) {
	LDKEventsProvider* this_arg_conv = (LDKEventsProvider*)this_arg;
	LDKCVec_EventZ ret_var = (this_arg_conv->get_and_clear_pending_events)(this_arg_conv->this_arg);
	uint32_tArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr.len + 1);
	for (size_t h = 0; h < ret_var.datalen; h++) {
		LDKEvent *arr_conv_7_copy = MALLOC(sizeof(LDKEvent), "LDKEvent");
		*arr_conv_7_copy = Event_clone(&ret_var.data[h]);
		long arr_conv_7_ref = (long)arr_conv_7_copy;
		ret_arr_ptr[h] = arr_conv_7_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

typedef struct LDKAccess_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer get_utxo_meth;
} LDKAccess_JCalls;
static void LDKAccess_JCalls_free(void* this_arg) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
LDKCResult_TxOutAccessErrorZ get_utxo_jcall(const void* this_arg, const uint8_t (* genesis_hash)[32], uint64_t short_channel_id) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	int8_tArray genesis_hash_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(genesis_hash_arr.len + 1, *genesis_hash, 32);
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_TxOutAccessErrorZ* ret; // TODO: Call get_utxo on j_calls with instance obj, returning a pointer, genesis_hash_arr, short_channel_id);
	LDKCResult_TxOutAccessErrorZ ret_conv = *(LDKCResult_TxOutAccessErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
static void* LDKAccess_JCalls_clone(const void* this_arg) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKAccess LDKAccess_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKAccess_JCalls *calls = MALLOC(sizeof(LDKAccess_JCalls), "LDKAccess_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKAccess ret = {
		.this_arg = (void*) calls,
		.get_utxo = get_utxo_jcall,
		.free = LDKAccess_JCalls_free,
	};
	return ret;
}
long LDKAccess_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKAccess *res_ptr = MALLOC(sizeof(LDKAccess), "LDKAccess");
	*res_ptr = LDKAccess_init(NULL, o);
	return (long)res_ptr;
}
uint32_t Access_1get_1utxo(void* ctx_TODO, uint32_t this_arg, int8_tArray genesis_hash, int64_t short_channel_id) {
	LDKAccess* this_arg_conv = (LDKAccess*)this_arg;
	unsigned char genesis_hash_arr[32];
	CHECK(*genesis_hash.len == 32);
	memcpy(genesis_hash_arr, genesis_hash.len + 1, 32);
	unsigned char (*genesis_hash_ref)[32] = &genesis_hash_arr;
	LDKCResult_TxOutAccessErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret_conv = (this_arg_conv->get_utxo)(this_arg_conv->this_arg, genesis_hash_ref, short_channel_id);
	return (long)ret_conv;
}

typedef struct LDKFilter_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer register_tx_meth;
	// TODO: Some kind of method pointer register_output_meth;
} LDKFilter_JCalls;
static void LDKFilter_JCalls_free(void* this_arg) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
void register_tx_jcall(const void* this_arg, const uint8_t (* txid)[32], LDKu8slice script_pubkey) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	int8_tArray txid_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(txid_arr.len + 1, *txid, 32);
	LDKu8slice script_pubkey_var = script_pubkey;
	int8_tArray script_pubkey_arr = { .len = MALLOC(script_pubkey_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(script_pubkey_arr.len + 1, script_pubkey_var.data, script_pubkey_var.datalen);
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call register_tx on j_calls with instance obj, txid_arr, script_pubkey_arr);
}
void register_output_jcall(const void* this_arg, const LDKOutPoint * outpoint, LDKu8slice script_pubkey) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	LDKOutPoint outpoint_var = *outpoint;
	if (outpoint->inner != NULL)
		outpoint_var = OutPoint_clone(outpoint);
	CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long outpoint_ref = (long)outpoint_var.inner;
	if (outpoint_var.is_owned) {
		outpoint_ref |= 1;
	}
	LDKu8slice script_pubkey_var = script_pubkey;
	int8_tArray script_pubkey_arr = { .len = MALLOC(script_pubkey_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(script_pubkey_arr.len + 1, script_pubkey_var.data, script_pubkey_var.datalen);
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call register_output on j_calls with instance obj, outpoint_ref, script_pubkey_arr);
}
static void* LDKFilter_JCalls_clone(const void* this_arg) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKFilter LDKFilter_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKFilter_JCalls *calls = MALLOC(sizeof(LDKFilter_JCalls), "LDKFilter_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKFilter ret = {
		.this_arg = (void*) calls,
		.register_tx = register_tx_jcall,
		.register_output = register_output_jcall,
		.free = LDKFilter_JCalls_free,
	};
	return ret;
}
long LDKFilter_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKFilter *res_ptr = MALLOC(sizeof(LDKFilter), "LDKFilter");
	*res_ptr = LDKFilter_init(NULL, o);
	return (long)res_ptr;
}
void Filter_1register_1tx(void* ctx_TODO, uint32_t this_arg, int8_tArray txid, int8_tArray script_pubkey) {
	LDKFilter* this_arg_conv = (LDKFilter*)this_arg;
	unsigned char txid_arr[32];
	CHECK(*txid.len == 32);
	memcpy(txid_arr, txid.len + 1, 32);
	unsigned char (*txid_ref)[32] = &txid_arr;
	LDKu8slice script_pubkey_ref;
	script_pubkey_ref.datalen = *script_pubkey.len;
	script_pubkey_ref.data = (int8_t*)(script_pubkey.len + 1);
	(this_arg_conv->register_tx)(this_arg_conv->this_arg, txid_ref, script_pubkey_ref);
}

void Filter_1register_1output(void* ctx_TODO, uint32_t this_arg, uint32_t outpoint, int8_tArray script_pubkey) {
	LDKFilter* this_arg_conv = (LDKFilter*)this_arg;
	LDKOutPoint outpoint_conv;
	outpoint_conv.inner = (void*)(outpoint & (~1));
	outpoint_conv.is_owned = false;
	LDKu8slice script_pubkey_ref;
	script_pubkey_ref.datalen = *script_pubkey.len;
	script_pubkey_ref.data = (int8_t*)(script_pubkey.len + 1);
	(this_arg_conv->register_output)(this_arg_conv->this_arg, &outpoint_conv, script_pubkey_ref);
}

typedef struct LDKPersist_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer persist_new_channel_meth;
	// TODO: Some kind of method pointer update_persisted_channel_meth;
} LDKPersist_JCalls;
static void LDKPersist_JCalls_free(void* this_arg) {
	LDKPersist_JCalls *j_calls = (LDKPersist_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
LDKCResult_NoneChannelMonitorUpdateErrZ persist_new_channel_jcall(const void* this_arg, LDKOutPoint id, const LDKChannelMonitor * data) {
	LDKPersist_JCalls *j_calls = (LDKPersist_JCalls*) this_arg;
	LDKOutPoint id_var = id;
	CHECK((((long)id_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&id_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long id_ref = (long)id_var.inner;
	if (id_var.is_owned) {
		id_ref |= 1;
	}
	LDKChannelMonitor data_var = *data;
	// Warning: we may need a move here but can't clone!
	CHECK((((long)data_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&data_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long data_ref = (long)data_var.inner;
	if (data_var.is_owned) {
		data_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret; // TODO: Call persist_new_channel on j_calls with instance obj, returning a pointer, id_ref, data_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_NoneChannelMonitorUpdateErrZ update_persisted_channel_jcall(const void* this_arg, LDKOutPoint id, const LDKChannelMonitorUpdate * update, const LDKChannelMonitor * data) {
	LDKPersist_JCalls *j_calls = (LDKPersist_JCalls*) this_arg;
	LDKOutPoint id_var = id;
	CHECK((((long)id_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&id_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long id_ref = (long)id_var.inner;
	if (id_var.is_owned) {
		id_ref |= 1;
	}
	LDKChannelMonitorUpdate update_var = *update;
	if (update->inner != NULL)
		update_var = ChannelMonitorUpdate_clone(update);
	CHECK((((long)update_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&update_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long update_ref = (long)update_var.inner;
	if (update_var.is_owned) {
		update_ref |= 1;
	}
	LDKChannelMonitor data_var = *data;
	// Warning: we may need a move here but can't clone!
	CHECK((((long)data_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&data_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long data_ref = (long)data_var.inner;
	if (data_var.is_owned) {
		data_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret; // TODO: Call update_persisted_channel on j_calls with instance obj, returning a pointer, id_ref, update_ref, data_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
static void* LDKPersist_JCalls_clone(const void* this_arg) {
	LDKPersist_JCalls *j_calls = (LDKPersist_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKPersist LDKPersist_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKPersist_JCalls *calls = MALLOC(sizeof(LDKPersist_JCalls), "LDKPersist_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKPersist ret = {
		.this_arg = (void*) calls,
		.persist_new_channel = persist_new_channel_jcall,
		.update_persisted_channel = update_persisted_channel_jcall,
		.free = LDKPersist_JCalls_free,
	};
	return ret;
}
long LDKPersist_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKPersist *res_ptr = MALLOC(sizeof(LDKPersist), "LDKPersist");
	*res_ptr = LDKPersist_init(NULL, o);
	return (long)res_ptr;
}
uint32_t Persist_1persist_1new_1channel(void* ctx_TODO, uint32_t this_arg, uint32_t id, uint32_t data) {
	LDKPersist* this_arg_conv = (LDKPersist*)this_arg;
	LDKOutPoint id_conv;
	id_conv.inner = (void*)(id & (~1));
	id_conv.is_owned = (id & 1) || (id == 0);
	if (id_conv.inner != NULL)
		id_conv = OutPoint_clone(&id_conv);
	LDKChannelMonitor data_conv;
	data_conv.inner = (void*)(data & (~1));
	data_conv.is_owned = false;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->persist_new_channel)(this_arg_conv->this_arg, id_conv, &data_conv);
	return (long)ret_conv;
}

uint32_t Persist_1update_1persisted_1channel(void* ctx_TODO, uint32_t this_arg, uint32_t id, uint32_t update, uint32_t data) {
	LDKPersist* this_arg_conv = (LDKPersist*)this_arg;
	LDKOutPoint id_conv;
	id_conv.inner = (void*)(id & (~1));
	id_conv.is_owned = (id & 1) || (id == 0);
	if (id_conv.inner != NULL)
		id_conv = OutPoint_clone(&id_conv);
	LDKChannelMonitorUpdate update_conv;
	update_conv.inner = (void*)(update & (~1));
	update_conv.is_owned = false;
	LDKChannelMonitor data_conv;
	data_conv.inner = (void*)(data & (~1));
	data_conv.is_owned = false;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->update_persisted_channel)(this_arg_conv->this_arg, id_conv, &update_conv, &data_conv);
	return (long)ret_conv;
}

typedef struct LDKChannelMessageHandler_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	LDKMessageSendEventsProvider_JCalls* MessageSendEventsProvider;
	// TODO: Some kind of method pointer handle_open_channel_meth;
	// TODO: Some kind of method pointer handle_accept_channel_meth;
	// TODO: Some kind of method pointer handle_funding_created_meth;
	// TODO: Some kind of method pointer handle_funding_signed_meth;
	// TODO: Some kind of method pointer handle_funding_locked_meth;
	// TODO: Some kind of method pointer handle_shutdown_meth;
	// TODO: Some kind of method pointer handle_closing_signed_meth;
	// TODO: Some kind of method pointer handle_update_add_htlc_meth;
	// TODO: Some kind of method pointer handle_update_fulfill_htlc_meth;
	// TODO: Some kind of method pointer handle_update_fail_htlc_meth;
	// TODO: Some kind of method pointer handle_update_fail_malformed_htlc_meth;
	// TODO: Some kind of method pointer handle_commitment_signed_meth;
	// TODO: Some kind of method pointer handle_revoke_and_ack_meth;
	// TODO: Some kind of method pointer handle_update_fee_meth;
	// TODO: Some kind of method pointer handle_announcement_signatures_meth;
	// TODO: Some kind of method pointer peer_disconnected_meth;
	// TODO: Some kind of method pointer peer_connected_meth;
	// TODO: Some kind of method pointer handle_channel_reestablish_meth;
	// TODO: Some kind of method pointer handle_error_meth;
} LDKChannelMessageHandler_JCalls;
static void LDKChannelMessageHandler_JCalls_free(void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
void handle_open_channel_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKOpenChannel * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKInitFeatures their_features_var = their_features;
	CHECK((((long)their_features_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&their_features_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long their_features_ref = (long)their_features_var.inner;
	if (their_features_var.is_owned) {
		their_features_ref |= 1;
	}
	LDKOpenChannel msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = OpenChannel_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_open_channel on j_calls with instance obj, their_node_id_arr, their_features_ref, msg_ref);
}
void handle_accept_channel_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKAcceptChannel * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKInitFeatures their_features_var = their_features;
	CHECK((((long)their_features_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&their_features_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long their_features_ref = (long)their_features_var.inner;
	if (their_features_var.is_owned) {
		their_features_ref |= 1;
	}
	LDKAcceptChannel msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = AcceptChannel_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_accept_channel on j_calls with instance obj, their_node_id_arr, their_features_ref, msg_ref);
}
void handle_funding_created_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingCreated * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKFundingCreated msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = FundingCreated_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_funding_created on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_funding_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingSigned * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKFundingSigned msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = FundingSigned_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_funding_signed on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_funding_locked_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingLocked * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKFundingLocked msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = FundingLocked_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_funding_locked on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_shutdown_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKShutdown * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKShutdown msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = Shutdown_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_shutdown on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_closing_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKClosingSigned * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKClosingSigned msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = ClosingSigned_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_closing_signed on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_update_add_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateAddHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKUpdateAddHTLC msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UpdateAddHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_update_add_htlc on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_update_fulfill_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFulfillHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKUpdateFulfillHTLC msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UpdateFulfillHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_update_fulfill_htlc on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_update_fail_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKUpdateFailHTLC msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UpdateFailHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_update_fail_htlc on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_update_fail_malformed_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailMalformedHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKUpdateFailMalformedHTLC msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UpdateFailMalformedHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_update_fail_malformed_htlc on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_commitment_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKCommitmentSigned * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKCommitmentSigned msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = CommitmentSigned_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_commitment_signed on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_revoke_and_ack_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKRevokeAndACK * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKRevokeAndACK msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = RevokeAndACK_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_revoke_and_ack on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_update_fee_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFee * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKUpdateFee msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UpdateFee_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_update_fee on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_announcement_signatures_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKAnnouncementSignatures * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKAnnouncementSignatures msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = AnnouncementSignatures_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_announcement_signatures on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void peer_disconnected_jcall(const void* this_arg, LDKPublicKey their_node_id, bool no_connection_possible) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call peer_disconnected on j_calls with instance obj, their_node_id_arr, no_connection_possible);
}
void peer_connected_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKInit * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKInit msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = Init_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call peer_connected on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_channel_reestablish_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKChannelReestablish * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKChannelReestablish msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = ChannelReestablish_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_channel_reestablish on j_calls with instance obj, their_node_id_arr, msg_ref);
}
void handle_error_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKErrorMessage * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKErrorMessage msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = ErrorMessage_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_error on j_calls with instance obj, their_node_id_arr, msg_ref);
}
static void* LDKChannelMessageHandler_JCalls_clone(const void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	atomic_fetch_add_explicit(&j_calls->MessageSendEventsProvider->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKChannelMessageHandler LDKChannelMessageHandler_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o, /*TODO: JS Object Reference */void* MessageSendEventsProvider) {
	LDKChannelMessageHandler_JCalls *calls = MALLOC(sizeof(LDKChannelMessageHandler_JCalls), "LDKChannelMessageHandler_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKChannelMessageHandler ret = {
		.this_arg = (void*) calls,
		.handle_open_channel = handle_open_channel_jcall,
		.handle_accept_channel = handle_accept_channel_jcall,
		.handle_funding_created = handle_funding_created_jcall,
		.handle_funding_signed = handle_funding_signed_jcall,
		.handle_funding_locked = handle_funding_locked_jcall,
		.handle_shutdown = handle_shutdown_jcall,
		.handle_closing_signed = handle_closing_signed_jcall,
		.handle_update_add_htlc = handle_update_add_htlc_jcall,
		.handle_update_fulfill_htlc = handle_update_fulfill_htlc_jcall,
		.handle_update_fail_htlc = handle_update_fail_htlc_jcall,
		.handle_update_fail_malformed_htlc = handle_update_fail_malformed_htlc_jcall,
		.handle_commitment_signed = handle_commitment_signed_jcall,
		.handle_revoke_and_ack = handle_revoke_and_ack_jcall,
		.handle_update_fee = handle_update_fee_jcall,
		.handle_announcement_signatures = handle_announcement_signatures_jcall,
		.peer_disconnected = peer_disconnected_jcall,
		.peer_connected = peer_connected_jcall,
		.handle_channel_reestablish = handle_channel_reestablish_jcall,
		.handle_error = handle_error_jcall,
		.free = LDKChannelMessageHandler_JCalls_free,
		.MessageSendEventsProvider = LDKMessageSendEventsProvider_init(NULL, MessageSendEventsProvider),
	};
	calls->MessageSendEventsProvider = ret.MessageSendEventsProvider.this_arg;
	return ret;
}
long LDKChannelMessageHandler_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o, /*TODO: JS Object Reference */ void* MessageSendEventsProvider) {
	LDKChannelMessageHandler *res_ptr = MALLOC(sizeof(LDKChannelMessageHandler), "LDKChannelMessageHandler");
	*res_ptr = LDKChannelMessageHandler_init(NULL, o, MessageSendEventsProvider);
	return (long)res_ptr;
}
void ChannelMessageHandler_1handle_1open_1channel(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t their_features, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKInitFeatures their_features_conv;
	their_features_conv.inner = (void*)(their_features & (~1));
	their_features_conv.is_owned = (their_features & 1) || (their_features == 0);
	// Warning: we may need a move here but can't clone!
	LDKOpenChannel msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_open_channel)(this_arg_conv->this_arg, their_node_id_ref, their_features_conv, &msg_conv);
}

void ChannelMessageHandler_1handle_1accept_1channel(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t their_features, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKInitFeatures their_features_conv;
	their_features_conv.inner = (void*)(their_features & (~1));
	their_features_conv.is_owned = (their_features & 1) || (their_features == 0);
	// Warning: we may need a move here but can't clone!
	LDKAcceptChannel msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_accept_channel)(this_arg_conv->this_arg, their_node_id_ref, their_features_conv, &msg_conv);
}

void ChannelMessageHandler_1handle_1funding_1created(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKFundingCreated msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_funding_created)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1funding_1signed(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKFundingSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_funding_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1funding_1locked(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKFundingLocked msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_funding_locked)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1shutdown(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKShutdown msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_shutdown)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1closing_1signed(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKClosingSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_closing_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1update_1add_1htlc(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKUpdateAddHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_add_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1update_1fulfill_1htlc(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKUpdateFulfillHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fulfill_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1update_1fail_1htlc(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKUpdateFailHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fail_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1update_1fail_1malformed_1htlc(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKUpdateFailMalformedHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fail_malformed_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1commitment_1signed(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKCommitmentSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_commitment_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1revoke_1and_1ack(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKRevokeAndACK msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_revoke_and_ack)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1update_1fee(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKUpdateFee msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fee)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1announcement_1signatures(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKAnnouncementSignatures msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_announcement_signatures)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1peer_1disconnected(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, jboolean no_connection_possible) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	(this_arg_conv->peer_disconnected)(this_arg_conv->this_arg, their_node_id_ref, no_connection_possible);
}

void ChannelMessageHandler_1peer_1connected(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKInit msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->peer_connected)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1channel_1reestablish(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKChannelReestablish msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_channel_reestablish)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void ChannelMessageHandler_1handle_1error(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKErrorMessage msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_error)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

typedef struct LDKRoutingMessageHandler_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	LDKMessageSendEventsProvider_JCalls* MessageSendEventsProvider;
	// TODO: Some kind of method pointer handle_node_announcement_meth;
	// TODO: Some kind of method pointer handle_channel_announcement_meth;
	// TODO: Some kind of method pointer handle_channel_update_meth;
	// TODO: Some kind of method pointer handle_htlc_fail_channel_update_meth;
	// TODO: Some kind of method pointer get_next_channel_announcements_meth;
	// TODO: Some kind of method pointer get_next_node_announcements_meth;
	// TODO: Some kind of method pointer sync_routing_table_meth;
	// TODO: Some kind of method pointer handle_reply_channel_range_meth;
	// TODO: Some kind of method pointer handle_reply_short_channel_ids_end_meth;
	// TODO: Some kind of method pointer handle_query_channel_range_meth;
	// TODO: Some kind of method pointer handle_query_short_channel_ids_meth;
} LDKRoutingMessageHandler_JCalls;
static void LDKRoutingMessageHandler_JCalls_free(void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
LDKCResult_boolLightningErrorZ handle_node_announcement_jcall(const void* this_arg, const LDKNodeAnnouncement * msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	LDKNodeAnnouncement msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = NodeAnnouncement_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_boolLightningErrorZ* ret; // TODO: Call handle_node_announcement on j_calls with instance obj, returning a pointer, msg_ref);
	LDKCResult_boolLightningErrorZ ret_conv = *(LDKCResult_boolLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_boolLightningErrorZ handle_channel_announcement_jcall(const void* this_arg, const LDKChannelAnnouncement * msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	LDKChannelAnnouncement msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = ChannelAnnouncement_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_boolLightningErrorZ* ret; // TODO: Call handle_channel_announcement on j_calls with instance obj, returning a pointer, msg_ref);
	LDKCResult_boolLightningErrorZ ret_conv = *(LDKCResult_boolLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_boolLightningErrorZ handle_channel_update_jcall(const void* this_arg, const LDKChannelUpdate * msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	LDKChannelUpdate msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = ChannelUpdate_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_boolLightningErrorZ* ret; // TODO: Call handle_channel_update on j_calls with instance obj, returning a pointer, msg_ref);
	LDKCResult_boolLightningErrorZ ret_conv = *(LDKCResult_boolLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
void handle_htlc_fail_channel_update_jcall(const void* this_arg, const LDKHTLCFailChannelUpdate * update) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	long ret_update = (long)update;
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call handle_htlc_fail_channel_update on j_calls with instance obj, ret_update);
}
LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ get_next_channel_announcements_jcall(const void* this_arg, uint64_t starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	uint32_tArray arg; // TODO: Call get_next_channel_announcements on j_calls with instance obj, returning an object, starting_point, batch_amount);
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ arg_constr;
	arg_constr.datalen = *arg.len;
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Elements");
	else
		arg_constr.data = NULL;
	uint32_t* arg_vals = (uint32_t*)(arg.len + 1);
	for (size_t l = 0; l < arg_constr.datalen; l++) {
		uint32_t arr_conv_63 = arg_vals[l];
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_conv_63_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arr_conv_63;
		FREE((void*)arr_conv_63);
		arg_constr.data[l] = arr_conv_63_conv;
	}
	return arg_constr;
}
LDKCVec_NodeAnnouncementZ get_next_node_announcements_jcall(const void* this_arg, LDKPublicKey starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray starting_point_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(starting_point_arr.len + 1, starting_point.compressed_form, 33);
	//TODO: jobject obj = get object we can call against on j_calls->o
	uint32_tArray arg; // TODO: Call get_next_node_announcements on j_calls with instance obj, returning an object, starting_point_arr, batch_amount);
	LDKCVec_NodeAnnouncementZ arg_constr;
	arg_constr.datalen = *arg.len;
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKNodeAnnouncement), "LDKCVec_NodeAnnouncementZ Elements");
	else
		arg_constr.data = NULL;
	uint32_t* arg_vals = (uint32_t*)(arg.len + 1);
	for (size_t s = 0; s < arg_constr.datalen; s++) {
		uint32_t arr_conv_18 = arg_vals[s];
		LDKNodeAnnouncement arr_conv_18_conv;
		arr_conv_18_conv.inner = (void*)(arr_conv_18 & (~1));
		arr_conv_18_conv.is_owned = (arr_conv_18 & 1) || (arr_conv_18 == 0);
		if (arr_conv_18_conv.inner != NULL)
			arr_conv_18_conv = NodeAnnouncement_clone(&arr_conv_18_conv);
		arg_constr.data[s] = arr_conv_18_conv;
	}
	return arg_constr;
}
void sync_routing_table_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKInit * init) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKInit init_var = *init;
	if (init->inner != NULL)
		init_var = Init_clone(init);
	CHECK((((long)init_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&init_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long init_ref = (long)init_var.inner;
	if (init_var.is_owned) {
		init_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call sync_routing_table on j_calls with instance obj, their_node_id_arr, init_ref);
}
LDKCResult_NoneLightningErrorZ handle_reply_channel_range_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKReplyChannelRange msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKReplyChannelRange msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_NoneLightningErrorZ* ret; // TODO: Call handle_reply_channel_range on j_calls with instance obj, returning a pointer, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_NoneLightningErrorZ handle_reply_short_channel_ids_end_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKReplyShortChannelIdsEnd msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKReplyShortChannelIdsEnd msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_NoneLightningErrorZ* ret; // TODO: Call handle_reply_short_channel_ids_end on j_calls with instance obj, returning a pointer, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_NoneLightningErrorZ handle_query_channel_range_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKQueryChannelRange msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKQueryChannelRange msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_NoneLightningErrorZ* ret; // TODO: Call handle_query_channel_range on j_calls with instance obj, returning a pointer, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_NoneLightningErrorZ handle_query_short_channel_ids_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKQueryShortChannelIds msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(their_node_id_arr.len + 1, their_node_id.compressed_form, 33);
	LDKQueryShortChannelIds msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	//TODO: jobject obj = get object we can call against on j_calls->o
	LDKCResult_NoneLightningErrorZ* ret; // TODO: Call handle_query_short_channel_ids on j_calls with instance obj, returning a pointer, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
static void* LDKRoutingMessageHandler_JCalls_clone(const void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	atomic_fetch_add_explicit(&j_calls->MessageSendEventsProvider->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKRoutingMessageHandler LDKRoutingMessageHandler_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o, /*TODO: JS Object Reference */void* MessageSendEventsProvider) {
	LDKRoutingMessageHandler_JCalls *calls = MALLOC(sizeof(LDKRoutingMessageHandler_JCalls), "LDKRoutingMessageHandler_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKRoutingMessageHandler ret = {
		.this_arg = (void*) calls,
		.handle_node_announcement = handle_node_announcement_jcall,
		.handle_channel_announcement = handle_channel_announcement_jcall,
		.handle_channel_update = handle_channel_update_jcall,
		.handle_htlc_fail_channel_update = handle_htlc_fail_channel_update_jcall,
		.get_next_channel_announcements = get_next_channel_announcements_jcall,
		.get_next_node_announcements = get_next_node_announcements_jcall,
		.sync_routing_table = sync_routing_table_jcall,
		.handle_reply_channel_range = handle_reply_channel_range_jcall,
		.handle_reply_short_channel_ids_end = handle_reply_short_channel_ids_end_jcall,
		.handle_query_channel_range = handle_query_channel_range_jcall,
		.handle_query_short_channel_ids = handle_query_short_channel_ids_jcall,
		.free = LDKRoutingMessageHandler_JCalls_free,
		.MessageSendEventsProvider = LDKMessageSendEventsProvider_init(NULL, MessageSendEventsProvider),
	};
	calls->MessageSendEventsProvider = ret.MessageSendEventsProvider.this_arg;
	return ret;
}
long LDKRoutingMessageHandler_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o, /*TODO: JS Object Reference */ void* MessageSendEventsProvider) {
	LDKRoutingMessageHandler *res_ptr = MALLOC(sizeof(LDKRoutingMessageHandler), "LDKRoutingMessageHandler");
	*res_ptr = LDKRoutingMessageHandler_init(NULL, o, MessageSendEventsProvider);
	return (long)res_ptr;
}
uint32_t RoutingMessageHandler_1handle_1node_1announcement(void* ctx_TODO, uint32_t this_arg, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKNodeAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_node_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

uint32_t RoutingMessageHandler_1handle_1channel_1announcement(void* ctx_TODO, uint32_t this_arg, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_channel_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

uint32_t RoutingMessageHandler_1handle_1channel_1update(void* ctx_TODO, uint32_t this_arg, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKChannelUpdate msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_channel_update)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

void RoutingMessageHandler_1handle_1htlc_1fail_1channel_1update(void* ctx_TODO, uint32_t this_arg, uint32_t update) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKHTLCFailChannelUpdate* update_conv = (LDKHTLCFailChannelUpdate*)update;
	(this_arg_conv->handle_htlc_fail_channel_update)(this_arg_conv->this_arg, update_conv);
}

uint32_tArray RoutingMessageHandler_1get_1next_1channel_1announcements(void* ctx_TODO, uint32_t this_arg, int64_t starting_point, int8_t batch_amount) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_var = (this_arg_conv->get_next_channel_announcements)(this_arg_conv->this_arg, starting_point, batch_amount);
	uint32_tArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr.len + 1);
	for (size_t l = 0; l < ret_var.datalen; l++) {
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* arr_conv_63_ref = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
		*arr_conv_63_ref = ret_var.data[l];
		arr_conv_63_ref->a = ChannelAnnouncement_clone(&arr_conv_63_ref->a);
		arr_conv_63_ref->b = ChannelUpdate_clone(&arr_conv_63_ref->b);
		arr_conv_63_ref->c = ChannelUpdate_clone(&arr_conv_63_ref->c);
		ret_arr_ptr[l] = (long)arr_conv_63_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

uint32_tArray RoutingMessageHandler_1get_1next_1node_1announcements(void* ctx_TODO, uint32_t this_arg, int8_tArray starting_point, int8_t batch_amount) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey starting_point_ref;
	CHECK(*starting_point.len == 33);
	memcpy(starting_point_ref.compressed_form, starting_point.len + 1, 33);
	LDKCVec_NodeAnnouncementZ ret_var = (this_arg_conv->get_next_node_announcements)(this_arg_conv->this_arg, starting_point_ref, batch_amount);
	uint32_tArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr.len + 1);
	for (size_t s = 0; s < ret_var.datalen; s++) {
		LDKNodeAnnouncement arr_conv_18_var = ret_var.data[s];
		CHECK((((long)arr_conv_18_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_18_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_18_ref = (long)arr_conv_18_var.inner;
		if (arr_conv_18_var.is_owned) {
			arr_conv_18_ref |= 1;
		}
		ret_arr_ptr[s] = arr_conv_18_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

void RoutingMessageHandler_1sync_1routing_1table(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t init) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKInit init_conv;
	init_conv.inner = (void*)(init & (~1));
	init_conv.is_owned = false;
	(this_arg_conv->sync_routing_table)(this_arg_conv->this_arg, their_node_id_ref, &init_conv);
}

uint32_t RoutingMessageHandler_1handle_1reply_1channel_1range(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKReplyChannelRange msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	if (msg_conv.inner != NULL)
		msg_conv = ReplyChannelRange_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_reply_channel_range)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

uint32_t RoutingMessageHandler_1handle_1reply_1short_1channel_1ids_1end(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKReplyShortChannelIdsEnd msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	if (msg_conv.inner != NULL)
		msg_conv = ReplyShortChannelIdsEnd_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_reply_short_channel_ids_end)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

uint32_t RoutingMessageHandler_1handle_1query_1channel_1range(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKQueryChannelRange msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	if (msg_conv.inner != NULL)
		msg_conv = QueryChannelRange_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_query_channel_range)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

uint32_t RoutingMessageHandler_1handle_1query_1short_1channel_1ids(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKQueryShortChannelIds msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	if (msg_conv.inner != NULL)
		msg_conv = QueryShortChannelIds_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_query_short_channel_ids)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

typedef struct LDKSocketDescriptor_JCalls {
	atomic_size_t refcnt;
	// TODO: Object pointer o;
	// TODO: Some kind of method pointer send_data_meth;
	// TODO: Some kind of method pointer disconnect_socket_meth;
	// TODO: Some kind of method pointer eq_meth;
	// TODO: Some kind of method pointer hash_meth;
} LDKSocketDescriptor_JCalls;
static void LDKSocketDescriptor_JCalls_free(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		// TODO: do any release required for j_calls->o (refcnt-- in java, but may be redundant)
		FREE(j_calls);
	}
}
uintptr_t send_data_jcall(void* this_arg, LDKu8slice data, bool resume_read) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	LDKu8slice data_var = data;
	int8_tArray data_arr = { .len = MALLOC(data_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(data_arr.len + 1, data_var.data, data_var.datalen);
	//TODO: jobject obj = get object we can call against on j_calls->o
	return 0; //TODO: Call send_data on j_calls with instance obj, returning number, data_arr, resume_read);
}
void disconnect_socket_jcall(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	return; //TODO: Call disconnect_socket on j_calls with instance obj);
}
bool eq_jcall(const void* this_arg, const LDKSocketDescriptor * other_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	LDKSocketDescriptor *other_arg_clone = MALLOC(sizeof(LDKSocketDescriptor), "LDKSocketDescriptor");
	*other_arg_clone = SocketDescriptor_clone(other_arg);
	//TODO: jobject obj = get object we can call against on j_calls->o
	return 0; //TODO: Call eq on j_calls with instance obj, returning boolean, (long)other_arg_clone);
}
uint64_t hash_jcall(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	//TODO: jobject obj = get object we can call against on j_calls->o
	return 0; //TODO: Call hash on j_calls with instance obj, returning number);
}
static void* LDKSocketDescriptor_JCalls_clone(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKSocketDescriptor LDKSocketDescriptor_init (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKSocketDescriptor_JCalls *calls = MALLOC(sizeof(LDKSocketDescriptor_JCalls), "LDKSocketDescriptor_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKSocketDescriptor ret = {
		.this_arg = (void*) calls,
		.send_data = send_data_jcall,
		.disconnect_socket = disconnect_socket_jcall,
		.eq = eq_jcall,
		.hash = hash_jcall,
		.clone = LDKSocketDescriptor_JCalls_clone,
		.free = LDKSocketDescriptor_JCalls_free,
	};
	return ret;
}
long LDKSocketDescriptor_1new (void* ctx_TODO, /*TODO: JS Object Reference */void* o) {
	LDKSocketDescriptor *res_ptr = MALLOC(sizeof(LDKSocketDescriptor), "LDKSocketDescriptor");
	*res_ptr = LDKSocketDescriptor_init(NULL, o);
	return (long)res_ptr;
}
intptr_t SocketDescriptor_1send_1data(void* ctx_TODO, uint32_t this_arg, int8_tArray data, jboolean resume_read) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	LDKu8slice data_ref;
	data_ref.datalen = *data.len;
	data_ref.data = (int8_t*)(data.len + 1);
	intptr_t ret_val = (this_arg_conv->send_data)(this_arg_conv->this_arg, data_ref, resume_read);
	return ret_val;
}

void SocketDescriptor_1disconnect_1socket(void* ctx_TODO, uint32_t this_arg) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	(this_arg_conv->disconnect_socket)(this_arg_conv->this_arg);
}

int64_t SocketDescriptor_1hash(void* ctx_TODO, uint32_t this_arg) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	int64_t ret_val = (this_arg_conv->hash)(this_arg_conv->this_arg);
	return ret_val;
}

void Transaction_1free(void* ctx_TODO, int8_tArray _res) {
	LDKTransaction _res_ref;
	_res_ref.datalen = *_res.len;
	_res_ref.data = MALLOC(_res_ref.datalen, "LDKTransaction Bytes");
	memcpy(_res_ref.data, _res.len + 1, _res_ref.datalen);
	_res_ref.data_is_owned = true;
	Transaction_free(_res_ref);
}

void TxOut_1free(void* ctx_TODO, uint32_t _res) {
	LDKTxOut _res_conv = *(LDKTxOut*)_res;
	FREE((void*)_res);
	TxOut_free(_res_conv);
}

void CVec_1SpendableOutputDescriptorZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_SpendableOutputDescriptorZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKSpendableOutputDescriptor), "LDKCVec_SpendableOutputDescriptorZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t b = 0; b < _res_constr.datalen; b++) {
		uint32_t arr_conv_27 = _res_vals[b];
		LDKSpendableOutputDescriptor arr_conv_27_conv = *(LDKSpendableOutputDescriptor*)arr_conv_27;
		FREE((void*)arr_conv_27);
		_res_constr.data[b] = arr_conv_27_conv;
	}
	CVec_SpendableOutputDescriptorZ_free(_res_constr);
}

void CVec_1MessageSendEventZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_MessageSendEventZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKMessageSendEvent), "LDKCVec_MessageSendEventZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t s = 0; s < _res_constr.datalen; s++) {
		uint32_t arr_conv_18 = _res_vals[s];
		LDKMessageSendEvent arr_conv_18_conv = *(LDKMessageSendEvent*)arr_conv_18;
		FREE((void*)arr_conv_18);
		_res_constr.data[s] = arr_conv_18_conv;
	}
	CVec_MessageSendEventZ_free(_res_constr);
}

void CVec_1EventZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_EventZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKEvent), "LDKCVec_EventZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t h = 0; h < _res_constr.datalen; h++) {
		uint32_t arr_conv_7 = _res_vals[h];
		LDKEvent arr_conv_7_conv = *(LDKEvent*)arr_conv_7;
		FREE((void*)arr_conv_7);
		_res_constr.data[h] = arr_conv_7_conv;
	}
	CVec_EventZ_free(_res_constr);
}

void C2Tuple_1usizeTransactionZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKC2Tuple_usizeTransactionZ _res_conv = *(LDKC2Tuple_usizeTransactionZ*)_res;
	FREE((void*)_res);
	C2Tuple_usizeTransactionZ_free(_res_conv);
}

uint32_t C2Tuple_1usizeTransactionZ_1new(void* ctx_TODO, intptr_t a, int8_tArray b) {
	LDKTransaction b_ref;
	b_ref.datalen = *b.len;
	b_ref.data = MALLOC(b_ref.datalen, "LDKTransaction Bytes");
	memcpy(b_ref.data, b.len + 1, b_ref.datalen);
	b_ref.data_is_owned = true;
	LDKC2Tuple_usizeTransactionZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_usizeTransactionZ), "LDKC2Tuple_usizeTransactionZ");
	*ret_ref = C2Tuple_usizeTransactionZ_new(a, b_ref);
	// XXX: We likely need to clone here, but no _clone fn is available for Uint8Array
	return (long)ret_ref;
}

void CVec_1C2Tuple_1usizeTransactionZZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_C2Tuple_usizeTransactionZZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t e = 0; e < _res_constr.datalen; e++) {
		uint32_t arr_conv_30 = _res_vals[e];
		LDKC2Tuple_usizeTransactionZ arr_conv_30_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_30;
		FREE((void*)arr_conv_30);
		_res_constr.data[e] = arr_conv_30_conv;
	}
	CVec_C2Tuple_usizeTransactionZZ_free(_res_constr);
}

uint32_t CResult_1NoneChannelMonitorUpdateErrZ_1ok(void* ctx_TODO) {
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = CResult_NoneChannelMonitorUpdateErrZ_ok();
	return (long)ret_conv;
}

uint32_t CResult_1NoneChannelMonitorUpdateErrZ_1err(void* ctx_TODO, uint32_t e) {
	LDKChannelMonitorUpdateErr e_conv = LDKChannelMonitorUpdateErr_from_js(e);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = CResult_NoneChannelMonitorUpdateErrZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1NoneChannelMonitorUpdateErrZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_NoneChannelMonitorUpdateErrZ _res_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)_res;
	FREE((void*)_res);
	CResult_NoneChannelMonitorUpdateErrZ_free(_res_conv);
}

void CVec_1MonitorEventZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_MonitorEventZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKMonitorEvent), "LDKCVec_MonitorEventZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t o = 0; o < _res_constr.datalen; o++) {
		uint32_t arr_conv_14 = _res_vals[o];
		LDKMonitorEvent arr_conv_14_conv;
		arr_conv_14_conv.inner = (void*)(arr_conv_14 & (~1));
		arr_conv_14_conv.is_owned = (arr_conv_14 & 1) || (arr_conv_14 == 0);
		_res_constr.data[o] = arr_conv_14_conv;
	}
	CVec_MonitorEventZ_free(_res_constr);
}

uint32_t CResult_1ChannelMonitorUpdateDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKChannelMonitorUpdate o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = ChannelMonitorUpdate_clone(&o_conv);
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelMonitorUpdateDecodeErrorZ), "LDKCResult_ChannelMonitorUpdateDecodeErrorZ");
	*ret_conv = CResult_ChannelMonitorUpdateDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1ChannelMonitorUpdateDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelMonitorUpdateDecodeErrorZ), "LDKCResult_ChannelMonitorUpdateDecodeErrorZ");
	*ret_conv = CResult_ChannelMonitorUpdateDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1ChannelMonitorUpdateDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ _res_conv = *(LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ChannelMonitorUpdateDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1NoneMonitorUpdateErrorZ_1ok(void* ctx_TODO) {
	LDKCResult_NoneMonitorUpdateErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret_conv = CResult_NoneMonitorUpdateErrorZ_ok();
	return (long)ret_conv;
}

uint32_t CResult_1NoneMonitorUpdateErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKMonitorUpdateError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NoneMonitorUpdateErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret_conv = CResult_NoneMonitorUpdateErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1NoneMonitorUpdateErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_NoneMonitorUpdateErrorZ _res_conv = *(LDKCResult_NoneMonitorUpdateErrorZ*)_res;
	FREE((void*)_res);
	CResult_NoneMonitorUpdateErrorZ_free(_res_conv);
}

void C2Tuple_1OutPointScriptZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKC2Tuple_OutPointScriptZ _res_conv = *(LDKC2Tuple_OutPointScriptZ*)_res;
	FREE((void*)_res);
	C2Tuple_OutPointScriptZ_free(_res_conv);
}

uint32_t C2Tuple_1OutPointScriptZ_1new(void* ctx_TODO, uint32_t a, int8_tArray b) {
	LDKOutPoint a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = OutPoint_clone(&a_conv);
	LDKCVec_u8Z b_ref;
	b_ref.datalen = *b.len;
	b_ref.data = MALLOC(b_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(b_ref.data, b.len + 1, b_ref.datalen);
	LDKC2Tuple_OutPointScriptZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	*ret_ref = C2Tuple_OutPointScriptZ_new(a_conv, b_ref);
	ret_ref->a = OutPoint_clone(&ret_ref->a);
	ret_ref->b = CVec_u8Z_clone(&ret_ref->b);
	return (long)ret_ref;
}

void CVec_1TransactionZ_1free(void* ctx_TODO, ptrArray _res) {
	LDKCVec_TransactionZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKTransaction), "LDKCVec_TransactionZ Elements");
	else
		_res_constr.data = NULL;
	int8_tArray* _res_vals = (int8_tArray*)(_res.len + 1);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		int8_tArray arr_conv_12 = _res_vals[m];
		LDKTransaction arr_conv_12_ref;
		arr_conv_12_ref.datalen = *arr_conv_12.len;
		arr_conv_12_ref.data = MALLOC(arr_conv_12_ref.datalen, "LDKTransaction Bytes");
		memcpy(arr_conv_12_ref.data, arr_conv_12.len + 1, arr_conv_12_ref.datalen);
		arr_conv_12_ref.data_is_owned = true;
		_res_constr.data[m] = arr_conv_12_ref;
	}
	CVec_TransactionZ_free(_res_constr);
}

void C2Tuple_1u32TxOutZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKC2Tuple_u32TxOutZ _res_conv = *(LDKC2Tuple_u32TxOutZ*)_res;
	FREE((void*)_res);
	C2Tuple_u32TxOutZ_free(_res_conv);
}

uint32_t C2Tuple_1u32TxOutZ_1new(void* ctx_TODO, int32_t a, uint32_t b) {
	LDKTxOut b_conv = *(LDKTxOut*)b;
	FREE((void*)b);
	LDKC2Tuple_u32TxOutZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ), "LDKC2Tuple_u32TxOutZ");
	*ret_ref = C2Tuple_u32TxOutZ_new(a, b_conv);
	// XXX: We likely need to clone here, but no _clone fn is available for TxOut
	return (long)ret_ref;
}

void CVec_1C2Tuple_1u32TxOutZZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_C2Tuple_u32TxOutZZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC2Tuple_u32TxOutZ), "LDKCVec_C2Tuple_u32TxOutZZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t z = 0; z < _res_constr.datalen; z++) {
		uint32_t arr_conv_25 = _res_vals[z];
		LDKC2Tuple_u32TxOutZ arr_conv_25_conv = *(LDKC2Tuple_u32TxOutZ*)arr_conv_25;
		FREE((void*)arr_conv_25);
		_res_constr.data[z] = arr_conv_25_conv;
	}
	CVec_C2Tuple_u32TxOutZZ_free(_res_constr);
}

void C2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ _res_conv = *(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)_res;
	FREE((void*)_res);
	C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(_res_conv);
}

uint32_t C2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZ_1new(void* ctx_TODO, int8_tArray a, uint32_tArray b) {
	LDKThirtyTwoBytes a_ref;
	CHECK(*a.len == 32);
	memcpy(a_ref.data, a.len + 1, 32);
	LDKCVec_C2Tuple_u32TxOutZZ b_constr;
	b_constr.datalen = *b.len;
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKC2Tuple_u32TxOutZ), "LDKCVec_C2Tuple_u32TxOutZZ Elements");
	else
		b_constr.data = NULL;
	uint32_t* b_vals = (uint32_t*)(b.len + 1);
	for (size_t z = 0; z < b_constr.datalen; z++) {
		uint32_t arr_conv_25 = b_vals[z];
		LDKC2Tuple_u32TxOutZ arr_conv_25_conv = *(LDKC2Tuple_u32TxOutZ*)arr_conv_25;
		FREE((void*)arr_conv_25);
		b_constr.data[z] = arr_conv_25_conv;
	}
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ");
	*ret_ref = C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(a_ref, b_constr);
	ret_ref->a = ThirtyTwoBytes_clone(&ret_ref->a);
	// XXX: We likely need to clone here, but no _clone fn is available for TwoTuple<Number, TxOut>[]
	return (long)ret_ref;
}

void CVec_1C2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t x = 0; x < _res_constr.datalen; x++) {
		uint32_t arr_conv_49 = _res_vals[x];
		LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ arr_conv_49_conv = *(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)arr_conv_49;
		FREE((void*)arr_conv_49);
		_res_constr.data[x] = arr_conv_49_conv;
	}
	CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free(_res_constr);
}

void C2Tuple_1BlockHashChannelMonitorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKC2Tuple_BlockHashChannelMonitorZ _res_conv = *(LDKC2Tuple_BlockHashChannelMonitorZ*)_res;
	FREE((void*)_res);
	C2Tuple_BlockHashChannelMonitorZ_free(_res_conv);
}

uint32_t C2Tuple_1BlockHashChannelMonitorZ_1new(void* ctx_TODO, int8_tArray a, uint32_t b) {
	LDKThirtyTwoBytes a_ref;
	CHECK(*a.len == 32);
	memcpy(a_ref.data, a.len + 1, 32);
	LDKChannelMonitor b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	// Warning: we may need a move here but can't clone!
	LDKC2Tuple_BlockHashChannelMonitorZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelMonitorZ), "LDKC2Tuple_BlockHashChannelMonitorZ");
	*ret_ref = C2Tuple_BlockHashChannelMonitorZ_new(a_ref, b_conv);
	ret_ref->a = ThirtyTwoBytes_clone(&ret_ref->a);
	// XXX: We likely need to clone here, but no _clone fn is available for ChannelMonitor
	return (long)ret_ref;
}

uint32_t CResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKC2Tuple_BlockHashChannelMonitorZ o_conv = *(LDKC2Tuple_BlockHashChannelMonitorZ*)o;
	FREE((void*)o);
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ _res_conv = *(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(_res_conv);
}

void C2Tuple_1u64u64Z_1free(void* ctx_TODO, uint32_t _res) {
	LDKC2Tuple_u64u64Z _res_conv = *(LDKC2Tuple_u64u64Z*)_res;
	FREE((void*)_res);
	C2Tuple_u64u64Z_free(_res_conv);
}

uint32_t C2Tuple_1u64u64Z_1new(void* ctx_TODO, int64_t a, int64_t b) {
	LDKC2Tuple_u64u64Z* ret_ref = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret_ref = C2Tuple_u64u64Z_new(a, b);
	return (long)ret_ref;
}

uint32_t CResult_1SpendableOutputDescriptorDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKSpendableOutputDescriptor o_conv = *(LDKSpendableOutputDescriptor*)o;
	FREE((void*)o);
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SpendableOutputDescriptorDecodeErrorZ), "LDKCResult_SpendableOutputDescriptorDecodeErrorZ");
	*ret_conv = CResult_SpendableOutputDescriptorDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1SpendableOutputDescriptorDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SpendableOutputDescriptorDecodeErrorZ), "LDKCResult_SpendableOutputDescriptorDecodeErrorZ");
	*ret_conv = CResult_SpendableOutputDescriptorDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1SpendableOutputDescriptorDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ _res_conv = *(LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_SpendableOutputDescriptorDecodeErrorZ_free(_res_conv);
}

void CVec_1SignatureZ_1free(void* ctx_TODO, ptrArray _res) {
	LDKCVec_SignatureZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		_res_constr.data = NULL;
	int8_tArray* _res_vals = (int8_tArray*)(_res.len + 1);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		int8_tArray arr_conv_12 = _res_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*arr_conv_12.len == 64);
		memcpy(arr_conv_12_ref.compact_form, arr_conv_12.len + 1, 64);
		_res_constr.data[m] = arr_conv_12_ref;
	}
	CVec_SignatureZ_free(_res_constr);
}

void C2Tuple_1SignatureCVec_1SignatureZZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKC2Tuple_SignatureCVec_SignatureZZ _res_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)_res;
	FREE((void*)_res);
	C2Tuple_SignatureCVec_SignatureZZ_free(_res_conv);
}

uint32_t C2Tuple_1SignatureCVec_1SignatureZZ_1new(void* ctx_TODO, int8_tArray a, ptrArray b) {
	LDKSignature a_ref;
	CHECK(*a.len == 64);
	memcpy(a_ref.compact_form, a.len + 1, 64);
	LDKCVec_SignatureZ b_constr;
	b_constr.datalen = *b.len;
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		b_constr.data = NULL;
	int8_tArray* b_vals = (int8_tArray*)(b.len + 1);
	for (size_t m = 0; m < b_constr.datalen; m++) {
		int8_tArray arr_conv_12 = b_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*arr_conv_12.len == 64);
		memcpy(arr_conv_12_ref.compact_form, arr_conv_12.len + 1, 64);
		b_constr.data[m] = arr_conv_12_ref;
	}
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ), "LDKC2Tuple_SignatureCVec_SignatureZZ");
	*ret_ref = C2Tuple_SignatureCVec_SignatureZZ_new(a_ref, b_constr);
	// XXX: We likely need to clone here, but no _clone fn is available for Uint8Array
	// XXX: We likely need to clone here, but no _clone fn is available for Uint8Array[]
	return (long)ret_ref;
}

uint32_t CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKC2Tuple_SignatureCVec_SignatureZZ o_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)o;
	FREE((void*)o);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1err(void* ctx_TODO) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
	return (long)ret_conv;
}

void CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ _res_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)_res;
	FREE((void*)_res);
	CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(_res_conv);
}

uint32_t CResult_1SignatureNoneZ_1ok(void* ctx_TODO, int8_tArray o) {
	LDKSignature o_ref;
	CHECK(*o.len == 64);
	memcpy(o_ref.compact_form, o.len + 1, 64);
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = CResult_SignatureNoneZ_ok(o_ref);
	return (long)ret_conv;
}

uint32_t CResult_1SignatureNoneZ_1err(void* ctx_TODO) {
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = CResult_SignatureNoneZ_err();
	return (long)ret_conv;
}

void CResult_1SignatureNoneZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_SignatureNoneZ _res_conv = *(LDKCResult_SignatureNoneZ*)_res;
	FREE((void*)_res);
	CResult_SignatureNoneZ_free(_res_conv);
}

uint32_t CResult_1CVec_1SignatureZNoneZ_1ok(void* ctx_TODO, ptrArray o) {
	LDKCVec_SignatureZ o_constr;
	o_constr.datalen = *o.len;
	if (o_constr.datalen > 0)
		o_constr.data = MALLOC(o_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		o_constr.data = NULL;
	int8_tArray* o_vals = (int8_tArray*)(o.len + 1);
	for (size_t m = 0; m < o_constr.datalen; m++) {
		int8_tArray arr_conv_12 = o_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*arr_conv_12.len == 64);
		memcpy(arr_conv_12_ref.compact_form, arr_conv_12.len + 1, 64);
		o_constr.data[m] = arr_conv_12_ref;
	}
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = CResult_CVec_SignatureZNoneZ_ok(o_constr);
	return (long)ret_conv;
}

uint32_t CResult_1CVec_1SignatureZNoneZ_1err(void* ctx_TODO) {
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = CResult_CVec_SignatureZNoneZ_err();
	return (long)ret_conv;
}

void CResult_1CVec_1SignatureZNoneZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_CVec_SignatureZNoneZ _res_conv = *(LDKCResult_CVec_SignatureZNoneZ*)_res;
	FREE((void*)_res);
	CResult_CVec_SignatureZNoneZ_free(_res_conv);
}

uint32_t CResult_1ChanKeySignerDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKChannelKeys o_conv = *(LDKChannelKeys*)o;
	LDKCResult_ChanKeySignerDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChanKeySignerDecodeErrorZ), "LDKCResult_ChanKeySignerDecodeErrorZ");
	*ret_conv = CResult_ChanKeySignerDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1ChanKeySignerDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ChanKeySignerDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChanKeySignerDecodeErrorZ), "LDKCResult_ChanKeySignerDecodeErrorZ");
	*ret_conv = CResult_ChanKeySignerDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1ChanKeySignerDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_ChanKeySignerDecodeErrorZ _res_conv = *(LDKCResult_ChanKeySignerDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ChanKeySignerDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1InMemoryChannelKeysDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKInMemoryChannelKeys o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = InMemoryChannelKeys_clone(&o_conv);
	LDKCResult_InMemoryChannelKeysDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InMemoryChannelKeysDecodeErrorZ), "LDKCResult_InMemoryChannelKeysDecodeErrorZ");
	*ret_conv = CResult_InMemoryChannelKeysDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1InMemoryChannelKeysDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_InMemoryChannelKeysDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InMemoryChannelKeysDecodeErrorZ), "LDKCResult_InMemoryChannelKeysDecodeErrorZ");
	*ret_conv = CResult_InMemoryChannelKeysDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1InMemoryChannelKeysDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_InMemoryChannelKeysDecodeErrorZ _res_conv = *(LDKCResult_InMemoryChannelKeysDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_InMemoryChannelKeysDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1TxOutAccessErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKTxOut o_conv = *(LDKTxOut*)o;
	FREE((void*)o);
	LDKCResult_TxOutAccessErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret_conv = CResult_TxOutAccessErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1TxOutAccessErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKAccessError e_conv = LDKAccessError_from_js(e);
	LDKCResult_TxOutAccessErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret_conv = CResult_TxOutAccessErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1TxOutAccessErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_TxOutAccessErrorZ _res_conv = *(LDKCResult_TxOutAccessErrorZ*)_res;
	FREE((void*)_res);
	CResult_TxOutAccessErrorZ_free(_res_conv);
}

uint32_t CResult_1NoneAPIErrorZ_1ok(void* ctx_TODO) {
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = CResult_NoneAPIErrorZ_ok();
	return (long)ret_conv;
}

uint32_t CResult_1NoneAPIErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKAPIError e_conv = *(LDKAPIError*)e;
	FREE((void*)e);
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = CResult_NoneAPIErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1NoneAPIErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_NoneAPIErrorZ _res_conv = *(LDKCResult_NoneAPIErrorZ*)_res;
	FREE((void*)_res);
	CResult_NoneAPIErrorZ_free(_res_conv);
}

void CVec_1ChannelDetailsZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_ChannelDetailsZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKChannelDetails), "LDKCVec_ChannelDetailsZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t q = 0; q < _res_constr.datalen; q++) {
		uint32_t arr_conv_16 = _res_vals[q];
		LDKChannelDetails arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		_res_constr.data[q] = arr_conv_16_conv;
	}
	CVec_ChannelDetailsZ_free(_res_constr);
}

uint32_t CResult_1NonePaymentSendFailureZ_1ok(void* ctx_TODO) {
	LDKCResult_NonePaymentSendFailureZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret_conv = CResult_NonePaymentSendFailureZ_ok();
	return (long)ret_conv;
}

uint32_t CResult_1NonePaymentSendFailureZ_1err(void* ctx_TODO, uint32_t e) {
	LDKPaymentSendFailure e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NonePaymentSendFailureZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret_conv = CResult_NonePaymentSendFailureZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1NonePaymentSendFailureZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_NonePaymentSendFailureZ _res_conv = *(LDKCResult_NonePaymentSendFailureZ*)_res;
	FREE((void*)_res);
	CResult_NonePaymentSendFailureZ_free(_res_conv);
}

void CVec_1NetAddressZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_NetAddressZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		uint32_t arr_conv_12 = _res_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		_res_constr.data[m] = arr_conv_12_conv;
	}
	CVec_NetAddressZ_free(_res_constr);
}

void CVec_1ChannelMonitorZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_ChannelMonitorZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKChannelMonitor), "LDKCVec_ChannelMonitorZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t q = 0; q < _res_constr.datalen; q++) {
		uint32_t arr_conv_16 = _res_vals[q];
		LDKChannelMonitor arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		_res_constr.data[q] = arr_conv_16_conv;
	}
	CVec_ChannelMonitorZ_free(_res_constr);
}

void C2Tuple_1BlockHashChannelManagerZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKC2Tuple_BlockHashChannelManagerZ _res_conv = *(LDKC2Tuple_BlockHashChannelManagerZ*)_res;
	FREE((void*)_res);
	C2Tuple_BlockHashChannelManagerZ_free(_res_conv);
}

uint32_t C2Tuple_1BlockHashChannelManagerZ_1new(void* ctx_TODO, int8_tArray a, uint32_t b) {
	LDKThirtyTwoBytes a_ref;
	CHECK(*a.len == 32);
	memcpy(a_ref.data, a.len + 1, 32);
	LDKChannelManager b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	// Warning: we may need a move here but can't clone!
	LDKC2Tuple_BlockHashChannelManagerZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelManagerZ), "LDKC2Tuple_BlockHashChannelManagerZ");
	*ret_ref = C2Tuple_BlockHashChannelManagerZ_new(a_ref, b_conv);
	ret_ref->a = ThirtyTwoBytes_clone(&ret_ref->a);
	// XXX: We likely need to clone here, but no _clone fn is available for ChannelManager
	return (long)ret_ref;
}

uint32_t CResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKC2Tuple_BlockHashChannelManagerZ o_conv = *(LDKC2Tuple_BlockHashChannelManagerZ*)o;
	FREE((void*)o);
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ _res_conv = *(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1NetAddressu8Z_1ok(void* ctx_TODO, uint32_t o) {
	LDKNetAddress o_conv = *(LDKNetAddress*)o;
	FREE((void*)o);
	LDKCResult_NetAddressu8Z* ret_conv = MALLOC(sizeof(LDKCResult_NetAddressu8Z), "LDKCResult_NetAddressu8Z");
	*ret_conv = CResult_NetAddressu8Z_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1NetAddressu8Z_1err(void* ctx_TODO, int8_t e) {
	LDKCResult_NetAddressu8Z* ret_conv = MALLOC(sizeof(LDKCResult_NetAddressu8Z), "LDKCResult_NetAddressu8Z");
	*ret_conv = CResult_NetAddressu8Z_err(e);
	return (long)ret_conv;
}

void CResult_1NetAddressu8Z_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_NetAddressu8Z _res_conv = *(LDKCResult_NetAddressu8Z*)_res;
	FREE((void*)_res);
	CResult_NetAddressu8Z_free(_res_conv);
}

uint32_t CResult_1CResult_1NetAddressu8ZDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKCResult_NetAddressu8Z o_conv = *(LDKCResult_NetAddressu8Z*)o;
	FREE((void*)o);
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ), "LDKCResult_CResult_NetAddressu8ZDecodeErrorZ");
	*ret_conv = CResult_CResult_NetAddressu8ZDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1CResult_1NetAddressu8ZDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ), "LDKCResult_CResult_NetAddressu8ZDecodeErrorZ");
	*ret_conv = CResult_CResult_NetAddressu8ZDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1CResult_1NetAddressu8ZDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ _res_conv = *(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_CResult_NetAddressu8ZDecodeErrorZ_free(_res_conv);
}

void CVec_1u64Z_1free(void* ctx_TODO, int64_tArray _res) {
	LDKCVec_u64Z _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (int64_t*)(_res.len + 1);
	for (size_t i = 0; i < _res_constr.datalen; i++) {
		int64_t arr_conv_8 = _res_vals[i];
		_res_constr.data[i] = arr_conv_8;
	}
	CVec_u64Z_free(_res_constr);
}

void CVec_1UpdateAddHTLCZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_UpdateAddHTLCZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t p = 0; p < _res_constr.datalen; p++) {
		uint32_t arr_conv_15 = _res_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		_res_constr.data[p] = arr_conv_15_conv;
	}
	CVec_UpdateAddHTLCZ_free(_res_constr);
}

void CVec_1UpdateFulfillHTLCZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_UpdateFulfillHTLCZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t t = 0; t < _res_constr.datalen; t++) {
		uint32_t arr_conv_19 = _res_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		_res_constr.data[t] = arr_conv_19_conv;
	}
	CVec_UpdateFulfillHTLCZ_free(_res_constr);
}

void CVec_1UpdateFailHTLCZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_UpdateFailHTLCZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t q = 0; q < _res_constr.datalen; q++) {
		uint32_t arr_conv_16 = _res_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		_res_constr.data[q] = arr_conv_16_conv;
	}
	CVec_UpdateFailHTLCZ_free(_res_constr);
}

void CVec_1UpdateFailMalformedHTLCZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_UpdateFailMalformedHTLCZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t z = 0; z < _res_constr.datalen; z++) {
		uint32_t arr_conv_25 = _res_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		_res_constr.data[z] = arr_conv_25_conv;
	}
	CVec_UpdateFailMalformedHTLCZ_free(_res_constr);
}

uint32_t CResult_1boolLightningErrorZ_1ok(void* ctx_TODO, jboolean o) {
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = CResult_boolLightningErrorZ_ok(o);
	return (long)ret_conv;
}

uint32_t CResult_1boolLightningErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKLightningError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = CResult_boolLightningErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1boolLightningErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_boolLightningErrorZ _res_conv = *(LDKCResult_boolLightningErrorZ*)_res;
	FREE((void*)_res);
	CResult_boolLightningErrorZ_free(_res_conv);
}

void C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ _res_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)_res;
	FREE((void*)_res);
	C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(_res_conv);
}

uint32_t C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1new(void* ctx_TODO, uint32_t a, uint32_t b, uint32_t c) {
	LDKChannelAnnouncement a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = ChannelAnnouncement_clone(&a_conv);
	LDKChannelUpdate b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	if (b_conv.inner != NULL)
		b_conv = ChannelUpdate_clone(&b_conv);
	LDKChannelUpdate c_conv;
	c_conv.inner = (void*)(c & (~1));
	c_conv.is_owned = (c & 1) || (c == 0);
	if (c_conv.inner != NULL)
		c_conv = ChannelUpdate_clone(&c_conv);
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* ret_ref = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
	*ret_ref = C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a_conv, b_conv, c_conv);
	ret_ref->a = ChannelAnnouncement_clone(&ret_ref->a);
	ret_ref->b = ChannelUpdate_clone(&ret_ref->b);
	ret_ref->c = ChannelUpdate_clone(&ret_ref->c);
	return (long)ret_ref;
}

void CVec_1C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t l = 0; l < _res_constr.datalen; l++) {
		uint32_t arr_conv_63 = _res_vals[l];
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_conv_63_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arr_conv_63;
		FREE((void*)arr_conv_63);
		_res_constr.data[l] = arr_conv_63_conv;
	}
	CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(_res_constr);
}

void CVec_1NodeAnnouncementZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_NodeAnnouncementZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKNodeAnnouncement), "LDKCVec_NodeAnnouncementZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t s = 0; s < _res_constr.datalen; s++) {
		uint32_t arr_conv_18 = _res_vals[s];
		LDKNodeAnnouncement arr_conv_18_conv;
		arr_conv_18_conv.inner = (void*)(arr_conv_18 & (~1));
		arr_conv_18_conv.is_owned = (arr_conv_18 & 1) || (arr_conv_18 == 0);
		_res_constr.data[s] = arr_conv_18_conv;
	}
	CVec_NodeAnnouncementZ_free(_res_constr);
}

uint32_t CResult_1NoneLightningErrorZ_1ok(void* ctx_TODO) {
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = CResult_NoneLightningErrorZ_ok();
	return (long)ret_conv;
}

uint32_t CResult_1NoneLightningErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKLightningError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = CResult_NoneLightningErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1NoneLightningErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_NoneLightningErrorZ _res_conv = *(LDKCResult_NoneLightningErrorZ*)_res;
	FREE((void*)_res);
	CResult_NoneLightningErrorZ_free(_res_conv);
}

uint32_t CResult_1ChannelReestablishDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKChannelReestablish o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = ChannelReestablish_clone(&o_conv);
	LDKCResult_ChannelReestablishDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelReestablishDecodeErrorZ), "LDKCResult_ChannelReestablishDecodeErrorZ");
	*ret_conv = CResult_ChannelReestablishDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1ChannelReestablishDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ChannelReestablishDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelReestablishDecodeErrorZ), "LDKCResult_ChannelReestablishDecodeErrorZ");
	*ret_conv = CResult_ChannelReestablishDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1ChannelReestablishDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_ChannelReestablishDecodeErrorZ _res_conv = *(LDKCResult_ChannelReestablishDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ChannelReestablishDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1InitDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKInit o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = Init_clone(&o_conv);
	LDKCResult_InitDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InitDecodeErrorZ), "LDKCResult_InitDecodeErrorZ");
	*ret_conv = CResult_InitDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1InitDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_InitDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InitDecodeErrorZ), "LDKCResult_InitDecodeErrorZ");
	*ret_conv = CResult_InitDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1InitDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_InitDecodeErrorZ _res_conv = *(LDKCResult_InitDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_InitDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1PingDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKPing o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = Ping_clone(&o_conv);
	LDKCResult_PingDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PingDecodeErrorZ), "LDKCResult_PingDecodeErrorZ");
	*ret_conv = CResult_PingDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1PingDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_PingDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PingDecodeErrorZ), "LDKCResult_PingDecodeErrorZ");
	*ret_conv = CResult_PingDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1PingDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_PingDecodeErrorZ _res_conv = *(LDKCResult_PingDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_PingDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1PongDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKPong o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = Pong_clone(&o_conv);
	LDKCResult_PongDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PongDecodeErrorZ), "LDKCResult_PongDecodeErrorZ");
	*ret_conv = CResult_PongDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1PongDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_PongDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PongDecodeErrorZ), "LDKCResult_PongDecodeErrorZ");
	*ret_conv = CResult_PongDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1PongDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_PongDecodeErrorZ _res_conv = *(LDKCResult_PongDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_PongDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1UnsignedChannelAnnouncementDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKUnsignedChannelAnnouncement o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = UnsignedChannelAnnouncement_clone(&o_conv);
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ), "LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1UnsignedChannelAnnouncementDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ), "LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1UnsignedChannelAnnouncementDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ _res_conv = *(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_UnsignedChannelAnnouncementDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1UnsignedChannelUpdateDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKUnsignedChannelUpdate o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = UnsignedChannelUpdate_clone(&o_conv);
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelUpdateDecodeErrorZ), "LDKCResult_UnsignedChannelUpdateDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelUpdateDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1UnsignedChannelUpdateDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelUpdateDecodeErrorZ), "LDKCResult_UnsignedChannelUpdateDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelUpdateDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1UnsignedChannelUpdateDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ _res_conv = *(LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_UnsignedChannelUpdateDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1ErrorMessageDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKErrorMessage o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = ErrorMessage_clone(&o_conv);
	LDKCResult_ErrorMessageDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ErrorMessageDecodeErrorZ), "LDKCResult_ErrorMessageDecodeErrorZ");
	*ret_conv = CResult_ErrorMessageDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1ErrorMessageDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ErrorMessageDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ErrorMessageDecodeErrorZ), "LDKCResult_ErrorMessageDecodeErrorZ");
	*ret_conv = CResult_ErrorMessageDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1ErrorMessageDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_ErrorMessageDecodeErrorZ _res_conv = *(LDKCResult_ErrorMessageDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ErrorMessageDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1UnsignedNodeAnnouncementDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKUnsignedNodeAnnouncement o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = UnsignedNodeAnnouncement_clone(&o_conv);
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ), "LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedNodeAnnouncementDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1UnsignedNodeAnnouncementDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ), "LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedNodeAnnouncementDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1UnsignedNodeAnnouncementDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ _res_conv = *(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_UnsignedNodeAnnouncementDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1QueryShortChannelIdsDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKQueryShortChannelIds o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = QueryShortChannelIds_clone(&o_conv);
	LDKCResult_QueryShortChannelIdsDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryShortChannelIdsDecodeErrorZ), "LDKCResult_QueryShortChannelIdsDecodeErrorZ");
	*ret_conv = CResult_QueryShortChannelIdsDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1QueryShortChannelIdsDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_QueryShortChannelIdsDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryShortChannelIdsDecodeErrorZ), "LDKCResult_QueryShortChannelIdsDecodeErrorZ");
	*ret_conv = CResult_QueryShortChannelIdsDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1QueryShortChannelIdsDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_QueryShortChannelIdsDecodeErrorZ _res_conv = *(LDKCResult_QueryShortChannelIdsDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_QueryShortChannelIdsDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1ReplyShortChannelIdsEndDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKReplyShortChannelIdsEnd o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = ReplyShortChannelIdsEnd_clone(&o_conv);
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ), "LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ");
	*ret_conv = CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1ReplyShortChannelIdsEndDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ), "LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ");
	*ret_conv = CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1ReplyShortChannelIdsEndDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ _res_conv = *(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1QueryChannelRangeDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKQueryChannelRange o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = QueryChannelRange_clone(&o_conv);
	LDKCResult_QueryChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryChannelRangeDecodeErrorZ), "LDKCResult_QueryChannelRangeDecodeErrorZ");
	*ret_conv = CResult_QueryChannelRangeDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1QueryChannelRangeDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_QueryChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryChannelRangeDecodeErrorZ), "LDKCResult_QueryChannelRangeDecodeErrorZ");
	*ret_conv = CResult_QueryChannelRangeDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1QueryChannelRangeDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_QueryChannelRangeDecodeErrorZ _res_conv = *(LDKCResult_QueryChannelRangeDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_QueryChannelRangeDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1ReplyChannelRangeDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKReplyChannelRange o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = ReplyChannelRange_clone(&o_conv);
	LDKCResult_ReplyChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyChannelRangeDecodeErrorZ), "LDKCResult_ReplyChannelRangeDecodeErrorZ");
	*ret_conv = CResult_ReplyChannelRangeDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1ReplyChannelRangeDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ReplyChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyChannelRangeDecodeErrorZ), "LDKCResult_ReplyChannelRangeDecodeErrorZ");
	*ret_conv = CResult_ReplyChannelRangeDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1ReplyChannelRangeDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_ReplyChannelRangeDecodeErrorZ _res_conv = *(LDKCResult_ReplyChannelRangeDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ReplyChannelRangeDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1GossipTimestampFilterDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKGossipTimestampFilter o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = GossipTimestampFilter_clone(&o_conv);
	LDKCResult_GossipTimestampFilterDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_GossipTimestampFilterDecodeErrorZ), "LDKCResult_GossipTimestampFilterDecodeErrorZ");
	*ret_conv = CResult_GossipTimestampFilterDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1GossipTimestampFilterDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_GossipTimestampFilterDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_GossipTimestampFilterDecodeErrorZ), "LDKCResult_GossipTimestampFilterDecodeErrorZ");
	*ret_conv = CResult_GossipTimestampFilterDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1GossipTimestampFilterDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_GossipTimestampFilterDecodeErrorZ _res_conv = *(LDKCResult_GossipTimestampFilterDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_GossipTimestampFilterDecodeErrorZ_free(_res_conv);
}

void CVec_1PublicKeyZ_1free(void* ctx_TODO, ptrArray _res) {
	LDKCVec_PublicKeyZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKPublicKey), "LDKCVec_PublicKeyZ Elements");
	else
		_res_constr.data = NULL;
	int8_tArray* _res_vals = (int8_tArray*)(_res.len + 1);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		int8_tArray arr_conv_12 = _res_vals[m];
		LDKPublicKey arr_conv_12_ref;
		CHECK(*arr_conv_12.len == 33);
		memcpy(arr_conv_12_ref.compressed_form, arr_conv_12.len + 1, 33);
		_res_constr.data[m] = arr_conv_12_ref;
	}
	CVec_PublicKeyZ_free(_res_constr);
}

void CVec_1u8Z_1free(void* ctx_TODO, int8_tArray _res) {
	LDKCVec_u8Z _res_ref;
	_res_ref.datalen = *_res.len;
	_res_ref.data = MALLOC(_res_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(_res_ref.data, _res.len + 1, _res_ref.datalen);
	CVec_u8Z_free(_res_ref);
}

uint32_t CResult_1CVec_1u8ZPeerHandleErrorZ_1ok(void* ctx_TODO, int8_tArray o) {
	LDKCVec_u8Z o_ref;
	o_ref.datalen = *o.len;
	o_ref.data = MALLOC(o_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(o_ref.data, o.len + 1, o_ref.datalen);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret_conv = CResult_CVec_u8ZPeerHandleErrorZ_ok(o_ref);
	return (long)ret_conv;
}

uint32_t CResult_1CVec_1u8ZPeerHandleErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKPeerHandleError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret_conv = CResult_CVec_u8ZPeerHandleErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1CVec_1u8ZPeerHandleErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ _res_conv = *(LDKCResult_CVec_u8ZPeerHandleErrorZ*)_res;
	FREE((void*)_res);
	CResult_CVec_u8ZPeerHandleErrorZ_free(_res_conv);
}

uint32_t CResult_1NonePeerHandleErrorZ_1ok(void* ctx_TODO) {
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = CResult_NonePeerHandleErrorZ_ok();
	return (long)ret_conv;
}

uint32_t CResult_1NonePeerHandleErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKPeerHandleError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = CResult_NonePeerHandleErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1NonePeerHandleErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_NonePeerHandleErrorZ _res_conv = *(LDKCResult_NonePeerHandleErrorZ*)_res;
	FREE((void*)_res);
	CResult_NonePeerHandleErrorZ_free(_res_conv);
}

uint32_t CResult_1boolPeerHandleErrorZ_1ok(void* ctx_TODO, jboolean o) {
	LDKCResult_boolPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret_conv = CResult_boolPeerHandleErrorZ_ok(o);
	return (long)ret_conv;
}

uint32_t CResult_1boolPeerHandleErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKPeerHandleError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_boolPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret_conv = CResult_boolPeerHandleErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1boolPeerHandleErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_boolPeerHandleErrorZ _res_conv = *(LDKCResult_boolPeerHandleErrorZ*)_res;
	FREE((void*)_res);
	CResult_boolPeerHandleErrorZ_free(_res_conv);
}

uint32_t CResult_1SecretKeySecpErrorZ_1ok(void* ctx_TODO, int8_tArray o) {
	LDKSecretKey o_ref;
	CHECK(*o.len == 32);
	memcpy(o_ref.bytes, o.len + 1, 32);
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = CResult_SecretKeySecpErrorZ_ok(o_ref);
	return (long)ret_conv;
}

uint32_t CResult_1SecretKeySecpErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKSecp256k1Error e_conv = LDKSecp256k1Error_from_js(e);
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = CResult_SecretKeySecpErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1SecretKeySecpErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_SecretKeySecpErrorZ _res_conv = *(LDKCResult_SecretKeySecpErrorZ*)_res;
	FREE((void*)_res);
	CResult_SecretKeySecpErrorZ_free(_res_conv);
}

uint32_t CResult_1PublicKeySecpErrorZ_1ok(void* ctx_TODO, int8_tArray o) {
	LDKPublicKey o_ref;
	CHECK(*o.len == 33);
	memcpy(o_ref.compressed_form, o.len + 1, 33);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = CResult_PublicKeySecpErrorZ_ok(o_ref);
	return (long)ret_conv;
}

uint32_t CResult_1PublicKeySecpErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKSecp256k1Error e_conv = LDKSecp256k1Error_from_js(e);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = CResult_PublicKeySecpErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1PublicKeySecpErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_PublicKeySecpErrorZ _res_conv = *(LDKCResult_PublicKeySecpErrorZ*)_res;
	FREE((void*)_res);
	CResult_PublicKeySecpErrorZ_free(_res_conv);
}

uint32_t CResult_1TxCreationKeysSecpErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKTxCreationKeys o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = TxCreationKeys_clone(&o_conv);
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = CResult_TxCreationKeysSecpErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1TxCreationKeysSecpErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKSecp256k1Error e_conv = LDKSecp256k1Error_from_js(e);
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = CResult_TxCreationKeysSecpErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1TxCreationKeysSecpErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_TxCreationKeysSecpErrorZ _res_conv = *(LDKCResult_TxCreationKeysSecpErrorZ*)_res;
	FREE((void*)_res);
	CResult_TxCreationKeysSecpErrorZ_free(_res_conv);
}

uint32_t CResult_1TrustedCommitmentTransactionNoneZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKTrustedCommitmentTransaction o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_TrustedCommitmentTransactionNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_TrustedCommitmentTransactionNoneZ), "LDKCResult_TrustedCommitmentTransactionNoneZ");
	*ret_conv = CResult_TrustedCommitmentTransactionNoneZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1TrustedCommitmentTransactionNoneZ_1err(void* ctx_TODO) {
	LDKCResult_TrustedCommitmentTransactionNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_TrustedCommitmentTransactionNoneZ), "LDKCResult_TrustedCommitmentTransactionNoneZ");
	*ret_conv = CResult_TrustedCommitmentTransactionNoneZ_err();
	return (long)ret_conv;
}

void CResult_1TrustedCommitmentTransactionNoneZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_TrustedCommitmentTransactionNoneZ _res_conv = *(LDKCResult_TrustedCommitmentTransactionNoneZ*)_res;
	FREE((void*)_res);
	CResult_TrustedCommitmentTransactionNoneZ_free(_res_conv);
}

void CVec_1RouteHopZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_RouteHopZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t k = 0; k < _res_constr.datalen; k++) {
		uint32_t arr_conv_10 = _res_vals[k];
		LDKRouteHop arr_conv_10_conv;
		arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
		arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
		_res_constr.data[k] = arr_conv_10_conv;
	}
	CVec_RouteHopZ_free(_res_constr);
}

void CVec_1CVec_1RouteHopZZ_1free(void* ctx_TODO, ptrArray _res) {
	LDKCVec_CVec_RouteHopZZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		_res_constr.data = NULL;
	uint32_tArray* _res_vals = (uint32_tArray*)(_res.len + 1);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		uint32_tArray arr_conv_12 = _res_vals[m];
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = *arr_conv_12.len;
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		uint32_t* arr_conv_12_vals = (uint32_t*)(arr_conv_12.len + 1);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			uint32_t arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
			arr_conv_12_constr.data[k] = arr_conv_10_conv;
		}
		_res_constr.data[m] = arr_conv_12_constr;
	}
	CVec_CVec_RouteHopZZ_free(_res_constr);
}

uint32_t CResult_1RouteDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKRoute o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = Route_clone(&o_conv);
	LDKCResult_RouteDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteDecodeErrorZ), "LDKCResult_RouteDecodeErrorZ");
	*ret_conv = CResult_RouteDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1RouteDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_RouteDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteDecodeErrorZ), "LDKCResult_RouteDecodeErrorZ");
	*ret_conv = CResult_RouteDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1RouteDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_RouteDecodeErrorZ _res_conv = *(LDKCResult_RouteDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_RouteDecodeErrorZ_free(_res_conv);
}

void CVec_1RouteHintZ_1free(void* ctx_TODO, uint32_tArray _res) {
	LDKCVec_RouteHintZ _res_constr;
	_res_constr.datalen = *_res.len;
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKRouteHint), "LDKCVec_RouteHintZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res.len + 1);
	for (size_t l = 0; l < _res_constr.datalen; l++) {
		uint32_t arr_conv_11 = _res_vals[l];
		LDKRouteHint arr_conv_11_conv;
		arr_conv_11_conv.inner = (void*)(arr_conv_11 & (~1));
		arr_conv_11_conv.is_owned = (arr_conv_11 & 1) || (arr_conv_11 == 0);
		_res_constr.data[l] = arr_conv_11_conv;
	}
	CVec_RouteHintZ_free(_res_constr);
}

uint32_t CResult_1RouteLightningErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKRoute o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = Route_clone(&o_conv);
	LDKCResult_RouteLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret_conv = CResult_RouteLightningErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1RouteLightningErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKLightningError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_RouteLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret_conv = CResult_RouteLightningErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1RouteLightningErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_RouteLightningErrorZ _res_conv = *(LDKCResult_RouteLightningErrorZ*)_res;
	FREE((void*)_res);
	CResult_RouteLightningErrorZ_free(_res_conv);
}

uint32_t CResult_1RoutingFeesDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKRoutingFees o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = RoutingFees_clone(&o_conv);
	LDKCResult_RoutingFeesDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RoutingFeesDecodeErrorZ), "LDKCResult_RoutingFeesDecodeErrorZ");
	*ret_conv = CResult_RoutingFeesDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1RoutingFeesDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_RoutingFeesDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RoutingFeesDecodeErrorZ), "LDKCResult_RoutingFeesDecodeErrorZ");
	*ret_conv = CResult_RoutingFeesDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1RoutingFeesDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_RoutingFeesDecodeErrorZ _res_conv = *(LDKCResult_RoutingFeesDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_RoutingFeesDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1NodeAnnouncementInfoDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKNodeAnnouncementInfo o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeAnnouncementInfoDecodeErrorZ), "LDKCResult_NodeAnnouncementInfoDecodeErrorZ");
	*ret_conv = CResult_NodeAnnouncementInfoDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1NodeAnnouncementInfoDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeAnnouncementInfoDecodeErrorZ), "LDKCResult_NodeAnnouncementInfoDecodeErrorZ");
	*ret_conv = CResult_NodeAnnouncementInfoDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1NodeAnnouncementInfoDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ _res_conv = *(LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_NodeAnnouncementInfoDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1NodeInfoDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKNodeInfo o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NodeInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeInfoDecodeErrorZ), "LDKCResult_NodeInfoDecodeErrorZ");
	*ret_conv = CResult_NodeInfoDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1NodeInfoDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NodeInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeInfoDecodeErrorZ), "LDKCResult_NodeInfoDecodeErrorZ");
	*ret_conv = CResult_NodeInfoDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1NodeInfoDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_NodeInfoDecodeErrorZ _res_conv = *(LDKCResult_NodeInfoDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_NodeInfoDecodeErrorZ_free(_res_conv);
}

uint32_t CResult_1NetworkGraphDecodeErrorZ_1ok(void* ctx_TODO, uint32_t o) {
	LDKNetworkGraph o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NetworkGraphDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NetworkGraphDecodeErrorZ), "LDKCResult_NetworkGraphDecodeErrorZ");
	*ret_conv = CResult_NetworkGraphDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t CResult_1NetworkGraphDecodeErrorZ_1err(void* ctx_TODO, uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NetworkGraphDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NetworkGraphDecodeErrorZ), "LDKCResult_NetworkGraphDecodeErrorZ");
	*ret_conv = CResult_NetworkGraphDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void CResult_1NetworkGraphDecodeErrorZ_1free(void* ctx_TODO, uint32_t _res) {
	LDKCResult_NetworkGraphDecodeErrorZ _res_conv = *(LDKCResult_NetworkGraphDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_NetworkGraphDecodeErrorZ_free(_res_conv);
}

void Event_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKEvent this_ptr_conv = *(LDKEvent*)this_ptr;
	FREE((void*)this_ptr);
	Event_free(this_ptr_conv);
}

uint32_t Event_1clone(void* ctx_TODO, uint32_t orig) {
	LDKEvent* orig_conv = (LDKEvent*)orig;
	LDKEvent *ret_copy = MALLOC(sizeof(LDKEvent), "LDKEvent");
	*ret_copy = Event_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

int8_tArray Event_1write(void* ctx_TODO, uint32_t obj) {
	LDKEvent* obj_conv = (LDKEvent*)obj;
	LDKCVec_u8Z arg_var = Event_write(obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

void MessageSendEvent_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKMessageSendEvent this_ptr_conv = *(LDKMessageSendEvent*)this_ptr;
	FREE((void*)this_ptr);
	MessageSendEvent_free(this_ptr_conv);
}

uint32_t MessageSendEvent_1clone(void* ctx_TODO, uint32_t orig) {
	LDKMessageSendEvent* orig_conv = (LDKMessageSendEvent*)orig;
	LDKMessageSendEvent *ret_copy = MALLOC(sizeof(LDKMessageSendEvent), "LDKMessageSendEvent");
	*ret_copy = MessageSendEvent_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

void MessageSendEventsProvider_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKMessageSendEventsProvider this_ptr_conv = *(LDKMessageSendEventsProvider*)this_ptr;
	FREE((void*)this_ptr);
	MessageSendEventsProvider_free(this_ptr_conv);
}

void EventsProvider_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKEventsProvider this_ptr_conv = *(LDKEventsProvider*)this_ptr;
	FREE((void*)this_ptr);
	EventsProvider_free(this_ptr_conv);
}

void APIError_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKAPIError this_ptr_conv = *(LDKAPIError*)this_ptr;
	FREE((void*)this_ptr);
	APIError_free(this_ptr_conv);
}

uint32_t APIError_1clone(void* ctx_TODO, uint32_t orig) {
	LDKAPIError* orig_conv = (LDKAPIError*)orig;
	LDKAPIError *ret_copy = MALLOC(sizeof(LDKAPIError), "LDKAPIError");
	*ret_copy = APIError_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

uint32_t Level_1clone(void* ctx_TODO, uint32_t orig) {
	LDKLevel* orig_conv = (LDKLevel*)orig;
	uint32_t ret_conv = LDKLevel_to_js(Level_clone(orig_conv));
	return ret_conv;
}

uint32_t Level_1max(void* ctx_TODO) {
	uint32_t ret_conv = LDKLevel_to_js(Level_max());
	return ret_conv;
}

void Logger_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKLogger this_ptr_conv = *(LDKLogger*)this_ptr;
	FREE((void*)this_ptr);
	Logger_free(this_ptr_conv);
}

void ChannelHandshakeConfig_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeConfig_free(this_ptr_conv);
}

uint32_t ChannelHandshakeConfig_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelHandshakeConfig orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelHandshakeConfig ret_var = ChannelHandshakeConfig_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int32_t ChannelHandshakeConfig_1get_1minimum_1depth(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ChannelHandshakeConfig_get_minimum_depth(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeConfig_1set_1minimum_1depth(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeConfig_set_minimum_depth(&this_ptr_conv, val);
}

int16_t ChannelHandshakeConfig_1get_1our_1to_1self_1delay(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelHandshakeConfig_get_our_to_self_delay(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeConfig_1set_1our_1to_1self_1delay(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeConfig_set_our_to_self_delay(&this_ptr_conv, val);
}

int64_t ChannelHandshakeConfig_1get_1our_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeConfig_get_our_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeConfig_1set_1our_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeConfig_set_our_htlc_minimum_msat(&this_ptr_conv, val);
}

uint32_t ChannelHandshakeConfig_1new(void* ctx_TODO, int32_t minimum_depth_arg, int16_t our_to_self_delay_arg, int64_t our_htlc_minimum_msat_arg) {
	LDKChannelHandshakeConfig ret_var = ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t ChannelHandshakeConfig_1default(void* ctx_TODO) {
	LDKChannelHandshakeConfig ret_var = ChannelHandshakeConfig_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelHandshakeLimits_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_free(this_ptr_conv);
}

uint32_t ChannelHandshakeLimits_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelHandshakeLimits orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelHandshakeLimits ret_var = ChannelHandshakeLimits_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int64_t ChannelHandshakeLimits_1get_1min_1funding_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_min_funding_satoshis(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeLimits_1set_1min_1funding_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_funding_satoshis(&this_ptr_conv, val);
}

int64_t ChannelHandshakeLimits_1get_1max_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_max_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeLimits_1set_1max_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_htlc_minimum_msat(&this_ptr_conv, val);
}

int64_t ChannelHandshakeLimits_1get_1min_1max_1htlc_1value_1in_1flight_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeLimits_1set_1min_1max_1htlc_1value_1in_1flight_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

int64_t ChannelHandshakeLimits_1get_1max_1channel_1reserve_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_max_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeLimits_1set_1max_1channel_1reserve_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_channel_reserve_satoshis(&this_ptr_conv, val);
}

int16_t ChannelHandshakeLimits_1get_1min_1max_1accepted_1htlcs(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelHandshakeLimits_get_min_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeLimits_1set_1min_1max_1accepted_1htlcs(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_max_accepted_htlcs(&this_ptr_conv, val);
}

int64_t ChannelHandshakeLimits_1get_1min_1dust_1limit_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_min_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeLimits_1set_1min_1dust_1limit_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_dust_limit_satoshis(&this_ptr_conv, val);
}

int64_t ChannelHandshakeLimits_1get_1max_1dust_1limit_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_max_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeLimits_1set_1max_1dust_1limit_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_dust_limit_satoshis(&this_ptr_conv, val);
}

int32_t ChannelHandshakeLimits_1get_1max_1minimum_1depth(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ChannelHandshakeLimits_get_max_minimum_depth(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeLimits_1set_1max_1minimum_1depth(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_minimum_depth(&this_ptr_conv, val);
}

jboolean ChannelHandshakeLimits_1get_1force_1announced_1channel_1preference(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelHandshakeLimits_get_force_announced_channel_preference(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeLimits_1set_1force_1announced_1channel_1preference(void* ctx_TODO, uint32_t this_ptr, jboolean val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_force_announced_channel_preference(&this_ptr_conv, val);
}

int16_t ChannelHandshakeLimits_1get_1their_1to_1self_1delay(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelHandshakeLimits_get_their_to_self_delay(&this_ptr_conv);
	return ret_val;
}

void ChannelHandshakeLimits_1set_1their_1to_1self_1delay(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_their_to_self_delay(&this_ptr_conv, val);
}

uint32_t ChannelHandshakeLimits_1new(void* ctx_TODO, int64_t min_funding_satoshis_arg, int64_t max_htlc_minimum_msat_arg, int64_t min_max_htlc_value_in_flight_msat_arg, int64_t max_channel_reserve_satoshis_arg, int16_t min_max_accepted_htlcs_arg, int64_t min_dust_limit_satoshis_arg, int64_t max_dust_limit_satoshis_arg, int32_t max_minimum_depth_arg, jboolean force_announced_channel_preference_arg, int16_t their_to_self_delay_arg) {
	LDKChannelHandshakeLimits ret_var = ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, min_dust_limit_satoshis_arg, max_dust_limit_satoshis_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t ChannelHandshakeLimits_1default(void* ctx_TODO) {
	LDKChannelHandshakeLimits ret_var = ChannelHandshakeLimits_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelConfig_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelConfig_free(this_ptr_conv);
}

uint32_t ChannelConfig_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelConfig orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelConfig ret_var = ChannelConfig_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int32_t ChannelConfig_1get_1fee_1proportional_1millionths(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ChannelConfig_get_fee_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

void ChannelConfig_1set_1fee_1proportional_1millionths(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelConfig_set_fee_proportional_millionths(&this_ptr_conv, val);
}

jboolean ChannelConfig_1get_1announced_1channel(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelConfig_get_announced_channel(&this_ptr_conv);
	return ret_val;
}

void ChannelConfig_1set_1announced_1channel(void* ctx_TODO, uint32_t this_ptr, jboolean val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelConfig_set_announced_channel(&this_ptr_conv, val);
}

jboolean ChannelConfig_1get_1commit_1upfront_1shutdown_1pubkey(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelConfig_get_commit_upfront_shutdown_pubkey(&this_ptr_conv);
	return ret_val;
}

void ChannelConfig_1set_1commit_1upfront_1shutdown_1pubkey(void* ctx_TODO, uint32_t this_ptr, jboolean val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelConfig_set_commit_upfront_shutdown_pubkey(&this_ptr_conv, val);
}

uint32_t ChannelConfig_1new(void* ctx_TODO, int32_t fee_proportional_millionths_arg, jboolean announced_channel_arg, jboolean commit_upfront_shutdown_pubkey_arg) {
	LDKChannelConfig ret_var = ChannelConfig_new(fee_proportional_millionths_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t ChannelConfig_1default(void* ctx_TODO) {
	LDKChannelConfig ret_var = ChannelConfig_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ChannelConfig_1write(void* ctx_TODO, uint32_t obj) {
	LDKChannelConfig obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelConfig_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ChannelConfig_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKChannelConfig ret_var = ChannelConfig_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UserConfig_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UserConfig_free(this_ptr_conv);
}

uint32_t UserConfig_1clone(void* ctx_TODO, uint32_t orig) {
	LDKUserConfig orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUserConfig ret_var = UserConfig_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t UserConfig_1get_1own_1channel_1config(void* ctx_TODO, uint32_t this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelHandshakeConfig ret_var = UserConfig_get_own_channel_config(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UserConfig_1set_1own_1channel_1config(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelHandshakeConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelHandshakeConfig_clone(&val_conv);
	UserConfig_set_own_channel_config(&this_ptr_conv, val_conv);
}

uint32_t UserConfig_1get_1peer_1channel_1config_1limits(void* ctx_TODO, uint32_t this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelHandshakeLimits ret_var = UserConfig_get_peer_channel_config_limits(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UserConfig_1set_1peer_1channel_1config_1limits(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelHandshakeLimits val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelHandshakeLimits_clone(&val_conv);
	UserConfig_set_peer_channel_config_limits(&this_ptr_conv, val_conv);
}

uint32_t UserConfig_1get_1channel_1options(void* ctx_TODO, uint32_t this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelConfig ret_var = UserConfig_get_channel_options(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UserConfig_1set_1channel_1options(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelConfig_clone(&val_conv);
	UserConfig_set_channel_options(&this_ptr_conv, val_conv);
}

uint32_t UserConfig_1new(void* ctx_TODO, uint32_t own_channel_config_arg, uint32_t peer_channel_config_limits_arg, uint32_t channel_options_arg) {
	LDKChannelHandshakeConfig own_channel_config_arg_conv;
	own_channel_config_arg_conv.inner = (void*)(own_channel_config_arg & (~1));
	own_channel_config_arg_conv.is_owned = (own_channel_config_arg & 1) || (own_channel_config_arg == 0);
	if (own_channel_config_arg_conv.inner != NULL)
		own_channel_config_arg_conv = ChannelHandshakeConfig_clone(&own_channel_config_arg_conv);
	LDKChannelHandshakeLimits peer_channel_config_limits_arg_conv;
	peer_channel_config_limits_arg_conv.inner = (void*)(peer_channel_config_limits_arg & (~1));
	peer_channel_config_limits_arg_conv.is_owned = (peer_channel_config_limits_arg & 1) || (peer_channel_config_limits_arg == 0);
	if (peer_channel_config_limits_arg_conv.inner != NULL)
		peer_channel_config_limits_arg_conv = ChannelHandshakeLimits_clone(&peer_channel_config_limits_arg_conv);
	LDKChannelConfig channel_options_arg_conv;
	channel_options_arg_conv.inner = (void*)(channel_options_arg & (~1));
	channel_options_arg_conv.is_owned = (channel_options_arg & 1) || (channel_options_arg == 0);
	if (channel_options_arg_conv.inner != NULL)
		channel_options_arg_conv = ChannelConfig_clone(&channel_options_arg_conv);
	LDKUserConfig ret_var = UserConfig_new(own_channel_config_arg_conv, peer_channel_config_limits_arg_conv, channel_options_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t UserConfig_1default(void* ctx_TODO) {
	LDKUserConfig ret_var = UserConfig_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t AccessError_1clone(void* ctx_TODO, uint32_t orig) {
	LDKAccessError* orig_conv = (LDKAccessError*)orig;
	uint32_t ret_conv = LDKAccessError_to_js(AccessError_clone(orig_conv));
	return ret_conv;
}

void Access_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKAccess this_ptr_conv = *(LDKAccess*)this_ptr;
	FREE((void*)this_ptr);
	Access_free(this_ptr_conv);
}

void Watch_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKWatch this_ptr_conv = *(LDKWatch*)this_ptr;
	FREE((void*)this_ptr);
	Watch_free(this_ptr_conv);
}

void Filter_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKFilter this_ptr_conv = *(LDKFilter*)this_ptr;
	FREE((void*)this_ptr);
	Filter_free(this_ptr_conv);
}

void BroadcasterInterface_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKBroadcasterInterface this_ptr_conv = *(LDKBroadcasterInterface*)this_ptr;
	FREE((void*)this_ptr);
	BroadcasterInterface_free(this_ptr_conv);
}

uint32_t ConfirmationTarget_1clone(void* ctx_TODO, uint32_t orig) {
	LDKConfirmationTarget* orig_conv = (LDKConfirmationTarget*)orig;
	uint32_t ret_conv = LDKConfirmationTarget_to_js(ConfirmationTarget_clone(orig_conv));
	return ret_conv;
}

void FeeEstimator_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKFeeEstimator this_ptr_conv = *(LDKFeeEstimator*)this_ptr;
	FREE((void*)this_ptr);
	FeeEstimator_free(this_ptr_conv);
}

void ChainMonitor_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChainMonitor this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChainMonitor_free(this_ptr_conv);
}

void ChainMonitor_1block_1connected(void* ctx_TODO, uint32_t this_arg, int8_tArray header, uint32_tArray txdata, int32_t height) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*header.len == 80);
	memcpy(header_arr, header.len + 1, 80);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = *txdata.len;
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	uint32_t* txdata_vals = (uint32_t*)(txdata.len + 1);
	for (size_t e = 0; e < txdata_constr.datalen; e++) {
		uint32_t arr_conv_30 = txdata_vals[e];
		LDKC2Tuple_usizeTransactionZ arr_conv_30_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_30;
		FREE((void*)arr_conv_30);
		txdata_constr.data[e] = arr_conv_30_conv;
	}
	ChainMonitor_block_connected(&this_arg_conv, header_ref, txdata_constr, height);
}

void ChainMonitor_1block_1disconnected(void* ctx_TODO, uint32_t this_arg, int8_tArray header, int32_t disconnected_height) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*header.len == 80);
	memcpy(header_arr, header.len + 1, 80);
	unsigned char (*header_ref)[80] = &header_arr;
	ChainMonitor_block_disconnected(&this_arg_conv, header_ref, disconnected_height);
}

uint32_t ChainMonitor_1new(void* ctx_TODO, uint32_t chain_source, uint32_t broadcaster, uint32_t logger, uint32_t feeest, uint32_t persister) {
	LDKFilter* chain_source_conv = (LDKFilter*)chain_source;
	LDKBroadcasterInterface broadcaster_conv = *(LDKBroadcasterInterface*)broadcaster;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKFeeEstimator feeest_conv = *(LDKFeeEstimator*)feeest;
	LDKPersist persister_conv = *(LDKPersist*)persister;
	LDKChainMonitor ret_var = ChainMonitor_new(chain_source_conv, broadcaster_conv, logger_conv, feeest_conv, persister_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t ChainMonitor_1as_1Watch(void* ctx_TODO, uint32_t this_arg) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKWatch* ret = MALLOC(sizeof(LDKWatch), "LDKWatch");
	*ret = ChainMonitor_as_Watch(&this_arg_conv);
	return (long)ret;
}

uint32_t ChainMonitor_1as_1EventsProvider(void* ctx_TODO, uint32_t this_arg) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKEventsProvider* ret = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*ret = ChainMonitor_as_EventsProvider(&this_arg_conv);
	return (long)ret;
}

void ChannelMonitorUpdate_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelMonitorUpdate_free(this_ptr_conv);
}

uint32_t ChannelMonitorUpdate_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelMonitorUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelMonitorUpdate ret_var = ChannelMonitorUpdate_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int64_t ChannelMonitorUpdate_1get_1update_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelMonitorUpdate_get_update_id(&this_ptr_conv);
	return ret_val;
}

void ChannelMonitorUpdate_1set_1update_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelMonitorUpdate_set_update_id(&this_ptr_conv, val);
}

int8_tArray ChannelMonitorUpdate_1write(void* ctx_TODO, uint32_t obj) {
	LDKChannelMonitorUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelMonitorUpdate_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ChannelMonitorUpdate_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelMonitorUpdateDecodeErrorZ), "LDKCResult_ChannelMonitorUpdateDecodeErrorZ");
	*ret_conv = ChannelMonitorUpdate_read(ser_ref);
	return (long)ret_conv;
}

uint32_t ChannelMonitorUpdateErr_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelMonitorUpdateErr* orig_conv = (LDKChannelMonitorUpdateErr*)orig;
	uint32_t ret_conv = LDKChannelMonitorUpdateErr_to_js(ChannelMonitorUpdateErr_clone(orig_conv));
	return ret_conv;
}

void MonitorUpdateError_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKMonitorUpdateError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MonitorUpdateError_free(this_ptr_conv);
}

void MonitorEvent_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKMonitorEvent this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MonitorEvent_free(this_ptr_conv);
}

uint32_t MonitorEvent_1clone(void* ctx_TODO, uint32_t orig) {
	LDKMonitorEvent orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKMonitorEvent ret_var = MonitorEvent_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void HTLCUpdate_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKHTLCUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCUpdate_free(this_ptr_conv);
}

uint32_t HTLCUpdate_1clone(void* ctx_TODO, uint32_t orig) {
	LDKHTLCUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKHTLCUpdate ret_var = HTLCUpdate_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray HTLCUpdate_1write(void* ctx_TODO, uint32_t obj) {
	LDKHTLCUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = HTLCUpdate_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t HTLCUpdate_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKHTLCUpdate ret_var = HTLCUpdate_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelMonitor_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelMonitor this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelMonitor_free(this_ptr_conv);
}

int8_tArray ChannelMonitor_1write(void* ctx_TODO, uint32_t obj) {
	LDKChannelMonitor obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelMonitor_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ChannelMonitor_1update_1monitor(void* ctx_TODO, uint32_t this_arg, uint32_t updates, uint32_t broadcaster, uint32_t fee_estimator, uint32_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelMonitorUpdate updates_conv;
	updates_conv.inner = (void*)(updates & (~1));
	updates_conv.is_owned = false;
	LDKBroadcasterInterface* broadcaster_conv = (LDKBroadcasterInterface*)broadcaster;
	LDKFeeEstimator* fee_estimator_conv = (LDKFeeEstimator*)fee_estimator;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCResult_NoneMonitorUpdateErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret_conv = ChannelMonitor_update_monitor(&this_arg_conv, &updates_conv, broadcaster_conv, fee_estimator_conv, logger_conv);
	return (long)ret_conv;
}

int64_t ChannelMonitor_1get_1latest_1update_1id(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = ChannelMonitor_get_latest_update_id(&this_arg_conv);
	return ret_val;
}

uint32_t ChannelMonitor_1get_1funding_1txo(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKC2Tuple_OutPointScriptZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	*ret_ref = ChannelMonitor_get_funding_txo(&this_arg_conv);
	ret_ref->a = OutPoint_clone(&ret_ref->a);
	ret_ref->b = CVec_u8Z_clone(&ret_ref->b);
	return (long)ret_ref;
}

uint32_tArray ChannelMonitor_1get_1and_1clear_1pending_1monitor_1events(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_MonitorEventZ ret_var = ChannelMonitor_get_and_clear_pending_monitor_events(&this_arg_conv);
	uint32_tArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr.len + 1);
	for (size_t o = 0; o < ret_var.datalen; o++) {
		LDKMonitorEvent arr_conv_14_var = ret_var.data[o];
		CHECK((((long)arr_conv_14_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_14_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_14_ref = (long)arr_conv_14_var.inner;
		if (arr_conv_14_var.is_owned) {
			arr_conv_14_ref |= 1;
		}
		ret_arr_ptr[o] = arr_conv_14_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

uint32_tArray ChannelMonitor_1get_1and_1clear_1pending_1events(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_EventZ ret_var = ChannelMonitor_get_and_clear_pending_events(&this_arg_conv);
	uint32_tArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr.len + 1);
	for (size_t h = 0; h < ret_var.datalen; h++) {
		LDKEvent *arr_conv_7_copy = MALLOC(sizeof(LDKEvent), "LDKEvent");
		*arr_conv_7_copy = Event_clone(&ret_var.data[h]);
		long arr_conv_7_ref = (long)arr_conv_7_copy;
		ret_arr_ptr[h] = arr_conv_7_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

ptrArray ChannelMonitor_1get_1latest_1holder_1commitment_1txn(void* ctx_TODO, uint32_t this_arg, uint32_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCVec_TransactionZ ret_var = ChannelMonitor_get_latest_holder_commitment_txn(&this_arg_conv, logger_conv);
	ptrArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native Object Bytes") };
	int8_tArray *ret_arr_ptr = (int8_tArray*)(ret_arr.len + 1);
	for (size_t m = 0; m < ret_var.datalen; m++) {
		LDKTransaction arr_conv_12_var = ret_var.data[m];
		int8_tArray arr_conv_12_arr = { .len = MALLOC(arr_conv_12_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
		memcpy(arr_conv_12_arr.len + 1, arr_conv_12_var.data, arr_conv_12_var.datalen);
		Transaction_free(arr_conv_12_var);
		ret_arr_ptr[m] = arr_conv_12_arr;
	}
	FREE(ret_var.data);
	return ret_arr;
}

uint32_tArray ChannelMonitor_1block_1connected(void* ctx_TODO, uint32_t this_arg, int8_tArray header, uint32_tArray txdata, int32_t height, uint32_t broadcaster, uint32_t fee_estimator, uint32_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*header.len == 80);
	memcpy(header_arr, header.len + 1, 80);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = *txdata.len;
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	uint32_t* txdata_vals = (uint32_t*)(txdata.len + 1);
	for (size_t e = 0; e < txdata_constr.datalen; e++) {
		uint32_t arr_conv_30 = txdata_vals[e];
		LDKC2Tuple_usizeTransactionZ arr_conv_30_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_30;
		FREE((void*)arr_conv_30);
		txdata_constr.data[e] = arr_conv_30_conv;
	}
	LDKBroadcasterInterface broadcaster_conv = *(LDKBroadcasterInterface*)broadcaster;
	LDKFeeEstimator fee_estimator_conv = *(LDKFeeEstimator*)fee_estimator;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ ret_var = ChannelMonitor_block_connected(&this_arg_conv, header_ref, txdata_constr, height, broadcaster_conv, fee_estimator_conv, logger_conv);
	uint32_tArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr.len + 1);
	for (size_t x = 0; x < ret_var.datalen; x++) {
		LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ* arr_conv_49_ref = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ");
		*arr_conv_49_ref = ret_var.data[x];
		arr_conv_49_ref->a = ThirtyTwoBytes_clone(&arr_conv_49_ref->a);
		// XXX: We likely need to clone here, but no _clone fn is available for TwoTuple<Number, TxOut>[]
		ret_arr_ptr[x] = (long)arr_conv_49_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

void ChannelMonitor_1block_1disconnected(void* ctx_TODO, uint32_t this_arg, int8_tArray header, int32_t height, uint32_t broadcaster, uint32_t fee_estimator, uint32_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*header.len == 80);
	memcpy(header_arr, header.len + 1, 80);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKBroadcasterInterface broadcaster_conv = *(LDKBroadcasterInterface*)broadcaster;
	LDKFeeEstimator fee_estimator_conv = *(LDKFeeEstimator*)fee_estimator;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	ChannelMonitor_block_disconnected(&this_arg_conv, header_ref, height, broadcaster_conv, fee_estimator_conv, logger_conv);
}

void Persist_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKPersist this_ptr_conv = *(LDKPersist*)this_ptr;
	FREE((void*)this_ptr);
	Persist_free(this_ptr_conv);
}

uint32_t C2Tuple_1BlockHashChannelMonitorZ_1read(void* ctx_TODO, int8_tArray ser, uint32_t arg) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKKeysInterface* arg_conv = (LDKKeysInterface*)arg;
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ");
	*ret_conv = C2Tuple_BlockHashChannelMonitorZ_read(ser_ref, arg_conv);
	return (long)ret_conv;
}

void OutPoint_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OutPoint_free(this_ptr_conv);
}

uint32_t OutPoint_1clone(void* ctx_TODO, uint32_t orig) {
	LDKOutPoint orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKOutPoint ret_var = OutPoint_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray OutPoint_1get_1txid(void* ctx_TODO, uint32_t this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *OutPoint_get_txid(&this_ptr_conv), 32);
	return ret_arr;
}

void OutPoint_1set_1txid(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	OutPoint_set_txid(&this_ptr_conv, val_ref);
}

int16_t OutPoint_1get_1index(void* ctx_TODO, uint32_t this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = OutPoint_get_index(&this_ptr_conv);
	return ret_val;
}

void OutPoint_1set_1index(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OutPoint_set_index(&this_ptr_conv, val);
}

uint32_t OutPoint_1new(void* ctx_TODO, int8_tArray txid_arg, int16_t index_arg) {
	LDKThirtyTwoBytes txid_arg_ref;
	CHECK(*txid_arg.len == 32);
	memcpy(txid_arg_ref.data, txid_arg.len + 1, 32);
	LDKOutPoint ret_var = OutPoint_new(txid_arg_ref, index_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray OutPoint_1to_1channel_1id(void* ctx_TODO, uint32_t this_arg) {
	LDKOutPoint this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, OutPoint_to_channel_id(&this_arg_conv).data, 32);
	return arg_arr;
}

int8_tArray OutPoint_1write(void* ctx_TODO, uint32_t obj) {
	LDKOutPoint obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = OutPoint_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t OutPoint_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKOutPoint ret_var = OutPoint_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void SpendableOutputDescriptor_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKSpendableOutputDescriptor this_ptr_conv = *(LDKSpendableOutputDescriptor*)this_ptr;
	FREE((void*)this_ptr);
	SpendableOutputDescriptor_free(this_ptr_conv);
}

uint32_t SpendableOutputDescriptor_1clone(void* ctx_TODO, uint32_t orig) {
	LDKSpendableOutputDescriptor* orig_conv = (LDKSpendableOutputDescriptor*)orig;
	LDKSpendableOutputDescriptor *ret_copy = MALLOC(sizeof(LDKSpendableOutputDescriptor), "LDKSpendableOutputDescriptor");
	*ret_copy = SpendableOutputDescriptor_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

int8_tArray SpendableOutputDescriptor_1write(void* ctx_TODO, uint32_t obj) {
	LDKSpendableOutputDescriptor* obj_conv = (LDKSpendableOutputDescriptor*)obj;
	LDKCVec_u8Z arg_var = SpendableOutputDescriptor_write(obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t SpendableOutputDescriptor_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SpendableOutputDescriptorDecodeErrorZ), "LDKCResult_SpendableOutputDescriptorDecodeErrorZ");
	*ret_conv = SpendableOutputDescriptor_read(ser_ref);
	return (long)ret_conv;
}

uint32_t ChannelKeys_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelKeys* orig_conv = (LDKChannelKeys*)orig;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = ChannelKeys_clone(orig_conv);
	return (long)ret;
}

void ChannelKeys_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelKeys this_ptr_conv = *(LDKChannelKeys*)this_ptr;
	FREE((void*)this_ptr);
	ChannelKeys_free(this_ptr_conv);
}

void KeysInterface_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKKeysInterface this_ptr_conv = *(LDKKeysInterface*)this_ptr;
	FREE((void*)this_ptr);
	KeysInterface_free(this_ptr_conv);
}

void InMemoryChannelKeys_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	InMemoryChannelKeys_free(this_ptr_conv);
}

uint32_t InMemoryChannelKeys_1clone(void* ctx_TODO, uint32_t orig) {
	LDKInMemoryChannelKeys orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKInMemoryChannelKeys ret_var = InMemoryChannelKeys_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray InMemoryChannelKeys_1get_1funding_1key(void* ctx_TODO, uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *InMemoryChannelKeys_get_funding_key(&this_ptr_conv), 32);
	return ret_arr;
}

void InMemoryChannelKeys_1set_1funding_1key(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.bytes, val.len + 1, 32);
	InMemoryChannelKeys_set_funding_key(&this_ptr_conv, val_ref);
}

int8_tArray InMemoryChannelKeys_1get_1revocation_1base_1key(void* ctx_TODO, uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *InMemoryChannelKeys_get_revocation_base_key(&this_ptr_conv), 32);
	return ret_arr;
}

void InMemoryChannelKeys_1set_1revocation_1base_1key(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.bytes, val.len + 1, 32);
	InMemoryChannelKeys_set_revocation_base_key(&this_ptr_conv, val_ref);
}

int8_tArray InMemoryChannelKeys_1get_1payment_1key(void* ctx_TODO, uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *InMemoryChannelKeys_get_payment_key(&this_ptr_conv), 32);
	return ret_arr;
}

void InMemoryChannelKeys_1set_1payment_1key(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.bytes, val.len + 1, 32);
	InMemoryChannelKeys_set_payment_key(&this_ptr_conv, val_ref);
}

int8_tArray InMemoryChannelKeys_1get_1delayed_1payment_1base_1key(void* ctx_TODO, uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *InMemoryChannelKeys_get_delayed_payment_base_key(&this_ptr_conv), 32);
	return ret_arr;
}

void InMemoryChannelKeys_1set_1delayed_1payment_1base_1key(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.bytes, val.len + 1, 32);
	InMemoryChannelKeys_set_delayed_payment_base_key(&this_ptr_conv, val_ref);
}

int8_tArray InMemoryChannelKeys_1get_1htlc_1base_1key(void* ctx_TODO, uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *InMemoryChannelKeys_get_htlc_base_key(&this_ptr_conv), 32);
	return ret_arr;
}

void InMemoryChannelKeys_1set_1htlc_1base_1key(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.bytes, val.len + 1, 32);
	InMemoryChannelKeys_set_htlc_base_key(&this_ptr_conv, val_ref);
}

int8_tArray InMemoryChannelKeys_1get_1commitment_1seed(void* ctx_TODO, uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *InMemoryChannelKeys_get_commitment_seed(&this_ptr_conv), 32);
	return ret_arr;
}

void InMemoryChannelKeys_1set_1commitment_1seed(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	InMemoryChannelKeys_set_commitment_seed(&this_ptr_conv, val_ref);
}

uint32_t InMemoryChannelKeys_1new(void* ctx_TODO, int8_tArray funding_key, int8_tArray revocation_base_key, int8_tArray payment_key, int8_tArray delayed_payment_base_key, int8_tArray htlc_base_key, int8_tArray commitment_seed, int64_t channel_value_satoshis, uint32_t key_derivation_params) {
	LDKSecretKey funding_key_ref;
	CHECK(*funding_key.len == 32);
	memcpy(funding_key_ref.bytes, funding_key.len + 1, 32);
	LDKSecretKey revocation_base_key_ref;
	CHECK(*revocation_base_key.len == 32);
	memcpy(revocation_base_key_ref.bytes, revocation_base_key.len + 1, 32);
	LDKSecretKey payment_key_ref;
	CHECK(*payment_key.len == 32);
	memcpy(payment_key_ref.bytes, payment_key.len + 1, 32);
	LDKSecretKey delayed_payment_base_key_ref;
	CHECK(*delayed_payment_base_key.len == 32);
	memcpy(delayed_payment_base_key_ref.bytes, delayed_payment_base_key.len + 1, 32);
	LDKSecretKey htlc_base_key_ref;
	CHECK(*htlc_base_key.len == 32);
	memcpy(htlc_base_key_ref.bytes, htlc_base_key.len + 1, 32);
	LDKThirtyTwoBytes commitment_seed_ref;
	CHECK(*commitment_seed.len == 32);
	memcpy(commitment_seed_ref.data, commitment_seed.len + 1, 32);
	LDKC2Tuple_u64u64Z key_derivation_params_conv = *(LDKC2Tuple_u64u64Z*)key_derivation_params;
	FREE((void*)key_derivation_params);
	LDKInMemoryChannelKeys ret_var = InMemoryChannelKeys_new(funding_key_ref, revocation_base_key_ref, payment_key_ref, delayed_payment_base_key_ref, htlc_base_key_ref, commitment_seed_ref, channel_value_satoshis, key_derivation_params_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t InMemoryChannelKeys_1counterparty_1pubkeys(void* ctx_TODO, uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = InMemoryChannelKeys_counterparty_pubkeys(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int16_t InMemoryChannelKeys_1counterparty_1selected_1contest_1delay(void* ctx_TODO, uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int16_t ret_val = InMemoryChannelKeys_counterparty_selected_contest_delay(&this_arg_conv);
	return ret_val;
}

int16_t InMemoryChannelKeys_1holder_1selected_1contest_1delay(void* ctx_TODO, uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int16_t ret_val = InMemoryChannelKeys_holder_selected_contest_delay(&this_arg_conv);
	return ret_val;
}

jboolean InMemoryChannelKeys_1is_1outbound(void* ctx_TODO, uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	jboolean ret_val = InMemoryChannelKeys_is_outbound(&this_arg_conv);
	return ret_val;
}

uint32_t InMemoryChannelKeys_1funding_1outpoint(void* ctx_TODO, uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKOutPoint ret_var = InMemoryChannelKeys_funding_outpoint(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t InMemoryChannelKeys_1get_1channel_1parameters(void* ctx_TODO, uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelTransactionParameters ret_var = InMemoryChannelKeys_get_channel_parameters(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t InMemoryChannelKeys_1as_1ChannelKeys(void* ctx_TODO, uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = InMemoryChannelKeys_as_ChannelKeys(&this_arg_conv);
	return (long)ret;
}

int8_tArray InMemoryChannelKeys_1write(void* ctx_TODO, uint32_t obj) {
	LDKInMemoryChannelKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = InMemoryChannelKeys_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t InMemoryChannelKeys_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_InMemoryChannelKeysDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InMemoryChannelKeysDecodeErrorZ), "LDKCResult_InMemoryChannelKeysDecodeErrorZ");
	*ret_conv = InMemoryChannelKeys_read(ser_ref);
	return (long)ret_conv;
}

void KeysManager_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKKeysManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	KeysManager_free(this_ptr_conv);
}

uint32_t KeysManager_1new(void* ctx_TODO, int8_tArray seed, uint32_t network, int64_t starting_time_secs, int32_t starting_time_nanos) {
	unsigned char seed_arr[32];
	CHECK(*seed.len == 32);
	memcpy(seed_arr, seed.len + 1, 32);
	unsigned char (*seed_ref)[32] = &seed_arr;
	LDKNetwork network_conv = LDKNetwork_from_js(network);
	LDKKeysManager ret_var = KeysManager_new(seed_ref, network_conv, starting_time_secs, starting_time_nanos);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t KeysManager_1derive_1channel_1keys(void* ctx_TODO, uint32_t this_arg, int64_t channel_value_satoshis, int64_t params_1, int64_t params_2) {
	LDKKeysManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKInMemoryChannelKeys ret_var = KeysManager_derive_channel_keys(&this_arg_conv, channel_value_satoshis, params_1, params_2);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t KeysManager_1as_1KeysInterface(void* ctx_TODO, uint32_t this_arg) {
	LDKKeysManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKKeysInterface* ret = MALLOC(sizeof(LDKKeysInterface), "LDKKeysInterface");
	*ret = KeysManager_as_KeysInterface(&this_arg_conv);
	return (long)ret;
}

void ChannelManager_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelManager_free(this_ptr_conv);
}

void ChannelDetails_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelDetails_free(this_ptr_conv);
}

uint32_t ChannelDetails_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelDetails orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelDetails ret_var = ChannelDetails_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ChannelDetails_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *ChannelDetails_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void ChannelDetails_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	ChannelDetails_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray ChannelDetails_1get_1remote_1network_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelDetails_get_remote_network_id(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void ChannelDetails_1set_1remote_1network_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	ChannelDetails_set_remote_network_id(&this_ptr_conv, val_ref);
}

uint32_t ChannelDetails_1get_1counterparty_1features(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKInitFeatures ret_var = ChannelDetails_get_counterparty_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelDetails_1set_1counterparty_1features(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKInitFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelDetails_set_counterparty_features(&this_ptr_conv, val_conv);
}

int64_t ChannelDetails_1get_1channel_1value_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_channel_value_satoshis(&this_ptr_conv);
	return ret_val;
}

void ChannelDetails_1set_1channel_1value_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_channel_value_satoshis(&this_ptr_conv, val);
}

int64_t ChannelDetails_1get_1user_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_user_id(&this_ptr_conv);
	return ret_val;
}

void ChannelDetails_1set_1user_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_user_id(&this_ptr_conv, val);
}

int64_t ChannelDetails_1get_1outbound_1capacity_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_outbound_capacity_msat(&this_ptr_conv);
	return ret_val;
}

void ChannelDetails_1set_1outbound_1capacity_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_outbound_capacity_msat(&this_ptr_conv, val);
}

int64_t ChannelDetails_1get_1inbound_1capacity_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_inbound_capacity_msat(&this_ptr_conv);
	return ret_val;
}

void ChannelDetails_1set_1inbound_1capacity_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_inbound_capacity_msat(&this_ptr_conv, val);
}

jboolean ChannelDetails_1get_1is_1live(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelDetails_get_is_live(&this_ptr_conv);
	return ret_val;
}

void ChannelDetails_1set_1is_1live(void* ctx_TODO, uint32_t this_ptr, jboolean val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_is_live(&this_ptr_conv, val);
}

void PaymentSendFailure_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKPaymentSendFailure this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PaymentSendFailure_free(this_ptr_conv);
}

uint32_t ChannelManager_1new(void* ctx_TODO, uint32_t network, uint32_t fee_est, uint32_t chain_monitor, uint32_t tx_broadcaster, uint32_t logger, uint32_t keys_manager, uint32_t config, intptr_t current_blockchain_height) {
	LDKNetwork network_conv = LDKNetwork_from_js(network);
	LDKFeeEstimator fee_est_conv = *(LDKFeeEstimator*)fee_est;
	LDKWatch chain_monitor_conv = *(LDKWatch*)chain_monitor;
	LDKBroadcasterInterface tx_broadcaster_conv = *(LDKBroadcasterInterface*)tx_broadcaster;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKKeysInterface keys_manager_conv = *(LDKKeysInterface*)keys_manager;
	LDKUserConfig config_conv;
	config_conv.inner = (void*)(config & (~1));
	config_conv.is_owned = (config & 1) || (config == 0);
	if (config_conv.inner != NULL)
		config_conv = UserConfig_clone(&config_conv);
	LDKChannelManager ret_var = ChannelManager_new(network_conv, fee_est_conv, chain_monitor_conv, tx_broadcaster_conv, logger_conv, keys_manager_conv, config_conv, current_blockchain_height);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t ChannelManager_1create_1channel(void* ctx_TODO, uint32_t this_arg, int8_tArray their_network_key, int64_t channel_value_satoshis, int64_t push_msat, int64_t user_id, uint32_t override_config) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKPublicKey their_network_key_ref;
	CHECK(*their_network_key.len == 33);
	memcpy(their_network_key_ref.compressed_form, their_network_key.len + 1, 33);
	LDKUserConfig override_config_conv;
	override_config_conv.inner = (void*)(override_config & (~1));
	override_config_conv.is_owned = (override_config & 1) || (override_config == 0);
	if (override_config_conv.inner != NULL)
		override_config_conv = UserConfig_clone(&override_config_conv);
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = ChannelManager_create_channel(&this_arg_conv, their_network_key_ref, channel_value_satoshis, push_msat, user_id, override_config_conv);
	return (long)ret_conv;
}

uint32_tArray ChannelManager_1list_1channels(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_ChannelDetailsZ ret_var = ChannelManager_list_channels(&this_arg_conv);
	uint32_tArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr.len + 1);
	for (size_t q = 0; q < ret_var.datalen; q++) {
		LDKChannelDetails arr_conv_16_var = ret_var.data[q];
		CHECK((((long)arr_conv_16_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_16_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_16_ref = (long)arr_conv_16_var.inner;
		if (arr_conv_16_var.is_owned) {
			arr_conv_16_ref |= 1;
		}
		ret_arr_ptr[q] = arr_conv_16_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

uint32_tArray ChannelManager_1list_1usable_1channels(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_ChannelDetailsZ ret_var = ChannelManager_list_usable_channels(&this_arg_conv);
	uint32_tArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native uint32_tArray Bytes") };
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr.len + 1);
	for (size_t q = 0; q < ret_var.datalen; q++) {
		LDKChannelDetails arr_conv_16_var = ret_var.data[q];
		CHECK((((long)arr_conv_16_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_16_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_16_ref = (long)arr_conv_16_var.inner;
		if (arr_conv_16_var.is_owned) {
			arr_conv_16_ref |= 1;
		}
		ret_arr_ptr[q] = arr_conv_16_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

uint32_t ChannelManager_1close_1channel(void* ctx_TODO, uint32_t this_arg, int8_tArray channel_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char channel_id_arr[32];
	CHECK(*channel_id.len == 32);
	memcpy(channel_id_arr, channel_id.len + 1, 32);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = ChannelManager_close_channel(&this_arg_conv, channel_id_ref);
	return (long)ret_conv;
}

void ChannelManager_1force_1close_1channel(void* ctx_TODO, uint32_t this_arg, int8_tArray channel_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char channel_id_arr[32];
	CHECK(*channel_id.len == 32);
	memcpy(channel_id_arr, channel_id.len + 1, 32);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	ChannelManager_force_close_channel(&this_arg_conv, channel_id_ref);
}

void ChannelManager_1force_1close_1all_1channels(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	ChannelManager_force_close_all_channels(&this_arg_conv);
}

uint32_t ChannelManager_1send_1payment(void* ctx_TODO, uint32_t this_arg, uint32_t route, int8_tArray payment_hash, int8_tArray payment_secret) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKRoute route_conv;
	route_conv.inner = (void*)(route & (~1));
	route_conv.is_owned = false;
	LDKThirtyTwoBytes payment_hash_ref;
	CHECK(*payment_hash.len == 32);
	memcpy(payment_hash_ref.data, payment_hash.len + 1, 32);
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK(*payment_secret.len == 32);
	memcpy(payment_secret_ref.data, payment_secret.len + 1, 32);
	LDKCResult_NonePaymentSendFailureZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret_conv = ChannelManager_send_payment(&this_arg_conv, &route_conv, payment_hash_ref, payment_secret_ref);
	return (long)ret_conv;
}

void ChannelManager_1funding_1transaction_1generated(void* ctx_TODO, uint32_t this_arg, int8_tArray temporary_channel_id, uint32_t funding_txo) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char temporary_channel_id_arr[32];
	CHECK(*temporary_channel_id.len == 32);
	memcpy(temporary_channel_id_arr, temporary_channel_id.len + 1, 32);
	unsigned char (*temporary_channel_id_ref)[32] = &temporary_channel_id_arr;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	if (funding_txo_conv.inner != NULL)
		funding_txo_conv = OutPoint_clone(&funding_txo_conv);
	ChannelManager_funding_transaction_generated(&this_arg_conv, temporary_channel_id_ref, funding_txo_conv);
}

void ChannelManager_1broadcast_1node_1announcement(void* ctx_TODO, uint32_t this_arg, int8_tArray rgb, int8_tArray alias, uint32_tArray addresses) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKThreeBytes rgb_ref;
	CHECK(*rgb.len == 3);
	memcpy(rgb_ref.data, rgb.len + 1, 3);
	LDKThirtyTwoBytes alias_ref;
	CHECK(*alias.len == 32);
	memcpy(alias_ref.data, alias.len + 1, 32);
	LDKCVec_NetAddressZ addresses_constr;
	addresses_constr.datalen = *addresses.len;
	if (addresses_constr.datalen > 0)
		addresses_constr.data = MALLOC(addresses_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		addresses_constr.data = NULL;
	uint32_t* addresses_vals = (uint32_t*)(addresses.len + 1);
	for (size_t m = 0; m < addresses_constr.datalen; m++) {
		uint32_t arr_conv_12 = addresses_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		addresses_constr.data[m] = arr_conv_12_conv;
	}
	ChannelManager_broadcast_node_announcement(&this_arg_conv, rgb_ref, alias_ref, addresses_constr);
}

void ChannelManager_1process_1pending_1htlc_1forwards(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	ChannelManager_process_pending_htlc_forwards(&this_arg_conv);
}

void ChannelManager_1timer_1chan_1freshness_1every_1min(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	ChannelManager_timer_chan_freshness_every_min(&this_arg_conv);
}

jboolean ChannelManager_1fail_1htlc_1backwards(void* ctx_TODO, uint32_t this_arg, int8_tArray payment_hash, int8_tArray payment_secret) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char payment_hash_arr[32];
	CHECK(*payment_hash.len == 32);
	memcpy(payment_hash_arr, payment_hash.len + 1, 32);
	unsigned char (*payment_hash_ref)[32] = &payment_hash_arr;
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK(*payment_secret.len == 32);
	memcpy(payment_secret_ref.data, payment_secret.len + 1, 32);
	jboolean ret_val = ChannelManager_fail_htlc_backwards(&this_arg_conv, payment_hash_ref, payment_secret_ref);
	return ret_val;
}

jboolean ChannelManager_1claim_1funds(void* ctx_TODO, uint32_t this_arg, int8_tArray payment_preimage, int8_tArray payment_secret, int64_t expected_amount) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKThirtyTwoBytes payment_preimage_ref;
	CHECK(*payment_preimage.len == 32);
	memcpy(payment_preimage_ref.data, payment_preimage.len + 1, 32);
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK(*payment_secret.len == 32);
	memcpy(payment_secret_ref.data, payment_secret.len + 1, 32);
	jboolean ret_val = ChannelManager_claim_funds(&this_arg_conv, payment_preimage_ref, payment_secret_ref, expected_amount);
	return ret_val;
}

int8_tArray ChannelManager_1get_1our_1node_1id(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelManager_get_our_node_id(&this_arg_conv).compressed_form, 33);
	return arg_arr;
}

void ChannelManager_1channel_1monitor_1updated(void* ctx_TODO, uint32_t this_arg, uint32_t funding_txo, int64_t highest_applied_update_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = false;
	ChannelManager_channel_monitor_updated(&this_arg_conv, &funding_txo_conv, highest_applied_update_id);
}

uint32_t ChannelManager_1as_1MessageSendEventsProvider(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKMessageSendEventsProvider* ret = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*ret = ChannelManager_as_MessageSendEventsProvider(&this_arg_conv);
	return (long)ret;
}

uint32_t ChannelManager_1as_1EventsProvider(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKEventsProvider* ret = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*ret = ChannelManager_as_EventsProvider(&this_arg_conv);
	return (long)ret;
}

void ChannelManager_1block_1connected(void* ctx_TODO, uint32_t this_arg, int8_tArray header, uint32_tArray txdata, int32_t height) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*header.len == 80);
	memcpy(header_arr, header.len + 1, 80);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = *txdata.len;
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	uint32_t* txdata_vals = (uint32_t*)(txdata.len + 1);
	for (size_t e = 0; e < txdata_constr.datalen; e++) {
		uint32_t arr_conv_30 = txdata_vals[e];
		LDKC2Tuple_usizeTransactionZ arr_conv_30_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_30;
		FREE((void*)arr_conv_30);
		txdata_constr.data[e] = arr_conv_30_conv;
	}
	ChannelManager_block_connected(&this_arg_conv, header_ref, txdata_constr, height);
}

void ChannelManager_1block_1disconnected(void* ctx_TODO, uint32_t this_arg, int8_tArray header) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*header.len == 80);
	memcpy(header_arr, header.len + 1, 80);
	unsigned char (*header_ref)[80] = &header_arr;
	ChannelManager_block_disconnected(&this_arg_conv, header_ref);
}

uint32_t ChannelManager_1as_1ChannelMessageHandler(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelMessageHandler* ret = MALLOC(sizeof(LDKChannelMessageHandler), "LDKChannelMessageHandler");
	*ret = ChannelManager_as_ChannelMessageHandler(&this_arg_conv);
	return (long)ret;
}

int8_tArray ChannelManager_1write(void* ctx_TODO, uint32_t obj) {
	LDKChannelManager obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelManager_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

void ChannelManagerReadArgs_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelManagerReadArgs_free(this_ptr_conv);
}

uint32_t ChannelManagerReadArgs_1get_1keys_1manager(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_keys_manager(&this_ptr_conv);
	return ret_ret;
}

void ChannelManagerReadArgs_1set_1keys_1manager(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKKeysInterface val_conv = *(LDKKeysInterface*)val;
	ChannelManagerReadArgs_set_keys_manager(&this_ptr_conv, val_conv);
}

uint32_t ChannelManagerReadArgs_1get_1fee_1estimator(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_fee_estimator(&this_ptr_conv);
	return ret_ret;
}

void ChannelManagerReadArgs_1set_1fee_1estimator(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKFeeEstimator val_conv = *(LDKFeeEstimator*)val;
	ChannelManagerReadArgs_set_fee_estimator(&this_ptr_conv, val_conv);
}

uint32_t ChannelManagerReadArgs_1get_1chain_1monitor(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_chain_monitor(&this_ptr_conv);
	return ret_ret;
}

void ChannelManagerReadArgs_1set_1chain_1monitor(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKWatch val_conv = *(LDKWatch*)val;
	ChannelManagerReadArgs_set_chain_monitor(&this_ptr_conv, val_conv);
}

uint32_t ChannelManagerReadArgs_1get_1tx_1broadcaster(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_tx_broadcaster(&this_ptr_conv);
	return ret_ret;
}

void ChannelManagerReadArgs_1set_1tx_1broadcaster(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKBroadcasterInterface val_conv = *(LDKBroadcasterInterface*)val;
	ChannelManagerReadArgs_set_tx_broadcaster(&this_ptr_conv, val_conv);
}

uint32_t ChannelManagerReadArgs_1get_1logger(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_logger(&this_ptr_conv);
	return ret_ret;
}

void ChannelManagerReadArgs_1set_1logger(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKLogger val_conv = *(LDKLogger*)val;
	ChannelManagerReadArgs_set_logger(&this_ptr_conv, val_conv);
}

uint32_t ChannelManagerReadArgs_1get_1default_1config(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUserConfig ret_var = ChannelManagerReadArgs_get_default_config(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelManagerReadArgs_1set_1default_1config(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUserConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UserConfig_clone(&val_conv);
	ChannelManagerReadArgs_set_default_config(&this_ptr_conv, val_conv);
}

uint32_t ChannelManagerReadArgs_1new(void* ctx_TODO, uint32_t keys_manager, uint32_t fee_estimator, uint32_t chain_monitor, uint32_t tx_broadcaster, uint32_t logger, uint32_t default_config, uint32_tArray channel_monitors) {
	LDKKeysInterface keys_manager_conv = *(LDKKeysInterface*)keys_manager;
	LDKFeeEstimator fee_estimator_conv = *(LDKFeeEstimator*)fee_estimator;
	LDKWatch chain_monitor_conv = *(LDKWatch*)chain_monitor;
	LDKBroadcasterInterface tx_broadcaster_conv = *(LDKBroadcasterInterface*)tx_broadcaster;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKUserConfig default_config_conv;
	default_config_conv.inner = (void*)(default_config & (~1));
	default_config_conv.is_owned = (default_config & 1) || (default_config == 0);
	if (default_config_conv.inner != NULL)
		default_config_conv = UserConfig_clone(&default_config_conv);
	LDKCVec_ChannelMonitorZ channel_monitors_constr;
	channel_monitors_constr.datalen = *channel_monitors.len;
	if (channel_monitors_constr.datalen > 0)
		channel_monitors_constr.data = MALLOC(channel_monitors_constr.datalen * sizeof(LDKChannelMonitor), "LDKCVec_ChannelMonitorZ Elements");
	else
		channel_monitors_constr.data = NULL;
	uint32_t* channel_monitors_vals = (uint32_t*)(channel_monitors.len + 1);
	for (size_t q = 0; q < channel_monitors_constr.datalen; q++) {
		uint32_t arr_conv_16 = channel_monitors_vals[q];
		LDKChannelMonitor arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		// Warning: we may need a move here but can't clone!
		channel_monitors_constr.data[q] = arr_conv_16_conv;
	}
	LDKChannelManagerReadArgs ret_var = ChannelManagerReadArgs_new(keys_manager_conv, fee_estimator_conv, chain_monitor_conv, tx_broadcaster_conv, logger_conv, default_config_conv, channel_monitors_constr);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t C2Tuple_1BlockHashChannelManagerZ_1read(void* ctx_TODO, int8_tArray ser, uint32_t arg) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKChannelManagerReadArgs arg_conv;
	arg_conv.inner = (void*)(arg & (~1));
	arg_conv.is_owned = (arg & 1) || (arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ");
	*ret_conv = C2Tuple_BlockHashChannelManagerZ_read(ser_ref, arg_conv);
	return (long)ret_conv;
}

void DecodeError_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKDecodeError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DecodeError_free(this_ptr_conv);
}

void Init_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKInit this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Init_free(this_ptr_conv);
}

uint32_t Init_1clone(void* ctx_TODO, uint32_t orig) {
	LDKInit orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKInit ret_var = Init_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ErrorMessage_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ErrorMessage_free(this_ptr_conv);
}

uint32_t ErrorMessage_1clone(void* ctx_TODO, uint32_t orig) {
	LDKErrorMessage orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKErrorMessage ret_var = ErrorMessage_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ErrorMessage_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *ErrorMessage_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void ErrorMessage_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	ErrorMessage_set_channel_id(&this_ptr_conv, val_ref);
}

jstring ErrorMessage_1get_1data(void* ctx_TODO, uint32_t this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKStr _str = ErrorMessage_get_data(&this_ptr_conv);
	char* _buf = MALLOC(_str.len + 1, "str conv buf");
	memcpy(_buf, _str.chars, _str.len);
	_buf[_str.len] = 0;
	jstring _conv = conv_owned_string(_str.chars);
	FREE(_buf);
	return _conv;
}

void ErrorMessage_1set_1data(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u8Z val_ref;
	val_ref.datalen = *val.len;
	val_ref.data = MALLOC(val_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(val_ref.data, val.len + 1, val_ref.datalen);
	ErrorMessage_set_data(&this_ptr_conv, val_ref);
}

uint32_t ErrorMessage_1new(void* ctx_TODO, int8_tArray channel_id_arg, int8_tArray data_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*channel_id_arg.len == 32);
	memcpy(channel_id_arg_ref.data, channel_id_arg.len + 1, 32);
	LDKCVec_u8Z data_arg_ref;
	data_arg_ref.datalen = *data_arg.len;
	data_arg_ref.data = MALLOC(data_arg_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(data_arg_ref.data, data_arg.len + 1, data_arg_ref.datalen);
	LDKErrorMessage ret_var = ErrorMessage_new(channel_id_arg_ref, data_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void Ping_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Ping_free(this_ptr_conv);
}

uint32_t Ping_1clone(void* ctx_TODO, uint32_t orig) {
	LDKPing orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKPing ret_var = Ping_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int16_t Ping_1get_1ponglen(void* ctx_TODO, uint32_t this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = Ping_get_ponglen(&this_ptr_conv);
	return ret_val;
}

void Ping_1set_1ponglen(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	Ping_set_ponglen(&this_ptr_conv, val);
}

int16_t Ping_1get_1byteslen(void* ctx_TODO, uint32_t this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = Ping_get_byteslen(&this_ptr_conv);
	return ret_val;
}

void Ping_1set_1byteslen(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	Ping_set_byteslen(&this_ptr_conv, val);
}

uint32_t Ping_1new(void* ctx_TODO, int16_t ponglen_arg, int16_t byteslen_arg) {
	LDKPing ret_var = Ping_new(ponglen_arg, byteslen_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void Pong_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Pong_free(this_ptr_conv);
}

uint32_t Pong_1clone(void* ctx_TODO, uint32_t orig) {
	LDKPong orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKPong ret_var = Pong_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int16_t Pong_1get_1byteslen(void* ctx_TODO, uint32_t this_ptr) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = Pong_get_byteslen(&this_ptr_conv);
	return ret_val;
}

void Pong_1set_1byteslen(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	Pong_set_byteslen(&this_ptr_conv, val);
}

uint32_t Pong_1new(void* ctx_TODO, int16_t byteslen_arg) {
	LDKPong ret_var = Pong_new(byteslen_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void OpenChannel_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_free(this_ptr_conv);
}

uint32_t OpenChannel_1clone(void* ctx_TODO, uint32_t orig) {
	LDKOpenChannel orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKOpenChannel ret_var = OpenChannel_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray OpenChannel_1get_1chain_1hash(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *OpenChannel_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void OpenChannel_1set_1chain_1hash(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	OpenChannel_set_chain_hash(&this_ptr_conv, val_ref);
}

int8_tArray OpenChannel_1get_1temporary_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *OpenChannel_get_temporary_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void OpenChannel_1set_1temporary_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	OpenChannel_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

int64_t OpenChannel_1get_1funding_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_funding_satoshis(&this_ptr_conv);
	return ret_val;
}

void OpenChannel_1set_1funding_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_funding_satoshis(&this_ptr_conv, val);
}

int64_t OpenChannel_1get_1push_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_push_msat(&this_ptr_conv);
	return ret_val;
}

void OpenChannel_1set_1push_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_push_msat(&this_ptr_conv, val);
}

int64_t OpenChannel_1get_1dust_1limit_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

void OpenChannel_1set_1dust_1limit_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_dust_limit_satoshis(&this_ptr_conv, val);
}

int64_t OpenChannel_1get_1max_1htlc_1value_1in_1flight_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

void OpenChannel_1set_1max_1htlc_1value_1in_1flight_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

int64_t OpenChannel_1get_1channel_1reserve_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

void OpenChannel_1set_1channel_1reserve_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_channel_reserve_satoshis(&this_ptr_conv, val);
}

int64_t OpenChannel_1get_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void OpenChannel_1set_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_htlc_minimum_msat(&this_ptr_conv, val);
}

int32_t OpenChannel_1get_1feerate_1per_1kw(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = OpenChannel_get_feerate_per_kw(&this_ptr_conv);
	return ret_val;
}

void OpenChannel_1set_1feerate_1per_1kw(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_feerate_per_kw(&this_ptr_conv, val);
}

int16_t OpenChannel_1get_1to_1self_1delay(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = OpenChannel_get_to_self_delay(&this_ptr_conv);
	return ret_val;
}

void OpenChannel_1set_1to_1self_1delay(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_to_self_delay(&this_ptr_conv, val);
}

int16_t OpenChannel_1get_1max_1accepted_1htlcs(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = OpenChannel_get_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

void OpenChannel_1set_1max_1accepted_1htlcs(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_max_accepted_htlcs(&this_ptr_conv, val);
}

int8_tArray OpenChannel_1get_1funding_1pubkey(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, OpenChannel_get_funding_pubkey(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void OpenChannel_1set_1funding_1pubkey(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	OpenChannel_set_funding_pubkey(&this_ptr_conv, val_ref);
}

int8_tArray OpenChannel_1get_1revocation_1basepoint(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, OpenChannel_get_revocation_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void OpenChannel_1set_1revocation_1basepoint(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	OpenChannel_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray OpenChannel_1get_1payment_1point(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, OpenChannel_get_payment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void OpenChannel_1set_1payment_1point(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	OpenChannel_set_payment_point(&this_ptr_conv, val_ref);
}

int8_tArray OpenChannel_1get_1delayed_1payment_1basepoint(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, OpenChannel_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void OpenChannel_1set_1delayed_1payment_1basepoint(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	OpenChannel_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray OpenChannel_1get_1htlc_1basepoint(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, OpenChannel_get_htlc_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void OpenChannel_1set_1htlc_1basepoint(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	OpenChannel_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray OpenChannel_1get_1first_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, OpenChannel_get_first_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void OpenChannel_1set_1first_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	OpenChannel_set_first_per_commitment_point(&this_ptr_conv, val_ref);
}

int8_t OpenChannel_1get_1channel_1flags(void* ctx_TODO, uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_t ret_val = OpenChannel_get_channel_flags(&this_ptr_conv);
	return ret_val;
}

void OpenChannel_1set_1channel_1flags(void* ctx_TODO, uint32_t this_ptr, int8_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_channel_flags(&this_ptr_conv, val);
}

void AcceptChannel_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_free(this_ptr_conv);
}

uint32_t AcceptChannel_1clone(void* ctx_TODO, uint32_t orig) {
	LDKAcceptChannel orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKAcceptChannel ret_var = AcceptChannel_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray AcceptChannel_1get_1temporary_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *AcceptChannel_get_temporary_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void AcceptChannel_1set_1temporary_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	AcceptChannel_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

int64_t AcceptChannel_1get_1dust_1limit_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

void AcceptChannel_1set_1dust_1limit_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_dust_limit_satoshis(&this_ptr_conv, val);
}

int64_t AcceptChannel_1get_1max_1htlc_1value_1in_1flight_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

void AcceptChannel_1set_1max_1htlc_1value_1in_1flight_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

int64_t AcceptChannel_1get_1channel_1reserve_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

void AcceptChannel_1set_1channel_1reserve_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_channel_reserve_satoshis(&this_ptr_conv, val);
}

int64_t AcceptChannel_1get_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void AcceptChannel_1set_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_htlc_minimum_msat(&this_ptr_conv, val);
}

int32_t AcceptChannel_1get_1minimum_1depth(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = AcceptChannel_get_minimum_depth(&this_ptr_conv);
	return ret_val;
}

void AcceptChannel_1set_1minimum_1depth(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_minimum_depth(&this_ptr_conv, val);
}

int16_t AcceptChannel_1get_1to_1self_1delay(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = AcceptChannel_get_to_self_delay(&this_ptr_conv);
	return ret_val;
}

void AcceptChannel_1set_1to_1self_1delay(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_to_self_delay(&this_ptr_conv, val);
}

int16_t AcceptChannel_1get_1max_1accepted_1htlcs(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = AcceptChannel_get_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

void AcceptChannel_1set_1max_1accepted_1htlcs(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_max_accepted_htlcs(&this_ptr_conv, val);
}

int8_tArray AcceptChannel_1get_1funding_1pubkey(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, AcceptChannel_get_funding_pubkey(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void AcceptChannel_1set_1funding_1pubkey(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	AcceptChannel_set_funding_pubkey(&this_ptr_conv, val_ref);
}

int8_tArray AcceptChannel_1get_1revocation_1basepoint(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, AcceptChannel_get_revocation_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void AcceptChannel_1set_1revocation_1basepoint(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	AcceptChannel_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray AcceptChannel_1get_1payment_1point(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, AcceptChannel_get_payment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void AcceptChannel_1set_1payment_1point(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	AcceptChannel_set_payment_point(&this_ptr_conv, val_ref);
}

int8_tArray AcceptChannel_1get_1delayed_1payment_1basepoint(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, AcceptChannel_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void AcceptChannel_1set_1delayed_1payment_1basepoint(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	AcceptChannel_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray AcceptChannel_1get_1htlc_1basepoint(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, AcceptChannel_get_htlc_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void AcceptChannel_1set_1htlc_1basepoint(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	AcceptChannel_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray AcceptChannel_1get_1first_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, AcceptChannel_get_first_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void AcceptChannel_1set_1first_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	AcceptChannel_set_first_per_commitment_point(&this_ptr_conv, val_ref);
}

void FundingCreated_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingCreated_free(this_ptr_conv);
}

uint32_t FundingCreated_1clone(void* ctx_TODO, uint32_t orig) {
	LDKFundingCreated orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKFundingCreated ret_var = FundingCreated_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray FundingCreated_1get_1temporary_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *FundingCreated_get_temporary_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void FundingCreated_1set_1temporary_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	FundingCreated_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray FundingCreated_1get_1funding_1txid(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *FundingCreated_get_funding_txid(&this_ptr_conv), 32);
	return ret_arr;
}

void FundingCreated_1set_1funding_1txid(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	FundingCreated_set_funding_txid(&this_ptr_conv, val_ref);
}

int16_t FundingCreated_1get_1funding_1output_1index(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = FundingCreated_get_funding_output_index(&this_ptr_conv);
	return ret_val;
}

void FundingCreated_1set_1funding_1output_1index(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	FundingCreated_set_funding_output_index(&this_ptr_conv, val);
}

int8_tArray FundingCreated_1get_1signature(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, FundingCreated_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void FundingCreated_1set_1signature(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	FundingCreated_set_signature(&this_ptr_conv, val_ref);
}

uint32_t FundingCreated_1new(void* ctx_TODO, int8_tArray temporary_channel_id_arg, int8_tArray funding_txid_arg, int16_t funding_output_index_arg, int8_tArray signature_arg) {
	LDKThirtyTwoBytes temporary_channel_id_arg_ref;
	CHECK(*temporary_channel_id_arg.len == 32);
	memcpy(temporary_channel_id_arg_ref.data, temporary_channel_id_arg.len + 1, 32);
	LDKThirtyTwoBytes funding_txid_arg_ref;
	CHECK(*funding_txid_arg.len == 32);
	memcpy(funding_txid_arg_ref.data, funding_txid_arg.len + 1, 32);
	LDKSignature signature_arg_ref;
	CHECK(*signature_arg.len == 64);
	memcpy(signature_arg_ref.compact_form, signature_arg.len + 1, 64);
	LDKFundingCreated ret_var = FundingCreated_new(temporary_channel_id_arg_ref, funding_txid_arg_ref, funding_output_index_arg, signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void FundingSigned_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingSigned_free(this_ptr_conv);
}

uint32_t FundingSigned_1clone(void* ctx_TODO, uint32_t orig) {
	LDKFundingSigned orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKFundingSigned ret_var = FundingSigned_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray FundingSigned_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *FundingSigned_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void FundingSigned_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	FundingSigned_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray FundingSigned_1get_1signature(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, FundingSigned_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void FundingSigned_1set_1signature(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	FundingSigned_set_signature(&this_ptr_conv, val_ref);
}

uint32_t FundingSigned_1new(void* ctx_TODO, int8_tArray channel_id_arg, int8_tArray signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*channel_id_arg.len == 32);
	memcpy(channel_id_arg_ref.data, channel_id_arg.len + 1, 32);
	LDKSignature signature_arg_ref;
	CHECK(*signature_arg.len == 64);
	memcpy(signature_arg_ref.compact_form, signature_arg.len + 1, 64);
	LDKFundingSigned ret_var = FundingSigned_new(channel_id_arg_ref, signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void FundingLocked_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingLocked_free(this_ptr_conv);
}

uint32_t FundingLocked_1clone(void* ctx_TODO, uint32_t orig) {
	LDKFundingLocked orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKFundingLocked ret_var = FundingLocked_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray FundingLocked_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *FundingLocked_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void FundingLocked_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	FundingLocked_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray FundingLocked_1get_1next_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, FundingLocked_get_next_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void FundingLocked_1set_1next_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	FundingLocked_set_next_per_commitment_point(&this_ptr_conv, val_ref);
}

uint32_t FundingLocked_1new(void* ctx_TODO, int8_tArray channel_id_arg, int8_tArray next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*channel_id_arg.len == 32);
	memcpy(channel_id_arg_ref.data, channel_id_arg.len + 1, 32);
	LDKPublicKey next_per_commitment_point_arg_ref;
	CHECK(*next_per_commitment_point_arg.len == 33);
	memcpy(next_per_commitment_point_arg_ref.compressed_form, next_per_commitment_point_arg.len + 1, 33);
	LDKFundingLocked ret_var = FundingLocked_new(channel_id_arg_ref, next_per_commitment_point_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void Shutdown_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Shutdown_free(this_ptr_conv);
}

uint32_t Shutdown_1clone(void* ctx_TODO, uint32_t orig) {
	LDKShutdown orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKShutdown ret_var = Shutdown_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray Shutdown_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *Shutdown_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void Shutdown_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	Shutdown_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray Shutdown_1get_1scriptpubkey(void* ctx_TODO, uint32_t this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKu8slice arg_var = Shutdown_get_scriptpubkey(&this_ptr_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	return arg_arr;
}

void Shutdown_1set_1scriptpubkey(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u8Z val_ref;
	val_ref.datalen = *val.len;
	val_ref.data = MALLOC(val_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(val_ref.data, val.len + 1, val_ref.datalen);
	Shutdown_set_scriptpubkey(&this_ptr_conv, val_ref);
}

uint32_t Shutdown_1new(void* ctx_TODO, int8_tArray channel_id_arg, int8_tArray scriptpubkey_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*channel_id_arg.len == 32);
	memcpy(channel_id_arg_ref.data, channel_id_arg.len + 1, 32);
	LDKCVec_u8Z scriptpubkey_arg_ref;
	scriptpubkey_arg_ref.datalen = *scriptpubkey_arg.len;
	scriptpubkey_arg_ref.data = MALLOC(scriptpubkey_arg_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(scriptpubkey_arg_ref.data, scriptpubkey_arg.len + 1, scriptpubkey_arg_ref.datalen);
	LDKShutdown ret_var = Shutdown_new(channel_id_arg_ref, scriptpubkey_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ClosingSigned_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ClosingSigned_free(this_ptr_conv);
}

uint32_t ClosingSigned_1clone(void* ctx_TODO, uint32_t orig) {
	LDKClosingSigned orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKClosingSigned ret_var = ClosingSigned_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ClosingSigned_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *ClosingSigned_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void ClosingSigned_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	ClosingSigned_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t ClosingSigned_1get_1fee_1satoshis(void* ctx_TODO, uint32_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ClosingSigned_get_fee_satoshis(&this_ptr_conv);
	return ret_val;
}

void ClosingSigned_1set_1fee_1satoshis(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ClosingSigned_set_fee_satoshis(&this_ptr_conv, val);
}

int8_tArray ClosingSigned_1get_1signature(void* ctx_TODO, uint32_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ClosingSigned_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void ClosingSigned_1set_1signature(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	ClosingSigned_set_signature(&this_ptr_conv, val_ref);
}

uint32_t ClosingSigned_1new(void* ctx_TODO, int8_tArray channel_id_arg, int64_t fee_satoshis_arg, int8_tArray signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*channel_id_arg.len == 32);
	memcpy(channel_id_arg_ref.data, channel_id_arg.len + 1, 32);
	LDKSignature signature_arg_ref;
	CHECK(*signature_arg.len == 64);
	memcpy(signature_arg_ref.compact_form, signature_arg.len + 1, 64);
	LDKClosingSigned ret_var = ClosingSigned_new(channel_id_arg_ref, fee_satoshis_arg, signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UpdateAddHTLC_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateAddHTLC_free(this_ptr_conv);
}

uint32_t UpdateAddHTLC_1clone(void* ctx_TODO, uint32_t orig) {
	LDKUpdateAddHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUpdateAddHTLC ret_var = UpdateAddHTLC_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UpdateAddHTLC_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UpdateAddHTLC_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void UpdateAddHTLC_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	UpdateAddHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t UpdateAddHTLC_1get_1htlc_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateAddHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

void UpdateAddHTLC_1set_1htlc_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateAddHTLC_set_htlc_id(&this_ptr_conv, val);
}

int64_t UpdateAddHTLC_1get_1amount_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateAddHTLC_get_amount_msat(&this_ptr_conv);
	return ret_val;
}

void UpdateAddHTLC_1set_1amount_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateAddHTLC_set_amount_msat(&this_ptr_conv, val);
}

int8_tArray UpdateAddHTLC_1get_1payment_1hash(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UpdateAddHTLC_get_payment_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void UpdateAddHTLC_1set_1payment_1hash(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	UpdateAddHTLC_set_payment_hash(&this_ptr_conv, val_ref);
}

int32_t UpdateAddHTLC_1get_1cltv_1expiry(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UpdateAddHTLC_get_cltv_expiry(&this_ptr_conv);
	return ret_val;
}

void UpdateAddHTLC_1set_1cltv_1expiry(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateAddHTLC_set_cltv_expiry(&this_ptr_conv, val);
}

void UpdateFulfillHTLC_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFulfillHTLC_free(this_ptr_conv);
}

uint32_t UpdateFulfillHTLC_1clone(void* ctx_TODO, uint32_t orig) {
	LDKUpdateFulfillHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUpdateFulfillHTLC ret_var = UpdateFulfillHTLC_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UpdateFulfillHTLC_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UpdateFulfillHTLC_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void UpdateFulfillHTLC_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	UpdateFulfillHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t UpdateFulfillHTLC_1get_1htlc_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateFulfillHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

void UpdateFulfillHTLC_1set_1htlc_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFulfillHTLC_set_htlc_id(&this_ptr_conv, val);
}

int8_tArray UpdateFulfillHTLC_1get_1payment_1preimage(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UpdateFulfillHTLC_get_payment_preimage(&this_ptr_conv), 32);
	return ret_arr;
}

void UpdateFulfillHTLC_1set_1payment_1preimage(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	UpdateFulfillHTLC_set_payment_preimage(&this_ptr_conv, val_ref);
}

uint32_t UpdateFulfillHTLC_1new(void* ctx_TODO, int8_tArray channel_id_arg, int64_t htlc_id_arg, int8_tArray payment_preimage_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*channel_id_arg.len == 32);
	memcpy(channel_id_arg_ref.data, channel_id_arg.len + 1, 32);
	LDKThirtyTwoBytes payment_preimage_arg_ref;
	CHECK(*payment_preimage_arg.len == 32);
	memcpy(payment_preimage_arg_ref.data, payment_preimage_arg.len + 1, 32);
	LDKUpdateFulfillHTLC ret_var = UpdateFulfillHTLC_new(channel_id_arg_ref, htlc_id_arg, payment_preimage_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UpdateFailHTLC_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailHTLC_free(this_ptr_conv);
}

uint32_t UpdateFailHTLC_1clone(void* ctx_TODO, uint32_t orig) {
	LDKUpdateFailHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUpdateFailHTLC ret_var = UpdateFailHTLC_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UpdateFailHTLC_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UpdateFailHTLC_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void UpdateFailHTLC_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	UpdateFailHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t UpdateFailHTLC_1get_1htlc_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateFailHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

void UpdateFailHTLC_1set_1htlc_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFailHTLC_set_htlc_id(&this_ptr_conv, val);
}

void UpdateFailMalformedHTLC_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailMalformedHTLC_free(this_ptr_conv);
}

uint32_t UpdateFailMalformedHTLC_1clone(void* ctx_TODO, uint32_t orig) {
	LDKUpdateFailMalformedHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUpdateFailMalformedHTLC ret_var = UpdateFailMalformedHTLC_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UpdateFailMalformedHTLC_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UpdateFailMalformedHTLC_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void UpdateFailMalformedHTLC_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	UpdateFailMalformedHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t UpdateFailMalformedHTLC_1get_1htlc_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateFailMalformedHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

void UpdateFailMalformedHTLC_1set_1htlc_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFailMalformedHTLC_set_htlc_id(&this_ptr_conv, val);
}

int16_t UpdateFailMalformedHTLC_1get_1failure_1code(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = UpdateFailMalformedHTLC_get_failure_code(&this_ptr_conv);
	return ret_val;
}

void UpdateFailMalformedHTLC_1set_1failure_1code(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFailMalformedHTLC_set_failure_code(&this_ptr_conv, val);
}

void CommitmentSigned_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentSigned_free(this_ptr_conv);
}

uint32_t CommitmentSigned_1clone(void* ctx_TODO, uint32_t orig) {
	LDKCommitmentSigned orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKCommitmentSigned ret_var = CommitmentSigned_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray CommitmentSigned_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *CommitmentSigned_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void CommitmentSigned_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	CommitmentSigned_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray CommitmentSigned_1get_1signature(void* ctx_TODO, uint32_t this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, CommitmentSigned_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void CommitmentSigned_1set_1signature(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	CommitmentSigned_set_signature(&this_ptr_conv, val_ref);
}

void CommitmentSigned_1set_1htlc_1signatures(void* ctx_TODO, uint32_t this_ptr, ptrArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_SignatureZ val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		val_constr.data = NULL;
	int8_tArray* val_vals = (int8_tArray*)(val.len + 1);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		int8_tArray arr_conv_12 = val_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*arr_conv_12.len == 64);
		memcpy(arr_conv_12_ref.compact_form, arr_conv_12.len + 1, 64);
		val_constr.data[m] = arr_conv_12_ref;
	}
	CommitmentSigned_set_htlc_signatures(&this_ptr_conv, val_constr);
}

uint32_t CommitmentSigned_1new(void* ctx_TODO, int8_tArray channel_id_arg, int8_tArray signature_arg, ptrArray htlc_signatures_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*channel_id_arg.len == 32);
	memcpy(channel_id_arg_ref.data, channel_id_arg.len + 1, 32);
	LDKSignature signature_arg_ref;
	CHECK(*signature_arg.len == 64);
	memcpy(signature_arg_ref.compact_form, signature_arg.len + 1, 64);
	LDKCVec_SignatureZ htlc_signatures_arg_constr;
	htlc_signatures_arg_constr.datalen = *htlc_signatures_arg.len;
	if (htlc_signatures_arg_constr.datalen > 0)
		htlc_signatures_arg_constr.data = MALLOC(htlc_signatures_arg_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		htlc_signatures_arg_constr.data = NULL;
	int8_tArray* htlc_signatures_arg_vals = (int8_tArray*)(htlc_signatures_arg.len + 1);
	for (size_t m = 0; m < htlc_signatures_arg_constr.datalen; m++) {
		int8_tArray arr_conv_12 = htlc_signatures_arg_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*arr_conv_12.len == 64);
		memcpy(arr_conv_12_ref.compact_form, arr_conv_12.len + 1, 64);
		htlc_signatures_arg_constr.data[m] = arr_conv_12_ref;
	}
	LDKCommitmentSigned ret_var = CommitmentSigned_new(channel_id_arg_ref, signature_arg_ref, htlc_signatures_arg_constr);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void RevokeAndACK_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RevokeAndACK_free(this_ptr_conv);
}

uint32_t RevokeAndACK_1clone(void* ctx_TODO, uint32_t orig) {
	LDKRevokeAndACK orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKRevokeAndACK ret_var = RevokeAndACK_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray RevokeAndACK_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *RevokeAndACK_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void RevokeAndACK_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	RevokeAndACK_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray RevokeAndACK_1get_1per_1commitment_1secret(void* ctx_TODO, uint32_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *RevokeAndACK_get_per_commitment_secret(&this_ptr_conv), 32);
	return ret_arr;
}

void RevokeAndACK_1set_1per_1commitment_1secret(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	RevokeAndACK_set_per_commitment_secret(&this_ptr_conv, val_ref);
}

int8_tArray RevokeAndACK_1get_1next_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, RevokeAndACK_get_next_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void RevokeAndACK_1set_1next_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	RevokeAndACK_set_next_per_commitment_point(&this_ptr_conv, val_ref);
}

uint32_t RevokeAndACK_1new(void* ctx_TODO, int8_tArray channel_id_arg, int8_tArray per_commitment_secret_arg, int8_tArray next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*channel_id_arg.len == 32);
	memcpy(channel_id_arg_ref.data, channel_id_arg.len + 1, 32);
	LDKThirtyTwoBytes per_commitment_secret_arg_ref;
	CHECK(*per_commitment_secret_arg.len == 32);
	memcpy(per_commitment_secret_arg_ref.data, per_commitment_secret_arg.len + 1, 32);
	LDKPublicKey next_per_commitment_point_arg_ref;
	CHECK(*next_per_commitment_point_arg.len == 33);
	memcpy(next_per_commitment_point_arg_ref.compressed_form, next_per_commitment_point_arg.len + 1, 33);
	LDKRevokeAndACK ret_var = RevokeAndACK_new(channel_id_arg_ref, per_commitment_secret_arg_ref, next_per_commitment_point_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UpdateFee_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFee_free(this_ptr_conv);
}

uint32_t UpdateFee_1clone(void* ctx_TODO, uint32_t orig) {
	LDKUpdateFee orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUpdateFee ret_var = UpdateFee_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UpdateFee_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UpdateFee_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void UpdateFee_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	UpdateFee_set_channel_id(&this_ptr_conv, val_ref);
}

int32_t UpdateFee_1get_1feerate_1per_1kw(void* ctx_TODO, uint32_t this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UpdateFee_get_feerate_per_kw(&this_ptr_conv);
	return ret_val;
}

void UpdateFee_1set_1feerate_1per_1kw(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFee_set_feerate_per_kw(&this_ptr_conv, val);
}

uint32_t UpdateFee_1new(void* ctx_TODO, int8_tArray channel_id_arg, int32_t feerate_per_kw_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*channel_id_arg.len == 32);
	memcpy(channel_id_arg_ref.data, channel_id_arg.len + 1, 32);
	LDKUpdateFee ret_var = UpdateFee_new(channel_id_arg_ref, feerate_per_kw_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void DataLossProtect_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DataLossProtect_free(this_ptr_conv);
}

uint32_t DataLossProtect_1clone(void* ctx_TODO, uint32_t orig) {
	LDKDataLossProtect orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKDataLossProtect ret_var = DataLossProtect_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray DataLossProtect_1get_1your_1last_1per_1commitment_1secret(void* ctx_TODO, uint32_t this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *DataLossProtect_get_your_last_per_commitment_secret(&this_ptr_conv), 32);
	return ret_arr;
}

void DataLossProtect_1set_1your_1last_1per_1commitment_1secret(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	DataLossProtect_set_your_last_per_commitment_secret(&this_ptr_conv, val_ref);
}

int8_tArray DataLossProtect_1get_1my_1current_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, DataLossProtect_get_my_current_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void DataLossProtect_1set_1my_1current_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	DataLossProtect_set_my_current_per_commitment_point(&this_ptr_conv, val_ref);
}

uint32_t DataLossProtect_1new(void* ctx_TODO, int8_tArray your_last_per_commitment_secret_arg, int8_tArray my_current_per_commitment_point_arg) {
	LDKThirtyTwoBytes your_last_per_commitment_secret_arg_ref;
	CHECK(*your_last_per_commitment_secret_arg.len == 32);
	memcpy(your_last_per_commitment_secret_arg_ref.data, your_last_per_commitment_secret_arg.len + 1, 32);
	LDKPublicKey my_current_per_commitment_point_arg_ref;
	CHECK(*my_current_per_commitment_point_arg.len == 33);
	memcpy(my_current_per_commitment_point_arg_ref.compressed_form, my_current_per_commitment_point_arg.len + 1, 33);
	LDKDataLossProtect ret_var = DataLossProtect_new(your_last_per_commitment_secret_arg_ref, my_current_per_commitment_point_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelReestablish_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelReestablish_free(this_ptr_conv);
}

uint32_t ChannelReestablish_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelReestablish orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelReestablish ret_var = ChannelReestablish_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ChannelReestablish_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *ChannelReestablish_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void ChannelReestablish_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	ChannelReestablish_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t ChannelReestablish_1get_1next_1local_1commitment_1number(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelReestablish_get_next_local_commitment_number(&this_ptr_conv);
	return ret_val;
}

void ChannelReestablish_1set_1next_1local_1commitment_1number(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelReestablish_set_next_local_commitment_number(&this_ptr_conv, val);
}

int64_t ChannelReestablish_1get_1next_1remote_1commitment_1number(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelReestablish_get_next_remote_commitment_number(&this_ptr_conv);
	return ret_val;
}

void ChannelReestablish_1set_1next_1remote_1commitment_1number(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelReestablish_set_next_remote_commitment_number(&this_ptr_conv, val);
}

void AnnouncementSignatures_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AnnouncementSignatures_free(this_ptr_conv);
}

uint32_t AnnouncementSignatures_1clone(void* ctx_TODO, uint32_t orig) {
	LDKAnnouncementSignatures orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKAnnouncementSignatures ret_var = AnnouncementSignatures_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray AnnouncementSignatures_1get_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *AnnouncementSignatures_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void AnnouncementSignatures_1set_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	AnnouncementSignatures_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t AnnouncementSignatures_1get_1short_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AnnouncementSignatures_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

void AnnouncementSignatures_1set_1short_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AnnouncementSignatures_set_short_channel_id(&this_ptr_conv, val);
}

int8_tArray AnnouncementSignatures_1get_1node_1signature(void* ctx_TODO, uint32_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, AnnouncementSignatures_get_node_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void AnnouncementSignatures_1set_1node_1signature(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	AnnouncementSignatures_set_node_signature(&this_ptr_conv, val_ref);
}

int8_tArray AnnouncementSignatures_1get_1bitcoin_1signature(void* ctx_TODO, uint32_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, AnnouncementSignatures_get_bitcoin_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void AnnouncementSignatures_1set_1bitcoin_1signature(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	AnnouncementSignatures_set_bitcoin_signature(&this_ptr_conv, val_ref);
}

uint32_t AnnouncementSignatures_1new(void* ctx_TODO, int8_tArray channel_id_arg, int64_t short_channel_id_arg, int8_tArray node_signature_arg, int8_tArray bitcoin_signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*channel_id_arg.len == 32);
	memcpy(channel_id_arg_ref.data, channel_id_arg.len + 1, 32);
	LDKSignature node_signature_arg_ref;
	CHECK(*node_signature_arg.len == 64);
	memcpy(node_signature_arg_ref.compact_form, node_signature_arg.len + 1, 64);
	LDKSignature bitcoin_signature_arg_ref;
	CHECK(*bitcoin_signature_arg.len == 64);
	memcpy(bitcoin_signature_arg_ref.compact_form, bitcoin_signature_arg.len + 1, 64);
	LDKAnnouncementSignatures ret_var = AnnouncementSignatures_new(channel_id_arg_ref, short_channel_id_arg, node_signature_arg_ref, bitcoin_signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void NetAddress_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKNetAddress this_ptr_conv = *(LDKNetAddress*)this_ptr;
	FREE((void*)this_ptr);
	NetAddress_free(this_ptr_conv);
}

uint32_t NetAddress_1clone(void* ctx_TODO, uint32_t orig) {
	LDKNetAddress* orig_conv = (LDKNetAddress*)orig;
	LDKNetAddress *ret_copy = MALLOC(sizeof(LDKNetAddress), "LDKNetAddress");
	*ret_copy = NetAddress_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

int8_tArray NetAddress_1write(void* ctx_TODO, uint32_t obj) {
	LDKNetAddress* obj_conv = (LDKNetAddress*)obj;
	LDKCVec_u8Z arg_var = NetAddress_write(obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t Result_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ), "LDKCResult_CResult_NetAddressu8ZDecodeErrorZ");
	*ret_conv = Result_read(ser_ref);
	return (long)ret_conv;
}

void UnsignedNodeAnnouncement_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedNodeAnnouncement_free(this_ptr_conv);
}

uint32_t UnsignedNodeAnnouncement_1clone(void* ctx_TODO, uint32_t orig) {
	LDKUnsignedNodeAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUnsignedNodeAnnouncement ret_var = UnsignedNodeAnnouncement_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t UnsignedNodeAnnouncement_1get_1features(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures ret_var = UnsignedNodeAnnouncement_get_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UnsignedNodeAnnouncement_1set_1features(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	UnsignedNodeAnnouncement_set_features(&this_ptr_conv, val_conv);
}

int32_t UnsignedNodeAnnouncement_1get_1timestamp(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedNodeAnnouncement_get_timestamp(&this_ptr_conv);
	return ret_val;
}

void UnsignedNodeAnnouncement_1set_1timestamp(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedNodeAnnouncement_set_timestamp(&this_ptr_conv, val);
}

int8_tArray UnsignedNodeAnnouncement_1get_1node_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, UnsignedNodeAnnouncement_get_node_id(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void UnsignedNodeAnnouncement_1set_1node_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	UnsignedNodeAnnouncement_set_node_id(&this_ptr_conv, val_ref);
}

int8_tArray UnsignedNodeAnnouncement_1get_1rgb(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(3 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UnsignedNodeAnnouncement_get_rgb(&this_ptr_conv), 3);
	return ret_arr;
}

void UnsignedNodeAnnouncement_1set_1rgb(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThreeBytes val_ref;
	CHECK(*val.len == 3);
	memcpy(val_ref.data, val.len + 1, 3);
	UnsignedNodeAnnouncement_set_rgb(&this_ptr_conv, val_ref);
}

int8_tArray UnsignedNodeAnnouncement_1get_1alias(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UnsignedNodeAnnouncement_get_alias(&this_ptr_conv), 32);
	return ret_arr;
}

void UnsignedNodeAnnouncement_1set_1alias(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	UnsignedNodeAnnouncement_set_alias(&this_ptr_conv, val_ref);
}

void UnsignedNodeAnnouncement_1set_1addresses(void* ctx_TODO, uint32_t this_ptr, uint32_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_NetAddressZ val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val.len + 1);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		uint32_t arr_conv_12 = val_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		val_constr.data[m] = arr_conv_12_conv;
	}
	UnsignedNodeAnnouncement_set_addresses(&this_ptr_conv, val_constr);
}

void NodeAnnouncement_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeAnnouncement_free(this_ptr_conv);
}

uint32_t NodeAnnouncement_1clone(void* ctx_TODO, uint32_t orig) {
	LDKNodeAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKNodeAnnouncement ret_var = NodeAnnouncement_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray NodeAnnouncement_1get_1signature(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, NodeAnnouncement_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void NodeAnnouncement_1set_1signature(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	NodeAnnouncement_set_signature(&this_ptr_conv, val_ref);
}

uint32_t NodeAnnouncement_1get_1contents(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedNodeAnnouncement ret_var = NodeAnnouncement_get_contents(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void NodeAnnouncement_1set_1contents(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedNodeAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UnsignedNodeAnnouncement_clone(&val_conv);
	NodeAnnouncement_set_contents(&this_ptr_conv, val_conv);
}

uint32_t NodeAnnouncement_1new(void* ctx_TODO, int8_tArray signature_arg, uint32_t contents_arg) {
	LDKSignature signature_arg_ref;
	CHECK(*signature_arg.len == 64);
	memcpy(signature_arg_ref.compact_form, signature_arg.len + 1, 64);
	LDKUnsignedNodeAnnouncement contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
	if (contents_arg_conv.inner != NULL)
		contents_arg_conv = UnsignedNodeAnnouncement_clone(&contents_arg_conv);
	LDKNodeAnnouncement ret_var = NodeAnnouncement_new(signature_arg_ref, contents_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UnsignedChannelAnnouncement_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelAnnouncement_free(this_ptr_conv);
}

uint32_t UnsignedChannelAnnouncement_1clone(void* ctx_TODO, uint32_t orig) {
	LDKUnsignedChannelAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUnsignedChannelAnnouncement ret_var = UnsignedChannelAnnouncement_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t UnsignedChannelAnnouncement_1get_1features(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures ret_var = UnsignedChannelAnnouncement_get_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UnsignedChannelAnnouncement_1set_1features(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	UnsignedChannelAnnouncement_set_features(&this_ptr_conv, val_conv);
}

int8_tArray UnsignedChannelAnnouncement_1get_1chain_1hash(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UnsignedChannelAnnouncement_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void UnsignedChannelAnnouncement_1set_1chain_1hash(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	UnsignedChannelAnnouncement_set_chain_hash(&this_ptr_conv, val_ref);
}

int64_t UnsignedChannelAnnouncement_1get_1short_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UnsignedChannelAnnouncement_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

void UnsignedChannelAnnouncement_1set_1short_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelAnnouncement_set_short_channel_id(&this_ptr_conv, val);
}

int8_tArray UnsignedChannelAnnouncement_1get_1node_1id_11(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, UnsignedChannelAnnouncement_get_node_id_1(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void UnsignedChannelAnnouncement_1set_1node_1id_11(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	UnsignedChannelAnnouncement_set_node_id_1(&this_ptr_conv, val_ref);
}

int8_tArray UnsignedChannelAnnouncement_1get_1node_1id_12(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, UnsignedChannelAnnouncement_get_node_id_2(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void UnsignedChannelAnnouncement_1set_1node_1id_12(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	UnsignedChannelAnnouncement_set_node_id_2(&this_ptr_conv, val_ref);
}

int8_tArray UnsignedChannelAnnouncement_1get_1bitcoin_1key_11(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, UnsignedChannelAnnouncement_get_bitcoin_key_1(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void UnsignedChannelAnnouncement_1set_1bitcoin_1key_11(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	UnsignedChannelAnnouncement_set_bitcoin_key_1(&this_ptr_conv, val_ref);
}

int8_tArray UnsignedChannelAnnouncement_1get_1bitcoin_1key_12(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, UnsignedChannelAnnouncement_get_bitcoin_key_2(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void UnsignedChannelAnnouncement_1set_1bitcoin_1key_12(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	UnsignedChannelAnnouncement_set_bitcoin_key_2(&this_ptr_conv, val_ref);
}

void ChannelAnnouncement_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelAnnouncement_free(this_ptr_conv);
}

uint32_t ChannelAnnouncement_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelAnnouncement ret_var = ChannelAnnouncement_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ChannelAnnouncement_1get_1node_1signature_11(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelAnnouncement_get_node_signature_1(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void ChannelAnnouncement_1set_1node_1signature_11(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	ChannelAnnouncement_set_node_signature_1(&this_ptr_conv, val_ref);
}

int8_tArray ChannelAnnouncement_1get_1node_1signature_12(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelAnnouncement_get_node_signature_2(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void ChannelAnnouncement_1set_1node_1signature_12(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	ChannelAnnouncement_set_node_signature_2(&this_ptr_conv, val_ref);
}

int8_tArray ChannelAnnouncement_1get_1bitcoin_1signature_11(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelAnnouncement_get_bitcoin_signature_1(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void ChannelAnnouncement_1set_1bitcoin_1signature_11(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	ChannelAnnouncement_set_bitcoin_signature_1(&this_ptr_conv, val_ref);
}

int8_tArray ChannelAnnouncement_1get_1bitcoin_1signature_12(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelAnnouncement_get_bitcoin_signature_2(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void ChannelAnnouncement_1set_1bitcoin_1signature_12(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	ChannelAnnouncement_set_bitcoin_signature_2(&this_ptr_conv, val_ref);
}

uint32_t ChannelAnnouncement_1get_1contents(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedChannelAnnouncement ret_var = ChannelAnnouncement_get_contents(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelAnnouncement_1set_1contents(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedChannelAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UnsignedChannelAnnouncement_clone(&val_conv);
	ChannelAnnouncement_set_contents(&this_ptr_conv, val_conv);
}

uint32_t ChannelAnnouncement_1new(void* ctx_TODO, int8_tArray node_signature_1_arg, int8_tArray node_signature_2_arg, int8_tArray bitcoin_signature_1_arg, int8_tArray bitcoin_signature_2_arg, uint32_t contents_arg) {
	LDKSignature node_signature_1_arg_ref;
	CHECK(*node_signature_1_arg.len == 64);
	memcpy(node_signature_1_arg_ref.compact_form, node_signature_1_arg.len + 1, 64);
	LDKSignature node_signature_2_arg_ref;
	CHECK(*node_signature_2_arg.len == 64);
	memcpy(node_signature_2_arg_ref.compact_form, node_signature_2_arg.len + 1, 64);
	LDKSignature bitcoin_signature_1_arg_ref;
	CHECK(*bitcoin_signature_1_arg.len == 64);
	memcpy(bitcoin_signature_1_arg_ref.compact_form, bitcoin_signature_1_arg.len + 1, 64);
	LDKSignature bitcoin_signature_2_arg_ref;
	CHECK(*bitcoin_signature_2_arg.len == 64);
	memcpy(bitcoin_signature_2_arg_ref.compact_form, bitcoin_signature_2_arg.len + 1, 64);
	LDKUnsignedChannelAnnouncement contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
	if (contents_arg_conv.inner != NULL)
		contents_arg_conv = UnsignedChannelAnnouncement_clone(&contents_arg_conv);
	LDKChannelAnnouncement ret_var = ChannelAnnouncement_new(node_signature_1_arg_ref, node_signature_2_arg_ref, bitcoin_signature_1_arg_ref, bitcoin_signature_2_arg_ref, contents_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void UnsignedChannelUpdate_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_free(this_ptr_conv);
}

uint32_t UnsignedChannelUpdate_1clone(void* ctx_TODO, uint32_t orig) {
	LDKUnsignedChannelUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUnsignedChannelUpdate ret_var = UnsignedChannelUpdate_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UnsignedChannelUpdate_1get_1chain_1hash(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *UnsignedChannelUpdate_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void UnsignedChannelUpdate_1set_1chain_1hash(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	UnsignedChannelUpdate_set_chain_hash(&this_ptr_conv, val_ref);
}

int64_t UnsignedChannelUpdate_1get_1short_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UnsignedChannelUpdate_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

void UnsignedChannelUpdate_1set_1short_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_short_channel_id(&this_ptr_conv, val);
}

int32_t UnsignedChannelUpdate_1get_1timestamp(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedChannelUpdate_get_timestamp(&this_ptr_conv);
	return ret_val;
}

void UnsignedChannelUpdate_1set_1timestamp(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_timestamp(&this_ptr_conv, val);
}

int8_t UnsignedChannelUpdate_1get_1flags(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_t ret_val = UnsignedChannelUpdate_get_flags(&this_ptr_conv);
	return ret_val;
}

void UnsignedChannelUpdate_1set_1flags(void* ctx_TODO, uint32_t this_ptr, int8_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_flags(&this_ptr_conv, val);
}

int16_t UnsignedChannelUpdate_1get_1cltv_1expiry_1delta(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = UnsignedChannelUpdate_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

void UnsignedChannelUpdate_1set_1cltv_1expiry_1delta(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_cltv_expiry_delta(&this_ptr_conv, val);
}

int64_t UnsignedChannelUpdate_1get_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UnsignedChannelUpdate_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void UnsignedChannelUpdate_1set_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_htlc_minimum_msat(&this_ptr_conv, val);
}

int32_t UnsignedChannelUpdate_1get_1fee_1base_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedChannelUpdate_get_fee_base_msat(&this_ptr_conv);
	return ret_val;
}

void UnsignedChannelUpdate_1set_1fee_1base_1msat(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_fee_base_msat(&this_ptr_conv, val);
}

int32_t UnsignedChannelUpdate_1get_1fee_1proportional_1millionths(void* ctx_TODO, uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedChannelUpdate_get_fee_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

void UnsignedChannelUpdate_1set_1fee_1proportional_1millionths(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_fee_proportional_millionths(&this_ptr_conv, val);
}

void ChannelUpdate_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelUpdate_free(this_ptr_conv);
}

uint32_t ChannelUpdate_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelUpdate ret_var = ChannelUpdate_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ChannelUpdate_1get_1signature(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelUpdate_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void ChannelUpdate_1set_1signature(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	ChannelUpdate_set_signature(&this_ptr_conv, val_ref);
}

uint32_t ChannelUpdate_1get_1contents(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedChannelUpdate ret_var = ChannelUpdate_get_contents(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelUpdate_1set_1contents(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedChannelUpdate val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UnsignedChannelUpdate_clone(&val_conv);
	ChannelUpdate_set_contents(&this_ptr_conv, val_conv);
}

uint32_t ChannelUpdate_1new(void* ctx_TODO, int8_tArray signature_arg, uint32_t contents_arg) {
	LDKSignature signature_arg_ref;
	CHECK(*signature_arg.len == 64);
	memcpy(signature_arg_ref.compact_form, signature_arg.len + 1, 64);
	LDKUnsignedChannelUpdate contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
	if (contents_arg_conv.inner != NULL)
		contents_arg_conv = UnsignedChannelUpdate_clone(&contents_arg_conv);
	LDKChannelUpdate ret_var = ChannelUpdate_new(signature_arg_ref, contents_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void QueryChannelRange_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	QueryChannelRange_free(this_ptr_conv);
}

uint32_t QueryChannelRange_1clone(void* ctx_TODO, uint32_t orig) {
	LDKQueryChannelRange orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKQueryChannelRange ret_var = QueryChannelRange_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray QueryChannelRange_1get_1chain_1hash(void* ctx_TODO, uint32_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *QueryChannelRange_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void QueryChannelRange_1set_1chain_1hash(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	QueryChannelRange_set_chain_hash(&this_ptr_conv, val_ref);
}

int32_t QueryChannelRange_1get_1first_1blocknum(void* ctx_TODO, uint32_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = QueryChannelRange_get_first_blocknum(&this_ptr_conv);
	return ret_val;
}

void QueryChannelRange_1set_1first_1blocknum(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	QueryChannelRange_set_first_blocknum(&this_ptr_conv, val);
}

int32_t QueryChannelRange_1get_1number_1of_1blocks(void* ctx_TODO, uint32_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = QueryChannelRange_get_number_of_blocks(&this_ptr_conv);
	return ret_val;
}

void QueryChannelRange_1set_1number_1of_1blocks(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	QueryChannelRange_set_number_of_blocks(&this_ptr_conv, val);
}

uint32_t QueryChannelRange_1new(void* ctx_TODO, int8_tArray chain_hash_arg, int32_t first_blocknum_arg, int32_t number_of_blocks_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK(*chain_hash_arg.len == 32);
	memcpy(chain_hash_arg_ref.data, chain_hash_arg.len + 1, 32);
	LDKQueryChannelRange ret_var = QueryChannelRange_new(chain_hash_arg_ref, first_blocknum_arg, number_of_blocks_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ReplyChannelRange_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyChannelRange_free(this_ptr_conv);
}

uint32_t ReplyChannelRange_1clone(void* ctx_TODO, uint32_t orig) {
	LDKReplyChannelRange orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKReplyChannelRange ret_var = ReplyChannelRange_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ReplyChannelRange_1get_1chain_1hash(void* ctx_TODO, uint32_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *ReplyChannelRange_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void ReplyChannelRange_1set_1chain_1hash(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	ReplyChannelRange_set_chain_hash(&this_ptr_conv, val_ref);
}

int32_t ReplyChannelRange_1get_1first_1blocknum(void* ctx_TODO, uint32_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ReplyChannelRange_get_first_blocknum(&this_ptr_conv);
	return ret_val;
}

void ReplyChannelRange_1set_1first_1blocknum(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyChannelRange_set_first_blocknum(&this_ptr_conv, val);
}

int32_t ReplyChannelRange_1get_1number_1of_1blocks(void* ctx_TODO, uint32_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ReplyChannelRange_get_number_of_blocks(&this_ptr_conv);
	return ret_val;
}

void ReplyChannelRange_1set_1number_1of_1blocks(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyChannelRange_set_number_of_blocks(&this_ptr_conv, val);
}

jboolean ReplyChannelRange_1get_1full_1information(void* ctx_TODO, uint32_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ReplyChannelRange_get_full_information(&this_ptr_conv);
	return ret_val;
}

void ReplyChannelRange_1set_1full_1information(void* ctx_TODO, uint32_t this_ptr, jboolean val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyChannelRange_set_full_information(&this_ptr_conv, val);
}

void ReplyChannelRange_1set_1short_1channel_1ids(void* ctx_TODO, uint32_t this_ptr, int64_tArray val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u64Z val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (int64_t*)(val.len + 1);
	for (size_t i = 0; i < val_constr.datalen; i++) {
		int64_t arr_conv_8 = val_vals[i];
		val_constr.data[i] = arr_conv_8;
	}
	ReplyChannelRange_set_short_channel_ids(&this_ptr_conv, val_constr);
}

uint32_t ReplyChannelRange_1new(void* ctx_TODO, int8_tArray chain_hash_arg, int32_t first_blocknum_arg, int32_t number_of_blocks_arg, jboolean full_information_arg, int64_tArray short_channel_ids_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK(*chain_hash_arg.len == 32);
	memcpy(chain_hash_arg_ref.data, chain_hash_arg.len + 1, 32);
	LDKCVec_u64Z short_channel_ids_arg_constr;
	short_channel_ids_arg_constr.datalen = *short_channel_ids_arg.len;
	if (short_channel_ids_arg_constr.datalen > 0)
		short_channel_ids_arg_constr.data = MALLOC(short_channel_ids_arg_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		short_channel_ids_arg_constr.data = NULL;
	int64_t* short_channel_ids_arg_vals = (int64_t*)(short_channel_ids_arg.len + 1);
	for (size_t i = 0; i < short_channel_ids_arg_constr.datalen; i++) {
		int64_t arr_conv_8 = short_channel_ids_arg_vals[i];
		short_channel_ids_arg_constr.data[i] = arr_conv_8;
	}
	LDKReplyChannelRange ret_var = ReplyChannelRange_new(chain_hash_arg_ref, first_blocknum_arg, number_of_blocks_arg, full_information_arg, short_channel_ids_arg_constr);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void QueryShortChannelIds_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	QueryShortChannelIds_free(this_ptr_conv);
}

uint32_t QueryShortChannelIds_1clone(void* ctx_TODO, uint32_t orig) {
	LDKQueryShortChannelIds orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKQueryShortChannelIds ret_var = QueryShortChannelIds_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray QueryShortChannelIds_1get_1chain_1hash(void* ctx_TODO, uint32_t this_ptr) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *QueryShortChannelIds_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void QueryShortChannelIds_1set_1chain_1hash(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	QueryShortChannelIds_set_chain_hash(&this_ptr_conv, val_ref);
}

void QueryShortChannelIds_1set_1short_1channel_1ids(void* ctx_TODO, uint32_t this_ptr, int64_tArray val) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u64Z val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (int64_t*)(val.len + 1);
	for (size_t i = 0; i < val_constr.datalen; i++) {
		int64_t arr_conv_8 = val_vals[i];
		val_constr.data[i] = arr_conv_8;
	}
	QueryShortChannelIds_set_short_channel_ids(&this_ptr_conv, val_constr);
}

uint32_t QueryShortChannelIds_1new(void* ctx_TODO, int8_tArray chain_hash_arg, int64_tArray short_channel_ids_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK(*chain_hash_arg.len == 32);
	memcpy(chain_hash_arg_ref.data, chain_hash_arg.len + 1, 32);
	LDKCVec_u64Z short_channel_ids_arg_constr;
	short_channel_ids_arg_constr.datalen = *short_channel_ids_arg.len;
	if (short_channel_ids_arg_constr.datalen > 0)
		short_channel_ids_arg_constr.data = MALLOC(short_channel_ids_arg_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		short_channel_ids_arg_constr.data = NULL;
	int64_t* short_channel_ids_arg_vals = (int64_t*)(short_channel_ids_arg.len + 1);
	for (size_t i = 0; i < short_channel_ids_arg_constr.datalen; i++) {
		int64_t arr_conv_8 = short_channel_ids_arg_vals[i];
		short_channel_ids_arg_constr.data[i] = arr_conv_8;
	}
	LDKQueryShortChannelIds ret_var = QueryShortChannelIds_new(chain_hash_arg_ref, short_channel_ids_arg_constr);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ReplyShortChannelIdsEnd_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyShortChannelIdsEnd_free(this_ptr_conv);
}

uint32_t ReplyShortChannelIdsEnd_1clone(void* ctx_TODO, uint32_t orig) {
	LDKReplyShortChannelIdsEnd orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKReplyShortChannelIdsEnd ret_var = ReplyShortChannelIdsEnd_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ReplyShortChannelIdsEnd_1get_1chain_1hash(void* ctx_TODO, uint32_t this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *ReplyShortChannelIdsEnd_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void ReplyShortChannelIdsEnd_1set_1chain_1hash(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	ReplyShortChannelIdsEnd_set_chain_hash(&this_ptr_conv, val_ref);
}

jboolean ReplyShortChannelIdsEnd_1get_1full_1information(void* ctx_TODO, uint32_t this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ReplyShortChannelIdsEnd_get_full_information(&this_ptr_conv);
	return ret_val;
}

void ReplyShortChannelIdsEnd_1set_1full_1information(void* ctx_TODO, uint32_t this_ptr, jboolean val) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyShortChannelIdsEnd_set_full_information(&this_ptr_conv, val);
}

uint32_t ReplyShortChannelIdsEnd_1new(void* ctx_TODO, int8_tArray chain_hash_arg, jboolean full_information_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK(*chain_hash_arg.len == 32);
	memcpy(chain_hash_arg_ref.data, chain_hash_arg.len + 1, 32);
	LDKReplyShortChannelIdsEnd ret_var = ReplyShortChannelIdsEnd_new(chain_hash_arg_ref, full_information_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void GossipTimestampFilter_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	GossipTimestampFilter_free(this_ptr_conv);
}

uint32_t GossipTimestampFilter_1clone(void* ctx_TODO, uint32_t orig) {
	LDKGossipTimestampFilter orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKGossipTimestampFilter ret_var = GossipTimestampFilter_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray GossipTimestampFilter_1get_1chain_1hash(void* ctx_TODO, uint32_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *GossipTimestampFilter_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void GossipTimestampFilter_1set_1chain_1hash(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	GossipTimestampFilter_set_chain_hash(&this_ptr_conv, val_ref);
}

int32_t GossipTimestampFilter_1get_1first_1timestamp(void* ctx_TODO, uint32_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = GossipTimestampFilter_get_first_timestamp(&this_ptr_conv);
	return ret_val;
}

void GossipTimestampFilter_1set_1first_1timestamp(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	GossipTimestampFilter_set_first_timestamp(&this_ptr_conv, val);
}

int32_t GossipTimestampFilter_1get_1timestamp_1range(void* ctx_TODO, uint32_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = GossipTimestampFilter_get_timestamp_range(&this_ptr_conv);
	return ret_val;
}

void GossipTimestampFilter_1set_1timestamp_1range(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	GossipTimestampFilter_set_timestamp_range(&this_ptr_conv, val);
}

uint32_t GossipTimestampFilter_1new(void* ctx_TODO, int8_tArray chain_hash_arg, int32_t first_timestamp_arg, int32_t timestamp_range_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK(*chain_hash_arg.len == 32);
	memcpy(chain_hash_arg_ref.data, chain_hash_arg.len + 1, 32);
	LDKGossipTimestampFilter ret_var = GossipTimestampFilter_new(chain_hash_arg_ref, first_timestamp_arg, timestamp_range_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ErrorAction_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKErrorAction this_ptr_conv = *(LDKErrorAction*)this_ptr;
	FREE((void*)this_ptr);
	ErrorAction_free(this_ptr_conv);
}

uint32_t ErrorAction_1clone(void* ctx_TODO, uint32_t orig) {
	LDKErrorAction* orig_conv = (LDKErrorAction*)orig;
	LDKErrorAction *ret_copy = MALLOC(sizeof(LDKErrorAction), "LDKErrorAction");
	*ret_copy = ErrorAction_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

void LightningError_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LightningError_free(this_ptr_conv);
}

jstring LightningError_1get_1err(void* ctx_TODO, uint32_t this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKStr _str = LightningError_get_err(&this_ptr_conv);
	char* _buf = MALLOC(_str.len + 1, "str conv buf");
	memcpy(_buf, _str.chars, _str.len);
	_buf[_str.len] = 0;
	jstring _conv = conv_owned_string(_str.chars);
	FREE(_buf);
	return _conv;
}

void LightningError_1set_1err(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u8Z val_ref;
	val_ref.datalen = *val.len;
	val_ref.data = MALLOC(val_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(val_ref.data, val.len + 1, val_ref.datalen);
	LightningError_set_err(&this_ptr_conv, val_ref);
}

uint32_t LightningError_1get_1action(void* ctx_TODO, uint32_t this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKErrorAction *ret_copy = MALLOC(sizeof(LDKErrorAction), "LDKErrorAction");
	*ret_copy = LightningError_get_action(&this_ptr_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

void LightningError_1set_1action(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKErrorAction val_conv = *(LDKErrorAction*)val;
	FREE((void*)val);
	LightningError_set_action(&this_ptr_conv, val_conv);
}

uint32_t LightningError_1new(void* ctx_TODO, int8_tArray err_arg, uint32_t action_arg) {
	LDKCVec_u8Z err_arg_ref;
	err_arg_ref.datalen = *err_arg.len;
	err_arg_ref.data = MALLOC(err_arg_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(err_arg_ref.data, err_arg.len + 1, err_arg_ref.datalen);
	LDKErrorAction action_arg_conv = *(LDKErrorAction*)action_arg;
	FREE((void*)action_arg);
	LDKLightningError ret_var = LightningError_new(err_arg_ref, action_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void CommitmentUpdate_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentUpdate_free(this_ptr_conv);
}

uint32_t CommitmentUpdate_1clone(void* ctx_TODO, uint32_t orig) {
	LDKCommitmentUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKCommitmentUpdate ret_var = CommitmentUpdate_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void CommitmentUpdate_1set_1update_1add_1htlcs(void* ctx_TODO, uint32_t this_ptr, uint32_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateAddHTLCZ val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val.len + 1);
	for (size_t p = 0; p < val_constr.datalen; p++) {
		uint32_t arr_conv_15 = val_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		if (arr_conv_15_conv.inner != NULL)
			arr_conv_15_conv = UpdateAddHTLC_clone(&arr_conv_15_conv);
		val_constr.data[p] = arr_conv_15_conv;
	}
	CommitmentUpdate_set_update_add_htlcs(&this_ptr_conv, val_constr);
}

void CommitmentUpdate_1set_1update_1fulfill_1htlcs(void* ctx_TODO, uint32_t this_ptr, uint32_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateFulfillHTLCZ val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val.len + 1);
	for (size_t t = 0; t < val_constr.datalen; t++) {
		uint32_t arr_conv_19 = val_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		if (arr_conv_19_conv.inner != NULL)
			arr_conv_19_conv = UpdateFulfillHTLC_clone(&arr_conv_19_conv);
		val_constr.data[t] = arr_conv_19_conv;
	}
	CommitmentUpdate_set_update_fulfill_htlcs(&this_ptr_conv, val_constr);
}

void CommitmentUpdate_1set_1update_1fail_1htlcs(void* ctx_TODO, uint32_t this_ptr, uint32_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateFailHTLCZ val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val.len + 1);
	for (size_t q = 0; q < val_constr.datalen; q++) {
		uint32_t arr_conv_16 = val_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		if (arr_conv_16_conv.inner != NULL)
			arr_conv_16_conv = UpdateFailHTLC_clone(&arr_conv_16_conv);
		val_constr.data[q] = arr_conv_16_conv;
	}
	CommitmentUpdate_set_update_fail_htlcs(&this_ptr_conv, val_constr);
}

void CommitmentUpdate_1set_1update_1fail_1malformed_1htlcs(void* ctx_TODO, uint32_t this_ptr, uint32_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateFailMalformedHTLCZ val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val.len + 1);
	for (size_t z = 0; z < val_constr.datalen; z++) {
		uint32_t arr_conv_25 = val_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		if (arr_conv_25_conv.inner != NULL)
			arr_conv_25_conv = UpdateFailMalformedHTLC_clone(&arr_conv_25_conv);
		val_constr.data[z] = arr_conv_25_conv;
	}
	CommitmentUpdate_set_update_fail_malformed_htlcs(&this_ptr_conv, val_constr);
}

uint32_t CommitmentUpdate_1get_1update_1fee(void* ctx_TODO, uint32_t this_ptr) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUpdateFee ret_var = CommitmentUpdate_get_update_fee(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void CommitmentUpdate_1set_1update_1fee(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUpdateFee val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UpdateFee_clone(&val_conv);
	CommitmentUpdate_set_update_fee(&this_ptr_conv, val_conv);
}

uint32_t CommitmentUpdate_1get_1commitment_1signed(void* ctx_TODO, uint32_t this_ptr) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCommitmentSigned ret_var = CommitmentUpdate_get_commitment_signed(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void CommitmentUpdate_1set_1commitment_1signed(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCommitmentSigned val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = CommitmentSigned_clone(&val_conv);
	CommitmentUpdate_set_commitment_signed(&this_ptr_conv, val_conv);
}

uint32_t CommitmentUpdate_1new(void* ctx_TODO, uint32_tArray update_add_htlcs_arg, uint32_tArray update_fulfill_htlcs_arg, uint32_tArray update_fail_htlcs_arg, uint32_tArray update_fail_malformed_htlcs_arg, uint32_t update_fee_arg, uint32_t commitment_signed_arg) {
	LDKCVec_UpdateAddHTLCZ update_add_htlcs_arg_constr;
	update_add_htlcs_arg_constr.datalen = *update_add_htlcs_arg.len;
	if (update_add_htlcs_arg_constr.datalen > 0)
		update_add_htlcs_arg_constr.data = MALLOC(update_add_htlcs_arg_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		update_add_htlcs_arg_constr.data = NULL;
	uint32_t* update_add_htlcs_arg_vals = (uint32_t*)(update_add_htlcs_arg.len + 1);
	for (size_t p = 0; p < update_add_htlcs_arg_constr.datalen; p++) {
		uint32_t arr_conv_15 = update_add_htlcs_arg_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		if (arr_conv_15_conv.inner != NULL)
			arr_conv_15_conv = UpdateAddHTLC_clone(&arr_conv_15_conv);
		update_add_htlcs_arg_constr.data[p] = arr_conv_15_conv;
	}
	LDKCVec_UpdateFulfillHTLCZ update_fulfill_htlcs_arg_constr;
	update_fulfill_htlcs_arg_constr.datalen = *update_fulfill_htlcs_arg.len;
	if (update_fulfill_htlcs_arg_constr.datalen > 0)
		update_fulfill_htlcs_arg_constr.data = MALLOC(update_fulfill_htlcs_arg_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		update_fulfill_htlcs_arg_constr.data = NULL;
	uint32_t* update_fulfill_htlcs_arg_vals = (uint32_t*)(update_fulfill_htlcs_arg.len + 1);
	for (size_t t = 0; t < update_fulfill_htlcs_arg_constr.datalen; t++) {
		uint32_t arr_conv_19 = update_fulfill_htlcs_arg_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		if (arr_conv_19_conv.inner != NULL)
			arr_conv_19_conv = UpdateFulfillHTLC_clone(&arr_conv_19_conv);
		update_fulfill_htlcs_arg_constr.data[t] = arr_conv_19_conv;
	}
	LDKCVec_UpdateFailHTLCZ update_fail_htlcs_arg_constr;
	update_fail_htlcs_arg_constr.datalen = *update_fail_htlcs_arg.len;
	if (update_fail_htlcs_arg_constr.datalen > 0)
		update_fail_htlcs_arg_constr.data = MALLOC(update_fail_htlcs_arg_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		update_fail_htlcs_arg_constr.data = NULL;
	uint32_t* update_fail_htlcs_arg_vals = (uint32_t*)(update_fail_htlcs_arg.len + 1);
	for (size_t q = 0; q < update_fail_htlcs_arg_constr.datalen; q++) {
		uint32_t arr_conv_16 = update_fail_htlcs_arg_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		if (arr_conv_16_conv.inner != NULL)
			arr_conv_16_conv = UpdateFailHTLC_clone(&arr_conv_16_conv);
		update_fail_htlcs_arg_constr.data[q] = arr_conv_16_conv;
	}
	LDKCVec_UpdateFailMalformedHTLCZ update_fail_malformed_htlcs_arg_constr;
	update_fail_malformed_htlcs_arg_constr.datalen = *update_fail_malformed_htlcs_arg.len;
	if (update_fail_malformed_htlcs_arg_constr.datalen > 0)
		update_fail_malformed_htlcs_arg_constr.data = MALLOC(update_fail_malformed_htlcs_arg_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		update_fail_malformed_htlcs_arg_constr.data = NULL;
	uint32_t* update_fail_malformed_htlcs_arg_vals = (uint32_t*)(update_fail_malformed_htlcs_arg.len + 1);
	for (size_t z = 0; z < update_fail_malformed_htlcs_arg_constr.datalen; z++) {
		uint32_t arr_conv_25 = update_fail_malformed_htlcs_arg_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		if (arr_conv_25_conv.inner != NULL)
			arr_conv_25_conv = UpdateFailMalformedHTLC_clone(&arr_conv_25_conv);
		update_fail_malformed_htlcs_arg_constr.data[z] = arr_conv_25_conv;
	}
	LDKUpdateFee update_fee_arg_conv;
	update_fee_arg_conv.inner = (void*)(update_fee_arg & (~1));
	update_fee_arg_conv.is_owned = (update_fee_arg & 1) || (update_fee_arg == 0);
	if (update_fee_arg_conv.inner != NULL)
		update_fee_arg_conv = UpdateFee_clone(&update_fee_arg_conv);
	LDKCommitmentSigned commitment_signed_arg_conv;
	commitment_signed_arg_conv.inner = (void*)(commitment_signed_arg & (~1));
	commitment_signed_arg_conv.is_owned = (commitment_signed_arg & 1) || (commitment_signed_arg == 0);
	if (commitment_signed_arg_conv.inner != NULL)
		commitment_signed_arg_conv = CommitmentSigned_clone(&commitment_signed_arg_conv);
	LDKCommitmentUpdate ret_var = CommitmentUpdate_new(update_add_htlcs_arg_constr, update_fulfill_htlcs_arg_constr, update_fail_htlcs_arg_constr, update_fail_malformed_htlcs_arg_constr, update_fee_arg_conv, commitment_signed_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void HTLCFailChannelUpdate_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKHTLCFailChannelUpdate this_ptr_conv = *(LDKHTLCFailChannelUpdate*)this_ptr;
	FREE((void*)this_ptr);
	HTLCFailChannelUpdate_free(this_ptr_conv);
}

uint32_t HTLCFailChannelUpdate_1clone(void* ctx_TODO, uint32_t orig) {
	LDKHTLCFailChannelUpdate* orig_conv = (LDKHTLCFailChannelUpdate*)orig;
	LDKHTLCFailChannelUpdate *ret_copy = MALLOC(sizeof(LDKHTLCFailChannelUpdate), "LDKHTLCFailChannelUpdate");
	*ret_copy = HTLCFailChannelUpdate_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

void ChannelMessageHandler_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelMessageHandler this_ptr_conv = *(LDKChannelMessageHandler*)this_ptr;
	FREE((void*)this_ptr);
	ChannelMessageHandler_free(this_ptr_conv);
}

void RoutingMessageHandler_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKRoutingMessageHandler this_ptr_conv = *(LDKRoutingMessageHandler*)this_ptr;
	FREE((void*)this_ptr);
	RoutingMessageHandler_free(this_ptr_conv);
}

int8_tArray AcceptChannel_1write(void* ctx_TODO, uint32_t obj) {
	LDKAcceptChannel obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = AcceptChannel_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t AcceptChannel_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKAcceptChannel ret_var = AcceptChannel_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray AnnouncementSignatures_1write(void* ctx_TODO, uint32_t obj) {
	LDKAnnouncementSignatures obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = AnnouncementSignatures_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t AnnouncementSignatures_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKAnnouncementSignatures ret_var = AnnouncementSignatures_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ChannelReestablish_1write(void* ctx_TODO, uint32_t obj) {
	LDKChannelReestablish obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelReestablish_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ChannelReestablish_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_ChannelReestablishDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelReestablishDecodeErrorZ), "LDKCResult_ChannelReestablishDecodeErrorZ");
	*ret_conv = ChannelReestablish_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray ClosingSigned_1write(void* ctx_TODO, uint32_t obj) {
	LDKClosingSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ClosingSigned_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ClosingSigned_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKClosingSigned ret_var = ClosingSigned_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray CommitmentSigned_1write(void* ctx_TODO, uint32_t obj) {
	LDKCommitmentSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = CommitmentSigned_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t CommitmentSigned_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCommitmentSigned ret_var = CommitmentSigned_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray FundingCreated_1write(void* ctx_TODO, uint32_t obj) {
	LDKFundingCreated obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = FundingCreated_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t FundingCreated_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKFundingCreated ret_var = FundingCreated_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray FundingSigned_1write(void* ctx_TODO, uint32_t obj) {
	LDKFundingSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = FundingSigned_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t FundingSigned_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKFundingSigned ret_var = FundingSigned_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray FundingLocked_1write(void* ctx_TODO, uint32_t obj) {
	LDKFundingLocked obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = FundingLocked_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t FundingLocked_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKFundingLocked ret_var = FundingLocked_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray Init_1write(void* ctx_TODO, uint32_t obj) {
	LDKInit obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Init_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t Init_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_InitDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InitDecodeErrorZ), "LDKCResult_InitDecodeErrorZ");
	*ret_conv = Init_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray OpenChannel_1write(void* ctx_TODO, uint32_t obj) {
	LDKOpenChannel obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = OpenChannel_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t OpenChannel_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKOpenChannel ret_var = OpenChannel_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray RevokeAndACK_1write(void* ctx_TODO, uint32_t obj) {
	LDKRevokeAndACK obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = RevokeAndACK_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t RevokeAndACK_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKRevokeAndACK ret_var = RevokeAndACK_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray Shutdown_1write(void* ctx_TODO, uint32_t obj) {
	LDKShutdown obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Shutdown_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t Shutdown_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKShutdown ret_var = Shutdown_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UpdateFailHTLC_1write(void* ctx_TODO, uint32_t obj) {
	LDKUpdateFailHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFailHTLC_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t UpdateFailHTLC_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKUpdateFailHTLC ret_var = UpdateFailHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UpdateFailMalformedHTLC_1write(void* ctx_TODO, uint32_t obj) {
	LDKUpdateFailMalformedHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFailMalformedHTLC_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t UpdateFailMalformedHTLC_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKUpdateFailMalformedHTLC ret_var = UpdateFailMalformedHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UpdateFee_1write(void* ctx_TODO, uint32_t obj) {
	LDKUpdateFee obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFee_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t UpdateFee_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKUpdateFee ret_var = UpdateFee_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UpdateFulfillHTLC_1write(void* ctx_TODO, uint32_t obj) {
	LDKUpdateFulfillHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFulfillHTLC_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t UpdateFulfillHTLC_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKUpdateFulfillHTLC ret_var = UpdateFulfillHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UpdateAddHTLC_1write(void* ctx_TODO, uint32_t obj) {
	LDKUpdateAddHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateAddHTLC_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t UpdateAddHTLC_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKUpdateAddHTLC ret_var = UpdateAddHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray Ping_1write(void* ctx_TODO, uint32_t obj) {
	LDKPing obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Ping_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t Ping_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_PingDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PingDecodeErrorZ), "LDKCResult_PingDecodeErrorZ");
	*ret_conv = Ping_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray Pong_1write(void* ctx_TODO, uint32_t obj) {
	LDKPong obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Pong_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t Pong_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_PongDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PongDecodeErrorZ), "LDKCResult_PongDecodeErrorZ");
	*ret_conv = Pong_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray UnsignedChannelAnnouncement_1write(void* ctx_TODO, uint32_t obj) {
	LDKUnsignedChannelAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UnsignedChannelAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t UnsignedChannelAnnouncement_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ), "LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ");
	*ret_conv = UnsignedChannelAnnouncement_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray ChannelAnnouncement_1write(void* ctx_TODO, uint32_t obj) {
	LDKChannelAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ChannelAnnouncement_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKChannelAnnouncement ret_var = ChannelAnnouncement_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray UnsignedChannelUpdate_1write(void* ctx_TODO, uint32_t obj) {
	LDKUnsignedChannelUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UnsignedChannelUpdate_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t UnsignedChannelUpdate_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelUpdateDecodeErrorZ), "LDKCResult_UnsignedChannelUpdateDecodeErrorZ");
	*ret_conv = UnsignedChannelUpdate_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray ChannelUpdate_1write(void* ctx_TODO, uint32_t obj) {
	LDKChannelUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelUpdate_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ChannelUpdate_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKChannelUpdate ret_var = ChannelUpdate_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ErrorMessage_1write(void* ctx_TODO, uint32_t obj) {
	LDKErrorMessage obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ErrorMessage_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ErrorMessage_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_ErrorMessageDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ErrorMessageDecodeErrorZ), "LDKCResult_ErrorMessageDecodeErrorZ");
	*ret_conv = ErrorMessage_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray UnsignedNodeAnnouncement_1write(void* ctx_TODO, uint32_t obj) {
	LDKUnsignedNodeAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UnsignedNodeAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t UnsignedNodeAnnouncement_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ), "LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ");
	*ret_conv = UnsignedNodeAnnouncement_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray NodeAnnouncement_1write(void* ctx_TODO, uint32_t obj) {
	LDKNodeAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NodeAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t NodeAnnouncement_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKNodeAnnouncement ret_var = NodeAnnouncement_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t QueryShortChannelIds_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_QueryShortChannelIdsDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryShortChannelIdsDecodeErrorZ), "LDKCResult_QueryShortChannelIdsDecodeErrorZ");
	*ret_conv = QueryShortChannelIds_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray QueryShortChannelIds_1write(void* ctx_TODO, uint32_t obj) {
	LDKQueryShortChannelIds obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = QueryShortChannelIds_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ReplyShortChannelIdsEnd_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ), "LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ");
	*ret_conv = ReplyShortChannelIdsEnd_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray ReplyShortChannelIdsEnd_1write(void* ctx_TODO, uint32_t obj) {
	LDKReplyShortChannelIdsEnd obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ReplyShortChannelIdsEnd_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t QueryChannelRange_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_QueryChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryChannelRangeDecodeErrorZ), "LDKCResult_QueryChannelRangeDecodeErrorZ");
	*ret_conv = QueryChannelRange_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray QueryChannelRange_1write(void* ctx_TODO, uint32_t obj) {
	LDKQueryChannelRange obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = QueryChannelRange_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ReplyChannelRange_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_ReplyChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyChannelRangeDecodeErrorZ), "LDKCResult_ReplyChannelRangeDecodeErrorZ");
	*ret_conv = ReplyChannelRange_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray ReplyChannelRange_1write(void* ctx_TODO, uint32_t obj) {
	LDKReplyChannelRange obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ReplyChannelRange_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t GossipTimestampFilter_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_GossipTimestampFilterDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_GossipTimestampFilterDecodeErrorZ), "LDKCResult_GossipTimestampFilterDecodeErrorZ");
	*ret_conv = GossipTimestampFilter_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray GossipTimestampFilter_1write(void* ctx_TODO, uint32_t obj) {
	LDKGossipTimestampFilter obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = GossipTimestampFilter_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

void MessageHandler_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MessageHandler_free(this_ptr_conv);
}

uint32_t MessageHandler_1get_1chan_1handler(void* ctx_TODO, uint32_t this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)MessageHandler_get_chan_handler(&this_ptr_conv);
	return ret_ret;
}

void MessageHandler_1set_1chan_1handler(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelMessageHandler val_conv = *(LDKChannelMessageHandler*)val;
	MessageHandler_set_chan_handler(&this_ptr_conv, val_conv);
}

uint32_t MessageHandler_1get_1route_1handler(void* ctx_TODO, uint32_t this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)MessageHandler_get_route_handler(&this_ptr_conv);
	return ret_ret;
}

void MessageHandler_1set_1route_1handler(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingMessageHandler val_conv = *(LDKRoutingMessageHandler*)val;
	MessageHandler_set_route_handler(&this_ptr_conv, val_conv);
}

uint32_t MessageHandler_1new(void* ctx_TODO, uint32_t chan_handler_arg, uint32_t route_handler_arg) {
	LDKChannelMessageHandler chan_handler_arg_conv = *(LDKChannelMessageHandler*)chan_handler_arg;
	LDKRoutingMessageHandler route_handler_arg_conv = *(LDKRoutingMessageHandler*)route_handler_arg;
	LDKMessageHandler ret_var = MessageHandler_new(chan_handler_arg_conv, route_handler_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t SocketDescriptor_1clone(void* ctx_TODO, uint32_t orig) {
	LDKSocketDescriptor* orig_conv = (LDKSocketDescriptor*)orig;
	LDKSocketDescriptor* ret = MALLOC(sizeof(LDKSocketDescriptor), "LDKSocketDescriptor");
	*ret = SocketDescriptor_clone(orig_conv);
	return (long)ret;
}

void SocketDescriptor_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKSocketDescriptor this_ptr_conv = *(LDKSocketDescriptor*)this_ptr;
	FREE((void*)this_ptr);
	SocketDescriptor_free(this_ptr_conv);
}

void PeerHandleError_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PeerHandleError_free(this_ptr_conv);
}

jboolean PeerHandleError_1get_1no_1connection_1possible(void* ctx_TODO, uint32_t this_ptr) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = PeerHandleError_get_no_connection_possible(&this_ptr_conv);
	return ret_val;
}

void PeerHandleError_1set_1no_1connection_1possible(void* ctx_TODO, uint32_t this_ptr, jboolean val) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	PeerHandleError_set_no_connection_possible(&this_ptr_conv, val);
}

uint32_t PeerHandleError_1new(void* ctx_TODO, jboolean no_connection_possible_arg) {
	LDKPeerHandleError ret_var = PeerHandleError_new(no_connection_possible_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void PeerManager_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKPeerManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PeerManager_free(this_ptr_conv);
}

uint32_t PeerManager_1new(void* ctx_TODO, uint32_t message_handler, int8_tArray our_node_secret, int8_tArray ephemeral_random_data, uint32_t logger) {
	LDKMessageHandler message_handler_conv;
	message_handler_conv.inner = (void*)(message_handler & (~1));
	message_handler_conv.is_owned = (message_handler & 1) || (message_handler == 0);
	// Warning: we may need a move here but can't clone!
	LDKSecretKey our_node_secret_ref;
	CHECK(*our_node_secret.len == 32);
	memcpy(our_node_secret_ref.bytes, our_node_secret.len + 1, 32);
	unsigned char ephemeral_random_data_arr[32];
	CHECK(*ephemeral_random_data.len == 32);
	memcpy(ephemeral_random_data_arr, ephemeral_random_data.len + 1, 32);
	unsigned char (*ephemeral_random_data_ref)[32] = &ephemeral_random_data_arr;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKPeerManager ret_var = PeerManager_new(message_handler_conv, our_node_secret_ref, ephemeral_random_data_ref, logger_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

ptrArray PeerManager_1get_1peer_1node_1ids(void* ctx_TODO, uint32_t this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_PublicKeyZ ret_var = PeerManager_get_peer_node_ids(&this_arg_conv);
	ptrArray ret_arr = { .len = MALLOC(ret_var.datalen * sizeof(int32_t) + sizeof(uint32_t), "Native Object Bytes") };
	int8_tArray *ret_arr_ptr = (int8_tArray*)(ret_arr.len + 1);
	for (size_t m = 0; m < ret_var.datalen; m++) {
		int8_tArray arr_conv_12_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
		memcpy(arr_conv_12_arr.len + 1, ret_var.data[m].compressed_form, 33);
		ret_arr_ptr[m] = arr_conv_12_arr;
	}
	FREE(ret_var.data);
	return ret_arr;
}

uint32_t PeerManager_1new_1outbound_1connection(void* ctx_TODO, uint32_t this_arg, int8_tArray their_node_id, uint32_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKPublicKey their_node_id_ref;
	CHECK(*their_node_id.len == 33);
	memcpy(their_node_id_ref.compressed_form, their_node_id.len + 1, 33);
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)descriptor;
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret_conv = PeerManager_new_outbound_connection(&this_arg_conv, their_node_id_ref, descriptor_conv);
	return (long)ret_conv;
}

uint32_t PeerManager_1new_1inbound_1connection(void* ctx_TODO, uint32_t this_arg, uint32_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)descriptor;
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = PeerManager_new_inbound_connection(&this_arg_conv, descriptor_conv);
	return (long)ret_conv;
}

uint32_t PeerManager_1write_1buffer_1space_1avail(void* ctx_TODO, uint32_t this_arg, uint32_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = PeerManager_write_buffer_space_avail(&this_arg_conv, descriptor_conv);
	return (long)ret_conv;
}

uint32_t PeerManager_1read_1event(void* ctx_TODO, uint32_t this_arg, uint32_t peer_descriptor, int8_tArray data) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor* peer_descriptor_conv = (LDKSocketDescriptor*)peer_descriptor;
	LDKu8slice data_ref;
	data_ref.datalen = *data.len;
	data_ref.data = (int8_t*)(data.len + 1);
	LDKCResult_boolPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret_conv = PeerManager_read_event(&this_arg_conv, peer_descriptor_conv, data_ref);
	return (long)ret_conv;
}

void PeerManager_1process_1events(void* ctx_TODO, uint32_t this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	PeerManager_process_events(&this_arg_conv);
}

void PeerManager_1socket_1disconnected(void* ctx_TODO, uint32_t this_arg, uint32_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	PeerManager_socket_disconnected(&this_arg_conv, descriptor_conv);
}

void PeerManager_1timer_1tick_1occured(void* ctx_TODO, uint32_t this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	PeerManager_timer_tick_occured(&this_arg_conv);
}

int8_tArray build_1commitment_1secret(void* ctx_TODO, int8_tArray commitment_seed, int64_t idx) {
	unsigned char commitment_seed_arr[32];
	CHECK(*commitment_seed.len == 32);
	memcpy(commitment_seed_arr, commitment_seed.len + 1, 32);
	unsigned char (*commitment_seed_ref)[32] = &commitment_seed_arr;
	int8_tArray arg_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, build_commitment_secret(commitment_seed_ref, idx).data, 32);
	return arg_arr;
}

uint32_t derive_1private_1key(void* ctx_TODO, int8_tArray per_commitment_point, int8_tArray base_secret) {
	LDKPublicKey per_commitment_point_ref;
	CHECK(*per_commitment_point.len == 33);
	memcpy(per_commitment_point_ref.compressed_form, per_commitment_point.len + 1, 33);
	unsigned char base_secret_arr[32];
	CHECK(*base_secret.len == 32);
	memcpy(base_secret_arr, base_secret.len + 1, 32);
	unsigned char (*base_secret_ref)[32] = &base_secret_arr;
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = derive_private_key(per_commitment_point_ref, base_secret_ref);
	return (long)ret_conv;
}

uint32_t derive_1public_1key(void* ctx_TODO, int8_tArray per_commitment_point, int8_tArray base_point) {
	LDKPublicKey per_commitment_point_ref;
	CHECK(*per_commitment_point.len == 33);
	memcpy(per_commitment_point_ref.compressed_form, per_commitment_point.len + 1, 33);
	LDKPublicKey base_point_ref;
	CHECK(*base_point.len == 33);
	memcpy(base_point_ref.compressed_form, base_point.len + 1, 33);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = derive_public_key(per_commitment_point_ref, base_point_ref);
	return (long)ret_conv;
}

uint32_t derive_1private_1revocation_1key(void* ctx_TODO, int8_tArray per_commitment_secret, int8_tArray countersignatory_revocation_base_secret) {
	unsigned char per_commitment_secret_arr[32];
	CHECK(*per_commitment_secret.len == 32);
	memcpy(per_commitment_secret_arr, per_commitment_secret.len + 1, 32);
	unsigned char (*per_commitment_secret_ref)[32] = &per_commitment_secret_arr;
	unsigned char countersignatory_revocation_base_secret_arr[32];
	CHECK(*countersignatory_revocation_base_secret.len == 32);
	memcpy(countersignatory_revocation_base_secret_arr, countersignatory_revocation_base_secret.len + 1, 32);
	unsigned char (*countersignatory_revocation_base_secret_ref)[32] = &countersignatory_revocation_base_secret_arr;
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = derive_private_revocation_key(per_commitment_secret_ref, countersignatory_revocation_base_secret_ref);
	return (long)ret_conv;
}

uint32_t derive_1public_1revocation_1key(void* ctx_TODO, int8_tArray per_commitment_point, int8_tArray countersignatory_revocation_base_point) {
	LDKPublicKey per_commitment_point_ref;
	CHECK(*per_commitment_point.len == 33);
	memcpy(per_commitment_point_ref.compressed_form, per_commitment_point.len + 1, 33);
	LDKPublicKey countersignatory_revocation_base_point_ref;
	CHECK(*countersignatory_revocation_base_point.len == 33);
	memcpy(countersignatory_revocation_base_point_ref.compressed_form, countersignatory_revocation_base_point.len + 1, 33);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = derive_public_revocation_key(per_commitment_point_ref, countersignatory_revocation_base_point_ref);
	return (long)ret_conv;
}

void TxCreationKeys_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	TxCreationKeys_free(this_ptr_conv);
}

uint32_t TxCreationKeys_1clone(void* ctx_TODO, uint32_t orig) {
	LDKTxCreationKeys orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKTxCreationKeys ret_var = TxCreationKeys_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray TxCreationKeys_1get_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, TxCreationKeys_get_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void TxCreationKeys_1set_1per_1commitment_1point(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	TxCreationKeys_set_per_commitment_point(&this_ptr_conv, val_ref);
}

int8_tArray TxCreationKeys_1get_1revocation_1key(void* ctx_TODO, uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, TxCreationKeys_get_revocation_key(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void TxCreationKeys_1set_1revocation_1key(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	TxCreationKeys_set_revocation_key(&this_ptr_conv, val_ref);
}

int8_tArray TxCreationKeys_1get_1broadcaster_1htlc_1key(void* ctx_TODO, uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, TxCreationKeys_get_broadcaster_htlc_key(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void TxCreationKeys_1set_1broadcaster_1htlc_1key(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	TxCreationKeys_set_broadcaster_htlc_key(&this_ptr_conv, val_ref);
}

int8_tArray TxCreationKeys_1get_1countersignatory_1htlc_1key(void* ctx_TODO, uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, TxCreationKeys_get_countersignatory_htlc_key(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void TxCreationKeys_1set_1countersignatory_1htlc_1key(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	TxCreationKeys_set_countersignatory_htlc_key(&this_ptr_conv, val_ref);
}

int8_tArray TxCreationKeys_1get_1broadcaster_1delayed_1payment_1key(void* ctx_TODO, uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, TxCreationKeys_get_broadcaster_delayed_payment_key(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void TxCreationKeys_1set_1broadcaster_1delayed_1payment_1key(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	TxCreationKeys_set_broadcaster_delayed_payment_key(&this_ptr_conv, val_ref);
}

uint32_t TxCreationKeys_1new(void* ctx_TODO, int8_tArray per_commitment_point_arg, int8_tArray revocation_key_arg, int8_tArray broadcaster_htlc_key_arg, int8_tArray countersignatory_htlc_key_arg, int8_tArray broadcaster_delayed_payment_key_arg) {
	LDKPublicKey per_commitment_point_arg_ref;
	CHECK(*per_commitment_point_arg.len == 33);
	memcpy(per_commitment_point_arg_ref.compressed_form, per_commitment_point_arg.len + 1, 33);
	LDKPublicKey revocation_key_arg_ref;
	CHECK(*revocation_key_arg.len == 33);
	memcpy(revocation_key_arg_ref.compressed_form, revocation_key_arg.len + 1, 33);
	LDKPublicKey broadcaster_htlc_key_arg_ref;
	CHECK(*broadcaster_htlc_key_arg.len == 33);
	memcpy(broadcaster_htlc_key_arg_ref.compressed_form, broadcaster_htlc_key_arg.len + 1, 33);
	LDKPublicKey countersignatory_htlc_key_arg_ref;
	CHECK(*countersignatory_htlc_key_arg.len == 33);
	memcpy(countersignatory_htlc_key_arg_ref.compressed_form, countersignatory_htlc_key_arg.len + 1, 33);
	LDKPublicKey broadcaster_delayed_payment_key_arg_ref;
	CHECK(*broadcaster_delayed_payment_key_arg.len == 33);
	memcpy(broadcaster_delayed_payment_key_arg_ref.compressed_form, broadcaster_delayed_payment_key_arg.len + 1, 33);
	LDKTxCreationKeys ret_var = TxCreationKeys_new(per_commitment_point_arg_ref, revocation_key_arg_ref, broadcaster_htlc_key_arg_ref, countersignatory_htlc_key_arg_ref, broadcaster_delayed_payment_key_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray TxCreationKeys_1write(void* ctx_TODO, uint32_t obj) {
	LDKTxCreationKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = TxCreationKeys_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t TxCreationKeys_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKTxCreationKeys ret_var = TxCreationKeys_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelPublicKeys_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelPublicKeys_free(this_ptr_conv);
}

uint32_t ChannelPublicKeys_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelPublicKeys orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = ChannelPublicKeys_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ChannelPublicKeys_1get_1funding_1pubkey(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelPublicKeys_get_funding_pubkey(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void ChannelPublicKeys_1set_1funding_1pubkey(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	ChannelPublicKeys_set_funding_pubkey(&this_ptr_conv, val_ref);
}

int8_tArray ChannelPublicKeys_1get_1revocation_1basepoint(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelPublicKeys_get_revocation_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void ChannelPublicKeys_1set_1revocation_1basepoint(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	ChannelPublicKeys_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray ChannelPublicKeys_1get_1payment_1point(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelPublicKeys_get_payment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void ChannelPublicKeys_1set_1payment_1point(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	ChannelPublicKeys_set_payment_point(&this_ptr_conv, val_ref);
}

int8_tArray ChannelPublicKeys_1get_1delayed_1payment_1basepoint(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelPublicKeys_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void ChannelPublicKeys_1set_1delayed_1payment_1basepoint(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	ChannelPublicKeys_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray ChannelPublicKeys_1get_1htlc_1basepoint(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelPublicKeys_get_htlc_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void ChannelPublicKeys_1set_1htlc_1basepoint(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	ChannelPublicKeys_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

uint32_t ChannelPublicKeys_1new(void* ctx_TODO, int8_tArray funding_pubkey_arg, int8_tArray revocation_basepoint_arg, int8_tArray payment_point_arg, int8_tArray delayed_payment_basepoint_arg, int8_tArray htlc_basepoint_arg) {
	LDKPublicKey funding_pubkey_arg_ref;
	CHECK(*funding_pubkey_arg.len == 33);
	memcpy(funding_pubkey_arg_ref.compressed_form, funding_pubkey_arg.len + 1, 33);
	LDKPublicKey revocation_basepoint_arg_ref;
	CHECK(*revocation_basepoint_arg.len == 33);
	memcpy(revocation_basepoint_arg_ref.compressed_form, revocation_basepoint_arg.len + 1, 33);
	LDKPublicKey payment_point_arg_ref;
	CHECK(*payment_point_arg.len == 33);
	memcpy(payment_point_arg_ref.compressed_form, payment_point_arg.len + 1, 33);
	LDKPublicKey delayed_payment_basepoint_arg_ref;
	CHECK(*delayed_payment_basepoint_arg.len == 33);
	memcpy(delayed_payment_basepoint_arg_ref.compressed_form, delayed_payment_basepoint_arg.len + 1, 33);
	LDKPublicKey htlc_basepoint_arg_ref;
	CHECK(*htlc_basepoint_arg.len == 33);
	memcpy(htlc_basepoint_arg_ref.compressed_form, htlc_basepoint_arg.len + 1, 33);
	LDKChannelPublicKeys ret_var = ChannelPublicKeys_new(funding_pubkey_arg_ref, revocation_basepoint_arg_ref, payment_point_arg_ref, delayed_payment_basepoint_arg_ref, htlc_basepoint_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ChannelPublicKeys_1write(void* ctx_TODO, uint32_t obj) {
	LDKChannelPublicKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelPublicKeys_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ChannelPublicKeys_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKChannelPublicKeys ret_var = ChannelPublicKeys_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t TxCreationKeys_1derive_1new(void* ctx_TODO, int8_tArray per_commitment_point, int8_tArray broadcaster_delayed_payment_base, int8_tArray broadcaster_htlc_base, int8_tArray countersignatory_revocation_base, int8_tArray countersignatory_htlc_base) {
	LDKPublicKey per_commitment_point_ref;
	CHECK(*per_commitment_point.len == 33);
	memcpy(per_commitment_point_ref.compressed_form, per_commitment_point.len + 1, 33);
	LDKPublicKey broadcaster_delayed_payment_base_ref;
	CHECK(*broadcaster_delayed_payment_base.len == 33);
	memcpy(broadcaster_delayed_payment_base_ref.compressed_form, broadcaster_delayed_payment_base.len + 1, 33);
	LDKPublicKey broadcaster_htlc_base_ref;
	CHECK(*broadcaster_htlc_base.len == 33);
	memcpy(broadcaster_htlc_base_ref.compressed_form, broadcaster_htlc_base.len + 1, 33);
	LDKPublicKey countersignatory_revocation_base_ref;
	CHECK(*countersignatory_revocation_base.len == 33);
	memcpy(countersignatory_revocation_base_ref.compressed_form, countersignatory_revocation_base.len + 1, 33);
	LDKPublicKey countersignatory_htlc_base_ref;
	CHECK(*countersignatory_htlc_base.len == 33);
	memcpy(countersignatory_htlc_base_ref.compressed_form, countersignatory_htlc_base.len + 1, 33);
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = TxCreationKeys_derive_new(per_commitment_point_ref, broadcaster_delayed_payment_base_ref, broadcaster_htlc_base_ref, countersignatory_revocation_base_ref, countersignatory_htlc_base_ref);
	return (long)ret_conv;
}

uint32_t TxCreationKeys_1from_1channel_1static_1keys(void* ctx_TODO, int8_tArray per_commitment_point, uint32_t broadcaster_keys, uint32_t countersignatory_keys) {
	LDKPublicKey per_commitment_point_ref;
	CHECK(*per_commitment_point.len == 33);
	memcpy(per_commitment_point_ref.compressed_form, per_commitment_point.len + 1, 33);
	LDKChannelPublicKeys broadcaster_keys_conv;
	broadcaster_keys_conv.inner = (void*)(broadcaster_keys & (~1));
	broadcaster_keys_conv.is_owned = false;
	LDKChannelPublicKeys countersignatory_keys_conv;
	countersignatory_keys_conv.inner = (void*)(countersignatory_keys & (~1));
	countersignatory_keys_conv.is_owned = false;
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = TxCreationKeys_from_channel_static_keys(per_commitment_point_ref, &broadcaster_keys_conv, &countersignatory_keys_conv);
	return (long)ret_conv;
}

int8_tArray get_1revokeable_1redeemscript(void* ctx_TODO, int8_tArray revocation_key, int16_t contest_delay, int8_tArray broadcaster_delayed_payment_key) {
	LDKPublicKey revocation_key_ref;
	CHECK(*revocation_key.len == 33);
	memcpy(revocation_key_ref.compressed_form, revocation_key.len + 1, 33);
	LDKPublicKey broadcaster_delayed_payment_key_ref;
	CHECK(*broadcaster_delayed_payment_key.len == 33);
	memcpy(broadcaster_delayed_payment_key_ref.compressed_form, broadcaster_delayed_payment_key.len + 1, 33);
	LDKCVec_u8Z arg_var = get_revokeable_redeemscript(revocation_key_ref, contest_delay, broadcaster_delayed_payment_key_ref);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

void HTLCOutputInCommitment_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCOutputInCommitment_free(this_ptr_conv);
}

uint32_t HTLCOutputInCommitment_1clone(void* ctx_TODO, uint32_t orig) {
	LDKHTLCOutputInCommitment orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKHTLCOutputInCommitment ret_var = HTLCOutputInCommitment_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

jboolean HTLCOutputInCommitment_1get_1offered(void* ctx_TODO, uint32_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = HTLCOutputInCommitment_get_offered(&this_ptr_conv);
	return ret_val;
}

void HTLCOutputInCommitment_1set_1offered(void* ctx_TODO, uint32_t this_ptr, jboolean val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	HTLCOutputInCommitment_set_offered(&this_ptr_conv, val);
}

int64_t HTLCOutputInCommitment_1get_1amount_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = HTLCOutputInCommitment_get_amount_msat(&this_ptr_conv);
	return ret_val;
}

void HTLCOutputInCommitment_1set_1amount_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	HTLCOutputInCommitment_set_amount_msat(&this_ptr_conv, val);
}

int32_t HTLCOutputInCommitment_1get_1cltv_1expiry(void* ctx_TODO, uint32_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = HTLCOutputInCommitment_get_cltv_expiry(&this_ptr_conv);
	return ret_val;
}

void HTLCOutputInCommitment_1set_1cltv_1expiry(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	HTLCOutputInCommitment_set_cltv_expiry(&this_ptr_conv, val);
}

int8_tArray HTLCOutputInCommitment_1get_1payment_1hash(void* ctx_TODO, uint32_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *HTLCOutputInCommitment_get_payment_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void HTLCOutputInCommitment_1set_1payment_1hash(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	HTLCOutputInCommitment_set_payment_hash(&this_ptr_conv, val_ref);
}

int8_tArray HTLCOutputInCommitment_1write(void* ctx_TODO, uint32_t obj) {
	LDKHTLCOutputInCommitment obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = HTLCOutputInCommitment_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t HTLCOutputInCommitment_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKHTLCOutputInCommitment ret_var = HTLCOutputInCommitment_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray get_1htlc_1redeemscript(void* ctx_TODO, uint32_t htlc, uint32_t keys) {
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKTxCreationKeys keys_conv;
	keys_conv.inner = (void*)(keys & (~1));
	keys_conv.is_owned = false;
	LDKCVec_u8Z arg_var = get_htlc_redeemscript(&htlc_conv, &keys_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

int8_tArray make_1funding_1redeemscript(void* ctx_TODO, int8_tArray broadcaster, int8_tArray countersignatory) {
	LDKPublicKey broadcaster_ref;
	CHECK(*broadcaster.len == 33);
	memcpy(broadcaster_ref.compressed_form, broadcaster.len + 1, 33);
	LDKPublicKey countersignatory_ref;
	CHECK(*countersignatory.len == 33);
	memcpy(countersignatory_ref.compressed_form, countersignatory.len + 1, 33);
	LDKCVec_u8Z arg_var = make_funding_redeemscript(broadcaster_ref, countersignatory_ref);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

int8_tArray build_1htlc_1transaction(void* ctx_TODO, int8_tArray prev_hash, int32_t feerate_per_kw, int16_t contest_delay, uint32_t htlc, int8_tArray broadcaster_delayed_payment_key, int8_tArray revocation_key) {
	unsigned char prev_hash_arr[32];
	CHECK(*prev_hash.len == 32);
	memcpy(prev_hash_arr, prev_hash.len + 1, 32);
	unsigned char (*prev_hash_ref)[32] = &prev_hash_arr;
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKPublicKey broadcaster_delayed_payment_key_ref;
	CHECK(*broadcaster_delayed_payment_key.len == 33);
	memcpy(broadcaster_delayed_payment_key_ref.compressed_form, broadcaster_delayed_payment_key.len + 1, 33);
	LDKPublicKey revocation_key_ref;
	CHECK(*revocation_key.len == 33);
	memcpy(revocation_key_ref.compressed_form, revocation_key.len + 1, 33);
	LDKTransaction arg_var = build_htlc_transaction(prev_hash_ref, feerate_per_kw, contest_delay, &htlc_conv, broadcaster_delayed_payment_key_ref, revocation_key_ref);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	Transaction_free(arg_var);
	return arg_arr;
}

void ChannelTransactionParameters_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelTransactionParameters_free(this_ptr_conv);
}

uint32_t ChannelTransactionParameters_1clone(void* ctx_TODO, uint32_t orig) {
	LDKChannelTransactionParameters orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelTransactionParameters ret_var = ChannelTransactionParameters_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t ChannelTransactionParameters_1get_1holder_1pubkeys(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = ChannelTransactionParameters_get_holder_pubkeys(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelTransactionParameters_1set_1holder_1pubkeys(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelPublicKeys val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelPublicKeys_clone(&val_conv);
	ChannelTransactionParameters_set_holder_pubkeys(&this_ptr_conv, val_conv);
}

int16_t ChannelTransactionParameters_1get_1holder_1selected_1contest_1delay(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelTransactionParameters_get_holder_selected_contest_delay(&this_ptr_conv);
	return ret_val;
}

void ChannelTransactionParameters_1set_1holder_1selected_1contest_1delay(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelTransactionParameters_set_holder_selected_contest_delay(&this_ptr_conv, val);
}

jboolean ChannelTransactionParameters_1get_1is_1outbound_1from_1holder(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelTransactionParameters_get_is_outbound_from_holder(&this_ptr_conv);
	return ret_val;
}

void ChannelTransactionParameters_1set_1is_1outbound_1from_1holder(void* ctx_TODO, uint32_t this_ptr, jboolean val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelTransactionParameters_set_is_outbound_from_holder(&this_ptr_conv, val);
}

uint32_t ChannelTransactionParameters_1get_1counterparty_1parameters(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCounterpartyChannelTransactionParameters ret_var = ChannelTransactionParameters_get_counterparty_parameters(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelTransactionParameters_1set_1counterparty_1parameters(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCounterpartyChannelTransactionParameters val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = CounterpartyChannelTransactionParameters_clone(&val_conv);
	ChannelTransactionParameters_set_counterparty_parameters(&this_ptr_conv, val_conv);
}

uint32_t ChannelTransactionParameters_1get_1funding_1outpoint(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKOutPoint ret_var = ChannelTransactionParameters_get_funding_outpoint(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelTransactionParameters_1set_1funding_1outpoint(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKOutPoint val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = OutPoint_clone(&val_conv);
	ChannelTransactionParameters_set_funding_outpoint(&this_ptr_conv, val_conv);
}

uint32_t ChannelTransactionParameters_1new(void* ctx_TODO, uint32_t holder_pubkeys_arg, int16_t holder_selected_contest_delay_arg, jboolean is_outbound_from_holder_arg, uint32_t counterparty_parameters_arg, uint32_t funding_outpoint_arg) {
	LDKChannelPublicKeys holder_pubkeys_arg_conv;
	holder_pubkeys_arg_conv.inner = (void*)(holder_pubkeys_arg & (~1));
	holder_pubkeys_arg_conv.is_owned = (holder_pubkeys_arg & 1) || (holder_pubkeys_arg == 0);
	if (holder_pubkeys_arg_conv.inner != NULL)
		holder_pubkeys_arg_conv = ChannelPublicKeys_clone(&holder_pubkeys_arg_conv);
	LDKCounterpartyChannelTransactionParameters counterparty_parameters_arg_conv;
	counterparty_parameters_arg_conv.inner = (void*)(counterparty_parameters_arg & (~1));
	counterparty_parameters_arg_conv.is_owned = (counterparty_parameters_arg & 1) || (counterparty_parameters_arg == 0);
	if (counterparty_parameters_arg_conv.inner != NULL)
		counterparty_parameters_arg_conv = CounterpartyChannelTransactionParameters_clone(&counterparty_parameters_arg_conv);
	LDKOutPoint funding_outpoint_arg_conv;
	funding_outpoint_arg_conv.inner = (void*)(funding_outpoint_arg & (~1));
	funding_outpoint_arg_conv.is_owned = (funding_outpoint_arg & 1) || (funding_outpoint_arg == 0);
	if (funding_outpoint_arg_conv.inner != NULL)
		funding_outpoint_arg_conv = OutPoint_clone(&funding_outpoint_arg_conv);
	LDKChannelTransactionParameters ret_var = ChannelTransactionParameters_new(holder_pubkeys_arg_conv, holder_selected_contest_delay_arg, is_outbound_from_holder_arg, counterparty_parameters_arg_conv, funding_outpoint_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void CounterpartyChannelTransactionParameters_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CounterpartyChannelTransactionParameters_free(this_ptr_conv);
}

uint32_t CounterpartyChannelTransactionParameters_1clone(void* ctx_TODO, uint32_t orig) {
	LDKCounterpartyChannelTransactionParameters orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKCounterpartyChannelTransactionParameters ret_var = CounterpartyChannelTransactionParameters_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t CounterpartyChannelTransactionParameters_1get_1pubkeys(void* ctx_TODO, uint32_t this_ptr) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = CounterpartyChannelTransactionParameters_get_pubkeys(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void CounterpartyChannelTransactionParameters_1set_1pubkeys(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelPublicKeys val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelPublicKeys_clone(&val_conv);
	CounterpartyChannelTransactionParameters_set_pubkeys(&this_ptr_conv, val_conv);
}

int16_t CounterpartyChannelTransactionParameters_1get_1selected_1contest_1delay(void* ctx_TODO, uint32_t this_ptr) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = CounterpartyChannelTransactionParameters_get_selected_contest_delay(&this_ptr_conv);
	return ret_val;
}

void CounterpartyChannelTransactionParameters_1set_1selected_1contest_1delay(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	CounterpartyChannelTransactionParameters_set_selected_contest_delay(&this_ptr_conv, val);
}

uint32_t CounterpartyChannelTransactionParameters_1new(void* ctx_TODO, uint32_t pubkeys_arg, int16_t selected_contest_delay_arg) {
	LDKChannelPublicKeys pubkeys_arg_conv;
	pubkeys_arg_conv.inner = (void*)(pubkeys_arg & (~1));
	pubkeys_arg_conv.is_owned = (pubkeys_arg & 1) || (pubkeys_arg == 0);
	if (pubkeys_arg_conv.inner != NULL)
		pubkeys_arg_conv = ChannelPublicKeys_clone(&pubkeys_arg_conv);
	LDKCounterpartyChannelTransactionParameters ret_var = CounterpartyChannelTransactionParameters_new(pubkeys_arg_conv, selected_contest_delay_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

jboolean ChannelTransactionParameters_1is_1populated(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	jboolean ret_val = ChannelTransactionParameters_is_populated(&this_arg_conv);
	return ret_val;
}

uint32_t ChannelTransactionParameters_1as_1holder_1broadcastable(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKDirectedChannelTransactionParameters ret_var = ChannelTransactionParameters_as_holder_broadcastable(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t ChannelTransactionParameters_1as_1counterparty_1broadcastable(void* ctx_TODO, uint32_t this_arg) {
	LDKChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKDirectedChannelTransactionParameters ret_var = ChannelTransactionParameters_as_counterparty_broadcastable(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray CounterpartyChannelTransactionParameters_1write(void* ctx_TODO, uint32_t obj) {
	LDKCounterpartyChannelTransactionParameters obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = CounterpartyChannelTransactionParameters_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t CounterpartyChannelTransactionParameters_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCounterpartyChannelTransactionParameters ret_var = CounterpartyChannelTransactionParameters_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray ChannelTransactionParameters_1write(void* ctx_TODO, uint32_t obj) {
	LDKChannelTransactionParameters obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelTransactionParameters_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ChannelTransactionParameters_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKChannelTransactionParameters ret_var = ChannelTransactionParameters_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void DirectedChannelTransactionParameters_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKDirectedChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectedChannelTransactionParameters_free(this_ptr_conv);
}

uint32_t DirectedChannelTransactionParameters_1broadcaster_1pubkeys(void* ctx_TODO, uint32_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = DirectedChannelTransactionParameters_broadcaster_pubkeys(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t DirectedChannelTransactionParameters_1countersignatory_1pubkeys(void* ctx_TODO, uint32_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = DirectedChannelTransactionParameters_countersignatory_pubkeys(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int16_t DirectedChannelTransactionParameters_1contest_1delay(void* ctx_TODO, uint32_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int16_t ret_val = DirectedChannelTransactionParameters_contest_delay(&this_arg_conv);
	return ret_val;
}

jboolean DirectedChannelTransactionParameters_1is_1outbound(void* ctx_TODO, uint32_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	jboolean ret_val = DirectedChannelTransactionParameters_is_outbound(&this_arg_conv);
	return ret_val;
}

uint32_t DirectedChannelTransactionParameters_1funding_1outpoint(void* ctx_TODO, uint32_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKOutPoint ret_var = DirectedChannelTransactionParameters_funding_outpoint(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void HolderCommitmentTransaction_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HolderCommitmentTransaction_free(this_ptr_conv);
}

uint32_t HolderCommitmentTransaction_1clone(void* ctx_TODO, uint32_t orig) {
	LDKHolderCommitmentTransaction orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKHolderCommitmentTransaction ret_var = HolderCommitmentTransaction_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray HolderCommitmentTransaction_1get_1counterparty_1sig(void* ctx_TODO, uint32_t this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, HolderCommitmentTransaction_get_counterparty_sig(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void HolderCommitmentTransaction_1set_1counterparty_1sig(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*val.len == 64);
	memcpy(val_ref.compact_form, val.len + 1, 64);
	HolderCommitmentTransaction_set_counterparty_sig(&this_ptr_conv, val_ref);
}

void HolderCommitmentTransaction_1set_1counterparty_1htlc_1sigs(void* ctx_TODO, uint32_t this_ptr, ptrArray val) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_SignatureZ val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		val_constr.data = NULL;
	int8_tArray* val_vals = (int8_tArray*)(val.len + 1);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		int8_tArray arr_conv_12 = val_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*arr_conv_12.len == 64);
		memcpy(arr_conv_12_ref.compact_form, arr_conv_12.len + 1, 64);
		val_constr.data[m] = arr_conv_12_ref;
	}
	HolderCommitmentTransaction_set_counterparty_htlc_sigs(&this_ptr_conv, val_constr);
}

int8_tArray HolderCommitmentTransaction_1write(void* ctx_TODO, uint32_t obj) {
	LDKHolderCommitmentTransaction obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = HolderCommitmentTransaction_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t HolderCommitmentTransaction_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKHolderCommitmentTransaction ret_var = HolderCommitmentTransaction_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t HolderCommitmentTransaction_1new(void* ctx_TODO, uint32_t commitment_tx, int8_tArray counterparty_sig, ptrArray counterparty_htlc_sigs, int8_tArray holder_funding_key, int8_tArray counterparty_funding_key) {
	LDKCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = (commitment_tx & 1) || (commitment_tx == 0);
	if (commitment_tx_conv.inner != NULL)
		commitment_tx_conv = CommitmentTransaction_clone(&commitment_tx_conv);
	LDKSignature counterparty_sig_ref;
	CHECK(*counterparty_sig.len == 64);
	memcpy(counterparty_sig_ref.compact_form, counterparty_sig.len + 1, 64);
	LDKCVec_SignatureZ counterparty_htlc_sigs_constr;
	counterparty_htlc_sigs_constr.datalen = *counterparty_htlc_sigs.len;
	if (counterparty_htlc_sigs_constr.datalen > 0)
		counterparty_htlc_sigs_constr.data = MALLOC(counterparty_htlc_sigs_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		counterparty_htlc_sigs_constr.data = NULL;
	int8_tArray* counterparty_htlc_sigs_vals = (int8_tArray*)(counterparty_htlc_sigs.len + 1);
	for (size_t m = 0; m < counterparty_htlc_sigs_constr.datalen; m++) {
		int8_tArray arr_conv_12 = counterparty_htlc_sigs_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*arr_conv_12.len == 64);
		memcpy(arr_conv_12_ref.compact_form, arr_conv_12.len + 1, 64);
		counterparty_htlc_sigs_constr.data[m] = arr_conv_12_ref;
	}
	LDKPublicKey holder_funding_key_ref;
	CHECK(*holder_funding_key.len == 33);
	memcpy(holder_funding_key_ref.compressed_form, holder_funding_key.len + 1, 33);
	LDKPublicKey counterparty_funding_key_ref;
	CHECK(*counterparty_funding_key.len == 33);
	memcpy(counterparty_funding_key_ref.compressed_form, counterparty_funding_key.len + 1, 33);
	LDKHolderCommitmentTransaction ret_var = HolderCommitmentTransaction_new(commitment_tx_conv, counterparty_sig_ref, counterparty_htlc_sigs_constr, holder_funding_key_ref, counterparty_funding_key_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void BuiltCommitmentTransaction_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	BuiltCommitmentTransaction_free(this_ptr_conv);
}

uint32_t BuiltCommitmentTransaction_1clone(void* ctx_TODO, uint32_t orig) {
	LDKBuiltCommitmentTransaction orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKBuiltCommitmentTransaction ret_var = BuiltCommitmentTransaction_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray BuiltCommitmentTransaction_1get_1transaction(void* ctx_TODO, uint32_t this_ptr) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKTransaction arg_var = BuiltCommitmentTransaction_get_transaction(&this_ptr_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	Transaction_free(arg_var);
	return arg_arr;
}

void BuiltCommitmentTransaction_1set_1transaction(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKTransaction val_ref;
	val_ref.datalen = *val.len;
	val_ref.data = MALLOC(val_ref.datalen, "LDKTransaction Bytes");
	memcpy(val_ref.data, val.len + 1, val_ref.datalen);
	val_ref.data_is_owned = true;
	BuiltCommitmentTransaction_set_transaction(&this_ptr_conv, val_ref);
}

int8_tArray BuiltCommitmentTransaction_1get_1txid(void* ctx_TODO, uint32_t this_ptr) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *BuiltCommitmentTransaction_get_txid(&this_ptr_conv), 32);
	return ret_arr;
}

void BuiltCommitmentTransaction_1set_1txid(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	BuiltCommitmentTransaction_set_txid(&this_ptr_conv, val_ref);
}

uint32_t BuiltCommitmentTransaction_1new(void* ctx_TODO, int8_tArray transaction_arg, int8_tArray txid_arg) {
	LDKTransaction transaction_arg_ref;
	transaction_arg_ref.datalen = *transaction_arg.len;
	transaction_arg_ref.data = MALLOC(transaction_arg_ref.datalen, "LDKTransaction Bytes");
	memcpy(transaction_arg_ref.data, transaction_arg.len + 1, transaction_arg_ref.datalen);
	transaction_arg_ref.data_is_owned = true;
	LDKThirtyTwoBytes txid_arg_ref;
	CHECK(*txid_arg.len == 32);
	memcpy(txid_arg_ref.data, txid_arg.len + 1, 32);
	LDKBuiltCommitmentTransaction ret_var = BuiltCommitmentTransaction_new(transaction_arg_ref, txid_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray BuiltCommitmentTransaction_1write(void* ctx_TODO, uint32_t obj) {
	LDKBuiltCommitmentTransaction obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = BuiltCommitmentTransaction_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t BuiltCommitmentTransaction_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKBuiltCommitmentTransaction ret_var = BuiltCommitmentTransaction_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray BuiltCommitmentTransaction_1get_1sighash_1all(void* ctx_TODO, uint32_t this_arg, int8_tArray funding_redeemscript, int64_t channel_value_satoshis) {
	LDKBuiltCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKu8slice funding_redeemscript_ref;
	funding_redeemscript_ref.datalen = *funding_redeemscript.len;
	funding_redeemscript_ref.data = (int8_t*)(funding_redeemscript.len + 1);
	int8_tArray arg_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, BuiltCommitmentTransaction_get_sighash_all(&this_arg_conv, funding_redeemscript_ref, channel_value_satoshis).data, 32);
	return arg_arr;
}

int8_tArray BuiltCommitmentTransaction_1sign(void* ctx_TODO, uint32_t this_arg, int8_tArray funding_key, int8_tArray funding_redeemscript, int64_t channel_value_satoshis) {
	LDKBuiltCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char funding_key_arr[32];
	CHECK(*funding_key.len == 32);
	memcpy(funding_key_arr, funding_key.len + 1, 32);
	unsigned char (*funding_key_ref)[32] = &funding_key_arr;
	LDKu8slice funding_redeemscript_ref;
	funding_redeemscript_ref.datalen = *funding_redeemscript.len;
	funding_redeemscript_ref.data = (int8_t*)(funding_redeemscript.len + 1);
	int8_tArray arg_arr = { .len = MALLOC(64 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, BuiltCommitmentTransaction_sign(&this_arg_conv, funding_key_ref, funding_redeemscript_ref, channel_value_satoshis).compact_form, 64);
	return arg_arr;
}

void CommitmentTransaction_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentTransaction_free(this_ptr_conv);
}

uint32_t CommitmentTransaction_1clone(void* ctx_TODO, uint32_t orig) {
	LDKCommitmentTransaction orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKCommitmentTransaction ret_var = CommitmentTransaction_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray CommitmentTransaction_1write(void* ctx_TODO, uint32_t obj) {
	LDKCommitmentTransaction obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = CommitmentTransaction_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t CommitmentTransaction_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCommitmentTransaction ret_var = CommitmentTransaction_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int64_t CommitmentTransaction_1commitment_1number(void* ctx_TODO, uint32_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = CommitmentTransaction_commitment_number(&this_arg_conv);
	return ret_val;
}

int64_t CommitmentTransaction_1to_1broadcaster_1value_1sat(void* ctx_TODO, uint32_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = CommitmentTransaction_to_broadcaster_value_sat(&this_arg_conv);
	return ret_val;
}

int64_t CommitmentTransaction_1to_1countersignatory_1value_1sat(void* ctx_TODO, uint32_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = CommitmentTransaction_to_countersignatory_value_sat(&this_arg_conv);
	return ret_val;
}

int32_t CommitmentTransaction_1feerate_1per_1kw(void* ctx_TODO, uint32_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int32_t ret_val = CommitmentTransaction_feerate_per_kw(&this_arg_conv);
	return ret_val;
}

uint32_t CommitmentTransaction_1trust(void* ctx_TODO, uint32_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKTrustedCommitmentTransaction ret_var = CommitmentTransaction_trust(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t CommitmentTransaction_1verify(void* ctx_TODO, uint32_t this_arg, uint32_t channel_parameters, uint32_t broadcaster_keys, uint32_t countersignatory_keys) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKDirectedChannelTransactionParameters channel_parameters_conv;
	channel_parameters_conv.inner = (void*)(channel_parameters & (~1));
	channel_parameters_conv.is_owned = false;
	LDKChannelPublicKeys broadcaster_keys_conv;
	broadcaster_keys_conv.inner = (void*)(broadcaster_keys & (~1));
	broadcaster_keys_conv.is_owned = false;
	LDKChannelPublicKeys countersignatory_keys_conv;
	countersignatory_keys_conv.inner = (void*)(countersignatory_keys & (~1));
	countersignatory_keys_conv.is_owned = false;
	LDKCResult_TrustedCommitmentTransactionNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_TrustedCommitmentTransactionNoneZ), "LDKCResult_TrustedCommitmentTransactionNoneZ");
	*ret_conv = CommitmentTransaction_verify(&this_arg_conv, &channel_parameters_conv, &broadcaster_keys_conv, &countersignatory_keys_conv);
	return (long)ret_conv;
}

void TrustedCommitmentTransaction_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKTrustedCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	TrustedCommitmentTransaction_free(this_ptr_conv);
}

int8_tArray TrustedCommitmentTransaction_1txid(void* ctx_TODO, uint32_t this_arg) {
	LDKTrustedCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, TrustedCommitmentTransaction_txid(&this_arg_conv).data, 32);
	return arg_arr;
}

uint32_t TrustedCommitmentTransaction_1built_1transaction(void* ctx_TODO, uint32_t this_arg) {
	LDKTrustedCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKBuiltCommitmentTransaction ret_var = TrustedCommitmentTransaction_built_transaction(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t TrustedCommitmentTransaction_1keys(void* ctx_TODO, uint32_t this_arg) {
	LDKTrustedCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKTxCreationKeys ret_var = TrustedCommitmentTransaction_keys(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t TrustedCommitmentTransaction_1get_1htlc_1sigs(void* ctx_TODO, uint32_t this_arg, int8_tArray htlc_base_key, uint32_t channel_parameters) {
	LDKTrustedCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char htlc_base_key_arr[32];
	CHECK(*htlc_base_key.len == 32);
	memcpy(htlc_base_key_arr, htlc_base_key.len + 1, 32);
	unsigned char (*htlc_base_key_ref)[32] = &htlc_base_key_arr;
	LDKDirectedChannelTransactionParameters channel_parameters_conv;
	channel_parameters_conv.inner = (void*)(channel_parameters & (~1));
	channel_parameters_conv.is_owned = false;
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = TrustedCommitmentTransaction_get_htlc_sigs(&this_arg_conv, htlc_base_key_ref, &channel_parameters_conv);
	return (long)ret_conv;
}

int64_t get_1commitment_1transaction_1number_1obscure_1factor(void* ctx_TODO, int8_tArray broadcaster_payment_basepoint, int8_tArray countersignatory_payment_basepoint, jboolean outbound_from_broadcaster) {
	LDKPublicKey broadcaster_payment_basepoint_ref;
	CHECK(*broadcaster_payment_basepoint.len == 33);
	memcpy(broadcaster_payment_basepoint_ref.compressed_form, broadcaster_payment_basepoint.len + 1, 33);
	LDKPublicKey countersignatory_payment_basepoint_ref;
	CHECK(*countersignatory_payment_basepoint.len == 33);
	memcpy(countersignatory_payment_basepoint_ref.compressed_form, countersignatory_payment_basepoint.len + 1, 33);
	int64_t ret_val = get_commitment_transaction_number_obscure_factor(broadcaster_payment_basepoint_ref, countersignatory_payment_basepoint_ref, outbound_from_broadcaster);
	return ret_val;
}

void InitFeatures_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKInitFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	InitFeatures_free(this_ptr_conv);
}

void NodeFeatures_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeFeatures_free(this_ptr_conv);
}

void ChannelFeatures_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelFeatures_free(this_ptr_conv);
}

void RouteHop_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHop_free(this_ptr_conv);
}

uint32_t RouteHop_1clone(void* ctx_TODO, uint32_t orig) {
	LDKRouteHop orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKRouteHop ret_var = RouteHop_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray RouteHop_1get_1pubkey(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, RouteHop_get_pubkey(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void RouteHop_1set_1pubkey(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	RouteHop_set_pubkey(&this_ptr_conv, val_ref);
}

uint32_t RouteHop_1get_1node_1features(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures ret_var = RouteHop_get_node_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void RouteHop_1set_1node_1features(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	RouteHop_set_node_features(&this_ptr_conv, val_conv);
}

int64_t RouteHop_1get_1short_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHop_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

void RouteHop_1set_1short_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHop_set_short_channel_id(&this_ptr_conv, val);
}

uint32_t RouteHop_1get_1channel_1features(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures ret_var = RouteHop_get_channel_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void RouteHop_1set_1channel_1features(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	RouteHop_set_channel_features(&this_ptr_conv, val_conv);
}

int64_t RouteHop_1get_1fee_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHop_get_fee_msat(&this_ptr_conv);
	return ret_val;
}

void RouteHop_1set_1fee_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHop_set_fee_msat(&this_ptr_conv, val);
}

int32_t RouteHop_1get_1cltv_1expiry_1delta(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = RouteHop_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

void RouteHop_1set_1cltv_1expiry_1delta(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHop_set_cltv_expiry_delta(&this_ptr_conv, val);
}

uint32_t RouteHop_1new(void* ctx_TODO, int8_tArray pubkey_arg, uint32_t node_features_arg, int64_t short_channel_id_arg, uint32_t channel_features_arg, int64_t fee_msat_arg, int32_t cltv_expiry_delta_arg) {
	LDKPublicKey pubkey_arg_ref;
	CHECK(*pubkey_arg.len == 33);
	memcpy(pubkey_arg_ref.compressed_form, pubkey_arg.len + 1, 33);
	LDKNodeFeatures node_features_arg_conv;
	node_features_arg_conv.inner = (void*)(node_features_arg & (~1));
	node_features_arg_conv.is_owned = (node_features_arg & 1) || (node_features_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKChannelFeatures channel_features_arg_conv;
	channel_features_arg_conv.inner = (void*)(channel_features_arg & (~1));
	channel_features_arg_conv.is_owned = (channel_features_arg & 1) || (channel_features_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKRouteHop ret_var = RouteHop_new(pubkey_arg_ref, node_features_arg_conv, short_channel_id_arg, channel_features_arg_conv, fee_msat_arg, cltv_expiry_delta_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void Route_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKRoute this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Route_free(this_ptr_conv);
}

uint32_t Route_1clone(void* ctx_TODO, uint32_t orig) {
	LDKRoute orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKRoute ret_var = Route_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void Route_1set_1paths(void* ctx_TODO, uint32_t this_ptr, ptrArray val) {
	LDKRoute this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_CVec_RouteHopZZ val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		val_constr.data = NULL;
	uint32_tArray* val_vals = (uint32_tArray*)(val.len + 1);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		uint32_tArray arr_conv_12 = val_vals[m];
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = *arr_conv_12.len;
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		uint32_t* arr_conv_12_vals = (uint32_t*)(arr_conv_12.len + 1);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			uint32_t arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
			if (arr_conv_10_conv.inner != NULL)
				arr_conv_10_conv = RouteHop_clone(&arr_conv_10_conv);
			arr_conv_12_constr.data[k] = arr_conv_10_conv;
		}
		val_constr.data[m] = arr_conv_12_constr;
	}
	Route_set_paths(&this_ptr_conv, val_constr);
}

uint32_t Route_1new(void* ctx_TODO, ptrArray paths_arg) {
	LDKCVec_CVec_RouteHopZZ paths_arg_constr;
	paths_arg_constr.datalen = *paths_arg.len;
	if (paths_arg_constr.datalen > 0)
		paths_arg_constr.data = MALLOC(paths_arg_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		paths_arg_constr.data = NULL;
	uint32_tArray* paths_arg_vals = (uint32_tArray*)(paths_arg.len + 1);
	for (size_t m = 0; m < paths_arg_constr.datalen; m++) {
		uint32_tArray arr_conv_12 = paths_arg_vals[m];
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = *arr_conv_12.len;
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		uint32_t* arr_conv_12_vals = (uint32_t*)(arr_conv_12.len + 1);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			uint32_t arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
			if (arr_conv_10_conv.inner != NULL)
				arr_conv_10_conv = RouteHop_clone(&arr_conv_10_conv);
			arr_conv_12_constr.data[k] = arr_conv_10_conv;
		}
		paths_arg_constr.data[m] = arr_conv_12_constr;
	}
	LDKRoute ret_var = Route_new(paths_arg_constr);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray Route_1write(void* ctx_TODO, uint32_t obj) {
	LDKRoute obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Route_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t Route_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_RouteDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteDecodeErrorZ), "LDKCResult_RouteDecodeErrorZ");
	*ret_conv = Route_read(ser_ref);
	return (long)ret_conv;
}

void RouteHint_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHint_free(this_ptr_conv);
}

uint32_t RouteHint_1clone(void* ctx_TODO, uint32_t orig) {
	LDKRouteHint orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKRouteHint ret_var = RouteHint_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray RouteHint_1get_1src_1node_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, RouteHint_get_src_node_id(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void RouteHint_1set_1src_1node_1id(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	RouteHint_set_src_node_id(&this_ptr_conv, val_ref);
}

int64_t RouteHint_1get_1short_1channel_1id(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHint_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

void RouteHint_1set_1short_1channel_1id(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHint_set_short_channel_id(&this_ptr_conv, val);
}

uint32_t RouteHint_1get_1fees(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees ret_var = RouteHint_get_fees(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void RouteHint_1set_1fees(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = RoutingFees_clone(&val_conv);
	RouteHint_set_fees(&this_ptr_conv, val_conv);
}

int16_t RouteHint_1get_1cltv_1expiry_1delta(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = RouteHint_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

void RouteHint_1set_1cltv_1expiry_1delta(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHint_set_cltv_expiry_delta(&this_ptr_conv, val);
}

int64_t RouteHint_1get_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHint_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void RouteHint_1set_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHint_set_htlc_minimum_msat(&this_ptr_conv, val);
}

uint32_t RouteHint_1new(void* ctx_TODO, int8_tArray src_node_id_arg, int64_t short_channel_id_arg, uint32_t fees_arg, int16_t cltv_expiry_delta_arg, int64_t htlc_minimum_msat_arg) {
	LDKPublicKey src_node_id_arg_ref;
	CHECK(*src_node_id_arg.len == 33);
	memcpy(src_node_id_arg_ref.compressed_form, src_node_id_arg.len + 1, 33);
	LDKRoutingFees fees_arg_conv;
	fees_arg_conv.inner = (void*)(fees_arg & (~1));
	fees_arg_conv.is_owned = (fees_arg & 1) || (fees_arg == 0);
	if (fees_arg_conv.inner != NULL)
		fees_arg_conv = RoutingFees_clone(&fees_arg_conv);
	LDKRouteHint ret_var = RouteHint_new(src_node_id_arg_ref, short_channel_id_arg, fees_arg_conv, cltv_expiry_delta_arg, htlc_minimum_msat_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t get_1route(void* ctx_TODO, int8_tArray our_node_id, uint32_t network, int8_tArray target, uint32_tArray first_hops, uint32_tArray last_hops, int64_t final_value_msat, int32_t final_cltv, uint32_t logger) {
	LDKPublicKey our_node_id_ref;
	CHECK(*our_node_id.len == 33);
	memcpy(our_node_id_ref.compressed_form, our_node_id.len + 1, 33);
	LDKNetworkGraph network_conv;
	network_conv.inner = (void*)(network & (~1));
	network_conv.is_owned = false;
	LDKPublicKey target_ref;
	CHECK(*target.len == 33);
	memcpy(target_ref.compressed_form, target.len + 1, 33);
	LDKCVec_ChannelDetailsZ first_hops_constr;
	first_hops_constr.datalen = *first_hops.len;
	if (first_hops_constr.datalen > 0)
		first_hops_constr.data = MALLOC(first_hops_constr.datalen * sizeof(LDKChannelDetails), "LDKCVec_ChannelDetailsZ Elements");
	else
		first_hops_constr.data = NULL;
	uint32_t* first_hops_vals = (uint32_t*)(first_hops.len + 1);
	for (size_t q = 0; q < first_hops_constr.datalen; q++) {
		uint32_t arr_conv_16 = first_hops_vals[q];
		LDKChannelDetails arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		first_hops_constr.data[q] = arr_conv_16_conv;
	}
	LDKCVec_RouteHintZ last_hops_constr;
	last_hops_constr.datalen = *last_hops.len;
	if (last_hops_constr.datalen > 0)
		last_hops_constr.data = MALLOC(last_hops_constr.datalen * sizeof(LDKRouteHint), "LDKCVec_RouteHintZ Elements");
	else
		last_hops_constr.data = NULL;
	uint32_t* last_hops_vals = (uint32_t*)(last_hops.len + 1);
	for (size_t l = 0; l < last_hops_constr.datalen; l++) {
		uint32_t arr_conv_11 = last_hops_vals[l];
		LDKRouteHint arr_conv_11_conv;
		arr_conv_11_conv.inner = (void*)(arr_conv_11 & (~1));
		arr_conv_11_conv.is_owned = (arr_conv_11 & 1) || (arr_conv_11 == 0);
		if (arr_conv_11_conv.inner != NULL)
			arr_conv_11_conv = RouteHint_clone(&arr_conv_11_conv);
		last_hops_constr.data[l] = arr_conv_11_conv;
	}
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKCResult_RouteLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret_conv = get_route(our_node_id_ref, &network_conv, target_ref, &first_hops_constr, last_hops_constr, final_value_msat, final_cltv, logger_conv);
	FREE(first_hops_constr.data);
	return (long)ret_conv;
}

void NetworkGraph_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKNetworkGraph this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NetworkGraph_free(this_ptr_conv);
}

void LockedNetworkGraph_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKLockedNetworkGraph this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LockedNetworkGraph_free(this_ptr_conv);
}

void NetGraphMsgHandler_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKNetGraphMsgHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NetGraphMsgHandler_free(this_ptr_conv);
}

uint32_t NetGraphMsgHandler_1new(void* ctx_TODO, int8_tArray genesis_hash, uint32_t chain_access, uint32_t logger) {
	LDKThirtyTwoBytes genesis_hash_ref;
	CHECK(*genesis_hash.len == 32);
	memcpy(genesis_hash_ref.data, genesis_hash.len + 1, 32);
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKNetGraphMsgHandler ret_var = NetGraphMsgHandler_new(genesis_hash_ref, chain_access_conv, logger_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t NetGraphMsgHandler_1from_1net_1graph(void* ctx_TODO, uint32_t chain_access, uint32_t logger, uint32_t network_graph) {
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKNetworkGraph network_graph_conv;
	network_graph_conv.inner = (void*)(network_graph & (~1));
	network_graph_conv.is_owned = (network_graph & 1) || (network_graph == 0);
	// Warning: we may need a move here but can't clone!
	LDKNetGraphMsgHandler ret_var = NetGraphMsgHandler_from_net_graph(chain_access_conv, logger_conv, network_graph_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t NetGraphMsgHandler_1read_1locked_1graph(void* ctx_TODO, uint32_t this_arg) {
	LDKNetGraphMsgHandler this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKLockedNetworkGraph ret_var = NetGraphMsgHandler_read_locked_graph(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t LockedNetworkGraph_1graph(void* ctx_TODO, uint32_t this_arg) {
	LDKLockedNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKNetworkGraph ret_var = LockedNetworkGraph_graph(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t NetGraphMsgHandler_1as_1RoutingMessageHandler(void* ctx_TODO, uint32_t this_arg) {
	LDKNetGraphMsgHandler this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKRoutingMessageHandler* ret = MALLOC(sizeof(LDKRoutingMessageHandler), "LDKRoutingMessageHandler");
	*ret = NetGraphMsgHandler_as_RoutingMessageHandler(&this_arg_conv);
	return (long)ret;
}

uint32_t NetGraphMsgHandler_1as_1MessageSendEventsProvider(void* ctx_TODO, uint32_t this_arg) {
	LDKNetGraphMsgHandler this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKMessageSendEventsProvider* ret = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*ret = NetGraphMsgHandler_as_MessageSendEventsProvider(&this_arg_conv);
	return (long)ret;
}

void DirectionalChannelInfo_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectionalChannelInfo_free(this_ptr_conv);
}

int32_t DirectionalChannelInfo_1get_1last_1update(void* ctx_TODO, uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = DirectionalChannelInfo_get_last_update(&this_ptr_conv);
	return ret_val;
}

void DirectionalChannelInfo_1set_1last_1update(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_last_update(&this_ptr_conv, val);
}

jboolean DirectionalChannelInfo_1get_1enabled(void* ctx_TODO, uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = DirectionalChannelInfo_get_enabled(&this_ptr_conv);
	return ret_val;
}

void DirectionalChannelInfo_1set_1enabled(void* ctx_TODO, uint32_t this_ptr, jboolean val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_enabled(&this_ptr_conv, val);
}

int16_t DirectionalChannelInfo_1get_1cltv_1expiry_1delta(void* ctx_TODO, uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = DirectionalChannelInfo_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

void DirectionalChannelInfo_1set_1cltv_1expiry_1delta(void* ctx_TODO, uint32_t this_ptr, int16_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_cltv_expiry_delta(&this_ptr_conv, val);
}

int64_t DirectionalChannelInfo_1get_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = DirectionalChannelInfo_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void DirectionalChannelInfo_1set_1htlc_1minimum_1msat(void* ctx_TODO, uint32_t this_ptr, int64_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_htlc_minimum_msat(&this_ptr_conv, val);
}

uint32_t DirectionalChannelInfo_1get_1fees(void* ctx_TODO, uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees ret_var = DirectionalChannelInfo_get_fees(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void DirectionalChannelInfo_1set_1fees(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = RoutingFees_clone(&val_conv);
	DirectionalChannelInfo_set_fees(&this_ptr_conv, val_conv);
}

uint32_t DirectionalChannelInfo_1get_1last_1update_1message(void* ctx_TODO, uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelUpdate ret_var = DirectionalChannelInfo_get_last_update_message(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void DirectionalChannelInfo_1set_1last_1update_1message(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelUpdate val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelUpdate_clone(&val_conv);
	DirectionalChannelInfo_set_last_update_message(&this_ptr_conv, val_conv);
}

int8_tArray DirectionalChannelInfo_1write(void* ctx_TODO, uint32_t obj) {
	LDKDirectionalChannelInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = DirectionalChannelInfo_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t DirectionalChannelInfo_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKDirectionalChannelInfo ret_var = DirectionalChannelInfo_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelInfo_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelInfo_free(this_ptr_conv);
}

uint32_t ChannelInfo_1get_1features(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures ret_var = ChannelInfo_get_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelInfo_1set_1features(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelInfo_set_features(&this_ptr_conv, val_conv);
}

int8_tArray ChannelInfo_1get_1node_1one(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelInfo_get_node_one(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void ChannelInfo_1set_1node_1one(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	ChannelInfo_set_node_one(&this_ptr_conv, val_ref);
}

uint32_t ChannelInfo_1get_1one_1to_1two(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKDirectionalChannelInfo ret_var = ChannelInfo_get_one_to_two(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelInfo_1set_1one_1to_1two(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKDirectionalChannelInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelInfo_set_one_to_two(&this_ptr_conv, val_conv);
}

int8_tArray ChannelInfo_1get_1node_1two(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = { .len = MALLOC(33 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, ChannelInfo_get_node_two(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void ChannelInfo_1set_1node_1two(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*val.len == 33);
	memcpy(val_ref.compressed_form, val.len + 1, 33);
	ChannelInfo_set_node_two(&this_ptr_conv, val_ref);
}

uint32_t ChannelInfo_1get_1two_1to_1one(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKDirectionalChannelInfo ret_var = ChannelInfo_get_two_to_one(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelInfo_1set_1two_1to_1one(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKDirectionalChannelInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelInfo_set_two_to_one(&this_ptr_conv, val_conv);
}

uint32_t ChannelInfo_1get_1announcement_1message(void* ctx_TODO, uint32_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelAnnouncement ret_var = ChannelInfo_get_announcement_message(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void ChannelInfo_1set_1announcement_1message(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelAnnouncement_clone(&val_conv);
	ChannelInfo_set_announcement_message(&this_ptr_conv, val_conv);
}

int8_tArray ChannelInfo_1write(void* ctx_TODO, uint32_t obj) {
	LDKChannelInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelInfo_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t ChannelInfo_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKChannelInfo ret_var = ChannelInfo_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void RoutingFees_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RoutingFees_free(this_ptr_conv);
}

uint32_t RoutingFees_1clone(void* ctx_TODO, uint32_t orig) {
	LDKRoutingFees orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKRoutingFees ret_var = RoutingFees_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int32_t RoutingFees_1get_1base_1msat(void* ctx_TODO, uint32_t this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = RoutingFees_get_base_msat(&this_ptr_conv);
	return ret_val;
}

void RoutingFees_1set_1base_1msat(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RoutingFees_set_base_msat(&this_ptr_conv, val);
}

int32_t RoutingFees_1get_1proportional_1millionths(void* ctx_TODO, uint32_t this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = RoutingFees_get_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

void RoutingFees_1set_1proportional_1millionths(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RoutingFees_set_proportional_millionths(&this_ptr_conv, val);
}

uint32_t RoutingFees_1new(void* ctx_TODO, int32_t base_msat_arg, int32_t proportional_millionths_arg) {
	LDKRoutingFees ret_var = RoutingFees_new(base_msat_arg, proportional_millionths_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t RoutingFees_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_RoutingFeesDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RoutingFeesDecodeErrorZ), "LDKCResult_RoutingFeesDecodeErrorZ");
	*ret_conv = RoutingFees_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray RoutingFees_1write(void* ctx_TODO, uint32_t obj) {
	LDKRoutingFees obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = RoutingFees_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

void NodeAnnouncementInfo_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeAnnouncementInfo_free(this_ptr_conv);
}

uint32_t NodeAnnouncementInfo_1get_1features(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures ret_var = NodeAnnouncementInfo_get_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void NodeAnnouncementInfo_1set_1features(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	NodeAnnouncementInfo_set_features(&this_ptr_conv, val_conv);
}

int32_t NodeAnnouncementInfo_1get_1last_1update(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = NodeAnnouncementInfo_get_last_update(&this_ptr_conv);
	return ret_val;
}

void NodeAnnouncementInfo_1set_1last_1update(void* ctx_TODO, uint32_t this_ptr, int32_t val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	NodeAnnouncementInfo_set_last_update(&this_ptr_conv, val);
}

int8_tArray NodeAnnouncementInfo_1get_1rgb(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(3 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *NodeAnnouncementInfo_get_rgb(&this_ptr_conv), 3);
	return ret_arr;
}

void NodeAnnouncementInfo_1set_1rgb(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThreeBytes val_ref;
	CHECK(*val.len == 3);
	memcpy(val_ref.data, val.len + 1, 3);
	NodeAnnouncementInfo_set_rgb(&this_ptr_conv, val_ref);
}

int8_tArray NodeAnnouncementInfo_1get_1alias(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = { .len = MALLOC(32 + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(ret_arr.len + 1, *NodeAnnouncementInfo_get_alias(&this_ptr_conv), 32);
	return ret_arr;
}

void NodeAnnouncementInfo_1set_1alias(void* ctx_TODO, uint32_t this_ptr, int8_tArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*val.len == 32);
	memcpy(val_ref.data, val.len + 1, 32);
	NodeAnnouncementInfo_set_alias(&this_ptr_conv, val_ref);
}

void NodeAnnouncementInfo_1set_1addresses(void* ctx_TODO, uint32_t this_ptr, uint32_tArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_NetAddressZ val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val.len + 1);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		uint32_t arr_conv_12 = val_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		val_constr.data[m] = arr_conv_12_conv;
	}
	NodeAnnouncementInfo_set_addresses(&this_ptr_conv, val_constr);
}

uint32_t NodeAnnouncementInfo_1get_1announcement_1message(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeAnnouncement ret_var = NodeAnnouncementInfo_get_announcement_message(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void NodeAnnouncementInfo_1set_1announcement_1message(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = NodeAnnouncement_clone(&val_conv);
	NodeAnnouncementInfo_set_announcement_message(&this_ptr_conv, val_conv);
}

uint32_t NodeAnnouncementInfo_1new(void* ctx_TODO, uint32_t features_arg, int32_t last_update_arg, int8_tArray rgb_arg, int8_tArray alias_arg, uint32_tArray addresses_arg, uint32_t announcement_message_arg) {
	LDKNodeFeatures features_arg_conv;
	features_arg_conv.inner = (void*)(features_arg & (~1));
	features_arg_conv.is_owned = (features_arg & 1) || (features_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKThreeBytes rgb_arg_ref;
	CHECK(*rgb_arg.len == 3);
	memcpy(rgb_arg_ref.data, rgb_arg.len + 1, 3);
	LDKThirtyTwoBytes alias_arg_ref;
	CHECK(*alias_arg.len == 32);
	memcpy(alias_arg_ref.data, alias_arg.len + 1, 32);
	LDKCVec_NetAddressZ addresses_arg_constr;
	addresses_arg_constr.datalen = *addresses_arg.len;
	if (addresses_arg_constr.datalen > 0)
		addresses_arg_constr.data = MALLOC(addresses_arg_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		addresses_arg_constr.data = NULL;
	uint32_t* addresses_arg_vals = (uint32_t*)(addresses_arg.len + 1);
	for (size_t m = 0; m < addresses_arg_constr.datalen; m++) {
		uint32_t arr_conv_12 = addresses_arg_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		addresses_arg_constr.data[m] = arr_conv_12_conv;
	}
	LDKNodeAnnouncement announcement_message_arg_conv;
	announcement_message_arg_conv.inner = (void*)(announcement_message_arg & (~1));
	announcement_message_arg_conv.is_owned = (announcement_message_arg & 1) || (announcement_message_arg == 0);
	if (announcement_message_arg_conv.inner != NULL)
		announcement_message_arg_conv = NodeAnnouncement_clone(&announcement_message_arg_conv);
	LDKNodeAnnouncementInfo ret_var = NodeAnnouncementInfo_new(features_arg_conv, last_update_arg, rgb_arg_ref, alias_arg_ref, addresses_arg_constr, announcement_message_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray NodeAnnouncementInfo_1write(void* ctx_TODO, uint32_t obj) {
	LDKNodeAnnouncementInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NodeAnnouncementInfo_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t NodeAnnouncementInfo_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeAnnouncementInfoDecodeErrorZ), "LDKCResult_NodeAnnouncementInfoDecodeErrorZ");
	*ret_conv = NodeAnnouncementInfo_read(ser_ref);
	return (long)ret_conv;
}

void NodeInfo_1free(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeInfo_free(this_ptr_conv);
}

void NodeInfo_1set_1channels(void* ctx_TODO, uint32_t this_ptr, int64_tArray val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u64Z val_constr;
	val_constr.datalen = *val.len;
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (int64_t*)(val.len + 1);
	for (size_t i = 0; i < val_constr.datalen; i++) {
		int64_t arr_conv_8 = val_vals[i];
		val_constr.data[i] = arr_conv_8;
	}
	NodeInfo_set_channels(&this_ptr_conv, val_constr);
}

uint32_t NodeInfo_1get_1lowest_1inbound_1channel_1fees(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees ret_var = NodeInfo_get_lowest_inbound_channel_fees(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void NodeInfo_1set_1lowest_1inbound_1channel_1fees(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = RoutingFees_clone(&val_conv);
	NodeInfo_set_lowest_inbound_channel_fees(&this_ptr_conv, val_conv);
}

uint32_t NodeInfo_1get_1announcement_1info(void* ctx_TODO, uint32_t this_ptr) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeAnnouncementInfo ret_var = NodeInfo_get_announcement_info(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void NodeInfo_1set_1announcement_1info(void* ctx_TODO, uint32_t this_ptr, uint32_t val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeAnnouncementInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	NodeInfo_set_announcement_info(&this_ptr_conv, val_conv);
}

uint32_t NodeInfo_1new(void* ctx_TODO, int64_tArray channels_arg, uint32_t lowest_inbound_channel_fees_arg, uint32_t announcement_info_arg) {
	LDKCVec_u64Z channels_arg_constr;
	channels_arg_constr.datalen = *channels_arg.len;
	if (channels_arg_constr.datalen > 0)
		channels_arg_constr.data = MALLOC(channels_arg_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		channels_arg_constr.data = NULL;
	int64_t* channels_arg_vals = (int64_t*)(channels_arg.len + 1);
	for (size_t i = 0; i < channels_arg_constr.datalen; i++) {
		int64_t arr_conv_8 = channels_arg_vals[i];
		channels_arg_constr.data[i] = arr_conv_8;
	}
	LDKRoutingFees lowest_inbound_channel_fees_arg_conv;
	lowest_inbound_channel_fees_arg_conv.inner = (void*)(lowest_inbound_channel_fees_arg & (~1));
	lowest_inbound_channel_fees_arg_conv.is_owned = (lowest_inbound_channel_fees_arg & 1) || (lowest_inbound_channel_fees_arg == 0);
	if (lowest_inbound_channel_fees_arg_conv.inner != NULL)
		lowest_inbound_channel_fees_arg_conv = RoutingFees_clone(&lowest_inbound_channel_fees_arg_conv);
	LDKNodeAnnouncementInfo announcement_info_arg_conv;
	announcement_info_arg_conv.inner = (void*)(announcement_info_arg & (~1));
	announcement_info_arg_conv.is_owned = (announcement_info_arg & 1) || (announcement_info_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKNodeInfo ret_var = NodeInfo_new(channels_arg_constr, lowest_inbound_channel_fees_arg_conv, announcement_info_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray NodeInfo_1write(void* ctx_TODO, uint32_t obj) {
	LDKNodeInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NodeInfo_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t NodeInfo_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_NodeInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeInfoDecodeErrorZ), "LDKCResult_NodeInfoDecodeErrorZ");
	*ret_conv = NodeInfo_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray NetworkGraph_1write(void* ctx_TODO, uint32_t obj) {
	LDKNetworkGraph obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NetworkGraph_write(&obj_conv);
	int8_tArray arg_arr = { .len = MALLOC(arg_var.datalen + sizeof(uint32_t), "Native int8_tArray Bytes") };
	memcpy(arg_arr.len + 1, arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t NetworkGraph_1read(void* ctx_TODO, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *ser.len;
	ser_ref.data = (int8_t*)(ser.len + 1);
	LDKCResult_NetworkGraphDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NetworkGraphDecodeErrorZ), "LDKCResult_NetworkGraphDecodeErrorZ");
	*ret_conv = NetworkGraph_read(ser_ref);
	return (long)ret_conv;
}

uint32_t NetworkGraph_1new(void* ctx_TODO, int8_tArray genesis_hash) {
	LDKThirtyTwoBytes genesis_hash_ref;
	CHECK(*genesis_hash.len == 32);
	memcpy(genesis_hash_ref.data, genesis_hash.len + 1, 32);
	LDKNetworkGraph ret_var = NetworkGraph_new(genesis_hash_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t NetworkGraph_1update_1node_1from_1announcement(void* ctx_TODO, uint32_t this_arg, uint32_t msg) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKNodeAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_node_from_announcement(&this_arg_conv, &msg_conv);
	return (long)ret_conv;
}

uint32_t NetworkGraph_1update_1node_1from_1unsigned_1announcement(void* ctx_TODO, uint32_t this_arg, uint32_t msg) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKUnsignedNodeAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_node_from_unsigned_announcement(&this_arg_conv, &msg_conv);
	return (long)ret_conv;
}

uint32_t NetworkGraph_1update_1channel_1from_1announcement(void* ctx_TODO, uint32_t this_arg, uint32_t msg, uint32_t chain_access) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_channel_from_announcement(&this_arg_conv, &msg_conv, chain_access_conv);
	return (long)ret_conv;
}

uint32_t NetworkGraph_1update_1channel_1from_1unsigned_1announcement(void* ctx_TODO, uint32_t this_arg, uint32_t msg, uint32_t chain_access) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKUnsignedChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_channel_from_unsigned_announcement(&this_arg_conv, &msg_conv, chain_access_conv);
	return (long)ret_conv;
}

void NetworkGraph_1close_1channel_1from_1update(void* ctx_TODO, uint32_t this_arg, int64_t short_channel_id, jboolean is_permanent) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	NetworkGraph_close_channel_from_update(&this_arg_conv, short_channel_id, is_permanent);
}

uint32_t NetworkGraph_1update_1channel(void* ctx_TODO, uint32_t this_arg, uint32_t msg) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelUpdate msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_channel(&this_arg_conv, &msg_conv);
	return (long)ret_conv;
}

uint32_t NetworkGraph_1update_1channel_1unsigned(void* ctx_TODO, uint32_t this_arg, uint32_t msg) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKUnsignedChannelUpdate msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_channel_unsigned(&this_arg_conv, &msg_conv);
	return (long)ret_conv;
}

