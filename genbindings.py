#!/usr/bin/env python3
import os, sys, re, subprocess

if len(sys.argv) < 8:
    print("USAGE: /path/to/lightning.h /path/to/bindings/output /path/to/bindings/ /path/to/bindings/output.c debug lang target-tuple")
    sys.exit(1)

if sys.argv[5] == "false":
    DEBUG = False
elif sys.argv[5] == "true":
    DEBUG = True
else:
    print("debug should be true or false and indicates whether to track allocations and ensure we don't leak")
    sys.exit(1)

target = None
if sys.argv[6] == "java" or sys.argv[6] == "android":
    import java_strings
    from java_strings import Consts
    target = java_strings.Target.JAVA
    if sys.argv[6] == "android":
        target = java_strings.Target.ANDROID
    if "apple" in sys.argv[8]:
        target = java_strings.Target.MACOS
elif sys.argv[6] == "typescript":
    import typescript_strings
    from typescript_strings import Consts
    target = typescript_strings.Target.NODEJS
    if len(sys.argv) == 8 and sys.argv[7] == 'browser':
        target = typescript_strings.Target.BROWSER
elif sys.argv[6].startswith("c_sharp"):
    import csharp_strings
    from csharp_strings import Consts
    if sys.argv[6] == "c_sharp-win":
        target = csharp_strings.Target.WINDOWS
    elif sys.argv[6] == "c_sharp-darwin":
        target = csharp_strings.Target.PTHREAD
    elif sys.argv[6] == "c_sharp-linux":
        target = csharp_strings.Target.LINUX
    else:
        assert False
elif sys.argv[6] == "python":
    import python_strings
    from python_strings import Consts
    target = python_strings.Target.PYTHON
else:
    print("Only java, typescript, python, or c_sharp can be set for lang")
    sys.exit(1)

consts = Consts(DEBUG, target=target, outdir=sys.argv[4])

local_git_version = os.getenv("LDK_GARBAGECOLLECTED_GIT_OVERRIDE")
if local_git_version is None:
    local_git_version = subprocess.check_output(["git", "describe", '--tag', '--dirty']).decode("utf-8").strip()

from bindingstypes import *

c_file = ""
def write_c(s):
    global c_file
    c_file += s

def camel_to_snake(s):
    # Convert camel case to snake case, in a way that appears to match cbindgen
    con = "_"
    ret = ""
    lastchar = ""
    lastund = False
    for char in s:
        if lastchar.isupper():
            if not char.isupper() and not lastund:
                ret = ret + "_"
                lastund = True
            else:
                lastund = False
            ret = ret + lastchar.lower()
        else:
            ret = ret + lastchar
            if char.isupper() and not lastund:
                ret = ret + "_"
                lastund = True
            else:
                lastund = False
        lastchar = char
        if char.isnumeric():
            lastund = True
    return (ret + lastchar.lower()).strip("_")

def doc_to_field_nullable(doc):
    if doc is None:
        return False
    for line in doc.splitlines():
        if "Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None" in line:
            return True
    return False

def doc_to_params_ret_nullable(doc):
    if doc is None:
        return (set(), False)
    params = set()
    ret_null = False
    for line in doc.splitlines():
        if "may be NULL or all-0s to represent None" not in line:
            continue
        if "Note that the return value" in line:
            ret_null = True
        elif "Note that " in line:
            param = line.split("Note that ")[1].split(" ")[0]
            params.add(param)
    return (params, ret_null)

unitary_enums = set()
# Map from enum name to "contains trait object"
complex_enums = {}
opaque_structs = set()
trait_structs = {}
result_types = set()
tuple_types = {}

var_is_arr_regex = re.compile("\(\* ?([A-za-z0-9_]*)\)\[([a-z0-9]*)\]")
var_ty_regex = re.compile("([A-za-z_0-9]*)(.*)")
java_c_types_none_allowed = True # Unset when we do the real pass that populates the above sets
def java_c_types(fn_arg, ret_arr_len):
    fn_arg = fn_arg.strip()
    if fn_arg.startswith("MUST_USE_RES "):
        fn_arg = fn_arg[13:]
    is_const = False
    if fn_arg.startswith("const "):
        fn_arg = fn_arg[6:]
        is_const = True
    if fn_arg.startswith("struct "):
        fn_arg = fn_arg[7:]
    if fn_arg.startswith("enum "):
        fn_arg = fn_arg[5:]
    nonnull_ptr = "NONNULL_PTR" in fn_arg
    fn_arg = fn_arg.replace("NONNULL_PTR", "")

    is_ptr = False
    take_by_ptr = False
    rust_obj = None
    arr_access = None
    java_hu_ty = None
    if fn_arg.startswith("LDKThirtyTwoBytes"):
        fn_arg = "uint8_t (*" + fn_arg[18:] + ")[32]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKThirtyTwoBytes"
        arr_access = "data"
    elif fn_arg.startswith("LDKThirtyTwoU16s"):
        fn_arg = "uint16_t (*" + fn_arg[17:] + ")[32]"
        assert var_is_arr_regex.match(fn_arg[9:])
        rust_obj = "LDKThirtyTwoU16s"
        arr_access = "data"
    elif fn_arg.startswith("LDKU128"):
        if fn_arg == "LDKU128":
            fn_arg = "LDKU128 arg"
        if fn_arg.startswith("LDKU128*") or fn_arg.startswith("LDKU128 *"):
            fn_arg = "uint8_t (" + fn_arg[8:] + ")[16]"
        else:
            fn_arg = "uint8_t (*" + fn_arg[8:] + ")[16]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKU128"
        arr_access = "le_bytes"
    elif fn_arg.startswith("LDKPublicKey"):
        fn_arg = "uint8_t (*" + fn_arg[13:] + ")[33]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKPublicKey"
        arr_access = "compressed_form"
    elif fn_arg.startswith("LDKSecretKey"):
        fn_arg = "uint8_t (*" + fn_arg[13:] + ")[32]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKSecretKey"
        arr_access = "bytes"
    elif fn_arg.startswith("LDKECDSASignature"):
        fn_arg = "uint8_t (*" + fn_arg[18:] + ")[64]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKECDSASignature"
        arr_access = "compact_form"
    elif fn_arg.startswith("LDKSchnorrSignature"):
        fn_arg = "uint8_t (*" + fn_arg[20:] + ")[64]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKSchnorrSignature"
        arr_access = "compact_form"
    elif fn_arg.startswith("LDKRecoverableSignature"):
        fn_arg = "uint8_t (*" + fn_arg[24:] + ")[68]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKRecoverableSignature"
        arr_access = "serialized_form"
    elif fn_arg.startswith("LDKThreeBytes"):
        fn_arg = "uint8_t (*" + fn_arg[14:] + ")[3]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKThreeBytes"
        arr_access = "data"
    elif fn_arg.startswith("LDKFourBytes"):
        fn_arg = "uint8_t (*" + fn_arg[13:] + ")[4]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKFourBytes"
        arr_access = "data"
    elif fn_arg.startswith("LDKSixteenBytes"):
        fn_arg = "uint8_t (*" + fn_arg[16:] + ")[16]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKSixteenBytes"
        arr_access = "data"
    elif fn_arg.startswith("LDKTwentyBytes"):
        fn_arg = "uint8_t (*" + fn_arg[15:] + ")[20]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKTwentyBytes"
        arr_access = "data"
    elif fn_arg.startswith("LDKTwelveBytes"):
        fn_arg = "uint8_t (*" + fn_arg[15:] + ")[12]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKTwelveBytes"
        arr_access = "data"
    elif fn_arg.startswith("LDKu8slice"):
        fn_arg = "uint8_t (*" + fn_arg[11:] + ")[datalen]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKu8slice"
        arr_access = "data"
    elif fn_arg.startswith("LDKCVec_u8Z"):
        fn_arg = "uint8_t (*" + fn_arg[12:] + ")[datalen]"
        rust_obj = "LDKCVec_u8Z"
        assert var_is_arr_regex.match(fn_arg[8:])
        arr_access = "data"
    elif fn_arg.startswith("LDKTransaction ") or fn_arg == "LDKTransaction":
        fn_arg = "uint8_t (*" + fn_arg[15:] + ")[datalen]"
        rust_obj = "LDKTransaction"
        assert var_is_arr_regex.match(fn_arg[8:])
        arr_access = "data"
    elif fn_arg.startswith("LDKTransactionOutputs "):
        fn_arg = "C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ"
        rust_obj = "C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ"
    elif fn_arg.startswith("LDKWitness ") or fn_arg == "LDKWitness":
        if len(fn_arg) > 12 and fn_arg[11] == "*":
            fn_arg = "uint8_t (" + fn_arg[11:] + ")[datalen]"
        else:
            fn_arg = "uint8_t (*" + fn_arg[11:] + ")[datalen]"
        rust_obj = "LDKWitness"
        assert var_is_arr_regex.match(fn_arg[8:])
        arr_access = "data"
    elif fn_arg.startswith("LDKCVec_"):
        is_ptr = False
        if "*" in fn_arg:
            fn_arg = fn_arg.replace("*", "")
            is_ptr = True

        tyn = fn_arg[8:].split(" ")
        assert tyn[0].endswith("Z")
        if tyn[0] == "u64Z":
            new_arg = "uint64_t"
        else:
            new_arg = "LDK" + tyn[0][:-1]
        for a in tyn[1:]:
            new_arg = new_arg + " " + a
        res = java_c_types(new_arg, ret_arr_len)
        if res is None:
            assert java_c_types_none_allowed
            return None
        if is_ptr:
            res.pass_by_ref = True
        java_ty = consts.java_arr_ty_str(res.java_ty)
        if res.is_native_primitive or res.passed_as_ptr:
            return TypeInfo(rust_obj=fn_arg.split(" ")[0], java_ty=java_ty, java_hu_ty=res.java_hu_ty + "[]",
                java_fn_ty_arg="[" + res.java_fn_ty_arg, c_ty=res.c_ty + "Array", passed_as_ptr=False, is_ptr=is_ptr,
                nonnull_ptr=nonnull_ptr, is_const=is_const,
                var_name=res.var_name, arr_len="datalen", arr_access="data", subty=res, is_native_primitive=False)
        else:
            return TypeInfo(rust_obj=fn_arg.split(" ")[0], java_ty=java_ty, java_hu_ty=res.java_hu_ty + "[]",
                java_fn_ty_arg="[" + res.java_fn_ty_arg, c_ty=consts.ptr_arr, passed_as_ptr=False, is_ptr=is_ptr,
                nonnull_ptr=nonnull_ptr, is_const=is_const,
                var_name=res.var_name, arr_len="datalen", arr_access="data", subty=res, is_native_primitive=False)

    is_primitive = False
    contains_trait = False
    arr_len = None
    mapped_type = []
    java_type_plural = None
    arr_ty = None
    if fn_arg.startswith("void"):
        java_ty = "void"
        c_ty = "void"
        fn_ty_arg = "V"
        fn_arg = fn_arg[4:].strip()
        is_primitive = True
    elif fn_arg.startswith("bool"):
        java_ty = consts.c_type_map['bool'][0]
        c_ty = "jboolean"
        fn_ty_arg = "Z"
        arr_ty = "bool"
        fn_arg = fn_arg[4:].strip()
        is_primitive = True
    elif fn_arg.startswith("uint8_t"):
        mapped_type = consts.c_type_map['uint8_t']
        java_ty = mapped_type[0]
        c_ty = "int8_t"
        fn_ty_arg = "B"
        arr_ty = "uint8_t"
        fn_arg = fn_arg[7:].strip()
        is_primitive = True
    elif fn_arg.startswith("LDKU5") or fn_arg.startswith("LDKWitnessVersion"):
        java_ty = consts.c_type_map['uint8_t'][0]
        if fn_arg.startswith("LDKU5"):
            java_hu_ty = "UInt5"
            rust_obj = "LDKU5"
            fn_arg = fn_arg[6:].strip()
        else:
            java_hu_ty = "WitnessVersion"
            rust_obj = "LDKWitnessVersion"
            fn_arg = fn_arg[18:].strip()
        c_ty = "int8_t"
        arr_ty = "uint8_t"
        fn_ty_arg = "B"
    elif fn_arg.startswith("uint16_t"):
        mapped_type = consts.c_type_map['uint16_t']
        java_ty = mapped_type[0]
        c_ty = "int16_t"
        arr_ty = "uint16_t"
        fn_ty_arg = "S"
        fn_arg = fn_arg[8:].strip()
        is_primitive = True
    elif fn_arg.startswith("uint32_t"):
        mapped_type = consts.c_type_map['uint32_t']
        java_ty = mapped_type[0]
        c_ty = "int32_t"
        arr_ty = "uint32_t"
        fn_ty_arg = "I"
        fn_arg = fn_arg[8:].strip()
        is_primitive = True
    elif fn_arg.startswith("int64_t"):
        mapped_type = consts.c_type_map['int64_t']
        java_ty = mapped_type[0]
        c_ty = "int64_t"
        arr_ty = "int64_t"
        fn_ty_arg = "J"
        fn_arg = fn_arg[7:].strip()
        is_primitive = True
    elif fn_arg.startswith("double"):
        mapped_type = consts.c_type_map['double']
        java_ty = mapped_type[0]
        c_ty = "double"
        arr_ty = "double"
        fn_ty_arg = "D"
        fn_arg = fn_arg[6:].strip()
        is_primitive = True
    elif fn_arg.startswith("uint64_t") or fn_arg.startswith("uintptr_t"):
        # TODO: uintptr_t is arch-dependent :(
        mapped_type = consts.c_type_map['uint64_t']
        java_ty = mapped_type[0]
        fn_ty_arg = "J"
        if fn_arg.startswith("uint64_t"):
            c_ty = "int64_t"
            arr_ty = "uint64_t"
            fn_arg = fn_arg[8:].strip()
        else:
            java_ty = consts.usize_native_ty
            c_ty = consts.usize_c_ty
            arr_ty = "uintptr_t"
            rust_obj = "uintptr_t"
            fn_arg = fn_arg[9:].strip()
        is_primitive = True
    elif is_const and fn_arg.startswith("char *"):
        java_ty = consts.java_type_map["String"]
        java_hu_ty = consts.java_hu_type_map["String"]
        c_ty = "const char*"
        arr_ty = "LDKStr"
        fn_ty_arg = "Ljava/lang/String;"
        fn_arg = fn_arg[6:].strip()
    elif fn_arg.startswith("LDKStr") or fn_arg.startswith("LDKAddress"):
        rust_obj = "LDKStr"
        arr_ty = "LDKStr"
        java_ty = consts.java_type_map["String"]
        java_hu_ty = consts.java_hu_type_map["String"]
        c_ty = "jstring"
        fn_ty_arg = "Ljava/lang/String;"
        if fn_arg.startswith("LDKAddress"):
            fn_arg = fn_arg[10:].strip()
        else:
            fn_arg = fn_arg[6:].strip()
        arr_access = "chars"
        arr_len = "len"
    elif fn_arg.startswith("LDKError ") or fn_arg == "LDKError":
        java_ty = consts.c_type_map['uint32_t'][0]
        java_hu_ty = "UnqualifiedError"
        rust_obj = "LDKError"
        c_ty = "int32_t"
        arr_ty = "uint32_t"
        fn_ty_arg = "I"
        fn_arg = fn_arg[8:].strip()
    else:
        ma = var_ty_regex.match(fn_arg)
        arr_ty = ma.group(1).strip()
        if ma.group(1).strip() in unitary_enums:
            assert ma.group(1).strip().startswith("LDK")
            java_ty = ma.group(1).strip()[3:]
            java_hu_ty = java_ty
            c_ty = consts.unitary_enum_c_ty
            fn_ty_arg = "Lorg/ldk/enums/" + java_ty + ";"
            fn_arg = ma.group(2).strip()
            rust_obj = ma.group(1).strip()
        else:
            c_ty = consts.ptr_c_ty
            java_ty = consts.ptr_native_ty
            java_hu_ty = ma.group(1).strip()
            java_hu_ty = java_hu_ty.replace("LDKCOption", "Option")
            java_hu_ty = java_hu_ty.replace("LDKCResult", "Result")
            java_hu_ty = java_hu_ty.replace("LDKC2Tuple", "TwoTuple")
            java_hu_ty = java_hu_ty.replace("LDKC3Tuple", "ThreeTuple")
            java_hu_ty = java_hu_ty.replace("LDK", "")
            fn_ty_arg = "J"
            fn_arg = ma.group(2).strip()
            rust_obj = ma.group(1).strip()
            if rust_obj in trait_structs:
                contains_trait = True
            elif rust_obj in complex_enums:
                contains_trait = complex_enums[rust_obj]
            take_by_ptr = True

    if fn_arg.startswith(" *") or fn_arg.startswith("*"):
        fn_arg = fn_arg.replace("*", "").strip()
        is_ptr = True
        c_ty = consts.ptr_c_ty
        java_ty = consts.ptr_native_ty
        fn_ty_arg = "J"

    var_is_arr = var_is_arr_regex.match(fn_arg)
    subty = None
    if var_is_arr is not None or ret_arr_len is not None:
        assert(not take_by_ptr)
        assert(not is_ptr)
        # is there a special case for plurals?
        if len(mapped_type) == 3:
            java_ty = mapped_type[1]
            java_hu_ty = mapped_type[2]
        else:
            java_ty = java_ty + "[]"
            java_hu_ty = java_ty
        if rust_obj == "LDKU128":
            java_hu_ty = consts.u128_native_ty
        c_ty = c_ty + "Array"

        subty = java_c_types(arr_ty, None)
        if subty is None:
            assert java_c_types_none_allowed
            return None
        if is_ptr:
            subty.pass_by_ref = True

        if var_is_arr is not None:
            if var_is_arr.group(1) == "":
                return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_hu_ty, java_fn_ty_arg="[" + fn_ty_arg, c_ty=c_ty, is_const=is_const,
                    passed_as_ptr=False, is_ptr=False, nonnull_ptr=nonnull_ptr, var_name="arg", subty=subty,
                    arr_len=var_is_arr.group(2), arr_access=arr_access, is_native_primitive=False, contains_trait=contains_trait)
            return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_hu_ty, java_fn_ty_arg="[" + fn_ty_arg, c_ty=c_ty, is_const=is_const,
                passed_as_ptr=False, is_ptr=False, nonnull_ptr=nonnull_ptr, var_name=var_is_arr.group(1), subty=subty,
                arr_len=var_is_arr.group(2), arr_access=arr_access, is_native_primitive=False, contains_trait=contains_trait)

    if java_hu_ty is None:
        java_hu_ty = java_ty
    return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_hu_ty, java_fn_ty_arg=fn_ty_arg, c_ty=c_ty, passed_as_ptr=is_ptr or take_by_ptr,
        is_const=is_const, is_ptr=is_ptr, nonnull_ptr=nonnull_ptr, var_name=fn_arg, arr_len=arr_len, arr_access=arr_access, is_native_primitive=is_primitive,
        contains_trait=contains_trait, subty=subty)

fn_ptr_regex = re.compile("^extern const ([A-Za-z_0-9\* ]*) \(\*(.*)\)\((.*)\);$")
fn_ret_arr_regex = re.compile("(.*) \(\*(.*)\((.*)\)\)\[([0-9]*)\];$")
reg_fn_regex = re.compile("([A-Za-z_0-9\* ]* \*?)([a-zA-Z_0-9]*)\((.*)\);$")
clone_fns = set()
constructor_fns = {}

from gen_type_mapping import TypeMappingGenerator
type_mapping_generator = TypeMappingGenerator(java_c_types, consts, opaque_structs, clone_fns, unitary_enums, trait_structs, complex_enums, result_types, tuple_types)

with open(sys.argv[1]) as in_h:
    for line in in_h:
        reg_fn = reg_fn_regex.match(line)
        if reg_fn is not None:
            if reg_fn.group(2).endswith("_clone"):
                clone_fns.add(reg_fn.group(2))
            else:
                rty = java_c_types(reg_fn.group(1), None)
                if rty is not None and not rty.is_native_primitive and reg_fn.group(2) == rty.java_hu_ty + "_new":
                    constructor_fns[rty.rust_obj] = reg_fn.group(3)
            continue
        arr_fn = fn_ret_arr_regex.match(line)
        if arr_fn is not None:
            if arr_fn.group(2).endswith("_clone"):
                clone_fns.add(arr_fn.group(2))
            # No object constructors return arrays, as then they wouldn't be an object constructor
            continue

# Define some manual clones...
clone_fns.add("ThirtyTwoBytes_clone")
write_c("static inline struct LDKThirtyTwoBytes ThirtyTwoBytes_clone(const struct LDKThirtyTwoBytes *orig) { struct LDKThirtyTwoBytes ret; memcpy(ret.data, orig->data, 32); return ret; }\n\n")


write_c("static inline void* untag_ptr(uint64_t ptr) {\n")
write_c("\tif (ptr < 4096) return (void*)ptr;\n")
write_c("\tif (sizeof(void*) == 4) {\n")
write_c("\t\t// For 32-bit systems, store pointers as 64-bit ints and use the 31st bit\n")
write_c("\t\treturn (void*)(uintptr_t)ptr;\n")
write_c("\t} else {\n")
write_c("\t\t// For 64-bit systems, assume the top byte is used for tagging, then\n")
write_c("\t\t// use bit 9 ^ bit 10.\n")
write_c("\t\tuint64_t tenth_bit = (((uintptr_t)ptr) & (1ULL << 54)) >> 54;\n")
write_c("\t\tuintptr_t p = (ptr & ~(1ULL << 55)) | (tenth_bit << 55);\n")
write_c("#ifdef LDK_DEBUG_BUILD\n")
write_c("\t\t// On debug builds we also use the 11th bit as a debug flag\n")
write_c("\t\tuintptr_t eleventh_bit = (((uintptr_t)ptr) & (1ULL << 53)) >> 53;\n")
write_c("\t\tCHECK(tenth_bit != eleventh_bit);\n")
write_c("\t\tp ^= 1ULL << 53;\n")
write_c("#endif\n")
write_c("\t\treturn (void*)p;\n")
write_c("\t}\n")
write_c("}\n")

write_c("static inline bool ptr_is_owned(uint64_t ptr) {\n")
write_c("\tif(ptr < 4096) return true;\n")
write_c("\tif (sizeof(void*) == 4) {\n")
write_c("\t\treturn ptr & (1ULL << 32);\n")
write_c("\t} else {\n")
write_c("\t\tuintptr_t ninth_bit = (((uintptr_t)ptr) & (1ULL << 55)) >> 55;\n")
write_c("\t\tuintptr_t tenth_bit = (((uintptr_t)ptr) & (1ULL << 54)) >> 54;\n")
write_c("#ifdef LDK_DEBUG_BUILD\n")
write_c("\t\t// On debug builds we also use the 11th bit as a debug flag\n")
write_c("\t\tuintptr_t eleventh_bit = (((uintptr_t)ptr) & (1ULL << 53)) >> 53;\n")
write_c("\t\tCHECK(tenth_bit != eleventh_bit);\n")
write_c("#endif\n")
write_c("\t\treturn (ninth_bit ^ tenth_bit) ? true : false;\n")
write_c("\t}\n")
write_c("}\n")

write_c("static inline uint64_t tag_ptr(const void* ptr, bool is_owned) {\n")
write_c("\tif ((uintptr_t)ptr < 4096) return (uint64_t)ptr;\n")
write_c("\tif (sizeof(void*) == 4) {\n")
write_c("\t\treturn (((uint64_t)ptr) | ((is_owned ? 1ULL : 0) << 32));\n")
write_c("\t} else {\n")
write_c("\t\tCHECK(sizeof(uintptr_t) == 8);\n")
write_c("\t\tuintptr_t tenth_bit = (((uintptr_t)ptr) & (1ULL << 54)) >> 54;\n")
write_c("\t\tuintptr_t t = (((uintptr_t)ptr) | (((is_owned ? 1ULL : 0ULL) ^ tenth_bit) << 55));\n")
write_c("#ifdef LDK_DEBUG_BUILD\n")
write_c("\t\tuintptr_t ninth_bit = (((uintptr_t)ptr) & (1ULL << 55)) >> 55;\n")
write_c("\t\tuintptr_t eleventh_bit = (((uintptr_t)ptr) & (1ULL << 53)) >> 53;\n")
write_c("\t\tCHECK(ninth_bit == tenth_bit);\n")
write_c("\t\tCHECK(ninth_bit == eleventh_bit);\n")
write_c("\t\tt ^= 1ULL << 53;\n")
write_c("#endif\n")
write_c("\t\tCHECK(ptr_is_owned(t) == is_owned);\n")
write_c("\t\tCHECK(untag_ptr(t) == ptr);\n")
#write_c("\t\tCHECK(untag_ptr((uintptr_t)untag_ptr(t)) == ptr);\n")
write_c("\t\treturn t;\n")
write_c("\t}\n")
write_c("}\n\n")

java_c_types_none_allowed = False # C structs created by cbindgen are declared in dependency order

with open(f"{sys.argv[3]}/structs/UtilMethods{consts.file_ext}", "a") as util:
    util.write(consts.util_fn_pfx)

with open(sys.argv[1]) as in_h, open(f"{sys.argv[2]}/bindings{consts.file_ext}", "w") as out_java:
    # Map a top-level function
    def map_fn(line, re_match, ret_arr_len, c_call_string, doc_comment):
        map_fn_with_ref_option(line, re_match, ret_arr_len, c_call_string, doc_comment, False)
    def map_fn_with_ref_option(line, re_match, ret_arr_len, c_call_string, doc_comment, force_holds_ref):
        method_return_type = re_match.group(1)
        method_name = re_match.group(2)
        method_comma_separated_arguments = re_match.group(3)
        method_arguments = method_comma_separated_arguments.split(',')

        if method_name.startswith("__"):
            return

        is_free = method_name.endswith("_free")
        if method_name.startswith("COption") or method_name.startswith("CResult"):
            struct_meth = method_name.rsplit("Z", 1)[0][1:] + "Z"
            expected_struct = "LDKC" + struct_meth
            struct_meth_name = method_name[len(struct_meth) + 1:].strip("_")
        elif method_name.startswith("C2Tuple") or method_name.startswith("C3Tuple"):
            tuple_name = method_name.rsplit("Z", 1)[0][2:] + "Z"
            if method_name.startswith("C2Tuple"):
                struct_meth = "Two" + tuple_name
                expected_struct = "LDKC2" + tuple_name
            else:
                struct_meth = "Three" + tuple_name
                expected_struct = "LDKC3" + tuple_name
            struct_meth_name = method_name[len(tuple_name) + 2:].strip("_")
        else:
            struct_meth = method_name.split("_")[0]
            expected_struct = "LDK" + struct_meth
            struct_meth_name = method_name[len(struct_meth) + 1 if len(struct_meth) != 0 else 0:].strip("_")

        (params_nullable, ret_nullable) = doc_to_params_ret_nullable(doc_comment)
        if ret_nullable:
            return_type_info = type_mapping_generator.map_nullable_type(method_return_type.strip() + " ret", True, ret_arr_len, False, force_holds_ref)
        else:
            return_type_info = type_mapping_generator.map_type(method_return_type.strip() + " ret", True, ret_arr_len, False, force_holds_ref)

        if method_name.endswith("_clone") and expected_struct not in unitary_enums:
            # LDKWitness is mapped as an array, so no need to implement clone
            if expected_struct == "LDKWitness":
                return
            meth_line = "uint64_t " + expected_struct.replace("LDK", "") + "_clone_ptr(" + expected_struct + " *NONNULL_PTR arg)"
            write_c("static inline " + meth_line + " {\n")
            write_c("\t" + return_type_info.ret_conv[0].replace("\n", "\n\t"))
            write_c(method_name + "(arg)")
            write_c(return_type_info.ret_conv[1].replace("\n", "\n\t"))
            write_c("\n\treturn " + return_type_info.ret_conv_name + ";\n}\n")
            map_fn(meth_line + ";\n", re.compile("(uint64_t) ([A-Za-z_0-9]*)\((.*)\)").match(meth_line), None, None, None)

        argument_types = []
        default_constructor_args = {}
        takes_self = False
        takes_self_ptr = False

        for argument_index, argument in enumerate(method_arguments):
            arg_ty = type_mapping_generator.java_c_types(argument, None)
            argument_conversion_info = None
            if argument_index == 0 and arg_ty.java_hu_ty == struct_meth:
                argument_conversion_info = type_mapping_generator.map_type_with_info(arg_ty, False, None, is_free, True, False)
                takes_self = True
                if argument_conversion_info.ty_info.is_ptr:
                    takes_self_ptr = True
            elif arg_ty.var_name in params_nullable:
                argument_conversion_info = type_mapping_generator.map_type_with_info(arg_ty, False, None, is_free, True, True)
                if argument_conversion_info.arg_conv is not None and "WARNING" in argument_conversion_info.arg_conv:
                    arg_ty_info = java_c_types(argument, None)
                    print("WARNING: Remapping argument " + arg_ty_info.var_name + " of function " + method_name + " to a reference")
                    print("    The argument appears to require a move, or not clonable, and is nullable.")
                    print("    Normally for arguments that require a move and are not clonable, we split")
                    print("    the argument into the type's constructor's arguments and just use those to")
                    print("    construct a new object on the fly.")
                    print("    However, because the object is nullable, doing so would mean we can no")
                    print("    longer allow the user to pass null, as we now have an argument list instead.")
                    print("    Thus, we blindly assume its really an Option<&Type> instead of an Option<Type>.")
                    print("    It may or may not actually be a reference, but its the simplest mapping option")
                    print("    and also the only use of this code today.")
                    arg_ty_info.requires_clone = False
                    argument_conversion_info = type_mapping_generator.map_type_with_info(arg_ty_info, False, None, is_free, True, True)
                    assert argument_conversion_info.nullable
                    assert argument_conversion_info.arg_conv is not None and "WARNING" not in argument_conversion_info.arg_conv
            else:
                argument_conversion_info = type_mapping_generator.map_type_with_info(arg_ty, False, None, is_free, True, False)

            if argument_conversion_info.arg_conv is not None and "WARNING" in argument_conversion_info.arg_conv:
                if argument_conversion_info.rust_obj in constructor_fns:
                    assert not is_free
                    for explode_idx, explode_arg in enumerate(constructor_fns[argument_conversion_info.rust_obj].split(',')):
                        explode_arg_conv = type_mapping_generator.map_type(explode_arg, False, None, False, True)
                        if explode_idx == 0 and explode_arg_conv.c_ty == "void":
                            continue # (void) is C lingo for "no arguments)
                        if explode_arg_conv.c_ty == "void":
                            assert False
                        if not argument_conversion_info.arg_name in default_constructor_args:
                            default_constructor_args[argument_conversion_info.arg_name] = []
                        default_constructor_args[argument_conversion_info.arg_name].append(explode_arg_conv)
            argument_types.append(argument_conversion_info)

        if not takes_self and return_type_info.java_hu_ty != struct_meth:
            if not return_type_info.java_hu_ty.startswith("Result_" + struct_meth):
                struct_meth_name = method_name
                struct_meth = ""
                expected_struct = ""

        impl_on_struct = (expected_struct in opaque_structs or expected_struct in trait_structs or
            expected_struct in complex_enums or expected_struct in complex_enums or
            expected_struct in result_types or expected_struct in tuple_types) and not is_free
        impl_on_utils = not impl_on_struct and (not is_free and not method_name.endswith("_clone") and
            not method_name.startswith("TxOut") and not method_name.startswith("TxIn") and
            not method_name.startswith("BigEndianScalar") and not method_name.startswith("WitnessProgram") and
            not method_name.startswith("_") and
            method_name != "check_platform" and method_name != "Result_read" and
            not expected_struct in unitary_enums and
            ((not method_name.startswith("C2Tuple_") and not method_name.startswith("C3Tuple_"))
              or method_name.endswith("_read")))

        # If we're adding a static method, and it returns a primitive or an array of primitives,
        # and a variable conversion adds a reference on the return type (via `this`), skip the
        # variable's conversion reference-add (as we obviously cannot need a reference).
        if impl_on_utils and (return_type_info.is_native_primitive or
                (return_type_info.ty_info.subty is not None and return_type_info.ty_info.subty.is_native_primitive)):
            for arg in argument_types:
                if arg.from_hu_conv is not None and arg.from_hu_conv[1] != "":
                    if "this" in arg.from_hu_conv[1]:
                        arg.from_hu_conv = (arg.from_hu_conv[0], "")

        out_java.write("\t// " + line)
        args_known = True # We no longer ever set this to false
        (out_java_delta, out_c_delta, out_java_struct_delta) = \
            consts.map_function(argument_types, c_call_string, method_name, struct_meth_name, return_type_info, struct_meth, default_constructor_args, takes_self, takes_self_ptr, args_known, type_mapping_generator, doc_comment)
        out_java.write(out_java_delta)

        if is_free:
            assert len(argument_types) == 1
            assert return_type_info.c_ty == "void"
            write_c(consts.c_fn_ty_pfx + "void " + consts.c_fn_name_define_pfx(method_name, True) + argument_types[0].c_ty + " " + argument_types[0].ty_info.var_name + ") {\n")
            if argument_types[0].ty_info.passed_as_ptr and not argument_types[0].ty_info.rust_obj in opaque_structs:
                write_c("\tif (!ptr_is_owned(" + argument_types[0].ty_info.var_name + ")) return;\n")

            for info in argument_types:
                if info.arg_conv is not None:
                    write_c("\t" + info.arg_conv.replace('\n', "\n\t") + "\n")
            assert c_call_string is None
            write_c("\t" + method_name + "(")
            if argument_types[0].arg_conv_name is not None:
                write_c(argument_types[0].arg_conv_name)
            write_c(");")
            for info in argument_types:
                if info.arg_conv_cleanup is not None:
                    write_c("\n\t" + info.arg_conv_cleanup.replace("\n", "\n\t"))
            write_c("\n}\n\n")
        else:
            write_c(out_c_delta)

        out_java_struct = None
        if impl_on_struct:
            out_java_struct = open(f"{sys.argv[3]}/structs/{struct_meth}{consts.file_ext}", "a")
            out_java_struct.write(out_java_struct_delta)
        elif impl_on_utils:
            out_java_struct = open(f"{sys.argv[3]}/structs/UtilMethods{consts.file_ext}", "a")
            for line in out_java_struct_delta.splitlines():
                out_java_struct.write(line + "\n")

    def map_unitary_enum(struct_name, field_lines, enum_doc_comment):
        assert struct_name.startswith("LDK")
        with open(f"{sys.argv[3]}/enums/{struct_name[3:]}{consts.file_ext}", "w") as out_java_enum:
            unitary_enums.add(struct_name)
            for idx, (struct_line, _) in enumerate(field_lines):
                if idx == 0:
                    assert(struct_line == "typedef enum %s {" % struct_name)
                elif idx == len(field_lines) - 3:
                    assert(struct_line.endswith("_Sentinel,"))
                elif idx == len(field_lines) - 2:
                    assert(struct_line == "} %s;" % struct_name)
                elif idx == len(field_lines) - 1:
                    assert(struct_line == "")
            assert struct_name.startswith("LDK")
            (c_out, native_file_out, native_out) = consts.native_c_unitary_enum_map(struct_name[3:], [(x.strip().strip(","), y) for x, y in field_lines[1:-3]], enum_doc_comment)
            write_c(c_out)
            out_java_enum.write(native_file_out)
            out_java.write(native_out)

    def map_complex_enum(struct_name, union_enum_items, inline_enum_variants, enum_doc_comment):
        java_hu_type = struct_name.replace("LDK", "").replace("COption", "Option")

        enum_variants = []
        tag_field_lines = union_enum_items["field_lines"]
        contains_trait = False
        for idx, (struct_line, variant_docs) in enumerate(tag_field_lines):
            if idx == 0:
                assert(struct_line == "typedef enum %s_Tag {" % struct_name)
            elif idx == len(tag_field_lines) - 3:
                assert(struct_line.endswith("_Sentinel,"))
            elif idx == len(tag_field_lines) - 2:
                assert(struct_line == "} %s_Tag;" % struct_name)
            elif idx == len(tag_field_lines) - 1:
                assert(struct_line == "")
            else:
                variant_name = struct_line.strip(' ,')[len(struct_name) + 1:]
                fields = []
                if "LDK" + variant_name in union_enum_items:
                    enum_var_lines = union_enum_items["LDK" + variant_name]
                    for idx, (field, field_docs) in enumerate(enum_var_lines):
                        if idx != 0 and idx < len(enum_var_lines) - 2 and field.strip() != "":
                            field_ty = type_mapping_generator.java_c_types(field.strip(' ;'), None)
                            contains_trait |= field_ty.contains_trait
                            if field_docs is not None and doc_to_field_nullable(field_docs):
                                field_conv = type_mapping_generator.map_type_with_info(field_ty, False, None, False, True, True)
                            else:
                                field_conv = type_mapping_generator.map_type_with_info(field_ty, False, None, False, True, False)
                            fields.append((field_conv, field_docs))
                    enum_variants.append(ComplexEnumVariantInfo(variant_name, variant_docs, fields, False))
                elif camel_to_snake(variant_name) in inline_enum_variants:
                    # TODO: If we ever have a rust enum Variant(Option<Struct>) we need to pipe
                    # docs through to there, and then potentially mark the field nullable.
                    (variant_info, variant_field_docs) = inline_enum_variants[camel_to_snake(variant_name)]
                    variant_ty_text = variant_info + " " + camel_to_snake(variant_name)
                    variant_ty_info = type_mapping_generator.java_c_types(variant_ty_text, None)
                    if variant_field_docs is not None and doc_to_field_nullable(variant_field_docs):
                        mapped = type_mapping_generator.map_type_with_info(variant_ty_info, False, None, False, True, True)
                    else:
                        mapped = type_mapping_generator.map_type_with_info(variant_ty_info, False, None, False, True, False)
                    contains_trait |= mapped.ty_info.contains_trait
                    fields.append((mapped, None))
                    enum_variants.append(ComplexEnumVariantInfo(variant_name, variant_docs, fields, True))
                else:
                    enum_variants.append(ComplexEnumVariantInfo(variant_name, variant_docs, fields, True))
        complex_enums[struct_name] = contains_trait

        with open(f"{sys.argv[3]}/structs/{java_hu_type}{consts.file_ext}", "w") as out_java_enum:
            (out_java_addendum, out_java_enum_addendum, out_c_addendum) = consts.map_complex_enum(struct_name, enum_variants, camel_to_snake, enum_doc_comment)

            out_java_enum.write(out_java_enum_addendum)
            out_java.write(out_java_addendum)
            write_c(out_c_addendum)

    def map_trait(struct_name, field_var_lines, trait_fn_lines, trait_doc_comment):
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '')}{consts.file_ext}", "w") as out_java_trait:
            field_var_convs = []
            flattened_field_var_convs = []
            for var_line in field_var_lines:
                if var_line.group(1) in trait_structs:
                    field_var_convs.append((var_line.group(1), var_line.group(2), trait_structs[var_line.group(1)]))
                    flattened_field_var_convs.append((var_line.group(1), var_line.group(2), var_line.group(2)))
                    for field_var in trait_structs[var_line.group(1)]:
                        if isinstance(field_var, ConvInfo):
                            flattened_field_var_convs.append(field_var)
                        else:
                            path = var_line.group(2)
                            if len(field_var) > 2:
                                path = var_line.group(2) + "." + field_var[2]
                            flattened_field_var_convs.append((field_var[0], field_var[1], path))
                else:
                    mapped = type_mapping_generator.map_type(var_line.group(1) + " " + var_line.group(2), False, None, False, False)
                    field_var_convs.append(mapped)
                    flattened_field_var_convs.append(mapped)
            trait_structs[struct_name] = flattened_field_var_convs

            field_fns = []
            for fn_docs, fn_line in trait_fn_lines:
                if fn_line == "cloned":
                    ret_ty_info = type_mapping_generator.map_type("void", True, None, False, False)
                    field_fns.append(TraitMethInfo("cloned", False, ret_ty_info, [], fn_docs))
                else:
                    (nullable_params, ret_nullable) = doc_to_params_ret_nullable(fn_docs)
                    if ret_nullable:
                        ret_ty_info = type_mapping_generator.map_nullable_type(fn_line.group(2).strip() + " ret", True, None, False, False)
                        ret_ty_info.nullable = True
                    else:
                        ret_ty_info = type_mapping_generator.map_type(fn_line.group(2).strip() + " ret", True, None, False, False)
                    is_const = fn_line.group(4) is not None

                    arg_tys = []
                    for idx, arg in enumerate(fn_line.group(5).split(',')):
                        if arg == "":
                            continue
                        arg_ty_info = type_mapping_generator.java_c_types(arg, None)
                        if arg_ty_info.var_name in nullable_params:
                            # Types that are actually null instead of all-0s aren't yet handled on the Java side:
                            arg_conv_info = type_mapping_generator.map_type_with_info(arg_ty_info, True, None, False, False, True)
                        else:
                            arg_conv_info = type_mapping_generator.map_type_with_info(arg_ty_info, True, None, False, False, False)
                        arg_tys.append(arg_conv_info)
                    field_fns.append(TraitMethInfo(fn_line.group(3), is_const, ret_ty_info, arg_tys, fn_docs))

            (out_java_addendum, out_java_trait_addendum, out_c_addendum) = consts.native_c_map_trait(struct_name, field_var_convs, flattened_field_var_convs, field_fns, trait_doc_comment)
            write_c(out_c_addendum)
            out_java_trait.write(out_java_trait_addendum)
            out_java.write(out_java_addendum)

        for fn_docs, fn_line in trait_fn_lines:
            if fn_line == "cloned":
                continue
            # For now, just disable enabling the _call_log - we don't know how to inverse-map String
            is_log = fn_line.group(3) == "log" and struct_name == "LDKLogger"
            if fn_line.group(3) != "free" and fn_line.group(3) != "eq" and not is_log:
                dummy_line = fn_line.group(2) + struct_name.replace("LDK", "") + "_" + fn_line.group(3) + " " + struct_name + " *NONNULL_PTR this_arg" + fn_line.group(5) + "\n"
                map_fn(dummy_line, re.compile("([A-Za-z_0-9]*) *([A-Za-z_0-9]*) *(.*)").match(dummy_line), None, "(this_arg_conv->" + fn_line.group(3) + ")(this_arg_conv->this_arg", fn_docs)
        for idx, var_line in enumerate(field_var_lines):
            if var_line.group(1) not in trait_structs:
                write_c(var_line.group(1) + " " + struct_name + "_set_get_" + var_line.group(2) + "(" + struct_name + "* this_arg) {\n")
                write_c("\tif (this_arg->set_" + var_line.group(2) + " != NULL)\n")
                write_c("\t\tthis_arg->set_" + var_line.group(2) + "(this_arg);\n")
                write_c("\treturn this_arg->" + var_line.group(2) + ";\n")
                write_c("}\n")
                dummy_line = var_line.group(1) + " " + struct_name.replace("LDK", "") + "_get_" + var_line.group(2) + " " + struct_name + " *NONNULL_PTR this_arg" + fn_line.group(5) + "\n"
                map_fn(dummy_line, re.compile("([A-Za-z_0-9]*) *([A-Za-z_0-9]*) *(.*)").match(dummy_line), None, struct_name + "_set_get_" + var_line.group(2) + "(this_arg_conv", fn_docs)

    def map_result(struct_name, res_ty, err_ty):
        result_types.add(struct_name)
        human_ty = struct_name.replace("LDKCResult", "Result")
        res_map = type_mapping_generator.map_type(res_ty + " res", True, None, False, True)
        err_map = type_mapping_generator.map_type(err_ty + " err", True, None, False, True)
        java_hu_struct = consts.map_result(struct_name, res_map, err_map)
        create_getter(struct_name, res_ty, "ok", ("*", "->contents.result"), ("", "->result_ok"))
        create_getter(struct_name, err_ty, "err", ("*", "->contents.err"), ("!", "->result_ok"))
        with open(f"{sys.argv[3]}/structs/{human_ty}{consts.file_ext}", "w") as out_java_struct:
            out_java_struct.write(java_hu_struct)

    def create_getter(struct_name, field_decl, field_name, accessor, check_sfx):
        field_ty = java_c_types(field_decl + " " + field_name, None)
        ptr_fn_defn = field_decl + " *" + struct_name.replace("LDK", "") + "_get_" + field_name + "(" + struct_name + " *NONNULL_PTR owner)"
        owned_fn_defn = field_decl + " " + struct_name.replace("LDK", "") + "_get_" + field_name + "(" + struct_name + " *NONNULL_PTR owner)"

        holds_ref = False
        if field_ty.rust_obj is not None and field_ty.rust_obj in opaque_structs:
            fn_defn = owned_fn_defn
            write_c("static inline " + fn_defn + "{\n")
            write_c("\t" + field_ty.rust_obj + " ret = " + accessor[0] + "owner" + accessor[1] + ";\n")
            write_c("\tret.is_owned = false;\n")
            write_c("\treturn ret;\n")
        elif field_ty.rust_obj is not None and field_ty.rust_obj.replace("LDK", "") + "_clone" in clone_fns:
            fn_defn = owned_fn_defn
            write_c("static inline " + fn_defn + "{\n")
            if check_sfx is not None:
                write_c("CHECK(" + check_sfx[0] + "owner" + check_sfx[1] + ");\n")
            write_c("\treturn " + field_ty.rust_obj.replace("LDK", "") + "_clone(&" + accessor[0] + "owner" + accessor[1] + ");\n")
        elif field_ty.arr_len is not None or field_ty.is_native_primitive or field_ty.rust_obj in unitary_enums:
            fn_defn = owned_fn_defn
            write_c("static inline " + fn_defn + "{\n")
            if check_sfx is not None:
                write_c("CHECK(" + check_sfx[0] + "owner" + check_sfx[1] + ");\n")
            write_c("\treturn " + accessor[0] + "owner" + accessor[1] + ";\n")
            holds_ref = True
        else:
            fn_defn = ptr_fn_defn
            write_c("static inline " + fn_defn + "{\n")
            if check_sfx is not None:
                write_c("CHECK(" + check_sfx[0] + "owner" + check_sfx[1] + ");\n")
            write_c("\treturn &" + accessor[0] + "owner" + accessor[1] + ";\n")
            holds_ref = True
        write_c("}\n")
        dummy_line = fn_defn + ";\n"
        map_fn_with_ref_option(dummy_line, reg_fn_regex.match(dummy_line), None, None, "", holds_ref)

    def map_tuple(struct_name, field_lines):
        human_ty = struct_name.replace("LDKC2Tuple", "TwoTuple").replace("LDKC3Tuple", "ThreeTuple")
        with open(f"{sys.argv[3]}/structs/{human_ty}{consts.file_ext}", "w") as out_java_struct:
            out_java_struct.write(consts.map_tuple(struct_name))
            ty_list = []
            for idx, (line, _) in enumerate(field_lines):
                if idx != 0 and idx < len(field_lines) - 2:
                    ty_list.append(java_c_types(line.strip(';'), None))
            tuple_types[struct_name] = (ty_list, struct_name)

        # Map virtual getter functions
        for idx, (line, _) in enumerate(field_lines):
            if idx != 0 and idx < len(field_lines) - 2:
                field_name = chr(ord('a') + idx - 1)
                assert line.endswith(" " + field_name + ";")
                create_getter(struct_name, line[:-3].strip(), field_name, ("", "->" + field_name), None)

    out_java.write(consts.bindings_header)
    with open(f"{sys.argv[2]}/version{consts.file_ext}", "w") as out_java_version:
        out_java_version.write(consts.bindings_version_file.replace('<git_version_ldk_garbagecollected>', local_git_version))

    with open(f"{sys.argv[3]}/structs/CommonBase{consts.file_ext}", "w") as out_java_struct:
        out_java_struct.write(consts.common_base)

    block_comment = None
    last_block_comment = None
    cur_block_obj = None

    const_val_regex = re.compile("^extern const ([A-Za-z_0-9]*) ([A-Za-z_0-9]*);$")

    line_indicates_result_regex = re.compile("^   union (LDKCResult_[A-Za-z_0-9]*Ptr) contents;$")
    line_indicates_vec_regex = re.compile("^   (struct |enum |union )?([A-Za-z_0-9]*) \*data;$")
    line_indicates_opaque_regex = re.compile("^   bool is_owned;$")
    line_indicates_trait_regex = re.compile("^   (struct |enum |union )?([A-Za-z_0-9]* \*?)\(\*([A-Za-z_0-9]*)\)\((const )?void \*this_arg(.*)\);$")
    assert(line_indicates_trait_regex.match("   uintptr_t (*send_data)(void *this_arg, LDKu8slice data, bool resume_read);"))
    assert(line_indicates_trait_regex.match("   struct LDKCVec_MessageSendEventZ (*get_and_clear_pending_msg_events)(const void *this_arg);"))
    assert(line_indicates_trait_regex.match("   struct LDKCVec_u8Z (*write)(const void *this_arg);"))
    line_indicates_trait_clone_regex = re.compile("^   void \(\*cloned\)\(struct ([A-Za-z0-9])* \*NONNULL_PTR new_[A-Za-z0-9]*\);$")
    assert(line_indicates_trait_clone_regex.match("   void (*cloned)(struct LDKSign *NONNULL_PTR new_Sign);"))
    line_field_var_regex = re.compile("^   struct ([A-Za-z_0-9]*) ([A-Za-z_0-9]*);$")
    assert(line_field_var_regex.match("   struct LDKMessageSendEventsProvider MessageSendEventsProvider;"))
    assert(line_field_var_regex.match("   struct LDKChannelPublicKeys pubkeys;"))
    struct_name_regex = re.compile("^typedef (struct|enum|union) (MUST_USE_STRUCT )?(LDK[A-Za-z_0-9]*) {$")
    assert(struct_name_regex.match("typedef struct LDKCVec_u8Z {"))
    assert(struct_name_regex.match("typedef enum LDKNetwork {"))

    union_enum_items = {}
    result_ptr_struct_items = {}
    for line in in_h:
        if block_comment is not None:
            if line.endswith("*/\n"):
                last_block_comment = block_comment.strip("\n")
                block_comment = None
            else:
                block_comment = block_comment + line.strip(" /*")
        elif cur_block_obj is not None:
            cur_block_obj  = cur_block_obj + line
            if line.startswith("} "):
                field_lines = []
                struct_name = None
                vec_ty = None
                obj_lines = cur_block_obj.split("\n")
                is_opaque = False
                result_contents = None
                is_unitary_enum = False
                is_union_enum = False
                is_union = False
                is_tuple = False
                trait_fn_lines = []
                field_var_lines = []
                last_struct_block_comment = None

                for idx, struct_line in enumerate(obj_lines):
                    if struct_line.strip().startswith("/*"):
                        block_comment = struct_line.strip(" /*")
                    if block_comment is not None:
                        if struct_line.endswith("*/"):
                            last_struct_block_comment = block_comment.strip("\n")
                            block_comment = None
                        else:
                            block_comment = block_comment + "\n" + struct_line.strip(" /*").replace("…", "...")
                    else:
                        struct_name_match = struct_name_regex.match(struct_line)
                        if struct_name_match is not None:
                            struct_name = struct_name_match.group(3)
                            if struct_name_match.group(1) == "enum":
                                if not struct_name.endswith("_Tag"):
                                    is_unitary_enum = True
                                else:
                                    is_union_enum = True
                            elif struct_name_match.group(1) == "union":
                                is_union = True
                        if line_indicates_opaque_regex.match(struct_line):
                            is_opaque = True
                        result_match = line_indicates_result_regex.match(struct_line)
                        if result_match is not None:
                            result_contents = result_match.group(1)
                        vec_ty_match = line_indicates_vec_regex.match(struct_line)
                        if vec_ty_match is not None and struct_name.startswith("LDKCVec_"):
                            vec_ty = vec_ty_match.group(2)
                        elif struct_name.startswith("LDKC2Tuple_") or struct_name.startswith("LDKC3Tuple_"):
                            is_tuple = True
                        trait_fn_match = line_indicates_trait_regex.match(struct_line)
                        if trait_fn_match is not None:
                            trait_fn_lines.append((last_struct_block_comment, trait_fn_match))
                        trait_clone_fn_match = line_indicates_trait_clone_regex.match(struct_line)
                        if trait_clone_fn_match is not None:
                            trait_fn_lines.append((last_struct_block_comment, "cloned"))
                        field_var_match = line_field_var_regex.match(struct_line)
                        if field_var_match is not None:
                            field_var_lines.append(field_var_match)
                        field_lines.append((struct_line, last_struct_block_comment))
                        last_struct_block_comment = None

                assert(struct_name is not None)
                assert(len(trait_fn_lines) == 0 or not (is_opaque or is_unitary_enum or is_union_enum or is_union or result_contents is not None or vec_ty is not None))
                assert(not is_opaque or not (len(trait_fn_lines) != 0 or is_unitary_enum or is_union_enum or is_union or result_contents is not None or vec_ty is not None))
                assert(not is_unitary_enum or not (len(trait_fn_lines) != 0 or is_opaque or is_union_enum or is_union or result_contents is not None or vec_ty is not None))
                assert(not is_union_enum or not (len(trait_fn_lines) != 0 or is_unitary_enum or is_opaque or is_union or result_contents is not None or vec_ty is not None))
                assert(not is_union or not (len(trait_fn_lines) != 0 or is_unitary_enum or is_union_enum or is_opaque or result_contents is not None or vec_ty is not None))
                assert(result_contents is None or not (len(trait_fn_lines) != 0 or is_unitary_enum or is_union_enum or is_opaque or is_union or vec_ty is not None))
                assert(vec_ty is None or not (len(trait_fn_lines) != 0 or is_unitary_enum or is_union_enum or is_opaque or is_union or result_contents is not None))

                if is_opaque:
                    opaque_structs.add(struct_name)
                    with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '')}{consts.file_ext}", "w") as out_java_struct:
                        out_opaque_struct_human = consts.map_opaque_struct(struct_name, last_block_comment)
                        last_block_comment = None
                        out_java_struct.write(out_opaque_struct_human)
                elif result_contents is not None:
                    assert result_contents in result_ptr_struct_items
                    res_ty, err_ty = result_ptr_struct_items[result_contents]
                    map_result(struct_name, res_ty, err_ty)
                elif struct_name.startswith("LDKCResult_") and struct_name.endswith("ZPtr"):
                    for line, _ in field_lines:
                        if line.endswith("*result;"):
                            res_ty = line[:-8].strip()
                        elif line.endswith("*err;"):
                            err_ty = line[:-5].strip()
                    result_ptr_struct_items[struct_name] = (res_ty, err_ty)
                    result_types.add(struct_name[:-3])
                elif is_tuple:
                    map_tuple(struct_name, field_lines)
                elif vec_ty is not None:
                    ty_info = type_mapping_generator.map_type(vec_ty + " arr_elem", False, None, False, False)
                    if ty_info.is_native_primitive:
                        clone_fns.add(struct_name.replace("LDK", "") + "_clone")
                        write_c("static inline " + struct_name + " " + struct_name.replace("LDK", "") + "_clone(const " + struct_name + " *orig) {\n")
                        write_c("\t" + struct_name + " ret = { .data = MALLOC(sizeof(" + ty_info.c_ty + ") * orig->datalen, \"" + struct_name + " clone bytes\"), .datalen = orig->datalen };\n")
                        write_c("\tmemcpy(ret.data, orig->data, sizeof(" + ty_info.c_ty + ") * ret.datalen);\n")
                        write_c("\treturn ret;\n}\n")
                    elif (ty_info.rust_obj.replace("LDK", "") + "_clone") in clone_fns:
                        ty_name = struct_name.replace("LDK", "")
                        clone_fns.add(ty_name + "_clone")
                        write_c("static inline " + struct_name + " " + ty_name + "_clone(const " + struct_name + " *orig) {\n")
                        write_c("\t" + struct_name + " ret = { .data = MALLOC(sizeof(" + ty_info.rust_obj + ") * orig->datalen, \"" + struct_name + " clone bytes\"), .datalen = orig->datalen };\n")
                        write_c("\tfor (size_t i = 0; i < ret.datalen; i++) {\n")
                        write_c("\t\tret.data[i] = " + ty_info.rust_obj.replace("LDK", "") + "_clone(&orig->data[i]);\n")
                        write_c("\t}\n\treturn ret;\n}\n")
                elif is_union_enum:
                    assert(struct_name.endswith("_Tag"))
                    struct_name = struct_name[:-4]
                    union_enum_items[struct_name] = {"field_lines": field_lines}
                elif struct_name.endswith("_Body") and struct_name.split("_")[0] in union_enum_items:
                    enum_var_name = struct_name.split("_")
                    union_enum_items[enum_var_name[0]][enum_var_name[1]] = field_lines
                elif struct_name in union_enum_items:
                    tuple_variants = {}
                    elem_items = -1
                    for line, field_block_comment in field_lines:
                        if line == "      struct {":
                            elem_items = 0
                        elif line == "      };":
                            elem_items = -1
                        elif elem_items > -1:
                            line = line.strip()
                            if line.startswith("struct "):
                                line = line[7:]
                            elif line.startswith("enum "):
                                line = line[5:]
                            split = line.split(" ")
                            assert len(split) == 2
                            tuple_variants[split[1].strip(";")] = (split[0], field_block_comment)
                            elem_items += 1
                            if elem_items > 1:
                                # We don't currently support tuple variant with more than one element
                                assert False
                    map_complex_enum(struct_name, union_enum_items[struct_name], tuple_variants, last_block_comment)
                    last_block_comment = None
                elif is_unitary_enum:
                    map_unitary_enum(struct_name, field_lines, last_block_comment)
                    last_block_comment = None
                elif len(trait_fn_lines) > 0:
                    map_trait(struct_name, field_var_lines, trait_fn_lines, last_block_comment)
                elif struct_name == "LDKTxOut":
                    with open(f"{sys.argv[3]}/structs/TxOut{consts.file_ext}", "w") as out_java_struct:
                        out_java_struct.write(consts.hu_struct_file_prefix)
                        out_java_struct.write(consts.txout_defn)
                        out_java_struct.write(consts.hu_struct_file_suffix)
                elif struct_name == "LDKTxIn":
                    with open(f"{sys.argv[3]}/structs/TxIn{consts.file_ext}", "w") as out_java_struct:
                        out_java_struct.write(consts.hu_struct_file_prefix)
                        out_java_struct.write(consts.txin_defn)
                        out_java_struct.write(consts.hu_struct_file_suffix)
                elif struct_name == "LDKBigEndianScalar":
                    with open(f"{sys.argv[3]}/structs/BigEndianScalar{consts.file_ext}", "w") as out_java_struct:
                        out_java_struct.write(consts.hu_struct_file_prefix)
                        out_java_struct.write(consts.scalar_defn)
                        out_java_struct.write(consts.hu_struct_file_suffix)
                        fn_line = "struct LDKThirtyTwoBytes BigEndianScalar_get_bytes (struct LDKBigEndianScalar* thing)"
                        write_c(fn_line + " {\n")
                        write_c("\tLDKThirtyTwoBytes ret = { .data = *thing->big_endian_bytes };\n")
                        write_c("\treturn ret;\n")
                        write_c("}\n")
                        map_fn(fn_line + "\n", re.compile("(.*) (BigEndianScalar_get_bytes) \((.*)\)").match(fn_line), None, None, None)

                        # We need to be able to FREE a heap-allocated BigEndianScalar, but because
                        # there's nothing heap-allocated inside it the C bindings don't bother
                        # exposing a `_free` method. Instead, we have to manually write one here,
                        # though it doesn't need to do anything, the autogenerated wrapper will do
                        # the required FREE.
                        fn_line = "static void BigEndianScalar_free (struct LDKBigEndianScalar thing)"
                        write_c(fn_line + " {}\n")
                        map_fn(fn_line + "\n", re.compile("static (.*) (BigEndianScalar_free) \((.*)\)").match(fn_line), None, None, None)
                elif struct_name == "LDKWitnessProgram":
                    with open(f"{sys.argv[3]}/structs/WitnessProgram{consts.file_ext}", "w") as out_java_struct:
                        out_java_struct.write(consts.hu_struct_file_prefix)
                        out_java_struct.write(consts.witness_program_defn)
                        out_java_struct.write(consts.hu_struct_file_suffix)
                else:
                    pass # Everything remaining is a byte[] of some form
                cur_block_obj = None
        else:
            fn_ptr = fn_ptr_regex.match(line)
            fn_ret_arr = fn_ret_arr_regex.match(line)
            reg_fn = reg_fn_regex.match(line)
            const_val = const_val_regex.match(line)

            if line.startswith("#include <"):
                pass
            elif line.startswith("/*"):
                if not line.endswith("*/\n"):
                    block_comment = line.strip(" /*")
            elif line.startswith("typedef enum "):
                cur_block_obj = line
            elif line.startswith("typedef struct "):
                cur_block_obj = line
            elif line.startswith("typedef union "):
                cur_block_obj = line
            elif fn_ptr is not None:
                map_fn(line, fn_ptr, None, None, last_block_comment)
                last_block_comment = None
            elif fn_ret_arr is not None:
                map_fn(line, fn_ret_arr, fn_ret_arr.group(4), None, last_block_comment)
                last_block_comment = None
            elif reg_fn is not None:
                map_fn(line, reg_fn, None, None, last_block_comment)
                last_block_comment = None
            elif const_val_regex is not None:
                # TODO Map const variables
                pass
            else:
                assert(line == "\n")

    out_java.write(consts.bindings_footer())
    for struct_name in opaque_structs:
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '')}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n" + consts.hu_struct_file_suffix)
    for struct_name in trait_structs:
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '')}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n" + consts.hu_struct_file_suffix)
    for struct_name in complex_enums:
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '').replace('COption', 'Option')}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n" + consts.hu_struct_file_suffix)
    for struct_name in result_types:
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDKCResult', 'Result')}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n" + consts.hu_struct_file_suffix)
    for struct_name in tuple_types:
        struct_hu_name = struct_name.replace("LDKC2Tuple", "TwoTuple").replace("LDKC3Tuple", "ThreeTuple")
        with open(f"{sys.argv[3]}/structs/{struct_hu_name}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n" + consts.hu_struct_file_suffix)

with open(f"{sys.argv[4]}/bindings.c.body", "w") as out_c:
    out_c.write(consts.c_file_pfx)
    out_c.write(consts.init_str())
    out_c.write(c_file)
with open(f"{sys.argv[4]}/version.c", "w") as out_c:
    out_c.write(consts.c_version_file.replace('<git_version_ldk_garbagecollected>', local_git_version))
with open(f"{sys.argv[3]}/structs/UtilMethods{consts.file_ext}", "a") as util:
    util.write(consts.util_fn_sfx)
consts.cleanup()
