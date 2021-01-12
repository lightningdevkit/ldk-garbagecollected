#!/usr/bin/env python3
import sys, re

if len(sys.argv) != 7:
    print("USAGE: /path/to/lightning.h /path/to/bindings/output /path/to/bindings/ /path/to/bindings/output.c debug lang")
    sys.exit(1)

if sys.argv[5] == "false":
    DEBUG = False
elif sys.argv[5] == "true":
    DEBUG = True
else:
    print("debug should be true or false and indicates whether to track allocations and ensure we don't leak")
    sys.exit(1)

if sys.argv[6] == "java":
    from java_strings import Consts
elif sys.argv[6] == "typescript":
    from typescript_strings import Consts
else:
    print("Only java or typescript can be set for lang")
    sys.exit(1)
consts = Consts(DEBUG)

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

unitary_enums = set()
complex_enums = set()
opaque_structs = set()
trait_structs = set()
result_types = set()
tuple_types = {}

var_is_arr_regex = re.compile("\(\*([A-za-z0-9_]*)\)\[([a-z0-9]*)\]")
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
    elif fn_arg.startswith("LDKSignature"):
        fn_arg = "uint8_t (*" + fn_arg[13:] + ")[64]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKSignature"
        arr_access = "compact_form"
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
    elif fn_arg.startswith("LDKTenBytes"):
        fn_arg = "uint8_t (*" + fn_arg[12:] + ")[10]"
        assert var_is_arr_regex.match(fn_arg[8:])
        rust_obj = "LDKTenBytes"
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
    elif fn_arg.startswith("LDKTransaction"):
        fn_arg = "uint8_t (*" + fn_arg[15:] + ")[datalen]"
        rust_obj = "LDKTransaction"
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
        if res.is_native_primitive or res.passed_as_ptr:
            return TypeInfo(rust_obj=fn_arg.split(" ")[0], java_ty=res.java_ty + "[]", java_hu_ty=res.java_hu_ty + "[]",
                java_fn_ty_arg="[" + res.java_fn_ty_arg, c_ty=res.c_ty + "Array", passed_as_ptr=False, is_ptr=is_ptr, is_const=is_const,
                var_name=res.var_name, arr_len="datalen", arr_access="data", subty=res, is_native_primitive=False)
        else:
            return TypeInfo(rust_obj=fn_arg.split(" ")[0], java_ty=res.java_ty + "[]", java_hu_ty=res.java_hu_ty + "[]",
                java_fn_ty_arg="[" + res.java_fn_ty_arg, c_ty=consts.ptr_arr, passed_as_ptr=False, is_ptr=is_ptr, is_const=is_const,
                var_name=res.var_name, arr_len="datalen", arr_access="data", subty=res, is_native_primitive=False)

    is_primitive = False
    arr_len = None
    if fn_arg.startswith("void"):
        java_ty = "void"
        c_ty = "void"
        fn_ty_arg = "V"
        fn_arg = fn_arg[4:].strip()
        is_primitive = True
    elif fn_arg.startswith("bool"):
        java_ty = "boolean"
        c_ty = "jboolean"
        fn_ty_arg = "Z"
        fn_arg = fn_arg[4:].strip()
        is_primitive = True
    elif fn_arg.startswith("uint8_t"):
        java_ty = "byte"
        c_ty = "int8_t"
        fn_ty_arg = "B"
        fn_arg = fn_arg[7:].strip()
        is_primitive = True
    elif fn_arg.startswith("uint16_t"):
        java_ty = "short"
        c_ty = "jshort"
        fn_ty_arg = "S"
        fn_arg = fn_arg[8:].strip()
        is_primitive = True
    elif fn_arg.startswith("uint32_t"):
        java_ty = "int"
        c_ty = "int32_t"
        fn_ty_arg = "I"
        fn_arg = fn_arg[8:].strip()
        is_primitive = True
    elif fn_arg.startswith("uint64_t") or fn_arg.startswith("uintptr_t"):
        # TODO: uintptr_t is arch-dependent :(
        java_ty = "long"
        c_ty = "int64_t"
        fn_ty_arg = "J"
        if fn_arg.startswith("uint64_t"):
            fn_arg = fn_arg[8:].strip()
        else:
            fn_arg = fn_arg[9:].strip()
        is_primitive = True
    elif is_const and fn_arg.startswith("char *"):
        java_ty = "String"
        c_ty = "const char*"
        fn_ty_arg = "Ljava/lang/String;"
        fn_arg = fn_arg[6:].strip()
    elif fn_arg.startswith("LDKStr"):
        java_ty = "String"
        c_ty = "jstring"
        fn_ty_arg = "Ljava/lang/String;"
        fn_arg = fn_arg[6:].strip()
        arr_access = "chars"
        arr_len = "len"
    else:
        ma = var_ty_regex.match(fn_arg)
        if ma.group(1).strip() in unitary_enums:
            java_ty = ma.group(1).strip()
            c_ty = consts.result_c_ty
            fn_ty_arg = "Lorg/ldk/enums/" + ma.group(1).strip() + ";"
            fn_arg = ma.group(2).strip()
            rust_obj = ma.group(1).strip()
        elif ma.group(1).strip().startswith("LDKC2Tuple"):
            c_ty = consts.ptr_c_ty
            java_ty = consts.ptr_native_ty
            java_hu_ty = "TwoTuple<"
            if not ma.group(1).strip() in tuple_types:
                assert java_c_types_none_allowed
                return None
            for idx, ty_info in enumerate(tuple_types[ma.group(1).strip()][0]):
                if idx != 0:
                    java_hu_ty = java_hu_ty + ", "
                if ty_info.is_native_primitive:
                    if ty_info.java_hu_ty == "int":
                        java_hu_ty = java_hu_ty + "Integer" # Java concrete integer type is Integer, not Int
                    else:
                        java_hu_ty = java_hu_ty + ty_info.java_hu_ty.title() # If we're a primitive, capitalize the first letter
                else:
                    java_hu_ty = java_hu_ty + ty_info.java_hu_ty
            java_hu_ty = java_hu_ty + ">"
            fn_ty_arg = "J"
            fn_arg = ma.group(2).strip()
            rust_obj = ma.group(1).strip()
            take_by_ptr = True
        elif ma.group(1).strip().startswith("LDKC3Tuple"):
            c_ty = consts.ptr_c_ty
            java_ty = consts.ptr_native_ty
            java_hu_ty = "ThreeTuple<"
            if not ma.group(1).strip() in tuple_types:
                assert java_c_types_none_allowed
                return None
            for idx, ty_info in enumerate(tuple_types[ma.group(1).strip()][0]):
                if idx != 0:
                    java_hu_ty = java_hu_ty + ", "
                if ty_info.is_native_primitive:
                    if ty_info.java_hu_ty == "int":
                        java_hu_ty = java_hu_ty + "Integer" # Java concrete integer type is Integer, not Int
                    else:
                        java_hu_ty = java_hu_ty + ty_info.java_hu_ty.title() # If we're a primitive, capitalize the first letter
                else:
                    java_hu_ty = java_hu_ty + ty_info.java_hu_ty
            java_hu_ty = java_hu_ty + ">"
            fn_ty_arg = "J"
            fn_arg = ma.group(2).strip()
            rust_obj = ma.group(1).strip()
            take_by_ptr = True
        else:
            c_ty = consts.ptr_c_ty
            java_ty = consts.ptr_native_ty
            java_hu_ty = ma.group(1).strip().replace("LDKCResult", "Result").replace("LDK", "")
            fn_ty_arg = "J"
            fn_arg = ma.group(2).strip()
            rust_obj = ma.group(1).strip()
            take_by_ptr = True

    if fn_arg.startswith(" *") or fn_arg.startswith("*"):
        fn_arg = fn_arg.replace("*", "").strip()
        is_ptr = True
        c_ty = consts.ptr_c_ty
        java_ty = consts.ptr_native_ty
        fn_ty_arg = "J"
        is_primitive = False

    var_is_arr = var_is_arr_regex.match(fn_arg)
    if var_is_arr is not None or ret_arr_len is not None:
        assert(not take_by_ptr)
        assert(not is_ptr)
        java_ty = java_ty + "[]"
        c_ty = c_ty + "Array"
        if var_is_arr is not None:
            if var_is_arr.group(1) == "":
                return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_ty, java_fn_ty_arg="[" + fn_ty_arg, c_ty=c_ty, is_const=is_const,
                    passed_as_ptr=False, is_ptr=False, var_name="arg", arr_len=var_is_arr.group(2), arr_access=arr_access, is_native_primitive=False)
            return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_ty, java_fn_ty_arg="[" + fn_ty_arg, c_ty=c_ty, is_const=is_const,
                passed_as_ptr=False, is_ptr=False, var_name=var_is_arr.group(1), arr_len=var_is_arr.group(2), arr_access=arr_access, is_native_primitive=False)

    if java_hu_ty is None:
        java_hu_ty = java_ty
    return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_hu_ty, java_fn_ty_arg=fn_ty_arg, c_ty=c_ty, passed_as_ptr=is_ptr or take_by_ptr,
        is_const=is_const, is_ptr=is_ptr, var_name=fn_arg, arr_len=arr_len, arr_access=arr_access, is_native_primitive=is_primitive)

fn_ptr_regex = re.compile("^extern const ([A-Za-z_0-9\* ]*) \(\*(.*)\)\((.*)\);$")
fn_ret_arr_regex = re.compile("(.*) \(\*(.*)\((.*)\)\)\[([0-9]*)\];$")
reg_fn_regex = re.compile("([A-Za-z_0-9\* ]* \*?)([a-zA-Z_0-9]*)\((.*)\);$")
clone_fns = set()
constructor_fns = {}
c_array_class_caches = set()
with open(sys.argv[1]) as in_h:
    for line in in_h:
        reg_fn = reg_fn_regex.match(line)
        if reg_fn is not None:
            if reg_fn.group(2).endswith("_clone"):
                clone_fns.add(reg_fn.group(2))
            else:
                rty = java_c_types(reg_fn.group(1), None)
                if rty is not None and rty.rust_obj is not None and reg_fn.group(2) == rty.java_hu_ty + "_new":
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
write_c("static inline struct LDKThirtyTwoBytes ThirtyTwoBytes_clone(const struct LDKThirtyTwoBytes *orig) { struct LDKThirtyTwoBytes ret; memcpy(ret.data, orig->data, 32); return ret; }\n")

java_c_types_none_allowed = False # C structs created by cbindgen are declared in dependency order

with open(sys.argv[1]) as in_h, open(sys.argv[2], "w") as out_java:
    def map_type(fn_arg, print_void, ret_arr_len, is_free, holds_ref):
        ty_info = java_c_types(fn_arg, ret_arr_len)
        return map_type_with_info(ty_info, print_void, ret_arr_len, is_free, holds_ref)

    def map_type_with_info(ty_info, print_void, ret_arr_len, is_free, holds_ref):
        if ty_info.c_ty == "void":
            if not print_void:
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = None, arg_conv_cleanup = None,
                    ret_conv = None, ret_conv_name = None, to_hu_conv = None, to_hu_conv_name = None, from_hu_conv = None)
        if ty_info.c_ty.endswith("Array"):
            arr_len = ty_info.arr_len
            if arr_len is not None:
                arr_name = ty_info.var_name
            else:
                arr_name = "ret"
                arr_len = ret_arr_len
            if ty_info.c_ty == "int8_tArray":
                (set_pfx, set_sfx) = consts.set_native_arr_contents(arr_name + "_arr", arr_len, ty_info)
                ret_conv = ("int8_tArray " + arr_name + "_arr = " + consts.create_native_arr_call(arr_len, ty_info) + ";\n" + set_pfx, "")
                arg_conv_cleanup = None
                if not arr_len.isdigit():
                    arg_conv = ty_info.rust_obj + " " + arr_name + "_ref;\n"
                    arg_conv = arg_conv + arr_name + "_ref." + arr_len + " = " +  consts.get_native_arr_len_call[0] + arr_name + consts.get_native_arr_len_call[1] + ";\n"
                    if (not ty_info.is_ptr or not holds_ref) and ty_info.rust_obj != "LDKu8slice":
                        arg_conv = arg_conv + arr_name + "_ref." + ty_info.arr_access + " = MALLOC(" + arr_name + "_ref." + arr_len + ", \"" + ty_info.rust_obj + " Bytes\");\n"
                        arg_conv = arg_conv + consts.get_native_arr_contents(arr_name, arr_name + "_ref." + ty_info.arr_access, arr_name + "_ref." + arr_len, ty_info, True) + ";"
                    else:
                        arg_conv = arg_conv + arr_name + "_ref." + ty_info.arr_access + " = " + consts.get_native_arr_contents(arr_name, "NO_DEST", arr_name + "_ref." + arr_len, ty_info, False) + ";"
                        arg_conv_cleanup = consts.cleanup_native_arr_ref_contents(arr_name, arr_name + "_ref." + ty_info.arr_access, arr_name + "_ref." + arr_len, ty_info)
                    if ty_info.rust_obj == "LDKTransaction":
                        arg_conv = arg_conv + "\n" + arr_name + "_ref.data_is_owned = " + str(holds_ref).lower() + ";"
                    ret_conv = (ty_info.rust_obj + " " + arr_name + "_var = ", "")
                    ret_conv = (ret_conv[0], ";\nint8_tArray " + arr_name + "_arr = " + consts.create_native_arr_call(arr_name + "_var." + arr_len, ty_info) + ";\n")
                    (pfx, sfx) = consts.set_native_arr_contents(arr_name + "_arr", arr_name + "_var." + arr_len, ty_info)
                    ret_conv = (ret_conv[0], ret_conv[1] + pfx + arr_name + "_var." + ty_info.arr_access + sfx + ";")
                    if not holds_ref and ty_info.rust_obj != "LDKu8slice":
                        ret_conv = (ret_conv[0], ret_conv[1] + "\n" + ty_info.rust_obj.replace("LDK", "") + "_free(" + arr_name + "_var);")
                elif ty_info.rust_obj is not None:
                    arg_conv = ty_info.rust_obj + " " + arr_name + "_ref;\n"
                    arg_conv = arg_conv + "CHECK(" + consts.get_native_arr_len_call[0] + arr_name + consts.get_native_arr_len_call[1] + " == " + arr_len + ");\n"
                    arg_conv = arg_conv + consts.get_native_arr_contents(arr_name, arr_name + "_ref." + ty_info.arr_access, arr_len, ty_info, True) + ";"
                    ret_conv = (ret_conv[0], "." + ty_info.arr_access + set_sfx + ";")
                else:
                    arg_conv = "unsigned char " + arr_name + "_arr[" + arr_len + "];\n"
                    arg_conv = arg_conv + "CHECK(" + consts.get_native_arr_len_call[0] + arr_name + consts.get_native_arr_len_call[1] + " == " + arr_len + ");\n"
                    arg_conv = arg_conv + consts.get_native_arr_contents(arr_name, arr_name + "_arr", arr_len, ty_info, True) + ";\n"
                    arg_conv = arg_conv + "unsigned char (*" + arr_name + "_ref)[" + arr_len + "] = &" + arr_name + "_arr;"
                    ret_conv = (ret_conv[0] + "*", set_sfx + ";")
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = arg_conv, arg_conv_name = arr_name + "_ref", arg_conv_cleanup = arg_conv_cleanup,
                    ret_conv = ret_conv, ret_conv_name = arr_name + "_arr", to_hu_conv = None, to_hu_conv_name = None, from_hu_conv = None)
            else:
                assert not arr_len.isdigit() # fixed length arrays not implemented
                assert ty_info.java_ty[len(ty_info.java_ty) - 2:] == "[]"
                conv_name = "arr_conv_" + str(len(ty_info.java_hu_ty))
                idxc = chr(ord('a') + (len(ty_info.java_hu_ty) % 26))
                ty_info.subty.var_name = conv_name
                #XXX: We'd really prefer to only ever set to False, avoiding lots of clone, but need smarter free logic
                #if ty_info.is_ptr or holds_ref:
                #    ty_info.subty.requires_clone = False
                ty_info.subty.requires_clone = not ty_info.is_ptr or not holds_ref
                subty = map_type_with_info(ty_info.subty, False, None, is_free, holds_ref)
                if arr_name == "":
                    arr_name = "arg"
                arg_conv = ty_info.rust_obj + " " + arr_name + "_constr;\n"
                arg_conv = arg_conv + arr_name + "_constr." + arr_len + " = " + consts.get_native_arr_len_call[0] + arr_name + consts.get_native_arr_len_call[1] + ";\n"
                arg_conv = arg_conv + "if (" + arr_name + "_constr." + arr_len + " > 0)\n"
                if subty.rust_obj is None:
                    szof = subty.c_ty
                else:
                    szof = subty.rust_obj
                arg_conv = arg_conv + "\t" + arr_name + "_constr." + ty_info.arr_access + " = MALLOC(" + arr_name + "_constr." + arr_len + " * sizeof(" + szof + "), \"" + ty_info.rust_obj + " Elements\");\n"
                arg_conv = arg_conv + "else\n"
                arg_conv = arg_conv + "\t" + arr_name + "_constr." + ty_info.arr_access + " = NULL;\n"
                get_arr = consts.get_native_arr_contents(arr_name, "NO_DEST", arr_name + "_constr." + arr_len, ty_info, False)
                if get_arr != None:
                    arg_conv = arg_conv + subty.c_ty + "* " + arr_name + "_vals = " + get_arr + ";\n"
                arg_conv = arg_conv + "for (size_t " + idxc + " = 0; " + idxc + " < " + arr_name + "_constr." + arr_len + "; " + idxc + "++) {\n"
                if get_arr != None:
                    arg_conv = arg_conv + "\t" + subty.c_ty + " " + conv_name + " = " + arr_name + "_vals[" + idxc + "];"
                    if subty.arg_conv is not None:
                        arg_conv = arg_conv + "\n\t" + subty.arg_conv.replace("\n", "\n\t")
                else:
                    arg_conv = arg_conv + "\t" + subty.c_ty + " " + conv_name + " = " + consts.get_native_arr_elem(arr_name, idxc, ty_info) + ";\n"
                    arg_conv = arg_conv + "\t" + subty.arg_conv.replace("\n", "\n\t")
                arg_conv = arg_conv + "\n\t" + arr_name + "_constr." + ty_info.arr_access + "[" + idxc + "] = " + subty.arg_conv_name + ";\n}"
                if get_arr != None:
                    cleanup = consts.cleanup_native_arr_ref_contents(arr_name, arr_name + "_vals", arr_name + "_constr." + arr_len, ty_info)
                    if cleanup is not None:
                        arg_conv = arg_conv + "\n" + cleanup + ";"
                if ty_info.is_ptr:
                    arg_conv_name = "&" + arr_name + "_constr"
                else:
                    arg_conv_name = arr_name + "_constr"
                arg_conv_cleanup = None
                if ty_info.is_ptr:
                    arg_conv_cleanup = "FREE(" + arr_name + "_constr." + ty_info.arr_access + ");"

                if arr_name == "arg":
                    arr_name = "ret"
                ret_conv = (ty_info.rust_obj + " " + arr_name + "_var = ", "")
                if subty.ret_conv is None:
                    ret_conv = ("DUMMY", "DUMMY")
                elif not ty_info.java_ty[:len(ty_info.java_ty) - 2].endswith("[]"):
                    ret_conv = (ret_conv[0], ";\n" + ty_info.c_ty + " " + arr_name + "_arr = " + consts.create_native_arr_call(arr_name + "_var." + arr_len, ty_info) + ";\n")
                    ret_conv = (ret_conv[0], ret_conv[1] + subty.c_ty + " *" + arr_name + "_arr_ptr = " + consts.get_native_arr_ptr_call[0] + arr_name + "_arr" + consts.get_native_arr_ptr_call[1] + ";\n")
                    ret_conv = (ret_conv[0], ret_conv[1] + "for (size_t " + idxc + " = 0; " + idxc + " < " + arr_name + "_var." + arr_len + "; " + idxc + "++) {\n")
                    ret_conv = (ret_conv[0], ret_conv[1] + "\t" + subty.ret_conv[0].replace("\n", "\n\t"))
                    ret_conv = (ret_conv[0], ret_conv[1] + arr_name + "_var." + ty_info.arr_access + "[" + idxc + "]" + subty.ret_conv[1].replace("\n", "\n\t"))
                    ret_conv = (ret_conv[0], ret_conv[1] + "\n\t" + arr_name + "_arr_ptr[" + idxc + "] = " + subty.ret_conv_name + ";\n}")
                    cleanup = consts.release_native_arr_ptr_call(arr_name + "_arr", arr_name + "_arr_ptr")
                    if cleanup is not None:
                        ret_conv = (ret_conv[0], ret_conv[1] + "\n" + cleanup + ";")
                else:
                    assert ty_info.java_fn_ty_arg.startswith("[")
                    clz_var = ty_info.java_fn_ty_arg[1:].replace("[", "arr_of_")
                    c_array_class_caches.add(clz_var)
                    ret_conv = (ret_conv[0], ";\n" + ty_info.c_ty + " " + arr_name + "_arr = (*env)->NewObjectArray(env, " + arr_name + "_var." + arr_len + ", " + clz_var + "_clz, NULL);\n")
                    ret_conv = (ret_conv[0], ret_conv[1] + "for (size_t " + idxc + " = 0; " + idxc + " < " + arr_name + "_var." + arr_len + "; " + idxc + "++) {\n")
                    ret_conv = (ret_conv[0], ret_conv[1] + "\t" + subty.ret_conv[0].replace("\n", "\n\t"))
                    ret_conv = (ret_conv[0], ret_conv[1] + arr_name + "_var." + ty_info.arr_access + "[" + idxc + "]" + subty.ret_conv[1].replace("\n", "\n\t"))
                    ret_conv = (ret_conv[0], ret_conv[1] + "\n\t(*env)->SetObjectArrayElement(env, " + arr_name + "_arr, " + idxc + ", " + subty.ret_conv_name + ");\n")
                    ret_conv = (ret_conv[0], ret_conv[1] + "}")
                if not holds_ref:
                    # XXX: The commented if's are a bit smarter freeing, but we need to be a nudge smarter still
                    # Note that we don't drop the full vec here - we're passing ownership to java (or have cloned) or free'd by now!
                    ret_conv = (ret_conv[0], ret_conv[1] + "\nFREE(" + arr_name + "_var." + ty_info.arr_access + ");")
                    #if subty.rust_obj is not None and subty.rust_obj in opaque_structs:
                    #    ret_conv = (ret_conv[0], ret_conv[1] + "\nFREE(" + arr_name + "_var." + ty_info.arr_access + ");")
                    #else:
                    #    ret_conv = (ret_conv[0], ret_conv[1] + "\n" + ty_info.rust_obj.replace("LDK", "") + "_free(" + arr_name + "_var);")

                to_hu_conv = None
                to_hu_conv_name = None
                if subty.to_hu_conv is not None:
                    to_hu_conv = ty_info.java_hu_ty + " " + conv_name + "_arr = new " + ty_info.subty.java_hu_ty.split("<")[0] + "[" + arr_name + ".length];\n"
                    to_hu_conv = to_hu_conv + "for (int " + idxc + " = 0; " + idxc + " < " + arr_name + ".length; " + idxc + "++) {\n"
                    to_hu_conv = to_hu_conv + "\t" + subty.java_ty + " " + conv_name + " = " + arr_name + "[" + idxc + "];\n"
                    to_hu_conv = to_hu_conv + "\t" + subty.to_hu_conv.replace("\n", "\n\t") + "\n"
                    to_hu_conv = to_hu_conv + "\t" + conv_name + "_arr[" + idxc + "] = " + subty.to_hu_conv_name + ";\n}"
                    to_hu_conv_name = conv_name + "_arr"
                from_hu_conv = None
                if subty.from_hu_conv is not None:
                    if subty.java_ty == "long" and subty.java_hu_ty != "long":
                        from_hu_conv = ("Arrays.stream(" + arr_name + ").mapToLong(" + conv_name + " -> " + subty.from_hu_conv[0] + ").toArray()", "/* TODO 2 " + subty.java_hu_ty + "  */")
                    elif subty.java_ty == "long":
                        from_hu_conv = ("Arrays.stream(" + arr_name + ").map(" + conv_name + " -> " + subty.from_hu_conv[0] + ").toArray()", "/* TODO 2 " + subty.java_hu_ty + "  */")
                    else:
                        from_hu_conv = ("(" + ty_info.java_ty + ")Arrays.stream(" + arr_name + ").map(" + conv_name + " -> " + subty.from_hu_conv[0] + ").toArray()", "/* TODO 2 " + subty.java_hu_ty + "  */")

                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = arg_conv, arg_conv_name = arg_conv_name, arg_conv_cleanup = arg_conv_cleanup,
                    ret_conv = ret_conv, ret_conv_name = arr_name + "_arr", to_hu_conv = to_hu_conv, to_hu_conv_name = to_hu_conv_name, from_hu_conv = from_hu_conv)
        elif ty_info.java_ty == "String":
            if ty_info.arr_access is None:
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = None, arg_conv_cleanup = None,
                    ret_conv = ("jstring " + ty_info.var_name + "_conv = (*env)->NewStringUTF(env, ", ");"), ret_conv_name = ty_info.var_name + "_conv",
                    to_hu_conv = None, to_hu_conv_name = None, from_hu_conv = None)
            else:
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = None, arg_conv_cleanup = None,
                    ret_conv = ("LDKStr " + ty_info.var_name + "_str = ",
                        ";\nchar* " + ty_info.var_name + "_buf = MALLOC(" + ty_info.var_name + "_str." + ty_info.arr_len + " + 1, \"str conv buf\");\n" +
                        "memcpy(" + ty_info.var_name + "_buf, " + ty_info.var_name + "_str." + ty_info.arr_access + ", " + ty_info.var_name + "_str." + ty_info.arr_len + ");\n" +
                        ty_info.var_name + "_buf[" + ty_info.var_name + "_str." + ty_info.arr_len + "] = 0;\n" +
                        "jstring " + ty_info.var_name + "_conv = (*env)->NewStringUTF(env, " + ty_info.var_name + "_str." + ty_info.arr_access + ");\n" +
                        "FREE(" + ty_info.var_name + "_buf);"),
                    ret_conv_name = ty_info.var_name + "_conv", to_hu_conv = None, to_hu_conv_name = None, from_hu_conv = None)
        elif ty_info.var_name == "" and not print_void:
            # We don't have a parameter name, and want one, just call it arg
            if ty_info.rust_obj is not None:
                assert(not is_free or ty_info.rust_obj not in opaque_structs)
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = ty_info.rust_obj + " arg_conv = *(" + ty_info.rust_obj + "*)arg;\nFREE((void*)arg);",
                    arg_conv_name = "arg_conv", arg_conv_cleanup = None,
                    ret_conv = None, ret_conv_name = None, to_hu_conv = "TODO 7", to_hu_conv_name = None, from_hu_conv = None)
            else:
                assert(not is_free)
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = "arg", arg_conv_cleanup = None,
                    ret_conv = None, ret_conv_name = None, to_hu_conv = "TODO 8", to_hu_conv_name = None, from_hu_conv = None)
        elif ty_info.rust_obj is None:
            return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                arg_conv = None, arg_conv_name = ty_info.var_name, arg_conv_cleanup = None,
                ret_conv = None, ret_conv_name = None, to_hu_conv = None, to_hu_conv_name = None, from_hu_conv = None)
        else:
            if ty_info.var_name == "":
                ty_info.var_name = "ret"

            if ty_info.rust_obj in opaque_structs:
                opaque_arg_conv = ty_info.rust_obj + " " + ty_info.var_name + "_conv;\n"
                opaque_arg_conv = opaque_arg_conv + ty_info.var_name + "_conv.inner = (void*)(" + ty_info.var_name + " & (~1));\n"
                if ty_info.is_ptr and holds_ref:
                    opaque_arg_conv = opaque_arg_conv + ty_info.var_name + "_conv.is_owned = false;"
                else:
                    opaque_arg_conv = opaque_arg_conv + ty_info.var_name + "_conv.is_owned = (" + ty_info.var_name + " & 1) || (" + ty_info.var_name + " == 0);"
                if not is_free and (not ty_info.is_ptr or not holds_ref or ty_info.requires_clone == True) and ty_info.requires_clone != False:
                    if (ty_info.rust_obj.replace("LDK", "") + "_clone") in clone_fns:
                        # TODO: This is a bit too naive, even with the checks above, we really need to know if rust wants a ref or not, not just if its pass as a ptr.
                        opaque_arg_conv = opaque_arg_conv + "\nif (" + ty_info.var_name + "_conv.inner != NULL)\n"
                        opaque_arg_conv = opaque_arg_conv + "\t" + ty_info.var_name + "_conv = " + ty_info.rust_obj.replace("LDK", "") + "_clone(&" + ty_info.var_name + "_conv);"
                    elif ty_info.passed_as_ptr:
                        opaque_arg_conv = opaque_arg_conv + "\n// Warning: we may need a move here but can't clone!"

                opaque_ret_conv_suf = ";\n"
                if not holds_ref and ty_info.is_ptr and (ty_info.rust_obj.replace("LDK", "") + "_clone") in clone_fns: # is_ptr, not holds_ref implies passing a pointed-to value to java, which needs copied
                    opaque_ret_conv_suf = opaque_ret_conv_suf + "if (" + ty_info.var_name + "->inner != NULL)\n"
                    opaque_ret_conv_suf = opaque_ret_conv_suf + "\t" + ty_info.var_name + "_var = " + ty_info.rust_obj.replace("LDK", "") + "_clone(" + ty_info.var_name + ");\n"
                elif not holds_ref and ty_info.is_ptr:
                    opaque_ret_conv_suf = opaque_ret_conv_suf + "// Warning: we may need a move here but can't clone!\n"

                opaque_ret_conv_suf = opaque_ret_conv_suf + "CHECK((((long)" + ty_info.var_name + "_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.\n"
                opaque_ret_conv_suf = opaque_ret_conv_suf + "CHECK((((long)&" + ty_info.var_name + "_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.\n"
                if holds_ref:
                    opaque_ret_conv_suf = opaque_ret_conv_suf + "long " + ty_info.var_name + "_ref = (long)" + ty_info.var_name + "_var.inner & ~1;"
                else:
                    opaque_ret_conv_suf = opaque_ret_conv_suf + "long " + ty_info.var_name + "_ref = (long)" + ty_info.var_name + "_var.inner;\n"
                    opaque_ret_conv_suf = opaque_ret_conv_suf + "if (" + ty_info.var_name + "_var.is_owned) {\n"
                    opaque_ret_conv_suf = opaque_ret_conv_suf + "\t" + ty_info.var_name + "_ref |= 1;\n"
                    opaque_ret_conv_suf = opaque_ret_conv_suf + "}"

                if ty_info.is_ptr:
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = opaque_arg_conv, arg_conv_name = "&" + ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = (ty_info.rust_obj + " " + ty_info.var_name + "_var = *", opaque_ret_conv_suf),
                        ret_conv_name = ty_info.var_name + "_ref",
                        to_hu_conv = ty_info.java_hu_ty + " " + ty_info.var_name + "_hu_conv = new " + ty_info.java_hu_ty + "(null, " + ty_info.var_name + ");",
                        to_hu_conv_name = ty_info.var_name + "_hu_conv",
                        from_hu_conv = (ty_info.var_name + " == null ? 0 : " + ty_info.var_name + ".ptr & ~1", "this.ptrs_to.add(" + ty_info.var_name + ")"))
                else:
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = opaque_arg_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = (ty_info.rust_obj + " " + ty_info.var_name + "_var = ", opaque_ret_conv_suf),
                        ret_conv_name = ty_info.var_name + "_ref",
                        to_hu_conv = ty_info.java_hu_ty + " " + ty_info.var_name + "_hu_conv = new " + ty_info.java_hu_ty + "(null, " + ty_info.var_name + ");",
                        to_hu_conv_name = ty_info.var_name + "_hu_conv",
                        from_hu_conv = (ty_info.var_name + " == null ? 0 : " + ty_info.var_name + ".ptr & ~1", "this.ptrs_to.add(" + ty_info.var_name + ")"))

            if not ty_info.is_ptr:
                if ty_info.rust_obj in unitary_enums:
                    (ret_pfx, ret_sfx) = consts.c_unitary_enum_to_native_call(ty_info)
                    (arg_pfx, arg_sfx) = consts.native_unitary_enum_to_c_call(ty_info)
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = ty_info.rust_obj + " " + ty_info.var_name + "_conv = " + arg_pfx + ty_info.var_name + arg_sfx + ";",
                        arg_conv_name = ty_info.var_name + "_conv",
                        arg_conv_cleanup = None,
                        ret_conv = (ty_info.c_ty + " " + ty_info.var_name + "_conv = " + ret_pfx, ret_sfx + ";"),
                        ret_conv_name = ty_info.var_name + "_conv", to_hu_conv = None, to_hu_conv_name = None, from_hu_conv = None)
                base_conv = ty_info.rust_obj + " " + ty_info.var_name + "_conv = *(" + ty_info.rust_obj + "*)" + ty_info.var_name + ";"
                if ty_info.rust_obj in trait_structs:
                    if not is_free:
                        needs_full_clone = not is_free and (not ty_info.is_ptr and not holds_ref or ty_info.requires_clone == True) and ty_info.requires_clone != False
                        if needs_full_clone and (ty_info.rust_obj.replace("LDK", "") + "_clone") in clone_fns:
                            base_conv = base_conv + "\n" + ty_info.var_name + "_conv = " + ty_info.rust_obj.replace("LDK", "") + "_clone(" + ty_info.var_name + ");"
                        else:
                            base_conv = base_conv + "\nif (" + ty_info.var_name + "_conv.free == " + ty_info.rust_obj + "_JCalls_free) {\n"
                            base_conv = base_conv + "\t// If this_arg is a JCalls struct, then we need to increment the refcnt in it.\n"
                            base_conv = base_conv + "\t" + ty_info.rust_obj + "_JCalls_clone(" + ty_info.var_name + "_conv.this_arg);\n}"
                            if needs_full_clone:
                                base_conv = base_conv + "// Warning: we may need a move here but can't do a full clone!\n"

                    else:
                        base_conv = base_conv + "\n" + "FREE((void*)" + ty_info.var_name + ");"
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = (ty_info.rust_obj + "* ret = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*ret = ", ";"),
                        ret_conv_name = "(long)ret",
                        to_hu_conv = ty_info.java_hu_ty + " ret_hu_conv = new " + ty_info.java_hu_ty + "(null, " + ty_info.var_name + ");\nret_hu_conv.ptrs_to.add(this);",
                        to_hu_conv_name = "ret_hu_conv",
                        from_hu_conv = (ty_info.var_name + " == null ? 0 : " + ty_info.var_name + ".ptr", "this.ptrs_to.add(" + ty_info.var_name + ")"))
                if ty_info.rust_obj != "LDKu8slice":
                    # Don't bother free'ing slices passed in - Rust doesn't auto-free the
                    # underlying unlike Vecs, and it gives Java more freedom.
                    base_conv = base_conv + "\nFREE((void*)" + ty_info.var_name + ");";
                if ty_info.rust_obj in complex_enums:
                    ret_conv = ("long " + ty_info.var_name + "_ref = (long)&", ";")
                    if not holds_ref:
                        ret_conv = (ty_info.rust_obj + " *" + ty_info.var_name + "_copy = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n", "")
                        if ty_info.requires_clone == True: # Set in object array mapping
                            if (ty_info.rust_obj.replace("LDK", "") + "_clone") in clone_fns:
                                ret_conv = (ret_conv[0] + "*" + ty_info.var_name + "_copy = " + ty_info.rust_obj.replace("LDK", "") + "_clone(&", ");\n")
                            else:
                                ret_conv = (ret_conv[0] + "*" + ty_info.var_name + "_copy = ", "; // XXX: We likely need to clone here, but no _clone fn is available!\n")
                        else:
                            ret_conv = (ret_conv[0] + "*" + ty_info.var_name + "_copy = ", ";\n")
                        ret_conv = (ret_conv[0], ret_conv[1] + "long " + ty_info.var_name + "_ref = (long)" + ty_info.var_name + "_copy;")
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = ret_conv, ret_conv_name = ty_info.var_name + "_ref",
                        to_hu_conv = ty_info.java_hu_ty + " " + ty_info.var_name + "_hu_conv = " + ty_info.java_hu_ty + ".constr_from_ptr(" + ty_info.var_name + ");\n" + ty_info.var_name + "_hu_conv.ptrs_to.add(this);",
                        to_hu_conv_name = ty_info.var_name + "_hu_conv", from_hu_conv = (ty_info.var_name + ".ptr", ""))
                if ty_info.rust_obj in result_types:
                    if holds_ref:
                        # If we're trying to return a ref, we have to clone.
                        # We just blindly assume its implemented and let the compiler fail if its not.
                        ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_conv = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*" + ty_info.var_name + "_conv = ", ";")
                        ret_conv = (ret_conv[0], ret_conv[1] + "\n*" + ty_info.var_name + "_conv = " + ty_info.rust_obj.replace("LDK", "") + "_clone(" + ty_info.var_name + "_conv);")
                    else:
                        ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_conv = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*" + ty_info.var_name + "_conv = ", ";")
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = ret_conv, ret_conv_name = "(long)" + ty_info.var_name + "_conv",
                        to_hu_conv = ty_info.java_hu_ty + " " + ty_info.var_name + "_hu_conv = " + ty_info.java_hu_ty + ".constr_from_ptr(" + ty_info.var_name + ");",
                        to_hu_conv_name = ty_info.var_name + "_hu_conv", from_hu_conv = (ty_info.var_name + " != null ? " + ty_info.var_name + ".ptr : 0", ""))
                if ty_info.rust_obj in tuple_types:
                    from_hu_conv = "bindings." + tuple_types[ty_info.rust_obj][1].replace("LDK", "") + "_new("
                    to_hu_conv_pfx = ""
                    to_hu_conv_sfx = ty_info.java_hu_ty + " " + ty_info.var_name + "_conv = new " + ty_info.java_hu_ty + "("
                    clone_ret_str = ""
                    for idx, conv in enumerate(tuple_types[ty_info.rust_obj][0]):
                        if idx != 0:
                            to_hu_conv_sfx = to_hu_conv_sfx + ", "
                            from_hu_conv = from_hu_conv + ", "
                        conv.var_name = ty_info.var_name + "_" + chr(idx + ord("a"))
                        conv_map = map_type_with_info(conv, False, None, is_free, holds_ref)
                        to_hu_conv_pfx = to_hu_conv_pfx + conv.java_ty + " " + ty_info.var_name + "_" + chr(idx + ord("a")) + " = " + "bindings." + tuple_types[ty_info.rust_obj][1] + "_get_" + chr(idx + ord("a")) + "(" + ty_info.var_name + ");\n"
                        if conv_map.to_hu_conv is not None:
                            to_hu_conv_pfx = to_hu_conv_pfx + conv_map.to_hu_conv + ";\n"
                            to_hu_conv_sfx = to_hu_conv_sfx + conv_map.to_hu_conv_name
                        else:
                            to_hu_conv_sfx = to_hu_conv_sfx + ty_info.var_name + "_" + chr(idx + ord("a"))
                        if conv_map.from_hu_conv is not None:
                            from_hu_conv = from_hu_conv + conv_map.from_hu_conv[0].replace(ty_info.var_name + "_" + chr(idx + ord("a")), ty_info.var_name + "." + chr(idx + ord("a")))
                            if conv_map.from_hu_conv[1] != "":
                                from_hu_conv = from_hu_conv + "/*XXX: " + conv_map.from_hu_conv[1] + "*/"
                        else:
                            from_hu_conv = from_hu_conv + ty_info.var_name + "." + chr(idx + ord("a"))

                        if conv.is_native_primitive:
                            pass
                        elif (conv_map.rust_obj.replace("LDK", "") + "_clone") in clone_fns:
                            accessor = ty_info.var_name + "_ref->" + chr(idx + ord("a"))
                            clone_ret_str = clone_ret_str + "\n" + accessor + " = " + conv_map.rust_obj.replace("LDK", "") + "_clone(&" + accessor + ");"
                        else:
                            clone_ret_str = clone_ret_str + "\n// XXX: We likely need to clone here, but no _clone fn is available for " + conv_map.java_hu_ty
                    if not ty_info.is_ptr and not holds_ref:
                        ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_ref = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*" + ty_info.var_name + "_ref = ", ";")
                        if not is_free and (not ty_info.is_ptr and not holds_ref or ty_info.requires_clone == True) and ty_info.requires_clone != False:
                            ret_conv = (ret_conv[0], ret_conv[1] + clone_ret_str)
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                            ret_conv = ret_conv,
                            ret_conv_name = "(long)" + ty_info.var_name + "_ref",
                            to_hu_conv = to_hu_conv_pfx + to_hu_conv_sfx + ");", to_hu_conv_name = ty_info.var_name + "_conv", from_hu_conv = (from_hu_conv + ")", ""))
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = ("long " + ty_info.var_name + "_ref = (long)&", ";"), ret_conv_name = ty_info.var_name + "_ref",
                        to_hu_conv = to_hu_conv_pfx + to_hu_conv_sfx + ");", to_hu_conv_name = ty_info.var_name + "_conv", from_hu_conv = (from_hu_conv + ")", ""))

                # The manually-defined types - TxOut and Transaction
                assert ty_info.rust_obj == "LDKTxOut"
                if not ty_info.is_ptr and not holds_ref:
                    ret_conv = ("LDKTxOut* " + ty_info.var_name + "_ref = MALLOC(sizeof(LDKTxOut), \"LDKTxOut\");\n*" + ty_info.var_name + "_ref = ", ";")
                else:
                    ret_conv = ("long " + ty_info.var_name + "_ref = (long)&", ";")
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                    ret_conv = ret_conv, ret_conv_name = "(long)" + ty_info.var_name + "_ref",
                    to_hu_conv = ty_info.java_hu_ty + " " + ty_info.var_name + "_conv = new " +ty_info.java_hu_ty + "(null, " + ty_info.var_name + ");",
                    to_hu_conv_name = ty_info.var_name + "_conv", from_hu_conv = (ty_info.var_name + ".ptr", ""))
            elif ty_info.is_ptr:
                assert(not is_free)
                if ty_info.rust_obj in complex_enums:
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = ty_info.rust_obj + "* " + ty_info.var_name + "_conv = (" + ty_info.rust_obj + "*)" + ty_info.var_name + ";",
                        arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = ("long ret_" + ty_info.var_name + " = (long)", ";"), ret_conv_name = "ret_" + ty_info.var_name,
                        to_hu_conv = ty_info.java_hu_ty + " " + ty_info.var_name + "_hu_conv = " + ty_info.java_hu_ty + ".constr_from_ptr(" + ty_info.var_name + ");",
                        to_hu_conv_name = ty_info.var_name + "_hu_conv",
                        from_hu_conv = (ty_info.var_name + " == null ? 0 : " + ty_info.var_name + ".ptr & ~1", "this.ptrs_to.add(" + ty_info.var_name + ")"))
                elif ty_info.rust_obj in trait_structs:
                    if ty_info.rust_obj.replace("LDK", "") + "_clone" in clone_fns:
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            arg_conv = ty_info.rust_obj + "* " + ty_info.var_name + "_conv = (" + ty_info.rust_obj + "*)" + ty_info.var_name + ";",
                            arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                            ret_conv = (ty_info.rust_obj + " *" + ty_info.var_name + "_clone = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n" +
                                "*" + ty_info.var_name + "_clone = " + ty_info.rust_obj.replace("LDK", "") + "_clone(", ");"),
                            ret_conv_name = "(long)" + ty_info.var_name + "_clone",
                            to_hu_conv = ty_info.java_hu_ty + " ret_hu_conv = new " + ty_info.java_hu_ty + "(null, " + ty_info.var_name + ");\nret_hu_conv.ptrs_to.add(this);",
                            to_hu_conv_name = "ret_hu_conv",
                            from_hu_conv = (ty_info.var_name + " == null ? 0 : " + ty_info.var_name + ".ptr", "this.ptrs_to.add(" + ty_info.var_name + ")"))
                    else:
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            arg_conv = ty_info.rust_obj + "* " + ty_info.var_name + "_conv = (" + ty_info.rust_obj + "*)" + ty_info.var_name + ";",
                            arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                            ret_conv = ("long ret_" + ty_info.var_name + " = (long)", ";"), ret_conv_name = "ret_" + ty_info.var_name,
                            to_hu_conv = ty_info.java_hu_ty + " ret_hu_conv = new " + ty_info.java_hu_ty + "(null, " + ty_info.var_name + ");\nret_hu_conv.ptrs_to.add(this);",
                            to_hu_conv_name = "ret_hu_conv",
                            from_hu_conv = (ty_info.var_name + " == null ? 0 : " + ty_info.var_name + ".ptr", "this.ptrs_to.add(" + ty_info.var_name + ")"))
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = ty_info.rust_obj + "* " + ty_info.var_name + "_conv = (" + ty_info.rust_obj + "*)" + ty_info.var_name + ";",
                    arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                    ret_conv = ("long ret_" + ty_info.var_name + " = (long)", ";"), ret_conv_name = "ret_" + ty_info.var_name,
                    to_hu_conv = "TODO 3", to_hu_conv_name = None, from_hu_conv = None) # its a pointer, no conv needed
            assert False # We should have handled every case by now.

    def map_fn(line, re_match, ret_arr_len, c_call_string):
        out_java.write("\t// " + line)
        out_java.write("\tpublic static native ")
        write_c(consts.c_fn_ty_pfx)

        is_free = re_match.group(2).endswith("_free")
        struct_meth = re_match.group(2).split("_")[0]

        ret_info = map_type(re_match.group(1), True, ret_arr_len, False, False)
        write_c(ret_info.c_ty)
        out_java.write(ret_info.java_ty)

        if ret_info.ret_conv is not None:
            ret_conv_pfx, ret_conv_sfx = ret_info.ret_conv

        out_java.write(" " + re_match.group(2) + "(")
        write_c(" " + consts.c_fn_name_pfx + re_match.group(2).replace('_', '_1') + "(" + consts.c_fn_args_pfx)

        arg_names = []
        default_constructor_args = {}
        takes_self = False
        args_known = True
        for idx, arg in enumerate(re_match.group(3).split(',')):
            if idx != 0:
                out_java.write(", ")
            if arg != "void":
                write_c(", ")
            arg_conv_info = map_type(arg, False, None, is_free, True)
            if arg_conv_info.c_ty != "void":
                write_c(arg_conv_info.c_ty + " " + arg_conv_info.arg_name)
                out_java.write(arg_conv_info.java_ty + " " + arg_conv_info.arg_name)
            if idx == 0 and arg_conv_info.java_hu_ty == struct_meth:
                takes_self = True
            if arg_conv_info.arg_conv is not None and "Warning" in arg_conv_info.arg_conv:
                if arg_conv_info.rust_obj in constructor_fns:
                    assert not is_free
                    for explode_arg in constructor_fns[arg_conv_info.rust_obj].split(','):
                        explode_arg_conv = map_type(explode_arg, False, None, False, True)
                        if explode_arg_conv.c_ty == "void":
                            # We actually want to handle this case, but for now its only used in NetGraphMsgHandler::new()
                            # which ends up resulting in a redundant constructor - both without arguments for the NetworkGraph.
                            args_known = False
                            pass
                        if not arg_conv_info.arg_name in default_constructor_args:
                            default_constructor_args[arg_conv_info.arg_name] = []
                        default_constructor_args[arg_conv_info.arg_name].append(explode_arg_conv)
            arg_names.append(arg_conv_info)

        out_java_struct = None
        if ("LDK" + struct_meth in opaque_structs or "LDK" + struct_meth in trait_structs) and not is_free:
            out_java_struct = open(f"{sys.argv[3]}/structs/{struct_meth}{consts.file_ext}", "a")
            if not args_known:
                out_java_struct.write("\t// Skipped " + re_match.group(2) + "\n")
                out_java_struct.close()
                out_java_struct = None
            else:
                meth_n = re_match.group(2)[len(struct_meth) + 1:]
                if not takes_self:
                    out_java_struct.write("\tpublic static " + ret_info.java_hu_ty + " constructor_" + meth_n + "(")
                else:
                    out_java_struct.write("\tpublic " + ret_info.java_hu_ty + " " + meth_n + "(")
                for idx, arg in enumerate(arg_names):
                    if idx != 0:
                        if not takes_self or idx > 1:
                            out_java_struct.write(", ")
                    elif takes_self:
                        continue
                    if arg.java_ty != "void":
                        if arg.arg_name in default_constructor_args:
                            for explode_idx, explode_arg in enumerate(default_constructor_args[arg.arg_name]):
                                if explode_idx != 0:
                                    out_java_struct.write(", ")
                                out_java_struct.write(explode_arg.java_hu_ty + " " + arg.arg_name + "_" + explode_arg.arg_name)
                        else:
                            out_java_struct.write(arg.java_hu_ty + " " + arg.arg_name)


        out_java.write(");\n")
        write_c(") {\n")
        if out_java_struct is not None:
            out_java_struct.write(") {\n")

        for info in arg_names:
            if info.arg_conv is not None:
                write_c("\t" + info.arg_conv.replace('\n', "\n\t") + "\n")

        if ret_info.ret_conv is not None:
            write_c("\t" + ret_conv_pfx.replace('\n', '\n\t'))
        elif ret_info.c_ty != "void":
            write_c("\t" + ret_info.c_ty + " ret_val = ")
        else:
            write_c("\t")

        if c_call_string is None:
            write_c(re_match.group(2) + "(")
        else:
            write_c(c_call_string)
        for idx, info in enumerate(arg_names):
            if info.arg_conv_name is not None:
                if idx != 0:
                    write_c(", ")
                elif c_call_string is not None:
                    continue
                write_c(info.arg_conv_name)
        write_c(")")
        if ret_info.ret_conv is not None:
            write_c(ret_conv_sfx.replace('\n', '\n\t'))
        else:
            write_c(";")
        for info in arg_names:
            if info.arg_conv_cleanup is not None:
                write_c("\n\t" + info.arg_conv_cleanup.replace("\n", "\n\t"))
        if ret_info.ret_conv is not None:
            write_c("\n\treturn " + ret_info.ret_conv_name + ";")
        elif ret_info.c_ty != "void":
            write_c("\n\treturn ret_val;")
        write_c("\n}\n\n")
        if out_java_struct is not None:
            out_java_struct.write("\t\t")
            if ret_info.java_ty != "void":
                out_java_struct.write(ret_info.java_ty + " ret = ")
            out_java_struct.write("bindings." + re_match.group(2) + "(")
            for idx, info in enumerate(arg_names):
                if idx != 0:
                    out_java_struct.write(", ")
                if idx == 0 and takes_self:
                    out_java_struct.write("this.ptr")
                elif info.arg_name in default_constructor_args:
                    out_java_struct.write("bindings." + info.java_hu_ty + "_new(")
                    for explode_idx, explode_arg in enumerate(default_constructor_args[info.arg_name]):
                        if explode_idx != 0:
                            out_java_struct.write(", ")
                        expl_arg_name = info.arg_name + "_" + explode_arg.arg_name
                        if explode_arg.from_hu_conv is not None:
                            out_java_struct.write(explode_arg.from_hu_conv[0].replace(explode_arg.arg_name, expl_arg_name))
                        else:
                            out_java_struct.write(expl_arg_name)
                    out_java_struct.write(")")
                elif info.from_hu_conv is not None:
                    out_java_struct.write(info.from_hu_conv[0])
                else:
                    out_java_struct.write(info.arg_name)
            out_java_struct.write(");\n")
            if ret_info.to_hu_conv is not None:
                if not takes_self:
                    out_java_struct.write("\t\t" + ret_info.to_hu_conv.replace("\n", "\n\t\t").replace("this", ret_info.to_hu_conv_name) + "\n")
                else:
                    out_java_struct.write("\t\t" + ret_info.to_hu_conv.replace("\n", "\n\t\t") + "\n")

            for idx, info in enumerate(arg_names):
                if idx == 0 and takes_self:
                    pass
                elif info.arg_name in default_constructor_args:
                    for explode_arg in default_constructor_args[info.arg_name]:
                        expl_arg_name = info.arg_name + "_" + explode_arg.arg_name
                        if explode_arg.from_hu_conv is not None and ret_info.to_hu_conv_name:
                            out_java_struct.write("\t\t" + explode_arg.from_hu_conv[1].replace(explode_arg.arg_name, expl_arg_name).replace("this", ret_info.to_hu_conv_name) + ";\n")
                elif info.from_hu_conv is not None and info.from_hu_conv[1] != "":
                    if not takes_self and ret_info.to_hu_conv_name is not None:
                        out_java_struct.write("\t\t" + info.from_hu_conv[1].replace("this", ret_info.to_hu_conv_name) + ";\n")
                    else:
                        out_java_struct.write("\t\t" + info.from_hu_conv[1] + ";\n")

            if ret_info.to_hu_conv_name is not None:
                out_java_struct.write("\t\treturn " + ret_info.to_hu_conv_name + ";\n")
            elif ret_info.java_ty != "void" and ret_info.rust_obj != "LDK" + struct_meth:
                out_java_struct.write("\t\treturn ret;\n")
            out_java_struct.write("\t}\n\n")
            out_java_struct.close()

    def map_unitary_enum(struct_name, field_lines):
        with open(f"{sys.argv[3]}/enums/{struct_name}{consts.file_ext}", "w") as out_java_enum:
            unitary_enums.add(struct_name)
            for idx, struct_line in enumerate(field_lines):
                if idx == 0:
                    assert(struct_line == "typedef enum %s {" % struct_name)
                elif idx == len(field_lines) - 3:
                    assert(struct_line.endswith("_Sentinel,"))
                elif idx == len(field_lines) - 2:
                    assert(struct_line == "} %s;" % struct_name)
                elif idx == len(field_lines) - 1:
                    assert(struct_line == "")
            (c_out, native_file_out, native_out) = consts.native_c_unitary_enum_map(struct_name, [x.strip().strip(",") for x in field_lines[1:-3]])
            write_c(c_out)
            out_java_enum.write(native_file_out)
            out_java.write(native_out)
 
    def map_complex_enum(struct_name, union_enum_items):
        java_hu_type = struct_name.replace("LDK", "")
        complex_enums.add(struct_name)
        with open(f"{sys.argv[3]}/structs/{java_hu_type}{consts.file_ext}", "w") as out_java_enum:
            (out_java_addendum, out_java_enum_addendum, out_c_addendum) = consts.map_complex_enum(struct_name, union_enum_items, map_type, camel_to_snake)

            out_java_enum.write(out_java_enum_addendum)
            out_java.write(out_java_addendum)
            write_c(out_c_addendum)

    def map_trait(struct_name, field_var_lines, trait_fn_lines):
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '')}{consts.file_ext}", "w") as out_java_trait:
            field_var_convs = []
            for var_line in field_var_lines:
                if var_line.group(1) in trait_structs:
                    field_var_convs.append((var_line.group(1), var_line.group(2)))
                else:
                    field_var_convs.append(map_type(var_line.group(1) + " " + var_line.group(2), False, None, False, False))

            field_fns = []
            for fn_line in trait_fn_lines:
                ret_ty_info = map_type(fn_line.group(2), True, None, False, False)
                is_const = fn_line.group(4) is not None

                arg_tys = []
                for idx, arg in enumerate(fn_line.group(5).split(',')):
                    if arg == "":
                        continue
                    arg_conv_info = map_type(arg, True, None, False, False)
                    arg_tys.append(arg_conv_info)
                field_fns.append(TraitMethInfo(fn_line.group(3), is_const, ret_ty_info, arg_tys))

            write_c(consts.native_c_map_trait(struct_name, field_var_convs, field_fns)[1])

            out_java_trait.write(consts.hu_struct_file_prefix)
            out_java_trait.write("public class " + struct_name.replace("LDK","") + " extends CommonBase {\n")
            out_java_trait.write("\tfinal bindings." + struct_name + " bindings_instance;\n")
            out_java_trait.write("\t" + struct_name.replace("LDK", "") + "(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }\n")
            out_java_trait.write("\tprivate " + struct_name.replace("LDK", "") + "(bindings." + struct_name + " arg")
            for idx, var_line in enumerate(field_var_lines):
                if var_line.group(1) in trait_structs:
                    out_java_trait.write(", bindings." + var_line.group(1) + " " + var_line.group(2))
                else:
                    out_java_trait.write(", " + field_var_convs[idx].java_hu_ty + " " + var_line.group(2))
            out_java_trait.write(") {\n")
            out_java_trait.write("\t\tsuper(bindings." + struct_name + "_new(arg")
            for idx, var_line in enumerate(field_var_lines):
                if var_line.group(1) in trait_structs:
                    out_java_trait.write(", " + var_line.group(2))
                elif field_var_convs[idx].from_hu_conv is not None:
                    out_java_trait.write(", " + field_var_convs[idx].from_hu_conv[0])
                else:
                    out_java_trait.write(", " + var_line.group(2))
            out_java_trait.write("));\n")
            out_java_trait.write("\t\tthis.ptrs_to.add(arg);\n")
            for idx, var_line in enumerate(field_var_lines):
                if var_line.group(1) in trait_structs:
                    out_java_trait.write("\t\tthis.ptrs_to.add(" + var_line.group(2) + ");\n")
                elif field_var_convs[idx].from_hu_conv is not None and field_var_convs[idx].from_hu_conv[1] != "":
                    out_java_trait.write("\t\t" + field_var_convs[idx].from_hu_conv[1] + ";\n")
            out_java_trait.write("\t\tthis.bindings_instance = arg;\n")
            out_java_trait.write("\t}\n")
            out_java_trait.write("\t@Override @SuppressWarnings(\"deprecation\")\n")
            out_java_trait.write("\tprotected void finalize() throws Throwable {\n")
            out_java_trait.write("\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); } super.finalize();\n")
            out_java_trait.write("\t}\n\n")

            java_trait_constr = "\tprivate static class " + struct_name + "Holder { " + struct_name.replace("LDK", "") + " held; }\n"
            java_trait_constr = java_trait_constr + "\tpublic static " + struct_name.replace("LDK", "") + " new_impl(" + struct_name.replace("LDK", "") + "Interface arg"
            for idx, var_line in enumerate(field_var_lines):
                if var_line.group(1) in trait_structs:
                    # Ideally we'd be able to take any instance of the interface, but our C code can only represent
                    # Java-implemented version, so we require users pass a Java implementation here :/
                    java_trait_constr = java_trait_constr + ", " + var_line.group(1).replace("LDK", "") + "." + var_line.group(1).replace("LDK", "") + "Interface " + var_line.group(2) + "_impl"
                else:
                    java_trait_constr = java_trait_constr + ", " + field_var_convs[idx].java_hu_ty + " " + var_line.group(2)
            java_trait_constr = java_trait_constr + ") {\n\t\tfinal " + struct_name + "Holder impl_holder = new " + struct_name + "Holder();\n"
            java_trait_constr = java_trait_constr + "\t\timpl_holder.held = new " + struct_name.replace("LDK", "") + "(new bindings." + struct_name + "() {\n"
            out_java_trait.write("\tpublic static interface " + struct_name.replace("LDK", "") + "Interface {\n")
            out_java.write("\tpublic interface " + struct_name + " {\n")
            java_meths = []
            for fn_line in trait_fn_lines:
                java_meth_descr = "("
                if fn_line.group(3) != "free" and fn_line.group(3) != "clone":
                    ret_ty_info = map_type(fn_line.group(2), True, None, False, False)

                    out_java.write("\t\t " + ret_ty_info.java_ty + " " + fn_line.group(3) + "(")
                    java_trait_constr = java_trait_constr + "\t\t\t@Override public " + ret_ty_info.java_ty + " " + fn_line.group(3) + "("
                    out_java_trait.write("\t\t" + ret_ty_info.java_hu_ty + " " + fn_line.group(3) + "(")
                    is_const = fn_line.group(4) is not None

                    arg_names = []
                    for idx, arg in enumerate(fn_line.group(5).split(',')):
                        if arg == "":
                            continue
                        if idx >= 2:
                            out_java.write(", ")
                            java_trait_constr = java_trait_constr + ", "
                            out_java_trait.write(", ")
                        arg_conv_info = map_type(arg, True, None, False, False)
                        out_java.write(arg_conv_info.java_ty + " " + arg_conv_info.arg_name)
                        out_java_trait.write(arg_conv_info.java_hu_ty + " " + arg_conv_info.arg_name)
                        java_trait_constr = java_trait_constr + arg_conv_info.java_ty + " " + arg_conv_info.arg_name
                        arg_names.append(arg_conv_info)
                        java_meth_descr = java_meth_descr + arg_conv_info.java_fn_ty_arg
                    java_meth_descr = java_meth_descr + ")" + ret_ty_info.java_fn_ty_arg
                    java_meths.append((fn_line, java_meth_descr))

                    out_java.write(");\n")
                    out_java_trait.write(");\n")
                    java_trait_constr = java_trait_constr + ") {\n"

                    for arg_info in arg_names:
                        if arg_info.to_hu_conv is not None:
                            java_trait_constr = java_trait_constr + "\t\t\t\t" + arg_info.to_hu_conv.replace("\n", "\n\t\t\t\t") + "\n"

                    if ret_ty_info.java_ty != "void":
                        java_trait_constr = java_trait_constr + "\t\t\t\t" + ret_ty_info.java_hu_ty + " ret = arg." + fn_line.group(3) + "("
                    else:
                        java_trait_constr = java_trait_constr + "\t\t\t\targ." + fn_line.group(3) + "("

                    for idx, arg_info in enumerate(arg_names):
                        if idx != 0:
                            java_trait_constr = java_trait_constr + ", "
                        if arg_info.to_hu_conv_name is not None:
                            java_trait_constr = java_trait_constr + arg_info.to_hu_conv_name
                        else:
                            java_trait_constr = java_trait_constr + arg_info.arg_name

                    java_trait_constr = java_trait_constr + ");\n"
                    if ret_ty_info.java_ty != "void":
                        if ret_ty_info.from_hu_conv is not None:
                            java_trait_constr = java_trait_constr + "\t\t\t\t" + ret_ty_info.java_ty + " result = " + ret_ty_info.from_hu_conv[0] + ";\n"
                            if ret_ty_info.from_hu_conv[1] != "":
                                java_trait_constr = java_trait_constr + "\t\t\t\t" + ret_ty_info.from_hu_conv[1].replace("this", "impl_holder.held") + ";\n"
                            if ret_ty_info.rust_obj in result_types:
                                # Avoid double-free by breaking the result - we should learn to clone these and then we can be safe instead
                                java_trait_constr = java_trait_constr + "\t\t\t\tret.ptr = 0;\n"
                            java_trait_constr = java_trait_constr + "\t\t\t\treturn result;\n"
                        else:
                            java_trait_constr = java_trait_constr + "\t\t\t\treturn ret;\n"
                    java_trait_constr = java_trait_constr + "\t\t\t}\n"
            java_trait_constr = java_trait_constr + "\t\t}"
            for var_line in field_var_lines:
                if var_line.group(1) in trait_structs:
                    java_trait_constr = java_trait_constr + ", " + var_line.group(2) + ".new_impl(" + var_line.group(2) + "_impl).bindings_instance"
                else:
                    java_trait_constr = java_trait_constr + ", " + var_line.group(2)
            out_java_trait.write("\t}\n")
            out_java_trait.write(java_trait_constr + ");\n\t\treturn impl_holder.held;\n\t}\n")

            # Write out a clone function whether we need one or not, as we use them in moving to rust
            write_c("static void* " + struct_name + "_JCalls_clone(const void* this_arg) {\n")
            write_c("\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n")
            write_c("\tatomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);\n")
            for var_line in field_var_lines:
                if var_line.group(1) in trait_structs:
                    write_c("\tatomic_fetch_add_explicit(&j_calls->" + var_line.group(2) + "->refcnt, 1, memory_order_release);\n")
            write_c("\treturn (void*) this_arg;\n")
            write_c("}\n")

            out_java.write("\t}\n")

            out_java.write("\tpublic static native long " + struct_name + "_new(" + struct_name + " impl")
            write_c("static inline " + struct_name + " " + struct_name + "_init (" + consts.c_fn_args_pfx + ", jobject o")
            for idx, var_line in enumerate(field_var_lines):
                if var_line.group(1) in trait_structs:
                    out_java.write(", " + var_line.group(1) + " " + var_line.group(2))
                    write_c(", jobject " + var_line.group(2))
                else:
                    out_java.write(", " + field_var_convs[idx].java_ty + " " + var_line.group(2))
                    write_c(", " + field_var_convs[idx].c_ty + " " + var_line.group(2))
            out_java.write(");\n")
            write_c(") {\n")

            write_c("\tjclass c = (*env)->GetObjectClass(env, o);\n")
            write_c("\tCHECK(c != NULL);\n")
            write_c("\t" + struct_name + "_JCalls *calls = MALLOC(sizeof(" + struct_name + "_JCalls), \"" + struct_name + "_JCalls\");\n")
            write_c("\tatomic_init(&calls->refcnt, 1);\n")
            write_c("\tDO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);\n")
            write_c("\tcalls->o = (*env)->NewWeakGlobalRef(env, o);\n")
            for (fn_line, java_meth_descr) in java_meths:
                if fn_line.group(3) != "free" and fn_line.group(3) != "clone":
                    write_c("\tcalls->" + fn_line.group(3) + "_meth = (*env)->GetMethodID(env, c, \"" + fn_line.group(3) + "\", \"" + java_meth_descr + "\");\n")
                    write_c("\tCHECK(calls->" + fn_line.group(3) + "_meth != NULL);\n")
            for idx, var_line in enumerate(field_var_lines):
                if var_line.group(1) not in trait_structs and field_var_convs[idx].arg_conv is not None:
                    write_c("\n\t" + field_var_convs[idx].arg_conv.replace("\n", "\n\t") +"\n")
            write_c("\n\t" + struct_name + " ret = {\n")
            write_c("\t\t.this_arg = (void*) calls,\n")
            for fn_line in trait_fn_lines:
                if fn_line.group(3) != "free" and fn_line.group(3) != "clone":
                    write_c("\t\t." + fn_line.group(3) + " = " + fn_line.group(3) + "_jcall,\n")
                elif fn_line.group(3) == "free":
                    write_c("\t\t.free = " + struct_name + "_JCalls_free,\n")
                else:
                    write_c("\t\t.clone = " + struct_name + "_JCalls_clone,\n")
            for idx, var_line in enumerate(field_var_lines):
                if var_line.group(1) in trait_structs:
                    write_c("\t\t." + var_line.group(2) + " = " + var_line.group(1) + "_init(env, clz, " + var_line.group(2) + "),\n")
                elif field_var_convs[idx].arg_conv_name is not None:
                    write_c("\t\t." + var_line.group(2) + " = " + field_var_convs[idx].arg_conv_name + ",\n")
                    write_c("\t\t.set_" + var_line.group(2) + " = NULL,\n")
                else:
                    write_c("\t\t." + var_line.group(2) + " = " + var_line.group(2) + ",\n")
                    write_c("\t\t.set_" + var_line.group(2) + " = NULL,\n")
            write_c("\t};\n")
            for var_line in field_var_lines:
                if var_line.group(1) in trait_structs:
                    write_c("\tcalls->" + var_line.group(2) + " = ret." + var_line.group(2) + ".this_arg;\n")
            write_c("\treturn ret;\n")
            write_c("}\n")

            write_c(consts.c_fn_ty_pfx + "long " + consts.c_fn_name_pfx + struct_name.replace("_", "_1") + "_1new (" + consts.c_fn_args_pfx + ", jobject o")
            for idx, var_line in enumerate(field_var_lines):
                if var_line.group(1) in trait_structs:
                    write_c(", jobject " + var_line.group(2))
                else:
                    write_c(", " + field_var_convs[idx].c_ty + " " + var_line.group(2))
            write_c(") {\n")
            write_c("\t" + struct_name + " *res_ptr = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n")
            write_c("\t*res_ptr = " + struct_name + "_init(env, clz, o")
            for var_line in field_var_lines:
                write_c(", " + var_line.group(2))
            write_c(");\n")
            write_c("\treturn (long)res_ptr;\n")
            write_c("}\n")

            out_java.write("\tpublic static native " + struct_name + " " + struct_name + "_get_obj_from_jcalls(long val);\n")
            write_c(consts.c_fn_ty_pfx + "jobject " + consts.c_fn_name_pfx + struct_name.replace("_", "_1") + "_1get_1obj_1from_1jcalls (" + consts.c_fn_args_pfx + ", " + consts.ptr_c_ty + " val) {\n")
            write_c("\tjobject ret = (*env)->NewLocalRef(env, ((" + struct_name + "_JCalls*)val)->o);\n")
            write_c("\tCHECK(ret != NULL);\n")
            write_c("\treturn ret;\n")
            write_c("}\n")

        for fn_line in trait_fn_lines:
            # For now, just disable enabling the _call_log - we don't know how to inverse-map String
            is_log = fn_line.group(3) == "log" and struct_name == "LDKLogger"
            if fn_line.group(3) != "free" and fn_line.group(3) != "clone" and fn_line.group(3) != "eq" and not is_log:
                dummy_line = fn_line.group(2) + struct_name.replace("LDK", "") + "_" + fn_line.group(3) + " " + struct_name + "* this_arg" + fn_line.group(5) + "\n"
                map_fn(dummy_line, re.compile("([A-Za-z_0-9]*) *([A-Za-z_0-9]*) *(.*)").match(dummy_line), None, "(this_arg_conv->" + fn_line.group(3) + ")(this_arg_conv->this_arg")
        for idx, var_line in enumerate(field_var_lines):
            if var_line.group(1) not in trait_structs:
                write_c(var_line.group(1) + " " + struct_name + "_set_get_" + var_line.group(2) + "(" + struct_name + "* this_arg) {\n")
                write_c("\tif (this_arg->set_" + var_line.group(2) + " != NULL)\n")
                write_c("\t\tthis_arg->set_" + var_line.group(2) + "(this_arg);\n")
                write_c("\treturn this_arg->" + var_line.group(2) + ";\n")
                write_c("}\n")
                dummy_line = var_line.group(1) + " " + struct_name.replace("LDK", "") + "_get_" + var_line.group(2) + " " + struct_name + "* this_arg" + fn_line.group(5) + "\n"
                map_fn(dummy_line, re.compile("([A-Za-z_0-9]*) *([A-Za-z_0-9]*) *(.*)").match(dummy_line), None, struct_name + "_set_get_" + var_line.group(2) + "(this_arg_conv")

    def map_result(struct_name, res_ty, err_ty):
        result_types.add(struct_name)
        human_ty = struct_name.replace("LDKCResult", "Result")
        with open(f"{sys.argv[3]}/structs/{human_ty}{consts.file_ext}", "w") as out_java_struct:
            out_java_struct.write(consts.hu_struct_file_prefix)
            out_java_struct.write("public class " + human_ty + " extends CommonBase {\n")
            out_java_struct.write("\tprivate " + human_ty + "(Object _dummy, long ptr) { super(ptr); }\n")
            out_java_struct.write("\tprotected void finalize() throws Throwable {\n")
            out_java_struct.write("\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); } super.finalize();\n")
            out_java_struct.write("\t}\n\n")
            out_java_struct.write("\tstatic " + human_ty + " constr_from_ptr(long ptr) {\n")
            out_java_struct.write("\t\tif (bindings." + struct_name + "_result_ok(ptr)) {\n")
            out_java_struct.write("\t\t\treturn new " + human_ty + "_OK(null, ptr);\n")
            out_java_struct.write("\t\t} else {\n")
            out_java_struct.write("\t\t\treturn new " + human_ty + "_Err(null, ptr);\n")
            out_java_struct.write("\t\t}\n")
            out_java_struct.write("\t}\n")

            res_map = map_type(res_ty + " res", True, None, False, True)
            err_map = map_type(err_ty + " err", True, None, False, True)
            can_clone = True
            if not res_map.is_native_primitive and (res_map.rust_obj.replace("LDK", "") + "_clone" not in clone_fns):
                can_clone = False
            if not err_map.is_native_primitive and (err_map.rust_obj.replace("LDK", "") + "_clone" not in clone_fns):
                can_clone = False

            out_java.write("\tpublic static native boolean " + struct_name + "_result_ok(long arg);\n")
            write_c(consts.c_fn_ty_pfx + "jboolean " + consts.c_fn_name_pfx + struct_name.replace("_", "_1") + "_1result_1ok (" + consts.c_fn_args_pfx + ", " + consts.ptr_c_ty + " arg) {\n")
            write_c("\treturn ((" + struct_name + "*)arg)->result_ok;\n")
            write_c("}\n")

            out_java.write("\tpublic static native " + res_map.java_ty + " " + struct_name + "_get_ok(long arg);\n")
            write_c(consts.c_fn_ty_pfx + res_map.c_ty + " " + consts.c_fn_name_pfx + struct_name.replace("_", "_1") + "_1get_1ok (" + consts.c_fn_args_pfx + ", " + consts.ptr_c_ty + " arg) {\n")
            write_c("\t" + struct_name + " *val = (" + struct_name + "*)arg;\n")
            write_c("\tCHECK(val->result_ok);\n\t")
            out_java_struct.write("\tpublic static final class " + human_ty + "_OK extends " + human_ty + " {\n")
            if res_map.ret_conv is not None:
                write_c(res_map.ret_conv[0].replace("\n", "\n\t") + "(*val->contents.result)")
                write_c(res_map.ret_conv[1].replace("\n", "\n\t") + "\n\treturn " + res_map.ret_conv_name)
            else:
                write_c("return *val->contents.result")
            write_c(";\n}\n")

            if res_map.java_hu_ty != "void":
                out_java_struct.write("\t\tpublic final " + res_map.java_hu_ty + " res;\n")
            out_java_struct.write("\t\tprivate " + human_ty + "_OK(Object _dummy, long ptr) {\n")
            out_java_struct.write("\t\t\tsuper(_dummy, ptr);\n")
            if res_map.java_hu_ty == "void":
                pass
            elif res_map.to_hu_conv is not None:
                out_java_struct.write("\t\t\t" + res_map.java_ty + " res = bindings." + struct_name + "_get_ok(ptr);\n")
                out_java_struct.write("\t\t\t" + res_map.to_hu_conv.replace("\n", "\n\t\t\t"))
                out_java_struct.write("\n\t\t\tthis.res = " + res_map.to_hu_conv_name + ";\n")
            else:
                out_java_struct.write("\t\t\tthis.res = bindings." + struct_name + "_get_ok(ptr);\n")
            out_java_struct.write("\t\t}\n")
            if struct_name.startswith("LDKCResult_None"):
                out_java_struct.write("\t\tpublic " + human_ty + "_OK() {\n\t\t\tthis(null, bindings.C" + human_ty + "_ok());\n")
            else:
                out_java_struct.write("\t\tpublic " + human_ty + "_OK(" + res_map.java_hu_ty + " res) {\n")
                if res_map.from_hu_conv is not None:
                    out_java_struct.write("\t\t\tthis(null, bindings.C" + human_ty + "_ok(" + res_map.from_hu_conv[0] + "));\n")
                    if res_map.from_hu_conv[1] != "":
                        out_java_struct.write("\t\t\t" + res_map.from_hu_conv[1] + ";\n")
                else:
                    out_java_struct.write("\t\t\tthis(null, bindings.C" + human_ty + "_ok(res));\n")
            out_java_struct.write("\t\t}\n\t}\n\n")

            out_java.write("\tpublic static native " + err_map.java_ty + " " + struct_name + "_get_err(long arg);\n")
            write_c(consts.c_fn_ty_pfx + err_map.c_ty + " " + consts.c_fn_name_pfx + struct_name.replace("_", "_1") + "_1get_1err (" + consts.c_fn_args_pfx + ", " + consts.ptr_c_ty + " arg) {\n")
            write_c("\t" + struct_name + " *val = (" + struct_name + "*)arg;\n")
            write_c("\tCHECK(!val->result_ok);\n\t")
            out_java_struct.write("\tpublic static final class " + human_ty + "_Err extends " + human_ty + " {\n")
            if err_map.ret_conv is not None:
                write_c(err_map.ret_conv[0].replace("\n", "\n\t") + "(*val->contents.err)")
                write_c(err_map.ret_conv[1].replace("\n", "\n\t") + "\n\treturn " + err_map.ret_conv_name)
            else:
                write_c("return *val->contents.err")
            write_c(";\n}\n")

            if err_map.java_hu_ty != "void":
                out_java_struct.write("\t\tpublic final " + err_map.java_hu_ty + " err;\n")
            out_java_struct.write("\t\tprivate " + human_ty + "_Err(Object _dummy, long ptr) {\n")
            out_java_struct.write("\t\t\tsuper(_dummy, ptr);\n")
            if err_map.java_hu_ty == "void":
                pass
            elif err_map.to_hu_conv is not None:
                out_java_struct.write("\t\t\t" + err_map.java_ty + " err = bindings." + struct_name + "_get_err(ptr);\n")
                out_java_struct.write("\t\t\t" + err_map.to_hu_conv.replace("\n", "\n\t\t\t"))
                out_java_struct.write("\n\t\t\tthis.err = " + err_map.to_hu_conv_name + ";\n")
            else:
                out_java_struct.write("\t\t\tthis.err = bindings." + struct_name + "_get_err(ptr);\n")
            out_java_struct.write("\t\t}\n")

            if struct_name.endswith("NoneZ"):
                out_java_struct.write("\t\tpublic " + human_ty + "_Err() {\n\t\t\tthis(null, bindings.C" + human_ty + "_err());\n")
            else:
                out_java_struct.write("\t\tpublic " + human_ty + "_Err(" + err_map.java_hu_ty + " err) {\n")
                if err_map.from_hu_conv is not None:
                    out_java_struct.write("\t\t\tthis(null, bindings.C" + human_ty + "_err(" + err_map.from_hu_conv[0] + "));\n")
                    if err_map.from_hu_conv[1] != "":
                        out_java_struct.write("\t\t\t" + err_map.from_hu_conv[1] + ";\n")
                else:
                    out_java_struct.write("\t\t\tthis(null, bindings.C" + human_ty + "_err(err));\n")
            out_java_struct.write("\t\t}\n\t}\n}\n")

            if can_clone:
                clone_fns.add(struct_name.replace("LDK", "") + "_clone")
                write_c("static inline " + struct_name + " " + struct_name.replace("LDK", "") + "_clone(const " + struct_name + " *orig) {\n")
                write_c("\t" + struct_name + " res = { .result_ok = orig->result_ok };\n")
                write_c("\tif (orig->result_ok) {\n")
                if res_map.c_ty == "void":
                    write_c("\t\tres.contents.result = NULL;\n")
                else:
                    if res_map.is_native_primitive:
                        write_c("\t\t" + res_map.c_ty + "* contents = MALLOC(sizeof(" + res_map.c_ty + "), \"" + res_map.c_ty + " result OK clone\");\n")
                        write_c("\t\t*contents = *orig->contents.result;\n")
                    else:
                        write_c("\t\t" + res_map.rust_obj + "* contents = MALLOC(sizeof(" + res_map.rust_obj + "), \"" + res_map.rust_obj + " result OK clone\");\n")
                        write_c("\t\t*contents = " + res_map.rust_obj.replace("LDK", "") + "_clone(orig->contents.result);\n")
                    write_c("\t\tres.contents.result = contents;\n")
                write_c("\t} else {\n")
                if err_map.c_ty == "void":
                    write_c("\t\tres.contents.err = NULL;\n")
                else:
                    if err_map.is_native_primitive:
                        write_c("\t\t" + err_map.c_ty + "* contents = MALLOC(sizeof(" + err_map.c_ty + "), \"" + err_map.c_ty + " result Err clone\");\n")
                        write_c("\t\t*contents = *orig->contents.err;\n")
                    else:
                        write_c("\t\t" + err_map.rust_obj + "* contents = MALLOC(sizeof(" + err_map.rust_obj + "), \"" + err_map.rust_obj + " result Err clone\");\n")
                        write_c("\t\t*contents = " + err_map.rust_obj.replace("LDK", "") + "_clone(orig->contents.err);\n")
                    write_c("\t\tres.contents.err = contents;\n")
                write_c("\t}\n\treturn res;\n}\n")

    def map_tuple(struct_name, field_lines):
        out_java.write("\tpublic static native long " + struct_name + "_new(")
        write_c(consts.c_fn_ty_pfx + consts.ptr_c_ty + " " + consts.c_fn_name_pfx + struct_name.replace("_", "_1") + "_1new(" + consts.c_fn_args_pfx)
        ty_list = []
        for idx, line in enumerate(field_lines):
            if idx != 0 and idx < len(field_lines) - 2:
                ty_info = java_c_types(line.strip(';'), None)
                if idx != 1:
                    out_java.write(", ")
                e = chr(ord('a') + idx - 1)
                out_java.write(ty_info.java_ty + " " + e)
                write_c(", " + ty_info.c_ty + " " + e)
                ty_list.append(ty_info)
        tuple_types[struct_name] = (ty_list, struct_name)
        out_java.write(");\n")
        write_c(") {\n")
        write_c("\t" + struct_name + "* ret = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n")
        can_clone = True
        clone_str = "static inline " + struct_name + " " + struct_name.replace("LDK", "") + "_clone(const " + struct_name + " *orig) {\n"
        clone_str = clone_str + "\t" + struct_name + " ret = {\n"
        for idx, line in enumerate(field_lines):
            if idx != 0 and idx < len(field_lines) - 2:
                ty_info = map_type(line.strip(';'), False, None, False, False)
                e = chr(ord('a') + idx - 1)
                if ty_info.arg_conv is not None:
                    write_c("\t" + ty_info.arg_conv.replace("\n", "\n\t"))
                    write_c("\n\tret->" + e + " = " + ty_info.arg_conv_name + ";\n")
                else:
                    write_c("\tret->" + e + " = " + e + ";\n")
                if ty_info.arg_conv_cleanup is not None:
                    write_c("\t//TODO: Really need to call " + ty_info.arg_conv_cleanup + " here\n")
                if not ty_info.is_native_primitive and (ty_info.rust_obj.replace("LDK", "") + "_clone") not in clone_fns:
                    can_clone = False
                elif can_clone and ty_info.is_native_primitive:
                    clone_str = clone_str + "\t\t." + chr(ord('a') + idx - 1) + " = orig->" + chr(ord('a') + idx - 1) + ",\n"
                elif can_clone:
                    clone_str = clone_str + "\t\t." + chr(ord('a') + idx - 1) + " = " + ty_info.rust_obj.replace("LDK", "") + "_clone(&orig->" + chr(ord('a') + idx - 1) + "),\n"
        write_c("\treturn (long)ret;\n")
        write_c("}\n")

        if can_clone:
            clone_fns.add(struct_name.replace("LDK", "") + "_clone")
            write_c(clone_str)
            write_c("\t};\n\treturn ret;\n}\n")

        for idx, ty_info in enumerate(ty_list):
            e = chr(ord('a') + idx)
            out_java.write("\tpublic static native " + ty_info.java_ty + " " + struct_name + "_get_" + e + "(long ptr);\n")
            write_c(consts.c_fn_ty_pfx + ty_info.c_ty + " " + consts.c_fn_name_pfx + struct_name.replace("_", "_1") + "_1get_1" + e + "(" + consts.c_fn_args_pfx + ", " + consts.ptr_c_ty + " ptr) {\n")
            write_c("\t" + struct_name + " *tuple = (" + struct_name + "*)ptr;\n")
            conv_info = map_type_with_info(ty_info, False, None, False, True)
            if conv_info.ret_conv is not None:
                write_c("\t" + conv_info.ret_conv[0].replace("\n", "\n\t") + "tuple->" + e + conv_info.ret_conv[1].replace("\n", "\n\t") + "\n")
                write_c("\treturn " + conv_info.ret_conv_name + ";\n")
            else:
                write_c("\treturn tuple->" + e + ";\n")
            write_c("}\n")

    out_java.write("""package org.ldk.impl;
import org.ldk.enums.*;

public class bindings {
	public static class VecOrSliceDef {
		public long dataptr;
		public long datalen;
		public long stride;
		public VecOrSliceDef(long dataptr, long datalen, long stride) {
			this.dataptr = dataptr; this.datalen = datalen; this.stride = stride;
		}
	}
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

""")

    with open(f"{sys.argv[3]}/structs/CommonBase{consts.file_ext}", "a") as out_java_struct:
        out_java_struct.write(consts.common_base)

    in_block_comment = False
    cur_block_obj = None

    const_val_regex = re.compile("^extern const ([A-Za-z_0-9]*) ([A-Za-z_0-9]*);$")

    line_indicates_result_regex = re.compile("^   union (LDKCResult_[A-Za-z_0-9]*Ptr) contents;$")
    line_indicates_vec_regex = re.compile("^   (struct |enum |union )?([A-Za-z_0-9]*) \*data;$")
    line_indicates_opaque_regex = re.compile("^   bool is_owned;$")
    line_indicates_trait_regex = re.compile("^   (struct |enum |union )?([A-Za-z_0-9]* \*?)\(\*([A-Za-z_0-9]*)\)\((const )?void \*this_arg(.*)\);$")
    assert(line_indicates_trait_regex.match("   uintptr_t (*send_data)(void *this_arg, LDKu8slice data, bool resume_read);"))
    assert(line_indicates_trait_regex.match("   struct LDKCVec_MessageSendEventZ (*get_and_clear_pending_msg_events)(const void *this_arg);"))
    assert(line_indicates_trait_regex.match("   void *(*clone)(const void *this_arg);"))
    assert(line_indicates_trait_regex.match("   struct LDKCVec_u8Z (*write)(const void *this_arg);"))
    line_field_var_regex = re.compile("^   struct ([A-Za-z_0-9]*) ([A-Za-z_0-9]*);$")
    assert(line_field_var_regex.match("   struct LDKMessageSendEventsProvider MessageSendEventsProvider;"))
    assert(line_field_var_regex.match("   struct LDKChannelPublicKeys pubkeys;"))
    struct_name_regex = re.compile("^typedef (struct|enum|union) (MUST_USE_STRUCT )?(LDK[A-Za-z_0-9]*) {$")
    assert(struct_name_regex.match("typedef struct LDKCVec_u8Z {"))
    assert(struct_name_regex.match("typedef enum LDKNetwork {"))

    union_enum_items = {}
    result_ptr_struct_items = {}
    for line in in_h:
        if in_block_comment:
            if line.endswith("*/\n"):
                in_block_comment = False
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

                for idx, struct_line in enumerate(obj_lines):
                    if struct_line.strip().startswith("/*"):
                        in_block_comment = True
                    if in_block_comment:
                        if struct_line.endswith("*/"):
                            in_block_comment = False
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
                            trait_fn_lines.append(trait_fn_match)
                        field_var_match = line_field_var_regex.match(struct_line)
                        if field_var_match is not None:
                            field_var_lines.append(field_var_match)
                        field_lines.append(struct_line)

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
                        out_java_struct.write(consts.hu_struct_file_prefix)
                        out_java_struct.write("public class " + struct_name.replace("LDK","") + " extends CommonBase")
                        if struct_name.startswith("LDKLocked"):
                            out_java_struct.write(" implements AutoCloseable")
                        out_java_struct.write(" {\n")
                        out_java_struct.write("\t" + struct_name.replace("LDK", "") + "(Object _dummy, long ptr) { super(ptr); }\n")
                        if struct_name.startswith("LDKLocked"):
                            out_java_struct.write("\t@Override public void close() {\n")
                        else:
                            out_java_struct.write("\t@Override @SuppressWarnings(\"deprecation\")\n")
                            out_java_struct.write("\tprotected void finalize() throws Throwable {\n")
                            out_java_struct.write("\t\tsuper.finalize();\n")
                        out_java_struct.write("\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); }\n")
                        out_java_struct.write("\t}\n\n")
                elif result_contents is not None:
                    assert result_contents in result_ptr_struct_items
                    res_ty, err_ty = result_ptr_struct_items[result_contents]
                    map_result(struct_name, res_ty, err_ty)
                elif struct_name.startswith("LDKCResult_") and struct_name.endswith("ZPtr"):
                    for line in field_lines:
                        if line.endswith("*result;"):
                            res_ty = line[:-8].strip()
                        elif line.endswith("*err;"):
                            err_ty = line[:-5].strip()
                    result_ptr_struct_items[struct_name] = (res_ty, err_ty)
                    result_types.add(struct_name[:-3])
                elif is_tuple:
                    map_tuple(struct_name, field_lines)
                elif vec_ty is not None:
                    ty_info = map_type(vec_ty + " arr_elem", False, None, False, False)
                    if len(ty_info.java_fn_ty_arg) == 1: # ie we're a primitive of some form
                        out_java.write("\tpublic static native long " + struct_name + "_new(" + ty_info.java_ty + "[] elems);\n")
                        write_c(consts.c_fn_ty_pfx + consts.ptr_c_ty + " " + consts.c_fn_name_pfx + struct_name.replace("_", "_1") + "_1new(" + consts.c_fn_args_pfx + ", " + ty_info.c_ty + "Array elems) {\n")
                        write_c("\t" + struct_name + " *ret = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n")
                        write_c("\tret->datalen = " + consts.get_native_arr_len_call[0] + "elems" + consts.get_native_arr_len_call[1] + ";\n")
                        write_c("\tif (ret->datalen == 0) {\n")
                        write_c("\t\tret->data = NULL;\n")
                        write_c("\t} else {\n")
                        write_c("\t\tret->data = MALLOC(sizeof(" + vec_ty + ") * ret->datalen, \"" + struct_name + " Data\");\n")
                        write_c("\t\t" + ty_info.c_ty + " *java_elems = " + consts.get_native_arr_ptr_call[0] + "elems" + consts.get_native_arr_ptr_call[1] + ";\n")
                        write_c("\t\tfor (size_t i = 0; i < ret->datalen; i++) {\n")
                        if ty_info.arg_conv is not None:
                            write_c("\t\t\t" + ty_info.c_ty + " arr_elem = java_elems[i];\n")
                            write_c("\t\t\t" + ty_info.arg_conv.replace("\n", "\n\t\t\t") + "\n")
                            write_c("\t\t\tret->data[i] = " + ty_info.arg_conv_name + ";\n")
                            assert ty_info.arg_conv_cleanup is None
                        else:
                            write_c("\t\t\tret->data[i] = java_elems[i];\n")
                        write_c("\t\t}\n")
                        cleanup = consts.release_native_arr_ptr_call("elems", "java_elems")
                        if cleanup is not None:
                            write_c("\t\t" + cleanup + ";\n")
                        write_c("\t}\n")
                        write_c("\treturn (long)ret;\n")
                        write_c("}\n")

                    if ty_info.is_native_primitive:
                        clone_fns.add(struct_name.replace("LDK", "") + "_clone")
                        write_c("static inline " + struct_name + " " + struct_name.replace("LDK", "") + "_clone(const " + struct_name + " *orig) {\n")
                        write_c("\t" + struct_name + " ret = { .data = MALLOC(sizeof(" + ty_info.c_ty + ") * orig->datalen, \"" + struct_name + " clone bytes\"), .datalen = orig->datalen };\n")
                        write_c("\tmemcpy(ret.data, orig->data, sizeof(" + ty_info.c_ty + ") * ret.datalen);\n")
                        write_c("\treturn ret;\n}\n")
                    elif (ty_info.rust_obj.replace("LDK", "") + "_clone") in clone_fns:
                        ty_name = "CVec_" + ty_info.rust_obj.replace("LDK", "") + "Z";
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
                    map_complex_enum(struct_name, union_enum_items[struct_name])
                elif is_unitary_enum:
                    map_unitary_enum(struct_name, field_lines)
                elif len(trait_fn_lines) > 0:
                    trait_structs.add(struct_name)
                    map_trait(struct_name, field_var_lines, trait_fn_lines)
                elif struct_name == "LDKTxOut":
                    with open(f"{sys.argv[3]}/structs/TxOut{consts.file_ext}", "w") as out_java_struct:
                        out_java_struct.write(consts.hu_struct_file_prefix)
                        out_java_struct.write("public class TxOut extends CommonBase{\n")
                        out_java_struct.write("\tTxOut(java.lang.Object _dummy, long ptr) { super(ptr); }\n")
                        out_java_struct.write("\tlong to_c_ptr() { return 0; }\n")
                        out_java_struct.write("\t@Override @SuppressWarnings(\"deprecation\")\n")
                        out_java_struct.write("\tprotected void finalize() throws Throwable {\n")
                        out_java_struct.write("\t\tsuper.finalize();\n")
                        out_java_struct.write("\t\tif (ptr != 0) { bindings.TxOut_free(ptr); }\n")
                        out_java_struct.write("\t}\n")
                        # TODO: TxOut body
                        out_java_struct.write("}")
                else:
                    pass # Everything remaining is a byte[] or some form
                cur_block_obj = None
        else:
            fn_ptr = fn_ptr_regex.match(line)
            fn_ret_arr = fn_ret_arr_regex.match(line)
            reg_fn = reg_fn_regex.match(line)
            const_val = const_val_regex.match(line)

            if line.startswith("#include <"):
                pass
            elif line.startswith("/*"):
                #out_java.write("\t" + line)
                if not line.endswith("*/\n"):
                    in_block_comment = True
            elif line.startswith("typedef enum "):
                cur_block_obj = line
            elif line.startswith("typedef struct "):
                cur_block_obj = line
            elif line.startswith("typedef union "):
                cur_block_obj = line
            elif fn_ptr is not None:
                map_fn(line, fn_ptr, None, None)
            elif fn_ret_arr is not None:
                map_fn(line, fn_ret_arr, fn_ret_arr.group(4), None)
            elif reg_fn is not None:
                map_fn(line, reg_fn, None, None)
            elif const_val_regex is not None:
                # TODO Map const variables
                pass
            else:
                assert(line == "\n")

    out_java.write("}\n")
    for struct_name in opaque_structs:
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '')}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n")
    for struct_name in trait_structs:
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '')}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n")
with open(sys.argv[4], "w") as out_c:
    out_c.write(consts.c_file_pfx)
    out_c.write(consts.init_str(c_array_class_caches))
    out_c.write(c_file)
