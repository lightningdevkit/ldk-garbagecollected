#ifndef JS_H
#include <stdint.h>
#include <stddef.h>

extern size_t strlen(const char *s);

// We only support two call types - u32 and u64. u32 is mapped to a JavaScript
// "number" whereas u64 is mapped to a JavaScript "bigint". Ultimately it all
// calls through to the same function, but at the FFI boundary itself we have
// to use proper types.

typedef uint32_t JSValue;

#define N_TYPE_u uint32_t
#define N_TYPE_b uint64_t

#define TOK(a) a
#define R_CAT2(a, b) a ## b
#define CAT2(a, b) R_CAT2(a, b)
#define R_CAT3(a, b, c) a ## b ## c
#define CAT3(a, b, c) R_CAT3(a, b, c)
#define R_CAT4(a, b, c, d) a ## b ## c ## d
#define CAT4(a, b, c, d) R_CAT4(a, b, c, d)
#define R_CAT5(a, b, c, d, e) a ## b ## c ## d ## e
#define CAT5(a, b, c, d, e) R_CAT5(a, b, c, d, e)
#define R_CAT6(a, b, c, d, e, f) a ## b ## c ## d ## e ## f
#define CAT6(a, b, c, d, e, f) R_CAT6(a, b, c, d, e, f)

#define _GET_CONCAT(_1, _2, _3, _4, _5, _6, CONC, ...) CONC
#define CAT(...) _GET_CONCAT(__VA_ARGS__, CAT6, CAT5, CAT4, CAT3, CAT2, TOK)(__VA_ARGS__)

#define DO_STRING(a) #a
#define STRINGIZE(a) DO_STRING(a)

#define DECL_IMPORT(A1, A2, A3, A4, A5, A6) \
	extern uint64_t CAT(js_invoke_function_, CAT(A1, A2, A3, A4, A5, A6)) \
	(JSValue obj, JSValue fn, N_TYPE_##A1, N_TYPE_##A2, N_TYPE_##A3, N_TYPE_##A4, N_TYPE_##A5, N_TYPE_##A6) \
	__attribute__((import_name(STRINGIZE(CAT(js_invoke_function_, CAT(A1, A2, A3, A4, A5, A6))))));

DECL_IMPORT(u, u, u, u, u, u)
DECL_IMPORT(b, u, u, u, u, u)
DECL_IMPORT(b, b, u, u, u, u)
DECL_IMPORT(b, b, b, u, u, u)
DECL_IMPORT(b, b, b, b, u, u)
DECL_IMPORT(b, b, b, b, b, b)
DECL_IMPORT(u, b, u, u, b, u)
DECL_IMPORT(u, b, u, u, u, u)
DECL_IMPORT(u, b, b, u, u, u)
DECL_IMPORT(u, u, b, u, u, u)
DECL_IMPORT(u, u, b, u, b, u)

#endif
