from bindingstypes import ConvInfo
from enum import Enum

def first_to_lower(string: str) -> str:
    first = string[0]
    return first.lower() + string[1:]


class Target(Enum):
    NODEJS = 1,
    BROWSER = 2

class Consts:
    def __init__(self, DEBUG: bool, target: Target, outdir: str, **kwargs):
        self.outdir = outdir
        self.struct_file_suffixes = {}
        self.c_type_map = dict(
            uint8_t = ['number', 'Uint8Array'],
            uint16_t = ['number', 'Uint16Array'],
            uint32_t = ['number', 'Uint32Array'],
            uint64_t = ['number'],
        )

        self.wasm_decoding_map = dict(
            int8_tArray = 'decodeUint8Array'
        )

        self.wasm_encoding_map = dict(
            int8_tArray = 'encodeUint8Array',
        )

        self.to_hu_conv_templates = dict(
            ptr = 'const {var_name}_hu_conv: {human_type} = new {human_type}(null, {var_name});',
            default = 'const {var_name}_hu_conv: {human_type} = new {human_type}(null, {var_name});',
        )

        self.bindings_header = self.wasm_import_header(target) + """
export class VecOrSliceDef {
    public dataptr: number;
    public datalen: number;
    public stride: number;
    public constructor(dataptr: number, datalen: number, stride: number) {
        this.dataptr = dataptr;
        this.datalen = datalen;
        this.stride = stride;
    }
}

/*
TODO: load WASM file
static {
    System.loadLibrary(\"lightningjni\");
    init(java.lang.Enum.class, VecOrSliceDef.class);
    init_class_cache();
}

static native void init(java.lang.Class c, java.lang.Class slicedef);
static native void init_class_cache();

public static native boolean deref_bool(long ptr);
public static native long deref_long(long ptr);
public static native void free_heap_ptr(long ptr);
public static native byte[] read_bytes(long ptr, long len);
public static native byte[] get_u8_slice_bytes(long slice_ptr);
public static native long bytes_to_u8_vec(byte[] bytes);
public static native long new_txpointer_copy_data(byte[] txdata);
public static native void txpointer_free(long ptr);
public static native byte[] txpointer_get_buffer(long ptr);
public static native long vec_slice_len(long vec);
public static native long new_empty_slice_vec();
*/

"""

        self.bindings_version_file = ""

        self.bindings_footer = ""

        self.common_base = """
function freer(f: () => void) { f() }
const finalizer = new FinalizationRegistry(freer);
function get_freeer(ptr: number, free_fn: (number) => void) {
	return () => {
		free_fn(ptr);
	}
}

export default class CommonBase {
	protected ptr: number;
	protected ptrs_to: object[] = [];
	protected constructor(ptr: number, free_fn: (ptr: number) => void) {
		this.ptr = ptr;
		if (Number.isFinite(ptr) && ptr != 0){
			finalizer.register(this, get_freeer(ptr, free_fn));
		}
	}
	// In Java, protected means "any subclass can access fields on any other subclass'"
	// In TypeScript, protected means "any subclass can access parent fields on instances of itself"
	// To work around this, we add accessors for other instances' protected fields here.
	protected static add_ref_from(holder: CommonBase, referent: object) {
		holder.ptrs_to.push(referent);
	}
	protected static get_ptr_of(o: CommonBase) {
		return o.ptr;
	}
	protected static set_null_skip_free(o: CommonBase) {
		o.ptr = 0;
		finalizer.unregister(o);
	}
}
"""

        self.txout_defn = """export class TxOut extends CommonBase {
	/** The script_pubkey in this output */
	public script_pubkey: Uint8Array;
	/** The value, in satoshis, of this output */
	public value: number;

	/* @internal */
	public constructor(_dummy: object, ptr: number) {
		super(ptr, bindings.TxOut_free);
		this.script_pubkey = bindings.TxOut_get_script_pubkey(ptr);
		this.value = bindings.TxOut_get_value(ptr);
	}
	public constructor_new(value: number, script_pubkey: Uint8Array): TxOut {
		return new TxOut(null, bindings.TxOut_new(script_pubkey, value));
	}
}"""
        self.obj_defined(["TxOut"], "structs")

        self.c_file_pfx = """#include "js-wasm.h"
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
"""

        if not DEBUG:
            self.c_file_pfx = self.c_file_pfx + """
void *malloc(size_t size);
void free(void *ptr);

#define MALLOC(a, _) malloc(a)
#define FREE(p) if ((unsigned long)(p) > 4096) { free(p); }
#define DO_ASSERT(a) (void)(a)
#define CHECK(a)
#define CHECK_ACCESS(p)
#define CHECK_INNER_FIELD_ACCESS_OR_NULL(v)
"""
        else:
            self.c_file_pfx = self.c_file_pfx + """
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
			//XXX: fprintf(stderr, "Tried to free unknown pointer %p\\n", ptr);
			return; // addrsan should catch malloc-unknown and print more info than we have
		}
	}
	if (p) { p->next = it->next; } else { allocation_ll = it->next; }
	DO_ASSERT(it->ptr == ptr);
	__real_free(it);
}
static void FREE(void* ptr) {
	if ((unsigned long)ptr <= 4096) return; // Rust loves to create pointers to the NULL page for dummys
	alloc_freed(ptr);
	__real_free(ptr);
}

static void CHECK_ACCESS(const void* ptr) {
	allocation* it = allocation_ll;
	while (it->ptr != ptr) {
		it = it->next;
		if (it == NULL) {
			return; // addrsan should catch malloc-unknown and print more info than we have
		}
	}
}
#define CHECK_INNER_FIELD_ACCESS_OR_NULL(v) \\
	if (v.is_owned && v.inner != NULL) { \\
		const void *p = __unmangle_inner_ptr(v.inner); \\
		if (p != NULL) { \\
			CHECK_ACCESS(p); \\
		} \\
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
		//XXX: fprintf(stderr, "%s %p remains\\n", a->struct_name, a->ptr);
	}
	DO_ASSERT(allocation_ll == NULL);
}
"""
        self.c_file_pfx = self.c_file_pfx + """
// We assume that CVec_u8Z and u8slice are the same size and layout (and thus pointers to the two can be mixed)
_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKu8slice), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, data) == offsetof(LDKu8slice, data), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKu8slice, datalen), "Vec<u8> and [u8] need to have been mapped identically");

_Static_assert(sizeof(void*) == 4, "Pointers mut be 32 bits");

#define DECL_ARR_TYPE(ty, name) \\
	struct name##array { \\
		uint32_t arr_len; \\
		ty elems[]; \\
	}; \\
	typedef struct name##array * name##Array; \\
	static inline name##Array init_##name##Array(size_t arr_len) { \\
		name##Array arr = (name##Array)MALLOC(arr_len * sizeof(ty) + sizeof(uint32_t), "##name array init"); \\
		arr->arr_len = arr_len; \\
		return arr; \\
	}

DECL_ARR_TYPE(int64_t, int64_t);
DECL_ARR_TYPE(int8_t, int8_t);
DECL_ARR_TYPE(uint32_t, uint32_t);
DECL_ARR_TYPE(void*, ptr);
DECL_ARR_TYPE(char, char);
typedef charArray jstring;

static inline jstring str_ref_to_ts(const char* chars, size_t len) {
	charArray arr = init_charArray(len);
	memcpy(arr->elems, chars, len);
	return arr;
}
static inline LDKStr str_ref_to_owned_c(const jstring str) {
	char* newchars = MALLOC(str->arr_len + 1, "String chars");
	memcpy(newchars, str->elems, str->arr_len);
	newchars[str->arr_len] = 0;
	LDKStr res = {
		.chars = newchars,
		.len = str->arr_len,
		.chars_is_owned = true
	};
	return res;
}

typedef bool jboolean;

uint32_t __attribute__((visibility("default"))) TS_malloc(uint32_t size) {
	return (uint32_t)MALLOC(size, "JS-Called malloc");
}
void __attribute__((visibility("default"))) TS_free(uint32_t ptr) {
	FREE((void*)ptr);
}
"""

        self.c_version_file = ""

        self.hu_struct_file_prefix = """
import CommonBase from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'
import * as InternalUtils from '../InternalUtils.mjs'

"""
        self.util_fn_pfx = self.hu_struct_file_prefix + "\nexport class UtilMethods extends CommonBase {\n"
        self.util_fn_sfx = "}"
        self.c_fn_ty_pfx = ""
        self.file_ext = ".mts"
        self.ptr_c_ty = "uint32_t"
        self.ptr_native_ty = "number"
        self.result_c_ty = "uint32_t"
        self.ptr_arr = "ptrArray"
        self.is_arr_some_check = ("", " != 0")
        self.get_native_arr_len_call = ("", "->arr_len")

        with open(outdir + "/InternalUtils.mts", "w") as f:
            f.write("export function check_arr_len(arr: Uint8Array, len: number): Uint8Array {\n")
            f.write("\tif (arr.length != len) { throw new Error(\"Expected array of length \" + len + \"got \" + arr.length); }\n")
            f.write("\treturn arr;\n")
            f.write("}")

    def release_native_arr_ptr_call(self, ty_info, arr_var, arr_ptr_var):
        return None
    def create_native_arr_call(self, arr_len, ty_info):
        if ty_info.c_ty == "ptrArray":
            assert ty_info.subty is not None and ty_info.subty.c_ty.endswith("Array")
        return "init_" + ty_info.c_ty + "(" + arr_len + ")"
    def set_native_arr_contents(self, arr_name, arr_len, ty_info):
        if ty_info.c_ty == "int8_tArray":
            return ("memcpy(" + arr_name + "->elems, ", ", " + arr_len + ")")
        else:
            assert False
    def get_native_arr_contents(self, arr_name, dest_name, arr_len, ty_info, copy):
        if ty_info.c_ty == "int8_tArray":
            if copy:
                return "memcpy(" + dest_name + ", " + arr_name + "->elems, " + arr_len + ")"
        if ty_info.c_ty == "ptrArray":
            return "(void*) " + arr_name + "->elems"
        else:
            assert not copy
            return arr_name + "->elems"
    def get_native_arr_elem(self, arr_name, idxc, ty_info):
        assert False # Only called if above is None
    def get_native_arr_ptr_call(self, ty_info):
        if ty_info.subty is not None:
            return "(" + ty_info.subty.c_ty + "*)(", " + 4)"
        return "(" + ty_info.c_ty + "*)(", " + 4)"
    def get_native_arr_entry_call(self, ty_info, arr_name, idxc, entry_access):
        return None
    def cleanup_native_arr_ref_contents(self, arr_name, dest_name, arr_len, ty_info):
        if ty_info.c_ty == "int8_tArray":
            return None
        else:
            return None

    def map_hu_array_elems(self, arr_name, conv_name, arr_ty, elem_ty):
        return arr_name + " != null ? " + arr_name + ".map(" + conv_name + " => " + elem_ty.from_hu_conv[0] + ") : null"

    def str_ref_to_native_call(self, var_name, str_len):
        return "str_ref_to_ts(" + var_name + ", " + str_len + ")"
    def str_ref_to_c_call(self, var_name):
        return "str_ref_to_owned_c(" + var_name + ")"

    def c_fn_name_define_pfx(self, fn_name, have_args):
        return " __attribute__((visibility(\"default\"))) TS_" + fn_name + "("

    def wasm_import_header(self, target):
        res = """
const imports: any = {};
imports.env = {};

imports.env.tableBase = 0;
imports.env.table = new WebAssembly.Table({initial: 4, element: 'anyfunc'});

imports.env["abort"] = function () {
	console.error("ABORT");
};
imports.env["js_invoke_function"] = function(fn: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: number, arg8: number, arg9: number, arg10: number) {
	console.log('function called from wasm:', fn, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
};
imports.env["js_free_function_ptr"] = function(fn: number) {
	console.log("function ptr free'd from wasm:", fn);
};

imports.wasi_snapshot_preview1 = {
	"fd_write" : () => {
		console.log("ABORT");
	},
	"random_get" : () => {
		console.log("RAND GET");
	},
	"environ_sizes_get" : () => {
		console.log("wasi_snapshot_preview1:environ_sizes_get");
	},
	"proc_exit" : () => {
		console.log("wasi_snapshot_preview1:proc_exit");
	},
	"environ_get" : () => {
		console.log("wasi_snapshot_preview1:environ_get");
	},
};

var wasm = null;
let isWasmInitialized: boolean = false;
"""

        if target == Target.NODEJS:
            res += """import * as fs from 'fs';
export async function initializeWasm(path) {
	const source = fs.readFileSync(path);
	const { instance: wasmInstance } = await WebAssembly.instantiate(source, imports);
	wasm = wasmInstance.exports;
	isWasmInitialized = true;
};
"""
        else:
            res += """
export async function initializeWasm(uri) {
	const stream = fetch(uri);
	const { instance: wasmInstance } = await WebAssembly.instantiateStreaming(stream, imports);
	wasm = wasmInstance.exports;
	isWasmInitialized = true;
};

"""

        return res + """


// WASM CODEC

const nextMultipleOfFour = (value: number) => {
	return Math.ceil(value / 4) * 4;
}

const encodeUint8Array = (inputArray) => {
	const cArrayPointer = wasm.TS_malloc(inputArray.length + 4);
	const arrayLengthView = new Uint32Array(wasm.memory.buffer, cArrayPointer, 1);
	arrayLengthView[0] = inputArray.length;
	const arrayMemoryView = new Uint8Array(wasm.memory.buffer, cArrayPointer + 4, inputArray.length);
	arrayMemoryView.set(inputArray);
	return cArrayPointer;
}

const encodeUint32Array = (inputArray) => {
	const cArrayPointer = wasm.TS_malloc((inputArray.length + 1) * 4);
	const arrayMemoryView = new Uint32Array(wasm.memory.buffer, cArrayPointer, inputArray.length);
	arrayMemoryView.set(inputArray, 1);
	arrayMemoryView[0] = inputArray.length;
	return cArrayPointer;
}

const getArrayLength = (arrayPointer) => {
	const arraySizeViewer = new Uint32Array(
		wasm.memory.buffer, // value
		arrayPointer, // offset
		1 // one int
	);
	return arraySizeViewer[0];
}
const decodeUint8Array = (arrayPointer, free = true) => {
	const arraySize = getArrayLength(arrayPointer);
	const actualArrayViewer = new Uint8Array(
		wasm.memory.buffer, // value
		arrayPointer + 4, // offset (ignoring length bytes)
		arraySize // uint8 count
	);
	// Clone the contents, TODO: In the future we should wrap the Viewer in a class that
	// will free the underlying memory when it becomes unreachable instead of copying here.
	const actualArray = actualArrayViewer.slice(0, arraySize);
	if (free) {
		wasm.TS_free(arrayPointer);
	}
	return actualArray;
}
const decodeUint32Array = (arrayPointer, free = true) => {
	const arraySize = getArrayLength(arrayPointer);
	const actualArrayViewer = new Uint32Array(
		wasm.memory.buffer, // value
		arrayPointer + 4, // offset (ignoring length bytes)
		arraySize // uint32 count
	);
	// Clone the contents, TODO: In the future we should wrap the Viewer in a class that
	// will free the underlying memory when it becomes unreachable instead of copying here.
	const actualArray = actualArrayViewer.slice(0, arraySize);
	if (free) {
		wasm.TS_free(arrayPointer);
	}
	return actualArray;
}

const encodeString = (string) => {
	// make malloc count divisible by 4
	const memoryNeed = nextMultipleOfFour(string.length + 1);
	const stringPointer = wasm.TS_malloc(memoryNeed);
	const stringMemoryView = new Uint8Array(
		wasm.memory.buffer, // value
		stringPointer, // offset
		string.length + 1 // length
	);
	for (let i = 0; i < string.length; i++) {
		stringMemoryView[i] = string.charCodeAt(i);
	}
	stringMemoryView[string.length] = 0;
	return stringPointer;
}

const decodeString = (stringPointer, free = true) => {
	const memoryView = new Uint8Array(wasm.memory.buffer, stringPointer);
	let cursor = 0;
	let result = '';

	while (memoryView[cursor] !== 0) {
		result += String.fromCharCode(memoryView[cursor]);
		cursor++;
	}

	if (free) {
		wasm.wasm_free(stringPointer);
	}

	return result;
};
"""

    def init_str(self):
        return ""

    def var_decl_statement(self, ty_string, var_name, statement):
        return "const " + var_name + ": " + ty_string + " = " + statement

    def for_n_in_range(self, n, minimum, maximum):
        return "for (var " + n + " = " + minimum + "; " + n + " < " + maximum + "; " + n + "++) {"
    def for_n_in_arr(self, n, arr_name, arr_elem_ty):
        return (arr_name + ".forEach((" + n + ": " + arr_elem_ty.java_hu_ty + ") => { ", " })")

    def get_ptr(self, var):
        return "CommonBase.get_ptr_of(" + var + ")"
    def set_null_skip_free(self, var):
        return "CommonBase.set_null_skip_free(" + var + ");"

    def add_ref(self, holder, referent):
        return "CommonBase.add_ref_from(" + holder + ", " + referent + ")"

    def obj_defined(self, struct_names, folder):
        with open(self.outdir + "/index.mts", 'a') as index:
            index.write(f"export * from './{folder}/{struct_names[0]}.mjs';\n")
        with open(self.outdir + "/imports.mts.part", 'a') as imports:
            imports.write(f"import {{ {', '.join(struct_names)} }} from '../{folder}/{struct_names[0]}.mjs';\n")

    def native_c_unitary_enum_map(self, struct_name, variants, enum_doc_comment):
        out_c = "static inline LDK" + struct_name + " LDK" + struct_name + "_from_js(int32_t ord) {\n"
        out_c = out_c + "\tswitch (ord) {\n"
        ord_v = 0

        out_typescript_enum_fields = ""

        for var, var_docs in variants:
            out_c = out_c + "\t\tcase %d: return %s;\n" % (ord_v, var)
            ord_v = ord_v + 1
            if var_docs is not None:
                out_typescript_enum_fields += f"/**\n * {var_docs}\n */\n"
            out_typescript_enum_fields += f"{var},\n\t\t\t\t"
        out_c = out_c + "\t}\n"
        out_c = out_c + "\tabort();\n"
        out_c = out_c + "}\n"

        out_c = out_c + "static inline int32_t LDK" + struct_name + "_to_js(LDK" + struct_name + " val) {\n"
        out_c = out_c + "\tswitch (val) {\n"
        ord_v = 0
        for var, _ in variants:
            out_c = out_c + "\t\tcase " + var + ": return %d;\n" % ord_v
            ord_v = ord_v + 1
        out_c = out_c + "\t\tdefault: abort();\n"
        out_c = out_c + "\t}\n"
        out_c = out_c + "}\n"

        out_typescript = f"""
            export enum {struct_name} {{
                {out_typescript_enum_fields}
            }}
"""
        out_typescript_enum = f"export {{ {struct_name} }} from \"../bindings.mjs\";"
        self.obj_defined([struct_name], "enums")
        return (out_c, out_typescript_enum, out_typescript)

    def c_unitary_enum_to_native_call(self, ty_info):
        return (ty_info.rust_obj + "_to_js(", ")")
    def native_unitary_enum_to_c_call(self, ty_info):
        return (ty_info.rust_obj + "_from_js(", ")")

    def c_complex_enum_pass_ty(self, struct_name):
        return "uint32_t"

    def c_constr_native_complex_enum(self, struct_name, variant, c_params):
        ret = "0 /* " + struct_name + " - " + variant + " */"
        for param in c_params:
            ret = ret + "; (void) " + param
        return ret

    def native_c_map_trait(self, struct_name, field_var_conversions, flattened_field_var_conversions, field_function_lines, trait_doc_comment):
        out_typescript_bindings = "\n\n\n// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: START\n\n"

        constructor_arguments = ""
        super_instantiator = ""
        pointer_to_adder = ""
        impl_constructor_arguments = ""
        for var in flattened_field_var_conversions:
            if isinstance(var, ConvInfo):
                constructor_arguments += f", {first_to_lower(var.arg_name)}?: {var.java_hu_ty}"
                impl_constructor_arguments += f", {var.arg_name}: {var.java_hu_ty}"
                if var.from_hu_conv is not None:
                    super_instantiator += ", " + var.from_hu_conv[0]
                    if var.from_hu_conv[1] != "":
                        pointer_to_adder += "\t\t\t" + var.from_hu_conv[1] + ";\n"
                else:
                    super_instantiator += ", " + first_to_lower(var.arg_name)
            else:
                constructor_arguments += f", {first_to_lower(var[1])}?: bindings.{var[0]}"
                super_instantiator += ", " + first_to_lower(var[1])
                pointer_to_adder += "\t\t\tthis.ptrs_to.push(" + first_to_lower(var[1]) + ");\n"
                impl_constructor_arguments += f", {first_to_lower(var[1])}_impl: {var[0].replace('LDK', '')}.{var[0].replace('LDK', '')}Interface"

        # BUILD INTERFACE METHODS
        out_java_interface = ""
        out_interface_implementation_overrides = ""
        java_methods = []
        for fn_line in field_function_lines:
            java_method_descriptor = ""
            if fn_line.fn_name != "free" and fn_line.fn_name != "cloned":
                out_java_interface += "\t" + fn_line.fn_name + "("
                out_interface_implementation_overrides += f"\t\t\t{fn_line.fn_name} ("

                for idx, arg_conv_info in enumerate(fn_line.args_ty):
                    if idx >= 1:
                        out_java_interface += ", "
                        out_interface_implementation_overrides += ", "
                    out_java_interface += f"{arg_conv_info.arg_name}: {arg_conv_info.java_hu_ty}"
                    out_interface_implementation_overrides += f"{arg_conv_info.arg_name}: {arg_conv_info.java_ty}"
                    java_method_descriptor += arg_conv_info.java_fn_ty_arg
                out_java_interface += f"): {fn_line.ret_ty_info.java_hu_ty};\n"
                java_method_descriptor += ")" + fn_line.ret_ty_info.java_fn_ty_arg
                java_methods.append((fn_line.fn_name, java_method_descriptor))

                out_interface_implementation_overrides += f"): {fn_line.ret_ty_info.java_ty} {{\n"

                for arg_info in fn_line.args_ty:
                    if arg_info.to_hu_conv is not None:
                        out_interface_implementation_overrides += "\t\t\t\t" + arg_info.to_hu_conv.replace("\n", "\n\t\t\t\t") + "\n"

                if fn_line.ret_ty_info.java_ty != "void":
                    out_interface_implementation_overrides += "\t\t\t\tconst ret: " + fn_line.ret_ty_info.java_hu_ty + " = arg." + fn_line.fn_name + "("
                else:
                    out_interface_implementation_overrides += f"\t\t\t\targ." + fn_line.fn_name + "("

                for idx, arg_info in enumerate(fn_line.args_ty):
                    if idx != 0:
                        out_interface_implementation_overrides += ", "
                    if arg_info.to_hu_conv_name is not None:
                        out_interface_implementation_overrides += arg_info.to_hu_conv_name
                    else:
                        out_interface_implementation_overrides += arg_info.arg_name

                out_interface_implementation_overrides += ");\n"
                if fn_line.ret_ty_info.java_ty != "void":
                    if fn_line.ret_ty_info.from_hu_conv is not None:
                        out_interface_implementation_overrides += "\t\t\t\t" + f"const result: {fn_line.ret_ty_info.java_ty} = " + fn_line.ret_ty_info.from_hu_conv[0].replace("\n", "\n\t\t\t\t") + ";\n"
                        if fn_line.ret_ty_info.from_hu_conv[1] != "":
                            out_interface_implementation_overrides += "\t\t\t\t" + fn_line.ret_ty_info.from_hu_conv[1].replace("this", "impl_holder.held").replace("\n", "\n\t\t\t\t") + ";\n"
                        #if fn_line.ret_ty_info.rust_obj in result_types:
                        # XXX: We need to handle this in conversion logic so that its cross-language!
                        # Avoid double-free by breaking the result - we should learn to clone these and then we can be safe instead
                        #    out_interface_implementation_overrides = out_interface_implementation_overrides + "\t\t\t\tret.ptr = 0;\n"
                        out_interface_implementation_overrides += "\t\t\t\treturn result;\n"
                    else:
                        out_interface_implementation_overrides += "\t\t\t\treturn ret;\n"
                out_interface_implementation_overrides += f"\t\t\t}},\n"

        trait_constructor_arguments = ""
        for var in field_var_conversions:
            if isinstance(var, ConvInfo):
                trait_constructor_arguments += ", " + var.arg_name
            else:
                trait_constructor_arguments += ", " + var[1] + ".new_impl(" + var[1] + "_impl"
                for suparg in var[2]:
                    if isinstance(suparg, ConvInfo):
                        trait_constructor_arguments += ", " + suparg.arg_name
                    else:
                        trait_constructor_arguments += ", " + suparg[1]
                trait_constructor_arguments += ").bindings_instance"
                for suparg in var[2]:
                    if isinstance(suparg, ConvInfo):
                        trait_constructor_arguments += ", " + suparg.arg_name
                    else:
                        trait_constructor_arguments += ", " + suparg[1]

        out_typescript_human = f"""
{self.hu_struct_file_prefix}

export interface {struct_name.replace("LDK", "")}Interface {{
{out_java_interface}}}

class {struct_name}Holder {{
	held: {struct_name.replace("LDK", "")};
}}

export class {struct_name.replace("LDK","")} extends CommonBase {{
	private bindings_instance?: bindings.{struct_name};

	constructor(ptr?: number, arg?: bindings.{struct_name}{constructor_arguments}) {{
		if (Number.isFinite(ptr)) {{
			super(ptr, bindings.{struct_name.replace("LDK","")}_free);
			this.bindings_instance = null;
		}} else {{
			// TODO: private constructor instantiation
			super(bindings.{struct_name}_new(arg{super_instantiator}), bindings.{struct_name.replace("LDK","")}_free);
			this.ptrs_to.push(arg);
{pointer_to_adder}		}}
	}}

	static new_impl(arg: {struct_name.replace("LDK", "")}Interface{impl_constructor_arguments}): {struct_name.replace("LDK", "")} {{
		const impl_holder: {struct_name}Holder = new {struct_name}Holder();
		let structImplementation = {{
{out_interface_implementation_overrides}		}} as bindings.{struct_name};
		impl_holder.held = new {struct_name.replace("LDK", "")} (null, structImplementation{trait_constructor_arguments});
		return impl_holder.held;
	}}
"""

        out_typescript_bindings += "\t\texport interface " + struct_name + " {\n"
        java_meths = []
        for fn_line in field_function_lines:
            if fn_line.fn_name != "free" and fn_line.fn_name != "cloned":
                out_typescript_bindings += f"\t\t\t{fn_line.fn_name} ("

                for idx, arg_conv_info in enumerate(fn_line.args_ty):
                    if idx >= 1:
                        out_typescript_bindings = out_typescript_bindings + ", "
                    out_typescript_bindings += f"{arg_conv_info.arg_name}: {arg_conv_info.java_ty}"

                out_typescript_bindings += f"): {fn_line.ret_ty_info.java_ty};\n"

        out_typescript_bindings = out_typescript_bindings + "\t\t}\n\n"

        out_typescript_bindings += f"\t\texport function {struct_name}_new(impl: {struct_name}"
        for var in flattened_field_var_conversions:
            if isinstance(var, ConvInfo):
                out_typescript_bindings += f", {var.arg_name}: {var.java_ty}"
            else:
                out_typescript_bindings += f", {var[1]}: {var[0]}"

        out_typescript_bindings += f"""): number {{
			throw new Error('unimplemented'); // TODO: bind to WASM
		}}
"""

        out_typescript_bindings += '\n// OUT_TYPESCRIPT_BINDINGS :: MAP_TRAIT :: END\n\n\n'

        # Now that we've written out our java code (and created java_meths), generate C
        out_c = "typedef struct " + struct_name + "_JCalls {\n"
        out_c = out_c + "\tatomic_size_t refcnt;\n"
        for var in flattened_field_var_conversions:
            if isinstance(var, ConvInfo):
                # We're a regular ol' field
                pass
            else:
                # We're a supertrait
                out_c = out_c + "\t" + var[0] + "_JCalls* " + var[1] + ";\n"
        for fn in field_function_lines:
            if fn.fn_name != "free" and fn.fn_name != "cloned":
                out_c = out_c + "\tuint32_t " + fn.fn_name + "_meth;\n"
        out_c = out_c + "} " + struct_name + "_JCalls;\n"

        for fn_line in field_function_lines:
            if fn_line.fn_name == "free":
                out_c = out_c + "static void " + struct_name + "_JCalls_free(void* this_arg) {\n"
                out_c = out_c + "\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n"
                out_c = out_c + "\tif (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {\n"
                for fn in field_function_lines:
                    if fn.fn_name != "free" and fn.fn_name != "cloned":
                        out_c = out_c + "\t\tjs_free_function_ptr(j_calls->" + fn.fn_name + "_meth);\n"
                out_c = out_c + "\t\tFREE(j_calls);\n"
                out_c = out_c + "\t}\n}\n"

        for idx, fn_line in enumerate(field_function_lines):
            if fn_line.fn_name != "free" and fn_line.fn_name != "cloned":
                assert fn_line.ret_ty_info.ty_info.get_full_rust_ty()[1] == ""
                out_c = out_c + fn_line.ret_ty_info.ty_info.get_full_rust_ty()[0] + " " + fn_line.fn_name + "_" + struct_name + "_jcall("
                if fn_line.self_is_const:
                    out_c = out_c + "const void* this_arg"
                else:
                    out_c = out_c + "void* this_arg"

                for idx, arg in enumerate(fn_line.args_ty):
                    out_c = out_c + ", " + arg.ty_info.get_full_rust_ty()[0] + " " + arg.arg_name + arg.ty_info.get_full_rust_ty()[1]

                out_c = out_c + ") {\n"
                out_c = out_c + "\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n"

                for arg_info in fn_line.args_ty:
                    if arg_info.ret_conv is not None:
                        out_c = out_c + "\t" + arg_info.ret_conv[0].replace('\n', '\n\t')
                        out_c = out_c + arg_info.arg_name
                        out_c = out_c + arg_info.ret_conv[1].replace('\n', '\n\t') + "\n"

                if fn_line.ret_ty_info.c_ty.endswith("Array"):
                    out_c += "\t" + fn_line.ret_ty_info.c_ty + " ret = (" + fn_line.ret_ty_info.c_ty + ")"
                    out_c += "js_invoke_function_" + str(len(fn_line.args_ty)) + "(j_calls->" + fn_line.fn_name + "_meth"
                elif fn_line.ret_ty_info.java_ty == "void":
                    out_c = out_c + "\tjs_invoke_function_" + str(len(fn_line.args_ty)) + "(j_calls->" + fn_line.fn_name + "_meth"
                elif fn_line.ret_ty_info.java_ty == "String":
                    out_c = out_c + "\tjstring ret = (jstring)js_invoke_function_" + str(len(fn_line.args_ty)) + "(j_calls->" + fn_line.fn_name + "_meth"
                elif not fn_line.ret_ty_info.passed_as_ptr:
                    out_c = out_c + "\treturn js_invoke_function_" + str(len(fn_line.args_ty)) + "(j_calls->" + fn_line.fn_name + "_meth"
                else:
                    out_c = out_c + "\tuint32_t ret = js_invoke_function_" + str(len(fn_line.args_ty)) + "(j_calls->" + fn_line.fn_name + "_meth"

                for idx, arg_info in enumerate(fn_line.args_ty):
                    if arg_info.ret_conv is not None:
                        out_c = out_c + ", (uint32_t)" + arg_info.ret_conv_name
                    else:
                        out_c = out_c + ", (uint32_t)" + arg_info.arg_name
                out_c = out_c + ");\n"
                if fn_line.ret_ty_info.arg_conv is not None:
                    out_c = out_c + "\t" + fn_line.ret_ty_info.arg_conv.replace("\n", "\n\t") + "\n\treturn " + fn_line.ret_ty_info.arg_conv_name + ";\n"

                out_c = out_c + "}\n"

        # Write out a clone function whether we need one or not, as we use them in moving to rust
        out_c = out_c + "static void " + struct_name + "_JCalls_cloned(" + struct_name + "* new_obj) {\n"
        out_c = out_c + "\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) new_obj->this_arg;\n"
        out_c = out_c + "\tatomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);\n"
        for var in field_var_conversions:
            if not isinstance(var, ConvInfo):
                out_c = out_c + "\tatomic_fetch_add_explicit(&j_calls->" + var[1] + "->refcnt, 1, memory_order_release);\n"
        out_c = out_c + "}\n"

        out_c = out_c + "static inline " + struct_name + " " + struct_name + "_init (/*TODO: JS Object Reference */void* o"
        for var in flattened_field_var_conversions:
            if isinstance(var, ConvInfo):
                out_c = out_c + ", " + var.c_ty + " " + var.arg_name
            else:
                out_c = out_c + ", /*TODO: JS Object Reference */void* " + var[1]
        out_c = out_c + ") {\n"

        out_c = out_c + "\t" + struct_name + "_JCalls *calls = MALLOC(sizeof(" + struct_name + "_JCalls), \"" + struct_name + "_JCalls\");\n"
        out_c = out_c + "\tatomic_init(&calls->refcnt, 1);\n"
        out_c = out_c + "\t//TODO: Assign calls->o from o\n"

        for (fn_name, java_meth_descr) in java_meths:
            if fn_name != "free" and fn_name != "cloned":
                out_c = out_c + "\tcalls->" + fn_name + "_meth = (*env)->GetMethodID(env, c, \"" + fn_name + "\", \"" + java_meth_descr + "\");\n"
                out_c = out_c + "\tCHECK(calls->" + fn_name + "_meth != NULL);\n"

        for var in flattened_field_var_conversions:
            if isinstance(var, ConvInfo) and var.arg_conv is not None:
                out_c = out_c + "\n\t" + var.arg_conv.replace("\n", "\n\t") +"\n"
        out_c = out_c + "\n\t" + struct_name + " ret = {\n"
        out_c = out_c + "\t\t.this_arg = (void*) calls,\n"
        for fn_line in field_function_lines:
            if fn_line.fn_name != "free" and fn_line.fn_name != "cloned":
                out_c = out_c + "\t\t." + fn_line.fn_name + " = " + fn_line.fn_name + "_" + struct_name + "_jcall,\n"
            elif fn_line.fn_name == "free":
                out_c = out_c + "\t\t.free = " + struct_name + "_JCalls_free,\n"
            else:
                out_c = out_c + "\t\t.cloned = " + struct_name + "_JCalls_cloned,\n"
        for var in field_var_conversions:
            if isinstance(var, ConvInfo):
                if var.arg_conv_name is not None:
                    out_c = out_c + "\t\t." + var.arg_name + " = " + var.arg_conv_name + ",\n"
                    out_c = out_c + "\t\t.set_" + var.arg_name + " = NULL,\n"
                else:
                    out_c = out_c + "\t\t." + var.var_name + " = " + var.var_name + ",\n"
                    out_c = out_c + "\t\t.set_" + var.var_name + " = NULL,\n"
            else:
                out_c += "\t\t." + var[1] + " = " + var[0] + "_init(" + var[1]
                for suparg in var[2]:
                    if isinstance(suparg, ConvInfo):
                        out_c += ", " + suparg.arg_name
                    else:
                        out_c += ", " + suparg[1]
                out_c += "),\n"
        out_c = out_c + "\t};\n"
        for var in flattened_field_var_conversions:
            if not isinstance(var, ConvInfo):
                out_c = out_c + "\tcalls->" + var[1] + " = ret." + var[1] + ".this_arg;\n"
        out_c = out_c + "\treturn ret;\n"
        out_c = out_c + "}\n"

        out_c = out_c + self.c_fn_ty_pfx + "long " + self.c_fn_name_define_pfx(struct_name + "_new", True) + "/*TODO: JS Object Reference */void* o"
        for var in flattened_field_var_conversions:
            if isinstance(var, ConvInfo):
                out_c = out_c + ", " + var.c_ty + " " + var.arg_name
            else:
                out_c = out_c + ", /*TODO: JS Object Reference */ void* " + var[1]
        out_c = out_c + ") {\n"
        out_c = out_c + "\t" + struct_name + " *res_ptr = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n"
        out_c = out_c + "\t*res_ptr = " + struct_name + "_init(o"
        for var in flattened_field_var_conversions:
            if isinstance(var, ConvInfo):
                out_c = out_c + ", " + var.arg_name
            else:
                out_c = out_c + ", " + var[1]
        out_c = out_c + ");\n"
        out_c = out_c + "\treturn (long)res_ptr;\n"
        out_c = out_c + "}\n"

        return (out_typescript_bindings, out_typescript_human, out_c)

    def trait_struct_inc_refcnt(self, ty_info):
        return ""

    def map_complex_enum(self, struct_name, variant_list, camel_to_snake, enum_doc_comment):
        bindings_type = struct_name.replace("LDK", "")
        java_hu_type = struct_name.replace("LDK", "").replace("COption", "Option")

        out_java_enum = ""
        out_java = ""
        out_c = ""

        out_java_enum += (self.hu_struct_file_prefix)

        java_hu_class = ""
        java_hu_class += "export class " + java_hu_type + " extends CommonBase {\n"
        java_hu_class += "\tprotected constructor(_dummy: object, ptr: number) { super(ptr, bindings." + bindings_type + "_free); }\n"
        java_hu_class += "\t/* @internal */\n"
        java_hu_class += f"\tpublic static constr_from_ptr(ptr: number): {java_hu_type} {{\n"
        java_hu_class += f"\t\tconst raw_val: bindings.{struct_name} = bindings." + struct_name + "_ref_from_ptr(ptr);\n"
        java_hu_subclasses = ""

        out_java += "\texport class " + struct_name + " {\n"
        out_java += "\t\tprotected constructor() {}\n"
        java_subclasses = ""
        for var in variant_list:
            java_subclasses += "\texport class " + struct_name + "_" + var.var_name + " extends " + struct_name + " {\n"
            java_hu_subclasses = java_hu_subclasses + "export class " + java_hu_type + "_" + var.var_name + " extends " + java_hu_type + " {\n"
            java_hu_class += "\t\tif (raw_val instanceof bindings." + struct_name + "_" + var.var_name + ") {\n"
            java_hu_class += "\t\t\treturn new " + java_hu_type + "_" + var.var_name + "(ptr, raw_val);\n"
            init_meth_params = ""
            hu_conv_body = ""
            for idx, (field_ty, field_docs) in enumerate(var.fields):
                java_hu_subclasses = java_hu_subclasses + "\tpublic " + field_ty.arg_name + f": {field_ty.java_hu_ty};\n"
                if field_ty.to_hu_conv is not None:
                    hu_conv_body = hu_conv_body + "\t\tconst " + field_ty.arg_name + f": {field_ty.java_ty} = obj." + field_ty.arg_name + ";\n"
                    hu_conv_body = hu_conv_body + "\t\t" + field_ty.to_hu_conv.replace("\n", "\n\t\t\t") + "\n"
                    hu_conv_body = hu_conv_body + "\t\tthis." + field_ty.arg_name + " = " + field_ty.to_hu_conv_name + ";\n"
                else:
                    hu_conv_body = hu_conv_body + "\t\tthis." + field_ty.arg_name + " = obj." + field_ty.arg_name + ";\n"
                if idx > 0:
                    init_meth_params += ", "
                init_meth_params += "public " + field_ty.arg_name + ": " + field_ty.java_ty
            java_subclasses += "\t\tconstructor(" + init_meth_params + ") { super(); }\n"
            java_subclasses += "\t}\n"
            java_hu_class += "\t\t}\n"
            java_hu_subclasses += "\t/* @internal */\n"
            java_hu_subclasses += "\tpublic constructor(ptr: number, obj: bindings." + struct_name + "_" + var.var_name + ") {\n\t\tsuper(null, ptr);\n"
            java_hu_subclasses = java_hu_subclasses + hu_conv_body
            java_hu_subclasses = java_hu_subclasses + "\t}\n}\n"
        out_java += ("\t}\n")
        out_java += java_subclasses
        java_hu_class += "\t\tthrow new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface\n\t}\n\n"
        out_java += self.fn_call_body(struct_name + "_ref_from_ptr", "uint32_t", "number", "ptr: number", "ptr")

        out_c += (self.c_fn_ty_pfx + self.c_complex_enum_pass_ty(struct_name) + self.c_fn_name_define_pfx(struct_name + "_ref_from_ptr", True) + self.ptr_c_ty + " ptr) {\n")
        out_c += ("\t" + struct_name + " *obj = (" + struct_name + "*)(ptr & ~1);\n")
        out_c += ("\tswitch(obj->tag) {\n")
        for var in variant_list:
            out_c += ("\t\tcase " + struct_name + "_" + var.var_name + ": {\n")
            c_params = []
            for idx, (field_map, _) in enumerate(var.fields):
                if field_map.ret_conv is not None:
                    out_c += ("\t\t\t" + field_map.ret_conv[0].replace("\n", "\n\t\t\t"))
                    if var.tuple_variant:
                        out_c += "obj->" + camel_to_snake(var.var_name)
                    else:
                        out_c += "obj->" + camel_to_snake(var.var_name) + "." + field_map.arg_name
                    out_c += (field_map.ret_conv[1].replace("\n", "\n\t\t\t") + "\n")
                    c_params.append(field_map.ret_conv_name)
                else:
                    if var.tuple_variant:
                        c_params.append("obj->" + camel_to_snake(var.var_name))
                    else:
                        c_params.append("obj->" + camel_to_snake(var.var_name) + "." + field_map.arg_name)
            out_c += ("\t\t\treturn " + self.c_constr_native_complex_enum(struct_name, var.var_name, c_params) + ";\n")
            out_c += ("\t\t}\n")
        out_c += ("\t\tdefault: abort();\n")
        out_c += ("\t}\n}\n")
        out_java_enum += java_hu_class
        self.struct_file_suffixes[java_hu_type] = java_hu_subclasses
        self.obj_defined([java_hu_type], "structs")
        return (out_java, out_java_enum, out_c)

    def map_opaque_struct(self, struct_name, struct_doc_comment):
        implementations = ""
        method_header = ""
        if struct_name.startswith("LDKLocked"):
            return "NOT IMPLEMENTED"

        hu_name = struct_name.replace("LDKC2Tuple", "TwoTuple").replace("LDKC3Tuple", "ThreeTuple").replace("LDK", "")
        out_opaque_struct_human = f"""{self.hu_struct_file_prefix}

export class {hu_name} extends CommonBase {implementations}{{
	/* @internal */
	public constructor(_dummy: object, ptr: number) {{
		super(ptr, bindings.{struct_name.replace("LDK","")}_free);
	}}

"""
        self.obj_defined([hu_name], "structs")
        return out_opaque_struct_human

    def map_tuple(self, struct_name):
        return self.map_opaque_struct(struct_name, "A Tuple")

    def map_result(self, struct_name, res_map, err_map):
        human_ty = struct_name.replace("LDKCResult", "Result")

        suffixes = f"export class {human_ty}_OK extends {human_ty} {{\n"
        if res_map.java_hu_ty != "void":
            suffixes += "\tpublic res: " + res_map.java_hu_ty + ";\n"
        suffixes += f"""
	/* @internal */
	public constructor(_dummy: object, ptr: number) {{
		super(_dummy, ptr);
"""
        if res_map.java_hu_ty == "void":
            pass
        elif res_map.to_hu_conv is not None:
            suffixes += "\t\tconst res: " + res_map.java_ty + " = bindings." + struct_name.replace("LDK", "") + "_get_ok(ptr);\n"
            suffixes += "\t\t" + res_map.to_hu_conv.replace("\n", "\n\t\t")
            suffixes += "\n\t\tthis.res = " + res_map.to_hu_conv_name + ";\n"
        else:
            suffixes += "\t\tthis.res = bindings." + struct_name.replace("LDK", "") + "_get_ok(ptr);\n"
        suffixes += "\t}\n}\n"

        suffixes += f"export class {human_ty}_Err extends {human_ty} {{\n"
        if err_map.java_hu_ty != "void":
            suffixes += "\tpublic err: " + err_map.java_hu_ty + ";\n"
        suffixes += f"""
	/* @internal */
	public constructor(_dummy: object, ptr: number) {{
		super(_dummy, ptr);
"""
        if err_map.java_hu_ty == "void":
            pass
        elif err_map.to_hu_conv is not None:
            suffixes += "\t\tconst err: " + err_map.java_ty + " = bindings." + struct_name.replace("LDK", "") + "_get_err(ptr);\n"
            suffixes += "\t\t" + err_map.to_hu_conv.replace("\n", "\n\t\t")
            suffixes += "\n\t\tthis.err = " + err_map.to_hu_conv_name + ";\n"
        else:
            suffixes += "\t\tthis.err = bindings." + struct_name.replace("LDK", "") + "_get_err(ptr);\n"
        suffixes += "\t}\n}"

        self.struct_file_suffixes[human_ty] = suffixes
        self.obj_defined([human_ty], "structs")

        return f"""{self.hu_struct_file_prefix}

export class {human_ty} extends CommonBase {{
	protected constructor(_dummy: object, ptr: number) {{
		super(ptr, bindings.{struct_name.replace("LDK","")}_free);
	}}
	/* @internal */
	public static constr_from_ptr(ptr: number): {human_ty} {{
		if (bindings.{struct_name.replace("LDK", "")}_is_ok(ptr)) {{
			return new {human_ty}_OK(null, ptr);
		}} else {{
			return new {human_ty}_Err(null, ptr);
		}}
	}}
"""

    def fn_call_body(self, method_name, return_c_ty, return_java_ty, method_argument_string, native_call_argument_string):
        has_return_value = return_c_ty != 'void'
        needs_decoding = return_c_ty in self.wasm_decoding_map
        return_statement = 'return nativeResponseValue;'
        if not has_return_value:
            return_statement = '// debug statements here'
        elif needs_decoding:
            converter = self.wasm_decoding_map[return_c_ty]
            return_statement = f"return {converter}(nativeResponseValue);"

        return f"""\texport function {method_name}({method_argument_string}): {return_java_ty} {{
		if(!isWasmInitialized) {{
			throw new Error("initializeWasm() must be awaited first!");
		}}
		const nativeResponseValue = wasm.TS_{method_name}({native_call_argument_string});
		{return_statement}
	}}
"""
    def map_function(self, argument_types, c_call_string, method_name, meth_n, return_type_info, struct_meth, default_constructor_args, takes_self, takes_self_as_ref, args_known, type_mapping_generator, doc_comment):
        out_java = ""
        out_c = ""
        out_java_struct = None

        out_java += ("\t")
        out_c += (self.c_fn_ty_pfx)
        out_c += (return_type_info.c_ty)
        out_java += (return_type_info.java_ty)
        if return_type_info.ret_conv is not None:
            ret_conv_pfx, ret_conv_sfx = return_type_info.ret_conv
        out_java += (" " + method_name + "(")
        out_c += (" "  + self.c_fn_name_define_pfx(method_name, True))

        method_argument_string = ""
        native_call_argument_string = ""
        for idx, arg_conv_info in enumerate(argument_types):
            if idx != 0:
                method_argument_string += (", ")
                native_call_argument_string += ', '
                out_c += (", ")
            if arg_conv_info.c_ty != "void":
                out_c += (arg_conv_info.c_ty + " " + arg_conv_info.arg_name)
                needs_encoding = arg_conv_info.c_ty in self.wasm_encoding_map
                native_argument = arg_conv_info.arg_name
                if needs_encoding:
                    converter = self.wasm_encoding_map[arg_conv_info.c_ty]
                    native_argument = f"{converter}({arg_conv_info.arg_name})"
                method_argument_string += f"{arg_conv_info.arg_name}: {arg_conv_info.java_ty}"
                native_call_argument_string += native_argument
        out_java = self.fn_call_body(method_name, return_type_info.c_ty, return_type_info.java_ty, method_argument_string, native_call_argument_string)

        out_java_struct = ""
        if not args_known:
            out_java_struct += ("\t// Skipped " + method_name + "\n")
        else:
            if not takes_self:
                out_java_struct += (
                        "\tpublic static constructor_" + meth_n + "(")
            else:
                out_java_struct += ("\tpublic " + meth_n + "(")
            for idx, arg in enumerate(argument_types):
                if idx != 0:
                    if not takes_self or idx > 1:
                        out_java_struct += (", ")
                elif takes_self:
                    continue
                if arg.java_ty != "void":
                    if arg.arg_name in default_constructor_args:
                        for explode_idx, explode_arg in enumerate(default_constructor_args[arg.arg_name]):
                            if explode_idx != 0:
                                out_java_struct += (", ")
                            out_java_struct += arg.arg_name + "_" + explode_arg.arg_name + ": " + explode_arg.java_hu_ty
                    else:
                        out_java_struct += arg.arg_name + ": " + arg.java_hu_ty

        out_c += (") {\n")
        if out_java_struct is not None:
            out_java_struct += "): " + return_type_info.java_hu_ty + " {\n"
        for info in argument_types:
            if info.arg_conv is not None:
                out_c += ("\t" + info.arg_conv.replace('\n', "\n\t") + "\n")
        if return_type_info.ret_conv is not None:
            out_c += ("\t" + ret_conv_pfx.replace('\n', '\n\t'))
        elif return_type_info.c_ty != "void":
            out_c += ("\t" + return_type_info.c_ty + " ret_val = ")
        else:
            out_c += ("\t")
        if c_call_string is None:
            out_c += (method_name + "(")
        else:
            out_c += (c_call_string)
        for idx, info in enumerate(argument_types):
            if info.arg_conv_name is not None:
                if idx != 0:
                    out_c += (", ")
                elif c_call_string is not None:
                    continue
                out_c += (info.arg_conv_name)
        out_c += (")")
        if return_type_info.ret_conv is not None:
            out_c += (ret_conv_sfx.replace('\n', '\n\t'))
        else:
            out_c += (";")
        for info in argument_types:
            if info.arg_conv_cleanup is not None:
                out_c += ("\n\t" + info.arg_conv_cleanup.replace("\n", "\n\t"))
        if return_type_info.ret_conv is not None:
            out_c += ("\n\treturn " + return_type_info.ret_conv_name + ";")
        elif return_type_info.c_ty != "void":
            out_c += ("\n\treturn ret_val;")
        out_c += ("\n}\n\n")

        if args_known:
            out_java_struct += ("\t\t")
            if return_type_info.java_ty != "void":
                out_java_struct += "const ret: " + return_type_info.java_ty + " = "
            out_java_struct += ("bindings." + method_name + "(")
            for idx, info in enumerate(argument_types):
                if idx != 0:
                    out_java_struct += (", ")
                if idx == 0 and takes_self:
                    out_java_struct += ("this.ptr")
                elif info.arg_name in default_constructor_args:
                    out_java_struct += ("bindings." + info.java_hu_ty + "_new(")
                    for explode_idx, explode_arg in enumerate(default_constructor_args[info.arg_name]):
                        if explode_idx != 0:
                            out_java_struct += (", ")
                        expl_arg_name = info.arg_name + "_" + explode_arg.arg_name
                        if explode_arg.from_hu_conv is not None:
                            out_java_struct += (
                                explode_arg.from_hu_conv[0].replace(explode_arg.arg_name, expl_arg_name))
                        else:
                            out_java_struct += (expl_arg_name)
                    out_java_struct += (")")
                elif info.from_hu_conv is not None:
                    out_java_struct += (info.from_hu_conv[0])
                else:
                    out_java_struct += (info.arg_name)
            out_java_struct += (");\n")
            if return_type_info.to_hu_conv is not None:
                if not takes_self:
                    out_java_struct += ("\t\t" + return_type_info.to_hu_conv.replace("\n", "\n\t\t").replace("this",
                                                                                                             return_type_info.to_hu_conv_name) + "\n")
                else:
                    out_java_struct += ("\t\t" + return_type_info.to_hu_conv.replace("\n", "\n\t\t") + "\n")

            for idx, info in enumerate(argument_types):
                if idx == 0 and takes_self:
                    pass
                elif info.arg_name in default_constructor_args:
                    for explode_arg in default_constructor_args[info.arg_name]:
                        expl_arg_name = info.arg_name + "_" + explode_arg.arg_name
                        if explode_arg.from_hu_conv is not None and return_type_info.to_hu_conv_name:
                            out_java_struct += ("\t\t" + explode_arg.from_hu_conv[1].replace(explode_arg.arg_name,
                                                                                             expl_arg_name).replace(
                                "this", return_type_info.to_hu_conv_name) + ";\n")
                elif info.from_hu_conv is not None and info.from_hu_conv[1] != "":
                    if not takes_self and return_type_info.to_hu_conv_name is not None:
                        out_java_struct += (
                                "\t\t" + info.from_hu_conv[1].replace("this", return_type_info.to_hu_conv_name).replace("\n", "\n\t\t") + ";\n")
                    else:
                        out_java_struct += ("\t\t" + info.from_hu_conv[1].replace("\n", "\n\t\t") + ";\n")

            if return_type_info.to_hu_conv_name is not None:
                out_java_struct += ("\t\treturn " + return_type_info.to_hu_conv_name + ";\n")
            elif return_type_info.java_ty != "void" and return_type_info.rust_obj != "LDK" + struct_meth:
                out_java_struct += ("\t\treturn ret;\n")
            out_java_struct += ("\t}\n\n")

        return (out_java, out_c, out_java_struct)

    def cleanup(self):
        for struct in self.struct_file_suffixes:
            with open(self.outdir + "/structs/" + struct + self.file_ext, "a") as src:
                src.write(self.struct_file_suffixes[struct])
