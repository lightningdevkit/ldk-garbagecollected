#!/usr/bin/env python3
import sys, re

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


consts = Consts(DEBUG, target=target)

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
                java_fn_ty_arg="[" + res.java_fn_ty_arg, c_ty=res.c_ty + "Array", passed_as_ptr=False, is_ptr=is_ptr,
                nonnull_ptr=nonnull_ptr, is_const=is_const,
                var_name=res.var_name, arr_len="datalen", arr_access="data", subty=res, is_native_primitive=False)
        else:
            return TypeInfo(rust_obj=fn_arg.split(" ")[0], java_ty=res.java_ty + "[]", java_hu_ty=res.java_hu_ty + "[]",
                java_fn_ty_arg="[" + res.java_fn_ty_arg, c_ty=consts.ptr_arr, passed_as_ptr=False, is_ptr=is_ptr,
                nonnull_ptr=nonnull_ptr, is_const=is_const,
                var_name=res.var_name, arr_len="datalen", arr_access="data", subty=res, is_native_primitive=False)

    is_primitive = False
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
            java_hu_ty = ma.group(1).strip().replace("LDKCOption", "Option").replace("LDKCResult", "Result").replace("LDK", "")
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
                    arr_len=var_is_arr.group(2), arr_access=arr_access, is_native_primitive=False)
            return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_ty, java_fn_ty_arg="[" + fn_ty_arg, c_ty=c_ty, is_const=is_const,
                passed_as_ptr=False, is_ptr=False, nonnull_ptr=nonnull_ptr, var_name=var_is_arr.group(1),
                arr_len=var_is_arr.group(2), arr_access=arr_access, is_native_primitive=False)

    if java_hu_ty is None:
        java_hu_ty = java_ty
    return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_hu_ty=java_hu_ty, java_fn_ty_arg=fn_ty_arg, c_ty=c_ty, passed_as_ptr=is_ptr or take_by_ptr,
        is_const=is_const, is_ptr=is_ptr, nonnull_ptr=nonnull_ptr, var_name=fn_arg, arr_len=arr_len, arr_access=arr_access, is_native_primitive=is_primitive)

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

with open(sys.argv[1]) as in_h, open(sys.argv[2], "w") as out_java:
    # Map a top-level function
    def map_fn(line, re_match, ret_arr_len, c_call_string, doc_comment):
        method_return_type = re_match.group(1)
        method_name = re_match.group(2)
        method_comma_separated_arguments = re_match.group(3)
        method_arguments = method_comma_separated_arguments.split(',')

        is_free = method_name.endswith("_free")
        if method_name.startswith("COption") or method_name.startswith("CResult"):
            struct_meth = method_name.rsplit("Z", 1)[0][1:] + "Z"
        else:
            struct_meth = method_name.split("_")[0]

        return_type_info = type_mapping_generator.map_type(method_return_type, True, ret_arr_len, False, False)

        argument_types = []
        default_constructor_args = {}
        takes_self = False
        args_known = True

        for argument_index, argument in enumerate(method_arguments):
            argument_conversion_info = type_mapping_generator.map_type(argument, False, None, is_free, True)
            if argument_index == 0 and argument_conversion_info.java_hu_ty == struct_meth:
                takes_self = True
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

        out_java.write("\t// " + line)
        (out_java_delta, out_c_delta, out_java_struct_delta) = \
            consts.map_function(argument_types, c_call_string, method_name, return_type_info, struct_meth, default_constructor_args, takes_self, args_known, type_mapping_generator, doc_comment)
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
        if ("LDK" + struct_meth in opaque_structs or "LDK" + struct_meth in trait_structs
                or "LDK" + struct_meth in complex_enums or "LDKC" + struct_meth in complex_enums
                or "LDKC" + struct_meth in result_types) and not is_free:
            out_java_struct = open(f"{sys.argv[3]}/structs/{struct_meth}{consts.file_ext}", "a")
        elif method_name.startswith("C2Tuple_") and method_name.endswith("_read"):
            struct_meth = method_name.rsplit("_", 1)[0]
            out_java_struct = open(f"{sys.argv[3]}/structs/UtilMethods{consts.file_ext}", "a")
        if out_java_struct is not None:
            out_java_struct.write(out_java_struct_delta)

    def map_unitary_enum(struct_name, field_lines, enum_doc_comment):
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
            (c_out, native_file_out, native_out) = consts.native_c_unitary_enum_map(struct_name, [x.strip().strip(",") for x in field_lines[1:-3]], enum_doc_comment)
            write_c(c_out)
            out_java_enum.write(native_file_out)
            out_java.write(native_out)

    def map_complex_enum(struct_name, union_enum_items, enum_doc_comment):
        java_hu_type = struct_name.replace("LDK", "").replace("COption", "Option")
        complex_enums.add(struct_name)

        enum_variants = []
        tag_field_lines = union_enum_items["field_lines"]
        for idx, struct_line in enumerate(tag_field_lines):
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
                    for idx, field in enumerate(enum_var_lines):
                        if idx != 0 and idx < len(enum_var_lines) - 2:
                            fields.append(type_mapping_generator.map_type(field.strip(' ;'), False, None, False, True))
                        else:
                            # TODO: Assert line format
                            pass
                else:
                    # TODO: Assert line format
                    pass
                enum_variants.append(ComplexEnumVariantInfo(variant_name, fields))

        with open(f"{sys.argv[3]}/structs/{java_hu_type}{consts.file_ext}", "w") as out_java_enum:
            (out_java_addendum, out_java_enum_addendum, out_c_addendum) = consts.map_complex_enum(struct_name, enum_variants, camel_to_snake, enum_doc_comment)

            out_java_enum.write(out_java_enum_addendum)
            out_java.write(out_java_addendum)
            write_c(out_c_addendum)

    def map_trait(struct_name, field_var_lines, trait_fn_lines, trait_doc_comment):
        with open(f"{sys.argv[3]}/structs/{struct_name.replace('LDK', '')}{consts.file_ext}", "w") as out_java_trait:
            field_var_convs = []
            for var_line in field_var_lines:
                if var_line.group(1) in trait_structs:
                    field_var_convs.append((var_line.group(1), var_line.group(2)))
                else:
                    field_var_convs.append(
                        type_mapping_generator.map_type(var_line.group(1) + " " + var_line.group(2), False, None, False, False))

            field_fns = []
            for fn_docs, fn_line in trait_fn_lines:
                ret_ty_info = type_mapping_generator.map_type(fn_line.group(2), True, None, False, False)
                is_const = fn_line.group(4) is not None

                arg_tys = []
                for idx, arg in enumerate(fn_line.group(5).split(',')):
                    if arg == "":
                        continue
                    arg_conv_info = type_mapping_generator.map_type(arg, True, None, False, False)
                    arg_tys.append(arg_conv_info)
                field_fns.append(TraitMethInfo(fn_line.group(3), is_const, ret_ty_info, arg_tys, fn_docs))

            (out_java_addendum, out_java_trait_addendum, out_c_addendum) = consts.native_c_map_trait(struct_name, field_var_convs, field_fns, trait_doc_comment)
            write_c(out_c_addendum)
            out_java_trait.write(out_java_trait_addendum)
            out_java.write(out_java_addendum)

        for fn_docs, fn_line in trait_fn_lines:
            # For now, just disable enabling the _call_log - we don't know how to inverse-map String
            is_log = fn_line.group(3) == "log" and struct_name == "LDKLogger"
            if fn_line.group(3) != "free" and fn_line.group(3) != "clone" and fn_line.group(3) != "eq" and not is_log:
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
            out_java_struct.write("\t\tif (bindings." + struct_name + "_result_ok(ptr)) {\n")
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

            out_java.write("\tpublic static native boolean " + struct_name + "_result_ok(long arg);\n")
            write_c(consts.c_fn_ty_pfx + "jboolean " + consts.c_fn_name_define_pfx(struct_name + "_result_ok", True) + consts.ptr_c_ty + " arg) {\n")
            write_c("\treturn ((" + struct_name + "*)arg)->result_ok;\n")
            write_c("}\n")

            out_java.write("\tpublic static native " + res_map.java_ty + " " + struct_name + "_get_ok(long arg);\n")
            write_c(consts.c_fn_ty_pfx + res_map.c_ty + " " + consts.c_fn_name_define_pfx(struct_name + "_get_ok", True) + consts.ptr_c_ty + " arg) {\n")
            write_c("\t" + struct_name + " *val = (" + struct_name + "*)(arg & ~1);\n")
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
            out_java_struct.write("\t}\n\n")

            out_java.write("\tpublic static native " + err_map.java_ty + " " + struct_name + "_get_err(long arg);\n")
            write_c(consts.c_fn_ty_pfx + err_map.c_ty + " " + consts.c_fn_name_define_pfx(struct_name + "_get_err", True) + consts.ptr_c_ty + " arg) {\n")
            write_c("\t" + struct_name + " *val = (" + struct_name + "*)(arg & ~1);\n")
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

            out_java_struct.write("\t}\n\n")

    def map_tuple(struct_name, field_lines):
        out_java.write("\tpublic static native long " + struct_name + "_new(")
        write_c(consts.c_fn_ty_pfx + consts.ptr_c_ty + " " + consts.c_fn_name_define_pfx(struct_name + "_new", len(field_lines) > 3))
        ty_list = []
        for idx, line in enumerate(field_lines):
            if idx != 0 and idx < len(field_lines) - 2:
                ty_info = java_c_types(line.strip(';'), None)
                if idx != 1:
                    out_java.write(", ")
                    write_c(", ")
                e = chr(ord('a') + idx - 1)
                out_java.write(ty_info.java_ty + " " + e)
                write_c(ty_info.c_ty + " " + e)
                ty_list.append(ty_info)
        tuple_types[struct_name] = (ty_list, struct_name)
        out_java.write(");\n")
        write_c(") {\n")
        write_c("\t" + struct_name + "* ret = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n")
        for idx, line in enumerate(field_lines):
            if idx != 0 and idx < len(field_lines) - 2:
                ty_info = type_mapping_generator.map_type(line.strip(';'), False, None, False, False)
                e = chr(ord('a') + idx - 1)
                if ty_info.arg_conv is not None:
                    write_c("\t" + ty_info.arg_conv.replace("\n", "\n\t"))
                    write_c("\n\tret->" + e + " = " + ty_info.arg_conv_name + ";\n")
                else:
                    write_c("\tret->" + e + " = " + e + ";\n")
                if ty_info.arg_conv_cleanup is not None:
                    write_c("\t//TODO: Really need to call " + ty_info.arg_conv_cleanup + " here\n")
        write_c("\treturn (long)ret;\n")
        write_c("}\n")

        for idx, ty_info in enumerate(ty_list):
            e = chr(ord('a') + idx)
            out_java.write("\tpublic static native " + ty_info.java_ty + " " + struct_name + "_get_" + e + "(long ptr);\n")
            write_c(consts.c_fn_ty_pfx + ty_info.c_ty + " " + consts.c_fn_name_define_pfx(struct_name + "_get_" + e, True) + consts.ptr_c_ty + " ptr) {\n")
            write_c("\t" + struct_name + " *tuple = (" + struct_name + "*)(ptr & ~1);\n")
            conv_info = type_mapping_generator.map_type_with_info(ty_info, False, None, False, True)
            if conv_info.ret_conv is not None:
                write_c("\t" + conv_info.ret_conv[0].replace("\n", "\n\t") + "tuple->" + e + conv_info.ret_conv[1].replace("\n", "\n\t") + "\n")
                write_c("\treturn " + conv_info.ret_conv_name + ";\n")
            else:
                write_c("\treturn tuple->" + e + ";\n")
            write_c("}\n")

    out_java.write(consts.bindings_header)

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

                for idx, struct_line in enumerate(obj_lines):
                    if struct_line.strip().startswith("/*"):
                        block_comment = struct_line.strip(" /*")
                    if block_comment is not None:
                        if struct_line.endswith("*/"):
                            last_struct_block_comment = block_comment.strip("\n")
                            block_comment = None
                        else:
                            block_comment = block_comment + "\n" + struct_line.strip(" /*")
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
                        out_opaque_struct_human = consts.map_opaque_struct(struct_name, last_block_comment)
                        last_block_comment = None
                        out_java_struct.write(out_opaque_struct_human)
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
                    ty_info = type_mapping_generator.map_type(vec_ty + " arr_elem", False, None, False, False)
                    if len(ty_info.java_fn_ty_arg) == 1: # ie we're a primitive of some form
                        out_java.write("\tpublic static native long " + struct_name + "_new(" + ty_info.java_ty + "[] elems);\n")
                        write_c(consts.c_fn_ty_pfx + consts.ptr_c_ty + " " + consts.c_fn_name_define_pfx(struct_name + "_new", True) + ty_info.c_ty + "Array elems) {\n")
                        write_c("\t" + struct_name + " *ret = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n")
                        write_c("\tret->datalen = " + consts.get_native_arr_len_call[0] + "elems" + consts.get_native_arr_len_call[1] + ";\n")
                        write_c("\tif (ret->datalen == 0) {\n")
                        write_c("\t\tret->data = NULL;\n")
                        write_c("\t} else {\n")
                        write_c("\t\tret->data = MALLOC(sizeof(" + vec_ty + ") * ret->datalen, \"" + struct_name + " Data\");\n")
                        native_arr_ptr_call = consts.get_native_arr_ptr_call(ty_info.ty_info)
                        write_c("\t\t" + ty_info.c_ty + " *java_elems = " + native_arr_ptr_call[0] + "elems" + native_arr_ptr_call[1] + ";\n")
                        write_c("\t\tfor (size_t i = 0; i < ret->datalen; i++) {\n")
                        if ty_info.arg_conv is not None:
                            write_c("\t\t\t" + ty_info.c_ty + " arr_elem = java_elems[i];\n")
                            write_c("\t\t\t" + ty_info.arg_conv.replace("\n", "\n\t\t\t") + "\n")
                            write_c("\t\t\tret->data[i] = " + ty_info.arg_conv_name + ";\n")
                            assert ty_info.arg_conv_cleanup is None
                        else:
                            write_c("\t\t\tret->data[i] = java_elems[i];\n")
                        write_c("\t\t}\n")
                        cleanup = consts.release_native_arr_ptr_call(ty_info.ty_info, "elems", "java_elems")
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
                    map_complex_enum(struct_name, union_enum_items[struct_name], last_block_comment)
                    last_block_comment = None
                elif is_unitary_enum:
                    map_unitary_enum(struct_name, field_lines, last_block_comment)
                    last_block_comment = None
                elif len(trait_fn_lines) > 0:
                    trait_structs.add(struct_name)
                    map_trait(struct_name, field_var_lines, trait_fn_lines, last_block_comment)
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

with open(sys.argv[4], "w") as out_c:
    out_c.write(consts.c_file_pfx)
    out_c.write(consts.init_str())
    out_c.write(c_file)
with open(f"{sys.argv[3]}/structs/UtilMethods{consts.file_ext}", "a") as util:
    util.write(consts.util_fn_sfx)
