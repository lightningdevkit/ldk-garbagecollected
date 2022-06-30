#ifndef JS_H
#include <stdint.h>
#include <stddef.h>

extern size_t strlen(const char *s);

// We only support two call types - u32 and u64. u32 is mapped to a JavaScript
// "number" whereas u64 is mapped to a JavaScript "bigint". Ultimately it all
// calls through to the same function, but at the FFI boundary itself we have
// to use proper types.

typedef uint32_t JSValue;
extern uint64_t js_invoke_function_u(JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue) __attribute__((import_name("js_invoke_function_u")));
extern uint64_t js_invoke_function_b(JSValue,JSValue,uint64_t,uint64_t,uint64_t,uint64_t,uint64_t,uint64_t,uint64_t,uint64_t,uint64_t,uint64_t) __attribute__((import_name("js_invoke_function_b")));

static inline JSValue js_invoke_function_u_(JSValue obj, JSValue fn){
  return js_invoke_function_u(obj,fn,0,0,0,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_u_u(JSValue obj, JSValue fn, JSValue a){
  return js_invoke_function_u(obj,fn,a,0,0,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_u_uu(JSValue obj, JSValue fn, JSValue a, JSValue b){
  return js_invoke_function_u(obj,fn,a,b,0,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_u_uuu(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c){
  return js_invoke_function_u(obj,fn,a,b,c,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_u_uuuu(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d){
  return js_invoke_function_u(obj,fn,a,b,c,d,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_u_uuuuu(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e){
  return js_invoke_function_u(obj,fn,a,b,c,d,e,0,0,0,0,0);
}

static inline uint64_t js_invoke_function_b_(JSValue obj, JSValue fn){
  return js_invoke_function_u(obj,fn,0,0,0,0,0,0,0,0,0,0);
}

static inline uint64_t js_invoke_function_b_uuuu(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d){
  return js_invoke_function_u(obj,fn,a,b,c,d,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_u_b(JSValue obj, JSValue fn, uint64_t a){
  return js_invoke_function_b(obj,fn,a,0,0,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_u_bb(JSValue obj, JSValue fn, uint64_t a, uint64_t b){
  return js_invoke_function_b(obj,fn,a,b,0,0,0,0,0,0,0,0);
}

#endif
