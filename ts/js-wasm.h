#ifndef JS_H
#include <stdint.h>
#include <stddef.h>

extern size_t strlen(const char *s);

typedef uint32_t JSValue;
extern JSValue js_invoke_function(JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue) __attribute__((import_name("js_invoke_function")));

static inline JSValue js_invoke_function_0(JSValue obj, JSValue fn){
  return js_invoke_function(obj,fn,0,0,0,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_1(JSValue obj, JSValue fn, JSValue a){
  return js_invoke_function(obj,fn,a,0,0,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_2(JSValue obj, JSValue fn, JSValue a, JSValue b){
  return js_invoke_function(obj,fn,a,b,0,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_3(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c){
  return js_invoke_function(obj,fn,a,b,c,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_4(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d){
  return js_invoke_function(obj,fn,a,b,c,d,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_5(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e){
  return js_invoke_function(obj,fn,a,b,c,d,e,0,0,0,0,0);
}
static inline JSValue js_invoke_function_6(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e, JSValue f){
  return js_invoke_function(obj,fn,a,b,c,d,e,f,0,0,0,0);
}
static inline JSValue js_invoke_function_7(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e, JSValue f, JSValue g){
  return js_invoke_function(obj,fn,a,b,c,d,e,f,g,0,0,0);
}
static inline JSValue js_invoke_function_8(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e, JSValue f, JSValue g, JSValue h){
  return js_invoke_function(obj,fn,a,b,c,d,e,f,g,h,0,0);
}
static inline JSValue js_invoke_function_9(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e, JSValue f, JSValue g, JSValue h, JSValue i){
  return js_invoke_function(obj,fn,a,b,c,d,e,f,g,h,i,0);
}
static inline JSValue js_invoke_function_10(JSValue obj, JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e, JSValue f, JSValue g, JSValue h, JSValue i, JSValue j){
  return js_invoke_function(obj,fn,a,b,c,d,e,f,g,h,i,j);
}
#endif
