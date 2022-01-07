#!/usr/bin/env python3
import os, sys, re, subprocess

if len(sys.argv) < 7:
    print("USAGE: /path/to/lightning.h /path/to/bindings/output /path/to/bindings/ /path/to/bindings/output.c debug lang")
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
elif sys.argv[6] == "typescript":
    import typescript_strings
    from typescript_strings import Consts
    target = typescript_strings.Target.NODEJS
    if len(sys.argv) == 8 and sys.argv[7] == 'browser':
        target = typescript_strings.Target.BROWSER
else:
    print("Only java or typescript can be set for lang")
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
    elif fn_arg.startswith("LDKTxid"):
        fn_arg = "uint8_t (*" + fn_arg[8:] + ")[32]"
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
    elif fn_arg.startswith("LDKRecoverableSignature"):
        fn_arg = "uint8_t (*" + fn_arg[25:] + ")[68]"
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
                java_fn_ty_arg="[" + res.java_fn_ty_arg, c_ty=res.c_ty + "Array", passed_as_ptr=False, is_ptr=is_ptr,
                nonnull_ptr=nonnull_ptr, is_const=is_const,
                var_name=res.var_name, arr_len="datalen", arr_access="data", subty=res, is_native_primitive=False)
        else:
            return TypeInfo(rust_obj=fn_arg.split(" ")[0], java_ty=res.java_ty + "[]", java_hu_ty=res.java_hu_ty + "[]",
                java_fn_ty_arg="[" + res.java_fn_ty_arg, c_ty=consts.ptr_arr, passed_as_ptr=False, is_ptr=is_ptr,
                nonnull_ptr=nonnull_ptr, is_const=is_const,
                var_name=res.var_name, arr_len="datalen", arr_access="data", subty=res, is_native_primitive=False)

    is_primitive = False
    contains_trait = False
    arr_len = None
    mapped_type = []
    java_type_plural = None
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
        mapped_type = consts.c_type_map['uint8_t']
        java_ty = mapped_type[0]
        c_ty = "int8_t"
        fn_ty_arg = "B"
        fn_arg = fn_arg[7:].strip()
        is_primitive = True
    elif fn_arg.startswith("LDKu5"):
        java_ty = consts.c_type_map['uint8_t'][0]
        java_hu_ty = "UInt5"
        rust_obj = "LDKu5"
        c_ty = "int8_t"
        fn_ty_arg = "B"
        fn_arg = fn_arg[6:].strip()
    elif fn_arg.startswith("uint16_t"):
        mapped_type = consts.c_type_map['uint16_t']
        java_ty = mapped_type[0]
        c_ty = "int16_t"
        fn_ty_arg = "S"
        fn_arg = fn_arg[8:].strip()
        is_primitive = True
    elif fn_arg.startswith("uint32_t"):
        mapped_type = consts.c_type_map['uint32_t']
        java_ty = mapped_type[0]
        c_ty = "int32_t"
        fn_ty_arg = "I"
        fn_arg = fn_arg[8:].strip()
        is_primitive = True
    elif fn_arg.startswith("uint64_t") or fn_arg.startswith("uintptr_t"):
        # TODO: uintptr_t is arch-dependent :(
        mapped_type = consts.c_type_map['uint64_t']
        java_ty = mapped_type[0]
        fn_ty_arg = "J"
        if fn_arg.startswith("uint64_t"):
            c_ty = "int64_t"
            fn_arg = fn_arg[8:].strip()
        else:
            c_ty = "int64_t"
            rust_obj = "uintptr_t"
            fn_arg = fn_arg[9:].strip()
        is_primitive = True
    elif is_const and fn_arg.startswith("char *"):
        java_ty = "String"
        c_ty = "const char*"
        fn_ty_arg = "Ljava/lang/String;"
        fn_arg = fn_arg[6:].strip()
    elif fn_arg.startswith("LDKStr"):
        rust_obj = "LDKStr"
        java_ty = "String"
        c_ty = "jstring"
        fn_ty_arg = "Ljava/lang/String;"
        fn_arg = fn_arg[6:].strip()
        arr_access = "chars"
        arr_len = "len"
    else:
        ma = var_ty_regex.match(fn_arg)
        if ma.group(1).strip() in unitary_enums:
            assert ma.group(1).strip().startswith("LDK")
            java_ty = ma.group(1).strip()[3:]
            java_hu_ty = java_ty
            c_ty = consts.result_c_ty
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
    if var_is_arr is not None or ret_arr_len is not None:
        assert(not take_by_ptr)
        assert(not is_ptr)
        # is there a special case for plurals?
        if len(mapped_type) == 2:
            java_ty = mapped_type[1]
        else:
            java_ty = java_ty + "[]"
        c_ty = c_ty + "Array"
        if var_is_arr is not None:
            if var_is_arr.group(1) == "":
                return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_ty, java_fn_ty_arg="[" + fn_ty_arg, c_ty=c_ty, is_const=is_const,
                    passed_as_ptr=False, is_ptr=False, nonnull_ptr=nonnull_ptr, var_name="arg",
                    arr_len=var_is_arr.group(2), arr_access=arr_access, is_native_primitive=False, contains_trait=contains_trait)
            return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_ty, java_fn_ty_arg="[" + fn_ty_arg, c_ty=c_ty, is_const=is_const,
                passed_as_ptr=False, is_ptr=False, nonnull_ptr=nonnull_ptr, var_name=var_is_arr.group(1),
                arr_len=var_is_arr.group(2), arr_access=arr_access, is_native_primitive=False, contains_trait=contains_trait)

    if java_hu_ty is None:
        java_hu_ty = java_ty
    return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_hu_ty, java_fn_ty_arg=fn_ty_arg, c_ty=c_ty, passed_as_ptr=is_ptr or take_by_ptr,
        is_const=is_const, is_ptr=is_ptr, nonnull_ptr=nonnull_ptr, var_name=fn_arg, arr_len=arr_len, arr_access=arr_access, is_native_primitive=is_primitive,
        contains_trait=contains_trait)

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
write_c("static inline struct LDKThirtyTwoBytes ThirtyTwoBytes_clone(const struct LDKThirtyTwoBytes *orig) { struct LDKThirtyTwoBytes ret; memcpy(ret.data, orig->data, 32); return ret; }\n")

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
            meth_line = "uint64_t " + expected_struct.replace("LDK", "") + "_clone_ptr(" + expected_struct + " *NONNULL_PTR arg)"
            write_c("static inline " + meth_line + " {\n")
            write_c("\t" + return_type_info.ret_conv[0].replace("\n", "\n\t"))
            write_c(method_name + "(arg)")
            write_c(return_type_info.ret_conv[1])
            write_c("\n\treturn " + return_type_info.ret_conv_name + ";\n}\n")
            map_fn(meth_line + ";\n", re.compile("(uint64_t) ([A-Za-z_0-9]*)\((.*)\)").match(meth_line), None, None, None)

        argument_types = []
        default_constructor_args = {}
        takes_self = False
        takes_self_ptr = False
        args_known = True

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
                if argument_conversion_info.arg_conv is not None and "Warning" in argument_conversion_info.arg_conv:
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
                    assert argument_conversion_info.arg_conv is not None and "Warning" not in argument_conversion_info.arg_conv
            else:
                argument_conversion_info = type_mapping_generator.map_type_with_info(arg_ty, False, None, is_free, True, False)

            if argument_conversion_info.arg_conv is not None and "Warning" in argument_conversion_info.arg_conv:
                if argument_conversion_info.rust_obj in constructor_fns:
                    assert not is_free
                    for explode_arg in constructor_fns[argument_conversion_info.rust_obj].split(','):
                        explode_arg_conv = type_mapping_generator.map_type(explode_arg, False, None, False, True)
                        if explode_arg_conv.c_ty == "void":
                            # We actually want to handle this case, but for now its only used in NetGraphMsgHandler::new()
                            # which ends up resulting in a redundant constructor - both without arguments for the NetworkGraph.
                            args_known = False
                            pass
                        if not argument_conversion_info.arg_name in default_constructor_args:
                            default_constructor_args[argument_conversion_info.arg_name] = []
                        default_constructor_args[argument_conversion_info.arg_name].append(explode_arg_conv)
            argument_types.append(argument_conversion_info)
        if not takes_self and return_type_info.java_hu_ty != struct_meth:
            if not return_type_info.java_hu_ty.startswith("Result_" + struct_meth):
                struct_meth_name = method_name
                struct_meth = ""
                expected_struct = ""

        out_java.write("\t// " + line)
        (out_java_delta, out_c_delta, out_java_struct_delta) = \
            consts.map_function(argument_types, c_call_string, method_name, struct_meth_name, return_type_info, struct_meth, default_constructor_args, takes_self, takes_self_ptr, args_known, type_mapping_generator, doc_comment)
        out_java.write(out_java_delta)

        if is_free:
            assert len(argument_types) == 1
            assert return_type_info.c_ty == "void"
            write_c(consts.c_fn_ty_pfx + "void " + consts.c_fn_name_define_pfx(method_name, True) + argument_types[0].c_ty + " " + argument_types[0].ty_info.var_name + ") {\n")
            if argument_types[0].ty_info.passed_as_ptr and not argument_types[0].ty_info.rust_obj in opaque_structs:
                write_c("\tif ((" + argument_types[0].ty_info.var_name + " & 1) != 0) return;\n")

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
        if (expected_struct in opaque_structs or expected_struct in trait_structs
                or expected_struct in complex_enums or expected_struct in complex_enums
                or expected_struct in result_types or expected_struct in tuple_types) and not is_free:
            out_java_struct = open(f"{sys.argv[3]}/structs/{struct_meth}{consts.file_ext}", "a")
            out_java_struct.write(out_java_struct_delta)
        elif (not is_free and not method_name.endswith("_clone") and
                not method_name.startswith("TxOut") and
                not method_name.startswith("_") and
                method_name != "check_platform" and method_name != "Result_read" and
                not expected_struct in unitary_enums and
                ((not method_name.startswith("C2Tuple_") and not method_name.startswith("C3Tuple_"))
                  or method_name.endswith("_read"))):
            out_java_struct = open(f"{sys.argv[3]}/structs/UtilMethods{consts.file_ext}", "a")
            for line in out_java_struct_delta.splitlines():
                if not line.strip().startswith("this."):
                    out_java_struct.write(line + "\n")
                else:
                    out_java_struct.write("\t\t// " + line.strip() + "\n")

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
                    mapped = type_mapping_generator.map_type(inline_enum_variants[camel_to_snake(variant_name)] + " " + camel_to_snake(variant_name), False, None, False, True)
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
                    flattened_field_var_convs.append((var_line.group(1), var_line.group(2), ))
                    flattened_field_var_convs.extend(trait_structs[var_line.group(1)])
                else:
                    mapped = type_mapping_generator.map_type(var_line.group(1) + " " + var_line.group(2), False, None, False, False)
                    field_var_convs.append(mapped)
                    flattened_field_var_convs.append(mapped)
            trait_structs[struct_name] = field_var_convs

            field_fns = []
            for fn_docs, fn_line in trait_fn_lines:
                if fn_line == "cloned":
                    ret_ty_info = type_mapping_generator.map_type("void", True, None, False, False)
                    field_fns.append(TraitMethInfo("cloned", False, ret_ty_info, [], fn_docs))
                else:
                    (nullable_params, ret_nullable) = doc_to_params_ret_nullable(fn_docs)
                    if ret_nullable:
                        assert False # This isn't yet handled on the Java side
                        ret_ty_info.nullable = True
                        ret_ty_info = type_mapping_generator.map_nullable_type(fn_line.group(2).strip() + " ret", True, None, False, False)
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
        with open(f"{sys.argv[3]}/structs/{human_ty}{consts.file_ext}", "w") as out_java_struct:
            out_java_struct.write(consts.hu_struct_file_prefix)
            out_java_struct.write("public class " + human_ty + " extends CommonBase {\n")
            out_java_struct.write("\tprivate " + human_ty + "(Object _dummy, long ptr) { super(ptr); }\n")
            out_java_struct.write("\tprotected void finalize() throws Throwable {\n")
            out_java_struct.write("\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); } super.finalize();\n")
            out_java_struct.write("\t}\n\n")
            out_java_struct.write("\tstatic " + human_ty + " constr_from_ptr(long ptr) {\n")
            out_java_struct.write("\t\tif (bindings." + struct_name.replace("LDK", "") + "_is_ok(ptr)) {\n")
            out_java_struct.write("\t\t\treturn new " + human_ty + "_OK(null, ptr);\n")
            out_java_struct.write("\t\t} else {\n")
            out_java_struct.write("\t\t\treturn new " + human_ty + "_Err(null, ptr);\n")
            out_java_struct.write("\t\t}\n")
            out_java_struct.write("\t}\n")

            res_map = type_mapping_generator.map_type(res_ty + " res", True, None, False, True)
            err_map = type_mapping_generator.map_type(err_ty + " err", True, None, False, True)
            can_clone = True
            if not res_map.is_native_primitive and (res_map.rust_obj.replace("LDK", "") + "_clone" not in clone_fns):
                can_clone = False
            if not err_map.is_native_primitive and (err_map.rust_obj.replace("LDK", "") + "_clone" not in clone_fns):
                can_clone = False

            create_getter(struct_name, res_ty, "ok", ("*", "->contents.result"), ("", "->result_ok"))
            create_getter(struct_name, err_ty, "err", ("*", "->contents.err"), ("!", "->result_ok"))

            out_java_struct.write("\tpublic static final class " + human_ty + "_OK extends " + human_ty + " {\n")

            if res_map.java_hu_ty != "void":
                out_java_struct.write("\t\tpublic final " + res_map.java_hu_ty + " res;\n")
            out_java_struct.write("\t\tprivate " + human_ty + "_OK(Object _dummy, long ptr) {\n")
            out_java_struct.write("\t\t\tsuper(_dummy, ptr);\n")
            if res_map.java_hu_ty == "void":
                pass
            elif res_map.to_hu_conv is not None:
                out_java_struct.write("\t\t\t" + res_map.java_ty + " res = bindings." + struct_name.replace("LDK", "") + "_get_ok(ptr);\n")
                out_java_struct.write("\t\t\t" + res_map.to_hu_conv.replace("\n", "\n\t\t\t"))
                out_java_struct.write("\n\t\t\tthis.res = " + res_map.to_hu_conv_name + ";\n")
            else:
                out_java_struct.write("\t\t\tthis.res = bindings." + struct_name.replace("LDK", "") + "_get_ok(ptr);\n")
            out_java_struct.write("\t\t}\n")
            out_java_struct.write("\t}\n\n")

            out_java_struct.write("\tpublic static final class " + human_ty + "_Err extends " + human_ty + " {\n")
            if err_map.java_hu_ty != "void":
                out_java_struct.write("\t\tpublic final " + err_map.java_hu_ty + " err;\n")
            out_java_struct.write("\t\tprivate " + human_ty + "_Err(Object _dummy, long ptr) {\n")
            out_java_struct.write("\t\t\tsuper(_dummy, ptr);\n")
            if err_map.java_hu_ty == "void":
                pass
            elif err_map.to_hu_conv is not None:
                out_java_struct.write("\t\t\t" + err_map.java_ty + " err = bindings." + struct_name.replace("LDK", "") + "_get_err(ptr);\n")
                out_java_struct.write("\t\t\t" + err_map.to_hu_conv.replace("\n", "\n\t\t\t"))
                out_java_struct.write("\n\t\t\tthis.err = " + err_map.to_hu_conv_name + ";\n")
            else:
                out_java_struct.write("\t\t\tthis.err = bindings." + struct_name.replace("LDK", "") + "_get_err(ptr);\n")
            out_java_struct.write("\t\t}\n")

            out_java_struct.write("\t}\n\n")

    def create_getter(struct_name, field_decl, field_name, accessor, check_sfx):
        field_ty = java_c_types(field_decl + " " + field_name, None)
        ptr_fn_defn = field_decl + " *" + struct_name.replace("LDK", "") + "_get_" + field_name + "(" + struct_name + " *NONNULL_PTR owner)"
        owned_fn_defn = field_decl + " " + struct_name.replace("LDK", "") + "_get_" + field_name + "(" + struct_name + " *NONNULL_PTR owner)"

        holds_ref = False
        if field_ty.rust_obj is not None and field_ty.rust_obj.replace("LDK", "") + "_clone" in clone_fns:
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
                    tuple_variants = {}
                    elem_items = -1
                    for line, _ in field_lines:
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
                            tuple_variants[split[1].strip(";")] = split[0]
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
                        out_java_struct.write("public class TxOut extends CommonBase{\n")
                        out_java_struct.write("\t/** The script_pubkey in this output */\n")
                        out_java_struct.write("\tpublic final byte[] script_pubkey;\n")
                        out_java_struct.write("\t/** The value, in satoshis, of this output */\n")
                        out_java_struct.write("\tpublic final long value;\n")
                        out_java_struct.write("\n")
                        out_java_struct.write("\tTxOut(java.lang.Object _dummy, long ptr) {\n")
                        out_java_struct.write("\t\tsuper(ptr);\n")
                        out_java_struct.write("\t\tthis.script_pubkey = bindings.TxOut_get_script_pubkey(ptr);\n")
                        out_java_struct.write("\t\tthis.value = bindings.TxOut_get_value(ptr);\n")
                        out_java_struct.write("\t}\n")
                        out_java_struct.write("\tpublic TxOut(long value, byte[] script_pubkey) {\n")
                        out_java_struct.write("\t\tsuper(bindings.TxOut_new(script_pubkey, value));\n")
                        out_java_struct.write("\t\tthis.script_pubkey = bindings.TxOut_get_script_pubkey(ptr);\n")
                        out_java_struct.write("\t\tthis.value = bindings.TxOut_get_value(ptr);\n")
                        out_java_struct.write("\t}\n")
                        out_java_struct.write("\n")
                        out_java_struct.write("\t@Override @SuppressWarnings(\"deprecation\")\n")
                        out_java_struct.write("\tprotected void finalize() throws Throwable {\n")
                        out_java_struct.write("\t\tsuper.finalize();\n")
                        out_java_struct.write("\t\tif (ptr != 0) { bindings.TxOut_free(ptr); }\n")
                        out_java_struct.write("\t}\n")
                        out_java_struct.write("\n")
                        out_java_struct.write("}")
                        fn_line = "struct LDKCVec_u8Z TxOut_get_script_pubkey (struct LDKTxOut* thing)"
                        write_c(fn_line + " {")
                        write_c("\treturn CVec_u8Z_clone(&thing->script_pubkey);")
                        write_c("}")
                        map_fn(fn_line + "\n", re.compile("(.*) (TxOut_get_script_pubkey) \((.*)\)").match(fn_line), None, None, None)
                        fn_line = "uint64_t TxOut_get_value (struct LDKTxOut* thing)"
                        write_c(fn_line + " {")
                        write_c("\treturn thing->value;")
                        write_c("}")
                        map_fn(fn_line + "\n", re.compile("(.*) (TxOut_get_value) \((.*)\)").match(fn_line), None, None, None)
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

    out_java.write(consts.bindings_footer)
    for struct_name in opaque_structs:
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '')}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n")
    for struct_name in trait_structs:
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '')}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n")
    for struct_name in complex_enums:
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '').replace('COption', 'Option')}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n")
    for struct_name in result_types:
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDKCResult', 'Result')}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n")
    for struct_name in tuple_types:
        struct_hu_name = struct_name.replace("LDKC2Tuple", "TwoTuple").replace("LDKC3Tuple", "ThreeTuple")
        with open(f"{sys.argv[3]}/structs/{struct_hu_name}{consts.file_ext}", "a") as out_java_struct:
            out_java_struct.write("}\n")

with open(f"{sys.argv[4]}/bindings.c.body", "w") as out_c:
    out_c.write(consts.c_file_pfx)
    out_c.write(consts.init_str())
    out_c.write(c_file)
with open(f"{sys.argv[4]}/version.c", "w") as out_c:
    out_c.write(consts.c_version_file.replace('<git_version_ldk_garbagecollected>', local_git_version))
with open(f"{sys.argv[3]}/structs/UtilMethods{consts.file_ext}", "a") as util:
    util.write(consts.util_fn_sfx)
consts.cleanup()
