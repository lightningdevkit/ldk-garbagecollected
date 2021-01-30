#include <rust_types.h>
#include "js-wasm.h"
#include <stdatomic.h>
#include <lightning.h>

// These should be provided...somehow...
void *memset(void *s, int c, size_t n);
void *memcpy(void *dest, const void *src, size_t n);
int memcmp(const void *s1, const void *s2, size_t n);

void __attribute__((noreturn)) abort(void);
static inline void assert(bool expression) {
	if (!expression) { abort(); }
}

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

typedef uint32_t int64_tArray;
typedef uint32_t int8_tArray;
typedef uint32_t uint32_tArray;
typedef uint32_t ptrArray;
typedef uint32_t jstring;

static inline uint32_t init_arr(size_t arr_len, size_t elem_size, const char *type_desc) {
	uint32_t *elems = (uint32_t*)MALLOC(arr_len * elem_size + 4, type_desc);
	elems[0] = arr_len;
	return (uint32_t)elems;
}

jstring str_ref_to_ts(const char* chars, size_t len) {
	char* err_buf = MALLOC(len + 4, "str conv buf");
	*((uint32_t*)err_buf) = len;
	memcpy(err_buf + 4, chars, len);
	return (uint32_t) err_buf;
}

typedef bool jboolean;

uint32_t __attribute__((visibility("default"))) TS_malloc(uint32_t size) {
	return (uint32_t)MALLOC(size, "JS-Called malloc");
}
void __attribute__((visibility("default"))) TS_free(uint32_t ptr) {
	FREE((void*)ptr);
}
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
		case 7: return LDKSecp256k1Error_TweakCheckFailed;
		case 8: return LDKSecp256k1Error_NotEnoughMemory;
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
		case LDKSecp256k1Error_TweakCheckFailed: return 7;
		case LDKSecp256k1Error_NotEnoughMemory: return 8;
		default: abort();
	}
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_u8Z_new(int8_tArray elems) {
	LDKCVec_u8Z *ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(uint8_t) * ret->datalen, "LDKCVec_u8Z Data");
		int8_t *java_elems = (int8_t*)(elems + 4);
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
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_u64u64Z_new(int64_t a, int64_t b) {
	LDKC2Tuple_u64u64Z* ret = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	ret->a = a;
	ret->b = b;
	return (long)ret;
}
int64_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_u64u64Z_get_a(uint32_t ptr) {
	LDKC2Tuple_u64u64Z *tuple = (LDKC2Tuple_u64u64Z*)(ptr & ~1);
	return tuple->a;
}
int64_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_u64u64Z_get_b(uint32_t ptr) {
	LDKC2Tuple_u64u64Z *tuple = (LDKC2Tuple_u64u64Z*)(ptr & ~1);
	return tuple->b;
}
uint32_t __attribute__((visibility("default"))) TS_LDKSpendableOutputDescriptor_ref_from_ptr(uint32_t ptr) {
	LDKSpendableOutputDescriptor *obj = (LDKSpendableOutputDescriptor*)ptr;
	switch(obj->tag) {
		case LDKSpendableOutputDescriptor_StaticOutput: {
			LDKOutPoint outpoint_var = obj->static_output.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			long output_ref = ((long)&obj->static_output.output) | 1;
			return 0 /* LDKSpendableOutputDescriptor - StaticOutput */; (void) outpoint_ref; (void) (long)output_ref;
		}
		case LDKSpendableOutputDescriptor_DynamicOutputP2WSH: {
			LDKOutPoint outpoint_var = obj->dynamic_output_p2wsh.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			int8_tArray per_commitment_point_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(per_commitment_point_arr + 4), obj->dynamic_output_p2wsh.per_commitment_point.compressed_form, 33);
			long output_ref = ((long)&obj->dynamic_output_p2wsh.output) | 1;
			long key_derivation_params_ref = (long)(&obj->dynamic_output_p2wsh.key_derivation_params) | 1;
			int8_tArray revocation_pubkey_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(revocation_pubkey_arr + 4), obj->dynamic_output_p2wsh.revocation_pubkey.compressed_form, 33);
			return 0 /* LDKSpendableOutputDescriptor - DynamicOutputP2WSH */; (void) outpoint_ref; (void) per_commitment_point_arr; (void) obj->dynamic_output_p2wsh.to_self_delay; (void) (long)output_ref; (void) key_derivation_params_ref; (void) revocation_pubkey_arr;
		}
		case LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment: {
			LDKOutPoint outpoint_var = obj->static_output_counterparty_payment.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			long output_ref = ((long)&obj->static_output_counterparty_payment.output) | 1;
			long key_derivation_params_ref = (long)(&obj->static_output_counterparty_payment.key_derivation_params) | 1;
			return 0 /* LDKSpendableOutputDescriptor - StaticOutputCounterpartyPayment */; (void) outpoint_ref; (void) (long)output_ref; (void) key_derivation_params_ref;
		}
		default: abort();
	}
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_SpendableOutputDescriptorZ_new(uint32_tArray elems) {
	LDKCVec_SpendableOutputDescriptorZ *ret = MALLOC(sizeof(LDKCVec_SpendableOutputDescriptorZ), "LDKCVec_SpendableOutputDescriptorZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKSpendableOutputDescriptor) * ret->datalen, "LDKCVec_SpendableOutputDescriptorZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKSpendableOutputDescriptor arr_elem_conv = *(LDKSpendableOutputDescriptor*)(((uint64_t)arr_elem) & ~1);
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
uint32_t __attribute__((visibility("default"))) TS_LDKErrorAction_ref_from_ptr(uint32_t ptr) {
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
uint32_t __attribute__((visibility("default"))) TS_LDKHTLCFailChannelUpdate_ref_from_ptr(uint32_t ptr) {
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
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->node_failure.node_id.compressed_form, 33);
			return 0 /* LDKHTLCFailChannelUpdate - NodeFailure */; (void) node_id_arr; (void) obj->node_failure.is_permanent;
		}
		default: abort();
	}
}
uint32_t __attribute__((visibility("default"))) TS_LDKMessageSendEvent_ref_from_ptr(uint32_t ptr) {
	LDKMessageSendEvent *obj = (LDKMessageSendEvent*)ptr;
	switch(obj->tag) {
		case LDKMessageSendEvent_SendAcceptChannel: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_accept_channel.node_id.compressed_form, 33);
			LDKAcceptChannel msg_var = obj->send_accept_channel.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendAcceptChannel */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendOpenChannel: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_open_channel.node_id.compressed_form, 33);
			LDKOpenChannel msg_var = obj->send_open_channel.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendOpenChannel */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendFundingCreated: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_funding_created.node_id.compressed_form, 33);
			LDKFundingCreated msg_var = obj->send_funding_created.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendFundingCreated */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendFundingSigned: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_funding_signed.node_id.compressed_form, 33);
			LDKFundingSigned msg_var = obj->send_funding_signed.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendFundingSigned */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendFundingLocked: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_funding_locked.node_id.compressed_form, 33);
			LDKFundingLocked msg_var = obj->send_funding_locked.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendFundingLocked */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendAnnouncementSignatures: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_announcement_signatures.node_id.compressed_form, 33);
			LDKAnnouncementSignatures msg_var = obj->send_announcement_signatures.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendAnnouncementSignatures */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_UpdateHTLCs: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->update_htl_cs.node_id.compressed_form, 33);
			LDKCommitmentUpdate updates_var = obj->update_htl_cs.updates;
			CHECK((((long)updates_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&updates_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long updates_ref = (long)updates_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - UpdateHTLCs */; (void) node_id_arr; (void) updates_ref;
		}
		case LDKMessageSendEvent_SendRevokeAndACK: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_revoke_and_ack.node_id.compressed_form, 33);
			LDKRevokeAndACK msg_var = obj->send_revoke_and_ack.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendRevokeAndACK */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendClosingSigned: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_closing_signed.node_id.compressed_form, 33);
			LDKClosingSigned msg_var = obj->send_closing_signed.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendClosingSigned */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendShutdown: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_shutdown.node_id.compressed_form, 33);
			LDKShutdown msg_var = obj->send_shutdown.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendShutdown */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendChannelReestablish: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_channel_reestablish.node_id.compressed_form, 33);
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
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->handle_error.node_id.compressed_form, 33);
			long action_ref = ((long)&obj->handle_error.action) | 1;
			return 0 /* LDKMessageSendEvent - HandleError */; (void) node_id_arr; (void) action_ref;
		}
		case LDKMessageSendEvent_PaymentFailureNetworkUpdate: {
			long update_ref = ((long)&obj->payment_failure_network_update.update) | 1;
			return 0 /* LDKMessageSendEvent - PaymentFailureNetworkUpdate */; (void) update_ref;
		}
		case LDKMessageSendEvent_SendChannelRangeQuery: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_channel_range_query.node_id.compressed_form, 33);
			LDKQueryChannelRange msg_var = obj->send_channel_range_query.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendChannelRangeQuery */; (void) node_id_arr; (void) msg_ref;
		}
		case LDKMessageSendEvent_SendShortIdsQuery: {
			int8_tArray node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(node_id_arr + 4), obj->send_short_ids_query.node_id.compressed_form, 33);
			LDKQueryShortChannelIds msg_var = obj->send_short_ids_query.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return 0 /* LDKMessageSendEvent - SendShortIdsQuery */; (void) node_id_arr; (void) msg_ref;
		}
		default: abort();
	}
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_MessageSendEventZ_new(uint32_tArray elems) {
	LDKCVec_MessageSendEventZ *ret = MALLOC(sizeof(LDKCVec_MessageSendEventZ), "LDKCVec_MessageSendEventZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKMessageSendEvent) * ret->datalen, "LDKCVec_MessageSendEventZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKMessageSendEvent arr_elem_conv = *(LDKMessageSendEvent*)(((uint64_t)arr_elem) & ~1);
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
uint32_t __attribute__((visibility("default"))) TS_LDKEvent_ref_from_ptr(uint32_t ptr) {
	LDKEvent *obj = (LDKEvent*)ptr;
	switch(obj->tag) {
		case LDKEvent_FundingGenerationReady: {
			int8_tArray temporary_channel_id_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(temporary_channel_id_arr + 4), obj->funding_generation_ready.temporary_channel_id.data, 32);
			LDKCVec_u8Z output_script_var = obj->funding_generation_ready.output_script;
			int8_tArray output_script_arr = init_arr(output_script_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(output_script_arr + 4), output_script_var.data, output_script_var.datalen);
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
			int8_tArray payment_hash_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(payment_hash_arr + 4), obj->payment_received.payment_hash.data, 32);
			int8_tArray payment_secret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(payment_secret_arr + 4), obj->payment_received.payment_secret.data, 32);
			return 0 /* LDKEvent - PaymentReceived */; (void) payment_hash_arr; (void) payment_secret_arr; (void) obj->payment_received.amt;
		}
		case LDKEvent_PaymentSent: {
			int8_tArray payment_preimage_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(payment_preimage_arr + 4), obj->payment_sent.payment_preimage.data, 32);
			return 0 /* LDKEvent - PaymentSent */; (void) payment_preimage_arr;
		}
		case LDKEvent_PaymentFailed: {
			int8_tArray payment_hash_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(payment_hash_arr + 4), obj->payment_failed.payment_hash.data, 32);
			return 0 /* LDKEvent - PaymentFailed */; (void) payment_hash_arr; (void) obj->payment_failed.rejected_by_dest;
		}
		case LDKEvent_PendingHTLCsForwardable: {
			return 0 /* LDKEvent - PendingHTLCsForwardable */; (void) obj->pending_htl_cs_forwardable.time_forwardable;
		}
		case LDKEvent_SpendableOutputs: {
			LDKCVec_SpendableOutputDescriptorZ outputs_var = obj->spendable_outputs.outputs;
			uint32_tArray outputs_arr = init_arr(outputs_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
			uint32_t *outputs_arr_ptr = (uint32_t*)(outputs_arr + 4);
			for (size_t b = 0; b < outputs_var.datalen; b++) {
				long arr_conv_27_ref = ((long)&outputs_var.data[b]) | 1;
				outputs_arr_ptr[b] = arr_conv_27_ref;
			}
			return 0 /* LDKEvent - SpendableOutputs */; (void) outputs_arr;
		}
		default: abort();
	}
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_EventZ_new(uint32_tArray elems) {
	LDKCVec_EventZ *ret = MALLOC(sizeof(LDKCVec_EventZ), "LDKCVec_EventZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKEvent) * ret->datalen, "LDKCVec_EventZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKEvent arr_elem_conv = *(LDKEvent*)(((uint64_t)arr_elem) & ~1);
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
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_usizeTransactionZ_new(intptr_t a, int8_tArray b) {
	LDKC2Tuple_usizeTransactionZ* ret = MALLOC(sizeof(LDKC2Tuple_usizeTransactionZ), "LDKC2Tuple_usizeTransactionZ");
	ret->a = a;
	LDKTransaction b_ref;
	b_ref.datalen = *((uint32_t*)b);
	b_ref.data = MALLOC(b_ref.datalen, "LDKTransaction Bytes");
	memcpy(b_ref.data, (uint8_t*)(b + 4), b_ref.datalen);
	b_ref.data_is_owned = false;
	ret->b = b_ref;
	return (long)ret;
}
intptr_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_usizeTransactionZ_get_a(uint32_t ptr) {
	LDKC2Tuple_usizeTransactionZ *tuple = (LDKC2Tuple_usizeTransactionZ*)(ptr & ~1);
	return tuple->a;
}
int8_tArray  __attribute__((visibility("default"))) TS_LDKC2Tuple_usizeTransactionZ_get_b(uint32_t ptr) {
	LDKC2Tuple_usizeTransactionZ *tuple = (LDKC2Tuple_usizeTransactionZ*)(ptr & ~1);
	LDKTransaction b_var = tuple->b;
	int8_tArray b_arr = init_arr(b_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(b_arr + 4), b_var.data, b_var.datalen);
	return b_arr;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_C2Tuple_usizeTransactionZZ_new(uint32_tArray elems) {
	LDKCVec_C2Tuple_usizeTransactionZZ *ret = MALLOC(sizeof(LDKCVec_C2Tuple_usizeTransactionZZ), "LDKCVec_C2Tuple_usizeTransactionZZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2Tuple_usizeTransactionZ) * ret->datalen, "LDKCVec_C2Tuple_usizeTransactionZZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKC2Tuple_usizeTransactionZ arr_elem_conv = *(LDKC2Tuple_usizeTransactionZ*)(((uint64_t)arr_elem) & ~1);
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_NoneChannelMonitorUpdateErrZ_result_ok(uint32_t arg) {
	return ((LDKCResult_NoneChannelMonitorUpdateErrZ*)arg)->result_ok;
}
void  __attribute__((visibility("default"))) TS_LDKCResult_NoneChannelMonitorUpdateErrZ_get_ok(uint32_t arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ *val = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(arg & ~1);
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NoneChannelMonitorUpdateErrZ_get_err(uint32_t arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ *val = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(arg & ~1);
	CHECK(!val->result_ok);
	uint32_t err_conv = LDKChannelMonitorUpdateErr_to_js((*val->contents.err));
	return err_conv;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_MonitorEventZ_new(uint32_tArray elems) {
	LDKCVec_MonitorEventZ *ret = MALLOC(sizeof(LDKCVec_MonitorEventZ), "LDKCVec_MonitorEventZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKMonitorEvent) * ret->datalen, "LDKCVec_MonitorEventZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKMonitorEvent arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
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
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_ChannelMonitorUpdateDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ChannelMonitorUpdateDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ *val = (LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKChannelMonitorUpdate res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ChannelMonitorUpdateDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ *val = (LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_NoneMonitorUpdateErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_NoneMonitorUpdateErrorZ*)arg)->result_ok;
}
void  __attribute__((visibility("default"))) TS_LDKCResult_NoneMonitorUpdateErrorZ_get_ok(uint32_t arg) {
	LDKCResult_NoneMonitorUpdateErrorZ *val = (LDKCResult_NoneMonitorUpdateErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NoneMonitorUpdateErrorZ_get_err(uint32_t arg) {
	LDKCResult_NoneMonitorUpdateErrorZ *val = (LDKCResult_NoneMonitorUpdateErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKMonitorUpdateError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_OutPointScriptZ_new(uint32_t a, int8_tArray b) {
	LDKC2Tuple_OutPointScriptZ* ret = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	LDKOutPoint a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	a_conv = OutPoint_clone(&a_conv);
	ret->a = a_conv;
	LDKCVec_u8Z b_ref;
	b_ref.datalen = *((uint32_t*)b);
	b_ref.data = MALLOC(b_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(b_ref.data, (uint8_t*)(b + 4), b_ref.datalen);
	ret->b = b_ref;
	return (long)ret;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_OutPointScriptZ_get_a(uint32_t ptr) {
	LDKC2Tuple_OutPointScriptZ *tuple = (LDKC2Tuple_OutPointScriptZ*)(ptr & ~1);
	LDKOutPoint a_var = tuple->a;
	CHECK((((long)a_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&a_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long a_ref = (long)a_var.inner & ~1;
	return a_ref;
}
int8_tArray  __attribute__((visibility("default"))) TS_LDKC2Tuple_OutPointScriptZ_get_b(uint32_t ptr) {
	LDKC2Tuple_OutPointScriptZ *tuple = (LDKC2Tuple_OutPointScriptZ*)(ptr & ~1);
	LDKCVec_u8Z b_var = tuple->b;
	int8_tArray b_arr = init_arr(b_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(b_arr + 4), b_var.data, b_var.datalen);
	return b_arr;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_u32TxOutZ_new(int32_t a, uint32_t b) {
	LDKC2Tuple_u32TxOutZ* ret = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ), "LDKC2Tuple_u32TxOutZ");
	ret->a = a;
	LDKTxOut b_conv = *(LDKTxOut*)(((uint64_t)b) & ~1);
	FREE((void*)b);
	ret->b = b_conv;
	return (long)ret;
}
int32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_u32TxOutZ_get_a(uint32_t ptr) {
	LDKC2Tuple_u32TxOutZ *tuple = (LDKC2Tuple_u32TxOutZ*)(ptr & ~1);
	return tuple->a;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_u32TxOutZ_get_b(uint32_t ptr) {
	LDKC2Tuple_u32TxOutZ *tuple = (LDKC2Tuple_u32TxOutZ*)(ptr & ~1);
	long b_ref = ((long)&tuple->b) | 1;
	return (long)b_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_C2Tuple_u32TxOutZZ_new(uint32_tArray elems) {
	LDKCVec_C2Tuple_u32TxOutZZ *ret = MALLOC(sizeof(LDKCVec_C2Tuple_u32TxOutZZ), "LDKCVec_C2Tuple_u32TxOutZZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ) * ret->datalen, "LDKCVec_C2Tuple_u32TxOutZZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKC2Tuple_u32TxOutZ arr_elem_conv = *(LDKC2Tuple_u32TxOutZ*)(((uint64_t)arr_elem) & ~1);
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_C2Tuple_u32TxOutZZ CVec_C2Tuple_u32TxOutZZ_clone(const LDKCVec_C2Tuple_u32TxOutZZ *orig) {
	LDKCVec_C2Tuple_u32TxOutZZ ret = { .data = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ) * orig->datalen, "LDKCVec_C2Tuple_u32TxOutZZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = C2Tuple_u32TxOutZ_clone(&orig->data[i]);
	}
	return ret;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(int8_tArray a, uint32_tArray b) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ* ret = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ");
	LDKThirtyTwoBytes a_ref;
	CHECK(*((uint32_t*)a) == 32);
	memcpy(a_ref.data, (uint8_t*)(a + 4), 32);
	ret->a = a_ref;
	LDKCVec_C2Tuple_u32TxOutZZ b_constr;
	b_constr.datalen = *((uint32_t*)b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKC2Tuple_u32TxOutZ), "LDKCVec_C2Tuple_u32TxOutZZ Elements");
	else
		b_constr.data = NULL;
	uint32_t* b_vals = (uint32_t*)(b + 4);
	for (size_t z = 0; z < b_constr.datalen; z++) {
		uint32_t arr_conv_25 = b_vals[z];
		LDKC2Tuple_u32TxOutZ arr_conv_25_conv = *(LDKC2Tuple_u32TxOutZ*)(((uint64_t)arr_conv_25) & ~1);
		FREE((void*)arr_conv_25);
		b_constr.data[z] = arr_conv_25_conv;
	}
	ret->b = b_constr;
	return (long)ret;
}
int8_tArray  __attribute__((visibility("default"))) TS_LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(uint32_t ptr) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ *tuple = (LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)(ptr & ~1);
	int8_tArray a_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(a_arr + 4), tuple->a.data, 32);
	return a_arr;
}
uint32_tArray  __attribute__((visibility("default"))) TS_LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(uint32_t ptr) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ *tuple = (LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)(ptr & ~1);
	LDKCVec_C2Tuple_u32TxOutZZ b_var = tuple->b;
	uint32_tArray b_arr = init_arr(b_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *b_arr_ptr = (uint32_t*)(b_arr + 4);
	for (size_t z = 0; z < b_var.datalen; z++) {
		long arr_conv_25_ref = (long)(&b_var.data[z]) | 1;
		b_arr_ptr[z] = arr_conv_25_ref;
	}
	return b_arr;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_new(uint32_tArray elems) {
	LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ *ret = MALLOC(sizeof(LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ), "LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ) * ret->datalen, "LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ arr_elem_conv = *(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)(((uint64_t)arr_elem) & ~1);
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_SignatureCVec_SignatureZZ_new(int8_tArray a, ptrArray b) {
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret = MALLOC(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ), "LDKC2Tuple_SignatureCVec_SignatureZZ");
	LDKSignature a_ref;
	CHECK(*((uint32_t*)a) == 64);
	memcpy(a_ref.compact_form, (uint8_t*)(a + 4), 64);
	ret->a = a_ref;
	LDKCVec_SignatureZ b_constr;
	b_constr.datalen = *((uint32_t*)b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		b_constr.data = NULL;
	int8_tArray* b_vals = (int8_tArray*)(b + 4);
	for (size_t m = 0; m < b_constr.datalen; m++) {
		int8_tArray arr_conv_12 = b_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*((uint32_t*)arr_conv_12) == 64);
		memcpy(arr_conv_12_ref.compact_form, (uint8_t*)(arr_conv_12 + 4), 64);
		b_constr.data[m] = arr_conv_12_ref;
	}
	ret->b = b_constr;
	return (long)ret;
}
int8_tArray  __attribute__((visibility("default"))) TS_LDKC2Tuple_SignatureCVec_SignatureZZ_get_a(uint32_t ptr) {
	LDKC2Tuple_SignatureCVec_SignatureZZ *tuple = (LDKC2Tuple_SignatureCVec_SignatureZZ*)(ptr & ~1);
	int8_tArray a_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(a_arr + 4), tuple->a.compact_form, 64);
	return a_arr;
}
ptrArray  __attribute__((visibility("default"))) TS_LDKC2Tuple_SignatureCVec_SignatureZZ_get_b(uint32_t ptr) {
	LDKC2Tuple_SignatureCVec_SignatureZZ *tuple = (LDKC2Tuple_SignatureCVec_SignatureZZ*)(ptr & ~1);
	LDKCVec_SignatureZ b_var = tuple->b;
	ptrArray b_arr = init_arr(b_var.datalen, sizeof(uint32_t), "Native ptrArray Bytes");
	int8_tArray *b_arr_ptr = (int8_tArray*)(b_arr + 4);
	for (size_t m = 0; m < b_var.datalen; m++) {
		int8_tArray arr_conv_12_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
		memcpy((uint8_t*)(arr_conv_12_arr + 4), b_var.data[m].compact_form, 64);
		b_arr_ptr[m] = arr_conv_12_arr;
	}
	return b_arr;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_result_ok(uint32_t arg) {
	return ((LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_ok(uint32_t arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ *val = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)(arg & ~1);
	CHECK(val->result_ok);
	long res_ref = (long)(&(*val->contents.result)) | 1;
	return res_ref;
}
void  __attribute__((visibility("default"))) TS_LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_err(uint32_t arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ *val = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)(arg & ~1);
	CHECK(!val->result_ok);
	return *val->contents.err;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_SignatureNoneZ_result_ok(uint32_t arg) {
	return ((LDKCResult_SignatureNoneZ*)arg)->result_ok;
}
int8_tArray  __attribute__((visibility("default"))) TS_LDKCResult_SignatureNoneZ_get_ok(uint32_t arg) {
	LDKCResult_SignatureNoneZ *val = (LDKCResult_SignatureNoneZ*)(arg & ~1);
	CHECK(val->result_ok);
	int8_tArray res_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(res_arr + 4), (*val->contents.result).compact_form, 64);
	return res_arr;
}
void  __attribute__((visibility("default"))) TS_LDKCResult_SignatureNoneZ_get_err(uint32_t arg) {
	LDKCResult_SignatureNoneZ *val = (LDKCResult_SignatureNoneZ*)(arg & ~1);
	CHECK(!val->result_ok);
	return *val->contents.err;
}
typedef struct LDKChannelKeys_JCalls {
	atomic_size_t refcnt;
	uint32_t get_per_commitment_point_meth;
	uint32_t release_commitment_secret_meth;
	uint32_t key_derivation_params_meth;
	uint32_t sign_counterparty_commitment_meth;
	uint32_t sign_holder_commitment_and_htlcs_meth;
	uint32_t sign_justice_transaction_meth;
	uint32_t sign_counterparty_htlc_transaction_meth;
	uint32_t sign_closing_transaction_meth;
	uint32_t sign_channel_announcement_meth;
	uint32_t ready_channel_meth;
	uint32_t write_meth;
} LDKChannelKeys_JCalls;
static void LDKChannelKeys_JCalls_free(void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->get_per_commitment_point_meth);
		js_free(j_calls->release_commitment_secret_meth);
		js_free(j_calls->key_derivation_params_meth);
		js_free(j_calls->sign_counterparty_commitment_meth);
		js_free(j_calls->sign_holder_commitment_and_htlcs_meth);
		js_free(j_calls->sign_justice_transaction_meth);
		js_free(j_calls->sign_counterparty_htlc_transaction_meth);
		js_free(j_calls->sign_closing_transaction_meth);
		js_free(j_calls->sign_channel_announcement_meth);
		js_free(j_calls->ready_channel_meth);
		js_free(j_calls->write_meth);
		FREE(j_calls);
	}
}
LDKPublicKey get_per_commitment_point_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	int8_tArray arg = js_invoke_function_1(j_calls->get_per_commitment_point_meth, idx);
	LDKPublicKey arg_ref;
	CHECK(*((uint32_t*)arg) == 33);
	memcpy(arg_ref.compressed_form, (uint8_t*)(arg + 4), 33);
	return arg_ref;
}
LDKThirtyTwoBytes release_commitment_secret_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	int8_tArray arg = js_invoke_function_1(j_calls->release_commitment_secret_meth, idx);
	LDKThirtyTwoBytes arg_ref;
	CHECK(*((uint32_t*)arg) == 32);
	memcpy(arg_ref.data, (uint8_t*)(arg + 4), 32);
	return arg_ref;
}
LDKC2Tuple_u64u64Z key_derivation_params_jcall(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKC2Tuple_u64u64Z* ret = (LDKC2Tuple_u64u64Z*)js_invoke_function_0(j_calls->key_derivation_params_meth);
	LDKC2Tuple_u64u64Z ret_conv = *(LDKC2Tuple_u64u64Z*)(((uint64_t)ret) & ~1);
	ret_conv = C2Tuple_u64u64Z_clone((LDKC2Tuple_u64u64Z*)ret);
	return ret_conv;
}
LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment_jcall(const void* this_arg, const LDKCommitmentTransaction * commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKCommitmentTransaction commitment_tx_var = *commitment_tx;
	commitment_tx_var = CommitmentTransaction_clone(commitment_tx);
	CHECK((((long)commitment_tx_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&commitment_tx_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long commitment_tx_ref = (long)commitment_tx_var.inner;
	if (commitment_tx_var.is_owned) {
		commitment_tx_ref |= 1;
	}
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)js_invoke_function_1(j_calls->sign_counterparty_commitment_meth, commitment_tx_ref);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_clone((LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)ret);
	return ret_conv;
}
LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_holder_commitment_and_htlcs_jcall(const void* this_arg, const LDKHolderCommitmentTransaction * commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKHolderCommitmentTransaction commitment_tx_var = *commitment_tx;
	commitment_tx_var = HolderCommitmentTransaction_clone(commitment_tx);
	CHECK((((long)commitment_tx_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&commitment_tx_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long commitment_tx_ref = (long)commitment_tx_var.inner;
	if (commitment_tx_var.is_owned) {
		commitment_tx_ref |= 1;
	}
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)js_invoke_function_1(j_calls->sign_holder_commitment_and_htlcs_meth, commitment_tx_ref);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_clone((LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_justice_transaction_jcall(const void* this_arg, LDKTransaction justice_tx, uintptr_t input, uint64_t amount, const uint8_t (* per_commitment_key)[32], const LDKHTLCOutputInCommitment * htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKTransaction justice_tx_var = justice_tx;
	int8_tArray justice_tx_arr = init_arr(justice_tx_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(justice_tx_arr + 4), justice_tx_var.data, justice_tx_var.datalen);
	Transaction_free(justice_tx_var);
	int8_tArray per_commitment_key_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(per_commitment_key_arr + 4), *per_commitment_key, 32);
	LDKHTLCOutputInCommitment htlc_var = *htlc;
	htlc_var = HTLCOutputInCommitment_clone(htlc);
	CHECK((((long)htlc_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&htlc_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long htlc_ref = (long)htlc_var.inner;
	if (htlc_var.is_owned) {
		htlc_ref |= 1;
	}
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)js_invoke_function_5(j_calls->sign_justice_transaction_meth, justice_tx_arr, input, amount, per_commitment_key_arr, htlc_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_SignatureNoneZ_clone((LDKCResult_SignatureNoneZ*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_counterparty_htlc_transaction_jcall(const void* this_arg, LDKTransaction htlc_tx, uintptr_t input, uint64_t amount, LDKPublicKey per_commitment_point, const LDKHTLCOutputInCommitment * htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKTransaction htlc_tx_var = htlc_tx;
	int8_tArray htlc_tx_arr = init_arr(htlc_tx_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(htlc_tx_arr + 4), htlc_tx_var.data, htlc_tx_var.datalen);
	Transaction_free(htlc_tx_var);
	int8_tArray per_commitment_point_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(per_commitment_point_arr + 4), per_commitment_point.compressed_form, 33);
	LDKHTLCOutputInCommitment htlc_var = *htlc;
	htlc_var = HTLCOutputInCommitment_clone(htlc);
	CHECK((((long)htlc_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&htlc_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long htlc_ref = (long)htlc_var.inner;
	if (htlc_var.is_owned) {
		htlc_ref |= 1;
	}
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)js_invoke_function_5(j_calls->sign_counterparty_htlc_transaction_meth, htlc_tx_arr, input, amount, per_commitment_point_arr, htlc_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_SignatureNoneZ_clone((LDKCResult_SignatureNoneZ*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_closing_transaction_jcall(const void* this_arg, LDKTransaction closing_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKTransaction closing_tx_var = closing_tx;
	int8_tArray closing_tx_arr = init_arr(closing_tx_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(closing_tx_arr + 4), closing_tx_var.data, closing_tx_var.datalen);
	Transaction_free(closing_tx_var);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)js_invoke_function_1(j_calls->sign_closing_transaction_meth, closing_tx_arr);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_SignatureNoneZ_clone((LDKCResult_SignatureNoneZ*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_channel_announcement_jcall(const void* this_arg, const LDKUnsignedChannelAnnouncement * msg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKUnsignedChannelAnnouncement msg_var = *msg;
	msg_var = UnsignedChannelAnnouncement_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)js_invoke_function_1(j_calls->sign_channel_announcement_meth, msg_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_SignatureNoneZ_clone((LDKCResult_SignatureNoneZ*)ret);
	return ret_conv;
}
void ready_channel_jcall(void* this_arg, const LDKChannelTransactionParameters * channel_parameters) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKChannelTransactionParameters channel_parameters_var = *channel_parameters;
	channel_parameters_var = ChannelTransactionParameters_clone(channel_parameters);
	CHECK((((long)channel_parameters_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&channel_parameters_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long channel_parameters_ref = (long)channel_parameters_var.inner;
	if (channel_parameters_var.is_owned) {
		channel_parameters_ref |= 1;
	}
	js_invoke_function_1(j_calls->ready_channel_meth, channel_parameters_ref);
}
LDKCVec_u8Z write_jcall(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	int8_tArray arg = js_invoke_function_0(j_calls->write_meth);
	LDKCVec_u8Z arg_ref;
	arg_ref.datalen = *((uint32_t*)arg);
	arg_ref.data = MALLOC(arg_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(arg_ref.data, (uint8_t*)(arg + 4), arg_ref.datalen);
	return arg_ref;
}
static void* LDKChannelKeys_JCalls_clone(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKChannelKeys LDKChannelKeys_init (/*TODO: JS Object Reference */void* o, uint32_t pubkeys) {
	LDKChannelKeys_JCalls *calls = MALLOC(sizeof(LDKChannelKeys_JCalls), "LDKChannelKeys_JCalls");
	atomic_init(&calls->refcnt, 1);
	//TODO: Assign calls->o from o

	LDKChannelPublicKeys pubkeys_conv;
	pubkeys_conv.inner = (void*)(pubkeys & (~1));
	pubkeys_conv.is_owned = (pubkeys & 1) || (pubkeys == 0);
	pubkeys_conv = ChannelPublicKeys_clone(&pubkeys_conv);

	LDKChannelKeys ret = {
		.this_arg = (void*) calls,
		.get_per_commitment_point = get_per_commitment_point_jcall,
		.release_commitment_secret = release_commitment_secret_jcall,
		.key_derivation_params = key_derivation_params_jcall,
		.sign_counterparty_commitment = sign_counterparty_commitment_jcall,
		.sign_holder_commitment_and_htlcs = sign_holder_commitment_and_htlcs_jcall,
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
long  __attribute__((visibility("default"))) TS_LDKChannelKeys_new(/*TODO: JS Object Reference */void* o, uint32_t pubkeys) {
	LDKChannelKeys *res_ptr = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*res_ptr = LDKChannelKeys_init(o, pubkeys);
	return (long)res_ptr;
}
int8_tArray  __attribute__((visibility("default"))) TS_ChannelKeys_get_per_commitment_point(uint32_t this_arg, int64_t idx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), (this_arg_conv->get_per_commitment_point)(this_arg_conv->this_arg, idx).compressed_form, 33);
	return arg_arr;
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelKeys_release_commitment_secret(uint32_t this_arg, int64_t idx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	int8_tArray arg_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), (this_arg_conv->release_commitment_secret)(this_arg_conv->this_arg, idx).data, 32);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelKeys_key_derivation_params(uint32_t this_arg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKC2Tuple_u64u64Z* ret_ref = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret_ref = (this_arg_conv->key_derivation_params)(this_arg_conv->this_arg);
	return (long)ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelKeys_sign_counterparty_commitment(uint32_t this_arg, uint32_t commitment_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = false;
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = (this_arg_conv->sign_counterparty_commitment)(this_arg_conv->this_arg, &commitment_tx_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelKeys_sign_holder_commitment_and_htlcs(uint32_t this_arg, uint32_t commitment_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKHolderCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = false;
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = (this_arg_conv->sign_holder_commitment_and_htlcs)(this_arg_conv->this_arg, &commitment_tx_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelKeys_sign_justice_transaction(uint32_t this_arg, int8_tArray justice_tx, intptr_t input, int64_t amount, int8_tArray per_commitment_key, uint32_t htlc) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction justice_tx_ref;
	justice_tx_ref.datalen = *((uint32_t*)justice_tx);
	justice_tx_ref.data = MALLOC(justice_tx_ref.datalen, "LDKTransaction Bytes");
	memcpy(justice_tx_ref.data, (uint8_t*)(justice_tx + 4), justice_tx_ref.datalen);
	justice_tx_ref.data_is_owned = true;
	unsigned char per_commitment_key_arr[32];
	CHECK(*((uint32_t*)per_commitment_key) == 32);
	memcpy(per_commitment_key_arr, (uint8_t*)(per_commitment_key + 4), 32);
	unsigned char (*per_commitment_key_ref)[32] = &per_commitment_key_arr;
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_justice_transaction)(this_arg_conv->this_arg, justice_tx_ref, input, amount, per_commitment_key_ref, &htlc_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelKeys_sign_counterparty_htlc_transaction(uint32_t this_arg, int8_tArray htlc_tx, intptr_t input, int64_t amount, int8_tArray per_commitment_point, uint32_t htlc) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction htlc_tx_ref;
	htlc_tx_ref.datalen = *((uint32_t*)htlc_tx);
	htlc_tx_ref.data = MALLOC(htlc_tx_ref.datalen, "LDKTransaction Bytes");
	memcpy(htlc_tx_ref.data, (uint8_t*)(htlc_tx + 4), htlc_tx_ref.datalen);
	htlc_tx_ref.data_is_owned = true;
	LDKPublicKey per_commitment_point_ref;
	CHECK(*((uint32_t*)per_commitment_point) == 33);
	memcpy(per_commitment_point_ref.compressed_form, (uint8_t*)(per_commitment_point + 4), 33);
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_counterparty_htlc_transaction)(this_arg_conv->this_arg, htlc_tx_ref, input, amount, per_commitment_point_ref, &htlc_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelKeys_sign_closing_transaction(uint32_t this_arg, int8_tArray closing_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction closing_tx_ref;
	closing_tx_ref.datalen = *((uint32_t*)closing_tx);
	closing_tx_ref.data = MALLOC(closing_tx_ref.datalen, "LDKTransaction Bytes");
	memcpy(closing_tx_ref.data, (uint8_t*)(closing_tx + 4), closing_tx_ref.datalen);
	closing_tx_ref.data_is_owned = true;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_closing_transaction)(this_arg_conv->this_arg, closing_tx_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelKeys_sign_channel_announcement(uint32_t this_arg, uint32_t msg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKUnsignedChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_channel_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_ChannelKeys_ready_channel(uint32_t this_arg, uint32_t channel_parameters) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKChannelTransactionParameters channel_parameters_conv;
	channel_parameters_conv.inner = (void*)(channel_parameters & (~1));
	channel_parameters_conv.is_owned = false;
	(this_arg_conv->ready_channel)(this_arg_conv->this_arg, &channel_parameters_conv);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelKeys_write(uint32_t this_arg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKCVec_u8Z arg_var = (this_arg_conv->write)(this_arg_conv->this_arg);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

LDKChannelPublicKeys LDKChannelKeys_set_get_pubkeys(LDKChannelKeys* this_arg) {
	if (this_arg->set_pubkeys != NULL)
		this_arg->set_pubkeys(this_arg);
	return this_arg->pubkeys;
}
uint32_t  __attribute__((visibility("default"))) TS_ChannelKeys_get_pubkeys(uint32_t this_arg) {
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

uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_BlockHashChannelMonitorZ_new(int8_tArray a, uint32_t b) {
	LDKC2Tuple_BlockHashChannelMonitorZ* ret = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelMonitorZ), "LDKC2Tuple_BlockHashChannelMonitorZ");
	LDKThirtyTwoBytes a_ref;
	CHECK(*((uint32_t*)a) == 32);
	memcpy(a_ref.data, (uint8_t*)(a + 4), 32);
	ret->a = a_ref;
	LDKChannelMonitor b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	b_conv = ChannelMonitor_clone(&b_conv);
	ret->b = b_conv;
	return (long)ret;
}
int8_tArray  __attribute__((visibility("default"))) TS_LDKC2Tuple_BlockHashChannelMonitorZ_get_a(uint32_t ptr) {
	LDKC2Tuple_BlockHashChannelMonitorZ *tuple = (LDKC2Tuple_BlockHashChannelMonitorZ*)(ptr & ~1);
	int8_tArray a_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(a_arr + 4), tuple->a.data, 32);
	return a_arr;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_BlockHashChannelMonitorZ_get_b(uint32_t ptr) {
	LDKC2Tuple_BlockHashChannelMonitorZ *tuple = (LDKC2Tuple_BlockHashChannelMonitorZ*)(ptr & ~1);
	LDKChannelMonitor b_var = tuple->b;
	CHECK((((long)b_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&b_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long b_ref = (long)b_var.inner & ~1;
	return b_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	long res_ref = (long)(&(*val->contents.result)) | 1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_SpendableOutputDescriptorDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_SpendableOutputDescriptorDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ *val = (LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	long res_ref = ((long)&(*val->contents.result)) | 1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_SpendableOutputDescriptorDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ *val = (LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_ChanKeySignerDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_ChanKeySignerDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ChanKeySignerDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_ChanKeySignerDecodeErrorZ *val = (LDKCResult_ChanKeySignerDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = ChannelKeys_clone(&(*val->contents.result));
	return (long)ret;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ChanKeySignerDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_ChanKeySignerDecodeErrorZ *val = (LDKCResult_ChanKeySignerDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_InMemoryChannelKeysDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_InMemoryChannelKeysDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_InMemoryChannelKeysDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_InMemoryChannelKeysDecodeErrorZ *val = (LDKCResult_InMemoryChannelKeysDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKInMemoryChannelKeys res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_InMemoryChannelKeysDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_InMemoryChannelKeysDecodeErrorZ *val = (LDKCResult_InMemoryChannelKeysDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_TxOutAccessErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_TxOutAccessErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_TxOutAccessErrorZ_get_ok(uint32_t arg) {
	LDKCResult_TxOutAccessErrorZ *val = (LDKCResult_TxOutAccessErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	long res_ref = ((long)&(*val->contents.result)) | 1;
	return (long)res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_TxOutAccessErrorZ_get_err(uint32_t arg) {
	LDKCResult_TxOutAccessErrorZ *val = (LDKCResult_TxOutAccessErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	uint32_t err_conv = LDKAccessError_to_js((*val->contents.err));
	return err_conv;
}
uint32_t __attribute__((visibility("default"))) TS_LDKAPIError_ref_from_ptr(uint32_t ptr) {
	LDKAPIError *obj = (LDKAPIError*)ptr;
	switch(obj->tag) {
		case LDKAPIError_APIMisuseError: {
			LDKCVec_u8Z err_var = obj->api_misuse_error.err;
			int8_tArray err_arr = init_arr(err_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(err_arr + 4), err_var.data, err_var.datalen);
			return 0 /* LDKAPIError - APIMisuseError */; (void) err_arr;
		}
		case LDKAPIError_FeeRateTooHigh: {
			LDKCVec_u8Z err_var = obj->fee_rate_too_high.err;
			int8_tArray err_arr = init_arr(err_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(err_arr + 4), err_var.data, err_var.datalen);
			return 0 /* LDKAPIError - FeeRateTooHigh */; (void) err_arr; (void) obj->fee_rate_too_high.feerate;
		}
		case LDKAPIError_RouteError: {
			LDKStr err_str = obj->route_error.err;
			jstring err_conv = str_ref_to_ts(err_str.chars, err_str.len);
			return 0 /* LDKAPIError - RouteError */; (void) err_conv;
		}
		case LDKAPIError_ChannelUnavailable: {
			LDKCVec_u8Z err_var = obj->channel_unavailable.err;
			int8_tArray err_arr = init_arr(err_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(err_arr + 4), err_var.data, err_var.datalen);
			return 0 /* LDKAPIError - ChannelUnavailable */; (void) err_arr;
		}
		case LDKAPIError_MonitorUpdateFailed: {
			return 0 /* LDKAPIError - MonitorUpdateFailed */;
		}
		default: abort();
	}
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_NoneAPIErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_NoneAPIErrorZ*)arg)->result_ok;
}
void  __attribute__((visibility("default"))) TS_LDKCResult_NoneAPIErrorZ_get_ok(uint32_t arg) {
	LDKCResult_NoneAPIErrorZ *val = (LDKCResult_NoneAPIErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NoneAPIErrorZ_get_err(uint32_t arg) {
	LDKCResult_NoneAPIErrorZ *val = (LDKCResult_NoneAPIErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	long err_ref = ((long)&(*val->contents.err)) | 1;
	return err_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_ChannelDetailsZ_new(uint32_tArray elems) {
	LDKCVec_ChannelDetailsZ *ret = MALLOC(sizeof(LDKCVec_ChannelDetailsZ), "LDKCVec_ChannelDetailsZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKChannelDetails) * ret->datalen, "LDKCVec_ChannelDetailsZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKChannelDetails arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
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
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_NonePaymentSendFailureZ_result_ok(uint32_t arg) {
	return ((LDKCResult_NonePaymentSendFailureZ*)arg)->result_ok;
}
void  __attribute__((visibility("default"))) TS_LDKCResult_NonePaymentSendFailureZ_get_ok(uint32_t arg) {
	LDKCResult_NonePaymentSendFailureZ *val = (LDKCResult_NonePaymentSendFailureZ*)(arg & ~1);
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NonePaymentSendFailureZ_get_err(uint32_t arg) {
	LDKCResult_NonePaymentSendFailureZ *val = (LDKCResult_NonePaymentSendFailureZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKPaymentSendFailure err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
uint32_t __attribute__((visibility("default"))) TS_LDKNetAddress_ref_from_ptr(uint32_t ptr) {
	LDKNetAddress *obj = (LDKNetAddress*)ptr;
	switch(obj->tag) {
		case LDKNetAddress_IPv4: {
			int8_tArray addr_arr = init_arr(4, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(addr_arr + 4), obj->i_pv4.addr.data, 4);
			return 0 /* LDKNetAddress - IPv4 */; (void) addr_arr; (void) obj->i_pv4.port;
		}
		case LDKNetAddress_IPv6: {
			int8_tArray addr_arr = init_arr(16, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(addr_arr + 4), obj->i_pv6.addr.data, 16);
			return 0 /* LDKNetAddress - IPv6 */; (void) addr_arr; (void) obj->i_pv6.port;
		}
		case LDKNetAddress_OnionV2: {
			int8_tArray addr_arr = init_arr(10, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(addr_arr + 4), obj->onion_v2.addr.data, 10);
			return 0 /* LDKNetAddress - OnionV2 */; (void) addr_arr; (void) obj->onion_v2.port;
		}
		case LDKNetAddress_OnionV3: {
			int8_tArray ed25519_pubkey_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
			memcpy((uint8_t*)(ed25519_pubkey_arr + 4), obj->onion_v3.ed25519_pubkey.data, 32);
			return 0 /* LDKNetAddress - OnionV3 */; (void) ed25519_pubkey_arr; (void) obj->onion_v3.checksum; (void) obj->onion_v3.version; (void) obj->onion_v3.port;
		}
		default: abort();
	}
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_NetAddressZ_new(uint32_tArray elems) {
	LDKCVec_NetAddressZ *ret = MALLOC(sizeof(LDKCVec_NetAddressZ), "LDKCVec_NetAddressZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKNetAddress) * ret->datalen, "LDKCVec_NetAddressZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKNetAddress arr_elem_conv = *(LDKNetAddress*)(((uint64_t)arr_elem) & ~1);
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
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_ChannelMonitorZ_new(uint32_tArray elems) {
	LDKCVec_ChannelMonitorZ *ret = MALLOC(sizeof(LDKCVec_ChannelMonitorZ), "LDKCVec_ChannelMonitorZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKChannelMonitor) * ret->datalen, "LDKCVec_ChannelMonitorZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKChannelMonitor arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			arr_elem_conv = ChannelMonitor_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
static inline LDKCVec_ChannelMonitorZ CVec_ChannelMonitorZ_clone(const LDKCVec_ChannelMonitorZ *orig) {
	LDKCVec_ChannelMonitorZ ret = { .data = MALLOC(sizeof(LDKChannelMonitor) * orig->datalen, "LDKCVec_ChannelMonitorZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = ChannelMonitor_clone(&orig->data[i]);
	}
	return ret;
}
typedef struct LDKWatch_JCalls {
	atomic_size_t refcnt;
	uint32_t watch_channel_meth;
	uint32_t update_channel_meth;
	uint32_t release_pending_monitor_events_meth;
} LDKWatch_JCalls;
static void LDKWatch_JCalls_free(void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->watch_channel_meth);
		js_free(j_calls->update_channel_meth);
		js_free(j_calls->release_pending_monitor_events_meth);
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
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)js_invoke_function_2(j_calls->watch_channel_meth, funding_txo_ref, monitor_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_NoneChannelMonitorUpdateErrZ_clone((LDKCResult_NoneChannelMonitorUpdateErrZ*)ret);
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
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)js_invoke_function_2(j_calls->update_channel_meth, funding_txo_ref, update_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_NoneChannelMonitorUpdateErrZ_clone((LDKCResult_NoneChannelMonitorUpdateErrZ*)ret);
	return ret_conv;
}
LDKCVec_MonitorEventZ release_pending_monitor_events_jcall(const void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	uint32_tArray arg = js_invoke_function_0(j_calls->release_pending_monitor_events_meth);
	LDKCVec_MonitorEventZ arg_constr;
	arg_constr.datalen = *((uint32_t*)arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKMonitorEvent), "LDKCVec_MonitorEventZ Elements");
	else
		arg_constr.data = NULL;
	uint32_t* arg_vals = (uint32_t*)(arg + 4);
	for (size_t o = 0; o < arg_constr.datalen; o++) {
		uint32_t arr_conv_14 = arg_vals[o];
		LDKMonitorEvent arr_conv_14_conv;
		arr_conv_14_conv.inner = (void*)(arr_conv_14 & (~1));
		arr_conv_14_conv.is_owned = (arr_conv_14 & 1) || (arr_conv_14 == 0);
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
static inline LDKWatch LDKWatch_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKWatch_new(/*TODO: JS Object Reference */void* o) {
	LDKWatch *res_ptr = MALLOC(sizeof(LDKWatch), "LDKWatch");
	*res_ptr = LDKWatch_init(o);
	return (long)res_ptr;
}
uint32_t  __attribute__((visibility("default"))) TS_Watch_watch_channel(uint32_t this_arg, uint32_t funding_txo, uint32_t monitor) {
	LDKWatch* this_arg_conv = (LDKWatch*)this_arg;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	funding_txo_conv = OutPoint_clone(&funding_txo_conv);
	LDKChannelMonitor monitor_conv;
	monitor_conv.inner = (void*)(monitor & (~1));
	monitor_conv.is_owned = (monitor & 1) || (monitor == 0);
	monitor_conv = ChannelMonitor_clone(&monitor_conv);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->watch_channel)(this_arg_conv->this_arg, funding_txo_conv, monitor_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_Watch_update_channel(uint32_t this_arg, uint32_t funding_txo, uint32_t update) {
	LDKWatch* this_arg_conv = (LDKWatch*)this_arg;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	funding_txo_conv = OutPoint_clone(&funding_txo_conv);
	LDKChannelMonitorUpdate update_conv;
	update_conv.inner = (void*)(update & (~1));
	update_conv.is_owned = (update & 1) || (update == 0);
	update_conv = ChannelMonitorUpdate_clone(&update_conv);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->update_channel)(this_arg_conv->this_arg, funding_txo_conv, update_conv);
	return (long)ret_conv;
}

uint32_tArray  __attribute__((visibility("default"))) TS_Watch_release_pending_monitor_events(uint32_t this_arg) {
	LDKWatch* this_arg_conv = (LDKWatch*)this_arg;
	LDKCVec_MonitorEventZ ret_var = (this_arg_conv->release_pending_monitor_events)(this_arg_conv->this_arg);
	uint32_tArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr + 4);
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
	uint32_t broadcast_transaction_meth;
} LDKBroadcasterInterface_JCalls;
static void LDKBroadcasterInterface_JCalls_free(void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->broadcast_transaction_meth);
		FREE(j_calls);
	}
}
void broadcast_transaction_jcall(const void* this_arg, LDKTransaction tx) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	LDKTransaction tx_var = tx;
	int8_tArray tx_arr = init_arr(tx_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(tx_arr + 4), tx_var.data, tx_var.datalen);
	Transaction_free(tx_var);
	js_invoke_function_1(j_calls->broadcast_transaction_meth, tx_arr);
}
static void* LDKBroadcasterInterface_JCalls_clone(const void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKBroadcasterInterface LDKBroadcasterInterface_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKBroadcasterInterface_new(/*TODO: JS Object Reference */void* o) {
	LDKBroadcasterInterface *res_ptr = MALLOC(sizeof(LDKBroadcasterInterface), "LDKBroadcasterInterface");
	*res_ptr = LDKBroadcasterInterface_init(o);
	return (long)res_ptr;
}
void  __attribute__((visibility("default"))) TS_BroadcasterInterface_broadcast_transaction(uint32_t this_arg, int8_tArray tx) {
	LDKBroadcasterInterface* this_arg_conv = (LDKBroadcasterInterface*)this_arg;
	LDKTransaction tx_ref;
	tx_ref.datalen = *((uint32_t*)tx);
	tx_ref.data = MALLOC(tx_ref.datalen, "LDKTransaction Bytes");
	memcpy(tx_ref.data, (uint8_t*)(tx + 4), tx_ref.datalen);
	tx_ref.data_is_owned = true;
	(this_arg_conv->broadcast_transaction)(this_arg_conv->this_arg, tx_ref);
}

typedef struct LDKKeysInterface_JCalls {
	atomic_size_t refcnt;
	uint32_t get_node_secret_meth;
	uint32_t get_destination_script_meth;
	uint32_t get_shutdown_pubkey_meth;
	uint32_t get_channel_keys_meth;
	uint32_t get_secure_random_bytes_meth;
	uint32_t read_chan_signer_meth;
} LDKKeysInterface_JCalls;
static void LDKKeysInterface_JCalls_free(void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->get_node_secret_meth);
		js_free(j_calls->get_destination_script_meth);
		js_free(j_calls->get_shutdown_pubkey_meth);
		js_free(j_calls->get_channel_keys_meth);
		js_free(j_calls->get_secure_random_bytes_meth);
		js_free(j_calls->read_chan_signer_meth);
		FREE(j_calls);
	}
}
LDKSecretKey get_node_secret_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	int8_tArray arg = js_invoke_function_0(j_calls->get_node_secret_meth);
	LDKSecretKey arg_ref;
	CHECK(*((uint32_t*)arg) == 32);
	memcpy(arg_ref.bytes, (uint8_t*)(arg + 4), 32);
	return arg_ref;
}
LDKCVec_u8Z get_destination_script_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	int8_tArray arg = js_invoke_function_0(j_calls->get_destination_script_meth);
	LDKCVec_u8Z arg_ref;
	arg_ref.datalen = *((uint32_t*)arg);
	arg_ref.data = MALLOC(arg_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(arg_ref.data, (uint8_t*)(arg + 4), arg_ref.datalen);
	return arg_ref;
}
LDKPublicKey get_shutdown_pubkey_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	int8_tArray arg = js_invoke_function_0(j_calls->get_shutdown_pubkey_meth);
	LDKPublicKey arg_ref;
	CHECK(*((uint32_t*)arg) == 33);
	memcpy(arg_ref.compressed_form, (uint8_t*)(arg + 4), 33);
	return arg_ref;
}
LDKChannelKeys get_channel_keys_jcall(const void* this_arg, bool inbound, uint64_t channel_value_satoshis) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	LDKChannelKeys* ret = (LDKChannelKeys*)js_invoke_function_2(j_calls->get_channel_keys_meth, inbound, channel_value_satoshis);
	LDKChannelKeys ret_conv = *(LDKChannelKeys*)(((uint64_t)ret) & ~1);
	ret_conv = ChannelKeys_clone(ret);
	return ret_conv;
}
LDKThirtyTwoBytes get_secure_random_bytes_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	int8_tArray arg = js_invoke_function_0(j_calls->get_secure_random_bytes_meth);
	LDKThirtyTwoBytes arg_ref;
	CHECK(*((uint32_t*)arg) == 32);
	memcpy(arg_ref.data, (uint8_t*)(arg + 4), 32);
	return arg_ref;
}
LDKCResult_ChanKeySignerDecodeErrorZ read_chan_signer_jcall(const void* this_arg, LDKu8slice reader) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	LDKu8slice reader_var = reader;
	int8_tArray reader_arr = init_arr(reader_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(reader_arr + 4), reader_var.data, reader_var.datalen);
	LDKCResult_ChanKeySignerDecodeErrorZ* ret = (LDKCResult_ChanKeySignerDecodeErrorZ*)js_invoke_function_1(j_calls->read_chan_signer_meth, reader_arr);
	LDKCResult_ChanKeySignerDecodeErrorZ ret_conv = *(LDKCResult_ChanKeySignerDecodeErrorZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_ChanKeySignerDecodeErrorZ_clone((LDKCResult_ChanKeySignerDecodeErrorZ*)ret);
	return ret_conv;
}
static void* LDKKeysInterface_JCalls_clone(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKKeysInterface LDKKeysInterface_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKKeysInterface_new(/*TODO: JS Object Reference */void* o) {
	LDKKeysInterface *res_ptr = MALLOC(sizeof(LDKKeysInterface), "LDKKeysInterface");
	*res_ptr = LDKKeysInterface_init(o);
	return (long)res_ptr;
}
int8_tArray  __attribute__((visibility("default"))) TS_KeysInterface_get_node_secret(uint32_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	int8_tArray arg_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), (this_arg_conv->get_node_secret)(this_arg_conv->this_arg).bytes, 32);
	return arg_arr;
}

int8_tArray  __attribute__((visibility("default"))) TS_KeysInterface_get_destination_script(uint32_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKCVec_u8Z arg_var = (this_arg_conv->get_destination_script)(this_arg_conv->this_arg);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

int8_tArray  __attribute__((visibility("default"))) TS_KeysInterface_get_shutdown_pubkey(uint32_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), (this_arg_conv->get_shutdown_pubkey)(this_arg_conv->this_arg).compressed_form, 33);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_KeysInterface_get_channel_keys(uint32_t this_arg, jboolean inbound, int64_t channel_value_satoshis) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = (this_arg_conv->get_channel_keys)(this_arg_conv->this_arg, inbound, channel_value_satoshis);
	return (long)ret;
}

int8_tArray  __attribute__((visibility("default"))) TS_KeysInterface_get_secure_random_bytes(uint32_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	int8_tArray arg_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), (this_arg_conv->get_secure_random_bytes)(this_arg_conv->this_arg).data, 32);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_KeysInterface_read_chan_signer(uint32_t this_arg, int8_tArray reader) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKu8slice reader_ref;
	reader_ref.datalen = *((uint32_t*)reader);
	reader_ref.data = (int8_t*)(reader + 4);
	LDKCResult_ChanKeySignerDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChanKeySignerDecodeErrorZ), "LDKCResult_ChanKeySignerDecodeErrorZ");
	*ret_conv = (this_arg_conv->read_chan_signer)(this_arg_conv->this_arg, reader_ref);
	return (long)ret_conv;
}

typedef struct LDKFeeEstimator_JCalls {
	atomic_size_t refcnt;
	uint32_t get_est_sat_per_1000_weight_meth;
} LDKFeeEstimator_JCalls;
static void LDKFeeEstimator_JCalls_free(void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->get_est_sat_per_1000_weight_meth);
		FREE(j_calls);
	}
}
uint32_t get_est_sat_per_1000_weight_jcall(const void* this_arg, LDKConfirmationTarget confirmation_target) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	uint32_t confirmation_target_conv = LDKConfirmationTarget_to_js(confirmation_target);
	return js_invoke_function_1(j_calls->get_est_sat_per_1000_weight_meth, confirmation_target_conv);
}
static void* LDKFeeEstimator_JCalls_clone(const void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKFeeEstimator LDKFeeEstimator_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKFeeEstimator_new(/*TODO: JS Object Reference */void* o) {
	LDKFeeEstimator *res_ptr = MALLOC(sizeof(LDKFeeEstimator), "LDKFeeEstimator");
	*res_ptr = LDKFeeEstimator_init(o);
	return (long)res_ptr;
}
int32_t  __attribute__((visibility("default"))) TS_FeeEstimator_get_est_sat_per_1000_weight(uint32_t this_arg, uint32_t confirmation_target) {
	LDKFeeEstimator* this_arg_conv = (LDKFeeEstimator*)this_arg;
	LDKConfirmationTarget confirmation_target_conv = LDKConfirmationTarget_from_js(confirmation_target);
	int32_t ret_val = (this_arg_conv->get_est_sat_per_1000_weight)(this_arg_conv->this_arg, confirmation_target_conv);
	return ret_val;
}

typedef struct LDKLogger_JCalls {
	atomic_size_t refcnt;
	uint32_t log_meth;
} LDKLogger_JCalls;
static void LDKLogger_JCalls_free(void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->log_meth);
		FREE(j_calls);
	}
}
void log_jcall(const void* this_arg, const char* record) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	const char* record_str = record;
	jstring record_conv = str_ref_to_ts(record_str, strlen(record_str));
	js_invoke_function_1(j_calls->log_meth, record_conv);
}
static void* LDKLogger_JCalls_clone(const void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKLogger LDKLogger_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKLogger_new(/*TODO: JS Object Reference */void* o) {
	LDKLogger *res_ptr = MALLOC(sizeof(LDKLogger), "LDKLogger");
	*res_ptr = LDKLogger_init(o);
	return (long)res_ptr;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_BlockHashChannelManagerZ_new(int8_tArray a, uint32_t b) {
	LDKC2Tuple_BlockHashChannelManagerZ* ret = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelManagerZ), "LDKC2Tuple_BlockHashChannelManagerZ");
	LDKThirtyTwoBytes a_ref;
	CHECK(*((uint32_t*)a) == 32);
	memcpy(a_ref.data, (uint8_t*)(a + 4), 32);
	ret->a = a_ref;
	LDKChannelManager b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	// Warning: we need a move here but no clone is available for LDKChannelManager
	ret->b = b_conv;
	return (long)ret;
}
int8_tArray  __attribute__((visibility("default"))) TS_LDKC2Tuple_BlockHashChannelManagerZ_get_a(uint32_t ptr) {
	LDKC2Tuple_BlockHashChannelManagerZ *tuple = (LDKC2Tuple_BlockHashChannelManagerZ*)(ptr & ~1);
	int8_tArray a_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(a_arr + 4), tuple->a.data, 32);
	return a_arr;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC2Tuple_BlockHashChannelManagerZ_get_b(uint32_t ptr) {
	LDKC2Tuple_BlockHashChannelManagerZ *tuple = (LDKC2Tuple_BlockHashChannelManagerZ*)(ptr & ~1);
	LDKChannelManager b_var = tuple->b;
	CHECK((((long)b_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&b_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long b_ref = (long)b_var.inner & ~1;
	return b_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	long res_ref = (long)(&(*val->contents.result)) | 1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_NetAddressu8Z_result_ok(uint32_t arg) {
	return ((LDKCResult_NetAddressu8Z*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NetAddressu8Z_get_ok(uint32_t arg) {
	LDKCResult_NetAddressu8Z *val = (LDKCResult_NetAddressu8Z*)(arg & ~1);
	CHECK(val->result_ok);
	long res_ref = ((long)&(*val->contents.result)) | 1;
	return res_ref;
}
int8_t  __attribute__((visibility("default"))) TS_LDKCResult_NetAddressu8Z_get_err(uint32_t arg) {
	LDKCResult_NetAddressu8Z *val = (LDKCResult_NetAddressu8Z*)(arg & ~1);
	CHECK(!val->result_ok);
	return *val->contents.err;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ *val = (LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKCResult_NetAddressu8Z* res_conv = MALLOC(sizeof(LDKCResult_NetAddressu8Z), "LDKCResult_NetAddressu8Z");
	*res_conv = (*val->contents.result);
	*res_conv = CResult_NetAddressu8Z_clone(res_conv);
	return (long)res_conv;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ *val = (LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_u64Z_new(int64_tArray elems) {
	LDKCVec_u64Z *ret = MALLOC(sizeof(LDKCVec_u64Z), "LDKCVec_u64Z");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(uint64_t) * ret->datalen, "LDKCVec_u64Z Data");
		int64_t *java_elems = (int64_t*)(elems + 4);
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
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_UpdateAddHTLCZ_new(uint32_tArray elems) {
	LDKCVec_UpdateAddHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateAddHTLCZ), "LDKCVec_UpdateAddHTLCZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateAddHTLC) * ret->datalen, "LDKCVec_UpdateAddHTLCZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKUpdateAddHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
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
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_UpdateFulfillHTLCZ_new(uint32_tArray elems) {
	LDKCVec_UpdateFulfillHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateFulfillHTLCZ), "LDKCVec_UpdateFulfillHTLCZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFulfillHTLC) * ret->datalen, "LDKCVec_UpdateFulfillHTLCZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKUpdateFulfillHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
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
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_UpdateFailHTLCZ_new(uint32_tArray elems) {
	LDKCVec_UpdateFailHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateFailHTLCZ), "LDKCVec_UpdateFailHTLCZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFailHTLC) * ret->datalen, "LDKCVec_UpdateFailHTLCZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKUpdateFailHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
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
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_UpdateFailMalformedHTLCZ_new(uint32_tArray elems) {
	LDKCVec_UpdateFailMalformedHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateFailMalformedHTLCZ), "LDKCVec_UpdateFailMalformedHTLCZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFailMalformedHTLC) * ret->datalen, "LDKCVec_UpdateFailMalformedHTLCZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKUpdateFailMalformedHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
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
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_boolLightningErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_boolLightningErrorZ*)arg)->result_ok;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_boolLightningErrorZ_get_ok(uint32_t arg) {
	LDKCResult_boolLightningErrorZ *val = (LDKCResult_boolLightningErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_boolLightningErrorZ_get_err(uint32_t arg) {
	LDKCResult_boolLightningErrorZ *val = (LDKCResult_boolLightningErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(uint32_t a, uint32_t b, uint32_t c) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* ret = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
	LDKChannelAnnouncement a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	a_conv = ChannelAnnouncement_clone(&a_conv);
	ret->a = a_conv;
	LDKChannelUpdate b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	b_conv = ChannelUpdate_clone(&b_conv);
	ret->b = b_conv;
	LDKChannelUpdate c_conv;
	c_conv.inner = (void*)(c & (~1));
	c_conv.is_owned = (c & 1) || (c == 0);
	c_conv = ChannelUpdate_clone(&c_conv);
	ret->c = c_conv;
	return (long)ret;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(uint32_t ptr) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *tuple = (LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)(ptr & ~1);
	LDKChannelAnnouncement a_var = tuple->a;
	CHECK((((long)a_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&a_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long a_ref = (long)a_var.inner & ~1;
	return a_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(uint32_t ptr) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *tuple = (LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)(ptr & ~1);
	LDKChannelUpdate b_var = tuple->b;
	CHECK((((long)b_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&b_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long b_ref = (long)b_var.inner & ~1;
	return b_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(uint32_t ptr) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *tuple = (LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)(ptr & ~1);
	LDKChannelUpdate c_var = tuple->c;
	CHECK((((long)c_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&c_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long c_ref = (long)c_var.inner & ~1;
	return c_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_new(uint32_tArray elems) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ *ret = MALLOC(sizeof(LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ) * ret->datalen, "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_elem_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)(((uint64_t)arr_elem) & ~1);
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
	}
	return (long)ret;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_NodeAnnouncementZ_new(uint32_tArray elems) {
	LDKCVec_NodeAnnouncementZ *ret = MALLOC(sizeof(LDKCVec_NodeAnnouncementZ), "LDKCVec_NodeAnnouncementZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKNodeAnnouncement) * ret->datalen, "LDKCVec_NodeAnnouncementZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKNodeAnnouncement arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
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
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_NoneLightningErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_NoneLightningErrorZ*)arg)->result_ok;
}
void  __attribute__((visibility("default"))) TS_LDKCResult_NoneLightningErrorZ_get_ok(uint32_t arg) {
	LDKCResult_NoneLightningErrorZ *val = (LDKCResult_NoneLightningErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NoneLightningErrorZ_get_err(uint32_t arg) {
	LDKCResult_NoneLightningErrorZ *val = (LDKCResult_NoneLightningErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_ChannelReestablishDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_ChannelReestablishDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ChannelReestablishDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_ChannelReestablishDecodeErrorZ *val = (LDKCResult_ChannelReestablishDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKChannelReestablish res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ChannelReestablishDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_ChannelReestablishDecodeErrorZ *val = (LDKCResult_ChannelReestablishDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_InitDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_InitDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_InitDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_InitDecodeErrorZ *val = (LDKCResult_InitDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKInit res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_InitDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_InitDecodeErrorZ *val = (LDKCResult_InitDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_PingDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_PingDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_PingDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_PingDecodeErrorZ *val = (LDKCResult_PingDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKPing res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_PingDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_PingDecodeErrorZ *val = (LDKCResult_PingDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_PongDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_PongDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_PongDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_PongDecodeErrorZ *val = (LDKCResult_PongDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKPong res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_PongDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_PongDecodeErrorZ *val = (LDKCResult_PongDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKUnsignedChannelAnnouncement res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_UnsignedChannelUpdateDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_UnsignedChannelUpdateDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ *val = (LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKUnsignedChannelUpdate res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_UnsignedChannelUpdateDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ *val = (LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_ErrorMessageDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_ErrorMessageDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ErrorMessageDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_ErrorMessageDecodeErrorZ *val = (LDKCResult_ErrorMessageDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKErrorMessage res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ErrorMessageDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_ErrorMessageDecodeErrorZ *val = (LDKCResult_ErrorMessageDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKUnsignedNodeAnnouncement res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_QueryShortChannelIdsDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_QueryShortChannelIdsDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_QueryShortChannelIdsDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_QueryShortChannelIdsDecodeErrorZ *val = (LDKCResult_QueryShortChannelIdsDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKQueryShortChannelIds res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_QueryShortChannelIdsDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_QueryShortChannelIdsDecodeErrorZ *val = (LDKCResult_QueryShortChannelIdsDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ *val = (LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKReplyShortChannelIdsEnd res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ *val = (LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_QueryChannelRangeDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_QueryChannelRangeDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_QueryChannelRangeDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_QueryChannelRangeDecodeErrorZ *val = (LDKCResult_QueryChannelRangeDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKQueryChannelRange res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_QueryChannelRangeDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_QueryChannelRangeDecodeErrorZ *val = (LDKCResult_QueryChannelRangeDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_ReplyChannelRangeDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_ReplyChannelRangeDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ReplyChannelRangeDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_ReplyChannelRangeDecodeErrorZ *val = (LDKCResult_ReplyChannelRangeDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKReplyChannelRange res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_ReplyChannelRangeDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_ReplyChannelRangeDecodeErrorZ *val = (LDKCResult_ReplyChannelRangeDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_GossipTimestampFilterDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_GossipTimestampFilterDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_GossipTimestampFilterDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_GossipTimestampFilterDecodeErrorZ *val = (LDKCResult_GossipTimestampFilterDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKGossipTimestampFilter res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_GossipTimestampFilterDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_GossipTimestampFilterDecodeErrorZ *val = (LDKCResult_GossipTimestampFilterDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_CVec_u8ZPeerHandleErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg)->result_ok;
}
int8_tArray  __attribute__((visibility("default"))) TS_LDKCResult_CVec_u8ZPeerHandleErrorZ_get_ok(uint32_t arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ *val = (LDKCResult_CVec_u8ZPeerHandleErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKCVec_u8Z res_var = (*val->contents.result);
	int8_tArray res_arr = init_arr(res_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(res_arr + 4), res_var.data, res_var.datalen);
	return res_arr;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_CVec_u8ZPeerHandleErrorZ_get_err(uint32_t arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ *val = (LDKCResult_CVec_u8ZPeerHandleErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_NonePeerHandleErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_NonePeerHandleErrorZ*)arg)->result_ok;
}
void  __attribute__((visibility("default"))) TS_LDKCResult_NonePeerHandleErrorZ_get_ok(uint32_t arg) {
	LDKCResult_NonePeerHandleErrorZ *val = (LDKCResult_NonePeerHandleErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NonePeerHandleErrorZ_get_err(uint32_t arg) {
	LDKCResult_NonePeerHandleErrorZ *val = (LDKCResult_NonePeerHandleErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_boolPeerHandleErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_boolPeerHandleErrorZ*)arg)->result_ok;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_boolPeerHandleErrorZ_get_ok(uint32_t arg) {
	LDKCResult_boolPeerHandleErrorZ *val = (LDKCResult_boolPeerHandleErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	return *val->contents.result;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_boolPeerHandleErrorZ_get_err(uint32_t arg) {
	LDKCResult_boolPeerHandleErrorZ *val = (LDKCResult_boolPeerHandleErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_SecretKeySecpErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_SecretKeySecpErrorZ*)arg)->result_ok;
}
int8_tArray  __attribute__((visibility("default"))) TS_LDKCResult_SecretKeySecpErrorZ_get_ok(uint32_t arg) {
	LDKCResult_SecretKeySecpErrorZ *val = (LDKCResult_SecretKeySecpErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	int8_tArray res_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(res_arr + 4), (*val->contents.result).bytes, 32);
	return res_arr;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_SecretKeySecpErrorZ_get_err(uint32_t arg) {
	LDKCResult_SecretKeySecpErrorZ *val = (LDKCResult_SecretKeySecpErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	uint32_t err_conv = LDKSecp256k1Error_to_js((*val->contents.err));
	return err_conv;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_PublicKeySecpErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_PublicKeySecpErrorZ*)arg)->result_ok;
}
int8_tArray  __attribute__((visibility("default"))) TS_LDKCResult_PublicKeySecpErrorZ_get_ok(uint32_t arg) {
	LDKCResult_PublicKeySecpErrorZ *val = (LDKCResult_PublicKeySecpErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	int8_tArray res_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(res_arr + 4), (*val->contents.result).compressed_form, 33);
	return res_arr;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_PublicKeySecpErrorZ_get_err(uint32_t arg) {
	LDKCResult_PublicKeySecpErrorZ *val = (LDKCResult_PublicKeySecpErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	uint32_t err_conv = LDKSecp256k1Error_to_js((*val->contents.err));
	return err_conv;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_TxCreationKeysSecpErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_TxCreationKeysSecpErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_TxCreationKeysSecpErrorZ_get_ok(uint32_t arg) {
	LDKCResult_TxCreationKeysSecpErrorZ *val = (LDKCResult_TxCreationKeysSecpErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKTxCreationKeys res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_TxCreationKeysSecpErrorZ_get_err(uint32_t arg) {
	LDKCResult_TxCreationKeysSecpErrorZ *val = (LDKCResult_TxCreationKeysSecpErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	uint32_t err_conv = LDKSecp256k1Error_to_js((*val->contents.err));
	return err_conv;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_TrustedCommitmentTransactionNoneZ_result_ok(uint32_t arg) {
	return ((LDKCResult_TrustedCommitmentTransactionNoneZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_TrustedCommitmentTransactionNoneZ_get_ok(uint32_t arg) {
	LDKCResult_TrustedCommitmentTransactionNoneZ *val = (LDKCResult_TrustedCommitmentTransactionNoneZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKTrustedCommitmentTransaction res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
void  __attribute__((visibility("default"))) TS_LDKCResult_TrustedCommitmentTransactionNoneZ_get_err(uint32_t arg) {
	LDKCResult_TrustedCommitmentTransactionNoneZ *val = (LDKCResult_TrustedCommitmentTransactionNoneZ*)(arg & ~1);
	CHECK(!val->result_ok);
	return *val->contents.err;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_CVec_SignatureZNoneZ_result_ok(uint32_t arg) {
	return ((LDKCResult_CVec_SignatureZNoneZ*)arg)->result_ok;
}
ptrArray  __attribute__((visibility("default"))) TS_LDKCResult_CVec_SignatureZNoneZ_get_ok(uint32_t arg) {
	LDKCResult_CVec_SignatureZNoneZ *val = (LDKCResult_CVec_SignatureZNoneZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKCVec_SignatureZ res_var = (*val->contents.result);
	ptrArray res_arr = init_arr(res_var.datalen, sizeof(uint32_t), "Native ptrArray Bytes");
	int8_tArray *res_arr_ptr = (int8_tArray*)(res_arr + 4);
	for (size_t m = 0; m < res_var.datalen; m++) {
		int8_tArray arr_conv_12_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
		memcpy((uint8_t*)(arr_conv_12_arr + 4), res_var.data[m].compact_form, 64);
		res_arr_ptr[m] = arr_conv_12_arr;
	}
	return res_arr;
}
void  __attribute__((visibility("default"))) TS_LDKCResult_CVec_SignatureZNoneZ_get_err(uint32_t arg) {
	LDKCResult_CVec_SignatureZNoneZ *val = (LDKCResult_CVec_SignatureZNoneZ*)(arg & ~1);
	CHECK(!val->result_ok);
	return *val->contents.err;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_RouteHopZ_new(uint32_tArray elems) {
	LDKCVec_RouteHopZ *ret = MALLOC(sizeof(LDKCVec_RouteHopZ), "LDKCVec_RouteHopZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKRouteHop) * ret->datalen, "LDKCVec_RouteHopZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKRouteHop arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
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
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_RouteDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_RouteDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_RouteDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_RouteDecodeErrorZ *val = (LDKCResult_RouteDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKRoute res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_RouteDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_RouteDecodeErrorZ *val = (LDKCResult_RouteDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCVec_RouteHintZ_new(uint32_tArray elems) {
	LDKCVec_RouteHintZ *ret = MALLOC(sizeof(LDKCVec_RouteHintZ), "LDKCVec_RouteHintZ");
	ret->datalen = *((uint32_t*)elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKRouteHint) * ret->datalen, "LDKCVec_RouteHintZ Data");
		uint32_t *java_elems = (uint32_t*)(elems + 4);
		for (size_t i = 0; i < ret->datalen; i++) {
			uint32_t arr_elem = java_elems[i];
			LDKRouteHint arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
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
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_RouteLightningErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_RouteLightningErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_RouteLightningErrorZ_get_ok(uint32_t arg) {
	LDKCResult_RouteLightningErrorZ *val = (LDKCResult_RouteLightningErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKRoute res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_RouteLightningErrorZ_get_err(uint32_t arg) {
	LDKCResult_RouteLightningErrorZ *val = (LDKCResult_RouteLightningErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_RoutingFeesDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_RoutingFeesDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_RoutingFeesDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_RoutingFeesDecodeErrorZ *val = (LDKCResult_RoutingFeesDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKRoutingFees res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_RoutingFeesDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_RoutingFeesDecodeErrorZ *val = (LDKCResult_RoutingFeesDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_NodeAnnouncementInfoDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NodeAnnouncementInfoDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ *val = (LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKNodeAnnouncementInfo res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NodeAnnouncementInfoDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ *val = (LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_NodeInfoDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_NodeInfoDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NodeInfoDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_NodeInfoDecodeErrorZ *val = (LDKCResult_NodeInfoDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKNodeInfo res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NodeInfoDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_NodeInfoDecodeErrorZ *val = (LDKCResult_NodeInfoDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
jboolean  __attribute__((visibility("default"))) TS_LDKCResult_NetworkGraphDecodeErrorZ_result_ok(uint32_t arg) {
	return ((LDKCResult_NetworkGraphDecodeErrorZ*)arg)->result_ok;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NetworkGraphDecodeErrorZ_get_ok(uint32_t arg) {
	LDKCResult_NetworkGraphDecodeErrorZ *val = (LDKCResult_NetworkGraphDecodeErrorZ*)(arg & ~1);
	CHECK(val->result_ok);
	LDKNetworkGraph res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
uint32_t  __attribute__((visibility("default"))) TS_LDKCResult_NetworkGraphDecodeErrorZ_get_err(uint32_t arg) {
	LDKCResult_NetworkGraphDecodeErrorZ *val = (LDKCResult_NetworkGraphDecodeErrorZ*)(arg & ~1);
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
typedef struct LDKMessageSendEventsProvider_JCalls {
	atomic_size_t refcnt;
	uint32_t get_and_clear_pending_msg_events_meth;
} LDKMessageSendEventsProvider_JCalls;
static void LDKMessageSendEventsProvider_JCalls_free(void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->get_and_clear_pending_msg_events_meth);
		FREE(j_calls);
	}
}
LDKCVec_MessageSendEventZ get_and_clear_pending_msg_events_jcall(const void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	uint32_tArray arg = js_invoke_function_0(j_calls->get_and_clear_pending_msg_events_meth);
	LDKCVec_MessageSendEventZ arg_constr;
	arg_constr.datalen = *((uint32_t*)arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKMessageSendEvent), "LDKCVec_MessageSendEventZ Elements");
	else
		arg_constr.data = NULL;
	uint32_t* arg_vals = (uint32_t*)(arg + 4);
	for (size_t s = 0; s < arg_constr.datalen; s++) {
		uint32_t arr_conv_18 = arg_vals[s];
		LDKMessageSendEvent arr_conv_18_conv = *(LDKMessageSendEvent*)(((uint64_t)arr_conv_18) & ~1);
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
static inline LDKMessageSendEventsProvider LDKMessageSendEventsProvider_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKMessageSendEventsProvider_new(/*TODO: JS Object Reference */void* o) {
	LDKMessageSendEventsProvider *res_ptr = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*res_ptr = LDKMessageSendEventsProvider_init(o);
	return (long)res_ptr;
}
uint32_tArray  __attribute__((visibility("default"))) TS_MessageSendEventsProvider_get_and_clear_pending_msg_events(uint32_t this_arg) {
	LDKMessageSendEventsProvider* this_arg_conv = (LDKMessageSendEventsProvider*)this_arg;
	LDKCVec_MessageSendEventZ ret_var = (this_arg_conv->get_and_clear_pending_msg_events)(this_arg_conv->this_arg);
	uint32_tArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr + 4);
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
	uint32_t get_and_clear_pending_events_meth;
} LDKEventsProvider_JCalls;
static void LDKEventsProvider_JCalls_free(void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->get_and_clear_pending_events_meth);
		FREE(j_calls);
	}
}
LDKCVec_EventZ get_and_clear_pending_events_jcall(const void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	uint32_tArray arg = js_invoke_function_0(j_calls->get_and_clear_pending_events_meth);
	LDKCVec_EventZ arg_constr;
	arg_constr.datalen = *((uint32_t*)arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKEvent), "LDKCVec_EventZ Elements");
	else
		arg_constr.data = NULL;
	uint32_t* arg_vals = (uint32_t*)(arg + 4);
	for (size_t h = 0; h < arg_constr.datalen; h++) {
		uint32_t arr_conv_7 = arg_vals[h];
		LDKEvent arr_conv_7_conv = *(LDKEvent*)(((uint64_t)arr_conv_7) & ~1);
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
static inline LDKEventsProvider LDKEventsProvider_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKEventsProvider_new(/*TODO: JS Object Reference */void* o) {
	LDKEventsProvider *res_ptr = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*res_ptr = LDKEventsProvider_init(o);
	return (long)res_ptr;
}
uint32_tArray  __attribute__((visibility("default"))) TS_EventsProvider_get_and_clear_pending_events(uint32_t this_arg) {
	LDKEventsProvider* this_arg_conv = (LDKEventsProvider*)this_arg;
	LDKCVec_EventZ ret_var = (this_arg_conv->get_and_clear_pending_events)(this_arg_conv->this_arg);
	uint32_tArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr + 4);
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
	uint32_t get_utxo_meth;
} LDKAccess_JCalls;
static void LDKAccess_JCalls_free(void* this_arg) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->get_utxo_meth);
		FREE(j_calls);
	}
}
LDKCResult_TxOutAccessErrorZ get_utxo_jcall(const void* this_arg, const uint8_t (* genesis_hash)[32], uint64_t short_channel_id) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	int8_tArray genesis_hash_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(genesis_hash_arr + 4), *genesis_hash, 32);
	LDKCResult_TxOutAccessErrorZ* ret = (LDKCResult_TxOutAccessErrorZ*)js_invoke_function_2(j_calls->get_utxo_meth, genesis_hash_arr, short_channel_id);
	LDKCResult_TxOutAccessErrorZ ret_conv = *(LDKCResult_TxOutAccessErrorZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_TxOutAccessErrorZ_clone((LDKCResult_TxOutAccessErrorZ*)ret);
	return ret_conv;
}
static void* LDKAccess_JCalls_clone(const void* this_arg) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKAccess LDKAccess_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKAccess_new(/*TODO: JS Object Reference */void* o) {
	LDKAccess *res_ptr = MALLOC(sizeof(LDKAccess), "LDKAccess");
	*res_ptr = LDKAccess_init(o);
	return (long)res_ptr;
}
uint32_t  __attribute__((visibility("default"))) TS_Access_get_utxo(uint32_t this_arg, int8_tArray genesis_hash, int64_t short_channel_id) {
	LDKAccess* this_arg_conv = (LDKAccess*)this_arg;
	unsigned char genesis_hash_arr[32];
	CHECK(*((uint32_t*)genesis_hash) == 32);
	memcpy(genesis_hash_arr, (uint8_t*)(genesis_hash + 4), 32);
	unsigned char (*genesis_hash_ref)[32] = &genesis_hash_arr;
	LDKCResult_TxOutAccessErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret_conv = (this_arg_conv->get_utxo)(this_arg_conv->this_arg, genesis_hash_ref, short_channel_id);
	return (long)ret_conv;
}

typedef struct LDKFilter_JCalls {
	atomic_size_t refcnt;
	uint32_t register_tx_meth;
	uint32_t register_output_meth;
} LDKFilter_JCalls;
static void LDKFilter_JCalls_free(void* this_arg) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->register_tx_meth);
		js_free(j_calls->register_output_meth);
		FREE(j_calls);
	}
}
void register_tx_jcall(const void* this_arg, const uint8_t (* txid)[32], LDKu8slice script_pubkey) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	int8_tArray txid_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(txid_arr + 4), *txid, 32);
	LDKu8slice script_pubkey_var = script_pubkey;
	int8_tArray script_pubkey_arr = init_arr(script_pubkey_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(script_pubkey_arr + 4), script_pubkey_var.data, script_pubkey_var.datalen);
	js_invoke_function_2(j_calls->register_tx_meth, txid_arr, script_pubkey_arr);
}
void register_output_jcall(const void* this_arg, const LDKOutPoint * outpoint, LDKu8slice script_pubkey) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	LDKOutPoint outpoint_var = *outpoint;
	outpoint_var = OutPoint_clone(outpoint);
	CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long outpoint_ref = (long)outpoint_var.inner;
	if (outpoint_var.is_owned) {
		outpoint_ref |= 1;
	}
	LDKu8slice script_pubkey_var = script_pubkey;
	int8_tArray script_pubkey_arr = init_arr(script_pubkey_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(script_pubkey_arr + 4), script_pubkey_var.data, script_pubkey_var.datalen);
	js_invoke_function_2(j_calls->register_output_meth, outpoint_ref, script_pubkey_arr);
}
static void* LDKFilter_JCalls_clone(const void* this_arg) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKFilter LDKFilter_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKFilter_new(/*TODO: JS Object Reference */void* o) {
	LDKFilter *res_ptr = MALLOC(sizeof(LDKFilter), "LDKFilter");
	*res_ptr = LDKFilter_init(o);
	return (long)res_ptr;
}
void  __attribute__((visibility("default"))) TS_Filter_register_tx(uint32_t this_arg, int8_tArray txid, int8_tArray script_pubkey) {
	LDKFilter* this_arg_conv = (LDKFilter*)this_arg;
	unsigned char txid_arr[32];
	CHECK(*((uint32_t*)txid) == 32);
	memcpy(txid_arr, (uint8_t*)(txid + 4), 32);
	unsigned char (*txid_ref)[32] = &txid_arr;
	LDKu8slice script_pubkey_ref;
	script_pubkey_ref.datalen = *((uint32_t*)script_pubkey);
	script_pubkey_ref.data = (int8_t*)(script_pubkey + 4);
	(this_arg_conv->register_tx)(this_arg_conv->this_arg, txid_ref, script_pubkey_ref);
}

void  __attribute__((visibility("default"))) TS_Filter_register_output(uint32_t this_arg, uint32_t outpoint, int8_tArray script_pubkey) {
	LDKFilter* this_arg_conv = (LDKFilter*)this_arg;
	LDKOutPoint outpoint_conv;
	outpoint_conv.inner = (void*)(outpoint & (~1));
	outpoint_conv.is_owned = false;
	LDKu8slice script_pubkey_ref;
	script_pubkey_ref.datalen = *((uint32_t*)script_pubkey);
	script_pubkey_ref.data = (int8_t*)(script_pubkey + 4);
	(this_arg_conv->register_output)(this_arg_conv->this_arg, &outpoint_conv, script_pubkey_ref);
}

typedef struct LDKPersist_JCalls {
	atomic_size_t refcnt;
	uint32_t persist_new_channel_meth;
	uint32_t update_persisted_channel_meth;
} LDKPersist_JCalls;
static void LDKPersist_JCalls_free(void* this_arg) {
	LDKPersist_JCalls *j_calls = (LDKPersist_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->persist_new_channel_meth);
		js_free(j_calls->update_persisted_channel_meth);
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
	data_var = ChannelMonitor_clone(data);
	CHECK((((long)data_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&data_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long data_ref = (long)data_var.inner;
	if (data_var.is_owned) {
		data_ref |= 1;
	}
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)js_invoke_function_2(j_calls->persist_new_channel_meth, id_ref, data_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_NoneChannelMonitorUpdateErrZ_clone((LDKCResult_NoneChannelMonitorUpdateErrZ*)ret);
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
	update_var = ChannelMonitorUpdate_clone(update);
	CHECK((((long)update_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&update_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long update_ref = (long)update_var.inner;
	if (update_var.is_owned) {
		update_ref |= 1;
	}
	LDKChannelMonitor data_var = *data;
	data_var = ChannelMonitor_clone(data);
	CHECK((((long)data_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&data_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long data_ref = (long)data_var.inner;
	if (data_var.is_owned) {
		data_ref |= 1;
	}
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)js_invoke_function_3(j_calls->update_persisted_channel_meth, id_ref, update_ref, data_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_NoneChannelMonitorUpdateErrZ_clone((LDKCResult_NoneChannelMonitorUpdateErrZ*)ret);
	return ret_conv;
}
static void* LDKPersist_JCalls_clone(const void* this_arg) {
	LDKPersist_JCalls *j_calls = (LDKPersist_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKPersist LDKPersist_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKPersist_new(/*TODO: JS Object Reference */void* o) {
	LDKPersist *res_ptr = MALLOC(sizeof(LDKPersist), "LDKPersist");
	*res_ptr = LDKPersist_init(o);
	return (long)res_ptr;
}
uint32_t  __attribute__((visibility("default"))) TS_Persist_persist_new_channel(uint32_t this_arg, uint32_t id, uint32_t data) {
	LDKPersist* this_arg_conv = (LDKPersist*)this_arg;
	LDKOutPoint id_conv;
	id_conv.inner = (void*)(id & (~1));
	id_conv.is_owned = (id & 1) || (id == 0);
	id_conv = OutPoint_clone(&id_conv);
	LDKChannelMonitor data_conv;
	data_conv.inner = (void*)(data & (~1));
	data_conv.is_owned = false;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->persist_new_channel)(this_arg_conv->this_arg, id_conv, &data_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_Persist_update_persisted_channel(uint32_t this_arg, uint32_t id, uint32_t update, uint32_t data) {
	LDKPersist* this_arg_conv = (LDKPersist*)this_arg;
	LDKOutPoint id_conv;
	id_conv.inner = (void*)(id & (~1));
	id_conv.is_owned = (id & 1) || (id == 0);
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
	LDKMessageSendEventsProvider_JCalls* MessageSendEventsProvider;
	uint32_t handle_open_channel_meth;
	uint32_t handle_accept_channel_meth;
	uint32_t handle_funding_created_meth;
	uint32_t handle_funding_signed_meth;
	uint32_t handle_funding_locked_meth;
	uint32_t handle_shutdown_meth;
	uint32_t handle_closing_signed_meth;
	uint32_t handle_update_add_htlc_meth;
	uint32_t handle_update_fulfill_htlc_meth;
	uint32_t handle_update_fail_htlc_meth;
	uint32_t handle_update_fail_malformed_htlc_meth;
	uint32_t handle_commitment_signed_meth;
	uint32_t handle_revoke_and_ack_meth;
	uint32_t handle_update_fee_meth;
	uint32_t handle_announcement_signatures_meth;
	uint32_t peer_disconnected_meth;
	uint32_t peer_connected_meth;
	uint32_t handle_channel_reestablish_meth;
	uint32_t handle_error_meth;
} LDKChannelMessageHandler_JCalls;
static void LDKChannelMessageHandler_JCalls_free(void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->handle_open_channel_meth);
		js_free(j_calls->handle_accept_channel_meth);
		js_free(j_calls->handle_funding_created_meth);
		js_free(j_calls->handle_funding_signed_meth);
		js_free(j_calls->handle_funding_locked_meth);
		js_free(j_calls->handle_shutdown_meth);
		js_free(j_calls->handle_closing_signed_meth);
		js_free(j_calls->handle_update_add_htlc_meth);
		js_free(j_calls->handle_update_fulfill_htlc_meth);
		js_free(j_calls->handle_update_fail_htlc_meth);
		js_free(j_calls->handle_update_fail_malformed_htlc_meth);
		js_free(j_calls->handle_commitment_signed_meth);
		js_free(j_calls->handle_revoke_and_ack_meth);
		js_free(j_calls->handle_update_fee_meth);
		js_free(j_calls->handle_announcement_signatures_meth);
		js_free(j_calls->peer_disconnected_meth);
		js_free(j_calls->peer_connected_meth);
		js_free(j_calls->handle_channel_reestablish_meth);
		js_free(j_calls->handle_error_meth);
		FREE(j_calls);
	}
}
void handle_open_channel_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKOpenChannel * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKInitFeatures their_features_var = their_features;
	CHECK((((long)their_features_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&their_features_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long their_features_ref = (long)their_features_var.inner;
	if (their_features_var.is_owned) {
		their_features_ref |= 1;
	}
	LDKOpenChannel msg_var = *msg;
	msg_var = OpenChannel_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_3(j_calls->handle_open_channel_meth, their_node_id_arr, their_features_ref, msg_ref);
}
void handle_accept_channel_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKAcceptChannel * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKInitFeatures their_features_var = their_features;
	CHECK((((long)their_features_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&their_features_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long their_features_ref = (long)their_features_var.inner;
	if (their_features_var.is_owned) {
		their_features_ref |= 1;
	}
	LDKAcceptChannel msg_var = *msg;
	msg_var = AcceptChannel_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_3(j_calls->handle_accept_channel_meth, their_node_id_arr, their_features_ref, msg_ref);
}
void handle_funding_created_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingCreated * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKFundingCreated msg_var = *msg;
	msg_var = FundingCreated_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_funding_created_meth, their_node_id_arr, msg_ref);
}
void handle_funding_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingSigned * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKFundingSigned msg_var = *msg;
	msg_var = FundingSigned_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_funding_signed_meth, their_node_id_arr, msg_ref);
}
void handle_funding_locked_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingLocked * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKFundingLocked msg_var = *msg;
	msg_var = FundingLocked_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_funding_locked_meth, their_node_id_arr, msg_ref);
}
void handle_shutdown_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKShutdown * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKShutdown msg_var = *msg;
	msg_var = Shutdown_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_shutdown_meth, their_node_id_arr, msg_ref);
}
void handle_closing_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKClosingSigned * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKClosingSigned msg_var = *msg;
	msg_var = ClosingSigned_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_closing_signed_meth, their_node_id_arr, msg_ref);
}
void handle_update_add_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateAddHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKUpdateAddHTLC msg_var = *msg;
	msg_var = UpdateAddHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_update_add_htlc_meth, their_node_id_arr, msg_ref);
}
void handle_update_fulfill_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFulfillHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKUpdateFulfillHTLC msg_var = *msg;
	msg_var = UpdateFulfillHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_update_fulfill_htlc_meth, their_node_id_arr, msg_ref);
}
void handle_update_fail_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKUpdateFailHTLC msg_var = *msg;
	msg_var = UpdateFailHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_update_fail_htlc_meth, their_node_id_arr, msg_ref);
}
void handle_update_fail_malformed_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailMalformedHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKUpdateFailMalformedHTLC msg_var = *msg;
	msg_var = UpdateFailMalformedHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_update_fail_malformed_htlc_meth, their_node_id_arr, msg_ref);
}
void handle_commitment_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKCommitmentSigned * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKCommitmentSigned msg_var = *msg;
	msg_var = CommitmentSigned_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_commitment_signed_meth, their_node_id_arr, msg_ref);
}
void handle_revoke_and_ack_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKRevokeAndACK * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKRevokeAndACK msg_var = *msg;
	msg_var = RevokeAndACK_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_revoke_and_ack_meth, their_node_id_arr, msg_ref);
}
void handle_update_fee_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFee * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKUpdateFee msg_var = *msg;
	msg_var = UpdateFee_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_update_fee_meth, their_node_id_arr, msg_ref);
}
void handle_announcement_signatures_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKAnnouncementSignatures * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKAnnouncementSignatures msg_var = *msg;
	msg_var = AnnouncementSignatures_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_announcement_signatures_meth, their_node_id_arr, msg_ref);
}
void peer_disconnected_jcall(const void* this_arg, LDKPublicKey their_node_id, bool no_connection_possible) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	js_invoke_function_2(j_calls->peer_disconnected_meth, their_node_id_arr, no_connection_possible);
}
void peer_connected_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKInit * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKInit msg_var = *msg;
	msg_var = Init_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->peer_connected_meth, their_node_id_arr, msg_ref);
}
void handle_channel_reestablish_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKChannelReestablish * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKChannelReestablish msg_var = *msg;
	msg_var = ChannelReestablish_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_channel_reestablish_meth, their_node_id_arr, msg_ref);
}
void handle_error_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKErrorMessage * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKErrorMessage msg_var = *msg;
	msg_var = ErrorMessage_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	js_invoke_function_2(j_calls->handle_error_meth, their_node_id_arr, msg_ref);
}
static void* LDKChannelMessageHandler_JCalls_clone(const void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	atomic_fetch_add_explicit(&j_calls->MessageSendEventsProvider->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKChannelMessageHandler LDKChannelMessageHandler_init (/*TODO: JS Object Reference */void* o, /*TODO: JS Object Reference */void* MessageSendEventsProvider) {
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
		.MessageSendEventsProvider = LDKMessageSendEventsProvider_init(MessageSendEventsProvider),
	};
	calls->MessageSendEventsProvider = ret.MessageSendEventsProvider.this_arg;
	return ret;
}
long  __attribute__((visibility("default"))) TS_LDKChannelMessageHandler_new(/*TODO: JS Object Reference */void* o, /*TODO: JS Object Reference */ void* MessageSendEventsProvider) {
	LDKChannelMessageHandler *res_ptr = MALLOC(sizeof(LDKChannelMessageHandler), "LDKChannelMessageHandler");
	*res_ptr = LDKChannelMessageHandler_init(o, MessageSendEventsProvider);
	return (long)res_ptr;
}
void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_open_channel(uint32_t this_arg, int8_tArray their_node_id, uint32_t their_features, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKInitFeatures their_features_conv;
	their_features_conv.inner = (void*)(their_features & (~1));
	their_features_conv.is_owned = (their_features & 1) || (their_features == 0);
	// Warning: we need a move here but no clone is available for LDKInitFeatures
	LDKOpenChannel msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_open_channel)(this_arg_conv->this_arg, their_node_id_ref, their_features_conv, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_accept_channel(uint32_t this_arg, int8_tArray their_node_id, uint32_t their_features, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKInitFeatures their_features_conv;
	their_features_conv.inner = (void*)(their_features & (~1));
	their_features_conv.is_owned = (their_features & 1) || (their_features == 0);
	// Warning: we need a move here but no clone is available for LDKInitFeatures
	LDKAcceptChannel msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_accept_channel)(this_arg_conv->this_arg, their_node_id_ref, their_features_conv, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_funding_created(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKFundingCreated msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_funding_created)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_funding_signed(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKFundingSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_funding_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_funding_locked(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKFundingLocked msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_funding_locked)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_shutdown(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKShutdown msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_shutdown)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_closing_signed(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKClosingSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_closing_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_update_add_htlc(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKUpdateAddHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_add_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_update_fulfill_htlc(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKUpdateFulfillHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fulfill_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_update_fail_htlc(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKUpdateFailHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fail_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_update_fail_malformed_htlc(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKUpdateFailMalformedHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fail_malformed_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_commitment_signed(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKCommitmentSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_commitment_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_revoke_and_ack(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKRevokeAndACK msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_revoke_and_ack)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_update_fee(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKUpdateFee msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fee)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_announcement_signatures(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKAnnouncementSignatures msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_announcement_signatures)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_peer_disconnected(uint32_t this_arg, int8_tArray their_node_id, jboolean no_connection_possible) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	(this_arg_conv->peer_disconnected)(this_arg_conv->this_arg, their_node_id_ref, no_connection_possible);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_peer_connected(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKInit msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->peer_connected)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_channel_reestablish(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKChannelReestablish msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_channel_reestablish)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_handle_error(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKErrorMessage msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_error)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

typedef struct LDKRoutingMessageHandler_JCalls {
	atomic_size_t refcnt;
	LDKMessageSendEventsProvider_JCalls* MessageSendEventsProvider;
	uint32_t handle_node_announcement_meth;
	uint32_t handle_channel_announcement_meth;
	uint32_t handle_channel_update_meth;
	uint32_t handle_htlc_fail_channel_update_meth;
	uint32_t get_next_channel_announcements_meth;
	uint32_t get_next_node_announcements_meth;
	uint32_t sync_routing_table_meth;
	uint32_t handle_reply_channel_range_meth;
	uint32_t handle_reply_short_channel_ids_end_meth;
	uint32_t handle_query_channel_range_meth;
	uint32_t handle_query_short_channel_ids_meth;
} LDKRoutingMessageHandler_JCalls;
static void LDKRoutingMessageHandler_JCalls_free(void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->handle_node_announcement_meth);
		js_free(j_calls->handle_channel_announcement_meth);
		js_free(j_calls->handle_channel_update_meth);
		js_free(j_calls->handle_htlc_fail_channel_update_meth);
		js_free(j_calls->get_next_channel_announcements_meth);
		js_free(j_calls->get_next_node_announcements_meth);
		js_free(j_calls->sync_routing_table_meth);
		js_free(j_calls->handle_reply_channel_range_meth);
		js_free(j_calls->handle_reply_short_channel_ids_end_meth);
		js_free(j_calls->handle_query_channel_range_meth);
		js_free(j_calls->handle_query_short_channel_ids_meth);
		FREE(j_calls);
	}
}
LDKCResult_boolLightningErrorZ handle_node_announcement_jcall(const void* this_arg, const LDKNodeAnnouncement * msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	LDKNodeAnnouncement msg_var = *msg;
	msg_var = NodeAnnouncement_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)js_invoke_function_1(j_calls->handle_node_announcement_meth, msg_ref);
	LDKCResult_boolLightningErrorZ ret_conv = *(LDKCResult_boolLightningErrorZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_boolLightningErrorZ_clone((LDKCResult_boolLightningErrorZ*)ret);
	return ret_conv;
}
LDKCResult_boolLightningErrorZ handle_channel_announcement_jcall(const void* this_arg, const LDKChannelAnnouncement * msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	LDKChannelAnnouncement msg_var = *msg;
	msg_var = ChannelAnnouncement_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)js_invoke_function_1(j_calls->handle_channel_announcement_meth, msg_ref);
	LDKCResult_boolLightningErrorZ ret_conv = *(LDKCResult_boolLightningErrorZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_boolLightningErrorZ_clone((LDKCResult_boolLightningErrorZ*)ret);
	return ret_conv;
}
LDKCResult_boolLightningErrorZ handle_channel_update_jcall(const void* this_arg, const LDKChannelUpdate * msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	LDKChannelUpdate msg_var = *msg;
	msg_var = ChannelUpdate_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)js_invoke_function_1(j_calls->handle_channel_update_meth, msg_ref);
	LDKCResult_boolLightningErrorZ ret_conv = *(LDKCResult_boolLightningErrorZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_boolLightningErrorZ_clone((LDKCResult_boolLightningErrorZ*)ret);
	return ret_conv;
}
void handle_htlc_fail_channel_update_jcall(const void* this_arg, const LDKHTLCFailChannelUpdate * update) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	long ret_update = (long)update;
	js_invoke_function_1(j_calls->handle_htlc_fail_channel_update_meth, ret_update);
}
LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ get_next_channel_announcements_jcall(const void* this_arg, uint64_t starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	uint32_tArray arg = js_invoke_function_2(j_calls->get_next_channel_announcements_meth, starting_point, batch_amount);
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ arg_constr;
	arg_constr.datalen = *((uint32_t*)arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Elements");
	else
		arg_constr.data = NULL;
	uint32_t* arg_vals = (uint32_t*)(arg + 4);
	for (size_t l = 0; l < arg_constr.datalen; l++) {
		uint32_t arr_conv_63 = arg_vals[l];
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_conv_63_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)(((uint64_t)arr_conv_63) & ~1);
		FREE((void*)arr_conv_63);
		arg_constr.data[l] = arr_conv_63_conv;
	}
	return arg_constr;
}
LDKCVec_NodeAnnouncementZ get_next_node_announcements_jcall(const void* this_arg, LDKPublicKey starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray starting_point_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(starting_point_arr + 4), starting_point.compressed_form, 33);
	uint32_tArray arg = js_invoke_function_2(j_calls->get_next_node_announcements_meth, starting_point_arr, batch_amount);
	LDKCVec_NodeAnnouncementZ arg_constr;
	arg_constr.datalen = *((uint32_t*)arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKNodeAnnouncement), "LDKCVec_NodeAnnouncementZ Elements");
	else
		arg_constr.data = NULL;
	uint32_t* arg_vals = (uint32_t*)(arg + 4);
	for (size_t s = 0; s < arg_constr.datalen; s++) {
		uint32_t arr_conv_18 = arg_vals[s];
		LDKNodeAnnouncement arr_conv_18_conv;
		arr_conv_18_conv.inner = (void*)(arr_conv_18 & (~1));
		arr_conv_18_conv.is_owned = (arr_conv_18 & 1) || (arr_conv_18 == 0);
		arr_conv_18_conv = NodeAnnouncement_clone(&arr_conv_18_conv);
		arg_constr.data[s] = arr_conv_18_conv;
	}
	return arg_constr;
}
void sync_routing_table_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKInit * init) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKInit init_var = *init;
	init_var = Init_clone(init);
	CHECK((((long)init_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&init_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long init_ref = (long)init_var.inner;
	if (init_var.is_owned) {
		init_ref |= 1;
	}
	js_invoke_function_2(j_calls->sync_routing_table_meth, their_node_id_arr, init_ref);
}
LDKCResult_NoneLightningErrorZ handle_reply_channel_range_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKReplyChannelRange msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKReplyChannelRange msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	LDKCResult_NoneLightningErrorZ* ret = (LDKCResult_NoneLightningErrorZ*)js_invoke_function_2(j_calls->handle_reply_channel_range_meth, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_NoneLightningErrorZ_clone((LDKCResult_NoneLightningErrorZ*)ret);
	return ret_conv;
}
LDKCResult_NoneLightningErrorZ handle_reply_short_channel_ids_end_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKReplyShortChannelIdsEnd msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKReplyShortChannelIdsEnd msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	LDKCResult_NoneLightningErrorZ* ret = (LDKCResult_NoneLightningErrorZ*)js_invoke_function_2(j_calls->handle_reply_short_channel_ids_end_meth, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_NoneLightningErrorZ_clone((LDKCResult_NoneLightningErrorZ*)ret);
	return ret_conv;
}
LDKCResult_NoneLightningErrorZ handle_query_channel_range_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKQueryChannelRange msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKQueryChannelRange msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	LDKCResult_NoneLightningErrorZ* ret = (LDKCResult_NoneLightningErrorZ*)js_invoke_function_2(j_calls->handle_query_channel_range_meth, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_NoneLightningErrorZ_clone((LDKCResult_NoneLightningErrorZ*)ret);
	return ret_conv;
}
LDKCResult_NoneLightningErrorZ handle_query_short_channel_ids_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKQueryShortChannelIds msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	int8_tArray their_node_id_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(their_node_id_arr + 4), their_node_id.compressed_form, 33);
	LDKQueryShortChannelIds msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	LDKCResult_NoneLightningErrorZ* ret = (LDKCResult_NoneLightningErrorZ*)js_invoke_function_2(j_calls->handle_query_short_channel_ids_meth, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)(((uint64_t)ret) & ~1);
	ret_conv = CResult_NoneLightningErrorZ_clone((LDKCResult_NoneLightningErrorZ*)ret);
	return ret_conv;
}
static void* LDKRoutingMessageHandler_JCalls_clone(const void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	atomic_fetch_add_explicit(&j_calls->MessageSendEventsProvider->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKRoutingMessageHandler LDKRoutingMessageHandler_init (/*TODO: JS Object Reference */void* o, /*TODO: JS Object Reference */void* MessageSendEventsProvider) {
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
		.MessageSendEventsProvider = LDKMessageSendEventsProvider_init(MessageSendEventsProvider),
	};
	calls->MessageSendEventsProvider = ret.MessageSendEventsProvider.this_arg;
	return ret;
}
long  __attribute__((visibility("default"))) TS_LDKRoutingMessageHandler_new(/*TODO: JS Object Reference */void* o, /*TODO: JS Object Reference */ void* MessageSendEventsProvider) {
	LDKRoutingMessageHandler *res_ptr = MALLOC(sizeof(LDKRoutingMessageHandler), "LDKRoutingMessageHandler");
	*res_ptr = LDKRoutingMessageHandler_init(o, MessageSendEventsProvider);
	return (long)res_ptr;
}
uint32_t  __attribute__((visibility("default"))) TS_RoutingMessageHandler_handle_node_announcement(uint32_t this_arg, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKNodeAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_node_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_RoutingMessageHandler_handle_channel_announcement(uint32_t this_arg, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_channel_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_RoutingMessageHandler_handle_channel_update(uint32_t this_arg, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKChannelUpdate msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_channel_update)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_RoutingMessageHandler_handle_htlc_fail_channel_update(uint32_t this_arg, uint32_t update) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKHTLCFailChannelUpdate* update_conv = (LDKHTLCFailChannelUpdate*)update;
	(this_arg_conv->handle_htlc_fail_channel_update)(this_arg_conv->this_arg, update_conv);
}

uint32_tArray  __attribute__((visibility("default"))) TS_RoutingMessageHandler_get_next_channel_announcements(uint32_t this_arg, int64_t starting_point, int8_t batch_amount) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_var = (this_arg_conv->get_next_channel_announcements)(this_arg_conv->this_arg, starting_point, batch_amount);
	uint32_tArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr + 4);
	for (size_t l = 0; l < ret_var.datalen; l++) {
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* arr_conv_63_ref = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
		*arr_conv_63_ref = ret_var.data[l];
		ret_arr_ptr[l] = (long)arr_conv_63_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

uint32_tArray  __attribute__((visibility("default"))) TS_RoutingMessageHandler_get_next_node_announcements(uint32_t this_arg, int8_tArray starting_point, int8_t batch_amount) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey starting_point_ref;
	CHECK(*((uint32_t*)starting_point) == 33);
	memcpy(starting_point_ref.compressed_form, (uint8_t*)(starting_point + 4), 33);
	LDKCVec_NodeAnnouncementZ ret_var = (this_arg_conv->get_next_node_announcements)(this_arg_conv->this_arg, starting_point_ref, batch_amount);
	uint32_tArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr + 4);
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

void  __attribute__((visibility("default"))) TS_RoutingMessageHandler_sync_routing_table(uint32_t this_arg, int8_tArray their_node_id, uint32_t init) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKInit init_conv;
	init_conv.inner = (void*)(init & (~1));
	init_conv.is_owned = false;
	(this_arg_conv->sync_routing_table)(this_arg_conv->this_arg, their_node_id_ref, &init_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_RoutingMessageHandler_handle_reply_channel_range(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKReplyChannelRange msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	msg_conv = ReplyChannelRange_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_reply_channel_range)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_RoutingMessageHandler_handle_reply_short_channel_ids_end(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKReplyShortChannelIdsEnd msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	msg_conv = ReplyShortChannelIdsEnd_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_reply_short_channel_ids_end)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_RoutingMessageHandler_handle_query_channel_range(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKQueryChannelRange msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	msg_conv = QueryChannelRange_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_query_channel_range)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_RoutingMessageHandler_handle_query_short_channel_ids(uint32_t this_arg, int8_tArray their_node_id, uint32_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKQueryShortChannelIds msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	msg_conv = QueryShortChannelIds_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_query_short_channel_ids)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

typedef struct LDKSocketDescriptor_JCalls {
	atomic_size_t refcnt;
	uint32_t send_data_meth;
	uint32_t disconnect_socket_meth;
	uint32_t eq_meth;
	uint32_t hash_meth;
} LDKSocketDescriptor_JCalls;
static void LDKSocketDescriptor_JCalls_free(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		js_free(j_calls->send_data_meth);
		js_free(j_calls->disconnect_socket_meth);
		js_free(j_calls->eq_meth);
		js_free(j_calls->hash_meth);
		FREE(j_calls);
	}
}
uintptr_t send_data_jcall(void* this_arg, LDKu8slice data, bool resume_read) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	LDKu8slice data_var = data;
	int8_tArray data_arr = init_arr(data_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(data_arr + 4), data_var.data, data_var.datalen);
	return js_invoke_function_2(j_calls->send_data_meth, data_arr, resume_read);
}
void disconnect_socket_jcall(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	js_invoke_function_0(j_calls->disconnect_socket_meth);
}
bool eq_jcall(const void* this_arg, const LDKSocketDescriptor * other_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	LDKSocketDescriptor *other_arg_clone = MALLOC(sizeof(LDKSocketDescriptor), "LDKSocketDescriptor");
	*other_arg_clone = SocketDescriptor_clone(other_arg);
	return js_invoke_function_1(j_calls->eq_meth, (long)other_arg_clone);
}
uint64_t hash_jcall(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	return js_invoke_function_0(j_calls->hash_meth);
}
static void* LDKSocketDescriptor_JCalls_clone(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKSocketDescriptor LDKSocketDescriptor_init (/*TODO: JS Object Reference */void* o) {
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
long  __attribute__((visibility("default"))) TS_LDKSocketDescriptor_new(/*TODO: JS Object Reference */void* o) {
	LDKSocketDescriptor *res_ptr = MALLOC(sizeof(LDKSocketDescriptor), "LDKSocketDescriptor");
	*res_ptr = LDKSocketDescriptor_init(o);
	return (long)res_ptr;
}
intptr_t  __attribute__((visibility("default"))) TS_SocketDescriptor_send_data(uint32_t this_arg, int8_tArray data, jboolean resume_read) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	LDKu8slice data_ref;
	data_ref.datalen = *((uint32_t*)data);
	data_ref.data = (int8_t*)(data + 4);
	intptr_t ret_val = (this_arg_conv->send_data)(this_arg_conv->this_arg, data_ref, resume_read);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_SocketDescriptor_disconnect_socket(uint32_t this_arg) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	(this_arg_conv->disconnect_socket)(this_arg_conv->this_arg);
}

int64_t  __attribute__((visibility("default"))) TS_SocketDescriptor_hash(uint32_t this_arg) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	int64_t ret_val = (this_arg_conv->hash)(this_arg_conv->this_arg);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_Transaction_free(int8_tArray _res) {
	LDKTransaction _res_ref;
	_res_ref.datalen = *((uint32_t*)_res);
	_res_ref.data = MALLOC(_res_ref.datalen, "LDKTransaction Bytes");
	memcpy(_res_ref.data, (uint8_t*)(_res + 4), _res_ref.datalen);
	_res_ref.data_is_owned = true;
	Transaction_free(_res_ref);
}

void  __attribute__((visibility("default"))) TS_TxOut_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKTxOut _res_conv = *(LDKTxOut*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	TxOut_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_TxOut_clone(uint32_t orig) {
	LDKTxOut* orig_conv = (LDKTxOut*)(orig & ~1);
	LDKTxOut* ret_ref = MALLOC(sizeof(LDKTxOut), "LDKTxOut");
	*ret_ref = TxOut_clone(orig_conv);
	return (long)ret_ref;
}

void  __attribute__((visibility("default"))) TS_CVec_SpendableOutputDescriptorZ_free(uint32_tArray _res) {
	LDKCVec_SpendableOutputDescriptorZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKSpendableOutputDescriptor), "LDKCVec_SpendableOutputDescriptorZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t b = 0; b < _res_constr.datalen; b++) {
		uint32_t arr_conv_27 = _res_vals[b];
		LDKSpendableOutputDescriptor arr_conv_27_conv = *(LDKSpendableOutputDescriptor*)(((uint64_t)arr_conv_27) & ~1);
		FREE((void*)arr_conv_27);
		_res_constr.data[b] = arr_conv_27_conv;
	}
	CVec_SpendableOutputDescriptorZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_CVec_MessageSendEventZ_free(uint32_tArray _res) {
	LDKCVec_MessageSendEventZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKMessageSendEvent), "LDKCVec_MessageSendEventZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t s = 0; s < _res_constr.datalen; s++) {
		uint32_t arr_conv_18 = _res_vals[s];
		LDKMessageSendEvent arr_conv_18_conv = *(LDKMessageSendEvent*)(((uint64_t)arr_conv_18) & ~1);
		FREE((void*)arr_conv_18);
		_res_constr.data[s] = arr_conv_18_conv;
	}
	CVec_MessageSendEventZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_CVec_EventZ_free(uint32_tArray _res) {
	LDKCVec_EventZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKEvent), "LDKCVec_EventZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t h = 0; h < _res_constr.datalen; h++) {
		uint32_t arr_conv_7 = _res_vals[h];
		LDKEvent arr_conv_7_conv = *(LDKEvent*)(((uint64_t)arr_conv_7) & ~1);
		FREE((void*)arr_conv_7);
		_res_constr.data[h] = arr_conv_7_conv;
	}
	CVec_EventZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_C2Tuple_usizeTransactionZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKC2Tuple_usizeTransactionZ _res_conv = *(LDKC2Tuple_usizeTransactionZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	C2Tuple_usizeTransactionZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_usizeTransactionZ_new(intptr_t a, int8_tArray b) {
	LDKTransaction b_ref;
	b_ref.datalen = *((uint32_t*)b);
	b_ref.data = MALLOC(b_ref.datalen, "LDKTransaction Bytes");
	memcpy(b_ref.data, (uint8_t*)(b + 4), b_ref.datalen);
	b_ref.data_is_owned = true;
	LDKC2Tuple_usizeTransactionZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_usizeTransactionZ), "LDKC2Tuple_usizeTransactionZ");
	*ret_ref = C2Tuple_usizeTransactionZ_new(a, b_ref);
	return (long)ret_ref;
}

void  __attribute__((visibility("default"))) TS_CVec_C2Tuple_usizeTransactionZZ_free(uint32_tArray _res) {
	LDKCVec_C2Tuple_usizeTransactionZZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t e = 0; e < _res_constr.datalen; e++) {
		uint32_t arr_conv_30 = _res_vals[e];
		LDKC2Tuple_usizeTransactionZ arr_conv_30_conv = *(LDKC2Tuple_usizeTransactionZ*)(((uint64_t)arr_conv_30) & ~1);
		FREE((void*)arr_conv_30);
		_res_constr.data[e] = arr_conv_30_conv;
	}
	CVec_C2Tuple_usizeTransactionZZ_free(_res_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneChannelMonitorUpdateErrZ_ok() {
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = CResult_NoneChannelMonitorUpdateErrZ_ok();
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneChannelMonitorUpdateErrZ_err(uint32_t e) {
	LDKChannelMonitorUpdateErr e_conv = LDKChannelMonitorUpdateErr_from_js(e);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = CResult_NoneChannelMonitorUpdateErrZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_NoneChannelMonitorUpdateErrZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_NoneChannelMonitorUpdateErrZ _res_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_NoneChannelMonitorUpdateErrZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneChannelMonitorUpdateErrZ_clone(uint32_t orig) {
	LDKCResult_NoneChannelMonitorUpdateErrZ* orig_conv = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(orig & ~1);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = CResult_NoneChannelMonitorUpdateErrZ_clone(orig_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CVec_MonitorEventZ_free(uint32_tArray _res) {
	LDKCVec_MonitorEventZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKMonitorEvent), "LDKCVec_MonitorEventZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t o = 0; o < _res_constr.datalen; o++) {
		uint32_t arr_conv_14 = _res_vals[o];
		LDKMonitorEvent arr_conv_14_conv;
		arr_conv_14_conv.inner = (void*)(arr_conv_14 & (~1));
		arr_conv_14_conv.is_owned = (arr_conv_14 & 1) || (arr_conv_14 == 0);
		_res_constr.data[o] = arr_conv_14_conv;
	}
	CVec_MonitorEventZ_free(_res_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ChannelMonitorUpdateDecodeErrorZ_ok(uint32_t o) {
	LDKChannelMonitorUpdate o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = ChannelMonitorUpdate_clone(&o_conv);
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelMonitorUpdateDecodeErrorZ), "LDKCResult_ChannelMonitorUpdateDecodeErrorZ");
	*ret_conv = CResult_ChannelMonitorUpdateDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ChannelMonitorUpdateDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelMonitorUpdateDecodeErrorZ), "LDKCResult_ChannelMonitorUpdateDecodeErrorZ");
	*ret_conv = CResult_ChannelMonitorUpdateDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_ChannelMonitorUpdateDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ _res_conv = *(LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_ChannelMonitorUpdateDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneMonitorUpdateErrorZ_ok() {
	LDKCResult_NoneMonitorUpdateErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret_conv = CResult_NoneMonitorUpdateErrorZ_ok();
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneMonitorUpdateErrorZ_err(uint32_t e) {
	LDKMonitorUpdateError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = MonitorUpdateError_clone(&e_conv);
	LDKCResult_NoneMonitorUpdateErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret_conv = CResult_NoneMonitorUpdateErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_NoneMonitorUpdateErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_NoneMonitorUpdateErrorZ _res_conv = *(LDKCResult_NoneMonitorUpdateErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_NoneMonitorUpdateErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneMonitorUpdateErrorZ_clone(uint32_t orig) {
	LDKCResult_NoneMonitorUpdateErrorZ* orig_conv = (LDKCResult_NoneMonitorUpdateErrorZ*)(orig & ~1);
	LDKCResult_NoneMonitorUpdateErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret_conv = CResult_NoneMonitorUpdateErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_C2Tuple_OutPointScriptZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKC2Tuple_OutPointScriptZ _res_conv = *(LDKC2Tuple_OutPointScriptZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	C2Tuple_OutPointScriptZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_OutPointScriptZ_new(uint32_t a, int8_tArray b) {
	LDKOutPoint a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	a_conv = OutPoint_clone(&a_conv);
	LDKCVec_u8Z b_ref;
	b_ref.datalen = *((uint32_t*)b);
	b_ref.data = MALLOC(b_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(b_ref.data, (uint8_t*)(b + 4), b_ref.datalen);
	LDKC2Tuple_OutPointScriptZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	*ret_ref = C2Tuple_OutPointScriptZ_new(a_conv, b_ref);
	return (long)ret_ref;
}

void  __attribute__((visibility("default"))) TS_CVec_TransactionZ_free(ptrArray _res) {
	LDKCVec_TransactionZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKTransaction), "LDKCVec_TransactionZ Elements");
	else
		_res_constr.data = NULL;
	int8_tArray* _res_vals = (int8_tArray*)(_res + 4);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		int8_tArray arr_conv_12 = _res_vals[m];
		LDKTransaction arr_conv_12_ref;
		arr_conv_12_ref.datalen = *((uint32_t*)arr_conv_12);
		arr_conv_12_ref.data = MALLOC(arr_conv_12_ref.datalen, "LDKTransaction Bytes");
		memcpy(arr_conv_12_ref.data, (uint8_t*)(arr_conv_12 + 4), arr_conv_12_ref.datalen);
		arr_conv_12_ref.data_is_owned = true;
		_res_constr.data[m] = arr_conv_12_ref;
	}
	CVec_TransactionZ_free(_res_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_u32TxOutZ_clone(uint32_t orig) {
	LDKC2Tuple_u32TxOutZ* orig_conv = (LDKC2Tuple_u32TxOutZ*)(orig & ~1);
	LDKC2Tuple_u32TxOutZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ), "LDKC2Tuple_u32TxOutZ");
	*ret_ref = C2Tuple_u32TxOutZ_clone(orig_conv);
	return (long)ret_ref;
}

void  __attribute__((visibility("default"))) TS_C2Tuple_u32TxOutZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKC2Tuple_u32TxOutZ _res_conv = *(LDKC2Tuple_u32TxOutZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	C2Tuple_u32TxOutZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_u32TxOutZ_new(int32_t a, uint32_t b) {
	LDKTxOut b_conv = *(LDKTxOut*)(((uint64_t)b) & ~1);
	FREE((void*)b);
	LDKC2Tuple_u32TxOutZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ), "LDKC2Tuple_u32TxOutZ");
	*ret_ref = C2Tuple_u32TxOutZ_new(a, b_conv);
	return (long)ret_ref;
}

void  __attribute__((visibility("default"))) TS_CVec_C2Tuple_u32TxOutZZ_free(uint32_tArray _res) {
	LDKCVec_C2Tuple_u32TxOutZZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC2Tuple_u32TxOutZ), "LDKCVec_C2Tuple_u32TxOutZZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t z = 0; z < _res_constr.datalen; z++) {
		uint32_t arr_conv_25 = _res_vals[z];
		LDKC2Tuple_u32TxOutZ arr_conv_25_conv = *(LDKC2Tuple_u32TxOutZ*)(((uint64_t)arr_conv_25) & ~1);
		FREE((void*)arr_conv_25);
		_res_constr.data[z] = arr_conv_25_conv;
	}
	CVec_C2Tuple_u32TxOutZZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ _res_conv = *(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(int8_tArray a, uint32_tArray b) {
	LDKThirtyTwoBytes a_ref;
	CHECK(*((uint32_t*)a) == 32);
	memcpy(a_ref.data, (uint8_t*)(a + 4), 32);
	LDKCVec_C2Tuple_u32TxOutZZ b_constr;
	b_constr.datalen = *((uint32_t*)b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKC2Tuple_u32TxOutZ), "LDKCVec_C2Tuple_u32TxOutZZ Elements");
	else
		b_constr.data = NULL;
	uint32_t* b_vals = (uint32_t*)(b + 4);
	for (size_t z = 0; z < b_constr.datalen; z++) {
		uint32_t arr_conv_25 = b_vals[z];
		LDKC2Tuple_u32TxOutZ arr_conv_25_conv = *(LDKC2Tuple_u32TxOutZ*)(((uint64_t)arr_conv_25) & ~1);
		FREE((void*)arr_conv_25);
		b_constr.data[z] = arr_conv_25_conv;
	}
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ");
	*ret_ref = C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(a_ref, b_constr);
	return (long)ret_ref;
}

void  __attribute__((visibility("default"))) TS_CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free(uint32_tArray _res) {
	LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t x = 0; x < _res_constr.datalen; x++) {
		uint32_t arr_conv_49 = _res_vals[x];
		LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ arr_conv_49_conv = *(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)(((uint64_t)arr_conv_49) & ~1);
		FREE((void*)arr_conv_49);
		_res_constr.data[x] = arr_conv_49_conv;
	}
	CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_C2Tuple_BlockHashChannelMonitorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKC2Tuple_BlockHashChannelMonitorZ _res_conv = *(LDKC2Tuple_BlockHashChannelMonitorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	C2Tuple_BlockHashChannelMonitorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_BlockHashChannelMonitorZ_new(int8_tArray a, uint32_t b) {
	LDKThirtyTwoBytes a_ref;
	CHECK(*((uint32_t*)a) == 32);
	memcpy(a_ref.data, (uint8_t*)(a + 4), 32);
	LDKChannelMonitor b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	b_conv = ChannelMonitor_clone(&b_conv);
	LDKC2Tuple_BlockHashChannelMonitorZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelMonitorZ), "LDKC2Tuple_BlockHashChannelMonitorZ");
	*ret_ref = C2Tuple_BlockHashChannelMonitorZ_new(a_ref, b_conv);
	return (long)ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(uint32_t o) {
	LDKC2Tuple_BlockHashChannelMonitorZ o_conv = *(LDKC2Tuple_BlockHashChannelMonitorZ*)(((uint64_t)o) & ~1);
	FREE((void*)o);
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ _res_conv = *(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_u64u64Z_clone(uint32_t orig) {
	LDKC2Tuple_u64u64Z* orig_conv = (LDKC2Tuple_u64u64Z*)(orig & ~1);
	LDKC2Tuple_u64u64Z* ret_ref = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret_ref = C2Tuple_u64u64Z_clone(orig_conv);
	return (long)ret_ref;
}

void  __attribute__((visibility("default"))) TS_C2Tuple_u64u64Z_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKC2Tuple_u64u64Z _res_conv = *(LDKC2Tuple_u64u64Z*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	C2Tuple_u64u64Z_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_u64u64Z_new(int64_t a, int64_t b) {
	LDKC2Tuple_u64u64Z* ret_ref = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret_ref = C2Tuple_u64u64Z_new(a, b);
	return (long)ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_SpendableOutputDescriptorDecodeErrorZ_ok(uint32_t o) {
	LDKSpendableOutputDescriptor o_conv = *(LDKSpendableOutputDescriptor*)(((uint64_t)o) & ~1);
	FREE((void*)o);
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SpendableOutputDescriptorDecodeErrorZ), "LDKCResult_SpendableOutputDescriptorDecodeErrorZ");
	*ret_conv = CResult_SpendableOutputDescriptorDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_SpendableOutputDescriptorDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SpendableOutputDescriptorDecodeErrorZ), "LDKCResult_SpendableOutputDescriptorDecodeErrorZ");
	*ret_conv = CResult_SpendableOutputDescriptorDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_SpendableOutputDescriptorDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ _res_conv = *(LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_SpendableOutputDescriptorDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_SpendableOutputDescriptorDecodeErrorZ_clone(uint32_t orig) {
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* orig_conv = (LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)(orig & ~1);
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SpendableOutputDescriptorDecodeErrorZ), "LDKCResult_SpendableOutputDescriptorDecodeErrorZ");
	*ret_conv = CResult_SpendableOutputDescriptorDecodeErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CVec_SignatureZ_free(ptrArray _res) {
	LDKCVec_SignatureZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		_res_constr.data = NULL;
	int8_tArray* _res_vals = (int8_tArray*)(_res + 4);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		int8_tArray arr_conv_12 = _res_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*((uint32_t*)arr_conv_12) == 64);
		memcpy(arr_conv_12_ref.compact_form, (uint8_t*)(arr_conv_12 + 4), 64);
		_res_constr.data[m] = arr_conv_12_ref;
	}
	CVec_SignatureZ_free(_res_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_SignatureCVec_SignatureZZ_clone(uint32_t orig) {
	LDKC2Tuple_SignatureCVec_SignatureZZ* orig_conv = (LDKC2Tuple_SignatureCVec_SignatureZZ*)(orig & ~1);
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ), "LDKC2Tuple_SignatureCVec_SignatureZZ");
	*ret_ref = C2Tuple_SignatureCVec_SignatureZZ_clone(orig_conv);
	return (long)ret_ref;
}

void  __attribute__((visibility("default"))) TS_C2Tuple_SignatureCVec_SignatureZZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKC2Tuple_SignatureCVec_SignatureZZ _res_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	C2Tuple_SignatureCVec_SignatureZZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_SignatureCVec_SignatureZZ_new(int8_tArray a, ptrArray b) {
	LDKSignature a_ref;
	CHECK(*((uint32_t*)a) == 64);
	memcpy(a_ref.compact_form, (uint8_t*)(a + 4), 64);
	LDKCVec_SignatureZ b_constr;
	b_constr.datalen = *((uint32_t*)b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		b_constr.data = NULL;
	int8_tArray* b_vals = (int8_tArray*)(b + 4);
	for (size_t m = 0; m < b_constr.datalen; m++) {
		int8_tArray arr_conv_12 = b_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*((uint32_t*)arr_conv_12) == 64);
		memcpy(arr_conv_12_ref.compact_form, (uint8_t*)(arr_conv_12 + 4), 64);
		b_constr.data[m] = arr_conv_12_ref;
	}
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ), "LDKC2Tuple_SignatureCVec_SignatureZZ");
	*ret_ref = C2Tuple_SignatureCVec_SignatureZZ_new(a_ref, b_constr);
	return (long)ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(uint32_t o) {
	LDKC2Tuple_SignatureCVec_SignatureZZ o_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)(((uint64_t)o) & ~1);
	FREE((void*)o);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err() {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ _res_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_clone(uint32_t orig) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* orig_conv = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)(orig & ~1);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_SignatureNoneZ_ok(int8_tArray o) {
	LDKSignature o_ref;
	CHECK(*((uint32_t*)o) == 64);
	memcpy(o_ref.compact_form, (uint8_t*)(o + 4), 64);
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = CResult_SignatureNoneZ_ok(o_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_SignatureNoneZ_err() {
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = CResult_SignatureNoneZ_err();
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_SignatureNoneZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_SignatureNoneZ _res_conv = *(LDKCResult_SignatureNoneZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_SignatureNoneZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_SignatureNoneZ_clone(uint32_t orig) {
	LDKCResult_SignatureNoneZ* orig_conv = (LDKCResult_SignatureNoneZ*)(orig & ~1);
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = CResult_SignatureNoneZ_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ChanKeySignerDecodeErrorZ_ok(uint32_t o) {
	LDKChannelKeys o_conv = *(LDKChannelKeys*)(((uint64_t)o) & ~1);
	LDKCResult_ChanKeySignerDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChanKeySignerDecodeErrorZ), "LDKCResult_ChanKeySignerDecodeErrorZ");
	*ret_conv = CResult_ChanKeySignerDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ChanKeySignerDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_ChanKeySignerDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChanKeySignerDecodeErrorZ), "LDKCResult_ChanKeySignerDecodeErrorZ");
	*ret_conv = CResult_ChanKeySignerDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_ChanKeySignerDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_ChanKeySignerDecodeErrorZ _res_conv = *(LDKCResult_ChanKeySignerDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_ChanKeySignerDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ChanKeySignerDecodeErrorZ_clone(uint32_t orig) {
	LDKCResult_ChanKeySignerDecodeErrorZ* orig_conv = (LDKCResult_ChanKeySignerDecodeErrorZ*)(orig & ~1);
	LDKCResult_ChanKeySignerDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChanKeySignerDecodeErrorZ), "LDKCResult_ChanKeySignerDecodeErrorZ");
	*ret_conv = CResult_ChanKeySignerDecodeErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_InMemoryChannelKeysDecodeErrorZ_ok(uint32_t o) {
	LDKInMemoryChannelKeys o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = InMemoryChannelKeys_clone(&o_conv);
	LDKCResult_InMemoryChannelKeysDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InMemoryChannelKeysDecodeErrorZ), "LDKCResult_InMemoryChannelKeysDecodeErrorZ");
	*ret_conv = CResult_InMemoryChannelKeysDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_InMemoryChannelKeysDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_InMemoryChannelKeysDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InMemoryChannelKeysDecodeErrorZ), "LDKCResult_InMemoryChannelKeysDecodeErrorZ");
	*ret_conv = CResult_InMemoryChannelKeysDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_InMemoryChannelKeysDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_InMemoryChannelKeysDecodeErrorZ _res_conv = *(LDKCResult_InMemoryChannelKeysDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_InMemoryChannelKeysDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_TxOutAccessErrorZ_ok(uint32_t o) {
	LDKTxOut o_conv = *(LDKTxOut*)(((uint64_t)o) & ~1);
	FREE((void*)o);
	LDKCResult_TxOutAccessErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret_conv = CResult_TxOutAccessErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_TxOutAccessErrorZ_err(uint32_t e) {
	LDKAccessError e_conv = LDKAccessError_from_js(e);
	LDKCResult_TxOutAccessErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret_conv = CResult_TxOutAccessErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_TxOutAccessErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_TxOutAccessErrorZ _res_conv = *(LDKCResult_TxOutAccessErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_TxOutAccessErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_TxOutAccessErrorZ_clone(uint32_t orig) {
	LDKCResult_TxOutAccessErrorZ* orig_conv = (LDKCResult_TxOutAccessErrorZ*)(orig & ~1);
	LDKCResult_TxOutAccessErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret_conv = CResult_TxOutAccessErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneAPIErrorZ_ok() {
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = CResult_NoneAPIErrorZ_ok();
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneAPIErrorZ_err(uint32_t e) {
	LDKAPIError e_conv = *(LDKAPIError*)(((uint64_t)e) & ~1);
	FREE((void*)e);
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = CResult_NoneAPIErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_NoneAPIErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_NoneAPIErrorZ _res_conv = *(LDKCResult_NoneAPIErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_NoneAPIErrorZ_free(_res_conv);
}

void  __attribute__((visibility("default"))) TS_CVec_ChannelDetailsZ_free(uint32_tArray _res) {
	LDKCVec_ChannelDetailsZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKChannelDetails), "LDKCVec_ChannelDetailsZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t q = 0; q < _res_constr.datalen; q++) {
		uint32_t arr_conv_16 = _res_vals[q];
		LDKChannelDetails arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		_res_constr.data[q] = arr_conv_16_conv;
	}
	CVec_ChannelDetailsZ_free(_res_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NonePaymentSendFailureZ_ok() {
	LDKCResult_NonePaymentSendFailureZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret_conv = CResult_NonePaymentSendFailureZ_ok();
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NonePaymentSendFailureZ_err(uint32_t e) {
	LDKPaymentSendFailure e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = PaymentSendFailure_clone(&e_conv);
	LDKCResult_NonePaymentSendFailureZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret_conv = CResult_NonePaymentSendFailureZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_NonePaymentSendFailureZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_NonePaymentSendFailureZ _res_conv = *(LDKCResult_NonePaymentSendFailureZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_NonePaymentSendFailureZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NonePaymentSendFailureZ_clone(uint32_t orig) {
	LDKCResult_NonePaymentSendFailureZ* orig_conv = (LDKCResult_NonePaymentSendFailureZ*)(orig & ~1);
	LDKCResult_NonePaymentSendFailureZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret_conv = CResult_NonePaymentSendFailureZ_clone(orig_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CVec_NetAddressZ_free(uint32_tArray _res) {
	LDKCVec_NetAddressZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		uint32_t arr_conv_12 = _res_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)(((uint64_t)arr_conv_12) & ~1);
		FREE((void*)arr_conv_12);
		_res_constr.data[m] = arr_conv_12_conv;
	}
	CVec_NetAddressZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_CVec_ChannelMonitorZ_free(uint32_tArray _res) {
	LDKCVec_ChannelMonitorZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKChannelMonitor), "LDKCVec_ChannelMonitorZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t q = 0; q < _res_constr.datalen; q++) {
		uint32_t arr_conv_16 = _res_vals[q];
		LDKChannelMonitor arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		_res_constr.data[q] = arr_conv_16_conv;
	}
	CVec_ChannelMonitorZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_C2Tuple_BlockHashChannelManagerZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKC2Tuple_BlockHashChannelManagerZ _res_conv = *(LDKC2Tuple_BlockHashChannelManagerZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	C2Tuple_BlockHashChannelManagerZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_BlockHashChannelManagerZ_new(int8_tArray a, uint32_t b) {
	LDKThirtyTwoBytes a_ref;
	CHECK(*((uint32_t*)a) == 32);
	memcpy(a_ref.data, (uint8_t*)(a + 4), 32);
	LDKChannelManager b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	// Warning: we need a move here but no clone is available for LDKChannelManager
	LDKC2Tuple_BlockHashChannelManagerZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelManagerZ), "LDKC2Tuple_BlockHashChannelManagerZ");
	*ret_ref = C2Tuple_BlockHashChannelManagerZ_new(a_ref, b_conv);
	return (long)ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(uint32_t o) {
	LDKC2Tuple_BlockHashChannelManagerZ o_conv = *(LDKC2Tuple_BlockHashChannelManagerZ*)(((uint64_t)o) & ~1);
	FREE((void*)o);
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ _res_conv = *(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NetAddressu8Z_ok(uint32_t o) {
	LDKNetAddress o_conv = *(LDKNetAddress*)(((uint64_t)o) & ~1);
	FREE((void*)o);
	LDKCResult_NetAddressu8Z* ret_conv = MALLOC(sizeof(LDKCResult_NetAddressu8Z), "LDKCResult_NetAddressu8Z");
	*ret_conv = CResult_NetAddressu8Z_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NetAddressu8Z_err(int8_t e) {
	LDKCResult_NetAddressu8Z* ret_conv = MALLOC(sizeof(LDKCResult_NetAddressu8Z), "LDKCResult_NetAddressu8Z");
	*ret_conv = CResult_NetAddressu8Z_err(e);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_NetAddressu8Z_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_NetAddressu8Z _res_conv = *(LDKCResult_NetAddressu8Z*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_NetAddressu8Z_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NetAddressu8Z_clone(uint32_t orig) {
	LDKCResult_NetAddressu8Z* orig_conv = (LDKCResult_NetAddressu8Z*)(orig & ~1);
	LDKCResult_NetAddressu8Z* ret_conv = MALLOC(sizeof(LDKCResult_NetAddressu8Z), "LDKCResult_NetAddressu8Z");
	*ret_conv = CResult_NetAddressu8Z_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_CResult_NetAddressu8ZDecodeErrorZ_ok(uint32_t o) {
	LDKCResult_NetAddressu8Z o_conv = *(LDKCResult_NetAddressu8Z*)(((uint64_t)o) & ~1);
	FREE((void*)o);
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ), "LDKCResult_CResult_NetAddressu8ZDecodeErrorZ");
	*ret_conv = CResult_CResult_NetAddressu8ZDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_CResult_NetAddressu8ZDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ), "LDKCResult_CResult_NetAddressu8ZDecodeErrorZ");
	*ret_conv = CResult_CResult_NetAddressu8ZDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_CResult_NetAddressu8ZDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ _res_conv = *(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_CResult_NetAddressu8ZDecodeErrorZ_free(_res_conv);
}

void  __attribute__((visibility("default"))) TS_CVec_u64Z_free(int64_tArray _res) {
	LDKCVec_u64Z _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (int64_t*)(_res + 4);
	for (size_t i = 0; i < _res_constr.datalen; i++) {
		int64_t arr_conv_8 = _res_vals[i];
		_res_constr.data[i] = arr_conv_8;
	}
	CVec_u64Z_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_CVec_UpdateAddHTLCZ_free(uint32_tArray _res) {
	LDKCVec_UpdateAddHTLCZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t p = 0; p < _res_constr.datalen; p++) {
		uint32_t arr_conv_15 = _res_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		_res_constr.data[p] = arr_conv_15_conv;
	}
	CVec_UpdateAddHTLCZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_CVec_UpdateFulfillHTLCZ_free(uint32_tArray _res) {
	LDKCVec_UpdateFulfillHTLCZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t t = 0; t < _res_constr.datalen; t++) {
		uint32_t arr_conv_19 = _res_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		_res_constr.data[t] = arr_conv_19_conv;
	}
	CVec_UpdateFulfillHTLCZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_CVec_UpdateFailHTLCZ_free(uint32_tArray _res) {
	LDKCVec_UpdateFailHTLCZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t q = 0; q < _res_constr.datalen; q++) {
		uint32_t arr_conv_16 = _res_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		_res_constr.data[q] = arr_conv_16_conv;
	}
	CVec_UpdateFailHTLCZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_CVec_UpdateFailMalformedHTLCZ_free(uint32_tArray _res) {
	LDKCVec_UpdateFailMalformedHTLCZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t z = 0; z < _res_constr.datalen; z++) {
		uint32_t arr_conv_25 = _res_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		_res_constr.data[z] = arr_conv_25_conv;
	}
	CVec_UpdateFailMalformedHTLCZ_free(_res_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_boolLightningErrorZ_ok(jboolean o) {
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = CResult_boolLightningErrorZ_ok(o);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_boolLightningErrorZ_err(uint32_t e) {
	LDKLightningError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = LightningError_clone(&e_conv);
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = CResult_boolLightningErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_boolLightningErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_boolLightningErrorZ _res_conv = *(LDKCResult_boolLightningErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_boolLightningErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_boolLightningErrorZ_clone(uint32_t orig) {
	LDKCResult_boolLightningErrorZ* orig_conv = (LDKCResult_boolLightningErrorZ*)(orig & ~1);
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = CResult_boolLightningErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ _res_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(uint32_t a, uint32_t b, uint32_t c) {
	LDKChannelAnnouncement a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	a_conv = ChannelAnnouncement_clone(&a_conv);
	LDKChannelUpdate b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	b_conv = ChannelUpdate_clone(&b_conv);
	LDKChannelUpdate c_conv;
	c_conv.inner = (void*)(c & (~1));
	c_conv.is_owned = (c & 1) || (c == 0);
	c_conv = ChannelUpdate_clone(&c_conv);
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* ret_ref = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
	*ret_ref = C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a_conv, b_conv, c_conv);
	return (long)ret_ref;
}

void  __attribute__((visibility("default"))) TS_CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(uint32_tArray _res) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t l = 0; l < _res_constr.datalen; l++) {
		uint32_t arr_conv_63 = _res_vals[l];
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_conv_63_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)(((uint64_t)arr_conv_63) & ~1);
		FREE((void*)arr_conv_63);
		_res_constr.data[l] = arr_conv_63_conv;
	}
	CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_CVec_NodeAnnouncementZ_free(uint32_tArray _res) {
	LDKCVec_NodeAnnouncementZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKNodeAnnouncement), "LDKCVec_NodeAnnouncementZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t s = 0; s < _res_constr.datalen; s++) {
		uint32_t arr_conv_18 = _res_vals[s];
		LDKNodeAnnouncement arr_conv_18_conv;
		arr_conv_18_conv.inner = (void*)(arr_conv_18 & (~1));
		arr_conv_18_conv.is_owned = (arr_conv_18 & 1) || (arr_conv_18 == 0);
		_res_constr.data[s] = arr_conv_18_conv;
	}
	CVec_NodeAnnouncementZ_free(_res_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneLightningErrorZ_ok() {
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = CResult_NoneLightningErrorZ_ok();
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneLightningErrorZ_err(uint32_t e) {
	LDKLightningError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = LightningError_clone(&e_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = CResult_NoneLightningErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_NoneLightningErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_NoneLightningErrorZ _res_conv = *(LDKCResult_NoneLightningErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_NoneLightningErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NoneLightningErrorZ_clone(uint32_t orig) {
	LDKCResult_NoneLightningErrorZ* orig_conv = (LDKCResult_NoneLightningErrorZ*)(orig & ~1);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = CResult_NoneLightningErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ChannelReestablishDecodeErrorZ_ok(uint32_t o) {
	LDKChannelReestablish o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = ChannelReestablish_clone(&o_conv);
	LDKCResult_ChannelReestablishDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelReestablishDecodeErrorZ), "LDKCResult_ChannelReestablishDecodeErrorZ");
	*ret_conv = CResult_ChannelReestablishDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ChannelReestablishDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_ChannelReestablishDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelReestablishDecodeErrorZ), "LDKCResult_ChannelReestablishDecodeErrorZ");
	*ret_conv = CResult_ChannelReestablishDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_ChannelReestablishDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_ChannelReestablishDecodeErrorZ _res_conv = *(LDKCResult_ChannelReestablishDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_ChannelReestablishDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_InitDecodeErrorZ_ok(uint32_t o) {
	LDKInit o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = Init_clone(&o_conv);
	LDKCResult_InitDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InitDecodeErrorZ), "LDKCResult_InitDecodeErrorZ");
	*ret_conv = CResult_InitDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_InitDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_InitDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InitDecodeErrorZ), "LDKCResult_InitDecodeErrorZ");
	*ret_conv = CResult_InitDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_InitDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_InitDecodeErrorZ _res_conv = *(LDKCResult_InitDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_InitDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_PingDecodeErrorZ_ok(uint32_t o) {
	LDKPing o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = Ping_clone(&o_conv);
	LDKCResult_PingDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PingDecodeErrorZ), "LDKCResult_PingDecodeErrorZ");
	*ret_conv = CResult_PingDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_PingDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_PingDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PingDecodeErrorZ), "LDKCResult_PingDecodeErrorZ");
	*ret_conv = CResult_PingDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_PingDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_PingDecodeErrorZ _res_conv = *(LDKCResult_PingDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_PingDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_PongDecodeErrorZ_ok(uint32_t o) {
	LDKPong o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = Pong_clone(&o_conv);
	LDKCResult_PongDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PongDecodeErrorZ), "LDKCResult_PongDecodeErrorZ");
	*ret_conv = CResult_PongDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_PongDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_PongDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PongDecodeErrorZ), "LDKCResult_PongDecodeErrorZ");
	*ret_conv = CResult_PongDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_PongDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_PongDecodeErrorZ _res_conv = *(LDKCResult_PongDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_PongDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(uint32_t o) {
	LDKUnsignedChannelAnnouncement o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = UnsignedChannelAnnouncement_clone(&o_conv);
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ), "LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ), "LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_UnsignedChannelAnnouncementDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ _res_conv = *(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_UnsignedChannelAnnouncementDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_UnsignedChannelUpdateDecodeErrorZ_ok(uint32_t o) {
	LDKUnsignedChannelUpdate o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = UnsignedChannelUpdate_clone(&o_conv);
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelUpdateDecodeErrorZ), "LDKCResult_UnsignedChannelUpdateDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelUpdateDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_UnsignedChannelUpdateDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelUpdateDecodeErrorZ), "LDKCResult_UnsignedChannelUpdateDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelUpdateDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_UnsignedChannelUpdateDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ _res_conv = *(LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_UnsignedChannelUpdateDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ErrorMessageDecodeErrorZ_ok(uint32_t o) {
	LDKErrorMessage o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = ErrorMessage_clone(&o_conv);
	LDKCResult_ErrorMessageDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ErrorMessageDecodeErrorZ), "LDKCResult_ErrorMessageDecodeErrorZ");
	*ret_conv = CResult_ErrorMessageDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ErrorMessageDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_ErrorMessageDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ErrorMessageDecodeErrorZ), "LDKCResult_ErrorMessageDecodeErrorZ");
	*ret_conv = CResult_ErrorMessageDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_ErrorMessageDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_ErrorMessageDecodeErrorZ _res_conv = *(LDKCResult_ErrorMessageDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_ErrorMessageDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_UnsignedNodeAnnouncementDecodeErrorZ_ok(uint32_t o) {
	LDKUnsignedNodeAnnouncement o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = UnsignedNodeAnnouncement_clone(&o_conv);
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ), "LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedNodeAnnouncementDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_UnsignedNodeAnnouncementDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ), "LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedNodeAnnouncementDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_UnsignedNodeAnnouncementDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ _res_conv = *(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_UnsignedNodeAnnouncementDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_QueryShortChannelIdsDecodeErrorZ_ok(uint32_t o) {
	LDKQueryShortChannelIds o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = QueryShortChannelIds_clone(&o_conv);
	LDKCResult_QueryShortChannelIdsDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryShortChannelIdsDecodeErrorZ), "LDKCResult_QueryShortChannelIdsDecodeErrorZ");
	*ret_conv = CResult_QueryShortChannelIdsDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_QueryShortChannelIdsDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_QueryShortChannelIdsDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryShortChannelIdsDecodeErrorZ), "LDKCResult_QueryShortChannelIdsDecodeErrorZ");
	*ret_conv = CResult_QueryShortChannelIdsDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_QueryShortChannelIdsDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_QueryShortChannelIdsDecodeErrorZ _res_conv = *(LDKCResult_QueryShortChannelIdsDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_QueryShortChannelIdsDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(uint32_t o) {
	LDKReplyShortChannelIdsEnd o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = ReplyShortChannelIdsEnd_clone(&o_conv);
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ), "LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ");
	*ret_conv = CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ), "LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ");
	*ret_conv = CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ _res_conv = *(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_QueryChannelRangeDecodeErrorZ_ok(uint32_t o) {
	LDKQueryChannelRange o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = QueryChannelRange_clone(&o_conv);
	LDKCResult_QueryChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryChannelRangeDecodeErrorZ), "LDKCResult_QueryChannelRangeDecodeErrorZ");
	*ret_conv = CResult_QueryChannelRangeDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_QueryChannelRangeDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_QueryChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryChannelRangeDecodeErrorZ), "LDKCResult_QueryChannelRangeDecodeErrorZ");
	*ret_conv = CResult_QueryChannelRangeDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_QueryChannelRangeDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_QueryChannelRangeDecodeErrorZ _res_conv = *(LDKCResult_QueryChannelRangeDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_QueryChannelRangeDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ReplyChannelRangeDecodeErrorZ_ok(uint32_t o) {
	LDKReplyChannelRange o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = ReplyChannelRange_clone(&o_conv);
	LDKCResult_ReplyChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyChannelRangeDecodeErrorZ), "LDKCResult_ReplyChannelRangeDecodeErrorZ");
	*ret_conv = CResult_ReplyChannelRangeDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_ReplyChannelRangeDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_ReplyChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyChannelRangeDecodeErrorZ), "LDKCResult_ReplyChannelRangeDecodeErrorZ");
	*ret_conv = CResult_ReplyChannelRangeDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_ReplyChannelRangeDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_ReplyChannelRangeDecodeErrorZ _res_conv = *(LDKCResult_ReplyChannelRangeDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_ReplyChannelRangeDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_GossipTimestampFilterDecodeErrorZ_ok(uint32_t o) {
	LDKGossipTimestampFilter o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = GossipTimestampFilter_clone(&o_conv);
	LDKCResult_GossipTimestampFilterDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_GossipTimestampFilterDecodeErrorZ), "LDKCResult_GossipTimestampFilterDecodeErrorZ");
	*ret_conv = CResult_GossipTimestampFilterDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_GossipTimestampFilterDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_GossipTimestampFilterDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_GossipTimestampFilterDecodeErrorZ), "LDKCResult_GossipTimestampFilterDecodeErrorZ");
	*ret_conv = CResult_GossipTimestampFilterDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_GossipTimestampFilterDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_GossipTimestampFilterDecodeErrorZ _res_conv = *(LDKCResult_GossipTimestampFilterDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_GossipTimestampFilterDecodeErrorZ_free(_res_conv);
}

void  __attribute__((visibility("default"))) TS_CVec_PublicKeyZ_free(ptrArray _res) {
	LDKCVec_PublicKeyZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKPublicKey), "LDKCVec_PublicKeyZ Elements");
	else
		_res_constr.data = NULL;
	int8_tArray* _res_vals = (int8_tArray*)(_res + 4);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		int8_tArray arr_conv_12 = _res_vals[m];
		LDKPublicKey arr_conv_12_ref;
		CHECK(*((uint32_t*)arr_conv_12) == 33);
		memcpy(arr_conv_12_ref.compressed_form, (uint8_t*)(arr_conv_12 + 4), 33);
		_res_constr.data[m] = arr_conv_12_ref;
	}
	CVec_PublicKeyZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_CVec_u8Z_free(int8_tArray _res) {
	LDKCVec_u8Z _res_ref;
	_res_ref.datalen = *((uint32_t*)_res);
	_res_ref.data = MALLOC(_res_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(_res_ref.data, (uint8_t*)(_res + 4), _res_ref.datalen);
	CVec_u8Z_free(_res_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_CVec_u8ZPeerHandleErrorZ_ok(int8_tArray o) {
	LDKCVec_u8Z o_ref;
	o_ref.datalen = *((uint32_t*)o);
	o_ref.data = MALLOC(o_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(o_ref.data, (uint8_t*)(o + 4), o_ref.datalen);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret_conv = CResult_CVec_u8ZPeerHandleErrorZ_ok(o_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_CVec_u8ZPeerHandleErrorZ_err(uint32_t e) {
	LDKPeerHandleError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = PeerHandleError_clone(&e_conv);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret_conv = CResult_CVec_u8ZPeerHandleErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_CVec_u8ZPeerHandleErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_CVec_u8ZPeerHandleErrorZ _res_conv = *(LDKCResult_CVec_u8ZPeerHandleErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_CVec_u8ZPeerHandleErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_CVec_u8ZPeerHandleErrorZ_clone(uint32_t orig) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ* orig_conv = (LDKCResult_CVec_u8ZPeerHandleErrorZ*)(orig & ~1);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret_conv = CResult_CVec_u8ZPeerHandleErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NonePeerHandleErrorZ_ok() {
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = CResult_NonePeerHandleErrorZ_ok();
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NonePeerHandleErrorZ_err(uint32_t e) {
	LDKPeerHandleError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = PeerHandleError_clone(&e_conv);
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = CResult_NonePeerHandleErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_NonePeerHandleErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_NonePeerHandleErrorZ _res_conv = *(LDKCResult_NonePeerHandleErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_NonePeerHandleErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NonePeerHandleErrorZ_clone(uint32_t orig) {
	LDKCResult_NonePeerHandleErrorZ* orig_conv = (LDKCResult_NonePeerHandleErrorZ*)(orig & ~1);
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = CResult_NonePeerHandleErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_boolPeerHandleErrorZ_ok(jboolean o) {
	LDKCResult_boolPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret_conv = CResult_boolPeerHandleErrorZ_ok(o);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_boolPeerHandleErrorZ_err(uint32_t e) {
	LDKPeerHandleError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = PeerHandleError_clone(&e_conv);
	LDKCResult_boolPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret_conv = CResult_boolPeerHandleErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_boolPeerHandleErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_boolPeerHandleErrorZ _res_conv = *(LDKCResult_boolPeerHandleErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_boolPeerHandleErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_boolPeerHandleErrorZ_clone(uint32_t orig) {
	LDKCResult_boolPeerHandleErrorZ* orig_conv = (LDKCResult_boolPeerHandleErrorZ*)(orig & ~1);
	LDKCResult_boolPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret_conv = CResult_boolPeerHandleErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_SecretKeySecpErrorZ_ok(int8_tArray o) {
	LDKSecretKey o_ref;
	CHECK(*((uint32_t*)o) == 32);
	memcpy(o_ref.bytes, (uint8_t*)(o + 4), 32);
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = CResult_SecretKeySecpErrorZ_ok(o_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_SecretKeySecpErrorZ_err(uint32_t e) {
	LDKSecp256k1Error e_conv = LDKSecp256k1Error_from_js(e);
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = CResult_SecretKeySecpErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_SecretKeySecpErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_SecretKeySecpErrorZ _res_conv = *(LDKCResult_SecretKeySecpErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_SecretKeySecpErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_PublicKeySecpErrorZ_ok(int8_tArray o) {
	LDKPublicKey o_ref;
	CHECK(*((uint32_t*)o) == 33);
	memcpy(o_ref.compressed_form, (uint8_t*)(o + 4), 33);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = CResult_PublicKeySecpErrorZ_ok(o_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_PublicKeySecpErrorZ_err(uint32_t e) {
	LDKSecp256k1Error e_conv = LDKSecp256k1Error_from_js(e);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = CResult_PublicKeySecpErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_PublicKeySecpErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_PublicKeySecpErrorZ _res_conv = *(LDKCResult_PublicKeySecpErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_PublicKeySecpErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_TxCreationKeysSecpErrorZ_ok(uint32_t o) {
	LDKTxCreationKeys o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = TxCreationKeys_clone(&o_conv);
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = CResult_TxCreationKeysSecpErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_TxCreationKeysSecpErrorZ_err(uint32_t e) {
	LDKSecp256k1Error e_conv = LDKSecp256k1Error_from_js(e);
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = CResult_TxCreationKeysSecpErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_TxCreationKeysSecpErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_TxCreationKeysSecpErrorZ _res_conv = *(LDKCResult_TxCreationKeysSecpErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_TxCreationKeysSecpErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_TrustedCommitmentTransactionNoneZ_ok(uint32_t o) {
	LDKTrustedCommitmentTransaction o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	// Warning: we need a move here but no clone is available for LDKTrustedCommitmentTransaction
	LDKCResult_TrustedCommitmentTransactionNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_TrustedCommitmentTransactionNoneZ), "LDKCResult_TrustedCommitmentTransactionNoneZ");
	*ret_conv = CResult_TrustedCommitmentTransactionNoneZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_TrustedCommitmentTransactionNoneZ_err() {
	LDKCResult_TrustedCommitmentTransactionNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_TrustedCommitmentTransactionNoneZ), "LDKCResult_TrustedCommitmentTransactionNoneZ");
	*ret_conv = CResult_TrustedCommitmentTransactionNoneZ_err();
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_TrustedCommitmentTransactionNoneZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_TrustedCommitmentTransactionNoneZ _res_conv = *(LDKCResult_TrustedCommitmentTransactionNoneZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_TrustedCommitmentTransactionNoneZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_CVec_SignatureZNoneZ_ok(ptrArray o) {
	LDKCVec_SignatureZ o_constr;
	o_constr.datalen = *((uint32_t*)o);
	if (o_constr.datalen > 0)
		o_constr.data = MALLOC(o_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		o_constr.data = NULL;
	int8_tArray* o_vals = (int8_tArray*)(o + 4);
	for (size_t m = 0; m < o_constr.datalen; m++) {
		int8_tArray arr_conv_12 = o_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*((uint32_t*)arr_conv_12) == 64);
		memcpy(arr_conv_12_ref.compact_form, (uint8_t*)(arr_conv_12 + 4), 64);
		o_constr.data[m] = arr_conv_12_ref;
	}
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = CResult_CVec_SignatureZNoneZ_ok(o_constr);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_CVec_SignatureZNoneZ_err() {
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = CResult_CVec_SignatureZNoneZ_err();
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_CVec_SignatureZNoneZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_CVec_SignatureZNoneZ _res_conv = *(LDKCResult_CVec_SignatureZNoneZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_CVec_SignatureZNoneZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_CVec_SignatureZNoneZ_clone(uint32_t orig) {
	LDKCResult_CVec_SignatureZNoneZ* orig_conv = (LDKCResult_CVec_SignatureZNoneZ*)(orig & ~1);
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = CResult_CVec_SignatureZNoneZ_clone(orig_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CVec_RouteHopZ_free(uint32_tArray _res) {
	LDKCVec_RouteHopZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t k = 0; k < _res_constr.datalen; k++) {
		uint32_t arr_conv_10 = _res_vals[k];
		LDKRouteHop arr_conv_10_conv;
		arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
		arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
		_res_constr.data[k] = arr_conv_10_conv;
	}
	CVec_RouteHopZ_free(_res_constr);
}

void  __attribute__((visibility("default"))) TS_CVec_CVec_RouteHopZZ_free(ptrArray _res) {
	LDKCVec_CVec_RouteHopZZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		_res_constr.data = NULL;
	uint32_tArray* _res_vals = (uint32_tArray*)(_res + 4);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		uint32_tArray arr_conv_12 = _res_vals[m];
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = *((uint32_t*)arr_conv_12);
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		uint32_t* arr_conv_12_vals = (uint32_t*)(arr_conv_12 + 4);
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

uint32_t  __attribute__((visibility("default"))) TS_CResult_RouteDecodeErrorZ_ok(uint32_t o) {
	LDKRoute o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = Route_clone(&o_conv);
	LDKCResult_RouteDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteDecodeErrorZ), "LDKCResult_RouteDecodeErrorZ");
	*ret_conv = CResult_RouteDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_RouteDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_RouteDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteDecodeErrorZ), "LDKCResult_RouteDecodeErrorZ");
	*ret_conv = CResult_RouteDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_RouteDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_RouteDecodeErrorZ _res_conv = *(LDKCResult_RouteDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_RouteDecodeErrorZ_free(_res_conv);
}

void  __attribute__((visibility("default"))) TS_CVec_RouteHintZ_free(uint32_tArray _res) {
	LDKCVec_RouteHintZ _res_constr;
	_res_constr.datalen = *((uint32_t*)_res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKRouteHint), "LDKCVec_RouteHintZ Elements");
	else
		_res_constr.data = NULL;
	uint32_t* _res_vals = (uint32_t*)(_res + 4);
	for (size_t l = 0; l < _res_constr.datalen; l++) {
		uint32_t arr_conv_11 = _res_vals[l];
		LDKRouteHint arr_conv_11_conv;
		arr_conv_11_conv.inner = (void*)(arr_conv_11 & (~1));
		arr_conv_11_conv.is_owned = (arr_conv_11 & 1) || (arr_conv_11 == 0);
		_res_constr.data[l] = arr_conv_11_conv;
	}
	CVec_RouteHintZ_free(_res_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_RouteLightningErrorZ_ok(uint32_t o) {
	LDKRoute o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = Route_clone(&o_conv);
	LDKCResult_RouteLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret_conv = CResult_RouteLightningErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_RouteLightningErrorZ_err(uint32_t e) {
	LDKLightningError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = LightningError_clone(&e_conv);
	LDKCResult_RouteLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret_conv = CResult_RouteLightningErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_RouteLightningErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_RouteLightningErrorZ _res_conv = *(LDKCResult_RouteLightningErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_RouteLightningErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_RoutingFeesDecodeErrorZ_ok(uint32_t o) {
	LDKRoutingFees o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = RoutingFees_clone(&o_conv);
	LDKCResult_RoutingFeesDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RoutingFeesDecodeErrorZ), "LDKCResult_RoutingFeesDecodeErrorZ");
	*ret_conv = CResult_RoutingFeesDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_RoutingFeesDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_RoutingFeesDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RoutingFeesDecodeErrorZ), "LDKCResult_RoutingFeesDecodeErrorZ");
	*ret_conv = CResult_RoutingFeesDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_RoutingFeesDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_RoutingFeesDecodeErrorZ _res_conv = *(LDKCResult_RoutingFeesDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_RoutingFeesDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NodeAnnouncementInfoDecodeErrorZ_ok(uint32_t o) {
	LDKNodeAnnouncementInfo o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = NodeAnnouncementInfo_clone(&o_conv);
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeAnnouncementInfoDecodeErrorZ), "LDKCResult_NodeAnnouncementInfoDecodeErrorZ");
	*ret_conv = CResult_NodeAnnouncementInfoDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NodeAnnouncementInfoDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeAnnouncementInfoDecodeErrorZ), "LDKCResult_NodeAnnouncementInfoDecodeErrorZ");
	*ret_conv = CResult_NodeAnnouncementInfoDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_NodeAnnouncementInfoDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ _res_conv = *(LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_NodeAnnouncementInfoDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NodeAnnouncementInfoDecodeErrorZ_clone(uint32_t orig) {
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* orig_conv = (LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)(orig & ~1);
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeAnnouncementInfoDecodeErrorZ), "LDKCResult_NodeAnnouncementInfoDecodeErrorZ");
	*ret_conv = CResult_NodeAnnouncementInfoDecodeErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NodeInfoDecodeErrorZ_ok(uint32_t o) {
	LDKNodeInfo o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	o_conv = NodeInfo_clone(&o_conv);
	LDKCResult_NodeInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeInfoDecodeErrorZ), "LDKCResult_NodeInfoDecodeErrorZ");
	*ret_conv = CResult_NodeInfoDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NodeInfoDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_NodeInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeInfoDecodeErrorZ), "LDKCResult_NodeInfoDecodeErrorZ");
	*ret_conv = CResult_NodeInfoDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_NodeInfoDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_NodeInfoDecodeErrorZ _res_conv = *(LDKCResult_NodeInfoDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_NodeInfoDecodeErrorZ_free(_res_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NodeInfoDecodeErrorZ_clone(uint32_t orig) {
	LDKCResult_NodeInfoDecodeErrorZ* orig_conv = (LDKCResult_NodeInfoDecodeErrorZ*)(orig & ~1);
	LDKCResult_NodeInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeInfoDecodeErrorZ), "LDKCResult_NodeInfoDecodeErrorZ");
	*ret_conv = CResult_NodeInfoDecodeErrorZ_clone(orig_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NetworkGraphDecodeErrorZ_ok(uint32_t o) {
	LDKNetworkGraph o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	// Warning: we need a move here but no clone is available for LDKNetworkGraph
	LDKCResult_NetworkGraphDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NetworkGraphDecodeErrorZ), "LDKCResult_NetworkGraphDecodeErrorZ");
	*ret_conv = CResult_NetworkGraphDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_CResult_NetworkGraphDecodeErrorZ_err(uint32_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	e_conv = DecodeError_clone(&e_conv);
	LDKCResult_NetworkGraphDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NetworkGraphDecodeErrorZ), "LDKCResult_NetworkGraphDecodeErrorZ");
	*ret_conv = CResult_NetworkGraphDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_CResult_NetworkGraphDecodeErrorZ_free(uint32_t _res) {
	if ((_res & 1) != 0) return;
	LDKCResult_NetworkGraphDecodeErrorZ _res_conv = *(LDKCResult_NetworkGraphDecodeErrorZ*)(((uint64_t)_res) & ~1);
	FREE((void*)_res);
	CResult_NetworkGraphDecodeErrorZ_free(_res_conv);
}

void  __attribute__((visibility("default"))) TS_Event_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKEvent this_ptr_conv = *(LDKEvent*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	Event_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_Event_clone(uint32_t orig) {
	LDKEvent* orig_conv = (LDKEvent*)orig;
	LDKEvent *ret_copy = MALLOC(sizeof(LDKEvent), "LDKEvent");
	*ret_copy = Event_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_Event_write(uint32_t obj) {
	LDKEvent* obj_conv = (LDKEvent*)obj;
	LDKCVec_u8Z arg_var = Event_write(obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_MessageSendEvent_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKMessageSendEvent this_ptr_conv = *(LDKMessageSendEvent*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	MessageSendEvent_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_MessageSendEvent_clone(uint32_t orig) {
	LDKMessageSendEvent* orig_conv = (LDKMessageSendEvent*)orig;
	LDKMessageSendEvent *ret_copy = MALLOC(sizeof(LDKMessageSendEvent), "LDKMessageSendEvent");
	*ret_copy = MessageSendEvent_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_MessageSendEventsProvider_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKMessageSendEventsProvider this_ptr_conv = *(LDKMessageSendEventsProvider*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	MessageSendEventsProvider_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_EventsProvider_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKEventsProvider this_ptr_conv = *(LDKEventsProvider*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	EventsProvider_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_APIError_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKAPIError this_ptr_conv = *(LDKAPIError*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	APIError_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_APIError_clone(uint32_t orig) {
	LDKAPIError* orig_conv = (LDKAPIError*)orig;
	LDKAPIError *ret_copy = MALLOC(sizeof(LDKAPIError), "LDKAPIError");
	*ret_copy = APIError_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_Level_clone(uint32_t orig) {
	LDKLevel* orig_conv = (LDKLevel*)(orig & ~1);
	uint32_t ret_conv = LDKLevel_to_js(Level_clone(orig_conv));
	return ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_Level_max() {
	uint32_t ret_conv = LDKLevel_to_js(Level_max());
	return ret_conv;
}

void  __attribute__((visibility("default"))) TS_Logger_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKLogger this_ptr_conv = *(LDKLogger*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	Logger_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeConfig_free(uint32_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeConfig_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelHandshakeConfig_clone(uint32_t orig) {
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

int32_t  __attribute__((visibility("default"))) TS_ChannelHandshakeConfig_get_minimum_depth(uint32_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ChannelHandshakeConfig_get_minimum_depth(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeConfig_set_minimum_depth(uint32_t this_ptr, int32_t val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeConfig_set_minimum_depth(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_ChannelHandshakeConfig_get_our_to_self_delay(uint32_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelHandshakeConfig_get_our_to_self_delay(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeConfig_set_our_to_self_delay(uint32_t this_ptr, int16_t val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeConfig_set_our_to_self_delay(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelHandshakeConfig_get_our_htlc_minimum_msat(uint32_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeConfig_get_our_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeConfig_set_our_htlc_minimum_msat(uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeConfig_set_our_htlc_minimum_msat(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelHandshakeConfig_new(int32_t minimum_depth_arg, int16_t our_to_self_delay_arg, int64_t our_htlc_minimum_msat_arg) {
	LDKChannelHandshakeConfig ret_var = ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelHandshakeConfig_default() {
	LDKChannelHandshakeConfig ret_var = ChannelHandshakeConfig_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_free(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_clone(uint32_t orig) {
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

int64_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_get_min_funding_satoshis(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_min_funding_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_set_min_funding_satoshis(uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_funding_satoshis(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_get_max_htlc_minimum_msat(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_max_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_set_max_htlc_minimum_msat(uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_htlc_minimum_msat(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_get_max_channel_reserve_satoshis(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_max_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_set_max_channel_reserve_satoshis(uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_channel_reserve_satoshis(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_get_min_max_accepted_htlcs(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelHandshakeLimits_get_min_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_set_min_max_accepted_htlcs(uint32_t this_ptr, int16_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_max_accepted_htlcs(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_get_min_dust_limit_satoshis(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_min_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_set_min_dust_limit_satoshis(uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_dust_limit_satoshis(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_get_max_dust_limit_satoshis(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_max_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_set_max_dust_limit_satoshis(uint32_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_dust_limit_satoshis(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_get_max_minimum_depth(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ChannelHandshakeLimits_get_max_minimum_depth(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_set_max_minimum_depth(uint32_t this_ptr, int32_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_minimum_depth(&this_ptr_conv, val);
}

jboolean  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_get_force_announced_channel_preference(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelHandshakeLimits_get_force_announced_channel_preference(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_set_force_announced_channel_preference(uint32_t this_ptr, jboolean val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_force_announced_channel_preference(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_get_their_to_self_delay(uint32_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelHandshakeLimits_get_their_to_self_delay(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_set_their_to_self_delay(uint32_t this_ptr, int16_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_their_to_self_delay(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_new(int64_t min_funding_satoshis_arg, int64_t max_htlc_minimum_msat_arg, int64_t min_max_htlc_value_in_flight_msat_arg, int64_t max_channel_reserve_satoshis_arg, int16_t min_max_accepted_htlcs_arg, int64_t min_dust_limit_satoshis_arg, int64_t max_dust_limit_satoshis_arg, int32_t max_minimum_depth_arg, jboolean force_announced_channel_preference_arg, int16_t their_to_self_delay_arg) {
	LDKChannelHandshakeLimits ret_var = ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, min_dust_limit_satoshis_arg, max_dust_limit_satoshis_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelHandshakeLimits_default() {
	LDKChannelHandshakeLimits ret_var = ChannelHandshakeLimits_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_ChannelConfig_free(uint32_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelConfig_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelConfig_clone(uint32_t orig) {
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

int32_t  __attribute__((visibility("default"))) TS_ChannelConfig_get_fee_proportional_millionths(uint32_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ChannelConfig_get_fee_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelConfig_set_fee_proportional_millionths(uint32_t this_ptr, int32_t val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelConfig_set_fee_proportional_millionths(&this_ptr_conv, val);
}

jboolean  __attribute__((visibility("default"))) TS_ChannelConfig_get_announced_channel(uint32_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelConfig_get_announced_channel(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelConfig_set_announced_channel(uint32_t this_ptr, jboolean val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelConfig_set_announced_channel(&this_ptr_conv, val);
}

jboolean  __attribute__((visibility("default"))) TS_ChannelConfig_get_commit_upfront_shutdown_pubkey(uint32_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelConfig_get_commit_upfront_shutdown_pubkey(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelConfig_set_commit_upfront_shutdown_pubkey(uint32_t this_ptr, jboolean val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelConfig_set_commit_upfront_shutdown_pubkey(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelConfig_new(int32_t fee_proportional_millionths_arg, jboolean announced_channel_arg, jboolean commit_upfront_shutdown_pubkey_arg) {
	LDKChannelConfig ret_var = ChannelConfig_new(fee_proportional_millionths_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelConfig_default() {
	LDKChannelConfig ret_var = ChannelConfig_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelConfig_write(uint32_t obj) {
	LDKChannelConfig obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelConfig_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelConfig_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKChannelConfig ret_var = ChannelConfig_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_UserConfig_free(uint32_t this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UserConfig_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UserConfig_clone(uint32_t orig) {
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

uint32_t  __attribute__((visibility("default"))) TS_UserConfig_get_own_channel_config(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_UserConfig_set_own_channel_config(uint32_t this_ptr, uint32_t val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelHandshakeConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = ChannelHandshakeConfig_clone(&val_conv);
	UserConfig_set_own_channel_config(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UserConfig_get_peer_channel_config_limits(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_UserConfig_set_peer_channel_config_limits(uint32_t this_ptr, uint32_t val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelHandshakeLimits val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = ChannelHandshakeLimits_clone(&val_conv);
	UserConfig_set_peer_channel_config_limits(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UserConfig_get_channel_options(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_UserConfig_set_channel_options(uint32_t this_ptr, uint32_t val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = ChannelConfig_clone(&val_conv);
	UserConfig_set_channel_options(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UserConfig_new(uint32_t own_channel_config_arg, uint32_t peer_channel_config_limits_arg, uint32_t channel_options_arg) {
	LDKChannelHandshakeConfig own_channel_config_arg_conv;
	own_channel_config_arg_conv.inner = (void*)(own_channel_config_arg & (~1));
	own_channel_config_arg_conv.is_owned = (own_channel_config_arg & 1) || (own_channel_config_arg == 0);
	own_channel_config_arg_conv = ChannelHandshakeConfig_clone(&own_channel_config_arg_conv);
	LDKChannelHandshakeLimits peer_channel_config_limits_arg_conv;
	peer_channel_config_limits_arg_conv.inner = (void*)(peer_channel_config_limits_arg & (~1));
	peer_channel_config_limits_arg_conv.is_owned = (peer_channel_config_limits_arg & 1) || (peer_channel_config_limits_arg == 0);
	peer_channel_config_limits_arg_conv = ChannelHandshakeLimits_clone(&peer_channel_config_limits_arg_conv);
	LDKChannelConfig channel_options_arg_conv;
	channel_options_arg_conv.inner = (void*)(channel_options_arg & (~1));
	channel_options_arg_conv.is_owned = (channel_options_arg & 1) || (channel_options_arg == 0);
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

uint32_t  __attribute__((visibility("default"))) TS_UserConfig_default() {
	LDKUserConfig ret_var = UserConfig_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_AccessError_clone(uint32_t orig) {
	LDKAccessError* orig_conv = (LDKAccessError*)(orig & ~1);
	uint32_t ret_conv = LDKAccessError_to_js(AccessError_clone(orig_conv));
	return ret_conv;
}

void  __attribute__((visibility("default"))) TS_Access_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKAccess this_ptr_conv = *(LDKAccess*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	Access_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_Watch_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKWatch this_ptr_conv = *(LDKWatch*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	Watch_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_Filter_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKFilter this_ptr_conv = *(LDKFilter*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	Filter_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_BroadcasterInterface_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKBroadcasterInterface this_ptr_conv = *(LDKBroadcasterInterface*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	BroadcasterInterface_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ConfirmationTarget_clone(uint32_t orig) {
	LDKConfirmationTarget* orig_conv = (LDKConfirmationTarget*)(orig & ~1);
	uint32_t ret_conv = LDKConfirmationTarget_to_js(ConfirmationTarget_clone(orig_conv));
	return ret_conv;
}

void  __attribute__((visibility("default"))) TS_FeeEstimator_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKFeeEstimator this_ptr_conv = *(LDKFeeEstimator*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	FeeEstimator_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_ChainMonitor_free(uint32_t this_ptr) {
	LDKChainMonitor this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChainMonitor_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_ChainMonitor_block_connected(uint32_t this_arg, int8_tArray header, uint32_tArray txdata, int32_t height) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*((uint32_t*)header) == 80);
	memcpy(header_arr, (uint8_t*)(header + 4), 80);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = *((uint32_t*)txdata);
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	uint32_t* txdata_vals = (uint32_t*)(txdata + 4);
	for (size_t e = 0; e < txdata_constr.datalen; e++) {
		uint32_t arr_conv_30 = txdata_vals[e];
		LDKC2Tuple_usizeTransactionZ arr_conv_30_conv = *(LDKC2Tuple_usizeTransactionZ*)(((uint64_t)arr_conv_30) & ~1);
		FREE((void*)arr_conv_30);
		txdata_constr.data[e] = arr_conv_30_conv;
	}
	ChainMonitor_block_connected(&this_arg_conv, header_ref, txdata_constr, height);
}

void  __attribute__((visibility("default"))) TS_ChainMonitor_block_disconnected(uint32_t this_arg, int8_tArray header, int32_t disconnected_height) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*((uint32_t*)header) == 80);
	memcpy(header_arr, (uint8_t*)(header + 4), 80);
	unsigned char (*header_ref)[80] = &header_arr;
	ChainMonitor_block_disconnected(&this_arg_conv, header_ref, disconnected_height);
}

uint32_t  __attribute__((visibility("default"))) TS_ChainMonitor_new(uint32_t chain_source, uint32_t broadcaster, uint32_t logger, uint32_t feeest, uint32_t persister) {
	LDKFilter* chain_source_conv = (LDKFilter*)chain_source;
	LDKBroadcasterInterface broadcaster_conv = *(LDKBroadcasterInterface*)(((uint64_t)broadcaster) & ~1);
	LDKLogger logger_conv = *(LDKLogger*)(((uint64_t)logger) & ~1);
	LDKFeeEstimator feeest_conv = *(LDKFeeEstimator*)(((uint64_t)feeest) & ~1);
	LDKPersist persister_conv = *(LDKPersist*)(((uint64_t)persister) & ~1);
	LDKChainMonitor ret_var = ChainMonitor_new(chain_source_conv, broadcaster_conv, logger_conv, feeest_conv, persister_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_ChainMonitor_as_Watch(uint32_t this_arg) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKWatch* ret = MALLOC(sizeof(LDKWatch), "LDKWatch");
	*ret = ChainMonitor_as_Watch(&this_arg_conv);
	return (long)ret;
}

uint32_t  __attribute__((visibility("default"))) TS_ChainMonitor_as_EventsProvider(uint32_t this_arg) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKEventsProvider* ret = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*ret = ChainMonitor_as_EventsProvider(&this_arg_conv);
	return (long)ret;
}

void  __attribute__((visibility("default"))) TS_ChannelMonitorUpdate_free(uint32_t this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelMonitorUpdate_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelMonitorUpdate_clone(uint32_t orig) {
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

int64_t  __attribute__((visibility("default"))) TS_ChannelMonitorUpdate_get_update_id(uint32_t this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelMonitorUpdate_get_update_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelMonitorUpdate_set_update_id(uint32_t this_ptr, int64_t val) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelMonitorUpdate_set_update_id(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelMonitorUpdate_write(uint32_t obj) {
	LDKChannelMonitorUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelMonitorUpdate_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelMonitorUpdate_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelMonitorUpdateDecodeErrorZ), "LDKCResult_ChannelMonitorUpdateDecodeErrorZ");
	*ret_conv = ChannelMonitorUpdate_read(ser_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelMonitorUpdateErr_clone(uint32_t orig) {
	LDKChannelMonitorUpdateErr* orig_conv = (LDKChannelMonitorUpdateErr*)(orig & ~1);
	uint32_t ret_conv = LDKChannelMonitorUpdateErr_to_js(ChannelMonitorUpdateErr_clone(orig_conv));
	return ret_conv;
}

void  __attribute__((visibility("default"))) TS_MonitorUpdateError_free(uint32_t this_ptr) {
	LDKMonitorUpdateError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MonitorUpdateError_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_MonitorUpdateError_clone(uint32_t orig) {
	LDKMonitorUpdateError orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKMonitorUpdateError ret_var = MonitorUpdateError_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_MonitorEvent_free(uint32_t this_ptr) {
	LDKMonitorEvent this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MonitorEvent_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_MonitorEvent_clone(uint32_t orig) {
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

void  __attribute__((visibility("default"))) TS_HTLCUpdate_free(uint32_t this_ptr) {
	LDKHTLCUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCUpdate_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_HTLCUpdate_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_HTLCUpdate_write(uint32_t obj) {
	LDKHTLCUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = HTLCUpdate_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_HTLCUpdate_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKHTLCUpdate ret_var = HTLCUpdate_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_ChannelMonitor_free(uint32_t this_ptr) {
	LDKChannelMonitor this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelMonitor_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelMonitor_clone(uint32_t orig) {
	LDKChannelMonitor orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelMonitor ret_var = ChannelMonitor_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelMonitor_write(uint32_t obj) {
	LDKChannelMonitor obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelMonitor_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelMonitor_update_monitor(uint32_t this_arg, uint32_t updates, uint32_t broadcaster, uint32_t fee_estimator, uint32_t logger) {
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

int64_t  __attribute__((visibility("default"))) TS_ChannelMonitor_get_latest_update_id(uint32_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = ChannelMonitor_get_latest_update_id(&this_arg_conv);
	return ret_val;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelMonitor_get_funding_txo(uint32_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKC2Tuple_OutPointScriptZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	*ret_ref = ChannelMonitor_get_funding_txo(&this_arg_conv);
	return (long)ret_ref;
}

uint32_tArray  __attribute__((visibility("default"))) TS_ChannelMonitor_get_and_clear_pending_monitor_events(uint32_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_MonitorEventZ ret_var = ChannelMonitor_get_and_clear_pending_monitor_events(&this_arg_conv);
	uint32_tArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr + 4);
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

uint32_tArray  __attribute__((visibility("default"))) TS_ChannelMonitor_get_and_clear_pending_events(uint32_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_EventZ ret_var = ChannelMonitor_get_and_clear_pending_events(&this_arg_conv);
	uint32_tArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr + 4);
	for (size_t h = 0; h < ret_var.datalen; h++) {
		LDKEvent *arr_conv_7_copy = MALLOC(sizeof(LDKEvent), "LDKEvent");
		*arr_conv_7_copy = Event_clone(&ret_var.data[h]);
		long arr_conv_7_ref = (long)arr_conv_7_copy;
		ret_arr_ptr[h] = arr_conv_7_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

ptrArray  __attribute__((visibility("default"))) TS_ChannelMonitor_get_latest_holder_commitment_txn(uint32_t this_arg, uint32_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCVec_TransactionZ ret_var = ChannelMonitor_get_latest_holder_commitment_txn(&this_arg_conv, logger_conv);
	ptrArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native ptrArray Bytes");
	int8_tArray *ret_arr_ptr = (int8_tArray*)(ret_arr + 4);
	for (size_t m = 0; m < ret_var.datalen; m++) {
		LDKTransaction arr_conv_12_var = ret_var.data[m];
		int8_tArray arr_conv_12_arr = init_arr(arr_conv_12_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
		memcpy((uint8_t*)(arr_conv_12_arr + 4), arr_conv_12_var.data, arr_conv_12_var.datalen);
		Transaction_free(arr_conv_12_var);
		ret_arr_ptr[m] = arr_conv_12_arr;
	}
	FREE(ret_var.data);
	return ret_arr;
}

uint32_tArray  __attribute__((visibility("default"))) TS_ChannelMonitor_block_connected(uint32_t this_arg, int8_tArray header, uint32_tArray txdata, int32_t height, uint32_t broadcaster, uint32_t fee_estimator, uint32_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*((uint32_t*)header) == 80);
	memcpy(header_arr, (uint8_t*)(header + 4), 80);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = *((uint32_t*)txdata);
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	uint32_t* txdata_vals = (uint32_t*)(txdata + 4);
	for (size_t e = 0; e < txdata_constr.datalen; e++) {
		uint32_t arr_conv_30 = txdata_vals[e];
		LDKC2Tuple_usizeTransactionZ arr_conv_30_conv = *(LDKC2Tuple_usizeTransactionZ*)(((uint64_t)arr_conv_30) & ~1);
		FREE((void*)arr_conv_30);
		txdata_constr.data[e] = arr_conv_30_conv;
	}
	LDKBroadcasterInterface broadcaster_conv = *(LDKBroadcasterInterface*)(((uint64_t)broadcaster) & ~1);
	LDKFeeEstimator fee_estimator_conv = *(LDKFeeEstimator*)(((uint64_t)fee_estimator) & ~1);
	LDKLogger logger_conv = *(LDKLogger*)(((uint64_t)logger) & ~1);
	LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ ret_var = ChannelMonitor_block_connected(&this_arg_conv, header_ref, txdata_constr, height, broadcaster_conv, fee_estimator_conv, logger_conv);
	uint32_tArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr + 4);
	for (size_t x = 0; x < ret_var.datalen; x++) {
		LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ* arr_conv_49_ref = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ");
		*arr_conv_49_ref = ret_var.data[x];
		ret_arr_ptr[x] = (long)arr_conv_49_ref;
	}
	FREE(ret_var.data);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelMonitor_block_disconnected(uint32_t this_arg, int8_tArray header, int32_t height, uint32_t broadcaster, uint32_t fee_estimator, uint32_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*((uint32_t*)header) == 80);
	memcpy(header_arr, (uint8_t*)(header + 4), 80);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKBroadcasterInterface broadcaster_conv = *(LDKBroadcasterInterface*)(((uint64_t)broadcaster) & ~1);
	LDKFeeEstimator fee_estimator_conv = *(LDKFeeEstimator*)(((uint64_t)fee_estimator) & ~1);
	LDKLogger logger_conv = *(LDKLogger*)(((uint64_t)logger) & ~1);
	ChannelMonitor_block_disconnected(&this_arg_conv, header_ref, height, broadcaster_conv, fee_estimator_conv, logger_conv);
}

void  __attribute__((visibility("default"))) TS_Persist_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKPersist this_ptr_conv = *(LDKPersist*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	Persist_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_BlockHashChannelMonitorZ_read(int8_tArray ser, uint32_t arg) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKKeysInterface* arg_conv = (LDKKeysInterface*)arg;
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ");
	*ret_conv = C2Tuple_BlockHashChannelMonitorZ_read(ser_ref, arg_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_OutPoint_free(uint32_t this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OutPoint_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_OutPoint_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_OutPoint_get_txid(uint32_t this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *OutPoint_get_txid(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_OutPoint_set_txid(uint32_t this_ptr, int8_tArray val) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	OutPoint_set_txid(&this_ptr_conv, val_ref);
}

int16_t  __attribute__((visibility("default"))) TS_OutPoint_get_index(uint32_t this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = OutPoint_get_index(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OutPoint_set_index(uint32_t this_ptr, int16_t val) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OutPoint_set_index(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_OutPoint_new(int8_tArray txid_arg, int16_t index_arg) {
	LDKThirtyTwoBytes txid_arg_ref;
	CHECK(*((uint32_t*)txid_arg) == 32);
	memcpy(txid_arg_ref.data, (uint8_t*)(txid_arg + 4), 32);
	LDKOutPoint ret_var = OutPoint_new(txid_arg_ref, index_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_OutPoint_to_channel_id(uint32_t this_arg) {
	LDKOutPoint this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), OutPoint_to_channel_id(&this_arg_conv).data, 32);
	return arg_arr;
}

int8_tArray  __attribute__((visibility("default"))) TS_OutPoint_write(uint32_t obj) {
	LDKOutPoint obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = OutPoint_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_OutPoint_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKOutPoint ret_var = OutPoint_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_SpendableOutputDescriptor_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKSpendableOutputDescriptor this_ptr_conv = *(LDKSpendableOutputDescriptor*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	SpendableOutputDescriptor_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_SpendableOutputDescriptor_clone(uint32_t orig) {
	LDKSpendableOutputDescriptor* orig_conv = (LDKSpendableOutputDescriptor*)orig;
	LDKSpendableOutputDescriptor *ret_copy = MALLOC(sizeof(LDKSpendableOutputDescriptor), "LDKSpendableOutputDescriptor");
	*ret_copy = SpendableOutputDescriptor_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_SpendableOutputDescriptor_write(uint32_t obj) {
	LDKSpendableOutputDescriptor* obj_conv = (LDKSpendableOutputDescriptor*)obj;
	LDKCVec_u8Z arg_var = SpendableOutputDescriptor_write(obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_SpendableOutputDescriptor_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SpendableOutputDescriptorDecodeErrorZ), "LDKCResult_SpendableOutputDescriptorDecodeErrorZ");
	*ret_conv = SpendableOutputDescriptor_read(ser_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelKeys_clone(uint32_t orig) {
	LDKChannelKeys* orig_conv = (LDKChannelKeys*)orig;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = ChannelKeys_clone(orig_conv);
	return (long)ret;
}

void  __attribute__((visibility("default"))) TS_ChannelKeys_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKChannelKeys this_ptr_conv = *(LDKChannelKeys*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	ChannelKeys_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_KeysInterface_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKKeysInterface this_ptr_conv = *(LDKKeysInterface*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	KeysInterface_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_free(uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	InMemoryChannelKeys_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_get_funding_key(uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *InMemoryChannelKeys_get_funding_key(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_set_funding_key(uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.bytes, (uint8_t*)(val + 4), 32);
	InMemoryChannelKeys_set_funding_key(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_get_revocation_base_key(uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *InMemoryChannelKeys_get_revocation_base_key(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_set_revocation_base_key(uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.bytes, (uint8_t*)(val + 4), 32);
	InMemoryChannelKeys_set_revocation_base_key(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_get_payment_key(uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *InMemoryChannelKeys_get_payment_key(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_set_payment_key(uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.bytes, (uint8_t*)(val + 4), 32);
	InMemoryChannelKeys_set_payment_key(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_get_delayed_payment_base_key(uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *InMemoryChannelKeys_get_delayed_payment_base_key(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_set_delayed_payment_base_key(uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.bytes, (uint8_t*)(val + 4), 32);
	InMemoryChannelKeys_set_delayed_payment_base_key(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_get_htlc_base_key(uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *InMemoryChannelKeys_get_htlc_base_key(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_set_htlc_base_key(uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.bytes, (uint8_t*)(val + 4), 32);
	InMemoryChannelKeys_set_htlc_base_key(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_get_commitment_seed(uint32_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *InMemoryChannelKeys_get_commitment_seed(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_set_commitment_seed(uint32_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	InMemoryChannelKeys_set_commitment_seed(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_new(int8_tArray funding_key, int8_tArray revocation_base_key, int8_tArray payment_key, int8_tArray delayed_payment_base_key, int8_tArray htlc_base_key, int8_tArray commitment_seed, int64_t channel_value_satoshis, uint32_t key_derivation_params) {
	LDKSecretKey funding_key_ref;
	CHECK(*((uint32_t*)funding_key) == 32);
	memcpy(funding_key_ref.bytes, (uint8_t*)(funding_key + 4), 32);
	LDKSecretKey revocation_base_key_ref;
	CHECK(*((uint32_t*)revocation_base_key) == 32);
	memcpy(revocation_base_key_ref.bytes, (uint8_t*)(revocation_base_key + 4), 32);
	LDKSecretKey payment_key_ref;
	CHECK(*((uint32_t*)payment_key) == 32);
	memcpy(payment_key_ref.bytes, (uint8_t*)(payment_key + 4), 32);
	LDKSecretKey delayed_payment_base_key_ref;
	CHECK(*((uint32_t*)delayed_payment_base_key) == 32);
	memcpy(delayed_payment_base_key_ref.bytes, (uint8_t*)(delayed_payment_base_key + 4), 32);
	LDKSecretKey htlc_base_key_ref;
	CHECK(*((uint32_t*)htlc_base_key) == 32);
	memcpy(htlc_base_key_ref.bytes, (uint8_t*)(htlc_base_key + 4), 32);
	LDKThirtyTwoBytes commitment_seed_ref;
	CHECK(*((uint32_t*)commitment_seed) == 32);
	memcpy(commitment_seed_ref.data, (uint8_t*)(commitment_seed + 4), 32);
	LDKC2Tuple_u64u64Z key_derivation_params_conv = *(LDKC2Tuple_u64u64Z*)(((uint64_t)key_derivation_params) & ~1);
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

uint32_t  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_counterparty_pubkeys(uint32_t this_arg) {
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

int16_t  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_counterparty_selected_contest_delay(uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int16_t ret_val = InMemoryChannelKeys_counterparty_selected_contest_delay(&this_arg_conv);
	return ret_val;
}

int16_t  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_holder_selected_contest_delay(uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int16_t ret_val = InMemoryChannelKeys_holder_selected_contest_delay(&this_arg_conv);
	return ret_val;
}

jboolean  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_is_outbound(uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	jboolean ret_val = InMemoryChannelKeys_is_outbound(&this_arg_conv);
	return ret_val;
}

uint32_t  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_funding_outpoint(uint32_t this_arg) {
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

uint32_t  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_get_channel_parameters(uint32_t this_arg) {
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

uint32_t  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_as_ChannelKeys(uint32_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = InMemoryChannelKeys_as_ChannelKeys(&this_arg_conv);
	return (long)ret;
}

int8_tArray  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_write(uint32_t obj) {
	LDKInMemoryChannelKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = InMemoryChannelKeys_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_InMemoryChannelKeys_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_InMemoryChannelKeysDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InMemoryChannelKeysDecodeErrorZ), "LDKCResult_InMemoryChannelKeysDecodeErrorZ");
	*ret_conv = InMemoryChannelKeys_read(ser_ref);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_KeysManager_free(uint32_t this_ptr) {
	LDKKeysManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	KeysManager_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_KeysManager_new(int8_tArray seed, uint32_t network, int64_t starting_time_secs, int32_t starting_time_nanos) {
	unsigned char seed_arr[32];
	CHECK(*((uint32_t*)seed) == 32);
	memcpy(seed_arr, (uint8_t*)(seed + 4), 32);
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

uint32_t  __attribute__((visibility("default"))) TS_KeysManager_derive_channel_keys(uint32_t this_arg, int64_t channel_value_satoshis, int64_t params_1, int64_t params_2) {
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

uint32_t  __attribute__((visibility("default"))) TS_KeysManager_as_KeysInterface(uint32_t this_arg) {
	LDKKeysManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKKeysInterface* ret = MALLOC(sizeof(LDKKeysInterface), "LDKKeysInterface");
	*ret = KeysManager_as_KeysInterface(&this_arg_conv);
	return (long)ret;
}

void  __attribute__((visibility("default"))) TS_ChannelManager_free(uint32_t this_ptr) {
	LDKChannelManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelManager_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelDetails_free(uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelDetails_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelDetails_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_ChannelDetails_get_channel_id(uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *ChannelDetails_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelDetails_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	ChannelDetails_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelDetails_get_remote_network_id(uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelDetails_get_remote_network_id(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelDetails_set_remote_network_id(uint32_t this_ptr, int8_tArray val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	ChannelDetails_set_remote_network_id(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelDetails_get_counterparty_features(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelDetails_set_counterparty_features(uint32_t this_ptr, uint32_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKInitFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we need a move here but no clone is available for LDKInitFeatures
	ChannelDetails_set_counterparty_features(&this_ptr_conv, val_conv);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelDetails_get_channel_value_satoshis(uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_channel_value_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelDetails_set_channel_value_satoshis(uint32_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_channel_value_satoshis(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelDetails_get_user_id(uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_user_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelDetails_set_user_id(uint32_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_user_id(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelDetails_get_outbound_capacity_msat(uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_outbound_capacity_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelDetails_set_outbound_capacity_msat(uint32_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_outbound_capacity_msat(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelDetails_get_inbound_capacity_msat(uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_inbound_capacity_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelDetails_set_inbound_capacity_msat(uint32_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_inbound_capacity_msat(&this_ptr_conv, val);
}

jboolean  __attribute__((visibility("default"))) TS_ChannelDetails_get_is_live(uint32_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelDetails_get_is_live(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelDetails_set_is_live(uint32_t this_ptr, jboolean val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_is_live(&this_ptr_conv, val);
}

void  __attribute__((visibility("default"))) TS_PaymentSendFailure_free(uint32_t this_ptr) {
	LDKPaymentSendFailure this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PaymentSendFailure_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_PaymentSendFailure_clone(uint32_t orig) {
	LDKPaymentSendFailure orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKPaymentSendFailure ret_var = PaymentSendFailure_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManager_new(uint32_t network, uint32_t fee_est, uint32_t chain_monitor, uint32_t tx_broadcaster, uint32_t logger, uint32_t keys_manager, uint32_t config, intptr_t current_blockchain_height) {
	LDKNetwork network_conv = LDKNetwork_from_js(network);
	LDKFeeEstimator fee_est_conv = *(LDKFeeEstimator*)(((uint64_t)fee_est) & ~1);
	LDKWatch chain_monitor_conv = *(LDKWatch*)(((uint64_t)chain_monitor) & ~1);
	LDKBroadcasterInterface tx_broadcaster_conv = *(LDKBroadcasterInterface*)(((uint64_t)tx_broadcaster) & ~1);
	LDKLogger logger_conv = *(LDKLogger*)(((uint64_t)logger) & ~1);
	LDKKeysInterface keys_manager_conv = *(LDKKeysInterface*)(((uint64_t)keys_manager) & ~1);
	LDKUserConfig config_conv;
	config_conv.inner = (void*)(config & (~1));
	config_conv.is_owned = (config & 1) || (config == 0);
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

uint32_t  __attribute__((visibility("default"))) TS_ChannelManager_create_channel(uint32_t this_arg, int8_tArray their_network_key, int64_t channel_value_satoshis, int64_t push_msat, int64_t user_id, uint32_t override_config) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKPublicKey their_network_key_ref;
	CHECK(*((uint32_t*)their_network_key) == 33);
	memcpy(their_network_key_ref.compressed_form, (uint8_t*)(their_network_key + 4), 33);
	LDKUserConfig override_config_conv;
	override_config_conv.inner = (void*)(override_config & (~1));
	override_config_conv.is_owned = (override_config & 1) || (override_config == 0);
	override_config_conv = UserConfig_clone(&override_config_conv);
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = ChannelManager_create_channel(&this_arg_conv, their_network_key_ref, channel_value_satoshis, push_msat, user_id, override_config_conv);
	return (long)ret_conv;
}

uint32_tArray  __attribute__((visibility("default"))) TS_ChannelManager_list_channels(uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_ChannelDetailsZ ret_var = ChannelManager_list_channels(&this_arg_conv);
	uint32_tArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr + 4);
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

uint32_tArray  __attribute__((visibility("default"))) TS_ChannelManager_list_usable_channels(uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_ChannelDetailsZ ret_var = ChannelManager_list_usable_channels(&this_arg_conv);
	uint32_tArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native uint32_tArray Bytes");
	uint32_t *ret_arr_ptr = (uint32_t*)(ret_arr + 4);
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

uint32_t  __attribute__((visibility("default"))) TS_ChannelManager_close_channel(uint32_t this_arg, int8_tArray channel_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char channel_id_arr[32];
	CHECK(*((uint32_t*)channel_id) == 32);
	memcpy(channel_id_arr, (uint8_t*)(channel_id + 4), 32);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = ChannelManager_close_channel(&this_arg_conv, channel_id_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManager_force_close_channel(uint32_t this_arg, int8_tArray channel_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char channel_id_arr[32];
	CHECK(*((uint32_t*)channel_id) == 32);
	memcpy(channel_id_arr, (uint8_t*)(channel_id + 4), 32);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = ChannelManager_force_close_channel(&this_arg_conv, channel_id_ref);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_ChannelManager_force_close_all_channels(uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	ChannelManager_force_close_all_channels(&this_arg_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManager_send_payment(uint32_t this_arg, uint32_t route, int8_tArray payment_hash, int8_tArray payment_secret) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKRoute route_conv;
	route_conv.inner = (void*)(route & (~1));
	route_conv.is_owned = false;
	LDKThirtyTwoBytes payment_hash_ref;
	CHECK(*((uint32_t*)payment_hash) == 32);
	memcpy(payment_hash_ref.data, (uint8_t*)(payment_hash + 4), 32);
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK(*((uint32_t*)payment_secret) == 32);
	memcpy(payment_secret_ref.data, (uint8_t*)(payment_secret + 4), 32);
	LDKCResult_NonePaymentSendFailureZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret_conv = ChannelManager_send_payment(&this_arg_conv, &route_conv, payment_hash_ref, payment_secret_ref);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_ChannelManager_funding_transaction_generated(uint32_t this_arg, int8_tArray temporary_channel_id, uint32_t funding_txo) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char temporary_channel_id_arr[32];
	CHECK(*((uint32_t*)temporary_channel_id) == 32);
	memcpy(temporary_channel_id_arr, (uint8_t*)(temporary_channel_id + 4), 32);
	unsigned char (*temporary_channel_id_ref)[32] = &temporary_channel_id_arr;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	funding_txo_conv = OutPoint_clone(&funding_txo_conv);
	ChannelManager_funding_transaction_generated(&this_arg_conv, temporary_channel_id_ref, funding_txo_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelManager_broadcast_node_announcement(uint32_t this_arg, int8_tArray rgb, int8_tArray alias, uint32_tArray addresses) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKThreeBytes rgb_ref;
	CHECK(*((uint32_t*)rgb) == 3);
	memcpy(rgb_ref.data, (uint8_t*)(rgb + 4), 3);
	LDKThirtyTwoBytes alias_ref;
	CHECK(*((uint32_t*)alias) == 32);
	memcpy(alias_ref.data, (uint8_t*)(alias + 4), 32);
	LDKCVec_NetAddressZ addresses_constr;
	addresses_constr.datalen = *((uint32_t*)addresses);
	if (addresses_constr.datalen > 0)
		addresses_constr.data = MALLOC(addresses_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		addresses_constr.data = NULL;
	uint32_t* addresses_vals = (uint32_t*)(addresses + 4);
	for (size_t m = 0; m < addresses_constr.datalen; m++) {
		uint32_t arr_conv_12 = addresses_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)(((uint64_t)arr_conv_12) & ~1);
		FREE((void*)arr_conv_12);
		addresses_constr.data[m] = arr_conv_12_conv;
	}
	ChannelManager_broadcast_node_announcement(&this_arg_conv, rgb_ref, alias_ref, addresses_constr);
}

void  __attribute__((visibility("default"))) TS_ChannelManager_process_pending_htlc_forwards(uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	ChannelManager_process_pending_htlc_forwards(&this_arg_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelManager_timer_chan_freshness_every_min(uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	ChannelManager_timer_chan_freshness_every_min(&this_arg_conv);
}

jboolean  __attribute__((visibility("default"))) TS_ChannelManager_fail_htlc_backwards(uint32_t this_arg, int8_tArray payment_hash, int8_tArray payment_secret) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char payment_hash_arr[32];
	CHECK(*((uint32_t*)payment_hash) == 32);
	memcpy(payment_hash_arr, (uint8_t*)(payment_hash + 4), 32);
	unsigned char (*payment_hash_ref)[32] = &payment_hash_arr;
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK(*((uint32_t*)payment_secret) == 32);
	memcpy(payment_secret_ref.data, (uint8_t*)(payment_secret + 4), 32);
	jboolean ret_val = ChannelManager_fail_htlc_backwards(&this_arg_conv, payment_hash_ref, payment_secret_ref);
	return ret_val;
}

jboolean  __attribute__((visibility("default"))) TS_ChannelManager_claim_funds(uint32_t this_arg, int8_tArray payment_preimage, int8_tArray payment_secret, int64_t expected_amount) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKThirtyTwoBytes payment_preimage_ref;
	CHECK(*((uint32_t*)payment_preimage) == 32);
	memcpy(payment_preimage_ref.data, (uint8_t*)(payment_preimage + 4), 32);
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK(*((uint32_t*)payment_secret) == 32);
	memcpy(payment_secret_ref.data, (uint8_t*)(payment_secret + 4), 32);
	jboolean ret_val = ChannelManager_claim_funds(&this_arg_conv, payment_preimage_ref, payment_secret_ref, expected_amount);
	return ret_val;
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelManager_get_our_node_id(uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelManager_get_our_node_id(&this_arg_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelManager_channel_monitor_updated(uint32_t this_arg, uint32_t funding_txo, int64_t highest_applied_update_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = false;
	ChannelManager_channel_monitor_updated(&this_arg_conv, &funding_txo_conv, highest_applied_update_id);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManager_as_MessageSendEventsProvider(uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKMessageSendEventsProvider* ret = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*ret = ChannelManager_as_MessageSendEventsProvider(&this_arg_conv);
	return (long)ret;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManager_as_EventsProvider(uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKEventsProvider* ret = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*ret = ChannelManager_as_EventsProvider(&this_arg_conv);
	return (long)ret;
}

void  __attribute__((visibility("default"))) TS_ChannelManager_block_connected(uint32_t this_arg, int8_tArray header, uint32_tArray txdata, int32_t height) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*((uint32_t*)header) == 80);
	memcpy(header_arr, (uint8_t*)(header + 4), 80);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = *((uint32_t*)txdata);
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	uint32_t* txdata_vals = (uint32_t*)(txdata + 4);
	for (size_t e = 0; e < txdata_constr.datalen; e++) {
		uint32_t arr_conv_30 = txdata_vals[e];
		LDKC2Tuple_usizeTransactionZ arr_conv_30_conv = *(LDKC2Tuple_usizeTransactionZ*)(((uint64_t)arr_conv_30) & ~1);
		FREE((void*)arr_conv_30);
		txdata_constr.data[e] = arr_conv_30_conv;
	}
	ChannelManager_block_connected(&this_arg_conv, header_ref, txdata_constr, height);
}

void  __attribute__((visibility("default"))) TS_ChannelManager_block_disconnected(uint32_t this_arg, int8_tArray header) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK(*((uint32_t*)header) == 80);
	memcpy(header_arr, (uint8_t*)(header + 4), 80);
	unsigned char (*header_ref)[80] = &header_arr;
	ChannelManager_block_disconnected(&this_arg_conv, header_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManager_as_ChannelMessageHandler(uint32_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelMessageHandler* ret = MALLOC(sizeof(LDKChannelMessageHandler), "LDKChannelMessageHandler");
	*ret = ChannelManager_as_ChannelMessageHandler(&this_arg_conv);
	return (long)ret;
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelManager_write(uint32_t obj) {
	LDKChannelManager obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelManager_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_free(uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelManagerReadArgs_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_get_keys_manager(uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_keys_manager(&this_ptr_conv);
	return ret_ret;
}

void  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_set_keys_manager(uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKKeysInterface val_conv = *(LDKKeysInterface*)(((uint64_t)val) & ~1);
	ChannelManagerReadArgs_set_keys_manager(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_get_fee_estimator(uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_fee_estimator(&this_ptr_conv);
	return ret_ret;
}

void  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_set_fee_estimator(uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKFeeEstimator val_conv = *(LDKFeeEstimator*)(((uint64_t)val) & ~1);
	ChannelManagerReadArgs_set_fee_estimator(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_get_chain_monitor(uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_chain_monitor(&this_ptr_conv);
	return ret_ret;
}

void  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_set_chain_monitor(uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKWatch val_conv = *(LDKWatch*)(((uint64_t)val) & ~1);
	ChannelManagerReadArgs_set_chain_monitor(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_get_tx_broadcaster(uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_tx_broadcaster(&this_ptr_conv);
	return ret_ret;
}

void  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_set_tx_broadcaster(uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKBroadcasterInterface val_conv = *(LDKBroadcasterInterface*)(((uint64_t)val) & ~1);
	ChannelManagerReadArgs_set_tx_broadcaster(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_get_logger(uint32_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_logger(&this_ptr_conv);
	return ret_ret;
}

void  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_set_logger(uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKLogger val_conv = *(LDKLogger*)(((uint64_t)val) & ~1);
	ChannelManagerReadArgs_set_logger(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_get_default_config(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_set_default_config(uint32_t this_ptr, uint32_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUserConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = UserConfig_clone(&val_conv);
	ChannelManagerReadArgs_set_default_config(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelManagerReadArgs_new(uint32_t keys_manager, uint32_t fee_estimator, uint32_t chain_monitor, uint32_t tx_broadcaster, uint32_t logger, uint32_t default_config, uint32_tArray channel_monitors) {
	LDKKeysInterface keys_manager_conv = *(LDKKeysInterface*)(((uint64_t)keys_manager) & ~1);
	LDKFeeEstimator fee_estimator_conv = *(LDKFeeEstimator*)(((uint64_t)fee_estimator) & ~1);
	LDKWatch chain_monitor_conv = *(LDKWatch*)(((uint64_t)chain_monitor) & ~1);
	LDKBroadcasterInterface tx_broadcaster_conv = *(LDKBroadcasterInterface*)(((uint64_t)tx_broadcaster) & ~1);
	LDKLogger logger_conv = *(LDKLogger*)(((uint64_t)logger) & ~1);
	LDKUserConfig default_config_conv;
	default_config_conv.inner = (void*)(default_config & (~1));
	default_config_conv.is_owned = (default_config & 1) || (default_config == 0);
	default_config_conv = UserConfig_clone(&default_config_conv);
	LDKCVec_ChannelMonitorZ channel_monitors_constr;
	channel_monitors_constr.datalen = *((uint32_t*)channel_monitors);
	if (channel_monitors_constr.datalen > 0)
		channel_monitors_constr.data = MALLOC(channel_monitors_constr.datalen * sizeof(LDKChannelMonitor), "LDKCVec_ChannelMonitorZ Elements");
	else
		channel_monitors_constr.data = NULL;
	uint32_t* channel_monitors_vals = (uint32_t*)(channel_monitors + 4);
	for (size_t q = 0; q < channel_monitors_constr.datalen; q++) {
		uint32_t arr_conv_16 = channel_monitors_vals[q];
		LDKChannelMonitor arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
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

uint32_t  __attribute__((visibility("default"))) TS_C2Tuple_BlockHashChannelManagerZ_read(int8_tArray ser, uint32_t arg) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKChannelManagerReadArgs arg_conv;
	arg_conv.inner = (void*)(arg & (~1));
	arg_conv.is_owned = (arg & 1) || (arg == 0);
	// Warning: we need a move here but no clone is available for LDKChannelManagerReadArgs
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ");
	*ret_conv = C2Tuple_BlockHashChannelManagerZ_read(ser_ref, arg_conv);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_DecodeError_free(uint32_t this_ptr) {
	LDKDecodeError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DecodeError_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_DecodeError_clone(uint32_t orig) {
	LDKDecodeError orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKDecodeError ret_var = DecodeError_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_Init_free(uint32_t this_ptr) {
	LDKInit this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Init_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_Init_clone(uint32_t orig) {
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

void  __attribute__((visibility("default"))) TS_ErrorMessage_free(uint32_t this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ErrorMessage_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ErrorMessage_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_ErrorMessage_get_channel_id(uint32_t this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *ErrorMessage_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_ErrorMessage_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	ErrorMessage_set_channel_id(&this_ptr_conv, val_ref);
}

jstring  __attribute__((visibility("default"))) TS_ErrorMessage_get_data(uint32_t this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKStr _str = ErrorMessage_get_data(&this_ptr_conv);
	jstring _conv = str_ref_to_ts(_str.chars, _str.len);
	return _conv;
}

void  __attribute__((visibility("default"))) TS_ErrorMessage_set_data(uint32_t this_ptr, int8_tArray val) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u8Z val_ref;
	val_ref.datalen = *((uint32_t*)val);
	val_ref.data = MALLOC(val_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(val_ref.data, (uint8_t*)(val + 4), val_ref.datalen);
	ErrorMessage_set_data(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_ErrorMessage_new(int8_tArray channel_id_arg, int8_tArray data_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*((uint32_t*)channel_id_arg) == 32);
	memcpy(channel_id_arg_ref.data, (uint8_t*)(channel_id_arg + 4), 32);
	LDKCVec_u8Z data_arg_ref;
	data_arg_ref.datalen = *((uint32_t*)data_arg);
	data_arg_ref.data = MALLOC(data_arg_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(data_arg_ref.data, (uint8_t*)(data_arg + 4), data_arg_ref.datalen);
	LDKErrorMessage ret_var = ErrorMessage_new(channel_id_arg_ref, data_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_Ping_free(uint32_t this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Ping_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_Ping_clone(uint32_t orig) {
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

int16_t  __attribute__((visibility("default"))) TS_Ping_get_ponglen(uint32_t this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = Ping_get_ponglen(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_Ping_set_ponglen(uint32_t this_ptr, int16_t val) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	Ping_set_ponglen(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_Ping_get_byteslen(uint32_t this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = Ping_get_byteslen(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_Ping_set_byteslen(uint32_t this_ptr, int16_t val) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	Ping_set_byteslen(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_Ping_new(int16_t ponglen_arg, int16_t byteslen_arg) {
	LDKPing ret_var = Ping_new(ponglen_arg, byteslen_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_Pong_free(uint32_t this_ptr) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Pong_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_Pong_clone(uint32_t orig) {
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

int16_t  __attribute__((visibility("default"))) TS_Pong_get_byteslen(uint32_t this_ptr) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = Pong_get_byteslen(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_Pong_set_byteslen(uint32_t this_ptr, int16_t val) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	Pong_set_byteslen(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_Pong_new(int16_t byteslen_arg) {
	LDKPong ret_var = Pong_new(byteslen_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_free(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_OpenChannel_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_OpenChannel_get_chain_hash(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *OpenChannel_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_chain_hash(uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	OpenChannel_set_chain_hash(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_OpenChannel_get_temporary_channel_id(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *OpenChannel_get_temporary_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_temporary_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	OpenChannel_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_OpenChannel_get_funding_satoshis(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_funding_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_funding_satoshis(uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_funding_satoshis(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_OpenChannel_get_push_msat(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_push_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_push_msat(uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_push_msat(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_OpenChannel_get_dust_limit_satoshis(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_dust_limit_satoshis(uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_dust_limit_satoshis(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_OpenChannel_get_max_htlc_value_in_flight_msat(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_max_htlc_value_in_flight_msat(uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_OpenChannel_get_channel_reserve_satoshis(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_channel_reserve_satoshis(uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_channel_reserve_satoshis(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_OpenChannel_get_htlc_minimum_msat(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_htlc_minimum_msat(uint32_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_htlc_minimum_msat(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_OpenChannel_get_feerate_per_kw(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = OpenChannel_get_feerate_per_kw(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_feerate_per_kw(uint32_t this_ptr, int32_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_feerate_per_kw(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_OpenChannel_get_to_self_delay(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = OpenChannel_get_to_self_delay(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_to_self_delay(uint32_t this_ptr, int16_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_to_self_delay(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_OpenChannel_get_max_accepted_htlcs(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = OpenChannel_get_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_max_accepted_htlcs(uint32_t this_ptr, int16_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_max_accepted_htlcs(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_OpenChannel_get_funding_pubkey(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), OpenChannel_get_funding_pubkey(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_funding_pubkey(uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	OpenChannel_set_funding_pubkey(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_OpenChannel_get_revocation_basepoint(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), OpenChannel_get_revocation_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_revocation_basepoint(uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	OpenChannel_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_OpenChannel_get_payment_point(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), OpenChannel_get_payment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_payment_point(uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	OpenChannel_set_payment_point(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_OpenChannel_get_delayed_payment_basepoint(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), OpenChannel_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_delayed_payment_basepoint(uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	OpenChannel_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_OpenChannel_get_htlc_basepoint(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), OpenChannel_get_htlc_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_htlc_basepoint(uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	OpenChannel_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_OpenChannel_get_first_per_commitment_point(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), OpenChannel_get_first_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_first_per_commitment_point(uint32_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	OpenChannel_set_first_per_commitment_point(&this_ptr_conv, val_ref);
}

int8_t  __attribute__((visibility("default"))) TS_OpenChannel_get_channel_flags(uint32_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_t ret_val = OpenChannel_get_channel_flags(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_OpenChannel_set_channel_flags(uint32_t this_ptr, int8_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_channel_flags(&this_ptr_conv, val);
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_free(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_AcceptChannel_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_AcceptChannel_get_temporary_channel_id(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *AcceptChannel_get_temporary_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_temporary_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	AcceptChannel_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_AcceptChannel_get_dust_limit_satoshis(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_dust_limit_satoshis(uint32_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_dust_limit_satoshis(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_AcceptChannel_get_max_htlc_value_in_flight_msat(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_max_htlc_value_in_flight_msat(uint32_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_AcceptChannel_get_channel_reserve_satoshis(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_channel_reserve_satoshis(uint32_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_channel_reserve_satoshis(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_AcceptChannel_get_htlc_minimum_msat(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_htlc_minimum_msat(uint32_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_htlc_minimum_msat(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_AcceptChannel_get_minimum_depth(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = AcceptChannel_get_minimum_depth(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_minimum_depth(uint32_t this_ptr, int32_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_minimum_depth(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_AcceptChannel_get_to_self_delay(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = AcceptChannel_get_to_self_delay(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_to_self_delay(uint32_t this_ptr, int16_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_to_self_delay(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_AcceptChannel_get_max_accepted_htlcs(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = AcceptChannel_get_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_max_accepted_htlcs(uint32_t this_ptr, int16_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_max_accepted_htlcs(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_AcceptChannel_get_funding_pubkey(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), AcceptChannel_get_funding_pubkey(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_funding_pubkey(uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	AcceptChannel_set_funding_pubkey(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_AcceptChannel_get_revocation_basepoint(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), AcceptChannel_get_revocation_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_revocation_basepoint(uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	AcceptChannel_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_AcceptChannel_get_payment_point(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), AcceptChannel_get_payment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_payment_point(uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	AcceptChannel_set_payment_point(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_AcceptChannel_get_delayed_payment_basepoint(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), AcceptChannel_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_delayed_payment_basepoint(uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	AcceptChannel_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_AcceptChannel_get_htlc_basepoint(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), AcceptChannel_get_htlc_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_htlc_basepoint(uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	AcceptChannel_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_AcceptChannel_get_first_per_commitment_point(uint32_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), AcceptChannel_get_first_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_AcceptChannel_set_first_per_commitment_point(uint32_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	AcceptChannel_set_first_per_commitment_point(&this_ptr_conv, val_ref);
}

void  __attribute__((visibility("default"))) TS_FundingCreated_free(uint32_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingCreated_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_FundingCreated_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_FundingCreated_get_temporary_channel_id(uint32_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *FundingCreated_get_temporary_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_FundingCreated_set_temporary_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	FundingCreated_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_FundingCreated_get_funding_txid(uint32_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *FundingCreated_get_funding_txid(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_FundingCreated_set_funding_txid(uint32_t this_ptr, int8_tArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	FundingCreated_set_funding_txid(&this_ptr_conv, val_ref);
}

int16_t  __attribute__((visibility("default"))) TS_FundingCreated_get_funding_output_index(uint32_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = FundingCreated_get_funding_output_index(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_FundingCreated_set_funding_output_index(uint32_t this_ptr, int16_t val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	FundingCreated_set_funding_output_index(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_FundingCreated_get_signature(uint32_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), FundingCreated_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_FundingCreated_set_signature(uint32_t this_ptr, int8_tArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	FundingCreated_set_signature(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_FundingCreated_new(int8_tArray temporary_channel_id_arg, int8_tArray funding_txid_arg, int16_t funding_output_index_arg, int8_tArray signature_arg) {
	LDKThirtyTwoBytes temporary_channel_id_arg_ref;
	CHECK(*((uint32_t*)temporary_channel_id_arg) == 32);
	memcpy(temporary_channel_id_arg_ref.data, (uint8_t*)(temporary_channel_id_arg + 4), 32);
	LDKThirtyTwoBytes funding_txid_arg_ref;
	CHECK(*((uint32_t*)funding_txid_arg) == 32);
	memcpy(funding_txid_arg_ref.data, (uint8_t*)(funding_txid_arg + 4), 32);
	LDKSignature signature_arg_ref;
	CHECK(*((uint32_t*)signature_arg) == 64);
	memcpy(signature_arg_ref.compact_form, (uint8_t*)(signature_arg + 4), 64);
	LDKFundingCreated ret_var = FundingCreated_new(temporary_channel_id_arg_ref, funding_txid_arg_ref, funding_output_index_arg, signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_FundingSigned_free(uint32_t this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingSigned_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_FundingSigned_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_FundingSigned_get_channel_id(uint32_t this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *FundingSigned_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_FundingSigned_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	FundingSigned_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_FundingSigned_get_signature(uint32_t this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), FundingSigned_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_FundingSigned_set_signature(uint32_t this_ptr, int8_tArray val) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	FundingSigned_set_signature(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_FundingSigned_new(int8_tArray channel_id_arg, int8_tArray signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*((uint32_t*)channel_id_arg) == 32);
	memcpy(channel_id_arg_ref.data, (uint8_t*)(channel_id_arg + 4), 32);
	LDKSignature signature_arg_ref;
	CHECK(*((uint32_t*)signature_arg) == 64);
	memcpy(signature_arg_ref.compact_form, (uint8_t*)(signature_arg + 4), 64);
	LDKFundingSigned ret_var = FundingSigned_new(channel_id_arg_ref, signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_FundingLocked_free(uint32_t this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingLocked_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_FundingLocked_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_FundingLocked_get_channel_id(uint32_t this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *FundingLocked_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_FundingLocked_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	FundingLocked_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_FundingLocked_get_next_per_commitment_point(uint32_t this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), FundingLocked_get_next_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_FundingLocked_set_next_per_commitment_point(uint32_t this_ptr, int8_tArray val) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	FundingLocked_set_next_per_commitment_point(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_FundingLocked_new(int8_tArray channel_id_arg, int8_tArray next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*((uint32_t*)channel_id_arg) == 32);
	memcpy(channel_id_arg_ref.data, (uint8_t*)(channel_id_arg + 4), 32);
	LDKPublicKey next_per_commitment_point_arg_ref;
	CHECK(*((uint32_t*)next_per_commitment_point_arg) == 33);
	memcpy(next_per_commitment_point_arg_ref.compressed_form, (uint8_t*)(next_per_commitment_point_arg + 4), 33);
	LDKFundingLocked ret_var = FundingLocked_new(channel_id_arg_ref, next_per_commitment_point_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_Shutdown_free(uint32_t this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Shutdown_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_Shutdown_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_Shutdown_get_channel_id(uint32_t this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *Shutdown_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_Shutdown_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	Shutdown_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_Shutdown_get_scriptpubkey(uint32_t this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKu8slice arg_var = Shutdown_get_scriptpubkey(&this_ptr_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_Shutdown_set_scriptpubkey(uint32_t this_ptr, int8_tArray val) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u8Z val_ref;
	val_ref.datalen = *((uint32_t*)val);
	val_ref.data = MALLOC(val_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(val_ref.data, (uint8_t*)(val + 4), val_ref.datalen);
	Shutdown_set_scriptpubkey(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_Shutdown_new(int8_tArray channel_id_arg, int8_tArray scriptpubkey_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*((uint32_t*)channel_id_arg) == 32);
	memcpy(channel_id_arg_ref.data, (uint8_t*)(channel_id_arg + 4), 32);
	LDKCVec_u8Z scriptpubkey_arg_ref;
	scriptpubkey_arg_ref.datalen = *((uint32_t*)scriptpubkey_arg);
	scriptpubkey_arg_ref.data = MALLOC(scriptpubkey_arg_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(scriptpubkey_arg_ref.data, (uint8_t*)(scriptpubkey_arg + 4), scriptpubkey_arg_ref.datalen);
	LDKShutdown ret_var = Shutdown_new(channel_id_arg_ref, scriptpubkey_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_ClosingSigned_free(uint32_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ClosingSigned_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ClosingSigned_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_ClosingSigned_get_channel_id(uint32_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *ClosingSigned_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_ClosingSigned_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	ClosingSigned_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_ClosingSigned_get_fee_satoshis(uint32_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ClosingSigned_get_fee_satoshis(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ClosingSigned_set_fee_satoshis(uint32_t this_ptr, int64_t val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ClosingSigned_set_fee_satoshis(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_ClosingSigned_get_signature(uint32_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ClosingSigned_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ClosingSigned_set_signature(uint32_t this_ptr, int8_tArray val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	ClosingSigned_set_signature(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_ClosingSigned_new(int8_tArray channel_id_arg, int64_t fee_satoshis_arg, int8_tArray signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*((uint32_t*)channel_id_arg) == 32);
	memcpy(channel_id_arg_ref.data, (uint8_t*)(channel_id_arg + 4), 32);
	LDKSignature signature_arg_ref;
	CHECK(*((uint32_t*)signature_arg) == 64);
	memcpy(signature_arg_ref.compact_form, (uint8_t*)(signature_arg + 4), 64);
	LDKClosingSigned ret_var = ClosingSigned_new(channel_id_arg_ref, fee_satoshis_arg, signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_UpdateAddHTLC_free(uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateAddHTLC_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateAddHTLC_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_UpdateAddHTLC_get_channel_id(uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UpdateAddHTLC_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UpdateAddHTLC_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	UpdateAddHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_UpdateAddHTLC_get_htlc_id(uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateAddHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UpdateAddHTLC_set_htlc_id(uint32_t this_ptr, int64_t val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateAddHTLC_set_htlc_id(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_UpdateAddHTLC_get_amount_msat(uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateAddHTLC_get_amount_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UpdateAddHTLC_set_amount_msat(uint32_t this_ptr, int64_t val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateAddHTLC_set_amount_msat(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_UpdateAddHTLC_get_payment_hash(uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UpdateAddHTLC_get_payment_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UpdateAddHTLC_set_payment_hash(uint32_t this_ptr, int8_tArray val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	UpdateAddHTLC_set_payment_hash(&this_ptr_conv, val_ref);
}

int32_t  __attribute__((visibility("default"))) TS_UpdateAddHTLC_get_cltv_expiry(uint32_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UpdateAddHTLC_get_cltv_expiry(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UpdateAddHTLC_set_cltv_expiry(uint32_t this_ptr, int32_t val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateAddHTLC_set_cltv_expiry(&this_ptr_conv, val);
}

void  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_free(uint32_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFulfillHTLC_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_get_channel_id(uint32_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UpdateFulfillHTLC_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	UpdateFulfillHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_get_htlc_id(uint32_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateFulfillHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_set_htlc_id(uint32_t this_ptr, int64_t val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFulfillHTLC_set_htlc_id(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_get_payment_preimage(uint32_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UpdateFulfillHTLC_get_payment_preimage(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_set_payment_preimage(uint32_t this_ptr, int8_tArray val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	UpdateFulfillHTLC_set_payment_preimage(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_new(int8_tArray channel_id_arg, int64_t htlc_id_arg, int8_tArray payment_preimage_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*((uint32_t*)channel_id_arg) == 32);
	memcpy(channel_id_arg_ref.data, (uint8_t*)(channel_id_arg + 4), 32);
	LDKThirtyTwoBytes payment_preimage_arg_ref;
	CHECK(*((uint32_t*)payment_preimage_arg) == 32);
	memcpy(payment_preimage_arg_ref.data, (uint8_t*)(payment_preimage_arg + 4), 32);
	LDKUpdateFulfillHTLC ret_var = UpdateFulfillHTLC_new(channel_id_arg_ref, htlc_id_arg, payment_preimage_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_UpdateFailHTLC_free(uint32_t this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailHTLC_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateFailHTLC_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_UpdateFailHTLC_get_channel_id(uint32_t this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UpdateFailHTLC_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UpdateFailHTLC_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	UpdateFailHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_UpdateFailHTLC_get_htlc_id(uint32_t this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateFailHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UpdateFailHTLC_set_htlc_id(uint32_t this_ptr, int64_t val) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFailHTLC_set_htlc_id(&this_ptr_conv, val);
}

void  __attribute__((visibility("default"))) TS_UpdateFailMalformedHTLC_free(uint32_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailMalformedHTLC_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateFailMalformedHTLC_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_UpdateFailMalformedHTLC_get_channel_id(uint32_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UpdateFailMalformedHTLC_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UpdateFailMalformedHTLC_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	UpdateFailMalformedHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_UpdateFailMalformedHTLC_get_htlc_id(uint32_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateFailMalformedHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UpdateFailMalformedHTLC_set_htlc_id(uint32_t this_ptr, int64_t val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFailMalformedHTLC_set_htlc_id(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_UpdateFailMalformedHTLC_get_failure_code(uint32_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = UpdateFailMalformedHTLC_get_failure_code(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UpdateFailMalformedHTLC_set_failure_code(uint32_t this_ptr, int16_t val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFailMalformedHTLC_set_failure_code(&this_ptr_conv, val);
}

void  __attribute__((visibility("default"))) TS_CommitmentSigned_free(uint32_t this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentSigned_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CommitmentSigned_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_CommitmentSigned_get_channel_id(uint32_t this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *CommitmentSigned_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_CommitmentSigned_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	CommitmentSigned_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_CommitmentSigned_get_signature(uint32_t this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), CommitmentSigned_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_CommitmentSigned_set_signature(uint32_t this_ptr, int8_tArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	CommitmentSigned_set_signature(&this_ptr_conv, val_ref);
}

void  __attribute__((visibility("default"))) TS_CommitmentSigned_set_htlc_signatures(uint32_t this_ptr, ptrArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_SignatureZ val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		val_constr.data = NULL;
	int8_tArray* val_vals = (int8_tArray*)(val + 4);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		int8_tArray arr_conv_12 = val_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*((uint32_t*)arr_conv_12) == 64);
		memcpy(arr_conv_12_ref.compact_form, (uint8_t*)(arr_conv_12 + 4), 64);
		val_constr.data[m] = arr_conv_12_ref;
	}
	CommitmentSigned_set_htlc_signatures(&this_ptr_conv, val_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_CommitmentSigned_new(int8_tArray channel_id_arg, int8_tArray signature_arg, ptrArray htlc_signatures_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*((uint32_t*)channel_id_arg) == 32);
	memcpy(channel_id_arg_ref.data, (uint8_t*)(channel_id_arg + 4), 32);
	LDKSignature signature_arg_ref;
	CHECK(*((uint32_t*)signature_arg) == 64);
	memcpy(signature_arg_ref.compact_form, (uint8_t*)(signature_arg + 4), 64);
	LDKCVec_SignatureZ htlc_signatures_arg_constr;
	htlc_signatures_arg_constr.datalen = *((uint32_t*)htlc_signatures_arg);
	if (htlc_signatures_arg_constr.datalen > 0)
		htlc_signatures_arg_constr.data = MALLOC(htlc_signatures_arg_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		htlc_signatures_arg_constr.data = NULL;
	int8_tArray* htlc_signatures_arg_vals = (int8_tArray*)(htlc_signatures_arg + 4);
	for (size_t m = 0; m < htlc_signatures_arg_constr.datalen; m++) {
		int8_tArray arr_conv_12 = htlc_signatures_arg_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*((uint32_t*)arr_conv_12) == 64);
		memcpy(arr_conv_12_ref.compact_form, (uint8_t*)(arr_conv_12 + 4), 64);
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

void  __attribute__((visibility("default"))) TS_RevokeAndACK_free(uint32_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RevokeAndACK_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_RevokeAndACK_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_RevokeAndACK_get_channel_id(uint32_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *RevokeAndACK_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_RevokeAndACK_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	RevokeAndACK_set_channel_id(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_RevokeAndACK_get_per_commitment_secret(uint32_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *RevokeAndACK_get_per_commitment_secret(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_RevokeAndACK_set_per_commitment_secret(uint32_t this_ptr, int8_tArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	RevokeAndACK_set_per_commitment_secret(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_RevokeAndACK_get_next_per_commitment_point(uint32_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), RevokeAndACK_get_next_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_RevokeAndACK_set_next_per_commitment_point(uint32_t this_ptr, int8_tArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	RevokeAndACK_set_next_per_commitment_point(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_RevokeAndACK_new(int8_tArray channel_id_arg, int8_tArray per_commitment_secret_arg, int8_tArray next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*((uint32_t*)channel_id_arg) == 32);
	memcpy(channel_id_arg_ref.data, (uint8_t*)(channel_id_arg + 4), 32);
	LDKThirtyTwoBytes per_commitment_secret_arg_ref;
	CHECK(*((uint32_t*)per_commitment_secret_arg) == 32);
	memcpy(per_commitment_secret_arg_ref.data, (uint8_t*)(per_commitment_secret_arg + 4), 32);
	LDKPublicKey next_per_commitment_point_arg_ref;
	CHECK(*((uint32_t*)next_per_commitment_point_arg) == 33);
	memcpy(next_per_commitment_point_arg_ref.compressed_form, (uint8_t*)(next_per_commitment_point_arg + 4), 33);
	LDKRevokeAndACK ret_var = RevokeAndACK_new(channel_id_arg_ref, per_commitment_secret_arg_ref, next_per_commitment_point_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_UpdateFee_free(uint32_t this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFee_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateFee_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_UpdateFee_get_channel_id(uint32_t this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UpdateFee_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UpdateFee_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	UpdateFee_set_channel_id(&this_ptr_conv, val_ref);
}

int32_t  __attribute__((visibility("default"))) TS_UpdateFee_get_feerate_per_kw(uint32_t this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UpdateFee_get_feerate_per_kw(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UpdateFee_set_feerate_per_kw(uint32_t this_ptr, int32_t val) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFee_set_feerate_per_kw(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateFee_new(int8_tArray channel_id_arg, int32_t feerate_per_kw_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*((uint32_t*)channel_id_arg) == 32);
	memcpy(channel_id_arg_ref.data, (uint8_t*)(channel_id_arg + 4), 32);
	LDKUpdateFee ret_var = UpdateFee_new(channel_id_arg_ref, feerate_per_kw_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_DataLossProtect_free(uint32_t this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DataLossProtect_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_DataLossProtect_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_DataLossProtect_get_your_last_per_commitment_secret(uint32_t this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *DataLossProtect_get_your_last_per_commitment_secret(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_DataLossProtect_set_your_last_per_commitment_secret(uint32_t this_ptr, int8_tArray val) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	DataLossProtect_set_your_last_per_commitment_secret(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_DataLossProtect_get_my_current_per_commitment_point(uint32_t this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), DataLossProtect_get_my_current_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_DataLossProtect_set_my_current_per_commitment_point(uint32_t this_ptr, int8_tArray val) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	DataLossProtect_set_my_current_per_commitment_point(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_DataLossProtect_new(int8_tArray your_last_per_commitment_secret_arg, int8_tArray my_current_per_commitment_point_arg) {
	LDKThirtyTwoBytes your_last_per_commitment_secret_arg_ref;
	CHECK(*((uint32_t*)your_last_per_commitment_secret_arg) == 32);
	memcpy(your_last_per_commitment_secret_arg_ref.data, (uint8_t*)(your_last_per_commitment_secret_arg + 4), 32);
	LDKPublicKey my_current_per_commitment_point_arg_ref;
	CHECK(*((uint32_t*)my_current_per_commitment_point_arg) == 33);
	memcpy(my_current_per_commitment_point_arg_ref.compressed_form, (uint8_t*)(my_current_per_commitment_point_arg + 4), 33);
	LDKDataLossProtect ret_var = DataLossProtect_new(your_last_per_commitment_secret_arg_ref, my_current_per_commitment_point_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_ChannelReestablish_free(uint32_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelReestablish_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelReestablish_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_ChannelReestablish_get_channel_id(uint32_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *ChannelReestablish_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelReestablish_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	ChannelReestablish_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelReestablish_get_next_local_commitment_number(uint32_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelReestablish_get_next_local_commitment_number(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelReestablish_set_next_local_commitment_number(uint32_t this_ptr, int64_t val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelReestablish_set_next_local_commitment_number(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_ChannelReestablish_get_next_remote_commitment_number(uint32_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelReestablish_get_next_remote_commitment_number(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelReestablish_set_next_remote_commitment_number(uint32_t this_ptr, int64_t val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelReestablish_set_next_remote_commitment_number(&this_ptr_conv, val);
}

void  __attribute__((visibility("default"))) TS_AnnouncementSignatures_free(uint32_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AnnouncementSignatures_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_AnnouncementSignatures_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_AnnouncementSignatures_get_channel_id(uint32_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *AnnouncementSignatures_get_channel_id(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_AnnouncementSignatures_set_channel_id(uint32_t this_ptr, int8_tArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	AnnouncementSignatures_set_channel_id(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_AnnouncementSignatures_get_short_channel_id(uint32_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AnnouncementSignatures_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_AnnouncementSignatures_set_short_channel_id(uint32_t this_ptr, int64_t val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AnnouncementSignatures_set_short_channel_id(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_AnnouncementSignatures_get_node_signature(uint32_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), AnnouncementSignatures_get_node_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_AnnouncementSignatures_set_node_signature(uint32_t this_ptr, int8_tArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	AnnouncementSignatures_set_node_signature(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_AnnouncementSignatures_get_bitcoin_signature(uint32_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), AnnouncementSignatures_get_bitcoin_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_AnnouncementSignatures_set_bitcoin_signature(uint32_t this_ptr, int8_tArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	AnnouncementSignatures_set_bitcoin_signature(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_AnnouncementSignatures_new(int8_tArray channel_id_arg, int64_t short_channel_id_arg, int8_tArray node_signature_arg, int8_tArray bitcoin_signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK(*((uint32_t*)channel_id_arg) == 32);
	memcpy(channel_id_arg_ref.data, (uint8_t*)(channel_id_arg + 4), 32);
	LDKSignature node_signature_arg_ref;
	CHECK(*((uint32_t*)node_signature_arg) == 64);
	memcpy(node_signature_arg_ref.compact_form, (uint8_t*)(node_signature_arg + 4), 64);
	LDKSignature bitcoin_signature_arg_ref;
	CHECK(*((uint32_t*)bitcoin_signature_arg) == 64);
	memcpy(bitcoin_signature_arg_ref.compact_form, (uint8_t*)(bitcoin_signature_arg + 4), 64);
	LDKAnnouncementSignatures ret_var = AnnouncementSignatures_new(channel_id_arg_ref, short_channel_id_arg, node_signature_arg_ref, bitcoin_signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_NetAddress_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKNetAddress this_ptr_conv = *(LDKNetAddress*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	NetAddress_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_NetAddress_clone(uint32_t orig) {
	LDKNetAddress* orig_conv = (LDKNetAddress*)orig;
	LDKNetAddress *ret_copy = MALLOC(sizeof(LDKNetAddress), "LDKNetAddress");
	*ret_copy = NetAddress_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_NetAddress_write(uint32_t obj) {
	LDKNetAddress* obj_conv = (LDKNetAddress*)obj;
	LDKCVec_u8Z arg_var = NetAddress_write(obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_Result_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ), "LDKCResult_CResult_NetAddressu8ZDecodeErrorZ");
	*ret_conv = Result_read(ser_ref);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_free(uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedNodeAnnouncement_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_clone(uint32_t orig) {
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

uint32_t  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_get_features(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_set_features(uint32_t this_ptr, uint32_t val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we need a move here but no clone is available for LDKNodeFeatures
	UnsignedNodeAnnouncement_set_features(&this_ptr_conv, val_conv);
}

int32_t  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_get_timestamp(uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedNodeAnnouncement_get_timestamp(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_set_timestamp(uint32_t this_ptr, int32_t val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedNodeAnnouncement_set_timestamp(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_get_node_id(uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), UnsignedNodeAnnouncement_get_node_id(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_set_node_id(uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	UnsignedNodeAnnouncement_set_node_id(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_get_rgb(uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(3, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UnsignedNodeAnnouncement_get_rgb(&this_ptr_conv), 3);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_set_rgb(uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThreeBytes val_ref;
	CHECK(*((uint32_t*)val) == 3);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 3);
	UnsignedNodeAnnouncement_set_rgb(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_get_alias(uint32_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UnsignedNodeAnnouncement_get_alias(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_set_alias(uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	UnsignedNodeAnnouncement_set_alias(&this_ptr_conv, val_ref);
}

void  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_set_addresses(uint32_t this_ptr, uint32_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_NetAddressZ val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val + 4);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		uint32_t arr_conv_12 = val_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)(((uint64_t)arr_conv_12) & ~1);
		FREE((void*)arr_conv_12);
		val_constr.data[m] = arr_conv_12_conv;
	}
	UnsignedNodeAnnouncement_set_addresses(&this_ptr_conv, val_constr);
}

void  __attribute__((visibility("default"))) TS_NodeAnnouncement_free(uint32_t this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeAnnouncement_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_NodeAnnouncement_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_NodeAnnouncement_get_signature(uint32_t this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), NodeAnnouncement_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_NodeAnnouncement_set_signature(uint32_t this_ptr, int8_tArray val) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	NodeAnnouncement_set_signature(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_NodeAnnouncement_get_contents(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_NodeAnnouncement_set_contents(uint32_t this_ptr, uint32_t val) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedNodeAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = UnsignedNodeAnnouncement_clone(&val_conv);
	NodeAnnouncement_set_contents(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_NodeAnnouncement_new(int8_tArray signature_arg, uint32_t contents_arg) {
	LDKSignature signature_arg_ref;
	CHECK(*((uint32_t*)signature_arg) == 64);
	memcpy(signature_arg_ref.compact_form, (uint8_t*)(signature_arg + 4), 64);
	LDKUnsignedNodeAnnouncement contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
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

void  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_free(uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelAnnouncement_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_clone(uint32_t orig) {
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

uint32_t  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_get_features(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_set_features(uint32_t this_ptr, uint32_t val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we need a move here but no clone is available for LDKChannelFeatures
	UnsignedChannelAnnouncement_set_features(&this_ptr_conv, val_conv);
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_get_chain_hash(uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UnsignedChannelAnnouncement_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_set_chain_hash(uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	UnsignedChannelAnnouncement_set_chain_hash(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_get_short_channel_id(uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UnsignedChannelAnnouncement_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_set_short_channel_id(uint32_t this_ptr, int64_t val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelAnnouncement_set_short_channel_id(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_get_node_id_1(uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), UnsignedChannelAnnouncement_get_node_id_1(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_set_node_id_1(uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	UnsignedChannelAnnouncement_set_node_id_1(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_get_node_id_2(uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), UnsignedChannelAnnouncement_get_node_id_2(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_set_node_id_2(uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	UnsignedChannelAnnouncement_set_node_id_2(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_get_bitcoin_key_1(uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), UnsignedChannelAnnouncement_get_bitcoin_key_1(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_set_bitcoin_key_1(uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	UnsignedChannelAnnouncement_set_bitcoin_key_1(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_get_bitcoin_key_2(uint32_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), UnsignedChannelAnnouncement_get_bitcoin_key_2(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_set_bitcoin_key_2(uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	UnsignedChannelAnnouncement_set_bitcoin_key_2(&this_ptr_conv, val_ref);
}

void  __attribute__((visibility("default"))) TS_ChannelAnnouncement_free(uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelAnnouncement_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelAnnouncement_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_ChannelAnnouncement_get_node_signature_1(uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelAnnouncement_get_node_signature_1(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelAnnouncement_set_node_signature_1(uint32_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	ChannelAnnouncement_set_node_signature_1(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelAnnouncement_get_node_signature_2(uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelAnnouncement_get_node_signature_2(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelAnnouncement_set_node_signature_2(uint32_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	ChannelAnnouncement_set_node_signature_2(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelAnnouncement_get_bitcoin_signature_1(uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelAnnouncement_get_bitcoin_signature_1(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelAnnouncement_set_bitcoin_signature_1(uint32_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	ChannelAnnouncement_set_bitcoin_signature_1(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelAnnouncement_get_bitcoin_signature_2(uint32_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelAnnouncement_get_bitcoin_signature_2(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelAnnouncement_set_bitcoin_signature_2(uint32_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	ChannelAnnouncement_set_bitcoin_signature_2(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelAnnouncement_get_contents(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelAnnouncement_set_contents(uint32_t this_ptr, uint32_t val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedChannelAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = UnsignedChannelAnnouncement_clone(&val_conv);
	ChannelAnnouncement_set_contents(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelAnnouncement_new(int8_tArray node_signature_1_arg, int8_tArray node_signature_2_arg, int8_tArray bitcoin_signature_1_arg, int8_tArray bitcoin_signature_2_arg, uint32_t contents_arg) {
	LDKSignature node_signature_1_arg_ref;
	CHECK(*((uint32_t*)node_signature_1_arg) == 64);
	memcpy(node_signature_1_arg_ref.compact_form, (uint8_t*)(node_signature_1_arg + 4), 64);
	LDKSignature node_signature_2_arg_ref;
	CHECK(*((uint32_t*)node_signature_2_arg) == 64);
	memcpy(node_signature_2_arg_ref.compact_form, (uint8_t*)(node_signature_2_arg + 4), 64);
	LDKSignature bitcoin_signature_1_arg_ref;
	CHECK(*((uint32_t*)bitcoin_signature_1_arg) == 64);
	memcpy(bitcoin_signature_1_arg_ref.compact_form, (uint8_t*)(bitcoin_signature_1_arg + 4), 64);
	LDKSignature bitcoin_signature_2_arg_ref;
	CHECK(*((uint32_t*)bitcoin_signature_2_arg) == 64);
	memcpy(bitcoin_signature_2_arg_ref.compact_form, (uint8_t*)(bitcoin_signature_2_arg + 4), 64);
	LDKUnsignedChannelAnnouncement contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
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

void  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_free(uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_get_chain_hash(uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *UnsignedChannelUpdate_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_set_chain_hash(uint32_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	UnsignedChannelUpdate_set_chain_hash(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_get_short_channel_id(uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UnsignedChannelUpdate_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_set_short_channel_id(uint32_t this_ptr, int64_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_short_channel_id(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_get_timestamp(uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedChannelUpdate_get_timestamp(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_set_timestamp(uint32_t this_ptr, int32_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_timestamp(&this_ptr_conv, val);
}

int8_t  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_get_flags(uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_t ret_val = UnsignedChannelUpdate_get_flags(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_set_flags(uint32_t this_ptr, int8_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_flags(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_get_cltv_expiry_delta(uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = UnsignedChannelUpdate_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_set_cltv_expiry_delta(uint32_t this_ptr, int16_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_cltv_expiry_delta(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_get_htlc_minimum_msat(uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UnsignedChannelUpdate_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_set_htlc_minimum_msat(uint32_t this_ptr, int64_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_htlc_minimum_msat(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_get_fee_base_msat(uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedChannelUpdate_get_fee_base_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_set_fee_base_msat(uint32_t this_ptr, int32_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_fee_base_msat(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_get_fee_proportional_millionths(uint32_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedChannelUpdate_get_fee_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_set_fee_proportional_millionths(uint32_t this_ptr, int32_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_fee_proportional_millionths(&this_ptr_conv, val);
}

void  __attribute__((visibility("default"))) TS_ChannelUpdate_free(uint32_t this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelUpdate_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelUpdate_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_ChannelUpdate_get_signature(uint32_t this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelUpdate_get_signature(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelUpdate_set_signature(uint32_t this_ptr, int8_tArray val) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	ChannelUpdate_set_signature(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelUpdate_get_contents(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelUpdate_set_contents(uint32_t this_ptr, uint32_t val) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedChannelUpdate val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = UnsignedChannelUpdate_clone(&val_conv);
	ChannelUpdate_set_contents(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelUpdate_new(int8_tArray signature_arg, uint32_t contents_arg) {
	LDKSignature signature_arg_ref;
	CHECK(*((uint32_t*)signature_arg) == 64);
	memcpy(signature_arg_ref.compact_form, (uint8_t*)(signature_arg + 4), 64);
	LDKUnsignedChannelUpdate contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
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

void  __attribute__((visibility("default"))) TS_QueryChannelRange_free(uint32_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	QueryChannelRange_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_QueryChannelRange_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_QueryChannelRange_get_chain_hash(uint32_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *QueryChannelRange_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_QueryChannelRange_set_chain_hash(uint32_t this_ptr, int8_tArray val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	QueryChannelRange_set_chain_hash(&this_ptr_conv, val_ref);
}

int32_t  __attribute__((visibility("default"))) TS_QueryChannelRange_get_first_blocknum(uint32_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = QueryChannelRange_get_first_blocknum(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_QueryChannelRange_set_first_blocknum(uint32_t this_ptr, int32_t val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	QueryChannelRange_set_first_blocknum(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_QueryChannelRange_get_number_of_blocks(uint32_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = QueryChannelRange_get_number_of_blocks(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_QueryChannelRange_set_number_of_blocks(uint32_t this_ptr, int32_t val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	QueryChannelRange_set_number_of_blocks(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_QueryChannelRange_new(int8_tArray chain_hash_arg, int32_t first_blocknum_arg, int32_t number_of_blocks_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK(*((uint32_t*)chain_hash_arg) == 32);
	memcpy(chain_hash_arg_ref.data, (uint8_t*)(chain_hash_arg + 4), 32);
	LDKQueryChannelRange ret_var = QueryChannelRange_new(chain_hash_arg_ref, first_blocknum_arg, number_of_blocks_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_ReplyChannelRange_free(uint32_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyChannelRange_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ReplyChannelRange_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_ReplyChannelRange_get_chain_hash(uint32_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *ReplyChannelRange_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_ReplyChannelRange_set_chain_hash(uint32_t this_ptr, int8_tArray val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	ReplyChannelRange_set_chain_hash(&this_ptr_conv, val_ref);
}

int32_t  __attribute__((visibility("default"))) TS_ReplyChannelRange_get_first_blocknum(uint32_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ReplyChannelRange_get_first_blocknum(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ReplyChannelRange_set_first_blocknum(uint32_t this_ptr, int32_t val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyChannelRange_set_first_blocknum(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_ReplyChannelRange_get_number_of_blocks(uint32_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ReplyChannelRange_get_number_of_blocks(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ReplyChannelRange_set_number_of_blocks(uint32_t this_ptr, int32_t val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyChannelRange_set_number_of_blocks(&this_ptr_conv, val);
}

jboolean  __attribute__((visibility("default"))) TS_ReplyChannelRange_get_full_information(uint32_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ReplyChannelRange_get_full_information(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ReplyChannelRange_set_full_information(uint32_t this_ptr, jboolean val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyChannelRange_set_full_information(&this_ptr_conv, val);
}

void  __attribute__((visibility("default"))) TS_ReplyChannelRange_set_short_channel_ids(uint32_t this_ptr, int64_tArray val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u64Z val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (int64_t*)(val + 4);
	for (size_t i = 0; i < val_constr.datalen; i++) {
		int64_t arr_conv_8 = val_vals[i];
		val_constr.data[i] = arr_conv_8;
	}
	ReplyChannelRange_set_short_channel_ids(&this_ptr_conv, val_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_ReplyChannelRange_new(int8_tArray chain_hash_arg, int32_t first_blocknum_arg, int32_t number_of_blocks_arg, jboolean full_information_arg, int64_tArray short_channel_ids_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK(*((uint32_t*)chain_hash_arg) == 32);
	memcpy(chain_hash_arg_ref.data, (uint8_t*)(chain_hash_arg + 4), 32);
	LDKCVec_u64Z short_channel_ids_arg_constr;
	short_channel_ids_arg_constr.datalen = *((uint32_t*)short_channel_ids_arg);
	if (short_channel_ids_arg_constr.datalen > 0)
		short_channel_ids_arg_constr.data = MALLOC(short_channel_ids_arg_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		short_channel_ids_arg_constr.data = NULL;
	int64_t* short_channel_ids_arg_vals = (int64_t*)(short_channel_ids_arg + 4);
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

void  __attribute__((visibility("default"))) TS_QueryShortChannelIds_free(uint32_t this_ptr) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	QueryShortChannelIds_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_QueryShortChannelIds_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_QueryShortChannelIds_get_chain_hash(uint32_t this_ptr) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *QueryShortChannelIds_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_QueryShortChannelIds_set_chain_hash(uint32_t this_ptr, int8_tArray val) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	QueryShortChannelIds_set_chain_hash(&this_ptr_conv, val_ref);
}

void  __attribute__((visibility("default"))) TS_QueryShortChannelIds_set_short_channel_ids(uint32_t this_ptr, int64_tArray val) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u64Z val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (int64_t*)(val + 4);
	for (size_t i = 0; i < val_constr.datalen; i++) {
		int64_t arr_conv_8 = val_vals[i];
		val_constr.data[i] = arr_conv_8;
	}
	QueryShortChannelIds_set_short_channel_ids(&this_ptr_conv, val_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_QueryShortChannelIds_new(int8_tArray chain_hash_arg, int64_tArray short_channel_ids_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK(*((uint32_t*)chain_hash_arg) == 32);
	memcpy(chain_hash_arg_ref.data, (uint8_t*)(chain_hash_arg + 4), 32);
	LDKCVec_u64Z short_channel_ids_arg_constr;
	short_channel_ids_arg_constr.datalen = *((uint32_t*)short_channel_ids_arg);
	if (short_channel_ids_arg_constr.datalen > 0)
		short_channel_ids_arg_constr.data = MALLOC(short_channel_ids_arg_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		short_channel_ids_arg_constr.data = NULL;
	int64_t* short_channel_ids_arg_vals = (int64_t*)(short_channel_ids_arg + 4);
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

void  __attribute__((visibility("default"))) TS_ReplyShortChannelIdsEnd_free(uint32_t this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyShortChannelIdsEnd_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ReplyShortChannelIdsEnd_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_ReplyShortChannelIdsEnd_get_chain_hash(uint32_t this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *ReplyShortChannelIdsEnd_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_ReplyShortChannelIdsEnd_set_chain_hash(uint32_t this_ptr, int8_tArray val) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	ReplyShortChannelIdsEnd_set_chain_hash(&this_ptr_conv, val_ref);
}

jboolean  __attribute__((visibility("default"))) TS_ReplyShortChannelIdsEnd_get_full_information(uint32_t this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ReplyShortChannelIdsEnd_get_full_information(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ReplyShortChannelIdsEnd_set_full_information(uint32_t this_ptr, jboolean val) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyShortChannelIdsEnd_set_full_information(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_ReplyShortChannelIdsEnd_new(int8_tArray chain_hash_arg, jboolean full_information_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK(*((uint32_t*)chain_hash_arg) == 32);
	memcpy(chain_hash_arg_ref.data, (uint8_t*)(chain_hash_arg + 4), 32);
	LDKReplyShortChannelIdsEnd ret_var = ReplyShortChannelIdsEnd_new(chain_hash_arg_ref, full_information_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_GossipTimestampFilter_free(uint32_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	GossipTimestampFilter_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_GossipTimestampFilter_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_GossipTimestampFilter_get_chain_hash(uint32_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *GossipTimestampFilter_get_chain_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_GossipTimestampFilter_set_chain_hash(uint32_t this_ptr, int8_tArray val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	GossipTimestampFilter_set_chain_hash(&this_ptr_conv, val_ref);
}

int32_t  __attribute__((visibility("default"))) TS_GossipTimestampFilter_get_first_timestamp(uint32_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = GossipTimestampFilter_get_first_timestamp(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_GossipTimestampFilter_set_first_timestamp(uint32_t this_ptr, int32_t val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	GossipTimestampFilter_set_first_timestamp(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_GossipTimestampFilter_get_timestamp_range(uint32_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = GossipTimestampFilter_get_timestamp_range(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_GossipTimestampFilter_set_timestamp_range(uint32_t this_ptr, int32_t val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	GossipTimestampFilter_set_timestamp_range(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_GossipTimestampFilter_new(int8_tArray chain_hash_arg, int32_t first_timestamp_arg, int32_t timestamp_range_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK(*((uint32_t*)chain_hash_arg) == 32);
	memcpy(chain_hash_arg_ref.data, (uint8_t*)(chain_hash_arg + 4), 32);
	LDKGossipTimestampFilter ret_var = GossipTimestampFilter_new(chain_hash_arg_ref, first_timestamp_arg, timestamp_range_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_ErrorAction_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKErrorAction this_ptr_conv = *(LDKErrorAction*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	ErrorAction_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ErrorAction_clone(uint32_t orig) {
	LDKErrorAction* orig_conv = (LDKErrorAction*)orig;
	LDKErrorAction *ret_copy = MALLOC(sizeof(LDKErrorAction), "LDKErrorAction");
	*ret_copy = ErrorAction_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_LightningError_free(uint32_t this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LightningError_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_LightningError_clone(uint32_t orig) {
	LDKLightningError orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKLightningError ret_var = LightningError_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

jstring  __attribute__((visibility("default"))) TS_LightningError_get_err(uint32_t this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKStr _str = LightningError_get_err(&this_ptr_conv);
	jstring _conv = str_ref_to_ts(_str.chars, _str.len);
	return _conv;
}

void  __attribute__((visibility("default"))) TS_LightningError_set_err(uint32_t this_ptr, int8_tArray val) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u8Z val_ref;
	val_ref.datalen = *((uint32_t*)val);
	val_ref.data = MALLOC(val_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(val_ref.data, (uint8_t*)(val + 4), val_ref.datalen);
	LightningError_set_err(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_LightningError_get_action(uint32_t this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKErrorAction *ret_copy = MALLOC(sizeof(LDKErrorAction), "LDKErrorAction");
	*ret_copy = LightningError_get_action(&this_ptr_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_LightningError_set_action(uint32_t this_ptr, uint32_t val) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKErrorAction val_conv = *(LDKErrorAction*)(((uint64_t)val) & ~1);
	FREE((void*)val);
	LightningError_set_action(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_LightningError_new(int8_tArray err_arg, uint32_t action_arg) {
	LDKCVec_u8Z err_arg_ref;
	err_arg_ref.datalen = *((uint32_t*)err_arg);
	err_arg_ref.data = MALLOC(err_arg_ref.datalen, "LDKCVec_u8Z Bytes");
	memcpy(err_arg_ref.data, (uint8_t*)(err_arg + 4), err_arg_ref.datalen);
	LDKErrorAction action_arg_conv = *(LDKErrorAction*)(((uint64_t)action_arg) & ~1);
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

void  __attribute__((visibility("default"))) TS_CommitmentUpdate_free(uint32_t this_ptr) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentUpdate_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CommitmentUpdate_clone(uint32_t orig) {
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

void  __attribute__((visibility("default"))) TS_CommitmentUpdate_set_update_add_htlcs(uint32_t this_ptr, uint32_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateAddHTLCZ val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val + 4);
	for (size_t p = 0; p < val_constr.datalen; p++) {
		uint32_t arr_conv_15 = val_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		arr_conv_15_conv = UpdateAddHTLC_clone(&arr_conv_15_conv);
		val_constr.data[p] = arr_conv_15_conv;
	}
	CommitmentUpdate_set_update_add_htlcs(&this_ptr_conv, val_constr);
}

void  __attribute__((visibility("default"))) TS_CommitmentUpdate_set_update_fulfill_htlcs(uint32_t this_ptr, uint32_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateFulfillHTLCZ val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val + 4);
	for (size_t t = 0; t < val_constr.datalen; t++) {
		uint32_t arr_conv_19 = val_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		arr_conv_19_conv = UpdateFulfillHTLC_clone(&arr_conv_19_conv);
		val_constr.data[t] = arr_conv_19_conv;
	}
	CommitmentUpdate_set_update_fulfill_htlcs(&this_ptr_conv, val_constr);
}

void  __attribute__((visibility("default"))) TS_CommitmentUpdate_set_update_fail_htlcs(uint32_t this_ptr, uint32_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateFailHTLCZ val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val + 4);
	for (size_t q = 0; q < val_constr.datalen; q++) {
		uint32_t arr_conv_16 = val_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		arr_conv_16_conv = UpdateFailHTLC_clone(&arr_conv_16_conv);
		val_constr.data[q] = arr_conv_16_conv;
	}
	CommitmentUpdate_set_update_fail_htlcs(&this_ptr_conv, val_constr);
}

void  __attribute__((visibility("default"))) TS_CommitmentUpdate_set_update_fail_malformed_htlcs(uint32_t this_ptr, uint32_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateFailMalformedHTLCZ val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val + 4);
	for (size_t z = 0; z < val_constr.datalen; z++) {
		uint32_t arr_conv_25 = val_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		arr_conv_25_conv = UpdateFailMalformedHTLC_clone(&arr_conv_25_conv);
		val_constr.data[z] = arr_conv_25_conv;
	}
	CommitmentUpdate_set_update_fail_malformed_htlcs(&this_ptr_conv, val_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_CommitmentUpdate_get_update_fee(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_CommitmentUpdate_set_update_fee(uint32_t this_ptr, uint32_t val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUpdateFee val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = UpdateFee_clone(&val_conv);
	CommitmentUpdate_set_update_fee(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CommitmentUpdate_get_commitment_signed(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_CommitmentUpdate_set_commitment_signed(uint32_t this_ptr, uint32_t val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCommitmentSigned val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = CommitmentSigned_clone(&val_conv);
	CommitmentUpdate_set_commitment_signed(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CommitmentUpdate_new(uint32_tArray update_add_htlcs_arg, uint32_tArray update_fulfill_htlcs_arg, uint32_tArray update_fail_htlcs_arg, uint32_tArray update_fail_malformed_htlcs_arg, uint32_t update_fee_arg, uint32_t commitment_signed_arg) {
	LDKCVec_UpdateAddHTLCZ update_add_htlcs_arg_constr;
	update_add_htlcs_arg_constr.datalen = *((uint32_t*)update_add_htlcs_arg);
	if (update_add_htlcs_arg_constr.datalen > 0)
		update_add_htlcs_arg_constr.data = MALLOC(update_add_htlcs_arg_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		update_add_htlcs_arg_constr.data = NULL;
	uint32_t* update_add_htlcs_arg_vals = (uint32_t*)(update_add_htlcs_arg + 4);
	for (size_t p = 0; p < update_add_htlcs_arg_constr.datalen; p++) {
		uint32_t arr_conv_15 = update_add_htlcs_arg_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		arr_conv_15_conv = UpdateAddHTLC_clone(&arr_conv_15_conv);
		update_add_htlcs_arg_constr.data[p] = arr_conv_15_conv;
	}
	LDKCVec_UpdateFulfillHTLCZ update_fulfill_htlcs_arg_constr;
	update_fulfill_htlcs_arg_constr.datalen = *((uint32_t*)update_fulfill_htlcs_arg);
	if (update_fulfill_htlcs_arg_constr.datalen > 0)
		update_fulfill_htlcs_arg_constr.data = MALLOC(update_fulfill_htlcs_arg_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		update_fulfill_htlcs_arg_constr.data = NULL;
	uint32_t* update_fulfill_htlcs_arg_vals = (uint32_t*)(update_fulfill_htlcs_arg + 4);
	for (size_t t = 0; t < update_fulfill_htlcs_arg_constr.datalen; t++) {
		uint32_t arr_conv_19 = update_fulfill_htlcs_arg_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		arr_conv_19_conv = UpdateFulfillHTLC_clone(&arr_conv_19_conv);
		update_fulfill_htlcs_arg_constr.data[t] = arr_conv_19_conv;
	}
	LDKCVec_UpdateFailHTLCZ update_fail_htlcs_arg_constr;
	update_fail_htlcs_arg_constr.datalen = *((uint32_t*)update_fail_htlcs_arg);
	if (update_fail_htlcs_arg_constr.datalen > 0)
		update_fail_htlcs_arg_constr.data = MALLOC(update_fail_htlcs_arg_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		update_fail_htlcs_arg_constr.data = NULL;
	uint32_t* update_fail_htlcs_arg_vals = (uint32_t*)(update_fail_htlcs_arg + 4);
	for (size_t q = 0; q < update_fail_htlcs_arg_constr.datalen; q++) {
		uint32_t arr_conv_16 = update_fail_htlcs_arg_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		arr_conv_16_conv = UpdateFailHTLC_clone(&arr_conv_16_conv);
		update_fail_htlcs_arg_constr.data[q] = arr_conv_16_conv;
	}
	LDKCVec_UpdateFailMalformedHTLCZ update_fail_malformed_htlcs_arg_constr;
	update_fail_malformed_htlcs_arg_constr.datalen = *((uint32_t*)update_fail_malformed_htlcs_arg);
	if (update_fail_malformed_htlcs_arg_constr.datalen > 0)
		update_fail_malformed_htlcs_arg_constr.data = MALLOC(update_fail_malformed_htlcs_arg_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		update_fail_malformed_htlcs_arg_constr.data = NULL;
	uint32_t* update_fail_malformed_htlcs_arg_vals = (uint32_t*)(update_fail_malformed_htlcs_arg + 4);
	for (size_t z = 0; z < update_fail_malformed_htlcs_arg_constr.datalen; z++) {
		uint32_t arr_conv_25 = update_fail_malformed_htlcs_arg_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		arr_conv_25_conv = UpdateFailMalformedHTLC_clone(&arr_conv_25_conv);
		update_fail_malformed_htlcs_arg_constr.data[z] = arr_conv_25_conv;
	}
	LDKUpdateFee update_fee_arg_conv;
	update_fee_arg_conv.inner = (void*)(update_fee_arg & (~1));
	update_fee_arg_conv.is_owned = (update_fee_arg & 1) || (update_fee_arg == 0);
	update_fee_arg_conv = UpdateFee_clone(&update_fee_arg_conv);
	LDKCommitmentSigned commitment_signed_arg_conv;
	commitment_signed_arg_conv.inner = (void*)(commitment_signed_arg & (~1));
	commitment_signed_arg_conv.is_owned = (commitment_signed_arg & 1) || (commitment_signed_arg == 0);
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

void  __attribute__((visibility("default"))) TS_HTLCFailChannelUpdate_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKHTLCFailChannelUpdate this_ptr_conv = *(LDKHTLCFailChannelUpdate*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	HTLCFailChannelUpdate_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_HTLCFailChannelUpdate_clone(uint32_t orig) {
	LDKHTLCFailChannelUpdate* orig_conv = (LDKHTLCFailChannelUpdate*)orig;
	LDKHTLCFailChannelUpdate *ret_copy = MALLOC(sizeof(LDKHTLCFailChannelUpdate), "LDKHTLCFailChannelUpdate");
	*ret_copy = HTLCFailChannelUpdate_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_ChannelMessageHandler_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKChannelMessageHandler this_ptr_conv = *(LDKChannelMessageHandler*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	ChannelMessageHandler_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_RoutingMessageHandler_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKRoutingMessageHandler this_ptr_conv = *(LDKRoutingMessageHandler*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	RoutingMessageHandler_free(this_ptr_conv);
}

int8_tArray  __attribute__((visibility("default"))) TS_AcceptChannel_write(uint32_t obj) {
	LDKAcceptChannel obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = AcceptChannel_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_AcceptChannel_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKAcceptChannel ret_var = AcceptChannel_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_AnnouncementSignatures_write(uint32_t obj) {
	LDKAnnouncementSignatures obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = AnnouncementSignatures_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_AnnouncementSignatures_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKAnnouncementSignatures ret_var = AnnouncementSignatures_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelReestablish_write(uint32_t obj) {
	LDKChannelReestablish obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelReestablish_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelReestablish_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_ChannelReestablishDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelReestablishDecodeErrorZ), "LDKCResult_ChannelReestablishDecodeErrorZ");
	*ret_conv = ChannelReestablish_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_ClosingSigned_write(uint32_t obj) {
	LDKClosingSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ClosingSigned_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ClosingSigned_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKClosingSigned ret_var = ClosingSigned_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_CommitmentSigned_write(uint32_t obj) {
	LDKCommitmentSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = CommitmentSigned_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_CommitmentSigned_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCommitmentSigned ret_var = CommitmentSigned_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_FundingCreated_write(uint32_t obj) {
	LDKFundingCreated obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = FundingCreated_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_FundingCreated_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKFundingCreated ret_var = FundingCreated_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_FundingSigned_write(uint32_t obj) {
	LDKFundingSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = FundingSigned_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_FundingSigned_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKFundingSigned ret_var = FundingSigned_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_FundingLocked_write(uint32_t obj) {
	LDKFundingLocked obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = FundingLocked_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_FundingLocked_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKFundingLocked ret_var = FundingLocked_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_Init_write(uint32_t obj) {
	LDKInit obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Init_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_Init_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_InitDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InitDecodeErrorZ), "LDKCResult_InitDecodeErrorZ");
	*ret_conv = Init_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_OpenChannel_write(uint32_t obj) {
	LDKOpenChannel obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = OpenChannel_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_OpenChannel_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKOpenChannel ret_var = OpenChannel_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_RevokeAndACK_write(uint32_t obj) {
	LDKRevokeAndACK obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = RevokeAndACK_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_RevokeAndACK_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKRevokeAndACK ret_var = RevokeAndACK_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_Shutdown_write(uint32_t obj) {
	LDKShutdown obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Shutdown_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_Shutdown_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKShutdown ret_var = Shutdown_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_UpdateFailHTLC_write(uint32_t obj) {
	LDKUpdateFailHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFailHTLC_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateFailHTLC_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKUpdateFailHTLC ret_var = UpdateFailHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_UpdateFailMalformedHTLC_write(uint32_t obj) {
	LDKUpdateFailMalformedHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFailMalformedHTLC_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateFailMalformedHTLC_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKUpdateFailMalformedHTLC ret_var = UpdateFailMalformedHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_UpdateFee_write(uint32_t obj) {
	LDKUpdateFee obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFee_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateFee_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKUpdateFee ret_var = UpdateFee_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_write(uint32_t obj) {
	LDKUpdateFulfillHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFulfillHTLC_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateFulfillHTLC_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKUpdateFulfillHTLC ret_var = UpdateFulfillHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_UpdateAddHTLC_write(uint32_t obj) {
	LDKUpdateAddHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateAddHTLC_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_UpdateAddHTLC_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKUpdateAddHTLC ret_var = UpdateAddHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_Ping_write(uint32_t obj) {
	LDKPing obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Ping_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_Ping_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_PingDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PingDecodeErrorZ), "LDKCResult_PingDecodeErrorZ");
	*ret_conv = Ping_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_Pong_write(uint32_t obj) {
	LDKPong obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Pong_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_Pong_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_PongDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PongDecodeErrorZ), "LDKCResult_PongDecodeErrorZ");
	*ret_conv = Pong_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_write(uint32_t obj) {
	LDKUnsignedChannelAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UnsignedChannelAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_UnsignedChannelAnnouncement_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ), "LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ");
	*ret_conv = UnsignedChannelAnnouncement_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelAnnouncement_write(uint32_t obj) {
	LDKChannelAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelAnnouncement_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKChannelAnnouncement ret_var = ChannelAnnouncement_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_write(uint32_t obj) {
	LDKUnsignedChannelUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UnsignedChannelUpdate_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_UnsignedChannelUpdate_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelUpdateDecodeErrorZ), "LDKCResult_UnsignedChannelUpdateDecodeErrorZ");
	*ret_conv = UnsignedChannelUpdate_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelUpdate_write(uint32_t obj) {
	LDKChannelUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelUpdate_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelUpdate_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKChannelUpdate ret_var = ChannelUpdate_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_ErrorMessage_write(uint32_t obj) {
	LDKErrorMessage obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ErrorMessage_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ErrorMessage_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_ErrorMessageDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ErrorMessageDecodeErrorZ), "LDKCResult_ErrorMessageDecodeErrorZ");
	*ret_conv = ErrorMessage_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_write(uint32_t obj) {
	LDKUnsignedNodeAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UnsignedNodeAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_UnsignedNodeAnnouncement_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ), "LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ");
	*ret_conv = UnsignedNodeAnnouncement_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_NodeAnnouncement_write(uint32_t obj) {
	LDKNodeAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NodeAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_NodeAnnouncement_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKNodeAnnouncement ret_var = NodeAnnouncement_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_QueryShortChannelIds_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_QueryShortChannelIdsDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryShortChannelIdsDecodeErrorZ), "LDKCResult_QueryShortChannelIdsDecodeErrorZ");
	*ret_conv = QueryShortChannelIds_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_QueryShortChannelIds_write(uint32_t obj) {
	LDKQueryShortChannelIds obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = QueryShortChannelIds_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ReplyShortChannelIdsEnd_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ), "LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ");
	*ret_conv = ReplyShortChannelIdsEnd_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_ReplyShortChannelIdsEnd_write(uint32_t obj) {
	LDKReplyShortChannelIdsEnd obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ReplyShortChannelIdsEnd_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_QueryChannelRange_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_QueryChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryChannelRangeDecodeErrorZ), "LDKCResult_QueryChannelRangeDecodeErrorZ");
	*ret_conv = QueryChannelRange_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_QueryChannelRange_write(uint32_t obj) {
	LDKQueryChannelRange obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = QueryChannelRange_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ReplyChannelRange_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_ReplyChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyChannelRangeDecodeErrorZ), "LDKCResult_ReplyChannelRangeDecodeErrorZ");
	*ret_conv = ReplyChannelRange_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_ReplyChannelRange_write(uint32_t obj) {
	LDKReplyChannelRange obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ReplyChannelRange_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_GossipTimestampFilter_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_GossipTimestampFilterDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_GossipTimestampFilterDecodeErrorZ), "LDKCResult_GossipTimestampFilterDecodeErrorZ");
	*ret_conv = GossipTimestampFilter_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_GossipTimestampFilter_write(uint32_t obj) {
	LDKGossipTimestampFilter obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = GossipTimestampFilter_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_MessageHandler_free(uint32_t this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MessageHandler_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_MessageHandler_get_chan_handler(uint32_t this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)MessageHandler_get_chan_handler(&this_ptr_conv);
	return ret_ret;
}

void  __attribute__((visibility("default"))) TS_MessageHandler_set_chan_handler(uint32_t this_ptr, uint32_t val) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelMessageHandler val_conv = *(LDKChannelMessageHandler*)(((uint64_t)val) & ~1);
	MessageHandler_set_chan_handler(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_MessageHandler_get_route_handler(uint32_t this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)MessageHandler_get_route_handler(&this_ptr_conv);
	return ret_ret;
}

void  __attribute__((visibility("default"))) TS_MessageHandler_set_route_handler(uint32_t this_ptr, uint32_t val) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingMessageHandler val_conv = *(LDKRoutingMessageHandler*)(((uint64_t)val) & ~1);
	MessageHandler_set_route_handler(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_MessageHandler_new(uint32_t chan_handler_arg, uint32_t route_handler_arg) {
	LDKChannelMessageHandler chan_handler_arg_conv = *(LDKChannelMessageHandler*)(((uint64_t)chan_handler_arg) & ~1);
	LDKRoutingMessageHandler route_handler_arg_conv = *(LDKRoutingMessageHandler*)(((uint64_t)route_handler_arg) & ~1);
	LDKMessageHandler ret_var = MessageHandler_new(chan_handler_arg_conv, route_handler_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_SocketDescriptor_clone(uint32_t orig) {
	LDKSocketDescriptor* orig_conv = (LDKSocketDescriptor*)orig;
	LDKSocketDescriptor* ret = MALLOC(sizeof(LDKSocketDescriptor), "LDKSocketDescriptor");
	*ret = SocketDescriptor_clone(orig_conv);
	return (long)ret;
}

void  __attribute__((visibility("default"))) TS_SocketDescriptor_free(uint32_t this_ptr) {
	if ((this_ptr & 1) != 0) return;
	LDKSocketDescriptor this_ptr_conv = *(LDKSocketDescriptor*)(((uint64_t)this_ptr) & ~1);
	FREE((void*)this_ptr);
	SocketDescriptor_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_PeerHandleError_free(uint32_t this_ptr) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PeerHandleError_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_PeerHandleError_clone(uint32_t orig) {
	LDKPeerHandleError orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKPeerHandleError ret_var = PeerHandleError_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

jboolean  __attribute__((visibility("default"))) TS_PeerHandleError_get_no_connection_possible(uint32_t this_ptr) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = PeerHandleError_get_no_connection_possible(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_PeerHandleError_set_no_connection_possible(uint32_t this_ptr, jboolean val) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	PeerHandleError_set_no_connection_possible(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_PeerHandleError_new(jboolean no_connection_possible_arg) {
	LDKPeerHandleError ret_var = PeerHandleError_new(no_connection_possible_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_PeerManager_free(uint32_t this_ptr) {
	LDKPeerManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PeerManager_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_PeerManager_new(uint32_t message_handler, int8_tArray our_node_secret, int8_tArray ephemeral_random_data, uint32_t logger) {
	LDKMessageHandler message_handler_conv;
	message_handler_conv.inner = (void*)(message_handler & (~1));
	message_handler_conv.is_owned = (message_handler & 1) || (message_handler == 0);
	// Warning: we need a move here but no clone is available for LDKMessageHandler
	LDKSecretKey our_node_secret_ref;
	CHECK(*((uint32_t*)our_node_secret) == 32);
	memcpy(our_node_secret_ref.bytes, (uint8_t*)(our_node_secret + 4), 32);
	unsigned char ephemeral_random_data_arr[32];
	CHECK(*((uint32_t*)ephemeral_random_data) == 32);
	memcpy(ephemeral_random_data_arr, (uint8_t*)(ephemeral_random_data + 4), 32);
	unsigned char (*ephemeral_random_data_ref)[32] = &ephemeral_random_data_arr;
	LDKLogger logger_conv = *(LDKLogger*)(((uint64_t)logger) & ~1);
	LDKPeerManager ret_var = PeerManager_new(message_handler_conv, our_node_secret_ref, ephemeral_random_data_ref, logger_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

ptrArray  __attribute__((visibility("default"))) TS_PeerManager_get_peer_node_ids(uint32_t this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_PublicKeyZ ret_var = PeerManager_get_peer_node_ids(&this_arg_conv);
	ptrArray ret_arr = init_arr(ret_var.datalen, sizeof(uint32_t), "Native ptrArray Bytes");
	int8_tArray *ret_arr_ptr = (int8_tArray*)(ret_arr + 4);
	for (size_t m = 0; m < ret_var.datalen; m++) {
		int8_tArray arr_conv_12_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
		memcpy((uint8_t*)(arr_conv_12_arr + 4), ret_var.data[m].compressed_form, 33);
		ret_arr_ptr[m] = arr_conv_12_arr;
	}
	FREE(ret_var.data);
	return ret_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_PeerManager_new_outbound_connection(uint32_t this_arg, int8_tArray their_node_id, uint32_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKPublicKey their_node_id_ref;
	CHECK(*((uint32_t*)their_node_id) == 33);
	memcpy(their_node_id_ref.compressed_form, (uint8_t*)(their_node_id + 4), 33);
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)(((uint64_t)descriptor) & ~1);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret_conv = PeerManager_new_outbound_connection(&this_arg_conv, their_node_id_ref, descriptor_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_PeerManager_new_inbound_connection(uint32_t this_arg, uint32_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)(((uint64_t)descriptor) & ~1);
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = PeerManager_new_inbound_connection(&this_arg_conv, descriptor_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_PeerManager_write_buffer_space_avail(uint32_t this_arg, uint32_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = PeerManager_write_buffer_space_avail(&this_arg_conv, descriptor_conv);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_PeerManager_read_event(uint32_t this_arg, uint32_t peer_descriptor, int8_tArray data) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor* peer_descriptor_conv = (LDKSocketDescriptor*)peer_descriptor;
	LDKu8slice data_ref;
	data_ref.datalen = *((uint32_t*)data);
	data_ref.data = (int8_t*)(data + 4);
	LDKCResult_boolPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret_conv = PeerManager_read_event(&this_arg_conv, peer_descriptor_conv, data_ref);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_PeerManager_process_events(uint32_t this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	PeerManager_process_events(&this_arg_conv);
}

void  __attribute__((visibility("default"))) TS_PeerManager_socket_disconnected(uint32_t this_arg, uint32_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	PeerManager_socket_disconnected(&this_arg_conv, descriptor_conv);
}

void  __attribute__((visibility("default"))) TS_PeerManager_timer_tick_occured(uint32_t this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	PeerManager_timer_tick_occured(&this_arg_conv);
}

int8_tArray  __attribute__((visibility("default"))) TS_build_commitment_secret(int8_tArray commitment_seed, int64_t idx) {
	unsigned char commitment_seed_arr[32];
	CHECK(*((uint32_t*)commitment_seed) == 32);
	memcpy(commitment_seed_arr, (uint8_t*)(commitment_seed + 4), 32);
	unsigned char (*commitment_seed_ref)[32] = &commitment_seed_arr;
	int8_tArray arg_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), build_commitment_secret(commitment_seed_ref, idx).data, 32);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_derive_private_key(int8_tArray per_commitment_point, int8_tArray base_secret) {
	LDKPublicKey per_commitment_point_ref;
	CHECK(*((uint32_t*)per_commitment_point) == 33);
	memcpy(per_commitment_point_ref.compressed_form, (uint8_t*)(per_commitment_point + 4), 33);
	unsigned char base_secret_arr[32];
	CHECK(*((uint32_t*)base_secret) == 32);
	memcpy(base_secret_arr, (uint8_t*)(base_secret + 4), 32);
	unsigned char (*base_secret_ref)[32] = &base_secret_arr;
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = derive_private_key(per_commitment_point_ref, base_secret_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_derive_public_key(int8_tArray per_commitment_point, int8_tArray base_point) {
	LDKPublicKey per_commitment_point_ref;
	CHECK(*((uint32_t*)per_commitment_point) == 33);
	memcpy(per_commitment_point_ref.compressed_form, (uint8_t*)(per_commitment_point + 4), 33);
	LDKPublicKey base_point_ref;
	CHECK(*((uint32_t*)base_point) == 33);
	memcpy(base_point_ref.compressed_form, (uint8_t*)(base_point + 4), 33);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = derive_public_key(per_commitment_point_ref, base_point_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_derive_private_revocation_key(int8_tArray per_commitment_secret, int8_tArray countersignatory_revocation_base_secret) {
	unsigned char per_commitment_secret_arr[32];
	CHECK(*((uint32_t*)per_commitment_secret) == 32);
	memcpy(per_commitment_secret_arr, (uint8_t*)(per_commitment_secret + 4), 32);
	unsigned char (*per_commitment_secret_ref)[32] = &per_commitment_secret_arr;
	unsigned char countersignatory_revocation_base_secret_arr[32];
	CHECK(*((uint32_t*)countersignatory_revocation_base_secret) == 32);
	memcpy(countersignatory_revocation_base_secret_arr, (uint8_t*)(countersignatory_revocation_base_secret + 4), 32);
	unsigned char (*countersignatory_revocation_base_secret_ref)[32] = &countersignatory_revocation_base_secret_arr;
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = derive_private_revocation_key(per_commitment_secret_ref, countersignatory_revocation_base_secret_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_derive_public_revocation_key(int8_tArray per_commitment_point, int8_tArray countersignatory_revocation_base_point) {
	LDKPublicKey per_commitment_point_ref;
	CHECK(*((uint32_t*)per_commitment_point) == 33);
	memcpy(per_commitment_point_ref.compressed_form, (uint8_t*)(per_commitment_point + 4), 33);
	LDKPublicKey countersignatory_revocation_base_point_ref;
	CHECK(*((uint32_t*)countersignatory_revocation_base_point) == 33);
	memcpy(countersignatory_revocation_base_point_ref.compressed_form, (uint8_t*)(countersignatory_revocation_base_point + 4), 33);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = derive_public_revocation_key(per_commitment_point_ref, countersignatory_revocation_base_point_ref);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_TxCreationKeys_free(uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	TxCreationKeys_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_TxCreationKeys_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_TxCreationKeys_get_per_commitment_point(uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), TxCreationKeys_get_per_commitment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_TxCreationKeys_set_per_commitment_point(uint32_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	TxCreationKeys_set_per_commitment_point(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_TxCreationKeys_get_revocation_key(uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), TxCreationKeys_get_revocation_key(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_TxCreationKeys_set_revocation_key(uint32_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	TxCreationKeys_set_revocation_key(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_TxCreationKeys_get_broadcaster_htlc_key(uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), TxCreationKeys_get_broadcaster_htlc_key(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_TxCreationKeys_set_broadcaster_htlc_key(uint32_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	TxCreationKeys_set_broadcaster_htlc_key(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_TxCreationKeys_get_countersignatory_htlc_key(uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), TxCreationKeys_get_countersignatory_htlc_key(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_TxCreationKeys_set_countersignatory_htlc_key(uint32_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	TxCreationKeys_set_countersignatory_htlc_key(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_TxCreationKeys_get_broadcaster_delayed_payment_key(uint32_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), TxCreationKeys_get_broadcaster_delayed_payment_key(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_TxCreationKeys_set_broadcaster_delayed_payment_key(uint32_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	TxCreationKeys_set_broadcaster_delayed_payment_key(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_TxCreationKeys_new(int8_tArray per_commitment_point_arg, int8_tArray revocation_key_arg, int8_tArray broadcaster_htlc_key_arg, int8_tArray countersignatory_htlc_key_arg, int8_tArray broadcaster_delayed_payment_key_arg) {
	LDKPublicKey per_commitment_point_arg_ref;
	CHECK(*((uint32_t*)per_commitment_point_arg) == 33);
	memcpy(per_commitment_point_arg_ref.compressed_form, (uint8_t*)(per_commitment_point_arg + 4), 33);
	LDKPublicKey revocation_key_arg_ref;
	CHECK(*((uint32_t*)revocation_key_arg) == 33);
	memcpy(revocation_key_arg_ref.compressed_form, (uint8_t*)(revocation_key_arg + 4), 33);
	LDKPublicKey broadcaster_htlc_key_arg_ref;
	CHECK(*((uint32_t*)broadcaster_htlc_key_arg) == 33);
	memcpy(broadcaster_htlc_key_arg_ref.compressed_form, (uint8_t*)(broadcaster_htlc_key_arg + 4), 33);
	LDKPublicKey countersignatory_htlc_key_arg_ref;
	CHECK(*((uint32_t*)countersignatory_htlc_key_arg) == 33);
	memcpy(countersignatory_htlc_key_arg_ref.compressed_form, (uint8_t*)(countersignatory_htlc_key_arg + 4), 33);
	LDKPublicKey broadcaster_delayed_payment_key_arg_ref;
	CHECK(*((uint32_t*)broadcaster_delayed_payment_key_arg) == 33);
	memcpy(broadcaster_delayed_payment_key_arg_ref.compressed_form, (uint8_t*)(broadcaster_delayed_payment_key_arg + 4), 33);
	LDKTxCreationKeys ret_var = TxCreationKeys_new(per_commitment_point_arg_ref, revocation_key_arg_ref, broadcaster_htlc_key_arg_ref, countersignatory_htlc_key_arg_ref, broadcaster_delayed_payment_key_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_TxCreationKeys_write(uint32_t obj) {
	LDKTxCreationKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = TxCreationKeys_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_TxCreationKeys_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKTxCreationKeys ret_var = TxCreationKeys_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_ChannelPublicKeys_free(uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelPublicKeys_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelPublicKeys_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_ChannelPublicKeys_get_funding_pubkey(uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelPublicKeys_get_funding_pubkey(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelPublicKeys_set_funding_pubkey(uint32_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	ChannelPublicKeys_set_funding_pubkey(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelPublicKeys_get_revocation_basepoint(uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelPublicKeys_get_revocation_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelPublicKeys_set_revocation_basepoint(uint32_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	ChannelPublicKeys_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelPublicKeys_get_payment_point(uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelPublicKeys_get_payment_point(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelPublicKeys_set_payment_point(uint32_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	ChannelPublicKeys_set_payment_point(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelPublicKeys_get_delayed_payment_basepoint(uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelPublicKeys_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelPublicKeys_set_delayed_payment_basepoint(uint32_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	ChannelPublicKeys_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelPublicKeys_get_htlc_basepoint(uint32_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelPublicKeys_get_htlc_basepoint(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelPublicKeys_set_htlc_basepoint(uint32_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	ChannelPublicKeys_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelPublicKeys_new(int8_tArray funding_pubkey_arg, int8_tArray revocation_basepoint_arg, int8_tArray payment_point_arg, int8_tArray delayed_payment_basepoint_arg, int8_tArray htlc_basepoint_arg) {
	LDKPublicKey funding_pubkey_arg_ref;
	CHECK(*((uint32_t*)funding_pubkey_arg) == 33);
	memcpy(funding_pubkey_arg_ref.compressed_form, (uint8_t*)(funding_pubkey_arg + 4), 33);
	LDKPublicKey revocation_basepoint_arg_ref;
	CHECK(*((uint32_t*)revocation_basepoint_arg) == 33);
	memcpy(revocation_basepoint_arg_ref.compressed_form, (uint8_t*)(revocation_basepoint_arg + 4), 33);
	LDKPublicKey payment_point_arg_ref;
	CHECK(*((uint32_t*)payment_point_arg) == 33);
	memcpy(payment_point_arg_ref.compressed_form, (uint8_t*)(payment_point_arg + 4), 33);
	LDKPublicKey delayed_payment_basepoint_arg_ref;
	CHECK(*((uint32_t*)delayed_payment_basepoint_arg) == 33);
	memcpy(delayed_payment_basepoint_arg_ref.compressed_form, (uint8_t*)(delayed_payment_basepoint_arg + 4), 33);
	LDKPublicKey htlc_basepoint_arg_ref;
	CHECK(*((uint32_t*)htlc_basepoint_arg) == 33);
	memcpy(htlc_basepoint_arg_ref.compressed_form, (uint8_t*)(htlc_basepoint_arg + 4), 33);
	LDKChannelPublicKeys ret_var = ChannelPublicKeys_new(funding_pubkey_arg_ref, revocation_basepoint_arg_ref, payment_point_arg_ref, delayed_payment_basepoint_arg_ref, htlc_basepoint_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelPublicKeys_write(uint32_t obj) {
	LDKChannelPublicKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelPublicKeys_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelPublicKeys_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKChannelPublicKeys ret_var = ChannelPublicKeys_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_TxCreationKeys_derive_new(int8_tArray per_commitment_point, int8_tArray broadcaster_delayed_payment_base, int8_tArray broadcaster_htlc_base, int8_tArray countersignatory_revocation_base, int8_tArray countersignatory_htlc_base) {
	LDKPublicKey per_commitment_point_ref;
	CHECK(*((uint32_t*)per_commitment_point) == 33);
	memcpy(per_commitment_point_ref.compressed_form, (uint8_t*)(per_commitment_point + 4), 33);
	LDKPublicKey broadcaster_delayed_payment_base_ref;
	CHECK(*((uint32_t*)broadcaster_delayed_payment_base) == 33);
	memcpy(broadcaster_delayed_payment_base_ref.compressed_form, (uint8_t*)(broadcaster_delayed_payment_base + 4), 33);
	LDKPublicKey broadcaster_htlc_base_ref;
	CHECK(*((uint32_t*)broadcaster_htlc_base) == 33);
	memcpy(broadcaster_htlc_base_ref.compressed_form, (uint8_t*)(broadcaster_htlc_base + 4), 33);
	LDKPublicKey countersignatory_revocation_base_ref;
	CHECK(*((uint32_t*)countersignatory_revocation_base) == 33);
	memcpy(countersignatory_revocation_base_ref.compressed_form, (uint8_t*)(countersignatory_revocation_base + 4), 33);
	LDKPublicKey countersignatory_htlc_base_ref;
	CHECK(*((uint32_t*)countersignatory_htlc_base) == 33);
	memcpy(countersignatory_htlc_base_ref.compressed_form, (uint8_t*)(countersignatory_htlc_base + 4), 33);
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = TxCreationKeys_derive_new(per_commitment_point_ref, broadcaster_delayed_payment_base_ref, broadcaster_htlc_base_ref, countersignatory_revocation_base_ref, countersignatory_htlc_base_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_TxCreationKeys_from_channel_static_keys(int8_tArray per_commitment_point, uint32_t broadcaster_keys, uint32_t countersignatory_keys) {
	LDKPublicKey per_commitment_point_ref;
	CHECK(*((uint32_t*)per_commitment_point) == 33);
	memcpy(per_commitment_point_ref.compressed_form, (uint8_t*)(per_commitment_point + 4), 33);
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

int8_tArray  __attribute__((visibility("default"))) TS_get_revokeable_redeemscript(int8_tArray revocation_key, int16_t contest_delay, int8_tArray broadcaster_delayed_payment_key) {
	LDKPublicKey revocation_key_ref;
	CHECK(*((uint32_t*)revocation_key) == 33);
	memcpy(revocation_key_ref.compressed_form, (uint8_t*)(revocation_key + 4), 33);
	LDKPublicKey broadcaster_delayed_payment_key_ref;
	CHECK(*((uint32_t*)broadcaster_delayed_payment_key) == 33);
	memcpy(broadcaster_delayed_payment_key_ref.compressed_form, (uint8_t*)(broadcaster_delayed_payment_key + 4), 33);
	LDKCVec_u8Z arg_var = get_revokeable_redeemscript(revocation_key_ref, contest_delay, broadcaster_delayed_payment_key_ref);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_free(uint32_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCOutputInCommitment_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_clone(uint32_t orig) {
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

jboolean  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_get_offered(uint32_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = HTLCOutputInCommitment_get_offered(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_set_offered(uint32_t this_ptr, jboolean val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	HTLCOutputInCommitment_set_offered(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_get_amount_msat(uint32_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = HTLCOutputInCommitment_get_amount_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_set_amount_msat(uint32_t this_ptr, int64_t val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	HTLCOutputInCommitment_set_amount_msat(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_get_cltv_expiry(uint32_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = HTLCOutputInCommitment_get_cltv_expiry(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_set_cltv_expiry(uint32_t this_ptr, int32_t val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	HTLCOutputInCommitment_set_cltv_expiry(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_get_payment_hash(uint32_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *HTLCOutputInCommitment_get_payment_hash(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_set_payment_hash(uint32_t this_ptr, int8_tArray val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	HTLCOutputInCommitment_set_payment_hash(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_write(uint32_t obj) {
	LDKHTLCOutputInCommitment obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = HTLCOutputInCommitment_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_HTLCOutputInCommitment_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKHTLCOutputInCommitment ret_var = HTLCOutputInCommitment_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_get_htlc_redeemscript(uint32_t htlc, uint32_t keys) {
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKTxCreationKeys keys_conv;
	keys_conv.inner = (void*)(keys & (~1));
	keys_conv.is_owned = false;
	LDKCVec_u8Z arg_var = get_htlc_redeemscript(&htlc_conv, &keys_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

int8_tArray  __attribute__((visibility("default"))) TS_make_funding_redeemscript(int8_tArray broadcaster, int8_tArray countersignatory) {
	LDKPublicKey broadcaster_ref;
	CHECK(*((uint32_t*)broadcaster) == 33);
	memcpy(broadcaster_ref.compressed_form, (uint8_t*)(broadcaster + 4), 33);
	LDKPublicKey countersignatory_ref;
	CHECK(*((uint32_t*)countersignatory) == 33);
	memcpy(countersignatory_ref.compressed_form, (uint8_t*)(countersignatory + 4), 33);
	LDKCVec_u8Z arg_var = make_funding_redeemscript(broadcaster_ref, countersignatory_ref);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

int8_tArray  __attribute__((visibility("default"))) TS_build_htlc_transaction(int8_tArray prev_hash, int32_t feerate_per_kw, int16_t contest_delay, uint32_t htlc, int8_tArray broadcaster_delayed_payment_key, int8_tArray revocation_key) {
	unsigned char prev_hash_arr[32];
	CHECK(*((uint32_t*)prev_hash) == 32);
	memcpy(prev_hash_arr, (uint8_t*)(prev_hash + 4), 32);
	unsigned char (*prev_hash_ref)[32] = &prev_hash_arr;
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKPublicKey broadcaster_delayed_payment_key_ref;
	CHECK(*((uint32_t*)broadcaster_delayed_payment_key) == 33);
	memcpy(broadcaster_delayed_payment_key_ref.compressed_form, (uint8_t*)(broadcaster_delayed_payment_key + 4), 33);
	LDKPublicKey revocation_key_ref;
	CHECK(*((uint32_t*)revocation_key) == 33);
	memcpy(revocation_key_ref.compressed_form, (uint8_t*)(revocation_key + 4), 33);
	LDKTransaction arg_var = build_htlc_transaction(prev_hash_ref, feerate_per_kw, contest_delay, &htlc_conv, broadcaster_delayed_payment_key_ref, revocation_key_ref);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	Transaction_free(arg_var);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_free(uint32_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelTransactionParameters_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_clone(uint32_t orig) {
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

uint32_t  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_get_holder_pubkeys(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_set_holder_pubkeys(uint32_t this_ptr, uint32_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelPublicKeys val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = ChannelPublicKeys_clone(&val_conv);
	ChannelTransactionParameters_set_holder_pubkeys(&this_ptr_conv, val_conv);
}

int16_t  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_get_holder_selected_contest_delay(uint32_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelTransactionParameters_get_holder_selected_contest_delay(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_set_holder_selected_contest_delay(uint32_t this_ptr, int16_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelTransactionParameters_set_holder_selected_contest_delay(&this_ptr_conv, val);
}

jboolean  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_get_is_outbound_from_holder(uint32_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelTransactionParameters_get_is_outbound_from_holder(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_set_is_outbound_from_holder(uint32_t this_ptr, jboolean val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelTransactionParameters_set_is_outbound_from_holder(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_get_counterparty_parameters(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_set_counterparty_parameters(uint32_t this_ptr, uint32_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCounterpartyChannelTransactionParameters val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = CounterpartyChannelTransactionParameters_clone(&val_conv);
	ChannelTransactionParameters_set_counterparty_parameters(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_get_funding_outpoint(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_set_funding_outpoint(uint32_t this_ptr, uint32_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKOutPoint val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = OutPoint_clone(&val_conv);
	ChannelTransactionParameters_set_funding_outpoint(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_new(uint32_t holder_pubkeys_arg, int16_t holder_selected_contest_delay_arg, jboolean is_outbound_from_holder_arg, uint32_t counterparty_parameters_arg, uint32_t funding_outpoint_arg) {
	LDKChannelPublicKeys holder_pubkeys_arg_conv;
	holder_pubkeys_arg_conv.inner = (void*)(holder_pubkeys_arg & (~1));
	holder_pubkeys_arg_conv.is_owned = (holder_pubkeys_arg & 1) || (holder_pubkeys_arg == 0);
	holder_pubkeys_arg_conv = ChannelPublicKeys_clone(&holder_pubkeys_arg_conv);
	LDKCounterpartyChannelTransactionParameters counterparty_parameters_arg_conv;
	counterparty_parameters_arg_conv.inner = (void*)(counterparty_parameters_arg & (~1));
	counterparty_parameters_arg_conv.is_owned = (counterparty_parameters_arg & 1) || (counterparty_parameters_arg == 0);
	counterparty_parameters_arg_conv = CounterpartyChannelTransactionParameters_clone(&counterparty_parameters_arg_conv);
	LDKOutPoint funding_outpoint_arg_conv;
	funding_outpoint_arg_conv.inner = (void*)(funding_outpoint_arg & (~1));
	funding_outpoint_arg_conv.is_owned = (funding_outpoint_arg & 1) || (funding_outpoint_arg == 0);
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

void  __attribute__((visibility("default"))) TS_CounterpartyChannelTransactionParameters_free(uint32_t this_ptr) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CounterpartyChannelTransactionParameters_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CounterpartyChannelTransactionParameters_clone(uint32_t orig) {
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

uint32_t  __attribute__((visibility("default"))) TS_CounterpartyChannelTransactionParameters_get_pubkeys(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_CounterpartyChannelTransactionParameters_set_pubkeys(uint32_t this_ptr, uint32_t val) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelPublicKeys val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = ChannelPublicKeys_clone(&val_conv);
	CounterpartyChannelTransactionParameters_set_pubkeys(&this_ptr_conv, val_conv);
}

int16_t  __attribute__((visibility("default"))) TS_CounterpartyChannelTransactionParameters_get_selected_contest_delay(uint32_t this_ptr) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = CounterpartyChannelTransactionParameters_get_selected_contest_delay(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_CounterpartyChannelTransactionParameters_set_selected_contest_delay(uint32_t this_ptr, int16_t val) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	CounterpartyChannelTransactionParameters_set_selected_contest_delay(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_CounterpartyChannelTransactionParameters_new(uint32_t pubkeys_arg, int16_t selected_contest_delay_arg) {
	LDKChannelPublicKeys pubkeys_arg_conv;
	pubkeys_arg_conv.inner = (void*)(pubkeys_arg & (~1));
	pubkeys_arg_conv.is_owned = (pubkeys_arg & 1) || (pubkeys_arg == 0);
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

jboolean  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_is_populated(uint32_t this_arg) {
	LDKChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	jboolean ret_val = ChannelTransactionParameters_is_populated(&this_arg_conv);
	return ret_val;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_as_holder_broadcastable(uint32_t this_arg) {
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

uint32_t  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_as_counterparty_broadcastable(uint32_t this_arg) {
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

int8_tArray  __attribute__((visibility("default"))) TS_CounterpartyChannelTransactionParameters_write(uint32_t obj) {
	LDKCounterpartyChannelTransactionParameters obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = CounterpartyChannelTransactionParameters_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_CounterpartyChannelTransactionParameters_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCounterpartyChannelTransactionParameters ret_var = CounterpartyChannelTransactionParameters_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_write(uint32_t obj) {
	LDKChannelTransactionParameters obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelTransactionParameters_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelTransactionParameters_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKChannelTransactionParameters ret_var = ChannelTransactionParameters_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_DirectedChannelTransactionParameters_free(uint32_t this_ptr) {
	LDKDirectedChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectedChannelTransactionParameters_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_DirectedChannelTransactionParameters_broadcaster_pubkeys(uint32_t this_arg) {
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

uint32_t  __attribute__((visibility("default"))) TS_DirectedChannelTransactionParameters_countersignatory_pubkeys(uint32_t this_arg) {
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

int16_t  __attribute__((visibility("default"))) TS_DirectedChannelTransactionParameters_contest_delay(uint32_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int16_t ret_val = DirectedChannelTransactionParameters_contest_delay(&this_arg_conv);
	return ret_val;
}

jboolean  __attribute__((visibility("default"))) TS_DirectedChannelTransactionParameters_is_outbound(uint32_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	jboolean ret_val = DirectedChannelTransactionParameters_is_outbound(&this_arg_conv);
	return ret_val;
}

uint32_t  __attribute__((visibility("default"))) TS_DirectedChannelTransactionParameters_funding_outpoint(uint32_t this_arg) {
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

void  __attribute__((visibility("default"))) TS_HolderCommitmentTransaction_free(uint32_t this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HolderCommitmentTransaction_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_HolderCommitmentTransaction_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_HolderCommitmentTransaction_get_counterparty_sig(uint32_t this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), HolderCommitmentTransaction_get_counterparty_sig(&this_ptr_conv).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_HolderCommitmentTransaction_set_counterparty_sig(uint32_t this_ptr, int8_tArray val) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK(*((uint32_t*)val) == 64);
	memcpy(val_ref.compact_form, (uint8_t*)(val + 4), 64);
	HolderCommitmentTransaction_set_counterparty_sig(&this_ptr_conv, val_ref);
}

void  __attribute__((visibility("default"))) TS_HolderCommitmentTransaction_set_counterparty_htlc_sigs(uint32_t this_ptr, ptrArray val) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_SignatureZ val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		val_constr.data = NULL;
	int8_tArray* val_vals = (int8_tArray*)(val + 4);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		int8_tArray arr_conv_12 = val_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*((uint32_t*)arr_conv_12) == 64);
		memcpy(arr_conv_12_ref.compact_form, (uint8_t*)(arr_conv_12 + 4), 64);
		val_constr.data[m] = arr_conv_12_ref;
	}
	HolderCommitmentTransaction_set_counterparty_htlc_sigs(&this_ptr_conv, val_constr);
}

int8_tArray  __attribute__((visibility("default"))) TS_HolderCommitmentTransaction_write(uint32_t obj) {
	LDKHolderCommitmentTransaction obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = HolderCommitmentTransaction_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_HolderCommitmentTransaction_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKHolderCommitmentTransaction ret_var = HolderCommitmentTransaction_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_HolderCommitmentTransaction_new(uint32_t commitment_tx, int8_tArray counterparty_sig, ptrArray counterparty_htlc_sigs, int8_tArray holder_funding_key, int8_tArray counterparty_funding_key) {
	LDKCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = (commitment_tx & 1) || (commitment_tx == 0);
	commitment_tx_conv = CommitmentTransaction_clone(&commitment_tx_conv);
	LDKSignature counterparty_sig_ref;
	CHECK(*((uint32_t*)counterparty_sig) == 64);
	memcpy(counterparty_sig_ref.compact_form, (uint8_t*)(counterparty_sig + 4), 64);
	LDKCVec_SignatureZ counterparty_htlc_sigs_constr;
	counterparty_htlc_sigs_constr.datalen = *((uint32_t*)counterparty_htlc_sigs);
	if (counterparty_htlc_sigs_constr.datalen > 0)
		counterparty_htlc_sigs_constr.data = MALLOC(counterparty_htlc_sigs_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		counterparty_htlc_sigs_constr.data = NULL;
	int8_tArray* counterparty_htlc_sigs_vals = (int8_tArray*)(counterparty_htlc_sigs + 4);
	for (size_t m = 0; m < counterparty_htlc_sigs_constr.datalen; m++) {
		int8_tArray arr_conv_12 = counterparty_htlc_sigs_vals[m];
		LDKSignature arr_conv_12_ref;
		CHECK(*((uint32_t*)arr_conv_12) == 64);
		memcpy(arr_conv_12_ref.compact_form, (uint8_t*)(arr_conv_12 + 4), 64);
		counterparty_htlc_sigs_constr.data[m] = arr_conv_12_ref;
	}
	LDKPublicKey holder_funding_key_ref;
	CHECK(*((uint32_t*)holder_funding_key) == 33);
	memcpy(holder_funding_key_ref.compressed_form, (uint8_t*)(holder_funding_key + 4), 33);
	LDKPublicKey counterparty_funding_key_ref;
	CHECK(*((uint32_t*)counterparty_funding_key) == 33);
	memcpy(counterparty_funding_key_ref.compressed_form, (uint8_t*)(counterparty_funding_key + 4), 33);
	LDKHolderCommitmentTransaction ret_var = HolderCommitmentTransaction_new(commitment_tx_conv, counterparty_sig_ref, counterparty_htlc_sigs_constr, holder_funding_key_ref, counterparty_funding_key_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_free(uint32_t this_ptr) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	BuiltCommitmentTransaction_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_get_transaction(uint32_t this_ptr) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKTransaction arg_var = BuiltCommitmentTransaction_get_transaction(&this_ptr_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	Transaction_free(arg_var);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_set_transaction(uint32_t this_ptr, int8_tArray val) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKTransaction val_ref;
	val_ref.datalen = *((uint32_t*)val);
	val_ref.data = MALLOC(val_ref.datalen, "LDKTransaction Bytes");
	memcpy(val_ref.data, (uint8_t*)(val + 4), val_ref.datalen);
	val_ref.data_is_owned = true;
	BuiltCommitmentTransaction_set_transaction(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_get_txid(uint32_t this_ptr) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *BuiltCommitmentTransaction_get_txid(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_set_txid(uint32_t this_ptr, int8_tArray val) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	BuiltCommitmentTransaction_set_txid(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_new(int8_tArray transaction_arg, int8_tArray txid_arg) {
	LDKTransaction transaction_arg_ref;
	transaction_arg_ref.datalen = *((uint32_t*)transaction_arg);
	transaction_arg_ref.data = MALLOC(transaction_arg_ref.datalen, "LDKTransaction Bytes");
	memcpy(transaction_arg_ref.data, (uint8_t*)(transaction_arg + 4), transaction_arg_ref.datalen);
	transaction_arg_ref.data_is_owned = true;
	LDKThirtyTwoBytes txid_arg_ref;
	CHECK(*((uint32_t*)txid_arg) == 32);
	memcpy(txid_arg_ref.data, (uint8_t*)(txid_arg + 4), 32);
	LDKBuiltCommitmentTransaction ret_var = BuiltCommitmentTransaction_new(transaction_arg_ref, txid_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_write(uint32_t obj) {
	LDKBuiltCommitmentTransaction obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = BuiltCommitmentTransaction_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKBuiltCommitmentTransaction ret_var = BuiltCommitmentTransaction_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_get_sighash_all(uint32_t this_arg, int8_tArray funding_redeemscript, int64_t channel_value_satoshis) {
	LDKBuiltCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKu8slice funding_redeemscript_ref;
	funding_redeemscript_ref.datalen = *((uint32_t*)funding_redeemscript);
	funding_redeemscript_ref.data = (int8_t*)(funding_redeemscript + 4);
	int8_tArray arg_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), BuiltCommitmentTransaction_get_sighash_all(&this_arg_conv, funding_redeemscript_ref, channel_value_satoshis).data, 32);
	return arg_arr;
}

int8_tArray  __attribute__((visibility("default"))) TS_BuiltCommitmentTransaction_sign(uint32_t this_arg, int8_tArray funding_key, int8_tArray funding_redeemscript, int64_t channel_value_satoshis) {
	LDKBuiltCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char funding_key_arr[32];
	CHECK(*((uint32_t*)funding_key) == 32);
	memcpy(funding_key_arr, (uint8_t*)(funding_key + 4), 32);
	unsigned char (*funding_key_ref)[32] = &funding_key_arr;
	LDKu8slice funding_redeemscript_ref;
	funding_redeemscript_ref.datalen = *((uint32_t*)funding_redeemscript);
	funding_redeemscript_ref.data = (int8_t*)(funding_redeemscript + 4);
	int8_tArray arg_arr = init_arr(64, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), BuiltCommitmentTransaction_sign(&this_arg_conv, funding_key_ref, funding_redeemscript_ref, channel_value_satoshis).compact_form, 64);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_CommitmentTransaction_free(uint32_t this_ptr) {
	LDKCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentTransaction_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_CommitmentTransaction_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_CommitmentTransaction_write(uint32_t obj) {
	LDKCommitmentTransaction obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = CommitmentTransaction_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_CommitmentTransaction_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCommitmentTransaction ret_var = CommitmentTransaction_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int64_t  __attribute__((visibility("default"))) TS_CommitmentTransaction_commitment_number(uint32_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = CommitmentTransaction_commitment_number(&this_arg_conv);
	return ret_val;
}

int64_t  __attribute__((visibility("default"))) TS_CommitmentTransaction_to_broadcaster_value_sat(uint32_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = CommitmentTransaction_to_broadcaster_value_sat(&this_arg_conv);
	return ret_val;
}

int64_t  __attribute__((visibility("default"))) TS_CommitmentTransaction_to_countersignatory_value_sat(uint32_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = CommitmentTransaction_to_countersignatory_value_sat(&this_arg_conv);
	return ret_val;
}

int32_t  __attribute__((visibility("default"))) TS_CommitmentTransaction_feerate_per_kw(uint32_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int32_t ret_val = CommitmentTransaction_feerate_per_kw(&this_arg_conv);
	return ret_val;
}

uint32_t  __attribute__((visibility("default"))) TS_CommitmentTransaction_trust(uint32_t this_arg) {
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

uint32_t  __attribute__((visibility("default"))) TS_CommitmentTransaction_verify(uint32_t this_arg, uint32_t channel_parameters, uint32_t broadcaster_keys, uint32_t countersignatory_keys) {
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

void  __attribute__((visibility("default"))) TS_TrustedCommitmentTransaction_free(uint32_t this_ptr) {
	LDKTrustedCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	TrustedCommitmentTransaction_free(this_ptr_conv);
}

int8_tArray  __attribute__((visibility("default"))) TS_TrustedCommitmentTransaction_txid(uint32_t this_arg) {
	LDKTrustedCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), TrustedCommitmentTransaction_txid(&this_arg_conv).data, 32);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_TrustedCommitmentTransaction_built_transaction(uint32_t this_arg) {
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

uint32_t  __attribute__((visibility("default"))) TS_TrustedCommitmentTransaction_keys(uint32_t this_arg) {
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

uint32_t  __attribute__((visibility("default"))) TS_TrustedCommitmentTransaction_get_htlc_sigs(uint32_t this_arg, int8_tArray htlc_base_key, uint32_t channel_parameters) {
	LDKTrustedCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char htlc_base_key_arr[32];
	CHECK(*((uint32_t*)htlc_base_key) == 32);
	memcpy(htlc_base_key_arr, (uint8_t*)(htlc_base_key + 4), 32);
	unsigned char (*htlc_base_key_ref)[32] = &htlc_base_key_arr;
	LDKDirectedChannelTransactionParameters channel_parameters_conv;
	channel_parameters_conv.inner = (void*)(channel_parameters & (~1));
	channel_parameters_conv.is_owned = false;
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = TrustedCommitmentTransaction_get_htlc_sigs(&this_arg_conv, htlc_base_key_ref, &channel_parameters_conv);
	return (long)ret_conv;
}

int64_t  __attribute__((visibility("default"))) TS_get_commitment_transaction_number_obscure_factor(int8_tArray broadcaster_payment_basepoint, int8_tArray countersignatory_payment_basepoint, jboolean outbound_from_broadcaster) {
	LDKPublicKey broadcaster_payment_basepoint_ref;
	CHECK(*((uint32_t*)broadcaster_payment_basepoint) == 33);
	memcpy(broadcaster_payment_basepoint_ref.compressed_form, (uint8_t*)(broadcaster_payment_basepoint + 4), 33);
	LDKPublicKey countersignatory_payment_basepoint_ref;
	CHECK(*((uint32_t*)countersignatory_payment_basepoint) == 33);
	memcpy(countersignatory_payment_basepoint_ref.compressed_form, (uint8_t*)(countersignatory_payment_basepoint + 4), 33);
	int64_t ret_val = get_commitment_transaction_number_obscure_factor(broadcaster_payment_basepoint_ref, countersignatory_payment_basepoint_ref, outbound_from_broadcaster);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_InitFeatures_free(uint32_t this_ptr) {
	LDKInitFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	InitFeatures_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_NodeFeatures_free(uint32_t this_ptr) {
	LDKNodeFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeFeatures_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_ChannelFeatures_free(uint32_t this_ptr) {
	LDKChannelFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelFeatures_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_RouteHop_free(uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHop_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_RouteHop_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_RouteHop_get_pubkey(uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), RouteHop_get_pubkey(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_RouteHop_set_pubkey(uint32_t this_ptr, int8_tArray val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	RouteHop_set_pubkey(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_RouteHop_get_node_features(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_RouteHop_set_node_features(uint32_t this_ptr, uint32_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we need a move here but no clone is available for LDKNodeFeatures
	RouteHop_set_node_features(&this_ptr_conv, val_conv);
}

int64_t  __attribute__((visibility("default"))) TS_RouteHop_get_short_channel_id(uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHop_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_RouteHop_set_short_channel_id(uint32_t this_ptr, int64_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHop_set_short_channel_id(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_RouteHop_get_channel_features(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_RouteHop_set_channel_features(uint32_t this_ptr, uint32_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we need a move here but no clone is available for LDKChannelFeatures
	RouteHop_set_channel_features(&this_ptr_conv, val_conv);
}

int64_t  __attribute__((visibility("default"))) TS_RouteHop_get_fee_msat(uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHop_get_fee_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_RouteHop_set_fee_msat(uint32_t this_ptr, int64_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHop_set_fee_msat(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_RouteHop_get_cltv_expiry_delta(uint32_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = RouteHop_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_RouteHop_set_cltv_expiry_delta(uint32_t this_ptr, int32_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHop_set_cltv_expiry_delta(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_RouteHop_new(int8_tArray pubkey_arg, uint32_t node_features_arg, int64_t short_channel_id_arg, uint32_t channel_features_arg, int64_t fee_msat_arg, int32_t cltv_expiry_delta_arg) {
	LDKPublicKey pubkey_arg_ref;
	CHECK(*((uint32_t*)pubkey_arg) == 33);
	memcpy(pubkey_arg_ref.compressed_form, (uint8_t*)(pubkey_arg + 4), 33);
	LDKNodeFeatures node_features_arg_conv;
	node_features_arg_conv.inner = (void*)(node_features_arg & (~1));
	node_features_arg_conv.is_owned = (node_features_arg & 1) || (node_features_arg == 0);
	// Warning: we need a move here but no clone is available for LDKNodeFeatures
	LDKChannelFeatures channel_features_arg_conv;
	channel_features_arg_conv.inner = (void*)(channel_features_arg & (~1));
	channel_features_arg_conv.is_owned = (channel_features_arg & 1) || (channel_features_arg == 0);
	// Warning: we need a move here but no clone is available for LDKChannelFeatures
	LDKRouteHop ret_var = RouteHop_new(pubkey_arg_ref, node_features_arg_conv, short_channel_id_arg, channel_features_arg_conv, fee_msat_arg, cltv_expiry_delta_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_Route_free(uint32_t this_ptr) {
	LDKRoute this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Route_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_Route_clone(uint32_t orig) {
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

void  __attribute__((visibility("default"))) TS_Route_set_paths(uint32_t this_ptr, ptrArray val) {
	LDKRoute this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_CVec_RouteHopZZ val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		val_constr.data = NULL;
	uint32_tArray* val_vals = (uint32_tArray*)(val + 4);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		uint32_tArray arr_conv_12 = val_vals[m];
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = *((uint32_t*)arr_conv_12);
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		uint32_t* arr_conv_12_vals = (uint32_t*)(arr_conv_12 + 4);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			uint32_t arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
			arr_conv_10_conv = RouteHop_clone(&arr_conv_10_conv);
			arr_conv_12_constr.data[k] = arr_conv_10_conv;
		}
		val_constr.data[m] = arr_conv_12_constr;
	}
	Route_set_paths(&this_ptr_conv, val_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_Route_new(ptrArray paths_arg) {
	LDKCVec_CVec_RouteHopZZ paths_arg_constr;
	paths_arg_constr.datalen = *((uint32_t*)paths_arg);
	if (paths_arg_constr.datalen > 0)
		paths_arg_constr.data = MALLOC(paths_arg_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		paths_arg_constr.data = NULL;
	uint32_tArray* paths_arg_vals = (uint32_tArray*)(paths_arg + 4);
	for (size_t m = 0; m < paths_arg_constr.datalen; m++) {
		uint32_tArray arr_conv_12 = paths_arg_vals[m];
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = *((uint32_t*)arr_conv_12);
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		uint32_t* arr_conv_12_vals = (uint32_t*)(arr_conv_12 + 4);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			uint32_t arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
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

int8_tArray  __attribute__((visibility("default"))) TS_Route_write(uint32_t obj) {
	LDKRoute obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Route_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_Route_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_RouteDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteDecodeErrorZ), "LDKCResult_RouteDecodeErrorZ");
	*ret_conv = Route_read(ser_ref);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_RouteHint_free(uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHint_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_RouteHint_clone(uint32_t orig) {
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

int8_tArray  __attribute__((visibility("default"))) TS_RouteHint_get_src_node_id(uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), RouteHint_get_src_node_id(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_RouteHint_set_src_node_id(uint32_t this_ptr, int8_tArray val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	RouteHint_set_src_node_id(&this_ptr_conv, val_ref);
}

int64_t  __attribute__((visibility("default"))) TS_RouteHint_get_short_channel_id(uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHint_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_RouteHint_set_short_channel_id(uint32_t this_ptr, int64_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHint_set_short_channel_id(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_RouteHint_get_fees(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_RouteHint_set_fees(uint32_t this_ptr, uint32_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = RoutingFees_clone(&val_conv);
	RouteHint_set_fees(&this_ptr_conv, val_conv);
}

int16_t  __attribute__((visibility("default"))) TS_RouteHint_get_cltv_expiry_delta(uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = RouteHint_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_RouteHint_set_cltv_expiry_delta(uint32_t this_ptr, int16_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHint_set_cltv_expiry_delta(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_RouteHint_get_htlc_minimum_msat(uint32_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHint_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_RouteHint_set_htlc_minimum_msat(uint32_t this_ptr, int64_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHint_set_htlc_minimum_msat(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_RouteHint_new(int8_tArray src_node_id_arg, int64_t short_channel_id_arg, uint32_t fees_arg, int16_t cltv_expiry_delta_arg, int64_t htlc_minimum_msat_arg) {
	LDKPublicKey src_node_id_arg_ref;
	CHECK(*((uint32_t*)src_node_id_arg) == 33);
	memcpy(src_node_id_arg_ref.compressed_form, (uint8_t*)(src_node_id_arg + 4), 33);
	LDKRoutingFees fees_arg_conv;
	fees_arg_conv.inner = (void*)(fees_arg & (~1));
	fees_arg_conv.is_owned = (fees_arg & 1) || (fees_arg == 0);
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

uint32_t  __attribute__((visibility("default"))) TS_get_route(int8_tArray our_node_id, uint32_t network, int8_tArray target, uint32_tArray first_hops, uint32_tArray last_hops, int64_t final_value_msat, int32_t final_cltv, uint32_t logger) {
	LDKPublicKey our_node_id_ref;
	CHECK(*((uint32_t*)our_node_id) == 33);
	memcpy(our_node_id_ref.compressed_form, (uint8_t*)(our_node_id + 4), 33);
	LDKNetworkGraph network_conv;
	network_conv.inner = (void*)(network & (~1));
	network_conv.is_owned = false;
	LDKPublicKey target_ref;
	CHECK(*((uint32_t*)target) == 33);
	memcpy(target_ref.compressed_form, (uint8_t*)(target + 4), 33);
	LDKCVec_ChannelDetailsZ first_hops_constr;
	first_hops_constr.datalen = *((uint32_t*)first_hops);
	if (first_hops_constr.datalen > 0)
		first_hops_constr.data = MALLOC(first_hops_constr.datalen * sizeof(LDKChannelDetails), "LDKCVec_ChannelDetailsZ Elements");
	else
		first_hops_constr.data = NULL;
	uint32_t* first_hops_vals = (uint32_t*)(first_hops + 4);
	for (size_t q = 0; q < first_hops_constr.datalen; q++) {
		uint32_t arr_conv_16 = first_hops_vals[q];
		LDKChannelDetails arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		first_hops_constr.data[q] = arr_conv_16_conv;
	}
	LDKCVec_RouteHintZ last_hops_constr;
	last_hops_constr.datalen = *((uint32_t*)last_hops);
	if (last_hops_constr.datalen > 0)
		last_hops_constr.data = MALLOC(last_hops_constr.datalen * sizeof(LDKRouteHint), "LDKCVec_RouteHintZ Elements");
	else
		last_hops_constr.data = NULL;
	uint32_t* last_hops_vals = (uint32_t*)(last_hops + 4);
	for (size_t l = 0; l < last_hops_constr.datalen; l++) {
		uint32_t arr_conv_11 = last_hops_vals[l];
		LDKRouteHint arr_conv_11_conv;
		arr_conv_11_conv.inner = (void*)(arr_conv_11 & (~1));
		arr_conv_11_conv.is_owned = (arr_conv_11 & 1) || (arr_conv_11 == 0);
		arr_conv_11_conv = RouteHint_clone(&arr_conv_11_conv);
		last_hops_constr.data[l] = arr_conv_11_conv;
	}
	LDKLogger logger_conv = *(LDKLogger*)(((uint64_t)logger) & ~1);
	LDKCResult_RouteLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret_conv = get_route(our_node_id_ref, &network_conv, target_ref, &first_hops_constr, last_hops_constr, final_value_msat, final_cltv, logger_conv);
	FREE(first_hops_constr.data);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_NetworkGraph_free(uint32_t this_ptr) {
	LDKNetworkGraph this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NetworkGraph_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_LockedNetworkGraph_free(uint32_t this_ptr) {
	LDKLockedNetworkGraph this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LockedNetworkGraph_free(this_ptr_conv);
}

void  __attribute__((visibility("default"))) TS_NetGraphMsgHandler_free(uint32_t this_ptr) {
	LDKNetGraphMsgHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NetGraphMsgHandler_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_NetGraphMsgHandler_new(int8_tArray genesis_hash, uint32_t chain_access, uint32_t logger) {
	LDKThirtyTwoBytes genesis_hash_ref;
	CHECK(*((uint32_t*)genesis_hash) == 32);
	memcpy(genesis_hash_ref.data, (uint8_t*)(genesis_hash + 4), 32);
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKLogger logger_conv = *(LDKLogger*)(((uint64_t)logger) & ~1);
	LDKNetGraphMsgHandler ret_var = NetGraphMsgHandler_new(genesis_hash_ref, chain_access_conv, logger_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_NetGraphMsgHandler_from_net_graph(uint32_t chain_access, uint32_t logger, uint32_t network_graph) {
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKLogger logger_conv = *(LDKLogger*)(((uint64_t)logger) & ~1);
	LDKNetworkGraph network_graph_conv;
	network_graph_conv.inner = (void*)(network_graph & (~1));
	network_graph_conv.is_owned = (network_graph & 1) || (network_graph == 0);
	// Warning: we need a move here but no clone is available for LDKNetworkGraph
	LDKNetGraphMsgHandler ret_var = NetGraphMsgHandler_from_net_graph(chain_access_conv, logger_conv, network_graph_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_NetGraphMsgHandler_read_locked_graph(uint32_t this_arg) {
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

uint32_t  __attribute__((visibility("default"))) TS_LockedNetworkGraph_graph(uint32_t this_arg) {
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

uint32_t  __attribute__((visibility("default"))) TS_NetGraphMsgHandler_as_RoutingMessageHandler(uint32_t this_arg) {
	LDKNetGraphMsgHandler this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKRoutingMessageHandler* ret = MALLOC(sizeof(LDKRoutingMessageHandler), "LDKRoutingMessageHandler");
	*ret = NetGraphMsgHandler_as_RoutingMessageHandler(&this_arg_conv);
	return (long)ret;
}

uint32_t  __attribute__((visibility("default"))) TS_NetGraphMsgHandler_as_MessageSendEventsProvider(uint32_t this_arg) {
	LDKNetGraphMsgHandler this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKMessageSendEventsProvider* ret = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*ret = NetGraphMsgHandler_as_MessageSendEventsProvider(&this_arg_conv);
	return (long)ret;
}

void  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_free(uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectionalChannelInfo_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_clone(uint32_t orig) {
	LDKDirectionalChannelInfo orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKDirectionalChannelInfo ret_var = DirectionalChannelInfo_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int32_t  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_get_last_update(uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = DirectionalChannelInfo_get_last_update(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_set_last_update(uint32_t this_ptr, int32_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_last_update(&this_ptr_conv, val);
}

jboolean  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_get_enabled(uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = DirectionalChannelInfo_get_enabled(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_set_enabled(uint32_t this_ptr, jboolean val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_enabled(&this_ptr_conv, val);
}

int16_t  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_get_cltv_expiry_delta(uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = DirectionalChannelInfo_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_set_cltv_expiry_delta(uint32_t this_ptr, int16_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_cltv_expiry_delta(&this_ptr_conv, val);
}

int64_t  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_get_htlc_minimum_msat(uint32_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = DirectionalChannelInfo_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_set_htlc_minimum_msat(uint32_t this_ptr, int64_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_htlc_minimum_msat(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_get_fees(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_set_fees(uint32_t this_ptr, uint32_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = RoutingFees_clone(&val_conv);
	DirectionalChannelInfo_set_fees(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_get_last_update_message(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_set_last_update_message(uint32_t this_ptr, uint32_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelUpdate val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = ChannelUpdate_clone(&val_conv);
	DirectionalChannelInfo_set_last_update_message(&this_ptr_conv, val_conv);
}

int8_tArray  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_write(uint32_t obj) {
	LDKDirectionalChannelInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = DirectionalChannelInfo_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_DirectionalChannelInfo_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKDirectionalChannelInfo ret_var = DirectionalChannelInfo_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_ChannelInfo_free(uint32_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelInfo_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelInfo_get_features(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelInfo_set_features(uint32_t this_ptr, uint32_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we need a move here but no clone is available for LDKChannelFeatures
	ChannelInfo_set_features(&this_ptr_conv, val_conv);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelInfo_get_node_one(uint32_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelInfo_get_node_one(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelInfo_set_node_one(uint32_t this_ptr, int8_tArray val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	ChannelInfo_set_node_one(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelInfo_get_one_to_two(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelInfo_set_one_to_two(uint32_t this_ptr, uint32_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKDirectionalChannelInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = DirectionalChannelInfo_clone(&val_conv);
	ChannelInfo_set_one_to_two(&this_ptr_conv, val_conv);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelInfo_get_node_two(uint32_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = init_arr(33, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), ChannelInfo_get_node_two(&this_ptr_conv).compressed_form, 33);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_ChannelInfo_set_node_two(uint32_t this_ptr, int8_tArray val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK(*((uint32_t*)val) == 33);
	memcpy(val_ref.compressed_form, (uint8_t*)(val + 4), 33);
	ChannelInfo_set_node_two(&this_ptr_conv, val_ref);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelInfo_get_two_to_one(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelInfo_set_two_to_one(uint32_t this_ptr, uint32_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKDirectionalChannelInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = DirectionalChannelInfo_clone(&val_conv);
	ChannelInfo_set_two_to_one(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelInfo_get_announcement_message(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_ChannelInfo_set_announcement_message(uint32_t this_ptr, uint32_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = ChannelAnnouncement_clone(&val_conv);
	ChannelInfo_set_announcement_message(&this_ptr_conv, val_conv);
}

int8_tArray  __attribute__((visibility("default"))) TS_ChannelInfo_write(uint32_t obj) {
	LDKChannelInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelInfo_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_ChannelInfo_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKChannelInfo ret_var = ChannelInfo_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_RoutingFees_free(uint32_t this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RoutingFees_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_RoutingFees_clone(uint32_t orig) {
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

int32_t  __attribute__((visibility("default"))) TS_RoutingFees_get_base_msat(uint32_t this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = RoutingFees_get_base_msat(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_RoutingFees_set_base_msat(uint32_t this_ptr, int32_t val) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RoutingFees_set_base_msat(&this_ptr_conv, val);
}

int32_t  __attribute__((visibility("default"))) TS_RoutingFees_get_proportional_millionths(uint32_t this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = RoutingFees_get_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_RoutingFees_set_proportional_millionths(uint32_t this_ptr, int32_t val) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RoutingFees_set_proportional_millionths(&this_ptr_conv, val);
}

uint32_t  __attribute__((visibility("default"))) TS_RoutingFees_new(int32_t base_msat_arg, int32_t proportional_millionths_arg) {
	LDKRoutingFees ret_var = RoutingFees_new(base_msat_arg, proportional_millionths_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_RoutingFees_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_RoutingFeesDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RoutingFeesDecodeErrorZ), "LDKCResult_RoutingFeesDecodeErrorZ");
	*ret_conv = RoutingFees_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_RoutingFees_write(uint32_t obj) {
	LDKRoutingFees obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = RoutingFees_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

void  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_free(uint32_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeAnnouncementInfo_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_clone(uint32_t orig) {
	LDKNodeAnnouncementInfo orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKNodeAnnouncementInfo ret_var = NodeAnnouncementInfo_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_get_features(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_set_features(uint32_t this_ptr, uint32_t val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we need a move here but no clone is available for LDKNodeFeatures
	NodeAnnouncementInfo_set_features(&this_ptr_conv, val_conv);
}

int32_t  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_get_last_update(uint32_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = NodeAnnouncementInfo_get_last_update(&this_ptr_conv);
	return ret_val;
}

void  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_set_last_update(uint32_t this_ptr, int32_t val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	NodeAnnouncementInfo_set_last_update(&this_ptr_conv, val);
}

int8_tArray  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_get_rgb(uint32_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(3, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *NodeAnnouncementInfo_get_rgb(&this_ptr_conv), 3);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_set_rgb(uint32_t this_ptr, int8_tArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThreeBytes val_ref;
	CHECK(*((uint32_t*)val) == 3);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 3);
	NodeAnnouncementInfo_set_rgb(&this_ptr_conv, val_ref);
}

int8_tArray  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_get_alias(uint32_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = init_arr(32, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(ret_arr + 4), *NodeAnnouncementInfo_get_alias(&this_ptr_conv), 32);
	return ret_arr;
}

void  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_set_alias(uint32_t this_ptr, int8_tArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK(*((uint32_t*)val) == 32);
	memcpy(val_ref.data, (uint8_t*)(val + 4), 32);
	NodeAnnouncementInfo_set_alias(&this_ptr_conv, val_ref);
}

void  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_set_addresses(uint32_t this_ptr, uint32_tArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_NetAddressZ val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		val_constr.data = NULL;
	uint32_t* val_vals = (uint32_t*)(val + 4);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		uint32_t arr_conv_12 = val_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)(((uint64_t)arr_conv_12) & ~1);
		FREE((void*)arr_conv_12);
		val_constr.data[m] = arr_conv_12_conv;
	}
	NodeAnnouncementInfo_set_addresses(&this_ptr_conv, val_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_get_announcement_message(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_set_announcement_message(uint32_t this_ptr, uint32_t val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = NodeAnnouncement_clone(&val_conv);
	NodeAnnouncementInfo_set_announcement_message(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_new(uint32_t features_arg, int32_t last_update_arg, int8_tArray rgb_arg, int8_tArray alias_arg, uint32_tArray addresses_arg, uint32_t announcement_message_arg) {
	LDKNodeFeatures features_arg_conv;
	features_arg_conv.inner = (void*)(features_arg & (~1));
	features_arg_conv.is_owned = (features_arg & 1) || (features_arg == 0);
	// Warning: we need a move here but no clone is available for LDKNodeFeatures
	LDKThreeBytes rgb_arg_ref;
	CHECK(*((uint32_t*)rgb_arg) == 3);
	memcpy(rgb_arg_ref.data, (uint8_t*)(rgb_arg + 4), 3);
	LDKThirtyTwoBytes alias_arg_ref;
	CHECK(*((uint32_t*)alias_arg) == 32);
	memcpy(alias_arg_ref.data, (uint8_t*)(alias_arg + 4), 32);
	LDKCVec_NetAddressZ addresses_arg_constr;
	addresses_arg_constr.datalen = *((uint32_t*)addresses_arg);
	if (addresses_arg_constr.datalen > 0)
		addresses_arg_constr.data = MALLOC(addresses_arg_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		addresses_arg_constr.data = NULL;
	uint32_t* addresses_arg_vals = (uint32_t*)(addresses_arg + 4);
	for (size_t m = 0; m < addresses_arg_constr.datalen; m++) {
		uint32_t arr_conv_12 = addresses_arg_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)(((uint64_t)arr_conv_12) & ~1);
		FREE((void*)arr_conv_12);
		addresses_arg_constr.data[m] = arr_conv_12_conv;
	}
	LDKNodeAnnouncement announcement_message_arg_conv;
	announcement_message_arg_conv.inner = (void*)(announcement_message_arg & (~1));
	announcement_message_arg_conv.is_owned = (announcement_message_arg & 1) || (announcement_message_arg == 0);
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

int8_tArray  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_write(uint32_t obj) {
	LDKNodeAnnouncementInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NodeAnnouncementInfo_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_NodeAnnouncementInfo_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeAnnouncementInfoDecodeErrorZ), "LDKCResult_NodeAnnouncementInfoDecodeErrorZ");
	*ret_conv = NodeAnnouncementInfo_read(ser_ref);
	return (long)ret_conv;
}

void  __attribute__((visibility("default"))) TS_NodeInfo_free(uint32_t this_ptr) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeInfo_free(this_ptr_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_NodeInfo_clone(uint32_t orig) {
	LDKNodeInfo orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKNodeInfo ret_var = NodeInfo_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

void  __attribute__((visibility("default"))) TS_NodeInfo_set_channels(uint32_t this_ptr, int64_tArray val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u64Z val_constr;
	val_constr.datalen = *((uint32_t*)val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (int64_t*)(val + 4);
	for (size_t i = 0; i < val_constr.datalen; i++) {
		int64_t arr_conv_8 = val_vals[i];
		val_constr.data[i] = arr_conv_8;
	}
	NodeInfo_set_channels(&this_ptr_conv, val_constr);
}

uint32_t  __attribute__((visibility("default"))) TS_NodeInfo_get_lowest_inbound_channel_fees(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_NodeInfo_set_lowest_inbound_channel_fees(uint32_t this_ptr, uint32_t val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = RoutingFees_clone(&val_conv);
	NodeInfo_set_lowest_inbound_channel_fees(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_NodeInfo_get_announcement_info(uint32_t this_ptr) {
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

void  __attribute__((visibility("default"))) TS_NodeInfo_set_announcement_info(uint32_t this_ptr, uint32_t val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeAnnouncementInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	val_conv = NodeAnnouncementInfo_clone(&val_conv);
	NodeInfo_set_announcement_info(&this_ptr_conv, val_conv);
}

uint32_t  __attribute__((visibility("default"))) TS_NodeInfo_new(int64_tArray channels_arg, uint32_t lowest_inbound_channel_fees_arg, uint32_t announcement_info_arg) {
	LDKCVec_u64Z channels_arg_constr;
	channels_arg_constr.datalen = *((uint32_t*)channels_arg);
	if (channels_arg_constr.datalen > 0)
		channels_arg_constr.data = MALLOC(channels_arg_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		channels_arg_constr.data = NULL;
	int64_t* channels_arg_vals = (int64_t*)(channels_arg + 4);
	for (size_t i = 0; i < channels_arg_constr.datalen; i++) {
		int64_t arr_conv_8 = channels_arg_vals[i];
		channels_arg_constr.data[i] = arr_conv_8;
	}
	LDKRoutingFees lowest_inbound_channel_fees_arg_conv;
	lowest_inbound_channel_fees_arg_conv.inner = (void*)(lowest_inbound_channel_fees_arg & (~1));
	lowest_inbound_channel_fees_arg_conv.is_owned = (lowest_inbound_channel_fees_arg & 1) || (lowest_inbound_channel_fees_arg == 0);
	lowest_inbound_channel_fees_arg_conv = RoutingFees_clone(&lowest_inbound_channel_fees_arg_conv);
	LDKNodeAnnouncementInfo announcement_info_arg_conv;
	announcement_info_arg_conv.inner = (void*)(announcement_info_arg & (~1));
	announcement_info_arg_conv.is_owned = (announcement_info_arg & 1) || (announcement_info_arg == 0);
	announcement_info_arg_conv = NodeAnnouncementInfo_clone(&announcement_info_arg_conv);
	LDKNodeInfo ret_var = NodeInfo_new(channels_arg_constr, lowest_inbound_channel_fees_arg_conv, announcement_info_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

int8_tArray  __attribute__((visibility("default"))) TS_NodeInfo_write(uint32_t obj) {
	LDKNodeInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NodeInfo_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_NodeInfo_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_NodeInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeInfoDecodeErrorZ), "LDKCResult_NodeInfoDecodeErrorZ");
	*ret_conv = NodeInfo_read(ser_ref);
	return (long)ret_conv;
}

int8_tArray  __attribute__((visibility("default"))) TS_NetworkGraph_write(uint32_t obj) {
	LDKNetworkGraph obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NetworkGraph_write(&obj_conv);
	int8_tArray arg_arr = init_arr(arg_var.datalen, sizeof(uint8_t), "Native int8_tArray Bytes");
	memcpy((uint8_t*)(arg_arr + 4), arg_var.data, arg_var.datalen);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

uint32_t  __attribute__((visibility("default"))) TS_NetworkGraph_read(int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = *((uint32_t*)ser);
	ser_ref.data = (int8_t*)(ser + 4);
	LDKCResult_NetworkGraphDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NetworkGraphDecodeErrorZ), "LDKCResult_NetworkGraphDecodeErrorZ");
	*ret_conv = NetworkGraph_read(ser_ref);
	return (long)ret_conv;
}

uint32_t  __attribute__((visibility("default"))) TS_NetworkGraph_new(int8_tArray genesis_hash) {
	LDKThirtyTwoBytes genesis_hash_ref;
	CHECK(*((uint32_t*)genesis_hash) == 32);
	memcpy(genesis_hash_ref.data, (uint8_t*)(genesis_hash + 4), 32);
	LDKNetworkGraph ret_var = NetworkGraph_new(genesis_hash_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

uint32_t  __attribute__((visibility("default"))) TS_NetworkGraph_update_node_from_announcement(uint32_t this_arg, uint32_t msg) {
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

uint32_t  __attribute__((visibility("default"))) TS_NetworkGraph_update_node_from_unsigned_announcement(uint32_t this_arg, uint32_t msg) {
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

uint32_t  __attribute__((visibility("default"))) TS_NetworkGraph_update_channel_from_announcement(uint32_t this_arg, uint32_t msg, uint32_t chain_access) {
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

uint32_t  __attribute__((visibility("default"))) TS_NetworkGraph_update_channel_from_unsigned_announcement(uint32_t this_arg, uint32_t msg, uint32_t chain_access) {
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

void  __attribute__((visibility("default"))) TS_NetworkGraph_close_channel_from_update(uint32_t this_arg, int64_t short_channel_id, jboolean is_permanent) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	NetworkGraph_close_channel_from_update(&this_arg_conv, short_channel_id, is_permanent);
}

uint32_t  __attribute__((visibility("default"))) TS_NetworkGraph_update_channel(uint32_t this_arg, uint32_t msg) {
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

uint32_t  __attribute__((visibility("default"))) TS_NetworkGraph_update_channel_unsigned(uint32_t this_arg, uint32_t msg) {
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

