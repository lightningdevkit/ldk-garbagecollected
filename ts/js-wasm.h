#ifndef JS_H
#include <stdint.h>
#include <stddef.h>

static inline size_t strlen(const char *str) {
	const char *s;
	for (s = str; *s; ++s) ;
	return (s - str);
}

typedef uint32_t JSValue;
extern JSValue js_invoke_function(JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue,JSValue);
extern void js_free_function_ptr(JSValue);

static inline JSValue js_invoke_function_0(JSValue fn){
  return js_invoke_function(fn,0,0,0,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_1(JSValue fn, JSValue a){
  return js_invoke_function(fn,a,0,0,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_2(JSValue fn, JSValue a, JSValue b){
  return js_invoke_function(fn,a,b,0,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_3(JSValue fn, JSValue a, JSValue b, JSValue c){
  return js_invoke_function(fn,a,b,c,0,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_4(JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d){
  return js_invoke_function(fn,a,b,c,d,0,0,0,0,0,0);
}
static inline JSValue js_invoke_function_5(JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e){
  return js_invoke_function(fn,a,b,c,d,e,0,0,0,0,0);
}
static inline JSValue js_invoke_function_6(JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e, JSValue f){
  return js_invoke_function(fn,a,b,c,d,e,f,0,0,0,0);
}
static inline JSValue js_invoke_function_7(JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e, JSValue f, JSValue g){
  return js_invoke_function(fn,a,b,c,d,e,f,g,0,0,0);
}
static inline JSValue js_invoke_function_8(JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e, JSValue f, JSValue g, JSValue h){
  return js_invoke_function(fn,a,b,c,d,e,f,g,h,0,0);
}
static inline JSValue js_invoke_function_9(JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e, JSValue f, JSValue g, JSValue h, JSValue i){
  return js_invoke_function(fn,a,b,c,d,e,f,g,h,i,0);
}
static inline JSValue js_invoke_function_10(JSValue fn, JSValue a, JSValue b, JSValue c, JSValue d, JSValue e, JSValue f, JSValue g, JSValue h, JSValue i, JSValue j){
  return js_invoke_function(fn,a,b,c,d,e,f,g,h,i,j);
}
#endif
